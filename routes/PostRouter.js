import { Router } from 'express';
import {
  validateIdParam,
  validatePostInput,
} from '../middleware/ValidationMiddleware.js';
import {
  getAllPosts,
  getPost,
  addPost,
  updatePost,
  deletePost,
  getUserPosts,
  getPostStats,
  downloadPost,
  removeDownloadedFile,
} from '../controllers/PostController.js';
import { checkForTestUser } from '../middleware/AuthMiddleware.js';

const router = Router();

router
  .route('/')
  .get(getUserPosts)
  .post(checkForTestUser, validatePostInput, addPost);

router.route('/stats').get(getPostStats);
router.route('/download-post').post(downloadPost);
router.route('/remove-downloaded-file').post(removeDownloadedFile);

router
  .route('/:id')
  .get(validateIdParam, getPost)
  .patch(checkForTestUser, validateIdParam, validatePostInput, updatePost)
  .delete(checkForTestUser, validateIdParam, deletePost);

export default router;
