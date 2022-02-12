import UserRepository from '../../repository/UserRepository';
import AppError from '../../errors/AppError';
import validator from 'validator';
import { User } from '../../models/User';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../../utils/token';

const loginLogic = async (
  email: string,
  password: string,
  userRepository: UserRepository
): Promise<{ accessToken: string }> => {
  if (!email) {
    throw new AppError('Email is required', 400);
  }

  if (!validator.isEmail(email)) {
    throw new AppError('Invalid email', 400);
  }

  if (!password) {
    throw new AppError('Password is required', 400);
  }

  // check that user with email exists
  const user: User | null = await userRepository.findOneUser({ email }, '+password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  // check the input password matches the users password
  const passwordsMatch = await bcrypt.compare(password, user.password);

  if (!passwordsMatch) {
    throw new AppError('invalid email or password', 400);
  }

  // generate accessToken and send in request
  const accessToken = generateAccessToken(String(user._id));

  return { accessToken };
};
export default loginLogic;
