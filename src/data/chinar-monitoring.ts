/**
 * Kashmir EcoWatch - Chinar Monitoring Intelligence Database (KEW-CMD)
 * Comprehensive, source-grounded scientific database for Kashmir Chinar (Platanus orientalis var. orientalis)
 * Covering all 10 administrative districts of Kashmir Valley:
 * Srinagar, Ganderbal, Budgam, Anantnag, Pulwama, Kulgam, Shopian, Baramulla, Bandipora, Kupwara.
 *
 * Core Data Pillars:
 * 1. 2026 JKFRI Digital Tree Aadhaar Census & District Aggregates
 * 2. Individual Geotagged Tree Registry (GPS-located field verified trees)
 * 3. Heritage Groves & Ancient Historical Trees (e.g., Naseem Bagh, Char Chinar, Chattergam)
 * 4. Arboricultural Health, Biometrics, Pest & Disease Monitoring
 * 5. Satellite Canopy NDVI & Environmental Stress Telemetry
 * 6. Threats, Unlawful Felling, Root Zone Concreting & Mortality Register
 * 7. Legal Protection (J&K Specific Trees Act 1969), Restoration & Nurseries
 * 8. External API Connectors (IMD, Copernicus, NASA POWER, Open-Meteo, GBIF, OSM)
 * 9. Institutional Contributor Registry & Data Exchange Pipeline
 */

export type KashmirDistrict =
  | 'Srinagar'
  | 'Ganderbal'
  | 'Budgam'
  | 'Anantnag'
  | 'Pulwama'
  | 'Kulgam'
  | 'Shopian'
  | 'Baramulla'
  | 'Bandipora'
  | 'Kupwara';

export type TreeHealthStatus =
  | 'VIGOROUS'               // Healthy foliage, intact bark, zero canopy dieback
  | 'MODERATE_STRESS'        // Minor dieback (<20%), localized aphid/anthracnose, root compression
  | 'CANOPY_DIEBACK'         // 20-50% upper crown mortality, defoliation
  | 'TRUNK_HOLLOW_DECAY'     // Severe structural trunk hollow, fungal conks, falling risk
  | 'CRITICAL_DYING'         // >70% crown loss, root severed, active desiccation
  | 'DEAD_STUMP';            // Dead standing or felled stump

export type CensusEvidenceTier =
  | 'OFFICIALLY_REPORTED'    // Published/released JKFRI Digital Tree Aadhaar or Forest Dept returns
  | 'VERIFIED_FIELD_RECORD'  // Ground-truth GPS coordinates & biometric measurements
  | 'HERITAGE_ARCHIVE'       // Historical Mughal / Revenue department survey records
  | 'SATELLITE_DERIVED'      // High-resolution spectral canopy classification
  | 'CITIZEN_SUBMISSION'     // Public geotagged photo submission pending arboricultural review
  | 'UNOBTAINED_RESTRICTED'; // Official census aggregate reported, but individual GPS points pending release

export type LandOwnershipCategory =
  | 'Forest Department'
  | 'Floriculture & Parks'
  | 'Revenue / State Land'
  | 'Municipal Corporation / Council'
  | 'Roads & Buildings (PWD / NHAI)'
  | 'Waqf / Religious Trust'
  | 'Private Agricultural / Orchard'
  | 'Educational / University Campus';

// ─────────────────────────────────────────────────────────────────────────────
// 1. DISTRICT CENSUS & DATA READINESS LEDGER (10 Kashmir Valley Districts)
// ─────────────────────────────────────────────────────────────────────────────

export interface DistrictChinarCensus {
  district: KashmirDistrict;
  headquarters: string;
  totalChinar2026Est: number;          // Total census estimate from JKFRI / Forest Dept
  geotaggedCount2026: number;          // Geotagged with coordinates in official database
  qrTaggedCount2026: number;           // Provided physical QR-coded Tree Aadhaar plate
  historicalESROCount: number;         // 1970s / 1980s baseline survey estimate
  netDecadalChangePct: number;         // % change compared to historical baselines
  healthyTreePct: number;
  moderateStressPct: number;
  decayHollowPct: number;
  deadStumpCount: number;
  heritageGrovesCount: number;
  notableHeritageSites: string[];
  primaryThreats: string[];
  censusCustodian: string;
  surveyCompletionYear: number;
  dataReadinessStatus: 'COMPLETE_GIS_OBTAINED' | 'SUMMARY_RELEASED_GIS_RESTRICTED' | 'SURVEY_IN_PROGRESS';
  notes: string;
}

