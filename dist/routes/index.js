"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = __importDefault(require("./user.routes"));
const session_routes_1 = __importDefault(require("./session.routes"));
const contact_routes_1 = __importDefault(require("./contact.routes"));
const router = (0, express_1.Router)();
router.use('/user', user_routes_1.default);
router.use('/login', session_routes_1.default);
router.use('/contacts', contact_routes_1.default);
exports.default = router;
