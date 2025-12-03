export declare const dashboardService: {
    summary(): Promise<{
        totalEmployees: number;
        payrollPaid: number | import("@prisma/client-runtime-utils").Decimal;
        payrollPending: number;
        approvalPending: number;
        attendanceToday: number;
        kpiAverageScore: number | import("@prisma/client-runtime-utils").Decimal;
    }>;
    payrollTrend(): Promise<{
        countPaid: number;
        totalPaid: number;
        month: string;
    }[]>;
    attendanceToday(): Promise<number>;
    kpiAverage(): Promise<import(".prisma/client").Prisma.GetKPIAggregateType<{
        _avg: {
            score: true;
        };
    }>>;
};
//# sourceMappingURL=dashboard.service.d.ts.map