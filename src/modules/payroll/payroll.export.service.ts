import prisma from '../../utils/prisma';
import { Payroll } from '@prisma/client';
import { format as formatDate } from 'date-fns';
import * as csv from 'fast-csv';
import * as XLSX from 'xlsx';
import { PassThrough } from 'stream';

export class PayrollExportService {
  async exportPayroll(period?: string, format: 'csv' | 'xlsx' = 'csv'): Promise<Buffer | { success: false; message: string }> {
    let payrolls: (Payroll & {
      employee: {
        fullName: string;
        user: {
          email: string;
        };
      };
    })[];

    const whereClause: any = {};
    if (period) {
      whereClause.period = period;
    }

    payrolls = await prisma.payroll.findMany({
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
      'Paid Date': p.paidDate ? formatDate(p.paidDate, 'yyyy-MM-dd') : '',
    }));

    if (format === 'csv') {
      return new Promise((resolve, reject) => {
        const csvStream = csv.format({ headers: true });
        const passthroughStream = new PassThrough();
        const buffers: Buffer[] = [];

        passthroughStream.on('data', (chunk) => buffers.push(chunk));
        passthroughStream.on('end', () => resolve(Buffer.concat(buffers)));
        passthroughStream.on('error', (error) => reject({ success: false, message: error.message }));

        csvStream.pipe(passthroughStream);
        data.forEach((row) => csvStream.write(row));
        csvStream.end();
      });
    } else if (format === 'xlsx') {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Payrolls');
        return XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    }

    return { success: false, message: 'Invalid export format.' };
  }
}

export default new PayrollExportService();
