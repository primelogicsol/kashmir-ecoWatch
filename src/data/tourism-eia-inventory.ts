/**
 * Kashmir EcoWatch - Sectoral Environmental Impact Assessment Engine (SEIAE)
 * Tourism Environmental Inventory & Official Census Database
 * 
 * Verified against:
 * - J&K Economic Survey 2025-26 (Directorate of Economics & Statistics)
 * - J&K Legislative Assembly responses & official Cut-Motion disclosures
 * - J&K LCMA (Lakes and Waterways Management Authority) GIS Houseboat Census 2024
 * - Ministry of Tourism Government of India statistical releases
 */

export interface OfficialTourismStat {
  id: string;
  metric: string;
  figure: string;
  numericValue: number | null;
  unit: string;
  referenceYear: string;
  geographicScope: 'Kashmir Division' | 'Jammu & Kashmir UT' | 'Specific Destination';
  publisher: string;
  sourceDocument: string;
  verificationStatus: 'Official Published' | 'Official GIS Survey' | 'Legislative Disclosure' | 'Pending Measurement';
  notes: string;
}

export interface HistoricalArrivalYear {
  year: number;
  totalVisits: number;
  domesticVisits: number | null;
  foreignVisits: number | null;
  scope: string;
  growthRateYoY?: string;
  sourceDoc: string;
  reconciliationNotes: string;
}

export interface TourismInventoryComponent {
  id: string;
  name: string;
  category: string;
  officialCountOrStatus: string;
  geographicHotspots: string[];
  keyEnvironmentalPressures: string[];
  monitoringParameters: string[];
  verificationStatus: 'Audited' | 'Partial Baseline' | 'Registry Established' | 'Census Pending';
  sourceReference: string;
}

export interface TrekkingTrailRecord {
  id: string;
  name: string;
  routeCode: string;
  startPoint: string;
  endPoint: string;
  totalDistanceKm: number;
  altitudeRangeMeters: [number, number]; // [min, max]
  typicalDurationDays: number;
  alpineLakesCrossed: string[];
  campsiteCapacityStatus: string;
  primaryEnvironmentalRisks: string[];
  officialStatus: 'Recognized Alpine Route' | 'Permit Controlled' | 'Unregulated High-Altitude Trail';
  sourceCitation: string;
}

export interface PilgrimageSiteRecord {
  id: string;
  name: string;
  tradition: 'Amarnath Yatra' | 'Sufi & Islamic Shrines' | 'Hindu & Heritage Temples' | 'Jammu Pilgrimage Corridor';
  annualPilgrimLoad: string;
  officialYear: string;
  geographicLocation: string;
  routeOrApproach: string[];
  seasonalConcentrationWindow: string;
  sanitationInfrastructure: string;
  environmentalPressures: string[];
  sourceDocument: string;
}

export interface HouseboatBasinRecord {
  basinName: string;
  registeredCount2024: number;
  gpsMapped: boolean;
  sewageManagementType: string;
  complianceRate: string;
  primaryReceivingWater: string;
  keyEnvironmentalRisk: string;
  officialSurveyReference: string;
}

// -------------------------------------------------------------
// 1. HEADLINE OFFICIAL TOURISM INVENTORY FIGURES (2023-2026)
// -------------------------------------------------------------

export const OFFICIAL_HEADLINE_STATISTICS: OfficialTourismStat[] = [
  {
    id: 'stat-tourist-visits-2025',
    metric: 'Annual Tourist Visits (Kashmir Division)',
    figure: '1,116,043',
    numericValue: 1116043,
    unit: 'Total Visits',
    referenceYear: '2025',
    geographicScope: 'Kashmir Division',
    publisher: 'J&K Directorate of Tourism / DES',
    sourceDocument: 'J&K Economic Survey 2025-26, Main Tourism Table',
    verificationStatus: 'Official Published',
    notes: 'Comprises 1,093,050 domestic visits and 22,993 foreign visits recorded specifically in Kashmir Division. Reflects total visits recorded by destination counters, not unique individual persons.'
  },
  {
    id: 'stat-registered-houseboats',
    metric: 'Registered Houseboats (Dal & Nigeen Lakes)',
    figure: '849',
    numericValue: 849,
    unit: 'Registered Vessels',
    referenceYear: '2024',
    geographicScope: 'Specific Destination',
    publisher: 'J&K Lake Conservation and Management Authority (LCMA)',
    sourceDocument: 'Official GIS-Based Houseboat Position Census 2024',
    verificationStatus: 'Official GIS Survey',
    notes: 'Complete GPS-indexed enumeration of active houseboats across Dal Lake, Nigeen Lake, and Chinar Bagh. Replaces previous unverified estimates of 900-1,200 vessels.'
  },
  {
    id: 'stat-registered-hotels',
    metric: 'Registered Hotels & Commercial Accommodations',
    figure: '659',
    numericValue: 659,
    unit: 'Registered Establishments',
    referenceYear: '2023-24',
    geographicScope: 'Kashmir Division',
    publisher: 'Directorate of Economics & Statistics, J&K',
    sourceDocument: 'J&K Digest of Statistics 2023-24 & Legislative Assembly Responses',
    verificationStatus: 'Legislative Disclosure',
    notes: 'Includes registered hotels and registered commercial guest houses across all 10 Kashmir Division districts. Unregistered boutique stays and farm homestays excluded.'
  },
  {
    id: 'stat-amarnath-pilgrims',
    metric: 'Shri Amarnathji Yatra Pilgrim Inflow',
    figure: '414,311',
    numericValue: 414311,
    unit: 'Yatris Registered & Completed',
    referenceYear: '2025',
    geographicScope: 'Specific Destination',
    publisher: 'Shri Amarnathji Shrine Board (SASB) / J&K Home Dept',
    sourceDocument: 'J&K Legislative Assembly Session Official Cut-Motion Disclosures 2025',
    verificationStatus: 'Official Published',
    notes: 'Documented pilgrim count across both Pahalgam-Chandanwari and Baltal-Domail high-altitude corridors over the 45-day summer pilgrimage window.'
  },
  {
    id: 'stat-bed-inventory',
    metric: 'Commercial Bed Capacity (Kashmir Division)',
    figure: 'Pending Official Census',
    numericValue: null,
    unit: 'Commercial Beds',
    referenceYear: '2025-26',
    geographicScope: 'Kashmir Division',
    publisher: 'Directorate of Tourism Kashmir',
    sourceDocument: 'Hospitality Capacity Audit (In Progress)',
    verificationStatus: 'Pending Measurement',
    notes: 'While 2,802 homestays are registered across J&K UT (Sept 2026), the authoritative district-wise bed capacity for Kashmir Division is undergoing verification by EcoWatch.'
  },
  {
    id: 'stat-trekking-trails',
    metric: 'Officially Mapped Alpine Trekking Trails',
    figure: 'Pending GIS Registry',
    numericValue: null,
    unit: 'Gazetted Trails',
    referenceYear: '2026',
    geographicScope: 'Kashmir Division',
    publisher: 'Kashmir EcoWatch Alpine Working Group',
    sourceDocument: 'Tourism Trail Environmental Registry (TTER-2026)',
    verificationStatus: 'Pending Measurement',
    notes: 'No single government gazette exists for all trekking routes. EcoWatch has established a GIS registry starting with 8 primary alpine corridors to prevent arbitrary trail counts.'
  }
];

