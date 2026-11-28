// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — DISPATCH 14 & MONOGRAPH 08 MASTER ARCHITECTURE
// "SOUTH ASIA'S ENVIRONMENTAL VANGUARD"
// Subtitle: "India and Pakistan's Environmental Giants: Extraordinary Minds
//            and the Lessons They Hold for Kashmir"
//
// Special International Feature · 32 Personalities · 4 Professional Mirrors ·
// 2 Countries (India & Pakistan — 4 + 4 per Mirror) · 7 Thematic Volumes ·
// 60 Proposed Monograph Chapters · 20-Section Biographical Research Standard ·
// Western Himalayan Environmental Leadership Agenda 2027–2035 ·
// Permanent Educational Collection in KEW Green Heroes & Student Action Hub
//
// Evidentiary & Biographical Provenance Safeguards:
// 1. Representative milestones (M. C. Mehta, Parvez Hassan, Sunita Narain,
//    Shafqat Hussain, Rina Saeed Khan, Madhav Gadgil, Maharaj K. Pandit, etc.)
//    reflect publicly documented institutional, judicial, journalistic, and
//    international award records.
// 2. Complete 20-section personal biographies, documented setbacks, and
//    long-term ecological impact audits for all 32 nominees remain under
//    independent primary-source research; dramatic adversity is NEVER fabricated.
// 3. This is a non-ranking educational and professional-introspection resource,
//    never a leaderboard or an instrument to humiliate regional practitioners.
// 4. All 2027–2035 Leadership Agenda programmes are explicitly identified as
//    proposed development pathways, not currently funded or active programmes.
// ─────────────────────────────────────────────────────────────────────────────

export type VanguardMirrorId =
  | 'jurisprudence'
  | 'civil_society'
  | 'journalism'
  | 'science';

export type VanguardCountry = 'India' | 'Pakistan';

export interface VanguardPersonalityDossier {
  id: string;
  chapterNumber: string; // '07'..'14', '16'..'23', '25'..'32', '34'..'41'
  chapterSlug: string;
  volumeRoman: 'II' | 'III' | 'IV' | 'V';
  name: string;
  country: VanguardCountry;
  mirrorId: VanguardMirrorId;
  mirrorLabel: string;
  primaryAffiliationOrContext: string;
  westernHimalayanConnection?: string;
  verifiedMilestoneSummary: string;
  proposedLearningPathwayForKashmir: string;
  kashmirCounterpartQuestion: string;
  biographicalResearchStatus: string;
}

export interface MirrorFrameworkSpec {
  id: VanguardMirrorId;
  mirrorNumberRoman: 'I' | 'II' | 'III' | 'IV';
  mirrorTitle: string;
  subtitle: string;
  volumeRoman: 'II' | 'III' | 'IV' | 'V';
  lessonsChapterNumber: string;
  coreChallengeNarrative: string;
  respectfulQuestionForKashmir: string;
  specializationTableHeaders: [string, string];
  specializationRows: Array<[string, string]>;
}

export interface AdversityComparisonRow {
  no: string;
  professionalChallenge: string;
  whatRegionalCommunityCanExamine: string;
}

export interface LeadershipDimensionSpec {
  number: string;
  title: string;
  coreInsight: string;
  westernHimalayanApplication: string;
}

export interface CollectiveIntrospectionLetter {
  id: string;
  audienceTitle: string;
  recognitionOfDifficulty: string;
  constructiveQuestion: string;
  actionableFirstStep: string;
}

export interface FourProfessionSynergyScenario {
  id: string;
  ecologicalChallenge: string;
  regionalExample: string;
  scientistRole: string;
  journalistRole: string;
  advocateRole: string;
  ngoRole: string;
}

export interface LeadershipAgendaProgramme {
  no: string;
  programme: string;
  intendedOutcome: string;
  targetCohort: string;
}

export interface BiographicalSectionSpec {
  sectionNumber: string;
  requiredContent: string;
  evidentiaryRule: string;
}

export interface VanguardMonographVolumeSpec {
  volumeRoman: string;
  volumeNumber: number;
  title: string;
  chapterRange: string;
  thematicFocus: string;
}

export interface VanguardMonographChapter {
  number: string; // '01' .. '60'
  slug: string;
  volumeRoman: string;
  volumeTitle: string;
  title: string;
  chapterType: 'THEMATIC_ESSAY' | 'BIOGRAPHICAL_DOSSIER' | 'REGIONAL_LESSONS_SYNTHESIS';
  linkedPersonalityId?: string;
  analyticalFocus: string;
  researchMethodologyAndSources: string;
  researchStatus: string;
}

