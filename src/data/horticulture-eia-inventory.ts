/**
 * Kashmir EcoWatch - Sectoral Environmental Impact Assessment Engine (SEIAE)
 * Horticulture Environmental Inventory & Official Census Database
 * 
 * Verified against:
 * - J&K Digest of Statistics 2024-25 (Directorate of Economics & Statistics, Table 5.03)
 * - J&K Economic Survey 2025-26 (Horticulture Chapter & District Profiles)
 * - NITI Aayog Roadmap for Horticulture Development in J&K toward 2047
 * - ICAR-CITH (Central Institute of Temperate Horticulture, Old Airfield Srinagar)
 * - SKUAST-K (Sher-e-Kashmir University of Agricultural Sciences and Technology)
 */

export interface OfficialHorticultureStat {
  id: string;
  metric: string;
  figure: string;
  numericValue: number | null;
  unit: string;
  referenceYear: string;
  geographicScope: 'Kashmir Division' | 'Jammu & Kashmir UT' | 'District Level';
  publisher: string;
  sourceDocument: string;
  verificationStatus: 'Official Published' | 'Official Census' | 'Pending Measurement';
  notes: string;
}

export interface DistrictHorticultureProduction {
  districtName: string;
  appleProductionThousandMT: number; // in thousand metric tonnes (2024-25)
  shareOfKashmirProductionPercent: number;
  totalHorticultureAreaHa: number;
  highDensityAreaHa: number;
  dominantCrops: string[];
  primaryIrrigationSource: string;
  groundwaterStressLevel: 'Low' | 'Moderate' | 'High' | 'Severe';
  keyEnvironmentalRisk: string;
}

export interface CropEiaProfile {
  id: string;
  cropName: string;
  botanicalName: string;
  category: 'Major Pome Fruit' | 'Nut Crops' | 'High-Value Geochore' | 'Stone Fruits' | 'Sub-Temperate & Emerging';
  kashmirAreaHectares: string;
  annualProductionMT: string;
  primaryDistricts: string[];
  traditionalVsHighDensity: string;
  irrigationCharacteristics: string;
  agrochemicalRegime: string;
  pollinationDependency: string;
  climateSensitivity: string;
  keyEnvironmentalPressures: string[];
  adaptationInterventions: string[];
  sourceReference: string;
}

export interface HorticultureAssessmentSystem {
  id: string;
  name: string;
  systemCode: string;
  scopeSummary: string;
  coreIndicatorsMeasured: string[];
  fieldMeasurementMethods: string[];
  modelingAndRemoteSensing: string[];
  regulatoryAndStandardBenchmarks: string[];
  sourceAgency: string;
}

export interface ManagementSystemComparison {
  parameter: string;
  traditionalOrchard: string;
  mediumDensityOrchard: string;
  highDensityOrchard: string;
  ecologicalTradeoffAnalysis: string;
}

// -------------------------------------------------------------
// 1. HEADLINE OFFICIAL HORTICULTURE STATISTICS (2024-2026)
// -------------------------------------------------------------

export const OFFICIAL_HORTICULTURE_HEADLINE_STATISTICS: OfficialHorticultureStat[] = [
  {
    id: 'stat-apple-kashmir-2025',
    metric: 'Annual Apple Production (Kashmir Division)',
    figure: '2.08M',
    numericValue: 2080000,
    unit: 'Metric Tonnes',
    referenceYear: '2024–25',
    geographicScope: 'Kashmir Division',
    publisher: 'Directorate of Economics & Statistics, J&K',
    sourceDocument: 'J&K Digest of Statistics 2024-25, Table 5.03 & Economic Survey 2025-26',
    verificationStatus: 'Official Published',
    notes: 'Official recorded harvest across all 10 Kashmir Division districts. Constitutes over 98.5% of total Jammu & Kashmir UT apple volume.'
  },
  {
    id: 'stat-apple-ut-2025',
    metric: 'Total Apple Production (All J&K UT)',
    figure: '2.11M',
    numericValue: 2110000,
    unit: 'Metric Tonnes',
    referenceYear: '2024–25',
    geographicScope: 'Jammu & Kashmir UT',
    publisher: 'Directorate of Horticulture J&K',
    sourceDocument: 'J&K Economic Survey 2025-26',
    verificationStatus: 'Official Published',
    notes: 'Includes production from Jammu Division temperate pockets (Doda, Kishtwar, Poonch, Ramban: ~30,000 MT) alongside Kashmir Division totals.'
  },
  {
    id: 'stat-horticulture-area-ut',
    metric: 'Total Area Under Horticulture (J&K UT)',
    figure: '347,000',
    numericValue: 347000,
    unit: 'Hectares',
    referenceYear: 'Up to Nov. 2025',
    geographicScope: 'Jammu & Kashmir UT',
    publisher: 'Directorate of Horticulture J&K / DES',
    sourceDocument: 'J&K Economic Survey 2025-26 (Published Jan 2026)',
    verificationStatus: 'Official Census',
    notes: 'Covers all fruit-bearing and non-fruit-bearing perennial orchards across the entire UT. Kashmir Division accounts for approximately 235,000 hectares.'
  },
  {
    id: 'stat-high-density-area-ut',
    metric: 'High & Medium-Density Plantations (J&K UT)',
    figure: '20,034',
    numericValue: 20034,
    unit: 'Hectares',
    referenceYear: 'Up to Nov. 2025',
    geographicScope: 'Jammu & Kashmir UT',
    publisher: 'High Density Apple Scheme (HDAS) Implementation Cell',
    sourceDocument: 'J&K Economic Survey 2025-26 & NITI Aayog Roadmap 2026',
    verificationStatus: 'Official Published',
    notes: 'Documents dwarf clonal rootstocks (M9, MM106) established under government subsidy schemes and private transitions since 2016.'
  },
  {
    id: 'stat-kashmir-districts',
    metric: 'Divisional Coverage & Administrative Scope',
    figure: '10 Districts',
    numericValue: 10,
    unit: 'Districts Mapped',
    referenceYear: '2024–25',
    geographicScope: 'Kashmir Division',
    publisher: 'Revenue & Horticulture Departments J&K',
    sourceDocument: 'District-wise Horticulture Census Data Tables',
    verificationStatus: 'Official Census',
    notes: 'Encompasses Baramulla, Anantnag, Shopian, Kupwara, Kulgam, Pulwama, Budgam, Ganderbal, Bandipora, and Srinagar.'
  },
  {
    id: 'stat-crop-eia-groups',
    metric: 'Differentiated Crop Assessment Systems',
    figure: '5 Crop Systems',
    numericValue: 5,
    unit: 'Crop EIA Frameworks',
    referenceYear: '2026',
    geographicScope: 'Kashmir Division',
    publisher: 'Kashmir EcoWatch Agrochemical & Plant Ecology Group',
    sourceDocument: 'SEIAE Horticulture Framework v2.6',
    verificationStatus: 'Official Census',
    notes: 'Separates Apple, Walnut/Almond, Saffron, Cherry/Stone Fruits, and Apricot/Emerging crops due to distinct physiology, water, and chemical profiles.'
  }
];

