import prisma from '../../utils/prisma';
import { Prisma, User } from '@prisma/client';

// Define a type for User with included role and employee relations
const userWithRoleAndEmployee = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    role: true,
    employee: true,
  },
});

export type UserWithRoleAndEmployee = Prisma.UserGetPayload<typeof userWithRoleAndEmployee>;

export class AuthRepository {
  async findUserByEmail(email: string): Promise<UserWithRoleAndEmployee | null> {
    return await prisma.user.findUnique({
      where: { email },
      include: { role: true, employee: true } // Include employee here
    });
  }

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    roleId: string;
  }): Promise<User> {
    return await prisma.$transaction(async (tx) => {
      // 1. Create the User
      const user = await tx.user.create({
        data: {
          email: data.email,
          password: data.password,
          roleId: data.roleId,
        },
      });

      // 2. Create the associated Employee record
      await tx.employee.create({
        data: {
          userId: user.id,
          fullName: data.name, // Use 'name' from input for 'fullName'
        },
      });

      // 3. Return the created user (the employee is associated)
      return user;
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
