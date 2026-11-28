// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 07 & EXPANDED ENVIRONMENTAL LAW FLAGSHIP
// "WHEN ENVIRONMENTAL LAWS EXIST BUT NATURE HAS NO DEFENCE"
// (Edition Dispatch Title: "When Environmental Laws Exist but the Environment Has No Defence")
//
// Twenty-Five Years of Environmental Legislation, Institutional Enforcement,
// Ecological Deterioration and the Case for Legal Reform Across the Western Himalayas
//
// Scope: Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan
// Architecture: 4 Distinct Regional Legal Frameworks · 5 Geographical Regions ·
//               15 Proposed Legislative & Regulatory Reform Packages ·
//               20 Thematic Volumes · 100 Proposed Chapters ·
//               16 Permanent KEW Legal Observatory Registries
//
// Evidentiary & Legal Provenance Safeguards:
// 1. Enacted legislation is strictly separated from proposed reform frameworks.
// 2. Historical audit findings (CAG Report No. 4 of 2025 up to March 2022;
//    NGT Ladakh Sept 2025 proceedings) are explicitly distinguished from current
//    verified November 2026 field conditions.
// 3. Dual statutory citations for Gilgit-Baltistan (2015 Assembly register Act VI of 2015
//    vs. 2014 short-title / GB-EPA usage) are both retained pending gazette reconciliation.
// 4. Legal allegations are strictly separated from adjudicated violations, and zero
//    unverified CNR strings are generated.
// 5. All 15 proposed reform packages are model frameworks requiring independent review
//    by qualified environmental lawyers in each respective competent jurisdiction.
// ─────────────────────────────────────────────────────────────────────────────

export type WesternHimalayanLegalRegion =
  | 'Kashmir Valley'
  | 'Jammu Division'
  | 'Ladakh'
  | 'Azad Jammu & Kashmir'
  | 'Gilgit-Baltistan';

export type ReformTriageCategory =
  | 'ENFORCEMENT_AND_FUNDING'
  | 'TARGETED_AMENDMENT'
  | 'NEW_ECOSYSTEM_LAW';

export type RetainResetActionType = 'RETAIN_STRENGTHEN' | 'RESET_REVISE' | 'SUPPLEMENT_REVIEW';

export interface RegionalLegalFrameworkSpec {
  region: WesternHimalayanLegalRegion;
  frameworkCode: 'IND-JKL-UT-JK' | 'IND-JKL-UT-LADAKH' | 'AJK-STATUTORY' | 'GB-STATUTORY';
  principalLegalFramework: string;
  constitutionalAndTransitionalNotes: string;
  primaryEnvironmentalAgency: string;
  primaryJudicialForum: string;
}

export interface StatutoryInstrumentRecord {
  no: string;
  title: string;
  originalIntention: string;
  jurisdictionGroup: 'J&K & Ladakh Central' | 'J&K & Ladakh Subordinate' | 'J&K & Ladakh Regional' | 'Azad Jammu & Kashmir' | 'Gilgit-Baltistan';
  enactmentYear?: number;
  verificationStatus: 'Verified Primary Statute / Rule' | 'Requires Territorial Adaptation / Amendment Check' | 'Dual Citation Retained (2014/2015)';
}

export interface StatutoryAgeRecord {
  legislation: string;
  jurisdiction: string;
  originalEnactment: number;
  ageIn2026Years: number;
  contemporaryScientificGap: string;
}

export interface EnforcementVsLegislativeRow {
  no: string;
  environmentalProblem: string;
  existingLegalProtection: string;
  recommendedApproach: string;
  triageCategory: ReformTriageCategory;
}

export interface ProposedReformPackage {
  packageNumber: string; // '01' .. '15'
  sectionNumber: number; // 17 .. 31
  slug: string;
  title: string;
  primaryTargetGap: string;
  applicableRegionsNote: string;
  summaryRationale: string;
  keyProvisions: Array<{ requirement: string; intendedOutcome: string }>;
  existingLawIntegrationNote: string;
}

export interface RetainResetMatrixRow {
  existingLegalFramework: string;
  proposedAction: string;
  actionType: RetainResetActionType;
}

export interface InternationalLegalComparisonRow {
  framework: string;
  jurisdiction: string;
  potentialLesson: string;
}

export interface KewLegalObservatoryRegistrySpec {
  code: string;
  name: string;
  permanentFunction: string;
  evidentiaryStandard: string;
  connectedKewHref: string;
  connectedKewLabel: string;
}

export interface LegalMonographVolumeSpec {
  volumeRoman: string;
  volumeNumber: number;
  investigationTitle: string;
  chapterRange: string;
  jurisdictionalAndAnalyticalScope: string;
}

export interface LegalMonographChapterProtocol {
  number: string; // '01' .. '100'
  slug: string;
  volumeRoman: string;
  volumeTitle: string;
  title: string;
  legalAndScientificFocus: string;
  primarySourcesAndMethodology: string;
  verificationStatus: string;
}

