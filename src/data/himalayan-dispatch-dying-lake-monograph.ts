// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 03 & DISPATCH 04 MASTER SCIENTIFIC ARCHITECTURE
// "THE MATHEMATICS OF A DYING LAKE: DECADES OF CONSERVATION, CRORES OF
//  EXPENDITURE AND THE UNRESOLVED ENGINEERING OF DAL LAKE"
//
// Special Scientific Investigation & Proposed 10-Volume, 62-Chapter Monograph
// + Permanent KEW Scientific Companion: Dal Lake Conservation Performance Observatory
//
// Evidentiary & Fairness Guardrail:
// Historical audit metrics cite Comptroller and Auditor General (CAG) of India
// Report No. 4 of 2025 (for the period ended March 2022) and revisited 2006/2011
// observations alongside September 2026 legislative/government statements.
// Illustrative engineering simulators, proposed 62-chapter monograph targets,
// and 2030–2050 scenario architectures are explicitly labeled as analytical
// frameworks and proposed research protocols—never completed empirical verdicts
// or proof of corruption, deliberate wrongdoing, or continuing post-refurbishment
// failure of every conservation component.
// ─────────────────────────────────────────────────────────────────────────────

export interface DyingLakeVolumeSpec {
  volumeNumber: number;
  volumeRoman: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII' | 'IX' | 'X';
  volumeTitle: string;
  chapterRange: string;
  thematicMandate: string;
}

export interface DyingLakeChapterProtocol {
  number: string; // '01' .. '62'
  slug: string;
  volumeRoman: DyingLakeVolumeSpec['volumeRoman'];
  volumeTitle: string;
  title: string;
  governingEquationsOrMetrics: string;
  analyticalFocus: string;
  requiredDocumentaryAndFieldInputs: string;
  researchStatus: string;
}

export interface DalStpEngineeringDossier {
  id: string;
  name: string;
  reportedCapacityMld: number;
  operationalClassification: 'Operational (Reported Sept 2026)' | 'Under Construction (Excluded from Existing Capacity)';
  cagHistoricalNh4RemovalPct: string;
  cagHistoricalPhosphorusRemovalPct: string;
  cagHistoricalMaxPhosphorusPct: number | null;
  designNutrientRemovalTargetPct: string;
  engineeringVerificationMandate: string;
}

export interface DalScientificBudgetSpec {
  code: string;
  budgetName: string;
  units: string;
  governingEquation: string;
  principalQuestion: string;
  kewConnectedSurfaceHref: string;
}

export interface DalFutureScenarioSpec {
  code: string;
  managementConfiguration: string;
  primaryTargetedBalances: string;
  evaluationHorizons: string;
}

export interface DalDocumentaryRequirement {
  code: string;
  priority: 'P0' | 'P1' | 'P2';
  documentTitle: string;
  engineeringVerificationPurpose: string;
  acquisitionStatus: string;
}

export interface DalObservatoryModuleSpec {
  id: string;
  title: string;
  statusBadge: 'Proposed assessment module';
  governingMathematics: string;
  scientificPurpose: string;
  reusedKewCapabilityLabel: string;
  reusedKewCapabilityHref: string;
}

export const DYING_LAKE_MONOGRAPH_SPEC = {
  monographCode: 'MONOGRAPH 03 · LIMNOLOGY, ENVIRONMENTAL ENGINEERING & PUBLIC ACCOUNTABILITY',
  monographSlug: 'monograph-03-mathematics-of-a-dying-lake',
  dispatchNumber: '04',
  dispatchSlug: 'the-mathematics-of-a-dying-lake',
  kicker:
    'SPECIAL SCIENTIFIC INVESTIGATION · LIMNOLOGY · ENVIRONMENTAL ENGINEERING · PUBLIC EXPENDITURE ACCOUNTABILITY',
  disciplinesRubric:
    'HYDROLOGY · LIMNOLOGY · ENVIRONMENTAL ENGINEERING · GEOSPATIAL INTELLIGENCE · PUBLIC ACCOUNTABILITY',
  title: 'The Mathematics of a Dying Lake',
  subtitle:
    'Decades of Conservation, Crores of Expenditure and the Unresolved Engineering of Dal Lake',
  extendedSubtitle:
    'A forensic investigation into settling basins, peripheral sewage treatment, dredging, mechanical de-weeding, catchment management, hydrological manipulation, ecological restoration and public expenditure accountability.',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Environmental Engineering, Limnology and Geospatial Intelligence Desk',
  geographicScope:
    'Dal–Nigeen Lake System · Telbal Catchment · Srinagar · Western Himalayas',
  statusBadge:
    'Stage 08 Pre-Release Special Scientific Investigation & Proposed 10-Volume, 62-Chapter Monograph Architecture',
  heroStats: [
    { value: '10', label: 'Thematic volumes' },
    { value: '62', label: 'Scientific chapters' },
    { value: '8', label: 'Scientific balances' },
  ],
  eightFoundationalQuestions: [
    'Was the Telbal settling basin mathematically designed for actual peak sediment discharge and fine-particle settling velocities?',
    'Was the peripheral sewage treatment ring designed—and physically connected—for the entire permanent, tourist, commercial, and houseboat wastewater-generating population?',
    'Were Dal Lake’s sewage treatment plants engineered and operated to remove dissolved nitrogen and phosphorus (>90% target), or primarily biochemical oxygen demand?',
    'Does mechanical de-weeding permanently export more phosphorus and nitrogen in dry plant tissue than the lake receives every year?',
    'Does hydraulic and mechanical dredging permanently export dry sediment mass faster than catchment erosion and internal production replenish it?',
    'Does water augmentation and flushing improve basin-scale ecological resilience, or primarily dilute and transfer pollutant loads downstream into the Jhelum?',
    'Does catchment afforestation and check-dam construction measurably reduce delivered sediment yield at the lake boundary beyond tree-planting counts?',
    'Does cumulative public expenditure correspond to verified improvements in Dal Lake’s water, sediment, nutrient, oxygen, and habitat balances?',
  ],
  foundationalThesis:
    'Dal Lake cannot be restored through the number of machines purchased, sewage treatment plants inaugurated, trees planted, households relocated or crores of rupees sanctioned. It can only be restored when its hydrological, sedimentological, chemical and biological balances move toward a sustainable ecological condition.',
  epilogueTitle: 'The Lake Does Not Understand Crores',
  epilogueParagraphs: [
    'Dal Lake does not understand how much money was sanctioned for its conservation. It does not understand the number of meetings conducted, committees established, machines purchased or government announcements issued. It responds to physics, chemistry and biology.',
    'Every tonne of sediment entering the lake changes its physical balance. Every kilogram of phosphorus changes its nutrient balance. Every discharge of untreated or nutrient-rich sewage changes its chemical and biological environment.',
    'Every intervention must therefore be assessed against the environmental process it claims to correct: a settling basin must permanently intercept sediment; a sewage treatment plant must prevent ecologically damaging nutrient and organic pollution; a dredger must permanently export harmful bed material; a mechanical harvester must contribute to sustainable macrophyte and nutrient management; and catchment conservation must measurably reduce soil erosion and delivery.',
    'Dal Lake does not need another promise of conservation. It needs a scientifically verifiable balance sheet of its survival.',
  ],
  epilogueClosingQuestion:
    'After decades of conservation expenditure, can the authorities provide a single independently validated mathematical model demonstrating that Dal Lake is losing less sediment, receiving fewer nutrients and recovering faster than it is deteriorating?',
  evidentiaryNotice:
    'Methodological & Evidentiary Disclosure: Historical engineering, financial, and water-quality audit findings cite Comptroller and Auditor General (CAG) of India Report No. 4 of 2025 (Performance Audit on Conservation and Management of Lakes in Jammu & Kashmir for the period ended March 2022, including revisited 2006 and 2011 audit observations), alongside September 2026 government and legislative statements regarding five operational STPs (36.70 MLD), the under-construction 30 MLD Gupt Ganga STP, channel dredging, and mechanical de-weeding. Documented historical shortcomings establish rigorous grounds for forensic engineering inquiry, but do not independently establish corruption, deliberate wrongdoing, or continuing failure of every conservation component following subsequent refurbishments. Original conservation DPRs, hydraulic design sheets, contract ledgers, and contemporary post-refurbishment inlet/outlet monitoring datasets remain outstanding under Part XV documentary requests.',
  publicationHierarchy: [
    {
      level: '01 · Inaugural Edition Flagship (Dispatch 04)',
      title: 'Dispatch 04 — The Mathematics of a Dying Lake',
      detail:
        'Placed immediately after Dispatch 03 ("The Water We Have Forgotten") in Vol. 01 / No. 01: reconstructs the engineering equations, CAG 2025 audit baselines, September 2026 capacity updates, and 8 mass balances.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/the-mathematics-of-a-dying-lake',
      ctaLabel: 'Read Dispatch 04',
    },
    {
      level: '02 · Complete 10-Volume Scientific Monograph',
      title: 'Monograph 03 — 10 Thematic Volumes & 62 Scientific Chapters',
      detail:
        'Full environmental engineering investigation architecture spanning 62 chapter protocols, 6 STP dossiers, 12 restoration scenarios (S01–S12), interactive mass-balance models, and 23 P0–P2 documentary dockets.',
      href: '/himalayan-dispatch/issues/monograph-03-mathematics-of-a-dying-lake',
      ctaLabel: 'Open Monograph 03',
    },
    {
      level: '03 · Permanent KEW Scientific Companion',
      title: 'Dal Lake Conservation Performance Observatory',
      detail:
        'Integrated directly into KEW Water Systems (/water-systems/lakes/dal-lake/conservation-performance), reusing KEW’s Master Lake Registry, Algal Bloom Intelligence, Satellite Change Detection, and Investigation dossiers.',
      href: '/water-systems/lakes/dal-lake/conservation-performance',
      ctaLabel: 'Open KEW Companion Observatory',
    },
  ],
  proposedPublicationSpecifications: [
    { component: 'Thematic volumes', target: '10 (Volumes I–X)' },
    { component: 'Scientific chapters', target: '62 (Chapters 01–62)' },
    { component: 'Manuscript length', target: '65,000–90,000 words (proposed research target)' },
    { component: 'Integrated scientific balances', target: '8 interconnected environmental & fiscal budgets' },
    { component: 'Individual STP dossiers', target: '6 (5 reported operational + 1 under construction at Gupt Ganga)' },
    { component: 'Restoration modelling scenarios', target: '12 (Scenarios S01–S12 evaluated for 2030, 2040 & 2050)' },
    { component: 'Technical appendices', target: '25 (proposed hydraulic, bathymetric & laboratory protocols)' },
    { component: 'Scientific maps', target: '60–80 (multi-epoch catchment, sewer-ring & land-cover plates)' },
    { component: 'Engineering charts and diagrams', target: '100+ (mass-balance, process-flow & residence-time graphics)' },
    { component: 'Mathematical models', target: '30+ (settling, nutrient, biomass, bathymetric, RUSLE & hydrodynamic)' },
    { component: 'Bibliographic target', target: '250+ (statutory audits, DPRs, peer-reviewed limnology & remote sensing)' },
    { component: 'Permanent companion', target: 'KEW Dal Lake Conservation Performance Observatory' },
  ],
} as const;

// ─── SYSTEM ARCHITECTURE (SECTION 3) ─────────────────────────────────────────

