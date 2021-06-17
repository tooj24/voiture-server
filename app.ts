import express from 'express';
import { json } from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { DATABASE_URL } from './src/config/mongo';
import { UserRouter } from './src/routes/user';

const app = express();
const port = 8000;

app.use(cors());
app.use(json());
app.use(logger('dev'));

/**
 * Database
 */
mongoose.connect(DATABASE_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('connected to database');
})

/**
 * Routes
 */
app.use(UserRouter);

/**
 * Start server
 */
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
})