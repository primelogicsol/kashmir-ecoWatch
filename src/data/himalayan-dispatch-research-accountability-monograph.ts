// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 04 & DISPATCH 12 MASTER ARCHITECTURE
// "WHO ARE WE RESEARCHING FOR? THE WORLD KNOWS OUR MOUNTAINS. DO WE?"
//
// Special Scientific Investigation & Proposed 15-Volume, 60-Chapter Monograph
// + Permanent KEW Companion: Western Himalayan Environmental Research Observatory
//
// NON-NEGOTIABLE EDITORIAL & METRIC INTEGRITY CONDITION:
// Zero estimated or invented regional publication totals are asserted.
// Only verified documentary starting anchors (the preliminary 80-unit working
// inventory across 5 regions and the University of Kashmir Dept. of Geography &
// Disaster Management 2019–2023 departmental register of 145 reported papers)
// are stated numerically; all unretrieved regional, annual, and pipeline totals
// remain strictly marked "TBD" or "Outstanding" pending completion of the
// deduplicated 2001–2026 bibliometric census.
// ─────────────────────────────────────────────────────────────────────────────

export interface ResearchMonographVolumeSpec {
  volumeNumber: number;
  volumeRoman:
    | 'I'
    | 'II'
    | 'III'
    | 'IV'
    | 'V'
    | 'VI'
    | 'VII'
    | 'VIII'
    | 'IX'
    | 'X'
    | 'XI'
    | 'XII'
    | 'XIII'
    | 'XIV'
    | 'XV';
  volumeTitle: string;
  chapterRange: string;
  editorialStepAlignment: string;
  thematicMandate: string;
}

export interface ResearchMonographChapterProtocol {
  number: string; // '01' .. '60'
  slug: string;
  volumeRoman: ResearchMonographVolumeSpec['volumeRoman'];
  volumeTitle: string;
  title: string;
  analyticalFocus: string;
  bibliometricAndDocumentaryProtocol: string;
  researchStatus: string;
}

export interface RegionalPreliminaryInventoryRow {
  region: string;
  preliminaryUnitsIdentified: number;
  representativeInstitutionsScope: string;
  verificationStatus: string;
}

export interface BibliometricPeriodRow {
  period: string;
  kashmir: 'TBD';
  jammu: 'TBD';
  ladakh: 'TBD';
  ajk: 'TBD';
  gilgitBaltistan: 'TBD';
  uniqueRegionalTotal: 'TBD';
}

export interface ResearchObservatoryRegistrySpec {
  code: string;
  registryName: string;
  permanentFunction: string;
  reusedKewSurfaceLabel: string;
  reusedKewSurfaceHref: string;
}

export const RESEARCH_ACCOUNTABILITY_MONOGRAPH_SPEC = {
  monographCode:
    'MONOGRAPH 04 · ACADEMIC RESEARCH, KNOWLEDGE DISSEMINATION & SCIENTIFIC IMPACT ACCOUNTABILITY',
  monographSlug: 'monograph-04-who-are-we-researching-for',
  dispatchNumber: '12',
  dispatchSlug: 'who-are-we-researching-for',
  kicker:
    'SPECIAL SCIENTIFIC INVESTIGATION · ACADEMIC RESEARCH · KNOWLEDGE DISSEMINATION · SCIENTIFIC IMPACT ACCOUNTABILITY',
  title: 'Who Are We Researching For?',
  subtitle: 'The World Knows Our Mountains. Do We?',
  extendedSubtitle:
    'Twenty-Five Years of Environmental Research Across the Western Himalayas: Academic Productivity, Global Scientific Recognition, Local Knowledge Accessibility and the Missing Evidence of Environmental Impact.',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Scientific Research, Academic Affairs and Knowledge Accountability Desk',
  geographicScope:
    'Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan · Western Himalayas',
  assessmentPeriod: 'January 1, 2001 – November 27, 2026 (2026 partial reporting year)',
  futureAgendaHorizon: '2027–2035',
  statusBadge:
    'Stage 08 Pre-Release Special Scientific Investigation & Bibliometric Census Protocol (Zero Unverified Totals Published)',
  heroStats: [
    { value: '5', label: 'Geographical regions' },
    { value: '80', label: 'Preliminary research units' },
    { value: '15 / 60', label: 'Volumes / Chapters' },
  ],
  strictTenStepEditorialSequence: [
    'First: Count the institutions.',
    'Second: Count the scientists.',
    'Third: Count the research papers.',
    'Fourth: Establish annual research productivity.',
    'Fifth: Identify research funding and expenditure.',
    'Sixth: Establish where the knowledge was published and disseminated.',
    'Seventh: Determine what reached local stakeholders.',
    'Eighth: Determine what was implemented.',
    'Ninth: Determine what environmental improvements were independently demonstrated.',
    'Tenth: Challenge the existing system and propose a scientifically credible alternative.',
  ],
  definingEditorialArgument: [
    'The Western Himalayas do not suffer merely from environmental problems. They may also suffer from an inadequate circulation of environmental knowledge.',
    'Our universities study our mountains. Our laboratories analyze our water. Our scientists investigate our glaciers. Our researchers examine our atmosphere. The scientific community deserves appreciation for this intellectual contribution.',
    'But knowledge must not become an export commodity that earns academic recognition abroad while remaining inaccessible to the communities whose landscapes made the research possible.',
  ],
  definingMaxim:
    'Publish for the world. Explain to the people. Demonstrate on the ground. Measure the impact.',
  closingQuestion:
    'After thousands of potential scientific discoveries concerning the Western Himalayas, how much of that accumulated knowledge has actually returned to the Western Himalayas?',
  evidentiaryNotice:
    'Strict Bibliometric Non-Fabrication Condition: This flagship investigation is governed by an absolute editorial rule—zero estimated or invented regional publication totals may be published. The preliminary working inventory of 80 environment-related departments, laboratories, centres, programmes, and field facilities across all five regions (24 Kashmir Valley, 19 Jammu, 16 Gilgit-Baltistan, 11 Ladakh, 10 Azad Jammu & Kashmir) represents research units rather than 80 independent universities and remains under verification. The University of Kashmir Department of Geography and Disaster Management’s institutional register reporting 145 publications during 2019–2023 (29/year average) serves strictly as a documented proof of retrievability, not yet filtered exclusively to environmental science or deduplicated. All regional 2001–2026 publication cells and research-to-ground conversion stages remain marked TBD ("not yet retrieved and validated", never "zero") until programmatic OpenAlex, Crossref, Scopus, Web of Science, Shodhganga, HEC, and institutional-register reconciliation is completed, accompanied by full Institutional Right of Response for every academic body across all five regions.',
  internalPublicationSpecifications: [
    { component: 'Geographical regions', target: '5 (Kashmir · Jammu · Ladakh · AJ&K · Gilgit-Baltistan)' },
    { component: 'Research assessment period', target: '2001–2026 (Jan 1, 2001 – Nov 27, 2026; 2026 partial)' },
    { component: 'Preliminary research facilities identified', target: '80 research units, pending complete verification' },
    { component: 'Thematic volumes', target: '15 (Volumes I–XV)' },
    { component: 'Proposed chapters', target: '60 (Chapters 01–60)' },
    { component: 'Institutional dossiers', target: 'Every verified environmental research institution across 5 regions' },
    { component: 'Annual publication census', target: 'Institution-wise, region-wise & 30-discipline deduplicated annual series' },
    { component: 'Research impact assessment', target: '7-stage audit: Publication -> Dissemination -> Implementation -> Verified outcomes' },
    { component: 'Proposed reform', target: 'Western Himalayan Research-to-Society and Impact Protocol (WH-RSIP)' },
    { component: 'Future research agenda', target: '2027–2035 regional scientific priorities' },
    { component: 'Institutional right of response', target: 'Guaranteed to all relevant academic and research institutions' },
    { component: 'Permanent KEW companion', target: 'Western Himalayan Environmental Research Observatory (12 Registries)' },
  ],
  publicationHierarchy: [
    {
      level: '01 · Inaugural Edition Flagship (Dispatch 12)',
      title: 'Dispatch 12 — Who Are We Researching For?',
      detail:
        'Positioned immediately after Dispatch 11 (Founding Manifesto) and before Dispatches 13–17 (Beyond the Conference), establishing the five-region academic accountability foundation.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/who-are-we-researching-for',
      ctaLabel: 'Read Dispatch 12',
    },
    {
      level: '02 · Complete 15-Volume Special Monograph',
      title: 'Monograph 04 — 15 Thematic Volumes & 60 Proposed Chapters',
      detail:
        'Full 2001–2026 bibliometric census protocol, 30-discipline taxonomy, 10-step editorial sequence, Second-Life paper standard, and 2027–2035 agenda.',
      href: '/himalayan-dispatch/issues/monograph-04-who-are-we-researching-for',
      ctaLabel: 'Open Monograph 04',
    },
    {
      level: '03 · Permanent KEW Knowledge Companion',
      title: 'Western Himalayan Environmental Research Observatory',
      detail:
        '12-registry regional scientific knowledge return system integrated directly into KEW’s Research Library (/research-library/environmental-research-observatory).',
      href: '/research-library/environmental-research-observatory',
      ctaLabel: 'Open KEW Research Observatory',
    },
  ],
} as const;

