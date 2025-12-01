import { Request, Response } from 'express';
import payrollRecapService from './payroll.recap.service';

export class PayrollRecapController {
  async getMonthlyRecap(req: Request, res: Response) {
    try {
      const { period } = req.query;

      if (!period) {
        return res.status(400).json({
          success: false,
          message: 'Period query parameter (YYYY-MM) is required.',
        });
      }

      const result = await payrollRecapService.getMonthlyRecap({
        period: period as string,
      });

      if ('success' in result && result.success === false) {
        return res.status(400).json(result); // Bad request for invalid period format
      }

      return res.status(200).json({
        success: true,
        message: 'Monthly recap fetched successfully.',
        data: result,
      });
    } catch (error: any) {
      console.error('Error fetching monthly payroll recap:', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new PayrollRecapController();