// -------------------------------------------------------------
// 2. HISTORICAL TOURIST ARRIVALS SERIES (2021-2025)
// -------------------------------------------------------------

export const HISTORICAL_ARRIVALS_SERIES: HistoricalArrivalYear[] = [
  {
    year: 2021,
    totalVisits: 665000,
    domesticVisits: 663400,
    foreignVisits: 1600,
    scope: 'Kashmir Division',
    growthRateYoY: 'Base Post-Lockdown',
    sourceDoc: 'J&K Economic Survey 2022-23',
    reconciliationNotes: 'Early post-pandemic recovery window characterized by limited flight schedules and strict health checks.'
  },
  {
    year: 2022,
    totalVisits: 2670000,
    domesticVisits: 2650000,
    foreignVisits: 20000,
    scope: 'Kashmir Division',
    growthRateYoY: '+301.5%',
    sourceDoc: 'J&K Economic Survey 2023-24',
    reconciliationNotes: 'Historic domestic travel surge following nationwide travel relaxation; unprecedented autumn and winter demand in Gulmarg and Pahalgam.'
  },
  {
    year: 2023,
    totalVisits: 2710000,
    domesticVisits: 2672000,
    foreignVisits: 38000,
    scope: 'Kashmir Division',
    growthRateYoY: '+1.5%',
    sourceDoc: 'J&K Economic Survey 2024-25',
    reconciliationNotes: 'Stabilization at elevated volume; international G20 Tourism Working Group meeting in Srinagar increased international arrivals.'
  },
  {
    year: 2024,
    totalVisits: 3140000,
    domesticVisits: 3088000,
    foreignVisits: 52000,
    scope: 'Kashmir Division',
    growthRateYoY: '+15.8%',
    sourceDoc: 'Directorate of Tourism Statistical Bulletin 2024',
    reconciliationNotes: 'Highest aggregate recorded tourist footfall in regional history, creating acute seasonal water and solid waste choke points in Gulmarg, Pahalgam, and Dal Lake.'
  },
  {
    year: 2025,
    totalVisits: 1116043,
    domesticVisits: 1093050,
    foreignVisits: 22993,
    scope: 'Kashmir Division (Official Table)',
    growthRateYoY: 'Standardized Table',
    sourceDoc: 'J&K Economic Survey 2025-26 (Main Tourism Table, Table 12.1)',
    reconciliationNotes: 'Official annual table for Kashmir Division. Note: Differs from composite UT-wide publicity claims by strictly documenting verified divisional entry registrations. Amarnath Yatris (414,311) are tallied under a distinct legislative head.'
  }
];

// -------------------------------------------------------------
// 3. REQUIRED 12-COMPONENT TOURISM ENVIRONMENTAL INVENTORY
// -------------------------------------------------------------

