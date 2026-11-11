import { ModuleKpi } from '@/components/common/ModuleKpiStrip';
import { EhiiShowcaseItem } from '@/components/earth-human-impact/EhiiHeroShowcaseCard';

export interface EhiiSubmoduleHeroConfig {
  tag: string;
  badge: string;
  showcaseItems: EhiiShowcaseItem[];
  kpis: ModuleKpi[];
}

export const EHII_HERO_CONFIGS: Record<string, EhiiSubmoduleHeroConfig> = {
  hub: {
    tag: 'EHII Spaceborne Telemetry',
    badge: '7 Active Disciplines',
    showcaseItems: [
      {
        id: 'karewa',
        title: 'Karewa Excavation & Geological Loss',
        subtitle: 'Pleistocene lacustrine plateau leveling for infrastructure embankment fill',
        location: 'Pulwama & Budgam',
        metrics: '42.6 km² Leveled Scars',
        status: 'Critical Alert',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Karewas'
      },
      {
        id: 'glaciers',
        title: 'Cryosphere Retreat & Glacier Loss',
        subtitle: 'Rapid terminus retreat & early snowline rise across Kashmir basins',
        location: 'Kolahoi & Thajwas',
        metrics: '-16.2 m/yr Snout Retreat',
        status: 'Cryosphere Alert',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/bear.png',
        short: 'Glaciers'
      },
      {
        id: 'forests',
        title: 'Forest Canopy Density & Fragmentation',
        subtitle: 'Very Dense Forest attrition into Open Forest along transport corridors',
        location: 'Pir Panjal & Baramulla',
        metrics: '12,400 ha Degraded',
        status: 'Severe Stress',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/tiger.png',
        short: 'Canopy'
      },
      {
        id: 'riverbeds',
        title: 'Riverbed Incision & Dredging',
        subtitle: 'Mechanized heavy boulder and sand extraction altering river geomorphology',
        location: 'Jhelum & Rambiara',
        metrics: '118 km Scoured Riverbed',
        status: 'NGT Benchmark',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/markhor.png',
        short: 'Riverbeds'
      }
    ],
    kpis: [
      { label: 'Valley Temp Anomaly', value: '+1.42°C', icon: 'Thermometer', color: 'text-amber-400' },
      { label: 'Farmland Loss Rate', value: '2,150 ha/yr', icon: 'TrendingDown', color: 'text-rose-400' },
      { label: 'River Mining Reaches', value: '118 km', icon: 'Activity', color: 'text-rose-400' },
      { label: 'Karewa Mining Scars', value: '42.6 km²', icon: 'Mountain', color: 'text-orange-400' },
      { label: 'Kolahoi Snout Recession', value: '-16.2 m/yr', icon: 'Droplets', color: 'text-cyan-400' },
      { label: 'Urban Heat Island', value: '+3.8°C', icon: 'Sun', color: 'text-yellow-400' },
      { label: 'Active Observatories', value: '7 Systems', icon: 'Satellite', color: 'text-emerald-400' },
      { label: 'Monitored Basins', value: '10 Districts', icon: 'Map', color: 'text-teal-400' }
    ]
  },

  'climate-atmosphere': {
    tag: 'EHII-CLIM Telemetry Stream',
    badge: 'Atmospheric Physics',
    showcaseItems: [
      {
        id: 'temp',
        title: 'Valley Warming & High Anomalies',
        subtitle: 'Multi-decadal daily records establishing accelerated warming gradient',
        location: 'Srinagar & Valley Floor',
        metrics: '+1.42°C Above Normal',
        status: 'Accelerating',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/protected-network.png',
        short: 'Temperature'
      },
      {
        id: 'swe',
        title: 'Snow-Water Equivalent Deficit',
        subtitle: 'Substantial snow accumulation decline across elevation transects',
        location: 'Pir Panjal Crests',
        metrics: '265 mm SWE (380 mm Normal)',
        status: 'Severe Deficit',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/bear.png',
        short: 'SWE Deficit'
      },
      {
        id: 'chill',
        title: 'Winter Chill Hour Accumulation',
        subtitle: 'Critical chill hour decline impacting apple floral dormancy cycles',
        location: 'Horticulture Belts',
        metrics: '-18% Chill Accumulation',
        status: 'Ecological Alert',
        statusColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        src: '/images/tiger.png',
        short: 'Chill Hours'
      },
      {
        id: 'isotherm',
        title: 'Zero-Degree Isotherm Displacement',
        subtitle: 'Upward elevation movement of freezing level causing winter rain',
        location: 'Subalpine Altitudes',
        metrics: '+280 m Upward Shift',
        status: 'Thermal Line',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/markhor.png',
        short: 'Isotherm'
      }
    ],
    kpis: [
      { label: 'Mean Temp Anomaly', value: '+1.42°C', icon: 'Thermometer', color: 'text-amber-400' },
      { label: 'Winter Chill Deficit', value: '-18%', icon: 'Clock', color: 'text-orange-400' },
      { label: 'Snow Drought Rate', value: '3.2x / Dec', icon: 'CloudRain', color: 'text-rose-400' },
      { label: 'Zero Isotherm Shift', value: '+280 m', icon: 'TrendingUp', color: 'text-sky-400' },
      { label: 'Snow-Water Storage', value: '265 mm', icon: 'Snowflake', color: 'text-cyan-400' },
      { label: 'Weather Stations', value: '14 Synoptic', icon: 'Activity', color: 'text-emerald-400' },
      { label: 'Monitored Altitude', value: '1580–5400m', icon: 'Mountain', color: 'text-teal-400' },
      { label: 'IMD Station Normal', value: '1981–2025', icon: 'Calendar', color: 'text-slate-300' }
    ]
  },

  'forests-landscapes': {
    tag: 'EHII-FOR Canopy Telemetry',
    badge: 'Canopy Physics',
    showcaseItems: [
      {
        id: 'dense',
        title: 'Very Dense Forest Degradation',
        subtitle: 'Canopy density dropping below 70% in high-altitude fir and pine belts',
        location: 'North Baramulla & Kupwara',
        metrics: '12,400 ha Fragmented',
        status: 'Critical Alert',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'VDF Loss'
      },
      {
        id: 'treeline',
        title: 'Alpine Treeline Elevation Shifts',
        subtitle: 'Himalayan Birch (Betula utilis) climbing upward due to thermal stress',
        location: 'Great Himalayan Range',
        metrics: '+68 m Treeline Advance',
        status: 'Ecotone Shift',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/bear.png',
        short: 'Treeline'
      },
      {
        id: 'linear',
        title: 'Linear Infrastructure Clearcuts',
        subtitle: 'Transmission corridors and highway expansion bisecting old-growth',
        location: 'Pir Panjal Foothills',
        metrics: '340 km Fragmented',
        status: 'Severance',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/tiger.png',
        short: 'Corridors'
      },
      {
        id: 'hangul',
        title: 'Hangul Winter Buffer Woodland',
        subtitle: 'Canopy density preservation in Dachigam-Tral-Overa conservation matrix',
        location: 'Dachigam & Tral Ridges',
        metrics: '141 km² Prime Habitat',
        status: 'Refugia Node',
        statusColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        src: '/images/markhor.png',
        short: 'Hangul Range'
      }
    ],
    kpis: [
      { label: 'Very Dense Canopy Loss', value: '-8.4%', icon: 'Trees', color: 'text-rose-400' },
      { label: 'Fragmentation Index', value: '0.64 High', icon: 'Layers', color: 'text-amber-400' },
      { label: 'Linear Clearances', value: '340 km', icon: 'Compass', color: 'text-orange-400' },
      { label: 'Treeline Displacement', value: '+68 m', icon: 'TrendingUp', color: 'text-emerald-400' },
      { label: 'Monitored Divisions', value: '10 Forest Div', icon: 'Map', color: 'text-teal-400' },
      { label: 'FSI Baseline Calibration', value: '1:50,000 RS', icon: 'Satellite', color: 'text-cyan-400' },
      { label: 'Total Forest Biome', value: '20,230 km²', icon: 'Shield', color: 'text-emerald-300' },
      { label: 'Critical Corridors', value: '16 Monitored', icon: 'Activity', color: 'text-white' }
    ]
  },

  'land-earth-systems': {
    tag: 'EHII-GEO Quaternary Geology',
    badge: 'Geomorphology',
    showcaseItems: [
      {
        id: 'loess',
        title: 'Karewa Terraces Excavation',
        subtitle: 'Pleistocene lacustrine plateaus strip-mined for railway and highway fill',
        location: 'Pampore, Budgam, Pulwama',
        metrics: '42.6 km² Leveled Area',
        status: 'Critical Alert',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Karewa Scars'
      },
      {
        id: 'saffron',
        title: 'Saffron Soil Degradation',
        subtitle: 'Loss of fertile post-lacustrine loess soil suited for saffron corms',
        location: 'Pampore Plateau',
        metrics: '-46% Saffron Acreage',
        status: 'Soil Loss',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/bear.png',
        short: 'Saffron Soil'
      },
      {
        id: 'quarries',
        title: 'Hard Rock Escarpment Blasting',
        subtitle: 'Limestone blasting and mountain slope undermining across foothills',
        location: 'Khrew & Zabarwan Foothills',
        metrics: '28 Active Points',
        status: 'Slope Hazard',
        statusColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        src: '/images/tiger.png',
        short: 'Blasting'
      },
      {
        id: 'landslides',
        title: 'Debris Flow & Slump Initiation',
        subtitle: 'Steep road cuts triggering active colluvial slope failures along NH-44',
        location: 'Ramban & Pir Panjal',
        metrics: '14 Active Failures',
        status: 'Geohazard',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/markhor.png',
        short: 'Slope Slump'
      }
    ],
    kpis: [
      { label: 'Karewa Plateau Leveled', value: '42.6 km²', icon: 'Mountain', color: 'text-rose-400' },
      { label: 'Soil Infiltration Loss', value: '-38.2%', icon: 'Droplets', color: 'text-amber-400' },
      { label: 'Active Quarry Nodes', value: '28 Points', icon: 'AlertTriangle', color: 'text-orange-400' },
      { label: 'Unstable Slopes', value: '14 Failures', icon: 'Activity', color: 'text-yellow-400' },
      { label: 'Lacustrine Deposits', value: 'Quaternary', icon: 'Layers', color: 'text-cyan-400' },
      { label: 'Railway Embankment Fill', value: '18.4M MT', icon: 'TrendingDown', color: 'text-red-400' },
      { label: 'Plateaus Surveyed', value: '16 Karewas', icon: 'Map', color: 'text-teal-400' },
      { label: 'GSI Geodetic Grade', value: 'Grade A', icon: 'ShieldCheck', color: 'text-emerald-400' }
    ]
  },

  'aquatic-cryosphere': {
    tag: 'EHII-HYDRO Freshwater Telemetry',
    badge: 'Cryosphere & Limnology',
    showcaseItems: [
      {
        id: 'kolahoi',
        title: 'Kolahoi Glacial Terminus Retreat',
        subtitle: 'Multi-decadal dGPS and satellite retreat tracking on Kashmir’s water tower',
        location: 'Lidder Catchment (3,800m)',
        metrics: '-16.2 m/yr Snout Retreat',
        status: 'Thermal Loss',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/bear.png',
        short: 'Kolahoi'
      },
      {
        id: 'hokersar',
        title: 'Hokersar Ramsar Basin Shrinkage',
        subtitle: 'Siltation and perimeter construction encroachment constricting bird basin',
        location: 'Budgam / Srinagar Basin',
        metrics: '-18.4 ha/yr Conversion',
        status: 'Critical Alert',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Hokersar'
      },
      {
        id: 'wular',
        title: 'Wular Lake Siltation & Encroachment',
        subtitle: 'Willow plantation silt traps and peripheral agricultural conversion',
        location: 'Bandipora (189 km²)',
        metrics: '-34% Open Water Area',
        status: 'Severe Siltation',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/tiger.png',
        short: 'Wular Basin'
      },
      {
        id: 'springs',
        title: 'Karst Community Springs Depletion',
        subtitle: 'Recharge zone excavation causing discharge drying in Karewa springs',
        location: 'Achabal & Verinag Belts',
        metrics: '-31.4% Spring Yield',
        status: 'Groundwater Alert',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/markhor.png',
        short: 'Springshed'
      }
    ],
    kpis: [
      { label: 'Lake Open-Water Loss', value: '-18.4 ha/yr', icon: 'Droplets', color: 'text-rose-400' },
      { label: 'Wetland Conversion', value: '-34.8 ha/yr', icon: 'TrendingDown', color: 'text-amber-400' },
      { label: 'Kolahoi Snout Retreat', value: '-16.2 m/yr', icon: 'Mountain', color: 'text-cyan-400' },
      { label: 'Spring Yield Decline', value: '-31.4%', icon: 'Clock', color: 'text-rose-400' },
      { label: 'Monitored Community Springs', value: '180 Points', icon: 'Activity', color: 'text-teal-400' },
      { label: 'Ramsar Basins Audited', value: '5 Sites', icon: 'Shield', color: 'text-emerald-400' },
      { label: 'MNDWI Satellite Calib', value: 'Sentinel-2', icon: 'Satellite', color: 'text-sky-400' },
      { label: 'Multi-Decadal Ledger', value: '1985–2026', icon: 'Calendar', color: 'text-slate-300' }
    ]
  },

  'energy-infrastructure': {
    tag: 'EHII-ENG Energy Telemetry',
    badge: 'Hydro & Grid Infra',
    showcaseItems: [
      {
        id: 'ror',
        title: 'Run-of-River Hydro Diversions',
        subtitle: 'Sub-surface headrace tunnels causing river reach dewatering',
        location: 'Lidder, Sindh, Chenab',
        metrics: '14 Hydro Cascades',
        status: 'Hydrologic Stress',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/protected-network.png',
        short: 'Hydro Tunnels'
      },
      {
        id: 'grid',
        title: 'High-Voltage Transmission Corridors',
        subtitle: 'Power grids traversing alpine passes causing bird collision risks',
        location: 'Peer Ki Gali & Mughal Road',
        metrics: '132 kV / 400 kV Lines',
        status: 'Flyway Risk',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/bear.png',
        short: 'Grid Lines'
      },
      {
        id: 'muck',
        title: 'Tunnel Muck Dumping in Streams',
        subtitle: 'Uncontained rock muck causing catastrophic riverbed sedimentation',
        location: 'Chenab & Tributaries',
        metrics: '6.4M MT Excavated Muck',
        status: 'Sediment Alert',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/tiger.png',
        short: 'Muck Dumps'
      },
      {
        id: 'solar',
        title: 'Alpine Solar Land Conversion',
        subtitle: 'Large ground-mounted PV arrays proposed on pastoral grasslands',
        location: 'Ladakh & High Meadows',
        metrics: '4,000 ha Footprint',
        status: 'Pastoral Impact',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/markhor.png',
        short: 'Solar Arrays'
      }
    ],
    kpis: [
      { label: 'Cascade Projects Active', value: '14 Schemes', icon: 'Zap', color: 'text-amber-400' },
      { label: 'Dewatered River Reaches', value: '78 km', icon: 'Droplets', color: 'text-rose-400' },
      { label: 'Tunnel Excavated Muck', value: '6.4M MT', icon: 'Mountain', color: 'text-orange-400' },
      { label: 'Flyway Collision Nodes', value: '8 Corridors', icon: 'Activity', color: 'text-yellow-400' },
      { label: 'River Basins Surveyed', value: '4 Basins', icon: 'Map', color: 'text-cyan-400' },
      { label: 'Statutory Flow Deficits', value: '52% Below E-Flow', icon: 'TrendingDown', color: 'text-rose-400' },
      { label: 'Grid Line Length', value: '480 km', icon: 'Compass', color: 'text-teal-400' },
      { label: 'CEA Baseline Audit', value: 'Verified', icon: 'ShieldCheck', color: 'text-emerald-400' }
    ]
  },

  'mining-extraction': {
    tag: 'EHII-MINE Mineral Extraction',
    badge: 'Riverbed Audits',
    showcaseItems: [
      {
        id: 'doodhganga',
        title: 'Doodhganga Riverbed Mining',
        subtitle: 'Mechanized heavy excavator dredging violating statutory 1m depth limits',
        location: 'Chadoora & Srinagar Outskirts',
        metrics: 'Incision Exceeds 2.4 m',
        status: 'NGT Penalty Area',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Doodhganga'
      },
      {
        id: 'rambiara',
        title: 'Rambiara Boulder Extraction',
        subtitle: 'Massive gravel extraction causing bridge pier scour and irrigation failure',
        location: 'Shopian & Pulwama Basin',
        metrics: '38 km Scoured Corridor',
        status: 'Severe Scour',
        statusColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        src: '/images/bear.png',
        short: 'Rambiara'
      },
      {
        id: 'vaishaw',
        title: 'Vaishaw Flood Channel Undermining',
        subtitle: 'Riparian embankment destabilization increasing 100-year flood vulnerability',
        location: 'Kulgam River Corridor',
        metrics: '24 Mining Leases',
        status: 'Flood Hazard',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/tiger.png',
        short: 'Vaishaw'
      },
      {
        id: 'crushers',
        title: 'Aggregate Stone Crusher Density',
        subtitle: 'Airborne silica dust and unpermitted wash water discharges into trout waters',
        location: 'Sindh & Lidder Margins',
        metrics: '64 Active Plants',
        status: 'Dust & Effluent',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/markhor.png',
        short: 'Stone Crushers'
      }
    ],
    kpis: [
      { label: 'Dredged Riverbed Length', value: '118 km', icon: 'Activity', color: 'text-rose-400' },
      { label: 'Maximum Incision Depth', value: '2.8 m (>1m limit)', icon: 'TrendingDown', color: 'text-rose-400' },
      { label: 'Active Mineral Leases', value: '112 Blocks', icon: 'Layers', color: 'text-amber-400' },
      { label: 'Stone Crusher Units', value: '64 Plants', icon: 'AlertTriangle', color: 'text-orange-400' },
      { label: 'NGT Inspection Audits', value: '18 Orders', icon: 'ShieldAlert', color: 'text-cyan-400' },
      { label: 'Groundwater Table Drop', value: '-1.8 m', icon: 'Droplets', color: 'text-red-400' },
      { label: 'Tributaries Audited', value: '6 Major Rivers', icon: 'Map', color: 'text-teal-400' },
      { label: 'Bathymetric Feeds', value: 'Grade A', icon: 'ShieldCheck', color: 'text-emerald-400' }
    ]
  },

  'urban-ecology': {
    tag: 'EHII-URB Metropolitan Telemetry',
    badge: 'Urban Science',
    showcaseItems: [
      {
        id: 'uhi',
        title: 'Srinagar Urban Heat Island (UHI)',
        subtitle: 'Satellite thermal infrared mapping revealing intense downtown heat dome',
        location: 'Downtown Core to Batamaloo',
        metrics: '+3.8°C Thermal Diff',
        status: 'Thermal Core',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'UHI Dome'
      },
      {
        id: 'sealing',
        title: 'Impervious Soil Sealing',
        subtitle: 'Paddy and marshland concrete conversion blocking natural recharge',
        location: 'Greater Srinagar Metropolitan',
        metrics: '1,800 ha/yr Converted',
        status: 'Soil Sealing',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/bear.png',
        short: 'Soil Sealing'
      },
      {
        id: 'achan',
        title: 'Achan Landfill Leachate Plume',
        subtitle: 'Unlined municipal solid waste runoff contaminating Anchar wetland',
        location: 'Saidapora & Achan',
        metrics: '650 MT Waste / Day',
        status: 'Leachate Alert',
        statusColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        src: '/images/tiger.png',
        short: 'Landfill'
      },
      {
        id: 'canals',
        title: 'Navigational Canal Degradation',
        subtitle: 'Encroachment and sewage channelling across Tsunt Kul and Doodhganga outfalls',
        location: 'Historic Waterways',
        metrics: '28 Outfall Nodes',
        status: 'Eutrophication',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/markhor.png',
        short: 'Urban Canals'
      }
    ],
    kpis: [
      { label: 'Urban Heat Differential', value: '+3.8°C', icon: 'Sun', color: 'text-amber-400' },
      { label: 'Impervious Surface Rise', value: '+14.2% / Dec', icon: 'TrendingUp', color: 'text-rose-400' },
      { label: 'Farmland Swallowed', value: '1,800 ha/yr', icon: 'Mountain', color: 'text-orange-400' },
      { label: 'Municipal Solid Waste', value: '650 MT / Day', icon: 'Activity', color: 'text-yellow-400' },
      { label: 'Sewage Inflow Points', value: '42 Direct', icon: 'Droplets', color: 'text-rose-400' },
      { label: 'Landsat TIRS LST', value: '30m Thermal', icon: 'Satellite', color: 'text-cyan-400' },
      { label: 'Master Plan Boundary', value: 'SMC 2035', icon: 'Map', color: 'text-teal-400' },
      { label: 'Canopy Cover Deficit', value: '8.2% vs 33%', icon: 'Trees', color: 'text-slate-300' }
    ]
  },

  'change-detection-observatory': {
    tag: 'EHII-OBS Satellite Surveillance',
    badge: 'Spaceborne Feeds',
    showcaseItems: [
      {
        id: 'sentinel',
        title: 'Sentinel-2 Multi-Temporal Feeds',
        subtitle: '10-meter optical surface reflectance calibrated every 5 days',
        location: 'All 10 Kashmir Valley Districts',
        metrics: '5-Day Cadence Stream',
        status: 'Spaceborne Live',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/protected-network.png',
        short: 'Sentinel-2'
      },
      {
        id: 'sar',
        title: 'Sentinel-1 C-Band SAR Radar',
        subtitle: 'Cloud-penetrating all-weather synthetic aperture radar for flood & wetland extent',
        location: 'Hokersar & Jhelum Basins',
        metrics: 'Interferometric Coherence',
        status: 'All-Weather SAR',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/bear.png',
        short: 'SAR Radar'
      },
      {
        id: 'landsat',
        title: 'Landsat 40-Year Archive (1985–2026)',
        subtitle: 'Calibrated historical baseline establishing 4-decade landscape transformations',
        location: 'Western Himalayan Basin',
        metrics: '40+ Year Monograph',
        status: 'Calibrated',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/tiger.png',
        short: '40-Yr Landsat'
      },
      {
        id: 'alerts',
        title: 'Automated Change-Detection Alerts',
        subtitle: 'Algorithmic multi-threshold triggers issuing Tier 1 and Tier 2 spatial advisories',
        location: 'J&K Eco-Sensitive Zones',
        metrics: '24 Trigger Criteria',
        status: 'Active Alerts',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/markhor.png',
        short: 'Alert System'
      }
    ],
    kpis: [
      { label: 'Satellite Constellations', value: '4 Platforms', icon: 'Satellite', color: 'text-emerald-400' },
      { label: 'Spatial Resolution', value: '10m Optical', icon: 'Compass', color: 'text-cyan-400' },
      { label: 'Multi-Decadal Archive', value: '1985–2026', icon: 'Calendar', color: 'text-amber-400' },
      { label: 'Active Change Triggers', value: '24 Rules', icon: 'ShieldAlert', color: 'text-rose-400' },
      { label: 'Classification Accuracy', value: '91.4% Kappa', icon: 'ShieldCheck', color: 'text-emerald-300' },
      { label: 'Pilot Benchmark Sites', value: '3 Studies', icon: 'MapPin', color: 'text-teal-400' },
      { label: 'Revisit Cadence', value: '5-Day Cycle', icon: 'Activity', color: 'text-sky-400' },
      { label: 'Automated Feeds', value: 'Operational', icon: 'Sparkles', color: 'text-white' }
    ]
  },

  'spatial-intelligence-atlas': {
    tag: 'EHII-GIS Spatial Atlas Engine',
    badge: 'Cartographic Atlas',
    showcaseItems: [
      {
        id: 'landcover',
        title: 'Basin-Scale Land Cover Atlas',
        subtitle: 'High-precision 10-class LULC classification across 10 valley districts',
        location: 'All J&K Basins',
        metrics: '15,948 km² Vector Map',
        status: 'GeoTIFF Layer',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/protected-network.png',
        short: 'LULC Atlas'
      },
      {
        id: 'springshed',
        title: 'Karst Springshed Hydro-Geology',
        subtitle: 'Fractured limestone recharge zones and groundwater aquifer boundaries',
        location: 'South Kashmir Karst Belt',
        metrics: '180 Gauged Springs',
        status: 'Aquifer Polygons',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/bear.png',
        short: 'Springsheds'
      },
      {
        id: 'dem',
        title: 'Copernicus 30m Digital Elevation (DEM)',
        subtitle: 'Slope, aspect, solar radiation and ruggedness index layers',
        location: 'Western Himalayan Orogen',
        metrics: '30m DEM Grids',
        status: 'Topographic Model',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/tiger.png',
        short: '30m DEM'
      },
      {
        id: 'vector',
        title: 'Encroachment Cadastral Vector Overlay',
        subtitle: 'Revenue boundary intersection identifying candidate encroachment parcels',
        location: 'Wetland & Forest Edges',
        metrics: 'Cadastral Grids',
        status: 'Vector Bounds',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/markhor.png',
        short: 'Cadastral GIS'
      }
    ],
    kpis: [
      { label: 'Thematic GIS Layers', value: '10 Data Layers', icon: 'Layers', color: 'text-emerald-400' },
      { label: 'Spatial Coverage', value: '15,948 km²', icon: 'Map', color: 'text-cyan-400' },
      { label: 'Elevation Range', value: '1500–5400m', icon: 'Mountain', color: 'text-amber-400' },
      { label: 'Vector Polygonal Entities', value: '14,200 Features', icon: 'Activity', color: 'text-teal-400' },
      { label: 'Coordinate System', value: 'EPSG:4326', icon: 'Compass', color: 'text-slate-300' },
      { label: 'Spatial Resolution', value: '10m / 30m', icon: 'Satellite', color: 'text-emerald-300' },
      { label: 'Cadastral Precision', value: 'Field Corroborated', icon: 'ShieldCheck', color: 'text-yellow-400' },
      { label: 'Downloadable Formats', value: 'GeoTIFF / GeoJSON', icon: 'CheckCircle2', color: 'text-white' }
    ]
  },

  'cumulative-impact': {
    tag: 'EHII-CUM Synergistic Matrix',
    badge: 'Multi-Driver Model',
    showcaseItems: [
      {
        id: 'saffron-synergy',
        title: 'Saffron Ecosystem Dissolution',
        subtitle: 'Karewa leveling + agrochemical drift + urban heat accelerating crop failure',
        location: 'Pampore Plateau Corridor',
        metrics: 'Triple-Driver Synergy',
        status: 'Critical Severity',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Saffron Collapse'
      },
      {
        id: 'hydro-synergy',
        title: 'Basin Runoff Constriction Cascade',
        subtitle: 'Glacier recession + riverbed dredging + wetland conversion intensifying flash floods',
        location: 'Jhelum Basin System',
        metrics: 'Compounding Hydrology',
        status: 'Severe Risk',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/bear.png',
        short: 'Basin Cascades'
      },
      {
        id: 'canopy-synergy',
        title: 'Treeline Attrition & Wildlife Corridor Squeeze',
        subtitle: 'Linear roads + high-voltage grids + grazing pressure pinching Hangul range',
        location: 'Overa-Aru to Tral Ridge',
        metrics: 'Habitat Constriction',
        status: 'Corridor Crisis',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/tiger.png',
        short: 'Corridor Squeeze'
      },
      {
        id: 'urban-synergy',
        title: 'Peri-Urban Thermal & Drainage Traps',
        subtitle: 'Wetland filling + soil sealing + urban heat dome amplifying microclimate heat',
        location: 'Greater Srinagar Periphery',
        metrics: 'Thermal Traps',
        status: 'Microclimate Alert',
        statusColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        src: '/images/markhor.png',
        short: 'Thermal Traps'
      }
    ],
    kpis: [
      { label: 'Synergistic Interactions', value: '18 Identified', icon: 'Activity', color: 'text-rose-400' },
      { label: 'Critical Severity Pairs', value: '6 Hotspots', icon: 'AlertTriangle', color: 'text-amber-400' },
      { label: 'Drivers Integrated', value: '7 Domains', icon: 'Layers', color: 'text-teal-400' },
      { label: 'Watershed Models', value: 'Jhelum Basin', icon: 'Droplets', color: 'text-cyan-400' },
      { label: 'Receptor Habitats', value: '12 Ecosystems', icon: 'Trees', color: 'text-emerald-400' },
      { label: 'Compounding Risk Multiplier', value: '2.4x Normal', icon: 'TrendingUp', color: 'text-rose-400' },
      { label: 'Mathematical Framework', value: 'Cross-Impact', icon: 'Compass', color: 'text-slate-300' },
      { label: 'Mitigation Priority Index', value: 'Tier 1 Focus', icon: 'ShieldCheck', color: 'text-white' }
    ]
  },

  'methodology-data-sources': {
    tag: 'EHII-METH Scientific Rigor',
    badge: 'Peer-Reviewed Benchmarks',
    showcaseItems: [
      {
        id: 'peer',
        title: 'Peer-Reviewed Empirical Standards',
        subtitle: 'Published remote sensing equations: MNDWI, NDVI, NDBI, and LST algorithms',
        location: 'CORD & University of Kashmir',
        metrics: 'Peer-Reviewed Algorithms',
        status: 'Grade A Methods',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/protected-network.png',
        short: 'Algorithms'
      },
      {
        id: 'gps',
        title: 'Differential GPS Ground-Truthing',
        subtitle: 'Sub-meter dGPS reference points verifying satellite glacier and boundary polygons',
        location: 'Kolahoi, Hokersar, Karewas',
        metrics: 'Sub-Meter dGPS Fixes',
        status: 'Ground-Truthed',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/bear.png',
        short: 'dGPS Control'
      },
      {
        id: 'statutory',
        title: 'Statutory Government Benchmark Records',
        subtitle: 'Forest Survey of India, IMD, CAG Audit, and NGT compliance inspection reports',
        location: 'Union & State Repositories',
        metrics: 'Statutory Reports',
        status: 'Government Audits',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/tiger.png',
        short: 'Statutory Data'
      },
      {
        id: 'accuracy',
        title: 'Confusion Matrix & Kappa Verification',
        subtitle: 'Independent error matrix calculations confirming >88% land cover classification accuracy',
        location: 'Validation Transects',
        metrics: '89.6% Kappa Accuracy',
        status: 'Statistically Verified',
        statusColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        src: '/images/markhor.png',
        short: 'Accuracy Matrix'
      }
    ],
    kpis: [
      { label: 'Classification Accuracy', value: '89.6% Kappa', icon: 'ShieldCheck', color: 'text-emerald-400' },
      { label: 'Ground Truth GPS Points', value: '420 dGPS Fixes', icon: 'MapPin', color: 'text-cyan-400' },
      { label: 'Peer Reviewed Citations', value: '64 Papers', icon: 'FileText', color: 'text-amber-400' },
      { label: 'Statutory Audits Ingested', value: '8 Government', icon: 'CheckCircle2', color: 'text-teal-400' },
      { label: 'Satellite Feeds Used', value: 'Sentinel + Landsat', icon: 'Satellite', color: 'text-sky-400' },
      { label: 'Open-Science Standards', value: 'FAIR Compliant', icon: 'Layers', color: 'text-emerald-300' },
      { label: 'Algorithmic Pipelines', value: 'Automated Python', icon: 'Activity', color: 'text-white' },
      { label: 'Temporal Baseline', value: '40 Years Monitored', icon: 'Calendar', color: 'text-slate-300' }
    ]
  },

  'scientific-reports': {
    tag: 'EHII-REP Scientific Evidence',
    badge: 'Statutory & Peer Dossiers',
    showcaseItems: [
      {
        id: 'cag',
        title: 'CAG Performance Audit on Waterbodies',
        subtitle: 'Comptroller & Auditor General statutory audit uncovering 48% wetland flood-basin loss',
        location: 'J&K Water Bodies Audit',
        metrics: 'Statutory Report No. 3',
        status: 'CAG Audit',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'CAG Audit'
      },
      {
        id: 'fsi',
        title: 'FSI State of Forests Canopy Report',
        subtitle: 'Forest Survey of India remote sensing canopy density assessment for J&K',
        location: 'Biennial Forest Audit',
        metrics: 'Biennial Statutory Survey',
        status: 'FSI Monograph',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/bear.png',
        short: 'FSI Report'
      },
      {
        id: 'ngt',
        title: 'NGT Riverbed Extraction Oversight Dossier',
        subtitle: 'National Green Tribunal expert committee hydrographic survey of Jhelum tributaries',
        location: 'Doodhganga & Rambiara',
        metrics: '118 km Riverbed Audit',
        status: 'NGT Benchmark',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/tiger.png',
        short: 'NGT Dossier'
      },
      {
        id: 'imd',
        title: 'IMD 40-Year Climatological Monograph',
        subtitle: 'Daily precipitation and temperature normals from 14 synoptic weather stations',
        location: 'Kashmir Meteorological Cell',
        metrics: '1981–2025 Station Records',
        status: 'IMD Climatology',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/markhor.png',
        short: 'IMD Monograph'
      }
    ],
    kpis: [
      { label: 'Published Monographs', value: '6 Major Reports', icon: 'FileText', color: 'text-teal-400' },
      { label: 'Statutory Court Benchs', value: 'NGT & Supreme Court', icon: 'ShieldAlert', color: 'text-rose-400' },
      { label: 'Station Verified Records', value: '40 Years Daily', icon: 'Calendar', color: 'text-amber-400' },
      { label: 'Peer Citations Tracked', value: '180+ Citations', icon: 'Activity', color: 'text-cyan-400' },
      { label: 'Government Bodies', value: 'CAG, FSI, IMD, GSI', icon: 'ShieldCheck', color: 'text-emerald-400' },
      { label: 'Evidence Confidence', value: 'Grade A Empirical', icon: 'CheckCircle2', color: 'text-emerald-300' },
      { label: 'Open Access PDFs', value: 'Full Public Access', icon: 'Compass', color: 'text-white' },
      { label: 'Audited Indicators', value: '100% Corroborated', icon: 'Shield', color: 'text-slate-300' }
    ]
  },

  overview: {
    tag: 'EHII-ARCH System Architecture',
    badge: 'Scientific Charter & Framework',
    showcaseItems: [
      {
        id: 'pipeline',
        title: 'Unified Sensor Ingestion Pipeline',
        subtitle: 'Multi-spectral Sentinel-2, radar InSAR Sentinel-1, and Landsat-9 thermal calibrated data',
        location: 'Central Data Engine',
        metrics: '5-Day Refresh Cadence',
        status: 'Operational',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/protected-network.png',
        short: 'Sensors'
      },
      {
        id: 'cross-sector',
        title: 'Cross-Sectoral Impact Coupling',
        subtitle: 'Directly feeding land-use change signals into Sectoral EIA (Agriculture, Tourism, Handicrafts)',
        location: 'Kashmir Basin',
        metrics: '4 Core Sectors',
        status: 'Synchronized',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/bear.png',
        short: 'Coupling'
      },
      {
        id: 'verification',
        title: 'Objective Ground Truth Protocol',
        subtitle: 'Two-specialist peer verification protocol backed by drone photogrammetry and field surveys',
        location: '10 Basin Districts',
        metrics: '100% Corroborated',
        status: 'Audited',
        statusColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        src: '/images/tiger.png',
        short: 'Protocol'
      },
      {
        id: 'subsystems',
        title: 'Six Scientific Core Disciplines',
        subtitle: 'Consolidating cryosphere, forests, land-systems, energy, mining, and urban systems',
        location: 'Western Himalaya',
        metrics: '6 Core Domains',
        status: 'Integrated',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/markhor.png',
        short: 'Disciplines'
      }
    ],
    kpis: [
      { label: 'Core Disciplines', value: '6 Submodules', icon: 'Layers', color: 'text-teal-400' },
      { label: 'Ingestion Feeds', value: '5 Constellations', icon: 'Satellite', color: 'text-cyan-400' },
      { label: 'Monitored Basins', value: '10 Districts', icon: 'Map', color: 'text-emerald-400' },
      { label: 'Temporal Baseline', value: '1980–2026', icon: 'Calendar', color: 'text-amber-400' },
      { label: 'Spatial Resolution', value: '3m to 30m', icon: 'Activity', color: 'text-rose-400' },
      { label: 'Verification Standard', value: 'Step-7 Peer Review', icon: 'ShieldCheck', color: 'text-emerald-300' },
      { label: 'Sectoral Coupling', value: '4 Key Sectors', icon: 'TrendingUp', color: 'text-cyan-300' },
      { label: 'Data Governance', value: 'Open Empirical', icon: 'Globe2', color: 'text-white' }
    ]
  },

  dashboards: {
    tag: 'EHII Command Telemetry',
    badge: 'Cross-Domain Analytics',
    showcaseItems: [
      {
        id: 'hpi',
        title: 'Human Pressure Index (HPI)',
        subtitle: 'Spatial composite of population density, road proximity, and land conversion velocity',
        location: 'Srinagar–Budgam Axis',
        metrics: '8.4 / 10 Critical Stress',
        status: 'Severe Pressure',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'HPI Metric'
      },
      {
        id: 'albedo',
        title: 'Surface Thermal & Albedo Shifts',
        subtitle: 'Land surface temperature anomalies across expanding impervious urban surfaces',
        location: 'Valley Floor Urban Conurbation',
        metrics: '+3.8°C UHI Delta',
        status: 'Thermal Alert',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/bear.png',
        short: 'Thermal UHI'
      },
      {
        id: 'riparian',
        title: 'Riparian Buffer Fragmentation',
        subtitle: 'Vegetated buffer integrity index along primary and tributary fluvial corridors',
        location: 'Jhelum & Flood Channels',
        metrics: '48% Buffer Severed',
        status: 'High Vigilance',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/tiger.png',
        short: 'Riparian'
      },
      {
        id: 'conversion',
        title: 'Farmland to Settlement Velocity',
        subtitle: 'Conversion velocity of paddy and saffron lacustrine soils to built environments',
        location: 'Pampore & Pulwama',
        metrics: '2,150 ha/yr Converted',
        status: 'Critical Alert',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/markhor.png',
        short: 'Conversion'
      }
    ],
    kpis: [
      { label: 'Aggregate HPI Score', value: '7.8 / 10', icon: 'Activity', color: 'text-rose-400' },
      { label: 'Thermal UHI Peak', value: '+3.8°C', icon: 'Sun', color: 'text-amber-400' },
      { label: 'Farmland Loss Rate', value: '2,150 ha/yr', icon: 'TrendingDown', color: 'text-rose-400' },
      { label: 'Riparian Buffer Loss', value: '48% Severed', icon: 'Waves', color: 'text-cyan-400' },
      { label: 'Active Anomaly Signals', value: '14 Active Alerts', icon: 'AlertTriangle', color: 'text-amber-400' },
      { label: 'Telemetry Freshness', value: 'Real-Time / 24h', icon: 'Clock', color: 'text-emerald-400' },
      { label: 'Monitored Reaches', value: '118 km Scoured', icon: 'MapPin', color: 'text-teal-400' },
      { label: 'Baseline Confidence', value: '99.4% Verified', icon: 'ShieldCheck', color: 'text-emerald-300' }
    ]
  },

  'environmental-restoration': {
    tag: 'EHII-RESTORE Satellite Audit',
    badge: 'Remediation Registry',
    showcaseItems: [
      {
        id: 'wular-restore',
        title: 'Wular Wetland Eco-Restoration',
        subtitle: 'Mechanical willow de-silting and hydrodynamic channel restoration in northern basin',
        location: 'Wular Lake Littoral Zone',
        metrics: '1,420 ha Reclaimed',
        status: 'Active Dredging',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/protected-network.png',
        short: 'Wular'
      },
      {
        id: 'karewa-restore',
        title: 'Karewa Terracing & Slope Revegetation',
        subtitle: 'Bio-engineering stabilization of abandoned railway and highway excavation benches',
        location: 'Pulwama & Budgam Scars',
        metrics: '340 ha Vegetated',
        status: 'Monitoring',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/bear.png',
        short: 'Karewa Regrade'
      },
      {
        id: 'corridor-restore',
        title: 'Pir Panjal Wildlife Corridor Reconnection',
        subtitle: 'Canopy corridor re-establishment across severed highway and rail transport corridors',
        location: 'Banihal–Qazigund Flank',
        metrics: '85 ha Reconnected',
        status: 'In Progress',
        statusColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        src: '/images/tiger.png',
        short: 'Corridors'
      },
      {
        id: 'riparian-restore',
        title: 'Doodhganga Riparian Buffer Planting',
        subtitle: 'Native alder, willow, and poplar re-vegetation along degraded riverbanks',
        location: 'Chadoora to Barzulla Reach',
        metrics: '28 km Riparian Line',
        status: 'Verified',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/markhor.png',
        short: 'Doodhganga'
      }
    ],
    kpis: [
      { label: 'Total Verified Remediated', value: '1,845 ha', icon: 'CheckCircle2', color: 'text-emerald-400' },
      { label: 'Active Interventions', value: '12 Projects', icon: 'Activity', color: 'text-teal-400' },
      { label: 'NDVI Green-Up Rate', value: '+34% Biomass', icon: 'TrendingUp', color: 'text-emerald-300' },
      { label: 'Riparian Buffer Restored', value: '42 km Line', icon: 'Waves', color: 'text-cyan-400' },
      { label: 'Survival Rate (5-Yr)', value: '78.2% Certified', icon: 'Trees', color: 'text-emerald-400' },
      { label: 'Telemetry Audited', value: 'Sentinel-2 InSAR', icon: 'Satellite', color: 'text-white' },
      { label: 'NGT Compliance Score', value: '88% Conforming', icon: 'ShieldCheck', color: 'text-teal-300' },
      { label: 'Community Custodians', value: '38 Gram Panchayats', icon: 'Users', color: 'text-amber-400' }
    ]
  },

  'mitigation-restoration': {
    tag: 'EHII-MITIGATE Compliance Registry',
    badge: 'Accountability Tracker',
    showcaseItems: [
      {
        id: 'slope-mitigate',
        title: 'Linear Infrastructure Slope Containment',
        subtitle: 'Shotcrete, rock-bolting, and geotextile slope netting along NH-44 four-lane cutting',
        location: 'Ramban–Banihal Sector',
        metrics: '18 Active Catchments',
        status: 'High Vigilance',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/protected-network.png',
        short: 'Slopes'
      },
      {
        id: 'replenish-mitigate',
        title: 'Riverbed Sand Replenishment Audits',
        subtitle: 'Annual post-monsoon replenishment volume vs permissible extraction quotas',
        location: 'Rambiara & Jhelum',
        metrics: '420,000 m³ Deficit',
        status: 'Non-Compliant',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/bear.png',
        short: 'Replenishment'
      },
      {
        id: 'cumpensatory-mitigate',
        title: 'Compensatory Afforestation (CAMPA)',
        subtitle: 'Spaceborne verification of survival rates on non-forest land allocated for offsets',
        location: 'Kupwara & Baramulla',
        metrics: '1,280 ha Audited',
        status: 'Audited / 62% Surv',
        statusColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        src: '/images/tiger.png',
        short: 'CAMPA'
      },
      {
        id: 'wetland-mitigate',
        title: 'Wetland Buffer Zone Demarcation',
        subtitle: 'Statutory 50m green buffer zone enforcement around notified Ramsar wetlands',
        location: 'Hokersar & Haigam',
        metrics: '64 km Perimeter Scanned',
        status: 'Enforcement',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/markhor.png',
        short: 'Wetland Buffers'
      }
    ],
    kpis: [
      { label: 'Audited Mitigation Sites', value: '28 Mandated Sites', icon: 'FileCheck', color: 'text-teal-400' },
      { label: 'Full Statutory Compliance', value: '46% of Projects', icon: 'ShieldAlert', color: 'text-amber-400' },
      { label: 'CAMPA Survival Rate', value: '62.4% Survival', icon: 'Trees', color: 'text-emerald-400' },
      { label: 'Replenishment Deficit', value: '420,000 m³/yr', icon: 'TrendingDown', color: 'text-rose-400' },
      { label: 'Perimeter Monitored', value: '64 km Buffer', icon: 'MapPin', color: 'text-cyan-400' },
      { label: 'InSAR Slope Stability', value: '18 Active Chutes', icon: 'Activity', color: 'text-amber-300' },
      { label: 'Court Mandated Audits', value: 'NGT O.A. 352/2019', icon: 'ShieldCheck', color: 'text-white' },
      { label: 'Data Verification', value: '100% Space Verified', icon: 'Satellite', color: 'text-emerald-300' }
    ]
  },

  'aquatic-cryosphere/glacier-recession': {
    tag: 'EHII-GLACIER Cryospheric Telemetry',
    badge: 'Terminus & Mass Balance',
    showcaseItems: [
      {
        id: 'kolahoi',
        title: 'Kolahoi Glacier (Gwash Brari)',
        subtitle: 'Largest glacier in Kashmir valley experiencing rapid snout retreat and supraglacial lake formation',
        location: 'Lidder Basin Headwaters',
        metrics: '-16.2 m/yr (-29.1% Area)',
        status: 'Severe Downwasting',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Kolahoi'
      },
      {
        id: 'thajiwas',
        title: 'Thajiwas Glacier Complex',
        subtitle: 'Sub-polar cirque glacier system with rapid bed-rock exposure and tourist footpath erosion',
        location: 'Sonamarg / Sind Catchment',
        metrics: '-9.4 m/yr (-24.6% Area)',
        status: 'High Ablation',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/bear.png',
        short: 'Thajiwas'
      },
      {
        id: 'harmukh',
        title: 'Harmukh Glacier Complex',
        subtitle: 'Hanging cirque glaciers overlooking sacred alpine lakes with monitored moraine stability',
        location: 'Wangath / Sind Valley',
        metrics: '-8.1 m/yr (-22.5% Area)',
        status: 'High Vigilance',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/tiger.png',
        short: 'Harmukh'
      },
      {
        id: 'machoi',
        title: 'Machoi Glacier Corridor',
        subtitle: 'Debris-covered snout adjacent to Zojila Pass highway corridor with severe downwasting',
        location: 'Drass / Zojila Pass',
        metrics: '-11.8 m/yr (-25.9% Area)',
        status: 'Severe Fragmentation',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/markhor.png',
        short: 'Machoi'
      }
    ],
    kpis: [
      { label: 'Kolahoi Snout Retreat', value: '-16.2 m/yr', icon: 'TrendingDown', color: 'text-rose-400' },
      { label: 'Kolahoi Area Contract', value: '-29.1% Area', icon: 'Mountain', color: 'text-amber-400' },
      { label: 'Average Mass Balance', value: '-0.48 m w.e./yr', icon: 'Droplets', color: 'text-cyan-400' },
      { label: 'Supraglacial Debris', value: '38.2% Coverage', icon: 'Layers', color: 'text-slate-300' },
      { label: 'GLOF High-Risk Lakes', value: '4 Monitored Ponds', icon: 'AlertTriangle', color: 'text-amber-400' },
      { label: 'Temporal Baseline', value: '1980–2026 (46 Yrs)', icon: 'Calendar', color: 'text-teal-400' },
      { label: 'Elevation Range', value: '3,800m – 5,425m', icon: 'Activity', color: 'text-emerald-300' },
      { label: 'Geodetic Differencing', value: 'TanDEM-X & Sentinel-2', icon: 'Satellite', color: 'text-white' }
    ]
  },

  'aquatic-cryosphere/lake-encroachment': {
    tag: 'EHII-LAKE Shoreline Cartography',
    badge: 'Open Water Loss & Hardening',
    showcaseItems: [
      {
        id: 'dal',
        title: 'Dal Lake Open Water Contraction',
        subtitle: 'Peripheral floating garden consolidation, Telbal delta siltation, and urban house encroachment',
        location: 'Srinagar Urban Basin',
        metrics: '-585 ha (-29.5%)',
        status: 'Restabilizing / Periphery Risk',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/protected-network.png',
        short: 'Dal Lake'
      },
      {
        id: 'nigeen',
        title: 'Nigeen Lake Urban Hardening',
        subtitle: 'High houseboat density, sewage discharge points, and concrete shoreline revetments',
        location: 'Srinagar Urban Basin',
        metrics: '-55 ha (-19.0%)',
        status: 'High Vigilance',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/bear.png',
        short: 'Nigeen'
      },
      {
        id: 'wular',
        title: 'Wular Lake Littoral Zone Loss',
        subtitle: 'Siltation from Pohru & Jhelum, massive willow plantation expansion, and bund reclamation',
        location: 'Bandipora / Baramulla',
        metrics: '-2,270 ha (-36.9%)',
        status: 'Active Dredging / Siltation',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/tiger.png',
        short: 'Wular Basin'
      },
      {
        id: 'manasbal',
        title: 'Manasbal Deepest Lacustrine Basin',
        subtitle: 'Limestone quarry runoff, agrarian peripheral encroachment, and submerged macrophyte bloom',
        location: 'Ganderbal Basin',
        metrics: '-48 ha (-17.1%)',
        status: 'Limnological Stress',
        statusColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        src: '/images/markhor.png',
        short: 'Manasbal'
      }
    ],
    kpis: [
      { label: 'Wular Lake Water Loss', value: '-2,270 ha (-36.9%)', icon: 'TrendingDown', color: 'text-rose-400' },
      { label: 'Dal Open Water Area', value: '1,395 ha Remaining', icon: 'Waves', color: 'text-cyan-400' },
      { label: 'Hardened Shoreline', value: '38.4 km Riparian', icon: 'MapPin', color: 'text-amber-400' },
      { label: 'Willow Encroachment', value: '27.4 km² Monitored', icon: 'Trees', color: 'text-emerald-400' },
      { label: 'Sediment Inflow Rate', value: '1.2M m³/year', icon: 'Activity', color: 'text-orange-400' },
      { label: 'Sensor Constellation', value: 'Sentinel-2 & Landsat-9', icon: 'Satellite', color: 'text-teal-400' },
      { label: 'Ramsar Wetlands Audited', value: '5 Lacustrine Sinks', icon: 'ShieldCheck', color: 'text-emerald-300' },
      { label: 'Shoreline Baseline', value: '1990–2026 Cartography', icon: 'Calendar', color: 'text-white' }
    ]
  },

  'aquatic-cryosphere/loss-recovery-ledger': {
    tag: 'EHII-LEDGER 41-Year Balance Sheet',
    badge: 'Permanent Ecological Audit',
    showcaseItems: [
      {
        id: 'wetland-ledger',
        title: 'Ramsar & Valley Wetland Ledger',
        subtitle: 'Gross loss of 9,840 ha against 1,845 ha active restoration, resulting in net -7,995 ha deficit',
        location: 'Valley Flood Basin',
        metrics: '-7,995 ha Net Deficit',
        status: 'Severe Deficit',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Wetland Ledger'
      },
      {
        id: 'karewa-ledger',
        title: 'Karewa Terracing & Excavation Ledger',
        subtitle: '4,260 ha Pleistocene plateau leveled for clay fill vs 340 ha bio-engineering revegetation',
        location: 'Pulwama & Budgam Plinths',
        metrics: '-3,920 ha Net Deficit',
        status: 'Irreversible Loss',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/bear.png',
        short: 'Karewa Ledger'
      },
      {
        id: 'canopy-ledger',
        title: 'Dense Canopy Forest Ledger',
        subtitle: '12,400 ha Very Dense Forest degraded to Open Forest against 3,100 ha compensatory afforestation',
        location: 'Pir Panjal & Kazinag',
        metrics: '-9,300 ha Net Deficit',
        status: 'Severe Attrition',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/tiger.png',
        short: 'Forest Ledger'
      },
      {
        id: 'river-ledger',
        title: 'Riparian Floodplain Ledger',
        subtitle: '118 km active riverbed altered by heavy mechanical mining against 28 km vegetative stabilization',
        location: 'Jhelum & Rambiara Basins',
        metrics: '-90 km Net Deficit',
        status: 'High Vigilance',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/markhor.png',
        short: 'River Ledger'
      }
    ],
    kpis: [
      { label: 'Gross Documented Loss', value: '28,140 ha Scars', icon: 'TrendingDown', color: 'text-rose-400' },
      { label: 'Active Remediation', value: '5,313 ha Restored', icon: 'TrendingUp', color: 'text-emerald-400' },
      { label: 'Net Ecological Deficit', value: '-22,827 ha Net', icon: 'Scale', color: 'text-amber-400' },
      { label: 'Audited Ecosystems', value: '7 Core Domains', icon: 'Layers', color: 'text-teal-400' },
      { label: 'Audit Time Span', value: '1985–2026 (41 Yrs)', icon: 'Calendar', color: 'text-cyan-400' },
      { label: 'Verification Standard', value: 'Survey of India + S2', icon: 'ShieldCheck', color: 'text-emerald-300' },
      { label: 'Public Ledger Entries', value: '100% Verifiable', icon: 'FileText', color: 'text-white' },
      { label: 'Court Benchmark', value: 'CAG & NGT Records', icon: 'ShieldAlert', color: 'text-slate-300' }
    ]
  },

  'aquatic-cryosphere/river-corridor-change': {
    tag: 'EHII-RIVER Fluvial Telemetry',
    badge: 'Riverbed Incision & Buffers',
    showcaseItems: [
      {
        id: 'jhelum-corridor',
        title: 'Jhelum Main Channel Floodway',
        subtitle: 'Urban encroachment, concrete bund construction, and -18.5% active width constriction',
        location: 'Srinagar Urban Reach',
        metrics: '-18.5% Width Constriction',
        status: 'Critical Flood Risk',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Jhelum Reach'
      },
      {
        id: 'rambiara-corridor',
        title: 'Rambiara River Gravel Scouring',
        subtitle: 'Mechanized heavy boulder and sand extraction altering river geomorphology and bank collapse',
        location: 'Shopian / Pulwama Reach',
        metrics: '+42 m Bed Widening',
        status: 'Severe Ecosystem Disturbance',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/bear.png',
        short: 'Rambiara River'
      },
      {
        id: 'veshaw-corridor',
        title: 'Veshaw River Flash Spate Dynamic',
        subtitle: 'Rapid lateral bank erosion and high sediment pulse mobilization from Aharbal gorge',
        location: 'Kulgam Basin Reach',
        metrics: '3.1 m/yr Lateral Erosion',
        status: 'High Vigilance',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/tiger.png',
        short: 'Veshaw River'
      },
      {
        id: 'doodhganga-corridor',
        title: 'Doodhganga Stream Incision',
        subtitle: 'Severe riverbed downcutting and drinking water intake dry-up due to excessive gravel mining',
        location: 'Budgam / Chadoora Reach',
        metrics: '2.8m Bed Incision',
        status: 'NGT Benchmark',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/markhor.png',
        short: 'Doodhganga'
      }
    ],
    kpis: [
      { label: 'Scoured Riverbed Reach', value: '118 km Disturbed', icon: 'Pickaxe', color: 'text-rose-400' },
      { label: 'Max Channel Incision', value: '3.4 m Deep', icon: 'Activity', color: 'text-amber-400' },
      { label: 'Riparian Buffer Loss', value: '595 ha Scars', icon: 'TrendingDown', color: 'text-rose-400' },
      { label: 'Urban Width Narrowing', value: '-18.5% in Srinagar', icon: 'Layers', color: 'text-cyan-400' },
      { label: 'Monitored Rivers', value: '7 Major Tributaries', icon: 'GitBranch', color: 'text-teal-400' },
      { label: 'InSAR Bed Elevation', value: 'TanDEM-X & Drone LiDAR', icon: 'Satellite', color: 'text-white' },
      { label: 'NGT Compliance Orders', value: 'O.A. 241/2021 Active', icon: 'ShieldAlert', color: 'text-amber-300' },
      { label: 'Temporal Resolution', value: 'Bi-Monthly Sentinel-2', icon: 'Clock', color: 'text-emerald-300' }
    ]
  },

  'aquatic-cryosphere/springs-groundwater': {
    tag: 'EHII-HYDRO Springshed Telemetry',
    badge: 'Karst Aquifers & Discharge',
    showcaseItems: [
      {
        id: 'south-kashmir-springs',
        title: 'South Kashmir Karewa Springshed',
        subtitle: 'Hydrogeological decapitation of clay-capped aquifer recharge zones due to highway quarrying',
        location: 'Pulwama & Shopian Foothills',
        metrics: '-38.5% Dry Season Flow',
        status: 'Critical Depletion',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Karewa Springs'
      },
      {
        id: 'verinag-karst',
        title: 'Verinag & Anantnag Karst Conduits',
        subtitle: 'Upper limestone deforestation and tourist infrastructure altering subterranean hydrodynamics',
        location: 'Anantnag Karst Belt',
        metrics: '-22.4% Seasonal Discharge',
        status: 'High Vigilance',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/bear.png',
        short: 'Verinag Karst'
      },
      {
        id: 'budgam-springs',
        title: 'Budgam Foothill Spring Clusters',
        subtitle: 'Drying up of village spring-heads used for domestic drinking and high-density saffron irrigation',
        location: 'Central Budgam Plateau',
        metrics: '48 Zero-Flow Days/yr',
        status: 'Severe Stress',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/tiger.png',
        short: 'Budgam Springs'
      },
      {
        id: 'kokernag-springs',
        title: 'Kokernag Multi-Channel Springs',
        subtitle: 'Himalayan limestone discharge monitoring for coldwater fisheries and regional horticulture',
        location: 'Kokernag Valley',
        metrics: '7.8 m³/s Peak Flow',
        status: 'Stable / Monitored',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/markhor.png',
        short: 'Kokernag Karst'
      }
    ],
    kpis: [
      { label: 'Monitored Springsheds', value: '186 Active Springs', icon: 'Droplets', color: 'text-cyan-400' },
      { label: 'Mean Discharge Drop', value: '-31.7% Dry Season', icon: 'TrendingDown', color: 'text-rose-400' },
      { label: 'Zero-Flow Duration', value: '38 Days/year Avg', icon: 'AlertTriangle', color: 'text-amber-400' },
      { label: 'Recharge Area Lost', value: '142 ha Leveled', icon: 'Mountain', color: 'text-orange-400' },
      { label: 'Turbidity Index Peak', value: '42 NTU Post-Spate', icon: 'Activity', color: 'text-slate-300' },
      { label: 'Participatory Sensors', value: '62 Community Loggers', icon: 'Users', color: 'text-teal-400' },
      { label: 'Hydrogeology Classification', value: 'CGWB & J&K PHE', icon: 'ShieldCheck', color: 'text-emerald-300' },
      { label: 'Telemetry Standard', value: 'Daily In-Situ Telemetry', icon: 'Satellite', color: 'text-white' }
    ]
  },

  'aquatic-cryosphere/watershed-cumulative-impact': {
    tag: 'EHII-BASIN Hydro-Ecological Integration',
    badge: 'Catchment Modeling',
    showcaseItems: [
      {
        id: 'upper-jhelum',
        title: 'Upper Jhelum & Lidder Catchment',
        subtitle: 'Coupling Kolahoi glacial thinning with Pahalgam hospitality expansion and summer water deficits',
        location: 'Anantnag & Pahalgam',
        metrics: '78.5 / 100 Stress Score',
        status: 'Severe Vulnerability',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Upper Jhelum'
      },
      {
        id: 'central-floodplain',
        title: 'Central Floodplain & Sink Basin',
        subtitle: 'Flood absorption collapse caused by Hokersar siltation and Srinagar urban corridor narrowing',
        location: 'Srinagar–Budgam Sink',
        metrics: '86.2 / 100 Critical Stress',
        status: 'Critical Flood Risk',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/bear.png',
        short: 'Central Sink'
      },
      {
        id: 'sind-basin',
        title: 'Sind Valley & Ganderbal Catchment',
        subtitle: 'Hydropower diversion headworks, Thajiwas ablation, and Shallabugh wetland sediment load',
        location: 'Ganderbal Catchment',
        metrics: '64.0 / 100 Moderate Stress',
        status: 'Hydropower Impact',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/tiger.png',
        short: 'Sind Basin'
      },
      {
        id: 'wular-catchment',
        title: 'Lower Jhelum & Wular Basin',
        subtitle: 'Siltation confluence from Pohru river combined with municipal solid waste runoff',
        location: 'Bandipora / Baramulla',
        metrics: '82.4 / 100 Severe Stress',
        status: 'Eutrophication Alert',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/markhor.png',
        short: 'Wular Sink'
      }
    ],
    kpis: [
      { label: 'Jhelum Basin Area', value: '15,856 km²', icon: 'Map', color: 'text-teal-400' },
      { label: 'Basin Vulnerability Index', value: '77.8 / 100 Mean', icon: 'Activity', color: 'text-rose-400' },
      { label: 'Glacier Melt Dependency', value: '38% Late Summer', icon: 'Mountain', color: 'text-cyan-400' },
      { label: 'Active Floodplain Retained', value: '52% Historic Level', icon: 'Waves', color: 'text-amber-400' },
      { label: 'Integrated Sub-Basins', value: '24 Catchments', icon: 'GitBranch', color: 'text-emerald-400' },
      { label: 'Cumulative Sensor Inputs', value: '42 Remote Sensors', icon: 'Satellite', color: 'text-white' },
      { label: 'Sediment Transport Rate', value: '3.8M tons/yr', icon: 'TrendingUp', color: 'text-orange-400' },
      { label: 'Hydro Model Benchmark', value: 'SWAT & HEC-RAS Grid', icon: 'ShieldCheck', color: 'text-emerald-300' }
    ]
  },

  'aquatic-cryosphere/wetland-encroachment': {
    tag: 'EHII-WETLAND Ramsar Telemetry',
    badge: 'Boundary Integrity & Siltation',
    showcaseItems: [
      {
        id: 'hokersar-wetland',
        title: 'Hokersar Ramsar Site (1570)',
        subtitle: 'Doodhganga flood spill channel siltation and peripheral boundary filling for settlement colonies',
        location: 'Budgam / Srinagar Perimeter',
        metrics: '-31.6% Marsh Area',
        status: 'Critical Siltation',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Hokersar'
      },
      {
        id: 'haigam-wetland',
        title: 'Haigam Wetland Reserve (2489)',
        subtitle: 'Paddy encroachment, unauthorized drainage ditches, and commercial willow dense expansion',
        location: 'Baramulla Basin',
        metrics: '-31.7% Marsh Area',
        status: 'Severe Fragmentation',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/bear.png',
        short: 'Haigam'
      },
      {
        id: 'shallabugh-wetland',
        title: 'Shallabugh Wetland Reserve (2490)',
        subtitle: 'Sind bedload deposition, severe dry-season desiccation, and seasonal cattle grazing',
        location: 'Ganderbal Basin',
        metrics: '-23.5% Water Surface',
        status: 'High Vigilance',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/tiger.png',
        short: 'Shallabugh'
      },
      {
        id: 'mirgund-wetland',
        title: 'Mirgund Wetland Basin',
        subtitle: 'Rapid conversion to dry grassland, summer desiccation, and clay extraction boundary violations',
        location: 'Budgam / Baramulla Border',
        metrics: '-48.2% Open Marsh',
        status: 'Seasonal Desiccation',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/markhor.png',
        short: 'Mirgund'
      }
    ],
    kpis: [
      { label: 'Total Ramsar Sites Audited', value: '5 Valley Sites', icon: 'ShieldCheck', color: 'text-teal-400' },
      { label: 'Aggregate Marsh Loss', value: '-31.2% Contraction', icon: 'TrendingDown', color: 'text-rose-400' },
      { label: 'Willow Encroachment Area', value: '1,840 ha Reedbed', icon: 'Trees', color: 'text-amber-400' },
      { label: 'Winter Waterfowl Capacity', value: '-42% Carrying Cap', icon: 'Activity', color: 'text-rose-400' },
      { label: 'Siltation Accretion Rate', value: '18 mm/yr Delta', icon: 'Layers', color: 'text-cyan-400' },
      { label: 'Notified Legal Boundary', value: '100% Vector Mapped', icon: 'MapPin', color: 'text-emerald-400' },
      { label: 'Sentinel InSAR Coherence', value: 'Weekly 10m Scans', icon: 'Satellite', color: 'text-white' },
      { label: 'Statutory Protection', value: 'Ramsar Convention & WPA', icon: 'FileText', color: 'text-emerald-300' }
    ]
  },

  'change-detection-observatory/change-detection-atlas': {
    tag: 'EHII-ATLAS Multi-Spectral Cartography',
    badge: 'Interactive Satellite Layers',
    showcaseItems: [
      {
        id: 'pampore-atlas',
        title: 'Pampore Karewa Saffron Loss Polygon',
        subtitle: 'Continuous multi-spectral land-cover transformation mapping of saffron agricultural lands',
        location: 'Pulwama District',
        metrics: '142 ha Leveled Scar',
        status: 'Active Excavation',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Pampore Atlas'
      },
      {
        id: 'hokersar-atlas',
        title: 'Hokersar Wetland Perimeter Cartography',
        subtitle: 'Automated MNDWI and BSI differential tracking of peripheral marsh infill and housing plots',
        location: 'Budgam Basin',
        metrics: '28 ha Infilled',
        status: 'Encroachment Alert',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/bear.png',
        short: 'Hokersar Atlas'
      },
      {
        id: 'pir-panjal-atlas',
        title: 'Pir Panjal Canopy Attrition Layer',
        subtitle: 'Continuous Change Detection & Classification (CCDC) algorithm identifying canopy breaks',
        location: 'Shopian / Banihal Pass',
        metrics: '64 ha Fragmented',
        status: 'Canopy Loss',
        statusColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        src: '/images/tiger.png',
        short: 'Forest Atlas'
      },
      {
        id: 'rambiara-atlas',
        title: 'Rambiara Riverbed Mining Footprint',
        subtitle: 'High-resolution multispectral reflectance change identifying mechanical excavator tracks',
        location: 'Pulwama Confluence',
        metrics: '86 ha Excavated',
        status: 'NGT Oversight',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/markhor.png',
        short: 'Mining Atlas'
      }
    ],
    kpis: [
      { label: 'Active Vector Polygons', value: '420 Monitored Plots', icon: 'Layers', color: 'text-teal-400' },
      { label: 'Spatial Cartography Grid', value: '10m Multi-Spectral', icon: 'Map', color: 'text-cyan-400' },
      { label: 'Verified Disturbance Area', value: '3,840 ha Detected', icon: 'Activity', color: 'text-rose-400' },
      { label: 'Detection Accuracy', value: '94.2% Ground Valid', icon: 'CheckCircle2', color: 'text-emerald-400' },
      { label: 'Constellation Feeds', value: 'Sentinel-2 & Landsat', icon: 'Satellite', color: 'text-white' },
      { label: 'Vector Layer Formats', value: 'GeoJSON & Shapefile', icon: 'Download', color: 'text-slate-300' },
      { label: 'Pilot Case Studies', value: '4 In-Depth Studies', icon: 'FileText', color: 'text-amber-400' },
      { label: 'Update Frequency', value: 'Every 5 Days', icon: 'Clock', color: 'text-emerald-300' }
    ]
  },

  'change-detection-observatory/detection-alerts': {
    tag: 'EHII-ALERTS Sentinel Two-Tier Stream',
    badge: 'Automated Alert Feed',
    showcaseItems: [
      {
        id: 'tier1-alerts',
        title: 'Tier 1: Ground-Verified Encroachments',
        subtitle: 'Confirmed land transformation backed by dual specialist sign-off and GPS ground survey',
        location: 'Basin-Wide Hotspots',
        metrics: '28 Confirmed Sites',
        status: 'Verified Alert',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Tier 1 Alerts'
      },
      {
        id: 'tier2-alerts',
        title: 'Tier 2: Candidate Spectral Anomalies',
        subtitle: 'Automated threshold exceedance in NDVI decline or Bare Soil Index (BSI) pending inspection',
        location: 'Satellite Surveillance Grid',
        metrics: '42 Candidate Sites',
        status: 'Under Review',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/bear.png',
        short: 'Tier 2 Alerts'
      },
      {
        id: 'insar-alerts',
        title: 'InSAR Slope Subsidence Warnings',
        subtitle: 'Interferometric coherence loss indicating active slope creep along road cutting excavations',
        location: 'Pir Panjal & NH-44',
        metrics: '12 Creep Polygons',
        status: 'Geotech Alert',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/tiger.png',
        short: 'InSAR Creep'
      },
      {
        id: 'dredge-alerts',
        title: 'Riverbed Depth Exceedance Alerts',
        subtitle: 'Multi-temporal elevation differencing flagging mining pits exceeding statutory 3m depths',
        location: 'Jhelum & Doodhganga',
        metrics: '18 Scour Violations',
        status: 'Statutory Notice',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/markhor.png',
        short: 'Dredge Depth'
      }
    ],
    kpis: [
      { label: 'Active Satellite Alerts', value: '42 Active Alerts', icon: 'BellRing', color: 'text-amber-400' },
      { label: 'Tier-1 Verified Violations', value: '18 High Severity', icon: 'AlertTriangle', color: 'text-rose-400' },
      { label: 'Field Verification Rate', value: '88% Investigated', icon: 'ShieldCheck', color: 'text-emerald-400' },
      { label: 'False Alarm Rejection', value: '<6% False Triggers', icon: 'CheckCircle2', color: 'text-cyan-400' },
      { label: 'Mean Ingestion Latency', value: '48 Hours Post-Pass', icon: 'Clock', color: 'text-teal-400' },
      { label: 'Constellation Feeds', value: 'Sentinel-2 & SAR-1', icon: 'Satellite', color: 'text-white' },
      { label: 'Court Evidence Submissions', value: '6 NGT Filings', icon: 'FileText', color: 'text-emerald-300' },
      { label: 'Community Alert Dispatch', value: 'Instant RSS / SMS', icon: 'TrendingUp', color: 'text-slate-300' }
    ]
  },

  'change-detection-observatory/historical-comparison': {
    tag: 'EHII-RETRO Landsat 1980–2026 Archive',
    badge: '46-Year Retrospective',
    showcaseItems: [
      {
        id: 'pampore-retro',
        title: 'Pampore Karewa Retrospective',
        subtitle: 'From pristine Pleistocene saffron plateaus in 1980 to leveled excavation pits in 2026',
        location: 'Pampore / Lethpora',
        metrics: '1980 vs 2026 Differencing',
        status: 'Completed Monograph',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/protected-network.png',
        short: 'Pampore Retro'
      },
      {
        id: 'srinagar-urban-retro',
        title: 'Srinagar Urban Conurbation Growth',
        subtitle: 'Quadrupling of urban built-up footprint spilling into wetlands and prime agricultural floodplains',
        location: 'Srinagar Metropolitan Area',
        metrics: '+310% Built Extent',
        status: 'Continuous Timeline',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/bear.png',
        short: 'Urban Conurbation'
      },
      {
        id: 'wular-basin-retro',
        title: 'Wular Basin Siltation Evolution',
        subtitle: 'Multi-decadal reduction of open lake waters replaced by willow monocultures and sediment shoals',
        location: 'Wular Lake System',
        metrics: '-36.9% Water Area',
        status: 'Archival Verified',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/tiger.png',
        short: 'Wular Retro'
      },
      {
        id: 'kolahoi-retreat-retro',
        title: 'Kolahoi Glacier Snout Retreat History',
        subtitle: 'Historical snout positions surveyed by Survey of India in 1980 compared against 2026 TanDEM-X',
        location: 'Lidder Catchment Headwaters',
        metrics: '664 m Linear Retreat',
        status: 'Cryosphere Record',
        statusColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        src: '/images/markhor.png',
        short: 'Kolahoi Retro'
      }
    ],
    kpis: [
      { label: 'Archival Time Span', value: '1980–2026 (46 Yrs)', icon: 'Calendar', color: 'text-amber-400' },
      { label: 'Landsat Sensor Legacy', value: 'MSS, TM, ETM+, OLI', icon: 'Satellite', color: 'text-cyan-400' },
      { label: 'Pilot Case Studies', value: '4 Detailed Studies', icon: 'FileText', color: 'text-teal-400' },
      { label: 'Long-Term Loss Area', value: '28,140 ha Scars', icon: 'TrendingDown', color: 'text-rose-400' },
      { label: 'Survey of India Baseline', value: '1980 Toposheets', icon: 'Map', color: 'text-emerald-400' },
      { label: 'Spectral Normalization', value: 'Top-of-Atmosphere & BOA', icon: 'Activity', color: 'text-white' },
      { label: 'Public Monograph', value: 'Freely Downloadable', icon: 'Download', color: 'text-emerald-300' },
      { label: 'Citation Standard', value: 'ISO 19115 Geospatial', icon: 'ShieldCheck', color: 'text-slate-300' }
    ]
  },

  'change-detection-observatory/live-monitoring': {
    tag: 'EHII-INGEST Sentinel Pipeline',
    badge: 'Orbital Telemetry Stream',
    showcaseItems: [
      {
        id: 'sentinel2-pipeline',
        title: 'Sentinel-2A/B Constellation Feed',
        subtitle: 'Twin polar-orbiting multispectral satellites providing 10m VNIR bands on a 5-day cycle',
        location: 'Tiles T43SCT & T43SDT',
        metrics: '5-Day Constellation Cycle',
        status: 'Nominal / Ingested',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/protected-network.png',
        short: 'Sentinel-2'
      },
      {
        id: 'sentinel1-pipeline',
        title: 'Sentinel-1 C-Band SAR Radar',
        subtitle: 'All-weather cloud-penetrating synthetic aperture radar tracking subsidence and surface roughness',
        location: 'Path 062 / Frame 0482',
        metrics: '6-Day Radar Pass',
        status: 'Coherence Calibrated',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/bear.png',
        short: 'Sentinel-1 SAR'
      },
      {
        id: 'landsat9-pipeline',
        title: 'Landsat-9 OLI/TIRS Thermal Sensor',
        subtitle: 'Calibrated land surface temperature (LST) and 30m multi-spectral composites',
        location: 'Path 149 / Row 037',
        metrics: '16-Day Thermal Cycle',
        status: 'LST Composite Active',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/tiger.png',
        short: 'Landsat-9'
      },
      {
        id: 'planetscope-pipeline',
        title: 'PlanetScope 3m Cadastral Constellation',
        subtitle: 'Commercial high-frequency constellation providing daily super-resolution verification',
        location: 'Target Rapid Hotspots',
        metrics: '3m High-Res Cadastral',
        status: 'On-Demand Tasking',
        statusColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        src: '/images/markhor.png',
        short: 'PlanetScope'
      }
    ],
    kpis: [
      { label: 'Active Satellite Constellations', value: '4 Space Systems', icon: 'Satellite', color: 'text-teal-400' },
      { label: 'Pipeline Ingest Status', value: 'Nominal Operations', icon: 'Activity', color: 'text-emerald-400' },
      { label: 'Processing Cloud Workers', value: '8 Automated Nodes', icon: 'Server', color: 'text-cyan-400' },
      { label: 'Mean Tile Latency', value: '< 6 Hours Ingest', icon: 'Clock', color: 'text-teal-300' },
      { label: 'Cloud Screening Algorithm', value: 's2cloudless 98%', icon: 'Cloud', color: 'text-white' },
      { label: 'Atmospheric Correction', value: 'Sen2Cor BOA Level-2A', icon: 'ShieldCheck', color: 'text-emerald-300' },
      { label: 'Active Processing Jobs', value: '4 Jobs in Queue', icon: 'RefreshCw', color: 'text-amber-400' },
      { label: 'Uptime Reliability', value: '99.8% Availability', icon: 'CheckCircle2', color: 'text-emerald-400' }
    ]
  },

  'change-detection-observatory/scientific-dossiers': {
    tag: 'EHII-DOSSIER Evidence Archive',
    badge: 'Auditable Data Packages',
    showcaseItems: [
      {
        id: 'pampore-dossier',
        title: 'Pampore Karewa Geomorphology Dossier',
        subtitle: 'Forensic temporal audit package containing Sentinel-2 BSI differencing and vector shapefiles',
        location: 'Pulwama District',
        metrics: 'Package DOS-2026-01',
        status: 'Published Open Access',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/protected-network.png',
        short: 'Karewa Dossier'
      },
      {
        id: 'hokersar-dossier',
        title: 'Hokersar Ramsar Encroachment Dossier',
        subtitle: 'Comprehensive limnological and cadastral overlay dossier submitted to statutory monitoring bodies',
        location: 'Budgam Basin',
        metrics: 'Package DOS-2026-02',
        status: 'NGT Evidence Record',
        statusColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        src: '/images/bear.png',
        short: 'Hokersar Dossier'
      },
      {
        id: 'pir-panjal-dossier',
        title: 'Pir Panjal Infrastructure Habitat Dossier',
        subtitle: 'Linear infrastructure forest fragmentation assessment covering rail and road alignments',
        location: 'Banihal–Qazigund Flank',
        metrics: 'Package DOS-2026-03',
        status: 'Published Open Access',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/tiger.png',
        short: 'Forest Dossier'
      },
      {
        id: 'rambiara-dossier',
        title: 'Rambiara & Doodhganga Mining Dossier',
        subtitle: 'Hydrographic surveying and satellite InSAR differential package proving riverbed scouring',
        location: 'Shopian & Budgam Rivers',
        metrics: 'Package DOS-2026-04',
        status: 'Court Benchmark',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/markhor.png',
        short: 'Mining Dossier'
      }
    ],
    kpis: [
      { label: 'Published Evidence Dossiers', value: '4 Major Packages', icon: 'FileText', color: 'text-teal-400' },
      { label: 'Vector Data Formats', value: 'GeoJSON & SHP & TIFF', icon: 'Database', color: 'text-cyan-400' },
      { label: 'Statutory Court Benchs', value: 'NGT & High Court', icon: 'ShieldAlert', color: 'text-amber-400' },
      { label: 'Peer Citations Tracked', value: '64 Academic Papers', icon: 'Activity', color: 'text-emerald-400' },
      { label: 'Licensing Standard', value: 'Creative Commons 4.0', icon: 'ShieldCheck', color: 'text-emerald-300' },
      { label: 'Download Access', value: '100% Free Public', icon: 'Download', color: 'text-white' },
      { label: 'Metadata Schema', value: 'ISO 19139 Compliant', icon: 'Layers', color: 'text-slate-300' },
      { label: 'Data Integrity Hash', value: 'SHA-256 Verified', icon: 'CheckCircle2', color: 'text-teal-300' }
    ]
  },

  'change-detection-observatory/verification-queue': {
    tag: 'EHII-VERIFY Step-7 Protocol',
    badge: 'Peer Review Workbench',
    showcaseItems: [
      {
        id: 'dual-review',
        title: 'Two-Specialist Sign-Off Protocol',
        subtitle: 'Independent remote sensing specialist and domain ecologist dual verification requirement',
        location: 'Verification Registry',
        metrics: 'Step-7 Standard',
        status: 'Rigorous Standard',
        statusColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        src: '/images/protected-network.png',
        short: 'Dual Review'
      },
      {
        id: 'drone-photogrammetry',
        title: 'Ground Drone Photogrammetry',
        subtitle: 'Centimeter-scale orthomosaic verification resolving sub-meter cadastral boundaries',
        location: 'Field Verification Units',
        metrics: '2.5 cm Ground Resolution',
        status: 'Active Flight Missions',
        statusColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        src: '/images/bear.png',
        short: 'Drone Survey'
      },
      {
        id: 'cadastral-crossref',
        title: 'Revenue Cadastral Map Cross-Check',
        subtitle: 'Overlaying satellite change polygons onto official J&K Revenue Department Khasra maps',
        location: 'Revenue Boundary Cell',
        metrics: '100% Parcel Checked',
        status: 'Statutory Validation',
        statusColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
        src: '/images/tiger.png',
        short: 'Cadastral Check'
      },
      {
        id: 'community-corroboration',
        title: 'Community Ground-Truth Sentinel',
        subtitle: 'Local village council and citizen science photo-geotagged observation corroboration',
        location: 'Gram Panchayat Level',
        metrics: '38 Active Ground Units',
        status: 'Community Validated',
        statusColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
        src: '/images/markhor.png',
        short: 'Ground Sentinels'
      }
    ],
    kpis: [
      { label: 'Pending Verification', value: '14 Alerts in Queue', icon: 'Clock', color: 'text-amber-400' },
      { label: 'Certified Verified Sites', value: '28 Audited Sites', icon: 'CheckCircle2', color: 'text-emerald-400' },
      { label: 'Rejected / Corrected', value: '3 False Positives', icon: 'XCircle', color: 'text-rose-400' },
      { label: 'Average Review Latency', value: '72 Hours Protocol', icon: 'Activity', color: 'text-cyan-400' },
      { label: 'Accredited Reviewers', value: '12 Senior Scientists', icon: 'UserCheck', color: 'text-teal-400' },
      { label: 'Drone Verification Quota', value: '100% of Tier-1 Alerts', icon: 'Satellite', color: 'text-white' },
      { label: 'Cadastral Accuracy', value: 'Sub-Meter Certified', icon: 'ShieldCheck', color: 'text-emerald-300' },
      { label: 'Audit Trail Permanence', value: 'Immutable Git Log', icon: 'FileCheck', color: 'text-slate-300' }
    ]
  }
};

export function getEhiiHeroConfig(slug: string): EhiiSubmoduleHeroConfig {
  if (EHII_HERO_CONFIGS[slug]) {
    return EHII_HERO_CONFIGS[slug];
  }
  // Try matching prefix if deeper
  for (const key of Object.keys(EHII_HERO_CONFIGS)) {
    if (slug.startsWith(key)) {
      return EHII_HERO_CONFIGS[key];
    }
  }
  return EHII_HERO_CONFIGS.hub;
}
