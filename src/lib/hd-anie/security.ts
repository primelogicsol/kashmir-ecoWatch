// ─────────────────────────────────────────────────────────────────────────────
// HD-ANIE SECURITY, SSRF PROTECTION, ROBOTS COMPLIANCE & PROMPT-INJECTION GUARD
// Treats all external web content as untrusted data; blocks private/loopback IPs;
// enforces domain rate limits & robots.txt directives.
// ─────────────────────────────────────────────────────────────────────────────

import crypto from 'crypto';
import dns from 'dns';
import net from 'net';

const PRIVATE_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^0\./,
  /^10\./,
  /^172\.(1[6-9]|2[0-9]|3[0-1])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^100\.(6[4-9]|[7-9][0-9]|1[0-1][0-9]|12[0-7])\./,
  /^\[?::1\]?$/i,
  /^\[?::\]?$/i,
  /^\[?::ffff:/i,
  /^\[?fc00:/i,
  /^\[?fd[0-9a-f]{2}:/i,
  /^\[?fe80:/i,
  /^metadata\.google\.internal$/i,
  /\.local$/i,
  /\.internal$/i,
];

function isPrivateOrReservedIp(ip: string): boolean {
  const clean = ip.replace(/^\[|\]$/g, '').toLowerCase();
  if (PRIVATE_HOST_PATTERNS.some((rx) => rx.test(clean))) return true;
  if (net.isIPv4(clean)) {
    const parts = clean.split('.').map(Number);
    if (parts[0] === 0 || parts[0] === 10 || parts[0] === 127) return true;
    if (parts[0] === 169 && parts[1] === 254) return true;
    if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
    if (parts[0] === 192 && parts[1] === 168) return true;
    if (parts[0] >= 224) return true;
  }
  if (net.isIPv6(clean)) {
    if (clean === '::1' || clean === '::' || clean.startsWith('::ffff:') || clean.startsWith('fc') || clean.startsWith('fd') || clean.startsWith('fe80:')) {
      return true;
    }
  }
  return false;
}

const PROMPT_INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(all\s+)?(previous|prior|above)\s+(instructions|prompts|rules)/gi,
  /disregard\s+(all\s+)?(previous|system)\s+instructions/gi,
  /system\s*prompt\s*:/gi,
  /you\s+are\s+now\s+an?\s+/gi,
  /<\|im_start\|>|<\|im_end\|>|<\|system\|>|<\|endoftext\|>/gi,
  /\[INST\]|\[\/INST\]|<<SYS>>|<\/SYS>>/gi,
  /override\s+editorial\s+approval/gi,
  /auto[-\s]?publish\s+immediately/gi,
];

export const HD_ANIE_USER_AGENT =
  'HimalayanDispatch-KEW-EditorialResearch/1.0 (+https://dispatch.kashmir-ecowatch.com; non-commercial environmental research)';

const domainRobotsCache = new Map<
  string,
  { checkedAt: number; disallowedPrefixes: string[] }
>();
const domainLastFetchAt = new Map<string, number>();

export function validateExternalFetchUrl(rawUrl: string): {
  allowed: boolean;
  parsed?: URL;
  reason?: string;
} {
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return { allowed: false, reason: `Disallowed URL scheme: ${parsed.protocol}` };
    }
    const host = parsed.hostname.trim().toLowerCase();
    if (!host || PRIVATE_HOST_PATTERNS.some((rx) => rx.test(host)) || isPrivateOrReservedIp(host)) {
      return { allowed: false, reason: `Blocked private or loopback host: ${host}` };
    }
    if (/^\d+$/.test(host) || /^0x[0-9a-f]+$/i.test(host)) {
      return { allowed: false, reason: `Blocked non-canonical numeric IP encoding: ${host}` };
    }
    if (parsed.username || parsed.password) {
      return { allowed: false, reason: 'Embedded URL credentials are not permitted.' };
    }
    return { allowed: true, parsed };
  } catch {
    return { allowed: false, reason: 'Malformed URL.' };
  }
}

export function normalizeCanonicalSourceUrl(rawUrl: string): string {
  const check = validateExternalFetchUrl(rawUrl);
  if (!check.allowed || !check.parsed) return rawUrl.trim();
  const u = new URL(check.parsed.toString());
  u.hash = '';
  const dropParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'fbclid',
    'gclid',
    'mc_cid',
    'mc_eid',
    'ref',
  ];
  for (const p of dropParams) u.searchParams.delete(p);
  const s = u.toString();
  return s.endsWith('/') && u.pathname !== '/' ? s.slice(0, -1) : s;
}

export function computeUrlHash(url: string): string {
  return crypto.createHash('sha256').update(normalizeCanonicalSourceUrl(url)).digest('hex').slice(0, 20);
}

/**
 * Strips HTML tags, decodes common entities, neutralizes prompt-injection directives,
 * and bounds untrusted external text length.
 */
export function sanitizeUntrustedExternalText(
  raw: string | undefined | null,
  maxLength = 1600
): { cleaned: string; injectionNeutralized: boolean } {
  if (!raw) return { cleaned: '', injectionNeutralized: false };

  let text = String(raw)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&#(\d+);/g, (_, code) => {
      const n = Number(code);
      return n >= 32 && n <= 126 ? String.fromCharCode(n) : ' ';
    })
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ');

  let injectionNeutralized = false;
  for (const rx of PROMPT_INJECTION_PATTERNS) {
    if (rx.test(text)) {
      injectionNeutralized = true;
      text = text.replace(rx, '[REDACTED-UNTRUSTED-DIRECTIVE]');
    }
  }

  const cleaned = text.replace(/\s+/g, ' ').trim().slice(0, maxLength);
  return { cleaned, injectionNeutralized };
}

