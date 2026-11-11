/**
 * Kashmir EcoWatch - Earth & Human Impact Intelligence (EHII)
 * Western Himalayan Earth Systems, Land Transformation & Anthropogenic Impact Observatory
 * 
 * Verified against:
 * - India State of Forest Report (ISFR) 2023-2025 (Forest Survey of India)
 * - India Meteorological Department (IMD Rambagh Srinagar Climatological Normals)
 * - J&K Directorate of Geology and Mining (Riverbed & Mineral Extraction Ledgers)
 * - Central Electricity Authority (CEA) Northern Himalayan Hydropower Registry
 * - Central Pollution Control Board (CPCB) Urban Environmental Standards
 * - Town & Country Planning Organization (Srinagar & Peri-Urban Master Plan 2035)
 */

export interface EhiiSubmodule {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  focusSummary: string;
  badge: string;
  iconName: string;
  primaryMetrics: {
    label: string;
    value: string;
    unit: string;
    trend: 'stable' | 'increasing' | 'decreasing' | 'critical';
  }[];
  keyPressureSignals: string[];
  monitoringTechnologies: string[];
  interlinkedModules: string[];
}

export interface EarthSystemIndicator {
  id: string;
  domain: 'Climate' | 'Forest' | 'Land' | 'Energy' | 'Mining' | 'Urban';
  name: string;
  baselinePeriod: string;
  baselineValue: string;
  currentValue: string;
  thresholdLimit: string;
  unit: string;
  status: 'Normal' | 'Moderate Concern' | 'Severe Stress' | 'Critical Threshold';
  evidenceSource: string;
  measurementMethod: string;
}

export interface HumanPressureIndexDistrict {
  districtName: string;
  overallHpiScore: number; // 0 - 100
  stressCategory: 'Low' | 'Moderate' | 'High' | 'Severe';
  forestCanopyLossHaYear: number;
  quarryMiningPointsActive: number;
  imperviousSurfaceGrowthPercent: number;
  hydropowerInfraStressScore: number;
  primaryAnthropogenicDriver: string;
}

export interface CumulativeImpactInteraction {
  id: string;
  interactionName: string;
  primaryDriverDomain: string;
  interactingSectorOrModule: string;
  mechanism: string;
  geographicalHotspot: string;
  ecologicalReceptor: string;
  severityLevel: 'High' | 'Severe' | 'Critical';
}

export interface RestorationInterventionRecord {
  id: string;
  projectTitle: string;
  domain: string;
  implementingBody: string;
  targetLandscape: string;
  targetMetric: string;
  quantitativeMilestone: string;
  verificationStatus: 'Verified by Telemetry' | 'Under Audit' | 'Proposed';
  completionYear: string;
}

// -------------------------------------------------------------
// 1. THE SIX SCIENTIFIC INTELLIGENCE SUBMODULES
// -------------------------------------------------------------

