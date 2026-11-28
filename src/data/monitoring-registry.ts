// Monitoring Intelligence Registry
// Provenance-verified external feed, community sensor, NWP grid & statutory benchmark registry for Kashmir EcoWatch.
// CRITICAL DISCLOSURE: Kashmir EcoWatch owns and operates ZERO (0) physical field sensors, camera traps, weather stations, or river gauges.
// QUARANTINED_SYNTHETIC_STATION_COUNTS: Withdrew legacy synthetic aggregates (263 "active stations" including 156 KEW camera traps, 47 weather stations, 34 water quality stations, 12 CAAQMS, 8 seismic stations, 6 glacier stations).

import { KEW_OWNED_PHYSICAL_SENSORS_COUNT } from '@/data/monitoring-infrastructure-registry';
import type { ScientificProvenanceClass } from '@/lib/scientific-integrity/quarantine-gateway';

export { KEW_OWNED_PHYSICAL_SENSORS_COUNT };

export type MonitoringStatus = 'active-network' | 'periodic-monitoring' | 'seasonal-coverage' | 'under-expansion' | 'reference-monitoring';
export type MonitoringCadence = 'live' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'seasonal' | 'event-driven';
export type MonitoringSource = 'institutional' | 'field-based' | 'community-supported' | 'satellite-derived' | 'hybrid';
export type MonitoringCategory = 'air-quality' | 'water-quality' | 'seismic' | 'weather' | 'wildlife' | 'glacier';

export interface ModuleLink {
  moduleId: string;
  moduleName: string;
  modulePath: string;
  contributionType: string;
}

export interface DashboardLink {
  name: string;
  path: string;
  description: string;
}

export interface AlertLink {
  type: string;
  description: string;
  severity: 'low' | 'moderate' | 'high' | 'critical';
}

export interface MonitoringNetwork {
  id: string;
  category: MonitoringCategory;
  name: string;

  // Status & Mode
  status: MonitoringStatus;
  cadence: MonitoringCadence;
  source: MonitoringSource;

  // Infrastructure & Provenance
  stationCount: number; // Strictly 0 KEW-owned sensors; reflects verified external community sensor zones where applicable
  kewOwnedPhysicalSensors: 0;
  externalFeedOrGridCount: number;
  infrastructureClassification: 'Community Optical Sensor + CAMS Model Grid' | 'External Statutory Agency Catalog' | 'Gridded NWP / Hydrological Model' | 'Published Statutory Grab-Sample Archive' | 'Satellite Remote-Sensing & Literature Benchmark';
  provenanceClass: ScientificProvenanceClass;
  coverage: string;
  coverageDetails: {
    districts?: string[];
    basins?: string[];
    protectedAreas?: string[];
    altitudeRange?: string;
    urbanCoverage?: string;
  };

  // Monitoring Scope
  parametersTracked: string[];
  whatIsMonitored: string;

  // Module & Dashboard Links
  feedsModules: ModuleLink[];
  feedsDashboards: DashboardLink[];
  generatesAlerts: AlertLink[];

  // Data & Quality
  dataAvailability: 'live-stream' | 'near-real-time' | 'daily-batch' | 'periodic-updates' | 'reference-archive';
  historicalDataFrom: string;
  qualityAssurance: string;

  // Operator & Source
  operatedBy: string;
  description: string;

  // Limitations
  limitations?: string;

  // Metadata
  lastUpdated: string;
  tags: string[];
}

const KASHMIR_CORE_DISTRICTS = [
  'Srinagar',
  'Ganderbal',
  'Budgam',
  'Anantnag',
  'Kulgam',
  'Pulwama',
  'Shopian',
  'Baramulla',
  'Bandipora',
  'Kupwara',
];

