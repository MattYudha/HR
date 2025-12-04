// prisma.config.ts
import 'dotenv/config';
import path from 'node:path';
import { defineConfig, env } from 'prisma/config';

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),

  // PAKAI POOLER UNTUK DB PULL (karena ini yang terbukti bisa connect di rumah)
  datasource: {
    url: env('DATABASE_URL'),
  },

  migrations: {
    path: path.join('prisma', 'migrations'),
    // kalau mau, nanti bisa tambahkan:
    // seed: 'ts-node prisma/seed.ts',
  },
});
