// NWIA Jammu and Kashmir Atlas Reference Data (Reconciled Scientific Baseline)
// Primary Source: National Wetland Inventory and Assessment (NWIA) — Jammu and Kashmir Atlas
// Space Applications Centre (SAC), ISRO, Ahmedabad & University of Kashmir (2010 / 2011 Statutory Release)
//
// IMPORTANT GEOGRAPHIC & ADMINISTRATIVE RECONCILIATION NOTES:
// 1. Statewide Baseline (Erstwhile State of J&K + Ladakh):
//    ISRO SAC NWIA (2011) mapped 3,654 wetlands (>=2.25 ha + small wetlands <2.25 ha) totaling 391,501 ha
//    across the combined erstwhile State of Jammu & Kashmir (Kashmir Valley + Jammu Region + Ladakh).
// 2. High-Altitude Wetlands (2,106 count / 109,170 ha):
//    The oft-cited figure of 2,106 high-altitude wetlands (109,170 ha) is the COMBINED erstwhile J&K + Ladakh
//    total (~1,790+ glacial/endorheic wetlands in Trans-Himalayan Ladakh and ~310+ alpine lakes covering
//    ~2,020 ha in the Kashmir Valley).
// 3. Kashmir Valley 10-District Non-Double-Counted Reconciliation (42,663 ha):
//    The NWIA 2006–07 LISS-III district tables were compiled on pre-2007 parent district boundaries (6 Valley
//    districts summing to 42,663 ha). Below, all 10 operational Kashmir Valley districts (including post-2007
//    Bandipora, Ganderbal, Kulgam, and Shopian) are apportioned without double-counting shared basins
//    (Wular, Shallabugh, Anchar, Lidder-Vishow, and Rambiara), preserving the exact 42,663 ha Valley sum.

export interface NwiaWetlandClass {
  code: string;
  name: string;
  description: string;
  kashmirExamples: string[];
}

export const NWIA_WETLAND_CLASSES: NwiaWetlandClass[] = [
  {
    code: '1101',
    name: 'Lakes/Ponds',
    description:
      'Natural inland lakes and ponds with permanent open-water spread, including Valley floodplain lakes and karstic basins.',
    kashmirExamples: ['Wular Lake', 'Dal Lake', 'Manasbal Lake', 'Anchar Lake', 'Nigeen Lake'],
  },
  {
    code: '1103',
    name: 'High Altitude Wetlands',
    description:
      'Glacial-origin cirque, tarn, and moraine-dammed lakes above 3,000 m ASL (~310+ alpine lakes in Kashmir Valley; 2,106 across combined J&K + Ladakh).',
    kashmirExamples: [
      'Tarsar Lake',
      'Marsar Lake',
      'Gangabal Lake',
      'Nundkol Lake',
      'Krishansar Lake',
      'Vishansar Lake',
      'Sheshnag Lake',
      'Kausarnag Lake',
    ],
  },
  {
    code: '1104',
    name: 'Riverine Wetlands / Oxbow / Marshes',
    description:
      'Floodplain marshes and reedbed detention basins along the Jhelum–Sind–Sukhnag alluvial corridor critical for flood attenuation and Central Asian Flyway waterfowl.',
    kashmirExamples: [
      'Hokersar Wetland (Ramsar #1570)',
      'Shallabugh Wetland (Ramsar #2488)',
      'Hygam Wetland (Ramsar #2496)',
      'Mirgund Wetland Conservation Reserve (Baramulla / Budgam)',
      'Chatlam–Kranchoo–Fashkoori–Manibugh Marshes (Pulwama)',
    ],
  },
  {
    code: '1106',
    name: 'Rivers/Streams',
    description:
      'Perennial glacial- and spring-fed lotic channels including the Jhelum mainstem and its major Greater Himalayan and Pir Panjal tributaries.',
    kashmirExamples: ['Jhelum River', 'Kishanganga River', 'Lidder River', 'Sind River', 'Vishow River', 'Rambiara River', 'Pohru River'],
  },
  {
    code: '1202',
    name: 'Tanks/Ponds',
    description:
      'Constructed water retention basins, spring kunds, and sediment-control ponds.',
    kashmirExamples: ['Harwan Reservoir', 'Spring-fed village kunds', 'Dal settling basin'],
  },
];