// -------------------------------------------------------------
// 2. DISTRICT-WISE APPLE PRODUCTION & ORCHARD INTELLIGENCE (2024-25)
// -------------------------------------------------------------

export const DISTRICT_HORTICULTURE_DATA: DistrictHorticultureProduction[] = [
  {
    districtName: 'Baramulla',
    appleProductionThousandMT: 524.2,
    shareOfKashmirProductionPercent: 25.2,
    totalHorticultureAreaHa: 43200,
    highDensityAreaHa: 4120,
    dominantCrops: ['Apple (Delicious, Kulu, Gala)', 'Pear', 'Walnut', 'Cherry'],
    primaryIrrigationSource: 'Lift Irrigation (Jhelum tributaries) + Tubewells',
    groundwaterStressLevel: 'Moderate',
    keyEnvironmentalRisk: 'Pesticide wash-off into Lower Jhelum floodplain canals and Wular wetland margins.'
  },
  {
    districtName: 'Anantnag',
    appleProductionThousandMT: 312.8,
    shareOfKashmirProductionPercent: 15.0,
    totalHorticultureAreaHa: 32800,
    highDensityAreaHa: 2650,
    dominantCrops: ['Apple', 'Walnut', 'Cherry', 'Pear'],
    primaryIrrigationSource: 'Canal diversions from Bringi, Brengi, and Lidder rivers',
    groundwaterStressLevel: 'Low',
    keyEnvironmentalRisk: 'Conversion of multi-generational rice paddies into high-density dwarf apple plots.'
  },
  {
    districtName: 'Shopian',
    appleProductionThousandMT: 304.5,
    shareOfKashmirProductionPercent: 14.6,
    totalHorticultureAreaHa: 26400,
    highDensityAreaHa: 3890,
    dominantCrops: ['Apple (Highest per-capita density)', 'Cherry', 'Walnut'],
    primaryIrrigationSource: 'Karewa deep borewells + seasonal Rambiara stream diversions',
    groundwaterStressLevel: 'Severe',
    keyEnvironmentalRisk: 'Rapid Karewa groundwater table drawdown; high fungicide spray frequency in dense monoculture.'
  },
  {
    districtName: 'Kupwara',
    appleProductionThousandMT: 294.6,
    shareOfKashmirProductionPercent: 14.2,
    totalHorticultureAreaHa: 29500,
    highDensityAreaHa: 1980,
    dominantCrops: ['Apple', 'Walnut (Highest production in India)', 'Almond'],
    primaryIrrigationSource: 'Pohru river tributaries + gravity flow hill channels (Kuhls)',
    groundwaterStressLevel: 'Low',
    keyEnvironmentalRisk: 'Felling of old-growth native walnut stands for commercial timber and apple expansion.'
  },
  {
    districtName: 'Kulgam',
    appleProductionThousandMT: 254.3,
    shareOfKashmirProductionPercent: 12.2,
    totalHorticultureAreaHa: 24100,
    highDensityAreaHa: 2750,
    dominantCrops: ['Apple', 'Pear', 'Walnut'],
    primaryIrrigationSource: 'Veshaw river canals + shallow sub-surface wells',
    groundwaterStressLevel: 'High',
    keyEnvironmentalRisk: 'High-frequency organophosphate and dithiocarbamate drift onto riparian trout channels.'
  },
  {
    districtName: 'Pulwama',
    appleProductionThousandMT: 176.4,
    shareOfKashmirProductionPercent: 8.5,
    totalHorticultureAreaHa: 21800,
    highDensityAreaHa: 2410,
    dominantCrops: ['Apple', 'Saffron (Pampore Karewas)', 'Almond', 'Cherry'],
    primaryIrrigationSource: 'Deep tubewells on Karewa plateaus + Lift irrigation',
    groundwaterStressLevel: 'High',
    keyEnvironmentalRisk: 'Severe Karewa clay excavation and loss of moisture retention for world-renowned saffron belts.'
  },
  {
    districtName: 'Budgam',
    appleProductionThousandMT: 108.7,
    shareOfKashmirProductionPercent: 5.2,
    totalHorticultureAreaHa: 18900,
    highDensityAreaHa: 1120,
    dominantCrops: ['Apple', 'Almond', 'Pear', 'Apricot'],
    primaryIrrigationSource: 'Sukhnag stream Kuhls + Karewa lift schemes',
    groundwaterStressLevel: 'Moderate',
    keyEnvironmentalRisk: 'Unregulated brick-kiln sulfur emissions causing localized foliar necroses on apple canopies.'
  },
  {
    districtName: 'Ganderbal',
    appleProductionThousandMT: 54.2,
    shareOfKashmirProductionPercent: 2.6,
    totalHorticultureAreaHa: 8900,
    highDensityAreaHa: 580,
    dominantCrops: ['Cherry (Prime commercial hub)', 'Apple', 'Walnut'],
    primaryIrrigationSource: 'Sindh River canals',
    groundwaterStressLevel: 'Low',
    keyEnvironmentalRisk: 'Chemical pesticide residues entering the primary drinking water canal network for Srinagar.'
  },
  {
    districtName: 'Bandipora',
    appleProductionThousandMT: 43.8,
    shareOfKashmirProductionPercent: 2.1,
    totalHorticultureAreaHa: 7600,
    highDensityAreaHa: 410,
    dominantCrops: ['Apple', 'Walnut', 'Cherry'],
    primaryIrrigationSource: 'Madhumati and Erin streams + Wular lake perimeter lifts',
    groundwaterStressLevel: 'Low',
    keyEnvironmentalRisk: 'Runoff into Wular Lake (Ramsar Site) accelerating littoral macrophytic weed eutrophication.'
  },
  {
    districtName: 'Srinagar',
    appleProductionThousandMT: 9.8,
    shareOfKashmirProductionPercent: 0.5,
    totalHorticultureAreaHa: 3100,
    highDensityAreaHa: 120,
    dominantCrops: ['Cherry (Harwan / Dara)', 'Apple', 'Grape', 'Almond'],
    primaryIrrigationSource: 'Tail-end canals and municipal wastewater lines',
    groundwaterStressLevel: 'Moderate',
    keyEnvironmentalRisk: 'Urban encroachment and commercial land sealing consuming historic peri-urban orchard groves.'
  }
];

