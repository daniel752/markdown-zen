import 'express-async-errors';
import UserModel from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError, UnauthenticatedError } from '../errors/CustomErrors.js';
import bcrypt from 'bcryptjs';
import { hashPassword, comparePassword } from '../utils/passwordUtils.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
  // Admin will be the first registered user
  const role = (await UserModel.countDocuments()) === 0 ? 'admin' : 'user';
  req.body.role = role;

  // Hashing user's password
  req.body.password = await hashPassword(req.body.password);

  // Creating new user
  const newUser = await UserModel.create(req.body);
  res.status(StatusCodes.OK).json({ newUser });
};

export const login = async (req, res) => {
  // Fetch user from database
  const user = await UserModel.findOne({ email: req.body.email });
  if (!user) throw new UnauthenticatedError('invalid email');

  // Check if user exists and correct password
  const isMatch = await comparePassword(req.body.password, user.password);
  if (!isMatch) throw new UnauthenticatedError('invalid password');

  // Create JWT to authenticate user
  const token = createJWT({ userId: user.id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie('token', token, {
    httpOnly: true,
    maxAge: oneDay,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  res.status(StatusCodes.OK).json({ msg: `user ${user.firstName} logged` });
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    maxAge: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: 'user logout' });
};
