'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FileText,
  Download,
  Share2,
  Printer,
  Quote,
  Database,
  Activity,
  Map as MapIcon,
  ArrowLeft,
  ChevronDown,
  Check,
  Copy,
  X,
  Lock,
} from 'lucide-react';
import { CANONICAL_SITE_URL } from '@/lib/seo/entity-identity';

export type ReportDisplayMode = 'html' | 'pdf';
export type ReportIntelligenceTab =
  | 'report'
  | 'telemetry'
  | 'gis'
  | 'datasets'
  | 'indicators'
  | 'risk'
  | 'references'
  | 'history';

interface ReportActionToolbarProps {
  code: string;
  title: string;
  author: string;
  publicationDate: string;
  version: string;
  pages: number;
  isPublished: boolean;
  displayMode: ReportDisplayMode;
  onChangeDisplayMode: (mode: ReportDisplayMode) => void;
  onSelectTab: (tab: ReportIntelligenceTab) => void;
  onOpenShareModal: () => void;
}

async function postAnalytics(
  code: string,
  eventType: 'pdf_viewer_open' | 'citation_export',
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

export function ReportActionToolbar({
  code,
  title,
  author,
  publicationDate,
  version,
  pages,
  isPublished,
  displayMode,
  onChangeDisplayMode,
  onSelectTab,
  onOpenShareModal,
}: ReportActionToolbarProps) {
  const [datasetMenuOpen, setDatasetMenuOpen] = useState(false);
  const [citeModalOpen, setCiteModalOpen] = useState(false);
  const [copiedCiteFmt, setCopiedCiteFmt] = useState<string | null>(null);

  const canonicalUrl = `${CANONICAL_SITE_URL}/sectoral-eia/reports/${code.toLowerCase()}`;
  const yearMatch = publicationDate.match(/20\d{2}/);
  const pubYear = yearMatch ? yearMatch[0] : '2026';

  const citations = {
    apa: `${author}. (${pubYear}). ${title} (Research Dossier ${code}, ${version}, ${pages} pp.). Kashmir EcoWatch Western Himalayan (KEW). ${canonicalUrl}`,
    plain: `${code} — "${title}". ${author}, Kashmir EcoWatch Western Himalayan (${publicationDate}). Permanent URL: ${canonicalUrl}`,
    bibtex: `@techreport{${code.toLowerCase().replace(/[^a-z0-9]/g, '_')},
  title        = {${title}},
  author       = {{${author}}},
  institution  = {Kashmir EcoWatch Western Himalayan (KEW)},
  number       = {${code}},
  year         = {${pubYear}},
  note         = {${version}, ${pages} pages},
  url          = {${canonicalUrl}}
}`,
    ris: `TY  - RPRT
TI  - ${title}
AU  - ${author}
PB  - Kashmir EcoWatch Western Himalayan (KEW)
PY  - ${pubYear}
RN  - ${code}
ET  - ${version}
SP  - 1
EP  - ${pages}
UR  - ${canonicalUrl}
ER  -`,
  };

  const handleCopyCitation = async (fmt: keyof typeof citations) => {
    try {
      await navigator.clipboard.writeText(citations[fmt]);
      setCopiedCiteFmt(fmt);
      postAnalytics(code, 'citation_export', fmt);
      setTimeout(() => setCopiedCiteFmt(null), 2000);
    } catch {}
  };

  const handleDownloadCitationFile = (fmt: 'bibtex' | 'ris') => {
    const ext = fmt === 'bibtex' ? 'bib' : 'ris';
    const mime = fmt === 'bibtex' ? 'application/x-bibtex' : 'application/x-research-info-systems';
    const blob = new Blob([citations[fmt]], { type: `${mime};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${code}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    postAnalytics(code, 'citation_export', `${fmt}_file`);
  };

  return (
    <>
      <div className="sticky top-16 z-30 rounded-lg border border-slate-800 bg-slate-950/95 px-3.5 py-2.5 shadow-lg print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left: Return + Reading Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/sectoral-eia/reports"
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Research Library</span>
            </Link>

            <div className="inline-flex rounded-md border border-slate-700 bg-slate-900 p-0.5">
              <button
                type="button"
                onClick={() => onChangeDisplayMode('html')}
                className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-semibold transition-colors ${
                  displayMode === 'html'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>View Report</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeDisplayMode('pdf');
                  postAnalytics(code, 'pdf_viewer_open');
                }}
                className={`inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-semibold transition-colors ${
                  displayMode === 'pdf'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <FileText className="h-3.5 w-3.5" />
                <span>View PDF</span>
              </button>
            </div>
          </div>

          {/* Right: Download PDF, Dataset, Telemetry, GIS, Cite, Share, Print */}
          <div className="flex flex-wrap items-center gap-1.5">
            {isPublished ? (
              <a
                href={`/api/sectoral-eia/reports/${code.toLowerCase()}/pdf`}
                download
                className="inline-flex items-center gap-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download PDF ({pages} pp.)</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onChangeDisplayMode('pdf');
                  postAnalytics(code, 'pdf_viewer_open');
                }}
                className="inline-flex items-center gap-1.5 rounded-md border border-amber-500/40 bg-amber-950/40 px-2.5 py-1.5 text-xs font-semibold text-amber-300 hover:bg-amber-950/70 transition-colors"
                title="Final PDF activates after scientific validation; click to inspect scoping charter"
              >
                <Lock className="h-3.5 w-3.5" />
                <span>PDF Pending Validation</span>
              </button>
            )}

            {/* Dataset Export Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  if (isPublished) {
                    setDatasetMenuOpen((prev) => !prev);
                  } else {
                    onSelectTab('datasets');
                  }
                }}
                className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-slate-200 hover:border-emerald-500/50 hover:text-white transition-colors"
              >
                <Database className="h-3.5 w-3.5 text-emerald-400" />
                <span>{isPublished ? 'Download Dataset' : 'Dataset Status'}</span>
                {isPublished && <ChevronDown className="h-3 w-3 text-slate-400" />}
              </button>

              {isPublished && datasetMenuOpen && (
                <div
                  className="absolute right-0 mt-1.5 w-52 rounded-md border border-slate-700 bg-slate-900 py-1 shadow-xl z-40"
                  onMouseLeave={() => setDatasetMenuOpen(false)}
                >
                  {[
                    { fmt: 'csv', label: 'Export Validated CSV (.csv)' },
                    { fmt: 'xlsx', label: 'Export Excel Workbook (.xlsx)' },
                    { fmt: 'json', label: 'Export Structured JSON (.json)' },
                    { fmt: 'geojson', label: 'Export Spatial Layer (.geojson)' },
                  ].map((item) => (
                    <a
                      key={item.fmt}
                      href={`/api/sectoral-eia/reports/${code.toLowerCase()}/dataset?format=${item.fmt}`}
                      onClick={() => setDatasetMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 hover:text-emerald-300"
                    >
                      <span>{item.label}</span>
                      <Download className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => {
                onChangeDisplayMode('html');
                onSelectTab('telemetry');
              }}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors"
            >
              <Activity className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Explore Telemetry</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onChangeDisplayMode('html');
                onSelectTab('gis');
              }}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:border-emerald-500/50 hover:text-emerald-300 transition-colors"
            >
              <MapIcon className="h-3.5 w-3.5 text-emerald-400" />
              <span className="hidden sm:inline">View GIS Map</span>
            </button>

            <button
              type="button"
              onClick={() => setCiteModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-500 hover:text-white transition-colors"
            >
              <Quote className="h-3.5 w-3.5 text-amber-400" />
              <span>Cite</span>
            </button>

            <button
              type="button"
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-200 hover:border-slate-500 hover:text-white transition-colors"
            >
              <Share2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>Share</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
              title="Print scientific dossier"
            >
              <Printer className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      {/* Institutional Citation Modal */}
      {citeModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-4 print:hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="kew-cite-modal-title"
        >
          <div className="w-full max-w-2xl rounded-lg border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-6 py-4">
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                  Academic & Policy Citation Export · {code}
                </div>
                <h3 id="kew-cite-modal-title" className="text-base font-bold text-white mt-0.5">
                  Cite This Kashmir EcoWatch Research Dossier
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCiteModalOpen(false)}
                className="rounded-md border border-slate-700 bg-slate-900 p-1.5 text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {(
                [
                  { key: 'apa', label: 'APA 7th Edition' },
                  { key: 'plain', label: 'Institutional / Policy Brief Plain Text' },
                  { key: 'bibtex', label: 'BibTeX (.bib)' },
                  { key: 'ris', label: 'RIS Reference Manager (.ris)' },
                ] as const
              ).map((entry) => (
                <div
                  key={entry.key}
                  className="rounded-md border border-slate-800 bg-slate-950 p-3.5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      {entry.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {(entry.key === 'bibtex' || entry.key === 'ris') && (
                        <button
                          type="button"
                          onClick={() => handleDownloadCitationFile(entry.key)}
                          className="inline-flex items-center gap-1 rounded-sm border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-slate-300 hover:text-white"
                        >
                          <Download className="h-3 w-3" />
                          Download .{entry.key === 'bibtex' ? 'bib' : 'ris'}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleCopyCitation(entry.key)}
                        className="inline-flex items-center gap-1 rounded-sm border border-emerald-500/40 bg-emerald-950/50 px-2.5 py-1 text-xs font-semibold text-emerald-300 hover:bg-emerald-900/50"
                      >
                        {copiedCiteFmt === entry.key ? (
                          <>
                            <Check className="h-3 w-3" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <pre className="whitespace-pre-wrap break-words text-xs font-mono text-slate-300 leading-relaxed">
                    {citations[entry.key]}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
