import prisma from '../../utils/prisma';
import { Employee } from '@prisma/client';

export class EmployeesRepository {
  async findEmployeeByUserId(userId: string) {
    return await prisma.employee.findUnique({
      where: { userId },
      include: {
        user: {
          include: { role: true }
        }
      }
    });
  }

  async findAllEmployees() {
    return await prisma.employee.findMany({
      include: {
        user: {
          include: { role: true }
        }
      }
    });
  }

  async findEmployeeById(id: string) {
    return await prisma.employee.findUnique({
      where: { id },
      include: {
        user: {
          include: { role: true }
        }
      }
    });
  }

  async createEmployee(data: {
    userId: string;
    fullName: string;
    phone?: string;
    address?: string;
    position?: string;
    department?: string;
    baseSalary?: number;
  }): Promise<Employee> {
    return await prisma.employee.create({
      data,
      include: {
        user: {
          include: { role: true }
        }
      }
    });
  }

  async updateEmployee(id: string, data: Partial<Employee>): Promise<Employee> {
    return await prisma.employee.update({
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

export default new EmployeesRepository();
