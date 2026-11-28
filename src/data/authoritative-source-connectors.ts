/**
 * KASHMIR ECOWATCH — AUTHORITATIVE EXTERNAL DATA SOURCE CONNECTOR REGISTRY
 *
 * Documents every external scientific API, catalog, and statutory archive referenced
 * across KEW with honest operational status (Operational Live, Tested Archival,
 * Available Not Yet Wired, or Manual Statutory Publication — No Public API).
 */

import type { ScientificProvenanceClass } from '@/lib/scientific-integrity/quarantine-gateway';

export type ConnectorOperationalStatus =
  | 'operational_live'
  | 'operational_editorial_discovery'
  | 'archival_scene_or_static_table'
  | 'available_not_yet_wired'
  | 'no_public_realtime_api_manual_statutory';

export interface AuthoritativeSourceConnector {
  connectorId: string;
  providerName: string;
  systemOrProduct: string;
  domain: string;
  endpointOrPortalUrl: string;
  authRequirement: 'None (Public Open API)' | 'Free API Key Required' | 'Institutional MoU / Restricted' | 'Static Published PDF/Atlas';
  operationalStatus: ConnectorOperationalStatus;
  provenanceClass: ScientificProvenanceClass;
  spatialCoverage: string;
  spatialResolution: string;
  temporalCadence: string;
  kewConsumingRoutes: string[];
  rateLimitAndCaching: string;
  licenseTerms: string;
  knownLimitations: string;
}