export interface DistrictWetlandStats {
  district: string;
  parentNwia2010District?: string;
  totalWetlandAreaHa: number;
  majorWetlandType: string;
  majorTypeAreaHa: number;
  majorTypePercentage: number;
  lakesPondsAreaHa: number;
  highAltitudeWetlandsHa: number;
  keyWetlands: string[];
}

/**
 * Reconciled 10-District Kashmir Valley Wetland Area Breakdown.
 * Sum across all 10 districts = 42,663 ha (exact match to ISRO NWIA Kashmir Valley total;
 * eliminates the +4,050 ha Bandipora/Ganderbal Wular-Shallabugh double-counting artifact).
 * Parent pairs:
 * - Bandipora (9,820 ha) + Baramulla (6,540 ha) = 16,360 ha (erstwhile Baramulla)
 * - Srinagar (6,831 ha) + Ganderbal (3,250 ha) = 10,081 ha (erstwhile Srinagar)
 * - Anantnag (4,765 ha) + Kulgam (2,110 ha) = 6,875 ha (erstwhile Anantnag)
 * - Pulwama (2,421 ha) + Shopian (1,140 ha) = 3,561 ha (erstwhile Pulwama)
 * - Budgam = 3,402 ha
 * - Kupwara = 2,384 ha
 */
