import { Request, Response } from 'express';
export declare class ApprovalController {
    createRequest(req: Request, res: Response): Promise<void>;
    approveRequest(req: Request, res: Response): Promise<void>;
    getMyApprovals(req: Request, res: Response): Promise<void>;
    getApprovalDetail(req: Request, res: Response): Promise<void>;
}
declare const _default: ApprovalController;
export default _default;
//# sourceMappingURL=approval.controller.d.ts.map