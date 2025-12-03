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
    const departmentStats = await prisma_1.default.payroll.groupBy({
        by: ['employee.department'],
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
    const departmentalRecap = departmentStats.map((stat) => ({
        department: stat['employee.department'] || 'N/A',
        totalSalary: stat._sum.totalSalary || 0,
        totalPph21: stat._sum.pph21 || 0,
        totalTakeHomePay: stat._sum.takeHomePay || 0,
        employeeCount: stat._count.employeeId,
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