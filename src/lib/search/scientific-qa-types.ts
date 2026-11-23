// ─────────────────────────────────────────────────────────────────────────────
// KEW EVIDENCE-GROUNDED SCIENTIFIC QUESTION & SYNTHESIS — CLIENT-SAFE CONTRACTS
// Pure TypeScript interfaces, question-detection heuristics & curated inquiries
// Safe to import in both Client Components ('use client') and Server APIs
// ─────────────────────────────────────────────────────────────────────────────

import { KewSubregion, SearchDocument, SearchDomain } from './types';

export type EpistemicTierKey =
  | 'tier_1_verified'
  | 'tier_2_spaceborne_assessed'
  | 'tier_3_operational_preliminary';

export type EpistemicSufficiencyStatus =
  | 'EVIDENCE_SUPPORTED'
  | 'PARTIALLY_SUPPORTED'
  | 'INSUFFICIENT_INDEXED_EVIDENCE';

export type AnalyticalDimensionId =
  | 'temporal_change'
  | 'hydrology_cryosphere'
  | 'biodiversity_ecology'
  | 'pollution_pressures'
  | 'hazards_climate'
  | 'governance_accountability';

export interface ParsedScientificScope {
  focalEntities: string[];
  extractedKeywords: string[];
  subregions: KewSubregion[];
  districts: string[];
  watersheds: string[];
  temporalWindow: {
    fromYear?: number;
    toYear?: number;
    mode: 'unbounded' | 'since' | 'before' | 'range' | 'exact_year';
    label: string;
  };
  analyticalDimensions: Array<{
    id: AnalyticalDimensionId;
    label: string;
  }>;
}

export interface ExecutiveSynthesisBlock {
  paragraphId: string;
  heading: string;
  text: string; // Contains inline [1], [2, 3] citation markers strictly mapped to citations[]
  citationNumbers: number[];
}

export interface SynthesizedEvidenceFinding {
  citationNumber: number;
  tier: EpistemicTierKey;
  tierLabel: string;
  thematicCategory: string;
  domain: SearchDomain;
  title: string;
  subtitle?: string;
  findingStatement: string;
  quantitativeMetrics: Array<{ label: string; value: string }>;
  temporalSpanLabel: string;
  spansPreWindowBaseline: boolean;
  sourceProvenance: string;
  verificationStatus: string;
  trustBadge: string;
  canonicalUrl: string;
  subregion?: KewSubregion;
  district?: string;
}

export interface EvidenceLimitationNotice {
  category:
    | 'temporal_boundary'
    | 'verification_tier'
    | 'model_reanalysis'
    | 'spatial_or_corpus_gap';
  title: string;
  detail: string;
}

export interface CitedBibliographyEntry {
  citationNumber: number;
  tier: EpistemicTierKey;
  tierLabel: string;
  formattedReference: string;
  bibtexEntry: string;
  temporalSpanLabel: string;
  document: SearchDocument;
}

export interface RelatedObservatoryLink {
  id: string;
  title: string;
  subtitle?: string;
  canonicalUrl: string;
  parentModule: string;
}

export interface ScientificSynthesisResponse {
  question: string;
  normalizedQuestion: string;
  epistemicStatus: EpistemicSufficiencyStatus;
  epistemicStatusLabel: string;
  parsedScope: ParsedScientificScope;
  epistemicDistribution: {
    tier1VerifiedCount: number;
    tier2AssessedCount: number;
    tier3PreliminaryOrModelCount: number;
    domainsCoveredCount: number;
    totalCitedRecords: number;
  };
  executiveSynthesis: ExecutiveSynthesisBlock[];
  findings: SynthesizedEvidenceFinding[];
  limitationsAndGaps: EvidenceLimitationNotice[];
  citations: CitedBibliographyEntry[];
  relatedObservatories: RelatedObservatoryLink[];
  followUpQuestions: string[];
  markdownBrief: string;
  plainTextBibliography: string;
  bibtexExport: string;
  latencyMs: number;
  indexBuiltAt: string;
  totalCorpusSize: number;
}

export const EPISTEMIC_TIER_META: Record<
  EpistemicTierKey,
  {
    shortCode: string;
    title: string;
    subtitle: string;
    methodologyNote: string;
  }
