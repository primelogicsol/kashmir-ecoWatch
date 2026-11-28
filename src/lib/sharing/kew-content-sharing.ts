// ─────────────────────────────────────────────────────────────────────────────
// KASHMIR ECOWATCH (KEW) — REUSABLE NATIVE CONTENT SHARING CORE
// Shared canonical URL resolution, chapter-anchor formatting, publication
// governance gating, clipboard, native Web Share API, QR SVG download, and
// zero-tracking social channel URL construction across KEW & Himalayan Dispatch.
// ─────────────────────────────────────────────────────────────────────────────

import { renderQrSvgString } from '@/lib/qr-svg';
import { CANONICAL_SITE_URL } from '@/lib/seo/entity-identity';
import { ALLOWED_DISPATCH_ROOT_SEGMENTS } from '@/lib/himalayan-dispatch-routes';

/**
 * Official canonical origin enforced across all public sharing actions.
 * Never emits localhost, 127.0.0.1, preview deployments, or unprovisioned hosts.
 */
export const OFFICIAL_CANONICAL_SHARE_ORIGIN = 'https://kashmir-ecowatch.com';

export function getCanonicalShareOrigin(): string {
  const candidate = (CANONICAL_SITE_URL || OFFICIAL_CANONICAL_SHARE_ORIGIN).trim().replace(/\/+$/, '');
  if (
    !candidate ||
    /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0|\[::1\])(:\d+)?(\/|$)/i.test(candidate) ||
    /\.local(:\d+)?$/i.test(candidate) ||
    /\.vercel\.app$/i.test(candidate)
  ) {
    return OFFICIAL_CANONICAL_SHARE_ORIGIN;
  }
  return candidate;
}

/**
 * Route prefixes that are strictly excluded from public content sharing:
 * administrative consoles, internal newsrooms, draft previews, pitch intakes,
 * and unreleased forthcoming edition slates.
 */
export const RESTRICTED_NON_SHAREABLE_PREFIXES = [
  '/admin',
  '/api',
  '/auth',
  '/dashboard',
  '/himalayan-dispatch/admin',
  '/himalayan-dispatch/contact/track',
  '/himalayan-dispatch/contact/thread',
  '/contact/track',
  '/contact/thread',
  '/himalayan-dispatch/newsroom',
  '/newsroom',
  '/himalayan-dispatch/editorial-cms',
  '/editorial-cms',
  '/himalayan-dispatch/journalist-sign-in',
  '/journalist-sign-in',
  '/himalayan-dispatch/pitch',
  '/pitch',
  '/himalayan-dispatch/forthcoming',
  '/forthcoming',
] as const;

export const APPROVED_PUBLIC_WORKFLOW_STAGES = new Set<string>([
  'editorial_approval',
  'publication',
  'corrections',
  'archiving',
  'published',
]);

export interface ShareableChapterOption {
  /** Raw chapter identifier or Roman numeral (e.g. 'I', 'PROLOGUE', '1', or 'chapter-01-silence') */
  id: string;
  /** Display label in chapter selector (e.g. 'Chapter I — The Men Who Never Returned') */
  label: string;
}

export interface PublicShareGovernanceCheck {
  isPublished: boolean;
  canonicalPath: string;
  isPreviewMode?: boolean;
  isConfidential?: boolean;
  isRestricted?: boolean;
  editionStatus?: 'current' | 'forthcoming' | 'archived' | string;
  workflowStage?: string;
  hdnWorkflowStatus?: string;
}

/**
 * Normalizes a raw chapter number, Roman numeral, or heading ID into a stable
 * HTML element `id` (without leading `#`).
 *
 * Examples:
 * - `'I'` -> `'chapter-I'`
 * - `'PROLOGUE'` -> `'chapter-PROLOGUE'`
 * - `'1'` -> `'chapter-1'`
 * - `'chapter-01-silence'` -> `'chapter-01-silence'`
 * - `'#chapter-III'` -> `'chapter-III'`
 */
