export declare class ApprovalService {
    createApprovalRequest(userId: string, data: {
        type: string;
        title: string;
        description?: string;
    }): Promise<{
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
    }>;
    approveRequest(approvalId: string, approverId: string, notes?: string): Promise<{
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
    }>;
    getMyApprovals(userId: string): Promise<({
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
    getApprovalDetail(id: string): Promise<{
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
    }>;
}
declare const _default: ApprovalService;
export default _default;
//# sourceMappingURL=approval.service.d.ts.map