import payrollRepositoryInstance, { PayrollRepository, PayrollListFilters } from './payroll.repository';
import employeesRepository from '../employees/employees.repository';
import { Payroll, Prisma } from '@prisma/client';
import PDFDocument from 'pdfkit';
import { format } from 'date-fns';

interface PayrollListResponse {
  items: Payroll[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
}

export class PayrollService {
  constructor(private payrollRepository: PayrollRepository) {}

  private cleanAndParseNumber(value: number | string | undefined): number {
    if (typeof value === 'number') {
      return value;
    }
    if (typeof value === 'string') {
      let cleaned = value.trim();
      // Remove currency symbols (Rp, $) and non-numeric characters except for . and ,
      cleaned = cleaned.replace(/[^0-9.,]/g, '');

      // Handle common Indonesian/European format where ',' is decimal separator and '.' is thousands separator
      if (cleaned.includes(',') && cleaned.includes('.')) {
        // If ',' is the last separator, assume it's the decimal separator
        if (cleaned.lastIndexOf(',') > cleaned.lastIndexOf('.')) {
          cleaned = cleaned.replace(/\./g, ''); // Remove thousands separator
          cleaned = cleaned.replace(/,/g, '.'); // Replace decimal separator
        } else {
          // If '.' is the last separator, assume it's the decimal separator
          cleaned = cleaned.replace(/,/g, ''); // Remove thousands separator
        }
      } else if (cleaned.includes(',')) {
        // Only comma, assume it's decimal
        cleaned = cleaned.replace(/,/g, '.');
      }
      // If only dot, assume it's decimal
      // If no dot or comma, it's just a number string

      const parsed = parseFloat(cleaned);
      if (isNaN(parsed)) {
        throw new Error(`Invalid numeric value: "${value}"`);
      }
      return parsed;
    }
    return 0; // Default for undefined
  }

  private calculatePPH21(baseSalary: number, allowances: number, deductions: number): number {
    const bruto = baseSalary + allowances;
    const biayaJabatan = Math.min(bruto * 0.05, 500000);
    const neto = bruto - biayaJabatan - deductions;

    // PTKP (Penghasilan Tidak Kena Pajak) untuk TK/0
    const ptkp = 54000000; // Contoh: TK/0

    const pkp = Math.max(neto * 12 - ptkp, 0); // Penghasilan Kena Pajak Tahunan

    let pph21Tahunan = 0;
    // Layer 1: 0 - 60 juta -> 5%
    if (pkp > 0) {
      const pkpLayer1 = Math.min(pkp, 60000000);
      pph21Tahunan += pkpLayer1 * 0.05;
    }
    // Layer 2: 60 - 250 juta -> 15%
    if (pkp > 60000000) {
      const pkpLayer2 = Math.min(pkp - 60000000, 190000000); // 250jt - 60jt
      pph21Tahunan += pkpLayer2 * 0.15;
    }
    // Layer 3: 250 - 500 juta -> 25%
    if (pkp > 250000000) {
      const pkpLayer3 = Math.min(pkp - 250000000, 250000000); // 500jt - 250jt
      pph21Tahunan += pkpLayer3 * 0.25;
    }
    // Layer 4: > 500 juta -> 30%
    if (pkp > 500000000) {
      const pkpLayer4 = pkp - 500000000;
      pph21Tahunan += pkpLayer4 * 0.30;
    }

    const pph21Bulanan = pph21Tahunan / 12;
    return pph21Bulanan;
  }

