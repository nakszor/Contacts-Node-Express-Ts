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
const verifyContactExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const contactRepository = data_source_1.AppDataSource.getRepository(entities_1.Contact);
    const contactId = req.params.id;
    const userId = req.user.id;
    const contact = yield contactRepository
        .createQueryBuilder('contact')
        .where('contact.user = :userId', { userId })
        .andWhere('contact.id = :contactId', { contactId })
        .getOne();
    if (!contact) {
        throw new appError_1.default("Contact does not exist.", 409);
    }
    return next();
});
exports.default = verifyContactExists;
