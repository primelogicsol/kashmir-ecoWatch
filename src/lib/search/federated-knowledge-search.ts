// ─────────────────────────────────────────────────────────────────────────────
// WESTERN HIMALAYAN KNOWLEDGE SEARCH — UNIFIED 3-SCOPE FEDERATED ENGINE
// Connects Himalayan Dispatch (Journalism, Investigation, Public Discourse &
// Accountability) with Kashmir EcoWatch (Science, Environmental Intelligence,
// Live Datasets, Sensor Observations, Scientific Registries & Geospatial Data)
// while preserving each platform's distinct institutional role and identity.
// ─────────────────────────────────────────────────────────────────────────────

import { executeUniversalSearch } from './engine';
import {
  EditorialSearchDocument,
  getHimalayanDispatchSearchCorpus,
  KnowledgePlatformId,
  UnifiedKnowledgeCategory,
} from './himalayan-dispatch-index';
import type { KewSubregion, SearchDocument } from './types';
import {
  KNOWLEDGE_SEARCH_COVERAGE_MATRIX,
  SUGGESTED_KNOWLEDGE_SEARCHES,
  type FederatedSearchHit,
  type FederatedSearchOptions,
  type FederatedSearchResponse,
  type KnowledgeCategorySpec,
  type SearchScopeMode,
} from './federated-knowledge-types';

export {
  KNOWLEDGE_SEARCH_COVERAGE_MATRIX,
  SUGGESTED_KNOWLEDGE_SEARCHES,
  type FederatedSearchHit,
  type FederatedSearchOptions,
  type FederatedSearchResponse,
  type KnowledgeCategorySpec,
  type SearchScopeMode,
};

