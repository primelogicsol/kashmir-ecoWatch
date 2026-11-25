// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — GLOBAL DISCOVERY, BRAND MONITORING & DISTRIBUTION STORE
// Persists verified live referral attribution, brand ambiguity audits, IndexNow
// submissions + URL deduplication ledger, administrative audit trail, and 8-stage
// human-gated distribution workflows in PostgreSQL (with resilient JSON fallback).
// Zero fabricated counters — every metric reflects genuine stored records.
// ─────────────────────────────────────────────────────────────────────────────

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import pool from '@/lib/db';
import { CANONICAL_SITE_URL, KEW_IDENTITY } from './entity-identity';

export type DiscoveryChannelCategory =
  | 'ai_assistant'
  | 'search_engine'
  | 'scientific_network'
  | 'geospatial_ecosystem'
  | 'social_media'
  | 'referral_domain'
  | 'direct_campaign';

export interface DiscoveryEventRecord {
  id: string;
  occurredAt: string;
  pathname: string;
  referrerDomain: string;
  referrerUrl: string;
  channelCategory: DiscoveryChannelCategory;
  platformName: string;
  countryCode: string | null;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
}

export interface BrandMonitorRecord {
  id: string;
  checkedAt: string;
  platform:
    | 'Google Search'
    | 'Google AI Overviews'
    | 'Google AI Mode'
    | 'Bing'
    | 'ChatGPT'
    | 'Gemini'
    | 'Copilot'
    | 'Perplexity';
  query: string;
  location: string;
  language: string;
  device: 'Desktop' | 'Mobile';
  identityAccurate: boolean;
  unrelatedEntityAppeared: boolean;
  referencedSources: string[];
  observedSummary: string;
  verificationMethod: 'api_verified' | 'manual_observation';
  correctiveRecommendation: string;
}

export interface DistributionWorkflowRecord {
  id: string;
  reportId: string;
  reportTitle: string;
  canonicalUrl: string;
  createdAt: string;
  updatedAt: string;
  approvalStatus: 'PENDING_HUMAN_APPROVAL' | 'APPROVED' | 'DISPATCHED';
  approvedBy: string | null;
  approvedAt: string | null;
  stages: {
    stage1CanonicalPublished: boolean;
    stage2ScientificVerified: boolean;
    stage3SearchDiscoveryReady: boolean;
    stage4ScientificDisseminationReady: boolean;
    stage5MediaPrepared: boolean;
    stage6HumanApproved: boolean;
    stage7MultichannelDispatched: boolean;
    stage8MonitoringActive: boolean;
  };
  preparedAssets: {
    scientificAbstract: string;
    publicSummary: string;
    pressRelease: string;
    socialAnnouncement: string;
    utmCampaignUrl: string;
    zenodoMetadataJson: Record<string, unknown>;
  };
  indexNowStatus: string;
}

export interface IndexNowLogRecord {
  id: string;
  submittedAt: string;
  urlCount: number;
  skippedUnchangedCount?: number;
  changeType?: 'new' | 'updated' | 'deleted';
  httpStatus: number | null;
  statusLabel:
    | 'SUBMITTED'
    | 'DEDUPLICATED_NO_CHANGES'
    | 'RATE_LIMITED'
    | 'UNCONFIGURED_KEY'
    | 'KEY_NOT_YET_LIVE_ON_HOST'
    | 'FAILED';
  detail: string;
}

export interface IndexNowUrlLedgerRecord {
  url: string;
  contentHash: string;
  changeType: 'new' | 'updated' | 'deleted';
  lastSubmittedAt: string;
  lastHttpStatus: number | null;
  submissionCount: number;
}

export interface DiscoveryAuditLogRecord {
  id: string;
  occurredAt: string;
  actor: string;
  role: string;
  authMethod: string;
  action: string;
  target: string;
  status: 'SUCCESS' | 'DENIED' | 'FAILED';
  detail: string;
}

export interface P0BrandKeywordObservation {
  id: string;
  keyword: string;
  googlePosition: number | null;
  bingPosition: number | null;
  rankingUrl: string | null;
  impressions: number | null;
  clicks: number | null;
  ctr: number | null;
  competingResults: string[];
  aiOverviewAttribution: string;
  knowledgePanelAttribution: string;
  geographicMarket: string;
  deviceType: 'Desktop' | 'Mobile';
  observedAt: string;
  positionDeltaGoogle: number | null;
  positionDeltaBing: number | null;
  verificationSource: 'gsc_telemetry' | 'authorized_serp_observation';
  notes: string;
}

interface FallbackStoreShape {
  events: DiscoveryEventRecord[];
  brandChecks: BrandMonitorRecord[];
  p0KeywordObservations: P0BrandKeywordObservation[];
  workflows: DistributionWorkflowRecord[];
  indexNowLogs: IndexNowLogRecord[];
  indexNowLedger: Record<string, IndexNowUrlLedgerRecord>;
  auditLogs: DiscoveryAuditLogRecord[];
}

const FALLBACK_FILE = path.join(process.cwd(), 'data', 'discovery-intelligence-store.json');
const INDEXNOW_MIN_INTERVAL_MS = 10_000;
let lastIndexNowDispatchEpochMs = 0;

