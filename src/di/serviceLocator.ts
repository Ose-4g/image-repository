import ImageModel from '../models/Image';
import UserModel from '../models/User';
import ImageRepository from '../repository/ImageRepository';
import UserRepository from '../repository/UserRepository';

export default class ServiceLocator {
  static imageRepository: ImageRepository = new ImageRepository(ImageModel);
  static userRepository: UserRepository = new UserRepository(UserModel);
}
