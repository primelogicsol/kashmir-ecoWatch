import {
  CANONICAL_DISTRICTS,
  CANONICAL_SUBREGIONS,
  LADAKH_2024_NOTIFIED_DISTRICTS,
  SUB_DISTRICT_TO_CANONICAL_DISTRICT,
  VERIFIED_WESTERN_HIMALAYAN_RAMSAR_SITES,
} from './geographic-registry';

export {
  CANONICAL_DISTRICTS,
  CANONICAL_SUBREGIONS,
  LADAKH_2024_NOTIFIED_DISTRICTS,
  VERIFIED_WESTERN_HIMALAYAN_RAMSAR_SITES,
};

export const GEOGRAPHY = {
  scopes: ['All', 'Kashmir Core', 'Trans-Divisional', 'Transboundary / Extended'] as const,
  regions: {
    'Kashmir Core': ['Kashmir Core'],
    'Trans-Divisional': ['Jammu', 'Ladakh'],
    'Transboundary / Extended': ['AJK', 'Gilgit-Baltistan'],
  },
  units: {
    'Kashmir Core': [
      'Anantnag',
      'Bandipora',
      'Baramulla',
      'Budgam',
      'Ganderbal',
      'Kupwara',
      'Kulgam',
      'Pulwama',
      'Shopian',
      'Srinagar',
    ],
    Jammu: [
      'Jammu',
      'Kathua',
      'Samba',
      'Udhampur',
      'Reasi',
      'Doda',
      'Kishtwar',
      'Ramban',
      'Rajouri',
      'Poonch',
    ],
    Ladakh: ['Leh', 'Kargil'],
    AJK: [
      'Muzaffarabad',
      'Neelum',
      'Jhelum Valley',
      'Bagh',
      'Haveli',
      'Poonch (AJK)',
      'Sudhnoti',
      'Kotli',
      'Mirpur',
      'Bhimber',
    ],
    'Gilgit-Baltistan': [
      'Gilgit',
      'Hunza',
      'Nagar',
      'Ghizer',
      'Diamer',
      'Astore',
      'Skardu',
      'Shigar',
      'Kharmang',
      'Ghanche',
      'Darel',
      'Tangir',
      'Gupis-Yasin',
      'Roundu',
    ],
  },
} as const;

export type Scope = (typeof GEOGRAPHY.scopes)[number];
export type Region = keyof typeof GEOGRAPHY.units;
export type AdminUnit = (typeof GEOGRAPHY.units)[Region][number];

/**
 * Official UT of Ladakh Administrative District Registry:
 * - Operational Baseline Parent Districts (2): Leh, Kargil (used across Census 2011, ISRO NWIA, FSI ISFR, and GIS layers)
 * - Newly Announced / Notified Districts (Aug 2024 MHA announcement — 5 districts):
 *   Zanskar, Drass, Sham, Nubra, Changthang (= 7 Ladakh notified districts; 51 total across 5 subregions vs 46 operational baseline units).
 */
export interface LadakhDistrictRecord {
  name: string;
  headquarters: string;
  parentDistrict: 'Leh' | 'Kargil';
  status: 'Baseline Parent District' | 'Newly Notified District (MHA Aug 2024)';
}

export const LADAKH_DISTRICTS_REGISTRY: readonly LadakhDistrictRecord[] = [
  { name: 'Leh', headquarters: 'Leh', parentDistrict: 'Leh', status: 'Baseline Parent District' },
  { name: 'Kargil', headquarters: 'Kargil', parentDistrict: 'Kargil', status: 'Baseline Parent District' },
  { name: 'Nubra', headquarters: 'Diskit', parentDistrict: 'Leh', status: 'Newly Notified District (MHA Aug 2024)' },
  { name: 'Sham', headquarters: 'Khalatse', parentDistrict: 'Leh', status: 'Newly Notified District (MHA Aug 2024)' },
  { name: 'Changthang', headquarters: 'Nyoma', parentDistrict: 'Leh', status: 'Newly Notified District (MHA Aug 2024)' },
  { name: 'Zanskar', headquarters: 'Padum', parentDistrict: 'Kargil', status: 'Newly Notified District (MHA Aug 2024)' },
  { name: 'Drass', headquarters: 'Drass', parentDistrict: 'Kargil', status: 'Newly Notified District (MHA Aug 2024)' },
] as const;

