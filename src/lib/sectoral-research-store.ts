// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH — SECTORAL RESEARCH PERSISTENCE, PDF INVENTORY & ANALYTICS
// Hybrid PostgreSQL (when reachable) + Persistent JSON Store
// Synchronizes single-source-of-truth dossiers, 19-stage publication workflow,
// derived actual PDF page counts, and readership/download/share analytics.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';
import pool from '@/lib/db';
import {
  ResearchDossierStatus,
  ResearchSeriesDossier,
} from '@/types/sectoral-eia';
import {
  getResearchDossierByCodeOrId,
  SECTORAL_RESEARCH_SERIES_2026,
} from '@/data/sectoral-research-series-2026';
import {
  buildCanonicalReportMasterRecord,
  CanonicalReportMasterRecord,
  toPdfDocumentInput,
} from '@/data/sectoral-research-content-engine';
import {
  classifyScientificPublicationEvidence,
  getExternalEvidenceForReport,
} from '@/data/report-scientific-registries-100';
import {
  GeneratedPdfArtifact,
  generateInstitutionalScientificPdf,
} from '@/lib/pdf/kew-scientific-pdf-engine';
import {
  auditAllDossiersQualityGates,
  type PortfolioQualityControlSummary,
} from '@/lib/scientific-quality-gates';

export const PUBLICATION_WORKFLOW_19_STAGES = [
  '01. Research Proposal',
  '02. Scope Definition',
  '03. Scientific Data Acquisition',
  '04. Source Validation',
  '05. Data Processing',
  '06. Scientific Analysis',
  '07. GIS and Remote Sensing Assessment',
  '08. Draft Report Preparation',
  '09. Scientific Review',
  '10. Methodology Verification',
  '11. Data Quality Assessment',
  '12. Editorial Review',
  '13. Administrative Approval',
  '14. PDF Generation',
  '15. Asset Validation',
  '16. Publication',
  '17. Search Indexation',
  '18. Scientific Monitoring',
  '19. Revision and Updates',
] as const;

export type ReportAnalyticsEventType =
  | 'report_view'
  | 'pdf_viewer_open'
  | 'pdf_download'
  | 'share_modal_open'
  | 'share_platform_dispatch'
  | 'citation_export'
  | 'dataset_download';

export interface DossierAdminOverride {
  status?: ResearchDossierStatus;
  date?: string;
  title?: string;
  abstract?: string;
  author?: string;
  isProposedWorkingGroup?: boolean;
  workflowStageIndex?: number; // 0..18
  customChapterParagraphs?: Record<string, string[]>;
  revisionNotes?: Array<{
    version: string;
    date: string;
    status: ResearchDossierStatus;
    notes: string;
    actor: string;
  }>;
}

export interface DossierAnalyticsCounters {
  reportViews: number;
  pdfViewerOpens: number;
  pdfDownloads: number;
  shareModalOpens: number;
  confirmedExternalShares: Record<string, number>;
  citationExports: Record<string, number>;
  datasetDownloads: Record<string, number>;
  lastInteractionAt?: string;
}

const OVERRIDES_FILE = path.join(process.cwd(), 'data', 'sectoral-research-series-store.json');
const ANALYTICS_FILE = path.join(process.cwd(), 'data', 'sectoral-report-analytics.json');

// Cache generated PDFs in memory + disk for fast synchronous page-count lookup
const pdfCache = new Map<string, GeneratedPdfArtifact>();

function readJsonSafe<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
  } catch {
    return fallback;
  }
}

function writeJsonSafe(filePath: string, data: unknown): void {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch {}
}

export function readDossierOverrides(): Record<string, DossierAdminOverride> {
  const raw = readJsonSafe<{ overrides?: Record<string, DossierAdminOverride> }>(
    OVERRIDES_FILE,
    { overrides: {} }
  );
  return raw.overrides || {};
}