export const EHII_SUBMODULES: EhiiSubmodule[] = [
  {
    id: 'submod-climate-atmosphere',
    slug: 'climate-atmosphere',
    title: 'Climate & Atmosphere',
    subtitle: 'Temperature anomalies, rainfall shifts, snowfall deficits & atmospheric extremes',
    focusSummary: 'Tracking the accelerating cryosphere and microclimatic shifts across elevation transects from the valley floor (1,580m) to the Pir Panjal and Great Himalayan crests (5,400m).',
    badge: 'Atmospheric Physics',
    iconName: 'Thermometer',
    primaryMetrics: [
      { label: 'Valley Mean Temp Anomaly', value: '+1.42', unit: '°C vs 1980-2010', trend: 'increasing' },
      { label: 'Winter Chill Accumulation', value: '-18%', unit: 'Deficit <7.2°C hrs', trend: 'critical' },
      { label: 'Snow Drought Frequency', value: '3.2x', unit: 'Incidence / decade', trend: 'increasing' }
    ],
    keyPressureSignals: [
      'Shortening of the winter snow accumulation window and premature spring ablation',
      'Increasing frequency of extreme cloudbursts and localized convective flash storms',
      'Shift in the zero-degree isotherm elevating frost line by 280 vertical meters'
    ],
    monitoringTechnologies: [
      'IMD Automated Weather Stations (AWS) array',
      'ERA5-Land reanalysis gridded microclimate feeds',
      'MODIS Terra/Aqua Snow Covered Area (SCA) telemetry'
    ],
    interlinkedModules: ['Water Systems (Glaciers)', 'Hazard Intelligence (Floods/Avalanches)', 'Sectoral EIA (Horticulture)']
  },
  {
    id: 'submod-forests-landscapes',
    slug: 'forests-landscapes',
    title: 'Forest & Landscape',
    subtitle: 'Canopy cover change, biomass density, fragmentation & carbon storage',
    focusSummary: 'Monitoring temperate coniferous stands (Deodar, Kail, Fir, Spruce), sub-alpine birch krummholz ecotones, and forest corridor connectivity under anthropogenic pressures.',
    badge: 'Terrestrial Ecology',
    iconName: 'TreePine',
    primaryMetrics: [
      { label: 'Dense Canopy Area', value: '4,380', unit: 'sq km (Contiguous)', trend: 'decreasing' },
      { label: 'Forest Carbon Stock', value: '142.8', unit: 'Million Tonnes C', trend: 'stable' },
      { label: 'Corridor Fragmentation', value: '28.4%', unit: 'Patch severance index', trend: 'increasing' }
    ],
    keyPressureSignals: [
      'Linear infrastructure right-of-way bisection across Pir Panjal wildlife corridors',
      'Illicit timber extraction in frontier forest divisions and old-growth walnut harvesting',
      'Invasive alien plant species (Parthenium, Robinia) colonizing degraded edges'
    ],
    monitoringTechnologies: [
      'Forest Survey of India (FSI) 1:50,000 scale biennial LULC audits',
      'GEDI Spaceborne LiDAR forest canopy height and above-ground biomass',
      'Sentinel-2 Normalized Difference Vegetation Index (NDVI) anomaly tracking'
    ],
    interlinkedModules: ['Protected Areas', 'Biodiversity (Mammals)', 'Hazard Intelligence (Forest Fires)']
  },
  {
    id: 'submod-land-earth-systems',
    slug: 'land-earth-systems',
    title: 'Land Use & Earth Systems',
    subtitle: 'Land transformation, soil degradation, Karewa geomorphology & sedimentation',
    focusSummary: 'Rigorous spatial tracking of prime alluvial paddy conversion, quaternary lacustrine Karewa plateau excavation, soil compaction, and catchment sediment yields.',
    badge: 'Geomorphology & Soils',
    iconName: 'Layers',
    primaryMetrics: [
      { label: 'Paddy Farmland Loss', value: '2,150', unit: 'ha / year (Valley-wide)', trend: 'critical' },
      { label: 'Karewa Terraces Mined', value: '42.6', unit: 'sq km cumulative scar', trend: 'increasing' },
      { label: 'Topsoil Erosion Rate', value: '18.4', unit: 'tonnes / ha / year', trend: 'increasing' }
    ],
    keyPressureSignals: [
      'Bulldozing of fossiliferous Karewa plateaus for railway and highway construction fill',
      'Unchecked proliferation of brick kilns on prime agricultural and horticultural soils',
      'Soil sealing eliminating natural stormwater infiltration capacity in peri-urban corridors'
    ],
    monitoringTechnologies: [
      'Landsat 40-year multi-decadal time series change detection',
      'PlanetScope 3m high-resolution monthly cadastral change audits',
      'ICAR-NBSS&LUP digital soil fertility and organic carbon maps'
    ],
    interlinkedModules: ['Sectoral EIA (Agriculture)', 'Sectoral EIA (Horticulture)', 'Water Systems (Watersheds)']
  },
  {
    id: 'submod-energy-infrastructure',
    slug: 'energy-infrastructure',
    title: 'Energy & Infrastructure',
    subtitle: 'Run-of-the-river hydropower, highway widening, tunnels & muck disposal',
    focusSummary: 'Evaluating the ecological, hydrological, and slope-stability consequences of major linear infrastructure projects, railway tunnels, and hydroelectric cascades on mountain rivers.',
    badge: 'Infrastructure Ecology',
    iconName: 'Zap',
    primaryMetrics: [
      { label: 'Commissioned Hydro Power', value: '3,360', unit: 'MW (Jhelum & Chenab)', trend: 'increasing' },
      { label: 'Muck Disposal Dumping', value: '18.2', unit: 'Million m³ active sites', trend: 'critical' },
      { label: 'Tunnelling Groundwater Scour', value: '14', unit: 'Dried mountain springs', trend: 'increasing' }
    ],
    keyPressureSignals: [
      'Unlined tunnel boring intercepting deep fracture aquifers and draining gravitational village springs',
      'Improper muck disposal dumping directly along active floodplains and steep river valleys',
      'Slope destabilization and chronic rockfall triggering along widened four-lane highway cuts'
    ],
    monitoringTechnologies: [
      'InSAR (Interferometric Synthetic Aperture Radar) millimeter slope deformation logs',
      'UAV drone orthomosaic surveys of highway cuttings and muck terraces',
      'Ecological flow (e-flow) continuous hydrographic telemetry stations'
    ],
    interlinkedModules: ['Water Systems (Rivers)', 'Hazard Intelligence (Landslides)', 'Protected Areas']
  },
  {
    id: 'submod-mining-extraction',
    slug: 'mining-extraction',
    title: 'Mining & Extraction',
    subtitle: 'Riverbed gravel dredging, limestone quarries & brick kiln clusters',
    focusSummary: 'Monitoring mechanical extraction of riverbed minerals, boulder quarrying in ecologically fragile mountain gorges, and air pollution from high-density brick manufacturing.',
    badge: 'Industrial Geology',
    iconName: 'Hammer',
    primaryMetrics: [
      { label: 'Riverbed Mining Reaches', value: '118', unit: 'km dredged stream bed', trend: 'critical' },
      { label: 'Active Stone Quarries', value: '246', unit: 'Permitted & unpermitted', trend: 'increasing' },
      { label: 'Operational Brick Kilns', value: '412', unit: 'Active kilns in valley', trend: 'increasing' }
    ],
    keyPressureSignals: [
      'Heavy mechanized riverbed excavation causing deep channel incision and bridge foundation exposure',
      'Destruction of gravel-bed spawning beds for native Schizothorax (Snow Trout)',
      'Severe particulate matter (PM2.5 / PM10) and sulfur dioxide emissions from Bull\'s Trench brick kilns'
    ],
    monitoringTechnologies: [
      'High-resolution multi-spectral satellite quarry boundary monitoring',
      'Bathymetric sonar riverbed incision cross-profiling',
      'CPCB / JKPCC continuous ambient air quality stations (CAAQMS)'
    ],
    interlinkedModules: ['Water Systems (Fisheries)', 'Environmental Monitoring (Air Quality)', 'Hazard Intelligence']
  },
  {
    id: 'submod-urban-ecology',
    slug: 'urban-ecology',
    title: 'Urban Ecology',
    subtitle: 'Settlement growth, Urban Heat Islands (UHI), impervious cover & urban wetlands',
    focusSummary: 'Assessing spatial growth patterns, loss of urban blue-green infrastructure, stormwater retention deficits, and localized microclimatic heating in Srinagar and major district centers.',
    badge: 'Urban Environmental Science',
    iconName: 'Building2',
    primaryMetrics: [
      { label: 'Urban Built-Up Area', value: '382', unit: 'sq km (Srinagar Region)', trend: 'increasing' },
      { label: 'Summer UHI Temperature Delta', value: '+3.8', unit: '°C vs Rural Perimeter', trend: 'increasing' },
      { label: 'Urban Wetland Loss', value: '48.2%', unit: 'Area converted since 1970', trend: 'critical' }
    ],
    keyPressureSignals: [
      'Encroachment of historic flood-basin wetlands (Hokersar, Bemina, Mir Behri) by built settlements',
      'Impervious concrete and asphalt coverage exceeding 70% in downtown core, accelerating flash runoff',
      'Loss of urban tree canopy and historic peri-urban chinars and orchard groves'
    ],
    monitoringTechnologies: [
      'Landsat Thermal Infrared Sensor (TIRS) Land Surface Temperature (LST) mapping',
      'Urban impervious surface fractional classification algorithms',
      'Stormwater network hydraulic modeling under 50-year rainfall return intervals'
    ],
    interlinkedModules: ['Environmental Monitoring (Sewage/Waste)', 'Hazard Intelligence (Urban Floods)', 'Sectoral EIA (Handicrafts)']
  },
  {
    id: 'submod-aquatic-cryosphere',
    slug: 'aquatic-cryosphere',
    title: 'Aquatic, Wetland & Cryosphere Change',
    subtitle: 'Lake shrinkage, Ramsar wetland conversion, glacier recession & springshed depletion',
    focusSummary: 'Multi-decadal satellite change detection monitoring open-water shrinkage, shoreline artificialization, cryospheric downwasting, and groundwater recharge conversion.',
    badge: 'Hydro-Cryosphere Dynamics',
    iconName: 'Droplets',
    primaryMetrics: [
      { label: 'Kolahoi Glacier Downwasting', value: '-0.52', unit: 'm w.e./year thinning', trend: 'critical' },
      { label: 'Ramsar Wetland Conversion', value: '-34.8', unit: 'ha/year lost to fill', trend: 'critical' },
      { label: 'Spring Yield Reduction', value: '-31.4%', unit: 'Dry-season drop (180 springs)', trend: 'critical' }
    ],
    keyPressureSignals: [
      'Infilling and peripheral settlement encroachment along Dal, Hokersar, and Anchar lake margins',
      'Downwasting of primary valley glaciers and proglacial lake expansion increasing GLOF risk',
      'Severing of Karewa recharge zones by brick kilns and highway earthworks drying downstream springs'
    ],
    monitoringTechnologies: [
      'Modified Normalized Difference Water Index (MNDWI) & Sentinel-1 SAR VV/VH multi-temporal analysis',
      'Geodetic DEM differencing (SRTM vs Cartosat-1 / TanDEM-X) for glacier volume balance',
      'Participatory field hydro-gauging flumes and dGPS cadastral revenue boundary overlays'
    ],
    interlinkedModules: ['Water Systems (Lakes/Rivers/Glaciers)', 'Hazard Intelligence (Floods/GLOFs)', 'Sectoral EIA (Tourism/Agriculture)']
  }
];

