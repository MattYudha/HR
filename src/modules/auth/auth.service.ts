import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import authRepository, { UserWithRoleAndEmployee } from './auth.repository';
import prisma from '../../utils/prisma'; // Import the shared prisma instance

export class AuthService {
  async register(name: string, email: string, password: string): Promise<{ user: UserWithRoleAndEmployee; token: string }> { // Modified method signature
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
    const newUserWithRole: UserWithRoleAndEmployee | null = await authRepository.findUserByEmail(user.email);
    if (!newUserWithRole) {
      throw new Error('Failed to create user correctly');
    }

    const token = this.generateToken(newUserWithRole.id, newUserWithRole.email, newUserWithRole.role.name);

    return { user: newUserWithRole, token };
  }

  async login(email: string, password: string): Promise<{ user: UserWithRoleAndEmployee; token: string }> {
    // --- TEMPORARY TEST LOGIN - REMOVE IN PRODUCTION ---
    if (email === 'test@example.com' && password === 'testpassword') {
      let testUser = await authRepository.findUserByEmail('test@example.com');

      if (!testUser) {
        // If test user doesn't exist, create it (ensure 'employee' role exists)
        const hashedPassword = await bcryptjs.hash('testpassword', 10);
        const employeeRole = await prisma.role.findUnique({ where: { name: 'employee' } });

        if (!employeeRole) {
          throw new Error('Employee role not found. Cannot create test user without it.');
        }

        const createdUser = await authRepository.createUser({
          name: 'Test User',
          email: 'test@example.com',
          password: hashedPassword,
          roleId: employeeRole.id,
        });
        testUser = await authRepository.findUserByEmail(createdUser.email);
      }

      if (testUser) {
        const token = this.generateToken(testUser.id, testUser.email, testUser.role.name);
        return { user: testUser, token };
      }
    }
    // --- END TEMPORARY TEST LOGIN ---

    const user: UserWithRoleAndEmployee | null = await authRepository.findUserByEmail(email);

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
