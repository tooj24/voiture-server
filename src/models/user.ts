import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

interface UserDoc extends Document {
  lastname: string;
  firstname: string;
  email: string;
  pseudo: string;
  password: string;
  comparePwd: (pwd: string) => Promise<boolean|any>;
}

const userSchema: Schema = new Schema({
  lastname: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  pseudo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
})

userSchema.methods.comparePwd = async function (pass) {
  const user = this as UserDoc;

  return new Promise((resolve, reject) => {
    bcrypt.compare(pass, user.password, (err: any, isMatch: boolean) => {
      if (err) {
        return reject(err);
      }

      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
}

const User = mongoose.model<UserDoc>('User', userSchema)

export { User }