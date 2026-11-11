/**
 * Kashmir EcoWatch - Sectoral Environmental Impact Assessment Engine (SEIAE)
 * Agriculture Environmental Inventory & Land Systems Census Database
 * 
 * Verified against:
 * - J&K Digest of Statistics 2024-25 (Directorate of Economics & Statistics, Table 4.17: High-Yielding Varieties)
 * - J&K Economic Survey 2025-26 (Agriculture, Land Use, Cropping Intensity & Irrigation Chapters)
 * - Comptroller and Auditor General of India (CAG) Performance Audit 2025 (Wular Lake Basin Multi-Sectoral Review)
 * - SKUAST-Kashmir Faculty of Agriculture (Wadura) & Rice Research Station (Khudwani)
 * - ICAR-National Bureau of Soil Survey and Land Use Planning (NBSS&LUP)
 * - J&K Land Revenue Act (Section 133A restrictions on paddy conversion)
 */

export interface OfficialAgriStat {
  id: string;
  metric: string;
  figure: string;
  numericValue: number | null;
  unit: string;
  referencePeriod: string;
  geographicScope: 'Kashmir Division' | 'Jammu & Kashmir UT' | 'District Level';
  publisher: string;
  sourceDocument: string;
  verificationStatus: 'Official Published' | 'Official Census' | 'Pending Measurement';
  notes: string;
}

export interface DistrictPaddyProfile {
  districtName: string;
  highYieldingPaddyAreaHa: number; // Table 4.17
  shareOfKashmirPaddyPercent: number;
  totalNetSownAreaHa: number;
  croppingIntensityPercent: number;
  primaryIrrigationSource: string;
  paddyConversionPressure: 'Severe' | 'High' | 'Moderate' | 'Low';
  dominantPaddyVarieties: string[];
  keyEnvironmentalReceptors: string;
}

export interface CropFarmingSystemDossier {
  id: string;
  systemName: string;
  vernacularName: string;
  category: 'Major Wetland Cereal' | 'Rainfed Hill Cereal' | 'Winter Rabi Cereal' | 'Nitrogen-Fixing Oilseeds' | 'Intensive Horticulture-Adjacent' | 'Lacustrine Wetland Agriculture' | 'Livestock Nutrient Cycling' | 'Heritage Agroecology';
  kashmirAreaCoverageHa: string;
  annualProductionVolume: string;
  primaryDistricts: string[];
  systemCharacteristics: {
    croppingPattern: string;
    waterDemandAndSource: string;
    nutrientAndSoilRegime: string;
    energyAndEmissions: string;
    biodiversityAndEcosystemServices: string;
  };
  environmentalPressures: string[];
  ecologicalBenefitsAndStrengths: string[];
  scientificIndicators: string[];
  mitigationAndResilienceOptions: string[];
  sourceReference: string;
}

export interface AgriAssessmentPillar {
  pillarCode: string;
  name: string;
  scopeSummary: string;
  coreMeasurements: string[];
  fieldMethods: string[];
  remoteSensingAndModeling: string[];
  statutoryAndPolicyBenchmarks: string[];
  leadAgency: string;
}

export interface WularCatchmentDriver {
  stressorSource: string;
  contributingSector: 'Agriculture' | 'Municipal/Urban' | 'Catchment Forestry' | 'Horticulture' | 'Wetland Management';
  pollutantOrPhysicalPressure: string;
  shareOfCumulativeStressPercentEst: number;
  cag2025AuditFinding: string;
  monitoringProtocol: string;
}

export interface LandUseObservatoryMetric {
  conversionType: string;
  annualRateHaYear: string;
  drivingMechanisms: string;
  environmentalConsequence: string;
  satelliteDetectionMethod: string;
  statutoryRemedy: string;
}

// -------------------------------------------------------------
// 1. HEADLINE OFFICIAL AGRICULTURAL STATISTICS (2024-2026)
// -------------------------------------------------------------

export const OFFICIAL_AGRI_HEADLINE_STATISTICS: OfficialAgriStat[] = [
  {
    id: 'stat-hyv-paddy-kashmir',
    metric: 'High-Yielding Paddy Varieties Area',
    figure: '120,620 ha',
    numericValue: 120620,
    unit: 'Hectares',
    referencePeriod: '2024–25',
    geographicScope: 'Kashmir Division',
    publisher: 'Directorate of Economics & Statistics J&K',
    sourceDocument: 'J&K Digest of Statistics 2024-25, Table 4.17',
    verificationStatus: 'Official Published',
    notes: 'Official recorded area sown under high-yielding rice varieties across all 10 Kashmir Division districts. Does not include traditional heritage varieties or upland non-irrigated rice.'
  },
  {
    id: 'stat-hyv-maize-kashmir',
    metric: 'High-Yielding Maize Varieties Area',
    figure: '65,380 ha',
    numericValue: 65380,
    unit: 'Hectares',
    referencePeriod: '2024–25',
    geographicScope: 'Kashmir Division',
    publisher: 'Directorate of Economics & Statistics J&K',
    sourceDocument: 'J&K Digest of Statistics 2024-25, Table 4.17',
    verificationStatus: 'Official Published',
    notes: 'Predominantly rainfed hill terrace cultivation across Pir Panjal and Shamshabari foothills; vital for mountain food security and livestock fodder.'
  },
  {
    id: 'stat-hyv-vegetables-kashmir',
    metric: 'High-Yielding Vegetable Varieties Area',
    figure: '79,870 ha',
    numericValue: 79870,
    unit: 'Hectares',
    referencePeriod: '2024–25',
    geographicScope: 'Kashmir Division',
    publisher: 'Directorate of Economics & Statistics J&K',
    sourceDocument: 'J&K Digest of Statistics 2024-25, Table 4.17',
    verificationStatus: 'Official Published',
    notes: 'Covers high-turnover multi-crop commercial peri-urban clusters in Srinagar, Budgam, and Pulwama, producing cabbage, knol-khol, spinach, and potatoes.'
  },
  {
    id: 'stat-hyv-all-crops-summed',
    metric: 'Summed High-Yielding Crop Categories',
    figure: '439,100 ha',
    numericValue: 439100,
    unit: 'Gross Cropped Ha',
    referencePeriod: '2024–25',
    geographicScope: 'Kashmir Division',
    publisher: 'Directorate of Economics & Statistics J&K',
    sourceDocument: 'J&K Digest of Statistics 2024-25, Table 4.17',
    verificationStatus: 'Official Published',
    notes: 'Summed gross cropped area of all reported high-yielding crop categories across seasons. Must NOT be confused with unique physical farmland area due to double-cropping.'
  },
  {
    id: 'stat-kashmir-districts-count',
    metric: 'Administrative Coverage & Mapped Basins',
    figure: '10 Districts',
    numericValue: 10,
    unit: 'Districts Mapped',
    referencePeriod: '2024–25',
    geographicScope: 'Kashmir Division',
    publisher: 'Revenue & Agriculture Production Department J&K',
    sourceDocument: 'District Cropping Pattern Records',
    verificationStatus: 'Official Census',
    notes: 'Encompasses all 10 districts of Kashmir Division with complete hydrological basin integration into the Jhelum River drainage corridor.'
  },
  {
    id: 'stat-agri-eia-score-status',
    metric: 'Sectoral Evidence & Score Status',
    figure: 'Calibration Stage',
    numericValue: null,
    unit: 'Scientific Status',
    referencePeriod: 'November 2026',
    geographicScope: 'Kashmir Division',
    publisher: 'Kashmir EcoWatch Agro-Hydrology & Soil Sciences Panel',
    sourceDocument: 'SEIAE Evidence Calibration Protocol',
    verificationStatus: 'Pending Measurement',
    notes: 'Single numeric score withheld pending multi-year field telemetry and continuous stream sampling; distinguishing measured empirical data from modeled baselines.'
  }
];

