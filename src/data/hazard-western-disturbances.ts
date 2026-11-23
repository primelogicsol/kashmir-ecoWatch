export type WDScope = 'Kashmir Core' | 'Trans-Divisional' | 'Transboundary / Extended';

export type WDSubRegion =
  | 'Kashmir'
  | 'Jammu'
  | 'Ladakh'
  | 'Azad Kashmir'
  | 'Gilgit'
  | 'Baltistan';

export type DataProvenanceTier =
  | 'MODEL_NOWCAST_ANALYSIS'
  | 'NUMERICAL_FORECAST'
  | 'LIVE_RADAR_OBSERVATION'
  | 'EXTERNAL_AGENCY_PORTAL'
  | 'HISTORICAL_RECORD';

export type WDPhase =
  | 'Active Synoptic Trough Passage'
  | 'Approaching Baroclinic Wave (48–168h)'
  | 'Post-Trough Cold Advection'
  | 'Zonal Westerly Flow'
  | 'Subtropical 500 hPa Ridge';

export type ForecastPrecipPhase =
  | 'Dry (0 mm / 7d)'
  | 'Snow-Dominant (≥75% Snow Equiv)'
  | 'Rain–Snow Transition Mix'
  | 'Liquid Rain-Dominant';

export type CompoundRiskLevel =
  | 'No Active WD Trigger'
  | 'Low'
  | 'Moderate'
  | 'High'
  | 'Critical';

export interface WDCorridorStation {
  id: string;
  name: string;
  district: string;
  subRegion: WDSubRegion;
  scope: WDScope;
  latitude: number;
  longitude: number;
  elevation_m: number;
  orographic_zone: string;
  /** Static winter climatological terrain zone (never conflated with current/7d weather phase) */
  winter_terrain_climatology:
    | 'Alpine Snowpack Zone'
    | 'Valley Rain–Snow Transition'
    | 'Foothill Frontal Rain Belt'
    | 'Trans-Himalayan Arid Cryosphere';
  primary_coupled_hazards: Array<'floods' | 'flash-floods' | 'landslides' | 'avalanches'>;
  key_infrastructure_exposed: string;
}

export interface UpstreamSynopticNode {
  id: string;
  name: string;
  sector: string;
  country: string;
  latitude: number;
  longitude: number;
  distanceToKashmirKm: number;
}

export interface SynopticWaveguideGridNode {
  lon: number;
  sectorLabel: string;
  z500_gpm: number;
  z500_curvature_gpm: number;
  vorticity300_1e5s: number;
  vorticity500_1e5s: number;
  jet300_kmh: number;
  jet300_dir_deg: number;
  featureState: 'Cyclonic WD Trough' | 'Weak Shortwave' | 'Zonal Waveguide' | 'Anticyclonic Ridge';
}

export interface DetectedWDTrackPoint {
  stepHoursFromNow: number;
  timeUtc: string;
  state: 'ANALYZED_PAST' | 'ANALYZED_0H' | 'NWP_FORECAST';
  latitude: number;
  longitude: number;
  sectorName: string;
  vorticity300_1e5s: number;
  z500_gpm: number;
  z500_curvature_gpm: number;
  steeringSpeedKmh: number;
  steeringDirDeg: number;
}

export interface DetectedWDSystem {
  systemId: string;
  classification:
    | 'Active Regional WD (70°E–78°E)'
    | 'Approaching Upstream WD (<70°E)'
    | 'Forecast Synoptic Trough (NWP)';
  detectionMethod: string;
  currentOrGenesisLat: number;
  currentOrGenesisLon: number;
  currentSector: string;
  distanceWestOfKashmirKm: number;
  propagationDirectionDeg: number;
  propagationDirectionLabel: string;
  propagationSpeedKmh: number;
  peakVorticity300_1e5s: number;
  minZ500Gpm: number;
  maxTroughCurvatureGpm: number;
  expectedApproachWindow: {
    westernEntryUtc: string | null;
    corePeakUtc: string | null;
    easternClearanceUtc: string | null;
    windowSummary: string;
  };
  forecastConfidence: 'High' | 'Moderate' | 'Low';
  confidenceScorePct: number;
  confidenceRationale: string;
  trackPoints: DetectedWDTrackPoint[];
}

export interface WDCorridorLiveRecord extends WDCorridorStation {
  provenance: {
    analysisTier: 'MODEL_NOWCAST_ANALYSIS';
    forecastTier: 'NUMERICAL_FORECAST';
    provider: string;
    modelRunInitUtc: string;
    analyzedAtUtc: string;
    modelGridElevationM: number;
    elevationOffsetM: number;
  };
  forecastCompleteness: {
    validHourlySteps: number;
    expectedHourlySteps: number;
    completenessPct: number;
    status: 'COMPLETE' | 'PARTIAL';
  };
  /** 0-hour NWP Model Analysis / Assimilated Nowcast (NOT a physical ground station gauge) */
  liveObservation: {
    temp_c: number;
    humidity_pct: number;
    pressure_msl_hpa: number;
    pressure_24h_delta_hpa: number;
    cloud_cover_pct: number;
    precip_current_mm: number;
    rain_current_mm: number;
    snowfall_current_cm: number;
    wind_speed_kmh: number;
    wind_gusts_kmh: number;
    wind_dir_deg: number;
    z500_gpm: number;
    z500_anomaly_gpm: number;
    jet300_kmh: number;
    freezing_level_m: number;
    past48h_precip_mm: number;
    past48h_snow_cm: number;
  };
  forecast7d: {
    total_precip_mm: number;
    hourly_sum_precip_mm: number;
    total_rain_mm: number;
    total_snow_cm: number;
    peak_daily_precip_mm: number;
    peak_precip_date: string;
    max_precip_prob_pct: number;
    max_wind_gust_kmh: number;
    min_freezing_level_m: number;
    forecast_precip_phase: ForecastPrecipPhase;
    daily: Array<{
      date: string;
      precip_mm: number;
      rain_mm: number;
      snow_cm: number;
      prob_pct: number;
      tmax_c: number;
      tmin_c: number;
      gust_kmh: number;
    }>;
  };
  wdPhase: WDPhase;
  synopticEvidence: string;
  intensityLabel: 'Dry / Synoptic Ridge' | 'Weak Shortwave' | 'Moderate WD' | 'Intense / Active WD';
  compoundTriggers: {
    hasActiveWDForcing: boolean;
    floods: CompoundRiskLevel;
    flashFloods: CompoundRiskLevel;
    landslides: CompoundRiskLevel;
    avalanches: CompoundRiskLevel;
    overallRisk: CompoundRiskLevel;
    thresholdSummary: string;
  };
}

