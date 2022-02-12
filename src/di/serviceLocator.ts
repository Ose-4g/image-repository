import ImageModel, { Image } from '../models/Image';
import ImageTagModel, { ImageTag } from '../models/ImageTag';
import UserModel, { User } from '../models/User';
import Repository from '../repository/Repository';
import AuthService from '../services/AuthService';

export default class ServiceLocator {
  static imageRepository: Repository<Image> = new Repository(ImageModel);
  static userRepository: Repository<User> = new Repository(UserModel);
  static imageTagRepository: Repository<ImageTag> = new Repository(ImageTagModel);
  static authService: AuthService = new AuthService(this.userRepository);
}
