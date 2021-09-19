import aws from 'aws-sdk';
import env from '../env.config';
import AppError from '../errors/AppError';
import logger from './logger';

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME } = env;

const s3 = new aws.S3({
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const deleteSingleImage = async (url: string) => {
  await s3.deleteObject({ Bucket: BUCKET_NAME, Key: url }, (error) => {
    if (error) {
      throw new AppError(error.message, 500);
    } else logger.info(`Deleted image ${url} successfully`);
  });
};

const deleteMultipleImages = async (files: { Key: string }[]) => {
  await s3.deleteObjects({ Bucket: BUCKET_NAME, Delete: { Objects: files } }, (err) => {
    if (err) {
      throw new AppError(err.message, 500);
    } else logger.info(`Successfully deleted multiple images`);
  });
};

export { deleteMultipleImages, deleteSingleImage };
