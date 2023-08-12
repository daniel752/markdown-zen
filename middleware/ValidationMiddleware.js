import { body, validationResult } from 'express-validator';
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
} from '../errors/CustomErrors.js';
import { STATUS } from '../utils/constants.js';
import mongoose from 'mongoose';
import { param } from 'express-validator';
import PostModel from '../models/PostModel.js';
import UserModel from '../models/UserModel.js';

const withValidationErrors = validateValues => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(error => error.msg);
        if (errorMessages[0].startsWith('no post')) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith('not authorized')) {
          throw new UnauthorizedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validatePostInput = withValidationErrors([
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Title must be between 2 and 50 characters long')
    .trim(),
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long'),
  body('tags').optional({ checkFalsy: true }),
  body('categories')
    .isArray({ min: 1, max: 3 })
    .withMessage('Number of categories must be between 1 and 3'),
  body('status')
    .notEmpty()
    .withMessage('Post status is required')
    .isIn(Object.values(STATUS))
    .withMessage('Invalid post status'),
]);

export const validateIdParam = withValidationErrors([
  param('id').custom(async (value, { req }) => {
    const validId = mongoose.Types.ObjectId.isValid(value);
    if (!validId) throw new BadRequestError('invalid MongoDB id');

    const post = await PostModel.findById(value);
    if (!post) throw new NotFoundError(`no post with id ${value}`);

    const isAdmin = req.user.role === 'admin';
    const isOwner = req.user.userId === post.author.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError('not authorized to access this route');
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body('firstName')
    .notEmpty()
    .withMessage('first name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('first name must be between 2 and 50 characters'),
  body('lastName')
    .notEmpty()
    .withMessage('last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('last name must be between 2 and 50 characters'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email format is invalid')
    .custom(async email => {
      const user = await UserModel.findOne({ email });
      if (user) throw new BadRequestError('email already exists');
    }),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6, max: 20 })
    .withMessage('password must be between 6 and 20 characters'),
]);

export const validateLoginInput = withValidationErrors([
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email format is invalid'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6, max: 20 })
    .withMessage('password must be between 6 and 20 characters'),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('firstName')
    .notEmpty()
    .withMessage('first name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('first name must be between 2 and 50 characters'),
  body('lastName')
    .notEmpty()
    .withMessage('last name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('last name must be between 2 and 50 characters'),
]);
