export declare class EmployeesService {
    getEmployeeProfile(userId: string): Promise<{
        user: {
            role: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
    }>;
    getAllEmployees(): Promise<({
        user: {
            role: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
    })[]>;
    createEmployee(data: {
        userId: string;
        fullName: string;
        phone?: string;
        address?: string;
        position?: string;
        department?: string;
        baseSalary?: number;
    }): Promise<{
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
    }>;
    getEmployeeById(id: string): Promise<{
        user: {
            role: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
            };
        } & {
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
    }>;
}
declare const _default: EmployeesService;
export default _default;
//# sourceMappingURL=employees.service.d.ts.map