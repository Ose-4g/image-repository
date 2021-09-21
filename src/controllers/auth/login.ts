process.env.NODE_ENV = 'test';
import { RequestHandler } from 'express';
import AppError from '../../errors/AppError';
import UserModel, { User } from '../../models/User';
import successResponse from '../../middleware/response';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../../utils/token';
import validator from 'validator';

const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email) {
    return next(new AppError('Email is required', 400));
  }

  if (!validator.isEmail(email)) {
    return next(new AppError('Invalid email', 400));
  }

  if (!password) {
    return next(new AppError('Password is required', 400));
  }

  // check that user with email exists
  const user: User | null = await UserModel.findOne({ email }).select('+password');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // check the input password matches the users password
  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    return next(new AppError('invalid email or password', 400));
  }

  // generate accessToken and send in request
  const accessToken = generateAccessToken(String(user._id));

  return successResponse(res, 200, 'User Logged in sucessfully', {
    accessToken,
  });
};

export default login;
