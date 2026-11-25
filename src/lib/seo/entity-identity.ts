// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — CANONICAL INSTITUTIONAL ENTITY & DISCOVERY TARGETS
// Single machine-readable source of truth for Brand Entity Protection,
// Organization/WebSite JSON-LD, Metadata, Citations, and Discovery Governance.
// ─────────────────────────────────────────────────────────────────────────────

export const CANONICAL_SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://kashmir-ecowatch.com'
).replace(/\/+$/, '');

export const CANONICAL_HOMEPAGE_URL = `${CANONICAL_SITE_URL}/`;
export const ORGANIZATION_ENTITY_ID = `${CANONICAL_SITE_URL}/#organization`;
export const WEBSITE_ENTITY_ID = `${CANONICAL_SITE_URL}/#website`;

export interface P0BrandKeywordDefinition {
  id: string;
  keyword: string;
  targetPosition: '#1' | '#1 aspiration';
  preferredDestination: string;
  isStandaloneAcronym?: boolean;
  variations: string[];
  competitorContext: string;
  googleSearchUrl: string;
  bingSearchUrl: string;
}

export const SIX_PRIORITY_BRAND_KEYWORDS: readonly P0BrandKeywordDefinition[] = [
  {
    id: 'kw-1-spaced',
    keyword: 'Kashmir Eco Watch',
    targetPosition: '#1',
    preferredDestination: CANONICAL_HOMEPAGE_URL,
    variations: ['kashmir eco watch', 'KASHMIR ECO WATCH', 'Kashmir Eco-Watch', 'kashmir-eco-watch'],
    competitorContext: 'Currently overlaps in organic/AI results with Jammu & Kashmir Eco-Watch (J&K Eco-Watch grassroots movement) and EcoWatch.com.',
    googleSearchUrl: 'https://www.google.com/search?q=Kashmir+Eco+Watch',
    bingSearchUrl: 'https://www.bing.com/search?q=Kashmir+Eco+Watch',
  },
  {
    id: 'kw-2-camel',
    keyword: 'Kashmir Ecowatch',
    targetPosition: '#1',
    preferredDestination: CANONICAL_HOMEPAGE_URL,
    variations: ['Kashmir EcoWatch', 'kashmir ecowatch', 'kashmirecowatch', 'KASHMIR ECOWATCH'],
    competitorContext: 'Primary exact-brand compound name; currently conflated with J&K Eco-Watch prior to VPS deployment and GSC recrawl.',
    googleSearchUrl: 'https://www.google.com/search?q=Kashmir+Ecowatch',
    bingSearchUrl: 'https://www.bing.com/search?q=Kashmir+Ecowatch',
  },
  {
    id: 'kw-3-acronym',
    keyword: 'KEW',
    targetPosition: '#1 aspiration',
    preferredDestination: CANONICAL_HOMEPAGE_URL,
    isStandaloneAcronym: true,
    variations: ['kew', 'K.E.W.'],
    competitorContext: 'Globally shared acronym dominated by Royal Botanic Gardens, Kew (kew.org) and Kew, London; aspirational target via regional & environmental context.',
    googleSearchUrl: 'https://www.google.com/search?q=KEW',
    bingSearchUrl: 'https://www.bing.com/search?q=KEW',
  },
  {
    id: 'kw-4-spaced-wh',
    keyword: 'Kashmir Eco Watch Western Himalayan',
    targetPosition: '#1',
    preferredDestination: CANONICAL_HOMEPAGE_URL,
    variations: [
      'kashmir eco watch western himalayan',
      'Kashmir Eco-Watch Western Himalayan',
      'Kashmir Eco Watch Western Himalaya',
    ],
    competitorContext: 'High-specificity institutional query; realistic P0 candidate for undisputed #1 ownership.',
    googleSearchUrl: 'https://www.google.com/search?q=Kashmir+Eco+Watch+Western+Himalayan',
    bingSearchUrl: 'https://www.bing.com/search?q=Kashmir+Eco+Watch+Western+Himalayan',
  },
  {
    id: 'kw-5-camel-wh',
    keyword: 'Kashmir Ecowatch Western Himalayan',
    targetPosition: '#1',
    preferredDestination: CANONICAL_HOMEPAGE_URL,
    variations: [
      'Kashmir EcoWatch Western Himalayan',
      'kashmir ecowatch western himalayan',
      'Kashmir EcoWatch Western Himalaya',
    ],
    competitorContext: 'Full canonical institutional name; primary disambiguator separating KEW from grassroots J&K Eco-Watch.',
    googleSearchUrl: 'https://www.google.com/search?q=Kashmir+Ecowatch+Western+Himalayan',
    bingSearchUrl: 'https://www.bing.com/search?q=Kashmir+Ecowatch+Western+Himalayan',
  },
  {
    id: 'kw-6-short-wh',
    keyword: 'KEW Western Himalayan',
    targetPosition: '#1',
    preferredDestination: CANONICAL_HOMEPAGE_URL,
    variations: ['kew western himalayan', 'KEW - Western Himalayan', 'KEW Western Himalaya'],
    competitorContext: 'Short institutional name; currently surfaces Royal Botanic Gardens Kew Himalayan herbarium collections until KEW pages are recrawled.',
    googleSearchUrl: 'https://www.google.com/search?q=KEW+Western+Himalayan',
    bingSearchUrl: 'https://www.bing.com/search?q=KEW+Western+Himalayan',
  },
] as const;

