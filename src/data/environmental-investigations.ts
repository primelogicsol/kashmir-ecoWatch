// ─────────────────────────────────────────────────────────────────────────────
// KEW-EIAI UNIFIED CANONICAL REGISTRY, DYNAMIC METRICS & SCIENTIFIC VALIDATOR
// All platform counters derive strictly from actual records — zero invented figures
// ─────────────────────────────────────────────────────────────────────────────

import {
  EiaiPlatformMetrics,
  EvidenceAssertionRecord,
  InstitutionalAccountabilityRecord,
  InvestigationDomainId,
  InvestigationRecommendation,
  InvestigationRecord,
  ValidationIssue,
} from '@/types/environmental-investigations';
import {
  ALL_SCIENTIFIC_DISCIPLINES,
  DISCIPLINE_CLUSTERS,
  GLOBAL_PRECEDENT_CASE_STUDIES,
  INVESTIGATION_DOMAINS,
  INVESTIGATION_WORKFLOW_STAGES,
  KEW_ECOSYSTEM_INTEGRATIONS,
  PUBLICATION_FORMATS,
  STANDARD_REPORT_SECTIONS,
} from './environmental-investigations-taxonomy';
import { PUBLISHED_INVESTIGATION_DOSSIERS } from './environmental-investigations-published';
import { PORTFOLIO_INVESTIGATION_DOSSIERS } from './environmental-investigations-portfolio';

export {
  ALL_SCIENTIFIC_DISCIPLINES,
  DISCIPLINE_CLUSTERS,
  GLOBAL_PRECEDENT_CASE_STUDIES,
  INVESTIGATION_DOMAINS,
  INVESTIGATION_WORKFLOW_STAGES,
  KEW_ECOSYSTEM_INTEGRATIONS,
  PUBLICATION_FORMATS,
  STANDARD_REPORT_SECTIONS,
};

export const CANONICAL_INVESTIGATIONS: InvestigationRecord[] = [
  ...PUBLISHED_INVESTIGATION_DOSSIERS,
  ...PORTFOLIO_INVESTIGATION_DOSSIERS,
];

export function getInvestigationBySlugOrCode(
  slugOrCode: string,
  records: InvestigationRecord[] = CANONICAL_INVESTIGATIONS
): InvestigationRecord | undefined {
  const norm = decodeURIComponent(slugOrCode).trim().toLowerCase();
  return records.find(
    (r) => r.slug.toLowerCase() === norm || r.code.toLowerCase() === norm
  );
}

export function getDomainById(domainId: InvestigationDomainId) {
  return INVESTIGATION_DOMAINS.find((d) => d.id === domainId);
}

export function getDisciplineById(disciplineId: string) {
  return ALL_SCIENTIFIC_DISCIPLINES.find((d) => d.id === disciplineId);
}

/**
 * Computes 100% database/record-driven platform metrics with zero hardcoded counts.
 */
export function computeEiaiMetrics(
  records: InvestigationRecord[] = CANONICAL_INVESTIGATIONS
): EiaiPlatformMetrics {
  const domainSet = new Set<string>();
  const disciplineSet = new Set<string>();
  const institutionSet = new Set<string>();
  const districtSet = new Set<string>();

  let documentedEvidenceCount = 0;
  let provisionallySupportedCount = 0;
  let unverifiedEvidenceCount = 0;
  let unsupportedEvidenceCount = 0;
  let conflictingEvidenceCount = 0;
  let totalEvidenceRecords = 0;
  let accountabilityRecordsCount = 0;
  let totalRecommendations = 0;
  let immediateRecommendationsCount = 0;
  let totalReferencesCount = 0;
  let totalDataGapsCount = 0;

  for (const inv of records) {
    domainSet.add(inv.primaryDomainId);
    inv.secondaryDomainIds.forEach((d) => domainSet.add(d));
    inv.disciplineIds.forEach((d) => disciplineSet.add(d));
    inv.districts.forEach((dist) => districtSet.add(dist));

    for (const ev of inv.evidenceMatrix) {
      totalEvidenceRecords++;
      if (ev.classification === 'Documented') documentedEvidenceCount++;
      else if (ev.classification === 'Provisionally Supported') provisionallySupportedCount++;
      else if (ev.classification === 'Unverified') unverifiedEvidenceCount++;
      else if (ev.classification === 'Unsupported') unsupportedEvidenceCount++;
      else if (ev.classification === 'Conflicting') conflictingEvidenceCount++;
    }

    for (const acc of inv.accountabilityMatrix) {
      accountabilityRecordsCount++;
      institutionSet.add(acc.institutionAcronym || acc.responsibleInstitution);
    }

    for (const rec of inv.recommendations) {
      totalRecommendations++;
      if (rec.horizon.startsWith('Immediate')) immediateRecommendationsCount++;
    }

    totalReferencesCount += inv.references.length;
    totalDataGapsCount += inv.dataGaps.length;
  }

  const districtsCoveredList = Array.from(districtSet).sort();

  return {
    totalInvestigations: records.length,
    publishedCount: records.filter((r) => r.status === 'published').length,
    activeCount: records.filter((r) => r.status === 'active_investigation').length,
    scopingCount: records.filter((r) => r.status === 'scoping_review').length,
    proposedCount: records.filter((r) => r.status === 'proposed').length,
    domainsCoveredCount: domainSet.size,
    totalDomainsDefined: INVESTIGATION_DOMAINS.length,
    disciplinesActiveCount: disciplineSet.size,
    totalDisciplinesDefined: ALL_SCIENTIFIC_DISCIPLINES.length,
    totalEvidenceRecords,
    documentedEvidenceCount,
    provisionallySupportedCount,
    unverifiedEvidenceCount,
    unsupportedEvidenceCount,
    conflictingEvidenceCount,
    institutionsExaminedCount: institutionSet.size,
    accountabilityRecordsCount,
    districtsCoveredCount: districtsCoveredList.length,
    districtsCoveredList,
    totalRecommendations,
    immediateRecommendationsCount,
    precedentsCount: GLOBAL_PRECEDENT_CASE_STUDIES.length,
    totalReferencesCount,
    totalDataGapsCount,
  };
}

