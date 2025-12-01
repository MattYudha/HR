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
  attendanceToday() {
    const today = new Date().toISOString().split('T')[0];
    return prisma.attendance.count({
      where: {
        date: { gte: new Date(today) }
      }
    });
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
