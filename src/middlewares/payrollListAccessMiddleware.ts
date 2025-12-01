import { Request, Response, NextFunction } from 'express';

export const checkPayrollListAccess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Admins and HR_ADMINs have full access
    if (req.user.role === 'SUPER_ADMIN' || req.user.role === 'HR_ADMIN') {
      return next();
    }

    // Employees can only see their own payrolls
    if (req.user.role === 'EMPLOYEE') {
      if (!req.user.employeeId) {
        return res.status(403).json({ success: false, message: 'Forbidden: Employee ID not found for authenticated user' });
      }
      // Force employeeId filter for employees
      req.query.employeeId = req.user.employeeId;
      return next();
    }

    // Any other role is forbidden by default
    return res.status(403).json({ success: false, message: 'Forbidden: Insufficient role permissions' });

  } catch (error) {
    console.error('Error in checkPayrollListAccess middleware:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
