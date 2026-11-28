'use client';

import React, { useEffect, useId, useMemo, useState } from 'react';
import {
  Check,
  Copy,
  FileDown,
  Hash,
  Link2,
  Mail,
  QrCode,
  Share2,
  Smartphone,
  X,
} from 'lucide-react';
import { encodeQrMatrix } from '@/lib/qr-svg';
import { KewOfficialPublicationLogo } from '@/components/common/Logo';
import {
  buildCanonicalPublicShareUrl,
  buildKewShareChannels,
  copyCanonicalLinkToClipboard,
  dispatchNativeDeviceShare,
  downloadCanonicalQrSvg,
  formatChapterAnchorId,
  isApprovedForPublicSharing,
  KewExternalShareChannelKey,
  PublicShareGovernanceCheck,
  ShareableChapterOption,
  supportsNativeDeviceShare,
} from '@/lib/sharing/kew-content-sharing';

/**
 * Compact, recognizable monochrome vector icons for social & messaging channels.
 * Designed for crisp rendering at 13px–16px across Light Mode, Ink Mode, and Darkroom plates.
 */
export function KewShareChannelIcon({
  channel,
  className = 'w-3.5 h-3.5',
}: {
  channel: KewExternalShareChannelKey;
  className?: string;
}) {
  switch (channel) {
    case 'email':
      return <Mail className={className} aria-hidden="true" />;
    case 'whatsapp':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M20.5 11.8a8.5 8.5 0 0 1-12.6 7.4L3.5 20.5l1.4-4.2a8.5 8.5 0 1 1 15.6-4.5Z" />
          <path d="M9.4 8.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.5c.1.2.1.4 0 .6l-.4.6c-.1.2-.2.3 0 .6.4.7 1.1 1.4 2 1.8.2.1.4.1.6-.1l.6-.7c.2-.2.4-.2.6-.1l1.4.7c.3.1.4.3.4.5 0 .6-.4 1.3-1 1.6-.6.3-1.4.4-2.5 0-1.6-.6-3.2-2.1-4-3.7-.5-1-.5-1.9-.1-2.6l.1-.7Z" />
        </svg>
      );
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M13.6 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6h1.7V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.4H7.5v3.2h2.8V21h3.3Z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M6.9 8.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM5.2 10h3.4v9.8H5.2V10Zm5.5 0h3.2v1.3h.1c.5-.8 1.6-1.6 3.2-1.6 3.4 0 4 2.2 4 5.1v5h-3.4v-4.4c0-1.1 0-2.4-1.5-2.4s-1.7 1.1-1.7 2.3v4.5h-3.4V10Z" />
        </svg>
      );
    case 'x_twitter':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M18.244 3H21.3l-6.68 7.635L22.48 21h-6.154l-4.82-6.303L5.99 21H2.93l7.145-8.167L2.52 3h6.31l4.357 5.76L18.244 3Zm-1.076 16.17h1.694L7.93 4.734H6.112l11.056 14.436Z" />
        </svg>
      );
    case 'telegram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M21.2 4.4 2.9 11.5c-.8.3-.8 1.4.1 1.7l4.6 1.5 1.8 5.3c.2.7 1.1.9 1.6.3l2.6-2.8 4.7 3.5c.6.5 1.5.1 1.7-.7l2.5-15c.2-.8-.6-1.4-1.3-1.1Z" />
          <path d="m7.6 14.7 10.2-7.3" />
        </svg>
      );
  }
}

