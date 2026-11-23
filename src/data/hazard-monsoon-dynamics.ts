export type MonsoonScope = 'Kashmir Core' | 'Trans-Divisional' | 'Transboundary / Extended';
export type MonsoonSubRegion = 'Kashmir' | 'Jammu' | 'Ladakh' | 'Azad Kashmir' | 'Gilgit' | 'Baltistan';
export type HazardLevel = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface MonsoonCorridorStation {
  id: string;
  name: string;
  district: string;
  subRegion: MonsoonSubRegion;
  scope: MonsoonScope;
  latitude: number;
  longitude: number;
  elevation_m: number;
  exposureRegime: 'Windward Shivalik Gate' | 'Pir Panjal Spillover' | 'Valley Orographic Basin' | 'Trans-Himalayan Intrusion';
  normalNovWeeklyRainMm: number;
  normalJulAugWeeklyRainMm: number;
  coupledHazards: Array<'floods' | 'flash-floods' | 'landslides' | 'glofs'>;
  exposedSystem: string;
}

export interface MoistureTransportNode {
  id: string;
  name: string;
  branch: 'Arabian Sea Branch' | 'Bay of Bengal Trough' | 'Potwar–Punjab Convergence' | 'Pir Panjal Crest';
  latitude: number;
  longitude: number;
}

export interface MonsoonCorridorLiveRecord extends MonsoonCorridorStation {
  liveObservation: {
    temp_c: number;
    dew_point_c: number;
    humidity_2m_pct: number;
    rh_850hpa_pct: number;
    wind_850hpa_kmh: number;
    wind_850hpa_dir: number;
    cape_jkg: number;
    precip_current_mm: number;
    past7d_rain_mm: number;
    climatology7d_normal_mm: number;
    anomaly_mm: number;
    anomaly_pct: number;
  };
  forecast7d: {
    total_rain_mm: number;
    peak_daily_mm: number;
    max_prob_pct: number;
    max_cape_jkg: number;
    daily: Array<{
      date: string;
      rain_mm: number;
      prob_pct: number;
    }>;
  };
  monsoonState: 'Seasonal Withdrawal / Post-Monsoon Dry' | 'Pre-Monsoon Convective' | 'Active Monsoon Surge' | 'Orographic Moisture Intrusion';
  coupledRisk: {
    floods: HazardLevel;
    flashFloods: HazardLevel;
    landslides: HazardLevel;
    glofs: HazardLevel;
    overall: HazardLevel;
  };
}

export const MOISTURE_TRANSPORT_NODES: MoistureTransportNode[] = [
  { id: 'mt-arb', name: 'Northern Arabian Sea Moisture Gate', branch: 'Arabian Sea Branch', latitude: 24.85, longitude: 67.00 },
  { id: 'mt-bob', name: 'Indo-Gangetic Monsoon Trough Axis', branch: 'Bay of Bengal Trough', latitude: 28.60, longitude: 77.20 },
  { id: 'mt-ptw', name: 'Punjab–Potwar Foothill Convergence', branch: 'Potwar–Punjab Convergence', latitude: 32.10, longitude: 74.20 },
  { id: 'mt-ppj', name: 'Pir Panjal Orographic Barrier Crest', branch: 'Pir Panjal Crest', latitude: 33.65, longitude: 74.85 },
];

