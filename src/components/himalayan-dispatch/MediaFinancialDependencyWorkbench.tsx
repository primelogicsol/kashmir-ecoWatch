'use client';

import React, { useMemo, useState } from 'react';
import { AlertTriangle, CheckSquare, RotateCcw, Scale, ShieldCheck, Sliders } from 'lucide-react';

interface MediaFinancialDependencyWorkbenchProps {
  variant?: 'editorial' | 'observatory';
}

const DEFAULT_ANNUAL_REVENUE_LAKH = 100;
const DEFAULT_GOVT_AD_SHARE_PCT = 55;
const DEFAULT_GOVT_AD_REDUCTION_PCT = 80;

const INTERNAL_SAFEGUARDS_14: Array<{
  id: string;
  safeguard: string;
  purpose: string;
}> = [
  {
    id: 'sg-01',
    safeguard: 'Written employment contracts',
    purpose: 'Professional and financial security for staff reporters and editors',
  },
  {
    id: 'sg-02',
    safeguard: 'Independent editorial charter',
    purpose: 'Binding institutional protection against improper external or internal interference',
  },
  {
    id: 'sg-03',
    safeguard: 'Separation of advertising and editorial functions',
    purpose: 'Structural firewall reducing commercial and state-advertising conflicts',
  },
  {
    id: 'sg-04',
    safeguard: 'Conflict-of-interest disclosure',
    purpose: 'Public register of proprietor, editor, and institutional relationships',
  },
  {
    id: 'sg-05',
    safeguard: 'Confidential grievance mechanisms',
    purpose: 'Internal protection against retaliation when raising ethical concerns',
  },
  {
    id: 'sg-06',
    safeguard: 'Independent investigative funding',
    purpose: 'Ring-fenced reporting budget reducing single-advertiser vulnerability',
  },
  {
    id: 'sg-07',
    safeguard: 'Transparent story rejection procedures',
    purpose: 'Written evidentiary or legal reasons recorded when completed investigations are held',
  },
  {
    id: 'sg-08',
    safeguard: 'Legal assistance',
    purpose: 'Qualified pre-publication review and defence during public-interest reporting',
  },
  {
    id: 'sg-09',
    safeguard: 'Source protection',
    purpose: 'Operational protocols safeguarding confidential sources and unpublished records',
  },
  {
    id: 'sg-10',
    safeguard: 'Professional development',
    purpose: 'Structured training in scientific, geospatial, legal, and financial investigation',
  },
  {
    id: 'sg-11',
    safeguard: 'Regular salary payments',
    purpose: 'Timely remuneration reducing economic precarity among working journalists',
  },
  {
    id: 'sg-12',
    safeguard: 'Editorial appeal procedures',
    purpose: 'Independent review channel for contested story modifications or kills',
  },
  {
    id: 'sg-13',
    safeguard: 'Safety insurance',
    purpose: 'Medical, field-hazard, and emergency coverage during high-risk mountain assignments',
  },
  {
    id: 'sg-14',
    safeguard: 'Public corrections policy',
    purpose: 'Permanent, accessible factual amendments preserving institutional credibility',
  },
];

const ALTERNATIVE_REVENUE_MODELS_12: Array<{
  model: string;
  contribution: string;
  governanceRequirement: string;
}> = [
  {
    model: 'Reader subscriptions',
    contribution: 'Reduced dependence on institutional advertisers',
    governanceRequirement: 'Editorial independence from subscriber political preferences',
  },
  {
    model: 'Membership programmes',
    contribution: 'Community-supported public-interest journalism',
    governanceRequirement: 'Transparent separation between community membership and story selection',
  },
  {
    model: 'Investigative research grants',
    contribution: 'Dedicated financing for multi-month documentary and field investigations',
    governanceRequirement: 'No grantor pre-publication approval or conclusion control',
  },
  {
    model: 'International reporting partnerships',
    contribution: 'Access to wider cross-border and global editorial markets',
    governanceRequirement: 'Shared evidentiary standards and local reporter credit parity',
  },
  {
    model: 'Specialized newsletters',
    contribution: 'Recurring revenue from cryosphere, water, policy, and hazard expertise',
    governanceRequirement: 'Clear distinction between analytical briefings and sponsored notices',
  },
  {
    model: 'Documentary production',
    contribution: 'Alternative longform visual and archival income streams',
    governanceRequirement: 'Strict separation of documentary evidence from commissioned promotional films',
  },
  {
    model: 'Transparent philanthropic support',
    contribution: 'Sustained public-interest scientific and investigative capacity',
    governanceRequirement: 'Public donor disclosure and binding non-interference clauses',
  },
  {
    model: 'Educational partnerships',
    contribution: 'Scientific communication, fellowships, and methodological training',
    governanceRequirement: 'Full editorial freedom to scrutinize partner universities when warranted',
  },
  {
    model: 'Data journalism services',
    contribution: 'Independent geospatial, statistical, and archival research products',
    governanceRequirement: 'Open methodology documentation and conflict-of-interest screening',
  },
  {
    model: 'Syndication',
    contribution: 'Paid licensing of original Western Himalayan investigations',
    governanceRequirement: 'Preservation of factual caveats and correction updates across republishers',
  },
  {
    model: 'Crowdfunding',
    contribution: 'Community financing of defined thematic or watershed investigations',
    governanceRequirement: 'Pre-stated scope so backers fund the inquiry rather than a predetermined verdict',
  },
  {
    model: 'Collaborative reporting consortia',
    contribution: 'Shared laboratory, satellite, legal, and archival investigative costs',
    governanceRequirement: 'Joint verification ledger and unified right-of-response timelines',
  },
];

