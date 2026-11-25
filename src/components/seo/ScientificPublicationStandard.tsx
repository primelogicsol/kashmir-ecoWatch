'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Check,
  Copy,
  Database,
  Download,
  FileCheck,
  FlaskConical,
  Globe,
  MapPin,
  Scale,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { KEW_IDENTITY } from '@/lib/seo/entity-identity';
import { isVerifiedRealDoi, toAbsoluteCanonicalUrl } from '@/lib/seo/structured-data';

export interface EpistemicEvidenceClassification {
  measuredObservations: string[];
  documentedFindings: string[];
  scientificInferences: string[];
  excludedUnverifiedClaims: string[];
}

export interface ScientificPublicationStandardProps {
  archivalId: string;
  title: string;
  disciplines: string[];
  executiveSummary: string;
  keyFindings: string[];
  coordinates?: { lat: number; lng: number; elevationM?: number; precisionNote?: string };
  geographicScope: string;
  methodology: string;
  dataSources: string[];
  limitations: string[];
  riskAssessment?: string;
  references?: string[];
  evidenceClassification?: EpistemicEvidenceClassification;
  canonicalPath: string;
  datasetApiBasePath: string;
  publishedDate: string;
  revisedDate?: string;
  authors: string[];
  reviewer?: string;
  doi?: string;
  atlasHref?: string;
}

/**
 * Standardized KEW Scientific Assessment & Citation Surface.
 * Ensures every original research dossier, assessment, and hydrological record
 * exposes verifiable provenance, downloadable CSV/JSON data, and APA/BibTeX/RIS citations.
 */