export const monitoringRegistry: MonitoringNetwork[] = [
  {
    id: 'monitor-air-quality',
    category: 'air-quality',
    name: 'Community Optical PM2.5 + Copernicus CAMS Atmospheric Grid',
    status: 'active-network',
    cadence: 'hourly',
    source: 'community-supported',
    stationCount: 3, // 3 community AirGradient optical PM2.5 zones (Srinagar, Jammu, Leh); 0 KEW-owned sensors; 0 direct CPCB CAAQMS APIs
    kewOwnedPhysicalSensors: 0,
    externalFeedOrGridCount: 44,
    infrastructureClassification: 'Community Optical Sensor + CAMS Model Grid',
    provenanceClass: 'community_sensor',
    coverage: '3 Community Optical Zones + 44 CAMS (~11 km) District Grid Cells',
    coverageDetails: {
      districts: ['Srinagar', 'Jammu', 'Leh', 'Anantnag', 'Baramulla', 'Ganderbal', 'Muzaffarabad', 'Gilgit'],
      urbanCoverage: 'Community optical PM2.5 in Srinagar, Jammu & Leh; 11 km ECMWF CAMS atmospheric model across 44 regional grid cells',
    },
    parametersTracked: ['PM2.5 (community optical / CAMS)', 'PM10/NO2/SO2/CO/O3 (11 km CAMS model)', 'Non-Regulatory AQI Screening'],
    whatIsMonitored: 'Non-regulatory community optical PM2.5 (AirGradient via BreatheOSS) paired with 0.1° (~11 km) Copernicus CAMS gridded atmospheric model outputs.',
    feedsModules: [
      { moduleId: 'environmental-monitoring', moduleName: 'Environmental Monitoring', modulePath: '/environmental-monitoring/air-pollution', contributionType: 'Community PM2.5 & CAMS model screening' },
      { moduleId: 'risk-monitoring', moduleName: 'Risk & Monitoring', modulePath: '/risk-monitoring', contributionType: 'Model AQI screening advisories' },
    ],
    feedsDashboards: [
      { name: 'Air Quality Intelligence', path: '/environmental-monitoring/air-pollution', description: 'Community optical PM2.5 & 44-cell CAMS atmospheric grid' },
    ],
    generatesAlerts: [
      { type: 'Air Quality Screening Advisory', description: 'Triggered when CAMS or community optical PM2.5 exceeds screening thresholds', severity: 'moderate' },
    ],
    dataAvailability: 'near-real-time',
    historicalDataFrom: '2022',
    qualityAssurance: 'Non-regulatory community optical calibration + ECMWF CAMS synoptic data assimilation (0 direct CPCB CAAQMS API feeds)',
    operatedBy: 'AirGradient / BreatheOSS Community Network & ECMWF Copernicus CAMS (via Open-Meteo) — 0 KEW Sensors',
    description: 'Integrates third-party community AirGradient optical PM2.5 nodes in Srinagar, Jammu, and Leh with 44 Copernicus CAMS (~11 km) regional model grid points. Muzaffarabad and Gilgit are 100% gridded model cells with zero connected ground monitors.',
    limitations: 'Zero direct CPCB/JKPCC CAAQMS beta-attenuation API connections. Instantaneous hourly/optical readings differ from statutory 24-hour NAAQS compliance averages.',
    lastUpdated: '2026-11-27',
    tags: ['air-quality', 'community-sensor', 'CAMS-model', 'non-regulatory', 'AQI'],
  },
  {
    id: 'monitor-seismic',
    category: 'seismic',
    name: 'Multi-Agency Regional Seismic Catalog (USGS / EMSC / NCS)',
    status: 'active-network',
    cadence: 'event-driven',
    source: 'institutional',
    stationCount: 0, // 0 KEW seismographs; ingests 3 external statutory seismological agency catalogs
    kewOwnedPhysicalSensors: 0,
    externalFeedOrGridCount: 3,
    infrastructureClassification: 'External Statutory Agency Catalog',
    provenanceClass: 'third_party_ground_station',
    coverage: 'Western Himalaya & Hindu Kush-Pamir Belt (31.8°N–37.6°N, 71.0°E–80.5°E)',
    coverageDetails: {
      districts: [...KASHMIR_CORE_DISTRICTS, 'Kishtwar', 'Doda', 'Ramban', 'Leh', 'Kargil', 'Muzaffarabad', 'Gilgit'],
    },
    parametersTracked: ['Magnitude (Mw/mb/ML)', 'Hypocentral Depth (km)', 'Epicenter Coordinates', 'Origin Time'],
    whatIsMonitored: 'Deduplicated earthquake event catalogs reported by USGS ANSS ComCat, EMSC SeismicPortal, and National Center for Seismology (NCS India).',
    feedsModules: [
      { moduleId: 'hazard-intelligence', moduleName: 'Hazard Intelligence', modulePath: '/hazard-intelligence/earthquakes', contributionType: 'Official multi-agency earthquake catalog' },
      { moduleId: 'districts', moduleName: 'District Profiles', modulePath: '/districts', contributionType: 'Historical & recent regional seismicity context' },
    ],
    feedsDashboards: [
      { name: 'Earthquake Intelligence', path: '/hazard-intelligence/earthquakes', description: 'Deduplicated USGS, EMSC & NCS seismic event catalog' },
    ],
    generatesAlerts: [
      { type: 'Seismic Event Notification', description: 'Reported regional earthquakes (M ≥ 2.5) from USGS/EMSC/NCS catalogs', severity: 'critical' },
    ],
    dataAvailability: 'near-real-time',
    historicalDataFrom: '1970',
    qualityAssurance: 'External statutory seismological network review (USGS, EMSC, NCS India)',
    operatedBy: 'USGS, Euro-Mediterranean Seismological Centre (EMSC) & NCS India — 0 KEW Seismographs',
    description: 'Aggregates and Haversine-deduplicates official public seismic event feeds across the Western Himalaya. Kashmir EcoWatch operates zero local seismometers or GNSS monuments.',
    limitations: 'Catalog completeness threshold is ~M 2.5–3.0 in high-relief Himalayan sectors; provides historical/recent event context rather than deterministic earthquake prediction.',
    lastUpdated: '2026-11-27',
    tags: ['seismic', 'earthquake', 'USGS', 'EMSC', 'NCS', 'external-catalog'],
  },
  {
    id: 'monitor-weather',
    category: 'weather',
    name: 'Gridded Synoptic NWP & GloFAS v4 Hydrological Models',
    status: 'active-network',
    cadence: 'hourly',
    source: 'satellite-derived',
    stationCount: 0, // 0 KEW physical AWS stations; NWP & hydrological model grid points only
    kewOwnedPhysicalSensors: 0,
    externalFeedOrGridCount: 46,
    infrastructureClassification: 'Gridded NWP / Hydrological Model',
    provenanceClass: 'gridded_reanalysis_nwp',
    coverage: '5 Subregions / 46 Operational Districts (9–25 km NWP & ~5 km GloFAS Grids)',
    coverageDetails: {
      districts: [...KASHMIR_CORE_DISTRICTS, 'Jammu', 'Kishtwar', 'Ramban', 'Leh', 'Kargil', 'Muzaffarabad', 'Gilgit', 'Skardu'],
      altitudeRange: '280 m (Shivalik plains) to 8,611 m (Karakoram relief — model grid terrain-masked)',
    },
    parametersTracked: ['2m Temp & Precip (NWP)', '850/700/500/300 hPa Synoptic Fields', '31-Member GEFS Quantiles', 'GloFAS v4 Modeled River Discharge'],
    whatIsMonitored: 'Numerical weather prediction fields (ECMWF IFS, NOAA GFS/GEFS, ERA5-Land) and Copernicus GloFAS v4 (~5 km) modeled river discharge.',
    feedsModules: [
      { moduleId: 'hazard-intelligence', moduleName: 'Hazard Intelligence', modulePath: '/hazard-intelligence', contributionType: 'Gridded NWP & GloFAS hazard screening' },
      { moduleId: 'districts', moduleName: 'District Profiles', modulePath: '/districts', contributionType: 'Gridded reanalysis climate context' },
    ],
    feedsDashboards: [
      { name: 'Atmospheric Systems', path: '/hazard-intelligence/atmospheric-systems/western-disturbances', description: 'Synoptic NWP & ERA5-Land analysis' },
      { name: 'Flood Screening', path: '/hazard-intelligence/floods', description: 'GloFAS v4 (~5 km) modeled river discharge & statutory stage benchmarks' },
    ],
    generatesAlerts: [
      { type: 'NWP Weather & Hydrological Screening', description: 'Coarse-grid NWP precipitation, snow, and GloFAS discharge screening', severity: 'moderate' },
    ],
    dataAvailability: 'near-real-time',
    historicalDataFrom: '1980',
    qualityAssurance: 'Unit-validated Open-Meteo / ECMWF / NOAA / Copernicus model ingestion with subterranean pressure-level masking',
    operatedBy: 'Open-Meteo (ECMWF IFS / ERA5 / GloFAS v4 / NOAA GEFS) — 0 KEW Weather Stations',
    description: 'Provides coarse-grid numerical weather and hydrological model diagnostics across Western Himalayan coordinates. Explicitly distinct from in-situ IMD AWS, Doppler radar, or CWC river gauges.',
    limitations: '9–25 km NWP grids cannot resolve sub-2 km convective cloudburst cores or localized valley microclimates; GloFAS (~5 km) is modeled discharge, not physical staff-gauge height.',
    lastUpdated: '2026-11-27',
    tags: ['NWP', 'ECMWF', 'GloFAS', 'ERA5', 'gridded-model'],
  },
  {
    id: 'monitor-water-quality',
    category: 'water-quality',
    name: 'Published Limnological & NWQMP Grab-Sample Reference Archive',
    status: 'reference-monitoring',
    cadence: 'seasonal',
    source: 'institutional',
    stationCount: 0, // 0 live water-quality telemetry sondes or KEW buoys; static published reference sites only
    kewOwnedPhysicalSensors: 0,
    externalFeedOrGridCount: 12,
    infrastructureClassification: 'Published Statutory Grab-Sample Archive',
    provenanceClass: 'government_statutory_record',
    coverage: '22 Trophic-Indexed Kashmir Lakes & 12 Published Regulatory Grab-Sample Sites',
    coverageDetails: {
      basins: ['Jhelum', 'Indus', 'Chenab', 'Ravi'],
      districts: ['Srinagar', 'Anantnag', 'Ganderbal', 'Baramulla', 'Bandipora', 'Jammu', 'Leh'],
    },
    parametersTracked: ['Published Carlson TSI (SD/Chl-a/TP)', 'Archival pH/DO/BOD/COD', 'Archived Sentinel-2 NDCI Scenes'],
    whatIsMonitored: 'Archival physicochemical water quality records from CPCB NWQMP, JKPCC, CAG audits, and peer-reviewed limnological literature alongside static Sentinel-2 NDCI scenes.',
    feedsModules: [
      { moduleId: 'water-systems', moduleName: 'Water Systems', modulePath: '/water-systems', contributionType: 'Published limnological & NWIA reference baselines' },
      { moduleId: 'algal-blooms', moduleName: 'Algal Bloom Hub', modulePath: '/hazard-intelligence/algal-bloom-intelligence', contributionType: 'Archived Sentinel-2 NDCI optical screening' },
    ],
    feedsDashboards: [
      { name: 'Water Intelligence Atlas', path: '/water-systems/lakes', description: '553 cataloged waterbodies (22 with published Carlson TSI baselines)' },
    ],
    generatesAlerts: [],
    dataAvailability: 'reference-archive',
    historicalDataFrom: '2011',
    qualityAssurance: 'Cross-referenced against ISRO NWIA (2011), CPCB NWQMP tables, CAG Report No. 4 of 2025, and peer-reviewed limnology',
    operatedBy: 'Published Statutory Archives (CPCB / JKPCC / ISRO NWIA / Academic Literature) — 0 KEW Sondes or Buoys',
    description: 'Curated documentary archive of published grab-sample water quality baselines and Sentinel-2 optical scenes. Real-time automated water quality sonde or OCEMS feeds are not connected.',
    limitations: '531 of 553 cataloged lakes lack published in-situ Carlson TSI measurements; laboratory ELISA/LC-MS cyanotoxin ingestion is pending institutional MoU.',
    lastUpdated: '2026-11-27',
    tags: ['water-quality', 'archival-baseline', 'NWIA', 'NWQMP', 'limnology'],
  },
  {
    id: 'monitor-wildlife',
    category: 'wildlife',
    name: 'Published Wildlife Census & Taxonomic Literature Baselines',
    status: 'reference-monitoring',
    cadence: 'seasonal',
    source: 'institutional',
    stationCount: 0, // Quarantined synthetic "156 camera traps" claim; KEW operates 0 camera traps
    kewOwnedPhysicalSensors: 0,
    externalFeedOrGridCount: 0,
    infrastructureClassification: 'Satellite Remote-Sensing & Literature Benchmark',
    provenanceClass: 'peer_reviewed_literature',
    coverage: '45 Verified Protected Areas & 239 Verified Species Profiles',
    coverageDetails: {
      districts: KASHMIR_CORE_DISTRICTS,
      protectedAreas: ['Dachigam NP', 'Overa-Aru WLS', 'Hirpora WLS', 'Gulmarg WLS', 'Kishtwar High Altitude NP', 'Hemis NP'],
    },
    parametersTracked: ['Statutory Population Censuses (Hangul, Markhor, Snow Leopard)', 'IUCN Red List Status', 'Elevation-Verified Range Envelopes'],
    whatIsMonitored: 'Published wildlife department censuses (e.g., 2023 Hangul census, 2024 WII SPAI Snow Leopard assessment) and peer-reviewed taxonomic distributions.',
    feedsModules: [
      { moduleId: 'biodiversity', moduleName: 'Biodiversity', modulePath: '/biodiversity', contributionType: '239 verified species reference profiles' },
      { moduleId: 'protected-areas', moduleName: 'Protected Areas', modulePath: '/protected-network', contributionType: '45 verified protected area profiles' },
    ],
    feedsDashboards: [
      { name: 'Biodiversity Reference Hub', path: '/biodiversity', description: 'Verified taxonomic checklists & IUCN conservation baselines' },
    ],
    generatesAlerts: [],
    dataAvailability: 'reference-archive',
    historicalDataFrom: '2015',
    qualityAssurance: 'Verified against IUCN Red List, WII monographs, and statutory wildlife census reports',
    operatedBy: 'Published Statutory & Academic Literature (WII / Dept. of Wildlife Protection) — 0 KEW Camera Traps',
    description: 'Synthesizes published wildlife survey literature and statutory census reports. Previously displayed synthetic camera-trap counts (156) have been quarantined; KEW operates zero field camera traps or acoustic arrays.',
    limitations: 'Curated reference subset (239 verified species profiles); no live wildlife telemetry collars or automated camera-trap feeds are connected.',
    lastUpdated: '2026-11-27',
    tags: ['wildlife', 'literature-baseline', 'census', 'IUCN', 'protected-areas'],
  },
  {
    id: 'monitor-glacier',
    category: 'glacier',
    name: 'Cryosphere Remote-Sensing & Geodetic Literature Archive',
    status: 'reference-monitoring',
    cadence: 'seasonal',
    source: 'satellite-derived',
    stationCount: 0, // 0 KEW glacier mass-balance stakes or alpine GNSS monuments
    kewOwnedPhysicalSensors: 0,
    externalFeedOrGridCount: 0,
    infrastructureClassification: 'Satellite Remote-Sensing & Literature Benchmark',
    provenanceClass: 'peer_reviewed_literature',
    coverage: 'Greater Himalayan, Pir Panjal, Ladakh & Karakoram Benchmark Glaciers',
    coverageDetails: {
      districts: ['Anantnag', 'Ganderbal', 'Kishtwar', 'Kargil', 'Leh', 'Hunza', 'Shigar'],
      altitudeRange: '3,500 m to 8,611 m ASL',
      protectedAreas: ['Kolahoi Basin', 'Machoi / Drass', 'Suru-Zanskar', 'Karakoram Cryosphere'],
    },
    parametersTracked: ['Published Snout Retreat Rates', 'Geodetic Mass Balance (Literature)', 'Proglacial Lake Inventory'],
    whatIsMonitored: 'Published multi-decadal satellite glacier retreat studies, WGMS/ISRO cryosphere inventories, and moraine-dammed glacial lake assessments.',
    feedsModules: [
      { moduleId: 'water-systems', moduleName: 'Water Systems', modulePath: '/water-systems', contributionType: 'Published glacier inventory baselines' },
      { moduleId: 'glofs', moduleName: 'GLOF Screening', modulePath: '/hazard-intelligence/glofs', contributionType: 'Glacial lake susceptibility & NWP thermal screening' },
    ],
    feedsDashboards: [
      { name: 'Cryosphere & GLOF Hub', path: '/hazard-intelligence/glofs', description: 'Glacial lake inventory & NWP screening' },
    ],
    generatesAlerts: [],
    dataAvailability: 'reference-archive',
    historicalDataFrom: '1962',
    qualityAssurance: 'Peer-reviewed glaciological literature & ISRO SAC / ICIMOD glacial lake inventories',
    operatedBy: 'Published Satellite Glaciology Literature (ISRO / WIHG / University Studies) — 0 KEW Ablation Stations',
    description: 'Compiles published satellite-derived glacier area change and geodetic mass-balance benchmarks. KEW operates zero physical glacier weather stations or GNSS monuments.',
    limitations: 'Static multi-year satellite inventory benchmarks; live in-situ ablation stake or proglacial gauge telemetry is not connected.',
    lastUpdated: '2026-11-27',
    tags: ['glacier', 'cryosphere', 'remote-sensing', 'literature-baseline', 'GLOF'],
  },
];

