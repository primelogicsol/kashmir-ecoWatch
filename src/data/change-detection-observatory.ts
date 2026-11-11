/**
 * Kashmir EcoWatch - Central Satellite-Based Change Detection Observatory (SCDO)
 * Earth & Human Impact Intelligence (EHII)
 * 
 * Multi-Sensor Spaceborne Telemetry Engine:
 * - USGS/NASA Landsat Collection 2 (Level-2 Surface Reflectance 1982–2026)
 * - Copernicus Sentinel-2 MSI (10m Multi-Spectral Surface Reflectance)
 * - Copernicus Sentinel-1 C-SAR (Interferometric Synthetic Aperture Radar Coherence & Amplitude)
 * - Copernicus 30m Global DEM & SRTM
 * - High-Resolution PlanetScope (3m Constellation Cadastral Auditing)
 * 
 * Strict Two-Tier Environmental Alert System:
 * - Tier 1: Preliminary Satellite Alerts (Automated Quality Screened • Explicit Uncertainty • Candidate Changes)
 * - Tier 2: Scientifically Verified Findings (Multi-temporal Review • Peer Sign-off • Field Truth Corroboration)
 */

export type DetectionCategory =
  | 'forest_loss'
  | 'wetland_encroachment'
  | 'paddy_conversion'
  | 'mining_quarrying'
  | 'urban_development'
  | 'river_lake_change'
  | 'infrastructure_expansion'
  | 'alpine_change';

export type AlertTier = 'Tier 1: Preliminary Alert' | 'Tier 2: Scientifically Verified Finding';

export type AlertStatus = 'Preliminary' | 'Under Scientific Review' | 'Verified' | 'Rejected / Corrected';

export interface PriorityDetectionCapability {
  id: DetectionCategory;
  name: string;
  primaryOutputs: string;
  sensorConstellation: string;
  spectralIndices: string[];
  cadenceDescription: string;
  uncertaintyMitigation: string;
  environmentalContext: string;
}

export interface ProcessingWorkflowStep {
  stepNumber: number;
  stageName: string;
  objective: string;
  technicalProcedure: string;
  scientificSafeguard: string;
  inputsAndFeeds: string[];
  outputArtifact: string;
}

export interface GeographicPilotStudy {
  id: 'pampore-karewa' | 'wular-wetland' | 'srinagar-urban';
  title: string;
  subtitle: string;
  district: string;
  coordinates: { lat: number; lng: number };
  boundingBox: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
  keyEcosystemService: string;
  primaryTransformationDriver: string;
  timeSeriesMetrics: {
    year: number;
    primaryClassHectares: number;
    primaryClassLabel: string;
    transformedHectares: number;
    transformedLabel: string;
    canopyOrVegetationCoverPct: number;
    imperviousOrExcavatedPct: number;
  }[];
  dossierSummary: string;
  permanentEvidenceDossierId: string;
  availableLayers: {
    year: number;
    sensor: string;
    productType: string;
    cloudCoverPct: number;
    acquisitionDate: string;
  }[];
}

export interface ChangeDetectionAlert {
  alertId: string;
  title: string;
  category: DetectionCategory;
  tier: AlertTier;
  status: AlertStatus;
  pilotRegionId?: 'pampore-karewa' | 'wular-wetland' | 'srinagar-urban';
  locationName: string;
  district: string;
  coordinates: { lat: number; lng: number };
  affectedAreaHectares: number;
  confidenceScorePct: number;
  uncertaintyMargin: string;
  detectionDate: string;
  beforeAcquisitionDate: string;
  afterAcquisitionDate: string;
  satelliteSensor: string;
  datasetIdentifier: string;
  detectionMethodology: string;
  candidateChangeDescription: string;
  scientificReviewNotes?: string;
  leadScientistReviewer?: string;
  verifiedFindingSummary?: string;
  rejectionOrCorrectionReason?: string;
  permanentDossierRef: string;
  crossModuleImpacts: { moduleName: string; route: string; description: string }[];
  isSensitiveJurisdiction: boolean;
}

// -------------------------------------------------------------
// 1. PRIORITY DETECTION CAPABILITIES (8 Core Observables)
// -------------------------------------------------------------