export const KEW_IDENTITY = {
  officialName: 'Kashmir EcoWatch',
  extendedName: 'Kashmir EcoWatch Western Himalayan',
  shortInstitutionalName: 'KEW Western Himalayan',
  shortName: 'KEW',
  alternativeName: 'KEW Western Himalayan',
  applicationName: 'KEW Western Himalayan',
  homepageTitle: 'Kashmir EcoWatch (KEW) | Western Himalayan',
  homepageH1: 'Kashmir EcoWatch',
  homepageSubtitle: 'KEW Western Himalayan',
  homepageDescription:
    'Kashmir EcoWatch (KEW Western Himalayan) provides environmental intelligence, satellite monitoring, GIS, biodiversity research, climate science and ecological assessments across the Western Himalaya.',
  organizationDescription:
    'Western Himalayan environmental intelligence, scientific research, GIS, satellite monitoring and ecological assessment platform.',
  platformDescriptor: 'Western Himalayan Environmental Intelligence Platform',
  historicalPredecessor: 'Environment and Service Research Organization (ESRO)',
  foundingYear: '2004',
  entityId: ORGANIZATION_ENTITY_ID,
  websiteId: WEBSITE_ENTITY_ID,
  domain: 'kashmir-ecowatch.com',
  canonicalUrl: CANONICAL_HOMEPAGE_URL,
  logoPath: '/kew_LOGO.png',
  logoUrl: `${CANONICAL_SITE_URL}/kew_LOGO.png`,
  contactEmail: 'contact@kashmir-ecowatch.com',
  headquartersLocality: 'Loudoun County',
  headquartersRegion: 'Virginia',
  headquartersCountry: 'US',
  primaryDiscipline: 'Environmental science',
  specialization: 'Geospatial and ecological intelligence',
  geographicalScope: 'Western Himalaya',
  coveredRegions: [
    'Kashmir Valley',
    'Jammu',
    'Ladakh',
    'Azad Jammu & Kashmir',
    'Gilgit-Baltistan',
  ],
  institutionalCharacter: 'Independent, non-commercial, non-political',
  defaultLicenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
  defaultLicenseLabel: 'CC BY 4.0 (Creative Commons Attribution 4.0 International)',
  twitterHandle: '@KashmirEcoWatch',
  organizationAlternateNames: [
    'Kashmir EcoWatch Western Himalayan',
    'KEW Western Himalayan',
    'Kashmir Eco Watch Western Himalayan',
    'Kashmir Eco Watch',
    'Kashmir Ecowatch',
    'KEW',
  ],
  websiteAlternateNames: [
    'KEW Western Himalayan',
    'Kashmir EcoWatch Western Himalayan',
    'KEW',
    'kashmir-ecowatch.com',
  ],
  institutionalBacking: [
    {
      name: 'Dr. Kumar Foundation USA',
      url: 'https://dkf.sufisciencecenter.info/',
      relationship: 'Parent Philanthropic & Institutional Sponsor',
    },
    {
      name: 'Kumar Trust USA',
      relationship: 'Supporting Institutional Trust',
    },
  ],
  officialSocialProfiles: [
    'https://www.facebook.com/Kashmirecowatch/',
    'https://x.com/KashmirEcoWatch',
    'https://www.linkedin.com/company/kashmir-ecowatch/',
    'https://www.youtube.com/channel/UCraDr3i5A3k0j7typ6tOOsQ',
    'https://www.youtube.com/playlist?list=PLhu9NyNCTr7jRfvo6ktcYSayRtURCDVnM',
  ],
  knowsAbout: [
    'Western Himalayan Environmental Science',
    'Limnology and Alpine Lakes of Kashmir',
    'Ramsar Wetlands Conservation',
    'Himalayan Glaciology and Cryosphere Recession',
    'Jhelum and Indus Basin Hydrology',
    'Western Himalayan Biodiversity and Threatened Species',
    'Natural Hazard Early Warning and Geospatial Intelligence',
    'Air Quality and Environmental Pollution Monitoring',
    'Sectoral Environmental Impact Assessment (EIA)',
    'Environmental Governance and Public-Interest Stewardship',
  ],
} as const;

