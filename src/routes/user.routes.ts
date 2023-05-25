import { Router } from 'express'
import { createUserController, deleteUserController, retrieveUserController, updateUserController } from '../controllers/user.controllers'
import { validateSchemaMiddleware, verifyEmailAlreadyExists, verifyPhoneNumberAlreadyExists, verifyUserPermissionMiddleware } from '../middlewares'
import { createUserSchema, userUpdateSchema } from '../schemas/user.schemas'
import verifyTokenIsValidMiddleware from '../middlewares/verifyTokenIsValidMiddleware'

const userRouter = Router()

userRouter.post('',validateSchemaMiddleware(createUserSchema), verifyEmailAlreadyExists, verifyPhoneNumberAlreadyExists, createUserController)
userRouter.get('/:id', verifyTokenIsValidMiddleware, verifyUserPermissionMiddleware, retrieveUserController)
userRouter.patch('/:id', verifyTokenIsValidMiddleware,validateSchemaMiddleware(userUpdateSchema), verifyEmailAlreadyExists, verifyPhoneNumberAlreadyExists,updateUserController)
userRouter.delete('/:id', verifyTokenIsValidMiddleware, verifyUserPermissionMiddleware, deleteUserController)
export default userRouter