// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — MONOGRAPH 09 & DISPATCH 08 MASTER ARCHITECTURE
// "THE NATIONAL PARK THAT BECAME A GOLF COURSE: WHEN RECREATION REPLACED
//  CONSERVATION: THE FORGOTTEN ENVIRONMENTAL, LEGAL AND INSTITUTIONAL LEGACY
//  OF SRINAGAR’S SÁLIM ALI NATIONAL PARK"
//
// Proposed 10-Volume, 75-Chapter Historical, Legal, Ecological, Hydrological,
// Geospatial and Financial Investigation (Establishment Records through 2026)
// + Permanent KEW Companion: Protected Area Integrity & Historical
//   Transformation Observatory (/protected-network/protected-area-integrity-observatory)
//
// Evidentiary & Research Limitations Guardrail:
// Several original wildlife board records were located and examined for this
// framework, including visual verification of the August 25, 2004 Standing
// Committee proceedings. Some PDF visual retrievals failed, and the original
// national park gazette remains behind an institutional access form at the
// Wildlife Institute of India archive. The authenticated denotification
// instrument, the complete PIL No. 115/99 litigation record, historical
// cadastral parcel maps, and current environmental monitoring data remain
// outstanding. Accordingly, neither the exact extent of ecological damage nor
// the final legality of the conversion has yet been established. Institutional
// Right of Response is guaranteed to all relevant authorities, project
// management, and identifiable decision-makers.
// ─────────────────────────────────────────────────────────────────────────────

export type SalimAliVolumeRoman =
  | 'I'
  | 'II'
  | 'III'
  | 'IV'
  | 'V'
  | 'VI'
  | 'VII'
  | 'VIII'
  | 'IX'
  | 'X';

export interface SalimAliHeroStat {
  value: string;
  label: string;
}

export interface SalimAliPublicationTier {
  level: string;
  title: string;
  detail: string;
  href: string;
  ctaLabel: string;
}

export interface SalimAliMasterSpecificationRow {
  component: string;
  proposedScope: string;
  target: string;
}

export interface SalimAliAreaReconciliationSummary {
  historicalInventoryHa: number;
  historicalInventoryKm2: number;
  reportedDenotifiedOct2005Ha: number;
  reportedDenotifiedOct2005Km2: number;
  advertisedGolfCourseHa: number;
  advertisedGolfCourseAcresApprox: number;
  unexplainedDifferenceHa: number;
  nbwl2005BaselineHa: number;
  nbwl2005BaselineKm2: number;
  nbwl2005DenotifiedSharePercent: number;
  arithmeticRemainderHa: number;
  arithmeticRemainderSharePercent: number;
  unansweredGeographicalQuestions: string[];
  evidentiaryCaveat: string;
}

export interface HistoricalEstablishmentReconciliationRow {
  id: string;
  source: string;
  establishmentYear: string;
  reportedArea: string;
  equivalentHectaresNote: string;
  reconciliationNote: string;
}

export interface DocumentedChronologyMilestone {
  id: string;
  yearOrDate: string;
  event: string;
  phase:
    | 'Notification & Baseline Records'
    | 'Project Sanction, Clearance & Litigation'
    | 'Post-Construction Wildlife Board Review'
    | 'Contemporary Governance & PPP Review';
  investigativeNote: string;
}

export interface NbwlDocumentaryMilestone {
  id: string;
  meetingDate: string;
  authority: string;
  keyDeliberation: string;
  unresolvedIssuesRecorded: string;
  documentarySourceLabel: string;
  primarySourceUrl?: string;
  visualVerificationNote: string;
}

export interface NbwlOct2005RecommendationBreakdownRow {
  category: 'Accepted' | 'Deferred' | 'Not approved';
  count: number;
  percentage: number;
  detail: string;
}

export interface NbwlOct2005RecommendationStats {
  meetingDate: string;
  totalRecommendations: number;
  accepted: {
    count: number;
    percentage: number;
    label: string;
  };
  deferred: {
    count: number;
    percentage: number;
    label: string;
  };
  notApproved: {
    count: number;
    percentage: number;
    label: string;
    specificSubject: string;
  };
  breakdown: NbwlOct2005RecommendationBreakdownRow[];
  supremeCourtSubmissionDecision: string;
  institutionalSignificance: string;
  primarySourceUrl: string;
}

export interface LegalAdministrativeActionRow {
  id: string;
  legalAction: string;
  documentaryEvidenceRequired: string;
  evidentiaryDistinction: string;
}

export interface StatutoryLegalQuestionRow {
  id: string;
  legalQuestion: string;
  evidenceRequired: string;
  statutoryProvisionContext: string;
}

export interface LegalArchitectureMatricesSpec {
  applicableStatute: string;
  statutorySectionFocus: string;
  pilCaseReference: string;
  retrospectiveApprovalQuestion: string;
  evidentiaryPrinciple: string;
  fiveAdministrativeActions: LegalAdministrativeActionRow[];
  eightStatutoryQuestions: StatutoryLegalQuestionRow[];
}

export interface EcologicalComparisonRow {
  id: string;
  ecologicalCharacteristic: string;
  naturalProtectedHabitat: string;
  intensivelyManagedGolfLandscape: string;
}

export interface BiologicalGroupInvestigationRow {
  id: string;
  biologicalGroup: string;
  requiredInvestigation: string;
  baselineAndFieldMethod: string;
}

export type BiologicalGroupsCollection =
  ReadonlyArray<BiologicalGroupInvestigationRow> & {
    readonly snowLeopardFacilityNote: string;
    readonly treeRemovalDiscrepancyNote: string;
    readonly treeReconstructionRequirements: readonly string[];
  };

export interface WaterAccountingComponentRow {
  id: string;
  waterAccountingComponent: string;
  informationRequired: string;
}

export interface EconomicBalanceRow {
  id: string;
  potentialEconomicBenefit: string;
  potentialEcologicalOpportunityCost: string;
}

export interface FinancialDossierCategoryRow {
  id: string;
  financialCategory: string;
  evidenceRequired: string;
}

export interface HydrologicalAndEconomicMatricesSpec {
  dalLakeHydrologicalPremise: string;
  illustrativeIrrigationBaseline: {
    irrigatedTurfAreaHa: number;
    annualNetIrrigationMm: number;
    irrigationEfficiencyPercent: number;
    estimatedAnnualGrossLitres: number;
    estimatedAnnualVolumeM3: number;
    annualDailyEquivalentMld: number;
    methodologicalCaveat: string;
  };
  illustrativeNutrientBaseline: {
    fertilizedAreaHa: number;
    nitrogenApplicationKgPerHaYr: number;
    phosphorusApplicationKgPerHaYr: number;
    assumedExportFractionPercent: number;
    annualNitrogenAppliedTonnes: number;
    annualPhosphorusAppliedTonnes: number;
    potentialNitrogenExportKgYr: number;
    potentialPhosphorusExportKgYr: number;
    methodologicalCaveat: string;
  };
  waterAccounting8: WaterAccountingComponentRow[];
  economicBalance8: EconomicBalanceRow[];
  financialDossier14: FinancialDossierCategoryRow[];
  netPublicContributionFormula: string;
  pppOutsourcingContext2023: string;
  economicAnalyticalGuardrail: string;
}

export interface GeospatialObservationPeriodRow {
  id: string;
  observationPeriod: string;
  investigativePurpose: string;
  sensorOrArchiveClass: string;
}

export interface GeospatialAnalysisRequirementRow {
  id: string;
  scientificAnalysis: string;
  expectedOutput: string;
}

export interface GeospatialReconstructionSpec {
  guidingMaxim: string;
  observationPeriods9: GeospatialObservationPeriodRow[];
  geospatialAnalyses12: GeospatialAnalysisRequirementRow[];
  requiredMapLayers7: string[];
}

export interface EnvironmentalResistanceRecord {
  id: string;
  individualOrOrganization: string;
  documentedInvolvement: string;
  sourceContext: string;
}

export interface ProfessionalIntrospectionRow {
  id: string;
  professionalCommunity: string;
  historicalInvestigation: string;
  archivalCaution: string;
}

export interface InternationalConservationPrincipleRow {
  id: string;
  conservationPrinciple: string;
  questionForHistoricalConversion: string;
}

export interface AlternativeDevelopmentScenarioRow {
  id: string;
  alternativeDevelopmentScenario: string;
  requiredEvaluation: string;
}

export interface RecoveryScenarioSpec {
  scenarioCode: 'Scenario A' | 'Scenario B' | 'Scenario C' | 'Scenario D';
  title: string;
  summary: string;
  safeguardsAndPrerequisites: string;
}

export interface ImmediateInvestigationRow {
  id: string;
  investigation: string;
  requiredOutcome: string;
}

export interface ConservationTestAndRecoverySpec {
  retrospectiveFrameworkNote: string;
  restorationEcologicalSafeguard: string;
  internationalConservationTest11: InternationalConservationPrincipleRow[];
  alternativeScenarios6: AlternativeDevelopmentScenarioRow[];
  recoveryScenarios4: RecoveryScenarioSpec[];
  immediateInvestigations10: ImmediateInvestigationRow[];
}

export interface PadddProcessDefinitionRow {
  id: string;
  process: 'Downgrading' | 'Downsizing' | 'Degazettement';
  meaning: string;
  salimAliRelevance: string;
}

export interface FiveRegionProtectedAuditRow {
  id: string;
  region:
    | 'Kashmir'
    | 'Jammu'
    | 'Ladakh'
    | 'Azad Jammu & Kashmir'
    | 'Gilgit-Baltistan';
  protectedLandscapesToExamine: string;
}

export interface ProtectedAreaIntegrityProtocolRequirement {
  code: string;
  requirement: string;
  intendedProtection: string;
}

export interface WesternHimalayanPadddSpec {
  preventiveVerificationDisclaimer: string;
  salimAliClassificationNote: string;
  padddDefinitions3: PadddProcessDefinitionRow[];
  fiveRegionAudit5: FiveRegionProtectedAuditRow[];
  integrityProtocol12: ProtectedAreaIntegrityProtocolRequirement[];
}

export interface SalimAliVolumeSpec {
  volumeNumber: number;
  volumeRoman: SalimAliVolumeRoman;
  slug: string;
  volumeTitle: string;
  chapterRange: string;
  chapterCodes: string[];
  thematicMandate: string;
}

export interface SalimAliChapterProtocol {
  number: number;
  code: string; // '01' .. '75'
  slug: string;
  volumeNumber: number;
  volumeRoman: SalimAliVolumeRoman;
  volumeTitle: string;
  title: string;
  researchStatus: 'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing';
  executiveSummary: [string, string];
  investigativeQuestions: string[];
  evidenceAndMethods: string[];
  deliverable: string;
  methodologicalCaveat: string;
}

export interface PriorityOriginalDocumentRow {
  priority: string; // '01' .. '20'
  document: string;
  custodianOrArchiveTarget: string;
  investigativeRole: string;
  retrievalStatus: string;
}

export interface IdentifiedPrimarySourceRow {
  code: string;
  document: string;
  accessLabel: string;
  url: string;
  evidentiaryNotes: string;
}

