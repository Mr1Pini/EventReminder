import { defineConfig } from "prisma/config";

// Prisma CLI сам не читає .env, тому підвантажуємо його вручну
process.loadEnvFile();

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
