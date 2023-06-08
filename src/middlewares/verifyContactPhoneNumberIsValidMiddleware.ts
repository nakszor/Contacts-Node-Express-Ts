import { Request, Response, NextFunction} from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User, Contact } from '../entities'
import  AppError  from '../errors/appError'

const verifyContactPhoneNumberIsValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)
    
    const phoneNumber = req.body.phoneNumber

    const contactId = req.params.id

    const userId = req.user.id

    if(phoneNumber){

        const phoneNumberAlreadyExists = await contactRepository
            .createQueryBuilder('contact')
            .where('contact.user = :userId', { userId })
            .andWhere('contact.phoneNumber = :phoneNumber', { phoneNumber })
            .getOne();
        
            if(phoneNumberAlreadyExists){
                if (phoneNumberAlreadyExists!.id !== contactId) {
               
                    throw new AppError("A contact with this phone number already exists.",409)
                }
                return next()
            }
            

        return next()

    }
    
    return next()

}

export default verifyContactPhoneNumberIsValid