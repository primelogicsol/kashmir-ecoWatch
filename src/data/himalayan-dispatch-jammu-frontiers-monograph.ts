// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — DEDICATED THEMATIC SCIENTIFIC ISSUE · MONOGRAPH 18
// "JAMMU'S ECOLOGICAL FRONTIERS: THREE SCIENTIFIC INVESTIGATIONS INTO THE
//  RIVERS, MOUNTAINS AND WETLANDS THAT SUSTAIN JAMMU DIVISION"
//
// Modeled directly on the scientific and editorial architecture of Monograph 01
// ("The Atmosphere Has No Borders"). Unites Investigations 01, 02, and 03 across
// river basin hydrology, Himalayan geological processes, freshwater ecology,
// human engineering intervention, and environmental governance.
//
// EVIDENTIARY & SCIENTIFIC INTEGRITY GUARDRAIL:
// The 45 chapter counts, 20 original scientific experiments, and 41-year
// (1985–2026) historical baseline are proposed research targets. No original
// satellite processing, hydrological simulations, or field verification has yet
// been completed for these investigations. Defining principle: Scientific
// discovery before editorial conclusions.
// ─────────────────────────────────────────────────────────────────────────────

export type JammuInvestigationNumber = '01' | '02' | '03';

export type JammuMapNodeCategory = 'mountain_hydropower' | 'river_system' | 'wetland_ecosystem';

export interface JammuHeroMetric {
  value: string;
  label: string;
  note: string;
}

export interface JammuDataInfrastructureRow {
  source: string;
  application: string;
  applicableInvestigations: JammuInvestigationNumber[];
  resolutionOrArchiveNote: string;
}

export interface JammuPublicationStageRow {
  stage: string;
  requirement: string;
  protocolDescription: string;
  currentStatus: 'Active Protocol Scoping' | 'Pending Empirical Execution';
}

export interface JammuGeographicalNode {
  id: string;
  icon: '🏔️' | '🌊' | '🌿';
  category: JammuMapNodeCategory;
  categoryLabel: string;
  name: string;
  districtOrCorridor: string;
  lat: number;
  lng: number;
  investigationNumber: JammuInvestigationNumber;
  documentedAnchor: string;
  scientificFocus: string;
}

export interface JammuConceptualEquation {
  id: string;
  investigationNumber: JammuInvestigationNumber;
  title: string;
  formulaText: string;
  variables: Array<{ symbol: string; label: string; unit: string; definition: string }>;
  protocolCaveat: string;
}

export interface JammuProposedExperiment {
  code: string;
  investigationNumber: JammuInvestigationNumber;
  title: string;
  primaryDatasets: string;
  analyticalProtocol: string;
  validationRequirement: string;
  statusLabel: 'Proposed Research Target · Not Yet Executed';
}

export interface JammuChapterProtocol {
  investigationNumber: JammuInvestigationNumber;
  investigationTitle: string;
  investigationSlug: string;
  chapterNumber: string; // '01'..'15' within the investigation
  globalIndex: number; // 1..45 across the thematic issue
  slug: string;
  researchDomain: string;
  researchStatus: 'Proposed Research Target · Investigation Protocol In Progress';
  executiveSummary: string[];
  keyQuestionsAndScope: string[];
  methodologyAndDatasets: string[];
  scientificDeliverable: string;
  methodologicalCaveat: string;
}

