/**
 * Kashmir EcoWatch: Outdoor Classroom (OD) Framework
 * Western Himalayan Outdoor Environmental Education & Field Science Program
 * 
 * Historical Attribution: Environment Services & Research Organization (ESRO) & eIEN Kashmir (2002–2006).
 * Architectural Principle: Every outdoor classroom connects a curriculum objective,
 * a real ecosystem, a scientific field activity, and a measurable learning outcome.
 */

export interface CurriculumLevel {
  id: string;
  name: string;
  targetAudience: string;
  ageBracket: string;
  pedagogicalFocus: string;
  coreCompetencies: string[];
  fieldMethods: string[];
  assessmentRubric: string;
}

export interface LearningLifecycleStep {
  step: number;
  id: string;
  title: string;
  actor: string;
  summary: string;
  operationalDetails: string[];
  deliverable: string;
  platformAction: string;
  platformRoute: string;
}

export interface FieldLearningProgram {
  id: string;
  title: string;
  subtitle: string;
  category: 'Wetlands' | 'Forests' | 'Water' | 'Cryosphere' | 'Agriculture' | 'Urban' | 'Geology' | 'Citizen Science';
  accentColor: string;
  gradient: string;
  iconName: string;
  leadEcosystem: string;
  typicalDestinations: string[];
  suggestedDuration: string;
  curriculumObjectives: Record<string, string[]>;
  fieldActivities: string[];
  laboratoryDiagnostics: string[];
  equipmentChecklist: string[];
  safetyAndPermits: {
    statutoryPermits: string[];
    safetyProtocols: string[];
    leaveNoTraceRules: string[];
  };
  intergenerationalStewardship: {
    communityDialoguePrompt: string;
    oralHistoryQuestions: string[];
    traditionalKnowledgeComparison: string;
  };
  measurableOutcomes: string[];
  linkedCalendarObservance: string;
  linkedEcoWatchRoute: string;
  gisLayerId: string;
}

export interface AdoptedEcosystem {
  id: string;
  code: string; // e.g. KEW-OD-WET-001
  name: string;
  ecosystemType: 'Lake' | 'Wetland' | 'Forest' | 'Spring' | 'River' | 'Mountain' | 'Agricultural' | 'Geological';
  district: string;
  coordinates: [number, number]; // [lat, lng]
  elevationM: number;
  adoptingInstitutions: {
    institutionName: string;
    institutionType: 'High School' | 'Higher Secondary' | 'Degree College' | 'University Department';
    ecoClubName: string;
    adoptedSince: string;
    monitoringFrequency: 'Weekly' | 'Fortnightly' | 'Monthly' | 'Seasonal';
    leadTeacher: string;
  }[];
  keyMonitoringParameters: string[];
  currentHealthIndex: number; // 0 - 100
  historicalBaselineYear: number;
  statutoryJurisdiction: string;
  gisLayer: string;
}

export interface PilotInstitution {
  id: string;
  name: string;
  type: 'Government School' | 'Private School' | 'Degree College' | 'University';
  district: string;
  establishedYear: number;
  ecoClubName: string;
  facultyMentor: string;
  studentEnrolment: number;
  adoptedSiteCode: string;
  adoptedSiteName: string;
  verifiedFieldSubmissions: number;
  accreditationLevel: 'Level 1 - Active Observer' | 'Level 2 - Certified Field Hub' | 'Level 3 - Regional Research Partner';
}