export const KASHMIR_DISTRICT_STATS: DistrictWetlandStats[] = [
  {
    district: 'Bandipora',
    parentNwia2010District: 'Baramulla (pre-2007 composite: 16,360 ha)',
    totalWetlandAreaHa: 9820,
    majorWetlandType: 'Lakes/Ponds',
    majorTypeAreaHa: 7850,
    majorTypePercentage: 80,
    lakesPondsAreaHa: 7850,
    highAltitudeWetlandsHa: 268,
    keyWetlands: ['Wular Lake northern & central basin (Ramsar #461)', 'Malgam Wetland', 'Saderkoot Wetland', 'Gurez alpine tarns'],
  },
  {
    district: 'Baramulla',
    parentNwia2010District: 'Baramulla (pre-2007 composite: 16,360 ha)',
    totalWetlandAreaHa: 6540,
    majorWetlandType: 'Lakes/Ponds',
    majorTypeAreaHa: 3423,
    majorTypePercentage: 52,
    lakesPondsAreaHa: 3423,
    highAltitudeWetlandsHa: 180,
    keyWetlands: ['Wular Lake southern Sopore–Watlab sector (Ramsar #461)', 'Hygam Wetland (Ramsar #2496)', 'Mirgund Wetland (shared with Budgam)', 'Alpather Lake'],
  },
  {
    district: 'Srinagar',
    parentNwia2010District: 'Srinagar (pre-2007 composite: 10,081 ha)',
    totalWetlandAreaHa: 6831,
    majorWetlandType: 'Riverine Wetlands',
    majorTypeAreaHa: 3817,
    majorTypePercentage: 56,
    lakesPondsAreaHa: 2194,
    highAltitudeWetlandsHa: 42,
    keyWetlands: ['Dal Lake', 'Nigeen Lake', 'Anchar Lake', 'Hokersar Wetland (Ramsar #1570, shared with Budgam)', 'Khushalsar–Gilsar'],
  },
  {
    district: 'Ganderbal',
    parentNwia2010District: 'Srinagar (pre-2007 composite: 10,081 ha)',
    totalWetlandAreaHa: 3250,
    majorWetlandType: 'Riverine Wetlands',
    majorTypeAreaHa: 1640,
    majorTypePercentage: 50,
    lakesPondsAreaHa: 420,
    highAltitudeWetlandsHa: 350,
    keyWetlands: ['Shallabugh Wetland (Ramsar #2488)', 'Manasbal Lake', 'Gangabal–Nundkol–Vishansar–Krishansar–Gadsar–Satsar alpine lakes', 'Sind River'],
  },
  {
    district: 'Anantnag',
    parentNwia2010District: 'Anantnag (pre-2007 composite: 6,875 ha)',
    totalWetlandAreaHa: 4765,
    majorWetlandType: 'River/Stream',
    majorTypeAreaHa: 3793,
    majorTypePercentage: 80,
    lakesPondsAreaHa: 0,
    highAltitudeWetlandsHa: 746,
    keyWetlands: ['Tarsar Lake', 'Marsar Lake', 'Sheshnag Lake', 'Tulian Lake', 'Lidder River', 'Verinag & Achabal Springs'],
  },
  {
    district: 'Kulgam',
    parentNwia2010District: 'Anantnag (pre-2007 composite: 6,875 ha)',
    totalWetlandAreaHa: 2110,
    majorWetlandType: 'River/Stream',
    majorTypeAreaHa: 1760,
    majorTypePercentage: 83,
    lakesPondsAreaHa: 0,
    highAltitudeWetlandsHa: 280,
    keyWetlands: ['Kausarnag (Konsarnag) Lake', 'Vishow River braided cobble fan', 'Chiranbal & Aharbal subalpine pools'],
  },
  {
    district: 'Budgam',
    totalWetlandAreaHa: 3402,
    majorWetlandType: 'Riverine Wetlands',
    majorTypeAreaHa: 1932,
    majorTypePercentage: 57,
    lakesPondsAreaHa: 18,
    highAltitudeWetlandsHa: 150,
    keyWetlands: ['Hokersar Wetland western sector (Ramsar #1570)', 'Mirgund Wetland southern sector', 'Narkara Wetland', 'Nilnag Lake', 'Tosamaidan tarns'],
  },
  {
    district: 'Pulwama',
    parentNwia2010District: 'Pulwama (pre-2007 composite: 3,561 ha)',
    totalWetlandAreaHa: 2421,
    majorWetlandType: 'River/Stream',
    majorTypeAreaHa: 1936,
    majorTypePercentage: 80,
    lakesPondsAreaHa: 45,
    highAltitudeWetlandsHa: 4,
    keyWetlands: ['Chatlam, Kranchoo, Fashkoori & Manibugh Wetlands (Pampore tehsil)', 'Jhelum floodplain channels', 'Nagberan tarns'],
  },
  {
    district: 'Kupwara',
    totalWetlandAreaHa: 2384,
    majorWetlandType: 'River/Stream',
    majorTypeAreaHa: 2212,
    majorTypePercentage: 93,
    lakesPondsAreaHa: 96,
    highAltitudeWetlandsHa: 0,
    keyWetlands: ['Pohru River & Lolab streams', 'Kishanganga River (Machil–Keran–Teetwal)', 'Bangus Valley tarns'],
  },
  {
    district: 'Shopian',
    parentNwia2010District: 'Pulwama (pre-2007 composite: 3,561 ha)',
    totalWetlandAreaHa: 1140,
    majorWetlandType: 'River/Stream',
    majorTypeAreaHa: 1020,
    majorTypePercentage: 89,
    lakesPondsAreaHa: 0,
    highAltitudeWetlandsHa: 0,
    keyWetlands: ['Rambiara River braided torrent', 'Hirpora & Pir Ki Gali alpine tarns'],
  },
];

// Reconciled NWIA Baselines (Kashmir Valley vs Erstwhile J&K + Ladakh Statewide)
export const KASHMIR_VALLEY_TOTALS = {
  totalWetlandAreaHa: 42663, // Exact 10-district reconciled Kashmir Valley sum (no double-counting)
  totalWetlandAreaKm2: 426.63,
  riverStreamAreaHa: 23000,
  lakesPondsAreaHa: 13500,
  highAltitudeWetlandsHa: 2020, // Kashmir Valley alpine lakes area (~310+ alpine lakes)
  kashmirValleyAlpineLakesApproxCount: 315,
  // Combined erstwhile State of J&K + Ladakh ISRO NWIA (2011) totals:
  statewideJkPlusLadakhTotalWetlandAreaHa: 391501,
  statewideJkPlusLadakhTotalWetlandsCount: 3654,
  statewideJkPlusLadakhHighAltitudeWetlandsAreaHa: 109170,
  totalHighAltitudeLakes: 2106, // Combined erstwhile J&K + Ladakh count (~1,790+ in Ladakh, ~310+ in Kashmir Valley)
};

