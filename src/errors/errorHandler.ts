import { Request, Response, NextFunction } from 'express';
import env from '../env.config';
import logger from '../utils/logger';
import AppError from './AppError';
import { deleteSingleImage, deleteMultipleImages } from '../utils/deleteImages';

const { NODE_ENV } = env;
const DEVELOPMENT = 'development';

const errorMiddleWare = async (error: AppError, req: Request, res: Response, next: NextFunction): Promise<void> => {
  // if an error occurs, delete uploaded file from aws s3 bucket
  if (req.file) {
    const url = (req.file as Express.MulterS3.File).location;
    await deleteSingleImage(url);
  }

  if (req.files) {
    const keys: { Key: string }[] = [];

    for (const file of req.files as Express.MulterS3.File[]) {
      const Key = (file as Express.MulterS3.File).location;
      keys.push({ Key });
    }
    await deleteMultipleImages(keys);
  }

  const body: any = {};
  body.status = 'error';
  body.message = error.message;

  if (NODE_ENV === DEVELOPMENT) {
    body.error = error.stack;
  }

  // if status code is not set, set it to 500
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
