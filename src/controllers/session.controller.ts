import { Request, Response } from 'express'
import { IUserLogin } from '../interfaces/user.interfaces'
import createSessionService from '../services/session/createSession.service'

export const createSessionController = async (req: Request, res:Response) =>{
   
    const loginData: IUserLogin = req.body

    const token = await createSessionService(loginData)

    return res.json({
        token: token
    })
}