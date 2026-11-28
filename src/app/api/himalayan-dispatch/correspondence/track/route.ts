import { NextRequest, NextResponse } from 'next/server';
import { checkAuthRateLimit } from '@/lib/seo/admin-session';
import { getCookieDomainConfig } from '@/lib/hdn/rbac';
import {
  authenticateCorrespondenceThread,
  CORRESPONDENCE_THREAD_COOKIE,
  isKewEnvironmentalTrackingCode,
  signThreadAccessToken,
} from '@/lib/himalayan-dispatch-correspondence';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};

export async function POST(request: NextRequest) {
  const rate = checkAuthRateLimit(request, 'hd-correspondence-track', 10, 15 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Too many authentication attempts. Please wait ${rate.retryAfterSeconds} seconds.`,
      },
      { status: 429, headers: NO_STORE_HEADERS }
    );
  }

  try {
    const body = await request.json();
    const referenceNumber = String(body?.referenceNumber || '').trim().toUpperCase();
    const accessCredential = String(body?.accessCredential || '').trim();

    if (isKewEnvironmentalTrackingCode(referenceNumber)) {
      return NextResponse.json(
        {
          success: false,
          isKewEnvironmentalReference: true,
          kewTrackingId: referenceNumber,
          error:
            'This reference belongs to a Kashmir EcoWatch environmental submission. Environmental submissions remain tracked through the existing KEW participation infrastructure rather than duplicating records in Himalayan Dispatch.',
        },
        { status: 400, headers: NO_STORE_HEADERS }
      );
    }

    const auth = await authenticateCorrespondenceThread(referenceNumber, accessCredential);
    if (!auth.ok) {
      return NextResponse.json(
        { success: false, error: auth.error },
        { status: auth.status, headers: NO_STORE_HEADERS }
      );
    }

    const token = signThreadAccessToken(auth.referenceNumber);
    const response = NextResponse.json(
      {
        success: true,
        referenceNumber: auth.referenceNumber,
      },
      { headers: NO_STORE_HEADERS }
    );

    response.cookies.set({
      name: CORRESPONDENCE_THREAD_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 2 * 60 * 60,
      ...getCookieDomainConfig(),
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to verify correspondence credentials.' },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true }, { headers: NO_STORE_HEADERS });
  response.cookies.set({
    name: CORRESPONDENCE_THREAD_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
    ...getCookieDomainConfig(),
  });
  return response;
}