export const PRIORITY_DETECTION_CAPABILITIES: PriorityDetectionCapability[] = [
  {
    id: 'forest_loss',
    name: 'Forest Cover Loss & Fragmentation',
    primaryOutputs: 'Hectares changed, disturbance dates, confidence score, forest patch severance index, canopy height changes',
    sensorConstellation: 'Sentinel-2 (10m) + Landsat Collection 2 + GEDI LiDAR',
    spectralIndices: ['NDVI (Veg Index)', 'NBR (Burn Ratio)', 'NDII (Infrared Index)', 'EVI'],
    cadenceDescription: 'Bi-weekly automated anomaly scoring (cloud-masked composite)',
    uncertaintyMitigation: 'Distinguish deciduous phenological autumn leaf shedding from true canopy loss using 3-year harmonic seasonal models.',
    environmentalContext: 'Critical for Pir Panjal wildlife corridors and Dachigam buffer temperate conifer stands.'
  },
  {
    id: 'wetland_encroachment',
    name: 'Wetland Encroachment & Shoreline Infilling',
    primaryOutputs: 'Boundary shift polygons, lost open-water area, earth-fill backfill footprint, proximity to Ramsar statutory boundary',
    sensorConstellation: 'Sentinel-1 C-SAR (Radar Coherence) + Sentinel-2 MSI + PlanetScope 3m',
    spectralIndices: ['MNDWI (Modified Water Index)', 'AWEInsh (Automated Water Extent)', 'SAR Backscatter Amplitude (VV/VH)'],
    cadenceDescription: 'Weekly radar penetration audits unaffected by cloud cover',
    uncertaintyMitigation: 'Account for intra-annual lake expansion/contraction between post-snowmelt high pool (May) and autumn low pool (October).',
    environmentalContext: 'Guards Ramsar Site No. 461 (Wular Lake) and Ramsar Site No. 1570 (Hokersar Wetland).'
  },
  {
    id: 'paddy_conversion',
    name: 'Paddy-Land & Saffron Conversion',
    primaryOutputs: 'Agricultural-to-built-up polygons, agricultural-to-orchard conversion rate, topsoil removal scars',
    sensorConstellation: 'Sentinel-2 (Red Edge Bands B5/B6/B7) + PlanetScope 3m Cadastral Overlay',
    spectralIndices: ['NDRE (Red Edge Index)', 'NDBI (Built-up Index)', 'SAVI (Soil-Adjusted Veg)'],
    cadenceDescription: 'Monthly crop phenology cycle audits aligned with Kharif planting & harvest',
    uncertaintyMitigation: 'Screen out post-paddy harvest fallow fields from false built-up classification using multi-temporal thermal persistence.',
    environmentalContext: 'Directly tracks loss of Kashmir’s 120,620 ha paddy heritage and Table 4.17 food security baselines.'
  },
  {
    id: 'mining_quarrying',
    name: 'Mining & Quarrying Excavation',
    primaryOutputs: 'Newly disturbed bedrock terrain, mechanical riverbed gravel dredging reaches, active quarry perimeter displacement',
    sensorConstellation: 'PlanetScope (3m) + Sentinel-1 InSAR Elevation Models + Copernicus DEM',
    spectralIndices: ['BSI (Bare Soil Index)', 'SAR Phase Coherence Loss', 'Thermal Thermal Radiance'],
    cadenceDescription: 'Bi-weekly dry-season river corridor surveys & monthly rockface audits',
    uncertaintyMitigation: 'Differentiate permissible seasonal riverbed silt dredging from illegal deep incision beyond 1.0m statutory limits.',
    environmentalContext: 'Protects Doodhganga, Rambiara, and Sukhnag cold-water fish spawning gravel beds.'
  },
  {
    id: 'urban_development',
    name: 'Urban Development & Impervious Sealing',
    primaryOutputs: 'New built structures, concrete and asphalt surface expansion, loss of municipal green spaces, Urban Heat Island escalation',
    sensorConstellation: 'Landsat-9 TIRS (Thermal) + Sentinel-2 10m + Nighttime VIIRS',
    spectralIndices: ['NDBI (Built-Up Index)', 'LST (Land Surface Temperature)', 'UI (Urban Index)'],
    cadenceDescription: 'Monthly urban growth audits & seasonal thermal anomaly composites',
    uncertaintyMitigation: 'Correct for seasonal soil moisture variances affecting bare soil vs concrete spectral reflectance.',
    environmentalContext: 'Monitors Srinagar Metropolitan Master Plan 2035 growth corridors and downtown heat stress.'
  },
  {
    id: 'river_lake_change',
    name: 'River & Lake Morphological Change',
    primaryOutputs: 'Shoreline displacement, delta progradation, seasonal water extent anomalies, suspended sediment turbidity plume index',
    sensorConstellation: 'Sentinel-2 MSI + Landsat-8/9 OLI',
    spectralIndices: ['NDTI (Turbidity Index)', 'MNDWI', 'SPM (Suspended Particulate Model)'],
    cadenceDescription: '10-day orbital pass monitoring of major lakes & Jhelum main stem',
    uncertaintyMitigation: 'Calibrate against I&FC river stage discharge telemetry stations to prevent mistaking low-flow sandbars for permanent geomorphic change.',
    environmentalContext: 'Tracks sediment influx choking Dal Lake, Manasbal, and Jhelum flood spill channels.'
  },
  {
    id: 'infrastructure_expansion',
    name: 'Linear Infrastructure & Construction Spoils',
    primaryOutputs: 'Highway widening cuts, railway track corridors, muck disposal terraces, high-voltage transmission right-of-way bisections',
    sensorConstellation: 'Sentinel-1 InSAR (Deformation) + Sentinel-2 + PlanetScope 3m',
    spectralIndices: ['BSI', 'InSAR Millimeter LOS Velocity Field', 'RGB Orthomosaics'],
    cadenceDescription: 'Monthly slope deformation processing with millimeter accuracy',
    uncertaintyMitigation: 'Differentiate planned, engineered terracing from uncontained, erosive downhill muck dumping.',
    environmentalContext: 'Monitors NH-44 Banihal-Ramban cuts, USBRL railway tunnels, and Zojila approach terraces.'
  },
  {
    id: 'alpine_change',
    name: 'Alpine Ecotone & Cryosphere Shifts',
    primaryOutputs: 'Sub-alpine birch upward treeline shift, snow-covered area (SCA) deficit, glacial lake expansion, exposed deglaciated moraines',
    sensorConstellation: 'MODIS Terra/Aqua SCA + Sentinel-2 SWIR + Sentinel-3 SLSTR',
    spectralIndices: ['NDSI (Snow Index)', 'Ecotone Green-Up Anomaly', 'Glacial Lake Extent'],
    cadenceDescription: '5-day snowpack coverage & seasonal alpine pasture phenology',
    uncertaintyMitigation: 'Account for variable seasonal cloud shadows and steep mountain ridge illumination geometry.',
    environmentalContext: 'Assesses high-altitude biodiversity reservoirs and Kolahoi/Thajwas glacial recession.'
  }
];

