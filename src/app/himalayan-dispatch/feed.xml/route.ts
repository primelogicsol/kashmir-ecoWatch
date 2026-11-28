import { NextRequest, NextResponse } from 'next/server';
import {
  getPublicDailyDispatches,
  getPublicPublishedStories,
} from '@/lib/himalayan-dispatch-store';
import {
  CANONICAL_KEW_PLATFORM_URL,
  DISPATCH_IDENTITY,
  HD_LEGACY_PREFIX,
  IS_DISPATCH_SUBDOMAIN_LIVE,
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

function resolveSafeFeedOrigin(rawHost: string): string {
  const first = rawHost.split(',')[0]?.trim().toLowerCase() || '';
  const hostNoPort = first.replace(/:\d+$/, '');
  if (hostNoPort === 'localhost' || hostNoPort === '127.0.0.1') {
    return `http://${first}`;
  }
  if (hostNoPort.startsWith('dispatch.localhost')) {
    return `http://${first}`;
  }
  return CANONICAL_KEW_PLATFORM_URL;
}

export async function GET(request: NextRequest) {
  const rawHost =
    request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  const onSubdomain =
    IS_DISPATCH_SUBDOMAIN_LIVE ||
    request.headers.get('x-hd-subdomain') === '1' ||
    isDispatchHostname(rawHost);
  const safeMainOrigin = resolveSafeFeedOrigin(rawHost);

  const buildFeedItemUrl = (subpath: string): string => {
    const clean = stripDispatchPrefix(subpath);
    if (onSubdomain) {
      return toDispatchCanonicalUrl(clean);
    }
    return clean === '/'
      ? `${safeMainOrigin}${HD_LEGACY_PREFIX}`
      : `${safeMainOrigin}${HD_LEGACY_PREFIX}${clean}`;
  };

  const channelLink = onSubdomain
    ? DISPATCH_IDENTITY.canonicalHomepageUrl
    : `${safeMainOrigin}${HD_LEGACY_PREFIX}`;
  const selfFeedLink = onSubdomain
    ? DISPATCH_IDENTITY.rssFeedUrl
    : `${safeMainOrigin}${HD_LEGACY_PREFIX}/feed.xml`;

  const daily = getPublicDailyDispatches().map((dd) => {
    const parts = [dd.standfirst];
    if (dd.aiAssistanceDisclosure) {
      parts.push(`[Editorial & Synthesis Disclosure: ${dd.aiAssistanceDisclosure}]`);
    }
    if (dd.corrections && dd.corrections.length > 0) {
      for (const c of dd.corrections) {
        parts.push(`[${c.kind} (${c.date}): ${c.note}]`);
      }
    }
    return {
      title: dd.headline,
      url: buildFeedItemUrl(`/daily-dispatch/${dd.slug}`),
      pubDateIso: dd.publishedAt,
      creator: dd.bylineDisplay,
      categoryA: `Daily Dispatch · ${dd.departmentLabel}`,
      categoryB: dd.bureauLabel,
      extraCategory: dd.aiAssistanceDisclosure ? 'Automated / Observatory Synthesis' : undefined,
      description: parts.join(' '),
    };
  });

  const stories = getPublicPublishedStories().map((st) => {
    const parts = [st.excerpt || st.subtitle];
    if (st.aiAssistanceDisclosure) {
      parts.push(`[Automated Synthesis Disclosure: ${st.aiAssistanceDisclosure}]`);
    }
    if (st.conceptualFolioDisclosure) {
      parts.push(`[Editorial Folio Note: ${st.conceptualFolioDisclosure}]`);
    }
    if (st.corrections && st.corrections.length > 0) {
      for (const c of st.corrections) {
        parts.push(`[${c.kind} (${c.date}): ${c.note}]`);
      }
    }
    return {
      title: st.title,
      url: buildFeedItemUrl(`/issues/${toCanonicalIssueSlug(st.editionSlug)}/${st.slug}`),
      pubDateIso: st.publishedAt,
      creator: st.bylineDisplay,
      categoryA: st.departmentRubric,
      categoryB: st.region,
      extraCategory: st.isAiAssisted || st.aiAssistanceDisclosure
        ? 'Automated Multi-Source Synthesis'
        : undefined,
      description: parts.join(' '),
    };
  });

  const merged = [...daily, ...stories]
    .sort((a, b) => (b.pubDateIso || '').localeCompare(a.pubDateIso || ''))
    .slice(0, 60);

  const nowRfc = new Date().toUTCString();

  const itemsXml = merged
    .map((item) => {
      const pubDate = new Date(item.pubDateIso || Date.now()).toUTCString();
      const extraCatXml = item.extraCategory
        ? `\n      <category>${escapeXml(item.extraCategory)}</category>`
        : '';
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.url)}</guid>
      <pubDate>${escapeXml(pubDate)}</pubDate>
      <dc:creator>${escapeXml(item.creator)}</dc:creator>
      <category>${escapeXml(item.categoryA)}</category>
      <category>${escapeXml(item.categoryB)}</category>${extraCatXml}
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
    <description>Evidence-based environmental reporting, Daily Dispatches, and Monthly Editions across Kashmir, Jammu, Ladakh, AJ&amp;K, Gilgit, and Baltistan.</description>
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