export function MediaFinancialDependencyWorkbench({
  variant = 'editorial',
}: MediaFinancialDependencyWorkbenchProps) {
  const [activeTab, setActiveTab] = useState<'dependency' | 'diversification' | 'safeguards'>(
    'dependency'
  );

  // Tab 1: Media house financial dependency model (Section VIII defaults: ₹100L, 55%, 80%)
  const [annualRevenueLakh, setAnnualRevenueLakh] = useState<number>(DEFAULT_ANNUAL_REVENUE_LAKH);
  const [govtAdSharePct, setGovtAdSharePct] = useState<number>(DEFAULT_GOVT_AD_SHARE_PCT);
  const [govtAdReductionPct, setGovtAdReductionPct] = useState<number>(
    DEFAULT_GOVT_AD_REDUCTION_PCT
  );

  // Tab 2: Diversification simulator shares (unnormalized weights normalized to 100%)
  const [readerSupportWeight, setReaderSupportWeight] = useState<number>(30);
  const [grantsPhilanthropyWeight, setGrantsPhilanthropyWeight] = useState<number>(25);
  const [specialistDataSyndicationWeight, setSpecialistDataSyndicationWeight] =
    useState<number>(20);
  const [commercialAdWeight, setCommercialAdWeight] = useState<number>(15);
  const [publicAdWeight, setPublicAdWeight] = useState<number>(10);

  // Tab 3: Newsroom safeguard self-audit checkboxes
  const [checkedSafeguards, setCheckedSafeguards] = useState<Record<string, boolean>>({
    'sg-01': true,
    'sg-02': true,
    'sg-03': true,
    'sg-04': true,
    'sg-07': true,
    'sg-09': true,
    'sg-14': true,
  });

  const dependencyMetrics = useMemo(() => {
    const govtRevenueLakh = (annualRevenueLakh * govtAdSharePct) / 100;
    const nonGovtRevenueLakh = annualRevenueLakh - govtRevenueLakh;
    const lostRevenueLakh = (govtRevenueLakh * govtAdReductionPct) / 100;
    const retainedGovtRevenueLakh = govtRevenueLakh - lostRevenueLakh;
    const remainingAnnualRevenueLakh = annualRevenueLakh - lostRevenueLakh;
    const pctTotalLost = annualRevenueLakh > 0 ? (lostRevenueLakh / annualRevenueLakh) * 100 : 0;
    const pctTotalRetained = 100 - pctTotalLost;

    let vulnerabilityBand = 'Low Single-Source Exposure';
    let bandNote =
      'An abrupt advertising withdrawal produces a manageable revenue contraction below 15% of annual operating budget.';
    if (pctTotalLost >= 30) {
      vulnerabilityBand = 'Severe Structural Vulnerability';
      bandNote =
        'Loss of 30% or more of annual operating revenue threatens payroll continuity, field reporting budgets, and legal defence capacity unless reserve or diversified revenues exist.';
    } else if (pctTotalLost >= 15) {
      vulnerabilityBand = 'Elevated Institutional Exposure';
      bandNote =
        'Loss between 15% and 30% of annual revenue creates substantial pressure to curtail long-duration investigative reporting and specialist desks.';
    }

    return {
      govtRevenueLakh,
      nonGovtRevenueLakh,
      lostRevenueLakh,
      retainedGovtRevenueLakh,
      remainingAnnualRevenueLakh,
      pctTotalLost,
      pctTotalRetained,
      vulnerabilityBand,
      bandNote,
    };
  }, [annualRevenueLakh, govtAdSharePct, govtAdReductionPct]);

  const diversificationMetrics = useMemo(() => {
    const rawTotal =
      readerSupportWeight +
      grantsPhilanthropyWeight +
      specialistDataSyndicationWeight +
      commercialAdWeight +
      publicAdWeight;
    const denom = rawTotal > 0 ? rawTotal : 1;
    const shares = [
      {
        label: 'Reader Subscriptions & Memberships',
        pct: (readerSupportWeight / denom) * 100,
      },
      {
        label: 'Investigative Grants & Transparent Philanthropy',
        pct: (grantsPhilanthropyWeight / denom) * 100,
      },
      {
        label: 'Specialized Newsletters, Data & Syndication',
        pct: (specialistDataSyndicationWeight / denom) * 100,
      },
      {
        label: 'Firewalled Commercial Advertising',
        pct: (commercialAdWeight / denom) * 100,
      },
      {
        label: 'Transparent Rule-Based Public Notices',
        pct: (publicAdWeight / denom) * 100,
      },
    ];
    const maxSinglePayerShare = Math.max(...shares.map((s) => s.pct));
    const simulated80PctPublicShockLoss = (shares[4].pct * 80) / 100;
    return {
      shares,
      maxSinglePayerShare,
      simulated80PctPublicShockLoss,
    };
  }, [
    readerSupportWeight,
    grantsPhilanthropyWeight,
    specialistDataSyndicationWeight,
    commercialAdWeight,
    publicAdWeight,
  ]);

  const resetDependencyScenario = () => {
    setAnnualRevenueLakh(DEFAULT_ANNUAL_REVENUE_LAKH);
    setGovtAdSharePct(DEFAULT_GOVT_AD_SHARE_PCT);
    setGovtAdReductionPct(DEFAULT_GOVT_AD_REDUCTION_PCT);
  };

  const adoptedCount = Object.values(checkedSafeguards).filter(Boolean).length;

  const isDark = variant === 'observatory';

  return (
    <div
      className="my-10 border p-6 sm:p-8 space-y-6"
      style={{
        borderColor: isDark ? 'rgba(216, 195, 165, 0.35)' : 'var(--hd-rule-strong)',
        backgroundColor: isDark ? '#171717' : 'var(--hd-bg-elevated)',
        color: isDark ? '#F2EFE7' : 'var(--hd-fg)',
      }}
    >
      {/* Header */}
      <div
        className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b"
        style={{ borderColor: isDark ? 'rgba(242, 239, 231, 0.16)' : 'var(--hd-rule)' }}
      >
        <div className="space-y-1.5">
          <p
            className="hd-font-sans text-[11px] font-semibold tracking-[0.22em] uppercase"
            style={{ color: isDark ? '#D8C3A5' : 'var(--hd-copper)' }}
          >
            INTERACTIVE POLITICAL ECONOMY &amp; NEWSROOM GOVERNANCE WORKBENCH
          </p>
          <h3 className="hd-font-display text-2xl sm:text-3xl font-semibold leading-tight">
            Media House Financial Dependency, Revenue Diversification &amp; Internal Safeguards
          </h3>
          <p
            className="hd-font-body text-xs sm:text-sm leading-relaxed max-w-3xl"
            style={{ color: isDark ? 'rgba(242, 239, 231, 0.78)' : 'var(--hd-fg-secondary)' }}
          >
            Hypothetical financial scenario and voluntary institutional governance diagnostic. Models
            single-source revenue vulnerability and editorial firewall safeguards without alleging
            misconduct by any specific publication.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'dependency' as const, label: '01 · Financial Dependency', icon: Sliders },
            { id: 'diversification' as const, label: '02 · Revenue Diversification', icon: Scale },
            { id: 'safeguards' as const, label: '03 · 14 Internal Safeguards', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className="hd-font-sans inline-flex items-center gap-1.5 px-3.5 py-2 border text-[11px] font-semibold tracking-[0.14em] uppercase transition-colors"
                style={{
                  borderColor: selected
                    ? '#8C3125'
                    : isDark
                    ? 'rgba(242, 239, 231, 0.22)'
                    : 'var(--hd-rule)',
                  backgroundColor: selected ? '#8C3125' : 'transparent',
                  color: selected ? '#F2EFE7' : isDark ? '#D8C3A5' : 'var(--hd-fg-secondary)',
                }}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 01: MEDIA HOUSE FINANCIAL DEPENDENCY MODEL */}
      {activeTab === 'dependency' && (
        <div className="space-y-6">
          <div
            className="p-4 border-l-2 flex items-start justify-between gap-4"
            style={{
              borderColor: '#8C3125',
              backgroundColor: isDark ? 'rgba(242, 239, 231, 0.05)' : 'var(--hd-bg)',
            }}
          >
            <div className="space-y-1">
              <p
                className="hd-font-sans text-[10px] font-semibold tracking-[0.2em] uppercase"
                style={{ color: isDark ? '#D8C3A5' : 'var(--hd-copper)' }}
              >
                HYPOTHETICAL FINANCIAL SCENARIO · NOT AN ASSESSMENT OF AN EXISTING NEWSPAPER
              </p>
              <p
                className="hd-font-body text-xs sm:text-sm leading-relaxed"
                style={{ color: isDark ? 'rgba(242, 239, 231, 0.82)' : 'var(--hd-fg-secondary)' }}
              >
                Receiving government or commercial advertising does not independently establish
                journalistic misconduct. This model illustrates why narrow revenue concentration
                creates structural vulnerability when institutional advertising is abruptly reduced.
              </p>
            </div>
            <button
              type="button"
              onClick={resetDependencyScenario}
              className="hd-font-sans inline-flex items-center gap-1.5 px-3 py-1.5 border text-[10px] font-semibold tracking-[0.16em] uppercase shrink-0 hover:opacity-80"
              style={{
                borderColor: isDark ? 'rgba(216, 195, 165, 0.4)' : 'var(--hd-rule-strong)',
                color: isDark ? '#D8C3A5' : 'var(--hd-copper)',
              }}
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset scenario</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Controls */}
            <div className="lg:col-span-6 space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <label htmlFor="hd-rev-slider" className="hd-font-body font-semibold">
                    Annual media house revenue
                  </label>
                  <span
                    className="hd-font-display text-xl font-semibold"
                    style={{ color: isDark ? '#D8C3A5' : 'var(--hd-copper)' }}
                  >
                    ₹{annualRevenueLakh} lakh
                  </span>
                </div>
                <input
                  id="hd-rev-slider"
                  type="range"
                  min={20}
                  max={500}
                  step={5}
                  value={annualRevenueLakh}
                  onChange={(e) => setAnnualRevenueLakh(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
                <div className="flex justify-between text-[11px] opacity-65 hd-font-sans">
                  <span>₹20 lakh (Small desk)</span>
                  <span>₹100 lakh (Baseline)</span>
                  <span>₹500 lakh (Regional daily)</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <label htmlFor="hd-govt-share-slider" className="hd-font-body font-semibold">
                    Revenue from government advertising
                  </label>
                  <span
                    className="hd-font-display text-xl font-semibold"
                    style={{ color: isDark ? '#D8C3A5' : 'var(--hd-copper)' }}
                  >
                    {govtAdSharePct}%
                  </span>
                </div>
                <input
                  id="hd-govt-share-slider"
                  type="range"
                  min={0}
                  max={90}
                  step={1}
                  value={govtAdSharePct}
                  onChange={(e) => setGovtAdSharePct(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
                <div className="flex justify-between text-[11px] opacity-65 hd-font-sans">
                  <span>0%</span>
                  <span>30% (CPJ 2019 benchmark)</span>
                  <span>55% (Model default)</span>
                  <span>90%</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <label htmlFor="hd-govt-cut-slider" className="hd-font-body font-semibold">
                    Reduction in government advertising
                  </label>
                  <span
                    className="hd-font-display text-xl font-semibold"
                    style={{ color: isDark ? '#D8C3A5' : 'var(--hd-copper)' }}
                  >
                    {govtAdReductionPct}%
                  </span>
                </div>
                <input
                  id="hd-govt-cut-slider"
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={govtAdReductionPct}
                  onChange={(e) => setGovtAdReductionPct(Number(e.target.value))}
                  className="w-full accent-[#8C3125]"
                />
                <div className="flex justify-between text-[11px] opacity-65 hd-font-sans">
                  <span>0% (Unchanged)</span>
                  <span>50% (Partial curtailment)</span>
                  <span>80% (Default)</span>
                  <span>100% (Full ban)</span>
                </div>
              </div>
            </div>

            {/* Computed Cards */}
            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div
                  className="p-4 border space-y-1"
                  style={{
                    borderColor: '#8C3125',
                    backgroundColor: isDark ? 'rgba(140, 49, 37, 0.16)' : 'var(--hd-bg)',
                  }}
                >
                  <p className="hd-font-sans text-[10px] tracking-[0.16em] uppercase opacity-75">
                    Revenue potentially lost
                  </p>
                  <p
                    className="hd-font-display text-3xl sm:text-4xl font-semibold"
                    style={{ color: isDark ? '#F2EFE7' : '#8C3125' }}
                  >
                    ₹{dependencyMetrics.lostRevenueLakh.toFixed(1)} L
                  </p>
                  <p className="hd-font-sans text-[11px] font-semibold" style={{ color: '#8C3125' }}>
                    {dependencyMetrics.pctTotalLost.toFixed(1)}% lost
                  </p>
                </div>

                <div
                  className="p-4 border space-y-1"
                  style={{
                    borderColor: isDark ? 'rgba(242, 239, 231, 0.2)' : 'var(--hd-rule)',
                    backgroundColor: isDark ? 'rgba(242, 239, 231, 0.04)' : 'var(--hd-bg)',
                  }}
                >
                  <p className="hd-font-sans text-[10px] tracking-[0.16em] uppercase opacity-75">
                    Remaining annual revenue
                  </p>
                  <p className="hd-font-display text-3xl sm:text-4xl font-semibold">
                    ₹{dependencyMetrics.remainingAnnualRevenueLakh.toFixed(1)} L
                  </p>
                  <p className="hd-font-sans text-[11px] opacity-75">
                    {dependencyMetrics.pctTotalRetained.toFixed(1)}% retained
                  </p>
                </div>

                <div
                  className="p-4 border space-y-1"
                  style={{
                    borderColor: isDark ? 'rgba(242, 239, 231, 0.2)' : 'var(--hd-rule)',
                    backgroundColor: isDark ? 'rgba(242, 239, 231, 0.04)' : 'var(--hd-bg)',
                  }}
                >
                  <p className="hd-font-sans text-[10px] tracking-[0.16em] uppercase opacity-75">
                    Pre-shock govt ad base
                  </p>
                  <p className="hd-font-display text-3xl sm:text-4xl font-semibold">
                    ₹{dependencyMetrics.govtRevenueLakh.toFixed(1)} L
                  </p>
                  <p className="hd-font-sans text-[11px] opacity-75">
                    Non-govt: ₹{dependencyMetrics.nonGovtRevenueLakh.toFixed(1)} L
                  </p>
                </div>
              </div>

              {/* Stacked Revenue Composition Bar */}
              <div className="space-y-2 pt-1">
                <div className="flex justify-between text-[11px] hd-font-sans uppercase tracking-[0.14em] opacity-80">
                  <span>Post-Shock Revenue Composition</span>
                  <span>Total Baseline: ₹{annualRevenueLakh.toFixed(1)} L</span>
                </div>
                <div className="h-4 w-full flex overflow-hidden border" style={{ borderColor: 'var(--hd-rule)' }}>
                  <div
                    style={{
                      width: `${
                        annualRevenueLakh > 0
                          ? (dependencyMetrics.nonGovtRevenueLakh / annualRevenueLakh) * 100
                          : 0
                      }%`,
                      backgroundColor: '#3B5949',
                    }}
                    title={`Non-government revenue: ₹${dependencyMetrics.nonGovtRevenueLakh.toFixed(1)} L`}
                  />
                  <div
                    style={{
                      width: `${
                        annualRevenueLakh > 0
                          ? (dependencyMetrics.retainedGovtRevenueLakh / annualRevenueLakh) * 100
                          : 0
                      }%`,
                      backgroundColor: '#B38B59',
                    }}
                    title={`Retained government advertising: ₹${dependencyMetrics.retainedGovtRevenueLakh.toFixed(1)} L`}
                  />
                  <div
                    style={{
                      width: `${dependencyMetrics.pctTotalLost}%`,
                      backgroundColor: '#8C3125',
                    }}
                    title={`Revenue potentially lost: ₹${dependencyMetrics.lostRevenueLakh.toFixed(1)} L`}
                  />
                </div>
                <div className="flex flex-wrap gap-4 text-[11px] hd-font-body opacity-85">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: '#3B5949' }} />
                    Non-govt revenue (₹{dependencyMetrics.nonGovtRevenueLakh.toFixed(1)} L)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: '#B38B59' }} />
                    Retained govt ads (₹{dependencyMetrics.retainedGovtRevenueLakh.toFixed(1)} L)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 inline-block" style={{ backgroundColor: '#8C3125' }} />
                    Potentially lost (₹{dependencyMetrics.lostRevenueLakh.toFixed(1)} L)
                  </span>
                </div>
              </div>

              <div
                className="p-4 border space-y-1"
                style={{
                  borderColor: isDark ? 'rgba(216, 195, 165, 0.25)' : 'var(--hd-rule)',
                  backgroundColor: isDark ? 'rgba(242, 239, 231, 0.03)' : 'var(--hd-bg)',
                }}
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" style={{ color: '#8C3125' }} />
                  <span className="hd-font-sans text-[11px] font-semibold tracking-[0.16em] uppercase">
                    {dependencyMetrics.vulnerabilityBand}
                  </span>
                </div>
                <p
                  className="hd-font-body text-xs leading-relaxed"
                  style={{ color: isDark ? 'rgba(242, 239, 231, 0.8)' : 'var(--hd-fg-secondary)' }}
                >
                  {dependencyMetrics.bandNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 02: REVENUE DIVERSIFICATION EXPLORER */}
      {activeTab === 'diversification' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 space-y-4">
              <p
                className="hd-font-sans text-[11px] font-semibold tracking-[0.18em] uppercase"
                style={{ color: isDark ? '#D8C3A5' : 'var(--hd-copper)' }}
              >
                ADJUST REVENUE MIX WEIGHTS (NORMALIZED TO 100%)
              </p>
              {[
                {
                  id: 'w-reader',
                  label: 'Reader subscriptions & memberships',
                  value: readerSupportWeight,
                  setter: setReaderSupportWeight,
                },
                {
                  id: 'w-grants',
                  label: 'Investigative research grants & transparent philanthropy',
                  value: grantsPhilanthropyWeight,
                  setter: setGrantsPhilanthropyWeight,
                },
                {
                  id: 'w-data',
                  label: 'Specialized newsletters, data services & syndication',
                  value: specialistDataSyndicationWeight,
                  setter: setSpecialistDataSyndicationWeight,
                },
                {
                  id: 'w-comm',
                  label: 'Firewalled commercial advertising',
                  value: commercialAdWeight,
                  setter: setCommercialAdWeight,
                },
                {
                  id: 'w-pub',
                  label: 'Transparent rule-based public/government advertising',
                  value: publicAdWeight,
                  setter: setPublicAdWeight,
                },
              ].map((ctrl) => (
                <div key={ctrl.id} className="space-y-1">
                  <div className="flex justify-between text-xs hd-font-body">
                    <span>{ctrl.label}</span>
                    <span className="font-semibold">{ctrl.value} pts</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={80}
                    step={5}
                    value={ctrl.value}
                    onChange={(e) => ctrl.setter(Number(e.target.value))}
                    className="w-full accent-[#8C3125]"
                  />
                </div>
              ))}
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-2 gap-3.5">
                <div
                  className="p-4 border space-y-1"
                  style={{
                    borderColor: isDark ? 'rgba(242, 239, 231, 0.2)' : 'var(--hd-rule)',
                    backgroundColor: isDark ? 'rgba(242, 239, 231, 0.04)' : 'var(--hd-bg)',
                  }}
                >
                  <p className="hd-font-sans text-[10px] tracking-[0.16em] uppercase opacity-75">
                    Largest Revenue Stream
                  </p>
                  <p className="hd-font-display text-3xl font-semibold">
                    {diversificationMetrics.maxSinglePayerShare.toFixed(1)}%
                  </p>
                  <p className="hd-font-body text-xs opacity-75">
                    {diversificationMetrics.maxSinglePayerShare <= 35
                      ? 'Balanced multi-pillar portfolio'
                      : 'Concentrated pillar — requires strong firewall'}
                  </p>
                </div>

                <div
                  className="p-4 border space-y-1"
                  style={{
                    borderColor: '#8C3125',
                    backgroundColor: isDark ? 'rgba(140, 49, 37, 0.14)' : 'var(--hd-bg)',
                  }}
                >
                  <p className="hd-font-sans text-[10px] tracking-[0.16em] uppercase opacity-75">
                    80% Public-Ad Shock Impact
                  </p>
                  <p className="hd-font-display text-3xl font-semibold">
                    {diversificationMetrics.simulated80PctPublicShockLoss.toFixed(1)}% lost
                  </p>
                  <p className="hd-font-body text-xs opacity-75">
                    vs. 44.0% lost in the 55%-dependent baseline
                  </p>
                </div>
              </div>

              <div className="space-y-2.5">
                {diversificationMetrics.shares.map((s) => (
                  <div key={s.label} className="space-y-1">
                    <div className="flex justify-between text-xs hd-font-body">
                      <span>{s.label}</span>
                      <span className="font-semibold">{s.pct.toFixed(1)}%</span>
                    </div>
                    <div
                      className="h-2 w-full overflow-hidden"
                      style={{
                        backgroundColor: isDark ? 'rgba(242,239,231,0.12)' : 'var(--hd-rule)',
                      }}
                    >
                      <div
                        className="h-full"
                        style={{ width: `${s.pct}%`, backgroundColor: '#8C3125' }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto border" style={{ borderColor: 'var(--hd-rule)' }}>
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr
                  className="border-b"
                  style={{
                    borderColor: isDark ? 'rgba(242, 239, 231, 0.2)' : 'var(--hd-rule-strong)',
                  }}
                >
                  <th className="py-2.5 px-4 hd-folio-meta">Alternative Revenue Model (12)</th>
                  <th className="py-2.5 px-4 hd-folio-meta">Potential Contribution</th>
                  <th className="py-2.5 px-4 hd-folio-meta">Required Conflict-of-Interest Safeguard</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {ALTERNATIVE_REVENUE_MODELS_12.map((item) => (
                  <tr key={item.model}>
                    <td className="py-2.5 px-4 hd-font-body font-semibold">{item.model}</td>
                    <td className="py-2.5 px-4 hd-font-body opacity-85">{item.contribution}</td>
                    <td className="py-2.5 px-4 hd-font-body opacity-80">
                      {item.governanceRequirement}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 03: 14 INTERNAL MEDIA-HOUSE JOURNALIST SAFEGUARDS */}
      {activeTab === 'safeguards' && (
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p
              className="hd-font-body text-xs sm:text-sm leading-relaxed max-w-3xl"
              style={{ color: isDark ? 'rgba(242, 239, 231, 0.82)' : 'var(--hd-fg-secondary)' }}
            >
              Freedom of the press includes the professional freedom of journalists within their own
              institutions. Toggle safeguards below to evaluate how an editorial organization
              distinguishes legitimate quality control from improper political or commercial
              intervention.
            </p>
            <div
              className="px-3.5 py-2 border text-xs hd-font-sans font-semibold tracking-[0.14em] uppercase shrink-0"
              style={{ borderColor: '#8C3125', color: isDark ? '#D8C3A5' : '#8C3125' }}
            >
              Safeguards Active: {adoptedCount} / {INTERNAL_SAFEGUARDS_14.length}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {INTERNAL_SAFEGUARDS_14.map((item) => {
              const checked = Boolean(checkedSafeguards[item.id]);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setCheckedSafeguards((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                  }
                  className="text-left p-3.5 border flex items-start gap-3 transition-colors"
                  style={{
                    borderColor: checked
                      ? '#8C3125'
                      : isDark
                      ? 'rgba(242, 239, 231, 0.16)'
                      : 'var(--hd-rule)',
                    backgroundColor: checked
                      ? isDark
                        ? 'rgba(140, 49, 37, 0.14)'
                        : 'var(--hd-bg)'
                      : 'transparent',
                  }}
                >
                  <CheckSquare
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{
                      color: checked
                        ? '#8C3125'
                        : isDark
                        ? 'rgba(242, 239, 231, 0.35)'
                        : 'var(--hd-fg-muted)',
                    }}
                  />
                  <div className="space-y-0.5">
                    <p className="hd-font-body text-sm font-semibold">{item.safeguard}</p>
                    <p
                      className="hd-font-body text-xs leading-relaxed"
                      style={{
                        color: isDark ? 'rgba(242, 239, 231, 0.72)' : 'var(--hd-fg-secondary)',
                      }}
                    >
                      {item.purpose}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
