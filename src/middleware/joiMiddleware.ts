import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import AppError from '../errors/AppError';

/**
 * Used to validate schmea of request body
 */
const joiMiddleware = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body);
    if (!error) {
      return next();
    } else {
      const { details } = error;
      let message = '';
      details.forEach((element) => {
        message += element.message + ' ';
      });

      return next(new AppError(message, 400));
    }
  };
};

export default joiMiddleware;
