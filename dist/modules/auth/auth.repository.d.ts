import { User } from '@prisma/client';
export declare class AuthRepository {
    findUserByEmail(email: string): Promise<User | null>;
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