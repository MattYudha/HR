import { Employee } from '@prisma/client';
export declare class EmployeesRepository {
    findEmployeeByUserId(userId: string): Promise<({
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
    }) | null>;
    findAllEmployees(): Promise<({
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
    findEmployeeById(id: string): Promise<({
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
    }) | null>;
    createEmployee(data: {
        userId: string;
        fullName: string;
        phone?: string;
        address?: string;
        position?: string;
        department?: string;
        baseSalary?: number;
    }): Promise<Employee>;
    updateEmployee(id: string, data: Partial<Employee>): Promise<Employee>;
}
declare const _default: EmployeesRepository;
export default _default;
//# sourceMappingURL=employees.repository.d.ts.map