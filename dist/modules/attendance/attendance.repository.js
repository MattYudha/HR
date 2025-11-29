"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceRepository = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
class AttendanceRepository {
    async createAttendance(data) {
        return await prisma_1.default.attendance.create({
            data,
            include: {
                employee: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async updateAttendance(id, data) {
        return await prisma_1.default.attendance.update({
            where: { id },
            data,
            include: {
                employee: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
    async findAttendanceByEmployeeAndDate(employeeId, date) {
        return await prisma_1.default.attendance.findFirst({
            where: {
                employeeId,
                date: {
                    gte: new Date(date.setHours(0, 0, 0, 0)),
                    lt: new Date(date.setHours(23, 59, 59, 999))
                }
            }
        });
    }
    async findAttendancesByEmployeeAndDateRange(employeeId, from, to) {
        return await prisma_1.default.attendance.findMany({
            where: {
                employeeId,
                date: {
                    gte: from,
                    lte: to
                }
            },
            orderBy: {
                date: 'desc'
            },
            include: {
                employee: {
                    include: {
                        user: true
                    }
                }
            }
        });
    }
}
exports.AttendanceRepository = AttendanceRepository;
exports.default = new AttendanceRepository();
//# sourceMappingURL=attendance.repository.js.map