import { Request, Response, NextFunction } from 'express';
import env from '../env.config';
import logger from '../utils/logger';
import AppError from './AppError';

const { NODE_ENV } = env;
const DEVELOPMENT = 'development';

const errorMiddleWare = (error: AppError, req: Request, res: Response, next: NextFunction): void => {
  console.log(error);
  const body: any = {};
  body.status = 'error';
  body.message = error.message;

  if (NODE_ENV === DEVELOPMENT) {
    body.error = error.stack;
  }

  if (!error.statusCode) {
    error.statusCode = 500;
  }

  if (NODE_ENV !== DEVELOPMENT && error.statusCode >= 500) {
    error.message = 'Something went very wrong';
  }
  logger.error(error.message);
  res.status(error.statusCode).json(body);
  return;
};

export default errorMiddleWare;