// -------------------------------------------------------------
// 2. THE COMPLETE 8-STEP PROCESSING WORKFLOW
// -------------------------------------------------------------

export const PROCESSING_WORKFLOW_STEPS: ProcessingWorkflowStep[] = [
  {
    stepNumber: 1,
    stageName: 'Satellite Acquisition',
    objective: 'Continuous ingestion of raw spaceborne imagery across Copernicus, Landsat, and commercial constellations.',
    technicalProcedure: 'Automated API harvesting via ESA Copernicus Open Access Hub, USGS EarthExplorer M2M API, and Planet API. Query parameters target cloud cover <20% across Kashmir Valley tiles.',
    scientificSafeguard: 'Zero ingestion of un-orthorectified imagery; all products must meet Level-1C/Level-2A standard geometric processing.',
    inputsAndFeeds: ['Sentinel-2 L2A BOA Reflectance', 'Sentinel-1 SLC/GRD', 'Landsat Collection 2 Tier-1 Surface Reflectance'],
    outputArtifact: 'Standardized GeoTIFF raster scenes cataloged with unique mission acquisition IDs.'
  },
  {
    stepNumber: 2,
    stageName: 'Preprocessing & Atmospheric Correction',
    objective: 'Normalize spectral reflectance across atmospheric turbidity, terrain shadows, and seasonal sun angle variations.',
    technicalProcedure: 'Execution of sen2cor atmospheric correction, Fmask 4.0 cloud/shadow screening, and topographic illumination normalization using Copernicus 30m DEM.',
    scientificSafeguard: 'Exclusion of false candidate signals caused by cirrus cloud fringes, cloud shadows, or sensor saturation over snow.',
    inputsAndFeeds: ['Sen2Cor 2.10 Engine', 'Copernicus 30m Digital Elevation Model', 'MODIS Aerosol Optical Depth (AOD)'],
    outputArtifact: 'Atmospherically and topographically corrected Surface Reflectance (SR) calibrated raster cubes.'
  },
  {
    stepNumber: 3,
    stageName: 'Baseline Construction',
    objective: 'Generate a stable, multi-temporal reference baseline representing normal seasonal conditions.',
    technicalProcedure: 'Construct 3-year median and 90th percentile spectral reflectance composites for corresponding phenological windows (e.g. Peak Summer July-August; Dormant Winter December-January).',
    scientificSafeguard: 'Prevents single-year climate anomalies (e.g. severe drought year or record snowfall) from skewing long-term change metrics.',
    inputsAndFeeds: ['Landsat 40-year multi-decadal series (1982–2022)', 'Sentinel-2 5-year rolling baseline (2020–2025)'],
    outputArtifact: 'Normalized multi-band seasonal baseline rasters with inter-quartile variance bounds.'
  },
  {
    stepNumber: 4,
    stageName: 'Change Detection & Anomaly Scoring',
    objective: 'Identify candidate spatial disturbances using spectral difference, change vector analysis (CVA), and radar coherence degradation.',
    technicalProcedure: 'Calculate delta indices (ΔNDVI, ΔNDBI, ΔMNDWI, ΔInSAR Coherence). Apply Otsu adaptive thresholding and Random Forest multi-class change classifiers to extract candidate disturbance polygons.',
    scientificSafeguard: 'Classification threshold requires continuous anomaly persistence across minimum 2 consecutive cloud-free passes to reject transient events.',
    inputsAndFeeds: ['Multi-Spectral Difference Algorithms', 'Continuous Change Detection & Classification (CCDC)', 'SAR Phase Coherence Delta'],
    outputArtifact: 'Candidate Change Vector Polygons with initial spectral anomaly score (0–100).'
  },
  {
    stepNumber: 5,
    stageName: 'Spatial Quantification & Environmental Contextualization',
    objective: 'Compute precise geometric properties and spatial intersection with sensitive environmental receptors.',
    technicalProcedure: 'Vector polygon smoothing, topological cleaning, and geodesic area calculation (hectares). PostGIS spatial joins against Protected Area boundaries, Ramsar wetland buffers, Karewa strata, and Master Plan zoning.',
    scientificSafeguard: 'Rigorous calculation of 95% confidence margin based on sensor spatial resolution (e.g. ±0.12 ha for Sentinel-2 10m grid).',
    inputsAndFeeds: ['PostGIS Spatial Engine', 'J&K Forest Division Cadastral Boundaries', 'Ramsar Statutory Wetland Buffer Polygons'],
    outputArtifact: 'Quantified spatial feature records with distance-to-protected-receptor attributes and confidence margins.'
  },
  {
    stepNumber: 6,
    stageName: 'Cross-Module Intelligence Linking',
    objective: 'Disseminate detected candidate changes to relevant Kashmir EcoWatch analytical modules.',
    technicalProcedure: 'Automated webhook dispatch pushing candidate vectors into Sectoral EIA (Agriculture, Horticulture, Tourism, Handicrafts), Water Systems, and Hazard Intelligence registries.',
    scientificSafeguard: 'Strict separation of candidate anomaly signals from proven violations. All inbound alerts tagged as "Candidate Observation Pending Peer Review".',
    inputsAndFeeds: ['Kashmir EcoWatch Event Bus API', 'Sectoral EIA Engine Bridge', 'Alert Registry Ingestion Pipeline'],
    outputArtifact: 'Inter-module change signals linked to respective thematic dashboards.'
  },
  {
    stepNumber: 7,
    stageName: 'Scientific Verification & Peer Review',
    objective: 'Rigorous evidence evaluation by domain specialists before public elevation to Verified Finding.',
    technicalProcedure: 'Peer evaluation workflow: High-resolution PlanetScope 3m cross-checking, statutory revenue record cross-examination (Khasra numbers), drone orthomosaics, and volunteer ground-truth observation logs.',
    scientificSafeguard: 'Mandatory two-analyst sign-off. If anomaly is confirmed as normal seasonal agriculture or permitted works, alert is classified as "Rejected / Corrected" with published rationale.',
    inputsAndFeeds: ['PlanetScope 3m Monthly Cadastral Basemaps', 'State Revenue Cadastral Maps', 'Field Observation Mobile Submissions'],
    outputArtifact: 'Peer-reviewed Verification Dossier with scientist digital signatures and confidence classification.'
  },
  {
    stepNumber: 8,
    stageName: 'Publication, Public Alerts & Remediation Tracking',
    objective: 'Publish findings on Kashmir EcoWatch open portal, dispatch formal alerts, and track ecological mitigation.',
    technicalProcedure: 'Assignment of permanent UUID and DOI-style evidence identifier. Publication in Change Detection Atlas, automated alert distribution to registered researchers, and longitudinal satellite monitoring of restoration.',
    scientificSafeguard: 'No personal accusations or unadjudicated legal liabilities published; reports describe physical landscape transformations and statutory zoning intersections only.',
    inputsAndFeeds: ['Public Alert Dispatch Engine', 'Restoration & Mitigation Tracker API', 'Permanent Evidence Dossier Archive'],
    outputArtifact: 'Permanent Public Scientific Finding with interactive time-lapse map and downloadable GeoJSON.'
  }
];

