import prisma from '../../utils/prisma';
import { Payroll } from '@prisma/client';

export class PayrollRepository {
  async createPayroll(data: {
    employeeId: string;
    period: string;
    baseSalary: number;
    allowances?: number;
    deductions?: number;
    totalSalary: number;
    status?: string;
  }): Promise<Payroll> {
    return await prisma.payroll.create({
      data,
      include: {
        employee: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async updatePayroll(id: string, data: Partial<Payroll>): Promise<Payroll> {
    return await prisma.payroll.update({
      where: { id },
      data,
      include: {
        employee: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async findPayrollsByEmployee(employeeId: string) {
    return await prisma.payroll.findMany({
      where: { employeeId },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        employee: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async findPayrollById(id: string) {
    return await prisma.payroll.findUnique({
      where: { id },
      include: {
        employee: {
          include: {
            user: true
          }
        }
      }
    });
  }

  async findAllPayrolls() {
    return await prisma.payroll.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        employee: {
          include: {
            user: true
          }
        }
      }
    });
  }
}

export default new PayrollRepository();
