import { Router } from 'express';
import payrollDetailController from './payroll.detail.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/roleMiddleware';

const router = Router();

// ADMIN & HR: Can view any payroll detail
router.get('/:id', 
  authMiddleware, 
  checkRole(['SUPER_ADMIN', 'HR_ADMIN']), 
  (req, res) => payrollDetailController.getPayrollDetail(req, res)
);

export default router;
