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
      'Hattian Bala',
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
 * Official UT of Ladakh Administrative District Registry (Verified 2026).
 * - Baseline Census / GIS / ISFR Parent Districts (2): Leh, Kargil
 * - Newly Notified Districts under UT of Ladakh Revenue Dept. S.O. 180 (27 Apr 2026,
 *   following MHA approval of 26 Aug 2024): Sham, Nubra, Changthang, Zanskar, Drass (5)
 * - Additional Notified District under S.O. 284 (16 Oct 2026): Sankoo (1)
 * Keeping `GEOGRAPHY.units.Ladakh` anchored to the 2 parent baseline polygons preserves
 * backward compatibility with ISFR 2023 tables, Census baselines, and 42-feature GIS layers,
 * while exposing all 8 official notified districts for authoritative geographic-scope reporting.
 */
export interface LadakhDistrictRecord {
  name: string;
  headquarters: string;
  parentDistrict: 'Leh' | 'Kargil';
  status: 'Baseline Parent District' | 'Notified District (S.O. 180 · Apr 2026)' | 'Notified District (S.O. 284 · Oct 2026)';
}

export const LADAKH_DISTRICTS_REGISTRY: readonly LadakhDistrictRecord[] = [
  { name: 'Leh', headquarters: 'Leh', parentDistrict: 'Leh', status: 'Baseline Parent District' },
  { name: 'Kargil', headquarters: 'Kargil', parentDistrict: 'Kargil', status: 'Baseline Parent District' },
  { name: 'Nubra', headquarters: 'Diskit', parentDistrict: 'Leh', status: 'Notified District (S.O. 180 · Apr 2026)' },
  { name: 'Sham', headquarters: 'Khaltse', parentDistrict: 'Leh', status: 'Notified District (S.O. 180 · Apr 2026)' },
  { name: 'Changthang', headquarters: 'Nyoma', parentDistrict: 'Leh', status: 'Notified District (S.O. 180 · Apr 2026)' },
  { name: 'Zanskar', headquarters: 'Padum', parentDistrict: 'Kargil', status: 'Notified District (S.O. 180 · Apr 2026)' },
  { name: 'Drass', headquarters: 'Drass-Ranbirpura', parentDistrict: 'Kargil', status: 'Notified District (S.O. 180 · Apr 2026)' },
  { name: 'Sankoo', headquarters: 'Sankoo', parentDistrict: 'Kargil', status: 'Notified District (S.O. 284 · Oct 2026)' },
] as const;

