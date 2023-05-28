import { Request, Response, NextFunction} from 'express'
import { Repository } from 'typeorm'
import { AppDataSource } from '../data-source'
import { User } from '../entities'
import  AppError  from '../errors/appError'

const verifyEmailAlreadyExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    if(req.method === "POST"){
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
    
    const email = req.body.email

    if(email){
        
        const userId = req.user.id

        const checkUserEmail = await userRepository.findOne({
            where: {
                email: req.body.email
            }
        })
        if(checkUserEmail){
            
            if(userId !== checkUserEmail.id){

                throw new AppError("Email already exists",409)                
            }

            return next()

        }

        return next()
       
    }
    
    return next()

}

export default verifyEmailAlreadyExists