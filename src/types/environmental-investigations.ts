// ─────────────────────────────────────────────────────────────────────────────
// KEW-EIAI: ENVIRONMENTAL INVESTIGATION & ACCOUNTABILITY INTELLIGENCE
// Canonical TypeScript Schema & Scientific Publication Contracts
// ─────────────────────────────────────────────────────────────────────────────

export type InvestigationStatus =
  | 'published'            // Peer-verified & administratively approved investigation
  | 'active_investigation' // Evidence compilation & scientific validation underway
  | 'scoping_review'       // Boundary definition, baseline audit & literature synthesis
  | 'proposed'             // Proposed investigation subject (no predetermined findings)
  | 'archived';

export type InvestigationPriority = 'Critical' | 'High' | 'Standard';

export type InvestigationSeriesId =
  | 'core-himalayan-portfolio'
  | 'dal-lake-interventions'
  | 'dachigam-national-park'
  | 'salim-ali-national-park'
  | 'drinking-water-security'
  | 'transport-air-noise'
  | 'security-transport-compliance'
  | 'environmental-economics-fiscal';

export type StatutoryComplianceClass =
  | 'Verified compliant'
  | 'Legally exempt'
  | 'Verified noncompliant'
  | 'Not verified'
  | 'Regulatory ambiguity';

export interface InvestigationSeriesDef {
  id: InvestigationSeriesId;
  shortLabel: string;
  title: string;
  subtitle: string;
  targetModules: Array<{ label: string; route: string }>;
}

export interface DuplicationAuditRecord {
  status: 'Cleared — Distinct Investigative Question' | 'Cleared — Cross-Module Accountability Complement';
  relatedSectoralCodes: string[];
  relatedInvestigationCodes: string[];
  scopeDifferentiation: string;
}

export interface StatutoryComplianceAssessmentRow {
  id: string;
  sectorOrQuestion: string;
  applicableInstrument: string;
  classification: StatutoryComplianceClass;
  evidenceAndLegalBasis: string;
  requiredInstitutionalEvidence: string;
}

export type EvidenceVerificationClass =
  | 'Documented'              // Directly established by peer-reviewed or statutory audit records
  | 'Provisionally Supported' // Plausible mechanism supported by partial empirical/remote-sensing data
  | 'Unverified'              // Requires spatial attribution, field measurement, or numerical modelling
  | 'Unsupported'             // Insufficient evidence or deterministic overreach not supported by science
  | 'Conflicting';            // Divergent findings between official records and independent studies

export type EvidenceSourceCategory =
  | 'Scientific Literature'
  | 'Government Audit Records'
  | 'Judicial & Statutory Dockets'
  | 'Satellite & GIS Archive'
  | 'Hydrological & Telemetry Series'
  | 'Institutional DPR / EIA Filing'
  | 'Technical Institute Report'
  | 'Field Survey Protocol';

export type InvestigationDomainId =
  | '01-lakes-limnology'
  | '02-wetlands-floodplains'
  | '03-rivers-hydrology'
  | '04-springs-groundwater'
  | '05-glaciers-cryosphere'
  | '06-alpine-mountain-ecology'
  | '07-infrastructure-development'
  | '08-hydropower-dams'
  | '09-forests-biodiversity'
  | '10-mining-quarrying'
  | '11-urbanisation-land-use'
  | '12-tourism-pilgrimage'
  | '13-agriculture-horticulture'
  | '14-industrial-craft-pollution'
  | '15-solid-waste-sewage'
  | '16-atmospheric-environment'
  | '17-climate-compound-hazards'
  | '18-environmental-governance';

export type DisciplineClusterId =
  | 'earth-geological'
  | 'water-aquatic'
  | 'biological-ecological'
  | 'chemical-atmospheric'
  | 'spatial-computational'
  | 'applied-environmental'
  | 'economics-natural-capital';

export type PublicationFormatId =
  | 'full-scientific'
  | 'executive-briefing'
  | 'technical-assessment'
  | 'policy-brief'
  | 'public-report'
  | 'investigative-editorial'
  | 'legal-evidence-brief'
  | 'interactive-gis'
  | 'scientific-infographic'
  | 'downloadable-pdf'
  | 'citation-record'
  | 'open-dataset';

export interface KewEcosystemModuleIntegration {
  id: string;
  moduleName: string;
  route: string;
  primaryResponsibility: string;
  eiaiIntegrationRole: string;
  sharedArtifacts: string[];
}

export interface InvestigationDomainDef {
  id: InvestigationDomainId;
  code: string; // '01' .. '18'
  name: string;
  shortLabel: string;
  scope: string;
  coreIndicators: string[];
  primaryDisciplines: string[];
  linkedKewModuleRoute: string;
  linkedKewModuleLabel: string;
  iconName: string;
}