const LADAKH_NOTIFIED_UNIT_ALIASES = new Set([
  'nubra',
  'sham',
  'changthang',
  'zanskar',
  'drass',
  'dras',
]);

export interface OfficialAdministrativeSource {
  region: string;
  tier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  districtCountSummary: string;
  authority: string;
  verificationNote: string;
}

export const OFFICIAL_ADMIN_SOURCES: readonly OfficialAdministrativeSource[] = [
  {
    region: 'Kashmir Valley (Kashmir Division)',
    tier: 'Tier 1',
    districtCountSummary: '10 Operational Districts',
    authority: 'Government of J&K General Administration Dept. (GAD) & Census of India 2011 Baseline',
    verificationNote: 'All 10 Valley districts carry verified KEW district dossiers and GIS boundaries (sub-district towns like Pampore are nested under Pulwama).',
  },
  {
    region: 'Jammu Region (Jammu Division)',
    tier: 'Tier 2',
    districtCountSummary: '10 Operational Districts',
    authority: 'Government of J&K GAD & Census of India 2011 Baseline',
    verificationNote: 'All 10 Jammu Region districts carry harmonized area, elevation, headquarters, and watershed baselines.',
  },
  {
    region: 'Union Territory of Ladakh',
    tier: 'Tier 2',
    districtCountSummary: '2 Operational Baseline Districts (+ 5 Notified Aug 2024 = 7)',
    authority: 'Census of India 2011 & Ministry of Home Affairs Notification (26 Aug 2024: Zanskar, Drass, Sham, Nubra, Changthang)',
    verificationNote: 'Statutory GIS, Census, NWIA, and ISFR datasets aggregate by operational parent districts Leh & Kargil pending demarcated boundary gazettes for the 5 newly notified districts.',
  },
  {
    region: 'Azad Jammu & Kashmir (Cross-Border Basins)',
    tier: 'Tier 3',
    districtCountSummary: '10 Operational Districts (Muzaffarabad, Poonch & Mirpur Divisions)',
    authority: 'Pakistan Bureau of Statistics (2017/2023 Census) & Transboundary Jhelum–Neelum–Poonch Basin Gazetteer',
    verificationNote: '10 operational districts tracked via satellite remote sensing, gridded atmospheric reanalysis, and public hydrometric references.',
  },
  {
    region: 'Gilgit-Baltistan (Cross-Border Cryosphere & Upper Indus)',
    tier: 'Tier 3',
    districtCountSummary: '14 Operational Districts (Gilgit, Baltistan & Diamer Divisions)',
    authority: 'Gilgit-Baltistan Planning & Development Department & Upper Indus Basin Gazetteer',
    verificationNote: '14 operational districts tracked via orbital cryosphere/GLOF observation and gridded reanalysis.',
  },
] as const;

export interface GeographicTierGroup {
  groupLabel: string;
  regionNote: string;
  items: readonly string[];
}

export interface GeographicScopeTierDefinition {
  id: 'kashmir-core' | 'trans-divisional' | 'transboundary';
  canonicalScope: Exclude<Scope, 'All'>;
  tierLabel: 'Tier 1' | 'Tier 2' | 'Tier 3';
  name: string;
  tabLabel: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  tagline: string;
  description: string;
  transboundaryLinkageNote?: string;
  coverageSummaryLabel: string;
  monitoringSummaryLabel: string;
  administrativeGroups: readonly GeographicTierGroup[];
  keyLandmarks: readonly string[];
  monitoringFocus: readonly string[];
}

