"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const approval_controller_1 = __importDefault(require("./approval.controller"));
const authMiddleware_1 = require("../../middlewares/authMiddleware");
const roleMiddleware_1 = require("../../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
router.post('/request', authMiddleware_1.authMiddleware, (req, res) => approval_controller_1.default.createRequest(req, res));
router.post('/approve', authMiddleware_1.authMiddleware, (0, roleMiddleware_1.checkRole)(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) => approval_controller_1.default.approveRequest(req, res));
router.get('/my-approvals', authMiddleware_1.authMiddleware, (req, res) => approval_controller_1.default.getMyApprovals(req, res));
router.get('/detail/:id', authMiddleware_1.authMiddleware, (req, res) => approval_controller_1.default.getApprovalDetail(req, res));
exports.default = router;
//# sourceMappingURL=approval.routes.js.map