export const MONSOON_CORRIDOR_STATIONS: MonsoonCorridorStation[] = [
  // JAMMU (6 — Primary Windward Monsoon Front)
  {
    id: 'mon-jmu-01',
    name: 'Reasi – Katra Trikuta Windward Escarpment',
    district: 'Reasi',
    subRegion: 'Jammu',
    scope: 'Trans-Divisional',
    latitude: 32.9915,
    longitude: 74.9318,
    elevation_m: 875,
    exposureRegime: 'Windward Shivalik Gate',
    normalNovWeeklyRainMm: 6.5,
    normalJulAugWeeklyRainMm: 145.0,
    coupledHazards: ['flash-floods', 'landslides'],
    exposedSystem: 'Trikuta hill slopes, Banganga torrent & Salal reservoir catchment',
  },
  {
    id: 'mon-jmu-02',
    name: 'Jammu – Tawi Floodplain & Shivalik Belt',
    district: 'Jammu',
    subRegion: 'Jammu',
    scope: 'Trans-Divisional',
    latitude: 32.7266,
    longitude: 74.8570,
    elevation_m: 327,
    exposureRegime: 'Windward Shivalik Gate',
    normalNovWeeklyRainMm: 4.8,
    normalJulAugWeeklyRainMm: 98.0,
    coupledHazards: ['floods', 'flash-floods'],
    exposedSystem: 'Tawi River bridges, Nikki Tawi islands & urban storm channels',
  },
  {
    id: 'mon-jmu-03',
    name: 'Kathua – Ravi & Ujh Monsoon Funnel',
    district: 'Kathua',
    subRegion: 'Jammu',
    scope: 'Trans-Divisional',
    latitude: 32.3866,
    longitude: 75.5173,
    elevation_m: 393,
    exposureRegime: 'Windward Shivalik Gate',
    normalNovWeeklyRainMm: 5.2,
    normalJulAugWeeklyRainMm: 122.0,
    coupledHazards: ['floods', 'flash-floods'],
    exposedSystem: 'Ujh barrage, Tarnah nallah & NH-44 Lakhanpur–Kathua bridges',
  },
  {
    id: 'mon-jmu-04',
    name: 'Rajouri – Munawar Tawi Orographic Front',
    district: 'Rajouri',
    subRegion: 'Jammu',
    scope: 'Trans-Divisional',
    latitude: 33.3773,
    longitude: 74.3152,
    elevation_m: 915,
    exposureRegime: 'Windward Shivalik Gate',
    normalNovWeeklyRainMm: 7.0,
    normalJulAugWeeklyRainMm: 92.0,
    coupledHazards: ['flash-floods', 'landslides'],
    exposedSystem: 'Darhal–Thanamandi steep streams & Rajouri town bridges',
  },
  {
    id: 'mon-jmu-05',
    name: 'Ramban – Chenab Gorge Monsoon–WD Lock Zone',
    district: 'Ramban',
    subRegion: 'Jammu',
    scope: 'Trans-Divisional',
    latitude: 33.2428,
    longitude: 75.2357,
    elevation_m: 1150,
    exposureRegime: 'Pir Panjal Spillover',
    normalNovWeeklyRainMm: 9.5,
    normalJulAugWeeklyRainMm: 68.0,
    coupledHazards: ['landslides', 'flash-floods'],
    exposedSystem: 'NH-44 Ramban–Banihal cut-slopes & Baglihar reservoir inflow',
  },
  {
    id: 'mon-jmu-06',
    name: 'Kishtwar – Honzar & Marwah Cloudburst Sector',
    district: 'Kishtwar',
    subRegion: 'Jammu',
    scope: 'Trans-Divisional',
    latitude: 33.3136,
    longitude: 75.7673,
    elevation_m: 1640,
    exposureRegime: 'Trans-Himalayan Intrusion',
    normalNovWeeklyRainMm: 8.5,
    normalJulAugWeeklyRainMm: 42.0,
    coupledHazards: ['flash-floods', 'landslides', 'glofs'],
    exposedSystem: 'Dachhan/Marwah steep valleys & Chenab hydropower cascade',
  },

  // KASHMIR (7 — Pir Panjal Spillover & Valley Basins)
  {
    id: 'mon-kas-01',
    name: 'Qazigund – Vishaw Southern Spillover Saddle',
    district: 'Kulgam',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 33.5900,
    longitude: 75.1600,
    elevation_m: 1670,
    exposureRegime: 'Pir Panjal Spillover',
    normalNovWeeklyRainMm: 10.2,
    normalJulAugWeeklyRainMm: 48.0,
    coupledHazards: ['floods', 'flash-floods'],
    exposedSystem: 'Vishaw & Sandran rivers feeding Sangam flood gauge',
  },
  {
    id: 'mon-kas-02',
    name: 'Pahalgam – Amarnath–Lidder Orographic Cell',
    district: 'Anantnag',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 34.0161,
    longitude: 75.3150,
    elevation_m: 2150,
    exposureRegime: 'Valley Orographic Basin',
    normalNovWeeklyRainMm: 11.0,
    normalJulAugWeeklyRainMm: 44.0,
    coupledHazards: ['flash-floods', 'glofs', 'floods'],
    exposedSystem: 'Upper Lidder valleys, Kolahoi meltwater & Pahalgam corridor',
  },
  {
    id: 'mon-kas-03',
    name: 'Srinagar – Central Jhelum & Dal Retention Basin',
    district: 'Srinagar',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 34.0837,
    longitude: 74.7973,
    elevation_m: 1585,
    exposureRegime: 'Valley Orographic Basin',
    normalNovWeeklyRainMm: 7.5,
    normalJulAugWeeklyRainMm: 28.0,
    coupledHazards: ['floods'],
    exposedSystem: 'Ram Munshi Bagh flood spill channel, Dal–Anchar & Bemina wetlands',
  },
  {
    id: 'mon-kas-04',
    name: 'Ganderbal – Sindh & Baltal Convective Gorge',
    district: 'Ganderbal',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 34.2262,
    longitude: 74.7748,
    elevation_m: 1650,
    exposureRegime: 'Valley Orographic Basin',
    normalNovWeeklyRainMm: 9.0,
    normalJulAugWeeklyRainMm: 36.0,
    coupledHazards: ['flash-floods', 'landslides'],
    exposedSystem: 'Sindh River HEP canal, Baltal–Zoji La & Wayil bridge',
  },
  {
    id: 'mon-kas-05',
    name: 'Shopian – Rambiara Pir Panjal Leeward Slope',
    district: 'Shopian',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 33.7172,
    longitude: 74.8343,
    elevation_m: 2057,
    exposureRegime: 'Pir Panjal Spillover',
    normalNovWeeklyRainMm: 8.8,
    normalJulAugWeeklyRainMm: 38.0,
    coupledHazards: ['flash-floods', 'floods'],
    exposedSystem: 'Rambiara boulder-bed torrent & Mughal Road bridges',
  },
  {
    id: 'mon-kas-06',
    name: 'Baramulla – Lower Jhelum Outflow Gorge',
    district: 'Baramulla',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 34.1990,
    longitude: 74.3636,
    elevation_m: 1590,
    exposureRegime: 'Valley Orographic Basin',
    normalNovWeeklyRainMm: 8.4,
    normalJulAugWeeklyRainMm: 31.0,
    coupledHazards: ['floods', 'landslides'],
    exposedSystem: 'Wular–Sopore–Baramulla outfall channel & Uri gorge',
  },
  {
    id: 'mon-kas-07',
    name: 'Kupwara – Pohru & Kehmil Basin',
    district: 'Kupwara',
    subRegion: 'Kashmir',
    scope: 'Kashmir Core',
    latitude: 34.5262,
    longitude: 74.2546,
    elevation_m: 1620,
    exposureRegime: 'Valley Orographic Basin',
    normalNovWeeklyRainMm: 10.5,
    normalJulAugWeeklyRainMm: 34.0,
    coupledHazards: ['flash-floods', 'floods'],
    exposedSystem: 'Pohru–Mawar confluence & Handwara floodplain',
  },

  // LADAKH (3 — Trans-Himalayan Rain-Shadow & Anomalous Monsoon Intrusions)
  {
    id: 'mon-ldk-01',
    name: 'Leh – Indus Alluvial Fans (2010 Intrusion Benchmark)',
    district: 'Leh',
    subRegion: 'Ladakh',
    scope: 'Trans-Divisional',
    latitude: 34.1526,
    longitude: 77.5771,
    elevation_m: 3520,
    exposureRegime: 'Trans-Himalayan Intrusion',
    normalNovWeeklyRainMm: 1.2,
    normalJulAugWeeklyRainMm: 8.5,
    coupledHazards: ['flash-floods', 'glofs', 'landslides'],
    exposedSystem: 'Saboo/Choglamsar debris-flow fans (extremely sensitive to >15mm monsoon bursts)',
  },
  {
    id: 'mon-ldk-02',
    name: 'Zanskar – Padum & Stod–Tsarap Confluence',
    district: 'Kargil',
    subRegion: 'Ladakh',
    scope: 'Trans-Divisional',
    latitude: 33.4650,
    longitude: 76.8770,
    elevation_m: 3660,
    exposureRegime: 'Trans-Himalayan Intrusion',
    normalNovWeeklyRainMm: 3.0,
    normalJulAugWeeklyRainMm: 14.0,
    coupledHazards: ['glofs', 'flash-floods'],
    exposedSystem: 'Phuktal/Tsarap gorge & proglacial moraine lakes under warm rain',
  },
  {
    id: 'mon-ldk-03',
    name: 'Kargil – Suru & Wakha Rong Sector',
    district: 'Kargil',
    subRegion: 'Ladakh',
    scope: 'Trans-Divisional',
    latitude: 34.5539,
    longitude: 76.1349,
    elevation_m: 2676,
    exposureRegime: 'Trans-Himalayan Intrusion',
    normalNovWeeklyRainMm: 2.5,
    normalJulAugWeeklyRainMm: 10.5,
    coupledHazards: ['flash-floods', 'glofs'],
    exposedSystem: 'Suru River terraces, Parkachik moraine zone & NH-1',
  },

  // AZAD KASHMIR (4 — Hazara–Kashmir Syntaxis Monsoon Funnel)
  {
    id: 'mon-ajk-01',
    name: 'Muzaffarabad – Kohala Hazara–Kashmir Syntaxis',
    district: 'Muzaffarabad',
    subRegion: 'Azad Kashmir',
    scope: 'Transboundary / Extended',
    latitude: 34.3700,
    longitude: 73.4711,
    elevation_m: 737,
    exposureRegime: 'Windward Shivalik Gate',
    normalNovWeeklyRainMm: 8.5,
    normalJulAugWeeklyRainMm: 112.0,
    coupledHazards: ['flash-floods', 'landslides', 'floods'],
    exposedSystem: 'Jhelum–Neelum syntaxis slopes, Lohar Gali landslide scar & bridges',
  },
  {
    id: 'mon-ajk-02',
    name: 'Mirpur – Mangla Monsoon Inflow Catchment',
    district: 'Mirpur',
    subRegion: 'Azad Kashmir',
    scope: 'Transboundary / Extended',
    latitude: 33.1482,
    longitude: 73.7519,
    elevation_m: 459,
    exposureRegime: 'Windward Shivalik Gate',
    normalNovWeeklyRainMm: 4.5,
    normalJulAugWeeklyRainMm: 95.0,
    coupledHazards: ['floods', 'flash-floods'],
    exposedSystem: 'Mangla Reservoir flood storage & Poonch–Kanshi inflows',
  },
  {
    id: 'mon-ajk-03',
    name: 'Kotli – Poonch River Orographic Foothills',
    district: 'Kotli',
    subRegion: 'Azad Kashmir',
    scope: 'Transboundary / Extended',
    latitude: 33.5156,
    longitude: 73.9019,
    elevation_m: 610,
    exposureRegime: 'Windward Shivalik Gate',
    normalNovWeeklyRainMm: 5.8,
    normalJulAugWeeklyRainMm: 104.0,
    coupledHazards: ['flash-floods', 'landslides'],
    exposedSystem: 'Kotli–Tatta Pani road & Poonch River gorge',
  },
  {
    id: 'mon-ajk-04',
    name: 'Neelum – Leswa & Athmuqam Convective Gorge',
    district: 'Neelum',
    subRegion: 'Azad Kashmir',
    scope: 'Transboundary / Extended',
    latitude: 34.5880,
    longitude: 73.9070,
    elevation_m: 1460,
    exposureRegime: 'Pir Panjal Spillover',
    normalNovWeeklyRainMm: 10.0,
    normalJulAugWeeklyRainMm: 62.0,
    coupledHazards: ['flash-floods', 'landslides'],
    exposedSystem: 'Leswa side-stream debris fans & Neelum Valley highway',
  },

  // GILGIT (2 — Northward Monsoon Intrusion & GLOF Coupling)
  {
    id: 'mon-glt-01',
    name: 'Diamer – Chilas & Babusar Monsoon Intrusion Gate',
    district: 'Diamer',
    subRegion: 'Gilgit',
    scope: 'Transboundary / Extended',
    latitude: 35.4206,
    longitude: 74.0969,
    elevation_m: 1265,
    exposureRegime: 'Trans-Himalayan Intrusion',
    normalNovWeeklyRainMm: 3.5,
    normalJulAugWeeklyRainMm: 18.0,
    coupledHazards: ['flash-floods', 'landslides', 'glofs'],
    exposedSystem: 'Babusar–Thak Nallah flash-flood corridor & KKH rockfall cuts',
  },
  {
    id: 'mon-glt-02',
    name: 'Gilgit – Hunza Shisper/Hassanabad GLOF Watch',
    district: 'Gilgit',
    subRegion: 'Gilgit',
    scope: 'Transboundary / Extended',
    latitude: 35.9208,
    longitude: 74.3144,
    elevation_m: 1500,
    exposureRegime: 'Trans-Himalayan Intrusion',
    normalNovWeeklyRainMm: 2.2,
    normalJulAugWeeklyRainMm: 12.0,
    coupledHazards: ['glofs', 'flash-floods', 'landslides'],
    exposedSystem: 'Hunza KKH bridges & warm-rain/heat-triggered Karakoram GLOFs',
  },

  // BALTISTAN (2 — Upper Indus & Shyok Monsoon Margin)
  {
    id: 'mon-blt-01',
    name: 'Skardu – Upper Indus & Kachura Basin',
    district: 'Skardu',
    subRegion: 'Baltistan',
    scope: 'Transboundary / Extended',
    latitude: 35.2971,
    longitude: 75.6333,
    elevation_m: 2228,
    exposureRegime: 'Trans-Himalayan Intrusion',
    normalNovWeeklyRainMm: 2.4,
    normalJulAugWeeklyRainMm: 11.0,
    coupledHazards: ['flash-floods', 'glofs'],
    exposedSystem: 'Skardu S-1 highway & Sadpara/Deosai runoff streams',
  },
  {
    id: 'mon-blt-02',
    name: 'Ghanche – Khaplu Shyok Glacial Tributaries',
    district: 'Ghanche',
    subRegion: 'Baltistan',
    scope: 'Transboundary / Extended',
    latitude: 35.1667,
    longitude: 76.3333,
    elevation_m: 2600,
    exposureRegime: 'Trans-Himalayan Intrusion',
    normalNovWeeklyRainMm: 2.0,
    normalJulAugWeeklyRainMm: 10.0,
    coupledHazards: ['glofs', 'flash-floods'],
    exposedSystem: 'Hushe–Shyok glacial fan settlements (impacted during Aug 2022 intrusion)',
  },
];