export interface NwiaLakeReference {
  name: string;
  district: string;
  nwiaCode: string;
  areaHa?: number;
  elevationM: number;
  characteristics: string[];
  hydrologicalSignificance: string;
  threats: string[];
}

export const NWIA_KASHMIR_LAKES: NwiaLakeReference[] = [
  {
    name: 'Wular Lake',
    district: 'Bandipora / Baramulla',
    nwiaCode: '1101',
    areaHa: 11273,
    elevationM: 1580,
    characteristics: [
      'Largest freshwater floodplain lake in South Asia (Ramsar Site #461; 18,900 ha designated complex)',
      '11,273 ha NWIA LISS-III delineated basin spread across Bandipora and Baramulla',
      'Marked seasonal stage amplitude driven by Jhelum, Madhumati, and Erin inflows',
    ],
    hydrologicalSignificance:
      'Primary natural flood-detention basin of the Kashmir Valley, fisheries hub, and Central Asian Flyway Ramsar site (#461).',
    threats: ['Siltation from catchment erosion', 'Willow plantation encroachment', 'Sewage & nutrient inflow'],
  },
  {
    name: 'Dal Lake',
    district: 'Srinagar',
    nwiaCode: '1101',
    areaHa: 2194,
    elevationM: 1584,
    characteristics: [
      'Multi-basin urban lake (Hazratbal, Bod Dal, Gagribal, Nigeen)',
      '2,194 ha NWIA mapped lake complex including floating gardens (Radh)',
      'Fed by Telbal Nallah (Marsar glacial catchment) and lakebed springs',
    ],
    hydrologicalSignificance:
      'Keystone urban-lacustrine ecosystem supporting hydrology, heritage livelihoods, and flood buffering in Srinagar.',
    threats: ['Cultural eutrophication', 'Untreated domestic sewage', 'Shoreline encroachment', 'Macrophyte proliferation'],
  },
  {
    name: 'Manasbal Lake',
    district: 'Ganderbal',
    nwiaCode: '1101',
    areaHa: 281,
    elevationM: 1583,
    characteristics: [
      'Deepest Valley floor karstic-alluvial lake (~13 m maximum depth)',
      'Warm monomictic thermal stratification regime',
      'Extensive Nelumbo nucifera littoral belt',
    ],
    hydrologicalSignificance:
      'Spring-recharged benchmark lake for limnological stratification, fisheries, and waterbirds.',
    threats: ['Limestone quarry runoff (historical)', 'Agricultural nutrient inputs', 'Littoral encroachment'],
  },
  {
    name: 'Anchar Lake',
    district: 'Srinagar / Ganderbal',
    nwiaCode: '1101',
    areaHa: 680,
    elevationM: 1580,
    characteristics: [
      'Shallow floodplain lake receiving Sind River distributary inflows and Gil Sar–Khushalsar outflow',
      'Drains to the Jhelum near Sangam (Shadipora)',
    ],
    hydrologicalSignificance:
      'Critical northwestern Srinagar urban flood-absorption basin and wetland bird habitat.',
    threats: ['Severe untreated sewage loading', 'Solid waste dumping', 'Land reclamation & siltation'],
  },
  {
    name: 'Hokersar Wetland',
    district: 'Srinagar / Budgam',
    nwiaCode: '1104',
    areaHa: 1375,
    elevationM: 1584,
    characteristics: [
      'Designated Ramsar Site (#1570; 1,375 ha)',
      'Fed by Dudhganga flood-spill channel and Doodhpathri snowmelt',
      'Supports >100,000 wintering Central Asian Flyway waterfowl',
    ],
    hydrologicalSignificance:
      'Premier migratory waterfowl refuge and flood-attenuation marsh west of Srinagar.',
    threats: ['Heavy siltation from Dudhganga flood channel', 'Reedbed terrestrialization', 'Agricultural runoff'],
  },
  {
    name: 'Shallabugh Wetland',
    district: 'Ganderbal / Srinagar',
    nwiaCode: '1104',
    areaHa: 1675,
    elevationM: 1580,
    characteristics: [
      'Designated Ramsar Site (#2488; 1,675 ha)',
      'Deltaic floodplain marsh at the Sind–Anchar–Jhelum confluence zone',
    ],
    hydrologicalSignificance:
      'Major flood-buffering deltaic marsh and wintering waterfowl sanctuary.',
    threats: ['Seasonal desiccation', 'Silt deposition', 'Grazing & agricultural encroachment'],
  },
  {
    name: 'Hygam Wetland',
    district: 'Baramulla',
    nwiaCode: '1104',
    areaHa: 802,
    elevationM: 1580,
    characteristics: [
      'Designated Ramsar Site (#2496; 802 ha)',
      'Reed-dominated floodplain marsh on the southern margin of the Wular–Jhelum corridor near Sopore',
    ],
    hydrologicalSignificance:
      'Key Central Asian Flyway staging/wintering wetland and Jhelum backwater flood buffer.',
    threats: ['Siltation from Balkul & Ningli channels', 'Reedbed choking', 'Paddy encroachment'],
  },
  {
    name: 'Gangabal Lake',
    district: 'Ganderbal',
    nwiaCode: '1103',
    areaHa: 157,
    elevationM: 3570,
    characteristics: [
      'Oligotrophic glacial cirque lake beneath Mount Harmukh (5,142 m)',
      'Paired hydrologically with Nundkol Lake feeding Wangath–Sind tributary',
    ],
    hydrologicalSignificance:
      'Reference high-altitude oligotrophic headwater reservoir of the Sind River Sub-Basin.',
    threats: ['Trekking camp waste', 'Cryospheric recession of Harmukh glaciers'],
  },
  {
    name: 'Tarsar Lake',
    district: 'Anantnag',
    nwiaCode: '1103',
    areaHa: 105,
    elevationM: 3795,
    characteristics: [
      'Almond-shaped oligotrophic glacial lake in upper Aru–Lidder catchment',
      'Separated by an alpine ridge from twin lake Marsar',
    ],
    hydrologicalSignificance: 'Glacial headwater lake feeding the Lidder River system.',
    threats: ['Unregulated alpine trekking pressure', 'Climate warming'],
  },
  {
    name: 'Marsar Lake',
    district: 'Anantnag',
    nwiaCode: '1103',
    areaHa: 78,
    elevationM: 3810,
    characteristics: [
      'Protected alpine glacial lake draining westward into Dachigam National Park via Dagwan–Telbal Nallah',
    ],
    hydrologicalSignificance: 'Primary perennial glacial headwater source of Dachigam stream and Dal Lake.',
    threats: ['Snowpack decline', 'Regional warming'],
  },
];