  async createPayroll(data: {
    employeeId: string;
    period: string;
    baseSalary: number | string;
    allowances?: number | string;
    deductions?: number | string;
  }) {
    // --- VALIDASI & KONVERSI ANGKA ---
    if (!data.employeeId) {
      throw new Error("Employee ID is required.");
    }
    const baseSalary = this.cleanAndParseNumber(data.baseSalary);
    const allowances = this.cleanAndParseNumber(data.allowances);
    const deductions = this.cleanAndParseNumber(data.deductions);

    const totalSalary = baseSalary + allowances - deductions;

    // Hitung PPH21 dan Take Home Pay
    const pph21 = this.calculatePPH21(baseSalary, allowances, deductions);
    const takeHomePay = totalSalary - pph21;

    // --- KIRIM KE REPOSITORY ---
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

  async getEmployeePayrolls(userId: string) {
    const employee = await employeesRepository.findEmployeeByUserId(userId);

    if (!employee) {
      throw new Error('Employee not found');
    }

    return await this.payrollRepository.findPayrollsByEmployee(employee.id);
  }

  async getPayrollList(filters: PayrollListFilters): Promise<PayrollListResponse> {
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

  async getPayrollById(id: string) {
    const payroll = await this.payrollRepository.findPayrollByIdIncludeEmployeeUser(id);

    if (!payroll) {
      throw new Error('Payroll not found');
    }

    return payroll;
  }

  async markPayrollAsPaid(id: string) {
    const payroll = await this.payrollRepository.findPayrollByIdIncludeEmployeeUser(id);

    if (!payroll) {
      throw new Error('Payroll not found');
    }

    if (payroll.status === 'PAID') {
      throw new Error('Payroll already paid');
    }

    return await this.payrollRepository.markPayrollAsPaid(id);
  }

  async revertPayroll(id: string) {
    const payroll = await this.payrollRepository.findPayrollByIdIncludeEmployeeUser(id);

    if (!payroll) {
      throw new Error('Payroll not found');
    }

    if (payroll.status === 'PENDING') {
      throw new Error('Payroll is already pending');
    }

    return await this.payrollRepository.revertPayroll(id);
  }

  async bulkGeneratePayroll(period: string) {
    // 1. Validate period format YYYY-MM
    if (!/^\d{4}-\d{2}$/.test(period)) {
      throw new Error('Invalid period format. Expected YYYY-MM.');
    }

    // 2. Find employees without payroll for the given period
    const employeesToGenerateFor = await this.payrollRepository.findEmployeesWithoutPayroll(period);

    if (employeesToGenerateFor.length === 0) {
      return {
        generatedCount: 0,
        generatedPayrolls: []
      };
    }

    // 3. Create default payroll records
    const payrollRecords = employeesToGenerateFor.map(employee => {
      // Assuming allowances and deductions are 0 for bulk generation
      const baseSalary = this.cleanAndParseNumber(employee.baseSalary); // Use new function
      const allowances = this.cleanAndParseNumber(0); // Still 0, but pass through for consistency
      const deductions = this.cleanAndParseNumber(0); // Still 0, but pass through for consistency
      const totalSalary = baseSalary + allowances - deductions;

      const pph21 = this.calculatePPH21(baseSalary, allowances, deductions);
      const takeHomePay = totalSalary - pph21;

      return {
        employeeId: employee.id,
        period: period,
        baseSalary: new Prisma.Decimal(baseSalary), // Convert back to Decimal for Prisma
        allowances: new Prisma.Decimal(allowances),
        deductions: new Prisma.Decimal(deductions),
        totalSalary: new Prisma.Decimal(totalSalary),
        pph21: new Prisma.Decimal(pph21),
        takeHomePay: new Prisma.Decimal(takeHomePay),
        status: 'PENDING',
        paidDate: null
      };
    });

    // 4. Batch create payrolls
    const result = await this.payrollRepository.createManyPayroll(payrollRecords);

    // 5. Fetch the newly created payrolls based on period and employee IDs
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

  async generatePayrollSlip(payrollId: string): Promise<PDFKit.PDFDocument> {
    const payroll = await this.getPayrollById(payrollId);
    if (!payroll) {
      // This case is already handled by getPayrollById, but for safety:
      throw new Error('Payroll not found');
    }

    const doc = new PDFDocument({ size: 'A4', margin: 50 });

    // --- HELPER FUNCTIONS ---
    const formatDate = (date: Date | null) => {
      if (!date) return 'N/A';
      return format(new Date(date), 'dd MMMM yyyy');
    };

    const formatCurrency = (amount: Prisma.Decimal | number) => {
      const num = typeof amount === 'number' ? amount : amount.toNumber();
      return `Rp ${num.toLocaleString('id-ID', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })}`;
    };

    // --- HEADER ---
    doc
      .fontSize(20)
      .font('Helvetica-Bold')
      .text('Slip Gaji - Perusahaan', { align: 'center' });
    doc.moveDown(2);

    // --- EMPLOYEE DETAILS ---
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

    // --- EARNINGS & DEDUCTIONS ---
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

    // --- SUMMARY ---
    doc.strokeColor('#aaaaaa').lineWidth(1).moveTo(50, currentY).lineTo(550, currentY).stroke();
    currentY += 15;

    doc.fontSize(14).font('Helvetica-Bold');
    doc.text('Take Home Pay', earningsX, currentY);
    doc.text(formatCurrency(payroll.takeHomePay), valuesX, currentY, { align: 'right' });
    currentY += 30;

    // --- STATUS ---
    doc.fontSize(12).font('Helvetica-Bold');
    doc.text('Status', earningsX, currentY);
    if (payroll.status === 'PAID') {
      doc
        .font('Helvetica')
        .text(`LUNAS (Dibayarkan pada ${formatDate(payroll.paidDate)})`, valuesX, currentY, { align: 'right' });
    } else {
      doc.font('Helvetica').text('PENDING', valuesX, currentY, { align: 'right' });
    }

    doc.end();
    return doc;
  }
}

export default new PayrollService(payrollRepositoryInstance);
