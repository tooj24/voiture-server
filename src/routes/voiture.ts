import express, { Request, Response } from 'express';
import voitureController from '../controllers/voiture';

const router = express.Router();

// list users
router.get('/', voitureController.getVoitures);

// créer un utilisateur
router.post('/', voitureController.createVoiture);

export { router as VoitureRouter };