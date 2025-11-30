import prisma from '../../utils/prisma';
import { Attendance } from '@prisma/client';

export class AttendanceRepository {
  async createAttendance(data: {
    employeeId: string;
    checkIn?: Date;
    checkOut?: Date;
    date: Date;
    status?: string;
    notes?: string;
  }): Promise<Attendance> {
    return await prisma.attendance.create({
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

  async updateAttendance(id: string, data: Partial<Attendance>): Promise<Attendance> {
    return await prisma.attendance.update({
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

  async findAttendanceByEmployeeAndDate(employeeId: string, date: Date) {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await prisma.attendance.findFirst({
      where: {
        employeeId,
        date: {
          gte: startOfDay,
          lt: endOfDay
        }
      }
    });
  }

  async findAttendancesByEmployeeAndDateRange(
    employeeId: string,
    from: Date,
    to: Date
  ) {
    return await prisma.attendance.findMany({
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

export default new AttendanceRepository();
