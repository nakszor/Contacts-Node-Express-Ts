"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnMultipleContactsSchema = exports.updateContactSchema = exports.returnContactSchema = exports.createContactSchema = void 0;
const zod_1 = require("zod");
const appError_1 = __importDefault(require("../errors/appError"));
const createContactSchema = zod_1.z.object({
    name: zod_1.z.string().max(250),
    email: zod_1.z.string().max(150).email(),
    phoneNumber: zod_1.z
        .string()
        .max(15)
        .min(10)
        .refine(value => /^\d+$/.test(value), {
        message: 'phoneNumber deve conter apenas números'
    })
});
exports.createContactSchema = createContactSchema;
const updateContactSchema = zod_1.z.object({
    name: zod_1.z.string().max(250).optional(),
    email: zod_1.z.string().max(150).email().optional(),
    phoneNumber: zod_1.z
        .string()
        .max(15)
        .min(10)
        .refine(value => /^\d+$/.test(value), {
        message: 'phoneNumber deve conter apenas números'
    }).optional()
}).refine(obj => {
    if (!('name' in obj) && !('email' in obj) && !('phoneNumber' in obj)) {
        throw new appError_1.default('Pelo menos um dos campos "name", "email" ou "phoneNumber" é necessário', 400);
    }
    return true;
});
exports.updateContactSchema = updateContactSchema;
const returnContactSchema = zod_1.z.object({
    contactId: zod_1.z.string(),
    contactName: zod_1.z.string().max(250),
    contactEmail: zod_1.z.string().max(150).email(),
    contactPhoneNumber: zod_1.z.string().max(15).min(10),
    userId: zod_1.z.string(),
    createdAt: zod_1.z.date(),
});
exports.returnContactSchema = returnContactSchema;
const responseContactSchema = zod_1.z.object({
    contactId: zod_1.z.string(),
    contactName: zod_1.z.string().max(250),
    contactEmail: zod_1.z.string().max(150).email(),
    contactPhoneNumber: zod_1.z.string().max(15).min(10),
    createdAt: zod_1.z.date()
});
const returnMultipleContactsSchema = responseContactSchema.array();
exports.returnMultipleContactsSchema = returnMultipleContactsSchema;
