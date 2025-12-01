import { Router } from 'express';
import payrollPdfController from './payroll.pdf.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/roleMiddleware'; // Assuming this already exists

const router = Router();

// Payroll PDF can only be accessed by ADMIN and HR_ADMIN
router.get('/:id/pdf', authMiddleware, checkRole(['SUPER_ADMIN', 'HR_ADMIN']), (req, res) =>
  payrollPdfController.generatePayrollPdf(req, res)
);

export default router;
