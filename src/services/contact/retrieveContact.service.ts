import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Contact } from "../../entities"
import { IContactResponse } from "../../interfaces/contacts.interfaces"
import { returnContactSchema } from "../../schemas/contact.schemas"

const retrieveContactService = async (contactId: string): Promise<IContactResponse> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const contact = await contactRepository
    .createQueryBuilder('contact')
    .leftJoin('contact.user', 'user')
    .where('contact.id = :contactId', { contactId })
    .select([
      'contact.id AS "contactId"',
      'contact.name AS "contactName"',
      'contact.phoneNumber AS "contactPhoneNumber"',
      'contact.email AS "contactEmail"',
      'user.id AS "userId"',
      'contact.createdAt AS "createdAt"'
    ])
    .getRawOne();


   const returnContact = returnContactSchema.parse(contact)

    return returnContact

}

export default retrieveContactService