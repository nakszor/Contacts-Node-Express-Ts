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
const data_source_1 = require("../data-source");
const entities_1 = require("../entities");
const appError_1 = __importDefault(require("../errors/appError"));
const verifyEmailAlreadyExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.AppDataSource.getRepository(entities_1.User);
    if (req.method === "POST") {
        const emailAlreadyExists = yield userRepository.findOne({
            where: {
                email: req.body.email
            }
        });
        if (emailAlreadyExists) {
            throw new appError_1.default('Email already exists', 409);
        }
        return next();
    }
    const email = req.body.email;
    if (email) {
        const userId = req.user.id;
        const checkUserEmail = yield userRepository.findOne({
            where: {
                email: req.body.email
            }
        });
        if (checkUserEmail) {
            if (userId !== checkUserEmail.id) {
                throw new appError_1.default("Email already exists", 409);
            }
            return next();
        }
        return next();
    }
    return next();
});
exports.default = verifyEmailAlreadyExists;
