import prisma from '../../utils/prisma';
import { User } from '@prisma/client';

export class UsersRepository {
  async findUserById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id },
      include: {
        role: true,
        employee: true
      }
    });
  }

  async findAllUsers() {
    return await prisma.user.findMany({
      include: {
        role: true,
        employee: true
      }
    });
  }

  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return await prisma.user.update({
      where: { id },
      data,
      include: {
        role: true,
        employee: true
      }
    });
  }
}

export default new UsersRepository();