// ─── PART I: PRELIMINARY 80-UNIT INFRASTRUCTURE INVENTORY & 15 CENSUS ROWS ──

export const PRELIMINARY_RESEARCH_UNITS_BY_REGION_5: RegionalPreliminaryInventoryRow[] = [
  {
    region: 'Kashmir Valley',
    preliminaryUnitsIdentified: 24,
    representativeInstitutionsScope:
      'University of Kashmir (Env. Science, Geoinformatics, Geography & Disaster Mgmt, CORD, Earth Sciences, Botany, Zoology), NIT Srinagar, SKUAST-Kashmir, IUST Awantipora, Central University of Kashmir & regional stations',
    verificationStatus: 'Preliminary working unit count · Institutional verification ongoing',
  },
  {
    region: 'Jammu',
    preliminaryUnitsIdentified: 19,
    representativeInstitutionsScope:
      'University of Jammu (Environmental Sciences, Geology, Remote Sensing/GIS, Botany, Zoology), SKUAST-Jammu, Central University of Jammu, IIT Jammu, SMVDU & IIIM/NIH regional laboratories',
    verificationStatus: 'Preliminary working unit count · Institutional verification ongoing',
  },
  {
    region: 'Gilgit-Baltistan',
    preliminaryUnitsIdentified: 16,
    representativeInstitutionsScope:
      'Karakoram International University Gilgit (Environmental Sciences, Glaciology/Mountain Areas Research, Earth Sciences, Biological Sciences, Forestry), University of Baltistan Skardu & high-altitude field stations',
    verificationStatus: 'Preliminary working unit count · Institutional verification ongoing',
  },
  {
    region: 'Ladakh',
    preliminaryUnitsIdentified: 11,
    representativeInstitutionsScope:
      'University of Ladakh (Leh & Kargil campuses: Environmental Science, Geology, Mountain Research), SKUAST-K High Mountain Arid Agriculture (HMAARI), DIHAR, GBPHIED Ladakh unit & atmospheric/cryospheric stations',
    verificationStatus: 'Preliminary working unit count · Institutional verification ongoing',
  },
  {
    region: 'Azad Jammu & Kashmir',
    preliminaryUnitsIdentified: 10,
    representativeInstitutionsScope:
      'University of Azad Jammu & Kashmir Muzaffarabad (Geology, Botany, Zoology, Environmental Science), MUST Mirpur, University of Poonch Rawalakot, University of Kotli & Women University Bagh',
    verificationStatus: 'Preliminary working unit count · Institutional verification ongoing',
  },
];

export const INFRASTRUCTURE_CENSUS_PARAMETERS_15: Array<[string, string]> = [
  ['Universities conducting environmental research', 'Outstanding'],
  ['Independent environmental research institutes', 'Outstanding'],
  ['Environmental science departments', 'Outstanding'],
  ['Earth science departments', 'Outstanding'],
  ['Geography and geospatial departments', 'Outstanding'],
  ['Agricultural and forestry research facilities', 'Outstanding'],
  ['Atmospheric and climatological laboratories', 'Outstanding'],
  ['Hydrological and limnological laboratories', 'Outstanding'],
  ['Cryospheric research facilities', 'Outstanding'],
  ['Environmental monitoring laboratories', 'Outstanding'],
  ['Faculty members', 'Outstanding'],
  ['Full-time research scientists', 'Outstanding'],
  ['Doctoral research scholars', 'Outstanding'],
  ['Postdoctoral researchers', 'Outstanding'],
  ['Annual public research expenditure', 'Outstanding'],
];

// ─── PART II: DOCUMENTED DEPARTMENTAL ANCHOR, 2001–2026 CENSUS & 30 DISCIPLINES

export const UOK_GEOGRAPHY_DOCUMENTED_ANCHOR = {
  institution: 'University of Kashmir · Department of Geography and Disaster Management',
  sourceUrl: 'https://geogrd.uok.edu.in/',
  reportingWindow: '2019–2023',
  reportedPublications: 145,
  annualAverage: 29,
  methodologicalCaveat:
    '2019–2023 departmental publication register cited strictly as documentary proof that institutional publication histories can be reconstructed; not yet filtered exclusively to environmental research or independently deduplicated across co-authoring departments.',
} as const;

