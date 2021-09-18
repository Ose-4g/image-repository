import cron from 'node-cron'
import { getTags } from './utils/imaagi'
import ImageModel, { Image } from './models/Image'
import ImageTagModel, { ImageTag } from './models/ImageTag'
import logger from './utils/logger'

const cronJob = async () => {
    const test = cron.schedule('*/5 * * * * *', () => {
        // console.log(Math.ceil(Date.now()/1000))
        console.log('entered cron', Math.ceil(Date.now() / 1000))
        setTimeout(
            () => console.log('timeout', Math.ceil(Date.now() / 1000)),
            8000
        )
    })

    test.start()

    const setAllImageTags = cron.schedule('0 */5 * * * *', async () => {
        logger.info('getting all images not tagged')
        const untaggedImages: Image[] = await ImageModel.find({ tagged: false })

        for (const image of untaggedImages) {
            // check if the image in question has already been tagged.
            const imageTags: ImageTag[] = await ImageTagModel.find({
                image: image._id,
            })

            // it there are no tags for that image
            //find the tags and add them
            if (imageTags.length < 0) {
                const tags = await getTags(image.url)
                const allTags = tags.result.tags.map((tag: any) => {
                    const key = Object.keys(tag.tag)[0]
                    return tag.tag[key]
                })
                for (const tag of allTags) {
                    await ImageTagModel.create({
                        tag,
                        image: image._id,
                    })
                }
            }

            image.tagged = true
            await image.save()
        }
    })

    setAllImageTags.start()
}

cronJob()

export default cronJob
