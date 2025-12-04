"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardRepository = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
exports.dashboardRepository = {
    totalEmployees() {
        return prisma_1.default.employee.count();
    },
    totalPayrollPaidThisMonth() {
        return prisma_1.default.payroll.aggregate({
            _sum: { totalSalary: true },
            where: {
                status: 'PAID',
                period: new Date().toISOString().slice(0, 7)
            }
        });
    },
    totalPayrollPending() {
        return prisma_1.default.payroll.count({
            where: { status: 'PENDING' }
        });
    },
    totalApprovalPending() {
        return prisma_1.default.approval.count({
            where: { status: 'PENDING' }
        });
    },
    async attendanceToday() {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        const presentCount = await prisma_1.default.attendance.count({
            where: {
                date: {
                    gte: todayStart,
                    lte: todayEnd,
                },
                status: 'PRESENT',
            },
        });
        const totalActiveEmployees = await prisma_1.default.employee.count({
            where: {
                user: {
                    isActive: true,
                },
            },
        });
        return { present: presentCount, total: totalActiveEmployees };
    },
    kpiAverage() {
        return prisma_1.default.kPI.aggregate({
            _avg: { score: true }
        });
    },
    getPaidPayrollsSince(date) {
        return prisma_1.default.payroll.findMany({
            where: {
                status: 'PAID',
                paidDate: {
                    gte: date,
                    not: null
                }
            },
            select: {
                paidDate: true,
                totalSalary: true
            }
        });
    }
};
//# sourceMappingURL=dashboard.repository.js.map