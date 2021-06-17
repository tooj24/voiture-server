import express from 'express';
import { json } from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';

import auth from './src/controllers/auth';
import { DATABASE_URL } from './src/config/mongo';
import { UserRouter } from './src/routes/user';
import { VoitureRouter } from './src/routes/voiture';
import { CommentRouter } from './src/routes/comment';

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
const router = express.Router();
app.use(router.post('/connexion', auth.login))

app.use('/utilisateurs', UserRouter);
app.use('/voitures', VoitureRouter);
app.use('/commentaires', CommentRouter);

/**
 * Start server
 */
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
})