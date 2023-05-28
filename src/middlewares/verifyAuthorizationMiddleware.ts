import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/appError'
import { Repository } from "typeorm"
import { AppDataSource } from "../data-source"
import { Contact } from "../entities"
const verifyAuthorizationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        
    const contactRepository: Repository<Contact> = AppDataSource.getRepository(Contact)

    const userId = req.user.id

    const contactId = req.params.id

    const contact = await contactRepository
    .createQueryBuilder('contact')
    .leftJoin('contact.user', 'user')
    .where('contact.id = :contactId', { contactId })
    .andWhere('user.id = :userId', { userId })
    .getOne();

    if (!contact) {
     throw new AppError("You do not have sufficient permission to access this resource.",403);
    }
    return next()
}
export default verifyAuthorizationMiddleware;
