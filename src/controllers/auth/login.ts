process.env.NODE_ENV = 'test';
import { NextFunction, Request, Response } from 'express';
import successResponse from '../../middleware/response';
import loginLogic from '../../controllerLogic/auth/loginLogic';
import UserRepository from '../../repository/UserRepository';

const login = (userRepository: UserRepository) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { email, password } = req.body;

    const accessToken = await loginLogic(email, password, userRepository).catch((err) => {
      return next(err);
    });

    return successResponse(res, 200, 'User Logged in sucessfully', {
      accessToken,
    });
  };
};

export default login;
