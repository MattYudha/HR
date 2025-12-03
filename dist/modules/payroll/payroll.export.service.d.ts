export declare class PayrollExportService {
    exportPayroll(period?: string, format?: 'csv' | 'xlsx'): Promise<Buffer | {
        success: false;
        message: string;
    }>;
}
declare const _default: PayrollExportService;
export default _default;
//# sourceMappingURL=payroll.export.service.d.ts.map