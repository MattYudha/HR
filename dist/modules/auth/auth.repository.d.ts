import { Prisma, User } from '@prisma/client';
declare const userWithRoleAndEmployee: {
    include: {
        role: true;
        employee: true;
    };
};
export type UserWithRoleAndEmployee = Prisma.UserGetPayload<typeof userWithRoleAndEmployee>;
export declare class AuthRepository {
    findUserByEmail(email: string): Promise<UserWithRoleAndEmployee | null>;
    createUser(data: {
        name: string;
        email: string;
        password: string;
        roleId: string;
    }): Promise<User>;
    findUserById(id: string): Promise<User | null>;
}
declare const _default: AuthRepository;
export default _default;
//# sourceMappingURL=auth.repository.d.ts.map