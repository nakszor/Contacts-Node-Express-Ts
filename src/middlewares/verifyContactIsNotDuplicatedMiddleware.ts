import  AppError  from '../errors/appError'
import { Contact } from '../entities'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Request, Response, NextFunction } from "express"

const verifyContactIsNotDuplicatedMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const userId = req.user.id
    
    const phoneNumber = req.body.phoneNumber
    
    const email = req.body.email
      
    const existingContactByPhone = await contactRepository
        .createQueryBuilder('contact')
        .where('contact.user = :userId', { userId })
        .andWhere('contact.phoneNumber = :phoneNumber', { phoneNumber })
        .getOne()
      
    if (existingContactByPhone) {
          throw new AppError('Contact with the same phone number already exists.', 400)
    }
      
    const existingContactByEmail = await contactRepository
        .createQueryBuilder('contact')
        .where('contact.user = :userId', { userId })
        .andWhere('contact.email = :email', { email })
        .getOne()
      
    if (existingContactByEmail) {
        throw new AppError('Contact with the same email already exists.', 400)
    }
      
    next()
}      
export default verifyContactIsNotDuplicatedMiddleware