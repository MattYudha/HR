"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPayrollAccess = void 0;
const payroll_service_1 = __importDefault(require("../modules/payroll/payroll.service"));
const checkPayrollAccess = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        const payrollId = req.params.id;
        if (!payrollId) {
            return res.status(400).json({ success: false, message: 'Payroll ID is required' });
        }
        if (req.user.role === 'SUPER_ADMIN' || req.user.role === 'HR_ADMIN') {
            return next();
        }
        if (req.user.role === 'EMPLOYEE') {
            const payroll = await payroll_service_1.default.getPayrollById(payrollId);
            if (!payroll) {
                return res.status(404).json({ success: false, message: 'Payroll not found' });
            }
            if (!req.user.employeeId) {
                return res.status(403).json({ success: false, message: 'Forbidden: Employee ID not found for authenticated user' });
            }
            if (payroll.employeeId !== req.user.employeeId) {
                return res.status(403).json({ success: false, message: 'Forbidden: You can only access your own payroll' });
            }
            return next();
        }
        return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role permissions' });
    }
    catch (error) {
        console.error('Error in checkPayrollAccess middleware:', error);
        if (error instanceof Error && error.message === 'Payroll not found') {
            return res.status(404).json({ success: false, message: 'Payroll not found' });
        }
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.checkPayrollAccess = checkPayrollAccess;
//# sourceMappingURL=payrollAccessMiddleware.js.map