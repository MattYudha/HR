"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KPIService = void 0;
const kpi_repository_1 = __importDefault(require("./kpi.repository"));
const employees_repository_1 = __importDefault(require("../employees/employees.repository"));
class KPIService {
    async createKPI(data) {
        return await kpi_repository_1.default.createKPI(data);
    }
    async getEmployeeKPIs(userId) {
        const employee = await employees_repository_1.default.findEmployeeByUserId(userId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return await kpi_repository_1.default.findKPIsByEmployee(employee.id);
    }
    async getAllKPIs() {
        return await kpi_repository_1.default.findAllKPIs();
    }
    async getKPIById(id) {
        const kpi = await kpi_repository_1.default.findKPIById(id);
        if (!kpi) {
            throw new Error('KPI not found');
        }
        return kpi;
    }
}
exports.KPIService = KPIService;
exports.default = new KPIService();
//# sourceMappingURL=kpi.service.js.map