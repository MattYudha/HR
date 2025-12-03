"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payroll_detail_controller_1 = __importDefault(require("./payroll.detail.controller"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
router.get('/:id', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.checkRole)(['SUPER_ADMIN', 'HR_ADMIN']), (req, res) => payroll_detail_controller_1.default.getPayrollDetail(req, res));
exports.default = router;
//# sourceMappingURL=payroll.detail.routes.js.map