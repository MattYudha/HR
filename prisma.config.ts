import { defineConfig } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',

  datasource: {
    db: {
      provider: 'postgresql',
      url: process.env.DATABASE_URL!,
    },
  },

  generators: {
    client: {
      provider: 'prisma-client-js',
    },
  },
});
