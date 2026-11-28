// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — BEYOND THE CONFERENCE & STRATEGIC POSITIONING SPEC
// Independent Scientific & Institutional Response Series (Vol. 01 / No. 01, Nos. 11–15)
// ─────────────────────────────────────────────────────────────────────────────

export const BEYOND_THE_CONFERENCE_SERIES_SLUGS = [
  'science-has-diagnosed-the-valley-who-will-prescribe-its-governance',
  'when-the-mountain-rejects-the-engineer',
  'who-gave-development-the-right-to-exceed-the-mountain',
  'nature-is-not-a-contractor',
  'the-climate-has-changed-has-agricultural-science',
] as const;

export interface PermanentResponsibilitySpec {
  number: string;
  title: string;
  mandate: string;
}

export const HIMALAYAN_DISPATCH_PERMANENT_RESPONSIBILITIES: PermanentResponsibilitySpec[] = [
  {
    number: '01',
    title: 'Beyond Science',
    mandate: 'Examine whether scientific understanding is sufficiently comprehensive across interconnected mountain systems.',
  },
  {
    number: '02',
    title: 'Beyond Policy',
    mandate: 'Examine whether environmental policy possesses practical, fiscal, and binding legal authority.',
  },
  {
    number: '03',
    title: 'Beyond Conferences',
    mandate: 'Track whether institutional deliberations and declarations produce measurable environmental outcomes.',
  },
  {
    number: '04',
    title: 'Beyond Criticism',
    mandate: 'Develop scientifically justified, legally actionable alternative governance and engineering frameworks.',
  },
  {
    number: '05',
    title: 'Beyond Awareness',
    mandate: 'Convert environmental knowledge into enforceable institutional responsibility.',
  },
];

export const HIMALAYAN_DISPATCH_EDITORIAL_DIFFERENCE_ROWS: Array<{
  conventional: string;
  himalayanDispatch: string;
}> = [
  {
    conventional: 'What scientists discussed',
    himalayanDispatch: 'What their understanding may have overlooked',
  },
  {
    conventional: 'What research was presented',
    himalayanDispatch: 'Whether its methodology and scope are sufficient',
  },
  {
    conventional: 'What institutions recommended',
    himalayanDispatch: 'Whether recommendations are legally enforceable',
  },
  {
    conventional: 'What participants agreed upon',
    himalayanDispatch: 'Which critical questions remain unanswered',
  },
  {
    conventional: 'Conference declarations',
    himalayanDispatch: 'Institutional accountability',
  },
  {
    conventional: 'Scientific observations',
    himalayanDispatch: 'Systems-level environmental interpretation',
  },
  {
    conventional: 'Proposed solutions',
    himalayanDispatch: 'Feasibility and implementation assessment',
  },
  {
    conventional: 'Academic conclusions',
    himalayanDispatch: 'Independent intellectual advancement',
  },
  {
    conventional: 'Event coverage',
    himalayanDispatch: 'Long-term environmental governance',
  },
];

export const BEYOND_THE_CONFERENCE_SERIES_META: Record<
  string,
  {
    dispatchNumber: string;
    conferenceReference: string;
    proposedFramework: string;
  }
> = {
  'science-has-diagnosed-the-valley-who-will-prescribe-its-governance': {
    dispatchNumber: '20',
    conferenceReference: 'Independent Response · ECSSPP 2026, University of Kashmir',
    proposedFramework: 'Scientific Evidence-to-Governance Protocol for the Western Himalayas',
  },
  'when-the-mountain-rejects-the-engineer': {
    dispatchNumber: '21',
    conferenceReference: 'Independent Response · RECLAIM 2026, NIT Srinagar',
    proposedFramework: 'Western Himalayan Environmental Engineering Standard',
  },
  'who-gave-development-the-right-to-exceed-the-mountain': {
    dispatchNumber: '22',
    conferenceReference: 'Independent Response · 13th Sustainable Mountain Development Summit (SMDS-XIII)',
    proposedFramework: 'Western Himalayan Ecological Limits and Development Authorization Framework',
  },
  'nature-is-not-a-contractor': {
    dispatchNumber: '27',
    conferenceReference: 'Independent Response · International Conference on Nature-Based Solutions, IUST',
    proposedFramework: 'Long-Term Ecosystem Recovery and Restoration Accountability Framework',
  },
  'the-climate-has-changed-has-agricultural-science': {
    dispatchNumber: '28',
    conferenceReference: "Independent Response · Indian Ecological Society's 2026 Conference (IESCCC 2026)",
    proposedFramework: 'Western Himalayan Adaptive Agroecological Zoning Framework',
  },
};