export const BIBLIOMETRIC_CENSUS_PERIOD_TABLE: BibliometricPeriodRow[] = [
  { period: '2001–2005', kashmir: 'TBD', jammu: 'TBD', ladakh: 'TBD', ajk: 'TBD', gilgitBaltistan: 'TBD', uniqueRegionalTotal: 'TBD' },
  { period: '2006–2010', kashmir: 'TBD', jammu: 'TBD', ladakh: 'TBD', ajk: 'TBD', gilgitBaltistan: 'TBD', uniqueRegionalTotal: 'TBD' },
  { period: '2011–2015', kashmir: 'TBD', jammu: 'TBD', ladakh: 'TBD', ajk: 'TBD', gilgitBaltistan: 'TBD', uniqueRegionalTotal: 'TBD' },
  { period: '2016–2020', kashmir: 'TBD', jammu: 'TBD', ladakh: 'TBD', ajk: 'TBD', gilgitBaltistan: 'TBD', uniqueRegionalTotal: 'TBD' },
  { period: '2021', kashmir: 'TBD', jammu: 'TBD', ladakh: 'TBD', ajk: 'TBD', gilgitBaltistan: 'TBD', uniqueRegionalTotal: 'TBD' },
  { period: '2022', kashmir: 'TBD', jammu: 'TBD', ladakh: 'TBD', ajk: 'TBD', gilgitBaltistan: 'TBD', uniqueRegionalTotal: 'TBD' },
  { period: '2023', kashmir: 'TBD', jammu: 'TBD', ladakh: 'TBD', ajk: 'TBD', gilgitBaltistan: 'TBD', uniqueRegionalTotal: 'TBD' },
  { period: '2024', kashmir: 'TBD', jammu: 'TBD', ladakh: 'TBD', ajk: 'TBD', gilgitBaltistan: 'TBD', uniqueRegionalTotal: 'TBD' },
  { period: '2025', kashmir: 'TBD', jammu: 'TBD', ladakh: 'TBD', ajk: 'TBD', gilgitBaltistan: 'TBD', uniqueRegionalTotal: 'TBD' },
  { period: '2026, partial (through Nov 27)', kashmir: 'TBD', jammu: 'TBD', ladakh: 'TBD', ajk: 'TBD', gilgitBaltistan: 'TBD', uniqueRegionalTotal: 'TBD' },
  { period: 'Total (2001–Nov 27, 2026)', kashmir: 'TBD', jammu: 'TBD', ladakh: 'TBD', ajk: 'TBD', gilgitBaltistan: 'TBD', uniqueRegionalTotal: 'TBD' },
];

export const BIBLIOMETRIC_DATABASES_10: Array<{
  name: string;
  url?: string;
  purpose: string;
}> = [
  {
    name: 'OpenAlex',
    url: 'https://openalex.org/',
    purpose: 'Programmatic institutional ROR filtering, annual group_by counts, topic classification, open-access status, and citation networks.',
  },
  {
    name: 'Crossref',
    url: 'https://www.crossref.org/',
    purpose: 'Canonical DOI verification, journal ISSN reconciliation, funder metadata, and publication date validation.',
  },
  {
    name: 'Scopus',
    purpose: 'Indexed peer-reviewed scientific literature, author affiliation histories, and international citation benchmarking.',
  },
  {
    name: 'Web of Science',
    purpose: 'Long-horizon Science Citation Index / ESCI archival publication and citation verification (2001–2026).',
  },
  {
    name: 'Google Scholar',
    url: 'https://scholar.google.com/',
    purpose: 'Supplementary discovery of regional-journal articles, book chapters, conference papers, and grey-literature citations.',
  },
  {
    name: 'Shodhganga (INFLIBNET)',
    url: 'https://shodhganga.inflibnet.ac.in/',
    purpose: 'Full-text doctoral (Ph.D.) thesis census across universities in Kashmir, Jammu, and Ladakh.',
  },
  {
    name: 'Pakistan HEC Research Repository (PRR)',
    purpose: 'Doctoral dissertations and accredited academic research across Azad Jammu & Kashmir and Gilgit-Baltistan universities.',
  },
  {
    name: 'University & Departmental Repositories',
    url: 'https://geogrd.uok.edu.in/',
    purpose: 'Department-level faculty publication registers, IQAC/NAAC self-study reports, and laboratory outputs.',
  },
  {
    name: 'Annual Institutional & Statutory Reports',
    purpose: 'Audited research grants, sponsored projects (DST, MoEFCC, NMHS, PSF, HEC), manpower, and annual productivity.',
  },
  {
    name: 'ORCID Registry',
    url: 'https://orcid.org/',
    purpose: 'Persistent researcher identity disambiguation and multi-institution co-authorship reconciliation.',
  },
];

export const ENVIRONMENTAL_RESEARCH_DISCIPLINES_30: Array<{
  number: string;
  discipline: string;
}> = [
  { number: '01', discipline: 'Environmental science' },
  { number: '02', discipline: 'Climatology' },
  { number: '03', discipline: 'Atmospheric science' },
  { number: '04', discipline: 'Air pollution' },
  { number: '05', discipline: 'Hydrology' },
  { number: '06', discipline: 'Limnology' },
  { number: '07', discipline: 'Water pollution' },
  { number: '08', discipline: 'Glaciology' },
  { number: '09', discipline: 'Cryospheric science' },
  { number: '10', discipline: 'Geology' },
  { number: '11', discipline: 'Geomorphology' },
  { number: '12', discipline: 'Remote sensing' },
  { number: '13', discipline: 'GIS and geospatial science' },
  { number: '14', discipline: 'Forest ecology' },
  { number: '15', discipline: 'Biodiversity' },
  { number: '16', discipline: 'Wildlife conservation' },
  { number: '17', discipline: 'Wetland ecology' },
  { number: '18', discipline: 'Soil science' },
  { number: '19', discipline: 'Agroecology' },
  { number: '20', discipline: 'Climate-resilient horticulture' },
  { number: '21', discipline: 'Natural hazards' },
  { number: '22', discipline: 'Disaster risk reduction' },
  { number: '23', discipline: 'Environmental engineering' },
  { number: '24', discipline: 'Renewable energy and environmental systems' },
  { number: '25', discipline: 'Environmental governance' },
  { number: '26', discipline: 'Environmental economics' },
  { number: '27', discipline: 'Nature-based Solutions' },
  { number: '28', discipline: 'Ecological restoration' },
  { number: '29', discipline: 'Environmental health' },
  { number: '30', discipline: 'Sustainable development' },
];

// ─── PART III: KNOWLEDGE DESTINATION AUDIT & 7-STAGE PIPELINE ────────────────

export const KNOWLEDGE_DESTINATION_AUDIT_12: Array<[string, string]> = [
  ['International journal publications', 'Number and percentage (TBD pending census)'],
  ['National journal publications', 'Number and percentage (TBD pending census)'],
  ['Open-access publications', 'Number and percentage (Gold/Green/Diamond OA vs. paywalled)'],
  ['Subscription-restricted publications', 'Number and percentage (inaccessible without institutional subscription)'],
  ['Regional-language summaries', 'Number and percentage (Kashmiri, Urdu, Dogri, Balti, Shina, Ladakhi, Pahari, Gojri)'],
  ['Plain-language public summaries', 'Number and percentage (non-specialist citizen accessibility)'],
  ['Government policy briefs', 'Number and percentage (formally docketed with line departments)'],
  ['Community training materials', 'Number and percentage (farmer, pastoralist, fisher & village-committee guides)'],
  ['Stakeholder guidance documents', 'Number and percentage (actionable municipal, school & disaster-response protocols)'],
  ['Operational scientific applications', 'Number and percentage (live forecasting, monitoring or engineering tools)'],
  ['Field-validated solutions', 'Number and percentage (piloted and empirically tested under Himalayan conditions)'],
  ['Independently verified environmental improvements', 'Number and percentage (demonstrated biophysical recovery against baseline)'],
];

