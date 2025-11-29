import { Router } from 'express';
import kpiController from './kpi.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/roleMiddleware';

const router = Router();

router.post('/', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  kpiController.createKPI(req, res)
);

router.get('/me', authMiddleware, (req, res) =>
  kpiController.getMyKPIs(req, res)
);

router.get('/', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  kpiController.getAllKPIs(req, res)
);

export default router;
