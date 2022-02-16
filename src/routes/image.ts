import { Router } from 'express';
import { uploadS3 } from '../utils/upload';
import addSingleImage from '../controllers/image/addSingleImage';
import addMultipleImages from '../controllers/image/addMultipleImage';
import { requireSignIn } from '../middleware/auth';
import joiMiddleware from '../middleware/joiMiddleware';
import { addImageSchema } from '../validators/image';
import getMyImages from '../controllers/image/getMyImages';
import ServiceLocator from '../di/serviceLocator';

const imageService = ServiceLocator.imageService;
const router: Router = Router();
router.use(requireSignIn);

router.post('/add-one', uploadS3.single('image'), joiMiddleware(addImageSchema), addSingleImage(imageService));
router.post('/add-many', uploadS3.array('image', 15), joiMiddleware(addImageSchema), addMultipleImages(imageService));
router.get('/', getMyImages(imageService));

export default router;
