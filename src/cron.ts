import cron from 'node-cron';
import { getTags } from './utils/imaagi';
import { Image } from './models/Image';
import ImageTagModel, { ImageTag } from './models/ImageTag';
import logger from './utils/logger';
import constants from './utils/constants';
import Repository from './repository/Repository';

const { PUBLIC } = constants.permissions;

const cronJob = async (imageRepository: Repository<Image>): Promise<void> => {
  // sets image tags every minute for every untagged image that has been uploaded
  const setAllImageTags = cron.schedule('0 */1 * * * *', async () => {
    // get all untagged in the database
    const untaggedImages: Image[] = await imageRepository.find({
      tagged: false,
      permission: PUBLIC,
    });

    for (const image of untaggedImages) {
      // check if the image in question has already been tagged.
      const imagesTagged: ImageTag[] = await ImageTagModel.find({
        image: image._id,
      });

      // it there are no tags for that image
      //find the tags and add them
      if (imagesTagged.length <= 0) {
        const tags = await getTags(image.url);
        const allTags = tags.result.tags.map((tag: any) => {
          const key = Object.keys(tag.tag)[0];
          return tag.tag[key];
        });

        for (const tag of allTags) {
          await ImageTagModel.create({
            tag,
            image: image._id,
          });
        }
      }

      logger.info('Successfully tagged image');
      image.tagged = true;
      await image.save();
    }
  });

  setAllImageTags.start();
};

export default cronJob;
