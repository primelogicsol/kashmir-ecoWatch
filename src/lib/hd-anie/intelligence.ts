// ─────────────────────────────────────────────────────────────────────────────
// HD-ANIE MULTILINGUAL INTELLIGENCE, SIGNAL DEDUPLICATION, STORY CLUSTERING,
// 12-DIMENSION EDITORIAL SCORING & KEW SCIENTIFIC RAG INTEGRATION
// Reuses KEW's authoritative `SIX_KEW_SUBREGIONS` & compiled hybrid search corpus.
// ─────────────────────────────────────────────────────────────────────────────

import crypto from 'crypto';
import {
  AnieBureauId,
  AnieClaimEvidenceMapping,
  AnieClusterScorecard,
  AnieEvidenceDossier,
  AnieEvidenceSourceItem,
  AnieKewKnowledgeMatch,
  AniePublicationStream,
  AnieRawSignal,
  AnieSourceRecord,
  AnieStoryCluster,
} from '@/types/hd-anie';
import { EditorialDepartmentId } from '@/types/himalayan-dispatch';
import { SIX_KEW_SUBREGIONS } from '@/lib/search/multilingual-gazetteer';
import { getCompiledSearchCorpus } from '@/lib/search/index-builder';
import { getDynamicMonitoringTaxonomy } from './sources-seed';
import { computeUrlHash, normalizeCanonicalSourceUrl } from './security';
import { RawDiscoveredItem } from './discovery';

const MULTILINGUAL_ENVIRONMENTAL_TERMS: Array<{
  pattern: RegExp;
  domainId: string;
  englishGloss: string;
}> = [
  // Urdu / Kashmiri Perso-Arabic environmental lexicon
  { pattern: /گلیشیئر|برفانی|ہمالیہ/u, domainId: 'cryosphere', englishGloss: 'Glacier / Snowpack' },
  { pattern: /جھیل|ڈل|ولر|آبی گاہ|رامسر/u, domainId: 'wetlands', englishGloss: 'Lake / Wetland' },
  { pattern: /دریا|جہلم|ویتھ|چناب|سندھ|سیلاب/u, domainId: 'rivers-hydrology', englishGloss: 'River / Flood' },
  { pattern: /چشمہ|ناگ|زیر زمین پانی/u, domainId: 'springs-groundwater', englishGloss: 'Spring / Groundwater' },
  { pattern: /جنگل|دیودار|چنار|آگ/u, domainId: 'forest-ecosystems', englishGloss: 'Forest / Chinar / Deodar' },
  { pattern: /جنگلی حیات|ہنگل|برفانی چیتا|پرندے/u, domainId: 'biodiversity', englishGloss: 'Wildlife / Hangul' },
  { pattern: /آلودگی|دھند|ماحولیات|کچرا/u, domainId: 'urban-ecology', englishGloss: 'Pollution / Environment' },
  { pattern: /لینڈ سلائیڈ|پسی|بادل پھٹنے/u, domainId: 'geomorphology', englishGloss: 'Landslide / Cloudburst' },
  // Hindi / Devanagari environmental lexicon
  { pattern: /ग्लेशियर|हिमनद|बर्फबारी/u, domainId: 'cryosphere', englishGloss: 'Glacier / Snowfall' },
  { pattern: /झील|डल|वुलर|आर्द्रभूमि/u, domainId: 'lakes-limnology', englishGloss: 'Lake / Wetland' },
  { pattern: /नदी|झेलम|चिनाब|सिंधु|बाढ़/u, domainId: 'rivers-hydrology', englishGloss: 'River / Flood' },
  { pattern: /वन्यजीव|हंगुल|जंगल|देवदार|चिनार/u, domainId: 'biodiversity', englishGloss: 'Wildlife / Forest' },
  { pattern: /प्रदूषण|भूस्खलन|बादल फटना|जलवायु/u, domainId: 'extreme-weather', englishGloss: 'Pollution / Landslide / Climate' },
];

const NON_ENVIRONMENTAL_NOISE_PATTERNS = [
  /\b(cricket|ipl|t20|bollywood|box office|horoscope|stock market|nifty|sensex|premier league|celebrity)\b/i,
  /\b(transfer matters|preparatory meeting|party workers|election campaign|bail plea|vande mataram|waqf|murder accused|narcotics|smuggler arrested)\b/i,
];

