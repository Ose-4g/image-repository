import { Schema, model, Model, Document } from 'mongoose'
import constants from '../utils/constants'

const { USER, IMAGE } = constants.mongooseModels

export interface Image extends Document {
    userId: Schema.Types.ObjectId
    url: string
    tagged: boolean
    permission: string
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
    tagged: {
        type: Boolean,
        default: false,
    },
    permission: {
        type: String,
        required: [true, 'Image permission is required'],
    },
})

const ImageModel: Model<Image> = model<Image>(IMAGE, imageSchema)
export default ImageModel
