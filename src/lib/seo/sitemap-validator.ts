// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — FULL SITEMAP INVENTORY & QUALITY GATE VALIDATOR
// Evaluates every candidate URL against backing data stores, canonical rules,
// indexability, restricted visibility, and substantive scientific content gates
// (excluding mass-generated combinatorial templates, soft-404s, redirects & duplicates).
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';
import { getCompiledSearchCorpus } from '@/lib/search/index-builder';
import {
  mammalsData,
  birdsData,
  fishData,
  plantsData,
  medicinalPlantsData,
  threatenedSpeciesData,
  type BiodiversitySpecies,
} from '@/data/biodiversity';
import {
  lakesData,
  wetlandsData,
  riversData,
  springsData,
  glaciersData,
  watershedsData,
  groundwaterData,
  waterQualitySites,
  fisheriesData,
  floodRiskZones,
  restorationSites,
  type WaterEntity,
} from '@/data/water-systems';
import { drinkingWaterSources } from '@/data/drinking-water-sources';
import { getProtectedAreas, corridorsData, reportsData, trailsData, threatsData, speciesProfilesData } from '@/data/protected-network';
import { evidenceRegistry } from '@/data/evidence-intelligence';
import { fieldReportsRegistry } from '@/data/field-reports-registry';
import { ngoRegistryData } from '@/data/ngo-impact';
import { SHARED_ASSESSMENT_DATABASE } from '@/data/sectoral-eia';
import { CONFERENCES_DETAILED, SESSIONS_DETAILED } from '@/data/conference-system';
import { SCIENTIFIC_WEBINARS } from '@/data/webinars';
import { CANONICAL_SITE_URL } from './entity-identity';
import {
  DUPLICATE_ROUTE_CANONICAL_OVERRIDES,
  isNonPublicRoute,
} from './route-metadata';

export interface SitemapAuditBreakdown {
  totalCandidateUrls: number;
  validEligibleUrls: number;
  invalidOrSoft404Urls: number;
  redirectedUrls: number;
  duplicateUrls: number;
  nonIndexableUrls: number;
  thinOrTemplatedUrls: number;
  restrictedUrls: number;
  breakdownNotes: Record<string, number>;
}

