"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../errors/appError"));
const entities_1 = require("../entities");
const data_source_1 = require("../data-source");
const verifyContactIsNotDuplicatedMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const contactRepository = data_source_1.AppDataSource.getRepository(entities_1.Contact);
    const userId = req.user.id;
    const phoneNumber = req.body.phoneNumber;
    const email = req.body.email;
    const existingContactByPhone = yield contactRepository
        .createQueryBuilder('contact')
        .where('contact.user = :userId', { userId })
        .andWhere('contact.phoneNumber = :phoneNumber', { phoneNumber })
        .getOne();
    if (existingContactByPhone) {
        throw new appError_1.default('Contact with the same phone number already exists.', 400);
    }
    const existingContactByEmail = yield contactRepository
        .createQueryBuilder('contact')
        .where('contact.user = :userId', { userId })
        .andWhere('contact.email = :email', { email })
        .getOne();
    if (existingContactByEmail) {
        throw new appError_1.default('Contact with the same email already exists.', 400);
    }
    next();
});
exports.default = verifyContactIsNotDuplicatedMiddleware;
