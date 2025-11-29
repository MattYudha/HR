import { Request, Response } from 'express';
import kpiService from './kpi.service';

export class KPIController {
  async createKPI(req: Request, res: Response): Promise<void> {
    try {
      const kpiData = req.body;
      const kpi = await kpiService.createKPI(kpiData);

      res.status(201).json({
        success: true,
        message: 'KPI created successfully',
        data: kpi
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create KPI'
      });
    }
  }

  async getMyKPIs(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const kpis = await kpiService.getEmployeeKPIs(req.user.id);

      res.json({
        success: true,
        message: 'KPIs retrieved successfully',
        data: kpis
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get KPIs'
      });
    }
  }

  async getAllKPIs(_req: Request, res: Response): Promise<void> {
    try {
      const kpis = await kpiService.getAllKPIs();

      res.json({
        success: true,
        message: 'All KPIs retrieved successfully',
        data: kpis
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get KPIs'
      });
    }
  }
}

export default new KPIController();
