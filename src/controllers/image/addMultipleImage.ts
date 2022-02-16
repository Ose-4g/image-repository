import ImageModel, { Image } from '../../models/Image';
import { RequestHandler, Request, Response, NextFunction } from 'express';
import AppError from '../../errors/AppError';
import successResponse from '../../middleware/response';
import ImageService from '../../services/ImageService';

const addMultipleImages = (imagesService: ImageService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // check that images were uploaded
    if (!req.files) {
      return next(new AppError('No images uploaded', 400));
    }

    const { permission } = req.body;
    const allImages = req.files as Express.MulterS3.File[];

    const images = await imagesService.createMultipleImages(allImages, req.user._id, permission);

    return successResponse(res, 201, 'Images added successfully', images);
  };
};

export default addMultipleImages;
