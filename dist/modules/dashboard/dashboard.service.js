"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardService = void 0;
const dashboard_repository_1 = require("./dashboard.repository");
exports.dashboardService = {
    async summary() {
        const [totalEmployees, payrollPaid, payrollPending, approvalPending, attendanceToday, kpiAvg] = await Promise.all([
            dashboard_repository_1.dashboardRepository.totalEmployees(),
            dashboard_repository_1.dashboardRepository.totalPayrollPaidThisMonth(),
            dashboard_repository_1.dashboardRepository.totalPayrollPending(),
            dashboard_repository_1.dashboardRepository.totalApprovalPending(),
            dashboard_repository_1.dashboardRepository.attendanceToday(),
            dashboard_repository_1.dashboardRepository.kpiAverage(),
        ]);
        return {
            totalEmployees,
            payrollPaid: payrollPaid._sum.totalSalary || 0,
            payrollPending,
            approvalPending,
            attendanceToday,
            kpiAverageScore: kpiAvg._avg.score || 0
        };
    },
    async payrollTrend() {
        const today = new Date();
        const twelveMonthsAgo = new Date(today);
        twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
        const payrolls = await dashboard_repository_1.dashboardRepository.getPaidPayrollsSince(twelveMonthsAgo);
        const trendData = new Map();
        for (const payroll of payrolls) {
            if (payroll.paidDate) {
                const month = payroll.paidDate.toISOString().slice(0, 7);
                const data = trendData.get(month) || { countPaid: 0, totalPaid: 0 };
                data.countPaid += 1;
                data.totalPaid += Number(payroll.totalSalary);
                trendData.set(month, data);
            }
        }
        const result = [];
        for (let i = 11; i >= 0; i--) {
            const date = new Date(today);
            date.setMonth(date.getMonth() - i);
            const month = date.toISOString().slice(0, 7);
            const data = trendData.get(month) || { countPaid: 0, totalPaid: 0 };
            result.push({
                month,
                ...data,
            });
        }
        return result;
    },
    async attendanceToday() {
        const todayData = await dashboard_repository_1.dashboardRepository.attendanceToday();
        return todayData;
    },
    async kpiAverage() {
        const kpiAvgData = await dashboard_repository_1.dashboardRepository.kpiAverage();
        return kpiAvgData;
    },
};
//# sourceMappingURL=dashboard.service.js.map