import { Request, Response } from 'express'
import createContactService from '../services/contact/createContact.service'
import listContactsService from '../services/contact/listContacts.service'
import retrieveContactService from '../services/contact/retrieveContact.service'
import updateContactService from '../services/contact/updateContact.service'
import deleteContactService from '../services/contact/deleteContact.service'

export const createContactController = async (req: Request, res: Response) => {

    const contactData = req.body

    const userId = req.user.id
   
    const newContact = await createContactService(contactData,userId)

    return res.status(201).json(newContact)

}
export const listContactsController = async (req: Request, res:Response) =>{
   
    const userId = req.user.id

    const contacts = await listContactsService(userId)

    return res.status(200).json(contacts)
}
export const retrieveContactController = async (req: Request, res:Response) =>{
   
    const contactId = req.params.id

    const contact = await retrieveContactService(contactId)

    return res.status(200).json(contact)
}
export const updateContactController = async (req: Request, res:Response) =>{
    
    const newContactData = req.body
    
    const contactId = req.params.id
    
    const newContact = await updateContactService(newContactData,contactId)
    
    return res.status(200).json(newContact)
}
export const deleteContactController = async (req: Request, res:Response) =>{
    
    const contactId = req.params.id
    
    await deleteContactService(contactId)
    
    return res.status(204).json()
}