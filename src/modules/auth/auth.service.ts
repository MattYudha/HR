import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import authRepository from './auth.repository';
import prisma from '../../utils/prisma'; // Import the shared prisma instance

export class AuthService {
  async register(name: string, email: string, password: string) { // Modified method signature
    const existingUser = await authRepository.findUserByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    // Find the 'employee' role ID
    const employeeRole = await prisma.role.findUnique({
        where: { name: 'employee' },
    });

    if (!employeeRole) {
        throw new Error('Employee role not found. Please seed the database.');
    }

    const user = await authRepository.createUser({
      name, // Pass name to repository
      email,
      password: hashedPassword,
      roleId: employeeRole.id, // Assign employee role
    });

    // Fetch the user again to get the role object
    const newUserWithRole = await authRepository.findUserByEmailWithRole(user.email);
    if (!newUserWithRole) {
      throw new Error('Failed to create user correctly');
    }

    const token = this.generateToken(newUserWithRole.id, newUserWithRole.email, newUserWithRole.role.name);

    return { user: newUserWithRole, token };
  }

  async login(email: string, password: string) {
    const user = await authRepository.findUserByEmailWithRole(email);

    if (!user || !user.isActive) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user.id, user.email, user.role.name);

    return { user, token };
  }

  private generateToken(userId: string, email: string, role: string): string {
    return jwt.sign(
      { sub: userId, email, role },
      env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
}

export default new AuthService();
