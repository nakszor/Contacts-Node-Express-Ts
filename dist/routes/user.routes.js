"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const middlewares_1 = require("../middlewares");
const user_schemas_1 = require("../schemas/user.schemas");
const verifyTokenIsValidMiddleware_1 = __importDefault(require("../middlewares/verifyTokenIsValidMiddleware"));
const userRouter = (0, express_1.Router)();
userRouter.post('', (0, middlewares_1.validateSchemaMiddleware)(user_schemas_1.createUserSchema), middlewares_1.verifyEmailAlreadyExists, middlewares_1.verifyPhoneNumberAlreadyExists, user_controllers_1.createUserController);
userRouter.get('/:id', verifyTokenIsValidMiddleware_1.default, middlewares_1.verifyUserExists, middlewares_1.verifyUserPermissionMiddleware, user_controllers_1.retrieveUserController);
userRouter.patch('/:id', verifyTokenIsValidMiddleware_1.default, middlewares_1.verifyUserExists, middlewares_1.verifyUserPermissionMiddleware, (0, middlewares_1.validateSchemaMiddleware)(user_schemas_1.userUpdateSchema), middlewares_1.verifyEmailAlreadyExists, middlewares_1.verifyPhoneNumberAlreadyExists, user_controllers_1.updateUserController);
userRouter.delete('/:id', verifyTokenIsValidMiddleware_1.default, middlewares_1.verifyUserExists, middlewares_1.verifyUserPermissionMiddleware, user_controllers_1.deleteUserController);
exports.default = userRouter;
