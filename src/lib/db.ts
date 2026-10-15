import { Pool } from 'pg';

// ==========================================
// DB Connection Configurations
// ==========================================

// Global is used here to maintain a cached connection pool across hot reloads in development
let apiPool: Pool | undefined;
let ingestionPool: Pool | undefined;

/**
 * Returns a connection pool configured for Read-Only API queries.
 * Uses PgBouncer/Connection Pooling URL (`DATABASE_URL`).
 */
export function getApiDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
  }
  
  if (!apiPool) {
    apiPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: process.env.DB_API_POOL_MAX ? parseInt(process.env.DB_API_POOL_MAX) : 5, // Conservative default
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return apiPool;
}

/**
 * Returns a connection pool configured for the Ingestion Worker.
 * Used exclusively by internal cron jobs to INSERT data.
 */
export function getIngestionDb() {
  if (!process.env.INGESTION_DB_URL) {
    throw new Error('INGESTION_DB_URL is not defined in environment variables');
  }

  if (!ingestionPool) {
    ingestionPool = new Pool({
      connectionString: process.env.INGESTION_DB_URL,
      max: process.env.DB_INGESTION_POOL_MAX ? parseInt(process.env.DB_INGESTION_POOL_MAX) : 3, // Conservative default
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return ingestionPool;
}

// Graceful shutdown
process.on('SIGTERM', () => {
  apiPool?.end();
  ingestionPool?.end();
});
