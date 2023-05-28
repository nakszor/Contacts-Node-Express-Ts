import { AppDataSource } from '../../data-source'
import { Contact,User } from '../../entities'
import { Repository } from 'typeorm'
import AppError from '../../errors/appError'
import { returnContactSchema } from '../../schemas/contact.schemas'
import { IContact, IContactResponse } from '../../interfaces/contacts.interfaces'

const createContactService = async (contactData: IContact,userId: string ): Promise<IContactResponse> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)
    const userRepository: Repository<User> = AppDataSource.getRepository(User)
    
    const user = await userRepository.findOneBy({
        id: userId,
      });
    
    if (!user) {
        throw new AppError("User not found", 404);
    }
  
    const newContact = contactRepository.createQueryBuilder('contact')
      .insert()
      .values({
        name: contactData.name,
        email: contactData.email,
        phoneNumber: contactData.phoneNumber,
        createdAt: new Date(),
        user: user
      })
      .returning('*')
      .execute()
    

    const createdContact = (await newContact).generatedMaps[0]
    
    const contactWithUser = {
        contactId: createdContact.id,
        contactName: createdContact.name,
        contactEmail: createdContact.email,
        contactPhoneNumber: createdContact.phoneNumber,
        userId: createdContact.user,
        createdAt: createdContact.createdAt
    }

    const returnContact = returnContactSchema.parse(contactWithUser)
  
    return returnContact
}
export default createContactService