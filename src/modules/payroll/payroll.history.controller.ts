import { Request, Response } from 'express';
import payrollHistoryService from './payroll.history.service';

export class PayrollHistoryController {
  async getHistory(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      const { page, limit, status, period, sort } = req.query;

      const filters = {
        page: page ? parseInt(page as string, 10) : undefined,
        limit: limit ? parseInt(limit as string, 10) : undefined,
        status: status as 'PAID' | 'PENDING' | undefined,
        period: period as string | undefined,
        sort: sort as 'newest' | 'oldest' | undefined,
      };

      const result = await payrollHistoryService.getPayrollHistory(employeeId, filters);

      if ('success' in result && result.success === false) {
        return res.status(404).json(result);
      }

      return res.status(200).json({
        success: true,
        message: 'Payroll history fetched successfully.',
        data: result,
      });
    } catch (error: any) {
      console.error('Error fetching payroll history:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new PayrollHistoryController();