export interface ValidatedSitemapEntry {
  pathname: string;
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Precompute exact lookup sets and templated-description detectors
const ALL_SPECIES: BiodiversitySpecies[] = [
  ...mammalsData,
  ...birdsData,
  ...fishData,
  ...plantsData,
  ...medicinalPlantsData,
  ...threatenedSpeciesData,
];

const SPECIES_BY_SLUG = new Map<string, BiodiversitySpecies>();
const PRIMARY_SPECIES_SLUG_BY_SCI_NAME = new Map<string, string>();
const SPECIES_DESC_PREFIX_COUNTS = new Map<string, number>();
for (const sp of ALL_SPECIES) {
  if (sp.slug && !SPECIES_BY_SLUG.has(sp.slug)) {
    SPECIES_BY_SLUG.set(sp.slug, sp);
  }
  const sciKey = (sp.scientificName || '').trim().toLowerCase();
  if (sciKey && sp.slug && !isTemplatedSpeciesStubRaw(sp) && !PRIMARY_SPECIES_SLUG_BY_SCI_NAME.has(sciKey)) {
    PRIMARY_SPECIES_SLUG_BY_SCI_NAME.set(sciKey, sp.slug);
  }
  const pref = (sp.description || '').trim().slice(0, 48).toLowerCase();
  if (pref) {
    SPECIES_DESC_PREFIX_COUNTS.set(pref, (SPECIES_DESC_PREFIX_COUNTS.get(pref) || 0) + 1);
  }
}

function isTemplatedSpeciesStubRaw(sp: BiodiversitySpecies | undefined): boolean {
  if (!sp) return true;
  const desc = (sp.description || '').trim();
  if (desc.length < 110) return true;
  if (/^A native Himalayan .* of the family /i.test(desc)) return true;
  if (/^The .* is a widely distributed bird species/i.test(desc)) return true;
  if (/^A documented (chiroptera|rodentia|carnivora|eulipotyphla|artiodactyla|lagomorpha|primates) of the Western Himalayas/i.test(desc)) {
    return true;
  }
  return false;
}

export function getCanonicalSpeciesSlug(slug: string): string {
  const sp = SPECIES_BY_SLUG.get(slug);
  if (!sp) return slug;
  const sciKey = (sp.scientificName || '').trim().toLowerCase();
  return (sciKey && PRIMARY_SPECIES_SLUG_BY_SCI_NAME.get(sciKey)) || slug;
}

/**
 * Identifies mass-generated / combinatorial species stubs so only bespoke,
 * scientifically substantive species dossiers are indexed in search engines.
 */
export function isTemplatedSpeciesStub(sp: BiodiversitySpecies | undefined): boolean {
  if (!sp) return true;
  const desc = (sp.description || '').trim();
  if (desc.length < 110) return true;
  if (/^A native Himalayan .* of the family /i.test(desc)) return true;
  if (/^The .* is a widely distributed bird species/i.test(desc)) return true;
  if (/^A documented (chiroptera|rodentia|carnivora|eulipotyphla|artiodactyla|lagomorpha|primates) of the Western Himalayas/i.test(desc)) {
    return true;
  }
  const pref = desc.slice(0, 48).toLowerCase();
  if ((SPECIES_DESC_PREFIX_COUNTS.get(pref) || 0) >= 3) {
    return true;
  }
  return false;
}

const WATER_BY_SEG_AND_SLUG = new Map<string, WaterEntity>();
function registerWaterList(seg: string, list: WaterEntity[]) {
  for (const item of list) {
    WATER_BY_SEG_AND_SLUG.set(`${seg}:${item.slug}`, item);
  }
}
registerWaterList('lakes', lakesData);
registerWaterList('wetlands', wetlandsData);
registerWaterList('rivers', riversData);
registerWaterList('springs', springsData);
registerWaterList('glaciers', glaciersData);
registerWaterList('watersheds', watershedsData);
registerWaterList('groundwater', groundwaterData);
registerWaterList('water-quality', waterQualitySites);
registerWaterList('fisheries', fisheriesData);
registerWaterList('flood-risk', floodRiskZones);
registerWaterList('restoration', restorationSites);

const WATER_DESC_PREFIX_COUNTS = new Map<string, number>();
for (const item of WATER_BY_SEG_AND_SLUG.values()) {
  const pref = (item.description || '').trim().slice(0, 48).toLowerCase();
  if (pref) {
    WATER_DESC_PREFIX_COUNTS.set(pref, (WATER_DESC_PREFIX_COUNTS.get(pref) || 0) + 1);
  }
}

export function isTemplatedWaterStub(entity: WaterEntity | undefined): boolean {
  if (!entity) return true;
  const desc = (entity.description || '').trim();
  if (desc.length < 90) return true;
  if (/^Modeled GIS catchment unit under the /i.test(desc)) return true;
  const pref = desc.slice(0, 48).toLowerCase();
  if ((WATER_DESC_PREFIX_COUNTS.get(pref) || 0) >= 4) return true;
  return false;
}

const DWS_SLUGS = new Set<string>(
  drinkingWaterSources.map((d: any) => String(d.slug || d.id))
);

const NGO_BY_SLUG = new Map<string, any>(
  ngoRegistryData.map((n: any) => [String(n.slug || n.id), n])
);
const NGO_PROJ_BY_SLUG = new Map<string, any>(
  ngoRegistryData
    .flatMap((n: any) => (Array.isArray(n.projects) ? n.projects : []))
    .map((p: any) => [String(p.slug || p.id), p])
);

export function isUnverifiedNgoRecord(rec: any): boolean {
  if (!rec) return true;
  const serialized = JSON.stringify(rec);
  if (
    /candidate (community )?stakeholder|verify local contact|darpan sample record|verify relevance|manual verification/i.test(
      serialized
    )
  ) {
    return true;
  }
  const mainDesc = String(
    rec.mission_summary ||
      rec.problem_addressed ||
      rec.ecological_outcome ||
      rec.description ||
      rec.summary ||
      ''
  ).trim();
  if (mainDesc.length < 70) return true;
  return false;
}

const PROTECTED_AREAS_ALL = getProtectedAreas.all();
const PA_SLUGS = new Set<string>(PROTECTED_AREAS_ALL.map((p: any) => p.slug));
const CORRIDOR_SLUGS = new Set<string>(corridorsData.map((c: any) => c.slug));
const PA_REPORT_SLUGS = new Set<string>(reportsData.map((r: any) => r.slug));
const PA_TRAIL_SLUGS = new Set<string>(trailsData.map((t: any) => t.slug));
const PA_THREAT_SLUGS = new Set<string>(threatsData.map((t: any) => t.slug));
const PA_SPECIES_SLUGS = new Set<string>(speciesProfilesData.map((s: any) => s.slug));

const EVIDENCE_IDS = new Set<string>(evidenceRegistry.map((e) => e.id));
const FIELD_REPORT_BY_ID = new Map<string, any>(
  fieldReportsRegistry.map((r) => [r.id, r])
);
const EIA_ASSESSMENT_IDS = new Set<string>(
  SHARED_ASSESSMENT_DATABASE.map((a: any) => a.id)
);
const CONFERENCE_IDS = new Set<string>(CONFERENCES_DETAILED.map((c) => c.id));
const SESSION_IDS = new Set<string>(SESSIONS_DETAILED.map((s) => s.id));
const WEBINAR_IDS = new Set<string>(SCIENTIFIC_WEBINARS.map((w) => w.id));

const REDIRECT_SOURCE_PATHS = new Set<string>([
  '/admin',
  '/submit-sighting',
  '/plastic-pollution',
  '/chinar-monitoring',
  '/transportation-pollution',
  '/hazard-intelligence/western-disturbances',
  '/research-library/reports',
  '/risk-monitoring/hazard-risks',
  '/webinars/admin/certificates',
  '/water-systems/wetlands/haigam-wetland',
  '/water-systems/wetlands/haigam',
  '/water-systems/wetlands/hokersar',
  '/water-systems/wetlands/shallabugh',
  '/water-systems/glaciers/kolahoi',
  '/water-systems/springs/kokernag',
  '/protected-areas/dachigam',
]);

function isRedirectStubPath(pathname: string): boolean {
  if (REDIRECT_SOURCE_PATHS.has(pathname)) return true;
  if (
    pathname.startsWith('/resources/environmental-pil/') ||
    pathname.startsWith('/resources/kew-green-heroes/')
  ) {
    return true;
  }
  if (pathname.endsWith('/overview') && pathname.startsWith('/webinars/conferences/')) {
    return true;
  }
  if (pathname.endsWith('/details') && pathname.startsWith('/webinars/sessions/')) {
    return true;
  }
  return false;
}

/**
 * Checks whether a specific pathname should be marked `noindex` in page metadata
 * because it is a thin templated stub, restricted record, or duplicate alias.
 */
export function shouldNoIndexDynamicEntity(pathname: string): boolean {
  const parts = pathname.split('/').filter(Boolean);
  if (parts[0] === 'biodiversity' && parts[1] === 'species' && parts[2]) {
    const sp = SPECIES_BY_SLUG.get(parts[2]);
    return isTemplatedSpeciesStub(sp);
  }
  if (
    parts[0] === 'water-systems' &&
    parts.length === 3 &&
    parts[1] !== 'drinking-water-sources' &&
    parts[1] !== 'dashboards'
  ) {
    const entity = WATER_BY_SEG_AND_SLUG.get(`${parts[1]}:${parts[2]}`);
    return isTemplatedWaterStub(entity);
  }
  if (parts[0] === 'ngo-impact' && parts[1] === 'project' && parts[2]) {
    return isUnverifiedNgoRecord(NGO_PROJ_BY_SLUG.get(parts[2]));
  }
  if (parts[0] === 'ngo-impact' && parts.length === 2 && !['archives', 'directory', 'map', 'projects', 'submit'].includes(parts[1])) {
    return isUnverifiedNgoRecord(NGO_BY_SLUG.get(parts[1]));
  }
  if (parts[0] === 'field-reports' && parts.length === 2 && !['biodiversity', 'environmental-monitoring', 'hazard-intelligence', 'protected-areas', 'water-systems'].includes(parts[1])) {
    const fr = FIELD_REPORT_BY_ID.get(parts[1]);
    return !fr || fr.visibility === 'restricted' || fr.status === 'restricted';
  }
  return false;
}

function resolveSitemapPriority(
  pathname: string,
  docType?: string
): {
  priority: number;
  changeFrequency: ValidatedSitemapEntry['changeFrequency'];
} {
  if (pathname === '/') return { priority: 1.0, changeFrequency: 'daily' };
  const depth = pathname.split('/').filter(Boolean).length;
  if (depth === 1) return { priority: 0.9, changeFrequency: 'weekly' };
  if (
    pathname.startsWith('/water-systems/lakes/') ||
    pathname.startsWith('/water-systems/wetlands/') ||
    pathname.startsWith('/water-systems/glaciers/') ||
    pathname.startsWith('/water-systems/rivers/') ||
    pathname.startsWith('/water-systems/springs/') ||
    pathname.startsWith('/library/') ||
    pathname.startsWith('/field-reports/') ||
    pathname.startsWith('/research-library') ||
    pathname.startsWith('/open-data')
  ) {
    return { priority: 0.85, changeFrequency: 'weekly' };
  }
  if (
    docType === 'protected_area' ||
    docType === 'district' ||
    docType === 'eia_assessment' ||
    pathname.startsWith('/protected-network/') ||
    pathname.startsWith('/hazard-intelligence/') ||
    pathname.startsWith('/environmental-monitoring/') ||
    pathname.startsWith('/sectoral-eia/')
  ) {
    return { priority: 0.8, changeFrequency: 'weekly' };
  }
  return { priority: 0.7, changeFrequency: 'monthly' };
}

/**
 * Executes the complete inventory audit across all candidate corpus + static routes,
 * returning both the pruned eligible sitemap entries and exact audit counts.
 */
export function buildValidatedSitemapInventory(): {
  entries: ValidatedSitemapEntry[];
  audit: SitemapAuditBreakdown;
} {
  const corpus = getCompiledSearchCorpus();
  const defaultDate = new Date('2026-11-25T00:00:00Z');

  // Collect all unique candidate paths from search corpus + static app routes
  const candidateMap = new Map<string, { lastUpdated?: string; documentType?: string }>();
  candidateMap.set('/', { documentType: 'module_page' });

  // Also include all static page.tsx files so we audit the true full candidate universe
  const appDir = path.join(process.cwd(), 'src', 'app');
  function walkPages(dir: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walkPages(full);
      else if (entry.name === 'page.tsx') {
        const rel = path.relative(appDir, path.dirname(full)).replace(/\\/g, '/');
        const route = rel ? `/${rel}` : '/';
        if (!route.includes('[') && !candidateMap.has(route)) {
          candidateMap.set(route, { documentType: 'module_page' });
        }
      }
    }
  }
  walkPages(appDir);