// -------------------------------------------------------------
// 2. DISTRICT-WISE PADDY INTELLIGENCE (TABLE 4.17 BREAKDOWN)
// -------------------------------------------------------------

export const DISTRICT_PADDY_DATA: DistrictPaddyProfile[] = [
  {
    districtName: 'Anantnag',
    highYieldingPaddyAreaHa: 25480,
    shareOfKashmirPaddyPercent: 21.1,
    totalNetSownAreaHa: 44200,
    croppingIntensityPercent: 148,
    primaryIrrigationSource: 'Lidder, Bringi & Brengi River Gravity Canals (Kuhls)',
    paddyConversionPressure: 'High',
    dominantPaddyVarieties: ['Jhelum (K-39)', 'Shalimar Rice-1', 'Mushkbudji (Sagam pocket)'],
    keyEnvironmentalReceptors: 'Upper Jhelum River mainstem, Bringi trout stream, and spring recharge zones'
  },
  {
    districtName: 'Baramulla',
    highYieldingPaddyAreaHa: 20350,
    shareOfKashmirPaddyPercent: 16.9,
    totalNetSownAreaHa: 48900,
    croppingIntensityPercent: 135,
    primaryIrrigationSource: 'Lower Jhelum Lift Schemes & Ningli Stream',
    paddyConversionPressure: 'Severe',
    dominantPaddyVarieties: ['Shalimar Rice-3', 'Jhelum', 'Chenab'],
    keyEnvironmentalReceptors: 'Wular Lake southern shoreline, Pohru River confluence, and Lower Jhelum flood spill'
  },
  {
    districtName: 'Pulwama',
    highYieldingPaddyAreaHa: 18240,
    shareOfKashmirPaddyPercent: 15.1,
    totalNetSownAreaHa: 36800,
    croppingIntensityPercent: 152,
    primaryIrrigationSource: 'Rambiara, Romshi stream diversions & Awantipora Lift',
    paddyConversionPressure: 'Severe',
    dominantPaddyVarieties: ['Jhelum', 'Shalimar Rice-1', 'SR-2'],
    keyEnvironmentalReceptors: 'Romshi canal network and middle Jhelum riverine wetlands'
  },
  {
    districtName: 'Kupwara',
    highYieldingPaddyAreaHa: 15120,
    shareOfKashmirPaddyPercent: 12.5,
    totalNetSownAreaHa: 39500,
    croppingIntensityPercent: 128,
    primaryIrrigationSource: 'Pohru, Mawer & Kehmil hill stream Kuhls',
    paddyConversionPressure: 'Moderate',
    dominantPaddyVarieties: ['K-39', 'Shalimar Rice-4 (Cold tolerant)', 'Local White'],
    keyEnvironmentalReceptors: 'Pohru River riparian channels and Lolab Valley hill springs'
  },
  {
    districtName: 'Budgam',
    highYieldingPaddyAreaHa: 14350,
    shareOfKashmirPaddyPercent: 11.9,
    totalNetSownAreaHa: 38200,
    croppingIntensityPercent: 142,
    primaryIrrigationSource: 'Sukhnag, Doodh Ganga & Shaliganga stream canals',
    paddyConversionPressure: 'Severe',
    dominantPaddyVarieties: ['Jhelum', 'Shalimar Rice-3', 'Local Zag (Red rice)'],
    keyEnvironmentalReceptors: 'Hokersar Wetland Ramsar Site perimeter and Doodh Ganga flood spill'
  },
  {
    districtName: 'Kulgam',
    highYieldingPaddyAreaHa: 13420,
    shareOfKashmirPaddyPercent: 11.1,
    totalNetSownAreaHa: 28400,
    croppingIntensityPercent: 145,
    primaryIrrigationSource: 'Veshav River gravity Kuhls & seasonal springs',
    paddyConversionPressure: 'High',
    dominantPaddyVarieties: ['Jhelum', 'Shalimar Rice-1', 'K-39'],
    keyEnvironmentalReceptors: 'Veshav River alluvial floodplains and coldwater fisheries'
  },
  {
    districtName: 'Bandipora',
    highYieldingPaddyAreaHa: 7280,
    shareOfKashmirPaddyPercent: 6.0,
    totalNetSownAreaHa: 16800,
    croppingIntensityPercent: 138,
    primaryIrrigationSource: 'Madhumati & Erin torrents + Wular lake perimeter lifts',
    paddyConversionPressure: 'High',
    dominantPaddyVarieties: ['Shalimar Rice-3', 'Jhelum'],
    keyEnvironmentalReceptors: 'Wular Lake Ramsar Wetland littoral zones and Erin River delta'
  },
  {
    districtName: 'Ganderbal',
    highYieldingPaddyAreaHa: 4810,
    shareOfKashmirPaddyPercent: 4.0,
    totalNetSownAreaHa: 14200,
    croppingIntensityPercent: 132,
    primaryIrrigationSource: 'Sindh River canals & Manasbal perimeter lifts',
    paddyConversionPressure: 'High',
    dominantPaddyVarieties: ['Shalimar Rice-1', 'Jhelum'],
    keyEnvironmentalReceptors: 'Sindh River mainstem, Anchar Lake, and Shallabugh Wetland Bird Sanctuary'
  },
  {
    districtName: 'Srinagar',
    highYieldingPaddyAreaHa: 1120,
    shareOfKashmirPaddyPercent: 0.9,
    totalNetSownAreaHa: 4500,
    croppingIntensityPercent: 120,
    primaryIrrigationSource: 'Tail-end canals & municipal drainage return flows',
    paddyConversionPressure: 'Severe',
    dominantPaddyVarieties: ['Jhelum'],
    keyEnvironmentalReceptors: 'Mir Behri wetland perimeter and Hokersar outflow canal'
  },
  {
    districtName: 'Shopian',
    highYieldingPaddyAreaHa: 450,
    shareOfKashmirPaddyPercent: 0.4,
    totalNetSownAreaHa: 26400,
    croppingIntensityPercent: 108,
    primaryIrrigationSource: 'Rambiara headwaters & small hill springs',
    paddyConversionPressure: 'Severe',
    dominantPaddyVarieties: ['Cold-tolerant local varieties & K-39'],
    keyEnvironmentalReceptors: 'Rambiara boulder bed and upper sub-catchment springs'
  }
];

