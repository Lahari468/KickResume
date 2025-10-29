import express from 'express';
import {
  createResume,
  getResumeById,
  updateResume,
  deleteResume,
  downloadResume,
  getAllResumesByUser,
} from '../controllers/resumeController';
import { protect } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/').post(protect, createResume).get(protect, getAllResumesByUser);
router.route('/:id').get(protect, getResumeById).put(protect, updateResume).delete(protect, deleteResume);
router.post('/:id/download', downloadResume);

export default router;
