import { Request, Response, NextFunction } from 'express'
import AppError from '../errors/appError'

const verifyUserPermissionMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
         
    if(req.user.id !== req.params.id){
            
        throw new AppError('Insufficient permission', 403)
    }

    return next()

}
export default verifyUserPermissionMiddleware