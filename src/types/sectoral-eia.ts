export type SectorType = 'tourism' | 'handicrafts' | 'agriculture' | 'horticulture';

export type ImpactSignificance = 'Negligible' | 'Low' | 'Moderate' | 'High' | 'Severe' | 'Critical';

export type ConfidenceLevel = 'Preliminary' | 'Medium' | 'High' | 'Very High';

export type PublicationStatus = 'Draft' | 'Under Scientific Review' | 'Pilot Verification' | 'Published' | 'Calibration Stage';

export type ResearchDossierStatus =
  | 'Proposed'
  | 'Data Acquisition'
  | 'Under Investigation'
  | 'Draft Assessment'
  | 'Scientific Review'
  | 'Published'
  | 'Updated'
  | 'Archived';

/**
 * 8-Class Scientific Publication Evidence Classification (Section 24 Governance)
 * Distinguishes secondary-data assessments, systematic reviews, and modelled assessments
 * from original empirical investigations without misrepresenting secondary synthesis as KEW fieldwork.
 */
export type ScientificPublicationEvidenceClass =
  | 'Research Proposal'
  | 'Scientific Scoping Dossier'
  | 'Secondary-Data Scientific Assessment'
  | 'Systematic Scientific Review'
  | 'Modelled Environmental Assessment'
  | 'Original Empirical Investigation'
  | 'Technical Scientific Report'
  | 'Approved Scientific Publication';

export type GeographicalEvidenceTier =
  | 'Tier A' // Exact research location
  | 'Tier B' // Kashmir or directly relevant adjacent ecosystem
  | 'Tier C' // Western Himalayan region
  | 'Tier D' // Comparable Himalayan environmental system
  | 'Tier E'; // International scientific methodology or comparable case study

export type SourceAccessClassification =
  | 'Open-Access Full Text Available'
  | 'Abstract-Verified'
  | 'Metadata-Verified';

export type ScientificClaimClassification =
  | 'Verified external scientific observation'
  | 'Verified original KEW observation'
  | 'Calculated from verified data'
  | 'Modelled estimate'
  | 'Scientific interpretation'
  | 'Hypothesis'
  | 'Proposed intervention'
  | 'Unverified'
  | 'Contradicted by evidence';

export interface Admin15StageCompletionRecord {
  existingReportAudit: boolean;
  externalLiteratureSearch: boolean;
  externalSourceAcquisition: boolean;
  fullTextAnalysis: 'Completed (OA Full Text + Abstracts)' | 'Abstract-Level Only' | 'Pending';
  evidenceExtraction: boolean;
  citationVerification: boolean;
  quantitativeClaimValidation: boolean;
  scientificMethodologyDevelopment: boolean;
  chapterReconstruction: boolean;
  scientificDataIntegration: boolean;
  visualAssetValidation: boolean;
  pdfGeneration: boolean;
  functionalTesting: boolean;
  scientificReview: 'Approved' | 'Awaiting Independent Human Peer Review';
  publicationApproval: 'Approved Secondary-Data Publication' | 'Awaiting Fieldwork & Review' | 'Awaiting Scientific Sign-Off';
}

export type ResearchSeriesSectorTag =
  | 'tourism'
  | 'horticulture'
  | 'handicrafts'
  | 'agriculture'
  | 'water-resources'
  | 'mining-extraction'
  | 'urbanization'
  | 'infrastructure'
  | 'energy-hydropower'
  | 'energy'
  | 'renewable-energy'
  | 'transportation'
  | 'waste-management'
  | 'sanitation'
  | 'forestry-biodiversity'
  | 'cross-sectoral'
  // Sectors XIII–XXIII (Dossiers 41–100)
  | 'cryosphere'
  | 'snow-hydrology'
  | 'permafrost'
  | 'cryosphere-atmosphere'
  | 'glacial-hydrology'
  | 'cryosphere-ecology'
  | 'alpine-limnology'
  | 'lake-limnology'
  | 'wetland-ecology'
  | 'algal-bloom-intelligence'
  | 'fisheries'
  | 'aquatic-ecology'
  | 'drinking-water'
  | 'threatened-mammals'
  | 'high-altitude-wildlife'
  | 'avian-ecology'
  | 'botanical-diversity'
  | 'medicinal-plants'
  | 'invasive-species'
  | 'human-wildlife-conflict'
  | 'protected-area-management'
  | 'forest-carbon'
  | 'treeline-dynamics'
  | 'forest-fire-ecology'
  | 'heritage-trees'
  | 'seismic-hazards'
  | 'riverine-floods'
  | 'flash-floods'
  | 'landslides'
  | 'avalanches'
  | 'glof-intelligence'
  | 'multi-hazard-resilience'
  | 'western-disturbances'
  | 'monsoon-circulation'
  | 'extreme-weather'
  | 'climate-projections'
  | 'seasonal-phenology'
  | 'noise-pollution'
  | 'light-pollution'
  | 'emerging-contaminants'
  | 'antimicrobial-resistance'
  | 'hazardous-waste'
  | 'geological-heritage'
  | 'soil-degradation'
  | 'landscape-geography'
  | 'remote-sensing-validation'
  | 'brick-manufacturing'
  | 'livestock-industry'
  | 'recreational-ecology'
  | 'circular-resource-economy'
  | 'jammu-regional-ecology'
  | 'ladakh-regional-ecology'
  | 'ajk-regional-ecology'
  | 'gilgit-baltistan-ecology'
  | 'environmental-governance'
  | 'environmental-justice'
  | 'ngo-impact'
  | 'citizen-science'
  | 'sdg-resilience'
  | 'scientific-intelligence';

