import { Response, Request } from 'express';
import { Comment } from '../models/comment';

export default {
  // liste des commentaire
  getComments: async (req: Request, res: Response) => {
    const { id: voitureId } = req.params; // id voiture

    try {
      const comments = await Comment.find({ voiture: voitureId });
      return res.status(200).send(comments);
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  },

  // commenter
  postComment: async (req: any, res: Response) => {
    const { id: voitureId } = req.params; // id voiture
    const userId = req.userId; // id user

    try {
      const { content } = req.body;

      const comment = new Comment({
        content: content,
        owner: userId,
        voiture: voitureId
      });
      await comment.save();
      return res.status(201).send(comment);
    } catch (error) {
      return res.status(500).send({ ...error });
    }
  }

}