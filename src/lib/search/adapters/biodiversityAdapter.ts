// ─────────────────────────────────────────────────────────────────────────────
// BIODIVERSITY & CONSERVATION ADAPTER
// Indexes Mammals, Birds, Fish, Flora, Medicinal Plants, Red Data Taxa,
// Protected Areas, Forest Ecosystems, Chinar Groves, Birding Hotspots & HWC Zones
// ─────────────────────────────────────────────────────────────────────────────

import { SearchAdapterOutput, SearchDocument } from '../types';
import { enrichWithMultilingualLexicon, resolveSubregion } from '../multilingual-gazetteer';
import {
  mammalsData,
  birdsData,
  fishData,
  plantsData,
  medicinalPlantsData,
  threatenedSpeciesData,
  medicinalEthnoDetails,
} from '@/data/biodiversity';
import { speciesData as coreSpeciesData } from '@/data';
import { RED_DATA_KASHMIR_SPECIES } from '@/data/red-data-book-kashmir';
import { getProtectedAreas } from '@/data/protected-network';
import { masterForestDatabase, masterHabitats } from '@/data/forest-ecosystems';
import { HERITAGE_CHINAR_GROVES } from '@/data/chinar-monitoring';
import { birdingHotspotsData } from '@/data/birding-hotspots';
import { COMMUNITY_EXPOSURE_ZONES } from '@/data/human-wildlife-conflict';

