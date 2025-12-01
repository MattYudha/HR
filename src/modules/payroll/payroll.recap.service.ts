import prisma from '../../utils/prisma';
import { Prisma } from '@prisma/client';

interface MonthlyRecapFilters {
  period: string; // YYYY-MM
}

interface MonthlyRecapResponse {
  period: string;
  totalEmployees: number;
  totalPayroll: number;
  paidCount: number;
  pendingCount: number;
  totalPaidAmount: number;
  totalPendingAmount: number;
  averageKPI: number;
}

export class PayrollRecapService {
  async getMonthlyRecap(
    filters: MonthlyRecapFilters,
  ): Promise<MonthlyRecapResponse | { success: false; message: string }> {
    const { period } = filters;

    // 1. Validate period format YYYY-MM
    if (!/^\d{4}-\d{2}$/.test(period)) {
      return { success: false, message: 'Invalid period format. Expected YYYY-MM.' };
    }

    // Fetch all payrolls for the given period
    const payrolls = await prisma.payroll.findMany({
      where: { period },
      select: {
        id: true,
        employeeId: true,
        totalSalary: true,
        status: true,
      },
    });

    if (payrolls.length === 0) {
      // If no payrolls, return a recap with zeros, but still success=true
      return {
        period,
        totalEmployees: 0,
        totalPayroll: 0,
        paidCount: 0,
        pendingCount: 0,
        totalPaidAmount: 0,
        totalPendingAmount: 0,
        averageKPI: 0,
      };
    }

    // 2. Calculate payroll statistics
    const totalPayroll = payrolls.length;
    const paidPayrolls = payrolls.filter((p) => p.status === 'PAID');
    const pendingPayrolls = payrolls.filter((p) => p.status === 'PENDING');

    const paidCount = paidPayrolls.length;
    const pendingCount = pendingPayrolls.length;

    const totalPaidAmount = paidPayrolls.reduce(
      (sum, p) => sum + (p.totalSalary as Prisma.Decimal).toNumber(),
      0,
    );
    const totalPendingAmount = pendingPayrolls.reduce(
      (sum, p) => sum + (p.totalSalary as Prisma.Decimal).toNumber(),
      0,
    );

    // 3. Count unique employees
    const uniqueEmployeeIds = new Set(payrolls.map((p) => p.employeeId));
    const totalEmployees = uniqueEmployeeIds.size;

    // 4. Get average KPI for the month
    const kpiData = await prisma.kPI.aggregate({
      where: { period },
      _avg: {
        score: true,
      },
    });

    const averageKPI = kpiData._avg.score?.toNumber() || 0; // Default to 0 if no KPI data

    return {
      period,
      totalEmployees,
      totalPayroll,
      paidCount,
      pendingCount,
      totalPaidAmount,
      totalPendingAmount,
      averageKPI,
    };
  }
}

export default new PayrollRecapService();