export interface UpstreamLiveCheckpoint extends UpstreamSynopticNode {
  provenanceTier: 'MODEL_NOWCAST_ANALYSIS';
  pressure_msl_hpa: number;
  pressure_24h_delta_hpa: number;
  z500_gpm: number;
  z500_curvature_gpm: number;
  vorticity300_1e5s: number;
  jet300_kmh: number;
  jet300_dir_deg: number;
  cloud_cover_pct: number;
  precip_current_mm: number;
  next72h_precip_mm: number;
  troughSignal: 'Active Trough' | 'Developing Wave' | 'Zonal Flow' | 'High-Pressure Ridge';
}

export interface OfficialAgencySource {
  id: string;
  agency: string;
  division: string;
  jurisdiction: string;
  subRegionsCovered: WDSubRegion[];
  bulletinType: string;
  portalUrl: string;
  provenanceTier: 'EXTERNAL_AGENCY_PORTAL';
  ingestionStatus: 'External Statutory Portal (Manual Check — No Live CAP/API Feed)';
  livePortalReachable?: boolean;
  httpStatus?: number | null;
  checkedAtUtc?: string | null;
  cadence: string;
  notes: string;
}

export interface HistoricalWDRecord {
  id: string;
  eventCode: string;
  title: string;
  dates: string;
  season: 'Winter (Chillai Kalan)' | 'Late Winter / Spring' | 'Monsoon–WD Interaction' | 'Early Autumn';
  intensityCategory: 'Extreme Compound WD' | 'Severe Blizzard WD' | 'Intense Convective WD' | 'Twin Synoptic WD';
  min500hPaHeightGpm: number;
  peakPrecipOrSnow: string;
  subRegionsAffected: WDSubRegion[];
  triggeredHazards: Array<'Floods' | 'Flash Floods' | 'Landslides' | 'Avalanches'>;
  documentedImpact: string;
  primarySource: string;
  provenanceTier: 'HISTORICAL_RECORD';
}

// ─── 0. Synoptic Waveguide Longitude Labels (30°E to 75°E at 5° spacing) ─────
export const WAVEGUIDE_LONGITUDE_SECTORS: Array<{ lon: number; label: string }> = [
  { lon: 30, label: 'Eastern Mediterranean (30°E)' },
  { lon: 35, label: 'Cyprus / Levant Basin (35°E)' },
  { lon: 40, label: 'Upper Mesopotamia (40°E)' },
  { lon: 45, label: 'Caucasus / Zagros West (45°E)' },
  { lon: 50, label: 'South Caspian / Alborz (50°E)' },
  { lon: 55, label: 'Central Iranian Plateau (55°E)' },
  { lon: 60, label: 'Sistan / Khorasan Gate (60°E)' },
  { lon: 65, label: 'Helmand / Central Afghan (65°E)' },
  { lon: 70, label: 'Hindu Kush / Chitral Entry (70°E)' },
  { lon: 75, label: 'Western Himalaya / Kashmir Core (75°E)' },
];

// ─── 1. Upstream Mediterranean → Caspian → Hindu Kush → Himalaya Checkpoints ─
export const UPSTREAM_SYNOPTIC_CORRIDOR: UpstreamSynopticNode[] = [
  {
    id: 'up-med',
    name: 'Eastern Mediterranean Genesis Sector',
    sector: 'Cyclogenesis Origin (33.4°E)',
    country: 'Cyprus / Levant Basin',
    latitude: 35.12,
    longitude: 33.42,
    distanceToKashmirKm: 3680,
  },
  {
    id: 'up-cas',
    name: 'South Caspian & Alborz Wave Guide',
    sector: 'Moisture Recharge Sector (51.4°E)',
    country: 'Iran Plateau',
    latitude: 35.69,
    longitude: 51.39,
    distanceToKashmirKm: 2090,
  },
  {
    id: 'up-hrt',
    name: 'Herat – Khorasan Synoptic Gate',
    sector: 'Mid-Latitude Trough Transit (62.2°E)',
    country: 'Western Afghanistan',
    latitude: 34.35,
    longitude: 62.20,
    distanceToKashmirKm: 1150,
  },
  {
    id: 'up-kbl',
    name: 'Kabul – Hindu Kush Orographic Barrier',
    sector: 'Pre-Himalayan Uplift (69.2°E)',
    country: 'Afghanistan',
    latitude: 34.55,
    longitude: 69.21,
    distanceToKashmirKm: 510,
  },
  {
    id: 'up-cht',
    name: 'Chitral – Pamir Entry Saddle',
    sector: 'Western Himalayan Entry (71.8°E)',
    country: 'Hindu Kush–Karakoram',
    latitude: 35.85,
    longitude: 71.78,
    distanceToKashmirKm: 315,
  },
  {
    id: 'up-sgr',
    name: 'Kashmir Valley & Pir Panjal Core',
    sector: 'Primary Orographic Lock (74.8°E)',
    country: 'Western Himalaya Core',
    latitude: 34.08,
    longitude: 74.80,
    distanceToKashmirKm: 0,
  },
];

