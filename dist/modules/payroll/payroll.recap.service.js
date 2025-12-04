"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecapData = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const getRecapData = async (period) => {
    const totalStats = await prisma_1.default.payroll.aggregate({
        _sum: {
            totalSalary: true,
            pph21: true,
            takeHomePay: true,
        },
        _count: {
            employeeId: true,
        },
        where: {
            period: period,
            status: 'PAID',
        },
    });
    const payrollsWithEmployee = await prisma_1.default.payroll.findMany({
        where: {
            period: period,
            status: 'PAID',
        },
        include: {
            employee: true,
        },
    });
    const departmentalMap = new Map();
    payrollsWithEmployee.forEach(payroll => {
        const department = payroll.employee?.department || 'N/A';
        if (!departmentalMap.has(department)) {
            departmentalMap.set(department, {
                totalSalary: 0,
                pph21: 0,
                takeHomePay: 0,
                employeeIds: new Set(),
            });
        }
        const stats = departmentalMap.get(department);
        stats.totalSalary += payroll.totalSalary.toNumber();
        stats.pph21 += payroll.pph21.toNumber();
        stats.takeHomePay += payroll.takeHomePay.toNumber();
        stats.employeeIds.add(payroll.employeeId);
    });
    const departmentalRecap = Array.from(departmentalMap.entries()).map(([department, stats]) => ({
        department: department,
        totalSalary: stats.totalSalary,
        totalPph21: stats.pph21,
        totalTakeHomePay: stats.takeHomePay,
        employeeCount: stats.employeeIds.size,
    }));
    const result = {
        period,
        totalPayroll: totalStats._sum.totalSalary || 0,
        totalTax: totalStats._sum.pph21 || 0,
        totalNet: totalStats._sum.takeHomePay || 0,
        totalEmployeesPaid: totalStats._count.employeeId,
        departmentalRecap,
    };
    return result;
};
exports.getRecapData = getRecapData;
//# sourceMappingURL=payroll.recap.service.js.map