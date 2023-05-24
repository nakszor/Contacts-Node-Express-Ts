//import { IMovieReturn } from '../interfaces/movies.interfaces'
import { AppDataSource } from '../../data-source'
import { User } from '../../entities'
import { Repository } from 'typeorm'

const createUserService = async (userData:any) => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user = userRepository.create(userData)

    await userRepository.save(user)
    
    const newUser = user
    
    return newUser

}

export default createUserService