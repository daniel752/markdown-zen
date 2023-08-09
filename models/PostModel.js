import mongoose from 'mongoose';
import { CATEGORY, TAG, STATUS } from '../utils/constants.js';

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    title: { type: String },
    categories: { type: [String] },
    tags: { type: [String] },
    content: { type: String },
    likes: { type: Number, default: 0 },
    comments: { type: [String], default: [] },
    views: { type: Number, default: 0 },
    status: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model('Post', PostSchema);