// Computed properties
export const getActiveNetworks = () => monitoringRegistry.filter(n => n.status === 'active-network');
export const getNetworksFeedingAlerts = () => monitoringRegistry.filter(n => n.generatesAlerts.length > 0);
export const getNetworksFeedingDashboards = () => monitoringRegistry.filter(n => n.feedsDashboards.length > 0);
export const getNetworkByCategory = (category: MonitoringCategory) => monitoringRegistry.filter(n => n.category === category);
export const getNetworkById = (id: string) => monitoringRegistry.find(n => n.id === id);

export const getMonitoringStats = () => ({
  activeNetworks: getActiveNetworks().length,
  totalStations: KEW_OWNED_PHYSICAL_SENSORS_COUNT, // 0 KEW-owned physical stations
  kewOwnedPhysicalSensors: KEW_OWNED_PHYSICAL_SENSORS_COUNT,
  externalCommunitySensorZones: 3,
  nwpModelGridCells: 44,
  districtCoverage: new Set(
    monitoringRegistry.flatMap(n => (n.coverageDetails.districts || []).filter(d => !d.toLowerCase().startsWith('all ')))
  ).size,
  alertLinkedNetworks: getNetworksFeedingAlerts().length,
  dashboardLinkedNetworks: getNetworksFeedingDashboards().length,
});