export const TOURISM_INVENTORY_COMPONENTS: TourismInventoryComponent[] = [
  {
    id: 'inv-hotels-resorts',
    name: 'Hotels, Resorts & Commercial Hospitality',
    category: 'Built Infrastructure',
    officialCountOrStatus: '659 Registered Establishments (2023-24)',
    geographicHotspots: ['Srinagar (Boulevard, Rajbagh)', 'Gulmarg Resort Bowl', 'Pahalgam Lidder Valley', 'Sonamarg'],
    keyEnvironmentalPressures: [
      'Freshwater extraction from shallow unconfined aquifers via private borewells',
      'Diesel generator particulate and black carbon emissions during winter grid outages',
      'Commercial kitchen greywater and organic waste loading exceeding municipal STPs'
    ],
    monitoringParameters: ['Liters water consumed/guest-night', 'Sewage treatment compliance rate (%)', 'Energy consumption kWh/occupied room'],
    verificationStatus: 'Partial Baseline',
    sourceReference: 'J&K Digest of Statistics 2023-24 / J&K Pollution Control Committee (JKPCC)'
  },
  {
    id: 'inv-houseboats',
    name: 'Houseboats & Lacustrine Living',
    category: 'Aquatic Hospitality',
    officialCountOrStatus: '849 Registered Vessels (Official 2024 GIS Census)',
    geographicHotspots: ['Dal Lake (Hazratbal Basin, Gagribal, Bod Dal)', 'Nigeen Lake', 'Jhelum & Chinar Bagh'],
    keyEnvironmentalPressures: [
      'Blackwater discharge into anaerobic sediment pockets in low-circulation basins',
      'Detergent phosphate enrichment accelerating invasive weed (Azolla, Ceratophyllum) blooms',
      'Structural timber maintenance chemical leaching (creosote, varnishes)'
    ],
    monitoringParameters: ['Holding tank pump-out frequency', 'Biochemical Oxygen Demand (BOD) at mooring docks', 'Fecal coliform MPN/100ml'],
    verificationStatus: 'Audited',
    sourceReference: 'J&K LCMA Official GIS Census 2024 & High Court Monitoring Committee Reports'
  },
  {
    id: 'inv-homestays',
    name: 'Homestays, Rural Stays & Guesthouses',
    category: 'Decentralized Hospitality',
    officialCountOrStatus: '2,802 Homestay Units (All J&K UT, Sept 2026)',
    geographicHotspots: ['Gurez Valley (Dawar, Tulail)', 'Aru Village', 'Doodhpathri', 'Pampore Rural Outskirts'],
    keyEnvironmentalPressures: [
      'Absence of organized rural solid waste collection, leading to open village dumping and burning',
      'Localized pit latrine leaching into high-altitude trout streams and drinking springs',
      'Rapid concrete conversion of vernacular timber-and-brick vernacular architecture'
    ],
    monitoringParameters: ['Waste generation kg/homestay-day', 'Proximity to unconfined drinking water spring (meters)', 'Earthen vs concrete footprint ratio'],
    verificationStatus: 'Registry Established',
    sourceReference: 'J&K Tourism Department Homestay Registration Portal (UT aggregate)'
  },
  {
    id: 'inv-tourist-arrivals',
    name: 'Tourist Inflow & Seasonal Visitor Pressure',
    category: 'Visitor Demographics',
    officialCountOrStatus: '1,116,043 Annual Visits (2025 Official Table)',
    geographicHotspots: ['Srinagar Urban Core', 'Gulmarg Meadow', 'Pahalgam Lidder Basin', 'Sonamarg Meadow'],
    keyEnvironmentalPressures: [
      'Extreme seasonal clustering: over 65% of visits occur between May 1 and July 31',
      'Destination carrying-capacity overshoot causing physical trampling of subalpine flora',
      'Municipal solid waste collection bottlenecks during peak weekend holidays'
    ],
    monitoringParameters: ['Peak-day visitor density (persons/hectare)', 'Seasonal arrival curve skewness', 'Domestic vs foreign waste footprint index'],
    verificationStatus: 'Audited',
    sourceReference: 'J&K Economic Survey 2025-26, Table 12.1'
  },
  {
    id: 'inv-trekking-hiking',
    name: 'Alpine Trekking, Camping & Trail Networks',
    category: 'Backcountry Recreation',
    officialCountOrStatus: '8 Core Alpine Corridors Mapped (Registry in progress)',
    geographicHotspots: ['Kashmir Great Lakes (KGL)', 'Tarsar-Marsar Basin', 'Kolahoi Glacier Cirque', 'Harmukh-Gangabal Plateau'],
    keyEnvironmentalPressures: [
      'Non-biodegradable trash accumulation (plastics, aluminum foils, gas canisters) at remote high-altitude campsites',
      'Pack-pony trail shearing, severe soil erosion, and muddy trenching on steep moraine slopes',
      'Uncontained human waste disposal in fragile periglacial lake catchments above tree line'
    ],
    monitoringParameters: ['Campers per designated campsite-night', 'Trail incision depth (cm)', 'Alpine lake littoral microplastic concentration'],
    verificationStatus: 'Registry Established',
    sourceReference: 'Kashmir EcoWatch Tourism Trail Environmental Registry (TTER-2026)'
  },
  {
    id: 'inv-pilgrimage',
    name: 'Religious & Pilgrimage Tourism Subsystem',
    category: 'Sacred Landscapes & Yatras',
    officialCountOrStatus: '414,311 Amarnath Yatris (2025) + Multimillion Shrine Congregations',
    geographicHotspots: ['Baltal & Chandanwari Axes', 'Hazratbal Dargah (Srinagar)', 'Charar-e-Sharief', 'Mata Kheer Bhawani (Tulmulla)'],
    keyEnvironmentalPressures: [
      'Concentrated high-altitude solid waste and sewage generation at Panchtarni, Sheshnag, and Baltal base camps',
      'High-frequency helicopter shuttle emissions and acoustic disturbance to Himalayan brown bear and hangul corridors',
      'Heavy vehicular congestion, diesel exhaust, and community water supply strain during sacred festival days'
    ],
    monitoringParameters: ['Tons solid waste transported from high camps/day', 'Helicopter flight sorties/hour', 'Total dissolved solids (TDS) in Lidder and Sindh headwaters'],
    verificationStatus: 'Audited',
    sourceReference: 'J&K Legislative Assembly Session Cut-Motion Papers & SASB Environment Bulletins'
  },
  {
    id: 'inv-winter-tourism',
    name: 'Winter Sports, Skiing & Cable Car Corridors',
    category: 'High-Altitude Cold Season',
    officialCountOrStatus: 'Gulmarg Apharwat Bowl (Gondola Phase I & II)',
    geographicHotspots: ['Gulmarg Ski Resort', 'Kongdoori Phase I', 'Apharwat Peak Phase II (3,980m)'],
    keyEnvironmentalPressures: [
      'Slope grooming and vegetation clearing on high-altitude alpine meadows (cryoturbated turf)',
      'High energy consumption from diesel generators and heating systems in sub-zero conditions',
      'Snow-groomer and snowmobile fuel leakages onto pristine subnivean snowpacks'
    ],
    monitoringParameters: ['Gondola passenger throughput/day', 'Liters fuel consumed per operating groomer', 'Soil compaction index beneath ski runs'],
    verificationStatus: 'Partial Baseline',
    sourceReference: 'Gulmarg Development Authority (GDA) & J&K Cable Car Corporation'
  },
  {
    id: 'inv-adventure-tourism',
    name: 'Motorized Adventure, ATVs, Rafting & Paragliding',
    category: 'Active Recreation',
    officialCountOrStatus: 'Permit-Governed Destination Fleets',
    geographicHotspots: ['Gulmarg Meadow Trails', 'Pahalgam Rafting Stretch', 'Sonamarg Thajiwas Track'],
    keyEnvironmentalPressures: [
      'All-Terrain Vehicle (ATV) tire ruts carving deep channels in delicate subalpine turf',
      'Exhaust noise disturbing avian nesting in temperate mixed pine-fir forests',
      'Overuse of pack ponies leading to overgrazing along subalpine glades'
    ],
    monitoringParameters: ['Active licensed ATVs per resort meadow', 'Pony population density on trail corridors', 'Acoustic noise dB(A) along tourist recreation corridors'],
    verificationStatus: 'Partial Baseline',
    sourceReference: 'Destination Tourism Development Authorities (GDA, PDA, SDA)'
  },
  {
    id: 'inv-water-tourism',
    name: 'Waterborne Recreation, Shikaras & Motor Vessels',
    category: 'Aquatic Mobility',
    officialCountOrStatus: '~4,200 Registered Shikaras + State Watercraft',
    geographicHotspots: ['Dal Lake', 'Nigeen Lake', 'Jhelum River Navigation Channel', 'Manasbal Lake'],
    keyEnvironmentalPressures: [
      'Motorized inspection craft wake erosion undermining sensitive reed (Phragmites) islands (floating gardens / Radh)',
      'Accidental outboard motor lubricating oil spillage in confined water bodies',
      'Acoustic disturbance to wintering migratory waterfowl (Anatidae)'
    ],
    monitoringParameters: ['Registered commercial shikara counts', 'Surface hydrocarbon film traces (mg/L)', 'Wave energy impact on littoral wetlands'],
    verificationStatus: 'Audited',
    sourceReference: 'J&K LCMA & Department of Tourism Marine Registry'
  },
  {
    id: 'inv-transportation',
    name: 'Tourist Transportation Corridors & Road Travel',
    category: 'Linear Infrastructure',
    officialCountOrStatus: 'Major Arterial Highway Corridors',
    geographicHotspots: ['NH-44 Qazigund-Srinagar Corridor', 'Srinagar-Tangmarg-Gulmarg Road', 'Khanabal-Pahalgam Axis'],
    keyEnvironmentalPressures: [
      'High vehicular congestion during peak summer and weekend snowfall days, elevating localized PM2.5 and NOx',
      'Uncontrolled vehicle parking encroaching on roadside forests and agricultural meadows',
      'Highway widening triggering slope instability, road cuts, and sediment siltation in adjoining streams'
    ],
    monitoringParameters: ['Peak hourly tourist vehicle passes (PCU/hr)', 'Roadside ambient PM2.5 (µg/m³)', 'Slope failure events per km of resort road'],
    verificationStatus: 'Partial Baseline',
    sourceReference: 'J&K Traffic Police & National Highway Authority of India (NHAI)'
  },
  {
    id: 'inv-construction',
    name: 'Tourism-Driven Land Conversion & Construction',
    category: 'Spatial Footprint',
    officialCountOrStatus: 'Development Authority Master Plan Zones',
    geographicHotspots: ['Pahalgam Master Plan Boundary', 'Tangmarg-Gulmarg Buffer Corridor', 'Dal Lake Green Belt (200m prohibition zone)'],
    keyEnvironmentalPressures: [
      'Unauthorized hotel expansions encroaching upon designated eco-fragile agricultural and orchard land',
      'Illegal earth-cutting and leveling of fragile Karewa plateaus for hospitality ventures',
      'De-vegetation of steep slopes accelerating gully erosion during spring cloudburst events'
    ],
    monitoringParameters: ['Hectares agricultural/forest land converted/year', 'Master Plan violation notices issued', 'Impervious surface expansion rate (%)'],
    verificationStatus: 'Audited',
    sourceReference: 'Town Planning Organization Kashmir & High Court Public Interest Litigation (PIL) Records'
  },
  {
    id: 'inv-cultural-heritage',
    name: 'Cultural, Garden & Heritage Tourism',
    category: 'Heritage Landscapes',
    officialCountOrStatus: 'Protected Monuments & Historic Mughal Gardens',
    geographicHotspots: ['Nishat & Shalimar Mughal Gardens', 'Pari Mahal Heritage Terraces', 'Old City Heritage Shrines', 'Avantipur Ruins'],
    keyEnvironmentalPressures: [
      'Massive weekend visitor trampling compacting centuries-old turf and root systems of heritage Chinar (Platanus orientalis) trees',
      'Groundwater over-extraction to maintain artificial fountains and historic water cascades during summer droughts',
      'Littering and inadequate solid waste segregation at major monument gates'
    ],
    monitoringParameters: ['Peak-day visitor entries per garden', 'Heritage Chinar tree health index', 'Water withdrawal for ornamental cascades (m³/day)'],
    verificationStatus: 'Audited',
    sourceReference: 'Department of Floriculture, Gardens & Parks J&K & Archaeological Survey of India (ASI)'
  }
];

