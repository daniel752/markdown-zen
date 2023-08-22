import 'express-async-errors';
import UserModel from '../models/UserModel.js';
import PostModel from '../models/PostModel.js';
import CollaboratorModel from '../models/CollaboratorModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/CustomErrors.js';
import mongoose from 'mongoose';
import { ObjectId } from 'mongoose';
import day from 'dayjs';
import fs from 'fs';
import { URL } from 'url';

export const getAllPosts = async (req, res) => {
  const posts = await PostModel.find({});
  res.status(StatusCodes.OK).json({ posts });
};

export const getUserPosts = async (req, res) => {
  const { title, status, categories, tags, sort } = req.query;
  const collaborations = await CollaboratorModel.find({
    user: req.user.userId,
  });
  const collaborationsIds = collaborations.map(collaboration =>
    collaboration._id.toString(),
  );
  const queryObj = {
    $or: [
      { author: req.user.userId },
      { collaborators: { $in: collaborationsIds } },
    ],
  };
  if (title) {
    queryObj.$or = [{ title: { $regex: title, $options: 'i' } }];
  }
  if (status && status !== 'all') queryObj.status = status;
  if (categories && categories !== 'all') queryObj.categories = categories;
  if (tags && tags !== 'all') queryObj.tags = tags;

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'title',
    'z-a': '-title',
  };
  const sortKey = sortOptions[sort] || sortOptions.newest;

  let page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await PostModel.find(queryObj)
    .sort(sortKey)
    .skip(skip)
    .limit(limit);

  const collaboratorIds = posts.map(post =>
    post.collaborators.map(collaborator => collaborator.toString()),
  );
  const collaborationData = await CollaboratorModel.find({
    _id: { $in: collaboratorIds },
  });

  const collaborators = [];
  const postsLen = posts.length;
  for (let i = 0; i < postsLen; i++) {
    const collabsLen = posts[i].collaborators.length;
    for (let j = 0; j < collabsLen; j++) {
      const collaborator = collaborationData.find(
        dataCollaborator =>
          dataCollaborator._id.toString() ===
          posts[i].collaborators[j].toString(),
      );
      if (collaborator) {
        const collab = {
          id: collaborator._id.toString(),
          user: collaborator.user.toString(),
          hasEditPermission: collaborator.hasEditPermission,
        };
        collaborators.push(collab);
      }
    }
  }
  const totalPosts = await PostModel.countDocuments(queryObj);
  const numPages = Math.ceil(totalPosts / limit);

  res
    .status(StatusCodes.OK)
    .json({ totalPosts, numPages, currentPage: page, posts, collaborators });
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.findById(id);
  res.status(StatusCodes.OK).json({ post });
};

export const addPost = async (req, res) => {
  // Get data from request's body
  const data = req.body;
  // If there are collaborators then get their IDs
  if (data?.collaborators) {
    const { collaborators } = data;
    for (const key in collaborators) {
      const userDoc = await UserModel.findOne(
        {
          email: collaborators[key].email,
        },
        '_id',
      );
      if (userDoc) {
        const collaboratorId = userDoc._id.toString(); // Convert ObjectId to string
        // Create a collaborator document
        const collaborator = await CollaboratorModel.create({
          user: collaboratorId,
          hasEditPermission: collaborators[key].hasEditPermission,
        });
        collaborators[key] = collaborator;
        // collaborators[key]._id = collaboratorId; // Store the collaborator's ID as a string
      }
    }
    data.collaborators = collaborators;
  }
  // Making the user owner of the post
  data.author = req.user.userId;
  // Extract the collaborator IDs as strings and store in the data
  data.collaborators = data.collaborators.map(collaborator => collaborator._id);
  // Creating post in DB
  const post = await PostModel.create(data);
  // Returning the newly created post
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

const getCurrentDir = () => {
  const currentModulePath = new URL(import.meta.url).pathname;
  const currentDir = currentModulePath.replace(/\/[^/]*$/, '');
  return currentDir;
};

export const downloadPost = (req, res) => {
  const { markdown } = req.body;
  const { title, content } = JSON.parse(markdown);

  const downloadPath = `${getCurrentDir()}/../public/downloads`;
  const fileName = `${title}.md`;
  const filePath = `${downloadPath}/${fileName
    .toLowerCase()
    .split(' ')
    .join('_')}`;
  fs.writeFileSync(filePath, content);
  res.download(filePath, fileName.toLowerCase().split(' ').join('_'));
};

export const removeDownloadedFile = (req, res) => {
  const { downloadName } = req.body;
  const filePath = `${getCurrentDir()}/../public/downloads/${downloadName}`;
  fs.unlinkSync(filePath);
  res.status(StatusCodes.OK).json({ msg: 'file deleted' });
};

// export const addCollaborator = (req,res) => {
// }