export type DiscoveryEcosystem =
  | 'global_search_engines'
  | 'ai_search_discovery'
  | 'scientific_discovery'
  | 'geospatial_environmental'
  | 'media_public_discovery';

export type TargetIntegrationMode =
  | 'webmaster_portal_and_sitemap'
  | 'indexnow_and_crawler'
  | 'crawler_and_structured_data'
  | 'ai_crawler_and_citations'
  | 'academic_meta_and_indexing'
  | 'repository_deposit_and_doi'
  | 'upstream_data_ecosystem'
  | 'geospatial_interoperability'
  | 'authorized_institutional_channel'
  | 'editorial_news_indexing';

export interface DiscoveryTargetDefinition {
  id: string;
  name: string;
  ecosystem: DiscoveryEcosystem;
  ecosystemLabel: string;
  domain: string;
  mode: TargetIntegrationMode;
  crawlerAgents?: string[];
  eligibilityNote: string;
  isUpstreamDataEcosystemOnly?: boolean;
  verificationEnvKey?: string;
}

export const THIRTY_SIX_DISCOVERY_TARGETS: DiscoveryTargetDefinition[] = [
  // ── 1. Global Search Engines (6 targets) ──────────────────────────────────
  {
    id: 'google',
    name: 'Google Search',
    ecosystem: 'global_search_engines',
    ecosystemLabel: 'Global Search Engines',
    domain: 'google.com',
    mode: 'webmaster_portal_and_sitemap',
    crawlerAgents: ['Googlebot'],
    eligibilityNote: 'Verified via Google Search Console DNS/meta token + XML Sitemap + Organization/Dataset/ScholarlyArticle JSON-LD.',
    verificationEnvKey: 'GOOGLE_SITE_VERIFICATION',
  },
  {
    id: 'bing',
    name: 'Bing Search',
    ecosystem: 'global_search_engines',
    ecosystemLabel: 'Global Search Engines',
    domain: 'bing.com',
    mode: 'indexnow_and_crawler',
    crawlerAgents: ['Bingbot'],
    eligibilityNote: 'Verified via Bing Webmaster Tools (msvalidate.01), XML Sitemap, and real-time IndexNow submissions.',
    verificationEnvKey: 'BING_SITE_VERIFICATION',
  },
  {
    id: 'yahoo',
    name: 'Yahoo Search',
    ecosystem: 'global_search_engines',
    ecosystemLabel: 'Global Search Engines',
    domain: 'yahoo.com',
    mode: 'crawler_and_structured_data',
    crawlerAgents: ['Slurp', 'Bingbot'],
    eligibilityNote: 'Powered primarily by Bing index + Slurp crawler; covered through Bing Webmaster Tools, IndexNow, and robots.txt.',
  },
  {
    id: 'duckduckgo',
    name: 'DuckDuckGo',
    ecosystem: 'global_search_engines',
    ecosystemLabel: 'Global Search Engines',
    domain: 'duckduckgo.com',
    mode: 'crawler_and_structured_data',
    crawlerAgents: ['DuckDuckBot', 'Bingbot'],
    eligibilityNote: 'Uses DuckDuckBot + Bing/syndicated web index; no separate webmaster registration portal exists.',
  },
  {
    id: 'baidu',
    name: 'Baidu',
    ecosystem: 'global_search_engines',
    ecosystemLabel: 'Global Search Engines',
    domain: 'baidu.com',
    mode: 'webmaster_portal_and_sitemap',
    crawlerAgents: ['Baiduspider'],
    eligibilityNote: 'Baiduspider allowed in robots.txt; Baidu Ziyuan portal verification optional via BAIDU_SITE_VERIFICATION.',
    verificationEnvKey: 'BAIDU_SITE_VERIFICATION',
  },
  {
    id: 'yandex',
    name: 'Yandex',
    ecosystem: 'global_search_engines',
    ecosystemLabel: 'Global Search Engines',
    domain: 'yandex.com',
    mode: 'indexnow_and_crawler',
    crawlerAgents: ['YandexBot'],
    eligibilityNote: 'Participates in IndexNow protocol + Yandex Webmaster verification via YANDEX_VERIFICATION.',
    verificationEnvKey: 'YANDEX_VERIFICATION',
  },

  // ── 2. AI Search & Discovery (6 targets) ──────────────────────────────────
  {
    id: 'chatgpt',
    name: 'ChatGPT Search',
    ecosystem: 'ai_search_discovery',
    ecosystemLabel: 'AI Search & Discovery',
    domain: 'chatgpt.com',
    mode: 'ai_crawler_and_citations',
    crawlerAgents: ['OAI-SearchBot', 'ChatGPT-User'],
    eligibilityNote: 'Public scientific routes explicitly permitted for OAI-SearchBot & ChatGPT-User (separated from GPTBot model training).',
  },
  {
    id: 'gemini',
    name: 'Google Gemini & AI Overviews',
    ecosystem: 'ai_search_discovery',
    ecosystemLabel: 'AI Search & Discovery',
    domain: 'gemini.google.com',
    mode: 'ai_crawler_and_citations',
    crawlerAgents: ['Googlebot'],
    eligibilityNote: 'Grounded in Google Search index, Organization/Dataset/ScholarlyArticle schema, and Search Console AI Overviews/AI Mode.',
  },
  {
    id: 'copilot',
    name: 'Microsoft Copilot',
    ecosystem: 'ai_search_discovery',
    ecosystemLabel: 'AI Search & Discovery',
    domain: 'copilot.microsoft.com',
    mode: 'ai_crawler_and_citations',
    crawlerAgents: ['Bingbot'],
    eligibilityNote: 'Grounded in Bing index + IndexNow; AI citation metrics reported through Bing Webmaster AI Performance.',
  },
  {
    id: 'perplexity',
    name: 'Perplexity',
    ecosystem: 'ai_search_discovery',
    ecosystemLabel: 'AI Search & Discovery',
    domain: 'perplexity.ai',
    mode: 'ai_crawler_and_citations',
    crawlerAgents: ['PerplexityBot', 'Perplexity-User'],
    eligibilityNote: 'PerplexityBot explicitly permitted on public scientific routes with structured citations and dates.',
  },
  {
    id: 'claude',
    name: 'Claude Search',
    ecosystem: 'ai_search_discovery',
    ecosystemLabel: 'AI Search & Discovery',
    domain: 'claude.ai',
    mode: 'ai_crawler_and_citations',
    crawlerAgents: ['Claude-SearchBot', 'Claude-User'],
    eligibilityNote: 'Claude-SearchBot & Claude-User permitted for search grounding (separated from ClaudeBot training crawler).',
  },
  {
    id: 'grok',
    name: 'Grok',
    ecosystem: 'ai_search_discovery',
    ecosystemLabel: 'AI Search & Discovery',
    domain: 'grok.com',
    mode: 'ai_crawler_and_citations',
    eligibilityNote: 'Discovers via live web search index and authorized @KashmirEcoWatch X research announcements.',
  },

  // ── 3. Scientific Discovery (9 targets) ───────────────────────────────────
  {
    id: 'google-scholar',
    name: 'Google Scholar',
    ecosystem: 'scientific_discovery',
    ecosystemLabel: 'Scientific Discovery',
    domain: 'scholar.google.com',
    mode: 'academic_meta_and_indexing',
    crawlerAgents: ['Googlebot'],
    eligibilityNote: 'Requires Highwire Press citation_* meta tags, individual author attribution, bibliography, and canonical scholarly URLs/PDFs.',
  },
  {
    id: 'zenodo',
    name: 'Zenodo (CERN OpenAIRE)',
    ecosystem: 'scientific_discovery',
    ecosystemLabel: 'Scientific Discovery',
    domain: 'zenodo.org',
    mode: 'repository_deposit_and_doi',
    eligibilityNote: 'Eligible free open-science repository for depositing KEW reports & datasets to mint legitimate DataCite Zenodo DOIs.',
    verificationEnvKey: 'ZENODO_ACCESS_TOKEN',
  },
  {
    id: 'crossref',
    name: 'Crossref',
    ecosystem: 'scientific_discovery',
    ecosystemLabel: 'Scientific Discovery',
    domain: 'crossref.org',
    mode: 'repository_deposit_and_doi',
    eligibilityNote: 'Requires paid/sponsored institutional publisher membership for direct DOI prefix; public REST API queried live for citation monitoring.',
  },
  {
    id: 'datacite',
    name: 'DataCite',
    ecosystem: 'scientific_discovery',
    ecosystemLabel: 'Scientific Discovery',
    domain: 'datacite.org',
    mode: 'repository_deposit_and_doi',
    eligibilityNote: 'Dataset DOIs minted automatically when KEW datasets are deposited in Zenodo or via institutional DataCite consortium.',
  },
  {
    id: 'orcid',
    name: 'ORCID',
    ecosystem: 'scientific_discovery',
    ecosystemLabel: 'Scientific Discovery',
    domain: 'orcid.org',
    mode: 'repository_deposit_and_doi',
    eligibilityNote: 'Researcher-level persistent IDs linked in author metadata and synced automatically upon Zenodo/Crossref DOI publication.',
  },
  {
    id: 'researchgate',
    name: 'ResearchGate',
    ecosystem: 'scientific_discovery',
    ecosystemLabel: 'Scientific Discovery',
    domain: 'researchgate.net',
    mode: 'authorized_institutional_channel',
    eligibilityNote: 'Author-managed academic profile deposits for verified KEW researchers and technical monographs.',
  },
  {
    id: 'openalex',
    name: 'OpenAlex',
    ecosystem: 'scientific_discovery',
    ecosystemLabel: 'Scientific Discovery',
    domain: 'openalex.org',
    mode: 'academic_meta_and_indexing',
    eligibilityNote: 'Automatically harvests Crossref, DataCite, Zenodo, and ORCID works; live public API integrated for citation verification.',
  },
  {
    id: 'gbif',
    name: 'GBIF (Global Biodiversity Information Facility)',
    ecosystem: 'scientific_discovery',
    ecosystemLabel: 'Scientific Discovery',
    domain: 'gbif.org',
    mode: 'repository_deposit_and_doi',
    eligibilityNote: 'Requires formal institutional data-publisher endorsement + Darwin Core Archive (DwC-A) biodiversity dataset packaging.',
  },
  {
    id: 'semantic-scholar',
    name: 'Semantic Scholar',
    ecosystem: 'scientific_discovery',
    ecosystemLabel: 'Scientific Discovery',
    domain: 'semanticscholar.org',
    mode: 'academic_meta_and_indexing',
    eligibilityNote: 'Indexes scholarly papers via Crossref, Highwire citation_* metadata, and academic repository feeds.',
  },

  // ── 4. Geospatial & Environmental Discovery (6 targets) ───────────────────
  {
    id: 'google-dataset-search',
    name: 'Google Dataset Search',
    ecosystem: 'geospatial_environmental',
    ecosystemLabel: 'Geospatial & Environmental Discovery',
    domain: 'datasetsearch.research.google.com',
    mode: 'crawler_and_structured_data',
    crawlerAgents: ['Googlebot'],
    eligibilityNote: 'Directly supported in-house via schema.org/Dataset & DataCatalog JSON-LD on Open Data and entity dataset pages.',
  },
  {
    id: 'google-earth',
    name: 'Google Earth / KML Interoperability',
    ecosystem: 'geospatial_environmental',
    ecosystemLabel: 'Geospatial & Environmental Discovery',
    domain: 'earth.google.com',
    mode: 'geospatial_interoperability',
    eligibilityNote: 'Supported via downloadable GeoJSON/KML ecological layers (non-sensitive coordinates only).',
  },
  {
    id: 'arcgis-online',
    name: 'ArcGIS Online / Living Atlas',
    ecosystem: 'geospatial_environmental',
    ecosystemLabel: 'Geospatial & Environmental Discovery',
    domain: 'arcgis.com',
    mode: 'geospatial_interoperability',
    eligibilityNote: 'Supports OGC GeoJSON layer sharing if an institutional ArcGIS Online account is provisioned.',
  },
  {
    id: 'openstreetmap',
    name: 'OpenStreetMap Ecosystem',
    ecosystem: 'geospatial_environmental',
    ecosystemLabel: 'Geospatial & Environmental Discovery',
    domain: 'openstreetmap.org',
    mode: 'geospatial_interoperability',
    eligibilityNote: 'Used as open basemap attribution and compatible topogeographic reference; not a website directory.',
  },
  {
    id: 'nasa-earthdata',
    name: 'NASA Earthdata',
    ecosystem: 'geospatial_environmental',
    ecosystemLabel: 'Geospatial & Environmental Discovery',
    domain: 'earthdata.nasa.gov',
    mode: 'upstream_data_ecosystem',
    isUpstreamDataEcosystemOnly: true,
    eligibilityNote: 'Upstream federal Earth observation archive (MODIS/FIRMS/SRTM/GPM) cited by KEW — NOT a public website registration directory.',
  },
  {
    id: 'copernicus',
    name: 'Copernicus Data Space Ecosystem',
    ecosystem: 'geospatial_environmental',
    ecosystemLabel: 'Geospatial & Environmental Discovery',
    domain: 'dataspace.copernicus.eu',
    mode: 'upstream_data_ecosystem',
    isUpstreamDataEcosystemOnly: true,
    eligibilityNote: 'Upstream ESA Sentinel-1/2/3/5P Earth observation data source cited by KEW — NOT a general website directory.',
  },

  // ── 5. Media & Public Discovery (9 targets) ───────────────────────────────
  {
    id: 'google-news',
    name: 'Google News / Search News Tab',
    ecosystem: 'media_public_discovery',
    ecosystemLabel: 'Media & Public Discovery',
    domain: 'news.google.com',
    mode: 'editorial_news_indexing',
    crawlerAgents: ['Googlebot', 'Googlebot-News'],
    eligibilityNote: 'Automatic consideration via clean Article/Report structured data, transparent bylines, dates, and institutional masthead.',
  },
  {
    id: 'bing-news',
    name: 'Bing News / PubHub',
    ecosystem: 'media_public_discovery',
    ecosystemLabel: 'Media & Public Discovery',
    domain: 'bing.com/news',
    mode: 'editorial_news_indexing',
    crawlerAgents: ['Bingbot'],
    eligibilityNote: 'Eligible for submission after Bing Webmaster Tools domain verification for original environmental bulletins.',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    ecosystem: 'media_public_discovery',
    ecosystemLabel: 'Media & Public Discovery',
    domain: 'youtube.com',
    mode: 'authorized_institutional_channel',
    eligibilityNote: 'Verified official KEW YouTube channel & playlist linked in Organization sameAs structured data.',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    ecosystem: 'media_public_discovery',
    ecosystemLabel: 'Media & Public Discovery',
    domain: 'facebook.com',
    mode: 'authorized_institutional_channel',
    eligibilityNote: 'Official KEW Facebook presence linked in footer & human-approved distribution workflow.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    ecosystem: 'media_public_discovery',
    ecosystemLabel: 'Media & Public Discovery',
    domain: 'linkedin.com',
    mode: 'authorized_institutional_channel',
    eligibilityNote: 'Verified company page (linkedin.com/company/kashmir-ecowatch/) linked in Organization sameAs.',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    ecosystem: 'media_public_discovery',
    ecosystemLabel: 'Media & Public Discovery',
    domain: 'instagram.com',
    mode: 'authorized_institutional_channel',
    eligibilityNote: 'Visual scientific infographic & field photography channel (pending official handle registration if active).',
  },
  {
    id: 'x',
    name: 'X (Twitter)',
    ecosystem: 'media_public_discovery',
    ecosystemLabel: 'Media & Public Discovery',
    domain: 'x.com',
    mode: 'authorized_institutional_channel',
    eligibilityNote: 'Verified official account (@KashmirEcoWatch) linked in Organization sameAs & Twitter Card metadata.',
  },
  {
    id: 'threads',
    name: 'Threads',
    ecosystem: 'media_public_discovery',
    ecosystemLabel: 'Media & Public Discovery',
    domain: 'threads.net',
    mode: 'authorized_institutional_channel',
    eligibilityNote: 'Public scientific micro-briefings channel (subject to authorized institutional account activation).',
  },
  {
    id: 'reddit',
    name: 'Reddit Science & Regional Communities',
    ecosystem: 'media_public_discovery',
    ecosystemLabel: 'Media & Public Discovery',
    domain: 'reddit.com',
    mode: 'authorized_institutional_channel',
    eligibilityNote: 'Human-moderated community sharing of substantive open-access research only (no automated mass posting).',
  },
];

