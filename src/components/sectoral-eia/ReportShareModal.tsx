'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  X,
  Copy,
  Check,
  Share2,
  FileDown,
  QrCode,
  Hash,
  Smartphone,
} from 'lucide-react';
import { encodeQrMatrix } from '@/lib/qr-svg';
import { CANONICAL_SITE_URL } from '@/lib/seo/entity-identity';
import { KewOfficialPublicationLogo } from '@/components/common/Logo';
import {
  buildCanonicalPublicShareUrl,
  buildKewShareChannels,
  copyCanonicalLinkToClipboard,
  dispatchNativeDeviceShare,
  downloadCanonicalQrSvg,
  KewExternalShareChannelKey,
  supportsNativeDeviceShare,
} from '@/lib/sharing/kew-content-sharing';
import { KewShareChannelIcon } from '@/components/common/KewContentShare';

export interface ShareableChapterAnchor {
  number: string;
  title: string;
}

interface ReportShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  title: string;
  abstract: string;
  sectorLabel: string;
  isPublished: boolean;
  chapters: ShareableChapterAnchor[];
  initialChapterAnchor?: string;
}

async function trackShareAnalytics(
  code: string,
  eventType: 'share_modal_open' | 'share_platform_dispatch',
  metaKey?: string
) {
  try {
    await fetch('/api/sectoral-eia/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code, eventType, metaKey }),
    });
  } catch {}
}

