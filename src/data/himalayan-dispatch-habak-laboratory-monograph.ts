// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 10 · SCIENTIFIC INSTITUTIONS & LIMNOLOGY
// "THE LABORATORY THAT KASHMIR LOST:
//  WHEN A DYING LAKE LOST ITS SCIENTIFIC INSTITUTION"
//
// Companion to Flagship Dispatch 05 in Vol. 01 / No. 01 (immediately following
// Dispatch 04: "The Mathematics of a Dying Lake") & Kashmir EcoWatch's
// Environmental Scientific Infrastructure & Institutional Legacy Observatory
// (/governance/scientific-infrastructure-observatory).
//
// Investigation Period: 1990s–2026
// Geographical Focus: Habak · Hazratbal · Dal–Nigeen Lake System · Srinagar · Western Himalayas
// Architecture: 12 Thematic Volumes · 90 Proposed Chapters (Editorial Research Architecture)
// ─────────────────────────────────────────────────────────────────────────────

export interface HabakChapterSpec {
  number: string;
  slug: string;
  volumeRoman: string;
  volumeTitle: string;
  title: string;
  investigativeQuestion: string;
  primaryRecordsAndMethods: string;
  verificationStatus: string;
}

export interface HabakVolumeSpec {
  roman: string;
  title: string;
  chapterRange: string;
  scopeSummary: string;
  chapters: Array<{
    number: string;
    title: string;
    investigativeQuestion: string;
    primaryRecordsAndMethods: string;
  }>;
}

export const HABAK_LABORATORY_SPEC = {
  monographId: 'ed-monograph-10-habak-laboratory',
  monographSlug: 'monograph-10-the-laboratory-that-kashmir-lost',
  monographLabel: 'MONOGRAPH 10 · SCIENTIFIC INSTITUTIONS & LIMNOLOGY',
  dispatchNumber: '05',
  storySlug: 'the-laboratory-that-kashmir-lost',
  kicker:
    'SPECIAL HISTORICAL & SCIENTIFIC INVESTIGATION · INSTITUTIONAL NEGLIGENCE · SCIENTIFIC INDEPENDENCE · PUBLIC ASSET ACCOUNTABILITY',
  extendedRubric:
    'SPECIAL HISTORICAL & SCIENTIFIC INVESTIGATION · INSTITUTIONAL NEGLIGENCE · LIMNOLOGY · SCIENTIFIC INDEPENDENCE · PUBLIC ASSET ACCOUNTABILITY · ENVIRONMENTAL GOVERNANCE',
  title: 'The Laboratory That Kashmir Lost',
  subtitle:
    'When a Dying Lake Lost Its Scientific Institution: The Forgotten Legacy of Habak, the Displacement of Environmental Research and the Institutional Contradictions Behind Kashmir’s Lake Conservation Crisis',
  standfirst:
    'While successive governments committed substantial public resources to saving Dal Lake, the scientific institution established to understand its ecological deterioration was displaced. Its research infrastructure deteriorated, its scientific leadership remained inadequately supported, and official warnings continued to accumulate. How did the science necessary to save the lake become secondary to the administration responsible for saving it?',
  tocTeaser:
    'While successive administrations committed public resources to saving Dal Lake, what happened to the scientific institution established to understand its deterioration?',
  investigationPeriod: '1990s–2026',
  geographicalFocus:
    'Habak · Hazratbal · Dal–Nigeen Lake System · Srinagar · Western Himalayas',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Limnology, Scientific Institutions, Environmental Engineering and Public Accountability Desk',
  epilogueTitle: 'The Lake Was Not the Only Thing That Was Dying',
  closingQuestion:
    'Kashmir has repeatedly asked why Dal Lake continues to deteriorate. Perhaps it is time Kashmir also asks what happened to the science that was supposed to save it.',
  heroStats: [
    { value: '12', label: 'Thematic volumes' },
    { value: '90', label: 'Proposed chapters' },
    { value: '30+', label: 'Years of institutional history' },
    { value: '5', label: 'Western Himalayan regions' },
  ],
  cag2011FailureStats: [
    {
      value: '₹15.93 Cr',
      label: 'Sanctioned for wider institutional infrastructure',
      note: 'Included buildings, equipment, and broader institutional facilities; not exclusively earmarked for the Habak laboratory (CAG 2011, Sec. 1.3.11–1.3.12).',
    },
    {
      value: '₹47 Lakh',
      label: 'Avoidable office rental expenditure',
      note: 'Documented rental outlay while sanctioned institutional infrastructure remained uncompleted or displaced (CAG 2011).',
    },
    {
      value: '0 of 5',
      label: 'Proposed directors appointed',
      note: 'Laboratory and research leadership vacancies documented across the audited conservation programme (CAG 2011).',
    },
    {
      value: '9+ years',
      label: 'Documented staff career stagnation',
      note: 'Prolonged absence of recruitment/promotion rules and career progression for scientific and technical personnel (CAG 2011).',
    },
  ],
  researchLimitationsDisclosure:
    'Research Limitations & Evidentiary Boundaries: Original CAG Audit Report for the year ended March 2011 (including visual inspection of printed pages 80 and 81, Sections 1.3.11–1.3.12 and 1.3.14), October 2009 first-person accounts by Dr. M. R. D. Kundangar and Khurshid Ahmed Naqib, J&K High Court proceedings (August 8, 2017; November 2018; February 2020), historical Dal Lake hydrobiology monograph archives, extracted text of CAG Report No. 4 of 2025 (period ended March 2022; page-image retrieval pending), and March 2025–2026 Sub-District Hospital Habak regulatory reporting have been examined. The original laboratory asset-transfer order, historical equipment inventories, personnel reassignment orders, and authenticated cadastral boundaries remain outstanding. Deliberate scientific suppression, exact ecological attribution solely to laboratory displacement, and the hospital’s exact parcel overlap with the former laboratory cannot yet be stated as established facts. The 12-volume, 90-chapter monograph and Western Himalayan Institute of Aquatic Sciences proposal are editorial research recommendations, not completed studies or existing government programmes.',
  publicationHierarchy: [
    {
      level: '01 · HIMALAYAN DISPATCH FLAGSHIP (DISPATCH 05)',
      title: 'The Laboratory That Kashmir Lost',
      detail:
        'Positioned immediately after Dispatch 04 (The Mathematics of a Dying Lake) in Vol. 01 / No. 01—tracing 1990s Habak scientific foresight, 2009 MoEF & insider warnings, CAG 2011/2025 audits, High Court interventions, and the Habak Scientific Recovery Initiative.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/the-laboratory-that-kashmir-lost',
      ctaLabel: 'Read Dispatch 05',
    },
    {
      level: '02 · MONOGRAPH 10 ARCHITECTURE (12 VOLUMES · 90 CHAPTERS)',
      title: 'Complete Historical, Limnological & Institutional Research Blueprint',
      detail:
        'Twelve thematic volumes and ninety proposed chapter dossiers spanning pre-displacement limnology, wastewater technology disputes, asset-transfer forensics, missing phosphorus mass balances, Sálim Ali National Park comparison, and global freshwater institute models.',
      href: '/himalayan-dispatch/issues/monograph-10-the-laboratory-that-kashmir-lost',
      ctaLabel: 'Explore Monograph 10',
    },
    {
      level: '03 · KASHMIR ECOWATCH GOVERNANCE MODULE',
      title: 'Environmental Scientific Infrastructure & Institutional Legacy Observatory',
      detail:
        'Permanent 12-engine accountability programme within Kashmir EcoWatch documenting research institutions, laboratory assets, personnel continuity, CAG audit remediation, and monitoring gaps—with Habak as Case #01.',
      href: '/governance/scientific-infrastructure-observatory',
      ctaLabel: 'Open KEW Observatory',
    },
  ],
} as const;

export const TEN_CORE_LIMNOLOGICAL_DISCIPLINES: readonly string[] = [
  'Water chemistry and nutrient dynamics.',
  'Aquatic microbiology and biological productivity.',
  'Sediment chemistry and internal nutrient loading.',
  'Eutrophication and algal proliferation.',
  'Aquatic vegetation and ecological succession.',
  'Wastewater treatment performance.',
  'Catchment hydrology and pollution transport.',
  'Seasonal environmental variability.',
  'Indigenous restoration technologies.',
  'Long-term ecosystem responses to conservation interventions.',
];