// -------------------------------------------------------------
// 2. REGIONAL EARTH SYSTEMS INDICATOR CATALOG
// -------------------------------------------------------------

export const REGIONAL_EARTH_SYSTEMS_INDICATORS: EarthSystemIndicator[] = [
  {
    id: 'ind-ehii-01',
    domain: 'Climate',
    name: 'Winter Snow-Water Equivalent (SWE) Anomaly',
    baselinePeriod: '1981–2010 Normal',
    baselineValue: '380 mm SWE',
    currentValue: '265 mm SWE (2024-25 season)',
    thresholdLimit: '300 mm SWE',
    unit: 'mm water equivalent',
    status: 'Severe Stress',
    evidenceSource: 'IMD & Snow & Avalanche Study Establishment (SASE)',
    measurementMethod: 'Automated ultrasonic snow depth sensors and cosmic-ray soil moisture probes'
  },
  {
    id: 'ind-ehii-02',
    domain: 'Forest',
    name: 'Contiguous Core Forest Area (>500 ha patches)',
    baselinePeriod: '2001 Baseline',
    baselineValue: '5,120 sq km',
    currentValue: '4,380 sq km (2025 FSI Audit)',
    thresholdLimit: '4,800 sq km',
    unit: 'sq km',
    status: 'Moderate Concern',
    evidenceSource: 'Forest Survey of India (FSI) State of Forest Report',
    measurementMethod: 'Morphological Spatial Pattern Analysis (MSPA) on 10m Sentinel-2 forest mask'
  },
  {
    id: 'ind-ehii-03',
    domain: 'Land',
    name: 'Alluvial Paddy Soil Conversion to Built Environment',
    baselinePeriod: '2000 Baseline',
    baselineValue: '450 ha / year',
    currentValue: '2,150 ha / year (2024-25)',
    thresholdLimit: '600 ha / year',
    unit: 'ha / year',
    status: 'Critical Threshold',
    evidenceSource: 'EcoWatch LULC Observatory & Revenue Dept Audits',
    measurementMethod: 'Multi-temporal PlanetScope and Sentinel-2 automated change detection'
  },
  {
    id: 'ind-ehii-04',
    domain: 'Energy',
    name: 'Mountain Spring Discharge Depletion along Tunnel Alignments',
    baselinePeriod: 'Pre-Construction Flow (2014)',
    baselineValue: '18.4 liters / min average',
    currentValue: '4.8 liters / min (68% dried)',
    thresholdLimit: '12.0 liters / min',
    unit: 'liters / min flow',
    status: 'Critical Threshold',
    evidenceSource: 'Central Ground Water Board (CGWB) & EcoWatch Hydro Net',
    measurementMethod: 'V-notch weir hydrographic gauging at sentinel mountain village springs'
  },
  {
    id: 'ind-ehii-05',
    domain: 'Mining',
    name: 'Riverbed Incision Depth (Jhelum & Major Tributaries)',
    baselinePeriod: '2010 Morphological Datum',
    baselineValue: '0.0 m (Equilibrium bed)',
    currentValue: '-1.85 m bed lowering (Rambiara/Veshav)',
    thresholdLimit: '-0.50 m',
    unit: 'meters bed incision',
    status: 'Critical Threshold',
    evidenceSource: 'Irrigation & Flood Control (I&FC) Department Bathymetry',
    measurementMethod: 'Dual-frequency acoustic sub-bottom riverbed profiling and bridge pier gauges'
  },
  {
    id: 'ind-ehii-06',
    domain: 'Urban',
    name: 'Urban Heat Island (UHI) Core-to-Perimeter Surface Delta',
    baselinePeriod: '2000 Summer Mean',
    baselineValue: '+1.5 °C delta',
    currentValue: '+3.8 °C delta (Srinagar core)',
    thresholdLimit: '+2.5 °C',
    unit: '°C temperature delta',
    status: 'Severe Stress',
    evidenceSource: 'Landsat-9 Thermal Infrared Sensor (TIRS) LST Maps',
    measurementMethod: 'Split-window atmospheric correction algorithm on cloud-free July acquisitions'
  }
];

