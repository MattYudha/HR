"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollPdfController = void 0;
const payroll_service_1 = __importDefault(require("./payroll.service"));
class PayrollPdfController {
    async generatePayrollSlip(req, res) {
        try {
            const { payrollId } = req.params;
            const doc = await payroll_service_1.default.generatePayrollSlip(payrollId);
            const filename = `payroll_slip_${payrollId}.pdf`;
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
            doc.pipe(res);
        }
        catch (error) {
            console.error('Error generating payroll slip:', error);
            if (error instanceof Error && error.message.includes('not found')) {
                res.status(404).json({
                    success: false,
                    message: error.message
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Failed to generate payroll slip'
                });
            }
        }
    }
}
exports.PayrollPdfController = PayrollPdfController;
exports.default = new PayrollPdfController();
//# sourceMappingURL=payroll.pdf.controller.js.map