export type JetScope = 'Kashmir Core' | 'Trans-Divisional' | 'Transboundary / Extended';
export type JetSubRegion = 'Kashmir' | 'Jammu' | 'Ladakh' | 'Azad Kashmir' | 'Gilgit' | 'Baltistan';

export interface JetCirculationSector {
  id: string;
  name: string;
  district: string;
  subRegion: JetSubRegion;
  scope: JetScope;
  latitude: number;
  longitude: number;
  elevation_m: number;
  circulationRole: string;
  coupledModules: Array<'western-disturbances' | 'monsoon-dynamics' | 'avalanches' | 'air-pollution'>;
}

export interface MeridionalTransectPoint {
  id: string;
  label: string;
  latitude: number;
  longitude: number;
}

export interface JetSectorLiveRecord extends JetCirculationSector {
  liveUpperAir: {
    jet250_kmh: number;
    jet250_dir_deg: number;
    jet300_kmh: number;
    wind500_kmh: number;
    z500_gpm: number;
    z500_24h_delta_gpm: number;
    temp500_c: number;
    pressure_msl_hpa: number;
    surface_gust_kmh: number;
    vertical_shear_kmh: number;
  };
  forecast7d: {
    peak_jet250_kmh: number;
    min_z500_gpm: number;
    max_z500_gpm: number;
    peak_surface_gust_kmh: number;
  };
  circulationRegime: 'Jet Core Overhead (>130 km/h)' | '500 hPa Cyclonic Trough' | 'Upper-Level Blocking Ridge' | 'Moderate Zonal Westerlies';
}

// 7-Point Latitudinal Transect at 75°E to locate exact Subtropical Westerly Jet axis
export const MERIDIONAL_JET_TRANSECT: MeridionalTransectPoint[] = [
  { id: 'tr-26n', label: '26°N · Thar–North Rajasthan', latitude: 26.0, longitude: 75.0 },
  { id: 'tr-28n', label: '28°N · Indo-Gangetic Plains', latitude: 28.0, longitude: 75.0 },
  { id: 'tr-30n', label: '30°N · Punjab Foreland', latitude: 30.0, longitude: 75.0 },
  { id: 'tr-32n', label: '32°N · Shivalik–Jammu Front', latitude: 32.0, longitude: 75.0 },
  { id: 'tr-34n', label: '34°N · Kashmir Valley & Pir Panjal', latitude: 34.0, longitude: 75.0 },
  { id: 'tr-36n', label: '36°N · Karakoram–Gilgit Crest', latitude: 36.0, longitude: 75.0 },
  { id: 'tr-38n', label: '38°N · Pamir–Tarim North Flank', latitude: 38.0, longitude: 75.0 },
];

