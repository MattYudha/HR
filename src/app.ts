import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

import authRoutes from './modules/auth/auth.routes';
import usersRoutes from './modules/users/users.routes';
import employeesRoutes from './modules/employees/employees.routes';
import attendanceRoutes from './modules/attendance/attendance.routes';
import approvalRoutes from './modules/approval/approval.routes';
import payrollRoutes from './modules/payroll/payroll.routes';
import kpiRoutes from './modules/kpi/kpi.routes';
import dashboardRoutes from './modules/dashboard/dashboard.routes';
import payrollPayRoutes from './modules/payroll/payroll.pay.routes';
import payrollDetailRoutes from './modules/payroll/payroll.detail.routes';
import payrollPdfRoutes from './modules/payroll/payroll.pdf.routes';
import payrollRecapRoutes from './modules/payroll/payroll.recap.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'HR & Payroll API is running',
    version: '1.0.0'
  });
});

app.get('/health', (_req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/employees', employeesRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/approval', approvalRoutes);
app.use('/api/payroll', payrollRoutes);
app.use('/api/payroll', payrollPayRoutes);
app.use('/api/payroll', payrollDetailRoutes);
app.use('/api/payroll', payrollPdfRoutes);
app.use('/api/payroll', payrollRecapRoutes);
app.use('/api/kpi', kpiRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