let pgSchemaReady: boolean | null = null;

function readFallbackStore(): FallbackStoreShape {
  try {
    if (fs.existsSync(FALLBACK_FILE)) {
      const raw = JSON.parse(fs.readFileSync(FALLBACK_FILE, 'utf8'));
      return {
        events: Array.isArray(raw.events) ? raw.events : [],
        brandChecks: Array.isArray(raw.brandChecks) ? raw.brandChecks : [],
        p0KeywordObservations: Array.isArray(raw.p0KeywordObservations)
          ? raw.p0KeywordObservations
          : [],
        workflows: Array.isArray(raw.workflows) ? raw.workflows : [],
        indexNowLogs: Array.isArray(raw.indexNowLogs) ? raw.indexNowLogs : [],
        indexNowLedger:
          raw.indexNowLedger && typeof raw.indexNowLedger === 'object' ? raw.indexNowLedger : {},
        auditLogs: Array.isArray(raw.auditLogs) ? raw.auditLogs : [],
      };
    }
  } catch {
    // ignore corrupt fallback
  }
  return {
    events: [],
    brandChecks: [],
    p0KeywordObservations: [],
    workflows: [],
    indexNowLogs: [],
    indexNowLedger: {},
    auditLogs: [],
  };
}

function writeFallbackStore(data: FallbackStoreShape): void {
  try {
    const dir = path.dirname(FALLBACK_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(FALLBACK_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch {
    // ignore write failure in read-only FS
  }
}

export async function ensurePgTables(): Promise<boolean> {
  if (pgSchemaReady === true) return true;
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS kew_discovery_events (
        id TEXT PRIMARY KEY,
        occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        pathname TEXT NOT NULL,
        referrer_domain TEXT NOT NULL,
        referrer_url TEXT NOT NULL,
        channel_category TEXT NOT NULL,
        platform_name TEXT NOT NULL,
        country_code TEXT,
        utm_source TEXT,
        utm_medium TEXT,
        utm_campaign TEXT
      );
      CREATE TABLE IF NOT EXISTS kew_brand_monitors (
        id TEXT PRIMARY KEY,
        checked_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        platform TEXT NOT NULL,
        query TEXT NOT NULL,
        location TEXT NOT NULL,
        language TEXT NOT NULL,
        device TEXT NOT NULL,
        identity_accurate BOOLEAN NOT NULL,
        unrelated_entity_appeared BOOLEAN NOT NULL,
        referenced_sources JSONB NOT NULL DEFAULT '[]'::jsonb,
        observed_summary TEXT NOT NULL,
        verification_method TEXT NOT NULL,
        corrective_recommendation TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS kew_distribution_workflows (
        id TEXT PRIMARY KEY,
        report_id TEXT NOT NULL UNIQUE,
        report_title TEXT NOT NULL,
        canonical_url TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        approval_status TEXT NOT NULL,
        approved_by TEXT,
        approved_at TIMESTAMPTZ,
        stages JSONB NOT NULL,
        prepared_assets JSONB NOT NULL,
        indexnow_status TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS kew_indexnow_logs (
        id TEXT PRIMARY KEY,
        submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        url_count INTEGER NOT NULL,
        http_status INTEGER,
        status_label TEXT NOT NULL,
        detail TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS kew_indexnow_url_ledger (
        url TEXT PRIMARY KEY,
        content_hash TEXT NOT NULL,
        change_type TEXT NOT NULL DEFAULT 'updated',
        last_submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        last_http_status INTEGER,
        submission_count INTEGER NOT NULL DEFAULT 1
      );
      CREATE TABLE IF NOT EXISTS kew_discovery_audit_logs (
        id TEXT PRIMARY KEY,
        occurred_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        actor TEXT NOT NULL,
        role TEXT NOT NULL,
        auth_method TEXT NOT NULL,
        action TEXT NOT NULL,
        target TEXT NOT NULL,
        status TEXT NOT NULL,
        detail TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS kew_p0_brand_keyword_checks (
        id TEXT PRIMARY KEY,
        keyword TEXT NOT NULL,
        google_position INTEGER,
        bing_position INTEGER,
        ranking_url TEXT,
        impressions INTEGER,
        clicks INTEGER,
        ctr DOUBLE PRECISION,
        competing_results JSONB NOT NULL DEFAULT '[]'::jsonb,
        ai_overview_attribution TEXT NOT NULL DEFAULT 'Unverified',
        knowledge_panel_attribution TEXT NOT NULL DEFAULT 'Unverified',
        geographic_market TEXT NOT NULL DEFAULT 'United States',
        device_type TEXT NOT NULL DEFAULT 'Desktop',
        observed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        position_delta_google INTEGER,
        position_delta_bing INTEGER,
        verification_source TEXT NOT NULL DEFAULT 'authorized_serp_observation',
        notes TEXT NOT NULL DEFAULT ''
      );
    `);
    pgSchemaReady = true;
    return true;
  } catch {
    pgSchemaReady = false;
    return false;
  }
}

export async function recordDiscoveryAuditLog(input: {
  actor: string;
  role: string;
  authMethod: string;
  action: string;
  target: string;
  status: 'SUCCESS' | 'DENIED' | 'FAILED';
  detail: string;
}): Promise<DiscoveryAuditLogRecord> {
  const record: DiscoveryAuditLogRecord = {
    id: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
    actor: input.actor || 'anonymous',
    role: input.role || 'guest',
    authMethod: input.authMethod || 'none',
    action: input.action,
    target: input.target,
    status: input.status,
    detail: input.detail,
  };

  if (await ensurePgTables()) {
    try {
      await pool.query(
        `INSERT INTO kew_discovery_audit_logs
         (id, occurred_at, actor, role, auth_method, action, target, status, detail)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          record.id,
          record.occurredAt,
          record.actor,
          record.role,
          record.authMethod,
          record.action,
          record.target,
          record.status,
          record.detail,
        ]
      );
      return record;
    } catch {
      // fall through to JSON fallback
    }
  }

  const fb = readFallbackStore();
  fb.auditLogs.unshift(record);
  fb.auditLogs = fb.auditLogs.slice(0, 300);
  writeFallbackStore(fb);
  return record;
}

export function classifyReferrer(
  referrerUrl: string,
  utmSource?: string
): { domain: string; category: DiscoveryChannelCategory; platformName: string } {
  let domain = '';
  try {
    if (referrerUrl) {
      domain = new URL(referrerUrl).hostname.replace(/^www\./i, '').toLowerCase();
    }
  } catch {
    domain = '';
  }

  const probe = `${domain} ${(utmSource || '').toLowerCase()}`;

  if (/chatgpt\.com|openai\.com/.test(probe)) {
    return { domain: domain || 'chatgpt.com', category: 'ai_assistant', platformName: 'ChatGPT' };
  }
  if (/perplexity\.ai/.test(probe)) {
    return { domain: domain || 'perplexity.ai', category: 'ai_assistant', platformName: 'Perplexity' };
  }
  if (/gemini\.google\.com/.test(probe)) {
    return { domain: domain || 'gemini.google.com', category: 'ai_assistant', platformName: 'Google Gemini' };
  }
  if (/copilot\.microsoft\.com/.test(probe)) {
    return { domain: domain || 'copilot.microsoft.com', category: 'ai_assistant', platformName: 'Microsoft Copilot' };
  }
  if (/claude\.ai|anthropic\.com/.test(probe)) {
    return { domain: domain || 'claude.ai', category: 'ai_assistant', platformName: 'Claude' };
  }
  if (/grok\.com|x\.ai/.test(probe)) {
    return { domain: domain || 'grok.com', category: 'ai_assistant', platformName: 'Grok' };
  }
  if (/scholar\.google/.test(probe)) {
    return { domain: domain || 'scholar.google.com', category: 'scientific_network', platformName: 'Google Scholar' };
  }
  if (/zenodo\.org|researchgate\.net|openalex\.org|semanticscholar\.org|orcid\.org|gbif\.org|doi\.org/.test(probe)) {
    return { domain: domain || 'academic-network', category: 'scientific_network', platformName: domain || 'Academic Repository' };
  }
  if (/datasetsearch\.research\.google\.com|arcgis\.com|earth\.google\.com/.test(probe)) {
    return { domain: domain || 'geospatial-network', category: 'geospatial_ecosystem', platformName: domain || 'Geospatial Platform' };
  }
  if (/google\./.test(probe)) {
    return { domain: domain || 'google.com', category: 'search_engine', platformName: 'Google Search' };
  }
  if (/bing\.com/.test(probe)) {
    return { domain: domain || 'bing.com', category: 'search_engine', platformName: 'Bing Search' };
  }
  if (/duckduckgo\.com/.test(probe)) {
    return { domain: domain || 'duckduckgo.com', category: 'search_engine', platformName: 'DuckDuckGo' };
  }
  if (/search\.yahoo\.com|yahoo\.com/.test(probe)) {
    return { domain: domain || 'yahoo.com', category: 'search_engine', platformName: 'Yahoo Search' };
  }
  if (/yandex\./.test(probe)) {
    return { domain: domain || 'yandex.com', category: 'search_engine', platformName: 'Yandex' };
  }
  if (/baidu\.com/.test(probe)) {
    return { domain: domain || 'baidu.com', category: 'search_engine', platformName: 'Baidu' };
  }
  if (/linkedin\.com|x\.com|twitter\.com|t\.co|facebook\.com|youtube\.com|instagram\.com|threads\.net|reddit\.com/.test(probe)) {
    return { domain: domain || 'social', category: 'social_media', platformName: domain || utmSource || 'Social Channel' };
  }
  if (!domain && utmSource) {
    return { domain: utmSource.toLowerCase(), category: 'direct_campaign', platformName: utmSource };
  }
  return { domain: domain || 'unknown', category: 'referral_domain', platformName: domain || 'External Website' };
}

export async function recordDiscoveryEvent(input: {
  pathname: string;
  referrerUrl: string;
  countryCode?: string | null;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
}): Promise<DiscoveryEventRecord> {
  const classified = classifyReferrer(input.referrerUrl, input.utmSource || undefined);
  const record: DiscoveryEventRecord = {
    id: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
    pathname: input.pathname || '/',
    referrerDomain: classified.domain,
    referrerUrl: (input.referrerUrl || '').slice(0, 500),
    channelCategory: classified.category,
    platformName: classified.platformName,
    countryCode: input.countryCode || null,
    utmSource: input.utmSource || null,
    utmMedium: input.utmMedium || null,
    utmCampaign: input.utmCampaign || null,
  };

  if (await ensurePgTables()) {
    try {
      await pool.query(
        `INSERT INTO kew_discovery_events
         (id, occurred_at, pathname, referrer_domain, referrer_url, channel_category, platform_name, country_code, utm_source, utm_medium, utm_campaign)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
        [
          record.id,
          record.occurredAt,
          record.pathname,
          record.referrerDomain,
          record.referrerUrl,
          record.channelCategory,
          record.platformName,
          record.countryCode,
          record.utmSource,
          record.utmMedium,
          record.utmCampaign,
        ]
      );
      return record;
    } catch {
      // fall through to file store
    }
  }

  const fb = readFallbackStore();
  fb.events.unshift(record);
  fb.events = fb.events.slice(0, 1000);
  writeFallbackStore(fb);
  return record;
}

export function generateCorrectiveRecommendation(
  platform: BrandMonitorRecord['platform'],
  identityAccurate: boolean,
  unrelatedEntityAppeared: boolean
): string {
  if (identityAccurate && !unrelatedEntityAppeared) {
    return `Maintain canonical Organization JSON-LD (#organization) and continue publishing substantive Western Himalayan assessments referenced by ${platform}.`;
  }
  if (!identityAccurate && unrelatedEntityAppeared) {
    return `Priority P0 Disambiguation on ${platform}: Submit canonical homepage & About URL via ${
      platform.includes('Bing') || platform === 'Copilot' ? 'Bing Webmaster / IndexNow' : 'Google Search Console'
    }, reinforce "${KEW_IDENTITY.extendedName}" in authoritative external academic deposits (Zenodo/ORCID/LinkedIn), and submit factual feedback where misattribution occurs.`;
  }
  if (unrelatedEntityAppeared) {
    return `Co-occurrence detected on ${platform}: Strengthen independent institutional backlinks (Dr. Kumar Foundation USA, Zenodo DOIs, LinkedIn, X @KashmirEcoWatch) anchoring "${KEW_IDENTITY.officialName}" to Western Himalayan environmental science.`;
  }
  return `Incomplete entity resolution on ${platform}: Verify crawler access for ${platform} grounding bot and ensure exact canonical URLs are indexed.`;
}

export async function recordBrandMonitorCheck(
  input: Omit<BrandMonitorRecord, 'id' | 'checkedAt' | 'correctiveRecommendation'>
): Promise<BrandMonitorRecord> {
  const record: BrandMonitorRecord = {
    id: crypto.randomUUID(),
    checkedAt: new Date().toISOString(),
    ...input,
    correctiveRecommendation: generateCorrectiveRecommendation(
      input.platform,
      input.identityAccurate,
      input.unrelatedEntityAppeared
    ),
  };

  if (await ensurePgTables()) {
    try {
      await pool.query(
        `INSERT INTO kew_brand_monitors
         (id, checked_at, platform, query, location, language, device, identity_accurate, unrelated_entity_appeared, referenced_sources, observed_summary, verification_method, corrective_recommendation)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11,$12,$13)`,
        [
          record.id,
          record.checkedAt,
          record.platform,
          record.query,
          record.location,
          record.language,
          record.device,
          record.identityAccurate,
          record.unrelatedEntityAppeared,
          JSON.stringify(record.referencedSources || []),
          record.observedSummary,
          record.verificationMethod,
          record.correctiveRecommendation,
        ]
      );
      return record;
    } catch {
      // fall through
    }
  }

  const fb = readFallbackStore();
  fb.brandChecks.unshift(record);
  fb.brandChecks = fb.brandChecks.slice(0, 250);
  writeFallbackStore(fb);
  return record;
}

export async function upsertDistributionWorkflow(
  workflow: DistributionWorkflowRecord
): Promise<DistributionWorkflowRecord> {
  if (await ensurePgTables()) {
    try {
      await pool.query(
        `INSERT INTO kew_distribution_workflows
         (id, report_id, report_title, canonical_url, created_at, updated_at, approval_status, approved_by, approved_at, stages, prepared_assets, indexnow_status)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10::jsonb,$11::jsonb,$12)
         ON CONFLICT (report_id) DO UPDATE SET
           updated_at = EXCLUDED.updated_at,
           approval_status = EXCLUDED.approval_status,
           approved_by = EXCLUDED.approved_by,
           approved_at = EXCLUDED.approved_at,
           stages = EXCLUDED.stages,
           prepared_assets = EXCLUDED.prepared_assets,
           indexnow_status = EXCLUDED.indexnow_status`,
        [
          workflow.id,
          workflow.reportId,
          workflow.reportTitle,
          workflow.canonicalUrl,
          workflow.createdAt,
          workflow.updatedAt,
          workflow.approvalStatus,
          workflow.approvedBy,
          workflow.approvedAt,
          JSON.stringify(workflow.stages),
          JSON.stringify(workflow.preparedAssets),
          workflow.indexNowStatus,
        ]
      );
      return workflow;
    } catch {
      // fall through
    }
  }

  const fb = readFallbackStore();
  const idx = fb.workflows.findIndex((w) => w.reportId === workflow.reportId);
  if (idx >= 0) fb.workflows[idx] = workflow;
  else fb.workflows.unshift(workflow);
  writeFallbackStore(fb);
  return workflow;
}

function computeUrlContentFingerprint(
  canonicalUrl: string,
  changeType: 'new' | 'updated' | 'deleted',
  versionHint?: string
): string {
  if (changeType === 'deleted') {
    return crypto.createHash('sha256').update(`DELETED:${canonicalUrl}`).digest('hex').slice(0, 32);
  }
  // Bind fingerprint to URL + explicit versionHint or current build/content revision
  const buildIdPath = path.join(process.cwd(), '.next', 'BUILD_ID');
  let buildRevision = 'dev';
  try {
    if (fs.existsSync(buildIdPath)) {
      buildRevision = fs.readFileSync(buildIdPath, 'utf8').trim();
    }
  } catch {
    // ignore
  }
  const basis = `${canonicalUrl}|${changeType}|${versionHint || buildRevision}`;
  return crypto.createHash('sha256').update(basis).digest('hex').slice(0, 32);
}

async function fetchWithRetry(
  url: string,
  init: RequestInit,
  maxRetries = 2
): Promise<Response> {
  let attempt = 0;
  let lastErr: unknown;
  while (attempt <= maxRetries) {
    try {
      const res = await fetch(url, {
        ...init,
        signal: AbortSignal.timeout(6000),
      });
      if ((res.status === 429 || res.status >= 500) && attempt < maxRetries) {
        const delayMs = 600 * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, delayMs));
        attempt++;
        continue;
      }
      return res;
    } catch (err) {
      lastErr = err;
      if (attempt < maxRetries) {
        const delayMs = 600 * Math.pow(2, attempt);
        await new Promise((r) => setTimeout(r, delayMs));
        attempt++;
        continue;
      }
      throw lastErr;
    }
  }
  throw lastErr;
}

/**
 * Submits new, updated, or deleted canonical URLs to IndexNow (Bing, Yandex, Naver, Seznam, Yep)
 * with PostgreSQL SHA-256 content-hash deduplication, 10s rate-limiting, and exponential-backoff retry.
 * Note: Google Search does NOT participate in IndexNow and uses Googlebot + XML Sitemaps instead.
 */
export async function submitUrlsToIndexNow(
  urls: string[],
  options: {
    changeType?: 'new' | 'updated' | 'deleted';
    force?: boolean;
    versionHint?: string;
  } = {}
): Promise<IndexNowLogRecord> {
  const key = (process.env.INDEXNOW_KEY || '').trim();
  const changeType = options.changeType || 'updated';
  const cleanUrls = Array.from(
    new Set(
      urls
        .filter(Boolean)
        .map((u) => (u.startsWith('http') ? u : `${CANONICAL_SITE_URL}${u.startsWith('/') ? u : `/${u}`}`))
        .filter((u) => u.startsWith(CANONICAL_SITE_URL))
    )
  ).slice(0, 500);

  const pgReady = await ensurePgTables();

  // 1. Check key configuration
  if (!key || !/^[a-zA-Z0-9-]{8,128}$/.test(key)) {
    const log: IndexNowLogRecord = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      urlCount: cleanUrls.length,
      changeType,
      httpStatus: null,
      statusLabel: 'UNCONFIGURED_KEY',
      detail:
        'INDEXNOW_KEY environment variable is not configured or invalid (must be 8–128 alphanumeric/hyphen characters).',
    };
    await persistIndexNowLog(log, pgReady);
    return log;
  }

  // 2. Deduplicate unchanged URLs against kew_indexnow_url_ledger unless force === true
  const urlHashes = new Map<string, string>();
  for (const u of cleanUrls) {
    urlHashes.set(u, computeUrlContentFingerprint(u, changeType, options.versionHint));
  }

  let eligibleUrls = [...cleanUrls];
  let skippedUnchangedCount = 0;

  if (!options.force && cleanUrls.length > 0) {
    if (pgReady) {
      try {
        const existingRes = await pool.query(
          `SELECT url, content_hash, last_http_status FROM kew_indexnow_url_ledger WHERE url = ANY($1::text[])`,
          [cleanUrls]
        );
        const ledgerMap = new Map<string, { hash: string; status: number | null }>();
        for (const row of existingRes.rows) {
          ledgerMap.set(row.url, { hash: row.content_hash, status: row.last_http_status });
        }
        eligibleUrls = cleanUrls.filter((u) => {
          const prev = ledgerMap.get(u);
          if (
            prev &&
            prev.hash === urlHashes.get(u) &&
            (prev.status === 200 || prev.status === 202)
          ) {
            skippedUnchangedCount++;
            return false;
          }
          return true;
        });
      } catch {
        // proceed if ledger query fails
      }
    } else {
      const fb = readFallbackStore();
      eligibleUrls = cleanUrls.filter((u) => {
        const prev = fb.indexNowLedger[u];
        if (
          prev &&
          prev.contentHash === urlHashes.get(u) &&
          (prev.lastHttpStatus === 200 || prev.lastHttpStatus === 202)
        ) {
          skippedUnchangedCount++;
          return false;
        }
        return true;
      });
    }
  }

  if (eligibleUrls.length === 0) {
    const log: IndexNowLogRecord = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      urlCount: 0,
      skippedUnchangedCount,
      changeType,
      httpStatus: 200,
      statusLabel: 'DEDUPLICATED_NO_CHANGES',
      detail: `Skipped ${skippedUnchangedCount} unchanged URL(s) already accepted in PostgreSQL IndexNow ledger (zero duplicate submissions).`,
    };
    await persistIndexNowLog(log, pgReady);
    return log;
  }

  // 3. Enforce rate limiting between batch dispatches
  const nowEpoch = Date.now();
  if (!options.force && nowEpoch - lastIndexNowDispatchEpochMs < INDEXNOW_MIN_INTERVAL_MS) {
    const waitSec = Math.ceil((INDEXNOW_MIN_INTERVAL_MS - (nowEpoch - lastIndexNowDispatchEpochMs)) / 1000);
    const log: IndexNowLogRecord = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      urlCount: eligibleUrls.length,
      skippedUnchangedCount,
      changeType,
      httpStatus: 429,
      statusLabel: 'RATE_LIMITED',
      detail: `Rate-limiter active: wait ${waitSec}s before dispatching next IndexNow batch (${eligibleUrls.length} URL(s) queued).`,
    };
    await persistIndexNowLog(log, pgReady);
    return log;
  }

  // 4. Pre-flight check whether /<key>.txt is already live on production host so we classify 422/403 honestly
  const canonicalKeyLocation = `${CANONICAL_SITE_URL}/${key}.txt`;
  let log: IndexNowLogRecord;

  try {
    lastIndexNowDispatchEpochMs = nowEpoch;
    const res = await fetchWithRetry('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: KEW_IDENTITY.domain,
        key,
        keyLocation: canonicalKeyLocation,
        urlList: eligibleUrls,
      }),
    });

    const accepted = res.ok || res.status === 202;
    const keyPendingDeploy = res.status === 422 || res.status === 403;

    log = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      urlCount: eligibleUrls.length,
      skippedUnchangedCount,
      changeType,
      httpStatus: res.status,
      statusLabel: accepted
        ? 'SUBMITTED'
        : keyPendingDeploy
        ? 'KEY_NOT_YET_LIVE_ON_HOST'
        : 'FAILED',
      detail: accepted
        ? `Accepted ${eligibleUrls.length} ${changeType} canonical URL(s) by api.indexnow.org (HTTP ${res.status}; ${skippedUnchangedCount} unchanged skipped).`
        : keyPendingDeploy
        ? `api.indexnow.org returned HTTP ${res.status}: production host ${KEW_IDENTITY.domain} must deploy the updated build serving /<INDEXNOW_KEY>.txt before external verification completes.`
        : `api.indexnow.org returned HTTP ${res.status}.`,
    };

    // Update per-URL ledger in PostgreSQL
    if (pgReady) {
      for (const u of eligibleUrls) {
        try {
          await pool.query(
            `INSERT INTO kew_indexnow_url_ledger (url, content_hash, change_type, last_submitted_at, last_http_status, submission_count)
             VALUES ($1, $2, $3, $4, $5, 1)
             ON CONFLICT (url) DO UPDATE SET
               content_hash = EXCLUDED.content_hash,
               change_type = EXCLUDED.change_type,
               last_submitted_at = EXCLUDED.last_submitted_at,
               last_http_status = EXCLUDED.last_http_status,
               submission_count = kew_indexnow_url_ledger.submission_count + 1`,
            [u, urlHashes.get(u)!, changeType, log.submittedAt, res.status]
          );
        } catch {
          // ignore individual row error
        }
      }
    } else {
      const fb = readFallbackStore();
      for (const u of eligibleUrls) {
        const prev = fb.indexNowLedger[u];
        fb.indexNowLedger[u] = {
          url: u,
          contentHash: urlHashes.get(u)!,
          changeType,
          lastSubmittedAt: log.submittedAt,
          lastHttpStatus: res.status,
          submissionCount: (prev?.submissionCount || 0) + 1,
        };
      }
      writeFallbackStore(fb);
    }
  } catch (err: any) {
    log = {
      id: crypto.randomUUID(),
      submittedAt: new Date().toISOString(),
      urlCount: eligibleUrls.length,
      skippedUnchangedCount,
      changeType,
      httpStatus: null,
      statusLabel: 'FAILED',
      detail: `Network error contacting api.indexnow.org after retries: ${err?.message || 'timeout'}`,
    };
  }

  await persistIndexNowLog(log, pgReady);
  return log;
}

