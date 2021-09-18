import { Schema, model, Model, Document } from 'mongoose'
import constants from '../utils/constants'

const { IMAGE, IMAGE_TAG } = constants.mongooseModels

export interface ImageTag extends Document {
    tag: string
}

const imageTagSchema = new Schema<ImageTag>({
    tag: {
        type: String,
        required: [true, 'image tag is required'],
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: IMAGE,
    },
})

const ImageTagModel = model<ImageTag>(IMAGE_TAG, imageTagSchema)
export default ImageTagModel