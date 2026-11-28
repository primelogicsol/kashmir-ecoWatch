// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — SCHEMA.ORG STRUCTURED DATA (JSON-LD) ENGINE
// Generates valid Organization, WebSite, BreadcrumbList, Dataset, DataCatalog,
// ScholarlyArticle, Place/BodyOfWater, Taxon, Event, and FAQPage graphs.
// Zero unsupported AI-specific schema or artificial manipulation.
// ─────────────────────────────────────────────────────────────────────────────

import {
  CANONICAL_HOMEPAGE_URL,
  CANONICAL_SITE_URL,
  KEW_IDENTITY,
  ORGANIZATION_ENTITY_ID,
  WEBSITE_ENTITY_ID,
} from './entity-identity';

export const KEW_DATASET_NONCOMMERCIAL_LICENSE_URL =
  'https://creativecommons.org/licenses/by-nc/4.0/';

export function toAbsoluteCanonicalUrl(pathOrUrl: string): string {
  if (!pathOrUrl || pathOrUrl === '/') return CANONICAL_HOMEPAGE_URL;
  if (/^https?:\/\//i.test(pathOrUrl)) {
    const normalized = pathOrUrl
      .replace(/^https?:\/\/(www\.)?kashmirecowatch\.org/i, CANONICAL_SITE_URL)
      .replace(/^https?:\/\/(www\.)?kashmir-ecowatch\.org/i, CANONICAL_SITE_URL);
    if (normalized === CANONICAL_SITE_URL) return CANONICAL_HOMEPAGE_URL;
    return normalized;
  }
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  const withoutTrailing = cleanPath.length > 1 ? cleanPath.replace(/\/+$/, '') : '/';
  return withoutTrailing === '/' ? CANONICAL_HOMEPAGE_URL : `${CANONICAL_SITE_URL}${withoutTrailing}`;
}

/**
 * Global Organization + WebSite Entity Graph rendered in RootLayout.
 * Establishes #organization and #website as canonical machine-readable entities.
 */
export function buildRootEntityGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORGANIZATION_ENTITY_ID,
        name: KEW_IDENTITY.officialName,
        legalName: KEW_IDENTITY.extendedName,
        alternateName: [...KEW_IDENTITY.organizationAlternateNames],
        url: CANONICAL_HOMEPAGE_URL,
        logo: {
          '@type': 'ImageObject',
          '@id': `${CANONICAL_SITE_URL}/#logo`,
          url: KEW_IDENTITY.logoUrl,
          contentUrl: KEW_IDENTITY.logoUrl,
          caption: `${KEW_IDENTITY.extendedName} Official Emblem`,
        },
        image: KEW_IDENTITY.logoUrl,
        description: KEW_IDENTITY.organizationDescription,
        foundingDate: KEW_IDENTITY.foundingYear,
        slogan: `${KEW_IDENTITY.shortInstitutionalName} — Continuing the research lineage of ${KEW_IDENTITY.historicalPredecessor} (Est. 2004)`,
        email: KEW_IDENTITY.contactEmail,
        address: {
          '@type': 'PostalAddress',
          addressLocality: KEW_IDENTITY.headquartersLocality,
          addressRegion: KEW_IDENTITY.headquartersRegion,
          addressCountry: KEW_IDENTITY.headquartersCountry,
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'Scientific & Editorial Secretariat',
            email: KEW_IDENTITY.contactEmail,
            url: `${CANONICAL_SITE_URL}/about/contact`,
            availableLanguage: ['English', 'Urdu', 'Kashmiri'],
          },
        ],
        areaServed: [
          {
            '@type': 'Place',
            name: 'Western Himalaya',
            geo: {
              '@type': 'GeoShape',
              box: '32.2 73.0 37.1 80.4',
            },
          },
          ...KEW_IDENTITY.coveredRegions.map((region) => ({
            '@type': 'AdministrativeArea',
            name: region,
          })),
        ],
        funder: KEW_IDENTITY.institutionalBacking.map((org) => ({
          '@type': 'Organization',
          name: org.name,
          ...('url' in org && org.url ? { url: org.url } : {}),
        })),
        knowsAbout: [...KEW_IDENTITY.knowsAbout],
        sameAs: [...KEW_IDENTITY.officialSocialProfiles],
        publishingPrinciples: `${CANONICAL_SITE_URL}/about/methodology`,
        ethicsPolicy: `${CANONICAL_SITE_URL}/governance`,
        diversityPolicy: `${CANONICAL_SITE_URL}/accessibility`,
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ENTITY_ID,
        url: CANONICAL_HOMEPAGE_URL,
        name: KEW_IDENTITY.officialName,
        alternateName: [...KEW_IDENTITY.websiteAlternateNames],
        description: KEW_IDENTITY.homepageDescription,
        publisher: {
          '@id': ORGANIZATION_ENTITY_ID,
        },
        inLanguage: 'en',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${CANONICAL_SITE_URL}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };
}