export const DAL_CONSERVATION_SYSTEM_CHAIN = [
  {
    tier: '01 · Upstream Catchment',
    elements: 'Forests · Agriculture · Settlements · Erosion · Construction · Livestock',
    governingProcess: 'Runoff generation, sheet/rill/channel soil detachment (RUSLE + SDR), and diffuse nutrient export.',
  },
  {
    tier: '02 · Sediment Interception',
    elements: 'Telbal Nallah · Settling basin · Check dams · Auxiliary basin',
    governingProcess: 'Surface-overflow particle settling (A_req = Q / V_s) versus flood short-circuiting and auxiliary-basin remobilization.',
  },
  {
    tier: '03 · Pollution Interception',
    elements: 'Peripheral sewers · Pumping stations · STPs (36.70 MLD existing; 30 MLD u/c) · Detention ponds',
    governingProcess: 'Hydraulic capture (Q_s = Q_r + Q_t + Q_c + Q_i + Q_inf) and biological N/P removal versus bypasses and dissolved effluent loads.',
  },
  {
    tier: '04 · Dal–Nigeen Lake System & In-Lake Interventions',
    elements: 'Water, Sediment, Nutrient & Oxygen Balances · De-weeding · Dredging · Flushing · Floating Gardens · Houseboat Sanitation · Habitat Restoration',
    governingProcess: 'Coupled hydrodynamic residence time, internal benthic P release, macrophyte turnover, and bathymetric storage.',
  },
  {
    tier: '05 · Final Ecological & Fiscal Outcome',
    elements: 'Water quality · Biodiversity · Depth · Nutrient concentrations · Sedimentation · Ecological resilience · Cost-effectiveness',
    governingProcess: 'Verified net directional improvement per crore of public expenditure across all eight interconnected balances.',
  },
] as const;

// ─── PART I: TELBAL SETTLING BASIN PARAMETERS (SECTION 4) ────────────────────

export const SETTLING_BASIN_HISTORICAL_BENCHMARK = {
  observationPeriod: 'May 1998 – June 2000 (cited in CAG Report No. 4 of 2025)',
  lowestEfficiencyPct: 7,
  lowestPassThroughPct: 93,
  highestEfficiencyPct: 57,
  highestPassThroughPct: 43,
  requiredAreaEquation: 'A_required = Q / V_s',
  observedEfficiencyEquation: 'η_observed = (M_in - M_out) / M_in',
  disposalParadoxNote:
    'CAG audit documentation recorded excavated material from the Telbal settling basin being deposited into its neighbouring auxiliary basin—raising the engineering question of whether hydraulically connected spoil transfer constitutes permanent sediment removal.',
} as const;

export const SETTLING_BASIN_AUDIT_PARAMETERS_10: Array<[string, string]> = [
  ['Original basin surface area', 'Approved DPR dimensions versus actual constructed water-spread geometry'],
  ['Basin depth', 'Original design invert elevations versus current silt-reduced bathymetry'],
  ['Design discharge', 'Original hydrological return-period assumptions used for sizing'],
  ['Peak discharge', 'Actual Telbal Nallah snowmelt and cloudburst flood hydrographs'],
  ['Sediment particle distribution', 'Clay, fine/medium silt, sand, and particulate organic matter fractions (determining V_s)'],
  ['Hydraulic detention time', 'Actual residence time across baseflow, snowmelt, and peak flood conditions'],
  ['Dead storage capacity', 'Available volumetric storage before bed shear resuspend accumulated silt'],
  ['Short-circuiting', 'Preferential high-velocity inflow jets bypassing effective quiescent settling zones'],
  ['Sediment trapping efficiency', 'Flow-weighted synchronous inlet (M_in) and outlet (M_out) suspended-sediment loads'],
  ['Maintenance schedule', 'Actual desilting intervals and spoil export versus mathematically required dredging frequency'],
];

// ─── PART II & III: PERIPHERAL STPs & CAG TABLE 4.2 NUTRIENT AUDIT ───────────

export const DAL_LAKE_STP_DOSSIERS_6: DalStpEngineeringDossier[] = [
  {
    id: 'stp-brari-numbal',
    name: 'Brari Numbal STP',
    reportedCapacityMld: 16.1,
    operationalClassification: 'Operational (Reported Sept 2026)',
    cagHistoricalNh4RemovalPct: '57–65%',
    cagHistoricalPhosphorusRemovalPct: '59–66%',
    cagHistoricalMaxPhosphorusPct: 66,
    designNutrientRemovalTargetPct: 'Above 90%',
    engineeringVerificationMandate:
      'Audit actual daily influent flow vs 16.1 MLD rated capacity, post-refurbishment N/P outlet concentrations, sludge fate, and receiving-water pathway between Brari Numbal lagoon and Jhelum/Dal channels.',
  },
  {
    id: 'stp-hazratbal',
    name: 'Hazratbal STP',
    reportedCapacityMld: 7.5,
    operationalClassification: 'Operational (Reported Sept 2026)',
    cagHistoricalNh4RemovalPct: '15–49%',
    cagHistoricalPhosphorusRemovalPct: '14–52%',
    cagHistoricalMaxPhosphorusPct: 52,
    designNutrientRemovalTargetPct: 'Above 90%',
    engineeringVerificationMandate:
      'Verify FAB/fluidized-bed aeration, chemical phosphorus precipitation dosing, denitrification performance, institutional/university/shrine peak loading, and contemporary outlet TP/TN.',
  },
  {
    id: 'stp-nallah-amir-khan',
    name: 'Nallah Amir Khan STP',
    reportedCapacityMld: 5.4,
    operationalClassification: 'Operational (Reported Sept 2026)',
    cagHistoricalNh4RemovalPct: '31–41%',
    cagHistoricalPhosphorusRemovalPct: '39–53%',
    cagHistoricalMaxPhosphorusPct: 53,
    designNutrientRemovalTargetPct: 'Above 90%',
    engineeringVerificationMandate:
      'Reconstruct feeder pumping-station uptime, wet-weather overflow frequency, contemporary orthophosphate/total-N removal, and Nallah Amir Khan outflow exchange.',
  },
  {
    id: 'stp-laam',
    name: 'Laam STP',
    reportedCapacityMld: 4.5,
    operationalClassification: 'Operational (Reported Sept 2026)',
    cagHistoricalNh4RemovalPct: '14–47%',
    cagHistoricalPhosphorusRemovalPct: '39–56%',
    cagHistoricalMaxPhosphorusPct: 56,
    designNutrientRemovalTargetPct: 'Above 90%',
    engineeringVerificationMandate:
      'Examine eastern-foothill commercial/hotel sewer connectivity, winter cold-temperature nitrification/denitrification kinetics, and post-2022 modernization records.',
  },
  {
    id: 'stp-habak',
    name: 'Habak STP',
    reportedCapacityMld: 3.2,
    operationalClassification: 'Operational (Reported Sept 2026)',
    cagHistoricalNh4RemovalPct: '14–43%',
    cagHistoricalPhosphorusRemovalPct: '18–53%',
    cagHistoricalMaxPhosphorusPct: 53,
    designNutrientRemovalTargetPct: 'Above 90%',
    engineeringVerificationMandate:
      'Audit northern peripheral sewer capture near Habak–Telbal interface, storm-infiltration dilution, and contemporary dissolved reactive phosphorus export.',
  },
  {
    id: 'stp-gupt-ganga',
    name: 'Gupt Ganga STP (Under Construction)',
    reportedCapacityMld: 30.0,
    operationalClassification: 'Under Construction (Excluded from Existing Capacity)',
    cagHistoricalNh4RemovalPct: 'Not yet operational',
    cagHistoricalPhosphorusRemovalPct: 'Not yet operational',
    cagHistoricalMaxPhosphorusPct: null,
    designNutrientRemovalTargetPct: 'Verify Biological Nutrient Removal (BNR) guarantee in DPR',
    engineeringVerificationMandate:
      'Establish from approved DPR whether 30.0 MLD supplements or retires existing plants, verify biological/chemical N & P removal guarantees at winter Kashmir water temperatures, and confirm trunk-sewer completion.',
  },
];

export const SEWERAGE_HYDRAULIC_DEFICIT_BENCHMARK = {
  estimatedWastewaterLoadMld: 48.0,
  reportedInstalledCapacityMld: 36.7,
  underConstructionGuptGangaMld: 30.0,
  installedSharePct: 76.5,
  deficitSharePct: 23.5,
  theoreticalDeficitMld: 11.3,
  theoreticalAnnualDeficitBillionLitres: 4.12,
  caveat:
    'Illustrative comparison assuming the ~48 MLD wastewater estimate (reported government briefing) and 36.70 MLD installed capacity (September 2026 government statements) refer to the identical service boundary and period. Does not establish that all 36.70 MLD is collected/treated daily or that all uncollected wastewater enters Dal Lake directly.',
  networkAuditChecklist: [
    'Missing household, hotel, and commercial lateral sewer connections',
    'Intermediate sewage pumping station mechanical/power breakdowns',
    'Adverse or silted gravity sewer gradients',
    'Illegal or unrecorded shoreline and channel outfalls',
    'Wet-weather combined sewer overflow structures',
    'Stormwater cross-connections hydraulically overloading sewers',
    'Peak tourist-season hydraulic surcharging',
    'Exfiltration/infiltration leakage across lakeside underground mains',
    'Direct greywater and blackwater discharge from internal lake hamlets',
    'Treatment plant inlet bypasses during power or process outages',
  ],
} as const;

export const NITROGEN_SPECIATION_PARAMETERS_5: Array<[string, string]> = [
  ['Ammoniacal nitrogen (NH₃/NH₄⁺-N)', 'Evaluates un-ionized ammonia toxicity to fish and primary aerobic nitrification performance'],
  ['Nitrite (NO₂⁻-N)', 'Tracks intermediate biological oxidation and partial nitrification bottlenecks'],
  ['Nitrate (NO₃⁻-N)', 'Measures oxidized bioavailable nitrogen; elevated effluent nitrate indicates nitrification without adequate anoxic denitrification'],
  ['Organic nitrogen', 'Quantifies particulate and dissolved nitrogen bound in cellular and humic organic matter'],
  ['Total nitrogen (TN)', 'Establishes true mass nitrogen loading (L = Q × C) entering receiving waters regardless of internal species conversion'],
];

// ─── PART IV: MECHANICAL DE-WEEDING BENCHMARK (SECTIONS 11–14) ───────────────

export const DEWEEDING_CAG_EXPENDITURE_BENCHMARK = {
  auditedPeriod: '2016–2022 funding periods (CAG Report No. 4 of 2025)',
  totalExaminedCrore: 28.01,
  outsideSpecifiedMonthsCrore: 16.18,
  outsideSpecifiedMonthsPct: 57.8,
  remainingExpenditureCrore: 11.83,
  auditFairnessNote:
    'Expenditure timing outside prescribed seasonal windows and documentation gaps are statutory audit concerns requiring biological scrutiny; they do not by themselves prove that every out-of-window operation was ecologically unnecessary.',
  ecologicalRiskFactors: [
    'Disturbance of schizothoracine and carp spawning and nursery beds',
    'Non-selective removal of beneficial native submerged macrophytes alongside invasive taxa',
    'Mechanical cutter-bar resuspension of phosphorus-rich benthic ooze',
    'Fragmentation and drifting dispersal of Ceratophyllum, Myriophyllum, and Hydrilla propagules',
    'Loss of root-zone sediment stabilization and allelopathic suppression of cyanobacteria',
    'Trophic cascade shifts from clear-water macrophyte dominance toward turbid Microcystis phytoplankton blooms',
    'Alteration of littoral macroinvertebrate and waterbird foraging guilds',
    'Nutrient-rich leachate returning to lake channels from shoreline weed stockpiles',
  ],
} as const;