export function ReportShareModal({
  isOpen,
  onClose,
  code,
  title,
  abstract,
  sectorLabel,
  isPublished,
  chapters,
  initialChapterAnchor = '',
}: ReportShareModalProps) {
  const [selectedAnchor, setSelectedAnchor] = useState<string>(initialChapterAnchor);
  const [copiedField, setCopiedField] = useState<'url' | 'pdf' | null>(null);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setSelectedAnchor(initialChapterAnchor);
  }, [initialChapterAnchor]);

  useEffect(() => {
    setCanNativeShare(supportsNativeDeviceShare());
  }, []);

  useEffect(() => {
    if (isOpen) {
      trackShareAnalytics(code, 'share_modal_open');
    }
  }, [isOpen, code]);

  const canonicalReportUrl = useMemo(
    () =>
      buildCanonicalPublicShareUrl(
        `/sectoral-eia/reports/${code.toLowerCase()}`,
        selectedAnchor
      ),
    [code, selectedAnchor]
  );

  const localOrLivePdfUrl = useMemo(() => {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : CANONICAL_SITE_URL;
    return `${origin}/api/sectoral-eia/reports/${code.toLowerCase()}/pdf`;
  }, [code]);

  const qrMatrix = useMemo(() => encodeQrMatrix(canonicalReportUrl), [canonicalReportUrl]);

  if (!isOpen) return null;

  const shareHeadline = `${code}: ${title} — Kashmir EcoWatch (${sectorLabel})`;
  const shortSummary =
    abstract.length > 200 ? `${abstract.slice(0, 197)}...` : abstract;

  const dispatchPlatform = (platformKey: string, targetHref: string) => {
    trackShareAnalytics(code, 'share_platform_dispatch', platformKey);
    if (targetHref.startsWith('mailto:')) {
      window.location.href = targetHref;
      return;
    }
    window.open(targetHref, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = async (kind: 'url' | 'pdf', value: string) => {
    const ok = await copyCanonicalLinkToClipboard(value);
    if (ok) {
      setCopiedField(kind);
      trackShareAnalytics(
        code,
        'share_platform_dispatch',
        kind === 'url' ? 'copy_report_link' : 'copy_pdf_link'
      );
      setTimeout(() => setCopiedField(null), 2200);
    }
  };

  const handleNativeShare = async () => {
    if (!canNativeShare) return;
    const status = await dispatchNativeDeviceShare({
      title: shareHeadline,
      description: shortSummary,
      canonicalUrl: canonicalReportUrl,
    });
    if (status === 'shared') {
      trackShareAnalytics(code, 'share_platform_dispatch', 'web_share_api');
    }
  };

  const handleDownloadQrSvg = () => {
    downloadCanonicalQrSvg(canonicalReportUrl, `${code}-QR-Link.svg`);
    trackShareAnalytics(code, 'share_platform_dispatch', 'qr_svg_download');
  };

  const accentByKey: Record<KewExternalShareChannelKey, string> = {
    whatsapp: 'border-emerald-500/30 hover:border-emerald-400/60 text-emerald-300',
    linkedin: 'border-sky-500/30 hover:border-sky-400/60 text-sky-300',
    x_twitter: 'border-slate-500/40 hover:border-slate-300/60 text-slate-200',
    facebook: 'border-blue-500/30 hover:border-blue-400/60 text-blue-300',
    telegram: 'border-cyan-500/30 hover:border-cyan-400/60 text-cyan-300',
    email: 'border-amber-500/30 hover:border-amber-400/60 text-amber-300',
  };

  const platforms = buildKewShareChannels({
    title: shareHeadline,
    description: shortSummary,
    canonicalUrl: canonicalReportUrl,
    publicationLabel: 'Kashmir EcoWatch',
    summaryHeading: 'Executive Summary',
  }).map((ch) => ({
    ...ch,
    label: ch.key === 'email' ? 'Institutional Email' : ch.label,
    accent: accentByKey[ch.key],
  }));

  const quiet = 2;
  const qrTotal = qrMatrix.length + quiet * 2;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 print:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="kew-share-report-title"
    >
      <div className="w-full max-w-2xl rounded-lg border border-slate-700/80 bg-slate-900 shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 bg-slate-950 px-6 py-4">
          <div className="flex items-start gap-3">
            <KewOfficialPublicationLogo size="sm" />
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-emerald-400">
                <Share2 className="h-3.5 w-3.5" />
                <span>Scientific Report Dissemination · {code}</span>
              </div>
              <h3
                id="kew-share-report-title"
                className="mt-1 text-base font-bold text-white leading-snug"
              >
                {title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-slate-700 bg-slate-900 p-1.5 text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
            aria-label="Close share dialog"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[82vh] overflow-y-auto">
          {/* Chapter Anchor Deep-Link Selector */}
          <div>
            <label
              htmlFor="share-chapter-anchor"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5"
            >
              <Hash className="h-3.5 w-3.5 text-emerald-400" />
              Target Report Scope or Chapter Anchor
            </label>
            <select
              id="share-chapter-anchor"
              value={selectedAnchor}
              onChange={(e) => setSelectedAnchor(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none"
            >
              <option value="">Complete Scientific Dossier (Top of Report)</option>
              {chapters.map((ch) => (
                <option key={ch.number} value={ch.number}>
                  Chapter {ch.number} — {ch.title}
                </option>
              ))}
            </select>
          </div>

          {/* Permanent Canonical Report Link */}
          <div className="space-y-3">
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Permanent Canonical Report URL
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={canonicalReportUrl}
                  className="flex-1 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-200"
                />
                <button
                  type="button"
                  onClick={() => handleCopy('url', canonicalReportUrl)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/40 bg-emerald-950/60 px-3 py-2 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/60 transition-colors"
                >
                  {copiedField === 'url' ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      Copy URL
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Direct PDF Link */}
            <div>
              <span className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                Direct Institutional PDF Endpoint
              </span>
              {isPublished ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={localOrLivePdfUrl}
                    className="flex-1 rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-mono text-slate-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleCopy('pdf', localOrLivePdfUrl)}
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-600 bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition-colors"
                  >
                    {copiedField === 'pdf' ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        Copied
                      </>
                    ) : (
                      <>
                        <FileDown className="h-3.5 w-3.5" />
                        Copy PDF Link
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="rounded-md border border-amber-500/30 bg-amber-950/30 px-3 py-2 text-xs text-amber-200">
                  Final public PDF distribution link activates automatically once this proposed dossier completes KEW&apos;s 19-stage scientific validation workflow.
                </div>
              )}
            </div>
          </div>

          {/* Channel Grid + Scannable QR Code */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1">
            <div className="md:col-span-7 space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                External Research & Public Channels
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {platforms.map((p) => (
                  <button
                    key={p.key}
                    type="button"
                    onClick={() => dispatchPlatform(p.key, p.href)}
                    className={`flex items-center justify-between rounded-md border bg-slate-950 px-3 py-2.5 text-xs font-semibold transition-colors ${p.accent}`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <KewShareChannelIcon channel={p.key} className="h-3.5 w-3.5" />
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>

              {canNativeShare && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="w-full flex items-center justify-center gap-2 rounded-md border border-emerald-500/40 bg-emerald-950/50 px-3 py-2.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50 transition-colors"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  Share via System / Mobile Share Sheet
                </button>
              )}
            </div>

            {/* Pure Zero-Tracking Scannable SVG QR Code */}
            <div className="md:col-span-5 flex flex-col items-center justify-between rounded-lg border border-slate-800 bg-slate-950 p-4">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                <QrCode className="h-3.5 w-3.5 text-emerald-400" />
                <span>Print / Field Briefing QR</span>
              </div>
              <div className="rounded-md bg-white p-2 border border-slate-300">
                <svg
                  viewBox={`0 0 ${qrTotal} ${qrTotal}`}
                  className="h-28 w-28"
                  shapeRendering="crispEdges"
                  aria-label={`QR code for ${code}`}
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
                onClick={handleDownloadQrSvg}
                className="mt-3 w-full inline-flex items-center justify-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
              >
                <FileDown className="h-3.5 w-3.5" />
                Download Vector QR (.SVG)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
