"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payroll_pay_controller_1 = __importDefault(require("./payroll.pay.controller"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
router.put('/:id/pay', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.checkRole)(['SUPER_ADMIN']), (req, res) => payroll_pay_controller_1.default.markPayrollAsPaid(req, res));
router.put('/:id/unpay', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.checkRole)(['SUPER_ADMIN']), (req, res) => payroll_pay_controller_1.default.revertPayroll(req, res));
exports.default = router;
//# sourceMappingURL=payroll.pay.routes.js.map