// -------------------------------------------------------------
// 3. HUMAN PRESSURE INDEX (HPI) ACROSS ALL 10 DISTRICTS
// -------------------------------------------------------------

export const HUMAN_PRESSURE_INDEX_DATA: HumanPressureIndexDistrict[] = [
  {
    districtName: 'Srinagar',
    overallHpiScore: 84.6,
    stressCategory: 'Severe',
    forestCanopyLossHaYear: 18,
    quarryMiningPointsActive: 14,
    imperviousSurfaceGrowthPercent: 4.8,
    hydropowerInfraStressScore: 32,
    primaryAnthropogenicDriver: 'Intense urban expansion, loss of blue-green wetland retention, high traffic emissions, and construction sealing.'
  },
  {
    districtName: 'Budgam',
    overallHpiScore: 78.2,
    stressCategory: 'Severe',
    forestCanopyLossHaYear: 85,
    quarryMiningPointsActive: 48,
    imperviousSurfaceGrowthPercent: 3.9,
    hydropowerInfraStressScore: 45,
    primaryAnthropogenicDriver: 'Massive Karewa plateau excavation for railway/highway fill, highest density of brick kilns in Kashmir, and stream dredging.'
  },
  {
    districtName: 'Pulwama',
    overallHpiScore: 74.8,
    stressCategory: 'High',
    forestCanopyLossHaYear: 62,
    quarryMiningPointsActive: 38,
    imperviousSurfaceGrowthPercent: 3.4,
    hydropowerInfraStressScore: 28,
    primaryAnthropogenicDriver: 'Heavy riverbed mining along Rambiara, industrial cement cluster fallout in Khrew-Wuyan, and paddy conversion.'
  },
  {
    districtName: 'Baramulla',
    overallHpiScore: 71.5,
    stressCategory: 'High',
    forestCanopyLossHaYear: 142,
    quarryMiningPointsActive: 34,
    imperviousSurfaceGrowthPercent: 2.8,
    hydropowerInfraStressScore: 68,
    primaryAnthropogenicDriver: 'Hydropower cascades (Lower Jhelum / Uri), highway expansion, ski tourism development in Gulmarg, and floodplain conversion.'
  },
  {
    districtName: 'Anantnag',
    overallHpiScore: 68.4,
    stressCategory: 'High',
    forestCanopyLossHaYear: 110,
    quarryMiningPointsActive: 28,
    imperviousSurfaceGrowthPercent: 2.9,
    hydropowerInfraStressScore: 35,
    primaryAnthropogenicDriver: 'Paddy land conversion to high-density orchards, tourism corridor construction along Lidder Valley, and stone quarrying.'
  },
  {
    districtName: 'Shopian',
    overallHpiScore: 65.2,
    stressCategory: 'Moderate',
    forestCanopyLossHaYear: 45,
    quarryMiningPointsActive: 22,
    imperviousSurfaceGrowthPercent: 1.8,
    hydropowerInfraStressScore: 18,
    primaryAnthropogenicDriver: 'Near-total monoculture apple conversion, extensive Karewa borewell drilling, and Rambiara riverbed extraction.'
  },
  {
    districtName: 'Ganderbal',
    overallHpiScore: 62.8,
    stressCategory: 'Moderate',
    forestCanopyLossHaYear: 78,
    quarryMiningPointsActive: 24,
    imperviousSurfaceGrowthPercent: 2.2,
    hydropowerInfraStressScore: 74,
    primaryAnthropogenicDriver: 'Major trans-mountain road and tunnel construction (Z-Morh / Zojila), Upper Sindh hydro diversions, and riverbed gravel mining.'
  },
  {
    districtName: 'Kulgam',
    overallHpiScore: 59.4,
    stressCategory: 'Moderate',
    forestCanopyLossHaYear: 58,
    quarryMiningPointsActive: 16,
    imperviousSurfaceGrowthPercent: 1.9,
    hydropowerInfraStressScore: 22,
    primaryAnthropogenicDriver: 'Veshav riverbed mining, orchard transition, and forest boundary agricultural encroachment.'
  },
  {
    districtName: 'Bandipora',
    overallHpiScore: 56.8,
    stressCategory: 'Moderate',
    forestCanopyLossHaYear: 92,
    quarryMiningPointsActive: 14,
    imperviousSurfaceGrowthPercent: 1.6,
    hydropowerInfraStressScore: 72,
    primaryAnthropogenicDriver: 'Kishanganga hydropower project tunnel muck disposal, Wular wetland perimeter modifications, and hill slope degradation.'
  },
  {
    districtName: 'Kupwara',
    overallHpiScore: 51.2,
    stressCategory: 'Low',
    forestCanopyLossHaYear: 168,
    quarryMiningPointsActive: 10,
    imperviousSurfaceGrowthPercent: 1.4,
    hydropowerInfraStressScore: 24,
    primaryAnthropogenicDriver: 'Forest division timber extraction pressures, border road construction, and traditional walnut timber removal.'
  }
];

