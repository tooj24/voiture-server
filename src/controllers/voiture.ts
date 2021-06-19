import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { Voiture } from '../models/voiture';

export default {
  getVoitures: async (req: Request, res: Response) => {
    const perPage = 3;
    const {page = '0'} = req.query;
    try {
      const voitures = await Voiture
        .find()
        .limit(perPage)
        .skip(perPage * (+page));

      Voiture.countDocuments().exec((err: any, count: number) => {
        return res.status(200).send({
          page: page,
          pages: Math.round(count / perPage),
          voitures: voitures
        });
      })
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  },

  getVoiture: async (req: Request, res: Response) => {
    try {
      const { id } = req.params
      const voiture = await Voiture.findOne({ _id: id });
      return res.status(200).send(voiture);
    } catch (error) {
      return res.status(500).send({ error: error });
    }

  },

  createVoiture: async (req: Request, res: Response) => {
    try {
      const { marque, description, price } = req.body;
      const errors = validationResult(req);

      // renvoyer les erreurs
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

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