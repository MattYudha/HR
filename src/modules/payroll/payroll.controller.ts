import { Request, Response } from 'express';
import payrollService from './payroll.service';

export class PayrollController {
  async createPayroll(req: Request, res: Response): Promise<void> {
    try {
      const payrollData = req.body;
      const payroll = await payrollService.createPayroll(payrollData);

      res.status(201).json({
        success: true,
        message: 'Payroll created successfully',
        data: payroll
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create payroll'
      });
    }
  }

  async getMyPayrolls(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const payrolls = await payrollService.getEmployeePayrolls(req.user.id);

      res.json({
        success: true,
        message: 'Payrolls retrieved successfully',
        data: payrolls
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get payrolls'
      });
    }
  }

  async getAllPayrolls(_req: Request, res: Response): Promise<void> {
    try {
      const payrolls = await payrollService.getAllPayrolls();

      res.json({
        success: true,
        message: 'All payrolls retrieved successfully',
        data: payrolls
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get payrolls'
      });
    }
  }
}

export default new PayrollController();
