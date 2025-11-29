import employeesRepository from './employees.repository';

export class EmployeesService {
  async getEmployeeProfile(userId: string) {
    const employee = await employeesRepository.findEmployeeByUserId(userId);

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }

  async getAllEmployees() {
    return await employeesRepository.findAllEmployees();
  }

  async createEmployee(data: {
    userId: string;
    fullName: string;
    phone?: string;
    address?: string;
    position?: string;
    department?: string;
    baseSalary?: number;
  }) {
    return await employeesRepository.createEmployee(data);
  }

  async getEmployeeById(id: string) {
    const employee = await employeesRepository.findEmployeeById(id);

    if (!employee) {
      throw new Error('Employee not found');
    }

    return employee;
  }
}

export default new EmployeesService();
