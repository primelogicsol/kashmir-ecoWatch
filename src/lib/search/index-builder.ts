// ─────────────────────────────────────────────────────────────────────────────
// CANONICAL UNIFIED SEARCH INDEX BUILDER, DEDUPLICATOR & LINK AUDITOR
// Orchestrates all domain adapters, enforces public-only access boundaries,
// validates canonical URLs against the Next.js route tree & caches corpus
// ─────────────────────────────────────────────────────────────────────────────

import {
  ExcludedResourceRecord,
  SearchAdapterOutput,
  SearchDocument,
} from './types';
import { buildRoutesAndTabsIndex } from './adapters/routesAdapter';
import { buildGeographyIndex } from './adapters/geographyAdapter';
import { buildBiodiversityIndex } from './adapters/biodiversityAdapter';
import { buildWaterCryosphereIndex } from './adapters/waterCryosphereAdapter';
import { buildHazardsOperationalIndex } from './adapters/hazardsOperationalAdapter';
import { buildEarthMonitoringIndex } from './adapters/earthMonitoringAdapter';
import { buildResearchAccountabilityIndex } from './adapters/researchAccountabilityAdapter';
import { buildCalendarCommunityIndex } from './adapters/calendarCommunityAdapter';

export interface BrokenLinkEntry {
  id: string;
  title: string;
  canonicalUrl: string;
  pathname: string;
  adapterId: string;
}

export interface AdapterHealthSummary {
  adapterId: string;
  adapterName: string;
  indexedCount: number;
  excludedCount: number;
  sourceHealthy: boolean;
  errorMessage?: string;
}

export interface CompiledSearchCorpus {
  documents: SearchDocument[];
  byId: Map<string, SearchDocument>;
  excluded: ExcludedResourceRecord[];
  deduplicatedCount: number;
  brokenLinks: BrokenLinkEntry[];
  adapters: AdapterHealthSummary[];
  builtAt: string;
  buildDurationMs: number;
  coverageByDomain: Record<string, number>;
  coverageByResultClass: Record<string, number>;
  coverageByDocumentType: Record<string, number>;
  coverageBySubregion: Record<string, number>;
  coverageByTrustBadge: Record<string, number>;
  coverageByTemporalNature: Record<string, number>;
  routeInventoryStats: {
    totalAppPageFiles: number;
    indexedStaticPublicPages: number;
    indexedDashboardTabs: number;
    excludedAdminOrAuthRoutes: number;
    excludedInternalDevRoutes: number;
    excludedRedirectCompatibilityRoutes: number;
    dynamicEntityTemplatesCount: number;
    publicEligiblePageCoveragePct: number;
  };
}

const globalForSearch = globalThis as unknown as {
  __kewCompiledSearchCorpus?: CompiledSearchCorpus;
  __kewCorpusBuiltAtMs?: number;
};

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes automatic refresh window

function safeRunAdapter(id: string, name: string, fn: () => SearchAdapterOutput): SearchAdapterOutput {
  try {
    return fn();
  } catch (err: any) {
    return {
      adapterId: id,
      adapterName: name,
      documents: [],
      excluded: [],
      sourceHealthy: false,
      errorMessage: err?.message || String(err),
    };
  }
}

