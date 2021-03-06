import axios from 'axios';
import env from '../env.config';
import AppError from '../errors/AppError';
import logger from './logger';

const { IMAAGI_KEY } = env;
const BASE_URL = 'https://api.imagga.com/v2';

/**
 *
 * @param imageUrl : url of image to get tags from
 * @returns tags gotten using imaagi api
 */
const getTags = async (imageUrl: string) => {
  try {
    const response = await axios({
      method: 'get',
      url: `${BASE_URL}/tags?threshold=30.0&image_url=${imageUrl}`,
      headers: { Authorization: `Basic ${IMAAGI_KEY}` },
    });
    return response.data;
  } catch (error) {
    logger.error(error);
    throw new AppError('An error occured', 500);
  }
};

export { getTags };
