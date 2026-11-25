import { NextRequest, NextResponse } from 'next/server';
import { CANONICAL_SITE_URL, KEW_IDENTITY } from '@/lib/seo/entity-identity';

export const runtime = 'nodejs';

/**
 * Serves IndexNow ownership key verification at canonical root (`/<INDEXNOW_KEY>.txt`
 * via next.config.js rewrite) and non-sensitive readiness metadata at `/api/indexnow`.
 * Note: IndexNow notifies participating engines (Bing, Yandex, Naver, Seznam, Yep);
 * Google Search uses Googlebot + Search Console Sitemaps rather than IndexNow.
 */
export async function GET(request: NextRequest) {
  const key = (process.env.INDEXNOW_KEY || '').trim();
  const format = (request.nextUrl.searchParams.get('format') || 'json').toLowerCase();
  const candidate = (request.nextUrl.searchParams.get('candidate') || '').trim();

  if (format === 'txt') {
    if (!key) {
      return new NextResponse('IndexNow key not configured', {
        status: 404,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
    // If accessed via root rewrite `/:candidate.txt`, only return 200 for the exact configured key
    if (candidate && candidate !== key) {
      return new NextResponse('Not Found', {
        status: 404,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }
    return new NextResponse(key, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  }

  // Status response intentionally omits the raw key string so credentials are not leaked in JSON status calls
  return NextResponse.json({
    protocol: 'IndexNow 1.0',
    host: KEW_IDENTITY.domain,
    canonicalSiteUrl: CANONICAL_SITE_URL,
    keyConfigured: Boolean(key && /^[a-zA-Z0-9-]{8,128}$/.test(key)),
    keyVerificationEndpointReady: Boolean(key),
    participatingSearchEngines: ['Bing', 'Yandex', 'Naver', 'Seznam', 'Yep'],
    googleParticipationNote:
      'Google does not use IndexNow for general web search; Google discovery uses Googlebot + Search Console XML Sitemaps.',
  });
}
