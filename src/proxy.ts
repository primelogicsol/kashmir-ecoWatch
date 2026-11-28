import { NextRequest, NextResponse } from 'next/server';
import { DAILY_DISPATCH_ARTICLES } from '@/data/himalayan-dispatch-autonomous';
import {
  ALLOWED_DISPATCH_ROOT_SEGMENTS,
  CANONICAL_DISPATCH_URL,
  CANONICAL_KEW_PLATFORM_URL,
  HD_LEGACY_PREFIX,
  isDispatchHostname,
  resolveLegacyDeptQueryToSlug,
  stripDispatchPrefix,
  toInternalDispatchPath,
} from '@/lib/himalayan-dispatch-routes';

const VALID_BUREAU_SLUGS = new Set<string>([
  'kashmir',
  'jammu',
  'ladakh',
  'ajk',
  'gilgit',
  'baltistan',
]);

const DAILY_DISPATCH_SLUG_SET = new Set<string>(
  DAILY_DISPATCH_ARTICLES.map((d) => d.slug)
);

const NO_INDEX_DISPATCH_SEGMENTS = new Set<string>([
  'newsroom',
  'editorial-cms',
  'journalist-sign-in',
  'pitch',
]);

/**
 * Canonical KEW platform root segments that should 308-redirect to `https://kashmir-ecowatch.com`
 * if accidentally requested on `dispatch.kashmir-ecowatch.com`, preventing cross-host 404s.
 */
const KNOWN_KEW_PLATFORM_ROOT_SEGMENTS = new Set<string>([
  'about',
  'accessibility',
  'alert-archive',
  'alerts',
  'atlas',
  'biodiversity',
  'citizen-science',
  'contribute',
  'contribute-data',
  'contribute-guidelines',
  'districts',
  'earth-human-impact',
  'ecovoices',
  'entity-explorer',
  'environmental-calendar',
  'environmental-investigations',
  'environmental-monitoring',
  'field-reports',
  'founder',
  'governance',
  'hazard-intelligence',
  'investigations',
  'join-citizen-science',
  'leadership',
  'legal-notice',
  'library',
  'live-incident-map',
  'methodology',
  'module-directory',
  'ngo-impact',
  'open-data',
  'privacy',
  'protected-areas',
  'protected-network',
  'report-issue',
  'research-library',
  'resources',
  'risk-monitoring',
  'risk-updates',
  'search',
  'seasonal-ecology',
  'sectoral-eia',
  'submit-observation',
  'terms',
  'trails-sightings',
  'water-systems',
  'webinars',
]);

/**
 * Permanent alias & legacy route redirects on the main KEW platform.
 */
const KEW_CANONICAL_ALIAS_REDIRECTS: Record<string, string> = {
  '/methodology': '/environmental-investigations/methodology',
  '/founder': '/about/founder',
  '/leadership': '/governance',
  '/investigations': '/environmental-investigations',
  '/regional-profiles': '/districts',
  '/environmental-resilience': '/environmental-monitoring/environmental-resilience',
  '/sdg': '/environmental-monitoring/sdg-monitoring',
  '/biodiversity/wetlands': '/water-systems/wetlands',
  '/water-systems/algal-bloom-intelligence': '/hazard-intelligence/algal-bloom-intelligence',
  '/gis-mapping': '/atlas',
  '/change-detection': '/earth-human-impact/change-detection-observatory',
  '/risk-monitoring/pollution-stress': '/environmental-monitoring',
  '/risk-monitoring/live-alerts': '/risk-monitoring/live-alerts-advisories',
  '/risk-monitoring/early-warning': '/risk-monitoring/live-alerts-advisories',
  '/risk-monitoring/response-operations': '/risk-monitoring',
};

function extractHostOnly(rawHost: string): string {
  return rawHost.split(',')[0]?.trim().toLowerCase().replace(/:\d+$/, '') || '';
}

