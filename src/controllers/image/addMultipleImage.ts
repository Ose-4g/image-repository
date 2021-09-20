import ImageModel, { Image } from '../../models/Image';
import { RequestHandler, Request } from 'express';
import AppError from '../../errors/AppError';
import successResponse from '../../middleware/response';

const addMultipleImages: RequestHandler = async (req, res, next) => {
  // check that images were uploaded
  if (!req.files) {
    return next(new AppError('No images uploaded', 400));
  }

  const { permission } = req.body;
  const allImages = req.files as Express.MulterS3.File[];

  const images: Image[] = [];

  // save all images
  for (const file of allImages) {
    const image: Image = await ImageModel.create({
      userId: req.user._id,
      url: file.location,
      permission,
    });

    images.push(image);
  }

  return successResponse(res, 201, 'Images added successfully', images);
};

export default addMultipleImages;
