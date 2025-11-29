import { KPI } from '@prisma/client';
export declare class KPIRepository {
    createKPI(data: {
        employeeId: string;
        period: string;
        score: number;
        category: string;
        notes?: string;
    }): Promise<KPI>;
    updateKPI(id: string, data: Partial<KPI>): Promise<KPI>;
    findKPIsByEmployee(employeeId: string): Promise<({
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
        employeeId: string;
        notes: string | null;
        period: string;
        score: import("@prisma/client-runtime-utils").Decimal;
        category: string;
    })[]>;
    findKPIById(id: string): Promise<({
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
        employeeId: string;
        notes: string | null;
        period: string;
        score: import("@prisma/client-runtime-utils").Decimal;
        category: string;
    }) | null>;
    findAllKPIs(): Promise<({
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
        employeeId: string;
        notes: string | null;
        period: string;
        score: import("@prisma/client-runtime-utils").Decimal;
        category: string;
    })[]>;
}
declare const _default: KPIRepository;
export default _default;
//# sourceMappingURL=kpi.repository.d.ts.map