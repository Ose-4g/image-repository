import { Router } from 'express';
import { requireSignIn } from '../middleware/auth';
import searchByText from '../controllers/search/textSearch';
import { uploadS3 } from '../utils/upload';
import searchByImage from '../controllers/search/imageSearch';

const router: Router = Router();

router.get('/', searchByText);
router.get('/image', uploadS3.single('image'), searchByImage);

export default router;
