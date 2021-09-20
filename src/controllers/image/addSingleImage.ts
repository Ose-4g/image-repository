import ImageModel, { Image } from '../../models/Image';
import { RequestHandler } from 'express';
import AppError from '../../errors/AppError';
import successResponse from '../../middleware/response';

const addSingleImage: RequestHandler = async (req, res, next) => {
  // check that images were uploaded
  if (!req.file) {
    return next(new AppError('No file uploaded', 400));
  }

  const { permission } = req.body;

  // add new image to database
  const image: Image = await ImageModel.create({
    userId: req.user._id,
    url: (req.file as Express.MulterS3.File).location,
    permission,
  });
  return successResponse(res, 201, 'Image added successfully', image.url);
};

export default addSingleImage;