export const BEYOND_THE_CONFERENCE_DEFINING_PRINCIPLE = {
  kicker: 'BEYOND THE CONFERENCE · SERIES II (DISPATCHES 20–22 & 27–28) · SCIENTIFIC & INSTITUTIONAL RESPONSE',
  headline: 'Our Editorials Begin Where Academic Conferences End',
  standfirst:
    'Himalayan Dispatch does not reproduce conference themes, summarize presentations, or amplify institutional publicity. Building directly upon "Journalism at a Crossroads" (Dispatch 17), "Who Are We Researching For?" (Dispatch 18), and "South Asia’s Environmental Vanguard" (Dispatch 19), and bridged at its centre by "The Price of Power" (Dispatch 23), "The Wealth Beneath the Mountains" (Dispatch 24), "The Rivers That No Longer Belong to Their Valleys" (Dispatch 25), and "The Western Himalayas Are Sitting on a Time Bomb" (Dispatch 26), this five-part response series interrogates systemic blind spots, legal enforceability, and engineering reality—advancing five original governance frameworks for the Western Himalayas.',
  epigraph:
    'Himalayan Dispatch should not merely ask what scientists said about Kashmir. It should ask whether what they said is sufficient to protect Kashmir.',
};

// ─────────────────────────────────────────────────────────────────────────────
// DISPATCH 06 — SPECIAL SCIENTIFIC INVESTIGATION (WESTERN HIMALAYAN ORNITHOLOGY)
// "The Sky Has No Borders: The Birds of the Western Himalayas"
// ─────────────────────────────────────────────────────────────────────────────