function normalizeStr(s: string): string {
  return (s || '')
    .toLowerCase()
    .normalize('NFKC')
    .replace(/['’`]/g, '')
    .replace(/[^\p{L}\p{M}\p{N}\s-]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenizeQuery(q: string): string[] {
  const stop = new Set(['the', 'of', 'in', 'and', 'for', 'to', 'a', 'an', 'on', 'at', 'by', 'with']);
  return normalizeStr(q)
    .split(/[\s-]+/)
    .filter((t) => t.length >= 2 && !stop.has(t));
}

function normalizeUrlForDedup(url: string): string {
  const raw = (url || '/').split('#')[0] || '/';
  const [pathname, qs] = raw.split('?');
  const cleanPath =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return qs ? `${cleanPath}?${qs}` : cleanPath;
}

function getCategoryLabel(cat: UnifiedKnowledgeCategory): string {
  return (
    KNOWLEDGE_SEARCH_COVERAGE_MATRIX.find((c) => c.id === cat)?.label ||
    'Regional environmental issues'
  );
}

function scoreEditorialDoc(doc: EditorialSearchDocument, qNorm: string, tokens: string[]): number {
  if (!qNorm) {
    if (doc.documentKind === 'dispatch_article') return 90;
    if (doc.documentKind === 'monograph') return 82;
    if (doc.documentKind === 'daily_dispatch') return 78;
    return 65;
  }

  const titleNorm = normalizeStr(doc.title);
  const subNorm = normalizeStr(doc.subtitle || '');
  const descNorm = normalizeStr(doc.description);
  const tagsNorm = normalizeStr(`${doc.tags.join(' ')} ${doc.geographicLabel || ''} ${doc.authorName || ''}`);
  const bodyNorm = normalizeStr(doc.bodySearchText);

  let score = 0;
  if (titleNorm === qNorm) score += 260;
  else if (titleNorm.startsWith(qNorm)) score += 170;
  else if (titleNorm.includes(qNorm)) score += 125;

  if (subNorm.includes(qNorm)) score += 85;
  if (tagsNorm.includes(qNorm)) score += 75;
  if (descNorm.includes(qNorm)) score += 55;
  if (bodyNorm.includes(qNorm)) score += 45;

  let matchedTokens = 0;
  for (const tk of tokens) {
    let best = 0;
    if (titleNorm.includes(tk)) best = Math.max(best, 38);
    if (subNorm.includes(tk)) best = Math.max(best, 26);
    if (tagsNorm.includes(tk)) best = Math.max(best, 24);
    if (descNorm.includes(tk)) best = Math.max(best, 16);
    if (bodyNorm.includes(tk)) best = Math.max(best, 12);
    if (best > 0) {
      matchedTokens++;
      score += best;
    }
  }

  if (tokens.length > 0 && matchedTokens === 0 && score === 0) return 0;
  if (tokens.length >= 2 && matchedTokens === tokens.length) score += 40;
  if (doc.documentKind === 'dispatch_article') score += 8;
  return score;
}

function classifyKewDocument(doc: SearchDocument): {
  category: UnifiedKnowledgeCategory;
  institutionalRubric: string;
  recordKindLabel: string;
  isLiveDatasetOrRegistry: boolean;
} {
  const dt = doc.documentType;
  const dom = doc.domain;
  const rc = doc.resultClass;

  // 1. Environmental Legislation & PIL
  if (dt === 'legal_statute' || dt === 'pil_case' || dt === 'agency_accountability' || dom === 'environmental_accountability') {
    return {
      category: 'environmental_legislation',
      institutionalRubric: 'KASHMIR ECOWATCH · ENVIRONMENTAL LEGISLATION & PIL',
      recordKindLabel: dt === 'pil_case' ? 'Judicial PIL Docket' : 'Statutory & Regulatory Record',
      isLiveDatasetOrRegistry: true,
    };
  }

  // 2. Satellite, Geospatial & Spatial Entities
  if (
    dt === 'satellite_alert' ||
    dt === 'glacier' ||
    dt === 'lake' ||
    dt === 'wetland' ||
    dt === 'river' ||
    dt === 'spring' ||
    dt === 'watershed' ||
    dt === 'protected_area' ||
    dt === 'corridor' ||
    dom === 'geographic_intelligence' ||
    dom === 'earth_human_impact' ||
    doc.trustBadge === 'Satellite-Derived'
  ) {
    const isEntity = rc === 'geographic_entity' || dt === 'satellite_alert';
    return {
      category: 'satellite_gis_data',
      institutionalRubric: 'KASHMIR ECOWATCH · GEOSPATIAL INTELLIGENCE',
      recordKindLabel:
        dt === 'satellite_alert'
          ? 'Satellite Change Detection'
          : rc === 'geographic_entity'
          ? 'Geospatial & Hydrological Registry'
          : 'Earth Observation & GIS Module',
      isLiveDatasetOrRegistry: isEntity || Boolean(doc.coordinates),
    };
  }

  // 3. Monitoring Dashboards & Live Sensor Stations
  if (
    dt === 'atmospheric_station' ||
    dt === 'monitoring_station' ||
    dt === 'dashboard_tab' ||
    dom === 'environmental_monitoring' ||
    doc.dataFreshness === 'live_telemetry'
  ) {
    const isSensor = dt === 'atmospheric_station' || dt === 'monitoring_station';
    return {
      category: 'monitoring_dashboards',
      institutionalRubric: isSensor
        ? 'KASHMIR ECOWATCH · SENSOR & STATION TELEMETRY'
        : 'KASHMIR ECOWATCH · MONITORING DASHBOARD',
      recordKindLabel: isSensor ? 'Monitoring Station / Sensor' : 'Environmental Monitoring Dashboard',
      isLiveDatasetOrRegistry: isSensor || doc.dataFreshness === 'live_telemetry',
    };
  }

  // 4. Open Datasets & Research Publications
  if (dt === 'open_dataset' || dt === 'scientific_report' || dt === 'conference_webinar') {
    return {
      category: 'research_publications',
      institutionalRubric:
        dt === 'open_dataset'
          ? 'KASHMIR ECOWATCH · LIVE DATASET & OPEN REPOSITORY'
          : 'KASHMIR ECOWATCH · RESEARCH PUBLICATION',
      recordKindLabel: dt === 'open_dataset' ? 'FAIR Open Dataset' : 'Scientific Publication',
      isLiveDatasetOrRegistry: dt === 'open_dataset',
    };
  }

  // 5. Scientific Assessments (EIAs, Species Registries, Biodiversity, Water Assessments)
  if (
    dt === 'eia_assessment' ||
    dt === 'field_report' ||
    dt === 'species' ||
    dt === 'phenology_record' ||
    dt === 'migration_record' ||
    dom === 'scientific_research' ||
    dom === 'biodiversity_conservation' ||
    dom === 'water_cryosphere'
  ) {
    const isRegistry = rc === 'scientific_record' || dt === 'species';
    return {
      category: 'scientific_assessments',
      institutionalRubric: isRegistry
        ? 'KASHMIR ECOWATCH · SCIENTIFIC REGISTRY'
        : 'KASHMIR ECOWATCH · SCIENTIFIC ASSESSMENT',
      recordKindLabel: isRegistry ? 'Biodiversity & Ecological Registry' : 'Scientific & EIA Assessment',
      isLiveDatasetOrRegistry: isRegistry,
    };
  }

  // 6. Environmental & Hazard Intelligence
  return {
    category: 'environmental_intelligence',
    institutionalRubric:
      dom === 'hazard_intelligence'
        ? 'KASHMIR ECOWATCH · HAZARD & ATMOSPHERIC INTELLIGENCE'
        : 'KASHMIR ECOWATCH · ENVIRONMENTAL INTELLIGENCE',
    recordKindLabel:
      rc === 'operational_intelligence' ? 'Operational Hazard Intelligence' : 'Environmental Intelligence',
    isLiveDatasetOrRegistry: rc === 'operational_intelligence',
  };
}

function matchesRegionFilter(subregion: string | undefined, geoText: string, regionFilter?: string): boolean {
  if (!regionFilter || regionFilter === 'all') return true;
  const sr = (subregion || '').toLowerCase();
  const gt = (geoText || '').toLowerCase();
  const rf = regionFilter.toLowerCase();

  if (sr === 'multi-regional') {
    if (!gt) return true;
    if (rf.includes('gilgit') || rf.includes('baltistan')) {
      return gt.includes('gilgit') || gt.includes('baltistan') || gt.includes('five') || gt.includes('western himalaya');
    }
    if (rf.includes('azad') || rf === 'ajk') {
      return gt.includes('azad') || gt.includes('aj&k') || gt.includes('five') || gt.includes('western himalaya');
    }
    return gt.includes(rf) || gt.includes('five') || gt.includes('western himalaya');
  }

  if (rf === 'gilgit-baltistan') {
    return sr === 'gilgit' || sr === 'baltistan' || gt.includes('gilgit') || gt.includes('baltistan');
  }
  if (rf === 'azad kashmir' || rf === 'aj&k' || rf === 'ajk') {
    return sr === 'azad kashmir' || gt.includes('azad') || gt.includes('muzaffarabad');
  }
  return sr === rf || gt.includes(rf);
}

function matchesDateFilter(
  isoDate: string | undefined,
  dateWindow?: string,
  dateFrom?: string,
  dateTo?: string
): boolean {
  if ((!dateWindow || dateWindow === 'all') && !dateFrom && !dateTo) return true;
  if (!isoDate) return dateWindow === 'all' || !dateWindow;
  const clean = isoDate.slice(0, 10);

  if (dateFrom && clean < dateFrom) return false;
  if (dateTo && clean > dateTo) return false;

  if (dateWindow === 'last_30_days') return clean >= '2026-10-29';
  if (dateWindow === '2026') return clean.startsWith('2026');
  if (dateWindow === '2020_2025') return clean >= '2020-01-01' && clean <= '2025-12-31';
  if (dateWindow === 'historical') return clean < '2020-01-01';
  return true;
}

export async function executeFederatedKnowledgeSearch(
  options: FederatedSearchOptions
): Promise<FederatedSearchResponse> {
  const t0 = performance.now();
  const rawQuery = (options.q || '').trim();
  const qNorm = normalizeStr(rawQuery);
  const tokens = tokenizeQuery(rawQuery);
  const scope: SearchScopeMode = options.scope || 'both';
  const includeLiveDatasets = options.includeLiveDatasets !== false;
  const datasetsOnly = Boolean(options.datasetsAndRegistriesOnly);

  const hdCandidates: FederatedSearchHit[] = [];
  const kewCandidates: FederatedSearchHit[] = [];
  const authorCounts = new Map<string, { slug: string; name: string; count: number }>();

  // 1. Query Himalayan Dispatch Editorial Index (when scope is 'himalayan_dispatch' or 'both')
  if (scope === 'himalayan_dispatch' || scope === 'both') {
    const hdCorpus = getHimalayanDispatchSearchCorpus();
    for (const doc of hdCorpus) {
      if (datasetsOnly && doc.documentKind !== 'editorial_observatory' && doc.documentKind !== 'monograph') {
        continue;
      }
      const score = scoreEditorialDoc(doc, qNorm, tokens);
      if (qNorm && score <= 0) continue;

      if (
        options.category &&
        options.category !== 'all' &&
        doc.category !== options.category &&
        !doc.secondaryCategories.includes(options.category)
      ) {
        continue;
      }

      if (!matchesRegionFilter(doc.subregion, doc.geographicLabel || '', options.region)) {
        continue;
      }

      if (options.author && options.author !== 'all') {
        const authNorm = options.author.toLowerCase();
        const matchSlug = (doc.authorSlug || '').toLowerCase() === authNorm;
        const matchName = (doc.authorName || '').toLowerCase().includes(authNorm);
        if (!matchSlug && !matchName) continue;
      }

      if (!matchesDateFilter(doc.publishedDate, options.dateWindow, options.dateFrom, options.dateTo)) {
        continue;
      }

      if (doc.authorSlug && doc.authorName) {
        const prev = authorCounts.get(doc.authorSlug);
        if (prev) prev.count += 1;
        else {
          authorCounts.set(doc.authorSlug, {
            slug: doc.authorSlug,
            name: doc.authorName.split('&')[0].trim(),
            count: 1,
          });
        }
      }

      hdCandidates.push({
        id: doc.id,
        platform: 'himalayan_dispatch',
        platformDisplay: 'HIMALAYAN DISPATCH',
        institutionalRubric: doc.institutionalRubric,
        category: doc.category,
        categoryLabel: getCategoryLabel(doc.category),
        recordKindLabel:
          doc.documentKind === 'monograph'
            ? 'Investigative Monograph'
            : doc.documentKind === 'daily_dispatch'
            ? 'Daily Dispatch'
            : doc.documentKind === 'bureau_desk'
            ? 'Regional Bureau'
            : 'Editorial Investigation',
        isLiveDatasetOrRegistry:
          doc.documentKind === 'editorial_observatory' || doc.documentKind === 'monograph',
        title: doc.title,
        subtitle: doc.subtitle,
        description: doc.description,
        canonicalUrl: doc.canonicalUrl,
        subregion: doc.subregion,
        authorOrSource: doc.authorName || 'Himalayan Dispatch Editorial Desk',
        authorSlug: doc.authorSlug,
        publishedOrUpdatedDate: doc.publishedDate,
        readingDurationLabel: doc.readingDurationLabel,
        trustOrVerificationBadge: 'Published Editorial Record',
        score,
      });
    }
  }

  // 2. Query Kashmir EcoWatch Scientific & Geospatial Engine (when scope is 'kashmir_ecowatch' or 'both')
  if (scope === 'kashmir_ecowatch' || scope === 'both') {
    const subregionParam: KewSubregion | 'all' | 'Gilgit-Baltistan' =
      options.region && options.region !== 'all'
        ? (options.region as KewSubregion | 'Gilgit-Baltistan')
        : 'all';

    const kewRes = await executeUniversalSearch({
      q: rawQuery,
      subregion: subregionParam,
      dateFrom: options.dateFrom,
      dateTo: options.dateTo,
      limit: 100,
    });

    for (const hit of kewRes.hits) {
      const d = hit.document;
      // Strictly separate platforms: exclude /himalayan-dispatch routes from KEW results!
      if (d.canonicalUrl.startsWith('/himalayan-dispatch')) continue;

      const cls = classifyKewDocument(d);
      if (!includeLiveDatasets && cls.isLiveDatasetOrRegistry && d.resultClass !== 'module') {
        continue;
      }
      if (datasetsOnly && !cls.isLiveDatasetOrRegistry) {
        continue;
      }

      if (
        options.category &&
        options.category !== 'all' &&
        cls.category !== options.category &&
        options.category !== 'regional_environmental_issues'
      ) {
        continue;
      }

      if (options.author && options.author !== 'all') {
        const authNorm = options.author.toLowerCase();
        if (!(d.source || '').toLowerCase().includes(authNorm)) continue;
      }

      const obsDate = d.observationTimestamp || d.lastUpdated;
      if (!matchesDateFilter(obsDate, options.dateWindow, options.dateFrom, options.dateTo)) {
        continue;
      }

      kewCandidates.push({
        id: d.id,
        platform: 'kashmir_ecowatch',
        platformDisplay: 'KASHMIR ECOWATCH',
        institutionalRubric: cls.institutionalRubric,
        category: cls.category,
        categoryLabel: getCategoryLabel(cls.category),
        recordKindLabel: cls.recordKindLabel,
        isLiveDatasetOrRegistry: cls.isLiveDatasetOrRegistry,
        title: d.title,
        subtitle: d.subtitle,
        description: d.description,
        canonicalUrl: d.canonicalUrl,
        subregion: d.subregion,
        authorOrSource: d.source,
        publishedOrUpdatedDate: obsDate ? obsDate.slice(0, 10) : undefined,
        trustOrVerificationBadge: d.trustBadge,
        metrics: d.metrics?.slice(0, 3),
        coordinates: d.coordinates
          ? { lat: d.coordinates.lat, lng: d.coordinates.lng }
          : undefined,
        score: hit.score,
      });
    }
  }

  // Sort each platform's candidates
  const sortMode = options.sort || 'relevance';
  const sorter = (a: FederatedSearchHit, b: FederatedSearchHit) => {
    if (sortMode === 'title_asc') return a.title.localeCompare(b.title);
    if (sortMode === 'newest') {
      const da = a.publishedOrUpdatedDate || '';
      const db = b.publishedOrUpdatedDate || '';
      if (da !== db) return db.localeCompare(da);
    }
    if (b.score !== a.score) return b.score - a.score;
    return a.title.localeCompare(b.title);
  };

  hdCandidates.sort(sorter);
  kewCandidates.sort(sorter);

  // Merge + Canonical URL Deduplication + Balanced Interleaving when scope === 'both'
  const merged: FederatedSearchHit[] = [];
  const seenCanonical = new Set<string>();

  const pushUnique = (item: FederatedSearchHit) => {
    const key = normalizeUrlForDedup(item.canonicalUrl);
    if (seenCanonical.has(key)) return;
    seenCanonical.add(key);
    merged.push(item);
  };

  if (scope === 'both' && sortMode === 'relevance' && hdCandidates.length > 0 && kewCandidates.length > 0) {
    // Interleave top high-relevance matches so both journalism & scientific intelligence appear visibly side by side
    let i = 0;
    let j = 0;
    while (i < hdCandidates.length || j < kewCandidates.length) {
      if (i < hdCandidates.length) {
        pushUnique(hdCandidates[i++]);
      }
      // Pair up to 2 KEW scientific/GIS/dataset records per Dispatch story when scores are competitive
      if (j < kewCandidates.length) {
        pushUnique(kewCandidates[j++]);
      }
      if (j < kewCandidates.length && (i >= hdCandidates.length || kewCandidates[j].score >= (hdCandidates[i]?.score || 0) * 0.75)) {
        pushUnique(kewCandidates[j++]);
      }
    }
  } else {
    const all = [...hdCandidates, ...kewCandidates];
    all.sort(sorter);
    for (const item of all) pushUnique(item);
  }

  // Facets across deduplicated merged set
  let dispatchCount = 0;
  let kewCount = 0;
  let liveDatasetsAndRegistriesCount = 0;
  const categoryCounts: Record<string, number> = {};
  const regionCounts: Record<string, number> = {};

  for (const h of merged) {
    if (h.platform === 'himalayan_dispatch') dispatchCount++;
    else kewCount++;
    if (h.isLiveDatasetOrRegistry) liveDatasetsAndRegistriesCount++;
    categoryCounts[h.category] = (categoryCounts[h.category] || 0) + 1;
    const sr = h.subregion || 'Multi-Regional';
    regionCounts[sr] = (regionCounts[sr] || 0) + 1;
  }

  const page = Math.max(1, options.page || 1);
  const limit = Math.min(60, Math.max(1, options.limit || 20));
  const totalHits = merged.length;
  const totalPages = Math.max(1, Math.ceil(totalHits / limit));
  const offset = (page - 1) * limit;

  return {
    query: rawQuery,
    scope,
    totalHits,
    dispatchCount,
    kewCount,
    liveDatasetsAndRegistriesCount,
    page,
    limit,
    totalPages,
    latencyMs: Math.round((performance.now() - t0) * 10) / 10,
    hits: merged.slice(offset, offset + limit),
    availableAuthors: Array.from(authorCounts.values()).sort((a, b) => b.count - a.count),
    categoryCounts,
    regionCounts,
  };
}

export async function executeFederatedSuggest(
  q: string,
  scope: SearchScopeMode = 'both',
  limit = 8
) {
  const res = await executeFederatedKnowledgeSearch({
    q,
    scope,
    limit,
    page: 1,
  });

  return {
    query: res.query,
    scope: res.scope,
    totalHits: res.totalHits,
    dispatchCount: res.dispatchCount,
    kewCount: res.kewCount,
    latencyMs: res.latencyMs,
    suggestions: res.hits.map((h) => ({
      id: h.id,
      platform: h.platform,
      platformDisplay: h.platformDisplay,
      institutionalRubric: h.institutionalRubric,
      recordKindLabel: h.recordKindLabel,
      isLiveDatasetOrRegistry: h.isLiveDatasetOrRegistry,
      title: h.title,
      subtitle: h.subtitle,
      canonicalUrl: h.canonicalUrl,
      subregion: h.subregion,
      readingDurationLabel: h.readingDurationLabel,
    })),
  };
}
