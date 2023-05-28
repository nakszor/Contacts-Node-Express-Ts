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
exports.deleteUserController = exports.updateUserController = exports.retrieveUserController = exports.createUserController = void 0;
const createUser_service_1 = __importDefault(require("../services/user/createUser.service"));
const updateUser_service_1 = __importDefault(require("../services/user/updateUser.service"));
const deleteUser_service_1 = __importDefault(require("../services/user/deleteUser.service"));
const retrieveUser_service_1 = __importDefault(require("../services/user/retrieveUser.service"));
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const newUser = yield (0, createUser_service_1.default)(userData);
    return res.status(201).json(newUser);
});
exports.createUserController = createUserController;
const retrieveUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const user = yield (0, retrieveUser_service_1.default)(userId);
    return res.status(200).json(user);
});
exports.retrieveUserController = retrieveUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUserData = req.body;
    const userId = req.params.id;
    const newUser = yield (0, updateUser_service_1.default)(newUserData, userId);
    return res.status(200).json(newUser);
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    yield (0, deleteUser_service_1.default)(userId);
    return res.status(204).json();
});
exports.deleteUserController = deleteUserController;
