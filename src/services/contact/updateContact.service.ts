import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities"
import AppError from "../../errors/appError"
import { IContactResponse, IContactUpdate } from "../../interfaces/contacts.interfaces"
import { returnContactSchema } from "../../schemas/contact.schemas"

const updateContactService = async (newContactData: IContactUpdate, contactId: string): Promise<IContactResponse> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const existingContact = await contactRepository.findOneBy({
        id: contactId
    })

    if (!existingContact) {
      throw new AppError("Contact not found", 404)
    }
  
    const updatedContactData: Partial<IContactUpdate> = {}
  
    if (newContactData.name) {
      updatedContactData.name = newContactData.name
    }
  
    if (newContactData.email) {
      updatedContactData.email = newContactData.email
    }
  
    if (newContactData.phoneNumber) {
      updatedContactData.phoneNumber = newContactData.phoneNumber
    }
  
    const updatedContact = await contactRepository
      .createQueryBuilder()
      .update(Contact)
      .set(updatedContactData)
      .where('id = :contactId', { contactId })
      .returning('*')
      .execute()

    const createdContact =  updatedContact.raw[0]
    
    const contactWithUser = {
          contactId: createdContact.id,
          contactName: createdContact.name,
          contactEmail: createdContact.email,
          contactPhoneNumber: createdContact.phoneNumber,
          userId: createdContact.user_id,
          createdAt: createdContact.createdAt
    }
  
    const returnContact = returnContactSchema.parse(contactWithUser)

    return returnContact
}
export default updateContactService