// ─── PART V: DREDGING AUDIT REQUIREMENTS (SECTIONS 15–18) ────────────────────

export const DREDGING_AUDIT_REQUIREMENTS_10: Array<[string, string]> = [
  ['Pre-dredging bathymetry', 'Georeferenced single/multibeam lakebed elevation surface (z_before) prior to mobilization'],
  ['Post-dredging bathymetry', 'Comparable post-operation elevation surface (z_after) to integrate actual cut volume V_d'],
  ['Dredging coordinates', 'DGPS cutter-head track logs verifying exact basin and channel intervention footprints'],
  ['Sediment cores', 'Vertical stratigraphy, bulk density, organic matter, heavy metals, and labile P fractions'],
  ['Dredger flow records', 'Calibrated pipeline discharge meters recording operational pumping hours and flow'],
  ['Slurry concentration', 'Measured volumetric and mass solids percentage (distinguishing 90% water from 10–30% solids)'],
  ['Sediment dry bulk density', 'Conversion from wet in-situ cut volume to dry metric tonnes permanently exported'],
  ['Disposal site records', 'Georeferenced, hydraulically isolated upland containment facilities and weighbridge manifests'],
  ['Return-water monitoring', 'Suspended solids, orthophosphate, and ammonia in decant water draining back toward the lake'],
  ['Post-project survey', 'Multi-year repeat bathymetry quantifying post-dredging infilling and channel slumping rates'],
];

// ─── PART VII: CATCHMENT CONSERVATION INTERVENTIONS (SECTION 23) ─────────────

export const CATCHMENT_INTERVENTIONS_10: Array<[string, string]> = [
  ['Afforestation', 'Multi-year audited sapling survival, canopy closure, root density, and measured plot erosion decline (not trees planted)'],
  ['Check dams', 'Measured sediment volume trapped, remaining storage capacity, and structural spillway integrity'],
  ['Gully plugging', 'Quantified arrest of headcut retreat and gully-wall sediment delivery across Dachigam–Telbal sub-watersheds'],
  ['Slope stabilization', 'Reduction in shallow translational landslip and cut-slope mass wasting along catchment roads'],
  ['Streambank protection', 'Measured reduction in lateral bank scour along Telbal, Pishiri, and ephemeral torrent reaches'],
  ['Agricultural conservation', 'Terrace retention, reduced soil loss, and curbed fertilizer P/N runoff from piedmont orchards and fields'],
  ['Grazing regulation', 'Documented alpine/subalpine ground-cover recovery and reduced hoof-compaction overland flow'],
  ['Construction regulation', 'Enforced sediment traps and zero-spoil-dumping compliance across peri-urban hillside cuts'],
  ['Drainage management', 'Attenuation of erosive concentrated road and settlement runoff before channel entry'],
  ['Catchment fencing', 'Satellite- and quadrat-verified biomass regeneration relative to unfenced control slopes'],
];

// ─── PART IX: AUXILIARY CONSERVATION SYSTEMS (19 COMPONENTS) ─────────────────

export const AUXILIARY_SYSTEMS_AUDIT_19: Array<[string, string]> = [
  ['Artificial wetlands', 'How many kilograms of dissolved and particulate N and P are permanently removed annually?'],
  ['Detention ponds', 'What volume of first-flush and sewage inflow is intercepted and biologically/chemically treated?'],
  ['Sewage pumping stations', 'What daily volume is transferred continuously without wet-well overflow, exfiltration, or power bypass?'],
  ['Stormwater management', 'How much road, market, and urban-drainage pollutant load enters Dal–Nigeen unattenuated?'],
  ['Solid waste collection', 'What fraction of houseboat, hamlet, and shoreline solid waste is permanently exported out of the basin?'],
  ['STP sludge management', 'Where do dewatered biosolids—concentrating captured phosphorus and metals—ultimately go?'],
  ['Harvested weed disposal', 'Is harvested biomass composted/exported off-watershed, or does shoreline decomposition leach P back?'],
  ['Dredged sediment disposal', 'Is excavated spoil permanently isolated from groundwater/surface return pathways?'],
  ['Aeration systems (where installed)', 'Does actual oxygen transfer rate (kg O₂/h) match benthic and water-column oxygen demand, or mainly serve visual fountains?'],
  ['Channel restoration', 'Have internal navigation and flushing channels achieved measurable dissolved-oxygen and velocity gains?'],
  ['Shoreline development', 'Does shoreline engineering restore littoral reed/macrophyte buffers or expand impervious concrete edges?'],
  ['Eco-parks', 'What independently measured limnological benefit accompanies expenditure classified under conservation?'],
  ['Viewing decks and jetties', 'Are tourism amenities accounted separately from core ecological restoration budgets?'],
  ['CCTV surveillance', 'What proportion of camera-logged encroachments or dumping events results in verified statutory remediation?'],
  ['Laboratory monitoring', 'Are sampling frequency, detection limits, and QA/QC sufficient to close seasonal mass balances?'],
  ['Biodiversity conservation', 'Are native Schizothorax fisheries, macroinvertebrates, and breeding wetland birds recovering?'],
  ['Seed bank management', 'Is benthic oospore/turion/seed-bank viability studied to guide selective macrophyte restoration?'],
  ['Public awareness', 'Has household greywater, detergent, or solid-waste disposal behaviour measurably changed?'],
  ['Enforcement', 'Have net annual shoreline conversions, unauthorized structures, and raw outfalls demonstrably declined?'],
];

// ─── PART X: EIGHT INTERCONNECTED SCIENTIFIC BUDGETS (SECTION 28) ────────────

export const EIGHT_INTERCONNECTED_SCIENTIFIC_BUDGETS: DalScientificBudgetSpec[] = [
  {
    code: 'BAL-01',
    budgetName: 'Water balance',
    units: 'm³/year',
    governingEquation: 'dV/dt = Q_in + P_precip + Q_gw_in - Q_out - E_evap - Q_gw_out',
    principalQuestion: 'Is basin-by-basin hydrological storage, circulation, and seasonal water level sustainable?',
    kewConnectedSurfaceHref: '/water-systems/lakes/dal-lake',
  },
  {
    code: 'BAL-02',
    budgetName: 'Sediment balance',
    units: 'tonnes/year',
    governingEquation: 'ΔS = S_in + S_internal - S_out - S_removed',
    principalQuestion: 'Is Dal Lake experiencing net sediment infilling despite settling basins and dredging?',
    kewConnectedSurfaceHref: '/environmental-investigations/reports/dal-lake-mechanical-dredging-ecological-defences',
  },
  {
    code: 'BAL-03',
    budgetName: 'Phosphorus balance',
    units: 'kg/year',
    governingEquation: 'dM_P/dt = L_external + L_internal - E_outflow - E_harvest - E_dredge - B_burial',
    principalQuestion: 'Is active-pool eutrophication pressure decreasing or accumulating year over year?',
    kewConnectedSurfaceHref: '/hazard-intelligence/algal-bloom-intelligence',
  },
  {
    code: 'BAL-04',
    budgetName: 'Nitrogen balance',
    units: 'kg/year',
    governingEquation: 'dM_N/dt = L_N_ext + N_fixation + L_N_int - E_N_out - E_N_harv - D_denitrif - B_N_burial',
    principalQuestion: 'Are total nitrogen inputs, ammonia toxicity, and denitrification losses controlled?',
    kewConnectedSurfaceHref: '/water-systems/water-quality',
  },
  {
    code: 'BAL-05',
    budgetName: 'Oxygen balance',
    units: 'kg O₂/day',
    governingEquation: 'dM_O2/dt = F_reaeration + P_photosynth + F_aeration - R_water - SOD_benthic - NBOD',
    principalQuestion: 'Can atmospheric, photosynthetic, and mechanical oxygen supply satisfy biological and sediment demand without nocturnal hypoxia?',
    kewConnectedSurfaceHref: '/environmental-monitoring',
  },
  {
    code: 'BAL-06',
    budgetName: 'Vegetation balance',
    units: 'dry tonnes/year',
    governingEquation: 'dB/dt = G - H - D',
    principalQuestion: 'Is macrophyte biomass management ecologically selective and preventing internal nutrient recycling?',
    kewConnectedSurfaceHref: '/water-systems/lakes/dal-lake',
  },
  {
    code: 'BAL-07',
    budgetName: 'Land-use balance',
    units: 'hectares/year',
    governingEquation: 'ΔA_class = A_recovered - A_converted (normalized to constant water-level datum)',
    principalQuestion: 'Is physical aquatic and wetland habitat genuinely expanding, or merely shifting between vegetation and open water?',
    kewConnectedSurfaceHref: '/earth-human-impact/change-detection-observatory',
  },
  {
    code: 'BAL-08',
    budgetName: 'Financial balance',
    units: '₹ crore/year',
    governingEquation: 'CE_i = Expenditure_lifecycle_i / ΔVerified_Ecological_Outcome_i',
    principalQuestion: 'Is public expenditure producing verified pollutant/sediment removal rather than recurring activity counts?',
    kewConnectedSurfaceHref: '/governance/environmental-accountability-observatory',
  },
];

// ─── PART XI: PERFORMANCE ACCOUNTING MATRIX (SECTION 30) ─────────────────────

export const PERFORMANCE_ACCOUNTING_INDICATORS_9: Array<{
  intervention: string;
  conventionalReporting: string;
  scientificFinancialIndicator: string;
}> = [
  {
    intervention: 'STPs',
    conventionalReporting: 'Crores spent and MLD capacity installed',
    scientificFinancialIndicator: 'Cost per kilogram of phosphorus and total nitrogen prevented from entering the lake',
  },
  {
    intervention: 'Settling basin',
    conventionalReporting: 'Basin area constructed or desilting contracts awarded',
    scientificFinancialIndicator: 'Cost per dry tonne of catchment sediment permanently intercepted and exported',
  },
  {
    intervention: 'Dredging',
    conventionalReporting: 'Machine-hours logged, slurry pumped, and crores expended',
    scientificFinancialIndicator: 'Cost per bathymetrically verified cubic metre or dry tonne permanently removed',
  },
  {
    intervention: 'Mechanical de-weeding',
    conventionalReporting: 'Truckloads, wet biomass lifted, or surface area visually cleared',
    scientificFinancialIndicator: 'Cost per kilogram of phosphorus and nitrogen permanently exported without leachate return',
  },
  {
    intervention: 'Afforestation',
    conventionalReporting: 'Number of saplings planted and hectares fenced',
    scientificFinancialIndicator: 'Cost per tonne of delivered catchment sediment prevented at Telbal/piedmont gauges',
  },
  {
    intervention: 'Rehabilitation',
    conventionalReporting: 'Number of families relocated or plots allotted',
    scientificFinancialIndicator: 'Cost per hectare of legally protected, ecologically functioning aquatic habitat recovered (with verified resident welfare)',
  },
  {
    intervention: 'Flushing',
    conventionalReporting: 'Volume of canal water diverted or gates operated',
    scientificFinancialIndicator: 'Cost per unit of verified basin water-quality gain net of downstream river pollution cost',
  },
  {
    intervention: 'Surveillance',
    conventionalReporting: 'Number of CCTV cameras or patrol boats procured',
    scientificFinancialIndicator: 'Cost per detected environmental violation resolved with physical remediation',
  },
  {
    intervention: 'Restoration',
    conventionalReporting: 'Number of beautification, jetty, or civil packages completed',
    scientificFinancialIndicator: 'Cost per unit of sustained multi-year trophic, bathymetric, and biodiversity recovery',
  },
];

// ─── PART XII: REMOTE SENSING LAND-COVER TAXONOMY (SECTION 31) ───────────────