export interface KewContentShareProps {
  /** Presentation variant across Himalayan Dispatch & KEW layouts */
  variant: 'editorial-button' | 'toc-icon' | 'article-toolbar';
  /** Actual content headline / issue title / monograph title / publication title */
  title: string;
  /** Actual standfirst, excerpt, subtitle, or editorial introduction */
  description: string;
  /** Canonical path or URL (always resolved onto https://kashmir-ecowatch.com) */
  canonicalPath: string;
  /** Custom button/toolbar label (e.g. "Share Himalayan Dispatch", "Share This Issue", "Share This Monograph") */
  label?: string;
  /** Publication context label used in modal rubric & prefilled email */
  publicationLabel?: string;
  /** Optional chapter anchors for deep-linking inside the share/QR modal */
  chapters?: ShareableChapterOption[];
  /** Optional pre-selected chapter anchor */
  initialChapterAnchor?: string;
  /** Visual surface calibration: 'auto' adapts to Light/Ink theme; 'darkplate' fits dark photographic cover spreads */
  surfaceTone?: 'auto' | 'darkplate';
  /** Publication governance fields — public sharing renders ONLY when approved & published */
  isPublished?: boolean;
  isPreviewMode?: boolean;
  isConfidential?: boolean;
  isRestricted?: boolean;
  editionStatus?: 'current' | 'forthcoming' | 'archived' | string;
  workflowStage?: string;
  hdnWorkflowStatus?: string;
  className?: string;
}