// -------------------------------------------------------------
// 4. PILGRIMAGE TOURISM EIA SUBSYSTEM REGISTRY
// -------------------------------------------------------------

export const PILGRIMAGE_SUBSYSTEM_REGISTRY: PilgrimageSiteRecord[] = [
  {
    id: 'pilgrim-amarnath-yatra',
    name: 'Shri Amarnathji Yatra (High-Altitude Himalayan Cave)',
    tradition: 'Amarnath Yatra',
    annualPilgrimLoad: '414,311 yatris (2025 official count)',
    officialYear: '2025',
    geographicLocation: 'Anantnag & Ganderbal High Himalayan Mountain Corridors',
    routeOrApproach: [
      'Traditional Southern Track: Pahalgam → Chandanwari → Pissu Top → Sheshnag → Panchtarni → Holy Cave (3,888m)',
      'Northern Direct Track: Baltal → Domail → Barari Marg → Sangam → Holy Cave'
    ],
    seasonalConcentrationWindow: 'Late June to Mid-August (~45 to 52 days)',
    sanitationInfrastructure: 'Temporary deep-trench latrines, modular container toilets, and high-altitude decentralized STPs at Baltal and Nunwan base camps.',
    environmentalPressures: [
      'Solid waste accumulation (plastic water bottles, biscuit wrappers, tetrapacks) along moraines and glacier approaches',
      'High-frequency helicopter operations (Pahalgam/Baltal to Panchtarni) causing acoustic disturbance to alpine ungulates',
      'Heavy pack-pony traffic (over 12,000 animals) causing trail degradation, dung runoff, and stream contamination',
      'Diesel generator arrays at high camps (Sheshnag, Panchtarni) releasing black carbon onto adjoining snowfields'
    ],
    sourceDocument: 'J&K Legislative Assembly Session Official Cut-Motion Disclosures 2025 & SASB Reports'
  },
  {
    id: 'pilgrim-hazratbal-dargah',
    name: 'Hazratbal Dargah (Dargah Sharif, Dal Lake)',
    tradition: 'Sufi & Islamic Shrines',
    annualPilgrimLoad: 'Est. 1.2M+ annual visits; 100,000+ single-day congregations (Milad-un-Nabi)',
    officialYear: '2024-25',
    geographicLocation: 'Northern Shore of Dal Lake, Srinagar',
    routeOrApproach: ['Srinagar Foreshore Road', 'Naseem Bagh Road', 'Waterborne Shikara Approaches'],
    seasonalConcentrationWindow: 'Year-round Friday prayers; massive peak congregations during Eid-e-Milad-un-Nabi and Shab-e-Meraj',
    sanitationInfrastructure: 'Municipal sewerage connection to Hazratbal STP; dedicated ablution water recycling tanks.',
    environmentalPressures: [
      'Acute single-day vehicular gridlock on Boulevard and Foreshore roads elevating localized particulate emissions',
      'Ablution wastewater surges entering the Hazratbal basin of Dal Lake',
      'High plastic packaging disposal around peripheral community bazaars'
    ],
    sourceDocument: 'J&K Muslim Waqf Board Annual Reports & Srinagar Municipal Corporation (SMC)'
  },
  {
    id: 'pilgrim-charar-sharief',
    name: 'Shrine of Sheikh Noor-ud-Din Noorani (Charar-e-Sharief)',
    tradition: 'Sufi & Islamic Shrines',
    annualPilgrimLoad: 'Est. 600,000+ visits annually; 80,000+ peak Urs congregation',
    officialYear: '2024-25',
    geographicLocation: 'Charar-e-Sharief Karewa Ridge, Budgam District',
    routeOrApproach: ['Srinagar-Chadoora-Charar Road', 'Shopian-Pakharpora Ridge Track'],
    seasonalConcentrationWindow: 'Annual Urs of Sheikh-ul-Alam (Autumn window) + weekly Thursday congregations',
    sanitationInfrastructure: 'Town community septic systems; periodic municipal water tanker supplies.',
    environmentalPressures: [
      'Slope destabilization on fragile Karewa soils due to unregulated parking and construction',
      'Municipal solid waste overflow during Urs week exceeding town collection capacity',
      'Severe drinking water shortages in surrounding hill communities during peak festival weeks'
    ],
    sourceDocument: 'District Budgam Statistical Profile & Waqf Management Committee'
  },
  {
    id: 'pilgrim-kheer-bhawani',
    name: 'Mata Kheer Bhawani Shrine (Ragnya Devi Temple, Tulmulla)',
    tradition: 'Hindu & Heritage Temples',
    annualPilgrimLoad: 'Est. 45,000 to 65,000 pilgrims during annual Mela',
    officialYear: '2025',
    geographicLocation: 'Tulmulla Village, Ganderbal District',
    routeOrApproach: ['Srinagar-Ganderbal Road (NH-1D bypass)', 'Sumbal-Ganderbal Canal Road'],
    seasonalConcentrationWindow: 'Jyeshtha Ashtami (May - June, 3-day intense festival)',
    sanitationInfrastructure: 'Shrine board septic installations and temporary mobile bio-toilets deployed by district administration.',
    environmentalPressures: [
      'Spring water quality preservation: strict monitoring of organic milk, sugar, and flower offerings in the sacred natural pool',
      'Heavy single-day bus and vehicle convoys straining rural link roads across Ganderbal',
      'Plastic disposal around peripheral tent cities and community kitchens (langars)'
    ],
    sourceDocument: 'Ganderbal District Disaster Management Plan & Shrine Trust Publications'
  },
  {
    id: 'pilgrim-shankaracharya',
    name: 'Shankaracharya Temple (Takht-i-Suleiman Hill)',
    tradition: 'Hindu & Heritage Temples',
    annualPilgrimLoad: 'Est. 350,000+ annual tourist and pilgrim visits',
    officialYear: '2024-25',
    geographicLocation: 'Zabarwan Forest Ridge (1,100 ft above city), Srinagar',
    routeOrApproach: ['Dalgate Shankaracharya Hill Road (5.5 km winding forest climb)'],
    seasonalConcentrationWindow: 'April through October; Mahashivratri peak congregation',
    sanitationInfrastructure: 'Ridge-top containment septic tank pumped periodically by municipal vacuum trucks.',
    environmentalPressures: [
      'Hill road vehicular idling causing localized smog in sensitive reserved forest corridor',
      'Wildfire vulnerability: cigarette and litter disposal in dry Himalayan cedar (Cedrus deodara) pine needles',
      'Slope erosion along unauthorized pedestrian shortcut paths cut through protected forest canopy'
    ],
    sourceDocument: 'Archaeological Survey of India & J&K Department of Wildlife Protection'
  },
  {
    id: 'pilgrim-vaishno-devi-reference',
    name: 'Shri Mata Vaishno Devi Shrine (Jammu Region Reference Benchmark)',
    tradition: 'Jammu Pilgrimage Corridor',
    annualPilgrimLoad: '6,932,922 pilgrims (2025 official reported count)',
    officialYear: '2025',
    geographicLocation: 'Trikuta Hills, Reasi District (Jammu Division)',
    routeOrApproach: ['Katra Base Camp → Banganga → Adhkunwari → Sanjichhat → Bhawan (13 km track)'],
    seasonalConcentrationWindow: 'Year-round continuous flow; massive Navratri peaks (March-April & October)',
    sanitationInfrastructure: 'Full-track underground sewerage network, mechanized sweepers, 4 decentralized STPs, and dedicated water purification plants.',
    environmentalPressures: [
      'Massive waste generation benchmark: serves as comparative management model for high-density Himalayan pilgrimage',
      'Battery-operated transport and ropeways significantly reduced mule dung and erosion compared to traditional trails'
    ],
    sourceDocument: 'Ministry of Tourism Government of India & Shrine Board Annual Report 2025'
  }
];

