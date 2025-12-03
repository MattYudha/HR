"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollExportController = void 0;
const payroll_export_service_1 = __importDefault(require("./payroll.export.service"));
class PayrollExportController {
    async exportPayroll(req, res) {
        try {
            const { period, format } = req.query;
            const exportFormat = format === 'xlsx' ? 'xlsx' : 'csv';
            const result = await payroll_export_service_1.default.exportPayroll(period, exportFormat);
            if ('success' in result && result.success === false) {
                return res.status(404).json(result);
            }
            if (exportFormat === 'csv') {
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename=payroll_export_${period || 'all'}.csv`);
            }
            else if (exportFormat === 'xlsx') {
                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                res.setHeader('Content-Disposition', `attachment; filename=payroll_export_${period || 'all'}.xlsx`);
            }
            res.send(result);
        }
        catch (error) {
            console.error('Error exporting payroll:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.PayrollExportController = PayrollExportController;
exports.default = new PayrollExportController();
//# sourceMappingURL=payroll.export.controller.js.map