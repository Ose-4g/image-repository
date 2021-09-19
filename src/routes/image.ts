import { Router } from 'express';
import { uploadS3 } from '../utils/upload';
import addSingleImage from '../controllers/image/addSingleImage';
import addMultipleImages from '../controllers/image/addMultipleImage';
import { requireSignIn } from '../middleware/auth';
import joiMiddleware from '../middleware/joiMiddleware';
import { addImageSchema } from '../validators/image';

const router: Router = Router();
router.use(requireSignIn);

router.post('/add-one', uploadS3.single('image'), joiMiddleware(addImageSchema), addSingleImage);
router.post('/add-many', uploadS3.array('image', 15), joiMiddleware(addImageSchema), addMultipleImages);

export default router;
