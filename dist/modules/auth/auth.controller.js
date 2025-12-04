"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = __importDefault(require("./auth.service"));
class AuthController {
    async register(req, res) {
        try {
            const { fullName, email, password, roleId } = req.body;
            if (!fullName || !email || !password) {
                res.status(400).json({
                    success: false,
                    message: 'Full Name, Email, and Password are required for registration.'
                });
                return;
            }
            const newUser = await auth_service_1.default.registerUser(fullName, email, password, roleId);
            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: {
                    id: newUser.id,
                    email: newUser.email,
                    role: newUser.role,
                    employee: newUser.employee,
                }
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Registration failed'
            });
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await auth_service_1.default.login(email, password);
            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    user: {
                        id: result.user.id,
                        email: result.user.email,
                        name: result.user.employee?.fullName
                    },
                    token: result.token
                }
            });
        }
        catch (error) {
            res.status(401).json({
                success: false,
                message: error instanceof Error ? error.message : 'Login failed'
            });
        }
    }
}
exports.AuthController = AuthController;
exports.default = new AuthController();
//# sourceMappingURL=auth.controller.js.map