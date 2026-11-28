import { NextRequest, NextResponse } from 'next/server';
import { evidenceRegistry } from '@/data/evidence-intelligence';
import { getReportById } from '@/data/field-reports-registry';
import { openDataCategories } from '@/data/open-data-catalog';
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
import {
  DATASET_LICENSE_POLICIES,
  resolveLicenseForLibraryOwner,
} from '@/data/dataset-licensing-registry';
import { CANONICAL_SITE_URL, KEW_IDENTITY } from '@/lib/seo/entity-identity';
import { isVerifiedRealDoi } from '@/lib/seo/structured-data';

export const runtime = 'nodejs';

const CC_BY_NC_POLICY = DATASET_LICENSE_POLICIES['CC-BY-NC-4.0'];
const RESTRICTED_POLICY = DATASET_LICENSE_POLICIES['RESTRICTED-CONSERVATION-SENSITIVE'];
const THIRD_PARTY_POLICY = DATASET_LICENSE_POLICIES['THIRD-PARTY-STATUTORY-OR-AGENCY'];

const ALL_WATER_ENTITIES: WaterEntity[] = [
  ...lakesData,
  ...wetlandsData,
  ...riversData,
  ...springsData,
  ...glaciersData,
  ...watershedsData,
  ...groundwaterData,
  ...waterQualitySites,
  ...fisheriesData,
  ...floodRiskZones,
  ...restorationSites,
];

