import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import PostRouter from './routes/PostRouter.js';
import AuthRouter from './routes/AuthRouter.js';
import UserRouter from './routes/UserRouter.js';
import { StatusCodes } from 'http-status-codes';
import ErrorHandlerMiddleware from './middleware/ErrorHandlerMiddleware.js';
import { authenticateUser } from './middleware/AuthMiddleware.js';
import cookieParser from 'cookie-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

// If environmet is development then show terminal logs with morgan
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './public')));

// Express middleware uses
// Enabling Express app to use json
app.use(express.json());
// Enablin Express app to parse cookies
app.use(cookieParser());
// Making Express app to use 'ErrorHandlerMiddleware' for errors
app.use(ErrorHandlerMiddleware);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: `hello` });
});

app.use('/api/v1/posts', authenticateUser, PostRouter);
app.use('/api/v1/auth', AuthRouter);
app.use('/api/v1/users', authenticateUser, UserRouter);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

app.use('*', (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
});

const port = process.env.PORT || 8000;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}
