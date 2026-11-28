import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { auth } from '@/auth';

export const ADMIN_SESSION_COOKIE = 'kew_admin_session';

// SHA-256 digests of retired/compromised legacy fallback literals & .env.example placeholders
const COMPROMISED_OR_PLACEHOLDER_SECRET_DIGESTS = new Set([
  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855', // empty
  'fd50a0c4e0f20ef554e9858d22d57c3cc7b405f97d318d8a812ea3d4cc51535c', // legacy admin passcode
  '4c7036d219cf9f689e923134bf5fb44267df4b2a9d2224d0759eb486ef025008', // legacy admin hmac fallback
  '5f826eb461db7a6c27dc11216cd9959ab149e08d910fb53978a6a0267f1280bc', // legacy nextauth fallback
  '8343d708046eb6ea23c37f929b8a1b43a8670c29e3776074e6c70515206cd8c1', // legacy hall hmac fallback
  'bd7e687eb5e65e41d911035d6c3d018f710d669fa356b1775c8122f9396d544c', // legacy masthead code
  '852f24d435a2d6b6d3cb1a158eb69923f85159843b8c04d01760b9328a01417d', // legacy reviewer code
]);

const PLACEHOLDER_SUBSTRINGS = [
  'your-secure-256-bit-key',
  'replace-with-',
  'replace_with_',
  'changeme',
  'password',
];

export function isConfiguredSafeSecret(value?: string | null, minLength = 12): value is string {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (trimmed.length < minLength) return false;
  const lower = trimmed.toLowerCase();
  if (PLACEHOLDER_SUBSTRINGS.some((s) => lower.includes(s))) return false;
  const digest = crypto.createHash('sha256').update(lower, 'utf8').digest('hex');
  if (COMPROMISED_OR_PLACEHOLDER_SECRET_DIGESTS.has(digest)) return false;
  return true;
}

export function timingSafeSecretMatch(provided?: string | null, expected?: string | null, minLength = 12): boolean {
  if (!provided || !isConfiguredSafeSecret(expected, minLength)) return false;
  const a = crypto.createHash('sha256').update(String(provided), 'utf8').digest();
  const b = crypto.createHash('sha256').update(String(expected).trim(), 'utf8').digest();
  return crypto.timingSafeEqual(a, b);
}

declare global {
  // eslint-disable-next-line no-var
  var __kewRuntimeEphemeralSecret: Buffer | undefined;
  // eslint-disable-next-line no-var
  var __kewAuthRateLimitStore: Map<string, { count: number; resetAt: number }> | undefined;
  // eslint-disable-next-line no-var
  var __kewUpstreamRefreshCooldown: Map<string, number> | undefined;
}

function getMasterRuntimeSecret(): Buffer | null {
  const configured = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET;
  if (isConfiguredSafeSecret(configured, 16)) {
    return Buffer.from(configured.trim(), 'utf8');
  }
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  if (!globalThis.__kewRuntimeEphemeralSecret) {
    globalThis.__kewRuntimeEphemeralSecret = crypto.randomBytes(32);
  }
  return globalThis.__kewRuntimeEphemeralSecret;
}

/**
 * Derives a domain-separated v2 HMAC key from AUTH_SECRET / NEXTAUTH_SECRET
 * (or a per-process random ephemeral key in local development only).
 * Never falls back to CRON_SECRET or static source-code literals.
 */
export function getDomainSigningSecret(domain: string): string {
  const master = getMasterRuntimeSecret();
  if (!master) {
    // Fail-closed in production when AUTH_SECRET is unconfigured:
    // generates a random per-call key when verifying so no forged token can match,
    // and throws if attempting to mint sessions without AUTH_SECRET.
    return crypto.randomBytes(32).toString('hex');
  }
  return crypto
    .createHmac('sha256', master)
    .update(`kew-hmac-domain:${domain}:v2`, 'utf8')
    .digest('hex');
}

export function verifyAdminPasscode(provided?: string | null): {
  valid: boolean;
  configured: boolean;
} {
  const expected = process.env.ADMIN_PASSCODE;
  const configured = isConfiguredSafeSecret(expected, 10);
  if (!configured) {
    return { valid: false, configured: false };
  }
  return {
    valid: timingSafeSecretMatch(provided?.trim(), expected, 10),
    configured: true,
  };
}

export function verifyWebinarAdminPasscode(provided?: string | null): {
  valid: boolean;
  configured: boolean;
} {
  const expected = process.env.WEBINAR_ADMIN_PASSCODE || process.env.ADMIN_PASSCODE;
  const configured = isConfiguredSafeSecret(expected, 10);
  if (!configured) {
    return { valid: false, configured: false };
  }
  return {
    valid: timingSafeSecretMatch(provided?.trim(), expected, 10),
    configured: true,
  };
}

export function getRequestClientIp(request: Request | NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim().slice(0, 64) || 'unknown';
  }
  return request.headers.get('x-real-ip')?.trim().slice(0, 64) || 'local';
}

