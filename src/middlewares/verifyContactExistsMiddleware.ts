import  AppError  from '../errors/appError'
import { Contact } from '../entities'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Request, Response, NextFunction } from 'express'

const verifyContactExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const contactId = req.params.id

    const userId = req.user.id

    const contact = await contactRepository
        .createQueryBuilder('contact')
        .where('contact.user = :userId', { userId })
        .andWhere('contact.id = :contactId', { contactId })
        .getOne()
        
    if (!contact) {
           
        throw new AppError("Contact does not exist.",409)
    }

    return next()

}

export default verifyContactExists