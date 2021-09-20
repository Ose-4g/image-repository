import { RequestHandler } from 'express';
import AppError from '../../errors/AppError';
import UserModel, { User } from '../../models/User';
import successResponse from '../../middleware/response';

const signUp: RequestHandler = async (req, res, next) => {
  const { firstName, lastName, email, password, passwordConfirm } = req.body;

  // check that the email is not in use
  const prevUsers: User[] = await UserModel.find({ email });

  if (prevUsers.length > 0) {
    return next(new AppError('User with this email already exists', 400));
  }

  // create user
  const user: User = await UserModel.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
  });

  return successResponse(res, 201, 'Successfully created user', null);
};

export default signUp;
