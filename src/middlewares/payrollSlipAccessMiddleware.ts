import { Request, Response, NextFunction } from 'express';
import payrollRepository from '../modules/payroll/payroll.repository';

/**
 * Middleware to verify access to a specific payroll slip.
 * - ADMIN and HR_ADMIN can access any slip.
 * - EMPLOYEE can only access their own slip.
 * Assumes authMiddleware has already run and attached user info to req.user.
 */
export const payrollSlipAccessMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { payrollId } = req.params;
    const loggedInUser = req.user;

    if (!loggedInUser) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    // ADMIN and HR_ADMIN have unrestricted access
    if (loggedInUser.role === 'SUPER_ADMIN' || loggedInUser.role === 'HR_ADMIN') {
      return next();
    }

    // EMPLOYEE can only access their own payroll
    if (loggedInUser.role === 'EMPLOYEE') {
      const payroll = await payrollRepository.findPayrollByIdIncludeEmployeeUser(payrollId);

      if (!payroll) {
        res.status(404).json({ success: false, message: 'Payroll slip not found' });
        return;
      }

      // Check if the payroll belongs to the logged-in user
      if (payroll.employee?.userId === loggedInUser.sub) {
        return next();
      }
    }

    // If none of the above, deny access
    res.status(403).json({ success: false, message: 'Forbidden: You do not have permission to access this resource' });

  } catch (error) {
    console.error('Error in payrollSlipAccessMiddleware:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
