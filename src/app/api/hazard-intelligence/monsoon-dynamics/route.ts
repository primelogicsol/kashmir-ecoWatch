import { NextResponse } from 'next/server';
import { buildMonsoonDynamicsPayload } from '@/lib/engines/monsoon-dynamics-engine';
import { allowForcedUpstreamRefresh } from '@/lib/seo/admin-session';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawForceRefresh = searchParams.get('refresh') === '1';
  const forceRefresh =
    rawForceRefresh && allowForcedUpstreamRefresh(request, 'monsoon-dynamics', 60_000);
  const res = await buildMonsoonDynamicsPayload({ forceRefresh });
  return NextResponse.json(res.body, { status: res.httpStatus });
}
