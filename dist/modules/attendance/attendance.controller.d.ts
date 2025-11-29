import { Request, Response } from 'express';
export declare class AttendanceController {
    checkIn(req: Request, res: Response): Promise<void>;
    checkOut(req: Request, res: Response): Promise<void>;
    getMyAttendance(req: Request, res: Response): Promise<void>;
}
declare const _default: AttendanceController;
export default _default;
//# sourceMappingURL=attendance.controller.d.ts.map