  for (const doc of corpus.documents) {
    if (!doc.canonicalUrl || !doc.canonicalUrl.startsWith('/')) continue;
    const rawNoHash = doc.canonicalUrl.split('#')[0];
    if (rawNoHash.includes('?')) continue; // Tab query-views are not standalone pages
    const clean =
      rawNoHash.length > 1 && rawNoHash.endsWith('/') ? rawNoHash.slice(0, -1) : rawNoHash;
    if (clean.includes('[')) continue;
    if (!candidateMap.has(clean)) {
      candidateMap.set(clean, {
        lastUpdated: doc.lastUpdated,
        documentType: doc.documentType,
      });
    }
  }

  const audit: SitemapAuditBreakdown = {
    totalCandidateUrls: candidateMap.size,
    validEligibleUrls: 0,
    invalidOrSoft404Urls: 0,
    redirectedUrls: 0,
    duplicateUrls: 0,
    nonIndexableUrls: 0,
    thinOrTemplatedUrls: 0,
    restrictedUrls: 0,
    breakdownNotes: {},
  };

  function note(key: string) {
    audit.breakdownNotes[key] = (audit.breakdownNotes[key] || 0) + 1;
  }

  const eligible: ValidatedSitemapEntry[] = [];

  for (const [pathname, meta] of candidateMap.entries()) {
    // 1. Redirected routes & compatibility stubs
    if (isRedirectStubPath(pathname)) {
      audit.redirectedUrls++;
      note('redirect_stub_or_config_redirect');
      continue;
    }

    // 2. Non-indexable administrative, auth, live-room & dev utility routes
    if (
      isNonPublicRoute(pathname) ||
      (pathname.startsWith('/webinars/sessions/') && pathname.endsWith('/live')) ||
      pathname === '/ngo-impact/submit' ||
      pathname === '/sectoral-eia/assessment/new'
    ) {
      audit.nonIndexableUrls++;
      note('admin_auth_or_form_utility_noindex');
      continue;
    }

    // 3. Duplicate route clusters & duplicate entity aliases
    if (DUPLICATE_ROUTE_CANONICAL_OVERRIDES[pathname]) {
      audit.duplicateUrls++;
      note('duplicate_route_canonical_alias');
      continue;
    }
    if (pathname.startsWith('/protected-areas/') && pathname !== '/protected-areas') {
      // /protected-areas/[slug] renders the identical ProtectedAreaDetailPage as /protected-network/<cat>/[slug]
      audit.duplicateUrls++;
      note('duplicate_protected_area_alias');
      continue;
    }
    if (pathname.startsWith('/biodiversity/district/') && pathname !== '/biodiversity/district') {
      // Overlaps /biodiversity/district-profiles/[slug] & /districts/[slug]
      audit.duplicateUrls++;
      note('duplicate_biodiversity_district_alias');
      continue;
    }

    const parts = pathname.split('/').filter(Boolean);

    // 4. Validate dynamic entity routes against exact page backing stores & content depth
    // 4a. Biodiversity Species (/biodiversity/species/[slug])
    if (parts[0] === 'biodiversity' && parts[1] === 'species' && parts[2]) {
      const sp = SPECIES_BY_SLUG.get(parts[2]);
      if (!sp) {
        audit.invalidOrSoft404Urls++;
        note('soft404_missing_species_slug');
        continue;
      }
      if (isTemplatedSpeciesStub(sp)) {
        audit.thinOrTemplatedUrls++;
        note(`templated_species_${sp.taxonomicGroup || 'flora'}`);
        continue;
      }
      if (getCanonicalSpeciesSlug(parts[2]) !== parts[2]) {
        audit.duplicateUrls++;
        note('duplicate_species_scientific_alias');
        continue;
      }
    }

    // 4b. Water Systems Dynamic Entities (/water-systems/<seg>/<slug>)
    if (parts[0] === 'water-systems' && parts.length === 3 && parts[1] !== 'dashboards') {
      const [, seg, slug] = parts;
      if (seg === 'drinking-water-sources') {
        const staticDwsSubpages = new Set([
          'distribution-network',
          'groundwater',
          'piped-water-supply',
          'rainwater-harvesting',
          'water-quality-testing',
          'water-treatment',
        ]);
        if (!staticDwsSubpages.has(slug) && !DWS_SLUGS.has(slug)) {
          audit.invalidOrSoft404Urls++;
          note('soft404_missing_drinking_water_source');
          continue;
        }
      } else {
        const entity = WATER_BY_SEG_AND_SLUG.get(`${seg}:${slug}`);
        if (!entity) {
          audit.invalidOrSoft404Urls++;
          note(`soft404_missing_water_${seg}`);
          continue;
        }
        if (isTemplatedWaterStub(entity)) {
          audit.thinOrTemplatedUrls++;
          note(`templated_water_${seg}`);
          continue;
        }
      }
    }

    // 4c. Protected Network Dynamic Entities
    if (parts[0] === 'protected-network' && parts.length >= 3 && parts[1] !== 'human-wildlife-conflict') {
      const [, cat, slug] = parts;
      if (slug !== 'request') {
        const validSet =
          cat === 'corridors-and-connectivity'
            ? CORRIDOR_SLUGS
            : cat === 'reports-and-plans'
            ? PA_REPORT_SLUGS
            : cat === 'trails-and-sightings'
            ? PA_TRAIL_SLUGS
            : cat === 'monitoring-and-threats'
            ? PA_THREAT_SLUGS
            : cat === 'species-intelligence'
            ? PA_SPECIES_SLUGS
            : PA_SLUGS;
        if (!validSet.has(slug)) {
          audit.invalidOrSoft404Urls++;
          note(`soft404_protected_network_${cat}`);
          continue;
        }
      }
    }

    // 4d. Field Reports (/field-reports/[id]) — check existence & restricted visibility
    if (
      parts[0] === 'field-reports' &&
      parts.length === 2 &&
      !['biodiversity', 'environmental-monitoring', 'hazard-intelligence', 'protected-areas', 'water-systems'].includes(
        parts[1]
      )
    ) {
      const fr = FIELD_REPORT_BY_ID.get(parts[1]);
      if (!fr) {
        audit.invalidOrSoft404Urls++;
        note('soft404_missing_field_report');
        continue;
      }
      if (fr.visibility === 'restricted' || fr.status === 'restricted') {
        audit.restrictedUrls++;
        note('restricted_field_report');
        continue;
      }
    }

    // 4e. Evidence Library (/library/[id])
    if (parts[0] === 'library' && parts.length === 2) {
      if (!EVIDENCE_IDS.has(parts[1])) {
        audit.invalidOrSoft404Urls++;
        note('soft404_missing_evidence_item');
        continue;
      }
    }

    // 4f. Sectoral EIA Assessments (/sectoral-eia/assessment/[id])
    if (parts[0] === 'sectoral-eia' && parts[1] === 'assessment' && parts[2]) {
      if (!EIA_ASSESSMENT_IDS.has(parts[2])) {
        audit.invalidOrSoft404Urls++;
        note('soft404_missing_eia_assessment');
        continue;
      }
    }

    // 4g. NGO Profiles & Projects — exclude unverified DARPAN/candidate stakeholder notes
    if (parts[0] === 'ngo-impact' && parts[1] === 'project' && parts[2]) {
      const proj = NGO_PROJ_BY_SLUG.get(parts[2]);
      if (!proj) {
        audit.invalidOrSoft404Urls++;
        note('soft404_missing_ngo_project');
        continue;
      }
      if (isUnverifiedNgoRecord(proj)) {
        audit.thinOrTemplatedUrls++;
        note('unverified_or_thin_ngo_project');
        continue;
      }
    }
    if (
      parts[0] === 'ngo-impact' &&
      parts.length === 2 &&
      !['archives', 'directory', 'map', 'projects', 'submit'].includes(parts[1])
    ) {
      const ngo = NGO_BY_SLUG.get(parts[1]);
      if (!ngo) {
        audit.invalidOrSoft404Urls++;
        note('soft404_missing_ngo_profile');
        continue;
      }
      if (isUnverifiedNgoRecord(ngo)) {
        audit.thinOrTemplatedUrls++;
        note('unverified_or_thin_ngo_profile');
        continue;
      }
    }

    // 4h. Webinars, Conferences & Sessions
    if (parts[0] === 'webinars' && parts[1] === 'conferences' && parts[2]) {
      if (!CONFERENCE_IDS.has(parts[2])) {
        audit.invalidOrSoft404Urls++;
        note('soft404_missing_conference');
        continue;
      }
    }
    if (parts[0] === 'webinars' && parts[1] === 'sessions' && parts[2]) {
      if (!SESSION_IDS.has(parts[2])) {
        audit.invalidOrSoft404Urls++;
        note('soft404_missing_session');
        continue;
      }
    }
    if (
      parts[0] === 'webinars' &&
      parts.length === 2 &&
      ![
        'admin',
        'calendar',
        'camera-test',
        'certificates',
        'conferences',
        'create',
        'host-a-conference',
        'institution',
        'past-events',
        'proceedings',
        'room',
        'sessions',
        'upcoming',
      ].includes(parts[1])
    ) {
      if (!WEBINAR_IDS.has(parts[1])) {
        audit.invalidOrSoft404Urls++;
        note('soft404_missing_webinar');
        continue;
      }
    }

    // Passed all validation gates!
    audit.validEligibleUrls++;
    const parsedDate = meta.lastUpdated ? new Date(meta.lastUpdated) : defaultDate;
    const validDate = Number.isNaN(parsedDate.getTime()) ? defaultDate : parsedDate;
    const { priority, changeFrequency } = resolveSitemapPriority(pathname, meta.documentType);

    eligible.push({
      pathname,
      url: pathname === '/' ? CANONICAL_SITE_URL : `${CANONICAL_SITE_URL}${pathname}`,
      lastModified: validDate,
      changeFrequency,
      priority,
    });
  }

  eligible.sort((a, b) => b.priority - a.priority || a.pathname.localeCompare(b.pathname));
  return { entries: eligible, audit };
}
