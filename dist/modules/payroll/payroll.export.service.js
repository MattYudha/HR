"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollExportService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const date_fns_1 = require("date-fns");
const csv = __importStar(require("fast-csv"));
const XLSX = __importStar(require("xlsx"));
const stream_1 = require("stream");
class PayrollExportService {
    async exportPayroll(period, format = 'csv') {
        let payrolls;
        const whereClause = {};
        if (period) {
            whereClause.period = period;
        }
        payrolls = await prisma_1.default.payroll.findMany({
            where: whereClause,
            include: {
                employee: {
                    select: {
                        fullName: true,
                        user: {
                            select: {
                                email: true,
                            },
                        },
                    },
                },
            },
        });
        if (payrolls.length === 0) {
            return { success: false, message: 'No payroll data found for the specified period.' };
        }
        const data = payrolls.map((p) => ({
            'Employee Name': p.employee.fullName,
            'Email': p.employee.user.email,
            'Period': p.period,
            'Base Salary': p.baseSalary,
            'Allowances': p.allowances,
            'Deductions': p.deductions,
            'Total Salary': p.totalSalary,
            'Status': p.status,
            'Paid Date': p.paidDate ? (0, date_fns_1.format)(p.paidDate, 'yyyy-MM-dd') : '',
        }));
        if (format === 'csv') {
            return new Promise((resolve, reject) => {
                const csvStream = csv.format({ headers: true });
                const passthroughStream = new stream_1.PassThrough();
                const buffers = [];
                passthroughStream.on('data', (chunk) => buffers.push(chunk));
                passthroughStream.on('end', () => resolve(Buffer.concat(buffers)));
                passthroughStream.on('error', (error) => reject({ success: false, message: error.message }));
                csvStream.pipe(passthroughStream);
                data.forEach((row) => csvStream.write(row));
                csvStream.end();
            });
        }
        else if (format === 'xlsx') {
            const worksheet = XLSX.utils.json_to_sheet(data);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Payrolls');
            return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        }
        return { success: false, message: 'Invalid export format.' };
    }
}
exports.PayrollExportService = PayrollExportService;
exports.default = new PayrollExportService();
//# sourceMappingURL=payroll.export.service.js.map