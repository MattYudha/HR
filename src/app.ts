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
app.use('/api/kpi', kpiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
