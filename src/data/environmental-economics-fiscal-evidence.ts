// ─────────────────────────────────────────────────────────────────────────────
// KEW-EIAI SHARED LAYER: ENVIRONMENTAL ECONOMICS, PUBLIC FINANCE & NATURAL CAPITAL
// Canonical Fiscal Baseline (FY 2026–27), Historical Regime Protocol (2000–2027),
// 23-Institution Audit Inventory, UN SEEA Asset Accounts, Damage Valuation & BCR
// Zero fabricated departmental figures — unextracted accounts explicitly flagged
// ─────────────────────────────────────────────────────────────────────────────

export interface BudgetMacroIndicator {
  id: string;
  label: string;
  amountInrCrore: number;
  formattedValue: string;
  shareNote: string;
  fiscalYear: '2026–27 BE';
  geographicalScope: 'Union Territory of Jammu & Kashmir (UT-Wide)';
  accountingStage: 'Budget Estimates (BE)';
  verificationStatus: 'Documented';
  sourceAuthority: string;
}

export interface HistoricalFiscalPeriod {
  period: string;
  constitutionalRegime: 'Former J&K State (incl. Ladakh)' | 'Reorganization Transition' | 'UT of Jammu & Kashmir (excl. Ladakh)';
  analyticalSignificance: string;
  deflationAndBoundaryProtocol: string;
  auditDataStatus: string;
}

export interface BudgetLifecycleStage {
  stageOrder: number;
  stageName: string;
  accountingDefinition: string;
  diagnosticFailureMode: string;
  primarySourceDocument: string;
}

export interface SeeaExpenditureCategory {
  code: string;
  categoryName: string;
  seeaAlignment: string;
  scopeDescription: string;
  illustrativeJkHeads: string[];
  doubleCountingGuardrail: string;
}

export interface EnvironmentalInstitutionAuditTarget {
  id: string;
  institutionName: string;
  acronym: string;
  administrativeCategory: 'Core Environment & Forestry' | 'Conservation Authority' | 'Water, Urban & Sanitation' | 'Development & Infrastructure Externality';
  economicAndEnvironmentalAssessment: string;
  mandateVerificationNote: string;
  financialDataExtractionStatus: 'CAG Partial Audit Anchor Available' | 'Requires Detailed Demand-for-Grants Extraction';
  linkedInvestigationCodes: string[];
}

export interface InstitutionalCapacityParameter {
  parameter: string;
  requiredAssessment: string;
  diagnosticPurpose: string;
  verificationSource: string;
}

export interface NaturalCapitalAssetAccount {
  assetName: string;
  seeaAccountClass: string;
  economicServices: string;
  physicalMetrics: string[];
  monetaryValuationMethod: string;
  nonMonetizableDimension: string;
  linkedKewRoute: string;
}

export interface EnvironmentalDamageValuationDomain {
  degradationProcess: string;
  economicValuationMethod: string;
  primaryAffectedReceptors: string;
  doubleCountingSafeguard: string;
  evidenceMaturity: 'Empirical Cost Anchor Available' | 'Scoping — Requires Primary Valuation Survey';
  linkedInvestigationCode: string;
}

export interface DevelopmentExternalityRow {
  economicActivity: string;
  potentialEnvironmentalCost: string;
  costTransferMechanism: string;
  mitigationInternalisationTest: string;
}

export interface InterventionReturnBenchmark {
  intervention: string;
  environmentalPerformanceIndicator: string;
  auditedBaselineOrAnchor: string;
  economicEvaluationMetric: string;
  linkedInvestigationCode: string;
}

export interface FiscalEvidenceSourceRepo {
  sourceName: string;
  custodianBody: string;
  requiredInformation: string;
  officialUrl: string;
  geographicCoverage: string;
}

// ─── 1. VERIFIED LATEST MACRO-BUDGET BASELINE: JAMMU & KASHMIR FY 2026–27 (BE) ─
export const JK_BUDGET_2026_27_MACRO_BASELINE: BudgetMacroIndicator[] = [
  {
    id: 'total-expenditure-fy27',
    label: 'Total Budgeted Expenditure',
    amountInrCrore: 113767,
    formattedValue: '₹1,13,767 cr',
    shareNote: '36.02% of Estimated GSDP (includes ₹7,809 cr debt repayment & ₹82 cr loans)',
    fiscalYear: '2026–27 BE',
    geographicalScope: 'Union Territory of Jammu & Kashmir (UT-Wide)',
    accountingStage: 'Budget Estimates (BE)',
    verificationStatus: 'Documented',
    sourceAuthority: 'J&K Finance Department Annual Financial Statement 2026–27 & PRS Legislative Research',
  },
  {
    id: 'estimated-gsdp-fy27',
    label: 'Estimated Gross State/UT Domestic Product (GSDP)',
    amountInrCrore: 315822,
    formattedValue: '₹3,15,822 cr',
    shareNote: 'Conventional nominal output baseline prior to SEEA natural capital depletion adjustment',
    fiscalYear: '2026–27 BE',
    geographicalScope: 'Union Territory of Jammu & Kashmir (UT-Wide)',
    accountingStage: 'Budget Estimates (BE)',
    verificationStatus: 'Documented',
    sourceAuthority: 'J&K Finance Department Fiscal Strategy / PRS Budget Analysis 2026–27',
  },
  {
    id: 'net-expenditure-fy27',
    label: 'Net Public Expenditure (Excl. Debt Repayment)',
    amountInrCrore: 105958,
    formattedValue: '₹1,05,958 cr',
    shareNote: 'Denominator for effective fiscal policy allocation (₹1,13,767 cr minus ₹7,809 cr debt repayment)',
    fiscalYear: '2026–27 BE',
    geographicalScope: 'Union Territory of Jammu & Kashmir (UT-Wide)',
    accountingStage: 'Budget Estimates (BE)',
    verificationStatus: 'Documented',
    sourceAuthority: 'J&K Finance Department & PRS Legislative Research 2026–27',
  },
  {
    id: 'revenue-expenditure-fy27',
    label: 'Revenue Expenditure',
    amountInrCrore: 80640,
    formattedValue: '₹80,640 cr',
    shareNote: '70.88% of total budgeted outlay (salaries, pensions, O&M, power purchase, subsidies & establishment)',
    fiscalYear: '2026–27 BE',
    geographicalScope: 'Union Territory of Jammu & Kashmir (UT-Wide)',
    accountingStage: 'Budget Estimates (BE)',
    verificationStatus: 'Documented',
    sourceAuthority: 'J&K Finance Department Budget Summary 2026–27 & PRS Legislative Research',
  },
  {
    id: 'capital-outlay-fy27',
    label: 'Capital Outlay',
    amountInrCrore: 25236,
    formattedValue: '₹25,236 cr',
    shareNote: '22.18% of total budgeted outlay (roads, water supply, STPs, flood control, buildings & capital assets)',
    fiscalYear: '2026–27 BE',
    geographicalScope: 'Union Territory of Jammu & Kashmir (UT-Wide)',
    accountingStage: 'Budget Estimates (BE)',
    verificationStatus: 'Documented',
    sourceAuthority: 'J&K Finance Department Annual Financial Statement 2026–27 & PRS Legislative Research',
  },
  {
    id: 'central-grants-fy27',
    label: 'Central Grants-in-Aid',
    amountInrCrore: 58218,
    formattedValue: '₹58,218 cr',
    shareNote: '51.17% of total expenditure — structural UT central fiscal transfer reliance including CSS grants',
    fiscalYear: '2026–27 BE',
    geographicalScope: 'Union Territory of Jammu & Kashmir (UT-Wide)',
    accountingStage: 'Budget Estimates (BE)',
    verificationStatus: 'Documented',
    sourceAuthority: 'J&K Finance Department & PRS Legislative Research 2026–27',
  },
  {
    id: 'fiscal-deficit-fy27',
    label: 'Estimated Fiscal Deficit',
    amountInrCrore: 14685,
    formattedValue: '₹14,685 cr',
    shareNote: '4.65% of Estimated GSDP — constrains debt-financed green infrastructure headroom',
    fiscalYear: '2026–27 BE',
    geographicalScope: 'Union Territory of Jammu & Kashmir (UT-Wide)',
    accountingStage: 'Budget Estimates (BE)',
    verificationStatus: 'Documented',
    sourceAuthority: 'J&K Finance Department FRBM Statement 2026–27 & PRS Legislative Research',
  },
  {
    id: 'debt-repayment-and-loans-fy27',
    label: 'Debt Repayment (₹7,809 cr) + Loans Given (₹82 cr)',
    amountInrCrore: 7891,
    formattedValue: '₹7,891 cr',
    shareNote: '6.94% combined non-operational financial outflows completing the ₹1,13,767 cr budget identity',
    fiscalYear: '2026–27 BE',
    geographicalScope: 'Union Territory of Jammu & Kashmir (UT-Wide)',
    accountingStage: 'Budget Estimates (BE)',
    verificationStatus: 'Documented',
    sourceAuthority: 'J&K Finance Department Annual Financial Statement 2026–27 & PRS Legislative Research',
  },
];

