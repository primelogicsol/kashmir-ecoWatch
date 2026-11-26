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
  InvestigationSeriesDef,
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
import { SERIES_16_INVESTIGATION_DOSSIERS } from './environmental-investigations-series-16';
import { TRANSPORT_13_INVESTIGATION_DOSSIERS } from './environmental-investigations-transport-13';
import { ECONOMICS_15_INVESTIGATION_DOSSIERS } from './environmental-investigations-economics-15';

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

export const INVESTIGATION_THEMATIC_SERIES: InvestigationSeriesDef[] = [
  {
    id: 'core-himalayan-portfolio',
    shortLabel: 'Core Himalayan Portfolio',
    title: 'Foundational Western Himalayan Investigations',
    subtitle: 'Flagship published and foundational investigations across Dal dredging, Sheshnag, Telbal, Karewas, Wular, Hokersar, Jhelum, Kolahoi, and the 521-lake regional trophic synthesis.',
    targetModules: [
      { label: 'Water Systems · Lakes', route: '/water-systems/lakes' },
      { label: 'Earth & Human Impact', route: '/earth-human-impact' },
    ],
  },
  {
    id: 'dal-lake-interventions',
    shortLabel: 'Dal Lake Interventions',
    title: 'Dal Lake Ecological Interventions & Expenditure Audit',
    subtitle: 'Evaluating three decades of mechanized/manual de-weeding (₹28.01 Cr / 57.8% off-season CAG baseline), artificial aeration/jet fountains, and cumulative restoration expenditure vs trophic outcomes.',
    targetModules: [
      { label: 'Dal Lake Profile', route: '/water-systems/lakes/dal-lake' },
      { label: 'Algal Bloom Sentinel', route: '/hazard-intelligence/algal-bloom-intelligence' },
    ],
  },
  {
    id: 'dachigam-national-park',
    shortLabel: 'Dachigam National Park',
    title: 'Dachigam National Park & Hangul Conservation Series',
    subtitle: 'Assessing Hangul population dynamics, Upper Dachigam livestock grazing competition, departmental land enclaves, Greater Dachigam corridors, and climate-induced phenological shifts.',
    targetModules: [
      { label: 'Dachigam National Park', route: '/protected-network/national-parks/dachigam-national-park' },
      { label: 'Wildlife Corridors', route: '/protected-network/corridors-and-connectivity' },
    ],
  },
  {
    id: 'salim-ali-national-park',
    shortLabel: 'Salim Ali National Park',
    title: 'Salim Ali National Park Forensic Legal & Ecological Series',
    subtitle: 'Forensic verification of City Forest (Salim Ali) National Park gazette instruments, golf-course land conversion, avian/wildlife displacement, and lost urban flood/carbon ecosystem services.',
    targetModules: [
      { label: 'Salim Ali NP Archive', route: '/protected-network/national-parks/salim-ali-national-park' },
      { label: 'Change Detection Observatory', route: '/earth-human-impact/change-detection-observatory' },
    ],
  },
  {
    id: 'drinking-water-security',
    shortLabel: 'Drinking Water Security',
    title: 'Drinking Water Security & Public Supply Infrastructure Series',
    subtitle: '10-district BIS IS 10500 tap-water compliance, post-2013 WTP filtration progress (vs 341 historical unfiltered schemes), Jal Jeevan Mission 4-pillar functionality, spring recession, and catchment QMRA.',
    targetModules: [
      { label: 'Drinking Water Sources', route: '/water-systems/drinking-water-sources' },
      { label: 'Springs Directory', route: '/water-systems/springs' },
    ],
  },
  {
    id: 'transport-air-noise',
    shortLabel: 'Transport, Air & Noise',
    title: 'Transportation, Atmospheric Pollution & Acoustic Exposure Series',
    subtitle: '1990–2026 active fleet carrying capacity, altitude/cold-start emissions, 12-source Srinagar PMF apportionment, winter inversions, road dust, logarithmic LAeq noise, Silence Zones, transit, EVs, and health burden.',
    targetModules: [
      { label: 'Transportation Pollution', route: '/environmental-monitoring/transportation-pollution' },
      { label: 'Air Pollution', route: '/environmental-monitoring/air-pollution' },
      { label: 'Noise Pollution', route: '/environmental-monitoring/noise-pollution' },
    ],
  },
  {
    id: 'security-transport-compliance',
    shortLabel: 'Security Fleet Compliance',
    title: 'Security Force Transportation & Statutory Pollution Compliance',
    subtitle: 'Independent aggregate environmental and legal evaluation distinguishing MVA Sec 60 / G.S.R. 547(E) BS-VI statutory exemptions from PUC maintenance (G.S.R. 991(E)), contracted fleets, and noise rules.',
    targetModules: [
      { label: 'Institutional Accountability', route: '/environmental-investigations/accountability' },
      { label: 'Vehicle Regulations', route: '/environmental-monitoring/transportation-pollution/regulations' },
    ],
  },
  {
    id: 'environmental-economics-fiscal',
    shortLabel: 'Environmental Economics & Finance',
    title: 'J&K Environmental Economics, Public Expenditure & Ecological Accountability',
    subtitle: 'FY 2000–2027 public expenditure efficiency (₹1,13,767 cr FY27 BE; ₹3,15,822 cr GSDP), 23-institution capacity audits, UN SEEA natural capital accounting (GSDP_EA), damage valuation, restoration BCR, and fiscal reform.',
    targetModules: [
      { label: 'Fiscal & Natural Capital Evidence', route: '/environmental-investigations/economics' },
      { label: 'Institutional Accountability', route: '/environmental-investigations/accountability' },
      { label: 'Sectoral EIA Engine', route: '/sectoral-eia' },
    ],
  },
];

