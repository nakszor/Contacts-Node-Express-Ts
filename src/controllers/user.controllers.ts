import { Request, Response } from 'express'
import createUserService from '../services/user/createUser.service'
import updateUserService from '../services/user/updateUser.service'
import deleteUserService from '../services/user/deleteUser.service'
import retrieveUserService from '../services/user/retrieveUser.service'

export const createUserController = async (req: Request, res: Response) => {

    const userData = req.body

    const newUser = await createUserService(userData)

    return res.status(201).json(newUser)

}
export const retrieveUserController = async (req: Request, res:Response) =>{
   
    const userId = req.params.id

    const user = await retrieveUserService(userId)

    return res.status(200).json(user)
}
export const updateUserController = async (req: Request, res:Response) =>{
    
    const newUserData = req.body
    
    const userId = req.params.id
    
    const newUser = await updateUserService(newUserData,userId)
    
    return res.status(200).json(newUser)
}
export const deleteUserController = async (req: Request, res:Response) =>{
    
    const userId = req.params.id
    
    await deleteUserService(userId)
    
    return res.status(204).json()
}