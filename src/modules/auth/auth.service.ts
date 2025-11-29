import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env';
import authRepository from './auth.repository';

export class AuthService {
  async register(email: string, password: string, roleId: string) {
    const existingUser = await authRepository.findUserByEmail(email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await authRepository.createUser({
      email,
      password: hashedPassword,
      roleId
    });

    const token = this.generateToken(user.id, user.email);

    return { user, token };
  }

  async login(email: string, password: string) {
    const user = await authRepository.findUserByEmail(email);

    if (!user || !user.isActive) {
      throw new Error('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    const token = this.generateToken(user.id, user.email);

    return { user, token };
  }

  private generateToken(userId: string, email: string): string {
    return jwt.sign(
      { sub: userId, email },
      env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }
}

export default new AuthService();
