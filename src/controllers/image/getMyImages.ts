import { RequestHandler } from 'express';
import ImageModel, { Image } from '../../models/Image';
import constants from '../../utils/constants';
import successResponse from '../../middleware/response';

const getMyImages: RequestHandler = async (req, res, next) => {
  const { page, limit } = req.query;

  let _page = parseInt(page as string) || 1;
  _page = Math.max(_page, 1);

  let _limit = parseInt(limit as string) || 10;
  _limit = Math.max(_limit, 1);

  const allImages: Image[] = await ImageModel.find({ userId: req.user._id })
    .skip((_page - 1) * _limit)
    .limit(_limit)
    .select('url');

  const totalDocs: number = await ImageModel.countDocuments();
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
