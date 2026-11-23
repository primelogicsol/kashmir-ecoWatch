import {
  DisplaySubRegion,
  GeographicScope,
  SIX_SUBREGION_DEFINITIONS,
} from '@/lib/atmospheric-ingestion';

export type JetScope = GeographicScope;
export type JetSubRegion = DisplaySubRegion;

export type CirculationRegime =
  | 'Jet Core Overhead (≥130 km/h)'
  | '500 hPa Cyclonic Trough'
  | 'Upper-Level Blocking Ridge'
  | 'Moderate Zonal Westerlies'
  | 'Not Assessed';

export interface JetCirculationSector {
  id: string;
  name: string;
  district: string;
  subRegion: JetSubRegion;
  administrativeUnit: string;
  scope: JetScope;
  latitude: number;
  longitude: number;
  elevation_m: number;
  circulationRole: string;
  coupledModules: Array<'western-disturbances' | 'monsoon-dynamics' | 'avalanches' | 'air-pollution'>;
}

export interface GriddedJetLatitudeBand {
  latitude: number;
  label: string;
  zonalMeanU250Ms: number | null;
  zonalMeanU250Kmh: number | null;
  zonalMeanSpeed250Kmh: number | null;
  zonalMeanSpeed300Kmh: number | null;
  zonalMeanZ500Gpm: number | null;
  z500ClimatologyGpm: number;
  z500DepartureGpm: number | null;
  zonalMeanTemp500C: number | null;
  validLongitudesCount: number;
}

export interface JetSectorLiveRecord extends JetCirculationSector {
  isReporting: boolean;
  provenance: {
    analysisTier: 'Model Analysis' | 'Unavailable';
    forecastTier: 'Forecast' | 'Unavailable';
    validTimeUtc: string | null;
    modelGridElevationM: number | null;
  };
  liveUpperAir: {
    jet250_kmh: number | null;
    jet250_dir_deg: number | null;
    u250_ms: number | null;
    jet300_kmh: number | null;
    wind500_kmh: number | null;
    z500_gpm: number | null;
    z500_climatology_gpm: number;
    z500_departure_gpm: number | null;
    z500_24h_delta_gpm: number | null;
    temp500_c: number | null;
    pressure_msl_hpa: number | null;
    surface_gust_kmh: number | null;
    vertical_shear_kmh: number | null;
  };
  forecast7d: {
    peak_jet250_kmh: number | null;
    min_z500_gpm: number | null;
    max_z500_gpm: number | null;
    peak_surface_gust_kmh: number | null;
    valid_hourly_steps: number;
  };
  circulationRegime: CirculationRegime;
  regimeEvidence: string;
}

// Declared 2D Upper-Tropospheric Detection Domain: 9 latitudes (24°N..40°N) × 5 longitudes (70°E..80°E) = 45 grid nodes
export const SWJ_DETECTION_LATITUDES: Array<{ lat: number; label: string }> = [
  { lat: 24, label: '24°N · Northern Gujarat / Sindh Margin' },
  { lat: 26, label: '26°N · Thar–North Rajasthan' },
  { lat: 28, label: '28°N · Indo-Gangetic Plains' },
  { lat: 30, label: '30°N · Punjab Foreland' },
  { lat: 32, label: '32°N · Shivalik–Jammu Front' },
  { lat: 34, label: '34°N · Kashmir Valley & Pir Panjal' },
  { lat: 36, label: '36°N · Karakoram–Gilgit Crest' },
  { lat: 38, label: '38°N · Pamir–Tarim North Flank' },
  { lat: 40, label: '40°N · Tien Shan–Fergana Margin' },
];

export const SWJ_DETECTION_LONGITUDES: number[] = [70.0, 72.5, 75.0, 77.5, 80.0];

function mkSector(s: Omit<JetCirculationSector, 'administrativeUnit'>): JetCirculationSector {
  return {
    ...s,
    administrativeUnit: SIX_SUBREGION_DEFINITIONS[s.subRegion].administrativeUnit,
  };
}

