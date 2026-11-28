// ─────────────────────────────────────────────────────────────────────────────
// HIMALAYAN DISPATCH — EDITORIAL CORRESPONDENCE CENTER & KEW EVIDENCE EXCHANGE
// PostgreSQL-backed, AES-256-GCM encrypted-at-rest, scrypt-authenticated
// two-way correspondence engine with segregated HDN editorial RBAC and
// consent-governed Kashmir EcoWatch evidence exchange.
// ─────────────────────────────────────────────────────────────────────────────

import crypto from 'crypto';
import { NextRequest } from 'next/server';
import pool from '@/lib/db';
import {
  checkAuthRateLimit,
  getDomainSigningSecret,
  verifyAdminRequest,
} from '@/lib/seo/admin-session';
import {
  computeEffectivePermissions,
  HDN_SESSION_COOKIE,
  verifyHdnSessionToken,
} from '@/lib/hdn/rbac';
import { readHdnStore } from '@/lib/hdn/store';
import {
  getPublicMastheadPositions,
  JOURNALIST_SESSION_COOKIE,
  verifyJournalistSessionToken,
} from '@/lib/himalayan-dispatch-store';
import { INITIAL_OPERATIONS_RECORDS, type OperationRecord } from '@/lib/operations';
import {
  CORRESPONDENCE_CATEGORIES,
  CORRESPONDENCE_THREAD_COOKIE,
  type AttachmentMetadataItem,
  type CorrespondenceCategoryId,
  type CorrespondenceCategorySpec,
  type CorrespondencePriority,
  type CorrespondenceRegion,
  type CorrespondenceStatus,
  type PublicCorrespondenceThreadView,
} from '@/lib/himalayan-dispatch-correspondence-types';

export * from '@/lib/himalayan-dispatch-correspondence-types';

// ─── AES-256-GCM AT-REST ENCRYPTION & SCRYPT CREDENTIAL HASHING ──────────────

function getEncryptionKey(): Buffer {
  const hex = getDomainSigningSecret('hd-correspondence-aes256gcm-v1');
  return Buffer.from(hex, 'hex'); // 32 bytes (256 bits)
}

export function encryptAtRest(plaintext: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plaintext || '', 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `v1:${iv.toString('base64url')}:${tag.toString('base64url')}:${encrypted.toString('base64url')}`;
}

export function decryptAtRest(ciphertext?: string | null): string {
  if (!ciphertext) return '';
  if (!ciphertext.startsWith('v1:')) return ciphertext;
  try {
    const [, ivB64, tagB64, dataB64] = ciphertext.split(':');
    const iv = Buffer.from(ivB64, 'base64url');
    const tag = Buffer.from(tagB64, 'base64url');
    const data = Buffer.from(dataB64, 'base64url');
    const decipher = crypto.createDecipheriv('aes-256-gcm', getEncryptionKey(), iv);
    decipher.setAuthTag(tag);
    return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
  } catch {
    return '[Encrypted Record — Key Mismatch]';
  }
}

export function encryptBufferAtRest(buf: Buffer): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv('aes-256-gcm', getEncryptionKey(), iv);
  const encrypted = Buffer.concat([cipher.update(buf), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `b1:${iv.toString('base64url')}:${tag.toString('base64url')}:${encrypted.toString('base64url')}`;
}

export function decryptBufferAtRest(payload: string): Buffer | null {
  if (!payload || !payload.startsWith('b1:')) return null;
  try {
    const [, ivB64, tagB64, dataB64] = payload.split(':');
    const decipher = crypto.createDecipheriv(
      'aes-256-gcm',
      getEncryptionKey(),
      Buffer.from(ivB64, 'base64url')
    );
    decipher.setAuthTag(Buffer.from(tagB64, 'base64url'));
    return Buffer.concat([
      decipher.update(Buffer.from(dataB64, 'base64url')),
      decipher.final(),
    ]);
  } catch {
    return null;
  }
}

const CROCKFORD_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';

function randomTokenChars(length: number): string {
  const bytes = crypto.randomBytes(length);
  let out = '';
  for (let i = 0; i < length; i++) {
    out += CROCKFORD_ALPHABET[bytes[i] % CROCKFORD_ALPHABET.length];
  }
  return out;
}

/** Non-sequential cryptographic correspondence reference number */
export function generateCorrespondenceReference(): string {
  const year = new Date().getUTCFullYear();
  return `HDC-${year}-${randomTokenChars(8)}`;
}

/** High-entropy private access credential (never stored in plaintext) */
export function generatePrivateAccessCredential(): string {
  return `HDK-${randomTokenChars(4)}-${randomTokenChars(4)}-${randomTokenChars(4)}-${randomTokenChars(4)}`;
}

export function hashAccessCredential(credential: string): string {
  const normalized = credential.trim().toUpperCase().replace(/\s+/g, '');
  const salt = crypto.randomBytes(16);
  const derived = crypto.scryptSync(normalized, salt, 32);
  return `scrypt$${salt.toString('hex')}$${derived.toString('hex')}`;
}

export function verifyAccessCredential(provided: string, storedHash: string): boolean {
  if (!provided || !storedHash || !storedHash.startsWith('scrypt$')) return false;
  const parts = storedHash.split('$');
  if (parts.length !== 3) return false;
  const salt = Buffer.from(parts[1], 'hex');
  const expected = Buffer.from(parts[2], 'hex');
  const normalized = provided.trim().toUpperCase().replace(/\s+/g, '');
  const derived = crypto.scryptSync(normalized, salt, expected.length);
  return derived.length === expected.length && crypto.timingSafeEqual(derived, expected);
}

// ─── THREAD ACCESS SESSION TOKEN (BOUND TO SINGLE REFERENCE) ─────────────────

export function signThreadAccessToken(referenceNumber: string, ttlSeconds = 2 * 60 * 60): string {
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    v: 1,
    ref: referenceNumber.trim().toUpperCase(),
    iat: now,
    exp: now + ttlSeconds,
  };
  const encoded = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url');
  const sig = crypto
    .createHmac('sha256', getDomainSigningSecret('hd-corr-thread-cookie'))
    .update(encoded)
    .digest('base64url');
  return `hdct1.${encoded}.${sig}`;
}

