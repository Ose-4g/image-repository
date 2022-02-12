import ImageModel, { Image } from '../models/Image';
import UserModel, { User } from '../models/User';
import Repository from '../repository/Repository';
import AuthService from '../services/AuthService';

export default class ServiceLocator {
  static imageRepository: Repository<Image> = new Repository(ImageModel);
  static userRepository: Repository<User> = new Repository(UserModel);
  static authService: AuthService = new AuthService(this.userRepository);
}
