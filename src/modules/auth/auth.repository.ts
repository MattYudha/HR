import prisma from '../../utils/prisma';
import { User } from '@prisma/client';

export class AuthRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
      include: { role: true }
    });
  }

  async createUser(data: {
    email: string;
    password: string;
    roleId: string;
  }): Promise<User> {
    return await prisma.user.create({
      data,
      include: { role: true }
    });
  }

  async findUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
      include: { role: true }
    });
  }
}

export default new AuthRepository();