/**
 * 17 Priority Environmental Search Topic Clusters mapped to canonical KEW routes.
 */
export interface EnvironmentalTopicMapping {
  id: string;
  category: string;
  targetTopics: string[];
  primaryCanonicalRoutes: string[];
  flagshipEntities: { name: string; href: string }[];
}

export const SEVENTEEN_ENVIRONMENTAL_TOPIC_CLUSTERS: EnvironmentalTopicMapping[] = [
  {
    id: 'lakes',
    category: 'Lakes',
    targetTopics: ['Dal Lake pollution', 'Wular Lake degradation', 'Sheshnag Lake ecology', 'Anchar Lake eutrophication', 'Alpine oligotrophic lakes'],
    primaryCanonicalRoutes: ['/water-systems/lakes', '/earth-human-impact/aquatic-cryosphere/lake-encroachment', '/hazard-intelligence/algal-bloom-intelligence'],
    flagshipEntities: [
      { name: 'Sheshnag Lake', href: '/water-systems/lakes/sheshnag-lake' },
      { name: 'Dal Lake', href: '/water-systems/lakes/dal-lake' },
      { name: 'Wular Lake', href: '/water-systems/lakes/wular-lake' },
      { name: 'Anchar Lake', href: '/water-systems/lakes/anchar-lake' },
    ],
  },
  {
    id: 'wetlands',
    category: 'Wetlands',
    targetTopics: ['Hokersar', 'Anchar', 'Haigam (Hygam)', 'Shallabugh', 'Ramsar sites of Kashmir', 'Wetland encroachment'],
    primaryCanonicalRoutes: ['/water-systems/wetlands', '/water-systems/nwia-classification', '/protected-network/wetland-reserves', '/earth-human-impact/aquatic-cryosphere/wetland-encroachment'],
    flagshipEntities: [
      { name: 'Hokersar Wetland', href: '/water-systems/wetlands/hokersar-wetland' },
      { name: 'Haigam (Hygam) Wetland', href: '/water-systems/wetlands/hygam-wetland' },
      { name: 'Shallabugh Wetland', href: '/water-systems/wetlands/shallabugh-wetland' },
    ],
  },
  {
    id: 'glaciers',
    category: 'Glaciers',
    targetTopics: ['Kolahoi Glacier', 'Himalayan glacier recession', 'GLOF susceptibility', 'Machoi & Thajiwas glaciers'],
    primaryCanonicalRoutes: ['/water-systems/glaciers', '/earth-human-impact/aquatic-cryosphere/glacier-recession', '/hazard-intelligence/glofs'],
    flagshipEntities: [
      { name: 'Kolahoi Glacier', href: '/water-systems/glaciers/kolahoi-glacier' },
      { name: 'Sheshnag Glacier', href: '/water-systems/glaciers/sheshnag-glacier' },
      { name: 'Thajiwas Glacier', href: '/water-systems/glaciers/thajiwas-glacier' },
    ],
  },
  {
    id: 'rivers',
    category: 'Rivers',
    targetTopics: ['Jhelum River pollution', 'River hydrology', 'Lidder & Sind watersheds', 'Jhelum flood risks'],
    primaryCanonicalRoutes: ['/water-systems/rivers', '/earth-human-impact/aquatic-cryosphere/river-corridor-change', '/hazard-intelligence/floods'],
    flagshipEntities: [
      { name: 'Jhelum River', href: '/water-systems/rivers/jhelum-river' },
      { name: 'Lidder River', href: '/water-systems/rivers/lidder-river' },
      { name: 'Doodhganga River', href: '/water-systems/rivers/doodhganga-river' },
    ],
  },
  {
    id: 'springs',
    category: 'Springs',
    targetTopics: ['Kashmir karst springs', 'Groundwater depletion', 'Verinag & Kokernag discharge', 'Spring restoration'],
    primaryCanonicalRoutes: ['/water-systems/springs', '/water-systems/groundwater', '/earth-human-impact/aquatic-cryosphere/springs-groundwater'],
    flagshipEntities: [
      { name: 'Verinag Spring', href: '/water-systems/springs/verinag-spring' },
      { name: 'Kokernag Spring', href: '/water-systems/springs/kokernag-spring' },
      { name: 'Achabal Spring', href: '/water-systems/springs/achabal-spring' },
    ],
  },
  {
    id: 'air-quality',
    category: 'Air Quality',
    targetTopics: ['Srinagar AQI', 'Kashmir winter air pollution', 'PM2.5 thermal inversion', 'Khrew cement dust emissions'],
    primaryCanonicalRoutes: ['/environmental-monitoring/air-pollution', '/dashboards/air-quality', '/environmental-monitoring/transportation-pollution'],
    flagshipEntities: [
      { name: 'Air Pollution Monitoring', href: '/environmental-monitoring/air-pollution' },
      { name: 'Live Air Quality Dashboard', href: '/dashboards/air-quality' },
    ],
  },
  {
    id: 'biodiversity',
    category: 'Biodiversity',
    targetTopics: ['Hangul (Kashmir Stag)', 'Himalayan wildlife', 'Snow Leopard', 'Red Data Book threatened species'],
    primaryCanonicalRoutes: ['/biodiversity', '/biodiversity/threatened-species', '/biodiversity/endemic-species', '/protected-network/species-intelligence'],
    flagshipEntities: [
      { name: 'Hangul (Cervus hanglu hanglu)', href: '/biodiversity/species/hangul-kashmir-stag' },
      { name: 'Threatened Species Red Data Book', href: '/biodiversity/threatened-species' },
      { name: 'Dachigam National Park', href: '/protected-network/national-parks/dachigam-national-park' },
    ],
  },
  {
    id: 'forests',
    category: 'Forests',
    targetTopics: ['Kashmir deforestation', 'Forest degradation', 'Alpine meadow ecosystems', 'Heritage Chinar census'],
    primaryCanonicalRoutes: ['/biodiversity/forest-ecosystems', '/earth-human-impact/forests-landscapes', '/environmental-monitoring/chinar-monitoring'],
    flagshipEntities: [
      { name: 'Forest Ecosystems Intelligence', href: '/biodiversity/forest-ecosystems' },
      { name: 'Chinar Heritage Census', href: '/environmental-monitoring/chinar-monitoring/census' },
    ],
  },
  {
    id: 'natural-hazards',
    category: 'Natural Hazards',
    targetTopics: ['Kashmir floods', 'Himalayan earthquakes', 'NH-44 landslides', 'Winter avalanches & GLOFs'],
    primaryCanonicalRoutes: ['/hazard-intelligence', '/hazard-intelligence/floods', '/hazard-intelligence/earthquakes', '/hazard-intelligence/landslides', '/hazard-intelligence/avalanches'],
    flagshipEntities: [
      { name: 'Hazard Intelligence Center', href: '/hazard-intelligence' },
      { name: 'Risk Monitoring Hub', href: '/risk-monitoring' },
    ],
  },
  {
    id: 'climate',
    category: 'Climate',
    targetTopics: ['Western Himalayan climate change', 'Western Disturbances', 'Seasonal phenology shifts', 'Warming anomalies'],
    primaryCanonicalRoutes: ['/earth-human-impact/climate-atmosphere', '/risk-monitoring/climate-change', '/hazard-intelligence/atmospheric-systems/western-disturbances', '/seasonal-ecology'],
    flagshipEntities: [
      { name: 'Climate & Atmosphere Observatory', href: '/earth-human-impact/climate-atmosphere' },
      { name: 'Western Disturbances Telemetry', href: '/hazard-intelligence/atmospheric-systems/western-disturbances' },
    ],
  },
  {
    id: 'tourism',
    category: 'Tourism',
    targetTopics: ['Environmental impact of tourism in Kashmir', 'Alpine carrying capacity', 'Mountain solid waste'],
    primaryCanonicalRoutes: ['/sectoral-eia/sectors/tourism', '/environmental-monitoring/plastic-pollution/tourism-mountain-waste'],
    flagshipEntities: [
      { name: 'Tourism Sectoral EIA', href: '/sectoral-eia/sectors/tourism' },
    ],
  },
  {
    id: 'agriculture',
    category: 'Agriculture',
    targetTopics: ['Paddy land conversion in Kashmir', 'Karewa soil degradation', 'Saffron ecosystem vulnerability'],
    primaryCanonicalRoutes: ['/sectoral-eia/sectors/agriculture', '/risk-monitoring/soil-pollution'],
    flagshipEntities: [
      { name: 'Agriculture Sectoral EIA', href: '/sectoral-eia/sectors/agriculture' },
      { name: 'Soil Degradation Intelligence', href: '/risk-monitoring/soil-pollution' },
    ],
  },
  {
    id: 'horticulture',
    category: 'Horticulture',
    targetTopics: ['Orchard pesticide pollution', 'Fungicide runoff into Jhelum', 'Pollinator decline'],
    primaryCanonicalRoutes: ['/sectoral-eia/sectors/horticulture', '/biodiversity/pollinator-activity'],
    flagshipEntities: [
      { name: 'Horticulture Sectoral EIA', href: '/sectoral-eia/sectors/horticulture' },
    ],
  },
  {
    id: 'handicrafts',
    category: 'Handicrafts',
    targetTopics: ['Environmental footprint of Kashmir handicrafts', 'Dyeing effluent', 'Willow wicker wetland sustainability'],
    primaryCanonicalRoutes: ['/sectoral-eia/sectors/handicrafts'],
    flagshipEntities: [
      { name: 'Handicrafts Lifecycle EIA', href: '/sectoral-eia/sectors/handicrafts' },
    ],
  },
  {
    id: 'governance',
    category: 'Environmental Governance',
    targetTopics: ['Kashmir EIA accountability', 'Environmental PIL judgments', 'NGT & High Court ecological orders'],
    primaryCanonicalRoutes: ['/about/governance', '/resources/environmental-pil', '/sectoral-eia'],
    flagshipEntities: [
      { name: 'Environmental PIL Portal', href: '/resources/environmental-pil' },
      { name: 'Governance & Alamdar Ethos', href: '/about/governance' },
    ],
  },
  {
    id: 'satellite-monitoring',
    category: 'Satellite Monitoring',
    targetTopics: ['Kashmir land-use change', 'Sentinel-2 remote sensing', 'Western Himalayan environmental GIS'],
    primaryCanonicalRoutes: ['/atlas', '/earth-human-impact/change-detection-observatory', '/protected-network/atlas'],
    flagshipEntities: [
      { name: 'Interactive Geospatial Atlas', href: '/atlas' },
      { name: 'Satellite Change Detection Observatory', href: '/earth-human-impact/change-detection-observatory' },
    ],
  },
  {
    id: 'scientific-events',
    category: 'Scientific Events',
    targetTopics: ['Kashmir environmental webinars', 'Himalayan climate conferences', 'Outdoor Classroom field education'],
    primaryCanonicalRoutes: ['/webinars', '/webinars/conferences', '/environmental-calendar'],
    flagshipEntities: [
      { name: 'Scientific Webinars & Conferences', href: '/webinars' },
      { name: 'Environmental Calendar & Outdoor Classroom', href: '/environmental-calendar' },
    ],
  },
];