function isLocalhostHost(rawHost: string): boolean {
  const hostOnly = extractHostOnly(rawHost);
  return (
    hostOnly === 'localhost' ||
    hostOnly === '127.0.0.1' ||
    hostOnly === '[::1]' ||
    hostOnly === '::1'
  );
}

/**
 * Legacy production redirects (`https://kashmir-ecowatch.com/himalayan-dispatch/*`
 * -> `https://dispatch.kashmir-ecowatch.com/*`) are activated ONLY when:
 *   1. The request is NOT on localhost, AND
 *   2. `Host` is `kashmir-ecowatch.com` / `www.kashmir-ecowatch.com`, AND
 *   3. `DISPATCH_LEGACY_REDIRECTS_ENABLED === 'true'` (flipped after production subdomain verification).
 */
function shouldRedirectLegacyKewDomainToSubdomain(rawHost: string): boolean {
  if (isLocalhostHost(rawHost)) return false;
  const hostOnly = extractHostOnly(rawHost);
  const isProdKewDomain =
    hostOnly === 'kashmir-ecowatch.com' || hostOnly === 'www.kashmir-ecowatch.com';
  return isProdKewDomain && process.env.DISPATCH_LEGACY_REDIRECTS_ENABLED === 'true';
}

function resolveLegacyDispatchSubpath(
  subpath: string,
  searchParams: URLSearchParams
): string | null {
  if (subpath === '/bureaus') {
    const bureau = searchParams.get('bureau')?.trim().toLowerCase();
    if (bureau && VALID_BUREAU_SLUGS.has(bureau)) {
      return `/bureaus/${bureau}`;
    }
  }

  if (subpath === '/departments') {
    const dept = searchParams.get('dept');
    if (dept) {
      const resolved = resolveLegacyDeptQueryToSlug(dept);
      if (resolved) {
        return `/departments/${resolved}`;
      }
    }
  }

  if (subpath === '/join-newsroom') {
    const track = searchParams.get('track')?.trim().toLowerCase();
    if (track === 'correspondent') {
      return '/correspondent-applications';
    }
  }

  if (subpath.startsWith('/stories/')) {
    const slug = subpath.slice('/stories/'.length).replace(/\/+$/, '');
    if (slug && !slug.includes('/')) {
      if (DAILY_DISPATCH_SLUG_SET.has(slug)) {
        return `/daily-dispatch/${slug}`;
      }
      if (
        slug === 'notes-from-the-upper-jhelum' ||
        slug === 'notes-from-the-upper-jhelum-headwaters'
      ) {
        return '/issues/monograph-00-watershed-voices/notes-from-the-upper-jhelum-headwaters';
      }
      if (slug === 'who-speaks-for-the-environment-when-politics-chooses-the-landscape') {
        return '/issues/volume-01-issue-01/selective-environmental-consciousness';
      }
      return `/issues/volume-01-issue-01/${slug}`;
    }
  }

  if (
    subpath ===
    '/issues/volume-01-issue-01/who-speaks-for-the-environment-when-politics-chooses-the-landscape'
  ) {
    return '/issues/volume-01-issue-01/selective-environmental-consciousness';
  }

  if (subpath.startsWith('/editions/')) {
    const slug = subpath.slice('/editions/'.length).replace(/\/+$/, '');
    if (slug && !slug.includes('/')) {
      if (slug === 'vol-01-no-01' || slug === 'volume-01-issue-01') {
        return '/issues/volume-01-issue-01';
      }
      if (slug === 'issue-02-a-world-in-transition') {
        return '/forthcoming';
      }
      return `/issues/${slug}`;
    }
  }

  if (subpath === '/issues/vol-01-no-01') {
    return '/issues/volume-01-issue-01';
  }
  if (subpath.startsWith('/issues/vol-01-no-01/')) {
    const articleSlug = subpath.slice('/issues/vol-01-no-01/'.length).replace(/\/+$/, '');
    if (articleSlug && !articleSlug.includes('/')) {
      return `/issues/volume-01-issue-01/${articleSlug}`;
    }
  }

  if (subpath === '/rss' || subpath === '/rss.xml' || subpath === '/feed') {
    return '/feed.xml';
  }

  if (
    subpath === '/home' ||
    subpath === '/index' ||
    subpath === '/index.html' ||
    subpath === '/index.php'
  ) {
    return '/';
  }

  return null;
}

