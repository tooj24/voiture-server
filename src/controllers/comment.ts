import { Response, Request } from 'express';
import { validationResult } from 'express-validator';
import { Comment } from '../models/comment';

export default {
  // liste des commentaire
  getComments: async (req: Request, res: Response) => {
    const { id: voitureId, page = '1' } = req.params; // id voiture
    const perPage = 3;
    const p = parseInt(page.toString());

    try {
      const comments = await Comment
        .find({ voiture: voitureId })
        .limit(perPage)
        .skip(perPage * (p - 1))
        .sort({
          createdAt: 'desc'
        })
        .populate("owner");

      Comment.countDocuments({ voiture: voitureId }).exec((err: any, count: number) => {
        return res.status(200).send({
          page: p,
          pages: Math.ceil(count / perPage),
          total: count,
          comments: comments
        });
      })
    } catch (error) {
      return res.status(500).send({ error: error });
    }
  },

  // commenter
  postComment: async (req: any, res: Response) => {
    const { id: voitureId } = req.params; // id voiture
    const userId = req.userId; // id user
    const errors = validationResult(req);

    // renvoyer les erreurs
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { content } = req.body;

      let comment = new Comment({
        content: content,
        owner: userId,
        voiture: voitureId
      });
      comment = await comment.populate('owner').execPopulate()
      await comment.save();
      return res.status(201).send(comment);
    } catch (error) {
      return res.status(500).send({ ...error });
    }
  }

}