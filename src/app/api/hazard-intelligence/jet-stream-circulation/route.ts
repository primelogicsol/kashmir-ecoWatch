import { NextResponse } from 'next/server';
import { buildJetStreamPayload } from '@/lib/engines/jet-stream-engine';
import { allowForcedUpstreamRefresh } from '@/lib/seo/admin-session';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawForceRefresh = searchParams.get('refresh') === '1';
  const forceRefresh =
    rawForceRefresh && allowForcedUpstreamRefresh(request, 'jet-stream-circulation', 60_000);
  const res = await buildJetStreamPayload({ forceRefresh });
  return NextResponse.json(res.body, { status: res.httpStatus });
}
