"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollHistoryController = void 0;
const payroll_history_service_1 = __importDefault(require("./payroll.history.service"));
class PayrollHistoryController {
    async getHistory(req, res) {
        try {
            const { employeeId } = req.params;
            const { page, limit, status, period, sort } = req.query;
            const filters = {
                page: page ? parseInt(page, 10) : undefined,
                limit: limit ? parseInt(limit, 10) : undefined,
                status: status,
                period: period,
                sort: sort,
            };
            const result = await payroll_history_service_1.default.getPayrollHistory(employeeId, filters);
            if ('success' in result && result.success === false) {
                return res.status(404).json(result);
            }
            return res.status(200).json({
                success: true,
                message: 'Payroll history fetched successfully.',
                data: result,
            });
        }
        catch (error) {
            console.error('Error fetching payroll history:', error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }
}
exports.PayrollHistoryController = PayrollHistoryController;
exports.default = new PayrollHistoryController();
//# sourceMappingURL=payroll.history.controller.js.map