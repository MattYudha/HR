export declare const getRecapData: (period: string) => Promise<{
    period: string;
    totalPayroll: number | import("@prisma/client-runtime-utils").Decimal;
    totalTax: number | import("@prisma/client-runtime-utils").Decimal;
    totalNet: number | import("@prisma/client-runtime-utils").Decimal;
    totalEmployeesPaid: number;
    departmentalRecap: {
        department: any;
        totalSalary: number | import("@prisma/client-runtime-utils").Decimal;
        totalPph21: number | import("@prisma/client-runtime-utils").Decimal;
        totalTakeHomePay: number | import("@prisma/client-runtime-utils").Decimal;
        employeeCount: any;
    }[];
}>;
//# sourceMappingURL=payroll.recap.service.d.ts.map