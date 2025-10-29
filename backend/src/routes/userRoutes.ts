import { Router } from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);        // ✅ Add this line

// Protected route
router.get('/me', protect, getUserProfile);

export default router;