export function formatChapterAnchorId(rawChapterToken: string): string {
  const trimmed = (rawChapterToken || '').trim().replace(/^#+/, '');
  if (!trimmed) return '';
  const safeToken = trimmed
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (!safeToken) return '';
  if (/^chapter-/i.test(safeToken)) {
    return safeToken;
  }
  return `chapter-${safeToken}`;
}

export function isRestrictedSharePath(rawPath: string): boolean {
  const clean = (rawPath || '').split(/[?#]/)[0]?.trim() || '/';
  const normalized = clean.startsWith('/') ? clean : `/${clean}`;
  return RESTRICTED_NON_SHAREABLE_PREFIXES.some(
    (prefix) =>
      normalized === prefix ||
      normalized.startsWith(`${prefix}/`)
  );
}

/**
 * Normalizes any internal path or URL onto the official `https://kashmir-ecowatch.com`
 * canonical domain, stripping any `localhost` / preview origin and ensuring Himalayan
 * Dispatch subdomain paths map cleanly onto `/himalayan-dispatch/...`.
 */
export function normalizeToOfficialCanonicalPath(pathOrUrl: string): string {
  let rawPath = (pathOrUrl || '/').trim();
  let fromDispatchSubdomain = false;

  if (/^https?:\/\//i.test(rawPath)) {
    try {
      const parsed = new URL(rawPath);
      fromDispatchSubdomain = /^((www\.)?dispatch\.)/i.test(parsed.hostname);
      rawPath = `${parsed.pathname}${parsed.search}${parsed.hash}`;
    } catch {
      rawPath = '/';
    }
  }

  const [beforeHash] = rawPath.split('#');
  const [pathnameOnly, queryPart] = (beforeHash || '/').split('?');
  let cleanPathname = pathnameOnly.startsWith('/') ? pathnameOnly : `/${pathnameOnly}`;

  if (cleanPathname.length > 1) {
    cleanPathname = cleanPathname.replace(/\/+$/, '');
  }

  // Upgrade bare Dispatch subdomain root segments (e.g. `/issues/volume-01-issue-01`)
  // to `/himalayan-dispatch/issues/volume-01-issue-01` on `https://kashmir-ecowatch.com`.
  const firstSegment = cleanPathname.split('/').filter(Boolean)[0] || '';
  if (
    fromDispatchSubdomain &&
    cleanPathname === '/'
  ) {
    cleanPathname = '/himalayan-dispatch';
  } else if (
    cleanPathname !== '/himalayan-dispatch' &&
    !cleanPathname.startsWith('/himalayan-dispatch/') &&
    firstSegment &&
    ALLOWED_DISPATCH_ROOT_SEGMENTS.has(firstSegment) &&
    (fromDispatchSubdomain ||
      firstSegment === 'issues' ||
      firstSegment === 'daily-dispatch' ||
      firstSegment === 'current-issue')
  ) {
    cleanPathname = `/himalayan-dispatch${cleanPathname}`;
  }

  return queryPart ? `${cleanPathname}?${queryPart}` : cleanPathname;
}

/**
 * Constructs a permanent, canonical public share URL on `https://kashmir-ecowatch.com`,
 * optionally suffixed with a deterministic `#chapter-...` anchor.
 */
export function buildCanonicalPublicShareUrl(
  canonicalPathOrUrl: string,
  chapterAnchor?: string
): string {
  const origin = getCanonicalShareOrigin();
  const normalizedPath = normalizeToOfficialCanonicalPath(canonicalPathOrUrl);
  const base = normalizedPath === '/' ? `${origin}/` : `${origin}${normalizedPath}`;
  if (!chapterAnchor || !chapterAnchor.trim()) {
    return base;
  }
  const anchorId = formatChapterAnchorId(chapterAnchor);
  return anchorId ? `${base}#${anchorId}` : base;
}

/**
 * Publication-status governance gate: returns `true` ONLY when content is approved
 * and publicly released, and its route is not a newsroom, preview, draft, confidential,
 * or unreleased forthcoming surface.
 */
export function isApprovedForPublicSharing(input: PublicShareGovernanceCheck): boolean {
  if (!input.isPublished) return false;
  if (input.isPreviewMode || input.isConfidential || input.isRestricted) return false;
  if (input.editionStatus === 'forthcoming') return false;

  if (input.workflowStage && !APPROVED_PUBLIC_WORKFLOW_STAGES.has(input.workflowStage)) {
    return false;
  }

  if (input.hdnWorkflowStatus && input.hdnWorkflowStatus !== 'published') {
    return false;
  }

  const normalizedPath = normalizeToOfficialCanonicalPath(input.canonicalPath);
  if (isRestrictedSharePath(normalizedPath)) {
    return false;
  }

  return true;
}

/**
 * Distinguishes Himalayan Dispatch Monographs (e.g. Monograph 00: Watershed Voices
 * and future monographs) from numbered periodical Issues so shared cover layouts
 * render `"Share This Monograph"` vs `"Share This Issue"` automatically.
 */
export function isHimalayanDispatchMonograph(edition: {
  slug?: string;
  volumeLabel?: string;
  issueNumberLabel?: string;
  themeKicker?: string;
}): boolean {
  const hay = [
    edition.slug || '',
    edition.volumeLabel || '',
    edition.issueNumberLabel || '',
    edition.themeKicker || '',
  ].join(' ');
  return /\bmonograph\b/i.test(hay);
}

export type KewExternalShareChannelKey =
  | 'email'
  | 'whatsapp'
  | 'facebook'
  | 'linkedin'
  | 'x_twitter'
  | 'telegram';

export interface KewShareChannelDescriptor {
  key: KewExternalShareChannelKey;
  label: string;
  shortLabel: string;
  href: string;
  opensPopup: boolean;
}

export interface KewSharePayloadInput {
  title: string;
  description: string;
  canonicalUrl: string;
  publicationLabel?: string;
  summaryHeading?: string;
}

export function truncateShareDescription(text: string, maxChars = 240): string {
  const clean = (text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxChars) return clean;
  return `${clean.slice(0, maxChars - 1).trimEnd()}…`;
}

/**
 * Generates zero-tracking share URLs for Email, WhatsApp, Facebook, LinkedIn,
 * X (Twitter), and Telegram using the actual content title, introduction/description,
 * and permanent canonical public URL.
 */
export function buildKewShareChannels({
  title,
  description,
  canonicalUrl,
  publicationLabel = 'Himalayan Dispatch · Kashmir EcoWatch',
  summaryHeading,
}: KewSharePayloadInput): KewShareChannelDescriptor[] {
  const cleanTitle = title.trim();
  const brandedHeadline =
    /himalayan dispatch|kashmir ecowatch/i.test(cleanTitle)
      ? cleanTitle
      : `${cleanTitle} — ${publicationLabel}`;
  const intro = truncateShareDescription(description, 260);
  const tweetLead = truncateShareDescription(brandedHeadline, 190);
  const whatsappText = intro
    ? `${brandedHeadline}\n\n${intro}\n\n${canonicalUrl}`
    : `${brandedHeadline}\n\n${canonicalUrl}`;
  const emailBodyLines = [
    brandedHeadline,
    '',
    ...(intro
      ? [summaryHeading ? `${summaryHeading}:\n${intro}` : intro, '']
      : []),
    `Read on ${publicationLabel.split('·')[0].trim()}:`,
    canonicalUrl,
  ];

  return [
    {
      key: 'email',
      label: 'Email',
      shortLabel: 'Email',
      href: `mailto:?subject=${encodeURIComponent(brandedHeadline)}&body=${encodeURIComponent(
        emailBodyLines.join('\n')
      )}`,
      opensPopup: false,
    },
    {
      key: 'whatsapp',
      label: 'WhatsApp',
      shortLabel: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(whatsappText)}`,
      opensPopup: true,
    },
    {
      key: 'facebook',
      label: 'Facebook',
      shortLabel: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonicalUrl)}`,
      opensPopup: true,
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      shortLabel: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        canonicalUrl
      )}`,
      opensPopup: true,
    },
    {
      key: 'x_twitter',
      label: 'X (Twitter)',
      shortLabel: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        tweetLead
      )}&url=${encodeURIComponent(canonicalUrl)}`,
      opensPopup: true,
    },
    {
      key: 'telegram',
      label: 'Telegram',
      shortLabel: 'Telegram',
      href: `https://t.me/share/url?url=${encodeURIComponent(
        canonicalUrl
      )}&text=${encodeURIComponent(brandedHeadline)}`,
      opensPopup: true,
    },
  ];
}