export const GEOGRAPHIC_SCOPE_TIERS: readonly GeographicScopeTierDefinition[] = [
  {
    id: 'kashmir-core',
    canonicalScope: 'Kashmir Core',
    tierLabel: 'Tier 1',
    name: 'Kashmir Core',
    tabLabel: 'Tier 1 · Kashmir Core',
    subtitle: 'Kashmir Valley Intermontane Basin & Jhelum Hydrological Heartland',
    badge: 'Tier 1 · Primary Valley Basin (10 Districts)',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    tagline:
      'Primary environmental focus area encompassing the alluvial valley floor, karewa terraces, 4 Ramsar floodplains, and inner Himalayan catchments.',
    description:
      'Kashmir Core represents the contiguous geographic and ecological heartland of the Kashmir Valley (15,948 km² across 10 operational districts). Bounded by the Pir Panjal range to the south and west and the Greater Himalayas to the north and east, this enclosed intermontane basin functions as a tightly coupled hydrological, limnological, and winter atmospheric amphitheater.',
    coverageSummaryLabel: '10 Operational Districts · 4 Official Ramsar Sites',
    monitoringSummaryLabel:
      'External Public CAAQMS/CWC Feeds + 10 CAMS Grids + Sentinel-2/Landsat Optical Retrievals (0 KEW-Owned Physical Sensors)',
    administrativeGroups: [
      {
        groupLabel: 'Kashmir Valley — 10 Operational Baseline Districts',
        regionNote: '100% canonical district coverage (sub-district tehsils such as Pampore are nested under Pulwama)',
        items: GEOGRAPHY.units['Kashmir Core'],
      },
    ],
    keyLandmarks: [
      'River Jhelum (Vyeth) Mainstem & Major Tributary Sub-Basins (Lidder, Sind, Pohru, Vishow, Rambiara, Dudhganga, Sukhnag, Erin, Madhumati)',
      '4 RSIS-Inscribed Ramsar Sites in Kashmir Valley: Wular Lake (#461), Hokera / Hokersar Wetland (#1570), Shallbugh Wetland (#2488) & Hygam Wetland (#2496)',
      'Dal Lake, Nigeen Lake, Manasbal Lake, Anchar Lake, Mirgund Wetland Conservation Reserve (Baramulla / Budgam; non-Ramsar) & High-Altitude Alpine Lakes (Gangabal, Tarsar–Marsar, Sheshnag, Kausarnag)',
      'Dachigam National Park (Primary Hangul Habitat), Kazinag National Park, Overa-Aru, Gulmarg, Hirpora & Thajwas Wildlife Sanctuaries',
      'Pulwama (Pampore Karewa Saffron Plateaus & Chatlam–Kranchoo Wetlands), Temperate Conifer Forests & Karst Springs (Verinag, Achabal, Kokernag)',
    ],
    monitoringFocus: [
      'External public CPCB/JKPCC CAAQMS station feed at Srinagar paired with 10 district CAMS/Open-Meteo gridded reanalysis cells',
      'Published CWC / I&FC flood-routing benchmark stages along the Jhelum mainstem and major Valley tributaries',
      'Limnological trophic status synthesis and archived satellite optical retrievals (Sentinel-2 MSI & Landsat 8/9) across Valley waterbodies',
      'Statutory CAG, JKPCC, and LCMA municipal waste and sewage treatment (STP) design/audit benchmark tracking',
      'Endangered Hangul corridor connectivity, Central Asian Flyway waterfowl census synthesis, and Chinar heritage tree inventory',
    ],
  },
  {
    id: 'trans-divisional',
    canonicalScope: 'Trans-Divisional',
    tierLabel: 'Tier 2',
    name: 'Trans-Divisional / Regional',
    tabLabel: 'Tier 2 · Trans-Divisional / Regional',
    subtitle: 'Jammu Region Watersheds & Union Territory of Ladakh Cold-Desert Cryosphere',
    badge: 'Tier 2 · Regional Coupled Bioregions (Jammu & Ladakh)',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    tagline:
      'Regional mountain, foothill, and Trans-Himalayan ecosystems encompassing all 10 districts of Jammu Region and UT of Ladakh (2 operational baseline + 5 Aug 2024 notified districts).',
    description:
      'Tier 2 (Trans-Divisional / Regional) unites the two contiguous subregions ecologically coupled to the Kashmir Valley: Jammu Region across the Pir Panjal crest, Chenab–Tawi–Ravi watersheds, and Shivalik wetland fringes, together with the Union Territory of Ladakh across the Zoji La divide, Zanskar–Suru–Drass glaciated valleys, Nubra–Shyok cryosphere, and Changthang endorheic Ramsar lakes.',
    transboundaryLinkageNote:
      'Ladakh holds its primary geographic classification in Tier 2. Specific Ladakh hydrological and cryospheric systems (Upper Indus–Shyok–Nubra river continuity, Pangong Tso endorheic basin, Siachen–Karakoram icefields, and Central Asian Flyway stopovers) also connect with cross-border processes referenced in Tier 3.',
    coverageSummaryLabel:
      '12 Operational Baseline Districts (10 Jammu + 2 Ladakh) · +5 Newly Notified Aug 2024 Ladakh Districts · 3 Official Ramsar Sites',
    monitoringSummaryLabel:
      'External Public Stations + 12 CAMS Reanalysis Grids + Orbital Cryosphere Retrievals (0 KEW-Owned Physical Sensors)',
    administrativeGroups: [
      {
        groupLabel: 'Jammu Region — 10 Operational Baseline Districts',
        regionNote: 'Shivalik plains, Pir Panjal valleys, and Kishtwar Greater Himalayan catchments',
        items: GEOGRAPHY.units.Jammu,
      },
      {
        groupLabel: 'UT of Ladakh — 2 Operational Baseline Districts (Census / NWIA / ISFR / GIS)',
        regionNote: 'Primary spatial polygon & statutory statistical aggregation units',
        items: GEOGRAPHY.units.Ladakh,
      },
      {
        groupLabel: 'UT of Ladakh — 5 Newly Notified Districts (MHA Announcement · Aug 2024)',
        regionNote:
          'Zanskar, Drass, Sham, Nubra & Changthang (= 51 total notified districts across 5 subregions); aggregated under Leh & Kargil pending boundary gazettes',
        items: LADAKH_DISTRICTS_REGISTRY.filter((d) => d.status !== 'Baseline Parent District').map(
          (d) => `${d.name} (Parent: ${d.parentDistrict})`
        ),
      },
    ],
    keyLandmarks: [
      '3 RSIS-Inscribed Ramsar Sites in Tier 2: Surinsar-Mansar Lakes (#1573 in Jammu/Samba/Udhampur), Tsomoriri (#1213 in Leh) & Tso Kar Wetland Complex (#2443 in Leh)',
      'Chenab, Marusudar, Tawi, Munawar Tawi, Poonch & Ravi Foothill Drainage Systems and Gharana Wetland Conservation Reserve (non-Ramsar)',
      'Kishtwar High Altitude National Park, Tata Kutti (Poonch), Ramnagar, Jasrota & Nandini Wildlife Sanctuaries',
      'Ladakh Trans-Himalayan Protected Network: Hemis National Park, Changthang Cold Desert & Karakoram Wildlife Sanctuaries',
      'Ladakh Cryosphere & Endorheic Basins: Siachen, Drang-Drung, Parkachik, Nun-Kun & Machoi Glaciers; Western Pangong Tso (non-Ramsar)',
    ],
    monitoringFocus: [
      'External public ambient air feeds and 12 CAMS/Open-Meteo gridded atmospheric reanalysis cells across Jammu (10) and Ladakh (2)',
      'Chenab, Tawi, Zanskar, Suru, and Upper Indus hydrographic basin synthesis and hydropower cascade impact tracking',
      'Satellite glacier-terminus, Snow Water Equivalent (SWE), permafrost, and moraine-dammed GLOF susceptibility screening across Zanskar, Suru–Drass, and Shyok–Nubra',
      'Landslide, cloudburst, and slope-stability hazard screening along NH-44 (Ramban–Banihal), Mughal Road, and Zoji La, plus NASA FIRMS thermal anomalies',
      'High-altitude Trans-Himalayan biodiversity (Snow Leopard, Asiatic Ibex, Kiang, and Leh-breeding Black-necked Crane)',
    ],
  },
  {
    id: 'transboundary',
    canonicalScope: 'Transboundary / Extended',
    tierLabel: 'Tier 3',
    name: 'Transboundary / Extended',
    tabLabel: 'Tier 3 · Transboundary / Extended',
    subtitle: 'Cross-Border Watersheds, Karakoram Cryosphere, Atmospheric Rivers & Avian Flyways',
    badge: 'Tier 3 · Cross-Border Subregions (24 Operational Districts + 5 Macro Corridors)',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    tagline:
      'Cross-border ecological systems spanning Azad Jammu & Kashmir (10 districts) and Gilgit-Baltistan (14 districts), the Upper Indus basin, Karakoram icefields, and Central Asian Flyway.',
    description:
      'Environmental processes—river discharge, glacier mass balance, seismic fault rupture, atmospheric moisture transport, and continental bird migration—operate continuously across administrative lines. Tier 3 encompasses the 24 operational cross-border districts of Azad Jammu & Kashmir and Gilgit-Baltistan alongside macro-scale transboundary Earth systems linking the Western Himalayas, Karakoram, Hindu Kush, and Tibetan Plateau.',
    transboundaryLinkageNote:
      'Tier 3 contains 0 RSIS-designated Ramsar sites within its 24 districts (note: Mangla Reservoir in Mirpur is a major hydropower impoundment and waterbird wintering body, NOT a Ramsar site; all 7 official Western Himalayan Ramsar sites lie in Tier 1 [4] and Tier 2 [3]).',
    coverageSummaryLabel:
      '24 Operational Districts (10 AJ&K + 14 Gilgit-Baltistan) · 0 Ramsar Sites',
    monitoringSummaryLabel:
      'Satellite Remote Sensing, USGS/EMSC Seismic & 24 CAMS/Open-Meteo Reanalysis Grids (0 KEW-Owned Physical Sensors)',
    administrativeGroups: [
      {
        groupLabel: 'Azad Jammu & Kashmir — 10 Operational Baseline Districts',
        regionNote: 'Neelum–Kishanganga, Jhelum Valley, Poonch & Mirpur–Bhimber catchments',
        items: GEOGRAPHY.units.AJK,
      },
      {
        groupLabel: 'Gilgit-Baltistan — 14 Operational Baseline Districts',
        regionNote: 'Gilgit, Baltistan & Diamer divisions across the Karakoram–Nanga Parbat–Upper Indus cryosphere',
        items: GEOGRAPHY.units['Gilgit-Baltistan'],
      },
      {
        groupLabel: 'Transboundary Macro-Ecological Corridors & Shared Processes',
        regionNote: 'Cross-border Earth systems linking Tier 1, Tier 2, and international corridors',
        items: [
          'Upper Indus Transboundary River Corridor (Ladakh – Baltistan – Diamer Gorge)',
          'Karakoram–Himalayan Cryosphere & Baltoro–Biafo–Hispar–Batura Glacial Complex',
          'Neelum–Kishanganga & Lower Jhelum–Mangla Transboundary Watersheds',
          'Subtropical Westerly Jet & Western Disturbance Moisture Corridors',
          'Central Asian Flyway (CAF) Continental Migratory Avian Corridor',
        ],
      },
    ],
    keyLandmarks: [
      'Central Karakoram National Park & Major Cryospheric Complexes (K2, Baltoro, Biafo, Hispar, Batura, Passu, Shisper & Nanga Parbat Massif)',
      'Deosai National Park (Sheosar Lake), Khunjerab National Park, Machiara National Park & Gurez–Neelum Wildlife Corridor',
      'Upper Indus, Gilgit, Hunza, Shigar, Astore & Neelum–Jhelum Confluences and Mangla Reservoir (Mirpur; major non-Ramsar impoundment)',
      'Shared Cross-Border High-Altitude Basins linking Tier 2 Ladakh & Tier 3 Systems (Shyok–Indus & Suru–Shingo Continuity)',
      'Central Asian Flyway Staging Chain linking Changthang, Kashmir Valley Ramsar Wetlands, and Indus Foothill Reservoirs',
    ],
    monitoringFocus: [
      'Orbital optical/SAR cryosphere observation (Sentinel-1/2, Landsat 8/9, Copernicus DEM) tracking glacier surge dynamics and moraine-lake GLOF hazard zones',
      'Gridded Copernicus CAMS / Open-Meteo atmospheric and GloFAS hydrological model series (explicitly labeled as coarse-grid models, never ground stations)',
      'Instrumental earthquake catalog tracking via USGS and EMSC public feeds across the Western Himalayan syntaxis',
      'Synoptic atmospheric tracking of Western Disturbances, 250 hPa subtropical jet circulation, and transboundary aerosol transport',
      'IUCN Red List and peer-reviewed range envelopes for Flare-horned Markhor, Snow Leopard, Himalayan Brown Bear, and Western Tragopan',
    ],
  },
] as const;

