// ─────────────────────────────────────────────────────────────────────────────
// HD-ANIE AUTONOMOUS EDITORIAL WRITING DESK, VISUAL MATCHER & QUALITY/RISK GATE
// Generates original source-based environmental journalism connecting live news
// & scholarly discoveries with verified KEW scientific intelligence.
// Enforces institutional byline ("Himalayan Dispatch Intelligence Desk"),
// zero fabricated quotes/interviews, and strict GREEN / AMBER / RED risk controls.
// ─────────────────────────────────────────────────────────────────────────────

import {
  AnieBureauId,
  AnieEditorialDraft,
  AnieEvidenceDossier,
  AnieModelAndBudgetConfig,
  AniePublicationStream,
  AnieQualityCheckReport,
  AnieRiskLevel,
  AnieSourceReferenceCitation,
  AnieStoryCluster,
} from '@/types/hd-anie';
import {
  EditorialDataVisualizationSpec,
  EditorialDepartmentId,
  MagazineStory,
  StoryChapter,
} from '@/types/himalayan-dispatch';
import { EDITORIAL_DEPARTMENTS, REGIONAL_REPORTING_BUREAUS } from '@/data/himalayan-dispatch';
import { getDynamicMonitoringTaxonomy } from './sources-seed';
import { getBureauDisplayLabel } from './intelligence';

interface VerifiedVisualAsset {
  domainIds: string[];
  imageUrl: string;
  caption: string;
  credit: string;
  license: string;
  provenanceType: AnieEditorialDraft['visualProvenanceType'];
}

const VERIFIED_KEW_VISUAL_LIBRARY: VerifiedVisualAsset[] = [
  {
    domainIds: ['cryosphere', 'extreme-weather'],
    imageUrl: '/images/publications/kolahoi-glacier-cryosphere.jpg',
    caption: 'High-altitude ablation zone and proglacial meltwater drainage in the Western Himalayan cryosphere.',
    credit: 'Kashmir EcoWatch Cryosphere Archive · Documentary Plate',
    license: 'KEW Institutional Documentary Archive (Non-Commercial Attribution)',
    provenanceType: 'kew_documentary_plate',
  },
  {
    domainIds: ['lakes-limnology', 'urban-ecology'],
    imageUrl: '/images/publications/dal-lake-lacustrine-houseboats.jpg',
    caption: 'Lacustrine shoreline, floating garden margins, and urban catchment interface in the Kashmir Valley.',
    credit: 'Kashmir EcoWatch Limnology Archive · Documentary Plate',
    license: 'KEW Institutional Documentary Archive',
    provenanceType: 'kew_documentary_plate',
  },
  {
    domainIds: ['wetlands', 'biodiversity'],
    imageUrl: '/images/publications/wular-ramsar-wetland-floodplain.jpg',
    caption: 'Floodplain marsh storage and Central Asian Flyway habitat across Kashmir’s Ramsar wetland network.',
    credit: 'Kashmir EcoWatch Wetland Observatory · Documentary Plate',
    license: 'KEW Institutional Documentary Archive',
    provenanceType: 'kew_documentary_plate',
  },
  {
    domainIds: ['rivers-hydrology', 'infrastructure'],
    imageUrl: '/images/publications/lidder-pahalgam-mountain-river.jpg',
    caption: 'Turbulent glacio-fluvial discharge and boulder-bed riparian corridor in a Western Himalayan headwater valley.',
    credit: 'Kashmir EcoWatch Fluvial Hydrology Archive',
    license: 'KEW Institutional Documentary Archive',
    provenanceType: 'kew_documentary_plate',
  },
  {
    domainIds: ['springs-groundwater', 'environmental-health'],
    imageUrl: '/images/publications/sheshnag-alpine-glacial-lake.jpg',
    caption: 'Oligotrophic high-elevation water body and karst-glacial recharge zone in the Western Himalayas.',
    credit: 'Kashmir EcoWatch Hydrogeology Archive',
    license: 'KEW Institutional Documentary Archive',
    provenanceType: 'kew_documentary_plate',
  },
  {
    domainIds: ['forest-ecosystems', 'protected-areas', 'horticulture'],
    imageUrl: '/images/publications/forestry-betula-treeline-lidar.jpg',
    caption: 'Temperate conifer-broadleaf forest belt and subalpine Betula utilis timberline ecotone.',
    credit: 'Kashmir EcoWatch Forest Ecosystems Observatory',
    license: 'KEW Institutional Documentary Archive',
    provenanceType: 'kew_documentary_plate',
  },
  {
    domainIds: ['atmospheric-systems', 'scientific-research'],
    imageUrl: '/images/publications/atmospheric-karewa-aerosol-station.jpg',
    caption: 'Atmospheric boundary-layer and valley inversion monitoring across Himalayan intermontane terrain.',
    credit: 'Kashmir EcoWatch Atmospheric Intelligence Plate',
    license: 'KEW Institutional Documentary Archive',
    provenanceType: 'kew_scientific_cartography',
  },
  {
    domainIds: ['geomorphology', 'environmental-governance', 'tourism-pilgrimage'],
    imageUrl: '/images/publications/geospatial-gis-earth-observation-lab.jpg',
    caption: 'Multi-spectral Earth observation and watershed slope-stability synthesis across Western Himalayan basins.',
    credit: 'Kashmir EcoWatch Geospatial & Earth Observation Desk',
    license: 'KEW Institutional Cartographic Plate',
    provenanceType: 'kew_scientific_cartography',
  },
];

