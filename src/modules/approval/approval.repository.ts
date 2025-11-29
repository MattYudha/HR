import prisma from '../../utils/prisma';
import { Approval } from '@prisma/client';

export class ApprovalRepository {
  async createApproval(data: {
    employeeId: string;
    type: string;
    title: string;
    description?: string;
    status?: string;
  }): Promise<Approval> {
    return await prisma.approval.create({
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

  async updateApproval(id: string, data: Partial<Approval>): Promise<Approval> {
    return await prisma.approval.update({
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

  async findApprovalsByEmployee(employeeId: string) {
    return await prisma.approval.findMany({
      where: { employeeId },
      orderBy: {
        requestDate: 'desc'
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

  async findApprovalById(id: string) {
    return await prisma.approval.findUnique({
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

  async findAllApprovals() {
    return await prisma.approval.findMany({
      orderBy: {
        requestDate: 'desc'
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

export default new ApprovalRepository();
