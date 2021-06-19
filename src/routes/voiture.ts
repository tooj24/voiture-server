import express from 'express';
import { decode } from '../middlewares/jwt';
import { voitureValidation } from '../validation/voiture';
import voitureController from '../controllers/voiture';

const router = express.Router();

// list users
router.get('/', voitureController.getVoitures);

// get voiture
router.get('/:id', voitureController.getVoiture);

// créer une voiture
router.post('/', voitureValidation, decode, voitureController.createVoiture);

export { router as VoitureRouter };