import { Schema, model, Model, Document } from 'mongoose';
import validator from 'validator';
import constants from '../utils/constants';
import bcrypt from 'bcryptjs';

const { USER } = constants.mongooseModels;

export interface User extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string | null;
}

const userSchema = new Schema<User>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      validate: [validator.isEmail, 'Email is invalid'],
      unique: ['true', 'User with this email already exists'],
    },

    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      select: false,
    },
  },
  { timestamps: true }
);

//hash the password then save to database.
userSchema.pre('save', async function (next) {
  //This would run only is password is actually modified
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = null;
  next();
});

const UserModel: Model<User> = model<User>(USER, userSchema);

export default UserModel;