// -------------------------------------------------------------
// 5. ALPINE TREKKING TRAILS ENVIRONMENTAL REGISTRY (INITIAL 8)
// -------------------------------------------------------------

export const TREKKING_TRAILS_REGISTRY: TrekkingTrailRecord[] = [
  {
    id: 'trail-kgl',
    name: 'Kashmir Great Lakes (KGL) Alpine Trek',
    routeCode: 'TTER-ALP-01',
    startPoint: 'Shitkadi (Sonamarg)',
    endPoint: 'Naranag (Wangath Valley)',
    totalDistanceKm: 72.5,
    altitudeRangeMeters: [2380, 4190], // Nichnai Pass & Gadsar Pass
    typicalDurationDays: 7,
    alpineLakesCrossed: ['Vishansar Lake', 'Kishansar Lake', 'Gadsar Lake', 'Yamsar Lake', 'Satsar Lake System', 'Gangabal Lake', 'Nundkol Lake'],
    campsiteCapacityStatus: 'High Stress (Peak July-August sees up to 450 campers/night at Nichnai and Vishansar)',
    primaryEnvironmentalRisks: [
      'Human waste pit leaching directly into oligotrophic glacial lake shorelines',
      'Trail shearing and erosion from over 300 daily pack mules on steep switchbacks',
      'Uncollected canned food waste and gas canisters buried in glacial moraines'
    ],
    officialStatus: 'Recognized Alpine Route',
    sourceCitation: 'Department of Tourism Trekking Map & EcoWatch Alpine Survey 2024'
  },
  {
    id: 'trail-tarsar-marsar',
    name: 'Tarsar–Marsar Twin Alpine Lakes Trek',
    routeCode: 'TTER-ALP-02',
    startPoint: 'Aru Village (Pahalgam)',
    endPoint: 'Surfraw / Sumbal (Sindh Valley)',
    totalDistanceKm: 48.0,
    altitudeRangeMeters: [2410, 4020], // Tarsar Pass
    typicalDurationDays: 5,
    alpineLakesCrossed: ['Tarsar Lake', 'Marsar Lake', 'Sundarsar Lake'],
    campsiteCapacityStatus: 'Moderate-High Stress (Aru and Lidderwat base pastures under severe pack-pony grazing)',
    primaryEnvironmentalRisks: [
      'Almond-shaped Tarsar lake littoral trampling and wild camping right at the water edge',
      'Fuelwood harvesting of dwarf juniper and birch (Betula utilis) by trekking staff',
      'Disruption to Dachigam-Overa Hangul (Cervus hanglu) migratory subalpine corridor'
    ],
    officialStatus: 'Recognized Alpine Route',
    sourceCitation: 'Pahalgam Development Authority & EcoWatch Wilderness Survey'
  },
  {
    id: 'trail-kolahoi-glacier',
    name: 'Kolahoi Glacier & Basmai Lake Trek',
    routeCode: 'TTER-ALP-03',
    startPoint: 'Aru Village',
    endPoint: 'Kolahoi Snout (Goddess of Light) / Basmai Pass',
    totalDistanceKm: 34.0,
    altitudeRangeMeters: [2410, 3650],
    typicalDurationDays: 4,
    alpineLakesCrossed: ['Dudh-Nag Lake', 'Basmai Lake'],
    campsiteCapacityStatus: 'Moderate Stress (Concentrated at Satlanjan and Kolahoi base camp)',
    primaryEnvironmentalRisks: [
      'Direct visitor trampling on receding Kolahoi Glacier snout moraines',
      'Contamination of West Lidder headwater stream which supplies drinking water to Pahalgam and Anantnag',
      'Campfire soot depositing on nearby glacier tongue, accelerating albedo reduction and ablation'
    ],
    officialStatus: 'Permit Controlled',
    sourceCitation: 'Department of Earth Sciences University of Kashmir & EcoWatch Glaciology'
  },
  {
    id: 'trail-gangabal-harmukh',
    name: 'Gangabal–Nundkol & Mt. Harmukh Circuit',
    routeCode: 'TTER-ALP-04',
    startPoint: 'Naranag Temple Ruins',
    endPoint: 'Naranag (Circuit via Butsheri Ridge)',
    totalDistanceKm: 32.0,
    altitudeRangeMeters: [2130, 3600],
    typicalDurationDays: 3,
    alpineLakesCrossed: ['Gangabal Lake', 'Nundkol Lake', 'Kolesar Lake'],
    campsiteCapacityStatus: 'Critical Stress on Butsheri Trail (Steepest pine ridge trail in Kashmir)',
    primaryEnvironmentalRisks: [
      'Severe slope erosion on the 4-hour continuous Butsheri zigzag ascent, with deep mud ruts',
      'Brown trout (Salmo trutta fario) breeding habitat degradation in Nundkol stream outlet',
      'Plastic and glass littering around historic Naranag 8th-century temple complex base'
    ],
    officialStatus: 'Recognized Alpine Route',
    sourceCitation: 'Wildlife Protection Department (Wangath Forest Range) & EcoWatch Field Registry'
  },
  {
    id: 'trail-gurez-tulail',
    name: 'Gurez to Tulail Valley Alpine Cross-Trail',
    routeCode: 'TTER-ALP-05',
    startPoint: 'Dawar (Gurez)',
    endPoint: 'Badab / Sheikhpora (Tulail)',
    totalDistanceKm: 42.0,
    altitudeRangeMeters: [2370, 3850],
    typicalDurationDays: 4,
    alpineLakesCrossed: ['Zadasar Lake', 'Habba Khatoon Alpine tarns'],
    campsiteCapacityStatus: 'Low-Moderate (Emerging wilderness corridor opened recently to domestic tourism)',
    primaryEnvironmentalRisks: [
      'High vulnerability of pristine Dardic high pastures to unregulated waste dumping',
      'Absence of any formal high-altitude sanitation infrastructure along the Kishanganga headwaters',
      'Border area vehicular ingress pushing into previously intact alpine meadow turf'
    ],
    officialStatus: 'Permit Controlled',
    sourceCitation: 'Bandipora District Tourism Cell & EcoWatch Border Highlands Survey'
  },
  {
    id: 'trail-sonamarg-thajiwas',
    name: 'Sonamarg to Thajiwas Glacier Day & Overnight Trail',
    routeCode: 'TTER-ALP-06',
    startPoint: 'Sonamarg Town',
    endPoint: 'Thajiwas Glacier Base / Hanging Glacier Viewpoint',
    totalDistanceKm: 9.0,
    altitudeRangeMeters: [2690, 3100],
    typicalDurationDays: 1,
    alpineLakesCrossed: ['Thajiwas Melt Tarns'],
    campsiteCapacityStatus: 'Severe Extreme Stress (Over 2,500 daily pony and foot visitors in June-July)',
    primaryEnvironmentalRisks: [
      'Pony dung accumulation washing directly into the Sindh River tributary',
      'Illegal tea and snack stall shanties spreading untreated wastewater and single-use plastic onto moraines',
      'Complete loss of subalpine meadow vegetation along the lower 3 km walking track'
    ],
    officialStatus: 'Recognized Alpine Route',
    sourceCitation: 'Sonamarg Development Authority (SDA) Ecological Audit 2024'
  },
  {
    id: 'trail-aru-lidder-valley',
    name: 'Aru to Lidderwat High Meadow Trail',
    routeCode: 'TTER-ALP-07',
    startPoint: 'Aru Village',
    endPoint: 'Lidderwat Meadow (Confluence of Kolahoi & Tarsar rivers)',
    totalDistanceKm: 11.5,
    altitudeRangeMeters: [2410, 3050],
    typicalDurationDays: 1,
    alpineLakesCrossed: ['None (Riverine valley corridor)'],
    campsiteCapacityStatus: 'High Stress (Prime gateway for both Kolahoi and Tarsar expeditions)',
    primaryEnvironmentalRisks: [
      'Severe trail compaction and loss of riparian willow vegetation along the Lidder riverbank',
      'Solid waste dumping at Lidderwat forest hut clearing',
      'Sanitation overflow from commercial trekking base camps into cold-water trout habitats'
    ],
    officialStatus: 'Recognized Alpine Route',
    sourceCitation: 'Pahalgam Development Authority & J&K Forest Department'
  },
  {
    id: 'trail-vishansar-kishansar',
    name: 'Vishansar to Kishansar & Gadsar Pass High-Altitude Section',
    routeCode: 'TTER-ALP-08',
    startPoint: 'Vishansar Lake Base',
    endPoint: 'Gadsar Military Post',
    totalDistanceKm: 16.0,
    altitudeRangeMeters: [3650, 4190], // Gadsar Pass (Highest point on KGL)
    typicalDurationDays: 1,
    alpineLakesCrossed: ['Vishansar Lake', 'Kishansar Lake', 'Gadsar Lake (Yamsar)'],
    campsiteCapacityStatus: 'Critical Fragility (Periglacial scree slope and fragile moss tundra)',
    primaryEnvironmentalRisks: [
      'Severe scree slope destabilization from human and pack-animal trampling on Gadsar Pass ascent',
      'Litter deposition in the pristine catchment of Gadsar Lake (famed for endemic high-altitude flora)',
      'Camping in unauthorized boulder zones disturbing snow leopard and Himalayan marmot habitats'
    ],
    officialStatus: 'Recognized Alpine Route',
    sourceCitation: 'EcoWatch Alpine Glaciology & Himalayan Biodiversity Survey 2024'
  }
];

