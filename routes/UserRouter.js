import { Router } from 'express';
import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
  getUser,
} from '../controllers/UserController.js';
import {
  authorizePermissions,
  checkForTestUser,
} from '../middleware/AuthMiddleware.js';
import upload from '../middleware/multerMiddleware.js';
import { validateUpdateUserInput } from '../middleware/ValidationMiddleware.js';

const router = Router();

router.post('/get-user', getUser);
router.get('/current-user', getCurrentUser);
router.get('/admin/app-stats', [
  authorizePermissions('admin'),
  getApplicationStats,
]);
router.patch(
  '/update-user',
  upload.single('avatar'),
  checkForTestUser,
  validateUpdateUserInput,
  updateUser,
);

export default router;
