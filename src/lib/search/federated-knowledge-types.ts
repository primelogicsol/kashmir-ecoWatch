// ─────────────────────────────────────────────────────────────────────────────
// WESTERN HIMALAYAN KNOWLEDGE SEARCH — CLIENT-SAFE TYPES & CONSTANTS
// Shared across Client Components and Server Search Engines without pulling
// Node-only modules (pg, fs, dns) into browser bundles.
// ─────────────────────────────────────────────────────────────────────────────

export type KnowledgePlatformId = 'himalayan_dispatch' | 'kashmir_ecowatch';

export type UnifiedKnowledgeCategory =
  | 'news_reporting'
  | 'editorials_opinions'
  | 'investigative_journalism'
  | 'bureau_reports'
  | 'interviews'
  | 'scientific_assessments'
  | 'environmental_intelligence'
  | 'monitoring_dashboards'
  | 'satellite_gis_data'
  | 'environmental_legislation'
  | 'research_publications'
  | 'regional_environmental_issues';

export type SearchScopeMode = 'himalayan_dispatch' | 'kashmir_ecowatch' | 'both';

export const SUGGESTED_KNOWLEDGE_SEARCHES = [
  'Air Pollution',
  'Sheshnag',
  'Glacial Lakes',
  'Gilgit-Baltistan',
  'Water Security',
  'Climate Change',
] as const;

export interface KnowledgeCategorySpec {
  id: UnifiedKnowledgeCategory;
  label: string;
  inHimalayanDispatch: boolean;
  inKashmirEcoWatch: boolean;
}

export const KNOWLEDGE_SEARCH_COVERAGE_MATRIX: KnowledgeCategorySpec[] = [
  {
    id: 'news_reporting',
    label: 'News and reporting',
    inHimalayanDispatch: true,
    inKashmirEcoWatch: false,
  },
  {
    id: 'editorials_opinions',
    label: 'Editorials and opinions',
    inHimalayanDispatch: true,
    inKashmirEcoWatch: false,
  },
  {
    id: 'investigative_journalism',
    label: 'Investigative journalism',
    inHimalayanDispatch: true,
    inKashmirEcoWatch: false,
  },
  {
    id: 'bureau_reports',
    label: 'Bureau reports',
    inHimalayanDispatch: true,
    inKashmirEcoWatch: false,
  },
  {
    id: 'interviews',
    label: 'Interviews',
    inHimalayanDispatch: true,
    inKashmirEcoWatch: false,
  },
  {
    id: 'scientific_assessments',
    label: 'Scientific assessments',
    inHimalayanDispatch: false,
    inKashmirEcoWatch: true,
  },
  {
    id: 'environmental_intelligence',
    label: 'Environmental intelligence',
    inHimalayanDispatch: false,
    inKashmirEcoWatch: true,
  },
  {
    id: 'monitoring_dashboards',
    label: 'Monitoring dashboards',
    inHimalayanDispatch: false,
    inKashmirEcoWatch: true,
  },
  {
    id: 'satellite_gis_data',
    label: 'Satellite and GIS data',
    inHimalayanDispatch: false,
    inKashmirEcoWatch: true,
  },
  {
    id: 'environmental_legislation',
    label: 'Environmental legislation',
    inHimalayanDispatch: false,
    inKashmirEcoWatch: true,
  },
  {
    id: 'research_publications',
    label: 'Research publications',
    inHimalayanDispatch: true,
    inKashmirEcoWatch: true,
  },
  {
    id: 'regional_environmental_issues',
    label: 'Regional environmental issues',
    inHimalayanDispatch: true,
    inKashmirEcoWatch: true,
  },
];

export interface FederatedSearchHit {
  id: string;
  platform: KnowledgePlatformId;
  platformDisplay: 'HIMALAYAN DISPATCH' | 'KASHMIR ECOWATCH';
  institutionalRubric: string;
  category: UnifiedKnowledgeCategory;
  categoryLabel: string;
  recordKindLabel: string;
  isLiveDatasetOrRegistry: boolean;
  title: string;
  subtitle?: string;
  description: string;
  canonicalUrl: string;
  subregion?: string;
  authorOrSource?: string;
  authorSlug?: string;
  publishedOrUpdatedDate?: string;
  readingDurationLabel?: string;
  trustOrVerificationBadge?: string;
  metrics?: Array<{ label: string; value: string }>;
  coordinates?: { lat: number; lng: number };
  score: number;
}

export interface FederatedSearchOptions {
  q?: string;
  scope?: SearchScopeMode;
  category?: UnifiedKnowledgeCategory | 'all';
  region?: string;
  author?: string;
  dateWindow?: 'all' | 'last_30_days' | '2026' | '2020_2025' | 'historical' | string;
  dateFrom?: string;
  dateTo?: string;
  datasetsAndRegistriesOnly?: boolean;
  includeLiveDatasets?: boolean;
  sort?: 'relevance' | 'newest' | 'title_asc';
  page?: number;
  limit?: number;
}

export interface FederatedSearchResponse {
  query: string;
  scope: SearchScopeMode;
  totalHits: number;
  dispatchCount: number;
  kewCount: number;
  liveDatasetsAndRegistriesCount: number;
  page: number;
  limit: number;
  totalPages: number;
  latencyMs: number;
  hits: FederatedSearchHit[];
  availableAuthors: Array<{ slug: string; name: string; count: number }>;
  categoryCounts: Record<string, number>;
  regionCounts: Record<string, number>;
}
