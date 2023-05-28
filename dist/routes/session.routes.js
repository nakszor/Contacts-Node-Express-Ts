"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const session_controller_1 = require("../controllers/session.controller");
const middlewares_1 = require("../middlewares");
const user_schemas_1 = require("../schemas/user.schemas");
const sessionRouter = (0, express_1.Router)();
sessionRouter.post('', (0, middlewares_1.validateSchemaMiddleware)(user_schemas_1.userLoginSchema), session_controller_1.createSessionController);
exports.default = sessionRouter;
