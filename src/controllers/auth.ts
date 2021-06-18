import { Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../middlewares/jwt';

export default {
  login: async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email })

      // verifier si l'utilisateur n'existe
      if (!user) {
        return res.status(401).send({ error: 'Invalid password or email' });
      }

      // comparer le mdp
      try {
        await user.comparePwd(password)
        const payload = {
          userId: user._id,
          pseudo: user.pseudo,
        };
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
        return res.status(200).send({ token })
      } catch (err) {
        return res.status(401).send({ error: 'Invalid password or email' });
      }
    } catch (error) {
      return res.status(500).send({ error: error });
    }

  }
}