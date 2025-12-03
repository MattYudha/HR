"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payroll_pdf_controller_1 = __importDefault(require("./payroll.pdf.controller"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const payrollSlipAccessMiddleware_1 = require("../../middlewares/payrollSlipAccessMiddleware");
const router = (0, express_1.Router)();
router.get('/:payrollId/slip', authMiddleware_1.authMiddleware, payrollSlipAccessMiddleware_1.payrollSlipAccessMiddleware, (req, res) => payroll_pdf_controller_1.default.generatePayrollSlip(req, res));
exports.default = router;
//# sourceMappingURL=payroll.pdf.routes.js.map