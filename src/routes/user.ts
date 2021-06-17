import express, { Request, Response } from 'express';

const router = express.Router();

// list users
router.get('/', function(req: Request, res: Response) {
  res.json({
    message: 'Welcome'
  })
});

export { router as UserRouter };