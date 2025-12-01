import { Router } from 'express';
import { dashboardController } from './dashboard.controller';

const router = Router();

router.get('/summary', dashboardController.summary);
router.get('/payroll-trend', dashboardController.payrollTrend);

export default router;
