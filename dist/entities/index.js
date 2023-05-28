"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = exports.User = void 0;
const user_entities_1 = __importDefault(require("./user.entities"));
exports.User = user_entities_1.default;
const contact_entities_1 = __importDefault(require("./contact.entities"));
exports.Contact = contact_entities_1.default;