export const statusDisplayLabels: Record<MonitoringStatus, string> = {
  'active-network': 'External Feed Active',
  'periodic-monitoring': 'Periodic Survey',
  'seasonal-coverage': 'Seasonal Coverage',
  'under-expansion': 'Pending Integration',
  'reference-monitoring': 'Archival Reference',
};

export const statusColors: Record<MonitoringStatus, string> = {
  'active-network': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'periodic-monitoring': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'seasonal-coverage': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'under-expansion': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'reference-monitoring': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

export const categoryLabels: Record<MonitoringCategory, string> = {
  'air-quality': 'Air Quality (Community + CAMS)',
  'water-quality': 'Water Quality (Archival)',
  'seismic': 'Seismic (Agency Catalogs)',
  'weather': 'Weather & Floods (NWP / GloFAS)',
  'wildlife': 'Wildlife (Literature Census)',
  'glacier': 'Cryosphere (Remote Sensing)',
};

export const categoryGradients: Record<MonitoringCategory, string> = {
  'air-quality': 'from-purple-500 to-pink-500',
  'water-quality': 'from-blue-500 to-cyan-500',
  'seismic': 'from-orange-500 to-red-500',
  'weather': 'from-sky-500 to-blue-500',
  'wildlife': 'from-emerald-500 to-green-500',
  'glacier': 'from-slate-400 to-blue-400',
};

export const cadenceLabels: Record<MonitoringCadence, string> = {
  live: 'Near-Real-Time Feed',
  hourly: 'Hourly Model / Feed',
  daily: 'Daily Model Cycle',
  weekly: 'Weekly Updates',
  monthly: 'Monthly Reports',
  seasonal: 'Published Archival Baseline',
  'event-driven': 'Event-Driven Agency Catalog',
};

export const sourceLabels: Record<MonitoringSource, string> = {
  institutional: 'External Statutory Archive / Catalog',
  'field-based': 'Published Field Literature',
  'community-supported': 'Community Optical + CAMS Model',
  'satellite-derived': 'Satellite / Gridded NWP Model',
  hybrid: 'Published Literature + Remote Sensing',
};

export const dataAvailabilityLabels: Record<MonitoringNetwork['dataAvailability'], string> = {
  'live-stream': 'External Public Feed',
  'near-real-time': 'Near-Real-Time External API',
  'daily-batch': 'Daily Model Batch',
  'periodic-updates': 'Periodic Literature Updates',
  'reference-archive': 'Static Reference Archive',
};
