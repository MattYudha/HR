import payrollRepository from './payroll.repository';
import employeesRepository from '../employees/employees.repository';

export class PayrollService {
  async createPayroll(data: {
    employeeId: string;
    period: string;
    baseSalary: number;
    allowances?: number;
    deductions?: number;
  }) {
    const totalSalary = data.baseSalary + (data.allowances || 0) - (data.deductions || 0);

    return await payrollRepository.createPayroll({
      ...data,
      totalSalary
    });
  }

  async getEmployeePayrolls(userId: string) {
    const employee = await employeesRepository.findEmployeeByUserId(userId);

    if (!employee) {
      throw new Error('Employee not found');
    }

    return await payrollRepository.findPayrollsByEmployee(employee.id);
  }

  async getAllPayrolls() {
    return await payrollRepository.findAllPayrolls();
  }

  async getPayrollById(id: string) {
    const payroll = await payrollRepository.findPayrollById(id);

    if (!payroll) {
      throw new Error('Payroll not found');
    }

    return payroll;
  }
}

export default new PayrollService();
