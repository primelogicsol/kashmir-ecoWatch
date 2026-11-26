// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — AUTOMATED SCIENTIFIC CONTENT QUALITY GATES
// Evaluates all 100 research dossiers (and up to 2,000 chapters) against the
// 11 Mandatory Publication Quality Gates and 12 Administrative QC Metrics.
// Prevents any report with unresolved duplication, generic methodology,
// unverified references, or geographical/provenance defects from being
// classified as an Approved Scientific Publication / Published report.
// ─────────────────────────────────────────────────────────────────────────────

import type { CanonicalReportMasterRecord } from '@/data/sectoral-research-content-engine';
import { isVerifiedRealDoi } from '@/lib/seo/structured-data';

export interface GateCheckResult {
  gateId:
    | 'unique_scientific_content'
    | 'research_specific_methodology'
    | 'verified_bibliography'
    | 'geographical_accuracy'
    | 'environmental_indicator_relevance'
    | 'scientific_data_provenance'
    | 'report_specific_visualizations'
    | 'evidence_supported_conclusions'
    | 'pdf_integrity'
    | 'viewing_and_sharing_functionality'
    | 'scientific_review_and_approval';
  label: string;
  passed: boolean;
  statusLabel: 'Verified Pass' | 'Flagged for Remediation' | 'Pending Peer Approval';
  findings: string[];
}

export interface DossierForensicAuditResult {
  code: string;
  sequenceNumber: number;
  title: string;
  sectorRoman: string;
  sectorTag: string;
  status: string;
  publicationClassification: string;
  primaryDiscipline: string;
  chapterCount: number;
  totalParagraphs: number;
  totalWords: number;
  oneParagraphChapters: number;
  exactDuplicateParagraphs: number;
  semanticDuplicateParagraphs: number;
  maxCrossReportShingleOverlapPct: number;
  closestOverlapReportCode: string | null;
  hasGenericMethodology: boolean;
  hasValidGeography: boolean;
  hasReportSpecificIndicators: boolean;
  hasVerifiedBibliography: boolean;
  hasAvailableScientificData: boolean;
  hasReportSpecificVisualizations: boolean;
  hasUnresolvedEvidenceLimitations: boolean;
  readyForScientificReview: boolean;
  approvedForPublication: boolean;
  criticalDefects: string[];
  gates: GateCheckResult[];
}

export interface PortfolioQualityControlSummary {
  auditedAt: string;
  totalReportsAudited: number;
  totalChaptersInspected: number;
  totalSectorsCovered: number;
  individuallyVerifiedCount: number;

  // Section 21 Administrative Quality Control Counters
  reportsWithDuplicatedContent: number;
  reportsWithGenericMethodology: number;
  reportsWithVerifiedReferences: number;
  reportsWithUniqueScientificChapters: number;
  reportsWithValidatedGeographicBoundaries: number;
  reportsWithReportSpecificIndicators: number;
  reportsWithAvailableScientificData: number;
  reportsWithUnresolvedEvidenceLimitations: number;
  reportsReadyForScientificReview: number;
  reportsApprovedForPublication: number;
  reportsWithValidatedPdfAssets: number;

  // Section 5 Mandatory 11 Quality Gate Pass Counts
  gateSummary: Array<{
    gateId: GateCheckResult['gateId'];
    label: string;
    passedCount: number;
    totalCount: number;
    overallStatus: string;
  }>;

  dossierResults: DossierForensicAuditResult[];
}

const BANNED_GENERIC_SUBSTRINGS = [
  'Primary ecological & hydrological receptors',
  'Scoped under KEW-SR-2026-',
  'Domain SI Index (Scoped)',
  'Multi-Temporal Satellite Land/Surface Change Signal',
  'Regional Environmental Baseline Reports, Statutory Monitoring Series & District Statistical Digests',
  'Multi-decadal environmental, hydrological and land-system transformations in the Kashmir Himalaya',
  'Secondary Orbital & Reanalysis Screening Products',
  'across the 40-dossier Western Himalayan Cumulative Environmental Impact Assessment',
  'Screens sensitivity of aquatic macrophytes, cold-water fisheries, riparian corridors, alpine turf communities, and soil microbial food webs within the study watershed',
  'Regional Secondary Baseline Screening Series',
  'Regional Archive Composite',
];