export const LAND_COVER_CLASSIFICATIONS_10: Array<[string, string]> = [
  ['Open water', 'Water surface without dominant emergent or floating macrophyte canopy at normalized stage'],
  ['Submerged vegetation', 'Optically detectable benthic/water-column macrophyte beds below the water surface'],
  ['Floating vegetation', 'Free-floating or rooted floating-leaved plants (e.g., Nelumbo, Nymphaea, Salvinia, Azolla) covering surface water'],
  ['Emergent vegetation', 'Reeds and marshes (Phragmites, Typha, Sparganium) extending above the water surface'],
  ['Floating gardens (Radh)', 'Cultivated organic mats and moored/anchored agricultural strips requiring nutrient source/sink accounting'],
  ['Permanent islands', 'Consolidated terrestrial islands and historic settled mounds within the lake perimeter'],
  ['Built-up areas', 'Impervious residential, hotel, commercial, road, and shoreline embankment surfaces'],
  ['Seasonal inundation', 'Stage-dependent littoral zones submerged during spring snowmelt and exposed at autumn low water'],
  ['Wetlands', 'Ecologically functioning transitional reedbeds and marshes providing nutrient uptake and avian habitat'],
  ['Encroachments', 'Land conversions established strictly by cross-referencing cadastral/legal boundaries with multi-date imagery'],
];

// ─── PART XIII: 12 FUTURE SIMULATION SCENARIOS (SECTION 32) ──────────────────

export const FUTURE_SIMULATION_SCENARIOS_12: DalFutureScenarioSpec[] = [
  {
    code: 'S01',
    managementConfiguration: 'Continuation of existing conservation practices (baseline trajectory)',
    primaryTargetedBalances: 'Status-quo STP nutrient pass-through, partial sewer capture, recurring de-weeding & localized dredging',
    evaluationHorizons: '2030 · 2040 · 2050',
  },
  {
    code: 'S02',
    managementConfiguration: 'Complete peripheral, internal-hamlet, and houseboat sewerage connectivity',
    primaryTargetedBalances: 'Eliminates uncollected raw wastewater deficit (Q_s capture -> >95%), testing hydraulic-only limits without tertiary P removal',
    evaluationHorizons: '2030 · 2040 · 2050',
  },
  {
    code: 'S03',
    managementConfiguration: 'Advanced biological and chemical nitrogen and phosphorus removal (>90% TP & TN)',
    primaryTargetedBalances: 'Cuts STP effluent TP toward ≤0.2–0.5 mg/L and upgrades denitrification across all existing + Gupt Ganga plants',
    evaluationHorizons: '2030 · 2040 · 2050',
  },
  {
    code: 'S04',
    managementConfiguration: 'Optimized Telbal settling basin hydraulics and off-basin spoil export',
    primaryTargetedBalances: 'Eliminates flood short-circuiting, maintains dead storage, and ends auxiliary-basin spoil recycling',
    evaluationHorizons: '2030 · 2040 · 2050',
  },
  {
    code: 'S05',
    managementConfiguration: 'Intensified Dachigam–Telbal catchment erosion prevention',
    primaryTargetedBalances: 'Surviving vegetation cover, check-dam maintenance, slope/bank stabilization reducing S_in at source',
    evaluationHorizons: '2030 · 2040 · 2050',
  },
  {
    code: 'S06',
    managementConfiguration: 'Scientifically targeted, core-verified dredging with upland containment',
    primaryTargetedBalances: 'Selective removal of high-labile-P internal sediment hotspots verified by pre/post multibeam bathymetry',
    evaluationHorizons: '2030 · 2040 · 2050',
  },
  {
    code: 'S07',
    managementConfiguration: 'Ecologically optimized selective macrophyte harvesting & off-basin composting',
    primaryTargetedBalances: 'Phenology-timed harvesting protecting fish spawning beds and native flora while preventing leachate return',
    evaluationHorizons: '2030 · 2040 · 2050',
  },
  {
    code: 'S08',
    managementConfiguration: 'Internal channel de-blocking and environmentally audited hydrological circulation',
    primaryTargetedBalances: 'Multi-basin hydrodynamic connectivity reducing stagnant residence-time pockets without unmitigated Jhelum pollution transfer',
    evaluationHorizons: '2030 · 2040 · 2050',
  },
  {
    code: 'S09',
    managementConfiguration: 'Integrated restoration of peripheral constructed/natural wetlands and littoral buffers',
    primaryTargetedBalances: 'Polishing stormwater and tributary inflows while rebuilding biodiversity and shoreline habitat',
    evaluationHorizons: '2030 · 2040 · 2050',
  },
  {
    code: 'S10',
    managementConfiguration: 'Comprehensive mathematically integrated intervention across all components (S02–S09)',
    primaryTargetedBalances: 'Simultaneous closure of external/internal P, N, sediment, water, and oxygen budgets',
    evaluationHorizons: '2030 · 2040 · 2050',
  },
  {
    code: 'S11',
    managementConfiguration: 'Climate-change-adjusted restoration under warming water & flash-runoff extremes',
    primaryTargetedBalances: 'Tests S10 resilience against warmer summer stratification, lower DO saturation, and intense Telbal storm pulses',
    evaluationHorizons: '2030 · 2040 · 2050',
  },
  {
    code: 'S12',
    managementConfiguration: 'Unchecked population, commercial hotel, and peak-tourism loading sensitivity',
    primaryTargetedBalances: 'Stress-tests sewer, STP, solid-waste, and water-demand ceilings under accelerated urban/tourism growth',
    evaluationHorizons: '2030 · 2040 · 2050',
  },
];

// ─── PART XIV: 10 THEMATIC VOLUMES & 62 SCIENTIFIC CHAPTERS ──────────────────

export const DYING_LAKE_VOLUMES_10: DyingLakeVolumeSpec[] = [
  {
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'The History of Dal Lake Conservation',
    chapterRange: 'Chapters 01–06',
    thematicMandate:
      'Reconstructs Dal Lake’s post-glacial geomorphology, twentieth-century hydrological alterations, original conservation blueprints (1978–NLCP–PMDP), institutional reorganizations (LAWDA to LCMA), and statutory promises.',
  },
  {
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'The Catchment and Settling Basin',
    chapterRange: 'Chapters 07–12',
    thematicMandate:
      'Audits the 316 km² Dachigam–Telbal–Zabarwan watershed, RUSLE soil-loss mechanics, Telbal flood sediment pulses, settling-basin surface-overflow mathematics (7–57% historical efficiency), and the auxiliary-basin disposal paradox.',
  },
  {
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The Peripheral Sewerage and STP Ring',
    chapterRange: 'Chapters 13–20',
    thematicMandate:
      'Evaluates total basin wastewater generation (Q_s), network connectivity gaps, and independent engineering audits for Hazratbal, Habak, Laam, Brari Numbal, Nallah Amir Khan (36.70 MLD), and under-construction Gupt Ganga (30.0 MLD).',
  },
  {
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'The Nutrient Economy of Dal Lake',
    chapterRange: 'Chapters 21–26',
    thematicMandate:
      'Quantifies why BOD-treated effluent still fuels eutrophication, closes the lake-wide phosphorus and nitrogen mass balances, characterizes internal benthic release, and models critical Vollenweider/Carlson assimilate thresholds.',
  },
  {
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'Mechanical De-Weeding',
    chapterRange: 'Chapters 27–32',
    thematicMandate:
      'Examines macrophyte ecology, mechanical harvesting growth-loss equations (dB/dt = G - H - D), ₹28.01 crore CAG-audited expenditure, vegetative fragmentation, dry-tissue nutrient export, and shoreline leachate.',
  },
  {
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'Dredging and Desilting',
    chapterRange: 'Chapters 33–38',
    thematicMandate:
      'Integrates multi-epoch bathymetry, volumetric cut equations, ₹11.02 crore CAG-audited dredging records, slurry-to-dry-solids conversions, contaminant resuspension risks, and permanent upland disposal verification.',
  },
  {
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'Water Balance and Flushing',
    chapterRange: 'Chapters 39–44',
    thematicMandate:
      'Reconstructs Dal–Nigeen’s hydrological budget, the unrealized 2 m³/s Padshahi Canal proposal, residence-time physics (34.7 vs 24.8 days), blocked internal channels, downstream Jhelum pollution export, and 2D/3D hydrodynamics.',
  },
  {
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'People, Livelihoods and Land Conversion',
    chapterRange: 'Chapters 45–50',
    thematicMandate:
      'Assesses houseboat sanitation hydraulics, traditional floating-garden (radh) nutrient source/sink balances, internal hamlet sewage, rehabilitation outcomes, tourism carrying capacity, and environmental justice for Dal communities.',
  },
  {
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: 'Remote Sensing and Ecological Accountability',
    chapterRange: 'Chapters 51–56',
    thematicMandate:
      'Harmonizes six decades of CORONA, Landsat, and Sentinel-1/2 imagery across 10 land-cover classes to resolve open-water area contradictions, separates beautification from restoration, and establishes lifecycle outcome economics.',
  },
  {
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The Scientific Future of Dal Lake',
    chapterRange: 'Chapters 57–62',
    thematicMandate:
      'Unites all eight environmental/fiscal budgets, simulates 12 conservation futures (S01–S12) to 2050, formulates an integrated engineering restoration blueprint, and charters the permanent KEW Dal Lake Conservation Performance Observatory.',
  },
];

function slugifyChapter(num: string, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `chapter-${num}-${clean}`;
}