export const OVERSIGHT_MEETINGS_BREAKDOWN = [
  {
    committee: 'State Level Monitoring Committee',
    held: 1,
    expected: 22,
    missed: 21,
    heldPct: 4.5,
    auditNote:
      'Prescribed apex inter-departmental monitoring mechanism; 21 of 22 required sittings were not convened during the audited window (CAG 2011).',
  },
  {
    committee: 'Scientific Advisory Committee',
    held: 2,
    expected: 11,
    missed: 9,
    heldPct: 18.2,
    auditNote:
      'Statutory scientific review body responsible for evaluating limnological evidence and restoration methods; 9 of 11 required sittings missed (CAG 2011).',
  },
  {
    committee: 'Board of Directors (LAWDA)',
    held: 6,
    expected: 18,
    missed: 12,
    heldPct: 33.3,
    auditNote:
      'Institutional governing board; 12 of 18 required sittings not held. Auditors rejected "administrative preoccupation and busy schedules" as an inadequate explanation (CAG 2011).',
  },
] as const;

export const HISTORICAL_TIMELINE_7_EPOCHS = [
  {
    era: '1990s',
    title: 'Scientific foresight',
    summary:
      'Kashmir establishes dedicated ecological monitoring infrastructure at Habak alongside early hydrobiological monographs (S. P. College Hydrobiology Laboratory), recognizing that Dal Lake cannot be restored by civil engineering alone.',
  },
  {
    era: '2000–2002',
    title: 'Indigenous scientific research',
    summary:
      'Experimental investigations into constructed wetlands, root-zone phytoremediation, and low-cost cold-climate wastewater treatment conducted within LAWDA’s Research & Development framework.',
  },
  {
    era: '2009',
    title: 'Institutional deterioration exposed',
    summary:
      'In July 2009, an MoEF inspection team finds the displaced laboratory in rented premises "ill-furnished, ill-equipped and poorly staffed." In October 2009, former R&D Director Dr. M. R. D. Kundangar and former Vice Chairman Khurshid Ahmed Naqib publicly raise institutional and technological concerns.',
  },
  {
    era: '2011',
    title: 'National audit confirms deficiencies',
    summary:
      'CAG Audit Report (ended March 2011, pp. 80–81, Sec. 1.3.11–1.3.14) documents lack of a laboratory head, 0 of 5 directors appointed, ₹47 lakh avoidable rent, 9 of 51 oversight meetings held (~82% missed), and ₹34.64 crore STP procurement irregularities.',
  },
  {
    era: '2017',
    title: 'Judicial intervention',
    summary:
      'On August 8, 2017, the J&K High Court identifies persistent equipment and staffing deficiencies in LAWDA’s Research and Monitoring Division, calls for a modern laboratory, and directs PCB water-quality data sharing in the interim.',
  },
  {
    era: '2022',
    title: 'Continuing scientific monitoring deficiencies',
    summary:
      'Period ending March 2022 (audited in CAG Report No. 4 of 2025): ten foundational scientific requirements—including post-1998–99 nutrient loading, post-2006 heavy metals, lake flushing, seed-bank studies, and substantiated water-budget datasets—remain undemonstrated.',
  },
  {
    era: '2025–2026',
    title: 'Renewed public accountability questions',
    summary:
      'CAG Report No. 4 of 2025 revisits multi-decadal monitoring gaps and 2007–2020 open-water shrinkage (−249.5 ha), while March 2025–2026 Sub-District Hospital Habak expansion reporting raises separate Dal buffer-zone and LCMA clearance questions.',
  },
] as const;

export const MISSING_SCIENTIFIC_MEASUREMENTS_10: ReadonlyArray<[string, string]> = [
  [
    'Catchment geological and hydrological studies',
    'Required studies had not been undertaken',
  ],
  [
    'Nutrient loading',
    'Adequate monitoring records after the original 1998–99 assessment were not demonstrated',
  ],
  [
    'Heavy metal assessment',
    'No subsequent LCMA testing documented after concerns raised in the 2006 audit',
  ],
  [
    'Bathymetric assessment',
    'Later surveys did not adequately quantify accumulated sediment',
  ],
  [
    'Lake water budget',
    'Subsequent measurements were claimed (Dec 2022 reply cited ~50 nutrient stations & regular water-budget tracking) but supporting reports were not provided to auditors',
  ],
  [
    'Lake flushing',
    'Prescribed scientific management mechanism was not implemented',
  ],
  [
    'Biodiversity assessment',
    'Comprehensive ecosystem assessment was deficient',
  ],
  [
    'Seed bank investigation',
    'Required study had not been conducted',
  ],
  [
    'Sedimentation rate',
    'Insufficient evidence to establish long-term lake sedimentation',
  ],
  [
    'Interconnected lakes',
    'Conservation planning remained inadequate for Anchar and Gilsar',
  ],
];

export const PHOSPHORUS_BALANCE_1998_99 = {
  periodLabel: '1998–99 Project Estimates (Reproduced in CAG Audit)',
  inflowTonnes: 156.62,
  outflowTonnes: 80.62,
  retainedTonnes: 76.0,
  retainedPct: 48.5,
  exportedPct: 51.5,
  governingEquationLatex:
    'dM_P / dt = L_external + L_internal − L_outflow − L_burial − L_harvesting',
  strictCaveat:
    'Historical 1998–99 project estimates reproduced in the CAG report. These are NOT current nutrient loads and must never be extrapolated across subsequent decades without empirical field measurements.',
  components: [
    [
      'External loading (L_external)',
      'Nutrients entering through sewage outfalls, STP effluents, Telbal/catchment streams, storm runoff, and floating-garden pathways',
    ],
    [
      'Internal loading (L_internal)',
      'Dissolved reactive phosphorus released back into the water column from anoxic or disturbed lake sediments',
    ],
    [
      'Outflow (L_outflow)',
      'Nutrients exported downstream through Dal Gate, Nallah Amir Khan, and interconnected outlet channels',
    ],
    [
      'Burial (L_burial)',
      'Long-term diagenetic immobilization and permanent burial within deep lacustrine sediments',
    ],
    [
      'Harvesting (L_harvesting)',
      'Nutrients physically exported from the lake basin through weighed macrophyte biomass removal or de-silted sediment disposal',
    ],
    [
      'Change in storage (dM_P / dt)',
      'Net rate of change in total phosphorus mass within the defined water-column control volume',
    ],
  ] as ReadonlyArray<[string, string]>,
} as const;

export const REMOTE_SENSING_SHIFTS_2007_2020 = [
  {
    category: 'Open water combined with submerged vegetation',
    changeHectares: -249.5,
    displayDelta: '−249.5 hectares',
    direction: 'loss',
  },
  {
    category: 'Floating vegetation',
    changeHectares: 153.4,
    displayDelta: '+153.4 hectares',
    direction: 'expansion',
  },
  {
    category: 'Cropland and plantation',
    changeHectares: 55.9,
    displayDelta: '+55.9 hectares',
    direction: 'expansion',
  },
  {
    category: 'Built-up land',
    changeHectares: 28.2,
    displayDelta: '+28.2 hectares',
    direction: 'expansion',
  },
] as const;

export const COUNTERFACTUAL_EVOLUTION_1995_2030: ReadonlyArray<[string, string]> = [
  ['1995–2000', 'Establishment of permanent aquatic monitoring laboratories'],
  ['2000–2005', 'Experimental wastewater treatment and applied limnology'],
  ['2005–2010', 'Advanced nutrient chemistry and sediment analysis'],
  ['2010–2015', 'Mountain lake hydrological modelling'],
  ['2015–2020', 'Satellite-based water-quality intelligence and automated monitoring'],
  ['2020–2025', 'Predictive algal bloom modelling and molecular ecology'],
  ['2025–2030', 'Integrated Western Himalayan freshwater research institute'],
];

export const INTERNATIONAL_AQUATIC_INSTITUTES_5 = [
  {
    name: 'IISD Experimental Lakes Area',
    country: 'Canada',
    model: 'Long-term, whole-ecosystem freshwater experimentation.',
    lessonForKashmir:
      'Field-validated restoration science rather than exclusively short-term grab sampling.',
  },
  {
    name: 'Eawag (Swiss Federal Institute of Aquatic Science and Technology)',
    country: 'Switzerland',
    model:
      'Interdisciplinary aquatic research institution connecting freshwater science, wastewater treatment, and practical environmental management.',
    lessonForKashmir:
      'Integration of independent wastewater engineering evaluation and ecological research.',
  },
  {
    name: 'Leibniz Institute of Freshwater Ecology and Inland Fisheries (IGB)',
    country: 'Germany',
    model:
      'Institutional model connecting aquatic ecology, biodiversity, and freshwater ecosystem processes.',
    lessonForKashmir:
      'Sustained scientific specialization and career continuity for limnologists.',
  },
  {
    name: 'US Geological Survey (USGS) Water Resources Mission Area',
    country: 'United States',
    model:
      'Scientific framework emphasizing continuous hydrological observations, open public datasets, and water-resource investigations.',
    lessonForKashmir:
      'Permanent environmental records that survive five-year administrative changes.',
  },
  {
    name: 'UK Centre for Ecology & Hydrology (UKCEH)',
    country: 'United Kingdom',
    model:
      'Research model integrating multi-decadal environmental monitoring, catchment hydrology, and ecosystem science.',
    lessonForKashmir:
      'Unbroken scientific continuity across decades of environmental change.',
  },
] as const;