// ─── 2. CORE GOVERNING EQUATIONS OF KEW ENVIRONMENTAL ECONOMICS ───────────────
export const ENVIRONMENTAL_ECONOMICS_EQUATIONS = [
  {
    id: 'eq-eei',
    symbol: 'EEI',
    title: 'Environmental Expenditure Intensity',
    formula: 'EEI = (Environmental Expenditure / Total Public Expenditure) × 100',
    methodologyNote:
      'Computed separately for Narrow Direct Conservation Expenditure (CEPA/Forest/Wildlife/LCMA/WUCMA/JKPCC) and Broad Environmentally Beneficial Expenditure (STP, WTP, watershed, transit, clean energy), normalized against both Net Expenditure (₹1,05,958 cr) and GSDP (₹3,15,822 cr).',
    guardrail:
      'Never equate the Forest, Ecology & Environment Department Demand-for-Grant alone with total environmental spending, and never attribute UT-wide allocations solely to Kashmir Division.',
  },
  {
    id: 'eq-efd',
    symbol: 'EFD_t',
    title: 'Ecological Financing Deficit',
    formula: 'EFD_t = max(0, R_t − A_t)',
    methodologyNote:
      'R_t = scientifically estimated annual funding requirement derived from documented infrastructure deficits (unintercepted MLD sewage, unfiltered WTPs, CAAQMS/NANMN gaps, Hangul corridor restoration, springshed recharge) × realistic engineering unit costs; A_t = verified available environmental funding.',
    guardrail:
      'Strictly prohibits inventing an arbitrary percentage of GSDP/budget and declaring everything below it "inadequate"; R_t must be bottom-up and reproducible.',
  },
  {
    id: 'eq-gsdp-ea',
    symbol: 'GSDP_EA',
    title: 'Exploratory Environmentally Adjusted Net Domestic Product',
    formula: 'GSDP_EA = GSDP − CFC − D_N − D_E',
    methodologyNote:
      'CFC = consumption of fixed capital; D_N = measurable physical-to-monetary natural resource depletion (forest stock, Karewa earth/mineral extraction, aquifer/cryosphere storage loss); D_E = non-overlapping environmental degradation costs (pollution health/productivity & flood-buffer loss).',
    guardrail:
      'Presented transparently as an exploratory UN SEEA analytical indicator testing whether conventional GSDP growth is financed by natural capital liquidation — never represented as an official MoSPI/DES Green GSDP statistic.',
  },
  {
    id: 'eq-bcr',
    symbol: 'BCR',
    title: 'Environmental Return on Public Investment (Benefit–Cost Ratio)',
    formula: 'BCR = [ Σ_{t=0..T} B_t / (1 + r)^t ] / [ Σ_{t=0..T} C_t / (1 + r)^t ]',
    methodologyNote:
      'Evaluates discounted monetized ecological, health, and avoided-damage benefits B_t against full lifecycle capital + O&M costs C_t across sensitivity discount rates r (e.g., 3%, 5%, 8%).',
    guardrail:
      'BCR > 1 indicates monetized benefits exceed costs under stated assumptions, not automatic ecological sustainability; conversely, persistent ecological degradation does not prove expenditure was wasted without counterfactual load accounting.',
  },
] as const;

// ─── 3. SEVEN HISTORICAL FISCAL & CONSTITUTIONAL PERIODS (2000–2027) ─────────
export const HISTORICAL_FISCAL_PERIODS_2000_2027: HistoricalFiscalPeriod[] = [
  {
    period: '2000–2010',
    constitutionalRegime: 'Former J&K State (incl. Ladakh)',
    analyticalSignificance: 'Historical environmental investment baseline, early NRCP/NLCP Dal Lake phases, and pre-modernized STP/SWM municipal finance.',
    deflationAndBoundaryProtocol: 'Deflate nominal State Finance Accounts using 2011–12 spliced GSDP deflator / CPI; separate Ladakh district/LAHDC heads before comparing with post-2019 J&K UT.',
    auditDataStatus: 'RBI Handbook of Statistics on Indian States & historical CAG J&K Finance/Civil Audit volumes.',
  },
  {
    period: '2010–2014',
    constitutionalRegime: 'Former J&K State (incl. Ladakh)',
    analyticalSignificance: 'Pre-September 2014 flood development & wetland-encroachment era; historical March 2013 CAG drinking-water audit baseline (341 unfiltered schemes).',
    deflationAndBoundaryProtocol: 'Benchmark floodplain infrastructure outlays vs I&FC/wetland retention investments immediately preceding the Sept 2014 Jhelum disaster.',
    auditDataStatus: 'CAG J&K Audit Reports (2010–2014) & State Demands for Grants.',
  },
  {
    period: '2014–2019',
    constitutionalRegime: 'Former J&K State (incl. Ladakh)',
    analyticalSignificance: 'Post-2014 flood recovery (PMDP, World Bank JTFRP) and final quinquennium under State Finance Commission & Article 280 tax-devolution regime.',
    deflationAndBoundaryProtocol: 'Distinguish one-time emergency flood reconstruction/dredging capital outlays from recurring environmental O&M capacity.',
    auditDataStatus: 'CAG State Finance Reports up to FY 2018–19; World Bank JTFRP implementation disclosures.',
  },
  {
    period: '2019–2020',
    constitutionalRegime: 'Reorganization Transition',
    analyticalSignificance: 'Administrative and geographical bifurcation (31 Oct 2019) into UT of Jammu & Kashmir and UT of Ladakh; transition from State budget to UT Consolidated Fund.',
    deflationAndBoundaryProtocol: 'Mandatory structural break year: split 7-month State accounts and 5-month UT accounts; remove Ladakh geographical/asset denominators.',
    auditDataStatus: 'CAG Transition Finance Accounts FY 2019–20 & MHA Reorganization Orders.',
  },
  {
    period: '2020–2025',
    constitutionalRegime: 'UT of Jammu & Kashmir (excl. Ladakh)',
    analyticalSignificance: 'UT environmental financing era: JJM rural tap rollout, Smart City urban projects, NCAP clean-air grants, CAMPA, and CAG Dal/Wular Performance Audit window (up to FY 2021–22 / Report No. 4 of 2025).',
    deflationAndBoundaryProtocol: 'Track Central Grants-in-Aid, PFMS SNA releases, and unspent balances across Jammu Division, Kashmir Division, and UT-wide heads.',
    auditDataStatus: 'CAG Financial Audit 2024–25 (Report ID 125155) & CAG Lake Conservation Audit (Report ID 125068).',
  },
  {
    period: '2025–2026',
    constitutionalRegime: 'UT of Jammu & Kashmir (excl. Ladakh)',
    analyticalSignificance: 'Latest completed financial year transitioning from Revised Estimates (RE) to provisional actuals and statutory CAG audit.',
    deflationAndBoundaryProtocol: 'Reconcile FY 2025–26 BE vs RE variance reported inside the FY 2026–27 Budget documents; await CAG Audited Finance Accounts before marking final actuals.',
    auditDataStatus: 'FY 2026–27 Annual Financial Statement (2025–26 RE column); Audited Actuals Pending.',
  },
  {
    period: '2026–2027',
    constitutionalRegime: 'UT of Jammu & Kashmir (excl. Ladakh)',
    analyticalSignificance: 'Current fiscal baseline: ₹1,13,767 cr Total Budgeted Expenditure, ₹3,15,822 cr GSDP, ₹25,236 cr Capital Outlay, ₹58,218 cr Central Grants-in-Aid.',
    deflationAndBoundaryProtocol: 'Extract Demand-wise environmental vs development allocations and track live e-Tendering / PFMS implementation.',
    auditDataStatus: 'Documented Macro BE (jakfinance-jk.com & PRS); Demand-level environmental extraction active in Scoping.',
  },
];