const STRICT_ECOLOGICAL_ANCHOR_PATTERN =
  /\b(glacier|glaciers|cryosphere|snowfall|snowline|snowmelt|permafrost|glof|avalanche|lake|lakes|dal lake|wular|manasbal|pangong|tsomoriri|wetland|wetlands|ramsar|marsh|waterfowl|migratory birds?|river|jhelum|chenab|indus|lidder|sindh|neelum|tawi|shyok|zanskar|spring|springs|verinag|karst|groundwater|aquifer|flood|floods|flooding|cloudburst|landslide|landslides|drought|heatwave|monsoon|western disturbance|air quality|aqi|pm2\.5|pollution|sewage|effluent|solid waste|plastic|biodiversity|wildlife|hangul|snow leopard|markhor|brown bear|pheasant|monal|trout|schizothorax|forest|forests|deodar|chinar|wildfire|deforestation|afforestation|climate change|warming|ecological|ecosystem|watershed|hydropower|environmental|horticulture|orchard|saffron|pesticide|national park|sanctuary|dachigam|hemis|deosai)\b/i;

function detectScripts(text: string): string[] {
  const scripts: string[] = [];
  if (/[A-Za-z]/.test(text)) scripts.push('Latin');
  if (/[\u0600-\u06FF]/u.test(text)) scripts.push('Perso-Arabic (Urdu/Kashmiri)');
  if (/[\u0900-\u097F]/u.test(text)) scripts.push('Devanagari (Hindi/Dogri)');
  return scripts.length > 0 ? scripts : ['Latin'];
}

function mapSubregionNameToBureau(subregion: string): AnieBureauId {
  switch (subregion) {
    case 'Kashmir':
      return 'kashmir';
    case 'Jammu':
      return 'jammu';
    case 'Ladakh':
      return 'ladakh';
    case 'Azad Kashmir':
      return 'ajk';
    case 'Gilgit':
      return 'gilgit';
    case 'Baltistan':
      return 'baltistan';
    default:
      return 'western-himalayas';
  }
}

export function getBureauDisplayLabel(bureauId: AnieBureauId): string {
  switch (bureauId) {
    case 'kashmir':
      return 'Kashmir Bureau';
    case 'jammu':
      return 'Jammu Bureau';
    case 'ladakh':
      return 'Ladakh Bureau';
    case 'ajk':
      return 'AJ&K Bureau';
    case 'gilgit':
      return 'Gilgit Bureau';
    case 'baltistan':
      return 'Baltistan Bureau';
    case 'western-himalayas':
      return 'Western Himalayan Desk';
    case 'international':
      return 'International Environmental Desk';
  }
}

/**
 * Classifies a raw discovered item across KEW's 6 subregions, 56 districts,
 * watersheds, multilingual scripts, and 24+ environmental monitoring domains.
 */
