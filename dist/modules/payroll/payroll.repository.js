"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollRepository = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
class PayrollRepository {
    async createPayroll(data) {
        const { employeeId, ...rest } = data;
        return await prisma_1.default.payroll.create({
            data: {
                ...rest,
                employee: {
                    connect: {
                        id: employeeId
                    }
                }
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
    async getPayrollListItems(filters) {
        const { status, period, employeeId, search, page = 1, limit = 10 } = filters;
        const skip = (page - 1) * limit;
        const whereClause = {};
        if (status) {
            whereClause.status = status;
        }
        if (period) {
            whereClause.period = period;
        }
        if (employeeId) {
            whereClause.employeeId = employeeId;
        }
        if (search) {
            whereClause.OR = [
                { employee: { fullName: { contains: search, mode: 'insensitive' } } },
                { employee: { user: { email: { contains: search, mode: 'insensitive' } } } }
            ];
        }
        return await prisma_1.default.payroll.findMany({
            where: whereClause,
            include: {
                employee: {
                    include: { user: true }
                }
            },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' }
        });
    }
    async countPayrollListItems(filters) {
        const { status, period, employeeId, search } = filters;
        const whereClause = {};
        if (status) {
            whereClause.status = status;
        }
        if (period) {
            whereClause.period = period;
        }
        if (employeeId) {
            whereClause.employeeId = employeeId;
        }
        if (search) {
            whereClause.OR = [
                { employee: { fullName: { contains: search, mode: 'insensitive' } } },
                { employee: { user: { email: { contains: search, mode: 'insensitive' } } } }
            ];
        }
        return await prisma_1.default.payroll.count({ where: whereClause });
    }
    async findPayrollByIdIncludeEmployeeUser(id) {
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
    async markPayrollAsPaid(id) {
        return await prisma_1.default.payroll.update({
            where: { id },
            data: {
                status: 'PAID',
                paidDate: new Date()
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
    async revertPayroll(id) {
        return await prisma_1.default.payroll.update({
            where: { id },
            data: {
                status: 'PENDING',
                paidDate: null,
                updatedAt: new Date()
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
    async findEmployeesWithoutPayroll(period) {
        return await prisma_1.default.employee.findMany({
            where: {
                payrolls: {
                    none: {
                        period: period
                    }
                }
            },
            include: {
                user: true
            }
        });
    }
    async createManyPayroll(records) {
        return await prisma_1.default.payroll.createMany({
            data: records,
            skipDuplicates: true
        });
    }
}
exports.PayrollRepository = PayrollRepository;
exports.default = new PayrollRepository();
//# sourceMappingURL=payroll.repository.js.map