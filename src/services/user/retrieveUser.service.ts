import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { IUserResponse, IUserUpdate } from "../../interfaces/user.interfaces"
import { returnUserSchema } from "../../schemas/user.schemas"

const retrieveUserService = async (idUser: string): Promise<IUserResponse> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        id: idUser
    })

    const returnUser = returnUserSchema.parse(user)

    return returnUser

}

export default retrieveUserService