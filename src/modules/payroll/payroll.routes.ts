import { Router } from 'express';
import payrollController from './payroll.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/roleMiddleware';

import { checkPayrollListAccess } from '../../middlewares/payrollListAccessMiddleware';
import payrollExportRouter from './payroll.export.routes';
import payrollHistoryController from './payroll.history.controller';
import payrollRecapController from './payroll.recap.controller'; // Import the new controller

const router = Router();

router.post('/', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  payrollController.createPayroll(req, res)
);

router.get('/me', authMiddleware, (req, res) =>
  payrollController.getMyPayrolls(req, res)
);

router.get('/', authMiddleware, checkPayrollListAccess, (req, res) =>
  payrollController.getPayrollList(req, res)
);

router.put('/:id/unpay', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  payrollController.revertPayroll(req, res)
);

router.post('/bulk-generate', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  payrollController.bulkGenerate(req, res)
);

// New export route
router.use('/export', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN', 'EMPLOYEE']), payrollExportRouter);

// New payroll history route
router.get('/history/:employeeId', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  payrollHistoryController.getHistory(req, res)
);

// New monthly payroll recap route
router.get('/recap', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  payrollRecapController.getMonthlyRecap(req, res)
);

export default router;
