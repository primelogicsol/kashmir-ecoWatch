// ─────────────────────────────────────────────────────────────────────────────
// GEOGRAPHIC INTELLIGENCE ADAPTER (Subregions, 44 Districts, Watersheds, Corridors & Trails)
// ─────────────────────────────────────────────────────────────────────────────

import { SearchAdapterOutput, SearchDocument } from '../types';
import {
  SIX_KEW_SUBREGIONS,
  enrichWithMultilingualLexicon,
  resolveSubregion,
} from '../multilingual-gazetteer';
import { GEOGRAPHY } from '@/data/geography';
import { districtsData } from '@/data';
import districtsGeoJson from '@/data/geojson/districts.json';
import { watershedsData } from '@/data/water-systems';
import { getCorridors, getTrails } from '@/data/protected-network';

function toSlug(val: string): string {
  return val
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function computeCentroid(coords: any): { lat: number; lng: number } | undefined {
  if (!Array.isArray(coords) || coords.length === 0) return undefined;
  const ring = Array.isArray(coords[0]?.[0]) ? coords[0] : coords;
  let sumLat = 0;
  let sumLng = 0;
  let count = 0;
  for (const pt of ring) {
    if (Array.isArray(pt) && typeof pt[0] === 'number' && typeof pt[1] === 'number') {
      sumLng += pt[0];
      sumLat += pt[1];
      count++;
    }
  }
  return count > 0 ? { lat: Number((sumLat / count).toFixed(5)), lng: Number((sumLng / count).toFixed(5)) } : undefined;
}

export function buildGeographyIndex(): SearchAdapterOutput {
  const documents: SearchDocument[] = [];

  // 1. Six Canonical KEW Subregions
  for (const sr of SIX_KEW_SUBREGIONS) {
    documents.push({
      id: sr.id,
      documentType: 'subregion',
      resultClass: 'geographic_entity',
      domain: 'geographic_intelligence',
      title: sr.canonicalName,
      subtitle: `${sr.geographicScope} · ${sr.districts.length} Districts`,
      description: `${sr.description} (${sr.jurisdictionContext}).`,
      canonicalUrl: '/geographic-scope',
      parentModule: 'Geographic Intelligence & GIS',
      subregion: sr.subregion,
      geographicScope: sr.geographicScope,
      jurisdictionNote: sr.jurisdictionContext,
      districts: sr.districts,
      watershed: sr.watersheds.join(', '),
      coordinates: {
        lat: sr.centroid.lat,
        lng: sr.centroid.lng,
        precision: 'centroid',
      },
      tags: ['Subregion', sr.subregion, ...sr.districts, ...sr.watersheds],
      synonyms: sr.historicalAndAltNames,
      multilingualTerms: sr.multilingual,
      source: 'KEW Five-Region & Six-Subregion Geographic Charter',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'reference',
      verificationStatus: 'Canonical Geographic Boundary',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        { label: 'Districts', value: String(sr.districts.length) },
        { label: 'Major Basins', value: String(sr.watersheds.length) },
      ],
      ctaLabel: 'Explore Subregion Scope',
      adapterId: 'geography',
    });
  }

  // Combined Gilgit-Baltistan Canonical Geographic Entity (links Gilgit + Baltistan subregions)
  documents.push({
    id: 'subregion:gilgit-baltistan',
    documentType: 'subregion',
    resultClass: 'geographic_entity',
    domain: 'geographic_intelligence',
    title: 'Gilgit-Baltistan (Gilgit & Baltistan Subregions)',
    subtitle: 'Transboundary / Extended Scope · 14 Districts across Karakoram, Western Himalaya & Deosai',
    description:
      'Encompasses the Gilgit (9 districts) and Baltistan (5 districts) subregions across the Upper Indus, Hunza, Gilgit, Shigar, and Shyok basins — containing Central Karakoram National Park, Deosai Plateau, Khunjerab, Nanga Parbat cryosphere, and high-priority GLOF monitoring lakes.',
    canonicalUrl: '/geographic-scope',
    parentModule: 'Geographic Intelligence & GIS',
    subregion: 'Gilgit',
    geographicScope: 'Transboundary / Extended',
    jurisdictionNote: 'Administered as Gilgit-Baltistan (Gilgit, Diamer & Baltistan Divisions) · Historical designation: Northern Areas',
    districts: [
      'Gilgit', 'Hunza', 'Nagar', 'Ghizer', 'Diamer', 'Astore', 'Darel', 'Tangir', 'Gupis-Yasin',
      'Skardu', 'Shigar', 'Kharmang', 'Ghanche', 'Roundu',
    ],
    coordinates: { lat: 35.65, lng: 74.95, precision: 'centroid' },
    tags: ['Gilgit-Baltistan', 'Gilgit', 'Baltistan', 'Karakoram', 'Deosai', 'GLOF', 'Upper Indus'],
    synonyms: ['Gilgit Baltistan', 'GB', 'Northern Areas (Historical)'],
    multilingualTerms: {
      ur: ['گلگت بلتستان'],
      ks: ['گِلگِت بَلتِستان'],
      hi: ['गिलगित-बाल्टिस्तान'],
      translit: ['Gilgit-Baltistan', 'Shumali Ilaqajat'],
    },
    source: 'KEW Five-Region & Six-Subregion Geographic Charter',
    trustBadge: 'KEW Scientific Assessment',
    temporalNature: 'reference',
    verificationStatus: 'Canonical Geographic Scope',
    dataFreshness: 'periodic_baseline',
    accessClassification: 'public',
    metrics: [
      { label: 'Districts', value: '14' },
      { label: 'Subregions', value: 'Gilgit & Baltistan' },
    ],
    ctaLabel: 'Explore Geographic Scope',
    adapterId: 'geography',
  });

  // 2. All 44 Western Himalayan Districts (merging districtsData + districtsGeoJson + GEOGRAPHY.units)
  const geoFeatureByName = new Map<string, any>();
  const features = (districtsGeoJson as any)?.features || [];
  for (const f of features) {
    if (f?.properties?.name) {
      geoFeatureByName.set(String(f.properties.name).toLowerCase(), f);
    }
  }
  const richDistrictByName = new Map<string, (typeof districtsData)[number]>();
  for (const d of districtsData) {
    richDistrictByName.set(d.name.toLowerCase(), d);
  }

  const seenDistrictSlugs = new Set<string>();
  const allAdminUnits: Array<{ unit: string; regionKey: string }> = [];
  for (const [regKey, units] of Object.entries(GEOGRAPHY.units)) {
    for (const u of units) {
      allAdminUnits.push({ unit: u, regionKey: regKey });
    }
  }
  for (const f of features) {
    const nm = f?.properties?.name;
    if (nm && !allAdminUnits.some((x) => x.unit.toLowerCase() === String(nm).toLowerCase())) {
      allAdminUnits.push({ unit: nm, regionKey: f?.properties?.region || 'Western Himalaya' });
    }
  }

  for (const { unit, regionKey } of allAdminUnits) {
    const rich = richDistrictByName.get(unit.toLowerCase());
    const gf = geoFeatureByName.get(unit.toLowerCase());
    const slug = rich?.slug || gf?.properties?.id || toSlug(unit);
    if (seenDistrictSlugs.has(slug)) continue;
    seenDistrictSlugs.add(slug);

    const subregion = resolveSubregion(unit, regionKey);
    const areaKm2 = rich?.area || gf?.properties?.area_km2;
    const hq = rich?.headquarters || gf?.properties?.headquarters || unit;
    const centroid = gf?.geometry?.coordinates ? computeCentroid(gf.geometry.coordinates) : undefined;
    const scope =
      subregion === 'Kashmir'
        ? 'Kashmir Core'
        : subregion === 'Jammu' || subregion === 'Ladakh'
        ? 'Trans-Divisional'
        : 'Transboundary / Extended';

    const descParts: string[] = [
      `Administrative and ecological district unit in ${subregion} (Headquarters: ${hq}).`,
    ];
    if (areaKm2) descParts.push(`Area: ${Number(areaKm2).toLocaleString()} km².`);
    if (rich?.hazards?.length) descParts.push(`Monitored hazards: ${rich.hazards.join(', ')}.`);

    const lex = enrichWithMultilingualLexicon(`${unit} ${hq} ${subregion}`);

    const canOpenSlugPage = Boolean(rich || gf);
    const canonicalUrl = canOpenSlugPage ? `/districts/${slug}` : '/districts';

    const metrics: Array<{ label: string; value: string }> = [];
    if (areaKm2) metrics.push({ label: 'Area', value: `${Number(areaKm2).toLocaleString()} km²` });
    if (rich?.environmentalScore) metrics.push({ label: 'Eco Score', value: `${rich.environmentalScore}/100` });

    documents.push({
      id: `district:${slug}`,
      documentType: 'district',
      resultClass: 'geographic_entity',
      domain: 'geographic_intelligence',
      title: `${unit} District`,
      subtitle: `${subregion} · HQ: ${hq}`,
      description: descParts.join(' '),
      canonicalUrl,
      parentModule: 'District Environmental Profiles',
      subregion,
      geographicScope: scope,
      jurisdictionNote: `Administered within ${regionKey === 'AJK' ? 'Azad Jammu & Kashmir' : regionKey}`,
      district: unit,
      districts: [unit],
      coordinates: centroid ? { lat: centroid.lat, lng: centroid.lng, precision: 'centroid' } : undefined,
      geometryRef: gf ? `districts.json#${gf.properties?.id || slug}` : undefined,
      tags: ['District', unit, hq, subregion, ...(rich?.hazards || [])],
      synonyms: Array.from(new Set([unit, hq, ...lex.synonyms])),
      multilingualTerms: lex.multilingual,
      source: 'KEW Spatial District & Census Registry',
      trustBadge: 'KEW Scientific Assessment',
      temporalNature: 'reference',
      verificationStatus: gf?.properties?.verificationStatus || 'Verified Administrative Boundary',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: metrics.length ? metrics : undefined,
      ctaLabel: 'Open District Profile',
      adapterId: 'geography',
    });
  }

  // 3. Watersheds & River Catchments
  for (const ws of watershedsData || []) {
    if (!ws?.slug) continue;
    const subregion = resolveSubregion(ws.district, ws.region);
    const lex = enrichWithMultilingualLexicon(`${ws.name} ${ws.description || ''} ${ws.district || ''}`);
    documents.push({
      id: `watershed:${ws.slug}`,
      documentType: 'watershed',
      resultClass: 'geographic_entity',
      domain: 'geographic_intelligence',
      title: ws.name,
      subtitle: `${ws.category || 'Hydrological Catchment'} · ${ws.district}`,
      description: ws.description,
      canonicalUrl: `/water-systems/watersheds/${ws.slug}`,
      parentModule: 'Water Systems · Watersheds',
      subregion,
      district: ws.district,
      watershed: ws.watershed || ws.name,
      coordinates:
        ws.coordinates && typeof ws.coordinates.lat === 'number'
          ? { lat: ws.coordinates.lat, lng: ws.coordinates.lng, precision: 'centroid' }
          : undefined,
      tags: ['Watershed', 'Catchment', 'Basin', ws.district, ...(ws.threats || [])].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'NWIA & India-WRIS Hydrological Delineation',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      lastUpdated: ws.updatedAt,
      verificationStatus: ws.verificationStatus || 'verified',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: ws.area ? [{ label: 'Catchment Area', value: `${ws.area.toLocaleString()} km²` }] : undefined,
      ctaLabel: 'Open Watershed Profile',
      adapterId: 'geography',
    });
  }

  // 4. Wildlife Corridors & Ecological Connectivity Linkages
  const corridors = getCorridors?.all ? getCorridors.all() : [];
  for (const c of corridors as any[]) {
    if (!c?.slug) continue;
    const distStr = Array.isArray(c.districts) ? c.districts.join(', ') : c.district || '';
    const subregion = resolveSubregion(distStr, c.scope);
    const lex = enrichWithMultilingualLexicon(`${c.name} ${c.description || ''} ${(c.targetSpecies || []).join(' ')}`);
    documents.push({
      id: `corridor:${c.slug}`,
      documentType: 'corridor',
      resultClass: 'geographic_entity',
      domain: 'biodiversity_conservation',
      title: c.name,
      subtitle: `Wildlife Movement Corridor · ${distStr || 'Western Himalaya'}`,
      description: c.description || `Landscape wildlife movement and habitat connectivity corridor linking ${distStr}.`,
      canonicalUrl: `/protected-network/corridors-and-connectivity/${c.slug}`,
      parentModule: 'Protected Areas · Corridors & Connectivity',
      subregion,
      geographicScope: c.scope,
      district: distStr || undefined,
      districts: Array.isArray(c.districts) ? c.districts : distStr ? [distStr] : undefined,
      coordinates:
        typeof c.latitude === 'number' && typeof c.longitude === 'number'
          ? { lat: c.latitude, lng: c.longitude, precision: 'centroid' }
          : undefined,
      tags: ['Wildlife Corridor', 'Connectivity', ...(c.targetSpecies || []), ...(c.threats || [])].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'WII & KEW Landscape Connectivity Assessment',
      trustBadge: 'Field Verified',
      temporalNature: 'periodic_monitoring',
      verificationStatus: c.status || 'Verified Corridor',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'View Corridor Dossier',
      adapterId: 'geography',
    });
  }

  // 5. Ecological & High-Altitude Trails (routed to exact /protected-network/trails-and-sightings/[slug])
  const trails = getTrails?.all ? getTrails.all() : [];
  for (const t of trails as any[]) {
    if (!t?.slug) continue;
    const subregion = resolveSubregion(t.district, t.scope);
    const lex = enrichWithMultilingualLexicon(`${t.name} ${t.description || ''} ${t.district || ''}`);
    const metrics: Array<{ label: string; value: string }> = [];
    if (t.distance || t.lengthKm) metrics.push({ label: 'Distance', value: `${t.distance || t.lengthKm} km` });
    if (t.difficulty) metrics.push({ label: 'Difficulty', value: String(t.difficulty) });

    documents.push({
      id: `trail:${t.slug}`,
      documentType: 'trail',
      resultClass: 'geographic_entity',
      domain: 'biodiversity_conservation',
      title: t.name,
      subtitle: `${t.trailType || t.category || 'Ecological Trail'} · ${t.district || 'Kashmir'}`,
      description: t.description || `Documented Himalayan field observation and trekking corridor in ${t.district || 'Western Himalaya'}.`,
      canonicalUrl: `/protected-network/trails-and-sightings/${t.slug}`,
      parentModule: 'Protected Areas · Trails & Sightings',
      subregion,
      geographicScope: t.scope,
      district: t.district,
      coordinates:
        typeof t.latitude === 'number' && typeof t.longitude === 'number'
          ? { lat: t.latitude, lng: t.longitude, precision: 'approximate' }
          : undefined,
      tags: ['Trail', 'Trek', t.district, ...(t.habitats || []), ...(t.keySpecies || [])].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'KEW Field Trails & Habitat Access Registry',
      trustBadge: 'Field Verified',
      temporalNature: 'reference',
      verificationStatus: t.verificationStatus || 'Verified Route',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: metrics.length ? metrics : undefined,
      ctaLabel: 'Open Trail Intelligence',
      adapterId: 'geography',
    });
  }

  return {
    adapterId: 'geography',
    adapterName: 'Six-Subregion, 44-District, Watershed, Corridor & Trail Adapter',
    documents,
    excluded: [],
    sourceHealthy: true,
  };
}