// -------------------------------------------------------------
// 6. HOUSEBOAT BASIN INVENTORY (849 VESSELS, 2024 GIS SURVEY)
// -------------------------------------------------------------

export const HOUSEBOAT_BASIN_INVENTORY: HouseboatBasinRecord[] = [
  {
    basinName: 'Hazratbal & Western Dal Basin',
    registeredCount2024: 218,
    gpsMapped: true,
    sewageManagementType: 'Partial bio-digesters & municipal holding lines connected to Hazratbal STP',
    complianceRate: '58% connected to functional pipeline',
    primaryReceivingWater: 'Hazratbal Lake Basin',
    keyEnvironmentalRisk: 'Nutrient loading in stagnant bays where circulation is impeded by dense weed growth.',
    officialSurveyReference: 'LCMA GIS Survey 2024 / Report to J&K High Court'
  },
  {
    basinName: 'Bod Dal & Boulevard Frontage',
    registeredCount2024: 312,
    gpsMapped: true,
    sewageManagementType: 'Boulevard interceptor sewer trunkline connection',
    complianceRate: '72% connected',
    primaryReceivingWater: 'Boulevard Embayment (Dal Lake)',
    keyEnvironmentalRisk: 'Stormwater backflow and pump-out leakage during high-precipitation spring surges.',
    officialSurveyReference: 'LCMA Engineering Wing & JKPCC Monitoring Ledger 2024'
  },
  {
    basinName: 'Gagribal & Nehru Park Basin',
    registeredCount2024: 164,
    gpsMapped: true,
    sewageManagementType: 'Individual bio-tanks & peripheral sewer connections',
    complianceRate: '64% operational compliance',
    primaryReceivingWater: 'Gagribal Basin (Dal Lake)',
    keyEnvironmentalRisk: 'High tourist concentration and frequent shikara docking causing continuous surface oil and washwater agitation.',
    officialSurveyReference: 'LCMA GIS Houseboat Register 2024'
  },
  {
    basinName: 'Nigeen Lake Basin',
    registeredCount2024: 115,
    gpsMapped: true,
    sewageManagementType: 'Dedicated Nigeen STP interceptor line',
    complianceRate: '81% operational compliance',
    primaryReceivingWater: 'Nigeen Lake (Deep Water Body)',
    keyEnvironmentalRisk: 'Deep-water hypolimnetic oxygen depletion (DO < 2.0 mg/L in bottom strata during summer stagnation).',
    officialSurveyReference: 'Nigeen Lake Conservation Project & LCMA 2024'
  },
  {
    basinName: 'Chinar Bagh & Jhelum Waterway Inlets',
    registeredCount2024: 40,
    gpsMapped: true,
    sewageManagementType: 'Direct municipal line / Traditional septic pit containment',
    complianceRate: '42% compliant (Highest risk cluster)',
    primaryReceivingWater: 'Tsunt Kol / River Jhelum Outlet',
    keyEnvironmentalRisk: 'Slow-moving urban backwater with high anaerobic sludge accumulation and heavy metal binding.',
    officialSurveyReference: 'Srinagar Urban Waterways Audit 2024'
  }
];

