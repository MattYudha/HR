"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const users_repository_1 = __importDefault(require("./users.repository"));
class UsersService {
    async getUserProfile(userId) {
        const user = await users_repository_1.default.findUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async getAllUsers() {
        const users = await users_repository_1.default.findAllUsers();
        return users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
    }
}
exports.UsersService = UsersService;
exports.default = new UsersService();
//# sourceMappingURL=users.service.js.map