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
    async getAllPayrolls(_req, res) {
        try {
            const payrolls = await payroll_service_1.default.getAllPayrolls();
            res.json({
                success: true,
                message: 'All payrolls retrieved successfully',
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
}
exports.PayrollController = PayrollController;
exports.default = new PayrollController();
//# sourceMappingURL=payroll.controller.js.map