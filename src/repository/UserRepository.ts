import { FilterQuery } from 'mongoose';
import { User } from '../models/User';
import BaseRepository from './baseRepository';
import { PaginatedResult } from '../utils/types';

class UserRepository extends BaseRepository<User> {
  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    passwordConfirm: string
  ): Promise<User | void> {
    const data = await this.model.create({
      email,
      firstName,
      lastName,
      password,
      passwordConfirm,
    });
    return data;
  }

  async findUserById(id: string): Promise<User | null> {
    const data = await this.model.findById(id);
    return data;
  }

  async findOneUser(filter: FilterQuery<User> = {}, select = ''): Promise<User | null> {
    let query = this.model.findOne(filter);
    if (select !== '') query = query.select(select);

    const data = await query;
    return data;
  }

  async find(filter: FilterQuery<User> = {}): Promise<User[]> {
    const data = await this.model.find(filter);
    return data;
  }
  async findAndPaginate(
    filter: FilterQuery<User>,
    page: number,
    limit: number,
    sort: number //-1 for descending order of course code, 1 for ascending
  ): Promise<PaginatedResult<User>> {
    const totalDocuments = await this.model.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / limit);
    const currentPage = page;
    const nextPage = page + 1 <= totalPages ? page + 1 : null;
    const prevPage = page - 1 >= 0 ? page - 1 : null;

    const data = await this.model
      .find(filter)
      .sort({ code: sort })
      .skip((page - 1) * limit)
      .limit(limit);

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

  async findOndeAndDelete(filter: FilterQuery<User>): Promise<void> {
    await this.model.findOneAndDelete(filter);
  }

  async deleteMany(filter: FilterQuery<User>): Promise<void> {
    await this.model.deleteMany(filter);
  }
}

export default UserRepository;