const RAW_62_CHAPTERS: Array<{
  number: string;
  volumeRoman: DyingLakeVolumeSpec['volumeRoman'];
  title: string;
  eq: string;
  focus: string;
  inputs: string;
}> = [
  // VOLUME I (01–06)
  { number: '01', volumeRoman: 'I', title: 'The Lake Before Conservation', eq: 'Baseline morphometry (A_0, V_0, z_max)', focus: 'Reconstructs pre-1970s Dal–Nigeen basin hydrology, spring inflows, clear-water macrophyte clearings, and historical Survey of India boundaries.', inputs: 'Survey of India sheets, archival limnological surveys, 1960s CORONA photography.' },
  { number: '02', volumeRoman: 'I', title: 'The Geological and Hydrological Origins of Dal Lake', eq: 'Post-glacial Jhelum floodplain & Zabarwan alluvial fan geometry', focus: 'Examines lacustrine sediment stratigraphy, karst/alluvial groundwater seepage, and tectonic-fluvial controls across Hazratbal, Bod Dal, Gagribal, and Nigeen.', inputs: 'Deep sediment cores, hydrogeological maps, piezo-head transects.' },
  { number: '03', volumeRoman: 'I', title: 'A Century of Ecological Transformation', eq: 'Multi-decadal land-water conversion & trophic trajectory', focus: 'Traces Boulevard embanking, Nallah Mar infilling, catchment deforestation, urban sewer inflows, and hydrological compartmentalization across the 20th century.', inputs: 'Historical municipal engineering records, archival maps, published Kashmir limnology (1960–2000).' },
  { number: '04', volumeRoman: 'I', title: 'The Original Conservation Blueprint', eq: 'Original NLCP / FR / DPR mass-removal assumptions', focus: 'Audits the foundational engineering reports (1978 Enex, Roorkee/AHEC, NLCP DPRs) to extract the exact quantitative assumptions on which Dal conservation was built.', inputs: 'Original Dal Lake Conservation Plan & NLCP-approved Detailed Project Reports (P0).' },
  { number: '05', volumeRoman: 'I', title: 'The Institutional History of Saving Dal', eq: 'Governance, mandate & statutory authority mapping', focus: 'Traces institutional transitions from UEED/LAWDA to LCMA, judicial monitoring committees, and overlapping central/UT funding architectures.', inputs: 'Statutory notifications, High Court PIL orders, CAG Reports (2006, 2011, 2025).' },
  { number: '06', volumeRoman: 'I', title: 'What the Conservation Plans Promised', eq: 'Target vs. achieved engineering KPIs (1997–2026)', focus: 'Compiles every quantitative target promised across successive conservation packages—bathymetric depth, TP/TN concentrations, sewer capture, and sediment arrest.', inputs: 'Sanctioned DPR milestone tables, PMDP dockets, legislative replies.' },

  // VOLUME II (07–12)
  { number: '07', volumeRoman: 'II', title: 'The Catchment That Determines the Lake', eq: 'Watershed hypsometry (1,583–4,300 m) & runoff partitioning', focus: 'Characterizes sub-catchments (Dachigam, Telbal, Zabarwan, Merakhshah) governing water, sediment, and diffuse nutrient delivery to Dal Lake.', inputs: 'Copernicus/ALOS DEMs, land-use/land-cover layers, meteorological station series.' },
  { number: '08', volumeRoman: 'II', title: 'Telbal Nallah and the Geography of Sediment', eq: 'Q_sed = a · Q^b sediment-rating curves & event hysteresis', focus: 'Quantifies snowmelt and convective storm discharge pulses through Telbal Nallah—the primary northern water and sediment artery into Hazratbal basin.', inputs: 'Stage-discharge gauges, suspended-sediment concentration (SSC) storm sampling.' },
  { number: '09', volumeRoman: 'II', title: 'The Mathematics of Catchment Erosion', eq: 'RUSLE: A = R × K × LS × C × P & Sediment Delivery Ratio (SDR)', focus: 'Integrates rainfall erosivity, soil erodibility, steep Zabarwan/Dachigam slopes, and surviving canopy cover to test whether catchment works reduced erosion.', inputs: 'Sub-daily rainfall, soil grain-size/OM surveys, plantation survival audits (P1).' },
  { number: '10', volumeRoman: 'II', title: 'The Settling Basin: Engineering Assumptions Versus Reality', eq: 'Design overflow rate (Q_design / A_basin) vs. field bathymetry', focus: 'Compares approved DPR surface area, depth, and design discharge of the Telbal settling basin against constructed dimensions and accumulated silt.', inputs: 'Original settling-basin hydraulic design sheets (P0) & repeat bathymetry.' },
  { number: '11', volumeRoman: 'II', title: 'Sediment Trapping Efficiency and Hydraulic Design', eq: 'A_required = Q / V_s; η_observed = (M_in - M_out) / M_in', focus: 'Deconstructs the CAG-cited 7%–57% trapping efficiency (May 1998–June 2000) across Stokes settling velocities for clay/silt, detention times, and flood short-circuiting.', inputs: 'Synchronous inlet/outlet SSC measurements, laser diffraction particle-size distributions.' },
  { number: '12', volumeRoman: 'II', title: 'When the Settling Basin Becomes a Sediment Reservoir', eq: 'Dead-storage exhaustion, critical shear τ_c & auxiliary-basin remobilization', focus: 'Investigates the CAG-documented deposition of excavated settling-basin silt into the neighbouring auxiliary basin and tests hydraulic remobilization pathways.', inputs: 'Desilting ledgers, auxiliary-basin hydraulic connectivity surveys, flood turbidity profiles.' },

  // VOLUME III (13–20)
  { number: '13', volumeRoman: 'III', title: 'The Incomplete Peripheral Sewage Ring', eq: 'Network capture efficiency η_net = Q_delivered / Q_generated', focus: 'Digitally reconstructs trunk sewers, lateral connections, pumping stations, gravity gradients, storm cross-connections, and unintercepted shoreline outfalls.', inputs: 'Complete peripheral sewage network GIS master plan & pumping station logs (P0).' },
  { number: '14', volumeRoman: 'III', title: 'The Mathematics of Wastewater Generation', eq: 'Q_s = Q_r + Q_t + Q_c + Q_i + Q_inf (~48 MLD vs. 36.70 MLD)', focus: 'Models residential, seasonal tourist, hotel, commercial, institutional, houseboat, and groundwater-infiltration flows to verify the ~11.3 MLD theoretical deficit.', inputs: 'Census/ward demographics, tourism occupancy series, water-supply metering, sewer flow gauges.' },
  { number: '15', volumeRoman: 'III', title: 'Hazratbal: An Independent Engineering Audit', eq: '7.5 MLD rated capacity · Historical CAG: 15–49% NH₄-N, 14–52% P', focus: 'Process-level audit of Hazratbal STP: influent loading, aeration/FAB media kinetics, winter temperature sensitivity, chemical P dosing, and post-2022 refurbishment results.', inputs: 'Hazratbal STP design specs, daily operator logs, independent composite inlet/outlet lab tests.' },
  { number: '16', volumeRoman: 'III', title: 'Habak: An Independent Engineering Audit', eq: '3.2 MLD rated capacity · Historical CAG: 14–43% NH₄-N, 18–53% P', focus: 'Evaluates hydraulic utilization, stormwater dilution, biological/chemical nutrient removal, and effluent receiving pathway at Habak STP.', inputs: 'Habak STP process dossier (P0), pumping logs, contemporary 4-season effluent datasets.' },
  { number: '17', volumeRoman: 'III', title: 'Laam: An Independent Engineering Audit', eq: '4.5 MLD rated capacity · Historical CAG: 14–47% NH₄-N, 39–56% P', focus: 'Examines eastern-rim commercial/residential connectivity, sludge dewatering, denitrification deficit, and contemporary phosphorus export at Laam STP.', inputs: 'Laam STP engineering specifications, energy/chemical consumption ledgers, outlet sampling.' },
  { number: '18', volumeRoman: 'III', title: 'Brari Numbal: An Independent Engineering Audit', eq: '16.1 MLD rated capacity · Historical CAG: 57–65% NH₄-N, 59–66% P', focus: 'Audits the largest plant in the 36.70 MLD ring—assessing actual sewage inflow, lagoon exchange, nutrient mass discharge, and sludge disposal.', inputs: 'Brari Numbal STP DPR, flowmeter records, Brari Numbal–Dal–Jhelum hydraulic gate records.' },
  { number: '19', volumeRoman: 'III', title: 'Nallah Amir Khan: An Independent Engineering Audit', eq: '5.4 MLD rated capacity · Historical CAG: 31–41% NH₄-N, 39–53% P', focus: 'Investigates feeder pumping reliability, bypass frequency, nutrient speciation across treatment stages, and channel water-quality response.', inputs: 'Nallah Amir Khan STP process records, bypass logs, downstream water-quality series.' },
  { number: '20', volumeRoman: 'III', title: 'Gupt Ganga: Will the New Plant Solve the Old Problem?', eq: '30.0 MLD under construction · BNR & cold-climate P/N guarantees', focus: 'Forensic review of the Gupt Ganga 30 MLD DPR: determines net new vs. replacement capacity, trunk-sewer readiness, and whether tertiary N/P removal >90% is engineered.', inputs: 'Gupt Ganga 30 MLD DPR, process guarantee schedules, trunk-sewer alignment maps.' },

  // VOLUME IV (21–26)
  { number: '21', volumeRoman: 'IV', title: 'Why Treated Sewage Can Still Feed Eutrophication', eq: 'L = Q × C (36.7 MLD × 2 mg/L P = 26.79 t P/yr illustrative)', focus: 'Demonstrates why BOD/TSS compliance without tertiary phosphorus and nitrogen stripping leaves treated STP effluent potent enough to drive hypereutrophic blooms.', inputs: 'Daily STP outlet orthophosphate, TP, NH₄-N, NO₃-N, and TN mass-flux measurements.' },
  { number: '22', volumeRoman: 'IV', title: 'The Phosphorus Budget', eq: 'dM_P/dt = L_ext + L_int - E_out - E_harv - E_dredge - B_burial', focus: 'Constructs the lake-wide and basin-resolved dissolved and particulate phosphorus budget with strict non-overlapping accounting boundaries.', inputs: 'Tributary, STP, ungauged sewer, atmospheric, benthic-flux, harvest, dredge, and outlet P series.' },
  { number: '23', volumeRoman: 'IV', title: 'The Nitrogen Budget', eq: '5-species N audit: NH₄-N, NO₂-N, NO₃-N, Organic N & Total N', focus: 'Resolves the CAG-observed effluent nitrate increase by separating aerobic nitrification from true anoxic denitrification and cyanobacterial N₂ fixation.', inputs: 'Full 5-parameter nitrogen speciation across STPs, inflows, water column, and sediment-water interface.' },
  { number: '24', volumeRoman: 'IV', title: 'Sediment as an Internal Nutrient Reservoir', eq: 'F_P_int = f(DO_bottom, Eh, T, Fe-P, Al-P, Ca-P, Labile-P)', focus: 'Quantifies legacy phosphorus stored in Dal Lake’s anoxic organic ooze and measures diffusive/reductive internal P release when summer bottom DO drops.', inputs: 'Benthic chamber incubations, porewater peepers, sequential P-fractionation sediment cores.' },
  { number: '25', volumeRoman: 'IV', title: 'Algal Blooms, Oxygen Depletion and Ecological Instability', eq: 'Chl-a, Phycocyanin, Carlson TSI & diurnal DO/SOD balance', focus: 'Links nutrient stoichiometry and warm stagnant water to Microcystis cyanobacteria dominance, cyanotoxin risk, nocturnal hypoxia, and Schizothorax stress.', inputs: 'Sentinel-2 NDCI series, KEW Algal Bloom Intelligence records (AB-DAL-001), sonde DO profiles.' },
  { number: '26', volumeRoman: 'IV', title: 'The Maximum Nutrient Load Dal Lake Can Sustain', eq: 'L_crit(P) = v_s · C_target · (1 + √τ_w) / z_mean (Vollenweider / dynamic)', focus: 'Calculates basin-specific critical phosphorus and nitrogen loading ceilings required to shift Hazratbal, Bod Dal, Gagribal, and Nigeen from eutrophic toward mesotrophic state.', inputs: 'Calibrated basin volumes, residence times, settling velocities, and paleolimnological targets.' },

  // VOLUME V (27–32)
  { number: '27', volumeRoman: 'V', title: 'Why Aquatic Vegetation Grows', eq: 'Light attenuation (K_d), sediment nutrients & macrophyte guild competition', focus: 'Examines the physiological ecology of Nelumbo, Ceratophyllum, Myriophyllum, Hydrilla, Potamogeton, and Salvinia as functional ecosystem indicators rather than mere "weeds".', inputs: 'Seasonal quadrat biomass surveys, PAR light profiles, sediment porewater nutrients.' },
  { number: '28', volumeRoman: 'V', title: 'The Mathematics of Mechanical Harvesting', eq: 'dB/dt = G - H - D (Growth vs. Harvest vs. Decomposition)', focus: 'Models seasonal intrinsic growth rates against harvester cutting capacity to test when mechanical removal falls behind summer exponential regrowth.', inputs: 'Harvester GPS tracks, seasonal biomass accumulation plots, cutting-depth logs.' },
  { number: '29', volumeRoman: 'V', title: 'Machines, Manpower and Public Expenditure', eq: 'CAG 2016–2022 audit: ₹28.01 cr total · ₹16.18 cr (57.8%) outside specified months', focus: 'Audits machine procurement, fuel/O&M contracts, manual de-weeding dockets, and seasonal timing compliance against aquatic plant phenology.', inputs: 'Mechanical harvester procurement & logbooks, 2016–2026 de-weeding vouchers (P1).' },
  { number: '30', volumeRoman: 'V', title: 'When Harvesting Encourages Regeneration', eq: 'Propagule dispersal, benthic resuspension & fish-habitat loss', focus: 'Tests whether uncollected stem fragments, root-crown survival, sediment clouding, and spawning-season cutting accelerate invasive dominance and phytoplankton shifts.', inputs: 'Controlled before-after-control-impact (BACI) harvester plots, ichthyoplankton net tows.' },
  { number: '31', volumeRoman: 'V', title: 'The Nutrients Hidden Inside Harvested Weeds', eq: 'P_h = B_w × f_d × f_p (10,000 t wet -> ~3.00 t P, ~20.00 t N illustrative)', focus: 'Measures species-specific moisture content (88–94% water) and dry-tissue C:N:P stoichiometry to establish true kilograms of P and N lifted per thousand truckloads.', inputs: 'Oven-dry mass fractions (f_d) and ICP/colorimetric tissue P & N assays across seasons.' },
  { number: '32', volumeRoman: 'V', title: 'Where Do the Weeds Go After Removal?', eq: 'Net nutrient export = P_harvested - P_leachate_returned', focus: 'Tracks harvested vegetation from barge unloading to shoreline dumps and composting yards to verify that mineralized nutrients do not drain back into Dal Lake.', inputs: 'Shoreline stockpile coordinates, leachate drainage chemistry, off-watershed compost records (P1).' },

  // VOLUME VI (33–38)
  { number: '33', volumeRoman: 'VI', title: 'The Disappearing Depth of Dal Lake', eq: 'Multi-decadal hypsographic curve V(z) & mean-depth contraction', focus: 'Synthesizes historical soundings and contemporary surveys across Hazratbal, Bod Dal, Gagribal, Nigeen, and interior channels to quantify lost water storage.', inputs: 'Historical and contemporary bathymetric datasets (P0), water-level gauge datum records.' },
  { number: '34', volumeRoman: 'VI', title: 'Bathymetry: Measuring What Cannot Be Seen', eq: 'Dual-frequency echosounding (200/24 kHz) & RTK-GNSS vertical datum', focus: 'Establishes reproducible hydrographic survey protocols capable of distinguishing fluid mud lutoclines from consolidated lakebed.', inputs: 'RTK-GNSS benchmarks, acoustic impedance calibration cores, CAG bathymetric audit notes.' },
  { number: '35', volumeRoman: 'VI', title: 'The Mathematics of Dredging', eq: 'V_d = ∬_A (z_before - z_after) dA; ΔS = S_in + S_int - S_out - S_rem', focus: 'Evaluates ₹11.02 crore historical dredging expenditure (CAG up to March 2022) and 2023–2026 channel dredging claims against independent pre/post volumetric surfaces.', inputs: 'Dredging contracts, pre/post bathymetric grids, channel cross-sections (P1).' },
  { number: '36', volumeRoman: 'VI', title: 'Slurry Volume Versus Actual Sediment Removal', eq: 'V_solids = Q_slurry × f_vol (120 m³/h -> 12–36 m³/h solids at 10–30%)', focus: 'Audits suction-cutter pump curves, slurry density meters, particle density, and in-situ porosity so pumped water is never billed or reported as removed lakebed.', inputs: 'Dredger pump specifications, inline density/flow logs, hopper/lagoon solids mass balances.' },
  { number: '37', volumeRoman: 'VI', title: 'The Ecological Risks of Sediment Disturbance', eq: 'Plume turbidity, porewater NH₄⁺/PO₄³⁻ release & heavy-metal mobility', focus: 'Assesses benthic macroinvertebrate destruction, dissolved-oxygen sag, and internal nutrient mobilization triggered by uncurtained hydraulic dredging.', inputs: 'Turbidity-curtain compliance, elutriate toxicity tests, heavy-metal & P-fractionation cores.' },
  { number: '38', volumeRoman: 'VI', title: 'Dredging Without Permanent Sediment Export', eq: 'Permanent removal verification & return-water nutrient accounting', focus: 'Traces dredged spoil pipelines and haul trucks to final disposal sites, measuring decant return-water loads and long-term containment stability.', inputs: 'Disposal-site topographic surveys, bund groundwater/decant water quality records (P1).' },

  // VOLUME VII (39–44)
  { number: '39', volumeRoman: 'VII', title: 'The Water Budget of Dal Lake', eq: 'Q_Telbal + Q_springs + P_direct - Q_DalGate - Q_NALK - E_open_macrophyte', focus: 'Closes the monthly hydrological budget including elusive sub-lacustrine karst/alluvial spring inflows and evapotranspiration from floating gardens and reeds.', inputs: 'ADCP inflow/outflow gaugings, pan/eddy-covariance ET, piezometers, stable isotopes (δ¹⁸O/δ²H).' },
  { number: '40', volumeRoman: 'VII', title: 'The Padshahi Canal Intervention', eq: 'Proposed Q_aug = 2.0 m³/s (172.8 MLD; 10.37 Mm³ per 60 days)', focus: 'Examines the unrealized Sindh Nallah–Padshahi Canal diversion (CAG Dec 2022): evaluating incoming Sindh sediment, cold temperature shock, nutrients, and seasonal availability.', inputs: 'Padshahi Canal feasibility DPRs (P1), Sindh Nallah seasonal SSC/nutrient/temperature series.' },
  { number: '41', volumeRoman: 'VII', title: 'Hydraulic Residence Time and Water Circulation', eq: 'τ = V / Q_out (15 Mm³: 34.7 d at 5 m³/s -> 24.8 d at 7 m³/s idealized)', focus: 'Contrasts idealized steady-volume residence time against real spatially heterogeneous age-of-water distributions across dead-end backwaters and houseboat moorings.', inputs: 'Basin-specific volumes, Dal Gate & Nallah Amir Khan weir operation logs, tracer/drogue studies.' },
  { number: '42', volumeRoman: 'VII', title: 'The Blocked Channels of Dal', eq: 'Hydraulic conductivity of interior waterways, culverts & bunds', focus: 'Maps culverted causeways, silted navigation arteries, encroached narrows, and floating-garden constrictions creating anoxic stagnant pockets.', inputs: 'High-resolution channel width/depth surveys, September 2026 10-km channel dredging records.' },
  { number: '43', volumeRoman: 'VII', title: 'Does Flushing Restore a Lake or Export Its Pollution?', eq: 'Exported River Load L_Jhelum = Q_out × C_outlet', focus: 'Evaluates downstream assimilative capacity of the Jhelum River and Wular Lake when Dal Gate and Nallah Amir Khan flush concentrated urban nutrients downstream.', inputs: 'Dal Gate / NALK outlet mass-flux series, downstream Jhelum DO/nutrient longitudinal profiles.' },
  { number: '44', volumeRoman: 'VII', title: 'A Hydrodynamic Model of Dal and Nigeen', eq: '2D/3D shallow-water Navier–Stokes + advection-dispersion-reaction', focus: 'Establishes the open boundary-condition, wind-stress, bathymetric, and weir-control protocol for a calibrated multi-basin Dal–Nigeen hydrodynamic model.', inputs: 'Continuous wind/radiation station, high-res bathymetric mesh, synchronous multi-basin calibration sondes.' },

  // VOLUME VIII (45–50)
  { number: '45', volumeRoman: 'VIII', title: 'Houseboats and the Mathematics of Sanitation', eq: 'Q_h = N_h × O_h × q_p (registered vs. connected vs. vacuum/gravity captured)', focus: 'Distinguishes nominal pipeline attachment from verified zero-discharge collection across Dal and Nigeen houseboats during peak summer occupancy.', inputs: 'Houseboat registration, vacuum/holding-tank commissioning & pump-out flow records (P1).' },
  { number: '46', volumeRoman: 'VIII', title: 'Floating Gardens and Nutrient Loading', eq: 'ΔN_radh, ΔP_radh = Fertilizer + Decay - Crop_harvest_uptake', focus: 'Performs empirical nutrient accounting on traditional radh floating gardens—separating sustainable organic vegetable uptake from synthetic fertilizer/pesticide leaching and illegal land infilling.', inputs: 'Agronomic input surveys, radh mat core chemistry, historical polygon expansion series.' },
  { number: '47', volumeRoman: 'VIII', title: 'Internal Settlements and Untreated Wastewater', eq: 'Unsewered island/hamlet population × per-capita BOD/N/P loading', focus: 'Quantifies domestic greywater, blackwater, and solid-waste fluxes from interior lake settlements inaccessible to conventional peripheral gravity sewers.', inputs: 'LCMA GIS hamlet census, decentralized sanitation options audit, channel coliform/NH₄⁺ transects.' },
  { number: '48', volumeRoman: 'VIII', title: 'Rehabilitation and the Recovery of Aquatic Space', eq: 'Net recovered water area (ha) & pollution prevented per ₹ crore spent', focus: 'Audits Rakh-i-Arth and rehabilitation schemes across both human-rights/housing adequacy and legally protected, re-watered Dal Lake area free of re-occupation.', inputs: 'Rehabilitation financial, allotment, sanitation, and demolished/restored parcel GIS records (P1).' },
  { number: '49', volumeRoman: 'VIII', title: 'Tourism, Commercial Development and Carrying Capacity', eq: 'Seasonal peak tourist equivalent population & Boulevard commercial loads', focus: 'Models hotel, restaurant, shikara, and shoreline commercial pressures on sewage, solid waste, water abstraction, and littoral disturbance.', inputs: 'Tourism arrival series, Boulevard hotel STP/ETP compliance dockets, sewer peak-flow hydrographs.' },
  { number: '50', volumeRoman: 'VIII', title: 'Environmental Justice for Dal Lake Communities', eq: 'Livelihood dependence, housing dignity & equitable co-management metrics', focus: 'Ensures conservation engineering never treats hereditary lake fishers, hanji families, and small cultivators as ecological adversaries without dignified infrastructure and livelihood security.', inputs: 'Socio-economic household baselines, fishery yield trends, participatory governance charters.' },

  // VOLUME IX (51–56)
  { number: '51', volumeRoman: 'IX', title: 'Dal Lake Through Six Decades of Satellite Imagery', eq: 'Stage-normalized multi-sensor change detection (1960s CORONA -> 2026 Sentinel-1/2)', focus: 'Builds a reproducible six-decade remote-sensing archive harmonizing sensor resolution, seasonal phenology, and lake water-level gauge height.', inputs: 'Declassified CORONA, Landsat MSS/TM/ETM+/OLI, Sentinel-1 SAR, Sentinel-2 MSI, PlanetScope.' },
  { number: '52', volumeRoman: 'IX', title: 'The Changing Geography of Open Water', eq: '10-class confusion-matrix accuracy & boundary reconciliation (>20.3 km² vs. CAG)', focus: 'Resolves the apparent contradiction between government reports of >20.3 km² open expanse and CAG-cited 2007–2020 water-body reductions by separating weed clearance and stage shifts from permanent boundary recovery.', inputs: '10-class land-cover polygons, ground-truth validation points, gauge-stage normalization curves.' },
  { number: '53', volumeRoman: 'IX', title: 'The Difference Between Beautification and Restoration', eq: 'Impervious shoreline ratio, fountain aeration vs. SOD & trophic separation', focus: 'Audits walkways, viewing decks, lighting, eco-parks, and decorative fountains to separate visual urban waterfront cosmetics from biophysical lake recovery.', inputs: 'Project-wise itemised BOQs, shoreline habitat maps, dissolved-oxygen/phosphorus before-after series.' },
  { number: '54', volumeRoman: 'IX', title: 'Measuring Biodiversity and Ecological Recovery', eq: 'Native vs. exotic fish CPUE, benthic biotic index & waterbird guild trends', focus: 'Evaluates whether decades of expenditure are restoring native Schizothorax spp., diverse submerged flora, macroinvertebrates, and breeding/wintering avifauna.', inputs: 'Fisheries catch-per-unit-effort archives, eDNA/gillnet surveys, Asian Waterbird Census counts.' },
  { number: '55', volumeRoman: 'IX', title: 'Follow the Money: The Economics of Lake Conservation', eq: 'Reconciled lifecycle ledger: Sanctioned -> Released -> Expended -> Asset Operating', focus: 'Reconciles NLCP, PMDP, UT capex, AMRUT, and O&M outlays across LAWDA/LCMA while eliminating multi-scheme double counting.', inputs: 'Audited annual accounts of LAWDA & LCMA (P1), CAG Report No. 4 of 2025 financial tables.' },
  { number: '56', volumeRoman: 'IX', title: 'When Expenditure Becomes the Measure of Success', eq: '9-indicator scientific outcome cost-effectiveness matrix (₹/kg P, ₹/dry t)', focus: 'Replaces input reporting (crores spent, machines bought, trees planted) with verified marginal abatement cost curves per kilogram of P/N and dry tonne of silt removed.', inputs: 'Lifecycle asset capex + electricity/manpower O&M paired with verified physical removal ledgers.' },

  // VOLUME X (57–62)
  { number: '57', volumeRoman: 'X', title: 'The Eight Balances That Determine the Lake’s Future', eq: 'Coupled 8-budget state vector [Water, Sediment, P, N, O₂, Biomass, Land, ₹]', focus: 'Integrates all eight environmental and financial balances into a single non-double-counted accounting matrix for annual public reporting.', inputs: 'Synthesized outputs of Volumes I–IX across all Dal–Nigeen sub-basins.' },
  { number: '58', volumeRoman: 'X', title: 'Reconstructing the Original Conservation Mathematics', eq: 'Hindcast audit: Why 1990s–2020s engineering components drifted out of balance', focus: 'Tests whether historical shortfalls stemmed from flawed DPR design equations, incomplete execution, O&M breakdowns, or unmodeled urban/climate growth.', inputs: 'Original NLCP/IIT Roorkee DPRs (P0/P1) vs. 30-year observed loading trajectories.' },
  { number: '59', volumeRoman: 'X', title: 'What Happens if the Existing Strategy Continues?', eq: 'Baseline Scenario S01 vs. partial scenarios S02–S09 (2030 · 2040 · 2050)', focus: 'Simulates nutrient accumulation, benthic anoxia, macrophyte/cyanobacteria shifts, and bathymetric infilling if interventions remain fragmented.', inputs: 'Calibrated dynamic mass-balance & ecological response ensemble (strictly withholding uncalibrated collapse dates).' },
  { number: '60', volumeRoman: 'X', title: 'An Integrated Scientific Restoration Blueprint', eq: 'Comprehensive Scenarios S10–S12 optimization under climate & tourism stress', focus: 'Defines the sequenced, mathematically closed engineering roadmap—tertiary P/N removal, complete sewer capture, source erosion control, verified dredging, and buffer restoration.', inputs: 'Multi-objective cost-effectiveness & ecological threshold optimization.' },
  { number: '61', volumeRoman: 'X', title: 'An Independent Dal Lake Accountability Observatory', eq: '12-module KEW open architecture reusing Water Systems, Algal Bloom & SCDO', focus: 'Specifies open telemetry, laboratory QA/QC, bathymetric, satellite, and fiscal data standards for continuous public verification inside Kashmir EcoWatch.', inputs: 'KEW Master Lake Registry, Algal Bloom Intelligence, Change Detection Observatory & PIL dockets.' },
  { number: '62', volumeRoman: 'X', title: 'The Mathematics of Saving a Dying Lake', eq: 'dM_P/dt < 0 · ΔS ≤ 0 · DO > DO_crit · Verified Ecological Resilience', focus: 'Concludes the ten-volume investigation with the binding scientific balance sheet against which every future rupee and engineering claim for Dal Lake must be judged.', inputs: 'Complete Monograph 03 synthesis, independent Stage 05 peer-review protocol & statutory right-of-reply.' },
];

