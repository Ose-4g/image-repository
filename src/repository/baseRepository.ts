import { Model } from 'mongoose';
import { Logger } from 'winston';
class BaseRepository<T> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }
}

export default BaseRepository;
