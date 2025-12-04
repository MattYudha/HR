"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRepository = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const client_1 = require("@prisma/client");
const userWithRoleAndEmployee = client_1.Prisma.validator()({
    include: {
        role: true,
        employee: true,
    },
});
class AuthRepository {
    async findUserByEmail(email) {
        return await prisma_1.default.user.findUnique({
            where: { email },
            include: { role: true, employee: true }
        });
    }
    async createUser(data) {
        return await prisma_1.default.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: data.email,
                    password: data.password,
                    roleId: data.roleId,
                },
            });
            await tx.employee.create({
                data: {
                    userId: user.id,
                    fullName: data.name,
                },
            });
            return user;
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