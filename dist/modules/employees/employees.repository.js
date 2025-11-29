"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesRepository = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
class EmployeesRepository {
    async findEmployeeByUserId(userId) {
        return await prisma_1.default.employee.findUnique({
            where: { userId },
            include: {
                user: {
                    include: { role: true }
                }
            }
        });
    }
    async findAllEmployees() {
        return await prisma_1.default.employee.findMany({
            include: {
                user: {
                    include: { role: true }
                }
            }
        });
    }
    async findEmployeeById(id) {
        return await prisma_1.default.employee.findUnique({
            where: { id },
            include: {
                user: {
                    include: { role: true }
                }
            }
        });
    }
    async createEmployee(data) {
        return await prisma_1.default.employee.create({
            data,
            include: {
                user: {
                    include: { role: true }
                }
            }
        });
    }
    async updateEmployee(id, data) {
        return await prisma_1.default.employee.update({
            where: { id },
            data,
            include: {
                user: {
                    include: { role: true }
                }
            }
        });
    }
}
exports.EmployeesRepository = EmployeesRepository;
exports.default = new EmployeesRepository();
//# sourceMappingURL=employees.repository.js.map