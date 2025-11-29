"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const employees_controller_1 = __importDefault(require("./employees.controller"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
router.get('/me', authMiddleware_1.authMiddleware, (req, res) => employees_controller_1.default.getMyProfile(req, res));
router.get('/', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.checkRole)(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) => employees_controller_1.default.getAllEmployees(req, res));
router.post('/', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.checkRole)(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) => employees_controller_1.default.createEmployee(req, res));
exports.default = router;
//# sourceMappingURL=employees.routes.js.map