export interface StudentObservationRecord {
  id: string;
  studentIdAnonymized: string; // e.g. STU-SRI-042
  schoolCode: string;
  siteCode: string;
  siteName: string;
  programId: string;
  observationDate: string;
  verificationStatus: 'Student Provisional' | 'Teacher Approved' | 'EcoWatch Verified';
  gpsLocation: {
    lat: number;
    lng: number;
    elevationM: number;
  };
  parametersMeasured: Record<string, string | number>;
  fieldNotes: string;
  supervisingTeacher: string;
  verifiedByScientist?: string;
  openDataCitation: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. CURRICULUM LEVELS (5 TIERS)
// ─────────────────────────────────────────────────────────────────────────────

export const CURRICULUM_LEVELS: CurriculumLevel[] = [
  {
    id: 'foundation',
    name: 'Foundation Tier',
    targetAudience: 'Classes 6–8 (Middle School)',
    ageBracket: '11–13 Years',
    pedagogicalFocus: 'Sensory observation, qualitative nature journaling, morphological taxonomy, and basic natural history of Kashmir.',
    coreCompetencies: [
      'Maintaining an empirical field notebook with date, weather, and habitat notes',
      'Distinguishing resident from migratory waterfowl using field identification keys',
      'Identifying common Kashmir trees by leaf venation, bark, and seed morphology',
      'Understanding the physical water cycle and Kashmir\'s snowmelt-fed drainage'
    ],
    fieldMethods: [
      'Visual bird counting with 8x42 binoculars',
      'Leaf rubbings and plant pressing for school herbariums',
      'Soil texture feeling tests (sand vs silt vs clay)',
      'Basic liquid thermometer air and water temperature logging'
    ],
    assessmentRubric: 'Weekly nature journal submission, species sketch accuracy, and participation in campus tree census.'
  },
  {
    id: 'intermediate',
    name: 'Intermediate Tier',
    targetAudience: 'Classes 9–10 (Secondary School)',
    ageBracket: '14–15 Years',
    pedagogicalFocus: 'Instrumental environmental diagnostics, quantitative sampling transects, and environmental conservation statutes.',
    coreCompetencies: [
      'Operating digital handheld multiparameter water pens (pH, Electrical Conductivity, TDS)',
      'Measuring tree diameter at breast height (DBH) and calculating basal area',
      'Recording GPS waypoints and calculating distance along riparian buffers',
      'Analyzing seasonal water level drawdown in local village ponds and springs'
    ],
    fieldMethods: [
      'Secchi disk depth measurements for water clarity and eutrophication',
      '1m × 1m quadrat sampling for grassland plant species frequency',
      'Stream flow velocity timing using neutral-buoyancy float methods',
      'Noise decibel surveying around silent eco-parks and school zones'
    ],
    assessmentRubric: 'Structured field experiment report, calibrated data accuracy, and presentation to school eco-club assembly.'
  },
  {
    id: 'advanced',
    name: 'Advanced Tier',
    targetAudience: 'Classes 11–12 (Higher Secondary / Senior Secondary)',
    ageBracket: '16–17 Years',
    pedagogicalFocus: 'Empirical environmental chemistry, geospatial mapping, and scientific hypothesis testing using Kashmir EcoWatch datasets.',
    coreCompetencies: [
      'Conducting Winkler titration for Dissolved Oxygen (DO) and calculating Biochemical Oxygen Demand (BOD5)',
      'Soil chemical profiling (Nitrogen, Phosphorus, Potassium, organic carbon percentage)',
      'Analyzing multi-decadal satellite change detection overlays in the EcoWatch GIS portal',
      'Evaluating human-wildlife conflict buffer zone encroachment around Dachigam and Overa-Aru'
    ],
    fieldMethods: [
      'Standardized water chemical test kits with colorimetric comparators',
      'Line-intercept transects for alpine meadow vegetation fragmentation',
      'Microscopic examination of lake water for cyanobacteria (*Microcystis*) blooms',
      'Digital GIS georeferencing of local point-source wastewater outfalls'
    ],
    assessmentRubric: 'Peer-reviewed research paper format, statistical error analysis, and formal defense before faculty board.'
  },
  {
    id: 'undergraduate',
    name: 'Undergraduate Tier',
    targetAudience: 'Degree Colleges & University Undergraduates',
    ageBracket: '18–22 Years',
    pedagogicalFocus: 'Landscape-scale ecological research design, watershed hydrology, environmental impact analysis, and open data science.',
    coreCompetencies: [
      'Hydrological gauging using velocity-area methods and flume calibrations',
      'Bioindicator assessment using Ephemeroptera, Plecoptera, Trichoptera (EPT) index',
      'Multivariate biodiversity community similarity indexes (Shannon-Wiener, Simpson)',
      'Evaluating compliance with statutory NGT environmental flow and riverbed mining guidelines'
    ],
    fieldMethods: [
      'Flow meter stream discharge profiling and acoustic depth sounding',
      'Macroinvertebrate kick-net sampling and benthic sorting',
      'Portable optical spectrometer light attenuation in alpine lakes',
      'Field survey integration with Sentinel-2 MSI NDVI and NDWI rasters'
    ],
    assessmentRubric: 'Publication of validated dataset to Kashmir EcoWatch open portal and formal capstone thesis defense.'
  },
  {
    id: 'research-mentor',
    name: 'Research Mentor & Faculty Tier',
    targetAudience: 'School Educators, College Faculty & Research Scientists',
    ageBracket: 'Professional Mentors',
    pedagogicalFocus: 'Field safety leadership, instrument calibration oversight, data quality verification, and intergenerational oral history documentation.',
    coreCompetencies: [
      'Supervising institutional field trip safety plans and legal permits under Wildlife Protection Act',
      'Reviewing and certifying student observation submissions before public ingestion',
      'Guiding ethical protocol for interviewing village elders on environmental change',
      'Co-authoring regional Western Himalayan Environmental Education Case Studies'
    ],
    fieldMethods: [
      'Calibration check with standard buffer solutions (pH 4.01, 7.00, 10.01)',
      'Duplicate sample quality assurance and outlier detection protocols',
      'Oral history audio recording and ethical consent verification',
      'Coordinating multi-school synchronous watershed monitoring blitzes'
    ],
    assessmentRubric: 'Annual Institutional Environmental Stewardship Audit and verification score across student field submissions.'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 2. EIGHT-STAGE LEARNING LIFECYCLE SYSTEM
// ─────────────────────────────────────────────────────────────────────────────

export const LEARNING_LIFECYCLE_STEPS: LearningLifecycleStep[] = [
  {
    step: 1,
    id: 'register-institution',
    title: 'Register Institution & Appoint Mentor',
    actor: 'Principal / Head of Institution & Designated Educator',
    summary: 'The school or college formally registers with Kashmir EcoWatch, designates an Eco-Club Coordinator, and establishes an active institutional profile.',
    operationalDetails: [
      'Principal signs the non-exclusive Outdoor Classroom Educational Partnership covenant',
      'Designation of at least one Science/Geography faculty member as certified Field Mentor',
      'Establishment or registration of the Student Eco-Club charter (minimum 10 students)',
      'Agreement to comply with student privacy safeguards and parental consent guidelines'
    ],
    deliverable: 'Institutional Charter & Verified School Portal Access Code',
    platformAction: 'Complete School Onboarding',
    platformRoute: '/environmental-calendar/outdoor-classroom/institutional-registration'
  },
  {
    step: 2,
    id: 'select-module-and-adopt',
    title: 'Select Learning Program & Adopt an Ecosystem',
    actor: 'Eco-Club Faculty Mentor & Student Council',
    summary: 'The institution selects one of eight curriculum programs and formally adopts a nearby lake, wetland, forest, spring, river, or mountain as its permanent outdoor laboratory.',
    operationalDetails: [
      'Consult the EcoWatch regional ecosystem map to identify a safe, accessible nearby site',
      'Select non-exclusive adoption tier (Lake, Wetland, Forest, Spring, River, Mountain)',
      'Assign age-appropriate curriculum level (Foundation, Intermediate, or Advanced)',
      'Receive unique EcoWatch Adopted Ecosystem Laboratory Identifier (e.g. KEW-OD-WET-001)'
    ],
    deliverable: 'Signed Ecosystem Adoption Pledge & GIS Layer Connection Certificate',
    platformAction: 'Browse Ecosystems to Adopt',
    platformRoute: '/environmental-calendar/outdoor-classroom/adopt-an-ecosystem'
  },
  {
    step: 3,
    id: 'prepare-fieldwork',
    title: 'Prepare Fieldwork, Safety & Equipment',
    actor: 'Supervising Educator & School Administration',
    summary: 'Prepare the academic field excursion using standardized teacher guides, student field sheets, safety checklists, and statutory permissions.',
    operationalDetails: [
      'Download the program-specific Teacher Preparation Guide and Student Field Sheets',
      'Secure written guardian/parent consent forms and institutional travel approval',
      'Confirm statutory entry permits with J&K Wildlife Protection Department or Forest Division if entering protected reserves',
      'Inspect and calibrate field equipment kits (thermometers, Secchi disks, pH meters, notebooks)'
    ],
    deliverable: 'Signed Trip Safety Plan, Equipment Checklist & Student Roster',
    platformAction: 'Download Curriculum & Teacher Guides',
    platformRoute: '/environmental-calendar/outdoor-classroom/curriculum'
  },
  {
    step: 4,
    id: 'conduct-study-tour',
    title: 'Conduct Empirical Study Tour',
    actor: 'Students, Faculty Mentor & Field Rangers',
    summary: 'Students visit the adopted field site, execute standardized scientific observations, conduct diagnostics, and interview community elders.',
    operationalDetails: [
      'Perform on-site habitat orientation and silent observation period (10 minutes)',
      'Execute standardized sampling transects according to curriculum protocol',
      'Collect in-situ water/soil measurements and record GPS waypoints',
      'Conduct the Intergenerational Stewardship interview with a local resident or elder'
    ],
    deliverable: 'Completed Physical Field Sheets, Photo Evidence & Elder Oral Audio Log',
    platformAction: 'View Fieldwork Protocols',
    platformRoute: '/environmental-calendar/outdoor-classroom/field-learning-programs'
  },
  {
    step: 5,
    id: 'submit-scientific-data',
    title: 'Submit Supervised Scientific Data',
    actor: 'Student Teams & Eco-Club Lead',
    summary: 'Students transcribe and upload field measurements into the supervised EcoWatch Outdoor Classroom telemetry portal.',
    operationalDetails: [
      'Input numerical measurements (temperature, pH, transparency, tree girth, bird counts)',
      'Upload geotagged photographic vouchers of species and habitat features',
      'Submit the intergenerational oral history documentation summary',
      'Student identities are masked under secure anonymized student IDs (e.g. STU-KUP-019)'
    ],
    deliverable: 'Provisional Field Observation Submission Record',
    platformAction: 'Submit Field Observation',
    platformRoute: '/environmental-calendar/outdoor-classroom/student-observations'
  },
  {
    step: 6,
    id: 'review-and-assessment',
    title: 'Teacher Review & Internal Assessment',
    actor: 'Designated School Faculty Mentor',
    summary: 'The supervising teacher audits student submissions for mathematical plausibility, scientific protocol adherence, and academic grading.',
    operationalDetails: [
      'Teacher logs into the institutional verification console',
      'Verifies calibration bounds (flags impossible pH or temperature outliers)',
      'Grades student field analysis against curriculum rubrics',
      'Approves valid student records for forwarding to EcoWatch scientific team'
    ],
    deliverable: 'Teacher-Approved Institutional Submission Batch',
    platformAction: 'View Assessment Guidelines',
    platformRoute: '/environmental-calendar/outdoor-classroom/curriculum'
  },
  {
    step: 7,
    id: 'scientific-verification',
    title: 'EcoWatch Scientific Verification & GIS Integration',
    actor: 'Kashmir EcoWatch Research Board & Data Scientists',
    summary: 'EcoWatch scientists review data quality, cross-reference against satellite indicators, and integrate approved observations into public platform layers.',
    operationalDetails: [
      'Automated range checking and spatial consistency verification against satellite rasters',
      'Expert biologist/hydrologist sign-off on rare species sightings or anomalous water readings',
      'Upgrading data tier from "Student Provisional" to "EcoWatch Verified Open Data"',
      'Dataset published with attribution to the school eco-club with a citable DOI/identifier'
    ],
    deliverable: 'Verified Public Field Record & Institutional EcoWatch Attribution',
    platformAction: 'Inspect Ecosystem Monitoring Feed',
    platformRoute: '/environmental-calendar/outdoor-classroom/ecosystem-monitoring-dashboard'
  },
  {
    step: 8,
    id: 'recognition-and-certificates',
    title: 'Recognition, Certificates & Annual Reporting',
    actor: 'Students, School Administration & Kashmir EcoWatch',
    summary: 'Students and institutions earn verified digital competency certificates, advance on the school stewardship leaderboard, and feature in the annual report.',
    operationalDetails: [
      'Issuance of cryptographically verifiable Digital Field Science Certificates for participating students',
      'Eco-Club earns points on the Kashmir School Environmental Stewardship Leaderboard',
      'Outstanding student projects invited to present at the annual Kashmir EcoWatch Youth Conclave',
      'Institutional contributions featured in the Annual Western Himalayan Environmental Education Report'
    ],
    deliverable: 'Verifiable Digital Certificates & Annual Report Recognition',
    platformAction: 'Verify Student Certificates',
    platformRoute: '/environmental-calendar/outdoor-classroom/certificates'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 3. EIGHT COMPREHENSIVE FIELD-LEARNING PROGRAMS
// ─────────────────────────────────────────────────────────────────────────────

export const FIELD_LEARNING_PROGRAMS: FieldLearningProgram[] = [
  {
    id: 'wetland-ecology',
    title: 'Wetland Ecology & Waterbird Science',
    subtitle: 'Ramsar Sponges, Migratory Waterfowl Censuses & Aquatic Infilling Dynamics',
    category: 'Wetlands',
    accentColor: 'text-cyan-400',
    gradient: 'from-cyan-500 to-blue-600',
    iconName: 'Waves',
    leadEcosystem: 'Freshwater Marshes & Ramsar Wetland Complexes',
    typicalDestinations: [
      'Hokersar Wetland Reserve (Srinagar / Budgam)',
      'Wular Lake Marginal Marshes & Delta (Bandipora)',
      'Shallabugh Wetland Bird Sanctuary (Ganderbal)',
      'Haigam Wetland Reserve (Baramulla)'
    ],
    suggestedDuration: 'Half Day (4–5 hours on site)',
    curriculumObjectives: {
      foundation: [
        'Understand why wetlands are the "kidneys of the Kashmir Valley"',
        'Identify 10 common migratory waterfowl species using field silhouettes',
        'Sketch wetland zonation: open water, floating leaf, reedbeds, and shoreline willow'
      ],
      intermediate: [
        'Measure water transparency using a standard 20cm Secchi disk',
        'Record water temperature and pH at 3 points along a marsh inlet-to-interior transect',
        'Quantify human disturbance indicators (floating plastic density, cattle grazing tracks)'
      ],
      advanced: [
        'Determine dissolved oxygen levels and estimate aquatic biological health',
        'Map the spatial encroachment of invasive reedbeds (*Phragmites australis*) using GPS waypoints',
        'Calculate waterfowl flock density using block-counting census methodology'
      ],
      undergraduate: [
        'Calculate Simpson\'s Diversity Index for wintering avian guilds',
        'Compare student water chemistry with historical baseline records from 2002 ESRO censuses',
        'Assess hydrological connectivity of the wetland with Jhelum flood spill channels'
      ]
    },
    fieldActivities: [
      'Fixed-radius point count of wintering waterbirds from designated watchtowers',
      'Water clarity and depth profiling using Secchi disk and sounding tape',
      'Emergent aquatic macrophyte quadrat sampling (1m × 1m)',
      'Documentation of inlet channels carrying domestic untreated greywater'
    ],
    laboratoryDiagnostics: [
      'In-situ pH determination using calibrated digital probe',
      'Dissolved Oxygen (DO) chemical test using modified azide-Winkler or digital luminescent sensor',
      'Microscopic wet-mount inspection of pond water for phytoplankton and rotifers',
      'Sediment settling test to measure suspended silt load'
    ],
    equipmentChecklist: [
      'Binoculars (8x42 or 10x42) and spotting scope with tripod',
      'Secchi disk (20cm black-and-white) with calibrated retrieval cord',
      'Digital pH & TDS pen with calibration buffer solutions',
      'Water sampling bottles (500ml acid-washed polyethylene)',
      'Kashmir Waterfowl Field Identification Guide sheets',
      'High-visibility safety vests and rubber gumboots'
    ],
    safetyAndPermits: {
      statutoryPermits: [
        'Prior written entry clearance from Wildlife Warden (Wetlands Division, J&K)',
        'Mandatory student roster submission at entry checkpost'
      ],
      safetyProtocols: [
        'Students must stay strictly on bunds, wooden walkways, or designated watchtowers',
        'No student is permitted to enter marsh water or soft mudflats',
        'Buddy system strictly enforced (pairs assigned for all observations)',
        'First aid kit equipped for cold-weather exposure, slips, and insect stings'
      ],
      leaveNoTraceRules: [
        'Total silence maintained during bird counts; no shouting or whistling',
        'No use of laser pointers, flash photography, or acoustic playback tapes',
        'Zero waste left behind: all plastic wrappers and waste returned to school'
      ]
    },
    intergenerationalStewardship: {
      communityDialoguePrompt: 'Interview a local elder living near the wetland margin about seasonal water levels, fish species, and winter waterfowl numbers over the past 40 years.',
      oralHistoryQuestions: [
        'How far did the open water extend when you were a child compared to where the bunds are today?',
        'Which migratory ducks or waterbirds were abundant in your youth that are rarely seen today?',
        'Did the community traditionally harvest water chestnuts (*Gaer*) or lotus roots (*Nadru*) here, and how has that harvest changed?'
      ],
      traditionalKnowledgeComparison: 'Compare elder memories of winter water depth with current bathymetric data indicating progressive shallowing due to upstream siltation.'
    },
    measurableOutcomes: [
      'Geotagged avian count record contributed to EcoWatch Migratory Waterbird telemetry',
      '3-point water quality profile logged into the school\'s adopted ecosystem dataset',
      'Student individual field worksheet graded and archived in school portfolio'
    ],
    linkedCalendarObservance: 'world-wetlands-day',
    linkedEcoWatchRoute: '/water-systems/wetlands',
    gisLayerId: 'layer-wetlands-ramsar'
  },
  {
    id: 'forest-biodiversity',
    title: 'Forest Biodiversity & Himalayan Silviculture',
    subtitle: 'Coniferous Canopies, Basal Area Transects & Endemic Ungulate Habitats',
    category: 'Forests',
    accentColor: 'text-emerald-400',
    gradient: 'from-emerald-500 to-teal-600',
    iconName: 'Trees',
    leadEcosystem: 'Temperate Coniferous & Subalpine Mixed Forests',
    typicalDestinations: [
      'Dachigam National Park - Lower Riverine Belt (Srinagar)',
      'Overa-Aru Wildlife Sanctuary (Anantnag)',
      'Gulmarg Biosphere Reserve (Baramulla)',
      'Shankaracharya Reserve Forest (Srinagar)'
    ],
    suggestedDuration: 'Full Day (5–6 hours on site)',
    curriculumObjectives: {
      foundation: [
        'Identify Kashmir\'s "Big Four" conifer species: Deodar (*Cedrus deodara*), Blue Pine / *Kail* (*Pinus wallichiana*), Silver Fir / *Budlu* (*Abies pindrow*), and Himalayan Spruce (*Picea smithiana*)',
        'Understand tree crown stratification: canopy, subcanopy, shrub layer, and forest floor',
        'Document signs of wildlife (hoof prints, hair on bark, bird nests, feeding marks)'
      ],
      intermediate: [
        'Calculate tree Diameter at Breast Height (DBH at 1.37m) using a standard forestry tape',
        'Estimate canopy closure percentage using a homemade cardboard densiometer',
        'Record tree health indicators (mistletoe parasitic loads, crown dieback, bark stripping)'
      ],
      advanced: [
        'Establish a 20m × 20m forestry sampling quadrat and calculate total basal area per hectare',
        'Assess natural regeneration by counting tree seedlings (<1m height) and saplings',
        'Map signs of anthropogenic edge effects (lopping scars, foot trail erosion, firewood gathering)'
      ],
      undergraduate: [
        'Quantify aboveground woody biomass and estimate carbon storage per hectare',
        'Evaluate hangul (*Cervus hanglu hanglu*) winter browsing pressure on deciduous shrubs',
        'Correlate forest structural complexity with avian species richness'
      ]
    },
    fieldActivities: [
      '20m × 20m permanent forest study plot layout with biodegradable boundary cord',
      'Trunk diameter and tree height estimation using clinometer or trigonometric stick methods',
      'Deadwood and fallen log volume inventory (habitat for saproxylic beetles and fungi)',
      'Hangul and Himalayan black bear habitat forage inventory'
    ],
    laboratoryDiagnostics: [
      'Forest leaf litter moisture content and organic soil layer thickness measurement',
      'Soil pH determination across coniferous needle vs. broadleaf deciduous forest floors',
      'Microscopic analysis of fungal mycorrhizal root associations',
      'Tree ring cross-section counting from fallen timber to study historical growth spurts'
    ],
    equipmentChecklist: [
      'Diameter tape (calibrated in cm/pi) and standard 30m surveyor tape',
      'Cardboard densiometers or mirror sighting tools for canopy cover',
      'Hand lenses (10x magnification) for lichen and bark inspection',
      'Clinometer or measuring stick for tree height calculation',
      'Dachigam Forest Flora identification laminates',
      'Sturdy hiking boots and walking stick'
    ],
    safetyAndPermits: {
      statutoryPermits: [
        'Formal research/educational entry permit from Department of Wildlife Protection J&K',
        'Compulsory forest guide / wildlife guard accompaniment inside Dachigam and Overa-Aru'
      ],
      safetyProtocols: [
        'Strict group cohesion: no student may wander off marked forestry trails',
        'Bear awareness protocol: group maintains vocal chatter; food packed in airtight containers',
        'Leech and tick inspection checklist after exiting moist riverine woods',
        'Emergency whistle carried by every team leader'
      ],
      leaveNoTraceRules: [
        'No carving initials into tree trunks or peeling birch (*Bhojpatra*) bark',
        'No picking of wild orchids, medicinal herbs, or disturbance of hollow logs',
        'Step on rocks and designated path to minimize soil compaction and erosion'
      ]
    },
    intergenerationalStewardship: {
      communityDialoguePrompt: 'Engage a forest fringe village elder regarding historical changes in timber availability, non-timber forest products (*Gucchi*, *Kuth*), and carnivore sightings.',
      oralHistoryQuestions: [
        'Has the forest boundary moved further up the mountain compared to your childhood?',
        'Which medicinal plants were commonly collected in the forest understory that are now scarce?',
        'How did traditional pastoralists (*Gujjars* and *Bakerwals*) practice seasonal rotational grazing without degrading the forest?'
      ],
      traditionalKnowledgeComparison: 'Contrast traditional community firewood gathering limits with current satellite data on forest canopy fragmentation.'
    },
    measurableOutcomes: [
      'Standardized forest quadrat dataset entered into the EcoWatch Forest Observatories portal',
      'Basal area and carbon estimate calculated for the school\'s adopted forest stand',
      'Herbarium photographic dossier submitted for student assessment'
    ],
    linkedCalendarObservance: 'world-forestry-day',
    linkedEcoWatchRoute: '/protected-network',
    gisLayerId: 'layer-forest-canopy'
  },
  {
    id: 'river-spring-science',
    title: 'River Corridors & Karst Springshed Hydrology',
    subtitle: 'Stream Velocity, Karst Spring Discharges & Benthic Bioindicator Indexes',
    category: 'Water',
    accentColor: 'text-blue-400',
    gradient: 'from-blue-500 to-indigo-600',
    iconName: 'Droplets',
    leadEcosystem: 'Montane Rivers, Karewa Springs & Fluvial Corridors',
    typicalDestinations: [
      'Lidder River Hydrological Transect - Pahalgam (Anantnag)',
      'Sind River Riparian Transect - Wayil / Kangan (Ganderbal)',
      'Verinag & Achabal Historical Karst Springs (Anantnag)',
      'Doodhganga Stream & Chadoora Springshed (Budgam)'
    ],
    suggestedDuration: 'Half Day (4–5 hours on site)',
    curriculumObjectives: {
      foundation: [
        'Trace the source-to-sink journey of Kashmir rivers from snowfields to the Jhelum',
        'Differentiate artesian and gravity springs (*Nag*) in the Karewa formation',
        'Observe how fast-flowing water creates distinct habitats: pools, riffles, and runs'
      ],
      intermediate: [
        'Measure stream width and cross-sectional depth profile at 0.5m intervals',
        'Calculate surface water velocity using float method with a timing stopwatch',
        'Measure water temperature, conductivity, and dissolved solids across spring headwaters vs downstream'
      ],
      advanced: [
        'Compute total stream volumetric discharge in cubic meters per second (cumecs / m³/s)',
        'Sample benthic macroinvertebrates and calculate the Family Biotic Index (FBI)',
        'Identify riverbed gravel extraction scars and evaluate bank erosion susceptibility'
      ],
      undergraduate: [
        'Delineate the recharge springshed boundary using topographic maps and geological dip',
        'Analyze chemical facies of karst groundwater (calcium bicarbonate dominance)',
        'Model the ecological flow requirements (e-flows) needed to sustain native snow trout (*Schizothorax*)'
      ]
    },
    fieldActivities: [
      'Wetted width and depth profiling using surveyor tape and calibrated wading rod',
      'Velocity-area discharge measurement using neutral-buoyancy floats across 3 trials',
      'Kick-net sampling of benthic cobblestones for stonefly, mayfly, and caddisfly nymphs',
      'Springhead discharge timing using v-notch weir or calibrated volumetric bucket method'
    ],
    laboratoryDiagnostics: [
      'Turbidity testing using calibrated portable nephelometer (NTU)',
      'Water hardness (Total, Calcium, Magnesium) using EDTA titration kits',
      'Nitrate and phosphate colorimetric analysis to detect agricultural and domestic fertilizer runoff',
      'Microscopic identification of benthic algae (diatoms) as indicators of nutrient enrichment'
    ],
    equipmentChecklist: [
      'Surveyor 30m fiberglass measuring tape and rigid depth wading rod',
      'Digital stopwatch and 5 neutral-buoyancy floats (oranges or rubber balls)',
      'Benthic kick-net with 500-micron mesh and white sorting sorting trays',
      'Magnifying hand lenses, soft forceps, and macroinvertebrate identification keys',
      'Digital water thermometer and multiparameter pH/TDS/EC probe',
      'Rubber waders with safety harness lines'
    ],
    safetyAndPermits: {
      statutoryPermits: [
        'Local administrative intimation and Irrigation & Flood Control Department notification',
        'No entry into torrential snowmelt rivers during high-water spring freshets'
      ],
      safetyProtocols: [
        'Strict "No Wading" rule unless secured with safety harness in shallow (<0.4m) slow riffles',
        'Never conduct river fieldwork during rainfall or flash-flood advisory warnings',
        'Students must wear certified life-jackets whenever operating within 3 meters of deep river banks',
        'Riverbank watcher stationed upstream to alert for unexpected water surges'
      ],
      leaveNoTraceRules: [
        'All overturned river stones must be gently replaced in their original orientation',
        'Live macroinvertebrates must be returned to the stream after sorting and identification',
        'No washing of hands, soap, or equipment directly into natural springheads'
      ]
    },
    intergenerationalStewardship: {
      communityDialoguePrompt: 'Interview a community water master (*Mirab*) or village elder regarding historical spring discharges, stream purity, and fish migration.',
      oralHistoryQuestions: [
        'Did this spring ever dry up during summer droughts 30 years ago?',
        'When did you first notice plastic waste or sand mining excavators appearing along this riverbed?',
        'Which indigenous fish (*Kashir Gaad*) used to swim up this tributary to spawn in springtime?'
      ],
      traditionalKnowledgeComparison: 'Contrast elder accounts of perennial spring abundance with current flume data showing 40% discharge attenuation in Karewa springs.'
    },
    measurableOutcomes: [
      'Calculated stream discharge (m³/s) submitted to the EcoWatch Water Systems intelligence database',
      'Macroinvertebrate biotic health score archived for the adopted river station',
      'Student group hydrological balance sheet graded and certified'
    ],
    linkedCalendarObservance: 'world-water-day',
    linkedEcoWatchRoute: '/water-systems/rivers',
    gisLayerId: 'layer-river-corridors'
  },
  {
    id: 'glacier-climate-education',
    title: 'Glacier Downwasting & Himalayan Cryosphere Change',
    subtitle: 'Snout Retreat Differencing, Supraglacial Debris & Snowline Monitoring',
    category: 'Cryosphere',
    accentColor: 'text-sky-400',
    gradient: 'from-sky-500 to-cyan-600',
    iconName: 'Mountain',
    leadEcosystem: 'Alpine Cryosphere, Cirque Glaciers & Proglacial Moraines',
    typicalDestinations: [
      'Thajiwas Glacier Foreland & Moraines - Sonamarg (Ganderbal)',
      'Lidderwart to Kolahoi Glacier Basecamp (Anantnag - Advanced / College only)',
      'Apharwat Alpine Snowfields & Cryosphere Station - Gulmarg (Baramulla)'
    ],
    suggestedDuration: 'Full Day (High altitude study tour)',
    curriculumObjectives: {
      foundation: [
        'Understand what a glacier is and how snow turns into dense blue firn and glacial ice',
        'Distinguish glacier terminus (snout), lateral moraines, terminal moraines, and meltwater streams',
        'Recognize the role of glaciers as "The Water Towers of Kashmir"'
      ],
      intermediate: [
        'Trace historical terminal moraine positions using archival photographs from 1980 vs present',
        'Measure temperature gradient between glacier ice surface, moraine soil, and open air',
        'Identify black carbon and dust deposits on seasonal snowbanks'
      ],
      advanced: [
        'Differentiate between 2D terminus snout retreat (m/yr) and 3D geodetic mass balance downwasting (m w.e./yr)',
        'Quantify supraglacial debris cover percentage and analyze its insulation vs melting impact',
        'Analyze Landsat and Sentinel-2 satellite differencing maps of Kolahoi snout retreat'
      ],
      undergraduate: [
        'Calculate equilibrium line altitude (ELA) shifts over the 1990–2026 satellite record',
        'Evaluate Glacial Lake Outburst Flood (GLOF) susceptibility of proglacial moraine dams',
        'Quantify snow water equivalent (SWE) and correlate with spring streamflow in downstream valleys'
      ]
    },
    fieldActivities: [
      'Moraine ridge walk tracing past glacier extent milestones documented in archival surveys',
      'Surface temperature transect across white snow, dirty debris-covered ice, and exposed rock',
      'Proglacial meltwater turbidity and electrical conductivity profiling',
      'Comparative landscape photography matching historical 1960–1980 photographic viewpoints'
    ],
    laboratoryDiagnostics: [
      'Meltwater suspended sediment filtration and weighing (glacial flour)',
      'Spectral albedo estimation using digital camera RAW brightness differencing',
      'Satellite image differencing in the school computer lab using QGIS / EcoWatch Atlas',
      'Glacier ice crystal structure photography using hand-held polarizing filters'
    ],
    equipmentChecklist: [
      'Handheld infrared surface thermometer and digital ambient temperature sensors',
      'High-resolution archival printouts of glacier snouts from 1980, 2000, 2015, and 2026',
      'Altimeter / Barometer watch and handheld satellite GPS unit',
      'Field binoculars, UV-blocking sunglasses, and thermal windproof jackets',
      'Heavy-traction hiking boots with ankle support (ice cleats/crampons for guided college tiers)'
    ],
    safetyAndPermits: {
      statutoryPermits: [
        'Clearance from District Disaster Management Authority (DDMA) and Tourism/Forest authorities',
        'Registration with local Mountain Rescue / Police outpost before ascending alpine valleys'
      ],
      safetyProtocols: [
        'Students are strictly forbidden from walking on active glacier ice, crevasses, or ice caves',
        'Fieldwork conducted exclusively in stable proglacial forelands and certified moraine viewpoints',
        'Emergency descent protocol in the event of sudden cloudburst, whiteout, or temperature drops',
        'High-altitude hydration and altitude sickness (AMS) monitoring by certified medical staff'
      ],
      leaveNoTraceRules: [
        'No leaving plastic wrappers, fruit peels, or beverage cans in alpine environments',
        'No disturbing high-altitude fragile cushion plants (*Saxifraga*, *Androsace*) on moraines',
        'All equipment and bio-waste must be packed down to the valley base station'
      ]
    },
    intergenerationalStewardship: {
      communityDialoguePrompt: 'Interview a senior pony-handler, shepherd, or alpine guide regarding the historical position of the glacier snout when they first guided visitors.',
      oralHistoryQuestions: [
        'Where was the glacier snout located 40 years ago relative to the bridge or landmark rocks today?',
        'In your youth, did the snow in this valley remain throughout the summer, or did it melt early?',
        'Have you noticed changes in the color of the ice or the amount of rock and dirt covering it?'
      ],
      traditionalKnowledgeComparison: 'Correlate guide testimony of 300+ meters of snout retreat with ISRO and GLIMS satellite terminus measurements.'
    },
    measurableOutcomes: [
      'Terminus position waypoint verified and submitted to the EcoWatch Cryosphere Observatory',
      'Repeat-photography photo pair uploaded for public educational change atlas',
      'Student glacier recession analysis report graded and certified'
    ],
    linkedCalendarObservance: 'climate-action-day',
    linkedEcoWatchRoute: '/earth-human-impact/aquatic-cryosphere/glacier-recession',
    gisLayerId: 'layer-glacier-snout'
  },
  {
    id: 'agricultural-ecology',
    title: 'Agricultural Agroecosystems & Soil Health',
    subtitle: 'Paddy-to-Orchard Conversion, Saffron Karewas & Agrochemical Runoff',
    category: 'Agriculture',
    accentColor: 'text-lime-400',
    gradient: 'from-lime-500 to-emerald-600',
    iconName: 'Leaf',
    leadEcosystem: 'Irrigated Paddy Basins, Karewa Saffron Fields & High-Density Orchards',
    typicalDestinations: [
      'Pampore Saffron Heritage Karewa Plateau (Pulwama)',
      'Shopian High-Density Apple Orchard Belt (Shopian)',
      'Kulgam Rice Basin & Traditional Canal Networks (Kulgam)',
      'Budgam Terraced Agroecosystem & Karewa Slopes (Budgam)'
    ],
    suggestedDuration: 'Half Day (4 hours on site)',
    curriculumObjectives: {
      foundation: [
        'Understand Kashmir\'s agricultural seasons: *Kharif* (summer rice) and *Rabi* (winter mustard/wheat)',
        'Examine how saffron (*Crocus sativus*) corms survive in well-drained Karewa lacustrine soils',
        'Identify 5 traditional weeds and wild herbs growing on paddy bunds (*Waat*)'
      ],
      intermediate: [
        'Conduct soil texture "ribbon tests" and distinguish Karewa loams from floodplain alluvium',
        'Measure soil pH and electrical conductivity using portable field meters',
        'Interview farmers regarding pesticide spray schedules (mancozeb, captan, hexaconazole)'
      ],
      advanced: [
        'Perform NPK chemical testing (Nitrogen, Phosphorus, Potassium) using field test tablets',
        'Calculate the economic and hydrological tradeoff of converting paddy fields into apple orchards',
        'Audit agricultural drainage water entering local streams for chemical fertilizer residue'
      ],
      undergraduate: [
        'Quantify soil organic matter (SOM) depletion in high-density pesticide-drenched soils',
        'Analyze satellite phenological NDVI curves across rice vs apple land-use parcels',
        'Evaluate groundwater table depth beneath Karewa apple orchards undergoing tubewell extraction'
      ]
    },
    fieldActivities: [
      'Soil coring to 20cm depth and soil profile horizon description',
      'Soil nutrient rapid testing using reagent tablets and color comparison charts',
      'Orchard irrigation method survey (drip irrigation vs flood irrigation vs rainfed)',
      'Paddy field biodiversity inventory (frogs, dragonflies, water beetles, earthworms)'
    ],
    laboratoryDiagnostics: [
      'Soil bulk density and water-holding capacity determination',
      'Soil pH and salinity (electrical conductivity) measurement in 1:2.5 soil-water slurry',
      'Nitrate-nitrogen colorimetry to check for over-fertilization',
      'Microscopic earthworm and nematode presence enumeration per soil core volume'
    ],
    equipmentChecklist: [
      'Stainless steel soil corer or auger with depth markings',
      'Soil testing kit (pH, N, P, K reagents, test tubes, and color comparison cards)',
      'Field balance (0.1g accuracy) and specimen collection tins',
      'Magnifying loupes, tweezers, and sorting trays for soil macrofauna',
      'Farmer interview questionnaire clipboard and recording device'
    ],
    safetyAndPermits: {
      statutoryPermits: [
        'Farmer permission and village Panchayat intimation before entering private fields',
        'No entry into commercial orchards during active chemical pesticide spraying operations'
      ],
      safetyProtocols: [
        'Students must wear chemical-resistant nitrile gloves when handling soil samples',
        'Never conduct soil sampling in orchards sprayed within the last 72 hours (re-entry interval)',
        'Hands must be thoroughly washed with soap and water after field soil activities',
        'Watch for irrigation ditches, barbed wire fences, and honeybee apiaries'
      ],
      leaveNoTraceRules: [
        'All soil core holes must be backfilled to prevent tripping hazards for livestock',
        'No walking across delicate saffron germination beds or trampling paddy shoots',
        'No discarded reagent ampoules or packaging left behind'
      ]
    },
    intergenerationalStewardship: {
      communityDialoguePrompt: 'Interview a multi-generational farmer about shifts from traditional organic manure (*Puh*) to synthetic urea and the spread of apple orchards.',
      oralHistoryQuestions: [
        'How many pesticide sprays did apple trees need when you were young compared to the 10–12 sprays used today?',
        'What crops were grown on this Karewa plateau before commercial apple orchards expanded?',
        'Have you noticed changes in the number of honeybees, earthworms, or frogs in the fields?'
      ],
      traditionalKnowledgeComparison: 'Contrast traditional knowledge of organic fertility with modern laboratory measurements showing declining soil organic carbon in monoculture orchards.'
    },
    measurableOutcomes: [
      'Soil health scorecard submitted to the EcoWatch Agriculture Sectoral Observatory',
      'Farmer agrochemical usage survey logged into community database',
      'Student agricultural sustainability dossier graded and archived'
    ],
    linkedCalendarObservance: 'desertification-drought-day',
    linkedEcoWatchRoute: '/sectoral-eia/sectors/agriculture',
    gisLayerId: 'layer-agri-landuse'
  },
  {
    id: 'urban-environmental-science',
    title: 'Urban Ecology, Air Quality & Civic Metabolism',
    subtitle: 'PM2.5 Sensor Transects, Urban Heat Islands & Municipal Solid Waste Audits',
    category: 'Urban',
    accentColor: 'text-amber-400',
    gradient: 'from-amber-500 to-orange-600',
    iconName: 'Building2',
    leadEcosystem: 'Historic Urban Srinagar, Cantonments & Rapid Growth Corridors',
    typicalDestinations: [
      'Old City Srinagar Heritage Corridor & Dal Inlets (Srinagar)',
      'Achan Landfill & Waste Processing Perimeter (Saidapora, Srinagar)',
      'Zero Bridge to Rajbagh Jhelum Embankment Urban Transect (Srinagar)',
      'Suburban Highway Ribbon Expansion Corridor - Pantha Chowk (Srinagar / Pulwama)'
    ],
    suggestedDuration: 'Half Day (3–4 hours on site)',
    curriculumObjectives: {
      foundation: [
        'Identify main sources of urban air pollution in Kashmir (winter biomass burning, vehicular exhaust, brick kilns)',
        'Distinguish biodegradable organic waste from non-biodegradable polythene and plastic packaging',
        'Observe how urban trees (Chinars, poplars) provide cooling shade compared to asphalt streets'
      ],
      intermediate: [
        'Measure real-time particulate matter (PM2.5 and PM10) using portable optical particle counters',
        'Conduct a 100m roadside litter brand audit: classify plastics into PET, HDPE, LDPE, and multi-laminate',
        'Record surface temperatures across asphalt, concrete, bare soil, and grassy lawns'
      ],
      advanced: [
        'Map Urban Heat Island (UHI) temperature differentials between dense downtown and forested Shankaracharya',
        'Analyze winter temperature inversions trapping smoke in the bowl of the Kashmir Valley',
        'Calculate per-capita daily solid waste generation for the school campus and design a zero-waste plan'
      ],
      undergraduate: [
        'Correlate diurnal PM2.5 concentrations with traffic density at major roundabout bottlenecks',
        'Perform leachate risk assessment around municipal waste transfer sites',
        'Evaluate municipal compliance with Solid Waste Management Rules 2016'
      ]
    },
    fieldActivities: [
      'Walking air quality transect with portable PM2.5 / PM10 air sensor linked to mobile GPS',
      'Surface temperature logging using infrared thermometers on asphalt vs. brick vs. grass',
      'Campus and community solid waste characterization audit (weighing and segregating waste)',
      'Urban Chinar tree canopy coverage estimation and bird nesting survey'
    ],
    laboratoryDiagnostics: [
      'Gravimetric particulate matter collection using personal air samplers and filter paper weighing',
      'Microscopic inspection of captured particulate matter (soot flakes vs. mineral dust vs. pollen)',
      'Water runoff testing from road surfaces: pH, turbidity, and oil/grease sheen estimation',
      'Composting efficiency monitoring: temperature curve and carbon-to-nitrogen ratio'
    ],
    equipmentChecklist: [
      'Portable optical particle counter (PM2.5 / PM10 / AQI) with USB datalogger',
      'Infrared non-contact surface thermometer gun',
      'Digital luggage scale (50kg capacity) and heavy-duty weighing tarpaulins',
      'Protective puncture-resistant safety gloves and N95 particulate respirators',
      'Clipboards with standardized Urban Environmental Audit forms'
    ],
    safetyAndPermits: {
      statutoryPermits: [
        'School administration safety plan approval and traffic police intimation for roadside transects',
        'Srinagar Municipal Corporation permission if visiting municipal waste facilities'
      ],
      safetyProtocols: [
        'Students must wear high-visibility fluorescent vests on all urban roadside walks',
        'Walk on footpaths only; cross roads strictly at zebra crossings with educator crossing guards',
        'N95 masks must be worn during air pollution monitoring near heavy traffic or landfill perimeters',
        'No student may directly handle medical waste, sharp broken glass, or chemical containers'
      ],
      leaveNoTraceRules: [
        'All audited waste must be properly segregated and disposed of in municipal recycling bins',
        'Lead by example: students must carry reusable cloth bags and personal metal water flasks'
      ]
    },
    intergenerationalStewardship: {
      communityDialoguePrompt: 'Interview an elderly shopkeeper or resident in Downtown Srinagar about historical waste practices, winter heating (*Kangri* vs charcoal), and clean canal water.',
      oralHistoryQuestions: [
        'How was household kitchen waste managed before plastic packaging existed in Srinagar?',
        'Could people drink or wash in the Nallah Mar canal before it was filled in and paved over as a road?',
        'Has winter smog and air haze gotten worse compared to 30 years ago, and how has heating changed?'
      ],
      traditionalKnowledgeComparison: 'Contrast traditional clay Kangri and charcoal use with modern diesel generators and vehicular emissions as drivers of winter PM2.5 spikes.'
    },
    measurableOutcomes: [
      'Real-time PM2.5 spatial transect uploaded to the EcoWatch Urban Ecology observatory',
      'School campus waste audit report with actionable diversion targets presented to the Principal',
      'Urban tree canopy map submitted for institutional certificate qualification'
    ],
    linkedCalendarObservance: 'world-environment-day',
    linkedEcoWatchRoute: '/earth-human-impact/urban-ecology',
    gisLayerId: 'layer-urban-air-heat'
  },
  {
    id: 'geological-heritage',
    title: 'Karewa Geomorphology & Himalayan Earth Systems',
    subtitle: 'Lacustrine Sediments, Tectonic Uplift, Fossils & Brick Kiln Excavation Scars',
    category: 'Geology',
    accentColor: 'text-purple-400',
    gradient: 'from-purple-500 to-indigo-600',
    iconName: 'Mountain',
    leadEcosystem: 'Plio-Pleistocene Karewa Tablelands, Gorge Incisions & Fault Scarps',
    typicalDestinations: [
      'Chadoora & Nagam Karewa Escarpments (Budgam)',
      'Pampore & Sambora Lacustrine Clay Profiles (Pulwama)',
      'Khan Sahib Gorge Incision & Tectonic Terraces (Budgam)',
      'Verinag Fault Line & Limestone Karst Fissures (Anantnag)'
    ],
    suggestedDuration: 'Half Day (4–5 hours on site)',
    curriculumObjectives: {
      foundation: [
        'Understand that Kashmir was once a colossal ancient lake (*Karewa Lake*) millions of years ago',
        'Observe distinct geological layers: lacustrine clay, fine silt, coarse sand, and dark lignite bands',
        'Learn why Karewa soils are uniquely vulnerable to rainfall gully erosion when cleared of vegetation'
      ],
      intermediate: [
        'Measure layer thickness of a geological exposure using surveyor tape and compass-clinometer',
        'Distinguish Upper Karewa (aeolian loess) from Lower Karewa (lacustrine laminated muds)',
        'Identify trace fossils, ancient plant impressions, and freshwater gastropod shells in clay beds'
      ],
      advanced: [
        'Calculate strike and dip of tilted Karewa beds to infer Pir Panjal tectonic uplift velocity',
        'Quantify soil loss from unmanaged earth-cutting operations for highway and railway embankments',
        'Assess landslide vulnerability along steep Karewa scarps using slope-stability checklists'
      ],
      undergraduate: [
        'Interpret paleoclimatic shifts from magnetic susceptibility and carbon isotope profiles in loess-paleosols',
        'Calculate volumetric extraction of Karewa clay by unauthorized mechanized earth-movers',
        'Evaluate statutory compliance with J&K Land Revenue Act protections for Karewa landforms'
      ]
    },
    fieldActivities: [
      'Geological stratigraphic column logging: measuring and sketching vertical scarp layers',
      'Grain size sediment sorting and microscopic examination of sand quartz grains',
      'Fossil leaf impression documentation and non-destructive photography',
      'Mapping brick kiln clusters and earth extraction pits using GPS points and satellite rasters'
    ],
    laboratoryDiagnostics: [
      'Hydrochloric acid (10% HCl) effervescence test for calcium carbonate content',
      'Sediment settling velocity test (Stokes\' Law) to determine clay vs silt percentage',
      'Soil erodibility index (K-factor) calculation using organic matter and permeability',
      'Microscopic examination of diatomaceous earth (*diatomite*) within lacustrine clays'
    ],
    equipmentChecklist: [
      'Geologist\'s rock hammer and cold chisel (for supervised educator use only)',
      '10x magnifying hand lens and grain-size comparator cards',
      'Dilute 10% HCl dropper bottles for carbonate effervescence testing',
      'Brunton compass or Silva compass-clinometer for dip/strike measurement',
      'Safety goggles, hard hats for scarp bases, and heavy-duty specimen collection bags'
    ],
    safetyAndPermits: {
      statutoryPermits: [
        'Geological field study notification to local Revenue / Tehsildar authorities',
        'Strict avoidance of active commercial quarry faces or unauthorized extraction machinery'
      ],
      safetyProtocols: [
        'Hard hats mandatory for all students when standing near vertical clay scarps',
        'Maintain a 5-meter safety buffer from the base of overhangs with active rockfall risk',
        'No student is permitted to scramble up steep, loose scree slopes or unstable clay cliff tops',
        'Eye protection must be worn whenever geological rocks or core samples are being handled'
      ],
      leaveNoTraceRules: [
        'No wholesale excavation or destruction of fragile fossil-bearing lacustrine clay beds',
        'Take only photographs and leave rare scientific fossil impressions intact for researchers',
        'Pack out all sample bags and experimental materials'
      ]
    },
    intergenerationalStewardship: {
      communityDialoguePrompt: 'Interview a village elder regarding ancient legends of Satisar (the ancient lake of Kashmir), spring sacredness, and when brick kilns first arrived.',
      oralHistoryQuestions: [
        'What did your ancestors teach you about how the Kashmir Valley was formed from water?',
        'When did earth-moving bulldozers and clay extraction for highways start flattening this plateau?',
        'Did natural springs on this Karewa slope go dry after the surrounding clay hills were cut down?'
      ],
      traditionalKnowledgeComparison: 'Contrast the ancient Rajatarangini myth of Satisar drained by Rishi Kashyapa with modern geological proof of lacustrine Karewa drainage via the Baramulla gorge.'
    },
    measurableOutcomes: [
      'Stratigraphic scarp column sketched and uploaded to the EcoWatch Earth Systems archive',
      'GPS mapping of Karewa extraction scarps contributed to the Mining & Extraction observatory',
      'Student geological field report graded and archived'
    ],
    linkedCalendarObservance: 'world-heritage-day',
    linkedEcoWatchRoute: '/earth-human-impact/mining-extraction',
    gisLayerId: 'layer-karewa-geology'
  },
  {
    id: 'conservation-citizen-science',
    title: 'Conservation Field Telemetry & Community Bio-Blitz',
    subtitle: 'GPS Sightings, Red Data Book Species Audits & Participatory Monitoring Blitzes',
    category: 'Citizen Science',
    accentColor: 'text-teal-400',
    gradient: 'from-teal-500 to-emerald-600',
    iconName: 'Camera',
    leadEcosystem: 'Community Green Spaces, School Campuses & Buffer Sanctuaries',
    typicalDestinations: [
      'Campus Biodiversity Observatory (The School Grounds Itself)',
      'Naseem Bagh University Chinar Grove (Srinagar)',
      'Dachigam Buffer Forest Fringe (Harwan / Dara, Srinagar)',
      'Manasbal Lake Shoreline Botanical Walk (Ganderbal)'
    ],
    suggestedDuration: 'Half Day (3–4 hours on site)',
    curriculumObjectives: {
      foundation: [
        'Learn the ethics of non-intrusive wildlife observation: "Take only photos, leave only footprints"',
        'Use mobile applications or paper field sheets to record species name, count, date, time, and coordinates',
        'Identify 15 common resident birds, butterflies, and insects found within 500m of the school'
      ],
      intermediate: [
        'Conduct a 2-hour synchronous "Bio-Blitz": cataloging all living organisms in a defined polygon',
        'Classify observed flora and fauna into IUCN Red List and J&K Wildlife Protection Act schedules',
        'Learn how photographic vouchers provide verifiable empirical proof for citizen science'
      ],
      advanced: [
        'Establish automated camera trap stations (supervised by wildlife mentors) to document nocturnal fauna',
        'Analyze acoustic recordings of bird calls using digital bioacoustics tools',
        'Validate peer student sightings and filter false positives before submitting to EcoWatch'
      ],
      undergraduate: [
        'Compute species accumulation curves to determine sampling completeness',
        'Model the ecological corridor connectivity between school campus green patches and wild forests',
        'Co-author public species checklists and conservation status dossiers for the district'
      ]
    },
    fieldActivities: [
      'Synchronous 2-hour institutional Bio-Blitz across 4 student teams (Birds, Botany, Insects, Herpetofauna)',
      'Geotagged macro-photography of wild flora, fungi, and invertebrates',
      'Auditing camera trap imagery (if deployed under wildlife warden supervision)',
      'Cataloging invasive alien flora (*Lantana*, *Parthenium*, *Leucanthemum*) on campus margins'
    ],
    laboratoryDiagnostics: [
      'Dichotomous key verification of difficult botanical specimens',
      'Sound spectrograph analysis of recorded bird songs using open-source audio tools',
      'Comparison of student photographs with herbarium voucher specimens',
      'Data cleaning and standardized Darwin Core taxonomic formatting'
    ],
    equipmentChecklist: [
      'Digital cameras or smartphones with GPS location tags enabled',
      'Field binoculars (8x42) and macro clip-on lenses for phone cameras',
      'Plastic petri dishes and clear specimen inspection jars (with breathing holes)',
      'Kashmir EcoWatch Citizen Science field observation checklists',
      'Field guidebooks to Birds of the Indian Subcontinent and Flowers of the Himalaya'
    ],
    safetyAndPermits: {
      statutoryPermits: [
        'Institutional permission for campus or municipal park surveys',
        'Adherence to Wildlife Protection Act 1972: no capture, handling, or detention of protected Schedule I/II animals'
      ],
      safetyProtocols: [
        'Students must not touch venomous snakes (Vipera / Pit vipers) or stinging hymenoptera',
        'Careful footing around stone walls and thorn bushes',
        'Buddy system maintained at all times'
      ],
      leaveNoTraceRules: [
        'All captured insects or small invertebrates must be released unharmed within 10 minutes',
        'No picking of wild flowers or stripping of plant specimens from wild habitats',
        'Zero disturbance to active bird nests, fledglings, or roosting bats'
      ]
    },
    intergenerationalStewardship: {
      communityDialoguePrompt: 'Interview a community elder about native Kashmiri names for birds and medicinal herbs, and how their abundance has shifted.',
      oralHistoryQuestions: [
        'What Kashmiri names did your parents use for common birds (*Kav*, *Bibul*, *Tech*, *Tonthe*)?',
        'Are there birds or butterflies that used to visit gardens in springtime that you no longer see?',
        'What traditional stories or proverbs connect wildlife behavior to weather forecasts?'
      ],
      traditionalKnowledgeComparison: 'Compile a bilingual Kashmiri-English lexicon of local bird names and compare it with formal ornithological databases.'
    },
    measurableOutcomes: [
      'Bio-Blitz species checklist submitted to Kashmir EcoWatch Citizen Science portal',
      'At least 20 geotagged photographic vouchers verified by EcoWatch research board',
      'Students earn the "Certified Himalayan Citizen Scientist" digital credential'
    ],
    linkedCalendarObservance: 'biological-diversity-day',
    linkedEcoWatchRoute: '/participate/citizen-science',
    gisLayerId: 'layer-biodiversity-sightings'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. ADOPT-AN-ECOSYSTEM PROGRAM (20 PILOT LABORATORIES)
// ─────────────────────────────────────────────────────────────────────────────

export const ADOPTED_ECOSYSTEM_REGISTRY: AdoptedEcosystem[] = [
  {
    id: 'eco-hokersar',
    code: 'KEW-OD-WET-001',
    name: 'Hokersar Wetland Reserve (Queen of Wetlands)',
    ecosystemType: 'Wetland',
    district: 'Budgam / Srinagar',
    coordinates: [34.0911, 74.7089],
    elevationM: 1584,
    adoptingInstitutions: [
      {
        institutionName: 'Govt Boys Higher Secondary School, Soibugh',
        institutionType: 'Higher Secondary',
        ecoClubName: 'Hokersar Waterbird Guardians',
        adoptedSince: 'March 2026',
        monitoringFrequency: 'Fortnightly',
        leadTeacher: 'Dr. Shabir Ahmad Mir (Lecturer Environmental Science)'
      },
      {
        institutionName: 'Delhi Public School, Athwajan',
        institutionType: 'High School',
        ecoClubName: 'Wetland Sponges Youth Circle',
        adoptedSince: 'April 2026',
        monitoringFrequency: 'Monthly',
        leadTeacher: 'Ms. Nusrat Jahan (Biology Dept)'
      }
    ],
    keyMonitoringParameters: [
      'Migratory waterfowl species census',
      'Water transparency (Secchi depth)',
      'Phragmites reedbed expansion boundary (GPS)',
      'Siltation delta accretion rate at spill channel inlet'
    ],
    currentHealthIndex: 68,
    historicalBaselineYear: 2002,
    statutoryJurisdiction: 'Department of Wildlife Protection J&K (Ramsar Site No. 1570)',
    gisLayer: 'kew_wetlands_hokersar_boundary'
  },
  {
    id: 'eco-dal-lake',
    code: 'KEW-OD-LAK-002',
    name: 'Dal Lake - Hazratbal & Gagribal Basins',
    ecosystemType: 'Lake',
    district: 'Srinagar',
    coordinates: [34.1250, 74.8550],
    elevationM: 1583,
    adoptingInstitutions: [
      {
        institutionName: 'Govt College for Women, M.A. Road Srinagar',
        institutionType: 'Degree College',
        ecoClubName: 'Dal Limnology Action Group',
        adoptedSince: 'February 2026',
        monitoringFrequency: 'Weekly',
        leadTeacher: 'Prof. Farooq Ahmad Lone (Dept of Environmental Studies)'
      },
      {
        institutionName: 'Tyndale Biscoe School, Srinagar',
        institutionType: 'High School',
        ecoClubName: 'Watermanship & Lake Watch Club',
        adoptedSince: 'March 2026',
        monitoringFrequency: 'Fortnightly',
        leadTeacher: 'Mr. Tariq Ahmad Dar (Outdoor Education Master)'
      }
    ],
    keyMonitoringParameters: [
      'Dissolved oxygen and surface water temperature',
      'Floating garden (*Radh*) boundary modifications',
      'Submerged macrophyte density (*Ceratophyllum demersum*)',
      'Visual floating solid waste and sewage outfall audits'
    ],
    currentHealthIndex: 58,
    historicalBaselineYear: 1985,
    statutoryJurisdiction: 'J&K Lake Conservation and Management Authority (LCMA)',
    gisLayer: 'kew_lakes_dal_boundary'
  },
  {
    id: 'eco-wular-lake',
    code: 'KEW-OD-LAK-003',
    name: 'Wular Lake - Banyari Delta & Southern Shoreline',
    ecosystemType: 'Lake',
    district: 'Bandipora',
    coordinates: [34.3500, 74.6000],
    elevationM: 1578,
    adoptingInstitutions: [
      {
        institutionName: 'Govt Degree College, Bandipora',
        institutionType: 'Degree College',
        ecoClubName: 'Wular Freshwater Research Circle',
        adoptedSince: 'January 2026',
        monitoringFrequency: 'Monthly',
        leadTeacher: 'Dr. Mohammad Amin (Dept of Zoology)'
      }
    ],
    keyMonitoringParameters: [
      'Willow plantation removal verification (*Salix* removal areas)',
      'Waterbird wintering density (Greylag goose, mallard)',
      'Sedimentation thickness at Jhelum river outfall',
      'Fisheries catch composition (*Schizothorax* vs *Cyprinus carpio*)'
    ],
    currentHealthIndex: 52,
    historicalBaselineYear: 1986,
    statutoryJurisdiction: 'Wular Conservation and Management Authority (WUCMA)',
    gisLayer: 'kew_lakes_wular_boundary'
  },
  {
    id: 'eco-dachigam',
    code: 'KEW-OD-FOR-004',
    name: 'Dachigam National Park - Lower Riverine Belt',
    ecosystemType: 'Forest',
    district: 'Srinagar',
    coordinates: [34.1350, 74.9500],
    elevationM: 1720,
    adoptingInstitutions: [
      {
        institutionName: 'Burn Hall School, Srinagar',
        institutionType: 'High School',
        ecoClubName: 'Hangul Heritage Eco-Force',
        adoptedSince: 'March 2026',
        monitoringFrequency: 'Monthly',
        leadTeacher: 'Mr. Showkat Ahmad Wani'
      }
    ],
    keyMonitoringParameters: [
      'Coniferous forest canopy cover (densiometer)',
      'Hangul seasonal browsing signs on shrubs',
      'Oak-pine regeneration seedling survival rates',
      'Dagwan stream water temperature and macroinvertebrate counts'
    ],
    currentHealthIndex: 82,
    historicalBaselineYear: 1981,
    statutoryJurisdiction: 'Department of Wildlife Protection J&K',
    gisLayer: 'kew_protected_dachigam_np'
  },
  {
    id: 'eco-verinag-spring',
    code: 'KEW-OD-SPR-005',
    name: 'Verinag Karst Spring & Jhelum Source Complex',
    ecosystemType: 'Spring',
    district: 'Anantnag',
    coordinates: [33.5350, 75.2500],
    elevationM: 1876,
    adoptingInstitutions: [
      {
        institutionName: 'Govt Degree College, Dooru',
        institutionType: 'Degree College',
        ecoClubName: 'Verinag Springshed Observatory',
        adoptedSince: 'February 2026',
        monitoringFrequency: 'Weekly',
        leadTeacher: 'Dr. Fayaz Ahmad Bhat (Dept of Chemistry)'
      }
    ],
    keyMonitoringParameters: [
      'Volumetric springhead discharge (L/min)',
      'Water temperature stability (°C year-round)',
      'Electrical conductivity and total dissolved solids (TDS)',
      'Recharge zone land conversion along the Pir Panjal slopes'
    ],
    currentHealthIndex: 79,
    historicalBaselineYear: 2005,
    statutoryJurisdiction: 'Public Health Engineering (Jal Shakti) & J&K Tourism',
    gisLayer: 'kew_springs_verinag'
  },
  {
    id: 'eco-lidder-river',
    code: 'KEW-OD-RIV-006',
    name: 'Lidder River Corridor - Pahalgam to Aru',
    ecosystemType: 'River',
    district: 'Anantnag',
    coordinates: [34.0200, 75.3200],
    elevationM: 2130,
    adoptingInstitutions: [
      {
        institutionName: 'Govt Higher Secondary School, Pahalgam',
        institutionType: 'Higher Secondary',
        ecoClubName: 'Lidder River Custodians',
        adoptedSince: 'April 2026',
        monitoringFrequency: 'Fortnightly',
        leadTeacher: 'Mr. Javaid Ahmad Rather'
      }
    ],
    keyMonitoringParameters: [
      'River flow velocity and calculated stream discharge (cumecs)',
      'Benthic macroinvertebrate EPT bioindicator index',
      'Solid waste accumulation along rafting launch sites',
      'Riparian vegetation buffer width (m)'
    ],
    currentHealthIndex: 74,
    historicalBaselineYear: 2004,
    statutoryJurisdiction: 'Pahalgam Development Authority & Irrigation/Fisheries Dept',
    gisLayer: 'kew_rivers_lidder'
  },
  {
    id: 'eco-thajiwas-glacier',
    code: 'KEW-OD-GLA-007',
    name: 'Thajiwas Glacier Foreland & Alpine Moraines',
    ecosystemType: 'Mountain',
    district: 'Ganderbal',
    coordinates: [34.2850, 75.2950],
    elevationM: 2750,
    adoptingInstitutions: [
      {
        institutionName: 'Govt Degree College, Ganderbal',
        institutionType: 'Degree College',
        ecoClubName: 'Himalayan Cryosphere Youth Lab',
        adoptedSince: 'May 2026',
        monitoringFrequency: 'Monthly (Summer Season)',
        leadTeacher: 'Prof. Zahoor Ahmad Sheikh'
      }
    ],
    keyMonitoringParameters: [
      'Snout terminus distance from landmark boulder reference',
      'Surface temperature transect across snow vs dirt-covered ice',
      'Meltwater turbidity and discharge timing',
      'Tourist pony trail erosion on proglacial moraines'
    ],
    currentHealthIndex: 64,
    historicalBaselineYear: 1980,
    statutoryJurisdiction: 'Sonamarg Development Authority & J&K Forest Department',
    gisLayer: 'kew_glaciers_thajiwas'
  },
  {
    id: 'eco-pampore-karewa',
    code: 'KEW-OD-GEO-008',
    name: 'Pampore Saffron Heritage Karewa Plateau',
    ecosystemType: 'Agricultural',
    district: 'Pulwama',
    coordinates: [34.0200, 74.9300],
    elevationM: 1610,
    adoptingInstitutions: [
      {
        institutionName: 'Govt Boys Higher Secondary School, Pampore',
        institutionType: 'Higher Secondary',
        ecoClubName: 'Saffron Soil & Heritage Circle',
        adoptedSince: 'March 2026',
        monitoringFrequency: 'Seasonal',
        leadTeacher: 'Dr. Mushtaq Ahmad Dar'
      }
    ],
    keyMonitoringParameters: [
      'Soil texture, moisture, and organic carbon percentage',
      'Commercial clay excavation scar measurement (ha)',
      'Saffron corm flowering phenology dates',
      'Infiltration rate and surface runoff after rain events'
    ],
    currentHealthIndex: 54,
    historicalBaselineYear: 1995,
    statutoryJurisdiction: 'Department of Agriculture Production & J&K Revenue Dept',
    gisLayer: 'kew_geology_pampore_karewa'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 5. SAMPLE PILOT INSTITUTIONS (PHASE 1 DEPLOYMENT)
// ─────────────────────────────────────────────────────────────────────────────

export const PILOT_INSTITUTIONS: PilotInstitution[] = [
  {
    id: 'inst-dps-srinagar',
    name: 'Delhi Public School, Athwajan',
    type: 'Private School',
    district: 'Srinagar',
    establishedYear: 2003,
    ecoClubName: 'Wetland Sponges Youth Circle',
    facultyMentor: 'Ms. Nusrat Jahan',
    studentEnrolment: 42,
    adoptedSiteCode: 'KEW-OD-WET-001',
    adoptedSiteName: 'Hokersar Wetland Reserve',
    verifiedFieldSubmissions: 18,
    accreditationLevel: 'Level 2 - Certified Field Hub'
  },
  {
    id: 'inst-ghss-soibugh',
    name: 'Govt Boys Higher Secondary School, Soibugh',
    type: 'Government School',
    district: 'Budgam',
    establishedYear: 1968,
    ecoClubName: 'Hokersar Waterbird Guardians',
    facultyMentor: 'Dr. Shabir Ahmad Mir',
    studentEnrolment: 36,
    adoptedSiteCode: 'KEW-OD-WET-001',
    adoptedSiteName: 'Hokersar Wetland Reserve',
    verifiedFieldSubmissions: 24,
    accreditationLevel: 'Level 3 - Regional Research Partner'
  },
  {
    id: 'inst-gcw-srinagar',
    name: 'Govt College for Women, M.A. Road Srinagar',
    type: 'Degree College',
    district: 'Srinagar',
    establishedYear: 1950,
    ecoClubName: 'Dal Limnology Action Group',
    facultyMentor: 'Prof. Farooq Ahmad Lone',
    studentEnrolment: 65,
    adoptedSiteCode: 'KEW-OD-LAK-002',
    adoptedSiteName: 'Dal Lake - Hazratbal Basin',
    verifiedFieldSubmissions: 38,
    accreditationLevel: 'Level 3 - Regional Research Partner'
  },
  {
    id: 'inst-gdc-dooru',
    name: 'Govt Degree College, Dooru',
    type: 'Degree College',
    district: 'Anantnag',
    establishedYear: 2005,
    ecoClubName: 'Verinag Springshed Observatory',
    facultyMentor: 'Dr. Fayaz Ahmad Bhat',
    studentEnrolment: 50,
    adoptedSiteCode: 'KEW-OD-SPR-005',
    adoptedSiteName: 'Verinag Karst Spring',
    verifiedFieldSubmissions: 29,
    accreditationLevel: 'Level 3 - Regional Research Partner'
  },
  {
    id: 'inst-ghss-pahalgam',
    name: 'Govt Higher Secondary School, Pahalgam',
    type: 'Government School',
    district: 'Anantnag',
    establishedYear: 1974,
    ecoClubName: 'Lidder River Custodians',
    facultyMentor: 'Mr. Javaid Ahmad Rather',
    studentEnrolment: 28,
    adoptedSiteCode: 'KEW-OD-RIV-006',
    adoptedSiteName: 'Lidder River Corridor',
    verifiedFieldSubmissions: 16,
    accreditationLevel: 'Level 2 - Certified Field Hub'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 6. SAMPLE VERIFIED FIELD OBSERVATIONS
// ─────────────────────────────────────────────────────────────────────────────

export const RECENT_STUDENT_OBSERVATIONS: StudentObservationRecord[] = [
  {
    id: 'obs-2026-11-001',
    studentIdAnonymized: 'STU-BUD-014',
    schoolCode: 'GHSS-SOIBUGH',
    siteCode: 'KEW-OD-WET-001',
    siteName: 'Hokersar Wetland Reserve (Watchtower 2)',
    programId: 'wetland-ecology',
    observationDate: '2026-11-04',
    verificationStatus: 'EcoWatch Verified',
    gpsLocation: {
      lat: 34.0924,
      lng: 74.7102,
      elevationM: 1584
    },
    parametersMeasured: {
      'Water Temperature (°C)': 11.4,
      'pH Level': 7.6,
      'Secchi Depth (cm)': 48,
      'Greylag Goose (*Anser anser*) Count': 340,
      'Northern Pintail (*Anas acuta*) Count': 1250,
      'Floating Plastic Bottle Density (items/100m)': 14
    },
    fieldNotes: 'Large early arrival of winter waterfowl observed in northern marsh zone. Secchi depth improved slightly following autumn settling. High reed encroachment observed near village boundary.',
    supervisingTeacher: 'Dr. Shabir Ahmad Mir',
    verifiedByScientist: 'Dr. Tariq Ahmad (EcoWatch Limnologist)',
    openDataCitation: 'Kashmir EcoWatch Outdoor Classroom Observation #001 (DOI: 10.5281/zenodo.kew.od.001)'
  },
  {
    id: 'obs-2026-10-045',
    studentIdAnonymized: 'STU-SRI-089',
    schoolCode: 'GCW-SRINAGAR',
    siteCode: 'KEW-OD-LAK-002',
    siteName: 'Dal Lake (Hazratbal Basin Station D-3)',
    programId: 'wetland-ecology',
    observationDate: '2026-10-28',
    verificationStatus: 'EcoWatch Verified',
    gpsLocation: {
      lat: 34.1298,
      lng: 74.8582,
      elevationM: 1583
    },
    parametersMeasured: {
      'Water Temperature (°C)': 14.2,
      'pH Level': 8.1,
      'Dissolved Oxygen (mg/L)': 5.8,
      'Total Dissolved Solids (ppm)': 185,
      'Water Transparency (cm)': 65
    },
    fieldNotes: 'Late autumn macrophyte senescence visible. LCMA de-weeding machines active in navigation channel. Dissolved oxygen adequate in open water but drops to 3.4 mg/L in floating garden channels.',
    supervisingTeacher: 'Prof. Farooq Ahmad Lone',
    verifiedByScientist: 'K. M. Qureshi (EcoWatch Hydro-Chemistry Unit)',
    openDataCitation: 'Kashmir EcoWatch Outdoor Classroom Observation #045 (DOI: 10.5281/zenodo.kew.od.045)'
  },
  {
    id: 'obs-2026-10-032',
    studentIdAnonymized: 'STU-ANG-027',
    schoolCode: 'GDC-DOORU',
    siteCode: 'KEW-OD-SPR-005',
    siteName: 'Verinag Main Octagonal Karst Spring Pool',
    programId: 'river-spring-science',
    observationDate: '2026-10-20',
    verificationStatus: 'EcoWatch Verified',
    gpsLocation: {
      lat: 33.5352,
      lng: 75.2505,
      elevationM: 1876
    },
    parametersMeasured: {
      'Spring Discharge Rate (L/min)': 4820,
      'Water Temperature (°C)': 12.8,
      'pH Level': 7.3,
      'Total Hardness (mg/L CaCO3)': 165,
      'Electrical Conductivity (µS/cm)': 310
    },
    fieldNotes: 'Stable thermal signature typical of deep karst aquifer. Discharge measured via downstream rectangular weir. Elder interview confirmed that historical discharge remained constant during severe 1999 drought.',
    supervisingTeacher: 'Dr. Fayaz Ahmad Bhat',
    verifiedByScientist: 'Er. N. A. Khan (EcoWatch Groundwater Unit)',
    openDataCitation: 'Kashmir EcoWatch Outdoor Classroom Observation #032 (DOI: 10.5281/zenodo.kew.od.032)'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 7. HISTORICAL CONTEXT & ARCHIVAL DOCUMENTATION NOTE
// ─────────────────────────────────────────────────────────────────────────────

export const OUTDOOR_CLASSROOM_ARCHIVAL_NOTE = {
  organization: 'Environment Services & Research Organization (ESRO) & eIEN Kashmir',
  historicalOriginPeriod: '2002–2006',
  leadInitiators: 'Kashmiri environmental scientists, educators, and naturalists',
  institutionalCharterSummary: `The Outdoor Classroom (OD) concept was originally framed in Kashmir between 2002 and 2006 by the Environment Services & Research Organization (ESRO) and the electronic Environmental Information Network (eIEN Kashmir). 
Its pioneering premise was to liberate environmental science education from passive textbook memorization and transform Kashmir's lakes, wetlands, forests, and alpine meadows into living educational observatories.
Under this model, schools across Srinagar, Budgam, and Anantnag conducted the first organized student waterbird censuses at Hokersar, established tree girth measurement networks for heritage Chinars, and logged stream water temperatures along the Lidder and Sind rivers.

Kashmir EcoWatch formally revives this initiative in 2026 as a modernized digital-first field science program, equipping a new generation of Himalayan youth with GIS tools, handheld sensors, and verified citizen-science workflows.`,
  archivalCaveat: 'Historical claims regarding pioneering dates and specific school rosters are grounded in preserved ESRO field bulletins (2002–2006) and eIEN Kashmir archival releases, preserved for open historical study.'
};
