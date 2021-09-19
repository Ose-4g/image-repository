import { RequestHandler } from 'express';
import successResponse from '../../middleware/response';
import getImagesFromTags from '../../utils/getImages';
import { getTags } from '../../utils/imaagi';
import AppError from '../../errors/AppError';
import { deleteSingleImage } from '../../utils/deleteImages';

const searchByImage: RequestHandler = async (req, res, next) => {
  const url: string = (req.file as Express.MulterS3.File).location;

  const { page, limit } = req.query;

  let _page = parseInt(page as string) || 1;
  _page = Math.max(_page, 1);

  let _limit = parseInt(limit as string) || 10;
  _limit = Math.max(_limit, 1);

  try {
    const tags = await getTags(url);
    const allTags = tags.result.tags.map((tag: any) => {
      const key = Object.keys(tag.tag)[0];
      return tag.tag[key];
    });

    const response = await getImagesFromTags(allTags, _page, _limit);

    successResponse(res, 200, `successfully fetched ${response.results.length} result(s)`, response);

    //delete the image from aws
    await deleteSingleImage(url);
  } catch {
    next(new AppError('Image search failed', 500));
  }
};

export default searchByImage;
