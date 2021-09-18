import { Schema, model, Model, Document } from 'mongoose'
import constants from '../utils/constants'
import { getTags } from '../utils/imaagi'

const { USER, IMAGE } = constants.mongooseModels

export interface Image extends Document {
    url: string
}

const imageSchema = new Schema<Image>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: USER,
    },
    url: {
        type: String,
        required: true,
    },
})

imageSchema.post('save', async function (image: Image) {
    console.log('here 3')
    console.log(image)
    await getTags(image.url)
    console.log('here 4')
})

const ImageModel = model<Image>(IMAGE, imageSchema)
export default ImageModel
