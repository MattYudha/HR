"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollHistoryService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
class PayrollHistoryService {
    async getPayrollHistory(employeeId, filters) {
        const { page = 1, limit = 10, status, period, sort = 'newest' } = filters;
        const skip = (page - 1) * limit;
        const employee = await prisma_1.default.employee.findUnique({
            where: { id: employeeId },
            select: { id: true, fullName: true, position: true },
        });
        if (!employee) {
            return { success: false, message: 'Employee not found.' };
        }
        const whereClause = { employeeId };
        if (status) {
            whereClause.status = status;
        }
        if (period) {
            whereClause.period = period;
        }
        const orderBy = {
            createdAt: sort === 'newest' ? 'desc' : 'asc',
        };
        const payrolls = await prisma_1.default.payroll.findMany({
            where: whereClause,
            include: {
                employee: {
                    select: {
                        id: true,
                        fullName: true,
                        position: true,
                        user: {
                            select: {
                                email: true,
                            },
                        },
                    },
                },
            },
            orderBy,
            skip,
            take: limit,
        });
        const totalItems = await prisma_1.default.payroll.count({ where: whereClause });
        const totalPages = Math.ceil(totalItems / limit);
        const itemsWithEmployeeInfo = payrolls.map((payroll) => ({
            ...payroll,
            employee: {
                id: payroll.employee.id,
                fullName: payroll.employee.fullName,
                position: payroll.employee.position,
            },
        }));
        return {
            items: itemsWithEmployeeInfo,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages,
            },
        };
    }
}
exports.PayrollHistoryService = PayrollHistoryService;
exports.default = new PayrollHistoryService();
//# sourceMappingURL=payroll.history.service.js.map