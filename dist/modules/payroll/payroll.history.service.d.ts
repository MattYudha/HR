import { Payroll } from '@prisma/client';
interface PayrollHistoryFilters {
    page?: number;
    limit?: number;
    status?: 'PAID' | 'PENDING';
    period?: string;
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
export declare class PayrollHistoryService {
    getPayrollHistory(employeeId: string, filters: PayrollHistoryFilters): Promise<PayrollHistoryResponse | {
        success: false;
        message: string;
    }>;
}
declare const _default: PayrollHistoryService;
export default _default;
//# sourceMappingURL=payroll.history.service.d.ts.map