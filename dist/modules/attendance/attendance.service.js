"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const attendance_repository_1 = __importDefault(require("./attendance.repository"));
const employees_repository_1 = __importDefault(require("../employees/employees.repository"));
class AttendanceService {
    async checkIn(userId) {
        const employee = await employees_repository_1.default.findEmployeeByUserId(userId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        const today = new Date();
        const existingAttendance = await attendance_repository_1.default.findAttendanceByEmployeeAndDate(employee.id, today);
        if (existingAttendance) {
            throw new Error('Already checked in today');
        }
        return await attendance_repository_1.default.createAttendance({
            employeeId: employee.id,
            checkIn: new Date(),
            date: today,
            status: 'PRESENT'
        });
    }
    async checkOut(userId) {
        const employee = await employees_repository_1.default.findEmployeeByUserId(userId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        const today = new Date();
        const attendance = await attendance_repository_1.default.findAttendanceByEmployeeAndDate(employee.id, today);
        if (!attendance) {
            throw new Error('No check-in record found for today');
        }
        if (attendance.checkOut) {
            throw new Error('Already checked out today');
        }
        return await attendance_repository_1.default.updateAttendance(attendance.id, {
            checkOut: new Date()
        });
    }
    async getMyAttendance(userId, from, to) {
        const employee = await employees_repository_1.default.findEmployeeByUserId(userId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        const fromDate = from ? new Date(from) : new Date(new Date().setDate(1));
        const toDate = to ? new Date(to) : new Date();
        return await attendance_repository_1.default.findAttendancesByEmployeeAndDateRange(employee.id, fromDate, toDate);
    }
}
exports.AttendanceService = AttendanceService;
exports.default = new AttendanceService();
//# sourceMappingURL=attendance.service.js.map