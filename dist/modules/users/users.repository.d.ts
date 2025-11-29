import { User } from '@prisma/client';
export declare class UsersRepository {
    findUserById(id: string): Promise<User | null>;
    findAllUsers(): Promise<({
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
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        roleId: string;
        isActive: boolean;
    })[]>;
    updateUser(id: string, data: Partial<User>): Promise<User>;
}
declare const _default: UsersRepository;
export default _default;
//# sourceMappingURL=users.repository.d.ts.map