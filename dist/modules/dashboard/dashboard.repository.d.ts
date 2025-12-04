export declare const dashboardRepository: {
    totalEmployees(): import(".prisma/client").Prisma.PrismaPromise<number>;
    totalPayrollPaidThisMonth(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.GetPayrollAggregateType<{
        _sum: {
            totalSalary: true;
        };
        where: {
            status: string;
            period: string;
        };
    }>>;
    totalPayrollPending(): import(".prisma/client").Prisma.PrismaPromise<number>;
    totalApprovalPending(): import(".prisma/client").Prisma.PrismaPromise<number>;
    attendanceToday(): Promise<{
        present: number;
        total: number;
    }>;
    kpiAverage(): import(".prisma/client").Prisma.PrismaPromise<import(".prisma/client").Prisma.GetKPIAggregateType<{
        _avg: {
            score: true;
        };
    }>>;
    getPaidPayrollsSince(date: Date): import(".prisma/client").Prisma.PrismaPromise<{
        totalSalary: import("@prisma/client-runtime-utils").Decimal;
        paidDate: Date | null;
    }[]>;
};
//# sourceMappingURL=dashboard.repository.d.ts.map