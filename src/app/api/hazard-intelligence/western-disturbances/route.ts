import { NextResponse } from 'next/server';
import { buildWesternDisturbancesPayload } from '@/lib/engines/western-disturbances-engine';
import { allowForcedUpstreamRefresh } from '@/lib/seo/admin-session';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawForceRefresh = searchParams.get('refresh') === '1';
  const forceRefresh =
    rawForceRefresh && allowForcedUpstreamRefresh(request, 'western-disturbances', 60_000);
  const res = await buildWesternDisturbancesPayload({ forceRefresh });
  return NextResponse.json(res.body, { status: res.httpStatus });
}