// ─── 2. Verified 31 Regional Corridors Across All 6 Sub-Regions ──────────────
// Coordinates and station elevations audited against IMD / PMD stations & Copernicus 90m DEM.
export const WD_CORRIDOR_STATIONS: WDCorridorStation[] = [
  // KASHMIR (10 Corridors — Kashmir Core)
  {
    id: 'wd-kas-01',
    name: 'Srinagar Valley Floor Observatory',
    district: 'Srinagar',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 34.0837,
    longitude: 74.7973,
    elevation_m: 1585,
    orographic_zone: 'Jhelum Alluvial Basin',
    winter_terrain_climatology: 'Valley Rain–Snow Transition',
    primary_coupled_hazards: ['floods', 'flash-floods'],
    key_infrastructure_exposed: 'Ram Munshi Bagh flood gauge, urban storm drainage & NH-44 bypass',
  },
  {
    id: 'wd-kas-02',
    name: 'Gulmarg Bowl – Pir Panjal Observatory',
    district: 'Baramulla',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 34.0484,
    longitude: 74.3805,
    elevation_m: 2650,
    orographic_zone: 'Pir Panjal Windward Escarpment',
    winter_terrain_climatology: 'Alpine Snowpack Zone',
    primary_coupled_hazards: ['avalanches', 'landslides'],
    key_infrastructure_exposed: 'Gulmarg Gondola Bowl, Tangmarg mountain road & alpine ski basins',
  },
  {
    id: 'wd-kas-03',
    name: 'Zoji La Pass – Sonamarg Cryospheric Saddle',
    district: 'Ganderbal',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 34.2787,
    longitude: 75.4719,
    elevation_m: 3528,
    orographic_zone: 'Great Himalayan Range Crest',
    winter_terrain_climatology: 'Alpine Snowpack Zone',
    primary_coupled_hazards: ['avalanches', 'landslides', 'flash-floods'],
    key_infrastructure_exposed: 'NH-1 Srinagar–Leh Highway, Zoji La Tunnel portals & Sindh headwaters',
  },
  {
    id: 'wd-kas-04',
    name: 'Pahalgam – Lidder Valley Observatory',
    district: 'Anantnag',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 34.0161,
    longitude: 75.3150,
    elevation_m: 2150,
    orographic_zone: 'Kolahoi–Lidder Orographic Funnel',
    winter_terrain_climatology: 'Valley Rain–Snow Transition',
    primary_coupled_hazards: ['flash-floods', 'avalanches', 'floods'],
    key_infrastructure_exposed: 'Lidder River bridges, Aru–Chandanwari road & Sangam inflow',
  },
  {
    id: 'wd-kas-05',
    name: 'Sadhna Pass – Kupwara Shamshabari Crest',
    district: 'Kupwara',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 34.4072,
    longitude: 73.9497,
    elevation_m: 3100,
    orographic_zone: 'Shamshabari Westerly Entry Barrier',
    winter_terrain_climatology: 'Alpine Snowpack Zone',
    primary_coupled_hazards: ['avalanches', 'landslides', 'floods'],
    key_infrastructure_exposed: 'Karnah–Sadhna Pass road, Tangdhar link & Pohru headwaters',
  },
  {
    id: 'wd-kas-06',
    name: 'Gurez (Dawar) – Kishanganga High Valley',
    district: 'Bandipora',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 34.6330,
    longitude: 74.8330,
    elevation_m: 2450,
    orographic_zone: 'Kishanganga–Razdan Corridor',
    winter_terrain_climatology: 'Alpine Snowpack Zone',
    primary_coupled_hazards: ['avalanches', 'landslides'],
    key_infrastructure_exposed: 'Gurez–Bandipora road, Kishanganga HEP & Wular lake inflow',
  },
  {
    id: 'wd-kas-07',
    name: 'Qazigund – Navyug Tunnel North Portal',
    district: 'Kulgam',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 33.5900,
    longitude: 75.1600,
    elevation_m: 1690,
    orographic_zone: 'Southern Pir Panjal Spillover',
    winter_terrain_climatology: 'Valley Rain–Snow Transition',
    primary_coupled_hazards: ['floods', 'flash-floods', 'avalanches'],
    key_infrastructure_exposed: 'NH-44 Navyug Tunnel North Portal, Vishaw & Jhelum headwaters',
  },
  {
    id: 'wd-kas-08',
    name: 'Peer Ki Gali – Shopian Mughal Road Crest',
    district: 'Shopian',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 33.6350,
    longitude: 74.5200,
    elevation_m: 3485,
    orographic_zone: 'High Pir Panjal Divide',
    winter_terrain_climatology: 'Alpine Snowpack Zone',
    primary_coupled_hazards: ['avalanches', 'flash-floods'],
    key_infrastructure_exposed: 'Mughal Road alpine corridor & Rambiara torrential watershed',
  },
  {
    id: 'wd-kas-09',
    name: 'Pulwama – Sangam Floodplain Sector',
    district: 'Pulwama',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 33.8716,
    longitude: 74.8946,
    elevation_m: 1630,
    orographic_zone: 'Central Jhelum Retention Plain',
    winter_terrain_climatology: 'Valley Rain–Snow Transition',
    primary_coupled_hazards: ['floods', 'flash-floods'],
    key_infrastructure_exposed: 'Kakapora–Sangam Jhelum embankments & horticultural karewas',
  },
  {
    id: 'wd-kas-10',
    name: 'Budgam – Khansahib Sukhnag Piedmont',
    district: 'Budgam',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 33.9349,
    longitude: 74.6400,
    elevation_m: 1980,
    orographic_zone: 'Eastern Pir Panjal Piedmont',
    winter_terrain_climatology: 'Valley Rain–Snow Transition',
    primary_coupled_hazards: ['flash-floods', 'floods'],
    key_infrastructure_exposed: 'Doodhpathri/Sukhnag streams, Srinagar Airport & Hokersar inflow',
  },

  // JAMMU (7 Corridors — Trans-Divisional)
  {
    id: 'wd-jmu-01',
    name: 'Banihal – Ramban NH-44 Cut-Slope Corridor',
    district: 'Ramban',
    subRegion: 'Jammu',
    scope: 'Trans-Divisional',
    latitude: 33.4350,
    longitude: 75.1970,
    elevation_m: 1660,
    orographic_zone: 'Southern Pir Panjal / Bichleri Gorge',
    winter_terrain_climatology: 'Valley Rain–Snow Transition',
    primary_coupled_hazards: ['landslides', 'flash-floods'],
    key_infrastructure_exposed: 'NH-44 Banihal–Ramban landslide belt & USBRL railway viaducts',
  },
  {
    id: 'wd-jmu-02',
    name: 'Jammu – Tawi Piedmont & Shivalik Front',
    district: 'Jammu',
    subRegion: 'Jammu',
    scope: 'Trans-Divisional',
    latitude: 32.7266,
    longitude: 74.8570,
    elevation_m: 327,
    orographic_zone: 'Shivalik Frontal Convective Belt',
    winter_terrain_climatology: 'Foothill Frontal Rain Belt',
    primary_coupled_hazards: ['floods', 'flash-floods'],
    key_infrastructure_exposed: 'Tawi River bridges, urban low-lying wards & NH-44 transit',
  },
  {
    id: 'wd-jmu-03',
    name: 'Kishtwar – Upper Chenab Basin Observatory',
    district: 'Kishtwar',
    subRegion: 'Jammu',
    scope: 'Trans-Divisional',
    latitude: 33.3136,
    longitude: 75.7673,
    elevation_m: 1638,
    orographic_zone: 'Chenab–Zanskar Transition',
    winter_terrain_climatology: 'Valley Rain–Snow Transition',
    primary_coupled_hazards: ['landslides', 'avalanches', 'flash-floods'],
    key_infrastructure_exposed: 'Dul Hasti / Pakal Dul / Ratle HEP cascades & Sinthan Top road',
  },
  {
    id: 'wd-jmu-04',
    name: 'Bhaderwah – Doda Neeru Valley Observatory',
    district: 'Doda',
    subRegion: 'Jammu',
    scope: 'Trans-Divisional',
    latitude: 32.9800,
    longitude: 75.7100,
    elevation_m: 1613,
    orographic_zone: 'Middle Chenab / Kailash Slopes',
    winter_terrain_climatology: 'Valley Rain–Snow Transition',
    primary_coupled_hazards: ['landslides', 'flash-floods'],
    key_infrastructure_exposed: 'NH-244 Batote–Kishtwar highway, Padri Pass & Neeru corridor',
  },
  {
    id: 'wd-jmu-05',
    name: 'Poonch – Southwestern Pir Panjal Flank',
    district: 'Poonch',
    subRegion: 'Jammu',
    scope: 'Trans-Divisional',
    latitude: 33.7670,
    longitude: 74.0921,
    elevation_m: 1010,
    orographic_zone: 'Southwestern Pir Panjal Uplift',
    winter_terrain_climatology: 'Foothill Frontal Rain Belt',
    primary_coupled_hazards: ['flash-floods', 'landslides', 'avalanches'],
    key_infrastructure_exposed: 'Surankote–Bufliaz Mughal Road approach & Poonch River',
  },
  {
    id: 'wd-jmu-06',
    name: 'Rajouri – Munawar Tawi Foothill Catchment',
    district: 'Rajouri',
    subRegion: 'Jammu',
    scope: 'Trans-Divisional',
    latitude: 33.3773,
    longitude: 74.3152,
    elevation_m: 915,
    orographic_zone: 'Pir Panjal Southern Foothills',
    winter_terrain_climatology: 'Foothill Frontal Rain Belt',
    primary_coupled_hazards: ['flash-floods', 'landslides'],
    key_infrastructure_exposed: 'Munawar Tawi tributaries & Rajouri–Thanamandi hill roads',
  },
  {
    id: 'wd-jmu-07',
    name: 'Katra – Reasi Trikuta Orographic Escarpment',
    district: 'Reasi',
    subRegion: 'Jammu',
    scope: 'Trans-Divisional',
    latitude: 32.9915,
    longitude: 74.9318,
    elevation_m: 875,
    orographic_zone: 'Trikuta–Salal Chenab Funnel',
    winter_terrain_climatology: 'Foothill Frontal Rain Belt',
    primary_coupled_hazards: ['landslides', 'flash-floods'],
    key_infrastructure_exposed: 'Vaishno Devi pilgrimage tracks, Chenab Rail Bridge & Salal Reservoir',
  },

  // LADAKH (4 Corridors — Trans-Divisional)
  {
    id: 'wd-ldk-01',
    name: 'Drass – Kargil Winter Cold-Pole Corridor',
    district: 'Kargil',
    subRegion: 'Ladakh',
    scope: 'Trans-Divisional',
    latitude: 34.4275,
    longitude: 75.7510,
    elevation_m: 3230,
    orographic_zone: 'Drass–Suru Spillover Trough',
    winter_terrain_climatology: 'Alpine Snowpack Zone',
    primary_coupled_hazards: ['avalanches', 'landslides'],
    key_infrastructure_exposed: 'NH-1 Drass–Kargil sector & Suru Valley winter connectivity',
  },
  {
    id: 'wd-ldk-02',
    name: 'Leh – Upper Indus Basin Observatory',
    district: 'Leh',
    subRegion: 'Ladakh',
    scope: 'Trans-Divisional',
    latitude: 34.1526,
    longitude: 77.5771,
    elevation_m: 3520,
    orographic_zone: 'Trans-Himalayan Leeward Basin',
    winter_terrain_climatology: 'Trans-Himalayan Arid Cryosphere',
    primary_coupled_hazards: ['avalanches', 'flash-floods'],
    key_infrastructure_exposed: 'Khardung La / Chang La approaches & Leh alluvial fan channels',
  },
  {
    id: 'wd-ldk-03',
    name: 'Pensi La – Zanskar Glacial Divide',
    district: 'Kargil',
    subRegion: 'Ladakh',
    scope: 'Trans-Divisional',
    latitude: 33.8540,
    longitude: 76.3650,
    elevation_m: 4400,
    orographic_zone: 'Zanskar Range Accumulation Zone',
    winter_terrain_climatology: 'Alpine Snowpack Zone',
    primary_coupled_hazards: ['avalanches'],
    key_infrastructure_exposed: 'Padum–Pensi La–Shinku La winter roads & Drang-Drung glacier mass balance',
  },
  {
    id: 'wd-ldk-04',
    name: 'Diskit – Nubra Shyok Karakoram Sector',
    district: 'Leh',
    subRegion: 'Ladakh',
    scope: 'Trans-Divisional',
    latitude: 34.5539,
    longitude: 77.5494,
    elevation_m: 3150,
    orographic_zone: 'Eastern Karakoram Westerly Valley',
    winter_terrain_climatology: 'Trans-Himalayan Arid Cryosphere',
    primary_coupled_hazards: ['avalanches'],
    key_infrastructure_exposed: 'Shyok–Nubra transit axis & Karakoram approach roads',
  },

  // AZAD KASHMIR (4 Corridors — Transboundary / Extended)
  {
    id: 'wd-ajk-01',
    name: 'Muzaffarabad – Jhelum–Neelum Confluence',
    district: 'Muzaffarabad',
    subRegion: 'Azad Kashmir',
    scope: 'Transboundary / Extended',
    latitude: 34.3700,
    longitude: 73.4711,
    elevation_m: 737,
    orographic_zone: 'Hazara–Kashmir Syntaxis Funnel',
    winter_terrain_climatology: 'Foothill Frontal Rain Belt',
    primary_coupled_hazards: ['landslides', 'flash-floods', 'floods'],
    key_infrastructure_exposed: 'Kohala–Muzaffarabad highway, urban slopes & Neelum confluence',
  },
  {
    id: 'wd-ajk-02',
    name: 'Sharda – Upper Neelum Alpine Gorge',
    district: 'Neelum',
    subRegion: 'Azad Kashmir',
    scope: 'Transboundary / Extended',
    latitude: 34.7930,
    longitude: 74.1890,
    elevation_m: 1981,
    orographic_zone: 'Upper Neelum Steep Avalanche Chutes',
    winter_terrain_climatology: 'Alpine Snowpack Zone',
    primary_coupled_hazards: ['avalanches', 'landslides', 'flash-floods'],
    key_infrastructure_exposed: 'Neelum Valley Road (Athmuqam–Sharda–Kel) & alpine settlements',
  },
  {
    id: 'wd-ajk-03',
    name: 'Rawalakot – Poonch Uplands Observatory',
    district: 'Poonch (AJK)',
    subRegion: 'Azad Kashmir',
    scope: 'Transboundary / Extended',
    latitude: 33.8578,
    longitude: 73.7604,
    elevation_m: 1638,
    orographic_zone: 'Western Pir Panjal Uplands',
    winter_terrain_climatology: 'Valley Rain–Snow Transition',
    primary_coupled_hazards: ['landslides', 'flash-floods'],
    key_infrastructure_exposed: 'Rawalakot–Bagh mountain roads & Mahal River steep catchments',
  },
  {
    id: 'wd-ajk-04',
    name: 'Mirpur – Mangla Reservoir Foreland Basin',
    district: 'Mirpur',
    subRegion: 'Azad Kashmir',
    scope: 'Transboundary / Extended',
    latitude: 33.1482,
    longitude: 73.7519,
    elevation_m: 459,
    orographic_zone: 'Lower Jhelum Piedmont',
    winter_terrain_climatology: 'Foothill Frontal Rain Belt',
    primary_coupled_hazards: ['floods', 'flash-floods'],
    key_infrastructure_exposed: 'Mangla Dam spillway inflows & Poonch–Jhelum delta',
  },

  // GILGIT (3 Corridors — Transboundary / Extended)
  {
    id: 'wd-glt-01',
    name: 'Gilgit Basin – Hunza Confluence Observatory',
    district: 'Gilgit',
    subRegion: 'Gilgit',
    scope: 'Transboundary / Extended',
    latitude: 35.9208,
    longitude: 74.3144,
    elevation_m: 1460,
    orographic_zone: 'Central Karakoram–Hindu Raj Junction',
    winter_terrain_climatology: 'Valley Rain–Snow Transition',
    primary_coupled_hazards: ['landslides', 'avalanches', 'flash-floods'],
    key_infrastructure_exposed: 'Karakoram Highway (KKH), Gilgit–Hunza bridges & Naltar approach',
  },
  {
    id: 'wd-glt-02',
    name: 'Chilas – Diamer Indus Gorge Observatory',
    district: 'Diamer',
    subRegion: 'Gilgit',
    scope: 'Transboundary / Extended',
    latitude: 35.4206,
    longitude: 74.0969,
    elevation_m: 1265,
    orographic_zone: 'Nanga Parbat Massif & Indus Gorge',
    winter_terrain_climatology: 'Foothill Frontal Rain Belt',
    primary_coupled_hazards: ['landslides', 'flash-floods', 'avalanches'],
    key_infrastructure_exposed: 'KKH Kohistan–Chilas rockfall zone, Babusar approach & Diamer-Bhasha site',
  },
  {
    id: 'wd-glt-03',
    name: 'Gupis – Ghizer Shandur Westerly Gate',
    district: 'Ghizer',
    subRegion: 'Gilgit',
    scope: 'Transboundary / Extended',
    latitude: 36.1736,
    longitude: 73.4414,
    elevation_m: 2156,
    orographic_zone: 'Hindu Raj First-Contact Barrier',
    winter_terrain_climatology: 'Alpine Snowpack Zone',
    primary_coupled_hazards: ['avalanches', 'flash-floods'],
    key_infrastructure_exposed: 'Gilgit–Chitral Shandur road & Gilgit River upper tributaries',
  },

  // BALTISTAN (3 Corridors — Transboundary / Extended)
  {
    id: 'wd-blt-01',
    name: 'Skardu – Upper Indus Basin Observatory',
    district: 'Skardu',
    subRegion: 'Baltistan',
    scope: 'Transboundary / Extended',
    latitude: 35.2971,
    longitude: 75.6333,
    elevation_m: 2228,
    orographic_zone: 'Skardu–Deosai High Basin',
    winter_terrain_climatology: 'Alpine Snowpack Zone',
    primary_coupled_hazards: ['avalanches', 'landslides'],
    key_infrastructure_exposed: 'Jaglot–Skardu Highway (S-1), Deosai approach & Indus–Shigar junction',
  },
  {
    id: 'wd-blt-02',
    name: 'Shigar – Central Karakoram Valley',
    district: 'Shigar',
    subRegion: 'Baltistan',
    scope: 'Transboundary / Extended',
    latitude: 35.4256,
    longitude: 75.7364,
    elevation_m: 2280,
    orographic_zone: 'Baltoro–Biafo–Hispar Gateway',
    winter_terrain_climatology: 'Alpine Snowpack Zone',
    primary_coupled_hazards: ['avalanches', 'flash-floods'],
    key_infrastructure_exposed: 'Shigar–Askole valley corridor & winter Karakoram glacier nourishment',
  },
  {
    id: 'wd-blt-03',
    name: 'Khaplu – Ghanche Shyok Valley',
    district: 'Ghanche',
    subRegion: 'Baltistan',
    scope: 'Transboundary / Extended',
    latitude: 35.1667,
    longitude: 76.3333,
    elevation_m: 2600,
    orographic_zone: 'Mashabrum–Shyok Cryosphere',
    winter_terrain_climatology: 'Alpine Snowpack Zone',
    primary_coupled_hazards: ['avalanches', 'landslides'],
    key_infrastructure_exposed: 'Khaplu–Machulo–Hushe bridges & Shyok valley terraces',
  },
];

