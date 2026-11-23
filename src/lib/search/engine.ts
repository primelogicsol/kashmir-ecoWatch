// ─────────────────────────────────────────────────────────────────────────────
// KEW HYBRID SEARCH & RANKING ENGINE
// Combines PostgreSQL Full-Text + pg_trgm (when synced) with a deterministic
// BM25-inspired Field-Weighted + Trigram/Levenshtein + Multilingual + Spatial
// Scorer so search is <15ms, typo-tolerant, and 100% resilient to API/DB outages
// ─────────────────────────────────────────────────────────────────────────────

import {
  RankedSearchHit,
  SearchDocument,
  SearchFacetCounts,
  SearchMapPin,
  SearchQueryOptions,
  SearchQueryResponse,
} from './types';
import { getCompiledSearchCorpus } from './index-builder';
import {
  isPostgresSearchSynced,
  queryPostgresScores,
  syncSearchIndexToPostgres,
} from './pg-store';

const STOP_WORDS = new Set([
  'the', 'of', 'in', 'and', 'for', 'to', 'a', 'an', 'on', 'at', 'by', 'with',
  'from', 'around', 'near', 'about', 'into', 'over', 'what', 'where', 'which',
  'have', 'has', 'been', 'are', 'is',
]);

function normalizeText(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFKC')
    .replace(/['’`]/g, '')
    .replace(/[^\p{L}\p{M}\p{N}\s-]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(str: string): string[] {
  const norm = normalizeText(str);
  if (!norm) return [];
  return norm.split(/[\s-]+/).filter((t) => t.length >= 2);
}

function boundedEditDistance(a: string, b: string, maxDist = 2): number {
  if (a === b) return 0;
  const la = a.length;
  const lb = b.length;
  if (Math.abs(la - lb) > maxDist) return maxDist + 1;

  const prev = new Array(lb + 1);
  const curr = new Array(lb + 1);
  for (let j = 0; j <= lb; j++) prev[j] = j;

  for (let i = 1; i <= la; i++) {
    curr[0] = i;
    let rowMin = curr[0];
    for (let j = 1; j <= lb; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(prev[j] + 1, curr[j - 1] + 1, prev[j - 1] + cost);
      if (curr[j] < rowMin) rowMin = curr[j];
    }
    if (rowMin > maxDist) return maxDist + 1;
    for (let j = 0; j <= lb; j++) prev[j] = curr[j];
  }
  return prev[lb];
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

interface PreparedDocIndex {
  doc: SearchDocument;
  titleNorm: string;
  titleTokens: string[];
  subtitleNorm: string;
  synonymsNorm: string[];
  multiNorm: string[];
  tagsNorm: string;
  geoNorm: string;
  descNorm: string;
}

const globalForPrepared = globalThis as unknown as {
  __kewPreparedBuiltAt?: string;
  __kewPreparedDocs?: PreparedDocIndex[];
  __kewVocabulary?: string[];
};

function getPreparedDocs(): { prepared: PreparedDocIndex[]; vocabulary: string[]; builtAt: string; pgTriggered: boolean } {
  const corpus = getCompiledSearchCorpus();
  if (globalForPrepared.__kewPreparedBuiltAt === corpus.builtAt && globalForPrepared.__kewPreparedDocs) {
    return {
      prepared: globalForPrepared.__kewPreparedDocs,
      vocabulary: globalForPrepared.__kewVocabulary || [],
      builtAt: corpus.builtAt,
      pgTriggered: isPostgresSearchSynced(),
    };
  }

  // Trigger background non-blocking PostgreSQL FTS sync on first warmup
  if (!isPostgresSearchSynced()) {
    syncSearchIndexToPostgres(corpus.documents, 'lazy-engine-warmup').catch(() => {});
  }

  const vocabSet = new Set<string>();
  const prepared: PreparedDocIndex[] = corpus.documents.map((doc) => {
    const titleNorm = normalizeText(doc.title);
    const titleTokens = tokenize(doc.title);
    const subtitleNorm = normalizeText(doc.subtitle || '');
    const synonymsNorm = (doc.synonyms || []).map(normalizeText).filter(Boolean);
    const multiRaw = doc.multilingualTerms
      ? [
          ...(doc.multilingualTerms.ur || []),
          ...(doc.multilingualTerms.ks || []),
          ...(doc.multilingualTerms.hi || []),
          ...(doc.multilingualTerms.translit || []),
        ]
      : [];
    const multiNorm = multiRaw.map(normalizeText).filter(Boolean);
    const tagsNorm = normalizeText((doc.tags || []).join(' '));
    const geoNorm = normalizeText(
      [doc.subregion, doc.district, ...(doc.districts || []), doc.watershed, doc.jurisdictionNote]
        .filter(Boolean)
        .join(' ')
    );
    const descNorm = normalizeText(doc.description);

    if (doc.title.length <= 48) vocabSet.add(doc.title.split('—')[0].trim());
    for (const s of doc.synonyms || []) {
      if (s.length >= 3 && s.length <= 40) vocabSet.add(s);
    }
    return {
      doc,
      titleNorm,
      titleTokens,
      subtitleNorm,
      synonymsNorm,
      multiNorm,
      tagsNorm,
      geoNorm,
      descNorm,
    };
  });

  const vocabulary = Array.from(vocabSet);
  globalForPrepared.__kewPreparedDocs = prepared;
  globalForPrepared.__kewVocabulary = vocabulary;
  globalForPrepared.__kewPreparedBuiltAt = corpus.builtAt;

  return { prepared, vocabulary, builtAt: corpus.builtAt, pgTriggered: isPostgresSearchSynced() };
}

function scoreDocument(
  p: PreparedDocIndex,
  qNorm: string,
  queryTokens: string[],
  pgScore?: number
): { score: number; matchedFields: string[] } {
  let score = 0;
  const matchedFields = new Set<string>();

  // 1. Exact & Canonical Base-Entity Matches (Highest Priority — Phase 3)
  const baseTitleNorm = normalizeText(p.doc.title.split(/[—(]/)[0]);
  const isCanonicalPrimaryEntity =
    p.doc.documentType === 'species' ||
    p.doc.documentType === 'lake' ||
    p.doc.documentType === 'wetland' ||
    p.doc.documentType === 'river' ||
    p.doc.documentType === 'spring' ||
    p.doc.documentType === 'glacier' ||
    p.doc.documentType === 'protected_area' ||
    p.doc.documentType === 'district' ||
    p.doc.documentType === 'subregion' ||
    p.doc.documentType === 'module_page';

  if (p.titleNorm === qNorm) {
    score += isCanonicalPrimaryEntity ? 260 : 180;
    matchedFields.add('exact_title');
  } else if (baseTitleNorm === qNorm && isCanonicalPrimaryEntity) {
    score += 240;
    matchedFields.add('canonical_entity');
  } else if (p.titleNorm.startsWith(qNorm + ' ') || p.titleNorm.startsWith(qNorm + ' —')) {
    score += 130;
    matchedFields.add('title_prefix');
  } else if (p.titleNorm.includes(qNorm)) {
    score += 95;
    matchedFields.add('title_phrase');
  }

  if (p.synonymsNorm.some((s) => s === qNorm)) {
    score += isCanonicalPrimaryEntity ? 210 : 145;
    matchedFields.add('exact_synonym');
  } else if (p.synonymsNorm.some((s) => s.includes(qNorm))) {
    score += 80;
    matchedFields.add('synonym');
  }

  if (p.multiNorm.some((m) => m === qNorm || m.includes(qNorm))) {
    score += isCanonicalPrimaryEntity && (p.titleNorm.includes('lake') || p.doc.documentType === 'species' || p.doc.documentType === 'lake' || p.doc.documentType === 'wetland' || p.doc.documentType === 'river' || p.doc.documentType === 'subregion') ? 220 : 140;
    matchedFields.add('multilingual');
  }

  if (p.subtitleNorm && p.subtitleNorm.includes(qNorm)) {
    score += 65;
    matchedFields.add('subtitle');
  }

  if (p.tagsNorm && p.tagsNorm.includes(qNorm)) {
    score += 55;
    matchedFields.add('tags');
  }

  if (p.geoNorm && p.geoNorm.includes(qNorm)) {
    score += 45;
    matchedFields.add('geography');
  }

  // 2. Per-Token Field-Weighted Scoring + Typo Tolerance
  let matchedTokenCount = 0;
  let strongFieldTokenMatches = 0;

  for (const qt of queryTokens) {
    let tokenBest = 0;
    const allowTypo = qt.length >= 4 && /^[a-z0-9]+$/.test(qt);
    const maxDist = qt.length >= 7 ? 2 : 1;

    // Title token exact / prefix / typo
    let hitTitle = false;
    for (const tt of p.titleTokens) {
      if (tt === qt) {
        tokenBest = Math.max(tokenBest, 38);
        hitTitle = true;
        matchedFields.add('title');
        break;
      } else if (tt.startsWith(qt) && qt.length >= 3) {
        tokenBest = Math.max(tokenBest, 26);
        hitTitle = true;
        matchedFields.add('title');
      } else if (allowTypo && boundedEditDistance(qt, tt, maxDist) <= maxDist) {
        tokenBest = Math.max(tokenBest, 20);
        hitTitle = true;
        matchedFields.add('title_fuzzy');
      }
    }
    if (hitTitle) strongFieldTokenMatches++;

    // Synonyms & Multilingual tokens
    if (
      p.synonymsNorm.some((s) => s.split(/\s+/).some((w) => w === qt || (allowTypo && boundedEditDistance(qt, w, 1) <= 1))) ||
      p.multiNorm.some((m) => m.includes(qt))
    ) {
      tokenBest = Math.max(tokenBest, 32);
      strongFieldTokenMatches++;
      matchedFields.add('synonym');
    }

    // Subtitle
    if (p.subtitleNorm.includes(qt)) {
      tokenBest = Math.max(tokenBest, 20);
      strongFieldTokenMatches++;
      matchedFields.add('subtitle');
    }

    // Tags
    if (p.tagsNorm.includes(qt)) {
      tokenBest = Math.max(tokenBest, 18);
      strongFieldTokenMatches++;
      matchedFields.add('tags');
    }

    // Geography
    if (p.geoNorm.includes(qt)) {
      tokenBest = Math.max(tokenBest, 16);
      strongFieldTokenMatches++;
      matchedFields.add('geography');
    }

    // Description — ONLY counted as supplementary context, never dumps unrelated categories on single generic keyword!
    if (p.descNorm.includes(qt)) {
      if (queryTokens.length > 1 || strongFieldTokenMatches > 0) {
        tokenBest = Math.max(tokenBest, 8);
        matchedFields.add('description');
      } else if (qt.length >= 6) {
        // Specific 6+ char technical word in description
        const wordRx = new RegExp(`\\b${qt.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i');
        if (wordRx.test(p.descNorm)) {
          tokenBest = Math.max(tokenBest, 7);
          matchedFields.add('description');
        }
      }
    }

    if (tokenBest > 0) {
      matchedTokenCount++;
      score += tokenBest;
    }
  }

  // Multi-token AND coherence gate (prevents noisy partial-word spillover)
  if (queryTokens.length >= 2) {
    const requiredMatches = Math.max(1, Math.ceil(queryTokens.length * 0.66));
    if (matchedTokenCount < requiredMatches && !matchedFields.has('title_fuzzy') && !matchedFields.has('multilingual')) {
      return { score: 0, matchedFields: [] };
    }
    if (matchedTokenCount === queryTokens.length) {
      score += 48; // Full query coverage bonus
    }
  } else if (queryTokens.length === 1 && score < 12 && (pgScore || 0) < 15) {
    // Suppress weak description-only noise on single generic words like "water" or "species"
    return { score: 0, matchedFields: [] };
  }

  // Merge PostgreSQL FTS + pg_trgm signal when available
  if (pgScore && pgScore > 0) {
    score += Math.min(45, pgScore * 0.45);
    matchedFields.add('pg_fts');
  }

  if (score <= 0) return { score: 0, matchedFields: [] };

  // Subtle authority & canonical hub boosts when tied
  if (p.doc.documentType === 'module_page' && matchedFields.has('exact_title')) {
    score += 25;
  }
  if (
    p.doc.trustBadge === 'Official Warning' ||
    p.doc.trustBadge === 'Statutory / Judicial Record' ||
    p.doc.trustBadge === 'Peer-Reviewed / Institutional'
  ) {
    score += 3;
  }

  return { score: Math.round(score * 10) / 10, matchedFields: Array.from(matchedFields) };
}

function computeDidYouMean(qNorm: string, vocabulary: string[]): string | undefined {
  if (!qNorm || qNorm.length < 4) return undefined;
  let bestWord: string | undefined;
  let bestScore = 0;

  const qTokens = qNorm.split(/\s+/);
  for (const cand of vocabulary) {
    const cNorm = normalizeText(cand);
    if (!cNorm || cNorm === qNorm) continue;
    const cTokens = cNorm.split(/\s+/);
    if (Math.abs(cTokens.length - qTokens.length) > 1) continue;

    const dist = boundedEditDistance(qNorm, cNorm, 3);
    if (dist <= 2) {
      const sim = 1 - dist / Math.max(qNorm.length, cNorm.length);
      if (sim > bestScore) {
        bestScore = sim;
        bestWord = cand;
      }
    }
  }
  return bestScore >= 0.72 ? bestWord : undefined;
}

export async function executeUniversalSearch(options: SearchQueryOptions): Promise<SearchQueryResponse> {
  const t0 = performance.now();
  const { prepared, vocabulary, builtAt } = getPreparedDocs();

  const rawQuery = (options.q || '').trim();
  const qNorm = normalizeText(rawQuery);
  const rawTokens = tokenize(rawQuery);
  const filteredTokens = rawTokens.filter((t) => !STOP_WORDS.has(t));
  const queryTokens = filteredTokens.length > 0 ? filteredTokens : rawTokens;

  let pgScores: Map<string, number> | null = null;
  if (qNorm.length >= 2 && isPostgresSearchSynced()) {
    pgScores = await queryPostgresScores(rawQuery, 300);
  }

  // Step 1: Score against query (or include all when browsing via facets with empty query)
  const scored: Array<{ doc: SearchDocument; score: number; matchedFields: string[]; distanceKm?: number }> = [];

  for (const p of prepared) {
    let score = 1;
    let matchedFields: string[] = [];

    if (qNorm.length >= 2) {
      const pgS = pgScores?.get(p.doc.id);
      const res = scoreDocument(p, qNorm, queryTokens, pgS);
      if (res.score <= 0) continue;
      score = res.score;
      matchedFields = res.matchedFields;
    }

    // Spatial proximity filter (if nearLat & nearLng provided)
    let distanceKm: number | undefined;
    if (typeof options.nearLat === 'number' && typeof options.nearLng === 'number') {
      if (!p.doc.coordinates) continue;
      distanceKm = Math.round(
        haversineKm(options.nearLat, options.nearLng, p.doc.coordinates.lat, p.doc.coordinates.lng) * 10
      ) / 10;
      if (typeof options.radiusKm === 'number' && distanceKm > options.radiusKm) continue;
    }

    scored.push({ doc: p.doc, score, matchedFields, distanceKm });
  }

  // Step 2: Apply non-facet structural filters & compute Facet Counts cleanly
  const preClassFiltered = scored.filter(({ doc }) => {
    if (options.domain && options.domain !== 'all' && doc.domain !== options.domain) return false;
    if (options.subregion && options.subregion !== 'all') {
      if (options.subregion === 'Gilgit-Baltistan') {
        if (doc.subregion !== 'Gilgit' && doc.subregion !== 'Baltistan') return false;
      } else if (doc.subregion !== options.subregion) {
        return false;
      }
    }
    if (options.district) {
      const dTarget = options.district.toLowerCase();
      const matchesPrimary = doc.district?.toLowerCase().includes(dTarget);
      const matchesList = doc.districts?.some((x) => x.toLowerCase().includes(dTarget));
      if (!matchesPrimary && !matchesList) return false;
    }
    if (options.watershed) {
      const wTarget = options.watershed.toLowerCase();
      if (!doc.watershed?.toLowerCase().includes(wTarget)) return false;
    }
    if (options.trustBadge && options.trustBadge !== 'all' && doc.trustBadge !== options.trustBadge) {
      return false;
    }
    if (options.temporalNature && options.temporalNature !== 'all' && doc.temporalNature !== options.temporalNature) {
      return false;
    }
    if (options.verifiedOnly) {
      if (doc.trustBadge === 'Community Reported' || doc.trustBadge === 'Modelled / Reanalysis') return false;
    }
    if (options.hasCoordinates && !doc.coordinates) return false;
    if (options.dateFrom) {
      const ts = doc.observationTimestamp || doc.lastUpdated;
      if (!ts || ts < options.dateFrom) return false;
    }
    if (options.dateTo) {
      const ts = doc.observationTimestamp || doc.lastUpdated;
      if (!ts || ts > options.dateTo) return false;
    }
    return true;
  });

  // Compute resultClass facet counts BEFORE applying resultClass filter so tab badges stay live
  const resultClasses: Record<string, number> = { all: preClassFiltered.length };
  for (const item of preClassFiltered) {
    resultClasses[item.doc.resultClass] = (resultClasses[item.doc.resultClass] || 0) + 1;
  }

  const fullyFiltered =
    options.resultClass && options.resultClass !== 'all'
      ? preClassFiltered.filter((x) => x.doc.resultClass === options.resultClass)
      : preClassFiltered;

  // Compute remaining facet distributions over query-matched set (scored) for rich facet sidebar
  const domains: Record<string, number> = {};
  const subregions: Record<string, number> = {};
  const districtCounts = new Map<string, number>();
  const watershedCounts = new Map<string, number>();
  const temporalNatures: Record<string, number> = {};
  const trustBadges: Record<string, number> = {};
  let withCoordinates = 0;

  for (const { doc } of fullyFiltered) {
    domains[doc.domain] = (domains[doc.domain] || 0) + 1;
    const sr = doc.subregion || 'Multi-Regional';
    subregions[sr] = (subregions[sr] || 0) + 1;
    if (doc.district) {
      const firstDist = doc.district.split(',')[0].trim();
      if (firstDist) districtCounts.set(firstDist, (districtCounts.get(firstDist) || 0) + 1);
    }
    if (doc.watershed) {
      const firstWs = doc.watershed.split(',')[0].trim();
      if (firstWs) watershedCounts.set(firstWs, (watershedCounts.get(firstWs) || 0) + 1);
    }
    temporalNatures[doc.temporalNature] = (temporalNatures[doc.temporalNature] || 0) + 1;
    trustBadges[doc.trustBadge] = (trustBadges[doc.trustBadge] || 0) + 1;
    if (doc.coordinates) withCoordinates++;
  }

  // Step 3: Sort
  const sortMode = options.sort || 'relevance';
  fullyFiltered.sort((a, b) => {
    if (sortMode === 'title_asc') {
      return a.doc.title.localeCompare(b.doc.title);
    }
    if (sortMode === 'updated') {
      const da = a.doc.observationTimestamp || a.doc.lastUpdated || '';
      const db = b.doc.observationTimestamp || b.doc.lastUpdated || '';
      if (da !== db) return db.localeCompare(da);
    }
    if (b.score !== a.score) return b.score - a.score;
    return a.doc.title.localeCompare(b.doc.title);
  });

  // Step 4: Map pins (up to 150 top geolocated matches)
  const mapPins: SearchMapPin[] = [];
  for (const item of fullyFiltered) {
    if (item.doc.coordinates && mapPins.length < 150) {
      mapPins.push({
        id: item.doc.id,
        title: item.doc.title,
        subtitle: item.doc.subtitle,
        canonicalUrl: item.doc.canonicalUrl,
        domain: item.doc.domain,
        resultClass: item.doc.resultClass,
        documentType: item.doc.documentType,
        district: item.doc.district,
        subregion: item.doc.subregion,
        trustBadge: item.doc.trustBadge,
        lat: item.doc.coordinates.lat,
        lng: item.doc.coordinates.lng,
        precision: item.doc.coordinates.precision,
      });
    }
  }

  // Step 5: Paginate
  const page = Math.max(1, options.page || 1);
  const limit = Math.min(100, Math.max(1, options.limit || 24));
  const totalHits = fullyFiltered.length;
  const totalPages = Math.max(1, Math.ceil(totalHits / limit));
  const offset = (page - 1) * limit;

  const hits: RankedSearchHit[] = fullyFiltered.slice(offset, offset + limit).map((item) => ({
    document: item.doc,
    score: item.score,
    matchedFields: item.matchedFields,
    distanceKm: item.distanceKm,
  }));

  const didYouMean = qNorm.length >= 4 && totalHits < 3 ? computeDidYouMean(qNorm, vocabulary) : undefined;

  const facets: SearchFacetCounts = {
    resultClasses,
    domains,
    subregions,
    districts: Array.from(districtCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([name, count]) => ({ name, count })),
    watersheds: Array.from(watershedCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([name, count]) => ({ name, count })),
    temporalNatures,
    trustBadges,
    withCoordinates,
  };

  return {
    query: rawQuery,
    normalizedQuery: qNorm,
    totalHits,
    page,
    limit,
    totalPages,
    hits,
    facets,
    mapPins,
    didYouMean,
    engine: pgScores ? 'postgresql_fts_hybrid' : 'memory_bm25_hybrid',
    latencyMs: Math.round((performance.now() - t0) * 10) / 10,
    indexStats: {
      totalIndexedDocuments: prepared.length,
      lastBuiltAt: builtAt,
      pgSynced: isPostgresSearchSynced(),
    },
  };
}

export interface InstantSuggestGroup {
  groupKey: 'modules' | 'entities' | 'reports' | 'operational';
  groupLabel: string;
  items: Array<{
    id: string;
    title: string;
    subtitle?: string;
    canonicalUrl: string;
    domain: string;
    resultClass: string;
    documentType: string;
    trustBadge: string;
    subregion?: string;
  }>;
}

export async function executeInstantSuggest(q: string, maxPerGroup = 4) {
  const res = await executeUniversalSearch({ q, limit: 40 });
  const groups: Record<'modules' | 'entities' | 'reports' | 'operational', InstantSuggestGroup> = {
    modules: { groupKey: 'modules', groupLabel: 'Modules & Dashboards', items: [] },
    entities: { groupKey: 'entities', groupLabel: 'Species, Water & Geographic Entities', items: [] },
    reports: { groupKey: 'reports', groupLabel: 'Research, EIAs & PIL Records', items: [] },
    operational: { groupKey: 'operational', groupLabel: 'Hazards, Alerts & Monitoring', items: [] },
  };

  for (const hit of res.hits) {
    const d = hit.document;
    let bucket: 'modules' | 'entities' | 'reports' | 'operational' = 'entities';
    if (d.resultClass === 'module') bucket = 'modules';
    else if (d.resultClass === 'operational_intelligence') bucket = 'operational';
    else if (
      d.resultClass === 'report_dataset' ||
      d.domain === 'environmental_accountability' ||
      d.domain === 'scientific_research'
    ) {
      bucket = 'reports';
    }

    if (groups[bucket].items.length < maxPerGroup) {
      groups[bucket].items.push({
        id: d.id,
        title: d.title,
        subtitle: d.subtitle,
        canonicalUrl: d.canonicalUrl,
        domain: d.domain,
        resultClass: d.resultClass,
        documentType: d.documentType,
        trustBadge: d.trustBadge,
        subregion: d.subregion,
      });
    }
  }

  return {
    query: res.query,
    totalHits: res.totalHits,
    didYouMean: res.didYouMean,
    latencyMs: res.latencyMs,
    groups: Object.values(groups).filter((g) => g.items.length > 0),
  };
}