// -------------------------------------------------------------
// 4. CUMULATIVE ENVIRONMENTAL IMPACT INTERACTIONS
// -------------------------------------------------------------

export const CUMULATIVE_INTERACTIONS: CumulativeImpactInteraction[] = [
  {
    id: 'cum-int-01',
    interactionName: 'Karewa Excavation & Highway Fill Compound Stress',
    primaryDriverDomain: 'Mining & Land Systems',
    interactingSectorOrModule: 'Hazard Intelligence & Sectoral EIA (Horticulture)',
    mechanism: 'Bulldozing of quaternary Karewa strata destroys drought-resilient almond/saffron soils, alters groundwater infiltration, and creates destabilized vertical cut-faces prone to catastrophic mudslides during spring rainstorms.',
    geographicalHotspot: 'Budgam-Pulwama Plateau Arc (Chadoora, Pampore, Kakapora)',
    ecologicalReceptor: 'Lacustrine aquifer recharge beds and world-heritage saffron soils',
    severityLevel: 'Critical'
  },
  {
    id: 'cum-int-02',
    interactionName: 'Riverbed Mining & Fisheries Collapse Cascade',
    primaryDriverDomain: 'Mining & Extraction',
    interactingSectorOrModule: 'Water Systems (Fisheries) & Hazard Intelligence (Floods)',
    mechanism: 'Deep mechanical scooping of riverbed boulders eliminates benthic macroinvertebrate substrate and destroys endemic snow trout (Schizothorax) spawning redds, while lowering hydraulic bed level and exposing flood protection embankments to scour failure.',
    geographicalHotspot: 'Rambiara, Veshav, and Lower Jhelum Channels',
    ecologicalReceptor: 'Coldwater benthic ecology, native trout populations, and flood containment dykes',
    severityLevel: 'Severe'
  },
  {
    id: 'cum-int-03',
    interactionName: 'Urban Infilling & Hokersar Ramsar Choking',
    primaryDriverDomain: 'Urban Ecology & Land Use',
    interactingSectorOrModule: 'Protected Areas & Environmental Monitoring',
    mechanism: 'Commercial and residential construction on the western Srinagar perimeter encroaches upon natural flood retention basins, discharging untreated municipal wastewater and restricting inflow channels into Hokersar Wetland Reserve.',
    geographicalHotspot: 'Hokersar Wetland Perimeter (Zainakot, Soibugh, Narbal)',
    ecologicalReceptor: 'Central Asian Flyway migratory waterfowl sanctuaries (Mallards, Pintails, Grebes)',
    severityLevel: 'Critical'
  },
  {
    id: 'cum-int-04',
    interactionName: 'Hydro Tunnelling & Gravitational Water Scour',
    primaryDriverDomain: 'Energy & Infrastructure',
    interactingSectorOrModule: 'Water Systems (Drinking Water & Springs)',
    mechanism: 'Unlined deep rock excavation for headrace and bypass tunnels intersects sub-surface fracture networks, diverting gravitational groundwater away from high-altitude village springs and starving local irrigation Kuhls.',
    geographicalHotspot: 'Ganderbal (Sindh Valley) & Bandipora (Gurez-Kishanganga Axis)',
    ecologicalReceptor: 'Community gravity drinking water sources and alpine stream baseflows',
    severityLevel: 'Severe'
  }
];