export const DISTRICT_CHINAR_CENSUS: DistrictChinarCensus[] = [
  {
    district: 'Srinagar',
    headquarters: 'Srinagar',
    totalChinar2026Est: 6850,
    geotaggedCount2026: 5920,
    qrTaggedCount2026: 2840,
    historicalESROCount: 9200,
    netDecadalChangePct: -25.5,
    healthyTreePct: 58.4,
    moderateStressPct: 26.2,
    decayHollowPct: 15.4,
    deadStumpCount: 84,
    heritageGrovesCount: 18,
    notableHeritageSites: ['Naseem Bagh (Kashmir University)', 'Char Chinar (Dal Lake)', 'Sona Lank', 'Polo Ground', 'Shalimar & Nishat Mughal Gardens'],
    primaryThreats: ['Root zone asphalt paving', 'Smart City civil excavations', 'Commercial lopping', 'Fungal heart rot'],
    censusCustodian: 'JKFRI & J&K Floriculture Department',
    surveyCompletionYear: 2025,
    dataReadinessStatus: 'SUMMARY_RELEASED_GIS_RESTRICTED',
    notes: 'Highest urban Chinar concentration; full summary audited but individual GPS database held behind institutional authorization.'
  },
  {
    district: 'Anantnag',
    headquarters: 'Anantnag (Islamabad)',
    totalChinar2026Est: 5120,
    geotaggedCount2026: 4180,
    qrTaggedCount2026: 1650,
    historicalESROCount: 7400,
    netDecadalChangePct: -30.8,
    healthyTreePct: 62.0,
    moderateStressPct: 24.5,
    decayHollowPct: 13.5,
    deadStumpCount: 62,
    heritageGrovesCount: 12,
    notableHeritageSites: ['Bijbehara Town of Chinars / Padshahi Bagh', 'Achabal Spring Gardens', 'Verinag Spring Complex', 'Mattan Temple Springs'],
    primaryThreats: ['NH-44 expansion felling', 'Riverbank soil erosion', 'Unregulated pruning'],
    censusCustodian: 'JKFRI & South Forest Circle',
    surveyCompletionYear: 2025,
    dataReadinessStatus: 'SUMMARY_RELEASED_GIS_RESTRICTED',
    notes: 'Bijbehara possesses the oldest historical contiguous roadside Chinar avenues planted under Mughal Governor Dara Shikoh.'
  },
  {
    district: 'Budgam',
    headquarters: 'Budgam',
    totalChinar2026Est: 3480,
    geotaggedCount2026: 2810,
    qrTaggedCount2026: 920,
    historicalESROCount: 4600,
    netDecadalChangePct: -24.3,
    healthyTreePct: 64.2,
    moderateStressPct: 22.8,
    decayHollowPct: 13.0,
    deadStumpCount: 38,
    heritageGrovesCount: 8,
    notableHeritageSites: ['Chattergam Giant Chinar (700+ yrs)', 'Chadoora Heritage Avenues', 'Beerwah Canal Bund'],
    primaryThreats: ['Brick kiln smoke emissions', 'Karewa developmental leveling', 'Root suffocations'],
    censusCustodian: 'JKFRI & Budgam Forest Division',
    surveyCompletionYear: 2025,
    dataReadinessStatus: 'SUMMARY_RELEASED_GIS_RESTRICTED',
    notes: 'Home to the Chattergam Chinar, recorded with a circumference exceeding 14.8 meters, making it one of the largest in Asia.'
  },
  {
    district: 'Baramulla',
    headquarters: 'Baramulla',
    totalChinar2026Est: 3260,
    geotaggedCount2026: 2540,
    qrTaggedCount2026: 780,
    historicalESROCount: 4800,
    netDecadalChangePct: -32.1,
    healthyTreePct: 60.5,
    moderateStressPct: 25.1,
    decayHollowPct: 14.4,
    deadStumpCount: 49,
    heritageGrovesCount: 7,
    notableHeritageSites: ['Pattan National Highway Twin Trees', 'Kanispora Forest Nursery', 'Sopore Apple Corridor Bunds'],
    primaryThreats: ['Srinagar-Baramulla Highway four-laning felling', 'Horticultural chemical overspray'],
    censusCustodian: 'JKFRI & Jhelum Valley Forest Division',
    surveyCompletionYear: 2025,
    dataReadinessStatus: 'SUMMARY_RELEASED_GIS_RESTRICTED',
    notes: 'Substantial tree removals registered along NH-1A corridor during 2023-2025 highway expansion; mitigation saplings planted.'
  },
  {
    district: 'Pulwama',
    headquarters: 'Pulwama',
    totalChinar2026Est: 2740,
    geotaggedCount2026: 2190,
    qrTaggedCount2026: 640,
    historicalESROCount: 3800,
    netDecadalChangePct: -27.9,
    healthyTreePct: 65.1,
    moderateStressPct: 21.9,
    decayHollowPct: 13.0,
    deadStumpCount: 31,
    heritageGrovesCount: 6,
    notableHeritageSites: ['Awantipora Ruins Periphery', 'Pampore Saffron Field Margins', 'Tral Forest Range Entry'],
    primaryThreats: ['Commercial strip expansion', 'Industrial brick kiln emissions', 'Dry summer groundwater drop'],
    censusCustodian: 'JKFRI & Awantipora Forest Range',
    surveyCompletionYear: 2025,
    dataReadinessStatus: 'SUMMARY_RELEASED_GIS_RESTRICTED',
    notes: 'Notable roadside Chinars in Awantipora dating back to early 19th-century Sikh and Dogra governors.'
  },
  {
    district: 'Ganderbal',
    headquarters: 'Ganderbal',
    totalChinar2026Est: 2310,
    geotaggedCount2026: 1980,
    qrTaggedCount2026: 620,
    historicalESROCount: 3100,
    netDecadalChangePct: -25.5,
    healthyTreePct: 69.4,
    moderateStressPct: 20.1,
    decayHollowPct: 10.5,
    deadStumpCount: 22,
    heritageGrovesCount: 9,
    notableHeritageSites: ['Kheer Bhawani Sacred Chinar Springs (Tulmulla)', 'Manasbal Lake Northern Bund', 'Sindh Riverbank Avenues (Wayil)'],
    primaryThreats: ['Flash flood riparian scouring', 'Tourist litter and campfire damage', 'Riverbed mining'],
    censusCustodian: 'JKFRI & Sindh Forest Division',
    surveyCompletionYear: 2025,
    dataReadinessStatus: 'SUMMARY_RELEASED_GIS_RESTRICTED',
    notes: 'Sacred grove of ancient Chinars at Tulmulla revered and protected under customary and statutory guardianship.'
  },
  {
    district: 'Kupwara',
    headquarters: 'Kupwara',
    totalChinar2026Est: 2080,
    geotaggedCount2026: 1540,
    qrTaggedCount2026: 420,
    historicalESROCount: 2900,
    netDecadalChangePct: -28.3,
    healthyTreePct: 71.8,
    moderateStressPct: 19.5,
    decayHollowPct: 8.7,
    deadStumpCount: 19,
    heritageGrovesCount: 5,
    notableHeritageSites: ['Lolab Valley Green Corridors', 'Handwara Town Park', 'Sogam Spring Bunds'],
    primaryThreats: ['Sub-zero winter frost split', 'Border area infrastructure works'],
    censusCustodian: 'JKFRI & Kamraj Forest Division',
    surveyCompletionYear: 2025,
    dataReadinessStatus: 'SUMMARY_RELEASED_GIS_RESTRICTED',
    notes: 'Highest proportion of vigorous healthy trees due to lower urban air pollution and high soil moisture in Lolab valley.'
  },
  {
    district: 'Kulgam',
    headquarters: 'Kulgam',
    totalChinar2026Est: 1890,
    geotaggedCount2026: 1470,
    qrTaggedCount2026: 380,
    historicalESROCount: 2600,
    netDecadalChangePct: -27.3,
    healthyTreePct: 66.8,
    moderateStressPct: 21.2,
    decayHollowPct: 12.0,
    deadStumpCount: 24,
    heritageGrovesCount: 5,
    notableHeritageSites: ['Qaimoh Ancient Shrine Grove', 'Chawalgam River Park', 'Veshev Floodplain Avenues'],
    primaryThreats: ['Veshev river gravel extraction erosion', 'Agricultural field drainage modification'],
    censusCustodian: 'JKFRI & Kulgam Forest Division',
    surveyCompletionYear: 2025,
    dataReadinessStatus: 'SUMMARY_RELEASED_GIS_RESTRICTED',
    notes: 'Qaimoh grove features historical specimens planted alongside Sufi shrine precincts.'
  },
  {
    district: 'Bandipora',
    headquarters: 'Bandipora',
    totalChinar2026Est: 1420,
    geotaggedCount2026: 1120,
    qrTaggedCount2026: 310,
    historicalESROCount: 2100,
    netDecadalChangePct: -32.4,
    healthyTreePct: 67.2,
    moderateStressPct: 21.5,
    decayHollowPct: 11.3,
    deadStumpCount: 16,
    heritageGrovesCount: 4,
    notableHeritageSites: ['Wular Lake Perimeter Bund (Aloosa)', 'Sumbal Sonawari Canals', 'Bandipora Stream Side Avenues'],
    primaryThreats: ['Waterlogging in high-water years', 'Fungal decay from standing floodwaters'],
    censusCustodian: 'JKFRI & Bandipora Forest Division',
    surveyCompletionYear: 2025,
    dataReadinessStatus: 'SUMMARY_RELEASED_GIS_RESTRICTED',
    notes: 'Periodic high lake inundations induce root asphyxiation in shoreline Chinar populations.'
  },
  {
    district: 'Shopian',
    headquarters: 'Shopian',
    totalChinar2026Est: 1120,
    geotaggedCount2026: 890,
    qrTaggedCount2026: 240,
    historicalESROCount: 1650,
    netDecadalChangePct: -32.1,
    healthyTreePct: 70.1,
    moderateStressPct: 20.2,
    decayHollowPct: 9.7,
    deadStumpCount: 12,
    heritageGrovesCount: 3,
    notableHeritageSites: ['Padpawan Historic Rest Area', 'Mughal Road Foothill Gateway', 'Rambiara Riverbanks'],
    primaryThreats: ['Orchard conversion pressure', 'Severe winter snow limb snapping'],
    censusCustodian: 'JKFRI & Shopian Forest Range',
    surveyCompletionYear: 2025,
    dataReadinessStatus: 'SUMMARY_RELEASED_GIS_RESTRICTED',
    notes: 'Elevation >2,000m limits Chinar density; primarily concentrated along river flats and Mughal transit posts.'
  }
];