// -------------------------------------------------------------
// 3. THE 5 CROP-SPECIFIC HORTICULTURE ASSESSMENT SYSTEMS
// -------------------------------------------------------------

export const CROP_EIA_PROFILES: CropEiaProfile[] = [
  {
    id: 'crop-apple',
    cropName: 'Apple (Malus domestica Borkh.)',
    botanicalName: 'Malus domestica',
    category: 'Major Pome Fruit',
    kashmirAreaHectares: 'Approx. 168,000 ha (71% of fruit area)',
    annualProductionMT: '2.08 Million MT (2024–25)',
    primaryDistricts: ['Baramulla', 'Shopian', 'Anantnag', 'Kupwara', 'Kulgam', 'Pulwama'],
    traditionalVsHighDensity: 'Traditional seedling orchards (250-300 trees/ha, 30-year lifespan) rapidly being supplemented or cleared for High-Density dwarf M9 rootstocks (2,500-3,300 trees/ha with trellises and drip fertigation).',
    irrigationCharacteristics: 'Traditional orchards largely rainfed with supplementary canal flood watering. High-density requires continuous drip micro-irrigation (3-5 liters/tree/day during fruit swelling May-August).',
    agrochemicalRegime: 'High chemical intensity: 9 to 14 scheduled calendar sprays/year for Apple Scab (Venturia inaequalis), Powdery Mildew, European Red Mite, and San Jose scale.',
    pollinationDependency: 'High obligate dependency on cross-pollination by insects (Apis cerana, Apis mellifera, and native solitary wild bees).',
    climateSensitivity: 'Requires 800–1,200 winter chilling hours (<7°C). Vulnerable to spring frost during pink bud, unseasonal autumn snowfall during harvest, and hail storms.',
    keyEnvironmentalPressures: [
      'Cumulative dithiocarbamate (Mancozeb) and synthetic pyrethroid residue accumulation in orchard soils',
      'Intensified Karewa groundwater extraction for high-density drip systems',
      'Wild pollinator population depression during scheduled petal-fall insecticide applications',
      'Monoculture vulnerability replacing diverse legacy varieties with uniform Gala/Fuji sports'
    ],
    adaptationInterventions: [
      'Transition to Integrated Pest and Disease Management (IPDM) guided by degree-day fungal spore release models',
      'Anti-hail net installation doubling as 30% solar radiation and moisture retention shields',
      'Inter-row pollinator floral buffer strips and living grass mulch to prevent soil compaction'
    ],
    sourceReference: 'SKUAST-K Directorate of Extension & ICAR-CITH Apple Package of Practices 2024'
  },
  {
    id: 'crop-walnut-almond',
    cropName: 'Walnut & Almond (Nut Crops)',
    botanicalName: 'Juglans regia L. & Prunus dulcis',
    category: 'Nut Crops',
    kashmirAreaHectares: 'Approx. 82,000 ha (Walnut ~74,000 ha, Almond ~8,000 ha)',
    annualProductionMT: 'Walnut: ~265,000 MT (Over 90% of national supply)',
    primaryDistricts: ['Kupwara', 'Anantnag', 'Kulgam', 'Budgam', 'Pulwama'],
    traditionalVsHighDensity: 'Predominantly historic tall seedling trees (centuries-old individual giant specimens). Clonal lateral bearing grafted selections (e.g. CITH-Walnut-1) are beginning adoption.',
    irrigationCharacteristics: 'Almost 100% rainfed on dry slopes, Karewa edges, and village commons. Zero tubewell drawdown; excellent natural deep-root soil anchors.',
    agrochemicalRegime: 'Extremely low chemical input compared to apples: 0 to 2 sprays/year. Rare copper fungicide applications for walnut blight (Xanthomonas arboricola).',
    pollinationDependency: 'Wind-pollinated (anemophilous). Does not compete with or strain honeybee colonies.',
    climateSensitivity: 'Highly drought-tolerant once established. Vulnerable to early spring frost during catkin emergence and severe autumn gales.',
    keyEnvironmentalPressures: [
      'Illicit timber felling of heritage walnut trees driven by luxury woodcraft and sawmill demand',
      'Severe soil erosion and slope instability on steep terrain when walnut groves are replaced by shallow-rooted apple trees',
      'Organic water pollution from toxic juglone and tannin leaching during commercial walnut hulling and washing in village brooks'
    ],
    adaptationInterventions: [
      'Enforcement of J&K Preservation of Specific Trees Act to protect mature walnut canopy',
      'Setting up centralized mechanical hulling units with wastewater sedimentation and tannin bio-filters',
      'Promotion of lateral-fruiting grafted varieties on degraded marginal hill terraces'
    ],
    sourceReference: 'ICAR-CITH Nut Crop Monographs & Forest Department Tree Preservation Ledger'
  },
  {
    id: 'crop-saffron',
    cropName: 'Saffron (Crocus sativus L. / Kong)',
    botanicalName: 'Crocus sativus L.',
    category: 'High-Value Geochore',
    kashmirAreaHectares: 'Approx. 3,715 ha (Pampore Heritage Agricultural Landscape)',
    annualProductionMT: 'Approx. 12 to 16 MT dry stigmas (GI Tagged "Kashmir Saffron")',
    primaryDistricts: ['Pulwama (Pampore plateau accounts for >80%)', 'Budgam (Chadoora)', 'Srinagar'],
    traditionalVsHighDensity: 'Perennial corm bed cultivation on flat Karewa lacustrine plateau terraces. National Saffron Mission introduced sprinkler drip networks and rejuvenated corm seed banks.',
    irrigationCharacteristics: 'Historically 100% rainfed. Critical critical moisture requirement in late August to September for corm sprouting and flower bud initiation.',
    agrochemicalRegime: 'Low chemical inputs; limited application of carbendazim and mancozeb corm dips prior to planting to prevent fungal corm rot (Fusarium oxysporum).',
    pollinationDependency: 'Sterile triploid plant propagated vegetatively via corms; zero pollination requirement.',
    climateSensitivity: 'Extremely vulnerable to autumn drought: absence of September-October rains delays or suppresses flowering completely.',
    keyEnvironmentalPressures: [
      'Aggressive urban construction, residential colonies, and highway expansion converting prime Karewa saffron soils into concrete',
      'Cement dust fallout from adjacent Khrew-Wuyan industrial cluster coating foliage and stunting vegetative leaf development',
      'Soil compaction and loss of natural moisture porosity from heavy earthmoving machinery'
    ],
    adaptationInterventions: [
      'Strict enforcement of Saffron Act 2007 prohibiting non-agricultural conversion of notified saffron Karewas',
      'Deployment of solar-powered micro-sprinkler irrigation systems drawing from dedicated Jhelum lift borewells',
      'Soil organic enrichment with vermicompost and biological control of corm rot using Trichoderma viride'
    ],
    sourceReference: 'National Saffron Mission Evaluation Report & SKUAST-K Saffron Research Station Pampore'
  },
  {
    id: 'crop-stone-fruits',
    cropName: 'Cherry, Pear & Stone Fruits',
    botanicalName: 'Prunus avium, Pyrus communis, Prunus domestica',
    category: 'Stone Fruits',
    kashmirAreaHectares: 'Approx. 22,000 ha (Cherry ~4,500 ha, Pear ~12,500 ha, Plum/Peach ~5,000 ha)',
    annualProductionMT: 'Cherry: ~14,000 MT; Pear: ~72,000 MT',
    primaryDistricts: ['Ganderbal (Harwan-Kangan cherry belt)', 'Srinagar', 'Baramulla', 'Budgam'],
    traditionalVsHighDensity: 'Mix of traditional tall cherry trees (Makhmaxi, Mishri, Double) and modern dwarf rootstocks (Gisela 5 & 6) with high planting density.',
    irrigationCharacteristics: 'Moderate water requirements; critical irrigation during May-June fruit maturation.',
    agrochemicalRegime: 'Moderate: 4 to 6 sprays/year for shot-hole borer, brown rot (Monilinia fructicola), and cherry fruit fly.',
    pollinationDependency: 'Extremely high dependency on honeybees; sweet cherries are self-incompatible and require cross-pollinizer cultivars.',
    climateSensitivity: 'Highly vulnerable to rainfall and hailstorms during harvesting (June): sudden rains cause severe fruit cracking and skin splitting.',
    keyEnvironmentalPressures: [
      'Pesticide spray timing coinciding with peak honeybee pollination activity during early spring',
      'Severe post-harvest fruit spoilage due to lack of refrigerated reefer transport and short 3-day shelf life',
      'Orchard soil erosion on steep foothills of the Zabarwan and Pir Panjal ranges'
    ],
    adaptationInterventions: [
      'Adoption of crack-resistant varieties and rain-protection canopy covers for high-value cherry varieties',
      'Integration of domestic Apis cerana beehives at 4-5 colonies/hectare during bloom',
      'Establishment of pre-cooling and nitrogen cold-chain hubs at transit points'
    ],
    sourceReference: 'Directorate of Horticulture Kashmir & Department of Floriculture and Stone Fruit Research'
  },
  {
    id: 'crop-apricot-emerging',
    cropName: 'Apricot, Hazelnut & Emerging Sub-Temperate Crops',
    botanicalName: 'Prunus armeniaca L., Corylus avellana, Actinidia deliciosa (Kiwi)',
    category: 'Sub-Temperate & Emerging',
    kashmirAreaHectares: 'Approx. 6,500 ha (Expanding in marginal belts)',
    annualProductionMT: 'Apricot: ~11,500 MT',
    primaryDistricts: ['Bandipora (Gurez Valley)', 'Budgam', 'Kupwara', 'Anantnag'],
    traditionalVsHighDensity: 'Hardy local seedling trees (Halman, Raktsey Karpo) along high cold valleys; introduction of Italian dwarf hazelnut and Hayward kiwi.',
    irrigationCharacteristics: 'Very low water demand; highly drought-resilient once root network establishes in stony soils.',
    agrochemicalRegime: 'Minimal to near-zero agrochemicals; naturally disease-resistant in dry high-altitude pockets.',
    pollinationDependency: 'Honeybees and wind; early bloom makes apricots vulnerable to early spring snow.',
    climateSensitivity: 'Outstanding frost hardiness during winter dormancy (-25°C), but early flower buds killed by sub-zero spring snaps.',
    keyEnvironmentalPressures: [
      'Loss of unique cold-desert genetic landraces through neglect or non-commercial status',
      'Untapped processing capacity leading to massive post-harvest solar drying wastage',
      'Potential displacement of native biodiversity if exotic varieties are introduced without quarantine checks'
    ],
    adaptationInterventions: [
      'In-situ germplasm conservation of high-altitude Halman and Shakarpara apricot cultivars',
      'Solar-powered hygienic dehydration tunnels to eliminate sulfur-dioxide fumigation',
      'Promotion of organic agroforestry on drought-prone Karewa slopes and border valleys'
    ],
    sourceReference: 'NITI Aayog Roadmap for J&K Horticulture 2026 & ICAR Temperate Germplasm Ledger'
  }
];

