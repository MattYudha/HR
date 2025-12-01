import prisma from '../../utils/prisma';
import { Payroll, Prisma } from '@prisma/client';

interface PayrollHistoryFilters {
  page?: number;
  limit?: number;
  status?: 'PAID' | 'PENDING';
  period?: string; // YYYY-MM
  sort?: 'newest' | 'oldest';
}

interface PayrollHistoryResponse {
  items: Payroll[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export class PayrollHistoryService {
  async getPayrollHistory(
    employeeId: string,
    filters: PayrollHistoryFilters,
  ): Promise<PayrollHistoryResponse | { success: false; message: string }> {
    const { page = 1, limit = 10, status, period, sort = 'newest' } = filters;
    const skip = (page - 1) * limit;

    // 1. Validate employeeId and check if employee exists
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      select: { id: true, fullName: true, position: true },
    });

    if (!employee) {
      return { success: false, message: 'Employee not found.' };
    }

    const whereClause: Prisma.PayrollWhereInput = { employeeId };

    if (status) {
      whereClause.status = status;
    }
    if (period) {
      whereClause.period = period;
    }

    const orderBy: Prisma.PayrollOrderByWithRelationInput = {
      createdAt: sort === 'newest' ? 'desc' : 'asc',
    };

    const payrolls = await prisma.payroll.findMany({
      where: whereClause,
      include: {
        employee: {
          select: {
            id: true,
            fullName: true,
            position: true,
            user: {
              select: {
                email: true,
              },
            },
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    });

    const totalItems = await prisma.payroll.count({ where: whereClause });
    const totalPages = Math.ceil(totalItems / limit);

    // Map payrolls to include only desired employee info for each payroll entry
    const itemsWithEmployeeInfo = payrolls.map((payroll) => ({
      ...payroll,
      employee: {
        id: payroll.employee.id,
        fullName: payroll.employee.fullName,
        position: payroll.employee.position,
        // Optionally include user email if needed, but not specified in response structure
        // email: payroll.employee.user.email,
      },
    }));


    return {
      items: itemsWithEmployeeInfo,
      pagination: {
        page,
        limit,
        totalItems,
        totalPages,
      },
    };
  }
}

export default new PayrollHistoryService();
