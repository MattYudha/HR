"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
class AuthRepository {
    async findUserByEmail(email) {
        return await prisma_1.default.user.findUnique({
            where: { email },
            include: { role: true }
        });
    }
    async createUser(data) {
        return await prisma_1.default.user.create({
            data,
            include: { role: true }
        });
    }
    async findUserById(id) {
        return await prisma_1.default.user.findUnique({
            where: { id },
            include: { role: true }
        });
    }
}
exports.AuthRepository = AuthRepository;
exports.default = new AuthRepository();
//# sourceMappingURL=auth.repository.js.map