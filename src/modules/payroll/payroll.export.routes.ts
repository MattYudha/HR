import { Router } from 'express';
import payrollExportController from './payroll.export.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/roleMiddleware';

const router = Router();

// ADMIN & HR: Can export payroll data
router.get('/', 
  authMiddleware, 
  checkRole(['SUPER_ADMIN', 'HR_ADMIN']), 
  (req, res) => payrollExportController.exportPayroll(req, res)
);

export default router;
