import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(registerUser);
router.post('/login', loginUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUser);

export default router;