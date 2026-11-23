'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  Copy,
  Check,
  Download,
  ArrowUpRight,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Satellite,
  Scale,
  Droplet,
  Activity,
  Layers,
  BarChart3,
  Calendar,
  Users,
  Compass,
  FileText,
  Sparkles,
  Info,
  Clock,
  Globe,
  MapPin,
  HelpCircle,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  EPISTEMIC_TIER_META,
  EXAMPLE_SCIENTIFIC_QUESTIONS,
  EpistemicTierKey,
  ScientificSynthesisResponse,
  SynthesizedEvidenceFinding,
} from '@/lib/search/scientific-qa-types';
import { SEARCH_DOMAIN_META, SearchDomain } from '@/lib/search/types';

const DOMAIN_ICONS: Record<SearchDomain, React.ElementType> = {
  environmental_modules: Layers,
  hazard_intelligence: AlertTriangle,
  biodiversity_conservation: Activity,
  water_cryosphere: Droplet,
  earth_human_impact: Satellite,
  environmental_monitoring: BarChart3,
  scientific_research: BookOpen,
  environmental_accountability: Scale,
  ecological_calendar: Calendar,
  community_participation: Users,
  geographic_intelligence: Compass,
};

function getTierStyles(tier: EpistemicTierKey) {
  switch (tier) {
    case 'tier_1_verified':
      return {
        badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35',
        iconBox: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
        bar: 'bg-emerald-500',
      };
    case 'tier_2_spaceborne_assessed':
      return {
        badge: 'bg-sky-500/15 text-sky-300 border-sky-500/35',
        iconBox: 'bg-sky-500/10 border-sky-500/25 text-sky-400',
        bar: 'bg-sky-500',
      };
    case 'tier_3_operational_preliminary':
      return {
        badge: 'bg-amber-500/15 text-amber-300 border-amber-500/35',
        iconBox: 'bg-amber-500/10 border-amber-500/25 text-amber-400',
        bar: 'bg-amber-500',
      };
  }
}

function getSufficiencyBannerStyle(status: ScientificSynthesisResponse['epistemicStatus']) {
  switch (status) {
    case 'EVIDENCE_SUPPORTED':
      return {
        wrap: 'bg-emerald-950/40 border-emerald-500/35 text-emerald-200',
        pill: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        icon: ShieldCheck,
      };
    case 'PARTIALLY_SUPPORTED':
      return {
        wrap: 'bg-amber-950/40 border-amber-500/35 text-amber-200',
        pill: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        icon: Info,
      };
    case 'INSUFFICIENT_INDEXED_EVIDENCE':
      return {
        wrap: 'bg-rose-950/40 border-rose-500/35 text-rose-200',
        pill: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        icon: AlertTriangle,
      };
  }
}

interface ScientificQuestionWorkbenchProps {
  data: ScientificSynthesisResponse | null;
  loading: boolean;
  error: string | null;
  onSelectQuestion: (question: string) => void;
  onSwitchToIndexSearch: () => void;
}

