import { Request, Response } from 'express';
import authService from './auth.service';

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { fullName, email, password, roleId } = req.body;

      // Basic validation for required fields
      if (!fullName || !email || !password) {
        res.status(400).json({
          success: false,
          message: 'Full Name, Email, and Password are required for registration.'
        });
        return;
      }

      const newUser = await authService.registerUser(fullName, email, password, roleId);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          id: newUser.id,
          email: newUser.email,
          role: newUser.role,
          employee: newUser.employee, // Will be null if not created by repository or if employee data is not included
        }
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Registration failed'
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await authService.login(email, password);

      res.status(200).json({
        success: true,
        message: 'Login successful',
        data: {
          user: {
            id: result.user.id,
            email: result.user.email,
            name: result.user.employee?.fullName // Ensure name is included here for login response too.
          },
          token: result.token
        }
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'Login failed'
      });
    }
  }
}

export default new AuthController();
