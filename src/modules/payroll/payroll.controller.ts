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

  async getPayrollList(req: Request, res: Response): Promise<void> {
    try {
      const { page, limit, status, period, employeeId, search } = req.query;

      const filters = {
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        status: status as 'PENDING' | 'PAID' | undefined,
        period: period as string | undefined,
        employeeId: employeeId as string | undefined,
        search: search as string | undefined
      };

      const payrollList = await payrollService.getPayrollList(filters);

      res.json({
        success: true,
        message: 'Payroll list fetched',
        data: payrollList
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get payroll list'
      });
    }
  }

  async revertPayroll(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updatedPayroll = await payrollService.revertPayroll(id);

      res.status(200).json({
        success: true,
        message: 'Payroll reverted to pending',
        data: updatedPayroll
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Payroll not found') {
          res.status(404).json({
            success: false,
            message: 'Payroll not found'
          });
        } else if (error.message === 'Payroll is already pending') {
          res.status(400).json({
            success: false,
            message: 'Payroll is already pending'
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

  async bulkGenerate(req: Request, res: Response): Promise<void> {
    try {
      const { period } = req.body;
      const result = await payrollService.bulkGeneratePayroll(period);

      res.status(200).json({
        success: true,
        message: `Payroll generated for ${result.generatedCount} employees`,
        data: result.generatedPayrolls
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({
          success: false,
          message: error.message
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'An unexpected error occurred'
        });
      }
    }
  }
}

export default new PayrollController();
