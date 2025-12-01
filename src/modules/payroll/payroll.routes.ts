import { Router } from 'express';
import payrollController from './payroll.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/roleMiddleware';

const router = Router();

// ADMIN: Can create payroll
router.post('/', 
  authMiddleware, 
  checkRole(['SUPER_ADMIN']), 
  (req, res) => payrollController.createPayroll(req, res)
);

// ADMIN: Can bulk generate payroll
router.post('/bulk-generate', 
  authMiddleware, 
  checkRole(['SUPER_ADMIN']), 
  (req, res) => payrollController.bulkGenerate(req, res)
);

// ADMIN & HR: Can view payroll list
router.get('/', 
  authMiddleware, 
  checkRole(['SUPER_ADMIN', 'HR_ADMIN']), 
  (req, res) => payrollController.getPayrollList(req, res)
);

// EMPLOYEE: Can view their own payrolls
router.get('/me', 
  authMiddleware, 
  checkRole(['EMPLOYEE']), 
  (req, res) => payrollController.getMyPayrolls(req, res)
);

export default router;