export function ScientificPublicationStandard({
  archivalId,
  title,
  disciplines,
  executiveSummary,
  keyFindings,
  coordinates,
  geographicScope,
  methodology,
  dataSources,
  limitations,
  riskAssessment,
  references = [],
  evidenceClassification,
  canonicalPath,
  datasetApiBasePath,
  publishedDate,
  revisedDate,
  authors,
  reviewer = 'KEW Western Himalayan Scientific Review Desk',
  doi,
  atlasHref,
}: ScientificPublicationStandardProps) {
  const [copiedCitation, setCopiedCitation] = useState(false);

  const canonicalUrl = toAbsoluteCanonicalUrl(canonicalPath);
  const validDoi = isVerifiedRealDoi(doi) ? doi!.replace(/^https?:\/\/(dx\.)?doi\.org\//i, '').trim() : undefined;
  const pubYear = (publishedDate || '2026').slice(0, 4);
  const authorLine =
    authors && authors.length > 0 ? authors.join(', ') : KEW_IDENTITY.extendedName;

  const recommendedCitation = `${authorLine} (${pubYear}). ${title}. ${KEW_IDENTITY.extendedName} (${KEW_IDENTITY.shortName}), Archival ID: ${archivalId}.${
    validDoi ? ` https://doi.org/${validDoi}` : ` ${canonicalUrl}`
  }`;

  const handleCopyCitation = async () => {
    try {
      await navigator.clipboard.writeText(recommendedCitation);
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 2500);
    } catch {
      // Fallback ignored if clipboard blocked
    }
  };

  return (
    <section
      id="scientific-publication-standard"
      aria-label="Scientific Assessment, Provenance and Citation Standard"
      className="mt-12 scroll-mt-28"
    >
      <Card className="border border-emerald-500/25 bg-slate-900/75 backdrop-blur-md p-6 sm:p-8 space-y-6">
        {/* Header Lockup */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                KASHMIR ECOWATCH · SCIENTIFIC ASSESSMENT
              </span>
              <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded border border-white/10">
                ID: {archivalId}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {title}
            </h2>
            <p className="text-xs sm:text-sm font-mono text-teal-300">
              {disciplines.join(' · ')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <a
              href={`${datasetApiBasePath}?format=csv`}
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Dataset (CSV)</span>
            </a>
            <a
              href={`${datasetApiBasePath}?format=json`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/15 text-xs font-semibold transition-colors"
            >
              <Database className="w-3.5 h-3.5 text-sky-400" />
              <span>JSON Metadata</span>
            </a>
            {atlasHref && (
              <Link
                href={atlasHref}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-200 border border-white/15 text-xs font-semibold transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>GIS Atlas</span>
              </Link>
            )}
          </div>
        </div>

        {/* Executive Summary & Key Findings */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Executive Summary &amp; Environmental Baseline</span>
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">{executiveSummary}</p>
            </div>

            {keyFindings.length > 0 && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-sky-400 font-bold mb-2">
                  Key Scientific Findings
                </h3>
                <ul className="space-y-1.5">
                  {keyFindings.map((finding, idx) => (
                    <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                      <span className="text-emerald-400 font-bold mt-0.5">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold mb-1.5 flex items-center gap-1.5">
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Research Methodology</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{methodology}</p>
            </div>

            {riskAssessment && (
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/25">
                <h3 className="text-xs font-mono uppercase tracking-wider text-amber-300 font-bold mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Environmental Sensitivity &amp; Risk Assessment</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{riskAssessment}</p>
              </div>
            )}
          </div>

          {/* Right Column: Coordinates, Provenance, Limitations, Dates & Authorship */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-slate-950/90 border border-white/10 space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400 font-mono uppercase">Geographical Scope</span>
                <span className="text-white font-semibold text-right">{geographicScope}</span>
              </div>

              {coordinates && (
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400 font-mono uppercase">Coordinates</span>
                  <span className="text-emerald-300 font-mono">
                    {coordinates.lat.toFixed(4)}° N, {coordinates.lng.toFixed(4)}° E
                    {coordinates.elevationM ? ` · ${coordinates.elevationM}m` : ''}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400 font-mono uppercase">Publication Date</span>
                <span className="text-slate-200 font-mono">{publishedDate}</span>
              </div>

              {revisedDate && (
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400 font-mono uppercase">Last Verified</span>
                  <span className="text-slate-200 font-mono">{revisedDate}</span>
                </div>
              )}

              <div className="border-b border-white/5 pb-2 space-y-0.5">
                <span className="text-slate-400 font-mono uppercase block">Author / Source Attribution</span>
                <span className="text-white font-medium block">{authorLine}</span>
              </div>

              <div className="border-b border-white/5 pb-2 space-y-0.5">
                <span className="text-slate-400 font-mono uppercase block">Scientific Reviewer</span>
                <span className="text-teal-300 font-medium flex items-center gap-1">
                  <FileCheck className="w-3.5 h-3.5 shrink-0" />
                  <span>{reviewer}</span>
                </span>
              </div>

              <div className="space-y-0.5">
                <span className="text-slate-400 font-mono uppercase block">Open Science License</span>
                <a
                  href={KEW_IDENTITY.defaultLicenseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 inline-flex items-center gap-1 font-medium"
                >
                  <Scale className="w-3.5 h-3.5 shrink-0" />
                  <span>{KEW_IDENTITY.defaultLicenseLabel}</span>
                </a>
              </div>
            </div>

            {/* Data Sources & Limitations */}
            <div className="p-4 rounded-xl bg-slate-950/70 border border-white/10 space-y-3 text-xs">
              <div>
                <h4 className="font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Data Sources &amp; Provenance
                </h4>
                <ul className="space-y-1 text-slate-300">
                  {dataSources.map((src, i) => (
                    <li key={i}>• {src}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-white/5">
                <h4 className="font-mono uppercase tracking-wider text-slate-400 font-bold mb-1">
                  Known Scientific Limitations
                </h4>
                <ul className="space-y-1 text-slate-400">
                  {limitations.map((lim, i) => (
                    <li key={i}>• {lim}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Tier Epistemic Evidence Classification (if provided) */}
        {evidenceClassification && (
          <div className="pt-4 border-t border-white/10 space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Epistemic Evidence Classification (Measured vs. Literature vs. Inference)</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/25 space-y-1.5">
                <div className="font-mono font-bold uppercase text-emerald-300 text-[10px]">
                  1. Measured Geographic &amp; Satellite Observations
                </div>
                <ul className="space-y-1 text-slate-300">
                  {evidenceClassification.measuredObservations.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3.5 rounded-xl bg-sky-950/20 border border-sky-500/25 space-y-1.5">
                <div className="font-mono font-bold uppercase text-sky-300 text-[10px]">
                  2. Documented Literature &amp; Survey Baselines
                </div>
                <ul className="space-y-1 text-slate-300">
                  {evidenceClassification.documentedFindings.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/25 space-y-1.5">
                <div className="font-mono font-bold uppercase text-purple-300 text-[10px]">
                  3. Glacial &amp; Geomorphological Inference
                </div>
                <ul className="space-y-1 text-slate-300">
                  {evidenceClassification.scientificInferences.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/25 space-y-1.5">
                <div className="font-mono font-bold uppercase text-amber-300 text-[10px]">
                  4. Unverified Claims Excluded &amp; Uncertainties
                </div>
                <ul className="space-y-1 text-slate-300">
                  {evidenceClassification.excludedUnverifiedClaims.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Scientific References (if provided) */}
        {references.length > 0 && (
          <div className="pt-3 border-t border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold mb-2">
              Scientific References &amp; Primary Literature
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-xs text-slate-300">
              {references.map((ref, idx) => (
                <li key={idx} className="leading-relaxed">
                  {ref}
                </li>
              ))}
            </ol>
          </div>
        )}

        {/* Recommended Citation & Export Formats */}
        <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/20 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Recommended Academic Citation</span>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopyCitation}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-white/10 text-[11px] font-mono text-slate-200 cursor-pointer"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 text-slate-400" />
                    <span>Copy APA</span>
                  </>
                )}
              </button>
              <a
                href={`${datasetApiBasePath}?format=bib`}
                download
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-white/10 text-[11px] font-mono text-sky-300"
              >
                <Download className="w-3 h-3" />
                <span>BibTeX (.bib)</span>
              </a>
              <a
                href={`${datasetApiBasePath}?format=ris`}
                download
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-white/10 text-[11px] font-mono text-purple-300"
              >
                <Download className="w-3 h-3" />
                <span>RIS (.ris)</span>
              </a>
            </div>
          </div>
          <p className="text-xs text-slate-300 font-mono leading-relaxed break-words select-all">
            {recommendedCitation}
          </p>
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/5 text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1.5 text-emerald-400/90 font-semibold">
              <Globe className="w-3.5 h-3.5" />
              <span>PUBLISHED BY KASHMIR ECOWATCH WESTERN HIMALAYAN</span>
            </span>
            <span>Canonical URL: {canonicalUrl}</span>
          </div>
        </div>
      </Card>
    </section>
  );
}
