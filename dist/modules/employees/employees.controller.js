"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesController = void 0;
const employees_service_1 = __importDefault(require("./employees.service"));
class EmployeesController {
    async getMyProfile(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                });
                return;
            }
            const employee = await employees_service_1.default.getEmployeeProfile(req.user.id);
            res.json({
                success: true,
                message: 'Employee profile retrieved successfully',
                data: employee
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get employee profile'
            });
        }
    }
    async getAllEmployees(_req, res) {
        try {
            const employees = await employees_service_1.default.getAllEmployees();
            res.json({
                success: true,
                message: 'Employees retrieved successfully',
                data: employees
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to get employees'
            });
        }
    }
    async createEmployee(req, res) {
        try {
            const employeeData = req.body;
            const employee = await employees_service_1.default.createEmployee(employeeData);
            res.status(201).json({
                success: true,
                message: 'Employee created successfully',
                data: employee
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : 'Failed to create employee'
            });
        }
    }
}
exports.EmployeesController = EmployeesController;
exports.default = new EmployeesController();
//# sourceMappingURL=employees.controller.js.map