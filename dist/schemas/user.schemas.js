"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userUpdateSchema = exports.returnUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const appError_1 = __importDefault(require("../errors/appError"));
const createUserSchema = zod_1.z.object({
    name: zod_1.z.string().max(250),
    email: zod_1.z.string().max(150).email(),
    password: zod_1.z.string().max(150),
    phoneNumber: zod_1.z
        .string()
        .max(15)
        .min(10)
        .refine(value => /^\d+$/.test(value), {
        message: 'phoneNumber deve conter apenas números'
    })
});
exports.createUserSchema = createUserSchema;
const userLoginSchema = zod_1.z.object({
    email: zod_1.z.string().max(150).email(),
    password: zod_1.z.string().max(150)
});
exports.userLoginSchema = userLoginSchema;
const userUpdateSchema = zod_1.z.object({
    name: zod_1.z.string().max(250).optional(),
    email: zod_1.z.string().max(150).email().optional(),
    password: zod_1.z.string().max(150).optional(),
    phoneNumber: zod_1.z
        .string()
        .max(15)
        .min(10)
        .refine(value => /^\d+$/.test(value), {
        message: 'phoneNumber deve conter apenas números'
    }).optional()
}).refine(obj => {
    if (!('name' in obj) && !('email' in obj) && !('password' in obj) && !('phoneNumber' in obj)) {
        throw new appError_1.default('Pelo menos um dos campos "name", "email", "password" ou "phoneNumber" é necessário', 400);
    }
    return true;
});
exports.userUpdateSchema = userUpdateSchema;
const createdUserSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string().max(250),
    email: zod_1.z.string().max(150).email(),
    password: zod_1.z.string().max(150),
    phoneNumber: zod_1.z
        .string()
        .max(15)
        .min(10),
    createdAt: zod_1.z.date()
});
const returnUserSchema = createdUserSchema.omit({ password: true });
exports.returnUserSchema = returnUserSchema;
