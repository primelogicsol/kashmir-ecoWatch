import { NextResponse } from 'next/server';
import { getApiDb, getIngestionDb } from '@/lib/db';

export const dynamic = 'force-dynamic'; // Ensure this route is never cached
export const runtime = 'nodejs'; // Explicitly require Node.js runtime for 'pg' driver

export async function GET() {
  const startTime = performance.now();
  
  const status = {
    apiDb: 'disconnected',
    ingestionDb: 'disconnected',
    latencyMs: 0,
    error: null as string | null,
    timestamp: new Date().toISOString(),
  };

  try {
    // Check Readonly API Connection
    const apiDb = getApiDb();
    const apiResult = await apiDb.query('SELECT 1 AS ok');
    if (apiResult.rows[0].ok === 1) {
      status.apiDb = 'connected';
    }

    // Check Ingestion Worker Connection
    const ingestionDb = getIngestionDb();
    const ingestionResult = await ingestionDb.query('SELECT 1 AS ok');
    if (ingestionResult.rows[0].ok === 1) {
      status.ingestionDb = 'connected';
    }

    status.latencyMs = Math.round(performance.now() - startTime);
    return NextResponse.json(status, { status: 200 });
  } catch (err: any) {
    status.latencyMs = Math.round(performance.now() - startTime);
    status.error = err.message || 'Unknown database error';
    return NextResponse.json(status, { status: 500 });
  }
}