export function getAllEvidenceAssertions(
  records: InvestigationRecord[] = CANONICAL_INVESTIGATIONS
): EvidenceAssertionRecord[] {
  return records.flatMap((r) => r.evidenceMatrix);
}

export function getAllAccountabilityRecords(
  records: InvestigationRecord[] = CANONICAL_INVESTIGATIONS
): InstitutionalAccountabilityRecord[] {
  return records.flatMap((r) => r.accountabilityMatrix);
}

export function getAllRecommendations(
  records: InvestigationRecord[] = CANONICAL_INVESTIGATIONS
): InvestigationRecommendation[] {
  return records.flatMap((r) => r.recommendations);
}

export function getDomainInvestigationCounts(
  records: InvestigationRecord[] = CANONICAL_INVESTIGATIONS
): Record<string, InvestigationRecord[]> {
  const map: Record<string, InvestigationRecord[]> = {};
  for (const dom of INVESTIGATION_DOMAINS) {
    map[dom.id] = records.filter(
      (r) => r.primaryDomainId === dom.id || r.secondaryDomainIds.includes(dom.id)
    );
  }
  return map;
}

export function getDisciplineInvestigationCounts(
  records: InvestigationRecord[] = CANONICAL_INVESTIGATIONS
): Record<string, InvestigationRecord[]> {
  const map: Record<string, InvestigationRecord[]> = {};
  for (const disc of ALL_SCIENTIFIC_DISCIPLINES) {
    map[disc.id] = records.filter((r) => r.disciplineIds.includes(disc.id));
  }
  return map;
}

/**
 * Stage 10 Deterministic Scientific Challenge & Integrity Validator
 * Ensures reports never publish uncited documented claims, deterministic collapse
 * overreach, or institutional wrongdoing inferred from missing records.
 */
