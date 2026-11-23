import {
  DisplaySubRegion,
  GeographicScope,
  SIX_SUBREGION_DEFINITIONS,
} from '@/lib/atmospheric-ingestion';

export interface ExtremeWeatherModuleCatalogItem {
  order: number;
  slug: string;
  title: string;
  shortLabel: string;
  rolloutPhase: 1 | 2 | 3;
  operationalStatus: 'OPERATIONAL' | 'PLANNED_PHASE_1' | 'PLANNED_PHASE_2' | 'PLANNED_PHASE_3';
  href: string;
  dashboardHref: string;
  principalSources: string;
  mainIndicators: string[];
  connectedModules: Array<{ label: string; href: string }>;
  scientificLimitationNote: string;
}

export const EXTREME_WEATHER_CATALOG: ExtremeWeatherModuleCatalogItem[] = [
  {
    order: 1,
    slug: 'extreme-rainfall-cloudbursts',
    title: 'Extreme Rainfall & Cloudbursts',
    shortLabel: 'Extreme Rainfall',
    rolloutPhase: 1,
    operationalStatus: 'OPERATIONAL',
    href: '/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts',
    dashboardHref: '/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts/dashboard',
    principalSources: 'Open-Meteo Hourly NWP, GFS 31-Member Ensemble, ERA5 Reanalysis, RainViewer Radar, IMD/PMD Portals',
    mainIndicators: ['1h / 3h / 24h Peak Intensity (mm)', '31-Member Ensemble P(≥50mm)', 'ERA5 7d Rainfall Anomaly', 'TCWV & CAPE'],
    connectedModules: [
      { label: 'Flash Floods', href: '/hazard-intelligence/flash-floods' },
      { label: 'Floods', href: '/hazard-intelligence/floods' },
      { label: 'Landslides', href: '/hazard-intelligence/landslides' },
      { label: 'Monsoon Dynamics', href: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics' },
    ],
    scientificLimitationNote: 'Gridded NWP (9–25 km) identifies cloudburst-supportive moisture/CAPE environments but cannot independently confirm localized ≥100 mm/h cloudburst cores without gauge/Doppler radar verification.',
  },
  {
    order: 2,
    slug: 'heavy-snowfall-blizzards',
    title: 'Heavy Snowfall & Blizzards',
    shortLabel: 'Heavy Snowfall',
    rolloutPhase: 1,
    operationalStatus: 'PLANNED_PHASE_1',
    href: '/hazard-intelligence/extreme-weather',
    dashboardHref: '/hazard-intelligence/extreme-weather',
    principalSources: 'ECMWF IFS, NOAA GFS, DGRE Portals',
    mainIndicators: ['24h/72h Snowfall (cm)', 'Snow Water Equivalent', 'Blizzard Wind Gusts', 'Visibility'],
    connectedModules: [
      { label: 'Avalanches', href: '/hazard-intelligence/avalanches' },
      { label: 'Western Disturbances', href: '/hazard-intelligence/atmospheric-systems/western-disturbances' },
    ],
    scientificLimitationNote: 'Phase 1 Foundation rollout queue — connects shared Open-Meteo snowfall & Western Disturbance freezing-level telemetry.',
  },
  {
    order: 3,
    slug: 'thunderstorms-lightning',
    title: 'Thunderstorms & Lightning',
    shortLabel: 'Thunderstorms',
    rolloutPhase: 2,
    operationalStatus: 'PLANNED_PHASE_2',
    href: '/hazard-intelligence/extreme-weather',
    dashboardHref: '/hazard-intelligence/extreme-weather',
    principalSources: 'ECMWF CAPE/Lifted Index, Vaisala Xweather (Commercial)',
    mainIndicators: ['Convective CAPE (J/kg)', 'Storm Potential', 'Detected Strikes (Requires Commercial Key)'],
    connectedModules: [
      { label: 'Forest Fires', href: '/hazard-intelligence/forest-fires' },
      { label: 'Extreme Rainfall', href: '/hazard-intelligence/extreme-weather/extreme-rainfall-cloudbursts' },
    ],
    scientificLimitationNote: 'High CAPE indicates convective instability, not confirmed lightning strikes unless Vaisala/LINET strike sensor feed is licensed.',
  },
  {
    order: 4,
    slug: 'heatwaves',
    title: 'Heatwaves',
    shortLabel: 'Heatwaves',
    rolloutPhase: 1,
    operationalStatus: 'PLANNED_PHASE_1',
    href: '/hazard-intelligence/extreme-weather',
    dashboardHref: '/hazard-intelligence/extreme-weather',
    principalSources: 'Open-Meteo NWP, ERA5 Climatology',
    mainIndicators: ['Tmax (°C)', 'IMD Elevation-Adjusted Heatwave Thresholds', 'Warm-Spell Duration'],
    connectedModules: [
      { label: 'Forest Fires', href: '/hazard-intelligence/forest-fires' },
      { label: 'Water Systems', href: '/water-systems' },
      { label: 'GLOFs', href: '/hazard-intelligence/glofs' },
    ],
    scientificLimitationNote: 'Hill-station IMD heatwave criteria (≥30°C with ≥+4.5°C departure) differ from plains thresholds (≥40°C).',
  },
  {
    order: 5,
    slug: 'cold-waves-frost',
    title: 'Cold Waves & Frost',
    shortLabel: 'Cold Waves',
    rolloutPhase: 1,
    operationalStatus: 'PLANNED_PHASE_1',
    href: '/hazard-intelligence/extreme-weather',
    dashboardHref: '/hazard-intelligence/extreme-weather',
    principalSources: 'Open-Meteo NWP, ERA5 Reanalysis',
    mainIndicators: ['Tmin (°C)', 'Sub-Zero Hours', 'Orchard Blossom Frost Exposure'],
    connectedModules: [
      { label: 'Horticulture EIA', href: '/sectoral-eia/sectors/horticulture' },
      { label: 'Water Systems', href: '/water-systems' },
    ],
    scientificLimitationNote: 'Radiative valley-floor frost inversions can run 3–5°C colder than 9 km NWP grid-cell averages.',
  },
  {
    order: 6,
    slug: 'hailstorms',
    title: 'Hailstorms',
    shortLabel: 'Hailstorms',
    rolloutPhase: 2,
    operationalStatus: 'PLANNED_PHASE_2',
    href: '/hazard-intelligence/extreme-weather',
    dashboardHref: '/hazard-intelligence/extreme-weather',
    principalSources: 'Upper-Air Shear + CAPE, IMD/PMD Nowcasts',
    mainIndicators: ['CAPE × 0–6 km Wind Shear', 'Freezing-Level Depression', 'Orchard Hail Advisories'],
    connectedModules: [
      { label: 'Horticulture EIA', href: '/sectoral-eia/sectors/horticulture' },
      { label: 'Monsoon Dynamics', href: '/hazard-intelligence/atmospheric-systems/monsoon-dynamics' },
    ],
    scientificLimitationNote: 'Models diagnose hail-favorable thermodynamics; actual hail swath confirmation requires dual-pol radar or field reports.',
  },
  {
    order: 7,
    slug: 'extreme-winds-storms',
    title: 'Extreme Winds & Storms',
    shortLabel: 'Extreme Winds',
    rolloutPhase: 2,
    operationalStatus: 'PLANNED_PHASE_2',
    href: '/hazard-intelligence/extreme-weather',
    dashboardHref: '/hazard-intelligence/extreme-weather',
    principalSources: 'ECMWF IFS, NOAA GFS',
    mainIndicators: ['Peak 10m Gusts (km/h)', 'Sustained Gales', 'Pass Rotor Shear'],
    connectedModules: [
      { label: 'Forest Fires', href: '/hazard-intelligence/forest-fires' },
      { label: 'Avalanches', href: '/hazard-intelligence/avalanches' },
      { label: 'Jet Stream', href: '/hazard-intelligence/atmospheric-systems/jet-stream-circulation' },
    ],
    scientificLimitationNote: 'Sub-grid canyon funneling along Zoji La and Indus gorges can exceed synoptic NWP gust diagnostics.',
  },
  {
    order: 8,
    slug: 'fog-visibility',
    title: 'Fog & Visibility',
    shortLabel: 'Fog & Visibility',
    rolloutPhase: 2,
    operationalStatus: 'PLANNED_PHASE_2',
    href: '/hazard-intelligence/extreme-weather',
    dashboardHref: '/hazard-intelligence/extreme-weather',
    principalSources: 'Open-Meteo Visibility/RH, METAR Airport Stations',
    mainIndicators: ['Horizontal Visibility (m)', 'Dew-Point Depression', 'Freezing Fog Risk'],
    connectedModules: [
      { label: 'Air Quality', href: '/environmental-monitoring/air-pollution' },
      { label: 'Transportation', href: '/environmental-monitoring/transportation-pollution' },
    ],
    scientificLimitationNote: 'Valley radiation fog requires station/METAR verification alongside NWP boundary-layer humidity.',
  },
  {
    order: 9,
    slug: 'drought-dry-spells',
    title: 'Drought & Dry Spells',
    shortLabel: 'Drought',
    rolloutPhase: 3,
    operationalStatus: 'PLANNED_PHASE_3',
    href: '/hazard-intelligence/extreme-weather',
    dashboardHref: '/hazard-intelligence/extreme-weather',
    principalSources: 'ERA5 Historical Archive, Copernicus ERA5-Drought',
    mainIndicators: ['30d/90d Rainfall Deficit (%)', 'Consecutive Dry Days (CDD)', 'SPI/SPEI Context'],
    connectedModules: [
      { label: 'Water Systems', href: '/water-systems' },
      { label: 'Forest Fires', href: '/hazard-intelligence/forest-fires' },
    ],
    scientificLimitationNote: 'Copernicus ERA5-Drought SPI/SPEI products update monthly rather than instantaneously.',
  },
  {
    order: 10,
    slug: 'dust-storms',
    title: 'Dust Storms',
    shortLabel: 'Dust Storms',
    rolloutPhase: 3,
    operationalStatus: 'PLANNED_PHASE_3',
    href: '/hazard-intelligence/extreme-weather',
    dashboardHref: '/hazard-intelligence/extreme-weather',
    principalSources: 'Copernicus CAMS via Open-Meteo Air Quality API',
    mainIndicators: ['Surface Dust (μg/m³)', 'PM10 (μg/m³)', 'Aerosol Optical Depth (AOD)'],
    connectedModules: [
      { label: 'Air Quality', href: '/environmental-monitoring/air-pollution' },
      { label: 'Environmental Health', href: '/environmental-monitoring/environmental-health' },
    ],
    scientificLimitationNote: 'CAMS global aerosol forecasts (~40 km) capture Thar/transboundary dust plumes rather than local construction dust.',
  },
  {
    order: 11,
    slug: 'freezing-rain-ice',
    title: 'Freezing Rain & Ice',
    shortLabel: 'Freezing Rain',
    rolloutPhase: 3,
    operationalStatus: 'PLANNED_PHASE_3',
    href: '/hazard-intelligence/extreme-weather',
    dashboardHref: '/hazard-intelligence/extreme-weather',
    principalSources: 'ECMWF / GFS Thermal Profiles & Surface Temp',
    mainIndicators: ['Warm-Nose Aloft + T2m ≤ 0°C', 'Black-Ice Highway Potential'],
    connectedModules: [
      { label: 'Landslides', href: '/hazard-intelligence/landslides' },
      { label: 'Western Disturbances', href: '/hazard-intelligence/atmospheric-systems/western-disturbances' },
    ],
    scientificLimitationNote: 'Requires vertical thermal-inversion profile diagnosis rather than surface temperature alone.',
  },
  {
    order: 12,
    slug: 'rain-on-snow-snowmelt',
    title: 'Rain-on-Snow & Snowmelt',
    shortLabel: 'Rain-on-Snow',
    rolloutPhase: 3,
    operationalStatus: 'PLANNED_PHASE_3',
    href: '/hazard-intelligence/extreme-weather',
    dashboardHref: '/hazard-intelligence/extreme-weather',
    principalSources: 'ECMWF/GFS Snow Depth + Liquid Rain + 0°C Isotherm',
    mainIndicators: ['Liquid Rain on Existing Snowpack', '0°C Isotherm Surge', 'Rapid Meltwater Runoff'],
    connectedModules: [
      { label: 'Floods', href: '/hazard-intelligence/floods' },
      { label: 'Flash Floods', href: '/hazard-intelligence/flash-floods' },
      { label: 'Avalanches', href: '/hazard-intelligence/avalanches' },
      { label: 'GLOFs', href: '/hazard-intelligence/glofs' },
    ],
    scientificLimitationNote: 'Requires coupling antecedent snow-depth state with warm liquid rainfall forecasts.',
  },
];

// ─── Module 1 Operational Registry: 24 Extreme Rainfall & Cloudburst Watersheds ─

export type ExtremeRainRiskClass =
  | 'Not Assessed'
  | 'No Extreme Rainfall Signal'
  | 'Elevated Rain Watch'
  | 'Heavy Orographic Rain Warning'
  | 'Cloudburst-Supportive Environment (Unconfirmed)';

export interface ExtremeRainfallWatershed {
  id: string;
  name: string;
  district: string;
  subRegion: DisplaySubRegion;
  administrativeUnit: string;
  scope: GeographicScope;
  latitude: number;
  longitude: number;
  elevation_m: number;
  watershedType:
    | 'Steep Glacial / Pilgrimage Gorge'
    | 'Windward Shivalik Escarpment'
    | 'Pir Panjal Cut-Slope Torrent'
    | 'Arid Trans-Himalayan Debris Fan';
  normalWeeklyRainMm: number;
  coupledHazards: Array<'flash-floods' | 'floods' | 'landslides' | 'glofs'>;
  exposedAssets: string;
}

export interface ExtremeRainfallLiveRecord extends ExtremeRainfallWatershed {
  isReporting: boolean;
  provenance: {
    analysisTier: 'Model Analysis' | 'Unavailable';
    historicalTier: 'Model Analysis' | 'Unavailable';
    forecastTier: 'Forecast' | 'Unavailable';
    ensembleTier: 'Forecast' | 'Unavailable';
    modelGridElevationM: number | null;
    historicalWindow: string;
  };
  currentAnalysis: {
    temp_c: number | null;
    precip_1h_mm: number | null;
    tcwv_kg_m2: number | null;
    cape_jkg: number | null;
    freezing_level_m: number | null;
    era5_past7d_mm: number | null;
    era5_anomaly_pct: number | null;
  };
  forecast168h: {
    peak_1h_mm: number | null;
    peak_1h_time_utc: string | null;
    peak_3h_mm: number | null;
    peak_24h_mm: number | null;
    total_168h_mm: number | null;
    max_cape_jkg: number | null;
    valid_hourly_steps: number;
    daily: Array<{
      date: string;
      precip_mm: number | null;
      prob_pct: number | null;
    }>;
  };
  ensembleGfs31: {
    memberCount: number;
    median_7d_mm: number | null;
    p90_7d_mm: number | null;
    max_member_24h_mm: number | null;
    prob_24h_ge_25mm_pct: number | null;
    prob_24h_ge_50mm_pct: number | null;
  };
  extremeClass: ExtremeRainRiskClass;
  scientificBasis: string;
}

function mkWatershed(w: Omit<ExtremeRainfallWatershed, 'administrativeUnit'>): ExtremeRainfallWatershed {
  return {
    ...w,
    administrativeUnit: SIX_SUBREGION_DEFINITIONS[w.subRegion].administrativeUnit,
  };
}

export const EXTREME_RAINFALL_WATERSHEDS: ExtremeRainfallWatershed[] = [
  // KASHMIR (7)
  mkWatershed({ id: 'erc-kas-01', name: 'Pahalgam – Upper Lidder & Amarnath Gorge', district: 'Anantnag', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.0161, longitude: 75.3150, elevation_m: 2150, watershedType: 'Steep Glacial / Pilgrimage Gorge', normalWeeklyRainMm: 11.0, coupledHazards: ['flash-floods', 'floods', 'glofs'], exposedAssets: 'Chandanwari–Baltal pilgrimage camps, Lidder bridges & Sangam inflow' }),
  mkWatershed({ id: 'erc-kas-02', name: 'Baltal – Sonamarg Sindh Headwaters', district: 'Ganderbal', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.2610, longitude: 75.4120, elevation_m: 2880, watershedType: 'Steep Glacial / Pilgrimage Gorge', normalWeeklyRainMm: 12.5, coupledHazards: ['flash-floods', 'landslides'], exposedAssets: 'Baltal base camp, Zoji La approaches & Sindh HEP intake' }),
  mkWatershed({ id: 'erc-kas-03', name: 'Srinagar – Dachigam–Harwan Urban Catchment', district: 'Srinagar', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.0837, longitude: 74.7973, elevation_m: 1585, watershedType: 'Pir Panjal Cut-Slope Torrent', normalWeeklyRainMm: 7.5, coupledHazards: ['floods', 'flash-floods'], exposedAssets: 'Dal inflow channels, urban storm drains & Ram Munshi Bagh gauge' }),
  mkWatershed({ id: 'erc-kas-04', name: 'Qazigund – Vishaw–Aharbal Escarpment', district: 'Kulgam', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 33.5900, longitude: 75.1600, elevation_m: 1690, watershedType: 'Pir Panjal Cut-Slope Torrent', normalWeeklyRainMm: 10.2, coupledHazards: ['floods', 'flash-floods', 'landslides'], exposedAssets: 'Vishaw boulder torrent, Kulgam bridges & NH-44 portal' }),
  mkWatershed({ id: 'erc-kas-05', name: 'Shopian – Rambiara Steep Catchment', district: 'Shopian', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 33.7172, longitude: 74.8343, elevation_m: 2057, watershedType: 'Pir Panjal Cut-Slope Torrent', normalWeeklyRainMm: 8.8, coupledHazards: ['flash-floods', 'floods'], exposedAssets: 'Rambiara braided floodplain & Mughal Road approaches' }),
  mkWatershed({ id: 'erc-kas-06', name: 'Kupwara – Lolab & Pohru Torrent Basin', district: 'Kupwara', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 34.5262, longitude: 74.2546, elevation_m: 1620, watershedType: 'Pir Panjal Cut-Slope Torrent', normalWeeklyRainMm: 10.5, coupledHazards: ['flash-floods', 'floods', 'landslides'], exposedAssets: 'Handwara–Kupwara bridges & Kehmil nallah' }),
  mkWatershed({ id: 'erc-kas-07', name: 'Budgam – Doodhpathri–Sukhnag Headwaters', district: 'Budgam', subRegion: 'Kashmir', scope: 'Kashmir Core', latitude: 33.9349, longitude: 74.6400, elevation_m: 1980, watershedType: 'Pir Panjal Cut-Slope Torrent', normalWeeklyRainMm: 8.5, coupledHazards: ['flash-floods', 'floods'], exposedAssets: 'Sukhnag–Ferozepora nallahs & Hokersar wetland inflow' }),

  // JAMMU (6)
  mkWatershed({ id: 'erc-jmu-01', name: 'Kishtwar – Honzar & Dachhan Gorge (2021 Benchmark)', district: 'Kishtwar', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 33.3136, longitude: 75.7673, elevation_m: 1638, watershedType: 'Steep Glacial / Pilgrimage Gorge', normalWeeklyRainMm: 8.5, coupledHazards: ['flash-floods', 'landslides'], exposedAssets: 'Marwah–Dachhan settlements & Chenab cascade reservoirs' }),
  mkWatershed({ id: 'erc-jmu-02', name: 'Ramban – Panthyal & Seri Cut-Slope Torrents', district: 'Ramban', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 33.2428, longitude: 75.2357, elevation_m: 750, watershedType: 'Pir Panjal Cut-Slope Torrent', normalWeeklyRainMm: 9.5, coupledHazards: ['landslides', 'flash-floods'], exposedAssets: 'NH-44 Ramban–Banihal tunnels, viaducts & Seri nallah' }),
  mkWatershed({ id: 'erc-jmu-03', name: 'Katra – Trikuta Banganga Escarpment', district: 'Reasi', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 32.9915, longitude: 74.9318, elevation_m: 875, watershedType: 'Windward Shivalik Escarpment', normalWeeklyRainMm: 6.5, coupledHazards: ['flash-floods', 'landslides'], exposedAssets: 'Vaishno Devi yatra track, Banganga & Chenab bridge sector' }),
  mkWatershed({ id: 'erc-jmu-04', name: 'Jammu – Tawi & Nikki Tawi Piedmont', district: 'Jammu', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 32.7266, longitude: 74.8570, elevation_m: 327, watershedType: 'Windward Shivalik Escarpment', normalWeeklyRainMm: 4.8, coupledHazards: ['floods', 'flash-floods'], exposedAssets: 'Tawi urban floodplain, bridges & low-lying Jammu wards' }),
  mkWatershed({ id: 'erc-jmu-05', name: 'Kathua – Ujh & Ravi Foothill Funnel', district: 'Kathua', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 32.3866, longitude: 75.5173, elevation_m: 393, watershedType: 'Windward Shivalik Escarpment', normalWeeklyRainMm: 5.2, coupledHazards: ['floods', 'flash-floods'], exposedAssets: 'Ujh barrage, Tarnah nallah & NH-44 corridor' }),
  mkWatershed({ id: 'erc-jmu-06', name: 'Rajouri – Darhal & Munawar Tawi Slopes', district: 'Rajouri', subRegion: 'Jammu', scope: 'Trans-Divisional', latitude: 33.3773, longitude: 74.3152, elevation_m: 915, watershedType: 'Windward Shivalik Escarpment', normalWeeklyRainMm: 7.0, coupledHazards: ['flash-floods', 'landslides'], exposedAssets: 'Rajouri town bridges & Kotranka hill roads' }),

  // LADAKH (3)
  mkWatershed({ id: 'erc-ldk-01', name: 'Leh – Saboo & Choglamsar Alluvial Fans (2010 Benchmark)', district: 'Leh', subRegion: 'Ladakh', scope: 'Trans-Divisional', latitude: 34.1526, longitude: 77.5771, elevation_m: 3520, watershedType: 'Arid Trans-Himalayan Debris Fan', normalWeeklyRainMm: 1.2, coupledHazards: ['flash-floods', 'landslides'], exposedAssets: 'Leh town, Choglamsar settlements & Indus bridges' }),
  mkWatershed({ id: 'erc-ldk-02', name: 'Kargil – Wakha Rong & Suru Debris Channels', district: 'Kargil', subRegion: 'Ladakh', scope: 'Trans-Divisional', latitude: 34.5539, longitude: 76.1349, elevation_m: 2676, watershedType: 'Arid Trans-Himalayan Debris Fan', normalWeeklyRainMm: 2.5, coupledHazards: ['flash-floods', 'landslides', 'glofs'], exposedAssets: 'NH-1 Kargil–Mulbekh culverts & Suru valley terraces' }),
  mkWatershed({ id: 'erc-ldk-03', name: 'Padum – Zanskar Tsarap–Stod Fan', district: 'Kargil', subRegion: 'Ladakh', scope: 'Trans-Divisional', latitude: 33.4650, longitude: 76.8770, elevation_m: 3660, watershedType: 'Arid Trans-Himalayan Debris Fan', normalWeeklyRainMm: 3.0, coupledHazards: ['flash-floods', 'glofs'], exposedAssets: 'Padum valley roads & proglacial moraine streams' }),

  // AZAD KASHMIR (4)
  mkWatershed({ id: 'erc-ajk-01', name: 'Leswa – Athmuqam Neelum Torrent (2019 Benchmark)', district: 'Neelum', subRegion: 'Azad Kashmir', scope: 'Transboundary / Extended', latitude: 34.5880, longitude: 73.9070, elevation_m: 1460, watershedType: 'Steep Glacial / Pilgrimage Gorge', normalWeeklyRainMm: 10.0, coupledHazards: ['flash-floods', 'landslides'], exposedAssets: 'Leswa bazaar, Neelum highway & side-stream bridges' }),
  mkWatershed({ id: 'erc-ajk-02', name: 'Muzaffarabad – Jhelum–Neelum Syntaxis Slopes', district: 'Muzaffarabad', subRegion: 'Azad Kashmir', scope: 'Transboundary / Extended', latitude: 34.3700, longitude: 73.4711, elevation_m: 737, watershedType: 'Windward Shivalik Escarpment', normalWeeklyRainMm: 8.5, coupledHazards: ['flash-floods', 'landslides', 'floods'], exposedAssets: 'Muzaffarabad urban slopes, Kohala road & bridges' }),
  mkWatershed({ id: 'erc-ajk-03', name: 'Rawalakot – Mahal River Steep Catchment', district: 'Poonch (AJK)', subRegion: 'Azad Kashmir', scope: 'Transboundary / Extended', latitude: 33.8578, longitude: 73.7604, elevation_m: 1638, watershedType: 'Pir Panjal Cut-Slope Torrent', normalWeeklyRainMm: 7.8, coupledHazards: ['flash-floods', 'landslides'], exposedAssets: 'Bagh–Rawalakot hill roads & Mahal gorge' }),
  mkWatershed({ id: 'erc-ajk-04', name: 'Mirpur – Mangla Inflow Piedmont', district: 'Mirpur', subRegion: 'Azad Kashmir', scope: 'Transboundary / Extended', latitude: 33.1482, longitude: 73.7519, elevation_m: 459, watershedType: 'Windward Shivalik Escarpment', normalWeeklyRainMm: 4.5, coupledHazards: ['floods', 'flash-floods'], exposedAssets: 'Mangla reservoir inflows & Kotli–Mirpur channels' }),

  // GILGIT (2 — Gilgit-Baltistan Administrative Unit)
  mkWatershed({ id: 'erc-glt-01', name: 'Babusar – Thak Nallah Chilas Corridor', district: 'Diamer', subRegion: 'Gilgit', scope: 'Transboundary / Extended', latitude: 35.4206, longitude: 74.0969, elevation_m: 1265, watershedType: 'Arid Trans-Himalayan Debris Fan', normalWeeklyRainMm: 3.5, coupledHazards: ['flash-floods', 'landslides', 'glofs'], exposedAssets: 'Babusar road, KKH Chilas rockfall cuts & tourist transit' }),
  mkWatershed({ id: 'erc-glt-02', name: 'Hunza – Hassanabad & Karimabad Debris Fans', district: 'Gilgit', subRegion: 'Gilgit', scope: 'Transboundary / Extended', latitude: 35.9208, longitude: 74.3144, elevation_m: 1460, watershedType: 'Arid Trans-Himalayan Debris Fan', normalWeeklyRainMm: 2.2, coupledHazards: ['glofs', 'flash-floods', 'landslides'], exposedAssets: 'KKH Hassanabad bridge & glacial meltwater torrents' }),

  // BALTISTAN (2 — Gilgit-Baltistan Administrative Unit)
  mkWatershed({ id: 'erc-blt-01', name: 'Skardu – Sadpara & Indus Alluvial Fans', district: 'Skardu', subRegion: 'Baltistan', scope: 'Transboundary / Extended', latitude: 35.2971, longitude: 75.6333, elevation_m: 2228, watershedType: 'Arid Trans-Himalayan Debris Fan', normalWeeklyRainMm: 2.4, coupledHazards: ['flash-floods', 'landslides'], exposedAssets: 'Skardu S-1 highway, Sadpara stream & valley settlements' }),
  mkWatershed({ id: 'erc-blt-02', name: 'Khaplu – Ghanche Hushe–Shyok Torrents', district: 'Ghanche', subRegion: 'Baltistan', scope: 'Transboundary / Extended', latitude: 35.1667, longitude: 76.3333, elevation_m: 2600, watershedType: 'Arid Trans-Himalayan Debris Fan', normalWeeklyRainMm: 2.0, coupledHazards: ['flash-floods', 'glofs'], exposedAssets: 'Khaplu–Hushe bridges & Shyok terrace villages (2022 flood scar)' }),
];

export const HISTORICAL_CLOUDBURST_RECORDS = [
  { id: 'cb-2010-leh', code: 'CB-2010-LEH', title: 'August 2010 Leh Nocturnal Convective Cloudbursts', dates: '5–6 August 2010', intensity: '>75–120 mm estimated localized core over arid Ladakh fans', subRegions: ['Ladakh'], impact: 'Catastrophic hyper-concentrated debris flows across Leh, Saboo, and Choglamsar during anomalous northward monsoon intrusion.', source: 'IMD Special Report & Rasmussen & Houze (2012)' },
  { id: 'cb-2019-leswa', code: 'CB-2019-NEELUM', title: 'July 2019 Leswa (Neelum Valley) Cloudburst & Torrent Surge', dates: '14–15 July 2019', intensity: 'Intense localized convective downpour over steep Neelum side-gorge', subRegions: ['Azad Kashmir'], impact: 'Rapid debris torrent destroyed homes, shops, and bridges in Leswa (Athmuqam sector).', source: 'PMD & SDMA Azad Kashmir Post-Disaster Report (2019)' },
  { id: 'cb-2021-honzar', code: 'CB-2021-KISHTWAR', title: 'July 2021 Honzar (Dachhan, Kishtwar) Cloudburst', dates: '28 July 2021', intensity: 'Severe pre-dawn orographic convective burst in Marwah–Dachhan valley', subRegions: ['Jammu', 'Kashmir'], impact: 'Triggered sudden boulder-mudflow surge in Honzar village and simultaneous Amarnath/Bandipora flash runoff.', source: 'IMD Srinagar & JKSDMA Incident Dossier (2021)' },
  { id: 'cb-2022-amarnath', code: 'CB-2022-AMARNATH', title: 'July 2022 Upper Lidder / Amarnath Gorge Intense Downpour', dates: '8 July 2022', intensity: 'Localized high-altitude convective cell over steep unvegetated cirque above 3,800 m', subRegions: ['Kashmir'], impact: 'Generated rapid flash runoff down the dry gulley adjacent to the holy cave camp.', source: 'IMD Doppler Radar Analysis & NRSC Satellite Assessment (2022)' },
];
