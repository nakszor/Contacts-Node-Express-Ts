import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import  AppError  from '../../errors/appError'
import { IUserLogin } from '../../interfaces/user.interfaces'
import 'dotenv/config'
import { Repository } from 'typeorm'

const createSessionService = async (loginData: IUserLogin): Promise<string> => {

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

    return token
}

export default createSessionService