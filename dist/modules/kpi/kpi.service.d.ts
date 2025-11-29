export declare class KPIService {
    createKPI(data: {
        employeeId: string;
        period: string;
        score: number;
        category: string;
        notes?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        employeeId: string;
        notes: string | null;
        period: string;
        score: import("@prisma/client-runtime-utils").Decimal;
        category: string;
    }>;
    getEmployeeKPIs(userId: string): Promise<({
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
    getAllKPIs(): Promise<({
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
    getKPIById(id: string): Promise<{
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
    }>;
}
declare const _default: KPIService;
export default _default;
//# sourceMappingURL=kpi.service.d.ts.map