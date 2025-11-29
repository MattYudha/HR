"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const users_service_1 = __importDefault(require("./users.service"));
class UsersController {
    async getMe(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
                return;
            }
            const user = await users_service_1.default.getUserProfile(req.user.id);
            res.json({
                success: true,
                message: 'User profile retrieved successfully',
                data: user
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get user profile'
            });
        }
    }
    async getAllUsers(_req, res) {
        try {
            const users = await users_service_1.default.getAllUsers();
            res.json({
                success: true,
                message: 'Users retrieved successfully',
                data: users
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get users'
            });
        }
    }
}
exports.UsersController = UsersController;
exports.default = new UsersController();
//# sourceMappingURL=users.controller.js.map