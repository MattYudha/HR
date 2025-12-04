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
  // 2. Get all relevant payrolls including employee and department for in-memory grouping
  const payrollsWithEmployee = await prisma.payroll.findMany({
    where: {
      period: period,
      status: 'PAID',
    },
    include: {
      employee: true, // Include employee to access department
    },
  });

  // Group and aggregate in memory
  const departmentalMap = new Map<string, {
    totalSalary: number;
    pph21: number;
    takeHomePay: number;
    employeeIds: Set<string>; // Use Set to count unique employees
  }>();

  payrollsWithEmployee.forEach(payroll => {
    const department = payroll.employee?.department || 'N/A';
    if (!departmentalMap.has(department)) {
      departmentalMap.set(department, {
        totalSalary: 0,
        pph21: 0,
        takeHomePay: 0,
        employeeIds: new Set<string>(),
      });
    }

    const stats = departmentalMap.get(department)!;
    stats.totalSalary += payroll.totalSalary.toNumber();
    stats.pph21 += payroll.pph21.toNumber();
    stats.takeHomePay += payroll.takeHomePay.toNumber();
    stats.employeeIds.add(payroll.employeeId);
  });

  const departmentalRecap = Array.from(departmentalMap.entries()).map(([department, stats]) => ({
    department: department,
    totalSalary: stats.totalSalary,
    totalPph21: stats.pph21,
    totalTakeHomePay: stats.takeHomePay,
    employeeCount: stats.employeeIds.size,
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