// Get all units for a given scope
export function getUnitsForScope(scope: Scope): string[] {
  if (scope === 'All') {
    return Object.values(GEOGRAPHY.units).flat();
  }

  const regions = (GEOGRAPHY.regions as Record<string, readonly string[]>)[scope];
  if (!regions) return [];

  let units: string[] = [];
  for (const region of regions) {
    if (region in GEOGRAPHY.units) {
      units = [...units, ...(GEOGRAPHY.units as Record<string, readonly string[]>)[region]];
    }
  }
  return units;
}

// Helper to determine scope from a given unit, supporting slashed districts, sub-district aliases (e.g., Pampore -> Pulwama), and Aug 2024 Ladakh districts
export function getScopeForUnit(unit: string): Scope {
  if (!unit) return 'All';

  const normalize = (u: string) => {
    const trimmed = u.trim();
    const lower = trimmed.toLowerCase();
    if (SUB_DISTRICT_TO_CANONICAL_DISTRICT[lower]) {
      return SUB_DISTRICT_TO_CANONICAL_DISTRICT[lower];
    }
    if (trimmed === 'Hattian Bala') return 'Jhelum Valley';
    return trimmed;
  };

  const parts = unit.split('/');
  for (const part of parts) {
    const normalizedPart = normalize(part);
    if (LADAKH_NOTIFIED_UNIT_ALIASES.has(normalizedPart.toLowerCase())) {
      return 'Trans-Divisional';
    }
    for (const [region, units] of Object.entries(GEOGRAPHY.units)) {
      if ((units as readonly string[]).includes(normalizedPart)) {
        for (const [scope, regions] of Object.entries(GEOGRAPHY.regions)) {
          if ((regions as readonly string[]).includes(region)) {
            return scope as Scope;
          }
        }
      }
    }
  }

  return 'All';
}

export function getAvailableDistrictsForScope(
  entities: { district: string }[],
  scope: Scope
): string[] {
  const districtNames = new Set<string>();

  if (scope === 'All') {
    entities.forEach((e) => {
      if (!e.district) return;
      e.district.split('/').forEach((d) => {
        const trimmed = d.trim();
        const mapped = SUB_DISTRICT_TO_CANONICAL_DISTRICT[trimmed.toLowerCase()] || trimmed;
        districtNames.add(mapped);
      });
    });
  } else {
    const units = getUnitsForScope(scope);
    units.forEach((u) => districtNames.add(u));

    entities.forEach((e) => {
      if (!e.district) return;
      e.district.split('/').forEach((part) => {
        const trimmed = part.trim();
        const mapped = SUB_DISTRICT_TO_CANONICAL_DISTRICT[trimmed.toLowerCase()] || trimmed;
        if (getScopeForUnit(mapped) === scope) {
          districtNames.add(mapped);
        }
      });
    });
  }

  return Array.from(districtNames).sort();
}
