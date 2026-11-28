/**
 * KASHMIR ECOWATCH — AUTHORITATIVE MONITORING & TELEMETRY INFRASTRUCTURE REGISTRY
 *
 * Critical Disclosure: Kashmir EcoWatch owns and operates ZERO (0) physical field sensors,
 * weather stations, river gauges, water quality sondes, GNSS monuments, or camera traps.
 * Every monitoring node or environmental feed on the platform is classified below with
 * explicit ownership, spatial resolution, freshness thresholds, and provenance class.
 */

import type { ScientificProvenanceClass } from '@/lib/scientific-integrity/quarantine-gateway';
import type { CanonicalSubregionName } from '@/data/geographic-registry';

export type MonitoringStationCategory =
  | 'air_quality_community_or_model'
  | 'synoptic_meteorology_nwp'
  | 'seismic_catalog_network'
  | 'hydrological_discharge_model_or_archive'
  | 'satellite_optical_limnology'
  | 'cryosphere_remote_sensing_benchmark'
  | 'biodiversity_literature_survey_site'
  | 'statutory_civil_alert_feed'
  | 'effluent_audit_benchmark';

export interface MonitoringInfrastructureRecord {
  stationId: string;
  stationName: string;
  category: MonitoringStationCategory;
  ownerOperator: string;
  isKewOwnedPhysicalSensor: false; // Strictly false across 100% of records
  coordinates: [number, number]; // [lat, lng]
  elevationM: number;
  district: string;
  subregion: CanonicalSubregionName;
  measuredParameters: string[];
  samplingInterval: string;
  spatialResolution: string;
  sourceEndpointOrCitation: string;
  provenanceClass: ScientificProvenanceClass;
  freshnessThresholdMinutes: number | null; // null = static historical/audit benchmark (never live)
  calibrationStatus: 'Agency-Calibrated' | 'Community-Calibrated (Non-Regulatory)' | 'NWP / Reanalysis Grid' | 'Archival Benchmark Only';
  publicOperationalLabel: string;
  limitations: string;
}

export const KEW_OWNED_PHYSICAL_SENSORS_COUNT = 0 as const;