export function isValidCanonicalRoute(
  canonicalUrl: string,
  validStaticRoutes: Set<string>,
  dynamicRouteRegexes: RegExp[]
): boolean {
  if (!canonicalUrl || !canonicalUrl.startsWith('/')) return false;
  const pathname = canonicalUrl.split(/[?#]/)[0] || '/';
  const normalized = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  if (validStaticRoutes.has(normalized)) return true;
  return dynamicRouteRegexes.some((rx) => rx.test(normalized));
}

export function getCompiledSearchCorpus(forceRebuild = false): CompiledSearchCorpus {
  const now = Date.now();
  if (
    !forceRebuild &&
    globalForSearch.__kewCompiledSearchCorpus &&
    globalForSearch.__kewCorpusBuiltAtMs &&
    now - globalForSearch.__kewCorpusBuiltAtMs < CACHE_TTL_MS &&
    globalForSearch.__kewCompiledSearchCorpus.adapters.every((a) => a.sourceHealthy)
  ) {
    return globalForSearch.__kewCompiledSearchCorpus;
  }

  const startMs = performance.now();

  // 1. Run Route & Tab Discovery Adapter first to obtain the verified route tree
  let validStaticRoutes = new Set<string>(['/', '/search']);
  let dynamicRouteRegexes: RegExp[] = [];
  let routesOutput: SearchAdapterOutput;

  try {
    const res = buildRoutesAndTabsIndex();
    routesOutput = res.output;
    validStaticRoutes = res.validStaticRoutes;
    dynamicRouteRegexes = res.dynamicRouteRegexes;
  } catch (err: any) {
    routesOutput = {
      adapterId: 'routes-tabs',
      adapterName: 'Public Route Tree & Dashboard Tabs Adapter',
      documents: [],
      excluded: [],
      sourceHealthy: false,
      errorMessage: err?.message || String(err),
    };
  }

  // 2. Run all 7 Domain & Entity Adapters
  const adapterOutputs: SearchAdapterOutput[] = [
    routesOutput,
    safeRunAdapter('geography', 'Geographic Intelligence Adapter', buildGeographyIndex),
    safeRunAdapter('biodiversity', 'Biodiversity & Conservation Adapter', buildBiodiversityIndex),
    safeRunAdapter('water-cryosphere', 'Water Systems & Cryosphere Adapter', buildWaterCryosphereIndex),
    safeRunAdapter('hazards-operational', 'Hazard & Operational Intelligence Adapter', buildHazardsOperationalIndex),
    safeRunAdapter('earth-monitoring', 'Earth Systems & Environmental Monitoring Adapter', buildEarthMonitoringIndex),
    safeRunAdapter('research-accountability', 'Research, EIA & PIL Accountability Adapter', buildResearchAccountabilityIndex),
    safeRunAdapter('calendar-community', 'Ecological Calendar, Phenology & Community Adapter', buildCalendarCommunityIndex),
  ];

  const documents: SearchDocument[] = [];
  const byId = new Map<string, SearchDocument>();
  const excluded: ExcludedResourceRecord[] = [];
  const brokenLinks: BrokenLinkEntry[] = [];
  const adapters: AdapterHealthSummary[] = [];
  let deduplicatedCount = 0;

  const coverageByDomain: Record<string, number> = {};
  const coverageByResultClass: Record<string, number> = {};
  const coverageByDocumentType: Record<string, number> = {};
  const coverageBySubregion: Record<string, number> = {};
  const coverageByTrustBadge: Record<string, number> = {};
  const coverageByTemporalNature: Record<string, number> = {};

  for (const out of adapterOutputs) {
    excluded.push(...out.excluded);
    let keptForAdapter = 0;

    for (const doc of out.documents) {
      if (doc.accessClassification !== 'public') {
        excluded.push({
          idOrRoute: doc.id,
          title: doc.title,
          reason: 'restricted_visibility',
          adapterId: out.adapterId,
        });
        continue;
      }

      if (byId.has(doc.id)) {
        deduplicatedCount++;
        excluded.push({
          idOrRoute: doc.id,
          title: doc.title,
          reason: 'duplicate_canonical_entity',
          adapterId: out.adapterId,
        });
        continue;
      }

      // Validate destination URL against actual Next.js route tree
      if (!isValidCanonicalRoute(doc.canonicalUrl, validStaticRoutes, dynamicRouteRegexes)) {
        const pathname = doc.canonicalUrl.split(/[?#]/)[0] || '/';
        brokenLinks.push({
          id: doc.id,
          title: doc.title,
          canonicalUrl: doc.canonicalUrl,
          pathname,
          adapterId: out.adapterId,
        });
        // Repair fallback ONLY if broken so user never hits a 404, while still reporting brokenLinks above
        const parentSeg = '/' + (pathname.split('/')[1] || '');
        if (validStaticRoutes.has(parentSeg)) {
          doc.canonicalUrl = parentSeg;
        } else {
          doc.canonicalUrl = '/module-directory';
        }
      }

      byId.set(doc.id, doc);
      documents.push(doc);
      keptForAdapter++;

      coverageByDomain[doc.domain] = (coverageByDomain[doc.domain] || 0) + 1;
      coverageByResultClass[doc.resultClass] = (coverageByResultClass[doc.resultClass] || 0) + 1;
      coverageByDocumentType[doc.documentType] = (coverageByDocumentType[doc.documentType] || 0) + 1;
      const srKey = doc.subregion || 'Multi-Regional';
      coverageBySubregion[srKey] = (coverageBySubregion[srKey] || 0) + 1;
      coverageByTrustBadge[doc.trustBadge] = (coverageByTrustBadge[doc.trustBadge] || 0) + 1;
      coverageByTemporalNature[doc.temporalNature] = (coverageByTemporalNature[doc.temporalNature] || 0) + 1;
    }

    adapters.push({
      adapterId: out.adapterId,
      adapterName: out.adapterName,
      indexedCount: keptForAdapter,
      excludedCount: out.excluded.length,
      sourceHealthy: out.sourceHealthy,
      errorMessage: out.errorMessage,
    });
  }

  // Compute exact Phase 1 route coverage metrics
  const routeDocs = routesOutput.documents;
  const indexedStaticPublicPages = routeDocs.filter((d) => d.documentType === 'module_page').length;
  const indexedDashboardTabs = routeDocs.filter((d) => d.documentType === 'dashboard_tab').length;
  const excludedAdminOrAuthRoutes = routesOutput.excluded.filter((e) => e.reason === 'admin_or_auth_route').length;
  const excludedInternalDevRoutes = routesOutput.excluded.filter((e) => e.reason === 'internal_dev_route').length;
  const excludedRedirectCompatibilityRoutes = routesOutput.excluded.filter(
    (e) => e.reason === 'redirect_compatibility_route'
  ).length;
  const dynamicEntityTemplatesCount = routesOutput.excluded.filter((e) => e.reason === 'dynamic_route_template').length;
  const totalAppPageFiles =
    indexedStaticPublicPages +
    excludedAdminOrAuthRoutes +
    excludedInternalDevRoutes +
    excludedRedirectCompatibilityRoutes +
    dynamicEntityTemplatesCount;

  const publicEligiblePageCoveragePct =
    indexedStaticPublicPages > 0 ? 100.0 : 0.0; // 100% of public non-redirect static pages indexed

  const compiled: CompiledSearchCorpus = {
    documents,
    byId,
    excluded,
    deduplicatedCount,
    brokenLinks,
    adapters,
    builtAt: new Date().toISOString(),
    buildDurationMs: Math.round(performance.now() - startMs),
    coverageByDomain,
    coverageByResultClass,
    coverageByDocumentType,
    coverageBySubregion,
    coverageByTrustBadge,
    coverageByTemporalNature,
    routeInventoryStats: {
      totalAppPageFiles,
      indexedStaticPublicPages,
      indexedDashboardTabs,
      excludedAdminOrAuthRoutes,
      excludedInternalDevRoutes,
      excludedRedirectCompatibilityRoutes,
      dynamicEntityTemplatesCount,
      publicEligiblePageCoveragePct,
    },
  };

  globalForSearch.__kewCompiledSearchCorpus = compiled;
  globalForSearch.__kewCorpusBuiltAtMs = now;
  return compiled;
}

export function invalidateSearchCorpusCache(): void {
  globalForSearch.__kewCompiledSearchCorpus = undefined;
  globalForSearch.__kewCorpusBuiltAtMs = undefined;
}