export interface ScientificDisciplineDef {
  id: string;
  name: string;
  clusterId: DisciplineClusterId;
  clusterName: string;
  analyticalMethods: string[];
  governingEquationOrModel: string;
  equationVariablesNote: string;
  coreParameters: string[];
  himalayanLiteratureAnchor: string;
}

export interface DisciplineClusterDef {
  id: DisciplineClusterId;
  name: string;
  subtitle: string;
  iconName: string;
  accentClass: string;
  disciplines: ScientificDisciplineDef[];
}

export interface StandardReportSectionDef {
  number: string; // '01' .. '24'
  key: string;
  title: string;
  contentsDescription: string;
  conditionalDomainNote?: string;
}

export interface PublicationFormatDef {
  id: PublicationFormatId;
  title: string;
  intendedAudience: string;
  derivationRule: string;
  includedSectionNumbers: string[];
  iconName: string;
}

export interface WorkflowStageDef {
  stageNumber: string; // '01' .. '12'
  title: string;
  summary: string;
  inputs: string[];
  outputs: string[];
  aiAssistanceScope: string;
  scientificIntegrityGuardrail: string;
}

export interface EvidenceAssertionRecord {
  id: string;
  investigationCode: string;
  investigationSlug: string;
  investigationTitle: string;
  assertion: string;
  sourceCategory: EvidenceSourceCategory;
  classification: EvidenceVerificationClass;
  evidenceBasisSummary: string;
  citationIds: string[];
  methodologicalRequirement?: string;
  lastVerifiedDate: string;
}

export interface InstitutionalAccountabilityRecord {
  id: string;
  investigationCode: string;
  investigationSlug: string;
  investigationTitle: string;
  responsibleInstitution: string;
  institutionAcronym: string;
  statutoryMandate: string;
  projectOwnership: string;
  scientificResponsibility: string;
  financialResponsibility: string;
  environmentalAuthorisation: string;
  monitoringObligations: string;
  documentedFindings: string;
  institutionalResponse: string;
  outstandingQuestions: string[];
  correctiveAction: string;
  followUpStatus: 'Response Recorded' | 'Clarification Invited' | 'Corrective Action Underway' | 'Under Statutory Review' | 'Scoping Audit';
}

export interface InvestigationRecommendation {
  id: string;
  investigationCode: string;
  investigationSlug: string;
  investigationTitle: string;
  horizon: 'Immediate (0–12 Months)' | 'Medium-Term (1–3 Years)' | 'Long-Term (3–10 Years)';
  title: string;
  actionSpecification: string;
  targetInstitution: string;
  scientificJustification: string;
  verificationIndicator: string;
  status: 'Proposed' | 'Adopted in Principle' | 'Implementation Underway' | 'Verified Complete' | 'Awaiting Institutional Review';
}

export interface ChronologyEntry {
  period: string;
  eventTitle: string;
  documentedRecord: string;
  sourceRef: string;
  significance: 'Baseline' | 'Intervention' | 'Audit / Judicial' | 'Ecological Shift';
}

export interface InterventionInventoryItem {
  id: string;
  name: string;
  period: string;
  executingAgency: string;
  interventionType: string;
  reportedScaleOrOutlay: string;
  status: 'Completed' | 'Ongoing' | 'Proposed' | 'Suspended / Under Audit';
  documentedOutcome: string;
}

export interface DisciplineFinding {
  disciplineId: string;
  disciplineName: string;
  clusterName: string;
  methodologyApplied: string;
  equationOrMetricUsed: string;
  empiricalFinding: string;
  uncertaintyAndLimitations: string;
  verificationClass: EvidenceVerificationClass;
}

export interface CitationReference {
  id: string;
  authorsOrBody: string;
  year: number;
  title: string;
  publicationOrSeries: string;
  referenceType: 'Peer-Reviewed Journal' | 'Statutory Audit (CAG)' | 'Judicial Order / NGT' | 'Technical Institute Report' | 'Remote Sensing Dataset';
  doiOrOfficialRef?: string;
  externalUrl?: string;
  provenanceNote: string;
}

export interface InvestigationUpdateLog {
  date: string;
  version: string;
  entryType: 'Initial Publication' | 'Evidence Addition' | 'Official Institutional Response' | 'Methodological Clarification' | 'Correction';
  summary: string;
  verifiedBy: string;
}

export interface PrecedentCaseStudy {
  id: string;
  title: string;
  location: string;
  countryOrRegion: string;
  biomeCategory: 'Asian Lacustrine' | 'Himalayan Cryosphere' | 'European Fluvial' | 'Alpine Hazard Engineering' | 'Plateau Geomorphology' | 'Ramsar Floodplain';
  environmentalChallenge: string;
  interventionTested: string;
  scientificOutcome: string;
  transferableLessonForKashmir: string;
  structuralDifferencesNote: string;
  linkedInvestigationCodes: string[];
  keyReference: string;
}

