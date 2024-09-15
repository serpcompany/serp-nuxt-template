// server/utils/drizzle.ts
import * as schema from '~/server/database/schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL environment variable is not set');
}

export const client = postgres(connectionString);
export const db = drizzle(client, { schema: schema });
