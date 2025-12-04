import { Request, Response } from 'express';
import { dashboardService } from './dashboard.service';

export const dashboardController = {
  async summary(_req: Request, res: Response) {
    const data = await dashboardService.summary();
    return res.json({
      success: true,
      message: 'Dashboard summary fetched',
      data,
    });
  },

  async payrollTrend(_req: Request, res: Response) {
    const data = await dashboardService.payrollTrend();
    return res.json({
      success: true,
      message: 'Payroll trend fetched',
      data,
    });
  },

  async attendanceToday(_req: Request, res: Response) {
    const data = await dashboardService.attendanceToday();
    return res.json({
      success: true,
      message: 'Attendance for today fetched',
      data,
    });
  },

  async kpiAverage(_req: Request, res: Response) {
    const data = await dashboardService.kpiAverage();
    return res.json({
      success: true,
      message: 'Average KPI fetched',
      data,
    });
  },
};
