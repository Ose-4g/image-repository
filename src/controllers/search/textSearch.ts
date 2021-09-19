import { RequestHandler } from 'express';
import ImageTagModel, { ImageTag } from '../../models/ImageTag';
import ImageModel, { Image } from '../../models/Image';
import successResponse from '../../middleware/response';
import getImagesFromTags from '../../utils/getImages';
import constants from '../../utils/constants';

const { PUBLIC } = constants.permissions;

const searchByText: RequestHandler = async (req, res, next) => {
  const { search, page, limit } = req.query;

  let _page = parseInt(page as string) || 1;
  _page = Math.max(_page, 1);

  let _limit = parseInt(limit as string) || 10;
  _limit = Math.max(_limit, 1);

  if (!search) {
    const allImages: Image[] = await ImageModel.find({ permission: PUBLIC })
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
  } else {
    const allTags = String(search).trim().split(' ');
    const response = await getImagesFromTags(allTags, _page, _limit);

    return successResponse(res, 200, `successfully fetched ${response.results.length} result(s)`, response);
  }
};

export default searchByText;