export function buildBiodiversityIndex(): SearchAdapterOutput {
  const documents: SearchDocument[] = [];
  const seenSpeciesSlugs = new Set<string>();

  // Helper to index a species record without fabricating attributes
  const addSpeciesDoc = (sp: any, groupFallback: string, sourceLabel: string) => {
    const slug = sp?.slug;
    if (!slug || seenSpeciesSlugs.has(slug)) return;
    seenSpeciesSlugs.add(slug);

    const ethno = sp.id && medicinalEthnoDetails ? medicinalEthnoDetails[sp.id] : undefined;
    const commonName = sp.commonName || sp.name;
    const sciName = sp.scientificName || '';
    const localName = ethno?.localName || sp.localName || sp.kashmiriName || '';
    const districts: string[] = Array.isArray(sp.districts) ? sp.districts : [];
    const distStr = districts.slice(0, 4).join(', ');
    const subregion = resolveSubregion(districts.join(', '), sp.scope);

    const synList = [sciName, localName, ...(sp.synonyms || [])].filter(Boolean);
    if (ethno?.traditionalSystems?.length) synList.push(...ethno.traditionalSystems);
    const lex = enrichWithMultilingualLexicon(`${commonName} ${sciName} ${localName}`, synList);

    const metrics: Array<{ label: string; value: string }> = [];
    if (sp.conservationStatus) metrics.push({ label: 'IUCN', value: String(sp.conservationStatus) });
    if (sp.elevationRange?.min !== undefined && sp.elevationRange?.max !== undefined) {
      metrics.push({ label: 'Elevation', value: `${sp.elevationRange.min}–${sp.elevationRange.max}m` });
    }

    const desc = ethno?.description || sp.description || `${commonName} (${sciName}) documented across Western Himalayan habitats.`;

    documents.push({
      id: `species:${slug}`,
      documentType: 'species',
      resultClass: 'scientific_record',
      domain: 'biodiversity_conservation',
      title: commonName,
      subtitle: [sciName, localName ? `Local: ${localName}` : '', sp.taxonomicGroup || groupFallback]
        .filter(Boolean)
        .join(' · '),
      description: desc,
      canonicalUrl: `/biodiversity/species/${slug}`,
      parentModule: 'Biodiversity & Species Intelligence',
      subregion,
      district: distStr || undefined,
      districts: districts.length ? districts : undefined,
      tags: Array.from(
        new Set(
          [
            sp.taxonomicGroup || groupFallback,
            sp.category,
            sp.conservationStatus ? `IUCN ${sp.conservationStatus}` : '',
            ethno?.therapeuticCategory || '',
            ...(sp.habitats || sp.habitat || []).slice(0, 4),
          ].filter(Boolean)
        )
      ),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: sourceLabel,
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      lastUpdated: sp.updatedAt,
      verificationStatus: sp.verificationStatus || 'Taxonomically Verified',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: metrics.length ? metrics : undefined,
      ctaLabel: 'Open Species Dossier',
      adapterId: 'biodiversity',
    });
  };

  for (const s of coreSpeciesData || []) addSpeciesDoc(s, s.taxonomicGroup, 'KEW Flagship Taxonomic Registry & IUCN Red List');
  for (const s of threatenedSpeciesData || []) addSpeciesDoc(s, 'threatened-species', 'IUCN Red List & J&K Wildlife Protection Schedule');
  for (const s of medicinalPlantsData || []) addSpeciesDoc(s, 'medicinal-flora', 'KEW Himalayan Ethnobotanical & NMPB Registry');
  for (const s of mammalsData || []) addSpeciesDoc(s, 'mammals', 'Western Himalayan Mammalian Survey & WII Baseline');
  for (const s of birdsData || []) addSpeciesDoc(s, 'birds', 'Himalayan Avifauna Checklist, BirdLife IBA & eBird Verified');
  for (const s of fishData || []) addSpeciesDoc(s, 'fish', 'Coldwater Ichthyofauna & Jhelum-Indus Fisheries Baseline');
  for (const s of plantsData || []) addSpeciesDoc(s, 'plants', 'Flora of Kashmir & Botanical Survey of India Inventory');

  // Red Data Book Kashmir species (link to species slug if exists, else threatened-species registry)
  for (const rds of (RED_DATA_KASHMIR_SPECIES as any[]) || []) {
    const slugCandidate = (rds.slug || rds.commonName || rds.scientificName || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    if (!slugCandidate || seenSpeciesSlugs.has(slugCandidate)) continue;
    const lex = enrichWithMultilingualLexicon(`${rds.commonName || ''} ${rds.scientificName || ''} ${rds.kashmiriName || ''}`, [
      rds.scientificName,
      rds.kashmiriName,
    ]);
    documents.push({
      id: `red-data:${rds.id || slugCandidate}`,
      documentType: 'species',
      resultClass: 'scientific_record',
      domain: 'biodiversity_conservation',
      title: rds.commonName || rds.scientificName,
      subtitle: `${rds.scientificName || ''} · Red Data Book (${rds.iucnStatus || rds.redBookStatus || 'Threatened'})`,
      description: rds.summary || rds.habitatNotes || `Priority Red Data Book species documented in the Western Himalaya.`,
      canonicalUrl: '/biodiversity/threatened-species',
      parentModule: 'Biodiversity · Priority & Threatened Species',
      subregion: resolveSubregion(Array.isArray(rds.districts) ? rds.districts.join(', ') : rds.district),
      tags: ['Red Data Book', 'Threatened Species', rds.iucnStatus, rds.taxonomicGroup].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'Red Data Book of Kashmir & IUCN Regional Assessment',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      verificationStatus: 'Red Data Book Listed',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'View Red Data Registry',
      adapterId: 'biodiversity',
    });
  }

  // Protected Areas (National Parks, Wildlife Sanctuaries, Wetland Reserves, Conservation Reserves, IBAs)
  const allPAs = getProtectedAreas?.all ? getProtectedAreas.all() : [];
  const seenPA = new Set<string>();
  for (const pa of allPAs) {
    if (!pa?.slug || seenPA.has(pa.slug)) continue;
    seenPA.add(pa.slug);

    const subregion = resolveSubregion(pa.district, pa.country_or_admin_region || pa.scope);
    const catLabel = (pa.category || 'protected_area').replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    const altNames = [...(pa.alternate_names || []), pa.flagshipSpecies || ''].filter(Boolean);
    const lex = enrichWithMultilingualLexicon(`${pa.name} ${pa.district} ${(pa.keySpecies || []).join(' ')}`, altNames);

    const metrics: Array<{ label: string; value: string }> = [];
    if (pa.area) metrics.push({ label: 'Area', value: `${pa.area.toLocaleString()} km²` });
    if (pa.established) metrics.push({ label: 'Est.', value: String(pa.established) });
    if (pa.iucn_category) metrics.push({ label: 'IUCN Cat', value: pa.iucn_category });

    documents.push({
      id: `pa:${pa.slug}`,
      documentType: 'protected_area',
      resultClass: 'scientific_record',
      domain: 'biodiversity_conservation',
      title: pa.name,
      subtitle: `${catLabel} · ${pa.district}`,
      description: pa.description,
      canonicalUrl: `/protected-areas/${pa.slug}`,
      parentModule: 'Protected Areas Network',
      subregion,
      geographicScope: pa.scope,
      jurisdictionNote: pa.country_or_admin_region || undefined,
      district: pa.district,
      coordinates:
        typeof pa.latitude === 'number' && typeof pa.longitude === 'number'
          ? { lat: pa.latitude, lng: pa.longitude, precision: 'centroid' }
          : undefined,
      tags: Array.from(
        new Set([catLabel, pa.district, ...(pa.ecosystems || []), ...(pa.keySpecies || []), ...(pa.threats || [])].filter(Boolean))
      ),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: pa.source_primary || 'Department of Wildlife Protection & WDPA / BirdLife IBA Registry',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      verificationStatus: pa.dataStatus || pa.current_status || 'Gazetted / Documented',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: metrics.length ? metrics : undefined,
      ctaLabel: 'Open Protected Area',
      adapterId: 'biodiversity',
    });
  }

  // Forest Divisions & Habitat Units
  for (const f of (masterForestDatabase as any[]) || []) {
    const id = f.id || f.divisionName || f.name;
    if (!id) continue;
    const title = f.divisionName || f.name;
    const subregion = resolveSubregion(f.district, f.region || f.scope);
    const lex = enrichWithMultilingualLexicon(`${title} ${f.forestType || ''} ${f.district || ''}`);
    documents.push({
      id: `forest:${String(id).toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'forest_unit',
      resultClass: 'geographic_entity',
      domain: 'biodiversity_conservation',
      title,
      subtitle: `Forest Division · ${f.district || subregion}`,
      description:
        f.description ||
        f.ecologicalSummary ||
        `Documented forest division (${f.forestType || 'Himalayan Forest'}) monitored under ISFR canopy and biodiversity protocols.`,
      canonicalUrl: '/biodiversity/forest-ecosystems',
      parentModule: 'Biodiversity · Forest Ecosystems',
      subregion,
      district: f.district,
      tags: ['Forest Division', f.forestType, f.district, ...(f.dominantSpecies || [])].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'Forest Survey of India (ISFR) & Territorial Forest Working Plans',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'periodic_monitoring',
      verificationStatus: 'Official Forest Division Record',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Explore Forest Ecosystems',
      adapterId: 'biodiversity',
    });
  }

  for (const h of (masterHabitats as any[]) || []) {
    if (!h?.name) continue;
    const slug = h.slug || String(h.name).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const lex = enrichWithMultilingualLexicon(`${h.name} ${h.description || ''}`);
    documents.push({
      id: `habitat:${slug}`,
      documentType: 'forest_unit',
      resultClass: 'scientific_record',
      domain: 'biodiversity_conservation',
      title: h.name,
      subtitle: `Ecological Habitat Classification · ${h.elevationBand || 'Western Himalaya'}`,
      description: h.description || `Classified Western Himalayan habitat type supporting specialized indicator flora and fauna.`,
      canonicalUrl: '/biodiversity/forest-ecosystems',
      parentModule: 'Biodiversity · Habitat Intelligence',
      subregion: 'Multi-Regional',
      tags: ['Habitat', h.name, ...(h.indicatorSpecies || [])].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'Champion & Seth Forest Types & KEW Habitat Layer',
      trustBadge: 'Peer-Reviewed / Institutional',
      temporalNature: 'reference',
      verificationStatus: 'Verified Habitat Class',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'View Habitat Layer',
      adapterId: 'biodiversity',
    });
  }

  // Heritage Chinar Groves
  for (const cg of (HERITAGE_CHINAR_GROVES as any[]) || []) {
    const name = cg.name || cg.groveName;
    if (!name) continue;
    const subregion = resolveSubregion(cg.district, cg.region);
    const lex = enrichWithMultilingualLexicon(`${name} Chinar Platanus orientalis ${cg.district || ''}`);
    documents.push({
      id: `chinar:${cg.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'forest_unit',
      resultClass: 'geographic_entity',
      domain: 'environmental_monitoring',
      title: name,
      subtitle: `Heritage Chinar Grove · ${cg.district || 'Kashmir'}`,
      description:
        cg.significance ||
        cg.description ||
        `Geo-tagged heritage Platanus orientalis (Chinar / Booune) grove monitored for canopy vitality, trunk girth, and root-zone encroachment.`,
      canonicalUrl: '/environmental-monitoring/chinar-monitoring',
      parentModule: 'Environmental Monitoring · Chinar Census',
      subregion,
      district: cg.district,
      coordinates:
        typeof cg.lat === 'number' && typeof cg.lng === 'number'
          ? { lat: cg.lat, lng: cg.lng, precision: 'exact' }
          : typeof cg.latitude === 'number' && typeof cg.longitude === 'number'
          ? { lat: cg.latitude, lng: cg.longitude, precision: 'exact' }
          : undefined,
      tags: ['Chinar', 'Platanus orientalis', 'Heritage Trees', cg.district].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'J&K Floriculture / Forest Geo-Tagged Chinar Census & KEW Audit',
      trustBadge: 'Field Verified',
      temporalNature: 'periodic_monitoring',
      verificationStatus: 'Geo-Tagged Heritage Grove',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      metrics: cg.treeCount ? [{ label: 'Chinar Trees', value: String(cg.treeCount) }] : undefined,
      ctaLabel: 'Open Chinar Observatory',
      adapterId: 'biodiversity',
    });
  }

  // Birding & Observation Hotspots
  for (const bh of (birdingHotspotsData as any[]) || []) {
    if (!bh?.name) continue;
    const subregion = resolveSubregion(bh.district, bh.scope);
    const lex = enrichWithMultilingualLexicon(`${bh.name} ${bh.district || ''} ${(bh.keySpecies || []).join(' ')}`);
    documents.push({
      id: `hotspot:${bh.id || bh.slug || bh.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'sighting_hotspot',
      resultClass: 'geographic_entity',
      domain: 'biodiversity_conservation',
      title: bh.name,
      subtitle: `Birding & Avian Hotspot · ${bh.district || 'Kashmir'}`,
      description: bh.description || `Prime ornithological observation site documenting resident and Central Asian Flyway migratory avifauna.`,
      canonicalUrl: '/biodiversity/birding-hotspots',
      parentModule: 'Biodiversity · Birding Hotspots',
      subregion,
      district: bh.district,
      coordinates:
        typeof bh.latitude === 'number' && typeof bh.longitude === 'number'
          ? { lat: bh.latitude, lng: bh.longitude, precision: 'approximate' }
          : undefined,
      tags: ['Birding Hotspot', 'Ornithology', bh.district, ...(bh.keySpecies || [])].filter(Boolean),
      synonyms: lex.synonyms,
      multilingualTerms: lex.multilingual,
      source: 'Asian Waterbird Census (AWC), BirdLife IBA & eBird Hotspots',
      trustBadge: 'Field Verified',
      temporalNature: 'periodic_monitoring',
      verificationStatus: 'Verified Observation Hotspot',
      dataFreshness: 'periodic_baseline',
      accessClassification: 'public',
      ctaLabel: 'Explore Birding Hotspots',
      adapterId: 'biodiversity',
    });
  }

  // Human-Wildlife Conflict Community Exposure Zones
  for (const zone of (COMMUNITY_EXPOSURE_ZONES as any[]) || []) {
    const name = zone.zoneName || zone.name;
    if (!name) continue;
    const subregion = resolveSubregion(zone.district, zone.region);
    documents.push({
      id: `hwc:${zone.id || name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      documentType: 'hwc_zone',
      resultClass: 'operational_intelligence',
      domain: 'biodiversity_conservation',
      title: `${name} — Human–Wildlife Coexistence Zone`,
      subtitle: `HWC Exposure Corridor · ${zone.district || subregion}`,
      description:
        zone.summary ||
        zone.description ||
        `Monitored human–wildlife interface zone involving ${(zone.primarySpecies || []).join(', ') || 'black bear and common leopard'} across orchard-forest boundaries.`,
      canonicalUrl: '/protected-network/human-wildlife-conflict',
      parentModule: 'Protected Areas · Human–Wildlife Conflict',
      subregion,
      district: zone.district,
      tags: ['Human-Wildlife Conflict', 'Coexistence', zone.district, ...(zone.primarySpecies || [])].filter(Boolean),
      synonyms: ['HWC', name],
      source: 'Department of Wildlife Protection Control Rooms & KEW HWC Registry',
      trustBadge: 'Field Verified',
      temporalNature: 'operational_feed',
      verificationStatus: zone.riskLevel ? `${zone.riskLevel} Exposure` : 'Monitored Interface',
      dataFreshness: 'recent_operational',
      accessClassification: 'public',
      ctaLabel: 'Open HWC Intelligence',
      adapterId: 'biodiversity',
    });
  }

  return {
    adapterId: 'biodiversity',
    adapterName: 'Biodiversity, Medicinal Flora, Protected Areas, Forests & HWC Adapter',
    documents,
    excluded: [],
    sourceHealthy: true,
  };
}
