import { dashboardRepository } from './dashboard.repository';

export const dashboardService = {
  async summary() {
    const [
      totalEmployees,
      payrollPaid,
      payrollPending,
      approvalPending,
      attendanceToday,
      kpiAvg
    ] = await Promise.all([
      dashboardRepository.totalEmployees(),
      dashboardRepository.totalPayrollPaidThisMonth(),
      dashboardRepository.totalPayrollPending(),
      dashboardRepository.totalApprovalPending(),
      dashboardRepository.attendanceToday(),
      dashboardRepository.kpiAverage(),
    ]);

    return {
      totalEmployees,
      payrollPaid: payrollPaid._sum.totalSalary || 0,
      payrollPending,
      approvalPending,
      attendanceToday,
      kpiAverageScore: kpiAvg._avg.score || 0
    };
  },

  async payrollTrend() {
    const today = new Date();
    const twelveMonthsAgo = new Date(today);
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

    const payrolls = await dashboardRepository.getPaidPayrollsSince(twelveMonthsAgo);

    const trendData = new Map<string, { countPaid: number; totalPaid: number }>();

    for (const payroll of payrolls) {
      if (payroll.paidDate) {
        const month = payroll.paidDate.toISOString().slice(0, 7);
        const data = trendData.get(month) || { countPaid: 0, totalPaid: 0 };
        data.countPaid += 1;
        data.totalPaid += Number(payroll.totalSalary);
        trendData.set(month, data);
      }
    }

    const result = [];
    for (let i = 11; i >= 0; i--) {
      const date = new Date(today);
      date.setMonth(date.getMonth() - i);
      const month = date.toISOString().slice(0, 7);
      const data = trendData.get(month) || { countPaid: 0, totalPaid: 0 };
      result.push({
        month,
        ...data,
      });
    }

    return result;
  }
};
