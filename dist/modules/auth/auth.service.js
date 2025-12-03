"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../config/env");
const auth_repository_1 = __importDefault(require("./auth.repository"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
class AuthService {
    async register(name, email, password) {
        const existingUser = await auth_repository_1.default.findUserByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const employeeRole = await prisma_1.default.role.findUnique({
            where: { name: 'employee' },
        });
        if (!employeeRole) {
            throw new Error('Employee role not found. Please seed the database.');
        }
        const user = await auth_repository_1.default.createUser({
            name,
            email,
            password: hashedPassword,
            roleId: employeeRole.id,
        });
        const newUserWithRole = await auth_repository_1.default.findUserByEmailWithRole(user.email);
        if (!newUserWithRole) {
            throw new Error('Failed to create user correctly');
        }
        const token = this.generateToken(newUserWithRole.id, newUserWithRole.email, newUserWithRole.role.name);
        return { user: newUserWithRole, token };
    }
    async login(email, password) {
        const user = await auth_repository_1.default.findUserByEmailWithRole(email);
        if (!user || !user.isActive) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const token = this.generateToken(user.id, user.email, user.role.name);
        return { user, token };
    }
    generateToken(userId, email, role) {
        return jsonwebtoken_1.default.sign({ sub: userId, email, role }, env_1.env.JWT_SECRET, { expiresIn: '24h' });
    }
}
exports.AuthService = AuthService;
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map