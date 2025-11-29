import { Router } from 'express';
import payrollController from './payroll.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/roleMiddleware';

const router = Router();

router.post('/', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  payrollController.createPayroll(req, res)
);

router.get('/me', authMiddleware, (req, res) =>
  payrollController.getMyPayrolls(req, res)
);

router.get('/', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  payrollController.getAllPayrolls(req, res)
);

export default router;