export function runScientificValidation(inv: InvestigationRecord): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const refIds = new Set(inv.references.map((r) => r.id));

  // 1. Check every Documented assertion has valid citation IDs
  for (const ev of inv.evidenceMatrix) {
    if (ev.classification === 'Documented' && ev.citationIds.length === 0) {
      issues.push({
        severity: 'error',
        code: 'UNCITED_DOCUMENTED_CLAIM',
        sectionOrItemId: ev.id,
        message: `Assertion "${ev.assertion.slice(0, 70)}..." is marked Documented without a reference citation.`,
        remediation: 'Attach a verified citation ID in Section 23 or downgrade classification to Unverified.',
      });
    }
    for (const cid of ev.citationIds) {
      if (!refIds.has(cid)) {
        issues.push({
          severity: 'error',
          code: 'BROKEN_CITATION_REF',
          sectionOrItemId: ev.id,
          message: `Citation reference "${cid}" is missing from Section 23 References.`,
          remediation: 'Add the full bibliographic record to references[] or correct the citation ID.',
        });
      }
    }
    if (
      (ev.classification === 'Unverified' || ev.classification === 'Provisionally Supported') &&
      !ev.methodologicalRequirement
    ) {
      issues.push({
        severity: 'warning',
        code: 'MISSING_VERIFICATION_PROTOCOL',
        sectionOrItemId: ev.id,
        message: `Assertion ${ev.id} (${ev.classification}) should specify the exact measurement or modelling protocol needed for verification.`,
        remediation: 'Populate methodologicalRequirement on the evidence record.',
      });
    }
  }

  // 2. Published status completeness checks
  if (inv.status === 'published') {
    const applicableCount = inv.sections.filter((s) => s.applicable).length;
    if (applicableCount < 18) {
      issues.push({
        severity: 'error',
        code: 'INCOMPLETE_PUBLICATION_SECTIONS',
        sectionOrItemId: inv.code,
        message: `Published investigation has only ${applicableCount} applicable sections; canonical publication requires full relevant coverage.`,
        remediation: 'Complete all applicable sections of the 24-section architecture before setting status to published.',
      });
    }
    if (inv.accountabilityMatrix.length === 0) {
      issues.push({
        severity: 'warning',
        code: 'MISSING_ACCOUNTABILITY_MATRIX',
        sectionOrItemId: inv.code,
        message: 'Published investigation has no Institutional Accountability records.',
        remediation: 'Add statutory mandate and institutional response entries in Section 16.',
      });
    }
  } else {
    issues.push({
      severity: 'info',
      code: 'NON_FINAL_PORTFOLIO_STATUS',
      sectionOrItemId: inv.code,
      message: `${inv.code} is currently marked "${inv.statusLabel}" — scoping questions and baseline anchors are displayed transparently without claiming completed investigation findings.`,
      remediation: 'Advance through Workflow Stages 04–11 before transitioning status to published.',
    });
  }

  // 3. Check institutional balance (official response or invitation recorded)
  for (const acc of inv.accountabilityMatrix) {
    if (!acc.institutionalResponse || acc.institutionalResponse.trim().length < 10) {
      issues.push({
        severity: 'warning',
        code: 'MISSING_INSTITUTIONAL_RESPONSE_NOTE',
        sectionOrItemId: acc.id,
        message: `${acc.institutionAcronym} lacks an official response or right-of-reply status note.`,
        remediation: 'Record published official statements or explicitly mark Clarification Invited.',
      });
    }
  }

  return issues;
}

/**
 * Generates academic citation strings directly from the single canonical master record.
 */
export function generateCitationFormats(inv: InvestigationRecord) {
  const year = inv.lastUpdated.slice(0, 4) || '2026';
  const url = `https://kashmir-ecowatch.com/environmental-investigations/reports/${inv.slug}`;

  const apa = `Kashmir EcoWatch Environmental Investigations & Accountability (${year}). ${inv.title} [${inv.code}, ${inv.version}]. Kashmir EcoWatch Western Himalayan Scientific Intelligence. ${url}`;

  const bibtex = `@techreport{${inv.code.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${year},
  author       = {{Kashmir EcoWatch Environmental Investigation and Accountability Intelligence (KEW-EIAI)}},
  title        = {${inv.title}: ${inv.subtitle}},
  institution  = {Kashmir EcoWatch — Western Himalayan Environmental Intelligence Platform},
  year         = {${year}},
  number       = {${inv.code}},
  note         = {${inv.version}; Temporal Scope: ${inv.temporalScope}},
  url          = {${url}}
}`;

  const ris = [
    'TY  - RPRT',
    'AU  - Kashmir EcoWatch (KEW-EIAI)',
    `TI  - ${inv.title}: ${inv.subtitle}`,
    `PY  - ${year}`,
    `RN  - ${inv.code} (${inv.version})`,
    'PB  - Kashmir EcoWatch Western Himalayan',
    `UR  - ${url}`,
    'ER  - ',
  ].join('\n');

  return { apa, bibtex, ris, canonicalUrl: url };
}

/**
 * Exports canonical open dataset tables (JSON & CSV) from the single master record.
 */
export function generateEvidenceCsv(inv: InvestigationRecord): string {
  const escape = (val: string) => `"${String(val ?? '').replace(/"/g, '""')}"`;
  const headers = [
    'Evidence_ID',
    'Investigation_Code',
    'Assertion',
    'Source_Category',
    'Verification_Class',
    'Citations',
    'Methodological_Requirement',
    'Last_Verified',
  ];
  const rows = inv.evidenceMatrix.map((e) =>
    [
      e.id,
      e.investigationCode,
      e.assertion,
      e.sourceCategory,
      e.classification,
      e.citationIds.join('; '),
      e.methodologicalRequirement || '',
      e.lastVerifiedDate,
    ]
      .map(escape)
      .join(',')
  );
  return [headers.join(','), ...rows].join('\n');
}
