import { UserWithRoleAndEmployee } from './auth.repository';
export declare class AuthService {
    registerUser(fullName: string, email: string, password: string, roleId?: string): Promise<UserWithRoleAndEmployee>;
    login(email: string, password: string): Promise<{
        user: UserWithRoleAndEmployee;
        token: string;
    }>;
    private generateToken;
}
declare const _default: AuthService;
export default _default;
//# sourceMappingURL=auth.service.d.ts.map