export const JET_CIRCULATION_SECTORS: JetCirculationSector[] = [
  // KASHMIR (6)
  mkSector({ id: 'jet-kas-01', name: 'Srinagar – Valley Boundary Layer & Inversion Lid', district: 'Srinagar', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.0837, longitude: 74.7973, elevation_m: 1585, circulationRole: '500 hPa ridge subsidence traps Chillai Kalan smog; troughs ventilate basin', coupledModules: ['western-disturbances', 'air-pollution'] }),
  mkSector({ id: 'jet-kas-02', name: 'Gulmarg Bowl – Pir Panjal Shear Zone', district: 'Baramulla', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.0484, longitude: 74.3805, elevation_m: 2650, circulationRole: 'Mid-tropospheric jet momentum transfer & wind-slab snow transport', coupledModules: ['western-disturbances', 'avalanches'] }),
  mkSector({ id: 'jet-kas-03', name: 'Zoji La – Great Himalayan Gap-Wind Accelerator', district: 'Ganderbal', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.2787, longitude: 75.4719, elevation_m: 3528, circulationRole: 'Cross-range pressure gradients drive severe ageostrophic gap gales', coupledModules: ['western-disturbances', 'avalanches'] }),
  mkSector({ id: 'jet-kas-04', name: 'Pahalgam – Kolahoi Upper-Tropospheric Wave Sector', district: 'Anantnag', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.0161, longitude: 75.3150, elevation_m: 2150, circulationRole: 'Orographic gravity-wave amplification under strong 250 hPa jet streaks', coupledModules: ['western-disturbances', 'monsoon-dynamics'] }),
  mkSector({ id: 'jet-kas-05', name: 'Sadhna Pass – Kupwara Shamshabari Entry Crest', district: 'Kupwara', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.4072, longitude: 73.9497, elevation_m: 3100, circulationRole: 'First Kashmir ridge intercepting 500 hPa cold-pool vorticity maxima', coupledModules: ['western-disturbances', 'avalanches'] }),
  mkSector({ id: 'jet-kas-06', name: 'Peer Ki Gali – Shopian Pir Panjal Jet Divide', district: 'Shopian', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 33.6350, longitude: 74.5200, elevation_m: 3485, circulationRole: 'Separates subtropical foreland circulation from sheltered Kashmir basin', coupledModules: ['western-disturbances', 'monsoon-dynamics'] }),

  // JAMMU (5)
  mkSector({ id: 'jet-jmu-01', name: 'Jammu – Subtropical Jet Southern Core Axis', district: 'Jammu', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 32.7266, longitude: 74.8570, elevation_m: 327, circulationRole: 'Winter SWJ climatological core sits near 28°N–32°N directly aloft', coupledModules: ['western-disturbances', 'monsoon-dynamics'] }),
  mkSector({ id: 'jet-jmu-02', name: 'Banihal – Pir Panjal Mountain-Wave Rotor Zone', district: 'Ramban', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 33.4350, longitude: 75.1970, elevation_m: 1660, circulationRole: 'Leeward mountain-wave turbulence and pre-frontal squall corridor', coupledModules: ['western-disturbances'] }),
  mkSector({ id: 'jet-jmu-03', name: 'Sinthan Pass – Kishtwar Tropospheric Shear Crest', district: 'Kishtwar', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 33.5811, longitude: 75.5103, elevation_m: 3780, circulationRole: 'High vertical wind shear between Chenab gorge and 300/250 hPa jet stream', coupledModules: ['western-disturbances', 'avalanches'] }),
  mkSector({ id: 'jet-jmu-04', name: 'Poonch – Southwestern Westerly Diffluence Sector', district: 'Poonch', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 33.7670, longitude: 74.0921, elevation_m: 1010, circulationRole: 'Upper-level jet-exit diffluence enhances upward vertical motion', coupledModules: ['western-disturbances', 'monsoon-dynamics'] }),
  mkSector({ id: 'jet-jmu-05', name: 'Bhaderwah – Doda Mid-Tropospheric Trough Axis', district: 'Doda', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 32.9800, longitude: 75.7100, elevation_m: 1613, circulationRole: 'Tracks 500 hPa cold-core cutoffs triggering spring hail & squalls', coupledModules: ['western-disturbances'] }),

  // LADAKH (4)
  mkSector({ id: 'jet-ldk-01', name: 'Leh – Tibetan Anticyclone vs. Westerly Jet Boundary', district: 'Leh', subRegion: 'Ladakh', scope: 'Trans-Divisional', latitude: 34.1526, longitude: 77.5771, elevation_m: 3520, circulationRole: 'Monitors summer Tibetan High expansion vs. winter SWJ dominance', coupledModules: ['western-disturbances', 'monsoon-dynamics'] }),
  mkSector({ id: 'jet-ldk-02', name: 'Drass – Kargil Katabatic & Upper-Trough Coupling', district: 'Kargil', subRegion: 'Ladakh', scope: 'Trans-Divisional', latitude: 34.4275, longitude: 75.7510, elevation_m: 3230, circulationRole: 'Post-trough cold-air advection plunges winter valley temps <-25°C', coupledModules: ['western-disturbances', 'avalanches'] }),
  mkSector({ id: 'jet-ldk-03', name: 'Nyoma – Changthang High-Plateau 500 hPa Gauge', district: 'Leh', subRegion: 'Ladakh', scope: 'Trans-Divisional', latitude: 33.2050, longitude: 78.6500, elevation_m: 4180, circulationRole: 'Surface elevation (~600 hPa) directly samples mid-tropospheric flow', coupledModules: ['monsoon-dynamics', 'western-disturbances'] }),
  mkSector({ id: 'jet-ldk-04', name: 'Diskit – Nubra Karakoram Jet Streak Sector', district: 'Leh', subRegion: 'Ladakh', scope: 'Trans-Divisional', latitude: 34.5539, longitude: 77.5494, elevation_m: 3150, circulationRole: 'High-altitude 250 hPa jet streaks crossing eastern Karakoram crests', coupledModules: ['western-disturbances', 'avalanches'] }),

  // AZAD KASHMIR (3)
  mkSector({ id: 'jet-ajk-01', name: 'Muzaffarabad – Syntaxis Low-Level / Upper-Jet Coupling', district: 'Muzaffarabad', subRegion: 'Azad Kashmir', scope: 'Transboundary / Extended', latitude: 34.3700, longitude: 73.4711, elevation_m: 737, circulationRole: 'Couples low-level moisture advection with 250/300 hPa upper divergence', coupledModules: ['western-disturbances', 'monsoon-dynamics'] }),
  mkSector({ id: 'jet-ajk-02', name: 'Sharda – Upper Neelum Ridge Wind-Transport Zone', district: 'Neelum', subRegion: 'Azad Kashmir', scope: 'Transboundary / Extended', latitude: 34.7930, longitude: 74.1890, elevation_m: 1981, circulationRole: 'Strong cross-ridge winds load lee-slope avalanche starting zones', coupledModules: ['avalanches', 'western-disturbances'] }),
  mkSector({ id: 'jet-ajk-03', name: 'Mirpur – Sub-Himalayan Induced Cyclonic Circulation', district: 'Mirpur', subRegion: 'Azad Kashmir', scope: 'Transboundary / Extended', latitude: 33.1482, longitude: 73.7519, elevation_m: 459, circulationRole: 'Monitors induced low-level cyclonic circulations ahead of 500 hPa troughs', coupledModules: ['western-disturbances', 'monsoon-dynamics'] }),

  // GILGIT (3 — Gilgit-Baltistan Administrative Unit)
  mkSector({ id: 'jet-glt-01', name: 'Gilgit – Pamir–Karakoram Westerly Bifurcation', district: 'Gilgit', subRegion: 'Gilgit', scope: 'Transboundary / Extended', latitude: 35.9208, longitude: 74.3144, elevation_m: 1460, circulationRole: 'Tracks northern vs. southern branch splitting of the Westerly Jet around Pamir', coupledModules: ['western-disturbances'] }),
  mkSector({ id: 'jet-glt-02', name: 'Khunjerab Pass – Hunza 4,693m Upper-Flow Gate', district: 'Hunza', subRegion: 'Gilgit', scope: 'Transboundary / Extended', latitude: 36.8500, longitude: 75.4200, elevation_m: 4693, circulationRole: 'Samples Central Asian cold-core troughs entering northern Karakoram', coupledModules: ['western-disturbances', 'avalanches'] }),
  mkSector({ id: 'jet-glt-03', name: 'Chilas – Nanga Parbat Orographic Wake Sector', district: 'Diamer', subRegion: 'Gilgit', scope: 'Transboundary / Extended', latitude: 35.4206, longitude: 74.0969, elevation_m: 1265, circulationRole: '8,126m massif generates synoptic wake vortices & Indus gorge gales', coupledModules: ['western-disturbances', 'avalanches'] }),

  // BALTISTAN (3 — Gilgit-Baltistan Administrative Unit)
  mkSector({ id: 'jet-blt-01', name: 'Skardu – Indus Valley Foehn & Katabatic Channel', district: 'Skardu', subRegion: 'Baltistan', scope: 'Transboundary / Extended', latitude: 35.2971, longitude: 75.6333, elevation_m: 2228, circulationRole: 'Channelized valley dust/wind storms driven by synoptic pressure gradients', coupledModules: ['western-disturbances', 'air-pollution'] }),
  mkSector({ id: 'jet-blt-02', name: 'Concordia – Baltoro 250 hPa Jet Core Monitor', district: 'Shigar', subRegion: 'Baltistan', scope: 'Transboundary / Extended', latitude: 35.7400, longitude: 76.5100, elevation_m: 4650, circulationRole: 'Monitors 8,000m-level hurricane-force Subtropical Westerly Jet streaks', coupledModules: ['western-disturbances', 'avalanches'] }),
  mkSector({ id: 'jet-blt-03', name: 'Deosai Plateau – Baroclinic Trough Sensor', district: 'Skardu', subRegion: 'Baltistan', scope: 'Transboundary / Extended', latitude: 35.0100, longitude: 75.4400, elevation_m: 4114, circulationRole: 'Unobstructed 4,100m plateau tracking 500 hPa geopotential height swings', coupledModules: ['western-disturbances'] }),
];

