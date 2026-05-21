import express from 'express';
import * as userController from '../controllers/user.controller.js';
import { validateUser, validateUserId } from '../middleware/validation.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// All user routes require authentication
router.use(protect);

router.route('/')
  .get(authorize('admin'), userController.getAllUsers)  // Only admins can list all users
  .post(validateUser, userController.createUser);

router.route('/:id')
  .get(validateUserId, userController.getUserById)
  .put(validateUserId, validateUser, userController.updateUser)
  .delete(validateUserId, authorize('admin'), userController.deleteUser); // Only admins can delete

export default router;