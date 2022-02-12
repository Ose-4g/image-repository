import { User } from '../../models/User';
import AppError from '../../errors/AppError';
import UserRepository from '../../repository/UserRepository';

const signupLogic = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  passwordConfirm: string,
  userRepository: UserRepository
): Promise<User | void> => {
  // check that the email is not in use
  const prevUsers: User[] = await userRepository.find({ email });

  if (prevUsers.length > 0) {
    throw new AppError('User with this email already exists', 400);
  }

  // create user
  const user: User | void = await userRepository.createUser(firstName, lastName, email, password, password);
  console.log('here 1');
  return user;
};

export default signupLogic;
