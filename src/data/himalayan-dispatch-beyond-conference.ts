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
    dispatchNumber: '11',
    conferenceReference: 'Independent Response · ECSSPP 2026, University of Kashmir',
    proposedFramework: 'Scientific Evidence-to-Governance Protocol for the Western Himalayas',
  },
  'when-the-mountain-rejects-the-engineer': {
    dispatchNumber: '12',
    conferenceReference: 'Independent Response · RECLAIM 2026, NIT Srinagar',
    proposedFramework: 'Western Himalayan Environmental Engineering Standard',
  },
  'who-gave-development-the-right-to-exceed-the-mountain': {
    dispatchNumber: '13',
    conferenceReference: 'Independent Response · 13th Sustainable Mountain Development Summit (SMDS-XIII)',
    proposedFramework: 'Western Himalayan Ecological Limits and Development Authorization Framework',
  },
  'nature-is-not-a-contractor': {
    dispatchNumber: '14',
    conferenceReference: 'Independent Response · International Conference on Nature-Based Solutions, IUST',
    proposedFramework: 'Long-Term Ecosystem Recovery and Restoration Accountability Framework',
  },
  'the-climate-has-changed-has-agricultural-science': {
    dispatchNumber: '15',
    conferenceReference: "Independent Response · Indian Ecological Society's 2026 Conference (IESCCC 2026)",
    proposedFramework: 'Western Himalayan Adaptive Agroecological Zoning Framework',
  },
};

export const BEYOND_THE_CONFERENCE_DEFINING_PRINCIPLE = {
  kicker: 'BEYOND THE CONFERENCE · SERIES II (DISPATCHES 11–15) · SCIENTIFIC & INSTITUTIONAL RESPONSE',
  headline: 'Our Editorials Begin Where Academic Conferences End',
  standfirst:
    'Himalayan Dispatch does not reproduce conference themes, summarize presentations, or amplify institutional publicity. Where conferences diagnose isolated components or issue non-binding declarations, this five-part response series interrogates systemic blind spots, legal enforceability, and engineering reality—advancing five original governance frameworks for the Western Himalayas.',
  epigraph:
    'Himalayan Dispatch should not merely ask what scientists said about Kashmir. It should ask whether what they said is sufficient to protect Kashmir.',
};

// ─────────────────────────────────────────────────────────────────────────────
// SERIES III (DISPATCHES 16–21) — CIVIL SOCIETY & ENVIRONMENTAL ACCOUNTABILITY
// Examining NGOs, environmental advocacy, legal enforcement, public participation,
// institutional consistency, and measurable conservation outcomes.
// ─────────────────────────────────────────────────────────────────────────────

export const CIVIL_SOCIETY_ACCOUNTABILITY_SERIES_SLUGS = [
  'six-years-of-warnings-and-kashmir-still-cannot-breathe',
  'when-environmental-laws-exist-but-the-environment-has-no-defence',
  'a-lake-cannot-be-rescued-by-an-annual-cleanup',
  'who-measures-the-success-of-environmental-activism',
  'the-mountains-have-heard-enough-declarations',
  'who-speaks-for-the-environment-when-politics-chooses-the-landscape',
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
    dispatchNumber: '16',
    institutionalContext: "Peoples' Environmental Council Air-Quality Webinars (2020–2026)",
    proposedFramework:
      'Regional Atmospheric Source-Apportionment, Sensor-Validation and Clean-Air Accountability Framework (RASS-CAF)',
    centralQuestion:
      'Why does environmental knowledge continue to accumulate while clean air remains increasingly uncertain?',
  },
  'when-environmental-laws-exist-but-the-environment-has-no-defence': {
    dispatchNumber: '17',
    institutionalContext:
      'Environmental Legal Forums · J&K Climate Action Group & KCEF Law College',
    proposedFramework:
      'Western Himalayan Environmental Compliance and Legal Accountability Framework (WHEC-LAF)',
    centralQuestion:
      'What is the value of environmental legislation when ecological damage can advance faster than legal intervention?',
  },
  'a-lake-cannot-be-rescued-by-an-annual-cleanup': {
    dispatchNumber: '18',
    institutionalContext:
      'Nigeen Lake Conservation Organisation (NLCO), Rotary Club & Civic Lake Initiatives',
    proposedFramework:
      'Integrated Lake and Catchment Recovery Framework Across Urban, Subalpine & Alpine Waters (ILCRF-WH)',
    centralQuestion:
      "Are we cleaning the surface of Kashmir's lakes while allowing the processes that destroy them to continue?",
  },
  'who-measures-the-success-of-environmental-activism': {
    dispatchNumber: '19',
    institutionalContext:
      'Environmental NGOs, Civil Society Forums & Self-Scrutiny Across Kashmir',
    proposedFramework:
      'Environmental Civil Society Performance and Accountability Index (ECSPAI)',
    centralQuestion:
      'Should environmental organizations themselves be evaluated using the same standards of accountability they demand from governments?',
  },
  'the-mountains-have-heard-enough-declarations': {
    dispatchNumber: '20',
    institutionalContext:
      'Climate Consultations, Civil Society Declarations & Environmental Advocacy Programmes',
    proposedFramework:
      'Public Environmental Commitments and Implementation Observatory (PECIO-WH)',
    centralQuestion:
      'When does an environmental declaration cease to be a commitment and become merely a record of good intentions?',
  },
  'who-speaks-for-the-environment-when-politics-chooses-the-landscape': {
    dispatchNumber: '21',
    institutionalContext:
      'Broader Environmental Advocacy & Landscape Governance Across Kashmir',
    proposedFramework:
      'Politically Neutral, Evidence-Driven Environmental Assessment Charter (PNEEAC)',
    centralQuestion:
      'Can environmental advocacy retain its moral authority if ecological standards change according to who is developing the landscape?',
  },
};

export const CIVIL_SOCIETY_DEFINING_PRINCIPLE = {
  kicker: 'SERIES III · DISPATCHES 16–21 · CIVIL SOCIETY & ENVIRONMENTAL ACCOUNTABILITY',
  headline: 'From Public Advocacy to Measurable Ecological Outcomes',
  standfirst:
    'While our university response editorials interrogate scientific methodologies and statutory policy gaps, this six-part series examines environmental advocacy, civic cleanups, legal literacy, public declarations, and selective consciousness—evaluating documented achievements fairly while asking whether civil society, regulators, and citizens are achieving measurable recovery.',
  nonExemptionClause:
    'Himalayan Dispatch recognizes genuine environmental achievements wherever they exist, but no university, government department, NGO, corporation, or even Kashmir EcoWatch itself is exempt from scientific and institutional scrutiny.',
  evidentiaryNotice:
    'Investigative inquiries examine each organization’s documented activities, recommendations, available resources, and measurable achievements before reaching conclusions.',
};

export const HIMALAYAN_DISPATCH_COMPLETE_EDITORIAL_ARCHITECTURE: Array<{
  series: string;
  dispatches: string;
  primaryFocus: string;
}> = [
  {
    series: 'Founding Edition',
    dispatches: '01–10',
    primaryFocus: 'Environmental legacy, science and journalism',
  },
  {
    series: 'Scientific and Institutional Response',
    dispatches: '11–15',
    primaryFocus: 'Universities, research and policy',
  },
  {
    series: 'Civil Society and Environmental Accountability',
    dispatches: '16–21',
    primaryFocus: 'NGOs, advocacy and conservation outcomes',
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