export const JET_CIRCULATION_SECTORS: JetCirculationSector[] = [
  // KASHMIR (6)
  { id: 'jet-kas-01', name: 'Srinagar – Valley Boundary Layer & Inversion Lid', district: 'Srinagar', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.0837, longitude: 74.7973, elevation_m: 1585, circulationRole: '500 hPa ridge subsidence traps Chillai Kalan smog; troughs ventilate basin', coupledModules: ['western-disturbances', 'air-pollution'] },
  { id: 'jet-kas-02', name: 'Gulmarg – Apharwat 700 hPa Crest Shear Zone', district: 'Baramulla', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.0484, longitude: 74.3805, elevation_m: 3980, circulationRole: 'Direct exposure to mid-tropospheric jet momentum & wind-slab transport', coupledModules: ['western-disturbances', 'avalanches'] },
  { id: 'jet-kas-03', name: 'Zoji La – Great Himalayan Gap-Wind Accelerator', district: 'Ganderbal', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.2800, longitude: 75.4700, elevation_m: 3528, circulationRole: 'Cross-range pressure gradients drive severe ageostrophic gap gales', coupledModules: ['western-disturbances', 'avalanches'] },
  { id: 'jet-kas-04', name: 'Pahalgam – Kolahoi Upper-Tropospheric Wave Sector', district: 'Anantnag', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.0161, longitude: 75.3150, elevation_m: 2750, circulationRole: 'Orographic gravity-wave amplification under strong 250 hPa jet streaks', coupledModules: ['western-disturbances', 'monsoon-dynamics'] },
  { id: 'jet-kas-05', name: 'Kupwara – Shamshabari Westerly Entry Crest', district: 'Kupwara', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.5262, longitude: 74.2546, elevation_m: 3100, circulationRole: 'First Kashmir ridge intercepting 500 hPa cold-pool vorticity maxima', coupledModules: ['western-disturbances', 'avalanches'] },
  { id: 'jet-kas-06', name: 'Shopian – Peer Ki Gali Pir Panjal Jet Divide', district: 'Shopian', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 33.6350, longitude: 74.5200, elevation_m: 3485, circulationRole: 'Separates subtropical foreland circulation from sheltered Kashmir basin', coupledModules: ['western-disturbances', 'monsoon-dynamics'] },

  // JAMMU (5)
  { id: 'jet-jmu-01', name: 'Jammu – Subtropical Jet Southern Core Axis', district: 'Jammu', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 32.7266, longitude: 74.8570, elevation_m: 327, circulationRole: 'Winter SWJ climatological core sits near 28°N–32°N directly aloft', coupledModules: ['western-disturbances', 'monsoon-dynamics'] },
  { id: 'jet-jmu-02', name: 'Banihal – Pir Panjal Mountain-Wave Rotor Zone', district: 'Ramban', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 33.4350, longitude: 75.2000, elevation_m: 2200, circulationRole: 'Leeward mountain-wave turbulence and pre-frontal squall corridor', coupledModules: ['western-disturbances'] },
  { id: 'jet-jmu-03', name: 'Kishtwar –Sinthan & Chenab Tropospheric Shear', district: 'Kishtwar', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 33.5800, longitude: 75.5100, elevation_m: 3780, circulationRole: 'High vertical wind shear between Chenab gorge and 300 hPa jet stream', coupledModules: ['western-disturbances', 'avalanches'] },
  { id: 'jet-jmu-04', name: 'Poonch – Southwestern Westerly Diffluence Sector', district: 'Poonch', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 33.7670, longitude: 74.0921, elevation_m: 1850, circulationRole: 'Upper-level jet-exit diffluence enhances upward vertical motion', coupledModules: ['western-disturbances', 'monsoon-dynamics'] },
  { id: 'jet-jmu-05', name: 'Doda – Bhaderwah Mid-Tropospheric Trough Axis', district: 'Doda', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 33.1457, longitude: 75.5480, elevation_m: 1610, circulationRole: 'Tracks 500 hPa cold-core cutoffs triggering spring hail & squalls', coupledModules: ['western-disturbances'] },

  // LADAKH (4)
  { id: 'jet-ldk-01', name: 'Leh – Tibetan Anticyclone vs. Westerly Jet Boundary', district: 'Leh', subRegion: 'Ladakh', scope: 'Trans-Divisional', latitude: 34.1526, longitude: 77.5771, elevation_m: 3520, circulationRole: 'Monitors summer Tibetan High expansion vs. winter SWJ dominance', coupledModules: ['western-disturbances', 'monsoon-dynamics'] },
  { id: 'jet-ldk-02', name: 'Kargil – Drass Katabatic & Upper-Trough Coupling', district: 'Kargil', subRegion: 'Ladakh', scope: 'Trans-Divisional', latitude: 34.4275, longitude: 75.7510, elevation_m: 3120, circulationRole: 'Post-trough Arctic/Central Asian cold-air advection plunges temps <-25°C', coupledModules: ['western-disturbances', 'avalanches'] },
  { id: 'jet-ldk-03', name: 'Changthang – Nyoma High-Plateau 500 hPa Direct Gauge', district: 'Leh', subRegion: 'Ladakh', scope: 'Trans-Divisional', latitude: 33.2050, longitude: 78.6500, elevation_m: 4180, circulationRole: 'Surface elevation (~580 hPa) directly samples mid-tropospheric flow', coupledModules: ['monsoon-dynamics', 'western-disturbances'] },
  { id: 'jet-ldk-04', name: 'Siachen – Eastern Karakoram Jet Streak Crest', district: 'Leh', subRegion: 'Ladakh', scope: 'Trans-Divisional', latitude: 35.4210, longitude: 77.1090, elevation_m: 5400, circulationRole: 'Extreme 500–300 hPa plume winds (>150 km/h) over accumulation ridges', coupledModules: ['western-disturbances', 'avalanches'] },

  // AZAD KASHMIR (3)
  { id: 'jet-ajk-01', name: 'Muzaffarabad – Syntaxis Low-Level / Upper-Jet Coupling', district: 'Muzaffarabad', subRegion: 'Azad Kashmir', scope: 'Transboundary / Extended', latitude: 34.3700, longitude: 73.4711, elevation_m: 737, circulationRole: 'Couples 850 hPa southerly moisture jets with 300 hPa upper divergence', coupledModules: ['western-disturbances', 'monsoon-dynamics'] },
  { id: 'jet-ajk-02', name: 'Neelum – Upper Kel Ridge Wind-Transport Zone', district: 'Neelum', subRegion: 'Azad Kashmir', scope: 'Transboundary / Extended', latitude: 34.7930, longitude: 74.1890, elevation_m: 2600, circulationRole: 'Strong cross-ridge winds load lee-slope avalanche starting zones', coupledModules: ['avalanches', 'western-disturbances'] },
  { id: 'jet-ajk-03', name: 'Mirpur – Sub-Himalayan Induced Cyclonic Circulation', district: 'Mirpur', subRegion: 'Azad Kashmir', scope: 'Transboundary / Extended', latitude: 33.1482, longitude: 73.7519, elevation_m: 459, circulationRole: 'Monitors induced low-level cyclonic circulations ahead of 500 hPa troughs', coupledModules: ['western-disturbances', 'monsoon-dynamics'] },

  // GILGIT (3)
  { id: 'jet-glt-01', name: 'Gilgit – Pamir–Karakoram Westerly Bifurcation', district: 'Gilgit', subRegion: 'Gilgit', scope: 'Transboundary / Extended', latitude: 35.9208, longitude: 74.3144, elevation_m: 1500, circulationRole: 'Tracks northern vs. southern branch splitting of the Westerly Jet around Pamir', coupledModules: ['western-disturbances'] },
  { id: 'jet-glt-02', name: 'Hunza – Khunjerab 4,700m Upper-Flow Gate', district: 'Hunza', subRegion: 'Gilgit', scope: 'Transboundary / Extended', latitude: 36.8500, longitude: 75.4200, elevation_m: 4693, circulationRole: 'Samples Central Asian cold-core troughs entering northern Karakoram', coupledModules: ['western-disturbances', 'avalanches'] },
  { id: 'jet-glt-03', name: 'Diamer – Nanga Parbat Orographic Wake Sector', district: 'Diamer', subRegion: 'Gilgit', scope: 'Transboundary / Extended', latitude: 35.2375, longitude: 74.5890, elevation_m: 4200, circulationRole: '8,126m massif generates intense synoptic wake vortices & valley winds', coupledModules: ['western-disturbances', 'avalanches'] },

  // BALTISTAN (3)
  { id: 'jet-blt-01', name: 'Skardu – Indus Valley Foehn & Katabatic Channel', district: 'Skardu', subRegion: 'Baltistan', scope: 'Transboundary / Extended', latitude: 35.2971, longitude: 75.6333, elevation_m: 2228, circulationRole: 'Channelized valley dust/wind storms driven by synoptic pressure gradients', coupledModules: ['western-disturbances', 'air-pollution'] },
  { id: 'jet-blt-02', name: 'Baltoro – K2 / Concordia 250 hPa Jet Core Monitor', district: 'Shigar', subRegion: 'Baltistan', scope: 'Transboundary / Extended', latitude: 35.7400, longitude: 76.5100, elevation_m: 4650, circulationRole: 'Monitors 8,000m-level hurricane-force Subtropical Westerly Jet streaks', coupledModules: ['western-disturbances', 'avalanches'] },
  { id: 'jet-blt-03', name: 'Deosai – High-Altitude Baroclinic Trough Sensor', district: 'Skardu', subRegion: 'Baltistan', scope: 'Transboundary / Extended', latitude: 35.0100, longitude: 75.4400, elevation_m: 4114, circulationRole: 'Unobstructed 4,100m plateau tracking 500 hPa geopotential height swings', coupledModules: ['western-disturbances'] },
];

