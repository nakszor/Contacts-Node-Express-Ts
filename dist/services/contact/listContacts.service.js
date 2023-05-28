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
const data_source_1 = require("../../data-source");
const entities_1 = require("../../entities");
const contact_schemas_1 = require("../../schemas/contact.schemas");
const appError_1 = __importDefault(require("../../errors/appError"));
const listContactsService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const contactRepository = data_source_1.AppDataSource.getRepository(entities_1.Contact);
    const userRepository = data_source_1.AppDataSource.getRepository(entities_1.User);
    const user = yield userRepository
        .createQueryBuilder('user')
        .where('user.id = :userId', { userId })
        .getOne();
    if (!user) {
        throw new Error('User not found');
    }
    const contacts = yield contactRepository
        .createQueryBuilder('contact')
        .select([
        'contact.id AS "contactId"',
        'contact.name AS "contactName"',
        'contact.phoneNumber AS "contactPhoneNumber"',
        'contact.email AS "contactEmail"',
        'contact.createdAt AS "createdAt"'
    ])
        .where('contact.user = :userId', { userId })
        .getRawMany();
    if (!contacts[0]) {
        throw new appError_1.default("This user has no contacts", 404);
    }
    const returnContacts = contact_schemas_1.returnMultipleContactsSchema.parse(contacts);
    return returnContacts;
});
exports.default = listContactsService;
