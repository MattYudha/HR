"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollPayController = void 0;
const payroll_service_1 = __importDefault(require("./payroll.service"));
class PayrollPayController {
    async markPayrollAsPaid(req, res) {
        try {
            const { id } = req.params;
            const updatedPayroll = await payroll_service_1.default.markPayrollAsPaid(id);
            res.status(200).json({
                success: true,
                message: 'Payroll marked as paid',
                data: updatedPayroll
            });
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Payroll not found') {
                    res.status(404).json({
                        success: false,
                        message: 'Payroll not found'
                    });
                }
                else if (error.message === 'Payroll already paid') {
                    res.status(400).json({
                        success: false,
                        message: 'Payroll already paid'
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        message: error.message
                    });
                }
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'An unexpected error occurred'
                });
            }
        }
    }
    async revertPayroll(req, res) {
        try {
            const { id } = req.params;
            const updatedPayroll = await payroll_service_1.default.revertPayroll(id);
            res.status(200).json({
                success: true,
                message: 'Payroll reverted to pending',
                data: updatedPayroll
            });
        }
        catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Payroll not found') {
                    res.status(404).json({
                        success: false,
                        message: 'Payroll not found'
                    });
                }
                else if (error.message === 'Payroll is already pending') {
                    res.status(400).json({
                        success: false,
                        message: 'Payroll is already pending'
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        message: error.message
                    });
                }
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
exports.PayrollPayController = PayrollPayController;
exports.default = new PayrollPayController();
//# sourceMappingURL=payroll.pay.controller.js.map