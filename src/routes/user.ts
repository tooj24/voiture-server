import express from 'express';
import userController from '../controllers/user';
import { decode } from '../middlewares/jwt';

const router = express.Router();

// list users
router.get('/', decode, userController.getUsers);

// créer un utilisateur
router.post('/', userController.create);

export { router as UserRouter };