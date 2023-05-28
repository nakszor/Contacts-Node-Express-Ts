import { z } from 'zod'
import AppError from '../errors/appError'

const createContactSchema = z.object({
    name: z.string().max(250),
    email: z.string().max(150).email(),
    phoneNumber: z
      .string()
      .max(15)
      .min(10)
      .refine(value => /^\d+$/.test(value), {
        message: 'phoneNumber deve conter apenas números'
      })
});

const updateContactSchema = z.object({
    name: z.string().max(250).optional(),
    email: z.string().max(150).email().optional(),
    phoneNumber: z
      .string()
      .max(15)
      .min(10)
      .refine(value => /^\d+$/.test(value), {
        message: 'phoneNumber deve conter apenas números'
      }).optional()
}).refine(obj => {
    if (!('name' in obj) && !('email' in obj) && !('phoneNumber' in obj)) {
      throw new AppError('Pelo menos um dos campos "name", "email" ou "phoneNumber" é necessário', 400);
    }
    return true;
});
  
const returnContactSchema = z.object({
    contactId: z.string(),
    contactName: z.string().max(250),
    contactEmail: z.string().max(150).email(),
    contactPhoneNumber: z.string().max(15).min(10),
    userId: z.string(),
    createdAt: z.date(),
    
});
const responseContactSchema = z.object({
  contactId: z.string(),
  contactName: z.string().max(250),
  contactEmail: z.string().max(150).email(),
  contactPhoneNumber: z.string().max(15).min(10),
  createdAt: z.date()
})
const returnMultipleContactsSchema = responseContactSchema.array()

export {
    createContactSchema,
    returnContactSchema,
    updateContactSchema,
    returnMultipleContactsSchema
}