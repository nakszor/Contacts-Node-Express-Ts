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
exports.deleteContactController = exports.updateContactController = exports.retrieveContactController = exports.listContactsController = exports.createContactController = void 0;
const createContact_service_1 = __importDefault(require("../services/contact/createContact.service"));
const listContacts_service_1 = __importDefault(require("../services/contact/listContacts.service"));
const retrieveContact_service_1 = __importDefault(require("../services/contact/retrieveContact.service"));
const updateContact_service_1 = __importDefault(require("../services/contact/updateContact.service"));
const deleteContact_service_1 = __importDefault(require("../services/contact/deleteContact.service"));
const createContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactData = req.body;
    const userId = req.user.id;
    const newContact = yield (0, createContact_service_1.default)(contactData, userId);
    return res.status(201).json(newContact);
});
exports.createContactController = createContactController;
const listContactsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.id;
    const contacts = yield (0, listContacts_service_1.default)(userId);
    return res.status(200).json(contacts);
});
exports.listContactsController = listContactsController;
const retrieveContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactId = req.params.id;
    const contact = yield (0, retrieveContact_service_1.default)(contactId);
    return res.status(200).json(contact);
});
exports.retrieveContactController = retrieveContactController;
const updateContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newContactData = req.body;
    const contactId = req.params.id;
    const newContact = yield (0, updateContact_service_1.default)(newContactData, contactId);
    return res.status(200).json(newContact);
});
exports.updateContactController = updateContactController;
const deleteContactController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactId = req.params.id;
    yield (0, deleteContact_service_1.default)(contactId);
    return res.status(204).json();
});
exports.deleteContactController = deleteContactController;
