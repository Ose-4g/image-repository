import { RequestHandler } from 'express';
import successResponse from '../../middleware/response';
import getImagesFromTags from '../../utils/getImages';
import { getTags } from '../../utils/imaagi';
import AppError from '../../errors/AppError';
import { deleteSingleImage } from '../../utils/deleteImages';

/**
 * Get's paginated result for search with an image
 */
const searchByImage: RequestHandler = async (req, res, next) => {
  // check that images were uploaded
  if (!req.file) {
    return next(new AppError('No file uploaded', 400));
  }

  const url: string = (req.file as Express.MulterS3.File).location;

  const { page, limit } = req.query;

  let _page = parseInt(page as string) || 1;
  _page = Math.max(_page, 1);

  let _limit = parseInt(limit as string) || 10;
  _limit = Math.max(_limit, 1);

  try {
    //get tags from image

    const tags = await getTags(url);
    const allTags = tags.result.tags.map((tag: any) => {
      const key = Object.keys(tag.tag)[0];
      return tag.tag[key];
    });

    // get all images with similar tags
    const response = await getImagesFromTags(allTags, _page, _limit);

    successResponse(res, 200, `successfully fetched ${response.results.length} result(s)`, response);

    //delete the image from aws
    await deleteSingleImage(url);
  } catch {
    next(new AppError('Image search failed', 500));
  }
};

export default searchByImage;
