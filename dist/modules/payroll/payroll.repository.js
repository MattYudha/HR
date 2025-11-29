"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollRepository = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
class PayrollRepository {
    async createPayroll(data) {
        return await prisma_1.default.payroll.create({
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
    async updatePayroll(id, data) {
        return await prisma_1.default.payroll.update({
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
    async findPayrollsByEmployee(employeeId) {
        return await prisma_1.default.payroll.findMany({
            where: { employeeId },
            orderBy: {
                createdAt: 'desc'
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
    async findPayrollById(id) {
        return await prisma_1.default.payroll.findUnique({
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
    async findAllPayrolls() {
        return await prisma_1.default.payroll.findMany({
            orderBy: {
                createdAt: 'desc'
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
exports.PayrollRepository = PayrollRepository;
exports.default = new PayrollRepository();
//# sourceMappingURL=payroll.repository.js.map