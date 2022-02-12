import { Router } from 'express';
import signUp from '../controllers/auth/signup';
import login from '../controllers/auth/login';
import joiMiddleware from '../middleware/joiMiddleware';
import { signUpSchema } from '../validators/auth';
import ServiceLocator from '../di/serviceLocator';

const router: Router = Router();

router.post('/signup', joiMiddleware(signUpSchema), signUp(ServiceLocator.authService));
router.post('/login', login(ServiceLocator.authService));

export default router;