export const MONITORING_INFRASTRUCTURE_REGISTRY: MonitoringInfrastructureRecord[] = [
  {
    stationId: 'KEW-AQ-SXR-01',
    stationName: 'Srinagar AirGradient Community Monitor + CAMS Grid',
    category: 'air_quality_community_or_model',
    ownerOperator: 'AirGradient / BreatheOSS Community Network & ECMWF CAMS (via Open-Meteo)',
    isKewOwnedPhysicalSensor: false,
    coordinates: [34.0837, 74.7973],
    elevationM: 1585,
    district: 'Srinagar',
    subregion: 'Kashmir Valley',
    measuredParameters: ['PM2.5 (community optical)', 'PM10/NO2/SO2/O3/CO (11 km CAMS model)'],
    samplingInterval: '15–60 minutes',
    spatialResolution: 'Point optical PM2.5 + ~11 km CAMS atmospheric grid',
    sourceEndpointOrCitation: 'https://api.breatheoss.app & https://air-quality-api.open-meteo.com/v1/air-quality',
    provenanceClass: 'community_sensor',
    freshnessThresholdMinutes: 120,
    calibrationStatus: 'Community-Calibrated (Non-Regulatory)',
    publicOperationalLabel: 'Community Optical PM2.5 + CAMS Model Gases',
    limitations: 'Not an official CPCB/JKPCC CAAQMS reference beta-attenuation monitor; gaseous species come from coarse CAMS reanalysis.',
  },
  {
    stationId: 'KEW-AQ-IXJ-01',
    stationName: 'Jammu AirGradient Community Monitor + CAMS Grid',
    category: 'air_quality_community_or_model',
    ownerOperator: 'AirGradient / BreatheOSS Community Network & ECMWF CAMS (via Open-Meteo)',
    isKewOwnedPhysicalSensor: false,
    coordinates: [32.7266, 74.857],
    elevationM: 327,
    district: 'Jammu',
    subregion: 'Jammu Region',
    measuredParameters: ['PM2.5 (community optical)', 'PM10/NO2/SO2/O3/CO (11 km CAMS model)'],
    samplingInterval: '15–60 minutes',
    spatialResolution: 'Point optical PM2.5 + ~11 km CAMS atmospheric grid',
    sourceEndpointOrCitation: 'https://api.breatheoss.app & https://air-quality-api.open-meteo.com/v1/air-quality',
    provenanceClass: 'community_sensor',
    freshnessThresholdMinutes: 120,
    calibrationStatus: 'Community-Calibrated (Non-Regulatory)',
    publicOperationalLabel: 'Community Optical PM2.5 + CAMS Model Gases',
    limitations: 'Non-regulatory community PM2.5 sensor paired with regional CAMS model gases.',
  },
  {
    stationId: 'KEW-AQ-IXL-01',
    stationName: 'Leh AirGradient Community Monitor + CAMS Grid',
    category: 'air_quality_community_or_model',
    ownerOperator: 'AirGradient / BreatheOSS Community Network & ECMWF CAMS (via Open-Meteo)',
    isKewOwnedPhysicalSensor: false,
    coordinates: [34.1526, 77.5771],
    elevationM: 3500,
    district: 'Leh',
    subregion: 'Ladakh',
    measuredParameters: ['PM2.5 (community optical)', 'PM10/NO2/SO2/O3/CO (11 km CAMS model)'],
    samplingInterval: '15–60 minutes',
    spatialResolution: 'Point optical PM2.5 + ~11 km CAMS atmospheric grid',
    sourceEndpointOrCitation: 'https://api.breatheoss.app & https://air-quality-api.open-meteo.com/v1/air-quality',
    provenanceClass: 'community_sensor',
    freshnessThresholdMinutes: 120,
    calibrationStatus: 'Community-Calibrated (Non-Regulatory)',
    publicOperationalLabel: 'Community Optical PM2.5 + CAMS Model Gases',
    limitations: 'High-altitude low air density (~660 hPa) introduces optical nephelometer bias; non-regulatory.',
  },
  {
    stationId: 'KEW-AQ-MZF-01',
    stationName: 'Muzaffarabad Regional CAMS Atmospheric Grid Cell',
    category: 'air_quality_community_or_model',
    ownerOperator: 'Copernicus Atmosphere Monitoring Service (ECMWF CAMS) via Open-Meteo',
    isKewOwnedPhysicalSensor: false,
    coordinates: [34.37, 73.4711],
    elevationM: 737,
    district: 'Muzaffarabad',
    subregion: 'Azad Jammu & Kashmir',
    measuredParameters: ['Model PM2.5', 'Model PM10', 'Model NO2/SO2/O3/CO'],
    samplingInterval: 'Hourly model step',
    spatialResolution: '~11 km × 11 km gridded atmospheric model',
    sourceEndpointOrCitation: 'https://air-quality-api.open-meteo.com/v1/air-quality',
    provenanceClass: 'gridded_reanalysis_nwp',
    freshnessThresholdMinutes: 180,
    calibrationStatus: 'NWP / Reanalysis Grid',
    publicOperationalLabel: 'Gridded Atmospheric Model (No Ground Sensor)',
    limitations: 'Zero in-situ EPA ground monitor connected; smooths narrow Neelum-Jhelum valley inversions.',
  },
  {
    stationId: 'KEW-AQ-GIL-01',
    stationName: 'Gilgit Regional CAMS Atmospheric Grid Cell',
    category: 'air_quality_community_or_model',
    ownerOperator: 'Copernicus Atmosphere Monitoring Service (ECMWF CAMS) via Open-Meteo',
    isKewOwnedPhysicalSensor: false,
    coordinates: [35.9208, 74.308],
    elevationM: 1500,
    district: 'Gilgit',
    subregion: 'Gilgit-Baltistan',
    measuredParameters: ['Model PM2.5', 'Model PM10', 'Model NO2/SO2/O3/CO'],
    samplingInterval: 'Hourly model step',
    spatialResolution: '~11 km × 11 km gridded atmospheric model',
    sourceEndpointOrCitation: 'https://air-quality-api.open-meteo.com/v1/air-quality',
    provenanceClass: 'gridded_reanalysis_nwp',
    freshnessThresholdMinutes: 180,
    calibrationStatus: 'NWP / Reanalysis Grid',
    publicOperationalLabel: 'Gridded Atmospheric Model (No Ground Sensor)',
    limitations: 'Zero in-situ GB-EPA ground monitor connected; 11 km grid cell spans steep Karakoram relief.',
  },
  {
    stationId: 'KEW-SEIS-MULTI-01',
    stationName: 'Western Himalayan Multi-Agency Seismic Catalog (USGS / EMSC / NCS)',
    category: 'seismic_catalog_network',
    ownerOperator: 'USGS ANSS ComCat, Euro-Med Seismological Centre (EMSC), and National Center for Seismology (NCS India)',
    isKewOwnedPhysicalSensor: false,
    coordinates: [34.08, 74.8],
    elevationM: 1585,
    district: 'Srinagar',
    subregion: 'Kashmir Valley',
    measuredParameters: ['Magnitude (Mw/mb/ML)', 'Hypocentral Depth (km)', 'Epicenter Coordinates', 'Event Origin Time'],
    samplingInterval: 'Event-driven (near-real-time agency catalog)',
    spatialResolution: '31.5°N–37.5°N, 72.0°E–80.5°E regional bounding box',
    sourceEndpointOrCitation: 'https://earthquake.usgs.gov/fdsnws/event/1/query & https://www.seismicportal.eu/fdsnws/event/1/query',
    provenanceClass: 'third_party_ground_station',
    freshnessThresholdMinutes: 60,
    calibrationStatus: 'Agency-Calibrated',
    publicOperationalLabel: 'Official Multi-Agency Seismic Catalog',
    limitations: 'Catalog completeness threshold is ~M 2.5–3.0 in Western Himalaya; KEW operates zero local seismographs.',
  },
  {
    stationId: 'KEW-HYD-GLOFAS-01',
    stationName: 'Copernicus GloFAS v4 Gridded River Discharge Feed',
    category: 'hydrological_discharge_model_or_archive',
    ownerOperator: 'ECMWF / Copernicus Emergency Management Service (via Open-Meteo Flood API)',
    isKewOwnedPhysicalSensor: false,
    coordinates: [34.072, 74.815],
    elevationM: 1582,
    district: 'Srinagar',
    subregion: 'Kashmir Valley',
    measuredParameters: ['Modeled Daily River Discharge (m³/s)', 'Ensemble Forecast Discharge'],
    samplingInterval: '24 hours',
    spatialResolution: '0.05° (~5 km) LISFLOOD hydrological grid',
    sourceEndpointOrCitation: 'https://flood-api.open-meteo.com/v1/flood',
    provenanceClass: 'gridded_reanalysis_nwp',
    freshnessThresholdMinutes: 1440,
    calibrationStatus: 'NWP / Reanalysis Grid',
    publicOperationalLabel: 'GloFAS v4 Modeled River Discharge (~5 km Grid)',
    limitations: 'Modeled discharge, NOT physical CWC or J&K I&FC Ram Munshi Bagh / Sangam staff-gauge or radar stage.',
  },
  {
    stationId: 'KEW-HYD-HIST-BENCH-01',
    stationName: 'CWC / J&K I&FC Statutory Flood Gauge Reference Benchmarks (12 Sites)',
    category: 'hydrological_discharge_model_or_archive',
    ownerOperator: 'Central Water Commission (CWC) & J&K Irrigation and Flood Control Department (Published Danger/Alert Thresholds)',
    isKewOwnedPhysicalSensor: false,
    coordinates: [33.835, 75.068],
    elevationM: 1595,
    district: 'Anantnag',
    subregion: 'Kashmir Valley',
    measuredParameters: ['Statutory Alert Stage (ft/m)', 'Statutory Danger Stage (ft/m)', 'Historical Sept 2014 Peak Benchmark'],
    samplingInterval: 'Static statutory reference (non-live)',
    spatialResolution: '12 official gauge locations (Sangam, Ram Munshi Bagh, Asham, Vishow, Rambiyara, Lidder, Chenab Akhnoor, etc.)',
    sourceEndpointOrCitation: 'J&K I&FC Flood Control Manual & CWC Flood Forecasting Reference Tables',
    provenanceClass: 'historical_baseline',
    freshnessThresholdMinutes: null,
    calibrationStatus: 'Archival Benchmark Only',
    publicOperationalLabel: 'Published Statutory Stage Thresholds (Non-Live)',
    limitations: 'Public real-time CWC/I&FC stage API is not connected; displays statutory danger levels and historical benchmarks only.',
  },
  {
    stationId: 'KEW-MET-NWP-01',
    stationName: 'Western Himalayan Synoptic & District NWP Weather Grid',
    category: 'synoptic_meteorology_nwp',
    ownerOperator: 'Open-Meteo (ECMWF IFS 9 km / NOAA GFS & 31-Member GEFS Ensemble)',
    isKewOwnedPhysicalSensor: false,
    coordinates: [34.0837, 74.7973],
    elevationM: 1585,
    district: 'Srinagar',
    subregion: 'Kashmir Valley',
    measuredParameters: ['Temperature', 'Precipitation', 'Snowfall/Snow Depth', 'Soil Moisture', '850/700/500/300 hPa Winds & Geopotential'],
    samplingInterval: '1–3 hours',
    spatialResolution: '9–25 km NWP grid cells across Western Himalayan nodes',
    sourceEndpointOrCitation: 'https://api.open-meteo.com/v1/forecast & https://ensemble-api.open-meteo.com/v1/ensemble',
    provenanceClass: 'gridded_reanalysis_nwp',
    freshnessThresholdMinutes: 180,
    calibrationStatus: 'NWP / Reanalysis Grid',
    publicOperationalLabel: 'Gridded NWP Weather & Upper-Air Analysis',
    limitations: 'Cannot resolve sub-2 km convective cloudburst cores or micro-topographic valley cold pools without IMD AWS / Doppler radar.',
  },
  {
    stationId: 'KEW-CAP-SACHET-01',
    stationName: 'NDMA SACHET Common Alerting Protocol (CAP) RSS Feed',
    category: 'statutory_civil_alert_feed',
    ownerOperator: 'National Disaster Management Authority (NDMA), Government of India',
    isKewOwnedPhysicalSensor: false,
    coordinates: [34.08, 74.8],
    elevationM: 1585,
    district: 'Srinagar',
    subregion: 'Kashmir Valley',
    measuredParameters: ['Official IMD / SDMA / CWC / SASE Civil Disaster Bulletins'],
    samplingInterval: '10–30 minutes',
    spatialResolution: 'District / UT administrative polygons (J&K and Ladakh)',
    sourceEndpointOrCitation: 'https://sachet.ndma.gov.in/cap_public_website/rss/rss_india.xml',
    provenanceClass: 'government_statutory_record',
    freshnessThresholdMinutes: 60,
    calibrationStatus: 'Agency-Calibrated',
    publicOperationalLabel: 'Official NDMA SACHET CAP Bulletins (J&K / Ladakh Filtered)',
    limitations: 'Requires strict geographic filtering to J&K and Ladakh districts; does not cover AJ&K or Gilgit-Baltistan.',
  },
  {
    stationId: 'KEW-SAT-S2-LIMNOLOGY',
    stationName: 'Copernicus Sentinel-2 MSI Optical Limnology Archive',
    category: 'satellite_optical_limnology',
    ownerOperator: 'ESA / Copernicus Sentinel-2 L2A (Archived Scene Retrievals)',
    isKewOwnedPhysicalSensor: false,
    coordinates: [34.11, 74.86],
    elevationM: 1583,
    district: 'Srinagar',
    subregion: 'Kashmir Valley',
    measuredParameters: ['Red-Edge NDCI (B5/B4)', 'Optical Trophic Screening Class'],
    samplingInterval: '5-day satellite revisit (cloud-free scene dependent)',
    spatialResolution: '10–20 m multispectral pixels',
    sourceEndpointOrCitation: 'Copernicus Data Space Ecosystem (Archived Scene Metadata)',
    provenanceClass: 'satellite_remote_sensing',
    freshnessThresholdMinutes: null,
    calibrationStatus: 'Archival Benchmark Only',
    publicOperationalLabel: 'Archived Sentinel-2 Optical NDCI Scene',
    limitations: 'Static scene retrieval snapshots; uncalibrated for region-specific CDOM/macrophyte interference without synchronous boat sampling.',
  },
];

export function getMonitoringInfrastructureSummary() {
  const byProvenance: Record<string, number> = {};
  for (const rec of MONITORING_INFRASTRUCTURE_REGISTRY) {
    byProvenance[rec.provenanceClass] = (byProvenance[rec.provenanceClass] || 0) + 1;
  }
  return {
    kewOwnedPhysicalSensorsCount: KEW_OWNED_PHYSICAL_SENSORS_COUNT,
    registeredExternalFeedsAndBenchmarksCount: MONITORING_INFRASTRUCTURE_REGISTRY.length,
    liveExternalFeedsCount: MONITORING_INFRASTRUCTURE_REGISTRY.filter((r) => r.freshnessThresholdMinutes !== null).length,
    staticBenchmarkRegistriesCount: MONITORING_INFRASTRUCTURE_REGISTRY.filter((r) => r.freshnessThresholdMinutes === null).length,
    byProvenance,
  };
}
