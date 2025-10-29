import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

const JWT_SECRET = process.env.JWT_SECRET as string;

// ✅ Register a new user
export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!JWT_SECRET) {
      return res.status(500).json({ message: 'Server error: JWT secret is not configured' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed', error: error.message || error });
  }
};

// ✅ Get logged-in user's profile
export const getUserProfile = async (req: Request & { user?: any }, res: Response) => {
  try {
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch profile' });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret is not configured' });
    }

    // Select password explicitly
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: error.message || error });
  }
};