import express from 'express';
import commentController from '../controllers/comment';
import {decode} from '../middlewares/jwt';

const router = express.Router();

// liste des commentaire
router.get('/:id', decode, commentController.getComments);

// commenter
router.post('/:id', decode, commentController.postComment);

export { router as CommentRouter };