import approvalRepository from './approval.repository';
import employeesRepository from '../employees/employees.repository';

export class ApprovalService {
  async createApprovalRequest(
    userId: string,
    data: {
      type: string;
      title: string;
      description?: string;
    }
  ) {
    const employee = await employeesRepository.findEmployeeByUserId(userId);

    if (!employee) {
      throw new Error('Employee not found');
    }

    return await approvalRepository.createApproval({
      employeeId: employee.id,
      ...data,
      status: 'PENDING'
    });
  }

  async approveRequest(
    approvalId: string,
    approverId: string,
    notes?: string
  ) {
    const approval = await approvalRepository.findApprovalById(approvalId);

    if (!approval) {
      throw new Error('Approval request not found');
    }

    if (approval.status !== 'PENDING') {
      throw new Error('Approval request already processed');
    }

    return await approvalRepository.updateApproval(approvalId, {
      status: 'APPROVED',
      approvedBy: approverId,
      approvedDate: new Date(),
      notes
    });
  }

  async getMyApprovals(userId: string) {
    const employee = await employeesRepository.findEmployeeByUserId(userId);

    if (!employee) {
      throw new Error('Employee not found');
    }

    return await approvalRepository.findApprovalsByEmployee(employee.id);
  }

  async getApprovalDetail(id: string) {
    const approval = await approvalRepository.findApprovalById(id);

    if (!approval) {
      throw new Error('Approval not found');
    }

    return approval;
  }
}

export default new ApprovalService();