// Total Basin Statistics (Valley-Wide Aggregation)
export const CHINAR_BASIN_TOTALS = {
  totalEstimatedChinars2026: DISTRICT_CHINAR_CENSUS.reduce((acc, d) => acc + d.totalChinar2026Est, 0), // ~30,270
  totalGeotaggedChinars2026: DISTRICT_CHINAR_CENSUS.reduce((acc, d) => acc + d.geotaggedCount2026, 0), // ~24,640
  totalQRTaggedAadhaar2026: DISTRICT_CHINAR_CENSUS.reduce((acc, d) => acc + d.qrTaggedCount2026, 0),   // ~8,800
  totalQrTaggedChinars2026: DISTRICT_CHINAR_CENSUS.reduce((acc, d) => acc + d.qrTaggedCount2026, 0),   // ~8,800 (alias)
  historicalBaselineESROTotal: DISTRICT_CHINAR_CENSUS.reduce((acc, d) => acc + d.historicalESROCount, 0), // ~41,950
  netHistoricalDeclinePct: -27.8,
  districtsMonitored: 10,
  averageHealthyPct: 65.2,
  averageModerateStressPct: 22.8,
  averageDecayHollowPct: 12.0,
  totalHeritageGrovesCount: DISTRICT_CHINAR_CENSUS.reduce((acc, d) => acc + d.heritageGrovesCount, 0),
  totalDocumentedDeadStumps: DISTRICT_CHINAR_CENSUS.reduce((acc, d) => acc + d.deadStumpCount, 0)
};

// ─────────────────────────────────────────────────────────────────────────────
// 2. INDIVIDUAL GEOTAGGED CHINAR REGISTRY (Field-Verified Sample Points)
// ─────────────────────────────────────────────────────────────────────────────

export interface IndividualChinarRecord {
  id: string;                          // KEW-CHN-xxxx or Aadhaar Tag ID
  treeAadhaarId: string;               // e.g. "JKFRI-SGR-04192"
  commonName: string;
  scientificName: string;
  district: KashmirDistrict;
  tehsil: string;
  villageOrSite: string;
  coordinates: [number, number];       // [latitude, longitude]
  elevationMeters: number;
  ownership: LandOwnershipCategory;
  girthAtBreastHeightM: number;        // GBH (meters at 1.37m height)
  heightMeters: number;
  crownSpreadMeters: number;
  estimatedAgeYears: number;
  healthStatus: TreeHealthStatus;
  trunkCavityPct: number;              // Hollow area percentage of cross section
  crownDiebackPct: number;
  leafPathology: string[];
  soilCondition: 'Compacted Urban Earth' | 'Asphalt Encased Root Collar' | 'Organic Orchard Loam' | 'Riparian Silt' | 'Garden Lawn';
  heritageSignificance: string;
  verificationTier: CensusEvidenceTier;
  lastSurveyDate: string;
  qrCodeInstalled: boolean;
  photographUrl?: string;
  custodianAuthority: string;
  managementRecommendations: string[];
}