export const RESEARCH_TO_GROUND_PIPELINE_7 = [
  { stage: '01', title: 'Environmental research published', instruction: 'Establish the complete deduplicated 2001–2026 publication census', status: 'TBD' as const },
  { stage: '02', title: 'Research accessible to the public', instruction: 'Verify open-access availability versus subscription paywalls', status: 'TBD' as const },
  { stage: '03', title: 'Research explained in simple language', instruction: 'Locate accessible plain-language and vernacular scientific summaries', status: 'TBD' as const },
  { stage: '04', title: 'Research communicated to stakeholders', instruction: 'Verify workshops, statutory guidance notes, and community engagement', status: 'TBD' as const },
  { stage: '05', title: 'Research adopted on the ground', instruction: 'Locate documented administrative, engineering, or community implementation', status: 'TBD' as const },
  { stage: '06', title: 'Environmental impact verified', instruction: 'Measure actual physical, chemical, or ecological outcomes against baselines', status: 'TBD' as const },
  { stage: '07', title: 'Long-term impact sustained', instruction: 'Verify continuing multi-year effectiveness after grant closure', status: 'TBD' as const },
] as const;

// ─── PART IV: 12 QUESTIONS FOR THE SCIENTIFIC COMMUNITY ──────────────────────

export const SCIENTIFIC_COMMUNITY_QUESTIONS_12: Array<[string, string]> = [
  ['Dal Lake', 'Which published research solutions have demonstrated measurable restoration in nutrient or sediment balances?'],
  ['Wular Lake', 'Which research-informed interventions have measurably reduced catchment sedimentation or restored floodplain hydroperiods?'],
  ['Atmospheric pollution', 'Has twenty-five years of air-quality research established a validated, open regional emission and source-apportionment inventory?'],
  ['Jhelum floods', 'Which university hydrological and hydraulic flood models have become operational public early-warning forecasting systems?'],
  ['Karewa destruction', 'Has quaternary geological and stratigraphic research been translated into enforceable statutory protection for karewa tablelands?'],
  ['Glaciers', 'Have cryospheric mass-balance observations been integrated into municipal irrigation and drinking-water security planning?'],
  ['Wetlands', 'Has wetland remote-sensing and biodiversity research altered urban master-plan land-use decisions or halted marsh infilling?'],
  ['Forests', 'Has forest-ecology and fragmentation monitoring resulted in documented compartment recovery or frontline protection upgrades?'],
  ['Horticulture', 'Have agroecological, pest, and climate-resilience findings reached orchardists and farmers in practical vernacular formats?'],
  ['Landslides', 'Have geotechnical slope-stability and hazard-zonation papers altered highway cut-slope alignments or spoil-disposal engineering?'],
  ['Biodiversity', 'Have threatened-species and corridor studies produced legally notified habitat protections or population recoveries?'],
  ['Tourism', 'Have alpine carrying-capacity assessments governed visitor caps, hotel borewells, or solid-waste ceilings in Gulmarg, Pahalgam, Sonamarg, Leh, or Hunza?'],
];

// ─── PART V: CONVENTIONAL VS CONTEMPORARY SCIENTIFIC FRONTIERS (10 PAIRS) ────

export const RESEARCH_MATURITY_SHIFT_10: Array<{
  conventionalActivity: string;
  contemporaryOpportunity: string;
}> = [
  { conventionalActivity: 'Describing historical land-use change', contemporaryOpportunity: 'Continuous automated satellite land-change & encroachment alerting' },
  { conventionalActivity: 'Documenting past glacier retreat', contemporaryOpportunity: 'Sub-basin prediction of glacier-dependent seasonal water insecurity' },
  { conventionalActivity: 'Measuring isolated station AQI', contemporaryOpportunity: 'Coupled chemical-transport & receptor regional source attribution' },
  { conventionalActivity: 'Describing lake eutrophication symptoms', contemporaryOpportunity: 'Coupled 3D hydrodynamic, benthic-flux, and nutrient mass-balance modelling' },
  { conventionalActivity: 'Mapping static flood vulnerability zones', contemporaryOpportunity: 'Real-time ensemble operational flood & cloudburst forecasting' },
  { conventionalActivity: 'Identifying ecological degradation', contemporaryOpportunity: 'Field-testing and validating scalable ecological restoration interventions' },
  { conventionalActivity: 'Studying historical climate variability', contemporaryOpportunity: 'Convection-permitting high-resolution Himalayan climate projections' },
  { conventionalActivity: 'Conducting periodic biodiversity checklists', contemporaryOpportunity: 'Environmental DNA (eDNA), bioacoustics & automated camera-trap intelligence' },
  { conventionalActivity: 'Publishing general conservation recommendations', contemporaryOpportunity: 'Demonstrating before-after-control-impact (BACI) intervention effectiveness' },
  { conventionalActivity: 'Producing static journal PDF maps', contemporaryOpportunity: 'Maintaining open, dynamic, API-accessible environmental intelligence systems' },
];

// ─── PART VI: RESEARCH-TO-SOCIETY PROTOCOL (9 CATEGORIES) & SECOND-LIFE PAPER

export const RESEARCH_TO_SOCIETY_PROTOCOL_9: Array<{
  category: string;
  obligation: string;
}> = [
  {
    category: 'Fundamental science',
    obligation: 'Publish validated theoretical or empirical discoveries openly without artificial or inappropriate implementation burdens.',
  },
  {
    category: 'Observational research',
    obligation: 'Publish reproducible datasets/methods and communicate relevant long-term implications to public repositories.',
  },
  {
    category: 'Diagnostic environmental research',
    obligation: 'Publish contaminant, hazard, or degradation evidence alongside clear identification of affected communities and authorities.',
  },
  {
    category: 'Predictive research',
    obligation: 'Publish forecast or projection ensembles with explicit out-of-sample model validation, skill scores, and uncertainty bounds.',
  },
  {
    category: 'Applied experimental research',
    obligation: 'Publish complete pilot or laboratory experimental performance, failure modes, and cost parameters.',
  },
  {
    category: 'Proposed environmental solutions',
    obligation: 'Require real-world Himalayan field validation before claiming operational or policy effectiveness.',
  },
  {
    category: 'Implemented environmental solutions',
    obligation: 'Require documented institutional/community adoption records and post-installation operational monitoring.',
  },
  {
    category: 'Claimed ecological restoration',
    obligation: 'Require independently verified biophysical improvement against pre-intervention baselines.',
  },
  {
    category: 'Publicly funded research',
    obligation: 'Require open plain-language and regional-language knowledge-transfer outputs accessible to taxpayers and mountain residents.',
  },
];

export const SECOND_LIFE_PAPER_QUESTIONS_9 = [
  'What environmental problem was investigated?',
  'What did the research establish?',
  'Why does it matter to local people?',
  'What should affected stakeholders know?',
  'What practical action is scientifically justified?',
  'Which institution has responsibility for implementation?',
  'Has the recommendation been tested?',
  'What improvement was achieved, if any?',
  'What remains uncertain?',
] as const;

export const SECOND_LIFE_REGIONAL_LANGUAGES = [
  'English',
  'Kashmiri',
  'Urdu',
  'Dogri',
  'Balti',
  'Shina',
  'Ladakhi',
  'Pahari',
  'Gojri',
] as const;

// ─── PART VII: 12 PERMANENT KEW RESEARCH OBSERVATORY REGISTRIES ──────────────

