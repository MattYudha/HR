import { Payroll, Prisma } from '@prisma/client';
export interface PayrollListFilters {
    page?: number;
    limit?: number;
    status?: 'PENDING' | 'PAID';
    period?: string;
    employeeId?: string;
    search?: string;
}
export declare class PayrollRepository {
    createPayroll(data: {
        employeeId: string;
        period: string;
        baseSalary: number;
        allowances?: number;
        deductions?: number;
        totalSalary: number;
        pph21: number;
        takeHomePay: number;
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
            baseSalary: Prisma.Decimal;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        baseSalary: Prisma.Decimal;
        employeeId: string;
        status: string;
        period: string;
        allowances: Prisma.Decimal;
        deductions: Prisma.Decimal;
        totalSalary: Prisma.Decimal;
        pph21: Prisma.Decimal;
        takeHomePay: Prisma.Decimal;
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
            baseSalary: Prisma.Decimal;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        baseSalary: Prisma.Decimal;
        employeeId: string;
        status: string;
        period: string;
        allowances: Prisma.Decimal;
        deductions: Prisma.Decimal;
        totalSalary: Prisma.Decimal;
        pph21: Prisma.Decimal;
        takeHomePay: Prisma.Decimal;
        paidDate: Date | null;
    }) | null>;
    getPayrollListItems(filters: PayrollListFilters): Promise<({
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
            baseSalary: Prisma.Decimal;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        baseSalary: Prisma.Decimal;
        employeeId: string;
        status: string;
        period: string;
        allowances: Prisma.Decimal;
        deductions: Prisma.Decimal;
        totalSalary: Prisma.Decimal;
        pph21: Prisma.Decimal;
        takeHomePay: Prisma.Decimal;
        paidDate: Date | null;
    })[]>;
    countPayrollListItems(filters: PayrollListFilters): Promise<number>;
    findPayrollByIdIncludeEmployeeUser(id: string): Promise<({
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
            baseSalary: Prisma.Decimal;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        baseSalary: Prisma.Decimal;
        employeeId: string;
        status: string;
        period: string;
        allowances: Prisma.Decimal;
        deductions: Prisma.Decimal;
        totalSalary: Prisma.Decimal;
        pph21: Prisma.Decimal;
        takeHomePay: Prisma.Decimal;
        paidDate: Date | null;
    }) | null>;
    markPayrollAsPaid(id: string): Promise<Payroll>;
    revertPayroll(id: string): Promise<Payroll>;
    findEmployeesWithoutPayroll(period: string): Promise<({
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
        baseSalary: Prisma.Decimal;
    })[]>;
    createManyPayroll(records: Prisma.PayrollCreateManyInput[]): Promise<Prisma.BatchPayload>;
}
declare const _default: PayrollRepository;
export default _default;
//# sourceMappingURL=payroll.repository.d.ts.map