import { Router } from 'express';
import signUp from '../controllers/auth/signup';
import login from '../controllers/auth/login';
import joiMiddleware from '../middleware/joiMiddleware';
import { signUpSchema } from '../validators/auth';

const router: Router = Router();

router.post('/signup', joiMiddleware(signUpSchema), signUp);
router.post('/login', login);

export default router;
