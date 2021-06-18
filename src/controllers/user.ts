import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from "bcrypt";
import { User } from "../models/user"

export default {
  // liste des utilisateurs
  getUsers: async (req: Request, res: Response) => {
    try {
      const users = await User.find();
      return res.status(200).send(users);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  },

  // créer utilisateur
  create: async (req: Request, res: Response) => {
    try {
      const { email, pseudo, password, lastname, firstname } = req.body;
      const errors = validationResult(req);

      // renvoyer les erreurs
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // hash password
      const hash = bcrypt.hashSync(password, 10);
      // store user
      const user = new User({
        email: email,
        password: hash,
        lastname: lastname,
        firstname: firstname,
        pseudo: pseudo,
      });
      await user.save();
      return res.status(201).send(user);
    } catch (error) {
      return res.status(500).send({ ...error });
    }
  }

}