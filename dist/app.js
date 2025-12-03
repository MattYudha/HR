"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const users_routes_1 = __importDefault(require("./modules/users/users.routes"));
const employees_routes_1 = __importDefault(require("./modules/employees/employees.routes"));
const attendance_routes_1 = __importDefault(require("./modules/attendance/attendance.routes"));
const approval_routes_1 = __importDefault(require("./modules/approval/approval.routes"));
const payroll_routes_1 = __importDefault(require("./modules/payroll/payroll.routes"));
const kpi_routes_1 = __importDefault(require("./modules/kpi/kpi.routes"));
const dashboard_routes_1 = __importDefault(require("./modules/dashboard/dashboard.routes"));
const payroll_pay_routes_1 = __importDefault(require("./modules/payroll/payroll.pay.routes"));
const payroll_detail_routes_1 = __importDefault(require("./modules/payroll/payroll.detail.routes"));
const payroll_pdf_routes_1 = __importDefault(require("./modules/payroll/payroll.pdf.routes"));
const payroll_recap_routes_1 = __importDefault(require("./modules/payroll/payroll.recap.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (_req, res) => {
    res.json({
        success: true,
        message: 'HR & Payroll API is running',
        version: '1.0.0'
    });
});
app.get('/health', (_req, res) => {
    res.json({
        success: true,
        message: 'API is healthy',
        timestamp: new Date().toISOString()
    });
});
app.use('/api/auth', auth_routes_1.default);
app.use('/api/users', users_routes_1.default);
app.use('/api/employees', employees_routes_1.default);
app.use('/api/attendance', attendance_routes_1.default);
app.use('/api/approval', approval_routes_1.default);
app.use('/api/payroll', payroll_routes_1.default);
app.use('/api/payroll', payroll_pay_routes_1.default);
app.use('/api/payroll', payroll_detail_routes_1.default);
app.use('/api/payroll', payroll_pdf_routes_1.default);
app.use('/api/payroll', payroll_recap_routes_1.default);
app.use('/api/kpi', kpi_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map