export interface KewProtectedAreaObservatoryModuleSpec {
  code: string; // 'PAIO-01' .. 'PAIO-12'
  title: string;
  operationalFunction: string;
  dataStandard: string;
  currentStatus: string;
  connectedKewSurfaceLabel: string;
  connectedKewSurfaceHref: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. MASTER MONOGRAPH IDENTITY & EDITORIAL SPECIFICATION
// ─────────────────────────────────────────────────────────────────────────────

export const SALIM_ALI_AREA_MATHEMATICS: SalimAliAreaReconciliationSummary = {
  historicalInventoryHa: 907,
  historicalInventoryKm2: 9.07,
  reportedDenotifiedOct2005Ha: 162,
  reportedDenotifiedOct2005Km2: 1.62,
  advertisedGolfCourseHa: 121.4,
  advertisedGolfCourseAcresApprox: 300,
  unexplainedDifferenceHa: 40.6,
  nbwl2005BaselineHa: 885,
  nbwl2005BaselineKm2: 8.85,
  nbwl2005DenotifiedSharePercent: 18.3,
  arithmeticRemainderHa: 723,
  arithmeticRemainderSharePercent: 81.7,
  unansweredGeographicalQuestions: [
    'If 162 hectares were reportedly denotified from an 885-hectare national park baseline, what happened to the remaining 723 hectares?',
    'Are those remaining parcels still legally protected under wildlife notifications, and are they administered by the Wildlife Protection Department?',
    'Have portions of the non-golf remainder been fragmented, rendered inaccessible, or reassigned to other institutional uses?',
    'Why does the advertised Royal Springs Golf Course footprint (~300 acres / 121.4 ha) differ by 40.6 hectares from the 162-hectare denotification figure recorded in October 2005?',
  ],
  evidentiaryCaveat:
    'These area ratios represent an arithmetic reconstruction derived from published inventories, October 2005 wildlife board minutes, and official J&K Tourism descriptions—not a verified cadastral map of surviving protected habitat. Discrepancies do not by themselves prove unauthorized occupation; they establish the necessity of parcel-level cadastral and gazette reconciliation across the entire original national park.',
};

export const SALIM_ALI_MONOGRAPH_SPEC = {
  monographCode: 'MONOGRAPH 09 · PROTECTED AREA GOVERNANCE & JURISPRUDENCE',
  editionSlug: 'monograph-09-the-national-park-that-became-a-golf-course',
  companionDispatchSlug: 'the-national-park-that-became-a-golf-course',
  companionDispatchNumber: '10',
  canonicalMonographPath:
    '/himalayan-dispatch/issues/monograph-09-the-national-park-that-became-a-golf-course',
  canonicalDispatchPath:
    '/himalayan-dispatch/issues/volume-01-issue-01/the-national-park-that-became-a-golf-course',
  kewObservatoryPath: '/protected-network/protected-area-integrity-observatory',
  kewSalimAliProfilePath:
    '/protected-network/national-parks/salim-ali-national-park',
  datasetApiPath:
    '/api/himalayan-dispatch/datasets/salim-ali-park-monograph-framework',
  kicker:
    'SPECIAL HISTORICAL INVESTIGATION · PROTECTED AREA GOVERNANCE · ENVIRONMENTAL JURISPRUDENCE · POLITICAL ECOLOGY · INSTITUTIONAL ACCOUNTABILITY',
  title: 'The National Park That Became a Golf Course',
  subtitle:
    'When Recreation Replaced Conservation: The Forgotten Environmental, Legal and Institutional Legacy of Srinagar’s Sálim Ali National Park',
  extendedSubtitle:
    'A 10-volume, 75-chapter historical, legal, ecological, hydrological, geospatial and financial investigation from the establishment of City National Park through 2026—and its lessons for the Western Himalayan Protected Area Network.',
  openingInquiry:
    'What happens when the institutions entrusted with protecting a national park participate in transforming its landscape for recreational development? What did the scientific community say, what did the law permit, what did the political leadership authorize, and what did Kashmir learn from the experience?',
  proposedByline:
    'Dr. Fayaz Ahmad Khan & Himalayan Dispatch Protected Area Governance, Environmental Jurisprudence and Geospatial Intelligence Desk',
  geographicScope:
    'Srinagar · Dal Lake Foothills · Zabarwan Range · Kashmir Valley · Western Himalayan Protected Area Network',
  investigationPeriod:
    'From the original establishment of City National Park (1986 / 1992 records) to 2026',
  statusBadge:
    'Proposed 10-Volume, 75-Chapter Historical, Legal & Scientific Investigation (Primary Gazette & Cadastral Retrieval Ongoing)',
  heroStats: [
    { value: '10', label: 'Thematic volumes' },
    { value: '75', label: 'Investigative chapters' },
    { value: '885 / 907 ha', label: 'Reported park extent' },
    { value: '723 ha', label: 'Unresolved remainder' },
  ] as SalimAliHeroStat[],
  researchLimitationsDisclosure:
    'Research Limitations & Institutional Right of Response: Several original wildlife board records were located and examined for this investigation, including visual verification of the August 25, 2004 Standing Committee proceedings. However, some PDF visual retrievals failed, and the original national park gazette remains behind an institutional access form in the Wildlife Institute of India archive. The authenticated denotification instrument, the complete PIL No. 115/99 court record, historical parcel maps, and current environmental monitoring data remain outstanding. Accordingly, neither the exact extent of ecological damage nor the final legality of the conversion has yet been established. Full Institutional Right of Response is guaranteed to all relevant government authorities, Royal Springs Golf Course management, wildlife officials, and identifiable decision-makers.',
  editorialPremise: [
    'National parks represent one of the weightiest intergenerational commitments a society can enact: a formal statutory recognition that a landscape holds ecological, biological, hydrological, or scientific value requiring protection beyond ordinary land-use discretion.',
    'A national park is not merely a green parcel of state-owned land awaiting an economically attractive assignment; it is a legally constituted ecosystem governed for wildlife survival, native vegetation succession, and watershed integrity.',
    'An intensively managed golf course and a natural foothill woodland may both appear green from a distance, yet their vegetation layers, soil mechanics, hydrological demands, chemical inputs, disturbance regimes, and statutory foundations are fundamentally distinct.',
    'Examining the conversion of part of Srinagar’s Sálim Ali National Park—recorded historically as City Forest or City National Park along the Zabarwan foothills above Dal Lake—into land associated with the Royal Springs Golf Course is neither an argument against golf nor an indictment of tourism and recreation.',
    'Rather, it is a forensic inquiry into the legal procedures, scientific warnings, hydrological consequences, financial outlays, and unexamined 723-hectare remainder left behind when statutory conservation land was reassigned—and what that precedent means for every protected landscape across the Western Himalayas.',
  ],
  centralQuestion:
    'If protected landscapes can be reassigned whenever another land use becomes economically or politically attractive, what does protected status actually guarantee?',
  closingEpilogueQuestion:
    'If a national park is not safe from incompatible development even after receiving the highest levels of statutory conservation recognition, what protection can the rest of our unprotected natural landscapes reasonably expect?',
  epilogueReflections: [
    'A national park does not belong exclusively to the administration that declares it; its ecological commitment spans beyond electoral cycles, administrative tenures, and generational economic preferences.',
    'Recreational beauty, visitor footfall, employment, and hospitality revenue may represent genuine tourism achievements, yet they answer fundamentally different questions from those that justified statutory national park status.',
    'Establishing what happened to the original Zabarwan foothill habitat, its displaced fauna, its statutory boundaries, and its surviving 723-hectare arithmetic remainder is essential to restoring credibility across the Western Himalayan Protected Area Network.',
  ],
  areaReconciliation: SALIM_ALI_AREA_MATHEMATICS,
  publicationHierarchy: [
    {
      level: '01 · Inaugural Edition Flagship (Dispatch 10)',
      title: 'Dispatch 10 — The National Park That Became a Golf Course',
      detail:
        'Positioned in Vol. 01 / No. 01 immediately after Dispatch 09 ("The People Who Guard the Forest") and building on Dispatch 08 ("The Sky Has No Borders"): synthesizes the 1986–2026 chronology, the 2003–2005 wildlife board objections, the 723-hectare remainder question, and Dal Lake catchment scenarios.',
      href: '/himalayan-dispatch/issues/volume-01-issue-01/the-national-park-that-became-a-golf-course',
      ctaLabel: 'Read Dispatch 10',
    },
    {
      level: '02 · Complete 10-Volume Investigative Monograph',
      title: 'Monograph 09 — 10 Thematic Volumes & 75 Investigative Chapters',
      detail:
        'Full investigative architecture spanning pre-notification Zabarwan ecology, 1998 administrative approvals, Section 35 jurisprudence and PIL No. 115/99, 1960–2026 geospatial reconstruction, Dal Lake nutrient/irrigation budgets, 25-year fiscal accounting, and regional PADDD safeguards.',
      href: '/himalayan-dispatch/issues/monograph-09-the-national-park-that-became-a-golf-course',
      ctaLabel: 'Open Monograph 09',
    },
    {
      level: '03 · Permanent KEW Scientific & Legal Companion',
      title: 'Protected Area Integrity & Historical Transformation Observatory',
      detail:
        'Twelve permanent registries integrated into KEW Protected Area Network (/protected-network/protected-area-integrity-observatory) strengthening the Sálim Ali National Park dossier (/protected-network/national-parks/salim-ali-national-park) and tracking boundary integrity across all five Western Himalayan regions.',
      href: '/protected-network/protected-area-integrity-observatory',
      ctaLabel: 'Open Integrity Observatory',
    },
  ] as SalimAliPublicationTier[],
  masterSpecifications: [
    {
      component: 'Thematic volumes',
      proposedScope: '10',
      target: '10',
    },
    {
      component: 'Investigative chapters',
      proposedScope: '75',
      target: '75',
    },
    {
      component: 'Historical period',
      proposedScope: 'Before notification through 2026',
      target: 'Before notification through 2026',
    },
    {
      component: 'Geospatial reconstruction',
      proposedScope: 'Historical and contemporary',
      target: 'Historical and contemporary',
    },
    {
      component: 'Legal investigation',
      proposedScope:
        'Original statutes, approvals, litigation and denotification',
      target: 'Original statutes, approvals, litigation and denotification',
    },
    {
      component: 'Scientific assessments',
      proposedScope:
        'Biodiversity, hydrology, soil, nutrients and ecosystem services',
      target: 'Biodiversity, hydrology, soil, nutrients and ecosystem services',
    },
    {
      component: 'Economic investigation',
      proposedScope:
        'Capital expenditure, operational costs and ecological opportunity costs',
      target:
        'Capital expenditure, operational costs and ecological opportunity costs',
    },
    {
      component: 'Regional comparison',
      proposedScope: 'Five Western Himalayan regions',
      target: 'Five Western Himalayan regions',
    },
    {
      component: 'Permanent KEW companion',
      proposedScope: 'Protected Area Integrity Observatory',
      target: 'Protected Area Integrity Observatory',
    },
    {
      component: 'Institutional right of response',
      proposedScope:
        'All relevant authorities, project management and identifiable decision-makers',
      target:
        'All relevant authorities, project management and identifiable decision-makers',
    },
  ] as SalimAliMasterSpecificationRow[],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// 2. PART I SECTION 1 — HISTORICAL ESTABLISHMENT & AREA RECONCILIATION (6 ROWS)
// ─────────────────────────────────────────────────────────────────────────────

export const HISTORICAL_ESTABLISHMENT_RECONCILIATION_6: HistoricalEstablishmentReconciliationRow[] =
  [
    {
      id: 'HER-01',
      source: 'Government of India tourism portal',
      establishmentYear: '1986',
      reportedArea: 'Not specified in retrieved record',
      equivalentHectaresNote: 'Not specified',
      reconciliationNote:
        'Identifies 1986 as establishment year without specifying gazetted polygon area in the retrieved portal entry.',
    },
    {
      id: 'HER-02',
      source: 'Historical protected-area inventory',
      establishmentYear: '1986',
      reportedArea: '9 km²',
      equivalentHectaresNote: '900 ha (rounded)',
      reconciliationNote:
        'Pairs the 1986 establishment date with a rounded 9 km² extent.',
    },
    {
      id: 'HER-03',
      source: 'Wildlife Institute of India database',
      establishmentYear: '1992',
      reportedArea: '9 km²',
      equivalentHectaresNote: '900 ha (rounded)',
      reconciliationNote:
        'Retains an archive entry for City Forest (Sálim Ali) National Park, Srinagar dated 1992; underlying gazette scan sits behind an institutional access form.',
    },
    {
      id: 'HER-04',
      source: 'J&K protected-area records and associated inventories',
      establishmentYear: 'Requires reconciliation',
      reportedArea: '9.07 km²',
      equivalentHectaresNote: '907 ha',
      reconciliationNote:
        'Provides the 9.07 km² (907 ha) figure widely cited in regional protected-area inventories; requires cross-checking between preliminary intention and final notification.',
    },
    {
      id: 'HER-05',
      source: 'National Board for Wildlife proceedings, 2005',
      establishmentYear: 'Not specified',
      reportedArea: '8.85 km²',
      equivalentHectaresNote: '885 ha',
      reconciliationNote:
        'Baseline cited in official 2005 proceedings alongside the statement that 1.62 km² (162 ha) had been denotified, leaving an 81.7% (723 ha) arithmetic remainder.',
    },
    {
      id: 'HER-06',
      source: 'Recent ornithological literature',
      establishmentYear: 'Requires reconciliation',
      reportedArea: '8.69 km²',
      equivalentHectaresNote: '869 ha',
      reconciliationNote:
        'Reflects a slightly smaller reported polygon in scholarly avian surveys; may reflect post-adjustment mapping or differing GIS projection conventions.',
    },
  ];

// ─────────────────────────────────────────────────────────────────────────────
// 3. PART I SECTION 2 — DOCUMENTED CHRONOLOGY (17 MILESTONES, 1986–2026)
// ─────────────────────────────────────────────────────────────────────────────

export const DOCUMENTED_CHRONOLOGY_17: DocumentedChronologyMilestone[] = [
  {
    id: 'CHR-01',
    yearOrDate: '1986',
    event:
      'Establishment year identified by historical inventories and the Government of India tourism portal',
    phase: 'Notification & Baseline Records',
    investigativeNote:
      'Requires retrieval of initial intention notification under Section 35 of the J&K Wildlife (Protection) Act, 1978.',
  },
  {
    id: 'CHR-02',
    yearOrDate: '1992',
    event:
      "Establishment year recorded in the Wildlife Institute of India's historical database",
    phase: 'Notification & Baseline Records',
    investigativeNote:
      'May represent final notification or boundary revision following an earlier 1986 preliminary declaration; requires WII gazette verification.',
  },
  {
    id: 'CHR-03',
    yearOrDate: '1998',
    event:
      'Golf course development approved under the government of Chief Minister Farooq Abdullah, according to published conservation accounts',
    phase: 'Project Sanction, Clearance & Litigation',
    investigativeNote:
      'Cabinet decision, administrative sanction, and original project feasibility files must be obtained from civil secretariat archives.',
  },
  {
    id: 'CHR-04',
    yearOrDate: 'October 1998',
    event:
      'Beginning of archived conservation correspondence concerning the proposed transformation',
    phase: 'Project Sanction, Clearance & Litigation',
    investigativeNote:
      'Catalogued in the Kalpavriksh Papers at the Milli Archives Foundation.',
  },
  {
    id: 'CHR-05',
    yearOrDate: 'January 1999',
    event:
      'Public interest litigation challenging golf course construction',
    phase: 'Project Sanction, Clearance & Litigation',
    investigativeNote:
      'Indexed in IGNFA legal compilations as PIL No. 115/99 filed by the Wildlife Protection Society of India; complete High Court file required.',
  },
  {
    id: 'CHR-06',
    yearOrDate: 'February 1999',
    event:
      'Contemporary press reporting concerning extensive tree removal',
    phase: 'Project Sanction, Clearance & Litigation',
    investigativeNote:
      'Includes investigative dispatches in The Indian Express; requires cross-verification against forest felling and timber disposal registers.',
  },
  {
    id: 'CHR-07',
    yearOrDate: 'June 1999',
    event:
      'Government proposal reportedly submitted for consideration by the Indian Board for Wildlife',
    phase: 'Project Sanction, Clearance & Litigation',
    investigativeNote:
      'Tests whether federal wildlife advisory review was initiated after physical site clearing had already begun.',
  },
  {
    id: 'CHR-08',
    yearOrDate: 'July 1999',
    event:
      'Protected Area Update documented allegations of tree removal and Wildlife Department objections',
    phase: 'Project Sanction, Clearance & Litigation',
    investigativeNote:
      'Preserved in the Indian Institute of Science biodiversity archive.',
  },
  {
    id: 'CHR-09',
    yearOrDate: 'November 2000',
    event:
      'Supreme Court restrictions concerning dereservation of protected areas, relevant to the subsequent litigation',
    phase: 'Project Sanction, Clearance & Litigation',
    investigativeNote:
      'Established nationwide judicial oversight over protected-area boundary alterations and denotifications.',
  },
  {
    id: 'CHR-10',
    yearOrDate: '2001',
    event:
      'Golf course completed, according to historical conservation reporting',
    phase: 'Project Sanction, Clearance & Litigation',
    investigativeNote:
      'Demonstrates that physical landscape conversion concluded prior to the 2003–2005 national wildlife board deliberations.',
  },
  {
    id: 'CHR-11',
    yearOrDate: 'May 2003',
    event:
      'Wildlife board deferred consideration of denotification because fertilizer and pesticide questions remained unresolved',
    phase: 'Post-Construction Wildlife Board Review',
    investigativeNote:
      'Standing Committee of the Indian Board for Wildlife reviewed the site inspection report by Dr. M. K. Ranjitsinh and Aseem Srivastav on May 6, 2003.',
  },
  {
    id: 'CHR-12',
    yearOrDate: '2004',
    event: 'Further wildlife board consideration of the matter',
    phase: 'Post-Construction Wildlife Board Review',
    investigativeNote:
      'August 25, 2004 Standing Committee minutes (visually verified) recorded concern over inadequate state responses to the 2003 inspection recommendations.',
  },
  {
    id: 'CHR-13',
    yearOrDate: 'April 2005',
    event:
      'Wildlife board again deferred the matter; pollution-monitoring arrangements remained under consideration',
    phase: 'Post-Construction Wildlife Board Review',
    investigativeNote:
      'April 6, 2005 NBWL discussion identified CSIR regional laboratory in Jammu for Dal Lake and wildlife-habitat effluent monitoring, awaiting Chief Wildlife Warden comments.',
  },
  {
    id: 'CHR-14',
    yearOrDate: 'October 2005',
    event:
      'Official wildlife board proceedings recorded a statement that 1.62 km² had been denotified',
    phase: 'Post-Construction Wildlife Board Review',
    investigativeNote:
      'October 4, 2005 minutes also recorded acceptance of only 4 of 8 expert recommendations and directed submission of noncompliance objections to the Supreme Court.',
  },
  {
    id: 'CHR-15',
    yearOrDate: 'March 2020',
    event:
      'Government formally reconstituted the Royal Springs Golf Course governing body',
    phase: 'Contemporary Governance & PPP Review',
    investigativeNote:
      'Establishes contemporary institutional management accountability for operational, water, and chemical governance.',
  },
  {
    id: 'CHR-16',
    yearOrDate: 'March 2023',
    event:
      'Administration considered outsourcing the golf course through a public-private partnership',
    phase: 'Contemporary Governance & PPP Review',
    investigativeNote:
      'Raises critical questions regarding twenty-five-year fiscal performance, public subsidies, and environmental liabilities in concession terms.',
  },
  {
    id: 'CHR-17',
    yearOrDate: '2026',
    event:
      'Government representatives continued reviewing its operation and facilities',
    phase: 'Contemporary Governance & PPP Review',
    investigativeNote:
      'Anchors the contemporary endpoint of the monograph’s historical, legal, ecological, and fiscal audit.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 4. PART III SECTION 4 — NBWL DOCUMENTARY TIMELINE (4) & OCT 2005 STATS
// ─────────────────────────────────────────────────────────────────────────────

export const NBWL_DOCUMENTARY_TIMELINE_4: NbwlDocumentaryMilestone[] = [
  {
    id: 'NBWL-2003-05-06',
    meetingDate: 'May 6, 2003',
    authority: 'Standing Committee of the Indian Board for Wildlife',
    keyDeliberation:
      'Examined the site inspection report prepared by Dr. M. K. Ranjitsinh and Aseem Srivastav following physical completion of the golf course.',
    unresolvedIssuesRecorded:
      'Consideration of denotification was deferred because representatives of the Jammu and Kashmir government could not adequately clarify questions regarding chemical pesticides and fertilizers applied on the golf course.',
    documentarySourceLabel:
      'Standing Committee of the Indian Board for Wildlife proceedings (May 6, 2003)',
    visualVerificationNote:
      'Referenced across official forest-clearance and subsequent Standing Committee records; complete 2003 inspection dossier remains a priority retrieval item.',
  },
  {
    id: 'NBWL-2004-08-25',
    meetingDate: 'August 25, 2004',
    authority: 'Standing Committee of the National Board for Wildlife',
    keyDeliberation:
      'Reviewed follow-up action on the 2003 expert site inspection recommendations concerning Srinagar’s Sálim Ali National Park and the golf course.',
    unresolvedIssuesRecorded:
      'Recorded explicit institutional concern that the Jammu and Kashmir government had not responded adequately to the recommendations arising from the 2003 expert inspection despite repeated requests.',
    documentarySourceLabel: 'Minutes of meeting held on August 25, 2004 (MoEF)',
    primarySourceUrl:
      'https://moef.gov.in/uploads/2018/03/Minutes_meeting_250804.pdf',
    visualVerificationNote:
      'Original PDF minutes located and visually verified during primary source examination.',
  },
  {
    id: 'NBWL-2005-04-06',
    meetingDate: 'April 6, 2005',
    authority: 'Standing Committee of the National Board for Wildlife',
    keyDeliberation:
      'Discussed institutional arrangements for independent monitoring of chemical and fertilizer effluent discharges affecting adjacent wildlife habitats and Dal Lake.',
    unresolvedIssuesRecorded:
      'The Ministry had identified the CSIR regional laboratory in Jammu to conduct water-quality and effluent monitoring, but consideration was again deferred because required comments from the Chief Wildlife Warden had not been received.',
    documentarySourceLabel: 'Minutes of meeting held on April 6, 2005',
    visualVerificationNote:
      'Corroborated in official wildlife board records; underlying CSIR Jammu monitoring reports (if subsequently executed) remain to be retrieved.',
  },
  {
    id: 'NBWL-2005-10-04',
    meetingDate: 'October 4, 2005',
    authority: 'Standing Committee of the National Board for Wildlife',
    keyDeliberation:
      'Recorded an official statement that 1.62 km² (162 ha) of an 8.85 km² baseline had been denotified, and audited the state government’s item-by-item response to the eight expert recommendations.',
    unresolvedIssuesRecorded:
      'Only 4 of 8 expert recommendations were accepted (50%), 3 were deferred (37.5%), and 1 was not approved (12.5% — transferring Shankaracharya Reserve to the Wildlife Department). The committee resolved to place its objections regarding noncompliance before the Supreme Court.',
    documentarySourceLabel: 'Minutes of meeting held on October 4, 2005 (MoEF)',
    primarySourceUrl:
      'https://moef.gov.in/uploads/2018/03/Minutes_meeting_41005.pdf',
    visualVerificationNote:
      'Primary official minutes URL identified in Ministry archives; Supreme Court compliance filings referenced therein remain to be obtained.',
  },
];

export const NBWL_OCT_2005_RECOMMENDATION_STATS: NbwlOct2005RecommendationStats =
  {
    meetingDate: 'October 4, 2005',
    totalRecommendations: 8,
    accepted: {
      count: 4,
      percentage: 50,
      label: 'Accepted',
    },
    deferred: {
      count: 3,
      percentage: 37.5,
      label: 'Deferred',
    },
    notApproved: {
      count: 1,
      percentage: 12.5,
      label: 'Not approved',
      specificSubject:
        'Transferring the Shankaracharya Reserve to the Wildlife Department',
    },
    breakdown: [
      {
        category: 'Accepted',
        count: 4,
        percentage: 50,
        detail:
          'Four of the eight expert site-inspection safeguards accepted by the Jammu and Kashmir government as recorded in October 2005.',
      },
      {
        category: 'Deferred',
        count: 3,
        percentage: 37.5,
        detail:
          'Three expert recommendations remained deferred more than four years after reported completion of the golf course.',
      },
      {
        category: 'Not approved',
        count: 1,
        percentage: 12.5,
        detail:
          'Recommendation to transfer the Shankaracharya Reserve to the Wildlife Department was not approved by the state government.',
      },
    ],
    supremeCourtSubmissionDecision:
      'The Standing Committee decided that its objections concerning the state government’s incomplete compliance with expert recommendations would be included in submissions to the Supreme Court.',
    institutionalSignificance:
      'Demonstrates that unresolved pesticide, fertilizer, Dal Lake effluent-monitoring, and compensatory conservation concerns were formally documented by statutory national wildlife authorities—not solely by external advocacy groups.',
    primarySourceUrl:
      'https://moef.gov.in/uploads/2018/03/Minutes_meeting_41005.pdf',
  };

// ─────────────────────────────────────────────────────────────────────────────
// 5. PART IV SECTIONS 5–7 — LEGAL ARCHITECTURE MATRICES (5 ACTIONS + 8 QUESTIONS)
// ─────────────────────────────────────────────────────────────────────────────

export const LEGAL_ARCHITECTURE_MATRICES: LegalArchitectureMatricesSpec = {
  applicableStatute: 'Jammu and Kashmir Wildlife (Protection) Act, 1978',
  statutorySectionFocus:
    'Section 35 (declaration of national parks, protection of wildlife and habitat, and statutory requirements—including wildlife board recommendation and legislative resolution—governing boundary alteration; exact 1998–2001 in-force text under verification)',
  pilCaseReference:
    'PIL No. 115/99 (filed by the Wildlife Protection Society of India in January 1999 challenging golf course construction, as documented in Indira Gandhi National Forest Academy legal compilations)',
  retrospectiveApprovalQuestion:
    'Can environmental assessment meaningfully protect an ecosystem if the assessment takes place after the ecosystem has already been transformed?',
  evidentiaryPrinciple:
    'Physical existence of the Royal Springs Golf Course proves that land-use conversion occurred, not that every statutory prerequisite was satisfied; likewise, the October 2005 administrative statement that 162 hectares had been denotified does not substitute for the authenticated denotification gazette and legislative resolution.',
  fiveAdministrativeActions: [
    {
      id: 'LAA-01',
      legalAction: 'Original national park notification',
      documentaryEvidenceRequired:
        'Authenticated government gazette and geographical boundaries',
      evidentiaryDistinction:
        'Establishes the exact baseline polygon, Khasra schedules, and whether notification reached final statutory stage in 1986 or 1992.',
    },
    {
      id: 'LAA-02',
      legalAction: 'Authorization of golf course development',
      documentaryEvidenceRequired:
        'Cabinet decision, administrative sanction and project approval',
      evidentiaryDistinction:
        'Identifies executive sanctioning authority, project boundaries, and conditions attached prior to physical site clearing.',
    },
    {
      id: 'LAA-03',
      legalAction: 'Alteration of national park boundaries',
      documentaryEvidenceRequired:
        'Statutory recommendation and legislative resolution',
      evidentiaryDistinction:
        'Tests compliance with Section 35 safeguards under the J&K Wildlife (Protection) Act, 1978 in force during 1998–2001.',
    },
    {
      id: 'LAA-04',
      legalAction: 'Wildlife and environmental clearance',
      documentaryEvidenceRequired:
        'Applicable expert assessments and formal approvals',
      evidentiaryDistinction:
        'Determines whether independent ecological and hydrological assessments preceded or followed tree clearing and turf grading.',
    },
    {
      id: 'LAA-05',
      legalAction: 'Final denotification',
      documentaryEvidenceRequired:
        'Authenticated legal instrument and revised protected-area map',
      evidentiaryDistinction:
        'Separates verbal or minuted statements of denotification from a legally gazetted boundary-alteration instrument.',
    },
  ],
  eightStatutoryQuestions: [
    {
      id: 'SLQ-01',
      legalQuestion: 'Was the development area inside the notified park?',
      evidenceRequired: 'Historical boundary maps',
      statutoryProvisionContext:
        'Requires parcel-level superposition of original national park notification schedules onto the golf course construction footprint.',
    },
    {
      id: 'SLQ-02',
      legalQuestion:
        'Was construction legally authorized before land clearance?',
      evidenceRequired: 'Administrative and statutory approvals',
      statutoryProvisionContext:
        'Examines chronological alignment between 1998–1999 site clearing and formal statutory permissions.',
    },
    {
      id: 'SLQ-03',
      legalQuestion: 'Did the Wildlife Board recommend boundary alteration?',
      evidenceRequired: 'Authenticated meeting records',
      statutoryProvisionContext:
        'Audits state and national wildlife board minutes from 1998 through October 2005.',
    },
    {
      id: 'SLQ-04',
      legalQuestion: 'Did the legislature approve the alteration?',
      evidenceRequired: 'Legislative proceedings and resolutions',
      statutoryProvisionContext:
        'Verifies whether the J&K Legislature passed a formal statutory resolution altering Section 35 park boundaries.',
    },
    {
      id: 'SLQ-05',
      legalQuestion: 'Was a formal denotification published?',
      evidenceRequired: 'Government gazette',
      statutoryProvisionContext:
        'Requires retrieval of the authenticated Jammu & Kashmir Government Gazette notification, if issued.',
    },
    {
      id: 'SLQ-06',
      legalQuestion: 'Were judicial directions complied with?',
      evidenceRequired: 'Court orders and compliance affidavits',
      statutoryProvisionContext:
        'Examines High Court orders in PIL No. 115/99 and post-November 2000 Supreme Court protected-area directives.',
    },
    {
      id: 'SLQ-07',
      legalQuestion: 'Were environmental conditions imposed?',
      evidenceRequired: 'Approval documents and expert reports',
      statutoryProvisionContext:
        'Reconstructs all eight expert recommendations from the 2003 Ranjitsinh–Srivastav inspection and court-imposed safeguards.',
    },
    {
      id: 'SLQ-08',
      legalQuestion: 'Were those conditions subsequently satisfied?',
      evidenceRequired: 'Monitoring and inspection records',
      statutoryProvisionContext:
        'Checks CSIR Jammu water-quality monitoring records, chemical registers, and wildlife department compliance audits.',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 6. PART V SECTIONS 8–10 — ECOLOGICAL COMPARISON (9) & BIOLOGICAL GROUPS (9)
// ─────────────────────────────────────────────────────────────────────────────

export const ECOLOGICAL_COMPARISON_9: EcologicalComparisonRow[] = [
  {
    id: 'ECO-01',
    ecologicalCharacteristic: 'Vegetation',
    naturalProtectedHabitat: 'Naturally occurring ecological communities',
    intensivelyManagedGolfLandscape:
      'Selected turf and landscaped vegetation',
  },
  {
    id: 'ECO-02',
    ecologicalCharacteristic: 'Habitat structure',
    naturalProtectedHabitat: 'Multiple vegetation layers and microhabitats',
    intensivelyManagedGolfLandscape:
      'Playing surfaces with managed vegetation',
  },
  {
    id: 'ECO-03',
    ecologicalCharacteristic: 'Biodiversity',
    naturalProtectedHabitat: 'Conservation of native species',
    intensivelyManagedGolfLandscape:
      'Species adapted to the managed landscape',
  },
  {
    id: 'ECO-04',
    ecologicalCharacteristic: 'Soil',
    naturalProtectedHabitat: 'Natural biological and nutrient processes',
    intensivelyManagedGolfLandscape:
      'Potential grading, compaction and soil modification',
  },
  {
    id: 'ECO-05',
    ecologicalCharacteristic: 'Hydrology',
    naturalProtectedHabitat: 'Naturally functioning drainage and infiltration',
    intensivelyManagedGolfLandscape: 'Engineered irrigation and drainage',
  },
  {
    id: 'ECO-06',
    ecologicalCharacteristic: 'Disturbance',
    naturalProtectedHabitat: 'Managed according to conservation objectives',
    intensivelyManagedGolfLandscape: 'Recreation, mowing and maintenance',
  },
  {
    id: 'ECO-07',
    ecologicalCharacteristic: 'Nutrients',
    naturalProtectedHabitat: 'Natural cycling',
    intensivelyManagedGolfLandscape: 'Potential external fertilizer inputs',
  },
  {
    id: 'ECO-08',
    ecologicalCharacteristic: 'Chemical exposure',
    naturalProtectedHabitat: 'Limited according to conservation requirements',
    intensivelyManagedGolfLandscape:
      'Potential herbicide, fungicide and pesticide applications',
  },
  {
    id: 'ECO-09',
    ecologicalCharacteristic: 'Ecological succession',
    naturalProtectedHabitat: 'Natural or conservation-guided processes',
    intensivelyManagedGolfLandscape:
      'Regular interruption to maintain playing conditions',
  },
];

export const KALPAVRIKSH_SNOW_LEOPARD_NOTE =
  'Archived correspondence preserved in the Kalpavriksh Papers (Milli Archives Foundation, Top Container 672) documents contemporary conservation concerns regarding the relocation of a snow leopard and an associated breeding/conservation facility affected by the golf course development. Original wildlife relocation orders, veterinary transfer logs, and facility plans must be retrieved before drawing final conclusions.';

export const TREE_REMOVAL_DISCREPANCY_NOTE =
  'Historical reporting on tree removal varies substantially—from a July 1999 Protected Area Update bulletin recording allegations that thousands of trees were felled, to a subsequent conservation account citing more than 10,000 trees, alongside contemporary government statements disputing extensive clearing. None of these figures is treated as an independently verified count pending retrieval of forest inventories, felling permissions, timber disposal ledgers, and 1997–2001 high-resolution imagery.';

const BIOLOGICAL_GROUPS_ROWS: BiologicalGroupInvestigationRow[] = [
  {
    id: 'BIO-01',
    biologicalGroup: 'Birds',
    requiredInvestigation:
      'Historical and present species richness, breeding activity and seasonal abundance',
    baselineAndFieldMethod:
      'Reconcile pre-1998 ornithological checklists and WII/IBA records against standardized point-count and breeding-territory surveys across turf, wooded roughs, and adjacent Zabarwan slopes.',
  },
  {
    id: 'BIO-02',
    biologicalGroup: 'Mammals',
    requiredInvestigation:
      'Historical sightings, present occupancy and movement corridors',
    baselineAndFieldMethod:
      'Combine archival Wildlife Department beat registers with camera-trap grids testing foothill movement connectivity toward Dachigam and Shankaracharya.',
  },
  {
    id: 'BIO-03',
    biologicalGroup: 'Amphibians',
    requiredInvestigation: 'Loss or alteration of moist habitats',
    baselineAndFieldMethod:
      'Survey natural spring seeps, ephemeral pools, and engineered water hazards for breeding occupancy and agrochemical sensitivity.',
  },
  {
    id: 'BIO-04',
    biologicalGroup: 'Reptiles',
    requiredInvestigation: 'Changes in natural vegetation and shelter',
    baselineAndFieldMethod:
      'Assess talus, rocky Zabarwan outcrop, and leaf-litter refugia persistence across managed fairways versus surviving scrub parcels.',
  },
  {
    id: 'BIO-05',
    biologicalGroup: 'Butterflies',
    requiredInvestigation: 'Changes in host plants and pesticide exposure',
    baselineAndFieldMethod:
      'Conduct Pollard-walk transects paired with larval host-plant mapping and turf insecticide drift screening.',
  },
  {
    id: 'BIO-06',
    biologicalGroup: 'Pollinators',
    requiredInvestigation: 'Floral diversity and chemical exposure',
    baselineAndFieldMethod:
      'Compare native wildflower phenology and wild bee/syrphid visitation rates between mowed turf margins and ungraded foothill reference plots.',
  },
  {
    id: 'BIO-07',
    biologicalGroup: 'Soil organisms',
    requiredInvestigation:
      'Effects of soil disturbance and intensive management',
    baselineAndFieldMethod:
      'Measure soil bulk density, organic carbon, mycorrhizal diversity, earthworm biomass, and fungicide residues across graded greens and native forest soils.',
  },
  {
    id: 'BIO-08',
    biologicalGroup: 'Aquatic organisms',
    requiredInvestigation:
      'Changes in drainage water and associated ponds',
    baselineAndFieldMethod:
      'Sample macroinvertebrates, periphyton, and dissolved nutrients in golf-course retention ponds and outflow channels toward Dal Lake.',
  },
  {
    id: 'BIO-09',
    biologicalGroup: 'Native plants',
    requiredInvestigation:
      'Replacement, fragmentation and regeneration',
    baselineAndFieldMethod:
      'Distinguish remnant native Zabarwan broadleaf/conifer stands and natural seedling recruitment from ornamental horticultural plantings.',
  },
];

export const BIOLOGICAL_GROUPS_9: BiologicalGroupsCollection = Object.assign(
  BIOLOGICAL_GROUPS_ROWS,
  {
    snowLeopardFacilityNote: KALPAVRIKSH_SNOW_LEOPARD_NOTE,
    treeRemovalDiscrepancyNote: TREE_REMOVAL_DISCREPANCY_NOTE,
    treeReconstructionRequirements: [
      'Original forest inventories and species composition',
      'Tree-felling permissions and timber disposal records',
      'Historical aerial and satellite imagery',
      'Tree age and estimated biomass',
      'Subsequent plantation and replacement records',
      'Present native woodland extent',
      'Long-term carbon and habitat consequences',
    ] as const,
  },
);

// ─────────────────────────────────────────────────────────────────────────────
// 7. PARTS VI & VII (SECTIONS 11–15) — HYDROLOGICAL & ECONOMIC MATRICES
// ─────────────────────────────────────────────────────────────────────────────

export const HYDROLOGICAL_AND_ECONOMIC_MATRICES: HydrologicalAndEconomicMatricesSpec =
  {
    dalLakeHydrologicalPremise:
      'Examining hydrological and chemical connectivity between Royal Springs Golf Course and Dal Lake follows directly from the April 6, 2005 National Board for Wildlife proceedings, which explicitly considered CSIR Jammu monitoring of effluent discharges affecting wildlife habitats and Dal Lake. Potential pathways—surface runoff, engineered drains, shallow groundwater, and spring-fed channels—require empirical field measurement rather than assumption.',
    illustrativeIrrigationBaseline: {
      irrigatedTurfAreaHa: 60,
      annualNetIrrigationMm: 400,
      irrigationEfficiencyPercent: 75,
      estimatedAnnualGrossLitres: 320_000_000,
      estimatedAnnualVolumeM3: 320_000,
      annualDailyEquivalentMld: 0.88,
      methodologicalCaveat:
        'Illustrative scenario calculation only—not verified Royal Springs Golf Course water consumption. Actual abstraction depends on metered irrigated turf area, effective precipitation, seasonal evapotranspiration, sprinkler efficiency, and sanctioned water sources.',
    },
    illustrativeNutrientBaseline: {
      fertilizedAreaHa: 60,
      nitrogenApplicationKgPerHaYr: 100,
      phosphorusApplicationKgPerHaYr: 15,
      assumedExportFractionPercent: 5,
      annualNitrogenAppliedTonnes: 6.0,
      annualPhosphorusAppliedTonnes: 0.9,
      potentialNitrogenExportKgYr: 300,
      potentialPhosphorusExportKgYr: 45,
      methodologicalCaveat:
        'Illustrative elemental N and P scenario—not an empirically measured Royal Springs runoff load. Export from fertilized turf does not automatically equal nutrient delivery into Dal Lake; separate N/P attenuation coefficients and hydrological tracing are required.',
    },
    waterAccounting8: [
      {
        id: 'WAT-01',
        waterAccountingComponent: 'Water source',
        informationRequired: 'Springs, wells, surface water or other supply',
      },
      {
        id: 'WAT-02',
        waterAccountingComponent: 'Abstraction authorization',
        informationRequired: 'Water permits and sanctioned quantities',
      },
      {
        id: 'WAT-03',
        waterAccountingComponent: 'Pumping records',
        informationRequired: 'Actual seasonal withdrawals',
      },
      {
        id: 'WAT-04',
        waterAccountingComponent: 'Rainfall contribution',
        informationRequired: 'Effective precipitation',
      },
      {
        id: 'WAT-05',
        waterAccountingComponent: 'Irrigation extent',
        informationRequired: 'Verified irrigated turf area',
      },
      {
        id: 'WAT-06',
        waterAccountingComponent: 'Irrigation efficiency',
        informationRequired: 'Metered delivery and estimated losses',
      },
      {
        id: 'WAT-07',
        waterAccountingComponent: 'Drainage',
        informationRequired: 'Surface and subsurface discharge pathways',
      },
      {
        id: 'WAT-08',
        waterAccountingComponent: 'Groundwater effects',
        informationRequired: 'Water-level and abstraction trends',
      },
    ],
    economicBalance8: [
      {
        id: 'ECB-01',
        potentialEconomicBenefit: 'Tourism revenue',
        potentialEcologicalOpportunityCost: 'Loss of native habitat',
      },
      {
        id: 'ECB-02',
        potentialEconomicBenefit: 'Golf membership revenue',
        potentialEcologicalOpportunityCost: 'Loss of ecological connectivity',
      },
      {
        id: 'ECB-03',
        potentialEconomicBenefit: 'Tournament expenditure',
        potentialEcologicalOpportunityCost: 'Changes in natural drainage',
      },
      {
        id: 'ECB-04',
        potentialEconomicBenefit: 'Employment generation',
        potentialEcologicalOpportunityCost: 'Water abstraction requirements',
      },
      {
        id: 'ECB-05',
        potentialEconomicBenefit: 'Hospitality expenditure',
        potentialEcologicalOpportunityCost:
          'Potential nutrient and chemical runoff',
      },
      {
        id: 'ECB-06',
        potentialEconomicBenefit: 'Recreational opportunities',
        potentialEcologicalOpportunityCost:
          'Loss of biodiversity research opportunities',
      },
      {
        id: 'ECB-07',
        potentialEconomicBenefit: 'Destination marketing',
        potentialEcologicalOpportunityCost: 'Changes in carbon storage',
      },
      {
        id: 'ECB-08',
        potentialEconomicBenefit: 'Infrastructure development',
        potentialEcologicalOpportunityCost:
          'Long-term ecological rehabilitation costs',
      },
    ],
    financialDossier14: [
      {
        id: 'FIN-01',
        financialCategory: 'Original project estimate',
        evidenceRequired: 'Detailed project report',
      },
      {
        id: 'FIN-02',
        financialCategory: 'Actual construction expenditure',
        evidenceRequired: 'Audited capital accounts',
      },
      {
        id: 'FIN-03',
        financialCategory: 'Cost of imported equipment',
        evidenceRequired: 'Procurement records',
      },
      {
        id: 'FIN-04',
        financialCategory: 'Annual operational expenditure',
        evidenceRequired: 'Financial statements',
      },
      {
        id: 'FIN-05',
        financialCategory: 'Irrigation expenditure',
        evidenceRequired: 'Pumping and electricity records',
      },
      {
        id: 'FIN-06',
        financialCategory: 'Fertilizer and chemical expenditure',
        evidenceRequired: 'Procurement and application registers',
      },
      {
        id: 'FIN-07',
        financialCategory: 'Machinery maintenance',
        evidenceRequired: 'Annual maintenance accounts',
      },
      {
        id: 'FIN-08',
        financialCategory: 'Staffing expenditure',
        evidenceRequired: 'Audited operating expenses',
      },
      {
        id: 'FIN-09',
        financialCategory: 'Tournament expenditure',
        evidenceRequired: 'Government and private sponsorship records',
      },
      {
        id: 'FIN-10',
        financialCategory: 'Membership revenue',
        evidenceRequired: 'Financial statements',
      },
      {
        id: 'FIN-11',
        financialCategory: 'Visitor revenue',
        evidenceRequired: 'Annual admission and playing-fee records',
      },
      {
        id: 'FIN-12',
        financialCategory: 'Government subsidies',
        evidenceRequired: 'Budget allocations and releases',
      },
      {
        id: 'FIN-13',
        financialCategory: 'Environmental mitigation expenditure',
        evidenceRequired: 'Compliance and restoration accounts',
      },
      {
        id: 'FIN-14',
        financialCategory: 'Public-private partnership proposals',
        evidenceRequired: 'Financial feasibility and concession documents',
      },
    ],
    netPublicContributionFormula:
      'Net public financial contribution = Public expenditure − Revenue returned to government',
    pppOutsourcingContext2023:
      'In March 2023, the administration examined outsourcing Royal Springs Golf Course under a public-private partnership (PPP) model, underscoring the need to audit twenty-five-year net fiscal performance alongside statutory environmental obligations.',
    economicAnalyticalGuardrail:
      'Neither side of the economic–ecological ledger has yet been comprehensively quantified. Commercial profitability alone would not establish that converting a statutory national park was environmentally justified; conversely, operating deficits alone would not establish that the original conversion was unlawful.',
  };

// ─────────────────────────────────────────────────────────────────────────────
// 8. PART VIII (SECTIONS 16–17) — FORENSIC GEOSPATIAL RECONSTRUCTION SPEC
// ─────────────────────────────────────────────────────────────────────────────

export const GEOSPATIAL_RECONSTRUCTION_SPEC: GeospatialReconstructionSpec = {
  guidingMaxim:
    'The absence of the entire original park from the public imagination must not be mistaken for its lawful disappearance from the protected-area network.',
  observationPeriods9: [
    {
      id: 'GEO-P01',
      observationPeriod: '1960–1972',
      investigativePurpose:
        'Historical landscape reconstruction using available declassified imagery',
      sensorOrArchiveClass:
        'Declassified reconnaissance photography (CORONA KH-4A/4B) & Survey of India topographic sheets',
    },
    {
      id: 'GEO-P02',
      observationPeriod: '1972–1985',
      investigativePurpose:
        'Early Landsat observations before reported notification',
      sensorOrArchiveClass:
        'Landsat 1–5 MSS/TM multispectral pre-notification archive',
    },
    {
      id: 'GEO-P03',
      observationPeriod: '1986–1992',
      investigativePurpose:
        'Establishment-period landscape and boundaries',
      sensorOrArchiveClass:
        'Landsat 5 TM, SPOT panchromatic, and historical forest working-plan maps',
    },
    {
      id: 'GEO-P04',
      observationPeriod: '1993–1997',
      investigativePurpose: 'Pre-development environmental baseline',
      sensorOrArchiveClass:
        'IRS-1B/1C LISS & PAN + Landsat 5 TM pre-clearing baseline',
    },
    {
      id: 'GEO-P05',
      observationPeriod: '1998–2001',
      investigativePurpose:
        'Land clearance and golf course construction',
      sensorOrArchiveClass:
        'IRS-1C/1D PAN, Landsat 7 ETM+, and IKONOS early commercial VHR imagery',
    },
    {
      id: 'GEO-P06',
      observationPeriod: '2002–2005',
      investigativePurpose:
        'Post-construction landscape and wildlife board deliberations',
      sensorOrArchiveClass:
        'QuickBird / IKONOS VHR & ASTER thermal/multispectral scenes',
    },
    {
      id: 'GEO-P07',
      observationPeriod: '2006–2014',
      investigativePurpose: 'Subsequent land-use and vegetation changes',
      sensorOrArchiveClass:
        'WorldView / GeoEye VHR, Resourcesat LISS-IV, and Landsat 7/8 time series',
    },
    {
      id: 'GEO-P08',
      observationPeriod: '2015–2020',
      investigativePurpose: 'High-resolution Sentinel-era observations',
      sensorOrArchiveClass:
        'Copernicus Sentinel-2 MSI (10 m), Sentinel-1 SAR, and VHR optical',
    },
    {
      id: 'GEO-P09',
      observationPeriod: '2021–2026',
      investigativePurpose: 'Contemporary ecological condition',
      sensorOrArchiveClass:
        'Sentinel-2, spaceborne LiDAR (GEDI), ECOSTRESS/Landsat 9 thermal, and contemporary parcel verification',
    },
  ],
  geospatialAnalyses12: [
    {
      id: 'GEO-A01',
      scientificAnalysis: 'Historical boundary reconstruction',
      expectedOutput: 'Authenticated national park polygon',
    },
    {
      id: 'GEO-A02',
      scientificAnalysis: 'Cadastral overlay',
      expectedOutput: 'Parcel-wise legal status',
    },
    {
      id: 'GEO-A03',
      scientificAnalysis: 'Land-use classification',
      expectedOutput: 'Natural and managed landscape changes',
    },
    {
      id: 'GEO-A04',
      scientificAnalysis: 'Forest-cover change',
      expectedOutput: 'Historical woodland loss and regeneration',
    },
    {
      id: 'GEO-A05',
      scientificAnalysis: 'Habitat fragmentation',
      expectedOutput: 'Changes in ecological connectivity',
    },
    {
      id: 'GEO-A06',
      scientificAnalysis: 'Vegetation structure',
      expectedOutput: 'Native woodland versus managed turf',
    },
    {
      id: 'GEO-A07',
      scientificAnalysis: 'Terrain analysis',
      expectedOutput: 'Slope modification and drainage pathways',
    },
    {
      id: 'GEO-A08',
      scientificAnalysis: 'Hydrological modelling',
      expectedOutput: 'Potential connections with Dal Lake',
    },
    {
      id: 'GEO-A09',
      scientificAnalysis: 'Surface-temperature analysis',
      expectedOutput: 'Changes in urban thermal regulation',
    },
    {
      id: 'GEO-A10',
      scientificAnalysis: 'Carbon assessment',
      expectedOutput: 'Estimated changes in ecosystem carbon stocks',
    },
    {
      id: 'GEO-A11',
      scientificAnalysis: 'Infrastructure mapping',
      expectedOutput: 'Buildings, roads, paths and engineered water features',
    },
    {
      id: 'GEO-A12',
      scientificAnalysis: 'Encroachment assessment',
      expectedOutput: 'Identification of potentially incompatible land uses',
    },
  ],
  requiredMapLayers7: [
    'Original notified national park boundary',
    'Reported denotified boundary',
    'Actual golf course boundary',
    'Remaining legally protected parcels',
    'Remaining natural habitat',
    'Other developed areas',
    'Areas of unresolved legal status',
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 9. PART IX (SECTIONS 18–19) — ENVIRONMENTAL RESISTANCE (8) & INTROSPECTION (8)
// ─────────────────────────────────────────────────────────────────────────────

export const ENVIRONMENTAL_RESISTANCE_8: EnvironmentalResistanceRecord[] = [
  {
    id: 'RES-01',
    individualOrOrganization: 'Wildlife Protection Society of India',
    documentedInvolvement:
      'Public interest litigation challenging golf course construction',
    sourceContext:
      'Filed PIL No. 115/99 in January 1999, documented in IGNFA environmental law archives and Protected Area Update.',
  },
  {
    id: 'RES-02',
    individualOrOrganization: 'Vikram Jit Singh',
    documentedInvolvement:
      'Contemporary investigative reporting in The Indian Express',
    sourceContext:
      'Published on-the-ground investigative journalism in early 1999 documenting tree removal and statutory objections inside the park.',
  },
  {
    id: 'RES-03',
    individualOrOrganization: 'Kalpavriksh',
    documentedInvolvement:
      'Protected-area reporting and conservation correspondence',
    sourceContext:
      'Published Protected Area Update dispatches (archived at IISc) and preserved primary correspondence from October 1998 onward (Milli Archives Foundation).',
  },
  {
    id: 'RES-04',
    individualOrOrganization: 'Mir Inayet Ullah',
    documentedInvolvement:
      'Reported objections while serving as Chief Wildlife Warden',
    sourceContext:
      'Recorded in contemporary conservation reporting as raising institutional wildlife-department objections during the initial phase of project execution.',
  },
  {
    id: 'RES-05',
    individualOrOrganization: 'M. K. Ranjitsinh',
    documentedInvolvement: 'Participation in the expert site inspection',
    sourceContext:
      'Co-authored the 2003 expert site inspection report examined by the Standing Committee of the Indian Board for Wildlife on May 6, 2003.',
  },
  {
    id: 'RES-06',
    individualOrOrganization: 'Aseem Srivastav',
    documentedInvolvement: 'Participation in the expert site inspection',
    sourceContext:
      'Co-authored the 2003 expert site inspection report formulating eight environmental and institutional safeguard recommendations.',
  },
  {
    id: 'RES-07',
    individualOrOrganization: 'Indian Board for Wildlife',
    documentedInvolvement:
      'Examination of denotification and environmental concerns',
    sourceContext:
      'Standing Committee deferred denotification approval on May 6, 2003 pending resolution of pesticide and fertilizer questions.',
  },
  {
    id: 'RES-08',
    individualOrOrganization: 'National Board for Wildlife',
    documentedInvolvement:
      'Subsequent review of compliance and expert recommendations',
    sourceContext:
      'Reviewed state compliance across August 2004, April 2005, and October 2005 meetings and resolved to report noncompliance with expert recommendations to the Supreme Court.',
  },
];

export const PROFESSIONAL_INTROSPECTION_8: ProfessionalIntrospectionRow[] = [
  {
    id: 'INT-01',
    professionalCommunity: 'Environmental scientists',
    historicalInvestigation:
      'Published ecological assessments and scientific objections',
    archivalCaution:
      'Connects directly to Monograph 08 (South Asia’s Environmental Vanguard); unpublished technical notes or departmental submissions may exist outside digitized journals.',
  },
  {
    id: 'INT-02',
    professionalCommunity: 'University departments',
    historicalInvestigation:
      'Research, institutional representations and expert advice',
    archivalCaution:
      'Requires checking thesis repositories, botany/zoology/environmental-science departmental files, and advisory correspondence from 1998–2005.',
  },
  {
    id: 'INT-03',
    professionalCommunity: 'Environmental advocates',
    historicalInvestigation: 'Legal challenges and subsequent litigation',
    archivalCaution:
      'Examines High Court appearances, intervenor filings, and procedural barriers during a difficult period in regional public life.',
  },
  {
    id: 'INT-04',
    professionalCommunity: 'Journalists',
    historicalInvestigation:
      'Contemporary reporting and investigative follow-up',
    archivalCaution:
      'Requires microfilmed and print-archive searches of Srinagar and national newspapers from 1998–2005 that are not indexed online.',
  },
  {
    id: 'INT-05',
    professionalCommunity: 'Environmental NGOs',
    historicalInvestigation:
      'Campaigns, representations and conservation interventions',
    archivalCaution:
      'Distinguishes documented written representations from retrospective oral claims while respecting operational constraints of the late 1990s.',
  },
  {
    id: 'INT-06',
    professionalCommunity: 'Elected representatives',
    historicalInvestigation:
      'Legislative questions, debates and recorded positions',
    archivalCaution:
      'Requires consulting official Jammu & Kashmir Legislative Assembly and Legislative Council proceedings for starred/unstarred questions and boundary motions.',
  },
  {
    id: 'INT-07',
    professionalCommunity: 'Wildlife officials',
    historicalInvestigation: 'Technical recommendations and objections',
    archivalCaution:
      'Internal file notings and dissenting memoranda must be recovered through official archives and right-of-response interviews.',
  },
  {
    id: 'INT-08',
    professionalCommunity: 'Citizens',
    historicalInvestigation:
      'Public representations, petitions and community participation',
    archivalCaution:
      'Absence of digitized records must never be equated automatically with public indifference; local oral and archival recovery is required.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 10. PARTS X & XI (SECTIONS 20–23) — CONSERVATION TEST & RECOVERY SPEC
// ─────────────────────────────────────────────────────────────────────────────

export const CONSERVATION_TEST_AND_RECOVERY_SPEC: ConservationTestAndRecoverySpec =
  {
    retrospectiveFrameworkNote:
      'These eleven analytical questions draw upon contemporary international protected-area governance principles as a structured scientific and ethical lens while strictly distinguishing them from the specific statutory obligations binding in Jammu and Kashmir in 1998.',
    restorationEcologicalSafeguard:
      'Contemporary restoration or remediation must account for current legal status, employees, tourism livelihoods, and empirical evidence—and must never inflict secondary ecological harm through indiscriminate excavation, chemical treatment, or removal of established native trees.',
    internationalConservationTest11: [
      {
        id: 'ICT-01',
        conservationPrinciple: 'Ecological necessity',
        questionForHistoricalConversion:
          'Was there a conservation justification for changing the land use?',
      },
      {
        id: 'ICT-02',
        conservationPrinciple: 'Public necessity',
        questionForHistoricalConversion:
          'Was protected land essential for achieving the recreational objective?',
      },
      {
        id: 'ICT-03',
        conservationPrinciple: 'Alternatives',
        questionForHistoricalConversion:
          'Were suitable locations outside the national park evaluated?',
      },
      {
        id: 'ICT-04',
        conservationPrinciple: 'Avoidance',
        questionForHistoricalConversion:
          'Could habitat destruction have been avoided?',
      },
      {
        id: 'ICT-05',
        conservationPrinciple: 'Minimization',
        questionForHistoricalConversion:
          'Was the development footprint reduced to the minimum necessary?',
      },
      {
        id: 'ICT-06',
        conservationPrinciple: 'Ecological compensation',
        questionForHistoricalConversion:
          'Were equivalent ecological functions demonstrably restored elsewhere?',
      },
      {
        id: 'ICT-07',
        conservationPrinciple: 'Scientific assessment',
        questionForHistoricalConversion:
          'Were qualified independent assessments conducted before development?',
      },
      {
        id: 'ICT-08',
        conservationPrinciple: 'Public participation',
        questionForHistoricalConversion:
          'Were affected communities and conservation institutions consulted?',
      },
      {
        id: 'ICT-09',
        conservationPrinciple: 'Legal compliance',
        questionForHistoricalConversion:
          'Were all applicable statutory processes completed?',
      },
      {
        id: 'ICT-10',
        conservationPrinciple: 'Monitoring',
        questionForHistoricalConversion:
          'Were environmental consequences independently measured?',
      },
      {
        id: 'ICT-11',
        conservationPrinciple: 'Long-term protection',
        questionForHistoricalConversion:
          'Was the remaining protected landscape secured against further conversion?',
      },
    ],
    alternativeScenarios6: [
      {
        id: 'ALT-01',
        alternativeDevelopmentScenario: 'Development outside the national park',
        requiredEvaluation: 'Land availability and ecological suitability',
      },
      {
        id: 'ALT-02',
        alternativeDevelopmentScenario: 'Expansion of existing golf facilities',
        requiredEvaluation: 'Comparative environmental impact',
      },
      {
        id: 'ALT-03',
        alternativeDevelopmentScenario:
          'Development on previously disturbed land',
        requiredEvaluation: 'Restoration and recreational compatibility',
      },
      {
        id: 'ALT-04',
        alternativeDevelopmentScenario: 'Reduced-scale recreational facility',
        requiredEvaluation: 'Smaller land and water footprint',
      },
      {
        id: 'ALT-05',
        alternativeDevelopmentScenario:
          'Conservation-oriented tourism within the park',
        requiredEvaluation: 'Compatibility with protected-area objectives',
      },
      {
        id: 'ALT-06',
        alternativeDevelopmentScenario:
          'No development within the protected landscape',
        requiredEvaluation: 'Retention of ecological services',
      },
    ],
    recoveryScenarios4: [
      {
        scenarioCode: 'Scenario A',
        title: 'Environmental remediation within existing operations',
        summary:
          'Introduce independent water monitoring, nutrient management, pesticide safeguards, native habitat buffers and improved drainage treatment.',
        safeguardsAndPrerequisites:
          'Requires full disclosure of turf chemical and irrigation ledgers, CSIR/independent receiving-water monitoring toward Dal Lake, and vegetated bioswales.',
      },
      {
        scenarioCode: 'Scenario B',
        title: 'Partial ecological rehabilitation',
        summary:
          'Identify non-playing areas suitable for native woodland restoration, wildlife corridors, natural wetlands and ecological research.',
        safeguardsAndPrerequisites:
          'Focuses on out-of-play roughs, perimeter margins, and spring lines using local-provenance Zabarwan plant communities without disrupting existing employment.',
      },
      {
        scenarioCode: 'Scenario C',
        title: 'Restoration of the surviving national park',
        summary:
          'Reconcile the original boundaries, protect surviving statutory parcels and rehabilitate degraded habitats outside the golf course footprint.',
        safeguardsAndPrerequisites:
          'Prioritizes cadastral authentication and statutory consolidation of the unresolved ~723-hectare remainder along the Zabarwan foothills.',
      },
      {
        scenarioCode: 'Scenario D',
        title: 'Phased land-use reconsideration',
        summary:
          'Examine whether selected developed parcels should eventually return to conservation management, subject to legal authority, scientific feasibility, public consultation and socioeconomic assessment.',
        safeguardsAndPrerequisites:
          'Strictly contingent upon judicial/statutory determination, worker transition protections, public consultation, and ecological soil-recovery feasibility.',
      },
    ],
    immediateInvestigations10: [
      {
        id: 'IMM-01',
        investigation: 'Legal boundary survey',
        requiredOutcome: 'Determine present statutory protection',
      },
      {
        id: 'IMM-02',
        investigation: 'Independent biodiversity assessment',
        requiredOutcome: 'Establish contemporary species and habitat condition',
      },
      {
        id: 'IMM-03',
        investigation: 'Water abstraction audit',
        requiredOutcome: 'Determine actual annual water consumption',
      },
      {
        id: 'IMM-04',
        investigation: 'Nutrient application audit',
        requiredOutcome: 'Establish nitrogen and phosphorus inputs',
      },
      {
        id: 'IMM-05',
        investigation: 'Pesticide inventory',
        requiredOutcome:
          'Identify applied chemicals and associated ecological risks',
      },
      {
        id: 'IMM-06',
        investigation: 'Drainage monitoring',
        requiredOutcome:
          'Determine receiving water bodies and pollutant loads',
      },
      {
        id: 'IMM-07',
        investigation: 'Soil chemistry assessment',
        requiredOutcome: 'Identify nutrient accumulation and contamination',
      },
      {
        id: 'IMM-08',
        investigation: 'Habitat connectivity assessment',
        requiredOutcome: 'Identify feasible ecological corridors',
      },
      {
        id: 'IMM-09',
        investigation: 'Financial audit',
        requiredOutcome:
          'Establish operating costs, revenues and public expenditure',
      },
      {
        id: 'IMM-10',
        investigation: 'Restoration feasibility study',
        requiredOutcome:
          'Identify scientifically and legally viable recovery options',
      },
    ],
  };

// ─────────────────────────────────────────────────────────────────────────────
// 11. PART XII (SECTIONS 24–25) — WESTERN HIMALAYAN PADDD & INTEGRITY PROTOCOL
// ─────────────────────────────────────────────────────────────────────────────

export const WESTERN_HIMALAYAN_PADDD_SPEC: WesternHimalayanPadddSpec = {
  preventiveVerificationDisclaimer:
    'The inclusion of a protected landscape in this five-region audit does not imply that its boundaries have been unlawfully altered. The purpose is preventive scientific, cadastral, and legal verification across the Western Himalayan Protected Area Network.',
  salimAliClassificationNote:
    'Whether the transformation of Srinagar’s Sálim Ali National Park constitutes a legally completed statutory downsizing (162 ha of an 885 ha baseline), an uncompleted administrative excision, or a broader de facto degazettement in public administration requires authentication of the original statutory instruments.',
  padddDefinitions3: [
    {
      id: 'PADDD-01',
      process: 'Downgrading',
      meaning: 'Reduction of restrictions on activities within a protected area',
      salimAliRelevance:
        'Tests whether recreational infrastructure, turf chemical regimes, or commercial concessions were authorized inside parcels still carrying statutory park status.',
    },
    {
      id: 'PADDD-02',
      process: 'Downsizing',
      meaning: "Removal of part of a protected area's geographical extent",
      salimAliRelevance:
        'Examines the reported excision of 1.62 km² (162 ha) cited in the October 2005 NBWL proceedings and the unexplained 40.6 ha variance from the advertised golf course area.',
    },
    {
      id: 'PADDD-03',
      process: 'Degazettement',
      meaning: 'Removal of legal protection from an entire protected area',
      salimAliRelevance:
        'Investigates why the remaining ~723 hectares largely vanished from public visibility even if never formally degazetted in law.',
    },
  ],
  fiveRegionAudit5: [
    {
      id: 'REG-01',
      region: 'Kashmir',
      protectedLandscapesToExamine:
        'Dachigam, Kazinag, Gulmarg, Overa-Aru, Hirpora and other protected landscapes',
    },
    {
      id: 'REG-02',
      region: 'Jammu',
      protectedLandscapesToExamine:
        'Kishtwar, Jasrota, Nandini, Ramnagar Rakha and associated sanctuaries',
    },
    {
      id: 'REG-03',
      region: 'Ladakh',
      protectedLandscapesToExamine:
        'Hemis, Changthang and Karakoram protected landscapes',
    },
    {
      id: 'REG-04',
      region: 'Azad Jammu & Kashmir',
      protectedLandscapesToExamine:
        'Machiara, Musk Deer, Pir Chinasi and other notified protected areas',
    },
    {
      id: 'REG-05',
      region: 'Gilgit-Baltistan',
      protectedLandscapesToExamine:
        'Central Karakoram, Khunjerab, Deosai, Broghil-adjacent ecological corridors and other regional protected landscapes, with jurisdictional boundaries verified',
    },
  ],
  integrityProtocol12: [
    {
      code: 'WHPAIP-01',
      requirement: 'Digitized statutory boundaries',
      intendedProtection: 'Prevent geographical ambiguity',
    },
    {
      code: 'WHPAIP-02',
      requirement: 'Public notification of proposed changes',
      intendedProtection: 'Ensure transparency',
    },
    {
      code: 'WHPAIP-03',
      requirement: 'Independent ecological baseline',
      intendedProtection: 'Establish what exists before intervention',
    },
    {
      code: 'WHPAIP-04',
      requirement: 'Demonstration of necessity',
      intendedProtection: 'Establish why protected land is required',
    },
    {
      code: 'WHPAIP-05',
      requirement: 'Alternatives assessment',
      intendedProtection: 'Examine development outside protected areas',
    },
    {
      code: 'WHPAIP-06',
      requirement: 'Cumulative impact assessment',
      intendedProtection: 'Account for existing and foreseeable pressures',
    },
    {
      code: 'WHPAIP-07',
      requirement: 'Legislative and judicial compliance',
      intendedProtection: 'Verify applicable statutory procedures',
    },
    {
      code: 'WHPAIP-08',
      requirement: 'Public participation',
      intendedProtection: 'Consider affected stakeholders',
    },
    {
      code: 'WHPAIP-09',
      requirement: 'Ecological restoration obligations',
      intendedProtection: 'Address unavoidable damage',
    },
    {
      code: 'WHPAIP-10',
      requirement: 'Long-term environmental monitoring',
      intendedProtection: 'Verify compliance and outcomes',
    },
    {
      code: 'WHPAIP-11',
      requirement: 'Publicly accessible approval archive',
      intendedProtection: 'Preserve institutional accountability',
    },
    {
      code: 'WHPAIP-12',
      requirement: 'Periodic independent boundary audit',
      intendedProtection: 'Identify subsequent incompatible development',
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// 12. PART XIV — 10 THEMATIC VOLUMES & 75 INVESTIGATIVE CHAPTER PROTOCOLS
// ─────────────────────────────────────────────────────────────────────────────

export const SALIM_ALI_VOLUMES_10: SalimAliVolumeSpec[] = [
  {
    volumeNumber: 1,
    volumeRoman: 'I',
    slug: 'volume-i-before-the-golf-course',
    volumeTitle: 'Before the golf course',
    chapterRange: 'Chapters 01–06',
    chapterCodes: ['01', '02', '03', '04', '05', '06'],
    thematicMandate:
      'Reconstructs the ecological character of the Zabarwan–Dal Lake foothills prior to conversion, the intellectual legacy of Dr. Sálim Ali in Kashmir ornithology, and the original 1986/1992 statutory gazette record of City Forest (Sálim Ali) National Park.',
  },
  {
    volumeNumber: 2,
    volumeRoman: 'II',
    slug: 'volume-ii-the-decision-to-transform-the-landscape',
    volumeTitle: 'The decision to transform the landscape',
    chapterRange: 'Chapters 07–12',
    chapterCodes: ['07', '08', '09', '10', '11', '12'],
    thematicMandate:
      'Examines the origins of the Royal Springs Golf Course proposal, the 1998 administrative and Cabinet sanctions, tourism arguments, engineering design, alternative site evaluations, and the chronological sequence between tree clearing and wildlife clearance.',
  },
  {
    volumeNumber: 3,
    volumeRoman: 'III',
    slug: 'volume-iii-the-legal-history',
    volumeTitle: 'The legal history',
    chapterRange: 'Chapters 13–20',
    chapterCodes: ['13', '14', '15', '16', '17', '18', '19', '20'],
    thematicMandate:
      'Audits Section 35 of the J&K Wildlife (Protection) Act, 1978, PIL No. 115/99, the 2003–2005 Indian and National Board for Wildlife proceedings, Supreme Court dereservation orders, retrospective approval jurisprudence, and present statutory status.',
  },
  {
    volumeNumber: 4,
    volumeRoman: 'IV',
    slug: 'volume-iv-reconstructing-the-lost-landscape',
    volumeTitle: 'Reconstructing the lost landscape',
    chapterRange: 'Chapters 21–27',
    chapterCodes: ['21', '22', '23', '24', '25', '26', '27'],
    thematicMandate:
      'Executes a multi-sensor 1960–2026 geospatial and cadastral reconstruction reconciling the 907 ha, 900 ha, 885 ha, and 869 ha baselines, the 162 ha vs. 121.4 ha conversion gap, forest-cover change, and the fate of the remaining 723 hectares.',
  },
  {
    volumeNumber: 5,
    volumeRoman: 'V',
    slug: 'volume-v-the-biological-consequences',
    volumeTitle: 'The biological consequences',
    chapterRange: 'Chapters 28–34',
    chapterCodes: ['28', '29', '30', '31', '32', '33', '34'],
    thematicMandate:
      'Evaluates historical baselines and contemporary field conditions across birds, mammals, the archived snow leopard facility question, native Zabarwan flora, soil biota, and insect pollinators.',
  },
  {
    volumeNumber: 6,
    volumeRoman: 'VI',
    slug: 'volume-vi-the-golf-course-and-dal-lake',
    volumeTitle: 'The golf course and Dal Lake',
    chapterRange: 'Chapters 35–42',
    chapterCodes: ['35', '36', '37', '38', '39', '40', '41', '42'],
    thematicMandate:
      'Investigates foothill drainage pathways, irrigation abstraction budgets, spring and groundwater impacts, elemental nitrogen and phosphorus loading, turf pesticide inventories, and the unresolved 2003–2005 NBWL/CSIR Dal Lake monitoring questions.',
  },
  {
    volumeNumber: 7,
    volumeRoman: 'VII',
    slug: 'volume-vii-the-financial-balance-sheet',
    volumeTitle: 'The financial balance sheet',
    chapterRange: 'Chapters 43–49',
    chapterCodes: ['43', '44', '45', '46', '47', '48', '49'],
    thematicMandate:
      'Constructs a twenty-five-year fiscal and environmental-economic ledger comparing capital outlays, imported turf machinery, operating subsidies, tourism revenues, the March 2023 PPP proposal, and foregone ecosystem services.',
  },
  {
    volumeNumber: 8,
    volumeRoman: 'VIII',
    slug: 'volume-viii-those-who-questioned-the-conversion',
    volumeTitle: 'Those who questioned the conversion',
    chapterRange: 'Chapters 50–55',
    chapterCodes: ['50', '51', '52', '53', '54', '55'],
    thematicMandate:
      'Documents the historical record of wildlife officials, public-interest lawyers, investigative journalists, conservation NGOs, expert inspection members, scientific bodies, and legislative interventions.',
  },
  {
    volumeNumber: 9,
    volumeRoman: 'IX',
    slug: 'volume-ix-kashmirs-collective-introspection',
    volumeTitle: "Kashmir's collective introspection",
    chapterRange: 'Chapters 56–62',
    chapterCodes: ['56', '57', '58', '59', '60', '61', '62'],
    thematicMandate:
      'Examines how public institutions, scientists, legal practitioners, journalists, and civil society understood statutory conservation in 1998—and whether protected-area governance culture in Kashmir has substantively evolved.',
  },
  {
    volumeNumber: 10,
    volumeRoman: 'X',
    slug: 'volume-x-the-future-of-protected-landscapes',
    volumeTitle: 'The future of protected landscapes',
    chapterRange: 'Chapters 63–75',
    chapterCodes: [
      '63',
      '64',
      '65',
      '66',
      '67',
      '68',
      '69',
      '70',
      '71',
      '72',
      '73',
      '74',
      '75',
    ],
    thematicMandate:
      'Evaluates Scenarios A–D for remediation and partial ecological recovery, global PADDD precedents, a preventive five-region Western Himalayan audit, statutory reforms, the 12-point Integrity Protocol, and the 2027–2035 recovery agenda.',
  },
];

export const SALIM_ALI_CHAPTERS_75: SalimAliChapterProtocol[] = [
  // ── VOLUME I: BEFORE THE GOLF COURSE (01–06) ──────────────────────────────
  {
    number: 1,
    code: '01',
    slug: 'chapter-01-the-national-park-srinagar-once-knew',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'Before the golf course',
    title: 'The National Park Srinagar Once Knew',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Establishes the historical identity of City Forest (Sálim Ali) National Park as a rare urban-adjacent national park situated between the Zabarwan Range and the eastern shores of Dal Lake in Srinagar.',
      'Examines how a statutory conservation landscape within municipal reach gradually receded from public consciousness following late-1990s recreational conversion, framing the central institutional accountability questions of Monograph 09.',
    ],
    investigativeQuestions: [
      'How was City Forest / Sálim Ali National Park administered, demarcated on the ground, and experienced by Srinagar residents and visiting naturalists prior to 1998?',
      'Which state departments held territorial, forestry, and wildlife jurisdiction across the Chashma Shahi–Pari Mahal–Gupkar foothill belt?',
      'How did public nomenclature shift from a notified national park to an exclusively recreational golf-course landmark?',
    ],
    evidenceAndMethods: [
      'Archival Jammu & Kashmir Wildlife Protection Department administrative reports and pre-1998 Srinagar city guidebooks',
      'Wildlife Institute of India Protected Area Gazette Notification Database metadata for City Forest (Sálim Ali) National Park',
      'Structured oral-history interviews with retired wildlife wardens, foresters, and Srinagar naturalists',
    ],
    deliverable:
      'Verified institutional and public-memory baseline profile of Srinagar’s urban national park prior to 1998.',
    methodologicalCaveat:
      'Retrospective recollections must be cross-checked against dated administrative files and pre-1998 cartographic records.',
  },
  {
    number: 2,
    code: '02',
    slug: 'chapter-02-the-ecological-history-of-the-zabarwan-foothills',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'Before the golf course',
    title: 'The Ecological History of the Zabarwan Foothills',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Situates the former national park within the broader geomorphological and biogeographical continuum linking Dal Lake, Shankaracharya Hill, the Zabarwan spurs, and Lower Dachigam.',
      'Reconstructs colluvial fan soils, spring-line hydrology, mixed temperate broadleaf–conifer woodlands, and seasonal altitudinal wildlife descent along the Zabarwan escarpment.',
    ],
    investigativeQuestions: [
      'What ecological functions did the lower Zabarwan alluvial and colluvial fans perform as a seasonal buffer between Upper/Lower Dachigam and Dal Lake?',
      'Which native tree, shrub, and herbaceous communities characterized ungraded Zabarwan foothill slopes between 1,585 m and 1,800 m?',
      'How did natural winter snowline descent bring montane birds and mammals into the City Forest belt?',
    ],
    evidenceAndMethods: [
      'Geological and geomorphological maps of the Zabarwan Range and Dal Lake catchment',
      'Historical Kashmir Valley forest working plans and botanical herbarium sheets at the University of Kashmir (KASH)',
      'Comparative reference-plot surveys on undisturbed Zabarwan foothill spurs adjacent to Dachigam',
    ],
    deliverable:
      'Biogeophysical synthesis map and reference ecosystem profile of the Zabarwan–Dal Lake foothill ecotone.',
    methodologicalCaveat:
      'Reference-site comparisons must account for century-scale fuelwood, grazing, and plantation history across the Srinagar periphery.',
  },
  {
    number: 3,
    code: '03',
    slug: 'chapter-03-the-landscape-before-national-park-notification',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'Before the golf course',
    title: 'The Landscape Before National Park Notification',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Traces the pre-1986 legal and ecological history of the City Forest reserve, including Dogra-era rakhs, catchment protection forests above Chashma Shahi and Nishat, and post-1947 urban forestry management.',
      'Distinguishes long-standing semi-natural foothill woodlands from pre-notification plantations, orchard enclaves, roads, and heritage Mughal garden buffers.',
    ],
    investigativeQuestions: [
      'What reserve-forest or game-rakh classifications governed the City Forest tract prior to notification under the J&K Wildlife (Protection) Act, 1978?',
      'Which non-forestry structures, roads, or private revenue parcels already existed within or along the tract before 1986?',
      'What canopy density and land-cover mosaic appear in 1960–1985 declassified reconnaissance and early Landsat scenes?',
    ],
    evidenceAndMethods: [
      'Pre-1986 Jammu & Kashmir Forest Department reserve notifications and settlement Khasra registers',
      'Declassified 1960–1972 reconnaissance photography and 1972–1985 Landsat MSS archival scenes',
      'Historical Survey of India 1:50,000 topographic sheets covering eastern Srinagar and Dal Lake',
    ],
    deliverable:
      'Pre-notification land-tenure and historical forest-structure reconstruction (pre-1986 baseline).',
    methodologicalCaveat:
      'Coarse spatial resolution in early Landsat MSS scenes requires calibration against panchromatic aerial or reconnaissance photography.',
  },
  {
    number: 4,
    code: '04',
    slug: 'chapter-04-salim-ali-and-the-intellectual-legacy-of-indian-ornithology',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'Before the golf course',
    title: 'Sálim Ali and the Intellectual Legacy of Indian Ornithology',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Examines Dr. Sálim Ali’s Himalayan expeditions, his foundational documentation of Kashmir’s avifauna, and the public decision to dedicate Srinagar’s City Forest National Park to India’s foremost ornithologist.',
      'Explores the institutional irony of commemorating a scientist who championed rigorous habitat protection while subsequently permitting the conversion of part of his namesake park into chemically managed turf.',
    ],
    investigativeQuestions: [
      'When and through what official instrument was City National Park / City Forest formally named or commingled with the name of Dr. Sálim Ali?',
      'What specific observations did Sálim Ali and Bombay Natural History Society surveys record across the Srinagar–Dachigam–Dal Lake foothill avifauna?',
      'How did Indian ornithological institutions respond when part of a national park bearing Sálim Ali’s name was cleared for a golf course?',
    ],
    evidenceAndMethods: [
      'Published Kashmir field surveys and correspondence of Dr. Sálim Ali and the Bombay Natural History Society (BNHS)',
      'Jammu & Kashmir government commemorative notifications and official naming records',
      'Archival conservation dispatches linking Monograph 09 with Monograph 04 (The Sky Has No Borders)',
    ],
    deliverable:
      'Historical essay and archival dossier on Sálim Ali’s Kashmir fieldwork and the naming of City Forest National Park.',
    methodologicalCaveat:
      'Popular accounts of the park’s naming date must be verified against official state gazette or cabinet nomenclature orders.',
  },
  {
    number: 5,
    code: '05',
    slug: 'chapter-05-why-the-landscape-was-originally-protected',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'Before the golf course',
    title: 'Why the Landscape Was Originally Protected',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Reconstructs the scientific, hydrological, and wildlife conservation rationale that motivated elevating Srinagar’s City Forest to statutory national park status under Jammu and Kashmir law.',
      'Evaluates the park’s intended role as an avian sanctuary, mammalian winter refuge, captive/ex-situ conservation buffer, and vegetated catchment shield above Dal Lake.',
    ],
    investigativeQuestions: [
      'Which target species, habitat types, and watershed protection functions were cited in the original departmental proposal to constitute City National Park?',
      'How did wildlife planners envision ecological connectivity between City National Park, Shankaracharya Reserve, and Lower Dachigam?',
      'What public-education or conservation-research roles were contemplated for an accessible national park adjoining Srinagar?',
    ],
    evidenceAndMethods: [
      'Department of Wildlife Protection J&K justification memoranda and pre-notification survey files',
      'Historical Directory of Indian National Parks and Sanctuaries entries (IIPA / WII / BNHS)',
      'Interviews with former J&K Wildlife Protection officers active during the 1986–1992 notification era',
    ],
    deliverable:
      'Statement of Original Conservation Purpose benchmarking all subsequent land-use alterations.',
    methodologicalCaveat:
      'Original departmental file notings must be distinguished from later secondary summaries in national directories.',
  },
  {
    number: 6,
    code: '06',
    slug: 'chapter-06-reconstructing-the-original-national-park-gazette',
    volumeNumber: 1,
    volumeRoman: 'I',
    volumeTitle: 'Before the golf course',
    title: 'Reconstructing the Original National Park Gazette',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Confronts the central documentary gap of Part I: reconciling why official portals and inventories alternately cite 1986 and 1992 as establishment years and 9.07 km², 9.00 km², 8.85 km², and 8.69 km² as park area.',
      'Sets out the institutional retrieval protocol for obtaining the authenticated gazette scan held behind the Wildlife Institute of India access form alongside J&K Government Press archives.',
    ],
    investigativeQuestions: [
      'Did the 1986 record represent an intention notification under Section 35(1) and the 1992 record a final notification or boundary modification?',
      'What exact compass bearings, ridge lines, road margins, and Khasra numbers define the gazetted perimeter?',
      'Were any existing roads, buildings, or institutional enclaves expressly excluded inside the original gazette schedule?',
    ],
    evidenceAndMethods: [
      'Formal institutional retrieval request to the Wildlife Institute of India Protected Area Gazette Notification Database',
      'Search of Jammu & Kashmir Government Gazette SRO archives (1985–1994) at Srinagar and Jammu repositories',
      'Cadastral cross-indexing with Srinagar Revenue Department village maps along the Zabarwan foothills',
    ],
    deliverable:
      'Authenticated Gazette Transcription & Statutory Boundary Schedule Concordance.',
    methodologicalCaveat:
      'Until the primary gazette scan is obtained and verified, all boundary polygons remain provisional reconstructions.',
  },

  // ── VOLUME II: THE DECISION TO TRANSFORM THE LANDSCAPE (07–12) ────────────
  {
    number: 7,
    code: '07',
    slug: 'chapter-07-the-origins-of-the-golf-course-proposal',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'The decision to transform the landscape',
    title: 'The Origins of the Golf Course Proposal',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Traces how the proposal to construct an international championship-standard golf course at the Zabarwan foothills emerged in the late 1990s and how City National Park land entered project planning.',
      'Examines institutional sponsorship across tourism, public works, and civil administration prior to formal Cabinet consideration in 1998.',
    ],
    investigativeQuestions: [
      'When was an international golf facility on the Chashma Shahi–Zabarwan site first proposed, and by which planning agency?',
      'Did initial concept documents explicitly acknowledge that the target site lay within notified national park land?',
      'What role did international golf-course design consultants play in site selection and acreage specification?',
    ],
    evidenceAndMethods: [
      'Jammu & Kashmir Tourism Department and J&K Projects Construction / Golf Development Authority planning files',
      'Archived October 1998 conservation correspondence in the Kalpavriksh Papers',
      'Right-of-response inquiries to identifiable project planners and administrative officials',
    ],
    deliverable:
      'Documented institutional genesis timeline of the Royal Springs Golf Course proposal.',
    methodologicalCaveat:
      'Published journalistic accounts of project origins must be corroborated with dated administrative file entries.',
  },
  {
    number: 8,
    code: '08',
    slug: 'chapter-08-the-political-and-administrative-decisions-of-1998',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'The decision to transform the landscape',
    title: 'The Political and Administrative Decisions of 1998',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Examines the executive and administrative approvals issued in 1998 under the government of Chief Minister Farooq Abdullah authorizing development of the Royal Springs Golf Course.',
      'Reconstructs inter-departmental consultations between Tourism, Forest, Wildlife Protection, Revenue, and Law departments at the moment land transfer or site entry was sanctioned.',
    ],
    investigativeQuestions: [
      'What exact legal authority was invoked in 1998 Cabinet decisions and government orders to authorize construction on City National Park land?',
      'Did the Law Department or Wildlife Protection Department record statutory advisories regarding Section 35 boundary-alteration requirements prior to sanction?',
      'Was land formally transferred in revenue records or handed over administratively pending subsequent denotification?',
    ],
    evidenceAndMethods: [
      '1998 Jammu & Kashmir Cabinet minutes, Government Orders, and Civil Secretariat inter-departmental files',
      'Revenue mutation registers for villages bordering Chashma Shahi and Brain/Nishat foothills',
      'Guaranteed Institutional Right of Response invitations to former decision-makers and departmental secretaries',
    ],
    deliverable:
      'Verified register of 1998 executive orders, inter-departmental advisories, and land-handover instruments.',
    methodologicalCaveat:
      'Secondary conservation accounts attributing specific decisions must be verified against primary Cabinet and Secretariat orders.',
  },
  {
    number: 9,
    code: '09',
    slug: 'chapter-09-the-tourism-development-rationale',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'The decision to transform the landscape',
    title: 'The Tourism Development Rationale',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Evaluates fairly and rigorously the economic and political rationale advanced in 1998: reviving high-value tourism, projecting normalcy after years of conflict, and positioning Srinagar on international golf circuits.',
      'Tests whether projected visitor arrival, tournament, and foreign-exchange targets stated at inception were grounded in empirical demand studies and whether they materialized over 2001–2026.',
    ],
    investigativeQuestions: [
      'What specific visitor numbers, international tournament schedules, and revenue projections were cited to justify the project in 1998?',
      'How did planners weigh golf-tourism branding against nature-based ornithological and national-park ecotourism?',
      'To what extent did post-2001 golfer utilization match the original feasibility assumptions?',
    ],
    evidenceAndMethods: [
      'J&K Tourism policy statements (1996–2002) and promotional dossiers for Royal Springs Golf Course',
      'Annual golfer footfall, domestic versus international visitor ratios, and tournament logs (2001–2026)',
      'Comparative tourism-demand analysis across Himalayan hill stations',
    ],
    deliverable:
      'Empirical comparison of 1998 tourism projections versus twenty-five-year operational utilization.',
    methodologicalCaveat:
      'Macro-level conflict and travel-advisory fluctuations in Kashmir must be controlled for when evaluating post-2001 visitor numbers.',
  },
  {
    number: 10,
    code: '10',
    slug: 'chapter-10-the-original-project-design-and-feasibility',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'The decision to transform the landscape',
    title: 'The Original Project Design and Feasibility',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Analyzes the architectural, earthmoving, turfgrass, drainage, and automated irrigation specifications in the original Detailed Project Report (DPR) for the 18-hole championship layout.',
      'Quantifies how much cut-and-fill grading, soil importation, water storage, and woodland clearing were engineered into the initial layout across the ~300-acre advertised site.',
    ],
    investigativeQuestions: [
      'What acreage of irrigated fairways, greens, tees, water hazards, buildings, and retained roughs was specified in the original DPR?',
      'Which cool-season turfgrass cultivars were selected, and what annual water and agrochemical regimes did their agronomic specifications require?',
      'Did the DPR include hydrological retention basins or chemical runoff containment structures protecting Dal Lake?',
    ],
    evidenceAndMethods: [
      'Original Detailed Project Report (DPR), master layout drawings, and bill of quantities',
      'Official J&K Tourism technical descriptions (~300 acres; automated sprinkler system)',
      'Turfgrass agronomy and civil-engineering audit of fairway grading and subsurface drainage plans',
    ],
    deliverable:
      'Technical engineering breakdown of the original golf-course design footprint and resource demands.',
    methodologicalCaveat:
      'As-built infrastructure on the ground may diverge from initial DPR drawings and must be verified via VHR imagery and site survey.',
  },
  {
    number: 11,
    code: '11',
    slug: 'chapter-11-alternative-locations-what-was-considered',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'The decision to transform the landscape',
    title: 'Alternative Locations: What Was Considered?',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Operationalizes Part X Section 21 by examining whether planners evaluated non-protected sites around Srinagar, upgrading the existing Kashmir Golf Course, or rehabilitating disturbed non-forest state land before selecting a national park.',
      'Applies multi-criteria land-suitability analysis to historical non-protected parcels available in the Srinagar metropolitan region in 1998.',
    ],
    investigativeQuestions: [
      'Do 1997–1998 planning files record any formal comparative evaluation of candidate sites outside Sálim Ali National Park?',
      'Why was upgrading existing golf infrastructure in Srinagar or Gulmarg deemed insufficient without excising national park land?',
      'Could a reduced-footprint or non-protected site have satisfied recreational goals without affecting Zabarwan foothill habitat?',
    ],
    evidenceAndMethods: [
      'Site-selection minutes and feasibility studies from Tourism and Srinagar Development Authority archives',
      '1997 IRS/Landsat land-cover and slope suitability layers across non-protected Srinagar periphery lands',
      'Six-scenario alternatives matrix evaluation (Section 21 protocol)',
    ],
    deliverable:
      'Retrospective Alternatives Assessment Matrix testing whether national park land was essential.',
    methodologicalCaveat:
      'Retrospective GIS suitability mapping cannot substitute for retrieving original 1998 site-selection files to establish historical intent.',
  },
  {
    number: 12,
    code: '12',
    slug: 'chapter-12-the-sequence-of-development-and-environmental-approval',
    volumeNumber: 2,
    volumeRoman: 'II',
    volumeTitle: 'The decision to transform the landscape',
    title: 'The Sequence of Development and Environmental Approval',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Investigates the pivotal chronological finding of Part I: physical tree clearing (reported early 1999) and course completion (2001) preceded the documented May 2003, August 2004, April 2005, and October 2005 wildlife board deliberations.',
      'Maps month-by-month physical earthworks against every state and central statutory application, court filing, and advisory deferral.',
    ],
    investigativeQuestions: [
      'On what exact date did physical land clearing and earthmoving commence inside the park perimeter?',
      'Which statutory wildlife or environmental clearances had been granted prior to commencement of clearing, and which were sought only after PIL No. 115/99 was filed?',
      'How did completion of the golf course in 2001 constrain the practical options available to the Indian and National Boards for Wildlife in 2003–2005?',
    ],
    evidenceAndMethods: [
      'Synchronized timeline of contractor work orders, 1998–2001 satellite imagery, press dispatches, and June 1999 IBWL submission records',
      'Standing Committee proceedings of May 6, 2003, August 25, 2004, April 6, 2005, and October 4, 2005',
      'Chronological sequence audit comparing physical irreversibility against regulatory review milestones',
    ],
    deliverable:
      'Synchronized Construction-versus-Clearance Gantt Dossier (1998–2005).',
    methodologicalCaveat:
      'Exact commencement dates of civil works require contractor tender and measurement-book verification alongside satellite scene dates.',
  },

  // ── VOLUME III: THE LEGAL HISTORY (13–20) ─────────────────────────────────
  {
    number: 13,
    code: '13',
    slug: 'chapter-13-the-jammu-and-kashmir-wildlife-protection-act',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The legal history',
    title: 'The Jammu and Kashmir Wildlife Protection Act',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Reconstructs the exact statutory text and amendment history of the Jammu and Kashmir Wildlife (Protection) Act, 1978 in force between 1986 and 2005, prior to post-2019 statutory reorganization.',
      'Focuses on Section 35 provisions governing declaration of national parks, prohibited activities, habitat destruction, wildlife removal, and mandatory procedures for boundary alteration.',
    ],
    investigativeQuestions: [
      'What exact statutory text of Section 35 of the J&K Wildlife (Protection) Act, 1978 was operative during 1998–2001, and when were subsequent amendments enacted?',
      'Which state or federal wildlife board recommendation and legislative resolution thresholds governed boundary alteration at each stage?',
      'How did the 2019 transition to the central Wild Life (Protection) Act, 1972 affect surviving notifications issued under the 1978 J&K Act?',
    ],
    evidenceAndMethods: [
      'Consolidated text of the J&K Wildlife (Protection) Act, 1978 (JKFPF legal archive) cross-checked against official J&K Law Department amendment acts (1978–2005)',
      'Jammu and Kashmir Reorganization (Adaptation of Laws) orders and savings clauses affecting existing protected areas',
      'Comparative statutory exegesis by Western Himalayan environmental law scholars',
    ],
    deliverable:
      'Annotated Statutory Concordance of Section 35 (1978–2026) and Transitional Savings Analysis.',
    methodologicalCaveat:
      'Available online PDF consolidations incorporate later amendments; original gazetted amendment acts from 1978–2002 must verify exact 1998 operative statutory text.',
  },
  {
    number: 14,
    code: '14',
    slug: 'chapter-14-the-legal-meaning-of-national-park-status',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The legal history',
    title: 'The Legal Meaning of National Park Status',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Clarifies why a national park occupies the highest tier of strict habitat protection in South Asian wildlife law—distinct from reserve forests, municipal parks, or tourism development zones.',
      'Examines the public-trust doctrine and statutory prohibitions on commercial landscaping, tree felling, exotic turf introduction, and wildlife habitat alteration unless strictly necessary for better wildlife management.',
    ],
    investigativeQuestions: [
      'Under statutory wildlife jurisprudence, can recreational golf development ever qualify as an activity necessary for the improvement and better management of wildlife?',
      'How do legal protections inside a national park differ from those in a wildlife sanctuary or conservation reserve?',
      'What fiduciary duties rest upon the Chief Wildlife Warden when an incompatible non-forestry project is proposed inside a national park?',
    ],
    evidenceAndMethods: [
      'Statutory comparison of National Park, Sanctuary, and Reserve Forest regimes under J&K and Indian wildlife statutes',
      'Supreme Court of India public-trust and protected-area jurisprudence (1995–2026)',
      'IUCN Category II management standards contrasted with domestic statutory text',
    ],
    deliverable:
      'Jurisprudential benchmark defining the legal threshold of National Park inviolability.',
    methodologicalCaveat:
      'International IUCN Category II guidelines provide interpretive context but must be kept distinct from binding domestic statutory provisions.',
  },
  {
    number: 15,
    code: '15',
    slug: 'chapter-15-pil-no-115-99',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The legal history',
    title: 'PIL No. 115/99',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Reconstructs Public Interest Litigation No. 115/99, filed in January 1999 by the Wildlife Protection Society of India challenging construction of the golf course inside Sálim Ali National Park.',
      'Examines the pleadings, interim stay applications, state counter-affidavits, judicial directions, and ultimate disposition referenced in Indira Gandhi National Forest Academy legal compilations.',
    ],
    investigativeQuestions: [
      'What specific statutory violations and factual allegations were pleaded in the original writ petition in PIL No. 115/99?',
      'What representations did the Jammu and Kashmir government make to the High Court regarding park boundaries, tree felling, and statutory approvals?',
      'Were interim orders issued permitting or conditioning construction, and how was PIL No. 115/99 ultimately disposed of or transferred?',
    ],
    evidenceAndMethods: [
      'Certified copies of writ petition, counter-affidavits, interim orders, and final judgment in PIL No. 115/99 from J&K High Court archives',
      'Indira Gandhi National Forest Academy (IGNFA) environmental case-law compilation summary',
      'Archival litigation correspondence of the Wildlife Protection Society of India',
    ],
    deliverable:
      'Complete Case Docket Reconstruction and Judicial Timeline of PIL No. 115/99.',
    methodologicalCaveat:
      'Secondary summaries in IGNFA training compilations must not be cited as final judicial findings until certified court orders are inspected.',
  },
  {
    number: 16,
    code: '16',
    slug: 'chapter-16-the-wildlife-board-proceedings',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The legal history',
    title: 'The Wildlife Board Proceedings',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Conducts a clause-by-clause forensic reading of the Indian Board for Wildlife and National Board for Wildlife proceedings across June 1999, May 6, 2003, August 25, 2004, April 6, 2005, and October 4, 2005.',
      'Analyzes the 2003 Ranjitsinh–Srivastav inspection report, all eight expert recommendations, the state’s 4-accepted / 3-deferred / 1-not-approved response, and the refusal to transfer Shankaracharya Reserve.',
    ],
    investigativeQuestions: [
      'What were the exact terms of all eight expert recommendations formulated after the 2003 site inspection?',
      'Which four recommendations were accepted, which three were deferred, and why was the Shankaracharya Reserve transfer rejected in October 2005?',
      'Did the National Board for Wildlife ever grant an unconditional post-October 2005 recommendation approving denotification?',
    ],
    evidenceAndMethods: [
      'Official MoEF Standing Committee minutes of May 6, 2003, August 25, 2004 (visually verified), April 6, 2005, and October 4, 2005',
      'Complete 2003 Ranjitsinh–Srivastav expert site inspection report and J&K compliance tables',
      'Post-2005 NBWL Standing Committee minutes search (2006–2026) to trace any subsequent agenda items',
    ],
    deliverable:
      'Itemized Eight-Recommendation Compliance Matrix & NBWL Deliberation Archive.',
    methodologicalCaveat:
      'Proceedings after October 2005 must be exhaustively searched to verify whether deferred items were ever resolved at a later meeting.',
  },
  {
    number: 17,
    code: '17',
    slug: 'chapter-17-judicial-restrictions-on-protected-area-conversion',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The legal history',
    title: 'Judicial Restrictions on Protected Area Conversion',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Examines the Supreme Court of India’s landmark orders—including the November 2000 restraint against dereservation of national parks and sanctuaries without Supreme Court leave and Central Empowered Committee (CEC) scrutiny.',
      'Traces whether the NBWL’s October 4, 2005 decision to place state noncompliance before the Supreme Court resulted in CEC proceedings, affidavits, or judicial orders.',
    ],
    investigativeQuestions: [
      'How did the Supreme Court’s February/November 2000 orders in T. N. Godavarman / Centre for Environmental Law v. Union of India apply to J&K national parks?',
      'Were the NBWL Standing Committee’s October 2005 noncompliance objections formally filed before the Supreme Court or Central Empowered Committee?',
      'Did the Supreme Court ever grant formal leave authorizing dereservation of 1.62 km² of Sálim Ali National Park?',
    ],
    evidenceAndMethods: [
      'Supreme Court of India orders in W.P. (C) No. 337/1995 and W.P. (C) No. 202/1995 (2000–2010)',
      'Central Empowered Committee (CEC) report and application indexes concerning Jammu & Kashmir protected areas',
      'MoEF legal cell filings following the October 4, 2005 NBWL resolution',
    ],
    deliverable:
      'Supreme Court & CEC Oversight Audit on Sálim Ali National Park Dereservation.',
    methodologicalCaveat:
      'Jurisdictional nuances governing applicability of central judicial orders to J&K statutory bodies prior to 2019 require careful constitutional verification.',
  },
  {
    number: 18,
    code: '18',
    slug: 'chapter-18-the-question-of-retrospective-approval',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The legal history',
    title: 'The Question of Retrospective Approval',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Examines the broader doctrine of ex post facto environmental and wildlife clearances in South Asian jurisprudence through the lens of Royal Springs Golf Course.',
      'Evaluates how presenting regulatory bodies with a completed, high-prestige physical project distorts scientific objectivity and reduces statutory clearance to damage-mitigation bargaining.',
    ],
    investigativeQuestions: [
      'How have Indian constitutional courts ruled on the permissibility and limits of ex post facto environmental, forest, and wildlife approvals?',
      'In what specific ways did completion of the golf course by 2001 narrow the remedies considered by expert inspectors in 2003?',
      'What statutory deterrents are needed to prevent irreversible landscape conversion pending clearance?',
    ],
    evidenceAndMethods: [
      'Comparative analysis of Supreme Court rulings on ex post facto environmental clearances (Alembic, Electrosteel, Pahwa Plastics, Vanashakti lines of precedent)',
      'IGNFA legal archive commentary on retrospective approval concerns in PIL No. 115/99',
      'Institutional decision-analysis of post-construction regulatory deferrals (2003–2005)',
    ],
    deliverable:
      'Doctrinal Legal Study on Retrospective Wildlife & Protected-Area Clearances.',
    methodologicalCaveat:
      'Contemporary Supreme Court jurisprudence on ex post facto EC must be distinguished from specific statutory wildlife rules applicable in 1998–2005.',
  },
  {
    number: 19,
    code: '19',
    slug: 'chapter-19-the-missing-legislative-and-gazette-records',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The legal history',
    title: 'The Missing Legislative and Gazette Records',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Tests the October 2005 statement recorded by the Chief Wildlife Warden—that 1.62 km² had been denotified—against the primary documentary record of legislative resolutions and official gazettes.',
      'Establishes a systematic archival search protocol across J&K Legislative Assembly/Council debates, Government Press SRO indexes, and Right to Information requests.',
    ],
    investigativeQuestions: [
      'On what exact date, under what SRO or notification number, and pursuant to which legislative resolution was 1.62 km² reportedly denotified?',
      'Why has no authenticated denotification gazette surfaced in public protected-area repositories to date?',
      'If a state denotification order was issued prior to October 2005, why was the NBWL Standing Committee still deliberating over denotification conditions between 2003 and 2005?',
    ],
    evidenceAndMethods: [
      'Chronological index search of the Jammu & Kashmir Government Gazette (1998–2006)',
      'Official proceedings and resolution registers of the Jammu & Kashmir Legislature (1998–2005)',
      'Structured Right to Information (RTI) filings to the J&K Department of Wildlife Protection and Department of Law, Justice & Parliamentary Affairs',
    ],
    deliverable:
      'Statutory Chain-of-Title Verification Report on the Reported 1.62 km² Denotification.',
    methodologicalCaveat:
      'Non-availability in online archives does not prove a gazette was never printed; physical Government Press ledgers must be inspected before reaching a conclusion.',
  },
  {
    number: 20,
    code: '20',
    slug: 'chapter-20-the-present-statutory-status-of-the-national-park',
    volumeNumber: 3,
    volumeRoman: 'III',
    volumeTitle: 'The legal history',
    title: 'The Present Statutory Status of the National Park',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Synthesizes how Sálim Ali National Park is classified in 2026 across WII national databases, MoEFCC protected-area lists, J&K Department of Wildlife Protection portals, and Srinagar revenue records.',
      'Determines whether the park remains legally extant over its non-golf remainder (~723 ha), partially excised, or administratively omitted without complete degazettement.',
    ],
    investigativeQuestions: [
      'Does Sálim Ali / City Forest National Park appear on current official MoEFCC/WII National Wildlife Database lists in 2026, and with what area?',
      'Which department exercises legal custody, policing, and land-use control over the non-golf parcels of the original park today?',
      'What legal status governs the 40.6-hectare difference between the reported 162 ha denotification and the 121.4 ha advertised golf course?',
    ],
    evidenceAndMethods: [
      '2026 audit of WII National Wildlife Database, J&K Wildlife Protection Department official listings, and Srinagar Master Plan land-use zones',
      'Current Jamabandi and Girdawari revenue extracts for all constituent Khasra parcels',
      'Formal written queries to the Chief Wildlife Warden, Jammu & Kashmir',
    ],
    deliverable:
      '2026 Parcel-by-Parcel Statutory Jurisdiction Determination.',
    methodologicalCaveat:
      'Administrative omission from a departmental website does not extinguish a gazetted statutory notification under wildlife law.',
  },

  // ── VOLUME IV: RECONSTRUCTING THE LOST LANDSCAPE (21–27) ──────────────────
  {
    number: 21,
    code: '21',
    slug: 'chapter-21-the-geography-of-the-original-park',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Reconstructing the lost landscape',
    title: 'The Geography of the Original Park',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Reconstructs the three-dimensional physical geography of the original national park across elevation contours, slope classes, aspect, micro-watersheds, springs, and foothill spurs between Chashma Shahi, Pari Mahal, and Zabarwan ridges.',
      'Establishes georeferenced control points linking textual boundary descriptions to modern coordinate reference systems.',
    ],
    investigativeQuestions: [
      'What elevation range, slope distribution, and drainage sub-basins defined the original notified national park?',
      'Where did the park’s outer boundary interface with Dal Lake shore-zone settlements, Mughal gardens, Shankaracharya Reserve, and Dachigam?',
      'Which micro-topographic hollows and perennial spring lines anchored moist woodland habitats prior to grading?',
    ],
    evidenceAndMethods: [
      'High-resolution Digital Elevation Models (ALOS PALSAR / Cartosat / TanDEM-X) and Survey of India historical contours',
      'Georeferencing of historical forest compartment maps and village cadastral sheets (Shajra Kishtwar)',
      'Differential GNSS field verification of surviving boundary pillars and ridge landmarks',
    ],
    deliverable:
      'Topographic & Micro-Watershed Baseline Atlas of Original City National Park.',
    methodologicalCaveat:
      'Datum shifts between historical Everest-ellipsoid topographic sheets and WGS84 satellite imagery require sub-metre ground-control registration.',
  },
  {
    number: 22,
    code: '22',
    slug: 'chapter-22-historical-satellite-and-aerial-evidence',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Reconstructing the lost landscape',
    title: 'Historical Satellite and Aerial Evidence',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Executes the nine-period remote-sensing observation protocol (1960–1972 through 2021–2026) defined in Part VIII Section 16.',
      'Produces radiometrically harmonized image stacks capturing pre-notification woodland, the 1993–1997 pre-clearing baseline, 1998–2001 earthmoving, and twenty-five years of post-construction vegetation change.',
    ],
    investigativeQuestions: [
      'What exact seasonal window between 1998 and 2001 shows peak canopy removal and fairway earthworks in archival satellite scenes?',
      'How much mature canopy existed within the Royal Springs footprint in 1997 compared with open scrub or pre-existing clearings?',
      'What secondary land-cover changes occurred across the broader park perimeter during 2006–2026?',
    ],
    evidenceAndMethods: [
      'Declassified CORONA photography (1960–1972), Landsat 1–9 archive (1972–2026), IRS-1C/1D PAN (5.8 m, 1997–2001), and Sentinel-2 (2015–2026)',
      'Commercial VHR archival scenes (IKONOS / QuickBird / WorldView, 2000–2026)',
      'Phenology-matched summer and autumn surface-reflectance compositing to avoid seasonal grass/deciduous confusion',
    ],
    deliverable:
      'Nine-Epoch Georeferenced Remote-Sensing Time-Series Atlas (1960–2026).',
    methodologicalCaveat:
      'Shadowing along steep north-west Zabarwan slopes requires topographic illumination correction before spectral change detection.',
  },
  {
    number: 23,
    code: '23',
    slug: 'chapter-23-the-mathematics-of-land-conversion',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Reconstructing the lost landscape',
    title: 'The Mathematics of Land Conversion',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Quantifies with sub-hectare precision the physical land-cover transition inside the Royal Springs perimeter: irrigated tees, greens, and fairways, engineered ponds, clubhouses, service roads, parking, and retained wooded roughs.',
      'Tests the 121.4 ha (~300 acres) advertised area against planimetric versus slope-surface area measurements.',
    ],
    investigativeQuestions: [
      'What is the exact planimetric hectare area enclosed within the physical perimeter wall/fence of Royal Springs Golf Course today?',
      'Within that perimeter, what exact proportions are occupied by intensively managed turf, impervious built structures, water bodies, and remnant or planted tree cover?',
      'Does part of the discrepancy between 121.4 ha and 162 ha arise from ancillary roads, buffer zones, or slope-versus-planimetric measurement conventions?',
    ],
    evidenceAndMethods: [
      'Sub-metre object-based image classification on 2024–2026 VHR optical scenes',
      'Planimetric versus 3D surface-area computation across sloping Zabarwan terrain',
      'Cross-validation against Srinagar municipal/tourism facility perimeter maps',
    ],
    deliverable:
      'High-Resolution Land-Cover Partition Ledger of the Golf Course Perimeter.',
    methodologicalCaveat:
      'Canopy overhang in nadir satellite imagery can obscure paved cart paths and manicured understories unless paired with leaf-off scenes.',
  },
  {
    number: 24,
    code: '24',
    slug: 'chapter-24-reconciling-the-conflicting-area-figures',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Reconstructing the lost landscape',
    title: 'Reconciling the Conflicting Area Figures',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Resolves the arithmetic puzzle across all six historical establishment figures (9.07 km², 9.00 km², 8.85 km², 8.69 km²) and the three conversion figures (162 ha denotified, 121.4 ha advertised golf course, 40.6 ha unexplained gap).',
      'Maps every revenue Khasra and forest compartment number to explain where each square kilometre figure originated.',
    ],
    investigativeQuestions: [
      'Does the difference between 907 ha and 885 ha (22 ha) reflect an earlier road/settlement exclusion or rounding from kanal/acre units?',
      'Which specific parcels account for the 40.6-hectare gap between the 162 ha reported denotification and the 121.4 ha advertised golf course?',
      'How does the 869 ha figure in recent ornithological literature relate to the 885 ha NBWL baseline?',
    ],
    evidenceAndMethods: [
      'Unit-conversion audit across traditional Kashmir revenue units (kanals and marlas), acres, hectares, and square kilometres',
      'Parcel-level GIS overlay of revenue Khasra polygons, forest compartments, and institutional compound walls',
      'Error-propagation and datum/projection comparison across published maps',
    ],
    deliverable:
      'Definitive Multi-Source Area Reconciliation Table & Parcel Concordance.',
    methodologicalCaveat:
      'Traditional kanal-to-hectare conversions must verify standard 20-marla / 8-kanal-per-acre revenue conventions used in Srinagar settlement records.',
  },
  {
    number: 25,
    code: '25',
    slug: 'chapter-25-forest-cover-transformation',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Reconstructing the lost landscape',
    title: 'Forest-Cover Transformation',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Tests competing historical claims regarding tree felling (thousands vs. >10,000 trees vs. official denials) using forensic remote sensing, canopy-crown delineation, and forest felling/disposal registers.',
      'Evaluates biomass and ecosystem carbon stock changes alongside post-2001 ornamental and native tree plantings.',
    ],
    investigativeQuestions: [
      'How many hectares of closed and open woodland canopy were physically cleared during 1998–2001 according to multi-temporal satellite evidence?',
      'What do official Forest/Wildlife Department tree-enumeration lists and State Forest Corporation timber-disposal records show?',
      'To what extent have post-2001 tree plantings restored structural canopy complexity, native species composition, and aboveground carbon?',
    ],
    evidenceAndMethods: [
      '1997 vs. 2001 panchromatic/multispectral canopy-loss detection and crown-density estimation',
      'Forest Department felling permissions, hammer-mark registers, and timber auction/disposal accounts',
      'GEDI LiDAR canopy-height profiles and allometric aboveground carbon stock modelling',
    ],
    deliverable:
      'Forensic Canopy-Loss, Timber-Record & Aboveground Carbon Balance Assessment.',
    methodologicalCaveat:
      'Satellite crown-area loss estimates cannot yield an exact stem count of small understory trees without ground enumeration registers.',
  },
  {
    number: 26,
    code: '26',
    slug: 'chapter-26-the-remaining-723-hectares-a-geographical-investigation',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Reconstructing the lost landscape',
    title: 'The Remaining 723 Hectares: A Geographical Investigation',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Executes the core geographical investigation identified in Part II Section 3: tracing the physical condition, legal custody, accessibility, and land-use integrity of the ~723 hectares (81.7% of the 885 ha baseline) outside the reported 162 ha denotification.',
      'Produces the seven-layer forensic map distinguishing surviving statutory parkland, remnant natural woodland, other institutional developments, and parcels of unresolved legal status.',
    ],
    investigativeQuestions: [
      'Where exactly on the Zabarwan slopes do the remaining ~723 hectares lie, and are they contiguous or split into isolated pockets?',
      'How much of the 723-hectare remainder retains intact native woodland or scrub habitat in 2026?',
      'Have any additional government buildings, hospitality facilities, security enclosures, or private encroachments entered the non-golf remainder since 1998?',
    ],
    evidenceAndMethods: [
      'Seven-layer GIS superposition (Part VIII Section 17 protocol) across the full Zabarwan foothill belt',
      'Parcel-by-parcel encumbrance and custodian audit across Wildlife, Forest, Tourism, Estate, and Municipal records',
      'Field verification of public/researcher access gates, boundary pillars, and active wildlife patrolling',
    ],
    deliverable:
      'Seven-Layer Forensic Status Map & Custody Ledger of the 723-Hectare Remainder.',
    methodologicalCaveat:
      'Security-restricted zones along Gupkar and Zabarwan spurs must be mapped strictly from lawful public satellite archives and official cadastral records.',
  },
  {
    number: 27,
    code: '27',
    slug: 'chapter-27-habitat-fragmentation-and-ecological-connectivity',
    volumeNumber: 4,
    volumeRoman: 'IV',
    volumeTitle: 'Reconstructing the lost landscape',
    title: 'Habitat Fragmentation and Ecological Connectivity',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Quantifies structural and functional landscape fragmentation across the Zabarwan–Shankaracharya–Dal Lake–Dachigam ecological complex before and after perimeter fencing and fairway grading.',
      'Models least-cost and circuit-theory wildlife movement pathways for medium-to-large mammals and understory forest birds.',
    ],
    investigativeQuestions: [
      'How did perimeter walling, fencing, road widening, and open turf expanses alter patch cohesion, edge density, and core-habitat ratios?',
      'Which remaining foothill gullies and wooded ridges still connect Shankaracharya Reserve, the 723 ha remainder, and Lower Dachigam?',
      'Where do hard barriers create wildlife roadkill or human–wildlife conflict pinch-points along Boulevard and Gupkar–Nishat roads?',
    ],
    evidenceAndMethods: [
      'FRAGSTATS landscape-metric time series (core area, edge contrast, effective mesh size) for 1995, 2002, and 2026',
      'Omniscape / Circuitscape multi-guild resistance-surface connectivity modelling',
      'Cross-linkage with KEW Human-Wildlife Conflict incidents along the Zabarwan–Brein–Nishat foothill interface',
    ],
    deliverable:
      'Zabarwan–Shankaracharya–Dachigam Ecological Connectivity & Pinch-Point Atlas.',
    methodologicalCaveat:
      'Resistance-surface weights must be parameterized with empirical camera-trap and telemetry data rather than expert opinion alone.',
  },

  // ── VOLUME V: THE BIOLOGICAL CONSEQUENCES (28–34) ─────────────────────────
  {
    number: 28,
    code: '28',
    slug: 'chapter-28-the-birds-of-the-former-national-park',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'The biological consequences',
    title: 'The Birds of the Former National Park',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Investigates historical avian diversity, breeding guilds, and winter altitudinal migrants recorded in City Forest (Sálim Ali) National Park prior to 1998 and compares them against contemporary turf-and-woodland assemblages.',
      'Links Monograph 09 directly to Monograph 04 (The Sky Has No Borders) by testing how replacing multi-layered native understory with mowed fairways altered specialist insectivores, pheasants, cavity nesters, and ground-foraging thrushes.',
    ],
    investigativeQuestions: [
      'Which resident breeding birds and winter altitudinal migrants from Upper/Lower Dachigam were reliably documented inside the park prior to conversion?',
      'How do species richness, functional guild composition, and nesting success on managed golf roughs compare with adjacent ungraded Zabarwan woodland?',
      'Which generalist edge-adapted species increased after turf conversion, and which understory or cavity-nesting specialists declined?',
    ],
    evidenceAndMethods: [
      'Historical ornithological checklists, BNHS/WII archive records, and University of Kashmir avian theses',
      'Standardized multi-season point-count, territory-mapping, and acoustic ARU surveys across golf turf, roughs, and intact Zabarwan controls',
      'Taxonomic and guild reconciliation synchronized with the KEW Western Himalayan Avian Intelligence Observatory',
    ],
    deliverable:
      'Comparative Historical-versus-Contemporary Avian Guild & Breeding Occupancy Dossier.',
    methodologicalCaveat:
      'Historical bird lists lacking standardized observer-effort metadata must be compared via occupancy and guild-proportion models rather than raw counts.',
  },
  {
    number: 29,
    code: '29',
    slug: 'chapter-29-mammalian-biodiversity-and-habitat-displacement',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'The biological consequences',
    title: 'Mammalian Biodiversity and Habitat Displacement',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Examines historical occupancy and seasonal foothill use by Himalayan Black Bear, Common Leopard, Hangul winter stragglers, Yellow-throated Marten, Golden Jackal, Indian Crested Porcupine, and small mammals.',
      'Evaluates whether habitat excision and perimeter fencing displaced mammalian movement into neighbouring Brein, Nishat, Gupkar, and Chashma Shahi residential interfaces.',
    ],
    investigativeQuestions: [
      'What mammalian sightings, winter browse use, and wildlife beat records existed for City Forest prior to 1998?',
      'Do meso-carnivores or ungulates still traverse wooded roughs or perimeter gullies of the former park nocturnally?',
      'Did post-1999 human–wildlife conflict incidents along eastern Srinagar foothills shift spatially following perimeter walling?',
    ],
    evidenceAndMethods: [
      'Department of Wildlife Protection beat registers, rescue logs, and pre-1998 management notes',
      'Non-invasive camera-trap and scat/sign transects across surviving Zabarwan foothill parcels',
      'Spatiotemporal correlation with KEW Human-Wildlife Conflict incident archives in Srinagar District',
    ],
    deliverable:
      'Mammalian Occupancy, Foothill Displacement & Conflict-Interface Assessment.',
    methodologicalCaveat:
      'Rising post-2000 bear and leopard conflict reports across Kashmir reflect multiple valley-wide drivers including orchard expansion and reporting rates, requiring careful spatial controls.',
  },
  {
    number: 30,
    code: '30',
    slug: 'chapter-30-the-snow-leopard-conservation-facility',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'The biological consequences',
    title: 'The Snow Leopard Conservation Facility',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Conducts a dedicated archival inquiry into the captive snow leopard and proposed conservation-breeding facility documented in the Kalpavriksh Papers (Milli Archives Foundation) as having been affected during golf course construction.',
      'Traces official Central Zoo Authority correspondence, J&K Wildlife Protection relocation orders, veterinary records, and institutional plans for high-altitude carnivore conservation in Srinagar.',
    ],
    investigativeQuestions: [
      'What captive wildlife enclosures or snow leopard breeding infrastructure existed or were planned within Sálim Ali National Park prior to 1998?',
      'Under what veterinary supervision, statutory authorization, and timeline were captive animals relocated when golf course construction began?',
      'What happened to the relocated individual(s) and the broader ex-situ snow leopard breeding programme envisaged for Jammu and Kashmir?',
    ],
    evidenceAndMethods: [
      'Kalpavriksh Papers correspondence (Top Container 672, Milli Archives Foundation) and July 1999 Protected Area Update bulletins',
      'Central Zoo Authority (CZA) recognition, inspection, and animal-transfer files (1990–2005)',
      'J&K Department of Wildlife Protection captive-facility and veterinary transfer registers',
    ],
    deliverable:
      'Archival Verification Report on Captive Wildlife Relocation & the Snow Leopard Facility.',
    methodologicalCaveat:
      'Archival letters raising alarm over relocation must be paired with official veterinary and CZA transfer logs to establish final animal outcomes.',
  },
  {
    number: 31,
    code: '31',
    slug: 'chapter-31-native-vegetation-and-ecological-succession',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'The biological consequences',
    title: 'Native Vegetation and Ecological Succession',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Contrasts naturally regenerating Zabarwan foothill plant communities—Parrotiopsis jacquemontiana scrub, Celtis australis, Ulmus wallichiana, Pinus wallichiana, Prunus, Crataegus, Rosa, and native herbaceous ground flora—against irrigated turfgrass monocultures and ornamental landscaping.',
      'Evaluates how continuous mowing, herbicide selection, and thatch management arrest natural ecological succession.',
    ],
    investigativeQuestions: [
      'Which native Zabarwan tree, shrub, and spring-ephemeral herb species survive within unmowed roughs of the golf course versus the 723-hectare remainder?',
      'What ratio of post-2001 woody plantings comprises native local-ecotype taxa versus exotic ornamental cultivars?',
      'Have invasive alien plant species colonized graded earthworks and disturbed perimeter margins?',
    ],
    evidenceAndMethods: [
      'Phytosociological quadrat surveys stratified across managed fairways, wooded roughs, perimeter fences, and intact Zabarwan slopes',
      'Comparison with historical KASH Herbarium voucher specimens collected from Chashma Shahi and City Forest',
      'Seed-bank viability and natural seedling-recruitment assays',
    ],
    deliverable:
      'Floristic Composition, Native-to-Exotic Ratio & Succession Arrest Inventory.',
    methodologicalCaveat:
      'Pre-1986 colonial and post-independence afforestation (such as Robinia pseudoacacia) already modified parts of the Zabarwan foothills prior to golf development.',
  },
  {
    number: 32,
    code: '32',
    slug: 'chapter-32-the-invisible-loss-of-soil-biodiversity',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'The biological consequences',
    title: 'The Invisible Loss of Soil Biodiversity',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Investigates belowground ecological transformation caused by topsoil stripping, fairway cut-and-fill grading, sand-rootzone construction on greens, roller compaction, and synthetic fertilizer/fungicide applications.',
      'Compares soil organic carbon horizons, arbuscular and ectomycorrhizal fungi, soil microarthropods, nematodes, and earthworm guilds against undisturbed Zabarwan forest soils.',
    ],
    investigativeQuestions: [
      'How do soil bulk density, infiltration capacity, and organic carbon profiles on graded fairways and greens differ from undisturbed forest soils?',
      'Has repeated fungicide and synthetic nitrogen application suppressed mycorrhizal networks and decomposer food webs?',
      'Over what multi-decadal timescale could compacted or chemically altered rootzones recover native soil biological function if rewilded?',
    ],
    evidenceAndMethods: [
      'Paired pedological core sampling across greens, fairways, roughs, and native Zabarwan reference stands',
      'Environmental DNA (eDNA) metabarcoding of soil bacterial, fungal, and microfaunal communities',
      'Saturated hydraulic conductivity and soil aggregate stability laboratory testing',
    ],
    deliverable:
      'Comparative Belowground Biodiversity, Compaction & Soil Health Benchmark.',
    methodologicalCaveat:
      'Natural lithological variation across Zabarwan colluvial fans requires pairing soil cores by slope position and parent material.',
  },
  {
    number: 33,
    code: '33',
    slug: 'chapter-33-pollinators-butterflies-and-insect-communities',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'The biological consequences',
    title: 'Pollinators, Butterflies and Insect Communities',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Assesses how replacing diverse seasonal foothill wildflowers and shrub understories with close-mown turf—potentially treated with turfgrass insecticides and broadleaf herbicides—affects native bees, hoverflies, butterflies, moths, and ground beetles.',
      'Evaluates trophic ripple effects on insectivorous Zabarwan birds and bats.',
    ],
    investigativeQuestions: [
      'How do butterfly larval host-plant availability and wild bee floral-resource curves differ between managed golf landscapes and adjacent native scrub?',
      'Are systemic or contact turf insecticides detectable in floral nectar, pollen, or dew along fairway margins?',
      'Can out-of-play golf roughs be retrofitted into pesticide-free native pollinator meadows under Scenario A/B remediation?',
    ],
    evidenceAndMethods: [
      'Standardized April–October Pollard butterfly transects, pan-trap/net pollinator sampling, and nocturnal moth light-trapping',
      'Floral resource phenology mapping and multi-residue LC-MS/MS pesticide screening of vegetation margins',
      'Integration with KEW Pollinator Activity & Phenology datasets',
    ],
    deliverable:
      'Zabarwan Foothill Pollinator, Lepidoptera & Agrochemical Exposure Assessment.',
    methodologicalCaveat:
      'Inter-annual spring temperature and precipitation anomalies strongly influence insect emergence and require matched simultaneous control transects.',
  },
  {
    number: 34,
    code: '34',
    slug: 'chapter-34-the-contemporary-ecological-inventory',
    volumeNumber: 5,
    volumeRoman: 'V',
    volumeTitle: 'The biological consequences',
    title: 'The Contemporary Ecological Inventory',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Synthesizes all nine biological group investigations (Part V Section 10) into a rigorous, bias-free 2026 biodiversity inventory covering both the Royal Springs Golf Course and the ~723-hectare park remainder.',
      'Documents fairly whatever genuine secondary habitat value mature trees and ponds on the golf course currently provide while measuring net ecological divergence from a natural protected habitat.',
    ],
    investigativeQuestions: [
      'What verified native flora and fauna persist within the golf course perimeter and across the 723-hectare remainder in 2026?',
      'Which IUCN threatened or Himalayan endemic species still utilize any portion of the original gazetted area?',
      'Where do high-conservation-value microhabitats survive that warrant immediate statutory protection?',
    ],
    evidenceAndMethods: [
      'Four-season multi-taxa Rapid Biodiversity Assessment across all nine biological groups (birds, mammals, amphibians, reptiles, butterflies, pollinators, soil biota, aquatic biota, native plants)',
      'Darwin Core voucher archiving integrated with KEW Species Intelligence',
      'Composite Ecological Integrity Index scoring managed turf, wooded roughs, and undisturbed foothill reference plots',
    ],
    deliverable:
      '2026 Multi-Taxa Ecological Baseline & High-Conservation-Value Microhabitat Map.',
    methodologicalCaveat:
      'Site access inside managed golf perimeters requires formal institutional cooperation and transparent joint-observation protocols.',
  },

  // ── VOLUME VI: THE GOLF COURSE AND DAL LAKE (35–42) ───────────────────────
  {
    number: 35,
    code: '35',
    slug: 'chapter-35-the-hydrological-geography-of-the-golf-course',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The golf course and Dal Lake',
    title: 'The Hydrological Geography of the Golf Course',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Maps the precise surface and shallow-subsurface hydrological position of Royal Springs Golf Course upslope of the eastern Dal Lake basin.',
      'Reconstructs natural pre-1998 ephemeral nallahs, infiltration fans, and spring lines alongside engineered French drains, retention ponds, culverts, and roadside stormwater outfalls.',
    ],
    investigativeQuestions: [
      'Through which exact culverts, storm drains, or shallow aquifers does runoff from the golf course move downslope toward Boulevard Road and Dal Lake?',
      'How did fairway grading and impervious cart/service infrastructure alter peak storm runoff coefficients?',
      'Do golf-course water hazards operate as closed recirculation basins or overflow into Dal Lake tributaries during snowmelt and monsoon storms?',
    ],
    evidenceAndMethods: [
      'LiDAR/DEM micro-catchment flow-accumulation routing and culvert outfall mapping along Boulevard Road',
      'Engineering review of Royal Springs stormwater and subsurface tile-drainage schematics',
      'Conservative hydrological tracer and storm-event discharge gauging',
    ],
    deliverable:
      'Verified Foothill-to-Dal-Lake Drainage Pathway & Outfall Connectivity Map.',
    methodologicalCaveat:
      'Conceptual upslope proximity does not prove direct pollutant delivery; physical culvert and piezometric connectivity must be field-verified.',
  },
  {
    number: 36,
    code: '36',
    slug: 'chapter-36-the-mathematics-of-irrigation-demand',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The golf course and Dal Lake',
    title: 'The Mathematics of Irrigation Demand',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Replaces illustrative water-demand scenarios (such as the 60 ha · 400 mm net · 75% efficiency = 320 million litres / 0.88 MLD baseline) with an empirical water-accounting audit across all eight components in Part VI Section 12.',
      'Computes monthly Penman–Monteith turfgrass evapotranspiration against Srinagar precipitation and metered sprinkler deliveries.',
    ],
    investigativeQuestions: [
      'What is the exact metered area of irrigated greens, tees, fairways, and roughs within Royal Springs Golf Course?',
      'What actual seasonal and peak summer daily water volumes (in MLD and cubic metres) are pumped into the automated sprinkler network?',
      'How much delivered irrigation water is lost to evaporation, leakage, or deep percolation?',
    ],
    evidenceAndMethods: [
      'IMD Srinagar daily meteorological records for FAO-56 Penman–Monteith turf evapotranspiration modelling',
      'Pump-house flowmeter logs, electricity consumption bills, and automated sprinkler controller schedules',
      'Sentinel-2/Landsat 9 thermal evapotranspiration validation over irrigated fairways',
    ],
    deliverable:
      'Empirical Monthly & Annual Turfgrass Irrigation Water Balance.',
    methodologicalCaveat:
      'Until actual pump-house flowmeter records are disclosed, modeled figures must be clearly labeled as agronomic demand estimates.',
  },
  {
    number: 37,
    code: '37',
    slug: 'chapter-37-springs-groundwater-and-water-abstraction',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The golf course and Dal Lake',
    title: 'Springs, Groundwater and Water Abstraction',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Investigates the exact water sources supplying the golf course—Zabarwan foothill springs, borewells, Dal Lake / Dachigam canal diversions, or municipal supply—and audits statutory abstraction permits.',
      'Examines whether dry-season pumping affects historic heritage springs (including the Chashma Shahi spring zone), local drinking-water supplies, or baseflow entering Dal Lake.',
    ],
    investigativeQuestions: [
      'Which surface intakes, natural springs, or groundwater tube wells supply Royal Springs Golf Course, and under what sanctioned water permits?',
      'Has seasonal groundwater or spring discharge in the Chashma Shahi–Brein foothill belt changed over 2001–2026?',
      'Does summer peak irrigation compete with domestic drinking-water supply or ecological baseflows?',
    ],
    evidenceAndMethods: [
      'Jal Shakti / PHE and Ground Water Department abstraction authorizations and borewell logs',
      'Piezometric water-level monitoring and stable-isotope (δ18O, δ2H) spring-source fingerprinting',
      'Historical discharge comparison across Zabarwan foothill springs catalogued in KEW Water Systems',
    ],
    deliverable:
      'Water Source Provenance, Permit Compliance & Foothill Spring Impact Audit.',
    methodologicalCaveat:
      'Multi-decadal spring discharge shifts also reflect winter snowpack decline across the Zabarwan Range and must be separated from local pumping effects.',
  },
  {
    number: 38,
    code: '38',
    slug: 'chapter-38-nitrogen-and-phosphorus-application',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The golf course and Dal Lake',
    title: 'Nitrogen and Phosphorus Application',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Audits multi-year fertilizer procurement and application registers to establish actual elemental nitrogen (N) and phosphorus (P) mass balances across greens, tees, and fairways, moving beyond the illustrative 6.00 t N / 0.90 t P scenario in Part VI Section 13.',
      'Evaluates soil P saturation, foliar uptake efficiency, and denitrification/leaching fractions.',
    ],
    investigativeQuestions: [
      'How many tonnes of elemental nitrogen and phosphorus are applied annually across Royal Springs greens, tees, and fairways?',
      'Are slow-release, soil-test-guided, or zero-phosphorus turf protocols currently practiced?',
      'How much applied P has accumulated in sandy green rootzones and fairway topsoils after twenty-five years of management?',
    ],
    evidenceAndMethods: [
      'Annual agrochemical tender, procurement, stock, and greenkeeper application registers (2001–2026)',
      'Mehlich-3 / Olsen extractable soil phosphorus and nitrate/ammonium profile cores',
      'Turfgrass clipping nutrient-removal mass-balance accounting',
    ],
    deliverable:
      'Empirical Elemental Nitrogen & Phosphorus Mass-Balance Ledger.',
    methodologicalCaveat:
      'Gross fertilizer procurement must be reconciled with closing inventory stocks and actual treated hectareage.',
  },
  {
    number: 39,
    code: '39',
    slug: 'chapter-39-pesticides-herbicides-and-fungicides',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The golf course and Dal Lake',
    title: 'Pesticides, Herbicides and Fungicides',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Directly addresses the question that caused the Standing Committee of the Indian Board for Wildlife to defer denotification on May 6, 2003: what chemical pesticides, herbicides, and snow-mould/turf fungicides are applied on the golf course?',
      'Evaluates environmental persistence (DT50), soil sorption (Koc), aquatic ecotoxicity, and regulatory status of every active ingredient used.',
    ],
    investigativeQuestions: [
      'Which active ingredients (fungicides, selective herbicides, insecticides, wetting agents) have been procured and applied since 2001?',
      'Are persistent or high-aquatic-toxicity compounds applied prior to spring snowmelt or heavy monsoon rain events?',
      'What integrated pest management (IPM), buffer-zone, and applicator-safety protocols are enforced on site?',
    ],
    evidenceAndMethods: [
      'Procurement invoices, store ledgers, and spray-log registers from Royal Springs management',
      'Ecotoxicological hazard screening (aquatic LC50/EC50, avian toxicity, groundwater ubiquity score)',
      'Multi-residue chromatographic screening of pond sediments and outfall water samples',
    ],
    deliverable:
      'Active-Ingredient Inventory & Aquatic/Avian Ecotoxicological Risk Screening.',
    methodologicalCaveat:
      'Detection of ubiquitous urban pesticides in downstream drains requires compound-specific turf-fungicide markers to attribute provenance accurately.',
  },
  {
    number: 40,
    code: '40',
    slug: 'chapter-40-surface-runoff-and-subsurface-transport',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The golf course and Dal Lake',
    title: 'Surface Runoff and Subsurface Transport',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Measures event-based stormwater runoff and shallow subsurface leachate transport from fertilized and chemically treated turf zones across snowmelt, spring rain, summer irrigation, and autumn storm regimes.',
      'Quantifies nutrient and pesticide attenuation across retention ponds, wooded roughs, and downslope soils.',
    ],
    investigativeQuestions: [
      'What concentrations and event-mean loads of dissolved reactive phosphorus, nitrate, ammonium, and turf fungicides exit golf-course drainage outfalls during storm events?',
      'Do sandy putting-green underdrains create rapid preferential flow bypasses toward surface channels?',
      'How effectively do existing on-course ponds attenuate or release nutrients seasonally?',
    ],
    evidenceAndMethods: [
      'Automated storm-event autosamplers and flow weirs at inflow and outflow boundary points',
      'Suction lysimeter and shallow piezometer sampling down-gradient of greens and fairways',
      'SWAT+ / HYDRUS-2D coupled vadose-zone and catchment transport modelling',
    ],
    deliverable:
      'Empirical Storm-Event & Baseflow Nutrient/Chemical Export Coefficients.',
    methodologicalCaveat:
      'Up-gradient spring and atmospheric background concentrations must be subtracted via paired inflow–outfall mass-balance gauging.',
  },
  {
    number: 41,
    code: '41',
    slug: 'chapter-41-the-potential-contribution-to-dal-lake-pollution',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The golf course and Dal Lake',
    title: 'The Potential Contribution to Dal Lake Pollution',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Contextualizes empirically measured nutrient and chemical exports from the golf course within the total external nutrient budget of Dal Lake alongside municipal sewage, houseboats, floating gardens, and catchment agriculture.',
      'Maintains strict scientific proportionality—neither exaggerating the golf course’s share relative to untreated urban sewage nor excusing preventable nutrient inputs from a public recreational facility in an already eutrophic lake basin.',
    ],
    investigativeQuestions: [
      'What percentage of eastern Dal Lake sub-basin external N and P loading originates from the Royal Springs sub-catchment?',
      'Do localized drainage outfalls influence nearshore macrophyte proliferation or algal blooms along the eastern Boulevard littoral zone?',
      'How does the marginal cost of eliminating golf-course nutrient runoff compare with public expenditure on Dal Lake deweeding and sewage treatment?',
    ],
    evidenceAndMethods: [
      'Sub-basin nutrient budget integration with KEW Dal Lake Conservation Performance and Algal Bloom Intelligence datasets',
      'Dual nitrate isotope (δ15N-NO3, δ18O-NO3) source apportionment separating synthetic fertilizer from domestic sewage',
      'Nearshore littoral water-quality, sediment-P, and chlorophyll-a transects along eastern Dal Lake',
    ],
    deliverable:
      'Proportional Sub-Basin Nutrient Attribution & Cost-Effectiveness Assessment for Dal Lake.',
    methodologicalCaveat:
      'Domestic wastewater remains the dominant nutrient driver in Dal Lake; isotopic and outfall-specific evidence is essential before attributing any nearshore bloom signal.',
  },
  {
    number: 42,
    code: '42',
    slug: 'chapter-42-the-wildlife-boards-unresolved-water-quality-questions',
    volumeNumber: 6,
    volumeRoman: 'VI',
    volumeTitle: 'The golf course and Dal Lake',
    title: "The Wildlife Board's Unresolved Water-Quality Questions",
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Follows the specific documentary trail from the April 6, 2005 NBWL proceedings—where the Ministry identified the CSIR regional laboratory in Jammu (now CSIR-IIIM) to monitor effluent discharges affecting wildlife habitats and Dal Lake, pending Chief Wildlife Warden comments.',
      'Establishes whether CSIR monitoring was ever commissioned, funded, executed, and disclosed between 2005 and 2026.',
    ],
    investigativeQuestions: [
      'Did the Chief Wildlife Warden submit the comments awaited on April 6, 2005, and was CSIR Jammu formally commissioned to monitor golf-course effluents?',
      'If CSIR or J&K Pollution Control Committee sampling was conducted after 2005, what parameters were tested and what did the analytical reports find?',
      'If independent monitoring was never operationalized, why did a safeguard discussed by the statutory National Board for Wildlife remain unimplemented for two decades?',
    ],
    evidenceAndMethods: [
      'Archival records and Right to Information requests to MoEFCC, CSIR-IIIM Jammu, J&K Pollution Control Committee, and J&K Wildlife Protection Department',
      'Review of post-2005 Dal Lake Lake Conservation and Management Authority (LCMA) monitoring station rosters',
      'Design of a modern open-data continuous water-quality protocol fulfilling the 2005 NBWL mandate',
    ],
    deliverable:
      '2005–2026 Audit of the CSIR Jammu / NBWL Effluent-Monitoring Mandate.',
    methodologicalCaveat:
      'Absence of published CSIR reports in online portals requires formal archival confirmation from CSIR-IIIM Jammu and MoEFCC wildlife division files.',
  },

  // ── VOLUME VII: THE FINANCIAL BALANCE SHEET (43–49) ───────────────────────
  {
    number: 43,
    code: '43',
    slug: 'chapter-43-original-project-expenditure',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'The financial balance sheet',
    title: 'Original Project Expenditure',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Audits the initial capital cost of constructing Royal Springs Golf Course from 1998 to completion, comparing original DPR cost estimates against audited capital expenditure, design consultancy fees, civil earthworks, clubhouse construction, and imported irrigation/turf equipment.',
      'Adjusts historical outlays into constant 2026 rupees to establish true public capital commitment.',
    ],
    investigativeQuestions: [
      'What was the originally sanctioned capital cost in 1998, and what was the final audited completion expenditure?',
      'How much foreign exchange and public capital went toward international architectural fees, imported turfgrass seed/sod, sprinkler networks, and specialized mowers?',
      'Were any land-value or compensatory conservation charges transferred to the Wildlife Protection Department when park land was utilized?',
    ],
    evidenceAndMethods: [
      'Detailed Project Report estimates, Finance Department capital-release orders, and Accountant General / CAG audit paragraphs (1998–2005)',
      'Foreign-procurement and customs/tender ledgers for irrigation and turf machinery',
      'Constant-price GDP deflator normalization to 2026 fiscal values',
    ],
    deliverable:
      'Audited Capital Outlay & Cost-Escalation Reconstruction (1998–2002).',
    methodologicalCaveat:
      'Multi-departmental capital spending split across Tourism, R&B, PHE, and Power Development requires consolidated cross-head accounting.',
  },
  {
    number: 44,
    code: '44',
    slug: 'chapter-44-twenty-five-years-of-maintenance',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'The financial balance sheet',
    title: 'Twenty-Five Years of Maintenance',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Reconstructs twenty-five years (2001–2026) of recurring operational and capital-replacement expenditure required to maintain international playing standards across a Himalayan winter-and-summer climate.',
      'Itemizes staffing, pumping electricity, agrochemicals, sand topdressing, imported mower fleet renewals, snow-damage repair, and clubhouse upkeep.',
    ],
    investigativeQuestions: [
      'What has been the cumulative inflation-adjusted operating and maintenance expenditure of Royal Springs Golf Course from 2001 through 2026?',
      'What share of annual operating expenditure is consumed by irrigation energy, chemical inputs, and specialized turf machinery maintenance?',
      'How many permanent, contractual, and seasonal staff positions are sustained by course operations?',
    ],
    evidenceAndMethods: [
      'Annual financial statements and budget books of the Royal Springs Golf Course governing body / Tourism Department (2001–2026)',
      'Power Development Department electricity billing and agrochemical/machinery procurement ledgers',
      'Payroll and employment category verification',
    ],
    deliverable:
      'Twenty-Five-Year Recurring Operational & Maintenance Cost Ledger (2001–2026).',
    methodologicalCaveat:
      'Unbilled or cross-subsidized utility supplies (electricity or water) from sister government departments must be imputed transparently if not booked directly.',
  },
  {
    number: 45,
    code: '45',
    slug: 'chapter-45-tourism-revenue-and-recreational-benefits',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'The financial balance sheet',
    title: 'Tourism Revenue and Recreational Benefits',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Documents fairly and comprehensively all direct and indirect economic benefits generated by Royal Springs Golf Course: green fees, membership subscriptions, caddy/staff livelihoods, tournament inflows, hospitality spending, and destination branding.',
      'Distinguishes net incremental tourist arrivals drawn specifically by golf from general Srinagar leisure visitors.',
    ],
    investigativeQuestions: [
      'What direct annual revenues have been collected from memberships, domestic/international green fees, equipment rental, hospitality, and events over 2001–2026?',
      'What proportion of rounds played are by local/official members versus out-of-region golf tourists?',
      'What verifiable employment and caddy/support-worker household incomes depend on the facility today?',
    ],
    evidenceAndMethods: [
      'Audited annual revenue receipts across membership, green-fee, tournament, and catering heads (2001–2026)',
      'Golfer origin logs and tourism multiplier survey distinguishing primary golf travellers from incidental visitors',
      'Livelihood assessment of caddies, groundskeepers, and facility staff',
    ],
    deliverable:
      'Twenty-Five-Year Direct Revenue & Livelihood Benefit Account.',
    methodologicalCaveat:
      'Destination-wide hospitality multipliers must avoid attributing entire Srinagar hotel stays to golf unless primary trip purpose is empirically established.',
  },
  {
    number: 46,
    code: '46',
    slug: 'chapter-46-public-subsidies-and-financial-sustainability',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'The financial balance sheet',
    title: 'Public Subsidies and Financial Sustainability',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Computes the core fiscal equation specified in Part VII Section 15: Net public financial contribution = Public expenditure − Revenue returned to government.',
      'Evaluates whether Royal Springs Golf Course has operated as a net revenue generator for the public exchequer or required sustained budgetary subsidies.',
    ],
    investigativeQuestions: [
      'In how many fiscal years between 2001 and 2026 did operating revenues exceed total operating plus capital-maintenance expenditures?',
      'What is the cumulative 25-year net public financial contribution (positive subsidy or net fiscal return) in nominal and constant 2026 terms?',
      'How do public subsidies per golfer round compare with annual public budget allocations for J&K’s surviving national parks and sanctuaries?',
    ],
    evidenceAndMethods: [
      'J&K Budget Grants, Demands for Grants (Tourism), and CAG/Accountant General audit reports (2001–2026)',
      'Reconciliation of governing-body retained receipts versus treasury remittances',
      'Comparative per-hectare fiscal benchmark against J&K Department of Wildlife Protection conservation budgets',
    ],
    deliverable:
      'Net Public Financial Contribution & Per-Hectare Fiscal Comparison Dossier.',
    methodologicalCaveat:
      'Operating deficits alone would not render a public recreational facility unlawful, just as commercial surpluses would not validate statutory park conversion.',
  },
  {
    number: 47,
    code: '47',
    slug: 'chapter-47-the-public-private-partnership-proposal',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'The financial balance sheet',
    title: 'The Public-Private Partnership Proposal',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Examines the March 2020 reconstitution of the Royal Springs governing body, the March 2023 administrative proposal to outsource operation and maintenance through a Public-Private Partnership (PPP), and subsequent operational reviews through 2026.',
      'Analyzes the legal and ecological implications of granting private commercial concessions over land originally excised from—or adjacent to—a statutory national park.',
    ],
    investigativeQuestions: [
      'What financial performance or maintenance challenges prompted the March 2023 PPP outsourcing proposal?',
      'Did draft PPP feasibility or tender documents disclose PIL No. 115/99, the 2003–2005 NBWL conditions, or statutory land-title encumbrances?',
      'Could a private concessionaire expand hospitality real estate, night lighting, or event intensity along the Zabarwan wildlife interface?',
    ],
    evidenceAndMethods: [
      'March 2020 governing-body reconstitution order, March 2023 PPP transaction advisory / EOI documents, and 2023–2026 administrative review minutes',
      'Legal review of land-lease restrictions on formerly protected or forest-origin state land',
      'Environmental safeguard audit of proposed concession clauses',
    ],
    deliverable:
      'Legal, Fiscal & Environmental Risk Audit of PPP Concession Proposals.',
    methodologicalCaveat:
      'Proposed PPP exploration documents must be distinguished from executed concession agreements unless a final contract is verified.',
  },
  {
    number: 48,
    code: '48',
    slug: 'chapter-48-the-economic-value-of-the-original-ecosystem',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'The financial balance sheet',
    title: 'The Economic Value of the Original Ecosystem',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Applies contemporary UN SEEA Ecosystem Accounting (SEEA-EA) standards to estimate the biophysical and economic regulating, provisioning, and cultural services provided by intact Zabarwan foothill national park woodland.',
      'Quantifies stormwater attenuation above Boulevard Road, sediment retention, Dal Lake nutrient buffering, carbon sequestration, urban microclimate cooling, and low-impact nature education.',
    ],
    investigativeQuestions: [
      'What biophysical volumes of carbon storage, stormwater infiltration, and urban heat-island mitigation did the pre-1998 woodland provide?',
      'What would equivalent engineered stormwater, Dal Lake nutrient-removal, and carbon-offset replacements cost in 2026?',
      'Which ecological and intrinsic biodiversity values resist monetary pricing and must be reported in non-monetary physical units?',
    ],
    evidenceAndMethods: [
      'UN SEEA Ecosystem Accounting physical and replacement-cost valuation framework',
      'Landsat/ECOSTRESS land-surface temperature comparison and InVEST carbon/stormwater/nutrient-retention models',
      'Explicit separation of replacement-cost monetary estimates from non-monetizable intrinsic biodiversity metrics',
    ],
    deliverable:
      'SEEA-Aligned Ecosystem Services Physical & Replacement-Cost Account.',
    methodologicalCaveat:
      'Ecosystem service valuation must never imply that statutory national parks are fungible assets open to buyout whenever a project exceeds replacement-cost estimates.',
  },
  {
    number: 49,
    code: '49',
    slug: 'chapter-49-the-true-cost-of-landscape-transformation',
    volumeNumber: 7,
    volumeRoman: 'VII',
    volumeTitle: 'The financial balance sheet',
    title: 'The True Cost of Landscape Transformation',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Integrates Volumes II through VII into a comprehensive twenty-five-year social, fiscal, hydrological, and ecological balance sheet implementing the eight-row comparison in Part VII Section 14.',
      'Presents side-by-side verified fiscal accounts, livelihood benefits, unpriced biodiversity losses, water/nutrient footprints, and long-term rehabilitation liabilities.',
    ],
    investigativeQuestions: [
      'When public capital, 25-year operating subsidies, water abstraction, Dal Lake catchment risk, and foregone habitat are placed alongside tourism and employment gains, what does the integrated ledger show?',
      'Who bore the ecological and fiscal costs of the conversion, and which groups captured the primary recreational and commercial benefits?',
      'How should public accounting reform treat proposals affecting natural capital in the Western Himalayas?',
    ],
    evidenceAndMethods: [
      'Multi-criteria social–ecological cost-benefit synthesis combining audited fiscal flows with non-monetary biophysical indicators',
      'Distributional incidence analysis across public taxpayers, facility employees, golfers, and Srinagar catchment residents',
      'Sensitivity analysis across optimistic and conservative parameter bounds',
    ],
    deliverable:
      'Integrated Twenty-Five-Year Fiscal & Ecological Balance Sheet of Conversion.',
    methodologicalCaveat:
      'Incommensurable legal and ecological values are presented in a transparent multi-account matrix rather than collapsed into a single speculative rupee figure.',
  },

  // ── VOLUME VIII: THOSE WHO QUESTIONED THE CONVERSION (50–55) ──────────────
  {
    number: 50,
    code: '50',
    slug: 'chapter-50-the-wildlife-officials-who-raised-concerns',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Those who questioned the conversion',
    title: 'The Wildlife Officials Who Raised Concerns',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Documents the institutional objections and technical warnings recorded by wildlife officers—including reported objections by Chief Wildlife Warden Mir Inayet Ullah and subsequent expert site inspection findings by Dr. M. K. Ranjitsinh and Aseem Srivastav.',
      'Examines the administrative pressures faced by civil servants tasked with defending statutory park boundaries against high-priority executive projects.',
    ],
    investigativeQuestions: [
      'What written objections, file notings, or boundary warnings did J&K Wildlife Protection officers submit between 1997 and 2001?',
      'Were wildlife personnel transferred, overruled, or excluded from site access during tree clearing and earthworks?',
      'How did central wildlife inspection members document environmental risks during the 2003 on-site assessment?',
    ],
    evidenceAndMethods: [
      'Protected Area Update (July 1999) archival reports, 2003 IBWL inspection records, and departmental file notings',
      'Structured archival interviews with retired J&K Wildlife Protection officers and central inspection members',
      'Right-of-response verification ensuring accurate attribution of official positions',
    ],
    deliverable:
      'Documented Record of Statutory Wildlife Service Objections & Expert Inspections.',
    methodologicalCaveat:
      'Reported internal objections cited in secondary conservation bulletins must be corroborated with primary file memoranda or firsthand confirmation.',
  },
  {
    number: 51,
    code: '51',
    slug: 'chapter-51-the-lawyers-who-challenged-the-development',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Those who questioned the conversion',
    title: 'The Lawyers Who Challenged the Development',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Chronicles the advocates and legal teams behind PIL No. 115/99 (filed by the Wildlife Protection Society of India in January 1999) and related Supreme Court protected-area interventions.',
      'Analyzes the evidentiary obstacles confronting public-interest litigators when gazettes, project DPRs, and felling orders are held exclusively inside government departments.',
    ],
    investigativeQuestions: [
      'Who drafted, argued, and sustained PIL No. 115/99 before the Jammu & Kashmir High Court during 1999 and subsequent years?',
      'What procedural hurdles, information asymmetries, or security-era courtroom constraints affected the litigation?',
      'How did PIL No. 115/99 intersect with national protected-area litigation before the Supreme Court in 2000–2005?',
    ],
    evidenceAndMethods: [
      'High Court appearance records, pleadings in PIL No. 115/99, and IGNFA environmental law documentation',
      'Wildlife Protection Society of India legal archive and counsel interviews',
      'Cross-linkage with Monograph 07 (Environmental Law) and Monograph 08 (First Mirror: Environmental Jurisprudence)',
    ],
    deliverable:
      'Historical Legal Narrative & Evidentiary Lessons from PIL No. 115/99.',
    methodologicalCaveat:
      'Courtroom arguments by petitioners must be clearly distinguished from adjudicated findings of the bench.',
  },
  {
    number: 52,
    code: '52',
    slug: 'chapter-52-the-journalists-who-documented-the-transformation',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Those who questioned the conversion',
    title: 'The Journalists Who Documented the Transformation',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Recovers contemporary investigative journalism—including Vikram Jit Singh’s February 1999 reporting in The Indian Express and coverage in regional Srinagar and national print media—that brought tree felling and statutory questions into public view.',
      'Examines why sustained follow-up reporting faded after the golf course opened in 2001 even as NBWL objections intensified in 2003–2005.',
    ],
    investigativeQuestions: [
      'What on-site observations, official statements, and photographic evidence did journalists record during the 1998–2001 clearing and construction phase?',
      'How did Srinagar’s English and Urdu press cover the conversion compared with national dailies and conservation journals?',
      'Why did the 2003–2005 NBWL Standing Committee deferrals and Supreme Court submission decision receive limited local media follow-up?',
    ],
    evidenceAndMethods: [
      'Print and microfilm archives of The Indian Express, Srinagar English/Urdu dailies, Sanctuary Asia, and Down To Earth (1998–2006)',
      'Oral-history interviews with environmental and regional correspondents',
      'Content and timeline analysis of media attention cycles before and after project completion',
    ],
    deliverable:
      'Annotated Press Archive & Media-Attention Audit (1998–2026).',
    methodologicalCaveat:
      'Contemporary press figures on felled trees or acreage are treated as historical reporting records requiring independent primary verification.',
  },
  {
    number: 53,
    code: '53',
    slug: 'chapter-53-conservation-organizations-and-historical-correspondence',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Those who questioned the conversion',
    title: 'Conservation Organizations and Historical Correspondence',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Examines the primary correspondence, alerts, and documentation maintained from October 1998 onward by Kalpavriksh, the Wildlife Protection Society of India, Sanctuary Nature Foundation, and regional civil society groups.',
      'Highlights how independent conservation archives preserved crucial leads—from tree-removal allegations to the snow leopard relocation correspondence—across twenty-five years.',
    ],
    investigativeQuestions: [
      'What letters, petitions, and factual dossiers are preserved in Top Container 672 of the Kalpavriksh Papers at the Milli Archives Foundation?',
      'How did national conservation networks coordinate information exchange with observers inside Kashmir during 1998–2005?',
      'Which representations to state and central ministries received official replies, and which went unanswered?',
    ],
    evidenceAndMethods: [
      'Archival inspection of Kalpavriksh Papers (Milli Archives Foundation, Repository 2, Top Container 672)',
      'Protected Area Update issues archived by the Indian Institute of Science (CES/WGBIS)',
      'Correspondence files of WPSI, BNHS, and regional Kashmir conservation groups',
    ],
    deliverable:
      'Catalogued Digest of 1998–2005 Civil-Society Conservation Correspondence.',
    methodologicalCaveat:
      'Allegations recorded in NGO alerts represent contemporaneous whistleblowing leads that must be cross-checked against official records.',
  },
  {
    number: 54,
    code: '54',
    slug: 'chapter-54-scientific-institutions-and-their-documented-responses',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Those who questioned the conversion',
    title: 'Scientific Institutions and Their Documented Responses',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Investigates the documented technical roles of national and regional scientific institutions—including the Wildlife Institute of India, CSIR regional laboratory Jammu, Bombay Natural History Society, and university ecology departments.',
      'Examines whether any formal ecological baseline or impact study was commissioned from regional universities prior to tree clearing.',
    ],
    investigativeQuestions: [
      'Were the University of Kashmir, SKUAST-K, or WII formally consulted to conduct a pre-conversion ecological impact assessment in 1997–1998?',
      'What scientific publications, dissertations, or technical memoranda examined Sálim Ali National Park between 1986 and 2026?',
      'What technical protocols were proposed for CSIR Jammu in 2005 to monitor effluent discharges toward Dal Lake?',
    ],
    evidenceAndMethods: [
      'Bibliometric and thesis-repository search across University of Kashmir, SKUAST-K, WII Dehradun, and CSIR-IIIM Jammu',
      'NBWL Standing Committee minutes of April 6, 2005 and October 4, 2005',
      'Interviews with senior ecologists and limnologists active in Srinagar during 1998–2005',
    ],
    deliverable:
      'Audit of Institutional Scientific Consultation & Published Research Coverage.',
    methodologicalCaveat:
      'Unpublished internal consultancy reports or departmental advisories must be actively solicited before concluding no scientific input occurred.',
  },
  {
    number: 55,
    code: '55',
    slug: 'chapter-55-legislative-debate-and-public-participation',
    volumeNumber: 8,
    volumeRoman: 'VIII',
    volumeTitle: 'Those who questioned the conversion',
    title: 'Legislative Debate and Public Participation',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Searches the official proceedings of the Jammu and Kashmir Legislative Assembly and Legislative Council—as well as Parliamentary questions—to establish what elected representatives asked or resolved regarding Sálim Ali National Park.',
      'Examines whether local communities bordering Chashma Shahi, Brein, Nishat, and Dal Lake were ever consulted on the conversion or subsequent PPP proposals.',
    ],
    investigativeQuestions: [
      'Were starred or unstarred questions, calling-attention motions, or statutory boundary resolutions debated in the J&K Legislature between 1998 and 2006?',
      'Did any Parliamentary questions in New Delhi address NBWL deferrals over Sálim Ali National Park?',
      'Were neighbouring foothill residents, forest graziers, or Dal Lake stakeholders afforded any public hearing prior to conversion?',
    ],
    evidenceAndMethods: [
      'Official verbatim debates and question indexes of the J&K Legislative Assembly and Legislative Council (1998–2018)',
      'Lok Sabha and Rajya Sabha question databases (1998–2026) searching Sálim Ali / City Forest National Park and Royal Springs',
      'Community interviews across Brein, Nishat, and Chashma Shahi wards',
    ],
    deliverable:
      'Legislative Record & Public Consultation Audit (1998–2026).',
    methodologicalCaveat:
      'Gaps in digitized legislative proceedings require physical inspection of printed house journals in the J&K Legislature library.',
  },

  // ── VOLUME IX: KASHMIR'S COLLECTIVE INTROSPECTION (56–62) ─────────────────
  {
    number: 56,
    code: '56',
    slug: 'chapter-56-what-did-we-understand-about-protected-areas-in-1998',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: "Kashmir's collective introspection",
    title: 'What Did We Understand About Protected Areas in 1998?',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Situates the 1998 conversion decision within the intellectual, institutional, and conflict-era context of late-1990s Kashmir, asking how public administration and society understood the distinction between scenic parkland and statutory wildlife conservation.',
      'Avoids anachronistic judgment while establishing what statutory rules and ecological principles were already well known in 1998.',
    ],
    investigativeQuestions: [
      'How were national parks, game reserves, and municipal gardens conceptualized in J&K planning documents during the 1980s and 1990s?',
      'How did armed conflict, administrative centralization, and urgency to revive tourism shape environmental scrutiny in 1998?',
      'Which conservation concepts were already codified in the 1978 J&K Wildlife Protection Act and 1990s Indian judicial precedent?',
    ],
    evidenceAndMethods: [
      '1980s–1990s J&K Five-Year Plan forestry, wildlife, and tourism chapters',
      'Contextual policy history interviews with retired planners, academics, and civil-society elders',
      'Comparative intellectual history linking Monograph 09 with Monograph 08 (South Asia’s Environmental Vanguard)',
    ],
    deliverable:
      'Historical Governance Context Essay on Protected-Area Understanding in Late-1990s Kashmir.',
    methodologicalCaveat:
      'Contextual explanation of 1998 pressures must neither manufacture excuses for statutory noncompliance nor indulge in hindsight condemnation.',
  },
  {
    number: 57,
    code: '57',
    slug: 'chapter-57-when-green-landscapes-are-mistaken-for-conservation',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: "Kashmir's collective introspection",
    title: 'When Green Landscapes Are Mistaken for Conservation',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Analyzes a pervasive cognitive blind spot across Himalayan urban planning: equating manicured lawns, ornamental conifer rows, and irrigated turf with ecological health.',
      'Demonstrates across all nine ecological dimensions (Part V Section 8) why visual greenness cannot substitute for multi-layered native habitat, intact soil food webs, and unfragmented wildlife corridors.',
    ],
    investigativeQuestions: [
      'Why do cosmetic landscaping projects routinely win administrative and public approval even when they replace native scrub, wetlands, or foothill forest?',
      'How do cosmetic beautification budgets across Srinagar compare with funding for native ecological restoration?',
      'What ecological literacy tools can help planners, judges, and citizens distinguish landscaped greenness from functional ecosystems?',
    ],
    evidenceAndMethods: [
      'Discourse and visual analysis of regional urban-beautification, tourism, and smart-city planning dossiers',
      'Empirical comparison of biodiversity, water demand, and chemical inputs across manicured parks versus native Zabarwan plots',
      'Educational synthesis connected to KEW Outdoor Classroom & Curriculum modules',
    ],
    deliverable:
      'Diagnostic Guide Distinguishing Cosmetic Landscaping from Ecological Conservation.',
    methodologicalCaveat:
      'Urban parks and recreational greens serve legitimate civic functions when sited outside statutory wildlife habitats.',
  },
  {
    number: 58,
    code: '58',
    slug: 'chapter-58-environmental-responsibility-across-political-eras',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: "Kashmir's collective introspection",
    title: 'Environmental Responsibility Across Political Eras',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Traces custodial decisions concerning Sálim Ali National Park and Royal Springs Golf Course across successive administrations from 1998 through 2026—showing that protected-area governance transcends any single government or party.',
      'Examines how subsequent administrations handled the 2003–2005 NBWL recommendations, the 723-hectare remainder, the 2020 governing-body reconstitution, and the 2023 PPP proposal.',
    ],
    investigativeQuestions: [
      'How did each successive administration between 1998 and 2026 address unresolved statutory denotification, compliance monitoring, and remaining parkland?',
      'Why do completed landscape conversions acquire institutional inertia across changing political dispensations?',
      'What non-partisan institutional mechanisms can insulate protected-area boundaries from electoral and administrative turnover?',
    ],
    evidenceAndMethods: [
      'Multi-administration policy audit (1998–2002, 2002–2008, 2009–2014, 2015–2018, and 2019–2026 administrative eras)',
      'Comparison of compliance actions on the eight 2003 expert recommendations across successive governments',
      'Guaranteed Right of Response across all relevant institutional eras',
    ],
    deliverable:
      'Non-Partisan Longitudinal Governance Audit Across Administrative Eras (1998–2026).',
    methodologicalCaveat:
      'Maintains strict non-partisan neutrality, evaluating every administration against identical statutory and scientific benchmarks.',
  },
  {
    number: 59,
    code: '59',
    slug: 'chapter-59-the-lessons-for-kashmirs-scientific-community',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: "Kashmir's collective introspection",
    title: "The Lessons for Kashmir's Scientific Community",
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Invites constructive professional reflection among Kashmir’s ecologists, botanists, ornithologists, hydrologists, and university departments, directly echoing the Fourth Mirror of Monograph 08 (South Asia’s Environmental Vanguard) and Monograph 05 (Research Accountability).',
      'Asks why a 900-hectare national park on Srinagar’s doorstep accumulated so few independent peer-reviewed baseline studies before and after conversion.',
    ],
    investigativeQuestions: [
      'Why have distant or iconic landscapes received heavier academic thesis attention than contested protected land within Srinagar itself?',
      'What institutional incentives discourage regional university faculties from conducting forensic ecological baselines on state-sponsored projects?',
      'How can academic departments establish rapid, independent baseline protocols whenever a protected landscape faces land-use pressure?',
    ],
    evidenceAndMethods: [
      'Bibliometric comparison of research output on Dachigam versus Sálim Ali National Park (1986–2026)',
      'Structured roundtable reflections with regional environmental scientists and research scholars',
      'Integration with KEW Scientific Program 2027–2028 priorities',
    ],
    deliverable:
      'Charter for Independent Baseline Science on Contested Himalayan Landscapes.',
    methodologicalCaveat:
      'Recognizes funding, security, and site-access constraints faced by regional researchers rather than attributing gaps to personal indifference.',
  },
  {
    number: 60,
    code: '60',
    slug: 'chapter-60-the-lessons-for-kashmirs-legal-fraternity',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: "Kashmir's collective introspection",
    title: "The Lessons for Kashmir's Legal Fraternity",
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Examines what PIL No. 115/99 and the unretrieved denotification record teach environmental advocates, bar associations, and legal scholars across the Western Himalayas.',
      'Highlights the decisive importance of early injunctive relief prior to tree felling, certified gazette verification, and sustained post-judgment compliance monitoring.',
    ],
    investigativeQuestions: [
      'Why did litigation filed in January 1999 not prevent physical completion of the golf course by 2001?',
      'How can public-interest advocates secure immediate status-quo preservation before irreversible habitat clearing occurs?',
      'What permanent public-interest environmental law clinics and gazette repositories are needed in Srinagar, Jammu, and Leh?',
    ],
    evidenceAndMethods: [
      'Procedural timeline comparison of PIL No. 115/99 against successful forest/park injunctions in South Asian courts',
      'Consultations with High Court and National Green Tribunal practitioners',
      'Cross-linkage with KEW Environmental Litigation Support infrastructure',
    ],
    deliverable:
      'Practitioner Protocol for Preventive Protected-Area Litigation & Compliance Follow-Up.',
    methodologicalCaveat:
      'Full evaluation awaits retrieval of the complete High Court order sheet in PIL No. 115/99.',
  },
  {
    number: 61,
    code: '61',
    slug: 'chapter-61-the-lessons-for-journalism-and-civil-society',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: "Kashmir's collective introspection",
    title: 'The Lessons for Journalism and Civil Society',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Reflects on how journalism and civil-society organizations can sustain multi-decade documentary follow-through after initial headlines fade and physical construction concludes.',
      'Demonstrates why slow, archival, document-anchored journalism—tracking NBWL minutes, water permits, chemical registers, and remaining parcels—is indispensable in mountain regions.',
    ],
    investigativeQuestions: [
      'Why does environmental coverage often stop once a controversial project is inaugurated, missing crucial post-completion regulatory findings like the 2003–2005 NBWL minutes?',
      'How can regional newsrooms and NGOs co-maintain permanent open archives of gazettes, RTI replies, and inspection reports?',
      'What collaborative workflows between journalists, scientists, and lawyers strengthen evidentiary accuracy?',
    ],
    evidenceAndMethods: [
      'Longitudinal review of regional environmental reporting practices (1998–2026)',
      'Case comparison with sustained South Asian investigative campaigns documented in Monograph 08',
      'Editorial methodology linking Dispatch 08 and Dispatch 13 (Slow, Fearless Journalism)',
    ],
    deliverable:
      'Long-Horizon Investigative Follow-Up Manual for Himalayan Newsrooms & Civil Society.',
    methodologicalCaveat:
      'Acknowledges the severe operational, economic, and safety pressures under which Kashmir’s journalists worked during the late 1990s and 2000s.',
  },
  {
    number: 62,
    code: '62',
    slug: 'chapter-62-has-our-protected-area-governance-changed',
    volumeNumber: 9,
    volumeRoman: 'IX',
    volumeTitle: "Kashmir's collective introspection",
    title: 'Has Our Protected Area Governance Changed?',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Tests whether statutory reforms, Eco-Sensitive Zone (ESZ) notifications, PARIVESH digital portals, Supreme Court/NGT oversight, and satellite transparency between 2000 and 2026 would prevent a comparable national park conversion today.',
      'Identifies persistent vulnerabilities in boundary digitization, linear-infrastructure exemptions, tourism master plans, and post-clearance compliance.',
    ],
    investigativeQuestions: [
      'If a proposal identical to Royal Springs Golf Course were initiated inside a notified national park in 2026, what statutory and judicial barriers would it encounter?',
      'Where do contemporary Eco-Sensitive Zone dilutions, ropeway/tourism enclaves, or infrastructure diversions still echo late-1990s governance patterns?',
      'Are statutory wildlife boards today exercising stronger independent scientific veto power than in 2003–2005?',
    ],
    evidenceAndMethods: [
      'Comparative audit of 2015–2026 NBWL Standing Committee clearance rates and Eco-Sensitive Zone notifications in J&K and Ladakh',
      'Review of PARIVESH wildlife-clearance filings affecting Western Himalayan protected areas',
      'Cross-synthesis with Monograph 07 (When Environmental Laws Exist but Nature Has No Defence)',
    ],
    deliverable:
      '1998-versus-2026 Institutional Safeguard Stress-Test.',
    methodologicalCaveat:
      'Distinguishes formal existence of digital clearance portals from substantive independence of scientific appraisal.',
  },

  // ── VOLUME X: THE FUTURE OF PROTECTED LANDSCAPES (63–75) ──────────────────
  {
    number: 63,
    code: '63',
    slug: 'chapter-63-can-the-original-national-park-be-partially-recovered',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The future of protected landscapes',
    title: 'Can the Original National Park Be Partially Recovered?',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Evaluates systematically the four recovery pathways defined in Part XI Section 22—Scenario A (operational remediation), Scenario B (partial ecological rehabilitation of non-playing zones), Scenario C (restoration of the surviving ~723 ha park), and Scenario D (phased land-use reconsideration).',
      'Balances legal authority, ecological feasibility, Dal Lake protection, and fair protection of existing workers and livelihoods.',
    ],
    investigativeQuestions: [
      'Which elements of Scenarios A, B, and C can be implemented immediately without legal conflict or employment loss?',
      'What ecological thresholds determine whether compacted turf or fragmented foothill parcels can recover native Zabarwan woodland structure?',
      'Under what legal and socioeconomic conditions would Scenario D merit formal public consultation?',
    ],
    evidenceAndMethods: [
      'Multi-criteria feasibility matrix scoring Scenarios A–D across legal, ecological, hydrological, fiscal, and livelihood criteria',
      'Spatial zoning overlay identifying non-playing roughs, drainage buffers, and contiguous 723 ha parcels',
      'Stakeholder consultation framework involving wildlife authorities, tourism workers, scientists, and citizens',
    ],
    deliverable:
      'Staged Scenarios A–D Recovery & Remediation Decision Matrix.',
    methodologicalCaveat:
      'Rejects destructive or abrupt interventions; ecological recovery must proceed through legally authorized, scientifically staged protocols.',
  },
  {
    number: 64,
    code: '64',
    slug: 'chapter-64-environmental-remediation-of-the-golf-course',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The future of protected landscapes',
    title: 'Environmental Remediation of the Golf Course',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Details the technical engineering and agronomic roadmap for Scenario A within existing Royal Springs operations: closed-loop irrigation metering, soil-test zero-phosphorus fertilization, elimination of high-hazard pesticides, constructed treatment wetlands, and independent CSIR/university effluent monitoring.',
      'Directly fulfills the unresolved environmental safeguards sought by the National Board for Wildlife between 2003 and 2005.',
    ],
    investigativeQuestions: [
      'How much annual irrigation water and elemental N/P input can be reduced through deficit turf irrigation, native rough expansion, and precision soil testing?',
      'Where can vegetated bioswales and denitrifying subsurface bioreactors intercept fairway drainage before it exits toward Dal Lake?',
      'What public telemetry dashboard should report real-time water abstraction and outfall water quality?',
    ],
    evidenceAndMethods: [
      'Audubon / GEO sustainable golf-turf remediation engineering standards adapted for temperate Himalayan catchments',
      'Constructed-wetland and bioswale hydraulic retention design for eastern Dal Lake inflows',
      'Quarterly independent laboratory monitoring protocol (nutrients, pesticides, dissolved oxygen, macroinvertebrates)',
    ],
    deliverable:
      'Scenario A Technical Remediation & Zero-Runoff Engineering Blueprint.',
    methodologicalCaveat:
      'Operational greening under Scenario A mitigates ongoing water and chemical impacts but does not by itself resolve historical statutory boundary questions.',
  },
  {
    number: 65,
    code: '65',
    slug: 'chapter-65-restoring-native-woodland-and-wildlife-corridors',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The future of protected landscapes',
    title: 'Restoring Native Woodland and Wildlife Corridors',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Designs the Scenario B ecological rehabilitation blueprint: converting out-of-play roughs, perimeter strips, and channel margins into multi-layered native Zabarwan woodland, pollinator meadows, and permeable wildlife movement corridors.',
      'Specifies local-provenance nursery propagation, soil decompaction without erosion, and wildlife-safe perimeter designs.',
    ],
    investigativeQuestions: [
      'How many hectares within the existing perimeter lie outside active golf play lines and could transition to native Zabarwan woodland and wildflower roughs?',
      'Which native tree and fruiting-shrub assemblages best restore avian nesting strata and winter forage?',
      'Can wildlife-permeable underpasses or unfenced vegetated gullies reconnect Shankaracharya Reserve with Zabarwan slopes safely?',
    ],
    evidenceAndMethods: [
      'Hole-by-hole spatial audit separating active playing corridors from out-of-play buffer zones',
      'Native Zabarwan silvicultural and mycorrhizal soil-inoculation restoration protocols',
      'Human–wildlife conflict risk screening to ensure corridor designs do not funnel large mammals toward residential roads',
    ],
    deliverable:
      'Scenario B Native Woodland & Pollinator Corridor Restoration Plan.',
    methodologicalCaveat:
      'Established mature native trees must never be cleared during restoration, and corridor alignment must prioritize human safety along Gupkar and Nishat settlements.',
  },
  {
    number: 66,
    code: '66',
    slug: 'chapter-66-protecting-the-remaining-statutory-landscape',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The future of protected landscapes',
    title: 'Protecting the Remaining Statutory Landscape',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Develops the urgent Scenario C action plan for securing, demarcating, consolidating, and ecologically rehabilitating the surviving ~723-hectare statutory remainder of Sálim Ali National Park.',
      'Revisits the unapproved 2003/2005 expert recommendation concerning unified wildlife-department stewardship of the adjoining Shankaracharya–Zabarwan continuum.',
    ],
    investigativeQuestions: [
      'Which surviving parcels of the ~723-hectare remainder can be immediately consolidated under active Department of Wildlife Protection management and public boundary pillars?',
      'Should a statutory Zabarwan–Sálim Ali–Shankaracharya–Dachigam Conservation Complex management plan be notified?',
      'What low-impact public ornithological trails and interpretation facilities could honor Dr. Sálim Ali’s legacy without ecological disturbance?',
    ],
    evidenceAndMethods: [
      'Cadastral boundary pillar survey and GNSS polygon gazettement protocol',
      'Integrated landscape management planning linking KEW Sálim Ali, Shankaracharya, and Dachigam dossiers',
      'Community-stewardship and non-intrusive birding-trail design',
    ],
    deliverable:
      'Scenario C Statutory Consolidation & Management Plan Framework for the 723-Hectare Remainder.',
    methodologicalCaveat:
      'Requires formal revenue-wildlife joint demarcation before physical boundary markers are erected.',
  },
  {
    number: 67,
    code: '67',
    slug: 'chapter-67-the-economics-of-ecological-rehabilitation',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The future of protected landscapes',
    title: 'The Economics of Ecological Rehabilitation',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Estimates capital and 10-year maintenance costs, funding mechanisms, green-employment generation, and avoided Dal Lake remediation expenses across Scenarios A, B, C, and D.',
      'Demonstrates how ecological rehabilitation and ornithological nature tourism can sustain local livelihoods alongside watershed protection.',
    ],
    investigativeQuestions: [
      'What are the itemized capital and 10-year recurring costs of implementing Scenarios A, B, and C?',
      'Can green-fee environmental surcharges, CAMPA funds, or PPP mandatory remediation escrows finance ecological recovery?',
      'How many skilled nursery, monitoring, ranger, and nature-guiding jobs would restoring the 723-hectare park generate?',
    ],
    evidenceAndMethods: [
      'Engineering and silvicultural unit-cost schedules for bioswales, telemetry, native nurseries, and invasive-species removal',
      'CAMPA, CSR, and conservation-surcharge fiscal instrument evaluation',
      'Employment-transition and nature-tourism livelihood modelling',
    ],
    deliverable:
      'Ten-Year Financing & Livelihood Transition Model for Scenarios A–D.',
    methodologicalCaveat:
      'Cost estimates remain indicative planning ranges until site-specific soil and hydrological surveys are completed.',
  },
  {
    number: 68,
    code: '68',
    slug: 'chapter-68-international-protected-area-transformation-case-studies',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The future of protected landscapes',
    title: 'International Protected Area Transformation Case Studies',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Places Srinagar’s Sálim Ali National Park in global comparative perspective alongside documented cases where urban national parks, mountain reserves, or wetland sanctuaries faced golf-course, resort, or recreational excisions—and cases where courts or governments later restored ecological integrity.',
      'Extracts practical legal, hydrological, and ecological restoration lessons from North America, Europe, East Africa, and Asia.',
    ],
    investigativeQuestions: [
      'How have constitutional courts and park agencies worldwide adjudicated golf-course and luxury-resort proposals inside national parks (such as Banff/Canadian Rockies commercial caps and former golf-course rewilding projects)?',
      'What soil, hydrological, and floristic recovery trajectories emerged where former golf courses were partially or fully rewilded into urban national parks?',
      'Which statutory lock-in clauses successfully prevented incremental urban-park erosion elsewhere?',
    ],
    evidenceAndMethods: [
      'Global PADDDtracker case-study database and peer-reviewed restoration ecology literature on golf-course rewilding',
      'Comparative statutory review of national park commercial-development caps (Canada National Parks Act, South Africa NEM:PAA, India WLPA)',
      'Synthesis of empirical soil and avian recovery timelines from completed rewilding sites',
    ],
    deliverable:
      'Comparative International Casebook on Protected-Area Recreational Conversions & Rewilding.',
    methodologicalCaveat:
      'Institutional, climatic, and land-tenure differences must be calibrated before transferring international rewilding models to Srinagar.',
  },
  {
    number: 69,
    code: '69',
    slug: 'chapter-69-protected-area-downgrading-downsizing-and-degazettement',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The future of protected landscapes',
    title: 'Protected Area Downgrading, Downsizing and Degazettement',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Applies the international conservation science framework of PADDD (Protected Area Downgrading, Downsizing, and Degazettement, Part XII Section 24) to classify both statutory and de facto alterations across Himalayan protected areas.',
      'Distinguishes formal gazetted downsizing from unrecorded administrative attrition ("paper-park erosion" and "quiet degazettement").',
    ],
    investigativeQuestions: [
      'Under global PADDD classification rules, how should the Sálim Ali National Park conversion and its unclarified 723-hectare remainder be categorized?',
      'Why do tourism enclaves, linear highways, hydropower diversions, and security/institutional compounds represent the primary proximate drivers of Himalayan PADDD?',
      'How can PADDD tracking detect de facto functional habitat loss even where outer gazette lines remain unchanged on paper?',
    ],
    evidenceAndMethods: [
      'IUCN / WWF / Conservation International PADDD classification methodology adapted for mountain jurisdictions',
      'Typology of statutory versus de facto boundary and restriction changes',
      'Integration with KEW Protected Area Integrity Observatory (PAIO-03 Denotification Intelligence)',
    ],
    deliverable:
      'Western Himalayan PADDD Methodological Standard & Classification Taxonomy.',
    methodologicalCaveat:
      'Final PADDD coding of Sálim Ali National Park awaits verification of the underlying denotification gazette.',
  },
  {
    number: 70,
    code: '70',
    slug: 'chapter-70-auditing-the-western-himalayan-protected-area-network',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The future of protected landscapes',
    title: 'Auditing the Western Himalayan Protected Area Network',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Extends preventive scientific and legal boundary verification across all five Western Himalayan regions defined in Part XII Section 24: Kashmir (Dachigam, Kazinag, Gulmarg, Overa-Aru, Hirpora), Jammu (Kishtwar, Jasrota, Nandini, Ramnagar Rakha), Ladakh (Hemis, Changthang, Karakoram), Azad Jammu & Kashmir (Machiara, Musk Deer, Pir Chinasi), and Gilgit-Baltistan (Central Karakoram, Khunjerab, Deosai, Broghil-adjacent corridors).',
      'Audits gazette completeness, digitized polygon availability, management-plan currency, and non-conservation land-use pressures.',
    ],
    investigativeQuestions: [
      'Which Western Himalayan national parks and sanctuaries possess publicly accessible, parcel-verified digital boundary polygons, and which rely solely on textual descriptions?',
      'Where do conflicting area figures (similar to the 869–907 ha spread in Sálim Ali National Park) appear in official registries across the five regions?',
      'Which protected areas currently face active proposals for tourism enclaves, rationalizations, or infrastructure excisions?',
    ],
    evidenceAndMethods: [
      'Cross-jurisdictional audit of KEW Protected Area Registry, WDPA (Protected Planet), WII, Ladakh, AJK, and Gilgit-Baltistan wildlife notifications',
      'Sentinel-2 ten-year land-cover screening inside and within 1 km buffers of notified protected landscapes',
      'Explicit preventive verification framing carrying zero presumption of unlawful alteration',
    ],
    deliverable:
      'Five-Region Western Himalayan Protected Area Gazette & Boundary Completeness Audit.',
    methodologicalCaveat:
      'Inclusion of any protected area in this preventive audit does not imply unlawful boundary alteration; cross-LoC jurisdictions are analyzed strictly under their respective statutory records.',
  },
  {
    number: 71,
    code: '71',
    slug: 'chapter-71-strengthening-protected-area-legislation',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The future of protected landscapes',
    title: 'Strengthening Protected Area Legislation',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Formulates concrete statutory and regulatory reforms across the four principal legal frameworks operating in the Western Himalayas to close the loopholes exposed by the Sálim Ali National Park experience.',
      'Addresses mandatory pre-clearance boundary digitization, absolute prohibition of ex post facto wildlife approvals, automatic stay upon unapproved tree clearing, and mandatory public gazette publication.',
    ],
    investigativeQuestions: [
      'What statutory amendments can ensure no physical site clearing occurs on protected land until legislative, judicial, and wildlife-board procedures are fully concluded and gazetted?',
      'How can wildlife-board composition be reformed so independent ecological scientists hold binding review authority?',
      'What personal institutional accountability and restoration-escrow rules should apply to unauthorized protected-area alterations?',
    ],
    evidenceAndMethods: [
      'Comparative statutory drafting across Wild Life (Protection) Act, 1972 (as applicable in J&K and Ladakh), AJK Wildlife Act, and Gilgit-Baltistan wildlife statutes',
      'Harmonization with Monograph 07’s fifteen legislative reform packages',
      'Peer review by constitutional and environmental law practitioners across the region',
    ],
    deliverable:
      'Model Statutory Safeguard Clauses Preventing Unverified or Retrospective Protected-Area Excisions.',
    methodologicalCaveat:
      'Model legislative clauses are proposed policy recommendations requiring independent evaluation by competent legislatures and legal counsel in each jurisdiction.',
  },
  {
    number: 72,
    code: '72',
    slug: 'chapter-72-the-western-himalayan-protected-area-integrity-protocol',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The future of protected landscapes',
    title: 'The Western Himalayan Protected Area Integrity Protocol',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Codifies the twelve-point Western Himalayan Protected Area Integrity Protocol (Part XII Section 25, WHPAIP-01 through WHPAIP-12) into an operational, step-by-step public evaluation standard.',
      'Establishes verifiable gates—from digitized statutory boundaries and demonstration of necessity to alternatives assessment, cumulative impact accounting, restoration obligations, and periodic independent boundary audits.',
    ],
    investigativeQuestions: [
      'How can each of the twelve Integrity Protocol requirements be translated into pass/fail documentary checklists for public agencies, courts, and citizens?',
      'How would the 1998 Royal Springs conversion score if audited retrospectively against WHPAIP-01 through WHPAIP-12?',
      'How can KEW operationalize the Integrity Protocol across every new infrastructure or tourism proposal affecting protected land?',
    ],
    evidenceAndMethods: [
      'Operationalization of the twelve-requirement table in Part XII Section 25 into measurable indicators and evidentiary thresholds',
      'Retrospective benchmark scoring of the Sálim Ali National Park case as calibration test',
      'Public-access open-data schema integrated with `/protected-network/protected-area-integrity-observatory`',
    ],
    deliverable:
      'Operational Handbook & 12-Gate Scorecard of the Western Himalayan Protected Area Integrity Protocol.',
    methodologicalCaveat:
      'Represents a voluntary scientific and civic accountability standard complementing—not replacing—statutory clearance procedures.',
  },
  {
    number: 73,
    code: '73',
    slug: 'chapter-73-establishing-permanent-scientific-monitoring',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The future of protected landscapes',
    title: 'Establishing Permanent Scientific Monitoring',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Specifies the permanent architecture of the 12-module KEW Protected Area Integrity & Historical Transformation Observatory (Part XIII, PAIO-01 through PAIO-12), ensuring protected-area boundaries, water quality, biodiversity, and public expenditures are continuously tracked rather than revisited once a generation.',
      'Integrates satellite change detection, gazette registries, hydrological telemetry, and citizen-science ground verification.',
    ],
    investigativeQuestions: [
      'What automated Sentinel-1/Sentinel-2 anomaly alerts can flag canopy clearing or earthworks inside notified protected boundaries within days?',
      'How should PAIO-01 through PAIO-12 link seamlessly with existing KEW Sálim Ali forensic investigations (KEW-INV-0018 to KEW-INV-0020) without duplication?',
      'What open-data standards guarantee long-term reproducibility and public auditability?',
    ],
    evidenceAndMethods: [
      'Technical systems architecture for PAIO-01 through PAIO-12 on Kashmir EcoWatch',
      'OGC GeoPackage / GeoJSON statutory boundary versioning, Darwin Core biodiversity schemas, and WaterML hydrological feeds',
      'Chain-of-custody cryptographic hashing for archived gazettes, court orders, and lab reports',
    ],
    deliverable:
      'Technical Specification & Data Governance Charter of the KEW Protected Area Integrity Observatory.',
    methodologicalCaveat:
      'Automated satellite disturbance alerts require mandatory human analyst and cadastral verification before public issuance.',
  },
  {
    number: 74,
    code: '74',
    slug: 'chapter-74-a-conservation-recovery-agenda-for-2027-2035',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The future of protected landscapes',
    title: 'A Conservation Recovery Agenda for 2027–2035',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Sets out a phased nine-year milestone roadmap (2027–2035) beginning with the ten immediate investigations (Part XI Section 23) for Sálim Ali National Park and scaling up to full five-region protected-area boundary authentication and habitat corridor recovery.',
      'Aligns timelines with Kunming–Montreal Global Biodiversity Framework Target 3 quality-and-integrity benchmarks.',
    ],
    investigativeQuestions: [
      'Which immediate document retrievals, boundary surveys, and water/chemical audits should be completed during Phase I (2027–2028)?',
      'What measurable ecological, hydrological, and legal milestones define Phase II (2029–2031) remediation and 723-hectare consolidation?',
      'What regional protected-area integrity benchmarks should the Western Himalayas achieve by 2035?',
    ],
    evidenceAndMethods: [
      'Three-phase implementation schedule (2027–2028 Forensic Baseline; 2029–2031 Remediation & Demarcation; 2032–2035 Network Consolidation)',
      'Integration of the 10 immediate investigations (IMM-01 through IMM-10) with measurable KPIs',
      'Alignment with global 2030/2035 protected-area effectiveness reporting',
    ],
    deliverable:
      'Phased 2027–2035 Conservation Recovery & Boundary Integrity Roadmap.',
    methodologicalCaveat:
      'All 2027–2035 agenda milestones represent proposed scientific and policy pathways subject to statutory authority and public consultation.',
  },
  {
    number: 75,
    code: '75',
    slug: 'chapter-75-what-does-protected-really-mean',
    volumeNumber: 10,
    volumeRoman: 'X',
    volumeTitle: 'The future of protected landscapes',
    title: 'What Does Protected Really Mean?',
    researchStatus:
      'Proposed Investigative Chapter Protocol · Archival & Field Verification Ongoing',
    executiveSummary: [
      'Concludes the 10-volume, 75-chapter investigation by returning to the foundational constitutional and ethical covenant of conservation: a national park does not belong exclusively to the government that declares it, nor to the economic priorities of a single administration.',
      'Asks what protection any mountain forest, wetland, meadow, or river in the Western Himalayas can reasonably expect if even the highest tier of statutory national park recognition yields to incompatible development.',
    ],
    investigativeQuestions: [
      'What institutional, legal, and civic commitments separate genuine intergenerational protection from revocable administrative convenience?',
      'How can acknowledging the full historical truth of Srinagar’s Sálim Ali National Park strengthen—rather than polarize—future conservation governance?',
      'What enduring obligations do today’s institutions owe to the surviving Zabarwan foothill landscape and the broader Western Himalayan Protected Area Network?',
    ],
    evidenceAndMethods: [
      'Synthesis of empirical findings across all ten volumes (historical, legal, geospatial, biological, hydrological, financial, civic, and regional)',
      'Integration of published Institutional Right of Response statements alongside primary documentary evidence',
      'Normative constitutional and intergenerational public-trust synthesis',
    ],
    deliverable:
      'Capstone Synthesis & Intergenerational Covenant on Protected Landscapes in the Western Himalayas.',
    methodologicalCaveat:
      'Final conclusions remain strictly bounded by authenticated documentary and field evidence assembled across Chapters 01–74.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// NAVIGATION & LOOKUP HELPERS FOR VOLUMES (10) & CHAPTERS (75)
// ─────────────────────────────────────────────────────────────────────────────

const SALIM_ALI_ROMAN_TO_NUMBER: Record<string, number> = {
  i: 1,
  ii: 2,
  iii: 3,
  iv: 4,
  v: 5,
  vi: 6,
  vii: 7,
  viii: 8,
  ix: 9,
  x: 10,
};

/**
 * Look up any of the 75 Monograph 09 chapters by canonical slug (`chapter-01-...`),
 * two-digit code (`'01'..'75'`), `chapter-XX` prefix, or chapter number string.
 */
export function getSalimAliChapterBySlug(
  slug: string,
): SalimAliChapterProtocol | undefined {
  const clean = decodeURIComponent(slug || '')
    .trim()
    .toLowerCase();
  if (!clean) return undefined;

  const exact = SALIM_ALI_CHAPTERS_75.find(
    (ch) => ch.slug.toLowerCase() === clean,
  );
  if (exact) return exact;

  const byCode = SALIM_ALI_CHAPTERS_75.find(
    (ch) =>
      ch.code.toLowerCase() === clean ||
      `chapter-${ch.code.toLowerCase()}` === clean ||
      String(ch.number) === clean,
  );
  if (byCode) return byCode;

  const prefixMatch = clean.match(/^chapter-(\d{1,2})\b/);
  if (prefixMatch) {
    const num = Number.parseInt(prefixMatch[1], 10);
    return SALIM_ALI_CHAPTERS_75.find((ch) => ch.number === num);
  }

  return undefined;
}

/**
 * Retrieve previous and next chapters across Chapters 01–75 for sequential navigation.
 */
export function getSalimAliAdjacentChapters(slug: string): {
  previous?: SalimAliChapterProtocol;
  next?: SalimAliChapterProtocol;
} {
  const current = getSalimAliChapterBySlug(slug);
  if (!current) return {};
  const idx = SALIM_ALI_CHAPTERS_75.findIndex(
    (ch) => ch.number === current.number,
  );
  return {
    previous: idx > 0 ? SALIM_ALI_CHAPTERS_75[idx - 1] : undefined,
    next:
      idx >= 0 && idx < SALIM_ALI_CHAPTERS_75.length - 1
        ? SALIM_ALI_CHAPTERS_75[idx + 1]
        : undefined,
  };
}

/**
 * Look up any of the 10 Monograph 09 volumes by Roman numeral (`'I'..'X'`),
 * volume number (`1..10`), or volume slug.
 */
export function getSalimAliVolumeByRomanOrNumber(
  token: string | number,
): SalimAliVolumeSpec | undefined {
  if (typeof token === 'number') {
    return SALIM_ALI_VOLUMES_10.find((v) => v.volumeNumber === token);
  }
  const clean = decodeURIComponent(token || '')
    .trim()
    .toLowerCase();
  if (!clean) return undefined;

  const direct = SALIM_ALI_VOLUMES_10.find(
    (v) =>
      v.slug.toLowerCase() === clean ||
      v.volumeRoman.toLowerCase() === clean ||
      `volume-${v.volumeRoman.toLowerCase()}` === clean ||
      String(v.volumeNumber) === clean ||
      v.volumeNumber.toString().padStart(2, '0') === clean,
  );
  if (direct) return direct;

  if (clean in SALIM_ALI_ROMAN_TO_NUMBER) {
    const num = SALIM_ALI_ROMAN_TO_NUMBER[clean];
    return SALIM_ALI_VOLUMES_10.find((v) => v.volumeNumber === num);
  }

  return undefined;
}

/**
 * Return all ordered chapters belonging to a given Monograph 09 volume
 * (`'I'` through `'X'`, volume slug, or volume number `1..10`).
 */
export function getSalimAliChaptersByVolume(
  volumeRoman: SalimAliVolumeRoman | string | number,
): SalimAliChapterProtocol[] {
  const vol = getSalimAliVolumeByRomanOrNumber(volumeRoman);
  if (!vol) return [];
  return SALIM_ALI_CHAPTERS_75.filter(
    (ch) => ch.volumeNumber === vol.volumeNumber,
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 13. PART XV — 20 PRIORITY ORIGINAL DOCUMENTS & 7 IDENTIFIED PRIMARY SOURCES
// ─────────────────────────────────────────────────────────────────────────────

export const PRIORITY_ORIGINAL_DOCUMENTS_20: PriorityOriginalDocumentRow[] = [
  {
    priority: '01',
    document: 'Original national park notification',
    custodianOrArchiveTarget:
      'Wildlife Institute of India Gazette Database & J&K Government Press Archive',
    investigativeRole:
      'Reconciles 1986 vs. 1992 establishment dates and authenticates exact gazetted area (9.07, 9.00, 8.85, or 8.69 km²).',
    retrievalStatus:
      'Indexed at WII behind institutional access form; authenticated copy requested.',
  },
  {
    priority: '02',
    document: 'Original cadastral and protected-area boundary maps',
    custodianOrArchiveTarget:
      'J&K Department of Wildlife Protection & Srinagar Revenue Settlement Archive',
    investigativeRole:
      'Establishes parcel-level Khasra boundaries for the original park and the unresolved 723-hectare remainder.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '03',
    document: 'Cabinet approval for golf course development',
    custodianOrArchiveTarget:
      'Jammu & Kashmir Civil Secretariat / General Administration Department',
    investigativeRole:
      'Documents exact executive terms, acreage, and statutory conditions of the 1998 sanction.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '04',
    document: 'Original detailed project report',
    custodianOrArchiveTarget:
      'J&K Tourism Department / Royal Springs Golf Course Governing Body',
    investigativeRole:
      'Verifies initial capital cost estimates, grading volumes, turf area, drainage schematics, and irrigation design.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '05',
    document: 'Environmental and wildlife assessments',
    custodianOrArchiveTarget:
      'J&K Department of Wildlife Protection, J&K PCC & MoEFCC',
    investigativeRole:
      'Tests whether any qualified ecological or hydrological impact assessment preceded site clearance.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '06',
    document: 'Tree-felling permissions and timber disposal records',
    custodianOrArchiveTarget:
      'J&K Forest Department & State Forest Corporation / Forest Development Corporation',
    investigativeRole:
      'Resolves conflicting historical tree-removal accounts through official enumeration and timber ledgers.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '07',
    document: 'Wildlife relocation records',
    custodianOrArchiveTarget:
      'J&K Department of Wildlife Protection & Central Zoo Authority',
    investigativeRole:
      'Clarifies captive animal transfers including the snow leopard facility referenced in Kalpavriksh archives.',
    retrievalStatus:
      'Archival correspondence identified; official transfer orders outstanding.',
  },
  {
    priority: '08',
    document: 'Original PIL petition and all subsequent court orders',
    custodianOrArchiveTarget:
      'High Court of Jammu & Kashmir and Ladakh Registry (PIL No. 115/99) & WPSI',
    investigativeRole:
      'Establishes judicial findings, interim directions, state affidavits, and final disposition in PIL No. 115/99.',
    retrievalStatus:
      'Summarized in IGNFA legal compilation; certified High Court record outstanding.',
  },
  {
    priority: '09',
    document: 'Legislative resolutions authorizing boundary alteration',
    custodianOrArchiveTarget:
      'Jammu & Kashmir Legislative Assembly and Legislative Council Archives',
    investigativeRole:
      'Verifies whether Section 35 legislative approval requirements were satisfied.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '10',
    document: 'Authenticated denotification gazette',
    custodianOrArchiveTarget:
      'Jammu & Kashmir Government Gazette Repository & Department of Law',
    investigativeRole:
      'Verifies the legal instrument underlying the October 2005 statement that 1.62 km² had been denotified.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '11',
    document: 'Complete 2003 expert inspection report',
    custodianOrArchiveTarget:
      'MoEFCC Wildlife Division / NBWL Standing Committee Secretariat',
    investigativeRole:
      'Provides full on-site observations of Dr. M. K. Ranjitsinh and Aseem Srivastav reviewed on May 6, 2003.',
    retrievalStatus:
      'Referenced in 2003–2005 NBWL minutes; full inspection text requested.',
  },
  {
    priority: '12',
    document: 'All eight expert recommendations',
    custodianOrArchiveTarget:
      'MoEFCC Wildlife Division / NBWL Standing Committee Archives',
    investigativeRole:
      'Establishes exact text of the 4 accepted, 3 deferred, and 1 unapproved safeguard recommendations.',
    retrievalStatus:
      'Summary tally verified in October 2005 record; verbatim annexure requested.',
  },
  {
    priority: '13',
    document: 'Government compliance responses',
    custodianOrArchiveTarget:
      'J&K Forest/Wildlife Secretariat, MoEFCC & Supreme Court / CEC Filings',
    investigativeRole:
      'Tracks state compliance submissions and any post-October 2005 Supreme Court filings.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '14',
    document: 'CSIR water-quality monitoring reports',
    custodianOrArchiveTarget:
      'CSIR-IIIM Jammu, J&K Pollution Control Committee & MoEFCC',
    investigativeRole:
      'Determines whether effluent monitoring affecting Dal Lake and wildlife habitats discussed in April 2005 was conducted and what it found.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '15',
    document: 'Golf course irrigation and abstraction permissions',
    custodianOrArchiveTarget:
      'Jal Shakti Department, Ground Water Authorities & Royal Springs Management',
    investigativeRole:
      'Establishes sanctioned water sources, permits, and metered seasonal irrigation withdrawals.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '16',
    document: 'Fertilizer and pesticide application records',
    custodianOrArchiveTarget:
      'Royal Springs Golf Course Agronomy / Store Procurement Registers',
    investigativeRole:
      'Quantifies actual annual elemental N, P, herbicide, fungicide, and insecticide applications.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '17',
    document: 'Audited construction and operating expenditure',
    custodianOrArchiveTarget:
      'Comptroller and Auditor General (CAG), J&K Finance Department & Tourism Accounts',
    investigativeRole:
      'Computes 25-year net public financial contribution, capital outlays, subsidies, and revenues.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '18',
    document: 'Current land ownership and administrative jurisdiction',
    custodianOrArchiveTarget:
      'Deputy Commissioner Srinagar Revenue Records & Department of Wildlife Protection',
    investigativeRole:
      'Clarifies 2026 legal custody of both the 40.6 ha variance and the 723 ha non-golf remainder.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '19',
    document: 'Recent biodiversity and environmental monitoring reports',
    custodianOrArchiveTarget:
      'Department of Wildlife Protection, LCMA, J&K PCC & Regional Universities',
    investigativeRole:
      'Provides contemporary ecological and water-quality baselines across the foothill–Dal Lake interface.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
  {
    priority: '20',
    document:
      'Public-private partnership feasibility and concession documents',
    custodianOrArchiveTarget:
      'J&K Tourism Department & Transaction Advisory Archives (2023–2026)',
    investigativeRole:
      'Evaluates fiscal terms, land-lease authority, and environmental obligations under proposed PPP outsourcing.',
    retrievalStatus: 'Outstanding primary retrieval priority.',
  },
];

export const IDENTIFIED_PRIMARY_SOURCES_7: IdentifiedPrimarySourceRow[] = [
  {
    code: 'SRC-01',
    document: 'WII Protected Area Gazette archive',
    accessLabel: 'Official archive',
    url: 'https://v1.wii.gov.in/protectedareagazette_jammu_kashmir',
    evidentiaryNotes:
      'Retains official database listing for City Forest (Sálim Ali) National Park, Srinagar (1992; 9 km²); underlying gazette document gated behind an institutional access form.',
  },
  {
    code: 'SRC-02',
    document: 'Historical J&K Wildlife Protection Act',
    accessLabel: 'Legal document',
    url: 'https://jkfpf.nic.in/J_K_Wildlife_Protection_Act.pdf',
    evidentiaryNotes:
      'Consolidated text of the Jammu and Kashmir Wildlife (Protection) Act, 1978 including Section 35 national park declaration and boundary-alteration safeguards.',
  },
  {
    code: 'SRC-03',
    document: 'August 2004 Wildlife Board proceedings',
    accessLabel: 'Official minutes',
    url: 'https://moef.gov.in/uploads/2018/03/Minutes_meeting_250804.pdf',
    evidentiaryNotes:
      'Official MoEF Standing Committee minutes of August 25, 2004 (visually verified) recording state failure to respond adequately to the 2003 expert site inspection recommendations.',
  },
  {
    code: 'SRC-04',
    document: 'October 2005 Wildlife Board proceedings',
    accessLabel: 'Official minutes',
    url: 'https://moef.gov.in/uploads/2018/03/Minutes_meeting_41005.pdf',
    evidentiaryNotes:
      'Official MoEF Standing Committee minutes of October 4, 2005 recording the 1.62 km² denotification statement, acceptance of only 4 of 8 expert recommendations, rejection of Shankaracharya transfer, and decision to inform the Supreme Court.',
  },
  {
    code: 'SRC-05',
    document: 'Historical Protected Area Update',
    accessLabel: 'Indian Institute of Science archive',
    url: 'https://wgbis.ces.iisc.ac.in/biodiversity/Environ_sys/doc98html/biodpa9981.html',
    evidentiaryNotes:
      'Contemporary 1999 conservation bulletin preserved at CES/IISc documenting tree-removal allegations, Wildlife Department objections, and early litigation.',
  },
  {
    code: 'SRC-06',
    document: 'Kalpavriksh historical correspondence',
    accessLabel: 'Archival catalogue',
    url: 'https://cat.milli.link/repositories/2/top_containers/672',
    evidentiaryNotes:
      'Archival finding aid at the Milli Archives Foundation indexing primary correspondence from October 1998 onward, including concerns over snow leopard relocation.',
  },
  {
    code: 'SRC-07',
    document: 'J&K Tourism golf course description',
    accessLabel: 'Official tourism record',
    url: 'https://jktourism.org/golfing/',
    evidentiaryNotes:
      'Official Jammu & Kashmir Tourism portal describing Royal Springs Golf Course (~300 acres / 121.4 ha) and its automated sprinkler irrigation infrastructure.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 14. PART XIII — KEW PROTECTED AREA INTEGRITY OBSERVATORY (12 MODULES)
// ─────────────────────────────────────────────────────────────────────────────

export const KEW_PROTECTED_AREA_INTEGRITY_OBSERVATORY_12: KewProtectedAreaObservatoryModuleSpec[] =
  [
    {
      code: 'PAIO-01',
      title: 'Historical Gazette Archive',
      operationalFunction:
        'Preserves authenticated intention notifications, final national park and sanctuary gazettes, boundary schedules, and historical statutory texts across all five Western Himalayan regions.',
      dataStandard:
        'SHA-256 hash-verified PDF/A gazette scans paired with structured statutory citation and section-level amendment metadata.',
      currentStatus:
        'WII & J&K Act records indexed; institutional retrieval active for City Forest / Sálim Ali National Park primary SRO gazettes.',
      connectedKewSurfaceLabel: 'KEW Sálim Ali National Park Profile',
      connectedKewSurfaceHref:
        '/protected-network/national-parks/salim-ali-national-park',
    },
    {
      code: 'PAIO-02',
      title: 'Protected Boundary Registry',
      operationalFunction:
        'Maintains versioned cadastral and GIS polygons reconciling conflicting reported extents (such as 9.07, 9.00, 8.85, and 8.69 km²) and distinguishing gazetted, excised, and unresolved remainder parcels.',
      dataStandard:
        'OGC GeoPackage / GeoJSON WGS84 polygons linked to village Khasra and forest compartment identifiers.',
      currentStatus:
        'Arithmetic area reconciliation operational; seven-layer cadastral polygon verification in progress.',
      connectedKewSurfaceLabel: 'KEW Protected Area Registry',
      connectedKewSurfaceHref: '/protected-network/registry',
    },
    {
      code: 'PAIO-03',
      title: 'Denotification Intelligence',
      operationalFunction:
        'Tracks all proposed, reported, and completed PADDD events (downgrading, downsizing, degazettement), auditing compliance with wildlife board, legislative, and judicial safeguards.',
      dataStandard:
        'Five-step statutory verification chain (notification, sanction, board recommendation, legislative resolution, final gazette) + PADDD taxonomy.',
      currentStatus:
        '2003–2005 NBWL proceedings indexed; legislative and final denotification gazette audit ongoing.',
      connectedKewSurfaceLabel: 'KEW Protected Area Monitoring & Threats',
      connectedKewSurfaceHref: '/protected-network/monitoring-and-threats',
    },
    {
      code: 'PAIO-04',
      title: 'Land-Use Change Analysis',
      operationalFunction:
        'Executes nine-epoch optical, panchromatic, radar, and LiDAR reconstruction (1960–2026) separating native multi-layered woodland from graded turf, roads, and built structures.',
      dataStandard:
        'Radiometrically harmonized CORONA, Landsat, IRS, Sentinel-2, and VHR change-detection masks with topographic illumination correction.',
      currentStatus:
        'Nine-period observation framework specified and linked to KEW Satellite Change Detection Observatory.',
      connectedKewSurfaceLabel: 'KEW Satellite Change Detection Observatory',
      connectedKewSurfaceHref:
        '/earth-human-impact/change-detection-observatory',
    },
    {
      code: 'PAIO-05',
      title: 'Wildlife Displacement Registry',
      operationalFunction:
        'Documents historical species baselines, habitat-loss guild shifts across nine biological groups, foothill corridor barriers, and captive-facility relocation records.',
      dataStandard:
        'Darwin Core occurrence & occupancy schemas + Central Zoo Authority / departmental animal-transfer audit trails.',
      currentStatus:
        'Nine biological group protocols and Kalpavriksh snow leopard archival reference integrated.',
      connectedKewSurfaceLabel: 'KEW Protected Network Species Intelligence',
      connectedKewSurfaceHref: '/protected-network/species-intelligence',
    },
    {
      code: 'PAIO-06',
      title: 'Ecological Services Assessment',
      operationalFunction:
        'Quantifies carbon storage, foothill stormwater infiltration, Dal Lake nutrient buffering, and urban thermal regulation alongside non-monetizable intrinsic conservation values.',
      dataStandard:
        'UN SEEA Ecosystem Accounting (SEEA-EA) biophysical and replacement-cost tables.',
      currentStatus:
        'Eight-dimension economic–ecological balance framework active.',
      connectedKewSurfaceLabel: 'KEW Environmental Investigations — Economics',
      connectedKewSurfaceHref: '/environmental-investigations/economics',
    },
    {
      code: 'PAIO-07',
      title: 'Environmental Litigation Archive',
      operationalFunction:
        'Indexes public-interest writ petitions (including PIL No. 115/99), Supreme Court dereservation orders, Central Empowered Committee filings, expert inspection reports, and compliance affidavits.',
      dataStandard:
        'Structured judicial docket chronology strictly separating petitioner allegations from certified court orders.',
      currentStatus:
        'IGNFA PIL No. 115/99 reference and October 2005 Supreme Court submission resolution catalogued; certified High Court file requested.',
      connectedKewSurfaceLabel: 'KEW Environmental Legal Precedents',
      connectedKewSurfaceHref: '/environmental-investigations/precedents',
    },
    {
      code: 'PAIO-08',
      title: 'Public Expenditure Audit',
      operationalFunction:
        'Reconstructs 25-year capital expenditure, imported equipment costs, recurring operating subsidies, direct tourism receipts, and PPP concession terms.',
      dataStandard:
        'Fourteen-category public finance ledger normalized to constant 2026 fiscal values + Net Public Financial Contribution formula.',
      currentStatus:
        'Fourteen-category financial dossier protocol established.',
      connectedKewSurfaceLabel:
        'KEW Environmental Investigations — Accountability',
      connectedKewSurfaceHref: '/environmental-investigations/accountability',
    },
    {
      code: 'PAIO-09',
      title: 'Hydrological Impact Analysis',
      operationalFunction:
        'Tracks turfgrass irrigation demand, spring/groundwater abstraction authorizations, storm-drain connectivity, and receiving-water pathways into eastern Dal Lake.',
      dataStandard:
        'Eight-component water-accounting balance + FAO-56 Penman–Monteith ET and sub-catchment tracer protocols.',
      currentStatus:
        'Interactive scenario baseline (320 million litres / 0.88 MLD illustrative model) paired with empirical metering audit checklist.',
      connectedKewSurfaceLabel: 'KEW Dal Lake Conservation Performance',
      connectedKewSurfaceHref:
        '/water-systems/lakes/dal-lake/conservation-performance',
    },
    {
      code: 'PAIO-10',
      title: 'Chemical Footprint Monitoring',
      operationalFunction:
        'Monitors elemental nitrogen and phosphorus mass balances, turf herbicide/fungicide/insecticide active ingredients, and follow-up on the 2005 NBWL/CSIR Jammu water-quality mandate.',
      dataStandard:
        'Elemental N/P mass-balance accounting + multi-residue LC-MS/MS aquatic ecotoxicity screening thresholds.',
      currentStatus:
        'Illustrative N/P export baseline and 2003–2005 NBWL chemical-question audit integrated.',
      connectedKewSurfaceLabel: 'KEW Water Pollution Risk Monitoring',
      connectedKewSurfaceHref: '/risk-monitoring/water-pollution',
    },
    {
      code: 'PAIO-11',
      title: 'Restoration Feasibility Registry',
      operationalFunction:
        'Evaluates Scenarios A–D spanning operational zero-runoff remediation, native Zabarwan rough rewilding, consolidation of the 723-hectare remainder, and wildlife corridor permeability.',
      dataStandard:
        'SER International Principles for Ecological Restoration + non-destructive native provenance and livelihood-protection safeguards.',
      currentStatus:
        'Four-scenario recovery matrix and 10 immediate investigations specified.',
      connectedKewSurfaceLabel: 'KEW Wildlife Corridors & Connectivity',
      connectedKewSurfaceHref: '/protected-network/corridors-and-connectivity',
    },
    {
      code: 'PAIO-12',
      title: 'Regional Protected Area Alerts',
      operationalFunction:
        'Applies the 12-point Western Himalayan Protected Area Integrity Protocol across Kashmir, Jammu, Ladakh, Azad Jammu & Kashmir, and Gilgit-Baltistan to provide early transparency on boundary or land-use proposals.',
      dataStandard:
        'WHPAIP 12-gate scorecard + verified satellite disturbance and statutory public-notice alerts.',
      currentStatus:
        'Five-region preventive audit scope and 12-requirement Integrity Protocol active.',
      connectedKewSurfaceLabel: 'KEW Live Environmental Alerts',
      connectedKewSurfaceHref: '/alerts',
    },
  ];

// ─────────────────────────────────────────────────────────────────────────────
// 15. OPEN DATASET PAYLOAD & RFC-4180 CSV EXPORT BUILDERS
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build the complete machine-readable JSON dataset payload for
 * `/api/himalayan-dispatch/datasets/salim-ali-park-monograph-framework`.
 */
export function buildSalimAliMonographDatasetPayload() {
  return {
    schemaVersion: '1.0.0',
    generatedFrameworkId:
      'kew-hd-monograph-09-the-national-park-that-became-a-golf-course',
    evidentiaryStatus: SALIM_ALI_MONOGRAPH_SPEC.researchLimitationsDisclosure,
    counts: {
      volumes: SALIM_ALI_VOLUMES_10.length,
      chapters: SALIM_ALI_CHAPTERS_75.length,
      historicalEstablishmentSources:
        HISTORICAL_ESTABLISHMENT_RECONCILIATION_6.length,
      documentedChronologyMilestones: DOCUMENTED_CHRONOLOGY_17.length,
      nbwlDocumentaryMilestones: NBWL_DOCUMENTARY_TIMELINE_4.length,
      legalAdministrativeActions:
        LEGAL_ARCHITECTURE_MATRICES.fiveAdministrativeActions.length,
      statutoryLegalQuestions:
        LEGAL_ARCHITECTURE_MATRICES.eightStatutoryQuestions.length,
      ecologicalComparisonRows: ECOLOGICAL_COMPARISON_9.length,
      biologicalGroups: BIOLOGICAL_GROUPS_9.length,
      waterAccountingComponents:
        HYDROLOGICAL_AND_ECONOMIC_MATRICES.waterAccounting8.length,
      economicBalanceRows:
        HYDROLOGICAL_AND_ECONOMIC_MATRICES.economicBalance8.length,
      financialDossierCategories:
        HYDROLOGICAL_AND_ECONOMIC_MATRICES.financialDossier14.length,
      geospatialObservationPeriods:
        GEOSPATIAL_RECONSTRUCTION_SPEC.observationPeriods9.length,
      geospatialAnalyses:
        GEOSPATIAL_RECONSTRUCTION_SPEC.geospatialAnalyses12.length,
      requiredMapLayers:
        GEOSPATIAL_RECONSTRUCTION_SPEC.requiredMapLayers7.length,
      environmentalResistanceActors: ENVIRONMENTAL_RESISTANCE_8.length,
      professionalIntrospectionCommunities: PROFESSIONAL_INTROSPECTION_8.length,
      internationalConservationPrinciples:
        CONSERVATION_TEST_AND_RECOVERY_SPEC.internationalConservationTest11
          .length,
      alternativeScenarios:
        CONSERVATION_TEST_AND_RECOVERY_SPEC.alternativeScenarios6.length,
      recoveryScenarios:
        CONSERVATION_TEST_AND_RECOVERY_SPEC.recoveryScenarios4.length,
      immediateInvestigations:
        CONSERVATION_TEST_AND_RECOVERY_SPEC.immediateInvestigations10.length,
      padddDefinitions: WESTERN_HIMALAYAN_PADDD_SPEC.padddDefinitions3.length,
      fiveRegionAuditRows: WESTERN_HIMALAYAN_PADDD_SPEC.fiveRegionAudit5.length,
      integrityProtocolRequirements:
        WESTERN_HIMALAYAN_PADDD_SPEC.integrityProtocol12.length,
      priorityOriginalDocuments: PRIORITY_ORIGINAL_DOCUMENTS_20.length,
      identifiedPrimarySources: IDENTIFIED_PRIMARY_SOURCES_7.length,
      observatoryModules: KEW_PROTECTED_AREA_INTEGRITY_OBSERVATORY_12.length,
    },
    monographSpec: SALIM_ALI_MONOGRAPH_SPEC,
    historicalEstablishmentReconciliation:
      HISTORICAL_ESTABLISHMENT_RECONCILIATION_6,
    documentedChronology: DOCUMENTED_CHRONOLOGY_17,
    nbwlDocumentaryTimeline: NBWL_DOCUMENTARY_TIMELINE_4,
    nbwlOct2005RecommendationStats: NBWL_OCT_2005_RECOMMENDATION_STATS,
    legalArchitectureMatrices: LEGAL_ARCHITECTURE_MATRICES,
    ecologicalComparison: ECOLOGICAL_COMPARISON_9,
    biologicalGroups: {
      snowLeopardFacilityNote: BIOLOGICAL_GROUPS_9.snowLeopardFacilityNote,
      treeRemovalDiscrepancyNote:
        BIOLOGICAL_GROUPS_9.treeRemovalDiscrepancyNote,
      treeReconstructionRequirements:
        BIOLOGICAL_GROUPS_9.treeReconstructionRequirements,
      groups: [...BIOLOGICAL_GROUPS_9],
    },
    hydrologicalAndEconomicMatrices: HYDROLOGICAL_AND_ECONOMIC_MATRICES,
    geospatialReconstruction: GEOSPATIAL_RECONSTRUCTION_SPEC,
    environmentalResistance: ENVIRONMENTAL_RESISTANCE_8,
    professionalIntrospection: PROFESSIONAL_INTROSPECTION_8,
    conservationTestAndRecovery: CONSERVATION_TEST_AND_RECOVERY_SPEC,
    westernHimalayanPaddd: WESTERN_HIMALAYAN_PADDD_SPEC,
    volumes: SALIM_ALI_VOLUMES_10,
    chapters: SALIM_ALI_CHAPTERS_75,
    priorityOriginalDocuments: PRIORITY_ORIGINAL_DOCUMENTS_20,
    identifiedPrimarySources: IDENTIFIED_PRIMARY_SOURCES_7,
    kewProtectedAreaIntegrityObservatory:
      KEW_PROTECTED_AREA_INTEGRITY_OBSERVATORY_12,
  };
}

function escapeSalimAliCsvCell(value: string | number): string {
  const str = String(value ?? '');
  if (/[",\r\n]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

/**
 * Build a machine-readable RFC-4180 CSV export covering all 75 chapter protocols,
 * all 20 priority original documents, and all 12 KEW Protected Area Integrity
 * Observatory modules for
 * `/api/himalayan-dispatch/datasets/salim-ali-park-monograph-framework?format=csv`.
 */
export function buildSalimAliMonographCsv(): string {
  const headers = [
    'record_type',
    'code',
    'slug_or_id',
    'parent_group',
    'title_or_document',
    'status',
    'primary_deliverable_or_role',
    'caveat_or_standard',
    'canonical_url',
  ];

  const rows: string[][] = [headers];

  for (const ch of SALIM_ALI_CHAPTERS_75) {
    rows.push([
      'chapter',
      ch.code,
      ch.slug,
      `Volume ${ch.volumeRoman}: ${ch.volumeTitle}`,
      ch.title,
      ch.researchStatus,
      ch.deliverable,
      ch.methodologicalCaveat,
      `${SALIM_ALI_MONOGRAPH_SPEC.canonicalMonographPath}/chapters/${ch.slug}`,
    ]);
  }

  for (const doc of PRIORITY_ORIGINAL_DOCUMENTS_20) {
    rows.push([
      'priority_document',
      doc.priority,
      `priority-doc-${doc.priority}`,
      doc.custodianOrArchiveTarget,
      doc.document,
      doc.retrievalStatus,
      doc.investigativeRole,
      'Authenticated primary instrument required prior to final evidentiary certification',
      SALIM_ALI_MONOGRAPH_SPEC.kewObservatoryPath,
    ]);
  }

  for (const mod of KEW_PROTECTED_AREA_INTEGRITY_OBSERVATORY_12) {
    rows.push([
      'observatory_module',
      mod.code,
      mod.code.toLowerCase(),
      mod.connectedKewSurfaceLabel,
      mod.title,
      mod.currentStatus,
      mod.operationalFunction,
      mod.dataStandard,
      mod.connectedKewSurfaceHref,
    ]);
  }

  return rows
    .map((row) => row.map(escapeSalimAliCsvCell).join(','))
    .join('\r\n');
}


