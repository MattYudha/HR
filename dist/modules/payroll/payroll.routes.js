"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payroll_controller_1 = __importDefault(require("./payroll.controller"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
router.post('/', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.checkRole)(['SUPER_ADMIN']), (req, res) => payroll_controller_1.default.createPayroll(req, res));
router.post('/bulk-generate', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.checkRole)(['SUPER_ADMIN']), (req, res) => payroll_controller_1.default.bulkGenerate(req, res));
router.get('/', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.checkRole)(['SUPER_ADMIN', 'HR_ADMIN']), (req, res) => payroll_controller_1.default.getPayrollList(req, res));
router.get('/me', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.checkRole)(['EMPLOYEE']), (req, res) => payroll_controller_1.default.getMyPayrolls(req, res));
exports.default = router;
//# sourceMappingURL=payroll.routes.js.map