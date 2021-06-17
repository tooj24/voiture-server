import { model, Schema } from 'mongoose';

interface IUser {
  email: string,
  password: string,
  firstname: string,
  lastname: string
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
});

const User = model<IUser>('user', userSchema);

export { User };