// ─── 3. External Statutory Agency Bulletin Portals (No False Automated-Link Claim) ─
export const OFFICIAL_WD_AGENCY_SOURCES: OfficialAgencySource[] = [
  {
    id: 'adv-imd-sgr',
    agency: 'India Meteorological Department (IMD)',
    division: 'Meteorological Centre Srinagar',
    jurisdiction: 'Jammu & Kashmir and Ladakh',
    subRegionsCovered: ['Kashmir', 'Jammu', 'Ladakh'],
    bulletinType: 'District-wise Heavy Rain / Snowfall Color Warnings & Extended WD Outlook',
    portalUrl: 'https://mausam.imd.gov.in/srinagar/',
    provenanceTier: 'EXTERNAL_AGENCY_PORTAL',
    ingestionStatus: 'External Statutory Portal (Manual Check — No Live CAP/API Feed)',
    cadence: 'Twice daily (08:30 & 17:30 IST) + Nowcast updates',
    notes: 'Statutory forecasting authority for WD passage and NH-44/Zoji La advisories. Portal publishes PDFs/HTML without a public machine-readable CAP JSON endpoint.',
  },
  {
    id: 'adv-imd-hq',
    agency: 'India Meteorological Department (IMD New Delhi)',
    division: 'National Weather Forecasting Centre (NWFC)',
    jurisdiction: 'Western Himalayan Region (All-India Synoptic)',
    subRegionsCovered: ['Kashmir', 'Jammu', 'Ladakh'],
    bulletinType: 'All-India Weather Summary & Western Disturbance Trough Axis Bulletins',
    portalUrl: 'https://mausam.imd.gov.in/',
    provenanceTier: 'EXTERNAL_AGENCY_PORTAL',
    ingestionStatus: 'External Statutory Portal (Manual Check — No Live CAP/API Feed)',
    cadence: '4 times daily synoptic bulletins',
    notes: 'Tracks upper-air cyclonic circulations and 500/300 hPa trough longitudes across Iran, Afghanistan, Pakistan, and NW India.',
  },
  {
    id: 'adv-pmd-isb',
    agency: 'Pakistan Meteorological Department (PMD)',
    division: 'National Weather Forecasting Centre & Flood Forecasting Division',
    jurisdiction: 'Azad Kashmir & Gilgit-Baltistan',
    subRegionsCovered: ['Azad Kashmir', 'Gilgit', 'Baltistan'],
    bulletinType: 'Westerly Wave Advisory, Mountain Snowfall & Flash Flood Bulletins',
    portalUrl: 'https://www.pmd.gov.pk/en/',
    provenanceTier: 'EXTERNAL_AGENCY_PORTAL',
    ingestionStatus: 'External Statutory Portal (Manual Check — No Live CAP/API Feed)',
    cadence: 'Daily synoptic outlooks + event-driven westerly wave advisories',
    notes: 'Official hydrometeorological authority for Westerly Wave tracks entering Chitral, Gilgit, Baltistan, and Azad Kashmir.',
  },
  {
    id: 'adv-dgre',
    agency: 'Defence Geoinformatics Research Establishment (DGRE / DRDO)',
    division: 'Snow & Avalanche Study Wing',
    jurisdiction: 'High-Altitude Passes (J&K and Ladakh)',
    subRegionsCovered: ['Kashmir', 'Jammu', 'Ladakh'],
    bulletinType: '5-Level Avalanche Danger Bulletins Triggered by Active WDs',
    portalUrl: 'https://www.drdo.gov.in/drdo/labs-and-establishments/defence-geoinformatics-research-establishment-dgre',
    provenanceTier: 'EXTERNAL_AGENCY_PORTAL',
    ingestionStatus: 'External Statutory Portal (Manual Check — No Live CAP/API Feed)',
    cadence: 'Daily 17:00 IST during winter snowpack season',
    notes: 'Issues Danger Level 1–5 avalanche warnings across Kupwara, Bandipora (Gurez), Ganderbal (Zoji La), Baramulla (Gulmarg), and Kargil.',
  },
  {
    id: 'adv-jksdma',
    agency: 'J&K Disaster Management Authority (JKSDMA) & CWC',
    division: 'Emergency Operations & Flood Control',
    jurisdiction: 'Jammu & Kashmir River Basins & Highways',
    subRegionsCovered: ['Kashmir', 'Jammu'],
    bulletinType: 'Multi-Hazard Public Advisories, River Gauge Alerts & Highway Closures',
    portalUrl: 'https://jksdma.jk.gov.in/',
    provenanceTier: 'EXTERNAL_AGENCY_PORTAL',
    ingestionStatus: 'External Statutory Portal (Manual Check — No Live CAP/API Feed)',
    cadence: 'Event-triggered emergency dispatches',
    notes: 'Coordinates district disaster response when intense WDs trigger Jhelum/Chenab rises or NH-44 Ramban landslide blockades.',
  },
  {
    id: 'adv-ndma-pk',
    agency: 'NDMA Pakistan / SDMA AJK / GBDMA',
    division: 'National Emergencies Operation Center (NEOC)',
    jurisdiction: 'Azad Kashmir, Gilgit & Baltistan',
    subRegionsCovered: ['Azad Kashmir', 'Gilgit', 'Baltistan'],
    bulletinType: 'Westerly System Impact Projections, KKH Landslide & Avalanche Advisories',
    portalUrl: 'https://www.ndma.gov.pk/',
    provenanceTier: 'EXTERNAL_AGENCY_PORTAL',
    ingestionStatus: 'External Statutory Portal (Manual Check — No Live CAP/API Feed)',
    cadence: 'Pre-event impact advisories & daily situation reports',
    notes: 'Publishes corridor-level advisories for Neelum Valley, Muzaffarabad, Karakoram Highway (KKH), Babusar, and Skardu.',
  },
];

