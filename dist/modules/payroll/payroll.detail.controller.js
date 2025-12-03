"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollDetailController = void 0;
const payroll_service_1 = __importDefault(require("./payroll.service"));
class PayrollDetailController {
    async getPayrollDetail(req, res) {
        try {
            const { id } = req.params;
            const payroll = await payroll_service_1.default.getPayrollById(id);
            res.status(200).json({
                success: true,
                message: 'Payroll detail fetched',
                data: payroll
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
exports.PayrollDetailController = PayrollDetailController;
exports.default = new PayrollDetailController();
//# sourceMappingURL=payroll.detail.controller.js.map