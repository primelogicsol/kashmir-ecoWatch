'use client';

import React, { Suspense, use, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileText,
  FlaskConical,
  Globe2,
  Layers,
  MapPin,
  Printer,
  Scale,
  ShieldCheck,
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EnvironmentalInvestigationsNav } from '@/components/environmental-investigations/EnvironmentalInvestigationsNav';
import {
  EvidenceClassificationBadge,
  InvestigationStatusBadge,
} from '@/components/environmental-investigations/EiaiBadges';
import { InvestigationAtlasMap } from '@/components/environmental-investigations/InvestigationAtlasMap';
import {
  CANONICAL_INVESTIGATIONS,
  generateCitationFormats,
  getDisciplineById,
  getDomainById,
  getInvestigationBySlugOrCode,
  GLOBAL_PRECEDENT_CASE_STUDIES,
  PUBLICATION_FORMATS,
  runScientificValidation,
} from '@/data/environmental-investigations';
import {
  EvidenceVerificationClass,
  InvestigationRecord,
  PublicationFormatId,
} from '@/types/environmental-investigations';

export default function CanonicalInvestigationReportPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 text-xs font-mono">
          Loading canonical investigation record...
        </div>
      }
    >
      <CanonicalInvestigationReportInner params={params} />
    </Suspense>
  );
}

