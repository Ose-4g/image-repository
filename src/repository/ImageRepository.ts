import { FilterQuery } from 'mongoose';
import { Image } from '../models/Image';
import BaseRepository from './baseRepository';
import { PaginatedResult } from '../utils/types';

class ImageRepository extends BaseRepository<Image> {
  async createUser(userId: string, url: string, permission: string): Promise<Image | void> {
    const data = await this.model.create({
      userId,
      url,
      permission,
    });
    return data;
  }

  async findImageById(id: string): Promise<Image | null> {
    const data = await this.model.findById(id);
    return data;
  }

  async findOneImage(filter: FilterQuery<Image> = {}, select: string | null = null): Promise<Image | null> {
    let query = this.model.findOne(filter);
    if (select) query = query.select(select);

    const data = await query;
    return data;
  }

  async find(filter: FilterQuery<Image> = {}): Promise<Image[]> {
    const data = await this.model.find(filter);
    return data;
  }
  async findAndPaginate(
    filter: FilterQuery<Image>,
    page: number,
    limit: number,
    sort: number, //-1 for descending order of course code, 1 for ascending,
    select: string | null = null
  ): Promise<PaginatedResult<Image>> {
    const totalDocuments = await this.model.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / limit);
    const currentPage = page;
    const nextPage = page + 1 <= totalPages ? page + 1 : null;
    const prevPage = page - 1 >= 0 ? page - 1 : null;

    let query = this.model
      .find(filter)
      .sort({ code: sort })
      .skip((page - 1) * limit)
      .limit(limit);

    if (select) query = query.select(select);

    const data = await query;
    return {
      totalDocuments,
      totalPages,
      currentPage,
      nextPage,
      prevPage,
      data,
    };
  }

  async findByIdAndDelete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  async findOndeAndDelete(filter: FilterQuery<Image>): Promise<void> {
    await this.model.findOneAndDelete(filter);
  }

  async deleteMany(filter: FilterQuery<Image>): Promise<void> {
    await this.model.deleteMany(filter);
  }
}

export default ImageRepository;