export const HISTORICAL_MONSOON_RECORDS = [
  {
    id: 'mon-hist-2010',
    code: 'MON-2010-LEH',
    title: 'August 2010 Trans-Himalayan Monsoon Intrusion & Leh Cloudburst',
    dates: '5–6 August 2010',
    anomaly: '>+600% daily rainfall anomaly over arid Ladakh',
    impact: 'Rare northward penetration of Bay of Bengal & Arabian Sea moisture across the Great Himalaya triggered nocturnal convective cloudbursts over Leh/Choglamsar debris fans.',
    source: 'IMD Special Report & Rasmussen & Houze (2012) Monthly Weather Review',
  },
  {
    id: 'mon-hist-2014',
    code: 'MON-2014-KAS',
    title: 'September 2014 Monsoon Depression – Western Disturbance Phase-Lock',
    dates: '2–7 September 2014',
    anomaly: '+480% 5-day basin rainfall anomaly (Jhelum & Chenab)',
    impact: 'Classic compound interaction between a recurving monsoon low and an extratropical WD trough produced historic inundation across Kashmir, Jammu, and Mangla inflows.',
    source: 'IMD / CWC Hydrometeorological Monograph (2015)',
  },
  {
    id: 'mon-hist-2022',
    code: 'MON-2022-GB-AJK',
    title: 'July–August 2022 Poleward Monsoon Shift & Karakoram GLOF Cascade',
    dates: 'July–August 2022',
    anomaly: '+240% to +380% summer rainfall across AJK & Gilgit-Baltistan',
    impact: 'Repeated northward monsoon surges over warm Karakoram/Hindu Kush valleys accelerated glacial melt, flash floods, and moraine-dammed outbursts across Hunza, Diamer, and Ghanche.',
    source: 'PMD Post-Monsoon Climate Assessment (2022) & ICIMOD Cryosphere Brief',
  },
];
