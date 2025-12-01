import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import authRepository from './auth.repository';

export class AuthService {
  async register(email: string, password: string, roleId: string) {
    const existingUser = await authRepository.findUserByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await authRepository.createUser({
      email,
      password: hashedPassword,
      roleId
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