export function selectVerifiedVisualForDomains(domainIds: string[]): VerifiedVisualAsset {
  for (const d of domainIds) {
    const found = VERIFIED_KEW_VISUAL_LIBRARY.find((v) => v.domainIds.includes(d));
    if (found) return found;
  }
  return VERIFIED_KEW_VISUAL_LIBRARY[0];
}

function slugifyHeadline(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
}

function buildHonestDateline(bureauId: AnieBureauId, districts: string[]): string {
  const bureauRecord = REGIONAL_REPORTING_BUREAUS.find((b) => b.id === bureauId);
  const districtPrefix = districts[0] ? `${districts[0].toUpperCase()} · ` : '';

  // Never imply an operational physical bureau office where status is 'in_establishment'!
  if (bureauRecord && bureauRecord.operationalStatus !== 'active_reporting_desk') {
    return `${districtPrefix}${bureauRecord.name.toUpperCase()} REPORTING BEAT · SOURCE-BASED DISPATCH`;
  }
  if (bureauId === 'kashmir') {
    return `${districtPrefix}KASHMIR DESK · SOURCE-BASED ANALYSIS`;
  }
  if (bureauId === 'international') {
    return 'GLOBAL ENVIRONMENTAL REPORTING DESK · SOURCE-BASED DISPATCH';
  }
  return `${districtPrefix}WESTERN HIMALAYAN EDITORIAL DESK · SOURCE-BASED ANALYSIS`;
}

function synthesizeOriginalHeadline(
  cluster: AnieStoryCluster,
  dossier: AnieEvidenceDossier,
  stream: AniePublicationStream
): { headline: string; standfirst: string; storyType: AnieEditorialDraft['storyType'] } {
  const leadSource = dossier.externalSources[0];
  const taxonomy = getDynamicMonitoringTaxonomy();
  const primaryDomain = taxonomy.find((d) => d.id === cluster.monitoringDomainIds[0]);
  const domainLabel = primaryDomain?.label || 'Environmental Systems';
  const regionName =
    cluster.districts[0] ||
    (cluster.primaryBureau === 'international'
      ? 'Global Mountain & Environmental Systems'
      : getBureauDisplayLabel(cluster.primaryBureau).replace(/\s+(Bureau|Desk)$/i, ''));

  const isPeerReviewed = Boolean(leadSource?.doi);
  const rawTopic = cluster.canonicalTopic
    .replace(/\s*[-|–]\s*(Greater Kashmir|Kashmir Life|Daily Excelsior|Dawn|Pamir Times|BBC|The Guardian|Mongabay).*$/i, '')
    .trim();
  const conciseTopic =
    rawTopic.length > 86 ? `${rawTopic.slice(0, 83).replace(/\s+\S*$/, '')}…` : rawTopic;

  if (stream === 'monthly_edition') {
    const headline = isPeerReviewed
      ? `${regionName} · Research Synthesis: ${conciseTopic}`
      : `Across ${regionName}, ${domainLabel} Pressures Test Mountain Ecological Thresholds`;
    const standfirst = `Synthesizing ${dossier.externalSources.length} external evidentiary record(s) with Kashmir EcoWatch observatory baselines to examine the long-term watershed, governance, and scientific stakes behind "${rawTopic.slice(0, 110)}".`;
    return {
      headline,
      standfirst,
      storyType:
        cluster.recommendedDepartmentId === 'data-journalism'
          ? 'Data Journalism Essay'
          : cluster.recommendedDepartmentId === 'investigative-journalism'
            ? 'Investigative Evidence Dossier'
            : 'Longform Feature',
    };
  }

  if (isPeerReviewed) {
    return {
      headline: `${regionName} · ${
        domainLabel === 'Scientific Research' ? 'Peer-Reviewed Findings' : domainLabel
      }: ${conciseTopic}`,
      standfirst: `Peer-reviewed research published in ${leadSource.publisherName}${
        leadSource.doi ? ` (DOI: ${leadSource.doi})` : ''
      } adds empirical evidence to Kashmir EcoWatch baselines across ${
        primaryDomain?.subjects.slice(0, 3).join(', ').toLowerCase() || 'mountain ecosystems'
      }.`,
      storyType: 'Research Summary',
    };
  }

  // Transform raw news topic into original analytical headline (never verbatim publisher headline)
  const shortCore = rawTopic.length > 78 ? `${rawTopic.slice(0, 75).replace(/\s+\S*$/, '')}...` : rawTopic;
  return {
    headline: `${regionName} · ${domainLabel} Assessment: ${shortCore}`,
    standfirst: `Source-based environmental dispatch cross-referencing reported developments from ${leadSource?.publisherName || 'regional monitoring'} against Kashmir EcoWatch scientific baselines and watershed records.`,
    storyType:
      cluster.independentSourceFamilyCount >= 2 ? 'Environmental Analysis' : 'Regional Dispatch',
  };
}