function csvEscape(val: unknown): string {
  if (val === null || val === undefined) return '';
  const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toKeyValueCsv(rows: Array<[string, unknown]>): string {
  const header = 'parameter,value';
  const lines = rows.map(([k, v]) => `${csvEscape(k)},${csvEscape(v)}`);
  return [header, ...lines].join('\n');
}

function buildBibtex(opts: {
  citeKey: string;
  title: string;
  authors: string[];
  year: string;
  institution: string;
  url: string;
  doi?: string;
  licenseNote: string;
}): string {
  const cleanKey = opts.citeKey.replace(/[^a-zA-Z0-9_-]/g, '_');
  const authorStr = (opts.authors.length ? opts.authors : [KEW_IDENTITY.extendedName]).join(' and ');
  const validDoi = isVerifiedRealDoi(opts.doi) ? opts.doi : undefined;
  return [
    `@techreport{${cleanKey},`,
    `  title = {${opts.title}},`,
    `  author = {${authorStr}},`,
    `  institution = {${opts.institution}},`,
    `  publisher = {${opts.institution}},`,
    `  year = {${opts.year}},`,
    `  url = {${opts.url}},`,
    ...(validDoi ? [`  doi = {${validDoi}},`] : []),
    `  note = {${opts.licenseNote}}`,
    `}`,
  ].join('\n');
}

function buildRis(opts: {
  title: string;
  authors: string[];
  date: string;
  institution: string;
  url: string;
  abstract?: string;
  doi?: string;
  licenseNote?: string;
}): string {
  const authors = opts.authors.length ? opts.authors : [KEW_IDENTITY.extendedName];
  const validDoi = isVerifiedRealDoi(opts.doi) ? opts.doi : undefined;
  return [
    'TY  - RPRT',
    `TI  - ${opts.title}`,
    ...authors.map((a) => `AU  - ${a}`),
    `PB  - ${opts.institution}`,
    `PY  - ${opts.date.slice(0, 4)}`,
    `DA  - ${opts.date.replace(/-/g, '/')}`,
    `UR  - ${opts.url}`,
    ...(validDoi ? [`DO  - ${validDoi}`] : []),
    ...(opts.abstract ? [`AB  - ${opts.abstract}`] : []),
    ...(opts.licenseNote ? [`N1  - ${opts.licenseNote}`] : []),
    'ER  - ',
  ].join('\n');
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ category: string; id: string }> }
) {
  const { category, id } = await context.params;
  const format = (request.nextUrl.searchParams.get('format') || 'json').toLowerCase();

  // 1. Water Systems Entity Dataset & Citation Export (KEW-Authored Synthesis — CC BY-NC 4.0)
  if (category === 'water') {
    const slug = id === 'haigam-wetland' ? 'hygam-wetland' : id;
    const entity = ALL_WATER_ENTITIES.find((w) => w.slug === slug || w.id === slug);
    if (!entity) {
      return NextResponse.json({ error: 'Water entity dataset not found' }, { status: 404 });
    }
    const seg =
      entity.type === 'river' || entity.type === 'stream'
        ? 'rivers'
        : entity.type === 'spring'
        ? 'springs'
        : entity.type === 'wetland'
        ? 'wetlands'
        : entity.type === 'glacier'
        ? 'glaciers'
        : entity.type === 'watershed'
        ? 'watersheds'
        : 'lakes';
    const canonicalUrl = `${CANONICAL_SITE_URL}/water-systems/${seg}/${entity.slug}`;
    const pubDate = (entity.updatedAt || entity.createdAt || '2026-06-18').split('T')[0];
    const kewLicenseNote = `KEW-authored synthesis licensed under ${CC_BY_NC_POLICY.name} (${CC_BY_NC_POLICY.url}); upstream statutory/agency references retain original copyright.`;

    if (format === 'bib') {
      const bib = buildBibtex({
        citeKey: `kew_${entity.slug}_${pubDate.slice(0, 4)}`,
        title: `${entity.name}: Hydrological, Limnological and Ecological Baseline Synthesis`,
        authors: [KEW_IDENTITY.extendedName],
        year: pubDate.slice(0, 4),
        institution: KEW_IDENTITY.extendedName,
        url: canonicalUrl,
        licenseNote: kewLicenseNote,
      });
      return new NextResponse(bib, {
        headers: {
          'Content-Type': 'application/x-bibtex; charset=utf-8',
          'Content-Disposition': `attachment; filename="${entity.slug}-citation.bib"`,
        },
      });
    }

    if (format === 'ris') {
      const ris = buildRis({
        title: `${entity.name}: Hydrological, Limnological and Ecological Baseline Synthesis`,
        authors: [KEW_IDENTITY.extendedName],
        date: pubDate,
        institution: KEW_IDENTITY.extendedName,
        url: canonicalUrl,
        abstract: entity.description,
        licenseNote: kewLicenseNote,
      });
      return new NextResponse(ris, {
        headers: {
          'Content-Type': 'application/x-research-info-systems; charset=utf-8',
          'Content-Disposition': `attachment; filename="${entity.slug}-citation.ris"`,
        },
      });
    }

    if (format === 'csv') {
      const csv = toKeyValueCsv([
        ['dataset_id', `KEW-HYDRO-${entity.slug.toUpperCase()}`],
        ['publisher', KEW_IDENTITY.extendedName],
        ['canonical_url', canonicalUrl],
        ['license', CC_BY_NC_POLICY.name],
        ['license_url', CC_BY_NC_POLICY.url],
        ['third_party_carveout', THIRD_PARTY_POLICY.shortBadge],
        ['entity_name', entity.name],
        ['type', entity.type],
        ['category', entity.category],
        ['district', entity.district],
        ['region', entity.region],
        ['watershed', entity.watershed],
        ['elevation_m', entity.elevation],
        ['area_km2', entity.area ?? ''],
        ['latitude', entity.coordinates?.lat ?? ''],
        ['longitude', entity.coordinates?.lng ?? ''],
        ['water_quality_status', entity.waterQuality?.status ?? ''],
        ['ph', entity.waterQuality?.pH ?? ''],
        ['dissolved_oxygen_mg_l', entity.waterQuality?.dissolvedOxygen ?? ''],
        ['turbidity_ntu', entity.waterQuality?.turbidity ?? ''],
        ['conductivity_us_cm', entity.waterQuality?.conductivity ?? ''],
        ['temperature_c', entity.waterQuality?.temperature ?? ''],
        ['nitrates_mg_l', entity.waterQuality?.nitrates ?? ''],
        ['phosphates_mg_l', entity.waterQuality?.phosphates ?? ''],
        ['bod_mg_l', entity.waterQuality?.biologicalOxygenDemand ?? ''],
        ['tds_mg_l', entity.waterQuality?.totalDissolvedSolids ?? ''],
        ['last_tested', entity.waterQuality?.lastTested ?? ''],
        ['conservation_status', entity.conservationStatus ?? ''],
        ['biodiversity_taxa', (entity.biodiversity || []).join('; ')],
        ['documented_threats', (entity.threats || []).join('; ')],
        ['verification_status', entity.verificationStatus ?? 'desk_verified'],
        ['updated_at', pubDate],
      ]);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${entity.slug}-kew-dataset.csv"`,
        },
      });
    }

    return NextResponse.json({
      datasetId: `KEW-HYDRO-${entity.slug.toUpperCase()}`,
      publisher: KEW_IDENTITY.extendedName,
      organizationId: KEW_IDENTITY.entityId,
      canonicalUrl,
      license: CC_BY_NC_POLICY.name,
      licenseUrl: CC_BY_NC_POLICY.url,
      commercialUsePermitted: false,
      carveOuts: {
        thirdPartySources: THIRD_PARTY_POLICY.shortBadge,
        sensitiveCoordinates: RESTRICTED_POLICY.shortBadge,
      },
      citation: `${KEW_IDENTITY.extendedName} (${pubDate.slice(0, 4)}). ${entity.name}: Hydrological, Limnological and Ecological Baseline Synthesis. Licensed under CC BY-NC 4.0 (Non-Commercial). Retrieved from ${canonicalUrl}`,
      record: entity,
    });
  }

  // 2. Evidence & Scientific Publications Library Export (Preserves Third-Party Rights!)
  if (category === 'evidence') {
    const item = evidenceRegistry.find((e) => e.id === id);
    if (!item) {
      return NextResponse.json({ error: 'Scientific evidence item not found' }, { status: 404 });
    }
    const canonicalUrl = `${CANONICAL_SITE_URL}/library/${item.id}`;
    const isKewAuthored = Boolean(
      item.organization && /kashmir ecowatch/i.test(item.organization) && !/reference|isro|wii|bsi|cpcb|jkspcb/i.test(item.organization)
    );
    const licensePolicy = resolveLicenseForLibraryOwner(isKewAuthored);
    const licenseNote = isKewAuthored
      ? `Licensed under ${CC_BY_NC_POLICY.name} (${CC_BY_NC_POLICY.url})`
      : `${THIRD_PARTY_POLICY.shortBadge}: Original statutory agency or journal publisher copyright terms apply; KEW provides bibliographic metadata only.`;

    if (format === 'bib') {
      const bib = buildBibtex({
        citeKey: `kew_${item.id}_${item.publishedDate.slice(0, 4)}`,
        title: item.title,
        authors: item.authors,
        year: item.publishedDate.slice(0, 4),
        institution: item.organization || KEW_IDENTITY.extendedName,
        url: canonicalUrl,
        doi: item.doi,
        licenseNote,
      });
      return new NextResponse(bib, {
        headers: {
          'Content-Type': 'application/x-bibtex; charset=utf-8',
          'Content-Disposition': `attachment; filename="${item.id}.bib"`,
        },
      });
    }
    if (format === 'ris') {
      const ris = buildRis({
        title: item.title,
        authors: item.authors,
        date: item.publishedDate,
        institution: item.organization || KEW_IDENTITY.extendedName,
        url: canonicalUrl,
        abstract: item.abstract,
        doi: item.doi,
        licenseNote,
      });
      return new NextResponse(ris, {
        headers: {
          'Content-Type': 'application/x-research-info-systems; charset=utf-8',
          'Content-Disposition': `attachment; filename="${item.id}.ris"`,
        },
      });
    }
    if (format === 'csv') {
      const csv = toKeyValueCsv([
        ['archival_id', item.id],
        ['title', item.title],
        ['category', item.category],
        ['subtype', item.subtype],
        ['authors', item.authors.join('; ')],
        ['source_organization', item.organization || KEW_IDENTITY.extendedName],
        ['cataloged_by', KEW_IDENTITY.extendedName],
        ['published_date', item.publishedDate],
        ['last_updated', item.lastUpdated],
        ['confidence_tier', item.confidence],
        ['districts', item.districts.join('; ')],
        ['keywords', item.keywords.join('; ')],
        ['abstract', item.abstract],
        ['canonical_url', canonicalUrl],
        ['license', licensePolicy.name],
        ['license_badge', licensePolicy.shortBadge],
        ['license_url', licensePolicy.url ?? ''],
      ]);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${item.id}-kew-evidence.csv"`,
        },
      });
    }

    return NextResponse.json({
      archivalId: item.id,
      catalogedBy: KEW_IDENTITY.extendedName,
      canonicalUrl,
      license: licensePolicy.name,
      licenseBadge: licensePolicy.shortBadge,
      licenseUrl: licensePolicy.url ?? null,
      commercialUsePermitted: licensePolicy.commercialUsePermitted,
      rightsNotice: licensePolicy.summary,
      evidence: item,
    });
  }

  // 3. Field Intelligence Reports Export
  if (category === 'field-report') {
    const report = getReportById(id);
    if (!report) {
      return NextResponse.json({ error: 'Field report not found' }, { status: 404 });
    }
    const canonicalUrl = `${CANONICAL_SITE_URL}/field-reports/${report.id}`;
    const isKewSource = /kashmir ecowatch|kew/i.test(report.source || '');
    const policy = isKewSource ? CC_BY_NC_POLICY : THIRD_PARTY_POLICY;
    const licenseNote = `${policy.shortBadge}: ${policy.summary}`;

    if (format === 'bib') {
      const bib = buildBibtex({
        citeKey: `kew_${report.id}_${report.date.slice(0, 4)}`,
        title: report.title,
        authors: [report.source],
        year: report.date.slice(0, 4),
        institution: KEW_IDENTITY.extendedName,
        url: canonicalUrl,
        licenseNote,
      });
      return new NextResponse(bib, {
        headers: {
          'Content-Type': 'application/x-bibtex; charset=utf-8',
          'Content-Disposition': `attachment; filename="${report.id}.bib"`,
        },
      });
    }
    if (format === 'ris') {
      const ris = buildRis({
        title: report.title,
        authors: [report.source],
        date: report.date,
        institution: KEW_IDENTITY.extendedName,
        url: canonicalUrl,
        abstract: report.summary,
        licenseNote,
      });
      return new NextResponse(ris, {
        headers: {
          'Content-Type': 'application/x-research-info-systems; charset=utf-8',
          'Content-Disposition': `attachment; filename="${report.id}.ris"`,
        },
      });
    }
    if (format === 'csv') {
      const csv = toKeyValueCsv([
        ['report_id', report.id],
        ['title', report.title],
        ['report_type', report.reportType],
        ['status', report.status],
        ['confidence', report.confidence],
        ['source', report.source],
        ['reviewed_by', report.reviewedBy || 'KEW Scientific Review Desk'],
        ['publication_date', report.date],
        ['last_updated', report.lastUpdated],
        ['districts', report.districts.join('; ')],
        ['entities_covered', report.entities.join('; ')],
        ['methodology', report.methodology],
        ['summary', report.summary],
        ['canonical_url', canonicalUrl],
        ['publisher', KEW_IDENTITY.extendedName],
        ['license', policy.name],
        ['license_url', policy.url ?? ''],
      ]);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="${report.id}-field-dossier.csv"`,
        },
      });
    }
    return NextResponse.json({
      reportId: report.id,
      publisher: KEW_IDENTITY.extendedName,
      canonicalUrl,
      license: policy.name,
      licenseBadge: policy.shortBadge,
      licenseUrl: policy.url ?? null,
      commercialUsePermitted: false,
      report,
    });
  }

  // 4. Open Data Catalog Export (/api/datasets/open-data/all or /api/datasets/open-data/<catId>)
  if (category === 'open-data') {
    const items =
      id === 'all'
        ? openDataCategories
        : openDataCategories.filter((c) => c.id === id);
    if (items.length === 0) {
      return NextResponse.json({ error: 'Open data category not found' }, { status: 404 });
    }

    const resolveCategoryLicenseBadge = (status: string) => {
      if (status === 'Restricted') return RESTRICTED_POLICY.shortBadge;
      if (status === 'No Dataset Available' || status === 'In Development') return 'No Published Dataset Yet';
      return `${CC_BY_NC_POLICY.shortBadge} (KEW Synthesis) / ${THIRD_PARTY_POLICY.shortBadge}`;
    };

    if (format === 'csv') {
      const header = [
        'id',
        'title',
        'domainId',
        'status',
        'licenseScope',
        'geographicScope',
        'updateFrequency',
        'formats',
        'provenance',
        'targetModuleUrl',
      ].join(',');
      const lines = items.map((c) =>
        [
          csvEscape(c.id),
          csvEscape(c.title),
          csvEscape(c.domainId),
          csvEscape(c.status),
          csvEscape(resolveCategoryLicenseBadge(c.status)),
          csvEscape((c.geographicCoverage || []).join('; ')),
          csvEscape(c.updateFrequency),
          csvEscape((c.formats || []).join('; ')),
          csvEscape(c.provenance),
          csvEscape(`${CANONICAL_SITE_URL}${c.targetModule}`),
        ].join(',')
      );
      return new NextResponse([header, ...lines].join('\n'), {
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': `attachment; filename="kew-open-data-${id}.csv"`,
        },
      });
    }
    return NextResponse.json({
      catalog: 'Kashmir EcoWatch Western Himalayan Environmental Data Catalog',
      publisher: KEW_IDENTITY.extendedName,
      defaultKewSynthesisLicense: CC_BY_NC_POLICY.name,
      defaultKewSynthesisLicenseUrl: CC_BY_NC_POLICY.url,
      commercialUsePermitted: false,
      carveOuts: {
        thirdPartyPublications: THIRD_PARTY_POLICY.shortBadge,
        sensitiveWildlifeCoordinates: RESTRICTED_POLICY.shortBadge,
        culturalWorks: DATASET_LICENSE_POLICIES['CULTURAL-ARTIST-RIGHTS-RESERVED'].shortBadge,
        platformSoftware: '© 2026 Kashmir EcoWatch. All rights reserved',
      },
      count: items.length,
      categories: items.map((c) => ({
        ...c,
        resolvedLicenseScope: resolveCategoryLicenseBadge(c.status),
      })),
    });
  }

  return NextResponse.json({ error: 'Unsupported dataset category' }, { status: 400 });
}