export type ResearchDivisionId =
  | 'sector-01-tourism'
  | 'sector-02-horticulture'
  | 'sector-03-handicrafts'
  | 'sector-04-agriculture'
  | 'sector-05-water-resources'
  | 'sector-06-mining-extraction'
  | 'sector-07-urbanization-infrastructure'
  | 'sector-08-energy-hydropower'
  | 'sector-09-transportation-air'
  | 'sector-10-waste-sanitation'
  | 'sector-11-forestry-biodiversity'
  | 'sector-12-cumulative-impacts'
  | 'sector-13-cryosphere-hydrology'
  | 'sector-14-aquatic-ecology'
  | 'sector-15-biodiversity-conservation'
  | 'sector-16-forestry-terrestrial'
  | 'sector-17-natural-hazards'
  | 'sector-18-climate-atmospheric'
  | 'sector-19-pollution-public-health'
  | 'sector-20-earth-geospatial'
  | 'sector-21-resource-sustainability'
  | 'sector-22-regional-transboundary'
  | 'sector-23-governance-intelligence';

export interface ResearchDuplicationScopeEntry {
  code: string;
  sequenceNumber: number;
  primaryResearchQuestion: string;
  secondaryResearchQuestions: string[];
  hypotheses: string[];
  geographicalBoundaries: string;
  environmentalReceptors: string[];
  researchDisciplines: string[];
  studyPeriod: string;
  scientificMethodology: string;
  requiredDatasets: string[];
  gisRequirements: string[];
  relatedDossierCodes: string[];
  relatedRepositoryPublications: string[];
  distinctScientificContribution: string;
  duplicationStatus: 'Cleared — Distinct Scientific Question' | 'Requires Scope Review';
  duplicationAssessmentNote: string;
}

export interface ResearchSeriesDossier {
  id: string;
  code: string; // KEW-SR-2026-01 .. KEW-SR-2026-100
  sequenceNumber: number; // 1 .. 100
  divisionId: ResearchDivisionId;
  divisionRoman: string; // 'I' .. 'XXIII'
  divisionTitle: string;
  sectorTag: ResearchSeriesSectorTag;
  /** Preserves legacy 4-sector link where applicable */
  sector?: SectorType;
  subdisciplineBanner: string;
  title: string;
  abstract: string;
  status: ResearchDossierStatus;
  /** 'March 2026' for published 01–04, 'Proposed' for 05–100 until validated */
  date: string;
  /** Confirmed page count ONLY for published/completed dossiers */
  pages?: number;
  /** Target page scope for proposed dossiers */
  targetPages?: number;
  /** Lead Investigator / Working Group (confirmed for 01–04, Proposed Working Group for 05–100) */
  author: string;
  isProposedWorkingGroup: boolean;
  badge: string;
  /** Strategic priority rank 1..15 for the 15 priority expansion studies */
  priorityRank?: number;
  /** Explicit differentiation note from related reports */
  distinctionNote?: string;
  /** Portfolio cohort: original 40 sectoral vs 60 natural-systems/hazards/governance expansion */
  portfolioCohort?: 'original_40' | 'expanded_60';
  /** Accurate 8-class evidence & methodological publication classification */
  evidencePublicationClass?: ScientificPublicationEvidenceClass;
  /** Verified external scholarly & institutional references count */
  verifiedExternalCitationsCount?: number;
  /** Derived PDF page count from synchronized binary PDF generator */
  derivedPdfPages?: number;

  // Connected KEW Operational Module & Asset Readiness Flags
  telemetryRoute: string;
  gisMapRoute: string;
  historicalComparisonRoute: string;
  indicatorsRoute: string;
  referencesRoute: string;
  linkedAssessmentId?: string;
  linkedInvestigationSlug?: string;
  recommendedDataSources: string[];
  assetReadiness: {
    reportPdfAvailable: boolean;
    telemetryAvailable: boolean;
    gisMapAvailable: boolean;
    datasetAvailable: boolean;
    historicalComparisonAvailable: boolean;
    referencesAvailable: boolean;
    indicatorsAvailable: boolean;
    updatesAvailable: boolean;
  };
}