// ─── 4. Verified Historical Western Disturbance Benchmark Archive ─────────────
export const HISTORICAL_WD_RECORDS: HistoricalWDRecord[] = [
  {
    id: 'hist-wd-2014-09',
    eventCode: 'WD-2014-SEP-EXT',
    title: 'September 2014 Kashmir Super-Flood (Deep WD–Monsoon Interaction)',
    dates: '2–7 September 2014',
    season: 'Monsoon–WD Interaction',
    intensityCategory: 'Extreme Compound WD',
    min500hPaHeightGpm: 5640,
    peakPrecipOrSnow: '558 mm (Qazigund) · 420+ mm across Pir Panjal & Jhelum basin in 96h',
    subRegionsAffected: ['Kashmir', 'Jammu', 'Azad Kashmir', 'Gilgit', 'Baltistan'],
    triggeredHazards: ['Floods', 'Flash Floods', 'Landslides'],
    documentedImpact: 'Stationary mid-tropospheric WD trough locked with a Bay of Bengal monsoon depression; Jhelum exceeded 110,000 cusecs at Sangam, inundating Srinagar, Pulwama, Anantnag, Jammu Tawi, and Mangla inflows.',
    primarySource: 'IMD Monograph / Ray et al. (2015) Current Science & CWC Post-Flood Assessment',
    provenanceTier: 'HISTORICAL_RECORD',
  },
  {
    id: 'hist-wd-2017-01',
    eventCode: 'WD-2017-JAN-BLZ',
    title: 'January 2017 Chillai Kalan Multi-Pulse Blizzard & Gurez Avalanche Cycle',
    dates: '23–27 January 2017',
    season: 'Winter (Chillai Kalan)',
    intensityCategory: 'Severe Blizzard WD',
    min500hPaHeightGpm: 5460,
    peakPrecipOrSnow: '150–240 cm snow (Gurez, Sonamarg, Gulmarg, Neelum & Astore)',
    subRegionsAffected: ['Kashmir', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'],
    triggeredHazards: ['Avalanches', 'Landslides'],
    documentedImpact: 'Deep 500 hPa cyclonic cutoff with intense Arabian Sea moisture transport triggered catastrophic slab avalanches in Gurez (Bandipora), Sonamarg, Kupwara, and Neelum/Chitral.',
    primarySource: 'IMD Met Centre Srinagar & SASE/DGRE Winter Snowpack Report (2017)',
    provenanceTier: 'HISTORICAL_RECORD',
  },
  {
    id: 'hist-wd-2019-02',
    eventCode: 'WD-2019-FEB-NH44',
    title: 'February 2019 Pir Panjal Snowstorm & Jawahar Tunnel Avalanche Event',
    dates: '5–8 February 2019',
    season: 'Winter (Chillai Kalan)',
    intensityCategory: 'Severe Blizzard WD',
    min500hPaHeightGpm: 5495,
    peakPrecipOrSnow: '180 cm snow at Jawahar Tunnel / Qazigund · 115 mm rain in Ramban',
    subRegionsAffected: ['Kashmir', 'Jammu', 'Ladakh', 'Azad Kashmir'],
    triggeredHazards: ['Avalanches', 'Landslides'],
    documentedImpact: 'Triggered a major avalanche at Jawahar Tunnel North Portal and simultaneous mudslides in Ramban, severing NH-44 and air traffic into Srinagar for multiple days.',
    primarySource: 'IMD Annual Climate Summary 2019 & JKSDMA Situation Archive',
    provenanceTier: 'HISTORICAL_RECORD',
  },
  {
    id: 'hist-wd-2021-10',
    eventCode: 'WD-2021-OCT-AUT',
    title: 'October 2021 Unseasonal Early-Autumn Snow & Zoji La Blizzard WD',
    dates: '22–24 October 2021',
    season: 'Early Autumn',
    intensityCategory: 'Extreme Compound WD',
    min500hPaHeightGpm: 5580,
    peakPrecipOrSnow: '60–110 cm heavy wet snow in Shopian, Pahalgam, Zoji La & Drass',
    subRegionsAffected: ['Kashmir', 'Jammu', 'Ladakh', 'Baltistan'],
    triggeredHazards: ['Avalanches', 'Landslides', 'Flash Floods'],
    documentedImpact: 'Rapid 0°C freezing-level plunge to 1,900 m deposited heavy wet snow on unharvested Shopian/Kulgam apple orchards and stranded vehicles on Zoji La and Mughal Road.',
    primarySource: 'IMD Srinagar Special Agromet Report (2021)',
    provenanceTier: 'HISTORICAL_RECORD',
  },
  {
    id: 'hist-wd-2022-01',
    eventCode: 'WD-2022-JAN-TWIN',
    title: 'January 2022 Back-to-Back Twin Western Disturbances',
    dates: '3–9 January 2022',
    season: 'Winter (Chillai Kalan)',
    intensityCategory: 'Twin Synoptic WD',
    min500hPaHeightGpm: 5480,
    peakPrecipOrSnow: '210 mm liquid-equivalent across Jammu/AJK · 120+ cm snow in Pir Panjal & GB',
    subRegionsAffected: ['Kashmir', 'Jammu', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'],
    triggeredHazards: ['Avalanches', 'Landslides', 'Flash Floods'],
    documentedImpact: 'Two successive upper-air troughs merged with an induced cyclonic circulation over Punjab/Pakistan, causing widespread mountain snowfall, KKH & NH-44 closures, and foothill flash runoff.',
    primarySource: 'IMD Climate of India 2022 & PMD Winter Review',
    provenanceTier: 'HISTORICAL_RECORD',
  },
  {
    id: 'hist-wd-2024-04',
    eventCode: 'WD-2024-APR-CNV',
    title: 'April 2024 Intense Spring WD, Ramban Subsidence & Jhelum Surge',
    dates: '26–30 April 2024',
    season: 'Late Winter / Spring',
    intensityCategory: 'Intense Convective WD',
    min500hPaHeightGpm: 5610,
    peakPrecipOrSnow: '165 mm rain in Ramban/Banihal · 95+ mm across Kashmir Valley & Muzaffarabad',
    subRegionsAffected: ['Kashmir', 'Jammu', 'Azad Kashmir', 'Gilgit'],
    triggeredHazards: ['Landslides', 'Flash Floods', 'Floods', 'Avalanches'],
    documentedImpact: 'High freezing-level rain-on-snow event caused severe slope subsidence at Pernote (Ramban), flash floods in Kupwara/Handwara & Pohru, and high-altitude avalanches on Sonamarg/Gurez ridges.',
    primarySource: 'IMD Srinagar, GSI Landslide Assessment & JKSDMA (2024)',
    provenanceTier: 'HISTORICAL_RECORD',
  },
  {
    id: 'hist-wd-2025-02',
    eventCode: 'WD-2025-FEB-DRT',
    title: 'Late-February 2025 Drought-Terminating Deep Synoptic WD',
    dates: '25–28 February 2025',
    season: 'Late Winter / Spring',
    intensityCategory: 'Intense Convective WD',
    min500hPaHeightGpm: 5525,
    peakPrecipOrSnow: '140 mm (Banihal/Ramban) · 90–150 cm snow across Gulmarg, Sonamarg, Drass & Skardu',
    subRegionsAffected: ['Kashmir', 'Jammu', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'],
    triggeredHazards: ['Avalanches', 'Landslides', 'Flash Floods'],
    documentedImpact: 'Ended a severe 70%+ winter precipitation deficit across the Western Himalayas while simultaneously triggering DGRE Orange/Red avalanche alerts and NH-44/KKH rockslides.',
    primarySource: 'IMD Extended Hydromet Summary & PMD Seasonal Bulletin (2025)',
    provenanceTier: 'HISTORICAL_RECORD',
  },
];

// ─── 5. Provenance & Verified Data Sources Registry ──────────────────────────
export const WD_VERIFIED_DATA_SOURCES = [
  {
    name: 'KEW 2D Upper-Tropospheric Vorticity & Trough Feature-Detection Engine (Open-Meteo Pressure Levels)',
    tier: 'MODEL_NOWCAST_ANALYSIS & NUMERICAL_FORECAST',
    endpoint: 'https://api.open-meteo.com/v1/forecast',
    parameters: 'Centered-difference 300/500 hPa Relative Vorticity (ζ), 500 hPa Geopotential Curvature (∇²Z₅₀₀), 0°C Freezing-Level Altitude, 168h Hourly Rain/Snow',
    resolution: '30-node synoptic waveguide (30°N–38°N, 30°E–75°E) + 31 DEM-verified corridors (0.1°–0.25° ECMWF IFS / GFS / ICON)',
    cadence: '6-hourly synoptic trajectory linking & hourly corridor NWP series (UTC)',
    coverage: 'Eastern Mediterranean → Caspian → Hindu Kush → all 6 Western Himalayan sub-regions',
  },
  {
    name: 'RainViewer Global Composite Weather Radar API',
    tier: 'LIVE_RADAR_OBSERVATION',
    endpoint: 'https://api.rainviewer.com/public/weather-maps.json',
    parameters: 'Observed composite precipitation radar reflectivity mosaic tiles (actual remote-sensing observation)',
    resolution: '1–2 km radar mosaic',
    cadence: 'Every 10 minutes (real-time observation)',
    coverage: 'South & Central Asia / Western Himalayan approach corridor',
  },
  {
    name: 'Hunt, Turner & Shaffrey (2018) Synoptic WD Vorticity Methodology Reference',
    tier: 'HISTORICAL_RECORD & METHODOLOGY',
    endpoint: 'https://doi.org/10.1002/qj.3200',
    parameters: 'Upper-tropospheric relative vorticity feature identification (300–400 hPa ζ maxima) & eastward Rossby wave trajectory linking',
    resolution: 'Synoptic scale (500–2,000 km wavelength)',
    cadence: '6-hourly synoptic steps',
    coverage: 'Mediterranean to Western Himalaya storm-track waveguide',
  },
  {
    name: 'IMD (Srinagar / NWFC) & PMD (NWFC / FFD) Statutory Portals',
    tier: 'EXTERNAL_AGENCY_PORTAL',
    endpoint: 'https://mausam.imd.gov.in/srinagar/ · https://www.pmd.gov.pk/en/',
    parameters: 'Statutory district color warnings & westerly wave bulletins (referenced via live portal link; no public automated CAP JSON ingested)',
    resolution: 'District & basin level',
    cadence: 'Twice daily + special advisories',
    coverage: 'Jammu, Kashmir, Ladakh, Azad Kashmir, Gilgit & Baltistan',
  },
];
