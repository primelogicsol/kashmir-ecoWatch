import { NextRequest, NextResponse } from 'next/server';
import {
  getPublicDailyDispatches,
  getPublicPublishedStories,
} from '@/lib/himalayan-dispatch-store';
import {
  DISPATCH_IDENTITY,
  HD_LEGACY_PREFIX,
  isDispatchHostname,
  stripDispatchPrefix,
  toCanonicalIssueSlug,
  toDispatchCanonicalUrl,
} from '@/lib/himalayan-dispatch-routes';

function escapeXml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(request: NextRequest) {
  const rawHost =
    request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const onSubdomain =
    request.headers.get('x-hd-subdomain') === '1' || isDispatchHostname(rawHost);
  const proto =
    request.headers.get('x-forwarded-proto')?.split(',')[0]?.trim() ||
    (rawHost.includes('localhost') || rawHost.includes('127.0.0.1') ? 'http' : 'https');
  const localOrigin = rawHost ? `${proto}://${rawHost.split(',')[0].trim()}` : 'http://localhost:3002';

  const buildFeedItemUrl = (subpath: string): string => {
    const clean = stripDispatchPrefix(subpath);
    if (onSubdomain) {
      return toDispatchCanonicalUrl(clean);
    }
    return clean === '/'
      ? `${localOrigin}${HD_LEGACY_PREFIX}`
      : `${localOrigin}${HD_LEGACY_PREFIX}${clean}`;
  };

  const channelLink = onSubdomain
    ? DISPATCH_IDENTITY.canonicalHomepageUrl
    : `${localOrigin}${HD_LEGACY_PREFIX}`;
  const selfFeedLink = onSubdomain
    ? DISPATCH_IDENTITY.rssFeedUrl
    : `${localOrigin}${HD_LEGACY_PREFIX}/feed.xml`;

  const daily = getPublicDailyDispatches().map((dd) => ({
    title: dd.headline,
    url: buildFeedItemUrl(`/daily-dispatch/${dd.slug}`),
    pubDateIso: dd.publishedAt,
    creator: dd.bylineDisplay,
    categoryA: `Daily Dispatch · ${dd.departmentLabel}`,
    categoryB: dd.bureauLabel,
    description: dd.standfirst,
  }));

  const stories = getPublicPublishedStories().map((st) => ({
    title: st.title,
    url: buildFeedItemUrl(`/issues/${toCanonicalIssueSlug(st.editionSlug)}/${st.slug}`),
    pubDateIso: st.publishedAt,
    creator: st.bylineDisplay,
    categoryA: st.departmentRubric,
    categoryB: st.region,
    description: st.excerpt || st.subtitle,
  }));

  const merged = [...daily, ...stories]
    .sort((a, b) => (b.pubDateIso || '').localeCompare(a.pubDateIso || ''))
    .slice(0, 60);

  const nowRfc = new Date().toUTCString();

  const itemsXml = merged
    .map((item) => {
      const pubDate = new Date(item.pubDateIso || Date.now()).toUTCString();
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <pubDate>${escapeXml(pubDate)}</pubDate>
      <dc:creator>${escapeXml(item.creator)}</dc:creator>
      <category>${escapeXml(item.categoryA)}</category>
      <category>${escapeXml(item.categoryB)}</category>
      <description>${escapeXml(item.description)}</description>
    </item>`;
    })
    .join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Himalayan Dispatch — Environmental Newsroom &amp; Periodical</title>
    <link>${escapeXml(channelLink)}</link>
    <atom:link href="${escapeXml(selfFeedLink)}" rel="self" type="application/rss+xml" />
    <description>Evidence-based environmental reporting, Daily Dispatches, and cinematic Monthly Editions across Kashmir, Jammu, Ladakh, AJ&amp;K, Gilgit, and Baltistan.</description>
    <language>en-us</language>
    <lastBuildDate>${escapeXml(nowRfc)}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;

  return new NextResponse(rss, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
    },
  });
}
