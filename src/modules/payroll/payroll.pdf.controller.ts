import { Request, Response } from 'express';
import payrollService from './payroll.service'; // Assuming payrollService is already instantiated and exported as default
import PDFDocument from 'pdfkit';
import { format } from 'date-fns';

export class PayrollPdfController {
  async generatePayrollPdf(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payroll = await payrollService.getPayrollById(id);

      if (!payroll) {
        res.status(404).json({
          success: false,
          message: 'Payroll not found'
        });
        return;
      }

      const doc = new PDFDocument();
      const filename = `payroll_slip_${payroll.employee?.fullName?.replace(/\s/g, '_') || 'unknown'}_${payroll.period}.pdf`;

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

      doc.pipe(res);

      doc.fontSize(24).text('PAYROLL SLIP', { align: 'center' });
      doc.moveDown();

      doc.fontSize(12).text(`Employee Name: ${payroll.employee?.fullName || 'N/A'}`);
      doc.text(`Position: ${payroll.employee?.position || 'N/A'}`);
      doc.text(`Period: ${payroll.period}`);
      doc.moveDown();

      doc.text(`Base Salary: Rp ${payroll.baseSalary.toLocaleString('id-ID')}`);
      doc.text(`Allowances: Rp ${payroll.allowances.toLocaleString('id-ID')}`);
      doc.text(`Deductions: Rp ${payroll.deductions.toLocaleString('id-ID')}`);
      doc.moveDown();

      doc.fontSize(14).text(`Total Salary: Rp ${payroll.totalSalary.toLocaleString('id-ID')}`, { bold: true });
      doc.moveDown();

      if (payroll.status === 'PAID' && payroll.paidDate) {
        doc.text(`Paid Date: ${format(new Date(payroll.paidDate), 'dd MMMM yyyy')}`);
      } else {
        doc.text('Status: PENDING');
      }

      doc.end();
    } catch (error) {
      console.error('Error generating payroll PDF:', error);
      if (error instanceof Error && error.message === 'Payroll not found') {
        res.status(404).json({
          success: false,
          message: 'Payroll not found'
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to generate payroll PDF'
        });
      }
    }
  }
}

export default new PayrollPdfController();
