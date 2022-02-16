import { RequestHandler, Request, Response, NextFunction } from 'express';
import ImageModel, { Image } from '../../models/Image';
import constants from '../../utils/constants';
import successResponse from '../../middleware/response';
import ImageService from '../../services/ImageService';

const allPermissions = Object.values(constants.permissions);

/**
 * Gets all images a user has uploaded paginated
 * Takes query parameters for pagination
 * Takes a query parameter "permission" which filters the images based on permission.
 */

const getMyImages = (imageService: ImageService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, permission } = req.query;

    let _page = parseInt(page as string) || 1;
    _page = Math.max(_page, 1);

    let _limit = parseInt(limit as string) || 10;
    _limit = Math.max(_limit, 1);

    const filter: any = { userId: req.user._id };

    if (permission && allPermissions.includes(permission as string)) {
      filter.permission = permission;
    }

    const response = await imageService.getMyImages(filter, _page, _limit, { createdAt: -1 });
    return successResponse(res, 200, `successfully fetched ${response.data.length} result(s)`, response);
  };
};

export default getMyImages;
