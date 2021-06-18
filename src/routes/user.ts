import express from 'express';
import userController from '../controllers/user';
import { decode } from '../middlewares/jwt';
import { userValidation } from '../validation/user';

const router = express.Router();

// list users
router.get('/', decode, userController.getUsers);

// créer un utilisateur
router.post('/', userValidation, userController.create);

export { router as UserRouter };