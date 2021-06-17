import { Request, Response } from 'express';
import { User } from "../models/user"
import bcrypt from "bcrypt";

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