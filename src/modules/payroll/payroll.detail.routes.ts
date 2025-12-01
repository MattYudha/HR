import { Router } from 'express';
import payrollDetailController from './payroll.detail.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkPayrollAccess } from '../../middlewares/payrollAccessMiddleware';

const router = Router();

router.get('/:id', authMiddleware, checkPayrollAccess, (req, res) =>
  payrollDetailController.getPayrollDetail(req, res)
);

export default router;
