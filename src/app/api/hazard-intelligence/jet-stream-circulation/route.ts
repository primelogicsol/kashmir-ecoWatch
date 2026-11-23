import { NextResponse } from 'next/server';
import { buildJetStreamPayload } from '@/lib/engines/jet-stream-engine';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get('refresh') === '1';
  const res = await buildJetStreamPayload({ forceRefresh });
  return NextResponse.json(res.body, { status: res.httpStatus });
}
