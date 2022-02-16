import { Model } from 'mongoose';
import { PaginatedResult } from '../utils/types';
import { FilterQuery } from 'mongoose';

class Repository<T> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(body: T): Promise<T | void> {
    const data = await this.model.create(body);

    return data;
  }

  async createMany(body: T[]): Promise<T[]> {
    const data = await this.model.create(body);
    return data;
  }

  async findById(id: string): Promise<T | null> {
    const data = await this.model.findById(id);
    return data;
  }

  async findOne(filter: FilterQuery<T> = {}, select: string | null = null): Promise<T | null> {
    let query = this.model.findOne(filter);
    if (select) query = query.select(select);

    const data = await query;
    return data;
  }

  async find(filter: FilterQuery<T> = {}): Promise<T[]> {
    const data = await this.model.find(filter);
    return data;
  }

  async findByIdAndDelete(id: string): Promise<void> {
    await this.model.findByIdAndDelete(id);
  }

  async findOndeAndDelete(filter: FilterQuery<T>): Promise<void> {
    await this.model.findOneAndDelete(filter);
  }

  async deleteMany(filter: FilterQuery<T>): Promise<void> {
    await this.model.deleteMany(filter);
  }

  async findAndPaginate(
    filter: FilterQuery<T>,
    page: number,
    limit: number,
    sort: any, //-1 for descending order of course code, 1 for ascending,
    select: string | null = null
  ): Promise<PaginatedResult<T>> {
    const totalDocuments = await this.model.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / limit);
    const currentPage = page;
    const nextPage = page + 1 <= totalPages ? page + 1 : null;
    const prevPage = page - 1 >= 0 ? page - 1 : null;

    let query = this.model
      .find(filter)
      .sort(sort)
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
}

export default Repository;
