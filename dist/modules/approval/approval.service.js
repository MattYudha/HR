"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalService = void 0;
const approval_repository_1 = __importDefault(require("./approval.repository"));
const employees_repository_1 = __importDefault(require("../employees/employees.repository"));
class ApprovalService {
    async createApprovalRequest(userId, data) {
        const employee = await employees_repository_1.default.findEmployeeByUserId(userId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return await approval_repository_1.default.createApproval({
            employeeId: employee.id,
            ...data,
            status: 'PENDING'
        });
    }
    async approveRequest(approvalId, approverId, notes) {
        const approval = await approval_repository_1.default.findApprovalById(approvalId);
        if (!approval) {
            throw new Error('Approval request not found');
        }
        if (approval.status !== 'PENDING') {
            throw new Error('Approval request already processed');
        }
        return await approval_repository_1.default.updateApproval(approvalId, {
            status: 'APPROVED',
            approvedBy: approverId,
            approvedDate: new Date(),
            notes
        });
    }
    async getMyApprovals(userId) {
        const employee = await employees_repository_1.default.findEmployeeByUserId(userId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return await approval_repository_1.default.findApprovalsByEmployee(employee.id);
    }
    async getApprovalDetail(id) {
        const approval = await approval_repository_1.default.findApprovalById(id);
        if (!approval) {
            throw new Error('Approval not found');
        }
        return approval;
    }
}
exports.ApprovalService = ApprovalService;
exports.default = new ApprovalService();
//# sourceMappingURL=approval.service.js.map