import express from 'express';
const app = express();
import morgan from 'morgan';
import * as dotenv from 'dotenv';
dotenv.config();

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));


import jobRouters from './routers/jobsRouter.js';
import authRouters from './routers/authRouters.js';
import userRouters from './routers/userRouters.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

import cloudinary from 'cloudinary';


if ((process.env.NODE_ENV = 'development')) {
  app.use(morgan('dev'));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.static(path.resolve(__dirname,'./public')))
app.use(cookieParser());
app.use(express.json());

app.post('/', (req, res) => {
  res.json({ message: 'message delivered', data: req.body });
});

app.get('/', (req, res) => {
  res.send('hello');
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.use('/api/v1/jobs', authenticateUser, jobRouters);
app.use('/api/v1/users', authenticateUser, userRouters);
app.use('/api/v1/auth', authRouters);

app.get('*splat', (req, res) => {
  res.sendFile(__dirname,'./public', 'index.html')
})

app.use((req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URI);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
