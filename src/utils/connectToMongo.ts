import mongoose from 'mongoose';
import env from '../env.config';
import logger from '../utils/logger';
const { MONGO_URL } = env;

export default async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    logger.info('DB connected successfully');
  } catch (err) {
    console.log(err);
    logger.error('DB connection not successful');
  }
};