export function verifyThreadAccessToken(
  token: string | undefined | null,
  expectedRef: string
): boolean {
  if (!token || !token.startsWith('hdct1.')) return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  const [, encoded, sig] = parts;
  const expectedSig = crypto
    .createHmac('sha256', getDomainSigningSecret('hd-corr-thread-cookie'))
    .update(encoded)
    .digest('base64url');
  const a = Buffer.from(sig);
  const b = Buffer.from(expectedSig);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;
  try {
    const parsed = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8'));
    if (parsed.v !== 1 || !parsed.exp || parsed.exp < Math.floor(Date.now() / 1000)) {
      return false;
    }
    return String(parsed.ref).toUpperCase() === expectedRef.trim().toUpperCase();
  } catch {
    return false;
  }
}

// ─── ATTACHMENT VALIDATION & MALWARE / MAGIC-BYTE SCREENING ──────────────────

const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024; // 5 MB
const MAX_ATTACHMENTS_PER_MESSAGE = 3;

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
  'text/plain',
  'text/csv',
  'application/json',
]);

const EICAR_SIGNATURE = 'X5O!P%@AP[4\\PZX54(P^)7CC)7}$EICAR-STANDARD-ANTIVIRUS-TEST-FILE!$H+H*';

export interface ValidatedAttachmentInput {
  filename: string;
  mimeType: string;
  sizeBytes: number;
  buffer: Buffer;
  sha256: string;
}

export function validateAndScanAttachment(input: {
  filename: string;
  mimeType: string;
  buffer: Buffer;
}): { ok: true; sanitized: ValidatedAttachmentInput } | { ok: false; error: string } {
  const rawName = String(input.filename || 'document').replace(/[\0\/\\]+/g, '_');
  const sanitizedName = rawName.replace(/[^a-zA-Z0-9._ -]/g, '_').slice(0, 120) || 'attachment';

  if (/\.(exe|bat|cmd|ps1|sh|php|js|mjs|cjs|vbs|scr|dll|msi|jar|html|htm|svg)$/i.test(sanitizedName)) {
    return {
      ok: false,
      error: `Attachment "${sanitizedName}" uses a disallowed executable or active-script file extension.`,
    };
  }

  const buf = input.buffer;
  if (!buf || buf.length === 0) {
    return { ok: false, error: `Attachment "${sanitizedName}" is empty.` };
  }
  if (buf.length > MAX_ATTACHMENT_BYTES) {
    return {
      ok: false,
      error: `Attachment "${sanitizedName}" exceeds the 5 MB security limit.`,
    };
  }

  const mime = String(input.mimeType || '').toLowerCase().trim();
  if (!ALLOWED_MIME_TYPES.has(mime)) {
    return {
      ok: false,
      error: `Unsupported file type "${mime || 'unknown'}". Permitted formats: PDF, JPEG, PNG, WEBP, TXT, CSV, JSON.`,
    };
  }

  // Binary executable & malware signature screening
  const headAscii = buf.subarray(0, Math.min(buf.length, 4096)).toString('latin1');
  if (headAscii.includes(EICAR_SIGNATURE)) {
    return { ok: false, error: 'Attachment blocked by malware signature scanner.' };
  }
  if (
    (buf[0] === 0x4d && buf[1] === 0x5a) || // MZ (Windows PE)
    (buf[0] === 0x7f && buf[1] === 0x45 && buf[2] === 0x4c && buf[3] === 0x46) // ELF
  ) {
    return { ok: false, error: 'Executable binary content detected and blocked.' };
  }

  // Magic-byte verification against declared MIME type
  if (mime === 'application/pdf' && !headAscii.startsWith('%PDF-')) {
    return { ok: false, error: `File "${sanitizedName}" failed PDF header verification.` };
  }
  if (mime === 'image/jpeg' && !(buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff)) {
    return { ok: false, error: `File "${sanitizedName}" failed JPEG magic-byte verification.` };
  }
  if (
    mime === 'image/png' &&
    !(buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47)
  ) {
    return { ok: false, error: `File "${sanitizedName}" failed PNG magic-byte verification.` };
  }
  if (
    mime === 'image/webp' &&
    !(headAscii.startsWith('RIFF') && headAscii.slice(8, 12) === 'WEBP')
  ) {
    return { ok: false, error: `File "${sanitizedName}" failed WEBP header verification.` };
  }
  if (mime === 'text/plain' || mime === 'text/csv' || mime === 'application/json') {
    if (/<script\b|<\?php|^#!/i.test(headAscii)) {
      return { ok: false, error: `Active script content blocked inside "${sanitizedName}".` };
    }
  }

  const sha256 = crypto.createHash('sha256').update(buf).digest('hex');
  return {
    ok: true,
    sanitized: {
      filename: sanitizedName,
      mimeType: mime,
      sizeBytes: buf.length,
      buffer: buf,
      sha256,
    },
  };
}

// ─── POSTGRESQL SCHEMA & RESILIENT PERSISTENCE ───────────────────────────────

const globalForCorrespondence = globalThis as unknown as {
  __hdCorrSchemaReady?: boolean;
  __hdCorrSchemaPromise?: Promise<boolean> | null;
};

