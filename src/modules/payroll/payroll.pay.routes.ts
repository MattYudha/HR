import { Router } from 'express';
import payrollPayController from './payroll.pay.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/roleMiddleware';

const router = Router();

router.put('/:id/pay', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  payrollPayController.markPayrollAsPaid(req, res)
);

export default router;
