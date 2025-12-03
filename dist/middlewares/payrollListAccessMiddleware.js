"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPayrollListAccess = void 0;
const checkPayrollListAccess = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        if (req.user.role === 'SUPER_ADMIN' || req.user.role === 'HR_ADMIN') {
            return next();
        }
        if (req.user.role === 'EMPLOYEE') {
            if (!req.user.employeeId) {
                return res.status(403).json({ success: false, message: 'Forbidden: Employee ID not found for authenticated user' });
            }
            req.query.employeeId = req.user.employeeId;
            return next();
        }
        return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role permissions' });
    }
    catch (error) {
        console.error('Error in checkPayrollListAccess middleware:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
exports.checkPayrollListAccess = checkPayrollListAccess;
//# sourceMappingURL=payrollListAccessMiddleware.js.map