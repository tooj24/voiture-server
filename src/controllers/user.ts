import { Request, Response } from 'express';
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
      const { email, password, lastname, firstname } = req.body;
      const user = new User({
        email: email,
        password: password,
        lastname: lastname,
        firstname: firstname,
      });
      await user.save()
      return res.status(201).send(user)
    } catch (error) {
      return res.status(500).send({...error});
    }
  }
}