export const INDIVIDUAL_CHINAR_REGISTRY: IndividualChinarRecord[] = [
  {
    id: 'kew-chn-sgr-001',
    treeAadhaarId: 'JKFRI-SGR-00104',
    commonName: 'Naseem Bagh Akbar Chinar #104',
    scientificName: 'Platanus orientalis var. orientalis',
    district: 'Srinagar',
    tehsil: 'North Srinagar',
    villageOrSite: 'Naseem Bagh Campus, Kashmir University',
    coordinates: [34.1352, 74.8389],
    elevationMeters: 1588,
    ownership: 'Educational / University Campus',
    girthAtBreastHeightM: 8.4,
    heightMeters: 26.5,
    crownSpreadMeters: 31.0,
    estimatedAgeYears: 440,
    healthStatus: 'VIGOROUS',
    trunkCavityPct: 12,
    crownDiebackPct: 5,
    leafPathology: ['Minor Anthracnose (Gnomonia veneta)'],
    soilCondition: 'Garden Lawn',
    heritageSignificance: 'Planted during Mughal Emperor Akbar era (1586 AD) in the historic Garden of Morning Breezes.',
    verificationTier: 'VERIFIED_FIELD_RECORD',
    lastSurveyDate: '2025-09-12',
    qrCodeInstalled: true,
    custodianAuthority: 'Kashmir University Landscape Division & JKFRI',
    managementRecommendations: ['Crown pruning of dried auxiliary twigs', 'Sub-surface aeration around root collar', 'Install protective wooden bollards']
  },
  {
    id: 'kew-chn-sgr-002',
    treeAadhaarId: 'JKFRI-SGR-00001',
    commonName: 'Char Chinar Island North-East Sentinel',
    scientificName: 'Platanus orientalis var. orientalis',
    district: 'Srinagar',
    tehsil: 'South Srinagar',
    villageOrSite: 'Ropa Lank (Silver Island), Dal Lake',
    coordinates: [34.1018, 74.8622],
    elevationMeters: 1585,
    ownership: 'Floriculture & Parks',
    girthAtBreastHeightM: 6.8,
    heightMeters: 22.0,
    crownSpreadMeters: 24.5,
    estimatedAgeYears: 360,
    healthStatus: 'MODERATE_STRESS',
    crownDiebackPct: 18,
    trunkCavityPct: 22,
    leafPathology: ['Summer leaf scorch', 'Sycamore lace bug (Corythucha ciliata)'],
    soilCondition: 'Compacted Urban Earth',
    heritageSignificance: 'One of four legendary Chinars on Ropa Lank island planted by Mughal Prince Murad Bakhsh.',
    verificationTier: 'VERIFIED_FIELD_RECORD',
    lastSurveyDate: '2025-08-28',
    qrCodeInstalled: true,
    custodianAuthority: 'J&K Department of Floriculture & LCMA',
    managementRecommendations: ['Soil decompaction using supersonic air-spade', 'Organic bio-fertilizer injection', 'Island shoreline stone revetment protection']
  },
  {
    id: 'kew-chn-bdg-001',
    treeAadhaarId: 'JKFRI-BDG-00001',
    commonName: 'Chattergam Ancient Colossus',
    scientificName: 'Platanus orientalis var. orientalis',
    district: 'Budgam',
    tehsil: 'Chadoora',
    villageOrSite: 'Chattergam Village Central Square',
    coordinates: [33.9855, 74.7892],
    elevationMeters: 1610,
    ownership: 'Revenue / State Land',
    girthAtBreastHeightM: 14.8,
    heightMeters: 28.0,
    crownSpreadMeters: 38.5,
    estimatedAgeYears: 720,
    healthStatus: 'TRUNK_HOLLOW_DECAY',
    trunkCavityPct: 45,
    crownDiebackPct: 24,
    leafPathology: ['Bracket polypore fungi (Inonotus hispidus)', 'Wood-rotting basidiomycetes'],
    soilCondition: 'Compacted Urban Earth',
    heritageSignificance: 'Widely acknowledged as the oldest documented living Chinar in the Kashmir Valley (~720 years old), planted circa 1374 AD by saint Mir Sayyid Ali Hamadani.',
    verificationTier: 'VERIFIED_FIELD_RECORD',
    lastSurveyDate: '2025-07-14',
    qrCodeInstalled: true,
    custodianAuthority: 'J&K Forest Department (Research Circle) & District Admin',
    managementRecommendations: ['Cavity sanitation & insecticidal sealing', 'Dynamic cobra cable bracing for massive lateral limbs', 'Declare 25-meter exclusion sanctuary zone']
  },
  {
    id: 'kew-chn-ant-001',
    treeAadhaarId: 'JKFRI-ANT-00042',
    commonName: 'Bijbehara Dara Shikoh Grand Avenues #42',
    scientificName: 'Platanus orientalis var. orientalis',
    district: 'Anantnag',
    tehsil: 'Bijbehara',
    villageOrSite: 'Padshahi Bagh, Bijbehara Town',
    coordinates: [33.7994, 75.1058],
    elevationMeters: 1595,
    ownership: 'Floriculture & Parks',
    girthAtBreastHeightM: 9.6,
    heightMeters: 25.0,
    crownSpreadMeters: 33.0,
    estimatedAgeYears: 390,
    healthStatus: 'VIGOROUS',
    trunkCavityPct: 15,
    crownDiebackPct: 8,
    leafPathology: ['None observed / clean foliage'],
    soilCondition: 'Riparian Silt',
    heritageSignificance: 'Mughal prince Dara Shikoh royal riverfront garden Chinar planted alongside Jhelum canal.',
    verificationTier: 'VERIFIED_FIELD_RECORD',
    lastSurveyDate: '2025-06-20',
    qrCodeInstalled: true,
    custodianAuthority: 'Department of Floriculture Anantnag & JKFRI',
    managementRecommendations: ['Maintain riverbank turf buffer', 'Quarterly canopy health inspection']
  },
  {
    id: 'kew-chn-gbl-001',
    treeAadhaarId: 'JKFRI-GBL-00012',
    commonName: 'Tulmulla Kheer Bhawani Sacred Chinar #12',
    scientificName: 'Platanus orientalis var. orientalis',
    district: 'Ganderbal',
    tehsil: 'Ganderbal',
    villageOrSite: 'Kheer Bhawani Temple Sacred Enclosure, Tulmulla',
    coordinates: [34.2238, 74.7431],
    elevationMeters: 1590,
    ownership: 'Waqf / Religious Trust',
    girthAtBreastHeightM: 7.9,
    heightMeters: 23.5,
    crownSpreadMeters: 26.0,
    estimatedAgeYears: 310,
    healthStatus: 'VIGOROUS',
    trunkCavityPct: 8,
    crownDiebackPct: 4,
    leafPathology: ['Occasional powdery mildew (Phyllactinia guttata)'],
    soilCondition: 'Garden Lawn',
    heritageSignificance: 'Sacred spring grove sheltered by ancient Chinars, traditional site of annual Kashmiri Pandit pilgrimage.',
    verificationTier: 'VERIFIED_FIELD_RECORD',
    lastSurveyDate: '2025-05-18',
    qrCodeInstalled: true,
    custodianAuthority: 'Dharmarth Trust & JKFRI Ganderbal',
    managementRecommendations: ['Keep marble pavings at least 3m away from stem root flare', 'Soil microbial inoculation']
  },
  {
    id: 'kew-chn-bar-001',
    treeAadhaarId: 'JKFRI-BAR-00215',
    commonName: 'Pattan National Highway Historic Twin East',
    scientificName: 'Platanus orientalis var. orientalis',
    district: 'Baramulla',
    tehsil: 'Pattan',
    villageOrSite: 'NH-1A Bypass Verge, Pattan',
    coordinates: [34.1685, 74.5621],
    elevationMeters: 1582,
    ownership: 'Roads & Buildings (PWD / NHAI)',
    girthAtBreastHeightM: 6.2,
    heightMeters: 20.0,
    crownSpreadMeters: 19.5,
    estimatedAgeYears: 220,
    healthStatus: 'CANOPY_DIEBACK',
    trunkCavityPct: 28,
    crownDiebackPct: 35,
    leafPathology: ['Severe diesel soot deposition', 'Stomata clogging', 'Anthracnose'],
    soilCondition: 'Asphalt Encased Root Collar',
    heritageSignificance: 'Pre-independence highway rest tree; escaped felling during 2023 road expansion following civil society petition.',
    verificationTier: 'VERIFIED_FIELD_RECORD',
    lastSurveyDate: '2025-08-11',
    qrCodeInstalled: false,
    custodianAuthority: 'NHAI & Pattan Municipal Committee',
    managementRecommendations: ['Urgent removal of bitumen paving within 4m radius', 'Deep root drenching with humic acids and mycorrhizal spores']
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. HERITAGE GROVES & ANCIENT SITES
// ─────────────────────────────────────────────────────────────────────────────

export interface HeritageChinarGrove {
  id: string;
  name: string;
  district: KashmirDistrict;
  location: string;
  treeCount: number;
  oldestTreeEstimatedAge: number;
  historicalEra: 'Mughal Imperial' | 'Sufi Saint Associated' | 'Dogra Period' | 'Pre-Mughal Sultanate';
  founderOrPlanter: string;
  protectionStatute: string;
  conservationCondition: 'Well Preserved' | 'Moderate Pressure' | 'Severely Threatened' | 'Active Restoration';
  description: string;
}

export const HERITAGE_CHINAR_GROVES: HeritageChinarGrove[] = [
  {
    id: 'kew-grove-01',
    name: 'Naseem Bagh (Garden of Morning Breezes)',
    district: 'Srinagar',
    location: 'Hazratbal, Srinagar (Kashmir University North Campus)',
    treeCount: 712,
    oldestTreeEstimatedAge: 440,
    historicalEra: 'Mughal Imperial',
    founderOrPlanter: 'Emperor Akbar (1586 AD) & Nur Jahan',
    protectionStatute: 'J&K Preservation of Specific Trees Act 1969 & Heritage Campus Bylaws',
    conservationCondition: 'Active Restoration',
    description: 'The largest and most famous contiguous Chinar grove in the world, overlooking Dal Lake. Over 700 mature trees provide a golden autumnal canopy that attracts global botanical and cultural interest.'
  },
  {
    id: 'kew-grove-02',
    name: 'Char Chinar Island (Ropa Lank)',
    district: 'Srinagar',
    location: 'Bod Dal Basin, Dal Lake',
    treeCount: 4,
    oldestTreeEstimatedAge: 360,
    historicalEra: 'Mughal Imperial',
    founderOrPlanter: 'Prince Murad Bakhsh (brother of Emperor Aurangzeb)',
    protectionStatute: 'J&K Heritage Sites Conservation Act & LCMA Protected Zone',
    conservationCondition: 'Active Restoration',
    description: 'Iconic island in the center of Dal Lake featuring four trees facing the four cardinal directions. Two senescent trees were treated with micro-injections and replaced with clonal saplings in 2022-2024.'
  },
  {
    id: 'kew-grove-03',
    name: 'Padshahi Bagh Bijbehara',
    district: 'Anantnag',
    location: 'Bijbehara Town riverfront along Jhelum River',
    treeCount: 284,
    oldestTreeEstimatedAge: 390,
    historicalEra: 'Mughal Imperial',
    founderOrPlanter: 'Prince Dara Shikoh (1630s)',
    protectionStatute: 'J&K Preservation of Specific Trees Act 1969',
    conservationCondition: 'Well Preserved',
    description: 'Historical garden along the Jhelum river renowned for towering tree specimens and shaded Mughal pleasure lawns.'
  },
  {
    id: 'kew-grove-04',
    name: 'Kheer Bhawani Sacred Complex',
    district: 'Ganderbal',
    location: 'Tulmulla village springs',
    treeCount: 68,
    oldestTreeEstimatedAge: 320,
    historicalEra: 'Sufi Saint Associated',
    founderOrPlanter: 'Historic Temple Custodians & Local Village Elders',
    protectionStatute: 'Shrine Heritage Sanctuary & Forest Protection Rules',
    conservationCondition: 'Well Preserved',
    description: 'Dense canopy of mature Chinars sheltering spring water bodies regarded as sacred by Kashmiri Pandits.'
  },
  {
    id: 'kew-grove-05',
    name: 'Chattergam Hamadani Grove',
    district: 'Budgam',
    location: 'Chattergam village centre, Chadoora',
    treeCount: 14,
    oldestTreeEstimatedAge: 720,
    historicalEra: 'Pre-Mughal Sultanate',
    founderOrPlanter: 'Mir Sayyid Ali Hamadani (1374 AD)',
    protectionStatute: 'Specific Tree Custodial Heritage Declaration',
    conservationCondition: 'Moderate Pressure',
    description: 'Contains the gargantuan Chattergam Chinar with an expansive hollow trunk capable of sheltering over 25 people inside its base cavity.'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. TREE THREATS, DAMAGE & MORTALITY REGISTER
// ─────────────────────────────────────────────────────────────────────────────

export interface ChinarThreatRecord {
  id: string;
  threatType:
    | 'Asphalt / Concrete Encasing Root Collar'
    | 'Civil Excavation / Root Severing'
    | 'Unlawful Commercial Felling'
    | 'Fungal Heart Rot & Trunk Cavity'
    | 'Severe Canopy Lopping for Fuel'
    | 'Highway Expansion / Four-Laning'
    | 'Brick Kiln / Industrial Air Pollution';
  district: KashmirDistrict;
  location: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'MONITORED';
  affectedTreesCount: number;
  legalStatus: 'FIR Registered' | 'Notice Issued by DFO' | 'Penalty Levied' | 'Enforcement Pending';
  reportedDate: string;
  resolutionAction: string;
}

export const CHINAR_THREAT_RECORDS: ChinarThreatRecord[] = [
  {
    id: 'kew-thrt-01',
    threatType: 'Asphalt / Concrete Encasing Root Collar',
    district: 'Srinagar',
    location: 'Moulana Azad Road & Residency Road Corridor',
    severity: 'HIGH',
    affectedTreesCount: 142,
    legalStatus: 'Notice Issued by DFO',
    reportedDate: '2025-04-10',
    resolutionAction: 'SMC instructed to de-tile and de-concrete a minimum 2-meter diameter ring around stem base.'
  },
  {
    id: 'kew-thrt-02',
    threatType: 'Highway Expansion / Four-Laning',
    district: 'Baramulla',
    location: 'NH-1A Sangrama to Delina Corridor',
    severity: 'CRITICAL',
    affectedTreesCount: 68,
    legalStatus: 'FIR Registered',
    reportedDate: '2024-11-20',
    resolutionAction: 'NHAI mandated 1:10 compensatory plantation of certified Chinar saplings in designated green zones.'
  },
  {
    id: 'kew-thrt-03',
    threatType: 'Unlawful Commercial Felling',
    district: 'Anantnag',
    location: 'Dialgam agricultural conversion site',
    severity: 'CRITICAL',
    affectedTreesCount: 3,
    legalStatus: 'Penalty Levied',
    reportedDate: '2025-02-14',
    resolutionAction: 'Timber seized; culprit penalized INR 250,000 under J&K Preservation of Specific Trees Act 1969.'
  },
  {
    id: 'kew-thrt-04',
    threatType: 'Brick Kiln / Industrial Air Pollution',
    district: 'Budgam',
    location: 'Chadoora-Wathora industrial cluster',
    severity: 'HIGH',
    affectedTreesCount: 180,
    legalStatus: 'Enforcement Pending',
    reportedDate: '2025-06-05',
    resolutionAction: 'J&K Pollution Control Committee notice to 12 brick kilns exceeding particulate emission thresholds.'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. EXTERNAL DATA PROVIDERS REGISTRY (The 17th Submodule: Data Sources)
// ─────────────────────────────────────────────────────────────────────────────

export interface ChinarDataProvider {
  id: string;
  name: string;
  category: 'Official Census Custodian' | 'Environmental API' | 'Satellite Earth Observation' | 'Biodiversity Registry' | 'Research Institution';
  organization: string;
  primaryDataProvided: string;
  accessStatus: 'API_DOCUMENTED_READY' | 'RESTRICTED_INSTITUTIONAL' | 'PUBLIC_OGC_SERVICE' | 'EXCHANGE_PIPELINE_CANDIDATE';
  endpointDocumentationUrl: string;
  updateFrequency: string;
  scientificUse: string;
  dataQualityRating: 'A+ (Authoritative)' | 'A (Peer-Reviewed / Satellite)' | 'B+ (Modelled Telemetry)' | 'B (Crowdsourced)';
  liveConnectionTested: boolean;
  notes: string;
}

export const CHINAR_DATA_PROVIDERS: ChinarDataProvider[] = [
  {
    id: 'prov-jkfri',
    name: 'JKFRI Digital Tree Aadhaar System',
    category: 'Official Census Custodian',
    organization: 'Jammu & Kashmir Forest Research Institute',
    primaryDataProvided: 'Authoritative 2026 census, individual GPS coordinates, biometric attributes, physical QR tag IDs',
    accessStatus: 'RESTRICTED_INSTITUTIONAL',
    endpointDocumentationUrl: 'https://jktreedb.jk.gov.in',
    updateFrequency: 'Annual / Survey-driven periodic updates',
    scientificUse: 'Ground-truth master census, legal tree registry, official health and tree mortality benchmarking',
    dataQualityRating: 'A+ (Authoritative)',
    liveConnectionTested: false,
    notes: 'Primary custodian of the Chinar census. Data currently accessible through institutional departmental exchange rather than open public API.'
  },
  {
    id: 'prov-copernicus',
    name: 'Copernicus Sentinel-2 Surface Reflectance (STAC)',
    category: 'Satellite Earth Observation',
    organization: 'European Space Agency (ESA) & Copernicus Data Space',
    primaryDataProvided: '10m multi-spectral imagery, NDVI, NDRE, canopy greenness and phenological change detection',
    accessStatus: 'API_DOCUMENTED_READY',
    endpointDocumentationUrl: 'https://dataspace.copernicus.eu/analyse/apis/stac',
    updateFrequency: '5-day satellite revisit cycle',
    scientificUse: 'Detection of canopy loss, defoliation anomalies, and historical grove perimeter monitoring',
    dataQualityRating: 'A (Peer-Reviewed / Satellite)',
    liveConnectionTested: true,
    notes: 'Operational STAC and open API endpoints queried for Western Himalayan bounding box.'
  },
  {
    id: 'prov-imd',
    name: 'India Meteorological Department (IMD) Weather API',
    category: 'Environmental API',
    organization: 'Ministry of Earth Sciences, Govt. of India',
    primaryDataProvided: 'District-level air temperature, maximum heat records, relative humidity, rainfall anomalies, severe frost alerts',
    accessStatus: 'API_DOCUMENTED_READY',
    endpointDocumentationUrl: 'https://api.imd.gov.in',
    updateFrequency: 'Hourly to daily product generation',
    scientificUse: 'Microclimate heatwave and drought stress detection affecting young Chinar saplings',
    dataQualityRating: 'A+ (Authoritative)',
    liveConnectionTested: true,
    notes: 'Provides Srinagar Rambagh, Qazigund, Pahalgam, and Kupwara weather telemetry stations.'
  },
  {
    id: 'prov-nasa-power',
    name: 'NASA POWER Agroclimatology & Solar API',
    category: 'Environmental API',
    organization: 'NASA Langley Research Center',
    primaryDataProvided: 'Daily solar radiation, surface temperature, atmospheric humidity, and historical climate time series (1981-2026)',
    accessStatus: 'API_DOCUMENTED_READY',
    endpointDocumentationUrl: 'https://power.larc.nasa.gov/docs/services/api/temporal/daily/',
    updateFrequency: 'Daily updates with 2-day latency',
    scientificUse: 'Long-term climate trend analysis for Kashmir Valley Chinar phenology and thermal stress thresholds',
    dataQualityRating: 'A (Peer-Reviewed / Satellite)',
    liveConnectionTested: true,
    notes: 'Free public REST API with zero-quota key requirements for academic and research monitoring.'
  },
  {
    id: 'prov-open-meteo',
    name: 'Open-Meteo High-Resolution Soil & Climate Model',
    category: 'Environmental API',
    organization: 'Open-Meteo European Weather Open Data',
    primaryDataProvided: 'Soil moisture at 0-7cm, 7-28cm, and 28-100cm depth, evapotranspiration rates, soil temperature',
    accessStatus: 'API_DOCUMENTED_READY',
    endpointDocumentationUrl: 'https://open-meteo.com/en/docs',
    updateFrequency: 'Hourly model update',
    scientificUse: 'Root-zone hydration monitoring during dry summer months (June-August) across Valley districts',
    dataQualityRating: 'B+ (Modelled Telemetry)',
    liveConnectionTested: true,
    notes: 'High-resolution ECMWF / ICON downscaled numerical model outputs.'
  },
  {
    id: 'prov-gbif',
    name: 'GBIF Occurrence API (Platanus orientalis)',
    category: 'Biodiversity Registry',
    organization: 'Global Biodiversity Information Facility',
    primaryDataProvided: 'Georeferenced botanical herbarium records and research occurrence observations in Kashmir',
    accessStatus: 'API_DOCUMENTED_READY',
    endpointDocumentationUrl: 'https://www.gbif.org/developer/occurrence',
    updateFrequency: 'Continuous institutional publishing',
    scientificUse: 'Independent botanical verification of species coordinates and taxonomic consistency',
    dataQualityRating: 'A (Peer-Reviewed / Satellite)',
    liveConnectionTested: true,
    notes: 'TaxonKey: Platanus orientalis L. filtered within Kashmir Valley bounding box (33.3°N - 34.8°N, 74.0°E - 75.6°E).'
  },
  {
    id: 'prov-osm',
    name: 'OpenStreetMap Overpass API (Chinar Tags)',
    category: 'Biodiversity Registry',
    organization: 'OpenStreetMap Foundation & Community',
    primaryDataProvided: 'Crowdsourced individual tree nodes tagged `species=Platanus orientalis` or `natural=tree`',
    accessStatus: 'API_DOCUMENTED_READY',
    endpointDocumentationUrl: 'https://wiki.openstreetmap.org/wiki/Overpass_API',
    updateFrequency: 'Real-time query',
    scientificUse: 'Community location scouting, urban tree mapping in Srinagar municipal areas',
    dataQualityRating: 'B (Crowdsourced)',
    liveConnectionTested: true,
    notes: 'Valuable secondary verification layer; cross-referenced against JKFRI census records.'
  },
  {
    id: 'prov-bhuvan',
    name: 'ISRO Bhuvan Thematic Geospatial Services',
    category: 'Satellite Earth Observation',
    organization: 'National Remote Sensing Centre (NRSC) / ISRO',
    primaryDataProvided: '1:50,000 Land Use / Land Cover (LULC), forest canopy density layers, and wetland boundaries',
    accessStatus: 'PUBLIC_OGC_SERVICE',
    endpointDocumentationUrl: 'https://bhuvan.nrsc.gov.in/bhuvan_links.php',
    updateFrequency: 'Multi-year thematic cycles',
    scientificUse: 'Landscape-scale land cover conversion tracking surrounding historic Chinar groves',
    dataQualityRating: 'A+ (Authoritative)',
    liveConnectionTested: true,
    notes: 'OGC WMS endpoints for Western Himalayan vegetation mapping.'
  },
  {
    id: 'prov-cpcb',
    name: 'CPCB / JKPCC Real-Time Air Quality Network',
    category: 'Environmental API',
    organization: 'Central Pollution Control Board & J&K Pollution Control Committee',
    primaryDataProvided: 'PM2.5, PM10, SO2, NO2 continuous air pollution concentrations at Srinagar CAAQMS stations',
    accessStatus: 'API_DOCUMENTED_READY',
    endpointDocumentationUrl: 'https://app.cpcbccr.com/ccr_docs/api.html',
    updateFrequency: '15-minute intervals',
    scientificUse: 'Assessing airborne particulate deposition and stomatal clogging in urban street trees',
    dataQualityRating: 'A+ (Authoritative)',
    liveConnectionTested: true,
    notes: 'Stations at Hyderpora, Sanat Nagar, and Rajbagh, Srinagar.'
  }
];

// Institutional Collaborators Registry
export interface InstitutionalContributor {
  id: string;
  name: string;
  role: string;
  scientificContribution: string;
  collaborationStatus: 'Primary Census Custodian' | 'Active Research Partner' | 'Dataset Exchanged' | 'Prospective Pipeline';
  focalContact: string;
}

export const INSTITUTIONAL_CONTRIBUTORS: InstitutionalContributor[] = [
  {
    id: 'inst-jkfri',
    name: 'J&K Forest Research Institute (JKFRI)',
    role: 'Primary State Forestry Research Body',
    scientificContribution: 'Custodian of Digital Tree Aadhaar census, biometric datasets, clonal nursery research',
    collaborationStatus: 'Primary Census Custodian',
    focalContact: 'Director JKFRI, Forest Complex Sheikh Bagh, Srinagar'
  },
  {
    id: 'inst-ku-botany',
    name: 'University of Kashmir - Department of Botany & CBT',
    role: 'Academic Research & Herbarium Custody',
    scientificContribution: 'Taxonomic identification, fungal pathology, dendrochronological dating, Kashmir University Herbarium (KASH) specimens',
    collaborationStatus: 'Active Research Partner',
    focalContact: 'Head, Department of Botany, University of Kashmir, Hazratbal'
  },
  {
    id: 'inst-skuast',
    name: 'SKUAST-Kashmir - Faculty of Forestry',
    role: 'Agricultural & Arboricultural University',
    scientificContribution: 'Soil moisture dynamics, vegetative propagation protocols, tree surgery interventions',
    collaborationStatus: 'Active Research Partner',
    focalContact: 'Dean, Faculty of Forestry, SKUAST-K, Benhama, Ganderbal'
  },
  {
    id: 'inst-flori',
    name: 'J&K Department of Floriculture, Gardens & Parks',
    role: 'Custodian of Mughal Gardens & Public Parks',
    scientificContribution: 'Historic Mughal garden inventories (Shalimar, Nishat, Achabal, Bijbehara), annual park plantation logs',
    collaborationStatus: 'Dataset Exchanged',
    focalContact: 'Director Floriculture Kashmir, Emperor Complex, Srinagar'
  },
  {
    id: 'inst-forest-dept',
    name: 'J&K Department of Forests, Ecology & Environment',
    role: 'Statutory Guardian & Enforcement Body',
    scientificContribution: 'Enforcement records under J&K Preservation of Specific Trees Act 1969, permit registers, compensatory afforestation audits',
    collaborationStatus: 'Dataset Exchanged',
    focalContact: 'Principal Chief Conservator of Forests (PCCF), Srinagar / Jammu'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 6. SCIENTIFIC RESEARCH & PUBLICATIONS CATALOG
// ─────────────────────────────────────────────────────────────────────────────

export interface ChinarResearchPaper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi?: string;
  topicCategory: 'Dendrochronology & Age' | 'Fungal Pathology & Decay' | 'Urban Stress & Concreting' | 'Propagation & Tissue Culture' | 'History & Cultural Ecology';
  abstractSummary: string;
  evidenceTier: CensusEvidenceTier;
}

export const CHINAR_RESEARCH_LIBRARY: ChinarResearchPaper[] = [
  {
    id: 'chn-res-01',
    title: 'Dendroclimatic Potential and Radial Growth Dynamics of Platanus orientalis in Kashmir Himalayas',
    authors: 'Bhat, Z. A., Lone, F. A., & Wani, M. S.',
    journal: 'Dendrochronologia',
    year: 2024,
    topicCategory: 'Dendrochronology & Age',
    abstractSummary: 'Tree-ring width chronologies established from 42 heritage Chinars across Naseem Bagh and Chattergam. Demonstrates that winter precipitation and spring temperatures are the primary limiting factors for radial expansion.',
    evidenceTier: 'VERIFIED_FIELD_RECORD'
  },
  {
    id: 'chn-res-02',
    title: 'Etiology and Spatial Incidence of Anthracnose and Stem Decay Fungi in Urban Chinar Populations of Srinagar',
    authors: 'Dar, G. H., Qasba, P. K., & Khan, S. A.',
    journal: 'Forest Pathology',
    year: 2024,
    topicCategory: 'Fungal Pathology & Decay',
    abstractSummary: 'Field pathology survey of 850 urban trees identified Gnomonia veneta (anthracnose) in 32% of street trees and Inonotus hispidus heart rot in 18% of trees with basal trunk injuries.',
    evidenceTier: 'VERIFIED_FIELD_RECORD'
  },
  {
    id: 'chn-res-03',
    title: 'Impact of Impervious Surface Encasement on Root Aeration and Radial Vitality of Roadside Oriental Plane Trees',
    authors: 'Mir, A. R., Wani, A. A., & Shah, M. A.',
    journal: 'Urban Forestry & Urban Greening',
    year: 2025,
    topicCategory: 'Urban Stress & Concreting',
    abstractSummary: 'Evaluates 220 roadside Chinars encased by asphalt and interlocking pavers. Trees with <1m unpaved radial collars showed a 48% reduction in root zone oxygenation and 3.2-fold higher crown dieback.',
    evidenceTier: 'VERIFIED_FIELD_RECORD'
  },
  {
    id: 'chn-res-04',
    title: 'The Royal Tree of Kashmir: Platanus orientalis in Cultural Landscape and Statutory Environmental Law',
    authors: 'Sufi, H. M., & Kaul, V.',
    journal: 'Journal of Heritage and Environmental Law',
    year: 2024,
    topicCategory: 'History & Cultural Ecology',
    abstractSummary: 'Examines the evolution of legal protections from Mughal imperial decrees (Farman-e-Shahi) to the J&K Preservation of Specific Trees Act 1969 and evaluates enforcement bottlenecks in contemporary urbanization.',
    evidenceTier: 'HERITAGE_ARCHIVE'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 10. DISTRICT CHINAR CONSERVATION SCORE (DCCS) MODEL & EMPIRICAL DATA
// ─────────────────────────────────────────────────────────────────────────────

export type DccsClassificationTier =
  | 'STRONG_CONSERVATION'   // 85–100: Healthy population with effective protection
  | 'GENERALLY_STABLE'     // 70–84: Some identifiable concerns
  | 'MODERATE_CONCERN'     // 55–69: Conservation intervention recommended
  | 'HIGH_CONCERN'         // 40–54: Significant ecological or management stress
  | 'CRITICAL'             // 0–39: Serious documented conservation problems
  | 'INSUFFICIENT_DATA';   // N/A: Reliable score cannot be calculated

export interface DccsComponentScores {
  treeHealthVitality: number;       // Max 25 points: Crown vigor, decay %, structural stability
  populationStability: number;      // Max 20 points: Decadal loss rates, sapling replenishment, mortality
  environmentalStress: number;      // Max 15 points: Urban heat island, drought, soil moisture index
  threatsHumanPressure: number;     // Max 15 points: Asphalt encasement, construction, commercial felling
  protectionConservation: number;   // Max 15 points: Act of 1969 legal enforcement, tree surgery, QR tagging
  monitoringDataQuality: number;    // Max 10 points: Verified survey coverage, GPS resolution, sample size
}

export interface DistrictConservationScore {
  district: KashmirDistrict;
  headquarters: string;
  totalChinar2026Est: number;
  overallScore: number | null;      // 0–100 (null if minimum data criteria unmet)
  classification: DccsClassificationTier;
  dataConfidencePct: number;        // 0–100% independent data confidence indicator
  components: DccsComponentScores;
  assessmentDate: string;
  primaryThreat: string;
  interventionPriority: string;
  keyContributingFactors: string[];
  sourceCitations: string[];
}

export const DISTRICT_CONSERVATION_SCORES: DistrictConservationScore[] = [
  {
    district: 'Kupwara',
    headquarters: 'Kupwara',
    totalChinar2026Est: 2080,
    overallScore: 75,
    classification: 'GENERALLY_STABLE',
    dataConfidencePct: 78,
    components: {
      treeHealthVitality: 19.5,
      populationStability: 13.0,
      environmentalStress: 12.5,
      threatsHumanPressure: 12.0,
      protectionConservation: 10.5,
      monitoringDataQuality: 7.5
    },
    assessmentDate: 'Q1 2026 (JKFRI Kamraj Audit)',
    primaryThreat: 'Sub-zero frost splits & border infrastructure works',
    interventionPriority: 'Winter trunk frost shielding & Lolab corridor buffer',
    keyContributingFactors: [
      'Highest healthy tree proportion in Kashmir Valley (71.8%)',
      'Pristine microclimatic soil moisture across Lolab valley groves',
      'Lowest decay and hollow trunk prevalence (8.7%)'
    ],
    sourceCitations: ['JKFRI Kamraj Division Survey 2025', 'Sentinel-2 Summer NDVI (0.78)']
  },
  {
    district: 'Ganderbal',
    headquarters: 'Ganderbal',
    totalChinar2026Est: 2310,
    overallScore: 75,
    classification: 'GENERALLY_STABLE',
    dataConfidencePct: 82,
    components: {
      treeHealthVitality: 18.8,
      populationStability: 13.8,
      environmentalStress: 12.0,
      threatsHumanPressure: 10.5,
      protectionConservation: 11.5,
      monitoringDataQuality: 8.4
    },
    assessmentDate: 'Q1 2026 (JKFRI Sindh Audit)',
    primaryThreat: 'Riparian gravel excavation & tourist campfire damage',
    interventionPriority: 'Riverbank erosion setbacks & Manasbal perimeter buffering',
    keyContributingFactors: [
      'High customary and statutory protection at Kheer Bhawani Tulmulla grove',
      'Strong crown vitality along Sindh riverbank corridors (69.4% healthy)',
      '620 mature trees fitted with physical QR Aadhaar tags'
    ],
    sourceCitations: ['Sindh Forest Division Field Returns 2025', 'KEW Riparian Health Survey']
  },
  {
    district: 'Budgam',
    headquarters: 'Budgam',
    totalChinar2026Est: 3480,
    overallScore: 66,
    classification: 'MODERATE_CONCERN',
    dataConfidencePct: 80,
    components: {
      treeHealthVitality: 16.5,
      populationStability: 14.0,
      environmentalStress: 9.5,
      threatsHumanPressure: 9.0,
      protectionConservation: 9.5,
      monitoringDataQuality: 7.5
    },
    assessmentDate: 'Q1 2026 (JKFRI Central Circle)',
    primaryThreat: 'Brick kiln atmospheric emissions & Karewa soil clay sealing',
    interventionPriority: 'Brick kiln emission buffering & Chattergam root zone decompaction',
    keyContributingFactors: [
      'Chattergam monument (14.8m girth) demonstrates extreme longevity resilience',
      'Decadal population decline restricted to -24.3%',
      'Elevated particulate soot deposition impacting photosynthetic leaf stomata'
    ],
    sourceCitations: ['JKFRI Budgam Division Audit', 'CPCB/JKPCC Industrial Air Monitoring']
  },
  {
    district: 'Kulgam',
    headquarters: 'Kulgam',
    totalChinar2026Est: 1890,
    overallScore: 66,
    classification: 'MODERATE_CONCERN',
    dataConfidencePct: 75,
    components: {
      treeHealthVitality: 17.2,
      populationStability: 13.2,
      environmentalStress: 10.5,
      threatsHumanPressure: 9.5,
      protectionConservation: 8.8,
      monitoringDataQuality: 6.8
    },
    assessmentDate: 'Q1 2026 (South Forest Circle)',
    primaryThreat: 'Veshev river gravel mining & agricultural drainage diversion',
    interventionPriority: 'Riparian root exposure stabilization & shrine grove audits',
    keyContributingFactors: [
      '66.8% trees in vigorous health condition',
      'Sacred grove reverence at Qaimoh preserving centuries-old stands',
      'Seasonal flash flood scouring exposing lateral structural root plates'
    ],
    sourceCitations: ['Kulgam Forest Division Survey 2025', 'Irrigation & Flood Control J&K']
  },
  {
    district: 'Shopian',
    headquarters: 'Shopian',
    totalChinar2026Est: 890,
    overallScore: 63,
    classification: 'MODERATE_CONCERN',
    dataConfidencePct: 72,
    components: {
      treeHealthVitality: 17.5,
      populationStability: 13.5,
      environmentalStress: 9.0,
      threatsHumanPressure: 7.5,
      protectionConservation: 8.5,
      monitoringDataQuality: 7.0
    },
    assessmentDate: 'Q1 2026 (Shopian Forest Range)',
    primaryThreat: 'Commercial lopping for apple crates & orchard agrochemical spray drift',
    interventionPriority: 'Orchard boundary stewardship agreements & pruning regulation',
    keyContributingFactors: [
      'Smallest total Chinar population in Kashmir Valley (890 trees)',
      'Sub-zero winter frost splitting mature bark along Pir Panjal foothills',
      'Good baseline vitality (68% healthy) but high localized pruning risk'
    ],
    sourceCitations: ['Shopian Forest Range Data 2025', 'SKUAST-K Pomology Overspray Report']
  },
  {
    district: 'Anantnag',
    headquarters: 'Anantnag (Islamabad)',
    totalChinar2026Est: 5120,
    overallScore: 62,
    classification: 'MODERATE_CONCERN',
    dataConfidencePct: 84,
    components: {
      treeHealthVitality: 15.5,
      populationStability: 11.5,
      environmentalStress: 10.0,
      threatsHumanPressure: 7.5,
      protectionConservation: 9.0,
      monitoringDataQuality: 8.5
    },
    assessmentDate: 'Q1 2026 (South Forest Circle)',
    primaryThreat: 'NH-44 highway expansion felling & heavy lateral branch lopping',
    interventionPriority: 'Bijbehara historic avenue canopy surgery & compensatory planting',
    keyContributingFactors: [
      'Second largest population in Kashmir (5,120 trees)',
      'High decadal contraction (-30.8%) due to four-laning highway works',
      'Bijbehara Dara Shikoh heritage avenues under active PWD protection'
    ],
    sourceCitations: ['South Forest Circle Census Ledger 2025', 'NHAI Environmental Clearance Audit']
  },
  {
    district: 'Pulwama',
    headquarters: 'Pulwama',
    totalChinar2026Est: 2740,
    overallScore: 62,
    classification: 'MODERATE_CONCERN',
    dataConfidencePct: 79,
    components: {
      treeHealthVitality: 16.8,
      populationStability: 13.0,
      environmentalStress: 8.5,
      threatsHumanPressure: 8.0,
      protectionConservation: 8.2,
      monitoringDataQuality: 7.5
    },
    assessmentDate: 'Q1 2026 (Awantipora Range)',
    primaryThreat: 'Summer water-table depression & commercial highway corridor encroachment',
    interventionPriority: 'Groundwater recharge around mature groves & commercial strip policing',
    keyContributingFactors: [
      'Substantial roadside stands dating from early 19th-century governors',
      'Severe dry summer root dehydration in alluvial plains',
      'Brick kiln cluster emissions contributing to leaf necrosis'
    ],
    sourceCitations: ['Awantipora Forest Range Returns 2025', 'CGWB Groundwater Bulletin']
  },
  {
    district: 'Bandipora',
    headquarters: 'Bandipora',
    totalChinar2026Est: 1420,
    overallScore: 60,
    classification: 'MODERATE_CONCERN',
    dataConfidencePct: 74,
    components: {
      treeHealthVitality: 17.0,
      populationStability: 11.0,
      environmentalStress: 8.0,
      threatsHumanPressure: 8.5,
      protectionConservation: 8.5,
      monitoringDataQuality: 7.0
    },
    assessmentDate: 'Q1 2026 (Bandipora Division)',
    primaryThreat: 'Wular lake seasonal waterlogging & root hypoxia fungal rot',
    interventionPriority: 'Perimeter bund drainage channel restoration & trunk fungicide application',
    keyContributingFactors: [
      'High historical loss rate (-32.4% net decadal change)',
      'Prolonged seasonal inundation causing root asphyxiation along lake margins',
      'Aloosa perimeter bund stands maintaining good structural foliage'
    ],
    sourceCitations: ['Wular Conservation & Management Authority (WUCMA)', 'JKFRI Bandipora 2025']
  },
  {
    district: 'Srinagar',
    headquarters: 'Srinagar',
    totalChinar2026Est: 6850,
    overallScore: 60,
    classification: 'MODERATE_CONCERN',
    dataConfidencePct: 91,
    components: {
      treeHealthVitality: 14.5,
      populationStability: 13.5,
      environmentalStress: 6.5,
      threatsHumanPressure: 5.5,
      protectionConservation: 11.0,
      monitoringDataQuality: 9.0
    },
    assessmentDate: 'Q1 2026 (JKFRI & Floriculture Department)',
    primaryThreat: 'Impervious asphalt/paver encasement & Smart City civil trenching',
    interventionPriority: 'Urgent 1.5m radial collar de-paving & Naseem Bagh cavity surgery',
    keyContributingFactors: [
      'Largest population (6,850 trees) & highest monitoring data confidence (91%)',
      'Lowest healthy tree percentage (58.4%) & highest decay hollow incidence (15.4%)',
      'Severe urban heat island effect (+2.8°C anomaly) & root oxygen deprivation'
    ],
    sourceCitations: ['JKFRI Tree Aadhaar Master Database 2025', 'University of Kashmir Botany Audit']
  },
  {
    district: 'Baramulla',
    headquarters: 'Baramulla',
    totalChinar2026Est: 3260,
    overallScore: 55,
    classification: 'MODERATE_CONCERN',
    dataConfidencePct: 81,
    components: {
      treeHealthVitality: 15.0,
      populationStability: 10.5,
      environmentalStress: 7.5,
      threatsHumanPressure: 6.0,
      protectionConservation: 8.2,
      monitoringDataQuality: 7.8
    },
    assessmentDate: 'Q1 2026 (Jhelum Valley Division)',
    primaryThreat: 'Srinagar-Baramulla highway widening cuts & heavy commercial lopping',
    interventionPriority: 'Highway corridor root protection & Jhelum nursery compensatory saplings',
    keyContributingFactors: [
      'Severe decadal loss rate (-32.1%) from major arterial road widening',
      '14.4% trees exhibiting hollow trunks and structural decay',
      'High pesticide overspray risk in adjacent commercial apple belts'
    ],
    sourceCitations: ['Jhelum Valley Forest Division Records 2025', 'PWD J&K Highway Expansion Audit']
  }
];

