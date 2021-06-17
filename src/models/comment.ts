import mongoose, { Document, Schema } from 'mongoose';

interface CommentDoc extends Document {
  content: string;
  owner: string;
  voiture: string;
}

const commentSchema: Schema = new Schema({
  content: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  voiture: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Voiture'
  }
})

commentSchema.set('timestamps', true);

const Comment = mongoose.model<CommentDoc>('Comment', commentSchema)

export { Comment }