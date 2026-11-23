// ─────────────────────────────────────────────────────────────────────────────
// KEW EVIDENCE-GROUNDED SCIENTIFIC QUESTION & CITED SYNTHESIS ENGINE
// Zero-Hallucination, Epistemically Stratified Multi-Domain Evidence Compiler
// Assembles answers STRICTLY AND EXCLUSIVELY from traceable KEW SearchDocument
// records with verifiable [1..N] inline citations and explicit gap disclosure.
// ─────────────────────────────────────────────────────────────────────────────

import { KewSubregion, SearchDocument, SearchDomain, SEARCH_DOMAIN_META } from './types';
import { getCompiledSearchCorpus } from './index-builder';
import { SIX_KEW_SUBREGIONS } from './multilingual-gazetteer';
import {
  AnalyticalDimensionId,
  CitedBibliographyEntry,
  EPISTEMIC_TIER_META,
  EpistemicSufficiencyStatus,
  EpistemicTierKey,
  EvidenceLimitationNotice,
  ExecutiveSynthesisBlock,
  ParsedScientificScope,
  RelatedObservatoryLink,
  ScientificSynthesisResponse,
  SynthesizedEvidenceFinding,
} from './scientific-qa-types';

// Conversational & interrogative scaffolding stripped during subject-token extraction
const QUESTION_SCAFFOLD_STOPWORDS = new Set([
  'what', 'which', 'how', 'why', 'where', 'when', 'who', 'whom', 'whose',
  'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'do', 'does', 'did', 'can', 'could', 'would', 'should', 'may', 'might',
  'the', 'a', 'an', 'of', 'in', 'on', 'at', 'by', 'for', 'with', 'from',
  'to', 'into', 'onto', 'upon', 'around', 'near', 'across', 'throughout',
  'within', 'between', 'among', 'over', 'under', 'since', 'after', 'before',
  'during', 'until', 'through', 'about', 'regarding', 'concerning', 'related',
  'and', 'or', 'as', 'well', 'such', 'there', 'their', 'these', 'those', 'this', 'that',
  'documented', 'recorded', 'observed', 'reported', 'indexed', 'known', 'available',
  'summarize', 'summarise', 'assess', 'explain', 'describe', 'compare', 'tell', 'me',
  'show', 'give', 'list', 'find', 'major', 'main', 'key', 'primary', 'recent', 'current',
  'rapidly', 'much', 'many', 'most', 'any', 'all', 'other',
]);

// Generic domain/analytical words that convey INTENT, not entity specificity!
// Used so out-of-corpus queries like "What species live in the Mariana Trench?"
// cannot pass the coverage gate merely by matching the generic word "species".
const GENERIC_DOMAIN_INTENT_WORDS = new Set([
  'environmental', 'environment', 'ecological', 'ecology', 'scientific',
  'change', 'changes', 'changed', 'changing', 'trend', 'trends', 'rate', 'rates',
  'status', 'baseline', 'inventory', 'history', 'historical', 'impact', 'impacts',
  'driver', 'drivers', 'pressure', 'pressures', 'threat', 'threats', 'stress', 'stressor',
  'species', 'animal', 'animals', 'plant', 'plants', 'wildlife', 'habitat', 'habitats',
  'population', 'corridor', 'corridors', 'conservation', 'protected', 'area', 'areas',
  'water', 'lake', 'lakes', 'wetland', 'wetlands', 'river', 'rivers', 'stream', 'streams',
  'spring', 'springs', 'glacier', 'glaciers', 'cryosphere', 'snow', 'ice', 'basin', 'watershed',
  'recession', 'retreat', 'retreating', 'shrinkage', 'loss', 'recovery', 'encroachment',
  'conversion', 'land', 'soil', 'forest', 'forests', 'pollution', 'quality', 'sewage',
  'waste', 'hazard', 'hazards', 'risk', 'risks', 'alert', 'alerts', 'flood', 'floods',
  'judicial', 'court', 'high', 'compliance', 'directive', 'directives', 'address', 'addresses',
  'live', 'living', 'found', 'located', 'exist', 'region', 'district', 'districts', 'valley',
]);

const ANALYTICAL_DIMENSION_RULES: Array<{
  id: AnalyticalDimensionId;
  label: string;
  patterns: RegExp[];
  boostedDomains: SearchDomain[];
  boostedKeywords: string[];
}> = [
  {
    id: 'temporal_change',
    label: 'Longitudinal Environmental Change & Land Transformation',
    patterns: [
      /\b(change|changes|trend|trends|since\s+\d{4}|after\s+\d{4}|between\s+\d{4}|shrinkage|contraction|loss|recovery|encroachment|conversion|recession|retreat|retreating|transformation|historical|multi-decadal|over\s+time)\b/i,
    ],
    boostedDomains: ['earth_human_impact', 'water_cryosphere', 'scientific_research'],
    boostedKeywords: ['change', 'epoch', 'baseline', 'loss', 'recovery', 'encroachment', 'shrinkage', 'retreat', 'conversion', 'ledger'],
  },
  {
    id: 'hydrology_cryosphere',
    label: 'Hydrology, Limnology & Cryosphere Dynamics',
    patterns: [
      /\b(wular|dal|nigeen|manasbal|sheshnag|hokersar|lake|wetland|ramsar|river|jhelum|chenab|indus|neelum|spring|springshed|discharge|aquifer|siltation|dredging|desiltation|glacier|kolahoi|cryosphere|snowpack|mass\s+balance|water\s+quality|nwia|trophic|algal)\b/i,
    ],
    boostedDomains: ['water_cryosphere', 'earth_human_impact', 'hazard_intelligence'],
    boostedKeywords: ['open water', 'wetland', 'hydrology', 'siltation', 'glacier', 'terminus', 'discharge', 'ramsar', 'bathymetry'],
  },
  {
    id: 'biodiversity_ecology',
    label: 'Biodiversity, Threatened Taxa & Habitat Connectivity',
    patterns: [
      /\b(species|hangul|stag|snow\s+leopard|markhor|bear|trout|bird|flora|fauna|medicinal|iucn|endangered|threatened|population|census|corridor|dachigam|sanctuary|national\s+park|biodiversity|phenology|pollinator|migration|chinar|forest)\b/i,
    ],
    boostedDomains: ['biodiversity_conservation', 'ecological_calendar', 'scientific_research'],
    boostedKeywords: ['iucn', 'population', 'habitat', 'corridor', 'conservation', 'protected area', 'endemic'],
  },
  {
    id: 'pollution_pressures',
    label: 'Anthropogenic Stressors, Pollution & Carrying Capacity',
    patterns: [
      /\b(pollution|sewage|wastewater|stp|houseboat|houseboats|nutrient|nitrate|phosphate|eutrophication|pesticide|fertilizer|air\s+quality|aqi|pm2\.5|noise|plastic|solid\s+waste|mining|quarrying|brick\s+kiln|karewa|paddy|tourism|carrying\s+capacity|driver|drivers)\b/i,
    ],
    boostedDomains: ['environmental_monitoring', 'scientific_research', 'earth_human_impact'],
    boostedKeywords: ['sewage', 'stp', 'nutrient', 'pollution', 'mining', 'brick', 'carrying capacity', 'cumulative', 'houseboat'],
  },
  {
    id: 'hazards_climate',
    label: 'Multi-Hazard Risk, Extreme Weather & Cryospheric Outbursts',
    patterns: [
      /\b(hazard|flood|flash\s+flood|glof|outburst|landslide|avalanche|earthquake|seismic|wildfire|forest\s+fire|western\s+disturbance|monsoon|jet\s+stream|cloudburst|extreme\s+rainfall|heatwave|cold\s+wave|drought|blizzard|warning|alert)\b/i,
    ],
    boostedDomains: ['hazard_intelligence', 'water_cryosphere', 'earth_human_impact'],
    boostedKeywords: ['hazard', 'flood', 'glof', 'avalanche', 'landslide', 'western disturbance', 'risk', 'extreme'],
  },
  {
    id: 'governance_accountability',
    label: 'Judicial Oversight, PIL Directives & Statutory Compliance',
    patterns: [
      /\b(pil|litigation|high\s+court|ngt|tribunal|judicial|court|order|directive|directives|compliance|statute|act|law|legal|accountability|audit|cag|wucma|lcma|jkpcc|clearance|eia)\b/i,
    ],
    boostedDomains: ['environmental_accountability', 'scientific_research'],
    boostedKeywords: ['pil', 'court', 'directive', 'compliance', 'statutory', 'audit', 'cag', 'jurisdiction'],
  },
];