function buildDispatchHostDestination(
  request: NextRequest,
  rawHost: string,
  destPathAndQuery: string
): URL {
  const hostOnly = extractHostOnly(rawHost);
  if (
    hostOnly === 'dispatch.kashmir-ecowatch.com' ||
    hostOnly === 'www.dispatch.kashmir-ecowatch.com'
  ) {
    return new URL(destPathAndQuery, `${CANONICAL_DISPATCH_URL}/`);
  }
  const proto =
    request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() ||
    (rawHost.includes('localhost') || rawHost.includes('127.0.0.1') ? 'http' : 'https');
  const firstHost = rawHost.split(',')[0]?.trim() || 'dispatch.localhost:3002';
  return new URL(destPathAndQuery, `${proto}://${firstHost}/`);
}

function buildKewPlatformDestination(
  request: NextRequest,
  rawHost: string,
  destPathAndQuery: string
): URL {
  const hostOnly = extractHostOnly(rawHost);
  if (hostOnly.startsWith('dispatch.localhost')) {
    const portMatch = rawHost.split(',')[0]?.trim().match(/:(\d+)$/);
    const portSuffix = portMatch ? `:${portMatch[1]}` : ':3002';
    return new URL(destPathAndQuery, `http://localhost${portSuffix}/`);
  }
  return new URL(destPathAndQuery, `${CANONICAL_KEW_PLATFORM_URL}/`);
}

function isAllowedDispatchApiPath(pathname: string): boolean {
  return (
    pathname === '/api/himalayan-dispatch' ||
    pathname.startsWith('/api/himalayan-dispatch/') ||
    pathname === '/api/admin/session' ||
    pathname.startsWith('/api/auth/') ||
    pathname === '/api/discovery/telemetry'
  );
}

/**
 * Hostname-Aware Request Router & Alias Redirect Proxy (Next.js 16)
 */
