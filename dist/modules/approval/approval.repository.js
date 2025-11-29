"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalRepository = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
class ApprovalRepository {
    async createApproval(data) {
        return await prisma_1.default.approval.create({
            data,
            include: {
                employee: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async updateApproval(id, data) {
        return await prisma_1.default.approval.update({
            where: { id },
            data,
            include: {
                employee: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findApprovalsByEmployee(employeeId) {
        return await prisma_1.default.approval.findMany({
            where: { employeeId },
            orderBy: {
                requestDate: 'desc'
            },
            include: {
                employee: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findApprovalById(id) {
        return await prisma_1.default.approval.findUnique({
            where: { id },
            include: {
                employee: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findAllApprovals() {
        return await prisma_1.default.approval.findMany({
            orderBy: {
                requestDate: 'desc'
            },
            include: {
                employee: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
}
exports.ApprovalRepository = ApprovalRepository;
exports.default = new ApprovalRepository();
//# sourceMappingURL=approval.repository.js.map