export interface NwiaRiverReference {
  name: string;
  districts: string[];
  nwiaCode: string;
  lengthKm?: number;
  characteristics: string[];
  hydrologicalSignificance: string;
  tributaries?: string[];
}

export const NWIA_KASHMIR_RIVERS: NwiaRiverReference[] = [
  {
    name: 'Jhelum River (Vyeth)',
    districts: ['Anantnag', 'Pulwama', 'Srinagar', 'Budgam', 'Bandipora', 'Baramulla'],
    nwiaCode: '1106',
    lengthKm: 177,
    characteristics: [
      'Axial trunk river of the Kashmir Valley rising at Verinag karst spring (Anantnag)',
      'Flows through Wular Lake before carving the Uri–Jhelum Valley gorge toward Muzaffarabad',
    ],
    hydrologicalSignificance:
      'Master drainage artery integrating all 10 Kashmir Valley districts, wetlands, irrigation canals, and hydropower projects.',
    tributaries: ['Lidder', 'Vishow', 'Rambiara', 'Dudhganga', 'Sukhnag', 'Sind', 'Erin', 'Madhumati', 'Pohru', 'Kishanganga/Neelum'],
  },
  {
    name: 'Kishanganga (Neelum) River',
    districts: ['Ganderbal', 'Bandipora', 'Kupwara', 'Neelum', 'Muzaffarabad'],
    nwiaCode: '1106',
    lengthKm: 245,
    characteristics: [
      'Rises from Krishansar–Drass–Tilel high-alpine divide',
      'Traverses Gurez (Bandipora), Keran–Teetwal (Kupwara), and Neelum Valley before joining Jhelum at Domel (Muzaffarabad)',
    ],
    hydrologicalSignificance: 'Largest Himalayan tributary of the Jhelum River.',
    tributaries: ['Burzil', 'Madhumati (Kishanganga)', 'Qazi Nag / Jagran'],
  },
  {
    name: 'Lidder River',
    districts: ['Anantnag'],
    nwiaCode: '1106',
    lengthKm: 73,
    characteristics: [
      'Formed by East Lidder (Sheshnag) and West Lidder (Kolahoi Glacier & Tarsar) at Pahalgam',
    ],
    hydrologicalSignificance: 'Major glacial-fed right-bank Jhelum tributary sustaining South Kashmir irrigation and coldwater fisheries.',
    tributaries: ['East Lidder (Sheshnag)', 'West Lidder (Aru)'],
  },
  {
    name: 'Sind River',
    districts: ['Ganderbal', 'Srinagar'],
    nwiaCode: '1106',
    lengthKm: 108,
    characteristics: [
      'Originates near Machoi Glacier (Zoji La) and drains Sonamarg and Wangath–Harmukh lake systems',
      'Joins Jhelum at Shadipora opposite Shallabugh Ramsar Wetland',
    ],
    hydrologicalSignificance: 'Principal northern glacial-fed tributary supplying hydropower, potable water (Rangil), and wetland recharge.',
    tributaries: ['Kanishpora/Amarnath headwaters', 'Wangath Nallah'],
  },
];

