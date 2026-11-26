// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH SECTORAL ENVIRONMENTAL RESEARCH SERIES 2026
// Canonical 40-Dossier Portfolio Across 12 Research Sectors (KEW-SR-2026-01..40)
//
// SCIENTIFIC GOVERNANCE REQUIREMENT:
// • Entries 01–04 preserve validated descriptions, dates, page counts & units.
// • Entries 05–40 are strictly classified as 'Proposed' research dossiers —
//   publication dates, final page counts, empirical findings, and datasets are
//   only confirmed once corresponding research is completed and validated.
// ─────────────────────────────────────────────────────────────────────────────

import {
  ResearchDivisionId,
  ResearchDossierStatus,
  ResearchSeriesDossier,
  ResearchSeriesSectorTag,
  SectorType,
} from '@/types/sectoral-eia';
import {
  ADDITIONAL_60_RESEARCH_DOSSIERS,
  EXPANDED_DIVISIONS_XIII_TO_XXIII,
  PRIORITY_15_RESEARCH_QUEUE,
} from './research-portfolio-100-expansion';

export interface ResearchDivisionDefinition {
  id: ResearchDivisionId;
  roman: string;
  shortLabel: string;
  fullTitle: string;
  sectorTags: ResearchSeriesSectorTag[];
  primaryKewRoute: string;
}

export const RESEARCH_SERIES_DIVISIONS: ResearchDivisionDefinition[] = [
  {
    id: 'sector-01-tourism',
    roman: 'I',
    shortLabel: 'Tourism',
    fullTitle: 'SECTOR I: TOURISM AND RECREATIONAL ECOLOGY',
    sectorTags: ['tourism'],
    primaryKewRoute: '/sectoral-eia/sectors/tourism',
  },
  {
    id: 'sector-02-horticulture',
    roman: 'II',
    shortLabel: 'Horticulture',
    fullTitle: 'SECTOR II: HORTICULTURE AND AGRO-ECOLOGY',
    sectorTags: ['horticulture'],
    primaryKewRoute: '/sectoral-eia/sectors/horticulture',
  },
  {
    id: 'sector-03-handicrafts',
    roman: 'III',
    shortLabel: 'Handicrafts',
    fullTitle: 'SECTOR III: HANDICRAFTS AND INDUSTRIAL ECOLOGY',
    sectorTags: ['handicrafts'],
    primaryKewRoute: '/sectoral-eia/sectors/handicrafts',
  },
  {
    id: 'sector-04-agriculture',
    roman: 'IV',
    shortLabel: 'Agriculture',
    fullTitle: 'SECTOR IV: AGRICULTURE AND SOIL SYSTEMS',
    sectorTags: ['agriculture'],
    primaryKewRoute: '/sectoral-eia/sectors/agriculture',
  },
  {
    id: 'sector-05-water-resources',
    roman: 'V',
    shortLabel: 'Water resources',
    fullTitle: 'SECTOR V: WATER RESOURCES AND LIMNOLOGICAL SYSTEMS',
    sectorTags: ['water-resources'],
    primaryKewRoute: '/water-systems',
  },
  {
    id: 'sector-06-mining-extraction',
    roman: 'VI',
    shortLabel: 'Mining and extraction',
    fullTitle: 'SECTOR VI: MINING AND RESOURCE EXTRACTION',
    sectorTags: ['mining-extraction'],
    primaryKewRoute: '/earth-human-impact/mining-extraction',
  },
  {
    id: 'sector-07-urbanization-infrastructure',
    roman: 'VII',
    shortLabel: 'Urbanization and infrastructure',
    fullTitle: 'SECTOR VII: URBANIZATION, HOUSING AND INFRASTRUCTURE',
    sectorTags: ['urbanization', 'infrastructure'],
    primaryKewRoute: '/earth-human-impact/urban-ecology',
  },
  {
    id: 'sector-08-energy-hydropower',
    roman: 'VIII',
    shortLabel: 'Energy and hydropower',
    fullTitle: 'SECTOR VIII: ENERGY AND HYDROPOWER',
    sectorTags: ['energy-hydropower', 'energy', 'renewable-energy'],
    primaryKewRoute: '/earth-human-impact/energy-infrastructure',
  },
  {
    id: 'sector-09-transportation-air',
    roman: 'IX',
    shortLabel: 'Transportation and air pollution',
    fullTitle: 'SECTOR IX: TRANSPORTATION AND ATMOSPHERIC POLLUTION',
    sectorTags: ['transportation'],
    primaryKewRoute: '/environmental-monitoring/transportation-pollution',
  },
  {
    id: 'sector-10-waste-sanitation',
    roman: 'X',
    shortLabel: 'Waste and sanitation',
    fullTitle: 'SECTOR X: WASTE, SANITATION AND PUBLIC HEALTH',
    sectorTags: ['waste-management', 'sanitation'],
    primaryKewRoute: '/environmental-monitoring/solid-waste',
  },
  {
    id: 'sector-11-forestry-biodiversity',
    roman: 'XI',
    shortLabel: 'Forestry and biodiversity',
    fullTitle: 'SECTOR XI: FORESTRY AND BIODIVERSITY',
    sectorTags: ['forestry-biodiversity'],
    primaryKewRoute: '/earth-human-impact/forests-landscapes',
  },
  {
    id: 'sector-12-cumulative-impacts',
    roman: 'XII',
    shortLabel: 'Cumulative impacts',
    fullTitle: 'SECTOR XII: CUMULATIVE ENVIRONMENTAL IMPACTS',
    sectorTags: ['cross-sectoral'],
    primaryKewRoute: '/sectoral-eia/cumulative-impact',
  },
  ...EXPANDED_DIVISIONS_XIII_TO_XXIII,
];

// ─── 20-CHAPTER INSTITUTIONAL PUBLICATION STANDARD ────────────────────────────
export const STANDARD_DOSSIER_CHAPTERS: Array<{
  chapter: string;
  title: string;
}> = [
  { chapter: '01', title: 'Executive summary' },
  { chapter: '02', title: 'Research objectives and hypotheses' },
  { chapter: '03', title: 'Study area and geographical boundaries' },
  { chapter: '04', title: 'Literature review' },
  { chapter: '05', title: 'Historical environmental baseline' },
  { chapter: '06', title: 'Research methodology' },
  { chapter: '07', title: 'Satellite and remote sensing analysis' },
  { chapter: '08', title: 'GIS-based spatial assessment' },
  { chapter: '09', title: 'Field observations and sampling' },
  { chapter: '10', title: 'Environmental indicator assessment' },
  { chapter: '11', title: 'Sector-specific impact analysis' },
  { chapter: '12', title: 'Cumulative environmental impacts' },
  { chapter: '13', title: 'Ecological carrying capacity' },
  { chapter: '14', title: 'Climate change implications' },
  { chapter: '15', title: 'Environmental legislation and compliance' },
  { chapter: '16', title: 'Risk and vulnerability classification' },
  { chapter: '17', title: 'Mitigation and restoration strategies' },
  { chapter: '18', title: 'Alternative development scenarios' },
  { chapter: '19', title: 'Conclusions and recommendations' },
  { chapter: '20', title: 'References, datasets and technical appendices' },
];

