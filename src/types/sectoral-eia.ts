export type SectorType = 'tourism' | 'handicrafts' | 'agriculture' | 'horticulture';

export type ImpactSignificance = 'Negligible' | 'Low' | 'Moderate' | 'High' | 'Severe' | 'Critical';

export type ConfidenceLevel = 'Preliminary' | 'Medium' | 'High' | 'Very High';

export type PublicationStatus = 'Draft' | 'Under Scientific Review' | 'Pilot Verification' | 'Published';

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
  horizon: '2027' | '2030' | '2035' | '2040';
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
  type: 'Satellite Telemetry' | 'Field Sensor Network' | 'Peer-Reviewed Paper' | 'Government Sensor / Data' | 'Ecological Census';
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
    type: 'Enterprise' | 'Government Department' | 'Tourism Authority' | 'Artisan Guild' | 'Agricultural Board' | 'Independent Research Panel';
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
