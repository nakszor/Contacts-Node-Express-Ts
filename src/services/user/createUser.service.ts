import { IUser, IUserResponse } from '../../interfaces/user.interfaces'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { Repository } from 'typeorm'
import { returnUserSchema } from '../../schemas/user.schemas'

const createUserService = async (userData: IUser): Promise<IUserResponse> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user: User = userRepository.create(userData)

    await userRepository.save(user)
    
    const newUser = returnUserSchema.parse(user)
    
    return newUser

}

export default createUserService