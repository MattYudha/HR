import { Router } from 'express';
import payrollPdfController from './payroll.pdf.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { payrollSlipAccessMiddleware } from '../../middlewares/payrollSlipAccessMiddleware';

const router = Router();

// This route is now protected by the new slip access middleware
router.get(
  '/:payrollId/slip',
  authMiddleware,
  payrollSlipAccessMiddleware, // <-- New middleware here
  (req, res) => payrollPdfController.generatePayrollSlip(req, res)
);

export default router;

