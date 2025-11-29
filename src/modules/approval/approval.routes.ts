import { Router } from 'express';
import approvalController from './approval.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { checkRole } from '../../middlewares/roleMiddleware';

const router = Router();

router.post('/request', authMiddleware, (req, res) =>
  approvalController.createRequest(req, res)
);

router.post('/approve', authMiddleware, checkRole(['HR_ADMIN', 'SUPER_ADMIN']), (req, res) =>
  approvalController.approveRequest(req, res)
);

router.get('/my-approvals', authMiddleware, (req, res) =>
  approvalController.getMyApprovals(req, res)
);

router.get('/detail/:id', authMiddleware, (req, res) =>
  approvalController.getApprovalDetail(req, res)
);

export default router;