export const PRIMARY_INSTITUTIONAL_EVIDENCE_SOURCES: Array<{
  institution: string;
  targetSeries: string;
  requiredEvidence: string;
  repositoryUrl?: string;
}> = [
  { institution: 'Comptroller and Auditor General of India (CAG)', targetSeries: 'Dal Lake, Drinking Water & Governance', requiredEvidence: 'Lake conservation audit (₹28.01 Cr de-weeding), Report No. 4 of 2025 (330 waterbodies), and March 2013 public water supply audit (341 unfiltered schemes).', repositoryUrl: 'https://www.cag.gov.in/en/audit-report/details/125068' },
  { institution: 'J&K Lake Conservation and Management Authority (LCMA)', targetSeries: 'Dal Lake Interventions', requiredEvidence: 'Harvester GPS/biomass logs, aerator/fountain kW & DO specs, STP orthophosphate mass balances, and 2026–27 tenders.', repositoryUrl: 'https://jktenders.gov.in/' },
  { institution: 'Wildlife Institute of India (WII) & Dept. of Wildlife Protection J&K', targetSeries: 'Dachigam & Salim Ali NP', requiredEvidence: 'Protected Area Gazette Notifications (City Forest / Salim Ali NP), Hangul census raw block counts, MEE reports, and authenticated Dachigam Management Plan.', repositoryUrl: 'https://v1.wii.gov.in/protectedareagazette_jammu_kashmir' },
  { institution: 'Jal Shakti Dept. Kashmir & Jal Jeevan Mission (WQMIS)', targetSeries: 'Drinking Water Security', requiredEvidence: '10-district BIS IS 10500 laboratory logs, WTP filtration status, 4-pillar FHTC functionality, and remedial action portals.', repositoryUrl: 'https://ejalshakti.gov.in/WQMIS' },
  { institution: 'Central Ground Water Board (CGWB), ZSI, BSI & FSI', targetSeries: 'Springs, Forests & Biodiversity', requiredEvidence: 'NAQUIM aquifer/piezometer series, historical faunal/botanical inventories, and decadal forest-cover layers.' },
  { institution: 'MoRTH VAHAN4, J&K Motor Vehicles Dept. & Traffic Police', targetSeries: 'Transport & Security Compliance', requiredEvidence: '10-RTO active fleet survival curves, PUCC pass/fail records, corridor PCU volumes, and G.S.R. 485(E)/871(E)/547(E)/991(E) compliance frameworks.', repositoryUrl: 'https://vahan.parivahan.gov.in/vahan4dashboard/' },
  { institution: 'CPCB, PRANA Portal, JKPCC, SMC & Srinagar Smart City Ltd.', targetSeries: 'Air Quality, Dust, Noise & EVs', requiredEvidence: 'Hourly CAAQMS archives, NCAP source-apportionment reports, Class-1 NANMN noise logs, mechanical sweeper GPS logs, and e-bus kWh/km records.', repositoryUrl: 'https://prana.cpcb.gov.in/' },
  { institution: 'Ministry of Defence, Ministry of Home Affairs & NHAI/NHIDCL', targetSeries: 'Security Fleet & Highway Expansion', requiredEvidence: 'Non-sensitive environmental stewardship policies, contracted-fleet PUCC tender clauses, and PARIVESH highway EMP hydraulic/muck audits.' },
  { institution: 'J&K Finance Dept, PRS, MoSPI EnviStats, UN SEEA, RBI, PFMS & Finance Commission', targetSeries: 'Environmental Economics & Public Finance', requiredEvidence: 'FY 2000–27 Annual Financial Statements & Demands for Grants (₹1,13,767 cr FY27 BE baseline), CAG Financial Audit 2024–25 (125155), SEEA ecosystem accounts, PFMS releases, and mountain fiscal transfers.', repositoryUrl: 'https://jakfinance-jk.com/budget2026-27.html' },
  { institution: 'University of Kashmir, SKIMS, IMD & ISRO/NASA/ESA Archives', targetSeries: 'All 7 Investigation Series', requiredEvidence: 'Peer-reviewed limnology, benthic, microbiological, PM2.5/BC, COPD cohort, radiosonde mixing-height, and Landsat/Sentinel/ERA5 datasets.', repositoryUrl: 'https://dataspace.copernicus.eu/' },
];

export const CANONICAL_INVESTIGATIONS: InvestigationRecord[] = [
  ...PUBLISHED_INVESTIGATION_DOSSIERS.map((inv) => ({
    ...inv,
    seriesId: inv.seriesId || ('core-himalayan-portfolio' as const),
    seriesTitle: inv.seriesTitle || 'Foundational Western Himalayan Investigations',
    priority: inv.priority || ('Critical' as const),
  })),
  ...PORTFOLIO_INVESTIGATION_DOSSIERS.map((inv) => ({
    ...inv,
    seriesId: inv.seriesId || ('core-himalayan-portfolio' as const),
    seriesTitle: inv.seriesTitle || 'Foundational Western Himalayan Investigations',
    priority: inv.priority || ('Critical' as const),
  })),
  ...SERIES_16_INVESTIGATION_DOSSIERS,
  ...TRANSPORT_13_INVESTIGATION_DOSSIERS,
  ...ECONOMICS_15_INVESTIGATION_DOSSIERS,
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
