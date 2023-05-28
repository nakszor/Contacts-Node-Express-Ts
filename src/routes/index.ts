import { Router } from 'express'
import userRouter from './user.routes'
import sessionRouter from './session.routes'
import contactRouter from './contact.routes'

const router = Router()

router.use('/user', userRouter)
router.use('/login', sessionRouter)
router.use('/contacts', contactRouter)

export default router