export async function isPermittedByRobotsTxt(targetUrl: string): Promise<boolean> {
  const check = validateExternalFetchUrl(targetUrl);
  if (!check.allowed || !check.parsed) return false;
  const origin = check.parsed.origin;
  const pathname = check.parsed.pathname || '/';

  // Open scientific/index APIs explicitly designed for programmatic access
  if (
    check.parsed.hostname.endsWith('openalex.org') ||
    check.parsed.hostname.endsWith('crossref.org') ||
    check.parsed.hostname.endsWith('gdeltproject.org')
  ) {
    return true;
  }

  const now = Date.now();
  const cached = domainRobotsCache.get(origin);
  let disallowed = cached?.disallowedPrefixes;

  if (!cached || now - cached.checkedAt > 6 * 60 * 60 * 1000) {
    disallowed = [];
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 3500);
      const res = await fetch(`${origin}/robots.txt`, {
        headers: { 'User-Agent': HD_ANIE_USER_AGENT },
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.ok) {
        const txt = await res.text();
        let appliesToWildcard = false;
        for (const rawLine of txt.split(/\r?\n/)) {
          const line = rawLine.split('#')[0].trim();
          if (!line) continue;
          const [k, ...rest] = line.split(':');
          const key = k.trim().toLowerCase();
          const val = rest.join(':').trim();
          if (key === 'user-agent') {
            appliesToWildcard = val === '*' || val.toLowerCase().includes('himalayandispatch');
          } else if (appliesToWildcard && key === 'disallow' && val) {
            disallowed.push(val);
          }
        }
      }
    } catch {
      // If robots.txt times out or 404s, standard RFC 9309 treats public feeds as permitted
    }
    domainRobotsCache.set(origin, { checkedAt: now, disallowedPrefixes: disallowed });
  }

  for (const prefix of disallowed || []) {
    if (prefix === '/') return false;
    if (prefix.length > 1 && pathname.startsWith(prefix)) {
      return false;
    }
  }
  return true;
}

export async function safePoliteFetch(
  rawUrl: string,
  options?: { timeoutMs?: number; minDomainSpacingMs?: number; accept?: string }
): Promise<{ ok: boolean; status: number; text: string; error?: string }> {
  const valid = validateExternalFetchUrl(rawUrl);
  if (!valid.allowed || !valid.parsed) {
    return { ok: false, status: 0, text: '', error: valid.reason || 'Invalid URL' };
  }

  const robotsOk = await isPermittedByRobotsTxt(rawUrl);
  if (!robotsOk) {
    return { ok: false, status: 403, text: '', error: 'Blocked by site robots.txt directive' };
  }

  const host = valid.parsed.hostname;
  const minGap = options?.minDomainSpacingMs ?? 600;
  const prev = domainLastFetchAt.get(host) || 0;
  const waitMs = prev + minGap - Date.now();
  if (waitMs > 0 && waitMs < 2500) {
    await new Promise((r) => setTimeout(r, waitMs));
  }
  domainLastFetchAt.set(host, Date.now());

  const controller = new AbortController();
  const timeoutMs = options?.timeoutMs ?? 8000;
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    // Resolve DNS prior to fetch and reject any hostname resolving to private/loopback/metadata IPs
    const resolved = await dns.promises.lookup(host, { all: true });
    if (!resolved.length || resolved.some((addr) => isPrivateOrReservedIp(addr.address))) {
      clearTimeout(timer);
      return { ok: false, status: 0, text: '', error: 'Blocked by SSRF DNS resolution guard' };
    }

    let currentUrl = valid.parsed.toString();
    let res: Response | null = null;
    for (let hop = 0; hop < 3; hop++) {
      res = await fetch(currentUrl, {
        method: 'GET',
        redirect: 'manual',
        headers: {
          'User-Agent': HD_ANIE_USER_AGENT,
          Accept:
            options?.accept ||
            'application/rss+xml, application/atom+xml, application/xml, application/json, text/xml;q=0.9, */*;q=0.5',
        },
        signal: controller.signal,
      });

      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get('location');
        if (!location) {
          clearTimeout(timer);
          return { ok: false, status: res.status, text: '', error: 'Redirect missing Location header' };
        }
        const nextUrl = new URL(location, currentUrl).toString();
        const nextCheck = validateExternalFetchUrl(nextUrl);
        if (!nextCheck.allowed || !nextCheck.parsed) {
          clearTimeout(timer);
          return { ok: false, status: 403, text: '', error: `Blocked redirect target: ${nextCheck.reason}` };
        }
        const hopIps = await dns.promises.lookup(nextCheck.parsed.hostname, { all: true });
        if (!hopIps.length || hopIps.some((addr) => isPrivateOrReservedIp(addr.address))) {
          clearTimeout(timer);
          return { ok: false, status: 403, text: '', error: 'Blocked redirect to private IP' };
        }
        currentUrl = nextCheck.parsed.toString();
        continue;
      }
      break;
    }
    clearTimeout(timer);
    if (!res) {
      return { ok: false, status: 0, text: '', error: 'Empty fetch response' };
    }

    if (!res.ok) {
      return { ok: false, status: res.status, text: '', error: `HTTP ${res.status}` };
    }

    // Cap body read to 1.5 MB to prevent memory exhaustion on oversized feeds
    const buf = await res.arrayBuffer();
    const sliced = buf.byteLength > 1_500_000 ? buf.slice(0, 1_500_000) : buf;
    const text = new TextDecoder('utf-8', { fatal: false }).decode(sliced);
    return { ok: true, status: res.status, text };
  } catch (err: unknown) {
    clearTimeout(timer);
    const msg = err instanceof Error ? err.message : 'Network fetch error';
    return { ok: false, status: 0, text: '', error: msg };
  }
}
