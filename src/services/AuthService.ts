import Repository from '../repository/Repository';
import { User } from '../models/User';
import AppError from '../errors/AppError';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { generateAccessToken } from '../utils/token';

class AuthService {
  userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  async loginLogic(email: string, password: string): Promise<{ accessToken: string }> {
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
    const user: User | null = await this.userRepository.findOne({ email }, '+password');

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
  }

  async signupLogic(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string
  ): Promise<User | void> {
    // check that the email is not in use
    const prevUsers: User[] = await this.userRepository.find({ email });

    if (prevUsers.length > 0) {
      throw new AppError('User with this email already exists', 400);
    }

    // create user
    const user: User | void = await this.userRepository.create({
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
    } as User); //firstName, lastName, email, password, password);
    return user;
  }
}

export default AuthService;
