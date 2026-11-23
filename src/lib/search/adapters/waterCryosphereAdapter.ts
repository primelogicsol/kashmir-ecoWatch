// ─────────────────────────────────────────────────────────────────────────────
// WATER SYSTEMS & CRYOSPHERE ADAPTER
// Indexes Lakes, Wetlands, Rivers, Springs, Glaciers, Groundwater,
// Drinking Water Sources, Water Quality, Fisheries, Restoration & NWIA Classes
// ─────────────────────────────────────────────────────────────────────────────

import { SearchAdapterOutput, SearchDocument, SearchDocumentType } from '../types';
import { enrichWithMultilingualLexicon, resolveSubregion } from '../multilingual-gazetteer';
import {
  lakesData,
  wetlandsData,
  riversData,
  springsData,
  glaciersData,
  groundwaterData,
  waterQualitySites,
  fisheriesData,
  restorationSites,
} from '@/data/water-systems';
import { drinkingWaterEntities } from '@/data/drinking-water-sources';
import { NWIA_WETLAND_CLASSES } from '@/data/nwia-references';
import glaciersGeoJson from '@/data/geojson/glaciers.json';

function computePolygonCenter(coords: any): { lat: number; lng: number } | undefined {
  if (!Array.isArray(coords) || !coords.length) return undefined;
  const ring = Array.isArray(coords[0]?.[0]) ? coords[0] : coords;
  let sumLat = 0;
  let sumLng = 0;
  let n = 0;
  for (const pt of ring) {
    if (Array.isArray(pt) && typeof pt[0] === 'number' && typeof pt[1] === 'number') {
      sumLng += pt[0];
      sumLat += pt[1];
      n++;
    }
  }
  return n ? { lat: Number((sumLat / n).toFixed(5)), lng: Number((sumLng / n).toFixed(5)) } : undefined;
}

