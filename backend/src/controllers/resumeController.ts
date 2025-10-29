import { Request, Response } from 'express';
import Resume from '../models/resume.model';

// Extend Express Request interface to include 'user'
declare global {
  namespace Express {
    interface User {
      _id: string;
      // add other user properties if needed
    }
    interface Request {
      user: User;
    }
  }
}

export const createResume = async (req: Request, res: Response) => {
  try {
    const resume = await Resume.create({ ...req.body, user: req.user._id });
    res.status(201).json(resume);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create resume', details: err });
  }
};

export const getResumeById = async (req: Request, res: Response) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, user: req.user._id });
    if (!resume) return res.status(404).json({ error: 'Resume not found' });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resume' });
  }
};

export const updateResume = async (req: Request, res: Response) => {
  try {
    const updated = await Resume.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Resume not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update resume' });
  }
};

export const deleteResume = async (req: Request, res: Response) => {
  try {
    const deleted = await Resume.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!deleted) return res.status(404).json({ error: 'Resume not found' });
    res.json({ message: 'Resume deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete resume' });
  }
};

export const getAllResumesByUser = async (req: Request, res: Response) => {
  try {
    const resumes = await Resume.find({ user: req.user._id });
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
};

export const downloadResume = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const resume = await Resume.findById(id);
    if (!resume) return res.status(404).json({ message: 'Resume not found' });

    // increment and save
    resume.downloads += 1;
    await resume.save();

    // return success (later you can stream a real PDF)
    return res.json({ message: 'Download recorded', downloads: resume.downloads });
  } catch (error) {
    console.error('Error recording download:', error);
    res.status(500).json({ message: 'Failed to record download' });
  }
};