export const WESTERN_HIMALAYAN_RESEARCH_OBSERVATORY_REGISTRIES_12: ResearchObservatoryRegistrySpec[] = [
  {
    code: 'WHERO-01',
    registryName: 'Institutional Registry',
    permanentFunction: 'Catalogues verified universities, environmental departments, and independent research institutes across all five Western Himalayan regions.',
    reusedKewSurfaceLabel: 'KEW Research Library & Institutional Scope',
    reusedKewSurfaceHref: '/research-library',
  },
  {
    code: 'WHERO-02',
    registryName: 'Laboratory Registry',
    permanentFunction: 'Documents analytical instrumentation, water/air/soil testing capabilities, field stations, and calibration accreditation.',
    reusedKewSurfaceLabel: 'KEW Monitoring Infrastructure Registry',
    reusedKewSurfaceHref: '/environmental-monitoring',
  },
  {
    code: 'WHERO-03',
    registryName: 'Researcher Registry',
    permanentFunction: 'Maps ORCID-verified environmental scientists, faculty, and doctoral scholars across 30 disciplines for peer review and collaboration.',
    reusedKewSurfaceLabel: 'KEW Research Partners Network',
    reusedKewSurfaceHref: '/become-research-partner',
  },
  {
    code: 'WHERO-04',
    registryName: 'Publication Registry',
    permanentFunction: 'Maintains a deduplicated, DOI-verified index of environmental research produced by regional institutions and external teams studying the region.',
    reusedKewSurfaceLabel: 'KEW Scientific Research Series (100 Dossiers)',
    reusedKewSurfaceHref: '/sectoral-eia/reports',
  },
  {
    code: 'WHERO-05',
    registryName: 'Bibliometric Intelligence',
    permanentFunction: 'Computes reproducible annual (2001–2026+) publication, open-access, co-authorship, and discipline-wise trajectories via OpenAlex & Crossref.',
    reusedKewSurfaceLabel: 'KEW Open Data Portal',
    reusedKewSurfaceHref: '/open-data',
  },
  {
    code: 'WHERO-06',
    registryName: 'Research Frontier Observatory',
    permanentFunction: 'Tracks regional adoption of contemporary methods—eDNA, coupled hydrodynamics, WRF-Chem, SAR interferometry, and operational forecasting.',
    reusedKewSurfaceLabel: 'KEW Satellite Change Detection Observatory',
    reusedKewSurfaceHref: '/earth-human-impact/change-detection-observatory',
  },
  {
    code: 'WHERO-07',
    registryName: 'Science in Simple Language',
    permanentFunction: 'Hosts 9-question Second-Life plain-language translations of technical Himalayan papers for citizens, schools, and journalists.',
    reusedKewSurfaceLabel: 'KEW Citizen Science & Education',
    reusedKewSurfaceHref: '/citizen-science',
  },
  {
    code: 'WHERO-08',
    registryName: 'Multilingual Knowledge Repository',
    permanentFunction: 'Disseminates stakeholder summaries across English, Kashmiri, Urdu, Dogri, Balti, Shina, Ladakhi, Pahari, and Gojri.',
    reusedKewSurfaceLabel: 'KEW Multilingual Gazetteer & Search',
    reusedKewSurfaceHref: '/search',
  },
  {
    code: 'WHERO-09',
    registryName: 'Stakeholder Guidance Registry',
    permanentFunction: 'Organizes actionable scientific evidence by user group—orchardists, fishers, pastoralists, urban planners, and disaster responders.',
    reusedKewSurfaceLabel: 'KEW Field Reports & Evidence Library',
    reusedKewSurfaceHref: '/library',
  },
  {
    code: 'WHERO-10',
    registryName: 'Implementation Registry',
    permanentFunction: 'Tracks whether published recommendations were formally docketed, piloted, or adopted by municipal, forest, or water authorities.',
    reusedKewSurfaceLabel: 'KEW Environmental Accountability Observatory',
    reusedKewSurfaceHref: '/governance/environmental-accountability-observatory',
  },
  {
    code: 'WHERO-11',
    registryName: 'Research Impact Registry',
    permanentFunction: 'Records independently verified biophysical improvements attributable to implemented regional scientific research.',
    reusedKewSurfaceLabel: 'KEW Canonical Environmental Investigations',
    reusedKewSurfaceHref: '/environmental-investigations',
  },
  {
    code: 'WHERO-12',
    registryName: 'Public Funding Accountability',
    permanentFunction: 'Cross-links publicly funded environmental research grants with open data availability and societal knowledge-transfer deliverables.',
    reusedKewSurfaceLabel: 'KEW Institutional Governance & Licensing',
    reusedKewSurfaceHref: '/governance',
  },
];

// ─── COMPLETE 15-VOLUME, 60-CHAPTER SPECIAL MONOGRAPH ARCHITECTURE ───────────

export const RESEARCH_ACCOUNTABILITY_VOLUMES_15: ResearchMonographVolumeSpec[] = [
  { volumeNumber: 1, volumeRoman: 'I', volumeTitle: 'The Complete Environmental Academic Institutional Census', chapterRange: 'Chapters 01–04', editorialStepAlignment: 'Step 01: Count the institutions', thematicMandate: 'Verifies every university, independent institute, and environmental department across Kashmir, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan beyond the 80-unit preliminary list.' },
  { volumeNumber: 2, volumeRoman: 'II', volumeTitle: 'The Scientific Laboratory and Research Infrastructure Census', chapterRange: 'Chapters 05–08', editorialStepAlignment: 'Step 01B: Count laboratories & instrumentation', thematicMandate: 'Audits analytical chemistry, water/air monitoring, geospatial, agro-forestry, and cryospheric field stations, calibration status, and public access.' },
  { volumeNumber: 3, volumeRoman: 'III', volumeTitle: 'Environmental Scientists, Professors and Research Scholars', chapterRange: 'Chapters 09–12', editorialStepAlignment: 'Step 02: Count the scientists', thematicMandate: 'Establishes verified counts and working conditions of faculty, full-time scientists, Ph.D. scholars, and postdoctoral fellows across all 30 disciplines.' },
  { volumeNumber: 4, volumeRoman: 'IV', volumeTitle: 'Twenty-Five Years of Environmental Research', chapterRange: 'Chapters 13–16', editorialStepAlignment: 'Step 03: Count the research papers (2001–2026)', thematicMandate: 'Executes the deduplicated multi-database bibliometric census (OpenAlex, Crossref, Scopus, WoS, Shodhganga, HEC) separating regional vs. external authorship.' },
  { volumeNumber: 5, volumeRoman: 'V', volumeTitle: 'Annual Scientific Publication Statistics', chapterRange: 'Chapters 17–20', editorialStepAlignment: 'Step 04: Establish annual research productivity', thematicMandate: 'Reconstructs year-by-year (2001–2026 partial), institution-wise, region-wise, and 30-discipline publication trajectories without estimates.' },
  { volumeNumber: 6, volumeRoman: 'VI', volumeTitle: 'Research Funding and Academic Productivity', chapterRange: 'Chapters 21–24', editorialStepAlignment: 'Step 05: Identify research funding and expenditure', thematicMandate: 'Tracks intramural, national, and international environmental grants, laboratory capital investments, and public expenditure per research output.' },
  { volumeNumber: 7, volumeRoman: 'VII', volumeTitle: 'International Scientific Recognition and Citations', chapterRange: 'Chapters 25–28', editorialStepAlignment: 'Step 06A: Global scientific recognition', thematicMandate: 'Documents legitimate international impact, global collaborations, IPCC/global-synthesis citations, and scholarly excellence achieved by regional scientists.' },
  { volumeNumber: 8, volumeRoman: 'VIII', volumeTitle: 'Where Our Scientific Knowledge Goes', chapterRange: 'Chapters 29–32', editorialStepAlignment: 'Step 06B: Knowledge destination audit', thematicMandate: 'Quantifies international vs. national journals, subscription paywalls vs. open access, raw-data archiving, and thesis shelf-archiving.' },
  { volumeNumber: 9, volumeRoman: 'IX', volumeTitle: 'The Local Scientific Knowledge Divide', chapterRange: 'Chapters 33–36', editorialStepAlignment: 'Step 07: Determine what reached local stakeholders', thematicMandate: 'Measures how many studies produced plain-language briefs, stakeholder guidance, or regional-language summaries for mountain communities.' },
  { volumeNumber: 10, volumeRoman: 'X', volumeTitle: 'Twenty-Five Years of Research and Environmental Outcomes', chapterRange: 'Chapters 37–40', editorialStepAlignment: 'Steps 08 & 09: Implementation & verified outcomes', thematicMandate: 'Traces the implementation pipeline across Dal, Wular, air quality, Jhelum floods, karewas, glaciers, wetlands, forests, orchards, slopes, biodiversity, and tourism.' },
  { volumeNumber: 11, volumeRoman: 'XI', volumeTitle: "Yesterday's Research in Tomorrow's World", chapterRange: 'Chapters 41–44', editorialStepAlignment: 'Step 10A: Technological & methodological maturity', thematicMandate: 'Evaluates descriptive checklists and static mapping against operational forecasting, coupled mass-balance modelling, eDNA, and continuous intelligence.' },
  { volumeNumber: 12, volumeRoman: 'XII', volumeTitle: 'Challenging the Conventional Academic Publication Model', chapterRange: 'Chapters 45–48', editorialStepAlignment: 'Step 10B: Structural incentive critique', thematicMandate: 'Interrogates impact-factor promotion metrics, paywalled export of publicly funded mountain knowledge, and disconnected government-university interfaces.' },
  { volumeNumber: 13, volumeRoman: 'XIII', volumeTitle: 'The Research-to-Society and Impact Protocol', chapterRange: 'Chapters 49–52', editorialStepAlignment: 'Step 10C: Constructive scientific reform', thematicMandate: 'Operationalizes the 9-category WH-RSIP framework—protecting fundamental discovery while requiring field validation and stakeholder outputs for applied claims.' },
  { volumeNumber: 14, volumeRoman: 'XIV', volumeTitle: 'Scientific Knowledge in the Languages of the People', chapterRange: 'Chapters 53–56', editorialStepAlignment: 'Step 10D: Vernacular Second-Life architecture', thematicMandate: 'Establishes editorial, terminological, and audio-visual standards for translating environmental science into Kashmiri, Urdu, Dogri, Balti, Shina, Ladakhi, Pahari & Gojri.' },
  { volumeNumber: 15, volumeRoman: 'XV', volumeTitle: 'The Western Himalayan Environmental Research Agenda 2027–2035', chapterRange: 'Chapters 57–60', editorialStepAlignment: 'Step 10E: Future charter & right of response', thematicMandate: 'Sets priority trans-regional scientific missions for 2027–2035, publishes full institutional responses, and charters the permanent KEW Research Observatory.' },
];

