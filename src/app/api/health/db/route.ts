import { NextResponse } from 'next/server';
import { getApiDb, getIngestionDb } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const startTime = performance.now();

  const status = {
    apiDb: 'disconnected' as 'connected' | 'disconnected',
    ingestionDb: 'disconnected' as 'connected' | 'disconnected',
    latencyMs: 0,
    error: null as string | null,
    ingestionNote: null as string | null,
    timestamp: new Date().toISOString(),
  };

  try {
    const apiDb = getApiDb();
    const apiResult = await apiDb.query('SELECT 1 AS ok');
    if (apiResult.rows[0]?.ok === 1) {
      status.apiDb = 'connected';
    }
  } catch (err: any) {
    status.error = err.message || 'Primary API database connection error';
  }

  try {
    const ingestionDb = getIngestionDb();
    const ingestionResult = await ingestionDb.query('SELECT 1 AS ok');
    if (ingestionResult.rows[0]?.ok === 1) {
      status.ingestionDb = 'connected';
    }
  } catch (err: any) {
    status.ingestionNote = err.message || 'Ingestion worker role not active';
  }

  status.latencyMs = Math.round(performance.now() - startTime);
  const httpStatus = status.apiDb === 'connected' ? 200 : 503;
  return NextResponse.json(status, { status: httpStatus });
}