// -------------------------------------------------------------
// 3. THE 8 DEDICATED CROP AND FARMING-SYSTEM EIA DOSSIERS
// -------------------------------------------------------------

export const CROP_FARMING_SYSTEM_DOSSIERS: CropFarmingSystemDossier[] = [
  {
    id: 'sys-rice-paddy',
    systemName: 'Rice & Paddy Agroecosystem EIA',
    vernacularName: 'Daani Khet (Flood-Irrigated Rice)',
    category: 'Major Wetland Cereal',
    kashmirAreaCoverageHa: '120,620 ha (HYV) / ~135,000 ha Total',
    annualProductionVolume: 'Approx. 520,000 – 580,000 MT Paddy Grain',
    primaryDistricts: ['Anantnag', 'Baramulla', 'Pulwama', 'Kupwara', 'Budgam', 'Kulgam'],
    systemCharacteristics: {
      croppingPattern: 'Single-season kharif monoculture (May–October), followed by winter fallow, mustard, or oats fodder.',
      waterDemandAndSource: 'Heavy water demand: 1,100–1,400 mm per crop season, supplied through ancient snowmelt gravity canals (Kuhls) and river lift irrigation.',
      nutrientAndSoilRegime: 'Submerged alluvial clay-loam soils; intensive synthetic urea broadcasting alongside diammonium phosphate (DAP).',
      energyAndEmissions: 'Seasonal anaerobic methane (CH4) emissions from flooded paddy soils; low operational mechanization compared to Indo-Gangetic plains.',
      biodiversityAndEcosystemServices: 'Seasonal aquatic wetland habitat supporting amphibians, dragonflies, migratory egrets, and pond herons during summer breeding.'
    },
    environmentalPressures: [
      'Rapid loss of prime alluvial paddy soils to residential colonies, commercial earth-filling, and brick kilns',
      'Diffuse nitrogen (N) and phosphorus (P) leaching into downstream wetland basins during peak post-transplant fertilizer broadcasting',
      'Seasonal methane (CH4) emissions under continuous submergence water regimes'
    ],
    ecologicalBenefitsAndStrengths: [
      'Vital seasonal flood attenuation: valley-floor paddies act as temporary retention sponges during peak Jhelum summer discharge',
      'Recharge of shallow unconfined village aquifers across floodplain terraces',
      'Straw biomass is 100% harvested and preserved for winter cattle feed, avoiding open-air stubble burning seen in northern plains'
    ],
    scientificIndicators: [
      'Annual Paddy-to-Construction Land Conversion Rate (ha/year)',
      'Specific Nitrogen Leachate Load at Drainage Outfalls (kg N/ha/season)',
      'Flooded Paddy Soil Methane Flux (mg CH4 / m² / day)',
      'Canal Water Productivity (kg grain / m³ water diverted)'
    ],
    mitigationAndResilienceOptions: [
      'Alternate Wetting and Drying (AWD) water management reducing irrigation withdrawals by 25% and methane by 35%',
      'Strict statutory enforcement of J&K Land Revenue Act Section 133A prohibiting non-agricultural conversion of notified paddy land',
      'Integration of neem-coated urea and leaf color chart (LCC) split applications'
    ],
    sourceReference: 'SKUAST-K Khudwani Rice Research Station & Directorate of Agriculture Kashmir'
  },
  {
    id: 'sys-maize-mountain',
    systemName: 'Maize & Mountain Farming EIA',
    vernacularName: 'Makki (Hill Terrace Agroecosystem)',
    category: 'Rainfed Hill Cereal',
    kashmirAreaCoverageHa: '65,380 ha (HYV) / ~82,000 ha Total',
    annualProductionVolume: 'Approx. 160,000 – 190,000 MT Grain',
    primaryDistricts: ['Kupwara', 'Anantnag', 'Baramulla', 'Budgam', 'Bandipora'],
    systemCharacteristics: {
      croppingPattern: 'Kharif crop grown on sloping mountain terraces, Karewa margins, and rainfed foothill tracts (1,600m–2,300m amsl).',
      waterDemandAndSource: 'Almost 100% rainfed; highly dependent on western disturbances and early summer rainfall.',
      nutrientAndSoilRegime: 'Shallow stony mountain inceptisols; heavily reliant on farmyard manure (FYM) mixed with modest chemical inputs.',
      energyAndEmissions: 'Bullock-plowed and manual hoeing on steep contours; very low operational fossil energy consumption.',
      biodiversityAndEcosystemServices: 'Intercropped with climbing kidney beans (Rajma) and pumpkins, sustaining high traditional agro-biodiversity.'
    },
    environmentalPressures: [
      'Sheet and rill soil erosion on steep slopes under conventional downslope tillage during heavy torrential summer storms',
      'Acute yield vulnerability to prolonged summer rainless spells and shifting precipitation windows',
      'Human-wildlife conflict along forest edges (Black bear and wild boar foraging)'
    ],
    ecologicalBenefitsAndStrengths: [
      'Low chemical footprint: minimal synthetic pesticide usage compared to commercial valley fruit crops',
      'Traditional legume intercropping fixes atmospheric nitrogen naturally, preserving mountain soil organic carbon',
      'Critical subsistence nutrition and winter livestock fodder for tribal Gujjar and Bakarwal agro-pastoral communities'
    ],
    scientificIndicators: [
      'Hillside Soil Loss Rate under Contour vs Conventional Tillage (tonnes/ha/year)',
      'Rainfall Use Efficiency (RUE in kg grain/ha/mm precipitation)',
      'Intercropping Diversity Index (Shannon-Wiener score across mountain plots)',
      'Slope Stability and Landslide Mitigation Index on Terraced Ridges'
    ],
    mitigationAndResilienceOptions: [
      'Promotion of vegetative contour hedgerows using vetiver and local nitrogen-fixing shrubs',
      'Adoption of zero-tillage or minimum-tillage maize farming on slopes exceeding 15% gradient',
      'Expansion of drought-tolerant composite varieties bred by SKUAST-K'
    ],
    sourceReference: 'ICAR Mountain Agriculture Research Framework & SKUAST-K Wadura Faculty'
  },
  {
    id: 'sys-wheat-barley',
    systemName: 'Wheat, Barley & Cereal Rotations EIA',
    vernacularName: 'Kanak & Jow (Rabi Season Crops)',
    category: 'Winter Rabi Cereal',
    kashmirAreaCoverageHa: 'Approx. 18,500 ha',
    annualProductionVolume: 'Approx. 35,000 – 42,000 MT Grain',
    primaryDistricts: ['Baramulla', 'Kupwara', 'Anantnag', 'Budgam'],
    systemCharacteristics: {
      croppingPattern: 'Winter rabi season crop sown in October–November before snowfall, overwintering under snow cover, harvested in May–June.',
      waterDemandAndSource: 'Grown on residual soil moisture and winter snowfall snow-water equivalents; minimal supplemental canal watering.',
      nutrientAndSoilRegime: 'Prevents winter soil erosion and nutrient leaching on otherwise bare post-paddy fallows.',
      energyAndEmissions: 'Low operational energy; straw is mechanically threshed and prized as dry winter cattle fodder.',
      biodiversityAndEcosystemServices: 'Provides vital green vegetative ground cover during critical late-winter melt months.'
    },
    environmentalPressures: [
      'Declining acreage due to early-autumn orchard planting and farmer reluctance to manage double-cropping labor windows',
      'Vulnerability to terminal heat stress and early spring desiccation during March-April grain filling'
    ],
    ecologicalBenefitsAndStrengths: [
      'Protects topsoil from hydraulic scouring during spring snowmelt downpours',
      'Breaks pest and disease cycles in rotational paddy-wheat sequences',
      'High biomass circularity: zero field residue burning'
    ],
    scientificIndicators: [
      'Winter Vegetative Soil Cover Fraction (% arable land covered Nov-March)',
      'Spring Snowmelt Soil Erosion Reduction Factor',
      'Rabi Crop Water Productivity (kg grain / mm winter precipitation)'
    ],
    mitigationAndResilienceOptions: [
      'Promotion of short-duration winter wheat varieties fitting tightly between paddy harvest and spring transplanting',
      'Community seed banks for cold-resilient barley selections suited to high-altitude border valleys'
    ],
    sourceReference: 'Department of Agriculture Kashmir Rabi Production Protocols'
  },
  {
    id: 'sys-pulses-oilseeds',
    systemName: 'Pulses & Oilseeds Ecosystem EIA',
    vernacularName: 'Tilgogul & Dal (Mustard, Moong, Rajmash)',
    category: 'Nitrogen-Fixing Oilseeds',
    kashmirAreaCoverageHa: 'Approx. 68,000 ha (Mustard ~52,000 ha, Pulses ~16,000 ha)',
    annualProductionVolume: 'Approx. 45,000 MT Mustard Seed / 18,000 MT Pulses',
    primaryDistricts: ['Anantnag', 'Pulwama', 'Budgam', 'Kulgam', 'Baramulla'],
    systemCharacteristics: {
      croppingPattern: 'Mustard (Brassica rapa / Tilgogul) sown as winter rabi cover crop after paddy; pulses grown as kharif catch crops or hill intercrops.',
      waterDemandAndSource: 'Low water requirement; utilizes residual autumn soil moisture and winter precipitation.',
      nutrientAndSoilRegime: 'Pulses fix 40–70 kg atmospheric N/ha through symbiotic Rhizobium nodules, replenishing depleted paddy soils.',
      energyAndEmissions: 'Very low carbon footprint; oil extraction residues (mustard oilcake) recycled as organic soil fertilizer and cattle feed.',
      biodiversityAndEcosystemServices: 'The spectacular April yellow mustard bloom provides the primary early-spring pollen and nectar source for reviving honeybee colonies (Apis cerana & Apis mellifera).'
    },
    environmentalPressures: [
      'Weed competition and aphid infestations during sudden warm spells in March',
      'Unseasonal early-spring snowfalls flattening flowering mustard canopies'
    ],
    ecologicalBenefitsAndStrengths: [
      'Foundational pollinator sanctuary: single most important early-season forage base for Kashmir honeybees and wild solitary bees',
      'Natural biological nitrogen fixation reducing chemical urea requirements in subsequent summer crops by 20–30%',
      'Exceptional agricultural circularity: oilcake by-products return 100% of organic nitrogen and minerals to local soils'
    ],
    scientificIndicators: [
      'Symbiotic Nitrogen Contribution to Soil Nitrogen Balance (kg N fixed / ha)',
      'Early-Spring Honeybee Foraging Density (bees / m² canopy / 10 min in April)',
      'Soil Microbial Biomass Nitrogen Enhancement Post-Pulse Crop'
    ],
    mitigationAndResilienceOptions: [
      'Incentivizing zero-tillage mustard relay seeding into standing paddy stubble to conserve moisture',
      'Integration of biological control agents for mustard aphid management replacing organophosphate sprays'
    ],
    sourceReference: 'SKUAST-K Oilseeds & Pulses Research Station & ICAR-DRMR'
  },
  {
    id: 'sys-vegetables-potato',
    systemName: 'Vegetables & Commercial Potato EIA',
    vernacularName: 'Sabzi & Aloo (Intensive Market Gardening)',
    category: 'Intensive Horticulture-Adjacent',
    kashmirAreaCoverageHa: '79,870 ha (HYV Vegetable Varieties)',
    annualProductionVolume: 'Approx. 1,420,000 MT Fresh Vegetables & Potatoes',
    primaryDistricts: ['Budgam', 'Srinagar', 'Pulwama', 'Baramulla', 'Anantnag'],
    systemCharacteristics: {
      croppingPattern: 'High-intensity multi-cropping (2 to 4 crops/year) in peri-urban belts: knol-khol, cabbage, collard greens (Haakh), tomatoes, garlic, potatoes.',
      waterDemandAndSource: 'Continuous, frequent micro-irrigation; tube wells, lift schemes, and municipal drain diversions in peri-urban zones.',
      nutrientAndSoilRegime: 'Heaviest fertilizer application in Kashmir agriculture: synthetic NPK combined with poultry manure and cow dung.',
      energyAndEmissions: 'High input intensity; diesel pump operation; expanding use of low-density polyethylene (LDPE) plastic mulching and poly-tunnels.',
      biodiversityAndEcosystemServices: 'High agro-economic returns; supplies Srinagar and export corridors; minimal wildlife habitat value.'
    },
    environmentalPressures: [
      'Heavy chemical pesticide application frequency (up to 8 sprays/season for blight and diamondback moth)',
      'Residual plastic mulch film fragmentation contaminating topsoils and entering village drainage channels',
      'Nutrient leaching and nitrate accumulation in shallow unconfined groundwater tables beneath intensive vegetable belts'
    ],
    ecologicalBenefitsAndStrengths: [
      'Exceptional economic land productivity: generates 4x to 6x the household revenue per hectare compared to cereal monocultures',
      'High labor absorption supporting smallholder and landless farming households'
    ],
    scientificIndicators: [
      'Pesticide Active Ingredient Application Rate in Vegetable Belts (kg AI/ha/year)',
      'Residual Plastic Mulch Film Mass in Soil (kg micro-plastic / ha)',
      'Nitrate Concentration in Vegetable Farm Irrigation Wells (mg/L NO3-N)'
    ],
    mitigationAndResilienceOptions: [
      'Mandatory phase-out of sub-50-micron non-biodegradable plastic mulches in favor of certified compostable corn-starch films',
      'Expansion of organic bio-pesticide formulations and pheromone mass-trapping for vegetable pests'
    ],
    sourceReference: 'Directorate of Agriculture Kashmir Vegetable Mission & JKPCC Farm Residue Audits'
  },
  {
    id: 'sys-floating-wetland',
    systemName: 'Floating, Wetland-Adjacent & Lake Agriculture EIA',
    vernacularName: 'Radh & Demb (Dal & Anchar Lacustrine Farming)',
    category: 'Lacustrine Wetland Agriculture',
    kashmirAreaCoverageHa: 'Approx. 1,850 ha (Lake demb lands & floating gardens)',
    annualProductionVolume: 'Approx. 38,000 MT Organic Fresh Produce',
    primaryDistricts: ['Srinagar (Dal Lake, Anchar Lake)', 'Bandipora (Wular fringes)'],
    systemCharacteristics: {
      croppingPattern: 'Floating rafts (Radh) woven from aquatic reeds (Typha angustifolia) and enriched with lake muck/peat; continuous production of cucumber, tomato, melons, and Nadroo (lotus root).',
      waterDemandAndSource: 'Hydroponic root interface: roots suspend directly into lake water; zero artificial irrigation pumping required.',
      nutrientAndSoilRegime: '100% organic nutrient extraction from lake bottom silt and decomposed aquatic macrophytes (Ceratophyllum, Potamogeton).',
      energyAndEmissions: 'Zero motorized farm equipment; all tilling, harvesting, and transport conducted via manual wooden paddle shikaras.',
      biodiversityAndEcosystemServices: 'Unique cultural heritage agroecosystem providing livelihood for thousands of Mir Bahri lake dwellers; high aquatic bird nesting interface.'
    },
    environmentalPressures: [
      'Nutrient leaching and resuspension of organic silt into enclosed lake basins during aggressive bed weeding',
      'Pesticide drift into sensitive shallow fish nurseries where chemical fungicides are applied to floating cucumber crops',
      'Physical expansion of semi-permanent Demb land reclamations into open water navigational channels'
    ],
    ecologicalBenefitsAndStrengths: [
      'Active nutrient harvesting: extracts tons of excess nitrogen and phosphorus from eutrophic lake water through weed harvesting',
      'Zero fossil energy consumption in tillage, watering, and harvest logistics',
      'Outstanding agro-cultural living heritage unique in the Western Himalayas'
    ],
    scientificIndicators: [
      'Net Nutrient (N & P) Extraction Balance via Macrophyte Compost Harvesting (tonnes/year)',
      'Lake Sediment Resuspension Index during Floating Bed Manipulation',
      'Total Demb Land Surface Area Tracking via High-Res PlanetScope Imagery (ha)'
    ],
    mitigationAndResilienceOptions: [
      'Strict legal ban on synthetic chemical pesticide applications on all floating beds within Dal and Anchar lakes',
      'Enforcement of Lake Conservation & Management Authority (LCMA) demarcation boundaries prohibiting demb expansion'
    ],
    sourceReference: 'LCMA Scientific Division & SKUAST-K Division of Aquatic Environmental Management'
  },
  {
    id: 'sys-integrated-livestock',
    systemName: 'Integrated & Livestock-Linked Farming EIA',
    vernacularName: 'Khandan & Maldar (Crop-Livestock Nutrient Cycling)',
    category: 'Livestock Nutrient Cycling',
    kashmirAreaCoverageHa: 'Cross-cutting across ~210,000 smallholder holdings',
    annualProductionVolume: 'Manure cycling: >1.8M tonnes Farmyard Manure (FYM)',
    primaryDistricts: ['All 10 Kashmir Districts'],
    systemCharacteristics: {
      croppingPattern: 'Integration of dairy cattle, sheep, and backyard poultry with cereal paddies, orchards, and fodder plots.',
      waterDemandAndSource: 'Livestock drinking and wash-water drawn from local streams, spring tanks, and community taps.',
      nutrientAndSoilRegime: 'Farmyard manure (FYM) is the primary traditional organic soil conditioner; cow dung is aged in compost pits and spread before spring plowing.',
      energyAndEmissions: 'Enteric fermentation methane from dairy cows and sheep; nitrous oxide from manure storage heaps.',
      biodiversityAndEcosystemServices: 'Maintains circular nutrient loops; preserves indigenous cattle genetics and local sheep breeds.'
    },
    environmentalPressures: [
      'Uncovered manure heaps leaching ammonia and nitrates into village drainage ditches during heavy rainfall',
      'Overgrazing on alpine meadows (Margs) and forest fringes causing localized gully erosion and turf degradation',
      'Enteric methane emissions from poorly digested high-fiber straw diets'
    ],
    ecologicalBenefitsAndStrengths: [
      'Foundational soil organic carbon (SOC) builder: FYM application maintains microbial biomass and soil porosity',
      'Complete utilization of agricultural crop residues: paddy straw, maize stover, and weed thinnings converted to animal protein',
      'Reduces smallholder dependence on expensive chemical synthetic fertilizers by 30–50%'
    ],
    scientificIndicators: [
      'Farmyard Manure Application Rate across Smallholder Holdings (tonnes/ha/year)',
      'Manure Storage Nitrate Leaching Index to Shallow Groundwater',
      'Enteric Methane Emission Factor per Livestock Functional Unit (kg CH4 / cow / year)'
    ],
    mitigationAndResilienceOptions: [
      'Construction of covered, concrete-lined manure composting pits preventing runoff and preserving nitrogen value',
      'Promotion of silage making and mineral lick blocks improving feed digestibility and reducing methane output by 20%'
    ],
    sourceReference: 'Directorate of Animal Husbandry Kashmir & ICAR-NDRI Hill Station'
  },
  {
    id: 'sys-traditional-agroecology',
    systemName: 'Traditional, Organic & Heritage Agroecology EIA',
    vernacularName: 'Mushkbudji, Kamad & Qadeem Kheti',
    category: 'Heritage Agroecology',
    kashmirAreaCoverageHa: 'Approx. 8,500 ha (Certified & De-facto Organic)',
    annualProductionVolume: 'Approx. 18,000 MT Specialty Heritage Grain',
    primaryDistricts: ['Anantnag (Sagam)', 'Budgam (Khag)', 'Kupwara (Karnah)', 'Bandipora (Gurez)'],
    systemCharacteristics: {
      croppingPattern: 'Cultivation of indigenous landraces: scented rice (Mushkbudji, Kamad, Baber), red rice (Zag), high-altitude millets (Pingi), and heirloom pulses.',
      waterDemandAndSource: 'Fed by pristine high-altitude glacial streams and cold hill springs.',
      nutrientAndSoilRegime: 'Strict reliance on organic manure, green leaf mulching from forest willow/walnut foliage, and bio-fertilizers.',
      energyAndEmissions: 'Lowest carbon intensity in Himalayan agriculture: near-zero synthetic inputs and manual harvesting.',
      biodiversityAndEcosystemServices: 'Invaluable in-situ genetic reservoir of cold-tolerant, blast-resistant, and climate-resilient native germplasm.'
    },
    environmentalPressures: [
      'Genetic erosion driven by widespread adoption of uniform high-yielding varieties (HYVs)',
      'Severe susceptibility of heritage Mushkbudji to rice blast (Pyricularia oryzae) under damp humid microclimates',
      'Market vulnerability and premium price volatility without certified GI protection'
    ],
    ecologicalBenefitsAndStrengths: [
      'Highest soil biodiversity and microbial population indices in the Western Himalayas',
      'Zero synthetic agrochemical runoff into sensitive coldwater trout streams',
      'Preservation of irreplaceable agricultural biodiversity and mountain cultural heritage'
    ],
    scientificIndicators: [
      'Heritage Germplasm In-Situ Preservation Index (% landraces conserved in active cultivation)',
      'Soil Microbial Dehydrogenase & Enzymatic Activity in Organic vs Conventional Soils',
      'Crop Genetic Heterogeneity and Resilience to Extreme Weather Swings'
    ],
    mitigationAndResilienceOptions: [
      'Purification and distribution of disease-free blast-resistant breeder seeds developed by SKUAST-K',
      'Expansion of Geographical Indication (GI) certification for Mushkbudji and Zag rice with blockchain traceability',
      'Payment for Agrobiodiversity Conservation Services (PACS) directly compensating heritage seed guardians'
    ],
    sourceReference: 'SKUAST-K Sagam Heritage Rice Project & National Bureau of Plant Genetic Resources (NBPGR)'
  }
];

