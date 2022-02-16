import ImageModel, { Image } from '../../models/Image';
import { RequestHandler, Response, Request, NextFunction } from 'express';
import AppError from '../../errors/AppError';
import successResponse from '../../middleware/response';
import ImageService from '../../services/ImageService';

const addSingleImage = (imageService: ImageService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return next(new AppError('No file uploaded', 400));
    }

    const { permission } = req.body;

    try {
      // add new image to database
      const image: Image = (await imageService.createSingleImage(
        req.user._id,
        (req.file as Express.MulterS3.File).location,
        permission
      )) as Image;
      return successResponse(res, 201, 'Image added successfully', image.url);
    } catch (error) {
      next(error);
    }
  };
};

export default addSingleImage;