export function ScientificQuestionWorkbench({
  data,
  loading,
  error,
  onSelectQuestion,
  onSwitchToIndexSearch,
}: ScientificQuestionWorkbenchProps) {
  const [matrixGrouping, setMatrixGrouping] = useState<'epistemic_tier' | 'domain'>('epistemic_tier');
  const [highlightedCitation, setHighlightedCitation] = useState<number | null>(null);
  const [copiedAction, setCopiedAction] = useState<'markdown' | 'citations' | 'bibtex' | null>(null);

  const jumpToCitation = useCallback((num: number) => {
    setHighlightedCitation(num);
    const el = document.getElementById(`kew-citation-${num}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    setTimeout(() => {
      setHighlightedCitation((prev) => (prev === num ? null : prev));
    }, 2800);
  }, []);

  const handleCopy = async (kind: 'markdown' | 'citations' | 'bibtex', text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAction(kind);
      setTimeout(() => setCopiedAction(null), 2200);
    } catch {}
  };

  const handleDownloadMarkdown = () => {
    if (!data?.markdownBrief) return;
    const blob = new Blob([data.markdownBrief], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const slug = data.question
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 48);
    a.href = url;
    a.download = `kew-evidence-brief-${slug || 'inquiry'}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Render inline [1] or [1, 2, 3] markers into interactive citation buttons
  const renderCitationLockedText = (text: string) => {
    const parts = text.split(/(\[\d+(?:,\s*\d+)*\])/g);
    return parts.map((part, idx) => {
      const m = part.match(/^\[(\d+(?:,\s*\d+)*)\]$/);
      if (!m) return <React.Fragment key={idx}>{part}</React.Fragment>;
      const nums = m[1].split(',').map((s) => Number(s.trim())).filter((n) => !Number.isNaN(n));
      return (
        <span key={idx} className="inline-flex items-center gap-1 mx-0.5 align-baseline">
          {nums.map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => jumpToCitation(n)}
              title={`Jump to Traceable Reference [${n}]`}
              className="inline-flex items-center px-1.5 py-0.5 rounded bg-emerald-500/15 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-bold leading-none transition-colors cursor-pointer"
            >
              [{n}]
            </button>
          ))}
        </span>
      );
    });
  };

  // Loading Skeleton
  if (loading && !data) {
    return (
      <div className="space-y-5">
        <div className="kew-card-shell h-36 animate-pulse bg-slate-900/70" />
        <div className="kew-card-shell h-56 animate-pulse bg-slate-900/70" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="kew-card-shell h-48 animate-pulse bg-slate-900/60" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-rose-950/50 border border-rose-500/30 text-sm text-rose-200">
        {error}
      </div>
    );
  }

  // Empty State: Curated Scientific Inquiry Workbench & Epistemic Protocol
  if (!data) {
    return (
      <div className="space-y-8 pt-2">
        {/* Epistemic Governance Notice */}
        <Card className="kew-card-shell p-5 sm:p-6">
          <div className="kew-card-top-row">
            <div className="kew-card-icon-box bg-emerald-500/10 border-emerald-500/25 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <Badge variant="outline" size="sm" className="border-emerald-500/35 text-emerald-300 font-mono">
              Closed-World Citation Protocol
            </Badge>
          </div>
          <h2 className="kew-card-title text-lg sm:text-xl mb-2">
            Evidence-Grounded Scientific Question &amp; Synthesis Protocol
          </h2>
          <p className="kew-card-desc text-xs sm:text-sm mb-4">
            Every scientific answer is compiled deterministically and exclusively from public, traceable Kashmir EcoWatch registries. Findings are stratified across three non-conflated epistemic tiers — separating peer-reviewed, judicial, and field-verified baselines (Tier I) from multi-sensor satellite assessments (Tier II) and preliminary candidate alerts or reanalysis grids (Tier III). Where indexed data is absent, the engine abstains rather than extrapolating.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3 border-t border-white/10 text-xs">
            {(['tier_1_verified', 'tier_2_spaceborne_assessed', 'tier_3_operational_preliminary'] as const).map(
              (tKey) => {
                const meta = EPISTEMIC_TIER_META[tKey];
                const st = getTierStyles(tKey);
                return (
                  <div key={tKey} className="p-3 rounded-lg bg-slate-950 border border-white/10 space-y-1">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${st.badge}`}>
                      {meta.shortCode}
                    </span>
                    <div className="font-semibold text-white text-xs pt-0.5">{meta.title}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{meta.methodologyNote}</p>
                  </div>
                );
              }
            )}
          </div>
        </Card>

        {/* Representative Scientific Inquiries */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Representative Scientific &amp; Policy Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Select a research question below or enter your own inquiry above to assemble a citation-locked brief
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {EXAMPLE_SCIENTIFIC_QUESTIONS.map((item, idx) => (
              <Card
                key={idx}
                className="kew-card-shell kew-card-shell--interactive h-full p-5 group"
                onClick={() => onSelectQuestion(item.question)}
              >
                <div className="kew-card-top-row">
                  <div className="kew-card-icon-box bg-emerald-500/10 border-emerald-500/25 text-emerald-400">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-emerald-500/25">
                    {item.domainTag}
                  </span>
                </div>

                <h3 className="kew-card-title text-sm sm:text-base group-hover:text-emerald-300 transition-colors mb-2">
                  {item.question}
                </h3>

                <p className="kew-card-desc text-xs mb-4">{item.scopeHint}</p>

                <div className="kew-card-cta">
                  <span>Synthesize Cited Evidence</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    );
  }

  const sufStyle = getSufficiencyBannerStyle(data.epistemicStatus);
  const SufIcon = sufStyle.icon;
  const dist = data.epistemicDistribution;
  const totalCited = Math.max(1, dist.totalCitedRecords);

  // Group findings for the Evidence Matrix
  const groupedFindings: Array<{
    groupId: string;
    title: string;
    subtitle: string;
    badgeClass: string;
    items: SynthesizedEvidenceFinding[];
  }> = [];

  if (matrixGrouping === 'epistemic_tier') {
    for (const tKey of [
      'tier_1_verified',
      'tier_2_spaceborne_assessed',
      'tier_3_operational_preliminary',
    ] as const) {
      const items = data.findings.filter((f) => f.tier === tKey);
      if (items.length === 0) continue;
      const meta = EPISTEMIC_TIER_META[tKey];
      groupedFindings.push({
        groupId: tKey,
        title: `${meta.shortCode} — ${meta.title}`,
        subtitle: meta.subtitle,
        badgeClass: getTierStyles(tKey).badge,
        items,
      });
    }
  } else {
    const byDom = new Map<SearchDomain, SynthesizedEvidenceFinding[]>();
    for (const f of data.findings) {
      const arr = byDom.get(f.domain) || [];
      arr.push(f);
      byDom.set(f.domain, arr);
    }
    for (const [dom, items] of byDom.entries()) {
      const dMeta = SEARCH_DOMAIN_META[dom];
      groupedFindings.push({
        groupId: dom,
        title: dMeta?.label || dom,
        subtitle: dMeta?.description || '',
        badgeClass: 'bg-slate-800 text-slate-200 border-white/15',
        items,
      });
    }
  }

  return (
    <div className="space-y-8">
      {/* 1. Parsed Scientific Scope & Epistemic Sufficiency Header */}
      <div className={`p-4 sm:p-5 rounded-xl border ${sufStyle.wrap} space-y-4`}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <SufIcon className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${sufStyle.pill}`}>
                  {data.epistemicStatusLabel}
                </span>
                <span className="text-xs font-mono text-slate-400">
                  Compiled in {data.latencyMs} ms from {data.totalCorpusSize.toLocaleString()} public KEW records
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white mt-1.5 break-words">
                &ldquo;{data.question}&rdquo;
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onSwitchToIndexSearch}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-slate-900 border border-white/15 text-xs font-semibold text-slate-200 hover:text-emerald-300 transition-colors cursor-pointer shrink-0"
          >
            <span>Explore Raw Index &amp; GIS Map</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Parsed Scope Metadata Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-3 border-t border-white/10 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-950/75 border border-white/10">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Focal Entities &amp; Subjects
            </div>
            <div className="text-white font-semibold break-words">
              {data.parsedScope.focalEntities.length > 0
                ? data.parsedScope.focalEntities.join(' · ')
                : data.parsedScope.extractedKeywords.join(', ') || 'General Inquiry'}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/75 border border-white/10">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Geographic Resolution
            </div>
            <div className="text-sky-300 font-semibold break-words">
              {data.parsedScope.subregions.length > 0
                ? data.parsedScope.subregions.join(', ')
                : 'Western Himalaya'}
              {data.parsedScope.districts.length > 0 && (
                <span className="text-slate-300 font-normal">
                  {' '}({data.parsedScope.districts.slice(0, 3).join(', ')})
                </span>
              )}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/75 border border-white/10">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Temporal Window
            </div>
            <div className="text-emerald-300 font-semibold break-words">
              {data.parsedScope.temporalWindow.label}
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-950/75 border border-white/10">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
              Epistemic Stratification
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-200">
              <span className="text-emerald-300">T1: {dist.tier1VerifiedCount}</span>
              <span>·</span>
              <span className="text-sky-300">T2: {dist.tier2AssessedCount}</span>
              <span>·</span>
              <span className="text-amber-300">T3: {dist.tier3PreliminaryOrModelCount}</span>
            </div>
            {dist.totalCitedRecords > 0 && (
              <div className="mt-1.5 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden flex">
                <div
                  className="bg-emerald-500 h-full"
                  style={{ width: `${(dist.tier1VerifiedCount / totalCited) * 100}%` }}
                  title={`Tier I Verified: ${dist.tier1VerifiedCount}`}
                />
                <div
                  className="bg-sky-500 h-full"
                  style={{ width: `${(dist.tier2AssessedCount / totalCited) * 100}%` }}
                  title={`Tier II Spaceborne/Assessed: ${dist.tier2AssessedCount}`}
                />
                <div
                  className="bg-amber-500 h-full"
                  style={{ width: `${(dist.tier3PreliminaryOrModelCount / totalCited) * 100}%` }}
                  title={`Tier III Operational/Preliminary: ${dist.tier3PreliminaryOrModelCount}`}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Executive Citation-Locked Synthesis Dossier */}
      <Card className="kew-card-shell p-5 sm:p-7">
        <div className="kew-card-top-row">
          <div className="kew-card-icon-box bg-emerald-500/10 border-emerald-500/25 text-emerald-400">
            <FileText className="w-5 h-5" />
          </div>

          {/* Research Export Actions */}
          {data.citations.length > 0 && (
            <div className="flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => handleCopy('markdown', data.markdownBrief)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] bg-slate-950 hover:bg-emerald-500/15 border border-white/15 hover:border-emerald-500/40 text-xs text-slate-200 hover:text-emerald-300 transition-colors cursor-pointer"
              >
                {copiedAction === 'markdown' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedAction === 'markdown' ? 'Copied Brief' : 'Copy Cited Brief'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadMarkdown}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] bg-slate-950 hover:bg-sky-500/15 border border-white/15 hover:border-sky-500/40 text-xs text-slate-200 hover:text-sky-300 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export .MD</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopy('bibtex', data.bibtexExport)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[6px] bg-slate-950 hover:bg-white/10 border border-white/15 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                {copiedAction === 'bibtex' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <BookOpen className="w-3.5 h-3.5" />
                )}
                <span>{copiedAction === 'bibtex' ? 'Copied BibTeX' : 'BibTeX'}</span>
              </button>
            </div>
          )}
        </div>

        <h3 className="kew-card-title text-xl sm:text-2xl mb-1">
          Executive Scientific Evidence Synthesis
        </h3>
        <p className="text-xs text-slate-400 mb-5">
          Assembled strictly from indexed KEW records. Select any inline{' '}
          <span className="font-mono text-emerald-300">[n]</span> marker to inspect its institutional provenance below.
        </p>

        <div className="space-y-5">
          {data.executiveSynthesis.map((block) => (
            <div
              key={block.paragraphId}
              className="p-4 rounded-lg bg-slate-950/70 border border-white/10 space-y-2"
            >
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-400">
                {block.heading}
              </h4>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed break-words">
                {renderCitationLockedText(block.text)}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* 3. Stratified Evidence Matrix */}
      {data.findings.length > 0 && (
        <section className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Stratified Empirical Evidence Matrix ({data.findings.length} Cited Records)
              </h3>
              <p className="text-xs text-slate-400">
                Non-conflated evidentiary breakdown preserving verification status, epoch boundaries, and uncertainty margins
              </p>
            </div>

            <div className="flex items-center gap-1.5 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setMatrixGrouping('epistemic_tier')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  matrixGrouping === 'epistemic_tier'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white'
                }`}
              >
                By Epistemic Tier (I–III)
              </button>
              <button
                type="button"
                onClick={() => setMatrixGrouping('domain')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                  matrixGrouping === 'domain'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white'
                }`}
              >
                By KEW Domain
              </button>
            </div>
          </div>

          <div className="space-y-7">
            {groupedFindings.map((grp) => (
              <div key={grp.groupId} className="space-y-3.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-white">{grp.title}</h4>
                    {grp.subtitle && <p className="text-xs text-slate-400">{grp.subtitle}</p>}
                  </div>
                  <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded border ${grp.badgeClass}`}>
                    {grp.items.length} record{grp.items.length === 1 ? '' : 's'}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {grp.items.map((f) => {
                    const DomainIcon = DOMAIN_ICONS[f.domain] || Layers;
                    const tStyle = getTierStyles(f.tier);

                    return (
                      <Card key={f.citationNumber} className="kew-card-shell h-full p-5 group">
                        {/* 1. ICON top-left + Citation [#n] & Epistemic Tier top-right */}
                        <div className="kew-card-top-row">
                          <div className={`kew-card-icon-box ${tStyle.iconBox}`}>
                            <DomainIcon className="w-5 h-5" />
                          </div>
                          <div className="flex flex-wrap items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => jumpToCitation(f.citationNumber)}
                              className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold hover:bg-emerald-500/30 transition-colors cursor-pointer"
                              title="Scroll to full bibliography entry"
                            >
                              [{f.citationNumber}]
                            </button>
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${tStyle.badge}`}>
                              {f.trustBadge}
                            </span>
                          </div>
                        </div>

                        {/* 2. TITLE — Full horizontal width */}
                        <div className="mb-2">
                          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
                            {f.thematicCategory}
                          </div>
                          <h5 className="kew-card-title text-base group-hover:text-emerald-300 transition-colors">
                            <Link href={f.canonicalUrl} className="hover:underline">
                              {f.title}
                            </Link>
                          </h5>
                          {f.subtitle && (
                            <p className="text-xs text-slate-400 mt-0.5 break-words">{f.subtitle}</p>
                          )}
                        </div>

                        {/* 3. KPI / Quantitative Metrics + Temporal Epoch Span */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 py-2 my-1 border-y border-white/10 text-xs text-slate-300 tabular-nums">
                          <span className="inline-flex items-center gap-1 text-emerald-300 font-mono text-[11px]">
                            <Clock className="w-3.5 h-3.5 shrink-0" />
                            {f.temporalSpanLabel}
                          </span>
                          {f.subregion && (
                            <span className="inline-flex items-center gap-1 text-sky-300">
                              <Globe className="w-3.5 h-3.5 shrink-0" />
                              {f.subregion}
                            </span>
                          )}
                          {f.district && (
                            <span className="inline-flex items-center gap-1 text-slate-300">
                              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                              {f.district}
                            </span>
                          )}
                          {f.quantitativeMetrics.map((m) => (
                            <span key={m.label} className="text-slate-400">
                              {m.label}: <strong className="text-white">{m.value}</strong>
                            </span>
                          ))}
                        </div>

                        {/* 4. DESCRIPTION + Verification & Provenance */}
                        <p className="kew-card-desc text-xs sm:text-sm mt-2 mb-3">
                          {f.findingStatement}
                        </p>

                        <div className="text-[11px] text-slate-400 space-y-1 mb-4">
                          <div className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>
                              <strong className="text-slate-300">Source:</strong> {f.sourceProvenance}
                            </span>
                          </div>
                          <div className="text-slate-500 font-mono">
                            Validation: {f.verificationStatus}
                          </div>
                        </div>

                        {/* 5. CTA near bottom */}
                        <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                          <span className="text-[11px] text-slate-500 font-mono truncate max-w-[58%]">
                            {f.canonicalUrl}
                          </span>
                          <Link href={f.canonicalUrl} className="kew-card-cta !mt-0 shrink-0">
                            <span>Inspect Source Record</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Methodological Scope, Uncertainty & Data Gaps Disclosure */}
      {data.limitationsAndGaps.length > 0 && (
        <Card className="kew-card-shell p-5 sm:p-6 border-amber-500/25">
          <div className="kew-card-top-row">
            <div className="kew-card-icon-box bg-amber-500/10 border-amber-500/25 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <Badge variant="outline" size="sm" className="border-amber-500/35 text-amber-300 font-mono">
              Scientific Disclosure
            </Badge>
          </div>

          <h3 className="kew-card-title text-lg mb-1">
            Methodological Scope, Uncertainty Boundaries &amp; Data Gaps
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Explicit epistemological boundaries preventing baseline conflation or unverified extrapolation
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {data.limitationsAndGaps.map((lim, i) => (
              <div
                key={i}
                className="p-3.5 rounded-lg bg-slate-950/80 border border-white/10 space-y-1"
              >
                <div className="text-xs font-bold text-amber-300">{lim.title}</div>
                <p className="text-xs text-slate-300 leading-relaxed break-words">{lim.detail}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* 5. Traceable Institutional Bibliography [1..N] */}
      {data.citations.length > 0 && (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-white/10">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                Traceable Institutional Bibliography ([1]–[{data.citations.length}])
              </h3>
              <p className="text-xs text-slate-400">
                Complete reference register linking every inline claim to its canonical KEW URI and institutional source
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleCopy('citations', data.plainTextBibliography)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-white/10 border border-white/15 text-xs font-semibold text-slate-200 cursor-pointer"
            >
              {copiedAction === 'citations' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copiedAction === 'citations' ? 'Copied References' : 'Copy Plain-Text Bibliography'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {data.citations.map((cit) => {
              const isHighlighted = highlightedCitation === cit.citationNumber;
              const tStyle = getTierStyles(cit.tier);
              const DomainIcon = DOMAIN_ICONS[cit.document.domain] || BookOpen;

              return (
                <div
                  key={cit.citationNumber}
                  id={`kew-citation-${cit.citationNumber}`}
                  className="scroll-mt-28"
                >
                <Card
                  className={`kew-card-shell p-4 sm:p-5 transition-all ${
                    isHighlighted ? 'ring-2 ring-emerald-400 border-emerald-400' : ''
                  }`}
                >
                  <div className="kew-card-top-row !mb-2">
                    <div className={`kew-card-icon-box !w-9 !h-9 ${tStyle.iconBox}`}>
                      <DomainIcon className="w-4 h-4" />
                    </div>
                    <div className="flex flex-wrap items-center justify-end gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold">
                        Reference [{cit.citationNumber}]
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${tStyle.badge}`}>
                        {cit.tierLabel}
                      </span>
                    </div>
                  </div>

                  <h4 className="kew-card-title text-sm sm:text-base mb-1">
                    <Link href={cit.document.canonicalUrl} className="hover:text-emerald-300 hover:underline">
                      {cit.document.title}
                    </Link>
                  </h4>

                  <p className="kew-card-desc text-xs font-mono text-slate-300 mb-3">
                    {cit.formattedReference}
                  </p>

                  <div className="mt-auto pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                    <span className="text-slate-400">
                      Module: <strong className="text-slate-200">{cit.document.parentModule}</strong>
                    </span>
                    <Link href={cit.document.canonicalUrl} className="kew-card-cta !mt-0">
                      <span>Open Canonical URI ({cit.document.canonicalUrl})</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. Related Specialist Observatories & Grounded Follow-Up Inquiries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {data.relatedObservatories.length > 0 && (
          <Card className="kew-card-shell p-5">
            <div className="kew-card-top-row !mb-2">
              <div className="kew-card-icon-box bg-sky-500/10 border-sky-500/25 text-sky-400">
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Specialist Workbenches
              </span>
            </div>
            <h3 className="kew-card-title text-base mb-1">
              Interactive KEW Observatories &amp; Dashboards
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Platform analytical modules related to this topic (kept separate from empirical citations)
            </p>
            <div className="space-y-2">
              {data.relatedObservatories.map((obs) => (
                <Link
                  key={obs.id}
                  href={obs.canonicalUrl}
                  className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-950/80 hover:bg-white/5 border border-white/10 transition-colors group"
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-sky-300 truncate">
                      {obs.title}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate">{obs.parentModule}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-sky-400 shrink-0" />
                </Link>
              ))}
            </div>
          </Card>
        )}

        {data.followUpQuestions.length > 0 && (
          <Card className="kew-card-shell p-5">
            <div className="kew-card-top-row !mb-2">
              <div className="kew-card-icon-box bg-emerald-500/10 border-emerald-500/25 text-emerald-400">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase">
                Follow-Up Synthesis
              </span>
            </div>
            <h3 className="kew-card-title text-base mb-1">
              Related Evidence-Grounded Scientific Questions
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Continue investigating connected hydrological, ecological, or statutory records
            </p>
            <div className="space-y-2">
              {data.followUpQuestions.map((fq, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onSelectQuestion(fq);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full flex items-center justify-between gap-2 p-2.5 rounded-lg bg-slate-950/80 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/35 text-left transition-colors group cursor-pointer"
                >
                  <span className="text-xs sm:text-sm text-slate-200 group-hover:text-emerald-300 break-words">
                    {fq}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                </button>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
