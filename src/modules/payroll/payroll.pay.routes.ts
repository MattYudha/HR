import { Router } from 'express';
import payrollPayController from './payroll.pay.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/roleMiddleware';

const router = Router();

// ADMIN: Can mark payroll as paid
router.put('/:id/pay', 
  authMiddleware, 
  checkRole(['SUPER_ADMIN']), 
  (req, res) => payrollPayController.markPayrollAsPaid(req, res)
);

// ADMIN: Can revert payroll payment (unpay)
router.put('/:id/unpay', 
  authMiddleware, 
  checkRole(['SUPER_ADMIN']), 
  (req, res) => payrollPayController.revertPayroll(req, res)
);

export default router;