> = {
  tier_1_verified: {
    shortCode: 'Tier I · Verified Primary & Statutory',
    title: 'Peer-Reviewed, Statutory, Judicial & Field-Verified Evidence',
    subtitle: 'Authenticated court dockets, statutory audits (CAG/NWIA/Census), peer-reviewed research & dGPS/ground-station measurements',
    methodologyNote:
      'Corroborated via institutional publication, judicial registry filing, or physical field instrumentation.',
  },
  tier_2_spaceborne_assessed: {
    shortCode: 'Tier II · Spaceborne & Scientific Assessment',
    title: 'Multi-Sensor Satellite Series & KEW Scientific Assessments',
    subtitle: 'Calibrated Landsat/Sentinel multi-epoch observatories, Loss & Recovery ledgers, and SEIAE impact assessments',
    methodologyNote:
      'Derived from atmospherically corrected multi-temporal remote sensing and structured environmental impact protocols.',
  },
  tier_3_operational_preliminary: {
    shortCode: 'Tier III · Operational, Preliminary & Reanalysis',
    title: 'Operational Advisories, Preliminary Candidate Alerts & Model Grids',
    subtitle: 'Active warnings, Tier 1 candidate satellite anomalies pending peer sign-off, CAMS/ECMWF reanalysis nodes & community logs',
    methodologyNote:
      'Separated strictly from verified historical baselines; preliminary candidate alerts and numerical reanalysis grids carry explicit uncertainty.',
  },
};

export const EXAMPLE_SCIENTIFIC_QUESTIONS: Array<{
  question: string;
  domainTag: string;
  scopeHint: string;
}> = [
  {
    question: 'What environmental changes have been documented around Wular Lake since 2000?',
    domainTag: 'Multi-Domain Longitudinal',
    scopeHint: 'Satellite epochs · WUCMA desiltation · CAG 2025 audit · High Court PIL',
  },
  {
    question: 'What is the conservation status, population baseline, and corridor network of Hangul in Dachigam?',
    domainTag: 'Biodiversity & Conservation',
    scopeHint: 'IUCN Critically Endangered · Protected areas · Migratory corridors',
  },
  {
    question: 'How rapidly is Kolahoi Glacier retreating and what cryosphere changes are documented in Kashmir?',
    domainTag: 'Cryosphere & Glaciology',
    scopeHint: '1985–2026 snout dGPS · Geodetic mass balance · Proglacial GLOF risk',
  },
  {
    question: 'What High Court and NGT judicial compliance directives address Dal Lake sewage, houseboats, and encroachment?',
    domainTag: 'Judicial & Urban Hydrology',
    scopeHint: 'PIL dockets · 2024 LCMA GIS houseboat census · STP compliance',
  },
  {
    question: 'Which glacial lakes and glaciers in Gilgit-Baltistan and Ladakh have documented GLOF or recession risk?',
    domainTag: 'Trans-Himalayan Hazards',
    scopeHint: 'Gilgit · Baltistan · Ladakh · Karakoram cryosphere & GLOF inventory',
  },
  {
    question: 'What are the documented rates and drivers of Karewa and paddy land conversion in Pulwama and Budgam?',
    domainTag: 'Land Systems & SEIAE',
    scopeHint: 'Pampore saffron pilot · Brick kilns · Springshed recharge loss',
  },
];

const INTERROGATIVE_START_RX =
  /^(what|which|how|why|where|when|who|summarize|summarise|assess|compare|explain|describe|analyze|analyse|list|document|are\s+there|is\s+there|have\s+there|has\s+the)\b/i;

const QUESTION_INTENT_PHRASE_RX =
  /\b(since\s+\d{4}|after\s+\d{4}|between\s+\d{4}\s+and\s+\d{4}|changes?\s+in|changes?\s+around|documented\s+around|documented\s+in|status\s+of|impact\s+of|drivers?\s+of|threats?\s+to|compliance\s+directives?|trends?\s+in)\b/i;

/**
 * Lightweight client-safe detector for natural-language scientific questions
 * vs short keyword/entity lookups.
 */
export function isScientificQuestionLike(rawQuery: string): boolean {
  const q = (rawQuery || '').trim();
  if (q.length < 12) return false;
  if (q.endsWith('?')) return true;
  const wordCount = q.split(/\s+/).length;
  if (wordCount >= 4 && INTERROGATIVE_START_RX.test(q)) return true;
  if (wordCount >= 5 && QUESTION_INTENT_PHRASE_RX.test(q)) return true;
  return false;
}
