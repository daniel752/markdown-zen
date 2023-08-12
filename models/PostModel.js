import mongoose from 'mongoose';

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
    comments: { type: [String], default: [] },
    status: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model('Post', PostSchema);