// ─── 12 INTERCONNECTED SCIENTIFIC INFRASTRUCTURE PILLARS ──────────────────────
export const SCIENTIFIC_INFRASTRUCTURE_PILLARS: Array<{
  id: string;
  label: string;
  route: string;
  description: string;
}> = [
  { id: 'satellite', label: 'Satellite Intelligence', route: '/earth-human-impact/change-detection-observatory', description: 'Landsat, Sentinel-1/2/5P, MODIS/VIIRS & GRACE orbital archives' },
  { id: 'geospatial', label: 'Geospatial Assessment', route: '/sectoral-eia/impact-atlas', description: 'Watershed boundaries, Copernicus DEM slope & land-cover GIS' },
  { id: 'telemetry', label: 'Environmental Telemetry', route: '/environmental-monitoring', description: 'In-situ hydro-buoys, air-quality monitors & gauge networks' },
  { id: 'datasets', label: 'Scientific Datasets', route: '/open-data', description: 'FAIR machine-readable CSV/JSON tables & provenance schemas' },
  { id: 'impact', label: 'Impact Assessment', route: '/sectoral-eia', description: '9-step IAIA SEA-aligned sectoral & receptor impact scoring' },
  { id: 'historical', label: 'Historical Change Detection', route: '/earth-human-impact/change-detection-observatory/historical-comparison', description: 'Multi-decadal shoreline, canopy, glacier & urban expansion series' },
  { id: 'regulatory', label: 'Regulatory Assessment', route: '/resources/environmental-pil', description: 'Water/Air/Forest Acts, Wetland Rules, CAG audits & NGT dockets' },
  { id: 'literature', label: 'Scientific Literature', route: '/research-library', description: 'Peer-reviewed Western Himalayan monographs & DOI bibliography' },
  { id: 'climate', label: 'Climate Intelligence', route: '/earth-human-impact/climate-atmosphere', description: 'ERA5, CHIRPS, NASA GPM & Western Disturbance regime shifts' },
  { id: 'cumulative', label: 'Cumulative Impact Modelling', route: '/sectoral-eia/cumulative-impact', description: 'Cross-sectoral stressor convergence & carrying-capacity thresholds' },
  { id: 'field-lab', label: 'Field and Laboratory Data', route: '/field-reports', description: 'Ground-validated water, sediment, soil, trace-metal & pesticide assays' },
  { id: 'peer-review', label: 'Scientific Peer Review', route: '/sectoral-eia/methodology', description: '7-stage publication verification & transparent revision history' },
];

// ─── 16 RECOMMENDED SCIENTIFIC DATA SOURCES ───────────────────────────────────
export const RECOMMENDED_SERIES_DATA_SOURCES: Array<{
  source: string;
  application: string;
  requiresGroundValidationFor?: string;
}> = [
  { source: 'Landsat historical archive', application: 'Multi-decadal environmental change (1972–present)' },
  { source: 'Sentinel-1 SAR', application: 'Flooding, surface deformation and soil moisture' },
  { source: 'Sentinel-2 MSI', application: 'Vegetation, land use and water reflectance (10–20 m)' },
  { source: 'Sentinel-5P', application: 'Atmospheric trace gas monitoring (NO₂, SO₂, CO, CH₄, Aerosol Index)' },
  { source: 'MODIS and VIIRS', application: 'Land surface temperature, vegetation phenology and fire intelligence' },
  { source: 'ERA5', application: 'Historical atmospheric and climatic reanalysis conditions' },
  { source: 'CHIRPS', application: 'Long-term gridded precipitation variability' },
  { source: 'NASA GPM', application: 'High-frequency satellite precipitation monitoring' },
  { source: 'GRACE / GRACE-FO', application: 'Regional terrestrial water storage anomalies', requiresGroundValidationFor: 'Local well-level drawdown must be ground-validated via piezometers' },
  { source: 'Copernicus DEM', application: 'Terrain, slope stability and watershed modelling' },
  { source: 'JRC Global Surface Water', application: 'Historical surface water extent and seasonality' },
  { source: 'GBIF', application: 'Georeferenced biodiversity occurrence records' },
  { source: 'SoilGrids', application: 'Modelled regional soil physical and carbon characteristics' },
  { source: 'OpenStreetMap', application: 'Linear infrastructure, road networks and settlement mapping' },
  { source: 'Validated field observations', application: 'Local environmental, ecological and outfall verification' },
  { source: 'Laboratory analysis', application: 'Direct water, sediment, soil, heavy-metal, pesticide and microbial measurements' },
];

// ─── 7-TIER RESEARCH PUBLICATION STATUS CLASSIFICATION ────────────────────────
export const RESEARCH_PUBLICATION_STATUS_DEFINITIONS: Array<{
  status: ResearchDossierStatus;
  meaning: string;
  badgeClass: string;
}> = [
  {
    status: 'Proposed',
    meaning: 'Research scope established',
    badgeClass: 'bg-slate-800 text-slate-200 border border-white/15',
  },
  {
    status: 'Data Acquisition',
    meaning: 'Scientific data collection underway',
    badgeClass: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/35',
  },
  {
    status: 'Under Investigation',
    meaning: 'Analysis and modelling underway',
    badgeClass: 'bg-teal-500/15 text-teal-300 border border-teal-500/35',
  },
  {
    status: 'Draft Assessment',
    meaning: 'Preliminary findings documented',
    badgeClass: 'bg-amber-500/15 text-amber-300 border border-amber-500/35',
  },
  {
    status: 'Scientific Review',
    meaning: 'Methodology and findings being reviewed',
    badgeClass: 'bg-purple-500/15 text-purple-300 border border-purple-500/35',
  },
  {
    status: 'Published',
    meaning: 'Completed and validated research available',
    badgeClass: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40',
  },
  {
    status: 'Updated',
    meaning: 'Published research revised with new evidence',
    badgeClass: 'bg-lime-500/15 text-lime-300 border border-lime-500/40',
  },
  {
    status: 'Archived',
    meaning: 'Superseded historical version retained for provenance',
    badgeClass: 'bg-slate-900 text-slate-400 border border-white/10',
  },
];

// Helper to construct proposed dossiers cleanly with consistent governance flags
function makeProposedDossier(params: {
  seq: number;
  divisionId: ResearchDivisionId;
  sectorTag: ResearchSeriesSectorTag;
  legacySector?: SectorType;
  subdisciplineBanner: string;
  targetPages: number;
  title: string;
  abstract: string;
  author: string;
  telemetryRoute: string;
  gisMapRoute?: string;
  indicatorsRoute?: string;
  linkedInvestigationSlug?: string;
  recommendedDataSources: string[];
}): ResearchSeriesDossier {
  const numStr = String(params.seq).padStart(2, '0');
  const div = RESEARCH_SERIES_DIVISIONS.find((d) => d.id === params.divisionId)!;
  return {
    id: `rep-seiae-2026-${numStr}`,
    code: `KEW-SR-2026-${numStr}`,
    sequenceNumber: params.seq,
    divisionId: params.divisionId,
    divisionRoman: div.roman,
    divisionTitle: div.fullTitle,
    sectorTag: params.sectorTag,
    sector: params.legacySector,
    subdisciplineBanner: params.subdisciplineBanner,
    title: params.title,
    abstract: params.abstract,
    status: 'Proposed',
    date: 'Proposed',
    targetPages: params.targetPages,
    author: params.author,
    isProposedWorkingGroup: true,
    badge: 'Proposed Research Dossier',
    telemetryRoute: params.telemetryRoute,
    gisMapRoute: params.gisMapRoute || '/sectoral-eia/impact-atlas',
    historicalComparisonRoute: '/earth-human-impact/change-detection-observatory/historical-comparison',
    indicatorsRoute: params.indicatorsRoute || params.telemetryRoute,
    referencesRoute: '/research-library',
    linkedInvestigationSlug: params.linkedInvestigationSlug,
    recommendedDataSources: params.recommendedDataSources,
    assetReadiness: {
      reportPdfAvailable: false, // Scoping Charter printable; final report PDF gated until Published
      telemetryAvailable: true,  // Connects to operational KEW module streams
      gisMapAvailable: true,     // Connects to operational KEW GIS layers
      datasetAvailable: false,   // Strictly gated until research is completed & validated
      historicalComparisonAvailable: true,
      referencesAvailable: true,
      indicatorsAvailable: true,
      updatesAvailable: true,
    },
  };
}

