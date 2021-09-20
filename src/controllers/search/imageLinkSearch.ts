import { RequestHandler } from 'express';
import successResponse from '../../middleware/response';
import getImagesFromTags from '../../utils/getImages';
import { getTags } from '../../utils/imaagi';
import AppError from '../../errors/AppError';

/**
 * Get's paginated result for search with an image
 */
const searchByImageLink: RequestHandler = async (req, res, next) => {
  const { url } = req.query;

  const { page, limit } = req.query;

  let _page = parseInt(page as string) || 1;
  _page = Math.max(_page, 1);

  let _limit = parseInt(limit as string) || 10;
  _limit = Math.max(_limit, 1);

  try {
    //get tags from image

    const tags = await getTags(url as string);
    const allTags = tags.result.tags.map((tag: any) => {
      const key = Object.keys(tag.tag)[0];
      return tag.tag[key];
    });

    // get all images with similar tags
    const response = await getImagesFromTags(allTags, _page, _limit);

    return successResponse(res, 200, `successfully fetched ${response.results.length} result(s)`, response);
  } catch {
    next(new AppError('Image search failed', 500));
  }
};

export default searchByImageLink;