export const HISTORICAL_CIRCULATION_RECORDS = [
  { id: 'circ-2025-block', title: 'Winter 2024–25 Persistent Tibeto-Himalayan 500 hPa Blocking High', period: 'Dec 2024 – Mid-Feb 2025', mechanism: 'Anomalous positive 500 hPa geopotential height departure (+80 to +120 gpm) deflected the Subtropical Westerly Jet northward into Central Asia.', impact: 'Produced a ~75% winter snow deficit across Kashmir & Jammu, severe valley PM2.5 stagnation, and early spring forest-fire outbreaks.', source: 'IMD Extended Range Diagnostics & ECMWF ERA5 Reanalysis' },
  { id: 'circ-2022-heat', title: 'March–May 2022 Subtropical Anticyclone & Zero-Degree Isotherm Surge', period: 'March–May 2022', mechanism: 'Stationary upper-tropospheric ridge suppressed spring WDs and pushed 500 hPa temperatures +4.5°C above climatology.', impact: 'Triggered premature snowmelt, Shisper (Hunza) GLOF bridge collapse, and record spring temperatures across Srinagar, Leh, and Gilgit.', source: 'WMO State of the Global Climate in Asia (2022)' },
  { id: 'circ-2010-rossby', title: 'July–August 2010 Eurasian Rossby Wave-Train Phase-Locking', period: 'Late July – Early August 2010', mechanism: 'Amplified mid-latitude Rossby wave blocking over western Russia forced downstream 250 hPa jet bifurcation over northern Pakistan & Ladakh.', impact: 'Steered monsoonal vorticity anomalously north across the Karakoram and Ladakh, driving Indus basin floods and the Leh cloudburst.', source: 'Lau & Kim (2012) Journal of Hydrometeorology' },
];

export const JET_VERIFIED_SOURCES = [
  { name: 'Open-Meteo 45-Node 2D Upper-Tropospheric Jet Domain (24°N–40°N × 70°E–80°E)', tier: 'Model Analysis & Derived Index', endpoint: 'https://api.open-meteo.com/v1/forecast', parameters: 'Zonally-averaged 250 hPa zonal wind u₂₅₀ (m/s & km/h), parabolic SWJ core latitude detector, 300/500 hPa winds & heights', resolution: '2° lat × 2.5° lon synoptic grid (ECMWF IFS / GFS / ICON)', cadence: 'Hourly UTC pressure-level analysis' },
  { name: 'Open-Meteo 24-Sector Regional Circulation & Shear Grid', tier: 'Model Analysis & Forecast', endpoint: 'https://api.open-meteo.com/v1/forecast', parameters: '250/300/500 hPa winds, 500 hPa geopotential height (gpm) vs seasonal-latitudinal ERA5 climatology, 500 hPa temperature, surface gusts', resolution: '0.1°–0.25° NWP grid', cadence: 'Hourly UTC analysis + 168h NWP forecast' },
];
