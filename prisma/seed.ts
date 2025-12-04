import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import path from 'path';

// 1. Load Environment Variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// --- PERUBAHAN UTAMA DI SINI ---
// Kita gunakan DIRECT_URL (Port 5432) untuk seeding agar menghindari error "Tenant not found"
// Pastikan variabel DIRECT_URL ada di file .env Anda!
const connectionString = process.env.DIRECT_URL; 

if (!connectionString) {
  console.error('❌ Error: DIRECT_URL tidak ditemukan di file .env');
  console.error('Pastikan file .env memiliki baris: DIRECT_URL="postgresql://..."');
  process.exit(1);
}

console.log('🔌 Connecting using DIRECT_URL (Port 5432)...');

// 2. Setup Driver Adapter
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Start seeding...');

  // 3. Create roles
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

  console.log(`✅ Roles created: ${adminRole.name}, ${employeeRole.name}`);

  // 4. Create a default admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashedPassword,
      roleId: adminRole.id,
      isActive: true,
    },
  });

  console.log(`✅ Admin user created: ${adminUser.email}`);

  // 5. Create an employee linked to the admin user
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
  
  console.log(`✅ Employee profile created for admin.`);
}

// 6. Execute
main()
  .catch((e) => {
    console.error('❌ Seeding Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('🏁 Disconnected.');
  });