"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = __importDefault(require("./users.controller"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
router.get('/me', authMiddleware_1.authMiddleware, (req, res) => users_controller_1.default.getMe(req, res));
router.get('/', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.checkRole)(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) => users_controller_1.default.getAllUsers(req, res));
exports.default = router;
//# sourceMappingURL=users.routes.js.map