export async function ensureCorrespondenceSchema(): Promise<boolean> {
  if (globalForCorrespondence.__hdCorrSchemaReady) return true;
  if (globalForCorrespondence.__hdCorrSchemaPromise) {
    return globalForCorrespondence.__hdCorrSchemaPromise;
  }

  const run = async (): Promise<boolean> => {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS hd_editorial_correspondence (
          id TEXT PRIMARY KEY,
          reference_number TEXT UNIQUE NOT NULL,
          access_credential_hash TEXT NOT NULL,
          category TEXT NOT NULL,
          category_label TEXT NOT NULL,
          receiving_department TEXT NOT NULL,
          desk_code TEXT NOT NULL,
          region TEXT NOT NULL,
          assigned_bureau TEXT,
          assigned_department TEXT NOT NULL,
          assigned_editor_slug TEXT,
          sender_name_enc TEXT NOT NULL,
          sender_email_enc TEXT NOT NULL,
          sender_email_blind_hash TEXT NOT NULL,
          affiliation TEXT,
          related_article_url TEXT,
          subject TEXT NOT NULL,
          priority TEXT NOT NULL DEFAULT 'standard',
          status TEXT NOT NULL DEFAULT 'unread',
          is_read BOOLEAN NOT NULL DEFAULT FALSE,
          is_confidential BOOLEAN NOT NULL DEFAULT FALSE,
          privacy_consent_accepted BOOLEAN NOT NULL DEFAULT TRUE,
          internal_notes_enc TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          last_message_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          responded_at TIMESTAMPTZ,
          resolved_at TIMESTAMPTZ,
          archived_at TIMESTAMPTZ
        );

        CREATE INDEX IF NOT EXISTS idx_hd_corr_status_desk
          ON hd_editorial_correspondence (status, desk_code, is_confidential);
        CREATE INDEX IF NOT EXISTS idx_hd_corr_updated
          ON hd_editorial_correspondence (updated_at DESC);

        CREATE TABLE IF NOT EXISTS hd_correspondence_messages (
          id TEXT PRIMARY KEY,
          correspondence_id TEXT NOT NULL REFERENCES hd_editorial_correspondence(id) ON DELETE CASCADE,
          sender_type TEXT NOT NULL,
          sender_label TEXT NOT NULL,
          message_kind TEXT NOT NULL,
          body_enc TEXT NOT NULL,
          attachments_json JSONB NOT NULL DEFAULT '[]'::jsonb,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_hd_corr_msg_thread
          ON hd_correspondence_messages (correspondence_id, created_at ASC);

        CREATE TABLE IF NOT EXISTS hd_correspondence_attachments (
          id TEXT PRIMARY KEY,
          correspondence_id TEXT NOT NULL REFERENCES hd_editorial_correspondence(id) ON DELETE CASCADE,
          message_id TEXT NOT NULL,
          filename TEXT NOT NULL,
          mime_type TEXT NOT NULL,
          size_bytes INT NOT NULL,
          sha256 TEXT NOT NULL,
          payload_enc TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS kew_operations_consent_ledger (
          tracking_id TEXT PRIMARY KEY,
          source_page TEXT NOT NULL,
          source_label TEXT NOT NULL,
          title TEXT NOT NULL,
          category TEXT NOT NULL,
          district TEXT NOT NULL,
          originating_platform TEXT NOT NULL DEFAULT 'kashmir_ecowatch',
          editorial_consideration_consent BOOLEAN NOT NULL DEFAULT FALSE,
          is_anonymous BOOLEAN NOT NULL DEFAULT FALSE,
          owner_name_enc TEXT,
          owner_email_enc TEXT,
          summary_text TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS hd_kew_evidence_exchange (
          id TEXT PRIMARY KEY,
          kew_tracking_id TEXT NOT NULL,
          kew_source_page TEXT NOT NULL,
          submission_title TEXT NOT NULL,
          district TEXT NOT NULL,
          contributor_consent_verified BOOLEAN NOT NULL DEFAULT FALSE,
          requested_by_slug TEXT NOT NULL,
          requested_by_name TEXT NOT NULL,
          request_purpose TEXT NOT NULL,
          approval_status TEXT NOT NULL DEFAULT 'pending_approval',
          approved_by_slug TEXT,
          approved_by_name TEXT,
          editorial_notes TEXT,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS hd_correspondence_audit_logs (
          id TEXT PRIMARY KEY,
          actor_slug TEXT NOT NULL,
          actor_name TEXT NOT NULL,
          actor_role_summary TEXT NOT NULL,
          action TEXT NOT NULL,
          target_reference TEXT,
          details TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        );

        CREATE INDEX IF NOT EXISTS idx_hd_corr_audit_created
          ON hd_correspondence_audit_logs (created_at DESC);
      `);
      globalForCorrespondence.__hdCorrSchemaReady = true;
      return true;
    } catch (err) {
      console.error('[HD Correspondence] Schema initialization error:', err);
      return false;
    } finally {
      globalForCorrespondence.__hdCorrSchemaPromise = null;
    }
  };

  globalForCorrespondence.__hdCorrSchemaPromise = run();
  return globalForCorrespondence.__hdCorrSchemaPromise;
}

export async function recordCorrespondenceAudit(entry: {
  actorSlug: string;
  actorName: string;
  actorRoleSummary: string;
  action: string;
  targetReference?: string;
  details: string;
}): Promise<void> {
  try {
    await ensureCorrespondenceSchema();
    const id = `hdca_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
    await pool.query(
      `INSERT INTO hd_correspondence_audit_logs (
        id, actor_slug, actor_name, actor_role_summary, action, target_reference, details
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        id,
        entry.actorSlug,
        entry.actorName,
        entry.actorRoleSummary,
        entry.action,
        entry.targetReference || null,
        entry.details,
      ]
    );
  } catch {
    // Non-fatal if DB unavailable
  }
}

// ─── SEGREGATED EDITORIAL RBAC (PHASE 06 & PHASE 08) ─────────────────────────
// Explicitly separates Himalayan Dispatch editorial credentials from general
// KEW platform administration so general KEW admins are NEVER automatically
// granted access to confidential Himalayan Dispatch correspondence.

export interface EditorialCorrespondenceActor {
  authenticated: boolean;
  slug: string;
  name: string;
  roleSummary: string;
  authChannel: 'hdn_editorial_session' | 'hd_journalist_session' | 'kew_general_admin' | 'none';
  canAccessCorrespondenceCenter: boolean;
  canViewConfidentialSourceDesk: boolean;
  canApproveKewEvidenceExchange: boolean;
  assignedBureaus: string[]; // empty means all bureaus
  allowedDeskCodes: string[]; // empty means all non-confidential desks
}

export async function resolveEditorialCorrespondenceActor(
  request: NextRequest
): Promise<EditorialCorrespondenceActor> {
  const hdnStore = readHdnStore();
  const accounts = hdnStore.accounts || [];

  // 1. Dedicated Himalayan Dispatch Newsroom (HDN) Session Cookie
  const hdnCookie = request.cookies.get(HDN_SESSION_COOKIE)?.value;
  const hdnClaims = verifyHdnSessionToken(hdnCookie);
  if (hdnClaims) {
    const acc = accounts.find(
      (a) => (a.id === hdnClaims.accountId || a.slug === hdnClaims.slug) && a.status === 'active'
    );
    if (acc) {
      const perms = computeEffectivePermissions(acc.roles);
      const isLeadership = acc.roles.some((r) =>
        ['founding_eic', 'executive_editor', 'managing_editor'].includes(r)
      );
      const isPublicEditor = acc.roles.includes('public_editor');
      const isLegal = acc.roles.includes('legal_reviewer');
      const isSciReviewer = acc.roles.includes('scientific_reviewer');
      const isCommissioning = acc.roles.includes('commissioning_editor');
      const isBureauChief = acc.roles.includes('bureau_chief');

      const canAccess =
        isLeadership ||
        isPublicEditor ||
        isLegal ||
        isSciReviewer ||
        isCommissioning ||
        isBureauChief ||
        perms.has('workspace:editorial') ||
        perms.has('workspace:admin');

      const canViewConfidential =
        isLeadership || isLegal || perms.has('sources:view_confidential_vault');

      let allowedDeskCodes: string[] = [];
      if (!isLeadership && !perms.has('workspace:admin')) {
        if (isPublicEditor) {
          allowedDeskCodes = ['reader_complaints', 'corrections_clarifications'];
        } else if (isSciReviewer && !perms.has('workspace:editorial')) {
          allowedDeskCodes = ['scientific_review'];
        } else if (isCommissioning) {
          allowedDeskCodes = ['commissioning_pitch', 'editorial_directorate'];
        } else if (isBureauChief) {
          allowedDeskCodes = ['regional_bureau', 'editorial_directorate', 'commissioning_pitch'];
        }
      }

      return {
        authenticated: true,
        slug: acc.slug,
        name: acc.fullName,
        roleSummary: acc.primaryRoleTitle,
        authChannel: 'hdn_editorial_session',
        canAccessCorrespondenceCenter: canAccess,
        canViewConfidentialSourceDesk: canViewConfidential,
        canApproveKewEvidenceExchange: isLeadership || perms.has('workspace:editorial'),
        assignedBureaus:
          isLeadership || !isBureauChief ? [] : acc.assignedBureaus || [],
        allowedDeskCodes,
      };
    }
  }

  // 2. Legacy Journalist / Editor Session Cookie
  const jCookie = request.cookies.get(JOURNALIST_SESSION_COOKIE)?.value;
  const jClaims = verifyJournalistSessionToken(jCookie);
  if (jClaims) {
    const acc = accounts.find(
      (a) =>
        (a.slug === jClaims.journalistSlug ||
          a.email.toLowerCase() === jClaims.email.toLowerCase()) &&
        a.status === 'active'
    );
    if (acc && acc.roles.some((r) => ['founding_eic', 'executive_editor', 'managing_editor', 'bureau_chief', 'department_editor', 'commissioning_editor', 'public_editor'].includes(r))) {
      const isLeadership = acc.roles.some((r) =>
        ['founding_eic', 'executive_editor', 'managing_editor'].includes(r)
      );
      return {
        authenticated: true,
        slug: acc.slug,
        name: acc.fullName,
        roleSummary: acc.primaryRoleTitle,
        authChannel: 'hd_journalist_session',
        canAccessCorrespondenceCenter: true,
        canViewConfidentialSourceDesk: isLeadership,
        canApproveKewEvidenceExchange: isLeadership,
        assignedBureaus: isLeadership ? [] : acc.assignedBureaus || [],
        allowedDeskCodes: [],
      };
    }
  }

  // 3. General KEW Platform Admin Session (`kew_admin_session`)
  // Strictly segregated: permitted to coordinate institutional/KEW evidence exchange
  // and non-confidential administrative correspondence ONLY; NEVER automatically
  // granted access to confidential Himalayan Dispatch correspondence!
  const kewAdmin = await verifyAdminRequest(request);
  if (kewAdmin.authorized) {
    return {
      authenticated: true,
      slug: kewAdmin.actor || 'kew-platform-admin',
      name: 'KEW Institutional Administrator (Segregated Scope)',
      roleSummary: 'KEW Platform Admin · Non-Confidential Scope Only',
      authChannel: 'kew_general_admin',
      canAccessCorrespondenceCenter: true,
      canViewConfidentialSourceDesk: false, // STRICT PHASE 06 SEGREGATION RULE
      canApproveKewEvidenceExchange: true,
      assignedBureaus: [],
      allowedDeskCodes: [
        'editorial_directorate',
        'institutional_correspondence',
        'scientific_review',
        'corrections_clarifications',
      ],
    };
  }

  return {
    authenticated: false,
    slug: 'anonymous',
    name: 'Unauthenticated Visitor',
    roleSummary: 'None',
    authChannel: 'none',
    canAccessCorrespondenceCenter: false,
    canViewConfidentialSourceDesk: false,
    canApproveKewEvidenceExchange: false,
    assignedBureaus: [],
    allowedDeskCodes: [],
  };
}

// ─── SUBMISSION, THREAD ACCESS & ADMIN OPERATIONS ────────────────────────────

export interface CreateCorrespondenceInput {
  category: CorrespondenceCategoryId;
  region: CorrespondenceRegion;
  senderName?: string;
  senderEmail?: string;
  affiliation?: string;
  relatedArticleUrl?: string;
  subject: string;
  message: string;
  privacyConsentAccepted: boolean;
  containsTier3HighRiskMaterial?: boolean;
  attachments?: ValidatedAttachmentInput[];
}

function mapRegionToBureauSlug(region: string): string | null {
  switch (region) {
    case 'Kashmir':
      return 'kashmir';
    case 'Jammu':
      return 'jammu';
    case 'Ladakh':
      return 'ladakh';
    case 'Azad Jammu & Kashmir':
      return 'ajk';
    case 'Gilgit':
      return 'gilgit';
    case 'Baltistan':
      return 'baltistan';
    default:
      return null;
  }
}

export async function createEditorialCorrespondence(
  input: CreateCorrespondenceInput
): Promise<
  | {
      ok: true;
      referenceNumber: string;
      accessCredential: string;
      receivingDepartment: string;
      categoryLabel: string;
      createdAt: string;
    }
  | { ok: false; status: number; error: string }
> {
  // Phase 08 Security Rule: Block raw Tier III high-risk whistleblower material on web forms
  if (input.containsTier3HighRiskMaterial) {
    return {
      ok: false,
      status: 400,
      error:
        'Highly sensitive source submissions via standard web forms are disabled pending dedicated out-of-band source-protection security review. Do not upload raw Tier III whistleblower documents here; consult our Source Protection & Verification Standards.',
    };
  }

  const catSpec =
    CORRESPONDENCE_CATEGORIES.find((c) => c.id === input.category) ||
    CORRESPONDENCE_CATEGORIES[0];

  if (
    catSpec.id === 'confidential_communication' &&
    input.attachments &&
    input.attachments.length > 0
  ) {
    return {
      ok: false,
      status: 400,
      error:
        'File attachments are disabled on Restricted Confidential web requests to protect source safety. Use this channel only to request an out-of-band encrypted handoff without uploading sensitive files.',
    };
  }

  if (!input.privacyConsentAccepted) {
    return {
      ok: false,
      status: 400,
      error: 'Please confirm the Editorial Correspondence privacy and handling notice before transmitting.',
    };
  }

  const subject = String(input.subject || '').trim();
  const message = String(input.message || '').trim();
  if (subject.length < 4 || subject.length > 240) {
    return {
      ok: false,
      status: 400,
      error: 'Please enter a clear subject line between 4 and 240 characters.',
    };
  }
  if (message.length < 20 || message.length > 20000) {
    return {
      ok: false,
      status: 400,
      error: 'Please provide a substantive message between 20 and 20,000 characters.',
    };
  }

  const senderEmailClean = String(input.senderEmail || '').trim().toLowerCase();
  if (catSpec.id !== 'confidential_communication') {
    if (!senderEmailClean || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmailClean)) {
      return {
        ok: false,
        status: 400,
        error: 'Please provide a valid contact email address (or use your private access credential on Confidential requests).',
      };
    }
  } else if (senderEmailClean && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmailClean)) {
    return {
      ok: false,
      status: 400,
      error: 'If providing an optional contact email, please ensure it is valid.',
    };
  }

  if ((input.attachments || []).length > MAX_ATTACHMENTS_PER_MESSAGE) {
    return {
      ok: false,
      status: 400,
      error: `A maximum of ${MAX_ATTACHMENTS_PER_MESSAGE} supporting attachments may be included per message.`,
    };
  }

  const ready = await ensureCorrespondenceSchema();
  if (!ready) {
    return {
      ok: false,
      status: 503,
      error: 'Editorial correspondence database is temporarily unavailable. Please retry shortly.',
    };
  }

  const id = `hdc_${Date.now()}_${crypto.randomBytes(6).toString('hex')}`;
  const referenceNumber = generateCorrespondenceReference();
  const accessCredential = generatePrivateAccessCredential();
  const accessCredentialHash = hashAccessCredential(accessCredential);

  const bureauSlug = mapRegionToBureauSlug(input.region);
  const receivingDept =
    catSpec.id === 'regional_correspondence' && bureauSlug
      ? `${input.region} Bureau Desk`
      : catSpec.receivingDepartment;

  const isConfidential = catSpec.isConfidentialDefault;
  const priority: CorrespondencePriority =
    catSpec.id === 'confidential_communication' || catSpec.id === 'correction_request'
      ? 'high'
      : 'standard';

  const senderNameVal = String(input.senderName || '').trim() || 'Correspondent (Identity Withheld)';
  const emailBlindHash = senderEmailClean
    ? crypto
        .createHmac('sha256', getDomainSigningSecret('hd-corr-email-blind'))
        .update(senderEmailClean)
        .digest('hex')
    : 'none';

  const msgId = `hdcm_${Date.now()}_${crypto.randomBytes(5).toString('hex')}`;
  const attachmentMeta: AttachmentMetadataItem[] = [];

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const insRes = await client.query(
      `INSERT INTO hd_editorial_correspondence (
        id, reference_number, access_credential_hash, category, category_label,
        receiving_department, desk_code, region, assigned_bureau, assigned_department,
        sender_name_enc, sender_email_enc, sender_email_blind_hash, affiliation,
        related_article_url, subject, priority, status, is_read, is_confidential,
        privacy_consent_accepted
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14,
        $15, $16, $17, 'unread', FALSE, $18,
        $19
      ) RETURNING created_at`,
      [
        id,
        referenceNumber,
        accessCredentialHash,
        catSpec.id,
        catSpec.label,
        receivingDept,
        catSpec.deskCode,
        input.region || 'Multi-Regional / Transboundary',
        bureauSlug,
        receivingDept,
        encryptAtRest(senderNameVal),
        encryptAtRest(senderEmailClean),
        emailBlindHash,
        input.affiliation ? String(input.affiliation).trim().slice(0, 200) : null,
        input.relatedArticleUrl ? String(input.relatedArticleUrl).trim().slice(0, 300) : null,
        subject,
        priority,
        isConfidential,
        Boolean(input.privacyConsentAccepted),
      ]
    );

    for (const att of input.attachments || []) {
      const attId = `hdca_file_${Date.now()}_${crypto.randomBytes(5).toString('hex')}`;
      attachmentMeta.push({
        id: attId,
        filename: att.filename,
        mimeType: att.mimeType,
        sizeBytes: att.sizeBytes,
        sha256: att.sha256,
      });
      await client.query(
        `INSERT INTO hd_correspondence_attachments (
          id, correspondence_id, message_id, filename, mime_type, size_bytes, sha256, payload_enc
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          attId,
          id,
          msgId,
          att.filename,
          att.mimeType,
          att.sizeBytes,
          att.sha256,
          encryptBufferAtRest(att.buffer),
        ]
      );
    }

    await client.query(
      `INSERT INTO hd_correspondence_messages (
        id, correspondence_id, sender_type, sender_label, message_kind, body_enc, attachments_json
      ) VALUES ($1, $2, 'correspondent', $3, 'initial_submission', $4, $5::jsonb)`,
      [
        msgId,
        id,
        senderNameVal,
        encryptAtRest(message),
        JSON.stringify(attachmentMeta),
      ]
    );

    await client.query('COMMIT');

    await recordCorrespondenceAudit({
      actorSlug: 'public-correspondent',
      actorName: 'External Correspondent',
      actorRoleSummary: 'Public Intake Gateway',
      action: 'correspondence:submitted',
      targetReference: referenceNumber,
      details: `Category "${catSpec.label}" routed to ${receivingDept} (${attachmentMeta.length} attachment(s); content encrypted at rest).`,
    });

    return {
      ok: true,
      referenceNumber,
      accessCredential,
      receivingDepartment: receivingDept,
      categoryLabel: catSpec.label,
      createdAt: new Date(insRes.rows[0].created_at).toISOString(),
    };
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('[HD Correspondence] Insert error:', err);
    return {
      ok: false,
      status: 500,
      error: 'Unable to record correspondence at this time.',
    };
  } finally {
    client.release();
  }
}

export async function authenticateCorrespondenceThread(
  referenceNumber: string,
  accessCredential: string
): Promise<
  | { ok: true; referenceNumber: string }
  | { ok: false; status: number; error: string }
> {
  const refClean = String(referenceNumber || '').trim().toUpperCase();
  const credClean = String(accessCredential || '').trim();
  if (!refClean || !credClean) {
    return {
      ok: false,
      status: 400,
      error: 'Both your correspondence reference number and private access credential are required.',
    };
  }

  await ensureCorrespondenceSchema();
  const res = await pool.query(
    `SELECT reference_number, access_credential_hash
     FROM hd_editorial_correspondence
     WHERE reference_number = $1
     LIMIT 1`,
    [refClean]
  );

  // Generic failure message prevents reference-number enumeration
  if (!res.rows[0] || !verifyAccessCredential(credClean, res.rows[0].access_credential_hash)) {
    await recordCorrespondenceAudit({
      actorSlug: 'correspondent-auth',
      actorName: 'Thread Verification Gate',
      actorRoleSummary: 'Public Tracking',
      action: 'correspondence:thread_auth_failed',
      targetReference: refClean.slice(0, 18),
      details: 'Invalid correspondence reference or access credential rejected.',
    });
    return {
      ok: false,
      status: 401,
      error:
        'Invalid correspondence reference number or access credential. Correspondence is private; a reference number alone cannot authorize access.',
    };
  }

  await recordCorrespondenceAudit({
    actorSlug: 'correspondent-verified',
    actorName: 'Verified Correspondent',
    actorRoleSummary: 'Private Thread Session',
    action: 'correspondence:thread_auth_succeeded',
    targetReference: refClean,
    details: 'Correspondent authenticated private thread access with cryptographic credential.',
  });

  return { ok: true, referenceNumber: res.rows[0].reference_number };
}

export async function getPrivateThreadForCorrespondent(
  referenceNumber: string
): Promise<PublicCorrespondenceThreadView | null> {
  await ensureCorrespondenceSchema();
  const refClean = referenceNumber.trim().toUpperCase();
  const cRes = await pool.query(
    `SELECT * FROM hd_editorial_correspondence WHERE reference_number = $1 LIMIT 1`,
    [refClean]
  );
  const row = cRes.rows[0];
  if (!row) return null;

  const mRes = await pool.query(
    `SELECT * FROM hd_correspondence_messages
     WHERE correspondence_id = $1
     ORDER BY created_at ASC`,
    [row.id]
  );

  return {
    referenceNumber: row.reference_number,
    category: row.category,
    categoryLabel: row.category_label,
    receivingDepartment: row.receiving_department,
    assignedDepartment: row.assigned_department,
    assignedBureau: row.assigned_bureau,
    region: row.region,
    subject: row.subject,
    status: row.status as CorrespondenceStatus,
    priority: row.priority as CorrespondencePriority,
    isConfidential: Boolean(row.is_confidential),
    createdAt: new Date(row.created_at).toISOString(),
    updatedAt: new Date(row.updated_at).toISOString(),
    respondedAt: row.responded_at ? new Date(row.responded_at).toISOString() : null,
    resolvedAt: row.resolved_at ? new Date(row.resolved_at).toISOString() : null,
    messages: mRes.rows.map((m: any) => ({
      id: m.id,
      senderType: m.sender_type,
      senderLabel: m.sender_label,
      messageKind: m.message_kind,
      body: decryptAtRest(m.body_enc),
      attachments: Array.isArray(m.attachments_json) ? m.attachments_json : [],
      createdAt: new Date(m.created_at).toISOString(),
    })),
  };
}

export async function appendCorrespondentReply(input: {
  referenceNumber: string;
  body: string;
  attachments?: ValidatedAttachmentInput[];
}): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const bodyClean = String(input.body || '').trim();
  if (bodyClean.length < 5 || bodyClean.length > 20000) {
    return {
      ok: false,
      status: 400,
      error: 'Please enter a reply message between 5 and 20,000 characters.',
    };
  }
  if ((input.attachments || []).length > MAX_ATTACHMENTS_PER_MESSAGE) {
    return {
      ok: false,
      status: 400,
      error: `Maximum ${MAX_ATTACHMENTS_PER_MESSAGE} attachments allowed per reply.`,
    };
  }

  await ensureCorrespondenceSchema();
  const refClean = input.referenceNumber.trim().toUpperCase();
  const cRes = await pool.query(
    `SELECT id, sender_name_enc, is_confidential, status
     FROM hd_editorial_correspondence
     WHERE reference_number = $1
     LIMIT 1`,
    [refClean]
  );
  const row = cRes.rows[0];
  if (!row) {
    return { ok: false, status: 404, error: 'Correspondence record not found.' };
  }
  if (row.is_confidential && input.attachments && input.attachments.length > 0) {
    return {
      ok: false,
      status: 400,
      error:
        'File uploads remain disabled on Restricted Confidential web threads. Coordinate an out-of-band transfer with the Source Protection Desk.',
    };
  }

  const msgId = `hdcm_${Date.now()}_${crypto.randomBytes(5).toString('hex')}`;
  const senderName = decryptAtRest(row.sender_name_enc) || 'Correspondent';
  const attachmentMeta: AttachmentMetadataItem[] = [];

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const att of input.attachments || []) {
      const attId = `hdca_file_${Date.now()}_${crypto.randomBytes(5).toString('hex')}`;
      attachmentMeta.push({
        id: attId,
        filename: att.filename,
        mimeType: att.mimeType,
        sizeBytes: att.sizeBytes,
        sha256: att.sha256,
      });
      await client.query(
        `INSERT INTO hd_correspondence_attachments (
          id, correspondence_id, message_id, filename, mime_type, size_bytes, sha256, payload_enc
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          attId,
          row.id,
          msgId,
          att.filename,
          att.mimeType,
          att.sizeBytes,
          att.sha256,
          encryptBufferAtRest(att.buffer),
        ]
      );
    }

    await client.query(
      `INSERT INTO hd_correspondence_messages (
        id, correspondence_id, sender_type, sender_label, message_kind, body_enc, attachments_json
      ) VALUES ($1, $2, 'correspondent', $3, 'correspondent_reply', $4, $5::jsonb)`,
      [msgId, row.id, senderName, encryptAtRest(bodyClean), JSON.stringify(attachmentMeta)]
    );

    const nextStatus =
      row.status === 'awaiting_response' || row.status === 'resolved' || row.status === 'archived'
        ? 'under_review'
        : row.status;

    await client.query(
      `UPDATE hd_editorial_correspondence
       SET is_read = FALSE,
           status = $2,
           updated_at = NOW(),
           last_message_at = NOW()
       WHERE id = $1`,
      [row.id, nextStatus]
    );

    await client.query('COMMIT');

    await recordCorrespondenceAudit({
      actorSlug: 'correspondent-verified',
      actorName: 'Verified Correspondent',
      actorRoleSummary: 'Private Thread Reply',
      action: 'correspondence:correspondent_replied',
      targetReference: refClean,
      details: `Correspondent posted follow-up message (${attachmentMeta.length} attachment(s)).`,
    });

    return { ok: true };
  } catch {
    await client.query('ROLLBACK').catch(() => {});
    return { ok: false, status: 500, error: 'Unable to save reply.' };
  } finally {
    client.release();
  }
}

// ─── KEW CONSENT LEDGER & AUTHORIZED EVIDENCE EXCHANGE (PHASE 05 & 09) ───────

export async function recordKewSubmissionConsentLedger(input: {
  trackingId: string;
  sourcePage: string;
  sourceLabel: string;
  title: string;
  category: string;
  district: string;
  originatingPlatform?: 'kashmir_ecowatch' | 'himalayan_dispatch';
  editorialConsiderationConsent?: boolean;
  isAnonymous?: boolean;
  ownerName?: string;
  ownerEmail?: string;
  summaryText: string;
}): Promise<void> {
  try {
    await ensureCorrespondenceSchema();
    await pool.query(
      `INSERT INTO kew_operations_consent_ledger (
        tracking_id, source_page, source_label, title, category, district,
        originating_platform, editorial_consideration_consent, is_anonymous,
        owner_name_enc, owner_email_enc, summary_text
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      ON CONFLICT (tracking_id) DO UPDATE SET
        editorial_consideration_consent = EXCLUDED.editorial_consideration_consent,
        originating_platform = EXCLUDED.originating_platform`,
      [
        input.trackingId,
        input.sourcePage,
        input.sourceLabel,
        input.title,
        input.category,
        input.district || 'Western Himalayas',
        input.originatingPlatform === 'himalayan_dispatch'
          ? 'himalayan_dispatch'
          : 'kashmir_ecowatch',
        Boolean(input.editorialConsiderationConsent),
        Boolean(input.isAnonymous),
        input.isAnonymous ? null : encryptAtRest(input.ownerName || ''),
        input.isAnonymous ? null : encryptAtRest(input.ownerEmail || ''),
        String(input.summaryText || '').slice(0, 4000),
      ]
    );
  } catch {
    // Non-blocking on KEW intake
  }
}

export function canActorViewRecord(
  actor: EditorialCorrespondenceActor,
  row: any
): boolean {
  if (!actor.canAccessCorrespondenceCenter) return false;
  if (row.is_confidential && !actor.canViewConfidentialSourceDesk) {
    return false;
  }
  if (
    actor.allowedDeskCodes.length > 0 &&
    !actor.allowedDeskCodes.includes(row.desk_code)
  ) {
    return false;
  }
  if (
    actor.assignedBureaus.length > 0 &&
    row.assigned_bureau &&
    !actor.assignedBureaus.includes(row.assigned_bureau)
  ) {
    return false;
  }
  return true;
}

export async function getAdminCorrespondenceBundle(actor: EditorialCorrespondenceActor) {
  await ensureCorrespondenceSchema();

  const cRes = await pool.query(
    `SELECT * FROM hd_editorial_correspondence ORDER BY last_message_at DESC LIMIT 500`
  );
  const authorizedRows = cRes.rows.filter((r: any) => canActorViewRecord(actor, r));
  const ids = authorizedRows.map((r: any) => r.id);

  let messagesByCorrId = new Map<string, any[]>();
  if (ids.length > 0) {
    const mRes = await pool.query(
      `SELECT * FROM hd_correspondence_messages
       WHERE correspondence_id = ANY($1::text[])
       ORDER BY created_at ASC`,
      [ids]
    );
    for (const m of mRes.rows) {
      const list = messagesByCorrId.get(m.correspondence_id) || [];
      list.push({
        id: m.id,
        senderType: m.sender_type,
        senderLabel: m.sender_label,
        messageKind: m.message_kind,
        body: decryptAtRest(m.body_enc),
        attachments: Array.isArray(m.attachments_json) ? m.attachments_json : [],
        createdAt: new Date(m.created_at).toISOString(),
      });
      messagesByCorrId.set(m.correspondence_id, list);
    }
  }

  const records = authorizedRows.map((r: any) => ({
    id: r.id,
    referenceNumber: r.reference_number,
    category: r.category,
    categoryLabel: r.category_label,
    receivingDepartment: r.receiving_department,
    deskCode: r.desk_code,
    region: r.region,
    assignedBureau: r.assigned_bureau,
    assignedDepartment: r.assigned_department,
    assignedEditorSlug: r.assigned_editor_slug,
    senderName: decryptAtRest(r.sender_name_enc),
    senderEmail: decryptAtRest(r.sender_email_enc),
    affiliation: r.affiliation,
    relatedArticleUrl: r.related_article_url,
    subject: r.subject,
    priority: r.priority as CorrespondencePriority,
    status: r.status as CorrespondenceStatus,
    isRead: Boolean(r.is_read),
    isConfidential: Boolean(r.is_confidential),
    internalNotes: decryptAtRest(r.internal_notes_enc),
    createdAt: new Date(r.created_at).toISOString(),
    updatedAt: new Date(r.updated_at).toISOString(),
    lastMessageAt: new Date(r.last_message_at).toISOString(),
    respondedAt: r.responded_at ? new Date(r.responded_at).toISOString() : null,
    resolvedAt: r.resolved_at ? new Date(r.resolved_at).toISOString() : null,
    archivedAt: r.archived_at ? new Date(r.archived_at).toISOString() : null,
    messages: messagesByCorrId.get(r.id) || [],
  }));

  // Dynamic counters calculated strictly from actual authorized records (zero fabricated stats)
  const activeNonArchived = records.filter((r) => r.status !== 'archived');
  const counters = {
    totalReceived: records.length,
    unread: activeNonArchived.filter((r) => !r.isRead || r.status === 'unread').length,
    underReview: records.filter((r) => r.status === 'under_review').length,
    assigned: records.filter((r) => r.status === 'assigned').length,
    awaitingResponse: records.filter((r) => r.status === 'awaiting_response').length,
    responded: records.filter((r) => r.status === 'responded').length,
    resolved: records.filter((r) => r.status === 'resolved').length,
    confidential: records.filter((r) => r.isConfidential).length,
    archived: records.filter((r) => r.status === 'archived').length,
  };

  // Consent-eligible KEW submissions & Authorized Evidence Exchange records (Phase 09)
  const kewLedgerRes = await pool.query(
    `SELECT * FROM kew_operations_consent_ledger ORDER BY created_at DESC LIMIT 200`
  );
  const exchangeRes = await pool.query(
    `SELECT * FROM hd_kew_evidence_exchange ORDER BY updated_at DESC LIMIT 200`
  );

  // Only expose KEW submissions where editorial_consideration_consent === true (never expose unconsented PII!)
  const consentedKewSubmissions = kewLedgerRes.rows
    .filter((k: any) => Boolean(k.editorial_consideration_consent))
    .map((k: any) => ({
      trackingId: k.tracking_id,
      sourcePage: k.source_page,
      sourceLabel: k.source_label,
      title: k.title,
      category: k.category,
      district: k.district,
      originatingPlatform: k.originating_platform,
      editorialConsiderationConsent: true,
      isAnonymous: Boolean(k.is_anonymous),
      // Phase 09: Never expose confidential/anonymous contributor identity automatically
      contributorLabel: k.is_anonymous
        ? 'Identity Protected (Anonymous KEW Submission)'
        : decryptAtRest(k.owner_name_enc) || 'KEW Contributor',
      summaryText: k.summary_text,
      createdAt: new Date(k.created_at).toISOString(),
    }));

  const evidenceExchangeRequests = exchangeRes.rows.map((ex: any) => ({
    id: ex.id,
    kewTrackingId: ex.kew_tracking_id,
    kewSourcePage: ex.kew_source_page,
    submissionTitle: ex.submission_title,
    district: ex.district,
    contributorConsentVerified: Boolean(ex.contributor_consent_verified),
    requestedBySlug: ex.requested_by_slug,
    requestedByName: ex.requested_by_name,
    requestPurpose: ex.request_purpose,
    approvalStatus: ex.approval_status,
    approvedBySlug: ex.approved_by_slug,
    approvedByName: ex.approved_by_name,
    editorialNotes: ex.editorial_notes,
    createdAt: new Date(ex.created_at).toISOString(),
    updatedAt: new Date(ex.updated_at).toISOString(),
  }));

  const auditRes = await pool.query(
    `SELECT * FROM hd_correspondence_audit_logs ORDER BY created_at DESC LIMIT 150`
  );
  const auditLogs = auditRes.rows
    .filter((a: any) => {
      if (!actor.canViewConfidentialSourceDesk && String(a.details || '').includes('RESTRICTED')) {
        return false;
      }
      return true;
    })
    .map((a: any) => ({
      id: a.id,
      actorSlug: a.actor_slug,
      actorName: a.actor_name,
      actorRoleSummary: a.actor_role_summary,
      action: a.action,
      targetReference: a.target_reference,
      details: a.details,
      createdAt: new Date(a.created_at).toISOString(),
    }));

  const verifiedPersonnel = getPublicMastheadPositions()
    .filter((p) => p.isFilledPublicly)
    .map((p) => ({
      slug:
        p.journalistSlug ||
        p.displayHolderName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, ''),
      name: p.displayHolderName,
      roleTitle: p.roleTitle,
      sectionId: p.sectionId,
    }));

  return {
    actor: {
      slug: actor.slug,
      name: actor.name,
      roleSummary: actor.roleSummary,
      authChannel: actor.authChannel,
      canViewConfidentialSourceDesk: actor.canViewConfidentialSourceDesk,
      canApproveKewEvidenceExchange: actor.canApproveKewEvidenceExchange,
    },
    counters,
    records,
    consentedKewSubmissions,
    evidenceExchangeRequests,
    auditLogs,
    verifiedPersonnel,
  };
}

export async function getAttachmentForAuthorizedViewer(input: {
  attachmentId: string;
  request: NextRequest;
}): Promise<
  | { ok: true; filename: string; mimeType: string; buffer: Buffer }
  | { ok: false; status: number; error: string }
> {
  await ensureCorrespondenceSchema();
  const aRes = await pool.query(
    `SELECT a.*, c.reference_number, c.is_confidential, c.desk_code, c.assigned_bureau
     FROM hd_correspondence_attachments a
     JOIN hd_editorial_correspondence c ON c.id = a.correspondence_id
     WHERE a.id = $1
     LIMIT 1`,
    [input.attachmentId]
  );
  const row = aRes.rows[0];
  if (!row) {
    return { ok: false, status: 404, error: 'Attachment not found.' };
  }

  // Check correspondent thread cookie first
  const threadCookie = input.request.cookies.get(CORRESPONDENCE_THREAD_COOKIE)?.value;
  const isCorrespondentOwner = verifyThreadAccessToken(threadCookie, row.reference_number);

  let authorizedActorLabel = 'Verified Correspondent';
  if (!isCorrespondentOwner) {
    const editor = await resolveEditorialCorrespondenceActor(input.request);
    if (!canActorViewRecord(editor, row)) {
      return {
        ok: false,
        status: 403,
        error: 'Forbidden: You do not have permission to access this correspondence attachment.',
      };
    }
    authorizedActorLabel = `${editor.name} (${editor.roleSummary})`;
  }

  const buffer = decryptBufferAtRest(row.payload_enc);
  if (!buffer) {
    return { ok: false, status: 500, error: 'Unable to decrypt attachment payload.' };
  }

  await recordCorrespondenceAudit({
    actorSlug: isCorrespondentOwner ? 'correspondent' : 'editorial-viewer',
    actorName: authorizedActorLabel,
    actorRoleSummary: isCorrespondentOwner ? 'Thread Owner' : 'Authorized Desk',
    action: 'correspondence:attachment_downloaded',
    targetReference: row.reference_number,
    details: `Authorized download of attachment "${row.filename}" (${row.size_bytes} bytes).`,
  });

  return {
    ok: true,
    filename: row.filename,
    mimeType: row.mime_type,
    buffer,
  };
}

// Helper for existing KEW reference lookup notice
export function isKewEnvironmentalTrackingCode(ref: string): boolean {
  const upper = ref.trim().toUpperCase();
  return upper.startsWith('KEW-') || upper.startsWith('SEIAE-') || upper.startsWith('KEI-') || upper.startsWith('SIGHT-');
}

export function lookupInMemoryKewOperationSummary(trackingId: string): Partial<OperationRecord> | null {
  const match = INITIAL_OPERATIONS_RECORDS.find(
    (r) => r.trackingId.toUpperCase() === trackingId.trim().toUpperCase()
  );
  if (!match) return null;
  return {
    trackingId: match.trackingId,
    sourcePageLabel: match.sourcePageLabel,
    status: match.status,
    managementCenterLabel: match.managementCenterLabel,
    updatedAt: match.updatedAt,
  };
}
