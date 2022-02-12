import { Request, Response, NextFunction } from 'express';
import successResponse from '../../middleware/response';
import AuthService from '../../services/AuthService';

const signUp = (authService: AuthService) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    try {
      const user = await authService.signupLogic(firstName, lastName, email, password, passwordConfirm);
      return successResponse(res, 201, 'Successfully created user', user);
    } catch (error) {
      return next(error);
    }
  };
};

export default signUp;
