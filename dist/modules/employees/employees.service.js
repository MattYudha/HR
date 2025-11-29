"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesService = void 0;
const employees_repository_1 = __importDefault(require("./employees.repository"));
class EmployeesService {
    async getEmployeeProfile(userId) {
        const employee = await employees_repository_1.default.findEmployeeByUserId(userId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return employee;
    }
    async getAllEmployees() {
        return await employees_repository_1.default.findAllEmployees();
    }
    async createEmployee(data) {
        return await employees_repository_1.default.createEmployee(data);
    }
    async getEmployeeById(id) {
        const employee = await employees_repository_1.default.findEmployeeById(id);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return employee;
    }
}
exports.EmployeesService = EmployeesService;
exports.default = new EmployeesService();
//# sourceMappingURL=employees.service.js.map