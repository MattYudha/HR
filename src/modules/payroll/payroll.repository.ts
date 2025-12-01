import prisma from '../../utils/prisma';
import { Payroll, Prisma } from '@prisma/client';

export interface PayrollListFilters {
  page?: number;
  limit?: number;
  status?: 'PENDING' | 'PAID';
  period?: string; // YYYY-MM
  employeeId?: string;
  search?: string; // Match fullName or email
}

export class PayrollRepository {
  async createPayroll(data: {
    employeeId: string;
    period: string;
    baseSalary: number;
    allowances?: number;
    deductions?: number;
    totalSalary: number;
    pph21: number;
    takeHomePay: number;
    status?: string;
  }): Promise<Payroll> {
    const { employeeId, ...rest } = data;
    return await prisma.payroll.create({
      data: {
        ...rest,
        employee: {
          connect: {
            id: employeeId
          }
        }
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

  async getPayrollListItems(filters: PayrollListFilters) {
    const { status, period, employeeId, search, page = 1, limit = 10 } = filters;
    const skip = (page - 1) * limit;

    const whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }
    if (period) {
      whereClause.period = period;
    }
    if (employeeId) {
      whereClause.employeeId = employeeId;
    }
    if (search) {
      whereClause.OR = [
        { employee: { fullName: { contains: search, mode: 'insensitive' } } },
        { employee: { user: { email: { contains: search, mode: 'insensitive' } } } }
      ];
    }

    return await prisma.payroll.findMany({
      where: whereClause,
      include: {
        employee: {
          include: { user: true }
        }
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' }
    });
  }

  async countPayrollListItems(filters: PayrollListFilters): Promise<number> {
    const { status, period, employeeId, search } = filters;

    const whereClause: any = {};
    if (status) {
      whereClause.status = status;
    }
    if (period) {
      whereClause.period = period;
    }
    if (employeeId) {
      whereClause.employeeId = employeeId;
    }
    if (search) {
      whereClause.OR = [
        { employee: { fullName: { contains: search, mode: 'insensitive' } } },
        { employee: { user: { email: { contains: search, mode: 'insensitive' } } } }
      ];
    }

    return await prisma.payroll.count({ where: whereClause });
  }

  async findPayrollByIdIncludeEmployeeUser(id: string) {
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

  async markPayrollAsPaid(id: string): Promise<Payroll> {
    return await prisma.payroll.update({
      where: { id },
      data: {
        status: 'PAID',
        paidDate: new Date()
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

  async revertPayroll(id: string): Promise<Payroll> {
    return await prisma.payroll.update({
      where: { id },
      data: {
        status: 'PENDING',
        paidDate: null,
        updatedAt: new Date()
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

  async findEmployeesWithoutPayroll(period: string) {
    return await prisma.employee.findMany({
      where: {
        payrolls: {
          none: {
            period: period
          }
        }
      },
      include: {
        user: true // Include user data for email if needed
      }
    });
  }

  async createManyPayroll(records: Prisma.PayrollCreateManyInput[]) {
    return await prisma.payroll.createMany({
      data: records,
      skipDuplicates: true // Skip if a record with the same unique fields already exists
    });
  }
}

export default new PayrollRepository();