export const DYING_LAKE_CHAPTERS_62: DyingLakeChapterProtocol[] = RAW_62_CHAPTERS.map((ch) => {
  const vol = DYING_LAKE_VOLUMES_10.find((v) => v.volumeRoman === ch.volumeRoman)!;
  return {
    number: ch.number,
    slug: slugifyChapter(ch.number, ch.title),
    volumeRoman: ch.volumeRoman,
    volumeTitle: vol.volumeTitle,
    title: ch.title,
    governingEquationsOrMetrics: ch.eq,
    analyticalFocus: ch.focus,
    requiredDocumentaryAndFieldInputs: ch.inputs,
    researchStatus:
      'Proposed Monograph 03 Chapter Protocol · Documentary Retrieval (Part XV) & Stage 05 External Engineering Review Required Prior to Definitive Conclusions',
  };
});

export function getMonograph03ChapterBySlug(slug: string): DyingLakeChapterProtocol | null {
  return DYING_LAKE_CHAPTERS_62.find((c) => c.slug === slug) || null;
}

// ─── PART XV: 23 DOCUMENTARY REQUIREMENTS (P0 / P1 / P2) ─────────────────────

export const REQUIRED_ENGINEERING_DOCUMENTS_23: DalDocumentaryRequirement[] = [
  // P0 (8)
  { code: 'DOC-P0-01', priority: 'P0', documentTitle: 'Original Dal Lake Conservation and Management Plan', engineeringVerificationPurpose: 'Establish baseline bathymetric, hydrological, and ecological targets set at programme inception.', acquisitionStatus: 'Outstanding · Official Repository / Public Information Request Required' },
  { code: 'DOC-P0-02', priority: 'P0', documentTitle: 'Original NLCP-approved Detailed Project Report', engineeringVerificationPurpose: 'Verify sanctioned engineering sizing, mass-balance equations, and design performance guarantees.', acquisitionStatus: 'Outstanding · Official Repository / Public Information Request Required' },
  { code: 'DOC-P0-03', priority: 'P0', documentTitle: 'Original settling basin hydraulic design and calculations', engineeringVerificationPurpose: 'Test design overflow rate (Q/A), target particle diameter, and detention time against actual Telbal floods.', acquisitionStatus: 'Outstanding · Official Repository / Public Information Request Required' },
  { code: 'DOC-P0-04', priority: 'P0', documentTitle: 'Complete peripheral sewage network master plan', engineeringVerificationPurpose: 'Audit trunk/lateral coverage, pumping stations, gravity gradients, and unconnected gaps via GIS.', acquisitionStatus: 'Outstanding · Official Repository / Public Information Request Required' },
  { code: 'DOC-P0-05', priority: 'P0', documentTitle: 'Individual STP design and process specifications', engineeringVerificationPurpose: 'Verify whether Hazratbal, Habak, Laam, Brari Numbal, Nallah Amir Khan & Gupt Ganga include biological/chemical >90% N & P removal.', acquisitionStatus: 'Outstanding · Official Repository / Public Information Request Required' },
  { code: 'DOC-P0-06', priority: 'P0', documentTitle: 'Original inlet and outlet water-quality datasets', engineeringVerificationPurpose: 'Compute flow-weighted mass removal (L = Q × C) across historical and post-refurbishment periods.', acquisitionStatus: 'Partial Historical Summary via CAG 2025 Table 4.2 · Full Raw Series Outstanding' },
  { code: 'DOC-P0-07', priority: 'P0', documentTitle: 'Historical sediment loading observations', engineeringVerificationPurpose: 'Reconstruct Telbal and piedmont suspended-sediment fluxes and settling-basin trapping efficiency.', acquisitionStatus: '1998–2000 Summary Cited in CAG 2025 · Continuous Gauge Series Outstanding' },
  { code: 'DOC-P0-08', priority: 'P0', documentTitle: 'Historical bathymetric surveys and current bathymetry', engineeringVerificationPurpose: 'Calculate true volumetric lakebed elevation change V_d = ∬(z_before - z_after)dA and net infilling.', acquisitionStatus: 'Outstanding · Official Repository / Public Information Request Required' },

  // P1 (10)
  { code: 'DOC-P1-01', priority: 'P1', documentTitle: 'Mechanical harvester procurement and performance records', engineeringVerificationPurpose: 'Audit rated cutting throughput, operational machine-hours, fuel logs, and seasonal deployment windows.', acquisitionStatus: 'Partial Summary via CAG 2025 · Contract & Logbook Files Outstanding' },
  { code: 'DOC-P1-02', priority: 'P1', documentTitle: 'Annual weed harvesting and disposal records', engineeringVerificationPurpose: 'Verify wet/dry biomass exported and confirm leachate-isolated off-watershed disposal.', acquisitionStatus: 'Outstanding · Institutional Request Queued' },
  { code: 'DOC-P1-03', priority: 'P1', documentTitle: 'Dredging contracts and machine specifications', engineeringVerificationPurpose: 'Separate pumped slurry volume from actual volumetric/dry-mass sediment removal.', acquisitionStatus: 'Partial Expenditure Anchor (₹11.02 cr) via CAG 2025 · Machine Specs Outstanding' },
  { code: 'DOC-P1-04', priority: 'P1', documentTitle: 'Sediment disposal and disposal-site survey records', engineeringVerificationPurpose: 'Verify permanent upland containment versus auxiliary-basin or lakeside redeposition.', acquisitionStatus: 'Outstanding · Institutional Request Queued' },
  { code: 'DOC-P1-05', priority: 'P1', documentTitle: 'Catchment treatment DPRs and plantation survival reports', engineeringVerificationPurpose: 'Evaluate multi-year sapling survival, check-dam storage, and delivered sediment reduction beyond planting counts.', acquisitionStatus: 'Outstanding · Institutional Request Queued' },
  { code: 'DOC-P1-06', priority: 'P1', documentTitle: 'Padshahi Canal engineering feasibility documents', engineeringVerificationPurpose: 'Assess proposed 2 m³/s Sindh Nallah water quality, sediment load, temperature, and downstream Jhelum impacts.', acquisitionStatus: 'CAG Dec 2022 Status Recorded · Engineering DPR Outstanding' },
  { code: 'DOC-P1-07', priority: 'P1', documentTitle: 'Houseboat sewer connection and commissioning records', engineeringVerificationPurpose: 'Distinguish nominal pipeline attachment from active vacuum/pumped wastewater delivery to STPs.', acquisitionStatus: 'Outstanding · Institutional Request Queued' },
  { code: 'DOC-P1-08', priority: 'P1', documentTitle: 'Rehabilitation programme financial and spatial records', engineeringVerificationPurpose: 'Reconcile rehabilitation outlays with resident welfare and legally recovered, re-watered lake area.', acquisitionStatus: 'Outstanding · Institutional Request Queued' },
  { code: 'DOC-P1-09', priority: 'P1', documentTitle: 'Annual audited accounts of LAWDA and LCMA', engineeringVerificationPurpose: 'Build non-double-counted lifecycle capital and O&M expenditure ledger across funding schemes.', acquisitionStatus: 'Partial Audit Synthesis via CAG 2025 · Full Annual Ledgers Outstanding' },
  { code: 'DOC-P1-10', priority: 'P1', documentTitle: 'Latest IIT Roorkee Integrated Management Plan', engineeringVerificationPurpose: 'Review contemporary hydrological, STP modernization, and restoration modelling assumptions.', acquisitionStatus: 'Referenced in Sept 2026 Briefings · Full Technical Volumes Outstanding' },

  // P2 (5)
  { code: 'DOC-P2-01', priority: 'P2', documentTitle: 'Monitoring station and laboratory datasets', engineeringVerificationPurpose: 'Audit analytical detection limits, seasonal sampling cadence, and spatial basin coverage.', acquisitionStatus: 'Open Literature & KEW Baseline Indexed · Raw Lab Registers Outstanding' },
  { code: 'DOC-P2-02', priority: 'P2', documentTitle: 'Independent academic evaluations', engineeringVerificationPurpose: 'Cross-check official claims against peer-reviewed Kashmir University, NIT Srinagar, SKUAST-K & national studies.', acquisitionStatus: 'Ongoing Synthesis in KEW Research Library' },
  { code: 'DOC-P2-03', priority: 'P2', documentTitle: 'Environmental clearances and judicial directions', engineeringVerificationPurpose: 'Track compliance with J&K High Court PIL directives, NGT orders, and statutory wetland rules.', acquisitionStatus: 'Linked via KEW Environmental PIL Portal (/resources/environmental-pil)' },
  { code: 'DOC-P2-04', priority: 'P2', documentTitle: 'Contractor performance guarantees', engineeringVerificationPurpose: 'Verify contractual nutrient-removal (>90%), dredging-depth, and O&M uptime penalties.', acquisitionStatus: 'Outstanding · Public Information Mechanism Required' },
  { code: 'DOC-P2-05', priority: 'P2', documentTitle: 'Audit compliance and action-taken reports', engineeringVerificationPurpose: 'Document verified post-2022 government remedial actions addressing CAG 2006, 2011 & 2025 findings.', acquisitionStatus: 'Sept 2026 Assembly Replies Indexed · Formal ATRs Outstanding' },
];

