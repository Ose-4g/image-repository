import { RequestHandler } from 'express';
import ImageModel, { Image } from '../../models/Image';
import constants from '../../utils/constants';
import successResponse from '../../middleware/response';

const allPermissions = Object.values(constants.permissions);

/**
 * Gets all images a user has uploaded paginated
 * Takes query parameters for pagination
 * Takes a query parameter "permission" which filters the images based on permission.
 */
const getMyImages: RequestHandler = async (req, res, next) => {
  const { page, limit, permission } = req.query;

  let _page = parseInt(page as string) || 1;
  _page = Math.max(_page, 1);

  let _limit = parseInt(limit as string) || 10;
  _limit = Math.max(_limit, 1);

  const filter: any = { userId: req.user._id };

  if (permission && allPermissions.includes(permission as string)) {
    filter.permission = permission;
  }

  const allImages: Image[] = await ImageModel.find(filter)
    .skip((_page - 1) * _limit)
    .limit(_limit)
    .select('url');

  const totalDocs: number = await ImageModel.countDocuments(filter);
  const totalPages: number = Math.ceil(totalDocs / _limit);
  const response: any = {};

  response.currentPage = _page;
  response.prevPage = _page > 1 ? _page - 1 : null;
  response.nextPage = _page < totalPages ? _page + 1 : null;
  response.totalPages = totalPages;
  response.totalResults = totalDocs;
  response.results = allImages;

  return successResponse(res, 200, `successfully fetched ${allImages.length} result(s)`, response);
};

export default getMyImages;
