import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgres://postgres:password@localhost:5432/kashmir_ecowatch';
const ingestionConnectionString = process.env.INGESTION_DB_URL || connectionString;

// Cached pool for database queries across Next.js server actions and API routes
export const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30000,
});

export const ingestionPool = new Pool({
  connectionString: ingestionConnectionString,
  max: 5,
  idleTimeoutMillis: 30000,
});

export function getApiDb() {
  return pool;
}

export function getIngestionDb() {
  return ingestionPool;
}

export default pool;
