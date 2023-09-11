import { Router } from 'express';
import { register, login, logout } from '../controllers/AuthController.js';
import {
  validateLoginInput,
  validateRegisterInput,
} from '../middleware/ValidationMiddleware.js';
import rateLimit from 'express-rate-limit';

const router = Router();

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  message: { msg: 'IP rate limit exceeded, retry in 15 minutes' },
});

router.post('/register', apiLimiter, validateRegisterInput, register);
router.post('/login', apiLimiter, validateLoginInput, login);
router.get('/logout', logout);

export default router;
