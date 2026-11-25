import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { auth } from '@/auth';

export const ADMIN_SESSION_COOKIE = 'kew_admin_session';

function getSigningSecret(): string {
  return (
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    process.env.CRON_SECRET ||
    'kew-admin-hmac-signing-fallback'
  );
}

export interface AdminSessionClaims {
  actor: string;
  role: 'administrator';
  iat: number;
  exp: number;
}

export function signAdminSessionToken(actor: string, ttlSeconds = 12 * 60 * 60): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionClaims = {
    actor,
    role: 'administrator',
    iat: now,
    exp: now + ttlSeconds,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const sig = crypto
    .createHmac('sha256', getSigningSecret())
    .update(encoded)
    .digest('base64url');
  return `${encoded}.${sig}`;
}

export function verifyAdminSessionToken(token?: string | null): AdminSessionClaims | null {
  if (!token || !token.includes('.')) return null;
  const [encoded, providedSig] = token.split('.', 2);
  if (!encoded || !providedSig) return null;

  const expectedSig = crypto
    .createHmac('sha256', getSigningSecret())
    .update(encoded)
    .digest('base64url');

  const a = Buffer.from(providedSig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as AdminSessionClaims;
    if (parsed.role !== 'administrator') return null;
    if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Enforces server-side administrative authentication & RBAC via:
 * 1) HMAC-signed HttpOnly cookie `kew_admin_session`, OR
 * 2) Verified NextAuth session matching an authorized administrator email, OR
 * 3) Server-to-server Bearer token (`CRON_SECRET` / `ADMIN_API_KEY`).
 */
export async function verifyAdminRequest(
  request: NextRequest
): Promise<{ authorized: boolean; actor: string; method: string }> {
  // 1. Check signed HttpOnly admin cookie
  const cookieVal = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const cookieClaims = verifyAdminSessionToken(cookieVal);
  if (cookieClaims) {
    return {
      authorized: true,
      actor: cookieClaims.actor,
      method: 'signed_httponly_cookie',
    };
  }

  // 2. Check server-to-server Authorization Bearer secret (for CLI / CI verification)
  const authHeader = request.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    const validServerSecret =
      (process.env.ADMIN_API_KEY && token === process.env.ADMIN_API_KEY) ||
      (process.env.CRON_SECRET && token === process.env.CRON_SECRET);
    if (validServerSecret) {
      return {
        authorized: true,
        actor: 'KEW Automated CLI Verifier',
        method: 'server_bearer_secret',
      };
    }
  }

  // 3. Check NextAuth session with administrator email allowlist
  try {
    const session = await auth();
    const email = session?.user?.email?.toLowerCase() || '';
    const allowedEmails = (process.env.ADMIN_EMAILS || 'fayaz@kashmir-ecowatch.com,contact@kashmir-ecowatch.com')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    if (email && (email.endsWith('@kashmir-ecowatch.com') || allowedEmails.includes(email))) {
      return {
        authorized: true,
        actor: email,
        method: 'nextauth_admin_session',
      };
    }
  } catch {
    // NextAuth not active on request
  }

  return { authorized: false, actor: 'anonymous', method: 'none' };
}
