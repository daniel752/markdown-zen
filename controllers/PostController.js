import 'express-async-errors';
import PostModel from '../models/PostModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/CustomErrors.js';
import mongoose from 'mongoose';
import day from 'dayjs';

export const getAllPosts = async (req, res) => {
  const posts = await PostModel.find({});
  res.status(StatusCodes.OK).json({ posts });
};

export const getUserPosts = async (req, res) => {
  console.log(req.query);
  const { title, status, categories, sort } = req.query;
  const queryObj = {
    author: req.user.userId,
  };
  if (title) {
    queryObj.$or = [{ title: { $regex: title, $options: 'i' } }];
  }
  if (status && status !== 'all') queryObj.status = status;
  if (categories && categories !== 'all') queryObj.categories = categories;

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'title',
    'z-a': '-title',
  };
  const sortKey = sortOptions[sort] || sortOptions.newest;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await PostModel.find(queryObj)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);
  const totalPosts = await PostModel.countDocuments(queryObj);
  const numPages = Math.ceil(totalPosts / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalPosts, numPages, currentPage: page, posts });
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findById(id);
  res.status(StatusCodes.OK).json({ post });
};

export const addPost = async (req, res) => {
  req.body.author = req.user.userId;
  console.log(req.body);
  const post = await PostModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ post });
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const options = { returnDocument: 'after' };
  const updatedPost = await PostModel.findByIdAndUpdate(id, req.body, options);
  res.status(StatusCodes.OK).json({ updatedPost });
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  await PostModel.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ msg: 'post removed' });
};

export const getPostStats = async (req, res) => {
  let stats = await PostModel.aggregate([
    { $match: { author: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', total: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, total } = curr;
    acc[title] = total;
    return acc;
  }, {});

  const defaultStats = {
    draft: stats.draft || 0,
    publish: stats.publish || 0,
    archive: stats.archive || 0,
  };

  let monthlyPosts = await PostModel.aggregate([
    { $match: { author: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ]);

  monthlyPosts = monthlyPosts
    .map(post => {
      const {
        _id: { month, year },
        count,
      } = post;

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyPosts });
};
