import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { IUserResponse, IUserUpdate } from "../../interfaces/user.interfaces"
import { returnUserSchema } from "../../schemas/user.schemas"

const updateUserService = async (newUserData: IUserUpdate, idUser: string): Promise<IUserResponse> => {

    const userRepository: Repository<User> = AppDataSource.getRepository(User)

    const oldUserData = await userRepository.findOneBy({
        id: idUser
    })

    const user = userRepository.create({
        ...oldUserData,
        ...newUserData
    })

    await userRepository.save(user)

    const updatedUser = returnUserSchema.parse(user)

    return updatedUser

}

export default updateUserService