export interface JammuFlagshipInvestigationSpec {
  number: JammuInvestigationNumber;
  folioRoman: 'I' | 'II' | 'III';
  storySlug: string;
  kicker: string;
  title: string;
  subtitle: string;
  centralScientificQuestion: string;
  primaryResearchHypothesis: string;
  documentedContextSummary: string;
  documentedReferenceAnchors: Array<{
    sourceLabel: string;
    contextNote: string;
    url: string;
  }>;
  heroImage: string;
  heroCaption: string;
  geographicCorridor: string;
  chapterCount: 15;
  experimentCount: number;
  kewCompanionHref: string;
  kewCompanionLabel: string;
  experiments: JammuProposedExperiment[];
  conceptualEquation: JammuConceptualEquation;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. THEMATIC ISSUE IDENTITY & DEFINING SCIENTIFIC PRINCIPLE
// ─────────────────────────────────────────────────────────────────────────────

export const JAMMU_FRONTIERS_ISSUE_IDENTITY = {
  editionId: 'ed-monograph-18-jammu-frontiers',
  editionSlug: 'monograph-18-jammus-ecological-frontiers',
  volumeLabel: 'MONOGRAPH 18 · JAMMU DIVISION SCIENTIFIC INVESTIGATIONS',
  issueNumberLabel: 'DEDICATED THEMATIC SCIENTIFIC ISSUE',
  canonicalIssuePath: '/himalayan-dispatch/issues/monograph-18-jammus-ecological-frontiers',
  bureauPath: '/himalayan-dispatch/bureaus/jammu',
  kicker: 'HIMALAYAN DISPATCH · JAMMU DIVISION SCIENTIFIC INVESTIGATIONS · RESEARCH ARCHITECTURE',
  title: "Jammu's Ecological Frontiers",
  subtitle:
    'Three Scientific Investigations into the Rivers, Mountains and Wetlands That Sustain Jammu Division.',
  extendedSubtitle:
    'An interconnected scientific and editorial architecture examining cumulative hydroelectric stress in the Chenab Gorge, mechanized riverbed mining and geomorphological destabilization across the Tawi, Ravi, Ujh and Basantar rivers, and freshwater wetland degradation across Surinsar–Mansar, Gharana, Pargwal, Kukarian and Sanasar.',
  bylineDisplay: 'Himalayan Dispatch Research Desk | Jammu Division Scientific Investigations',
  editorialOversight:
    'Dr. Fayaz Ahmad Khan & Multidisciplinary Scientific Review Council · Jammu Bureau Desk',
  geographicScope:
    'Chenab River Basin · Kishtwar · Doda · Ramban · Reasi · Udhampur · Jammu · Samba · Kathua · Tawi, Ravi, Ujh & Basantar Sub-Basins · Surinsar–Mansar, Gharana, Pargwal, Kukarian & Sanasar Wetlands',
  definingPrincipleHeading: 'Scientific Discovery Before Editorial Conclusions',
  definingPrincipleStatement:
    'The defining principle should be scientific discovery before editorial conclusions. Himalayan Dispatch must not merely reproduce what environmentalists, newspapers or government agencies have already reported. It should independently examine the evidence and establish what can scientifically be demonstrated.',
  researchStatusDisclosure:
    'Evidentiary Status & Research Target Disclosure: Following the scientific and editorial architecture of "The Atmosphere Has No Borders" (Monograph 01), the 3 flagship investigations, 45 proposed research chapters, 20 proposed original scientific experiments, and 41-year (1985–2026) historical baseline set out in this thematic issue are proposed research targets. No original satellite processing, hydrological simulations, InSAR deformation time-series, or field calibration has yet been completed for these investigations. Documented statutory records, Ramsar designations, installed hydropower capacities, and National Green Tribunal proceedings are cited strictly as baseline scoping anchors awaiting independent empirical verification.',
  interconnectionStatement: [
    'Across Jammu Division, high-relief Himalayan gorges, steep Siwalik piedmont torrents, and subtropically recharged floodplain wetlands form a single hydrologically coupled landscape rather than three separate environmental beats.',
    'In the upper and middle Chenab gorge—spanning Kishtwar, Doda, Ramban, and Reasi—cascade hydroelectric impoundments and headrace tunnels alter flow regimes, trap coarse and suspended sediment, and interact with active Himalayan fault zones before the river ever reaches the plains.',
    'Along the southern escarpment and foothill plains—where the Tawi, Ravi, Ujh, and Basantar rivers emerge onto unconsolidated alluvial fans in Jammu, Samba, and Kathua—mechanized riverbed extraction, urban floodplain encroachment, and untreated effluent strip away the gravel armour that stabilizes bridges, recharges aquifers, and sustains benthic habitats.',
    'Across those same basins and intermontane ridges, freshwater lakes and marshes—from the Ramsar-listed Surinsar–Mansar twin-lake system (350 hectares, designated November 8, 2005) to Gharana, Pargwal, Kukarian, and Sanasar—serve as Jammu’s natural flood-attenuation buffers, groundwater recharge zones, and Central Asian Flyway refugia.',
    'Investigations 01, 02, and 03 therefore interrogate one connected earth-system question: where cumulative engineering, extractive pressure, and wetland contraction outpace geomorphological and ecological recovery, can Jammu sustain its water and hazard security without an integrated basin-scale scientific reckoning?',
  ],
  heroMetrics: [
    {
      value: '3',
      label: 'Flagship investigations',
      note: 'Chenab hydropower · Riverbed mining · Jammu wetlands',
    },
    {
      value: '45',
      label: 'Proposed research chapters',
      note: '15 structured chapters per investigation',
    },
    {
      value: '20',
      label: 'Proposed scientific experiments',
      note: '6 + 7 + 7 original analytical protocols',
    },
    {
      value: '41 years',
      label: 'Target historical baseline',
      note: '1985–2026 multi-sensor archival window',
    },
  ] as JammuHeroMetric[],
  publicationHierarchy: [
    {
      levelCode: 'LEVEL 01',
      tierLabel: 'Three Flagship Dispatches · Jammu Bureau',
      title: 'Executive Scientific Investigations 01, 02 & 03',
      routePath: '/himalayan-dispatch/bureaus/jammu',
      summary:
        'Longform investigative syntheses examining the Chenab hydroelectric cascade, mechanized riverbed destabilization in Tawi–Ravi–Ujh–Basantar, and the wetland shield of the Jammu plains.',
    },
    {
      levelCode: 'LEVEL 02',
      tierLabel: "Thematic Scientific Issue · Monograph 18",
      title: '45 Chapter Protocols, 20 Original Experiments & 1985–2026 Baseline',
      routePath: '/himalayan-dispatch/issues/monograph-18-jammus-ecological-frontiers',
      summary:
        'Complete research specification uniting physical balance equations, 12 multi-agency satellite and statutory data archives, and 10-stage verification gates prior to empirical claims.',
    },
    {
      levelCode: 'LEVEL 03',
      tierLabel: 'KEW Scientific Companion · Basin & Hazard Observatories',
      title: 'Kashmir EcoWatch Hydrological, Energy & Wetland Intelligence',
      routePath: '/earth-human-impact/hydropower-energy-justice-observatory',
      summary:
        'Operational cross-links into KEW hydropower, landslide, riverine flood, and wetland registries across all ten districts of Jammu Division.',
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 2. COMMON RESEARCH INFRASTRUCTURE (12 PRIMARY DATA ARCHIVES)
// ─────────────────────────────────────────────────────────────────────────────

export const JAMMU_COMMON_DATA_INFRASTRUCTURE: JammuDataInfrastructureRow[] = [
  {
    source: 'Landsat archive',
    application: 'Historical environmental reconstruction',
    applicableInvestigations: ['01', '02', '03'],
    resolutionOrArchiveNote: 'Landsat 5 TM, 7 ETM+, 8/9 OLI (30 m optical/thermal, 1985–2026)',
  },
  {
    source: 'Sentinel-1 SAR',
    application: 'Ground deformation and flood mapping',
    applicableInvestigations: ['01', '02', '03'],
    resolutionOrArchiveNote: 'C-band Interferometric SAR (SBAS/PS-InSAR slope velocity & all-weather inundation)',
  },
  {
    source: 'Sentinel-2 MSI',
    application: 'Water extent, vegetation and mining footprints',
    applicableInvestigations: ['01', '02', '03'],
    resolutionOrArchiveNote: '10–20 m multispectral NDWI, MNDWI, active pit & turbidity screening',
  },
  {
    source: 'SRTM and Copernicus DEM',
    application: 'Terrain and drainage analysis',
    applicableInvestigations: ['01', '02', '03'],
    resolutionOrArchiveNote: '30 m hypsometry, stream-power gradients, watershed delineation & gorge relief',
  },
  {
    source: 'ERA5',
    application: 'Historical climatology',
    applicableInvestigations: ['01', '02', '03'],
    resolutionOrArchiveNote: 'ECMWF hourly atmospheric reanalysis (temperature, snowmelt & evaporation drivers)',
  },
  {
    source: 'GPM IMERG',
    application: 'Precipitation and extreme rainfall',
    applicableInvestigations: ['01', '02', '03'],
    resolutionOrArchiveNote: 'Half-hourly monsoon cloudburst, Western Disturbance & flash-flood rainfall intensity',
  },
  {
    source: 'JRC Global Surface Water',
    application: 'Historical waterbody dynamics',
    applicableInvestigations: ['01', '02', '03'],
    resolutionOrArchiveNote: 'Long-term water occurrence, seasonality & reservoir/wetland transition masks',
  },
  {
    source: 'India-WRIS and CWC',
    application: 'Hydrological observations',
    applicableInvestigations: ['01', '02', '03'],
    resolutionOrArchiveNote: 'Central Water Commission & India-WRIS gauge, discharge & sedimentation series',
  },
  {
    source: 'PARIVESH',
    application: 'Environmental clearance documentation',
    applicableInvestigations: ['01', '02', '03'],
    resolutionOrArchiveNote: 'MoEFCC EIA reports, Environmental Management Plans, EC conditions & compliance filings',
  },
  {
    source: 'NGT',
    application: 'Environmental litigation and compliance',
    applicableInvestigations: ['01', '02', '03'],
    resolutionOrArchiveNote: 'National Green Tribunal dockets, joint-committee inspection reports & judicial orders',
  },
  {
    source: 'Ramsar Information Service',
    application: 'International wetland inventories',
    applicableInvestigations: ['03'],
    resolutionOrArchiveNote: 'Surinsar–Mansar Ramsar Site #1573 ecological character baseline & management obligations',
  },
  {
    source: 'GBIF and eBird',
    application: 'Biodiversity and bird migration observations',
    applicableInvestigations: ['01', '03'],
    resolutionOrArchiveNote: 'Occurrence records for Central Asian Flyway waterbirds & Chenab–Tawi aquatic fauna',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. HIMALAYAN DISPATCH 10-STAGE PUBLICATION STANDARD
// ─────────────────────────────────────────────────────────────────────────────

export const JAMMU_PUBLICATION_STANDARD_10: JammuPublicationStageRow[] = [
  {
    stage: '01',
    requirement: 'Research question formulation',
    protocolDescription:
      'Define falsifiable basin-scale scientific questions, spatial boundaries, and null hypotheses free of pre-judged conclusions.',
    currentStatus: 'Active Protocol Scoping',
  },
  {
    stage: '02',
    requirement: 'Scientific literature review',
    protocolDescription:
      'Synthesize peer-reviewed Himalayan geology, fluvial geomorphology, limnology, statutory EIA dossiers, and judicial records.',
    currentStatus: 'Active Protocol Scoping',
  },
  {
    stage: '03',
    requirement: 'Primary data acquisition',
    protocolDescription:
      'Retrieve 1985–2026 Landsat/Sentinel scenes, DEM tiles, CWC/WRIS hydrographs, PARIVESH clearances, NGT orders, and field benchmarks.',
    currentStatus: 'Pending Empirical Execution',
  },
  {
    stage: '04',
    requirement: 'Original scientific experiments',
    protocolDescription:
      'Execute the 20 proposed hydrological, InSAR deformation, sediment budget, channel-incision, and wetland spectral experiments.',
    currentStatus: 'Pending Empirical Execution',
  },
  {
    stage: '05',
    requirement: 'Independent data validation',
    protocolDescription:
      'Cross-validate remote-sensing indices and numerical model outputs against ground benchmarks, error bounds, and field calibration.',
    currentStatus: 'Pending Empirical Execution',
  },
  {
    stage: '06',
    requirement: 'Investigative editorial synthesis',
    protocolDescription:
      'Translate empirically demonstrated findings into transparent longform journalism while affording full institutional Right of Reply.',
    currentStatus: 'Pending Empirical Execution',
  },
  {
    stage: '07',
    requirement: 'External specialist review',
    protocolDescription:
      'Subject data pipelines, uncertainty intervals, and physical interpretations to independent domain peer review.',
    currentStatus: 'Pending Empirical Execution',
  },
  {
    stage: '08',
    requirement: 'Administrator approval',
    protocolDescription:
      'Final legal, evidentiary, and ethical sign-off by the Founding Editor-in-Chief and Himalayan Dispatch Directorate.',
    currentStatus: 'Pending Empirical Execution',
  },
  {
    stage: '09',
    requirement: 'Publication',
    protocolDescription:
      'Public release with open methodological appendices, reproducible metadata, and permanent canonical archival URLs.',
    currentStatus: 'Pending Empirical Execution',
  },
  {
    stage: '10',
    requirement: 'Continuous evidence updates and corrections',
    protocolDescription:
      'Living post-publication ledger appending new gauge data, satellite passes, agency responses, and timestamped corrections.',
    currentStatus: 'Pending Empirical Execution',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. INTEGRATED GEOGRAPHICAL COVERAGE (MOUNTAINS/HYDRO · RIVERS · WETLANDS)
// ─────────────────────────────────────────────────────────────────────────────

export const JAMMU_GEOGRAPHICAL_NODES: JammuGeographicalNode[] = [
  // 🏔️ Mountain Gorge & Hydropower Cascade Nodes (Investigation 01)
  {
    id: 'node-dulhasti',
    icon: '🏔️',
    category: 'mountain_hydropower',
    categoryLabel: 'Chenab Hydropower & Gorge',
    name: 'Dulhasti Hydroelectric Project (390 MW)',
    districtOrCorridor: 'Kishtwar · Middle Chenab Gorge',
    lat: 33.356,
    lng: 75.738,
    investigationNumber: '01',
    documentedAnchor: 'Operational 390 MW run-of-the-river pondage scheme on the Chenab in Kishtwar.',
    scientificFocus: 'Headwater sediment trapping, Kishtwar Window tectonics, and diurnal peaking hydrographs.',
  },
  {
    id: 'node-baglihar',
    icon: '🏔️',
    category: 'mountain_hydropower',
    categoryLabel: 'Chenab Hydropower & Gorge',
    name: 'Baglihar Hydroelectric Project (890 MW)',
    districtOrCorridor: 'Ramban · Chanderkote Gorge',
    lat: 33.162,
    lng: 75.328,
    investigationNumber: '01',
    documentedAnchor: 'Operational 890 MW (Stage I & II) concrete gravity dam along the fragile Ramban phyllite-slate belt.',
    scientificFocus: 'Reservoir sedimentation, Main Boundary/Central Thrust slope InSAR deformation, and e-flow continuity.',
  },
  {
    id: 'node-sawalkote',
    icon: '🏔️',
    category: 'mountain_hydropower',
    categoryLabel: 'Chenab Hydropower & Gorge',
    name: 'Proposed Sawalkote Project',
    districtOrCorridor: 'Ramban / Udhampur Gorge Reach',
    lat: 33.192,
    lng: 75.041,
    investigationNumber: '01',
    documentedAnchor: 'Major proposed Chenab cascade addition between Baglihar and Salal requiring cumulative impact scrutiny.',
    scientificFocus: 'Free-flowing reach elimination, forest submergence, and cumulative cascade carrying capacity.',
  },
  {
    id: 'node-salal',
    icon: '🏔️',
    category: 'mountain_hydropower',
    categoryLabel: 'Chenab Hydropower & Gorge',
    name: 'Salal Hydroelectric Project (690 MW)',
    districtOrCorridor: 'Reasi · Dhyangarh Loop',
    lat: 33.149,
    lng: 74.808,
    investigationNumber: '01',
    documentedAnchor: 'Operational 690 MW rockfill and concrete dam complex upstream of Akhnoor plains emergence.',
    scientificFocus: 'Long-term reservoir siltation benchmark and downstream coarse-sediment starvation into Akhnoor–Pargwal.',
  },

  // 🌊 Jammu River Systems & Mining Corridors (Investigation 02)
  {
    id: 'node-chenab-akhnoor',
    icon: '🌊',
    category: 'river_system',
    categoryLabel: 'River & Mining Corridor',
    name: 'Chenab Plains Emergence (Akhnoor–Pargwal)',
    districtOrCorridor: 'Jammu District · Foothill Fan',
    lat: 32.897,
    lng: 74.736,
    investigationNumber: '02',
    documentedAnchor: 'Transition zone where gorge-regulated Chenab discharge enters braided gravel plains.',
    scientificFocus: 'Coupling between upstream dam sediment retention (Inv. 01), gravel-bar extraction (Inv. 02), and Pargwal marshes (Inv. 03).',
  },
  {
    id: 'node-tawi',
    icon: '🌊',
    category: 'river_system',
    categoryLabel: 'River & Mining Corridor',
    name: 'Tawi River Corridor',
    districtOrCorridor: 'Udhampur & Jammu Metropolitan Reach',
    lat: 32.718,
    lng: 74.858,
    investigationNumber: '02',
    documentedAnchor: 'Lifeline river of Jammu city facing urban floodplain encroachment, municipal drains, and boulder-sand extraction.',
    scientificFocus: '1985–2026 thalweg shift, urban bridge pier scour, hyporheic recharge, and dissolved oxygen/coliform trends.',
  },
  {
    id: 'node-basantar',
    icon: '🌊',
    category: 'river_system',
    categoryLabel: 'River & Mining Corridor',
    name: 'Basantar River Corridor',
    districtOrCorridor: 'Samba District',
    lat: 32.559,
    lng: 75.118,
    investigationNumber: '02',
    documentedAnchor: 'Subject of Feb 6, 2025 NGT proceedings on illegal sand mining and reported bridge-pillar foundation exposure.',
    scientificFocus: 'Mechanized pit footprint detection, knickpoint incision propagation, and highway/rail bridge pier vulnerability.',
  },
  {
    id: 'node-ujh',
    icon: '🌊',
    category: 'river_system',
    categoryLabel: 'River & Mining Corridor',
    name: 'Ujh River Sub-Basin',
    districtOrCorridor: 'Kathua District · Siwalik Piedmont',
    lat: 32.495,
    lng: 75.412,
    investigationNumber: '02',
    documentedAnchor: 'High-energy monsoonal cobble-sand torrent feeding the Ravi system across Kathua.',
    scientificFocus: 'Monsoon bedload replenishment vs. annual mechanized extraction mass balance.',
  },
  {
    id: 'node-ravi',
    icon: '🌊',
    category: 'river_system',
    categoryLabel: 'River & Mining Corridor',
    name: 'Ravi River Reach (Lakhanpur–Kathua)',
    districtOrCorridor: 'Kathua · Eastern Jammu Boundary',
    lat: 32.382,
    lng: 75.598,
    investigationNumber: '02',
    documentedAnchor: 'Trans-state gravel-bed corridor subject to NGT Kathua–Samba mining compliance scrutiny.',
    scientificFocus: 'Cross-boundary mining lease audit, bank erosion, and downstream floodplain stability.',
  },

  // 🌿 Freshwater Lakes & Wetlands (Investigation 03)
  {
    id: 'node-surinsar',
    icon: '🌿',
    category: 'wetland_ecosystem',
    categoryLabel: 'Ramsar & Regional Wetland',
    name: 'Surinsar Lake (Ramsar Twin System)',
    districtOrCorridor: 'Jammu / Samba Siwalik Ridge',
    lat: 32.771,
    lng: 75.041,
    investigationNumber: '03',
    documentedAnchor: 'Part of the 350-hectare Surinsar–Mansar Ramsar complex designated November 8, 2005.',
    scientificFocus: 'Rain-fed/spring catchment runoff, catchment deforestation siltation, and trophic state trajectory.',
  },
  {
    id: 'node-mansar',
    icon: '🌿',
    category: 'wetland_ecosystem',
    categoryLabel: 'Ramsar & Regional Wetland',
    name: 'Mansar Lake (Ramsar Twin System)',
    districtOrCorridor: 'Udhampur / Samba Siwalik Fold',
    lat: 32.695,
    lng: 75.146,
    investigationNumber: '03',
    documentedAnchor: 'Co-designated November 8, 2005 under the 350-hectare Surinsar–Mansar international Ramsar listing.',
    scientificFocus: 'Nutrient loading, shoreline commercialization, dissolved oxygen stratification, and Ramsar obligations.',
  },
  {
    id: 'node-gharana',
    icon: '🌿',
    category: 'wetland_ecosystem',
    categoryLabel: 'Ramsar & Regional Wetland',
    name: 'Gharana Wetland Conservation Reserve',
    districtOrCorridor: 'R.S. Pura · Jammu Plains',
    lat: 32.541,
    lng: 74.691,
    investigationNumber: '03',
    documentedAnchor: 'Critical Central Asian Flyway winter refuge for bar-headed geese and migratory waterfowl amid agricultural fields.',
    scientificFocus: 'Seasonal MNDWI inundation shrinkage, agrochemical runoff, and winter avian carrying capacity.',
  },
  {
    id: 'node-pargwal',
    icon: '🌿',
    category: 'wetland_ecosystem',
    categoryLabel: 'Ramsar & Regional Wetland',
    name: 'Pargwal Wetland Ecosystem',
    districtOrCorridor: 'Akhnoor–Chenab Floodplain · Jammu',
    lat: 32.845,
    lng: 74.618,
    investigationNumber: '03',
    documentedAnchor: 'Riverine Chenab floodplain wetland with documented aquatic macrophyte diversity.',
    scientificFocus: 'Dependence on Chenab flood pulses, hydroperiod alteration from upstream dams, and floodplain retention.',
  },
  {
    id: 'node-kukarian',
    icon: '🌿',
    category: 'wetland_ecosystem',
    categoryLabel: 'Ramsar & Regional Wetland',
    name: 'Kukarian Wetland',
    districtOrCorridor: 'Jammu Alluvial Plains',
    lat: 32.728,
    lng: 74.712,
    investigationNumber: '03',
    documentedAnchor: 'Satellite floodplain marsh supporting regional macrophyte assemblages and winter waterbirds.',
    scientificFocus: '1985–2026 land-use conversion, shallow aquifer recharge, and stepping-stone flyway connectivity.',
  },
  {
    id: 'node-sanasar',
    icon: '🌿',
    category: 'wetland_ecosystem',
    categoryLabel: 'Ramsar & Regional Wetland',
    name: 'Sanasar Montane Meadow Wetland',
    districtOrCorridor: 'Ramban · Patnitop Sub-Alpine Bowl (~2,050 m)',
    lat: 33.124,
    lng: 75.261,
    investigationNumber: '03',
    documentedAnchor: 'High-elevation cup-shaped montane meadow wetland subject to tourism and drainage pressures.',
    scientificFocus: 'Montane peat/soil moisture retention, headwater spring recharge, and trampling/runoff stress.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. THREE FLAGSHIP INVESTIGATIONS & 20 PROPOSED SCIENTIFIC EXPERIMENTS
// ─────────────────────────────────────────────────────────────────────────────

export const JAMMU_FLAGSHIP_INVESTIGATIONS: JammuFlagshipInvestigationSpec[] = [
  {
    number: '01',
    folioRoman: 'I',
    storySlug: 'the-chenab-has-a-breaking-point',
    kicker: 'INVESTIGATION 01 · RIVER BASIN HYDROLOGY, TECTONICS & HYDROPOWER CASCADE',
    title: 'The Chenab Has a Breaking Point',
    subtitle:
      'Hydroelectric Expansion, Geological Vulnerability and the Cumulative Ecological Carrying Capacity of the Chenab River Basin',
    centralScientificQuestion:
      'Can the Chenab sustain multiple interconnected hydroelectric projects without compromising its geological stability, hydrological integrity and ecological functions?',
    primaryResearchHypothesis:
      'Individual project-level environmental clearances may underestimate the combined environmental consequences of multiple hydroelectric projects operating within a connected river system.',
    documentedContextSummary:
      'Existing operational hydroelectric complexes on the Chenab mainstem include Dulhasti (390 MW), Baglihar (890 MW) and Salal (690 MW), totaling 1,970 MW of major mainstem installed capacity—before accounting for under-construction projects and the proposed Sawalkote project, which adds decisive significance to cumulative environmental assessment across steep, seismically active Himalayan gorges.',
    documentedReferenceAnchors: [
      {
        sourceLabel: 'NewsClick Documentary Context',
        contextNote:
          'Public photo-essay reporting raising citizen and geological concerns over Chenab Valley hydropower expansion ("Ticking Time Bombs")—treated here as public discourse to be tested independently through primary InSAR, seismic, and hydrological evidence.',
        url: 'https://www.newsclick.in/photo-essay-hydropower-projects-chenab-valley-ticking-time-bombs',
      },
      {
        sourceLabel: 'The Indian Express · Sawalkote & Chenab Cascade Reporting',
        contextNote:
          'Public reporting on the proposed Sawalkote hydroelectric project and cumulative Chenab basin development clearances.',
        url: 'https://indianexpress.com/',
      },
      {
        sourceLabel: 'PARIVESH · CWC · Sentinel-1 SAR Primary Archives',
        contextNote:
          'Statutory EIA/EMP filings, Central Water Commission discharge/siltation series, and interferometric slope-deformation baselines.',
        url: 'https://parivesh.nic.in/',
      },
    ],
    heroImage: '/images/earth-human-impact/ehii-riverbed-infrastructure-monitoring.jpg',
    heroCaption:
      'High-relief Western Himalayan river gorge and slope corridor representative of the middle Chenab cascade between Kishtwar, Ramban, and Reasi—where thrust tectonics, tunnel excavation, reservoir drawdown, and sediment retention converge (Illustrative archival plate — Kashmir EcoWatch Visual Archive).',
    geographicCorridor:
      'Kishtwar · Doda · Ramban · Reasi · Udhampur · Akhnoor · Chenab River Basin',
    chapterCount: 15,
    experimentCount: 6,
    kewCompanionHref: '/earth-human-impact/hydropower-energy-justice-observatory',
    kewCompanionLabel: 'KEW Hydropower & Slope Intelligence Observatory',
    conceptualEquation: {
      id: 'eq-chenab-cascade-stress',
      investigationNumber: '01',
      title: 'Conceptual Cascade Fragmentation & Sediment Continuity Framework',
      formulaText:
        'CSI_basin = ∑(L_impounded + L_diverted) / L_mainstem  ;   Q_sed,out = Q_sed,in − ∑(TE_i · Q_sed,i)',
      variables: [
        {
          symbol: 'CSI_basin',
          label: 'Cumulative River Modification Ratio',
          unit: 'dimensionless (0–1)',
          definition: 'Fraction of longitudinal mainstem river reach impounded by reservoirs or bypassed via headrace tunnels.',
        },
        {
          symbol: 'L_impounded + L_diverted',
          label: 'Impounded & Tunnel-Bypassed Length',
          unit: 'km',
          definition: 'Combined river length converted from free-flowing lotic habitat into reservoir backwater or dewatered bypass reaches.',
        },
        {
          symbol: 'TE_i',
          label: 'Reservoir Trap Efficiency (Brune/Churchill)',
          unit: 'fraction',
          definition: 'Proportion of incoming bedload and suspended sediment retained behind dam i (Dulhasti, Baglihar, Sawalkote, Salal).',
        },
        {
          symbol: 'Q_sed,out',
          label: 'Downstream Sediment Delivery Flux',
          unit: 'Mt/yr',
          definition: 'Residual sediment flux reaching the Akhnoor–Pargwal alluvial fan after sequential cascade trapping.',
        },
      ],
      protocolCaveat:
        'Protocol Equation Notice: Governing physical accounting relationships for Experiment 01.1 and 01.4. Exact reach lengths, trap efficiencies, and coupled slope-seismic stress tensors require primary DEM, bathymetric, and Sentinel-1 InSAR execution prior to numerical claims.',
    },
    experiments: [
      {
        code: 'EXP-01.1',
        investigationNumber: '01',
        title: 'Chenab Basin cumulative hydropower stress model',
        primaryDatasets: 'SRTM/Copernicus 30 m DEM, PARIVESH project layouts, CWC basin networks',
        analyticalProtocol:
          'Map longitudinal river fragmentation, reservoir backwater footprints, tunnel-bypassed reaches, and cumulative hydraulic head modification across operational (Dulhasti 390 MW, Baglihar 890 MW, Salal 690 MW), under-construction, and proposed (Sawalkote) schemes.',
        validationRequirement: 'Georeferenced dam/barrage coordinates and authenticated DPR hydraulic profiles.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-01.2',
        investigationNumber: '01',
        title: 'Historical river discharge reconstruction',
        primaryDatasets: 'ERA5 climatology, GPM IMERG precipitation, Landsat/MODIS snow-cover, CWC/India-WRIS gauges',
        analyticalProtocol:
          'Reconstruct 1985–2026 seasonal snowmelt, glacier-melt, and monsoon discharge regimes across the Chandra–Bhaga and middle Chenab gorges to separate climatic shifts from dam-regulated hydropeaking.',
        validationRequirement: 'Calibration against published CWC discharge records and water-balance closure checks.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-01.3',
        investigationNumber: '01',
        title: 'Satellite-based slope deformation assessment using InSAR',
        primaryDatasets: 'Sentinel-1 ascending/descending C-band SAR archives, Copernicus DEM, highway/reservoir rim polygons',
        analyticalProtocol:
          'Execute multi-temporal SBAS/PS-InSAR line-of-sight deformation velocity time-series along reservoir rims, portal slopes, and Ramban–Kishtwar phyllite/slate cut-slopes across seasonal reservoir drawdown cycles.',
        validationRequirement: 'Coherence screening, atmospheric phase correction, and documented landslide inventory cross-checks.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-01.4',
        investigationNumber: '01',
        title: 'Reservoir sedimentation and downstream sediment deficit modelling',
        primaryDatasets: 'JRC/Sentinel-2 turbidity & delta progradation imagery, CWC sediment compendia, Salal/Baglihar siltation records',
        analyticalProtocol:
          'Quantify sequential sediment trapping across the Chenab cascade and model downstream gravel/sand starvation entering the Akhnoor plains and Pargwal floodplain.',
        validationRequirement: 'Comparison against published CWC reservoir capacity-loss surveys.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-01.5',
        investigationNumber: '01',
        title: 'Cascading infrastructure vulnerability assessment',
        primaryDatasets: 'Mapped glacial lakes (Landsat/Sentinel-2), DEM breach routing, dam spillway specifications',
        analyticalProtocol:
          'Simulate compound flood routing (GLOF or extreme GPM IMERG cloudburst + landslide-dam breach) propagating sequentially through closely spaced Chenab reservoirs.',
        validationRequirement: 'Sensitivity bounds across breach hydrograph peak times and spillway capacities.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-01.6',
        investigationNumber: '01',
        title: 'Environmental flow scenario modelling',
        primaryDatasets: 'Seasonal hydraulic geometry, Schizothorax/Tor guild depth-velocity criteria, statutory e-flow norms',
        analyticalProtocol:
          'Evaluate winter lean-season, monsoon flushing, and diurnal hydropeaking scenarios against benthic wetted perimeter and fish migration thresholds in tunnel-bypassed gorges.',
        validationRequirement: 'Cross-check against statutory EC e-flow stipulations and aquatic ecology literature.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
    ],
  },
  {
    number: '02',
    folioRoman: 'II',
    storySlug: 'a-river-is-not-a-construction-site',
    kicker: 'INVESTIGATION 02 · FLUVIAL GEOMORPHOLOGY, SEDIMENT BUDGETS & STATUTORY COMPLIANCE',
    title: 'A River Is Not a Construction Site',
    subtitle:
      "Riverbed Mining, Sediment Imbalance, Urban Encroachment and Hydrological Destabilization of Jammu's River Systems",
    centralScientificQuestion:
      "Is human intervention altering Jammu's rivers faster than their natural geomorphological processes can restore equilibrium?",
    primaryResearchHypothesis:
      'Where sediment extraction exceeds natural replenishment, riverbed incision and channel instability may increase risks to groundwater systems, aquatic habitats, bridges and surrounding communities.',
    documentedContextSummary:
      'National Green Tribunal (NGT) proceedings dated February 6, 2025 addressed illegal sand mining concerns in Kathua and Samba, including the reported exposure of bridge pillars associated with mining in the Basantar River—highlighting urgent geomorphological questions across the Tawi, Ravi, Ujh, and Basantar river corridors.',
    documentedReferenceAnchors: [
      {
        sourceLabel: 'National Green Tribunal (Feb 6, 2025 Proceedings · Indian Kanoon)',
        contextNote:
          'Judicial proceedings examining illegal riverbed mining allegations in Kathua and Samba districts, including reported bridge-pillar exposure on the Basantar River.',
        url: 'https://indiankanoon.org/',
      },
      {
        sourceLabel: 'SANDRP Documentary Assessment',
        contextNote:
          'South Asia Network on Dams, Rivers and People reporting on mechanized riverbed mining exposure across J&K rivers—examined independently against 1985–2026 satellite and geomorphological evidence.',
        url: 'https://sandrp.in/2020/04/18/jk-sand-mining-rivers-exposed-to-mechanized-mining/',
      },
      {
        sourceLabel: 'Sentinel-2 MSI · Landsat 1985–2026 · PARIVESH District Survey Reports',
        contextNote:
          'Multi-decadal optical planform archives and statutory District Survey Reports (DSRs) / mining block clearances.',
        url: 'https://parivesh.nic.in/',
      },
    ],
    heroImage: '/images/sectoral-eia/eia-agriculture-riverbed-soil.jpg',
    heroCaption:
      'Alluvial cobble-and-sand river corridor representative of Jammu’s Siwalik-fed piedmont rivers (Tawi, Basantar, Ujh, and Ravi)—where monsoon sediment transport, mechanized extraction pits, bridge foundations, and shallow floodplain aquifers intersect (Illustrative archival plate — Kashmir EcoWatch Visual Archive).',
    geographicCorridor:
      'Tawi River · Basantar River · Ujh River · Ravi River · Jammu · Samba · Kathua · Udhampur',
    chapterCount: 15,
    experimentCount: 7,
    kewCompanionHref: '/hazard-intelligence/floods',
    kewCompanionLabel: 'KEW Riverine & Floodplain Hazard Intelligence',
    conceptualEquation: {
      id: 'eq-exner-sediment-balance',
      investigationNumber: '02',
      title: 'Modified Exner Riverbed Elevation & Extraction Mass-Balance Equation',
      formulaText:
        '(1 − λ_p) · (∂z_b / ∂t) = −(∂q_s / ∂x) − E_mining(x, t)   ;   R_ext = M_extracted / M_replenished',
      variables: [
        {
          symbol: 'z_b',
          label: 'Mean Channel-Bed Elevation',
          unit: 'm',
          definition: 'Vertical elevation of the alluvial riverbed relative to bridge pile caps and riparian water tables.',
        },
        {
          symbol: 'λ_p',
          label: 'Bed Sediment Porosity',
          unit: 'dimensionless',
          definition: 'Void fraction of cobble-gravel-sand alluvium across Siwalik piedmont fans.',
        },
        {
          symbol: '∂q_s / ∂x',
          label: 'Natural Bedload Flux Divergence',
          unit: 'm²/yr',
          definition: 'Downstream gradient of monsoon bedload transport supplying natural gravel-bar replenishment.',
        },
        {
          symbol: 'E_mining(x, t)',
          label: 'Anthropogenic Extraction Rate',
          unit: 'm/yr (or Mt/yr)',
          definition: 'Volumetric rate of mechanized and manual sand, bajri, and boulder removal per unit channel area.',
        },
      ],
      protocolCaveat:
        'Protocol Equation Notice: When E_mining exceeds natural monsoon replenishment (R_ext > 1), ∂z_b/∂t turns negative—driving vertical bed incision, upstream-migrating headcuts, bridge-pier scour, and phreatic water-table drawdown. Field cross-sections and DSR audits are required to quantify R_ext per river.',
    },
    experiments: [
      {
        code: 'EXP-02.1',
        investigationNumber: '02',
        title: 'Historical river channel change detection, 1985–2026',
        primaryDatasets: 'Landsat 5/7/8/9 (1985–2026) & Sentinel-2 MSI post-monsoon low-flow composites',
        analyticalProtocol:
          'Digitize active braid-belt width, thalweg migration, gravel-bar area, and bank-erosion hotspots across the Tawi, Ravi, Ujh, and Basantar rivers over the 41-year target baseline.',
        validationRequirement: 'Matched hydro-seasonal scene selection to prevent monsoon stage bias.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-02.2',
        investigationNumber: '02',
        title: 'Satellite-based mining footprint identification',
        primaryDatasets: 'Sentinel-2 10 m optical/SWIR time-series, Sentinel-1 SAR backscatter roughness, PARIVESH lease polygons',
        analyticalProtocol:
          'Detect active excavation pits, haul-road networks, crusher stockpiles, and in-stream ponding outside and inside leased mineral blocks across Jammu, Samba, and Kathua.',
        validationRequirement: 'Spatial comparison against official District Survey Report (DSR) lease boundaries.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-02.3',
        investigationNumber: '02',
        title: 'Sediment extraction versus replenishment modelling',
        primaryDatasets: 'SRTM/Copernicus DEM catchment relief, GPM IMERG monsoon intensity, DSR replenishment estimates',
        analyticalProtocol:
          'Compare physically modelled monsoon bedload yield from Siwalik/Lesser Himalayan sub-catchments against permitted and satellite-inferred extraction volumes.',
        validationRequirement: 'Sensitivity testing across wet, normal, and drought monsoon years.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-02.4',
        investigationNumber: '02',
        title: 'Riverbed elevation change assessment',
        primaryDatasets: 'Multi-epoch DEMs, ICESat-2 altimetry crossings, CWC/bridge benchmark records',
        analyticalProtocol:
          'Assess longitudinal profile lowering, knickpoint migration, and gravel-armour stripping along heavily mined reaches of the Basantar, Tawi, and Ujh.',
        validationRequirement: 'Vertical uncertainty bounding (±m) and field levelling verification.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-02.5',
        investigationNumber: '02',
        title: 'Floodplain encroachment mapping',
        primaryDatasets: 'Landsat/Sentinel-2 built-up indices, JRC flood occurrence, 100-year hydraulic floodway envelopes',
        analyticalProtocol:
          'Quantify 1985–2026 urban, commercial, and institutional constriction of natural floodways along the Tawi in Jammu city and piedmont towns.',
        validationRequirement: 'Accuracy assessment against high-resolution optical reference tiles.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-02.6',
        investigationNumber: '02',
        title: 'Infrastructure exposure and vulnerability modelling',
        primaryDatasets: 'NH-44, railway, and district bridge locations, NGT Feb 6, 2025 Basantar docket, hydraulic scour equations',
        analyticalProtocol:
          'Evaluate local pier scour plus general bed-degradation risk at major road/rail bridges, intakes, and flood embankments across Kathua, Samba, and Jammu.',
        validationRequirement: 'Engineering inspection records and Right-of-Reply verification with highway/irrigation agencies.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-02.7',
        investigationNumber: '02',
        title: 'Surface water quality trend analysis',
        primaryDatasets: 'JKPCC/CPCB NWMP water-quality series (DO, BOD, fecal coliform, TDS, turbidity), municipal drain inventories',
        analyticalProtocol:
          'Analyze multi-year pollution trajectories in the urban Tawi, Basantar industrial belt (Samba), and Kathua watercourses alongside low-flow dilution loss.',
        validationRequirement: 'Seasonal stratification (lean pre-monsoon vs. monsoon flushing) and lab QA checks.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
    ],
  },
  {
    number: '03',
    folioRoman: 'III',
    storySlug: 'the-wetlands-that-protect-jammu',
    kicker: 'INVESTIGATION 03 · FRESHWATER ECOLOGY, RAMSAR GOVERNANCE & HYDROLOGICAL SECURITY',
    title: 'The Wetlands That Protect Jammu',
    subtitle:
      'Freshwater Ecosystem Degradation, Migratory Bird Corridors, Groundwater Recharge and the Ecological Security of the Jammu Plains',
    centralScientificQuestion:
      'Is Jammu adequately protecting the natural freshwater infrastructure that supports its ecological and hydrological security?',
    primaryResearchHypothesis:
      "The degradation of Jammu's wetlands may reduce regional flood resilience, freshwater availability and biodiversity while increasing long-term environmental management costs.",
    documentedContextSummary:
      'The Surinsar–Mansar lake system, covering a designated Ramsar area of 350 hectares, received international wetland recognition on November 8, 2005. Peer-reviewed botanical and ecological research has also documented rich aquatic plant diversity and migratory habitat functions across Gharana, Pargwal, Kukarian, and Sanasar wetlands.',
    documentedReferenceAnchors: [
      {
        sourceLabel: 'Ramsar Information Service (Surinsar–Mansar Lakes · Nov 8, 2005)',
        contextNote:
          'International Ramsar designation covering 350 hectares across the twin Siwalik freshwater lakes of Surinsar and Mansar.',
        url: 'https://rsis.ramsar.org/',
      },
      {
        sourceLabel: 'Hindustan Times · Safeguarding Natural Commons Context',
        contextNote:
          'Public editorial framing on protecting India’s natural commons—paired here with empirical hydrological, limnological, and land-use testing.',
        url: 'https://www.hindustantimes.com/editorials/we-have-to-save-india-s-natural-commons-is-important/story-eMUAtlSyCM3Lta6eFoJMvL.html',
      },
      {
        sourceLabel: 'J&K Stormwater Design Manual · GBIF/eBird · Aquatic Flora Literature',
        contextNote:
          'Hydrological detention baselines, Central Asian Flyway waterbird counts, and published macrophyte surveys across Gharana, Pargwal, Kukarian, and Sanasar.',
        url: 'https://ebird.org/',
      },
    ],
    heroImage: '/images/biodiversity/biodiversity-birds-wetland.jpg',
    heroCaption:
      'Subtropical and foothill freshwater marsh and migratory waterfowl habitat representative of Jammu Division’s wetland network—uniting Surinsar–Mansar (350 ha Ramsar complex), Gharana, Pargwal, Kukarian, and montane Sanasar (Illustrative archival plate — Kashmir EcoWatch Visual Archive).',
    geographicCorridor:
      'Surinsar Lake · Mansar Lake · Gharana Wetland · Pargwal Wetland · Kukarian Wetland · Sanasar · Jammu Plains',
    chapterCount: 15,
    experimentCount: 7,
    kewCompanionHref: '/water-systems/wetlands',
    kewCompanionLabel: 'KEW Wetlands & Avian Flyway Intelligence',
    conceptualEquation: {
      id: 'eq-wetland-water-balance',
      investigationNumber: '03',
      title: 'Wetland Hydrological Storage, Recharge & Spectral Water-Extent Protocol',
      formulaText:
        'ΔS_w / Δt = (P + Q_in + G_in) − (ET + Q_out + G_recharge)   ;   MNDWI = (ρ_Green − ρ_SWIR1) / (ρ_Green + ρ_SWIR1)',
      variables: [
        {
          symbol: 'ΔS_w / Δt',
          label: 'Wetland Storage Volume Change',
          unit: 'm³/season',
          definition: 'Net seasonal water storage buffering monsoon cloudburst runoff and sustaining dry-season hydroperiods.',
        },
        {
          symbol: 'G_recharge',
          label: 'Aquifer Percolation Flux',
          unit: 'mm/day or MCM/yr',
          definition: 'Downward recharge from wetland basins into Jammu–Samba–R.S. Pura alluvial and Siwalik aquifers.',
        },
        {
          symbol: 'MNDWI',
          label: 'Modified Normalized Difference Water Index',
          unit: 'dimensionless (−1 to +1)',
          definition: 'Green-to-SWIR reflectance index suppressing built-up shoreline noise during 1985–2026 open-water mapping.',
        },
        {
          symbol: 'L_N,P',
          label: 'Catchment Nutrient Loading',
          unit: 'kg N·P / ha / yr',
          definition: 'External agricultural fertilizer and sewage nutrient flux driving eutrophication and macrophyte shifts.',
        },
      ],
      protocolCaveat:
        'Protocol Equation Notice: Satellite-derived chlorophyll-a and turbidity retrievals (Experiment 03.4) are strictly subject to in-situ optical and laboratory water-sample field calibration before trophic state classification.',
    },
    experiments: [
      {
        code: 'EXP-03.1',
        investigationNumber: '03',
        title: 'Historical wetland change detection, 1985–2026',
        primaryDatasets: 'Landsat 5/7/8/9 & JRC Global Surface Water (1985–2026), cadastral/Ramsar boundary references',
        analyticalProtocol:
          'Quantify 41-year open-water, emergent marsh, agricultural conversion, and built-up shoreline trajectories across Surinsar, Mansar, Gharana, Pargwal, Kukarian, and Sanasar.',
        validationRequirement: 'Multi-season compositing to separate permanent shrinkage from interannual rainfall variability.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-03.2',
        investigationNumber: '03',
        title: 'Seasonal inundation mapping',
        primaryDatasets: 'Sentinel-1 C-band SAR (cloud-penetrating monsoon passes) & Sentinel-2 10–20 m time-series',
        analyticalProtocol:
          'Map pre-monsoon minimum, peak monsoon flood-pulse expansion, and winter migratory bird hydroperiod extent across floodplain and rain-fed wetlands.',
        validationRequirement: 'Threshold validation across vegetated emergent marsh vs. open water.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-03.3',
        investigationNumber: '03',
        title: 'NDWI and MNDWI water extent analysis',
        primaryDatasets: 'Harmonized Landsat–Sentinel surface reflectance (Green, NIR, SWIR1 bands)',
        analyticalProtocol:
          'Compute standardized NDWI and MNDWI time-series with Otsu adaptive thresholding to track surface-water persistence without urban shadow false positives.',
        validationRequirement: 'Cross-sensor radiometric harmonization audit.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-03.4',
        investigationNumber: '03',
        title: 'Satellite-based chlorophyll and turbidity estimation, subject to field calibration',
        primaryDatasets: 'Sentinel-2 red-edge (705 nm / 665 nm NDCI) & turbidity bands paired with field Secchi/lab benchmarks',
        analyticalProtocol:
          'Screen spatial patterns of algal blooms and suspended sediment plumes in Surinsar and Mansar, explicitly conditioned on co-incident in-situ water sampling.',
        validationRequirement: 'Mandatory field calibration rule: zero uncalibrated optical index values published as absolute µg/L concentrations.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-03.5',
        investigationNumber: '03',
        title: 'Agricultural nutrient loading assessment',
        primaryDatasets: 'Catchment land-cover maps, cropping calendars, slope drainage networks, GPM IMERG runoff',
        analyticalProtocol:
          'Estimate nitrogen and phosphorus export from surrounding paddy-wheat fields (Gharana, Pargwal, Kukarian) and lakeside settlements (Surinsar, Mansar, Sanasar).',
        validationRequirement: 'Comparison with measured dissolved nitrate and orthophosphate concentrations.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-03.6',
        investigationNumber: '03',
        title: 'Migratory bird habitat suitability modelling',
        primaryDatasets: 'GBIF & eBird checklists, Asian Waterbird Census records, winter MNDWI depth/roost proxies',
        analyticalProtocol:
          'Model habitat suitability, disturbance buffers, and inter-wetland corridor connectivity for Central Asian Flyway anatids, cranes, and waders across the Jammu plains.',
        validationRequirement: 'Observer-effort normalization across eBird and census years.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
      {
        code: 'EXP-03.7',
        investigationNumber: '03',
        title: 'Wetland ecosystem service valuation',
        primaryDatasets: 'Stormwater detention volumes, aquifer recharge estimates, engineered drainage replacement costs',
        analyticalProtocol:
          'Quantify the biophysical and replacement-cost value of flood peak attenuation, groundwater recharge, and biodiversity stewardship provided by Jammu’s wetland network.',
        validationRequirement: 'Transparent sensitivity ranges avoiding speculative monetary inflation.',
        statusLabel: 'Proposed Research Target · Not Yet Executed',
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 6. COMPLETE 45-CHAPTER SCIENTIFIC INVESTIGATION FRAMEWORK (15 + 15 + 15)
// ─────────────────────────────────────────────────────────────────────────────

function slugifyDomain(invNum: JammuInvestigationNumber, chNum: string, domain: string): string {
  const clean = domain
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `inv-${invNum}-ch-${chNum}-${clean}`;
}

interface RawChapterSeed {
  ch: string;
  domain: string;
  summary: string;
  questions: [string, string];
  datasets: [string, string];
  deliverable: string;
}

const INV_01_RAW_CHAPTERS: RawChapterSeed[] = [
  {
    ch: '01',
    domain: 'Geological evolution of the Chenab Basin',
    summary:
      'Establishes the lithological, structural, and geomorphic evolution of the Chandra–Bhaga and middle Chenab gorges across the Higher Himalayan Crystallines, Kishtwar Window, Ramban phyllites/slates, and Siwalik foreland.',
    questions: [
      'How do lithological contacts and deeply incised gorge relief govern natural slope instability along the Chenab?',
      'Which rock units exhibit the highest weathering, foliation shear, and tunnel-squeezing susceptibility?',
    ],
    datasets: [
      'Geological Survey of India structural maps & SRTM/Copernicus 30 m DEM morphometry',
      'Published Himalayan petrology, tectonic window, and gorge incision chronologies',
    ],
    deliverable: 'Geomorphological & litho-structural baseline atlas of the Chenab Basin.',
  },
  {
    ch: '02',
    domain: 'Historical hydrological baseline',
    summary:
      'Reconstructs the 41-year (1985–2026) hydro-climatological regime of the Chenab, partitioning nival snowmelt, glacial ablation, Western Disturbances, and summer monsoon contributions.',
    questions: [
      'What natural seasonal hydrograph variability defined the Chenab prior to sequential cascade regulation?',
      'How have 1985–2026 temperature and GPM IMERG / ERA5 precipitation anomalies altered peak and lean flows?',
    ],
    datasets: [
      'India-WRIS / CWC historical gauge disclosures, ERA5 reanalysis & GPM IMERG precipitation',
      'Landsat 1985–2026 snow-cover & glacial headwater boundary reconstructions',
    ],
    deliverable: '41-year reconstructed seasonal discharge and hydro-climatic baseline series.',
  },
  {
    ch: '03',
    domain: 'Hydroelectric infrastructure inventory',
    summary:
      'Compiles a verified engineering cadastre of operational — Dulhasti (390 MW), Baglihar (890 MW), Salal (690 MW) — under-construction, and proposed (including Sawalkote) hydroelectric projects across the mainstem and tributaries.',
    questions: [
      'What proportion of the Chenab mainstem between Kishtwar and Akhnoor is impounded or bypassed by tunnels once all proposed schemes are included?',
      'What are the authenticated dam heights, live/dead storage volumes, tunnel lengths, and muck-disposal sites?',
    ],
    datasets: [
      'PARIVESH EIA/EC dossiers, CEA/NHPC/JKSPDC statutory technical schedules',
      'Sentinel-2 10 m optical verification of dam, barrage, portal, and spoil-bank footprints',
    ],
    deliverable: 'Georeferenced Chenab Basin hydroelectric cascade & tributary inventory.',
  },
  {
    ch: '04',
    domain: 'Himalayan tectonics and seismic vulnerability',
    summary:
      'Examines active fault geometry—Main Central Thrust (MCT), Main Boundary Thrust (MBT), Kishtwar fault, and Reasi thrust—relative to high-head concrete dams and long underground headrace tunnels.',
    questions: [
      'How close do existing and proposed Chenab dam foundations and tunnels sit to mapped active thrust splays?',
      'Do project design seismic parameters (PGA/MCE) reflect contemporary GPS crustal-strain science in the Kashmir–Jammu Himalaya?',
    ],
    datasets: [
      'Published geodetic convergence & paleoseismic fault catalogues alongside PARIVESH seismic design parameters',
      'Sentinel-1 SAR & DEM tectonic lineament mapping across Kishtwar, Ramban, and Reasi',
    ],
    deliverable: 'Fault-proximity and design-acceleration audit matrix for Chenab cascade structures.',
  },
  {
    ch: '05',
    domain: 'Reservoir-induced seismicity',
    summary:
      'Investigates pore-pressure diffusion and elastic crustal loading associated with rapid seasonal filling and drawdown across deep gorge reservoirs.',
    questions: [
      'Is there statistically significant micro-seismic clustering correlated with reservoir water-level fluctuations along the Chenab?',
      'Are local seismic telemetry networks around Dulhasti, Baglihar, Salal, and Sawalkote publicly accessible for independent verification?',
    ],
    datasets: [
      'ISC/NCS instrumental earthquake catalogues & JRC/altimetry reservoir stage proxies',
      ' Coupled hydromechanical pore-pressure diffusion protocol scoping',
    ],
    deliverable: 'Reservoir-triggered seismicity screening protocol and instrumentation transparency audit.',
  },
  {
    ch: '06',
    domain: 'Sediment transport and retention',
    summary:
      'Quantifies high Himalayan glacial/paraglacial sediment yield entering the Chenab, reservoir trap efficiency (documented sharply at Salal and Baglihar), flushing operations, and downstream coarse-sediment starvation.',
    questions: [
      'How rapidly is dead and live storage volume being lost to siltation across Dulhasti, Baglihar, and Salal?',
      'How do episodic sluicing/flushing releases affect downstream turbidity spikes and channel morphology at Akhnoor?',
    ],
    datasets: [
      'CWC reservoir sedimentation compendia & Sentinel-2 suspended-sediment optical plumes',
      'Landsat 1985–2026 delta progradation sequences within reservoir backwaters',
    ],
    deliverable: 'Cascade sediment mass-balance and downstream sediment-deficit model (EXP-01.4).',
  },
  {
    ch: '07',
    domain: 'Environmental flow requirements',
    summary:
      'Evaluates statutory minimum environmental flow (e-flow) mandates against seasonal hydraulic habitat requirements and diurnal hydropeaking fluctuations in dewatered tunnel-bypass reaches.',
    questions: [
      'How many kilometres of the Chenab and its tributaries experience winter lean-season bypass dewatering or rapid daily stage swings?',
      'Are real-time downstream e-flow telemetries publicly disclosed and independently audited?',
    ],
    datasets: [
      'PARIVESH EC e-flow conditions, hydraulic cross-section models & Sentinel-2 low-flow wetted-width series',
      'Eco-hydraulic depth-velocity suitability criteria for coldwater Himalayan rheophilic taxa',
    ],
    deliverable: 'Environmental flow scenario model and bypass-reach wetted-habitat assessment (EXP-01.6).',
  },
  {
    ch: '08',
    domain: 'River fragmentation and aquatic biodiversity',
    summary:
      'Assesses barrier effects of sequential dams without effective fish-passage connectivity on native snow trout (Schizothorax), Golden Mahseer (Tor putitora), and benthic macroinvertebrate communities.',
    questions: [
      'How has cascade fragmentation partitioned longitudinal gene flow and spawning migrations between the Akhnoor foothills and upper gorges?',
      'Which free-flowing tributary refugia remain intact across the Marusudar, Neeru, Ans, and Bichleri sub-basins?',
    ],
    datasets: [
      'GBIF museum/field occurrence records, peer-reviewed Chenab ichthyofauna surveys & barrier connectivity indices',
      'Thermal and dissolved-gas regime alteration synthesis below tailrace outlets',
    ],
    deliverable: 'Dendritic Connectivity Index (DCI) and native coldwater fish refugia map.',
  },
  {
    ch: '09',
    domain: 'Glacial lakes and cascading flood risks',
    summary:
      'Maps moraine- and ice-dammed proglacial lakes in the Chandra–Bhaga, Miyar, Warwan, and Bhutnal headwaters and evaluates multi-hazard GLOF or landslide-outburst flood waves entering cascade reservoirs.',
    questions: [
      'Which upstream glacial lakes exhibit rapid 1985–2026 areal expansion and steep avalanche/rockfall surroundings?',
      'Can extreme outburst or cloudburst waves overtop or stress sequential spillways when reservoirs sit near full supply level?',
    ],
    datasets: [
      'Landsat/Sentinel-2 1985–2026 glacial-lake polygons, Copernicus DEM & GPM IMERG extreme rainfall records',
      'Hydrodynamic dam-break / GLOF routing protocol (EXP-01.5)',
    ],
    deliverable: 'Headwater GLOF inventory and cascading reservoir flood-routing vulnerability matrix.',
  },
  {
    ch: '10',
    domain: 'Climate change and future water availability',
    summary:
      'Examines cryospheric mass loss, shifting rain-on-snow elevations, and mid-century discharge non-stationarity relative to multi-decade hydropower generation assumptions.',
    questions: [
      'Are project hydrological dependability calculations (90% dependable year) anchored to stationary past records that ignore peak-water transition?',
      'How will intensifying monsoon cloudbursts and leaner late-summer glacier melt alter firm power vs. flood spill risk?',
    ],
    datasets: [
      'ERA5 1985–2026 temperature/snow trends, regional CMIP6 Himalayan cryosphere literature & CWC flow series',
      'Elevation-band hypsometric snowmelt sensitivity protocol',
    ],
    deliverable: 'Non-stationary climate-hydrology stress test for Chenab hydropower planning.',
  },
  {
    ch: '11',
    domain: 'Cumulative environmental impact assessment',
    summary:
      'Tests the primary research hypothesis by comparing isolated single-project EIA boundaries (10 km study radii) against basin-wide synergistic impacts across slope stability, muck disposal, deforestation, and flow alteration.',
    questions: [
      'Where do adjacent 10 km project impact zones overlap across Kishtwar, Doda, Ramban, and Reasi without joint modelling?',
      'How does adding Sawalkote alter basin-wide cumulative metrics relative to Dulhasti, Baglihar, and Salal alone?',
    ],
    datasets: [
      'PARIVESH individual EIA reports, cumulative basin GIS overlays & Sentinel-1 InSAR slope velocity maps (EXP-01.3)',
      'Forest diversion ledgers and tunnel-spoil site inventories',
    ],
    deliverable: 'Comparative single-project EIA vs. basin-scale Cumulative Impact Assessment audit.',
  },
  {
    ch: '12',
    domain: 'Ecological carrying capacity modelling',
    summary:
      'Synthesizes geological slope thresholds, seismic hazard, sediment continuity, e-flow minimums, and terrestrial forest loss into a multi-criteria ecological carrying capacity framework for the Chenab Basin.',
    questions: [
      'At what threshold of longitudinal impoundment/diversion and slope excavation do irreversible geomorphological and ecological regime shifts occur?',
      'Which reaches of the Chenab Basin have already approached or exceeded physical carrying capacity indicators?',
    ],
    datasets: [
      'Integrated outputs from EXP-01.1 through EXP-01.6, Sentinel-1/2 layers & DEM terrain stability indices',
      'Published Himalayan river carrying-capacity methodologies',
    ],
    deliverable: 'Chenab Basin Cumulative Ecological Carrying Capacity framework (EXP-01.1 synthesis).',
  },
  {
    ch: '13',
    domain: 'Downstream and transboundary consequences',
    summary:
      'Traces hydrological, sedimentological, and floodplain consequences downstream of Salal across Akhnoor, the Pargwal riverine wetlands, and transboundary Indus Waters Treaty storage/run-of-river constraints.',
    questions: [
      'How do upstream sediment trapping and peaking releases reshape channel braiding, bank erosion, and wetland inundation in Akhnoor–Pargwal?',
      'How do strict run-of-the-river treaty design constraints interact with siltation management and flood cushioning?',
    ],
    datasets: [
      'Landsat/Sentinel-2 Akhnoor–Pargwal planform series, JRC surface water & statutory treaty engineering parameters',
      'Coupled linkage between Investigation 01 (dams), Investigation 02 (gravel bars), and Investigation 03 (Pargwal)',
    ],
    deliverable: 'Downstream gorge-to-plains hydrological & geomorphic coupling assessment.',
  },
  {
    ch: '14',
    domain: 'Environmental clearance and regulatory compliance',
    summary:
      'Audits PARIVESH Environmental Clearance conditions, six-monthly compliance reports, public-hearing records, muck-dumping retaining walls, compensatory afforestation, and NGT/judicial orders.',
    questions: [
      'What fraction of binding Environmental Management Plan (EMP) conditions—slope stabilization, spoil containment, e-flows—are independently verified on the ground?',
      'Have affected gorge communities in Kishtwar, Doda, Ramban, and Reasi received transparent hazard disclosure and Right of Reply?',
    ],
    datasets: [
      'PARIVESH EC letters, six-monthly compliance filings, CAG/NGT dockets & high-resolution satellite spoil-site checks',
      'Institutional Right-of-Reply correspondence protocol',
    ],
    deliverable: 'Statutory clearance vs. ground-compliance accountability matrix.',
  },
  {
    ch: '15',
    domain: 'Scientific conclusions and policy recommendations',
    summary:
      'Establishes evidence-gated conclusions and policy reforms—moratoria on unassessed overlapping reaches, mandatory real-time InSAR/seismic/e-flow telemetry, and statutory basin-scale carrying capacity gates.',
    questions: [
      'What empirically verifiable reforms are required before any additional mainstem or tributary headrace diversion is cleared?',
      'How should open hydrological, seismic, and slope-stability data be institutionalized for public safety in the Chenab Valley?',
    ],
    datasets: [
      'Validated synthesis of Chapters 01–14, Stage 07 specialist peer-review critiques & agency responses',
      'Comparative Himalayan hydropower governance benchmarks',
    ],
    deliverable: 'Evidence-locked Chenab Basin Governance & Carrying-Capacity Charter.',
  },
];

const INV_02_RAW_CHAPTERS: RawChapterSeed[] = [
  {
    ch: '01',
    domain: 'Physiography of the Jammu river systems',
    summary:
      'Defines the steep topographic transition from the Pir Panjal and Lesser Himalayas across fragile Siwalik sandstones/conglomerates onto the Jammu–Samba–Kathua piedmont alluvial fan (Kandi and Sirowal belts).',
    questions: [
      'How does the abrupt break in channel slope at the Siwalik mountain front govern natural gravel deposition and braided channel dynamics?',
      'Why are Kandi-belt seasonal torrents (khads) and perennial rivers uniquely sensitive to bed-armour removal?',
    ],
    datasets: [
      'SRTM & Copernicus 30 m DEM longitudinal profiles, stream-power maps & geological unit boundaries',
      'India-WRIS sub-basin delineations for Chenab, Tawi, Basantar, Ujh, and Ravi',
    ],
    deliverable: 'Physiographic and stream-power zonation atlas of Jammu Division rivers.',
  },
  {
    ch: '02',
    domain: 'Historical river morphology',
    summary:
      'Reconstructs 41 years (1985–2026) of planform morphology—active braid width, sinuosity, mid-channel bar stability, and riparian corridor extent—establishing the pre-mechanized baseline.',
    questions: [
      'How did Jammu’s rivers migrate and replenish cobble-gravel bars between 1985 and the post-2015 surge in mechanized extraction?',
      'Where has natural multi-thread braiding collapsed into narrow, incised single-thread trenches?',
    ],
    datasets: [
      'Landsat 5 TM, 7 ETM+, 8/9 OLI (1985–2026) & JRC Global Surface Water historical masks',
      'Archival topographic planform benchmarks (EXP-02.1)',
    ],
    deliverable: '41-year (1985–2026) multi-decadal river planform change dataset.',
  },
  {
    ch: '03',
    domain: 'Tawi River hydrological assessment',
    summary:
      'Examines the Tawi River from Kailash Kund headwaters through Udhampur and metropolitan Jammu—assessing monsoon flash-flood peaks, lean-season baseflow decline, artificial lake/barrage works, and urban gravel extraction.',
    questions: [
      'How have urban channel constriction, barrage ponding, and peri-urban mining altered flood hydraulics through Jammu city?',
      'What is the seasonal relationship between Tawi discharge, municipal water abstraction, and downstream floodplain recharge?',
    ],
    datasets: [
      'CWC/India-WRIS Tawi hydrographs, GPM IMERG rainfall, Sentinel-2 10 m channel maps',
      'Metropolitan Jammu floodway cross-sections & bridge-pier locations',
    ],
    deliverable: 'Tawi River integrated hydrological and urban-corridor diagnostic.',
  },
  {
    ch: '04',
    domain: 'Ravi River environmental assessment',
    summary:
      'Evaluates the Ravi corridor along Kathua and Lakhanpur—examining upstream Ranjit Sagar/Shahpurkandi regulation effects alongside intensive downstream boulder and sand extraction.',
    questions: [
      'How does upstream flow regulation interact with downstream mechanized mining to starve the Kathua–Ravi reach of coarse bedload?',
      'Where are lateral bank-erosion hazards threatening agricultural land and border-corridor embankments?',
    ],
    datasets: [
      'Landsat/Sentinel-2 1985–2026 Ravi planform imagery, Sentinel-1 flood masks & PARIVESH/NGT Kathua records',
      'Cross-state floodplain land-cover trajectories',
    ],
    deliverable: 'Ravi River regulated-flow and mining-reach environmental assessment.',
  },
  {
    ch: '05',
    domain: 'Ujh River sediment dynamics',
    summary:
      'Investigates the flashy, high-bedload Ujh River watershed in Kathua—quantifying monsoon boulder-cobble transport from fragile Siwalik catchments, proposed multipurpose diversion impacts, and commercial crusher clusters.',
    questions: [
      'What is the physically realistic annual bedload replenishment of the Ujh compared with permitted mineral-block quotas?',
      'How are stone-crusher clusters positioned relative to active Ujh floodways and forest corridors?',
    ],
    datasets: [
      'Copernicus DEM watershed yield models, GPM IMERG storm events & Sentinel-2 crusher/pit mapping (EXP-02.2)',
      'District Survey Report (DSR) Kathua replenishment tables',
    ],
    deliverable: 'Ujh River sediment dynamics and crusher-footprint spatial audit.',
  },
  {
    ch: '06',
    domain: 'Basantar River vulnerability',
    summary:
      'Conducts a focused forensic geomorphological investigation of the Basantar River in Samba District, anchored to the February 6, 2025 NGT proceedings concerning illegal sand mining and reported bridge-pillar exposure.',
    questions: [
      'What spatial extent and temporal progression of riverbed excavation along the Basantar is observable in Sentinel-2 and Landsat archives prior to and following February 2025?',
      'How severely has thalweg lowering compromised foundation depth at highway, rail, and rural bridges across Samba?',
    ],
    datasets: [
      'NGT Feb 6, 2025 docket (Indian Kanoon), Sentinel-2 10 m monthly time-series (2016–2026) & Sentinel-1 SAR',
      'Bridge corridor coordinates and upstream/downstream pit proximity metrics',
    ],
    deliverable: 'Basantar River forensic mining-footprint & bridge-corridor vulnerability dossier.',
  },
  {
    ch: '07',
    domain: 'Riverbed mining intensity',
    summary:
      'Maps the division-wide transition from manual, seasonal artisanal sand collection to heavy-excavator, deep-pit, and in-stream mechanized mining across Jammu, Samba, Kathua, Udhampur, and Rajouri–Poonch.',
    questions: [
      'Where does satellite evidence indicate excavation inside active wet channels, beyond 1–3 metre depth limits, or outside auctioned block boundaries?',
      'How has total mined footprint area (hectares) changed year-by-year from 2016 through 2026?',
    ],
    datasets: [
      'Sentinel-2 10 m optical/SWIR indices, Sentinel-1 SAR coherence/backscatter & PARIVESH mineral block coordinates',
      'SANDRP documentary baselines tested against independent remote-sensing classification (EXP-02.2)',
    ],
    deliverable: 'Division-wide satellite riverbed mining intensity & boundary-compliance atlas.',
  },
  {
    ch: '08',
    domain: 'Sediment replenishment versus extraction',
    summary:
      'Tests the Exner mass-balance hypothesis by comparing empirical monsoon sediment replenishment rates against auctioned District Survey Report (DSR) targets and actual excavation footprints.',
    questions: [
      'Do current DSR replenishment methodologies scientifically measure actual post-monsoon aggradation, or rely on unverified desktop formulas?',
      'In which river reaches does annual extraction exceed natural monsoon replenishment (R_ext > 1)?',
    ],
    datasets: [
      'Published DSRs for Jammu, Samba & Kathua, GPM IMERG runoff-erosion forcing & DEM transport capacity models (EXP-02.3)',
      'MoEFCC Sustainable Sand Mining Management Guidelines (2016) & Enforcement Guidelines (2020) benchmarks',
    ],
    deliverable: 'Quantitative Extraction-to-Replenishment Ratio (R_ext) model across four basins.',
  },
  {
    ch: '09',
    domain: 'River channel incision and migration',
    summary:
      'Examines how gravel-pit excavation triggers upstream-migrating headcuts (hungry-water erosion), downstream sediment starvation, thalweg avulsion, and bank collapse.',
    questions: [
      'How far upstream and downstream of major mining clusters does measurable channel-bed degradation propagate?',
      'Where has stripping of the coarse cobble armour layer exposed underlying erodible sands and silts to rapid monsoon scour?',
    ],
    datasets: [
      'Multi-epoch DEMs, ICESat-2 lidar river crossings & 1985–2026 planform lateral shift vectors (EXP-02.4)',
      'Fluvial hydraulic shear-stress and knickpoint celerity equations',
    ],
    deliverable: 'Longitudinal incision and lateral avulsion hazard profiles.',
  },
  {
    ch: '10',
    domain: 'Bridge and infrastructure vulnerability',
    summary:
      'Evaluates structural scour risk across NH-44, Delhi–Amritsar–Katra expressway crossings, Northern Railway bridges, canal headworks, and drinking-water radial collector wells.',
    questions: [
      'Which bridges across the Basantar, Tawi, Ujh, and Ravi fall within statutory no-mining buffer zones (typically 500 m–1 km) yet exhibit adjacent excavation?',
      'How do combined general bed lowering and monsoon vortex pier scour affect structural safety margins?',
    ],
    datasets: [
      'OpenStreetMap/official bridge & barrage registry overlaid with Sentinel-2 pit polygons (EXP-02.6)',
      'NGT Feb 6, 2025 Basantar bridge-pillar record & IRC/hydraulic pier-scour standards',
    ],
    deliverable: 'Bridge & hydraulic-infrastructure no-mining buffer audit and scour risk index.',
  },
  {
    ch: '11',
    domain: 'Floodplain encroachment',
    summary:
      'Tracks 41 years (1985–2026) of residential colonies, commercial complexes, institutional campuses, and waste dumps filling active floodplains and khad drainage courses across greater Jammu.',
    questions: [
      'How much natural flood-conveyance cross-section along the Tawi and urban khads has been lost to permanent construction since 1985?',
      'How does simultaneous riverbed incision and floodplain constriction amplify catastrophic flash-flood velocities?',
    ],
    datasets: [
      'Landsat/Sentinel-2 1985–2026 impervious-surface mapping, Copernicus DEM & JRC flood masks (EXP-02.5)',
      '2014 & recent Jammu monsoon flash-flood inundation footprints',
    ],
    deliverable: '1985–2026 Jammu floodplain encroachment & khad-constriction map.',
  },
  {
    ch: '12',
    domain: 'Groundwater and river interactions',
    summary:
      'Investigates how lowering the alluvial riverbed drains adjacent unconfined riparian aquifers, dries shallow village wells and dugwells/tube-wells across the Kandi-to-Sirowal transition, and degrades hyporheic filtration.',
    questions: [
      'Do CGWB/India-WRIS groundwater observation wells near heavily mined reaches of Samba, Kathua, and Jammu show accelerated pre-monsoon water-table decline?',
      'How does removal of thick sand-gravel beds reduce monsoon floodwater infiltration into regional aquifers?',
    ],
    datasets: [
      'India-WRIS / CGWB seasonal piezometric depth-to-water records (1985–2026) & river-stage differentials',
      'Darcy river–aquifer hydraulic gradient coupling protocol',
    ],
    deliverable: 'Riparian groundwater drawdown and hyporheic recharge loss assessment.',
  },
  {
    ch: '13',
    domain: 'Sewage and industrial contamination',
    summary:
      'Analyzes untreated municipal nallah discharges into the urban Tawi and industrial effluents from Bari Brahmana, Gangyal, Samba, and Kathua estates entering the Basantar and Devak–Purmandal–Ravi drainage.',
    questions: [
      'What are the multi-year trajectories of BOD, dissolved oxygen, fecal coliform, heavy metals, and TDS across urban and industrial monitoring stations?',
      'How does loss of clean sand-bed hyporheic biofiltration compound downstream contamination?',
    ],
    datasets: [
      'JKPCC / CPCB NWMP water-quality time-series, STP capacity/utilization filings & NGT pollution dockets (EXP-02.7)',
      'Industrial cluster drainage pathway mapping',
    ],
    deliverable: 'Tawi–Basantar–Ujh–Ravi surface water quality & effluent load trend report.',
  },
  {
    ch: '14',
    domain: 'Mining permits and environmental compliance',
    summary:
      'Audits mineral e-auction leases, PARIVESH EC conditions, weighbridge/e-challan transport controls, night-mining bans, depth caps, and NGT enforcement compliance across Jammu Division.',
    questions: [
      'Why have illegal mechanized mining and bridge-safety violations persisted despite explicit MoEFCC 2020 Enforcement Guidelines and NGT directives?',
      'Are post-monsoon replenishment audits conducted independently before blocks are re-opened each autumn?',
    ],
    datasets: [
      'PARIVESH EC letters, Geology & Mining Department auction notifications & NGT joint-committee inspection reports',
      'Satellite day/night disturbance and haul-track verification',
    ],
    deliverable: 'Statutory mining permit vs. judicial & field compliance ledger.',
  },
  {
    ch: '15',
    domain: 'River restoration and sustainable extraction',
    summary:
      'Formulates geomorphologically grounded river-recovery standards—dynamic replenishment-capped quotas, 1 km infrastructure sanctuary zones, crushed/manufactured sand (M-Sand) transition, and urban khad room-for-the-river restoration.',
    questions: [
      'What scientifically verifiable sediment budget rules can supply legitimate construction demand without destroying Jammu’s rivers and bridges?',
      'Which incised reaches of the Basantar, Tawi, and Ujh require immediate extraction moratoria for natural gravel-bar recovery?',
    ],
    datasets: [
      'Synthesized findings of Chapters 01–14, M-Sand/recycled C&D aggregate substitution models & Stage 07 specialist review',
      'International gravel-bed river restoration standards',
    ],
    deliverable: 'Science-based Sustainable Riverbed Management & Floodplain Recovery Protocol.',
  },
];

const INV_03_RAW_CHAPTERS: RawChapterSeed[] = [
  {
    ch: '01',
    domain: "Historical evolution of Jammu's wetlands",
    summary:
      'Traces the geological and hydrological origins of Jammu Division’s diverse wetlands—from structurally controlled Siwalik synclinal/fault lakes (Surinsar–Mansar) and montane meadows (Sanasar) to Chenab–Tawi floodplain marshes (Pargwal, Gharana, Kukarian).',
    questions: [
      'What distinct geomorphic and hydrological mechanisms formed and sustained Jammu’s ridge lakes versus plains marshes?',
      'How were these waterbodies historically embedded in Dogra-era water stewardship, village commons, and agrarian hydrology?',
    ],
    datasets: [
      'Geological/topographic baselines, Copernicus DEM & historical gazetteer/Ramsar archival records',
      'Landsat 1985 earliest-epoch baseline composites',
    ],
    deliverable: 'Genetic & hydrological typology of Jammu Division freshwater ecosystems.',
  },
  {
    ch: '02',
    domain: 'Regional freshwater ecosystem inventory',
    summary:
      'Builds a unified geospatial inventory of lakes, marshes, village ponds (talabs), oxbow channels, and wet meadows across all ten districts of Jammu Division.',
    questions: [
      'How many mapped freshwater wetlands across Jammu Division enjoy formal statutory notification versus remaining unrecorded revenue/commons land?',
      'What is the combined seasonal vs. perennial surface-water area across the division?',
    ],
    datasets: [
      'National Wetland Inventory & Assessment (NWIA), JRC Global Surface Water, Sentinel-2 10 m MNDWI & Ramsar RIS',
      'Statutory conservation reserve & wildlife sanctuary boundary schedules',
    ],
    deliverable: 'Georeferenced Jammu Division Freshwater Wetland & Talab Registry.',
  },
  {
    ch: '03',
    domain: 'Surinsar Lake ecological assessment',
    summary:
      'Examines Surinsar Lake (western partner of the 350 ha Surinsar–Mansar Ramsar site designated November 8, 2005)—assessing catchment erosion, bathymetric siltation, thermal stratification, macrophyte zonation, and water quality.',
    questions: [
      'How have surrounding Siwalik road cuts, hillside construction, and catchment runoff altered Surinsar’s sedimentation and nutrient balance?',
      'What seasonal dissolved-oxygen depletion or cyanobacterial bloom signals appear in optical and limnological records?',
    ],
    datasets: [
      'Ramsar RIS #1573 dossier, Landsat/Sentinel-2 1985–2026 water & red-edge series (EXP-03.3, EXP-03.4)',
      'Published University of Jammu / peer-reviewed limnological and macrophyte benchmarks',
    ],
    deliverable: 'Surinsar Lake 41-year limnological & catchment-stress dossier.',
  },
  {
    ch: '04',
    domain: 'Mansar Lake ecological assessment',
    summary:
      'Evaluates Mansar Lake (eastern partner of the November 8, 2005 Ramsar complex)—scrutinizing pilgrim/tourist shoreline pressure, commercial runoff, sewage interception, carp/fish mortality episodes, and sacred freshwater tortoise habitat.',
    questions: [
      'To what extent does untreated or partially treated settlement/visitor effluent enter Mansar’s closed drainage basin?',
      'How have shoreline concretization and siltation affected littoral macrophyte beds and benthic dissolved oxygen?',
    ],
    datasets: [
      'Ramsar RIS #1573 baseline, Sentinel-2 shoreline/turbidity screening (subject to field calibration) & JKPCC/NWMP records',
      'Peer-reviewed Mansar bathymetric, hydrochemical, and biotic studies',
    ],
    deliverable: 'Mansar Lake trophic-state, shoreline-integrity & visitor-pressure audit.',
  },
  {
    ch: '05',
    domain: 'Gharana wetland and migratory birds',
    summary:
      'Investigates Gharana Wetland Conservation Reserve in R.S. Pura—a vital winter sanctuary for thousands of bar-headed geese (Anser indicus) and Central Asian Flyway waterfowl squeezed by agricultural encroachment, drainage, and domestic sewage.',
    questions: [
      'How has Gharana’s effective open-water and mudflat area changed from 1985 to 2026 relative to notified reserve boundaries?',
      'How do paddy-field agrochemicals, village wastewater, and boundary disputes affect winter waterfowl foraging security?',
    ],
    datasets: [
      'Sentinel-1/2 winter inundation series (EXP-03.2), eBird/GBIF/AWC waterbird time-series & High Court/NGT boundary records',
      'Published aquatic flora diversity surveys of Gharana',
    ],
    deliverable: 'Gharana Wetland hydroperiod, boundary-encroachment & winter avian capacity report.',
  },
  {
    ch: '06',
    domain: 'Pargwal wetland ecosystem',
    summary:
      'Examines Pargwal Wetland on the braided Chenab floodplain near Akhnoor—documenting its aquatic plant diversity, winter waterfowl congregations, and hydrological sensitivity to upstream Chenab dam regulation (Investigation 01) and floodplain gravel mining (Investigation 02).',
    questions: [
      'How strongly does Pargwal’s seasonal inundation depend on Chenab monsoon flood pulses and shallow phreatic seepage?',
      'Are upstream Salal/Baglihar flow regulation and nearby riverbed extraction drying or fragmenting Pargwal’s marsh channels?',
    ],
    datasets: [
      'Landsat/Sentinel-2 1985–2026 floodplain inundation masks, Chenab discharge proxies & published macrophyte inventories',
      'GBIF/eBird avian records across the Akhnoor–Pargwal riverine corridor',
    ],
    deliverable: 'Pargwal river-floodplain hydro-ecological connectivity assessment.',
  },
  {
    ch: '07',
    domain: 'Kukarian and Sanasar wetlands',
    summary:
      'Pairs the low-elevation Kukarian floodplain wetland in the Jammu plains with the high-elevation (~2,050 m) Sanasar montane meadow wetland in Ramban—contrasting agricultural conversion on the plains with tourism compaction, golf/recreation landscaping, and drainage in sub-alpine bowls.',
    questions: [
      'What aquatic macrophyte communities and seasonal waterbird guilds persist at Kukarian and Sanasar, and which indicator species are declining?',
      'How have drainage ditches, grazing/trampling, and hospitality infrastructure altered Sanasar’s wet-meadow hydrology?',
    ],
    datasets: [
      'Published botanical surveys of Kukarian & Sanasar aquatic flora, Sentinel-2 moisture/NDWI indices & DEM micro-drainage',
      '41-year (1985–2026) land-cover trajectories around both basins',
    ],
    deliverable: 'Comparative plains (Kukarian) and montane (Sanasar) small-wetland vulnerability study.',
  },
  {
    ch: '08',
    domain: 'Historical wetland extent and land-use changes',
    summary:
      'Executes a harmonized 1985–2026 land-use/land-cover and NDWI/MNDWI synthesis across all focal Jammu wetlands and urban talabs to establish net open-water and marsh loss.',
    questions: [
      'What percentage of 1985 perennial and seasonal wetland area across the Jammu plains has transitioned to agriculture, silt islands, or built-up land by 2026?',
      'Which years mark the sharpest inflection points of wetland contraction?',
    ],
    datasets: [
      'Landsat 5/7/8/9 & Sentinel-2 harmonized MNDWI/NDWI stacks & JRC Global Surface Water (EXP-03.1, EXP-03.3)',
      'Multi-date land-cover transition matrices',
    ],
    deliverable: '41-year (1985–2026) Jammu Wetland Extent & Land-Use Transition Atlas.',
  },
  {
    ch: '09',
    domain: 'Groundwater recharge functions',
    summary:
      'Quantifies the hydrogeological role of Jammu’s wetlands and traditional village talabs in recharging Kandi and Sirowal aquifers that supply drinking and irrigation wells.',
    questions: [
      'How do seasonal water-table elevations in surrounding wells respond to wetland inundation cycles versus drained/concretized basins?',
      'Where does lining or infilling of ponds and marshes sever vertical recharge into unconfined aquifers?',
    ],
    datasets: [
      'India-WRIS / CGWB piezometric series, soil-permeability maps & wetland water-balance models',
      'Spatial correlation between talab/wetland loss and pre-monsoon groundwater depletion',
    ],
    deliverable: 'Wetland-to-aquifer recharge coupling model for the Jammu plains.',
  },
  {
    ch: '10',
    domain: 'Natural flood attenuation',
    summary:
      'Evaluates how floodplain marshes, depressional wetlands, and traditional stormwater retention ponds buffer extreme GPM IMERG monsoon cloudbursts across metropolitan Jammu and R.S. Pura–Samba.',
    questions: [
      'How much peak stormwater runoff volume is absorbed by intact wetlands compared with encroached, impervious catchments?',
      'How do wetland loss metrics align with urban pluvial/fluvial flooding hotspots documented in the J&K Stormwater context?',
    ],
    datasets: [
      'Copernicus DEM depression-storage volumes, GPM IMERG design storms, Sentinel-1 flood footprints & J&K Stormwater parameters',
      'Hydrological detention-routing sensitivity scenarios',
    ],
    deliverable: 'Natural flood-attenuation capacity & urban stormwater buffer assessment.',
  },
  {
    ch: '11',
    domain: 'Agricultural runoff and nutrient loading',
    summary:
      'Models non-point nitrogen, phosphorus, and pesticide export from intensively fertilized paddy-wheat plains surrounding Gharana, Pargwal, and Kukarian, alongside point-source domestic inflows at Surinsar and Mansar.',
    questions: [
      'What are the dominant seasonal pathways and magnitudes of nitrate and phosphate loading entering each wetland?',
      'Can vegetated riparian buffer strips intercept a decisive share of agricultural nutrient runoff before marsh entry?',
    ],
    datasets: [
      'Catchment land-use/cropping maps, fertilizer application norms, GPM IMERG runoff & hydrochemical benchmarks (EXP-03.5)',
      'Drainage inflow network delineation',
    ],
    deliverable: 'Catchment nutrient-loading budget for Jammu’s flagship wetlands.',
  },
  {
    ch: '12',
    domain: 'Eutrophication and aquatic biodiversity',
    summary:
      'Examines trophic cascades—algal blooms, invasive macrophyte proliferation (Eichhornia, Salvinia, Typha dominance), submerged flora loss, hypoxia, and native fish/herpetofauna stress—strictly coupling satellite screening with field calibration.',
    questions: [
      'How has shifting nutrient stoichiometry reshaped documented native submerged and floating-leaved aquatic plant diversity across Gharana, Pargwal, Kukarian, Sanasar, and Surinsar–Mansar?',
      'Where do invasive macrophytes accelerate terrestrialization and open-water loss?',
    ],
    datasets: [
      'Peer-reviewed Jammu aquatic flora inventories, field-calibrated Sentinel-2 chlorophyll/turbidity protocols (EXP-03.4) & DO/BOD logs',
      'Trophic State Index (Carlson TSI) validation framework',
    ],
    deliverable: 'Eutrophication trajectory and native aquatic plant diversity assessment.',
  },
  {
    ch: '13',
    domain: 'International migratory bird corridors',
    summary:
      'Maps Jammu Division’s role as a critical cis-Himalayan staging and wintering hub along the Central Asian Flyway—linking high-altitude Ladakh/Kashmir passages with Gharana, Pargwal, Kukarian, Surinsar, and Mansar.',
    questions: [
      'How does functional connectivity across this cluster of wetlands buffer migratory waterfowl when individual sites suffer drought or disturbance?',
      'Which threatened or flagship migratory species exhibit changing winter abundance or shortened residency windows?',
    ],
    datasets: [
      'GBIF & eBird occurrence archives, Asian Waterbird Census summaries & winter MNDWI habitat suitability layers (EXP-03.6)',
      'Flyway stepping-stone network graph analysis',
    ],
    deliverable: 'Central Asian Flyway Jammu Plains Connectivity & Habitat Suitability Model.',
  },
  {
    ch: '14',
    domain: 'Ramsar obligations and conservation governance',
    summary:
      'Audits statutory governance twenty-one years after Surinsar–Mansar’s November 8, 2005 Ramsar designation (350 ha)—examining Wetlands (Conservation and Management) Rules 2017 notification, brief documents, integrated management plans, boundary demarcation, and NGT/High Court compliance.',
    questions: [
      'Have statutory ecological-character maintenance obligations under the Ramsar Convention and 2017 Wetland Rules been implemented and audited on the ground?',
      'Why do non-Ramsar satellite wetlands (Gharana, Pargwal, Kukarian, Sanasar) face fragmented jurisdictional oversight?',
    ],
    datasets: [
      'Ramsar Information Service filings, J&K Wetland Authority notifications, PARIVESH/NGT dockets & budget utilization records',
      'Institutional Right-of-Reply governance audit',
    ],
    deliverable: 'Ramsar & Statutory Wetland Governance Compliance Scorecard.',
  },
  {
    ch: '15',
    domain: 'Wetland restoration and ecological security',
    summary:
      'Synthesizes ecological restoration blueprints and ecosystem-service valuation (EXP-03.7)—demonstrating why protecting and re-wetting Jammu’s natural freshwater commons is far more cost-effective than replacing lost flood control, groundwater, and water purification with concrete.',
    questions: [
      'What site-specific hydrological, catchment-buffer, sewage-diversion, and community co-stewardship actions can restore ecological character across all six focal systems?',
      'What engineered infrastructure costs will Jammu incur if wetland degradation continues unabated?',
    ],
    datasets: [
      'Integrated synthesis of Chapters 01–14, EXP-03.7 ecosystem service valuation & Stage 07 specialist review',
      'Nature-based stormwater and Ramsar wise-use restoration standards',
    ],
    deliverable: 'Jammu Plains Wetland Restoration & Hydrological Security Action Blueprint.',
  },
];

function buildChaptersForInvestigation(
  inv: JammuFlagshipInvestigationSpec,
  seeds: RawChapterSeed[],
  offset: number
): JammuChapterProtocol[] {
  return seeds.map((seed, idx) => ({
    investigationNumber: inv.number,
    investigationTitle: inv.title,
    investigationSlug: inv.storySlug,
    chapterNumber: seed.ch,
    globalIndex: offset + idx + 1,
    slug: slugifyDomain(inv.number, seed.ch, seed.domain),
    researchDomain: seed.domain,
    researchStatus: 'Proposed Research Target · Investigation Protocol In Progress',
    executiveSummary: [
      seed.summary,
      `Within Investigation ${inv.number} (${inv.title}), Chapter ${seed.ch} operationalizes Himalayan Dispatch's foundational rule—scientific discovery before editorial conclusions—by defining explicit observational datasets, falsifiable metrics, and validation gates prior to publishing empirical findings.`,
    ],
    keyQuestionsAndScope: [
      seed.questions[0],
      seed.questions[1],
      `Primary Hypothesis Linkage: Evaluates how "${seed.domain}" tests Investigation ${inv.number}'s central hypothesis across the 1985–2026 baseline.`,
    ],
    methodologyAndDatasets: [
      seed.datasets[0],
      seed.datasets[1],
      '10-Stage Publication Standard Gate: Requires Stage 05 independent data validation and Stage 07 external specialist peer review before empirical conclusions are asserted.',
    ],
    scientificDeliverable: seed.deliverable,
    methodologicalCaveat:
      'Proposed Research Target Notice: No original satellite processing, hydrological simulation, or field calibration has yet been completed for this chapter. All research scopes represent structured scientific protocols awaiting execution.',
  }));
}

export const JAMMU_FRONTIERS_CHAPTERS_45: JammuChapterProtocol[] = [
  ...buildChaptersForInvestigation(JAMMU_FLAGSHIP_INVESTIGATIONS[0], INV_01_RAW_CHAPTERS, 0),
  ...buildChaptersForInvestigation(JAMMU_FLAGSHIP_INVESTIGATIONS[1], INV_02_RAW_CHAPTERS, 15),
  ...buildChaptersForInvestigation(JAMMU_FLAGSHIP_INVESTIGATIONS[2], INV_03_RAW_CHAPTERS, 30),
];

export function getJammuChaptersByInvestigation(
  invNum: JammuInvestigationNumber
): JammuChapterProtocol[] {
  return JAMMU_FRONTIERS_CHAPTERS_45.filter((c) => c.investigationNumber === invNum);
}

export function getJammuChapterBySlug(slug: string): JammuChapterProtocol | null {
  return JAMMU_FRONTIERS_CHAPTERS_45.find((c) => c.slug === slug) || null;
}

export function getJammuAdjacentChapters(slug: string): {
  previous: JammuChapterProtocol | null;
  next: JammuChapterProtocol | null;
} {
  const idx = JAMMU_FRONTIERS_CHAPTERS_45.findIndex((c) => c.slug === slug);
  if (idx === -1) return { previous: null, next: null };
  return {
    previous: idx > 0 ? JAMMU_FRONTIERS_CHAPTERS_45[idx - 1] : null,
    next: idx < JAMMU_FRONTIERS_CHAPTERS_45.length - 1 ? JAMMU_FRONTIERS_CHAPTERS_45[idx + 1] : null,
  };
}
