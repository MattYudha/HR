import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: { name: 'admin' },
  });

  const employeeRole = await prisma.role.upsert({
    where: { name: 'employee' },
    update: {},
    create: { name: 'employee' },
  });

  console.log(`Created roles: ${adminRole.name}, ${employeeRole.name}`);

  // Create a default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10); // Hashing 'admin123'
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin User',
      email: 'admin@example.com',
      password: hashedPassword,
      roleId: adminRole.id,
      isActive: true,
    },
  });

  console.log(`Created admin user: ${adminUser.email}`);

  // You can add more seed data here, e.g., employees, payrolls, etc.
  // For example, create an employee linked to the admin user
  await prisma.employee.upsert({
    where: { userId: adminUser.id },
    update: {},
    create: {
      userId: adminUser.id,
      fullName: 'Admin Employee',
      phone: '081234567890',
      address: 'Admin Street No. 1',
      position: 'Administrator',
      department: 'Management',
      baseSalary: 10000000,
      joinDate: new Date(),
    },
  });
  console.log(`Created employee for admin user.`);


}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Disconnected Prisma client.');
  });
