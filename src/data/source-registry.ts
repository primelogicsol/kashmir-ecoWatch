export interface SourceProvenanceRecord {
  id: string;
  publicLabel: string;
  evidenceClass: 'Direct Ground In-Situ' | 'Satellite Remote Sensing' | 'Numerical Hydrodynamic Model' | 'Official Warning Aggregation' | 'Field Survey';
  originalProducer: string;
  ingestionMechanism: string;
  updateCadence: string;
  geographicCoverage: string[];
  licenseAttribution: string;
  kewModule: string;
  openDataCategory: string;
}

export const sourceRegistry: Record<string, SourceProvenanceRecord> = {
  'flash-flood-alerts': {
    id: 'flash-flood-alerts',
    publicLabel: 'KEW Flash Flood Hazard Status',
    evidenceClass: 'Official Warning Aggregation',
    originalProducer: 'Disaster Management Authorities (NDMA / IMD / SDMA)',
    ingestionMechanism: 'CAP XML Protocol Stream',
    updateCadence: 'Continuous / Near-Real-Time',
    geographicCoverage: ['Kashmir Valley', 'Jammu', 'Ladakh'],
    licenseAttribution: 'Public Emergency Broadcast / Open Government Data',
    kewModule: '/hazard-intelligence/flash-floods',
    openDataCategory: 'Floods & Flash Floods'
  },
  'atmospheric-forecast': {
    id: 'atmospheric-forecast',
    publicLabel: 'Atmospheric Forecast Intelligence',
    evidenceClass: 'Numerical Hydrodynamic Model',
    originalProducer: 'European ECMWF / National Weather Services',
    ingestionMechanism: 'High-Resolution Numerical Weather Prediction (NWP) API',
    updateCadence: 'Hourly Simulation Re-runs',
    geographicCoverage: ['Western Himalaya (All 5 Regions)'],
    licenseAttribution: 'Copernicus / Open-Meteo Open Data License',
    kewModule: '/hazard-intelligence/flash-floods',
    openDataCategory: 'Climate Indicators & Trends'
  },
  'avalanche-hazard-bulletin': {
    id: 'avalanche-hazard-bulletin',
    publicLabel: 'KEW Snow & Avalanche Intelligence',
    evidenceClass: 'Official Warning Aggregation',
    originalProducer: 'Defense Geoinformatics Research Establishment (DGRE / DRDO) & Gulmarg Avalanche Center',
    ingestionMechanism: 'Alpine Snowpack Advisory Feed',
    updateCadence: 'Daily (Winter Seasonal)',
    geographicCoverage: ['Pir Panjal', 'Great Himalaya', 'Zojila-Dras Corridor'],
    licenseAttribution: 'Public Safety Broadcast',
    kewModule: '/hazard-intelligence/avalanches',
    openDataCategory: 'Avalanches'
  },
  'air-quality-telemetry': {
    id: 'air-quality-telemetry',
    publicLabel: 'KEW Air Quality Intelligence',
    evidenceClass: 'Direct Ground In-Situ',
    originalProducer: 'Central Pollution Control Board (CPCB) & State Pollution Control Boards',
    ingestionMechanism: 'Continuous Ambient Air Quality Monitoring Stations (CAAQMS)',
    updateCadence: 'Hourly Telemetry',
    geographicCoverage: ['Srinagar', 'Jammu', 'Leh'],
    licenseAttribution: 'National Air Quality Index (NAQI) Open Feeds',
    kewModule: '/environmental-monitoring/air-pollution',
    openDataCategory: 'Air Quality'
  },
  'river-hydrometry': {
    id: 'river-hydrometry',
    publicLabel: 'KEW Hydrological Intelligence',
    evidenceClass: 'Direct Ground In-Situ',
    originalProducer: 'Irrigation & Flood Control Department (J&K IFC) & Central Water Commission (CWC)',
    ingestionMechanism: 'Automated Gauge Telemetry & Calibrated Weir Readings',
    updateCadence: 'Hourly / Daily',
    geographicCoverage: ['Jhelum River Basin', 'Chenab River', 'Indus Tributaries'],
    licenseAttribution: 'Hydrometric Public Safety Monitoring',
    kewModule: '/water-systems/rivers',
    openDataCategory: 'Rivers & Streams'
  },
  'satellite-change-detection': {
    id: 'satellite-change-detection',
    publicLabel: 'KEW Satellite Change Detection & Earth Observation',
    evidenceClass: 'Satellite Remote Sensing',
    originalProducer: 'European Space Agency (Copernicus Sentinel-1/2) & USGS/NASA Landsat',
    ingestionMechanism: 'Automated Earth Observation Processing Pipelines',
    updateCadence: 'Weekly / Bi-Weekly Satellite Passes',
    geographicCoverage: ['Western Himalaya (All 5 Regions)'],
    licenseAttribution: 'Copernicus Open Access / USGS Public Domain',
    kewModule: '/earth-human-impact/change-detection-observatory',
    openDataCategory: 'Land Cover & Land-Use Change'
  },
  'seismic-monitoring': {
    id: 'seismic-monitoring',
    publicLabel: 'KEW Seismic Intelligence',
    evidenceClass: 'Direct Ground In-Situ',
    originalProducer: 'National Center for Seismology (NCS) & USGS Global Seismographic Network',
    ingestionMechanism: 'Real-Time FDSN Web Service Webhook',
    updateCadence: 'Real-Time Event Triggers',
    geographicCoverage: ['Kashmir Basin', 'Ladakh', 'Hindu Kush-Karakoram Fault Belts'],
    licenseAttribution: 'USGS / NCS Global Open Seismicity Network',
    kewModule: '/hazard-intelligence/earthquakes',
    openDataCategory: 'Earthquakes & Seismicity'
  },
  'landslide-susceptibility': {
    id: 'landslide-susceptibility',
    publicLabel: 'KEW Geological Susceptibility Intelligence',
    evidenceClass: 'Field Survey',
    originalProducer: 'Geological Survey of India (GSI) & Highway Field Monitoring',
    ingestionMechanism: 'Static Lithological Mapping with Antecedent Precipitation Model',
    updateCadence: 'Daily Rainfall Correlation',
    geographicCoverage: ['NH-44 Corridor', 'Mughal Road', '35 Geological Zones'],
    licenseAttribution: 'GSI Geohazard Atlas & Public Infrastructure Safety',
    kewModule: '/hazard-intelligence/landslides',
    openDataCategory: 'Landslides & Slope Instability'
  }
};