// ─── PART XVI: 12 PERMANENT KEW SCIENTIFIC COMPANION MODULES ─────────────────

export const DAL_LAKE_OBSERVATORY_MODULES_12: DalObservatoryModuleSpec[] = [
  {
    id: 'obs-01-settling-basin',
    title: 'Settling Basin Intelligence',
    statusBadge: 'Proposed assessment module',
    governingMathematics: 'A_req = Q / V_s · η_obs = (M_in - M_out) / M_in',
    scientificPurpose: 'Tracks Telbal Nallah discharge pulses, particle-size settling thresholds, dead-storage loss, and off-basin spoil export.',
    reusedKewCapabilityLabel: 'KEW Investigation KEW-INV-0003 & Water Systems',
    reusedKewCapabilityHref: '/environmental-investigations',
  },
  {
    id: 'obs-02-sewerage-network',
    title: 'Sewerage Network Intelligence',
    statusBadge: 'Proposed assessment module',
    governingMathematics: 'Q_s = Q_r + Q_t + Q_c + Q_i + Q_inf',
    scientificPurpose: 'Maps peripheral sewer rings, houseboat/hamlet connections, pumping-station uptime, and unintercepted outfalls (~48 vs. 36.70 MLD).',
    reusedKewCapabilityLabel: 'KEW Urban Water & Accountability Registries',
    reusedKewCapabilityHref: '/governance/environmental-accountability-observatory',
  },
  {
    id: 'obs-03-stp-performance',
    title: 'STP Performance Intelligence',
    statusBadge: 'Proposed assessment module',
    governingMathematics: 'L = Q × C (kg/day & t/yr TP, TN, NH₄-N, NO₃-N)',
    scientificPurpose: 'Evaluates all 5 operational STPs (36.70 MLD) and Gupt Ganga (30.0 MLD u/c) on mass kilograms of N & P prevented rather than hydraulic throughput alone.',
    reusedKewCapabilityLabel: 'KEW Water Quality Monitoring Hub',
    reusedKewCapabilityHref: '/water-systems/water-quality',
  },
  {
    id: 'obs-04-nutrient-budget',
    title: 'Nutrient Budget Engine',
    statusBadge: 'Proposed assessment module',
    governingMathematics: 'dM_P/dt = L_ext + L_int - E_out - E_harv - E_dredge - B_burial',
    scientificPurpose: 'Integrates external sewage/catchment loads and internal benthic P release against outflow, harvest, dredge, and burial removals.',
    reusedKewCapabilityLabel: 'KEW Master Lake Registry (Carlson TSI)',
    reusedKewCapabilityHref: '/water-systems/lakes/dal-lake',
  },
  {
    id: 'obs-05-dredging-performance',
    title: 'Dredging Performance',
    statusBadge: 'Proposed assessment module',
    governingMathematics: 'V_d = ∬_A (z_before - z_after) dA · V_solids = Q_slurry × f_vol',
    scientificPurpose: 'Audits pre/post bathymetric cut volumes, slurry solids fractions, internal contaminant disturbance, and upland disposal.',
    reusedKewCapabilityLabel: 'KEW Flagship Investigation KEW-INV-0001',
    reusedKewCapabilityHref: '/environmental-investigations/reports/dal-lake-mechanical-dredging-ecological-defences',
  },
  {
    id: 'obs-06-mechanical-deweeding',
    title: 'Mechanical De-weeding',
    statusBadge: 'Proposed assessment module',
    governingMathematics: 'dB/dt = G - H - D · P_h = B_w × f_d × f_p',
    scientificPurpose: 'Quantifies dry-tissue nutrient export versus seasonal regrowth, fish-habitat protection, and shoreline leachate return.',
    reusedKewCapabilityLabel: 'KEW Aquatic Biodiversity & Lake Dossiers',
    reusedKewCapabilityHref: '/water-systems/fisheries',
  },
  {
    id: 'obs-07-catchment-erosion',
    title: 'Catchment Erosion Intelligence',
    statusBadge: 'Proposed assessment module',
    governingMathematics: 'RUSLE: A = R × K × LS × C × P × SDR',
    scientificPurpose: 'Links Dachigam–Telbal canopy survival, slope stabilization, and check-dam storage to measured sediment yield.',
    reusedKewCapabilityLabel: 'KEW Change Detection & Forest Ecosystems',
    reusedKewCapabilityHref: '/biodiversity/forest-ecosystems',
  },
  {
    id: 'obs-08-bathymetric-change',
    title: 'Bathymetric Change Detection',
    statusBadge: 'Proposed assessment module',
    governingMathematics: 'ΔS = S_in + S_internal - S_out - S_removed',
    scientificPurpose: 'Tracks basin-by-basin depth evolution, storage volume V(z), and channel re-shoaling intervals across Dal and Nigeen.',
    reusedKewCapabilityLabel: 'KEW Master Lake Registry (KEW-LK-0001)',
    reusedKewCapabilityHref: '/water-systems/lakes/dal-lake',
  },
  {
    id: 'obs-09-hydrological-balance',
    title: 'Hydrological Balance Engine',
    statusBadge: 'Proposed assessment module',
    governingMathematics: 'τ = V / Q_out (multi-basin residence time & downstream flux)',
    scientificPurpose: 'Evaluates sub-basin water residence times, internal channel connectivity, Padshahi augmentation quality, and Jhelum export.',
    reusedKewCapabilityLabel: 'KEW Water Intelligence Dashboard',
    reusedKewCapabilityHref: '/water-systems/dashboards/water-intelligence',
  },
  {
    id: 'obs-10-algal-bloom',
    title: 'Algal Bloom Intelligence',
    statusBadge: 'Proposed assessment module',
    governingMathematics: 'Sentinel-2 NDCI · Chl-a · Phycocyanin · Bottom DO/SOD',
    scientificPurpose: 'Connects phosphorus stoichiometry and summer stagnation directly to Microcystis bloom risk and cyanotoxin advisories.',
    reusedKewCapabilityLabel: 'KEW Algal Bloom Intelligence (AB-DAL-001)',
    reusedKewCapabilityHref: '/hazard-intelligence/algal-bloom-intelligence',
  },
  {
    id: 'obs-11-land-use-change',
    title: 'Land-Use Change Observatory',
    statusBadge: 'Proposed assessment module',
    governingMathematics: '10-class stage-normalized CORONA / Landsat / Sentinel-1 & 2 atlas',
    scientificPurpose: 'Separates seasonal water-level shifts and floating-weed clearance from true physical recovery or encroachment.',
    reusedKewCapabilityLabel: 'KEW Satellite Change Detection Observatory',
    reusedKewCapabilityHref: '/earth-human-impact/change-detection-observatory',
  },
  {
    id: 'obs-12-expenditure-accountability',
    title: 'Public Expenditure Accountability',
    statusBadge: 'Proposed assessment module',
    governingMathematics: '₹ Crore / Verified Unit of Pollutant or Sediment Removed',
    scientificPurpose: 'Reconciles sanctioned, released, and expended funds across LAWDA/LCMA against 9 physical restoration efficiency indicators.',
    reusedKewCapabilityLabel: 'KEW Environmental PIL & Accountability Portal',
    reusedKewCapabilityHref: '/resources/environmental-pil',
  },
];