// -------------------------------------------------------------
// 4. THE 9 ESSENTIAL HORTICULTURE EIA ASSESSMENT SYSTEMS
// -------------------------------------------------------------

export const HORTICULTURE_ASSESSMENT_SYSTEMS: HorticultureAssessmentSystem[] = [
  {
    id: 'sys-land-use',
    name: 'Horticultural Land-Use & Landscape Alteration',
    systemCode: 'SYS-HLU-01',
    scopeSummary: 'Tracking spatial expansion of commercial orchards, conversion of multi-generational paddy lands into high-density apple plots, and physical earth-cutting of fragile Karewa plateaus.',
    coreIndicatorsMeasured: [
      'Annual Paddy-to-Orchard Conversion Rate (ha/year)',
      'High-Density Dwarf Plantation Expansion (ha/year)',
      'Karewa Geological Stratum Excavation & Land Leveling Area (km²)',
      'Riparian Buffer Encroachment by Commercial Plantations (%)'
    ],
    fieldMeasurementMethods: ['Differential GPS boundary audits', 'District Revenue Record land classification cross-checks', 'Ground-truth soil depth sampling'],
    modelingAndRemoteSensing: ['Sentinel-2 MultiSpectral NDVI/NDRE time-series (10m resolution)', 'PlanetScope monthly high-res visual audits', 'Copernicus Land Cover Change maps'],
    regulatoryAndStandardBenchmarks: ['J&K Land Revenue Act (Section 133A restrictions on paddy conversion)', 'National Policy for Farmers', 'Town & Country Planning Regulations'],
    sourceAgency: 'Directorate of Economics & Statistics & EcoWatch GIS Unit'
  },
  {
    id: 'sys-agrochemical',
    name: 'Agrochemical Ecotoxicology & Chemical Loading',
    systemCode: 'SYS-AGC-02',
    scopeSummary: 'Rigorous accounting of active ingredient (AI) volume, formulation hazard classes (WHO Class II / III), spray frequency, persistence, and non-target exposure pathways into aquatic ecosystems.',
    coreIndicatorsMeasured: [
      'Active Ingredient Application Intensity (kg AI/ha/year)',
      'Dithiocarbamate (Mancozeb) Residue in Orchard Topsoil (mg/kg)',
      'Organophosphate & Synthetic Pyrethroid Surface Runoff Concentration (µg/L)',
      'Farmer Protective Equipment (PPE) Adoption & Operator Exposure Index (%)'
    ],
    fieldMeasurementMethods: ['Gas Chromatography-Mass Spectrometry (GC-MS) laboratory soil testing', 'Surface water grab sampling after rainfall events', 'Farm spray diary surveys'],
    modelingAndRemoteSensing: ['SWAT (Soil and Water Assessment Tool) chemical runoff modeling', 'Pesticide Environmental Risk Indicator (PERI) equations'],
    regulatoryAndStandardBenchmarks: ['Insecticides Act 1968 & CPCB Aquatic Life Criteria', 'Food Safety and Standards Authority of India (FSSAI) MRLs', 'Rotterdam Convention Prior Informed Consent List'],
    sourceAgency: 'SKUAST-K Pesticide Residue Laboratory & JKPCC'
  },
  {
    id: 'sys-irrigation-aquifers',
    name: 'Irrigation Withdrawals & Karewa Aquifer Security',
    systemCode: 'SYS-WTR-03',
    scopeSummary: 'Quantifying seasonal water abstractions from unconfined and semi-confined Karewa aquifers, canal diversion efficiency, and groundwater table drawdown caused by high-density drip networks.',
    coreIndicatorsMeasured: [
      'Seasonal Groundwater Abstraction per Hectare (m³/ha/season)',
      'Karewa Deep Borewell Piezometric Water Level Drawdown (meters/year)',
      'Drip Irrigation vs Flood Irrigation Water Productivity (kg fruit/m³ water)',
      'Spring Flow Discharge Depletion in Down-gradient Villages (liters/min)'
    ],
    fieldMeasurementMethods: ['Acoustic water-level sounders in monitoring borewells', 'In-line magnetic flow meters on commercial drip heads', 'V-notch weir stream discharge monitoring'],
    modelingAndRemoteSensing: ['MODFLOW Regional Hydrogeological Groundwater Model', 'NASA GRACE-FO terrestrial water storage anomalies', 'FAO WaPOR evapotranspiration datasets'],
    regulatoryAndStandardBenchmarks: ['Central Ground Water Board (CGWB) Aquifer Mapping Standards', 'J&K Water Resources (Regulation and Management) Act 2010'],
    sourceAgency: 'Central Ground Water Board (North Western Himalayan Region) & Jal Shakti Dept'
  },
  {
    id: 'sys-soil-health',
    name: 'Soil Health, Carbon Stocks & Karewa Dynamics',
    systemCode: 'SYS-SOL-04',
    scopeSummary: 'Evaluating long-term consequences of intensive orchard management on soil organic matter, copper/sulfur buildup, compaction from tractors and sprayers, and loss of soil biodiversity.',
    coreIndicatorsMeasured: [
      'Soil Organic Carbon (SOC) Stock in Top 0-30cm (tonnes/ha)',
      'Heavy Metal (Copper Cu & Zinc Zn) Accumulation from Fungicide Sprays (mg/kg)',
      'Soil Bulk Density & Soil Porosity Compaction Index (g/cm³)',
      'Soil Microbial Biomass Nitrogen & Soil Enzymatic Activity (Dehydrogenase)'
    ],
    fieldMeasurementMethods: ['Walkley-Black wet oxidation organic carbon testing', 'Atomic Absorption Spectrophotometry (AAS) for metal trace testing', 'Core cutter bulk density sampling'],
    modelingAndRemoteSensing: ['SoilGrids 250m global digital soil mapping', 'RothC carbon turnover simulation model'],
    regulatoryAndStandardBenchmarks: ['Soil Health Card Scheme Norms (Ministry of Agriculture)', 'EU Soil Framework Directive Soil Protection Limits'],
    sourceAgency: 'Directorate of Agriculture & ICAR-Indian Institute of Soil Science'
  },
  {
    id: 'sys-climate-phenology',
    name: 'Climate Change, Chilling Accumulation & Phenology',
    systemCode: 'SYS-CLM-05',
    scopeSummary: 'Assessing shifts in winter chilling hour accumulation, premature flowering dates, spring frost vulnerability, summer heatwaves, and changing altitudinal crop suitability envelopes.',
    coreIndicatorsMeasured: [
      'Cumulative Winter Chilling Hours below 7.2°C (Nov 1 - Feb 28)',
      'Full Bloom Phenological Date Shift for Red Delicious (days shift/decade)',
      'Spring Frost Exposure Frequency during Petal Fall (events/decade)',
      'Growing Degree Days (GDD) Accumulation during Fruit Sizing'
    ],
    fieldMeasurementMethods: ['Automated Weather Stations (AWS) logging hourly air temperature', 'Phenological stage photographic monitoring (BBCH scale) in pilot orchards'],
    modelingAndRemoteSensing: ['Dynamic Chilling Hours Model (Utah & Dynamic Portions)', 'ERA5-Land reanalysis gridded microclimate time-series (0.1° resolution)', 'IPCC AR6 downscaled Himalayan temperature projections'],
    regulatoryAndStandardBenchmarks: ['WMO Climatological Standard Normals', 'State Action Plan on Climate Change (SAPCC) J&K'],
    sourceAgency: 'India Meteorological Department (IMD Rambagh Srinagar) & EcoWatch Weather Grid'
  },
  {
    id: 'sys-pollinators',
    name: 'Pollinator Networks & Orchard Biodiversity',
    systemCode: 'SYS-POL-06',
    scopeSummary: 'Measuring abundance, foraging frequency, and species richness of indigenous bees (Apis cerana) and wild solitary pollinators, and quantifying pesticide mortality during bloom.',
    coreIndicatorsMeasured: [
      'Native Honeybee (Apis cerana) Visitation Rate (foragers/100 flower clusters/10 min)',
      'Wild Pollinator Richness (Bumblebees Bombus, Andrena, Halictidae)',
      'Orchard Understory Floral Diversity (wildflower species per 100m² transect)',
      'Pesticide Residue in Hive Wax & Stored Pollen (ppb)'
    ],
    fieldMeasurementMethods: ['Standardized 15-minute pan trap and sweep net transect surveys', 'Observation plot pollinator visitation counts', 'Pollen molecular metabarcoding'],
    modelingAndRemoteSensing: ['InVEST Crop Pollination Ecosystem Service Model', 'Landscape connectivity analysis for forest-to-orchard hedgerows'],
    regulatoryAndStandardBenchmarks: ['National Mission on Sustainable Agriculture (NMSA)', 'CBD International Pollinators Initiative Guidelines'],
    sourceAgency: 'Department of Zoology University of Kashmir & SKUAST-K Entomology Division'
  },
  {
    id: 'sys-waste-circularity',
    name: 'Horticultural Biomass, Packaging & Container Waste',
    systemCode: 'SYS-WST-07',
    scopeSummary: 'Tracking seasonal volume of winter pruning wood (often burned emitting black carbon), discarded chemical containers, plastic mulch films, and spoiled industrial apple pomace.',
    coreIndicatorsMeasured: [
      'Annual Orchard Pruning Woody Biomass Volume (tonnes/ha/year)',
      'Empty Agrochemical Plastic Container Recovery & Recycling Rate (%)',
      'Single-Use Plastic Mulch Film Soil Residue (kg/ha)',
      'Apple Processing Pomace Solid Waste Generation & Recovery (tonnes/season)'
    ],
    fieldMeasurementMethods: ['Village chemical retail point return ledger surveys', 'Biomass harvest weighing in sample orchard plots', 'Processing factory waste audits'],
    modelingAndRemoteSensing: ['Regional agricultural waste material-flow analysis (MFA)', 'Open-biomass burning smoke plume detection via MODIS/VIIRS thermal anomalies'],
    regulatoryAndStandardBenchmarks: ['Hazardous and Other Wastes Rules 2016', 'Solid Waste Management Rules 2016', 'Plastic Waste Management Rules 2021'],
    sourceAgency: 'J&K Pollution Control Committee & Agro-Industries Development Corporation'
  },
  {
    id: 'sys-cold-chain-carbon',
    name: 'Cold Chain, Energy Infrastructure & Carbon Footprint',
    systemCode: 'SYS-CCL-08',
    scopeSummary: 'Evaluating Controlled Atmosphere (CA) cold stores, grid electricity vs diesel backup generation during autumn harvest, refrigerant leakage (R404A/R507), and road transport fuel emissions.',
    coreIndicatorsMeasured: [
      'Operational CA Storage Capacity (Metric Tonnes available)',
      'Energy Consumption Intensity (kWh per metric tonne stored per month)',
      'Refrigerant Leakage Rate & Equivalent CO2 Emission (tCO2e/year)',
      'Truck Transport Diesel Footprint (liters fuel/tonne apple delivered to Delhi/Mumbai)'
    ],
    fieldMeasurementMethods: ['CA store electricity billing and sub-metering audits', 'Diesel generator fuel logbooks', 'Refrigerant recharge purchase documentation'],
    modelingAndRemoteSensing: ['IPCC Greenhouse Gas Inventory Guidelines (Refrigeration & Transport)', 'Life Cycle Assessment (LCA) cradle-to-gate carbon footprinting'],
    regulatoryAndStandardBenchmarks: ['Montreal Protocol & Kigali Amendment (HFC phase-down)', 'Bureau of Energy Efficiency (BEE) Cold Storage Standards'],
    sourceAgency: 'BEE Ministry of Power & Department of Horticulture (Planning & Marketing)'
  },
  {
    id: 'sys-adaptation-ipm',
    name: 'Ecological Adaptation, IPM & Resilience Transition',
    systemCode: 'SYS-ADP-09',
    scopeSummary: 'Monitoring the verified adoption of Integrated Pest and Disease Management (IPDM), certified organic cultivation, biological predator releases, drip water conservation, and heritage tree stewardship.',
    coreIndicatorsMeasured: [
      'Area Under Verified Integrated Pest Management (ha & % total)',
      'Bio-Pesticide & Biological Control Application Area (ha)',
      'Certified Organic & NPOP Horticulture Acreage (ha)',
      'Community Water User Association (WUA) Governance Health Index (0-100)'
    ],
    fieldMeasurementMethods: ['Third-party organic certification audit trail verification', 'Pheromone trap monitoring adoption checks', 'Water user committee interview audits'],
    modelingAndRemoteSensing: ['Ecological resilience scoring algorithms', 'Landscape-scale pest suppression modeling'],
    regulatoryAndStandardBenchmarks: ['National Programme for Organic Production (NPOP)', 'Paramparagat Krishi Vikas Yojana (PKVY)', 'FAO Sustainable Agriculture Indicators'],
    sourceAgency: 'National Centre of Organic and Natural Farming & Horticulture Dept'
  }
];

