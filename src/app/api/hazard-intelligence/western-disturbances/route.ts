import { NextResponse } from 'next/server';
import { buildWesternDisturbancesPayload } from '@/lib/engines/western-disturbances-engine';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get('refresh') === '1';
  const res = await buildWesternDisturbancesPayload({ forceRefresh });
  return NextResponse.json(res.body, { status: res.httpStatus });
}