// ─── 4. SEVEN-STAGE ENVIRONMENTAL BUDGET-TO-OUTCOME INVESTIGATION FRAMEWORK ──
export const BUDGET_TO_ECOLOGICAL_OUTCOME_STAGES: BudgetLifecycleStage[] = [
  {
    stageOrder: 1,
    stageName: 'Budget Allocation (BE)',
    accountingDefinition: 'Financial provision approved by the Legislature / Parliament in Detailed Demands for Grants.',
    diagnosticFailureMode: 'Symbolic headline announcements underfunded relative to statutory mandates or concentrated in cosmetic civil works.',
    primarySourceDocument: 'J&K Finance Dept Annual Financial Statement & Detailed Demands for Grants',
  },
  {
    stageOrder: 2,
    stageName: 'Revised Estimates (RE)',
    accountingDefinition: 'Mid-year upward/downward adjustment reflecting absorption capacity, fiscal compression, or supplementary grants.',
    diagnosticFailureMode: 'Mid-year cuts to scientific monitoring, O&M, and conservation research while protecting establishment/civil-contract heads.',
    primarySourceDocument: 'Subsequent Year Budget Documents (RE Column) & Supplementary Demands',
  },
  {
    stageOrder: 3,
    stageName: 'Funds Released',
    accountingDefinition: 'Cash/authorization actually released by Finance Dept / Central Ministries (PFMS Single Nodal Accounts) to implementing agencies.',
    diagnosticFailureMode: 'Fourth-quarter "March rush" releases preventing seasonal ecological work (e.g., winter planting or autumn macrophyte harvesting).',
    primarySourceDocument: 'PFMS SNA Reports, Treasury Releases & Departmental Sanctions',
  },
  {
    stageOrder: 4,
    stageName: 'Actual & Audited Expenditure',
    accountingDefinition: 'Money demonstrably spent and reconciled by the Accountant General / CAG (excluding parked funds in civil deposits/escrow).',
    diagnosticFailureMode: 'Parking unspent balances in bank accounts/PD accounts while reporting 100% "utilization certificates".',
    primarySourceDocument: 'CAG Appropriation Accounts, Finance Accounts & Performance Audits',
  },
  {
    stageOrder: 5,
    stageName: 'Physical Outputs',
    accountingDefinition: 'Deliverables built or executed: MLD STP capacity installed, saplings planted, harvesters operated, CAAQMS analyzers installed.',
    diagnosticFailureMode: 'Counting asset creation or input volume (seedlings planted, m³ dredged, taps laid) without testing operational functionality.',
    primarySourceDocument: 'Departmental Outcome Budgets, e-Tendering Completion Logs & CAG Physical Verification',
  },
  {
    stageOrder: 6,
    stageName: 'Ecological Outcomes',
    accountingDefinition: 'Independently verified improvements in ambient environmental state (Secchi depth, Total P, PM2.5, Hangul recruitment, 5-yr native tree survival, BIS 10500 potability).',
    diagnosticFailureMode: '100% financial expenditure accompanied by stagnant or worsening trophic, atmospheric, or habitat indicators.',
    primarySourceDocument: 'Peer-Reviewed Monitoring, Satellite Archives, CPCB/WQMIS Logs & KEW-EIAI Evidence Matrix',
  },
  {
    stageOrder: 7,
    stageName: 'Economic & Welfare Returns',
    accountingDefinition: 'Avoided healthcare/flood damages, sustained fisheries/tourism/agricultural livelihoods, and preserved natural capital stocks.',
    diagnosticFailureMode: 'Regressive transfer of pollution and resource-depletion costs onto downstream communities and future taxpayers.',
    primarySourceDocument: 'SEEA Ecosystem Accounts, Cost-of-Illness Studies & Benefit–Cost Evaluations',
  },
];

// ─── 5. FOUR-TIER SEEA ENVIRONMENTAL EXPENDITURE CLASSIFICATION ───────────────
export const SEEA_EXPENDITURE_CLASSIFICATION: SeeaExpenditureCategory[] = [
  {
    code: 'TIER-1 (CEPA)',
    categoryName: 'Direct Environmental Protection Expenditure',
    seeaAlignment: 'UN SEEA Classification of Environmental Protection Activities (CEPA)',
    scopeDescription: 'Outlays whose primary purpose is preventing, reducing, or eliminating pollution and habitat degradation.',
    illustrativeJkHeads: ['JKPCC air/water/noise monitoring & labs', 'Municipal/UEED sewage treatment (STPs) & científica SWM remediation', 'Protected Area & Hangul habitat protection', 'EIA/EMP statutory compliance cells'],
    doubleCountingGuardrail: 'Net out Central Pollution Control / NCAP / SBM-U grants passed through UT Departments to ULBs so each rupee is counted once at final spender level.',
  },
  {
    code: 'TIER-2 (CReMA)',
    categoryName: 'Natural Resource Management & Conservation Expenditure',
    seeaAlignment: 'UN SEEA Classification of Resource Management Activities (CReMA)',
    scopeDescription: 'Outlays managing and restoring natural asset stocks (forests, lakes, wetlands, watersheds, springs, glaciers).',
    illustrativeJkHeads: ['Forest Dept, CAMPA & Social Forestry native restoration', 'LCMA (Dal-Nigeen) & WUCMA (Wular) conservation authorities', 'Soil & Water Conservation catchment check-dams', 'DEERS GIS/remote-sensing inventories'],
    doubleCountingGuardrail: 'Separate establishment/pension overhead from field conservation works; exclude commercial timber extraction costs.',
  },
  {
    code: 'TIER-3 (EMBEDDED)',
    categoryName: 'Environmentally Beneficial Embedded Sectoral Expenditure',
    seeaAlignment: 'OECD / UNDP Rio-Markers & Climate/Environment Budget Tagging',
    scopeDescription: 'Environmental, public-health, and climate-resilience components embedded inside broader development departments.',
    illustrativeJkHeads: ['Jal Shakti WTP filtration & source-protection components', 'Electric bus / clean public transit capex', 'I&FC non-destructive floodplain detention & DRR early warning', 'Integrated Pest Management & organic soil health'],
    doubleCountingGuardrail: 'Report strictly in a separate satellite account using explicit environmental relevance weights — never inflate Tier-1 core conservation totals.',
  },
  {
    code: 'TIER-4 (PRESSURE)',
    categoryName: 'Environmentally Pressure-Inducing / Externality-Generating Outlays',
    seeaAlignment: 'Environmental Fiscal Reform & Environmentally Harmful Subsidy/Outlay Screening',
    scopeDescription: 'Public capital or subsidy outlays that generate unmitigated ecological externalities when EMP/mitigation budgets are omitted or unenforced.',
    illustrativeJkHeads: ['Mountain road/highway slope cutting without muck containment', 'Unregulated Karewa earthfill & riverbed aggregate procurement', 'Alpine tourism infrastructure in fragile glacial/meadow buffers', 'Chemical input subsidies without runoff buffers'],
    doubleCountingGuardrail: 'Evaluates whether project DPRs internalise full EMP/restoration costs or externalise damages onto Tier-1/Tier-2 public budgets.',
  },
];