// -------------------------------------------------------------
// 7. DESTINATION CARRYING CAPACITY INDICATORS (FORMULA AUDITED)
// -------------------------------------------------------------

export interface DestinationCarryingCapacityItem {
  destination: string;
  landscapeType: string;
  peakSeasonMonth: string;
  calculatedMaxSustainableLoad: string; // Denominator
  currentObservedPeakLoad: string; // Numerator
  stressLevel: 'Within Capacity' | 'Approaching Threshold' | 'Significant Overshoot' | 'Critical Overload';
  methodFormula: string;
  limitingFactor: string;
  evidenceSource: string;
}

export const DESTINATION_CARRYING_CAPACITY_REGISTRY: DestinationCarryingCapacityItem[] = [
  {
    destination: 'Gulmarg Meadow Resort Bowl',
    landscapeType: 'Subalpine Grassland / Mountain Bowl (2,650m)',
    peakSeasonMonth: 'January - February (Snow) & June (Summer)',
    calculatedMaxSustainableLoad: '3,800 visitors/day (Based on GDA Master Plan 2032 ecological envelope)',
    currentObservedPeakLoad: '7,200 - 9,500 visitors/day (Peak winter weekend surges)',
    stressLevel: 'Significant Overshoot',
    methodFormula: 'Effective Carrying Capacity = Physical Area (m²) × Rotation Factor × Reduction Coefficients (Slope, Turf Sensitivity, Water Supply)',
    limitingFactor: 'Water supply yield from Tangmarg headworks and wastewater treatment plant capacity (0.8 MLD limit)',
    evidenceSource: 'Gulmarg Development Authority & J&K Pollution Control Committee (2024)'
  },
  {
    destination: 'Dal Lake & Boulevard Embayment',
    landscapeType: 'Urban Freshwater Lacustrine System',
    peakSeasonMonth: 'May - July (Summer Vacation Peak)',
    calculatedMaxSustainableLoad: 'Formula under calibration (Requires facility-level blackwater meters and hourly shikara logs)',
    currentObservedPeakLoad: 'Est. 18,000 - 24,000 daily tourist entries along Boulevard / Ghats',
    stressLevel: 'Critical Overload',
    methodFormula: 'Limnological Assimilation Model: Dissolved Oxygen Consumption vs Re-aeration Rate + STP Interceptor Inflow Velocity',
    limitingFactor: 'Lake assimilation capacity for dissolved phosphorus (P) and nitrogen (N) without triggering toxic cyanobacteria blooms',
    evidenceSource: 'National Institute of Hydrology (NIH) & LCMA Water Quality Sensor Buoys (2024)'
  },
  {
    destination: 'Pahalgam Lidder Valley',
    landscapeType: 'Montane Riverine & Coniferous Forest Valley (2,130m)',
    peakSeasonMonth: 'June - July (Tourism & Amarnath Yatra Confluence)',
    calculatedMaxSustainableLoad: '5,500 tourists/day (Exclusive of transient pilgrims)',
    currentObservedPeakLoad: '12,000+ combined tourists and transit pilgrims/day',
    stressLevel: 'Critical Overload',
    methodFormula: 'Hydrological Stress Ratio = Peak Sewage Discharge / Lidder Minimum Summer River Infiltration Base Flow',
    limitingFactor: 'Riparian buffer capacity of West Lidder river and traffic throughput of single two-lane entry road',
    evidenceSource: 'Pahalgam Development Authority Environmental Appraisal & J&K Traffic Police Data'
  },
  {
    destination: 'Sonamarg Meadow & Sindh Gorge',
    landscapeType: 'High-Altitude Meadow & Glacial Valley (2,740m)',
    peakSeasonMonth: 'June - August (Baltal Yatra & Summer Stays)',
    calculatedMaxSustainableLoad: '2,500 visitors/day',
    currentObservedPeakLoad: '4,500 - 6,000 visitors/day',
    stressLevel: 'Significant Overshoot',
    methodFormula: 'Alpine Meadow Footprint Model: Maximum pack ponies and visitors permissible without exposing mineral soil',
    limitingFactor: 'Pony track erosion at Thajiwas and municipal solid waste transport to distant processing facilities',
    evidenceSource: 'Sonamarg Development Authority Ecological Carrying Capacity Assessment'
  },
  {
    destination: 'Gurez Valley (Dawar & Tulail)',
    landscapeType: 'Remote High-Altitude Border Valley (2,370m)',
    peakSeasonMonth: 'July - September',
    calculatedMaxSustainableLoad: '800 visitors/day (Ecological wilderness buffer limit)',
    currentObservedPeakLoad: '650 - 950 visitors/day (Rapidly expanding)',
    stressLevel: 'Approaching Threshold',
    methodFormula: 'Decentralized Homestay Carrying Capacity = Registered Homestay Beds × Village Water Supply Margin',
    limitingFactor: 'Total absence of central sewage treatment or sanitary landfill facilities in Gurez tehsil',
    evidenceSource: 'Bandipora District Administration & EcoWatch Wilderness Survey 2025'
  }
];
