"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollController = void 0;
const payroll_service_1 = __importDefault(require("./payroll.service"));
class PayrollController {
    async createPayroll(req, res) {
        try {
            const payrollData = req.body;
            const payroll = await payroll_service_1.default.createPayroll(payrollData);
            res.status(201).json({
                success: true,
                message: 'Payroll created successfully',
                data: payroll
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create payroll'
            });
        }
    }
    async getMyPayrolls(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
                return;
            }
            const payrolls = await payroll_service_1.default.getEmployeePayrolls(req.user.id);
            res.json({
                success: true,
                message: 'Payrolls retrieved successfully',
                data: payrolls
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get payrolls'
            });
        }
    }
    async getPayrollList(req, res) {
        try {
            const { page, limit, status, period, employeeId, search } = req.query;
            const filters = {
                page: page ? parseInt(page, 10) : undefined,
                limit: limit ? parseInt(limit, 10) : undefined,
                status: status,
                period: period,
                employeeId: employeeId,
                search: search
            };
            const payrollList = await payroll_service_1.default.getPayrollList(filters);
            res.json({
                success: true,
                message: 'Payroll list fetched',
                data: payrollList
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get payroll list'
            });
        }
    }
    async bulkGenerate(req, res) {
        try {
            const { period } = req.body;
            const result = await payroll_service_1.default.bulkGeneratePayroll(period);
            res.status(200).json({
                success: true,
                message: `Payroll generated for ${result.generatedCount} employees`,
                data: result.generatedPayrolls
            });
        }
        catch (error) {
            if (error instanceof Error) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'An unexpected error occurred'
                });
            }
        }
    }
}
exports.PayrollController = PayrollController;
exports.default = new PayrollController();
//# sourceMappingURL=payroll.controller.js.map