const LADAKH_NOTIFIED_UNIT_ALIASES = new Set([
  'nubra',
  'sham',
  'changthang',
  'zanskar',
  'drass',
  'dras',
  'sankoo',
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
    region: 'Kashmir Division (Kashmir Valley)',
    tier: 'Tier 1',
    districtCountSummary: '10 Official Districts',
    authority: 'Government of J&K General Administration Dept. (GAD) & Integrated Government Online Directory (IGOD)',
    verificationNote: 'All 10 central valley districts carry active KEW district intelligence dossiers and GIS boundaries.',
  },
  {
    region: 'Jammu Division',
    tier: 'Tier 2',
    districtCountSummary: '10 Official Districts',
    authority: 'Government of J&K GAD & Divisional Commissioner Jammu (divcomjammu.gov.in / IGOD)',
    verificationNote: '10 GIS district boundaries; 6 mountain-interface districts have dedicated KEW district intelligence dossiers.',
  },
  {
    region: 'Union Territory of Ladakh',
    tier: 'Tier 2',
    districtCountSummary: '8 Notified Districts (2 Baseline Parent + 6 Notified in 2026)',
    authority: 'Ministry of Home Affairs (26 Aug 2024) & UT of Ladakh Revenue Dept. Notifications S.O. 180 (27 Apr 2026) & S.O. 284 (16 Oct 2026)',
    verificationNote: 'Historical/GIS/ISFR datasets aggregate by parent districts Leh & Kargil; 6 newly notified 2026 districts tracked within parent watershed baselines.',
  },
  {
    region: 'Azad Jammu & Kashmir (Cross-Border Basins)',
    tier: 'Tier 3',
    districtCountSummary: '10 Administrative Districts (Muzaffarabad, Poonch & Mirpur Divisions)',
    authority: 'Official Administrative Directory & KEW Spatial Gazetteer',
    verificationNote: '10 GIS boundaries; tracked via satellite remote sensing, CAMS atmospheric reanalysis, Muzaffarabad EPA & Neelum-Jhelum gauge feeds.',
  },
  {
    region: 'Gilgit-Baltistan (Cross-Border Cryosphere & Upper Indus)',
    tier: 'Tier 3',
    districtCountSummary: '14 Administrative Districts (Gilgit, Baltistan & Diamer Divisions)',
    authority: 'Official Administrative Directory & KEW Spatial Gazetteer',
    verificationNote: '10 parent GIS boundaries (4 newer carved-out districts aggregated within parent basins); tracked via orbital cryosphere/GLOF observation, Gilgit EPA & gauge feeds.',
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
      'Primary environmental focus area encompassing the alluvial valley floor, Karewa terraces, Ramsar floodplains, and inner Himalayan catchments.',
    description:
      'Kashmir Core represents the contiguous geographic and ecological heartland of the Kashmir Valley (15,948 km²). Bounded by the Pir Panjal range to the south and west and the Greater Himalayas to the north and east, this enclosed intermontane basin functions as a tightly coupled hydrological, limnological, and winter atmospheric amphitheater.',
    coverageSummaryLabel: '10 Official Districts · 10 GIS Polygons',
    monitoringSummaryLabel:
      '10/10 District Dossiers · 1 Physical CAAQMS + 10 CAMS Grids · 9 River Gauges',
    administrativeGroups: [
      {
        groupLabel: 'Kashmir Division — 10 Official Districts',
        regionNote: '100% active district intelligence profiles & spatial boundaries',
        items: GEOGRAPHY.units['Kashmir Core'],
      },
    ],
    keyLandmarks: [
      'River Jhelum (Vyeth) Mainstem & 24 Major Inflow Tributaries (Lidder, Sindh, Pohru, Vishav, Rambiara, Doodhganga)',
      'Dal Lake, Nigeen Lake, Wular Lake (Ramsar #461), Manasbal Lake & High-Altitude Alpine Lakes (Gangabal, Tarsar-Marsar, Sheshnag)',
      'Hokersar (Ramsar #1570), Shallabugh (Ramsar #2487), Hygam (Ramsar #2486) & Mirgund Floodplain Wetland Reserves',
      'Dachigam National Park (Primary Hangul Habitat), Overa-Aru, Gulmarg, Hirpora & Thajwas Wildlife Sanctuaries',
      'Pampore Karewa Plateaus, Temperate Conifer Forests & Subterranean Karst Springs (Verinag, Achabal, Kokernag)',
    ],
    monitoringFocus: [
      'Verified ground-truth air quality at Srinagar CAAQMS paired with 10 district CAMS/Open-Meteo atmospheric cells during winter inversions',
      '9 live hydrometric flood-routing gauge stations along the Jhelum mainstem and major valley tributaries',
      'Limnological trophy, wetland perimeter, and algal-bloom remote sensing (Sentinel-2 MSI & Landsat 8/9) across 553 cataloged lakes',
      'Municipal solid waste, sewage treatment (STP) BOD/nutrient loads, and riparian encroachment audits across all 10 valley districts',
      'Endangered Hangul corridor connectivity, seasonal waterfowl stopover counts, and Chinar heritage tree monitoring',
    ],
  },
  {
    id: 'trans-divisional',
    canonicalScope: 'Trans-Divisional',
    tierLabel: 'Tier 2',
    name: 'Trans-Divisional / Regional',
    tabLabel: 'Tier 2 · Trans-Divisional / Regional',
    subtitle: 'Jammu Division Watersheds & Union Territory of Ladakh Cold-Desert Cryosphere',
    badge: 'Tier 2 · Regional Coupled Bioregions (Jammu & Ladakh)',
    badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
    tagline:
      'Regional mountain, foothill, and Trans-Himalayan ecosystems encompassing all official districts of Jammu Division and the Union Territory of Ladakh.',
    description:
      'Tier 2 (Trans-Divisional / Regional) unites the two contiguous regional realms ecologically coupled to the Kashmir Valley: Jammu Division across the Pir Panjal crest, Chenab–Tawi–Ravi watersheds, and Shivalik wetland fringes, together with the Union Territory of Ladakh across the Zojila divide, Zanskar–Suru–Drass glaciated valleys, Nubra–Shyok cryosphere, and Changthang high-altitude endorheic lakes.',
    transboundaryLinkageNote:
      'Ladakh holds its primary geographic classification in Tier 2. Specific Ladakh hydrological and cryospheric systems (Upper Indus–Shyok–Nubra river continuity, Pangong Tso endorheic basin, Siachen–Karakoram icefields, and Central Asian Flyway stopovers) also participate in cross-border processes referenced in Tier 3.',
    coverageSummaryLabel:
      '18 Official Notified Districts (10 Jammu + 8 Ladakh · 12 Baseline Parent Units)',
    monitoringSummaryLabel:
      '6 Jammu District Dossiers · 2 Physical CAAQMS (Jammu, Leh) + 12 CAMS Grids · 1 Chenab Gauge + Orbital Cryosphere',
    administrativeGroups: [
      {
        groupLabel: 'Jammu Division — 10 Official Districts',
        regionNote:
          '6 mountain-interface districts carry dedicated KEW dossiers (Doda, Kishtwar, Ramban, Rajouri, Poonch, Kathua); all 10 covered by GIS, CAMS & satellite layers',
        items: GEOGRAPHY.units.Jammu,
      },
      {
        groupLabel: 'UT of Ladakh — 2 Baseline Parent Districts (Census / GIS / ISFR)',
        regionNote: 'Primary spatial polygon & historical statistical aggregation units',
        items: GEOGRAPHY.units.Ladakh,
      },
      {
        groupLabel: 'UT of Ladakh — 6 Newly Notified Administrative Districts (2026)',
        regionNote:
          'Notified via UT of Ladakh Revenue Dept. S.O. 180 (27 Apr 2026) & S.O. 284 (16 Oct 2026); ecological records currently aggregated within Leh & Kargil parent watersheds',
        items: LADAKH_DISTRICTS_REGISTRY.filter((d) => d.status !== 'Baseline Parent District').map(
          (d) => `${d.name} (HQ: ${d.headquarters})`
        ),
      },
    ],
    keyLandmarks: [
      'Chenab, Tawi & Ravi Drainage Systems (Marusudar, Ans, Poonch River) & Shivalik Wetlands (Surinsar-Mansar Ramsar #1573, Gharana)',
      'Pir Panjal & Great Himalayan Passes (Banihal, Peer Ki Gali, Sinthan Top, Zojila, Penzi La, Khardung La)',
      'Kishtwar High Altitude National Park, Ramnagar, Jasrota, Nandini & Rajparian Wildlife Sanctuaries',
      'Ladakh Trans-Himalayan Protected Network: Hemis National Park, Changthang Cold Desert & Karakoram Wildlife Sanctuaries',
      'Ladakh Cryosphere & Endorheic Ramsar Lakes: Drang-Drung, Parkachik, Nun-Kun & Machoi Glaciers; Tso Moriri (Ramsar #1213), Tso Kar (Ramsar #2443) & Western Pangong Tso',
    ],
    monitoringFocus: [
      'Physical ambient air baseline stations at Jammu (Bikram Chowk CAAQMS) and Leh Observatory, complemented by 12 CAMS/Open-Meteo regional grid cells across Jammu (10) and Ladakh (2)',
      'Live Chenab river gauge tracking (Akhnoor) and reservoir sedimentation/hydrological assessment across Baglihar, Salal, and Dul Hasti corridors',
      'Satellite glacier-terminus, Snow Water Equivalent (SWE), permafrost, and moraine-dammed GLOF susceptibility tracking across Zanskar, Suru-Drass, and Shyok-Nubra basins',
      'Landslide, cloudburst, and highway slope-stability hazard intelligence along NH-44 (Ramban–Banihal), Mughal Road, and Zojila corridors, plus NASA FIRMS forest-fire hotspots',
      'High-altitude cold-desert biodiversity conservation (Snow Leopard, Tibetan Wild Ass/Kiang, Black-necked Crane, Pashmina rangeland ecology)',
    ],
  },
  {
    id: 'transboundary',
    canonicalScope: 'Transboundary / Extended',
    tierLabel: 'Tier 3',
    name: 'Transboundary / Extended',
    tabLabel: 'Tier 3 · Transboundary / Extended',
    subtitle: 'Cross-Border Watersheds, Karakoram Cryosphere, Atmospheric Rivers & Avian Flyways',
    badge: 'Tier 3 · Cross-Border Basins & Macro-Corridors (24 Districts + 5 Corridors)',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    tagline:
      'Cross-border ecological systems spanning Azad Jammu & Kashmir, Gilgit-Baltistan, the Upper Indus basin, Karakoram icefields, westerly jet streams, and international flyways.',
    description:
      'Environmental processes—river discharge, glacier mass balance, seismic fault rupture, atmospheric moisture transport, and continental bird migration—operate continuously across administrative boundaries. Tier 3 encompasses cross-border watersheds in Azad Jammu & Kashmir and Gilgit-Baltistan alongside macro-scale transboundary Earth systems linking the Western Himalayas, Karakoram, Hindu Kush, and Tibetan Plateau.',
    transboundaryLinkageNote:
      'Cross-border Earth systems in Tier 3 connect hydrologically and ecologically with Tier 2 Ladakh watersheds (where the Indus, Shyok, and Pangong basins cross administrative lines) and Tier 1 Jhelum–Kishanganga outflows, without classifying Ladakh itself exclusively as transboundary.',
    coverageSummaryLabel:
      '24 Cross-Border Districts (10 AJK + 14 Gilgit-Baltistan) · 5 Macro Corridors',
    monitoringSummaryLabel:
      'Satellite, Reanalysis & Public Agency Feeds · 2 EPA Reference Nodes + 22 CAMS Grids · 2 Basin Gauges (Zero Direct KEW Field Sensors)',
    administrativeGroups: [
      {
        groupLabel: 'Azad Jammu & Kashmir — 10 Cross-Border Basin Districts',
        regionNote: 'Neelum–Kishanganga, Middle Jhelum, Poonch & Mangla catchments (satellite & public hydrological/EPA feeds)',
        items: GEOGRAPHY.units.AJK,
      },
      {
        groupLabel: 'Gilgit-Baltistan — 14 Cross-Border Cryosphere & Indus Districts',
        regionNote: 'Gilgit, Baltistan & Diamer divisions (10 spatial GIS polygons; orbital cryosphere, GLOF & EPA feeds)',
        items: GEOGRAPHY.units['Gilgit-Baltistan'],
      },
      {
        groupLabel: 'Transboundary Macro-Ecological Corridors & Shared Processes',
        regionNote: 'Cross-border Earth systems linking Tier 1, Tier 2 (including shared Ladakh basins), and international corridors',
        items: [
          'Upper Indus Transboundary River Corridor (Tibetan Plateau – Ladakh – Baltistan – Indus Gorge)',
          'Karakoram–Himalayan Cryosphere & Siachen–Baltoro–Hispar–Batura Glacial Complex',
          'Neelum–Kishanganga & Lower Jhelum–Mangla Transboundary Watersheds',
          'Subtropical Westerly Jet & Western Disturbance Moisture Corridors',
          'Central Asian Flyway (CAF) Continental Migratory Avian Corridor',
        ],
      },
    ],
    keyLandmarks: [
      'Central Karakoram National Park & Major Cryospheric Complexes (Baltoro, Biafo, Hispar, Batura, Passu, Shisper & Nanga Parbat Massif)',
      'Deosai Alpine Plateau, Khunjerab National Park, Machiara National Park & Gurez–Neelum Transboundary Wildlife Corridor',
      'Upper Indus, Gilgit, Hunza, Shigar, Shyok & Neelum–Jhelum Transboundary River Confluences and Mangla Reservoir (Ramsar #820)',
      'Shared Cross-Border High-Altitude Basins linking Tier 2 Ladakh & Tier 3 Systems (Pangong Tso Transboundary Basin, Shyok–Indus Continuity)',
      'Central Asian Flyway Breeding-to-Wintering Staging Chain (Siberia/Central Asia to Himalayan & Indus Wetlands)',
    ],
    monitoringFocus: [
      'Orbital optical/SAR cryosphere observation (Sentinel-1/2, Landsat 8/9, Copernicus DEM) tracking glacier surge dynamics and 27 regional GLOF moraine-lake hazard zones',
      '22 Copernicus CAMS / Open-Meteo gridded atmospheric cells supplemented by public EPA reference feeds at Muzaffarabad and Gilgit (no direct KEW physical field deployments)',
      'Downstream & cross-border hydrometric context via Muzaffarabad (Neelum–Jhelum) and Gilgit basin gauge references',
      'Synoptic atmospheric tracking of Western Disturbances, 250 hPa subtropical jet circulation, and transboundary aerosol/dust transport',
      'International IUCN/CAF migratory bird flyway phenology and USGS instrumental seismic monitoring across the Western Himalayan syntaxis',
    ],
  },
] as const;

