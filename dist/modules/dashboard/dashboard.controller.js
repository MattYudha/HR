"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardController = void 0;
const dashboard_service_1 = require("./dashboard.service");
exports.dashboardController = {
    async summary(_req, res) {
        const data = await dashboard_service_1.dashboardService.summary();
        return res.json({
            success: true,
            message: 'Dashboard summary fetched',
            data,
        });
    },
    async payrollTrend(_req, res) {
        const data = await dashboard_service_1.dashboardService.payrollTrend();
        return res.json({
            success: true,
            message: 'Payroll trend fetched',
            data,
        });
    },
    async attendanceToday(_req, res) {
        const data = await dashboard_service_1.dashboardService.attendanceToday();
        return res.json({
            success: true,
            message: 'Attendance for today fetched',
            data,
        });
    },
    async kpiAverage(_req, res) {
        const data = await dashboard_service_1.dashboardService.kpiAverage();
        return res.json({
            success: true,
            message: 'Average KPI fetched',
            data,
        });
    },
};
//# sourceMappingURL=dashboard.controller.js.map