export declare class PayrollService {
    createPayroll(data: {
        employeeId: string;
        period: string;
        baseSalary: number;
        allowances?: number;
        deductions?: number;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        baseSalary: import("@prisma/client-runtime-utils").Decimal;
        employeeId: string;
        status: string;
        period: string;
        allowances: import("@prisma/client-runtime-utils").Decimal;
        deductions: import("@prisma/client-runtime-utils").Decimal;
        totalSalary: import("@prisma/client-runtime-utils").Decimal;
        paidDate: Date | null;
    }>;
    getEmployeePayrolls(userId: string): Promise<({
        employee: {
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                password: string;
                roleId: string;
                isActive: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            fullName: string;
            phone: string | null;
            address: string | null;
            position: string | null;
            department: string | null;
            joinDate: Date;
            baseSalary: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        baseSalary: import("@prisma/client-runtime-utils").Decimal;
        employeeId: string;
        status: string;
        period: string;
        allowances: import("@prisma/client-runtime-utils").Decimal;
        deductions: import("@prisma/client-runtime-utils").Decimal;
        totalSalary: import("@prisma/client-runtime-utils").Decimal;
        paidDate: Date | null;
    })[]>;
    getAllPayrolls(): Promise<({
        employee: {
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                password: string;
                roleId: string;
                isActive: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            fullName: string;
            phone: string | null;
            address: string | null;
            position: string | null;
            department: string | null;
            joinDate: Date;
            baseSalary: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        baseSalary: import("@prisma/client-runtime-utils").Decimal;
        employeeId: string;
        status: string;
        period: string;
        allowances: import("@prisma/client-runtime-utils").Decimal;
        deductions: import("@prisma/client-runtime-utils").Decimal;
        totalSalary: import("@prisma/client-runtime-utils").Decimal;
        paidDate: Date | null;
    })[]>;
    getPayrollById(id: string): Promise<{
        employee: {
            user: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                email: string;
                password: string;
                roleId: string;
                isActive: boolean;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            fullName: string;
            phone: string | null;
            address: string | null;
            position: string | null;
            department: string | null;
            joinDate: Date;
            baseSalary: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        baseSalary: import("@prisma/client-runtime-utils").Decimal;
        employeeId: string;
        status: string;
        period: string;
        allowances: import("@prisma/client-runtime-utils").Decimal;
        deductions: import("@prisma/client-runtime-utils").Decimal;
        totalSalary: import("@prisma/client-runtime-utils").Decimal;
        paidDate: Date | null;
    }>;
}
declare const _default: PayrollService;
export default _default;
//# sourceMappingURL=payroll.service.d.ts.map