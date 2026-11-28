/**
 * KASHMIR ECOWATCH — CENTRALIZED HEADLINE METRIC PROVENANCE REGISTER
 *
 * Every public headline counter across the Homepage, /about, /biodiversity,
 * /protected-areas, /water-systems, /environmental-investigations, /sectoral-eia,
 * /open-data, and SEO metadata MUST resolve from this single provenance-backed registry.
 */

import type { ScientificProvenanceClass } from '@/lib/scientific-integrity/quarantine-gateway';
import {
  CANONICAL_DISTRICTS,
  CANONICAL_SUBREGIONS,
  LADAKH_2024_NOTIFIED_DISTRICTS,
  VERIFIED_WESTERN_HIMALAYAN_RAMSAR_SITES,
} from '@/data/geographic-registry';
import { KEW_OWNED_PHYSICAL_SENSORS_COUNT } from '@/data/monitoring-infrastructure-registry';

export interface PlatformMetricRecord {
  metricId: string;
  displayLabel: string;
  shortLabel: string;
  value: number;
  formattedValue: string;
  unit: string;
  geographicScope: string;
  definition: string;
  methodology: string;
  dataSource: string;
  sourceModulePath: string;
  lastVerifiedDate: string;
  updateCadence: string;
  uncertaintyOrCaveat: string;
  provenanceClass: ScientificProvenanceClass;
}

