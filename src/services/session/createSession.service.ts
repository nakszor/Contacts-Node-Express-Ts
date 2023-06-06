import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import  AppError  from '../../errors/appError'
import { IUserLogin, IUserLoginReturn } from '../../interfaces/user.interfaces'
import 'dotenv/config'
import { Repository } from 'typeorm'
import { createUserSchema } from '../../schemas/user.schemas'
import { returnUserSchema } from '../../schemas/user.schemas'

const createSessionService = async (loginData: IUserLogin): Promise<any> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User | null = await userRepository.findOneBy({
        email: loginData.email
    })

    if(!user){
        throw new AppError('Invalid credentials', 401)
    }
   
    const passwordMatch = await compare(loginData.password, user.password)

    if(!passwordMatch){
        throw new AppError('Invalid credentials', 401)
    }

    const token: string = jwt.sign(
        {
            id: user.id
        },
        process.env.SECRET_KEY!,
        {
            expiresIn: process.env.EXPIRES_IN,
            subject: String(user.id)
        }
    )
    const returnUser = returnUserSchema.parse(user) 

    const response = {
        user: {...returnUser},
        token: token,
        
    }
    return response
}

export default createSessionService