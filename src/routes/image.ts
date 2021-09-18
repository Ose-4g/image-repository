import { Router } from 'express'
import { uploadS3 } from '../utils/upload'
import { addSingleImage } from '../controllers/image/addImage'
import { requireSignIn } from '../middleware/auth'

const router: Router = Router()

router.post('/new', requireSignIn, uploadS3.single('image'), addSingleImage)

export default router
