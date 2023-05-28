import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Contact, User } from "../../entities"
import { IContactsReturn } from "../../interfaces/contacts.interfaces"
import { returnMultipleContactsSchema } from "../../schemas/contact.schemas"
import AppError from "../../errors/appError"


const listContactsService = async (userId: string): Promise<IContactsReturn> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact);
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
   
    const user = await userRepository
    .createQueryBuilder('user')
    .where('user.id = :userId', { userId })
    .getOne();

    if (!user) {
        throw new Error('User not found');
    }

    const contacts = await contactRepository
        .createQueryBuilder('contact')
        .select([
            'contact.id AS "contactId"',
            'contact.name AS "contactName"',
            'contact.phoneNumber AS "contactPhoneNumber"',
            'contact.email AS "contactEmail"',
            'contact.createdAt AS "createdAt"'
        ])
        .where('contact.user = :userId', { userId })
        .getRawMany();
    
    if(!contacts[0]){
        throw new AppError("This user has no contacts", 404)
    }
    
    const returnContacts = returnMultipleContactsSchema.parse(contacts)
    
    return returnContacts
}  
export default listContactsService
