import { Request, Response, NextFunction} from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from '../entities'
import  AppError  from '../errors/appError'

const verifyEmailAlreadyExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const emailAlreadyExists = await userRepository.findOne({
        where: {
            email: req.body.email
        }
    })

    if(emailAlreadyExists){

        throw new AppError('Email already exists', 409)
    }

    return next()

}

export default verifyEmailAlreadyExists