// ─── 6. ALL 23 ENVIRONMENTAL & SECTORAL INSTITUTIONS TO INVESTIGATE ───────────
export const ENVIRONMENTAL_INSTITUTIONS_23_AUDIT_INVENTORY: EnvironmentalInstitutionAuditTarget[] = [
  { id: 'inst-01', institutionName: 'Forest, Ecology and Environment Department', acronym: 'FEED J&K', administrativeCategory: 'Core Environment & Forestry', economicAndEnvironmentalAssessment: 'Overall environmental budget allocations, policy coordination, CAMPA oversight, and strategic priorities.', mandateVerificationNote: 'Verify secretariat Demand-for-Grant structure vs subordinate directorates across State (pre-2019) and UT budgets.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0039', 'KEW-INV-0040', 'KEW-INV-0046'] },
  { id: 'inst-02', institutionName: 'Jammu & Kashmir Forest Department', acronym: 'JKFD', administrativeCategory: 'Core Environment & Forestry', economicAndEnvironmentalAssessment: 'Territorial forest protection, compartment working plans, wildfire control, and native ecosystem restoration.', mandateVerificationNote: 'Separate salary/pension revenue heads from actual silvicultural and catchment restoration capital outlays.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0040', 'KEW-INV-0046', 'KEW-INV-0052'] },
  { id: 'inst-03', institutionName: 'Department of Wildlife Protection', acronym: 'DWP J&K', administrativeCategory: 'Core Environment & Forestry', economicAndEnvironmentalAssessment: 'National Parks, Wildlife Sanctuaries, Wetland Reserves (Ramsar), Hangul conservation, and human-wildlife conflict mitigation.', mandateVerificationNote: 'Audit funding per km² across Dachigam, Overa-Aru, Kazinag, Kishtwar, Hokersar, Shallabugh, and Haigam.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0013', 'KEW-INV-0018', 'KEW-INV-0040', 'KEW-INV-0046'] },
  { id: 'inst-04', institutionName: 'J&K Pollution Control Committee', acronym: 'JKPCC', administrativeCategory: 'Core Environment & Forestry', economicAndEnvironmentalAssessment: 'Ambient air/water/noise monitoring, Consent to Operate enforcement, NABL laboratory capacity, and scientific staffing.', mandateVerificationNote: 'Note statutory transition from J&K State Pollution Control Board (JKSPCB) to J&K Pollution Control Committee (JKPCC) post-2019.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0028', 'KEW-INV-0031', 'KEW-INV-0045', 'KEW-INV-0052'] },
  { id: 'inst-05', institutionName: 'Department of Ecology, Environment and Remote Sensing', acronym: 'DEERS', administrativeCategory: 'Core Environment & Forestry', economicAndEnvironmentalAssessment: 'Environmental research, wetland/lake GIS inventories (415-lake directory), EIAs, and SAPCC climate coordination.', mandateVerificationNote: 'Assess research grant share, GIS workstation/satellite procurement, and open-data publication capacity.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0009', 'KEW-INV-0043', 'KEW-INV-0047', 'KEW-INV-0052'] },
  { id: 'inst-06', institutionName: 'Lake Conservation and Management Authority', acronym: 'LCMA', administrativeCategory: 'Conservation Authority', economicAndEnvironmentalAssessment: 'Dal–Nigeen dredging, de-weeding (₹28.01 cr 2016–22 audited subset), aeration, STPs, catchment check-dams, and rehabilitation.', mandateVerificationNote: 'Reconcile former LAWDA accounts with reorganized LCMA grants, PMDP packages, and CAG Audit Report 125068.', financialDataExtractionStatus: 'CAG Partial Audit Anchor Available', linkedInvestigationCodes: ['KEW-INV-0001', 'KEW-INV-0010', 'KEW-INV-0011', 'KEW-INV-0012', 'KEW-INV-0041'] },
  { id: 'inst-07', institutionName: 'Wular Conservation and Management Authority', acronym: 'WUCMA', administrativeCategory: 'Conservation Authority', economicAndEnvironmentalAssessment: 'Wular Lake dredging, willow removal, shoreline demarcation, and Erin/Madhumati catchment siltation control.', mandateVerificationNote: 'Cross-verify CAG Lake Conservation Audit findings on dredged-volume retention vs tributary sediment influx.', financialDataExtractionStatus: 'CAG Partial Audit Anchor Available', linkedInvestigationCodes: ['KEW-INV-0005', 'KEW-INV-0041'] },
  { id: 'inst-08', institutionName: 'Soil and Water Conservation Department', acronym: 'SWCD', administrativeCategory: 'Core Environment & Forestry', economicAndEnvironmentalAssessment: 'Catchment erosion control, check-dams, gully plugging, Karewa stabilization, and watershed treatment.', mandateVerificationNote: 'Compare upstream per-tonne sediment interception cost against downstream lake/river mechanical dredging.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0003', 'KEW-INV-0041', 'KEW-INV-0046'] },
  { id: 'inst-09', institutionName: 'Social Forestry Department', acronym: 'SFD J&K', administrativeCategory: 'Core Environment & Forestry', economicAndEnvironmentalAssessment: 'Village woodlots, roadside/strip plantations, community forestry, and native vs exotic species selection.', mandateVerificationNote: 'Evaluate 5-year verified sapling survival rates rather than annual seedling planting counts.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0046'] },
  { id: 'inst-10', institutionName: 'J&K Biodiversity Council', acronym: 'JKBC', administrativeCategory: 'Core Environment & Forestry', economicAndEnvironmentalAssessment: 'People’s Biodiversity Registers (PBRs), Biodiversity Management Committees (BMCs), and Biological Diversity Act 2002 implementation.', mandateVerificationNote: 'Audit operational grant releases to BMCs and scientific verification quality of completed PBRs.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0040', 'KEW-INV-0046', 'KEW-INV-0052'] },
  { id: 'inst-11', institutionName: 'J&K CAMPA (Compensatory Afforestation Fund Management and Planning Authority)', acronym: 'CAMPA J&K', administrativeCategory: 'Conservation Authority', economicAndEnvironmentalAssessment: 'Net Present Value (NPV) receipts from forest land diversion, APO approvals, compensatory plantation survival, and catchment works.', mandateVerificationNote: 'Track off-budget/public-account CAMPA inflows vs diverted forest area and geo-tagged plantation polygons.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0044', 'KEW-INV-0046', 'KEW-INV-0053'] },
  { id: 'inst-12', institutionName: 'Forest Protection Force', acronym: 'FPF', administrativeCategory: 'Core Environment & Forestry', economicAndEnvironmentalAssessment: 'Anti-smuggling, encroachment prevention, and enforcement expenditure vs operational field mobility.', mandateVerificationNote: 'Examine establishment-to-field-operations expenditure ratio and coordination with territorial forest divisions.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0040', 'KEW-INV-0046', 'KEW-INV-0052'] },
  { id: 'inst-13', institutionName: 'State / UT Forest Research Institute', acronym: 'SFRI / J&K FRI', administrativeCategory: 'Core Environment & Forestry', economicAndEnvironmentalAssessment: 'Seed genetics, native conifer/broadleaf nursery protocols, forest pathology, and institutional scientific research capacity.', mandateVerificationNote: 'Audit R&D operational budget share, active research scientists, and peer-reviewed output.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0046', 'KEW-INV-0052'] },
  { id: 'inst-14', institutionName: 'Jal Shakti Department (PHE, Irrigation & Flood Control)', acronym: 'Jal Shakti / I&FC', administrativeCategory: 'Water, Urban & Sanitation', economicAndEnvironmentalAssessment: 'JJM drinking water schemes, WTP filtration upgrades, springshed protection, irrigation, and Jhelum/Tawi flood management.', mandateVerificationNote: 'Separate drinking-water quality/filtration capex & O&M from major irrigation and embankment works.', financialDataExtractionStatus: 'CAG Partial Audit Anchor Available', linkedInvestigationCodes: ['KEW-INV-0007', 'KEW-INV-0022', 'KEW-INV-0023', 'KEW-INV-0048', 'KEW-INV-0051'] },
  { id: 'inst-15', institutionName: 'Housing and Urban Development Department (incl. UEED & Smart Cities)', acronym: 'HUDD / UEED', administrativeCategory: 'Water, Urban & Sanitation', economicAndEnvironmentalAssessment: 'AMRUT/SBM-U sewerage networks, STP capital & electricity/chemical O&M, storm-drain interception, and wetland-margin master plans.', mandateVerificationNote: 'Audit cost per MLD of actually treated sewage meeting NGT/CPCB nitrogen & phosphorus standards.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0041', 'KEW-INV-0049'] },
  { id: 'inst-16', institutionName: 'Srinagar & Jammu Municipal Corporations', acronym: 'SMC & JMC', administrativeCategory: 'Water, Urban & Sanitation', economicAndEnvironmentalAssessment: 'Solid waste management (Achan/Kot Bhalwal remediation, MRF/bio-methanation), NCAP air-pollution funds, and urban drainage.', mandateVerificationNote: 'Track own-source municipal revenue vs tied 15th FC / SBM-U / NCAP grants and leachate/waste-processing efficiency.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0028', 'KEW-INV-0030', 'KEW-INV-0045', 'KEW-INV-0049'] },
  { id: 'inst-17', institutionName: 'Rural Development and Panchayati Raj Department', acronym: 'RDD J&K', administrativeCategory: 'Water, Urban & Sanitation', economicAndEnvironmentalAssessment: 'SBM-Grameen greywater/solid-waste assets, MGNREGA springshed/pond/watershed works (Amrit Sarovar), and rural riparian sanitation.', mandateVerificationNote: 'Verify post-construction operationality of rural soak-pits, segregation sheds, and rejuvenated village ponds.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0009', 'KEW-INV-0048', 'KEW-INV-0049'] },
  { id: 'inst-18', institutionName: 'Tourism Department & Tourism Development Authorities', acronym: 'JKTD / TDAs', administrativeCategory: 'Development & Infrastructure Externality', economicAndEnvironmentalAssessment: 'Tourism revenue & GSDP contribution vs Gulmarg/Pahalgam/Sonamarg/Patnitop/Dal environmental infrastructure and waste externalities.', mandateVerificationNote: 'Include resort-specific Development Authorities (GDA, PDA, SDA, etc.) to test whether tourism revenues fund ecological carrying-capacity safeguards.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0002', 'KEW-INV-0044', 'KEW-INV-0050', 'KEW-INV-0053'] },
  { id: 'inst-19', institutionName: 'Transport Department (MVD, JKRTC & Traffic)', acronym: 'Transport J&K', administrativeCategory: 'Development & Infrastructure Externality', economicAndEnvironmentalAssessment: 'Vehicle tax/registration receipts vs PUCC enforcement, automated testing stations, e-bus transition, and public transit investment.', mandateVerificationNote: 'Compare road-tax revenues collected against budget share reinvested in clean mass transit and emissions testing.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0026', 'KEW-INV-0034', 'KEW-INV-0035', 'KEW-INV-0045', 'KEW-INV-0053'] },
  { id: 'inst-20', institutionName: 'Department of Disaster Management, Relief, Rehabilitation & Reconstruction', acronym: 'DMRRR / SDMA', administrativeCategory: 'Development & Infrastructure Externality', economicAndEnvironmentalAssessment: 'SDRF/SDMF allocations: ex-ante GLOF, landslide, avalanche & flood risk reduction vs ex-post disaster relief expenditure.', mandateVerificationNote: 'Separate Disaster Mitigation Fund (SDMF) preventive investments from post-event relief disbursements.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0008', 'KEW-INV-0047', 'KEW-INV-0051'] },
  { id: 'inst-21', institutionName: 'Geology and Mining Department', acronym: 'G&M J&K', administrativeCategory: 'Development & Infrastructure Externality', economicAndEnvironmentalAssessment: 'Minor-mineral riverbed/Karewa royalty receipts, District Mineral Foundation (DMF) collections, and mine-site ecological rehabilitation.', mandateVerificationNote: 'Compare mineral royalty revenues against riverbed bridge-pier scour, thalweg incision, irrigation intake failure, and DMF restoration spend.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0004', 'KEW-INV-0042', 'KEW-INV-0044', 'KEW-INV-0053'] },
  { id: 'inst-22', institutionName: 'Agriculture Production & Horticulture Departments', acronym: 'APD / Hort J&K', administrativeCategory: 'Development & Infrastructure Externality', economicAndEnvironmentalAssessment: 'Fertilizer/agrochemical input support, HADP outlays, soil-health testing labs, biological pest control, and non-point runoff mitigation.', mandateVerificationNote: 'Evaluate HADP (Holistic Agriculture Development Programme) environmental sustainability allocations vs chemical intensification.', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0043', 'KEW-INV-0044'] },
  { id: 'inst-23', institutionName: 'Power Development Department & JKPDC', acronym: 'PDD / JKPDC', administrativeCategory: 'Development & Infrastructure Externality', economicAndEnvironmentalAssessment: 'Power purchase & grid losses in revenue budget, hydropower e-flow/sediment externalities, and solar/clean winter heating transition.', mandateVerificationNote: 'Assess fiscal trade-off between power-sector deficit support, hydropower ecological costs, and clean winter heating (reducing biomass PM2.5).', financialDataExtractionStatus: 'Requires Detailed Demand-for-Grants Extraction', linkedInvestigationCodes: ['KEW-INV-0029', 'KEW-INV-0044', 'KEW-INV-0047'] },
];

