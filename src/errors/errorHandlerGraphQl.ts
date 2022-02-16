import logger from '../utils/logger';
import AppError from './AppError';

const errorHandler = (error: any) => {
  logger.error(error);
  if (!error.statusCode) {
    return new AppError('Something went wrong', 500);
  }

  return error;
};

export default errorHandler;
