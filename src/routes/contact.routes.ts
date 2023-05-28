import { Router } from 'express'
import { createContactController, deleteContactController, listContactsController, retrieveContactController, updateContactController } from '../controllers/contacts.controller'
import { validateSchemaMiddleware, verifyAuthorizationMiddleware, verifyContactPhoneNumberIsValid,verifyContactEmailIsValid, verifyContactExists, verifyContactIsNotDuplicatedMiddleware, verifyTokenIsValidMiddleware, verifyUserExists } from '../middlewares'
import { createContactSchema } from '../schemas/contact.schemas'

const contactRouter = Router()

contactRouter.post('', validateSchemaMiddleware(createContactSchema), verifyTokenIsValidMiddleware,verifyContactIsNotDuplicatedMiddleware,createContactController)
contactRouter.get('',verifyTokenIsValidMiddleware,listContactsController)
contactRouter.get('/:id',verifyTokenIsValidMiddleware, verifyUserExists,verifyContactExists,verifyAuthorizationMiddleware, retrieveContactController)
contactRouter.patch('/:id', verifyTokenIsValidMiddleware, verifyUserExists,verifyContactExists,verifyAuthorizationMiddleware,verifyContactPhoneNumberIsValid,verifyContactEmailIsValid,updateContactController)
contactRouter.delete('/:id', verifyTokenIsValidMiddleware, verifyUserExists,verifyContactExists,verifyAuthorizationMiddleware,deleteContactController)
export default contactRouter