// ─── 7. ELEVEN INSTITUTIONAL CAPACITY DEFICIT PARAMETERS ──────────────────────
export const INSTITUTIONAL_CAPACITY_PARAMETERS: InstitutionalCapacityParameter[] = [
  { parameter: 'Sanctioned Positions', requiredAssessment: 'Legislatively/administratively approved staffing strength across scientific, technical, and frontline cadres.', diagnosticPurpose: 'Establishes whether approved organizational design matches post-2019 statutory environmental workload.', verificationSource: 'Budget Establishment Appendices & Departmental Recruitment Rules' },
  { parameter: 'Filled Positions & Vacancy Rate', requiredAssessment: 'Actual in-position personnel vs sanctioned posts across districts and divisions.', diagnosticPurpose: 'Tests whether unspent budgets or weak enforcement stem from chronic human-resource vacancies.', verificationSource: 'GAD / Departmental Annual Administrative Reports & RTI/Assembly Disclosures' },
  { parameter: 'Scientific & Specialist Staff', requiredAssessment: 'Qualified limnologists, hydrogeologists, atmospheric chemists, wildlife biologists, and environmental economists.', diagnosticPurpose: 'Distinguishes generalist administrative staffing from actual scientific analytical capacity.', verificationSource: 'JKPCC, DEERS, LCMA, SFRI & DWP Cadre Schedules' },
  { parameter: 'Technical Field Equipment', requiredAssessment: 'Availability, calibration, and operational uptime of ADCPs, sondes, CAAQMS analyzers, Class-1 sound meters, and harvesters.', diagnosticPurpose: 'Identifies capital assets procured but idled due to missing calibration or spare-parts budgets.', verificationSource: 'CAG Asset Audits, Tender AMC Logs & Station Uptime Records' },
  { parameter: 'Laboratory Accreditation', requiredAssessment: 'NABL (ISO/IEC 17025) accreditation scope, sample throughput, heavy-metal/pesticide/GC-MS & ICP-MS capability.', diagnosticPurpose: 'Determines evidentiary admissibility of regulatory water, air, soil, and effluent testing.', verificationSource: 'NABL Directory, JKPCC Central/Regional Labs & Jal Shakti WQMIS Labs' },
  { parameter: 'Monitoring Station Coverage', requiredAssessment: 'Spatial density and telemetry continuity across urban, rural, subalpine, and alpine gradients in all 20 J&K districts.', diagnosticPurpose: 'Quantifies spatial blind spots where zero empirical monitoring exists.', verificationSource: 'CPCB, CWC, CGWB, IMD & KEW Monitoring Registries' },
  { parameter: 'Dedicated Research Funding', requiredAssessment: 'Share of agency expenditure allocated to independent baseline studies, bathymetry, source apportionment, and peer-reviewed science.', diagnosticPurpose: 'Evaluates whether billions in civil works proceed without <1% scientific diagnostic funding.', verificationSource: 'Detailed Demands for Grants (Research/Survey Object Heads) & CAG Report 125068' },
  { parameter: 'Enforcement & Inspection Capacity', requiredAssessment: 'Inspections per officer, show-cause notices, environmental compensation recovery, and compliance follow-through.', diagnosticPurpose: 'Separates statutory adequacy on paper from field regulatory deterrence.', verificationSource: 'JKPCC Annual Reports, NGT Compliance Filings & High Court Status Reports' },
  { parameter: 'Operational & Maintenance (O&M) Funding', requiredAssessment: 'Non-salary O&M provision for STP electricity/reagents, desilting basin clearing, sensor calibration, and patrol rations.', diagnosticPurpose: 'Explains why capital infrastructure degrades rapidly after commissioning ("build-neglect-rebuild" cycle).', verificationSource: 'Revenue Budget Object Heads (O&M / Energy / Materials) vs Installed Capex' },
  { parameter: 'Digital & Geospatial Infrastructure', requiredAssessment: 'Enterprise GIS, real-time public APIs, digitized gazette/cadastral archives, and PFMS-linked asset tracking.', diagnosticPurpose: 'Assesses institutional readiness for reproducible SEEA accounting and cumulative EIA screening.', verificationSource: 'DEERS, NIC J&K Portals & Open Data Readiness Audits' },
  { parameter: 'Public Scientific & Financial Transparency', requiredAssessment: 'Timely machine-readable publication of DPRs, EIAs, monitoring raw series, utilization certificates, and audit action-taken notes.', diagnosticPurpose: 'Measures public accountability and independent scientific verifiability.', verificationSource: 'Official Departmental Portals, PARIVESH, jktenders & jakfinance-jk.com' },
];

// ─── 8. TEN UN SEEA NATURAL CAPITAL ASSET ACCOUNTS FOR JAMMU & KASHMIR ────────
export const NATURAL_CAPITAL_ASSET_ACCOUNTS: NaturalCapitalAssetAccount[] = [
  { assetName: 'Glaciers & Seasonal Snowpack', seeaAccountClass: 'SEEA Water & Cryospheric Ecosystem Extent/Condition', economicServices: 'Seasonal meltwater regulation sustaining summer paddy/horticulture irrigation, drinking water, and run-of-river hydropower.', physicalMetrics: ['Glacier area (km²) & geodetic mass balance (m w.e./yr)', 'Equilibrium Line Altitude (m ASL)', 'Spring/summer snow-water equivalent (MCM)'], monetaryValuationMethod: 'Water storage replacement cost (reservoir equivalent) & downstream agricultural/hydropower production-function sensitivity.', nonMonetizableDimension: 'Irreversible cryospheric heritage, alpine microclimate regulation, and transboundary Indus basin stability.', linkedKewRoute: '/water-systems/glaciers' },
  { assetName: 'Lakes (521 Kashmir Registry + Jammu/Montane Lakes)', seeaAccountClass: 'SEEA Freshwater Lacustrine Ecosystem Account', economicServices: 'Inland fisheries (Schizothorax), nature/houseboat recreation, microclimate moderation, and flood/water storage.', physicalMetrics: ['Open-water surface area (km²) & bathymetric volume (MCM)', 'Carlson Trophic State Index (TSI)', 'Native-to-exotic fish biomass ratio'], monetaryValuationMethod: 'Water treatment avoided cost, commercial fishery net income, and travel-cost / hedonic recreation valuation.', nonMonetizableDimension: 'Millennial cultural identity of Dal, Wular, Manasbal, Sheshnag, Mansar, and Surinsar.', linkedKewRoute: '/water-systems/lakes' },
  { assetName: 'Wetlands & Floodplain Marshes', seeaAccountClass: 'SEEA Wetland Extent, Hydroperiod & Regulating Services', economicServices: 'Peak Jhelum flood-wave attenuation, nitrogen/phosphorus phytoremediation, and Central Asian Flyway waterfowl habitat.', physicalMetrics: ['Functional hydroperiod area (ha)', 'Off-channel flood detention volume (MCM)', 'Vegetative N/P retention (t/yr)'], monetaryValuationMethod: 'Expected Annual Flood Damage (EAD) avoided & tertiary STP nutrient-removal replacement cost.', nonMonetizableDimension: 'Migratory avifauna flyway survival and wetland biodiversity refugia (Hokersar, Shallabugh, Haigam, Gharana).', linkedKewRoute: '/water-systems/wetlands' },
  { assetName: 'Temperate, Subalpine & Subtropical Forests', seeaAccountClass: 'SEEA Forest Extent, Carbon & Timber/NTFP Stock Account', economicServices: 'Aboveground/soil carbon sequestration, slope/erosion stabilization, spring recharge, and non-timber forest livelihoods.', physicalMetrics: ['Canopy density classes (VDF/MDF/OF km²)', 'Standing carbon stock (Mt C)', 'RUSLE soil-loss retention (t/yr)'], monetaryValuationMethod: 'Social carbon accounting (with explicit price sensitivity), downstream siltation avoided cost, and sustainable NTFP flows.', nonMonetizableDimension: 'Endemic Himalayan cedar-fir-birch genetic diversity and sacred grove landscapes.', linkedKewRoute: '/biodiversity/forest-ecosystems' },
  { assetName: 'Plio-Pleistocene Karewas (Wudars)', seeaAccountClass: 'SEEA Land, Soil & Geo-Heritage Irreversible Asset Account', economicServices: 'High-value GI saffron, almond & apple production, perched spring recharge, and 4-million-year paleoclimatic stratigraphy.', physicalMetrics: ['Intact plateau area (ha)', 'Excavated earthfill volume (m³)', 'Loess-paleosol organic carbon & stratigraphic integrity'], monetaryValuationMethod: 'Perpetual present value of foregone saffron/orchard net returns + downstream siltation externality cost.', nonMonetizableDimension: 'Irreplaceable Quaternary geological, fossil, and archaeological type-sections that cannot be reconstructed at any cost.', linkedKewRoute: '/earth-human-impact/land-earth-systems' },
  { assetName: 'Rivers & Mountain Tributaries', seeaAccountClass: 'SEEA Fluvial Surface Water & Sediment Continuity Account', economicServices: 'Municipal/rural water supply intakes, gravity canal irrigation, cold-water fisheries, and renewable hydropower generation.', physicalMetrics: ['Seasonal discharge & e-flow compliance (%)', 'Thalweg bed elevation change (m)', 'Water Quality Index / BOD / coliform'], monetaryValuationMethod: 'Water-supply treatment cost differential, bridge/intake scour repair avoided cost, and hydropower sediment-wear cost.', nonMonetizableDimension: 'Free-flowing longitudinal river connectivity and native Schizothorax spawning migrations.', linkedKewRoute: '/water-systems/rivers' },
  { assetName: 'Karst, Fracture & Karewa Springs', seeaAccountClass: 'SEEA Groundwater & Springshed Discharge Account', economicServices: 'Decentralized gravity-fed rural drinking water, baseflow maintenance, and low-energy high-purity supply.', physicalMetrics: ['Perennial vs seasonal spring count', 'Dry-season baseflow (L/s) & recession constant α', 'BIS IS 10500 nitrate/coliform compliance'], monetaryValuationMethod: 'Avoided deep-tubewell pumping/piped WTP capital & energy replacement cost + avoided waterborne morbidity.', nonMonetizableDimension: 'Sacred Nag/spring heritage (Verinag, Kokernag, Achabal, Chashma Shahi, Martand, Tatapani).', linkedKewRoute: '/water-systems/springs' },
  { assetName: 'Biodiversity & Wildlife Corridors', seeaAccountClass: 'SEEA Species & Ecosystem Condition Account', economicServices: 'Trophic resilience, pollination (critical for apple orchards), pest regulation, and high-value nature tourism.', physicalMetrics: ['Hangul & threatened taxa population viability', 'Effective corridor mesh size (km²)', 'Wild pollinator visitation rates'], monetaryValuationMethod: 'Orchard pollination production-function value & habitat restoration replacement cost.', nonMonetizableDimension: 'Intrinsic existence value of Critically Endangered Hangul (Cervus hanglu hanglu), Markhor, and Snow Leopard.', linkedKewRoute: '/biodiversity' },
  { assetName: 'Alpine & Subalpine Meadows (Margs / Bahaks)', seeaAccountClass: 'SEEA Grassland/Alpine Pasture Condition Account', economicServices: 'Seasonal transhumant pastoralism, snowmelt infiltration sponge, medicinal flora, and landscape recreation.', physicalMetrics: ['Native alpine turf cover (%) vs bare compacted soil', 'Infiltration rate (mm/hr)', 'Invasive nitrophilous weed share (%)'], monetaryValuationMethod: 'Pastoralist fodder replacement value & flash-runoff/erosion attenuation value.', nonMonetizableDimension: 'Transhumant Gujjar-Bakarwal and Chopan cultural ecology and endemic alpine flora.', linkedKewRoute: '/protected-network' },
  { assetName: 'Clean Valley & Mountain Atmosphere', seeaAccountClass: 'SEEA Air Emission & Atmospheric Condition Account', economicServices: 'Avoided cardiopulmonary morbidity/mortality, visibility for aviation/tourism, and clean snow-albedo preservation.', physicalMetrics: ['Population-weighted annual PM2.5 (µg/m³)', 'Black carbon deposition on glaciers (ng/g)', 'Quiet acoustic compliance (% zones within dB limits)'], monetaryValuationMethod: 'Epidemiological Cost-of-Illness (COI), productivity loss, and snowmelt timing shift cost.', nonMonetizableDimension: 'Human health dignity, child lung development, and Himalayan visual/acoustic serenity.', linkedKewRoute: '/environmental-monitoring/air-pollution' },
];

