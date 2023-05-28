import  AppError  from '../errors/appError'
import { User } from '../entities'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { Request, Response, NextFunction } from 'express'

const verifyUserExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user = await userRepository
        .createQueryBuilder('user')
        .where('user.id = :id', { id: req.user.id })
        .getOne()

    if (!user) {
    throw new AppError('User does not exist', 409);
    }

    return next()

}

export default verifyUserExists