export function proxy(request: NextRequest) {
  const { pathname, search, searchParams } = request.nextUrl;
  const rawHost =
    request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const hostOnly = extractHostOnly(rawHost);
  const normalizedPathname =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. DEDICATED PRODUCTION SUBDOMAIN (`dispatch.kashmir-ecowatch.com`)
  // ═══════════════════════════════════════════════════════════════════════════
  if (isDispatchHostname(rawHost)) {
    if (hostOnly.startsWith('www.')) {
      const stripped = stripDispatchPrefix(pathname);
      const upgraded = resolveLegacyDispatchSubpath(stripped, searchParams);
      const target = upgraded || `${stripped}${search}`;
      return NextResponse.redirect(new URL(target, `${CANONICAL_DISPATCH_URL}/`), 308);
    }

    if (pathname === '/api' || pathname.startsWith('/api/')) {
      if (!isAllowedDispatchApiPath(pathname)) {
        return NextResponse.json(
          {
            success: false,
            error: 'Not Found: Endpoint is not available on Himalayan Dispatch.',
          },
          {
            status: 404,
            headers: { 'X-Robots-Tag': 'noindex, nofollow, noarchive' },
          }
        );
      }
      const res = NextResponse.next();
      res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
      return res;
    }

    if (pathname === HD_LEGACY_PREFIX || pathname.startsWith(`${HD_LEGACY_PREFIX}/`)) {
      const stripped = stripDispatchPrefix(pathname);
      const upgraded = resolveLegacyDispatchSubpath(stripped, searchParams);
      const dest = upgraded || `${stripped}${search}`;
      return NextResponse.redirect(
        buildDispatchHostDestination(request, rawHost, dest),
        308
      );
    }

    const legacyUpgraded = resolveLegacyDispatchSubpath(pathname, searchParams);
    if (legacyUpgraded) {
      return NextResponse.redirect(
        buildDispatchHostDestination(request, rawHost, legacyUpgraded),
        308
      );
    }

    if (pathname === '/auth' || pathname.startsWith('/auth/')) {
      return NextResponse.redirect(
        buildDispatchHostDestination(request, rawHost, '/journalist-sign-in'),
        307
      );
    }

    const firstSegment = pathname.split('/').filter(Boolean)[0] || '';
    const isDispatchRoot = pathname === '/';
    const isAllowedSubroute =
      firstSegment.length > 0 && ALLOWED_DISPATCH_ROOT_SEGMENTS.has(firstSegment);

    // Safety cross-host redirect: if a relative KEW platform route is requested on
    // `dispatch.kashmir-ecowatch.com`, redirect cleanly (308) to the main KEW domain!
    if (!isDispatchRoot && !isAllowedSubroute && KNOWN_KEW_PLATFORM_ROOT_SEGMENTS.has(firstSegment)) {
      const canonicalKewTarget = KEW_CANONICAL_ALIAS_REDIRECTS[normalizedPathname] || normalizedPathname;
      return NextResponse.redirect(
        buildKewPlatformDestination(request, rawHost, `${canonicalKewTarget}${search}`),
        308
      );
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-hd-subdomain', '1');
    requestHeaders.set('x-hd-public-path', pathname);

    if (!isDispatchRoot && !isAllowedSubroute) {
      const blockedUrl = request.nextUrl.clone();
      blockedUrl.pathname = `${HD_LEGACY_PREFIX}/__blocked-kew-route__`;
      const blockedResponse = NextResponse.rewrite(blockedUrl, {
        request: { headers: requestHeaders },
      });
      blockedResponse.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
      return blockedResponse;
    }

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = toInternalDispatchPath(pathname);

    const response = NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    });
    if (NO_INDEX_DISPATCH_SEGMENTS.has(firstSegment)) {
      response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
    }
    return response;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. LOCALHOST (`localhost:3002`) & MAIN KEW DOMAIN (`kashmir-ecowatch.com`)
  // ═══════════════════════════════════════════════════════════════════════════
  const aliasRedirectTarget = KEW_CANONICAL_ALIAS_REDIRECTS[normalizedPathname];
  if (aliasRedirectTarget) {
    return NextResponse.redirect(
      new URL(`${aliasRedirectTarget}${search}`, request.url),
      308
    );
  }

  if (pathname === '/our-story' || pathname === '/our-story/') {
    if (shouldRedirectLegacyKewDomainToSubdomain(rawHost)) {
      return NextResponse.redirect(new URL('/our-story', `${CANONICAL_DISPATCH_URL}/`), 308);
    }
    return NextResponse.redirect(new URL('/himalayan-dispatch/our-story', request.url), 307);
  }

  if (pathname === HD_LEGACY_PREFIX || pathname.startsWith(`${HD_LEGACY_PREFIX}/`)) {
    const stripped = stripDispatchPrefix(pathname);
    const upgradedSubpath = resolveLegacyDispatchSubpath(stripped, searchParams);

    if (shouldRedirectLegacyKewDomainToSubdomain(rawHost)) {
      const targetSubpath = upgradedSubpath || `${stripped}${search}`;
      return NextResponse.redirect(
        new URL(targetSubpath, `${CANONICAL_DISPATCH_URL}/`),
        308
      );
    }

    if (upgradedSubpath) {
      return NextResponse.redirect(
        new URL(toInternalDispatchPath(upgradedSubpath), request.url),
        308
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|images/|audio/|data/|kew_LOGO\\.png).*)',
  ],
};
