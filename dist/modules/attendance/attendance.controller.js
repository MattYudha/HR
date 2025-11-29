"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceController = void 0;
const attendance_service_1 = __importDefault(require("./attendance.service"));
class AttendanceController {
    async checkIn(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
                return;
            }
            const attendance = await attendance_service_1.default.checkIn(req.user.id);
            res.status(201).json({
                success: true,
                message: 'Check-in successful',
                data: attendance
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Check-in failed'
            });
        }
    }
    async checkOut(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
                return;
            }
            const attendance = await attendance_service_1.default.checkOut(req.user.id);
            res.json({
                success: true,
                message: 'Check-out successful',
                data: attendance
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Check-out failed'
            });
        }
    }
    async getMyAttendance(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
                return;
            }
            const { from, to } = req.query;
            const attendances = await attendance_service_1.default.getMyAttendance(req.user.id, from, to);
            res.json({
                success: true,
                message: 'Attendance records retrieved successfully',
                data: attendances
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get attendance records'
            });
        }
    }
}
exports.AttendanceController = AttendanceController;
exports.default = new AttendanceController();
//# sourceMappingURL=attendance.controller.js.map