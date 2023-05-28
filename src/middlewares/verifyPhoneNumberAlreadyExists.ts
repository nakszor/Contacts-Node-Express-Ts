import { Request, Response, NextFunction} from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from '../entities'
import  AppError  from '../errors/appError'

const verifyPhoneNumberAlreadyExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    if(req.method === "POST"){
        const phoneNumberAlreadyExists = await userRepository.findOne({
            where: {
                phoneNumber: req.body.phoneNumber
            }
        })
    
        if(phoneNumberAlreadyExists){
    
            throw new AppError('Phone number already exists', 409)
        }

        return next()
    }
    
    const phoneNumber = req.body.phoneNumber;

    if (phoneNumber) {
        
      const userId = req.user.id;
    
      const phoneNumberAlreadyExists = await userRepository.findOne({
        where: {
          phoneNumber: phoneNumber,
        },
      })
    
      if (phoneNumberAlreadyExists && phoneNumberAlreadyExists.id !== userId) {
        throw new AppError('Phone number already exists', 409)
      }
    
      return next()
    }
    
    return next()

}

export default verifyPhoneNumberAlreadyExists