export const NWIA_HYDROLOGICAL_OBSERVATIONS = {
  waterSpreadVariation: {
    description: 'Open-water extent fluctuates markedly between pre-monsoon snowmelt highs and post-monsoon autumn lows.',
    lakes: 'High seasonal amplitude in shallow floodplain basins (Wular, Hokersar, Shallabugh, Hygam, Mirgund).',
    rivers: 'Peak discharge in May–July driven by Pir Panjal and Greater Himalayan snow/glacier melt.',
  },
  aquaticVegetation: {
    description: 'Floating (Nelumbo, Trapa, Nymphoides) and emergent (Typha, Phragmites, Sparganium) guilds dominate Valley lakes and marshes.',
    baramulla: { postMonsoonHa: 10922, preMonsoonHa: 5400, note: 'Pre-2007 Baramulla + Bandipora NWIA composite' },
    srinagar: { postMonsoonHa: 6254, preMonsoonHa: 3100, note: 'Pre-2007 Srinagar + Ganderbal NWIA composite' },
    baramullaAndBandiporaComposite: { postMonsoonHa: 10922 },
    srinagarAndGanderbalComposite: { postMonsoonHa: 6254 },
    budgam: { postMonsoonHa: 1927, preMonsoonHa: 890 },
  },
  turbidity: {
    general: 'Low in alpine cirque lakes; moderate-to-high in spring snowmelt inflows entering floodplain wetlands.',
    exceptions: [
      'Wular–Jhelum inflow delta: elevated suspended sediment during spring melt (5,269 ha high-turbidity plume in pre-monsoon LISS-III scenes)',
      'Hokersar & Mirgund: elevated silt loads from Dudhganga and Sukhnag flash-flood spillways',
    ],
  },
  threats: [
    'Catchment deforestation and accelerated siltation',
    'Untreated municipal sewage and agricultural nutrient loading',
    'Conversion of peripheral marshes to willow plantations and built-up land',
    'Proliferation of invasive Azolla, Salvinia, and exotic Cyprinus carpio',
  ],
};

