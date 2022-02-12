import { Request, Response, NextFunction } from 'express';
import successResponse from '../../middleware/response';
import UserRepository from '../../repository/UserRepository';
import signupLogic from '../../controllerLogic/auth/signupLogic';

const signUp = (userRepository: UserRepository) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { firstName, lastName, email, password, passwordConfirm } = req.body;

    console.log('here 2');
    try {
      const user = await signupLogic(firstName, lastName, email, password, passwordConfirm, userRepository);
      return successResponse(res, 201, 'Successfully created user', user);
    } catch (error) {
      return next(error);
    }
  };
};

export default signUp;