// Get all units for a given scope
export function getUnitsForScope(scope: Scope): string[] {
  if (scope === 'All') {
    return Object.values(GEOGRAPHY.units).flat();
  }

  // Find regions belonging to this scope
  const regions = (GEOGRAPHY.regions as any)[scope] as string[];
  if (!regions) return [];

  // Collect units for those regions
  let units: string[] = [];
  for (const region of regions) {
    if (region in GEOGRAPHY.units) {
      units = [...units, ...(GEOGRAPHY.units as any)[region]];
    }
  }
  return units;
}

// Helper to determine scope from a given unit, supporting slashed districts, normalized names, and 2026 Ladakh districts
export function getScopeForUnit(unit: string): Scope {
  if (!unit) return 'All';

  const normalize = (u: string) => {
    const trimmed = u.trim();
    if (trimmed === 'Jhelum Valley') return 'Hattian Bala';
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

// Helper to get available districts in entities for a given scope, splitting combined names
export function getAvailableDistrictsForScope(
  entities: { district: string }[],
  scope: Scope
): string[] {
  const districtNames = new Set<string>();

  if (scope === 'All') {
    entities.forEach((e) => {
      if (!e.district) return;
      e.district.split('/').forEach((d) => districtNames.add(d.trim()));
    });
  } else {
    // Collect all units for this scope
    const units = getUnitsForScope(scope);
    units.forEach((u) => districtNames.add(u));

    // Also scan entities to include any split segments matching this scope
    entities.forEach((e) => {
      if (!e.district) return;
      e.district
        .split('/')
        .map((d) => d.trim())
        .forEach((part) => {
          if (getScopeForUnit(part) === scope) {
            districtNames.add(part);
          }
        });
    });
  }

  return Array.from(districtNames).sort();
}