export const ENVIRONMENTAL_LAW_MONOGRAPH_SPEC = {
  monographCode: 'MONOGRAPH 07 · ENVIRONMENTAL JURISPRUDENCE & LEGISLATIVE REFORM',
  monographSlug: 'monograph-07-when-environmental-laws-exist',
  dispatchSlug: 'when-environmental-laws-exist-but-the-environment-has-no-defence',
  kicker:
    'SPECIAL LEGAL & SCIENTIFIC INVESTIGATION · ENVIRONMENTAL JURISPRUDENCE · LEGISLATIVE REFORM · REGULATORY ACCOUNTABILITY',
  editionTitle: 'When Environmental Laws Exist but the Environment Has No Defence',
  monographTitle: 'When Environmental Laws Exist but Nature Has No Defence',
  subtitle:
    'What the Laws Were Intended to Protect, Where Protection Broke Down and What Must Change',
  extendedSubtitle:
    'Twenty-Five Years of Environmental Legislation, Institutional Enforcement, Ecological Deterioration and the Case for Legal Reform Across the Western Himalayas',
  monographExtendedSubtitle:
    "The Western Himalayas' Environmental Legal Architecture: What It Was Intended to Protect, Where Protection Broke Down and What Must Change",
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Environmental Jurisprudence, Scientific Governance and Legislative Accountability Desk',
  geographicScope:
    'Kashmir · Jammu · Ladakh · Azad Jammu & Kashmir · Gilgit-Baltistan · Western Himalayas',
  statusBadge:
    'Proposed 20-Volume, 100-Chapter Legal & Scientific Monograph · Preliminary Five-Region Statutory Census',
  heroStats: [
    { value: '5 / 4', label: 'Regions / Legal frameworks' },
    { value: '15', label: 'Proposed reform packages' },
    { value: '20 / 100', label: 'Volumes / Proposed chapters' },
  ],
  observatoryHeroStats: [
    { value: '5', label: 'Geographical regions' },
    { value: '4', label: 'Principal regional legal frameworks' },
    { value: '15', label: 'Proposed reform packages' },
  ],
  coreObjective:
    'The objective is not simply to demand more environmental laws. It is to establish whether the existing legal architecture is capable of protecting the Western Himalayas of today and tomorrow.',
  fiveFundamentalQuestions: [
    'What environmental laws apply across the five regions?',
    'What were these laws originally intended to accomplish?',
    'Where is there documented evidence of inadequate environmental protection?',
    'Which deficiencies require better enforcement, and which require legislative reform?',
    'What new legal protections are necessary for environmental challenges that existing laws do not adequately address?',
  ],
  researchVerificationStatus:
    'The preliminary review has identified the principal environmental statutes, several important amendments (including India’s Solid Waste Management Rules, 2026 effective April 1, 2026, C&D Waste Rules 2025, Environment Audit Rules 2025, Water Amendment Act 2024, Supreme Court M.K. Ranjitsinh 2024, and Pakistan Constitutional Article 9A 2024), official regulatory frameworks, judicial proceedings, and documented implementation deficiencies. However, the exhaustive section-by-section legal census remains incomplete—particularly for subordinate regulations in Azad Jammu & Kashmir and Gilgit-Baltistan, historical territorial adaptations following the J&K Reorganisation Act 2019, and recent gazette notifications. Visual verification of three primary PDFs could not be completed during preliminary scoping, although their indexed legal and audit text was accessible. All 15 proposed reform packages represent model analytical frameworks and must undergo independent review by qualified environmental lawyers in each respective jurisdiction before being presented as draft legislation.',
  definingEditorialStatement: [
    'A law should not be considered successful merely because it has been enacted.',
    'A forest protection law must be examined against the condition of forests.',
    'A water pollution law must be examined against the condition of rivers and lakes.',
    'A wildlife protection law must be examined against the survival of wildlife and its habitats.',
    'An environmental impact assessment framework must be examined against the actual consequences of approved development.',
    'And environmental restoration legislation must be examined against the ecological systems it has genuinely helped recover.',
    'The Western Himalayas need more than environmental legislation written for administrative compliance. They need environmental legislation informed by contemporary science, supported by enforceable responsibilities and evaluated through independently measured outcomes.',
  ],
  ultimatePurposeAxiom:
    'The ultimate purpose of environmental law is not the protection of an administrative procedure. It is the protection of the environment itself.',
  publicationHierarchy: [
    {
      level: '01 · Inaugural Edition Flagship Investigation',
      title: 'When Environmental Laws Exist but the Environment Has No Defence',
      detail:
        'Positioned immediately after The Atmosphere Has No Borders and before A Lake Cannot Be Rescued by an Annual Cleanup: synthesizes all 4 regional legal frameworks, documented audit failures, and 15 reform packages while preserving KCEF Law College & JKCAG grassroots context.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/when-environmental-laws-exist-but-the-environment-has-no-defence',
      ctaLabel: 'Read Legal Investigation',
    },
    {
      level: '02 · Complete 20-Volume, 100-Chapter Monograph',
      title: 'Monograph 07 — 20 Thematic Volumes & 100 Proposed Chapters',
      detail:
        'Full comparative statutory architecture covering Kashmir, Jammu, Ladakh, AJ&K, and Gilgit-Baltistan, US/EU/Aarhus/TMDL benchmarks, and the 2027–2035 legislative agenda.',
      href: '/himalayan-dispatch/issues/monograph-07-when-environmental-laws-exist',
      ctaLabel: 'Open Monograph 07',
    },
    {
      level: '03 · Permanent KEW Governance Infrastructure',
      title: 'Western Himalayan Environmental Legislation & Enforcement Observatory',
      detail:
        '16 permanent registries integrated with KEW’s Environmental PIL Portal and Governance Charter—strictly separating enacted vs. proposed laws and allegations vs. adjudicated violations.',
      href: '/governance/legislation-enforcement-observatory',
      ctaLabel: 'Open Legal Observatory',
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PART I — FOUR DISTINCT LEGAL FRAMEWORKS ACROSS FIVE GEOGRAPHICAL REGIONS
// ─────────────────────────────────────────────────────────────────────────────

export const FOUR_LEGAL_FRAMEWORKS_5_REGIONS: RegionalLegalFrameworkSpec[] = [
  {
    region: 'Kashmir Valley',
    frameworkCode: 'IND-JKL-UT-JK',
    principalLegalFramework:
      'Indian central environmental legislation and applicable Jammu & Kashmir laws',
    constitutionalAndTransitionalNotes:
      'Substantially reshaped by the Jammu and Kashmir Reorganisation Act, 2019; historical state enactments (e.g., J&K Wildlife Protection Act 1978, State Forest Act) must be distinguished from central statutes and adapted UT laws currently in force.',
    primaryEnvironmentalAgency: 'J&K Pollution Control Committee (J&K PCC) · UT SEIAA · LCMA / WUCMA',
    primaryJudicialForum: 'High Court of J&K and Ladakh · National Green Tribunal (Principal Bench) · Supreme Court of India',
  },
  {
    region: 'Jammu Division',
    frameworkCode: 'IND-JKL-UT-JK',
    principalLegalFramework:
      'Indian central environmental legislation and applicable Jammu & Kashmir laws',
    constitutionalAndTransitionalNotes:
      'Shares the UT of Jammu & Kashmir statutory architecture with Kashmir Valley; historical decisions prior to October 31, 2019 must be evaluated against the law in force on the date of decision.',
    primaryEnvironmentalAgency: 'J&K Pollution Control Committee (J&K PCC) · UT SEIAA · J&K Forest Dept.',
    primaryJudicialForum: 'High Court of J&K and Ladakh · National Green Tribunal (Principal Bench) · Supreme Court of India',
  },
  {
    region: 'Ladakh',
    frameworkCode: 'IND-JKL-UT-LADAKH',
    principalLegalFramework:
      'Indian central legislation, adapted regional laws and Ladakh-specific regulations',
    constitutionalAndTransitionalNotes:
      'Administered as a Union Territory without legislature since October 31, 2019 alongside the Ladakh Autonomous Hill Development Councils Act, 1997 (Leh & Kargil LAHDCs) and adapted UT notifications.',
    primaryEnvironmentalAgency: 'Ladakh Pollution Control Committee (LPCC) · UT Ladakh Forest, Ecology & Environment Dept.',
    primaryJudicialForum: 'High Court of J&K and Ladakh · National Green Tribunal (Principal Bench) · Supreme Court of India',
  },
  {
    region: 'Azad Jammu & Kashmir',
    frameworkCode: 'AJK-STATUTORY',
    principalLegalFramework:
      'AJ&K environmental legislation and separately adopted laws',
    constitutionalAndTransitionalNotes:
      "Governed principally by the AJ&K Environmental Protection Act, 2000 (Act IV of 2000) and AJ&K Interim Constitution arrangements; Pakistan's federal environmental statutes (e.g., PEPA 1997 or federal climate provisions) do not automatically apply identically without separate AJ&K adoption or constitutional extension.",
    primaryEnvironmentalAgency: 'AJ&K Environmental Protection Agency (EPA-AJK) · AJ&K Forest & Wildlife Dept.',
    primaryJudicialForum: 'Environmental Protection Tribunal · AJ&K High Court · AJ&K Supreme Court',
  },
  {
    region: 'Gilgit-Baltistan',
    frameworkCode: 'GB-STATUTORY',
    principalLegalFramework:
      'GB environmental legislation, regional statutes and applicable federal laws',
    constitutionalAndTransitionalNotes:
      'Governed by the Gilgit-Baltistan Environmental Protection Act, 2014/2015 (registered as Act VI of 2015 by GB Assembly; cited as 2014 in short title and GB-EPA practice) and GB Forest Act, 2019; federal Pakistani environmental laws cannot be assumed to apply identically without specific territorial extension.',
    primaryEnvironmentalAgency: 'Gilgit-Baltistan Environmental Protection Agency (GB-EPA) · GB Forest, Wildlife & Environment Dept.',
    primaryJudicialForum: 'GB Environmental Tribunal · Gilgit-Baltistan Chief Court · Supreme Appellate Court GB',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART II — KASHMIR, JAMMU AND LADAKH STATUTORY & REGULATORY INVENTORY
// ─────────────────────────────────────────────────────────────────────────────

export const JKL_FUNDAMENTAL_ACTS_18: StatutoryInstrumentRecord[] = [
  { no: '01', title: 'Environment (Protection) Act, 1986', originalIntention: 'Comprehensive environmental protection and pollution regulation', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 1986, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '02', title: 'Water (Prevention and Control of Pollution) Act, 1974', originalIntention: 'Prevention and control of water pollution (including 2024 Amendment Act applicable to UTs)', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 1974, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '03', title: 'Air (Prevention and Control of Pollution) Act, 1981', originalIntention: 'Prevention and control of atmospheric pollution', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 1981, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '04', title: 'Indian Forest Act, 1927', originalIntention: 'Forest administration and regulation of forest resources', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 1927, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '05', title: 'Forest (Conservation) Act, 1980 — renamed Van (Sanrakshan Evam Samvardhan) Adhiniyam (amended 2023)', originalIntention: 'Regulation of forest land diversion', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 1980, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '06', title: 'Wild Life (Protection) Act, 1972', originalIntention: 'Protection of wildlife, habitats and protected areas', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 1972, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '07', title: 'Biological Diversity Act, 2002', originalIntention: 'Biodiversity conservation, sustainable use and benefit sharing', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 2002, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '08', title: 'National Green Tribunal Act, 2010', originalIntention: 'Specialized environmental adjudication and remedies', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 2010, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '09', title: 'Public Liability Insurance Act, 1991', originalIntention: 'Immediate relief for accidents involving hazardous substances', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 1991, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '10', title: 'Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006', originalIntention: "Recognition of forest-dwelling communities' rights and conservation responsibilities", jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 2006, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '11', title: 'Disaster Management Act, 2005', originalIntention: 'Disaster preparedness, mitigation and coordinated response', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 2005, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '12', title: 'Energy Conservation Act, 2001', originalIntention: 'Energy efficiency and conservation', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 2001, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '13', title: 'Mines and Minerals (Development and Regulation) Act, 1957', originalIntention: 'Regulation of mineral development and extraction', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 1957, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '14', title: 'Insecticides Act, 1968', originalIntention: 'Regulation of insecticides and associated risks', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 1968, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '15', title: 'Prevention of Cruelty to Animals Act, 1960', originalIntention: 'Prevention of unnecessary animal suffering', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 1960, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '16', title: 'Right to Information Act, 2005', originalIntention: 'Public access to government-held information, including environmental records', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 2005, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '17', title: 'Right to Fair Compensation and Transparency in Land Acquisition, Rehabilitation and Resettlement Act, 2013', originalIntention: 'Land acquisition safeguards, social assessment and rehabilitation', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 2013, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '18', title: 'National Waterway Act, 2016', originalIntention: 'Development and regulation of designated inland waterways', jurisdictionGroup: 'J&K & Ladakh Central', enactmentYear: 2016, verificationStatus: 'Verified Primary Statute / Rule' },
];

export const CONSTITUTIONAL_PROVISIONS_5: Array<{
  provision: string;
  environmentalSignificance: string;
}> = [
  {
    provision: 'Article 21',
    environmentalSignificance:
      'Right to life, judicially interpreted to encompass environmental protection and freedom from adverse effects of climate change (M.K. Ranjitsinh, 2024)',
  },
  {
    provision: 'Article 48A',
    environmentalSignificance:
      'Directive Principle: State responsibility to protect and improve the environment and safeguard forests and wildlife',
  },
  {
    provision: 'Article 51A(g)',
    environmentalSignificance:
      'Fundamental duty of every citizen to protect and improve the natural environment including forests, lakes, rivers and wildlife',
  },
  {
    provision: 'Article 32',
    environmentalSignificance:
      'Constitutional writ remedies through the Supreme Court of India',
  },
  {
    provision: 'Article 226',
    environmentalSignificance:
      'High Court writ jurisdiction for constitutional and statutory environmental remedies',
  },
];

export const SUBORDINATE_RULES_22: StatutoryInstrumentRecord[] = [
  { no: '01', title: 'Environment (Protection) Rules, 1986', originalIntention: 'Environmental standards and pollution limits', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 1986, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '02', title: 'Environmental Impact Assessment Notification, 2006', originalIntention: 'Prior assessment and clearance of designated development projects', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2006, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '03', title: 'Wetlands (Conservation and Management) Rules, 2017', originalIntention: 'Identification, protection and management of qualifying wetlands', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2017, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '04', title: 'Solid Waste Management Rules, 2026 (in force April 1, 2026 — replacing 2016 Rules)', originalIntention: 'Strengthened collection, segregation, bulk-waste-generator duties, waste processing and local-authority reporting', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2026, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '05', title: 'Plastic Waste Management Rules, 2016, as amended', originalIntention: 'Plastic pollution and extended producer responsibility', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2016, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '06', title: 'Bio-Medical Waste Management Rules, 2016, as amended', originalIntention: 'Safe segregation, treatment and management of medical waste', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2016, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '07', title: 'E-Waste Management Rules, 2022', originalIntention: 'Electronic waste recycling and producer responsibility', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2022, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '08', title: 'Battery Waste Management Rules, 2022', originalIntention: 'Battery collection, recycling and safe disposal', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2022, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '09', title: 'Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016', originalIntention: 'Hazardous waste management and movement controls', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2016, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '10', title: 'Environment (Construction and Demolition) Waste Management Rules, 2025', originalIntention: 'Construction debris management, muck handling and recycling obligations', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2025, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '11', title: 'Noise Pollution (Regulation and Control) Rules, 2000', originalIntention: 'Ambient noise standards and silence-zone regulation', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2000, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '12', title: 'Manufacture, Storage and Import of Hazardous Chemical Rules, 1989', originalIntention: 'Industrial chemical safety and hazard control', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 1989, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '13', title: 'Chemical Accidents (Emergency Planning, Preparedness, and Response) Rules, 1996', originalIntention: 'Chemical emergency preparedness', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 1996, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '14', title: 'Ozone Depleting Substances (Regulation and Control) Rules, 2000', originalIntention: 'Regulation and phase-out of ozone-depleting substances', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2000, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '15', title: 'Environment Audit Rules, 2025', originalIntention: 'Structured third-party and regulatory environmental compliance auditing', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2025, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '16', title: 'Green Credit Rules, 2023', originalIntention: 'Voluntary market-based incentives for qualifying environmental activities', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2023, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '17', title: 'Biological Diversity Rules and applicable amendments', originalIntention: 'Biodiversity Management Committees, People’s Biodiversity Registers and benefit sharing', jurisdictionGroup: 'J&K & Ladakh Subordinate', verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '18', title: 'Van (Sanrakshan Evam Samvardhan) Rules / Forest conservation rules and amendments', originalIntention: 'Procedures governing forest land diversion and compensatory afforestation', jurisdictionGroup: 'J&K & Ladakh Subordinate', verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '19', title: 'Eco-Sensitive Zone (ESZ) site-specific notifications', originalIntention: 'Site-specific land-use and commercial restrictions around protected areas (e.g., Dachigam, Overa-Aru, Gulmarg, Hemis)', jurisdictionGroup: 'J&K & Ladakh Subordinate', verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '20', title: 'National Ambient Air Quality Standards (NAAQS, 2009)', originalIntention: 'Permissible ambient air pollution concentrations across 12 pollutants', jurisdictionGroup: 'J&K & Ladakh Subordinate', enactmentYear: 2009, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '21', title: 'General & Industry-Specific Effluent Discharge Standards', originalIntention: 'Industrial and municipal STP wastewater discharge quality limits', jurisdictionGroup: 'J&K & Ladakh Subordinate', verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '22', title: 'Groundwater Extraction Guidelines (CGWA / UT Water Resources Authority)', originalIntention: 'Regulation and NOC appraisal of groundwater withdrawal where applicable', jurisdictionGroup: 'J&K & Ladakh Subordinate', verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
];

export const REGIONAL_LAND_WATER_LAWS_15: StatutoryInstrumentRecord[] = [
  { no: '01', title: 'J&K Water Resources (Regulation and Management) Act, 2010', originalIntention: 'Water allocation, abstraction, embankment protection and water-resource governance', jurisdictionGroup: 'J&K & Ladakh Regional', enactmentYear: 2010, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '02', title: 'J&K Development Act, 1970', originalIntention: 'Development authorities (SDA, JDA, tourism authorities) and spatial master planning', jurisdictionGroup: 'J&K & Ladakh Regional', enactmentYear: 1970, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '03', title: 'J&K Control of Building Operations Act, 1988', originalIntention: 'Regulation of building permissions and action against unauthorized construction', jurisdictionGroup: 'J&K & Ladakh Regional', enactmentYear: 1988, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '04', title: 'J&K Land Revenue Act, Samvat 1996 (1939 CE) as amended', originalIntention: 'Land classification (kahcharai, shamilat, abi-awal, nambal) and land-use administration', jurisdictionGroup: 'J&K & Ladakh Regional', enactmentYear: 1939, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '05', title: 'J&K Agrarian Reforms Act, 1976', originalIntention: 'Agricultural land tenure, orchard/cultivation rules and associated land rights', jurisdictionGroup: 'J&K & Ladakh Regional', enactmentYear: 1976, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '06', title: 'J&K Prevention of Ribbon Development Act, 2007', originalIntention: 'Control of linear commercial/residential development along designated road corridors', jurisdictionGroup: 'J&K & Ladakh Regional', enactmentYear: 2007, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '07', title: 'J&K Brick Kilns (Regulation) Act, 2010', originalIntention: 'Licensing, siting (away from orchards/habitations) and regulation of brick kilns', jurisdictionGroup: 'J&K & Ladakh Regional', enactmentYear: 2010, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '08', title: 'J&K Brick Kilns (Regulation) Rules, 2017', originalIntention: 'Operational and emission requirements for brick manufacturing', jurisdictionGroup: 'J&K & Ladakh Regional', enactmentYear: 2017, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '09', title: 'J&K Municipal Act, 2000', originalIntention: 'Local municipal sanitation, solid waste and urban environmental governance', jurisdictionGroup: 'J&K & Ladakh Regional', enactmentYear: 2000, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '10', title: 'J&K Municipal Corporation Act, 2000', originalIntention: 'Metropolitan environmental services, drainage and building control (Srinagar & Jammu)', jurisdictionGroup: 'J&K & Ladakh Regional', enactmentYear: 2000, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '11', title: 'J&K Panchayati Raj Act, 1989', originalIntention: 'Halqa Panchayat local governance and village-level resource responsibilities', jurisdictionGroup: 'J&K & Ladakh Regional', enactmentYear: 1989, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '12', title: 'Minor Mineral Concession, Storage, Transportation of Minerals and Prevention of Illegal Mining Rules (2016 & UT adaptations)', originalIntention: 'Extraction of sand, gravel, cobbles, clay/karewa earth and stone minor minerals', jurisdictionGroup: 'J&K & Ladakh Regional', enactmentYear: 2016, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '13', title: 'Town Planning Act / Master Plan Zoning Regulations', originalIntention: 'Land-use compatibility, greenbelt buffers and floodplain construction limits', jurisdictionGroup: 'J&K & Ladakh Regional', verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '14', title: 'Unified Building Bye-Laws (J&K / Ladakh)', originalIntention: 'Construction setbacks, slope cuts, rainwater harvesting, septic/drainage standards', jurisdictionGroup: 'J&K & Ladakh Regional', verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '15', title: 'Ladakh Autonomous Hill Development Councils Act, 1997', originalIntention: 'Autonomous council governance over land, local development and natural resources in Leh and Kargil', jurisdictionGroup: 'J&K & Ladakh Regional', enactmentYear: 1997, verificationStatus: 'Verified Primary Statute / Rule' },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART III — AZAD JAMMU & KASHMIR LEGISLATIVE FRAMEWORK & NEELUM–JHELUM CASE
// ─────────────────────────────────────────────────────────────────────────────

export const AJK_LEGISLATION_12: StatutoryInstrumentRecord[] = [
  { no: '01', title: 'Azad Jammu and Kashmir Environmental Protection Act, 2000 (Act IV of 2000)', originalIntention: 'Environmental protection, pollution prevention and sustainable development (~26 years old in 2026)', jurisdictionGroup: 'Azad Jammu & Kashmir', enactmentYear: 2000, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '02', title: 'AJ&K Review of IEE and EIA Regulations, 2009', originalIntention: 'Prior Initial Environmental Examination and Environmental Impact Assessment of proposed projects', jurisdictionGroup: 'Azad Jammu & Kashmir', enactmentYear: 2009, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '03', title: 'AJ&K State Environmental Quality Standards (SEQS) and associated regulations', originalIntention: 'Control of industrial/municipal emissions, effluents and ambient pollution', jurisdictionGroup: 'Azad Jammu & Kashmir', verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '04', title: 'AJ&K Environmental Laboratories Certification Regulations, 2009', originalIntention: 'Certification and analytical reliability of environmental laboratory testing', jurisdictionGroup: 'Azad Jammu & Kashmir', enactmentYear: 2009, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '05', title: 'AJ&K Wildlife (Protection, Preservation, Conservation and Management) Act, 2014', originalIntention: 'Protection of wildlife, protected habitats and community-based conservation', jurisdictionGroup: 'Azad Jammu & Kashmir', enactmentYear: 2014, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '06', title: 'Jammu and Kashmir Forest Regulation, 1930 (including subsequent AJ&K amendments)', originalIntention: 'Forest-resource demarcation, management and protection (continuing status requires check against subsequent amendments)', jurisdictionGroup: 'Azad Jammu & Kashmir', enactmentYear: 1930, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '07', title: 'Forest (Sale of Timber) Act, 1930', originalIntention: 'Regulation of timber depots, transit and sales', jurisdictionGroup: 'Azad Jammu & Kashmir', enactmentYear: 1930, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '08', title: 'AJ&K Logging and Sawmilling Corporation Act, 1985', originalIntention: 'Institutional management of state timber extraction and sawmilling activities', jurisdictionGroup: 'Azad Jammu & Kashmir', enactmentYear: 1985, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '09', title: 'Regulation of Mines and Oil Fields and Mineral Development (Adaptation) Act, 1980', originalIntention: 'Regulation of mineral concessions and extraction in AJ&K', jurisdictionGroup: 'Azad Jammu & Kashmir', enactmentYear: 1980, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '10', title: 'Applicable AJ&K Municipal and Local Government Legislation', originalIntention: 'Urban/rural solid waste, sanitation and local development (requires statute-by-statute verification)', jurisdictionGroup: 'Azad Jammu & Kashmir', verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '11', title: 'Applicable AJ&K Disaster-Management Legislation', originalIntention: 'Earthquake, flood and landslide preparedness, mitigation and response (requires statute-by-statute verification)', jurisdictionGroup: 'Azad Jammu & Kashmir', verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '12', title: 'Applicable AJ&K Land-Use and Building Regulations', originalIntention: 'Spatial planning, seismic/slope building codes and development control (requires statute-by-statute verification)', jurisdictionGroup: 'Azad Jammu & Kashmir', verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
];

export const NEELUM_JHELUM_IMPLEMENTATION_CASE = {
  title: 'The Neelum–Jhelum Hydroelectric Project: Approval vs. Environmental Performance',
  region: 'Azad Jammu & Kashmir (Muzaffarabad & Neelum Valley Reach)',
  documentedFindings: [
    "AJ&K's official 2019 Voluntary National Review (VNR) explicitly acknowledged reduced Neelum River flows through Muzaffarabad and associated drinking-water scarcity following river diversion.",
    'A subsequent World Bank assessment documented substantive concerns regarding adequacy of environmental flows and their revision only after public objections and judicial intervention.',
    'The AJ&K High Court record includes binding environmental-flow commitments and alternative municipal drinking-water supply obligations.',
  ],
  legalReassessmentRows: [
    {
      existingIntention: 'Environmental impact assessment before construction',
      requiredReassessment: 'Did the original assessment adequately quantify downstream hydrological, thermal and micro-climatic impacts?',
    },
    {
      existingIntention: 'Protection of downstream communities',
      requiredReassessment: 'Were Muzaffarabad drinking-water security, aquifer recharge and riparian livelihoods safeguarded ex-ante?',
    },
    {
      existingIntention: 'Environmental flow requirements',
      requiredReassessment: 'Were ecological flows grounded in seasonal hydrographs rather than a flat negotiated minimum release?',
    },
    {
      existingIntention: 'Conditional environmental approval (NOC)',
      requiredReassessment: 'Were all NOC approval conditions implemented on schedule and independently audited?',
    },
    {
      existingIntention: 'Pollution prevention',
      requiredReassessment: 'Were downstream municipal wastewater dilution and assimilation limits reassessed once river discharge dropped?',
    },
    {
      existingIntention: 'Sustainable hydropower governance',
      requiredReassessment: 'Were cumulative basin impacts across multiple Neelum–Jhelum cascade projects examined together?',
    },
  ],
  sevenEcologicalFlowReformCriteria: [
    'Seasonal river ecology and natural snowmelt/monsoon flow variability',
    'Endemic cold-water aquatic biodiversity (including Schizothorax migration and spawning)',
    'Downstream municipal and rural drinking-water security',
    'Wastewater dilution and assimilation capacity limitations through urban reaches',
    'Alluvial groundwater and riverbank spring interactions',
    'Climate change trajectories and multi-year winter/autumn drought conditions',
    'Cumulative upstream and downstream diversion infrastructure across the entire basin',
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PART IV — GILGIT-BALTISTAN STATUTORY FRAMEWORK, FOREST ACT STRENGTHS & 2026 REVIEW
// ─────────────────────────────────────────────────────────────────────────────

export const GB_LEGISLATION_12: StatutoryInstrumentRecord[] = [
  { no: '01', title: 'Gilgit-Baltistan Environmental Protection Act, 2014 / 2015 (Act VI of 2015)', originalIntention: 'Pollution prevention, conservation and sustainable development (GB Assembly register: Act VI of 2015; short title & GB-EPA usage: 2014 — both retained)', jurisdictionGroup: 'Gilgit-Baltistan', enactmentYear: 2014, verificationStatus: 'Dual Citation Retained (2014/2015)' },
  { no: '02', title: 'Environmental Assessment Provisions (IEE / EIA) under the GB EPA', originalIntention: 'Mandatory prior Initial Environmental Examination or EIA and regulatory NOC approval before project commencement', jurisdictionGroup: 'Gilgit-Baltistan', verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '03', title: 'Gilgit-Baltistan Environmental Quality Standards (GB-EQS)', originalIntention: 'Regulatory limits on waste, air emissions, liquid effluents and ambient noise', jurisdictionGroup: 'Gilgit-Baltistan', verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '04', title: 'Northern Areas Wildlife Preservation Act, 1975', originalIntention: 'Wildlife conservation, protected areas and hunting/trophy regulation (~51 years old in 2026)', jurisdictionGroup: 'Gilgit-Baltistan', enactmentYear: 1975, verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '05', title: 'Gilgit-Baltistan Forest Act, 2019', originalIntention: 'Modern ecosystem-wide conservation encompassing forests, rangelands, wetlands, riverbeds, glaciers, ecosystem-service valuation and climate management (FAOLEX)', jurisdictionGroup: 'Gilgit-Baltistan', enactmentYear: 2019, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '06', title: 'Gilgit-Baltistan Forest (Amendment) Act, 2020', originalIntention: 'Targeted amendment of forest governance and administrative provisions', jurisdictionGroup: 'Gilgit-Baltistan', enactmentYear: 2020, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '07', title: 'Gilgit-Baltistan Disaster Management Act, 2017', originalIntention: 'GLOF, landslide, earthquake and flood mitigation, preparedness and response', jurisdictionGroup: 'Gilgit-Baltistan', enactmentYear: 2017, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '08', title: 'Gilgit-Baltistan Industrial Regulations, 2018', originalIntention: 'Industrial siting, operation and environmental safeguards', jurisdictionGroup: 'Gilgit-Baltistan', enactmentYear: 2018, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '09', title: 'Base Transceiver Station (BTS) Regulations, 2018', originalIntention: 'Environmental, generator-noise and siting regulation of telecommunications towers', jurisdictionGroup: 'Gilgit-Baltistan', enactmentYear: 2018, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '10', title: 'Gilgit-Baltistan Travel Agencies and Tour Operators Act, 2020', originalIntention: 'Licensing and regulation of trekking, expedition and tourism-related businesses', jurisdictionGroup: 'Gilgit-Baltistan', enactmentYear: 2020, verificationStatus: 'Verified Primary Statute / Rule' },
  { no: '11', title: 'Applicable Gilgit-Baltistan Mining and Mineral Concession Regulations', originalIntention: 'Gemstone, dimension-stone and alluvial/placer gold mineral concessions and extraction', jurisdictionGroup: 'Gilgit-Baltistan', verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
  { no: '12', title: 'Applicable Gilgit-Baltistan Local Government Legislation', originalIntention: 'Municipal solid waste, sanitation and town administration', jurisdictionGroup: 'Gilgit-Baltistan', verificationStatus: 'Requires Territorial Adaptation / Amendment Check' },
];

export const GB_GOVERNANCE_CASE_NOTES = {
  statutoryCitationReconciliation:
    'The Gilgit-Baltistan Assembly legislative register identifies the statute as the Gilgit-Baltistan Environmental Protection Act, 2015 (Act VI of 2015), whereas the published short-title clause and Gilgit-Baltistan Environmental Protection Agency (GB-EPA) official usage cite it as the Gilgit-Baltistan Environmental Protection Act, 2014. Both citations are retained until authenticated gazette and commencement notifications are reconciled.',
  forestAct2019Strengths:
    'Documented in FAOLEX, the Gilgit-Baltistan Forest Act, 2019 extends well beyond colonial timber policing: it expressly covers forests alongside associated rangelands, wetlands, riverbeds and glaciers, and provides statutory hooks for ecosystem-service valuation and climate-related management. Replacing such progressive statutory language without first auditing field implementation would be an analytical error.',
  placerGoldMining2026Concern:
    'In August 2026, Dawn reported statements from the Director of GB-EPA highlighting environmental noncompliance in riverine placer gold mining—specifically inadequate waste-management arrangements and failure by several operators to observe statutory environmental requirements. Because the GB EPA Act already prohibits unauthorized pollution and mandates prior IEE/EIA approval, this episode primarily illustrates an enforcement and inspection-capacity deficit rather than a complete absence of statutory authority.',
  legislativeReviewOpportunity2026:
    'A 2026 consultancy notice identified an active institutional initiative to review and update the GB Environmental Protection Act and its subordinate regulations in collaboration with GB-EPA—creating a timely window for scientifically grounded provisions on GLOF/cryosphere hazards, riverine mining, high-altitude tourism carrying capacity, and cumulative corridor assessments.',
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PART V — DOCUMENTED IMPLEMENTATION FAILURES (J&K CAG 2025 & LADAKH NGT 2025)
// ─────────────────────────────────────────────────────────────────────────────

export const DOCUMENTED_IMPLEMENTATION_FAILURES = {
  jkLakeLegislationGap: {
    source:
      'Comptroller and Auditor General (CAG) of India — Report No. 4 of 2025 (Performance Audit on Conservation and Management of Lakes, Chapter II, Sections 2.4–2.5; audit cutoff March 2022, publicly released 2026). Post-audit status of the draft bill requires separate official confirmation.',
    metrics: [
      { figure: '2000', label: 'Draft dedicated lake bill prepared (April 2000)' },
      { figure: '2022', label: 'Still unapproved at audit cutoff (March 2022)' },
      { figure: '22 years', label: 'Documented legislative delay' },
      { figure: '9', label: 'Institutions with overlapping lake-related functions' },
    ],
    widerInventoryMetrics: [
      { figure: '697', label: 'Historically inventoried lakes' },
      { figure: '518', label: 'Disappeared or reduced in area' },
      { figure: '63', label: 'Sampled lakes in audit' },
      { figure: '50', label: 'Sampled lakes receiving untreated sewage' },
    ],
    temporalCaveat:
      'These inventory and sewage figures pertain strictly to historical audit periods examined up to March 2022 and do not establish the current November 2026 field status of every waterbody.',
    crossLinkedDispatches: [
      {
        title: 'The Mathematics of a Dying Lake',
        href: '/himalayan-dispatch/issues/volume-01-issue-01/the-mathematics-of-a-dying-lake',
      },
      {
        title: 'Dal Lake Conservation Performance Observatory',
        href: '/water-systems/lakes/dal-lake/conservation-performance',
      },
    ],
  },
  ladakhSewageDeficit: {
    source:
      'National Green Tribunal proceedings (September 2025) examining UT Ladakh municipal solid waste and sewage compliance, alongside 2026 UT Ladakh administrative compliance reviews under Supreme Court directions and Solid Waste Management Rules, 2026.',
    combinedDeficitMld: '12.33 MLD',
    lehDeficitMld: '5.69 MLD',
    kargilDeficitMld: '6.64 MLD',
    temporalCaveat:
      'Historical treatment-gap figures reported by the administration in September 2025 NGT proceedings—not independently verified current November 2026 discharge volumes.',
    structuralLesson:
      'Mandatory statutory standards do not automatically construct sub-zero biological sewage treatment plants, recruit cold-climate environmental engineers, or fund O&M budgets; legal accountability must be paired with capital and technical execution.',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PART VI — STATUTORY AGE BENCHMARKS (2026) & RECENT PENALTY AMENDMENTS
// ─────────────────────────────────────────────────────────────────────────────

export const STATUTORY_AGE_TABLE_18: StatutoryAgeRecord[] = [
  { legislation: 'Indian Forest Act', jurisdiction: 'J&K & Ladakh', originalEnactment: 1927, ageIn2026Years: 99, contemporaryScientificGap: 'Enacted for colonial timber reservation prior to satellite canopy telemetry, landscape genetics and carbon/hydrological valuation.' },
  { legislation: 'AJ&K Forest Regulation', jurisdiction: 'Azad Jammu & Kashmir', originalEnactment: 1930, ageIn2026Years: 96, contemporaryScientificGap: 'Pre-dates watershed service accounting, climate-driven treeline shifts and community co-management science.' },
  { legislation: 'Mines and Minerals (Development and Regulation) Act', jurisdiction: 'J&K & Ladakh', originalEnactment: 1957, ageIn2026Years: 69, contemporaryScientificGap: 'Designed around mineral royalties rather than DEM sediment-replenishment budgets or instream knickpoint geomorphology.' },
  { legislation: 'Insecticides Act', jurisdiction: 'J&K & Ladakh', originalEnactment: 1968, ageIn2026Years: 58, contemporaryScientificGap: 'Pre-dates alpine pollinator decline science, cold-water endocrine disruption and orchard fungicide runoff budgets.' },
  { legislation: 'J&K Development Act', jurisdiction: 'Jammu & Kashmir', originalEnactment: 1970, ageIn2026Years: 56, contemporaryScientificGap: 'Conceived for conventional urban expansion before LiDAR landslide susceptibility and climate-adjusted 1-in-100-year floodplains.' },
  { legislation: 'Wild Life (Protection) Act', jurisdiction: 'J&K & Ladakh', originalEnactment: 1972, ageIn2026Years: 54, contemporaryScientificGap: 'Strong sanctuary focus, though linear corridor permeability and climate-refugia shifts outside parks remain weakly protected.' },
  { legislation: 'Water (Prevention and Control of Pollution) Act', jurisdiction: 'J&K & Ladakh', originalEnactment: 1974, ageIn2026Years: 52, contemporaryScientificGap: 'Regulates concentration at individual outfalls rather than binding receiving-lake Total Maximum Daily Loads (TMDLs); 2024 Amendment shifts several offences to civil penalties.' },
  { legislation: 'Northern Areas Wildlife Act', jurisdiction: 'Gilgit-Baltistan', originalEnactment: 1975, ageIn2026Years: 51, contemporaryScientificGap: 'Half-century-old protected-species ordinance predating eDNA, GPS telemetry and modern transboundary corridor ecology.' },
  { legislation: 'Forest (Conservation) Act / Van Adhiniyam', jurisdiction: 'J&K & Ladakh', originalEnactment: 1980, ageIn2026Years: 46, contemporaryScientificGap: '2023 amendment exempts strategic linear works within 100 km of borders—encompassing most of J&K and Ladakh.' },
  { legislation: 'Air (Prevention and Control of Pollution) Act', jurisdiction: 'J&K & Ladakh', originalEnactment: 1981, ageIn2026Years: 45, contemporaryScientificGap: 'Point-source stack licensing without statutory enclosed-valley winter inversion airshed budgets or transboundary attribution.' },
  { legislation: 'Environment (Protection) Act', jurisdiction: 'J&K & Ladakh', originalEnactment: 1986, ageIn2026Years: 40, contemporaryScientificGap: 'Broad umbrella enabling power (§§3, 5), yet lacks mandatory open machine-readable compliance telemetry.' },
  { legislation: 'AJ&K Environmental Protection Act', jurisdiction: 'Azad Jammu & Kashmir', originalEnactment: 2000, ageIn2026Years: 26, contemporaryScientificGap: 'Requires modernization for dynamic seasonal e-flows, GLOF/climate risk appraisal and cumulative basin EIA.' },
  { legislation: 'Biological Diversity Act', jurisdiction: 'J&K & Ladakh', originalEnactment: 2002, ageIn2026Years: 24, contemporaryScientificGap: 'People’s Biodiversity Registers rarely integrated as binding constraints in infrastructure or mining clearances.' },
  { legislation: 'EIA Notification', jurisdiction: 'J&K & Ladakh', originalEnactment: 2006, ageIn2026Years: 20, contemporaryScientificGap: 'Project-by-project proponent-paid consultancy model vulnerable to parcel splitting and lacking mandatory watershed CEIA.' },
  { legislation: 'J&K Water Resources Act', jurisdiction: 'Jammu & Kashmir', originalEnactment: 2010, ageIn2026Years: 16, contemporaryScientificGap: 'Focuses on hydraulic control and abstraction licensing without seasonal ecological-flow floors or karst spring recharge zones.' },
  { legislation: 'GB Environmental Protection Act (short-title year)', jurisdiction: 'Gilgit-Baltistan', originalEnactment: 2014, ageIn2026Years: 12, contemporaryScientificGap: 'Scheduled for 2026 regulatory review to strengthen cryosphere, placer-mining and tourism carrying-capacity rules.' },
  { legislation: 'Wetlands (Conservation and Management) Rules', jurisdiction: 'J&K & Ladakh', originalEnactment: 2017, ageIn2026Years: 9, contemporaryScientificGap: 'Hundreds of <2.25 ha village nambals remain unnotified and unbuffered; lacks dedicated eutrophic lake recovery triggers.' },
  { legislation: 'Gilgit-Baltistan Forest Act', jurisdiction: 'Gilgit-Baltistan', originalEnactment: 2019, ageIn2026Years: 7, contemporaryScientificGap: 'Scientifically modern scope (glaciers, wetlands, riverbeds, ecosystem services); primary challenge is subordinate rulemaking and field enforcement.' },
];

export const WATER_ACT_2024_AND_JAN_VISHWAS_SCRUTINY = {
  title: 'Scrutinizing Recent Penalty Reforms: Water (Amendment) Act, 2024 & Jan Vishwas',
  applicableScope: 'Union Territories including Jammu & Kashmir and Ladakh (plus adopting states)',
  shiftSummary:
    'Replaces traditional magistrate criminal prosecution across multiple environmental compliance offences with administrative monetary penalties adjudicated by appointed Adjudicating Officers (typically Joint Secretary / senior bureaucratic rank), while retaining criminal liability for specific grave violations.',
  empiricalTestQuestions: [
    'Does administrative penalty adjudication inside the executive branch create sufficient deterrence when the defaulting polluter is a municipal corporation or sister government department?',
    'Are adjudicated penalties collected promptly and ring-fenced for physical ecosystem restoration, or absorbed as routine project overheads?',
    'How quickly are repeat violations escalated compared with Section 33A immediate closure directions and NGT proceedings?',
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PART VII — ENFORCEMENT FAILURE VS. LEGISLATIVE FAILURE (15-ROW TRIAGE)
// ─────────────────────────────────────────────────────────────────────────────

export const ENFORCEMENT_VS_LEGISLATIVE_FAILURE_15: EnforcementVsLegislativeRow[] = [
  { no: '01', environmentalProblem: 'Untreated sewage entering lakes', existingLegalProtection: 'Pollution-control legislation (Water Act 1974 / AJ&K EPA / GB EPA)', recommendedApproach: 'Enforce existing obligations and fund full sewer/STP interception', triageCategory: 'ENFORCEMENT_AND_FUNDING' },
  { no: '02', environmentalProblem: 'Illegal forest clearing', existingLegalProtection: 'Forest legislation (IFA 1927, Van Adhiniyam, AJ&K 1930 Reg., GB Forest Act 2019)', recommendedApproach: 'Strengthen field enforcement, satellite alerts and native restoration', triageCategory: 'ENFORCEMENT_AND_FUNDING' },
  { no: '03', environmentalProblem: 'Unauthorized wetland construction', existingLegalProtection: 'Wetland and spatial planning regulations (Wetlands Rules 2017, Municipal/Dev Acts)', recommendedApproach: 'Complete statutory notification, cadastral demarcation and enforcement', triageCategory: 'ENFORCEMENT_AND_FUNDING' },
  { no: '04', environmentalProblem: 'Illegal riverbed extraction', existingLegalProtection: 'Mining and environmental laws (MMDR 1957, Minor Mineral Rules, EIA 2006)', recommendedApproach: 'Enforce permits, scientific snowmelt replenishment limits and channel restoration', triageCategory: 'ENFORCEMENT_AND_FUNDING' },
  { no: '05', environmentalProblem: 'Open waste dumping', existingLegalProtection: 'Waste-management rules (including India Solid Waste Management Rules, 2026)', recommendedApproach: 'Implement existing segregation, processing and landfill-remediation mandates', triageCategory: 'ENFORCEMENT_AND_FUNDING' },
  { no: '06', environmentalProblem: 'Harmful pesticide and fungicide use', existingLegalProtection: 'Insecticides Act, 1968 and agricultural regulations', recommendedApproach: 'Update cold-water/pollinator ecological safeguards and strengthen residue monitoring', triageCategory: 'TARGETED_AMENDMENT' },
  { no: '07', environmentalProblem: 'Chronic lake eutrophication', existingLegalProtection: 'General water-pollution and wetland protection', recommendedApproach: 'Enact dedicated lake conservation, nutrient-budget (TMDL) and recovery obligations', triageCategory: 'NEW_ECOSYSTEM_LAW' },
  { no: '08', environmentalProblem: 'Cumulative impacts of mountain infrastructure', existingLegalProtection: 'Project-level EIA / IEE framework', recommendedApproach: 'Substantially revise rules to mandate basin-wide and regional cumulative assessments', triageCategory: 'TARGETED_AMENDMENT' },
  { no: '09', environmentalProblem: 'Glacier and permafrost ecosystem disturbance', existingLegalProtection: 'Fragmented environmental protections (except partial coverage in GB Forest Act 2019)', recommendedApproach: 'Targeted cryosphere and glacier protection legislation or statutory rules', triageCategory: 'NEW_ECOSYSTEM_LAW' },
  { no: '10', environmentalProblem: 'Tourism & pilgrimage exceeding ecological capacity', existingLegalProtection: 'General town-planning and tourism registration laws', recommendedApproach: 'Enact enforceable site-specific biophysical carrying-capacity limits', triageCategory: 'NEW_ECOSYSTEM_LAW' },
  { no: '11', environmentalProblem: 'Enclosed-valley & transboundary air pollution', existingLegalProtection: 'Municipal/stack-focused Air Pollution Acts', recommendedApproach: 'Establish regional airshed management and cooperative monitoring mechanisms', triageCategory: 'TARGETED_AMENDMENT' },
  { no: '12', environmentalProblem: 'Declining downstream environmental water flows', existingLegalProtection: 'Water-resource statutes and one-off project NOC conditions', recommendedApproach: 'Legislate binding seasonal ecological flow regimes and river connectivity standards', triageCategory: 'NEW_ECOSYSTEM_LAW' },
  { no: '13', environmentalProblem: 'Loss of Plio-Pleistocene karewas & geological heritage', existingLegalProtection: 'Treated merely as ordinary earth / minor mineral under mining & planning laws', recommendedApproach: 'Enact dedicated Himalayan geoconservation and Karewa protection legislation', triageCategory: 'NEW_ECOSYSTEM_LAW' },
  { no: '14', environmentalProblem: 'Repeated ecological noncompliance despite fines', existingLegalProtection: 'Administrative penalties and Polluter-Pays escrow deposits', recommendedApproach: 'Mandate restoration-linked financial liability, performance bonds and disgorgement', triageCategory: 'TARGETED_AMENDMENT' },
  { no: '15', environmentalProblem: 'Scientific & compliance evidence inaccessible to citizens', existingLegalProtection: 'Reactive request-based Right to Information laws', recommendedApproach: 'Enact proactive machine-readable environmental & scientific disclosure mandates', triageCategory: 'NEW_ECOSYSTEM_LAW' },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART VIII — 15 PROPOSED LEGISLATIVE & REGULATORY REFORM PACKAGES (SECS. 17–31)
// Model frameworks for adoption by respective competent jurisdictions — NOT
// enacted laws and NOT a single cross-border statute.
// ─────────────────────────────────────────────────────────────────────────────

export const PROPOSED_REFORM_PACKAGES_15: ProposedReformPackage[] = [
  {
    packageNumber: '01',
    sectionNumber: 17,
    slug: 'mountain-ecosystem-protection-framework',
    title: 'Western Himalayan Mountain Ecosystem Protection Framework',
    primaryTargetGap: 'Plains-centric infrastructure codes treating mountains merely as elevated terrain rather than coupled slope–cryosphere–hydrology systems.',
    applicableRegionsNote: 'Model statutory/regulatory standard for J&K, Ladakh, AJ&K and Gilgit-Baltistan governing roads, tunnels, ropeways, hydropower, mining, tourism resorts and major hill cuts.',
    summaryRationale: 'Requires mandatory pre-approval coupling of LiDAR/InSAR slope stability, seismic/lithological vulnerability, springshed connectivity, biodiversity corridors, climate exposure and cumulative sub-basin load.',
    keyProvisions: [
      { requirement: 'Coupled slope-hydrology-seismic appraisal', intendedOutcome: 'Prevent road/tunnel cuts across active shear zones and karst spring recharge fractures' },
      { requirement: 'Zero river-gorge muck tipping mandate', intendedOutcome: 'Geo-fenced muck banks with mass-balance verification prior to contractor billing' },
      { requirement: 'Sub-basin cumulative disturbance cap', intendedOutcome: 'Keep total linear and extractive footprint within watershed stability thresholds' },
    ],
    existingLawIntegrationNote: 'Can be notified under EPA 1986 §3(2)(v) in J&K/Ladakh and statutory rules under AJ&K EPA 2000 & GB EPA 2014/2015.',
  },
  {
    packageNumber: '02',
    sectionNumber: 18,
    slug: 'lake-and-wetland-conservation-restoration-recovery-act',
    title: 'Lake and Wetland Conservation, Restoration and Recovery Act',
    primaryTargetGap: "Directly addresses Jammu & Kashmir's documented 22-year lake legislation gap (2000–2022, CAG Report No. 4 of 2025) and 9-agency fragmentation, while protecting natural wetland character.",
    applicableRegionsNote: 'Priority standalone bill for Jammu & Kashmir; adaptable lake/wetland recovery schedules for Ladakh high-altitude tarns, AJ&K and GB.',
    summaryRationale: 'Replaces fragmented cosmetic lake projects with unified statutory boundaries, Total Maximum Daily Load (TMDL) nutrient caps, sewer interception, and ecological-character safeguards so shallow marshes are never destructively dredged into artificial ponds.',
    keyProvisions: [
      { requirement: 'Statutory lake & buffer boundaries', intendedOutcome: 'Prevent unauthorized conversion and cadastral encroachment' },
      { requirement: 'Catchment protection zones', intendedOutcome: 'Reduce upstream sediment, agrochemical and nutrient pressures' },
      { requirement: 'Maximum permissible nutrient loads (TMDLs)', intendedOutcome: 'Control chronic phosphorus/nitrogen eutrophication mathematically' },
      { requirement: 'Mandatory 100% sewer & houseboat interception', intendedOutcome: 'Eliminate untreated domestic and commercial sewage inflows' },
      { requirement: 'Internal sediment management standards', intendedOutcome: 'Control legacy benthic phosphorus release without destroying benthic ecology' },
      { requirement: 'Critical lake emergency classification', intendedOutcome: 'Trigger binding advanced scientific restoration intervention' },
      { requirement: 'Independent scientific restoration audits', intendedOutcome: 'Verify biological and hydrochemical recovery separately from executing agencies' },
      { requirement: 'Feasible disappeared-waterbody recovery register', intendedOutcome: 'Reclaim encroached or silted historical nambals and detention basins where hydrologically viable' },
      { requirement: 'Dedicated multiyear restoration financing', intendedOutcome: 'Insulate long-term limnological recovery from annual budget lapses' },
    ],
    existingLawIntegrationNote: 'Supplements Wetlands Rules, 2017 and consolidates overlapping powers across LCMA, WUCMA, UEED, Irrigation & Flood Control, Revenue and Municipal bodies.',
  },
  {
    packageNumber: '03',
    sectionNumber: 19,
    slug: 'himalayan-cryosphere-and-glacier-protection-act',
    title: 'Himalayan Cryosphere and Glacier Protection Act',
    primaryTargetGap: 'Absence of dedicated legal protection for glaciers, permafrost, permanent snowfields and moraine-dammed proglacial lakes outside Gilgit-Baltistan’s Forest Act.',
    applicableRegionsNote: 'Critical for Ladakh and Gilgit-Baltistan, as well as glaciated headwaters of Kashmir (Kolahoi, Thajiwas, Lidder, Sindh), Jammu (Kishtwar/Chenab) and upper Neelum (AJ&K).',
    summaryRationale: 'Establishes periglacial buffer zones, black-carbon controls, permafrost-adjusted foundation codes, and mandatory GLOF early-warning telemetry.',
    keyProvisions: [
      { requirement: 'Glacier-adjacent infrastructure & heavy-vehicle buffers', intendedOutcome: 'Prevent mechanical disturbance and local diesel/asphalt black-carbon deposition on ablation zones' },
      { requirement: 'GLOF hazard zoning & telemetry mandate', intendedOutcome: 'Require real-time bathymetric/SAR monitoring and downstream evacuation sirens' },
      { requirement: 'High-altitude defence, expedition & trekking waste rules', intendedOutcome: 'Enforce zero-burial pack-out protocols on snowfields and moraines' },
      { requirement: 'Permafrost thermal-disturbance assessment', intendedOutcome: 'Mandate climate-adjusted engineering for high-pass roads, pipelines and structures' },
    ],
    existingLawIntegrationNote: 'Incorporates—rather than duplicates—the glacier provisions already enacted in the Gilgit-Baltistan Forest Act, 2019.',
  },
  {
    packageNumber: '04',
    sectionNumber: 20,
    slug: 'cumulative-environmental-impact-assessment-reform',
    title: 'Cumulative Environmental Impact Assessment (CEIA) Reform',
    primaryTargetGap: 'Parcel-by-parcel EIA approvals ("salami-slicing") that clear 15 mining leases, 3 highway packages and 2 hydropower diversions in one valley as isolated standalone files.',
    applicableRegionsNote: 'Amendments to India EIA Notification 2006, AJ&K IEE/EIA Regulations 2009, and GB EPA assessment rules.',
    summaryRationale: 'Requires watershed-scale evaluation of existing, approved and reasonably foreseeable projects, proponent-blind consultant selection, and mandatory appraisal of the "no-project" alternative.',
    keyProvisions: [
      { requirement: 'Basin-wide cumulative impact modelling', intendedOutcome: 'Test combined sediment, flow, slope and habitat stress against watershed carrying capacity' },
      { requirement: 'Mandatory alternatives & "No-Go" option analysis', intendedOutcome: 'Require rejection or redesign where cumulative thresholds are breached' },
      { requirement: 'Proponent-blind public escrow for EIA consultants', intendedOutcome: 'Eliminate financial conflict of interest where developers directly pay the assessor' },
    ],
    existingLawIntegrationNote: 'Builds directly upon Supreme Court of India jurisprudence recognizing cumulative basin impacts and Himalayan carrying capacity.',
  },
  {
    packageNumber: '05',
    sectionNumber: 21,
    slug: 'river-and-environmental-flow-protection-act',
    title: 'River and Environmental Flow Protection Act',
    primaryTargetGap: 'Reducing river law to chemical effluent checks or single flat minimum hydropower releases (as exposed in Neelum–Jhelum and Jhelum/Chenab tributary mining).',
    applicableRegionsNote: 'Model basin statute/rules across Jhelum, Chenab, Indus, Ravi, Shyok, Suru, Neelum, Poonch, Gilgit and Hunza systems.',
    summaryRationale: 'Protects rivers as four-dimensional living hydro-geomorphic corridors—linking seasonal flows, cobble beds, floodplains, riparian canopy, fish migration and aquifer recharge.',
    keyProvisions: [
      { requirement: 'Natural flow regimes → Seasonal environmental flow standards', intendedOutcome: 'Preserve snowmelt, monsoon and winter baseflow hydrographs via real-time telemetered releases' },
      { requirement: 'Riverbeds → Scientific annual replenishment extraction limits', intendedOutcome: 'Ban instream heavy excavators and cap gravel harvest strictly below measured annual recharge' },
      { requirement: 'Floodplains → Restrictions on incompatible construction', intendedOutcome: 'Keep active floodways and detention corridors free of permanent concrete infill' },
      { requirement: 'Riparian vegetation → Ecologically appropriate buffer zones', intendedOutcome: 'Stabilize banks, shade cold-water riffles and filter agricultural runoff' },
      { requirement: 'Aquatic connectivity → Fish migration & habitat continuity', intendedOutcome: 'Mandate functional Schizothorax/mahseer fish ladders and continuous riffle-pool connectivity' },
      { requirement: 'Hydropower corridors → Cumulative basin-level spacing & assessment', intendedOutcome: 'Prevent back-to-back tunnel diversions that dewater entire river valleys' },
      { requirement: 'Groundwater interaction → Protection of river–aquifer recharge', intendedOutcome: 'Prevent bed incision from dropping adjacent village well and kuhl levels' },
      { requirement: 'River water quality → Catchment-specific pollution budgets', intendedOutcome: 'Account for reduced dilution capacity downstream of diversions' },
    ],
    existingLawIntegrationNote: 'Amends J&K Water Resources Act 2010, hydropower NOC/licensing templates in AJ&K and GB, and minor-mineral rules.',
  },
  {
    packageNumber: '06',
    sectionNumber: 22,
    slug: 'himalayan-geological-heritage-and-karewa-protection-act',
    title: 'Himalayan Geological Heritage and Karewa Protection Act',
    primaryTargetGap: 'Complete absence of geoconservation law—allowing 4-million-year Plio-Pleistocene Karewa loess-palaeosol plateaus, fossil beds and glacial landforms to be excavated as cheap "ordinary clay."',
    applicableRegionsNote: 'Urgent statutory gap in Kashmir Valley (Pampore, Pulwama, Budgam, Shopian, Baramulla Karewas) and fossil/tectonic geosites across Jammu, Ladakh, AJ&K and GB.',
    summaryRationale: 'Designates scientifically significant geological formations as protected Geoconservation Heritage Zones, prohibiting destructive strip-cutting and mandating alternative fill materials (such as recycled C&D waste and dredged silt).',
    keyProvisions: [
      { requirement: 'Statutory inventory of Geoconservation & Karewa Heritage Zones', intendedOutcome: 'Reclassify Plio-Pleistocene karewas, vertebrate/floral fossil beds and type sections out of "ordinary earth"' },
      { requirement: 'Prohibition on destructive bench-cutting & mandatory alternatives check', intendedOutcome: 'Require highway/rail embankments to use certified C&D waste, fly ash or dredged lake silt first' },
      { requirement: 'Pre-disturbance stratigraphic rescue & restoration liability', intendedOutcome: 'Mandate palaeoclimatic documentation before unavoidable public works and heavy penalties for illegal cuts' },
    ],
    existingLawIntegrationNote: 'Overrides minor-mineral "ordinary clay" exemptions under MMDR / regional mining rules and links with C&D Waste Rules, 2025.',
  },
  {
    packageNumber: '07',
    sectionNumber: 23,
    slug: 'environmental-carrying-capacity-and-sustainable-tourism-act',
    title: 'Environmental Carrying Capacity and Sustainable Tourism Act',
    primaryTargetGap: 'Setting visitor numbers by hotel beds, road width or revenue targets rather than water availability, sub-zero sewage capacity, slope stability and wildlife sensitivity.',
    applicableRegionsNote: 'Applies across Gulmarg, Pahalgam, Sonamarg, Dal–Nigeen, Leh–Pangong–Nubra, Neelum/Ratti Gali, Hunza, Skardu and major Himalayan pilgrimage corridors.',
    summaryRationale: 'Requires legally binding, seasonally dynamic site carrying-capacity ceilings applying equally—with proportionate, lawful safeguards—to commercial, recreational and pilgrimage visitation.',
    keyProvisions: [
      { requirement: 'Six-factor biophysical carrying-capacity certification', intendedOutcome: 'Tie daily/seasonal permits to verified water supply, functional STP capacity, solid-waste processing, habitat sensitivity, transport emissions and emergency evacuation' },
      { requirement: 'Moratorium trigger where sewage/waste deficits exist', intendedOutcome: 'Pause new commercial hotel/camp expansion in destinations failing STP or SWM compliance (e.g., sub-zero winter gaps)' },
    ],
    existingLawIntegrationNote: 'Integrates with Development Authorities, Tourism Acts (including GB Act 2020), Eco-Sensitive Zone notifications and shrine/pilgrimage management boards.',
  },
  {
    packageNumber: '08',
    sectionNumber: 24,
    slug: 'airshed-management-and-transboundary-atmospheric-framework',
    title: 'Airshed Management and Transboundary Atmospheric Protection Framework',
    primaryTargetGap: 'Municipal boundary air-quality rules incapable of governing topographically bowl-trapped winter inversions or distinguishing indigenous vs. transported aerosols.',
    applicableRegionsNote: 'Valley airshed rules for Kashmir, Jammu, Leh/Kargil, Muzaffarabad and Gilgit/Skardu; national/international scientific arrangements for transboundary exchange.',
    summaryRationale: 'Shifts atmospheric governance from city-limit paperwork to meteorological airsheds while respecting sovereign jurisdiction (a regional authority cannot enforce laws in another country).',
    keyProvisions: [
      { requirement: 'High-resolution gridded emissions inventory', intendedOutcome: 'Quantify brick kilns, biomass heating, transport, diesel gensets, dust and open waste burning' },
      { requirement: 'Calibrated & independently audited sensor standards', intendedOutcome: 'Eliminate uncalibrated low-cost AQI artefacts during high-humidity winter fog' },
      { requirement: 'Nested regional transport & receptor modelling', intendedOutcome: 'Scientifically partition indigenous valley emissions from synoptic transboundary plumes' },
      { requirement: 'Graded seasonal winter-stagnation action plans', intendedOutcome: 'Trigger binding emission controls when boundary-layer ventilation collapses' },
      { requirement: 'Accessible multilingual public-health exposure alerts', intendedOutcome: 'Protect schools, outdoor workers, cardiac/respiratory patients and hospitals' },
      { requirement: 'Source-specific airshed pollution reduction budgets', intendedOutcome: 'Enforce measurable PM2.5 and black-carbon reductions by sector' },
      { requirement: 'Diplomatic & WMO-aligned scientific data exchange', intendedOutcome: 'Enable cooperative regional aerosol/meteorological observation sharing via competent national channels' },
    ],
    existingLawIntegrationNote: 'Directly operationalizes Himalayan Dispatch Monograph 01 (The Atmosphere Has No Borders) under Air Act 1981 / AJ&K & GB EPA rules.',
  },
  {
    packageNumber: '09',
    sectionNumber: 25,
    slug: 'climate-adaptation-and-resilience-act',
    title: 'Climate Adaptation and Resilience Act',
    primaryTargetGap: 'Non-binding climate action plans that lack statutory risk-screening mandates, district adaptation budgets or enforceable public reporting.',
    applicableRegionsNote: 'Grounded in India’s 2024 Supreme Court M.K. Ranjitsinh recognition (Articles 14 & 21) and Pakistan’s 2024 Constitutional Article 9A (subject to separate constitutional analysis for AJ&K and Gilgit-Baltistan).',
    summaryRationale: 'Converts climate adaptation from aspirational policy documents into statutory infrastructure stress-testing, district-level adaptation plans, ring-fenced budgets and periodic scientific review.',
    keyProvisions: [
      { requirement: 'Mandatory climate-risk stress test for major infrastructure', intendedOutcome: 'Require hydropower, bridges, highways and STPs to pass 2050/2080 extreme-precipitation, GLOF and drought scenarios' },
      { requirement: 'Statutory district & watershed climate adaptation plans', intendedOutcome: 'Align orchard water storage, heat/frost advisories, urban drainage and cryosphere safety with ring-fenced budgets' },
    ],
    existingLawIntegrationNote: 'Operationalizes constitutional climate jurisprudence alongside Disaster Management Acts (India 2005, GB 2017, AJ&K framework).',
  },
  {
    packageNumber: '10',
    sectionNumber: 26,
    slug: 'environmental-restoration-liability-and-performance-assurance-act',
    title: 'Environmental Restoration Liability and Performance Assurance Act',
    primaryTargetGap: 'Taxpayer-funded inter-departmental fines and "pay-and-pollute" penalties that neither disgorge unlawful private profit nor restore the damaged river, marsh or slope.',
    applicableRegionsNote: 'Cross-cutting enforcement reform for J&K, Ladakh, AJ&K and Gilgit-Baltistan after auditing existing NGT §20 / EPA compensation powers.',
    summaryRationale: 'Unbundles seven distinct legal liabilities so penalties punish wrongdoing while ring-fenced performance bonds guarantee multi-year physical and biological recovery.',
    keyProvisions: [
      { requirement: 'Seven-tier separated liability ledger', intendedOutcome: 'Distinguish (1) administrative penalty, (2) environmental compensation, (3) disgorgement of unlawful economic gain, (4) primary/complementary restoration, (5) 5–10 yr monitoring cost, (6) upfront rehabilitation bond, and (7) aggravated repeat-offender liability' },
      { requirement: 'Personal departmental officer accountability check', intendedOutcome: 'Enforce statutory neglect clauses (e.g., Water Act §48) before public treasury funds pay for municipal dereliction' },
    ],
    existingLawIntegrationNote: 'Adapts EU Environmental Liability Directive (2004/35/EC) & CERCLA principles without duplicating existing NGT Act §20 remedies.',
  },
  {
    packageNumber: '11',
    sectionNumber: 27,
    slug: 'environmental-information-and-scientific-transparency-act',
    title: 'Environmental Information and Scientific Transparency Act',
    primaryTargetGap: 'Forcing citizens and researchers to file slow, piecemeal RTI requests merely to view basic pollution consents, STP lab logs, mining boundaries or inspection reports.',
    applicableRegionsNote: 'Proactive digital disclosure standard supplementing RTI Act 2005 and information-access laws across all five regions.',
    summaryRationale: 'Establishes Aarhus Pillar I proactive machine-readable public disclosure across ten core environmental records, subject to narrowly defined privacy, border-security and trade-secret exceptions.',
    keyProvisions: [
      { requirement: '01. Environmental clearances (EC / NOC)', intendedOutcome: 'Publish full approval letters, EIA reports and six-monthly compliance audits' },
      { requirement: '02. Pollution consents (CTE / CTO)', intendedOutcome: 'Publish permitted stack emission and effluent discharge limits on a live map' },
      { requirement: '03. Regulatory inspection reports', intendedOutcome: 'Disclose field findings, sample results and corrective directions within 15 days' },
      { requirement: '04. Validated water-quality data', intendedOutcome: 'Publish NABL/certified laboratory logs for drinking intakes, rivers, lakes and STPs' },
      { requirement: '05. Air-quality observations & calibration', intendedOutcome: 'Publish raw/validated concentrations alongside co-location calibration and uncertainty bounds' },
      { requirement: '06. Mining leases & replenishment audits', intendedOutcome: 'Publish GIS lease polygons, permitted depths, DSRs and transit e-challan volumes' },
      { requirement: '07. Forest diversion & CAMPA records', intendedOutcome: 'Publish approved diversion polygons, compensatory plantation coordinates and survival audits' },
      { requirement: '08. Public restoration contracts', intendedOutcome: 'Publish DPRs, tendered costs, engineering performance criteria and measured outcomes' },
      { requirement: '09. Environmental violation & penalty ledger', intendedOutcome: 'Track show-cause notices, closures, penalties and verified compliance status' },
      { requirement: '10. Publicly funded environmental research', intendedOutcome: 'Provide plain-language summaries and policy implementation status' },
    ],
    existingLawIntegrationNote: 'Operates as a sector-specific proactive disclosure schedule under EPA / RTI Section 4(1)(b) equivalents.',
  },
  {
    packageNumber: '12',
    sectionNumber: 28,
    slug: 'ecological-land-use-and-floodplain-protection-act',
    title: 'Ecological Land-Use and Floodplain Protection Act',
    primaryTargetGap: 'Granting building and land-conversion permits under revenue/municipal laws without binding floodplain, wetland-buffer, natural-drainage or landslide constraints.',
    applicableRegionsNote: 'Applies to Jhelum, Tawi, Chenab, Indus, Leh, Muzaffarabad and Gilgit urbanizing corridors and agricultural valley floors.',
    summaryRationale: 'Makes climate-adjusted flood probabilities (rather than outdated historical flood lines alone), natural drainage channels (kuhls/nallahs), landslide hazard maps and primeabi-awal/saffron soils legally binding prerequisites prior to any land-use change or building sanction.',
    keyProvisions: [
      { requirement: 'Cadastral climate-adjusted floodplain & wetland buffer overlay', intendedOutcome: 'Automatically block construction permits inside active floodways, retention marshes and 200 m lake buffers' },
      { requirement: 'Prime agricultural & saffron soil non-conversion rule', intendedOutcome: 'Halt irreversible real-estate ribbon conversion of irrigated valley-floor recharge basins' },
    ],
    existingLawIntegrationNote: 'Binds Town Planning, Development Acts, Land Revenue Acts and Municipal Building Bye-Laws to environmental risk maps.',
  },
  {
    packageNumber: '13',
    sectionNumber: 29,
    slug: 'biodiversity-connectivity-and-migratory-species-framework',
    title: 'Biodiversity Connectivity and Migratory Species Protection Framework',
    primaryTargetGap: 'Island-style protected areas that leave migratory flyway wetlands, riparian shingle islands, winter ungulate corridors and urban biodiversity unprotected outside park gates.',
    applicableRegionsNote: 'Five-region ecological network spanning Central Asian Flyway wetlands, Hangul/Markhor/Snow Leopard corridors and riverine habitats.',
    summaryRationale: 'Directly complements Himalayan Dispatch’s ornithological flagship (The Sky Has No Borders), protecting functional ecological connectivity, migratory stopovers, raptor-safe powerlines and dark-sky/acoustic refugia.',
    keyProvisions: [
      { requirement: 'Notified Ecological Connectivity & Flyway Stopover Corridors', intendedOutcome: 'Protect seasonal Hangul/ungulate movement routes, braided river shingle nesting bars and village nambals' },
      { requirement: 'Wildlife-friendly linear infrastructure standards', intendedOutcome: 'Mandate underpasses/overpasses, insulated raptor-safe transmission lines and seasonal breeding-window blasting bans' },
    ],
    existingLawIntegrationNote: 'Expands Wild Life Protection Act 1972 (Conservation/Community Reserves & ESZs), AJ&K Wildlife Act 2014, and GB wildlife modernization.',
  },
  {
    packageNumber: '14',
    sectionNumber: 30,
    slug: 'environmental-research-to-society-and-public-impact-protocol',
    title: 'Environmental Research-to-Society and Public Impact Protocol',
    primaryTargetGap: 'Publicly financed Himalayan environmental research remaining locked behind paywalls without local stakeholder dissemination, open data or verified policy follow-through.',
    applicableRegionsNote: 'Implemented primarily via research-grant conditions, university ordinances and academic assessment reforms across all five regions—not necessarily a standalone penal statute.',
    summaryRationale: 'Directly connects our legal investigation with Dispatch 12/13 (Who Are We Researching For?): fully protects academic freedom to publish fundamental science while requiring open metadata, multilingual community briefs, and rigorous evidence whenever successful field intervention is claimed.',
    keyProvisions: [
      { requirement: 'Public-grant open-summary & stakeholder-brief condition', intendedOutcome: 'Deliver accessible findings to affected panchayats, farmers, disaster cells and regulators in regional languages' },
      { requirement: 'Reproducibility & intervention-claim verification standard', intendedOutcome: 'Require baseline-plus-multiyear monitoring proof before claiming ecological restoration success' },
    ],
    existingLawIntegrationNote: 'Adoptable via UGC/DST/MoEFCC, HEC Pakistan, university senate statutes and state science councils.',
  },
  {
    packageNumber: '15',
    sectionNumber: 31,
    slug: 'mountain-environmental-emergency-management-framework',
    title: 'Mountain Environmental Emergency Management Framework',
    primaryTargetGap: 'Disaster laws geared toward sudden earthquakes/flash floods while acute ecological emergencies (anoxic fish kills, toxic blooms, extreme winter smog, rapid proglacial lake growth) unfold without statutory emergency triggers.',
    applicableRegionsNote: 'Complements India Disaster Management Act 2005, GB Disaster Management Act 2017 and AJ&K disaster machinery.',
    summaryRationale: 'Defines quantitative biophysical thresholds across seven ecological emergencies that automatically compel immediate scientific stabilization, pollution isolation and public-health warnings.',
    keyProvisions: [
      { requirement: '01. Severe lake dissolved-oxygen depletion (<2 mg/L)', intendedOutcome: 'Trigger emergency aquatic assessment, sewage-bypass shutoff and hydraulic stabilization' },
      { requirement: '02. Toxic cyanobacterial / algal bloom', intendedOutcome: 'Issue immediate water-contact/fishery public warning and scientifically controlled nutrient intervention' },
      { requirement: '03. Extreme winter inversion air-pollution episode', intendedOutcome: 'Activate statutory health advisories, school/hospital filtration support and emergency emission curbs' },
      { requirement: '04. Rapid glacial lake expansion / moraine seepage', intendedOutcome: 'Mandate urgent GLOF hazard survey, downstream alert readiness and controlled mitigation' },
      { requirement: '05. Severe drinking-river chemical/sewage contamination', intendedOutcome: 'Enforce immediate pollution-source isolation and emergency potable water supply' },
      { requirement: '06. Major active slope creep / Toe-cut instability', intendedOutcome: 'Impose immediate risk-based construction/traffic halt and geotechnical stabilization' },
      { requirement: '07. Sudden wildlife or migratory-bird mass mortality', intendedOutcome: 'Trigger rapid veterinary/toxicological/avian-flu investigation and exposure quarantine' },
    ],
    existingLawIntegrationNote: 'Links Pollution Control Committees, Wildlife Wardens and Limnology Authorities directly into SDMA/DDMA emergency command rooms.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART IX — PRIORITY LEGISLATIVE REFORM MATRIX (RETAIN / RESET / SUPPLEMENT)
// ─────────────────────────────────────────────────────────────────────────────

export const RETAIN_RESET_REPLACE_MATRIX_15: RetainResetMatrixRow[] = [
  { existingLegalFramework: 'Water pollution legislation', proposedAction: 'Retain; strengthen receiving-water quality and lake nutrient-load (TMDL) requirements', actionType: 'RETAIN_STRENGTHEN' },
  { existingLegalFramework: 'Air pollution legislation', proposedAction: 'Retain; expand enclosed-valley airshed-scale regulation, winter action plans and sensor calibration', actionType: 'RETAIN_STRENGTHEN' },
  { existingLegalFramework: 'Environment Protection Acts (India 1986, AJ&K 2000, GB 2014/2015)', proposedAction: 'Modernize scientific telemetry standards, climate duties and officer accountability provisions', actionType: 'RESET_REVISE' },
  { existingLegalFramework: 'EIA and IEE regulations', proposedAction: 'Substantially revise cumulative watershed assessment, proponent-blind consultancy and alternatives requirements', actionType: 'RESET_REVISE' },
  { existingLegalFramework: 'Forest conservation legislation', proposedAction: 'Retain; strengthen corridor connectivity, border-zone safeguards and ecological equivalence requirements', actionType: 'RETAIN_STRENGTHEN' },
  { existingLegalFramework: 'Wildlife protection legislation', proposedAction: 'Expand habitat connectivity, migratory flyway stopovers and outside-sanctuary safeguards', actionType: 'RETAIN_STRENGTHEN' },
  { existingLegalFramework: 'Biological diversity legislation', proposedAction: 'Strengthen eDNA/baseline monitoring, BMC funding and binding community participation', actionType: 'RETAIN_STRENGTHEN' },
  { existingLegalFramework: 'Wetlands regulations', proposedAction: 'Complete demarcation/notification of all marshes (<2.25 ha included) and supplement with dedicated lake-recovery law', actionType: 'SUPPLEMENT_REVIEW' },
  { existingLegalFramework: 'Water-resource legislation', proposedAction: 'Introduce binding seasonal environmental flows, springshed recharge protection and ecological water budgets', actionType: 'RESET_REVISE' },
  { existingLegalFramework: 'Mining legislation', proposedAction: 'Strengthen snowmelt-replenishment extraction caps, upfront restoration bonds and satellite spatial verification', actionType: 'RESET_REVISE' },
  { existingLegalFramework: 'Development and spatial planning legislation', proposedAction: 'Integrate legally binding floodplain, landslide, karewa and wetland risk maps prior to permit issuance', actionType: 'RESET_REVISE' },
  { existingLegalFramework: 'Solid waste legislation (including India SWM Rules, 2026)', proposedAction: 'Prioritize rigorous municipal and bulk-generator implementation of current updated requirements', actionType: 'RETAIN_STRENGTHEN' },
  { existingLegalFramework: 'Disaster management legislation', proposedAction: 'Integrate predictive cryospheric (GLOF), slope and slow-onset ecological emergency triggers', actionType: 'RETAIN_STRENGTHEN' },
  { existingLegalFramework: 'Historical colonial-era forest and timber laws (1927 / 1930 / 1975)', proposedAction: 'Review obsolete timber-revenue provisions against contemporary mountain ecosystem management', actionType: 'SUPPLEMENT_REVIEW' },
  { existingLegalFramework: 'Environmental research & university regulations', proposedAction: 'Establish public knowledge-return, multilingual dissemination and applied-research impact obligations', actionType: 'SUPPLEMENT_REVIEW' },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART X — UNITED STATES, EUROPEAN & INTERNATIONAL LEGAL COMPARISON (16 ROWS + TMDL)
// ─────────────────────────────────────────────────────────────────────────────

export const INTERNATIONAL_LEGAL_COMPARISON_16: InternationalLegalComparisonRow[] = [
  { framework: 'United States Clean Water Act (33 U.S.C. §1251 et seq.)', jurisdiction: 'United States', potentialLesson: 'NPDES point-source discharge permits coupled directly with receiving-water biological/chemical integrity goals' },
  { framework: 'US Clean Water Act Section 303(d) — Total Maximum Daily Loads (TMDLs)', jurisdiction: 'United States', potentialLesson: 'Mandatory identification of impaired lakes/rivers and binding catchment-wide pollutant load caps (crucial model for Dal, Nigeen & Anchar)' },
  { framework: 'US Clean Water Act Section 404', jurisdiction: 'United States', potentialLesson: 'Strict permitting, avoidance-first sequencing and compensatory mitigation for dredged or fill material in wetlands and streams' },
  { framework: 'US Clean Air Act', jurisdiction: 'United States', potentialLesson: 'Health-based National Ambient Air Quality Standards paired with enforceable State/Airshed Implementation Plans (SIPs) for non-attainment valleys' },
  { framework: 'US National Environmental Policy Act (NEPA)', jurisdiction: 'United States', potentialLesson: 'Rigorous interdisciplinary analysis of cumulative impacts and mandatory comparison of reasonable alternatives including "No Action"' },
  { framework: 'US Endangered Species Act (ESA)', jurisdiction: 'United States', potentialLesson: 'Designation of Critical Habitat and mandatory interagency consultation prohibiting destruction or adverse modification' },
  { framework: 'US CERCLA (Superfund)', jurisdiction: 'United States', potentialLesson: 'Strict, joint-and-several remediation liability and dedicated trust financing for legacy contaminated/dumping sites' },
  { framework: 'EU Water Framework Directive (2000/60/EC)', jurisdiction: 'European Union', potentialLesson: 'Whole-river-basin management plans legally anchored to achieving "Good Ecological and Chemical Status" rather than administrative boundaries' },
  { framework: 'EU Floods Directive (2007/60/EC)', jurisdiction: 'European Union', potentialLesson: 'Mandatory multi-scenario flood-hazard and flood-risk mapping integrated into spatial land-use planning' },
  { framework: 'EU Habitats Directive (92/43/EEC)', jurisdiction: 'European Union', potentialLesson: 'Coherent Natura 2000 ecological network protecting connected habitat types both inside and between core reserves' },
  { framework: 'EU Nature Restoration Regulation (2024/1991)', jurisdiction: 'European Union', potentialLesson: 'Legally binding time-bound targets to restore degraded wetlands, free-flowing rivers, forests and pollinator habitats' },
  { framework: 'UNECE Aarhus Convention (1998)', jurisdiction: 'UNECE / Global Benchmark', potentialLesson: 'Three enforceable democratic pillars: proactive open environmental data, early public participation and affordable access to justice' },
  { framework: 'Ramsar Convention on Wetlands (1971)', jurisdiction: 'International Treaty', potentialLesson: '"Wise use" obligation and preservation of natural ecological character across designated and connected wetlands (Wular, Hokersar, Shallabugh, Hygam, Tso Kar, Tsomoriri)' },
  { framework: 'Convention on the Conservation of Migratory Species (CMS / Bonn Convention)', jurisdiction: 'International Treaty', potentialLesson: 'Cooperative transboundary protection of Central Asian Flyway waterbirds, raptors and migratory mountain ungulates' },
  { framework: 'Convention on Biological Diversity (CBD & Kunming-Montreal GBF)', jurisdiction: 'International Treaty', potentialLesson: '30x30 connected ecosystem conservation, genetic diversity protection and equitable community benefit-sharing' },
  { framework: 'Paris Agreement (UNFCCC, 2015)', jurisdiction: 'International Treaty', potentialLesson: 'National/regional climate mitigation contributions paired with statutory adaptation planning and loss-and-damage risk governance' },
];

export const TMDL_LAKE_ADAPTATION_MODEL = {
  title: 'Adapting Clean Water Act §303(d) Total Maximum Daily Loads (TMDLs) to Himalayan Lakes',
  equationDisplay: 'TMDL = Σ WLA (Point Sources / STPs) + Σ LA (Catchment & Houseboat Non-Point) + MOS (Margin of Safety)',
  explanation:
    'Today, regulators ask only whether an individual STP outfall meets a generic mg/L effluent concentration standard—ignoring that six STPs, unintercepted drains, Telbal agricultural silt and internal sediment release together overload the lake’s assimilative capacity. Under a Himalayan Lake TMDL statute, authorities must first calculate the maximum annual kilograms of phosphorus and nitrogen Dal, Nigeen or Anchar can receive without crossing eutrophic thresholds, and then legally allocate binding load reductions across every STP, drain and sub-catchment with an explicit Margin of Safety.',
  illustrativeLakes: [
    {
      lake: 'Dal Lake (Srinagar)',
      currentRegulatoryWeakness: 'Outfall-only concentration checks; +55 t P/yr net positive accumulation reconstructed in Dispatch 04 despite crores spent.',
      tmdlStatutoryShift: 'Binding basin-wide Total Phosphorus & Total Nitrogen annual cap allocating strict nutrient-removal upgrades across all 6 STPs, Telbal settling/catchment, and 100% houseboat/sewer interception.',
    },
    {
      lake: 'Nigeen Lake',
      currentRegulatoryWeakness: 'Treated via episodic surface de-weeding and civic cleanups while subsurface nutrient seepage and peripheral drains persist.',
      tmdlStatutoryShift: ' coupled hydraulic-nutrient load ceiling accounting for Dal–Nigeen exchange gates, Pokhribal outflow and perimeter sewer sealing.',
    },
    {
      lake: 'Anchar Lake',
      currentRegulatoryWeakness: 'Severe hypereutrophic siltation, hospital/municipal drainage via Sindh–Amir Khan Nallah links and marsh infill without a recovery budget.',
      tmdlStatutoryShift: 'Impaired-Waterbody Critical Classification triggering mandatory upstream STP interception, hospital effluent quarantine and phased ecological-character restoration.',
    },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// PART XI — PERMANENT KEW LEGAL OBSERVATORY (16 REGISTRIES + DOSSIER SCHEMA)
// ─────────────────────────────────────────────────────────────────────────────

export const KEW_LEGAL_OBSERVATORY_REGISTRIES_16: KewLegalObservatoryRegistrySpec[] = [
  { code: 'WHLEO-01', name: 'Environmental Legislation Registry', permanentFunction: 'Authenticated inventory of central, state/UT, AJ&K and Gilgit-Baltistan environmental acts, ordinances and subordinate rules.', evidentiaryStandard: 'Official gazette citations, commencement dates and dual-citation reconciliation notes (e.g., GB Act 2014/2015).', connectedKewHref: '/resources/environmental-pil/legal-framework', connectedKewLabel: 'PIL Legal Framework' },
  { code: 'WHLEO-02', name: 'Historical Amendment Archive', permanentFunction: 'Chronological tracking of statutory amendments, repeals, J&K Reorganisation Act 2019 transitions and rule replacements (e.g., SWM Rules 2016 → 2026).', evidentiaryStandard: 'Date-stamped comparative statutory diffs ensuring decisions are judged against the law in force at the time.', connectedKewHref: '/governance/legislation-enforcement-observatory#statutory-explorer', connectedKewLabel: 'Statutory Explorer' },
  { code: 'WHLEO-03', name: 'Jurisdiction and Applicability Engine', permanentFunction: 'Maps exact territorial applicability across Kashmir, Jammu, Ladakh, AJ&K and Gilgit-Baltistan without conflating distinct constitutional systems.', evidentiaryStandard: 'Explicit territorial extension schedules, LAHDC adaptations and AJ&K/GB constitutional applicability caveats.', connectedKewHref: '/governance/legislation-enforcement-observatory#four-frameworks', connectedKewLabel: '4-Framework Matrix' },
  { code: 'WHLEO-04', name: 'Environmental Case Law Registry', permanentFunction: 'Tracks Supreme Court, High Court (J&K and Ladakh, AJ&K), GB Chief Court and NGT judgments and operative environmental orders.', evidentiaryStandard: 'Verified docket numbers and certified order texts—strictly prohibiting fabricated CNR identifiers.', connectedKewHref: '/resources/environmental-pil', connectedKewLabel: 'KEW Environmental PIL Portal' },
  { code: 'WHLEO-05', name: 'Environmental Clearance Registry', permanentFunction: 'Indexes publicly accessible EIA/IEE appraisals, EC/NOC conditions, forest diversions and six-monthly post-clearance audits.', evidentiaryStandard: 'Official PARIVESH / SEIAA / EPA-AJK / GB-EPA clearance records and cluster-proximity checks.', connectedKewHref: '/sectoral-eia', connectedKewLabel: 'Sectoral EIA Hub' },
  { code: 'WHLEO-06', name: 'Regulatory Compliance Monitoring', permanentFunction: 'Monitors municipal STP performance, CTE/CTO adherence, solid-waste processing and statutory action-plan deadlines.', evidentiaryStandard: 'Separates GOVERNMENT_AFFIDAVIT_ONLY claims from JOINT_INSPECTION_CONFIRMED and SATELLITE_VERIFIED evidence.', connectedKewHref: '/resources/environmental-pil/compliance', connectedKewLabel: 'PIL Compliance Tracker' },
  { code: 'WHLEO-07', name: 'Environmental Violation Registry', permanentFunction: 'Documents official show-cause notices, closure directions, CAG audit findings and adjudicated breaches.', evidentiaryStandard: 'Strict legal distinction between unverified allegations/complaints and formally adjudicated violations.', connectedKewHref: '/environmental-investigations', connectedKewLabel: 'Investigations Archive' },
  { code: 'WHLEO-08', name: 'Satellite-Based Evidence Registry', permanentFunction: 'Pairs statutory buffer boundaries, mining leases, karewa scarps and wetland polygons with multi-temporal optical/SAR imagery.', evidentiaryStandard: 'Dated Sentinel/Landsat/DEM change layers with explicit spatial resolution and field-validation notes.', connectedKewHref: '/earth-human-impact/change-detection-observatory', connectedKewLabel: 'Change Detection Observatory' },
  { code: 'WHLEO-09', name: 'Environmental Compensation Registry', permanentFunction: 'Tracks Polluter-Pays fines, administrative penalties (Water Amendment 2024 / Jan Vishwas), CAMPA deposits and actual escrow utilization.', evidentiaryStandard: 'Tribunal penalty orders cross-checked against treasury transfers and physical site remediation.', connectedKewHref: '/resources/environmental-pil/judgments', connectedKewLabel: 'PIL Penalties & Orders' },
  { code: 'WHLEO-10', name: 'Legislative Gap Analysis', permanentFunction: 'Systematic diagnostic separating pure enforcement/infrastructure deficits from outdated standards and missing ecosystem statutes.', evidentiaryStandard: '15-sector Enforcement vs. Amendment vs. New Legislation triage protocol.', connectedKewHref: '/governance/legislation-enforcement-observatory#triage-workbench', connectedKewLabel: 'Diagnostic Triage' },
  { code: 'WHLEO-11', name: 'Proposed Legislative Reforms', permanentFunction: 'Houses the 15 Western Himalayan legislative & regulatory reform packages and Retain/Reset/Supplement matrix.', evidentiaryStandard: 'Explicitly badged as proposed analytical frameworks awaiting independent jurisdictional legal review.', connectedKewHref: '/governance/legislation-enforcement-observatory#reform-packages', connectedKewLabel: '15 Reform Packages' },
  { code: 'WHLEO-12', name: 'Public Interest Litigation Portal', permanentFunction: 'Citizen-facing litigation lifecycle guides, filing checklists, court jurisdictions and legal-aid directories.', evidentiaryStandard: 'Direct integration with KEW’s 26-case PIL Portal without duplicating case infrastructure.', connectedKewHref: '/resources/environmental-pil/file-pil', connectedKewLabel: 'PIL Filing & Legal Aid' },
  { code: 'WHLEO-13', name: 'Environmental Rights Education', permanentFunction: 'Plain-language guides on constitutional protections (India Arts. 21/48A/51A(g), Pakistan Art. 9A), RTI tools and clinical law-science literacy.', evidentiaryStandard: 'Multilingual educational briefs supporting campus clinics (e.g., KCEF Law College, KU, JU, AJ&K & GB universities).', connectedKewHref: '/research-library/environmental-research-observatory', connectedKewLabel: 'Research-to-Society Hub' },
  { code: 'WHLEO-14', name: 'Scientific Evidence Repository', permanentFunction: 'Links statutory standards directly to peer-reviewed hydrology, limnology, glaciology, airshed and biodiversity datasets.', evidentiaryStandard: 'DOI-verified studies, NABL lab methods and calibrated monitoring protocols.', connectedKewHref: '/resources/environmental-pil/scientific-evidence', connectedKewLabel: 'PIL Scientific Evidence' },
  { code: 'WHLEO-15', name: 'Government Action-Taken Registry', permanentFunction: 'Archives official compliance affidavits, CAG audit responses, VNR disclosures, notifications and right-of-reply submissions.', evidentiaryStandard: 'Verbatim institutional responses logged alongside independent verification status.', connectedKewHref: '/governance/environmental-accountability-observatory', connectedKewLabel: 'Accountability Observatory' },
  { code: 'WHLEO-16', name: 'Environmental Restoration Outcomes', permanentFunction: 'Evaluates every statute, court order and conservation budget against measurable multiyear biophysical recovery.', evidentiaryStandard: 'Dissolved oxygen, nutrient budgets, e-flow discharge, canopy survival, wetland area and species persistence.', connectedKewHref: '/water-systems/lakes/dal-lake/conservation-performance', connectedKewLabel: 'Dal Lake Performance Hub' },
];

export const INDIVIDUAL_STATUTORY_DOSSIER_FIELDS_10: string[] = [
  '01. Official Short Title, Act/Notification Number & Authenticated Gazette Citation',
  '02. Original Legislative Purpose & Historical Context of Enactment',
  '03. Commencement Date & Chronological Amendment / Repeal History',
  '04. Exact Geographical Applicability Across the Five Regions (Including 2019 Reorganisation / AJ&K / GB Rules)',
  '05. Designated Implementing & Licensing Authorities',
  '06. Coercive Enforcement Powers, Inspection Procedures & Penalty Provisions',
  '07. Mandatory Statutory Deadlines, Monitoring & Public Disclosure Duties',
  '08. Landmark Judicial & Tribunal Interpretations',
  '09. Documented Ground-Level Noncompliance, Audit Findings & Infrastructure Bottlenecks',
  '10. Recommended Action (Enforce Existing Law / Targeted Amendment / Ecosystem-Specific Supplement)',
];

// ─────────────────────────────────────────────────────────────────────────────
// PART XII — PRIMARY LEGAL REPOSITORIES (14 CLEAN OFFICIAL URLS)
// ─────────────────────────────────────────────────────────────────────────────

export const PRIMARY_LEGAL_REPOSITORIES_14: Array<{
  repository: string;
  domainLabel: string;
  url: string;
  jurisdictionScope: string;
}> = [
  { repository: 'India Code (Digital Repository of All Central & State Acts)', domainLabel: 'indiacode.nic.in', url: 'https://www.indiacode.nic.in/', jurisdictionScope: 'India Central, J&K & Ladakh' },
  { repository: 'Ministry of Environment, Forest and Climate Change (MoEFCC)', domainLabel: 'moef.gov.in', url: 'https://moef.gov.in/', jurisdictionScope: 'India Rules, Notifications & ESZs' },
  { repository: 'J&K Department of Law, Justice and Parliamentary Affairs', domainLabel: 'law.jk.gov.in', url: 'https://law.jk.gov.in/', jurisdictionScope: 'UT of Jammu & Kashmir Statutes & Rules' },
  { repository: 'UT Administration of Ladakh Official Portal', domainLabel: 'ladakh.gov.in', url: 'https://ladakh.gov.in/', jurisdictionScope: 'UT of Ladakh Notifications & Orders' },
  { repository: 'National Green Tribunal (NGT)', domainLabel: 'greentribunal.gov.in', url: 'https://greentribunal.gov.in/', jurisdictionScope: 'Environmental Adjudication (J&K & Ladakh)' },
  { repository: 'Supreme Court of India', domainLabel: 'sci.gov.in', url: 'https://www.sci.gov.in/', jurisdictionScope: 'Constitutional & Appellate Jurisprudence' },
  { repository: 'Comptroller and Auditor General of India (CAG)', domainLabel: 'cag.gov.in', url: 'https://cag.gov.in/', jurisdictionScope: 'Performance & Compliance Audits (incl. Report 4 of 2025)' },
  { repository: 'AJ&K Law, Justice, Parliamentary Affairs & Human Rights Dept.', domainLabel: 'law.gok.pk', url: 'https://law.gok.pk/', jurisdictionScope: 'Azad Jammu & Kashmir Statutes' },
  { repository: 'AJ&K Environmental Protection Agency (EPA-AJK)', domainLabel: 'epaajk.gok.pk', url: 'https://www.epaajk.gok.pk/', jurisdictionScope: 'AJ&K Environmental Act 2000 & IEE/EIA Rules' },
  { repository: 'High Court of Azad Jammu & Kashmir', domainLabel: 'ajkhighcourt.gok.pk', url: 'https://ajkhighcourt.gok.pk/', jurisdictionScope: 'AJ&K Constitutional & Environmental Rulings' },
  { repository: 'Gilgit-Baltistan Assembly — Acts Register', domainLabel: 'gba.gov.pk', url: 'https://gba.gov.pk/acts/', jurisdictionScope: 'Gilgit-Baltistan Enacted Legislation (incl. Act VI of 2015)' },
  { repository: 'Gilgit-Baltistan Environmental Protection Agency (GB-EPA)', domainLabel: 'gbepa.gog.pk', url: 'https://gbepa.gog.pk/legislation/', jurisdictionScope: 'GB Environmental Protection Act (2014/2015) & Rules' },
  { repository: 'Auditor General of Pakistan', domainLabel: 'agp.gov.pk', url: 'https://www.agp.gov.pk/', jurisdictionScope: 'Public Sector & Environmental Audit Reports' },
  { repository: 'FAO Legal Database (FAOLEX)', domainLabel: 'fao.org/faolex', url: 'https://www.fao.org/faolex/', jurisdictionScope: 'International Comparative & Regional Texts (incl. GB Forest Act 2019)' },
];

// ─────────────────────────────────────────────────────────────────────────────
// PART XII — COMPLETE 20-VOLUME, 100-CHAPTER MONOGRAPH ARCHITECTURE
// ─────────────────────────────────────────────────────────────────────────────

export const ENVIRONMENTAL_LAW_VOLUMES_20: LegalMonographVolumeSpec[] = [
  { volumeRoman: 'I', volumeNumber: 1, investigationTitle: 'Historical evolution of Western Himalayan environmental jurisprudence', chapterRange: '01–05', jurisdictionalAndAnalyticalScope: 'Pre-colonial customary commons (mirab/kuhl, kahcharai, shamilat), Dogra/colonial forestry codification (1927/1930), post-1972 environmental statutes, and post-2019 jurisdictional restructuring.' },
  { volumeRoman: 'II', volumeNumber: 2, investigationTitle: 'Constitutional environmental rights and responsibilities', chapterRange: '06–10', jurisdictionalAndAnalyticalScope: 'Indian Articles 21, 48A, 51A(g), 32 & 226; Supreme Court M.K. Ranjitsinh (2024); Pakistan Article 9A (2024); and distinct constitutional applicability in AJ&K and Gilgit-Baltistan.' },
  { volumeRoman: 'III', volumeNumber: 3, investigationTitle: 'Complete environmental legislation inventory', chapterRange: '11–15', jurisdictionalAndAnalyticalScope: 'Cross-jurisdictional statutory census, gazette verification, dual-citation reconciliation (GB 2014/2015), subordinate rules (SWM 2026, C&D 2025, Audit 2025), and temporal law-in-force methodology.' },
  { volumeRoman: 'IV', volumeNumber: 4, investigationTitle: "Jammu and Kashmir's environmental legal framework", chapterRange: '16–20', jurisdictionalAndAnalyticalScope: 'Central acts extended after October 2019, continuing regional land/water/development statutes, J&K PCC/SEIAA/LCMA mandates, and the 22-year lake law vacuum.' },
  { volumeRoman: 'V', volumeNumber: 5, investigationTitle: "Ladakh's environmental legal framework", chapterRange: '21–25', jurisdictionalAndAnalyticalScope: 'UT Ladakh regulatory governance, LAHDC Act 1997 natural-resource powers, NGT 2025 12.33 MLD sewage gap, cold-desert tourism waste, and Sixth Schedule / ecological safeguard debates.' },
  { volumeRoman: 'VI', volumeNumber: 6, investigationTitle: "Azad Jammu & Kashmir's environmental legal framework", chapterRange: '26–30', jurisdictionalAndAnalyticalScope: 'AJ&K Environmental Protection Act 2000 at 26 years, IEE/EIA Regulations 2009, 1930 Forest Regulation continuity, Wildlife Act 2014, and Neelum–Jhelum e-flow jurisprudence.' },
  { volumeRoman: 'VII', volumeNumber: 7, investigationTitle: "Gilgit-Baltistan's environmental legal framework", chapterRange: '31–35', jurisdictionalAndAnalyticalScope: 'GB EPA 2014/2015 (Act VI of 2015), GB Forest Act 2019 glacier/wetland/ecosystem-service innovations, 1975 Wildlife Act review, 2026 placer gold noncompliance, and 2026 EPA reform consultancy.' },
  { volumeRoman: 'VIII', volumeNumber: 8, investigationTitle: 'Air pollution legislation and atmospheric governance', chapterRange: '36–40', jurisdictionalAndAnalyticalScope: 'Air Act 1981, NAAQS, brick-kiln regulations, enclosed-valley winter inversion physics, sensor calibration standards, and regional airshed / transboundary governance.' },
  { volumeRoman: 'IX', volumeNumber: 9, investigationTitle: 'Water pollution, lakes and wetland legislation', chapterRange: '41–45', jurisdictionalAndAnalyticalScope: 'Water Act 1974 (and 2024 Amendment), Wetlands Rules 2017, CAG Report No. 4 of 2025 (697 → 518 lakes; 50/63 sewage), unnotified <2.25 ha nambals, and Lake TMDL design.' },
  { volumeRoman: 'X', volumeNumber: 10, investigationTitle: 'Forest, wildlife and biodiversity legislation', chapterRange: '46–50', jurisdictionalAndAnalyticalScope: 'IFA 1927, Van Adhiniyam 2023 border-zone exemptions, Forest Rights Act 2006, WLPA 1972, AJ&K 2014 & GB 2019 Acts, Central Asian Flyway connectivity, and biodiversity registers.' },
  { volumeRoman: 'XI', volumeNumber: 11, investigationTitle: 'Mining, geological heritage and land-use legislation', chapterRange: '51–55', jurisdictionalAndAnalyticalScope: 'MMDR 1957, minor-mineral cluster splitting, riverbed cobble incision, GB placer mining, Plio-Pleistocene Karewa legal invisibility, and floodplain/agricultural land conversion.' },
  { volumeRoman: 'XII', volumeNumber: 12, investigationTitle: 'Environmental impact assessment and infrastructure approvals', chapterRange: '56–60', jurisdictionalAndAnalyticalScope: 'EIA Notification 2006, AJ&K 2009 & GB IEE/EIA regimes, proponent-paid consultant conflicts, highway/hydropower salami-slicing, public hearings, and mandatory basin CEIA.' },
  { volumeRoman: 'XIII', volumeNumber: 13, investigationTitle: 'Climate change, glaciers and disaster legislation', chapterRange: '61–65', jurisdictionalAndAnalyticalScope: 'Disaster Management Acts (India 2005, GB 2017, AJ&K), cryosphere/permafrost legal gaps, GLOF early warning, climate attribution in court, and slow-onset ecological emergencies.' },
  { volumeRoman: 'XIV', volumeNumber: 14, investigationTitle: 'Tourism, pilgrimage and ecological carrying capacity', chapterRange: '66–70', jurisdictionalAndAnalyticalScope: 'Tourism and development-authority statutes, sub-zero sewage/waste bottlenecks, alpine meadow & high-lake protection, and non-discriminatory carrying-capacity law.' },
  { volumeRoman: 'XV', volumeNumber: 15, investigationTitle: 'Environmental enforcement, penalties and institutional capacity', chapterRange: '71–75', jurisdictionalAndAnalyticalScope: 'PCC/EPA staffing and NABL lab deficits, state-policing-state conflicts, Jan Vishwas civil penalties, Polluter-Pays fiscal circularity, and restoration performance bonds.' },
  { volumeRoman: 'XVI', volumeNumber: 16, investigationTitle: 'Environmental litigation and judicial interventions', chapterRange: '76–80', jurisdictionalAndAnalyticalScope: '40-year docket review across High Courts, NGT Principal Bench and Supreme Courts; 700 km access barriers; KCEF–JKCAG clinical literacy; and ex-post vs. ex-ante temporal asymmetry.' },
  { volumeRoman: 'XVII', volumeNumber: 17, investigationTitle: 'Legislative intentions versus measurable ecological outcomes', chapterRange: '81–85', jurisdictionalAndAnalyticalScope: 'Forensic comparison of statutory preambles and court affidavits against satellite change detection, DO/BOD/TP water series, thalweg incision, and forest canopy indicators.' },
  { volumeRoman: 'XVIII', volumeNumber: 18, investigationTitle: 'United States, European and international legal comparisons', chapterRange: '86–90', jurisdictionalAndAnalyticalScope: 'Comparative analysis of US CWA (§§303(d) TMDLs, 404), CAA, NEPA, ESA, CERCLA, EU WFD/Habitats/Nature Restoration Regulation, Aarhus, Ramsar, CMS, CBD and Paris Agreement.' },
  { volumeRoman: 'XIX', volumeNumber: 19, investigationTitle: 'Fifteen proposed environmental legislative reform packages', chapterRange: '91–95', jurisdictionalAndAnalyticalScope: 'Detailed statutory design, enabling hooks, scientific thresholds and Retain/Reset/Supplement triage across all 15 Western Himalayan reform packages.' },
  { volumeRoman: 'XX', volumeNumber: 20, investigationTitle: 'Western Himalayan Environmental Legislative Agenda 2027–2035', chapterRange: '96–100', jurisdictionalAndAnalyticalScope: 'Jurisdiction-specific adoption pathways, KEW 16-registry Legal Observatory blueprint, independent bar/jurist review protocol, and 2027–2035 implementation milestones.' },
];

const RAW_100_LEGAL_CHAPTERS: Array<{
  num: string;
  volIdx: number;
  title: string;
  focus: string;
  methods: string;
}> = [
  // VOLUME I (01–05)
  { num: '01', volIdx: 0, title: 'Customary Commons, Kuhls and Sacred Groves Before Modern Statutes', focus: 'Traces pre-statutory Himalayan water-sharing (mirab), grazing commons (kahcharai/shamilat) and Nund Rishi conservation norms.', methods: 'Historical revenue codes (wajib-ul-arz), archival gazetteers and legal-history synthesis.' },
  { num: '02', volIdx: 0, title: 'Colonial and Princely Forestry Codification (1927–1947)', focus: 'Examines how the Indian Forest Act 1927 and J&K Forest Regulation 1930 prioritized timber revenue and sovereign control over watershed ecology.', methods: 'Archival statutory comparison of 1927 and 1930 forestry enactments.' },
  { num: '03', volIdx: 0, title: 'Stockholm to Bhopal: Rise of the Modern Pollution-Control State (1972–1991)', focus: 'Analyses the enactment of WLPA 1972, Water Act 1974, Northern Areas Wildlife Act 1975, FCA 1980, Air Act 1981 and EPA 1986.', methods: 'Parliamentary debates, statutory preambles and institutional history.' },
  { num: '04', volIdx: 0, title: 'Decentralization, Tribunals and Regional Statutes (1997–2018)', focus: 'Reviews LAHDC Act 1997, AJ&K EPA 2000, Biodiversity Act 2002, EIA 2006, NGT Act 2010 and GB EPA 2014/2015.', methods: 'Comparative legislative timeline across four regional frameworks.' },
  { num: '05', volIdx: 0, title: '2019 and Beyond: Reorganisation, Penalty Shifts and Temporal Accountability', focus: 'Establishes methodological rules for auditing pre-2019 state-law decisions separately from post-2019 UT and contemporary statutory regimes.', methods: 'J&K Reorganisation Act 2019 adaptation orders & inter-temporal legal analysis.' },

  // VOLUME II (06–10)
  { num: '06', volIdx: 1, title: 'Article 21 and the Judicial Construction of Environmental Rights in India', focus: 'Examines how Supreme Court jurisprudence wove Articles 48A and 51A(g) into enforceable right-to-life environmental guarantees.', methods: 'Doctrinal analysis of Supreme Court and J&K High Court constitutional rulings.' },
  { num: '07', volIdx: 1, title: 'M.K. Ranjitsinh (2024): Constitutional Protection Against Adverse Climate Effects', focus: 'Analyses the 2024 Supreme Court recognition of climate rights under Articles 14 and 21 and its implications for Himalayan infrastructure.', methods: 'Case analysis of 2024 SC judgment and habitat-versus-infrastructure balancing.' },
  { num: '08', volIdx: 1, title: 'Pakistan’s Article 9A (2024) and Separate Constitutional Architecture in AJ&K and GB', focus: 'Examines Pakistan’s express right to a clean, healthy and sustainable environment alongside the distinct constitutional instruments governing AJ&K and Gilgit-Baltistan.', methods: 'Comparative constitutional analysis of 26th Amendment Art. 9A, AJ&K Interim Constitution & GB Governance Orders.' },
  { num: '09', volIdx: 1, title: 'Public Trust Doctrine, Precautionary Principle and Intergenerational Equity', focus: 'Tests whether foundational judicial doctrines operate ex-ante in Himalayan permitting or only ex-post after damage occurs.', methods: 'Review of regional High Court and tribunal invocations of Public Trust.' },
  { num: '10', volIdx: 1, title: 'Article 51A(g) and Civic Duty: Why Constitutional Ideals Require Institutional Machinery', focus: 'Explores the gap between lofty constitutional rights/duties and district-level laboratory, sewage and policing capacity.', methods: 'Constitutional-sociological and administrative-capacity assessment.' },

  // VOLUME III (11–15)
  { num: '11', volIdx: 2, title: 'Methodology for a Five-Region Environmental Statutory Census', focus: 'Defines inclusion rules across primary acts, ordinances, subordinate rules, quality standards and planning laws.', methods: 'Legal informatics schema across 14 official repositories.' },
  { num: '12', volIdx: 2, title: 'Parent Acts vs. Subordinate Rules: Where Practical Obligations Actually Live', focus: 'Demonstrates why day-to-day compliance hinges on rules, schedules and notifications rather than bare parent statutes.', methods: 'Section-to-rule mapping across EPA 1986, AJ&K EPA 2000 and GB EPA 2014/2015.' },
  { num: '13', volIdx: 2, title: 'Tracking 2023–2026 Regulatory Updates: SWM 2026, C&D 2025 and Environment Audit 2025', focus: 'Audits India’s Solid Waste Management Rules 2026 (in force April 1, 2026), C&D Waste Rules 2025, Audit Rules 2025 and Green Credit Rules 2023.', methods: 'Gazette notification comparison (2016 vs. 2026 SWM obligations).' },
  { num: '14', volIdx: 2, title: 'Statutory Documentation Anomalies: Reconciling GB’s 2014 / 2015 EPA Citations', focus: 'Documents the divergence between the GB Assembly register (Act VI of 2015) and short-title/agency 2014 citations.', methods: 'Primary legislative register and gazette provenance verification protocol.' },
  { num: '15', volIdx: 2, title: 'Unverified Subordinate Rules and Gazette Blind Spots Across Five Regions', focus: 'Catalogues remaining verification gaps in municipal bye-laws, territorial adaptations and unindexed notifications.', methods: 'Archival completeness matrix and legal-review checklist.' },

  // VOLUME IV (16–20)
  { num: '16', volIdx: 3, title: 'The Post-2019 Statutory Transition in Jammu and Kashmir', focus: 'Maps repealed state laws, retained regional acts and newly extended central environmental statutes across J&K.', methods: 'law.jk.gov.in statutory directory & Reorganisation Adaptation Orders.' },
  { num: '17', volIdx: 3, title: 'Spatial Planning, Revenue Law and Environmental Loss by Permit', focus: 'Analyses how J&K Development Act 1970, Building Operations Act 1988, Land Revenue Act and Ribbon Development Act 2007 shape ground ecology.', methods: 'Master-plan zoning vs. satellite land-cover conversion audit.' },
  { num: '18', volIdx: 3, title: 'Twenty-Two Years Unapproved: CAG Report No. 4 of 2025 and the Missing Lake Act', focus: 'Forensic reconstruction of the April 2000 draft lake bill still unapproved at the March 2022 audit cutoff across 9 overlapping agencies.', methods: 'CAG Report No. 4 of 2025 Ch. II Sec. 2.4–2.5 documentary analysis.' },
  { num: '19', volIdx: 3, title: 'Institutional Architecture of J&K PCC, UT SEIAA, LCMA and WUCMA', focus: 'Evaluates mandate overlaps, scientific staffing, NABL lab throughput and enforcement independence.', methods: 'Annual administrative reports, RTI disclosures and CAG institutional findings.' },
  { num: '20', volIdx: 3, title: 'Jammu Division Specifics: Tawi Urban Pressures, Shiwalik Forests and Industrial Estates', focus: 'Examines riverfront modifications, brick kilns, industrial effluents and forest diversion across Jammu districts.', methods: 'Regional case-docket and J&K PCC consent/compliance review.' },

  // VOLUME V (21–25)
  { num: '21', volIdx: 4, title: 'Environmental Governance in a Cold-Desert Union Territory', focus: 'Maps central environmental laws alongside UT Ladakh administrative notifications and LAHDC Leh/Kargil mandates.', methods: 'ladakh.gov.in notifications & LAHDC Act 1997 statutory analysis.' },
  { num: '22', volIdx: 4, title: '12.33 MLD in Sub-Zero Climates: Ladakh’s 2025 NGT Sewage Deficit', focus: 'Analyses the September 2025 NGT compliance record reporting 5.69 MLD (Leh) and 6.64 MLD (Kargil) sewage gaps.', methods: 'NGT order sheets & cold-region wastewater engineering constraints.' },
  { num: '23', volIdx: 4, title: 'High-Altitude Wetlands and Changthang Pastures: Tso Kar, Tsomoriri and Pangong', focus: 'Evaluates Ramsar protection, unregulated vehicle tracks, camp waste and pastoral-wildlife governance.', methods: 'Wetlands Rules 2017, WLPA 1972 & High Court PIL docket review.' },
  { num: '24', volIdx: 4, title: 'Solar Parks, Transmission Corridors and Border Infrastructure in Ladakh', focus: 'Examines land allocation, FCA 2023 border exemptions and fragile desert-steppe habitat safeguards.', methods: 'Land-allotment and environmental-appraisal policy review.' },
  { num: '25', volIdx: 4, title: 'Implementing Solid Waste Management Rules, 2026 in Leh, Kargil and Trekking Zones', focus: 'Assesses seasonal tourist waste spikes, legacy dumpsites and 2026 administrative compliance reviews.', methods: 'UT Ladakh waste-compliance proceedings & bulk-generator rules.' },

  // VOLUME VI (26–30)
  { num: '26', volIdx: 5, title: 'The AJ&K Environmental Protection Act, 2000 at Twenty-Six', focus: 'Section-by-section evaluation of Act IV of 2000 against modern climate, e-flow and cumulative-impact science.', methods: 'epaajk.gok.pk statutory text & comparative legislative audit.' },
  { num: '27', volIdx: 5, title: 'IEE/EIA Regulations 2009 and Laboratory Certification Rules in AJ&K', focus: 'Assesses project screening thresholds, public hearing procedures and analytical testing capacity.', methods: 'AJ&K 2009 subordinate regulations & NOC clearance workflow review.' },
  { num: '28', volIdx: 5, title: 'Neelum–Jhelum Hydroelectric Project: Official VNR, World Bank and High Court Record', focus: 'Examines reduced Muzaffarabad river flows, drinking-water scarcity and post-hoc e-flow litigation.', methods: '2019 AJ&K Voluntary National Review, World Bank review & AJ&K High Court record.' },
  { num: '29', volIdx: 5, title: 'Historical Forestry Laws in AJ&K: 1930 Regulation, Timber Sales and 1985 Corporation Act', focus: 'Reviews century-old forestry regulations alongside contemporary slope stability and community forest dependence.', methods: 'Historical statute continuity check via law.gok.pk.' },
  { num: '30', volIdx: 5, title: 'AJ&K Wildlife Act 2014, Machiara/Musk Deer Parks and Transboundary Corridors', focus: 'Evaluates habitat protection, community conservation clauses and cross-LoC ecological connectivity.', methods: 'AJ&K Wildlife Act 2014 & protected-area management analysis.' },

  // VOLUME VII (31–35)
  { num: '31', volIdx: 6, title: 'Architecture of the Gilgit-Baltistan Environmental Protection Act (2014/2015)', focus: 'Examines pollution prohibitions, GB-EQS, IEE/EIA mandates and tribunal provisions under GB’s principal statute.', methods: 'gba.gov.pk & gbepa.gog.pk statutory analysis.' },
  { num: '32', volIdx: 6, title: 'A Regional Benchmark: Ecosystem Scope of the Gilgit-Baltistan Forest Act, 2019', focus: 'Highlights statutory inclusion of rangelands, wetlands, riverbeds, glaciers, ecosystem-service valuation and climate management.', methods: 'FAOLEX text analysis of GB Forest Act 2019 & 2020 Amendment.' },
  { num: '33', volIdx: 6, title: 'Placer Gold Mining Along Northern Rivers: August 2026 Compliance Concerns', focus: 'Investigates GB-EPA’s documented waste and compliance concerns in placer gold extraction—testing enforcement vs. statutory authority.', methods: 'August 2026 Dawn disclosures, GB-EPA statutory powers & mining rules.' },
  { num: '34', volIdx: 6, title: 'Updating the 1975 Northern Areas Wildlife Act and Trophy-Hunting Governance', focus: 'Evaluates half-century-old wildlife provisions alongside community Markhor/Ibex conservation and snow-leopard conflict.', methods: '1975 Act review & community-conservation benefit-sharing audit.' },
  { num: '35', volIdx: 6, title: 'The 2026 GB-EPA Legislative Review: Opportunity for Cryosphere and Tourism Reform', focus: 'Develops technical inputs for GB’s announced 2026 review of its EPA and subordinate rules (industrial, BTS, tourism).', methods: '2026 consultancy scope analysis & comparative mountain-law design.' },

  // VOLUME VIII (36–40)
  { num: '36', volIdx: 7, title: 'Why Point-Source Air Laws Struggle in Enclosed Himalayan Valleys', focus: 'Contrasts stack-based Air Act 1981 rules with winter katabatic pooling and shallow boundary-layer inversions.', methods: 'Coupled atmospheric physics (Monograph 01) & Air Act statutory review.' },
  { num: '37', volIdx: 7, title: 'Brick Kilns, Cement Plants, Stone Crushers and Biomass Heating Regulations', focus: 'Audits siting, zig-zag conversion, dust suppression and winter fuel rules across J&K, AJ&K and GB.', methods: 'Brick Kilns Act 2010 / Rules 2017 & consent-condition audit.' },
  { num: '38', volIdx: 7, title: 'Legal Standards for Air-Quality Monitoring, Calibration and Public AQI Reporting', focus: 'Addresses legal silence on uncalibrated optical sensors, humidity bias and transparent uncertainty reporting.', methods: 'NAAQS measurement notifications vs. WMO/reference-grade protocols.' },
  { num: '39', volIdx: 7, title: 'Designing Statutory Regional Airshed Action Plans for Himalayan Basins', focus: 'Translates US Clean Air Act SIP and NCAP lessons into enforceable valley-wide emission budgets.', methods: 'Comparative airshed law & source-apportionment governance.' },
  { num: '40', volIdx: 7, title: 'Sovereignty and Transboundary Aerosols: Cooperative Scientific Arrangements', focus: 'Clarifies why municipal/UT regulators cannot enforce laws across borders and designs national/WMO data-sharing protocols.', methods: 'International atmospheric law & South Asian cooperative frameworks.' },

  // VOLUME IX (41–45)
  { num: '41', volIdx: 8, title: 'Fifty-Two Years of the Water Act, 1974: Outfall Standards vs. Dying Lakes', focus: 'Explains why regulating individual STP mg/L concentrations failed to halt net phosphorus accumulation in Dal Lake.', methods: 'Water Act §§24, 33A, 48 & Dispatch 04 mass-balance coupling.' },
  { num: '42', volIdx: 8, title: 'Anatomy of 518 Lost or Shrunken Lakes: Legal Lessons from CAG Report No. 4 of 2025', focus: 'Examines historical audit evidence across 697 inventoried and 63 sampled lakes (50 receiving untreated sewage).', methods: 'CAG 2025 performance audit & historical revenue/wetland record analysis.' },
  { num: '43', volIdx: 8, title: 'Orphans of Rule 4: Unnotified Sub-2.25-Hectare Village Nambals and Retention Marshes', focus: 'Investigates how size thresholds and missing digital brief documents under Wetlands Rules 2017 enable incremental infill.', methods: 'Wetlands Rules 2017 text vs. multi-decadal Kashmir marsh inventory.' },
  { num: '44', volIdx: 8, title: 'Protecting Ecological Character: Why Shallow Marshes Must Not Be Dredged into Deep Ponds', focus: 'Establishes Ramsar-aligned legal safeguards preventing destructive "beautification" dredging of reedbeds and waterbird habitats.', methods: 'Ramsar wise-use jurisprudence & wetland restoration science.' },
  { num: '45', volIdx: 8, title: 'Statutory Total Maximum Daily Loads (TMDLs) for Dal, Nigeen, Anchar and Wular', focus: 'Drafts the scientific-legal formula for binding lake-wide nutrient and sediment load allocations.', methods: 'US CWA §303(d) adaptation & Himalayan lacustrine modelling.' },

  // VOLUME X (46–50)
  { num: '46', volIdx: 9, title: 'Forest Diversion Law in Frontier Mountains: Van Adhiniyam 2023 and the 100-km Clause', focus: 'Evaluates ecological implications of border-corridor exemptions and narrowed unrecorded-forest definitions across J&K and Ladakh.', methods: '1980 Act, Godavarman jurisprudence & 2023 Amendment textual analysis.' },
  { num: '47', volIdx: 9, title: 'Forest Rights Act, 2006 and Pastoralist Commons: Gujjar, Bakarwal, Gaddi and Changpa Rights', focus: 'Examines individual/community forest rights, seasonal transhumance corridors and conservation co-responsibility.', methods: 'FRA 2006 statutory provisions & regional pastoralist tenure review.' },
  { num: '48', volIdx: 9, title: 'Occupational Safety and Legal Backing for Frontline Forest Personnel', focus: 'Connects Dispatch 01 (The Price of Protecting Paradise) to statutory enforcement powers, legal defence and family compensation rules.', methods: 'Forest guard service rules, criminal-procedure protections & KEW Martyrs archive.' },
  { num: '49', volIdx: 9, title: 'Beyond Park Boundaries: Legal Protection for Central Asian Flyway and Ungulate Corridors', focus: 'Links Monograph 05 (The Sky Has No Borders) to legal safeguards for migratory stopovers, shingle bars and Hangul/Markhor corridors.', methods: 'WLPA 1972, AJ&K 2014 Act, CMS treaty & corridor GIS overlays.' },
  { num: '50', volIdx: 9, title: 'Operationalizing the Biological Diversity Act: BMCs, eDNA and Agro-Biodiversity', focus: 'Assesses People’s Biodiversity Registers and protection of heritage cultivars (saffron, ambri apple, mushkbudji, buckwheats).', methods: 'Biodiversity Act 2002 / amendments & regional BMC audit.' },

  // VOLUME XI (51–55)
  { num: '51', volIdx: 10, title: 'Riverbed Mining Law vs. Fluvial Physics: DSRs, Sub-5-Hectare Leases and Knickpoints', focus: 'Audits minor-mineral leasing against Supreme Court Deepak Kumar, EMGSM 2020 and snowmelt sediment-replenishment science.', methods: 'Minor Mineral Rules, NGT dockets & fluvial geomorphic literature.' },
  { num: '52', volIdx: 10, title: 'The Legal Erasure of Kashmir’s Karewas: Why Four-Million-Year Plateaus Lack a Name in Law', focus: 'Documents how Plio-Pleistocene loess-palaeosol tablelands are excavated as ordinary embankment clay and designs geoconservation law.', methods: 'Revenue/mining classification audit, OA 174/2020 & stratigraphic heritage criteria.' },
  { num: '53', volIdx: 10, title: 'Springshed Recharge Zones: Legal Vacuum Above Three Thousand Himalayan Nags', focus: 'Examines unregulated limestone quarrying, road blasting and septic contamination upslope of perennial karst springs.', methods: 'Isotopic recharge science (Jeelani et al.) vs. mining/water statutory gaps.' },
  { num: '54', volIdx: 10, title: 'Floodplain Encroachment and Ribbon Real Estate Across Valley Floors', focus: 'Analyses legal failure to preserve Jhelum/Tawi spill channels and irrigated paddy flood-retention lands.', methods: 'Water Resources Act 2010, Ribbon Development Act 2007 & Agrarian Reforms review.' },
  { num: '55', volIdx: 10, title: 'Construction & Demolition Waste Rules, 2025: Turning Highway Muck from River Poison to Substitute Fill', focus: 'Evaluates enforcement of 2025 C&D rules to stop gorge dumping and replace karewa clay extraction.', methods: '2025 C&D Rules & NH-44 / tunnel muck-disposal case audits.' },

  // VOLUME XII (56–60)
  { num: '56', volIdx: 11, title: 'Twenty Years of EIA Notification, 2006 in the Western Himalayas', focus: 'Evaluates screening categories, B1/B2 thresholds and linear-project exemptions in fragile mountain terrain.', methods: 'EIA 2006 schedule & subsequent MoEFCC office-memorandum review.' },
  { num: '57', volIdx: 11, title: 'Comparative Appraisal of IEE and EIA Regimes in AJ&K and Gilgit-Baltistan', focus: 'Compares project-categorization schedules, review timelines and NOC conditions in AJ&K (2009) and GB.', methods: 'Comparative regulatory matrix across UT SEIAA, EPA-AJK and GB-EPA.' },
  { num: '58', volIdx: 11, title: 'The Proponent-Paid Consultant Problem: Designing Blind-Escrow Appraisal', focus: 'Examines structural conflict of interest in EIA authorship and models independent escrow commissioning.', methods: 'Institutional incentives analysis & Environment Audit Rules 2025 review.' },
  { num: '59', volIdx: 11, title: 'Public Hearings in Mountain Districts: Language, Timing and Genuine Consent', focus: 'Audits accessibility of English-only technical EIAs for Kashmiri, Dogri, Ladakhi, Gojri, Pahari, Shina and Balti communities.', methods: 'Aarhus Pillar II benchmark vs. regional public-hearing records.' },
  { num: '60', volIdx: 11, title: 'Post-Clearance Amnesia: Six-Monthly Compliance Reports vs. Satellite Reality', focus: 'Investigates why conditional EC approvals rarely face revocation despite documented slope and muck breaches.', methods: 'PARIVESH / NOC condition tracking & satellite audit pairing.' },

  // VOLUME XIII (61–65)
  { num: '61', volIdx: 12, title: 'Glaciers Without a Statute: Legal Status of the Himalayan Cryosphere', focus: 'Compares GB Forest Act 2019 glacier inclusion against statutory silence across neighbouring jurisdictions.', methods: 'Five-region cryosphere legal gap mapping.' },
  { num: '62', volIdx: 12, title: 'GLOF Early Warning, Moraine Engineering and Downstream Liability Law', focus: 'Examines statutory duties of hydropower operators, road agencies and disaster authorities below glacial lakes.', methods: 'NDMA/GB-DMA guidelines, Disaster Management Acts & tort/public-law liability.' },
  { num: '63', volIdx: 12, title: 'Permafrost Thaw, High-Pass Roads and Climate-Adjusted Design Codes', focus: 'Evaluates whether existing IRC/building standards mandate forward-looking climate stress tests.', methods: 'Engineering code review across Zojila, Khardung La, Karakoram & Pir Panjal.' },
  { num: '64', volIdx: 12, title: 'Disaster Management Acts (2005 / 2017): From Post-Flood Relief to Pre-Disaster Land-Use Restraint', focus: 'Analyses preventive mitigation powers (e.g., DMA 2005 §§11, 23, 30) that remain underutilized against floodplain infill.', methods: '2014 Kashmir flood lessons & statutory disaster-mitigation audit.' },
  { num: '65', volIdx: 12, title: 'Codifying Slow-Onset and Acute Ecological Emergencies', focus: 'Designs legal triggers for lake anoxia, toxic blooms, extreme winter smog, slope creep and wildlife die-offs.', methods: 'Section 31 Mountain Environmental Emergency Management Framework design.' },

  // VOLUME XIV (66–70)
  { num: '66', volIdx: 13, title: 'Master Plans in Eco-Fragile Resorts: Gulmarg, Pahalgam, Sonamarg and Patnitop', focus: 'Reviews High Court PIL oversight of hotel concretization, lease renewals and greenbelt violations.', methods: 'Development Authority master plans & KEW PIL dockets (kew-case-007, 016).' },
  { num: '67', volIdx: 13, title: 'Cold-Desert and Karakoram Tourism Booms: Leh, Nubra, Pangong, Hunza and Skardu', focus: 'Examines groundwater borewells, winter septic failure, off-road driving and expedition waste rules.', methods: 'Ladakh & GB tourism/municipal regulations vs. visitor-surge metrics.' },
  { num: '68', volIdx: 13, title: 'Sacred Geography and Proportionate Carrying-Capacity Law', focus: 'Establishes non-sectarian, safety-respecting legal standards aligning pilgrimage infrastructure with alpine ecological limits.', methods: 'Supreme Court / NGT high-altitude shrine orders & Monograph 02 Vol. V.' },
  { num: '69', volIdx: 13, title: 'Houseboats, Shikaras, Off-Road ATVs and Adventure-Operator Licensing', focus: 'Audits bio-digester holding-tank mandates, lake mooring caps and alpine meadow vehicle bans.', methods: 'LCMA bye-laws, Tourism Acts & compliance inspection records.' },
  { num: '70', volIdx: 13, title: 'A Model Environmental Carrying Capacity and Sustainable Tourism Statute', focus: 'Drafts the six-factor biophysical ceiling mechanism linking visitor caps to verified water, STP and waste capacity.', methods: 'Section 23 statutory formulation & seasonal dynamic permitting.' },

  // VOLUME XV (71–75)
  { num: '71', volIdx: 14, title: 'Inside the Regulators: Staffing, Budgets and Laboratory Capacity of PCCs and EPAs', focus: 'Audits sanctioned vs. filled scientific posts and NABL/certified lab infrastructure across all five regions.', methods: 'Institutional staffing disclosures & Environmental Lab Certification rules.' },
  { num: '72', volIdx: 14, title: 'When the State Is the Polluter: Structural Conflict of Interest in Public Projects', focus: 'Examines why junior pollution-control engineers struggle to serve closure orders on municipal corporations or highway agencies.', methods: 'Respondent cause-title analysis across KEW’s 26-case PIL inventory.' },
  { num: '73', volIdx: 14, title: 'Testing Water (Amendment) Act, 2024 and Jan Vishwas Administrative Penalties', focus: 'Evaluates deterrence, collection rates and executive adjudication independence after decriminalization shifts.', methods: 'Statutory penalty-schedule comparison & enforcement outcome protocol.' },
  { num: '74', volIdx: 14, title: 'Breaking the Polluter-Pays Circularity: Taxpayers, Escrows and Water Act §48', focus: 'Traces the Doodhganga ₹35 Crore NGT compensation loop and designs personal officer accountability + restoration bonds.', methods: 'NGT OA 241/2021 & OA 351/2023 fiscal-to-water-quality audit.' },
  { num: '75', volIdx: 14, title: 'Automatic 48-Hour Precautionary Freezes: Matching Enforcement Speed to Excavator Speed', focus: 'Designs digital e-challan locks and contractor bill freezes triggered by verified illegal mining or wetland infill.', methods: 'EPA §5 / Water Act §33A standing-order legal engineering.' },

  // VOLUME XVI (76–80)
  { num: '76', volIdx: 15, title: 'Forty Years of Western Himalayan Environmental Litigation (1986–2026)', focus: 'Synthesizes High Court PILs, Supreme Court interventions and NGT dockets—including archival register gaps.', methods: 'KEW Master Judicial Inventory & 40-year court completeness matrix.' },
  { num: '77', volIdx: 15, title: 'Seven Hundred Kilometres to the Bench: Geographic, Linguistic and Lab-Cost Barriers', focus: 'Examines access-to-justice hurdles from Pulwama, Shopian, Kargil, Neelum and Diamer to distant appellate benches.', methods: 'NGT Act §4(4) circuit-bench analysis & forensic lab-cost audit.' },
  { num: '78', volIdx: 15, title: 'Heroic Solo Litigants and Campus Seminars: Lessons from JKCAG and KCEF Law College', focus: 'Honours citizen petitioners and Pulwama legal-literacy initiatives while diagnosing solo-litigant bottleneck risks.', methods: 'Public seminar records, NGT dockets & clinical legal-education design.' },
  { num: '79', volIdx: 15, title: 'The Asymmetry of Time: Six-Week Geomorphic Erasure vs. Three-Year Court Dockets', focus: 'Quantifies irreversible physical thresholds (karewa cuts, cobble stripping, marsh infill) that outrun ex-post writs.', methods: 'Case-duration vs. geomorphic-rate comparative analysis.' },
  { num: '80', volIdx: 15, title: 'Affidavits vs. Satellites: Auditing Court Compliance Claims and KEW’s Own Docket Limits', focus: 'Contrasts GOVERNMENT_AFFIDAVIT_ONLY filings against SATELLITE_VERIFIED audits while disclosing KEW’s quarantined CNR boundaries.', methods: 'Dal Lake 200 m buffer audit & KEW evidentiary transparency protocol.' },

  // VOLUME XVII (81–85)
  { num: '81', volIdx: 16, title: 'Evaluating Forest Laws Against Canopy Density, Fragmentation and Species Survival', focus: 'Tests forestry statutes against FSI/Sentinel canopy trends, regeneration and Hangul/pheasant habitat integrity.', methods: 'Statutory objective vs. remote-sensing & wildlife indicator pairing.' },
  { num: '82', volIdx: 16, title: 'Evaluating Water Laws Against Dissolved Oxygen, Coliforms, Nutrients and E-Flows', focus: 'Benchmarks 52 years of pollution law against actual river BOD, drinking-water coliforms and lake trophic states.', methods: 'Hydrochemical time series vs. statutory effluent standards.' },
  { num: '83', volIdx: 16, title: 'Evaluating EIA Approvals Against Post-Construction Landslides and River Turbidities', focus: 'Compares pre-construction EMP promises with post-project slope failures and muck-disposal footprints.', methods: 'Before-and-after satellite & landslide-cluster validation.' },
  { num: '84', volIdx: 16, title: 'Evaluating Waste Rules Against Leachate Plumes, Segregation Rates and Open Burning', focus: 'Tests municipal performance (Achan, Leh, Muzaffarabad, Gilgit) against SWM 2016/2026 mandates.', methods: 'Leachate soil/aquifer studies & municipal processing audits.' },
  { num: '85', volIdx: 16, title: 'Enforcement Failure vs. Legislative Failure: The Fifteen-Problem Diagnostic Matrix', focus: 'Applies strict triage so lawmakers neither pass redundant statutes nor blame enforcement where legal authority is missing.', methods: 'Part VII 15-problem classification methodology.' },

  // VOLUME XVIII (86–90)
  { num: '86', volIdx: 17, title: 'US Clean Water Act Lessons: NPDES Permits, §303(d) TMDLs and §404 Wetland Fill Rules', focus: 'Examines how US federal water law links point-source permits to receiving-water load limits and "no net wetland loss."', methods: 'Comparative statutory analysis of 33 U.S.C. §§1313(d), 1342, 1344.' },
  { num: '87', volIdx: 17, title: 'US Clean Air Act, NEPA, Endangered Species Act and CERCLA Superfund Remediation', focus: 'Extracts non-attainment valley SIPs, alternatives analysis, Critical Habitat consultation and strict remediation liability.', methods: 'Comparative US environmental jurisprudence & mountain applicability check.' },
  { num: '88', volIdx: 17, title: 'European Union Directives: Water Framework, Floods, Habitats and the 2024 Nature Restoration Law', focus: 'Analyses basin-scale "Good Ecological Status" and legally binding ecosystem-restoration targets.', methods: 'EU Directives 2000/60/EC, 2007/60/EC, 92/43/EEC & Reg. 2024/1991.' },
  { num: '89', volIdx: 17, title: 'The Aarhus Convention and Specialist Courts (NZ & NSW Land and Environment Court)', focus: 'Models proactive digital disclosure, open standing and scientific-judicial merits review before earthworks start.', methods: 'Aarhus 1998 text & comparative environmental-court procedure.' },
  { num: '90', volIdx: 17, title: 'Multilateral Treaties in Domestic Himalayan Courts: Ramsar, CMS, CBD and Paris Agreement', focus: 'Examines how international commitments are translated—or left unimplemented—across domestic Himalayan statutes.', methods: 'Treaty incorporation analysis across Indian and Pakistani/AJ&K/GB courts.' },

  // VOLUME XIX (91–95)
  { num: '91', volIdx: 18, title: 'Reform Packages 01–03: Mountain Ecosystems, Lake Recovery and Cryosphere Protection', focus: 'Detailed policy architecture for Mountain Ecosystem, Lake/Wetland Recovery and Cryosphere/Glacier frameworks.', methods: 'Sections 17–19 clause scoping & scientific threshold specification.' },
  { num: '92', volIdx: 18, title: 'Reform Packages 04–06: Cumulative EIA, River E-Flows and Karewa Geoconservation', focus: 'Detailed policy architecture for basin CEIA, seasonal river flows and Plio-Pleistocene Karewa heritage.', methods: 'Sections 20–22 clause scoping & hydro-geomorphic standards.' },
  { num: '93', volIdx: 18, title: 'Reform Packages 07–09: Carrying Capacity, Valley Airsheds and Climate Resilience', focus: 'Detailed policy architecture for sustainable tourism/pilgrimage ceilings, airshed budgets and climate stress-testing.', methods: 'Sections 23–25 clause scoping & constitutional alignment.' },
  { num: '94', volIdx: 18, title: 'Reform Packages 10–12: Restoration Liability, Scientific Transparency and Floodplain Land-Use', focus: 'Detailed policy architecture for 7-tier restoration liability, 10-record proactive disclosure and floodplain/soil protection.', methods: 'Sections 26–28 clause scoping & open-data safeguards.' },
  { num: '95', volIdx: 18, title: 'Reform Packages 13–15 & Retain/Reset Matrix: Connectivity, Research Impact and Emergencies', focus: 'Synthesizes corridor connectivity, Research-to-Society duties, 7 ecological emergency triggers and the 15-row Retain/Reset matrix.', methods: 'Sections 29–32 integrated legislative reform synthesis.' },

  // VOLUME XX (96–100)
  { num: '96', volIdx: 19, title: 'Jurisdiction-Specific Legislative Pathways Across Four Legal Systems', focus: 'Maps constitutional competence—Parliament/MoEFCC, UT J&K Assembly/Admin, UT Ladakh/LAHDC, AJ&K Assembly and GB Assembly.', methods: 'Constitutional legislative-list and rulemaking competence analysis.' },
  { num: '97', volIdx: 19, title: 'Independent Bar, Judicial and Scientific Review Protocol Before Model-Bill Drafting', focus: 'Establishes peer-review safeguards by qualified environmental lawyers in each jurisdiction prior to statutory drafting.', methods: 'Multi-jurisdictional legislative vetting & ethics protocol.' },
  { num: '98', volIdx: 19, title: 'Architecture of KEW’s Western Himalayan Environmental Legislation & Enforcement Observatory', focus: 'Technical specification for all 16 registries, 10-field statutory dossiers and allegation-vs-adjudication firewalls.', methods: 'Relational legal-scientific observatory engineering.' },
  { num: '99', volIdx: 19, title: 'Sequencing Reform 2027–2035: Immediate Enforcement Wins vs. Multiyear Statutory Enactments', focus: 'Prioritizes 2027–2028 enforcement/transparency rules ahead of 2029–2035 standalone ecosystem bills and basin TMDLs.', methods: 'Phased institutional, fiscal and legislative roadmap.' },
  { num: '100', volIdx: 19, title: 'The Ultimate Purpose of Environmental Law: Protecting Nature Itself, Not Procedure', focus: 'Closing synthesis uniting jurisprudence, earth science and public accountability across the Western Himalayas.', methods: 'Foundational legal-ecological summation.' },
];

function slugifyLegalChapter(num: string, title: string): string {
  const clean = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return `chapter-${num}-${clean}`;
}

export const ENVIRONMENTAL_LAW_CHAPTERS_100: LegalMonographChapterProtocol[] =
  RAW_100_LEGAL_CHAPTERS.map((row) => {
    const vol = ENVIRONMENTAL_LAW_VOLUMES_20[row.volIdx]!;
    return {
      number: row.num,
      slug: slugifyLegalChapter(row.num, row.title),
      volumeRoman: vol.volumeRoman,
      volumeTitle: vol.investigationTitle,
      title: row.title,
      legalAndScientificFocus: row.focus,
      primarySourcesAndMethodology: row.methods,
      verificationStatus:
        'Proposed Monograph Chapter Protocol · Preliminary Statutory & Audit Scoping Completed (Exhaustive Section-by-Section Legal Census & Jurisdictional Counsel Review Ongoing)',
    };
  });

export function getEnvironmentalLawChapterBySlug(
  chapterSlug: string
): LegalMonographChapterProtocol | undefined {
  return ENVIRONMENTAL_LAW_CHAPTERS_100.find((ch) => ch.slug === chapterSlug);
}