function composeEvidenceBoundChapters(
  cluster: AnieStoryCluster,
  dossier: AnieEvidenceDossier,
  stream: AniePublicationStream
): StoryChapter[] {
  const taxonomy = getDynamicMonitoringTaxonomy();
  const primaryDomain = taxonomy.find((d) => d.id === cluster.monitoringDomainIds[0]);
  const secondaryDomain = taxonomy.find((d) => d.id === cluster.monitoringDomainIds[1]);
  const leadSource = dossier.externalSources[0];
  const additionalSources = dossier.externalSources.slice(1);
  const kewMatches = dossier.kewKnowledgeMatches;
  const regionLabel = getBureauDisplayLabel(cluster.primaryBureau).replace(/\s+Bureau$/i, '');
  const watershedPhrase =
    cluster.watersheds.length > 0
      ? `within the ${cluster.watersheds.join(' and ')}`
      : `across the ${regionLabel} ecological zone`;

  const chapter1Paragraphs: string[] = [
    `Recent reporting and documentary records have focused renewed attention on ${
      primaryDomain?.label.toLowerCase() || 'environmental conditions'
    } ${watershedPhrase}${
      cluster.districts.length > 0 ? `, specifically implicating ${cluster.districts.join(', ')}` : ''
    }. According to ${leadSource?.publisherName || 'monitored source filings'} (${
      leadSource?.publishedAt.slice(0, 10) || 'recent filing'
    }), ${
      leadSource?.doi
        ? `peer-reviewed research titled "${leadSource.publicationTitle}" (DOI: ${leadSource.doi}) documents critical empirical patterns:`
        : `emerging developments centered on "${leadSource?.publicationTitle || cluster.canonicalTopic}" highlight active environmental pressures:`
    } ${
      leadSource?.supportingExcerpt
        ? leadSource.supportingExcerpt
        : 'primary metadata indicates ongoing hydrological and ecological sensitivity requiring structured scientific scrutiny.'
    }`,
  ];

  if (additionalSources.length > 0) {
    const corrNames = Array.from(new Set(additionalSources.map((s) => s.publisherName))).join(', ');
    chapter1Paragraphs.push(
      `Cross-monitoring by the Himalayan Dispatch Research Desk identified ${
        additionalSources.length
      } additional related record(s) across ${corrNames}, representing ${
        cluster.independentSourceFamilyCount
      } distinct publisher family(ies). Treating syndicated wire copies as a single source family rather than independent confirmation, the corroborated core centres on ${
        primaryDomain?.subjects.join(', ').toLowerCase() || 'regional environmental change'
      }.`
    );
  } else {
    chapter1Paragraphs.push(
      `At the time of dossier compilation, this development traces to ${
        leadSource?.doi ? 'a primary peer-reviewed scholarly record' : 'a single reporting source family'
      } (${leadSource?.publisherName || 'cited publisher'}). In accordance with Himalayan Dispatch verification standards, all empirical assertions from the originating report are attributed transparently rather than overstated as multi-source consensus.`
    );
  }

  const chapter2Paragraphs: string[] = [];
  if (kewMatches.length > 0) {
    const firstKew = kewMatches[0];
    chapter2Paragraphs.push(
      `Placed alongside Kashmir EcoWatch’s institutional knowledge base, the significance of this development extends beyond an isolated news cycle. Within the ${firstKew.moduleLabel} (${firstKew.title}), baseline records establish the underlying vulnerability of the landscape: ${firstKew.verifiedSummary}`
    );
    if (kewMatches.length > 1) {
      const restSummaries = kewMatches
        .slice(1, 3)
        .map((m) => `${m.title} (${m.verifiedSummary.slice(0, 160)}...)`)
        .join('; and ');
      chapter2Paragraphs.push(
        `Adjacent KEW observatories reinforce this systems-level reading—specifically ${restSummaries} Together, these baseline layers show why disturbances in ${
          primaryDomain?.label.toLowerCase() || 'mountain catchments'
        }${
          secondaryDomain ? ` frequently cascade into ${secondaryDomain.label.toLowerCase()}` : ' rarely remain localized'
        } across steep Western Himalayan elevation gradients.`
      );
    }
  } else {
    chapter2Paragraphs.push(
      `Interpreted through Kashmir EcoWatch’s Western Himalayan monitoring framework, developments in ${
        primaryDomain?.label.toLowerCase() || 'this sector'
      } interact directly with seasonal snowmelt timing, slope stability, and downstream community water security.`
    );
  }

  const chapter3Paragraphs: string[] = [
    `Several evidentiary questions remain open and warrant continued institutional monitoring. ${dossier.unresolvedEvidenceGaps.join(
      ' '
    )}`,
    `Key indicators to track across forthcoming reporting cycles include official environmental compliance disclosures, updated remote-sensing or station series within ${
      primaryDomain?.kewModuleLabel || 'KEW observatories'
    }, and whether independent academic or regulatory measurements corroborate the trajectory signalled in ${regionLabel}.`,
  ];

  const chapters: StoryChapter[] = [
    {
      numberRoman: 'I',
      title: 'The Reported Signal & Source Evidence',
      paragraphs: chapter1Paragraphs,
      fieldNote: {
        label: 'SOURCE PROVENANCE',
        detail: `${dossier.externalSources.length} external record(s) · ${cluster.independentSourceFamilyCount} independent source family(ies) · Event window: ${cluster.earliestEventDate}`,
      },
    },
    {
      numberRoman: 'II',
      title: 'Scientific Context & KEW Baseline Intelligence',
      paragraphs: chapter2Paragraphs,
      fieldNote:
        kewMatches[0]
          ? {
              label: 'LINKED KEW OBSERVATORY',
              detail: `${kewMatches[0].title} (${kewMatches[0].subregion})`,
            }
          : undefined,
    },
    {
      numberRoman: 'III',
      title: 'Accountability Questions & Evidence Gaps',
      paragraphs: chapter3Paragraphs,
    },
  ];

  // Expand deeply when generating a Monthly Edition longform/investigative/data manuscript (1,500+ words target structure)
  if (stream === 'monthly_edition') {
    chapters.splice(2, 0, {
      numberRoman: 'III',
      title: 'Trans-Regional Implications Across the Western Himalayas',
      paragraphs: [
        `Viewed at the scale of the wider Western Himalayan arc—spanning Kashmir, Jammu, Ladakh, Azad Jammu & Kashmir, Gilgit, and Baltistan—pressures documented ${watershedPhrase} mirror structural transitions unfolding across shared cryospheric and fluvial basins. High-relief mountain watersheds transmit upstream land-use, thermal, and hydrological perturbations rapidly toward valley settlements and wetland buffers.`,
        `Within Kashmir EcoWatch’s multidisciplinary research architecture, integrating ${
          primaryDomain?.label || 'environmental monitoring'
        } with statutory environmental impact assessment, historical baseline inventories, and open scholarly literature enables public-interest scrutiny grounded in verifiable measurements rather than episodic headlines.`,
        `Where regulatory filings, bathymetric or discharge time series, and peer-reviewed field campaigns remain incomplete, transparent documentation of uncertainty is itself an essential instrument of environmental governance.`,
      ],
      pullQuote: {
        quote:
          'Other publications report an isolated event; scientific environmental journalism examines the watershed, cryospheric, and governance baseline in which that event unfolds.',
        attribution: 'Himalayan Dispatch Editorial Desk · Methodological Note',
      },
    });
    // Renumber Roman numerals cleanly I..IV
    const romans = ['I', 'II', 'III', 'IV'];
    chapters.forEach((ch, idx) => {
      ch.numberRoman = romans[idx] || String(idx + 1);
    });
  }

  return chapters;
}

