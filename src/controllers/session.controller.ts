import { Request, Response } from 'express'
import { IUserLogin } from '../interfaces/user.interfaces'
import createSessionService from '../services/session/createSession.service'

export const createSessionController = async (req: Request, res:Response) =>{
   
    const loginData: IUserLogin = req.body

    const response = await createSessionService(loginData)

    return res.status(200).json(response)
}