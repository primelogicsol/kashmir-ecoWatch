// ─────────────────────────────────────────────────────────────────────────────
// KEW-EIAI HIGH-PRIORITY INVESTIGATION EXPANSION — PART III (15 INVESTIGATIONS)
// KEW-INV-0039 .. KEW-INV-0053 — Thematic Series VII:
//   Jammu & Kashmir Environmental Economics, Public Expenditure & Ecological Accountability
//   (Brings cumulative expansion to 44 new investigations; total KEW-EIAI portfolio = 53)
//
// Scientific & Fiscal Governance Guardrails:
//   1. Verified FY 2026–27 J&K Budget Estimates baseline (J&K Finance Dept & PRS):
//      Total Outlay ₹1,13,767 cr | GSDP ₹3,15,822 cr | Net Outlay ₹1,05,958 cr |
//      Revenue ₹80,640 cr | Capital ₹25,236 cr | Debt Repayment ₹7,809 cr | Loans ₹82 cr |
//      Fiscal Deficit ₹14,685 cr | Central Grants-in-Aid ₹58,218 cr.
//   2. Strictly distinguishes pre-2019 J&K State budgets (incl. Ladakh) from post-Oct 2019
//      UT of Jammu & Kashmir budgets, and separates UT-wide vs Jammu vs Kashmir Division.
//   3. Zero fabricated agency budgets, staffing numbers, or damage valuations: unextracted
//      Demands for Grants and primary valuation surveys remain explicitly marked Unverified.
//   4. Exploratory GSDP_EA = GSDP - CFC - D_N - D_E is never presented as official Green GSDP.
// ─────────────────────────────────────────────────────────────────────────────

import {
  CitationReference,
  DisciplineFinding,
  EvidenceVerificationClass,
  InvestigationDomainId,
  InvestigationPriority,
  InvestigationRecord,
  InvestigationStatus,
  StatutoryComplianceAssessmentRow,
} from '@/types/environmental-investigations';

const JK_ALL_20_DISTRICTS_SCOPE = [
  'Srinagar',
  'Ganderbal',
  'Baramulla',
  'Anantnag',
  'Pulwama',
  'Budgam',
  'Bandipora',
  'Kupwara',
  'Kulgam',
  'Shopian',
  'Jammu',
  'Udhampur',
  'Reasi',
  'Kathua',
  'Samba',
  'Rajouri',
  'Poonch',
  'Doda',
  'Kishtwar',
  'Ramban',
];

const SHARED_ECON_REFERENCES: CitationReference[] = [
  {
    id: 'REF-ECON-FIN27',
    authorsOrBody: 'Finance Department, Government of Jammu & Kashmir',
    year: 2026,
    title: 'Annual Financial Statement, Budget Summary, Detailed Demands for Grants & FRBM Disclosures (FY 2026–27 Budget Estimates)',
    publicationOrSeries: 'Official Finance Department Portal, Govt. of J&K (jakfinance.nic.in)',
    referenceType: 'Technical Institute Report',
    externalUrl: 'https://jakfinance.nic.in/',
    provenanceNote: 'Official government finance portal for FY 2026–27 Total Expenditure (₹1,13,767 cr), Revenue (₹80,640 cr), Capital Outlay (₹25,236 cr), Debt Repayment (₹7,809 cr), Loans (₹82 cr), Central Grants (₹58,218 cr), Fiscal Deficit (₹14,685 cr), and GSDP (₹3,15,822 cr), cross-verified with PRS Legislative Research (https://prsindia.org/budgets/states/jammu-and-kashmir-budget-analysis-2026-27).',
  },
  {
    id: 'REF-ECON-PRS27',
    authorsOrBody: 'PRS Legislative Research',
    year: 2026,
    title: 'Jammu and Kashmir Budget Analysis 2026–27',
    publicationOrSeries: 'PRS State & UT Fiscal Analysis Series',
    referenceType: 'Technical Institute Report',
    externalUrl: 'https://prsindia.org/budgets/states/jammu-and-kashmir-budget-analysis-2026-27',
    provenanceNote: 'Independent fiscal verification of net expenditure (₹1,05,958 cr excluding debt repayment), composition shares, and comparative fiscal indicators.',
  },
  {
    id: 'REF-ECON-CAGFIN25',
    authorsOrBody: 'Comptroller and Auditor General of India (CAG)',
    year: 2025,
    title: 'Financial Audit Report on the Accounts of the Union Territory of Jammu and Kashmir (2024–25)',
    publicationOrSeries: 'CAG Audit Report No. 125155 / Accountant General J&K',
    referenceType: 'Statutory Audit (CAG)',
    externalUrl: 'https://cag.gov.in/en/audit-report/details/125155',
    provenanceNote: 'Audited public finance baseline for appropriation accounts, unspent balances, utilization certificates, and post-reorganization UT fiscal structure.',
  },
  {
    id: 'REF-ECON-CAGLAKE',
    authorsOrBody: 'Comptroller and Auditor General of India (CAG)',
    year: 2025,
    title: 'Performance Audit on Conservation and Management of Dal-Nigeen and Wular Lakes in Jammu & Kashmir (Report No. 4 of 2025)',
    publicationOrSeries: 'CAG Audit Report ID 125068 (Government of J&K)',
    referenceType: 'Statutory Audit (CAG)',
    externalUrl: 'https://www.cag.gov.in/en/audit-report/details/125068',
    provenanceNote: 'Documents conservation fund utilization, ₹28.01 cr (2016–22) de-weeding seasonality mismatch (57.8% off-season), discontinued components, research deficits, and monitoring gaps.',
  },
  {
    id: 'REF-ECON-SEEA',
    authorsOrBody: 'United Nations, European Commission, FAO, IMF, OECD & World Bank / MoSPI Government of India',
    year: 2021,
    title: 'System of Environmental-Economic Accounting (SEEA) Central Framework & Ecosystem Accounting; MoSPI EnviStats India (2018–2026)',
    publicationOrSeries: 'UN Statistical Commission / Ministry of Statistics and Programme Implementation',
    referenceType: 'Technical Institute Report',
    externalUrl: 'https://seea.un.org/',
    provenanceNote: 'International and Indian national methodological standard for CEPA/CReMA expenditure accounting, physical/monetary ecosystem asset accounts, and avoiding double counting.',
  },
  {
    id: 'REF-ECON-RBI-FC',
    authorsOrBody: 'Reserve Bank of India (RBI) & Fifteenth Finance Commission of India',
    year: 2025,
    title: 'State Finances: A Study of Budgets (2000–2026 Series) & Finance Commission Forest/Ecology Horizontal Devolution Framework',
    publicationOrSeries: 'rbi.org.in & fincomindia.nic.in',
    referenceType: 'Technical Institute Report',
    externalUrl: 'https://www.rbi.org.in/',
    provenanceNote: 'Provides multi-decadal inflation-adjustment series and comparative mountain fiscal benchmarks across J&K, Himachal Pradesh, and Uttarakhand.',
  },
];

interface EconCharterSpec {
  code: string;
  expansionNumber: number; // 30 .. 44
  slug: string;
  title: string;
  subtitle: string;
  shortTitle: string;
  priority: InvestigationPriority;
  status: InvestigationStatus;
  statusLabel: string;
  temporalScope: string;
  heroImage: string;
  heroImageCaption: string;
  districts: string[];
  spatialFocus: string;
  coordinates: [number, number];
  primaryDomainId: InvestigationDomainId;
  secondaryDomainIds: InvestigationDomainId[];
  disciplineIds: string[];
  linkedKewModules: InvestigationRecord['linkedKewModules'];
  relatedInvestigationCodes: string[];
  relatedSectoralCodes: string[];
  scopeDifferentiation: string;
  centralQuestion: string;
  scopingQuestions: string[];
  executiveKeyFindings: string[];
  callouts?: Array<{ label: string; value: string; unit?: string; sourceTag: string }>;
  chronology: InvestigationRecord['chronology'];
  interventions: InvestigationRecord['interventionInventory'];
  disciplineFindings: DisciplineFinding[];
  assertions: Array<{
    suffix: string;
    assertion: string;
    sourceCategory: InvestigationRecord['evidenceMatrix'][number]['sourceCategory'];
    classification: EvidenceVerificationClass;
    basis: string;
    citationIds: string[];
    methodReq?: string;
  }>;
  accountability: Array<{
    suffix: string;
    institution: string;
    acronym: string;
    mandate: string;
    ownership: string;
    scientificResp: string;
    financialResp: string;
    documentedFindings: string;
    response: string;
    questions: string[];
    corrective: string;
  }>;
  unansweredQuestions: string[];
  alternatives: InvestigationRecord['alternativeSolutions'];
  recommendations: Array<{
    suffix: string;
    horizon: InvestigationRecord['recommendations'][number]['horizon'];
    title: string;
    spec: string;
    target: string;
    justification: string;
    indicator: string;
  }>;
  extraReferences?: CitationReference[];
  dataGaps: string[];
  regulatoryLead: string;
  statutoryComplianceMatrix?: StatutoryComplianceAssessmentRow[];
}

function makeEconCharter(s: EconCharterSpec): InvestigationRecord {
  const allRefs = [...SHARED_ECON_REFERENCES, ...(s.extraReferences || [])];
  return {
    code: s.code,
    slug: s.slug,
    title: s.title,
    subtitle: s.subtitle,
    shortTitle: s.shortTitle,
    seriesId: 'environmental-economics-fiscal',
    seriesTitle: 'J&K Environmental Economics, Public Expenditure & Ecological Accountability',
    priority: s.priority,
    recommendedPublicationSequence: s.expansionNumber,
    centralScientificQuestion: s.centralQuestion,
    statutoryComplianceMatrix: s.statutoryComplianceMatrix,
    duplicationAudit: {
      status:
        s.relatedSectoralCodes.length > 0
          ? 'Cleared — Cross-Module Accountability Complement'
          : 'Cleared — Distinct Investigative Question',
      relatedSectoralCodes: s.relatedSectoralCodes,
      relatedInvestigationCodes: s.relatedInvestigationCodes,
      scopeDifferentiation: s.scopeDifferentiation,
    },
    status: s.status,
    statusLabel: s.statusLabel,
    temporalScope: s.temporalScope,
    initiatedDate: '2026-11-25',
    lastUpdated: '2026-11-25',
    version:
      s.status === 'scoping_review'
        ? 'v0.4 (Priority Fiscal & Scientific Scoping)'
        : 'v0.2 (Proposed Investigation Charter)',
    featured: false,
    heroImage: s.heroImage,
    heroImageCaption: s.heroImageCaption,
    subregion: 'Jammu & Kashmir (State 2000–2019 / UT 2019–2027)',
    districts: s.districts,
    watershedOrBasin: s.spatialFocus,
    elevationRangeM: '247–7,135 m ASL (Jammu Plains, Kashmir Basin & Greater Himalayan Catchments)',
    coordinates: s.coordinates,
    spatialEnvelopeKm2: 42241,
    connectedEcosystems: [
      'Glaciers, Rivers, Lakes (521 Kashmir Registry + Jammu Lakes) & Ramsar Wetlands',
      'Temperate/Subtropical Forests, Protected Areas & Alpine Meadows',
      'Plio-Pleistocene Karewas, Karst/Fracture Springsheds & Alluvial Aquifers',
      'Urban Valley Airsheds, Sensitive Acoustic Zones & Public Supply Catchments',
    ],
    primaryDomainId: s.primaryDomainId,
    secondaryDomainIds: s.secondaryDomainIds,
    disciplineIds: s.disciplineIds,
    linkedKewModules: [
      {
        moduleName: 'Environmental Economics & Fiscal Evidence',
        route: '/environmental-investigations/economics',
        contributionNote: 'Supplies FY 2026–27 budget baselines, 7-stage fiscal ledger, 23-agency audit inventory, and UN SEEA natural capital framework.',
      },
      ...s.linkedKewModules,
    ],
    relatedInvestigationCodes: s.relatedInvestigationCodes,
    scopingQuestions: s.scopingQuestions,
    executiveKeyFindings: s.executiveKeyFindings,
    chronology: s.chronology,
    interventionInventory: s.interventions,
    disciplineFindings: s.disciplineFindings,
    evidenceMatrix: s.assertions.map((a) => ({
      id: `EVID-${s.code.slice(-4)}-${a.suffix}`,
      investigationCode: s.code,
      investigationSlug: s.slug,
      investigationTitle: s.title,
      assertion: a.assertion,
      sourceCategory: a.sourceCategory,
      classification: a.classification,
      evidenceBasisSummary: a.basis,
      citationIds: a.citationIds,
      methodologicalRequirement: a.methodReq,
      lastVerifiedDate: '2026-11-25',
    })),
    accountabilityMatrix: s.accountability.map((acc) => ({
      id: `ACC-${s.code.slice(-4)}-${acc.suffix}`,
      investigationCode: s.code,
      investigationSlug: s.slug,
      investigationTitle: s.title,
      responsibleInstitution: acc.institution,
      institutionAcronym: acc.acronym,
      statutoryMandate: acc.mandate,
      projectOwnership: acc.ownership,
      scientificResponsibility: acc.scientificResp,
      financialResponsibility: acc.financialResp,
      environmentalAuthorisation: s.regulatoryLead,
      monitoringObligations:
        'Annual Financial Statements, Appropriation Accounts, CAG Audit Action-Taken Notes, and measurable physical/ecological outcome disclosures',
      documentedFindings: acc.documentedFindings,
      institutionalResponse: acc.response,
      outstandingQuestions: acc.questions,
      correctiveAction: acc.corrective,
      followUpStatus: 'Clarification Invited',
    })),
    unansweredQuestions: s.unansweredQuestions,
    alternativeSolutions: s.alternatives,
    recommendations: s.recommendations.map((r) => ({
      id: `REC-${s.code.slice(-4)}-${r.suffix}`,
      investigationCode: s.code,
      investigationSlug: s.slug,
      investigationTitle: s.title,
      horizon: r.horizon,
      title: r.title,
      actionSpecification: r.spec,
      targetInstitution: r.target,
      scientificJustification: r.justification,
      verificationIndicator: r.indicator,
      status: 'Proposed',
    })),
    references: allRefs,
    updatesLog: [
      {
        date: '2026-11-25',
        version: s.status === 'scoping_review' ? 'v0.4' : 'v0.2',
        entryType: 'Initial Publication',
        summary: `Registered as Expansion Subject #${s.expansionNumber} under Series VII (J&K Environmental Economics, Public Expenditure & Ecological Accountability) following Phase 1 system duplication audit.`,
        verifiedBy: 'KEW-EIAI Environmental Economics & Public Finance Desk',
      },
    ],
    dataGaps: s.dataGaps,
    sections: [
      {
        sectionNumber: '01',
        key: 'executive-summary',
        title: 'Executive Summary & Fiscal-Ecological Mandate',
        applicable: true,
        leadSummary: s.subtitle,
        bodyParagraphs: [
          `Central Scientific & Economic Question: ${s.centralQuestion}`,
          'Governed by KEW-EIAI Phase 12 Scientific Governance rules: every financial figure carries an authenticated source, financial year, currency, geographical boundary, and accounting stage (BE, RE, Released, Actual, or CAG-Audited). Departmental allocations and valuation figures not yet extracted from Detailed Demands for Grants remain transparently flagged as Unverified.',
        ],
        quantitativeCallouts: s.callouts,
      },
      {
        sectionNumber: '02',
        key: 'investigation-background',
        title: 'Investigation Background & Duplication Audit',
        applicable: true,
        leadSummary: s.scopeDifferentiation,
        bodyParagraphs: [
          'Distinguishes the former State of Jammu & Kashmir (FY 2000–01 to Oct 2019, inclusive of Ladakh) from the post-reorganization Union Territory of Jammu & Kashmir (Nov 2019–FY 2026–27, excluding Ladakh), and prohibits attributing UT-wide fiscal heads solely to Kashmir Division.',
        ],
      },
      {
        sectionNumber: '03',
        key: 'geographic-context',
        title: 'Geographic & Fiscal Jurisdiction Boundaries',
        applicable: true,
        leadSummary: s.spatialFocus,
        bodyParagraphs: [
          'Separates UT-wide Secretariat/Directorate allocations, Kashmir Division (10 districts), Jammu Division (10 districts), Centrally Sponsored Scheme (CSS / PFMS) transfers, off-budget CAMPA/DMF accounts, and pre-2019 historical Ladakh heads.',
        ],
      },
      {
        sectionNumber: '04',
        key: 'historical-chronology',
        title: 'Historical Budget & Ecological Regime Chronology (2000–2027)',
        applicable: true,
        leadSummary:
          'Reconstructs inflation-adjusted fiscal and ecological trajectories across seven analytical periods: 2000–2010, 2010–2014 (pre-flood), 2014–2019 (post-flood PMDP/JTFRP), 2019–2020 (UT bifurcation), 2020–2025 (UT financing), 2025–2026 (latest completed FY), and 2026–2027 (current BE).',
        bodyParagraphs: [
          'Nominal rupees across 2000–2027 are converted into constant base-year prices using spliced MoSPI GSDP deflators and CPI series while controlling for post-2019 institutional reorganizations (e.g., LAWDA to LCMA, JKSPCB to JKPCC).',
        ],
      },
      {
        sectionNumber: '05',
        key: 'environmental-baseline',
        title: 'Fiscal & Natural Capital Baseline',
        applicable: true,
        leadSummary: s.executiveKeyFindings[0] || s.subtitle,
        bodyParagraphs: s.executiveKeyFindings,
      },
      {
        sectionNumber: '06',
        key: 'project-intervention-inventory',
        title: 'Budgeted Programmes, Schemes & Fiscal Instruments Inventory',
        applicable: true,
        leadSummary:
          'Tracks major UT budget demands, Centrally Sponsored Schemes (JJM, SBM, NCAP, AMRUT, HADP), World Bank/external projects, and CAMPA/DMF funds across the 7-stage expenditure-to-outcome chain.',
        bodyParagraphs: [
          'Evaluates both failure modes: (1) 100% financial expenditure failing to improve ambient ecological conditions, and (2) resource-constrained scientific/conservation units achieving measurable ecological protection.',
        ],
      },
      {
        sectionNumber: '07',
        key: 'scientific-disciplines',
        title: 'Integrated Economic & Biophysical Disciplines',
        applicable: true,
        leadSummary:
          'Couples Environmental Economics, Public Finance, UN SEEA Environmental Accounting, Econometrics, and Institutional Economics directly with biophysical limnology, hydrology, atmospheric science, and remote sensing.',
        bodyParagraphs: [
          'Economic valuation never floats free of physical science: every rupee metric is anchored to measured biophysical stocks, loads, concentrations, or survival rates.',
        ],
      },
      {
        sectionNumber: '08',
        key: 'scientific-analysis',
        title: 'Environmental-Economic & Econometric Analysis',
        applicable: true,
        leadSummary:
          'Applies EEI, EFD_t, UN SEEA physical/monetary accounts, Benefit–Cost Ratio (BCR), and panel spending-outcome specifications with explicit sensitivity intervals.',
        bodyParagraphs: [
          'Prevents double counting of intergovernmental transfers (Centre → UT → ULB/Authority) and separates observed Cost-of-Illness / repair bills from modelled welfare estimates.',
        ],
      },
      {
        sectionNumber: '09',
        key: 'satellite-gis-evidence',
        title: 'Satellite & GIS Natural-Capital Verification',
        applicable: true,
        leadSummary:
          'Pairs fiscal expenditure polygons (dredging zones, CAMPA plantations, WTP/STP command areas, highway cuts) with multi-decadal Landsat, Sentinel-2, and high-resolution DEM change detection.',
        bodyParagraphs: [
          'Tests whether reported physical outputs correspond to verifiable canopy recovery, wetland hydroperiod persistence, or stabilized slopes on independent satellite imagery.',
        ],
      },
      {
        sectionNumber: '10',
        key: 'hydrological-analysis',
        title: 'Watershed, Cryosphere & Water-Asset Accounting',
        applicable: true,
        leadSummary:
          'Integrates SEEA Water physical asset accounts across glaciers, rivers, lakes, wetlands, springs, and municipal/JJM treatment infrastructure.',
        bodyParagraphs: [
          'Quantifies upstream-to-downstream fiscal linkages: how underinvestment in catchment soil conservation and sewage tertiary treatment multiplies downstream dredging and healthcare costs.',
        ],
      },
      {
        sectionNumber: '11',
        key: 'ecological-impact-analysis',
        title: 'Ecological & Natural Capital Stock Consequences',
        applicable: true,
        leadSummary:
          'Evaluates physical asset condition trends alongside non-monetizable biodiversity, geo-heritage (Karewas), and cultural ecosystem values.',
        bodyParagraphs: [
          'Irreversible losses — such as Critically Endangered Hangul extirpation risk or Quaternary Karewa stratigraphy destruction — are reported in non-substitutable physical terms rather than reduced solely to rupee figures.',
        ],
      },
      {
        sectionNumber: '12',
        key: 'cumulative-impact-assessment',
        title: 'Macro-Fiscal & Cross-Sectoral Externality Interactions',
        applicable: true,
        leadSummary:
          'Examines how Tier-4 pressure-inducing capital outlays (unmitigated road cutting, floodplain encroachment, unregulated extraction) erode the ecological gains of Tier-1/Tier-2 conservation budgets.',
        bodyParagraphs: [
          'Tests whether public finance operates at cross-purposes — spending crores on lake de-weeding and flood relief while underfunding watershed protection, wetland buffers, and tertiary P-removal.',
        ],
      },
      {
        sectionNumber: '13',
        key: 'environmental-risk-pathways',
        title: 'Fiscal-Ecological Risk & Liability Pathways',
        applicable: true,
        leadSummary:
          'Traces how deferred O&M, scientific staffing vacancies, and natural-capital depletion accumulate contingent fiscal liabilities (flood disasters, waterborne outbreaks, infrastructure scour).',
        bodyParagraphs: [
          'Models the "build–neglect–rebuild" fiscal trap where capital assets deteriorate prematurely due to compressed operational maintenance budgets.',
        ],
      },
      {
        sectionNumber: '14',
        key: 'asian-global-precedents',
        title: 'Himalayan Regional & International Fiscal Precedents',
        applicable: true,
        leadSummary:
          'Benchmarks Jammu & Kashmir against Himachal Pradesh, Uttarakhand, UK ONS Natural Capital Accounts, Lake Biwa fiscal ordinances, and Costa Rica FONAFIFO PES — normalized by population, area, GSDP, and constitutional regime.',
        bodyParagraphs: [
          'Accounts explicitly for post-2019 UT grant architecture (₹58,218 cr Central Grants-in-Aid in FY 2026–27) vs Article 280 Finance Commission horizontal tax devolution in Himalayan states.',
        ],
      },
      {
        sectionNumber: '15',
        key: 'government-scientific-records',
        title: 'Budget Documents, CAG Audits & Official Statistical Records',
        applicable: true,
        leadSummary:
          'Anchored to J&K Finance Department Budget 2026–27, CAG Financial Audit 2024–25 (125155), CAG Lake Conservation Audit (125068), PRS Legislative Research, MoSPI EnviStats, RBI State Finances, PFMS, and Sansad disclosures.',
        bodyParagraphs: [
          'Maintains strict separation between Budget Estimates (BE), Revised Estimates (RE), PFMS releases, and CAG-audited actuals.',
        ],
      },
      {
        sectionNumber: '16',
        key: 'institutional-accountability',
        title: 'Institutional Financial & Scientific Accountability Matrix',
        applicable: true,
        leadSummary:
          'Maps statutory mandates, budget demands, staffing capacity, audited expenditure findings, and official right-of-reply invitations across responsible departments.',
        bodyParagraphs: [
          'Distinguishes financing deficits, implementation deficits, scientific capacity deficits, enforcement deficits, and governance fragmentation without inferring malice from unextracted records.',
        ],
      },
      {
        sectionNumber: '17',
        key: 'regulatory-analysis',
        title: 'Fiscal Responsibility, Statutory Mandates & Accounting Standards',
        applicable: true,
        leadSummary: s.regulatoryLead,
        bodyParagraphs: [
          'Cross-examines FRBM fiscal rules, CAMPA Act 2016, Water/Air/EPA statutory obligations, 15th/16th Finance Commission grant conditions, and UN SEEA / MoSPI accounting protocols.',
        ],
      },
      {
        sectionNumber: '18',
        key: 'scientific-evidence-matrix',
        title: 'Scientific & Fiscal Evidence Verification Matrix',
        applicable: true,
        leadSummary:
          'Every budgetary, economic, and ecological claim is graded (Documented, Provisionally Supported, Unverified) with traceable source citations and verification protocols.',
        bodyParagraphs: [
          'Zero synthetic departmental numbers are permitted; pending Demand-for-Grant extractions carry explicit methodological protocols.',
        ],
      },
      {
        sectionNumber: '19',
        key: 'unanswered-questions',
        title: 'Unanswered Fiscal & Institutional Questions',
        applicable: true,
        leadSummary: 'Defines specific documentary disclosures invited from J&K Finance Department and implementing environmental agencies.',
        bodyParagraphs: s.unansweredQuestions,
      },
      {
        sectionNumber: '20',
        key: 'alternative-solutions',
        title: 'High-Return Ecological Investment & Fiscal Reform Alternatives',
        applicable: true,
        leadSummary: 'Evaluates higher-BCR preventative, watershed, and fiscal-reform instruments.',
        bodyParagraphs: s.alternatives.map(
          (a) => `${a.title}: ${a.mechanism} (${a.evidencePrecedent}) — ${a.feasibilityNote}`
        ),
      },
      {
        sectionNumber: '21',
        key: 'recommendations',
        title: 'Phased Fiscal, Institutional & Scientific Recommendations',
        applicable: true,
        leadSummary: 'Actionable immediate, medium-term, and long-term reforms with verifiable fiscal and ecological indicators.',
        bodyParagraphs: ['Tracked in the central KEW-EIAI Recommendations Tracker.'],
      },
      {
        sectionNumber: '22',
        key: 'scientific-conclusions',
        title: 'Scope Boundaries, Valuation Caveats & Uncertainty Controls',
        applicable: true,
        leadSummary:
          'Summarizes verified FY 2026–27 macro-fiscal anchors while bounding all valuation and natural-capital estimates within explicit uncertainty intervals.',
        bodyParagraphs: [
          'Reiterates that neither 100% budget utilization nor conventional GSDP growth establishes environmental sustainability if natural capital stocks continue to depreciate.',
        ],
      },
      {
        sectionNumber: '23',
        key: 'references-datasets',
        title: 'References, Budget Portals & Statistical Repositories',
        applicable: true,
        leadSummary: 'Traceable links to J&K Finance Department, CAG, PRS, MoSPI, UN SEEA, RBI, PFMS, e-Tendering, Parliament, and Finance Commission.',
        bodyParagraphs: ['All references pass Stage 10 deterministic citation integrity validation.'],
      },
      {
        sectionNumber: '24',
        key: 'investigation-updates',
        title: 'Investigation Updates & Right-of-Reply Log',
        applicable: true,
        leadSummary: 'Records Demand-for-Grant extractions, CAG audit releases, and official departmental clarifications as they are verified.',
        bodyParagraphs: ['Version log initialized upon Series VII registration.'],
      },
    ],
  };
}

