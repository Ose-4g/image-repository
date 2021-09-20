import { Router } from 'express';
import searchByText from '../controllers/search/textSearch';
import { uploadS3 } from '../utils/upload';
import searchByImage from '../controllers/search/imageSearch';
import searchByImageLink from '../controllers/search/imageLinkSearch';

const router: Router = Router();

router.get('/', searchByText);
router.get('/image', uploadS3.single('image'), searchByImage);
router.get('/image-link', searchByImageLink);

export default router;
