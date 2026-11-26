import { NextResponse } from 'next/server';
import {
  getPublicCorrectionRecords,
  getPublicDailyDispatches,
  getPublicEditions,
  getPublicJournalists,
  getPublicPublishedStories,
  getPublicReportingBeats,
} from '@/lib/himalayan-dispatch-store';
import {
  CANONICAL_DISPATCH_URL,
  DEPARTMENT_ROUTE_CONFIG,
  FOOTER_BUREAU_LINKS,
  HD_ROUTES,
  resolveCanonicalStoryUrl,
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

interface DispatchSitemapItem {
  url: string;
  lastmod: string;
  changefreq: 'hourly' | 'daily' | 'weekly' | 'monthly';
  priority: string;
  newsTitle?: string;
  newsPubDate?: string;
}

export async function GET() {
  const todayIso = new Date().toISOString().slice(0, 10);
  const seen = new Set<string>();
  const items: DispatchSitemapItem[] = [];

  const push = (entry: DispatchSitemapItem) => {
    if (seen.has(entry.url)) return;
    seen.add(entry.url);
    items.push(entry);
  };

  // 1. Core Periodical & Public Institutional Pages (excluding non-indexable newsroom/CMS/sign-in/pitch)
  const staticPublicPaths: Array<{
    path: string;
    changefreq: DispatchSitemapItem['changefreq'];
    priority: string;
  }> = [
    { path: HD_ROUTES.root, changefreq: 'daily', priority: '1.0' },
    { path: HD_ROUTES.ourStory, changefreq: 'monthly', priority: '0.90' },
    { path: HD_ROUTES.dailyDispatch, changefreq: 'hourly', priority: '0.95' },
    { path: HD_ROUTES.currentIssue, changefreq: 'weekly', priority: '0.95' },
    { path: HD_ROUTES.forthcoming, changefreq: 'weekly', priority: '0.85' },
    { path: HD_ROUTES.departments, changefreq: 'weekly', priority: '0.90' },
    { path: HD_ROUTES.bureausOverview, changefreq: 'weekly', priority: '0.90' },
    { path: HD_ROUTES.journalists, changefreq: 'weekly', priority: '0.85' },
    { path: HD_ROUTES.editorialBoard, changefreq: 'monthly', priority: '0.85' },
    { path: HD_ROUTES.archive, changefreq: 'weekly', priority: '0.85' },
    { path: HD_ROUTES.dailyDispatchArchive, changefreq: 'daily', priority: '0.85' },
    { path: HD_ROUTES.reportingBeats, changefreq: 'monthly', priority: '0.80' },
    { path: HD_ROUTES.joinNewsroom, changefreq: 'monthly', priority: '0.80' },
    { path: HD_ROUTES.correspondentApplications, changefreq: 'monthly', priority: '0.75' },
    { path: HD_ROUTES.editorialAppointments, changefreq: 'monthly', priority: '0.75' },
    { path: HD_ROUTES.contributorGuidelines, changefreq: 'monthly', priority: '0.75' },
    { path: HD_ROUTES.editorialDirectorate, changefreq: 'monthly', priority: '0.75' },
    { path: HD_ROUTES.editorialCalendar, changefreq: 'monthly', priority: '0.75' },
    { path: HD_ROUTES.corrections, changefreq: 'weekly', priority: '0.75' },
    { path: HD_ROUTES.publicEditor, changefreq: 'monthly', priority: '0.70' },
    { path: HD_ROUTES.imprint, changefreq: 'monthly', priority: '0.75' },
    { path: HD_ROUTES.editorialCharter, changefreq: 'monthly', priority: '0.75' },
    { path: HD_ROUTES.sourceProtection, changefreq: 'monthly', priority: '0.75' },
    { path: HD_ROUTES.scientificReview, changefreq: 'monthly', priority: '0.75' },
    { path: HD_ROUTES.ethicsGovernance, changefreq: 'monthly', priority: '0.75' },
    { path: HD_ROUTES.rightsPermissions, changefreq: 'monthly', priority: '0.70' },
    { path: HD_ROUTES.readerComplaints, changefreq: 'monthly', priority: '0.65' },
    { path: HD_ROUTES.contact, changefreq: 'monthly', priority: '0.70' },
  ];

  for (const sp of staticPublicPaths) {
    push({
      url: sp.path === '/' ? `${CANONICAL_DISPATCH_URL}/` : toDispatchCanonicalUrl(sp.path),
      lastmod: todayIso,
      changefreq: sp.changefreq,
      priority: sp.priority,
    });
  }

  // 2. Published Monthly Issues
  for (const ed of getPublicEditions()) {
    if (ed.status === 'forthcoming') continue;
    const canonSlug = toCanonicalIssueSlug(ed.slug);
    push({
      url: toDispatchCanonicalUrl(HD_ROUTES.issue(canonSlug)),
      lastmod: (ed.publishedIsoDate || todayIso).slice(0, 10),
      changefreq: 'monthly',
      priority: '0.90',
    });
  }

  // 3. Published Magazine Stories (Fact-Checked & Scientifically Reviewed)
  for (const st of getPublicPublishedStories()) {
    push({
      url: toDispatchCanonicalUrl(resolveCanonicalStoryUrl(st)),
      lastmod: (st.updatedAt || st.publishedAt || todayIso).slice(0, 10),
      changefreq: 'monthly',
      priority: '0.92',
    });
  }

  // 4. Published Daily Dispatches
  const twoDaysMs = 48 * 60 * 60 * 1000;
  const nowMs = Date.now();
  for (const dd of getPublicDailyDispatches()) {
    const pubDate = dd.publishedAt || todayIso;
    const parsedMs = Date.parse(pubDate);
    const isRecentNews = !Number.isNaN(parsedMs) && nowMs - parsedMs <= twoDaysMs && nowMs >= parsedMs;
    push({
      url: toDispatchCanonicalUrl(HD_ROUTES.dailyDispatchArticle(dd.slug)),
      lastmod: pubDate.slice(0, 10),
      changefreq: 'weekly',
      priority: '0.90',
      ...(isRecentNews
        ? {
            newsTitle: dd.headline,
            newsPubDate: new Date(parsedMs).toISOString(),
          }
        : {}),
    });
  }

  // 5. Seven Editorial Departments
  for (const slug of Object.keys(DEPARTMENT_ROUTE_CONFIG)) {
    push({
      url: toDispatchCanonicalUrl(`/departments/${slug}`),
      lastmod: todayIso,
      changefreq: 'weekly',
      priority: '0.85',
    });
  }

  // 6. Six Regional Reporting Bureaus
  for (const b of FOOTER_BUREAU_LINKS) {
    push({
      url: toDispatchCanonicalUrl(b.href),
      lastmod: todayIso,
      changefreq: 'weekly',
      priority: '0.85',
    });
  }

  // 7. Thematic Reporting Beats
  for (const bt of getPublicReportingBeats()) {
    push({
      url: toDispatchCanonicalUrl(HD_ROUTES.reportingBeat(bt.slug)),
      lastmod: todayIso,
      changefreq: 'monthly',
      priority: '0.80',
    });
  }

  // 8. Approved Public Journalist Portfolios
  for (const j of getPublicJournalists()) {
    push({
      url: toDispatchCanonicalUrl(HD_ROUTES.journalistPortfolio(j.slug)),
      lastmod: todayIso,
      changefreq: 'monthly',
      priority: '0.80',
    });
  }

  // 9. Public Correction & Clarification Records
  for (const cor of getPublicCorrectionRecords()) {
    const recDate =
      ('issuedAt' in cor && typeof cor.issuedAt === 'string' && cor.issuedAt) || todayIso;
    push({
      url: toDispatchCanonicalUrl(HD_ROUTES.correctionRecord(cor.id)),
      lastmod: recDate.slice(0, 10),
      changefreq: 'monthly',
      priority: '0.65',
    });
  }

  const urlsXml = items
    .map((item) => {
      const newsBlock = item.newsTitle
        ? `\n    <news:news>
      <news:publication>
        <news:name>Himalayan Dispatch</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${escapeXml(item.newsPubDate || item.lastmod)}</news:publication_date>
      <news:title>${escapeXml(item.newsTitle)}</news:title>
    </news:news>`
        : '';

      return `  <url>
    <loc>${escapeXml(item.url)}</loc>
    <lastmod>${escapeXml(item.lastmod)}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>${newsBlock}
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlsXml}
</urlset>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=600, stale-while-revalidate=3600',
    },
  });
}
