import { Request, Response, NextFunction } from 'express';
import successResponse from '../../middleware/response';
import UserRepository from '../../repository/UserRepository';
import signupLogic from '../../controllerLogic/auth/signupLogic';

const signUp = (userRepository: UserRepository) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    const user = await signupLogic(firstName, lastName, email, password, passwordConfirm, userRepository).catch(
      (err) => {
        return next(err);
      }
    );

    return successResponse(res, 201, 'Successfully created user', user);
  };
};

export default signUp;