// -------------------------------------------------------------
// 3. THE FIRST THREE GEOGRAPHIC PILOT STUDIES
// -------------------------------------------------------------

export const GEOGRAPHIC_PILOT_STUDIES: GeographicPilotStudy[] = [
  {
    id: 'pampore-karewa',
    title: 'Pampore Karewa Land Transformation Pilot',
    subtitle: 'Saffron (Crocus sativus) Soils, Clay Excavation & Highway Commercial Encroachment',
    district: 'Pulwama',
    coordinates: { lat: 34.0214, lng: 74.9288 },
    boundingBox: [74.885, 33.985, 74.965, 34.055],
    keyEcosystemService: 'World-renowned GI-tagged Kashmir Saffron cultivation on quaternary lacustrine silt-clay terraces and recharge aquifers.',
    primaryTransformationDriver: 'Topsoil mining for railway/highway embankments, brick kiln clay extraction, and ribbon commercial sprawl along NH-44.',
    timeSeriesMetrics: [
      {
        year: 2015,
        primaryClassHectares: 4820,
        primaryClassLabel: 'Active Saffron Cultivation',
        transformedHectares: 410,
        transformedLabel: 'Excavation & Built-Up Footprint',
        canopyOrVegetationCoverPct: 84.5,
        imperviousOrExcavatedPct: 8.5
      },
      {
        year: 2020,
        primaryClassHectares: 4150,
        primaryClassLabel: 'Active Saffron Cultivation',
        transformedHectares: 890,
        transformedLabel: 'Excavation & Built-Up Footprint',
        canopyOrVegetationCoverPct: 76.2,
        imperviousOrExcavatedPct: 18.4
      },
      {
        year: 2026,
        primaryClassHectares: 3640,
        primaryClassLabel: 'Active Saffron Cultivation',
        transformedHectares: 1480,
        transformedLabel: 'Excavation & Built-Up Footprint',
        canopyOrVegetationCoverPct: 67.8,
        imperviousOrExcavatedPct: 30.6
      }
    ],
    dossierSummary: 'Detailed 11-year multi-sensor satellite audit comparing 2015, 2020, and 2026. Documents a net loss of 1,180 hectares (-24.5%) of prime saffron soils across Pampore, Konibal, and Ladhoo plateaus, driven by 34 active brick kiln clusters and national highway expansion fill.',
    permanentEvidenceDossierId: 'DOSSIER-2026-PKLT-01',
    availableLayers: [
      { year: 2015, sensor: 'Landsat-8 OLI (30m)', productType: 'Level-2 Surface Reflectance', cloudCoverPct: 2.1, acquisitionDate: '2015-09-18' },
      { year: 2020, sensor: 'Sentinel-2A MSI (10m)', productType: 'Level-2A Bottom-Of-Atmosphere', cloudCoverPct: 0.8, acquisitionDate: '2020-09-22' },
      { year: 2026, sensor: 'Sentinel-2B + PlanetScope (3m)', productType: 'Harmonized 3m Multi-Spectral Composite', cloudCoverPct: 0.4, acquisitionDate: '2026-09-14' }
    ]
  },
  {
    id: 'wular-wetland',
    title: 'Wular Wetland Landscape Change Pilot',
    subtitle: 'Ramsar Site No. 461 Open-Water Contraction, Siltation & Sedge Marsh Invasions',
    district: 'Bandipora / Baramulla',
    coordinates: { lat: 34.3418, lng: 74.5714 },
    boundingBox: [74.450, 34.250, 74.680, 34.420],
    keyEcosystemService: 'Largest freshwater lake in the Western Himalayas; vital regional hydraulic sponge absorbing Jhelum flood surges; critical migratory waterfowl flyway.',
    primaryTransformationDriver: 'Massive catchment silt yields from deforested Erin and Madhumati watersheds, historical government willow (Salix) plantations, and agricultural bund encroachments.',
    timeSeriesMetrics: [
      {
        year: 2015,
        primaryClassHectares: 5480,
        primaryClassLabel: 'Permanent Open Water Pool',
        transformedHectares: 3820,
        transformedLabel: 'Willow Plantation & Marsh Silt Flats',
        canopyOrVegetationCoverPct: 41.2,
        imperviousOrExcavatedPct: 3.2
      },
      {
        year: 2020,
        primaryClassHectares: 4920,
        primaryClassLabel: 'Permanent Open Water Pool',
        transformedHectares: 4410,
        transformedLabel: 'Willow Plantation & Marsh Silt Flats',
        canopyOrVegetationCoverPct: 47.8,
        imperviousOrExcavatedPct: 4.5
      },
      {
        year: 2026,
        primaryClassHectares: 4350,
        primaryClassLabel: 'Permanent Open Water Pool',
        transformedHectares: 5120,
        transformedLabel: 'Willow Plantation & Marsh Silt Flats',
        canopyOrVegetationCoverPct: 54.1,
        imperviousOrExcavatedPct: 5.8
      }
    ],
    dossierSummary: 'Satellite radar and optical time-series tracking open-water shrinkage of 1,130 hectares (-20.6%) between 2015 and 2026. Quantifies the dense siltation delta advancing into the eastern littoral zone and audits the partial recovery achieved through WUCMA willow removal works.',
    permanentEvidenceDossierId: 'DOSSIER-2026-WWLC-02',
    availableLayers: [
      { year: 2015, sensor: 'Landsat-8 OLI (30m)', productType: 'Level-2 Surface Reflectance', cloudCoverPct: 1.4, acquisitionDate: '2015-05-12' },
      { year: 2020, sensor: 'Sentinel-2A MSI + Sentinel-1 SAR', productType: 'Harmonized Optical-Radar Water Mask', cloudCoverPct: 0.9, acquisitionDate: '2020-05-18' },
      { year: 2026, sensor: 'Sentinel-2B MSI + Sentinel-1 C-SAR', productType: 'High-Resolution 10m Hydro-Period Model', cloudCoverPct: 0.2, acquisitionDate: '2026-05-15' }
    ]
  },
  {
    id: 'srinagar-urban',
    title: 'Srinagar Urban Expansion & Wetland Infill Pilot',
    subtitle: 'Impervious Soil Sealing, Urban Heat Islands & Flood-Basin Encroachment',
    district: 'Srinagar / Budgam',
    coordinates: { lat: 34.0837, lng: 74.7973 },
    boundingBox: [74.680, 33.980, 74.920, 34.180],
    keyEcosystemService: 'Historic natural flood retention sponges (Hokersar, Bemina, Mir Behri) protecting 1.4 million residents from catastrophic riverine and flash flooding.',
    primaryTransformationDriver: 'Rapid un-zoned settlement expansion, commercial earth-filling of flood basins, and high-density GI-tin roof coverage escalating urban microclimate heat.',
    timeSeriesMetrics: [
      {
        year: 2015,
        primaryClassHectares: 28400,
        primaryClassLabel: 'Total Urban Built-Up Area',
        transformedHectares: 3240,
        transformedLabel: 'Wetland & Agro-Green Space Lost',
        canopyOrVegetationCoverPct: 38.4,
        imperviousOrExcavatedPct: 48.2
      },
      {
        year: 2020,
        primaryClassHectares: 33200,
        primaryClassLabel: 'Total Urban Built-Up Area',
        transformedHectares: 4980,
        transformedLabel: 'Wetland & Agro-Green Space Lost',
        canopyOrVegetationCoverPct: 31.8,
        imperviousOrExcavatedPct: 58.5
      },
      {
        year: 2026,
        primaryClassHectares: 38200,
        primaryClassLabel: 'Total Urban Built-Up Area',
        transformedHectares: 7120,
        transformedLabel: 'Wetland & Agro-Green Space Lost',
        canopyOrVegetationCoverPct: 24.6,
        imperviousOrExcavatedPct: 69.4
      }
    ],
    dossierSummary: 'Comprehensive remote sensing audit of Greater Srinagar revealing a +34.5% built-up expansion since 2015. Confirms severe soil sealing in the city core (>70% imperviousness) and maps an empirical +3.8°C Urban Heat Island anomaly relative to peri-urban agriculture.',
    permanentEvidenceDossierId: 'DOSSIER-2026-SUE-03',
    availableLayers: [
      { year: 2015, sensor: 'Landsat-8 TIRS + OLI', productType: 'LST & 30m NDBI Composite', cloudCoverPct: 0.5, acquisitionDate: '2015-07-28' },
      { year: 2020, sensor: 'Sentinel-2A + Landsat-8', productType: '10m Built-Up Fraction & Thermal Index', cloudCoverPct: 0.3, acquisitionDate: '2020-07-31' },
      { year: 2026, sensor: 'Sentinel-2B + Landsat-9 TIRS', productType: 'Calibrated Urban Heat & Impervious Atlas', cloudCoverPct: 0.1, acquisitionDate: '2026-07-25' }
    ]
  }
];

