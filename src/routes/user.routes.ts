import { Router } from 'express'
import { createUserController } from '../controllers/user.controllers'

const userRouter = Router()

userRouter.post('',createUserController)

export default userRouter