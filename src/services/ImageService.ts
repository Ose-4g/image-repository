import { FilterQuery } from 'mongoose';
import { Image } from '../models/Image';
import { User } from '../models/User';
import Repository from '../repository/Repository';
import { PaginatedResult } from '../utils/types';

class ImageService {
  imageRepository: Repository<Image>;
  userRepository: Repository<User>;

  constructor(imageRepository: Repository<Image>, userRepository: Repository<User>) {
    this.imageRepository = imageRepository;
    this.userRepository = userRepository;
  }

  async createSingleImage(userId: string, url: string, permission: string): Promise<Image | void> {
    const image = await this.imageRepository.create({
      userId,
      url,
      permission,
    } as Image);

    return image;
  }

  async createMultipleImages(allFiles: Express.MulterS3.File[], userId: string, permission: string): Promise<Image[]> {
    const allImages: Image[] = [];

    for (const file of allFiles) {
      allImages.push({
        url: file.location,
        userId,
        permission,
      } as Image);
    }

    const data = await this.imageRepository.createMany(allImages);
    return data;
  }

  async getMyImages(
    filter: FilterQuery<Image>,
    page = 1,
    limit = 10,
    sort = { createdAt: -1 }
  ): Promise<PaginatedResult<Image>> {
    const data = await this.imageRepository.findAndPaginate(filter, page, limit, sort, 'url');
    return data;
  }
}

export default ImageService;