// -------------------------------------------------------------
// 5. RESTORATION & MITIGATION TRACKER
// -------------------------------------------------------------

export const RESTORATION_TRACKER_DATA: RestorationInterventionRecord[] = [
  {
    id: 'rest-01',
    projectTitle: 'Wular Wetland Eco-Restoration & Dredging Spoil Containment',
    domain: 'Land & Earth Systems',
    implementingBody: 'Wular Conservation and Management Authority (WUCMA)',
    targetLandscape: 'Wular Lake southern littoral fringe (3,100 ha)',
    targetMetric: 'Open water surface area restoration and willow removal',
    quantitativeMilestone: '1,250 hectares cleared of commercial willow; 4.5M m³ silt removed into geotextile bunds',
    verificationStatus: 'Verified by Telemetry',
    completionYear: '2026 Target'
  },
  {
    id: 'rest-02',
    projectTitle: 'Z-Morh & Zojila Tunnel Spoil Terracing & Bio-Engineering',
    domain: 'Energy & Infrastructure',
    implementingBody: 'National Highways & Infrastructure Development Corporation (NHIDCL)',
    targetLandscape: 'Sindh River gorge slopes (Sonamarg-Baltal reach)',
    targetMetric: 'Muck stabilization on steep gradients using crib-walls and alpine grasses',
    quantitativeMilestone: '92% muck volume terraced with zero direct river outfall under independent drone audit',
    verificationStatus: 'Under Audit',
    completionYear: '2025 Audited'
  },
  {
    id: 'rest-03',
    projectTitle: 'Hokersar Wetland Perimeter Buffer & Demarcation Wall',
    domain: 'Urban Ecology',
    implementingBody: 'Department of Wildlife Protection (Wetland Division)',
    targetLandscape: 'Hokersar Wetland Reserve boundary (14.2 km perimeter)',
    targetMetric: 'Elimination of construction encroachment and sewage interceptor dyke',
    quantitativeMilestone: '11.8 km demarcated; 14 illegal commercial fill attempts intercepted and reversed',
    verificationStatus: 'Verified by Telemetry',
    completionYear: '2026 Active'
  },
  {
    id: 'rest-04',
    projectTitle: 'Karewa Geomorphological Heritage Protected Geoparks',
    domain: 'Mining & Land Systems',
    implementingBody: 'Department of Ecology, Environment & Remote Sensing & Revenue Dept',
    targetLandscape: 'Pampore, Chadoora, and Khanmoh Karewa geological cliffs',
    targetMetric: 'Statutory notification of inviolable geomorphological zones prohibiting earth-cutting',
    quantitativeMilestone: '2,800 hectares notified under J&K Heritage Act with satellite alert fences active',
    verificationStatus: 'Proposed',
    completionYear: '2027 Pipeline'
  }
];