// ─── 9. THIRTEEN ENVIRONMENTAL DEGRADATION ECONOMIC VALUATION DOMAINS ─────────
export const ENVIRONMENTAL_DAMAGE_VALUATION_MATRIX: EnvironmentalDamageValuationDomain[] = [
  { degradationProcess: 'Dal Lake Eutrophication', economicValuationMethod: 'WTP/STP nutrient-treatment replacement cost, native fishery income loss, and travel-cost/contingent recreation valuation.', primaryAffectedReceptors: 'Dal–Nigeen fisherfolk, houseboat/shikara livelihoods, Srinagar water consumers', doubleCountingSafeguard: 'Exclude capitalized property-value shifts if recreation & fishery income flows are counted directly.', evidenceMaturity: 'Empirical Cost Anchor Available', linkedInvestigationCode: 'KEW-INV-0041' },
  { degradationProcess: 'Wular Lake Sedimentation', economicValuationMethod: 'Lost flood-storage volume replacement cost (reservoir/embankment equivalent) + fishery & chestnut (Trapa) livelihood loss.', primaryAffectedReceptors: 'Bandipora–Sopore–Srinagar Jhelum floodplain settlements & Wular fishing communities', doubleCountingSafeguard: 'Count flood-attenuation benefit once (either via Wular storage account or downstream Jhelum EAD, never summed twice).', evidenceMaturity: 'Empirical Cost Anchor Available', linkedInvestigationCode: 'KEW-INV-0041' },
  { degradationProcess: 'Urban & Floodplain Wetland Conversion', economicValuationMethod: 'Expected Annual Flood Damage (EAD) increment from lost detention MCM (calibrated to 2014 flood) + lost phytoremediation value.', primaryAffectedReceptors: 'Srinagar, Bemina, Narkara, Hokersar & Jhelum basin urban households and businesses', doubleCountingSafeguard: 'Separate structural flood asset losses from business-interruption flows using World Bank JTFRP accounting boundaries.', evidenceMaturity: 'Empirical Cost Anchor Available', linkedInvestigationCode: 'KEW-INV-0042' },
  { degradationProcess: 'Forest Degradation & Fragmentation', economicValuationMethod: 'SEEA carbon stock loss, RUSLE downstream siltation cost, and 5-year survival-adjusted native restoration cost.', primaryAffectedReceptors: 'Upland forest communities, downstream reservoirs/lakes, regional carbon balance', doubleCountingSafeguard: 'Do not sum CAMPA statutory NPV receipts with physical ecosystem-service losses as additive damages.', evidenceMaturity: 'Scoping — Requires Primary Valuation Survey', linkedInvestigationCode: 'KEW-INV-0046' },
  { degradationProcess: 'Plio-Pleistocene Karewa Destruction', economicValuationMethod: 'Perpetual foregone GI saffron/apple net agricultural value + fugitive PM10 health cost + tributary siltation cost.', primaryAffectedReceptors: 'Pampore, Budgam, Pulwama & Shopian agrarian economies; Quaternary geo-heritage', doubleCountingSafeguard: 'Report paleoclimatic/fossil archive loss strictly in physical/qualitative geo-heritage accounts alongside agricultural NPV.', evidenceMaturity: 'Scoping — Requires Primary Valuation Survey', linkedInvestigationCode: 'KEW-INV-0042' },
  { degradationProcess: 'Glacier Retreat & Snowpack Shift', economicValuationMethod: 'Late-summer irrigation deficit production-function loss, hydropower peaking revenue variance, and storage adaptation cost.', primaryAffectedReceptors: 'Lidder, Sindh, Vishow, Chenab & Tawi basin farmers, utilities, and drinking-water schemes', doubleCountingSafeguard: 'Partition meltwater impact cleanly across agriculture, domestic supply, and hydropower without overlapping water volumes.', evidenceMaturity: 'Scoping — Requires Primary Valuation Survey', linkedInvestigationCode: 'KEW-INV-0047' },
  { degradationProcess: 'Ambient Air Pollution (PM2.5 & Black Carbon)', economicValuationMethod: 'Cost-of-Illness (hospitalizations, COPD/CVD medication, workdays lost) + mortality risk valuation with explicit VSL sensitivity bounds.', primaryAffectedReceptors: 'Srinagar metropolitan bowl, highway towns, brick-kiln clusters, and winter inversion basins', doubleCountingSafeguard: 'Keep medical/productivity COI strictly separated from welfare VSL estimates; report both ranges transparently.', evidenceMaturity: 'Scoping — Requires Primary Valuation Survey', linkedInvestigationCode: 'KEW-INV-0042' },
  { degradationProcess: 'Transportation & Urban Noise Pollution', economicValuationMethod: 'Sleep-disturbance/hypertension DALY burden, hospital/school acoustic retrofitting cost, and hedonic welfare loss.', primaryAffectedReceptors: 'Hospital Silence Zones (SMHS, SKIMS, Lal Ded, GMC Jammu), schools & arterial corridors', doubleCountingSafeguard: 'Isolate acoustic cardiovascular risk from co-located vehicular PM2.5 exposure using multi-pollutant adjustment.', evidenceMaturity: 'Scoping — Requires Primary Valuation Survey', linkedInvestigationCode: 'KEW-INV-0042' },
  { degradationProcess: 'Drinking Water Contamination', economicValuationMethod: 'Waterborne disease COI (gastroenteritis, hepatitis A/E, typhoid), household boiling/RO defensive expenditure, and WTP upgrade cost.', primaryAffectedReceptors: 'Households on unfiltered schemes, contaminated springs, and intermittent distribution networks', doubleCountingSafeguard: 'Avoid adding public WTP capital cost and avoided future household defensive expenditure without time-horizon separation.', evidenceMaturity: 'Empirical Cost Anchor Available', linkedInvestigationCode: 'KEW-INV-0048' },
  { degradationProcess: 'Biodiversity & Pollinator Decline', economicValuationMethod: 'Apple/almond pollination yield-loss sensitivity + protected-area/corridor ecological restoration cost.', primaryAffectedReceptors: 'Kashmir horticulture economy (~₹10,000+ cr sector) & endemic Himalayan fauna', doubleCountingSafeguard: 'Report Critically Endangered species (Hangul) primarily via physical viability metrics rather than speculative willingness-to-pay.', evidenceMaturity: 'Scoping — Requires Primary Valuation Survey', linkedInvestigationCode: 'KEW-INV-0046' },
  { degradationProcess: 'Springshed & Groundwater Depletion', economicValuationMethod: 'Incremental pumping energy/deepening cost, tanker emergency supply expenditure, and spring-recharge restoration cost.', primaryAffectedReceptors: 'Karewa uplands, Kandi belt (Jammu), and foothill rural habitations', doubleCountingSafeguard: 'Net energy subsidies out of economic shadow-price pumping costs.', evidenceMaturity: 'Scoping — Requires Primary Valuation Survey', linkedInvestigationCode: 'KEW-INV-0048' },
  { degradationProcess: 'Catchment Soil Erosion', economicValuationMethod: 'On-farm nutrient replacement cost + off-site reservoir/lake/canal desilting expenditure.', primaryAffectedReceptors: 'Sloping rainfed farms, hydropower desilting chambers, Dal/Wular/Manasbal settling basins', doubleCountingSafeguard: 'Separate on-site agronomic yield loss from downstream dredging cost.', evidenceMaturity: 'Scoping — Requires Primary Valuation Survey', linkedInvestigationCode: 'KEW-INV-0042' },
  { degradationProcess: 'Unscientific Riverbed Mining', economicValuationMethod: 'Bridge-pier/apron underpinning repair cost, gravity irrigation canal headwork failure cost, and channel restoration cost vs mineral royalties.', primaryAffectedReceptors: 'Rambiara, Vishow, Doodhganga, Sindh, Jhelum & Tawi public infrastructure and farmers', doubleCountingSafeguard: 'Compare verified public infrastructure repair bills directly against Geology & Mining royalty receipts.', evidenceMaturity: 'Empirical Cost Anchor Available', linkedInvestigationCode: 'KEW-INV-0044' },
];

