// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — CENTRALIZED ENVIRONMENT & HOSTNAME-AWARE ROUTE REGISTRY
// Preserves `/himalayan-dispatch/...` on `localhost:3002` 100% unchanged while
// serving clean root-relative `/...` URLs on `dispatch.kashmir-ecowatch.com`.
// ─────────────────────────────────────────────────────────────────────────────

import type { EditorialDepartmentId } from '@/types/himalayan-dispatch';

export const DISPATCH_HOSTNAME = (
  process.env.NEXT_PUBLIC_DISPATCH_HOST || 'dispatch.kashmir-ecowatch.com'
)
  .trim()
  .toLowerCase();

export const CANONICAL_DISPATCH_URL = (
  process.env.NEXT_PUBLIC_DISPATCH_SITE_URL || `https://${DISPATCH_HOSTNAME}`
).replace(/\/+$/, '');

export const CANONICAL_KEW_PLATFORM_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://kashmir-ecowatch.com'
).replace(/\/+$/, '');

/**
 * Enabled in production `.env` ONLY after `https://dispatch.kashmir-ecowatch.com`
 * is verified live. Defaults to `false` so local development (`localhost:3002`)
 * and pre-cutover environments continue using `/himalayan-dispatch`.
 */
export const IS_DISPATCH_SUBDOMAIN_LIVE =
  process.env.NEXT_PUBLIC_DISPATCH_SUBDOMAIN_LIVE === 'true';

/**
 * Permanent canonical destination for the upper global KEW header direct-access link.
 */
export const DISPATCH_SUBDOMAIN_DIRECT_URL = `${CANONICAL_DISPATCH_URL}/`;

/**
 * Resolves the upper global KEW header Himalayan Dispatch link:
 * - Returns `https://dispatch.kashmir-ecowatch.com/` once HTTP 200 + valid HTTPS
 *   is verified live (`subdomainVerified === true`).
 * - Falls back cleanly to `/himalayan-dispatch` beforehand so visitors are never
 *   exposed to a 502 Bad Gateway or SSL security warning.
 */
export function getDirectDispatchHeaderUrl(
  subdomainVerified: boolean = IS_DISPATCH_SUBDOMAIN_LIVE
): string {
  return subdomainVerified ? DISPATCH_SUBDOMAIN_DIRECT_URL : '/himalayan-dispatch';
}

export const DISPATCH_IDENTITY = {
  officialName: 'Himalayan Dispatch',
  extendedName: 'Himalayan Dispatch — Environmental Journalism & Periodical',
  tagline: 'Landscape. People. Science. Truth.',
  domain: DISPATCH_HOSTNAME,
  canonicalUrl: CANONICAL_DISPATCH_URL,
  canonicalHomepageUrl: `${CANONICAL_DISPATCH_URL}/`,
  rssFeedUrl: `${CANONICAL_DISPATCH_URL}/feed.xml`,
  sitemapUrl: `${CANONICAL_DISPATCH_URL}/sitemap.xml`,
  publisherName: 'Himalayan Dispatch',
  parentInstitutionName: 'Kashmir EcoWatch Western Himalayan',
  parentInstitutionUrl: CANONICAL_KEW_PLATFORM_URL,
  headquartersLocality: 'Fairfax',
  headquartersRegion: 'Virginia',
  headquartersPostalCode: '22031',
  headquartersCountry: 'US',
  foundingYear: '2026',
  defaultOgImagePath: '/images/himalayan-dispatch/cover-gangbal-inaugural.jpg',
} as const;

export const HD_LEGACY_PREFIX = '/himalayan-dispatch' as const;
export const HD_BASE = '/himalayan-dispatch' as const;

/**
 * Positive allowlist of first-level URL segments permitted on `dispatch.kashmir-ecowatch.com`.
 * Unrelated KEW routes are strictly blocked with HTTP 404 on the Dispatch hostname.
 */
export const ALLOWED_DISPATCH_ROOT_SEGMENTS = new Set<string>([
  'archive',
  'bureaus',
  'contact',
  'contributor-guidelines',
  'corrections',
  'correspondent-applications',
  'current-issue',
  'daily-dispatch',
  'departments',
  'dispatches',
  'editorial-appointments',
  'editorial-board',
  'editorial-calendar',
  'editorial-charter',
  'editorial-cms',
  'editorial-directorate',
  'ethics-governance',
  'feed.xml',
  'forthcoming',
  'imprint',
  'issues',
  'join-newsroom',
  'journalist-sign-in',
  'journalists',
  'manifest.webmanifest',
  'media-transparency-observatory',
  'newsroom',
  'our-story',
  'pitch',
  'public-editor',
  'reader-complaints',
  'reporting-beats',
  'rights-permissions',
  'robots.txt',
  'scientific-review',
  'search',
  'sitemap.xml',
  'source-protection-verification',
]);

/**
 * Determines whether an incoming HTTP `Host` / `X-Forwarded-Host` header belongs
 * to the dedicated Himalayan Dispatch subdomain (`dispatch.kashmir-ecowatch.com`
 * or local testing alias `dispatch.localhost`). Plain `localhost:3002` returns `false`.
 */
export function isDispatchHostname(rawHost?: string | null): boolean {
  if (!rawHost) return false;
  const first = rawHost.split(',')[0]?.trim().toLowerCase() || '';
  const hostname = first.replace(/:\d+$/, '');
  if (!hostname) return false;
  return (
    hostname === DISPATCH_HOSTNAME ||
    hostname === `www.${DISPATCH_HOSTNAME}` ||
    hostname === 'dispatch.kashmir-ecowatch.com' ||
    hostname === 'www.dispatch.kashmir-ecowatch.com' ||
    hostname === 'dispatch.localhost' ||
    hostname.startsWith('dispatch.localhost')
  );
}

