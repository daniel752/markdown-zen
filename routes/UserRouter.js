import { Router } from 'express';
import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
  getUserByEmail,
  getCollaboratorById,
  getUserById,
} from '../controllers/UserController.js';
import {
  authorizePermissions,
  checkForTestUser,
} from '../middleware/AuthMiddleware.js';
import upload from '../middleware/multerMiddleware.js';
import { validateUpdateUserInput } from '../middleware/ValidationMiddleware.js';

const router = Router();

router.post('/get-user-email', getUserByEmail);
router.post('/get-user-id', getUserById);
router.post('/get-collaborator-id', getCollaboratorById);
router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [
  authorizePermissions('admin'),
  getApplicationStats,
]);
router.patch(
  '/update-user',
  checkForTestUser,
  upload.single('avatar'),
  validateUpdateUserInput,
  updateUser,
);

export default router;