export const EIGHT_DIMENSIONS_INSTITUTIONAL_IGNORANCE: ReadonlyArray<[string, string]> = [
  [
    'Scientific ignorance',
    'Were decisions made without adequately examining scientific evidence?',
  ],
  [
    'Administrative ignorance',
    'Was the importance of permanent research infrastructure understood?',
  ],
  [
    'Financial ignorance',
    'Were scientific capabilities treated as expenses rather than long-term public investments?',
  ],
  [
    'Ecological ignorance',
    'Was lake restoration reduced to visible physical interventions?',
  ],
  [
    'Technological ignorance',
    'Were alternative treatment technologies rigorously compared?',
  ],
  [
    'Institutional ignorance',
    'Were the consequences of disrupting scientific teams considered?',
  ],
  [
    'Historical ignorance',
    'Were earlier scientific findings and baseline records preserved?',
  ],
  [
    'Public ignorance',
    'Was society adequately informed about the significance of the laboratory?',
  ],
];

export const DUAL_CASE_STUDY_COMPARISON: ReadonlyArray<[string, string]> = [
  ['Conservation of nature', 'Scientific understanding of nature'],
  ['Natural public asset', 'Intellectual and infrastructural public asset'],
  ['Protected habitat', 'Environmental research capability'],
  ['Potential ecological opportunity cost', 'Potential scientific opportunity cost'],
  ['Wildlife and habitat conservation', 'Water-quality investigation and lake management'],
  ['Protected-area governance', 'Scientific institutional governance'],
];

export const TWELVE_INSTITUTIONAL_RESPONSIBILITIES: ReadonlyArray<[string, string]> = [
  ['Council of Ministers', 'Original asset-transfer authorization'],
  [
    'Housing and Urban Development Department',
    'Protection and replacement of scientific infrastructure',
  ],
  [
    'Health and Medical Education Department',
    'Transfer, possession and development history',
  ],
  [
    'LAWDA Board of Directors',
    'Recorded deliberations and institutional objections',
  ],
  ['LAWDA administration', 'Scientific staffing and asset management'],
  [
    'Scientific Advisory Committee',
    'Research recommendations and responses',
  ],
  ['Finance Department', 'Budget allocation and asset valuation'],
  ['Revenue Department', 'Original and subsequent land ownership records'],
  ['Central environmental ministry (MoEF / MoEFCC)', 'Inspection reports and follow-up'],
  ['Pollution Control Board (JKPCC)', 'Independent environmental measurements'],
  ['Academic institutions', 'Research continuity and institutional cooperation'],
  ['LCMA (Lake Conservation and Management Authority)', 'Current scientific capabilities and historical remediation'],
];

export const PROPOSED_AQUATIC_INSTITUTE_16_DIVISIONS: readonly string[] = [
  'Advanced Limnology',
  'Aquatic Microbiology',
  'Sediment Biogeochemistry',
  'Environmental Toxicology',
  'Wastewater Engineering',
  'Mountain Hydrology',
  'Freshwater Biodiversity',
  'Remote Sensing & GIS',
  'Environmental Modelling',
  'Climate & Lake Interactions',
  'Aquatic Restoration',
  'Environmental Data Archives',
  'Environmental Economics',
  'Scientific Policy & Governance',
  'Scientific Training',
  'Independent Technology Evaluation',
];

export const KEW_SCIENTIFIC_INFRASTRUCTURE_ENGINES_12 = [
  {
    code: 'SIIO-01',
    name: 'Historical Research Institution Registry',
    function: 'Document the founding mandates, statutory charters, and evolution of environmental institutions across the Western Himalayas.',
  },
  {
    code: 'SIIO-02',
    name: 'Scientific Asset Registry',
    function: 'Record public laboratories, analytical instruments, field stations, and research infrastructure.',
  },
  {
    code: 'SIIO-03',
    name: 'Institutional Transformation Intelligence',
    function: 'Track closures, building transfers, mergers, and changes in institutional scientific purpose.',
  },
  {
    code: 'SIIO-04',
    name: 'Scientific Personnel Registry',
    function: 'Document sanctioned research cadres, leadership vacancies, recruitment rules, and professional specializations.',
  },
  {
    code: 'SIIO-05',
    name: 'Environmental Research Archive',
    function: 'Preserve historical monographs, baseline surveys, and endangered grey-literature datasets.',
  },
  {
    code: 'SIIO-06',
    name: 'Scientific Advisory Accountability',
    function: 'Track statutory Scientific Advisory Committee meeting schedules, formal recommendations, and administrative responses.',
  },
  {
    code: 'SIIO-07',
    name: 'Laboratory Capacity Assessment',
    function: 'Evaluate NABL/ISO analytical readiness, instrumentation calibration, and QA/QC capabilities.',
  },
  {
    code: 'SIIO-08',
    name: 'Scientific Monitoring Gap Intelligence',
    function: 'Identify unmeasured mass-balance terms (phosphorus budgets, heavy metals, bathymetric sediment, e-flows).',
  },
  {
    code: 'SIIO-09',
    name: 'Research-to-Implementation Tracker',
    function: 'Examine whether indigenous scientific findings and pilot trials inform engineering procurement.',
  },
  {
    code: 'SIIO-10',
    name: 'Environmental Audit Intelligence',
    function: 'Track CAG audit paragraphs, High Court directives, and verified Action Taken Notes over time.',
  },
  {
    code: 'SIIO-11',
    name: 'Scientific Infrastructure Recovery Registry',
    function: 'Document laboratory reconstruction, replacement facilities, and institutional capacity-building programmes.',
  },
  {
    code: 'SIIO-12',
    name: 'Regional Research Opportunity Engine',
    function: 'Identify unmet mountain freshwater research needs and specialized scientific career pathways for regional graduates.',
  },
] as const;

export const PRIMARY_DOCUMENTARY_EVIDENCE_8 = [
  {
    code: 'DOC-01',
    sourceTitle: 'Dr. M. R. D. Kundangar & Khurshid Ahmed Naqib testimonies (October 2009)',
    outletOrRepository: 'Kashmir Forum archival publication',
    url: 'https://www.kashmirforum.org/why-has-lawda-failed-to-clean-up-da/',
    significance:
      'First-person accounts by former LAWDA R&D Director and former Vice Chairman regarding wastewater technology disputes, constructed wetland trials, and R&D wing displacement (requires cross-authentication against personnel/transfer orders).',
  },
  {
    code: 'DOC-02',
    sourceTitle: 'Comptroller and Auditor General of India — Audit Report (Civil & Commercial), J&K, ended March 2011',
    outletOrRepository: 'CAG of India (pp. 80–81, Sections 1.3.11–1.3.14)',
    url: 'https://cag.gov.in/uploads/download_audit_report/2011/Jammu_Kashmir_Civil_Commercial_2011.pdf',
    significance:
      'Visually verified primary audit confirming July 2009 MoEF inspection ("ill-furnished, ill-equipped and poorly staffed" rented lab), 0 of 5 directors, ₹47 lakh avoidable rent, 9 of 51 oversight meetings, and ₹34.64 Cr STP procurement findings.',
  },
  {
    code: 'DOC-03',
    sourceTitle: 'Jammu & Kashmir High Court PIL Proceedings — August 8, 2017',
    outletOrRepository: 'High Court of J&K (Indian Kanoon Doc 82638637)',
    url: 'https://indiankanoon.org/doc/82638637/',
    significance:
      'Judicial recognition of equipment and staffing deficiencies in LAWDA’s Research & Monitoring Division, proposal for a modern laboratory, and interim PCB data-sharing directive.',
  },
  {
    code: 'DOC-04',
    sourceTitle: 'Jammu & Kashmir High Court PIL Proceedings — November 2018',
    outletOrRepository: 'High Court of J&K (Indian Kanoon Doc 52574074)',
    url: 'https://indiankanoon.org/doc/52574074/',
    significance:
      'Continuing judicial scrutiny of Dal Lake conservation governance, institutional coordination, and scientific accountability.',
  },
  {
    code: 'DOC-05',
    sourceTitle: 'Jammu & Kashmir High Court PIL Proceedings — February 2020',
    outletOrRepository: 'High Court of J&K (Indian Kanoon Doc 152003009)',
    url: 'https://indiankanoon.org/doc/152003009/',
    significance:
      'Ongoing judicial oversight of sewage treatment performance and ecological monitoring compliance.',
  },
  {
    code: 'DOC-06',
    sourceTitle: 'Dr. M. R. D. Kundangar — Dal Lake: A Monograph (Early 1990s S. P. College Hydrobiology Laboratory)',
    outletOrRepository: 'Republished historical monograph (Kashmir Life)',
    url: 'https://kashmirlife.net/dal-lake-a-monograph-335533/',
    significance:
      'Establishes that rigorous indigenous hydrobiological knowledge on nutrient enrichment, sedimentation, invasive macrophytes, and microbial contamination predated major capital conservation programmes.',
  },
  {
    code: 'DOC-07',
    sourceTitle: 'CAG Report No. 4 of 2025 — Performance Audit of Conservation & Management of Dal–Nigeen Lake (ended March 2022)',
    outletOrRepository: 'Comptroller and Auditor General of India (Report ID 125068)',
    url: 'https://www.cag.gov.in/en/audit-report/details/125068',
    significance:
      'Documents 10 missing/unsubstantiated scientific measurements, reproduces 1998–99 phosphorus balance (156.62 t in / 80.62 t out / 76 t retained), and records 2007–2020 remote-sensing shifts (−249.5 ha open water/submerged).',
  },
  {
    code: 'DOC-08',
    sourceTitle: 'Sub-District Hospital Habak Expansion & LCMA Buffer-Zone Clearance Reporting (March 2025 – 2026)',
    outletOrRepository: 'Kashmir Observer (March 18, 2025) & JK Monitor (2026)',
    url: 'https://kashmirobserver.net/2025/03/18/lcma-blocks-sdh-habak-expansion-govt-says-matter-under-review/',
    significance:
      'Documents contemporary regulatory questions surrounding hospital expansion within the 200-metre Dal Lake buffer zone and subsequent buffer-relaxation deliberations.',
  },
] as const;