export function checkAuthRateLimit(
  request: Request | NextRequest,
  bucket = 'admin-auth',
  maxAttempts = 10,
  windowMs = 15 * 60 * 1000
): { allowed: boolean; retryAfterSeconds: number } {
  if (!globalThis.__kewAuthRateLimitStore) {
    globalThis.__kewAuthRateLimitStore = new Map();
  }
  const store = globalThis.__kewAuthRateLimitStore;
  const now = Date.now();
  const key = `${bucket}:${getRequestClientIp(request)}`;
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  entry.count += 1;
  if (entry.count > maxAttempts) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)),
    };
  }
  return { allowed: true, retryAfterSeconds: 0 };
}

/**
 * Guards ?refresh=1 cache-busting on upstream scientific APIs so unauthenticated
 * loops cannot exhaust Open-Meteo / USGS rate limits.
 */
export function allowForcedUpstreamRefresh(
  request: Request | NextRequest,
  endpointKey: string,
  minCooldownMs = 60_000
): boolean {
  if (!globalThis.__kewUpstreamRefreshCooldown) {
    globalThis.__kewUpstreamRefreshCooldown = new Map();
  }
  const store = globalThis.__kewUpstreamRefreshCooldown;
  const now = Date.now();
  const lastGlobal = store.get(`global:${endpointKey}`) || 0;
  if (now - lastGlobal < minCooldownMs) {
    return false;
  }
  const ipKey = `ip:${endpointKey}:${getRequestClientIp(request)}`;
  const lastIp = store.get(ipKey) || 0;
  if (now - lastIp < minCooldownMs) {
    return false;
  }
  store.set(`global:${endpointKey}`, now);
  store.set(ipKey, now);
  return true;
}

export interface AdminSessionClaims {
  v: 2;
  actor: string;
  role: 'administrator';
  iat: number;
  exp: number;
}

export function signAdminSessionToken(actor: string, ttlSeconds = 12 * 60 * 60): string {
  if (!getMasterRuntimeSecret()) {
    throw new Error('AUTH_SECRET must be configured in production to issue administrator sessions.');
  }
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSessionClaims = {
    v: 2,
    actor,
    role: 'administrator',
    iat: now,
    exp: now + ttlSeconds,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const sig = crypto
    .createHmac('sha256', getDomainSigningSecret('admin-session'))
    .update(encoded)
    .digest('base64url');
  return `kew_adm2.${encoded}.${sig}`;
}

export function verifyAdminSessionToken(token?: string | null): AdminSessionClaims | null {
  if (!token || !token.startsWith('kew_adm2.')) return null;
  if (!getMasterRuntimeSecret()) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [, encoded, providedSig] = parts;
  if (!encoded || !providedSig) return null;

  const expectedSig = crypto
    .createHmac('sha256', getDomainSigningSecret('admin-session'))
    .update(encoded)
    .digest('base64url');

  const a = Buffer.from(providedSig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as AdminSessionClaims;
    if (parsed.v !== 2 || parsed.role !== 'administrator') return null;
    if (!parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) return null;
    return parsed;
  } catch {
    return null;
  }
}

function extractCookieFromHeader(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(';')) {
    const [k, ...rest] = part.trim().split('=');
    if (k === name) {
      return decodeURIComponent(rest.join('='));
    }
  }
  return null;
}

/**
 * Enforces server-side administrative authentication & RBAC via:
 * 1) v2 HMAC-signed HttpOnly cookie `kew_admin_session`, OR
 * 2) Dedicated `ADMIN_API_KEY` server-to-server Bearer token (strictly decoupled from CRON_SECRET), OR
 * 3) Verified NextAuth session matching an explicit ADMIN_EMAILS allowlist.
 */
export async function verifyAdminRequest(
  request: Request | NextRequest
): Promise<{ authorized: boolean; actor: string; method: string }> {
  const cookieVal =
    'cookies' in request && typeof request.cookies?.get === 'function'
      ? request.cookies.get(ADMIN_SESSION_COOKIE)?.value
      : extractCookieFromHeader(request.headers.get('cookie'), ADMIN_SESSION_COOKIE);

  const cookieClaims = verifyAdminSessionToken(cookieVal);
  if (cookieClaims) {
    return {
      authorized: true,
      actor: cookieClaims.actor,
      method: 'signed_httponly_cookie_v2',
    };
  }

  const authHeader = request.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (timingSafeSecretMatch(token, process.env.ADMIN_API_KEY, 16)) {
      return {
        authorized: true,
        actor: 'KEW Automated CLI Verifier',
        method: 'admin_api_bearer_key',
      };
    }
  }

  try {
    const session = await auth();
    const email = session?.user?.email?.toLowerCase() || '';
    const allowedEmails = (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    if (email && allowedEmails.includes(email)) {
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

/**
 * Dedicated authentication check for scheduled ingestion / telemetry pipelines.
 * Accepts non-placeholder INGEST_API_KEY or CRON_SECRET Bearer tokens, or an active Admin session.
 */
export async function verifyCronOrIngestRequest(
  request: Request | NextRequest
): Promise<{ authorized: boolean; actor: string; method: string }> {
  const authHeader = request.headers.get('authorization') || '';
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (timingSafeSecretMatch(token, process.env.INGEST_API_KEY, 16)) {
      return { authorized: true, actor: 'KEW Telemetry Ingestion Worker', method: 'ingest_api_key' };
    }
    if (timingSafeSecretMatch(token, process.env.CRON_SECRET, 16)) {
      return { authorized: true, actor: 'KEW Scheduled Cron Runner', method: 'cron_secret' };
    }
  }
  return verifyAdminRequest(request);
}
