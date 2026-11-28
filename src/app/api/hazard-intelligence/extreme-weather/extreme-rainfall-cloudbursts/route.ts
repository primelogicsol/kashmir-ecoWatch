import { NextResponse } from 'next/server';
import { buildExtremeRainfallPayload } from '@/lib/engines/extreme-rainfall-engine';
import { allowForcedUpstreamRefresh } from '@/lib/seo/admin-session';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawForceRefresh = searchParams.get('refresh') === '1';
  const forceRefresh =
    rawForceRefresh && allowForcedUpstreamRefresh(request, 'extreme-rainfall-cloudbursts', 60_000);
  const res = await buildExtremeRainfallPayload({ forceRefresh });
  return NextResponse.json(res.body, { status: res.httpStatus });
}