export const AUTHORITATIVE_SOURCE_CONNECTORS: AuthoritativeSourceConnector[] = [
  {
    connectorId: 'CONN-OPENMETEO-NWP',
    providerName: 'Open-Meteo (ECMWF IFS / NOAA GFS / GEFS)',
    systemOrProduct: 'Forecast, Pressure-Level Synoptic & 31-Member Ensemble API',
    domain: 'Meteorology & Multi-Hazard Triggers',
    endpointOrPortalUrl: 'https://api.open-meteo.com/v1/forecast',
    authRequirement: 'None (Public Open API)',
    operationalStatus: 'operational_live',
    provenanceClass: 'gridded_reanalysis_nwp',
    spatialCoverage: 'All 5 Western Himalayan Subregions',
    spatialResolution: '9 km (ECMWF IFS) to 25 km (GEFS Ensemble)',
    temporalCadence: '1–3 hourly',
    kewConsumingRoutes: [
      '/api/hazard-intelligence/western-disturbances',
      '/api/hazard-intelligence/jet-stream-circulation',
      '/api/hazard-intelligence/monsoon-dynamics',
      '/api/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts',
      '/api/hazard-intelligence/landslides',
      '/api/hazard-intelligence/flash-floods',
      '/api/hazard-intelligence/avalanches',
      '/api/hazard-intelligence/glofs',
      '/api/hazard-intelligence/forest-fires',
      '/api/alerts/live',
    ],
    rateLimitAndCaching: '15–30 min server ISR/in-memory cache + 60s ?refresh=1 cooldown guard',
    licenseTerms: 'CC BY 4.0 (Open-Meteo Non-Commercial Tier)',
    knownLimitations: 'Gridded NWP model output, NOT physical IMD AWS or SASE snow-pillow telemetry; smooths <2 km convective cloudburst cells.',
  },
  {
    connectorId: 'CONN-OPENMETEO-CAMS',
    providerName: 'Copernicus Atmosphere Monitoring Service (ECMWF CAMS via Open-Meteo)',
    systemOrProduct: 'Global / Regional Atmospheric Composition API',
    domain: 'Air Quality (Modeled Gases & Aerosols)',
    endpointOrPortalUrl: 'https://air-quality-api.open-meteo.com/v1/air-quality',
    authRequirement: 'None (Public Open API)',
    operationalStatus: 'operational_live',
    provenanceClass: 'gridded_reanalysis_nwp',
    spatialCoverage: 'All 5 Western Himalayan Subregions (sole source for Muzaffarabad & Gilgit)',
    spatialResolution: '~11 km × 11 km atmospheric grid',
    temporalCadence: 'Hourly',
    kewConsumingRoutes: ['/api/environmental-monitoring/air-pollution', '/api/alerts/live'],
    rateLimitAndCaching: '15 min server cache + 60s refresh cooldown',
    licenseTerms: 'Copernicus CAMS Open License / CC BY 4.0',
    knownLimitations: 'Coarse 11 km grid underpredicts winter valley-floor PM2.5 trapping during shallow temperature inversions.',
  },
  {
    connectorId: 'CONN-BREATHEOSS-AIRGRADIENT',
    providerName: 'AirGradient / BreatheOSS Community Network',
    systemOrProduct: 'Community Low-Cost Optical PM2.5 Telemetry',
    domain: 'Air Quality (Community Ground Nodes)',
    endpointOrPortalUrl: 'https://api.breatheoss.app/locations',
    authRequirement: 'None (Public Open API)',
    operationalStatus: 'operational_live',
    provenanceClass: 'community_sensor',
    spatialCoverage: 'Srinagar, Jammu, and Leh community nodes',
    spatialResolution: 'Point urban community monitor',
    temporalCadence: '15–60 minutes',
    kewConsumingRoutes: ['/api/environmental-monitoring/air-pollution'],
    rateLimitAndCaching: '15 min server cache',
    licenseTerms: 'CC BY-SA 4.0 (Community Open Air Quality)',
    knownLimitations: 'Optical plantower/laser scattering sensor; non-regulatory (not CPCB CAAQMS beta-attenuation certified).',
  },
  {
    connectorId: 'CONN-GLOFAS-FLOOD',
    providerName: 'ECMWF / Copernicus Emergency Management Service (via Open-Meteo)',
    systemOrProduct: 'Global Flood Awareness System (GloFAS v4)',
    domain: 'Hydrology & River Discharge',
    endpointOrPortalUrl: 'https://flood-api.open-meteo.com/v1/flood',
    authRequirement: 'None (Public Open API)',
    operationalStatus: 'operational_live',
    provenanceClass: 'gridded_reanalysis_nwp',
    spatialCoverage: 'Major rivers across Indus, Jhelum, Chenab, Shyok, and Gilgit basins',
    spatialResolution: '0.05° (~5 km) LISFLOOD hydrological routing grid',
    temporalCadence: 'Daily',
    kewConsumingRoutes: ['/api/alerts/live', '/hazard-intelligence/floods'],
    rateLimitAndCaching: '1–6 hour cache',
    licenseTerms: 'Copernicus Emergency Management Service Open License',
    knownLimitations: 'Modeled volumetric discharge (m³/s), NOT physical CWC / J&K I&FC staff-gauge water elevation.',
  },
  {
    connectorId: 'CONN-USGS-EMSC-NCS',
    providerName: 'USGS ComCat, EMSC & NCS India',
    systemOrProduct: 'FDSN Event Web Services (Multi-Agency Earthquake Catalog)',
    domain: 'Seismology & Tectonic Hazards',
    endpointOrPortalUrl: 'https://earthquake.usgs.gov/fdsnws/event/1/query',
    authRequirement: 'None (Public Open API)',
    operationalStatus: 'operational_live',
    provenanceClass: 'third_party_ground_station',
    spatialCoverage: '31.5°N–37.5°N, 72.0°E–80.5°E (Kashmir, Ladakh, Kohistan-Karakoram, Hindu Kush margin)',
    spatialResolution: 'Instrumental hypocenters (completeness ~M 2.5–3.0)',
    temporalCadence: 'Near-real-time event catalog (5–15 min polling)',
    kewConsumingRoutes: ['/api/hazard-intelligence/earthquakes', '/api/alerts/live'],
    rateLimitAndCaching: '5 min server cache + Haversine 65 km / 120 s deduplication',
    licenseTerms: 'USGS Public Domain / EMSC & NCS Attribution',
    knownLimitations: 'Epicentral uncertainty ±5–15 km in sparse Himalayan networks; cannot predict deterministic fault rupture.',
  },
  {
    connectorId: 'CONN-NDMA-SACHET',
    providerName: 'National Disaster Management Authority (NDMA India)',
    systemOrProduct: 'SACHET Common Alerting Protocol (CAP) RSS Feed',
    domain: 'Official Statutory Civil Disaster Warnings',
    endpointOrPortalUrl: 'https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml',
    authRequirement: 'None (Public Open API)',
    operationalStatus: 'operational_live',
    provenanceClass: 'government_statutory_record',
    spatialCoverage: 'Jammu & Kashmir and Ladakh districts',
    spatialResolution: 'District / Tehsil CAP polygon',
    temporalCadence: '15–30 minutes',
    kewConsumingRoutes: [
      '/api/hazard-intelligence/glofs',
      '/api/hazard-intelligence/avalanches',
      '/api/hazard-intelligence/forest-fires',
    ],
    rateLimitAndCaching: '15 min cache; strictly filtered by J&K/Ladakh geographic names before hazard type matching',
    licenseTerms: 'Government of India Open Disaster Public Warning Feed',
    knownLimitations: 'Covers Indian jurisdictions (J&K and Ladakh) only; nationwide feed requires strict geographic entity pre-filtering.',
  },
  {
    connectorId: 'CONN-OPENALEX-CROSSREF-GDELT',
    providerName: 'OpenAlex, Crossref & GDELT 2.0 Project',
    systemOrProduct: 'Scholarly DOI & News Signal Discovery APIs',
    domain: 'Himalayan Dispatch Editorial Research (HD-ANIE)',
    endpointOrPortalUrl: 'https://api.openalex.org/works & https://api.crossref.org/works',
    authRequirement: 'None (Public Open API)',
    operationalStatus: 'operational_editorial_discovery',
    provenanceClass: 'peer_reviewed_literature',
    spatialCoverage: 'Western Himalayan scientific & news corpus',
    spatialResolution: 'Document-level metadata',
    temporalCadence: 'Scheduled newsroom research polling',
    kewConsumingRoutes: ['/api/himalayan-dispatch/anie'],
    rateLimitAndCaching: 'Polite User-Agent + 600ms domain spacing + SSRF DNS/redirect guard',
    licenseTerms: 'CC0 (OpenAlex / Crossref Metadata)',
    knownLimitations: 'Keyword queries require human specialist relevance screening to reject homonym/off-topic papers.',
  },
  {
    connectorId: 'CONN-NASA-FIRMS',
    providerName: 'NASA LANCE / FIRMS (MODIS & VIIRS 375m)',
    systemOrProduct: 'Active Fire Thermal Anomalies API',
    domain: 'Forest Fire Detection',
    endpointOrPortalUrl: 'https://firms.modaps.eosdis.nasa.gov/api/',
    authRequirement: 'Free API Key Required',
    operationalStatus: 'available_not_yet_wired',
    provenanceClass: 'satellite_remote_sensing',
    spatialCoverage: 'Global / Western Himalayas (375 m VIIRS I-band)',
    spatialResolution: '375 m (VIIRS) / 1 km (MODIS)',
    temporalCadence: '~3 hours post-overpass (once MAP_KEY configured)',
    kewConsumingRoutes: ['/hazard-intelligence/forest-fires'],
    rateLimitAndCaching: 'Pending NASA_FIRMS_MAP_KEY provisioning',
    licenseTerms: 'NASA EOSDIS Open Data Policy',
    knownLimitations: 'Not yet wired into /api/hazard-intelligence/forest-fires; current route computes NWP meteorological fire-weather screening only.',
  },
  {
    connectorId: 'CONN-GBIF-IUCN-EBIRD',
    providerName: 'GBIF, eBird (Cornell Lab) & IUCN Red List API',
    systemOrProduct: 'Taxonomic Backbone & Georeferenced Occurrence APIs',
    domain: 'Biodiversity Checklist Reconstruction',
    endpointOrPortalUrl: 'https://api.gbif.org/v1/occurrence/search',
    authRequirement: 'None (Public Open API)',
    operationalStatus: 'available_not_yet_wired',
    provenanceClass: 'verified_field_observation',
    spatialCoverage: 'Western Himalayan districts & protected areas',
    spatialResolution: 'Voucher specimen & checklist coordinates',
    temporalCadence: 'Batch verification pipeline',
    kewConsumingRoutes: ['/biodiversity'],
    rateLimitAndCaching: 'Planned offline taxonomic verification pipeline (Phase 2 Biodiversity Reconstruction)',
    licenseTerms: 'CC0 / CC BY 4.0 / CC BY-NC 4.0 per GBIF dataset',
    knownLimitations: 'Requires taxonomic synonymy reconciliation and sensitive species coordinate fuzzing prior to import.',
  },
  {
    connectorId: 'CONN-CWC-JKIFC-CPCB',
    providerName: 'CWC, J&K I&FC, CPCB CAAQMS, ISRO NWIA, FSI ISFR & CAG India',
    systemOrProduct: 'Statutory Indian Hydrological, Air, Forest, Wetland & Audit Publications',
    domain: 'Statutory Baselines & Accountability Audits',
    endpointOrPortalUrl: 'https://cag.gov.in & https://fsi.nic.in & https://cpcb.nic.in',
    authRequirement: 'Static Published PDF/Atlas',
    operationalStatus: 'no_public_realtime_api_manual_statutory',
    provenanceClass: 'government_statutory_record',
    spatialCoverage: 'Jammu & Kashmir and Ladakh',
    spatialResolution: 'District / Gauge / Wetland statutory tables',
    temporalCadence: 'Annual / Periodic statutory publication',
    kewConsumingRoutes: ['/water-systems', '/biodiversity/forest-ecosystems', '/environmental-investigations'],
    rateLimitAndCaching: 'Curated static tables with explicit publication year and report citation',
    licenseTerms: 'Government of India Statutory Publication Terms',
    knownLimitations: 'No open unauthenticated real-time JSON API is publicly provided for J&K I&FC gauges or JKPCC CAAQMS; KEW presents published statutory benchmarks without live timestamps.',
  },
];
