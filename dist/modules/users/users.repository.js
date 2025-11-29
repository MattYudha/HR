"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepository = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
class UsersRepository {
    async findUserById(id) {
        return await prisma_1.default.user.findUnique({
            where: { id },
            include: {
                role: true,
                employee: true
            }
        });
    }
    async findAllUsers() {
        return await prisma_1.default.user.findMany({
            include: {
                role: true,
                employee: true
            }
        });
    }
    async updateUser(id, data) {
        return await prisma_1.default.user.update({
            where: { id },
            data,
            include: {
                role: true,
                employee: true
            }
        });
    }
}
exports.UsersRepository = UsersRepository;
exports.default = new UsersRepository();
//# sourceMappingURL=users.repository.js.map