export const SOUTH_ASIAN_VANGUARD_MONOGRAPH_SPEC = {
  monographCode: 'MONOGRAPH 08 · ENVIRONMENTAL LEADERSHIP & INTELLECTUAL LEGACY',
  monographSlug: 'monograph-08-south-asias-environmental-vanguard',
  dispatchNumber: '14',
  dispatchSlug: 'south-asias-environmental-vanguard',
  kicker:
    'SPECIAL INTERNATIONAL FEATURE · ENVIRONMENTAL LEADERSHIP · PROFESSIONAL INTROSPECTION · SCIENTIFIC INTEGRITY · INTELLECTUAL LEGACY',
  editionKicker:
    'SPECIAL INTERNATIONAL FEATURE · ENVIRONMENTAL LEADERSHIP · PROFESSIONAL INTROSPECTION · INTELLECTUAL LEGACY',
  title: 'South Asia’s Environmental Vanguard',
  subtitle:
    'India and Pakistan’s Environmental Giants: Extraordinary Minds and the Lessons They Hold for Kashmir',
  italicDeck:
    'Their journeys were not easy. Neither will ours be. Their achievements were not inevitable, their professional paths were not always comfortable, and their contributions did not emerge without persistence. What their experiences offer Kashmir is not simply inspiration, but an opportunity for collective professional introspection.',
  editionDeck:
    'It was not easy for them. It is not easy for us. What their journeys reveal about professional perseverance, environmental responsibility and the possibilities that still lie within the Western Himalayas.',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Environmental Leadership and Intellectual Legacy Desk',
  geographicScope:
    'India · Pakistan · Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan · Western Himalayas',
  heroStats: [
    { value: '32', label: 'Distinguished personalities' },
    { value: '4 × 2', label: 'Professions × Countries' },
    { value: '7 / 60', label: 'Volumes / Proposed chapters' },
  ],
  greenHeroesCollectionStats: [
    { value: '32', label: 'Personalities' },
    { value: '4', label: 'Professions (8 each)' },
    { value: '2', label: 'Countries (India & Pakistan)' },
  ],
  centralThesis:
    'The central question is not whether Kashmir’s environmental professionals possess sufficient intelligence or commitment. It is whether the region has developed the professional culture, institutional support and long-term ambition necessary to enable that intelligence and commitment to flourish.',
  closingPhilosophicalQuestion:
    'Perhaps the most meaningful question is not what made these extraordinary individuals different from us, but what we might become if we pursued our environmental responsibilities with comparable knowledge, perseverance and ambition.',
  researchVerificationNote:
    'Expanded Editorial Architecture & Provenance Disclosure: Representative milestones cited in this feature—including M. C. Mehta (Goldman Environmental Prize; Rajouri birth; ~40 Supreme Court environmental rulings), Parvez Hassan (Shehla Zia v. WAPDA; PEPA 1997 drafting; Elizabeth Haub Prize; IUCN), Sunita Narain (CSE since 1982; 2005 Stockholm Water Prize to CSE; pesticide investigations), Shafqat Hussain (Project Snow Leopard livestock insurance in Baltistan; Rolex & Whitley recognition), Rina Saeed Khan (2017 Dawn reporting on Baltistan snow-leopard insurance), and Madhav Gadgil (Western Ghats Ecology Expert Panel)—are anchored in institutional and award records. Complete 20-section personal biographies, documented setbacks, and impact evaluations across all 32 nominees remain subject to individual primary-source verification without manufacturing stories of adversity. All 2027–2035 Leadership Agenda items represent proposed development pathways, not established or funded programmes.',
  beyondBiographyPillars: [
    'Professional Journeys',
    'Documented Challenges',
    'Landmark Contributions',
    'Environmental Impact',
    'International Recognition',
    'Lessons for Kashmir',
    'Recommended Readings',
    'Student Learning Resources',
  ],
  publicationHierarchy: [
    {
      level: '01 · Inaugural Edition (Dispatch 14 of 27)',
      title: 'Dispatch 14 — South Asia’s Environmental Vanguard',
      detail:
        'Positioned immediately after Dispatch 13 ("Who Are We Researching For?") and immediately before Dispatch 15 ("Beyond the Conference · I"): holds up four professional mirrors across 32 Indian and Pakistani pioneers.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/south-asias-environmental-vanguard',
      ctaLabel: 'Read Dispatch 14',
    },
    {
      level: '02 · Complete 7-Volume, 60-Chapter Monograph',
      title: 'Monograph 08 — 7 Thematic Volumes & 60 Chapters',
      detail:
        'Houses all 32 structured 20-section biographical chapter protocols (Chapters 07–14, 16–23, 25–32, 34–41), adversity comparisons, and the 2027–2035 Leadership Agenda.',
      href: '/himalayan-dispatch/issues/monograph-08-south-asias-environmental-vanguard',
      ctaLabel: 'Open Monograph 08',
    },
    {
      level: '03 · Permanent KEW Educational Legacy',
      title: 'KEW Green Heroes & Student Action Hub Collection',
      detail:
        'Permanent, non-ranking educational study collection connecting all 32 pioneers to student fieldwork, fellowships, and professional mentorship across the Western Himalayas.',
      href: '/resources/kew-green-heroes/south-asian-vanguard',
      ctaLabel: 'Open Educational Collection',
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// SECTION III — THE FOUR PROFESSIONAL MIRRORS (FRAMEWORKS & SPECIALIZATION TABLES)
// ─────────────────────────────────────────────────────────────────────────────

export const FOUR_PROFESSIONAL_MIRRORS: MirrorFrameworkSpec[] = [
  {
    id: 'jurisprudence',
    mirrorNumberRoman: 'I',
    mirrorTitle: 'The First Mirror: Environmental Jurisprudence',
    subtitle: 'The advocates who carried the environment into the courtroom—and into statute books',
    volumeRoman: 'II',
    lessonsChapterNumber: '15',
    coreChallengeNarrative:
      'Environmental litigation demands dual mastery: the advocate must command constitutional and statutory procedure while translating limnology, sewage chemistry, slope geology, environmental flows, and cumulative impact science into enforceable judicial remedies.',
    respectfulQuestionForKashmir:
      'Could our legal fraternity progressively develop specialized environmental practices, establish shared scientific evidence repositories, and pursue cases across Srinagar, Jammu, Leh, Muzaffarabad, and Gilgit whose jurisprudential significance becomes a global reference for mountain conservation?',
    specializationTableHeaders: [
      'Regional Environmental Challenge',
      'Potential Legal Specialization',
    ],
    specializationRows: [
      ['Deteriorating urban lakes', 'Enforceable lake restoration & nutrient-load obligations'],
      ['Karewa destruction', 'Geological heritage & palaeoclimate stratigraphy protection'],
      ['Atmospheric pollution', 'Airshed compliance, sensor standards & public health'],
      ['Riverbed mining', 'Replenishment-based extraction limits & channel restoration'],
      ['High-altitude infrastructure', 'Basin-scale cumulative environmental impact assessment'],
      ['Wetland encroachment', 'Cadastral land-use protection & hydrological rights'],
      ['Glacier-related hazards', 'Climate accountability & preventive GLOF obligations'],
      ['Forest fragmentation', 'Ecological connectivity & multiyear restoration liability'],
      ['Hydropower development', 'Seasonal environmental flows & downstream community rights'],
      ['Environmental research', 'Proactive public access to scientific & compliance information'],
    ],
  },
  {
    id: 'civil_society',
    mirrorNumberRoman: 'II',
    mirrorTitle: 'The Second Mirror: Environmental Civil Society',
    subtitle: 'The individuals who transformed personal convictions into lasting institutions',
    volumeRoman: 'III',
    lessonsChapterNumber: '24',
    coreChallengeNarrative:
      'Founding an initiative is one step; building a transparent, technically rigorous institution that survives funding cycles, commercial pushback, and leadership transitions—while respecting vulnerable mountain livelihoods—is the true test of civil society.',
    respectfulQuestionForKashmir:
      'Could our environmental organizations gradually develop permanent scientific capabilities, trained professional cadres, measurable conservation programmes, and institutional governance that endures well beyond individual founders?',
    specializationTableHeaders: [
      'Conventional NGO Activity',
      'Potential Institutional Evolution',
    ],
    specializationRows: [
      ['Environmental awareness campaigns', 'Permanent public environmental education programmes'],
      ['Plantation drives', 'Long-term native vegetation survival & succession monitoring'],
      ['Lake cleanup campaigns', 'Scientific pollution-source & catchment load investigation'],
      ['Wildlife awareness programmes', 'Community-based habitat & livestock-coexistence incentives'],
      ['Environmental seminars', 'Sustained research and field-implementation partnerships'],
      ['Public complaints', 'Documented regulatory compliance & lab-backed investigations'],
      ['Social media advocacy', 'Accessible open-access scientific knowledge repositories'],
      ['Ad-hoc fundraising campaigns', 'Transparent, audited multiyear conservation financing'],
      ['Individual charismatic leadership', 'Institutionally sustainable board & team governance'],
      ['Conservation recommendations', 'Independently evaluated field restoration interventions'],
    ],
  },
  {
    id: 'journalism',
    mirrorNumberRoman: 'III',
    mirrorTitle: 'The Third Mirror: Environmental Journalism',
    subtitle: 'The journalists who carried environmental science beyond laboratories',
    volumeRoman: 'IV',
    lessonsChapterNumber: '33',
    coreChallengeNarrative:
      'While politics and conflict dominate daily headlines, ecological deterioration unfolds across decades. The environmental journalist must read satellite time series, revenue records, public budgets, and peer-reviewed papers—separating correlation from causation without simplifying away scientific truth.',
    respectfulQuestionForKashmir:
      'Could more journalists across the Western Himalayas build specialized beats in atmospheric physics, water governance, environmental law, cryosphere change, and biodiversity—collaborating with scientists and jurists on investigations recognized internationally as original journalism?',
    specializationTableHeaders: [
      'Conventional Environmental Reporting',
      'Investigative Environmental Journalism',
    ],
    specializationRows: [
      ['A lake is polluted', 'Identify pollution sources, nutrient loads & responsible institutions'],
      ['Trees have been cut', 'Examine legal authorization, ecological loss & restoration duties'],
      ['A flood has occurred', 'Investigate floodplain occupation, drainage loss & preparedness'],
      ['AQI is high', 'Examine sensor calibration, boundary-layer transport & emission sources'],
      ['A glacier is retreating', 'Investigate mass balance, black carbon & downstream water security'],
      ['A road has been constructed', 'Examine slope lithology, muck disposal & cumulative basin impacts'],
      ['An environmental conference concluded', 'Trace recommendations, funded outputs & subsequent implementation'],
      ['Crores were spent on conservation', 'Audit public expenditure against measurable biophysical recovery'],
      ['Migratory birds have arrived', 'Investigate wetland hydroperiod, flyway threats & long-term trends'],
      ['Environmental laws were introduced', 'Test whether statutory enforcement produced ecological recovery'],
    ],
  },
  {
    id: 'science',
    mirrorNumberRoman: 'IV',
    mirrorTitle: 'The Fourth Mirror: Environmental Science',
    subtitle: 'The scientists who extended the boundaries of existing knowledge',
    volumeRoman: 'V',
    lessonsChapterNumber: '42',
    coreChallengeNarrative:
      'Enduring science emerges from multi-decade field series, failed hypotheses, methodological rigour, and intellectual independence when empirical findings collide with short-term development preferences.',
    respectfulQuestionForKashmir:
      'Could our universities progress from cataloguing local symptoms toward inventing mountain-specific methodologies studied worldwide—while simultaneously returning accessible knowledge to the farmers, communities, and regulators living inside these watersheds?',
    specializationTableHeaders: [
      'Western Himalayan Scientific Discipline',
      'Opportunity for Original Scientific Contribution',
    ],
    specializationRows: [
      ['Atmospheric science', 'Enclosed-valley pollution transport & mountain boundary-layer modelling'],
      ['Cryospheric science', 'Glacier energy/mass evolution & downstream seasonal water availability'],
      ['Limnology', 'Integrated nutrient mass balances & internal sediment recovery'],
      ['Hydrology', 'Real-time flood forecasting & coupled karst-snowmelt watershed twins'],
      ['Geology', 'Karewa palaeoclimate archives & compound seismic-landslide hazards'],
      ['Biodiversity', 'Transboundary corridor connectivity & cold-water environmental DNA'],
      ['Forestry', 'Climate-resilient native restoration & treeline succession dynamics'],
      ['Agricultural science', 'Future agro-climatic suitability of saffron, temperate fruit & landraces'],
      ['Remote sensing', 'Topographically corrected high-relief Earth observation algorithms'],
      ['Environmental engineering', 'Sub-zero wastewater & bio-engineering validated for mountain terrain'],
      ['Environmental economics', 'Himalayan natural-capital accounting & restoration cost-effectiveness'],
      ['Environmental governance', 'Empirical performance auditing of conservation laws & budgets'],
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION III, VIII & X — THE 32 DISTINGUISHED PERSONALITIES (4 MIRRORS × 8)
// Chapters 07–14 (Advocates), 16–23 (NGOs), 25–32 (Journalists), 34–41 (Scientists)
// ─────────────────────────────────────────────────────────────────────────────

function makeChapterSlug(num: string, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `chapter-${num}-${clean}`;
}

const RAW_32_PERSONALITIES: Array<
  Omit<VanguardPersonalityDossier, 'chapterSlug' | 'biographicalResearchStatus'>
> = [
  // ── MIRROR I: ENVIRONMENTAL ADVOCATES (VOLUME II · CHAPTERS 07–14) ─────────
  {
    id: 'ahmad-rafay-alam',
    chapterNumber: '07',
    volumeRoman: 'II',
    name: 'Ahmad Rafay Alam',
    country: 'Pakistan',
    mirrorId: 'jurisprudence',
    mirrorLabel: 'Environmental Advocates',
    primaryAffiliationOrContext:
      'Environmental Lawyer, Urban Water/Air Policy Specialist & Public Educator (Lahore / Pakistan)',
    verifiedMilestoneSummary:
      'Public-interest litigation, judicial commission service, and sustained public commentary on urban air quality (smog governance), river conservation, groundwater depletion, and climate-resilient municipal planning.',
    proposedLearningPathwayForKashmir:
      'Urban environmental law, water governance and accessible environmental communication',
    kashmirCounterpartQuestion:
      'How can Srinagar, Jammu, Leh, and Muzaffarabad lawyers translate winter airshed smog and urban aquifer stress into actionable municipal governance reforms?',
  },
  {
    id: 'm-c-mehta',
    chapterNumber: '08',
    volumeRoman: 'II',
    name: 'M. C. Mehta',
    country: 'India',
    mirrorId: 'jurisprudence',
    mirrorLabel: 'Environmental Advocates',
    primaryAffiliationOrContext:
      'Public-Interest Environmental Advocate, Supreme Court of India · 1996 Goldman Environmental Prize · Magsaysay Award',
    westernHimalayanConnection:
      'Born in Rajouri district (Jammu & Kashmir) and educated at the University of Jammu before building a multi-decade Supreme Court practice.',
    verifiedMilestoneSummary:
      'Credited by the Goldman Environmental Prize Foundation with ~40 landmark Supreme Court judgments—including Ganga industrial pollution, Taj Mahal atmospheric protection, phase-out of leaded petrol, Delhi CNG transition, and Absolute Liability doctrine (Oleum Gas Leak).',
    proposedLearningPathwayForKashmir:
      'Sustained environmental PILs and landmark legal precedents',
    kashmirCounterpartQuestion:
      'Could an advocate emerging from Rajouri, Pulwama, Srinagar, Leh, Muzaffarabad, or Gilgit build a comparably sustained multi-decade body of mountain ecosystem jurisprudence?',
  },
  {
    id: 'parvez-hassan',
    chapterNumber: '09',
    volumeRoman: 'II',
    name: 'Parvez Hassan',
    country: 'Pakistan',
    mirrorId: 'jurisprudence',
    mirrorLabel: 'Environmental Advocates',
    primaryAffiliationOrContext:
      'Senior Advocate Supreme Court of Pakistan · Chair Emeritus, IUCN WCEL · Elizabeth Haub Prize Laureate',
    verifiedMilestoneSummary:
      'Counsel in the foundational Shehla Zia v. WAPDA (1994) constitutional right-to-life environmental ruling, key contributor to drafting the Pakistan Environmental Protection Act, 1997, and chair of court-appointed environmental commissions.',
    proposedLearningPathwayForKashmir:
      'Constitutional environmental rights and legislative development',
    kashmirCounterpartQuestion:
      'How can Himalayan legal scholars move beyond reactive writ petitions to co-authoring modern lake, glacier, karewa, and e-flow statutes?',
  },
  {
    id: 'rahul-choudhary',
    chapterNumber: '10',
    volumeRoman: 'II',
    name: 'Rahul Choudhary',
    country: 'India',
    mirrorId: 'jurisprudence',
    mirrorLabel: 'Environmental Advocates',
    primaryAffiliationOrContext:
      'Co-Founder, Legal Initiative for Forest and Environment (LIFE) · National Green Tribunal Practitioner',
    verifiedMilestoneSummary:
      'Institutionalized appellate and original litigation before the National Green Tribunal scrutinizing defective EIAs, linear infrastructure clearances, wetland encroachments, and pollution-consent violations across India.',
    proposedLearningPathwayForKashmir:
      'Environmental clearances and institutional legal advocacy',
    kashmirCounterpartQuestion:
      'What would it take to build a permanent, collaborative public-interest environmental law clinic serving rural panchayats across the Western Himalayas?',
  },
  {
    id: 'ritwick-dutta',
    chapterNumber: '11',
    volumeRoman: 'II',
    name: 'Ritwick Dutta',
    country: 'India',
    mirrorId: 'jurisprudence',
    mirrorLabel: 'Environmental Advocates',
    primaryAffiliationOrContext:
      'Co-Founder, Legal Initiative for Forest and Environment (LIFE) · 2021 Right Livelihood Laureate',
    verifiedMilestoneSummary:
      'Pioneered forensic legal-scientific examination of Environmental Impact Assessments, hydropower and mining clearances, forest-diversion filings, and community access to environmental justice—while navigating intense regulatory and institutional pressures.',
    proposedLearningPathwayForKashmir:
      'Technical examination of infrastructure approvals and forest diversion',
    kashmirCounterpartQuestion:
      'How can Himalayan advocates systematically audit District Survey Reports, tunnel muck plans, and sub-basin hydropower EIAs before irreversible excavation begins?',
  },
  {
    id: 'saima-amin-khawaja',
    chapterNumber: '12',
    volumeRoman: 'II',
    name: 'Saima Amin Khawaja',
    country: 'Pakistan',
    mirrorId: 'jurisprudence',
    mirrorLabel: 'Environmental Advocates',
    primaryAffiliationOrContext:
      'Environmental & Constitutional Litigation Specialist · Progressive Advocates / High Court Practice',
    verifiedMilestoneSummary:
      'Sustained courtroom advocacy and legal scholarship across wildlife protection, urban tree and parkland preservation, wetland conservation, and climate-governance obligations in Pakistan.',
    proposedLearningPathwayForKashmir:
      'Environmental litigation and climate-related legal research',
    kashmirCounterpartQuestion:
      'How can clinical legal research pair statutory wildlife and wetland rules with contemporary climate-adaptation duties?',
  },
  {
    id: 'shyam-divan',
    chapterNumber: '13',
    volumeRoman: 'II',
    name: 'Shyam Divan',
    country: 'India',
    mirrorId: 'jurisprudence',
    mirrorLabel: 'Environmental Advocates',
    primaryAffiliationOrContext:
      'Senior Advocate, Supreme Court of India · Co-Author, Environmental Law and Policy in India',
    verifiedMilestoneSummary:
      'Combined Supreme Court environmental and amicus curiae advocacy with co-authoring India’s foundational environmental-law casebook alongside Armin Rosencranz—training generations of students and judges.',
    proposedLearningPathwayForKashmir:
      'Integration of environmental jurisprudence and legal scholarship',
    kashmirCounterpartQuestion:
      'Who will author the definitive comparative casebook and practitioner manual on Western Himalayan environmental law across all four regional frameworks?',
  },
  {
    id: 'umair-saleem',
    chapterNumber: '14',
    volumeRoman: 'II',
    name: 'Umair Saleem',
    country: 'Pakistan',
    mirrorId: 'jurisprudence',
    mirrorLabel: 'Environmental Advocates',
    primaryAffiliationOrContext:
      'Environmental & Climate Litigation Advocate (Lahore High Court / Climate Justice Practice)',
    verifiedMilestoneSummary:
      'Associated with next-generation Pakistani climate-adaptation and public-interest environmental litigation, bridging constitutional rights with implementation monitoring.',
    proposedLearningPathwayForKashmir:
      'Development of contemporary climate litigation expertise',
    kashmirCounterpartQuestion:
      'How can early-career law graduates in Pulwama, Srinagar, Jammu, Leh, Muzaffarabad, and Gilgit build rigorous specialization in climate-risk and cryosphere law?',
  },

  // ── MIRROR II: ENVIRONMENTAL NGO LEADERS (VOLUME III · CHAPTERS 16–23) ─────
  {
    id: 'aisha-khan',
    chapterNumber: '16',
    volumeRoman: 'III',
    name: 'Aisha Khan',
    country: 'Pakistan',
    mirrorId: 'civil_society',
    mirrorLabel: 'Environmental NGO Leaders',
    primaryAffiliationOrContext:
      'Chief Executive, Civil Society Coalition for Climate Change (CSCCC) & Mountain and Glacier Protection Organization (MGPO)',
    westernHimalayanConnection:
      'Extensive community resilience, climate adaptation, and glacier-watershed initiatives across Gilgit-Baltistan and northern mountain valleys.',
    verifiedMilestoneSummary:
      'Built durable bridges between high-mountain community development, cryosphere hazard awareness, national climate policy forums, and coordinated civil-society coalitions.',
    proposedLearningPathwayForKashmir:
      'Mountain conservation and coordinated civil society action',
    kashmirCounterpartQuestion:
      'How can fragmented Himalayan NGOs coordinate shared scientific evidence and policy engagement without losing local community roots?',
  },
  {
    id: 'bittu-sahgal',
    chapterNumber: '17',
    volumeRoman: 'III',
    name: 'Bittu Sahgal',
    country: 'India',
    mirrorId: 'civil_society',
    mirrorLabel: 'Environmental NGO Leaders',
    primaryAffiliationOrContext:
      'Founder, Sanctuary Nature Foundation · Founding Editor, Sanctuary Asia (1981) & Kids for Tigers',
    verifiedMilestoneSummary:
      'Sustained over four decades of wildlife conservation publishing, natural-history documentation, school ecological literacy reaching millions of students, and frontline defender recognition.',
    proposedLearningPathwayForKashmir:
      'Environmental education and wildlife protection',
    kashmirCounterpartQuestion:
      'How can Himalayan civil society pair school-level ecological wonder with uncompromising protection of wildlife corridors and rangers?',
  },
  {
    id: 'hammad-naqi-khan',
    chapterNumber: '18',
    volumeRoman: 'III',
    name: 'Hammad Naqi Khan',
    country: 'Pakistan',
    mirrorId: 'civil_society',
    mirrorLabel: 'Environmental NGO Leaders',
    primaryAffiliationOrContext:
      'Director General, WWF-Pakistan · Environmental Scientist & Institutional Leader',
    verifiedMilestoneSummary:
      'Guided multi-region conservation, sustainable agriculture/water stewardship, Indus basin freshwater initiatives, and professionalized NGO programme evaluation.',
    proposedLearningPathwayForKashmir:
      'Institutional conservation programmes and professional environmental governance',
    kashmirCounterpartQuestion:
      'What financial transparency, scientific staffing, and monitoring standards enable a regional conservation body to operate credibly across decades?',
  },
  {
    id: 'muhammad-ali-nawaz',
    chapterNumber: '19',
    volumeRoman: 'III',
    name: 'Muhammad Ali Nawaz',
    country: 'Pakistan',
    mirrorId: 'civil_society',
    mirrorLabel: 'Environmental NGO Leaders',
    primaryAffiliationOrContext:
      'Director, Snow Leopard Foundation · Ecologist (Gilgit-Baltistan / Karakoram–Pamir–Himalaya)',
    westernHimalayanConnection:
      'Field carnivore research, camera-trap population estimation, Deosai brown bear recovery, and community conservation across Gilgit-Baltistan.',
    verifiedMilestoneSummary:
      'Translated rigorous university carnivore ecology (brown bear recovery in Deosai National Park and snow-leopard genetics/telemetry) into permanent community-partnered conservation institutions.',
    proposedLearningPathwayForKashmir:
      'Wildlife research and community-based conservation',
    kashmirCounterpartQuestion:
      'How can Hangul, Markhor, brown bear, and snow-leopard conservation across all five regions unite academic population genetics with herder partnerships?',
  },
  {
    id: 'rajendra-singh',
    chapterNumber: '20',
    volumeRoman: 'III',
    name: 'Rajendra Singh',
    country: 'India',
    mirrorId: 'civil_society',
    mirrorLabel: 'Environmental NGO Leaders',
    primaryAffiliationOrContext:
      'Founder, Tarun Bharat Sangh · 2015 Stockholm Water Prize & Ramon Magsaysay Award',
    verifiedMilestoneSummary:
      'Mobilized hundreds of rural communities in Rajasthan over decades to revive traditional earthen rainwater-harvesting structures (johads), recharging shallow aquifers and restoring seasonal rivers.',
    proposedLearningPathwayForKashmir:
      'Community-led water restoration',
    kashmirCounterpartQuestion:
      'Could Kashmiri, Dogra, Ladakhi, Pahari, and Balti village councils revive traditional springsheds (nags), kuhls, and glacial zings with comparable hydrological discipline?',
  },
  {
    id: 'shafqat-hussain',
    chapterNumber: '21',
    volumeRoman: 'III',
    name: 'Shafqat Hussain',
    country: 'Pakistan',
    mirrorId: 'civil_society',
    mirrorLabel: 'Environmental NGO Leaders',
    primaryAffiliationOrContext:
      'Founder, Project Snow Leopard (Baltistan) · Professor of Anthropology · Rolex Award & Whitley Award Laureate',
    westernHimalayanConnection:
      'Pioneered directly in Skardu / Baltistan villages within the Western Himalayan–Karakoram mountain system.',
    verifiedMilestoneSummary:
      'Recognized that economically vulnerable Baltistan agro-pastoralists could not bear predator livestock losses alone, designing a community-managed livestock insurance and ecotourism model subsequently adapted across Asian mountain ranges.',
    proposedLearningPathwayForKashmir:
      'Economic incentives for human-wildlife coexistence',
    kashmirCounterpartQuestion:
      'How can conservation programmes across Kashmir, Ladakh, AJ&K, and GB align predator, wetland, and forest protection with household economic security?',
  },
  {
    id: 'sunita-narain',
    chapterNumber: '22',
    volumeRoman: 'III',
    name: 'Sunita Narain',
    country: 'India',
    mirrorId: 'civil_society',
    mirrorLabel: 'Environmental NGO Leaders',
    primaryAffiliationOrContext:
      'Director General, Centre for Science and Environment (CSE, joined 1982) · Editor, Down To Earth · Padma Shri',
    verifiedMilestoneSummary:
      'Built CSE into a premier Southern public-interest research, pollution-testing laboratory, and policy institution—receiving the 2005 Stockholm Water Prize under her leadership and withstanding high-stakes corporate disputes over pesticide residues in soft drinks and vehicular air pollution.',
    proposedLearningPathwayForKashmir:
      'Scientific research, public communication and policy advocacy',
    kashmirCounterpartQuestion:
      'What does CSE’s forty-year trajectory teach us about building independent analytical laboratories and fearless science communication in the Himalayas?',
  },
  {
    id: 'vivek-menon',
    chapterNumber: '23',
    volumeRoman: 'III',
    name: 'Vivek Menon',
    country: 'India',
    mirrorId: 'civil_society',
    mirrorLabel: 'Environmental NGO Leaders',
    primaryAffiliationOrContext:
      'Founder & Executive Director, Wildlife Trust of India (WTI) · Whitley Continuation Award · IUCN Councillor',
    westernHimalayanConnection:
      'WTI partnerships in Jammu & Kashmir include Markhor conservation in Kazinag/Hirpora and Hangul/wildlife conflict initiatives.',
    verifiedMilestoneSummary:
      'Established Wildlife Trust of India in 1998, institutionalizing national wildlife corridor mapping (Right of Passage), anti-poaching wildlife crime control training, rapid rescue, and threatened ungulate recovery.',
    proposedLearningPathwayForKashmir:
      'Long-term wildlife conservation institutions and habitat connectivity',
    kashmirCounterpartQuestion:
      'How can Western Himalayan conservationists secure permanent legal and community protection for corridors between isolated sanctuaries?',
  },

  // ── MIRROR III: ENVIRONMENTAL JOURNALISTS (VOLUME IV · CHAPTERS 25–32) ─────
  {
    id: 'afia-salam',
    chapterNumber: '25',
    volumeRoman: 'IV',
    name: 'Afia Salam',
    country: 'Pakistan',
    mirrorId: 'journalism',
    mirrorLabel: 'Environmental Journalists',
    primaryAffiliationOrContext:
      'Veteran Broadcast & Print Journalist · Climate & Environmental Educator (Pakistan)',
    verifiedMilestoneSummary:
      'Decades of journalism mentoring, climate-literacy training for newsrooms, and reporting on extreme weather, coastal/mountain water stress, and community vulnerability.',
    proposedLearningPathwayForKashmir:
      'Public environmental education and climate communication',
    kashmirCounterpartQuestion:
      'How can senior regional editors mentor young district reporters to treat climate and water stories as front-page public-interest priorities?',
  },
  {
    id: 'ananda-banerjee',
    chapterNumber: '26',
    volumeRoman: 'IV',
    name: 'Ananda Banerjee',
    country: 'India',
    mirrorId: 'journalism',
    mirrorLabel: 'Environmental Journalists',
    primaryAffiliationOrContext:
      'Environmental & Wildlife Journalist, Author & Naturalist (Mint / National & Conservation Beats)',
    verifiedMilestoneSummary:
      'Sustained field reporting on threatened avian species, Central Asian Flyway stopovers, grassland/wetland erasure, and biodiversity policy across India.',
    proposedLearningPathwayForKashmir:
      'Biodiversity reporting and wildlife journalism',
    kashmirCounterpartQuestion:
      'How can taxonomic and field-naturalist precision transform routine seasonal bird-arrival stories in Hokersar, Wular, and Gharana into habitat accountability journalism?',
  },
  {
    id: 'bahar-dutt',
    chapterNumber: '27',
    volumeRoman: 'IV',
    name: 'Bahar Dutt',
    country: 'India',
    mirrorId: 'journalism',
    mirrorLabel: 'Environmental Journalists',
    primaryAffiliationOrContext:
      'Conservation Biologist & Environmental Broadcast/Print Journalist · Green Oscar (Wildscreen) Recognition',
    verifiedMilestoneSummary:
      'Brought formal conservation-biology training directly into investigative broadcast and longform reporting on wetlands, illegal wildlife trade, industrial pollution, and marginalized conservation communities.',
    proposedLearningPathwayForKashmir:
      'Field-based environmental investigations',
    kashmirCounterpartQuestion:
      'What becomes possible when M.Sc. and Ph.D. graduates in environmental science across Kashmir and Ladakh train in investigative field journalism?',
  },
  {
    id: 'jayashree-nandi',
    chapterNumber: '28',
    volumeRoman: 'IV',
    name: 'Jayashree Nandi',
    country: 'India',
    mirrorId: 'journalism',
    mirrorLabel: 'Environmental Journalists',
    primaryAffiliationOrContext:
      'National Environment & Climate Beat Correspondent (Hindustan Times)',
    verifiedMilestoneSummary:
      'Rigorous daily and investigative reporting translating atmospheric chemistry, PM2.5 source apportionment, heatwave attribution, forest-law amendments, and IPCC findings into clear public accountability.',
    proposedLearningPathwayForKashmir:
      'Scientific reporting on pollution, climate and environmental governance',
    kashmirCounterpartQuestion:
      'How can valley newsrooms move beyond quoting unverified AQI app screenshots toward interrogating calibration, boundary-layer physics, and emission budgets?',
  },
  {
    id: 'nidhi-jamwal',
    chapterNumber: '29',
    volumeRoman: 'IV',
    name: 'Nidhi Jamwal',
    country: 'India',
    mirrorId: 'journalism',
    mirrorLabel: 'Environmental Journalists',
    primaryAffiliationOrContext:
      'Environmental & Rural-Affairs Journalist (formerly Managing Editor, Gaon Connection)',
    westernHimalayanConnection:
      'Rooted in Jammu & Kashmir heritage with extensive reporting on Himalayan disasters, water, waste, and agrarian adaptation.',
    verifiedMilestoneSummary:
      'Championed rural-first environmental journalism—connecting climate shocks, solid waste, spring depletion, and infrastructure projects directly to farmers’ and villagers’ lived economies.',
    proposedLearningPathwayForKashmir:
      'Environmental reporting focused on rural livelihoods and water',
    kashmirCounterpartQuestion:
      'How can reporting center orchardists, pastoralists, boatmen, and mountain women rather than confining environmental coverage to urban press conferences?',
  },
  {
    id: 'rina-saeed-khan',
    chapterNumber: '30',
    volumeRoman: 'IV',
    name: 'Rina Saeed Khan',
    country: 'Pakistan',
    mirrorId: 'journalism',
    mirrorLabel: 'Environmental Journalists',
    primaryAffiliationOrContext:
      'Award-Winning Environmental Columnist & Author (Dawn / Earthly Matters)',
    westernHimalayanConnection:
      'Extensive field reporting across Gilgit-Baltistan, Chitral, and AJ&K—including her documented 2017 Dawn feature examining Baltistan’s community-based snow-leopard livestock insurance model.',
    verifiedMilestoneSummary:
      'Over twenty-five years of sustained environmental columns and field dispatches translating mountain conservation models, glacier hazards, and community forestry into national public consciousness.',
    proposedLearningPathwayForKashmir:
      'Himalayan conservation and climate journalism',
    kashmirCounterpartQuestion:
      'How can sustained decades-long beat continuity turn applied Himalayan conservation experiments into widely understood public models?',
  },
  {
    id: 'saleem-shaikh',
    chapterNumber: '31',
    volumeRoman: 'IV',
    name: 'Saleem Shaikh',
    country: 'Pakistan',
    mirrorId: 'journalism',
    mirrorLabel: 'Environmental Journalists',
    primaryAffiliationOrContext:
      'Climate Adaptation, Water & Development Correspondent (Thomson Reuters Foundation / International Climate Outlets)',
    westernHimalayanConnection:
      'Frequent field reporting on Gilgit-Baltistan GLOF early-warning systems, ice stupas/artificial glaciers, and AJ&K mountain agriculture.',
    verifiedMilestoneSummary:
      'Consistent field-based reporting documenting climate adaptation failures and community resilience innovations across flood-prone plains and glaciated northern valleys.',
    proposedLearningPathwayForKashmir:
      'Climate adaptation and development reporting',
    kashmirCounterpartQuestion:
      'How can journalists track whether donor- and state-funded climate adaptation projects still function three winters after inauguration?',
  },
  {
    id: 'zofeen-t-ebrahim',
    chapterNumber: '32',
    volumeRoman: 'IV',
    name: 'Zofeen T. Ebrahim',
    country: 'Pakistan',
    mirrorId: 'journalism',
    mirrorLabel: 'Environmental Journalists',
    primaryAffiliationOrContext:
      'Independent Investigative Environmental & Public-Health Journalist (Dawn · Formerly Pakistan Editor, The Third Pole)',
    verifiedMilestoneSummary:
      'Deep investigative reporting linking untreated industrial/municipal sewage, contaminated drinking water, air pollution, solid waste, and transboundary river governance directly to human health and social equity.',
    proposedLearningPathwayForKashmir:
      'Connecting environmental change with public health and society',
    kashmirCounterpartQuestion:
      'How can water-contamination and landfill-leachate reporting across Kashmir and Ladakh systematically integrate epidemiological and public-health evidence?',
  },

  // ── MIRROR IV: ENVIRONMENTAL SCIENTISTS & EXPERTS (VOLUME V · CHAPTERS 34–41)
  {
    id: 'asif-khan',
    chapterNumber: '34',
    volumeRoman: 'V',
    name: 'Asif Khan',
    country: 'Pakistan',
    mirrorId: 'science',
    mirrorLabel: 'Environmental Scientists & Experts',
    primaryAffiliationOrContext:
      'Hydro-Climatologist & Upper Indus Basin Researcher (University of Engineering & Technology Peshawar / Cambridge)',
    westernHimalayanConnection:
      'Seminal hydro-glaciological research on the Upper Indus, Gilgit, Hunza, Shyok, and Karakoram–Western Himalayan high-altitude precipitation and meltwater budgets.',
    verifiedMilestoneSummary:
      'Challenged simplistic glacier-melt assumptions by quantifying extreme high-altitude precipitation underestimates and mass-balance constraints across the Upper Indus Basin.',
    proposedLearningPathwayForKashmir:
      'Mountain hydrology and climate-dependent water security',
    kashmirCounterpartQuestion:
      'How can high-elevation snow-pillow and isotope observations resolve precipitation vs. glacier-melt uncertainties across the Jhelum, Chenab, and Indus?',
  },
  {
    id: 'fahad-saeed',
    chapterNumber: '35',
    volumeRoman: 'V',
    name: 'Fahad Saeed',
    country: 'Pakistan',
    mirrorId: 'science',
    mirrorLabel: 'Environmental Scientists & Experts',
    primaryAffiliationOrContext:
      'Climate Physicist & Regional Lead for South Asia, Climate Analytics · IPCC Contributing Scientist',
    verifiedMilestoneSummary:
      'Advanced regional dynamical climate modelling, extreme heat-humidity thresholds, monsoon flood attribution, and 1.5°C/2°C vulnerability science across South Asia.',
    proposedLearningPathwayForKashmir:
      'Contemporary climate modelling and extreme-weather research',
    kashmirCounterpartQuestion:
      'How can Western Himalayan universities run high-resolution convection-permitting climate models to stress-test valley floodplains and orchards?',
  },
  {
    id: 'ghulam-rasul',
    chapterNumber: '36',
    volumeRoman: 'V',
    name: 'Ghulam Rasul',
    country: 'Pakistan',
    mirrorId: 'science',
    mirrorLabel: 'Environmental Scientists & Experts',
    primaryAffiliationOrContext:
      'Meteorologist & Glaciologist · Former Director General, Pakistan Meteorological Department · Former Regional Programme Manager, ICIMOD',
    westernHimalayanConnection:
      'Decades of synoptic meteorology, winter western-disturbance research, and Glacial Lake Outburst Flood (GLOF) hazard monitoring across Gilgit-Baltistan and AJ&K.',
    verifiedMilestoneSummary:
      'Connected high-altitude synoptic weather observation and Karakoram–Himalayan glacier lake inventories directly to operational early-warning and disaster-preparedness systems.',
    proposedLearningPathwayForKashmir:
      'Meteorology, glaciology and climatic hazards',
    kashmirCounterpartQuestion:
      'How can meteorological and cryospheric research translate seamlessly into village-level GLOF, avalanche, and cloudburst early-warning lead times?',
  },
  {
    id: 'madhav-gadgil',
    chapterNumber: '37',
    volumeRoman: 'V',
    name: 'Madhav Gadgil',
    country: 'India',
    mirrorId: 'science',
    mirrorLabel: 'Environmental Scientists & Experts',
    primaryAffiliationOrContext:
      'Founder, Centre for Ecological Sciences, IISc Bengaluru · Chair, Western Ghats Ecology Expert Panel · Tyler Prize & 2024 UNEP Champion of the Earth',
    verifiedMilestoneSummary:
      'Pioneered quantitative mathematical and field ecology in India, architected grass-roots People’s Biodiversity Registers, and chaired the Western Ghats Ecology Expert Panel (WGEEP)—whose science-based zoning recommendations encountered intense political and commercial resistance, illustrating both scientific integrity and the challenge of governance adoption.',
    proposedLearningPathwayForKashmir:
      'Ecological limits and community-oriented conservation science',
    kashmirCounterpartQuestion:
      'What would a Gadgil-calibre, panchayat-participatory Western Himalayan Ecological Sensitivity Atlas look like—and how would scientists defend its integrity?',
  },
  {
    id: 'maharaj-k-pandit',
    chapterNumber: '38',
    volumeRoman: 'V',
    name: 'Maharaj K. Pandit',
    country: 'India',
    mirrorId: 'science',
    mirrorLabel: 'Environmental Scientists & Experts',
    primaryAffiliationOrContext:
      'Himalayan Ecologist, Former Dean of Science, University of Delhi · Author of Life in the Himalaya (Harvard University Press)',
    westernHimalayanConnection:
      'Born and educated in Kashmir before conducting decades of pan-Himalayan plant genetics, treeline shift, land-use, and hydropower-impact research.',
    verifiedMilestoneSummary:
      'Quantified projected biodiversity loss, forest submergence, and cumulative dam density risks across the Himalayas in leading international journals while synthesizing Himalayan natural and cultural history.',
    proposedLearningPathwayForKashmir:
      'Himalayan biodiversity and mountain ecosystem vulnerability',
    kashmirCounterpartQuestion:
      'How can Kashmiri and Himalayan biologists combine molecular genetics, treeline field plots, and cumulative infrastructure models to inform basin policy?',
  },
  {
    id: 'qamar-uz-zaman-chaudhry',
    chapterNumber: '39',
    volumeRoman: 'V',
    name: 'Qamar-uz-Zaman Chaudhry',
    country: 'Pakistan',
    mirrorId: 'science',
    mirrorLabel: 'Environmental Scientists & Experts',
    primaryAffiliationOrContext:
      'Meteorologist & Climate Policy Architect · Former DG, Pakistan Meteorological Department · Former Vice-President, World Meteorological Organization (WMO)',
    verifiedMilestoneSummary:
      'Modernized national meteorological forecasting following major droughts/floods, served as Lead Author of Pakistan’s National Climate Change Policy, and represented regional climate science in global WMO governance.',
    proposedLearningPathwayForKashmir:
      'Climate policy and international scientific collaboration',
    kashmirCounterpartQuestion:
      'How can senior regional scientists bridge observational hydrometeorology with statutory climate-adaptation policy and international data standards?',
  },
  {
    id: 'raman-sukumar',
    chapterNumber: '40',
    volumeRoman: 'V',
    name: 'Raman Sukumar',
    country: 'India',
    mirrorId: 'science',
    mirrorLabel: 'Environmental Scientists & Experts',
    primaryAffiliationOrContext:
      'Professor of Ecology, Indian Institute of Science (IISc) · Whitley Gold Award · International Cosmos Prize · IPCC Lead Author',
    verifiedMilestoneSummary:
      'Sustained nearly four decades of continuous demographic, behavioural, and permanent forest-plot monitoring of Asian elephants and tropical montane ecosystems in the Nilgiris—demonstrating the irreplaceable power of multi-decadal ecological datasets.',
    proposedLearningPathwayForKashmir:
      'Long-term wildlife ecology and conservation biology',
    kashmirCounterpartQuestion:
      'Where are the 30-to-50-year permanent forest, wetland, and Hangul/ungulate demographic plots across the Western Himalayas that outlast three-year grant cycles?',
  },
  {
    id: 'veerabhadran-ramanathan',
    chapterNumber: '41',
    volumeRoman: 'V',
    name: 'Veerabhadran Ramanathan',
    country: 'India',
    mirrorId: 'science',
    mirrorLabel: 'Environmental Scientists & Experts',
    primaryAffiliationOrContext:
      'Atmospheric & Climate Scientist, Scripps Institution of Oceanography (UC San Diego) · Crafoord Prize & Tyler Prize Laureate',
    westernHimalayanConnection:
      'Demonstrated how South Asian Atmospheric Brown Clouds and black-carbon soot accelerate Himalayan snow and glacier retreat alongside greenhouse warming.',
    verifiedMilestoneSummary:
      'Discovered the greenhouse effect of chlorofluorocarbons (CFCs) in 1975, led the Indian Ocean Experiment (INDOEX), and quantified black-carbon radiative forcing over the Himalayas while championing clean household cooking solutions (Project Surya).',
    proposedLearningPathwayForKashmir:
      'Atmospheric chemistry, black carbon and global climate processes',
    kashmirCounterpartQuestion:
      'How can Himalayan atmospheric laboratories measure black-carbon deposition directly on Kolahoi, Machoi, Siachen, and Baltoro snowpacks and link it to valley fuel transitions?',
  },
];

export const SOUTH_ASIAN_VANGUARD_32_PERSONALITIES: VanguardPersonalityDossier[] =
  RAW_32_PERSONALITIES.map((p) => ({
    ...p,
    chapterSlug: makeChapterSlug(p.chapterNumber, p.name),
    biographicalResearchStatus:
      'Representative Primary Milestones Verified · Full 20-Section Biographical & Adversity Audit In Progress (Zero Manufactured Anecdotes)',
  }));

// ─────────────────────────────────────────────────────────────────────────────
// SECTION IV — THE DIFFICULTIES THEY FACED AND THE DIFFICULTIES WE FACE (15 ROWS)
// ─────────────────────────────────────────────────────────────────────────────

export const ADVERSITY_AND_ASYMMETRY_15: AdversityComparisonRow[] = [
  { no: '01', professionalChallenge: 'Limited research funding', whatRegionalCommunityCanExamine: 'Shared scientific infrastructure and collaborative multi-university funding applications' },
  { no: '02', professionalChallenge: 'Institutional resistance', whatRegionalCommunityCanExamine: 'Professional independence, calm empirical rigour and evidence-based engagement' },
  { no: '03', professionalChallenge: 'Lack of public awareness', whatRegionalCommunityCanExamine: 'Accessible, multilingual environmental education across local communities' },
  { no: '04', professionalChallenge: 'Political sensitivities', whatRegionalCommunityCanExamine: 'Consistent, non-partisan application of universal scientific and legal standards' },
  { no: '05', professionalChallenge: 'Commercial pressures', whatRegionalCommunityCanExamine: 'Research transparency, conflict-of-interest firewalls and editorial independence' },
  { no: '06', professionalChallenge: 'Limited employment opportunities', whatRegionalCommunityCanExamine: 'Specialized environmental auditing, restoration services and green entrepreneurship' },
  { no: '07', professionalChallenge: 'Inadequate laboratory infrastructure', whatRegionalCommunityCanExamine: 'Inter-departmental partnerships, NABL co-accreditation and shared instrumentation' },
  { no: '08', professionalChallenge: 'Restricted access to information', whatRegionalCommunityCanExamine: 'Lawful information-access mechanisms, satellite open data and public repositories' },
  { no: '09', professionalChallenge: 'Professional isolation', whatRegionalCommunityCanExamine: 'Interdisciplinary regional networks and international scientific collaboration' },
  { no: '10', professionalChallenge: 'Limited publication opportunities', whatRegionalCommunityCanExamine: 'Diamond/green open-access repositories and independent regional scientific platforms' },
  { no: '11', professionalChallenge: 'Financial insecurity', whatRegionalCommunityCanExamine: 'Endowed fellowships and sustainable professional/institutional operating models' },
  { no: '12', professionalChallenge: 'Limited administrative cooperation', whatRegionalCommunityCanExamine: 'Documented constructive engagement paired with lawful statutory accountability' },
  { no: '13', professionalChallenge: 'Public indifference', whatRegionalCommunityCanExamine: 'Sustained livelihood-relevant stakeholder communication and citizen science' },
  { no: '14', professionalChallenge: 'Scientific disagreements', whatRegionalCommunityCanExamine: 'Open code/data reproducibility, split-sample testing and independent peer review' },
  { no: '15', professionalChallenge: 'Delayed implementation', whatRegionalCommunityCanExamine: 'Multi-decade longitudinal research-to-outcome monitoring observatories' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION V — FIVE RECURRING DIMENSIONS OF ENVIRONMENTAL LEADERSHIP
// ─────────────────────────────────────────────────────────────────────────────

export const FIVE_LEADERSHIP_DIMENSIONS: LeadershipDimensionSpec[] = [
  {
    number: '01',
    title: 'They developed deep professional specialization',
    coreInsight:
      'General moral concern rarely changes an engineering DPR or a Supreme Court order; mastery of technical detail does.',
    westernHimalayanApplication:
      'Advocates who can cross-examine a BOD/nutrient mass balance, journalists who understand boundary-layer inversions, scientists fluent in statutory thresholds, and NGOs grounded in community economics.',
  },
  {
    number: '02',
    title: 'They pursued sustained environmental questions across decades',
    coreInsight:
      'Lakes do not recover in one cleanup drive, jurisprudence is not built in one hearing, and ecological dynamics cannot be proved in one summer.',
    westernHimalayanApplication:
      'Maintaining 10-to-30-year continuity on Dal/Wular recovery, Upper Indus/Jhelum glaciers, Hangul corridors, and airshed emissions long after media attention moves on.',
  },
  {
    number: '03',
    title: 'They built institutions that outlive individuals',
    coreInsight:
      'Personal heroism is fragile until it is converted into laboratories, archives, legal clinics, journals, and mentored successors.',
    westernHimalayanApplication:
      'Evolving solo campaigns and university labs into durable institutions with transparent governance and generational training.',
  },
  {
    number: '04',
    title: 'They connected distinct professional disciplines',
    coreInsight:
      'Ecological protection succeeds when empirical measurement, public storytelling, statutory enforcement, and community stewardship interlock.',
    westernHimalayanApplication:
      'Breaking silos among regional science departments, district bars, newsrooms, and grassroots conservation groups.',
  },
  {
    number: '05',
    title: 'They worked for outcomes beyond professional recognition',
    coreInsight:
      'Prizes, impact factors, and citations acknowledge effort—but nature only registers dissolved oxygen, forest survival, e-flows, and thriving species.',
    westernHimalayanApplication:
      'Evaluating our collective work by what physically improves in the rivers, wetlands, karewas, forests, and air of the Western Himalayas.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION VI — COLLECTIVE WESTERN HIMALAYAN PROFESSIONAL INTROSPECTION (5 LETTERS)
// Addressed collectively with dignity and empathy—never naming or humiliating
// individual regional practitioners.
// ─────────────────────────────────────────────────────────────────────────────

export const COLLECTIVE_INTROSPECTION_LETTERS_5: CollectiveIntrospectionLetter[] = [
  {
    id: 'advocates',
    audienceTitle: 'To Our Environmental Advocates',
    recognitionOfDifficulty:
      'We recognize that environmental litigation across distant benches is expensive, unremunerated, technically exhausting, and professionally demanding.',
    constructiveQuestion:
      'Could our advocates establish collaborative environmental legal practices, shared NABL/GIS scientific evidence repositories, and specialized mountain-law clinics that protect rivers, karewas, lakes, and forests before excavation outruns the writ?',
    actionableFirstStep:
      'Form joint district Bar–University Law/Science Environmental Evidence Clinics across Srinagar, Pulwama, Jammu, Leh, Muzaffarabad, and Gilgit.',
  },
  {
    id: 'ngo-leaders',
    audienceTitle: 'To Our Environmental NGO Leaders',
    recognitionOfDifficulty:
      'We recognize how hard it is to sustain a conservation group when funding is uncertain, administrative cooperation fluctuates, and public attention ebbs.',
    constructiveQuestion:
      'Could our organizations progressively evolve from one-person drives into professionally governed institutions capable of sustaining multi-year field science, community coexistence incentives, and audited restoration over generations?',
    actionableFirstStep:
      'Publish open multiyear survival/water-quality outcome ledgers for every plantation, cleanup, or watershed intervention.',
  },
  {
    id: 'journalists',
    audienceTitle: 'To Our Environmental Journalists',
    recognitionOfDifficulty:
      'We recognize the acute economic, editorial, time, and information-access pressures confronting reporters in regional newsrooms.',
    constructiveQuestion:
      'Could our journalists cultivate specialized beats in water, airshed physics, cryosphere risk, biodiversity, and public expenditure—producing investigations that global newsrooms study as original Himalayan journalism?',
    actionableFirstStep:
      'Pair every major conference, AQI spike, flood, or conservation budget report with primary documents, satellite history, and independent scientific review.',
  },
  {
    id: 'scientists',
    audienceTitle: 'To Our Environmental Scientists',
    recognitionOfDifficulty:
      'We recognize the genuine constraints of conducting research with stretched instrumentation, delayed grants, heavy teaching loads, and bureaucratic hurdles.',
    constructiveQuestion:
      'Living inside one of Earth’s greatest natural laboratories, could our scientists pioneer original mountain methodologies studied globally while ensuring every publicly funded paper returns in clear local languages to the communities below the glacier?',
    actionableFirstStep:
      'Establish shared multi-decadal watershed/forest benchmark plots and publish a plain-language Second-Life stakeholder brief alongside every journal paper.',
  },
  {
    id: 'students',
    audienceTitle: 'To Our Students',
    recognitionOfDifficulty:
      'You may begin without elite laboratories, assured employment, or international mentors—uncertain whether quiet, honest work will ever be noticed.',
    constructiveQuestion:
      'Study these thirty-two journeys not as monuments to worship, but as proof that every giant began with an unanswered question about a polluted river, a vanishing forest, or an unheard village. What scientifically rigorous question in your own stream, spring, karewa, or pasture calls for your persistence today?',
    actionableFirstStep:
      'Adopt one local waterbody, spring, marsh, or slope in KEW’s Outdoor Classroom & Student Action Hub and maintain a calibrated multi-season observation log.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION VII — FOUR PROFESSIONS WORKING TOGETHER (6 INTERACTIVE SCENARIOS)
// ─────────────────────────────────────────────────────────────────────────────

export const FOUR_PROFESSIONS_SYNERGY_SCENARIOS_6: FourProfessionSynergyScenario[] = [
  {
    id: 'urban-lake',
    ecologicalChallenge: 'Deterioration of an Urban Himalayan Lake (Canonical Report Example)',
    regionalExample: 'Dal, Nigeen, Anchar, Khushalsar, Mansar',
    scientistRole:
      'Establish the integrated phosphorus/nitrogen mass balance, internal sediment release chemistry, and quantitative TMDL restoration thresholds.',
    journalistRole:
      'Translate the mass balance for citizens and audit STP bypasses, sewer gaps, and multi-decade conservation expenditure against actual water quality.',
    advocateRole:
      'Examine statutory pollution-control and wetland duties, enforce officer accountability, and seek binding lake-load recovery remedies.',
    ngoRole:
      'Engage shoreline households, boatmen, and hoteliers in sewer connection, waste segregation, and sustained community stewardship.',
  },
  {
    id: 'karewa-riverbed',
    ecologicalChallenge: 'Karewa Plateaus & Riverbed Cobble Excavation',
    regionalExample: 'Pampore, Pulwama, Budgam Karewas; Rambiara, Sukhnag, Tawi, Gilgit Riverbeds',
    scientistRole:
      'Quantify annual snowmelt cobble replenishment, knickpoint incision below irrigation kuhls, and Plio-Pleistocene loess-palaeosol stratigraphy.',
    journalistRole:
      'Cross-check mineral e-challans and highway fill tenders against multi-date Sentinel/DEM scarp cuts and affected saffron/orchard farmers.',
    advocateRole:
      'Challenge sub-5-hectare cluster splitting, desktop District Survey Reports, and lack of geoconservation protection through precautionary stays.',
    ngoRole:
      'Train village panchayat paralegals to document kuhl water-table drops and promote recycled C&D waste fill alternatives.',
  },
  {
    id: 'valley-airshed',
    ecologicalChallenge: 'Winter Thermal Inversions & Valley Air Pollution',
    regionalExample: 'Srinagar, Jammu, Muzaffarabad, Leh Winter Basin Stagnation',
    scientistRole:
      'Co-locate reference monitors, correct optical humidity bias, model boundary-layer ventilation, and run chemical source apportionment.',
    journalistRole:
      'Separate sensor artefacts from true PM2.5/black-carbon exposure and investigate brick-kiln, biomass, transport, and waste-burning compliance.',
    advocateRole:
      'Enforce statutory NAAQS/EQS monitoring calibration rules and petition for graded valley-wide winter airshed action plans.',
    ngoRole:
      'Deliver school/hospital clean-air health advisories and pilot affordable clean winter heating and agricultural residue alternatives.',
  },
  {
    id: 'cryosphere-hydropower',
    ecologicalChallenge: 'Glacier Retreat, GLOF Hazards & Hydropower Diversions',
    regionalExample: 'Kolahoi, Lidder, Chenab, Zanskar, Neelum–Jhelum, Hunza & Shyok Basins',
    scientistRole:
      'Monitor proglacial lake expansion, permafrost thaw, and seasonal hydrographs required for cold-water fish and downstream aquifers.',
    journalistRole:
      'Investigate cumulative cascade clearances, tunnel muck disposal, early-warning siren readiness, and post-diversion municipal water scarcity.',
    advocateRole:
      'Enforce dynamic seasonal environmental-flow licences, cumulative EIA mandates, and statutory downstream community safeguards.',
    ngoRole:
      'Organize community GLOF evacuation drills, mountain spring protection, and local water-user monitoring committees.',
  },
  {
    id: 'wildlife-flyway',
    ecologicalChallenge: 'Protected-Area Isolation & Human–Wildlife Conflict',
    regionalExample: 'Dachigam–Overa Hangul Corridors, Baltistan/Ladakh Snow Leopard, Hokersar–Wular Flyway',
    scientistRole:
      'Map genetic/GPS movement corridors, seasonal wetland hydroperiods, and predator depredation hotspots.',
    journalistRole:
      'Report beyond episodic conflict headlines to examine corridor severance, linear border/road cuts, and ranger working conditions.',
    advocateRole:
      'Defend Eco-Sensitive Zones, conservation reserves, raptor-safe powerlines, and wetland brief-document notifications.',
    ngoRole:
      'Operate community-managed livestock insurance (Baltistan model), predator-proof corrals, and winter wetland watcher networks.',
  },
  {
    id: 'research-to-society',
    ecologicalChallenge: 'Bridging Paywalled Science and Ground Action',
    regionalExample: '80+ Research Units Across Kashmir, Jammu, Ladakh, AJ&K & Gilgit-Baltistan',
    scientistRole:
      'Publish reproducible datasets alongside 9-language Second-Life briefs stating actionable limits and uncertainties.',
    journalistRole:
      'Track high-impact Himalayan papers back to the valleys studied and audit whether regulators acted on documented warnings.',
    advocateRole:
      'Incorporate peer-reviewed regional hydrology, ecology, and epidemiology into admissible public-interest evidentiary repositories.',
    ngoRole:
      'Convene village assemblies, orchardists, and school eco-clubs to test and apply validated scientific solutions on the ground.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION IX — WESTERN HIMALAYAN ENVIRONMENTAL LEADERSHIP AGENDA 2027–2035
// Proposed development pathways — NOT currently established or funded programmes
// ─────────────────────────────────────────────────────────────────────────────

export const LEADERSHIP_AGENDA_PROGRAMMES_10: LeadershipAgendaProgramme[] = [
  { no: '01', programme: 'Environmental Legal Fellowship', intendedOutcome: 'Develop specialized mountain environmental advocates fluent in hydrology, EIA, and regulatory science', targetCohort: 'Early-career LL.B./LL.M. advocates across all 5 regions' },
  { no: '02', programme: 'Environmental Investigative Journalism Fellowship', intendedOutcome: 'Strengthen long-horizon scientific, satellite-assisted, and public-expenditure reporting', targetCohort: 'Print, broadcast & digital reporters in regional newsrooms' },
  { no: '03', programme: 'Environmental NGO Leadership Programme', intendedOutcome: 'Develop audited, institutionally sustainable conservation organizations beyond solo founders', targetCohort: 'Regional civil-society & community conservation coordinators' },
  { no: '04', programme: 'Frontier Environmental Research Programme', intendedOutcome: 'Encourage original mountain methodologies in cryosphere, limnology, eDNA, airsheds & GeoAI', targetCohort: 'Doctoral & postdoctoral researchers in regional universities' },
  { no: '05', programme: 'Science-to-Society Programme', intendedOutcome: 'Translate peer-reviewed findings into multilingual community, farmer, and regulator briefs', targetCohort: 'Joint scientist–communicator–extension teams' },
  { no: '06', programme: 'Environmental Mentorship Network', intendedOutcome: 'Connect experienced South Asian & international specialists with emerging regional talent', targetCohort: 'Students, fellows & first-generation researchers' },
  { no: '07', programme: 'Interdisciplinary Environmental Research Grants', intendedOutcome: 'Bring one scientist, one journalist, one advocate, and one NGO together on shared watershed problems', targetCohort: 'Four-profession collaborative project teams' },
  { no: '08', programme: 'Environmental Innovation Challenges', intendedOutcome: 'Prototype sub-zero sewage, clean heating, spring recharge, and non-karewa construction solutions', targetCohort: 'Engineering, ecology & entrepreneurship teams' },
  { no: '09', programme: 'Student Research and Conservation Programme', intendedOutcome: 'Cultivate empirical field observation and ethical stewardship from secondary school through university', targetCohort: 'Schools & colleges in KEW Student Action Hub / Outdoor Classroom' },
  { no: '10', programme: 'Regional Environmental Impact Observatory', intendedOutcome: 'Document measurable professional and biophysical outcomes across decades without personality rankings', targetCohort: 'Open KEW public accountability & learning archive' },
];

export const FIVE_YEAR_INITIAL_ROADMAP_2027_2031: Array<{
  year: string;
  proposedPriority: string;
}> = [
  { year: '2027', proposedPriority: 'Establish verified 20-section biographical learning resources across all 32 pioneers and convene a regional four-profession network' },
  { year: '2028', proposedPriority: 'Develop collaborative clinical legal, scientific-journalism, and NGO-governance training curricula' },
  { year: '2029', proposedPriority: 'Launch scientifically baselined interdisciplinary pilot projects on priority lakes, springs, and corridors' },
  { year: '2030', proposedPriority: 'Publish independent empirical evaluations of both professional capacity and measurable ecological outcomes' },
  { year: '2031', proposedPriority: 'Synthesize validated Western Himalayan conservation, legal, and scientific models for international replication' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION X — 20-SECTION INDIVIDUAL BIOGRAPHICAL DOSSIER STANDARD
// ─────────────────────────────────────────────────────────────────────────────

export const BIOGRAPHICAL_DOSSIER_20_SECTIONS: BiographicalSectionSpec[] = [
  { sectionNumber: '01', requiredContent: 'The person behind the international recognition', evidentiaryRule: 'Grounded in verified interviews, memoirs, and institutional profiles' },
  { sectionNumber: '02', requiredContent: 'Family, geographical and educational background', evidentiaryRule: 'Verified birthplace, schooling, and academic training' },
  { sectionNumber: '03', requiredContent: 'Early professional aspirations', evidentiaryRule: 'Documented early career path prior to prominence' },
  { sectionNumber: '04', requiredContent: 'The beginning of environmental commitment', evidentiaryRule: 'Specific formative case, field site, or scientific question' },
  { sectionNumber: '05', requiredContent: 'Initial professional and institutional circumstances', evidentiaryRule: 'Actual laboratory, newsroom, chamber, or community resources at start' },
  { sectionNumber: '06', requiredContent: 'Documented obstacles and setbacks', evidentiaryRule: 'Strictly verified setbacks only—never manufactured drama' },
  { sectionNumber: '07', requiredContent: 'Financial, scientific or legal challenges', evidentiaryRule: 'Court delays, funding gaps, corporate suits, or data limitations on record' },
  { sectionNumber: '08', requiredContent: 'Significant professional turning points', evidentiaryRule: 'Dated institutional, judicial, or discovery inflection points' },
  { sectionNumber: '09', requiredContent: 'Landmark research, cases or conservation projects', evidentiaryRule: 'Primary citations to judgments, DOIs, statutes, or field programmes' },
  { sectionNumber: '10', requiredContent: 'Scientific or professional methodologies', evidentiaryRule: 'How evidence was gathered, tested, argued, or organized' },
  { sectionNumber: '11', requiredContent: 'Institutional and community collaborations', evidentiaryRule: 'Co-authors, co-counsel, village committees, and teams acknowledged' },
  { sectionNumber: '12', requiredContent: 'Public communication and stakeholder engagement', evidentiaryRule: 'Books, columns, public hearings, and community dialogues' },
  { sectionNumber: '13', requiredContent: 'Documented disagreements and controversies', evidentiaryRule: 'Fair, balanced account of scientific, policy, or commercial disputes' },
  { sectionNumber: '14', requiredContent: 'Environmental and societal impact', evidentiaryRule: 'Measured policy, legal, educational, or ecological changes achieved' },
  { sectionNumber: '15', requiredContent: 'International recognition', evidentiaryRule: 'Verified awards, academy fellowships, and global appointments' },
  { sectionNumber: '16', requiredContent: 'Limitations and unfinished work', evidentiaryRule: 'Candid assessment of where implementation or recovery remained incomplete' },
  { sectionNumber: '17', requiredContent: 'Long-term professional legacy', evidentiaryRule: 'Institutions, doctrines, datasets, and mentees left behind' },
  { sectionNumber: '18', requiredContent: 'What their experiences hold for Kashmir', evidentiaryRule: 'Context-adjusted lessons accounting for regional resource differences' },
  { sectionNumber: '19', requiredContent: 'Practical guidance for regional professionals', evidentiaryRule: 'Actionable methodological takeaways for Himalayan practitioners & students' },
  { sectionNumber: '20', requiredContent: 'Recommended readings and original references', evidentiaryRule: 'Primary judgments, books, papers, and archival links' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SECTION XI — COMPLETE 7-VOLUME, 60-CHAPTER MONOGRAPH ARCHITECTURE
// ─────────────────────────────────────────────────────────────────────────────

export const VANGUARD_MONOGRAPH_VOLUMES_7: VanguardMonographVolumeSpec[] = [
  {
    volumeRoman: 'I',
    volumeNumber: 1,
    title: 'Before They Became Extraordinary',
    chapterRange: '01–06',
    thematicFocus:
      'Why environmental leadership is rarely comfortable, how South Asian environmental movements evolved, and why the Western Himalayas already possess deep intellectual foundations.',
  },
  {
    volumeRoman: 'II',
    volumeNumber: 2,
    title: 'The Legal Defenders of Nature',
    chapterRange: '07–15',
    thematicFocus:
      'Eight 20-section biographical chapters on distinguished Indian and Pakistani environmental advocates (Ahmad Rafay Alam through Umair Saleem) plus a comparative synthesis for the Western Himalayan bar.',
  },
  {
    volumeRoman: 'III',
    volumeNumber: 3,
    title: 'The Leaders Who Built Environmental Institutions',
    chapterRange: '16–24',
    thematicFocus:
      'Eight 20-section biographical chapters on institution-building NGO and community conservation leaders (Aisha Khan through Vivek Menon) plus lessons for Himalayan civil society.',
  },
  {
    volumeRoman: 'IV',
    volumeNumber: 4,
    title: 'The Journalists Who Brought Science to Society',
    chapterRange: '25–33',
    thematicFocus:
      'Eight 20-section biographical chapters on investigative environmental and climate journalists (Afia Salam through Zofeen T. Ebrahim) plus beat-building lessons for Himalayan newsrooms.',
  },
  {
    volumeRoman: 'V',
    volumeNumber: 5,
    title: 'The Scientists Who Advanced Environmental Knowledge',
    chapterRange: '34–42',
    thematicFocus:
      'Eight 20-section biographical chapters on pioneering hydrologists, ecologists, and climate scientists (Asif Khan through Veerabhadran Ramanathan) plus frontier opportunities for Himalayan science.',
  },
  {
    volumeRoman: 'VI',
    volumeNumber: 6,
    title: 'The Mirror for Kashmir',
    chapterRange: '43–52',
    thematicFocus:
      'Honest comparative introspection on documented adversity, institutional inequalities, commitment beyond awards, and four professions working toward shared ecological outcomes.',
  },
  {
    volumeRoman: 'VII',
    volumeNumber: 7,
    title: 'From Inspiration to Contribution',
    chapterRange: '53–60',
    thematicFocus:
      'Practical generational blueprints across law, journalism, civil society, and science, culminating in the Western Himalayan Environmental Leadership Agenda 2027–2035.',
  },
];

const NON_BIO_CHAPTERS: Record<
  string,
  {
    volIdx: number;
    title: string;
    type: 'THEMATIC_ESSAY' | 'REGIONAL_LESSONS_SYNTHESIS';
    focus: string;
    methods: string;
  }
> = {
  // VOLUME I (01–06)
  '01': { volIdx: 0, title: 'Environmental Leadership Is Rarely an Easy Choice', type: 'THEMATIC_ESSAY', focus: 'Examines the professional uncertainty, institutional friction, and multi-decade patience that precede meaningful environmental breakthroughs.', methods: 'Comparative career-trajectory analysis across law, science, journalism, and conservation.' },
  '02': { volIdx: 0, title: 'Before the Awards and International Recognition', type: 'THEMATIC_ESSAY', focus: 'Reconstructs the early unanswered questions, rejected drafts, modest laboratories, and long court dockets behind celebrated South Asian careers.', methods: 'Archival review of early-career publications, filings, and institutional histories.' },
  '03': { volIdx: 0, title: 'The Historical Development of South Asian Environmental Movements', type: 'THEMATIC_ESSAY', focus: 'Traces post-1970s forest, water, wildlife, urban pollution, and constitutional climate movements across India and Pakistan.', methods: 'Historical synthesis of South Asian environmental law, science, and civic institutions.' },
  '04': { volIdx: 0, title: 'Four Professions, One Environmental Responsibility', type: 'THEMATIC_ESSAY', focus: 'Establishes why scientists, journalists, advocates, and NGO leaders form an indivisible ecological accountability ecosystem.', methods: 'Systems analysis of interdisciplinary environmental problem-solving.' },
  '05': { volIdx: 0, title: 'Kashmir and Its Existing Intellectual Foundations', type: 'THEMATIC_ESSAY', focus: 'Honours existing universities, 80+ research units, legal petitioners, reporters, and rangers across all five Western Himalayan regions while acknowledging resource constraints.', methods: 'Cross-synthesis with Dispatch 01, Dispatch 13, and KEW Green Heroes registries.' },
  '06': { volIdx: 0, title: 'Looking Beyond Our Mountains Without Diminishing What Lies Within', type: 'THEMATIC_ESSAY', focus: 'Sets the ethical charter for comparative professional introspection—rejecting both provincial complacency and unfair resource-blind comparisons.', methods: 'Comparative institutional sociology & research-ethics framework.' },

  // SYNTHESIS CHAPTERS IN VOLUMES II–V (15, 24, 33, 42)
  '15': { volIdx: 1, title: 'Lessons for the Western Himalayan Legal Fraternity', type: 'REGIONAL_LESSONS_SYNTHESIS', focus: 'Synthesizes Chapters 07–14 into ten specialized mountain-law pathways from lake TMDLs and karewa heritage to seasonal e-flows.', methods: 'Comparative jurisprudence across India, Pakistan, J&K, Ladakh, AJ&K, and GB.' },
  '24': { volIdx: 2, title: 'Lessons for Western Himalayan Civil Society', type: 'REGIONAL_LESSONS_SYNTHESIS', focus: 'Synthesizes Chapters 16–23 into ten institutional evolutions—from episodic cleanups and solo founders to lab-backed, community-aligned conservation institutions.', methods: 'Organizational durability, financial governance, and community-incentive analysis.' },
  '33': { volIdx: 3, title: 'Lessons for Western Himalayan Environmental Journalism', type: 'REGIONAL_LESSONS_SYNTHESIS', focus: 'Synthesizes Chapters 25–32 into ten investigative beat transformations uniting satellite imagery, lab records, budgets, and rural voices.', methods: 'Editorial methodology & science-journalism portfolio analysis.' },
  '42': { volIdx: 4, title: 'Lessons for Western Himalayan Environmental Science', type: 'REGIONAL_LESSONS_SYNTHESIS', focus: 'Synthesizes Chapters 34–41 into twelve opportunities for original mountain methodologies paired with multilingual local knowledge return.', methods: 'Disciplinary frontier mapping across cryosphere, limnology, airsheds, eDNA, and GeoAI.' },

  // VOLUME VI (43–52)
  '43': { volIdx: 5, title: 'It Was Not Easy for Them', type: 'THEMATIC_ESSAY', focus: 'Documents the verified scientific controversies, commercial lawsuits, funding droughts, and implementation battles faced by the 32 pioneers.', methods: 'Primary-source audit of documented professional obstacles (zero fabricated drama).' },
  '44': { volIdx: 5, title: 'It Is Not Easy for Us', type: 'THEMATIC_ESSAY', focus: 'Examines laboratory gaps, precarious contracts, editorial pressures, 700-km tribunal distances, and administrative hurdles across the five Himalayan regions.', methods: 'Institutional condition assessment across regional universities, bars, newsrooms, and NGOs.' },
  '45': { volIdx: 5, title: 'Understanding Professional and Institutional Inequalities', type: 'THEMATIC_ESSAY', focus: 'Distinguishes structural resource asymmetries (global endowments vs. regional campuses) from habits within our own professional control.', methods: 'Comparative research-infrastructure and institutional-autonomy analysis.' },
  '46': { volIdx: 5, title: 'Environmental Commitment Beyond Professional Recognition', type: 'THEMATIC_ESSAY', focus: 'Asks what endures in rivers, forests, and communities after awards, promotions, and conference applause fade.', methods: 'Outcome-versus-accolade evaluation framework.' },
  '47': { volIdx: 5, title: 'Scientific Knowledge Beyond Academic Publications', type: 'THEMATIC_ESSAY', focus: 'Connects Volume V scientific excellence directly to Dispatch 13’s Second-Life stakeholder communication covenant.', methods: 'Science-to-policy and community translation case studies.' },
  '48': { volIdx: 5, title: 'Journalism Beyond Environmental Headlines', type: 'THEMATIC_ESSAY', focus: 'Explores how multi-year beat persistence uncovers slow ecological violence invisible to daily event reporting.', methods: 'Longitudinal environmental-reporting case analysis.' },
  '49': { volIdx: 5, title: 'Environmental Law Beyond the Courtroom', type: 'THEMATIC_ESSAY', focus: 'Examines legislative drafting, compliance telemetry, and preventive administrative freezes alongside PIL advocacy.', methods: 'Integration with Monograph 07’s 15 legislative reform packages.' },
  '50': { volIdx: 5, title: 'Civil Society Beyond Individual Leadership', type: 'THEMATIC_ESSAY', focus: 'Designs governance, succession, financial auditing, and technical-cadre models for Himalayan conservation NGOs.', methods: 'Institutional lifecycle governance study.' },
  '51': { volIdx: 5, title: 'The Opportunities We May Not Yet Have Fully Explored', type: 'THEMATIC_ESSAY', focus: 'Identifies under-explored niches—from palaeoclimatic karewa archives and cold-desert microbiology to transboundary flyway telemetry.', methods: 'Regional comparative-advantage & research-gap synthesis.' },
  '52': { volIdx: 5, title: 'Four Professions Working Towards Shared Environmental Outcomes', type: 'REGIONAL_LESSONS_SYNTHESIS', focus: 'Operationalizes joint Scientist × Journalist × Advocate × NGO action protocols across lakes, rivers, airsheds, glaciers, and forests.', methods: 'Four-profession convergence matrix & case simulations.' },

  // VOLUME VII (53–60)
  '53': { volIdx: 6, title: 'Building the Next Generation of Environmental Advocates', type: 'THEMATIC_ESSAY', focus: 'Curriculum, clinical lab-literacy, and fellowship design for mountain environmental law.', methods: 'Proposed Environmental Legal Fellowship blueprint.' },
  '54': { volIdx: 6, title: 'Building the Next Generation of Environmental Journalists', type: 'THEMATIC_ESSAY', focus: 'Training reporters in satellite change detection, hydrochemical literacy, budget auditing, and field verification.', methods: 'Proposed Environmental Investigative Journalism Fellowship blueprint.' },
  '55': { volIdx: 6, title: 'Building the Next Generation of Conservation Institutions', type: 'THEMATIC_ESSAY', focus: 'Incubating transparent, science-led community conservation institutions across all five regions.', methods: 'Proposed Environmental NGO Leadership Programme blueprint.' },
  '56': { volIdx: 6, title: 'Building the Next Generation of Environmental Scientists', type: 'THEMATIC_ESSAY', focus: 'Supporting shared instrumentation, multi-decade field plots, open data, and global-calibre methodology development.', methods: 'Proposed Frontier Environmental Research Programme blueprint.' },
  '57': { volIdx: 6, title: 'Environmental Mentorship and Professional Development', type: 'THEMATIC_ESSAY', focus: 'Designing structured cross-generational mentorship linking seasoned scholars, jurists, editors, and conservationists with students.', methods: 'Mentorship charter & KEW Student Action Hub integration.' },
  '58': { volIdx: 6, title: 'The Western Himalayan Environmental Leadership Agenda 2027–2035', type: 'REGIONAL_LESSONS_SYNTHESIS', focus: 'Full ten-programme architecture and 2027–2031 five-year implementation sequence.', methods: 'Phased capacity-building & impact-evaluation roadmap (proposed).' },
  '59': { volIdx: 6, title: 'From Regional Talent to International Scientific Contribution', type: 'THEMATIC_ESSAY', focus: 'Charts how locally grounded Western Himalayan discoveries can shape global mountain science, law, and conservation.', methods: 'Pathway analysis from local watershed inquiry to global reference model.' },
  '60': { volIdx: 6, title: 'When the World Begins to Learn From Kashmir', type: 'THEMATIC_ESSAY', focus: 'Closing reflection envisioning a Western Himalayan professional culture studied internationally for rigour, perseverance, and ecological integrity.', methods: 'Integrative philosophical and institutional conclusion.' },
};

export const VANGUARD_MONOGRAPH_CHAPTERS_60: VanguardMonographChapter[] = Array.from(
  { length: 60 },
  (_, i) => {
    const num = String(i + 1).padStart(2, '0');
    const bio = SOUTH_ASIAN_VANGUARD_32_PERSONALITIES.find(
      (p) => p.chapterNumber === num
    );

    if (bio) {
      const vol = VANGUARD_MONOGRAPH_VOLUMES_7.find(
        (v) => v.volumeRoman === bio.volumeRoman
      )!;
      return {
        number: num,
        slug: bio.chapterSlug,
        volumeRoman: vol.volumeRoman,
        volumeTitle: vol.title,
        title: bio.name,
        chapterType: 'BIOGRAPHICAL_DOSSIER',
        linkedPersonalityId: bio.id,
        analyticalFocus: `${bio.country} · ${bio.mirrorLabel} (${bio.primaryAffiliationOrContext}). ${bio.verifiedMilestoneSummary} Proposed Kashmir Learning Pathway: ${bio.proposedLearningPathwayForKashmir}.`,
        researchMethodologyAndSources:
          '20-Section Independent Journalistic Biography Protocol (Sections 01–20): primary judicial/scientific/editorial works, institutional archives, verified international citations, and documented obstacles without manufactured adversity.',
        researchStatus: bio.biographicalResearchStatus,
      };
    }

    const nonBio = NON_BIO_CHAPTERS[num]!;
    const vol = VANGUARD_MONOGRAPH_VOLUMES_7[nonBio.volIdx]!;
    return {
      number: num,
      slug: makeChapterSlug(num, nonBio.title),
      volumeRoman: vol.volumeRoman,
      volumeTitle: vol.title,
      title: nonBio.title,
      chapterType: nonBio.type,
      analyticalFocus: nonBio.focus,
      researchMethodologyAndSources: nonBio.methods,
      researchStatus:
        'Proposed Monograph Chapter Protocol · Editorial Architecture Established (Primary Research & External Review Ongoing)',
    };
  }
);

export function getVanguardChapterBySlug(
  chapterSlug: string
): VanguardMonographChapter | undefined {
  return VANGUARD_MONOGRAPH_CHAPTERS_60.find((c) => c.slug === chapterSlug);
}