// ═════════════════════════════════════════════════════════════════════════════
// ALL 40 SECTORAL ENVIRONMENTAL RESEARCH SERIES 2026 DOSSIERS
// Ordered in logical Sector I..XII sequence while preserving 01–04 IDs & text
// ═════════════════════════════════════════════════════════════════════════════

export const SECTORAL_RESEARCH_SERIES_2026: ResearchSeriesDossier[] = [
  // ── SECTOR I: TOURISM AND RECREATIONAL ECOLOGY (5) ─────────────────────────
  {
    id: 'rep-seiae-2026-01',
    code: 'KEW-SR-2026-01',
    sequenceNumber: 1,
    divisionId: 'sector-01-tourism',
    divisionRoman: 'I',
    divisionTitle: 'SECTOR I: TOURISM AND RECREATIONAL ECOLOGY',
    sectorTag: 'tourism',
    sector: 'tourism',
    subdisciplineBanner: 'TOURISM · CARRYING CAPACITY · LIMNOLOGICAL RESILIENCE',
    title: 'The Dal Lake Tourism Carrying Capacity & Limnological Resilience Dossier',
    abstract:
      'A multi-source secondary-data and satellite scientific assessment synthesizing peak visitor density, registered houseboat blackwater mass balances, published sediment nutrient loading, and vacuum sanitation mitigation blueprints for the Dal Lake basin.',
    status: 'Published',
    date: 'March 2026',
    pages: 64,
    author: 'Kashmir EcoWatch Limnological Intelligence Unit',
    isProposedWorkingGroup: false,
    badge: 'Secondary-Data Scientific Assessment',
    telemetryRoute: '/sectoral-eia/sectors/tourism',
    gisMapRoute: '/sectoral-eia/impact-atlas',
    historicalComparisonRoute: '/earth-human-impact/aquatic-cryosphere/lake-encroachment',
    indicatorsRoute: '/sectoral-eia/assessment/kew-seia-2026-tr-01',
    referencesRoute: '/research-library',
    linkedAssessmentId: 'kew-seia-2026-tr-01',
    linkedInvestigationSlug: 'dal-lake-mechanical-dredging-ecological-defences',
    recommendedDataSources: ['Sentinel-2 MSI', 'Landsat historical archive', 'JRC Global Surface Water', 'Validated field observations', 'Laboratory analysis'],
    assetReadiness: {
      reportPdfAvailable: true,
      telemetryAvailable: true,
      gisMapAvailable: true,
      datasetAvailable: true,
      historicalComparisonAvailable: true,
      referencesAvailable: true,
      indicatorsAvailable: true,
      updatesAvailable: true,
    },
  },
  makeProposedDossier({
    seq: 5,
    divisionId: 'sector-01-tourism',
    sectorTag: 'tourism',
    legacySector: 'tourism',
    subdisciplineBanner: 'TOURISM · ALPINE PILGRIMAGE · CARRYING CAPACITY',
    targetPages: 72,
    title: 'Alpine Pilgrimage, Infrastructure Expansion & Ecological Carrying Capacity of the Sheshnag–Amarnath Corridor',
    abstract:
      'An integrated assessment of high-altitude pedestrian traffic, trail widening, mechanical excavation, glacial meltwater connectivity, sediment mobilization, alpine vegetation disturbance and cumulative pilgrimage-related environmental pressures.',
    author: 'KEW Alpine Ecology & Pilgrimage Impact Assessment Unit',
    telemetryRoute: '/sectoral-eia/sectors/tourism',
    linkedInvestigationSlug: 'sheshnag-pilgrimage-infrastructure-alpine-ecology',
    recommendedDataSources: ['Sentinel-2 MSI', 'Copernicus DEM', 'ERA5', 'Validated field observations', 'Laboratory analysis'],
  }),
  makeProposedDossier({
    seq: 6,
    divisionId: 'sector-01-tourism',
    sectorTag: 'tourism',
    legacySector: 'tourism',
    subdisciplineBanner: 'TOURISM · CRYOSPHERE · SUBALPINE RESILIENCE',
    targetPages: 60,
    title: 'Gulmarg Winter Tourism, Snowpack Disturbance & Mountain Ecosystem Resilience',
    abstract:
      "An investigation into skiing infrastructure, snow grooming, artificial snow production, resort expansion, water consumption and habitat fragmentation within Gulmarg's subalpine and alpine ecosystems.",
    author: 'KEW Mountain Tourism & Cryosphere Sciences Unit',
    telemetryRoute: '/sectoral-eia/sectors/tourism',
    recommendedDataSources: ['Sentinel-2 MSI', 'MODIS and VIIRS', 'ERA5', 'Copernicus DEM', 'GBIF'],
  }),
  makeProposedDossier({
    seq: 7,
    divisionId: 'sector-01-tourism',
    sectorTag: 'tourism',
    legacySector: 'tourism',
    subdisciplineBanner: 'TOURISM · WATERSHED VULNERABILITY · RIPARIAN ECOLOGY',
    targetPages: 56,
    title: 'Pahalgam Tourism Expansion & Lidder Valley Watershed Vulnerability',
    abstract:
      'A cumulative assessment of hotel development, sewage discharge, riparian encroachment, solid waste generation, groundwater extraction and recreational pressure throughout the Lidder watershed.',
    author: 'KEW Tourism Ecology & Watershed Management Unit',
    telemetryRoute: '/sectoral-eia/sectors/tourism',
    recommendedDataSources: ['Landsat historical archive', 'Sentinel-2 MSI', 'OpenStreetMap', 'Validated field observations', 'Laboratory analysis'],
  }),
  makeProposedDossier({
    seq: 8,
    divisionId: 'sector-01-tourism',
    sectorTag: 'tourism',
    legacySector: 'tourism',
    subdisciplineBanner: 'TOURISM · GLACIER-FED HYDROLOGY · HABITAT CONNECTIVITY',
    targetPages: 58,
    title: 'Sonamarg Resort Development, Glacier-Fed Hydrology & Alpine Landscape Fragmentation',
    abstract:
      'An assessment of tourism infrastructure, road development, seasonal vehicle emissions, construction sediment, glacier-fed river sensitivity and habitat connectivity across the upper Sindh Valley.',
    author: 'KEW Glacial Hydrology & Alpine Tourism Unit',
    telemetryRoute: '/sectoral-eia/sectors/tourism',
    recommendedDataSources: ['Sentinel-2 MSI', 'Sentinel-5P', 'Copernicus DEM', 'OpenStreetMap', 'Validated field observations'],
  }),

  // ── SECTOR II: HORTICULTURE AND AGRO-ECOLOGY (5) ───────────────────────────
  {
    id: 'rep-seiae-2026-02',
    code: 'KEW-SR-2026-02',
    sequenceNumber: 2,
    divisionId: 'sector-02-horticulture',
    divisionRoman: 'II',
    divisionTitle: 'SECTOR II: HORTICULTURE AND AGRO-ECOLOGY',
    sectorTag: 'horticulture',
    sector: 'horticulture',
    subdisciplineBanner: 'HORTICULTURE · KAREWA HYDROGEOLOGY · AGROCHEMICALS',
    title: 'High-Density Horticulture & Groundwater Depletion in the Karewas of South Kashmir',
    abstract:
      'Quantifies pesticide active ingredient runoff, shallow water table drawdown, and severe wild pollinator depression resulting from the rapid transition from traditional agroforestry to high-density apple monocultures.',
    status: 'Published',
    date: 'February 2026',
    pages: 52,
    author: 'Kashmir EcoWatch Agro-Ecology & Pesticide Impact Working Group',
    isProposedWorkingGroup: false,
    badge: 'Secondary-Data Scientific Assessment',
    telemetryRoute: '/sectoral-eia/sectors/horticulture',
    gisMapRoute: '/sectoral-eia/impact-atlas',
    historicalComparisonRoute: '/earth-human-impact/land-earth-systems',
    indicatorsRoute: '/sectoral-eia/assessment/kew-seia-2026-hr-01',
    referencesRoute: '/research-library',
    linkedAssessmentId: 'kew-seia-2026-hr-01',
    recommendedDataSources: ['Sentinel-2 MSI', 'GRACE / GRACE-FO', 'SoilGrids', 'Validated field observations', 'Laboratory analysis'],
    assetReadiness: {
      reportPdfAvailable: true,
      telemetryAvailable: true,
      gisMapAvailable: true,
      datasetAvailable: true,
      historicalComparisonAvailable: true,
      referencesAvailable: true,
      indicatorsAvailable: true,
      updatesAvailable: true,
    },
  },
  makeProposedDossier({
    seq: 9,
    divisionId: 'sector-02-horticulture',
    sectorTag: 'horticulture',
    legacySector: 'horticulture',
    subdisciplineBanner: 'HORTICULTURE · ECOTOXICOLOGY · PESTICIDE DRIFT',
    targetPages: 58,
    title: "The Chemical Ecology of Kashmir's Apple Industry: Pesticide Drift, Residues & Environmental Exposure",
    abstract:
      'An assessment of fungicide and insecticide application patterns, atmospheric spray drift, soil residues, freshwater contamination, occupational exposure pathways and integrated pest management alternatives.',
    author: 'KEW Environmental Toxicology & Horticultural Sciences Unit',
    telemetryRoute: '/sectoral-eia/sectors/horticulture',
    recommendedDataSources: ['Sentinel-2 MSI', 'SoilGrids', 'ERA5', 'Validated field observations', 'Laboratory analysis'],
  }),
  makeProposedDossier({
    seq: 10,
    divisionId: 'sector-02-horticulture',
    sectorTag: 'horticulture',
    legacySector: 'horticulture',
    subdisciplineBanner: 'HORTICULTURE · POLLINATOR ECOLOGY · BIODIVERSITY',
    targetPages: 48,
    title: 'Pollinator Decline, Orchard Monocultures & Ecosystem Service Vulnerability',
    abstract:
      'A landscape-scale investigation of orchard intensification, flowering diversity, pesticide exposure, wild bee abundance, habitat connectivity and pollination-dependent agricultural productivity.',
    author: 'KEW Pollinator Ecology & Biodiversity Unit',
    telemetryRoute: '/biodiversity/pollinator-activity',
    recommendedDataSources: ['Sentinel-2 MSI', 'GBIF', 'MODIS and VIIRS', 'Validated field observations', 'Laboratory analysis'],
  }),
  makeProposedDossier({
    seq: 11,
    divisionId: 'sector-02-horticulture',
    sectorTag: 'horticulture',
    legacySector: 'horticulture',
    subdisciplineBanner: 'HORTICULTURE · COLD CHAIN ENERGY · EMISSIONS',
    targetPages: 52,
    title: "Cold Storage Infrastructure, Refrigeration Emissions & the Environmental Footprint of Kashmir's Apple Supply Chain",
    abstract:
      'A lifecycle assessment of controlled-atmosphere storage, electricity demand, refrigerant leakage, packaging waste, transportation emissions and energy-efficient cold chain alternatives.',
    author: 'KEW Industrial Energy & Supply Chain Ecology Unit',
    telemetryRoute: '/sectoral-eia/sectors/horticulture',
    recommendedDataSources: ['OpenStreetMap', 'Sentinel-5P', 'ERA5', 'Validated field observations'],
  }),
  makeProposedDossier({
    seq: 12,
    divisionId: 'sector-02-horticulture',
    sectorTag: 'horticulture',
    legacySector: 'horticulture',
    subdisciplineBanner: 'HORTICULTURE · AGROFORESTRY · CARBON STORAGE',
    targetPages: 46,
    title: 'Walnut and Almond Agroforestry Decline & Traditional Orchard Landscape Conservation',
    abstract:
      'An investigation of mature tree removal, orchard replacement, carbon storage, soil stability, wildlife habitat and the ecological value of traditional perennial agroforestry systems.',
    author: 'KEW Agroforestry & Landscape Conservation Unit',
    telemetryRoute: '/sectoral-eia/sectors/horticulture',
    recommendedDataSources: ['Landsat historical archive', 'Sentinel-2 MSI', 'SoilGrids', 'GBIF', 'Validated field observations'],
  }),

  // ── SECTOR III: HANDICRAFTS AND INDUSTRIAL ECOLOGY (5) ─────────────────────
  {
    id: 'rep-seiae-2026-03',
    code: 'KEW-SR-2026-03',
    sequenceNumber: 3,
    divisionId: 'sector-03-handicrafts',
    divisionRoman: 'III',
    divisionTitle: 'SECTOR III: HANDICRAFTS AND INDUSTRIAL ECOLOGY',
    sectorTag: 'handicrafts',
    sector: 'handicrafts',
    subdisciplineBanner: 'HANDICRAFTS · DYE EFFLUENTS · URBAN WATERWAYS',
    title: 'Artisanal Dye Effluents & Toxic Heavy Metal Footprint in Urban Srinagar Waterways',
    abstract:
      'A lifecycle assessment of Pashmina and silk textile dyeing in Shehr-e-Khas, detailing chemical oxygen demand surges, trace chromium and copper sediment deposits, and the blueprint for modular urban CETPs.',
    status: 'Published',
    date: 'January 2026',
    pages: 44,
    author: 'EcoWatch Industrial Ecology & Craft Guild Audit Unit',
    isProposedWorkingGroup: false,
    badge: 'Secondary-Data Scientific Assessment',
    telemetryRoute: '/sectoral-eia/sectors/handicrafts',
    gisMapRoute: '/sectoral-eia/impact-atlas',
    historicalComparisonRoute: '/earth-human-impact/urban-ecology',
    indicatorsRoute: '/sectoral-eia/assessment/kew-seia-2026-hc-01',
    referencesRoute: '/research-library',
    linkedAssessmentId: 'kew-seia-2026-hc-01',
    recommendedDataSources: ['Sentinel-2 MSI', 'OpenStreetMap', 'Validated field observations', 'Laboratory analysis'],
    assetReadiness: {
      reportPdfAvailable: true,
      telemetryAvailable: true,
      gisMapAvailable: true,
      datasetAvailable: true,
      historicalComparisonAvailable: true,
      referencesAvailable: true,
      indicatorsAvailable: true,
      updatesAvailable: true,
    },
  },
  makeProposedDossier({
    seq: 13,
    divisionId: 'sector-03-handicrafts',
    sectorTag: 'handicrafts',
    legacySector: 'handicrafts',
    subdisciplineBanner: 'HANDICRAFTS · PASHMINA LIFECYCLE · PASTORAL ECOLOGY',
    targetPages: 56,
    title: 'The Environmental Lifecycle of Kashmir Pashmina: Pastoral Landscapes, Processing & Textile Sustainability',
    abstract:
      'A cradle-to-grave assessment of fibre production, pastoral grazing pressure, washing, spinning, weaving, dyeing, water consumption, embodied carbon and circular textile production.',
    author: 'KEW Sustainable Textiles & Lifecycle Assessment Unit',
    telemetryRoute: '/sectoral-eia/sectors/handicrafts',
    recommendedDataSources: ['MODIS and VIIRS', 'Sentinel-2 MSI', 'CHIRPS', 'Validated field observations', 'Laboratory analysis'],
  }),
  makeProposedDossier({
    seq: 14,
    divisionId: 'sector-03-handicrafts',
    sectorTag: 'handicrafts',
    legacySector: 'handicrafts',
    subdisciplineBanner: 'HANDICRAFTS · TIMBER PROVENANCE · FOREST SUSTAINABILITY',
    targetPages: 48,
    title: 'Walnut Wood Carving, Timber Provenance & Himalayan Forest Resource Sustainability',
    abstract:
      'An investigation of timber sourcing, mature walnut tree depletion, wood seasoning, processing waste, chemical finishes, carbon storage and sustainable material substitution.',
    author: 'KEW Forest Resources & Craft Material Intelligence Unit',
    telemetryRoute: '/sectoral-eia/sectors/handicrafts',
    recommendedDataSources: ['Landsat historical archive', 'Sentinel-2 MSI', 'GBIF', 'Validated field observations', 'Laboratory analysis'],
  }),
  makeProposedDossier({
    seq: 15,
    divisionId: 'sector-03-handicrafts',
    sectorTag: 'handicrafts',
    legacySector: 'handicrafts',
    subdisciplineBanner: 'HANDICRAFTS · WILLOW WICKER · RIPARIAN WETLANDS',
    targetPages: 44,
    title: 'Willow Wicker Production, Riparian Vegetation & Wetland Resource Sustainability',
    abstract:
      "An ecological assessment of willow harvesting, riparian land conversion, water consumption, wetland vegetation management and sustainable raw material production for Kashmir's wicker industry.",
    author: 'KEW Riparian Ecology & Sustainable Craft Materials Unit',
    telemetryRoute: '/sectoral-eia/sectors/handicrafts',
    recommendedDataSources: ['Sentinel-2 MSI', 'JRC Global Surface Water', 'Validated field observations'],
  }),
  makeProposedDossier({
    seq: 16,
    divisionId: 'sector-03-handicrafts',
    sectorTag: 'handicrafts',
    legacySector: 'handicrafts',
    subdisciplineBanner: 'HANDICRAFTS · CIRCULAR ECONOMY · ARTISANAL PROCESSING',
    targetPages: 52,
    title: "Hand-Knotted Carpets, Papier-Mâché & the Circular Economy of Kashmir's Craft Industries",
    abstract:
      'A comparative lifecycle investigation of wool processing, carpet washing, paper recycling, adhesives, pigments, varnishes, production waste and environmentally responsible artisanal manufacturing.',
    author: 'KEW Circular Economy & Industrial Ecology Unit',
    telemetryRoute: '/sectoral-eia/sectors/handicrafts',
    recommendedDataSources: ['OpenStreetMap', 'Validated field observations', 'Laboratory analysis'],
  }),

  // ── SECTOR IV: AGRICULTURE AND SOIL SYSTEMS (5) ────────────────────────────
  {
    id: 'rep-seiae-2026-04',
    code: 'KEW-SR-2026-04',
    sequenceNumber: 4,
    divisionId: 'sector-04-agriculture',
    divisionRoman: 'IV',
    divisionTitle: 'SECTOR IV: AGRICULTURE AND SOIL SYSTEMS',
    sectorTag: 'agriculture',
    sector: 'agriculture',
    subdisciplineBanner: 'AGRICULTURE · NITROGEN LEACHING · WULAR EUTROPHICATION',
    title: 'Nitrogen Surges and Wetland Eutrophication in the Lower Jhelum & Wular Basin',
    abstract:
      'Secondary-data and Copernicus Sentinel-2 scientific assessment of urea over-broadcasting, seasonal nitrate leaching through floodplain drainage canals, and constructed wetland bio-swale blueprints to protect the Wular Ramsar sanctuary (#461).',
    status: 'Published',
    date: 'February 2026',
    pages: 48,
    author: 'EcoWatch Agro-Hydrology & Soil Sciences Working Group',
    isProposedWorkingGroup: false,
    badge: 'Secondary-Data Scientific Assessment',
    telemetryRoute: '/sectoral-eia/sectors/agriculture',
    gisMapRoute: '/sectoral-eia/impact-atlas',
    historicalComparisonRoute: '/earth-human-impact/aquatic-cryosphere/wetland-encroachment',
    indicatorsRoute: '/sectoral-eia/sectors/agriculture',
    referencesRoute: '/research-library',
    linkedInvestigationSlug: 'wular-lake-effectiveness-of-large-scale-restoration',
    recommendedDataSources: ['Sentinel-2 MSI', 'JRC Global Surface Water', 'SoilGrids', 'Validated field observations', 'Laboratory analysis'],
    assetReadiness: {
      reportPdfAvailable: true,
      telemetryAvailable: true,
      gisMapAvailable: true,
      datasetAvailable: true,
      historicalComparisonAvailable: true,
      referencesAvailable: true,
      indicatorsAvailable: true,
      updatesAvailable: true,
    },
  },
  makeProposedDossier({
    seq: 17,
    divisionId: 'sector-04-agriculture',
    sectorTag: 'agriculture',
    legacySector: 'agriculture',
    subdisciplineBanner: 'AGRICULTURE · PADDY CONVERSION · FLOOD STORAGE',
    targetPages: 60,
    title: "Paddy Land Conversion & the Progressive Loss of Kashmir's Natural Floodwater Storage Capacity",
    abstract:
      'A multi-temporal assessment of agricultural land conversion, floodplain urbanization, surface runoff, infiltration capacity, drainage connectivity and the hydrological functions of traditional paddy landscapes.',
    author: 'KEW Agricultural Hydrology & Floodplain Intelligence Unit',
    telemetryRoute: '/sectoral-eia/sectors/agriculture',
    recommendedDataSources: ['Landsat historical archive', 'Sentinel-1 SAR', 'Sentinel-2 MSI', 'Copernicus DEM', 'OpenStreetMap'],
  }),
  makeProposedDossier({
    seq: 18,
    divisionId: 'sector-04-agriculture',
    sectorTag: 'agriculture',
    legacySector: 'agriculture',
    subdisciplineBanner: 'AGRICULTURE · SAFFRON HERITAGE · KAREWA SOILS',
    targetPages: 54,
    title: 'Saffron Cultivation, Karewa Soil Degradation & Climatic Vulnerability in Pampore',
    abstract:
      "An investigation of precipitation variability, soil moisture stress, land conversion, topsoil removal, irrigation limitations and the ecological resilience of Kashmir's traditional saffron-growing landscapes.",
    author: 'KEW Soil Sciences & Agricultural Climate Adaptation Unit',
    telemetryRoute: '/sectoral-eia/sectors/agriculture',
    linkedInvestigationSlug: 'disappearance-of-kashmirs-karewas',
    recommendedDataSources: ['Sentinel-1 SAR', 'Sentinel-2 MSI', 'CHIRPS', 'SoilGrids', 'Validated field observations'],
  }),
  makeProposedDossier({
    seq: 19,
    divisionId: 'sector-04-agriculture',
    sectorTag: 'agriculture',
    legacySector: 'agriculture',
    subdisciplineBanner: 'AGRICULTURE · PLASTICULTURE · MICROPLASTIC CONTAMINATION',
    targetPages: 48,
    title: "Agricultural Plastic Pollution & Microplastic Accumulation in Kashmir's Soils and Waterways",
    abstract:
      'An assessment of greenhouse films, plastic mulching, irrigation pipes, pesticide containers and agricultural packaging as potential sources of persistent soil and freshwater contamination.',
    author: 'KEW Emerging Contaminants & Agricultural Waste Unit',
    telemetryRoute: '/environmental-monitoring/plastic-pollution',
    recommendedDataSources: ['Sentinel-2 MSI', 'SoilGrids', 'Validated field observations', 'Laboratory analysis'],
  }),
  makeProposedDossier({
    seq: 20,
    divisionId: 'sector-04-agriculture',
    sectorTag: 'agriculture',
    legacySector: 'agriculture',
    subdisciplineBanner: 'AGRICULTURE · RANGELAND ECOLOGY · SOIL CARBON',
    targetPages: 56,
    title: 'Livestock Grazing, Alpine Pasture Degradation & Mountain Soil Carbon Dynamics',
    abstract:
      'An investigation of seasonal grazing intensity, pasture carrying capacity, vegetation regeneration, soil compaction, erosion, soil organic carbon and traditional pastoral management practices.',
    author: 'KEW Rangeland Ecology & Pastoral Systems Unit',
    telemetryRoute: '/sectoral-eia/sectors/agriculture',
    recommendedDataSources: ['MODIS and VIIRS', 'Sentinel-2 MSI', 'SoilGrids', 'Copernicus DEM', 'Validated field observations'],
  }),

  // ── SECTOR V: WATER RESOURCES AND LIMNOLOGICAL SYSTEMS (4) ─────────────────
  makeProposedDossier({
    seq: 21,
    divisionId: 'sector-05-water-resources',
    sectorTag: 'water-resources',
    subdisciplineBanner: 'WATER RESOURCES · LIMNOLOGY · SEDIMENT DYNAMICS',
    targetPages: 84,
    title: 'Three Decades of Mechanical Dredging in Dal Lake: Sediment Dynamics, Nutrient Resuspension & Wetland Loss',
    abstract:
      'A forensic limnological assessment of long-term mechanical dredging, sediment transport disruption, nutrient resuspension, dredged material disposal, settling basin performance and the loss of peripheral wetlands and natural ecological buffers.',
    author: 'KEW Limnological Intelligence & Sediment Dynamics Unit',
    telemetryRoute: '/water-systems/lakes',
    gisMapRoute: '/environmental-investigations/atlas',
    linkedInvestigationSlug: 'dal-lake-mechanical-dredging-ecological-defences',
    recommendedDataSources: ['Landsat historical archive', 'Sentinel-2 MSI', 'JRC Global Surface Water', 'Validated field observations', 'Laboratory analysis'],
  }),
  makeProposedDossier({
    seq: 22,
    divisionId: 'sector-05-water-resources',
    sectorTag: 'water-resources',
    subdisciplineBanner: 'WATER RESOURCES · WETLAND HYDROLOGY · RAMSAR RESILIENCE',
    targetPages: 72,
    title: 'Wular Lake Hydrological Transformation: Sedimentation, Encroachment & Ramsar Ecosystem Resilience',
    abstract:
      'An integrated investigation of catchment-derived sediment, historical lake extent, water storage variability, vegetation succession, drainage modifications, fisheries and flood attenuation capacity.',
    author: 'KEW Wetland Hydrology & Ramsar Intelligence Unit',
    telemetryRoute: '/water-systems/wetlands',
    linkedInvestigationSlug: 'wular-lake-effectiveness-of-large-scale-restoration',
    recommendedDataSources: ['Landsat historical archive', 'Sentinel-1 SAR', 'Sentinel-2 MSI', 'JRC Global Surface Water', 'Validated field observations'],
  }),
  makeProposedDossier({
    seq: 23,
    divisionId: 'sector-05-water-resources',
    sectorTag: 'water-resources',
    subdisciplineBanner: 'WATER RESOURCES · HYDROGEOLOGY · SPRING SYSTEMS',
    targetPages: 60,
    title: 'Disappearing Springs of Kashmir: Groundwater Recharge Disruption, Land Transformation & Water Security',
    abstract:
      'A hydrogeological assessment of spring discharge variability, aquifer recharge zones, groundwater abstraction, catchment urbanization, chemical contamination and community dependence on traditional freshwater sources.',
    author: 'KEW Hydrogeology & Groundwater Intelligence Unit',
    telemetryRoute: '/water-systems/springs',
    recommendedDataSources: ['GRACE / GRACE-FO', 'CHIRPS', 'Copernicus DEM', 'Validated field observations', 'Laboratory analysis'],
  }),
  makeProposedDossier({
    seq: 24,
    divisionId: 'sector-05-water-resources',
    sectorTag: 'water-resources',
    subdisciplineBanner: 'WATER RESOURCES · FLUVIAL GEOMORPHOLOGY · E-FLOWS',
    targetPages: 68,
    title: 'The Jhelum River Environmental Integrity Assessment: Flow Regulation, Pollution & Floodplain Connectivity',
    abstract:
      'A basin-scale investigation of river morphology, sewage loading, industrial effluents, sediment transport, channel modification, floodplain disconnection and ecological flow requirements.',
    author: 'KEW Fluvial Geomorphology & River Basin Sciences Unit',
    telemetryRoute: '/water-systems/rivers',
    linkedInvestigationSlug: 'jhelum-river-dredging-flood-management-morphology',
    recommendedDataSources: ['Sentinel-1 SAR', 'Sentinel-2 MSI', 'NASA GPM', 'Copernicus DEM', 'Laboratory analysis'],
  }),

  // ── SECTOR VI: MINING AND RESOURCE EXTRACTION (3) ──────────────────────────
  makeProposedDossier({
    seq: 25,
    divisionId: 'sector-06-mining-extraction',
    sectorTag: 'mining-extraction',
    subdisciplineBanner: 'MINING & EXTRACTION · QUATERNARY GEOLOGY · KAREWAS',
    targetPages: 76,
    title: "Karewa Excavation & the Irreversible Loss of Kashmir's Quaternary Geological Heritage",
    abstract:
      'A geological and geomorphological investigation of Karewa sediment extraction, palaeoenvironmental archives, agricultural land loss, slope instability, groundwater recharge disruption and associated infrastructure development.',
    author: 'KEW Quaternary Geology & Earth Systems Intelligence Unit',
    telemetryRoute: '/earth-human-impact/mining-extraction',
    linkedInvestigationSlug: 'disappearance-of-kashmirs-karewas',
    recommendedDataSources: ['Landsat historical archive', 'Sentinel-1 SAR', 'Sentinel-2 MSI', 'Copernicus DEM', 'Validated field observations'],
  }),
  makeProposedDossier({
    seq: 26,
    divisionId: 'sector-06-mining-extraction',
    sectorTag: 'mining-extraction',
    subdisciplineBanner: 'MINING & EXTRACTION · RIVERBED AGGREGATES · INCISION',
    targetPages: 64,
    title: 'Riverbed Sand and Gravel Mining: Channel Incision, Aquatic Habitat Loss & Infrastructure Vulnerability',
    abstract:
      'A cumulative assessment of aggregate extraction, altered sediment budgets, riverbed degradation, bank erosion, fish spawning habitats, bridge foundation exposure and downstream geomorphological consequences.',
    author: 'KEW River Geomorphology & Extractive Industries Unit',
    telemetryRoute: '/earth-human-impact/mining-extraction',
    recommendedDataSources: ['Sentinel-2 MSI', 'Copernicus DEM', 'OpenStreetMap', 'Validated field observations'],
  }),
  makeProposedDossier({
    seq: 27,
    divisionId: 'sector-06-mining-extraction',
    sectorTag: 'mining-extraction',
    subdisciplineBanner: 'MINING & EXTRACTION · STONE QUARRYING · PARTICULATES',
    targetPages: 58,
    title: "Stone Quarrying, Crusher Industries & Particulate Pollution Across Kashmir's Mountain Foothills",
    abstract:
      'An investigation of quarry expansion, blasting impacts, respirable particulate matter, noise pollution, vegetation removal, slope instability and restoration obligations.',
    author: 'KEW Geological Hazards & Industrial Air Quality Unit',
    telemetryRoute: '/environmental-monitoring/air-pollution',
    recommendedDataSources: ['Sentinel-2 MSI', 'Sentinel-5P', 'Copernicus DEM', 'Validated field observations', 'Laboratory analysis'],
  }),

  // ── SECTOR VII: URBANIZATION, HOUSING AND INFRASTRUCTURE (4) ───────────────
  makeProposedDossier({
    seq: 28,
    divisionId: 'sector-07-urbanization-infrastructure',
    sectorTag: 'urbanization',
    subdisciplineBanner: 'URBANIZATION · WETLAND CONVERSION · FLOOD RESILIENCE',
    targetPages: 80,
    title: 'Greater Srinagar Urban Expansion & the Collapse of Natural Ecological Infrastructure',
    abstract:
      'A multi-decadal remote sensing assessment of built-up expansion, wetland conversion, impervious surface growth, urban heat islands, drainage disruption and declining natural flood resilience.',
    author: 'KEW Urban Ecology & Spatial Intelligence Unit',
    telemetryRoute: '/earth-human-impact/urban-ecology',
    recommendedDataSources: ['Landsat historical archive', 'Sentinel-1 SAR', 'Sentinel-2 MSI', 'JRC Global Surface Water', 'OpenStreetMap'],
  }),
  makeProposedDossier({
    seq: 29,
    divisionId: 'sector-07-urbanization-infrastructure',
    sectorTag: 'infrastructure',
    subdisciplineBanner: 'INFRASTRUCTURE · SLOPE STABILITY · WATERSHED IMPACTS',
    targetPages: 72,
    title: 'Himalayan Road Construction, Slope Destabilization & Cumulative Watershed Impacts',
    abstract:
      'An engineering ecology assessment of road cutting, slope excavation, retaining structures, drainage modification, construction debris disposal, landslide susceptibility and habitat fragmentation.',
    author: 'KEW Infrastructure Ecology & Geotechnical Risk Unit',
    telemetryRoute: '/hazard-intelligence',
    recommendedDataSources: ['Sentinel-1 SAR', 'Sentinel-2 MSI', 'Copernicus DEM', 'CHIRPS', 'OpenStreetMap'],
  }),
  makeProposedDossier({
    seq: 30,
    divisionId: 'sector-07-urbanization-infrastructure',
    sectorTag: 'infrastructure',
    subdisciplineBanner: 'INFRASTRUCTURE · TUNNELING · SUBSURFACE HYDROLOGY',
    targetPages: 64,
    title: 'Tunnel Construction, Subsurface Hydrology & Himalayan Spring System Vulnerability',
    abstract:
      'An investigation of geological discontinuities, excavation-related groundwater interception, spring discharge changes, tunnel drainage, spoil disposal and potential cumulative effects on mountain aquifers.',
    author: 'KEW Engineering Geology & Subsurface Hydrology Unit',
    telemetryRoute: '/water-systems/springs',
    recommendedDataSources: ['Sentinel-1 SAR', 'Copernicus DEM', 'GRACE / GRACE-FO', 'Validated field observations', 'Laboratory analysis'],
  }),
  makeProposedDossier({
    seq: 31,
    divisionId: 'sector-07-urbanization-infrastructure',
    sectorTag: 'urbanization',
    subdisciplineBanner: 'URBANIZATION · THERMAL REMOTE SENSING · HEAT ISLANDS',
    targetPages: 56,
    title: 'Concrete Expansion, Urban Heat Islands & the Declining Thermal Resilience of Srinagar',
    abstract:
      'A satellite-based assessment of land surface temperature, vegetation loss, building density, surface albedo, impervious materials and urban cooling opportunities.',
    author: 'KEW Urban Climatology & Thermal Remote Sensing Unit',
    telemetryRoute: '/earth-human-impact/urban-ecology',
    recommendedDataSources: ['Landsat historical archive', 'MODIS and VIIRS', 'Sentinel-2 MSI', 'ERA5', 'OpenStreetMap'],
  }),

  // ── SECTOR VIII: ENERGY AND HYDROPOWER (3) ─────────────────────────────────
  makeProposedDossier({
    seq: 32,
    divisionId: 'sector-08-energy-hydropower',
    sectorTag: 'energy-hydropower',
    subdisciplineBanner: 'ENERGY & HYDROPOWER · E-FLOWS · RIVER CONNECTIVITY',
    targetPages: 78,
    title: 'Hydroelectric Development & Cumulative Ecological Impacts Across the Western Himalayan River Systems',
    abstract:
      'A basin-level investigation of dam construction, environmental flows, sediment trapping, aquatic connectivity, reservoir dynamics, downstream communities and cumulative ecological consequences.',
    author: 'KEW Hydropower Ecology & Transboundary Water Intelligence Unit',
    telemetryRoute: '/earth-human-impact/energy-infrastructure',
    recommendedDataSources: ['Landsat historical archive', 'Sentinel-2 MSI', 'JRC Global Surface Water', 'Copernicus DEM', 'GBIF'],
  }),
  makeProposedDossier({
    seq: 33,
    divisionId: 'sector-08-energy-hydropower',
    sectorTag: 'energy',
    subdisciplineBanner: 'ENERGY · WINTER BIOMASS · BLACK CARBON EMISSIONS',
    targetPages: 54,
    title: "Kashmir's Winter Energy Economy: Biomass Combustion, Heating Demand & Atmospheric Emissions",
    abstract:
      'An emissions inventory and exposure assessment of domestic heating fuels, traditional combustion systems, electricity demand, black carbon emissions and cleaner winter energy alternatives.',
    author: 'KEW Energy Systems & Atmospheric Chemistry Unit',
    telemetryRoute: '/environmental-monitoring/air-pollution',
    recommendedDataSources: ['Sentinel-5P', 'MODIS and VIIRS', 'ERA5', 'Validated field observations', 'Laboratory analysis'],
  }),
  makeProposedDossier({
    seq: 34,
    divisionId: 'sector-08-energy-hydropower',
    sectorTag: 'renewable-energy',
    subdisciplineBanner: 'RENEWABLE ENERGY · SOLAR INFRASTRUCTURE · LIFECYCLE',
    targetPages: 48,
    title: 'Renewable Energy Transition & the Environmental Trade-offs of Himalayan Solar Infrastructure',
    abstract:
      'An assessment of solar energy potential, land requirements, panel lifecycle emissions, mountain habitat sensitivity, distributed rooftop generation and end-of-life material management.',
    author: 'KEW Renewable Energy & Sustainability Sciences Unit',
    telemetryRoute: '/earth-human-impact/energy-infrastructure',
    recommendedDataSources: ['ERA5', 'Sentinel-2 MSI', 'Copernicus DEM', 'OpenStreetMap'],
  }),

  // ── SECTOR IX: TRANSPORTATION AND ATMOSPHERIC POLLUTION (2) ────────────────
  makeProposedDossier({
    seq: 35,
    divisionId: 'sector-09-transportation-air',
    sectorTag: 'transportation',
    subdisciplineBanner: 'TRANSPORTATION · VALLEY INVERSIONS · SOURCE APPORTIONMENT',
    targetPages: 72,
    title: "Srinagar's Atmospheric Pollution Crisis: Emission Source Apportionment, Valley Inversions & Human Exposure",
    abstract:
      'A multi-source investigation of vehicular emissions, domestic heating, biomass burning, road dust, construction activity, industrial combustion, atmospheric inversions and population exposure to particulate pollution.',
    author: 'KEW Atmospheric Sciences & Air Quality Intelligence Unit',
    telemetryRoute: '/environmental-monitoring/air-pollution',
    recommendedDataSources: ['Sentinel-5P', 'MODIS and VIIRS', 'ERA5', 'Validated field observations', 'Laboratory analysis'],
  }),
  makeProposedDossier({
    seq: 36,
    divisionId: 'sector-09-transportation-air',
    sectorTag: 'transportation',
    subdisciplineBanner: 'TRANSPORTATION · TOURIST MOBILITY · CARBON FOOTPRINT',
    targetPages: 56,
    title: "Tourist Mobility, Traffic Congestion & the Carbon Footprint of Kashmir's Transport Sector",
    abstract:
      'An assessment of seasonal vehicle influx, passenger movement, transport emissions, congestion patterns, road dust generation and opportunities for low-emission public transportation.',
    author: 'KEW Sustainable Mobility & Transport Emissions Unit',
    telemetryRoute: '/environmental-monitoring/transportation-pollution',
    recommendedDataSources: ['Sentinel-5P', 'OpenStreetMap', 'ERA5', 'Validated field observations'],
  }),

  // ── SECTOR X: WASTE, SANITATION AND PUBLIC HEALTH (2) ──────────────────────
  makeProposedDossier({
    seq: 37,
    divisionId: 'sector-10-waste-sanitation',
    sectorTag: 'waste-management',
    subdisciplineBanner: 'WASTE MANAGEMENT · LANDFILL LEACHATE · GROUNDWATER',
    targetPages: 68,
    title: 'Municipal Solid Waste, Landfill Leachate & Freshwater Contamination Across Urban Kashmir',
    abstract:
      'An investigation of municipal waste generation, landfill capacity, leachate chemistry, methane emissions, groundwater contamination, informal recycling and decentralized waste management alternatives.',
    author: 'KEW Waste Systems & Environmental Toxicology Unit',
    telemetryRoute: '/environmental-monitoring/solid-waste',
    recommendedDataSources: ['Sentinel-2 MSI', 'Sentinel-5P', 'OpenStreetMap', 'Validated field observations', 'Laboratory analysis'],
  }),
  makeProposedDossier({
    seq: 38,
    divisionId: 'sector-10-waste-sanitation',
    sectorTag: 'sanitation',
    subdisciplineBanner: 'SANITATION · WASTEWATER PERFORMANCE · PATHOGENS',
    targetPages: 64,
    title: "Untreated Sewage, Pathogenic Contamination & Wastewater Treatment Performance in Kashmir's Urban Settlements",
    abstract:
      'A technical assessment of sewage collection networks, treatment plant capacity, biological oxygen demand, faecal contamination, nutrient loading and decentralized wastewater treatment opportunities.',
    author: 'KEW Environmental Microbiology & Sanitation Sciences Unit',
    telemetryRoute: '/environmental-monitoring/sewage-wastewater',
    recommendedDataSources: ['OpenStreetMap', 'Validated field observations', 'Laboratory analysis'],
  }),

  // ── SECTOR XI: FORESTRY AND BIODIVERSITY (1) ───────────────────────────────
  makeProposedDossier({
    seq: 39,
    divisionId: 'sector-11-forestry-biodiversity',
    sectorTag: 'forestry-biodiversity',
    subdisciplineBanner: 'FORESTRY & BIODIVERSITY · CORRIDORS · CARBON REGULATION',
    targetPages: 76,
    title: 'Western Himalayan Forest Fragmentation, Wildlife Corridor Disruption & Ecosystem Service Decline',
    abstract:
      'A landscape-scale assessment of forest cover transformation, infrastructure encroachment, habitat fragmentation, wildlife movement corridors, carbon storage, watershed regulation and ecological restoration priorities.',
    author: 'KEW Forest Ecology & Landscape Biodiversity Unit',
    telemetryRoute: '/protected-network/corridors-and-connectivity',
    gisMapRoute: '/protected-network/atlas',
    recommendedDataSources: ['Landsat historical archive', 'Sentinel-2 MSI', 'Copernicus DEM', 'GBIF', 'Validated field observations'],
  }),

  // ── SECTOR XII: CUMULATIVE ENVIRONMENTAL IMPACTS (1) ───────────────────────
  makeProposedDossier({
    seq: 40,
    divisionId: 'sector-12-cumulative-impacts',
    sectorTag: 'cross-sectoral',
    subdisciplineBanner: 'CROSS-SECTORAL · CUMULATIVE THRESHOLDS · STATE OF ENVIRONMENT',
    targetPages: 120,
    title: "The State of Kashmir's Environment 2026: Western Himalayan Cumulative Sectoral Impact & Ecological Resilience Assessment",
    abstract:
      'A flagship integrated scientific assessment synthesizing tourism, horticulture, agriculture, handicrafts, urbanization, mining, energy, transportation, forestry, water resources and waste management into a unified cumulative environmental impact framework. Evaluates ecological thresholds, cross-sectoral pollution transfer, environmental carrying capacity, climate vulnerability, ecosystem service degradation and priority intervention scenarios.',
    author: 'Kashmir EcoWatch Interdisciplinary Scientific Council & Sectoral Environmental Impact Assessment Unit',
    telemetryRoute: '/sectoral-eia/cumulative-impact',
    gisMapRoute: '/sectoral-eia/impact-atlas',
    recommendedDataSources: [
      'Landsat historical archive',
      'Sentinel-1 SAR',
      'Sentinel-2 MSI',
      'Sentinel-5P',
      'MODIS and VIIRS',
      'ERA5',
      'CHIRPS',
      'NASA GPM',
      'GRACE / GRACE-FO',
      'Copernicus DEM',
      'JRC Global Surface Water',
      'GBIF',
      'SoilGrids',
      'OpenStreetMap',
      'Validated field observations',
      'Laboratory analysis',
    ],
  }),
  ...ADDITIONAL_60_RESEARCH_DOSSIERS,
];

