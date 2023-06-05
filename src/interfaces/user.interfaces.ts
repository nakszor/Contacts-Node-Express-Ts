import { z } from 'zod/lib'
import { DeepPartial } from 'typeorm'
import {createUserSchema, userLoginSchema, returnUserSchema, userLoginReturnSchema} from '../schemas/user.schemas'

export type IUser = z.infer<typeof createUserSchema>
export type IUserLogin = z.infer<typeof userLoginSchema>
export type IUserLoginReturn = z.infer<typeof userLoginReturnSchema>
export type IUserUpdate = DeepPartial<IUser>
export type IUserResponse = z.infer<typeof returnUserSchema>
