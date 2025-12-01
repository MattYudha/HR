import { Router } from 'express';
import payrollExportController from './payroll.export.controller';

const payrollExportRouter = Router();

payrollExportRouter.get('/', payrollExportController.exportPayroll);

export default payrollExportRouter;
