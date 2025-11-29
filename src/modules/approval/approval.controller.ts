import { Request, Response } from 'express';
import approvalService from './approval.service';

export class ApprovalController {
  async createRequest(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const { type, title, description } = req.body;
      const approval = await approvalService.createApprovalRequest(req.user.id, {
        type,
        title,
        description
      });

      res.status(201).json({
        success: true,
        message: 'Approval request created successfully',
        data: approval
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create approval request'
      });
    }
  }

  async approveRequest(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const { approvalId, notes } = req.body;
      const approval = await approvalService.approveRequest(
        approvalId,
        req.user.id,
        notes
      );

      res.json({
        success: true,
        message: 'Approval request approved successfully',
        data: approval
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to approve request'
      });
    }
  }

  async getMyApprovals(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const approvals = await approvalService.getMyApprovals(req.user.id);

      res.json({
        success: true,
        message: 'Approval requests retrieved successfully',
        data: approvals
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get approval requests'
      });
    }
  }

  async getApprovalDetail(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const approval = await approvalService.getApprovalDetail(id);

      res.json({
        success: true,
        message: 'Approval detail retrieved successfully',
        data: approval
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get approval detail'
      });
    }
  }
}

export default new ApprovalController();