/**
 * Returns `true` when rendering for `dispatch.kashmir-ecowatch.com` (both SSR and
 * client hydration), and `false` on `localhost:3002` or `kashmir-ecowatch.com`.
 */
export function isCurrentDispatchSubdomain(): boolean {
  if (typeof window !== 'undefined') {
    return isDispatchHostname(window.location.host);
  }
  const serverGetter = (
    globalThis as unknown as { __hdGetRequestSubdomain?: () => boolean }
  ).__hdGetRequestSubdomain;
  return serverGetter ? Boolean(serverGetter()) : false;
}

/**
 * Strips any leading `/himalayan-dispatch` prefix from a path, returning a clean
 * subdomain subpath starting with `/`.
 */
export function stripDispatchPrefix(pathname: string): string {
  if (
    !pathname ||
    pathname === '/' ||
    pathname === HD_LEGACY_PREFIX ||
    pathname === `${HD_LEGACY_PREFIX}/`
  ) {
    return '/';
  }
  if (pathname.startsWith(`${HD_LEGACY_PREFIX}/`)) {
    const rest = pathname.slice(HD_LEGACY_PREFIX.length);
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
}

/**
 * Maps a public Dispatch subpath (`/` or `/bureaus/kashmir`) to the internal Next.js
 * App Router directory path (`/himalayan-dispatch` or `/himalayan-dispatch/bureaus/kashmir`).
 */
export function toInternalDispatchPath(publicSubpath: string): string {
  const clean = stripDispatchPrefix(publicSubpath);
  return clean === '/' ? HD_LEGACY_PREFIX : `${HD_LEGACY_PREFIX}${clean}`;
}

/**
 * Centralized, hostname-aware internal Himalayan Dispatch route generator:
 * - On `localhost:3002`: returns `/himalayan-dispatch` or `/himalayan-dispatch/<subpath>` (unchanged!)
 * - On `dispatch.kashmir-ecowatch.com`: returns `/` or `/<subpath>`
 */
export function hdRoute(pathOrSubpath: string): string {
  if (!pathOrSubpath) {
    return isCurrentDispatchSubdomain() ? '/' : HD_LEGACY_PREFIX;
  }
  const [beforeHash, hashPart] = pathOrSubpath.split('#');
  const [rawPath, queryPart] = (beforeHash || '/').split('?');
  const cleanSub = stripDispatchPrefix(rawPath || '/');
  const qs = queryPart ? `?${queryPart}` : '';
  const hash = hashPart ? `#${hashPart}` : '';

  if (isCurrentDispatchSubdomain()) {
    return `${cleanSub}${qs}${hash}`;
  }
  const localPath = cleanSub === '/' ? HD_LEGACY_PREFIX : `${HD_LEGACY_PREFIX}${cleanSub}`;
  return `${localPath}${qs}${hash}`;
}

/**
 * Centralized, hostname-aware link generator from Himalayan Dispatch back to KEW:
 * - On `localhost:3002`: returns relative KEW path (e.g. `/`, `/water-systems/glaciers`) so local dev never leaves localhost!
 * - On `dispatch.kashmir-ecowatch.com`: returns `https://kashmir-ecowatch.com/...` so KEW links cross cleanly to the main domain!
 */
export function toKewPlatformUrl(kewPathOrUrl: string): string {
  if (/^https?:\/\//i.test(kewPathOrUrl)) return kewPathOrUrl;
  const clean = !kewPathOrUrl || kewPathOrUrl === '/'
    ? '/'
    : kewPathOrUrl.startsWith('/')
    ? kewPathOrUrl
    : `/${kewPathOrUrl}`;
  if (isCurrentDispatchSubdomain()) {
    return `${CANONICAL_KEW_PLATFORM_URL}${clean}`;
  }
  return clean;
}

/**
 * Centralized, environment-aware link generator from KEW navigation/pages to Himalayan Dispatch:
 * - In local development (`localhost:3002` / `NEXT_PUBLIC_DISPATCH_SUBDOMAIN_LIVE !== 'true'`):
 *   returns `/himalayan-dispatch` or `/himalayan-dispatch/<subpath>` (never leaves localhost!)
 * - In production after subdomain activation (`NEXT_PUBLIC_DISPATCH_SUBDOMAIN_LIVE === 'true'`):
 *   returns `https://dispatch.kashmir-ecowatch.com/<subpath>`
 */
export function getKewToDispatchUrl(subpath = '/'): string {
  const cleanSub = stripDispatchPrefix(subpath);
  if (IS_DISPATCH_SUBDOMAIN_LIVE) {
    return cleanSub === '/'
      ? `${CANONICAL_DISPATCH_URL}/`
      : `${CANONICAL_DISPATCH_URL}${cleanSub}`;
  }
  return cleanSub === '/' ? HD_LEGACY_PREFIX : `${HD_LEGACY_PREFIX}${cleanSub}`;
}

/**
 * Resolves any Dispatch path to its canonical absolute URL on `https://dispatch.kashmir-ecowatch.com`
 * (used for `<link rel="canonical">`, OpenGraph, JSON-LD, dedicated sitemap, and subdomain RSS).
 */
export function toDispatchCanonicalUrl(pathOrUrl: string): string {
  if (!pathOrUrl) return `${CANONICAL_DISPATCH_URL}/`;
  if (/^https?:\/\//i.test(pathOrUrl)) {
    try {
      const parsed = new URL(pathOrUrl);
      const cleanSub = stripDispatchPrefix(parsed.pathname);
      const normalizedSub = cleanSub.length > 1 ? cleanSub.replace(/\/+$/, '') : '/';
      return normalizedSub === '/'
        ? `${CANONICAL_DISPATCH_URL}/${parsed.search}`
        : `${CANONICAL_DISPATCH_URL}${normalizedSub}${parsed.search}`;
    } catch {
      return pathOrUrl;
    }
  }
  const [rawPath, ...queryParts] = pathOrUrl.split('?');
  const [pathOnly, hashPart] = (rawPath || '/').split('#');
  const cleanSub = stripDispatchPrefix(pathOnly || '/');
  const normalizedSub = cleanSub.length > 1 ? cleanSub.replace(/\/+$/, '') : '/';
  const qs = queryParts.length > 0 ? `?${queryParts.join('?')}` : '';
  const hash = hashPart ? `#${hashPart}` : '';
  return normalizedSub === '/'
    ? `${CANONICAL_DISPATCH_URL}/${qs}${hash}`
    : `${CANONICAL_DISPATCH_URL}${normalizedSub}${qs}${hash}`;
}

export type DepartmentRouteSlug =
  | 'cover-stories'
  | 'longform-features'
  | 'field-reports'
  | 'investigative-desk'
  | 'visual-journal'
  | 'data-journalism'
  | 'interviews-editorials';

export type BureauRouteSlug =
  | 'kashmir'
  | 'jammu'
  | 'ladakh'
  | 'ajk'
  | 'gilgit'
  | 'baltistan';

export type BeatRouteSlug =
  | 'cryosphere-glaciers-high-passes'
  | 'lakes-wetlands-springs-waterways'
  | 'transboundary-rivers-hydropower'
  | 'biodiversity-forests-pastoral-commons'
  | 'earth-observation-climate-records'
  | 'documentary-photography-oral-memory'
  | 'environmental-legacy-conservation-accountability';

export const HD_ROUTES = {
  get root() {
    return hdRoute('/');
  },

  // 1. The Periodical
  get dailyDispatch() {
    return hdRoute('/daily-dispatch');
  },
  get dailyDispatchArchive() {
    return hdRoute('/daily-dispatch/archive');
  },
  dailyDispatchArticle: (slug: string) => hdRoute(`/daily-dispatch/${slug}`),
  get currentIssue() {
    return hdRoute('/current-issue');
  },
  get inauguralIssue() {
    return hdRoute('/issues/volume-01-issue-01');
  },
  issue: (issueSlug: string) => hdRoute(`/issues/${issueSlug}`),
  issueArticle: (issueSlug: string, articleSlug: string) =>
    hdRoute(`/issues/${issueSlug}/${articleSlug}`),
  dispatchDirect: (articleSlug: string) => hdRoute(`/dispatches/${articleSlug}`),
  get monograph01() {
    return hdRoute('/issues/monograph-01-atmosphere-without-borders');
  },
  monograph01Chapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-01-atmosphere-without-borders/chapters/${chapterSlug}`),
  monograph01Appendix: (appendixSlug: string) =>
    hdRoute(`/issues/monograph-01-atmosphere-without-borders/appendices/${appendixSlug}`),
  get monograph02() {
    return hdRoute('/issues/monograph-02-selective-environmental-consciousness');
  },
  monograph02Chapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-02-selective-environmental-consciousness/chapters/${chapterSlug}`),
  get monograph03() {
    return hdRoute('/issues/monograph-03-mathematics-of-a-dying-lake');
  },
  monograph03Chapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-03-mathematics-of-a-dying-lake/chapters/${chapterSlug}`),
  get monographResearchAccountability() {
    return hdRoute('/issues/monograph-04-who-are-we-researching-for');
  },
  monographResearchAccountabilityChapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-04-who-are-we-researching-for/chapters/${chapterSlug}`),
  get monograph04() {
    return hdRoute('/issues/monograph-04-the-sky-has-no-borders');
  },
  monograph04Chapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-04-the-sky-has-no-borders/chapters/${chapterSlug}`),
  get monograph06() {
    return hdRoute('/issues/monograph-06-when-politics-promises-green');
  },
  monograph06Chapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-06-when-politics-promises-green/chapters/${chapterSlug}`),
  get monographEnvironmentalLaw() {
    return hdRoute('/issues/monograph-07-when-environmental-laws-exist');
  },
  monographEnvironmentalLawChapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-07-when-environmental-laws-exist/chapters/${chapterSlug}`),
  get monographSouthAsianVanguard() {
    return hdRoute('/issues/monograph-08-south-asias-environmental-vanguard');
  },
  monographSouthAsianVanguardChapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-08-south-asias-environmental-vanguard/chapters/${chapterSlug}`),
  get monograph09() {
    return hdRoute('/issues/monograph-09-the-national-park-that-became-a-golf-course');
  },
  monograph09Chapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-09-the-national-park-that-became-a-golf-course/chapters/${chapterSlug}`),
  get monograph10() {
    return hdRoute('/issues/monograph-10-the-laboratory-that-kashmir-lost');
  },
  monograph10Chapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-10-the-laboratory-that-kashmir-lost/chapters/${chapterSlug}`),
  get monograph11() {
    return hdRoute('/issues/monograph-11-the-art-of-encroachment');
  },
  monograph11Chapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-11-the-art-of-encroachment/chapters/${chapterSlug}`),
  get monographPriceOfPower() {
    return hdRoute('/issues/monograph-12-the-price-of-power');
  },
  monographPriceOfPowerChapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-12-the-price-of-power/chapters/${chapterSlug}`),
  get monograph13() {
    return hdRoute('/issues/monograph-13-the-western-himalayas-are-sitting-on-a-time-bomb');
  },
  monograph13Chapter: (chapterSlug: string) =>
    hdRoute(
      `/issues/monograph-13-the-western-himalayas-are-sitting-on-a-time-bomb/chapters/${chapterSlug}`
    ),
  get monographNaseemBaghChinars() {
    return hdRoute('/issues/monograph-14-the-chinars-in-the-shadow-of-concrete');
  },
  monographNaseemBaghChinarsChapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-14-the-chinars-in-the-shadow-of-concrete/chapters/${chapterSlug}`),
  get monograph15() {
    return hdRoute('/issues/monograph-15-journalism-at-a-crossroads');
  },
  monograph15Chapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-15-journalism-at-a-crossroads/chapters/${chapterSlug}`),
  get monographWealthBeneathMountains() {
    return hdRoute('/issues/monograph-16-the-wealth-beneath-the-mountains');
  },
  monographWealthBeneathMountainsChapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-16-the-wealth-beneath-the-mountains/chapters/${chapterSlug}`),
  get mediaTransparencyObservatory() {
    return hdRoute('/media-transparency-observatory');
  },
  get monograph17() {
    return hdRoute('/issues/monograph-17-the-rivers-that-no-longer-belong-to-their-valleys');
  },
  monograph17Chapter: (chapterSlug: string) =>
    hdRoute(
      `/issues/monograph-17-the-rivers-that-no-longer-belong-to-their-valleys/chapters/${chapterSlug}`
    ),
  get monograph18() {
    return hdRoute('/issues/monograph-18-jammus-ecological-frontiers');
  },
  monograph18Chapter: (chapterSlug: string) =>
    hdRoute(`/issues/monograph-18-jammus-ecological-frontiers/chapters/${chapterSlug}`),
  get ladakhEcologicalFrontiers() {
    return hdRoute('/issues/ladakhs-ecological-frontiers');
  },
  ladakhEcologicalFrontiersChapter: (chapterSlug: string) =>
    hdRoute(`/issues/ladakhs-ecological-frontiers/chapters/${chapterSlug}`),
  get forthcoming() {
    return hdRoute('/forthcoming');
  },
  get departments() {
    return hdRoute('/departments');
  },
  get journalists() {
    return hdRoute('/journalists');
  },
  journalistPortfolio: (slug: string) => hdRoute(`/journalists/${slug}`),
  get editorialBoard() {
    return hdRoute('/editorial-board');
  },
  get archive() {
    return hdRoute('/archive');
  },

  // 2. Editorial Departments
  department: (slug: DepartmentRouteSlug) => hdRoute(`/departments/${slug}`),

  // 3. Regional Bureaus
  get bureausOverview() {
    return hdRoute('/bureaus');
  },
  bureau: (slug: BureauRouteSlug) => hdRoute(`/bureaus/${slug}`),

  // 4. Editorial Recruitment
  get joinNewsroom() {
    return hdRoute('/join-newsroom');
  },
  get correspondentApplications() {
    return hdRoute('/correspondent-applications');
  },
  get editorialAppointments() {
    return hdRoute('/editorial-appointments');
  },
  get contributorGuidelines() {
    return hdRoute('/contributor-guidelines');
  },
  get pitch() {
    return hdRoute('/pitch');
  },
  get journalistSignIn() {
    return hdRoute('/journalist-sign-in');
  },

  // 5. Editorial Affairs & Authenticated Newsroom / CMS
  get editorialDirectorate() {
    return hdRoute('/editorial-directorate');
  },
  get editorialCalendar() {
    return hdRoute('/editorial-calendar');
  },
  get reportingBeats() {
    return hdRoute('/reporting-beats');
  },
  reportingBeat: (beatSlug: BeatRouteSlug | string) => hdRoute(`/reporting-beats/${beatSlug}`),
  get corrections() {
    return hdRoute('/corrections');
  },
  correctionRecord: (recordId: string) => hdRoute(`/corrections/${recordId}`),
  get newsroom() {
    return hdRoute('/newsroom');
  },
  get editorialCms() {
    return hdRoute('/editorial-cms');
  },
  get publicEditor() {
    return hdRoute('/public-editor');
  },

  // 6. Publishing & Governance
  get ourStory() {
    return hdRoute('/our-story');
  },
  get imprint() {
    return hdRoute('/imprint');
  },
  get editorialCharter() {
    return hdRoute('/editorial-charter');
  },
  get sourceProtection() {
    return hdRoute('/source-protection-verification');
  },
  get scientificReview() {
    return hdRoute('/scientific-review');
  },
  get ethicsGovernance() {
    return hdRoute('/ethics-governance');
  },
  get rightsPermissions() {
    return hdRoute('/rights-permissions');
  },

  // 7. Supporting Editorial Pages & Syndication
  get search() {
    return hdRoute('/search');
  },
  get readerComplaints() {
    return hdRoute('/reader-complaints');
  },
  get contact() {
    return hdRoute('/contact');
  },
  get contactMessage() {
    return hdRoute('/contact/message');
  },
  get contactEnvironmentalInfo() {
    return hdRoute('/contact/environmental-information');
  },
  get contactTrack() {
    return hdRoute('/contact/track');
  },
  contactThread: (reference: string) =>
    hdRoute(`/contact/thread/${encodeURIComponent(reference)}`),
  get adminCorrespondence() {
    return hdRoute('/admin/correspondence');
  },
  get feedXml() {
    return hdRoute('/feed.xml');
  },
};

export const DEPARTMENT_ID_TO_ROUTE_SLUG: Record<EditorialDepartmentId, DepartmentRouteSlug> = {
  'cover-stories': 'cover-stories',
  'longform-features': 'longform-features',
  'field-reports': 'field-reports',
  'investigative-journalism': 'investigative-desk',
  'photo-essays': 'visual-journal',
  'data-journalism': 'data-journalism',
  interviews: 'interviews-editorials',
  editorials: 'interviews-editorials',
};

export const DEPARTMENT_ROUTE_CONFIG: Record<
  DepartmentRouteSlug,
  {
    routeSlug: DepartmentRouteSlug;
    name: string;
    folioRoman: string;
    kicker: string;
    tagline: string;
    editorialIntroduction: string;
    editorialMandate: string;
    submissionGuidelines: string[];
    wordCountGuide: string;
    matchingDepartmentIds: EditorialDepartmentId[];
    primaryCommissionDepartmentId: EditorialDepartmentId;
    layoutVariant:
      | 'cover_monumental'
      | 'longform_literary'
      | 'field_diptych'
      | 'investigative_ledger'
      | 'darkroom_plates'
      | 'cartographic_data'
      | 'dialogue_charter';
  }
> = {
  'cover-stories': {
    routeSlug: 'cover-stories',
    name: 'Cover Stories',
    folioRoman: 'I',
    kicker: 'DEPARTMENT I · COVER INQUIRIES',
    tagline: 'Defining reckonings at the roof of the Western Himalayas.',
    editorialIntroduction:
      'Every monthly edition of Himalayan Dispatch opens with a single cover inquiry—reported across seasons and elevations where cryospheric thresholds, hydrological survival, and human ambition intersect.',
    editorialMandate:
      'Unites multi-valley field reporting, oral mountain memory, documentary plates, and Stage 05 scientific review into a flagship narrative centerpiece.',
    submissionGuidelines: [
      'Cover inquiries are typically commissioned six to twelve weeks ahead of edition close, though exceptional long-horizon pitches with established field access are considered.',
      'Proposals must identify a decisive Western Himalayan threshold—physical, ecological, or institutional—supported by primary field observation and empirical baselines.',
      'Expected scope: 3,500 to 6,500 words paired with original documentary photography or cartographic plates.',
    ],
    wordCountGuide: '3,500 – 6,500 words · Multi-chapter inquiry',
    matchingDepartmentIds: ['cover-stories'],
    primaryCommissionDepartmentId: 'cover-stories',
    layoutVariant: 'cover_monumental',
  },
  'longform-features': {
    routeSlug: 'longform-features',
    name: 'Longform Features',
    folioRoman: 'II',
    kicker: 'DEPARTMENT II · THE BIG READ',
    tagline: 'Unhurried literary narratives on water, memory, and landscape.',
    editorialIntroduction:
      'Longform Features—anchored in each issue as The Big Read—give environmental change the narrative room that daily news cycles deny: tracing buried urban canals, disappearing karst springsheds, and transhumant mountain trails.',
    editorialMandate:
      'Deep narrative essays of 3,000 to 6,000 words grounded in months of immersion, archival excavation, and literary craft.',
    submissionGuidelines: [
      'Pitch a specific place, watershed, or historical transformation rather than a generalized topic summary.',
      'Outline archival sources, neighborhood or highland informants, and scientific literature you plan to consult.',
      'All empirical measurements cited within narrative prose undergo line-by-line Stage 04 fact-checking.',
    ],
    wordCountGuide: '3,000 – 6,000 words · Literary narrative',
    matchingDepartmentIds: ['longform-features'],
    primaryCommissionDepartmentId: 'longform-features',
    layoutVariant: 'longform_literary',
  },
  'field-reports': {
    routeSlug: 'field-reports',
    name: 'Field Reports',
    folioRoman: 'III',
    kicker: 'DEPARTMENT III · DISPATCHES FROM THE FIELD',
    tagline: 'Intimate dispatches from wetlands, pastures, and forest lines.',
    editorialIntroduction:
      'Filed directly from Ramsar reed margins, subalpine forest compartments, orchard terraces, and high passes, Field Reports capture the lived daily texture of ecological stewardship and environmental stress.',
    editorialMandate:
      'Firsthand observational notebooks from transition zones across all six Western Himalayan regional bureaus.',
    submissionGuidelines: [
      'Must be grounded in direct on-site reporting with verifiable datelines, seasonal observations, and named or transparently protected local voices.',
      'Ideal entry point for District Correspondents, Environmental Reporters, and supervised Student Journalists.',
      'Expected scope: 1,500 to 2,800 words with optional field photographs.',
    ],
    wordCountGuide: '1,500 – 2,800 words · Datelined field notebook',
    matchingDepartmentIds: ['field-reports'],
    primaryCommissionDepartmentId: 'field-reports',
    layoutVariant: 'field_diptych',
  },
  'investigative-desk': {
    routeSlug: 'investigative-desk',
    name: 'Investigative Desk',
    folioRoman: 'IV',
    kicker: 'DEPARTMENT IV · DOCUMENTARY ACCOUNTABILITY',
    tagline: 'Evidence-led reporting following extraction, contracts, and statutory duty.',
    editorialIntroduction:
      'The Investigative Desk cross-examines environmental clearances, riverbed mining leases, floodplain encroachments, muck-disposal dockets, and multi-temporal satellite imagery—while enforcing strict source confidentiality and pre-publication right of reply.',
    editorialMandate:
      'Documentary public-interest investigations corroborated by physical measurements, official filings, and independent scientific review.',
    submissionGuidelines: [
      'Do not transmit raw whistleblower documents or confidential source identities through standard web forms; request an encrypted handoff via the Commissioning Desk.',
      'Investigative manuscripts require a primary-source evidence binder indexing every material factual allegation.',
      'Substantive institutional allegations require documented right-of-reply outreach prior to Stage 06 approval.',
    ],
    wordCountGuide: '2,800 – 5,500 words · Corroborated dossier',
    matchingDepartmentIds: ['investigative-journalism'],
    primaryCommissionDepartmentId: 'investigative-journalism',
    layoutVariant: 'investigative_ledger',
  },
  'visual-journal': {
    routeSlug: 'visual-journal',
    name: 'The Visual Journal',
    folioRoman: 'V',
    kicker: 'DEPARTMENT V · DOCUMENTARY PHOTOGRAPHY & PLATES',
    tagline: 'Slow, large-format visual storytelling in monochrome and natural light.',
    editorialIntroduction:
      'Presented in gallery-paced sequences with generous negative space and darkroom discipline, The Visual Journal treats documentary mountain photography as primary historical witness rather than decorative illustration.',
    editorialMandate:
      'Curated monochrome and natural-light photographic essays with zero digital fabrication, composite staging, or misleading tonal manipulation.',
    submissionGuidelines: [
      'Submit a coherent sequence of 6 to 14 plates accompanied by exact location, elevation (where non-sensitive), date, lens/exposure notes, and a 600–1,500 word photographer’s essay.',
      'Synthetic or digitally fabricated imagery, composite sky replacements, and staged wildlife baiting are strictly prohibited under the Himalayan Dispatch Charter.',
      'RAW or original scan provenance may be inspected by the Digital & Visual Verification Editor prior to publication.',
    ],
    wordCountGuide: '6 – 14 archival plates + 600 – 1,500 word essay',
    matchingDepartmentIds: ['photo-essays'],
    primaryCommissionDepartmentId: 'photo-essays',
    layoutVariant: 'darkroom_plates',
  },
  'data-journalism': {
    routeSlug: 'data-journalism',
    name: 'Data Journalism',
    folioRoman: 'VI',
    kicker: 'DEPARTMENT VI · CARTOGRAPHY & NUMBERS',
    tagline: 'Bespoke print-inspired visual essays translating decadal records into human scale.',
    editorialIntroduction:
      'Rather than generic software widgets, our Data Journalism desk crafts bespoke editorial graphics, elevation-band horizon ledgers, and watershed maps woven directly into literary prose.',
    editorialMandate:
      'Empirical visual storytelling pairing KEW Earth observation and hydrological series with transparent methodology notes and uncertainty bounds.',
    submissionGuidelines: [
      'Proposals must specify the underlying primary dataset (e.g., Landsat/Sentinel optical archive, station discharge series, statutory census) and its temporal window.',
      'All statistical transformations and smoothing windows are audited by the Data & Evidence Verification Editor and Scientific Review Council.',
      'Expected scope: 1,800 to 3,500 words + 1 to 3 custom editorial figures.',
    ],
    wordCountGuide: '1,800 – 3,500 words + bespoke visual figures',
    matchingDepartmentIds: ['data-journalism'],
    primaryCommissionDepartmentId: 'data-journalism',
    layoutVariant: 'cartographic_data',
  },
  'interviews-editorials': {
    routeSlug: 'interviews-editorials',
    name: 'Interviews & Editorials',
    folioRoman: 'VII',
    kicker: 'DEPARTMENT VII · THE CONVERSATION & FROM THE MASTHEAD',
    tagline: 'Extended dialogues with mountain thinkers alongside signed masthead essays.',
    editorialIntroduction:
      'Uniting The Conversation—our longform Q&A portrait series with glaciologists, hydrologists, jurists, and land custodians—with signed Editorials and guest columns articulating the ethical stakes of Himalayan stewardship.',
    editorialMandate:
      'Unhurried intellectual dialogue and principled commentary clearly distinguished from straight news reporting.',
    submissionGuidelines: [
      'Interview proposals should explain why the subject’s decades of field, legal, or community experience illuminate an urgent Western Himalayan question.',
      'Recorded transcripts are edited for concision and flow only with verification against original audio/notes; material factual assertions remain subject to fact-checking.',
      'Guest commentary (1,200–2,200 words) requires full disclosure of institutional affiliations and potential conflicts of interest.',
    ],
    wordCountGuide: '2,000 – 4,000 words (Q&A) · 1,200 – 2,200 words (Essays)',
    matchingDepartmentIds: ['interviews', 'editorials'],
    primaryCommissionDepartmentId: 'interviews',
    layoutVariant: 'dialogue_charter',
  },
};

export const CANONICAL_EDITION_SLUG_MAP: Record<string, string> = {
  'vol-01-no-01': 'volume-01-issue-01',
  'volume-01-issue-01': 'volume-01-issue-01',
  'monograph-00-watershed-voices': 'monograph-00-watershed-voices',
  'monograph-01-atmosphere-without-borders': 'monograph-01-atmosphere-without-borders',
  'monograph-02-selective-environmental-consciousness':
    'monograph-02-selective-environmental-consciousness',
  'monograph-03-mathematics-of-a-dying-lake':
    'monograph-03-mathematics-of-a-dying-lake',
  'monograph-04-who-are-we-researching-for':
    'monograph-04-who-are-we-researching-for',
  'monograph-04-the-sky-has-no-borders': 'monograph-04-the-sky-has-no-borders',
  'monograph-06-when-politics-promises-green':
    'monograph-06-when-politics-promises-green',
  'monograph-07-when-environmental-laws-exist':
    'monograph-07-when-environmental-laws-exist',
  'monograph-08-south-asias-environmental-vanguard':
    'monograph-08-south-asias-environmental-vanguard',
  'monograph-09-the-national-park-that-became-a-golf-course':
    'monograph-09-the-national-park-that-became-a-golf-course',
  'monograph-10-the-laboratory-that-kashmir-lost':
    'monograph-10-the-laboratory-that-kashmir-lost',
  'monograph-11-the-art-of-encroachment':
    'monograph-11-the-art-of-encroachment',
  'monograph-12-the-price-of-power': 'monograph-12-the-price-of-power',
  'monograph-13-the-western-himalayas-are-sitting-on-a-time-bomb':
    'monograph-13-the-western-himalayas-are-sitting-on-a-time-bomb',
  'monograph-14-the-chinars-in-the-shadow-of-concrete':
    'monograph-14-the-chinars-in-the-shadow-of-concrete',
  'monograph-15-journalism-at-a-crossroads':
    'monograph-15-journalism-at-a-crossroads',
  'monograph-16-the-wealth-beneath-the-mountains':
    'monograph-16-the-wealth-beneath-the-mountains',
  'monograph-17-the-rivers-that-no-longer-belong-to-their-valleys':
    'monograph-17-the-rivers-that-no-longer-belong-to-their-valleys',
  'monograph-18-jammus-ecological-frontiers':
    'monograph-18-jammus-ecological-frontiers',
  'ladakhs-ecological-frontiers': 'ladakhs-ecological-frontiers',
  'issue-02-a-world-in-transition': 'issue-02-a-world-in-transition',
};

export function toCanonicalIssueSlug(editionSlug: string): string {
  return CANONICAL_EDITION_SLUG_MAP[editionSlug] || editionSlug;
}

export function fromCanonicalIssueSlug(routeIssueSlug: string): string {
  if (routeIssueSlug === 'volume-01-issue-01') return 'vol-01-no-01';
  return routeIssueSlug;
}

export function resolveCanonicalStoryUrl(story: {
  slug: string;
  editionSlug: string;
}): string {
  const canonIssue = toCanonicalIssueSlug(story.editionSlug);
  return HD_ROUTES.issueArticle(canonIssue, story.slug);
}

export function resolveLegacyDeptQueryToSlug(deptParam: string): DepartmentRouteSlug | null {
  const clean = deptParam.trim().toLowerCase();
  const map: Record<string, DepartmentRouteSlug> = {
    'cover-stories': 'cover-stories',
    'longform-features': 'longform-features',
    'field-reports': 'field-reports',
    'investigative-journalism': 'investigative-desk',
    'investigative-desk': 'investigative-desk',
    'photo-essays': 'visual-journal',
    'visual-journal': 'visual-journal',
    'data-journalism': 'data-journalism',
    interviews: 'interviews-editorials',
    editorials: 'interviews-editorials',
    'interviews-editorials': 'interviews-editorials',
  };
  return map[clean] || null;
}

const FRAGMENT_BUREAUS_MAP: Record<string, string> = {
  get '#kashmir-bureau'() { return HD_ROUTES.bureau('kashmir'); },
  get '#jammu-bureau'() { return HD_ROUTES.bureau('jammu'); },
  get '#ladakh-bureau'() { return HD_ROUTES.bureau('ladakh'); },
  get '#ajk-bureau'() { return HD_ROUTES.bureau('ajk'); },
  get '#gilgit-bureau'() { return HD_ROUTES.bureau('gilgit'); },
  get '#baltistan-bureau'() { return HD_ROUTES.bureau('baltistan'); },
  get '#reporting-beats'() { return HD_ROUTES.reportingBeats; },
};

const FRAGMENT_JOIN_MAP: Record<string, string> = {
  get '#editorial-appointments'() { return HD_ROUTES.editorialAppointments; },
  get '#contributor-guidelines'() { return HD_ROUTES.contributorGuidelines; },
};

const FRAGMENT_FORTHCOMING_MAP: Record<string, string> = {
  get '#editorial-calendar'() { return HD_ROUTES.editorialCalendar; },
};

const FRAGMENT_BOARD_MAP: Record<string, string> = {
  get '#editorial-directorate'() { return HD_ROUTES.editorialDirectorate; },
  get '#corrections-policy'() { return HD_ROUTES.corrections; },
  get '#publication-imprint'() { return HD_ROUTES.imprint; },
  get '#editorial-ethics'() { return HD_ROUTES.editorialCharter; },
  get '#source-protection'() { return HD_ROUTES.sourceProtection; },
  get '#scientific-review'() { return HD_ROUTES.scientificReview; },
  get '#rights-permissions'() { return HD_ROUTES.rightsPermissions; },
  get '#public-editor'() { return HD_ROUTES.publicEditor; },
};

export const LEGACY_FRAGMENT_REDIRECTS: Record<string, Record<string, string>> = {
  '/bureaus': FRAGMENT_BUREAUS_MAP,
  '/himalayan-dispatch/bureaus': FRAGMENT_BUREAUS_MAP,
  '/join-newsroom': FRAGMENT_JOIN_MAP,
  '/himalayan-dispatch/join-newsroom': FRAGMENT_JOIN_MAP,
  '/forthcoming': FRAGMENT_FORTHCOMING_MAP,
  '/himalayan-dispatch/forthcoming': FRAGMENT_FORTHCOMING_MAP,
  '/editorial-board': FRAGMENT_BOARD_MAP,
  '/himalayan-dispatch/editorial-board': FRAGMENT_BOARD_MAP,
};

// ─── FINAL FOOTER NAVIGATION STRUCTURE (HOSTNAME-AWARE GETTERS) ──────────────

export const FOOTER_PERIODICAL_LINKS: Array<{ label: string; readonly href: string }> = [
  { label: 'Daily Dispatch', get href() { return HD_ROUTES.dailyDispatch; } },
  { label: 'The Current Issue', get href() { return HD_ROUTES.currentIssue; } },
  { label: 'The Inaugural Issue', get href() { return HD_ROUTES.inauguralIssue; } },
  { label: 'Forthcoming Edition', get href() { return HD_ROUTES.forthcoming; } },
  { label: 'Editorial Departments', get href() { return HD_ROUTES.departments; } },
  { label: 'Journalists & Portfolios', get href() { return HD_ROUTES.journalists; } },
  { label: 'Editorial Board', get href() { return HD_ROUTES.editorialBoard; } },
  { label: 'Edition Archive', get href() { return HD_ROUTES.archive; } },
];

export const FOOTER_DEPARTMENT_LINKS: Array<{ label: string; readonly href: string }> = [
  { label: 'Cover Stories', get href() { return HD_ROUTES.department('cover-stories'); } },
  { label: 'Longform Features', get href() { return HD_ROUTES.department('longform-features'); } },
  { label: 'Field Reports', get href() { return HD_ROUTES.department('field-reports'); } },
  { label: 'Investigative Desk', get href() { return HD_ROUTES.department('investigative-desk'); } },
  { label: 'The Visual Journal', get href() { return HD_ROUTES.department('visual-journal'); } },
  { label: 'Data Journalism', get href() { return HD_ROUTES.department('data-journalism'); } },
  { label: 'Interviews & Editorials', get href() { return HD_ROUTES.department('interviews-editorials'); } },
];

export const FOOTER_BUREAU_LINKS: Array<{
  id: BureauRouteSlug;
  label: string;
  readonly href: string;
  establishing: boolean;
}> = [
  { id: 'kashmir', label: 'Kashmir Bureau', get href() { return HD_ROUTES.bureau('kashmir'); }, establishing: false },
  { id: 'jammu', label: 'Jammu Bureau', get href() { return HD_ROUTES.bureau('jammu'); }, establishing: false },
  { id: 'ladakh', label: 'Ladakh Bureau', get href() { return HD_ROUTES.bureau('ladakh'); }, establishing: false },
  { id: 'ajk', label: 'AJ&K Bureau', get href() { return HD_ROUTES.bureau('ajk'); }, establishing: true },
  { id: 'gilgit', label: 'Gilgit Bureau', get href() { return HD_ROUTES.bureau('gilgit'); }, establishing: true },
  { id: 'baltistan', label: 'Baltistan Bureau', get href() { return HD_ROUTES.bureau('baltistan'); }, establishing: true },
];

export const FOOTER_RECRUITMENT_LINKS: Array<{
  label: string;
  readonly href: string;
  featured: boolean;
}> = [
  { label: 'Join the Newsroom', get href() { return HD_ROUTES.joinNewsroom; }, featured: true },
  { label: 'Correspondent Applications', get href() { return HD_ROUTES.correspondentApplications; }, featured: false },
  { label: 'Editorial Appointments', get href() { return HD_ROUTES.editorialAppointments; }, featured: false },
  { label: 'Contributor Guidelines', get href() { return HD_ROUTES.contributorGuidelines; }, featured: false },
  { label: 'Commissioning & Pitch Desk', get href() { return HD_ROUTES.pitch; }, featured: false },
  { label: 'Journalist Sign In', get href() { return HD_ROUTES.journalistSignIn; }, featured: false },
];

export const FOOTER_EDITORIAL_AFFAIRS_LINKS: Array<{ label: string; readonly href: string }> = [
  { label: 'Editorial Directorate', get href() { return HD_ROUTES.editorialDirectorate; } },
  { label: 'Editorial Calendar', get href() { return HD_ROUTES.editorialCalendar; } },
  { label: 'Reporting Beats', get href() { return HD_ROUTES.reportingBeats; } },
  { label: 'Corrections & Clarifications', get href() { return HD_ROUTES.corrections; } },
  { label: 'Newsroom Desk', get href() { return HD_ROUTES.newsroom; } },
  { label: 'Public Editor & Ombudsperson', get href() { return HD_ROUTES.publicEditor; } },
  { label: 'Contact the Editorial Desk', get href() { return HD_ROUTES.contact; } },
];

export const FOOTER_GOVERNANCE_LINKS: Array<{ label: string; readonly href: string }> = [
  { label: 'Our Founding Story', get href() { return HD_ROUTES.ourStory; } },
  { label: 'Publication Imprint', get href() { return HD_ROUTES.imprint; } },
  { label: 'Editorial Charter', get href() { return HD_ROUTES.editorialCharter; } },
  { label: 'Source Protection & Verification', get href() { return HD_ROUTES.sourceProtection; } },
  { label: 'Scientific Review', get href() { return HD_ROUTES.scientificReview; } },
  { label: 'Ethics & Governance', get href() { return HD_ROUTES.ethicsGovernance; } },
  { label: 'Rights & Permissions', get href() { return HD_ROUTES.rightsPermissions; } },
];

export const FOOTER_SUPPORTING_LINKS: Array<{ label: string; readonly href: string }> = [
  { label: 'Daily Dispatch Archive', get href() { return HD_ROUTES.dailyDispatchArchive; } },
  { label: 'Reader Complaints', get href() { return HD_ROUTES.readerComplaints; } },
  { label: 'Contact the Editorial Desk', get href() { return HD_ROUTES.contact; } },
];