function normalizeText(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFKC')
    .replace(/['’`]/g, '')
    .replace(/[^\p{L}\p{M}\p{N}\s.-]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenizeWords(str: string): string[] {
  const norm = normalizeText(str);
  if (!norm) return [];
  return norm
    .split(/[\s/—–-]+/)
    .map((w) => w.replace(/^\.+|\.+$/g, ''))
    .filter((w) => w.length >= 2 && !/^\d{4}$/.test(w));
}

function parseTemporalWindow(rawQuestion: string): ParsedScientificScope['temporalWindow'] {
  const q = rawQuestion.trim();

  // Range: between YYYY and YYYY | from YYYY to YYYY | YYYY-YYYY
  const rangeMatch =
    q.match(/\b(?:between|from)\s+((?:19|20)\d{2})\s+(?:and|to|through)\s+((?:19|20)\d{2})\b/i) ||
    q.match(/\b((?:19|20)\d{2})\s*[–-]\s*((?:19|20)\d{2})\b/);
  if (rangeMatch) {
    const y1 = Math.min(Number(rangeMatch[1]), Number(rangeMatch[2]));
    const y2 = Math.max(Number(rangeMatch[1]), Number(rangeMatch[2]));
    return {
      fromYear: y1,
      toYear: y2,
      mode: 'range',
      label: `${y1}–${y2} Observation Window`,
    };
  }

  // Since / After / Post YYYY
  const sinceMatch = q.match(/\b(?:since|after|post[- ]|from)\s+((?:19|20)\d{2})(?:\s+onwards?)?\b/i);
  if (sinceMatch) {
    const yr = Number(sinceMatch[1]);
    return {
      fromYear: yr,
      mode: 'since',
      label: `≥ ${yr} (Including Longitudinal Series Spanning Post-${yr})`,
    };
  }

  // Before / Prior to YYYY
  const beforeMatch = q.match(/\b(?:before|prior\s+to|pre[- ]|up\s+to)\s+((?:19|20)\d{2})\b/i);
  if (beforeMatch) {
    const yr = Number(beforeMatch[1]);
    return {
      toYear: yr,
      mode: 'before',
      label: `≤ ${yr} Historical Window`,
    };
  }

  // Last / Past N years or decades
  const relMatch = q.match(/\b(?:last|past)\s+(\d{1,2})\s+(years?|decades?)\b/i);
  if (relMatch) {
    const n = Number(relMatch[1]);
    const mult = relMatch[2].toLowerCase().startsWith('decade') ? 10 : 1;
    const fromYear = Math.max(1950, 2026 - n * mult);
    return {
      fromYear,
      mode: 'since',
      label: `≥ ${fromYear} (Past ${n} ${relMatch[2]})`,
    };
  }

  // Single explicit year: in YYYY
  const exactMatch = q.match(/\b(?:in|during)\s+((?:19|20)\d{2})\b/i);
  if (exactMatch) {
    const yr = Number(exactMatch[1]);
    return {
      fromYear: yr,
      toYear: yr,
      mode: 'exact_year',
      label: `Year ${yr}`,
    };
  }

  return {
    mode: 'unbounded',
    label: 'All Indexed Epochs (Historical Baseline to 2026 Operational)',
  };
}

interface DocTemporalSpan {
  startYear?: number;
  endYear?: number;
  isMultiEpochSeries: boolean;
  label: string;
}

function extractDocumentTemporalSpan(doc: SearchDocument): DocTemporalSpan {
  const years = new Set<number>();

  const pushYearStr = (s?: string) => {
    if (!s) return;
    const matches = s.match(/\b(19[5-9]\d|20[0-2]\d)\b/g);
    if (matches) {
      for (const m of matches) {
        const y = Number(m);
        if (y >= 1950 && y <= 2028) years.add(y);
      }
    }
  };

  pushYearStr(doc.observationTimestamp);
  pushYearStr(doc.lastUpdated);
  pushYearStr(doc.title);
  pushYearStr(doc.subtitle);
  pushYearStr(doc.description);

  const sorted = Array.from(years).sort((a, b) => a - b);
  if (sorted.length === 0) {
    const fallbackLabel =
      doc.temporalNature === 'operational_feed'
        ? 'Current Operational Registry'
        : doc.temporalNature === 'forecast'
        ? 'Forecast / Guidance Window'
        : 'Reference Baseline';
    return { isMultiEpochSeries: false, label: fallbackLabel };
  }

  const startYear = sorted[0];
  const endYear = sorted[sorted.length - 1];
  const isMultiEpochSeries = endYear > startYear && endYear - startYear >= 3;

  return {
    startYear,
    endYear,
    isMultiEpochSeries,
    label: startYear === endYear ? `${startYear}` : `${startYear}–${endYear}`,
  };
}

export function classifyEpistemicTier(doc: SearchDocument): EpistemicTierKey {
  const verif = (doc.verificationStatus || '').toLowerCase();
  const titleSub = `${doc.title} ${doc.subtitle || ''}`.toLowerCase();

  // Preliminary Tier 1 candidate alerts & numerical reanalysis models & community logs -> Tier 3
  if (
    verif.includes('tier 1') ||
    verif.includes('preliminary') ||
    verif.includes('candidate') && !verif.includes('tier 2') && !verif.includes('confirmed') ||
    doc.trustBadge === 'Modelled / Reanalysis' ||
    doc.trustBadge === 'Community Reported' ||
    doc.trustBadge === 'Official Warning' ||
    doc.temporalNature === 'forecast'
  ) {
    return 'tier_3_operational_preliminary';
  }

  // Peer-reviewed, Statutory/Judicial, and Field-Verified (including Tier 2/3 confirmed satellite findings) -> Tier 1
  if (
    doc.trustBadge === 'Statutory / Judicial Record' ||
    doc.trustBadge === 'Peer-Reviewed / Institutional' ||
    doc.trustBadge === 'Field Verified' ||
    verif.includes('tier 3 peer audited') ||
    verif.includes('tier 2: scientifically verified') ||
    verif.includes('tier 2 confirmed')
  ) {
    return 'tier_1_verified';
  }

  // Multi-epoch satellite series & KEW structured SEIAE assessments -> Tier 2
  if (
    doc.trustBadge === 'Satellite-Derived' ||
    doc.trustBadge === 'KEW Scientific Assessment' ||
    titleSub.includes('observatory') ||
    titleSub.includes('ledger')
  ) {
    return 'tier_2_spaceborne_assessed';
  }

  return 'tier_2_spaceborne_assessed';
}

interface PreparedQAEntry {
  doc: SearchDocument;
  baseEntityNorm: string;
  titleNorm: string;
  synNorms: string[];
  searchableBlob: string;
  tokenSet: Set<string>;
  temporalSpan: DocTemporalSpan;
}

const globalForQA = globalThis as unknown as {
  __kewQABuiltAt?: string;
  __kewQAPrepared?: PreparedQAEntry[];
  __kewQATokenDocFreq?: Map<string, number>;
  __kewQAPrimaryEntities?: Array<{
    phraseNorm: string;
    canonicalName: string;
    doc: SearchDocument;
    tokenCount: number;
  }>;
};

function getPreparedQACorpus() {
  const corpus = getCompiledSearchCorpus();
  if (
    globalForQA.__kewQABuiltAt === corpus.builtAt &&
    globalForQA.__kewQAPrepared &&
    globalForQA.__kewQATokenDocFreq &&
    globalForQA.__kewQAPrimaryEntities
  ) {
    return {
      corpus,
      prepared: globalForQA.__kewQAPrepared,
      tokenDf: globalForQA.__kewQATokenDocFreq,
      primaryEntities: globalForQA.__kewQAPrimaryEntities,
    };
  }

  const tokenDf = new Map<string, number>();
  const primaryEntitiesMap = new Map<
    string,
    { phraseNorm: string; canonicalName: string; doc: SearchDocument; tokenCount: number }
  >();

  const CORE_PRIMARY_TYPES = new Set([
    'lake',
    'wetland',
    'river',
    'spring',
    'glacier',
    'protected_area',
    'species',
  ]);

  const SECONDARY_SPATIAL_TYPES = new Set(['watershed', 'corridor']);

  const prepared: PreparedQAEntry[] = corpus.documents.map((doc) => {
    const baseName = doc.title.split(/\s+[—–(]\s*|\s+\(/)[0].trim();
    const baseEntityNorm = normalizeText(baseName);
    const titleNorm = normalizeText(doc.title);
    const synNorms = [
      ...(doc.synonyms || []),
      ...(doc.multilingualTerms?.ur || []),
      ...(doc.multilingualTerms?.ks || []),
      ...(doc.multilingualTerms?.hi || []),
      ...(doc.multilingualTerms?.translit || []),
    ]
      .map(normalizeText)
      .filter((s) => s.length >= 3);

    const searchableBlob = normalizeText(
      [
        doc.title,
        doc.subtitle,
        doc.description,
        (doc.tags || []).join(' '),
        (doc.synonyms || []).join(' '),
        doc.district,
        (doc.districts || []).join(' '),
        doc.watershed,
        doc.subregion,
        doc.source,
      ]
        .filter(Boolean)
        .join(' ')
    );

    const tokens = tokenizeWords(searchableBlob);
    const tokenSet = new Set(tokens);
    for (const t of tokenSet) {
      tokenDf.set(t, (tokenDf.get(t) || 0) + 1);
    }

    return {
      doc,
      baseEntityNorm,
      titleNorm,
      synNorms,
      searchableBlob,
      tokenSet,
      temporalSpan: extractDocumentTemporalSpan(doc),
    };
  });

  // Pass A: Exact canonical titles of Core Primary Entities (Lake, Wetland, Glacier, Species, Protected Area, River, Spring)
  for (const p of prepared) {
    if (!CORE_PRIMARY_TYPES.has(p.doc.documentType) || p.baseEntityNorm.length < 4) continue;
    const baseName = p.doc.title.split(/\s+[—–(]\s*|\s+\(/)[0].trim();
    const tc = p.baseEntityNorm.split(/\s+/).length;
    if (tc >= 2 || !GENERIC_DOMAIN_INTENT_WORDS.has(p.baseEntityNorm)) {
      if (!primaryEntitiesMap.has(p.baseEntityNorm)) {
        primaryEntitiesMap.set(p.baseEntityNorm, {
          phraseNorm: p.baseEntityNorm,
          canonicalName: baseName,
          doc: p.doc,
          tokenCount: tc,
        });
      }
    }
  }

  // Pass B: Taxonomic / vernacular synonyms for Species & Protected Areas (e.g. "Hangul" -> "Kashmir Stag", "Dachigam" -> "Dachigam National Park")
  for (const p of prepared) {
    if (p.doc.documentType !== 'species' && p.doc.documentType !== 'protected_area') continue;
    const baseName = p.doc.title.split(/\s+[—–(]\s*|\s+\(/)[0].trim();
    for (const syn of p.doc.synonyms || []) {
      const sClean = syn.split('(')[0].trim();
      const sNorm = normalizeText(sClean);
      const stc = sNorm.split(/\s+/).length;
      if (sNorm.length >= 4 && (stc >= 2 || !GENERIC_DOMAIN_INTENT_WORDS.has(sNorm))) {
        if (!primaryEntitiesMap.has(sNorm)) {
          const displayLabel =
            p.doc.documentType === 'species' && !baseName.toLowerCase().includes(sClean.toLowerCase())
              ? `${sClean} (${baseName})`
              : baseName;
          primaryEntitiesMap.set(sNorm, {
            phraseNorm: sNorm,
            canonicalName: displayLabel,
            doc: p.doc,
            tokenCount: stc,
          });
        }
      }
    }
    // Also allow short protected area name (e.g. "Dachigam" for "Dachigam National Park")
    if (p.doc.documentType === 'protected_area') {
      const shortPa = baseName
        .replace(/\b(national\s+park|wildlife\s+sanctuary|conservation\s+reserve|wetland\s+reserve|ramsar\s+site)\b/gi, '')
        .trim();
      const shortNorm = normalizeText(shortPa);
      if (shortNorm.length >= 5 && !GENERIC_DOMAIN_INTENT_WORDS.has(shortNorm) && !primaryEntitiesMap.has(shortNorm)) {
        primaryEntitiesMap.set(shortNorm, {
          phraseNorm: shortNorm,
          canonicalName: baseName,
          doc: p.doc,
          tokenCount: shortNorm.split(/\s+/).length,
        });
      }
    }
  }

  // Pass C: Exact canonical titles of Secondary Spatial Entities (Watersheds & Corridors) if not already claimed
  for (const p of prepared) {
    if (!SECONDARY_SPATIAL_TYPES.has(p.doc.documentType) || p.baseEntityNorm.length < 4) continue;
    const baseName = p.doc.title.split(/\s+[—–(]\s*|\s+\(/)[0].trim();
    const tc = p.baseEntityNorm.split(/\s+/).length;
    if ((tc >= 2 || !GENERIC_DOMAIN_INTENT_WORDS.has(p.baseEntityNorm)) && !primaryEntitiesMap.has(p.baseEntityNorm)) {
      primaryEntitiesMap.set(p.baseEntityNorm, {
        phraseNorm: p.baseEntityNorm,
        canonicalName: baseName,
        doc: p.doc,
        tokenCount: tc,
      });
    }
  }

  const primaryEntities = Array.from(primaryEntitiesMap.values()).sort(
    (a, b) => b.phraseNorm.length - a.phraseNorm.length
  );

  globalForQA.__kewQABuiltAt = corpus.builtAt;
  globalForQA.__kewQAPrepared = prepared;
  globalForQA.__kewQATokenDocFreq = tokenDf;
  globalForQA.__kewQAPrimaryEntities = primaryEntities;

  return { corpus, prepared, tokenDf, primaryEntities };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsWholePhrase(haystackNorm: string, phraseNorm: string): boolean {
  if (!phraseNorm) return false;
  const rx = new RegExp(`(?:^|\\s)${escapeRegExp(phraseNorm)}(?:$|\\s)`);
  return rx.test(haystackNorm);
}

function formatInstitutionalCitation(doc: SearchDocument, spanLabel: string): string {
  const authorOrSource = doc.source || 'Kashmir EcoWatch Scientific Registry';
  const yrMatch = spanLabel.match(/\b(19\d{2}|20\d{2})\b/g);
  const yearPart = yrMatch ? yrMatch[yrMatch.length - 1] : '2026';
  return `${authorOrSource} (${yearPart}). "${doc.title}." Kashmir EcoWatch (${doc.parentModule}) [${doc.trustBadge}; ${doc.verificationStatus}]. Canonical URI: ${doc.canonicalUrl}`;
}

function formatBibtexEntry(citationNumber: number, doc: SearchDocument, spanLabel: string): string {
  const yrMatch = spanLabel.match(/\b(19\d{2}|20\d{2})\b/g);
  const yearPart = yrMatch ? yrMatch[yrMatch.length - 1] : '2026';
  const cleanKey = `kew_${citationNumber}_${doc.id.replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 28)}`;
  const cleanTitle = doc.title.replace(/[{}"]/g, '');
  const cleanAuthor = (doc.source || 'Kashmir EcoWatch').replace(/[{}"]/g, '');
  return `@misc{${cleanKey},
  author = {${cleanAuthor}},
  title = {{${cleanTitle}}},
  year = {${yearPart}},
  howpublished = {Kashmir EcoWatch — ${doc.parentModule} (${doc.trustBadge})},
  note = {Verification: ${doc.verificationStatus}. Temporal scope: ${spanLabel}},
  url = {https://kashmir-ecowatch.com${doc.canonicalUrl}}
}`;
}

function buildThematicCategoryLabel(doc: SearchDocument): string {
  switch (doc.domain) {
    case 'earth_human_impact':
      return 'Multi-Epoch Satellite Change & Earth Systems';
    case 'water_cryosphere':
      return 'Hydrological, Wetland & Cryosphere Baselines';
    case 'environmental_accountability':
      return 'Statutory Oversight & Judicial PIL Directives';
    case 'scientific_research':
      return 'Sectoral EIA, Audits & Peer-Reviewed Research';
    case 'biodiversity_conservation':
      return 'Biodiversity, Taxonomic Status & Habitat Corridors';
    case 'hazard_intelligence':
      return 'Atmospheric, Hydro-Meteorological & Cryospheric Hazards';
    case 'environmental_monitoring':
      return 'Environmental Quality, Infrastructure & Telemetry';
    case 'ecological_calendar':
      return 'Seasonal Phenology, Migration & Pollinator Ecology';
    case 'community_participation':
      return 'Stewardship, Green Heroes & Citizen Observations';
    default:
      return SEARCH_DOMAIN_META[doc.domain]?.label || 'Environmental Intelligence';
  }
}

export interface AskScientificQuestionOptions {
  question: string;
  subregion?: KewSubregion | 'all' | 'Gilgit-Baltistan';
  verifiedOnly?: boolean;
  maxCitations?: number;
}

export async function executeScientificQuestionSynthesis(
  options: AskScientificQuestionOptions
): Promise<ScientificSynthesisResponse> {
  const t0 = performance.now();
  const { corpus, prepared, tokenDf, primaryEntities } = getPreparedQACorpus();

  const rawQuestion = (options.question || '').trim();
  const qNorm = normalizeText(rawQuestion);
  const maxCitations = Math.min(18, Math.max(6, options.maxCitations || 14));

  // 1. Parse Temporal Window
  const temporalWindow = parseTemporalWindow(rawQuestion);

  // 2. Parse Explicit Subregions, Districts & Watersheds in Question
  const explicitSubregions = new Set<KewSubregion>();
  const explicitDistricts = new Set<string>();
  const explicitWatersheds = new Set<string>();

  if (options.subregion && options.subregion !== 'all') {
    if (options.subregion === 'Gilgit-Baltistan') {
      explicitSubregions.add('Gilgit');
      explicitSubregions.add('Baltistan');
    } else {
      explicitSubregions.add(options.subregion);
    }
  }

  if (/\bgilgit[\s-]*baltistan\b/i.test(rawQuestion)) {
    explicitSubregions.add('Gilgit');
    explicitSubregions.add('Baltistan');
  }

  for (const sr of SIX_KEW_SUBREGIONS) {
    const srNorm = normalizeText(sr.subregion);
    if (containsWholePhrase(qNorm, srNorm)) {
      // Avoid tagging 'Kashmir' alone if the phrase was specifically 'Azad Kashmir'
      if (sr.subregion === 'Kashmir' && containsWholePhrase(qNorm, 'azad kashmir') && !/\bkashmir\s+valley\b/i.test(rawQuestion)) {
        // handled by Azad Kashmir
      } else {
        explicitSubregions.add(sr.subregion);
      }
    }
    for (const d of sr.districts) {
      const dClean = d.replace(/\s*\(ajk\)/i, '').trim();
      const dNorm = normalizeText(dClean);
      if (dNorm.length >= 3 && containsWholePhrase(qNorm, dNorm)) {
        explicitDistricts.add(dClean);
      }
    }
    for (const w of sr.watersheds) {
      const wNorm = normalizeText(w);
      if (containsWholePhrase(qNorm, wNorm)) {
        explicitWatersheds.add(w);
      }
    }
  }

  // 3. Detect Focal Canonical Entities (Longest non-overlapping phrase match)
  const matchedFocalEntities: Array<{ canonicalName: string; doc: SearchDocument; phraseNorm: string }> = [];
  const consumedSpans: string[] = [];

  for (const ent of primaryEntities) {
    if (!containsWholePhrase(qNorm, ent.phraseNorm)) continue;
    // Skip if already subsumed by a longer matched phrase
    if (consumedSpans.some((s) => s.includes(ent.phraseNorm))) continue;
    consumedSpans.push(ent.phraseNorm);
    if (!matchedFocalEntities.some((m) => m.canonicalName === ent.canonicalName)) {
      matchedFocalEntities.push({
        canonicalName: ent.canonicalName,
        doc: ent.doc,
        phraseNorm: ent.phraseNorm,
      });
    }
  }

  // Also infer entity-linked geography for spatial context (without overriding explicit filters)
  const inferredDistricts = new Set<string>(explicitDistricts);
  const inferredSubregions = new Set<KewSubregion>(explicitSubregions);
  const inferredWatersheds = new Set<string>(explicitWatersheds);

  for (const fe of matchedFocalEntities) {
    if (fe.doc.subregion && fe.doc.subregion !== 'Multi-Regional' && explicitSubregions.size === 0) {
      inferredSubregions.add(fe.doc.subregion);
    }
    if (fe.doc.district) {
      fe.doc.district
        .split(/[,/&•]+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .forEach((d) => inferredDistricts.add(d));
    }
    for (const d of fe.doc.districts || []) inferredDistricts.add(d);
    if (fe.doc.watershed) inferredWatersheds.add(fe.doc.watershed);
  }

  // 4. Detect Analytical Dimensions
  const matchedDimensions = ANALYTICAL_DIMENSION_RULES.filter((rule) =>
    rule.patterns.some((rx) => rx.test(rawQuestion))
  );
  if (matchedDimensions.length === 0) {
    matchedDimensions.push(ANALYTICAL_DIMENSION_RULES[0]);
  }

  // 5. Extract Residual Content Tokens & Specific Anchor Tokens
  const allQuestionTokens = tokenizeWords(rawQuestion).filter((w) => !QUESTION_SCAFFOLD_STOPWORDS.has(w));
  const specificAnchorTokens = allQuestionTokens.filter((w) => !GENERIC_DOMAIN_INTENT_WORDS.has(w));
  const unknownAnchorTokens = specificAnchorTokens.filter((w) => !tokenDf.has(w));

  const parsedScope: ParsedScientificScope = {
    focalEntities: matchedFocalEntities.map((e) => e.canonicalName),
    extractedKeywords: specificAnchorTokens.length > 0 ? specificAnchorTokens : allQuestionTokens.slice(0, 6),
    subregions: Array.from(inferredSubregions),
    districts: Array.from(inferredDistricts).slice(0, 8),
    watersheds: Array.from(inferredWatersheds).slice(0, 4),
    temporalWindow,
    analyticalDimensions: matchedDimensions.map((d) => ({ id: d.id, label: d.label })),
  };

  // 6. Strict Out-of-Corpus / Unindexed Subject Abstention Gate
  // If the user names specific proper/scientific anchors (e.g. "Mariana Trench", "hydrothermal vent", "Amazon")
  // that do NOT exist anywhere in KEW's Western Himalayan corpus and zero focal KEW entities matched -> ABSTAIN!
  const hasOutOfCorpusSubject =
    matchedFocalEntities.length === 0 &&
    explicitSubregions.size === 0 &&
    explicitDistricts.size === 0 &&
    specificAnchorTokens.length > 0 &&
    unknownAnchorTokens.length / specificAnchorTokens.length >= 0.5;

  if (!rawQuestion || rawQuestion.length < 3 || hasOutOfCorpusSubject) {
    return buildAbstentionResponse({
      rawQuestion,
      qNorm,
      parsedScope,
      unknownAnchorTokens,
      t0,
      builtAt: corpus.builtAt,
      totalCorpusSize: corpus.documents.length,
    });
  }

  // 7. Score Evidentiary Documents vs Module Shells
  const focalRootTokens = new Set<string>();
  for (const fe of matchedFocalEntities) {
    for (const t of tokenizeWords(fe.canonicalName)) {
      if (!GENERIC_DOMAIN_INTENT_WORDS.has(t) && t.length >= 3) {
        focalRootTokens.add(t);
      }
    }
  }

  const boostedDomains = new Set<SearchDomain>();
  const intentBoostWords = new Set<string>();
  for (const dim of matchedDimensions) {
    dim.boostedDomains.forEach((d) => boostedDomains.add(d));
    dim.boostedKeywords.forEach((k) => intentBoostWords.add(k));
  }

  const scoredEvidence: Array<{
    entry: PreparedQAEntry;
    score: number;
    tier: EpistemicTierKey;
    spansPreWindowBaseline: boolean;
  }> = [];

  const candidateObservatories: Array<{ doc: SearchDocument; score: number }> = [];
  let preWindowExcludedCount = 0;

  for (const entry of prepared) {
    const { doc, titleNorm, synNorms, searchableBlob, tokenSet, temporalSpan } = entry;

    // Explicit subregion filter (when user explicitly asked about e.g. Gilgit-Baltistan or Ladakh)
    if (explicitSubregions.size > 0) {
      const docSr = doc.subregion;
      const matchesSr =
        (docSr && explicitSubregions.has(docSr)) ||
        (doc.subregions || []).some((s) => explicitSubregions.has(s));
      if (!matchesSr) continue;
    }

    // Explicit verifiedOnly filter
    if (options.verifiedOnly) {
      const t = classifyEpistemicTier(doc);
      if (t === 'tier_3_operational_preliminary') continue;
    }

    let score = 0;
    let matchedFocal = false;
    let matchedSpecificTokens = 0;

    // A. Focal entity matching (highest evidentiary anchor — prioritize direct title matches over lexicon synonyms!)
    for (const fe of matchedFocalEntities) {
      const feNorm = normalizeText(fe.canonicalName.split('(')[0]);
      if (doc.id === fe.doc.id) {
        score += 240;
        matchedFocal = true;
      } else if (titleNorm.includes(feNorm)) {
        score += 195;
        matchedFocal = true;
      } else if (searchableBlob.includes(feNorm)) {
        score += 110;
        matchedFocal = true;
      } else if (synNorms.some((s) => s.includes(feNorm))) {
        score += 85;
        matchedFocal = true;
      }
    }

    // Also check focal root token (e.g., "wular" matching "Wular Wetland Landscape Change Pilot" or "WUCMA")
    if (!matchedFocal && focalRootTokens.size > 0) {
      for (const frt of focalRootTokens) {
        if (titleNorm.includes(frt)) {
          score += 170;
          matchedFocal = true;
        } else if (tokenSet.has(frt)) {
          score += 90;
          matchedFocal = true;
        }
      }
    }

    // B. Specific anchor token IDF-weighted matching
    for (const st of specificAnchorTokens) {
      const df = tokenDf.get(st) || 0;
      if (df === 0) continue;
      const idfWeight = Math.max(12, Math.min(48, Math.round(Math.log10(corpus.documents.length / df) * 20)));
      if (titleNorm.includes(st) || synNorms.some((s) => s.includes(st))) {
        score += idfWeight * 1.6;
        matchedSpecificTokens++;
      } else if (tokenSet.has(st)) {
        score += idfWeight;
        matchedSpecificTokens++;
      }
    }

    // C. General question tokens (intent/topic reinforcement)
    let matchedGeneralTokens = 0;
    for (const qt of allQuestionTokens) {
      if (specificAnchorTokens.includes(qt)) continue;
      if (titleNorm.includes(qt)) {
        score += 18;
        matchedGeneralTokens++;
      } else if (tokenSet.has(qt)) {
        score += 9;
        matchedGeneralTokens++;
      }
    }

    // Strict relevance gate:
    // If focal entities exist (e.g., "Wular Lake" or "Hangul" + "Dachigam"),
    // require either direct focal match OR strong multi-anchor match in the same district/ecosystem!
    if (matchedFocalEntities.length > 0) {
      const matchesExplicitDistrict =
        explicitDistricts.size > 0 &&
        Array.from(explicitDistricts).some((d) => searchableBlob.includes(normalizeText(d)));
      if (!matchedFocal && !(matchedSpecificTokens >= 2 && matchesExplicitDistrict)) {
        // Allow general regional ecosystem ledgers (e.g. "Ramsar Wetlands — Loss & Recovery Ledger" for Wular Lake)
        // ONLY if they mention the focal root token in their description/interventions!
        continue;
      }
    } else if (specificAnchorTokens.length > 0) {
      const minReq = Math.max(1, Math.ceil(specificAnchorTokens.length * 0.5));
      if (matchedSpecificTokens < minReq) continue;
    } else if (matchedGeneralTokens < 2 && explicitSubregions.size === 0 && explicitDistricts.size === 0) {
      continue;
    }

    // Separate Platform Module navigation shells from Empirical Evidence Citations!
    if (doc.resultClass === 'module' || doc.trustBadge === 'Platform Module') {
      if (score >= 40) {
        candidateObservatories.push({ doc, score });
      }
      continue;
    }

    // D. Temporal Window Filtering & Longitudinal Series Evaluation
    let spansPreWindowBaseline = false;
    if (temporalWindow.mode !== 'unbounded') {
      const { startYear, endYear } = temporalSpan;
      if (temporalWindow.fromYear !== undefined && endYear !== undefined && endYear < temporalWindow.fromYear) {
        // Strictly ended BEFORE the requested window (e.g., a 1994 event when asking "since 2000")
        preWindowExcludedCount++;
        continue;
      }
      if (temporalWindow.toYear !== undefined && startYear !== undefined && startYear > temporalWindow.toYear) {
        preWindowExcludedCount++;
        continue;
      }
      if (
        temporalWindow.fromYear !== undefined &&
        startYear !== undefined &&
        startYear < temporalWindow.fromYear &&
        endYear !== undefined &&
        endYear >= temporalWindow.fromYear
      ) {
        spansPreWindowBaseline = true;
      }
      if (endYear !== undefined && temporalWindow.fromYear !== undefined && endYear >= temporalWindow.fromYear) {
        score += 22; // Confirmed post-cutoff dated evidence boost
      }
    }

    // E. Analytical Dimension & Quantitative Richness Boosts
    if (boostedDomains.has(doc.domain)) {
      score += 24;
    }
    for (const ibw of intentBoostWords) {
      if (searchableBlob.includes(ibw)) score += 6;
    }
    if (doc.metrics && doc.metrics.length > 0) {
      score += 16; // Prefer quantitative records over purely descriptive entries
    }

    const tier = classifyEpistemicTier(doc);
    if (tier === 'tier_1_verified') score += 18;
    else if (tier === 'tier_2_spaceborne_assessed') score += 12;

    scoredEvidence.push({
      entry,
      score: Math.round(score * 10) / 10,
      tier,
      spansPreWindowBaseline,
    });
  }

  // Sort by score descending
  scoredEvidence.sort((a, b) => b.score - a.score);

  if (scoredEvidence.length === 0) {
    return buildAbstentionResponse({
      rawQuestion,
      qNorm,
      parsedScope,
      unknownAnchorTokens,
      t0,
      builtAt: corpus.builtAt,
      totalCorpusSize: corpus.documents.length,
      preWindowExcludedCount,
    });
  }

  // 8. Cross-Domain Diversity Selection (Maximal Marginal Coverage across Domains)
  // Ensures high-scoring PIL dockets, satellite observatories, sectoral audits, and primary water/species baselines
  // all appear in the cited synthesis rather than 14 monotonous records of the same documentType!
  const selected: typeof scoredEvidence = [];
  const selectedIds = new Set<string>();
  const perDocTypeCount = new Map<string, number>();
  const perDomainCount = new Map<string, number>();

  // Pass 1: Top record from each distinct domain that scored >= 45% of top score
  const topScore = scoredEvidence[0].score;
  const domainPassThreshold = Math.max(45, topScore * 0.38);

  for (const item of scoredEvidence) {
    if (selected.length >= maxCitations) break;
    if (item.score < domainPassThreshold) continue;
    const dom = item.entry.doc.domain;
    if (!perDomainCount.has(dom)) {
      selected.push(item);
      selectedIds.add(item.entry.doc.id);
      perDomainCount.set(dom, 1);
      perDocTypeCount.set(item.entry.doc.documentType, 1);
    }
  }

  // Pass 2: Fill remaining citation slots by highest score with per-documentType cap (max 4 per type)
  for (const item of scoredEvidence) {
    if (selected.length >= maxCitations) break;
    if (selectedIds.has(item.entry.doc.id)) continue;
    if (item.score < Math.max(35, topScore * 0.25)) continue;
    const dt = item.entry.doc.documentType;
    const dtCount = perDocTypeCount.get(dt) || 0;
    if (dtCount >= 4) continue;

    selected.push(item);
    selectedIds.add(item.entry.doc.id);
    perDocTypeCount.set(dt, dtCount + 1);
    perDomainCount.set(item.entry.doc.domain, (perDomainCount.get(item.entry.doc.domain) || 0) + 1);
  }

  // Sort selected citations epistemically (Tier I -> Tier II -> Tier III, then score descending)
  // so [1], [2], [3]... prioritize primary statutory, peer-reviewed, and field-verified sources!
  const tierRank: Record<EpistemicTierKey, number> = {
    tier_1_verified: 1,
    tier_2_spaceborne_assessed: 2,
    tier_3_operational_preliminary: 3,
  };
  selected.sort((a, b) => {
    if (tierRank[a.tier] !== tierRank[b.tier]) return tierRank[a.tier] - tierRank[b.tier];
    return b.score - a.score;
  });

  // 9. Build Immutable Citations [1..N] and Synthesized Findings
  const citations: CitedBibliographyEntry[] = [];
  const findings: SynthesizedEvidenceFinding[] = [];
  let tier1Count = 0;
  let tier2Count = 0;
  let tier3Count = 0;
  const coveredDomains = new Set<SearchDomain>();

  selected.forEach((sel, idx) => {
    const citationNumber = idx + 1;
    const doc = sel.entry.doc;
    const span = sel.entry.temporalSpan;
    const tierMeta = EPISTEMIC_TIER_META[sel.tier];

    if (sel.tier === 'tier_1_verified') tier1Count++;
    else if (sel.tier === 'tier_2_spaceborne_assessed') tier2Count++;
    else tier3Count++;
    coveredDomains.add(doc.domain);

    const temporalNote = sel.spansPreWindowBaseline && temporalWindow.fromYear
      ? `${span.label} (Longitudinal baseline initiated prior to ${temporalWindow.fromYear}, extending post-${temporalWindow.fromYear})`
      : span.label;

    citations.push({
      citationNumber,
      tier: sel.tier,
      tierLabel: tierMeta.shortCode,
      formattedReference: formatInstitutionalCitation(doc, span.label),
      bibtexEntry: formatBibtexEntry(citationNumber, doc, span.label),
      temporalSpanLabel: temporalNote,
      document: doc,
    });

    findings.push({
      citationNumber,
      tier: sel.tier,
      tierLabel: tierMeta.shortCode,
      thematicCategory: buildThematicCategoryLabel(doc),
      domain: doc.domain,
      title: doc.title,
      subtitle: doc.subtitle,
      findingStatement: doc.description,
      quantitativeMetrics: doc.metrics || [],
      temporalSpanLabel: temporalNote,
      spansPreWindowBaseline: sel.spansPreWindowBaseline,
      sourceProvenance: doc.source,
      verificationStatus: doc.verificationStatus,
      trustBadge: doc.trustBadge,
      canonicalUrl: doc.canonicalUrl,
      subregion: doc.subregion,
      district: doc.district,
    });
  });

  // 10. Determine Epistemic Sufficiency Status
  const epistemicStatus: EpistemicSufficiencyStatus =
    findings.length >= 3 && tier1Count + tier2Count >= 2
      ? 'EVIDENCE_SUPPORTED'
      : 'PARTIALLY_SUPPORTED';

  const epistemicStatusLabel =
    epistemicStatus === 'EVIDENCE_SUPPORTED'
      ? `Corroborated Multi-Record Evidence (${findings.length} Traceable Sources across ${coveredDomains.size} Domains)`
      : `Partial Indexed Coverage (${findings.length} Traceable Record${findings.length === 1 ? '' : 's'} — See Scope Limitations)`;

  // 11. Assemble Strict Citation-Locked Executive Synthesis Blocks
  const executiveSynthesis = compileExecutiveSynthesisBlocks({
    findings,
    parsedScope,
    tier1Count,
    tier2Count,
    tier3Count,
    coveredDomainsCount: coveredDomains.size,
  });

  // 12. Audit Methodological Limitations, Uncertainties & Data Gaps
  const limitationsAndGaps = auditEvidenceLimitations({
    findings,
    parsedScope,
    preWindowExcludedCount,
    unknownAnchorTokens,
    tier1Count,
    tier3Count,
  });

  // 13. Select Top Related Specialist Observatories (Platform Modules)
  candidateObservatories.sort((a, b) => b.score - a.score);
  const seenUrls = new Set<string>(findings.map((f) => f.canonicalUrl));
  const relatedObservatories: RelatedObservatoryLink[] = [];
  for (const co of candidateObservatories) {
    if (relatedObservatories.length >= 4) break;
    if (seenUrls.has(co.doc.canonicalUrl)) continue;
    seenUrls.add(co.doc.canonicalUrl);
    relatedObservatories.push({
      id: co.doc.id,
      title: co.doc.title,
      subtitle: co.doc.subtitle,
      canonicalUrl: co.doc.canonicalUrl,
      parentModule: co.doc.parentModule,
    });
  }

  // 14. Generate Grounded Follow-Up Scientific Inquiries
  const followUpQuestions = buildFollowUpQuestions(parsedScope, rawQuestion);

  // 15. Pre-compile Exportable Cited Markdown Brief & Bibliographies
  const plainTextBibliography = citations
    .map((c) => `[${c.citationNumber}] ${c.formattedReference}`)
    .join('\n');
  const bibtexExport = citations.map((c) => c.bibtexEntry).join('\n\n');

  const markdownBrief = compileMarkdownBrief({
    question: rawQuestion,
    epistemicStatusLabel,
    parsedScope,
    executiveSynthesis,
    findings,
    limitationsAndGaps,
    citations,
  });

  return {
    question: rawQuestion,
    normalizedQuestion: qNorm,
    epistemicStatus,
    epistemicStatusLabel,
    parsedScope,
    epistemicDistribution: {
      tier1VerifiedCount: tier1Count,
      tier2AssessedCount: tier2Count,
      tier3PreliminaryOrModelCount: tier3Count,
      domainsCoveredCount: coveredDomains.size,
      totalCitedRecords: findings.length,
    },
    executiveSynthesis,
    findings,
    limitationsAndGaps,
    citations,
    relatedObservatories,
    followUpQuestions,
    markdownBrief,
    plainTextBibliography,
    bibtexExport,
    latencyMs: Math.round((performance.now() - t0) * 10) / 10,
    indexBuiltAt: corpus.builtAt,
    totalCorpusSize: corpus.documents.length,
  };
}

function summarizeRecordFactClause(f: SynthesizedEvidenceFinding): string {
  const metricClause =
    f.quantitativeMetrics.length > 0
      ? ` (${f.quantitativeMetrics.map((m) => `${m.label}: ${m.value}`).join('; ')})`
      : '';
  // Extract first complete empirical sentence from doc.description without altering numbers or facts
  const firstSentence = (f.findingStatement.split(/(?<=\.)\s+(?=[A-Z0-9])/)[0] || f.findingStatement).trim();
  const cleanSentence = firstSentence.endsWith('.') ? firstSentence.slice(0, -1) : firstSentence;
  return `${f.title}${metricClause}: ${cleanSentence} [${f.citationNumber}].`;
}

function compileExecutiveSynthesisBlocks(params: {
  findings: SynthesizedEvidenceFinding[];
  parsedScope: ParsedScientificScope;
  tier1Count: number;
  tier2Count: number;
  tier3Count: number;
  coveredDomainsCount: number;
}): ExecutiveSynthesisBlock[] {
  const { findings, parsedScope, tier1Count, tier2Count, tier3Count, coveredDomainsCount } = params;
  const blocks: ExecutiveSynthesisBlock[] = [];

  const tier1And2 = findings.filter((f) => f.tier !== 'tier_3_operational_preliminary');
  const tier3Only = findings.filter((f) => f.tier === 'tier_3_operational_preliminary');

  // Block 1: Epistemic Scope & Primary Verified Records
  const anchorRefs = findings.slice(0, Math.min(3, findings.length)).map((f) => f.citationNumber);
  const scopeSubject =
    parsedScope.focalEntities.length > 0
      ? parsedScope.focalEntities.join(', ')
      : parsedScope.extractedKeywords.join(', ');
  const geoClause =
    parsedScope.subregions.length > 0
      ? ` across ${parsedScope.subregions.join(', ')}${parsedScope.districts.length > 0 ? ` (${parsedScope.districts.slice(0, 4).join(', ')})` : ''}`
      : '';

  blocks.push({
    paragraphId: 'scope-basis',
    heading: '1. Evidentiary Basis & Scope Stratification',
    text: `Across the Kashmir EcoWatch repository, ${findings.length} traceable public record${findings.length === 1 ? '' : 's'} spanning ${coveredDomainsCount} environmental domain${coveredDomainsCount === 1 ? '' : 's'} document ${scopeSubject}${geoClause} within the ${parsedScope.temporalWindow.label} [${anchorRefs.join(', ')}]. Epistemically, this evidence comprises ${tier1Count} Tier I primary/statutory/field-verified record${tier1Count === 1 ? '' : 's'}, ${tier2Count} Tier II multi-sensor satellite or scientific assessment record${tier2Count === 1 ? '' : 's'}, and ${tier3Count} Tier III operational/preliminary or reanalysis record${tier3Count === 1 ? '' : 's'}.`,
    citationNumbers: anchorRefs,
  });

  // Block 2: Primary Empirical, Spatial & Quantitative Findings (Tier I & II)
  if (tier1And2.length > 0) {
    const primarySlice = tier1And2.slice(0, 4);
    const clauses = primarySlice.map(summarizeRecordFactClause).join(' ');
    blocks.push({
      paragraphId: 'empirical-findings',
      heading: '2. Primary Verified & Multi-Epoch Scientific Findings',
      text: clauses,
      citationNumbers: primarySlice.map((f) => f.citationNumber),
    });
  }

  // Block 3: Corroborating Cross-Sectoral Drivers, Governance & Secondary Records (Tier I & II remainder)
  if (tier1And2.length > 4) {
    const secondarySlice = tier1And2.slice(4, 8);
    const clauses = secondarySlice.map(summarizeRecordFactClause).join(' ');
    blocks.push({
      paragraphId: 'cross-sectoral-governance',
      heading: '3. Cross-Sectoral Stressors, Audits & Institutional Directives',
      text: clauses,
      citationNumbers: secondarySlice.map((f) => f.citationNumber),
    });
  }

  // Block 4: Strictly Separated Tier III Operational / Preliminary / Model Signals (if present)
  if (tier3Only.length > 0) {
    const t3Slice = tier3Only.slice(0, 3);
    const clauses = t3Slice.map(summarizeRecordFactClause).join(' ');
    blocks.push({
      paragraphId: 'operational-preliminary',
      heading: `${blocks.length + 1}. Operational Telemetry, Preliminary Candidate Alerts & Modelled Signals (Separated)`,
      text: `Separately from peer-audited historical baselines, KEW indexes the following operational, preliminary, or reanalysis records carrying explicit uncertainty boundaries: ${clauses}`,
      citationNumbers: t3Slice.map((f) => f.citationNumber),
    });
  }

  return blocks;
}

function auditEvidenceLimitations(params: {
  findings: SynthesizedEvidenceFinding[];
  parsedScope: ParsedScientificScope;
  preWindowExcludedCount: number;
  unknownAnchorTokens: string[];
  tier1Count: number;
  tier3Count: number;
}): EvidenceLimitationNotice[] {
  const { findings, parsedScope, preWindowExcludedCount, unknownAnchorTokens, tier1Count, tier3Count } = params;
  const notices: EvidenceLimitationNotice[] = [];

  // 1. Temporal Baseline Boundary Disclosure
  const spanningPreWindow = findings.filter((f) => f.spansPreWindowBaseline);
  if (parsedScope.temporalWindow.fromYear && spanningPreWindow.length > 0) {
    const refs = spanningPreWindow.map((f) => `[${f.citationNumber}]`).join(', ');
    notices.push({
      category: 'temporal_boundary',
      title: `Multi-Decadal Baseline Boundary Disclosure (${parsedScope.temporalWindow.fromYear} Cutoff)`,
      detail: `Longitudinal satellite and ecosystem ledgers ${refs} utilize pre-${parsedScope.temporalWindow.fromYear} baseline epochs (such as 1985 Survey/Landsat or 1992 Ramsar designation baselines) extending through 2026. KEW reports their exact measured epoch intervals without linear interpolation to ${parsedScope.temporalWindow.fromYear}.${preWindowExcludedCount > 0 ? ` (${preWindowExcludedCount} strictly pre-${parsedScope.temporalWindow.fromYear} archival record(s) were excluded.)` : ''}`,
    });
  } else if (parsedScope.temporalWindow.mode !== 'unbounded' && preWindowExcludedCount > 0) {
    notices.push({
      category: 'temporal_boundary',
      title: 'Temporal Window Filtering Applied',
      detail: `${preWindowExcludedCount} indexed record(s) dated outside the requested ${parsedScope.temporalWindow.label} were excluded from this synthesis.`,
    });
  }

  // 2. Preliminary Satellite Alert vs Field-Verified Distinction
  const prelimAlerts = findings.filter(
    (f) => f.verificationStatus.toLowerCase().includes('tier 1') || f.verificationStatus.toLowerCase().includes('preliminary')
  );
  if (prelimAlerts.length > 0) {
    const refs = prelimAlerts.map((f) => `[${f.citationNumber}]`).join(', ');
    notices.push({
      category: 'verification_tier',
      title: 'Preliminary Satellite Candidate Alerts Pending Field Adjudication',
      detail: `Cited alert record(s) ${refs} represent automated/screened Tier 1 candidate spectral anomalies. Under KEW's Two-Tier SCDO protocol, candidate anomalies do not constitute legally adjudicated encroachment until corroborated by dGPS field verification and two-analyst peer review.`,
    });
  }

  // 3. Reanalysis / Modelled Grid Disclosure
  const modelRecords = findings.filter(
    (f) => f.trustBadge === 'Modelled / Reanalysis' || f.temporalSpanLabel.includes('Forecast')
  );
  if (modelRecords.length > 0) {
    const refs = modelRecords.map((f) => `[${f.citationNumber}]`).join(', ');
    notices.push({
      category: 'model_reanalysis',
      title: 'Numerical Reanalysis & Gridded Model Uncertainty',
      detail: `Record(s) ${refs} incorporate Copernicus CAMS, ECMWF, or ERA5 gridded numerical estimates where physical ground-station sensors are sparse across complex Himalayan terrain.`,
    });
  }

  // 4. Unmatched Query Terms or Corpus Boundary Notice
  if (unknownAnchorTokens.length > 0) {
    notices.push({
      category: 'spatial_or_corpus_gap',
      title: 'Unindexed Parameter / Term Disclosure',
      detail: `No verified KEW records directly matched the specific term(s): "${unknownAnchorTokens.join(', ')}". Synthesis is restricted strictly to the ${findings.length} verified records cited above.`,
    });
  } else {
    notices.push({
      category: 'spatial_or_corpus_gap',
      title: 'Closed-World Traceability & Non-Extrapolation Guarantee',
      detail: `This synthesis is compiled deterministically from public KEW registries (${tier1Count} Tier I primary records${tier3Count > 0 ? `; ${tier3Count} Tier III operational/preliminary records` : ''}). Restricted conservation coordinates, unpublished drafts, and unmeasured field parameters are excluded rather than estimated.`,
    });
  }

  return notices;
}

function buildAbstentionResponse(params: {
  rawQuestion: string;
  qNorm: string;
  parsedScope: ParsedScientificScope;
  unknownAnchorTokens: string[];
  t0: number;
  builtAt: string;
  totalCorpusSize: number;
  preWindowExcludedCount?: number;
}): ScientificSynthesisResponse {
  const {
    rawQuestion,
    qNorm,
    parsedScope,
    unknownAnchorTokens,
    t0,
    builtAt,
    totalCorpusSize,
    preWindowExcludedCount = 0,
  } = params;

  const missingDesc =
    unknownAnchorTokens.length > 0
      ? `Specifically, no public Western Himalayan records in the KEW index match "${unknownAnchorTokens.join(', ')}".`
      : preWindowExcludedCount > 0
      ? `${preWindowExcludedCount} archival record(s) matched the topic but fell outside the requested ${parsedScope.temporalWindow.label}.`
      : 'No public records met the evidentiary specificity threshold for this query.';

  const abstentionText = `Scientific Abstention — Insufficient Indexed Evidence: Kashmir EcoWatch cannot assemble a verified answer to "${rawQuestion}" from its indexed Western Himalayan environmental corpus (${totalCorpusSize.toLocaleString()} public records). ${missingDesc} In accordance with KEW scientific integrity standards, no speculative, extrapolated, or ungrounded text is generated.`;

  return {
    question: rawQuestion,
    normalizedQuestion: qNorm,
    epistemicStatus: 'INSUFFICIENT_INDEXED_EVIDENCE',
    epistemicStatusLabel: 'Abstained — Insufficient Indexed KEW Evidence (Zero Unverified Extrapolation)',
    parsedScope,
    epistemicDistribution: {
      tier1VerifiedCount: 0,
      tier2AssessedCount: 0,
      tier3PreliminaryOrModelCount: 0,
      domainsCoveredCount: 0,
      totalCitedRecords: 0,
    },
    executiveSynthesis: [
      {
        paragraphId: 'abstention-notice',
        heading: 'Evidentiary Abstention Notice',
        text: abstentionText,
        citationNumbers: [],
      },
    ],
    findings: [],
    limitationsAndGaps: [
      {
        category: 'spatial_or_corpus_gap',
        title: 'Geographic or Thematic Scope Outside Verified Corpus',
        detail: `KEW's scientific registries cover six Western Himalayan subregions (Kashmir, Jammu, Ladakh, Azad Kashmir, Gilgit, and Baltistan). ${missingDesc}`,
      },
    ],
    citations: [],
    relatedObservatories: [],
    followUpQuestions: [
      'What environmental changes have been documented around Wular Lake since 2000?',
      'What is the conservation status, population baseline, and corridor network of Hangul in Dachigam?',
      'How rapidly is Kolahoi Glacier retreating and what cryosphere changes are documented in Kashmir?',
      'Which glacial lakes and glaciers in Gilgit-Baltistan and Ladakh have documented GLOF or recession risk?',
    ],
    markdownBrief: `# Kashmir EcoWatch — Evidence Inquiry\n\n**Query:** ${rawQuestion}\n**Status:** Abstained — Insufficient Indexed KEW Evidence\n\n${abstentionText}\n`,
    plainTextBibliography: '',
    bibtexExport: '',
    latencyMs: Math.round((performance.now() - t0) * 10) / 10,
    indexBuiltAt: builtAt,
    totalCorpusSize,
  };
}

function buildFollowUpQuestions(scope: ParsedScientificScope, currentQuestion: string): string[] {
  const candidates: string[] = [];
  const qLower = currentQuestion.toLowerCase();

  if (scope.focalEntities.some((e) => /wular/i.test(e))) {
    candidates.push(
      'What High Court PIL compliance directives and WUCMA milestones govern Wular Lake willow removal and demarcation?',
      'How do agricultural nutrient leaching and municipal sewage compare as cumulative stressors in the Wular Lake basin?'
    );
  }
  if (scope.focalEntities.some((e) => /dal\s+lake/i.test(e))) {
    candidates.push(
      'What does the 2024 LCMA GIS houseboat census report on sewage compliance across Dal and Nigeen Lake basins?',
      'How has Dal Lake and Hokersar open-water area changed across satellite epochs from 1990 to 2026?'
    );
  }
  if (scope.focalEntities.some((e) => /hangul|dachigam/i.test(e))) {
    candidates.push(
      'Which wildlife corridors connect Dachigam National Park to Overa-Aru, Sindh, and Tral habitats?',
      'What threats and tourism pressures affect subalpine Hangul corridors in the Lidder and Sindh valleys?'
    );
  }
  if (scope.focalEntities.some((e) => /kolahoi/i.test(e)) || scope.analyticalDimensions.some((d) => d.id === 'hydrology_cryosphere')) {
    candidates.push(
      'How does Kolahoi Glacier snout retreat compare with geodetic mass balance thinning across Kashmir glaciers?',
      'What seasonal discharge reductions have been measured across Kashmir Valley Karewa springs since 2015?'
    );
  }

  candidates.push(
    'What environmental changes have been documented around Wular Lake since 2000?',
    'What High Court and NGT judicial compliance directives address Dal Lake sewage, houseboats, and encroachment?',
    'Which glacial lakes and glaciers in Gilgit-Baltistan and Ladakh have documented GLOF or recession risk?',
    'What are the documented rates and drivers of Karewa and paddy land conversion in Pulwama and Budgam?'
  );

  const unique: string[] = [];
  for (const c of candidates) {
    if (unique.length >= 4) break;
    if (c.toLowerCase() === qLower) continue;
    if (!unique.includes(c)) unique.push(c);
  }
  return unique;
}

function compileMarkdownBrief(params: {
  question: string;
  epistemicStatusLabel: string;
  parsedScope: ParsedScientificScope;
  executiveSynthesis: ExecutiveSynthesisBlock[];
  findings: SynthesizedEvidenceFinding[];
  limitationsAndGaps: EvidenceLimitationNotice[];
  citations: CitedBibliographyEntry[];
}): string {
  const {
    question,
    epistemicStatusLabel,
    parsedScope,
    executiveSynthesis,
    findings,
    limitationsAndGaps,
    citations,
  } = params;

  const lines: string[] = [
    `# Kashmir EcoWatch — Cited Scientific Evidence Brief`,
    ``,
    `- **Scientific Inquiry:** ${question}`,
    `- **Epistemic Sufficiency:** ${epistemicStatusLabel}`,
    `- **Temporal Scope:** ${parsedScope.temporalWindow.label}`,
    `- **Geographic Scope:** ${parsedScope.subregions.join(', ') || 'Western Himalaya'}${parsedScope.districts.length ? ` (${parsedScope.districts.join(', ')})` : ''}`,
    ``,
    `## Executive Evidence Synthesis`,
    ``,
    ...executiveSynthesis.flatMap((b) => [`### ${b.heading}`, b.text, ``]),
    `## Epistemically Stratified Findings`,
    ``,
    ...findings.map((f) => {
      const m = f.quantitativeMetrics.length
        ? ` | Metrics: ${f.quantitativeMetrics.map((x) => `${x.label}: ${x.value}`).join(', ')}`
        : '';
      return `- **[${f.citationNumber}] ${f.title}** *(${f.tierLabel} · ${f.trustBadge} · ${f.temporalSpanLabel}${m})*: ${f.findingStatement}`;
    }),
    ``,
    `## Methodological Scope, Uncertainty & Data Gaps`,
    ``,
    ...limitationsAndGaps.map((l) => `- **${l.title}:** ${l.detail}`),
    ``,
    `## Traceable Institutional Bibliography`,
    ``,
    ...citations.map((c) => `${c.citationNumber}. ${c.formattedReference}`),
    ``,
  ];

  return lines.join('\n');
}