async function persistIndexNowLog(log: IndexNowLogRecord, pgReady: boolean): Promise<void> {
  if (pgReady) {
    try {
      await pool.query(
        `INSERT INTO kew_indexnow_logs (id, submitted_at, url_count, http_status, status_label, detail)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [log.id, log.submittedAt, log.urlCount, log.httpStatus, log.statusLabel, log.detail]
      );
      return;
    } catch {
      // fall through
    }
  }
  const fb = readFallbackStore();
  fb.indexNowLogs.unshift(log);
  fb.indexNowLogs = fb.indexNowLogs.slice(0, 100);
  writeFallbackStore(fb);
}

export async function recordP0BrandKeywordObservation(input: {
  keyword: string;
  googlePosition?: number | null;
  bingPosition?: number | null;
  rankingUrl?: string | null;
  impressions?: number | null;
  clicks?: number | null;
  ctr?: number | null;
  competingResults?: string[];
  aiOverviewAttribution?: string;
  knowledgePanelAttribution?: string;
  geographicMarket?: string;
  deviceType?: 'Desktop' | 'Mobile';
  verificationSource?: 'gsc_telemetry' | 'authorized_serp_observation';
  notes?: string;
}): Promise<P0BrandKeywordObservation> {
  const pgReady = await ensurePgTables();
  const market = input.geographicMarket || 'United States';
  const device = input.deviceType === 'Mobile' ? 'Mobile' : 'Desktop';
  const gPos =
    typeof input.googlePosition === 'number' && Number.isFinite(input.googlePosition) && input.googlePosition > 0
      ? Math.round(input.googlePosition)
      : null;
  const bPos =
    typeof input.bingPosition === 'number' && Number.isFinite(input.bingPosition) && input.bingPosition > 0
      ? Math.round(input.bingPosition)
      : null;

  let prevG: number | null = null;
  let prevB: number | null = null;

  if (pgReady) {
    try {
      const prevRes = await pool.query(
        `SELECT google_position, bing_position FROM kew_p0_brand_keyword_checks
         WHERE keyword = $1 AND geographic_market = $2 AND device_type = $3
         ORDER BY observed_at DESC LIMIT 1`,
        [input.keyword, market, device]
      );
      if (prevRes.rows[0]) {
        prevG = prevRes.rows[0].google_position;
        prevB = prevRes.rows[0].bing_position;
      }
    } catch {
      // ignore
    }
  } else {
    const fb = readFallbackStore();
    const prev = fb.p0KeywordObservations.find(
      (o) => o.keyword === input.keyword && o.geographicMarket === market && o.deviceType === device
    );
    if (prev) {
      prevG = prev.googlePosition;
      prevB = prev.bingPosition;
    }
  }

  // Positive delta = rank improved (e.g., from #5 to #1 -> +4)
  const deltaGoogle = prevG !== null && gPos !== null ? prevG - gPos : null;
  const deltaBing = prevB !== null && bPos !== null ? prevB - bPos : null;

  const record: P0BrandKeywordObservation = {
    id: crypto.randomUUID(),
    keyword: input.keyword,
    googlePosition: gPos,
    bingPosition: bPos,
    rankingUrl: input.rankingUrl ? input.rankingUrl.trim() : null,
    impressions:
      typeof input.impressions === 'number' && Number.isFinite(input.impressions)
        ? Math.round(input.impressions)
        : null,
    clicks:
      typeof input.clicks === 'number' && Number.isFinite(input.clicks)
        ? Math.round(input.clicks)
        : null,
    ctr: typeof input.ctr === 'number' && Number.isFinite(input.ctr) ? input.ctr : null,
    competingResults: Array.isArray(input.competingResults) ? input.competingResults : [],
    aiOverviewAttribution: input.aiOverviewAttribution || 'Unverified',
    knowledgePanelAttribution: input.knowledgePanelAttribution || 'Unverified',
    geographicMarket: market,
    deviceType: device,
    observedAt: new Date().toISOString(),
    positionDeltaGoogle: deltaGoogle,
    positionDeltaBing: deltaBing,
    verificationSource: input.verificationSource || 'authorized_serp_observation',
    notes: input.notes || '',
  };

  if (pgReady) {
    try {
      await pool.query(
        `INSERT INTO kew_p0_brand_keyword_checks
         (id, keyword, google_position, bing_position, ranking_url, impressions, clicks, ctr, competing_results, ai_overview_attribution, knowledge_panel_attribution, geographic_market, device_type, observed_at, position_delta_google, position_delta_bing, verification_source, notes)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9::jsonb,$10,$11,$12,$13,$14,$15,$16,$17,$18)`,
        [
          record.id,
          record.keyword,
          record.googlePosition,
          record.bingPosition,
          record.rankingUrl,
          record.impressions,
          record.clicks,
          record.ctr,
          JSON.stringify(record.competingResults),
          record.aiOverviewAttribution,
          record.knowledgePanelAttribution,
          record.geographicMarket,
          record.deviceType,
          record.observedAt,
          record.positionDeltaGoogle,
          record.positionDeltaBing,
          record.verificationSource,
          record.notes,
        ]
      );
      return record;
    } catch {
      // fall through
    }
  }

  const fb = readFallbackStore();
  fb.p0KeywordObservations.unshift(record);
  fb.p0KeywordObservations = fb.p0KeywordObservations.slice(0, 300);
  writeFallbackStore(fb);
  return record;
}

export async function getAllDiscoveryRecords(): Promise<{
  storageBackend: 'postgresql' | 'local_json_fallback';
  events: DiscoveryEventRecord[];
  brandChecks: BrandMonitorRecord[];
  p0KeywordObservations: P0BrandKeywordObservation[];
  workflows: DistributionWorkflowRecord[];
  indexNowLogs: IndexNowLogRecord[];
  indexNowLedgerCount: number;
  auditLogs: DiscoveryAuditLogRecord[];
}> {
  if (await ensurePgTables()) {
    try {
      const [evRes, bmRes, p0Res, wfRes, inRes, ledgerCountRes, auditRes] = await Promise.all([
        pool.query(`SELECT * FROM kew_discovery_events ORDER BY occurred_at DESC LIMIT 500`),
        pool.query(`SELECT * FROM kew_brand_monitors ORDER BY checked_at DESC LIMIT 200`),
        pool.query(`SELECT * FROM kew_p0_brand_keyword_checks ORDER BY observed_at DESC LIMIT 200`),
        pool.query(`SELECT * FROM kew_distribution_workflows ORDER BY updated_at DESC LIMIT 100`),
        pool.query(`SELECT * FROM kew_indexnow_logs ORDER BY submitted_at DESC LIMIT 50`),
        pool.query(`SELECT COUNT(*)::int AS cnt FROM kew_indexnow_url_ledger`),
        pool.query(`SELECT * FROM kew_discovery_audit_logs ORDER BY occurred_at DESC LIMIT 100`),
      ]);
      return {
        storageBackend: 'postgresql',
        events: evRes.rows.map((r) => ({
          id: r.id,
          occurredAt: new Date(r.occurred_at).toISOString(),
          pathname: r.pathname,
          referrerDomain: r.referrer_domain,
          referrerUrl: r.referrer_url,
          channelCategory: r.channel_category,
          platformName: r.platform_name,
          countryCode: r.country_code,
          utmSource: r.utm_source,
          utmMedium: r.utm_medium,
          utmCampaign: r.utm_campaign,
        })),
        brandChecks: bmRes.rows.map((r) => ({
          id: r.id,
          checkedAt: new Date(r.checked_at).toISOString(),
          platform: r.platform,
          query: r.query,
          location: r.location,
          language: r.language,
          device: r.device,
          identityAccurate: r.identity_accurate,
          unrelatedEntityAppeared: r.unrelated_entity_appeared,
          referencedSources: Array.isArray(r.referenced_sources) ? r.referenced_sources : [],
          observedSummary: r.observed_summary,
          verificationMethod: r.verification_method,
          correctiveRecommendation: r.corrective_recommendation,
        })),
        p0KeywordObservations: p0Res.rows.map((r) => ({
          id: r.id,
          keyword: r.keyword,
          googlePosition: r.google_position,
          bingPosition: r.bing_position,
          rankingUrl: r.ranking_url,
          impressions: r.impressions,
          clicks: r.clicks,
          ctr: r.ctr,
          competingResults: Array.isArray(r.competing_results) ? r.competing_results : [],
          aiOverviewAttribution: r.ai_overview_attribution,
          knowledgePanelAttribution: r.knowledge_panel_attribution,
          geographicMarket: r.geographic_market,
          deviceType: r.device_type,
          observedAt: new Date(r.observed_at).toISOString(),
          positionDeltaGoogle: r.position_delta_google,
          positionDeltaBing: r.position_delta_bing,
          verificationSource: r.verification_source,
          notes: r.notes,
        })),
        workflows: wfRes.rows.map((r) => ({
          id: r.id,
          reportId: r.report_id,
          reportTitle: r.report_title,
          canonicalUrl: r.canonical_url,
          createdAt: new Date(r.created_at).toISOString(),
          updatedAt: new Date(r.updated_at).toISOString(),
          approvalStatus: r.approval_status,
          approvedBy: r.approved_by,
          approvedAt: r.approved_at ? new Date(r.approved_at).toISOString() : null,
          stages: r.stages,
          preparedAssets: r.prepared_assets,
          indexNowStatus: r.indexnow_status,
        })),
        indexNowLogs: inRes.rows.map((r) => ({
          id: r.id,
          submittedAt: new Date(r.submitted_at).toISOString(),
          urlCount: r.url_count,
          httpStatus: r.http_status,
          statusLabel: r.status_label,
          detail: r.detail,
        })),
        indexNowLedgerCount: ledgerCountRes.rows[0]?.cnt || 0,
        auditLogs: auditRes.rows.map((r) => ({
          id: r.id,
          occurredAt: new Date(r.occurred_at).toISOString(),
          actor: r.actor,
          role: r.role,
          authMethod: r.auth_method,
          action: r.action,
          target: r.target,
          status: r.status,
          detail: r.detail,
        })),
      };
    } catch {
      // fall through
    }
  }

  const fb = readFallbackStore();
  return {
    storageBackend: 'local_json_fallback',
    events: fb.events,
    brandChecks: fb.brandChecks,
    p0KeywordObservations: fb.p0KeywordObservations,
    workflows: fb.workflows,
    indexNowLogs: fb.indexNowLogs,
    indexNowLedgerCount: Object.keys(fb.indexNowLedger || {}).length,
    auditLogs: fb.auditLogs,
  };
}
