import { Payroll } from '@prisma/client';
export declare class PayrollRepository {
    createPayroll(data: {
        employeeId: string;
        period: string;
        baseSalary: number;
        allowances?: number;
        deductions?: number;
        totalSalary: number;
        status?: string;
    }): Promise<Payroll>;
    updatePayroll(id: string, data: Partial<Payroll>): Promise<Payroll>;
    findPayrollsByEmployee(employeeId: string): Promise<({
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
    findPayrollById(id: string): Promise<({
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
    }) | null>;
    findAllPayrolls(): Promise<({
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
}
declare const _default: PayrollRepository;
export default _default;
//# sourceMappingURL=payroll.repository.d.ts.map