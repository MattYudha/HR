"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("./dashboard.controller");
const router = (0, express_1.Router)();
router.get('/summary', dashboard_controller_1.dashboardController.summary);
router.get('/payroll-trend', dashboard_controller_1.dashboardController.payrollTrend);
router.get('/attendance-today', dashboard_controller_1.dashboardController.attendanceToday);
router.get('/kpi-average', dashboard_controller_1.dashboardController.kpiAverage);
exports.default = router;
//# sourceMappingURL=dashboard.routes.js.map