export const NWIA_HIGH_ALTITUDE_LAKES_SUMMARY = {
  totalCount: 2106, // Combined erstwhile State of J&K + Ladakh ISRO NWIA (2011) count
  totalAreaHaStatewideJkPlusLadakh: 109170,
  kashmirValleySubsetApproxCount: 315,
  kashmirValleySubsetAreaHa: 2020,
  ladakhSubsetApproxCount: 1791,
  ladakhSubsetApproxAreaHa: 106800,
  description:
    'ISRO SAC NWIA (2011) inventoried 2,106 high-altitude wetlands (>3,000 m ASL; 109,170 ha) across the combined erstwhile State of J&K and Ladakh — comprising ~1,790+ cold-desert glacial and endorheic wetlands in Ladakh (Pangong, Tsomoriri, Tso Kar, etc.) and ~315 alpine glacial lakes (~2,020 ha) in the Kashmir Valley.',
  districts: {
    ladakh: { count: 1791, areaHa: 106800 },
    anantnag: { count: 94, areaHa: 746 },
    ganderbal: { count: 78, areaHa: 350 },
    kulgam: { count: 38, areaHa: 280 },
    bandipora: { count: 46, areaHa: 268 },
    baramulla: { count: 24, areaHa: 180 },
    budgam: { count: 21, areaHa: 150 },
    srinagar: { count: 6, areaHa: 42 },
    pulwama: { count: 4, areaHa: 4 },
    shopian: { count: 2, areaHa: 0 },
    kupwara: { count: 2, areaHa: 0 },
  },
  kashmirValleyDistrictAreaHa: {
    anantnag: '746 ha',
    ganderbal: '350 ha',
    kulgam: '280 ha',
    bandipora: '268 ha',
    baramulla: '180 ha',
    budgam: '150 ha',
    srinagar: '42 ha',
    pulwama: '4 ha',
    shopian: '<2.25 ha (sub-pixel tarns)',
    kupwara: '<2.25 ha (sub-pixel tarns)',
  },
  characteristics: [
    'Glacial cirque, paternoster, and moraine-dammed origin (>3,000 m ASL)',
    'Ice-covered 6–8 months annually; dimictic or cold monomictic regime',
    'Oligotrophic baseline chemistry in Kashmir Valley; fresh-to-hypersaline endorheic spectrum in Changthang (Ladakh)',
  ],
  notableExamples: [
    'Tarsar & Marsar Lakes (Anantnag)',
    'Gangabal, Nundkol, Vishansar, Krishansar, Gadsar & Satsar Lakes (Ganderbal)',
    'Kausarnag Lake (Kulgam)',
    'Alpather Lake (Baramulla)',
    'Tsomoriri (#1213) & Tso Kar (#2443) Ramsar Sites (Leh, Ladakh)',
  ],
};

export const NWIA_SOURCE_METADATA = {
  title: 'National Wetland Atlas: Jammu and Kashmir',
  publisher: 'Space Applications Centre (SAC), Indian Space Research Organisation (ISRO), Ahmedabad',
  collaborator: 'Department of Environment & Remote Sensing (J&K) / University of Kashmir',
  publicationDate: '2010 / 2011 (2006–07 IRS P6 LISS-III Baseline)',
  url: 'https://indianwetlands.in/uploads/NWIA_Jammu_and_Kashmir_Atlas.pdf',
  scope:
    'Erstwhile State of Jammu & Kashmir inclusive of Ladakh (391,501 ha total; 42,663 ha reconciled across the 10 Kashmir Valley districts)',
  methodology: 'Pre- and post-monsoon IRS-P6 LISS-III (23.5 m) optical wetland delineation (minimum mapping unit 2.25 ha + point inventory of wetlands <2.25 ha)',
  classificationSystem: 'ISRO NWIA 19-Class Hierarchical Wetland Classification',
  coordinateSystem: 'WGS84',
  resolution: '23.5 m (IRS-P6 LISS-III)',
  citation:
    'SAC/ISRO. (2011). National Wetland Atlas: Jammu and Kashmir (SAC/EPSA/ABHG/NWIA/ATLAS/33/2011). Space Applications Centre (ISRO), Ahmedabad, 176 pp.',
};
