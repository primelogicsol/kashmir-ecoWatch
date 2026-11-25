// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — DYNAMIC ENTITY METADATA & JSON-LD RESOLVER
// Resolves exact entity titles, descriptions, canonical URLs, Highwire Scholar
// citation_* meta tags, and Schema.org JSON-LD for all 71 dynamic routes.
// Reuses the canonical unified search corpus & primary registries (zero duplication).
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from 'next';
import { getCompiledSearchCorpus } from '@/lib/search/index-builder';
import type { SearchDocument } from '@/lib/search/types';
import { evidenceRegistry } from '@/data/evidence-intelligence';
import { getReportById } from '@/data/field-reports-registry';
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
import { CONFERENCES_DETAILED, SESSIONS_DETAILED } from '@/data/conference-system';
import { SCIENTIFIC_WEBINARS } from '@/data/webinars';
import { KEW_IDENTITY } from './entity-identity';
import { buildPageMetadata, getStaticRouteMetadata } from './route-metadata';
import { getCanonicalSpeciesSlug, shouldNoIndexDynamicEntity } from './sitemap-validator';
import { getProtectedAreas } from '@/data/protected-network';
import {
  buildScholarlyArticleJsonLd,
  buildWaterEntityJsonLd,
  toAbsoluteCanonicalUrl,
} from './structured-data';

const globalForSeo = globalThis as unknown as {
  __kewSeoByPath?: Map<string, SearchDocument>;
  __kewSeoBuiltAt?: string;
};

