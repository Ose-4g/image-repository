import { Router } from 'express';
import signUp from '../controllers/auth/signup';
import login from '../controllers/auth/login';
import joiMiddleware from '../middleware/joiMiddleware';
import { signUpSchema } from '../validators/auth';
import UserRepository from '../repository/UserRepository';
import UserModel from '../models/User';

const router: Router = Router();
const userRepository = new UserRepository(UserModel);

router.post('/signup', joiMiddleware(signUpSchema), signUp(userRepository));
router.post('/login', login(userRepository));

export default router;