// -------------------------------------------------------------
// 4. THE 10 SCIENTIFIC ASSESSMENT PILLARS
// -------------------------------------------------------------

export const THE_TEN_AGRI_ASSESSMENT_PILLARS: AgriAssessmentPillar[] = [
  {
    pillarCode: 'PIL-AG-01',
    name: 'Agricultural Census & Land Systems Intelligence',
    scopeSummary: 'Auditing net sown area, gross cropped area, cropping intensity, operational holding size distribution, and land tenure across all 10 districts.',
    coreMeasurements: [
      'Net Sown Area vs Gross Cropped Area (Hectares)',
      'Cropping Intensity Ratio (%)',
      'Average Operational Holding Size (Ha per farming household)',
      'Marginal and Smallholder Land Fraction (<1 Ha holdings %)'
    ],
    fieldMethods: ['Village revenue ledger (Girdawari) cross-audits', 'Farmer holding door-to-door survey samples'],
    remoteSensingAndModeling: ['Sentinel-2 high-res LULC seasonal classification', 'Copernicus Global Land Cover multi-temporal mapping'],
    statutoryAndPolicyBenchmarks: ['National Policy for Farmers', 'J&K Agriculture Policy Framework'],
    leadAgency: 'Directorate of Economics & Statistics & Revenue Department J&K'
  },
  {
    pillarCode: 'PIL-AG-02',
    name: 'Agricultural Land-Use Conversion & Soil Sealing',
    scopeSummary: 'Rigorous satellite-guided tracking of prime alluvial paddy soil conversion into brick kilns, residential settlements, commercial complexes, and orchards.',
    coreMeasurements: [
      'Annual Prime Paddy Land Conversion Rate (ha/year)',
      'Soil Sealing and Impervious Surface Spread across Farmland (km²)',
      'Farmland Fragmentation Index (parcel size reduction metric)',
      'Brick Kiln Spatial Footprint on Irrigated Alluvial Soils (ha)'
    ],
    fieldMethods: ['Differential GPS boundary validation on contested parcels', 'Sub-division revenue violation audits'],
    remoteSensingAndModeling: ['Landsat 30-year time-series change detection', 'PlanetScope 3m monthly high-res urban encroachment audits'],
    statutoryAndPolicyBenchmarks: ['J&K Land Revenue Act (Section 133A restrictions on conversion)', 'J&K Brick Kilns (Regulation) Act 2010'],
    leadAgency: 'Department of Ecology, Environment & Remote Sensing & Revenue Dept'
  },
  {
    pillarCode: 'PIL-AG-03',
    name: 'Soil Health, Fertility & Soil Carbon Dynamics',
    scopeSummary: 'Quantifying soil organic carbon (SOC) stocks, macro/micronutrient depletion, soil pH shifts, compaction from heavy machinery, and erosion rates.',
    coreMeasurements: [
      'Soil Organic Carbon (SOC) Stock in Top 0-30cm (tonnes C / ha)',
      'Soil pH and Electrical Conductivity (Salinity index)',
      'Available Nitrogen (N), Phosphorus (P2O5), Potassium (K2O) Balances (kg/ha)',
      'Soil Microbial Biomass Nitrogen & Enzymatic Activity'
    ],
    fieldMethods: ['Walkley-Black wet oxidation organic carbon testing', 'Core cutter bulk density sampling', 'Dehydrogenase enzyme assays'],
    remoteSensingAndModeling: ['Digital Soil Mapping (DSM) at 30m resolution', 'RothC soil carbon turnover simulation model'],
    statutoryAndPolicyBenchmarks: ['National Soil Health Card Scheme Norms', 'FAO Soil Organic Carbon Guidelines'],
    leadAgency: 'Directorate of Agriculture Kashmir & ICAR-NBSS&LUP'
  },
  {
    pillarCode: 'PIL-AG-04',
    name: 'Water Withdrawals, Irrigation & Kuhl Networks',
    scopeSummary: 'Evaluating water abstractions from river tributaries, ancient gravity canal (Kuhl) efficiency, groundwater pumping, and seasonal water productivity.',
    coreMeasurements: [
      'Annual Irrigation Water Abstraction from Jhelum Basin (Million Cubic Meters)',
      'Kuhl Canal Conveyance Efficiency (%)',
      'Crop Water Productivity (kg crop grain / m³ water consumed)',
      'Seasonal Streamflow Depletion in Upstream Trout Tributaries (%)'
    ],
    fieldMethods: ['V-notch weir discharge metering on primary Kuhls', 'In-line magnetic flow meters on lift irrigation pumping stations'],
    remoteSensingAndModeling: ['FAO WaPOR evapotranspiration time-series', 'SWAT hydrological basin runoff modeling'],
    statutoryAndPolicyBenchmarks: ['J&K Water Resources (Regulation and Management) Act 2010', 'CWC Ecological Flow Guidelines'],
    leadAgency: 'Jal Shakti Department (Irrigation & Flood Control) & EcoWatch Hydro Unit'
  },
  {
    pillarCode: 'PIL-AG-05',
    name: 'Fertilizer & Nutrient Pollution Pathways',
    scopeSummary: 'Mass-balance accounting of synthetic nitrogen (urea) and phosphorus (DAP) application, surface runoff, groundwater leaching, and wetland loading.',
    coreMeasurements: [
      'Synthetic Nitrogen (N) Application Rate (kg N / ha / crop)',
      'Synthetic Phosphorus (P2O5) Application Rate (kg P / ha / crop)',
      'Nitrate-Nitrogen Concentration in Drainage Outfalls (mg/L NO3-N)',
      'Total Phosphate Surplus Entering Riparian Waterways (kg P / km stream)'
    ],
    fieldMethods: ['Automated ISCO composite water sampling during post-transplant cycles', 'Continuous ion-selective nitrate sensor logging'],
    remoteSensingAndModeling: ['SPARROW (Spatially Referenced Regressions on Watershed Attributes) nutrient export models'],
    statutoryAndPolicyBenchmarks: ['Water (Prevention and Control of Pollution) Act 1974', 'CPCB Aquatic Life Standards'],
    leadAgency: 'J&K Pollution Control Committee (JKPCC) & SKUAST-K'
  },
  {
    pillarCode: 'PIL-AG-06',
    name: 'Pesticide & Agrochemical Ecotoxicology',
    scopeSummary: 'Auditing active ingredient (AI) usage, herbicide spraying in paddies (e.g. Butachlor, Pretilachlor), residues in irrigation runoff, and aquatic toxicity.',
    coreMeasurements: [
      'Pesticide Active Ingredient Application Intensity (kg AI / ha / season)',
      'Paddy Herbicide Residue Concentration in Stream Drainage (µg/L)',
      'Farmer Protective Equipment (PPE) Adoption Rate (%)',
      'Acute Aquatic Toxic Hazard Quotient for Native Coldwater Fish'
    ],
    fieldMethods: ['Gas Chromatography-Mass Spectrometry (GC-MS) residue testing in drainage silt', 'Farmer pesticide retail invoice audits'],
    remoteSensingAndModeling: ['Pesticide Environmental Risk Indicator (PERI) spatial modeling'],
    statutoryAndPolicyBenchmarks: ['Insecticides Act 1968', 'FSSAI Maximum Residue Limits (MRLs)'],
    leadAgency: 'Directorate of Agriculture & JKPCC Toxicology Division'
  },
  {
    pillarCode: 'PIL-AG-07',
    name: 'Agricultural Biodiversity & Field Ecosystems',
    scopeSummary: 'Monitoring genetic diversity of cultivated crop varieties, soil macroinvertebrate health (earthworms), and field-edge pollinator sanctuaries.',
    coreMeasurements: [
      'Crop Genetic Heterogeneity Index (varietal diversification score)',
      'Earthworm Density and Biomass in Paddy and Upland Soils (individuals / m²)',
      'Pollinator Visitation Frequencies along Agricultural Field Margins',
      'Beneficial Predatory Arthropod Density (Spiders, Carabid beetles)'
    ],
    fieldMethods: ['Standardized 1m² quadrat soil excavation for earthworm counts', 'Pan trap and sweep net insect transects during bloom'],
    remoteSensingAndModeling: ['InVEST Crop Pollination and Habitat Quality Models'],
    statutoryAndPolicyBenchmarks: ['Biological Diversity Act 2002', 'National Mission on Sustainable Agriculture'],
    leadAgency: 'J&K Biodiversity Council & University of Kashmir Zoology Dept'
  },
  {
    pillarCode: 'PIL-AG-08',
    name: 'Agricultural Climate, Carbon & Greenhouse Gases',
    scopeSummary: 'Quantifying seasonal methane (CH4) emissions from flooded paddies, nitrous oxide (N2O) from fertilized soils, and crop residue carbon flows.',
    coreMeasurements: [
      'Seasonal Methane (CH4) Flux from Submerged Paddies (kg CH4 / ha / season)',
      'Direct and Indirect Nitrous Oxide (N2O) Emissions (kg N2O / ha / year)',
      'Crop Residue Utilization Fraction (% harvested for cattle fodder vs burned)',
      'Net Agricultural Greenhouse Gas Intensity (kg CO2e / tonne grain)'
    ],
    fieldMethods: ['Closed chamber gas chromatography sampling over flooded paddies', 'Farm residue harvest balance weighing surveys'],
    remoteSensingAndModeling: ['IPCC Tier-2 Rice Methane Emission modeling', 'DNDC (DeNitrification-DeComposition) biogeochemical simulations'],
    statutoryAndPolicyBenchmarks: ['IPCC AR6 Greenhouse Gas Inventory Guidelines', 'SAPCC J&K Climate Mission'],
    leadAgency: 'Department of Ecology, Environment & Remote Sensing & SKUAST-K'
  },
  {
    pillarCode: 'PIL-AG-09',
    name: 'Climate Vulnerability & Crop Water Stress',
    scopeSummary: 'Assessing vulnerability to late-spring frost, summer drought, shifting snowmelt hydrographs, hail storms, and changing agro-climatic envelopes.',
    coreMeasurements: [
      'Growing Season Precipitation Anomaly Index (Standardized Precipitation Index)',
      'Spring Snowmelt Water Arrival Date Shift (days shift / decade)',
      'Heat Stress Degree-Days during Critical Rice Flowering Windows',
      'Crop Yield Variability Ratio under Extreme Climate Events'
    ],
    fieldMethods: ['Automated Weather Station (AWS) micro-meteorology networks', 'Phenological stage BBCH photo monitoring across sentinel farms'],
    remoteSensingAndModeling: ['MODIS/Sentinel-2 Normalized Difference Water Index (NDWI)', 'Downscaled IPCC climate change projections for Jhelum Basin'],
    statutoryAndPolicyBenchmarks: ['Pradhan Mantri Fasal Bima Yojana (PMFBY)', 'WMO Climate Normals'],
    leadAgency: 'India Meteorological Department (IMD Srinagar) & EcoWatch Weather Grid'
  },
  {
    pillarCode: 'PIL-AG-10',
    name: 'Agroecology, Conservation & Circular Transition',
    scopeSummary: 'Monitoring adoption of sustainable soil management: vermicomposting, bio-fertilizers, Alternate Wetting and Drying (AWD), and heritage seed stewardship.',
    coreMeasurements: [
      'Area under Certified Organic & Natural Farming (Hectares & % net sown)',
      'Adoption Rate of Alternate Wetting and Drying (AWD) in Paddies (%)',
      'Farmyard Manure (FYM) and Bio-Fertilizer Sown Acreage (Ha)',
      'Community Kuhl Irrigation Water User Association (WUA) Functionality Score'
    ],
    fieldMethods: ['Third-party organic certification audit trail checks', 'Water user committee interview audits'],
    remoteSensingAndModeling: ['Agroecological resilience composite index scoring algorithms'],
    statutoryAndPolicyBenchmarks: ['Paramparagat Krishi Vikas Yojana (PKVY)', 'National Mission for Sustainable Agriculture (NMSA)'],
    leadAgency: 'Directorate of Agriculture Kashmir & National Centre of Organic Farming'
  }
];