export function saveDossierOverride(
  code: string,
  patch: Partial<DossierAdminOverride> & { note?: string; actor?: string; version?: string }
): DossierAdminOverride {
  const all = readDossierOverrides();
  const normCode = code.toUpperCase();
  const prev = all[normCode] || {};
  const nextStatus = patch.status || prev.status || 'Proposed';

  // Mandatory Publication Gate: No dossier can transition to Published/Updated if technical quality gates fail!
  if (nextStatus === 'Published' || nextStatus === 'Updated') {
    const allMerged = getMergedResearchDossiers();
    const candidateMasters = allMerged
      .map((d) => buildCanonicalReportMasterRecord(d.code, allMerged))
      .filter((m): m is CanonicalReportMasterRecord => Boolean(m));
    const qc = auditAllDossiersQualityGates(candidateMasters);
    const targetAudit = qc.dossierResults.find((r) => r.code.toUpperCase() === normCode);
    if (targetAudit && !targetAudit.readyForScientificReview) {
      throw new Error(
        `Publication Quality Gate Blocked for ${normCode}: ${targetAudit.criticalDefects.join(' | ')}`
      );
    }
  }

  const revEntry = patch.note
    ? [
        {
          version: patch.version || 'Admin Revision',
          date: new Date().toISOString().slice(0, 10),
          status: nextStatus,
          notes: patch.note,
          actor: patch.actor || 'KEW Scientific Review Desk',
        },
      ]
    : [];

  const updated: DossierAdminOverride = {
    ...prev,
    ...(patch.status ? { status: patch.status } : {}),
    ...(patch.date !== undefined ? { date: patch.date } : {}),
    ...(patch.title ? { title: patch.title } : {}),
    ...(patch.abstract ? { abstract: patch.abstract } : {}),
    ...(patch.author ? { author: patch.author } : {}),
    ...(typeof patch.isProposedWorkingGroup === 'boolean'
      ? { isProposedWorkingGroup: patch.isProposedWorkingGroup }
      : {}),
    ...(typeof patch.workflowStageIndex === 'number'
      ? { workflowStageIndex: patch.workflowStageIndex }
      : {}),
    ...(patch.customChapterParagraphs
      ? {
          customChapterParagraphs: {
            ...(prev.customChapterParagraphs || {}),
            ...patch.customChapterParagraphs,
          },
        }
      : {}),
    revisionNotes: [...revEntry, ...(prev.revisionNotes || [])],
  };

  all[normCode] = updated;
  writeJsonSafe(OVERRIDES_FILE, { overrides: all });

  // Invalidate PDF cache for this dossier so next request regenerates synchronized PDF
  pdfCache.delete(normCode);

  // Best-effort async PostgreSQL mirror if local Postgres is running
  mirrorOverrideToPostgres(normCode, updated).catch(() => {});

  return updated;
}

async function mirrorOverrideToPostgres(code: string, data: DossierAdminOverride) {
  const client = await Promise.race([
    pool.connect(),
    new Promise<never>((_, rej) => setTimeout(() => rej(new Error('pg_timeout')), 800)),
  ]);
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS kew_sectoral_research_dossiers (
        code VARCHAR(32) PRIMARY KEY,
        status VARCHAR(32) NOT NULL,
        payload JSONB NOT NULL,
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    await client.query(
      `INSERT INTO kew_sectoral_research_dossiers (code, status, payload, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (code) DO UPDATE SET status = EXCLUDED.status, payload = EXCLUDED.payload, updated_at = NOW();`,
      [code, data.status || 'Proposed', JSON.stringify(data)]
    );
  } finally {
    client.release();
  }
}

/**
 * Ensures actual PDF artifact is generated and returns exact derived page count!
 */
export function getOrGenerateDossierPdf(codeOrId: string): GeneratedPdfArtifact | undefined {
  const master = getMergedMasterRecord(codeOrId, false);
  if (!master) return undefined;
  const code = master.dossier.code.toUpperCase();
  const cached = pdfCache.get(code);
  if (cached) return cached;

  const pdfInput = toPdfDocumentInput(master);
  const artifact = generateInstitutionalScientificPdf(pdfInput);
  pdfCache.set(code, artifact);
  return artifact;
}

export function getMergedResearchDossiers(): ResearchSeriesDossier[] {
  const overrides = readDossierOverrides();

  return SECTORAL_RESEARCH_SERIES_2026.map((base) => {
    const ov = overrides[base.code.toUpperCase()];
    const mergedStatus = ov?.status || base.status;
    const isPub = mergedStatus === 'Published' || mergedStatus === 'Updated';

    const pubClass = classifyScientificPublicationEvidence(base).evidenceClass;
    const extEntry = getExternalEvidenceForReport(base.sequenceNumber);
    const extRefsCount = extEntry
      ? extEntry.retrievedLiterature.length +
        extEntry.verifiedInstitutionalDatasets.length +
        Math.min(1, extEntry.retrievedDataCiteDatasets.length)
      : 0;

    const merged: ResearchSeriesDossier = {
      ...base,
      status: mergedStatus,
      date: ov?.date || base.date,
      title: ov?.title || base.title,
      abstract: ov?.abstract || base.abstract,
      author: ov?.author || base.author,
      evidencePublicationClass: pubClass,
      verifiedExternalCitationsCount: extRefsCount,
      isProposedWorkingGroup:
        typeof ov?.isProposedWorkingGroup === 'boolean'
          ? ov.isProposedWorkingGroup
          : isPub
          ? false
          : base.isProposedWorkingGroup,
      assetReadiness: {
        ...base.assetReadiness,
        reportPdfAvailable: isPub,
        datasetAvailable: isPub,
      },
    };

    // Derive exact page count directly from the generated PDF for published & review-stage monographs!
    if (isPub || mergedStatus === 'Scientific Review' || mergedStatus === 'Draft Assessment') {
      const cacheHit = pdfCache.get(merged.code.toUpperCase());
      if (cacheHit) {
        merged.pages = cacheHit.pageCount;
        merged.derivedPdfPages = cacheHit.pageCount;
      } else {
        const master = buildCanonicalReportMasterRecord(merged.code, [merged]);
        if (master) {
          const art = generateInstitutionalScientificPdf(toPdfDocumentInput(master));
          pdfCache.set(merged.code.toUpperCase(), art);
          merged.pages = art.pageCount;
          merged.derivedPdfPages = art.pageCount;
          merged.verifiedExternalCitationsCount = master.references.length;
        }
      }
    }

    return merged;
  });
}

