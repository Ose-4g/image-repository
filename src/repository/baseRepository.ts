import { Model } from 'mongoose';
import { Logger } from 'winston';
class BaseRepository<T> {
  model: Model<T>;
  logger: Logger;

  constructor(model: Model<T>, logger: Logger) {
    this.model = model;
    this.logger = logger;
  }
}

export default BaseRepository;