function CanonicalInvestigationReportInner({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const initialFormat = (searchParams.get('format') as PublicationFormatId) || 'full-scientific';

  const [inv, setInv] = useState<InvestigationRecord | undefined>(() =>
    getInvestigationBySlugOrCode(slug, CANONICAL_INVESTIGATIONS)
  );
  const [activeFormat, setActiveFormat] = useState<PublicationFormatId>(initialFormat);
  const [evidenceFilter, setEvidenceFilter] = useState<EvidenceVerificationClass | 'ALL'>('ALL');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  useEffect(() => {
    const qFmt = searchParams.get('format') as PublicationFormatId | null;
    if (qFmt && PUBLICATION_FORMATS.some((f) => f.id === qFmt)) {
      setActiveFormat(qFmt);
    }
  }, [searchParams]);

  useEffect(() => {
    fetch(`/api/environmental-investigations/${encodeURIComponent(slug)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.success && d.investigation) {
          setInv(d.investigation);
        }
      })
      .catch(() => {});
  }, [slug]);

  const currentFormatDef = useMemo(
    () => PUBLICATION_FORMATS.find((f) => f.id === activeFormat) || PUBLICATION_FORMATS[0],
    [activeFormat]
  );

  const visibleSections = useMemo(() => {
    if (!inv) return [];
    // Dynamic suppression of non-applicable sections + format derivation filter
    const allowedNums = new Set(currentFormatDef.includedSectionNumbers);
    return inv.sections.filter(
      (sec) => sec.applicable && allowedNums.has(sec.sectionNumber)
    );
  }, [inv, currentFormatDef]);

  const suppressedSections = useMemo(
    () => (inv ? inv.sections.filter((s) => !s.applicable) : []),
    [inv]
  );

  const linkedPrecedents = useMemo(() => {
    if (!inv) return [];
    return GLOBAL_PRECEDENT_CASE_STUDIES.filter((p) =>
      p.linkedInvestigationCodes.includes(inv.code)
    );
  }, [inv]);

  const validationIssues = useMemo(
    () => (inv ? runScientificValidation(inv) : []),
    [inv]
  );

  const citations = useMemo(
    () => (inv ? generateCitationFormats(inv) : null),
    [inv]
  );

  const copyText = (key: string, text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  if (!inv) {
    return (
      <main className="min-h-screen bg-slate-950 text-slate-100 pt-32 pb-20">
        <EnvironmentalInvestigationsNav />
        <div className="page-content__inner py-16 max-w-2xl">
          <Card padding="lg" className="space-y-4">
            <h1 className="text-2xl font-bold text-white">Investigation Record Not Found</h1>
            <p className="text-sm text-slate-300">
              No canonical investigation matching <code className="text-emerald-400">{slug}</code> was found in the KEW-EIAI registry.
            </p>
            <Link href="/environmental-investigations/reports">
              <Button size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
                Back to Investigation Reports
              </Button>
            </Link>
          </Card>
        </div>
      </main>
    );
  }

  const primaryDomain = getDomainById(inv.primaryDomainId);
  const effectiveEvidenceMatrix =
    activeFormat === 'legal-evidence-brief'
      ? inv.evidenceMatrix.filter((e) => e.classification === 'Documented')
      : evidenceFilter === 'ALL'
      ? inv.evidenceMatrix
      : inv.evidenceMatrix.filter((e) => e.classification === evidenceFilter);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-24 print:bg-white print:text-black">
      <div className="print:hidden">
        <Heading
          label={`${inv.code} · ${primaryDomain?.name.toUpperCase() || 'INVESTIGATION'} · ${inv.version}`}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Environmental Investigations', href: '/environmental-investigations' },
            { label: 'Reports', href: '/environmental-investigations/reports' },
            { label: inv.code },
          ]}
          icon={<Scale className="w-6 h-6 text-emerald-400" />}
          title={
            <div className="overflow-visible pb-1">
              <KewBrandIdentity />
              <span className="block leading-[1.14] text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                {inv.title}
              </span>
            </div>
          }
          subtitle={inv.subtitle}
          images={[inv.heroImage]}
          actions={
            <>
              <InvestigationStatusBadge status={inv.status} label={inv.statusLabel} />
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.print()}
                icon={<Printer className="w-4 h-4 text-emerald-400" />}
              >
                Print / Archival PDF
              </Button>
              <a href={`/api/environmental-investigations/${inv.slug}?format=dataset`}>
                <Button variant="outline" size="sm" icon={<Download className="w-4 h-4" />}>
                  Open Dataset (JSON)
                </Button>
              </a>
              <a href={`/api/environmental-investigations/${inv.slug}?format=csv`}>
                <Button variant="outline" size="sm" icon={<Database className="w-4 h-4" />}>
                  Evidence Matrix (CSV)
                </Button>
              </a>
            </>
          }
        />

        <EnvironmentalInvestigationsNav />
      </div>

      {/* Print-Only Archival Masthead */}
      <div className="hidden print:block p-6 border-b border-slate-300 mb-6">
        <div className="text-xs font-mono uppercase tracking-wider">
          Kashmir EcoWatch — Environmental Investigations &amp; Accountability (KEW-EIAI)
        </div>
        <h1 className="text-2xl font-bold mt-1">{inv.title}</h1>
        <p className="text-sm mt-1">{inv.subtitle}</p>
        <div className="text-xs font-mono mt-2">
          Code: {inv.code} | Status: {inv.statusLabel} | Version: {inv.version} | Temporal Scope: {inv.temporalScope} | Updated: {inv.lastUpdated}
        </div>
      </div>

      <div className="page-content__inner py-8 space-y-8">
        {/* Non-Published Scoping Transparency Banner (for KEW-INV-0003..0008) */}
        {inv.status !== 'published' && (
          <Card className="border-amber-500/40 bg-slate-900">
            <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <strong className="text-amber-300 block">
                  Scoping Transparency Notice — {inv.statusLabel}
                </strong>
                <p className="text-slate-300 leading-relaxed">
                  In accordance with KEW-EIAI implementation standards, <strong className="text-white">{inv.code}</strong> is currently in <strong className="text-white">{inv.statusLabel}</strong>. It defines falsifiable scientific questions, geographic baselines, and initial verified literature anchors without asserting predetermined conclusions prior to full 24-section peer validation.
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* 12 PUBLICATION FORMATS DERIVATION BAR */}
        <Card padding="sm" className="print:hidden space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 block">
                Single Master Record · 12 Derived Publication Outputs
              </span>
              <div className="text-xs text-slate-300">
                Active View: <strong className="text-white">{currentFormatDef.title}</strong>{' '}
                <span className="text-slate-400">({currentFormatDef.intendedAudience})</span>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Showing {visibleSections.length} applicable sections
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {PUBLICATION_FORMATS.map((fmt) => (
              <button
                key={fmt.id}
                type="button"
                onClick={() => setActiveFormat(fmt.id)}
                className={`px-2.5 py-1.5 text-xs font-medium whitespace-nowrap border rounded-sm transition-colors ${
                  activeFormat === fmt.id
                    ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                    : 'bg-slate-950 text-slate-300 border-white/10 hover:text-white hover:bg-slate-800'
                }`}
              >
                {fmt.title}
              </button>
            ))}
          </div>
        </Card>

        {/* SPECIALIZED FORMAT PANELS (Citation, Dataset, Infographic, GIS, Legal Brief) */}
        {activeFormat === 'citation-record' && citations && (
          <Card padding="lg" className="space-y-4 border-emerald-500/30">
            <h2 className="text-lg font-bold text-white">
              Canonical Academic Citation Records ({inv.code})
            </h2>
            {[
              { id: 'apa', label: 'APA 7th Edition', content: citations.apa },
              { id: 'bibtex', label: 'BibTeX', content: citations.bibtex },
              { id: 'ris', label: 'RIS (Zotero / EndNote / Mendeley)', content: citations.ris },
            ].map((c) => (
              <div key={c.id} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-300">{c.label}</span>
                  <button
                    type="button"
                    onClick={() => copyText(c.id, c.content)}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-slate-950 border border-white/15 text-slate-200 hover:text-white text-[11px]"
                  >
                    {copiedKey === c.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" /> Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-3 bg-slate-950 border border-white/10 rounded-sm text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap">
                  {c.content}
                </pre>
              </div>
            ))}
          </Card>
        )}

        {activeFormat === 'open-dataset' && (
          <Card padding="lg" className="space-y-4 border-cyan-500/30">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-white">
                  Open Verification Dataset ({inv.code})
                </h2>
                <p className="text-xs text-slate-400">
                  Machine-readable export derived live from the canonical master investigation record
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <a href={`/api/environmental-investigations/${inv.slug}?format=dataset`}>
                  <Button size="sm" icon={<Download className="w-4 h-4" />}>
                    Download Full JSON
                  </Button>
                </a>
                <a href={`/api/environmental-investigations/${inv.slug}?format=csv`}>
                  <Button size="sm" variant="secondary" icon={<Database className="w-4 h-4 text-emerald-400" />}>
                    Download Evidence CSV
                  </Button>
                </a>
              </div>
            </div>
          </Card>
        )}

        {activeFormat === 'scientific-infographic' && (
          <Card padding="lg" className="space-y-6 border-emerald-500/30">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="text-xs font-mono text-emerald-400">{inv.code} · INFOGRAPHIC SUMMARY</span>
                <h2 className="text-xl font-bold text-white">{inv.shortTitle}</h2>
              </div>
              <Badge variant="info" size="sm">{inv.temporalScope}</Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950 rounded-lg border border-white/10">
                <span className="text-[11px] text-slate-400 uppercase block">Documented Claims</span>
                <span className="text-2xl font-black text-emerald-400 tabular-nums">
                  {inv.evidenceMatrix.filter((e) => e.classification === 'Documented').length}
                </span>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-white/10">
                <span className="text-[11px] text-slate-400 uppercase block">Unverified / Open</span>
                <span className="text-2xl font-black text-amber-400 tabular-nums">
                  {inv.evidenceMatrix.filter((e) => e.classification === 'Unverified' || e.classification === 'Provisionally Supported').length}
                </span>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-white/10">
                <span className="text-[11px] text-slate-400 uppercase block">Sciences Applied</span>
                <span className="text-2xl font-black text-cyan-400 tabular-nums">
                  {inv.disciplineIds.length}
                </span>
              </div>
              <div className="p-4 bg-slate-950 rounded-lg border border-white/10">
                <span className="text-[11px] text-slate-400 uppercase block">Institutions Audited</span>
                <span className="text-2xl font-black text-white tabular-nums">
                  {inv.accountabilityMatrix.length}
                </span>
              </div>
            </div>
          </Card>
        )}

        {activeFormat === 'legal-evidence-brief' && (
          <Card className="border-emerald-500/40 bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <strong className="text-emerald-300 uppercase tracking-wider block">
                  Environmental PIL Legal Evidence Brief Filter Active
                </strong>
                <p className="text-slate-300">
                  Restricting Evidence Matrix strictly to <strong>Documented</strong> claims backed by statutory CAG audits, judicial/NGT orders, or peer-reviewed records suitable for PIL evidentiary scrutiny.
                </p>
              </div>
              <Link href="/resources/environmental-pil">
                <Button size="sm" variant="secondary" icon={<Scale className="w-3.5 h-3.5 text-emerald-400" />}>
                  Open Environmental PIL Portal
                </Button>
              </Link>
            </div>
          </Card>
        )}

        {/* MAIN TWO-COLUMN SCIENTIFIC PUBLICATION LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky Table of Contents & Metadata Sidebar */}
          <aside className="lg:col-span-3 space-y-5 lg:sticky lg:top-32 print:hidden">
            <Card padding="sm" className="space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-white/10 pb-2">
                Report Contents ({visibleSections.length})
              </div>
              <nav aria-label="Report sections" className="space-y-1 max-h-[52vh] overflow-y-auto pr-1">
                {visibleSections.map((sec) => (
                  <a
                    key={sec.sectionNumber}
                    href={`#section-${sec.sectionNumber}`}
                    className="flex items-start gap-2 px-2 py-1.5 rounded-sm text-xs text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <span className="font-mono text-emerald-400 font-bold shrink-0">
                      {sec.sectionNumber}.
                    </span>
                    <span className="leading-snug">{sec.title}</span>
                  </a>
                ))}
              </nav>

              {suppressedSections.length > 0 && (
                <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400">
                  <strong className="text-slate-300 block">Dynamically Omitted:</strong>
                  {suppressedSections.map((s) => (
                    <div key={s.sectionNumber}>
                      Sec {s.sectionNumber} ({s.title}): {s.nonApplicableReason || 'Not applicable to subject'}
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Metadata & Linked KEW Systems */}
            <Card padding="sm" className="space-y-3 text-xs">
              <div className="font-bold uppercase tracking-wider text-slate-300 border-b border-white/10 pb-2">
                Spatial &amp; Ecosystem Metadata
              </div>
              <div>
                <span className="text-slate-400 block">Watershed / Basin:</span>
                <span className="text-white font-medium">{inv.watershedOrBasin}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Districts:</span>
                <span className="text-white font-medium">{inv.districts.join(', ')}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Elevation Envelope:</span>
                <span className="text-white font-mono">{inv.elevationRangeM}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">Connected KEW Modules:</span>
                <div className="space-y-1.5">
                  {inv.linkedKewModules.map((m) => (
                    <Link
                      key={m.route}
                      href={m.route}
                      className="flex items-center justify-between p-2 bg-slate-950 border border-white/10 rounded-sm text-emerald-300 hover:border-emerald-500/40"
                    >
                      <span>{m.moduleName}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            </Card>

            {/* Stage 10 Validation Status */}
            <Card padding="sm" className="space-y-2 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Stage 10 Integrity Check</span>
              </div>
              {validationIssues.filter((v) => v.severity === 'error').length === 0 ? (
                <p className="text-slate-300">
                  0 citation or deterministic-overreach errors detected across {inv.evidenceMatrix.length} graded claims.
                </p>
              ) : (
                <p className="text-red-300">
                  {validationIssues.filter((v) => v.severity === 'error').length} validation error(s) flagged.
                </p>
              )}
            </Card>
          </aside>

          {/* Right Main Scientific Publication Column */}
          <div className="lg:col-span-9 space-y-8">
            {visibleSections.map((sec) => (
              <section
                key={sec.sectionNumber}
                id={`section-${sec.sectionNumber}`}
                className="scroll-mt-32"
              >
                <Card padding="lg" className="space-y-4">
                  {/* Section Header */}
                  <div className="flex items-center gap-2.5 border-b border-white/10 pb-3">
                    <span className="px-2 py-0.5 font-mono text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 rounded-sm">
                      SECTION {sec.sectionNumber}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-white">
                      {sec.title}
                    </h2>
                  </div>

                  {/* Lead Scientific Summary */}
                  <p className="text-sm sm:text-base font-medium text-emerald-200/95 leading-relaxed">
                    {sec.leadSummary}
                  </p>

                  {/* Quantitative Callouts (Section 01) */}
                  {sec.quantitativeCallouts && sec.quantitativeCallouts.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                      {sec.quantitativeCallouts.map((qc, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-950/80 rounded-lg border border-white/10"
                        >
                          <div className="text-[10px] uppercase tracking-wider text-slate-400">
                            {qc.label}
                          </div>
                          <div className="text-base sm:text-lg font-bold text-white tabular-nums mt-0.5">
                            {qc.value}{' '}
                            {qc.unit && (
                              <span className="text-xs font-normal text-emerald-400">
                                {qc.unit}
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 mt-1">
                            {qc.sourceTag}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Body Paragraphs */}
                  <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {sec.bodyParagraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {/* SECTION 02: Scoping Questions */}
                  {sec.sectionNumber === '02' && inv.scopingQuestions.length > 0 && (
                    <div className="p-4 bg-slate-950/70 rounded-lg border border-white/10 space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 block">
                        Governing Falsifiable Investigation Questions:
                      </span>
                      <ol className="list-decimal pl-5 space-y-1.5 text-xs sm:text-sm text-slate-200">
                        {inv.scopingQuestions.map((q, idx) => (
                          <li key={idx}>{q}</li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* SECTION 03: Connected Ecosystems */}
                  {sec.sectionNumber === '03' && inv.connectedEcosystems.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {inv.connectedEcosystems.map((eco) => (
                        <span
                          key={eco}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs bg-slate-950 border border-white/10 rounded-sm text-slate-200"
                        >
                          <MapPin className="w-3 h-3 text-emerald-400" />
                          {eco}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* SECTION 04: Historical Chronology Ledger */}
                  {sec.sectionNumber === '04' && inv.chronology.length > 0 && (
                    <div className="responsive-table-container mb-0">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                            <th className="py-2.5 px-3">Period</th>
                            <th className="py-2.5 px-3">Milestone / Intervention</th>
                            <th className="py-2.5 px-3">Documented Record</th>
                            <th className="py-2.5 px-3">Source</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {inv.chronology.map((ch, idx) => (
                            <tr key={idx}>
                              <td className="py-3 px-3 font-mono font-bold text-emerald-400 whitespace-nowrap">
                                {ch.period}
                              </td>
                              <td className="py-3 px-3 font-semibold text-white">
                                <div>{ch.eventTitle}</div>
                                <Badge variant="outline" size="sm" className="mt-1">
                                  {ch.significance}
                                </Badge>
                              </td>
                              <td className="py-3 px-3 text-slate-300 leading-relaxed max-w-md">
                                {ch.documentedRecord}
                              </td>
                              <td className="py-3 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                                {ch.sourceRef}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* SECTION 06: Project & Intervention Inventory */}
                  {sec.sectionNumber === '06' && inv.interventionInventory.length > 0 && (
                    <div className="responsive-table-container mb-0">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                            <th className="py-2.5 px-3">Intervention</th>
                            <th className="py-2.5 px-3">Executing Agency &amp; Period</th>
                            <th className="py-2.5 px-3">Scale / Outlay</th>
                            <th className="py-2.5 px-3">Documented Outcome</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {inv.interventionInventory.map((it) => (
                            <tr key={it.id}>
                              <td className="py-3 px-3 font-semibold text-white">
                                <span className="font-mono text-[10px] text-emerald-400 block">
                                  {it.id}
                                </span>
                                {it.name}
                              </td>
                              <td className="py-3 px-3 text-slate-300">
                                <div>{it.executingAgency}</div>
                                <div className="font-mono text-[10px] text-slate-400">{it.period}</div>
                              </td>
                              <td className="py-3 px-3 text-slate-300">{it.reportedScaleOrOutlay}</td>
                              <td className="py-3 px-3 text-slate-300 max-w-sm leading-relaxed">
                                {it.documentedOutcome}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* SECTION 07: Applicable Scientific Disciplines */}
                  {sec.sectionNumber === '07' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {inv.disciplineIds.map((dId) => {
                        const d = getDisciplineById(dId);
                        if (!d) return null;
                        return (
                          <div
                            key={dId}
                            className="p-3 bg-slate-950/70 rounded-lg border border-white/10 space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-xs text-white">{d.name}</span>
                              <span className="text-[10px] text-slate-400">{d.clusterName}</span>
                            </div>
                            <code className="text-[11px] font-mono text-cyan-300 block">
                              {d.governingEquationOrModel}
                            </code>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* SECTION 08: Discipline-Specific Scientific Analysis */}
                  {sec.sectionNumber === '08' && inv.disciplineFindings.length > 0 && (
                    <div className="space-y-3">
                      {inv.disciplineFindings.map((df) => (
                        <div
                          key={df.disciplineId}
                          className="p-4 bg-slate-950/80 rounded-lg border border-white/10 space-y-2"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="font-bold text-sm text-white">
                              <FlaskConical className="w-4 h-4 text-cyan-400 inline mr-1.5" />
                              {df.disciplineName} ({df.clusterName})
                            </span>
                            <EvidenceClassificationBadge classification={df.verificationClass} />
                          </div>
                          <div className="p-2 bg-slate-900 rounded-sm border border-cyan-500/20 font-mono text-xs text-cyan-200">
                            {df.equationOrMetricUsed}
                          </div>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            <strong>Empirical Finding:</strong> {df.empiricalFinding}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            <strong>Uncertainty &amp; Methodological Limits:</strong>{' '}
                            {df.uncertaintyAndLimitations}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SECTION 09: Embedded Live GIS Map */}
                  {sec.sectionNumber === '09' && (
                    <div className="print:hidden pt-2">
                      <InvestigationAtlasMap
                        investigations={CANONICAL_INVESTIGATIONS}
                        highlightCode={inv.code}
                        className="h-[420px]"
                      />
                    </div>
                  )}

                  {/* SECTION 14: Linked Asian & Global Precedents */}
                  {sec.sectionNumber === '14' && linkedPrecedents.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {linkedPrecedents.map((p) => (
                        <div
                          key={p.id}
                          className="p-4 bg-slate-950/70 rounded-lg border border-white/10 space-y-1.5 text-xs"
                        >
                          <Badge variant="info" size="sm">{p.countryOrRegion}</Badge>
                          <h4 className="font-bold text-sm text-white">{p.title}</h4>
                          <p className="text-slate-300">{p.transferableLessonForKashmir}</p>
                          <p className="text-[11px] text-amber-300/90">
                            Caveat: {p.structuralDifferencesNote}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SECTION 16: Institutional Accountability Matrix */}
                  {sec.sectionNumber === '16' && inv.accountabilityMatrix.length > 0 && (
                    <div className="space-y-4">
                      {inv.accountabilityMatrix.map((acc) => (
                        <div
                          key={acc.id}
                          className="p-4 bg-slate-950/80 rounded-lg border border-white/10 space-y-3 text-xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2">
                            <h3 className="font-bold text-sm text-white">
                              {acc.responsibleInstitution} ({acc.institutionAcronym})
                            </h3>
                            <Badge variant="info" size="sm">{acc.followUpStatus}</Badge>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <strong className="text-slate-200 block">Statutory Mandate:</strong>
                              <span className="text-slate-300">{acc.statutoryMandate}</span>
                            </div>
                            <div>
                              <strong className="text-slate-200 block">Project &amp; Financial Ownership:</strong>
                              <span className="text-slate-300">
                                {acc.projectOwnership} — {acc.financialResponsibility}
                              </span>
                            </div>
                            <div>
                              <strong className="text-amber-300 block">Documented Audit / Scientific Findings:</strong>
                              <span className="text-slate-300">{acc.documentedFindings}</span>
                            </div>
                            <div>
                              <strong className="text-emerald-300 block">Official Institutional Response:</strong>
                              <span className="text-slate-300">{acc.institutionalResponse}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SECTION 18: Interactive Scientific Evidence Verification Matrix */}
                  {sec.sectionNumber === '18' && (
                    <div className="space-y-3">
                      {activeFormat !== 'legal-evidence-brief' && (
                        <div className="flex flex-wrap gap-1.5 print:hidden">
                          {(
                            [
                              'ALL',
                              'Documented',
                              'Provisionally Supported',
                              'Unverified',
                              'Unsupported',
                            ] as const
                          ).map((cls) => (
                            <button
                              key={cls}
                              type="button"
                              onClick={() => setEvidenceFilter(cls)}
                              className={`px-2.5 py-1 text-[11px] font-medium border rounded-sm ${
                                evidenceFilter === cls
                                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                                  : 'bg-slate-950 text-slate-400 border-white/10 hover:text-white'
                              }`}
                            >
                              {cls}
                            </button>
                          ))}
                        </div>
                      )}

                      <div className="responsive-table-container mb-0">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead>
                            <tr className="border-b border-white/10 text-slate-400 uppercase text-[10px]">
                              <th className="py-2.5 px-3">Assertion</th>
                              <th className="py-2.5 px-3">Source Basis</th>
                              <th className="py-2.5 px-3">Classification</th>
                              <th className="py-2.5 px-3">Verification Details</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5">
                            {effectiveEvidenceMatrix.map((ev) => (
                              <tr key={ev.id}>
                                <td className="py-3 px-3 font-semibold text-white max-w-xs">
                                  <span className="font-mono text-[10px] text-slate-400 block">
                                    {ev.id}
                                  </span>
                                  {ev.assertion}
                                </td>
                                <td className="py-3 px-3 text-slate-300 whitespace-nowrap">
                                  {ev.sourceCategory}
                                </td>
                                <td className="py-3 px-3">
                                  <EvidenceClassificationBadge classification={ev.classification} />
                                </td>
                                <td className="py-3 px-3 text-slate-300 max-w-md leading-relaxed">
                                  <p>{ev.evidenceBasisSummary}</p>
                                  {ev.methodologicalRequirement && (
                                    <p className="text-[11px] font-mono text-amber-300 mt-1">
                                      Required: {ev.methodologicalRequirement}
                                    </p>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* SECTION 19: Unanswered Questions */}
                  {sec.sectionNumber === '19' && inv.unansweredQuestions.length > 0 && (
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-200 list-disc pl-5">
                      {inv.unansweredQuestions.map((uq, idx) => (
                        <li key={idx}>{uq}</li>
                      ))}
                    </ul>
                  )}

                  {/* SECTION 20: Alternative Solutions */}
                  {sec.sectionNumber === '20' && inv.alternativeSolutions.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {inv.alternativeSolutions.map((alt, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 bg-slate-950/70 rounded-lg border border-white/10 space-y-1.5 text-xs"
                        >
                          <h4 className="font-bold text-white">{alt.title}</h4>
                          <p className="text-slate-300">{alt.mechanism}</p>
                          <p className="text-[11px] text-emerald-300 font-mono">
                            Precedent: {alt.evidencePrecedent}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SECTION 21: Recommendations */}
                  {sec.sectionNumber === '21' && inv.recommendations.length > 0 && (
                    <div className="space-y-3">
                      {inv.recommendations.map((rec) => (
                        <div
                          key={rec.id}
                          className="p-4 bg-slate-950/80 rounded-lg border border-white/10 space-y-1.5 text-xs"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <Badge variant="success" size="sm" className="font-mono">
                              {rec.horizon}
                            </Badge>
                            <Badge variant="outline" size="sm">{rec.status}</Badge>
                          </div>
                          <h4 className="font-bold text-sm text-white">{rec.title}</h4>
                          <p className="text-slate-300">{rec.actionSpecification}</p>
                          <div className="text-[11px] text-slate-400 pt-1">
                            <strong className="text-slate-200">Target:</strong> {rec.targetInstitution} •{' '}
                            <strong className="text-cyan-300">Indicator:</strong> {rec.verificationIndicator}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* SECTION 23: Traceable References & DOI Provenance */}
                  {sec.sectionNumber === '23' && inv.references.length > 0 && (
                    <ol className="space-y-3 text-xs text-slate-300 list-decimal pl-5">
                      {inv.references.map((ref) => (
                        <li key={ref.id} className="leading-relaxed">
                          <span className="font-mono text-[10px] text-emerald-400 mr-1.5">
                            [{ref.id}]
                          </span>
                          <strong className="text-white">
                            {ref.authorsOrBody} ({ref.year}).
                          </strong>{' '}
                          {ref.title}. <em>{ref.publicationOrSeries}</em>.{' '}
                          <Badge variant="outline" size="sm" className="ml-1">
                            {ref.referenceType}
                          </Badge>
                          {ref.externalUrl && (
                            <a
                              href={ref.externalUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 ml-2 text-emerald-400 hover:underline font-mono"
                            >
                              <span>DOI: {ref.doiOrOfficialRef}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          <div className="text-[11px] text-slate-400 mt-0.5">
                            Provenance: {ref.provenanceNote}
                          </div>
                        </li>
                      ))}
                    </ol>
                  )}

                  {/* SECTION 24: Investigation Updates & Correction Register */}
                  {sec.sectionNumber === '24' && inv.updatesLog.length > 0 && (
                    <div className="space-y-2 text-xs">
                      {inv.updatesLog.map((up, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-slate-950/70 rounded-sm border border-white/10 flex flex-wrap items-center justify-between gap-2"
                        >
                          <div>
                            <span className="font-mono font-bold text-emerald-400 mr-2">
                              {up.date} ({up.version})
                            </span>
                            <Badge variant="outline" size="sm" className="mr-2">
                              {up.entryType}
                            </Badge>
                            <span className="text-slate-200">{up.summary}</span>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400">
                            {up.verifiedBy}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