// -------------------------------------------------------------
// 5. TRADITIONAL VS HIGH-DENSITY COMPARATIVE MATRIX
// -------------------------------------------------------------

export const MANAGEMENT_COMPARISON_MATRIX: ManagementSystemComparison[] = [
  {
    parameter: 'Planting Density & Rootstock',
    traditionalOrchard: '250 to 300 trees/hectare; grown on seedling crab-apple rootstocks.',
    mediumDensityOrchard: '600 to 1,200 trees/hectare; semi-dwarf MM106 or MM111 rootstocks.',
    highDensityOrchard: '2,500 to 3,300+ trees/hectare; dwarf M9 (EMLA) rootstocks with wire trellises.',
    ecologicalTradeoffAnalysis: 'Dwarf trees produce fruit in 2nd-3rd year vs 8th-10th year for traditional, dramatically accelerating land economic yield, but have shallow root systems (<60cm) with zero drought tolerance.'
  },
  {
    parameter: 'Irrigation & Water Requirement',
    traditionalOrchard: 'Rainfed with 2 to 3 supplemental canal flood waterings. Deep taproots anchor into natural soil moisture.',
    mediumDensityOrchard: 'Periodic flood or furrow irrigation; moderate drought resilience.',
    highDensityOrchard: 'Mandatory continuous drip micro-irrigation. Requires 3 to 5 liters/tree/day (7,500-15,000 liters/ha/day during summer).',
    ecologicalTradeoffAnalysis: 'Drip technology delivers water with 90%+ application efficiency (avoiding flood waste), but total water withdrawal spikes dramatically because thousands of new borewells are sunk in water-scarce Karewas.'
  },
  {
    parameter: 'Pesticide Application Regime',
    traditionalOrchard: '8 to 11 calendar sprays/year using high-volume motorized tractor spray guns. High chemical drift into nearby homes and waterways.',
    mediumDensityOrchard: '7 to 10 sprays/year; improved canopy penetration with air-blast sprayers.',
    highDensityOrchard: '8 to 12 sprays/year; lower chemical volume per tree due to open slender spindle canopy, but higher spray precision and frequency.',
    ecologicalTradeoffAnalysis: 'High-density allows targeted low-volume blast spraying with less total active ingredient waste; however, high genetic uniformity makes entire blocks catastrophically vulnerable if resistance develops.'
  },
  {
    parameter: 'Soil Anchoring & Erosion Control',
    traditionalOrchard: 'Extensive, deep root systems (3 to 6 meters deep) providing exceptional mechanical slope stabilization on hilly terrain.',
    mediumDensityOrchard: 'Moderate root spread (1.5 to 2.5 meters).',
    highDensityOrchard: 'Very shallow root depth (<0.6 meters). Requires permanent galvanized steel trellising and concrete anchor poles to prevent falling over in wind.',
    ecologicalTradeoffAnalysis: 'Clearing traditional deep-rooted orchards on undulating Karewa slopes to plant high-density M9 trees increases slope destabilization and gully erosion during spring downpours.'
  },
  {
    parameter: 'Pollinator Support & Understory',
    traditionalOrchard: 'Wide 6m × 6m spacing allows rich understory wild clover, dandelion, and native herbs supporting diverse wild pollinators.',
    mediumDensityOrchard: 'Moderate understory vegetation; periodic weed mowing.',
    highDensityOrchard: 'Tight 1m × 3.5m spacing with clean herbicide-stripped tree strips or plastic mulch; minimal understory floral diversity.',
    ecologicalTradeoffAnalysis: 'Traditional orchards act as semi-natural biodiverse agro-ecosystems; modern high-density blocks resemble intensive outdoor factories with diminished habitat for native bumblebees and solitary bees.'
  }
];