// -------------------------------------------------------------
// 4. TWO-TIER CHANGE DETECTION ALERTS & VERIFICATION QUEUE
// -------------------------------------------------------------

export const SATELLITE_CHANGE_ALERTS: ChangeDetectionAlert[] = [
  {
    alertId: 'KEW-SCDO-2026-084',
    title: 'Candidate Saffron Soil Excavation & Brick Trenching',
    category: 'paddy_conversion',
    tier: 'Tier 2: Scientifically Verified Finding',
    status: 'Verified',
    pilotRegionId: 'pampore-karewa',
    locationName: 'Konibal-Lethpora Plateau Terrace',
    district: 'Pulwama',
    coordinates: { lat: 34.0142, lng: 74.9451 },
    affectedAreaHectares: 18.4,
    confidenceScorePct: 94,
    uncertaintyMargin: '±0.28 ha (95% CI)',
    detectionDate: '2026-04-12',
    beforeAcquisitionDate: '2025-10-15',
    afterAcquisitionDate: '2026-04-08',
    satelliteSensor: 'Sentinel-2B MSI (10m) + PlanetScope (3m)',
    datasetIdentifier: 'S2B_MSIL2A_20260408T053649_N0512_R062_T43SCT',
    detectionMethodology: 'BSI (Bare Soil Index) elevation differential & red-edge phenology collapse cross-matched with PlanetScope 3m cadastral imagery.',
    candidateChangeDescription: 'Significant spectral transition from active saffron corm bed vegetation to deep mechanical soil excavation trenches and brick-curing storage stacks.',
    scientificReviewNotes: 'Peer review completed by Western Himalayan Agro-Systems Group. Satellite evidence cross-referenced with Revenue Department Khasra Nos. 412–438. Verified that excavation exceeds agricultural leveling and represents industrial brick-earth extraction.',
    leadScientistReviewer: 'Dr. M. A. Lone (Himalayan Soil Systems Research)',
    verifiedFindingSummary: 'Permanent loss of 18.4 hectares of Pleistocene lacustrine saffron soils. Excavated depth measures 2.2 to 3.1 meters. Soil profile organic carbon depleted irreversibly.',
    permanentDossierRef: 'DOSSIER-2026-PKLT-01#konibal-sec4',
    crossModuleImpacts: [
      { moduleName: 'Sectoral EIA (Agriculture)', route: '/sectoral-eia/sectors/agriculture', description: 'Reduces saffron agricultural base and exacerbates agricultural land conversion.' },
      { moduleName: 'Land Use & Earth Systems', route: '/earth-human-impact/land-earth-systems', description: 'Destroys Quaternary Karewa plateau geomorphology.' }
    ],
    isSensitiveJurisdiction: false
  },
  {
    alertId: 'KEW-SCDO-2026-091',
    title: 'Candidate Earth-Filling & Earthen Bund along Northern Marsh Margin',
    category: 'wetland_encroachment',
    tier: 'Tier 2: Scientifically Verified Finding',
    status: 'Verified',
    pilotRegionId: 'wular-wetland',
    locationName: 'Lankrishipora Littoral Silt Margin',
    district: 'Bandipora',
    coordinates: { lat: 34.3821, lng: 74.5218 },
    affectedAreaHectares: 14.2,
    confidenceScorePct: 91,
    uncertaintyMargin: '±0.22 ha (95% CI)',
    detectionDate: '2026-05-02',
    beforeAcquisitionDate: '2025-06-20',
    afterAcquisitionDate: '2026-04-28',
    satelliteSensor: 'Sentinel-1 C-SAR (Coherence) + Sentinel-2A MSI',
    datasetIdentifier: 'S1A_IW_SLC__1SDV_20260428T004218_053812_06821F_C781',
    detectionMethodology: 'Sentinel-1 SAR coherence surge combined with MNDWI open-water threshold elimination across dry-season wetland buffer.',
    candidateChangeDescription: 'Replacement of seasonal hydro-period sedge wetland with compacted dry mineral fill material and a 420-meter linear earthen containment bund.',
    scientificReviewNotes: 'Dual-sensor validation confirmed bund structure is artificial and inside the Ramsar Site No. 461 statutory boundary. Field team recorded dumping of construction waste and localized willow sapling plantation.',
    leadScientistReviewer: 'Er. S. Z. Qadri (Wetland Hydrogeology Oversight)',
    verifiedFindingSummary: 'Permanent loss of 14.2 ha seasonal flood-absorption littoral wetland. Severed hydrological exchange with main Wular lake basin.',
    permanentDossierRef: 'DOSSIER-2026-WWLC-02#lankrishipora-bnd',
    crossModuleImpacts: [
      { moduleName: 'Water Systems (Wetlands)', route: '/water-systems/wetlands', description: 'Encroaches on Ramsar buffer and accelerates littoral terrestrialization.' },
      { moduleName: 'Hazard Intelligence (Floods)', route: '/hazard-intelligence/floods', description: 'Restricts Wular flood-retention absorption volume.' }
    ],
    isSensitiveJurisdiction: false
  },
  {
    alertId: 'KEW-SCDO-2026-103',
    title: 'Candidate Dense Coniferous Canopy Thinning on Pir Panjal Ridge',
    category: 'forest_loss',
    tier: 'Tier 1: Preliminary Alert',
    status: 'Under Scientific Review',
    locationName: 'Kandi Forest Block, Pir Panjal Scarp',
    district: 'Budgam',
    coordinates: { lat: 33.8841, lng: 74.6215 },
    affectedAreaHectares: 9.8,
    confidenceScorePct: 82,
    uncertaintyMargin: '±0.45 ha (95% CI)',
    detectionDate: '2026-05-18',
    beforeAcquisitionDate: '2025-08-14',
    afterAcquisitionDate: '2026-05-12',
    satelliteSensor: 'Sentinel-2A MSI (10m)',
    datasetIdentifier: 'S2A_MSIL2A_20260512T053701_N0512_R062_T43SCT',
    detectionMethodology: 'Multi-temporal NDVI anomaly (-0.31 delta) persisting across 2 consecutive passes with normalized burn ratio check.',
    candidateChangeDescription: 'Observed reduction in dense temperate coniferous crown closure (Cedrus deodara and Pinus wallichiana) across steep 32° slope.',
    scientificReviewNotes: 'Currently undergoing peer review. Screening against localized winter avalanches or windthrow vs illicit tree lopping. Awaiting ground division confirmation.',
    permanentDossierRef: 'DOSSIER-2026-PPF-08',
    crossModuleImpacts: [
      { moduleName: 'Forest & Landscape', route: '/earth-human-impact/forests-landscapes', description: 'Potential patch fragmentation in critical wildlife corridor.' },
      { moduleName: 'Hazard Intelligence (Landslides)', route: '/hazard-intelligence/landslides', description: 'Steep slope canopy removal heightens debris flow vulnerability.' }
    ],
    isSensitiveJurisdiction: false
  },
  {
    alertId: 'KEW-SCDO-2026-112',
    title: 'Candidate Riverbed Gravel Extraction Expansion Beyond Leased Datum',
    category: 'mining_quarrying',
    tier: 'Tier 1: Preliminary Alert',
    status: 'Preliminary',
    locationName: 'Rambiara Stream Upper Reach',
    district: 'Shopian',
    coordinates: { lat: 33.7142, lng: 74.8211 },
    affectedAreaHectares: 6.4,
    confidenceScorePct: 79,
    uncertaintyMargin: '±0.35 ha (95% CI)',
    detectionDate: '2026-05-24',
    beforeAcquisitionDate: '2026-03-10',
    afterAcquisitionDate: '2026-05-20',
    satelliteSensor: 'PlanetScope (3m) + Sentinel-2B',
    datasetIdentifier: 'PS_3M_ORTHO_20260520_SHOPIAN_RAMBIARA_01',
    detectionMethodology: 'High-resolution multi-spectral tracking of active hydraulic excavator wheel tracks and dry braided channel gravel removal.',
    candidateChangeDescription: 'Mechanical gravel extraction signatures detected outside permitted quarry lease coordinates. Depth displacement visible along channel bed.',
    scientificReviewNotes: 'Preliminary candidate change. Automatic quality screens passed. Formal notice dispatched to scientific review queue for cross-checking against Directorate of Geology & Mining e-challan boundaries.',
    permanentDossierRef: 'DOSSIER-2026-MR-RAMB-04',
    crossModuleImpacts: [
      { moduleName: 'Mining & Extraction', route: '/earth-human-impact/mining-extraction', description: 'Potential over-extraction and riverbed incision beyond statutory depth limits.' },
      { moduleName: 'Water Systems (Fisheries)', route: '/water-systems/fisheries', description: 'High risk to native Schizothorax trout breeding gravel beds.' }
    ],
    isSensitiveJurisdiction: false
  },
  {
    alertId: 'KEW-SCDO-2026-072',
    title: 'Apparent Winter Vegetation Browning Misclassified as Canopy Clearing',
    category: 'forest_loss',
    tier: 'Tier 1: Preliminary Alert',
    status: 'Rejected / Corrected',
    locationName: 'Pahalgam Higher Pine Transition',
    district: 'Anantnag',
    coordinates: { lat: 34.0321, lng: 75.3142 },
    affectedAreaHectares: 12.1,
    confidenceScorePct: 48,
    uncertaintyMargin: '±0.85 ha (95% CI)',
    detectionDate: '2026-02-14',
    beforeAcquisitionDate: '2025-09-02',
    afterAcquisitionDate: '2026-02-10',
    satelliteSensor: 'Sentinel-2A MSI (10m)',
    datasetIdentifier: 'S2A_MSIL2A_20260210T053811_N0512_R062_T43SDT',
    detectionMethodology: 'Standard automated NDVI drop flagged candidate disturbance.',
    candidateChangeDescription: 'Initial automated spectral screening detected significant drop in greenness on north-facing ridge.',
    scientificReviewNotes: 'ALERT REJECTED UPON REVIEW: Spectral drop was caused by deep winter terrain shadow combined with dense rime ice coating coniferous needles, depressing red-edge reflectance. Follow-up spring pass (May 2026) confirmed 100% canopy health and zero timber extraction.',
    leadScientistReviewer: 'Dr. T. H. Banday (Remote Sensing Verification Specialist)',
    rejectionOrCorrectionReason: 'Phenological and terrain shadow false positive. No forest clearing occurred. Archived in audit queue to maintain permanent methodological transparency.',
    permanentDossierRef: 'AUDIT-LOG-2026-REJ-072',
    crossModuleImpacts: [],
    isSensitiveJurisdiction: false
  }
];