export function buildWaterCryosphereIndex(): SearchAdapterOutput {
  const documents: SearchDocument[] = [];
  const seenIds = new Set<string>();

  const addWaterEntity = (
    item: any,
    docType: SearchDocumentType,
    routePrefix: string,
    subLabel: string,
    ctaLabel: string
  ) => {
    if (!item?.slug) return;
    const id = `${docType}:${item.slug}`;
    if (seenIds.has(id)) return;
    seenIds.add(id);

    const subregion = resolveSubregion(item.district, item.region);
    const lex = enrichWithMultilingualLexicon(
      `${item.name} ${item.category || ''} ${item.watershed || ''} ${item.district || ''} ${item.nwiaCode || ''}`,
      item.nwiaCode ? [`NWIA ${item.nwiaCode}`] : []
    );

    const metrics: Array<{ label: string; value: string }> = [];
    if (typeof item.area === 'number' && item.area > 0) metrics.push({ label: 'Area', value: `${item.area} km²` });
    if (typeof item.length === 'number' && item.length > 0) metrics.push({ label: 'Length', value: `${item.length} km` });
    if (typeof item.elevation === 'number' && item.elevation > 0) metrics.push({ label: 'Elevation', value: `${item.elevation}m` });
    if (item.waterQuality?.pH) metrics.push({ label: 'pH', value: String(item.waterQuality.pH) });

    documents.push({
      id,
      documentType: docType,
      resultClass: 'geographic_entity',
      domain: 'water_cryosphere',
      title: item.name,
      subtitle: `${item.category || subLabel} · ${item.district || subregion}`,
      description: item.description,
      canonicalUrl: `${routePrefix}/${item.slug}`,
      parentModule: 'Water Systems & Cryosphere',
      subregion,
      district: item.district,
      watershed: item.watershed,
      coordinates:
        item.coordinates && typeof item.coordinates.lat === 'number' && typeof item.coordinates.lng === 'number'
          ? {
              lat: item.coordinates.lat,
              lng: item.coordinates.lng,
              precision: docType === 'spring' ? 'exact' : 'centroid',
            }
          : undefined,
      tags: Array.from(
        new Set(
          [
            subLabel,
            item.category,
            item.district,
            item.watershed,
            item.nwiaCode ? `NWIA ${item.nwiaCode}` : '',
            ...(item.threats || []),
          ].filter(Boolean)
        )
      ),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: item.nwiaCode
        ? `ISRO SAC National Wetland Inventory (NWIA ${item.nwiaCode}) & KEW Hydrology`
        : 'KEW Hydrological Baseline, India-WRIS & JKPCC Records',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'periodic_monitoring',
      lastUpdated: item.updatedAt,
      verificationStatus: item.verificationStatus || 'verified',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: metrics.length ? metrics : undefined,
      ctaLabel,
      adapterId: 'water-cryosphere',
    });
  };

  for (const l of lakesData || []) addWaterEntity(l, 'lake', '/water-systems/lakes', 'Freshwater / Alpine Lake', 'Open Lake Profile');
  for (const w of wetlandsData || []) addWaterEntity(w, 'wetland', '/water-systems/wetlands', 'Wetland Ecosystem', 'Open Wetland Profile');
  for (const r of riversData || []) addWaterEntity(r, 'river', '/water-systems/rivers', 'River / Stream System', 'Open River Profile');
  for (const s of springsData || []) addWaterEntity(s, 'spring', '/water-systems/springs', 'Karst / Alluvial Spring', 'Open Spring Profile');
  for (const g of glaciersData || []) addWaterEntity(g, 'glacier', '/water-systems/glaciers', 'Himalayan Glacier', 'Open Glacier Profile');
  for (const gw of groundwaterData || []) addWaterEntity(gw, 'watershed', '/water-systems/groundwater', 'Groundwater Aquifer', 'Open Aquifer Profile');
  for (const dw of (drinkingWaterEntities as any[]) || []) addWaterEntity(dw, 'spring', '/water-systems/drinking-water-sources', 'Drinking Water Source', 'View Water Source');
  for (const wq of waterQualitySites || []) addWaterEntity(wq, 'lake', '/water-systems/water-quality', 'Water Quality Station', 'View Water Quality');
  for (const fs of fisheriesData || []) addWaterEntity(fs, 'river', '/water-systems/fisheries', 'Aquatic & Fishery Zone', 'View Fishery Data');
  for (const rs of restorationSites || []) addWaterEntity(rs, 'wetland', '/water-systems/restoration', 'Hydrological Restoration', 'View Restoration Site');

  // Additional RGI Glaciers from glaciers.json not already in glaciersData
  const knownGlacierNames = new Set((glaciersData || []).map((g) => g.name.toLowerCase()));
  for (const f of ((glaciersGeoJson as any)?.features || []) as any[]) {
    const p = f?.properties;
    if (!p?.name || knownGlacierNames.has(String(p.name).toLowerCase())) continue;
    const center = computePolygonCenter(f.geometry?.coordinates);
    const subregion = resolveSubregion(p.district, p.region);
    const lex = enrichWithMultilingualLexicon(`${p.name} Glacier ${p.rgiId || ''} ${p.district || ''}`, [p.rgiId].filter(Boolean));
    documents.push({
      id: `glacier-rgi:${p.id || p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'glacier',
      resultClass: 'geographic_entity',
      domain: 'water_cryosphere',
      title: p.name,
      subtitle: `RGI Glacier (${p.rgiId || 'Randolph Inventory'}) · ${p.district || subregion}`,
      description: `Mapped cryospheric glacier polygon in ${p.district || subregion} (${p.area_km2 ? `${p.area_km2} km², ` : ''}${p.retreat_rate_m_yr ? `observed terminus retreat ~${p.retreat_rate_m_yr} m/yr` : 'Randolph Glacier Inventory baseline'}).`,
      canonicalUrl: '/earth-human-impact/aquatic-cryosphere/glacier-recession',
      parentModule: 'Cryosphere & Glacier Recession Observatory',
      subregion,
      district: p.district,
      coordinates: center ? { lat: center.lat, lng: center.lng, precision: 'centroid' } : undefined,
      geometryRef: `glaciers.json#${p.id}`,
      tags: ['Glacier', 'Cryosphere', 'Glacier Recession', p.rgiId, p.district].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'Randolph Glacier Inventory (RGI 7.0), GLIMS & Sentinel-2 Terminus Audit',
      trustBadge: 'Satellite-Derived',
      temporalNature: 'periodic_monitoring',
      verificationStatus: p.verificationStatus || 'RGI Mapped Polygon',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: [
        ...(p.area_km2 ? [{ label: 'Ice Area', value: `${p.area_km2} km²` }] : []),
        ...(p.retreat_rate_m_yr ? [{ label: 'Retreat Rate', value: `${p.retreat_rate_m_yr} m/yr` }] : []),
      ],
      ctaLabel: 'Open Glacier Recession',
      adapterId: 'water-cryosphere',
    });
  }

  // NWIA Wetland Classes
  for (const wc of (NWIA_WETLAND_CLASSES as any[]) || []) {
    if (!wc?.code) continue;
    const lex = enrichWithMultilingualLexicon(`${wc.name} ${wc.description} ${(wc.kashmirExamples || []).join(' ')}`, [
      `NWIA ${wc.code}`,
      ...(wc.kashmirExamples || []),
    ]);
    documents.push({
      id: `nwia-class:${wc.code}`,
      documentType: 'wetland',
      resultClass: 'scientific_record',
      domain: 'water_cryosphere',
      title: `NWIA Class ${wc.code} — ${wc.name}`,
      subtitle: 'ISRO Space Applications Centre · National Wetland Inventory Classification',
      description: `${wc.description} Representative Himalayan sites: ${(wc.kashmirExamples || []).join(', ')}.`,
      canonicalUrl: '/water-systems/nwia-classification',
      parentModule: 'Water Systems · NWIA Classification',
      subregion: 'Multi-Regional',
      tags: ['NWIA', `Class ${wc.code}`, wc.name, ...(wc.kashmirExamples || [])],
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'Space Applications Centre (ISRO) & University of Kashmir NWIA Atlas (2010)',
      sourceUrl: 'https://indianwetlands.in/uploads/NWIA_Jammu_and_Kashmir_Atlas.pdf',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      verificationStatus: 'Statutory Atlas Classification',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Open NWIA Atlas',
      adapterId: 'water-cryosphere',
    });
  }

  return {
    adapterId: 'water-cryosphere',
    adapterName: 'Water Systems, Wetlands, Springs, Glaciers & NWIA Adapter',
    documents,
    excluded: [],
    sourceHealthy: true,
  };
}
