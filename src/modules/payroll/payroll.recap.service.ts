import prisma from '../../utils/prisma';

export const getRecapData = async (period: string) => {
  // 1. Get total payroll stats
  const totalStats = await prisma.payroll.aggregate({
    _sum: {
      totalSalary: true,
      pph21: true,
      takeHomePay: true,
    },
    _count: {
      employeeId: true,
    },
    where: {
      period: period,
      status: 'PAID', // Only count paid payrolls for recap
    },
  });

  // 2. Get payroll stats grouped by department
  const departmentStats = await prisma.payroll.groupBy({
    by: ['employee.department'],
    _sum: {
      totalSalary: true,
      pph21: true,
      takeHomePay: true,
    },
    _count: {
      employeeId: true,
    },
    where: {
      period: period,
      status: 'PAID',
    },
  });

  // Prisma's groupBy returns 'employee.department' as a nested object.
  // We'll flatten this for a cleaner API response.
  const departmentalRecap = departmentStats.map((stat) => ({
    department: stat['employee.department'] || 'N/A',
    totalSalary: stat._sum.totalSalary || 0,
    totalPph21: stat._sum.pph21 || 0,
    totalTakeHomePay: stat._sum.takeHomePay || 0,
    employeeCount: stat._count.employeeId,
  }));

  // 3. Combine into a single response object
  const result = {
    period,
    totalPayroll: totalStats._sum.totalSalary || 0,
    totalTax: totalStats._sum.pph21 || 0,
    totalNet: totalStats._sum.takeHomePay || 0,
    totalEmployeesPaid: totalStats._count.employeeId,
    departmentalRecap,
  };

  return result;
};