"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = __importDefault(require("../errors/appError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const verifyTokenIsValidMiddleware = (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) {
        throw new appError_1.default('Missing bearer token', 401);
    }
    token = token.split(' ')[1];
    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            throw new appError_1.default(error.message, 401);
        }
        req.user = {
            id: decoded.sub
        };
        return next();
    });
};
exports.default = verifyTokenIsValidMiddleware;
