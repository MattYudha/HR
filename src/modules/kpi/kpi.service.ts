import kpiRepository from './kpi.repository';
import employeesRepository from '../employees/employees.repository';

export class KPIService {
  async createKPI(data: {
    employeeId: string;
    period: string;
    score: number;
    category: string;
    notes?: string;
  }) {
    return await kpiRepository.createKPI(data);
  }

  async getEmployeeKPIs(userId: string) {
    const employee = await employeesRepository.findEmployeeByUserId(userId);

    if (!employee) {
      throw new Error('Employee not found');
    }

    return await kpiRepository.findKPIsByEmployee(employee.id);
  }

  async getAllKPIs() {
    return await kpiRepository.findAllKPIs();
  }

  async getKPIById(id: string) {
    const kpi = await kpiRepository.findKPIById(id);

    if (!kpi) {
      throw new Error('KPI not found');
    }

    return kpi;
  }
}

export default new KPIService();
