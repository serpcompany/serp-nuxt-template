import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'postgres',
    schema: './server/database/schema.ts',
    out: './server/database/migrations'
});