export const SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_06 = {
  dispatchNumber: '06',
  slug: 'the-sky-has-no-borders',
  monographEditionSlug: 'monograph-04-the-sky-has-no-borders',
  kicker:
    'SPECIAL SCIENTIFIC INVESTIGATION · ORNITHOLOGY · BIODIVERSITY · MIGRATORY ECOLOGY · HABITAT CONSERVATION',
  title: 'The Sky Has No Borders',
  subtitle:
    'The Birds of the Western Himalayas: Migration, Ecological Connectivity and the Landscapes We Are Losing',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Ornithology, Biodiversity and Geospatial Intelligence Desk',
  geographicScope:
    'Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan · Central Asian Flyway',
  statusBadge:
    'Proposed 18-volume ornithological monograph · Five-region checklist & census reconciliation ongoing',
  heroStats: [
    { value: '18', label: 'Thematic volumes' },
    { value: '54', label: 'Proposed chapters' },
    { value: '5 Regions', label: 'Connected habitats' },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// DISPATCH 12 — SPECIAL SCIENTIFIC INVESTIGATION (ACADEMIC & SCIENTIFIC ACCOUNTABILITY)
// "Who Are We Researching For? The World Knows Our Mountains. Do We?"
// ─────────────────────────────────────────────────────────────────────────────

export const SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_12 = {
  dispatchNumber: '12',
  slug: 'who-are-we-researching-for',
  monographEditionSlug: 'monograph-04-who-are-we-researching-for',
  kicker:
    'SPECIAL SCIENTIFIC INVESTIGATION · ACADEMIC RESEARCH · KNOWLEDGE DISSEMINATION · SCIENTIFIC IMPACT ACCOUNTABILITY',
  title: 'Who Are We Researching For?',
  subtitle: 'The World Knows Our Mountains. Do We?',
  extendedDescription:
    'Twenty-Five Years of Environmental Research, International Academic Recognition, Local Scientific Knowledge Accessibility and the Missing Journey from Publication to Environmental Impact.',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Scientific Research, Academic Affairs and Knowledge Accountability Desk',
  geographicScope:
    'Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan · Western Himalayas',
  statusBadge:
    'Proposed 15-volume special monograph · 2001–2026 Bibliometric census protocol (Zero estimated totals)',
  heroStats: [
    { value: '5', label: 'Geographical regions' },
    { value: '80', label: 'Preliminary units' },
    { value: '15 / 60', label: 'Volumes / Chapters' },
  ],
  publicationHierarchy: [
    {
      level: '01 · Inaugural Edition (Dispatch 12)',
      title: 'Dispatch 12 — Academic & Scientific Accountability Foundation',
      detail:
        'Positioned immediately after Dispatch 11 (Founding Manifesto) and before Beyond the Conference (Dispatches 13–17): establishes the 80-unit working inventory, strict TBD bibliometric rules, and WH-RSIP.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/who-are-we-researching-for',
      ctaLabel: 'Read Dispatch 12',
    },
    {
      level: '02 · Complete 15-Volume Special Monograph',
      title: 'Monograph 04 — 15 Thematic Volumes & 60 Proposed Chapters',
      detail:
        'Full 2001–2026 OpenAlex/Crossref/Shodhganga/HEC census protocol, 30 disciplines, Second-Life paper standard, and 2027–2035 agenda.',
      href: '/himalayan-dispatch/issues/monograph-04-who-are-we-researching-for',
      ctaLabel: 'Open Monograph 04',
    },
    {
      level: '03 · Permanent KEW Companion',
      title: 'Western Himalayan Environmental Research Observatory',
      detail:
        '12 permanent registries inside KEW’s Research Library returning verified, plain-language, and 9-language scientific summaries to mountain communities.',
      href: '/research-library/environmental-research-observatory',
      ctaLabel: 'Open KEW Observatory',
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// DISPATCH 04 — SPECIAL SCIENTIFIC INVESTIGATION (DAL LAKE CONSERVATION MATH)
// "The Mathematics of a Dying Lake: Decades of Conservation, Crores of Expenditure
//  and the Unresolved Engineering of Dal Lake"
// ─────────────────────────────────────────────────────────────────────────────

export const SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_04 = {
  dispatchNumber: '04',
  slug: 'the-mathematics-of-a-dying-lake',
  monographEditionSlug: 'monograph-03-mathematics-of-a-dying-lake',
  kicker:
    'SPECIAL SCIENTIFIC INVESTIGATION · LIMNOLOGY · ENVIRONMENTAL ENGINEERING · PUBLIC EXPENDITURE ACCOUNTABILITY',
  title: 'The Mathematics of a Dying Lake',
  subtitle:
    'Decades of Conservation, Crores of Expenditure and the Unresolved Engineering of Dal Lake',
  extendedDescription:
    'A forensic scientific investigation into settling basin efficiency, peripheral sewage treatment, nutrient loading, mechanical de-weeding, dredging, catchment conservation, hydrological management and ecological accountability.',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Environmental Engineering, Limnology and Geospatial Intelligence Desk',
  geographicScope:
    'Dal–Nigeen Lake System · Telbal Catchment · Srinagar · Western Himalayas',
  statusBadge:
    'Proposed 10-volume scientific monograph · Forensic engineering framework (Documentary retrieval ongoing)',
  heroStats: [
    { value: '10', label: 'Thematic volumes' },
    { value: '62', label: 'Scientific chapters' },
    { value: '8', label: 'Scientific balances' },
  ],
  publicationHierarchy: [
    {
      level: '01 · Inaugural Edition (Dispatch 04)',
      title: 'Dispatch 04 — Executive Forensic Engineering Investigation',
      detail:
        'Placed immediately after Dispatch 03 ("The Water We Have Forgotten") in Vol. 01 / No. 01: reconstructs CAG 2025 audit findings, Sept 2026 STP capacities, and interactive mass balances.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/the-mathematics-of-a-dying-lake',
      ctaLabel: 'Read Dispatch 04',
    },
    {
      level: '02 · Complete 10-Volume Scientific Monograph',
      title: 'Monograph 03 — 10 Thematic Volumes, 62 Chapters & 25 Appendices',
      detail:
        'Full environmental-engineering monograph architecture housing all 62 chapter protocols, 6 STP dossiers, 12 scenarios (S01–S12), and 23 P0–P2 documentary requests.',
      href: '/himalayan-dispatch/issues/monograph-03-mathematics-of-a-dying-lake',
      ctaLabel: 'Open Monograph 03',
    },
    {
      level: '03 · Permanent KEW Scientific Companion',
      title: 'Dal Lake Conservation Performance Observatory',
      detail:
        '12-module scientific assessment system integrated directly into KEW Water Systems, Master Lake Registry, Algal Bloom Intelligence, and Satellite Change Detection.',
      href: '/water-systems/lakes/dal-lake/conservation-performance',
      ctaLabel: 'Open KEW Observatory',
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// DISPATCH 18 — SPECIAL SCIENTIFIC INVESTIGATION (INDEPENDENT CLASSIFICATION)
// "The Atmosphere Has No Borders: The Air We Breathe, the Numbers We Cannot Trust"
// ─────────────────────────────────────────────────────────────────────────────

export const SPECIAL_SCIENTIFIC_INVESTIGATION_DISPATCH_17 = {
  dispatchNumber: '19',
  slug: 'the-atmosphere-has-no-borders',
  monographEditionSlug: 'monograph-01-atmosphere-without-borders',
  kicker:
    'SPECIAL SCIENTIFIC INVESTIGATION · CLIMATOLOGY · TRANSBOUNDARY ATMOSPHERIC INTELLIGENCE',
  title: 'The Atmosphere Has No Borders',
  subtitle: 'The Air We Breathe, the Numbers We Cannot Trust',
  extendedDescription:
    "Kashmir's Atmospheric Crisis: Regional Climatology, Himalayan Atmospheric Dynamics, Transboundary Pollution, Aerosol Chemistry and the Scientific Credibility of Air Quality Measurements.",
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Atmospheric Science and Geospatial Intelligence Desk',
  geographicScope:
    'Kashmir Valley · Western Himalayas · Indo-Gangetic Plains · Hindu Kush · Karakoram · Tibetan Plateau · Central Asia',
  statusBadge: 'Proposed scientific monograph · Research framework (Ongoing investigation)',
  disciplines: [
    'CLIMATOLOGY & ATMOSPHERIC PHYSICS',
    'TRANSBOUNDARY POLLUTION',
    'REMOTE SENSING & GEOSPATIAL INTELLIGENCE',
    'ATMOSPHERIC CHEMISTRY',
    'SCIENTIFIC MEASUREMENT INTEGRITY',
    'PUBLIC HEALTH & ENVIRONMENTAL GOVERNANCE',
  ],
  heroStats: [
    { value: '12', label: 'Thematic parts' },
    { value: '60', label: 'Scientific chapters' },
    { value: '30 yrs', label: 'Climate baseline' },
  ],
  publicationHierarchy: [
    {
      level: '01 · Inaugural Edition',
      title: 'Dispatch 19 — Executive Scientific Investigation',
      detail:
        'Published immediately after Dispatch 18 in Vol. 01 / No. 01: synthesizes the physical climatology, transboundary hypotheses, AQI 708 measurement audit, and research architecture.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/the-atmosphere-has-no-borders',
      ctaLabel: 'Read Dispatch 19',
    },
    {
      level: '02 · Independent Scientific Monograph',
      title: 'Monograph 01 — 12 Thematic Volumes, 60 Chapters & 20 Appendices',
      detail:
        'Dedicated research framework housing all 12 thematic parts, 60 chapter protocols, equations, ventilation calculator, and 20 technical appendices.',
      href: '/himalayan-dispatch/issues/monograph-01-atmosphere-without-borders',
      ctaLabel: 'Open Monograph 01',
    },
    {
      level: '03 · KEW Scientific Companion',
      title: 'Western Himalayan Atmospheric Intelligence Observatory',
      detail:
        'Operational ground-to-model validation engine, 44-unit CAMS reanalysis grid, Western Disturbance trackers, and open framework specification.',
      href: '/risk-monitoring/air-pollution',
      ctaLabel: 'Open KEW Companion',
    },
  ],
  flagshipComparison: [
    {
      dimension: 'Title',
      dispatch01: 'The Price of Protecting Paradise',
      dispatch17: 'The Atmosphere Has No Borders',
    },
    {
      dimension: 'Classification',
      dispatch01: 'Inaugural cover story',
      dispatch17: 'Special scientific investigation',
    },
    {
      dimension: 'Focus',
      dispatch01: 'Environmental legacy',
      dispatch17: 'Atmospheric science',
    },
    {
      dimension: 'Scope',
      dispatch01: 'Environmental history and stewardship',
      dispatch17: 'Regional and international atmospheric systems',
    },
    {
      dimension: 'Scientific identity',
      dispatch01: 'Historical and institutional investigation',
      dispatch17: 'Quantitative scientific investigation',
    },
    {
      dimension: 'Permanent value',
      dispatch01: 'Environmental legacy documentation',
      dispatch17: 'Atmospheric research and monitoring foundation',
    },
  ],
  evidentiaryNotice:
    'Identified as an ongoing scientific investigation until original November 2026 atmospheric modelling, measurement validation, and source-attribution experiments are completed; proposed chapter counts and byline remain subject to verification and formal approval.',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SERIES III/IV (DISPATCHES 16 & 18–22) — CIVIL SOCIETY & ENVIRONMENTAL ACCOUNTABILITY
// Examining NGOs, environmental advocacy, legal enforcement, public participation,
// institutional consistency, and measurable conservation outcomes.
// ─────────────────────────────────────────────────────────────────────────────

export const CIVIL_SOCIETY_ACCOUNTABILITY_SERIES_SLUGS = [
  'six-years-of-warnings-and-kashmir-still-cannot-breathe',
  'when-environmental-laws-exist-but-the-environment-has-no-defence',
  'a-lake-cannot-be-rescued-by-an-annual-cleanup',
  'who-measures-the-success-of-environmental-activism',
  'the-mountains-have-heard-enough-declarations',
  'selective-environmental-consciousness',
] as const;

export const CIVIL_SOCIETY_ACCOUNTABILITY_SERIES_META: Record<
  string,
  {
    dispatchNumber: string;
    institutionalContext: string;
    proposedFramework: string;
    centralQuestion: string;
  }
> = {
  'six-years-of-warnings-and-kashmir-still-cannot-breathe': {
    dispatchNumber: '29',
    institutionalContext: "Peoples' Environmental Council Air-Quality Webinars (2020–2026)",
    proposedFramework:
      'Regional Atmospheric Source-Apportionment, Sensor-Validation and Clean-Air Accountability Framework (RASS-CAF)',
    centralQuestion:
      'Why does environmental knowledge continue to accumulate while clean air remains increasingly uncertain?',
  },
  'when-environmental-laws-exist-but-the-environment-has-no-defence': {
    dispatchNumber: '31',
    institutionalContext:
      'Special Legal & Scientific Investigation · Five-Region Statutory Architecture, CAG/NGT Audits & KCEF–JKCAG Legal Forums',
    proposedFramework:
      '15 Western Himalayan Model Legislative & Regulatory Reform Packages + 16-Registry KEW Legislation & Enforcement Observatory',
    centralQuestion:
      'What were the region’s environmental laws intended to protect, where did protection break down across enforcement versus statutory design, and what must change?',
  },
  'a-lake-cannot-be-rescued-by-an-annual-cleanup': {
    dispatchNumber: '32',
    institutionalContext:
      'Nigeen Lake Conservation Organisation (NLCO), Rotary Club & Civic Lake Initiatives',
    proposedFramework:
      'Integrated Lake and Catchment Recovery Framework Across Urban, Subalpine & Alpine Waters (ILCRF-WH)',
    centralQuestion:
      "Are we cleaning the surface of Kashmir's lakes while allowing the processes that destroy them to continue?",
  },
  'who-measures-the-success-of-environmental-activism': {
    dispatchNumber: '33',
    institutionalContext:
      'Environmental NGOs, Civil Society Forums & Self-Scrutiny Across Kashmir',
    proposedFramework:
      'Environmental Civil Society Performance and Accountability Index (ECSPAI)',
    centralQuestion:
      'Should environmental organizations themselves be evaluated using the same standards of accountability they demand from governments?',
  },
  'the-mountains-have-heard-enough-declarations': {
    dispatchNumber: '34',
    institutionalContext:
      'Climate Consultations, Civil Society Declarations & Environmental Advocacy Programmes',
    proposedFramework:
      'Public Environmental Commitments and Implementation Observatory (PECIO-WH)',
    centralQuestion:
      'When does an environmental declaration cease to be a commitment and become merely a record of good intentions?',
  },
  'when-politics-promises-green': {
    dispatchNumber: '35',
    institutionalContext:
      'Special Investigation · Five-Region Electoral Manifestos, Budgets & Ground Realities (2000–2026)',
    proposedFramework:
      'Western Himalayan Environmental Manifesto Protocol (WHEMP · 10 Components) & Manifesto Governance Observatory',
    centralQuestion:
      'If every political party can explain what it intends to build during the next five years, should it not also explain what it intends to preserve for the next hundred?',
  },
  'selective-environmental-consciousness': {
    dispatchNumber: '36',
    institutionalContext:
      'Special Flagship Investigation · Political Ecology, Environmental Ethics & Universal Accountability',
    proposedFramework:
      'Western Himalayan Environmental Accountability Observatory (WHEAO · 10 Permanent Registries) & 5-Domain Consistency Framework',
    centralQuestion:
      'The central issue is not whether environmentalism should engage with politics—it is whether environmental responsibility survives when political attention disappears.',
  },
  'who-speaks-for-the-environment-when-politics-chooses-the-landscape': {
    dispatchNumber: '36',
    institutionalContext:
      'Introductory Cover Essay within Dispatch 36 (Selective Environmental Consciousness)',
    proposedFramework:
      'Politically Neutral, Evidence-Driven Environmental Assessment Charter (PNEEAC)',
    centralQuestion:
      'Can environmental advocacy retain its moral authority if ecological standards change according to who is developing the landscape?',
  },
};

export const CIVIL_SOCIETY_DEFINING_PRINCIPLE = {
  kicker: 'DISPATCHES 29 & 31–36 · CIVIL SOCIETY, ENVIRONMENTAL LAW & UNIVERSAL ACCOUNTABILITY',
  headline: 'From Public Advocacy to Measurable Ecological Outcomes',
  standfirst:
    'While our university response editorials interrogate scientific methodologies and statutory policy gaps—and Dispatches 04, 05, 06, 10, 11, 17, 18, 19, 23, 24, 25, 26, and 30 investigate Dal Lake engineering math, Habak’s lost laboratory, encroachment, Sálim Ali National Park, Naseem Bagh’s Chinars, journalism’s political economy, twenty-five years of regional research, South Asia’s environmental vanguard, hydropower, Gilgit-Baltistan mineral extraction, Azad Jammu & Kashmir river diversion and displacement, multi-hazard disaster convergence, and the transboundary atmosphere—this series examines environmental advocacy, statutory enforcement, civic cleanups, public declarations, electoral manifestos, and selective consciousness.',
  nonExemptionClause:
    'Himalayan Dispatch recognizes genuine environmental achievements wherever they exist, but no university, government department, NGO, corporation, media house, or even Himalayan Dispatch and Kashmir EcoWatch itself is exempt from scientific and institutional scrutiny.',
  evidentiaryNotice:
    'Investigative inquiries examine each organization’s documented activities, recommendations, available resources, and measurable achievements before reaching conclusions.',
};

export const HIMALAYAN_DISPATCH_COMPLETE_EDITORIAL_ARCHITECTURE: Array<{
  series: string;
  dispatches: string;
  primaryFocus: string;
}> = [
  {
    series: 'Environmental Condition, Lake Forensics, Protected Areas & Living Heritage',
    dispatches: '01–15',
    primaryFocus:
      'Conservation martyrs (01), Dal Lake math (04), Habak lab (05), encroachment (06), avian connectivity (08), Sálim Ali Park (10), Naseem Bagh Chinars (11) & cryosphere',
  },
  {
    series: 'Editorial Philosophy & Media Political Economy',
    dispatches: '16–17',
    primaryFocus:
      'Founding manifesto on slow, fearless journalism (16) & Journalism at a Crossroads: media political economy, independence & scientific literacy (17)',
  },
  {
    series: 'Academic Accountability & South Asian Vanguard',
    dispatches: '18–19',
    primaryFocus:
      'Five-region research census (18) & 32 Indian/Pakistani pioneers across four professional mirrors (19)',
  },
  {
    series: 'Beyond the Conference, Hydropower, GB Minerals, AJ&K Rivers & Multi-Hazards',
    dispatches: '20–28',
    primaryFocus:
      'Geological & ecological limits (21–22), The Price of Power (23), GB Minerals (24), AJ&K Rivers (25 · Monograph 17), Time Bomb (26) & restoration/agroecology (27–28)',
  },
  {
    series: 'Atmosphere, Jurisprudence, Civil Society & Manifestos',
    dispatches: '29–35',
    primaryFocus: 'Transboundary atmosphere (30), environmental law (31), NGOs & electoral manifestos (35)',
  },
  {
    series: 'Universal Ethical Accountability',
    dispatches: '36',
    primaryFocus: 'Selective Environmental Consciousness & universal responsibility',
  },
];

export const HIMALAYAN_DISPATCH_FOUR_RESPONSIBILITY_LEVELS: Array<{
  number: string;
  actor: string;
  question: string;
}> = [
  {
    number: '01',
    actor: 'Scientific institutions',
    question: 'Is their understanding sufficiently comprehensive?',
  },
  {
    number: '02',
    actor: 'Government institutions',
    question: 'Are scientific findings translated into enforceable decisions?',
  },
  {
    number: '03',
    actor: 'Civil society and NGOs',
    question: 'Is environmental advocacy producing measurable outcomes?',
  },
  {
    number: '04',
    actor: 'Citizens and communities',
    question: 'Are environmental responsibilities translated into collective behaviour?',
  },
];

export const HIMALAYAN_DISPATCH_ULTIMATE_ECOLOGICAL_MEASURE =
  'Cleaner air, healthier rivers, functioning wetlands, resilient forests, protected biodiversity and sustainable livelihoods.';

export const HIMALAYAN_DISPATCH_NGO_OUTCOME_MATRIX: Array<{
  conventionalActivity: string;
  proposedOutcomeIndicator: string;
}> = [
  {
    conventionalActivity: 'Webinars conducted',
    proposedOutcomeIndicator: 'Recommendations implemented',
  },
  {
    conventionalActivity: 'Awareness campaigns',
    proposedOutcomeIndicator: 'Measurable behavioural change',
  },
  {
    conventionalActivity: 'Trees planted',
    proposedOutcomeIndicator: 'Long-term tree survival',
  },
  {
    conventionalActivity: 'Cleanup campaigns',
    proposedOutcomeIndicator: 'Sustained pollution reduction',
  },
  {
    conventionalActivity: 'Press releases',
    proposedOutcomeIndicator: 'Documented policy intervention',
  },
  {
    conventionalActivity: 'Funds raised',
    proposedOutcomeIndicator: 'Verified ecological outcomes',
  },
  {
    conventionalActivity: 'Volunteers enrolled',
    proposedOutcomeIndicator: 'Sustained community participation',
  },
  {
    conventionalActivity: 'Litigation initiated',
    proposedOutcomeIndicator: 'Environmental protection achieved',
  },
  {
    conventionalActivity: 'Conferences organized',
    proposedOutcomeIndicator: 'Research translated into action',
  },
];
