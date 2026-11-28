// Evidence Intelligence Data Types and Registry
// This file defines the structure for evidence items across the Kashmir Environmental Intelligence Platform

export type EvidenceSourceType = 'official' | 'academic' | 'field' | 'citizen';
export type ConfidenceLevel = 'high' | 'medium' | 'low' | 'unverified';
export type EvidenceCategory = 'research' | 'report' | 'dataset' | 'policy' | 'method' | 'map' | 'guide';
export type EvidenceSubtype = 
  | 'peer_reviewed'
  | 'government_report'
  | 'field_observation'
  | 'satellite_data'
  | 'sensor_data'
  | 'traditional_knowledge'
  | 'management_plan'
  | 'assessment'
  | 'survey';

export type RelatedEntityType = 'species' | 'lake' | 'wetland' | 'district' | 'protected_area' | 'spring' | 'forest' | 'glacier';

export interface RelatedEntity {
  id: string;
  type: RelatedEntityType;
  name: string;
  slug?: string;
}

export interface ModuleReference {
  moduleId: string;
  moduleName: string;
  modulePath: string;
  usageContext: string; // e.g., "Risk Assessment", "Species Distribution", "Water Quality Analysis"
}

export interface MethodReference {
  methodId: string;
  methodName: string;
  description: string;
  protocol?: string;
}

export interface EvidenceItem {
  id: string;
  title: string;
  description: string;
  category: EvidenceCategory;
  subtype: EvidenceSubtype;
  
  // Source and confidence
  sourceType: EvidenceSourceType;
  confidence: ConfidenceLevel;
  
  // Authorship
  authors: string[];
  organization?: string;
  publishedDate: string; // ISO date
  
  // Content links
  doi?: string;
  url?: string;
  downloadUrl?: string;
  
  // Geographic scope
  districts: string[]; // District IDs
  locations?: {
    name: string;
    lat?: number;
    lng?: number;
  }[];
  
  // Related entities
  relatedEntities: RelatedEntity[];
  
  // Module usage tracking
  usedInModules: ModuleReference[];
  
  // Methods used
  methods?: MethodReference[];
  
  // Collections this belongs to
  collections: string[]; // Collection IDs
  
  // Metrics
  downloadCount: number;
  citationCount: number;
  lastUpdated: string;
  
  // Tags
  tags: string[];
  
  // Abstract/summary
  abstract: string;
  
  // Keywords for search
  keywords: string[];

  // Optional scientific rigor extensions (references, limitations, epistemic classification)
  references?: string[];
  limitations?: string[];
  evidenceClassification?: {
    measuredObservations: string[];
    documentedFindings: string[];
    scientificInferences: string[];
    excludedUnverifiedClaims: string[];
  };
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  icon: string; // Lucide icon name
  color: 'emerald' | 'blue' | 'amber' | 'purple' | 'red' | 'cyan';
  evidenceCount: number;
  featuredEvidenceIds: string[];
}

export interface BrowseCategory {
  id: string;
  name: string;
  icon: string;
  count: number;
  description?: string;
}

// ============================================================================
// EVIDENCE REGISTRY
// ============================================================================