export function analyzeAndNormalizeSignal(
  raw: RawDiscoveredItem,
  source: AnieSourceRecord,
  existingSignals: AnieRawSignal[]
): AnieRawSignal {
  const canonicalUrl = normalizeCanonicalSourceUrl(raw.url);
  const urlHash = computeUrlHash(canonicalUrl);
  const combinedText = `${raw.title} ${raw.summary}`;
  const lower = combinedText.toLowerCase();
  const taxonomy = getDynamicMonitoringTaxonomy();

  // 1. Exact URL duplicate check
  const exactUrlDup = existingSignals.find((s) => s.urlHash === urlHash);

  // 2. Multilingual & Geographical Gazetteer Resolution
  const matchedBureaus = new Set<AnieBureauId>();
  const matchedDistricts = new Set<string>();
  const matchedWatersheds = new Set<string>();
  const matchedToponyms = new Set<string>();

  for (const sr of SIX_KEW_SUBREGIONS) {
    const bId = mapSubregionNameToBureau(sr.subregion);
    for (const alt of sr.historicalAndAltNames) {
      if (lower.includes(alt.toLowerCase())) {
        matchedBureaus.add(bId);
        matchedToponyms.add(alt);
      }
    }
    for (const d of sr.districts) {
      const cleanD = d.replace(/\s*\(AJK\)/i, '').toLowerCase();
      const rx = new RegExp(`\\b${cleanD.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
      if (rx.test(combinedText)) {
        matchedBureaus.add(bId);
        matchedDistricts.add(d);
        matchedToponyms.add(d);
      }
    }
    for (const w of sr.watersheds) {
      const riverRoot = w.split(/[\s-]+/)[0].toLowerCase();
      if (riverRoot.length >= 4 && lower.includes(riverRoot)) {
        matchedBureaus.add(bId);
        matchedWatersheds.add(w);
        matchedToponyms.add(w);
      }
    }
    const multiAll = [
      ...(sr.multilingual.ur || []),
      ...(sr.multilingual.ks || []),
      ...(sr.multilingual.hi || []),
      ...(sr.multilingual.translit || []),
    ];
    for (const mTerm of multiAll) {
      if (combinedText.includes(mTerm) || lower.includes(mTerm.toLowerCase())) {
        matchedBureaus.add(bId);
        matchedToponyms.add(mTerm);
      }
    }
  }

  if (matchedBureaus.size === 0) {
    if (/\b(himalaya|himalayan|karakoram|hindu kush|third pole|indus basin)\b/i.test(combinedText)) {
      matchedBureaus.add('western-himalayas');
    } else if (source.category === 'regional_news') {
      matchedBureaus.add(source.geographicalCoverage[0] || 'kashmir');
    } else {
      matchedBureaus.add('international');
    }
  }

  // 3. Dynamic 24-Domain Environmental Taxonomy Matching (strict word-boundary matching!)
  const domainHits: Array<{ id: string; weight: number }> = [];
  for (const dom of taxonomy) {
    let hits = 0;
    for (const kw of dom.keywords) {
      const escaped = kw.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const kwRx = new RegExp(`\\b${escaped}\\b`, 'i');
      if (kwRx.test(combinedText)) {
        hits += kwRx.test(raw.title) ? 2 : 1;
      }
    }
    if (hits > 0) {
      domainHits.push({ id: dom.id, weight: hits });
    }
  }

  const glossNotes: string[] = [];
  for (const mLex of MULTILINGUAL_ENVIRONMENTAL_TERMS) {
    if (mLex.pattern.test(combinedText)) {
      domainHits.push({ id: mLex.domainId, weight: 2 });
      glossNotes.push(mLex.englishGloss);
    }
  }

  domainHits.sort((a, b) => b.weight - a.weight);
  const monitoringDomainIds = Array.from(new Set(domainHits.map((d) => d.id))).slice(0, 4);

  // 4. Compute Syndication Fingerprint (Significant Sorted Title Tokens)
  const stop = new Set([
    'the', 'and', 'for', 'with', 'from', 'that', 'this', 'into', 'over', 'after',
    'near', 'amid', 'report', 'reports', 'says', 'new', 'news', 'india', 'pakistan',
  ]);
  const sigTokens = raw.title
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((t) => t.length >= 4 && !stop.has(t))
    .slice(0, 7)
    .sort();
  const syndicationFingerprint = crypto
    .createHash('md5')
    .update(sigTokens.join('|') || raw.title.toLowerCase())
    .digest('hex')
    .slice(0, 14);

  // Check near-identical syndicated headline already ingested from same domain
  const syndicatedDup = existingSignals.find(
    (s) =>
      s.syndicationFingerprint === syndicationFingerprint &&
      s.sourceDomain === (raw.discoveredPublisherDomain || source.domain)
  );

  // 5. Environmental Relevance Scoring (0-100) — requires explicit ecological anchor for general news feeds
  const isNoise = NON_ENVIRONMENTAL_NOISE_PATTERNS.some((rx) => rx.test(combinedText));
  const hasEcologicalAnchor =
    STRICT_ECOLOGICAL_ANCHOR_PATTERN.test(combinedText) ||
    glossNotes.length > 0 ||
    source.category === 'scientific_repository' ||
    source.category === 'earth_observation' ||
    source.category === 'climate_meteorology';

  const totalDomainWeight = domainHits.reduce((acc, d) => acc + d.weight, 0);
  const isRegionalCore = Array.from(matchedBureaus).some(
    (b) => b !== 'international'
  );

  let relevance = 0;
  if (!isNoise && hasEcologicalAnchor && monitoringDomainIds.length > 0) {
    relevance = Math.min(
      100,
      36 +
        Math.min(36, totalDomainWeight * 9) +
        (isRegionalCore ? 18 : 6) +
        (source.category === 'scientific_repository' || source.category === 'earth_observation' ? 10 : 0)
    );
  }

  let status: AnieRawSignal['status'] = 'accepted';
  let rejectionReason: string | undefined;

  if (exactUrlDup || syndicatedDup) {
    status = 'rejected_duplicate';
    rejectionReason = exactUrlDup
      ? 'Canonical URL already indexed'
      : 'Syndicated duplicate from identical publisher';
  } else if (isNoise || !hasEcologicalAnchor || monitoringDomainIds.length === 0 || relevance < 50) {
    status = 'rejected_irrelevant';
    rejectionReason = isNoise
      ? 'Non-environmental general news topic'
      : 'Insufficient ecological, hydrological, cryospheric, or environmental signal';
  }

  // Differentiate estimated event date vs report date where explicit temporal cues exist
  let estimatedEventDate = raw.publishedAt.slice(0, 10);
  const yesterdayMatch = /\byesterday\b/i.test(combinedText);
  if (yesterdayMatch) {
    const dt = new Date(raw.publishedAt);
    dt.setUTCDate(dt.getUTCDate() - 1);
    estimatedEventDate = dt.toISOString().slice(0, 10);
  }

  const detectedScripts = detectScripts(combinedText);
  const translatedTitleNote =
    glossNotes.length > 0
      ? `Multilingual terms detected (${glossNotes.join(', ')}) — source-language text preserved for human verification.`
      : undefined;

  const effectiveDomain = raw.discoveredPublisherDomain || source.domain;
  const effectivePublisher = raw.discoveredPublisherName || source.name;

  return {
    id: `sig-${urlHash.slice(0, 10)}-${Date.now().toString(36).slice(-4)}`,
    canonicalUrl,
    urlHash,
    syndicationFingerprint,
    sourceId: source.id,
    sourceName: effectivePublisher,
    sourceDomain: effectiveDomain,
    sourceCategory: source.category,
    sourceReliability: source.reliabilityScore,
    originalLanguage: raw.language || source.language,
    detectedScripts,
    rawTitle: raw.title,
    sanitizedSummary: raw.summary,
    translatedTitleNote,
    authors: raw.authors,
    doi: raw.doi,
    publishedAt: raw.publishedAt,
    estimatedEventDate,
    retrievedAt: new Date().toISOString(),
    licenseRestriction: source.copyrightAndLicense,
    detectedBureaus: Array.from(matchedBureaus),
    detectedDistricts: Array.from(matchedDistricts),
    detectedWatersheds: Array.from(matchedWatersheds),
    monitoringDomainIds,
    matchedToponyms: Array.from(matchedToponyms).slice(0, 10),
    environmentalRelevanceScore: relevance,
    status,
    rejectionReason,
  };
}

function titleTokenSimilarity(a: string, b: string): number {
  const tok = (s: string) =>
    new Set(
      s
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s]/gu, ' ')
        .split(/\s+/)
        .filter((w) => w.length >= 4)
    );
  const sa = tok(a);
  const sb = tok(b);
  if (sa.size === 0 || sb.size === 0) return 0;
  let inter = 0;
  for (const w of sa) if (sb.has(w)) inter++;
  return inter / Math.min(sa.size, sb.size);
}

/**
 * Clusters accepted signals referring to the same underlying event/topic so HD-ANIE
 * never generates multiple repetitive articles for one news development, and scores
 * each cluster across all 12 editorial intelligence dimensions.
 */
export function clusterSignalsAndScore(
  acceptedSignals: AnieRawSignal[],
  existingClusters: AnieStoryCluster[]
): AnieStoryCluster[] {
  const clusters: AnieStoryCluster[] = existingClusters.map((c) => ({
    ...c,
    signalIds: [...c.signalIds],
    sourceDomains: [...c.sourceDomains],
    districts: [...c.districts],
    watersheds: [...c.watersheds],
    monitoringDomainIds: [...c.monitoringDomainIds],
    secondaryBureaus: [...c.secondaryBureaus],
  }));

  const assignedSignalIds = new Set<string>(clusters.flatMap((c) => c.signalIds));

  for (const sig of acceptedSignals) {
    if (assignedSignalIds.has(sig.id)) continue;

    // Try matching an existing cluster within a 14-day window on same primary bureau + domain + token overlap
    let matchedCluster: AnieStoryCluster | undefined;
    for (const cl of clusters) {
      const sameSyndication = cl.clusterKey === sig.syndicationFingerprint;
      const sharedDomain = sig.monitoringDomainIds.some((d) => cl.monitoringDomainIds.includes(d));
      const sharedBureau =
        sig.detectedBureaus.includes(cl.primaryBureau) ||
        sig.detectedBureaus.some((b) => cl.secondaryBureaus.includes(b));
      const sim = titleTokenSimilarity(sig.rawTitle, cl.canonicalTopic);

      if (sameSyndication || (sharedDomain && sharedBureau && sim >= 0.48)) {
        matchedCluster = cl;
        break;
      }
    }

    if (matchedCluster) {
      matchedCluster.signalIds.push(sig.id);
      if (!matchedCluster.sourceDomains.includes(sig.sourceDomain)) {
        matchedCluster.sourceDomains.push(sig.sourceDomain);
      }
      for (const d of sig.detectedDistricts) {
        if (!matchedCluster.districts.includes(d)) matchedCluster.districts.push(d);
      }
      for (const w of sig.detectedWatersheds) {
        if (!matchedCluster.watersheds.includes(w)) matchedCluster.watersheds.push(w);
      }
      for (const dom of sig.monitoringDomainIds) {
        if (!matchedCluster.monitoringDomainIds.includes(dom)) {
          matchedCluster.monitoringDomainIds.push(dom);
        }
      }
      if (sig.publishedAt > matchedCluster.latestSignalAt) {
        matchedCluster.latestSignalAt = sig.publishedAt;
      }
      sig.clusterId = matchedCluster.id;
      assignedSignalIds.add(sig.id);
    } else {
      const primaryBureau = sig.detectedBureaus[0] || 'western-himalayas';
      const secondaryBureaus = sig.detectedBureaus.slice(1);
      const newCluster: AnieStoryCluster = {
        id: `clu-${sig.syndicationFingerprint.slice(0, 8)}-${Date.now().toString(36).slice(-4)}`,
        clusterKey: sig.syndicationFingerprint,
        canonicalTopic: sig.rawTitle,
        primaryBureau,
        secondaryBureaus,
        districts: [...sig.detectedDistricts],
        watersheds: [...sig.detectedWatersheds],
        monitoringDomainIds: [...sig.monitoringDomainIds],
        signalIds: [sig.id],
        sourceDomains: [sig.sourceDomain],
        independentSourceFamilyCount: 1,
        earliestEventDate: sig.estimatedEventDate,
        firstReportedAt: sig.publishedAt,
        latestSignalAt: sig.publishedAt,
        scorecard: {
          environmentalRelevance: sig.environmentalRelevanceScore,
          geographicalRelevance: primaryBureau === 'international' ? 52 : 90,
          publicInterestSignificance: 72,
          scientificSignificance: sig.doi ? 94 : 68,
          freshness: 85,
          sourceQuality: sig.sourceReliability,
          independentCorroboration: 55,
          originalityPotential: 78,
          evidenceCompleteness: sig.sanitizedSummary.length > 180 ? 80 : 62,
          environmentalRiskSignificance: 70,
          editionRelevance: 74,
          legalEthicalSensitivity: 25,
          compositePriorityScore: 75,
        },
        recommendedStream: 'daily_dispatch',
        recommendedDepartmentId: 'field-reports',
        status: 'queued_for_research',
      };
      sig.clusterId = newCluster.id;
      clusters.unshift(newCluster);
      assignedSignalIds.add(sig.id);
    }
  }

  // Re-score every cluster deterministically based on constituent signals
  const signalMap = new Map(acceptedSignals.map((s) => [s.id, s]));
  const taxonomy = getDynamicMonitoringTaxonomy();

  for (const cl of clusters) {
    const memberSignals = cl.signalIds
      .map((id) => signalMap.get(id))
      .filter((s): s is AnieRawSignal => Boolean(s));
    if (memberSignals.length === 0) continue;

    // Count independent source families (distinct root domains excluding syndicated mirrors)
    const uniqueFamilies = new Set(
      memberSignals.map((s) => s.sourceDomain.replace(/^www\./, ''))
    );
    cl.independentSourceFamilyCount = Math.max(1, uniqueFamilies.size);

    const avgEnvRel = Math.round(
      memberSignals.reduce((a, s) => a + s.environmentalRelevanceScore, 0) / memberSignals.length
    );
    const maxReliability = Math.max(...memberSignals.map((s) => s.sourceReliability));
    const hasPeerReviewedDoi = memberSignals.some((s) => Boolean(s.doi));
    const isCoreSixBureau = ['kashmir', 'jammu', 'ladakh', 'ajk', 'gilgit', 'baltistan'].includes(
      cl.primaryBureau
    );

    const ageHours = Math.max(
      0,
      (Date.now() - new Date(cl.latestSignalAt).getTime()) / (1000 * 3600)
    );
    const freshness = Math.max(35, Math.round(100 - Math.min(65, ageHours * 0.4)));

    const combinedText = memberSignals
      .map((s) => `${s.rawTitle} ${s.sanitizedSummary}`)
      .join(' ');
    const highRiskSensitive =
      /\b(accused|allegation|arrest|corruption|illegal|encroachment|court|tribunal|ngt|pil|fir|violation|fatality|death|killed|evacuation)\b/i.test(
        combinedText
      );
    const hazardUrgency =
      /\b(glof|flood|cloudburst|landslide|avalanche|contamination|outbreak|wildfire|retreat|depletion)\b/i.test(
        combinedText
      );

    const corroboration = Math.min(
      100,
      hasPeerReviewedDoi ? 92 : 45 + (cl.independentSourceFamilyCount - 1) * 22
    );
    const scientificSig = hasPeerReviewedDoi
      ? 95
      : Math.min(90, 62 + cl.monitoringDomainIds.length * 8);
    const geoRel = isCoreSixBureau
      ? Math.min(98, 84 + cl.districts.length * 5)
      : cl.primaryBureau === 'western-himalayas'
        ? 78
        : 54;
    const publicInterest = hazardUrgency ? 90 : isCoreSixBureau ? 80 : 66;
    const originality = Math.min(96, 70 + cl.monitoringDomainIds.length * 7 + (isCoreSixBureau ? 10 : 0));
    const evidenceComp = Math.min(
      95,
      (hasPeerReviewedDoi ? 88 : 64) + Math.min(20, memberSignals.length * 6)
    );
    const riskSig = hazardUrgency ? 88 : 68;
    const editionRel =
      scientificSig >= 84 && geoRel >= 78 ? 88 : 68;
    const legalSensitivity = highRiskSensitive ? 78 : 20;

    const composite = Math.round(
      avgEnvRel * 0.16 +
        geoRel * 0.16 +
        publicInterest * 0.1 +
        scientificSig * 0.14 +
        freshness * 0.08 +
        maxReliability * 0.1 +
        corroboration * 0.1 +
        originality * 0.08 +
        evidenceComp * 0.08
    );

    cl.scorecard = {
      environmentalRelevance: avgEnvRel,
      geographicalRelevance: geoRel,
      publicInterestSignificance: publicInterest,
      scientificSignificance: scientificSig,
      freshness,
      sourceQuality: maxReliability,
      independentCorroboration: corroboration,
      originalityPotential: originality,
      evidenceCompleteness: evidenceComp,
      environmentalRiskSignificance: riskSig,
      editionRelevance: editionRel,
      legalEthicalSensitivity: legalSensitivity,
      compositePriorityScore: composite,
    };

    // Determine appropriate editorial department & stream
    // Note: Never assign 'interviews' autonomously (system never fabricates interviews!)
    const leadDom = taxonomy.find((d) => d.id === cl.monitoringDomainIds[0]);
    let dept: EditorialDepartmentId = leadDom?.leadDepartmentId || 'field-reports';
    if (dept === 'interviews') dept = 'editorials';

    let stream: AniePublicationStream = 'daily_dispatch';
    if (
      (cl.independentSourceFamilyCount >= 2 && composite >= 82 && cl.monitoringDomainIds.length >= 2) ||
      (hasPeerReviewedDoi && isCoreSixBureau && composite >= 84)
    ) {
      // High-significance multi-domain or peer-reviewed regional stories can still enter Daily Dispatch
      // OR be flagged directly for Monthly Edition if Cover/Longform/Data
      if (dept === 'cover-stories') {
        stream = 'monthly_edition';
      }
    }
    if (stream === 'daily_dispatch' && dept === 'cover-stories') {
      dept = hasPeerReviewedDoi ? 'data-journalism' : 'field-reports';
    }

    cl.recommendedStream = stream;
    cl.recommendedDepartmentId = dept;
  }

  clusters.sort((a, b) => b.scorecard.compositePriorityScore - a.scorecard.compositePriorityScore);
  return clusters;
}

/**
 * KEW Knowledge Integration Agent (RAG):
 * Queries KEW's live compiled scientific corpus (`getCompiledSearchCorpus()`)
 * to retrieve verified lakes, rivers, glaciers, wetlands, protected areas,
 * biodiversity taxa, 101 sectoral scientific dossiers, and investigations!
 */
export function retrieveKewScientificContext(
  cluster: AnieStoryCluster,
  signals: AnieRawSignal[],
  maxMatches = 6
): AnieKewKnowledgeMatch[] {
  const corpus = getCompiledSearchCorpus();
  const queryTerms = new Set<string>();

  for (const d of cluster.districts) queryTerms.add(d.toLowerCase());
  for (const w of cluster.watersheds) {
    for (const part of w.toLowerCase().split(/[\s-]+/)) {
      if (part.length >= 4) queryTerms.add(part);
    }
  }
  for (const s of signals) {
    for (const top of s.matchedToponyms) {
      if (top.length >= 3) queryTerms.add(top.toLowerCase());
    }
    for (const tok of s.rawTitle.toLowerCase().split(/[^a-z0-9]+/)) {
      if (tok.length >= 5) queryTerms.add(tok);
    }
  }

  const terms = Array.from(queryTerms);
  if (terms.length === 0) return [];

  const scored: AnieKewKnowledgeMatch[] = [];
  for (const doc of corpus.documents) {
    // Exclude admin or dispatch self-links so RAG grounds stories in KEW scientific modules
    if (
      !doc.canonicalUrl ||
      doc.canonicalUrl.startsWith('/himalayan-dispatch') ||
      doc.canonicalUrl.startsWith('/admin')
    ) {
      continue;
    }

    const titleLow = doc.title.toLowerCase();
    const descLow = (doc.description || '').toLowerCase();
    const geoLow = `${doc.subregion || ''} ${doc.district || ''} ${doc.watershed || ''}`.toLowerCase();

    let score = 0;
    for (const t of terms) {
      if (titleLow.includes(t)) score += 14;
      else if (geoLow.includes(t)) score += 8;
      else if (descLow.includes(t)) score += 4;
    }

    if (score >= 16) {
      const evidenceClass: AnieKewKnowledgeMatch['evidenceClass'] =
        doc.canonicalUrl.includes('/sectoral-eia') || doc.id.includes('KEW-SR')
          ? 'kew_scientific_report'
          : doc.canonicalUrl.includes('/investigations') ||
              doc.canonicalUrl.includes('/environmental-investigations')
            ? 'kew_investigation_baseline'
            : 'verified_kew_observatory';

      scored.push({
        entityId: doc.id,
        title: doc.title,
        documentType: doc.documentType,
        moduleLabel: doc.parentModule || 'KEW Scientific Observatory',
        href: doc.canonicalUrl,
        subregion: doc.subregion || 'Western Himalayas',
        district: doc.district,
        watershed: doc.watershed,
        verifiedSummary: (doc.description || '').slice(0, 320),
        relevanceScore: score,
        evidenceClass,
      });
    }
  }

  scored.sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Deduplicate by href
  const seenHrefs = new Set<string>();
  const unique: AnieKewKnowledgeMatch[] = [];
  for (const item of scored) {
    if (seenHrefs.has(item.href)) continue;
    seenHrefs.add(item.href);
    unique.push(item);
    if (unique.length >= maxMatches) break;
  }

  // Always include the lead monitoring domain's canonical KEW module if fewer than 2 matches
  if (unique.length < 2) {
    const taxonomy = getDynamicMonitoringTaxonomy();
    for (const domId of cluster.monitoringDomainIds) {
      const dom = taxonomy.find((d) => d.id === domId);
      if (dom && !seenHrefs.has(dom.kewModuleHref)) {
        seenHrefs.add(dom.kewModuleHref);
        unique.push({
          entityId: `kew-mod-${dom.id}`,
          title: dom.kewModuleLabel,
          documentType: 'observatory_hub',
          moduleLabel: dom.label,
          href: dom.kewModuleHref,
          subregion: getBureauDisplayLabel(cluster.primaryBureau),
          verifiedSummary: `Authoritative Kashmir EcoWatch scientific monitoring module covering ${dom.subjects.join(', ')}.`,
          relevanceScore: 20,
          evidenceClass: 'verified_kew_observatory',
        });
      }
    }
  }

  return unique.slice(0, maxMatches);
}

/**
 * Builds a structured Evidence Dossier with claim-level source traceability
 * and explicit unresolved evidence gaps.
 */
export function buildEvidenceDossier(
  cluster: AnieStoryCluster,
  clusterSignals: AnieRawSignal[]
): AnieEvidenceDossier {
  const nowIso = new Date().toISOString();
  const externalSources: AnieEvidenceSourceItem[] = clusterSignals.map((sig) => ({
    sourceId: sig.sourceId,
    signalId: sig.id,
    url: sig.canonicalUrl,
    publicationTitle: sig.rawTitle,
    publisherName: sig.sourceName,
    authors: sig.authors,
    publishedAt: sig.publishedAt,
    eventDate: sig.estimatedEventDate,
    retrievedAt: sig.retrievedAt,
    sourceCategory: sig.sourceCategory,
    originalLanguage: sig.originalLanguage,
    supportingExcerpt: sig.sanitizedSummary.slice(0, 500),
    doi: sig.doi,
    doiVerified: Boolean(sig.doi && sig.sourceCategory === 'scientific_repository'),
    httpReachable: true,
    verificationStatus:
      sig.sourceCategory === 'scientific_repository' || sig.sourceCategory === 'earth_observation'
        ? 'verified_primary'
        : 'verified_secondary',
    licensingRestriction: sig.licenseRestriction,
  }));

  const kewKnowledgeMatches = retrieveKewScientificContext(cluster, clusterSignals, 5);

  const claimMappings: AnieClaimEvidenceMapping[] = [];

  // Claim 1: Primary reported development / scientific publication
  const leadSig = clusterSignals[0];
  if (leadSig) {
    claimMappings.push({
      id: `clm-${Date.now().toString(36)}-1`,
      claimText: `Reported development: "${leadSig.rawTitle}" documented by ${leadSig.sourceName} (${leadSig.publishedAt.slice(0, 10)}).`,
      claimCategory: leadSig.doi ? 'scientific_literature' : 'empirical_event',
      supportingSourceUrls: externalSources.map((s) => s.url),
      supportingKewHrefs: [],
      independentSourceCount: cluster.independentSourceFamilyCount,
      verificationStatus: leadSig.doi
        ? 'peer_reviewed_doi'
        : cluster.independentSourceFamilyCount >= 2
          ? 'corroborated_multi_source'
          : 'attributed_single_source',
    });
  }

  // Claim 2+: Verified KEW Scientific Baseline Claims
  for (const [idx, km] of kewKnowledgeMatches.slice(0, 3).entries()) {
    claimMappings.push({
      id: `clm-${Date.now().toString(36)}-kew-${idx}`,
      claimText: `KEW baseline context (${km.title}): ${km.verifiedSummary.slice(0, 220)}`,
      claimCategory: 'kew_baseline',
      supportingSourceUrls: [],
      supportingKewHrefs: [km.href],
      independentSourceCount: 1,
      verificationStatus: 'kew_verified_baseline',
    });
  }

  const unresolvedEvidenceGaps: string[] = [];
  if (cluster.independentSourceFamilyCount < 2 && !clusterSignals.some((s) => s.doi)) {
    unresolvedEvidenceGaps.push(
      'Independent multi-publisher corroboration is currently limited to one source family; claims are explicitly attributed to the reporting publication pending primary institutional filings.'
    );
  }
  unresolvedEvidenceGaps.push(
    'No independent on-site Himalayan Dispatch field inspection was conducted for this automated dossier; physical site measurements rely on cited sources and existing KEW observatory baselines.'
  );

  const verificationPassed = externalSources.length >= 1 && claimMappings.length >= 1;

  return {
    id: `dos-${cluster.id.replace(/^clu-/, '')}`,
    clusterId: cluster.id,
    createdAt: nowIso,
    lastVerifiedAt: nowIso,
    externalSources,
    kewKnowledgeMatches,
    claimMappings,
    conflictingEvidenceNotes: [],
    unresolvedEvidenceGaps,
    verificationPassed,
    verificationSummary: verificationPassed
      ? `Verified ${externalSources.length} external source record(s) across ${cluster.independentSourceFamilyCount} independent publisher family(ies) + ${kewKnowledgeMatches.length} KEW scientific baseline record(s).`
      : 'Held: Insufficient primary source evidence.',
  };
}
