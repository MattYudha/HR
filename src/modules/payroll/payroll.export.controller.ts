import { Request, Response } from 'express';
import payrollExportService from './payroll.export.service';

export class PayrollExportController {
  async exportPayroll(req: Request, res: Response) {
    try {
      const { period, format } = req.query;

      // Validate format
      const exportFormat = format === 'xlsx' ? 'xlsx' : 'csv'; // Default to csv

      const result = await payrollExportService.exportPayroll(
        period as string | undefined,
        exportFormat,
      );

      if ('success' in result && result.success === false) {
        return res.status(404).json(result);
      }

      if (exportFormat === 'csv') {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=payroll_export_${period || 'all'}.csv`,
        );
      } else if (exportFormat === 'xlsx') {
        res.setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=payroll_export_${period || 'all'}.xlsx`,
        );
      }
      res.send(result);
    } catch (error: any) {
      console.error('Error exporting payroll:', error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new PayrollExportController();