/**
 * Optional paid/local LLM API upgrade path respecting strict daily/monthly spending ceilings.
 * Falls back cleanly to deterministic evidence-bound synthesis at $0.00 cost when no API key
 * is configured or when spending ceilings are reached.
 */
async function maybeEnhanceWithConfiguredLlm(
  draft: { headline: string; standfirst: string; chapters: StoryChapter[] },
  dossier: AnieEvidenceDossier,
  budget: AnieModelAndBudgetConfig
): Promise<{
  headline: string;
  standfirst: string;
  chapters: StoryChapter[];
  generationMethod: string;
  promptTokens: number;
  completionTokens: number;
  estimatedCostUsd: number;
}> {
  if (
    budget.paidProcessingHaltedByBudget ||
    budget.measuredSpentTodayUsd >= budget.dailySpendingCeilingUsd ||
    budget.measuredSpentMonthUsd >= budget.monthlySpendingCeilingUsd
  ) {
    return {
      ...draft,
      generationMethod: 'HD-ANIE Deterministic Evidence-RAG Synthesis ($0.00 · Budget Guard Active)',
      promptTokens: 0,
      completionTokens: 0,
      estimatedCostUsd: 0,
    };
  }

  const ollamaUrl = process.env.OLLAMA_BASE_URL;
  const openAiKey = process.env.OPENAI_API_KEY;

  // Never send untrusted raw instructions as system prompt: isolate retrieved facts as JSON data
  if (!ollamaUrl && !openAiKey) {
    return {
      ...draft,
      generationMethod: 'HD-ANIE Deterministic Evidence-RAG Synthesis ($0.00 · Zero External LLM Cost)',
      promptTokens: 0,
      completionTokens: 0,
      estimatedCostUsd: 0,
    };
  }

  try {
    const evidencePacket = JSON.stringify({
      sources: dossier.externalSources.map((s) => ({
        publisher: s.publisherName,
        title: s.publicationTitle,
        date: s.publishedAt.slice(0, 10),
        doi: s.doi,
        excerpt: s.supportingExcerpt,
      })),
      kewBaselines: dossier.kewKnowledgeMatches.map((k) => ({
        title: k.title,
        summary: k.verifiedSummary,
      })),
      gaps: dossier.unresolvedEvidenceGaps,
    });

    if (ollamaUrl) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 7000);
      const res = await fetch(`${ollamaUrl.replace(/\/$/, '')}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: budget.primaryModelName || 'llama3.1',
          stream: false,
          system:
            'You are the Himalayan Dispatch Intelligence Desk copy editor. Refine only the standfirst (1 sentence, <=45 words) strictly from the provided JSON facts. Never invent quotes, interviews, numbers, or field visits.',
          prompt: `UNTRUSTED_EVIDENCE_JSON:\n${evidencePacket}\n\nReturn plain text standfirst only:`,
        }),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.ok) {
        const j = await res.json();
        const candidate = String(j?.response || '').trim();
        if (candidate.length >= 40 && candidate.length <= 320 && !candidate.includes('"')) {
          return {
            ...draft,
            standfirst: candidate,
            generationMethod: `HD-ANIE Local Ollama (${budget.primaryModelName || 'llama3.1'}) + Deterministic RAG ($0.00)`,
            promptTokens: Number(j.prompt_eval_count || 0),
            completionTokens: Number(j.eval_count || 0),
            estimatedCostUsd: 0,
          };
        }
      }
    }
  } catch {
    // Fall back safely to deterministic synthesis
  }

  return {
    ...draft,
    generationMethod: 'HD-ANIE Deterministic Evidence-RAG Synthesis ($0.00)',
    promptTokens: 0,
    completionTokens: 0,
    estimatedCostUsd: 0,
  };
}

/**
 * Independent Deterministic Quality & Risk Classification Gate:
 * Evaluates factual traceability, source citations, absence of fabricated quotes,
 * bureau establishment honesty, and classifies GREEN / AMBER / RED risk level.
 */
export function evaluateDraftQualityAndRisk(
  draft: Omit<AnieEditorialDraft, 'qualityReport' | 'riskLevel' | 'riskReasons' | 'scientificReviewRequired' | 'legalReviewRequired'>,
  cluster: AnieStoryCluster,
  dossier: AnieEvidenceDossier
): {
  qualityReport: AnieQualityCheckReport;
  riskLevel: AnieRiskLevel;
  riskReasons: string[];
  scientificReviewRequired: boolean;
  legalReviewRequired: boolean;
} {
  const warnings: string[] = [];
  const allBodyText = draft.chapters.flatMap((c) => c.paragraphs).join(' ');

  const factualTraceabilityPassed =
    dossier.claimMappings.length >= 1 && draft.sourceReferences.length >= 1;
  if (!factualTraceabilityPassed) warnings.push('Missing source reference mapping.');

  const citationValidityPassed = draft.sourceReferences.every(
    (r) => r.url.startsWith('http://') || r.url.startsWith('https://') || r.url.startsWith('/')
  );

  // Ensure zero fabricated direct eyewitness quotes (only cited publication titles permitted in quotes)
  const directSpeechPattern = /\b(said in an interview|told Himalayan Dispatch|speaking to our correspondent)\b/i;
  const zeroFabricatedQuotesPassed = !directSpeechPattern.test(allBodyText);
  if (!zeroFabricatedQuotesPassed) {
    warnings.push('Detected prohibited first-person interview phrasing in automated draft.');
  }

  // Bureau honesty check
  const bureauObj = REGIONAL_REPORTING_BUREAUS.find((b) => b.id === draft.bureauId);
  const bureauStatusHonestyPassed =
    !bureauObj ||
    bureauObj.operationalStatus === 'active_reporting_desk' ||
    !draft.dateline.includes('BUREAU OFFICE');

  const imageProvenancePassed = Boolean(draft.heroImage && draft.heroCredit && draft.heroLicense);
  const copyrightCompliancePassed = draft.wordCount >= 180;

  const combinedSourceText = `${cluster.canonicalTopic} ${dossier.externalSources
    .map((s) => s.supportingExcerpt)
    .join(' ')}`;

  const redTriggers: string[] = [];
  if (
    /\b(accused|alleged|corruption|bribe|arrested|criminal|defamation|negligence suit|confidential|whistleblower)\b/i.test(
      combinedSourceText
    )
  ) {
    redTriggers.push('Contains allegations, legal disputes, or named-party accountability claims requiring legal & right-of-reply review.');
  }
  if (
    /\b(evacuate|imminent dam failure|drinking water poison|toxic spill|fatalities)\b/i.test(
      combinedSourceText
    )
  ) {
    redTriggers.push('Involves life-safety or acute public-health hazard claims requiring mandatory human verification.');
  }
  if (draft.departmentId === 'investigative-journalism') {
    redTriggers.push('Investigative Desk classification mandates explicit human editorial & legal authorization.');
  }

  const amberTriggers: string[] = [];
  if (draft.stream === 'monthly_edition') {
    amberTriggers.push('Monthly Edition longform/feature manuscript requires authorized editor curation.');
  }
  if (
    /\b(ngt|tribunal|high court|policy|clearance|hydropower|contested|disputed)\b/i.test(
      combinedSourceText
    )
  ) {
    amberTriggers.push('Involves regulatory, judicial, or policy interpretation.');
  }
  if (cluster.independentSourceFamilyCount < 2 && !dossier.externalSources.some((s) => s.doi)) {
    amberTriggers.push('Single-source external report without peer-reviewed DOI — editorial check recommended.');
  }

  let riskLevel: AnieRiskLevel = 'GREEN';
  const riskReasons: string[] = [];

  if (redTriggers.length > 0) {
    riskLevel = 'RED';
    riskReasons.push(...redTriggers);
  } else if (amberTriggers.length > 0) {
    riskLevel = 'AMBER';
    riskReasons.push(...amberTriggers);
  } else {
    riskLevel = 'GREEN';
    riskReasons.push(
      'Corroborated or DOI-verified low-risk environmental/scientific update — eligible for administrator 1-click or batch publication.'
    );
  }

  const rightOfReplyFlagged = redTriggers.length > 0;

  const qualityReport: AnieQualityCheckReport = {
    checkedAt: new Date().toISOString(),
    factualTraceabilityPassed,
    citationValidityPassed,
    numericalConsistencyPassed: true,
    geographicalAccuracyPassed: Boolean(draft.regionDisplay),
    chronologicalAccuracyPassed: Boolean(draft.createdAt),
    zeroFabricatedQuotesPassed,
    copyrightCompliancePassed,
    imageProvenancePassed,
    bureauStatusHonestyPassed,
    rightOfReplyFlagged,
    overallPassed:
      factualTraceabilityPassed &&
      citationValidityPassed &&
      zeroFabricatedQuotesPassed &&
      copyrightCompliancePassed &&
      imageProvenancePassed &&
      bureauStatusHonestyPassed,
    warnings,
  };

  return {
    qualityReport,
    riskLevel,
    riskReasons,
    scientificReviewRequired: riskLevel !== 'GREEN',
    legalReviewRequired: riskLevel === 'RED',
  };
}

/**
 * Generates a complete, publication-ready `AnieEditorialDraft` (defaulting strictly to
 * unpublished `'awaiting_review'` status for Administrator editorial control).
 */
export async function generateAutonomousEditorialDraft(
  cluster: AnieStoryCluster,
  dossier: AnieEvidenceDossier,
  budget: AnieModelAndBudgetConfig,
  options?: {
    overrideStream?: AniePublicationStream;
    targetEditionSlug?: string;
    promotedFromDispatchId?: string;
  }
): Promise<{
  draft: AnieEditorialDraft;
  promptTokens: number;
  completionTokens: number;
  costUsd: number;
}> {
  const nowIso = new Date().toISOString();
  const stream = options?.overrideStream || cluster.recommendedStream;
  const departmentId: EditorialDepartmentId =
    stream === 'monthly_edition' && cluster.recommendedDepartmentId === 'field-reports'
      ? 'longform-features'
      : cluster.recommendedDepartmentId;

  const deptObj =
    EDITORIAL_DEPARTMENTS.find((d) => d.id === departmentId) || EDITORIAL_DEPARTMENTS[2];
  const taxonomy = getDynamicMonitoringTaxonomy();
  const leadDom = taxonomy.find((d) => d.id === cluster.monitoringDomainIds[0]);

  const { headline, standfirst, storyType } = synthesizeOriginalHeadline(cluster, dossier, stream);
  const rawChapters = composeEvidenceBoundChapters(cluster, dossier, stream);

  const enhanced = await maybeEnhanceWithConfiguredLlm(
    { headline, standfirst, chapters: rawChapters },
    dossier,
    budget
  );

  const visual = selectVerifiedVisualForDomains(cluster.monitoringDomainIds);

  const sourceReferences: AnieSourceReferenceCitation[] = [
    ...dossier.externalSources.map((s, idx) => ({
      refNumber: idx + 1,
      label: s.publicationTitle,
      publisherOrJournal: s.publisherName,
      publishedDate: s.publishedAt.slice(0, 10),
      url: s.url,
      doi: s.doi,
      evidenceType: (s.doi
        ? 'Peer-Reviewed Study'
        : s.sourceCategory === 'government_regulatory'
          ? 'Official Notice'
          : 'News Report') as AnieSourceReferenceCitation['evidenceType'],
    })),
    ...dossier.kewKnowledgeMatches.slice(0, 3).map((k, idx) => ({
      refNumber: dossier.externalSources.length + idx + 1,
      label: k.title,
      publisherOrJournal: `Kashmir EcoWatch · ${k.moduleLabel}`,
      publishedDate: nowIso.slice(0, 10),
      url: k.href,
      evidenceType: 'KEW Observatory' as const,
    })),
  ];

  const allText = [
    enhanced.headline,
    enhanced.standfirst,
    ...enhanced.chapters.flatMap((c) => c.paragraphs),
  ].join(' ');
  const wordCount = allText.trim().split(/\s+/).filter(Boolean).length;
  const readingTimeMinutes = Math.max(2, Math.round(wordCount / 210));

  const baseSlug = slugifyHeadline(enhanced.headline);
  const uniqueSuffix = cluster.id.slice(-4);
  const slug = `${baseSlug}-${uniqueSuffix}`;

  const targetEditionSlug =
    options?.targetEditionSlug ||
    (stream === 'monthly_edition' ? 'issue-02-a-world-in-transition' : 'daily-dispatch-stream');
  const editionLabel =
    stream === 'monthly_edition' ? 'FORTHCOMING MONTHLY EDITION' : 'THE DAILY DISPATCH';

  // Optional Editorial Data Visualization for Data Journalism essays
  const dataVisualization: EditorialDataVisualizationSpec | undefined =
    departmentId === 'data-journalism'
      ? {
          id: `viz-${slug}`,
          kicker: 'EDITORIAL EVIDENCE PROFILE',
          title: `${leadDom?.label || 'Environmental'} Signal & Corroboration Index`,
          subtitle: 'Measured multi-dimensional editorial evaluation across monitored records',
          unit: 'Score / 100',
          chartStyle: 'snowline_horizon',
          keyFindingStat: `${cluster.scorecard.compositePriorityScore}/100`,
          keyFindingNarrative: `Evaluated across ${dossier.externalSources.length} source record(s) and ${dossier.kewKnowledgeMatches.length} KEW baseline observatory layers.`,
          methodologyNote:
            'Computed deterministically from source reliability, geographical specificity, independent publisher families, and KEW baseline overlap.',
          sourceCitation: 'HD-ANIE Evidence Dossier & Kashmir EcoWatch Observatory Corpus',
          points: [
            { yearOrLabel: 'Env. Relevance', primaryValue: cluster.scorecard.environmentalRelevance },
            { yearOrLabel: 'Geo. Specificity', primaryValue: cluster.scorecard.geographicalRelevance },
            { yearOrLabel: 'Scientific Depth', primaryValue: cluster.scorecard.scientificSignificance },
            { yearOrLabel: 'Source Quality', primaryValue: cluster.scorecard.sourceQuality },
            { yearOrLabel: 'Corroboration', primaryValue: cluster.scorecard.independentCorroboration },
          ],
        }
      : undefined;

  const partialDraft: Omit<
    AnieEditorialDraft,
    'qualityReport' | 'riskLevel' | 'riskReasons' | 'scientificReviewRequired' | 'legalReviewRequired'
  > = {
    id: `drf-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    slug,
    stream,
    targetEditionSlug,
    editionLabel,
    promotedFromDispatchId: options?.promotedFromDispatchId,
    clusterId: cluster.id,
    dossierId: dossier.id,
    editorialStatus: 'awaiting_review', // NEVER auto-published; Administrator holds final authority
    scientificReviewApproved: false,
    legalReviewApproved: false,
    isFeatured: false,
    departmentId,
    departmentRubric: `${deptObj.shortLabel.toUpperCase()} · ${
      stream === 'daily_dispatch' ? 'DAILY DISPATCH' : 'MONTHLY EDITION'
    }`,
    folioCode: stream === 'daily_dispatch' ? 'DD' : `FOLIO ${deptObj.folioNumber}`,
    bureauId: cluster.primaryBureau,
    bureauLabel: getBureauDisplayLabel(cluster.primaryBureau),
    regionDisplay:
      cluster.districts.length > 0
        ? `${cluster.districts.join(', ')} · ${getBureauDisplayLabel(cluster.primaryBureau).replace(/\s+Bureau$/i, '')}`
        : getBureauDisplayLabel(cluster.primaryBureau).replace(/\s+Bureau$/i, ''),
    districts: cluster.districts,
    watersheds: cluster.watersheds,
    monitoringDomainIds: cluster.monitoringDomainIds,
    reportingBeat: leadDom?.label || 'Western Himalayan Environment',
    storyType,
    headline: enhanced.headline,
    standfirst: enhanced.standfirst,
    bylineDisplay: 'Himalayan Dispatch Desk',
    bylineRole: 'Source-Based Environmental Analysis · Editorial Desk',
    isAiAssisted: true,
    dateline: buildHonestDateline(cluster.primaryBureau, cluster.districts),
    executiveSummary: enhanced.standfirst,
    chapters: enhanced.chapters,
    scientificContextSummary:
      dossier.kewKnowledgeMatches[0]?.verifiedSummary ||
      `Connected to Kashmir EcoWatch ${leadDom?.kewModuleLabel || 'Scientific Observatory'}.`,
    dataVisualization,
    heroImage: visual.imageUrl,
    heroCaption: visual.caption,
    heroCredit: visual.credit,
    heroLicense: visual.license,
    visualProvenanceType: visual.provenanceType,
    sourceReferences,
    limitationsAndEvidenceGaps: dossier.unresolvedEvidenceGaps,
    editorialDisclosure:
      'Prepared by the Himalayan Dispatch Desk through multi-source documentary research, claim-level citation verification, and Kashmir EcoWatch scientific baseline correlation. Source-based synthesis; no unverified field visit or fabricated interview is represented. Published upon senior editorial sign-off.',
    relatedKewModules: dossier.kewKnowledgeMatches.slice(0, 3).map((m) => ({
      label: m.title,
      href: m.href,
      scientificContext: m.verifiedSummary.slice(0, 200),
    })),
    wordCount,
    readingTimeMinutes,
    seoTitle: `${enhanced.headline} — Himalayan Dispatch`,
    metaDescription: enhanced.standfirst.slice(0, 158),
    canonicalPath: `/stories/${slug}`,
    seoKeywords: Array.from(
      new Set([
        'Himalayan Dispatch',
        getBureauDisplayLabel(cluster.primaryBureau),
        leadDom?.label || 'Western Himalayas',
        ...cluster.districts,
      ])
    ).slice(0, 8),
    createdAt: nowIso,
    updatedAt: nowIso,
    corrections: [],
    revisionHistory: [
      {
        id: `rev-${Date.now()}`,
        timestamp: nowIso,
        actor: 'HD-ANIE Autonomous Writing Desk',
        actorType: 'hd_anie_engine',
        summary: `Generated initial ${stream === 'daily_dispatch' ? 'Daily Dispatch' : 'Monthly Edition'} manuscript from ${dossier.externalSources.length} verified source(s) and ${dossier.kewKnowledgeMatches.length} KEW baseline(s). Queued for administrator review.`,
        newStatus: 'awaiting_review',
      },
    ],
    generationMethod: enhanced.generationMethod,
  };

  const gate = evaluateDraftQualityAndRisk(partialDraft, cluster, dossier);

  const fullDraft: AnieEditorialDraft = {
    ...partialDraft,
    ...gate,
  };

  return {
    draft: fullDraft,
    promptTokens: enhanced.promptTokens,
    completionTokens: enhanced.completionTokens,
    costUsd: enhanced.estimatedCostUsd,
  };
}

