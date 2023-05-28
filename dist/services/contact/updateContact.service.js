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
const appError_1 = __importDefault(require("../../errors/appError"));
const contact_schemas_1 = require("../../schemas/contact.schemas");
const updateContactService = (newContactData, contactId) => __awaiter(void 0, void 0, void 0, function* () {
    const contactRepository = data_source_1.AppDataSource.getRepository(entities_1.Contact);
    const existingContact = yield contactRepository.findOneBy({
        id: contactId
    });
    if (!existingContact) {
        throw new appError_1.default("Contact not found", 404);
    }
    const updatedContactData = {};
    if (newContactData.name) {
        updatedContactData.name = newContactData.name;
    }
    if (newContactData.email) {
        updatedContactData.email = newContactData.email;
    }
    if (newContactData.phoneNumber) {
        updatedContactData.phoneNumber = newContactData.phoneNumber;
    }
    const updatedContact = yield contactRepository
        .createQueryBuilder()
        .update(entities_1.Contact)
        .set(updatedContactData)
        .where('id = :contactId', { contactId })
        .returning('*')
        .execute();
    const createdContact = updatedContact.raw[0];
    const contactWithUser = {
        contactId: createdContact.id,
        contactName: createdContact.name,
        contactEmail: createdContact.email,
        contactPhoneNumber: createdContact.phoneNumber,
        userId: createdContact.user_id,
        createdAt: createdContact.createdAt
    };
    const returnContact = contact_schemas_1.returnContactSchema.parse(contactWithUser);
    return returnContact;
});
exports.default = updateContactService;