// -------------------------------------------------------------
// 5. WULAR LAKE FLAGSHIP CUMULATIVE-IMPACT STUDY MODEL
// -------------------------------------------------------------

export const WULAR_CUMULATIVE_DRIVERS: WularCatchmentDriver[] = [
  {
    stressorSource: 'Agricultural Nutrient Leaching',
    contributingSector: 'Agriculture',
    pollutantOrPhysicalPressure: 'Diffuse nitrate (NO3) and orthophosphate (PO4) runoff from flooded floodplain paddies during June-July fertilizer application.',
    shareOfCumulativeStressPercentEst: 28,
    cag2025AuditFinding: 'Identified diffuse agricultural inputs as a major contributor to elevated trophic state index (TSI), compounded by uncoordinated fertilizer advisory.',
    monitoringProtocol: 'Continuous in-situ optical nitrate sensors at Sopore and Bandipora inlet deltas.'
  },
  {
    stressorSource: 'Untreated Municipal Sewage',
    contributingSector: 'Municipal/Urban',
    pollutantOrPhysicalPressure: 'Raw municipal blackwater, fecal coliforms, and organic detergents from Sopore, Bandipora, and upstream Jhelum towns.',
    shareOfCumulativeStressPercentEst: 32,
    cag2025AuditFinding: 'CAG audit documented significant delays and functional deficits in dedicated sewage treatment plants (STPs), discharging directly into lake perimeter.',
    monitoringProtocol: 'Biochemical Oxygen Demand (BOD5) and fecal coliform MPN counts at urban sewage outfalls.'
  },
  {
    stressorSource: 'Catchment Soil Erosion & Siltation',
    contributingSector: 'Catchment Forestry',
    pollutantOrPhysicalPressure: 'Heavy sediment transport from degraded catchment hills (Erin, Madhumati, and Pohru rivers), choking navigation channels and reducing lake water storage capacity.',
    shareOfCumulativeStressPercentEst: 22,
    cag2025AuditFinding: 'Audit highlighted uncompleted catchment soil conservation works and rapid siltation reducing water holding volume by over 40% since 1950.',
    monitoringProtocol: 'Turbidity meters and acoustic bathymetry cross-sections.'
  },
  {
    stressorSource: 'Orchard Chemical Pesticide Drift',
    contributingSector: 'Horticulture',
    pollutantOrPhysicalPressure: 'Fungicide residues (Mancozeb, Difenoconazole) washed off commercial apple tracts in Sopore-Rafiabad corridor during heavy spring rains.',
    shareOfCumulativeStressPercentEst: 10,
    cag2025AuditFinding: 'Absence of dedicated aquatic ecotoxicology monitoring for synthetic fruit fungicides entering Ramsar wetland margins.',
    monitoringProtocol: 'Quarterly GC-MS sediment and water pesticide residue spectrometry.'
  },
  {
    stressorSource: 'Wetland Conversion & Hydrological Modification',
    contributingSector: 'Wetland Management',
    pollutantOrPhysicalPressure: 'Commercial willow plantation monocultures inside lake perimeter, embankment construction, and dredging spoil dumps altering natural circulation.',
    shareOfCumulativeStressPercentEst: 8,
    cag2025AuditFinding: 'Large tracts of lake wetland converted into dense willow plantations, impeding water flow and altering benthic macroinvertebrate ecology.',
    monitoringProtocol: 'Multi-spectral satellite wetland vegetation index mapping.'
  }
];