export const REVISED_INAUGURAL_EDITION_29_ORDER: ReadonlyArray<[string, string]> = [
  ['01', 'The Price of Protecting Paradise'],
  ['02', 'When Mountains Speak, Who Is Listening?'],
  ['03', 'The Water We Have Forgotten'],
  ['04', 'The Mathematics of a Dying Lake'],
  ['05', 'The Laboratory That Kashmir Lost'],
  ['06', 'Where the Wild Waters End'],
  ['07', 'The Sky Has No Borders'],
  ['08', 'The People Who Guard the Forest'],
  ['09', 'The National Park That Became a Golf Course'],
  ['10', 'An Elegy for Winter'],
  ['11', 'Gravel, Concrete, and the Vanishing Floodplain'],
  ['12', 'Thirty-Eight Winters of Snowline Retreat'],
  ['13', 'A Glacier Does Not Negotiate With Five-Year Plans'],
  ['14', 'Why the Western Himalayas Demand Slow, Fearless Journalism'],
  ['15', 'Who Are We Researching For? The World Knows Our Mountains. Do We?'],
  ['16', 'South Asia’s Environmental Vanguard'],
  ['17', 'Science Has Diagnosed the Valley. Who Will Prescribe Its Governance?'],
  ['18', 'When the Mountain Rejects the Engineer'],
  ['19', 'Who Gave Development the Right to Exceed the Mountain?'],
  ['20', 'Nature Is Not a Contractor'],
  ['21', 'The Climate Has Changed. Has Agricultural Science?'],
  ['22', 'Six Years of Warnings, and Kashmir Still Cannot Breathe'],
  ['23', 'The Atmosphere Has No Borders: The Air We Breathe, the Numbers We Cannot Trust'],
  ['24', 'When Environmental Laws Exist but the Environment Has No Defence'],
  ['25', 'A Lake Cannot Be Rescued by an Annual Cleanup'],
  ['26', 'Who Measures the Success of Environmental Activism?'],
  ['27', 'The Mountains Have Heard Enough Declarations'],
  ['28', 'When Politics Promises Green'],
  ['29', 'Selective Environmental Consciousness'],
];

function slugifyTitle(num: string, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `chapter-${num}-${clean}`;
}

