export declare class UsersService {
    getUserProfile(userId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        roleId: string;
        isActive: boolean;
    }>;
    getAllUsers(): Promise<{
        role: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
        };
        employee: {
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
        } | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        roleId: string;
        isActive: boolean;
    }[]>;
}
declare const _default: UsersService;
export default _default;
//# sourceMappingURL=users.service.d.ts.map