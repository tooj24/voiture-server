import { Response, Request } from 'express';
import { Voiture } from '../models/voiture';

export default {
  getVoitures: async (req: Request, res: Response) => {
    try {
      const voitures = await Voiture.find();
      return res.status(200).send(voitures);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  },

  getVoiture: async(req: Request, res: Response) => {
    try {
      const { id } = req.params
      const voiture = await Voiture.findOne({_id: id});
      return res.status(200).send(voiture);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
    
  },

  createVoiture: async (req: Request, res: Response) => {
    try {
      const { marque, description, price } = req.body;

      const voiture = new Voiture({
        marque: marque,
        description: description,
        price: price,
      });
      await voiture.save();
      return res.status(201).send(voiture);
    } catch (error) {
      return res.status(500).send({ ...error });
    }
  }

}