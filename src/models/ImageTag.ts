import { Schema, model, Model, Document, PopulatedDoc } from 'mongoose';
import constants from '../utils/constants';
import { Image } from './Image';

const { IMAGE, IMAGE_TAG } = constants.mongooseModels;

export interface ImageTag extends Document {
  tag: string;
  image: PopulatedDoc<Image>;
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
});

const ImageTagModel: Model<ImageTag> = model<ImageTag>(IMAGE_TAG, imageTagSchema);
export default ImageTagModel;
