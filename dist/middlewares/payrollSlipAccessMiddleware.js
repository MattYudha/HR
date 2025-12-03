"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payrollSlipAccessMiddleware = void 0;
const payroll_repository_1 = __importDefault(require("../modules/payroll/payroll.repository"));
const payrollSlipAccessMiddleware = async (req, res, next) => {
    try {
        const { payrollId } = req.params;
        const loggedInUser = req.user;
        if (!loggedInUser) {
            res.status(401).json({ success: false, message: 'Unauthorized' });
            return;
        }
        if (loggedInUser.role === 'SUPER_ADMIN' || loggedInUser.role === 'HR_ADMIN') {
            return next();
        }
        if (loggedInUser.role === 'EMPLOYEE') {
            const payroll = await payroll_repository_1.default.findPayrollByIdIncludeEmployeeUser(payrollId);
            if (!payroll) {
                res.status(404).json({ success: false, message: 'Payroll slip not found' });
                return;
            }
            if (payroll.employee?.userId === loggedInUser.sub) {
                return next();
            }
        }
        res.status(403).json({ success: false, message: 'Forbidden: You do not have permission to access this resource' });
    }
    catch (error) {
        console.error('Error in payrollSlipAccessMiddleware:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.payrollSlipAccessMiddleware = payrollSlipAccessMiddleware;
//# sourceMappingURL=payrollSlipAccessMiddleware.js.map