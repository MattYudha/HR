import { Request, Response } from 'express';
import payrollService from './payroll.service';
import { format } from 'date-fns';
import PDFDocument from 'pdfkit';

export class PayrollPdfController {
  async generatePayrollSlip(req: Request, res: Response): Promise<void> {
    try {
      const { payrollId } = req.params;

      const doc = await payrollService.generatePayrollSlip(payrollId);

      const filename = `payroll_slip_${payrollId}.pdf`;
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

      doc.pipe(res);
    } catch (error) {
      console.error('Error generating payroll slip:', error);
      if (error instanceof Error && error.message.includes('not found')) {
        res.status(404).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to generate payroll slip'
        });
      }
    }
  }
}

export default new PayrollPdfController();
