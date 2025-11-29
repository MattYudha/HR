import { Router } from 'express';
import attendanceController from './attendance.controller';
import { authMiddleware } from '../../middlewares/authMiddleware';

const router = Router();

router.post('/check-in', authMiddleware, (req, res) =>
  attendanceController.checkIn(req, res)
);

router.post('/check-out', authMiddleware, (req, res) =>
  attendanceController.checkOut(req, res)
);

router.get('/me', authMiddleware, (req, res) =>
  attendanceController.getMyAttendance(req, res)
);

export default router;