export async function copyCanonicalLinkToClipboard(url: string): Promise<boolean> {
  if (!url) return false;
  try {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      return true;
    }
  } catch {
    // Fall through to textarea fallback
  }

  if (typeof document === 'undefined') return false;
  try {
    const ta = document.createElement('textarea');
    ta.value = url;
    ta.setAttribute('readonly', 'true');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    ta.style.pointerEvents = 'none';
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export function supportsNativeDeviceShare(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function';
}

export async function dispatchNativeDeviceShare({
  title,
  description,
  canonicalUrl,
}: {
  title: string;
  description: string;
  canonicalUrl: string;
}): Promise<'shared' | 'aborted' | 'unsupported'> {
  if (!supportsNativeDeviceShare()) {
    return 'unsupported';
  }
  try {
    await navigator.share({
      title: title.trim(),
      text: truncateShareDescription(description, 220),
      url: canonicalUrl,
    });
    return 'shared';
  } catch {
    return 'aborted';
  }
}

export function toSafeQrDownloadFilename(prefixOrTitle: string): string {
  const slug = (prefixOrTitle || 'kew-share')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 64);
  return `${slug || 'kew-share'}-qr.svg`;
}

export function downloadCanonicalQrSvg(canonicalUrl: string, filenameBase: string): void {
  if (typeof document === 'undefined') return;
  const svg = renderQrSvgString(canonicalUrl, 3);
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = blobUrl;
  anchor.download = filenameBase.endsWith('.svg')
    ? filenameBase
    : toSafeQrDownloadFilename(filenameBase);
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(blobUrl);
}
