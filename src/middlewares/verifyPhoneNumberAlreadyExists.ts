import { Request, Response, NextFunction} from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from '../entities'
import  AppError  from '../errors/appError'

const verifyPhoneNumberAlreadyExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const phoneNumberAlreadyExists = await userRepository.findOne({
        where: {
            phoneNumber: req.body.phoneNumber
        }
    })

    if(phoneNumberAlreadyExists){

        throw new AppError('phone number already exists', 409)
    }

    return next()

}

export default verifyPhoneNumberAlreadyExists