export function getSearchDocByCanonicalPath(pathname: string): SearchDocument | undefined {
  const corpus = getCompiledSearchCorpus();
  if (!globalForSeo.__kewSeoByPath || globalForSeo.__kewSeoBuiltAt !== corpus.builtAt) {
    const map = new Map<string, SearchDocument>();
    for (const doc of corpus.documents) {
      if (!doc.canonicalUrl) continue;
      const clean = doc.canonicalUrl.split(/[?#]/)[0] || '/';
      const norm = clean.length > 1 && clean.endsWith('/') ? clean.slice(0, -1) : clean;
      if (!map.has(norm)) {
        map.set(norm, doc);
      }
    }
    globalForSeo.__kewSeoByPath = map;
    globalForSeo.__kewSeoBuiltAt = corpus.builtAt;
  }
  const cleanLookup =
    pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return globalForSeo.__kewSeoByPath.get(cleanLookup);
}

const WETLAND_SLUG_ALIASES: Record<string, string> = {
  'haigam-wetland': 'hygam-wetland',
  haigam: 'hygam-wetland',
  hygam: 'hygam-wetland',
  hokersar: 'hokersar-wetland',
  shallabugh: 'shallabugh-wetland',
};

const WATER_COLLECTION_BY_SEGMENT: Record<string, WaterEntity[]> = {
  lakes: lakesData,
  wetlands: wetlandsData,
  rivers: riversData,
  springs: springsData,
  glaciers: glaciersData,
  watersheds: watershedsData,
  groundwater: groundwaterData,
  'water-quality': waterQualitySites,
  fisheries: fisheriesData,
  'flood-risk': floodRiskZones,
  restoration: restorationSites,
};

export function resolveWaterEntity(segment: string, rawSlug: string): WaterEntity | undefined {
  const list = WATER_COLLECTION_BY_SEGMENT[segment];
  if (!list) return undefined;
  const slug = segment === 'wetlands' ? WETLAND_SLUG_ALIASES[rawSlug] || rawSlug : rawSlug;
  return list.find((item) => item.slug === slug || item.id === slug);
}

function collectMultilingualKeywords(doc?: SearchDocument): string[] {
  if (!doc) return [];
  const out = [...(doc.tags || []), ...(doc.synonyms || [])];
  if (doc.multilingualTerms) {
    if (doc.multilingualTerms.ur) out.push(...doc.multilingualTerms.ur);
    if (doc.multilingualTerms.ks) out.push(...doc.multilingualTerms.ks);
    if (doc.multilingualTerms.translit) out.push(...doc.multilingualTerms.translit);
  }
  return out.slice(0, 18);
}

/**
 * Resolves Metadata + optional JSON-LD payload for any dynamic route path.
 */
export function resolveDynamicPageSeo(exactPath: string): {
  metadata: Metadata;
  jsonLd?: Record<string, unknown>;
} {
  const cleanPath =
    exactPath.length > 1 && exactPath.endsWith('/') ? exactPath.slice(0, -1) : exactPath;
  const parts = cleanPath.split('/').filter(Boolean);

  // 1. Water Systems Dynamic Entities (/water-systems/<segment>/<slug>)
  if (parts[0] === 'water-systems' && parts.length === 3 && parts[1] !== 'drinking-water-sources') {
    const [, segment, rawSlug] = parts;
    const entity = resolveWaterEntity(segment, rawSlug);
    if (entity) {
      const canonicalPath = `/water-systems/${segment}/${entity.slug}`;
      const doc = getSearchDocByCanonicalPath(canonicalPath);
      const isSheshnag = entity.slug === 'sheshnag-lake';
      const title = isSheshnag
        ? 'Sheshnag Lake: Glacial Origin, Alpine Ecology & Environmental Sensitivity'
        : `${entity.name} (${entity.district}) — ${entity.category || 'Hydrology, Ecology & Water Quality'}`;
      const description = `${entity.description} Elevation: ${entity.elevation}m, Watershed: ${entity.watershed}, District: ${entity.district}. Published by ${KEW_IDENTITY.extendedName}.`;

      return {
        metadata: buildPageMetadata({
          title,
          description: description.slice(0, 300),
          canonicalPath,
          ogType: 'article',
          modifiedTime: entity.updatedAt,
          noIndex: shouldNoIndexDynamicEntity(canonicalPath),
          keywords: [
            entity.name,
            `${entity.name} ecology`,
            `${entity.name} pollution`,
            entity.district,
            entity.watershed,
            entity.category,
            ...collectMultilingualKeywords(doc),
          ].filter(Boolean),
          scholarCitation: {
            title: `${entity.name}: Hydrological, Limnological and Ecological Baseline Assessment`,
            authors: [KEW_IDENTITY.extendedName],
            publicationDate: (entity.createdAt || '2026-06-18').split('T')[0],
            institution: KEW_IDENTITY.extendedName,
            pdfOrDataUrl: `/api/datasets/water/${entity.slug}?format=csv`,
            keywords: [entity.name, entity.district, entity.watershed, entity.category],
          },
        }),
        jsonLd: buildWaterEntityJsonLd({
          ...entity,
          routePrefix: `/water-systems/${segment}`,
        }),
      };
    }
  }

  // 2. Evidence & Scientific Publications Library (/library/<id>)
  if (parts[0] === 'library' && parts.length === 2) {
    const id = parts[1];
    const item = evidenceRegistry.find((e) => e.id === id);
    if (item) {
      const canonicalPath = `/library/${item.id}`;
      return {
        metadata: buildPageMetadata({
          title: `${item.title} — Scientific Assessment & Evidence`,
          description: item.abstract || item.description,
          canonicalPath,
          ogType: 'article',
          publishedTime: item.publishedDate,
          modifiedTime: item.lastUpdated,
          authors: item.authors,
          keywords: [...item.keywords, ...item.tags],
          scholarCitation: {
            title: item.title,
            authors: item.authors,
            publicationDate: item.publishedDate,
            institution: item.organization || KEW_IDENTITY.extendedName,
            doi: item.doi,
            pdfOrDataUrl: `/api/datasets/evidence/${item.id}?format=csv`,
            keywords: item.keywords,
          },
        }),
        jsonLd: buildScholarlyArticleJsonLd({
          id: item.id,
          title: item.title,
          description: item.abstract || item.description,
          canonicalPath,
          authors: item.authors,
          sourceOrganization: item.organization || KEW_IDENTITY.extendedName,
          datePublished: item.publishedDate,
          dateModified: item.lastUpdated,
          keywords: item.keywords,
          districts: item.districts,
          coordinates:
            item.locations && item.locations[0]?.lat && item.locations[0]?.lng
              ? { lat: item.locations[0].lat, lng: item.locations[0].lng }
              : undefined,
          doi: item.doi,
          datasetDownloadPath: `/api/datasets/evidence/${item.id}`,
        }),
      };
    }
  }

  // 3. Field Intelligence Reports (/field-reports/<id>)
  if (parts[0] === 'field-reports' && parts.length === 2) {
    const report = getReportById(parts[1]);
    if (report) {
      const canonicalPath = `/field-reports/${report.id}`;
      return {
        metadata: buildPageMetadata({
          title: `${report.title} — Field Intelligence Report`,
          description: report.summary,
          canonicalPath,
          ogType: 'article',
          publishedTime: report.date,
          modifiedTime: report.lastUpdated,
          authors: [report.source],
          noIndex: report.visibility === 'restricted',
          keywords: [...report.tags, ...report.districts, ...report.entities],
          scholarCitation: {
            title: report.title,
            authors: [report.source],
            publicationDate: report.date,
            institution: KEW_IDENTITY.extendedName,
            pdfOrDataUrl: `/api/datasets/field-report/${report.id}?format=csv`,
            keywords: report.tags,
          },
        }),
        jsonLd: buildScholarlyArticleJsonLd({
          id: report.id,
          title: report.title,
          description: report.summary,
          canonicalPath,
          authors: [report.source],
          sourceOrganization: report.source,
          reviewedBy: report.reviewedBy,
          datePublished: report.date,
          dateModified: report.lastUpdated,
          keywords: report.tags,
          districts: report.districts,
          datasetDownloadPath: `/api/datasets/field-report/${report.id}`,
        }),
      };
    }
  }

  // 4. Conferences & Sessions (/webinars/conferences/[conferenceId]/** & /webinars/sessions/[sessionId]/**)
  if (parts[0] === 'webinars' && parts[1] === 'conferences' && parts[2]) {
    const conf = CONFERENCES_DETAILED.find((c) => c.id === parts[2]);
    if (conf) {
      const subpage = parts[3];
      const subLabel = subpage
        ? subpage.charAt(0).toUpperCase() + subpage.slice(1)
        : 'Overview & Scientific Program';
      const confSummary =
        (conf as any).subtitle ||
        (conf as any).description ||
        conf.theme ||
        `Scientific conference hosted on ${KEW_IDENTITY.extendedName}.`;
      return {
        metadata: buildPageMetadata({
          title: `${conf.title} — ${subLabel}`,
          description: confSummary,
          canonicalPath: subpage === 'overview' ? `/webinars/conferences/${conf.id}` : cleanPath,
          keywords: [conf.title, 'Kashmir environmental conference', 'Himalayan symposium'],
        }),
        jsonLd: {
          '@context': 'https://schema.org',
          '@type': 'EducationEvent',
          name: conf.title,
          description: confSummary,
          url: toAbsoluteCanonicalUrl(`/webinars/conferences/${conf.id}`),
          eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
          eventStatus: 'https://schema.org/EventScheduled',
          organizer: { '@id': KEW_IDENTITY.entityId },
        },
      };
    }
  }

  if (parts[0] === 'webinars' && parts[1] === 'sessions' && parts[2]) {
    const sess = SESSIONS_DETAILED.find((s) => s.id === parts[2]);
    if (sess) {
      const subpage = parts[3];
      const subLabel = subpage ? subpage.charAt(0).toUpperCase() + subpage.slice(1) : 'Session Details';
      return {
        metadata: buildPageMetadata({
          title: `${sess.title} — ${subLabel}`,
          description: sess.abstract || `Scientific webinar session on ${KEW_IDENTITY.extendedName}.`,
          canonicalPath: subpage === 'details' ? `/webinars/sessions/${sess.id}` : cleanPath,
          noIndex: subpage === 'live',
        }),
      };
    }
  }

  if (parts[0] === 'webinars' && parts.length === 2) {
    const web = SCIENTIFIC_WEBINARS.find((w) => w.id === parts[1]);
    if (web) {
      const webSummary =
        (web as any).abstract ||
        (web as any).subtitle ||
        `${web.title} (${web.discipline} · ${web.dateDisplay}) hosted on ${KEW_IDENTITY.extendedName}.`;
      return {
        metadata: buildPageMetadata({
          title: `${web.title} — Scientific Webinar`,
          description: webSummary,
          canonicalPath: cleanPath,
        }),
      };
    }
  }

  // 4b. Consolidate /protected-areas/[slug] canonical URL to primary /protected-network/<category>/[slug]
  if (parts[0] === 'protected-areas' && parts.length === 2) {
    const area = getProtectedAreas.bySlug(parts[1]);
    if (area) {
      const catSlugMap: Record<string, string> = {
        'national-park': 'national-parks',
        'wildlife-sanctuary': 'wildlife-sanctuaries',
        'wetland-reserve': 'wetland-reserves',
        'conservation-reserve': 'conservation-reserves',
        'bird-habitat-area': 'bird-and-habitat-areas',
      };
      const catFolder = catSlugMap[(area as any).category] || 'national-parks';
      const primaryCanonical = `/protected-network/${catFolder}/${area.slug}`;
      return {
        metadata: buildPageMetadata({
          title: `${area.name} — Protected Area Conservation Profile`,
          description: area.description.slice(0, 300),
          canonicalPath: primaryCanonical,
          noIndex: true,
        }),
      };
    }
  }

  // 5. Protected Area nested sub-views (/protected-network/<cat>/<slug>/{map,management-plan})
  if (
    parts[0] === 'protected-network' &&
    parts.length === 4 &&
    (parts[3] === 'map' || parts[3] === 'management-plan')
  ) {
    const baseEntityPath = `/${parts[0]}/${parts[1]}/${parts[2]}`;
    const baseDoc = getSearchDocByCanonicalPath(baseEntityPath);
    if (baseDoc) {
      const viewLabel =
        parts[3] === 'map'
          ? 'Interactive GIS Boundary & Habitat Map'
          : 'Conservation Management Plan & Zonation';
      return {
        metadata: buildPageMetadata({
          title: `${baseDoc.title} — ${viewLabel}`,
          description: `${viewLabel} for ${baseDoc.title}${baseDoc.district ? ` (${baseDoc.district})` : ''}. ${baseDoc.description}`.slice(
            0,
            300
          ),
          canonicalPath: cleanPath,
          keywords: collectMultilingualKeywords(baseDoc),
        }),
      };
    }
  }

  // 6. Universal Search Corpus Lookup (Species, Protected Areas, Districts, NGOs, EIA, Alerts, Risk Updates, EcoVoices, etc.)
  const doc = getSearchDocByCanonicalPath(cleanPath);
  if (doc) {
    const suffix = doc.subtitle
      ? `${doc.title} — ${doc.subtitle}`
      : doc.district
      ? `${doc.title} (${doc.district}) — ${doc.parentModule}`
      : `${doc.title} — ${doc.parentModule}`;

    let jsonLd: Record<string, unknown> | undefined;
    if (doc.documentType === 'species') {
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Taxon',
        name: doc.title,
        description: doc.description,
        url: toAbsoluteCanonicalUrl(cleanPath),
        alternateName: collectMultilingualKeywords(doc).slice(0, 8),
      };
    } else if (doc.documentType === 'protected_area' || doc.documentType === 'district') {
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Place',
        name: doc.title,
        description: doc.description,
        url: toAbsoluteCanonicalUrl(cleanPath),
        ...(doc.coordinates && doc.coordinates.precision !== 'approximate'
          ? {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: doc.coordinates.lat,
                longitude: doc.coordinates.lng,
              },
            }
          : {}),
      };
    }

    const rawDesc = (doc.description || '').trim();
    const enrichedDesc =
      rawDesc.length >= 65
        ? rawDesc
        : `${doc.title}${doc.subtitle ? ` (${doc.subtitle})` : ''}${
            doc.district ? ` in ${doc.district}` : ''
          } — verified ecological baseline, seasonal dynamics, and spatial intelligence under ${
            doc.parentModule
          } published by ${KEW_IDENTITY.extendedName}. ${rawDesc}`.trim();

    let effectiveCanonical = cleanPath;
    let duplicateAliasNoIndex = false;
    if (parts[0] === 'biodiversity' && parts[1] === 'species' && parts[2]) {
      const primarySlug = getCanonicalSpeciesSlug(parts[2]);
      if (primarySlug !== parts[2]) {
        effectiveCanonical = `/biodiversity/species/${primarySlug}`;
        duplicateAliasNoIndex = true;
      }
    }

    return {
      metadata: buildPageMetadata({
        title: suffix,
        description: enrichedDesc.slice(0, 300),
        canonicalPath: effectiveCanonical,
        modifiedTime: doc.lastUpdated,
        noIndex: duplicateAliasNoIndex || shouldNoIndexDynamicEntity(cleanPath),
        keywords: collectMultilingualKeywords(doc),
      }),
      jsonLd,
    };
  }

  // Fallback to humanized static route synthesis
  return {
    metadata: getStaticRouteMetadata(cleanPath),
  };
}
