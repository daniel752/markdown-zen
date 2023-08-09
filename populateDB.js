import { readFile } from 'fs/promises';
import mongoose from 'mongoose';
import PostModel from './models/PostModel.js';
import dotenv from 'dotenv';

dotenv.config();

try {
  await mongoose.connect(process.env.MONGO_URL);

  const posts = JSON.parse(
    await readFile(new URL('./utils/MOCK_DATA.json', import.meta.url)),
  );

  await PostModel.deleteMany({ author: process.env.TEST_USER_ID });
  await PostModel.create(posts);

  console.log('Success!!!');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