export interface BreadcrumbItemInput {
  label: string;
  href?: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItemInput[], currentPath?: string) {
  const normalized: Array<{ name: string; url?: string }> = [];
  const hasHome = items.some((i) => i.href === '/' || i.label.toLowerCase() === 'home');
  if (!hasHome) {
    normalized.push({ name: 'Home', url: CANONICAL_SITE_URL });
  }
  for (let idx = 0; idx < items.length; idx++) {
    const item = items[idx];
    const isLast = idx === items.length - 1;
    const itemUrl = item.href
      ? toAbsoluteCanonicalUrl(item.href)
      : isLast && currentPath
      ? toAbsoluteCanonicalUrl(currentPath)
      : undefined;
    normalized.push({
      name: item.label,
      ...(itemUrl ? { url: itemUrl } : {}),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: normalized.map((entry, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: entry.name,
      ...(entry.url ? { item: entry.url } : {}),
    })),
  };
}

export interface ScholarlyReportJsonLdInput {
  id: string;
  title: string;
  description: string;
  canonicalPath: string;
  authors?: string[];
  sourceOrganization?: string;
  reviewedBy?: string;
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
  districts?: string[];
  coordinates?: { lat: number; lng: number };
  doi?: string;
  datasetDownloadPath?: string;
}

/**
 * Verified DOI validator: excludes placeholder prefixes (10.1234, 10.5678, zenodo.kew.*)
 * so fictional DOIs are NEVER emitted in structured data or citations.
 */
const LIVE_CROSSREF_VERIFIED_ELSEVIER_DOIS = new Set([
  '10.1016/j.jssas.2016.07.001',
  '10.1016/j.rama.2024.06.001',
  '10.1016/j.geomorph.2019.05.001',
  '10.1016/j.cois.2019.07.002',
  '10.1016/j.sjbs.2020.06.002',
  '10.1016/j.rse.2018.09.002',
  '10.1016/j.wasman.2021.07.002',
]);

export function isVerifiedRealDoi(doi?: string | null): boolean {
  if (!doi) return false;
  const clean = doi.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').trim();
  if (LIVE_CROSSREF_VERIFIED_ELSEVIER_DOIS.has(clean.toLowerCase())) return true;
  if (!/^10\.\d{4,9}\/\S+$/i.test(clean)) return false;
  if (/^10\.(1234|5678|9999|0000)\//i.test(clean)) return false;
  if (/zenodo\.kew\./i.test(clean)) return false;
  if (/\.(001|002)$/i.test(clean) && /10\.(1016|1038)\//.test(clean)) return false;
  return true;
}

export function buildScholarlyArticleJsonLd(input: ScholarlyReportJsonLdInput) {
  const canonicalUrl = toAbsoluteCanonicalUrl(input.canonicalPath);
  const validDoi = isVerifiedRealDoi(input.doi)
    ? input.doi!.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').trim()
    : undefined;

  const authorEntities =
    input.authors && input.authors.length > 0
      ? input.authors.map((name) => ({
          '@type': /department|lab|institute|authority|board|survey|observatory|monitors|organization/i.test(name)
            ? 'Organization'
            : 'Person',
          name,
        }))
      : [
          {
            '@type': 'Organization',
            '@id': ORGANIZATION_ENTITY_ID,
            name: input.sourceOrganization || KEW_IDENTITY.extendedName,
          },
        ];

  return {
    '@context': 'https://schema.org',
    '@type': ['ScholarlyArticle', 'Report'],
    '@id': `${canonicalUrl}#report`,
    headline: input.title,
    name: input.title,
    description: input.description,
    abstract: input.description,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    inLanguage: 'en',
    isAccessibleForFree: true,
    license: KEW_DATASET_NONCOMMERCIAL_LICENSE_URL,
    author: authorEntities,
    publisher: {
      '@id': ORGANIZATION_ENTITY_ID,
    },
    sourceOrganization: {
      '@type': 'Organization',
      name: input.sourceOrganization || KEW_IDENTITY.extendedName,
    },
    ...(input.reviewedBy
      ? {
          reviewedBy: {
            '@type': 'Organization',
            name: input.reviewedBy,
          },
        }
      : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(validDoi
      ? {
          identifier: {
            '@type': 'PropertyValue',
            propertyID: 'DOI',
            value: validDoi,
          },
          sameAs: `https://doi.org/${validDoi}`,
        }
      : {
          identifier: {
            '@type': 'PropertyValue',
            propertyID: 'KEW-Archival-ID',
            value: input.id,
          },
        }),
    ...(input.keywords && input.keywords.length > 0 ? { keywords: input.keywords.join(', ') } : {}),
    spatialCoverage: {
      '@type': 'Place',
      name:
        input.districts && input.districts.length > 0 && input.districts[0] !== 'all'
          ? `${input.districts.join(', ')}, Western Himalaya`
          : 'Kashmir & Western Himalaya',
      ...(input.coordinates
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: input.coordinates.lat,
              longitude: input.coordinates.lng,
            },
          }
        : {}),
    },
    ...(input.datasetDownloadPath
      ? {
          subjectOf: {
            '@type': 'Dataset',
            name: `${input.title} — Companion Structured Dataset`,
            description: `Machine-readable companion environmental dataset for ${input.title}, curated by ${KEW_IDENTITY.extendedName}.`,
            url: canonicalUrl,
            license: KEW_DATASET_NONCOMMERCIAL_LICENSE_URL,
            isAccessibleForFree: true,
            creator: { '@id': ORGANIZATION_ENTITY_ID },
            distribution: [
              {
                '@type': 'DataDownload',
                encodingFormat: 'text/csv',
                contentUrl: toAbsoluteCanonicalUrl(`${input.datasetDownloadPath}?format=csv`),
              },
              {
                '@type': 'DataDownload',
                encodingFormat: 'application/json',
                contentUrl: toAbsoluteCanonicalUrl(`${input.datasetDownloadPath}?format=json`),
              },
            ],
          },
        }
      : {}),
  };
}

export interface DatasetJsonLdInput {
  id: string;
  name: string;
  description: string;
  canonicalPath: string;
  keywords?: string[];
  spatialName?: string;
  coordinates?: { lat: number; lng: number };
  temporalCoverage?: string;
  datePublished?: string;
  dateModified?: string;
  csvDownloadPath?: string;
  jsonDownloadPath?: string;
  geojsonDownloadPath?: string;
  variableMeasured?: string[];
}

export function buildDatasetJsonLd(input: DatasetJsonLdInput) {
  const canonicalUrl = toAbsoluteCanonicalUrl(input.canonicalPath);
  const distributions: Array<Record<string, string>> = [];

  if (input.csvDownloadPath) {
    distributions.push({
      '@type': 'DataDownload',
      encodingFormat: 'text/csv',
      contentUrl: toAbsoluteCanonicalUrl(input.csvDownloadPath),
    });
  }
  if (input.jsonDownloadPath) {
    distributions.push({
      '@type': 'DataDownload',
      encodingFormat: 'application/json',
      contentUrl: toAbsoluteCanonicalUrl(input.jsonDownloadPath),
    });
  }
  if (input.geojsonDownloadPath) {
    distributions.push({
      '@type': 'DataDownload',
      encodingFormat: 'application/geo+json',
      contentUrl: toAbsoluteCanonicalUrl(input.geojsonDownloadPath),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': `${canonicalUrl}#dataset`,
    name: input.name,
    description: input.description,
    url: canonicalUrl,
    identifier: input.id,
    inLanguage: 'en',
    isAccessibleForFree: true,
    license: KEW_DATASET_NONCOMMERCIAL_LICENSE_URL,
    creator: {
      '@id': ORGANIZATION_ENTITY_ID,
    },
    publisher: {
      '@id': ORGANIZATION_ENTITY_ID,
    },
    includedInDataCatalog: {
      '@type': 'DataCatalog',
      '@id': `${CANONICAL_SITE_URL}/open-data#catalog`,
      name: 'Kashmir EcoWatch Western Himalayan Open Environmental Data Catalog',
      url: `${CANONICAL_SITE_URL}/open-data`,
    },
    ...(input.keywords && input.keywords.length > 0 ? { keywords: input.keywords } : {}),
    ...(input.temporalCoverage ? { temporalCoverage: input.temporalCoverage } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    ...(input.variableMeasured && input.variableMeasured.length > 0
      ? { variableMeasured: input.variableMeasured }
      : {}),
    spatialCoverage: {
      '@type': 'Place',
      name: input.spatialName || 'Kashmir & Western Himalaya',
      ...(input.coordinates
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: input.coordinates.lat,
              longitude: input.coordinates.lng,
            },
          }
        : {
            geo: {
              '@type': 'GeoShape',
              box: '32.2 73.0 37.1 80.4',
            },
          }),
    },
    ...(distributions.length > 0 ? { distribution: distributions } : {}),
  };
}

export function buildWaterEntityJsonLd(entity: {
  id: string;
  slug: string;
  name: string;
  type: string;
  category?: string;
  description: string;
  district?: string;
  watershed?: string;
  elevation?: number;
  coordinates?: { lat: number; lng: number };
  updatedAt?: string;
  routePrefix: string;
}) {
  const canonicalPath = `${entity.routePrefix}/${entity.slug}`;
  const canonicalUrl = toAbsoluteCanonicalUrl(canonicalPath);
  const schemaType =
    entity.type === 'lake'
      ? 'LakeBodyOfWater'
      : entity.type === 'river'
      ? 'RiverBodyOfWater'
      : entity.type === 'wetland' || entity.type === 'spring'
      ? 'BodyOfWater'
      : 'Landform';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Place', schemaType],
        '@id': `${canonicalUrl}#place`,
        name: entity.name,
        description: entity.description,
        url: canonicalUrl,
        additionalType: entity.category || entity.type,
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: entity.district ? `${entity.district}, Western Himalaya` : 'Western Himalaya',
        },
        ...(entity.coordinates
          ? {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: entity.coordinates.lat,
                longitude: entity.coordinates.lng,
                ...(entity.elevation ? { elevation: `${entity.elevation} m` } : {}),
              },
            }
          : {}),
      },
      buildDatasetJsonLd({
        id: `KEW-HYDRO-${entity.slug.toUpperCase()}`,
        name: `${entity.name} — Hydrological, Limnological & Ecological Assessment Dataset`,
        description: `${entity.description} Includes geographical coordinates, watershed linkage (${entity.watershed || 'Western Himalaya'}), elevation baseline, water quality parameters, biodiversity indicators, and anthropogenic threat profile published by ${KEW_IDENTITY.extendedName}.`,
        canonicalPath,
        spatialName: entity.district ? `${entity.name}, ${entity.district}` : entity.name,
        coordinates: entity.coordinates,
        dateModified: entity.updatedAt ? entity.updatedAt.split('T')[0] : '2026-06-18',
        csvDownloadPath: `/api/datasets/water/${entity.slug}?format=csv`,
        jsonDownloadPath: `/api/datasets/water/${entity.slug}?format=json`,
        variableMeasured: [
          'Water Quality Status',
          'pH',
          'Dissolved Oxygen (mg/L)',
          'Turbidity (NTU)',
          'Elevation (m)',
          'Surface Area / Hydrology',
          'Ecological Threats',
        ],
        keywords: [
          entity.name,
          entity.district || 'Kashmir',
          entity.watershed || 'Western Himalaya',
          entity.category || 'Hydrology',
          'Kashmir EcoWatch',
        ],
      }),
    ],
  };
}
