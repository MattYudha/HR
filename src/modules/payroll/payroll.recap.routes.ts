import { Router } from 'express';
import { getPayrollRecap } from './payroll.recap.controller';

const router = Router();

router.get('/recap', getPayrollRecap);

export default router;