export const HISTORICAL_CIRCULATION_RECORDS = [
  {
    id: 'circ-2025-block',
    title: 'Winter 2024–25 Persistent Tibeto-Himalayan 500 hPa Blocking High',
    period: 'Dec 2024 – Mid-Feb 2025',
    mechanism: 'Anomalous positive 500 hPa geopotential height anomaly (+80 to +120 gpm) deflected the Subtropical Westerly Jet northward into Central Asia.',
    impact: 'Produced a ~75% winter snow deficit across Kashmir & Jammu, severe valley PM2.5 stagnation, and early spring forest-fire outbreaks before late-Feb trough breakdown.',
    source: 'IMD Extended Range Diagnostics & ECMWF ERA5 Reanalysis',
  },
  {
    id: 'circ-2022-heat',
    title: 'March–May 2022 Subtropical Anticyclone & Zero-Degree Isotherm Surge',
    period: 'March–May 2022',
    mechanism: 'Stationary upper-tropospheric ridge suppressed spring WDs and pushed 500 hPa temperatures +4.5°C above climatology.',
    impact: 'Triggered premature snowmelt, Shisper (Hunza) GLOF bridge collapse, and record spring temperatures across Srinagar, Leh, and Gilgit.',
    source: 'WMO State of the Global Climate in Asia (2022)',
  },
  {
    id: 'circ-2010-rossby',
    title: 'July–August 2010 Eurasian Rossby Wave-Train Phase-Locking',
    period: 'Late July – Early August 2010',
    mechanism: 'Amplified mid-latitude Rossby wave blocking over western Russia forced downstream 250 hPa jet bifurcation over northern Pakistan & Ladakh.',
    impact: 'Steered monsoonal vorticity anomalously north across the Karakoram and Ladakh, driving historic Indus basin floods and the Leh cloudburst.',
    source: 'Lau & Kim (2012) Journal of Hydrometeorology',
  },
];
