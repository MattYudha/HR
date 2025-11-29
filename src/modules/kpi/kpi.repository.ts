import prisma from '../../utils/prisma';
import { KPI } from '@prisma/client';

export class KPIRepository {
  async createKPI(data: {
    employeeId: string;
    period: string;
    score: number;
    category: string;
    notes?: string;
  }): Promise<KPI> {
    return await prisma.kPI.create({
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

  async updateKPI(id: string, data: Partial<KPI>): Promise<KPI> {
    return await prisma.kPI.update({
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

  async findKPIsByEmployee(employeeId: string) {
    return await prisma.kPI.findMany({
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

  async findKPIById(id: string) {
    return await prisma.kPI.findUnique({
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

  async findAllKPIs() {
    return await prisma.kPI.findMany({
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

export default new KPIRepository();
