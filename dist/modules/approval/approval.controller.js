"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalController = void 0;
const approval_service_1 = __importDefault(require("./approval.service"));
class ApprovalController {
    async createRequest(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
                return;
            }
            const { type, title, description } = req.body;
            const approval = await approval_service_1.default.createApprovalRequest(req.user.id, {
                type,
                title,
                description
            });
            res.status(201).json({
                success: true,
                message: 'Approval request created successfully',
                data: approval
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create approval request'
            });
        }
    }
    async approveRequest(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
                return;
            }
            const { approvalId, notes } = req.body;
            const approval = await approval_service_1.default.approveRequest(approvalId, req.user.id, notes);
            res.json({
                success: true,
                message: 'Approval request approved successfully',
                data: approval
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to approve request'
            });
        }
    }
    async getMyApprovals(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
                return;
            }
            const approvals = await approval_service_1.default.getMyApprovals(req.user.id);
            res.json({
                success: true,
                message: 'Approval requests retrieved successfully',
                data: approvals
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get approval requests'
            });
        }
    }
    async getApprovalDetail(req, res) {
        try {
            const { id } = req.params;
            const approval = await approval_service_1.default.getApprovalDetail(id);
            res.json({
                success: true,
                message: 'Approval detail retrieved successfully',
                data: approval
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get approval detail'
            });
        }
    }
}
exports.ApprovalController = ApprovalController;
exports.default = new ApprovalController();
//# sourceMappingURL=approval.controller.js.map