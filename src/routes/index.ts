import { Router } from 'express'
import userRouter from './user.routes'
import sessionRouter from './session.routes'
const router = Router()

router.use('/user', userRouter)
router.use('/login', sessionRouter)

export default router