function slugifyResearchChapter(num: string, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `chapter-${num}-${clean}`;
}

const RAW_60_RESEARCH_CHAPTERS: Array<[string, ResearchMonographVolumeSpec['volumeRoman'], string, string, string]> = [
  // Vol I (01–04)
  ['01', 'I', 'Scope and Methodology of the Five-Region Institutional Census', 'Defines inclusion rules separating independent universities, constituent colleges, research centres, and field stations across all five regions.', 'ROR registry, UGC/HEC charters, university statutes, and verification questionnaires.'],
  ['02', 'I', 'Universities and Environmental Departments in Kashmir, Jammu and Ladakh', 'Verifies the 24 Kashmir, 19 Jammu, and 11 Ladakh preliminary research units into a definitive statutory institutional directory.', 'Official university calendars, NAAC/IQAC filings, and departmental registries.'],
  ['03', 'I', 'Universities and Environmental Centres in Gilgit-Baltistan and Azad Jammu & Kashmir', 'Verifies the 16 Gilgit-Baltistan and 10 AJ&K preliminary research units across KIU, University of Baltistan, UAJK, MUST, Poonch, Kotli, and Bagh.', 'HEC institutional directories, university annual reports, and faculty rosters.'],
  ['04', 'I', 'National and Autonomous Research Institutes Operating in the Western Himalayas', 'Catalogues central, autonomous, and trans-regional mountain, agricultural, forestry, hydrological, and defence-ecology research stations.', 'Institutional mandates, regional station charters, and MoU dockets.'],
  // Vol II (05–08)
  ['05', 'II', 'Atmospheric, Climatological and Air-Quality Laboratories', 'Audits reference-grade aerosol, trace-gas, meteorological, and radiosonde/lidar capabilities across valley and high-altitude campuses.', 'Instrument inventories, calibration logs, and open-data telemetry status.'],
  ['06', 'II', 'Hydrological, Limnological and Cryospheric Research Infrastructure', 'Maps water-chemistry laboratories, benchmark glacier mass-balance stations, ADCP discharge gear, and bathymetric survey assets.', 'Laboratory QA/QC protocols, glacier benchmark registries, and project equipment ledgers.'],
  ['07', 'II', 'Geospatial, Geological, Forest and Biodiversity Laboratories', 'Documents GIS/remote-sensing servers, seismic/geotechnical labs, herbaria, molecular/eDNA benches, and agro-horticultural research stations.', 'Departmental lab manuals, specimen/archive catalogues, and compute infrastructure audits.'],
  ['08', 'II', 'The Instrumentation Utilization and Maintenance Audit', 'Examines whether publicly funded analytical instruments remain operational, calibrated, and accessible across departments after grant expiry.', 'Equipment procurement records, uptime logs, and inter-institutional access policies.'],
  // Vol III (09–12)
  ['09', 'III', 'Faculty Strength and Disciplinary Specializations Across Five Regions', 'Counts tenured and contractual environmental faculty across all 30 disciplines, identifying over-represented and orphaned fields.', 'Verified faculty profiles, ORCID records, and sanctioned vs. filled post registers.'],
  ['10', 'III', 'Doctoral Scholars and Postdoctoral Researchers: The Engine of Fieldwork', 'Recognizes and quantifies the Ph.D. and postdoctoral researchers who conduct the majority of high-altitude and seasonal Himalayan sampling.', 'Shodhganga, Pakistan HEC PRR, and university Ph.D. registration/award ledgers.'],
  ['11', 'III', 'Field Safety, Logistics and Working Conditions in High-Mountain Science', 'Assesses field insurance, high-altitude safety equipment, stipend regularity, and laboratory support for early-career Himalayan researchers.', 'Institutional field-safety policies and anonymized researcher survey protocols.'],
  ['12', 'III', 'Regional Collaboration vs. Academic Silos', 'Analyses co-authorship networks within and across Kashmir, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan versus external-only partnerships.', 'OpenAlex/Crossref co-authorship graph analysis with ORCID disambiguation.'],
  // Vol IV (13–16)
  ['13', 'IV', 'Reproducible Bibliometric Architecture (2001–2026)', 'Specifies exact OpenAlex, Crossref, Scopus, WoS, Shodhganga, and HEC query strings, DOI deduplication rules, and partial-2026 cutoffs.', 'OpenAlex ROR/topic API queries, Crossref DOI snapshots, and manual validation samples.'],
  ['14', 'IV', 'Departmental Registers vs. Global Bibliometric Indexes', 'Benchmarks institutional registers—starting with UoK Geography & Disaster Management (145 papers, 2019–2023)—against indexed databases.', 'Departmental IQAC lists cross-matched line-by-line against Crossref and OpenAlex.'],
  ['15', 'IV', 'Research by Regional Institutions vs. External Parachute Science', 'Separates environmental studies led by Western Himalayan institutions from studies conducted on the region without local institutional leadership.', 'First/corresponding author affiliation parsing across 2001–2026 corpus.'],
  ['16', 'IV', 'The Doctoral Thesis Archive: Thousands of Pages Unread by Policy', 'Catalogues 25 years of environmental Ph.D. and M.Phil. dissertations sitting in university libraries without public or agency synthesis.', 'Shodhganga, HEC PRR, and university central library thesis catalogues.'],
  // Vol V (17–20)
  ['17', 'V', 'Annual Publication Trajectories (2001–2026 Partial)', 'Presents verified single-year publication counts across all five regions once census validation is completed (replacing every TBD cell empirically).', 'Validated annual work-level SQLite/Parquet bibliometric ledger.'],
  ['18', 'V', 'The Thirty-Discipline Environmental Research Matrix', 'Maps 25-year publication volume and growth rates across all 30 disciplines—from climatology and glaciology to environmental economics.', 'Multi-label discipline classification with strict cross-topic deduplication.'],
  ['19', 'V', 'Geographic Concentration of Field Sites vs. Neglected Sub-Basins', 'Geoparses study locations to test whether research clusters around accessible urban/tourist sites while remote watersheds go unmonitored.', 'Toponym extraction and watershed-level study-density cartography.'],
  ['20', 'V', 'Institution-by-Institution Productivity Dossiers', 'Provides fair, context-adjusted productivity profiles normalized by faculty size, laboratory mandate, and founding year.', 'Verified institutional dossiers with pre-publication institutional right of verification.'],
  // Vol VI (21–24)
  ['21', 'VI', 'Mapping Twenty-Five Years of Public Environmental Research Funding', 'Tracks extramural and intramural funding across DST, MoEFCC, NMHS,gbpihed, ICAR, HEC, PSF, and international bilateral grants.', 'Funder award registries, institutional annual accounts, and paper funding acknowledgments.'],
  ['22', 'VI', 'Funding Priorities vs. Regional Ecological Urgency', 'Tests whether grant allocations align with the region’s highest-severity water, air, cryosphere, and slope-hazard risks.', 'Comparative budget-share vs. hazard/burden matrix.'],
  ['23', 'VI', 'What Happens When the Three-Year Project Ends?', 'Investigates why monitoring stations, portals, and community pilots routinely collapse the month extramural project funding terminates.', 'Post-grant asset and dataset survival audit across completed sponsored projects.'],
  ['24', 'VI', 'Public Expenditure Accountability in Academic Environmental Science', 'Establishes transparent public-return indicators for tax-funded environmental research without penalizing foundational inquiry.', 'Audited grant outlays paired with open-data and stakeholder deliverables.'],
  // Vol VII (25–28)
  ['25', 'VII', 'Global Scientific Recognition of Western Himalayan Researchers', 'Honours landmark discoveries, highly cited syntheses, and international scientific leadership by scholars from across the five regions.', 'Citation percentile distributions, IPCC citations, and international society fellowships.'],
  ['26', 'VII', 'Journal Quality, Peer-Review Standards and Predatory Publishing Risks', 'Distinguishes rigorous international and national peer-reviewed scholarship from pay-to-publish predatory venues.', 'Directory of Open Access Journals (DOAJ), COPE, Scopus/WoS indexing, and retraction checks.'],
  ['27', 'VII', 'International Collaborations and Equitable Authorship', 'Examines whether high-altitude field partnerships treat regional scientists and students as intellectual co-architects or data collectors.', 'Authorship order, CRediT contributor roles, and shared data-hosting agreements.'],
  ['28', 'VII', 'Citations Abroad vs. Comprehension at Home', 'Contrasts international citation velocity with local municipal, judicial, and community awareness of the exact same papers.', 'Citation geography vs. local stakeholder awareness comparison.'],
  // Vol VIII (29–32)
  ['29', 'VIII', 'The Paywall Audit: Who Can Legally Read Research on Their Own Valley?', 'Calculates the exact share of 2001–2026 Western Himalayan environmental papers locked behind US$35–$50 per-article subscription barriers.', 'OpenAlex/Unpaywall OA classification across Gold, Green, Hybrid, Bronze, and Closed articles.'],
  ['30', 'VIII', 'Where Are the Underlying Datasets?', 'Tests how many published papers deposit raw hydrological, water-quality, species, or GIS layers in FAIR open repositories.', 'Data-availability statement verification and repository link-rot testing.'],
  ['31', 'VIII', 'National vs. International Publication Pathways', 'Evaluates visibility, indexing, and local policy reach across regional university journals, national academies, and global publishers.', 'Journal venue distribution and institutional readership access audit.'],
  ['32', 'VIII', 'The Missing Bridge to Line Departments and Regulators', 'Documents whether universities maintain formal transmission channels to PCCs, lake authorities, forest departments, and disaster agencies.', 'RTI/public-record audit of research dockets received by regulatory agencies.'],
  // Vol IX (33–36)
  ['33', 'IX', 'Plain-Language Science: A Census of Public Summaries', 'Counts how many peer-reviewed environmental papers were ever accompanied by a readable two-page public explanation.', 'Institutional websites, press releases, and extension bulletins audit.'],
  ['34', 'IX', 'The Vernacular Vacuum Across Nine Mountain Languages', 'Measures environmental research availability in Kashmiri, Urdu, Dogri, Balti, Shina, Ladakhi, Pahari, and Gojri.', 'Multilingual extension, school, and community repository inventory.'],
  ['35', 'IX', 'Orchardists, Herders, Fishers and Disaster-Prone Villages as Knowledge Partners', 'Examines whether affected mountain communities receive findings gathered from their own orchards, pastures, lakes, and slopes.', 'Extension outreach logs and community feedback protocols.'],
  ['36', 'IX', 'Environmental Journalism and the Translation Gap', 'Assesses how universities and newsrooms can collaborate to report uncertainty, methods, and actionable science accurately.', 'Media-citation accuracy review and science-communication desk standards.'],
  // Vol X (37–40)
  ['37', 'X', 'Lakes, Wetlands and Rivers: Twenty-Five Years of Papers vs. Water Quality', 'Traces published research on Dal, Wular, Hokersar, Anchar, Manasbal, and the Jhelum/Indus against documented restoration adoption.', 'Cross-audit with Monograph 03 (Dal Lake) and Monograph 00 (Upper Jhelum).'],
  ['38', 'X', 'Atmosphere, Glaciers and Floods: From Diagnosis to Operational Systems', 'Tests why decades of AQI, glacier-retreat, and flood-mapping papers rarely matured into public source inventories or operational forecasts.', 'Cross-audit with Monograph 01 (Atmosphere) and regional hydromet agencies.'],
  ['39', 'X', 'Karewas, Forests, Slopes, Biodiversity and Tourism Carrying Capacity', 'Examines where geological, ecological, geotechnical, and carrying-capacity studies succeeded—or failed—to shape statutory protection.', 'Environmental clearance files, judicial PIL citations, and master-plan dockets.'],
  ['40', 'X', 'Where Exactly Did the Research-to-Ground Pipeline Break?', 'Diagnoses failure points fairly across academic incentives, bureaucratic indifference, funding discontinuities, and political economy.', 'Seven-stage conversion funnel synthesis and institutional case histories.'],
  // Vol XI (41–44)
  ['41', 'XI', 'Descriptive Checklists vs. Process-Based Predictive Science', 'Classifies the 2001–2026 corpus by methodological maturity—separating repetitive descriptive studies from mechanistic and predictive breakthroughs.', 'Computational text/methods taxonomy across the 30 environmental disciplines.'],
  ['42', 'XI', 'Continuous Earth Observation, Sensor Metrology and Coupled Modelling', 'Identifies regional teams pioneering automated SAR/optical monitoring, WRF-Chem, hydrodynamic modelling, and calibrated instrumentation.', 'Frontier capability mapping across all five Western Himalayan regions.'],
  ['43', 'XI', 'Environmental DNA, Bioacoustics and Next-Generation Ecological Monitoring', 'Explores modern non-invasive biodiversity, pathogen, and aquatic health tools suited for rugged Himalayan terrain.', 'Laboratory readiness and cost-sharing network proposals.'],
  ['44', 'XI', 'From Static PDF Maps to Dynamic Public Environmental Intelligence', 'Demonstrates how academic spatial research can live continuously as versioned, open geospatial layers rather than dead raster figures.', 'Open OGC/GeoJSON/STAC academic publishing standards.'],
  // Vol XII (45–48)
  ['45', 'XII', 'How Promotion Metrics Reward Publication Volume Over Ecological Problem-Solving', 'Analyses UGC/API, HEC, NAAC, and ranking formulas that score journal impact factors while assigning near-zero weight to verified local impact.', 'Faculty recruitment, CAS promotion, and institutional ranking rubrics.'],
  ['46', 'XII', 'Conference Culture, Repetitive Baselines and Fragmented Projects', 'Synthesizes lessons leading directly into Dispatches 13–17 (Beyond the Conference) on why isolated papers and abstract books fail to cumulate.', 'Cross-conference thematic overlap and longitudinal follow-up audit.'],
  ['47', 'XII', 'When Publishing a Proposed Solution Is Mistaken for Solving the Problem', 'Establishes clear ethical boundaries between laboratory/model proof-of-concept and claiming real-world ecological remediation.', 'Claims-vs-validation audit of applied environmental literature.'],
  ['48', 'XII', 'Shared Responsibility: Scientists, Universities, Funders and Governments', 'Ensures balanced accountability—refusing to scapegoat researchers for regulatory or executive refusals to implement sound science.', 'Multi-actor governance responsibility matrix.'],
  // Vol XIII (49–52)
  ['49', 'XIII', 'Charter of the Western Himalayan Research-to-Society and Impact Protocol (WH-RSIP)', 'Defines the 9 research categories and differentiated obligations—safeguarding fundamental discovery while governing applied claims.', 'Complete WH-RSIP normative specification and adoption checklist.'],
  ['50', 'XIII', 'Every Research Paper’s Second Life: The Nine-Question Stakeholder Standard', 'Specifies the structured stakeholder companion brief accompanying publicly relevant environmental research.', '9-question Second-Life template, peer verification, and metadata schema.'],
  ['51', 'XIII', 'Statutory Receivability: Connecting University Findings to Regulatory Triggers', 'Links WH-RSIP directly to the Scientific Evidence-to-Governance Protocol (Dispatch 13) so verified thresholds compel agency response.', 'Model administrative rules for PCCs, wetland authorities, and disaster boards.'],
  ['52', 'XIII', 'Reforming Research Evaluation, Grants and Doctoral Supervision', 'Proposes practical credit for open datasets, operational tools, vernacular briefs, and BACI field validation in academic appraisals.', 'Draft grant-agency and university senate reform clauses.'],
  // Vol XIV (53–56)
  ['53', 'XIV', 'A Multilingual Scientific Lexicon for the Western Himalayas', 'Builds accurate, dignified terminology for glaciology, hydrology, air quality, and ecology across Kashmiri, Urdu, Dogri, Balti, Shina, Ladakhi, Pahari & Gojri.', 'Collaborative linguistic-scientific working glossary protocols.'],
  ['54', 'XIV', 'Visual, Audio and Community-First Formats Beyond Written Literacy', 'Designs village spring cards, orchard spray advisories, flood-stage graphics, and community radio briefs grounded in peer-reviewed papers.', 'Human-centred mountain science communication prototypes.'],
  ['55', 'XIV', 'Schools, Colleges and Citizen Scientists as Co-Stewards of Local Knowledge', 'Connects university laboratories with district colleges, higher secondary schools, and community observers.', 'Open curriculum modules and calibrated citizen-science protocols.'],
  ['56', 'XIV', 'Returning Field Knowledge Ethically to Host Mountain Communities', 'Establishes free, prior, and informed community data-return commitments whenever researchers sample village waters, soils, or commons.', 'Community research-ethics and knowledge-repatriation charter.'],
  // Vol XV (57–60)
  ['57', 'XV', 'Priority Trans-Regional Scientific Missions (2027–2035)', 'Identifies urgent ten-year collaborative research missions across cryosphere-water security, airshed attribution, lake mass balances, and hazard resilience.', '2027–2035 Western Himalayan Environmental Research Agenda matrix.'],
  ['58', 'XV', 'Architecture of the KEW Western Himalayan Environmental Research Observatory', 'Details the 12 permanent KEW registries returning verified bibliometric, plain-language, multilingual, and impact records to society.', 'Open technical specification integrated with /research-library.'],
  ['59', 'XV', 'Institutional Right of Response and Collaborative Verification Register', 'Publishes verbatim responses, register corrections, and implementation evidence submitted by universities and institutes across all five regions.', 'Formal right-of-reply docket and continuous update protocol.'],
  ['60', 'XV', 'Publish for the World, Explain to the People, Measure the Impact', 'Closing synthesis uniting intellectual appreciation for Himalayan scientists with a permanent covenant of public knowledge return.', 'Complete Monograph 04 synthesis and Stage 05 external review charter.'],
];

export const RESEARCH_ACCOUNTABILITY_CHAPTERS_60: ResearchMonographChapterProtocol[] =
  RAW_60_RESEARCH_CHAPTERS.map(([number, volumeRoman, title, focus, protocol]) => {
    const vol = RESEARCH_ACCOUNTABILITY_VOLUMES_15.find((v) => v.volumeRoman === volumeRoman)!;
    return {
      number,
      slug: slugifyResearchChapter(number, title),
      volumeRoman,
      volumeTitle: vol.volumeTitle,
      title,
      analyticalFocus: focus,
      bibliometricAndDocumentaryProtocol: protocol,
      researchStatus:
        'Proposed Monograph 04 Chapter Protocol · Complete 2001–2026 Bibliometric Validation & Institutional Right-of-Response Required Prior to Statistical Release',
    };
  });

export function getMonograph04ChapterBySlug(
  slug: string
): ResearchMonographChapterProtocol | null {
  return RESEARCH_ACCOUNTABILITY_CHAPTERS_60.find((c) => c.slug === slug) || null;
}
