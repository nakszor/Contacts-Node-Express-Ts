import { z } from 'zod/lib'
import { DeepPartial } from 'typeorm'
import { createContactSchema, returnContactSchema, returnMultipleContactsSchema} from '../schemas/contact.schemas'

export type IContact = z.infer<typeof createContactSchema>
export type IContactUpdate = DeepPartial<IContact>
export type IContactResponse = z.infer<typeof returnContactSchema>
export type IContactsReturn = z.infer<typeof returnMultipleContactsSchema>