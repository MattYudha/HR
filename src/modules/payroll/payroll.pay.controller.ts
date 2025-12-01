import { Request, Response } from 'express';
import payrollService from './payroll.service'; // Assuming payrollService is already instantiated and exported as default

export class PayrollPayController {
  async markPayrollAsPaid(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedPayroll = await payrollService.markPayrollAsPaid(id);

      res.status(200).json({
        success: true,
        message: 'Payroll marked as paid',
        data: updatedPayroll
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Payroll not found') {
          res.status(404).json({
            success: false,
            message: 'Payroll not found'
          });
        } else if (error.message === 'Payroll already paid') {
          res.status(400).json({
            success: false,
            message: 'Payroll already paid'
          });
        } else {
          res.status(400).json({
            success: false,
            message: error.message
          });
        }
      } else {
        res.status(500).json({
          success: false,
          message: 'An unexpected error occurred'
        });
      }
    }
  }
}

export default new PayrollPayController();