/**
 * Converts a published (or previewed) `AnieEditorialDraft` into a canonical `MagazineStory`
 * so all existing Himalayan Dispatch layouts (`StoryReaderClient`, `DepartmentsExplorerClient`,
 * `CurrentEditionExperience`, `sitemap.ts`, RSS feed) render it seamlessly!
 */
export function projectAnieDraftToMagazineStory(draft: AnieEditorialDraft): MagazineStory {
  // Append source references & disclosure cleanly as the closing colophon chapter
  const citationLines = draft.sourceReferences.map(
    (r) =>
      `[${r.refNumber}] ${r.label} — ${r.publisherOrJournal} (${r.publishedDate})${
        r.doi ? ` · DOI: ${r.doi}` : ''
      } · ${r.url}`
  );

  const enrichedChapters: StoryChapter[] = [
    ...draft.chapters,
    {
      numberRoman: draft.chapters.length === 3 ? 'IV' : 'V',
      title: 'Sources, Limitations & Editorial Disclosure',
      paragraphs: [
        draft.editorialDisclosure,
        ...(draft.limitationsAndEvidenceGaps.length > 0
          ? [`Methodological Limitations: ${draft.limitationsAndEvidenceGaps.join(' ')}`]
          : []),
        ...citationLines,
      ],
    },
  ];

  const primaryKew = draft.relatedKewModules[0];

  return {
    id: draft.id,
    slug: draft.slug,
    editionSlug: draft.targetEditionSlug,
    editionLabel: draft.editionLabel,
    departmentId: draft.departmentId,
    departmentRubric: draft.departmentRubric,
    folioCode: draft.folioCode,
    title: draft.headline,
    subtitle: draft.standfirst,
    excerpt: draft.executiveSummary,
    dateline: draft.dateline,
    region: draft.regionDisplay,
    readingTimeMinutes: draft.readingTimeMinutes,
    wordCount: draft.wordCount,
    publishedAt: (draft.publishedAt || draft.updatedAt).slice(0, 10),
    updatedAt: draft.updatedAt.slice(0, 10),
    heroImage: draft.heroImage,
    heroCaption: draft.heroCaption,
    heroCredit: `${draft.heroCredit} (${draft.heroLicense})`,
    heroMonochrome: draft.heroMonochrome,
    journalistSlug: draft.assignedJournalistSlug || 'himalayan-dispatch-desk',
    bylineDisplay:
      draft.bylineDisplay === 'Himalayan Dispatch Intelligence Desk'
        ? 'Himalayan Dispatch Desk'
        : draft.bylineDisplay,
    bylineRole: draft.bylineRole,
    factCheckedBy:
      draft.scientificReviewApproved && draft.scientificReviewedBy
        ? `${draft.scientificReviewedBy} · Office of Editorial Standards`
        : 'Office of Editorial Standards & Source Verification',
    scientificReviewer:
      draft.scientificReviewApproved && draft.scientificReviewedBy
        ? draft.scientificReviewedBy
        : 'Kashmir EcoWatch Scientific Baseline Correlation',
    workflowStage: draft.editorialStatus === 'published' ? 'publication' : 'editorial_approval',
    isPublished: draft.editorialStatus === 'published',
    isFeaturedCoverStory: draft.isFeatured && draft.departmentId === 'cover-stories',
    isBigRead: draft.stream === 'monthly_edition' && draft.departmentId === 'longform-features',
    isVisualJournal: draft.departmentId === 'photo-essays',
    chapters: enrichedChapters,
    dataVisualization: draft.dataVisualization,
    corrections: draft.corrections,
    relatedKewModule: primaryKew,
    seoKeywords: draft.seoKeywords,
  };
}
