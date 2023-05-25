import { Router } from 'express'
import { createSessionController } from '../controllers/session.controller'
import { validateSchemaMiddleware } from '../middlewares'
import { userLoginSchema } from '../schemas/user.schemas'

const sessionRouter = Router()

sessionRouter.post('', validateSchemaMiddleware(userLoginSchema), createSessionController)

export default sessionRouter