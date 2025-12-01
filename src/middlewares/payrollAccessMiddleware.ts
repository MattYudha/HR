import { Request, Response, NextFunction } from 'express';
import payrollService from '../modules/payroll/payroll.service'; // Adjust path as necessary

export const checkPayrollAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const payrollId = req.params.id;
    if (!payrollId) {
      return res.status(400).json({ success: false, message: 'Payroll ID is required' });
    }

    // Admins and HR_ADMINs have full access
    if (req.user.role === 'SUPER_ADMIN' || req.user.role === 'HR_ADMIN') {
      return next();
    }

    // Employees can only access their own payrolls
    if (req.user.role === 'EMPLOYEE') {
      const payroll = await payrollService.getPayrollById(payrollId);

      if (!payroll) {
        return res.status(404).json({ success: false, message: 'Payroll not found' });
      }

      if (!req.user.employeeId) {
          // This should ideally not happen if authMiddleware is correctly populating employeeId for employees
          return res.status(403).json({ success: false, message: 'Forbidden: Employee ID not found for authenticated user' });
      }

      if (payroll.employeeId !== req.user.employeeId) {
        return res.status(403).json({ success: false, message: 'Forbidden: You can only access your own payroll' });
      }

      return next();
    }

    // Any other role is forbidden by default
    return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role permissions' });

  } catch (error) {
    console.error('Error in checkPayrollAccess middleware:', error);
    if (error instanceof Error && error.message === 'Payroll not found') {
        return res.status(404).json({ success: false, message: 'Payroll not found' });
    }
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
