import { PayrollRepository, PayrollListFilters } from './payroll.repository';
import { Payroll, Prisma } from '@prisma/client';
interface PayrollListResponse {
    items: Payroll[];
    pagination: {
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
    };
}
export declare class PayrollService {
    private payrollRepository;
    constructor(payrollRepository: PayrollRepository);
    private cleanAndParseNumber;
    private calculatePPH21;
    createPayroll(data: {
        employeeId: string;
        period: string;
        baseSalary: number | string;
        allowances?: number | string;
        deductions?: number | string;
    }): Promise<{
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
    getPayrollList(filters: PayrollListFilters): Promise<PayrollListResponse>;
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
    }>;
    markPayrollAsPaid(id: string): Promise<{
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
    }>;
    revertPayroll(id: string): Promise<{
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
    }>;
    bulkGeneratePayroll(period: string): Promise<{
        generatedCount: number;
        generatedPayrolls: ({
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
        })[];
    }>;
    generatePayrollSlip(payrollId: string): Promise<PDFKit.PDFDocument>;
}
declare const _default: PayrollService;
export default _default;
//# sourceMappingURL=payroll.service.d.ts.map