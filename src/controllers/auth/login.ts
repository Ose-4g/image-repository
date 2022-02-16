process.env.NODE_ENV = 'test';
import { NextFunction, Request, Response } from 'express';
import successResponse from '../../middleware/response';
import AuthService from '../../services/AuthService';

const login = (authService: AuthService) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { email, password } = req.body;

    try {
      const { accessToken } = await authService.loginLogic(email, password);

      return successResponse(res, 200, 'User Logged in sucessfully', {
        accessToken,
      });
    } catch (error) {
      return next(error);
    }
  };
};

export default login;
