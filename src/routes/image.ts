import { Router } from 'express';
import { uploadS3 } from '../utils/upload';
import addSingleImage from '../controllers/image/addSingleImage';
import addMultipleImages from '../controllers/image/addMultipleImage';
import { requireSignIn } from '../middleware/auth';
import joiMiddleware from '../middleware/joiMiddleware';
import { addImageSchema } from '../validators/image';

const router: Router = Router();

router.post('/add-one', joiMiddleware(addImageSchema), requireSignIn, uploadS3.single('image'), addSingleImage);
router.post('/add-many', joiMiddleware(addImageSchema), requireSignIn, uploadS3.array('image', 15), addMultipleImages);

export default router;
