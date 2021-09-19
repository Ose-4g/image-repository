import Joi from 'joi';
import constants from '../utils/constants';

const { PUBLIC, PRIVATE } = constants.permissions;

const addImageSchema = Joi.object({
  permission: Joi.string()
    .required()
    .valid(PUBLIC, PRIVATE)
    .messages({
      'any.required': 'image permission is required',
      'string.valid': `permissions cna either be ${PUBLIC} OR ${PRIVATE}`,
    }),
  image: Joi.optional(),
});

export { addImageSchema };
