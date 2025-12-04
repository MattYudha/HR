"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollService = void 0;
const payroll_repository_1 = __importDefault(require("./payroll.repository"));
const employees_repository_1 = __importDefault(require("../employees/employees.repository"));
const client_1 = require("@prisma/client");
const pdfkit_1 = __importDefault(require("pdfkit"));
const date_fns_1 = require("date-fns");
class PayrollService {
    constructor(payrollRepository) {
        this.payrollRepository = payrollRepository;
    }
    cleanAndParseNumber(value) {
        if (typeof value === 'number') {
            return value;
        }
        if (typeof value === 'string') {
            let cleaned = value.trim();
            cleaned = cleaned.replace(/[^0-9.,]/g, '');
            if (cleaned.includes(',') && cleaned.includes('.')) {
                if (cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')) {
                    cleaned = cleaned.replace(/\./g, '');
                    cleaned = cleaned.replace(/,/g, '.');
                }
                else {
                    cleaned = cleaned.replace(/,/g, '');
                }
            }
            else if (cleaned.includes(',')) {
                cleaned = cleaned.replace(/,/g, '.');
            }
            const parsed = parseFloat(cleaned);
            if (isNaN(parsed)) {
                throw new Error(`Invalid numeric value: "${value}"`);
            }
            return parsed;
        }
        return 0;
    }
    calculatePPH21(baseSalary, allowances, deductions) {
        const bruto = baseSalary + allowances;
        const biayaJabatan = Math.min(bruto * 0.05, 500000);
        const neto = bruto - biayaJabatan - deductions;
        const ptkp = 54000000;
        const pkp = Math.max(neto * 12 - ptkp, 0);
        let pph21Tahunan = 0;
        if (pkp > 0) {
            const pkpLayer1 = Math.min(pkp, 60000000);
            pph21Tahunan += pkpLayer1 * 0.05;
        }
        if (pkp > 60000000) {
            const pkpLayer2 = Math.min(pkp - 60000000, 190000000);
            pph21Tahunan += pkpLayer2 * 0.15;
        }
        if (pkp > 250000000) {
            const pkpLayer3 = Math.min(pkp - 250000000, 250000000);
            pph21Tahunan += pkpLayer3 * 0.25;
        }
        if (pkp > 500000000) {
            const pkpLayer4 = pkp - 500000000;
            pph21Tahunan += pkpLayer4 * 0.30;
        }
        const pph21Bulanan = pph21Tahunan / 12;
        return pph21Bulanan;
    }
    async createPayroll(data) {
        if (!data.employeeId) {
            throw new Error("Employee ID is required.");
        }
        const baseSalary = this.cleanAndParseNumber(data.baseSalary);
        const allowances = this.cleanAndParseNumber(data.allowances);
        const deductions = this.cleanAndParseNumber(data.deductions);
        const totalSalary = baseSalary + allowances - deductions;
        const pph21 = this.calculatePPH21(baseSalary, allowances, deductions);
        const takeHomePay = totalSalary - pph21;
        return await this.payrollRepository.createPayroll({
            employeeId: data.employeeId,
            period: data.period,
            baseSalary,
            allowances,
            deductions,
            totalSalary,
            pph21,
            takeHomePay,
        });
    }
    async getEmployeePayrolls(userId) {
        const employee = await employees_repository_1.default.findEmployeeByUserId(userId);
        if (!employee) {
            throw new Error('Employee not found');
        }
        return await this.payrollRepository.findPayrollsByEmployee(employee.id);
    }
    async getPayrollList(filters) {
        const page = filters.page || 1;
        const limit = filters.limit || 10;
        const items = await this.payrollRepository.getPayrollListItems(filters);
        const totalItems = await this.payrollRepository.countPayrollListItems(filters);
        const totalPages = Math.ceil(totalItems / limit);
        return {
            items,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages
            }
        };
    }
    async getPayrollById(id) {
        const payroll = await this.payrollRepository.findPayrollByIdIncludeEmployeeUser(id);
        if (!payroll) {
            throw new Error('Payroll not found');
        }
        return payroll;
    }
    async markPayrollAsPaid(id) {
        const payroll = await this.payrollRepository.findPayrollByIdIncludeEmployeeUser(id);
        if (!payroll) {
            throw new Error('Payroll not found');
        }
        if (payroll.status === 'PAID') {
            throw new Error('Payroll already paid');
        }
        return await this.payrollRepository.markPayrollAsPaid(id);
    }
    async revertPayroll(id) {
        const payroll = await this.payrollRepository.findPayrollByIdIncludeEmployeeUser(id);
        if (!payroll) {
            throw new Error('Payroll not found');
        }
        if (payroll.status === 'PENDING') {
            throw new Error('Payroll is already pending');
        }
        return await this.payrollRepository.revertPayroll(id);
    }
    async bulkGeneratePayroll(period) {
        if (!/^\d{4}-\d{2}$/.test(period)) {
            throw new Error('Invalid period format. Expected YYYY-MM.');
        }
        const employeesToGenerateFor = await this.payrollRepository.findEmployeesWithoutPayroll(period);
        if (employeesToGenerateFor.length === 0) {
            return {
                generatedCount: 0,
                generatedPayrolls: []
            };
        }
        const payrollRecords = employeesToGenerateFor.map(employee => {
            const baseSalary = this.cleanAndParseNumber(employee.baseSalary.toNumber());
            const allowances = this.cleanAndParseNumber(0);
            const deductions = this.cleanAndParseNumber(0);
            const totalSalary = baseSalary + allowances - deductions;
            const pph21 = this.calculatePPH21(baseSalary, allowances, deductions);
            const takeHomePay = totalSalary - pph21;
            return {
                employeeId: employee.id,
                period: period,
                baseSalary: new client_1.Prisma.Decimal(baseSalary),
                allowances: new client_1.Prisma.Decimal(allowances),
                deductions: new client_1.Prisma.Decimal(deductions),
                totalSalary: new client_1.Prisma.Decimal(totalSalary),
                pph21: new client_1.Prisma.Decimal(pph21),
                takeHomePay: new client_1.Prisma.Decimal(takeHomePay),
                status: 'PENDING',
                paidDate: null
            };
        });
        const result = await this.payrollRepository.createManyPayroll(payrollRecords);
        const createdEmployeeIds = employeesToGenerateFor.map(emp => emp.id);
        const fetchedNewlyCreatedPayrolls = await prisma.payroll.findMany({
            where: {
                employeeId: {
                    in: createdEmployeeIds
                },
                period: period
            },
            include: {
                employee: {
                    include: { user: true }
                }
            }
        });
        return {
            generatedCount: result.count,
            generatedPayrolls: fetchedNewlyCreatedPayrolls
        };
    }
    async generatePayrollSlip(payrollId) {
        const payroll = await this.getPayrollById(payrollId);
        if (!payroll) {
            throw new Error('Payroll not found');
        }
        const doc = new pdfkit_1.default({ size: 'A4', margin: 50 });
        const formatDate = (date) => {
            if (!date)
                return 'N/A';
            return (0, date_fns_1.format)(new Date(date), 'dd MMMM yyyy');
        };
        const formatCurrency = (amount) => {
            const num = typeof amount === 'number' ? amount : amount.toNumber();
            return `Rp ${num.toLocaleString('id-ID', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;
        };
        doc
            .fontSize(20)
            .font('Helvetica-Bold')
            .text('Slip Gaji - Perusahaan', { align: 'center' });
        doc.moveDown(2);
        doc.fontSize(12).font('Helvetica-Bold');
        const col1X = 50;
        const col2X = 150;
        const startY = doc.y;
        doc.text('Nama Karyawan', col1X, startY);
        doc.text(':', col2X, startY);
        doc.font('Helvetica').text(payroll.employee?.fullName || 'N/A', col2X + 15, startY);
        doc.font('Helvetica-Bold').text('Jabatan', col1X, startY + 20);
        doc.text(':', col2X, startY + 20);
        doc.font('Helvetica').text(payroll.employee?.position || 'N/A', col2X + 15, startY + 20);
        doc.font('Helvetica-Bold').text('Periode', col1X, startY + 40);
        doc.text(':', col2X, startY + 40);
        doc.font('Helvetica').text(payroll.period, col2X + 15, startY + 40);
        doc.moveDown(4);
        const earningsX = 50;
        const valuesX = 250;
        let currentY = doc.y;
        doc.fontSize(14).font('Helvetica-Bold').text('Pendapatan', earningsX, currentY);
        doc.moveDown();
        currentY = doc.y;
        doc.fontSize(12).font('Helvetica');
        doc.text('Gaji Pokok', earningsX, currentY);
        doc.text(formatCurrency(payroll.baseSalary), valuesX, currentY, { align: 'right' });
        currentY += 20;
        doc.text('Tunjangan', earningsX, currentY);
        doc.text(formatCurrency(payroll.allowances), valuesX, currentY, { align: 'right' });
        currentY += 30;
        doc.fontSize(14).font('Helvetica-Bold').text('Potongan', earningsX, currentY);
        doc.moveDown();
        currentY = doc.y;
        doc.fontSize(12).font('Helvetica');
        doc.text('Potongan Lainnya', earningsX, currentY);
        doc.text(formatCurrency(payroll.deductions), valuesX, currentY, { align: 'right' });
        currentY += 20;
        doc.text('PPH 21', earningsX, currentY);
        doc.text(formatCurrency(payroll.pph21), valuesX, currentY, { align: 'right' });
        currentY += 30;
        doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, currentY).lineTo(550, currentY).stroke();
        currentY += 15;
        doc.fontSize(14).font('Helvetica-Bold');
        doc.text('Take Home Pay', earningsX, currentY);
        doc.text(formatCurrency(payroll.takeHomePay), valuesX, currentY, { align: 'right' });
        currentY += 30;
        doc.fontSize(12).font('Helvetica-Bold');
        doc.text('Status', earningsX, currentY);
        if (payroll.status === 'PAID') {
            doc
                .font('Helvetica')
                .text(`LUNAS (Dibayarkan pada ${formatDate(payroll.paidDate)})`, valuesX, currentY, { align: 'right' });
        }
        else {
            doc.font('Helvetica').text('PENDING', valuesX, currentY, { align: 'right' });
        }
        doc.end();
        return doc;
    }
}
exports.PayrollService = PayrollService;
exports.default = new PayrollService(payroll_repository_1.default);
//# sourceMappingURL=payroll.service.js.map