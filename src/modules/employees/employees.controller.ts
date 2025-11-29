import { Request, Response } from 'express';
import employeesService from './employees.service';

export class EmployeesController {
  async getMyProfile(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Unauthorized'
        });
        return;
      }

      const employee = await employeesService.getEmployeeProfile(req.user.id);

      res.json({
        success: true,
        message: 'Employee profile retrieved successfully',
        data: employee
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get employee profile'
      });
    }
  }

  async getAllEmployees(_req: Request, res: Response): Promise<void> {
    try {
      const employees = await employeesService.getAllEmployees();

      res.json({
        success: true,
        message: 'Employees retrieved successfully',
        data: employees
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to get employees'
      });
    }
  }

  async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const employeeData = req.body;
      const employee = await employeesService.createEmployee(employeeData);

      res.status(201).json({
        success: true,
        message: 'Employee created successfully',
        data: employee
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create employee'
      });
    }
  }
}

export default new EmployeesController();