// ─── 10. NINE ECONOMIC DEVELOPMENT EXTERNALITY SECTORS ────────────────────────
export const DEVELOPMENT_EXTERNALITY_SECTORS: DevelopmentExternalityRow[] = [
  { economicActivity: 'Mass & Alpine Tourism', potentialEnvironmentalCost: 'Peak-season untreated sewage, solid waste backhaul deficits, subalpine meadow compaction, and oligotrophic tarn nutrient loading.', costTransferMechanism: 'Tourism revenues accrue privately/fiscally while LCMA, ULBs, and fragile alpine watersheds absorb waste and restoration liabilities.', mitigationInternalisationTest: 'Share of tourism & TDA receipts ring-fenced for tertiary sanitation and carrying-capacity enforcement (KEW-INV-0050).' },
  { economicActivity: 'Highway & Tunnel Construction', potentialEnvironmentalCost: 'Forest diversion, steep cut-slope destabilization, Karewa bench excavation, and tributary muck-disposal turbidity.', costTransferMechanism: 'Minimizing civil earthwork haulage/retaining costs shifts landslide clearance and river-siltation bills onto public budgets.', mitigationInternalisationTest: 'EMP share of project civil cost, bio-engineering slope stabilization, and audited muck-site containment (KEW-INV-0044).' },
  { economicActivity: 'Riverbed & Karewa Mining', potentialEnvironmentalCost: 'Thalweg incision, bridge pier scour, lowered alluvial water tables, and permanent loss of saffron-bearing Karewa paleosols.', costTransferMechanism: 'Short-term minor-mineral royalties dwarfed by multi-crore public bridge/irrigation reconstruction costs.', mitigationInternalisationTest: 'Ratio of DMF + royalty receipts to audited infrastructure repair and geomorphic rehabilitation costs (KEW-INV-0044).' },
  { economicActivity: 'Unplanned Urban Development', potentialEnvironmentalCost: 'Wetland/floodplain infilling, natural drainage occlusion, impervious runoff surges, and unsewered sprawl.', costTransferMechanism: 'Private real-estate gains on former floodplains create catastrophic socialized flood-relief liabilities (as in Sept 2014).', mitigationInternalisationTest: 'Floodplain zoning enforcement and stormwater/sewerage development impact fees (KEW-INV-0044, KEW-INV-0051).' },
  { economicActivity: 'Motorized Transportation Growth', potentialEnvironmentalCost: 'Winter-inversion PM2.5/NOx/BC accumulation, hospital Silence-Zone acoustic exceedances, and congestion fuel waste.', costTransferMechanism: 'Road-tax/fuel revenues enter general funds while households bear respiratory/cardiovascular Cost-of-Illness.', mitigationInternalisationTest: 'Share of transport capex & vehicle taxation dedicated to electric mass transit and emission control (KEW-INV-0044, KEW-INV-0053).' },
  { economicActivity: 'Chemical-Intensive Horticulture', potentialEnvironmentalCost: '12–16 annual fungicide/pesticide sprays leaching into Karewa springs, pollinator decline, and orchard soil acidification.', costTransferMechanism: 'Short-term yield protection externalizes drinking-water contamination and wild-pollinator losses.', mitigationInternalisationTest: 'Budget ratio of IPM/biocontrol/residue-testing labs to chemical input promotion (KEW-INV-0044).' },
  { economicActivity: 'Run-of-River Hydropower', potentialEnvironmentalCost: 'De-watered river reaches, hydropeaking, reservoir sediment trapping, tunnel blasting spring disruption, and blocked Schizothorax migration.', costTransferMechanism: 'Generation revenues omit downstream fishery collapse, spring drying compensation, and sediment-starved bed incision.', mitigationInternalisationTest: 'Real-time e-flow telemetry compliance and local watershed/spring restitution funds (KEW-INV-0044).' },
  { economicActivity: 'Urban & Corridor Construction', potentialEnvironmentalCost: 'Fugitive coarse particulate dust (PM10), unsegregated C&D debris dumped in wetland margins, and aggregate demand.', costTransferMechanism: 'Unenforced dust/C&D rules transfer respiratory burden and municipal cleanup costs to urban residents.', mitigationInternalisationTest: 'Mandatory C&D recycling plant utilization and escrowed site dust-control bonds (KEW-INV-0049).' },
  { economicActivity: 'Industrial Estates & Brick Kilns', potentialEnvironmentalCost: 'Winter coal/biomass kiln plumes (SO2, PM2.5, BC), unlined industrial effluent discharges, and agricultural topsoil stripping for bricks.', costTransferMechanism: 'Delayed zig-zag kiln conversion and non-functional CETPs shift health and crop losses onto surrounding villages.', mitigationInternalisationTest: 'CETP polluter-pays user charges and clean-kiln transition financing (KEW-INV-0045).' },
];