export function KewContentShare({
  variant,
  title,
  description,
  canonicalPath,
  label,
  publicationLabel = 'Himalayan Dispatch · Kashmir EcoWatch',
  chapters = [],
  initialChapterAnchor = '',
  surfaceTone = 'auto',
  isPublished = true,
  isPreviewMode = false,
  isConfidential = false,
  isRestricted = false,
  editionStatus,
  workflowStage,
  hdnWorkflowStatus,
  className = '',
}: KewContentShareProps) {
  const dialogTitleId = useId();
  const anchorSelectId = useId();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAnchor, setSelectedAnchor] = useState(initialChapterAnchor);
  const [copiedInline, setCopiedInline] = useState(false);
  const [copiedModal, setCopiedModal] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setSelectedAnchor(initialChapterAnchor);
  }, [initialChapterAnchor]);

  useEffect(() => {
    setCanNativeShare(supportsNativeDeviceShare());
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [modalOpen]);

  const governanceCheck: PublicShareGovernanceCheck = {
    isPublished,
    canonicalPath,
    isPreviewMode,
    isConfidential,
    isRestricted,
    editionStatus,
    workflowStage,
    hdnWorkflowStatus,
  };

  const allowed = isApprovedForPublicSharing(governanceCheck);

  const baseCanonicalUrl = useMemo(
    () => buildCanonicalPublicShareUrl(canonicalPath),
    [canonicalPath]
  );

  const activeCanonicalUrl = useMemo(
    () => buildCanonicalPublicShareUrl(canonicalPath, selectedAnchor),
    [canonicalPath, selectedAnchor]
  );

  const inlineChannels = useMemo(
    () =>
      buildKewShareChannels({
        title,
        description,
        canonicalUrl: baseCanonicalUrl,
        publicationLabel,
      }),
    [title, description, baseCanonicalUrl, publicationLabel]
  );

  const modalChannels = useMemo(
    () =>
      buildKewShareChannels({
        title,
        description,
        canonicalUrl: activeCanonicalUrl,
        publicationLabel,
      }),
    [title, description, activeCanonicalUrl, publicationLabel]
  );

  const qrMatrix = useMemo(
    () => encodeQrMatrix(activeCanonicalUrl),
    [activeCanonicalUrl]
  );

  if (!allowed) {
    return null;
  }

  const openChannel = (href: string, opensPopup: boolean) => {
    if (!opensPopup || href.startsWith('mailto:')) {
      window.location.href = href;
      return;
    }
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  const handleCopyInline = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const ok = await copyCanonicalLinkToClipboard(baseCanonicalUrl);
    if (ok) {
      setCopiedInline(true);
      window.setTimeout(() => setCopiedInline(false), 2200);
    }
  };

  const handleCopyModal = async () => {
    const ok = await copyCanonicalLinkToClipboard(activeCanonicalUrl);
    if (ok) {
      setCopiedModal(true);
      window.setTimeout(() => setCopiedModal(false), 2200);
    }
  };

  const handleNativeShareAction = async (targetUrl: string, openModalFallback = true) => {
    const res = await dispatchNativeDeviceShare({
      title,
      description,
      canonicalUrl: targetUrl,
    });
    if (res === 'unsupported' && openModalFallback) {
      setModalOpen(true);
    }
  };

  const handleDownloadQr = () => {
    const suffix = selectedAnchor ? `${title}-${selectedAnchor}` : title;
    downloadCanonicalQrSvg(activeCanonicalUrl, suffix);
  };

  const quiet = 2;
  const qrTotal = qrMatrix.length + quiet * 2;

  const renderModal = () => {
    if (!modalOpen) return null;
    return (
      <div
        className="hd-share-modal-backdrop fixed inset-0 z-[120] flex items-center justify-center p-4 print:hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        onClick={(e) => {
          if (e.target === e.currentTarget) setModalOpen(false);
        }}
      >
        <div
          className="hd-share-modal-panel w-full max-w-2xl border shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Editorial Modal Header */}
          <div className="hd-share-modal-header flex items-start justify-between gap-4 px-5 sm:px-7 py-4 border-b">
            <div className="flex items-start gap-3.5 min-w-0">
              <KewOfficialPublicationLogo size="sm" />
              <div className="min-w-0">
                <div className="hd-kicker flex items-center gap-1.5">
                  <Share2 className="w-3 h-3 shrink-0" aria-hidden="true" />
                  <span className="truncate">{publicationLabel}</span>
                </div>
                <h3
                  id={dialogTitleId}
                  className="hd-font-display text-xl sm:text-2xl font-semibold leading-snug mt-0.5"
                >
                  {title}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="hd-share-icon-btn shrink-0 p-2 border cursor-pointer"
              aria-label="Close sharing panel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-7 space-y-5 max-h-[82vh] overflow-y-auto">
            {description && (
              <p className="hd-font-body text-sm leading-relaxed hd-share-muted-copy">
                {description.length > 220 ? `${description.slice(0, 217).trimEnd()}…` : description}
              </p>
            )}

            {/* Optional Chapter Deep-Link Selector */}
            {chapters.length > 0 && (
              <div className="space-y-1.5">
                <label
                  htmlFor={anchorSelectId}
                  className="hd-folio-meta flex items-center gap-1.5"
                >
                  <Hash className="w-3 h-3" style={{ color: 'var(--hd-copper, #8C3125)' }} />
                  <span>Permanent Link Scope or Chapter Anchor</span>
                </label>
                <select
                  id={anchorSelectId}
                  value={selectedAnchor}
                  onChange={(e) => setSelectedAnchor(e.target.value)}
                  className="hd-share-input w-full px-3 py-2 border text-xs sm:text-sm hd-font-body"
                >
                  <option value="">Complete Dispatch (Article Opening)</option>
                  {chapters.map((ch) => (
                    <option key={ch.id} value={ch.id}>
                      {ch.label}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Permanent Canonical URL + Copy */}
            <div className="space-y-1.5">
              <span className="hd-folio-meta block">Permanent Canonical Public URL</span>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <input
                  type="text"
                  readOnly
                  aria-label="Permanent canonical URL"
                  value={activeCanonicalUrl}
                  className="hd-share-input flex-1 px-3 py-2 border text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={handleCopyModal}
                  className="hd-share-primary-btn inline-flex items-center justify-center gap-1.5 px-4 py-2 text-[11px] hd-font-sans font-semibold tracking-[0.18em] uppercase cursor-pointer shrink-0"
                >
                  {copiedModal ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Link Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Permanent Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 6 Channel Buttons + Native Device Share + QR Code */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1">
              <div className="md:col-span-7 space-y-2.5">
                <span className="hd-folio-meta block">Share via Editorial &amp; Social Channels</span>
                <div className="grid grid-cols-2 gap-2">
                  {modalChannels.map((ch) => (
                    <button
                      key={ch.key}
                      type="button"
                      onClick={() => openChannel(ch.href, ch.opensPopup)}
                      className="hd-share-channel-btn flex items-center gap-2.5 px-3 py-2.5 border text-xs hd-font-sans font-medium tracking-[0.1em] uppercase cursor-pointer"
                    >
                      <KewShareChannelIcon channel={ch.key} className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{ch.label}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    canNativeShare
                      ? handleNativeShareAction(activeCanonicalUrl, false)
                      : handleCopyModal()
                  }
                  className="hd-share-channel-btn w-full flex items-center justify-center gap-2 px-3 py-2.5 border text-xs hd-font-sans font-semibold tracking-[0.14em] uppercase cursor-pointer"
                >
                  <Smartphone className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    {canNativeShare
                      ? 'Share via Device Share Sheet'
                      : 'Native Share (Copy Permanent Link on Desktop)'}
                  </span>
                </button>
              </div>

              {/* Zero-Tracking Vector QR Code Preview & Download */}
              <div className="md:col-span-5 hd-share-qr-card border p-4 flex flex-col items-center justify-between gap-2.5">
                <div className="hd-folio-meta flex items-center gap-1.5 text-center">
                  <QrCode className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper, #8C3125)' }} />
                  <span>Citation &amp; Print QR</span>
                </div>

                <div className="bg-white p-2 border border-neutral-300">
                  <svg
                    viewBox={`0 0 ${qrTotal} ${qrTotal}`}
                    className="w-28 h-28"
                    shapeRendering="crispEdges"
                    role="img"
                    aria-label={`QR code for ${title}`}
                  >
                    <rect width={qrTotal} height={qrTotal} fill="#ffffff" />
                    {qrMatrix.map((row, r) =>
                      row.map((dark, c) =>
                        dark ? (
                          <rect
                            key={`${r}-${c}`}
                            x={c + quiet}
                            y={r + quiet}
                            width={1}
                            height={1}
                            fill="#0f172a"
                          />
                        ) : null
                      )
                    )}
                  </svg>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadQr}
                  className="hd-share-channel-btn w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 border text-[10px] hd-font-sans font-semibold tracking-[0.16em] uppercase cursor-pointer"
                >
                  <FileDown className="w-3.5 h-3.5 shrink-0" />
                  <span>Download QR (.SVG)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (variant === 'toc-icon') {
    const buttonLabel = label || `Share "${title}"`;
    return (
      <>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setModalOpen(true);
          }}
          aria-label={buttonLabel}
          title={buttonLabel}
          data-share-variant="toc-icon"
          data-canonical-share-url={baseCanonicalUrl}
          className={`hd-share-toc-btn inline-flex items-center justify-center w-8 h-8 border cursor-pointer transition-colors print:hidden ${className}`}
        >
          <Share2 className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
        {renderModal()}
      </>
    );
  }

  if (variant === 'editorial-button') {
    const buttonText = label || 'Share Himalayan Dispatch';
    const isDarkPlate = surfaceTone === 'darkplate';
    return (
      <>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          data-share-variant="editorial-button"
          data-canonical-share-url={baseCanonicalUrl}
          className={`hd-font-sans inline-flex items-center gap-2.5 px-5 py-3.5 border text-xs font-medium tracking-[0.2em] uppercase cursor-pointer transition-colors print:hidden ${
            isDarkPlate ? 'hd-share-cover-btn--darkplate' : 'hd-share-cover-btn'
          } ${className}`}
        >
          <Share2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>{buttonText}</span>
        </button>
        {renderModal()}
      </>
    );
  }

  // variant === 'article-toolbar'
  const toolbarLabel = label || 'Share This Dispatch';
  const isDarkPlate = surfaceTone === 'darkplate';

  return (
    <>
      <div
        role="region"
        aria-label={toolbarLabel}
        data-share-variant="article-toolbar"
        data-canonical-share-url={baseCanonicalUrl}
        className={`hd-share-toolbar ${
          isDarkPlate ? 'hd-share-toolbar--darkplate' : ''
        } py-3 border-t border-b flex flex-wrap items-center justify-between gap-3 print:hidden ${className}`}
      >
        <span className="hd-share-toolbar-label hd-font-sans text-[10px] font-semibold tracking-[0.22em] uppercase inline-flex items-center gap-1.5">
          <Share2 className="w-3 h-3 shrink-0" aria-hidden="true" />
          <span>{toolbarLabel}</span>
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          {inlineChannels.map((ch) => (
            <button
              key={ch.key}
              type="button"
              onClick={() => openChannel(ch.href, ch.opensPopup)}
              aria-label={`Share via ${ch.label}`}
              title={`Share via ${ch.label}`}
              className="hd-share-toolbar-icon-btn inline-flex items-center justify-center w-8 h-8 border cursor-pointer transition-colors"
            >
              <KewShareChannelIcon channel={ch.key} className="w-3.5 h-3.5" />
            </button>
          ))}

          {/* Native Device Sharing */}
          <button
            type="button"
            onClick={() => handleNativeShareAction(baseCanonicalUrl, true)}
            aria-label="Share via device share sheet"
            title="Device share"
            className="hd-share-toolbar-icon-btn inline-flex items-center justify-center w-8 h-8 border cursor-pointer transition-colors"
          >
            <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
          </button>

          {/* Copy Permanent Link */}
          <button
            type="button"
            onClick={handleCopyInline}
            aria-label="Copy permanent canonical link"
            title="Copy permanent link"
            className="hd-share-toolbar-pill-btn hd-font-sans inline-flex items-center gap-1.5 h-8 px-2.5 border text-[10px] font-medium tracking-[0.15em] uppercase cursor-pointer transition-colors"
          >
            {copiedInline ? (
              <>
                <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Link2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>Copy Link</span>
              </>
            )}
          </button>

          {/* QR Code & Download */}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            aria-label="Open QR code and sharing options"
            title="QR code & download (.SVG)"
            className="hd-share-toolbar-pill-btn hd-font-sans inline-flex items-center gap-1.5 h-8 px-2.5 border text-[10px] font-medium tracking-[0.15em] uppercase cursor-pointer transition-colors"
          >
            <QrCode className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline">QR</span>
          </button>
        </div>
      </div>
      {renderModal()}
    </>
  );
}

export interface KewChapterAnchorCopyButtonProps {
  /** Base canonical path of the article or monograph */
  canonicalPath: string;
  /** Chapter Roman numeral, number, or existing section id (e.g. 'I', 'PROLOGUE', 'chapter-01-silence') */
  chapterAnchor: string;
  /** Human-readable chapter title for accessible label */
  chapterTitle: string;
  /** Publication governance fields */
  isPublished?: boolean;
  isPreviewMode?: boolean;
  isConfidential?: boolean;
  isRestricted?: boolean;
  workflowStage?: string;
  hdnWorkflowStatus?: string;
  className?: string;
}

/**
 * Discreet copy-link icon attached to chapter headings, providing a permanent
 * chapter-specific canonical URL (`https://kashmir-ecowatch.com/...#chapter-I`).
 */
export function KewChapterAnchorCopyButton({
  canonicalPath,
  chapterAnchor,
  chapterTitle,
  isPublished = true,
  isPreviewMode = false,
  isConfidential = false,
  isRestricted = false,
  workflowStage,
  hdnWorkflowStatus,
  className = '',
}: KewChapterAnchorCopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const allowed = isApprovedForPublicSharing({
    isPublished,
    canonicalPath,
    isPreviewMode,
    isConfidential,
    isRestricted,
    workflowStage,
    hdnWorkflowStatus,
  });

  if (!allowed) {
    return null;
  }

  const anchorId = formatChapterAnchorId(chapterAnchor);
  const fullChapterUrl = buildCanonicalPublicShareUrl(canonicalPath, anchorId);

  const handleCopyChapterLink = async () => {
    const ok = await copyCanonicalLinkToClipboard(fullChapterUrl);
    if (typeof window !== 'undefined' && anchorId) {
      window.history.replaceState(null, '', `#${anchorId}`);
    }
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopyChapterLink}
      aria-label={`Copy permanent link to ${chapterTitle}`}
      title={`Copy permanent chapter link (${fullChapterUrl})`}
      data-share-variant="chapter-anchor"
      data-chapter-share-url={fullChapterUrl}
      className={`hd-chapter-copy-btn inline-flex items-center gap-1 px-1.5 py-1 text-[10px] hd-font-sans tracking-[0.14em] uppercase cursor-pointer transition-opacity print:hidden ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
          <span>Link Copied</span>
        </>
      ) : (
        <Link2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      )}
    </button>
  );
}