export const evidenceRegistry: EvidenceItem[] = [
  // FLAGSHIP SCIENTIFIC ASSESSMENT — SHESHNAG LAKE
  {
    id: 'ev-lake-sheshnag-2026',
    title: 'Sheshnag Lake: Glacial Origin, Alpine Ecology and Environmental Sensitivity',
    description:
      'Multi-source limnological, glacial-geomorphological, and environmental sensitivity synthesis of Sheshnag Lake (34°05′37″N, 75°29′48″E; ~3,590 m a.s.l., Upper Lidder Valley, Anantnag), perennial headwater source of the East Lidder River.',
    category: 'research',
    subtype: 'assessment',
    sourceType: 'academic',
    confidence: 'high',
    authors: ['KEW Western Himalayan Cryosphere & Limnology Desk'],
    organization: 'Kashmir EcoWatch Western Himalayan',
    publishedDate: '2026-06-18',
    downloadUrl: '/api/datasets/water/sheshnag-lake?format=csv',
    districts: ['anantnag'],
    locations: [
      {
        name: 'Sheshnag Lake, Upper East Lidder Valley (34°05′37″N, 75°29′48″E)',
        lat: 34.0936,
        lng: 75.4967,
      },
    ],
    relatedEntities: [
      { id: 'sheshnag-lake', type: 'lake', name: 'Sheshnag Lake', slug: '/water-systems/lakes/sheshnag-lake' },
      { id: 'sheshnag-glacier', type: 'glacier', name: 'Sheshnag Glacier', slug: '/water-systems/glaciers/sheshnag-glacier' },
      { id: 'district-anantnag', type: 'district', name: 'Anantnag', slug: '/districts/anantnag' },
    ],
    usedInModules: [
      { moduleId: 'water-systems', moduleName: 'Water Systems & Limnology', modulePath: '/water-systems/lakes/sheshnag-lake', usageContext: 'Compiled Lidder headwater physicochemical reference baseline & NWIA wetland morphometry' },
      { moduleId: 'sectoral-eia', moduleName: 'Tourism Carrying Capacity EIA', modulePath: '/sectoral-eia/sectors/tourism', usageContext: 'High-altitude pilgrimage solid-waste & equine nutrient-runoff sensitivity' },
      { moduleId: 'atlas', moduleName: 'Geospatial GIS Atlas', modulePath: '/atlas', usageContext: 'High-altitude oligotrophic lake vector layer (NWIA Code 1103)' },
    ],
    methods: [
      { methodId: 'rs-glac-002', methodName: 'Sentinel-2 MSI & SRTM 1-Arc-Second Morphometric Verification', description: 'Copernicus Sentinel-2 (10 m / 20 m optical bands) shoreline delineation cross-checked against SAC/ISRO National Wetland Inventory (NWIA Class 1103) and NASA/USGS SRTM 30 m elevation hydrography across the ~38 km² upper catchment.' },
      { methodId: 'lim-001', methodName: 'Peer-Reviewed Lidder Headwater Hydrochemical Synthesis', description: 'Compilation of published APHA-standard physicochemical parameters from peer-reviewed Lidder Basin studies (pH ~7.6, DO ~9.7 mg/L, EC ~58 µS/cm, TDS ~44 mg/L, Turbidity ~1.2 NTU, NO3-N ~0.22 mg/L, PO4-P ~0.03 mg/L, BOD ~0.9 mg/L).' },
    ],
    collections: ['wetlands', 'climate'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2026-11-25',
    tags: ['Sheshnag Lake', 'alpine limnology', 'glacial lake', 'Lidder Watershed', 'Anantnag', 'carrying capacity'],
    abstract:
      'Sheshnag Lake (34.0936° N, 75.4967° E [34°05′37″N, 75°29′48″E]; elevation ~3,590 m a.s.l.; dimensions ~1.1 km × 0.7 km; SAC/ISRO NWIA dry-season lake surface ~0.59 km² within a ~1.1 km² seasonal meltwater basin) is an oligotrophic cirque-moraine glacial lake in the Upper Lidder Valley of Anantnag District that forms the perennial headwater reservoir of the East Lidder River. Geomorphologically inferred to have formed through Late Quaternary–Holocene glacial over-deepening and moraine impoundment, the basin is fed by meltwater streams from the Sheshnag–Kohinoor glacier complex. Compiled peer-reviewed Lidder headwater hydrochemistry documents cold, well-oxygenated, low-ionic waters (representative summer reference baseline: DO ~9.7 mg/L, pH ~7.6, EC ~58 µS/cm, TDS ~44 mg/L, BOD ~0.9 mg/L), supporting cold-stenothermal benthic macroinvertebrates and historically introduced Brown Trout (Salmo trutta fario). Seasonal high-density pilgrimage transit, equine-trail nutrient loading, riparian solid waste, and recession of feeding cirque glaciers expose this low-alkalinity alpine system to acute ecological sensitivity.',
    keywords: ['Sheshnag Lake', 'Sheshnag Lake ecology', 'East Lidder River headwaters', 'Kashmir alpine lakes', 'glacial geomorphology', 'Lidder Basin limnology'],
    evidenceClassification: {
      measuredObservations: [
        'Geographic centroid verified at 34.0936° N, 75.4967° E (34°05′37″N, 75°29′48″E) at ~3,590 m a.s.l. via NASA/USGS SRTM 30 m DEM and Copernicus Sentinel-2 MSI (10 m optical imagery).',
        'Basin morphometry measures ~1.1 km maximum length × ~0.7 km maximum width; SAC/ISRO National Wetland Atlas (NWIA Class 1103) delineates ~0.59 km² dry-season open-water area within a ~38 km² glacial headwater catchment.',
        'Direct hydrological outflow feeds the East Lidder (Chandanwari) branch of the Lidder River (Jhelum tributary).'
      ],
      documentedFindings: [
        'Published Lidder Basin water-quality studies (Rashid & Romshoo, 2013; Hajam et al., 2008) document an oligotrophic, calcium-bicarbonate, cold-stenothermal headwater regime (summer reference values: pH ~7.6, DO ~9.7 mg/L, EC ~58 µS/cm, TDS ~44 mg/L, NO3-N ~0.22 mg/L, PO4-P ~0.03 mg/L, BOD ~0.9 mg/L).',
        'Multi-source remote-sensing inventories of Lidder Basin glaciers (Aziz et al., 2024; Malik & Bhat, 2014) document sustained late-20th/early-21st-century glacier recession and watershed vulnerability across the upper East Lidder sub-basin.',
        'Ichthyofauna includes Brown Trout (Salmo trutta fario), documented in historical fisheries records as an introduced cold-water salmonid rather than an indigenous endemic species.'
      ],
      scientificInferences: [
        'Basin origin is inferred from cirque-trough morphology and terminal/recessional moraine geometry to represent Late Pleistocene (post-LGM) to Early Holocene glacial over-deepening and moraine damming within Panjal Trap and Paleozoic–Triassic strata.',
        'Low dissolved ionic buffering (EC < 65 µS/cm) implies heightened sensitivity to episodic summer nutrient pulses from high-density pilgrimage camps and pack-animal transit.'
      ],
      excludedUnverifiedClaims: [
        'No direct cosmogenic nuclide (10Be) exposure dating of the Sheshnag moraine sill or basal sediment radiocarbon (14C) core chronology exists in peer-reviewed literature; exact numerical lake-age claims are therefore excluded.',
        'Physicochemical parameters on this page are explicitly presented as a compiled regional literature baseline rather than a single-day KEW laboratory grab sample.',
        'Comprehensive multibeam echo-sounder bathymetry is unpublished; winter ice cover (November–May) precludes continuous year-round in-situ sampling.'
      ]
    },
    limitations: [
      'Seasonal snow and lake-ice cover (~6 months/year, November–May) restricts field hydrochemical sampling to summer ablation windows.',
      'Steep cirque shadow cast and slush-ice margins introduce ±10–20 m shoreline uncertainty in 10 m optical satellite composites.',
      'Direct radiometric age constraints (10Be moraine dating or basal sediment cores) and full-basin multibeam bathymetry remain unmeasured research gaps.'
    ],
    references: [
      'Rashid, I., & Romshoo, S. A. (2013). Impact of anthropogenic activities on water quality of Lidder River in Kashmir Himalayas. Environmental Monitoring and Assessment, 185(6), 4705–4719. https://doi.org/10.1007/s10661-012-2898-0',
      'Malik, M. I., & Bhat, M. S. (2014). Integrated approach for prioritizing watersheds for management: A study of Lidder Catchment of Kashmir Himalayas. Environmental Management, 54(6), 1267–1287. https://doi.org/10.1007/s00267-014-0361-4',
      'Aziz, K., et al. (2024). Parametric Analysis of Lidder Basin Glaciers in Kashmir Himalayas using Multi-Source Data. 2024 IEEE International India Geoscience and Remote Sensing Symposium (InGARSS). https://doi.org/10.1109/ingarss61818.2024.10984064',
      'Hajam, S. A., Bhat, S. U., & Pandit, A. K. (2008). Water quality analysis of Lidder Nalah in Kashmir Valley. Current World Environment, 3(2), 305–309. https://doi.org/10.12944/cwe.3.2.23',
      'Space Applications Centre (SAC), ISRO (2010). National Wetland Atlas: Jammu and Kashmir (NWIA High-Altitude Wetland Code 1103). Ministry of Environment & Forests, Govt. of India, Ahmedabad.'
    ],
  },

  // WETLAND EVIDENCE
  {
    id: 'ev-wetland-001',
    title: 'Hokersar Wetland Ecological Reference Summary (Desk Synthesis)',
    description: 'KEW desk-compiled ecological reference summary of Hokersar Wetland synthesizing published water quality, avifaunal, and anthropogenic pressure literature.',
    category: 'report',
    subtype: 'assessment',
    sourceType: 'official',
    confidence: 'high',
    authors: ['KEW Wetlands & Limnology Desk (Synthesizing J&K Wetland Authority & Ramsar RSIS #1570)'],
    organization: 'J&K Wetland Authority / Ramsar RSIS Reference (Third-Party Rights Retained)',
    publishedDate: '2024-02-15',
    downloadUrl: '/api/datasets/evidence/ev-wetland-001?format=csv',
    districts: ['srinagar'],
    relatedEntities: [
      { id: 'wetland-hokersar', type: 'wetland', name: 'Hokersar Wetland', slug: '/water-systems/wetlands/hokersar-wetland' },
      { id: 'district-srinagar', type: 'district', name: 'Srinagar', slug: '/districts/srinagar' },
    ],
    usedInModules: [
      { moduleId: 'water-systems', moduleName: 'Water Systems', modulePath: '/water-systems', usageContext: 'Baseline water quality parameters' },
      { moduleId: 'biodiversity', moduleName: 'Biodiversity', modulePath: '/biodiversity', usageContext: 'Wetland species distribution' },
    ],
    methods: [
      { methodId: 'wq-std-001', methodName: 'Standard Water Quality Parameters', description: 'pH, DO, BOD, COD, turbidity measurement protocol' },
    ],
    collections: ['wetlands', 'red-data'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2024-02-15',
    tags: ['wetland', 'water-quality', 'biodiversity', 'conservation'],
    abstract: 'This assessment documents the ecological status of Hokersar Wetland, a Ramsar site, revealing critical findings on eutrophication trends, invasive species spread, and habitat degradation.',
    keywords: ['Hokersar', 'Ramsar', 'eutrophication', 'waterbirds', 'wetland conservation'],
  },
  
  {
    id: 'ev-wetland-002',
    title: 'Dal Lake Water Quality Monitoring Dataset 2020-2024',
    description: 'Four-year longitudinal water quality dataset from 12 monitoring stations across Dal Lake.',
    category: 'dataset',
    subtype: 'sensor_data',
    sourceType: 'academic',
    confidence: 'high',
    authors: ['Kashmir University Limnology Lab'],
    organization: 'University of Kashmir',
    publishedDate: '2024-01-10',
    downloadUrl: '/api/datasets/water/dal-lake?format=csv',
    districts: ['srinagar'],
    relatedEntities: [
      { id: 'lake-dal', type: 'lake', name: 'Dal Lake', slug: '/water-systems/lakes/dal-lake' },
      { id: 'district-srinagar', type: 'district', name: 'Srinagar', slug: '/districts/srinagar' },
    ],
    usedInModules: [
      { moduleId: 'water-systems', moduleName: 'Water Systems', modulePath: '/water-systems', usageContext: 'Time-series water quality trends' },
      { moduleId: 'risk-monitoring', moduleName: 'Risk & Monitoring', modulePath: '/risk-monitoring', usageContext: 'Pollution hotspot identification' },
    ],
    methods: [
      { methodId: 'wq-std-001', methodName: 'Standard Water Quality Parameters', description: 'pH, DO, BOD, COD, turbidity measurement protocol' },
      { methodId: 'rs-001', methodName: 'Remote Sensing Analysis', description: 'Satellite-based chlorophyll and turbidity estimation' },
    ],
    collections: ['wetlands', 'climate'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2024-03-01',
    tags: ['Dal Lake', 'water-quality', 'time-series', 'monitoring'],
    abstract: 'High-frequency water quality measurements from Dal Lake spanning 2020-2024, including temperature, pH, dissolved oxygen, nutrients, and chlorophyll-a.',
    keywords: ['Dal Lake', 'water quality', 'eutrophication', 'monitoring', 'dataset'],
  },

  // SPECIES EVIDENCE
  {
    id: 'ev-species-001',
    title: 'Hangul Population Survey Dachigam 2023',
    description: 'Annual population survey of endangered Hangul (Kashmir Stag) in Dachigam National Park using camera traps and direct observation.',
    category: 'report',
    subtype: 'survey',
    sourceType: 'official',
    confidence: 'high',
    authors: ['Dr. S. Sathyakumar', 'J&K Wildlife Department'],
    organization: 'Wildlife Institute of India',
    publishedDate: '2023-12-01',
    downloadUrl: '/api/datasets/evidence/ev-species-001?format=csv',
    districts: ['srinagar'],
    relatedEntities: [
      { id: 'species-hangul', type: 'species', name: 'Hangul (Cervus hanglu)', slug: '/biodiversity/species/hangul-kashmir-stag' },
      { id: 'pa-dachigam', type: 'protected_area', name: 'Dachigam National Park', slug: '/protected-areas/dachigam-national-park' },
    ],
    usedInModules: [
      { moduleId: 'biodiversity', moduleName: 'Biodiversity', modulePath: '/biodiversity', usageContext: 'Population trend analysis' },
      { moduleId: 'protected-areas', moduleName: 'Protected Areas', modulePath: '/protected-network', usageContext: 'Conservation effectiveness' },
    ],
    methods: [
      { methodId: 'ct-001', methodName: 'Camera Trap Survey', description: 'Systematic camera trap deployment for population estimation' },
      { methodId: 'ds-001', methodName: 'Distance Sampling', description: 'Line transect-based population density estimation' },
    ],
    collections: ['red-data', 'forests'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2023-12-01',
    tags: ['Hangul', 'endangered', 'population', 'Dachigam', 'camera-trap'],
    abstract: 'The 2023 survey estimates a population of 261 Hangul in Dachigam, showing a marginal increase from previous years but highlighting continued conservation challenges.',
    keywords: ['Hangul', 'Kashmir Stag', 'population survey', 'endangered', 'Dachigam'],
  },

  {
    id: 'ev-species-002',
    title: 'Avian Diversity of Kashmir Wetlands - Field Guide',
    description: 'Comprehensive field guide documenting 187 waterbird species across Kashmir\'s major wetlands with identification keys and distribution maps.',
    category: 'guide',
    subtype: 'field_observation',
    sourceType: 'academic',
    confidence: 'high',
    authors: ['Dr. Bilal Habib', 'Dr. A. J. T. Johnsingh'],
    organization: 'Bombay Natural History Society',
    publishedDate: '2023-06-15',
    downloadUrl: '/api/datasets/evidence/ev-species-002?format=csv',
    districts: ['srinagar', 'ganderbal', 'bandipora'],
    relatedEntities: [
      { id: 'wetland-hokersar', type: 'wetland', name: 'Hokersar Wetland', slug: '/water-systems/wetlands/hokersar-wetland' },
      { id: 'wetland-shallabugh', type: 'wetland', name: 'Shallabugh Wetland', slug: '/water-systems/wetlands/shallabugh-wetland' },
    ],
    usedInModules: [
      { moduleId: 'biodiversity', moduleName: 'Biodiversity', modulePath: '/biodiversity', usageContext: 'Species identification and distribution' },
      { moduleId: 'environmental-monitoring', moduleName: 'Environmental Monitoring', modulePath: '/environmental-monitoring', usageContext: 'Bird sighting validation' },
    ],
    methods: [
      { methodId: 'pt-001', methodName: 'Point Count Survey', description: 'Standardized bird counting at fixed points' },
    ],
    collections: ['wetlands', 'red-data'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2023-06-15',
    tags: ['birds', 'waterbirds', 'field-guide', 'wetlands', 'biodiversity'],
    abstract: 'This field guide provides detailed species accounts, distribution maps, and seasonal occurrence patterns for waterbirds of Kashmir, serving as an essential reference for researchers and birdwatchers.',
    keywords: ['waterbirds', 'wetlands', 'field guide', 'Kashmir', 'avian diversity'],
  },

  // DISTRICT EVIDENCE
  {
    id: 'ev-district-001',
    title: 'Srinagar District Environmental Profile 2024',
    description: 'Comprehensive environmental profile covering land use, water resources, air quality, waste management, and ecological sensitivity zones.',
    category: 'report',
    subtype: 'government_report',
    sourceType: 'official',
    confidence: 'high',
    authors: ['J&K State Pollution Control Board'],
    organization: 'J&K SPCB',
    publishedDate: '2024-01-20',
    districts: ['srinagar'],
    relatedEntities: [
      { id: 'district-srinagar', type: 'district', name: 'Srinagar', slug: '/districts/srinagar' },
    ],
    usedInModules: [
      { moduleId: 'districts', moduleName: 'District Profiles', modulePath: '/districts', usageContext: 'District-level environmental indicators' },
      { moduleId: 'risk-monitoring', moduleName: 'Risk & Monitoring', modulePath: '/risk-monitoring', usageContext: 'Urban pollution assessment' },
    ],
    methods: [
      { methodId: 'aq-001', methodName: 'Air Quality Monitoring', description: 'CPCB standard air quality measurement protocol' },
      { methodId: 'lu-001', methodName: 'Land Use Classification', description: 'Remote sensing-based land use/land cover mapping' },
    ],
    collections: ['district-plans'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2024-01-20',
    tags: ['Srinagar', 'district-profile', 'air-quality', 'land-use', 'urban'],
    abstract: 'This profile presents a comprehensive environmental assessment of Srinagar District, highlighting key challenges including urban expansion, wetland degradation, and air quality concerns.',
    keywords: ['Srinagar', 'environmental profile', 'urban ecology', 'air quality', 'land use'],
  },

  {
    id: 'ev-district-002',
    title: 'Ganderbal District Climate Vulnerability Assessment',
    description: 'District-level climate vulnerability assessment identifying high-risk zones for glacial lake outburst floods, landslides, and changing precipitation patterns.',
    category: 'report',
    subtype: 'assessment',
    sourceType: 'academic',
    confidence: 'medium',
    authors: ['Dr. Irfan Rashid', 'Dr. Nilofar Khan'],
    organization: 'University of Kashmir - Climate Studies',
    publishedDate: '2023-11-10',
    downloadUrl: '/api/datasets/evidence/ev-district-002?format=csv',
    districts: ['ganderbal'],
    relatedEntities: [
      { id: 'district-ganderbal', type: 'district', name: 'Ganderbal', slug: '/districts/ganderbal' },
      { id: 'glacier-kolahoi', type: 'glacier', name: 'Kolahoi Glacier', slug: '/water-systems/glaciers/kolahoi-glacier' },
    ],
    usedInModules: [
      { moduleId: 'risk-monitoring', moduleName: 'Risk & Monitoring', modulePath: '/risk-monitoring', usageContext: 'Climate risk mapping' },
      { moduleId: 'districts', moduleName: 'District Profiles', modulePath: '/districts', usageContext: 'District climate indicators' },
    ],
    methods: [
      { methodId: 'cv-001', methodName: 'Climate Vulnerability Index', description: 'Multi-criteria vulnerability assessment framework' },
    ],
    collections: ['climate', 'district-plans'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2023-11-10',
    tags: ['Ganderbal', 'climate', 'vulnerability', 'GLOF', 'landslide'],
    abstract: 'This assessment identifies critical climate vulnerabilities in Ganderbal District, with particular focus on high-altitude communities at risk from glacial hazards and changing monsoon patterns.',
    keywords: ['climate change', 'vulnerability', 'Ganderbal', 'GLOF', 'adaptation'],
  },

  // SPRING EVIDENCE
  {
    id: 'ev-spring-001',
    title: 'Kokernag Spring Discharge Monitoring 2022-2024',
    description: 'Two-year discharge and water quality monitoring dataset from Kokernag, one of Kashmir\'s largest and most ecologically significant springs.',
    category: 'dataset',
    subtype: 'sensor_data',
    sourceType: 'field',
    confidence: 'high',
    authors: ['Kashmir Springs Observatory'],
    organization: 'Community Water Monitoring Network',
    publishedDate: '2024-02-28',
    districts: ['anantnag'],
    downloadUrl: '/api/datasets/water/kokernag-spring?format=csv',
    relatedEntities: [
      { id: 'spring-kokernag', type: 'spring', name: 'Kokernag Spring', slug: '/water-systems/springs/kokernag-spring' },
      { id: 'district-anantnag', type: 'district', name: 'Anantnag', slug: '/districts/anantnag' },
    ],
    usedInModules: [
      { moduleId: 'water-systems', moduleName: 'Water Systems', modulePath: '/water-systems', usageContext: 'Spring discharge trends' },
      { moduleId: 'risk-monitoring', moduleName: 'Risk & Monitoring', modulePath: '/risk-monitoring', usageContext: 'Climate impact on springs' },
    ],
    methods: [
      { methodId: 'sd-001', methodName: 'Spring Discharge Measurement', description: 'V-notch weir and flow meter-based discharge measurement' },
    ],
    collections: ['springs', 'climate'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2024-02-28',
    tags: ['Kokernag', 'spring', 'discharge', 'water-quality', 'monitoring'],
    abstract: 'Continuous monitoring reveals an 18% decline in Kokernag spring discharge over the study period, correlating with reduced snowfall and increased groundwater extraction.',
    keywords: ['Kokernag', 'spring', 'discharge', 'groundwater', 'climate impact'],
  },

  // FOREST EVIDENCE
  {
    id: 'ev-forest-001',
    title: 'Kashmir Forest Cover Change Analysis 2000-2024',
    description: 'Satellite-based forest cover change analysis showing spatial patterns of deforestation, degradation, and regeneration across Kashmir Division.',
    category: 'research',
    subtype: 'peer_reviewed',
    sourceType: 'academic',
    confidence: 'high',
    authors: ['Dr. M. L. Khan', 'Dr. A. K. Singh'],
    organization: 'Forest Survey of India & University of Delhi',
    publishedDate: '2024-01-05',
    downloadUrl: '/api/datasets/evidence/ev-forest-001?format=csv',
    districts: ['all'],
    relatedEntities: [
      { id: 'forest-kashmir', type: 'forest', name: 'Kashmir Forests', slug: '/earth-human-impact/forests-landscapes' },
    ],
    usedInModules: [
      { moduleId: 'environmental-monitoring', moduleName: 'Environmental Monitoring', modulePath: '/environmental-monitoring', usageContext: 'Forest cover trends' },
      { moduleId: 'atlas', moduleName: 'Atlas / Spatial Intelligence', modulePath: '/atlas', usageContext: 'Forest cover layer' },
    ],
    methods: [
      { methodId: 'rs-002', methodName: 'Landsat Time Series Analysis', description: 'Multi-temporal satellite image classification for forest cover mapping' },
    ],
    collections: ['forests', 'climate'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2024-01-05',
    tags: ['forest-cover', 'remote-sensing', 'deforestation', 'Landsat', 'time-series'],
    abstract: 'This study reveals a net forest cover loss of 3.2% in Kashmir Division over 24 years, with significant variation across elevation gradients and forest types.',
    keywords: ['forest cover', 'deforestation', 'remote sensing', 'Kashmir', 'Landsat'],
  },

  // CLIMATE EVIDENCE
  {
    id: 'ev-climate-001',
    title: 'Kashmir Temperature and Precipitation Trends 1980-2024',
    description: 'Long-term climate data analysis showing warming trends, changing precipitation patterns, and implications for water resources and agriculture.',
    category: 'research',
    subtype: 'peer_reviewed',
    sourceType: 'academic',
    confidence: 'high',
    authors: ['Dr. Rajiv Sinha', 'Dr. Anjal Prakash'],
    organization: 'IIT Kanpur & TERI',
    publishedDate: '2023-09-20',
    downloadUrl: '/api/datasets/evidence/ev-climate-001?format=csv',
    districts: ['all'],
    relatedEntities: [],
    usedInModules: [
      { moduleId: 'risk-monitoring', moduleName: 'Risk & Monitoring', modulePath: '/risk-monitoring', usageContext: 'Climate trend baseline' },
      { moduleId: 'environmental-monitoring', moduleName: 'Environmental Monitoring', modulePath: '/environmental-monitoring', usageContext: 'Climate impact monitoring' },
    ],
    methods: [
      { methodId: 'cs-001', methodName: 'Climate Station Data Analysis', description: 'Homogenization and trend analysis of meteorological data' },
    ],
    collections: ['climate'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2023-09-20',
    tags: ['climate', 'temperature', 'precipitation', 'trends', 'Himalaya'],
    abstract: 'Analysis reveals a warming rate of 0.03°C per year in Kashmir, with significant implications for snowfall reduction, glacier retreat, and water availability.',
    keywords: ['climate change', 'temperature trends', 'precipitation', 'Himalaya', 'Kashmir'],
  },

  // RED DATA / THREATS EVIDENCE
  {
    id: 'ev-reddata-001',
    title: 'Red Data Book of Kashmir Flora - 2023 Update',
    description: 'Comprehensive conservation status assessment of 347 threatened plant species endemic to Kashmir Himalaya with distribution maps and conservation recommendations.',
    category: 'report',
    subtype: 'assessment',
    sourceType: 'official',
    confidence: 'high',
    authors: ['Botanical Survey of India'],
    organization: 'Ministry of Environment, Forest and Climate Change',
    publishedDate: '2023-08-15',
    districts: ['all'],
    relatedEntities: [],
    usedInModules: [
      { moduleId: 'biodiversity', moduleName: 'Biodiversity', modulePath: '/biodiversity', usageContext: 'Threatened species status' },
      { moduleId: 'protected-areas', moduleName: 'Protected Areas', modulePath: '/protected-network', usageContext: 'Conservation prioritization' },
    ],
    methods: [
      { methodId: 'iucn-001', methodName: 'IUCN Red List Assessment', description: 'Standard IUCN criteria for threat categorization' },
    ],
    collections: ['red-data', 'forests'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2023-08-15',
    tags: ['red-data', 'threatened-species', 'flora', 'endemic', 'conservation'],
    abstract: 'This updated Red Data Book documents 347 threatened plant species in Kashmir, including 89 critically endangered, 142 endangered, and 116 vulnerable species.',
    keywords: ['Red Data Book', 'threatened plants', 'endemic', 'conservation status', 'Kashmir Himalaya'],
  },

  // POLICY EVIDENCE
  {
    id: 'ev-policy-001',
    title: 'J&K Wetland Conservation Policy 2023',
    description: 'Official policy framework for wetland conservation, management, and restoration across Jammu & Kashmir Union Territory.',
    category: 'policy',
    subtype: 'government_report',
    sourceType: 'official',
    confidence: 'high',
    authors: ['J&K Forest, Ecology and Environment Department'],
    organization: 'Government of J&K',
    publishedDate: '2023-05-01',
    districts: ['all'],
    relatedEntities: [],
    usedInModules: [
      { moduleId: 'water-systems', moduleName: 'Water Systems', modulePath: '/water-systems', usageContext: 'Policy framework reference' },
      { moduleId: 'districts', moduleName: 'District Profiles', modulePath: '/districts', usageContext: 'Policy compliance tracking' },
    ],
    methods: [],
    collections: ['wetlands', 'district-plans'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2023-05-01',
    tags: ['policy', 'wetland', 'conservation', 'government', 'regulation'],
    abstract: 'This policy establishes a comprehensive framework for wetland conservation including regulatory mechanisms, restoration programs, and community participation strategies.',
    keywords: ['wetland policy', 'conservation', 'J&K', 'regulation', 'management'],
  },

  // MAPS & GIS EVIDENCE
  {
    id: 'ev-map-001',
    title: 'Kashmir Watershed Boundary Dataset',
    description: 'High-resolution GIS dataset delineating watershed boundaries across Kashmir Division, derived from SRTM DEM and validated with field surveys.',
    category: 'map',
    subtype: 'satellite_data',
    sourceType: 'academic',
    confidence: 'high',
    authors: ['Kashmir Geospatial Lab'],
    organization: 'University of Kashmir',
    publishedDate: '2023-10-12',
    downloadUrl: '/api/datasets/evidence/ev-map-001?format=csv',
    districts: ['all'],
    relatedEntities: [],
    usedInModules: [
      { moduleId: 'atlas', moduleName: 'Atlas / Spatial Intelligence', modulePath: '/atlas', usageContext: 'Watershed boundary layer' },
      { moduleId: 'water-systems', moduleName: 'Water Systems', modulePath: '/water-systems', usageContext: 'Watershed analysis' },
    ],
    methods: [
      { methodId: 'dem-001', methodName: 'DEM-based Watershed Delineation', description: 'Hydrological analysis using SRTM 30m DEM' },
    ],
    collections: ['climate', 'forests'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2023-10-12',
    tags: ['GIS', 'watershed', 'DEM', 'hydrology', 'spatial'],
    abstract: 'This dataset provides watershed boundaries for 89 major and minor watersheds in Kashmir, essential for hydrological modeling and water resource management.',
    keywords: ['watershed', 'GIS', 'hydrology', 'DEM', 'Kashmir'],
  },

  // CITIZEN SCIENCE / FIELD EVIDENCE
  {
    id: 'ev-field-001',
    title: 'Community Spring Monitoring Network - Anantnag',
    description: 'Citizen science dataset documenting spring discharge and water quality from 47 springs across Anantnag District, collected by trained community volunteers.',
    category: 'dataset',
    subtype: 'field_observation',
    sourceType: 'citizen',
    confidence: 'medium',
    authors: ['Community Water Monitors'],
    organization: 'Kashmir Springs Observatory',
    publishedDate: '2024-03-01',
    districts: ['anantnag'],
    relatedEntities: [
      { id: 'district-anantnag', type: 'district', name: 'Anantnag', slug: '/districts/anantnag' },
    ],
    usedInModules: [
      { moduleId: 'environmental-monitoring', moduleName: 'Environmental Monitoring', modulePath: '/environmental-monitoring', usageContext: 'Community-collected data showcase' },
      { moduleId: 'water-systems', moduleName: 'Water Systems', modulePath: '/water-systems', usageContext: 'Spring monitoring data' },
    ],
    methods: [
      { methodId: 'cs-wq-001', methodName: 'Community Water Quality Testing', description: 'Simplified field kit-based water quality measurement protocol' },
    ],
    collections: ['springs'],
    downloadCount: 0,
    citationCount: 0,
    lastUpdated: '2024-03-01',
    tags: ['citizen-science', 'springs', 'community', 'Anantnag', 'water-quality'],
    abstract: 'This dataset demonstrates the power of community-based monitoring, with volunteers collecting monthly discharge and water quality data from local springs.',
    keywords: ['citizen science', 'springs', 'community monitoring', 'Anantnag'],
  },
];

// ============================================================================
// COLLECTIONS DEFINITIONS
// ============================================================================

export const collections: Collection[] = [
  {
    id: 'wetlands',
    name: 'Wetlands Intelligence',
    description: 'Evidence base for Kashmir\'s wetland ecosystems including water quality studies, biodiversity assessments, and conservation reports.',
    icon: 'waves',
    color: 'blue',
    evidenceCount: 0, // Computed at runtime
    featuredEvidenceIds: ['ev-wetland-001', 'ev-wetland-002'],
  },
  {
    id: 'district-plans',
    name: 'District Plans & Profiles',
    description: 'District-level environmental profiles, development plans, and vulnerability assessments for all districts.',
    icon: 'map',
    color: 'emerald',
    evidenceCount: 0,
    featuredEvidenceIds: ['ev-district-001', 'ev-district-002'],
  },
  {
    id: 'red-data',
    name: 'Red Data & Threatened Species',
    description: 'Conservation status assessments and threat documentation for endangered flora and fauna of Kashmir.',
    icon: 'triangle-alert',
    color: 'red',
    evidenceCount: 0,
    featuredEvidenceIds: ['ev-species-001', 'ev-reddata-001'],
  },
  {
    id: 'springs',
    name: 'Springs & Groundwater',
    description: 'Scientific studies and monitoring data on Kashmir\'s springs, aquifers, and groundwater resources.',
    icon: 'droplet',
    color: 'cyan',
    evidenceCount: 0,
    featuredEvidenceIds: ['ev-spring-001'],
  },
  {
    id: 'forests',
    name: 'Forests & Landscapes',
    description: 'Forest cover analysis, biodiversity studies, and landscape-level conservation research.',
    icon: 'trees',
    color: 'emerald',
    evidenceCount: 0,
    featuredEvidenceIds: ['ev-forest-001'],
  },
  {
    id: 'climate',
    name: 'Climate Intelligence',
    description: 'Climate change impact studies, vulnerability assessments, and adaptation research for Kashmir Himalaya.',
    icon: 'cloud-rain',
    color: 'amber',
    evidenceCount: 0,
    featuredEvidenceIds: ['ev-climate-001', 'ev-district-002'],
  },
];

// ============================================================================
// BROWSE CATEGORIES
// ============================================================================

export const browseByCategory: BrowseCategory[] = [
  { id: 'research', name: 'Research Papers', icon: 'file-text', count: 0, description: 'Peer-reviewed scientific publications' },
  { id: 'reports', name: 'Technical Reports', icon: 'file-text', count: 0, description: 'Government and institutional reports' },
  { id: 'datasets', name: 'Datasets', icon: 'database', count: 0, description: 'Raw and processed data collections' },
  { id: 'policy', name: 'Policy Documents', icon: 'scroll', count: 0, description: 'Official policies and regulations' },
  { id: 'methods', name: 'Methods & Protocols', icon: 'flask-conical', count: 0, description: 'Scientific methods and field protocols' },
  { id: 'maps', name: 'Maps & GIS', icon: 'map', count: 0, description: 'Spatial data and cartographic resources' },
];

export const browseByDistrict = [
  { id: 'srinagar', name: 'Srinagar', count: 0 },
  { id: 'anantnag', name: 'Anantnag', count: 0 },
  { id: 'baramulla', name: 'Baramulla', count: 0 },
  { id: 'ganderbal', name: 'Ganderbal', count: 0 },
  { id: 'pulwama', name: 'Pulwama', count: 0 },
  { id: 'kulgam', name: 'Kulgam', count: 0 },
  { id: 'budgam', name: 'Budgam', count: 0 },
  { id: 'kupwara', name: 'Kupwara', count: 0 },
];

export const browseByModule = [
  { id: 'protected-areas', name: 'Protected Areas', path: '/protected-network', count: 0 },
  { id: 'biodiversity', name: 'Biodiversity', path: '/biodiversity', count: 0 },
  { id: 'water-systems', name: 'Water Systems', path: '/water-systems', count: 0 },
  { id: 'environmental-monitoring', name: 'Environmental Monitoring', path: '/monitoring-overview', count: 0 },
  { id: 'air-noise-monitoring', name: 'Air & Noise Monitoring', path: '/risk-monitoring', count: 0 },
  { id: 'risk-monitoring', name: 'Risk & Monitoring', path: '/risk-monitoring', count: 0 },
  { id: 'districts', name: 'District Profiles', path: '/districts', count: 0 },
  { id: 'atlas', name: 'Atlas / Spatial Intelligence', path: '/atlas', count: 0 },
];

export const sourceTypeLabels: Record<EvidenceSourceType, string> = {
  official: 'Official Source',
  academic: 'Academic',
  field: 'Field Data',
  citizen: 'Citizen Science',
};

export const confidenceLabels: Record<ConfidenceLevel, string> = {
  high: 'High Confidence',
  medium: 'Medium Confidence',
  low: 'Low Confidence',
  unverified: 'Unverified',
};

export const categoryLabels: Record<EvidenceCategory, string> = {
  research: 'Research',
  report: 'Report',
  dataset: 'Dataset',
  policy: 'Policy',
  method: 'Method',
  map: 'Map',
  guide: 'Guide',
};

// Helper functions
export function getEvidenceByCollection(collectionId: string): EvidenceItem[] {
  return evidenceRegistry.filter(e => e.collections.includes(collectionId));
}

export function getEvidenceByDistrict(districtId: string): EvidenceItem[] {
  return evidenceRegistry.filter(e => e.districts.includes(districtId) || e.districts.includes('all'));
}

export function getEvidenceByModule(moduleId: string): EvidenceItem[] {
  return evidenceRegistry.filter(e => e.usedInModules.some(m => m.moduleId === moduleId));
}

export function getEvidenceByCategory(category: EvidenceCategory): EvidenceItem[] {
  return evidenceRegistry.filter(e => e.category === category);
}

export function getEvidenceBySourceType(sourceType: EvidenceSourceType): EvidenceItem[] {
  return evidenceRegistry.filter(e => e.sourceType === sourceType);
}

export function searchEvidence(query: string): EvidenceItem[] {
  const q = query.toLowerCase();
  return evidenceRegistry.filter(e => 
    e.title.toLowerCase().includes(q) ||
    e.abstract.toLowerCase().includes(q) ||
    e.keywords.some(k => k.toLowerCase().includes(q)) ||
    e.tags.some(t => t.toLowerCase().includes(q))
  );
}

// Compute counts
export function computeCounts() {
  // Collection counts
  collections.forEach(c => {
    c.evidenceCount = evidenceRegistry.filter(e => e.collections.includes(c.id)).length;
  });

  // Category counts
  browseByCategory.forEach(c => {
    c.count = evidenceRegistry.filter(e => e.category === (c.id as EvidenceCategory)).length;
  });

  // District counts
  browseByDistrict.forEach(d => {
    d.count = evidenceRegistry.filter(e => e.districts.includes(d.id) || e.districts.includes('all')).length;
  });

  // Module counts
  browseByModule.forEach(m => {
    m.count = evidenceRegistry.filter(e => e.usedInModules.some(um => um.moduleId === m.id)).length;
  });
}

// Initialize counts
computeCounts();
