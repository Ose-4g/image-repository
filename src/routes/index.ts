import { Router } from 'express';
import authRouter from './auth';
import imageRouter from './image';
import searchRouter from './search';

const router: Router = Router();

router.use('/auth', authRouter);
router.use('/image', imageRouter);
router.use('/search', searchRouter);

export default router;
