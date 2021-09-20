import ImageTagModel, { ImageTag } from '../models/ImageTag';
import ImageModel, { Image } from '../models/Image';

/**
 *
 * @param tag :String
 * @returns an array of imageIds
 */
const getImages = async (tag: string): Promise<string[]> => {
  const allImageTags: ImageTag[] = await ImageTagModel.find({ tag: { $regex: new RegExp(`.*${tag}.*`, 'i') } });

  // get all image ids from the tags
  const allImageIds = [];
  for (const imageTag of allImageTags) {
    allImageIds.push(String(imageTag.image));
  }
  return allImageIds;
};

/**
 * 
 * @param allTags :array of tags to be searched
 * @param _page :pagination
 * @param _limit: pa
gination
 * @returns : paaaaginated result 
 */
const getImagesFromTags = async (allTags: string[], _page: number, _limit: number): Promise<any> => {
  const countMap = new Map<string, number>();
  const allImageIds = [];
  for (const tag of allTags) {
    const imageIds = await getImages(tag);
    for (const imageId of imageIds) {
      if (!countMap.has(imageId)) {
        countMap.set(imageId, 0);
        allImageIds.push(imageId);
      }
      countMap.set(imageId, (countMap.get(imageId) as number) + 1);
    }
  }

  allImageIds.sort((a, b) => {
    return -(countMap.get(a)! - countMap.get(b)!);
  });

  const start = (_page - 1) * _limit;
  const end = start + _limit;
  const imageResults: Image[] = [];

  for (let i = start; i < end; i++) {
    if (i >= allImageIds.length) {
      break;
    }
    const image = await ImageModel.findById(allImageIds[i]);
    imageResults.push(image as Image);
  }

  const totalDocs: number = allImageIds.length;
  const totalPages: number = Math.ceil(totalDocs / _limit);
  const response: any = {};

  response.currentPage = _page;
  response.prevPage = _page > 1 ? _page - 1 : null;
  response.nextPage = _page < totalPages ? _page + 1 : null;
  response.totalPages = totalPages;
  response.totalResults = totalDocs;
  response.results = imageResults;

  return response;
};
export default getImagesFromTags;