export const HABAK_MONOGRAPH_VOLUMES_12: HabakVolumeSpec[] = [
  {
    roman: 'I',
    title: 'Kashmir Before the Displacement of Its Lake Science',
    chapterRange: '01–07',
    scopeSummary:
      'Reconstructs pre-1997 hydrobiological scholarship across S. P. College, the University of Kashmir, and early state commissions—establishing what Kashmiri scientists already understood about Dal Lake before major conservation capital flowed.',
    chapters: [
      {
        number: '01',
        title: 'The Diagnostic Metaphor: Treating a Dying Patient After Dismantling the Clinic',
        investigativeQuestion: 'Why is permanent diagnostic capacity indispensable before sanctioning multi-crore ecological interventions?',
        primaryRecordsAndMethods: 'Comparative institutional governance synthesis; CAG 2011 & 2025 audit baselines.',
      },
      {
        number: '02',
        title: 'A Natural Laboratory of High-Altitude and Valley Freshwater Systems',
        investigativeQuestion: 'How do Dal, Nigeen, Wular, Manasbal, Anchar, Khushalsar, Gilsar, and alpine tarns form a connected research continuum?',
        primaryRecordsAndMethods: 'KEW 553-lake hydrological inventory & NWIA morphometric baselines.',
      },
      {
        number: '03',
        title: 'Early Limnological Pioneers of Srinagar and the S. P. College Hydrobiology Laboratory',
        investigativeQuestion: 'What empirical baselines were established by indigenous Kashmiri hydrobiologists between the 1970s and early 1990s?',
        primaryRecordsAndMethods: 'Archival review of Dr. M. R. D. Kundangar’s Dal Lake monograph & university theses.',
      },
      {
        number: '04',
        title: 'Nutrient Enrichment, Sedimentation and Invasive Macrophytes in Early-1990s Records',
        investigativeQuestion: 'Which trophic and microbiological warning signals were already documented prior to LAWDA’s formation?',
        primaryRecordsAndMethods: 'Historical water-chemistry tables, Secchi depth logs, and coliform records.',
      },
      {
        number: '05',
        title: 'From Envisaged Conservation Authorities to the Creation of LAWDA (1997)',
        investigativeQuestion: 'How was scientific research originally positioned within LAWDA’s founding institutional charter?',
        primaryRecordsAndMethods: 'Government of J&K founding notifications, Memorandum of Association, and R&D charter.',
      },
      {
        number: '06',
        title: 'The 1998–99 Detailed Project Report and Initial Mass-Balance Assumptions',
        investigativeQuestion: 'How were the 156.62 t inflow and 80.62 t outflow phosphorus figures originally derived and bounded?',
        primaryRecordsAndMethods: 'AHEC Roorkee / NLCP project records & CAG Report No. 4 of 2025 cross-verification.',
      },
      {
        number: '07',
        title: 'Why Engineering Alone Cannot Restore a Shallow Polymictic Valley Lake',
        investigativeQuestion: 'What biogeochemical feedback loops defeat civil works when limnological monitoring is absent?',
        primaryRecordsAndMethods: 'Coupled water-sediment phosphorus cycling synthesis and macrophyte succession models.',
      },
    ],
  },
  {
    roman: 'II',
    title: 'The Birth and Scientific Vision of the Habak Laboratory',
    chapterRange: '08–14',
    scopeSummary:
      'Documents the founding architecture, spatial siting along the Hazratbal–Habak foreshore, instrumentation goals, and ten core limnological mandates of the original Habak Ecological Monitoring Laboratory.',
    chapters: [
      {
        number: '08',
        title: 'Why Habak? Foreshore Proximity to Telbal Inflows and Hazratbal Basins',
        investigativeQuestion: 'Why was Habak strategically positioned to monitor Dal Lake’s primary sediment and nutrient plume?',
        primaryRecordsAndMethods: 'Hydrological siting analysis of Telbal Nallah inflow and Hazratbal basin circulation.',
      },
      {
        number: '09',
        title: 'Original Building Architecture, Wet-Chemistry Suites and Biological Rooms',
        investigativeQuestion: 'What physical laboratory spaces and analytical benches existed in the dedicated Habak facility?',
        primaryRecordsAndMethods: 'RTI requisition protocol for original engineering drawings, asset registers, and civil handovers.',
      },
      {
        number: '10',
        title: 'The Ten Limnological Mandates: From Nutrient Chemistry to Indigenous Restoration',
        investigativeQuestion: 'How did the laboratory’s scientific remit span chemistry, microbiology, sediment flux, and catchment hydrology?',
        primaryRecordsAndMethods: 'Documentary mapping of LAWDA R&D Wing annual workplans (1998–2005).',
      },
      {
        number: '11',
        title: 'Historical Equipment Inventories, Spectrophotometers and Field Boats',
        investigativeQuestion: 'Which laboratory instruments were procured under NLCP/central grants, and where were they transferred?',
        primaryRecordsAndMethods: 'Procurement ledger & physical stock-verification audit protocol (outstanding P0 record).',
      },
      {
        number: '12',
        title: 'Sampling Networks Across Hazratbal, Bod Dal, Gagribal and Nigeen',
        investigativeQuestion: 'How were station coordinates, sampling frequencies, and seasonal depth profiles structured?',
        primaryRecordsAndMethods: 'Archival station registers vs. contemporary 50-station claims in CAG 2025.',
      },
      {
        number: '13',
        title: 'University–LAWDA Collaboration in the Early Habak Years',
        investigativeQuestion: 'How did postgraduate supervision and joint fieldwork link Habak with regional academic departments?',
        primaryRecordsAndMethods: 'Dissertation acknowledgments, joint technical bulletins, and oral-history interviews.',
      },
      {
        number: '14',
        title: 'The Regional Benchmark Habak Was Poised to Become by 2005',
        investigativeQuestion: 'How did Habak’s early capabilities compare with contemporaneous Indian lake-monitoring laboratories?',
        primaryRecordsAndMethods: 'Comparative institutional baseline across NLCP-funded lake authorities in India.',
      },
    ],
  },
  {
    roman: 'III',
    title: 'The Scientists, Their Research and Their Professional Journeys',
    chapterRange: '15–22',
    scopeSummary:
      'Examines the careers, scientific publications, internal warnings, and staffing stagnation of LAWDA’s researchers—including Dr. Kundangar’s and Khurshid Ahmed Naqib’s 2009 accounts alongside CAG-verified personnel deficits.',
    chapters: [
      {
        number: '15',
        title: 'Dr. Mohammad Rashid-ud-din Kundangar: Hydrobiologist and Founding R&D Director',
        investigativeQuestion: 'What scientific qualifications and empirical baselines did Dr. Kundangar bring to LAWDA’s R&D Wing?',
        primaryRecordsAndMethods: 'Published bibliography, S. P. College hydrobiology records, and institutional service timeline.',
      },
      {
        number: '16',
        title: 'The October 2009 Public Testimony: Five Specific Institutional Allegations',
        investigativeQuestion: 'Which specific claims in the October 2009 account are corroborated by CAG 2011, and which await file authentication?',
        primaryRecordsAndMethods: 'Claim-by-claim evidentiary triangulation matrix + Right-of-Response protocol.',
      },
      {
        number: '17',
        title: 'Khurshid Ahmed Naqib’s Corroborating Response and Call to Open the Files',
        investigativeQuestion: 'What did former LAWDA Vice Chairman Naqib confirm regarding constructed-wetland trials and administrative interruption?',
        primaryRecordsAndMethods: 'Documentary analysis of October 2009 exchange & official tenure files.',
      },
      {
        number: '18',
        title: 'Zero of Five Directors Appointed: Leadership Vacuum in Scientific Governance',
        investigativeQuestion: 'Why did five proposed director-level positions remain unfilled across the audited conservation period?',
        primaryRecordsAndMethods: 'CAG Audit Report 2011 (Sections 1.3.11–1.3.12) & HUDD establishment files.',
      },
      {
        number: '19',
        title: 'Nine-Plus Years of Career Stagnation and Absence of Service Rules',
        investigativeQuestion: 'How did the failure to finalize recruitment and promotion rules affect scientific morale and retention?',
        primaryRecordsAndMethods: 'CAG 2011 staffing audit & service-book anonymised cohort study protocol.',
      },
      {
        number: '20',
        title: 'Alleged Reassignment of Scientific Personnel to Non-Scientific Duties',
        investigativeQuestion: 'Were trained hydrobiologists and chemists deployed to unrelated enforcement or clerical tasks?',
        primaryRecordsAndMethods: 'Outstanding P0 verification of internal deployment/transfer orders (2003–2015).',
      },
      {
        number: '21',
        title: 'Laboratory Without a Head: Consequences for Quality Assurance and Chain of Custody',
        investigativeQuestion: 'How does operating an environmental laboratory without a qualified scientific head affect legal and scientific validity?',
        primaryRecordsAndMethods: 'CAG 2011 finding on absent laboratory head; ISO/IEC 17025 governance standards.',
      },
      {
        number: '22',
        title: 'Oral Histories of Retired and Serving Aquatic Technicians and Field Staff',
        investigativeQuestion: 'What institutional memory survives among technicians who sampled Dal Lake across three decades?',
        primaryRecordsAndMethods: 'Source-protected structured oral-history protocol with pre-publication verification.',
      },
    ],
  },
  {
    roman: 'IV',
    title: 'The Wastewater Technology Disagreements',
    chapterRange: '23–30',
    scopeSummary:
      'Investigates the scientific and engineering debate over Fluidized Aerobic Bed (FAB) sewage treatment plants versus constructed wetlands, cold-winter nitrification/phosphorus removal kinetics, and CAG’s ₹34.64 crore procurement findings.',
    chapters: [
      {
        number: '23',
        title: 'Cold-Climate Sewage Treatment Physics and Stoichiometry in the Kashmir Valley',
        investigativeQuestion: 'How do winter water temperatures (4–8 °C) govern biological nutrient removal in Dal Lake STPs?',
        primaryRecordsAndMethods: 'Arrhenius kinetic modelling, BOD/COD/TP removal stoichiometry, and winter grab-sample logs.',
      },
      {
        number: '24',
        title: 'The 2000–2002 Constructed Wetland and Root-Zone Pilot Experiments',
        investigativeQuestion: 'What nutrient-removal efficiencies and land-footprint trade-offs were observed in LAWDA’s indigenous wetland pilots?',
        primaryRecordsAndMethods: 'Archival R&D pilot reports, Phragmites/Typha uptake records, and Naqib/Kundangar testimonies.',
      },
      {
        number: '25',
        title: 'Selection of Fluidized Aerobic Bed (FAB) Technology: Scientific Review vs. Administrative Choice',
        investigativeQuestion: 'How were FAB plants technically evaluated for phosphorus and nitrogen removal before contract award?',
        primaryRecordsAndMethods: 'Technical evaluation committee minutes, DPR specifications, and SAC deliberations.',
      },
      {
        number: '26',
        title: 'CAG 2011 Section 1.3.14: Performance Concerns at Three Existing STPs',
        investigativeQuestion: 'What operational and effluent-quality deficiencies did CAG document at the initial three Dal Lake STPs?',
        primaryRecordsAndMethods: 'CAG Audit Report 2011, Section 1.3.14 & JKPCC effluent monitoring sheets.',
      },
      {
        number: '27',
        title: 'The ₹34.64 Crore Contract Award for Two Additional STPs',
        investigativeQuestion: 'Why did CAG flag the technical/financial bid sequence, technology negotiations, and contractor financial provisions?',
        primaryRecordsAndMethods: 'CAG Audit Report 2011, Section 1.3.14 tender chronology & financial-clause audit.',
      },
      {
        number: '28',
        title: 'Phosphorus Removal Reality (14–66% vs. >90% Design): The Eutrophication Link',
        investigativeQuestion: 'Why does secondary BOD removal without tertiary phosphorus polishing leave Dal Lake eutrophic?',
        primaryRecordsAndMethods: 'CAG Report No. 4 of 2025 STP phosphorus performance tables & stoichiometry.',
      },
      {
        number: '29',
        title: 'When Procurement Outpaces Independent Laboratory Verification',
        investigativeQuestion: 'Can an authority objectively audit contractor STP performance after weakening its own analytical laboratory?',
        primaryRecordsAndMethods: 'Comparative capital-procurement vs. R&D budget expenditure ledger (2000–2024).',
      },
      {
        number: '30',
        title: 'Hybrid Treatment Pathways: Combining Modern STPs with Constructed Polishing Wetlands',
        investigativeQuestion: 'How can engineered STPs and constructed wetlands work together rather than as mutually exclusive rivals?',
        primaryRecordsAndMethods: 'Eawag & cold-region tertiary wetland polishing engineering synthesis.',
      },
    ],
  },
  {
    roman: 'V',
    title: 'The Displacement of Scientific Infrastructure',
    chapterRange: '31–38',
    scopeSummary:
      'Forensically traces the transfer of the original Habak building, relocation into rented premises, the ₹15.93 crore infrastructure sanction, and ₹47 lakh avoidable office rent.',
    chapters: [
      {
        number: '31',
        title: 'Reconstructing the Original Habak Building Transfer: Orders, Dates and Signatories',
        investigativeQuestion: 'Under what administrative order, cabinet decision, or departmental MoU was the Habak building reassigned?',
        primaryRecordsAndMethods: 'P0 RTI & archival retrieval protocol across GAD, HUDD, H&ME, and Revenue records.',
      },
      {
        number: '32',
        title: 'Was a Scientific Capacity Preservation or Replacement Plan Ever Prepared?',
        investigativeQuestion: 'Did authorities establish equivalent laboratory benches before vacating the Habak facility?',
        primaryRecordsAndMethods: 'LAWDA Board minutes & HUDD asset-handover files.',
      },
      {
        number: '33',
        title: 'Into Rented Premises: “Ill-Furnished, Ill-Equipped and Poorly Staffed”',
        investigativeQuestion: 'What exact physical conditions did the July 2009 MoEF inspection team document in the rented laboratory?',
        primaryRecordsAndMethods: 'MoEF July 2009 inspection findings reproduced in CAG Audit Report 2011 (pp. 80–81).',
      },
      {
        number: '34',
        title: 'The ₹15.93 Crore Institutional Infrastructure Allocation: Where Did It Go?',
        investigativeQuestion: 'How was the ₹15.93 crore sanction for buildings, equipment, and facilities itemized and utilized?',
        primaryRecordsAndMethods: 'CAG 2011 Sections 1.3.11–1.3.12 expenditure schedules (distinguishing lab vs. wider assets).',
      },
      {
        number: '35',
        title: '₹47 Lakh in Avoidable Office Rent: Fiscal Anatomy of Displacement',
        investigativeQuestion: 'Why did public funds pay ₹47 lakh in private rent despite sanctioned institutional building funds?',
        primaryRecordsAndMethods: 'CAG 2011 rental audit paragraphs & lease voucher verification.',
      },
      {
        number: '36',
        title: 'Sample Chain-of-Custody, Cold Storage and Analytical Continuity Losses',
        investigativeQuestion: 'Which analytical parameters (trace metals, chlorophyll-a, total P digestion, BOD5) were interrupted during relocation?',
        primaryRecordsAndMethods: 'Parameter-by-parameter continuity matrix across LAWDA/LCMA annual lab registers.',
      },
      {
        number: '37',
        title: 'Loss of Historical Paper Registers and Pre-Digital Limnological Time Series',
        investigativeQuestion: 'Were raw 1990s–2000s bench notebooks and station sheets archived, digitized, or lost during moves?',
        primaryRecordsAndMethods: 'Archival inventory audit of LCMA Research & Monitoring Division holdings.',
      },
      {
        number: '38',
        title: 'Public Asset Accountability Law: Rules Governing Inter-Departmental Transfers',
        investigativeQuestion: 'What financial code and statutory safeguards govern reassigning grant-funded scientific assets?',
        primaryRecordsAndMethods: 'J&K Financial Code, centrally sponsored scheme conditions (NLCP), and audit jurisprudence.',
      },
    ],
  },
  {
    roman: 'VI',
    title: 'What the Ministry, CAG and Judiciary Discovered',
    chapterRange: '39–46',
    scopeSummary:
      'Synthesizes sixteen years (2009–2025) of official inspections, CAG performance audits, and J&K High Court PIL orders documenting persistent scientific capacity deficits across changing administrations.',
    chapters: [
      {
        number: '39',
        title: 'The July 2009 Ministry of Environment and Forests Inspection Dossier',
        investigativeQuestion: 'What follow-up conditions did MoEF impose after inspecting LAWDA’s rented laboratory in July 2009?',
        primaryRecordsAndMethods: 'MoEF NLCP review correspondence & CAG 2011 cross-citations.',
      },
      {
        number: '40',
        title: 'CAG Audit Report 2011 (Pages 80–81): Line-by-Line Documentary Analysis',
        investigativeQuestion: 'How did the Comptroller and Auditor General connect governance failure with absent scientific leadership?',
        primaryRecordsAndMethods: 'Visually verified printed pages 80–81 of CAG J&K Civil & Commercial Audit Report 2011.',
      },
      {
        number: '41',
        title: '9 of 51 Meetings Held (~82% Missed): Anatomy of Oversight Collapse',
        investigativeQuestion: 'Why did SLMC (1/22), SAC (2/11), and the LAWDA Board (6/18) fail to convene at prescribed frequencies?',
        primaryRecordsAndMethods: 'CAG 2011 meeting-frequency audit & rejection of "busy schedules" defence.',
      },
      {
        number: '42',
        title: 'August 8, 2017 High Court Intervention: Judicial Call for a Modern Laboratory',
        investigativeQuestion: 'Why was LAWDA still submitting funding proposals for a modern laboratory eight years after the 2009 inspection?',
        primaryRecordsAndMethods: 'J&K High Court order dated August 8, 2017 (Indian Kanoon Doc 82638637).',
      },
      {
        number: '43',
        title: 'Interim Reliance on Pollution Control Board Data Sharing (2017–2020)',
        investigativeQuestion: 'Did PCB water-quality sharing substitute for continuous in-house limnological process research?',
        primaryRecordsAndMethods: 'High Court PIL orders (Aug 2017, Nov 2018, Feb 2020) & compliance affidavits.',
      },
      {
        number: '44',
        title: 'November 2018 and February 2020 High Court Orders: Systemic Governance Critique',
        investigativeQuestion: 'How did court-appointed amici curiae and committees evaluate LCMA’s technical capacity?',
        primaryRecordsAndMethods: 'Indian Kanoon Docs 52574074 & 152003009 + Committee of Experts filings.',
      },
      {
        number: '45',
        title: 'CAG Report No. 4 of 2025: Fifteen Years After 2011, What Had Changed?',
        investigativeQuestion: 'Which 2011 audit defects persisted into the performance audit covering the period ended March 2022?',
        primaryRecordsAndMethods: 'Comparative 2011 vs. 2025 CAG audit concordance matrix.',
      },
      {
        number: '46',
        title: 'Multi-Administration Continuity: Why Lake Science Transcends Partisan Cycles',
        investigativeQuestion: 'How did institutional neglect persist across governor’s/central rule and elected coalitions alike?',
        primaryRecordsAndMethods: 'Non-partisan chronological governance overlay (1996–2026).',
      },
    ],
  },
  {
    roman: 'VII',
    title: 'The Mathematics of Missing Environmental Knowledge',
    chapterRange: '47–54',
    scopeSummary:
      'Quantifies the ten missing scientific studies identified in CAG Report No. 4 of 2025, the 1998–99 phosphorus retention balance (76 tonnes/yr), the six-term differential P budget, and 2007–2020 remote-sensing shifts.',
    chapters: [
      {
        number: '47',
        title: 'Ten Missing Scientific Foundations in CAG Report No. 4 of 2025',
        investigativeQuestion: 'How do missing catchment geology, bathymetry, flushing, and seed-bank studies blind restoration design?',
        primaryRecordsAndMethods: 'Itemized audit analysis of CAG Report No. 4 of 2025 scientific monitoring findings.',
      },
      {
        number: '48',
        title: 'Claimed Monitoring vs. Substantiated Datasets: The December 2022 50-Station Reply',
        investigativeQuestion: 'Why could the claimed 50-location nutrient monitoring and regular water budgets not be substantiated to auditors?',
        primaryRecordsAndMethods: 'CAG 2025 audit verification of December 2022 departmental reply.',
      },
      {
        number: '49',
        title: 'The 1998–99 Phosphorus Balance Revisited: 156.62 t In, 80.62 t Out, 76 t Retained',
        investigativeQuestion: 'What does a 48.5% annual phosphorus retention fraction imply for cumulative sediment P stocks?',
        primaryRecordsAndMethods: 'Historical mass-balance analysis (strictly bounded to 1998–99 estimates without unmeasured extrapolation).',
      },
      {
        number: '50',
        title: 'Solving dM_P/dt: External Loading, Internal Sediment Release, Burial and Harvesting',
        investigativeQuestion: 'What instrumentation and sampling cadence are required to close all six terms of Dal Lake’s phosphorus budget?',
        primaryRecordsAndMethods: 'Benthic flux chamber, porewater peepers, outlet ADCP + auto-sampler, and dry-weed P assay protocols.',
      },
      {
        number: '51',
        title: 'Heavy Metals Since 2006 and Unmeasured Ecotoxicological Pathways',
        investigativeQuestion: 'Why was no subsequent LCMA heavy-metal testing documented after concerns raised in the 2006 audit?',
        primaryRecordsAndMethods: 'CAG 2025 heavy-metal audit finding + ICP-MS sediment/macrophyte/fish protocol.',
      },
      {
        number: '52',
        title: 'Bathymetric Uncertainty, Sedimentation Rates and Macrophyte Seed Banks',
        investigativeQuestion: 'Why did dredging proceed without quantified net sedimentation rates or viable turion/seed-bank maps?',
        primaryRecordsAndMethods: 'Dual-frequency echosounding, Pb-210/Cs-137 core dating, and sediment seed-bank assay protocols.',
      },
      {
        number: '53',
        title: '2007–2020 Remote-Sensing Shifts: −249.5 ha Open Water and +153.4 ha Floating Vegetation',
        investigativeQuestion: 'How do multi-stressor pressures manifest in satellite land-cover trajectories between 2007 and 2020?',
        primaryRecordsAndMethods: 'CAG 2025 remote-sensing table + KEW Sentinel-2/Landsat spectral unmixing.',
      },
      {
        number: '54',
        title: 'Forgotten Hydrological Twins: Anchar Lake, Gilsar and Khushalsar Connectivity',
        investigativeQuestion: 'Why did conservation planning remain inadequate for Anchar and Gilsar despite Nallah Amir Khan coupling?',
        primaryRecordsAndMethods: 'CAG 2025 interconnected-lakes finding & urban drainage network mapping.',
      },
    ],
  },
  {
    roman: 'VIII',
    title: 'Three Decades of Scientific and Economic Opportunity Costs',
    chapterRange: '55–61',
    scopeSummary:
      'Evaluates the counterfactual 1995–2030 institutional evolution of Habak alongside regional scientific employment, consultancy expenditure leakage, and lost intellectual capital.',
    chapters: [
      {
        number: '55',
        title: '1995–2030 Counterfactual Trajectory: Seven Five-Year Stages of Institutional Maturity',
        investigativeQuestion: 'What analytical capabilities could incremental five-year investments have built at Habak by 2026?',
        primaryRecordsAndMethods: 'Counterfactual institutional scenario modelling (explicitly framed as non-guaranteed potential).',
      },
      {
        number: '56',
        title: 'External Consultancy Outlays vs. Permanent Indigenous Laboratory Investment',
        investigativeQuestion: 'How much has J&K spent on episodic external DPRs and consultants compared with permanent in-house science?',
        primaryRecordsAndMethods: 'Comparative expenditure audit of external consultancy contracts (1998–2026).',
      },
      {
        number: '57',
        title: 'Kashmir’s Environmental Science Graduates and the Brain-Drain Paradox',
        investigativeQuestion: 'Where do postgraduate limnology, environmental science, and microbiology scholars from J&K find employment?',
        primaryRecordsAndMethods: 'University alumni career-tracking survey protocol across Kashmir & Jammu universities.',
      },
      {
        number: '58',
        title: 'Applied Scientific Services for Mountain Regions: Testing, Certification and Modelling',
        investigativeQuestion: 'What specialized environmental services could a mature Srinagar freshwater institute provide across High Asia?',
        primaryRecordsAndMethods: 'Regional environmental services demand & laboratory accreditation economics.',
      },
      {
        number: '59',
        title: 'Economic Valuation of Timely Algal-Bloom, Fish-Kill and Sewage-Bypass Diagnostics',
        investigativeQuestion: 'What are the avoided tourism, fishery, and public-health costs of early limnological warning systems?',
        primaryRecordsAndMethods: 'Environmental economics cost-of-delay and value-of-information (VOI) framework.',
      },
      {
        number: '60',
        title: 'Comparative Freshwater Capacity Across Jammu, Ladakh, AJ&K and Gilgit-Baltistan',
        investigativeQuestion: 'Do Pangong, Tsomoriri, Mansar, Surinsar, Banjosa, Satpara, and Attabad possess dedicated limnological labs?',
        primaryRecordsAndMethods: 'Five-region Western Himalayan freshwater laboratory inventory.',
      },
      {
        number: '61',
        title: 'Intellectual Sovereignty: Collaborating Globally from Indigenous Strength',
        investigativeQuestion: 'How does permanent local instrumentation transform international partnerships from dependency to co-equal science?',
        primaryRecordsAndMethods: 'Science-policy analysis of mountain observatory partnerships.',
      },
    ],
  },
  {
    roman: 'IX',
    title: 'Habak Hospital and the Competing Public Institutional Priorities',
    chapterRange: '62–68',
    scopeSummary:
      'Examines the legitimate public-health need for Sub-District Hospital Habak alongside the governance failure of displacing environmental science without replacement and 2025–2026 buffer-zone clearance questions.',
    chapters: [
      {
        number: '62',
        title: 'Healthcare for Hazratbal and Habak: A Legitimate and Essential Public Necessity',
        investigativeQuestion: 'What maternal, emergency, and community healthcare needs does Sub-District Hospital Habak serve?',
        primaryRecordsAndMethods: 'Public health catchment demographics & H&ME healthcare service records.',
      },
      {
        number: '63',
        title: 'The False Choice: Why Public Health Need Never Required Weakening Lake Science',
        investigativeQuestion: 'Could both a modern sub-district hospital and a upgraded limnological institute have been planned simultaneously?',
        primaryRecordsAndMethods: 'Urban public-land allocation analysis & institutional co-planning standards.',
      },
      {
        number: '64',
        title: 'Cadastral Forensics at Habak: Khasra Numbers, Original Parcel and Present Footprint',
        investigativeQuestion: 'What is the exact cadastral relationship between the former Habak laboratory parcel and present hospital expansion?',
        primaryRecordsAndMethods: 'Outstanding P0 Revenue khasra/jamabandi and mutation verification protocol.',
      },
      {
        number: '65',
        title: 'March 2025 LCMA Stop-Work / Clearance Dispute Within the Dal Buffer Zone',
        investigativeQuestion: 'Why did LCMA block SDH Habak expansion work in March 2025 under restricted lakeshore buffer norms?',
        primaryRecordsAndMethods: 'Kashmir Observer (March 18, 2025) reporting & LCMA/BOCA statutory docket.',
      },
      {
        number: '66',
        title: '2026 Buffer-Zone Relaxation Deliberations: Precedent Risks Along the Dal Perimeter',
        investigativeQuestion: 'What ecological and legal precedents arise when statutory 200-metre lakeshore buffer rules are relaxed?',
        primaryRecordsAndMethods: '2026 government statements (JK Monitor), Master Plan 2035 norms, and High Court PIL orders.',
      },
      {
        number: '67',
        title: 'Hospital Biomedical & Liquid Waste Safeguards Beside a Sensitive Lake Basin',
        investigativeQuestion: 'What effluent-treatment and biomedical-waste containment standards must any lakeshore healthcare facility meet?',
        primaryRecordsAndMethods: 'Bio-Medical Waste Management Rules & zero-untreated-discharge engineering audit.',
      },
      {
        number: '68',
        title: 'Principle of Non-Regression in Public Scientific Infrastructure',
        investigativeQuestion: 'How can statutory rules prohibit transferring any environmental laboratory until superior replacement facilities are commissioned?',
        primaryRecordsAndMethods: 'Model administrative safeguard clause for public scientific assets.',
      },
    ],
  },
  {
    roman: 'X',
    title: "Kashmir's Collective Professional Introspection",
    chapterRange: '69–76',
    scopeSummary:
      'Applies the Eight Dimensions of Institutional Ignorance, connects inward professional questions with South Asia’s Environmental Vanguard, and pairs Sálim Ali National Park with the Habak Laboratory.',
    chapters: [
      {
        number: '69',
        title: 'The Eight Dimensions of Institutional Ignorance as a Governance Diagnostic',
        investigativeQuestion: 'How do scientific, administrative, financial, ecological, technological, institutional, historical, and public ignorance interact?',
        primaryRecordsAndMethods: 'Eight-dimension governance diagnostic matrix applied to 1997–2026 Dal records.',
      },
      {
        number: '70',
        title: 'Questions to Our Scientists: Representations, Publications and Collective Voice',
        investigativeQuestion: 'What formal representations did regional scientists submit when Habak’s capabilities eroded, and what remained undocumented?',
        primaryRecordsAndMethods: 'Archival search of academy proceedings, faculty memoranda, and recognition of outspoken researchers.',
      },
      {
        number: '71',
        title: 'Questions to Our Environmental Advocates: Public Asset Accountability in PILs',
        investigativeQuestion: 'Was the displacement of a dedicated lake laboratory ever challenged directly as a statutory conservation breach?',
        primaryRecordsAndMethods: 'Review of Dal Lake PIL petitions, amicus reports, and prayer clauses (2002–2026).',
      },
      {
        number: '72',
        title: 'Questions to Our Journalists: Episodic Controversy vs. Multi-Year Institutional Follow-Up',
        investigativeQuestion: 'Did regional reporting follow Habak continuously across 2009 disclosures, 2011 audits, and 2017 court orders?',
        primaryRecordsAndMethods: 'Content analysis of English and Urdu regional press archives (2005–2026).',
      },
      {
        number: '73',
        title: 'Questions to Environmental NGOs and Universities: Protecting Research Commons',
        investigativeQuestion: 'Could civil society and universities have forged an independent regional freshwater research consortium?',
        primaryRecordsAndMethods: 'Institutional cooperation review across Kashmir Universities, NIT Srinagar, and SKUAST-K.',
      },
      {
        number: '74',
        title: 'Connecting with South Asia’s Environmental Vanguard: Courage Under Constraint',
        investigativeQuestion: 'What lessons from South Asia’s 32 environmental pioneers illuminate institutional persistence in Kashmir?',
        primaryRecordsAndMethods: 'Cross-monograph synthesis with Monograph 08 (South Asia’s Environmental Vanguard).',
      },
      {
        number: '75',
        title: 'Paired Case Study: Sálim Ali National Park (The Landscape) & Habak Laboratory (The Knowledge)',
        investigativeQuestion: 'What happens when both protected habitat and diagnostic science yield to competing administrative priorities?',
        primaryRecordsAndMethods: 'Six-axis comparative governance matrix (explicitly preserving distinct legal histories).',
      },
      {
        number: '76',
        title: 'Recovering Unrecognized Regional Interventions and Quiet Custodians',
        investigativeQuestion: 'Which scientists, officials, and citizens quietly preserved samples, data, or objections during difficult years?',
        primaryRecordsAndMethods: 'Open documentary call & verified archival recognition register.',
      },
    ],
  },
  {
    roman: 'XI',
    title: 'International Aquatic Research Institutions and Their Lessons',
    chapterRange: '77–82',
    scopeSummary:
      'Studies five leading international freshwater research models—IISD-ELA, Eawag, IGB, USGS, and UKCEH—translating their governance principles to Western Himalayan realities.',
    chapters: [
      {
        number: '77',
        title: 'IISD Experimental Lakes Area (Canada): Whole-Ecosystem Validation and Phosphorus Truth',
        investigativeQuestion: 'How did whole-lake experiments settle global debates over carbon vs. phosphorus control of eutrophication?',
        primaryRecordsAndMethods: 'Schindler et al. long-term ELA records & governance history of institutional survival.',
      },
      {
        number: '78',
        title: 'Eawag (Switzerland): Uniting Alpine Limnology with Independent Wastewater Engineering',
        investigativeQuestion: 'How did Switzerland reverse alpine lake eutrophication through Eawag’s independent STP and P-ban science?',
        primaryRecordsAndMethods: 'Swiss alpine lake recovery archives (Lake Zurich, Constance, Geneva) & Eawag charter.',
      },
      {
        number: '79',
        title: 'Leibniz Institute IGB (Germany): Shallow-Lake Macrophyte Hysteresis and Career Depth',
        investigativeQuestion: 'What lessons does IGB hold for shallow macrophyte-dominated lakes like Dal, Anchar, and Hokersar?',
        primaryRecordsAndMethods: 'Shallow-lake alternative stable states literature & IGB departmental structure.',
      },
      {
        number: '80',
        title: 'USGS Water Resources Mission Area (USA): Open Continuous Records Beyond Political Cycles',
        investigativeQuestion: 'How do standardized QA/QC protocols and public data portals insulate hydrological truth from politics?',
        primaryRecordsAndMethods: 'USGS NWIS architecture, rating-curve QA/QC, and statutory non-interference rules.',
      },
      {
        number: '81',
        title: 'UK Centre for Ecology & Hydrology (UKCEH): Multi-Decadal Lake Monitoring Continuity',
        investigativeQuestion: 'How did 75+ years of uninterrupted Cumbrian Lakes monitoring reveal climate-nutrient interactions?',
        primaryRecordsAndMethods: 'Windermere/UKCEH long-term ecological series governance.',
      },
      {
        number: '82',
        title: 'Adapting Global Institutional Principles Without Requiring Billion-Dollar Budgets',
        investigativeQuestion: 'Which low-cost governance, tenure, and open-data safeguards can Kashmir adopt immediately?',
        primaryRecordsAndMethods: 'Phased institutional design and realistic capital/operating cost scaling for Himalayan states.',
      },
    ],
  },
  {
    roman: 'XII',
    title: 'Rebuilding Western Himalayan Environmental Science',
    chapterRange: '83–90',
    scopeSummary:
      'Establishes the 12-institution statutory responsibility & right-of-response framework, the proposed 16-division Western Himalayan Institute of Aquatic Sciences and Environmental Engineering, and KEW’s permanent 12-engine Observatory.',
    chapters: [
      {
        number: '83',
        title: 'Naming Institutional Responsibilities Across Twelve Decision-Making Tiers',
        investigativeQuestion: 'How do we distinguish negligence, administrative error, financial irregularity, scientific disagreement, and misconduct?',
        primaryRecordsAndMethods: '12-institution responsibility matrix + five-category evidentiary classification standard.',
      },
      {
        number: '84',
        title: 'Right-of-Response Dockets: Formal Questions to HUDD, H&ME, LCMA, JKPCC and Finance',
        investigativeQuestion: 'What standardized documentary questions are being transmitted to each accountable authority?',
        primaryRecordsAndMethods: 'Pre-publication right-of-reply letters & verbatim response publication commitment.',
      },
      {
        number: '85',
        title: 'Charter for the Proposed Western Himalayan Institute of Aquatic Sciences and Environmental Engineering',
        investigativeQuestion: 'How should a permanent, autonomous mountain freshwater research institute be legally constituted?',
        primaryRecordsAndMethods: 'Proposed statutory charter, governing council autonomy, and peer-reviewed directorial search.',
      },
      {
        number: '86',
        title: 'Sixteen Core Scientific Divisions: From Sediment Biogeochemistry to Independent Tech Evaluation',
        investigativeQuestion: 'How do the 16 divisions close every monitoring gap identified in CAG 2011 and CAG 2025?',
        primaryRecordsAndMethods: '16-division laboratory instrumentation, staffing, and inter-basin scope blueprint.',
      },
      {
        number: '87',
        title: 'Firewalling Science from Procurement: Independent Evaluation of Dredging, STPs and Weeders',
        investigativeQuestion: 'Why must the institution evaluating restoration performance never report to the officer procuring contracts?',
        primaryRecordsAndMethods: 'Institutional conflict-of-interest firewall & mandatory pre/post-commissioning audit rules.',
      },
      {
        number: '88',
        title: 'Protected Multi-Decadal Monitoring Budgets and Open Public Limnological Archives',
        investigativeQuestion: 'How can ring-fenced statutory endowments prevent sampling interruptions across election cycles?',
        primaryRecordsAndMethods: 'FAIR open-data limnological repository standard & ring-fenced conservation cess design.',
      },
      {
        number: '89',
        title: 'KEW Environmental Scientific Infrastructure & Institutional Legacy Observatory (12 Engines)',
        investigativeQuestion: 'How does Kashmir EcoWatch operationalize permanent public tracking of scientific institutions and assets?',
        primaryRecordsAndMethods: 'Technical specification of Engines SIIO-01 through SIIO-12.',
      },
      {
        number: '90',
        title: 'Epilogue Protocol: Recovering the Science Necessary to Save Western Himalayan Waters',
        investigativeQuestion: 'What measurable five-year milestones would demonstrate genuine scientific recovery at Dal Lake by 2031?',
        primaryRecordsAndMethods: '2026–2031 Habak Scientific Recovery Milestone Scorecard.',
      },
    ],
  },
];

export const ALL_90_HABAK_CHAPTERS: HabakChapterSpec[] = HABAK_MONOGRAPH_VOLUMES_12.flatMap((vol) =>
  vol.chapters.map((ch) => ({
    number: ch.number,
    slug: slugifyTitle(ch.number, ch.title),
    volumeRoman: vol.roman,
    volumeTitle: vol.title,
    title: ch.title,
    investigativeQuestion: ch.investigativeQuestion,
    primaryRecordsAndMethods: ch.primaryRecordsAndMethods,
    verificationStatus:
      'Proposed Monograph 10 Chapter Protocol · Historical File & Field Verification Ongoing',
  }))
);

export function getHabakMonographChapterBySlug(slug: string): HabakChapterSpec | undefined {
  return ALL_90_HABAK_CHAPTERS.find((ch) => ch.slug === slug);
}