export interface InvestigationReportSection {
  sectionNumber: string; // '01' .. '24'
  key: string;
  title: string;
  applicable: boolean;
  nonApplicableReason?: string;
  leadSummary: string;
  bodyParagraphs: string[];
  quantitativeCallouts?: Array<{
    label: string;
    value: string;
    unit?: string;
    sourceTag: string;
  }>;
}

export interface InvestigationRecord {
  code: string; // e.g. 'KEW-INV-0001'
  slug: string;
  title: string;
  subtitle: string;
  shortTitle: string;
  status: InvestigationStatus;
  statusLabel: string;
  temporalScope: string; // e.g. '1990–2026'
  initiatedDate: string;
  lastUpdated: string;
  version: string;
  featured: boolean;
  heroImage: string;
  heroImageCaption: string;

  // Geography & Spatial Envelope
  subregion:
    | 'Kashmir Valley'
    | 'Lidder–Panjal Alpine Belt'
    | 'Jhelum Basin'
    | 'Greater Himalaya'
    | 'Multi-District Kashmir Basin'
    | 'Jammu & Kashmir (State 2000–2019 / UT 2019–2027)';
  districts: string[];
  watershedOrBasin: string;
  elevationRangeM: string;
  coordinates: [number, number]; // [lat, lng]
  spatialEnvelopeKm2?: number;
  connectedEcosystems: string[];

  // Taxonomy & Cross-Module Linkages
  primaryDomainId: InvestigationDomainId;
  secondaryDomainIds: InvestigationDomainId[];
  disciplineIds: string[];
  linkedKewModules: Array<{
    moduleName: string;
    route: string;
    contributionNote: string;
  }>;
  relatedInvestigationCodes: string[];

  // Core Scientific Content
  scopingQuestions: string[];
  executiveKeyFindings: string[];
  chronology: ChronologyEntry[];
  interventionInventory: InterventionInventoryItem[];
  disciplineFindings: DisciplineFinding[];
  evidenceMatrix: EvidenceAssertionRecord[];
  accountabilityMatrix: InstitutionalAccountabilityRecord[];
  unansweredQuestions: string[];
  alternativeSolutions: Array<{
    title: string;
    mechanism: string;
    evidencePrecedent: string;
    feasibilityNote: string;
  }>;
  recommendations: InvestigationRecommendation[];
  references: CitationReference[];
  updatesLog: InvestigationUpdateLog[];
  dataGaps: string[];

  // Canonical 24-Section Publication Architecture
  sections: InvestigationReportSection[];

  // Portfolio Expansion Metadata (Thematic Series, Priority, Duplication Audit & Statutory Compliance)
  seriesId?: InvestigationSeriesId;
  seriesTitle?: string;
  priority?: InvestigationPriority;
  recommendedPublicationSequence?: number;
  centralScientificQuestion?: string;
  duplicationAudit?: DuplicationAuditRecord;
  statutoryComplianceMatrix?: StatutoryComplianceAssessmentRow[];
}

export interface InvestigationSubmissionProposal {
  id: string;
  trackingCode: string;
  title: string;
  domainId: InvestigationDomainId;
  locationName: string;
  districts: string[];
  temporalPeriod: string;
  issueDescription: string;
  documentedSourcesProvided: string;
  proposerName: string;
  proposerEmail: string;
  proposerAffiliation?: string;
  submittedAt: string;
  status: 'PENDING_TRIAGE' | 'SCOPING_APPROVED' | 'INFO_REQUESTED' | 'MERGED_INTO_EXISTING';
  adminNotes?: string;
}

export interface ValidationIssue {
  severity: 'error' | 'warning' | 'info';
  code: string;
  sectionOrItemId: string;
  message: string;
  remediation: string;
}

export interface EiaiPlatformMetrics {
  totalInvestigations: number;
  publishedCount: number;
  activeCount: number;
  scopingCount: number;
  proposedCount: number;
  domainsCoveredCount: number;
  totalDomainsDefined: number;
  disciplinesActiveCount: number;
  totalDisciplinesDefined: number;
  totalEvidenceRecords: number;
  documentedEvidenceCount: number;
  provisionallySupportedCount: number;
  unverifiedEvidenceCount: number;
  unsupportedEvidenceCount: number;
  conflictingEvidenceCount: number;
  institutionsExaminedCount: number;
  accountabilityRecordsCount: number;
  districtsCoveredCount: number;
  districtsCoveredList: string[];
  totalRecommendations: number;
  immediateRecommendationsCount: number;
  precedentsCount: number;
  totalReferencesCount: number;
  totalDataGapsCount: number;
}
