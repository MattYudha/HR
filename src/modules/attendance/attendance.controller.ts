import { Request, Response } from 'express';
import attendanceService from './attendance.service';

export class AttendanceController {
  async checkIn(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const attendance = await attendanceService.checkIn(req.user.id);

      res.status(201).json({
        success: true,
        message: 'Check-in successful',
        data: attendance
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Check-in failed'
      });
    }
  }

  async checkOut(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const attendance = await attendanceService.checkOut(req.user.id);

      res.json({
        success: true,
        message: 'Check-out successful',
        data: attendance
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Check-out failed'
      });
    }
  }

  async getMyAttendance(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const { from, to } = req.query;
      const attendances = await attendanceService.getMyAttendance(
        req.user.id,
        from as string,
        to as string
      );

      res.json({
        success: true,
        message: 'Attendance records retrieved successfully',
        data: attendances
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get attendance records'
      });
    }
  }
}

export default new AttendanceController();