export function getResearchDossierByCodeOrId(
  codeOrId: string,
  dossiers: ResearchSeriesDossier[] = SECTORAL_RESEARCH_SERIES_2026
): ResearchSeriesDossier | undefined {
  const norm = decodeURIComponent(codeOrId).trim().toLowerCase();
  return dossiers.find(
    (d) => d.code.toLowerCase() === norm || d.id.toLowerCase() === norm
  );
}

export function computeResearchSeriesPortfolioStats(
  dossiers: ResearchSeriesDossier[] = SECTORAL_RESEARCH_SERIES_2026
) {
  const totalDossiers = dossiers.length;
  const publishedCount = dossiers.filter(
    (d) => d.status === 'Published' || d.status === 'Updated'
  ).length;
  const proposedOrInProgressCount = totalDossiers - publishedCount;
  const originalSectoral40Count = dossiers.filter((d) => d.sequenceNumber <= 40).length;
  const expandedNaturalAndGovernance60Count = dossiers.filter(
    (d) => d.sequenceNumber >= 41
  ).length;
  const priority15Count = dossiers.filter((d) => typeof d.priorityRank === 'number').length;

  const divisionBreakdown = RESEARCH_SERIES_DIVISIONS.map((div) => ({
    ...div,
    count: dossiers.filter((d) => d.divisionId === div.id).length,
    publishedInDivision: dossiers.filter(
      (d) => d.divisionId === div.id && (d.status === 'Published' || d.status === 'Updated')
    ).length,
  }));

  return {
    totalDossiers,
    sectorsCount: RESEARCH_SERIES_DIVISIONS.length,
    publishedCount,
    proposedCount: dossiers.filter((d) => d.status === 'Proposed').length,
    proposedOrInProgressCount,
    originalSectoral40Count,
    expandedNaturalAndGovernance60Count,
    priority15Count: priority15Count || PRIORITY_15_RESEARCH_QUEUE.length,
    divisionBreakdown,
  };
}
