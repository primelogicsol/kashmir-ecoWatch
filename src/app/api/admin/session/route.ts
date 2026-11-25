import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  signAdminSessionToken,
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
  const body = await request.json().catch(() => ({}));
  const passcode = typeof body.passcode === 'string' ? body.passcode.trim() : '';
  const actor = typeof body.actor === 'string' && body.actor.trim() ? body.actor.trim() : 'KEW Administrator';

  const expectedPasscode = process.env.ADMIN_PASSCODE || 'KEW-Admin-2026!';
  if (!passcode || passcode !== expectedPasscode) {
    return NextResponse.json(
      { authenticated: false, error: 'Invalid administrator credentials' },
      { status: 401 }
    );
  }

  const token = signAdminSessionToken(actor);
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
