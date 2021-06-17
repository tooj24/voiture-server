import express, { Request, Response } from 'express';
import userController from '../controllers/user';

const router = express.Router();

// list users
router.get('/', userController.getUsers);

// créer un utilisateur
router.post('/', userController.create);

export { router as UserRouter };