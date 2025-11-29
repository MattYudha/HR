"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollService = void 0;
const payroll_repository_1 = __importDefault(require("./payroll.repository"));
const employees_repository_1 = __importDefault(require("../employees/employees.repository"));
class PayrollService {
    async createPayroll(data) {
        const totalSalary = data.baseSalary + (data.allowances || 0) - (data.deductions || 0);
        return await payroll_repository_1.default.createPayroll({
            ...data,
            totalSalary
        });
    }
    async getEmployeePayrolls(userId) {
        const employee = await employees_repository_1.default.findEmployeeByUserId(userId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return await payroll_repository_1.default.findPayrollsByEmployee(employee.id);
    }
    async getAllPayrolls() {
        return await payroll_repository_1.default.findAllPayrolls();
    }
    async getPayrollById(id) {
        const payroll = await payroll_repository_1.default.findPayrollById(id);
        if (!payroll) {
            throw new Error('Payroll not found');
        }
        return payroll;
    }
}
exports.PayrollService = PayrollService;
exports.default = new PayrollService();
//# sourceMappingURL=payroll.service.js.map