// -------------------------------------------------------------
// 5. AUTOMATED SCIENTIFIC NOTIFICATION PROTOCOL
// -------------------------------------------------------------

export interface NotificationProtocolRule {
  triggerTier: AlertTier;
  confidenceThresholdPct: number;
  recipientGroup: string;
  dispatchChannel: string;
  publicVisibilityLevel: 'Public with Explicit Uncertainty' | 'Restricted to Review Queue' | 'Fully Published Scientific Finding';
  proceduralSafeguard: string;
}

export const NOTIFICATION_PROTOCOL_RULES: NotificationProtocolRule[] = [
  {
    triggerTier: 'Tier 1: Preliminary Alert',
    confidenceThresholdPct: 75,
    recipientGroup: 'Registered Scientific Peer Reviewers & Departmental Nodal Officers',
    dispatchChannel: 'Confidential Technical Alert (Secure Webhook & Encrypted Email)',
    publicVisibilityLevel: 'Public with Explicit Uncertainty',
    proceduralSafeguard: 'Alert explicitly tagged as "Preliminary Candidate Change — Not Adjudicated". No individual or corporate names published. Focuses exclusively on physical raster footprint.'
  },
  {
    triggerTier: 'Tier 2: Scientifically Verified Finding',
    confidenceThresholdPct: 90,
    recipientGroup: 'General Public, Environmental Law Cells, News Media, Regulatory Agencies (JKPCC, MoEFCC, NGT)',
    dispatchChannel: 'Public Alert Feed, Open API Stream & Formal Evidence Dossier Publication',
    publicVisibilityLevel: 'Fully Published Scientific Finding',
    proceduralSafeguard: 'Requires two independent scientist digital signatures, high-resolution sensor cross-check, and ground verification notes.'
  }
];
