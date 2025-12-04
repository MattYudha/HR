import prisma from '../../utils/prisma';

export const dashboardRepository = {
  totalEmployees() {
    return prisma.employee.count();
  },
  totalPayrollPaidThisMonth() {
    return prisma.payroll.aggregate({
      _sum: { totalSalary: true },
      where: {
        status: 'PAID',
        period: new Date().toISOString().slice(0,7)
      }
    });
  },
  totalPayrollPending() {
    return prisma.payroll.count({
      where: { status: 'PENDING' }
    });
  },
  totalApprovalPending() {
    return prisma.approval.count({
      where: { status: 'PENDING' }
    });
  },
  async attendanceToday() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const presentCount = await prisma.attendance.count({
      where: {
        date: {
          gte: todayStart,
          lte: todayEnd,
        },
        status: 'PRESENT',
      },
    });

    const totalActiveEmployees = await prisma.employee.count({
      where: {
        user: {
          isActive: true,
        },
      },
    });

    return { present: presentCount, total: totalActiveEmployees };
  },
  kpiAverage() {
    return prisma.kPI.aggregate({
      _avg: { score: true }
    });
  },

  getPaidPayrollsSince(date: Date) {
    return prisma.payroll.findMany({
      where: {
        status: 'PAID',
        paidDate: {
          gte: date,
          not: null
        }
      },
      select: {
        paidDate: true,
        totalSalary: true
      }
    });
  }
};
