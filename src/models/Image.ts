import { Schema, model, Model, Document, PopulatedDoc } from 'mongoose';
import constants from '../utils/constants';
import { User } from './User';

const { USER, IMAGE } = constants.mongooseModels;

export interface Image extends Document {
  userId: PopulatedDoc<User>;
  url: string;
  tagged: boolean;
  permission: string;
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
});

const ImageModel: Model<Image> = model<Image>(IMAGE, imageSchema);
export default ImageModel;
