import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  checkAuthRateLimit,
  signAdminSessionToken,
  verifyAdminPasscode,
  verifyAdminRequest,
} from '@/lib/seo/admin-session';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const res = await verifyAdminRequest(request);
  return NextResponse.json({
    authenticated: res.authorized,
    role: res.authorized ? 'administrator' : 'guest',
    actor: res.authorized ? res.actor : null,
    method: res.method,
  });
}

export async function POST(request: NextRequest) {
  const rate = checkAuthRateLimit(request, 'admin-session-login', 10, 15 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      { authenticated: false, error: 'Too many authentication attempts. Please retry later.' },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } }
    );
  }

  const body = await request.json().catch(() => ({}));
  const passcode = typeof body.passcode === 'string' ? body.passcode.trim() : '';
  const actor =
    typeof body.actor === 'string' && body.actor.trim()
      ? body.actor.trim().slice(0, 80)
      : 'KEW Administrator';

  const check = verifyAdminPasscode(passcode);
  if (!check.configured) {
    return NextResponse.json(
      {
        authenticated: false,
        error:
          'Administrator passcode authentication is disabled until a strong ADMIN_PASSCODE environment secret is configured on the server.',
      },
      { status: 503 }
    );
  }
  if (!check.valid) {
    return NextResponse.json(
      { authenticated: false, error: 'Invalid administrator credentials' },
      { status: 401 }
    );
  }

  let token: string;
  try {
    token = signAdminSessionToken(actor);
  } catch {
    return NextResponse.json(
      {
        authenticated: false,
        error: 'Server session signing secret (AUTH_SECRET) is not configured.',
      },
      { status: 503 }
    );
  }

  const response = NextResponse.json({
    authenticated: true,
    role: 'administrator',
    actor,
  });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 12 * 60 * 60,
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return response;
}