// -------------------------------------------------------------
// 6. AGRICULTURAL LAND-USE CHANGE OBSERVATORY SPECIFICATION
// -------------------------------------------------------------

export const LAND_USE_OBSERVATORY_SPECIFICATIONS: LandUseObservatoryMetric[] = [
  {
    conversionType: 'Paddy-to-Commercial Orchard Conversion',
    annualRateHaYear: '1,850 – 2,400 Ha / year across Kashmir',
    drivingMechanisms: 'Economic incentives: high-density and traditional apple cultivation generates 3x to 5x higher cash returns per kanal compared to paddy rice.',
    environmentalConsequence: 'Permanent loss of valley-floor flood retention basins; sinking of deep borewells on previously gravity-irrigated alluvial terraces.',
    satelliteDetectionMethod: 'Sentinel-2 Normalized Difference Red Edge (NDRE) time-series detecting permanent woody canopy development on historic paddy boundaries.',
    statutoryRemedy: 'Strict enforcement of Section 133A J&K Land Revenue Act with spatial GIS cadastral alerts sent to District Collectors.'
  },
  {
    conversionType: 'Paddy-to-Residential & Commercial Soil Sealing',
    annualRateHaYear: '950 – 1,400 Ha / year (concentrated in Srinagar, Budgam, Pulwama)',
    drivingMechanisms: 'Urban population expansion, highway corridor speculation, and land-filling for private housing colonies.',
    environmentalConsequence: 'Irreversible soil sealing, destruction of natural gravitational irrigation Kuhls, and increased urban flash-flood vulnerability.',
    satelliteDetectionMethod: 'PlanetScope 3m high-resolution change detection combined with building footprint extraction algorithms.',
    statutoryRemedy: 'Mandatory spatial zoning restrictions under Master Plan 2035 prohibiting non-agricultural building permissions on class-I alluvial soils.'
  },
  {
    conversionType: 'Alluvial Topsoil Mining for Brick Kilns',
    annualRateHaYear: '320 – 480 Ha / year (Budgam, Pulwama, Baramulla)',
    drivingMechanisms: 'High demand for burnt clay construction bricks across Kashmir; mining of top 2 to 4 meters of fertile alluvial clay.',
    environmentalConsequence: 'Complete eradication of biological topsoil, severe land degradation, and atmospheric sulfur dioxide / black carbon emissions.',
    satelliteDetectionMethod: 'Thermal anomaly detection via VIIRS/MODIS paired with optical multi-spectral excavation scar mapping.',
    statutoryRemedy: 'Enforcement of J&K Brick Kilns (Regulation) Act 2010; mandatory transition to fly-ash and cellular lightweight concrete blocks.'
  }
];