export const ECONOMICS_15_INVESTIGATION_DOSSIERS: InvestigationRecord[] = [
  // ── 30. KEW-INV-0039 — FLAGSHIP UMBRELLA: BUDGET ALLOCATION & DEFICIT ──────
  makeEconCharter({
    code: 'KEW-INV-0039',
    expansionNumber: 30,
    slug: 'jk-economics-environmental-governance-budget-deficit-umbrella',
    title: 'The Economics of Environmental Governance in Jammu and Kashmir: Public Expenditure, Ecological Deficits and Institutional Performance, 2000–2026',
    subtitle: 'Flagship Umbrella Investigation — Environmental Budget Allocation, SEEA Expenditure Intensity (EEI), and Bottom-Up Ecological Financing Deficit (EFD_t) Across Former State (2000–2019) and Union Territory (2019–2027) Regimes',
    shortTitle: 'Environmental Budget Allocation & Ecological Expenditure Deficit (Umbrella)',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Flagship Umbrella Charter — Scoping & Demand Extraction',
    temporalScope: '2000–2027',
    heroImage: '/images/earth-human-impact/ehii-command-center-satellite.jpg',
    heroImageCaption: 'Integrated macro-fiscal and satellite natural-capital audit across Jammu & Kashmir (FY 2000–01 to FY 2026–27)',
    districts: JK_ALL_20_DISTRICTS_SCOPE,
    spatialFocus: 'UT of Jammu & Kashmir (Jammu Division, Kashmir Division & UT-Wide Heads; Historical 2000–2019 State incl. Ladakh normalized separately)',
    coordinates: [33.7782, 76.5762],
    primaryDomainId: '18-environmental-governance',
    secondaryDomainIds: ['01-lakes-limnology', '09-forests-biodiversity', '15-solid-waste-sewage', '17-climate-compound-hazards'],
    disciplineIds: ['public-finance', 'environmental-economics', 'environmental-accounting', 'ecological-economics', 'econometrics', 'institutional-economics', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Sectoral EIA Engine', route: '/sectoral-eia', contributionNote: 'Supplies cross-sectoral carrying-capacity and cumulative stressor baselines.' },
      { moduleName: 'Institutional Accountability', route: '/environmental-investigations/accountability', contributionNote: 'Links 23 agencies to 11-component statutory and financial mandates.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0012', 'KEW-INV-0040', 'KEW-INV-0041', 'KEW-INV-0042', 'KEW-INV-0043', 'KEW-INV-0044', 'KEW-INV-0053'],
    relatedSectoralCodes: ['KEW-SR-2026-95', 'KEW-SR-2026-99'],
    scopeDifferentiation: 'Serves as the umbrella fiscal-ecological synthesis across all 23 departments (FY 2000–2027), distinct from PIL legal jurisprudence (KEW-SR-2026-95) and SDG indicator mapping (KEW-SR-2026-99).',
    centralQuestion: 'Within Jammu & Kashmir’s ₹1,13,767 crore FY 2026–27 budget (and 2000–2026 historical trajectory), what share genuinely funds environmental protection and natural-resource management versus externality-generating development, and what is the bottom-up Ecological Financing Deficit (EFD_t = max(0, R_t − A_t))?',
    scopingQuestions: [
      'What are Jammu & Kashmir’s Narrow (CEPA/CReMA) and Broad Environmental Expenditure Intensity (EEI) ratios as percentages of Net Public Expenditure (₹1,05,958 cr in FY 2026–27 BE) and GSDP (₹3,15,822 cr), once intergovernmental CSS/CAMPA transfers are de-duplicated?',
      'How have inflation-adjusted environmental allocations evolved across the 7 fiscal regimes from 2000–2010 to 2026–2027 after adjusting for the Oct 2019 separation of Ladakh?',
      'What is the empirically costed annual Ecological Financing Deficit EFD_t = max(0, R_t − A_t) across tertiary sewage interception, drinking-water filtration, lake/wetland catchment restoration, air/noise monitoring, and wildlife corridor protection?',
    ],
    executiveKeyFindings: [
      'Authoritative FY 2026–27 Budget Estimates establish Total Budgeted Expenditure at ₹1,13,767 cr against Estimated GSDP of ₹3,15,822 cr, comprising ₹80,640 cr Revenue Expenditure, ₹25,236 cr Capital Outlay, ₹7,809 cr Debt Repayment, and ₹82 cr Loans Given (Net Expenditure: ₹1,05,958 cr; Fiscal Deficit: ₹14,685 cr; Central Grants-in-Aid: ₹58,218 cr).',
      'Equating the Forest, Ecology & Environment Department Demand-for-Grant with the "environmental budget" is methodologically invalid: true environmental outlays span 23 departments, authorities (LCMA, WUCMA, CAMPA), ULBs, and Centrally Sponsored Schemes, while salaries/pensions must be separated from operational conservation works.',
      'Bottom-up financing requirement R_t is derived strictly from documented physical infrastructure and restoration unit costs — never from an arbitrary benchmark percentage of GSDP.',
    ],
    callouts: [
      { label: 'FY 2026–27 Total Budget', value: '₹1,13,767', unit: 'cr (BE)', sourceTag: 'J&K Finance Dept / PRS' },
      { label: 'Estimated GSDP (FY27)', value: '₹3,15,822', unit: 'cr', sourceTag: 'J&K Budget 2026–27' },
      { label: 'Net Expenditure (Ex-Debt)', value: '₹1,05,958', unit: 'cr', sourceTag: 'Rev ₹80,640 + Cap ₹25,236 + ₹82' },
      { label: 'Central Grants-in-Aid', value: '₹58,218', unit: 'cr (51.2%)', sourceTag: 'Fiscal Deficit: ₹14,685 cr' },
    ],
    chronology: [
      { period: '2000–2014', eventTitle: 'Pre-Flood Former J&K State Environmental Spending Baseline', documentedRecord: 'State Planning & Finance Accounts covering early NRCP/NLCP conservation, PHE expansion, and pre-2014 floodplain urbanization (inclusive of Ladakh prior to 2019).', sourceRef: 'REF-ECON-RBI-FC', significance: 'Baseline' },
      { period: '2014–2019', eventTitle: 'Post-2014 Flood Recovery (PMDP & World Bank JTFRP) & 2019 Bifurcation', documentedRecord: 'Emergency reconstruction inflows followed by 31 Oct 2019 reorganization into UT of J&K and UT of Ladakh.', sourceRef: 'REF-ECON-CAGFIN25', significance: 'Intervention' },
      { period: '2024–2027', eventTitle: 'CAG 2024–25 Financial Audit & FY 2026–27 ₹1,13,767 Cr Budget Baseline', documentedRecord: 'Establishes current macro-fiscal envelope (₹80,640 cr revenue, ₹25,236 cr capital outlay) for Demand-by-Demand SEEA environmental expenditure extraction.', sourceRef: 'REF-ECON-FIN27', significance: 'Audit / Judicial' },
    ],
    interventions: [
      { id: 'INT-0039-01', name: 'J&K Consolidated Budget Environmental & Sectoral Demands (FY 2026–27)', period: '2026–2027', executingAgency: 'J&K Finance Department & 23 Implementing Departments', interventionType: 'Macro-Fiscal & Demand-Level Allocation', reportedScaleOrOutlay: '₹1,13,767 cr Total BE (₹1,05,958 cr Net Expenditure)', status: 'Ongoing', documentedOutcome: 'Macro totals verified; granular CEPA/CReMA object-head extraction across 23 agencies underway in Phase 4.' },
    ],
    disciplineFindings: [
      { disciplineId: 'public-finance', disciplineName: 'Public Finance', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: 'SEEA CEPA/CReMA multi-department budget tagging & BE→RE→Released→Audited cascade', equationOrMetricUsed: 'EEI = (E_env / E_total) × 100;  EFD_t = max(0, R_t − A_t)', empiricalFinding: 'Establishes the ₹1,05,958 cr net expenditure and ₹25,236 cr capital outlay denominators for FY 2026–27 while isolating ₹58,218 cr Central Grants-in-Aid to prevent CSS double counting.', uncertaintyAndLimitations: 'Agency-level object heads (salary vs O&M vs capital works) require full Demand-for-Grants extraction before computing final EEI.', verificationClass: 'Documented' },
      { disciplineId: 'environmental-accounting', disciplineName: 'Environmental Accounting (UN SEEA)', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: 'Four-tier SEEA expenditure classification across 23 institutions', equationOrMetricUsed: 'E_env,net = Σ E_CEPA + Σ E_CReMA − Transfers_intergov', empiricalFinding: 'Separates core conservation outlays from embedded water/sanitation/transit investments and Tier-4 pressure-inducing infrastructure works.', uncertaintyAndLimitations: 'Requires PFMS Single Nodal Account reconciliation for centrally sponsored schemes.', verificationClass: 'Provisionally Supported' },
    ],
    assertions: [
      { suffix: '01', assertion: 'Jammu & Kashmir’s FY 2026–27 Budget Estimates project Total Budgeted Expenditure of ₹1,13,767 crore (₹80,640 cr revenue expenditure, ₹25,236 cr capital outlay, ₹7,809 cr debt repayment, ₹82 cr loans; Net Expenditure ₹1,05,958 cr) against Estimated GSDP of ₹3,15,822 crore, Fiscal Deficit of ₹14,685 crore, and Central Grants-in-Aid of ₹58,218 crore.', sourceCategory: 'Government Audit Records', classification: 'Documented', basis: 'Published FY 2026–27 J&K Finance Department Budget documents and PRS Legislative Research analysis.', citationIds: ['REF-ECON-FIN27', 'REF-ECON-PRS27'] },
      { suffix: '02', assertion: 'True Environmental Expenditure Intensity (EEI) and Ecological Financing Deficit (EFD_t) across J&K cannot be computed solely from the Forest, Ecology & Environment Department grant and require de-duplicated extraction across all 23 relevant departments, CAMPA, ULBs, and CSS accounts.', sourceCategory: 'Technical Institute Report', classification: 'Documented', basis: 'UN SEEA CEPA/CReMA environmental expenditure accounting rules and CAG J&K audit architecture.', citationIds: ['REF-ECON-SEEA', 'REF-ECON-CAGFIN25'] },
      { suffix: '03', assertion: 'Exact multi-year Narrow and Broad EEI percentages and bottom-up Ecological Financing Deficit (EFD_t) in constant prices for FY 2000–01 through FY 2026–27 remain under primary Demand-for-Grant and CAG Finance Account extraction.', sourceCategory: 'Government Audit Records', classification: 'Unverified', basis: 'Individual agency Demands for Grants and audited Appropriation Accounts require line-item coding.', citationIds: [], methodReq: 'Extract object-head BE, RE, and CAG Audited Actuals across all 23 departments (FY 2000–27), deflate via spliced MoSPI GSDP deflator, and compute bottom-up engineering R_t.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Finance Department, Government of Jammu & Kashmir', acronym: 'Finance Dept J&K', mandate: 'Preparation of Annual Financial Statements, Detailed Demands for Grants, FRBM compliance, treasury releases, and outcome budgeting.', ownership: 'UT Consolidated Fund & Green/Outcome Budget Tagging', scientificResp: 'Publishing transparent object-head and division-disaggregated environmental expenditure schedules.', financialResp: '₹1,13,767 cr FY 2026–27 Total Budgeted Expenditure oversight', documentedFindings: 'Publishes macro budget documents via official Finance Department channels (jakfinance.nic.in / PRS analysis), but currently lacks a consolidated UN SEEA / Green Budget Statement cross-walking environmental spending and ecological outcomes across departments.', response: 'Clarification invited on whether J&K Finance Department plans to introduce an annual SEEA-aligned Green & Climate Budget Statement.', questions: ['What is the consolidated BE, RE, and Audited Actual expenditure on CEPA/CReMA environmental protection across all Demands in FY 2024–25, 2025–26, and 2026–27?', 'How are UT-wide environmental grants apportioned between Jammu Division and Kashmir Division?'], corrective: 'Publish an annual SEEA-aligned Environmental & Natural Capital Budget Statement alongside the Annual Financial Statement.' },
    ],
    unansweredQuestions: [
      'After excluding salaries and pensions, what net capital and operational O&M sum actually reaches frontline ecological protection, laboratory testing, and pollution abatement across J&K?',
      'How much of the ₹58,218 cr Central Grants-in-Aid in FY 2026–27 is tied to measurable environmental and climate milestones?',
    ],
    alternatives: [
      { title: 'Statutory J&K Green & Natural Capital Budget Statement (SEEA-Tagged)', mechanism: 'Tag every budget line across 23 departments using 4-tier CEPA/CReMA/Embedded/Pressure codes linked to physical outcome KPIs.', evidencePrecedent: 'OECD Paris Collaborative on Green Budgeting, Odisha/Assam/Bihar Climate-Green Budgets & UN SEEA.', feasibilityNote: 'Zero additional fiscal outlay required; transforms existing IFMS/PFMS budget codes into an auditable ecological ledger.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Adopt 4-Tier SEEA Environmental Expenditure Tagging in J&K Detailed Demands for Grants', spec: 'Classify all Demand line-items into Direct Protection (CEPA), Resource Management (CReMA), Embedded Beneficial, and High-Externality Capital Works, separating salaries from O&M and capital.', target: 'J&K Finance Department & FEED J&K', justification: 'Eliminates blind spots and intergovernmental double counting across 23 agencies.', indicator: 'Annual Green & Natural Capital Budget Statement published with FY 2027–28 budget.' },
      { suffix: '02', horizon: 'Medium-Term (1–3 Years)', title: 'Establish Bottom-Up 5-Year Ecological Financing Deficit (EFD_t) Capital & O&M Plan', spec: 'Cost statutory compliance gaps in tertiary STPs,BIS 10500 WTPs, lake catchments, CAAQMS/NANMN stations, and wildlife corridors using realistic unit engineering rates.', target: 'J&K Finance Dept, Planning Dev & Monitoring Dept & CAG Interface', justification: 'Replaces ad-hoc scheme announcements with scientifically costed multiyear deficit closure.', indicator: 'Published 5-year costed R_t vs A_t schedule linked to medium-term fiscal plan.' },
    ],
    dataGaps: [
      'Line-item extraction of Detailed Demands for Grants (salaries vs O&M vs capital works) across all 23 departments for FY 2000–01 to FY 2026–27.',
      'Complete PFMS Single Nodal Account unspent balance ledger for environmental CSS schemes in J&K.',
    ],
    regulatoryLead: 'J&K Reorganization Act 2019 Fiscal Provisions; FRBM Act; UN SEEA Central Framework (CEPA/CReMA); CAG Auditing Standards.',
    statutoryComplianceMatrix: [
      { id: 'SCM-0039-01', sectorOrQuestion: 'Macro Annual Financial Statement & FRBM Disclosure (FY 2026–27)', applicableInstrument: 'J&K Budget Manual & FRBM Framework', classification: 'Verified compliant', evidenceAndLegalBasis: 'FY 2026–27 AFS, Demands for Grants, and FRBM statements publicly released by J&K Finance Department (jakfinance.nic.in) and verified by PRS Legislative Research.', requiredInstitutionalEvidence: 'Machine-readable CSV/Excel release of object-head actuals.' },
      { id: 'SCM-0039-02', sectorOrQuestion: 'Consolidated Cross-Departmental SEEA Environmental Expenditure Accounting', applicableInstrument: 'MoSPI EnviStats / UN SEEA CEPA-CReMA Standard', classification: 'Not verified', evidenceAndLegalBasis: 'No unified multi-department environmental expenditure account currently separates conservation O&M from salaries and CSS transfers.', requiredInstitutionalEvidence: 'Demand-wise CEPA/CReMA reconciliation table (FY 2020–27).' },
      { id: 'SCM-0039-03', sectorOrQuestion: 'Audited Lake Conservation Expenditure Seasonality & Outcome Linkage', applicableInstrument: 'CAG Performance Audit (Report 125068)', classification: 'Verified noncompliant', evidenceAndLegalBasis: 'CAG documented ₹16.18 cr (57.8% of ₹28.01 cr) Dal de-weeding spend outside prescribed months plus discontinued catchment works.', requiredInstitutionalEvidence: 'Action-Taken Notes linking treasury releases to seasonal windows and trophic KPIs.' },
    ],
  }),

  // ── 31. KEW-INV-0040 — ENVIRONMENTAL AGENCY FUNDING & PERFORMANCE ──────────
  makeEconCharter({
    code: 'KEW-INV-0040',
    expansionNumber: 31,
    slug: 'jk-environmental-agency-funding-institutional-performance-audit',
    title: 'Environmental Agency Funding, Budget-to-Outcome Execution and Institutional Performance Across 23 Public Bodies in Jammu and Kashmir',
    subtitle: 'Tracking Budget Estimates, Revised Estimates, Funds Released, Audited Expenditure, Physical Outputs and Verified Ecological Outcomes Across Environmental and Sectoral Agencies',
    shortTitle: 'Environmental Agency Funding & Institutional Performance',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Priority Scoping — 23-Agency Fiscal Audit',
    temporalScope: '2000–2027',
    heroImage: '/images/governance-alamdar-hero.jpg',
    heroImageCaption: '7-stage budget-to-ecological-outcome performance audit across 23 J&K departments and conservation authorities',
    districts: JK_ALL_20_DISTRICTS_SCOPE,
    spatialFocus: '23 UT/Divisional/Municipal Institutions Across Jammu & Kashmir',
    coordinates: [34.0837, 74.7973],
    primaryDomainId: '18-environmental-governance',
    secondaryDomainIds: ['01-lakes-limnology', '09-forests-biodiversity', '15-solid-waste-sewage'],
    disciplineIds: ['public-finance', 'institutional-economics', 'econometrics', 'environmental-accounting', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Institutional Accountability', route: '/environmental-investigations/accountability', contributionNote: 'Cross-links 23 institutions with statutory mandates and right-of-reply status.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0039', 'KEW-INV-0045', 'KEW-INV-0052'],
    relatedSectoralCodes: ['KEW-SR-2026-95'],
    scopeDifferentiation: 'Audits agency-by-agency financial execution (BE→RE→Released→Audited→Outcome) across all 23 institutions rather than macro GSDP ratios (KEW-INV-0039) or staffing cadres alone (KEW-INV-0052).',
    centralQuestion: 'Across J&K’s 23 environmental and externality-relevant institutions, where does the chain from legislative Budget Allocation to measurable Ecological Outcome break down — funding inadequacy, late release, unspent surrenders, salary crowding-out, or ineffective intervention design?',
    scopingQuestions: [
      'What are the BE-to-RE compression rates, Q4 ("March rush") release shares, and unspent/parked fund balances across FEED, JKFD, DWP, JKPCC, DEERS, LCMA, WUCMA, CAMPA, Jal Shakti, HUDD, and SMC/JMC?',
      'Which agencies spend ~100% of allocations without improving ecological indicators, and which resource-constrained units achieve verified conservation gains?',
    ],
    executiveKeyFindings: [
      'Establishes a 23-institution audit inventory spanning core forestry/wildlife/pollution bodies, lake authorities (LCMA, WUCMA), water/urban bodies (Jal Shakti, HUDD, SMC/JMC, RDD), and development ministries (Tourism, Transport, Mining, Agriculture, Power, Disaster Management).',
      'CAG Financial Audit (2024–25) and Lake Conservation Audit (125068) confirm that financial utilization certificates alone cannot establish ecological performance when funds are parked, works are discontinued, or baseline monitoring is omitted.',
    ],
    callouts: [
      { label: 'Institutions in Audit Scope', value: '23', unit: 'Agencies', sourceTag: 'Mandate Verification Active' },
      { label: 'Fiscal Execution Chain', value: '7', unit: 'Stages', sourceTag: 'BE → Ecological Return' },
      { label: 'Audited Finance Baseline', value: '2024–25', unit: 'CAG Report', sourceTag: 'Report ID 125155' },
      { label: 'Current Budget Cycle', value: '2026–27', unit: 'BE Baseline', sourceTag: 'jakfinance.nic.in / PRS' },
    ],
    chronology: [
      { period: '2019–2020', eventTitle: 'Institutional Reorganization of J&K Environmental Bodies', documentedRecord: 'Transition of JKSPCB to JKPCC, LAWDA to LCMA, and PHE/I&FC to Jal Shakti under UT administrative rules.', sourceRef: 'REF-ECON-CAGFIN25', significance: 'Intervention' },
      { period: '2024–2025', eventTitle: 'CAG UT Financial & Conservation Performance Audits', documentedRecord: 'Audited appropriation variances, utilization gaps, and conservation authority execution deficiencies.', sourceRef: 'REF-ECON-CAGLAKE', significance: 'Audit / Judicial' },
    ],
    interventions: [
      { id: 'INT-0040-01', name: '23-Agency 7-Stage Budget-to-Ecological-Outcome Audit Ledger', period: '2000–2027', executingAgency: 'FEED, JKFD, DWP, JKPCC, DEERS, LCMA, WUCMA, CAMPA, Jal Shakti, HUDD, ULBs & Sectoral Depts', interventionType: 'Institutional Expenditure & Performance Audit', reportedScaleOrOutlay: 'Agency-wise Demands for Grants (Extraction Active)', status: 'Proposed', documentedOutcome: 'Tests spending-to-outcome elasticity β across agencies.' },
    ],
    disciplineFindings: [
      { disciplineId: 'institutional-economics', disciplineName: 'Institutional Economics', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: '7-stage budget execution variance & salary-vs-O&M ratio diagnostics', equationOrMetricUsed: 'Execution Fidelity = (Actual_operational / BE_operational) × (Outcome_verified / Output_planned)', empiricalFinding: 'Identifies how high revenue-establishment shares (₹80,640 cr UT-wide revenue vs ₹25,236 cr capital) can starve field monitoring and STP/WTP O&M.', uncertaintyAndLimitations: 'Mandates and administrative structures of each of the 23 bodies must be verified per financial year before attributing gaps.', verificationClass: 'Provisionally Supported' },
    ],
    assertions: [
      { suffix: '01', assertion: 'CAG Performance Audit on Dal and Wular conservation documented fund-utilization anomalies, discontinued watershed/catchment activities, and lack of baseline research/monitoring despite substantial financial outlays.', sourceCategory: 'Government Audit Records', classification: 'Documented', basis: 'CAG Audit Report ID 125068.', citationIds: ['REF-ECON-CAGLAKE'] },
      { suffix: '02', assertion: 'Agency-by-agency ratios of establishment salaries to field conservation/laboratory O&M across all 23 J&K institutions (FY 2020–27) require primary Demand-for-Grant and Appropriation Account extraction.', sourceCategory: 'Government Audit Records', classification: 'Unverified', basis: 'Detailed object-head schedules are not yet compiled into a unified public dataset.', citationIds: [], methodReq: 'Extract Object Heads (Salaries, Wages, O&M, Works, Grants-in-Aid, Machinery/Equipment) for each of the 23 institutions from FY 2020–27 Demands for Grants and CAG Finance Accounts.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Forest, Ecology and Environment Department & Subordinate Agencies', acronym: 'FEED / JKPCC / DEERS', mandate: 'Policy, budgetary coordination, pollution regulation, forest/wildlife conservation, and ecological monitoring.', ownership: 'Core Environmental Demands for Grants & CAMPA APOs', scientificResp: 'Linking annual Outcome Budget indicators to verified ambient biophysical metrics.', financialResp: 'Core environmental revenue & capital allocations', documentedFindings: 'Current departmental outcome disclosures report physical inputs (saplings, inspections, civil works) more consistently than independent ambient ecological improvements.', response: 'Clarification invited from FEED, JKPCC, DEERS, LCMA, and WUCMA on agency-wise BE, RE, Released, and Audited Actuals for FY 2020–26.', questions: ['What percentage of each agency’s annual expenditure funds non-salary field monitoring, laboratory reagents, and ecosystem O&M?'], corrective: 'Publish standardized 7-stage expenditure-to-ecological-outcome scorecards for all 23 institutions.' },
    ],
    unansweredQuestions: ['How frequently do Q4 (January–March) treasury releases delay seasonal ecological works such as winter sapling planting or autumn macrophyte harvesting?'],
    alternatives: [
      { title: 'Ecological Outcome-Linked Treasury Release & Multi-Year Conservation Carryover', mechanism: 'Align fund-release calendars with Himalayan biological/hydrological seasons and link renewal tranches to verified ecological KPIs rather than March expenditure rushes.', evidencePrecedent: 'CAG Conservation Audit recommendations & performance-informed budgeting reforms.', feasibilityNote: 'Eliminates off-season spending inefficiencies documented in lake and forestry programmes.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Align Conservation Fund Releases with Himalayan Ecological Seasons', spec: 'Release afforestation, watershed, and macrophyte-harvesting funds in Q1/Q2 matched to biological windows rather than Q4 fiscal year-end.', target: 'J&K Finance Dept, FEED, LCMA & WUCMA', justification: 'Directly addresses CAG-documented off-season spending (e.g., 57.8% off-season Dal de-weeding).', indicator: '>80% of seasonal conservation funds released prior to prescribed ecological operating windows.' },
    ],
    dataGaps: ['Verified object-head expenditure series (BE, RE, Released, Actual) for each of the 23 institutions across FY 2000–27.'],
    regulatoryLead: 'J&K General Financial Rules (GFR); CAG Appropriation Audit Standards; Environment (Protection) Act 1986.',
  }),

  // ── 32. KEW-INV-0041 — ECONOMICS OF LAKE & WETLAND RESTORATION ─────────────
  makeEconCharter({
    code: 'KEW-INV-0041',
    expansionNumber: 32,
    slug: 'economics-of-lake-and-wetland-restoration-jammu-kashmir',
    title: 'The Economics of Lake and Wetland Restoration in Jammu and Kashmir: Benefit–Cost Ratios, Capital-vs-Catchment Allocation and Audited Conservation Outcomes',
    subtitle: 'Evaluating Public Expenditure Efficiency Across Dal–Nigeen, Wular, Hokersar, Shallabugh, Haigam, Mansar and Surinsar Using Discounted Benefit–Cost and Cost-Effectiveness Analysis',
    shortTitle: 'Economics of Lake & Wetland Restoration',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Priority Scoping — Lacustrine BCR Audit',
    temporalScope: '1990–2027',
    heroImage: '/images/water-module/water-lake.jpg',
    heroImageCaption: 'Comparing cost per tonne of phosphorus/silt abated via catchment & tertiary STP works vs repetitive in-lake mechanical dredging/de-weeding',
    districts: ['Srinagar', 'Bandipora', 'Baramulla', 'Ganderbal', 'Budgam', 'Pulwama', 'Anantnag', 'Udhampur', 'Samba'],
    spatialFocus: 'Dal–Nigeen, Wular, Hokersar, Shallabugh, Haigam, Anchar, Manasbal, Mansar & Surinsar Basins',
    coordinates: [34.125, 74.865],
    primaryDomainId: '01-lakes-limnology',
    secondaryDomainIds: ['02-wetlands-floodplains', '18-environmental-governance'],
    disciplineIds: ['environmental-economics', 'ecological-economics', 'public-finance', 'limnology', 'wetland-ecology', 'environmental-engineering'],
    linkedKewModules: [
      { moduleName: 'Water Systems · Lakes', route: '/water-systems/lakes', contributionNote: 'Connects 521-lake registry and Dal/Wular profiles to conservation outlays.' },
      { moduleName: 'Water Systems · Wetlands', route: '/water-systems/wetlands', contributionNote: 'Supplies Ramsar wetland hydroperiod and flood-detention baselines.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0001', 'KEW-INV-0005', 'KEW-INV-0006', 'KEW-INV-0009', 'KEW-INV-0010', 'KEW-INV-0011', 'KEW-INV-0012', 'KEW-INV-0039'],
    relatedSectoralCodes: ['KEW-SR-2026-01', 'KEW-SR-2026-49', 'KEW-SR-2026-101'],
    scopeDifferentiation: 'Evaluates multi-lake comparative Benefit–Cost Ratios (BCR), lifecycle O&M liabilities, and marginal abatement cost curves across J&K lakes/wetlands rather than single-lake physical mechanisms (KEW-INV-0001/0010/0011).',
    centralQuestion: 'Across three decades of public expenditure on Dal, Wular, and Ramsar wetlands, what is the discounted Benefit–Cost Ratio (BCR) and unit abatement cost (₹/tonne silt or ₹/kg phosphorus permanently removed) of in-lake mechanical contracts versus upstream catchment stabilization and tertiary sewage treatment?',
    scopingQuestions: [
      'What share of cumulative LCMA and WUCMA expenditure funded recurring mechanical dredging, de-weeding, and fountain aeration versus permanent upstream check-dams, settling basins, and tertiary P-stripping?',
      'What is the flood-damage avoidance and fishery/recreation BCR of reconnecting Hokersar, Shallabugh, Haigam, and Wular floodplain storage?',
    ],
    executiveKeyFindings: [
      'CAG Audit Report 125068 provides hard financial-ecological anchors: in Dal Lake, ₹28.01 cr was spent on de-weeding during 2016–2022 with ₹16.18 cr (57.8%) incurred outside prescribed harvesting months, while key catchment and monitoring components lagged.',
      'Applies discounted BCR = [Σ B_t/(1+r)^t] / [Σ C_t/(1+r)^t] without assuming all past spending was wasted: tests counterfactual degradation alongside marginal cost-effectiveness of alternative interventions.',
    ],
    callouts: [
      { label: 'Audited Dal De-Weeding', value: '₹28.01', unit: 'cr (2016–22)', sourceTag: 'CAG Audit 125068' },
      { label: 'Off-Season Spend Share', value: '57.8%', unit: '(₹16.18 cr)', sourceTag: 'CAG Audit 125068' },
      { label: 'Kashmir Lake Registry', value: '521', unit: 'Lakes', sourceTag: 'KEW-INV-0009 Sync' },
      { label: 'Evaluation Metric', value: 'BCR & CE', unit: 'r = 3%–8%', sourceTag: '₹/kg P & ₹/t Silt' },
    ],
    chronology: [
      { period: '1997–2015', eventTitle: 'NLCP / Prime Minister’s Reconstruction Plan Lake Outlays', documentedRecord: 'Multi-hundred-crore capital allocations for Dal conservation, STPs, dredging, and rehabilitation.', sourceRef: 'REF-ECON-CAGLAKE', significance: 'Intervention' },
      { period: '2016–2025', eventTitle: 'PMDP Dal–Nigeen & Wular Action Plan + CAG Performance Audits', documentedRecord: 'CAG audited fund utilization, contract management, and bathymetric/water-quality outcomes across Dal and Wular.', sourceRef: 'REF-ECON-CAGLAKE', significance: 'Audit / Judicial' },
    ],
    interventions: [
      { id: 'INT-0041-01', name: 'Comparative Cost-Effectiveness & BCR Audit (LCMA, WUCMA & Ramsar Reserves)', period: '1997–2027', executingAgency: 'LCMA, WUCMA, DWP (Wetlands Division) & HUDD/UEED', interventionType: 'Lacustrine & Wetland Conservation Financing', reportedScaleOrOutlay: 'Multi-scheme NLCP, PMDP & UT Capex (₹28.01 cr de-weeding subset verified)', status: 'Ongoing', documentedOutcome: 'Tests unit cost of permanent P/sediment abatement across in-lake vs catchment interventions.' },
    ],
    disciplineFindings: [
      { disciplineId: 'ecological-economics', disciplineName: 'Ecological Economics', clusterName: 'Applied Environmental Sciences', methodologyApplied: 'Marginal Abatement Cost Curve (MACC) & discounted BCR across lake restoration technologies', equationOrMetricUsed: 'CE_P = NPV(C_capex + C_O&M) / ΔP_permanently_removed;  BCR = NPV(B) / NPV(C)', empiricalFinding: 'International Lake Biwa and European shallow-lake benchmarks show external P-cutoff and upstream sediment trapping yield durable trophic recovery where isolated dredging/aeration experience rapid 1–3 year rebound.', uncertaintyAndLimitations: 'Requires complete contract-wise capital and electricity O&M ledger from LCMA and WUCMA.', verificationClass: 'Documented' },
    ],
    assertions: [
      { suffix: '01', assertion: 'Between 2016 and 2022, ₹28.01 crore was expended on Dal Lake de-weeding, of which ₹16.18 crore (57.8%) occurred outside prescribed harvesting months and ₹11.83 crore (42.2%) within prescribed months.', sourceCategory: 'Government Audit Records', classification: 'Documented', basis: 'CAG Performance Audit on Conservation of Dal and Wular Lakes (Report 125068).', citationIds: ['REF-ECON-CAGLAKE'] },
      { suffix: '02', assertion: 'Full-lifecycle Benefit–Cost Ratios (BCR) comparing Dal/Wular mechanical dredging and aeration against Telbal/Erin/Madhumati watershed check-dams and tertiary phosphorus stripping require complete contract-level O&M and mass-balance records.', sourceCategory: 'Institutional DPR / EIA Filing', classification: 'Unverified', basis: 'Outfall orthophosphate removal and net bathymetric persistence series are not publicly consolidated.', citationIds: [], methodReq: 'Compile 1997–2026 LCMA/WUCMA capital + O&M outlays (deflated to 2026 INR) and divide by verified net MCM storage and tonnes of TP/TN abated.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Lake Conservation and Management Authority & Wular Conservation and Management Authority', acronym: 'LCMA & WUCMA', mandate: 'Integrated conservation, catchment treatment, bathymetric restoration, and water-quality recovery of Dal–Nigeen and Wular.', ownership: 'NLCP / PMDP / UT Lake Restoration Budgets', scientificResp: 'Publishing unit abatement cost (₹/m³ net silt retained; ₹/kg P removed) before renewing mechanical contracts.', financialResp: 'Capital & O&M lake restoration grants', documentedFindings: 'CAG Report 125068 highlighted weak linkage between contract expenditure and verified ecological recovery indicators.', response: 'Clarification invited from LCMA and WUCMA on cumulative 2000–2026 capital vs catchment expenditure shares and BCR evaluations.', questions: ['What is the verified 5-year bathymetric retention rate in dredged Dal and Wular sectors relative to annual tributary silt inflow?'], corrective: 'Mandate published Marginal Abatement Cost & BCR screening prior to tendering mechanical dredging, de-weeding, or fountain contracts.' },
    ],
    unansweredQuestions: ['What proportion of J&K’s 521 mapped Kashmir lakes and Jammu’s Mansar–Surinsar lakes receive zero dedicated conservation funding despite severe Dal-centric budget concentration?'],
    alternatives: [
      { title: 'Catchment-First & Tertiary Phosphorus Ordinance Portfolio Rebalancing', mechanism: 'Shift marginal capital from cosmetic fountains/off-season cutting into automated Telbal/Erin desilting O&M, littoral reedbed buffers, and chemical P-precipitation at existing STPs.', evidencePrecedent: 'Lake Biwa Shiga Prefecture Ordinance & CAG Report 125068.', feasibilityNote: 'Higher long-term BCR by attacking external nutrient/silt loading rather than recurring symptoms.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish Unit Nutrient & Sediment Abatement Cost Ledger for All LCMA/WUCMA Contracts', spec: 'Report ₹ spent perverified tonne of dry biomass/phosphorus exported and net m³ bathymetric gain retained after one snowmelt cycle.', target: 'LCMA, WUCMA & HUDD/FEED', justification: 'Subjects every mechanical lake contract to empirical cost-effectiveness scrutiny.', indicator: 'Public annual MACC & BCR table for Dal, Nigeen, Wular, and Ramsar wetlands.' },
    ],
    dataGaps: ['Consolidated 2000–2026 expenditure split across dredging, de-weeding, aeration, STPs, catchment works, and rehabilitation for LCMA and WUCMA.'],
    regulatoryLead: 'Wetlands (Conservation and Management) Rules 2017; Water Act 1974; CAG Performance Audit 125068.',
  }),

  // ── 33. KEW-INV-0042 — ECONOMIC COST OF ENVIRONMENTAL DEGRADATION ──────────
  makeEconCharter({
    code: 'KEW-INV-0042',
    expansionNumber: 33,
    slug: 'economic-cost-of-environmental-degradation-jammu-kashmir',
    title: 'The Economic Cost of Environmental Degradation in Jammu and Kashmir: Multi-Receptor Valuation, Uncertainty Bounds and Double-Counting Safeguards',
    subtitle: 'Assessing Observed and Modelled Economic Losses Across Air Pollution, Water Contamination, Wetland Conversion, Lake Eutrophication, Karewa Destruction, Forest Loss and Riverbed Mining',
    shortTitle: 'Economic Cost of Environmental Degradation',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Priority Scoping — 13-Domain Damage Valuation',
    temporalScope: '2000–2027',
    heroImage: '/images/earth-human-impact/ehii-karewa-land-transformation.jpg',
    heroImageCaption: 'Multi-receptor damage economics across 13 environmental degradation pathways with strict non-overlapping accounting boundaries',
    districts: JK_ALL_20_DISTRICTS_SCOPE,
    spatialFocus: 'All 20 J&K Districts (Urban Airsheds, Floodplains, Karewa Plateaus, Riverbeds & Rural Water Schemes)',
    coordinates: [33.95, 74.92],
    primaryDomainId: '18-environmental-governance',
    secondaryDomainIds: ['16-atmospheric-environment', '02-wetlands-floodplains', '10-mining-quarrying'],
    disciplineIds: ['environmental-economics', 'welfare-economics', 'environmental-epidemiology', 'risk-economics', 'resource-economics'],
    linkedKewModules: [
      { moduleName: 'Air Pollution Monitoring', route: '/environmental-monitoring/air-pollution', contributionNote: 'Supplies PM2.5 population exposure baselines for Cost-of-Illness sensitivity.' },
      { moduleName: 'Earth & Human Impact', route: '/earth-human-impact', contributionNote: 'Provides Karewa excavation, wetland loss, and mining spatial footprints.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0004', 'KEW-INV-0021', 'KEW-INV-0028', 'KEW-INV-0037', 'KEW-INV-0039', 'KEW-INV-0043'],
    relatedSectoralCodes: ['KEW-SR-2026-40', 'KEW-SR-2026-67'],
    scopeDifferentiation: 'Constructs a non-overlapping 13-domain economic damage ledger (COI, EAD, replacement cost, agricultural foregone NPV) distinct from biophysical cumulative stressor scoring (KEW-SR-2026-40).',
    centralQuestion: 'What are the annual observed and modelled economic costs imposed on Jammu & Kashmir’s households, public infrastructure, agriculture, fisheries, and healthcare system across 13 documented environmental degradation pathways — and which irreversible ecological/cultural losses transcend monetary valuation?',
    scopingQuestions: [
      'What are the lower-, central-, and upper-bound annual Cost-of-Illness (COI) and productivity losses from ambient PM2.5 exceedance, drinking-water contamination, and chronic corridor noise?',
      'What Expected Annual Flood Damage (EAD) increment is attributable to urban and Jhelum floodplain wetland infilling, and what perpetual agricultural NPV is lost when saffron/apple-bearing Karewas are excavated for earthfill?',
    ],
    executiveKeyFindings: [
      'Establishes rigorous valuation protocols across all 13 degradation categories (Dal eutrophication, Wular sedimentation, wetland conversion, forest degradation, Karewa destruction, glacier retreat, air pollution, noise, water contamination, biodiversity/pollinator decline, groundwater/spring depletion, soil erosion, riverbed mining).',
      'Enforces strict double-counting firewalls (e.g., never summing Wular flood-storage replacement cost with downstream Jhelum avoided flood damages for the same retention volume; keeping medical COI separate from VSL welfare scenarios) and reports non-monetizable heritage/species losses in physical terms.',
    ],
    callouts: [
      { label: 'Degradation Domains', value: '13', unit: 'Pathways', sourceTag: 'Double-Count Guarded' },
      { label: 'Valuation Bounds', value: '95% CI', unit: '& r = 3–8%', sourceTag: 'Sensitivity Required' },
      { label: 'Irreversible Assets', value: 'Physical', unit: 'Non-Monetary', sourceTag: 'Karewas & CR Taxa' },
      { label: 'Synthetic Estimates', value: '0', unit: 'Permitted', sourceTag: 'Phase 12 Governance' },
    ],
    chronology: [
      { period: '2013–2014', eventTitle: ' World Bank India Environmental Degradation Benchmark & Sept 2014 Jhelum Flood', documentedRecord: 'Established national Cost-of-Illness/VSL valuation methods and demonstrated catastrophic economic losses when Jhelum floodplain wetlands are occluded.', sourceRef: 'REF-ECON-SEEA', significance: 'Ecological Shift' },
      { period: '2026', eventTitle: 'KEW 13-Domain Environmental Damage Accounting Protocol', documentedRecord: 'Integrates biophysical exposure layers across air, water, noise, wetlands, Karewas, and riverbeds into a unified non-overlapping economic framework.', sourceRef: 'REF-ECON-FIN27', significance: 'Baseline' },
    ],
    interventions: [
      { id: 'INT-0042-01', name: '13-Domain Environmental Damage & Defensive Expenditure Valuation Matrix', period: '2000–2027', executingAgency: 'KEW-EIAI Environmental Economics Desk (Auditing Public & Private Receptor Costs)', interventionType: 'Economic Damage & Welfare Loss Accounting', reportedScaleOrOutlay: 'Evaluated as % of ₹3,15,822 cr FY27 GSDP once primary inputs are verified', status: 'Proposed', documentedOutcome: 'Separates observed repair/medical bills from modelled welfare losses.' },
    ],
    disciplineFindings: [
      { disciplineId: 'welfare-economics', disciplineName: 'Welfare Economics', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: 'Cost-of-Illness (COI), defensive household expenditure & production-function loss with explicit non-overlapping boundaries', equationOrMetricUsed: 'D_total = Σ_k [COI_k + ΔProd_k + C_repair,k]  (subject to Cov/Overlap_jk = 0)', empiricalFinding: 'Prevents inflated headline damage claims by partitioning direct budgetary repair/medical outlays from modelled welfare estimates and reporting confidence intervals.', uncertaintyAndLimitations: 'J&K-specific hospital episode costs, household RO/boiling spend, and bridge-scour repair bills require primary administrative/survey compilation.', verificationClass: 'Provisionally Supported' },
    ],
    assertions: [
      { suffix: '01', assertion: 'Valid economic valuation of environmental degradation in J&K must separate observed financial outlays (infrastructure repair, medical COI, water treatment) from modelled welfare scenarios, include discount-rate/VSL sensitivity bounds, and exclude overlapping ecosystem services.', sourceCategory: 'Technical Institute Report', classification: 'Documented', basis: 'UN SEEA Ecosystem Accounting (2021) and MoSPI EnviStats methodological rules.', citationIds: ['REF-ECON-SEEA'] },
      { suffix: '02', assertion: 'Aggregate rupee loss across all 13 degradation domains as a share of J&K’s ₹3,15,822 cr GSDP cannot be published as a single verified figure until domain-specific hospital, infrastructure-repair, and agricultural yield-loss datasets are extracted.', sourceCategory: 'Scientific Literature', classification: 'Unverified', basis: 'Preventing fabricated aggregate % GSDP damage claims prior to primary valuation.', citationIds: [], methodReq: 'Compile SKIMS/GMC morbidity unit costs, I&FC/PWD bridge-scour repair ledgers, and SKUAST-K saffron/apple Karewa net-return tables with Monte Carlo 95% uncertainty bounds.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Directorate of Economics & Statistics (DES J&K), Health & Medical Education Dept & PWD/I&FC', acronym: 'DES / H&ME / I&FC', mandate: 'Compiling UT economic statistics, hospital morbidity registries, and public infrastructure flood/scour damage accounts.', ownership: 'Statistical, Health & Infrastructure Damage Registries', scientificResp: 'Publishing disaggregated environmental morbidity and asset-damage statistics enabling reproducible damage accounting.', financialResp: 'Public healthcare & infrastructure reconstruction budgets', documentedFindings: 'Environmental damage costs are currently absorbed silently across health, disaster relief, bridge repair, and household budgets without consolidated attribution to upstream pollution or extraction.', response: 'Clarification invited on availability of anonymized waterborne/respiratory hospital-cost summaries and riverbed-scour infrastructure repair ledgers.', questions: ['What cumulative public expenditure was incurred between 2015 and 2026 to repair bridge piers, aprons, and irrigation intakes damaged by riverbed incision?'], corrective: 'Establish an annual J&K Environmental Damage & Defensive Expenditure Satellite Account.' },
    ],
    unansweredQuestions: ['How much do Kashmir and Jammu households spend out-of-pocket annually on domestic water purifiers, boiling fuel, bottled water, and winter air/respiratory care due to public environmental deficits?'],
    alternatives: [
      { title: 'Polluter-Pays & Resource-Depletion Internalisation Bonds', mechanism: 'Price verified downstream health and infrastructure repair costs into mining royalties, industrial consents, and construction EMP escrows.', evidencePrecedent: 'Environmental Compensation jurisprudence & OECD Polluter-Pays Principle.', feasibilityNote: 'Shifts degradation costs off households and general taxpayers onto originating activities.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Medium-Term (1–3 Years)', title: 'Compile Non-Overlapping 13-Domain Environmental Cost-of-Degradation Annex in J&K Economic Survey', spec: 'Report observed infrastructure/health costs alongside bounded welfare estimates and non-monetizable physical loss indicators.', target: 'DES J&K, FEED & Finance Department', justification: 'Reveals the true economic return of preventive environmental investment.', indicator: 'Dedicated Natural Capital & Environmental Damage chapter in J&K Economic Survey.' },
    ],
    dataGaps: ['J&K-specific Cost-of-Illness unit hospitalization/OPD datasets, household defensive water/air expenditure survey, and PWD/I&FC river-mining scour repair bills.'],
    regulatoryLead: 'UN SEEA Ecosystem Accounting (2021); MoSPI EnviStats; Environment (Protection) Act 1986.',
  }),

  // ── 34. KEW-INV-0043 — NATURAL CAPITAL ACCOUNTING FOR JAMMU & KASHMIR ──────
  makeEconCharter({
    code: 'KEW-INV-0043',
    expansionNumber: 34,
    slug: 'natural-capital-accounting-jammu-kashmir-un-seea-gsdp',
    title: 'Natural Capital Accounting for Jammu and Kashmir: UN SEEA Ecosystem Asset Accounts and Exploratory Environmentally Adjusted Economic Performance',
    subtitle: 'Testing Whether Jammu & Kashmir Is Becoming Economically Wealthier While Becoming Ecologically Poorer Across Ten Himalayan Natural Capital Assets (UN SEEA & MoSPI EnviStats Framework)',
    shortTitle: 'Natural Capital Accounting for Jammu & Kashmir',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Priority Scoping — UN SEEA Asset Accounts',
    temporalScope: '2000–2027',
    heroImage: '/images/earth-human-impact/ehii-cryosphere-glacier-station.jpg',
    heroImageCaption: 'UN SEEA physical and monetary ecosystem accounts across glaciers, lakes, wetlands, forests, Karewas, rivers, springs, biodiversity, alpine meadows, and atmosphere',
    districts: JK_ALL_20_DISTRICTS_SCOPE,
    spatialFocus: 'UT of Jammu & Kashmir (All 10 Natural Capital Asset Classes; Historical 2000–2019 State Accounts Normalized Separately)',
    coordinates: [34.16, 75.32],
    primaryDomainId: '18-environmental-governance',
    secondaryDomainIds: ['05-glaciers-cryosphere', '01-lakes-limnology', '09-forests-biodiversity', '04-springs-groundwater'],
    disciplineIds: ['environmental-accounting', 'ecological-economics', 'resource-economics', 'remote-sensing', 'gis', 'hydrology'],
    linkedKewModules: [
      { moduleName: 'Ecological Atlas', route: '/atlas', contributionNote: 'Provides spatial extent polygons for lakes, wetlands, glaciers, and forests.' },
      { moduleName: 'SDG Monitoring', route: '/environmental-monitoring/sdg-monitoring', contributionNote: 'Connects SEEA asset accounts with environmental SDG indicators.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0004', 'KEW-INV-0008', 'KEW-INV-0009', 'KEW-INV-0024', 'KEW-INV-0039', 'KEW-INV-0042'],
    relatedSectoralCodes: ['KEW-SR-2026-99', 'KEW-SR-2026-100'],
    scopeDifferentiation: 'Constructs formal UN SEEA opening/closing stock balance sheets across 10 J&K asset classes and tests exploratory GSDP_EA = GSDP − CFC − D_N − D_E against ₹3,15,822 cr nominal GSDP, advancing beyond high-level SDG indicator tracking (KEW-SR-2026-99).',
    centralQuestion: 'If Jammu & Kashmir’s nominal GSDP reaches ₹3,15,822 crore in FY 2026–27 while glaciers retreat, lakes eutrophy, wetlands contract, Karewas are excavated, and springs decline, is J&K achieving genuine sustainable wealth creation or financing conventional growth through unrecorded natural capital liquidation?',
    scopingQuestions: [
      'What are the opening stock (2000), additions, reductions, and closing stock (2026) in physical units across J&K’s 10 natural capital assets under UN SEEA Central Framework and Ecosystem Accounting?',
      'Where defensible monetary valuation data exist, how do natural resource depletion (D_N) and non-overlapping degradation (D_E) compare with annual GSDP growth in an exploratory GSDP_EA indicator?',
    ],
    executiveKeyFindings: [
      'India adopted the UN SEEA framework in 2018 through MoSPI’s EnviStats programme; applying SEEA to J&K prioritizes verifiable physical extent and condition accounts across all 10 Himalayan asset classes before applying monetary valuation.',
      'Defines GSDP_EA = GSDP − CFC − D_N − D_E strictly as an exploratory analytical indicator (never represented as an official MoSPI/DES Green GSDP statistic) with explicit double-counting and boundary rules.',
    ],
    callouts: [
      { label: 'Nominal GSDP (FY27 BE)', value: '₹3,15,822', unit: 'cr', sourceTag: 'Prior to D_N & D_E' },
      { label: 'SEEA Asset Classes', value: '10', unit: 'Ecosystem Stocks', sourceTag: 'Glaciers to Atmosphere' },
      { label: 'National Standard', value: '2018', unit: 'MoSPI EnviStats', sourceTag: 'UN SEEA Adopted' },
      { label: 'Adjusted Indicator', value: 'GSDP_EA', unit: 'Exploratory', sourceTag: 'GSDP − CFC − D_N − D_E' },
    ],
    chronology: [
      { period: '2018–2021', eventTitle: 'India MoSPI EnviStats SEEA Adoption & UN SEEA Ecosystem Accounting Standard', documentedRecord: 'MoSPI launched EnviStats environmental-economic accounts (2018) followed by UN Statistical Commission adoption of SEEA Ecosystem Accounting (2021).', sourceRef: 'REF-ECON-SEEA', significance: 'Baseline' },
      { period: '2026–2027', eventTitle: 'KEW 10-Asset J&K Natural Capital Balance Sheet Initiation', documentedRecord: 'Integrates KEW 521-lake registry, glacier inventories, FSI forest layers, Karewa change detection, and spring hydrographs into SEEA physical stock tables.', sourceRef: 'REF-ECON-FIN27', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-0043-01', name: '10-Asset UN SEEA Physical & Exploratory Monetary Balance Sheet for J&K', period: '2000–2027', executingAgency: 'DES J&K, DEERS, Forest Dept, Jal Shakti & MoSPI EnviStats Alignment', interventionType: 'Natural Capital Accounting Architecture', reportedScaleOrOutlay: 'Benchmarked against ₹3,15,822 cr FY 2026–27 GSDP', status: 'Proposed', documentedOutcome: 'Tracks net natural wealth change alongside conventional GSDP.' },
    ],
    disciplineFindings: [
      { disciplineId: 'environmental-accounting', disciplineName: 'Environmental Accounting (UN SEEA)', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: 'UN SEEA Ecosystem Extent, Condition & Physical/Monetary Service Flow Accounting', equationOrMetricUsed: 'Stock_closing = Stock_opening + Additions − Reductions;  GSDP_EA = GSDP − CFC − D_N − D_E', empiricalFinding: 'Demonstrates why conventional GSDP misclassifies Karewa earth excavation, riverbed gravel mining, and wetland land-conversion as positive construction value-added while omitting permanent asset liquidation.', uncertaintyAndLimitations: 'Exploratory GSDP_EA is not an official national-accounts aggregate and requires state/UT CFC and non-overlapping D_N, D_E estimates.', verificationClass: 'Documented' },
    ],
    assertions: [
      { suffix: '01', assertion: 'India adopted the UN System of Environmental-Economic Accounting (SEEA) in 2018 and publishes subnational environmental accounts through MoSPI’s EnviStats series covering land, water, forests, and ecosystem services.', sourceCategory: 'Technical Institute Report', classification: 'Documented', basis: 'MoSPI EnviStats publications and PIB disclosures.', citationIds: ['REF-ECON-SEEA'] },
      { suffix: '02', assertion: 'Conventional GSDP (estimated at ₹3,15,822 crore for J&K in FY 2026–27 BE) records output flows without deducting natural capital depreciation (glacier mass loss, wetland shrinkage, Karewa excavation, spring depletion).', sourceCategory: 'Technical Institute Report', classification: 'Documented', basis: 'System of National Accounts (SNA) vs UN SEEA accounting boundary definitions and J&K FY 2026–27 Budget.', citationIds: ['REF-ECON-FIN27', 'REF-ECON-SEEA'] },
      { suffix: '03', assertion: 'Complete 2000–2026 J&K physical and monetary closing-stock tables across all 10 SEEA asset classes and empirical computation of exploratory GSDP_EA require harmonized MoSPI/DES/DEERS multi-decadal asset series.', sourceCategory: 'Satellite & GIS Archive', classification: 'Unverified', basis: 'Requires cross-calibrated 2000 vs 2026 extent/condition rasters excluding post-2019 Ladakh area.', citationIds: [], methodReq: 'Compile 2000, 2010, 2019, and 2026 physical extent & condition tables strictly within post-2019 J&K UT boundaries and apply MoSPI EnviStats unit service valuations.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Directorate of Economics & Statistics (DES J&K) & Department of Ecology, Environment and Remote Sensing (DEERS)', acronym: 'DES & DEERS J&K', mandate: 'Compiling UT GSDP accounts, environmental statistics, and remote-sensing land/wetland/forest inventories.', ownership: 'UT Statistical & Geospatial Natural Capital Ledger', scientificResp: 'Co-producing annual UN SEEA / EnviStats Ecosystem Extent and Condition Accounts for J&K.', financialResp: 'Statistical & geospatial survey grants', documentedFindings: 'DEERS maintains remote-sensing inventories and DES compiles GSDP, but the two streams are not yet integrated into annual opening/closing natural capital balance sheets.', response: 'Clarification invited from DES J&K and DEERS on current collaboration with MoSPI EnviStats for UT-level SEEA ecosystem accounts.', questions: ['Which SEEA asset accounts (forest, water, land, wetland, mineral) have been compiled for J&K UT since 2019?'], corrective: 'Institutionalize annual J&K Natural Capital Physical & Ecosystem Service Accounts aligned with MoSPI EnviStats.' },
    ],
    unansweredQuestions: ['When Karewa tablelands or floodplain wetlands are converted into highways or real estate, what is the net balance-sheet change once lost perpetual ecosystem services are netted against one-time construction value-added?'],
    alternatives: [
      { title: 'Dual-Headline Economic Reporting (GSDP + Physical Natural Capital Stock Index)', mechanism: 'Report GSDP growth side-by-side with a 10-asset SEEA Physical Condition Index and exploratory GSDP_EA in every annual Economic Survey and Budget Speech.', evidencePrecedent: 'UK ONS Natural Capital Accounts & MoSPI EnviStats India.', feasibilityNote: 'Directly answers whether economic growth is depleting or sustaining ecological wealth.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish Opening & Closing Physical SEEA Accounts for J&K Lakes, Wetlands, Glaciers, Forests & Karewas', spec: 'Establish physical extent and condition accounts first across all 20 districts before layering monetary valuations.', target: 'DES J&K, DEERS, JKFD & MoSPI Interface', justification: 'Physical SEEA accounts are objective, satellite-verifiable, and immune to valuation price disputes.', indicator: 'First 10-asset Physical Natural Capital Account published for J&K UT.' },
    ],
    dataGaps: ['UT-disaggregated consumption of fixed capital (CFC), harmonized 2000–2026 Karewa/spring stock series, and MoSPI J&K ecosystem service unit values.'],
    regulatoryLead: 'UN SEEA Central Framework (2012) & Ecosystem Accounting (2021); MoSPI EnviStats Protocol.',
  }),

  // ── 35. KEW-INV-0044 — DEVELOPMENT EXPENDITURE EXTERNALITIES ───────────────
  makeEconCharter({
    code: 'KEW-INV-0044',
    expansionNumber: 35,
    slug: 'environmental-externalities-government-development-expenditure-jk',
    title: 'Environmental Externalities of Public Development Expenditure in Jammu and Kashmir: Cost-Internalisation Audit Across Highways, Hydropower, Mining, Urbanisation and Tourism',
    subtitle: 'Evaluating Whether J&K’s ₹25,236 Crore Capital Outlay and Sectoral Subsidies Internalise Environmental Mitigation Costs or Transfer Damages to Communities and Future Budgets',
    shortTitle: 'Environmental Externalities of Development Expenditure',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Priority Scoping — Capex Externality Audit',
    temporalScope: '2000–2027',
    heroImage: '/images/earth-human-impact/ehii-karewa-land-transformation.jpg',
    heroImageCaption: 'Auditing environmental mitigation internalisation across 9 public and state-supported development sectors',
    districts: JK_ALL_20_DISTRICTS_SCOPE,
    spatialFocus: 'Highway Corridors, Hydropower Cascades, Riverbed/Karewa Extraction Zones, Urbanising Floodplains & Resort Authorities',
    coordinates: [33.52, 75.18],
    primaryDomainId: '07-infrastructure-development',
    secondaryDomainIds: ['08-hydropower-dams', '10-mining-quarrying', '18-environmental-governance'],
    disciplineIds: ['environmental-economics', 'public-finance', 'environmental-impact-assessment', 'geotechnical-engineering', 'resource-economics'],
    linkedKewModules: [
      { moduleName: 'Earth & Human Impact · Infrastructure', route: '/earth-human-impact/energy-infrastructure', contributionNote: 'Maps linear highway, tunnel, and hydropower corridors.' },
      { moduleName: 'Earth & Human Impact · Mining', route: '/earth-human-impact/mining-extraction', contributionNote: 'Tracks riverbed and Karewa extraction footprints.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0004', 'KEW-INV-0007', 'KEW-INV-0036', 'KEW-INV-0039', 'KEW-INV-0042'],
    relatedSectoralCodes: ['KEW-SR-2026-25', 'KEW-SR-2026-28', 'KEW-SR-2026-29'],
    scopeDifferentiation: 'Examines the public-finance internalisation gap (EMP budget share vs externalized remediation liabilities across ₹25,236 cr FY27 Capital Outlay and 9 economic activities), complementing physical corridor fragmentation (KEW-INV-0036).',
    centralQuestion: 'When government capital budgets and sectoral policies finance highways, hydropower, mining, urban expansion, tourism, transport, and chemical-intensive horticulture, are full environmental mitigation costs funded inside project DPRs or externalized onto downstream ecosystems, households, and future public budgets?',
    scopingQuestions: [
      'What percentage of total civil DPR cost is ring-fenced and demonstrably spent on Environmental Management Plans (muck containment, bio-engineered slopes, fish ladders, e-flows, dust suppression, mine reclamation) across major J&K capital projects?',
      'How do Geology & Mining minor-mineral royalties and DMF collections compare with public PWD/I&FC expenditure on repairing scoured bridges, embankments, and irrigation intakes?',
    ],
    executiveKeyFindings: [
      'FY 2026–27 budgets ₹25,236 crore in Capital Outlay (22.18% of total expenditure); without strict EMP cost internalisation, high-volume mountain earthworks, floodplain construction, and mineral extraction generate ecological liabilities exceeding Tier-1 conservation budgets.',
      'Audits all 9 externality channels: tourism, highway construction, mining, urban development, transportation, horticulture, hydropower, construction, and industrial development.',
    ],
    callouts: [
      { label: 'FY 2026–27 Capital Outlay', value: '₹25,236', unit: 'cr (BE)', sourceTag: 'J&K Budget 2026–27' },
      { label: 'Externality Sectors', value: '9', unit: 'Sectors Audited', sourceTag: 'EMP Internalisation' },
      { label: 'Core Test', value: 'MSC vs MPC', unit: 'MEC Gap', sourceTag: 'Social vs Project Cost' },
      { label: 'Royalty vs Scour Test', value: 'DMF / G&M', unit: 'vs I&FC Repair', sourceTag: 'Riverbed Mining Audit' },
    ],
    chronology: [
      { period: '2010–2026', eventTitle: 'Expansion of Four-Lane Mountain Highways, Tunnels, Hydropower & Riverbed e-Auctions', documentedRecord: 'Accelerated linear infrastructure, Karewa earthfill sourcing, and minor-mineral block auctions across J&K.', sourceRef: 'REF-ECON-FIN27', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-0044-01', name: 'Capital Outlay EMP Cost-Internalisation & Royalty-vs-Damage Audit', period: '2010–2027', executingAgency: 'PWD (R&B), NHAI/NHIDCL, JKPDC, Geology & Mining, HUDD, Tourism & APD', interventionType: 'Development Externality Fiscal Screening', reportedScaleOrOutlay: '₹25,236 cr FY 2026–27 UT Capital Outlay + Central Infrastructure Capex', status: 'Ongoing', documentedOutcome: 'Tests whether EMP budgets cover real ecological restoration costs.' },
    ],
    disciplineFindings: [
      { disciplineId: 'environmental-economics', disciplineName: 'Environmental Economics', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: 'Social Marginal Cost (MSC = MPC + MEC) & EMP internalisation auditing', equationOrMetricUsed: 'Internalisation Ratio = C_EMP,verified / (C_EMP,verified + MEC_uncompensated)', empiricalFinding: 'Where civil tenders omit haulage to designated muck yards or bio-engineering slope stabilization to lower bid prices, apparent capital savings reappear as disaster-relief and lake-dredging liabilities.', uncertaintyAndLimitations: 'Requires project-wise DPR EMP schedules, CAMPA NPV transfers, and DMF utilization ledgers.', verificationClass: 'Provisionally Supported' },
    ],
    assertions: [
      { suffix: '01', assertion: 'J&K’s FY 2026–27 Budget allocates ₹25,236 crore to Capital Outlay, requiring systematic environmental screening to determine what fraction incorporates enforceable EMP budgets versus generating unmitigated downstream externalities.', sourceCategory: 'Government Audit Records', classification: 'Documented', basis: 'J&K Finance Dept Budget 2026–27 & PRS Analysis.', citationIds: ['REF-ECON-FIN27', 'REF-ECON-PRS27'] },
      { suffix: '02', assertion: 'Net fiscal balance between J&K minor-mineral riverbed/Karewa royalty receipts (plus DMF funds) and public expenditure on scour-damaged bridges, canals, and river restoration remains unverified pending consolidated G&M and PWD/I&FC accounts.', sourceCategory: 'Government Audit Records', classification: 'Unverified', basis: 'Requires cross-departmental reconciliation.', citationIds: [], methodReq: 'Compare 2015–2026 District Mineral Foundation + royalty collections against audited I&FC/PWD river-scour repair contracts across all 20 districts.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Geology & Mining Dept, PWD (R&B), JKPDC & Planning Development & Monitoring Dept', acronym: 'G&M / PWD / JKPDC', mandate: 'Executing public capital infrastructure, mineral leasing, DMF administration, and DPR appraisal.', ownership: 'UT Capital Outlay (₹25,236 cr BE FY27) & Mineral Concessions', scientificResp: 'Incorporating full lifecycle EMP, slope bio-engineering, e-flow, and mine-closure costs into DPR appraisals.', financialResp: 'Capital works & DMF/EMP escrow accounts', documentedFindings: 'Project DPR appraisals routinely evaluate civil financial viability without deducting downstream siltation, flood-buffer, or Karewa asset losses.', response: 'Clarification invited on district-wise DMF collections/expenditures and average EMP percentage in approved J&K infrastructure DPRs.', questions: ['What is the cumulative balance and ecological restoration spend of District Mineral Foundations (DMF) across J&K’s 20 districts?'], corrective: 'Require mandatory Shadow Environmental Pricing & Escrowed EMP Performance Bonds in all DPRs above ₹25 crore.' },
    ],
    unansweredQuestions: ['Are CAMPA NPV payments and EMP line items treated as one-time clearance fees while ongoing slope/siltation maintenance remains unfunded?'],
    alternatives: [
      { title: 'Escrowed Performance-Linked EMP Bonds & Shadow Natural-Capital DPR Screening', mechanism: 'Hold 5%–10% of project civil cost in an escrowed EMP account released only upon independent 3-year post-construction verification of slope stability, muck containment, and mine rehabilitation.', evidencePrecedent: 'International Green Public Procurement & IAIA EMP performance bonding.', feasibilityNote: 'Internalises externalities at design stage without slowing compliant infrastructure.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Audit District Mineral Foundation (DMF) & Infrastructure EMP Escrow Utilization Across J&K', spec: 'Publish district-wise minor-mineral royalties, DMF balances, and verified mine-rehabilitation outlays alongside bridge/intake scour repair costs.', target: 'Geology & Mining Dept, Finance Dept & I&FC', justification: 'Tests whether mineral extraction is a net fiscal contributor or net public liability.', indicator: 'Annual 20-district Royalty-vs-Rehabilitation & Infrastructure Scour Ledger published.' },
    ],
    dataGaps: ['DPR-level EMP budget vs actual spend across major road/tunnel/hydropower projects and 20-district DMF financial statements.'],
    regulatoryLead: 'EIA Notification 2006; MMDR Act (DMF Rules); CAMPA Act 2016; J&K Minor Mineral Concession Rules.',
  }),

  // ── 36. KEW-INV-0045 — POLLUTION CONTROL FUNDING & EFFECTIVENESS ───────────
  makeEconCharter({
    code: 'KEW-INV-0045',
    expansionNumber: 36,
    slug: 'pollution-control-funding-regulatory-effectiveness-jkpcc-ncap',
    title: 'Pollution Control Financing, Laboratory Capacity and Regulatory Deterrence in Jammu and Kashmir: JKPCC, NCAP and Municipal Enforcement Audit',
    subtitle: 'Evaluating J&K Pollution Control Committee Funding, Consent Fee Utilization, NABL Laboratory Readiness, CAAQMS/NANMN Density and NCAP Clean-Air Expenditure Cost-Effectiveness',
    shortTitle: 'Pollution Control Funding & Regulatory Effectiveness',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Investigation Charter',
    temporalScope: '2010–2027',
    heroImage: '/images/env-monitoring/kashmir-drinking-water-lab.jpg',
    heroImageCaption: 'Auditing JKPCC scientific funding, laboratory accreditation, and NCAP PM2.5 abatement cost-effectiveness',
    districts: JK_ALL_20_DISTRICTS_SCOPE,
    spatialFocus: 'JKPCC Central/Regional Laboratories, Srinagar & Jammu NCAP Non-Attainment Cities & Industrial Estates',
    coordinates: [34.072, 74.812],
    primaryDomainId: '18-environmental-governance',
    secondaryDomainIds: ['16-atmospheric-environment', '14-industrial-craft-pollution'],
    disciplineIds: ['public-finance', 'institutional-economics', 'environmental-economics', 'environmental-chemistry', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Air Pollution Monitoring', route: '/environmental-monitoring/air-pollution', contributionNote: 'Tracks CAAQMS vs hybrid ground-sensor coverage gaps across districts.' },
      { moduleName: 'Noise Pollution', route: '/environmental-monitoring/noise-pollution', contributionNote: 'Documents NANMN Class-1 continuous acoustic monitoring gaps.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0028', 'KEW-INV-0030', 'KEW-INV-0031', 'KEW-INV-0040', 'KEW-INV-0052'],
    relatedSectoralCodes: ['KEW-SR-2026-13', 'KEW-SR-2026-95'],
    scopeDifferentiation: 'Focuses specifically on regulatory financing, consent-fee/environmental-compensation revenues, laboratory capex/O&M, and NCAP ₹/µg-PM2.5 cost-effectiveness rather than source chemistry alone (KEW-INV-0028).',
    centralQuestion: 'Does JKPCC and municipal pollution-control financing provide sufficient NABL-accredited laboratories, reference monitoring stations, and field inspection capacity — and do NCAP outlays target high-impact winter PM2.5 combustion sources or primarily cosmetic civil works?',
    scopingQuestions: [
      'How do JKPCC’s annual consent-fee receipts and environmental compensation recoveries compare with its expenditure on NABL laboratory accreditation, GC-MS/ICP-MS consumables, and CAAQMS/NANMN stations?',
      'Under NCAP in Srinagar and Jammu, what percentage of funds went to road-paving/fountains/sweepers versus winter biomass-heating alternatives, brick-kiln zig-zag conversion, and emissions enforcement?',
    ],
    executiveKeyFindings: [
      'Evaluates whether regulatory underperformance stems from inadequate budget allocations, unspent NCAP/consent balances, laboratory equipment/reagent deficits, or inspection vacancies.',
      'Applies cost-effectiveness metric: ₹ expended per 1 µg/m³ verified reduction in population-weighted annual and winter PM2.5.',
    ],
    chronology: [
      { period: '2019–2026', eventTitle: 'NCAP Non-Attainment City Grants (Srinagar & Jammu) & JKPCC Transition', documentedRecord: 'Central PRANA/NCAP and 15th Finance Commission air-quality grants released to Srinagar and Jammu alongside JKSPCB→JKPCC reorganization.', sourceRef: 'REF-ECON-CAGFIN25', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-0045-01', name: 'JKPCC Budget, Consent Revenue & NCAP Cost-Effectiveness Audit', period: '2019–2027', executingAgency: 'J&K Pollution Control Committee (JKPCC), SMC & JMC', interventionType: 'Regulatory & Clean-Air Financing', reportedScaleOrOutlay: 'PRANA/NCAP & JKPCC Budget Heads (Extraction Active)', status: 'Proposed', documentedOutcome: 'Tests alignment of NCAP spending with seasonal PM2.5 source apportionment.' },
    ],
    disciplineFindings: [
      { disciplineId: 'environmental-economics', disciplineName: 'Environmental Economics', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: 'Abatement cost-effectiveness across PM10 dust vs PM2.5 combustion interventions', equationOrMetricUsed: 'CE_air = Expenditure_NCAP / ΔPM2.5_pop_weighted', empiricalFinding: 'Spending clean-air grants predominantly on summer road paving yields low winter PM2.5 health benefits where inversion episodes are driven by residential heating, kilns, open burning, and diesel exhaust.', uncertaintyAndLimitations: 'Requires activity-wise PRANA/SMC/JMC utilization breakdown.', verificationClass: 'Provisionally Supported' },
    ],
    assertions: [
      { suffix: '01', assertion: 'Activity-wise NCAP utilization in Srinagar and Jammu and JKPCC’s annual ratio of consent/compensation receipts to NABL laboratory and CAAQMS/NANMN O&M expenditure require authenticated PRANA and Demand-for-Grant extraction.', sourceCategory: 'Government Audit Records', classification: 'Unverified', basis: 'Line-item NCAP and JKPCC laboratory accounts are pending compilation.', citationIds: [], methodReq: 'Extract PRANA portal sanction/utilization tables for Srinagar & Jammu and JKPCC annual financial & NABL scope records (2019–2026).' },
    ],
    accountability: [
      { suffix: '01', institution: 'J&K Pollution Control Committee & Municipal Corporations (SMC / JMC)', acronym: 'JKPCC / SMC / JMC', mandate: 'Enforcement of Water Act 1974, Air Act 1981, Noise Rules 2000, and NCAP clean-air action plans.', ownership: 'JKPCC Regulatory Funds & NCAP/15th FC Clean-Air Grants', scientificResp: 'Operating NABL-accredited laboratories and continuous reference air/noise/effluent networks across all districts.', financialResp: 'Consent fees, environmental compensation & NCAP grants', documentedFindings: 'Most districts outside Srinagar and Jammu still lack reference-grade CAAQMS and continuous NANMN noise stations.', response: 'Clarification invited from JKPCC on NABL accreditation status of regional labs, consent-fee reserves, and district CAAQMS expansion plans.', questions: ['What is JKPCC’s unspent reserve of consent fees and Environmental Compensation funds, and how much is earmarked for NABL labs and district CAAQMS?'], corrective: 'Ring-fence consent and Environmental Compensation receipts for NABL laboratory accreditation and 20-district reference air/water/noise stations.' },
    ],
    unansweredQuestions: ['What share of industrial estates in J&K have continuously operational CETPs funded by polluter user-charges?'],
    alternatives: [
      { title: 'PM2.5 Source-Weighted NCAP Budgeting & Ring-Fenced Lab Modernization Fund', mechanism: 'Allocate NCAP funds strictly in proportion to peer-reviewed winter/summer PM2.5 health-weighted source shares and dedicate 100% of Environmental Compensation to monitoring/remediation.', evidencePrecedent: 'CPCB Environmental Compensation Guidelines & PRANA performance grading.', feasibilityNote: 'Maximizes public-health DALYs averted per rupee spent.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish JKPCC Annual Financial, Consent-Fee & Environmental Compensation Ledger', spec: 'Disclose annual revenues, laboratory capex/reagent spend, NABL scope, and district station uptime.', target: 'JKPCC & FEED J&K', justification: 'Establishes whether monitoring gaps stem from funding scarcity or unutilized regulatory reserves.', indicator: 'Public annual JKPCC financial & laboratory capacity report.' },
    ],
    dataGaps: ['JKPCC annual income-expenditure accounts (2015–2026) and PRANA project-level expenditure logs for Srinagar and Jammu.'],
    regulatoryLead: 'Water Act 1974; Air Act 1981; Environment (Protection) Act 1986; National Clean Air Programme (NCAP).',
  }),

  // ── 37. KEW-INV-0046 — FOREST & WILDLIFE CONSERVATION ECONOMICS ────────────
  makeEconCharter({
    code: 'KEW-INV-0046',
    expansionNumber: 37,
    slug: 'forest-wildlife-campa-conservation-economics-jammu-kashmir',
    title: 'Forest, CAMPA and Wildlife Conservation Economics in Jammu and Kashmir: Survival-Adjusted Afforestation Costs and Protected-Area Financing Adequacy',
    subtitle: 'Auditing Compensatory Afforestation (CAMPA) Survival Rates, Territorial & Social Forestry Outlays, Protected-Area Funding per km² and Corridor Eco-Development Economics',
    shortTitle: 'Forest & Wildlife Conservation Economics',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Investigation Charter',
    temporalScope: '2000–2027',
    heroImage: '/images/protected-network.png',
    heroImageCaption: 'Evaluating survival-adjusted native afforestation costs and ₹/km² protected-area financing across J&K',
    districts: JK_ALL_20_DISTRICTS_SCOPE,
    spatialFocus: 'J&K Forest Divisions, CAMPA Plantation Polygons, National Parks (Dachigam, Kishtwar, Kazinag, Salim Ali Archive) & Wildlife Sanctuaries',
    coordinates: [34.14, 75.04],
    primaryDomainId: '09-forests-biodiversity',
    secondaryDomainIds: ['06-alpine-mountain-ecology', '18-environmental-governance'],
    disciplineIds: ['conservation-economics', 'public-finance', 'environmental-accounting', 'conservation-biology', 'remote-sensing'],
    linkedKewModules: [
      { moduleName: 'Protected Areas Network', route: '/protected-network', contributionNote: 'Links National Parks, Wildlife Sanctuaries, and Corridors to conservation financing.' },
      { moduleName: 'Forest Ecosystems', route: '/biodiversity/forest-ecosystems', contributionNote: 'Provides forest guild and canopy-density baselines.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0013', 'KEW-INV-0016', 'KEW-INV-0018', 'KEW-INV-0039', 'KEW-INV-0040'],
    relatedSectoralCodes: ['KEW-SR-2026-17', 'KEW-SR-2026-54'],
    scopeDifferentiation: 'Evaluates conservation finance efficiency — survival-adjusted native tree cost C_eff, CAMPA NPV governance, and ₹/km² PA management adequacy — complementing Dachigam biological population studies (KEW-INV-0013/0016).',
    centralQuestion: 'What is Jammu & Kashmir’s verified 5-year survival-adjusted cost per native tree under CAMPA and departmental afforestation, and is Department of Wildlife Protection operational funding per km² adequate to secure Hangul, Markhor, Snow Leopard, and Ramsar wetland habitats?',
    scopingQuestions: [
      'How much forest land has been diverted in J&K since 2010, what CAMPA NPV/compensatory funds were collected and released under Annual Plans of Operation (APOs), and what 5-year native sapling survival rate is verified on geo-tagged polygons?',
      'What is the operational non-salary conservation outlay per km² across Dachigam, Overa-Aru, Kishtwar High Altitude NP, Kazinag, and J&K’s Wetland Reserves?',
    ],
    executiveKeyFindings: [
      'Replaces misleading input metrics ("millions of seedlings planted") with survival-adjusted native restoration cost: C_eff = Outlay_total / (N_planted × S_native,5yr).',
      'Examines JKFD, DWP, Social Forestry, Soil & Water Conservation, Forest Protection Force, SFRI, Biodiversity Council, and J&K CAMPA as an integrated forestry-wildlife fiscal cluster.',
    ],
    chronology: [
      { period: '2016–2026', eventTitle: 'CAMPA Act 2016 Implementation & Post-2019 J&K Forest Diversion / APO Cycles', documentedRecord: 'Institutionalized UT CAMPA public-account transfers and e-Green Watch geo-tagged compensatory plantation reporting.', sourceRef: 'REF-ECON-RBI-FC', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-0046-01', name: 'J&K CAMPA APO, Departmental Afforestation & Protected-Area ₹/km² Audit', period: '2010–2027', executingAgency: 'JKFD, CAMPA J&K, DWP, SFD, SWCD, FPF, SFRI & JKBC', interventionType: 'Forest & Wildlife Conservation Financing', reportedScaleOrOutlay: 'Forest Demand + Off-Budget CAMPA APOs (Extraction Active)', status: 'Proposed', documentedOutcome: 'Measures 5-year canopy survival and PA habitat viability per crore spent.' },
    ],
    disciplineFindings: [
      { disciplineId: 'conservation-economics', disciplineName: 'Conservation Economics', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: 'Survival-adjusted restoration unit-cost & PA management adequacy benchmarking', equationOrMetricUsed: 'C_eff = Outlay_total / (N_planted × S_native,5yr)', empiricalFinding: 'Low 5-year survival or exotic monoculture selection multiplies the true economic cost per functional native tree by 3×–5× relative to nominal nursery/planting unit rates.', uncertaintyAndLimitations: 'Requires e-Green Watch polygon coordinates and independent third-party survival audits.', verificationClass: 'Provisionally Supported' },
    ],
    assertions: [
      { suffix: '01', assertion: 'Evaluating afforestation expenditure by nominal seedlings planted rather than 5-year surviving native trees overstates physical conservation output whenever post-planting protection and moisture maintenance are underfunded.', sourceCategory: 'Technical Institute Report', classification: 'Documented', basis: 'UN SEEA Ecosystem Condition standards and CAG CAMPA audit methodology.', citationIds: ['REF-ECON-SEEA', 'REF-ECON-RBI-FC'] },
      { suffix: '02', assertion: 'Division-wise 5-year native sapling survival rates under J&K CAMPA APOs and non-salary ₹/km² operational expenditure across J&K National Parks and Sanctuaries remain unverified pending APO and Demand-for-Grant extraction.', sourceCategory: 'Government Audit Records', classification: 'Unverified', basis: 'Requires e-Green Watch & DWP divisional financial disclosures.', citationIds: [], methodReq: 'Overlay J&K CAMPA e-Green Watch plantation polygons with multi-year Sentinel-2 NDVI/canopy series and extract DWP non-salary field budgets per PA.' },
    ],
    accountability: [
      { suffix: '01', institution: 'J&K CAMPA, Forest Department & Department of Wildlife Protection', acronym: 'CAMPA / JKFD / DWP', mandate: 'Compensatory afforestation, native forest regeneration, protected-area management, and human-wildlife conflict mitigation.', ownership: 'Forest/Wildlife Demands & CAMPA Public Account', scientificResp: 'Publishing geo-tagged 3-year and 5-year survival audits and species composition (native vs exotic) for all plantations.', financialResp: 'CAMPA NPV funds & territorial/wildlife grants', documentedFindings: 'Greater Dachigam corridor connectivity and alpine pasture eco-development face recurring operational funding constraints relative to civil infrastructure outlays.', response: 'Clarification invited from J&K CAMPA and DWP on annual APO actuals, third-party survival audit scores, and PA-wise non-salary budgets.', questions: ['What is the verified 5-year survival rate of native broadleaf/conifer species across J&K CAMPA plantations since 2019?'], corrective: 'Tie 40% of plantation budgets to 5-year verified native survival maintenance and establish a dedicated Hangul Corridor Eco-Development Fund.' },
    ],
    unansweredQuestions: ['Are CAMPA funds inadvertently used for routine civil buildings, vehicles, or fencing in lieu of genuine ecological restoration of degraded watersheds?'],
    alternatives: [
      { title: '5-Year Survival-Escrowed Native Restoration & Pastoralist PES Contracts', mechanism: 'Fund multi-year community/pastoralist protection of natural regeneration and alpine corridors paid against verified satellite/plot habitat indicators.', evidencePrecedent: 'Costa Rica FONAFIFO PES & Himachal Pradesh Eco-Development models.', feasibilityNote: 'Higher ecological survival and lower conflict than one-off contractor planting.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Mandate Public Geo-Tagged 5-Year Native Survival Reporting for All J&K Afforestation Schemes', spec: 'Publish polygon KMLs, species lists, outlay, and independent year-1, year-3, and year-5 survival percentages.', target: 'J&K CAMPA, JKFD & Social Forestry Dept', justification: 'Converts afforestation accounting from input counting to verified ecosystem asset creation.', indicator: '100% of CAMPA & SFD sites >=1 ha published with geo-tagged survival rates.' },
    ],
    dataGaps: ['J&K CAMPA APO sanctioned vs utilized ledgers (2019–2026), third-party survival audit reports, and PA-wise DWP operational budgets.'],
    regulatoryLead: 'Compensatory Afforestation Fund (CAMPA) Act 2016; Wild Life (Protection) Act 1972; Forest (Conservation) Act 1980.',
  }),

  // ── 38. KEW-INV-0047 — CLIMATE ADAPTATION FINANCING & VULNERABILITY ────────
  makeEconCharter({
    code: 'KEW-INV-0047',
    expansionNumber: 38,
    slug: 'climate-adaptation-financing-vulnerability-jammu-kashmir',
    title: 'Climate Adaptation Financing versus Cryospheric and Hydro-Meteorological Vulnerability in Jammu and Kashmir: SAPCC Costing, Mainstreaming and Financing Gaps',
    subtitle: 'Assessing Public Investment in Cryospheric Water Security, Agricultural Climate Resilience, Extreme-Weather Preparedness and State/UT Action Plan on Climate Change (SAPCC) Execution',
    shortTitle: 'Climate Adaptation Financing & Vulnerability',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Priority Scoping — Climate Finance Audit',
    temporalScope: '2010–2027',
    heroImage: '/images/earth-human-impact/ehii-cryosphere-glacier-station.jpg',
    heroImageCaption: 'Evaluating climate adaptation financing adequacy across Western Himalayan cryosphere, orchards, and extreme-weather corridors',
    districts: JK_ALL_20_DISTRICTS_SCOPE,
    spatialFocus: 'Glaciated Headwaters (Lidder, Sindh, Chenab), Rainfed/Karewa Agrarian Belts & Urban Flood/Heat Corridors',
    coordinates: [34.21, 75.48],
    primaryDomainId: '17-climate-compound-hazards',
    secondaryDomainIds: ['05-glaciers-cryosphere', '13-agriculture-horticulture', '18-environmental-governance'],
    disciplineIds: ['climate-economics', 'public-finance', 'risk-economics', 'climatology', 'hydrology'],
    linkedKewModules: [
      { moduleName: 'Hazard Intelligence Hub', route: '/hazard-intelligence', contributionNote: 'Supplies GLOF, cloudburst, drought, and extreme-weather exposure layers.' },
      { moduleName: 'Water Systems · Glaciers', route: '/water-systems/glaciers', contributionNote: 'Provides Kolahoi, Thajiwas, and regional cryosphere recession baselines.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0008', 'KEW-INV-0017', 'KEW-INV-0039', 'KEW-INV-0051'],
    relatedSectoralCodes: ['KEW-SR-2026-41', 'KEW-SR-2026-71', 'KEW-SR-2026-75'],
    scopeDifferentiation: 'Audits SAPCC climate financing requirements vs actual budget releases and National Adaptation Fund / NMHS inflows, complementing physical glaciology and extreme-weather climatology (KEW-SR-2026-41/75).',
    centralQuestion: 'How does Jammu & Kashmir’s verified public climate-adaptation expenditure compare with the costed priorities of the J&K Action Plan on Climate Change (SAPCC) and the escalating economic exposure of irrigation, horticulture, hydropower, and settlements to elevation-dependent warming?',
    scopingQuestions: [
      'What were the costed multi-year financial requirements in J&K’s SAPCC versus actual funds mobilized from the UT Budget, National Adaptation Fund for Climate Change (NAFCC), NMHS, and multilateral partners?',
      'Are district-level climate vulnerability indices guiding capital allocations across J&K’s 20 districts?',
    ],
    executiveKeyFindings: [
      'Applies Net Adaptation Value NPV_adapt = Σ [E(Damage_unmitigated,t) − E(Damage_adapted,t) − C_adapt,t] / (1+r)^t across cryospheric water storage, hail/frost orchard protection, springshed recharge, and heat/flood resilience.',
      'Tests whether climate action plans remain unfunded policy documents disconnected from annual Finance Department budget ceilings.',
    ],
    chronology: [
      { period: '2013–2026', eventTitle: 'J&K SAPCC Cycles, NAFCC Projects & Himalayan Climate Vulnerability Assessments', documentedRecord: 'Formulation and revision of J&K climate action priorities across water, agriculture, forests, habitats, and disaster risk.', sourceRef: 'REF-ECON-FIN27', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-0047-01', name: 'J&K SAPCC Costed Requirement vs Verified Budgetary & NAFCC Release Audit', period: '2014–2027', executingAgency: 'DEERS (Climate Cell), Finance Dept, Jal Shakti, APD/Horticulture & DMRRR', interventionType: 'Climate Adaptation Public Finance', reportedScaleOrOutlay: 'SAPCC Costed Portfolio vs UT/Central Releases (Extraction Active)', status: 'Ongoing', documentedOutcome: 'Quantifies the climate adaptation financing gap EFD_climate.' },
    ],
    disciplineFindings: [
      { disciplineId: 'climate-economics', disciplineName: 'Climate Economics', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: 'SAPCC budget tagging & avoided climate-damage NPV evaluation', equationOrMetricUsed: 'EFD_climate = max(0, R_SAPCC,t − A_climate,t)', empiricalFinding: 'Himalayan cryosphere and spring recession impose non-linear late-summer water deficits; proactive springshed/storage/micro-irrigation adaptation costs a fraction of unmitigated crop and power losses.', uncertaintyAndLimitations: 'Requires authenticated revised J&K UT SAPCC budget tables and NAFCC/PFMS release logs.', verificationClass: 'Provisionally Supported' },
    ],
    assertions: [
      { suffix: '01', assertion: 'Ratio of verified annual climate-adaptation releases (UT Budget + Central NAFCC/NMHS) to costed J&K SAPCC mission requirements across 20 districts remains unverified pending DEERS Climate Cell and Finance Department reconciliation.', sourceCategory: 'Institutional DPR / EIA Filing', classification: 'Unverified', basis: 'Consolidated SAPCC budget-tracking tables are not yet published in annual budget documents.', citationIds: [], methodReq: 'Obtain current J&K UT SAPCC mission-wise financial schedule from DEERS and cross-reconcile with FY 2020–27 Demand actuals and PFMS NAFCC releases.' },
    ],
    accountability: [
      { suffix: '01', institution: 'DEERS (UT Nodal Agency for Climate Change) & J&K Finance Department', acronym: 'DEERS / Finance J&K', mandate: 'Coordinating J&K Action Plan on Climate Change (SAPCC), mobilizing national/international climate finance, and mainstreaming adaptation across departments.', ownership: 'J&K SAPCC Portfolio & Climate Budget Tagging', scientificResp: 'Tracking district vulnerability reduction and physical adaptation outcomes per rupee spent.', financialResp: 'UT adaptation allocations & NAFCC/NMHS project grants', documentedFindings: 'J&K’s FY 2026–27 budget does not yet publish a dedicated Climate Adaptation & Resilience Budget Statement mapping Demands to SAPCC missions.', response: 'Clarification invited from DEERS and Finance Department on total SAPCC costed outlay vs verified releases for 2020–2026.', questions: ['How much funding has J&K mobilized under NAFCC, NMHS, and bilateral/multilateral climate windows since 2019, and what are the verified project outcomes?'], corrective: 'Introduce Rio-marker / SAPCC Climate Budget Tagging in the J&K Annual Financial Statement.' },
    ],
    unansweredQuestions: ['What dedicated public funding exists for continuous mass-balance telemetry on benchmark Kashmir and Kishtwar glaciers?'],
    alternatives: [
      { title: 'Vulnerability-Weighted District Climate Adaptation Grant Window', mechanism: 'Earmark a dedicated capital-outlay window allocated across J&K’s 20 districts using composite cryospheric, drought/spring, flood, and agricultural climate-risk indices.', evidencePrecedent: 'Odisha/Assam/Kerala Climate Budget Statements & UNDP Climate Finance Frameworks.', feasibilityNote: 'Connects SAPCC directly to annual treasury allocations.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish Mission-Wise J&K SAPCC Financing Gap & Implementation Ledger', spec: 'Disclose costed requirement, sanctioned budget, released funds, and physical adaptation metrics for every SAPCC mission.', target: 'DEERS J&K & Finance Department', justification: 'Makes climate adaptation commitments fiscally auditable.', indicator: 'Annual SAPCC Financial & Physical Progress Report published online.' },
    ],
    dataGaps: ['Authenticated UT SAPCC mission-wise costed tables and NAFCC/NMHS project release & completion records.'],
    regulatoryLead: 'National Action Plan on Climate Change (NAPCC) & J&K SAPCC; Disaster Management Act 2005.',
  }),

  // ── 39. KEW-INV-0048 — DRINKING WATER INVESTMENT & PUBLIC HEALTH ECONOMICS ─
  makeEconCharter({
    code: 'KEW-INV-0048',
    expansionNumber: 39,
    slug: 'drinking-water-investment-public-health-economics-jammu-kashmir',
    title: 'Drinking Water Investment, Filtration O&M Financing and Public Health Economics in Jammu and Kashmir: Cost-Effectiveness of Safe Tap Water',
    subtitle: 'Evaluating Jal Jeevan Mission and Jal Shakti Capital Outlays, O&M Disinfection/Laboratory Budgets, Household Defensive Expenditure and Avoided Waterborne Disease Burden',
    shortTitle: 'Drinking Water Investment & Public Health Economics',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Priority Scoping — Water Health Economics',
    temporalScope: '2010–2027',
    heroImage: '/images/env-monitoring/kashmir-drinking-water-lab.jpg',
    heroImageCaption: 'Evaluating public health return on investment (DALYs & COI averted) from WTP filtration, O&M chlorination, and springshed protection',
    districts: JK_ALL_20_DISTRICTS_SCOPE,
    spatialFocus: 'Urban & Rural Water Supply Schemes, WTPs, WQMIS Laboratories & Source Catchments Across All 20 J&K Districts',
    coordinates: [34.148, 74.838],
    primaryDomainId: '04-springs-groundwater',
    secondaryDomainIds: ['03-rivers-hydrology', '18-environmental-governance'],
    disciplineIds: ['public-finance', 'welfare-economics', 'environmental-epidemiology', 'environmental-engineering', 'environmental-microbiology'],
    linkedKewModules: [
      { moduleName: 'Drinking Water Sources', route: '/water-systems/drinking-water-sources', contributionNote: 'Links WTPs and raw intakes to investment and O&M audits.' },
      { moduleName: 'Springs Directory', route: '/water-systems/springs', contributionNote: 'Connects gravity spring protection costs with avoided pumping/treatment outlays.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0021', 'KEW-INV-0022', 'KEW-INV-0023', 'KEW-INV-0024', 'KEW-INV-0025', 'KEW-INV-0039'],
    relatedSectoralCodes: ['KEW-SR-2026-53'],
    scopeDifferentiation: 'Quantifies the fiscal-to-health return on investment — pipe/WTP capex vs O&M reagent/lab funding, household boiling/purifier defensive costs, and averted waterborne COI — complementing physical/microbial tap-water audits (KEW-INV-0021..0025).',
    centralQuestion: 'Have billions of rupees invested in Jal Jeevan Mission and Jal Shakti water infrastructure been matched by adequate operational funding for filtration media, continuous chlorination, NABL laboratory testing, and upstream catchment protection — and what is the public-health Benefit–Cost Ratio of closing the remaining potability gap?',
    scopingQuestions: [
      'What is the ratio of JJM/Jal Shakti capital expenditure on pipe/tap installation to recurring revenue O&M expenditure on alum/chlorine reagents, filter-bed backwashing, winter freeze repairs, and WQMIS laboratory testing?',
      'What annual medical Cost-of-Illness (acute diarrhoeal disease, hepatitis A/E, enteric fever) and household defensive filtration/boiling expenditure is averted per ₹ crore of verified BIS IS 10500 compliance?',
    ],
    executiveKeyFindings: [
      'Uses the historical March 2013 CAG audit (341 schemes supplying unfiltered water to 1.609 million people across 7 divisions) strictly as an historical benchmark to evaluate the economic efficiency of post-2013 WTP and JJM capital spending.',
      'Highlights a classic public-finance risk: rapid capital expansion of household tap connections without commensurate Pani Samiti / departmental O&M financing risks asset slippage and persistent household health costs.',
    ],
    callouts: [
      { label: '2013 Historical Baseline', value: '341', unit: 'Unfiltered Schemes', sourceTag: 'CAG Mar 2013 (1.609M Pop)' },
      { label: 'Economic Metric', value: '₹ / DALY', unit: '& BCR_water', sourceTag: 'WHO / BIS 10500 Potability' },
      { label: 'Core Fiscal Ratio', value: 'Capex : O&M', unit: 'Reagents & Labs', sourceTag: 'Jal Shakti Demand Audit' },
      { label: 'Scope', value: '20', unit: 'J&K Districts', sourceTag: 'Urban + Rural JJM' },
    ],
    chronology: [
      { period: '2013', eventTitle: 'CAG Historical Public Water Supply Audit Baseline', documentedRecord: 'Documented 341 unfiltered schemes serving 1.609M residents across 7 audited divisions (historical baseline, not current status).', sourceRef: 'REF-ECON-CAGFIN25', significance: 'Audit / Judicial' },
      { period: '2019–2027', eventTitle: 'Jal Jeevan Mission (JJM) Capital Rollout & Post-Commissioning O&M Transition', documentedRecord: 'Massive central + UT capital investment in rural FHTCs and rapid-sand WTPs requiring sustainable O&M financing.', sourceRef: 'REF-ECON-FIN27', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-0048-01', name: 'Jal Shakti & JJM Capital-to-O&M Balance & Public Health BCR Audit', period: '2013–2027', executingAgency: 'Jal Shakti Department J&K, JJM Mission Directorate & Pani Samitis', interventionType: 'Drinking Water Infrastructure & Health Finance', reportedScaleOrOutlay: 'JJM Central/UT Shares + Jal Shakti Revenue O&M Heads', status: 'Ongoing', documentedOutcome: 'Evaluates cost per continuously potable BIS 10500 household connection.' },
    ],
    disciplineFindings: [
      { disciplineId: 'welfare-economics', disciplineName: 'Welfare Economics', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: 'Avoided Cost-of-Illness (COI) + averted household defensive water-treatment expenditure', equationOrMetricUsed: 'BCR_WTP = NPV(ΔCOI_waterborne + ΔE_boiling_RO) / NPV(C_WTP_capex + C_O&M)', empiricalFinding: 'Safe municipal/JJM filtration and chlorination consistently rank among the highest-BCR public investments globally (BCR > 3–8), provided recurring O&M reagents and source protection are funded.', uncertaintyAndLimitations: 'Requires Jal Shakti object-head split between establishment wages and chemical/filtration O&M.', verificationClass: 'Documented' },
    ],
    assertions: [
      { suffix: '01', assertion: 'Without dedicated recurring O&M budgets for coagulants, chlorine dosing, filter media replacement, and NABL laboratory reagents, capital outlays on piped water networks cannot guarantee BIS IS 10500 public-health benefits.', sourceCategory: 'Technical Institute Report', classification: 'Documented', basis: 'CAG water-supply audit principles and environmental engineering lifecycle costing.', citationIds: ['REF-ECON-CAGFIN25', 'REF-ECON-SEEA'] },
      { suffix: '02', assertion: 'District-wise J&K expenditure per household receiving year-round BIS IS 10500 compliant tap water and the resulting reduction in waterborne disease Cost-of-Illness require linked Jal Shakti O&M and IDSP health datasets.', sourceCategory: 'Government Audit Records', classification: 'Unverified', basis: 'Requires cross-linking PFMS/Jal Shakti financial actuals with WQMIS and IDSP surveillance.', citationIds: [], methodReq: 'Extract 2019–2026 Jal Shakti Capex vs Reagent/Lab O&M outlays per district and estimate panel DiD association with IDSP acute diarrhoeal/hepatitis incidence.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Jal Shakti Department & J&K Jal Jeevan Mission Directorate', acronym: 'Jal Shakti / JJM J&K', mandate: 'Planning, financing, constructing, and maintaining safe drinking water supply and quality surveillance across J&K.', ownership: 'Jal Shakti Budget Demand & JJM SNA Funds', scientificResp: 'Ensuring 100% filtration/disinfection O&M and accredited WQMIS laboratory verification.', financialResp: 'Water-supply capital, O&M, and 15th FC tied water grants', documentedFindings: 'Capital FHTC coverage metrics are widely publicized, whereas per-scheme O&M chemical/energy expenditure and post-commissioning slippage rates are rarely disclosed.', response: 'Clarification invited from Jal Shakti Department on annual non-salary O&M allocation per WTP and long-term post-JJM O&M financing rules.', questions: ['What is the annual per-MLD operational allocation for coagulants, disinfection, filter media, and WQMIS laboratory testing across J&K’s 20 districts?'], corrective: 'Ring-fence a statutory minimum O&M & Source-Protection allocation per commissioned WTP/JJM scheme.' },
    ],
    unansweredQuestions: ['How much capital and pumping energy could J&K save by investing in gravity karst/Karewa springshed recharge protection vs high-head river pumping schemes?'],
    alternatives: [
      { title: 'Springshed Natural Infrastructure + Ring-Fenced WTP Chemical/Lab O&M Escrow', mechanism: 'Combine low-cost upstream springshed protection (avoiding pumping/turbidity costs) with ring-fenced 15th FC / tariff O&M escrows for uninterrupted WTP disinfection and lab testing.', evidencePrecedent: 'NITI Aayog Himalayan Springshed Protocol & WHO Water Safety Plan economics.', feasibilityNote: 'Delivers superior reliability at lower lifecycle energy and treatment cost.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Separate Chemical, Filtration & Laboratory O&M Line Items from Wage Heads in Jal Shakti Budget', spec: 'Create dedicated non-divertible budget sub-heads for WTP disinfection reagents, filter media, and NABL lab consumables.', target: 'Jal Shakti Dept & J&K Finance Dept', justification: 'Prevents operational treatment consumables from being crowded out by establishment costs.', indicator: 'Zero WTP disinfection or WQMIS lab stock-outs across all 20 districts.' },
    ],
    dataGaps: ['Jal Shakti non-salary O&M object-head actuals (2015–2026), JJM O&M sustainability accounts, and district IDSP waterborne COI data.'],
    regulatoryLead: 'BIS IS 10500:2012; Jal Jeevan Mission Operational Guidelines; 15th Finance Commission Tied Water Grants.',
  }),

  // ── 40. KEW-INV-0049 — SOLID WASTE & SEWAGE EXPENDITURE EFFICIENCY ─────────
  makeEconCharter({
    code: 'KEW-INV-0049',
    expansionNumber: 40,
    slug: 'solid-waste-sewage-management-expenditure-efficiency-jk',
    title: 'Urban and Rural Sanitation Expenditure Efficiency in Jammu and Kashmir: Lifecycle Cost per MLD Treated Sewage and Tonne Processed Solid Waste',
    subtitle: 'Auditing HUDD, UEED, Municipal Corporation (SMC/JMC), Smart City, AMRUT and SBM-Grameen Outlays Against Verified Nutrient Removal, Sewer Connectivity and Landfill Leachate Containment',
    shortTitle: 'Solid Waste & Sewage Expenditure Efficiency',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Investigation Charter',
    temporalScope: '2010–2027',
    heroImage: '/images/env-monitoring/sewage-treatment-plant-stp.jpg',
    heroImageCaption: 'Lifecycle cost-effectiveness audit of STPs, trunk sewers, legacy dumpsite bio-mining, and rural waste assets across J&K',
    districts: JK_ALL_20_DISTRICTS_SCOPE,
    spatialFocus: 'Srinagar (Achan, Brari Nambal, Dal STPs), Jammu (Kot Bhalwal, Bhagwati Nagar STPs), ULBs, Tourist Towns & Rural Panchayats',
    coordinates: [34.118, 74.789],
    primaryDomainId: '15-solid-waste-sewage',
    secondaryDomainIds: ['01-lakes-limnology', '03-rivers-hydrology', '18-environmental-governance'],
    disciplineIds: ['public-finance', 'environmental-economics', 'environmental-engineering', 'environmental-chemistry', 'institutional-economics'],
    linkedKewModules: [
      { moduleName: 'Sewage & Wastewater', route: '/environmental-monitoring/sewage-wastewater', contributionNote: 'Supplies STP capacity, outfall, and discharge monitoring context.' },
      { moduleName: 'Solid Waste Monitoring', route: '/environmental-monitoring/solid-waste', contributionNote: 'Tracks landfill stress, dumping hotspots, and processing gaps.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0001', 'KEW-INV-0012', 'KEW-INV-0039', 'KEW-INV-0041', 'KEW-INV-0050'],
    relatedSectoralCodes: ['KEW-SR-2026-33', 'KEW-SR-2026-34'],
    scopeDifferentiation: 'Evaluates lifecycle capital + O&M cost per kg of BOD/nitrogen/phosphorus removed and per tonne of scientifically processed waste across HUDD/UEED/SMC/JMC/RDD, distinct from facility-level engineering inventories.',
    centralQuestion: 'Across AMRUT, SBM-Urban, SBM-Grameen, Smart City, and UT sanitation budgets, what is the actual rupee cost per MLD of sewage treated to NGT/CPCB nutrient standards and per tonne of municipal waste scientifically processed without wetland/groundwater leachate contamination?',
    scopingQuestions: [
      'How many crores of STP capital assets operate below hydraulic capacity due to missing lateral house-sewer connections, stormwater dilution, or unpaid electricity/O&M bills — and what would retrofitting tertiary phosphorus removal cost?',
      'What has been spent on Achan (Srinagar), Kot Bhalwal (Jammu), town dumpsite bio-mining, and rural SBM segregation sheds versus verified diversion from open dumping and leachate treatment?',
    ],
    executiveKeyFindings: [
      'Evaluates the "stranded STP capex" phenomenon where treatment plants are built without complete household sewer connections or tertiary nutrient stripping, discharging orthophosphate into Dal, Jhelum, Anchar, and Tawi.',
      'Includes rural SBM-Grameen greywater/plastic-management sheds under RDD to verify post-construction operationality across mountain panchayats.',
    ],
    chronology: [
      { period: '2015–2026', eventTitle: 'AMRUT, SBM 1.0/2.0, Smart City & NGT Solid/Liquid Waste Directives', documentedRecord: 'Substantial central and UT sanitation grants paired with NGT environmental-compensation scrutiny on legacy waste and untreated sewage gaps.', sourceRef: 'REF-ECON-CAGFIN25', significance: 'Audit / Judicial' },
    ],
    interventions: [
      { id: 'INT-0049-01', name: 'STP Nutrient-Abatement & Municipal/Rural SWM Lifecycle Expenditure Audit', period: '2015–2027', executingAgency: 'HUDD, UEED, SMC, JMC, ULB Directorates & RDD J&K', interventionType: 'Sanitation & Wastewater Public Finance', reportedScaleOrOutlay: 'HUDD/RDD Demands + AMRUT/SBM/15th FC Grants (Extraction Active)', status: 'Proposed', documentedOutcome: 'Computes ₹/kg pollution load abated and % functional rural/urban assets.' },
    ],
    disciplineFindings: [
      { disciplineId: 'environmental-engineering', disciplineName: 'Environmental Engineering', clusterName: 'Applied Environmental Sciences', methodologyApplied: 'Lifecycle Cost Analysis (LCCA) normalized by verified pollutant mass removed', equationOrMetricUsed: 'LCC_pollutant = NPV(Capex_plant + Capex_sewer + O&M_15yr) / Σ Mass_BOD_N_P_removed', empiricalFinding: 'Measuring sanitation spending by "installed MLD" or "vehicles/sheds procured" conceals low effective pollutant removal when house connections, cold-climate biological kinetics, or leachate plants are underfunded.', uncertaintyAndLimitations: 'Requires plant-wise inflow/outflow lab logs, energy bills, and ULB/RDD contract ledgers.', verificationClass: 'Provisionally Supported' },
    ],
    assertions: [
      { suffix: '01', assertion: 'Plant-wise lifecycle cost per kg of BOD and orthophosphate removed across J&K STPs and verified leachate/bio-mining efficiency per crore spent at Achan, Kot Bhalwal, and ULB dumpsites require authenticated HUDD/UEED/SMC/JMC technical-financial records.', sourceCategory: 'Government Audit Records', classification: 'Unverified', basis: 'Consolidated plant-level O&M and mass-balance efficiency accounts are pending public release.', citationIds: [], methodReq: 'Compile 2018–2026 capital + electricity/reagent O&M spend and JKPCC inlet/outlet BOD, COD, TN, TP series for every STP and landfill leachate plant in J&K.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Housing & Urban Development Dept (HUDD / UEED), SMC, JMC & Rural Development Dept', acronym: 'HUDD / UEED / SMC / JMC / RDD', mandate: 'Urban sewerage, STP operation, municipal solid waste processing, legacy dumpsite remediation, and rural sanitation.', ownership: 'AMRUT, SBM-U 2.0, SBM-G 2.0 & UT Municipal Budgets', scientificResp: 'Disclosing real-time STP capacity utilization, outlet nutrient concentrations, and leachate quality.', financialResp: 'Urban & rural sanitation capital and tied 15th FC grants', documentedFindings: 'Untreated sewage generation-to-treatment gaps and legacy wetland-margin waste leachate remain primary drivers of river and lake eutrophication.', response: 'Clarification invited from HUDD, UEED, SMC, JMC, and RDD on STP utilization rates, tertiary P-removal costs, and operational % of rural SBM segregation sheds.', questions: ['What is the exact sewage generation (MLD) vs connected inflow vs tertiary-treated outflow across Srinagar, Jammu, and major J&K towns in 2026?'], corrective: 'Prioritize last-mile house-sewer connections, cold-climate tertiary P-stripping, and verified leachate treatment before non-essential urban beautification works.' },
    ],
    unansweredQuestions: ['What environmental compensation liabilities have been levied or ring-fenced under NGT solid/liquid waste orders in J&K, and how have those funds been utilized?'],
    alternatives: [
      { title: 'Performance-Based DBOT/O&M Contracts Linked to Verified Outlet Nutrient & Leachate Standards', mechanism: 'Link contractor O&M payments to continuous online effluent monitoring (OCEMS) compliance for BOD, TN, TP, and faecal coliform rather than flat monthly fees.', evidencePrecedent: 'Hybrid Annuity Model (HAM) Namami Gange & Lake Biwa tertiary STP standards.', feasibilityNote: 'Aligns financial payouts directly with verified pollution removal.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Mandate Public OCEMS & Cost-per-MLD Dashboard for All J&K STPs and Leachate Plants', spec: 'Publish daily hydraulic inflow, kWh consumed, O&M spend, and outlet BOD/N/P alongside sewer connection progress.', target: 'HUDD, UEED, LCMA, SMC, JMC & JKPCC', justification: 'Eliminates stranded sanitation capital and unmonitored bypass discharges.', indicator: '100% of J&K STPs reporting verified daily inflow and monthly nutrient mass-balance.' },
    ],
    dataGaps: ['Plant-by-plant STP Capex/O&M/inflow/nutrient ledger, Achan & Kot Bhalwal remediation accounts, and RDD rural asset functionality audit.'],
    regulatoryLead: 'Solid Waste Management Rules 2016; Water Act 1974; NGT Sewage & Legacy Waste Orders.',
  }),

  // ── 41. KEW-INV-0050 — TOURISM REVENUE VS RESTORATION COSTS ────────────────
  makeEconCharter({
    code: 'KEW-INV-0050',
    expansionNumber: 41,
    slug: 'tourism-revenue-versus-environmental-restoration-costs-jk',
    title: 'Tourism Fiscal Revenues, Economic Multipliers and Environmental Restoration Liabilities Across Jammu and Kashmir’s Fragile Destinations',
    subtitle: 'Comparing Direct Public Fiscal Receipts and GSDP Contributions from Tourism Against Peak-Season Wastewater, Solid Waste, Alpine Meadow Degradation and Waterbody Restoration Costs',
    shortTitle: 'Tourism Revenue vs Environmental Restoration Costs',
    priority: 'Critical',
    status: 'scoping_review',
    statusLabel: 'Priority Scoping — Net Tourism Fiscal Audit',
    temporalScope: '2010–2027',
    heroImage: '/images/sectoral-eia/eia-tourism-carrying-capacity.jpg',
    heroImageCaption: 'Destination-level net environmental-fiscal accounting across Dal–Nigeen, Gulmarg, Pahalgam–Lidder–Sheshnag, Sonamarg, and Jammu pilgrimage/hill circuits',
    districts: ['Srinagar', 'Baramulla', 'Anantnag', 'Ganderbal', 'Budgam', 'Shopian', 'Reasi', 'Udhampur', 'Ramban', 'Kathua'],
    spatialFocus: 'Dal–Nigeen, Gulmarg (GDA), Pahalgam–Sheshnag (PDA), Sonamarg (SDA), Doodhpathri, Yusmarg, Patnitop & Katra/Vaishno Devi Corridors',
    coordinates: [34.048, 74.385],
    primaryDomainId: '12-tourism-pilgrimage',
    secondaryDomainIds: ['06-alpine-mountain-ecology', '01-lakes-limnology', '18-environmental-governance'],
    disciplineIds: ['environmental-economics', 'public-finance', 'ecological-economics', 'environmental-impact-assessment', 'limnology'],
    linkedKewModules: [
      { moduleName: 'Sectoral EIA · Tourism', route: '/sectoral-eia/sectors/tourism', contributionNote: 'Supplies visitor carrying-capacity and alpine resort ecological baselines.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0001', 'KEW-INV-0002', 'KEW-INV-0012', 'KEW-INV-0039', 'KEW-INV-0044', 'KEW-INV-0053'],
    relatedSectoralCodes: ['KEW-SR-2026-01', 'KEW-SR-2026-05', 'KEW-SR-2026-06', 'KEW-SR-2026-07', 'KEW-SR-2026-08'],
    scopeDifferentiation: 'Computes the destination-by-destination fiscal balance (public tax/entry/TDA receipts vs public waste, sewage, road-congestion, and ecosystem restoration bills), extending physical carrying-capacity dossiers (KEW-SR-2026-01..08).',
    centralQuestion: 'Across Jammu & Kashmir’s flagship urban, subalpine, and alpine destinations, do public fiscal revenues generated by tourism cover the peak-season wastewater, solid-waste backhaul, traffic/air, and ecological restoration costs imposed on fragile ecosystems — or is high-volume tourism implicitly subsidized through natural capital depletion?',
    scopingQuestions: [
      'What are the annual revenues and promotional vs environmental-infrastructure expenditures of Tourism Department and resort Tourism Development Authorities (GDA, PDA, SDA, etc.)?',
      'What is the marginal public cost per peak-season visitor-day for sewage treatment, solid-waste backhaul, water supply, and meadow/lake restoration in Dal–Nigeen, Gulmarg, Pahalgam–Sheshnag, and Sonamarg?',
    ],
    executiveKeyFindings: [
      'Distinguishes private gross tourism turnover and livelihood benefits from net public fiscal receipts and uncompensated ecological restoration liabilities.',
      'Tests whether Tourism Development Authorities reinvest local entry/development fees into tertiary STPs, pack-out waste logistics, and carrying-capacity enforcement or primarily into additional concrete infrastructure.',
    ],
    callouts: [
      { label: 'Core Accounting Test', value: 'Net Fiscal', unit: 'Rev − Eco Cost', sourceTag: 'Destination Balance Sheet' },
      { label: 'Target Authorities', value: 'JKTD + TDAs', unit: 'GDA/PDA/SDA+', sourceTag: 'Promo vs Sanitation Split' },
      { label: 'Peak Stress Metric', value: '₹ / Visitor', unit: 'Abatement Cost', sourceTag: 'Alpine & Lake Basins' },
      { label: 'Policy Lever', value: 'Eco-Levy', unit: 'Ring-Fenced', sourceTag: 'Carrying-Capacity Fund' },
    ],
    chronology: [
      { period: '2012–2026', eventTitle: 'Multi-Million Visitor Surges & NGT/High Court Scrutiny of Resort Sanitation', documentedRecord: 'Rapid growth in valley, alpine, and pilgrimage footfall outpacing decentralized tertiary sewage and solid-waste capacity in GDA, PDA, SDA, and Dal basins.', sourceRef: 'REF-ECON-FIN27', significance: 'Ecological Shift' },
    ],
    interventions: [
      { id: 'INT-0050-01', name: 'Destination-Wise Tourism Revenue vs Environmental Infrastructure & Restoration Audit', period: '2015–2027', executingAgency: 'Tourism Dept J&K, GDA, PDA, SDA, SASB/SMVDSB Interface, LCMA & ULBs', interventionType: 'Tourism Fiscal-Ecological Balance Audit', reportedScaleOrOutlay: 'Tourism Demand (Promotional vs Eco-Infrastructure Capex/O&M)', status: 'Ongoing', documentedOutcome: 'Quantifies unrecovered environmental cost per visitor-day.' },
    ],
    disciplineFindings: [
      { disciplineId: 'environmental-economics', disciplineName: 'Environmental Economics', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: 'Destination net social benefit & marginal congestion/pollution externality pricing', equationOrMetricUsed: 'NSB_tourism = VA_local + Tax_public − C_infra_O&M − D_ecological', empiricalFinding: 'High-altitude subalpine/alpine ecosystems (2,400–3,800 m ASL) have cold-temperature microbial kinetics and short recovery windows, making waste backhaul and tertiary sewage treatment orders of magnitude costlier per visitor than in plains cities.', uncertaintyAndLimitations: 'Requires TDA-wise revenue/expenditure accounts and tourist GST attribution estimates.', verificationClass: 'Provisionally Supported' },
    ],
    assertions: [
      { suffix: '01', assertion: 'Destination-level net balance between public tourism fiscal receipts (TDA fees, leases, attributed GST) and public environmental management/restoration costs across Dal, Gulmarg, Pahalgam, and Sonamarg requires TDA-by-TDA financial extraction.', sourceCategory: 'Government Audit Records', classification: 'Unverified', basis: 'Tourism budget headlines do not separate promotional/civil construction spending from ecological waste/sewage O&M.', citationIds: [], methodReq: 'Extract 2018–2026 income and expenditure statements of JKTD, GDA, PDA, SDA, DDA, YDA, and Patnitop DA alongside LCMA/ULB tourist-zone sanitation costs.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Tourism Department J&K & Resort Tourism Development Authorities (GDA, PDA, SDA, etc.)', acronym: 'JKTD / TDAs', mandate: 'Regulating destination development, visitor infrastructure, and master-plan environmental safeguards in notified tourist areas.', ownership: 'Tourism Budget Demand & TDA Local Receipts', scientificResp: 'Enforcing scientifically verified daily visitor carrying capacities and zero untreated discharge into alpine streams/lakes.', financialResp: 'Tourism capital outlays, promotional budgets & TDA fee receipts', documentedFindings: 'Alpine destinations frequently experience peak-season sanitation and traffic overloads while environmental restoration liabilities fall onto LCMA, Wildlife, Forest, and Jal Shakti budgets.', response: 'Clarification invited from Tourism Department and TDAs on the percentage of annual budgets dedicated to tertiary sewage, solid-waste backhaul, and meadow restoration.', questions: ['For Gulmarg, Pahalgam, Sonamarg, and Dal–Nigeen, what share of annual TDA/Tourism expenditure funds sewage treatment, waste backhaul, and ecological restoration versus civil construction and events?'], corrective: 'Earmark >=50% of TDA capital/fee receipts and establish a statutory Alpine Ecological Carrying-Capacity Levy dedicated strictly to sanitation and habitat protection.' },
    ],
    unansweredQuestions: ['What is the long-term economic risk to J&K’s tourism sector itself if Dal eutrophication, snowpack loss, and alpine congestion degrade destination quality?'],
    alternatives: [
      { title: 'High-Value, Carrying-Capacity-Capped Eco-Tourism with Ring-Fenced Destination Green Fees', mechanism: 'Replace volume-maximizing footfall targets with pre-booked carrying-capacity quotas and a transparent per-visitor Ecological Restoration Fee audited via public escrow.', evidencePrecedent: 'Bhutan Sustainable Development Fee, Sikkim Green Cess & Himachal Pradesh Green Tax.', feasibilityNote: 'Increases net local income per visitor while funding 100% of sanitation and waste backhaul.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish Destination Environmental Balance Sheets for GDA, PDA, SDA & Dal–Nigeen', spec: 'Report annual visitor-days, waste/sewage generated vs treated, TDA revenues, and verified environmental O&M spend.', target: 'Tourism Dept J&K, GDA, PDA, SDA & Finance Dept', justification: 'Prevents hidden natural-capital subsidies to unsustainable mass-tourism infrastructure.', indicator: 'Annual destination environmental-fiscal balance sheets published prior to summer season.' },
    ],
    dataGaps: ['TDA-wise audited financial statements (2018–2026), destination tourist-day series, and peak-season alpine STP/SWM operating costs.'],
    regulatoryLead: 'J&K Development Act (TDA Master Plans); Environment (Protection) Act 1986; Solid Waste Management Rules 2016.',
  }),

  // ── 42. KEW-INV-0051 — DRR FINANCING VS DISASTER RECOVERY EXPENDITURE ──────
  makeEconCharter({
    code: 'KEW-INV-0051',
    expansionNumber: 42,
    slug: 'disaster-risk-reduction-financing-versus-recovery-expenditure-jk',
    title: 'Ex-Ante Disaster Risk Reduction Financing versus Ex-Post Relief and Reconstruction Expenditure in Jammu and Kashmir (2000–2027)',
    subtitle: 'Comparing Preventive Investments in Wetland Flood Detention, GLOF Early Warning, Slope Bio-Engineering and Watershed Buffers Against Post-Disaster Relief and Reconstruction Bills',
    shortTitle: 'DRR Financing vs Disaster Recovery Expenditure',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Investigation Charter',
    temporalScope: '2000–2027',
    heroImage: '/images/protected-network/protected-wetland-reserves-hokersar.jpg',
    heroImageCaption: 'Evaluating Expected Annual Damage (EAD) reduction per crore of preventive wetland/GLOF/slope DRR vs post-flood reconstruction bills',
    districts: JK_ALL_20_DISTRICTS_SCOPE,
    spatialFocus: 'Jhelum & Tawi Floodplains, Ramban–NH44 Landslide Corridor, High-Risk Glacial Lakes & Cloudburst-Prone Mountain Valleys',
    coordinates: [34.098, 74.718],
    primaryDomainId: '17-climate-compound-hazards',
    secondaryDomainIds: ['02-wetlands-floodplains', '03-rivers-hydrology', '18-environmental-governance'],
    disciplineIds: ['risk-economics', 'public-finance', 'disaster-risk-science', 'hydrological-modelling', 'geotechnical-engineering'],
    linkedKewModules: [
      { moduleName: 'Hazard Intelligence · Floods', route: '/hazard-intelligence/floods', contributionNote: 'Provides Jhelum/Tawi inundation envelopes and return-period risk context.' },
      { moduleName: 'Hazard Intelligence · GLOFs', route: '/hazard-intelligence/glofs', contributionNote: 'Links moraine-dammed glacial lake hazard rankings to mitigation budgets.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0005', 'KEW-INV-0006', 'KEW-INV-0007', 'KEW-INV-0008', 'KEW-INV-0039', 'KEW-INV-0047'],
    relatedSectoralCodes: ['KEW-SR-2026-67', 'KEW-SR-2026-71'],
    scopeDifferentiation: 'Compares ex-ante State/UT Disaster Mitigation Fund (SDMF) & ecosystem-DRR allocations against ex-post SDRF/NDRF/PMDP/JTFRP relief and reconstruction outlays across 2000–2027.',
    centralQuestion: 'What is the historical ratio of ex-ante preventive Disaster Risk Reduction (DRR) and natural flood-buffer investment to ex-post disaster relief and reconstruction expenditure in Jammu & Kashmir — and what Expected Annual Damage (EAD) leverage does nature-based floodplain/slope mitigation achieve?',
    scopingQuestions: [
      'Across 2000–2027 (including the September 2014 flood recovery window), how many rupees were spent on post-disaster relief/reconstruction per rupee invested in preventive wetland detention, early warning, GLOF mitigation, and slope stabilization?',
      'How is J&K utilizing its State/UT Disaster Mitigation Fund (SDMF) versus response/relief windows under SDRF?',
    ],
    executiveKeyFindings: [
      'Integrates Risk Economics (EAD = ∫_0^1 D(p) dp) with Sendai Framework and 15th Finance Commission Disaster Risk Management Fund (SDRMF = SDRF + SDMF) architecture.',
      'Tests the economic return of "Room for the River" natural floodplain/wetland detention (Hokersar–Narkara–Wular) against repetitive post-flood embankment repairs and urban bailouts.',
    ],
    chronology: [
      { period: 'Sept 2014', eventTitle: 'Catastrophic Jhelum & Tawi Basin Floods', documentedRecord: 'Demonstrated multi-thousand-crore economic losses amplified by floodplain encroachment and lost wetland detention capacity, triggering PMDP and World Bank JTFRP outlays.', sourceRef: 'REF-ECON-CAGFIN25', significance: 'Ecological Shift' },
      { period: '2021–2026', eventTitle: '15th Finance Commission Disaster Mitigation Fund (SDMF) Window', documentedRecord: 'Established dedicated preventive mitigation share alongside response/relief funds.', sourceRef: 'REF-ECON-RBI-FC', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-0051-01', name: 'Ex-Ante Mitigation (SDMF / Wetland Detention / GLOF EWS) vs Ex-Post Relief (SDRF / NDRF / PMDP) Audit', period: '2000–2027', executingAgency: 'DMRRR / SDMA, I&FC (Jal Shakti), JTFRP & PWD', interventionType: 'Disaster Risk Financing Audit', reportedScaleOrOutlay: 'SDRF/SDMF + PMDP/JTFRP Flood Recovery Accounts', status: 'Proposed', documentedOutcome: 'Computes DRR Leverage = ΔEAD / C_DRR.' },
    ],
    disciplineFindings: [
      { disciplineId: 'risk-economics', disciplineName: 'Risk Economics', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: 'Expected Annual Damage (EAD) exceedance integration & ex-ante vs ex-post fiscal ratio', equationOrMetricUsed: 'EAD = ∫_0^1 D(p) dp;  DRR Leverage = ΔEAD / C_DRR', empiricalFinding: 'Global and Himalayan hazard-economics syntheses establish that preventive early-warning, floodplain zoning, and wetland retention yield 4×–7× avoided reconstruction savings over multi-decade horizons.', uncertaintyAndLimitations: 'Requires complete DMRRR SDRF vs SDMF expenditure split and calibrated HEC-RAS 2D depth-damage curves.', verificationClass: 'Provisionally Supported' },
    ],
    assertions: [
      { suffix: '01', assertion: '15th Finance Commission norms distinguish preventive Disaster Mitigation Funds (SDMF) from post-disaster Response Funds (SDRF) to correct chronic national underinvestment in ex-ante risk reduction.', sourceCategory: 'Technical Institute Report', classification: 'Documented', basis: '15th Finance Commission Report on Disaster Risk Management.', citationIds: ['REF-ECON-RBI-FC'] },
      { suffix: '02', assertion: 'Exact 2000–2027 ratio of ex-ante preventive mitigation outlays (including eco-DRR wetland/slope works) to ex-post disaster relief/reconstruction disbursements in J&K requires DMRRR and CAG Finance Account extraction.', sourceCategory: 'Government Audit Records', classification: 'Unverified', basis: 'Preventive vs post-event expenditure heads span DMRRR, I&FC, PWD, and externally aided JTFRP accounts.', citationIds: [], methodReq: 'Reconstruct inflation-adjusted 2000–2027 outlays across SDRF, NDRF, SDMF, PMDP-Flood, JTFRP, and I&FC flood-mitigation heads.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Dept of Disaster Management, Relief, Rehabilitation & Reconstruction (DMRRR / SDMA) & I&FC', acronym: 'DMRRR / SDMA / I&FC', mandate: 'Administering SDRF/SDMF, GLOF/avalanche/flood early-warning systems, and structural/non-structural flood mitigation.', ownership: 'Disaster Management Demand, SDRF/SDMF & JTFRP Assets', scientificResp: 'Publishing probabilistic EAD maps and prioritizing nature-based floodplain/slope mitigation.', financialResp: 'Mitigation vs relief fund governance', documentedFindings: 'Post-event relief and hard embankments historically dominate fiscal outlays compared with wetland flood-storage reconnection and alpine GLOF telemetry.', response: 'Clarification invited from DMRRR on annual SDMF preventive project approvals, GLOF EWS deployments, and eco-DRR share.', questions: ['What percentage of J&K disaster-management funds between 2020 and 2026 funded ex-ante mitigation (SDMF, GLOF EWS, wetland retention, slope stabilization) versus post-event relief?'], corrective: 'Earmark a dedicated Ecosystem-Based DRR (Eco-DRR) tranche within SDMF and I&FC capital budgets for wetland flood-detention reconnection and GLOF monitoring.' },
    ],
    unansweredQuestions: ['Have flood-recovery infrastructure projects constructed since 2015 encroached upon or restored natural Jhelum/Tawi floodplain retention zones?'],
    alternatives: [
      { title: 'Ecosystem-Based DRR (Room-for-the-Jhelum Wetland Reconnection + Automated GLOF/Cloudburst Telemetry)', mechanism: 'Invest upfront mitigation funds in reconnecting Hokersar–Narkara–Wular retention storage, enforcing floodplain no-build zones, and instrumenting benchmark moraine lakes.', evidencePrecedent: 'Netherlands Room for the River & ICIMOD Imja Tsho GLOF Risk Reduction.', feasibilityNote: 'Substantially lowers peak flood stages and catastrophic fiscal bailouts.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish Annual J&K Ex-Ante Mitigation vs Ex-Post Disaster Relief Fiscal Scorecard', spec: 'Disclose SDMF project-by-project spend, GLOF/cloudburst EWS uptime, and floodplain detention MCM recovered.', target: 'DMRRR, SDMA, I&FC & Finance Dept', justification: 'Tracks transition from reactive relief to preventive risk economics.', indicator: 'Annual DRR vs Relief Fiscal Report with verified EAD reduction targets.' },
    ],
    dataGaps: ['Consolidated 2000–2027 SDRF, NDRF, SDMF, PMDP-Flood, and JTFRP audited expenditure series.'],
    regulatoryLead: 'Disaster Management Act 2005; 15th/16th Finance Commission SDRMF Guidelines; Sendai Framework for DRR.',
  }),

  // ── 43. KEW-INV-0052 — ENVIRONMENTAL STAFFING & SCIENTIFIC CAPACITY ────────
  makeEconCharter({
    code: 'KEW-INV-0052',
    expansionNumber: 43,
    slug: 'environmental-staffing-scientific-capacity-institutional-deficits-jk',
    title: 'Environmental Staffing, Scientific Cadres, Laboratory Infrastructure and Institutional Capacity Deficits Across Jammu and Kashmir’s Regulatory Agencies',
    subtitle: 'Evaluating Eleven Institutional Capacity Parameters — Sanctioned vs Filled Posts, Specialist Scientists, NABL Laboratories, Field Instrumentation, Research Budgets and Public Data Transparency',
    shortTitle: 'Environmental Staffing, Scientific Capacity & Institutional Deficits',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Investigation Charter',
    temporalScope: '2010–2027',
    heroImage: '/images/env-monitoring/kashmir-drinking-water-lab.jpg',
    heroImageCaption: '11-parameter institutional capacity audit disentangling staffing, laboratory, and scientific deficits from budget gaps',
    districts: JK_ALL_20_DISTRICTS_SCOPE,
    spatialFocus: 'JKPCC, DEERS, LCMA, WUCMA, JKFD, DWP, SFRI, JKBC, SWCD & Jal Shakti WQMIS Scientific Cadres Across J&K',
    coordinates: [34.085, 74.805],
    primaryDomainId: '18-environmental-governance',
    secondaryDomainIds: ['14-industrial-craft-pollution', '01-lakes-limnology', '09-forests-biodiversity'],
    disciplineIds: ['institutional-economics', 'public-finance', 'environmental-data-science', 'environmental-law', 'environmental-chemistry'],
    linkedKewModules: [
      { moduleName: 'Institutional Accountability', route: '/environmental-investigations/accountability', contributionNote: 'Connects 11 capacity parameters to statutory agency obligations.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0039', 'KEW-INV-0040', 'KEW-INV-0045'],
    relatedSectoralCodes: ['KEW-SR-2026-95', 'KEW-SR-2026-100'],
    scopeDifferentiation: 'Focuses specifically on the 11 non-monetary/human-capital institutional capacity parameters (vacancies, PhD/MSc scientific cadres, NABL labs, calibrated instruments, R&D share, digital open data) rather than rupee budget totals alone (KEW-INV-0040).',
    centralQuestion: 'To what extent do environmental governance failures in Jammu & Kashmir result from acute scientific staffing vacancies, unaccredited/under-equipped laboratories, and <1% research allocations rather than headline capital shortages alone?',
    scopingQuestions: [
      'Across JKPCC, DEERS, LCMA, WUCMA, SFRI, DWP, and JKBC, what are the sanctioned vs filled strengths of specialist environmental scientists (limnologists, atmospheric chemists, hydrogeologists, wildlife biologists, GIS analysts)?',
      'Which public environmental laboratories hold active NABL (ISO/IEC 17025) accreditation for heavy metals, pesticides, microcystins, VOCs, and microbiology, and what is their annual sample throughput?',
    ],
    executiveKeyFindings: [
      'Audits all 11 institutional parameters: sanctioned posts, filled posts, scientific specialists, technical equipment, NABL laboratories, monitoring stations, research funding, enforcement capacity, O&M funding, digital infrastructure, and public transparency.',
      'CAG Dal/Wular Conservation Audit (125068) explicitly documented research, EIA, and monitoring deficiencies inside conservation authorities despite multi-crore civil engineering outlays.',
    ],
    chronology: [
      { period: '2019–2026', eventTitle: 'Post-Reorganization Cadre Restructuring & Recruitment Referrals', documentedRecord: 'UT cadre reorganization across JKPCC, LCMA, Forest/Wildlife, and Jal Shakti requiring updated verification of scientific vacancies.', sourceRef: 'REF-ECON-CAGFIN25', significance: 'Intervention' },
    ],
    interventions: [
      { id: 'INT-0052-01', name: '11-Parameter Scientific Staffing, NABL Laboratory & Open-Data Capacity Audit', period: '2019–2027', executingAgency: 'FEED, JKPCC, DEERS, LCMA, WUCMA, SFRI, DWP, JKFD & GAD/JKPSC/JKSSB', interventionType: 'Scientific & Institutional Capacity Assessment', reportedScaleOrOutlay: 'Establishment Appendices & Research/Lab Object Heads', status: 'Proposed', documentedOutcome: 'Separates financing, scientific-capacity, enforcement, and governance deficits.' },
    ],
    disciplineFindings: [
      { disciplineId: 'institutional-economics', disciplineName: 'Institutional Economics', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: '11-dimension institutional production-function & bottleneck diagnostics', equationOrMetricUsed: 'K_inst = f(Staff_sci / Staff_sanc, Lab_NABL, Station_uptime, R&D_share, OpenData_score)', empiricalFinding: 'Capital budgets cannot substitute for missing scientific staff: an agency without limnologists or NABL analytical chemists inevitably defaults to civil-contractor works (dredging/walls/paving) over diagnostic ecological restoration.', uncertaintyAndLimitations: 'Requires authenticated Budget Establishment Appendices and NABL scope certificates.', verificationClass: 'Documented' },
    ],
    assertions: [
      { suffix: '01', assertion: 'CAG Performance Audit on Dal and Wular conservation documented deficiencies in dedicated scientific research, baseline impact assessment, and systematic ecological monitoring within implementing authorities.', sourceCategory: 'Government Audit Records', classification: 'Documented', basis: 'CAG Audit Report ID 125068.', citationIds: ['REF-ECON-CAGLAKE'] },
      { suffix: '02', assertion: 'Exact sanctioned vs filled scientific cadre counts, NABL ISO/IEC 17025 accreditation scopes, and inspection-to-officer ratios across JKPCC, DEERS, LCMA, WUCMA, SFRI, and DWP in 2026 require official Establishment Appendix and GAD disclosures.', sourceCategory: 'Government Audit Records', classification: 'Unverified', basis: 'Consolidated vacancy and specialist-qualification schedules are not published in one public portal.', citationIds: [], methodReq: 'Extract Budget Establishment Appendices (FY 2026–27), NABL certificate directories, and annual administrative reports for each agency.' },
    ],
    accountability: [
      { suffix: '01', institution: 'General Administration Dept (GAD), FEED, JKPCC, DEERS, LCMA & SFRI', acronym: 'GAD / FEED / JKPCC / DEERS / LCMA', mandate: 'Cadre management, specialist scientific recruitment, laboratory accreditation, and public environmental data disclosure.', ownership: 'Scientific Cadre Rules, Laboratories & Environmental Portals', scientificResp: 'Maintaining staffed scientific wings and publishing open machine-readable monitoring archives.', financialResp: 'Scientific establishment, R&D, and laboratory O&M budgets', documentedFindings: 'Civil engineering wings frequently overshadow scientific research cells inside lake, urban, and water authorities.', response: 'Clarification invited on sanctioned vs filled scientific posts, JKPSC referrals, and NABL accreditation status across JKPCC, DEERS, LCMA, and SFRI.', questions: ['How many full-time PhD/MSc limnologists, atmospheric scientists, hydrogeologists, and environmental economists are currently in position across JKPCC, DEERS, LCMA, and WUCMA?'], corrective: 'Create a dedicated J&K Environmental Scientific Service cadre, fast-track JKPSC specialist recruitment, and mandate >=3% R&D/monitoring share in all conservation authorities.' },
    ],
    unansweredQuestions: ['Why are taxpayer-funded DPRs, bathymetric surveys, and raw laboratory monitoring logs not published by default in open machine-readable formats?'],
    alternatives: [
      { title: 'Dedicated J&K Environmental Scientific Cadre + University/Research Consortium Co-Monitoring', mechanism: 'Establish protected scientific posts immune to generalist transfers and partner with University of Kashmir, University of Jammu, NIT Srinagar, SKUAST, and CSIR-IIIM for NABL-grade peer monitoring.', evidencePrecedent: 'Lake Biwa Environmental Research Institute (LBERI) & CPCB scientific cadre reforms.', feasibilityNote: 'Rapidly upgrades analytical and peer-review capacity at modest fiscal cost.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Immediate (0–12 Months)', title: 'Publish Annual 11-Parameter Institutional Capacity & Scientific Vacancy Disclosure', spec: 'Report sanctioned vs filled scientific posts, NABL lab scope, station uptime, R&D spend, and open-data datasets per agency.', target: 'FEED, JKPCC, DEERS, LCMA, WUCMA, DWP & GAD', justification: 'Pinpoints exact human-resource and laboratory bottlenecks.', indicator: '100% of core environmental agencies publishing annual scientific capacity scorecards.' },
    ],
    dataGaps: ['FY 2026–27 Budget Establishment Appendices (sanctioned vs filled scientific posts) and NABL lab scope certificates.'],
    regulatoryLead: 'Water Act 1974 & Air Act 1981 (Board/Committee Scientific Qualifications); ISO/IEC 17025 (NABL); RTI Act 2005 Sec 4 Proactive Disclosure.',
  }),

  // ── 44. KEW-INV-0053 — ENVIRONMENTAL FISCAL REFORM & SUSTAINABLE FINANCE ───
  makeEconCharter({
    code: 'KEW-INV-0053',
    expansionNumber: 44,
    slug: 'environmental-fiscal-reform-sustainable-development-financing-jk',
    title: 'Environmental Fiscal Reform, Ecological Fiscal Transfers and Sustainable Development Financing Instruments for Jammu and Kashmir',
    subtitle: 'Comparative Mountain Fiscal Benchmarking (Himachal Pradesh, Uttarakhand & Alpine Peers) and Design of Eco-Tourism Levies, Polluter Charges, Mineral Bonds, PES and Green Financing Within J&K’s UT Fiscal Architecture',
    shortTitle: 'Environmental Fiscal Reform & Sustainable Financing',
    priority: 'High',
    status: 'proposed',
    statusLabel: 'Proposed Investigation Charter',
    temporalScope: '2015–2030',
    heroImage: '/images/earth-human-impact/ehii-command-center-satellite.jpg',
    heroImageCaption: 'Designing evidence-based ecological fiscal transfers, PES, and polluter-pays instruments normalized across Himalayan jurisdictions',
    districts: JK_ALL_20_DISTRICTS_SCOPE,
    spatialFocus: 'UT of Jammu & Kashmir Benchmarked Against Himachal Pradesh, Uttarakhand & International Mountain Jurisdictions',
    coordinates: [33.88, 75.08],
    primaryDomainId: '18-environmental-governance',
    secondaryDomainIds: ['12-tourism-pilgrimage', '09-forests-biodiversity', '10-mining-quarrying'],
    disciplineIds: ['public-finance', 'environmental-economics', 'conservation-economics', 'environmental-accounting', 'institutional-economics', 'environmental-law'],
    linkedKewModules: [
      { moduleName: 'Asian & Global Case Studies', route: '/environmental-investigations/precedents', contributionNote: 'Connects HP/Uttarakhand ecological fiscal transfers and Costa Rica/UK natural-capital precedents.' },
    ],
    relatedInvestigationCodes: ['KEW-INV-0039', 'KEW-INV-0043', 'KEW-INV-0044', 'KEW-INV-0046', 'KEW-INV-0050'],
    relatedSectoralCodes: ['KEW-SR-2026-90', 'KEW-SR-2026-95', 'KEW-SR-2026-99'],
    scopeDifferentiation: 'Synthesizes forward-looking fiscal policy instruments and normalized mountain-state comparisons (per capita, per km², % GSDP, UT vs Article 280 regime) to close the Ecological Financing Deficit identified in KEW-INV-0039.',
    centralQuestion: 'Given Jammu & Kashmir’s ₹14,685 crore fiscal deficit and 51.2% reliance on Central Grants-in-Aid (₹58,218 cr in FY 2026–27 BE), what combination of Ecological Fiscal Transfers, ring-fenced destination eco-levies, polluter/extraction bonds, Payments for Ecosystem Services (PES), and budget reallocation can sustainably close J&K’s ecological financing deficit?',
    scopingQuestions: [
      'How does J&K’s per-capita and per-km² environmental expenditure compare with Himachal Pradesh and Uttarakhand once normalized for inflation, forest/glacier area, and J&K’s post-2019 UT grant framework versus Finance Commission tax devolution?',
      'Which own-source environmental fiscal instruments (alpine carrying-capacity levies, congestion/emission charges, mineral reclamation bonds, hydropower watershed royalties, intra-UT ecological fiscal transfers to panchayats/ULBs) are legally and fiscally feasible in J&K UT?',
    ],
    executiveKeyFindings: [
      'Recognizes J&K’s real fiscal constraint (₹14,685 cr fiscal deficit in FY 2026–27 BE) and therefore focuses on revenue-neutral environmental fiscal reform, externality pricing, CSS/CAMPA/DMF governance optimization, and Himalayan ecological transfers rather than unrealistic borrowing.',
      'Normalizes all comparisons with Himachal Pradesh, Uttarakhand, and international mountain regions by population, geographical area, GSDP, inflation, and constitutional responsibilities.',
    ],
    callouts: [
      { label: 'FY27 Fiscal Deficit', value: '₹14,685', unit: 'cr (4.65% GSDP)', sourceTag: 'Requires Revenue-Neutral EFR' },
      { label: 'Central Grants Share', value: '₹58,218', unit: 'cr (51.2%)', sourceTag: 'UT Grant Architecture' },
      { label: 'Mountain Peers', value: 'HP & UK', unit: '+ Alpine Peers', sourceTag: 'Normalized per km² / Cap' },
      { label: 'Reform Instruments', value: '6', unit: 'Fiscal Levers', sourceTag: 'EFT, PES, Eco-Levy, Bonds' },
    ],
    chronology: [
      { period: '2015–2026', eventTitle: '14th & 15th Finance Commission Forest/Ecology Weights & Himalayan Green Bonus Debates', documentedRecord: 'Integration of dense-forest ecological weights in central fiscal architecture alongside Himalayan state calls for cryosphere/watershed compensation.', sourceRef: 'REF-ECON-RBI-FC', significance: 'Baseline' },
    ],
    interventions: [
      { id: 'INT-0053-01', name: 'Comparative Mountain Fiscal Normalization & J&K Environmental Fiscal Reform Blueprint', period: '2020–2030', executingAgency: 'J&K Finance Dept, Ministry of Finance / MHA Interface, FEED, Tourism & Local Bodies', interventionType: 'Environmental Fiscal Reform & Sustainable Finance', reportedScaleOrOutlay: 'Targets closing EFD_t within FRBM deficit ceiling (₹14,685 cr FY27)', status: 'Proposed', documentedOutcome: 'Designs legally grounded, non-regressive ecological revenue and transfer mechanisms.' },
    ],
    disciplineFindings: [
      { disciplineId: 'public-finance', disciplineName: 'Public Finance', clusterName: 'Environmental Economics, Public Finance & Natural Capital Accounting', methodologyApplied: 'Double-dividend Environmental Fiscal Reform (EFR) & Ecological Fiscal Transfer (EFT) design', equationOrMetricUsed: 'EFT_i = Grant_pool × [w_forest(F_i/ΣF) + w_wetland(W_i/ΣW) + w_cryosphere(G_i/ΣG)]', empiricalFinding: 'Intra-UT ecological fiscal transfers to forest-, spring-, and wetland-custodian panchayats/districts align local development incentives with watershed protection without breaching UT fiscal-deficit limits.', uncertaintyAndLimitations: 'Requires legal vetting of UT tax/fee powers under the J&K Reorganization Act 2019 and GST rules.', verificationClass: 'Documented' },
    ],
    assertions: [
      { suffix: '01', assertion: 'Post-2019 comparisons between J&K UT and Himalayan states (Himachal Pradesh and Uttarakhand) must account for J&K’s Union Territory Central Grants-in-Aid structure (₹58,218 cr in FY 2026–27 BE) as distinct from Article 280 State Finance Commission tax devolution.', sourceCategory: 'Government Audit Records', classification: 'Documented', basis: 'J&K Budget 2026–27, PRS Analysis, and Finance Commission constitutional scope.', citationIds: ['REF-ECON-FIN27', 'REF-ECON-PRS27', 'REF-ECON-RBI-FC'] },
      { suffix: '02', assertion: 'Normalized real per-km² and per-capita environmental expenditure ratios comparing J&K UT against Himachal Pradesh and Uttarakhand (2020–2026) and revenue-yield simulations of proposed J&K eco-levies remain under primary RBI/Demand compilation.', sourceCategory: 'Technical Institute Report', classification: 'Unverified', basis: 'Requires harmonized CEPA/CReMA extraction across all three jurisdictions.', citationIds: [], methodReq: 'Extract 2020–2026 RBI State/UT budget functional heads for J&K, HP, and Uttarakhand, normalize by CPI, population, and forest/cryosphere km², and model fee-elasticity scenarios.' },
    ],
    accountability: [
      { suffix: '01', institution: 'Finance Department J&K, Planning Development & Monitoring Dept & Ministry of Finance / MHA Interface', acronym: 'Finance / PDMD J&K', mandate: 'Designing UT fiscal policy, non-tax user fees, local-body devolution formulas, and central grant proposals.', ownership: 'UT Fiscal Strategy, FRBM Roadmap & Local Body Transfers', scientificResp: 'Evaluating distributional equity and verified ecological additionality of proposed green levies and transfers.', financialResp: 'Closing EFD_t within sustainable FRBM bounds', documentedFindings: 'Currently, watershed-custodian upland districts and panchayats bear land-use conservation restrictions without receiving explicit ecological fiscal compensation.', response: 'Clarification invited from Finance Department on feasibility of intra-UT Ecological Fiscal Transfers to panchayats/districts and ring-fenced destination eco-restoration levies.', questions: ['Has J&K submitted a quantified cryosphere, forest, and Indus-headwater ecosystem-services case for dedicated Central Ecological Grants?'], corrective: 'Pilot an Intra-UT Panchayat/ULB Ecological Fiscal Transfer formula and statutory ring-fenced Destination Carrying-Capacity & Mineral Rehabilitation Escrows.' },
    ],
    unansweredQuestions: ['How can environmental levies be structured with exemptions for low-income local residents and traditional livelihoods so externality pricing is progressive rather than regressive?'],
    alternatives: [
      { title: 'Six-Pillar J&K Sustainable Environmental Financing Package', mechanism: '(1) SEEA Green Budget Reallocation, (2) Ring-fenced Alpine/Lake Visitor Restoration Levy, (3) Escrowed Mining & Infrastructure EMP Bonds, (4) Hydropower Local Springshed/Watershed Royalty, (5) Intra-UT Panchayat Ecological Fiscal Transfers, and (6) Performance-Linked Central Himalayan Ecosystem Grants.', evidencePrecedent: '15th FC Forest Weightage, Sikkim/Himachal Green Levies & Costa Rica PES.', feasibilityNote: 'Mobilizes dedicated conservation finance without increasing general household taxation or fiscal deficit.' },
    ],
    recommendations: [
      { suffix: '01', horizon: 'Medium-Term (1–3 Years)', title: 'Establish J&K Environmental Fiscal Reform & Natural Capital Financing Taskforce', spec: 'Jointly convene Finance Dept, DES, FEED, Tourism, and independent economists to publish a legally vetted EFR & Ecological Fiscal Transfer white paper.', target: 'J&K Finance Department, DES & FEED', justification: 'Provides a fiscally realistic pathway to fund J&K’s environmental obligations.', indicator: 'Published J&K Sustainable Environmental Financing Strategy integrated into Medium-Term Fiscal Plan.' },
    ],
    dataGaps: ['Harmonized CEPA/CReMA expenditure series for Himachal Pradesh and Uttarakhand (2020–2026) and legal/revenue elasticity schedules for J&K UT non-tax environmental fees.'],
    regulatoryLead: 'J&K Reorganization Act 2019; J&K Panchayati Raj / Municipal Acts; Finance Commission Ecological Transfer Precedents.',
  }),
];