// ─── 11. TEN PUBLIC INVESTMENT EFFECTIVENESS & BCR BENCHMARKS ─────────────────
export const INTERVENTION_RETURN_BCR_MATRIX: InterventionReturnBenchmark[] = [
  { intervention: 'Dal Lake Mechanical Dredging', environmentalPerformanceIndicator: 'Net verified bathymetric gain (MCM), open-water persistence, and internal P-flux change net of Telbal re-siltation.', auditedBaselineOrAnchor: 'CAG Performance Audit documented siltation rebound where upstream Telbal settling basin and catchment erosion remained untreated.', economicEvaluationMetric: '₹/m³ net permanent storage gained vs upstream check-dam/settling-basin sediment interception cost.', linkedInvestigationCode: 'KEW-INV-0041' },
  { intervention: 'Mechanized & Manual De-weeding', environmentalPerformanceIndicator: 'Net N/P mass exported (tonnes) vs sediment resuspension, macroinvertebrate loss, and seasonal regrowth.', auditedBaselineOrAnchor: '₹28.01 cr audited expenditure (2016–2022), with ₹16.18 cr (57.8%) spent outside prescribed harvesting months (CAG).', economicEvaluationMetric: '₹ per kg phosphorus permanently exported vs tertiary STP P-stripping cost.', linkedInvestigationCode: 'KEW-INV-0010' },
  { intervention: 'Mechanical Aeration & Jet Fountains', environmentalPerformanceIndicator: 'Sustained benthic Dissolved Oxygen (mg/L) radius & redox P-lock per MWh electricity consumed.', auditedBaselineOrAnchor: 'Localized surface plumes vs whole-basin biochemical oxygen demand; continuous electricity & O&M liability.', economicEvaluationMetric: 'Lifecycle ₹ per kg O2 transferred to hypolimnion/benthos vs external BOD cutoff.', linkedInvestigationCode: 'KEW-INV-0011' },
  { intervention: 'Municipal & Peripheral Sewage Treatment (STPs)', environmentalPerformanceIndicator: 'Actual MLD treated × verified BOD, Total N, and orthophosphate removal efficiency (%).', auditedBaselineOrAnchor: 'Secondary FAB STPs lacking tertiary phosphorus removal or sewer network connectivity underperform capital outlay.', economicEvaluationMetric: '₹ per kg BOD & PO4-P abated at outfall (including 15-year electricity/reagent O&M).', linkedInvestigationCode: 'KEW-INV-0049' },
  { intervention: 'CAMPA & Departmental Afforestation', environmentalPerformanceIndicator: 'Geo-tagged 5-year surviving native multi-species canopy area (ha) rather than nominal seedlings planted.', auditedBaselineOrAnchor: 'Requires independent satellite + plot audit of plantation survival and native vs exotic composition.', economicEvaluationMetric: 'Survival-adjusted cost C_eff (₹ per surviving native tree at year 5) & RUSLE erosion abated.', linkedInvestigationCode: 'KEW-INV-0046' },
  { intervention: 'Protected-Area & Hangul Conservation', environmentalPerformanceIndicator: 'Effective habitat mesh size, Hangul fawn-to-hind ratio & population trend, and reduced alpine grazing overlap.', auditedBaselineOrAnchor: 'WII MEE & Hangul census series (~197–289 individuals restricted primarily to Dachigam core).', economicEvaluationMetric: 'Frontline protection & corridor eco-development outlay per km² of viable habitat.', linkedInvestigationCode: 'KEW-INV-0046' },
  { intervention: 'NCAP & Urban Air Pollution Control', environmentalPerformanceIndicator: 'Reduction in winter & annual population-weighted fine particulate matter (PM2.5 µg/m³), not merely PM10 road-paving.', auditedBaselineOrAnchor: 'Historical Srinagar PM10 (2.0–3.2×) & PM2.5 (1.7–2.8×) NAAQS baseline; test NCAP sweeper/paving vs combustion abatement.', economicEvaluationMetric: '₹ spent per 1 µg/m³ population-weighted PM2.5 reduction & avoided COI.', linkedInvestigationCode: 'KEW-INV-0045' },
  { intervention: 'JJM & Public Drinking Water Schemes', environmentalPerformanceIndicator: 'Households receiving continuous, adequately chlorinated, BIS IS 10500 potable tap water year-round.', auditedBaselineOrAnchor: 'Historical March 2013 CAG baseline (1.609M population / 341 unfiltered schemes) vs current WTP & FHTC functionality.', economicEvaluationMetric: 'DALYs & waterborne COI averted per ₹ crore of verified filtration + source protection.', linkedInvestigationCode: 'KEW-INV-0048' },
  { intervention: 'Flood Protection & Wetland Detention', environmentalPerformanceIndicator: 'Verified peak flood-stage reduction (cm) and Expected Annual Flood Damage (EAD) avoided.', auditedBaselineOrAnchor: 'Sept 2014 Jhelum flood catastrophic economic loss benchmark vs wetland detention reconnection.', economicEvaluationMetric: 'BCR of wetland/spill-channel reconnection vs isolated embankment raising & repetitive channel dredging.', linkedInvestigationCode: 'KEW-INV-0051' },
  { intervention: 'Ramsar & Floodplain Wetland Restoration', environmentalPerformanceIndicator: 'Recovered seasonal hydroperiod (ha), detention volume (MCM), silt trapping, and wintering waterbird guild diversity.', auditedBaselineOrAnchor: 'Hokersar, Wular, Shallabugh & Haigam management plans and CAG waterbody audit (Report No. 4 of 2025).', economicEvaluationMetric: 'Bundled ecosystem-service BCR (flood attenuation + nutrient removal + carbon + biodiversity).', linkedInvestigationCode: 'KEW-INV-0041' },
];

// ─── 12. THIRTEEN AUTHORITATIVE FINANCIAL & SCIENTIFIC DATA REPOSITORIES ─────
export const PRIMARY_FISCAL_AND_ECONOMIC_SOURCES: FiscalEvidenceSourceRepo[] = [
  { sourceName: 'J&K Finance Department Budget Portal (FY 2026–27)', custodianBody: 'Finance Department, Govt. of Jammu & Kashmir', requiredInformation: 'Budget speeches, Annual Financial Statements, Detailed Demands for Grants, FRBM statements, and 2025–26 RE / 2024–25 Actuals.', officialUrl: 'https://jakfinance-jk.com/budget2026-27.html', geographicCoverage: 'UT of Jammu & Kashmir (UT-wide & Divisional Heads)' },
  { sourceName: 'CAG J&K Financial Audit Report (2024–25)', custodianBody: 'Comptroller and Auditor General of India', requiredInformation: 'Audited UT Finance Accounts, Appropriation Accounts, unspent balances, utilization certificates, and fiscal liabilities.', officialUrl: 'https://cag.gov.in/en/audit-report/details/125155', geographicCoverage: 'UT of Jammu & Kashmir' },
  { sourceName: 'CAG Jammu & Kashmir Departmental & Performance Audits', custodianBody: 'CAG Accountant General (Audit) J&K', requiredInformation: 'Historical State (2000–2019) and UT (2019–2026) compliance and performance audits across water, forests, urban, and mining.', officialUrl: 'https://cag.gov.in/ag/jammu-kashmir/en/audit-report', geographicCoverage: 'Former J&K State & UT of Jammu & Kashmir' },
  { sourceName: 'CAG Performance Audit on Conservation of Dal & Wular Lakes', custodianBody: 'Comptroller and Auditor General of India', requiredInformation: 'Audited conservation expenditure, ₹28.01 cr de-weeding seasonality breakdown, discontinued works, research deficits, and EIA gaps.', officialUrl: 'https://www.cag.gov.in/en/audit-report/details/125068', geographicCoverage: 'Dal–Nigeen & Wular Catchments (Kashmir Division)' },
  { sourceName: 'PRS Legislative Research — J&K Budget Analysis 2026–27', custodianBody: 'PRS Legislative Research', requiredInformation: 'Independent fiscal decomposition of FY 2026–27 BE (₹1,13,767 cr outlay, ₹3,15,822 cr GSDP, revenue/capital split, deficit & grants).', officialUrl: 'https://prsindia.org/budgets/states/jammu-and-kashmir-budget-analysis-2026-27', geographicCoverage: 'UT of Jammu & Kashmir & Subnational Peers' },
  { sourceName: 'Union Budget of India (MHA Transfers & CSS Allocations)', custodianBody: 'Ministry of Finance, Government of India', requiredInformation: 'Demand-wise Union transfers to J&K UT (₹58,218 cr grants baseline), MoEFCC, Jal Shakti, MNRE, and MoHUA centrally sponsored schemes.', officialUrl: 'https://www.indiabudget.gov.in/', geographicCoverage: 'All-India / UT of Jammu & Kashmir Transfers' },
  { sourceName: 'MoSPI & EnviStats India Natural Capital Accounts', custodianBody: 'Ministry of Statistics and Programme Implementation', requiredInformation: 'GSDP series, CPI/deflators, and SEEA-aligned EnviStats ecosystem extent, condition, water, forest, and service accounts (2018–2026).', officialUrl: 'https://www.mospi.gov.in/', geographicCoverage: 'State / UT Environmental-Economic Accounts' },
  { sourceName: 'United Nations System of Environmental-Economic Accounting (SEEA)', custodianBody: 'UN Statistics Division & International Agencies', requiredInformation: 'SEEA Central Framework (2012) and SEEA Ecosystem Accounting (2021) physical/monetary accounting standards and CEPA/CReMA rules.', officialUrl: 'https://seea.un.org/', geographicCoverage: 'Global Methodological Standard' },
  { sourceName: 'Reserve Bank of India — State Finances: A Study of Budgets', custodianBody: 'Reserve Bank of India (RBI)', requiredInformation: 'Harmonized 2000–2026 time series on J&K State/UT development vs non-development expenditure and HP/Uttarakhand mountain benchmarks.', officialUrl: 'https://www.rbi.org.in/', geographicCoverage: 'J&K, Himachal Pradesh, Uttarakhand & All States/UTs' },
  { sourceName: 'Public Financial Management System (PFMS)', custodianBody: 'Controller General of Accounts, Ministry of Finance', requiredInformation: 'Centrally Sponsored Scheme (JJM, SBM, NCAP, National Mission for Himalayan Studies) Single Nodal Account releases and unspent balances.', officialUrl: 'https://pfms.nic.in/', geographicCoverage: 'Scheme- & District-Level Transfers (Where Accessible)' },
  { sourceName: 'Jammu & Kashmir e-Tendering Portal', custodianBody: 'NIC / Govt. of Jammu & Kashmir', requiredInformation: 'Work-order values, BOQs, dredging/de-weeding/aeration/STP/WTP contract specifications, and O&M tender clauses.', officialUrl: 'https://jktenders.gov.in/', geographicCoverage: 'All 20 J&K Districts & UT Agencies' },
  { sourceName: 'Parliament of India (Lok Sabha & Rajya Sabha Disclosures)', custodianBody: 'Sansad — Parliament of India', requiredInformation: 'Starred/Unstarred Questions disclosing J&K CAMPA funds, NCAP releases, JJM functionality, Hangul/wildlife grants, and flood outlays.', officialUrl: 'https://sansad.in/', geographicCoverage: 'J&K UT & Himalayan Comparative Disclosures' },
  { sourceName: 'Finance Commission of India', custodianBody: '14th, 15th & 16th Finance Commissions', requiredInformation: 'Forest & ecology horizontal devolution weights, local-body water/sanitation/air grants, and SDRF/SDMF disaster risk financing norms.', officialUrl: 'https://fincomindia.nic.in/', geographicCoverage: 'Himalayan States & Local Body Grants Benchmark' },
];
