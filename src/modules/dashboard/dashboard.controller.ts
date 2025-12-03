import { Request, Response } from 'express';
import { dashboardService } from './dashboard.service';

export const dashboardController = {
  async summary(req: Request, res: Response) {
    const data = await dashboardService.summary();
    return res.json({
      success: true,
      message: 'Dashboard summary fetched',
      data,
    });
  },

  async payrollTrend(req: Request, res: Response) {
    const data = await dashboardService.payrollTrend();
    return res.json({
      success: true,
      message: 'Payroll trend fetched',
      data,
    });
  },

  async attendanceToday(req: Request, res: Response) {
    const data = await dashboardService.attendanceToday();
    return res.json({
      success: true,
      message: 'Attendance for today fetched',
      data,
    });
  },

  async kpiAverage(req: Request, res: Response) {
    const data = await dashboardService.kpiAverage();
    return res.json({
      success: true,
      message: 'Average KPI fetched',
      data,
    });
  },
};