export const DAL_OBSERVATORY_SCIENTIFIC_OUTPUTS = [
  'Measured pollutant reduction',
  'Sediment removal',
  'Hydrological recovery',
  'Nutrient balance',
  'Ecological restoration',
  'Cost-effectiveness',
] as const;

export const PRIMARY_DOCUMENTARY_SOURCES_4 = [
  {
    label: 'CAG of India Report No. 4 of 2025 — Chapter IV: Conservation and Management of Dal Lake (PDF)',
    url: 'https://cag.gov.in/uploads/download_audit_report/2025/Report-No-04-Lakes-Final-English-J%26amp%3BK---20-11-2025-signed-069cabc661d1667.35200540.pdf',
    relevance:
      'Official performance audit examining Dal Lake conservation up to March 2022 (revisiting 2006 & 2011 CAG findings): Telbal settling basin efficiency (7–57%), auxiliary-basin spoil deposition, STP Table 4.2 nutrient removal (14–66% vs. >90% target), ₹28.01 cr de-weeding expenditure, ₹11.02 cr dredging audit, and unrealized 2 m³/s Padshahi Canal connection.',
  },
  {
    label: 'Comptroller and Auditor General of India — Official Audit Index (Report ID 125068)',
    url: 'https://saiindia.gov.in/en/audit-report/details/125068',
    relevance:
      'Canonical SAI India statutory index record for Report No. 4 of 2025 on Conservation and Management of Lakes in Jammu and Kashmir.',
  },
  {
    label: 'September 2026 Legislative Assembly Reporting — Operational STPs, Channel Dredging & Weed Management (Kashmir Life)',
    url: 'https://kashmirlife.net/10-km-of-dal-lake-channels-dredged-in-three-years-omar-abdullah-454101/',
    relevance:
      'Documents September 2026 government statements reporting five operational Dal Lake STPs (Brari Numbal 16.1, Hazratbal 7.5, Nallah Amir Khan 5.4, Laam 4.5, Habak 3.2 = 36.70 MLD), channel dredging, and ongoing weed harvesting.',
  },
  {
    label: 'Gupt Ganga 30 MLD STP Under Construction & Integrated Management Plan Status (Kashmir Life, September 2026)',
    url: 'https://kashmirlife.net/30-mld-sewage-treatment-plant-under-construction-at-gupt-ganga-to-tackle-dal-lake-pollution-452771/',
    relevance:
      'Documents the under-construction 30.0 MLD Gupt Ganga sewage treatment plant (excluded from existing operational capacity pending DPR confirmation of net addition vs. replacement) and associated conservation expenditure.',
  },
] as const;
