import { Router } from 'express'
import authRouter from './auth'
import imageRouter from './image'

const router: Router = Router()

router.use('/auth', authRouter)
router.use('/image', imageRouter)

export default router