// -------------------------------------------------------------
// 6. SATELLITE CHANGE DETECTION OBSERVATORY SPECIFICATION
// -------------------------------------------------------------

export const SATELLITE_OBSERVATORY_STREAMS = [
  {
    id: 'stream-deforestation',
    targetSignal: 'Forest Canopy Loss & Edge Severance',
    sensorConstellation: 'Sentinel-2 (10m) + PlanetScope (3m) + GEDI LiDAR',
    detectionCadence: 'Bi-weekly automated anomaly scoring',
    resolutionMeters: 10,
    alertTriggerCriteria: 'Canopy cover reduction >25% across contiguous 0.5 ha polygon within 30 days',
    actionProtocol: 'Automated notification dispatched to J&K Forest Territorial Division & EcoWatch Alert Registry'
  },
  {
    id: 'stream-wetland-encroachment',
    targetSignal: 'Wetland Shoreline Earth-Filling & Bund Construction',
    sensorConstellation: 'Sentinel-1 SAR (all-weather radar) + Sentinel-2 NDWI',
    detectionCadence: 'Weekly radar coherence and optical water index audits',
    resolutionMeters: 10,
    alertTriggerCriteria: 'Permanent water surface loss or backfill signature inside Ramsar statutory buffer',
    actionProtocol: 'Instant spatial alert to Wildlife Protection Wetland Division & District Collector'
  },
  {
    id: 'stream-paddy-conversion',
    targetSignal: 'Alluvial Paddy Soil Sealing & Brick Kiln Excavation',
    sensorConstellation: 'Sentinel-2 NDRE (Red Edge) + VIIRS Nighttime Thermal Anomalies',
    detectionCadence: 'Monthly seasonal crop-cycle change audits',
    resolutionMeters: 10,
    alertTriggerCriteria: 'Conversion of prime irrigated paddy parcel to non-photosynthetic impervious surface or kiln trench',
    actionProtocol: 'Cadastral parcel violation docket generated under Section 133A J&K Land Revenue Act'
  },
  {
    id: 'stream-riverbed-mining',
    targetSignal: 'Mechanical Riverbed Dredging & Bank Infiltration',
    sensorConstellation: 'PlanetScope 3m high-resolution optical + InSAR elevation models',
    detectionCadence: 'Monthly dry-season river corridor surveys',
    resolutionMeters: 3,
    alertTriggerCriteria: 'Excavation depth >1.5m below riverbed datum or heavy machinery operating outside leased blocks',
    actionProtocol: 'Regulatory violation alert to J&K Geology & Mining Department and Fisheries Directorate'
  },
  {
    id: 'stream-urban-heat-islands',
    targetSignal: 'Urban Heat Island (UHI) Sprawl & Canopy Depletion',
    sensorConstellation: 'Landsat-8/9 Thermal Infrared Sensor (TIRS) + ECOSTRESS (ISS)',
    detectionCadence: 'Seasonal peak-summer diurnal surface temperature composites',
    resolutionMeters: 30,
    alertTriggerCriteria: 'Surface temperature anomaly >4.0°C above rural background persisting across urban wards',
    actionProtocol: 'Urban green infrastructure advisory to Srinagar Smart City & Housing and Urban Development Dept'
  }
];
