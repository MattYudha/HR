import { Approval } from '@prisma/client';
export declare class ApprovalRepository {
    createApproval(data: {
        employeeId: string;
        type: string;
        title: string;
        description?: string;
        status?: string;
    }): Promise<Approval>;
    updateApproval(id: string, data: Partial<Approval>): Promise<Approval>;
    findApprovalsByEmployee(employeeId: string): Promise<({
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
        status: string;
        notes: string | null;
        type: string;
        title: string;
        description: string | null;
        requestDate: Date;
        approvedDate: Date | null;
        approvedBy: string | null;
    })[]>;
    findApprovalById(id: string): Promise<({
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
        status: string;
        notes: string | null;
        type: string;
        title: string;
        description: string | null;
        requestDate: Date;
        approvedDate: Date | null;
        approvedBy: string | null;
    }) | null>;
    findAllApprovals(): Promise<({
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
        status: string;
        notes: string | null;
        type: string;
        title: string;
        description: string | null;
        requestDate: Date;
        approvedDate: Date | null;
        approvedBy: string | null;
    })[]>;
}
declare const _default: ApprovalRepository;
export default _default;
//# sourceMappingURL=approval.repository.d.ts.map