function buildFiveWordShingles(text: string): Set<string> {
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2);
  const shingles = new Set<string>();
  for (let i = 0; i <= words.length - 5; i++) {
    shingles.add(words.slice(i, i + 5).join(' '));
  }
  return shingles;
}

export function auditAllDossiersQualityGates(
  masters: CanonicalReportMasterRecord[],
  validatedPdfCodes?: Set<string>
): PortfolioQualityControlSummary {
  // 1. Global frequency maps for exact paragraph, coordinate, and shingle overlap detection
  const paragraphFreq = new Map<string, number>();
  const coordFreq = new Map<string, number>();
  const reportShingles = new Map<string, Set<string>>();

  for (const m of masters) {
    const cKey = `${m.studyArea.coordinates[0].toFixed(3)},${m.studyArea.coordinates[1].toFixed(3)}`;
    coordFreq.set(cKey, (coordFreq.get(cKey) || 0) + 1);

    const allProse: string[] = [];
    for (const ch of m.chapters) {
      for (const p of ch.paragraphs) {
        const norm = p.trim();
        if (norm.length > 30) {
          paragraphFreq.set(norm, (paragraphFreq.get(norm) || 0) + 1);
          allProse.push(norm);
        }
      }
    }
    reportShingles.set(m.dossier.code, buildFiveWordShingles(allProse.join(' ')));
  }

  const dossierResults: DossierForensicAuditResult[] = [];

  for (const m of masters) {
    const code = m.dossier.code;
    let totalParagraphs = 0;
    let totalWords = 0;
    let oneParagraphChapters = 0;
    let exactDuplicateParagraphs = 0;
    let semanticDuplicateParagraphs = 0;
    let inlineCitationHits = 0;
    let tableCount = 0;
    let chartCount = 0;
    let equationCount = 0;
    const bannedHits: string[] = [];

    const validRefNums = new Set(m.references.map((r) => r.num));
    let danglingCitationRefs = 0;

    for (const ch of m.chapters) {
      if (ch.paragraphs.length < 2) oneParagraphChapters++;
      if (ch.table) tableCount++;
      if (ch.chart && ch.chart.bars && ch.chart.bars.length >= 3) chartCount++;
      if (
        ch.equation &&
        ch.equation.expression &&
        !ch.equation.expression.includes('S_SEIA = Sum_k ( w_k * I_norm,k )')
      ) {
        equationCount++;
      }

      for (const p of ch.paragraphs) {
        const norm = p.trim();
        totalParagraphs++;
        totalWords += norm.split(/\s+/).filter(Boolean).length;
        if ((paragraphFreq.get(norm) || 0) > 1) {
          exactDuplicateParagraphs++;
        }
        for (const banned of BANNED_GENERIC_SUBSTRINGS) {
          if (norm.includes(banned) && !bannedHits.includes(banned)) {
            bannedHits.push(banned);
          }
        }
        const cites = Array.from(norm.matchAll(/\[(\d+)\]/g)).map((x) => Number(x[1]));
        inlineCitationHits += cites.length;
        for (const cNum of cites) {
          if (!validRefNums.has(cNum)) danglingCitationRefs++;
        }
      }
    }

    // Cross-report 5-gram shingle similarity check
    const myShingles = reportShingles.get(code) || new Set<string>();
    let maxOverlapPct = 0;
    let closestCode: string | null = null;
    if (myShingles.size > 0) {
      for (const [otherCode, otherShingles] of reportShingles.entries()) {
        if (otherCode === code || otherShingles.size === 0) continue;
        let inter = 0;
        for (const sh of myShingles) {
          if (otherShingles.has(sh)) inter++;
        }
        const pct = Math.round((inter / Math.min(myShingles.size, otherShingles.size)) * 100);
        if (pct > maxOverlapPct) {
          maxOverlapPct = pct;
          closestCode = otherCode;
        }
      }
    }
    if (maxOverlapPct >= 25) {
      semanticDuplicateParagraphs = Math.max(1, Math.round((maxOverlapPct / 100) * totalParagraphs));
    }

    // Gate 1: Unique Scientific Content
    const g1Findings: string[] = [];
    if (exactDuplicateParagraphs > 0) {
      g1Findings.push(`${exactDuplicateParagraphs} exact duplicate paragraph(s) shared with other dossiers.`);
    }
    if (maxOverlapPct >= 25) {
      g1Findings.push(`High cross-report 5-gram overlap (${maxOverlapPct}% with ${closestCode}).`);
    }
    if (oneParagraphChapters > 0) {
      g1Findings.push(`${oneParagraphChapters} single-paragraph placeholder chapter(s) detected.`);
    }
    if (m.chapters.length < 16) {
      g1Findings.push(`Insufficient chapter depth (${m.chapters.length} chapters).`);
    }
    if (bannedHits.length > 0) {
      g1Findings.push(`Contains legacy template text: "${bannedHits[0].slice(0, 55)}..."`);
    }
    const g1Passed = g1Findings.length === 0 && totalWords >= 900;

    // Gate 2: Research-Specific Methodology
    const g2Findings: string[] = [];
    const primaryDisc = m.primaryDiscipline || '';
    if (!primaryDisc) {
      g2Findings.push('Missing explicit primary scientific discipline classification.');
    }
    if (equationCount < 1) {
      g2Findings.push('Missing discipline-specific analytical equation or formal model.');
    }
    if (!m.remoteSensingAndAnalyticalMethods || m.remoteSensingAndAnalyticalMethods.length < 2) {
      g2Findings.push('Missing report-specific sensor/analytical method specification matrix.');
    }
    if (m.recommendedSensorOverload) {
      g2Findings.push('Indiscriminate satellite sensor list without subject justification.');
    }
    const g2Passed = g2Findings.length === 0;

    // Gate 3: Verified Bibliography
    const g3Findings: string[] = [];
    if (m.references.length < 4) {
      g3Findings.push(`Only ${m.references.length} reference(s); minimum 4 subject-specific citations required.`);
    }
    for (const ref of m.references) {
      for (const banned of BANNED_GENERIC_SUBSTRINGS) {
        if (ref.title.includes(banned)) {
          g3Findings.push(`Generic placeholder citation title in [${ref.num}].`);
        }
      }
      if (ref.doi && !isVerifiedRealDoi(ref.doi)) {
        g3Findings.push(`Invalid or unverified DOI format in [${ref.num}]: ${ref.doi}`);
      }
      if (!ref.relevantFinding || !ref.applicabilityLimitation) {
        g3Findings.push(`Reference [${ref.num}] lacks documented finding or applicability limitation.`);
      }
    }
    if (danglingCitationRefs > 0) {
      g3Findings.push(`${danglingCitationRefs} inline [n] citation(s) do not match bibliography.`);
    }
    const g3Passed = g3Findings.length === 0;

    // Gate 4: Geographical Accuracy
    const g4Findings: string[] = [];
    const [lat, lng] = m.studyArea.coordinates;
    const cKey = `${lat.toFixed(3)},${lng.toFixed(3)}`;
    if (lat === 34.095 && lng === 74.825) {
      g4Findings.push('Uses legacy default Srinagar coordinate [34.095, 74.825].');
    }
    if ((coordFreq.get(cKey) || 0) > 2) {
      g4Findings.push(`Coordinate [${cKey}] is repeated across ${coordFreq.get(cKey)} dossiers.`);
    }
    if (lat < 32.0 || lat > 37.5 || lng < 72.5 || lng > 80.2) {
      g4Findings.push(`Coordinate [${lat}, ${lng}] outside Western Himalayan domain.`);
    }
    if (m.studyArea.elevationBand === '1,580 -- 4,500 m ASL') {
      g4Findings.push('Uses legacy generic elevation band "1,580 -- 4,500 m ASL".');
    }
    if (m.studyArea.districts.includes('Multi-District Scope') || m.studyArea.districts.length === 0) {
      g4Findings.push('Missing explicit administrative districts.');
    }
    if (!m.studyArea.studyLocations || m.studyArea.studyLocations.length < 2) {
      g4Findings.push('Requires at least 2 named georeferenced study locations.');
    }
    const g4Passed = g4Findings.length === 0;

    // Gate 5: Environmental Indicator Relevance
    const g5Findings: string[] = [];
    if (m.indicators.length < 3) {
      g5Findings.push(`Only ${m.indicators.length} indicator(s); discipline-appropriate registry requires >= 3.`);
    }
    for (const ind of m.indicators) {
      if (
        ind.name.includes('Pressure Intensity') ||
        ind.name.includes('Multi-Temporal Satellite Land/Surface Change Signal') ||
        ind.unit.includes('Domain SI Index')
      ) {
        g5Findings.push(`Generic placeholder indicator "${ind.name}".`);
      }
      if (!ind.measurementMethodology || !ind.spatialScale) {
        g5Findings.push(`Indicator "${ind.name}" missing methodology or spatial scale.`);
      }
    }
    const g5Passed = g5Findings.length === 0;

    // Gate 6: Scientific Data Provenance
    const g6Findings: string[] = [];
    const tVals = JSON.stringify(m.telemetrySeries.points.map((p) => p.primaryValue));
    if (tVals === '[100,106,121,134]' || m.telemetrySeries.stations.includes('Regional Archive Composite')) {
      g6Findings.push('Uses generic placeholder telemetry array [100, 106, 121, 134].');
    }
    if (
      /Peer-Reviewed Assessment/i.test(m.dossier.badge) &&
      m.publicationClassification !== 'Approved Scientific Publication'
    ) {
      g6Findings.push('Badge claims external peer review without verified peer-review record.');
    }
    const g6Passed = g6Findings.length === 0;

    // Gate 7: Report-Specific Visualizations
    const g7Findings: string[] = [];
    if (chartCount < 1) {
      g7Findings.push('Missing embedded discipline-specific comparative figure.');
    }
    if (tableCount < 2) {
      g7Findings.push(`Only ${tableCount} structured scientific table(s); >= 2 required.`);
    }
    if (!m.visualizationSpec?.domainType) {
      g7Findings.push('Missing visualization domain specification.');
    }
    const g7Passed = g7Findings.length === 0;

    // Gate 8: Evidence-Supported Conclusions & Mitigation
    const g8Findings: string[] = [];
    if (inlineCitationHits < 10) {
      g8Findings.push(`Insufficient inline source traceability (${inlineCitationHits} [n] citations).`);
    }
    if (m.limitations.length < 2) {
      g8Findings.push('Missing explicit scientific uncertainty and data limitations disclosure.');
    }
    if (!m.mitigationRecommendations || m.mitigationRecommendations.length < 3) {
      g8Findings.push('Requires >= 3 report-specific mitigation/policy recommendations with feasibility & trade-offs.');
    }
    const g8Passed = g8Findings.length === 0;

    // Gate 9: PDF Integrity
    const hasValidPdf = validatedPdfCodes ? validatedPdfCodes.has(code) : m.chapters.length >= 16;
    const g9Findings = hasValidPdf ? [] : ['PDF binary not yet validated against current master chapters.'];
    const g9Passed = hasValidPdf;

    // Gate 10: Viewing & Sharing Functionality
    const pageTarget = m.dossier.pages || m.dossier.targetPages;
    const g10Findings: string[] = [];
    if (!pageTarget || Number.isNaN(Number(pageTarget))) {
      g10Findings.push('Undefined page count / targetPages metadata.');
    }
    if (!m.filenameSlug || !m.dossier.telemetryRoute.startsWith('/') || !m.dossier.gisMapRoute.startsWith('/')) {
      g10Findings.push('Broken route or filename slug metadata.');
    }
    const g10Passed = g10Findings.length === 0;

    // Core scientific readiness across Gates 1-10
    const allTechnicalGatesPassed =
      g1Passed &&
      g2Passed &&
      g3Passed &&
      g4Passed &&
      g5Passed &&
      g6Passed &&
      g7Passed &&
      g8Passed &&
      g9Passed &&
      g10Passed;

    const isPublishedStatus = m.dossier.status === 'Published' || m.dossier.status === 'Updated';
    const hasEmpiricalNulls = m.indicators.some((i) => i.observedValue === null);

    // Gate 11: Scientific Review & Approval
    const g11Findings: string[] = [];
    if (isPublishedStatus && !allTechnicalGatesPassed) {
      g11Findings.push('CRITICAL: Dossier marked Published while failing one or more scientific quality gates.');
    }
    if (!isPublishedStatus) {
      g11Findings.push(
        `Classified as "${m.publicationClassification}" (${m.dossier.status}); awaits formal Stage-13 Scientific Review Panel sign-off before public Published status.`
      );
    }
    const g11Passed = isPublishedStatus && allTechnicalGatesPassed;

    const gates: GateCheckResult[] = [
      {
        gateId: 'unique_scientific_content',
        label: 'Unique scientific content',
        passed: g1Passed,
        statusLabel: g1Passed ? 'Verified Pass' : 'Flagged for Remediation',
        findings: g1Findings,
      },
      {
        gateId: 'research_specific_methodology',
        label: 'Research-specific methodology',
        passed: g2Passed,
        statusLabel: g2Passed ? 'Verified Pass' : 'Flagged for Remediation',
        findings: g2Findings,
      },
      {
        gateId: 'verified_bibliography',
        label: 'Verified bibliography',
        passed: g3Passed,
        statusLabel: g3Passed ? 'Verified Pass' : 'Flagged for Remediation',
        findings: g3Findings,
      },
      {
        gateId: 'geographical_accuracy',
        label: 'Geographical accuracy',
        passed: g4Passed,
        statusLabel: g4Passed ? 'Verified Pass' : 'Flagged for Remediation',
        findings: g4Findings,
      },
      {
        gateId: 'environmental_indicator_relevance',
        label: 'Environmental indicator relevance',
        passed: g5Passed,
        statusLabel: g5Passed ? 'Verified Pass' : 'Flagged for Remediation',
        findings: g5Findings,
      },
      {
        gateId: 'scientific_data_provenance',
        label: 'Scientific data provenance',
        passed: g6Passed,
        statusLabel: g6Passed ? 'Verified Pass' : 'Flagged for Remediation',
        findings: g6Findings,
      },
      {
        gateId: 'report_specific_visualizations',
        label: 'Report-specific visualizations',
        passed: g7Passed,
        statusLabel: g7Passed ? 'Verified Pass' : 'Flagged for Remediation',
        findings: g7Findings,
      },
      {
        gateId: 'evidence_supported_conclusions',
        label: 'Evidence-supported conclusions',
        passed: g8Passed,
        statusLabel: g8Passed ? 'Verified Pass' : 'Flagged for Remediation',
        findings: g8Findings,
      },
      {
        gateId: 'pdf_integrity',
        label: 'PDF integrity',
        passed: g9Passed,
        statusLabel: g9Passed ? 'Verified Pass' : 'Flagged for Remediation',
        findings: g9Findings,
      },
      {
        gateId: 'viewing_and_sharing_functionality',
        label: 'Viewing and sharing functionality',
        passed: g10Passed,
        statusLabel: g10Passed ? 'Verified Pass' : 'Flagged for Remediation',
        findings: g10Findings,
      },
      {
        gateId: 'scientific_review_and_approval',
        label: 'Scientific review and approval',
        passed: g11Passed,
        statusLabel: g11Passed
          ? 'Verified Pass'
          : allTechnicalGatesPassed
          ? 'Pending Peer Approval'
          : 'Flagged for Remediation',
        findings: g11Findings,
      },
    ];

    const criticalDefects = gates
      .filter((g) => g.gateId !== 'scientific_review_and_approval' && !g.passed)
      .flatMap((g) => g.findings);

    dossierResults.push({
      code,
      sequenceNumber: m.dossier.sequenceNumber,
      title: m.dossier.title,
      sectorRoman: m.dossier.divisionRoman,
      sectorTag: m.dossier.sectorTag,
      status: m.dossier.status,
      publicationClassification: m.publicationClassification || 'Scientific Scoping Dossier',
      primaryDiscipline: primaryDisc || 'Pending Classification',
      chapterCount: m.chapters.length,
      totalParagraphs,
      totalWords,
      oneParagraphChapters,
      exactDuplicateParagraphs,
      semanticDuplicateParagraphs,
      maxCrossReportShingleOverlapPct: maxOverlapPct,
      closestOverlapReportCode: closestCode,
      hasGenericMethodology: !g2Passed,
      hasValidGeography: g4Passed,
      hasReportSpecificIndicators: g5Passed,
      hasVerifiedBibliography: g3Passed,
      hasAvailableScientificData:
        m.indicators.some((i) => i.observedValue !== null) && m.telemetrySeries.points.length > 0,
      hasReportSpecificVisualizations: g7Passed,
      hasUnresolvedEvidenceLimitations: hasEmpiricalNulls || !isPublishedStatus,
      readyForScientificReview: allTechnicalGatesPassed,
      approvedForPublication: g11Passed,
      criticalDefects,
      gates,
    });
  }

  const gateDefs: Array<{ id: GateCheckResult['gateId']; label: string }> = [
    { id: 'unique_scientific_content', label: 'Unique scientific content' },
    { id: 'research_specific_methodology', label: 'Research-specific methodology' },
    { id: 'verified_bibliography', label: 'Verified bibliography' },
    { id: 'geographical_accuracy', label: 'Geographical accuracy' },
    { id: 'environmental_indicator_relevance', label: 'Environmental indicator relevance' },
    { id: 'scientific_data_provenance', label: 'Scientific data provenance' },
    { id: 'report_specific_visualizations', label: 'Report-specific visualizations' },
    { id: 'evidence_supported_conclusions', label: 'Evidence-supported conclusions' },
    { id: 'pdf_integrity', label: 'PDF integrity' },
    { id: 'viewing_and_sharing_functionality', label: 'Viewing and sharing functionality' },
    { id: 'scientific_review_and_approval', label: 'Scientific review and approval' },
  ];

  const gateSummary = gateDefs.map((gd) => {
    const passedCount = dossierResults.filter(
      (dr) => dr.gates.find((g) => g.gateId === gd.id)?.passed
    ).length;
    const totalCount = dossierResults.length;
    let overallStatus = `${passedCount} / ${totalCount} Verified`;
    if (gd.id === 'scientific_review_and_approval') {
      const readyCount = dossierResults.filter((dr) => dr.readyForScientificReview).length;
      overallStatus = `${passedCount} Approved · ${Math.max(0, readyCount - passedCount)} Ready for Peer Review`;
    }
    return {
      gateId: gd.id,
      label: gd.label,
      passedCount,
      totalCount,
      overallStatus,
    };
  });

  const sectorSet = new Set(masters.map((m) => m.dossier.divisionId));

  return {
    auditedAt: new Date().toISOString(),
    totalReportsAudited: dossierResults.length,
    totalChaptersInspected: dossierResults.reduce((s, r) => s + r.chapterCount, 0),
    totalSectorsCovered: sectorSet.size,
    individuallyVerifiedCount: dossierResults.filter((r) => r.readyForScientificReview).length,
    reportsWithDuplicatedContent: dossierResults.filter(
      (r) => r.exactDuplicateParagraphs > 0 || r.semanticDuplicateParagraphs > 0
    ).length,
    reportsWithGenericMethodology: dossierResults.filter((r) => r.hasGenericMethodology).length,
    reportsWithVerifiedReferences: dossierResults.filter((r) => r.hasVerifiedBibliography).length,
    reportsWithUniqueScientificChapters: dossierResults.filter(
      (r) => r.exactDuplicateParagraphs === 0 && r.semanticDuplicateParagraphs === 0 && r.oneParagraphChapters === 0
    ).length,
    reportsWithValidatedGeographicBoundaries: dossierResults.filter((r) => r.hasValidGeography).length,
    reportsWithReportSpecificIndicators: dossierResults.filter((r) => r.hasReportSpecificIndicators).length,
    reportsWithAvailableScientificData: dossierResults.filter((r) => r.hasAvailableScientificData).length,
    reportsWithUnresolvedEvidenceLimitations: dossierResults.filter(
      (r) => r.hasUnresolvedEvidenceLimitations
    ).length,
    reportsReadyForScientificReview: dossierResults.filter((r) => r.readyForScientificReview).length,
    reportsApprovedForPublication: dossierResults.filter((r) => r.approvedForPublication).length,
    reportsWithValidatedPdfAssets: dossierResults.filter((r) =>
      r.gates.find((g) => g.gateId === 'pdf_integrity')?.passed
    ).length,
    gateSummary,
    dossierResults,
  };
}
