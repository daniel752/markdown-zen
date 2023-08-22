import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/UserModel.js';
import PostModel from '../models/PostModel.js';
import cloudinary from 'cloudinary';
import { promises as fs } from 'fs';
import { NotFoundError } from '../errors/CustomErrors.js';

export const getCurrentUser = async (req, res) => {
  const currentUser = await UserModel.findById(req.user.userId);
  const userWithoutPassword = currentUser.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getUser = async (req, res) => {
  console.log(req.body.collabEmail);
  const user = await UserModel.findOne({ email: req.body.collabEmail });
  if (!user)
    throw new NotFoundError(`user ${req.body.collabEmail} doesn't exists`);
  res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStats = async (req, res) => {
  const userCount = await UserModel.countDocuments();
  const postCount = await PostModel.countDocuments();
  res.status(StatusCodes.OK).json({ users: userCount, posts: postCount });
};

export const updateUser = async (req, res) => {
  const user = { ...req.body };
  delete user.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    user.avatar = response.secure_url;
    user.avatarPublicId = response.public_id;
  }

  const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, user);

  if (req.file && updatedUser.avatarPublicId)
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);

  res.status(StatusCodes.OK).json({ updatedUser: updatedUser });
};
