import { Response } from 'express';

export default (res: Response, statusCode: number, message: string, data: unknown): Response => {
  return res.status(statusCode).json({
    status: 'success',
    message,
    data,
  });
};
