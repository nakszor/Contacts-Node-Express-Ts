import { Request, Response, NextFunction} from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User, Contact } from '../entities'
import  AppError  from '../errors/appError'

const verifyContactEmailIsValid = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)
    
    const email = req.body.email

    const contactId = req.params.id

    const userId = req.user.id

    if(email){

        const emailAlreadyExists = await contactRepository
            .createQueryBuilder('contact')
            .where('contact.user = :userId', { userId })
            .andWhere('contact.email = :email', { email })
            .getOne();
        

        if(emailAlreadyExists){
            if (emailAlreadyExists!.id !== contactId) {
           
                throw new AppError("A contact with this email already exists.",409)
            }
            return next()
        }
        

        return next()

    }
    
    return next()

}

export default verifyContactEmailIsValid