export function getMergedMasterRecord(
  codeOrId: string,
  withDerivedPdfPages = true
): CanonicalReportMasterRecord | undefined {
  const all = withDerivedPdfPages
    ? getMergedResearchDossiers()
    : SECTORAL_RESEARCH_SERIES_2026.map((base) => {
        const ov = readDossierOverrides()[base.code.toUpperCase()];
        if (!ov) return base;
        const st = ov.status || base.status;
        const isPub = st === 'Published' || st === 'Updated';
        return {
          ...base,
          status: st,
          date: ov.date || base.date,
          title: ov.title || base.title,
          abstract: ov.abstract || base.abstract,
          author: ov.author || base.author,
          isProposedWorkingGroup: isPub ? false : base.isProposedWorkingGroup,
          assetReadiness: {
            ...base.assetReadiness,
            reportPdfAvailable: isPub,
            datasetAvailable: isPub,
          },
        };
      });

  const dossier = getResearchDossierByCodeOrId(codeOrId, all);
  if (!dossier) return undefined;

  const master = buildCanonicalReportMasterRecord(dossier.code, all);
  if (!master) return undefined;

  const ov = readDossierOverrides()[dossier.code.toUpperCase()];
  if (ov?.customChapterParagraphs) {
    master.chapters = master.chapters.map((ch) =>
      ov.customChapterParagraphs?.[ch.number]
        ? { ...ch, paragraphs: ov.customChapterParagraphs[ch.number] }
        : ch
    );
  }
  if (ov?.revisionNotes && ov.revisionNotes.length > 0) {
    master.revisionHistory = [
      ...ov.revisionNotes.map((r) => ({
        version: r.version,
        date: r.date,
        status: r.status,
        notes: r.notes,
        reviewerOrUnit: r.actor,
      })),
      ...master.revisionHistory,
    ];
  }

  return master;
}

// ── ANALYTICS TRACKING ───────────────────────────────────────────────────────
export function recordReportAnalyticsEvent(
  code: string,
  eventType: ReportAnalyticsEventType,
  metaKey?: string
): DossierAnalyticsCounters {
  const norm = code.toUpperCase();
  const store = readJsonSafe<Record<string, DossierAnalyticsCounters>>(ANALYTICS_FILE, {});
  const cur: DossierAnalyticsCounters = store[norm] || {
    reportViews: 0,
    pdfViewerOpens: 0,
    pdfDownloads: 0,
    shareModalOpens: 0,
    confirmedExternalShares: {},
    citationExports: {},
    datasetDownloads: {},
  };

  if (eventType === 'report_view') cur.reportViews++;
  else if (eventType === 'pdf_viewer_open') cur.pdfViewerOpens++;
  else if (eventType === 'pdf_download') cur.pdfDownloads++;
  else if (eventType === 'share_modal_open') cur.shareModalOpens++;
  else if (eventType === 'share_platform_dispatch') {
    const k = metaKey || 'direct';
    cur.confirmedExternalShares[k] = (cur.confirmedExternalShares[k] || 0) + 1;
  } else if (eventType === 'citation_export') {
    const k = metaKey || 'APA';
    cur.citationExports[k] = (cur.citationExports[k] || 0) + 1;
  } else if (eventType === 'dataset_download') {
    const k = metaKey || 'CSV';
    cur.datasetDownloads[k] = (cur.datasetDownloads[k] || 0) + 1;
  }

  cur.lastInteractionAt = new Date().toISOString();
  store[norm] = cur;
  writeJsonSafe(ANALYTICS_FILE, store);
  return cur;
}

export function getAllReportAnalytics(): Record<string, DossierAnalyticsCounters> {
  return readJsonSafe<Record<string, DossierAnalyticsCounters>>(ANALYTICS_FILE, {});
}

let cachedQcSummary: { ts: number; data: PortfolioQualityControlSummary } | null = null;

export function getPortfolioQualityControlReport(forceRefresh = false): PortfolioQualityControlSummary {
  if (!forceRefresh && cachedQcSummary && Date.now() - cachedQcSummary.ts < 30_000) {
    return cachedQcSummary.data;
  }
  const merged = getMergedResearchDossiers();
  const masters = merged
    .map((d) => getMergedMasterRecord(d.code, false))
    .filter((m): m is CanonicalReportMasterRecord => Boolean(m));
  const validatedPdfs = new Set<string>(masters.map((m) => m.dossier.code));
  const data = auditAllDossiersQualityGates(masters, validatedPdfs);
  cachedQcSummary = { ts: Date.now(), data };
  return data;
}
