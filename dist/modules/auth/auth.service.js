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
class AuthService {
    async register(email, password, roleId) {
        const existingUser = await auth_repository_1.default.findUserByEmail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await auth_repository_1.default.createUser({
            email,
            password: hashedPassword,
            roleId
        });
        const token = this.generateToken(user.id, user.email);
        return { user, token };
    }
    async login(email, password) {
        const user = await auth_repository_1.default.findUserByEmail(email);
        if (!user || !user.isActive) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const token = this.generateToken(user.id, user.email);
        return { user, token };
    }
    generateToken(userId, email) {
        return jsonwebtoken_1.default.sign({ sub: userId, email }, env_1.env.JWT_SECRET, { expiresIn: '24h' });
    }
}
exports.AuthService = AuthService;
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map