export declare const getRecapData: (period: string) => Promise<{
    period: string;
    totalPayroll: number | import("@prisma/client-runtime-utils").Decimal;
    totalTax: number | import("@prisma/client-runtime-utils").Decimal;
    totalNet: number | import("@prisma/client-runtime-utils").Decimal;
    totalEmployeesPaid: number;
    departmentalRecap: {
        department: string;
        totalSalary: number;
        totalPph21: number;
        totalTakeHomePay: number;
        employeeCount: number;
    }[];
}>;
//# sourceMappingURL=payroll.recap.service.d.ts.map