export const PLATFORM_METRICS = {
  subregionsCount: {
    metricId: 'MET-GEO-01',
    displayLabel: 'Western Himalayan Subregions',
    shortLabel: 'Subregions',
    value: CANONICAL_SUBREGIONS.length, // 5
    formattedValue: '5',
    unit: 'subregions',
    geographicScope: 'Kashmir Valley, Jammu Region, Ladakh, Azad Jammu & Kashmir, Gilgit-Baltistan',
    definition: 'Count of contiguous Western Himalayan administrative-ecological subregions covered by KEW.',
    methodology: 'Direct count of canonical subregions in geographic-registry.ts.',
    dataSource: 'Official administrative gazettes & transboundary Indus-Jhelum basin boundary definitions',
    sourceModulePath: 'src/data/geographic-registry.ts',
    lastVerifiedDate: '2026-11-27',
    updateCadence: 'Static (updated only upon statutory administrative reorganization)',
    uncertaintyOrCaveat: 'Data completeness varies across jurisdictions; statutory Indian datasets (NWIA, FSI, CAG) cover J&K and Ladakh.',
    provenanceClass: 'government_statutory_record',
  },
  operationalDistrictsCount: {
    metricId: 'MET-GEO-02',
    displayLabel: 'Operational Baseline Districts',
    shortLabel: 'Districts',
    value: CANONICAL_DISTRICTS.length, // 46
    formattedValue: '46',
    unit: 'districts',
    geographicScope: '5 Western Himalayan Subregions (10 KV + 10 Jammu + 2 Ladakh + 10 AJ&K + 14 GB)',
    definition: 'Operational district polygons with harmonized demographic, elevation, and ecological baselines.',
    methodology: 'Sum of verified district units across the 5 subregions; sub-district tehsils (e.g., Pampore) are nested under parent districts.',
    dataSource: 'Census / GAD / PBS / GB Planning & Development district registries',
    sourceModulePath: 'src/data/geographic-registry.ts',
    lastVerifiedDate: '2026-11-27',
    updateCadence: 'Annual administrative review',
    uncertaintyOrCaveat: `Excludes ${LADAKH_2024_NOTIFIED_DISTRICTS.length} newly announced Aug 2024 Ladakh districts (Zanskar, Drass, Sham, Nubra, Changthang = 51 total notified) pending demarcated Census/GIS boundary gazettes.`,
    provenanceClass: 'government_statutory_record',
  },
  ramsarWetlandsCount: {
    metricId: 'MET-WET-01',
    displayLabel: 'Designated Ramsar Wetlands',
    shortLabel: 'Ramsar Sites',
    value: VERIFIED_WESTERN_HIMALAYAN_RAMSAR_SITES.length, // 7
    formattedValue: '7',
    unit: 'Ramsar sites',
    geographicScope: 'J&K (5: Wular #461, Hokera #1570, Surinsar-Mansar #1573, Shallbugh #2488, Hygam #2496) & Ladakh (2: Tsomoriri #1213, Tso Kar #2443)',
    definition: 'Wetlands of International Importance officially inscribed on the Ramsar Sites Information Service (RSIS).',
    methodology: 'Verified 1:1 against official RSIS site sheets (#461, #1213, #1570, #1573, #2443, #2488, #2496).',
    dataSource: 'Ramsar Convention Secretariat — Ramsar Sites Information Service (RSIS)',
    sourceModulePath: 'src/data/geographic-registry.ts',
    lastVerifiedDate: '2026-11-27',
    updateCadence: 'Upon official Ramsar Secretariat designation',
    uncertaintyOrCaveat: 'Does not include domestic Wildlife Protection Act Wetland Conservation Reserves (such as Mirgund, Chatlam, Kranchoo, or Gharana) unless designated on RSIS.',
    provenanceClass: 'government_statutory_record',
  },
  kewOwnedPhysicalSensorsCount: {
    metricId: 'MET-SEN-01',
    displayLabel: 'KEW-Owned Physical Field Sensors',
    shortLabel: 'KEW Physical Sensors',
    value: KEW_OWNED_PHYSICAL_SENSORS_COUNT, // 0
    formattedValue: '0',
    unit: 'physical stations',
    geographicScope: 'Platform-wide',
    definition: 'Physical telemetry hardware owned or operated directly in the field by Kashmir EcoWatch.',
    methodology: 'Direct hardware asset inventory.',
    dataSource: 'KEW Monitoring Infrastructure Audit (November 2026)',
    sourceModulePath: 'src/data/monitoring-infrastructure-registry.ts',
    lastVerifiedDate: '2026-11-27',
    updateCadence: 'Continuous',
    uncertaintyOrCaveat: 'All live environmental feeds on KEW aggregate external public APIs (USGS, EMSC, NCS, Open-Meteo/ECMWF/NOAA/GloFAS, AirGradient community monitors, and NDMA SACHET).',
    provenanceClass: 'editorial_synthesis',
  },
  protectedAreasVerifiedCount: {
    metricId: 'MET-PA-01',
    displayLabel: 'Verified Protected Areas Mapped',
    shortLabel: 'Protected Areas',
    value: 45,
    formattedValue: '45',
    unit: 'protected areas',
    geographicScope: '5 Western Himalayan Subregions (National Parks, Wildlife Sanctuaries, Conservation & Wetland Reserves)',
    definition: 'Count of in-scope statutory National Parks, Wildlife Sanctuaries, and notified Conservation/Wetland Reserves in protected-network.ts (excluding 2 out-of-scope Himachal Pradesh parks).',
    methodology: 'Filtered count of verified Western Himalayan protected areas in src/data/protected-network.ts.',
    dataSource: 'Department of Wildlife Protection J&K, UT Ladakh Wildlife Dept, AJ&K Wildlife & Fisheries, GB Parks & Wildlife',
    sourceModulePath: 'src/data/protected-network.ts',
    lastVerifiedDate: '2026-11-27',
    updateCadence: 'Quarterly statutory gazette review',
    uncertaintyOrCaveat: 'Represents mapped core protected areas in KEW registry; J&K and Ladakh additionally maintain smaller forest/game reserves undergoing boundary digitization.',
    provenanceClass: 'government_statutory_record',
  },
  verifiedSpeciesProfilesCount: {
    metricId: 'MET-BIO-01',
    displayLabel: 'Verified Species Reference Profiles',
    shortLabel: 'Verified Species',
    value: 239, // 111 mammals + 46 unique birds + 54 true fish + 28 verified flora
    formattedValue: '239',
    unit: 'verified species',
    geographicScope: 'Western Himalayan Bioregions',
    definition: 'Taxonomically verified binomial species profiles across Mammals (111), Avifauna (46), Freshwater Fish (54), and Reference Vascular Flora (28) after quarantining 2,368 synthetic/misclassified placeholder entries.',
    methodology: 'Exact count of verified non-quarantined species records across src/data/species/{mammals,birds,fish,plants}.ts.',
    dataSource: 'IUCN Red List, Wildlife Institute of India (WII), FishBase, and University of Kashmir taxonomic monographs',
    sourceModulePath: 'src/data/species/index.ts',
    lastVerifiedDate: '2026-11-27',
    updateCadence: 'Incremental upon herbarium/checklist verification',
    uncertaintyOrCaveat: 'Curated reference subset (not total regional biodiversity richness, which exceeds ~4,500 vascular plants and ~550 birds in published literature).',
    provenanceClass: 'peer_reviewed_literature',
  },
  mappedWaterbodiesCount: {
    metricId: 'MET-HYD-01',
    displayLabel: 'Cataloged Lakes & Wetlands in Master Registry',
    shortLabel: 'Mapped Lakes & Wetlands',
    value: 553,
    formattedValue: '553',
    unit: 'waterbodies',
    geographicScope: '521 Kashmir Valley waterbodies + 32 Jammu, Ladakh, AJ&K & Gilgit-Baltistan benchmark lakes',
    definition: 'Named and unnamed high-altitude glacial, karewa, and floodplain lakes/wetlands in master-lake-registry.ts.',
    methodology: 'Direct count of MASTER_LAKE_REGISTRY (22 with published limnological TSI data; 531 satellite-inventoried / insufficient limnological data).',
    dataSource: 'ISRO SAC National Wetland Inventory & Assessment (NWIA 2011), WISA, LCMA, and peer-reviewed limnological studies',
    sourceModulePath: 'src/data/hydrology/master-lake-registry.ts',
    lastVerifiedDate: '2026-11-27',
    updateCadence: 'Semi-annual inventory reconciliation',
    uncertaintyOrCaveat: 'Separately from named registry entries, ISRO NWIA (2011) mapped 3,654 total wetlands (>=2.25 ha + small wetlands) covering 391,501 ha across the erstwhile State of J&K including Ladakh.',
    provenanceClass: 'government_statutory_record',
  },
  nwiaTotalWetlandAreaHa: {
    metricId: 'MET-HYD-02',
    displayLabel: 'ISRO NWIA Mapped Wetland Area (J&K + Ladakh Baseline)',
    shortLabel: 'NWIA Wetland Area',
    value: 391501,
    formattedValue: '391,501 ha',
    unit: 'hectares',
    geographicScope: 'Erstwhile State of Jammu & Kashmir (inclusive of Kashmir Valley, Jammu Region, and Ladakh)',
    definition: 'Total wetland area mapped by ISRO Space Applications Centre (SAC) 2006–07 LISS-III National Wetland Atlas (2011), including 2,106 high-altitude wetlands across J&K and Ladakh.',
    methodology: 'Published statutory table sum from ISRO SAC National Wetland Atlas: Jammu & Kashmir (2011); Kashmir Valley 10-district wetland area is 42,663 ha (without Bandipora/Ganderbal Wular-Shallabugh double-counting).',
    dataSource: 'ISRO Space Applications Centre (SAC), Ahmedabad — National Wetland Atlas: Jammu and Kashmir (2011)',
    sourceModulePath: 'src/data/nwia-references.ts',
    lastVerifiedDate: '2026-11-27',
    updateCadence: 'Historical 2006–07 satellite baseline',
    uncertaintyOrCaveat: '2,106 high-altitude wetlands is the combined erstwhile J&K + Ladakh figure (~1,790+ in Trans-Himalayan Ladakh and ~310+ alpine lakes in Kashmir Valley).',
    provenanceClass: 'government_statutory_record',
  },
  verifiedRiverBasinsCount: {
    metricId: 'MET-HYD-03',
    displayLabel: 'Verified River Basins & Major Sub-Basins',
    shortLabel: 'River Sub-Basins',
    value: 28,
    formattedValue: '28',
    unit: 'basins & sub-basins',
    geographicScope: 'Upper Indus, Jhelum, Chenab, Ravi, Shyok-Nubra, Zanskar-Suru, Gilgit-Hunza, Neelum, and Poonch Systems',
    definition: 'Hydrologically verified major river basins and principal tributary catchments after quarantining 374 procedurally scrambled sub-watershed placeholders.',
    methodology: 'Verified drainage hierarchy cross-checked against CWC Indus Basin Atlas, India-WRIS, and HydroSHEDS.',
    dataSource: 'Central Water Commission (CWC) Indus Basin Report & HydroSHEDS DEM Drainage Network',
    sourceModulePath: 'src/data/water-systems.ts',
    lastVerifiedDate: '2026-11-27',
    updateCadence: 'Static hydrographic hierarchy',
    uncertaintyOrCaveat: 'Fine-scale micro-watershed polygons (Level 8+) are queued for DEM HydroBASINS import.',
    provenanceClass: 'government_statutory_record',
  },
  canonicalInvestigationsCount: {
    metricId: 'MET-INV-01',
    displayLabel: 'Environmental Investigation Charters & Records',
    shortLabel: 'Investigation Charters',
    value: 53,
    formattedValue: '53',
    unit: 'investigation records',
    geographicScope: 'Western Himalayas (predominantly J&K & Ladakh)',
    definition: 'Total KEW-EIAI records: 2 Desk-Verified Canonical Records, 3 Active Investigations, 22 Scoping Reviews, and 26 Proposed Investigation Charters across a 24-section multidisciplinary report template.',
    methodology: 'Exact count of ALL_ENVIRONMENTAL_INVESTIGATIONS (KEW-INV-0001..0053); independently externally peer-reviewed count is 0.',
    dataSource: 'KEW Environmental Investigation & Accountability Intelligence (KEW-EIAI)',
    sourceModulePath: 'src/data/environmental-investigations.ts',
    lastVerifiedDate: '2026-11-27',
    updateCadence: 'Updated per workflow stage transition',
    uncertaintyOrCaveat: 'Only 2 records (KEW-INV-0001, KEW-INV-0002) are published Desk-Verified Canonical Records; 48 are scoping/proposed charters; 0 have independent external peer review.',
    provenanceClass: 'editorial_synthesis',
  },
  sectoralDossiersCount: {
    metricId: 'MET-RES-01',
    displayLabel: 'Sectoral EIA & Research Portfolio Dossiers',
    shortLabel: 'Research Dossiers',
    value: 101,
    formattedValue: '101',
    unit: 'dossiers',
    geographicScope: 'Western Himalayas across 23 environmental sectors (19-stage internal editorial workflow)',
    definition: 'Interconnected KEW-SR-2026-01..101 sectoral environmental synthesis dossiers (19-stage internal workflow; distinct from the 24-section KEW-EIAI forensic investigation template).',
    methodology: 'Exact count of merged research dossiers in sectoral-research-series-2026.ts.',
    dataSource: 'KEW Sectoral Environmental Impact & Research Portfolio',
    sourceModulePath: 'src/data/sectoral-research-series-2026.ts',
    lastVerifiedDate: '2026-11-27',
    updateCadence: 'Continuous',
    uncertaintyOrCaveat: 'Internal desk-synthesized research dossiers; external independent human peer review is pending across all 101 dossiers.',
    provenanceClass: 'editorial_synthesis',
  },
} as const satisfies Record<string, PlatformMetricRecord>;

export const ALL_PLATFORM_METRICS: PlatformMetricRecord[] = Object.values(PLATFORM_METRICS);