export type SubmissionType = 'independent_scientific' | 'stakeholder_submitted';

export type TrendDirection = 'improving' | 'stable' | 'deteriorating' | 'critical';

export interface IndicatorRecord {
  id: string;
  name: string;
  category: string;
  unit: string;
  baselineValue: number;
  currentValue: number;
  thresholdLimit: number;
  trend: TrendDirection;
  score: number; // 0 (catastrophic) - 100 (pristine/sustainable)
  impactWeight: number; // 0.0 - 1.0
  source: string;
  regulatoryStandard?: string;
  notes?: string;
}

export interface CausalPathway {
  activity: string;
  primaryPressure: string;
  environmentalReceptor: string;
  ecologicalConsequence: string;
  severity: ImpactSignificance;
  evidenceBase: string;
}

export interface CumulativePressure {
  interactingSector: SectorType;
  interactionMechanism: string;
  hotspotZone: string;
  combinedImpactScore: number;
  compoundingRisk: string;
}

export interface ScenarioProjection {
  name: string;
  horizon: '2027' | '2028' | '2030' | '2035' | '2040';
  description: string;
  assumptions: string[];
  projectedStressIndex: number; // 0 - 100
  keyRisk: string;
  mitigationRequirement: string;
}

export interface MitigationPlanItem {
  id: string;
  action: string;
  hierarchyType: 'Avoidance' | 'Reduction' | 'Restoration' | 'Adaptation';
  targetIndicator: string;
  projectedReduction: string;
  status: 'Proposed' | 'Under Implementation' | 'Verified Effective' | 'Delayed';
  responsibleLead: string;
  verificationMilestone: string;
}

export interface SourceReference {
  id: string;
  title: string;
  authorOrBody: string;
  year: number;
  type: 'Satellite Telemetry' | 'Field Sensor Network' | 'Peer-Reviewed Paper' | 'Government Sensor / Data' | 'Ecological Census' | 'Field Census';
  urlOrCitation: string;
}

export interface ReviewHistoryEntry {
  stage: string;
  date: string;
  evaluator: string;
  affiliation: string;
  status: 'Approved' | 'In Review' | 'Revision Requested';
  notes: string;
}

export interface GeographicBoundary {
  name: string;
  districts: string[];
  watershed: string;
  landscapeType: string;
  coordinates: [number, number]; // [lat, lng]
  areaSqKm: number;
  polygonGeoJsonPath?: string;
}

export interface AssessmentRecord {
  id: string;
  slug: string;
  code: string; // e.g. "KEW-SEIA-2026-TR-01"
  title: string;
  formalTitle: string;
  sector: SectorType;
  submissionType: SubmissionType;
  submittingEntity?: {
    name: string;
    type: 'Enterprise' | 'Hotel/Resort' | 'Government Department' | 'Tourism Authority' | 'Artisan Guild' | 'Agricultural Board' | 'Independent Research Panel';
    contactEmail: string;
  };
  geographicBoundary: GeographicBoundary;
  assessmentPeriod: {
    startDate: string;
    endDate: string;
    temporalScale: 'Seasonal Window' | 'Annual Cycle' | 'Multi-Year Long-Term';
  };
  baseline: {
    baselineYear: string;
    referenceState: string;
    dataSources: string[];
    summary: string;
  };
  methodologyVersion: string; // e.g. "KEW-SEIAE-v2.6 (SEA & IAIA Aligned)"
  confidenceLevel: ConfidenceLevel;
  publicationStatus: PublicationStatus;
  overallScore: number; // 0 - 100 (Higher is healthier / lower ecological footprint)
  impactSignificance: ImpactSignificance;
  summary: string;
  keyFindings: string[];
  indicators: IndicatorRecord[];
  causalPathways: CausalPathway[];
  cumulativePressures: CumulativePressure[];
  scenarios: ScenarioProjection[];
  mitigationActions: MitigationPlanItem[];
  sourceReferences: SourceReference[];
  reviewHistory: ReviewHistoryEntry[];
  publishedAt?: string;
  updatedAt: string;
}

export interface SectorDefinition {
  id: SectorType;
  name: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  borderHoverColor: string;
  bgGradient: string;
  keyPressures: string[];
  primaryIndicators: string[];
  regulatoryContext: string;
  pilotCount: number;
  averageScore: number;
  landscapeCoverageSqKm: number;
  highlightedHotspots: string[];
}
