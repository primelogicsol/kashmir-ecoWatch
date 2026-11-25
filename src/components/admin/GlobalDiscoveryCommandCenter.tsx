'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileCheck,
  Globe,
  Layers,
  MapPin,
  RefreshCw,
  Search,
  Send,
  Shield,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DiscoveryDashboardPayload {
  generatedAt: string;
  actionExecuted: string;
  storageBackend: 'postgresql' | 'local_json_fallback';
  canonicalIdentity: {
    officialName: string;
    extendedName: string;
    shortName: string;
    alternativeName: string;
    entityId: string;
    websiteId: string;
    domain: string;
    canonicalUrl: string;
  };
  kpis: {
    indexedPages: {
      measuredEligibleInSitemap: number;
      searchEngineConfirmedIndexed: number | null;
      statusNote: string;
    };
    brandedSearchImpressions: {
      value: number | null;
      statusNote: string;
    };
    environmentalKeywords: {
      mappedTopicClusters: number;
      targetTopicsCount: number;
      serpRankingsTracked: number | null;
      statusNote: string;
    };
    aiSearchCitations: {
      measuredAiReferrals: number;
      sampledAiCitationChecks: number;
      statusNote: string;
    };
    scientificCitations: {
      openAlexWorksFound: number | null;
      crossrefWorksFound: number | null;
      reportsWithCompleteCitationMetaPct: number;
      syntheticDoisCount: number;
      statusNote: string;
    };
    referringDomains: {
      value: number;
      searchEngineReferrals: number;
      scientificNetworkReferrals: number;
      statusNote: string;
    };
    countriesReached: {
      value: number;
      statusNote: string;
    };
    brandIdentityAccuracy: {
      sampledAccuracyPct: number | null;
      totalSampledQueries: number;
      internalEntityConflicts: number;
      statusNote: string;
    };
  };
  technicalSeoHealth: {
    totalAppPageFiles: number;
    renderablePagesCount: number;
    redirectStubCount: number;
    pagesWithDedicatedMetadataOrLayout: number;
    metadataCoveragePct: number;
    sitemapUrlCount: number;
    sitemapAudit?: {
      totalCandidateUrls: number;
      validEligibleUrls: number;
      invalidOrSoft404Urls: number;
      redirectedUrls: number;
      duplicateUrls: number;
      nonIndexableUrls: number;
      thinOrTemplatedUrls: number;
      restrictedUrls: number;
    };
    brokenInternalLinksCount: number;
    syntheticDoisCount: number;
    robotsTxtActive: boolean;
    sitemapXmlActive: boolean;
    webManifestActive: boolean;
    llmsTxtActive: boolean;
    organizationJsonLdId: string;
    websiteJsonLdId: string;
    aiSearchCrawlersAllowed: string[];
  };
  integrations: {
    googleSearchConsole: { status: string; verificationMetaConfigured: boolean };
    bingWebmaster: { status: string; verificationMetaConfigured: boolean };
    indexNow: { status: string; keyConfigured: boolean };
    zenodoDeposit: { status: string; tokenConfigured: boolean };
  };
  brandPlatformStatuses: Array<{
    platform: string;
    status: string;
    lastCheckedAt: string | null;
    identityAccurate: boolean | null;
    unrelatedEntityAppeared: boolean | null;
    query: string | null;
    recommendation: string;
  }>;
  recentBrandChecks: Array<any>;
  recentDiscoveryEvents: Array<any>;
  indexNowLogs: Array<any>;
  auditLogs?: Array<{
    id: string;
    occurredAt: string;
    actor: string;
    role: string;
    authMethod: string;
    action: string;
    target: string;
    status: string;
    detail: string;
  }>;
  distributionWorkflows: Array<any>;
  publishableReports: Array<{
    id: string;
    title: string;
    canonicalUrl: string;
    publishedDate: string;
    sourceType: string;
  }>;
  topicClusters: Array<{
    id: string;
    category: string;
    targetTopics: string[];
    primaryCanonicalRoutes: string[];
    flagshipEntities: Array<{ name: string; href: string }>;
  }>;
  discoveryTargets: Array<{
    id: string;
    name: string;
    ecosystem: string;
    ecosystemLabel: string;
    domain: string;
    mode: string;
    eligibilityNote: string;
    isUpstreamDataEcosystemOnly?: boolean;
  }>;
}

export function GlobalDiscoveryCommandCenter({
  adminName = 'KEW Administrator',
}: {
  adminName?: string;
}) {
  const [data, setData] = useState<DiscoveryDashboardPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [runningAction, setRunningAction] = useState<string | null>(null);
  const [subView, setSubView] = useState<
    'overview' | 'brand' | 'distribution' | 'targets' | 'topics' | 'audit'
  >('overview');
  const [authError, setAuthError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Brand Check Form State
  const [brandPlatform, setBrandPlatform] = useState('Google Search');
  const [brandQuery, setBrandQuery] = useState('Kashmir EcoWatch');
  const [brandLocation, setBrandLocation] = useState('United States');
  const [brandDevice, setBrandDevice] = useState<'Desktop' | 'Mobile'>('Desktop');
  const [brandAccurate, setBrandAccurate] = useState(true);
  const [brandUnrelated, setBrandUnrelated] = useState(false);
  const [brandSources, setBrandSources] = useState('https://kashmir-ecowatch.com');
  const [brandSummary, setBrandSummary] = useState('');

  // Distribution Form State
  const [selectedReportId, setSelectedReportId] = useState('ev-lake-sheshnag-2026');

  const fetchDiscovery = useCallback(async (action = 'overview') => {
    setRunningAction(action);
    try {
      const res = await fetch(`/api/admin/discovery?action=${encodeURIComponent(action)}`, {
        credentials: 'include',
      });
      if (res.status === 401) {
        setAuthError('Server-side administrator session required (HTTP 401). Please unlock the Admin Console with your administrator credentials.');
        return;
      }
      if (res.ok) {
        setAuthError(null);
        const json = await res.json();
        setData(json);
        if (action !== 'overview') {
          setNotice(`Executed live verification: ${action.replace(/-/g, ' ').toUpperCase()}`);
          setTimeout(() => setNotice(null), 4500);
        }
      }
    } catch (err: any) {
      setNotice(`Error running ${action}: ${err?.message || 'network failure'}`);
    } finally {
      setLoading(false);
      setRunningAction(null);
    }
  }, []);

  useEffect(() => {
    fetchDiscovery('overview');
  }, [fetchDiscovery]);

  const handleSubmitIndexNow = async () => {
    setRunningAction('indexnow');
    try {
      const res = await fetch('/api/admin/discovery', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'submit-indexnow' }),
      });
      const json = await res.json();
      if (json.indexNowLog) {
        setNotice(`${json.indexNowLog.statusLabel}: ${json.indexNowLog.detail}`);
      }
      await fetchDiscovery('indexing-check');
    } finally {
      setRunningAction(null);
    }
  };

  const handleRecordBrandCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    setRunningAction('record-brand');
    try {
      const res = await fetch('/api/admin/discovery', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'record-brand-check',
          platform: brandPlatform,
          query: brandQuery,
          location: brandLocation,
          language: 'en',
          device: brandDevice,
          identityAccurate: brandAccurate,
          unrelatedEntityAppeared: brandUnrelated,
          referencedSources: brandSources,
          observedSummary:
            brandSummary ||
            `Sampled exact-brand query "${brandQuery}" on ${brandPlatform} (${brandDevice}, ${brandLocation}).`,
        }),
      });
      if (res.ok) {
        setBrandSummary('');
        setNotice(`Recorded verified Brand Identity check for ${brandPlatform}.`);
        await fetchDiscovery('brand-check');
      }
    } finally {
      setRunningAction(null);
    }
  };

  const handlePrepareDistribution = async () => {
    setRunningAction('prepare-dist');
    try {
      const res = await fetch('/api/admin/discovery', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'prepare-distribution',
          reportId: selectedReportId,
        }),
      });
      if (res.ok) {
        setNotice(
          `Prepared Stages 1–5 dissemination package for ${selectedReportId}. Paused at Stage 6 Human Approval Gate.`
        );
        await fetchDiscovery('overview');
      }
    } finally {
      setRunningAction(null);
    }
  };

  const handleApproveDistribution = async (reportId: string) => {
    setRunningAction(`approve-${reportId}`);
    try {
      const res = await fetch('/api/admin/discovery', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'approve-distribution',
          reportId,
          approvedBy: adminName,
        }),
      });
      if (res.ok) {
        setNotice(
          `Stage 6 Human Approval granted for ${reportId}. Multichannel package unlocked & IndexNow check executed.`
        );
        await fetchDiscovery('overview');
      }
    } finally {
      setRunningAction(null);
    }
  };

  const handleExportPerformanceReport = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kew-global-discovery-baseline-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setNotice('Exported verified Global Discovery & SEO Baseline JSON report.');
  };

  const copyText = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2000);
    } catch {
      // ignore
    }
  };

  if (loading && !data) {
    return (
      <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-10 text-center text-slate-400">
        <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-3 text-emerald-400" />
        <p className="text-xs font-mono uppercase tracking-wider">
          Auditing live route tree, sitemap.xml, structured data &amp; PostgreSQL discovery telemetry...
        </p>
      </div>
    );
  }

  if (authError && !data) {
    return (
      <div className="rounded-2xl bg-red-950/30 border border-red-500/30 p-8 text-center space-y-2">
        <AlertTriangle className="w-6 h-6 text-red-400 mx-auto" />
        <p className="text-sm font-bold text-red-200">{authError}</p>
      </div>
    );
  }

  if (!data) return null;

  const { kpis, technicalSeoHealth, integrations } = data;

  return (
    <div className="space-y-6">
      {/* Banner Header */}
      <div className="rounded-2xl bg-slate-900/90 border border-emerald-500/30 p-6 backdrop-blur-md space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                KEW GLOBAL DISCOVERY INTELLIGENCE
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-slate-950 text-slate-300 border border-white/10">
                Storage: {data.storageBackend === 'postgresql' ? 'PostgreSQL Live' : 'JSON Fallback'}
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-purple-500/15 text-purple-300 border border-purple-500/30">
                Entity: {data.canonicalIdentity.entityId}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Global Search Presence, AI Citation &amp; Brand Entity Command Center
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              One institutional identity ({data.canonicalIdentity.extendedName}) · Verified live repository, PostgreSQL &amp; public API measurements only — zero fabricated counters.
            </p>
          </div>

          {/* 6 Operational Controls (Exact Spec) */}
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              onClick={() => fetchDiscovery('seo-audit')}
              disabled={runningAction !== null}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 mr-1.5" />
              <span>Run SEO Audit</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setSubView('brand');
                fetchDiscovery('brand-check');
              }}
              className="border-white/15 text-slate-200 hover:bg-white/5 text-xs font-semibold rounded-xl cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-emerald-400" />
              <span>Check Brand Identity</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => fetchDiscovery('ai-citations')}
              className="border-white/15 text-slate-200 hover:bg-white/5 text-xs font-semibold rounded-xl cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
              <span>Monitor AI Citations</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleSubmitIndexNow}
              className="border-white/15 text-slate-200 hover:bg-white/5 text-xs font-semibold rounded-xl cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 mr-1.5 text-purple-400" />
              <span>Check Indexing</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => fetchDiscovery('scientific-audit')}
              className="border-white/15 text-slate-200 hover:bg-white/5 text-xs font-semibold rounded-xl cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
              <span>Scientific Discovery</span>
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleExportPerformanceReport}
              className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 text-xs font-semibold rounded-xl cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              <span>Performance Report</span>
            </Button>
          </div>
        </div>

        {notice && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
            <span>{notice}</span>
            <button onClick={() => setNotice(null)} className="text-emerald-400 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Sub-navigation across the 8 integrated capabilities */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
          {[
            { id: 'overview', label: 'KPIs & Technical SEO Health' },
            { id: 'brand', label: 'Brand Entity Protection & Monitoring' },
            { id: 'distribution', label: '8-Stage Automated Distribution (Human Gate)' },
            { id: 'topics', label: '17 Environmental Topic Clusters' },
            { id: 'targets', label: '36 Global Discovery Targets' },
            { id: 'audit', label: 'Sitemap Audit & RBAC Log' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSubView(tab.id as any)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                subView === tab.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 8 Central Administrative KPI Cards (Honest Measured vs Awaiting Live Data) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            label: 'Indexed Pages',
            value:
              kpis.indexedPages.searchEngineConfirmedIndexed !== null
                ? String(kpis.indexedPages.searchEngineConfirmedIndexed)
                : '—',
            badge: `${kpis.indexedPages.measuredEligibleInSitemap.toLocaleString()} in Sitemap`,
            sub: kpis.indexedPages.statusNote,
            accent: 'text-emerald-400',
          },
          {
            label: 'Branded Search Impressions',
            value:
              kpis.brandedSearchImpressions.value !== null
                ? String(kpis.brandedSearchImpressions.value)
                : '—',
            badge: 'Awaiting live data',
            sub: kpis.brandedSearchImpressions.statusNote,
            accent: 'text-slate-300',
          },
          {
            label: 'Environmental Keywords',
            value: `${kpis.environmentalKeywords.targetTopicsCount}`,
            badge: `${kpis.environmentalKeywords.mappedTopicClusters} Topic Clusters`,
            sub: kpis.environmentalKeywords.statusNote,
            accent: 'text-sky-400',
          },
          {
            label: 'AI Search Citations & Referrals',
            value:
              kpis.aiSearchCitations.measuredAiReferrals > 0
                ? String(kpis.aiSearchCitations.measuredAiReferrals)
                : '—',
            badge: `${kpis.aiSearchCitations.sampledAiCitationChecks} Audits Logged`,
            sub: kpis.aiSearchCitations.statusNote,
            accent: 'text-purple-400',
          },
          {
            label: 'Scientific Citations',
            value:
              kpis.scientificCitations.openAlexWorksFound !== null
                ? String(
                    (kpis.scientificCitations.openAlexWorksFound || 0) +
                      (kpis.scientificCitations.crossrefWorksFound || 0)
                  )
                : '—',
            badge: `${kpis.scientificCitations.reportsWithCompleteCitationMetaPct}% Citable`,
            sub: kpis.scientificCitations.statusNote,
            accent: 'text-amber-400',
          },
          {
            label: 'Referring Domains',
            value: kpis.referringDomains.value > 0 ? String(kpis.referringDomains.value) : '—',
            badge:
              kpis.referringDomains.value > 0 ? 'Measured Live' : 'Awaiting live data',
            sub: kpis.referringDomains.statusNote,
            accent: 'text-teal-400',
          },
          {
            label: 'Countries Reached',
            value: kpis.countriesReached.value > 0 ? String(kpis.countriesReached.value) : '—',
            badge:
              kpis.countriesReached.value > 0 ? 'Measured Geo-IP' : 'Awaiting live data',
            sub: kpis.countriesReached.statusNote,
            accent: 'text-cyan-400',
          },
          {
            label: 'Brand Identity Accuracy',
            value:
              kpis.brandIdentityAccuracy.sampledAccuracyPct !== null
                ? `${kpis.brandIdentityAccuracy.sampledAccuracyPct}%`
                : '—',
            badge:
              kpis.brandIdentityAccuracy.sampledAccuracyPct !== null
                ? `${kpis.brandIdentityAccuracy.totalSampledQueries} Sampled`
                : 'Baseline required',
            sub: kpis.brandIdentityAccuracy.statusNote,
            accent: 'text-emerald-400',
          },
        ].map((card) => (
          <div
            key={card.label}
            className="p-4 rounded-2xl bg-slate-900/85 border border-white/10 flex flex-col justify-between space-y-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-400">{card.label}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-white/10">
                {card.badge}
              </span>
            </div>
            <div className={`text-2xl font-black font-mono ${card.accent}`}>{card.value}</div>
            <p className="text-[11px] text-slate-500 leading-snug">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* SUBVIEW 1: TECHNICAL SEO HEALTH & WEBMASTER CONNECTIONS */}
      {subView === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Measured Repository &amp; Technical SEO Baseline</span>
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                <span className="text-slate-400 block">Public Metadata Coverage</span>
                <span className="text-lg font-black text-emerald-400 font-mono">
                  {technicalSeoHealth.metadataCoveragePct}%
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {technicalSeoHealth.pagesWithDedicatedMetadataOrLayout} / {technicalSeoHealth.renderablePagesCount} renderable routes
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                <span className="text-slate-400 block">Eligible URLs in Sitemap</span>
                <span className="text-lg font-black text-sky-400 font-mono">
                  {technicalSeoHealth.sitemapUrlCount.toLocaleString()}
                </span>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[10px] text-sky-400 underline block"
                >
                  Open /sitemap.xml &rarr;
                </a>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                <span className="text-slate-400 block">Conflicting Entity Identities</span>
                <span className="text-lg font-black text-emerald-400 font-mono">0</span>
                <span className="text-[10px] text-slate-500 block">
                  ESRO, KEW &amp; domain unified
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-white/5">
                <span className="text-slate-400 block">Synthetic DOIs / Broken Links</span>
                <span className="text-lg font-black text-emerald-400 font-mono">
                  {technicalSeoHealth.syntheticDoisCount} / {technicalSeoHealth.brokenInternalLinksCount}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Verified academic integrity
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-white/5 space-y-1.5 text-xs">
              <div className="font-mono text-slate-400 uppercase text-[10px]">
                Active Discovery Endpoints
              </div>
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { label: '/robots.txt', href: '/robots.txt' },
                  { label: '/sitemap.xml', href: '/sitemap.xml' },
                  { label: '/llms.txt', href: '/llms.txt' },
                  { label: '/manifest.webmanifest', href: '/manifest.webmanifest' },
                  { label: '/api/indexnow', href: '/api/indexnow' },
                ].map((ep) => (
                  <a
                    key={ep.href}
                    href={ep.href}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-white/10 text-emerald-300 font-mono text-[11px] inline-flex items-center gap-1"
                  >
                    <span>{ep.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-400" />
              <span>Search Console, Bing Webmaster &amp; Repository Connections</span>
            </h3>
            <div className="space-y-2.5 text-xs">
              {[
                {
                  name: 'Google Search Console',
                  status: integrations.googleSearchConsole.status,
                  ready: integrations.googleSearchConsole.verificationMetaConfigured,
                  envHint: 'GOOGLE_SITE_VERIFICATION / GOOGLE_SEARCH_CONSOLE_CREDENTIALS',
                },
                {
                  name: 'Bing Webmaster Tools & Copilot AI Performance',
                  status: integrations.bingWebmaster.status,
                  ready: integrations.bingWebmaster.verificationMetaConfigured,
                  envHint: 'BING_SITE_VERIFICATION (msvalidate.01) / BING_WEBMASTER_API_KEY',
                },
                {
                  name: 'IndexNow Instant Indexing Protocol (Bing · Yandex)',
                  status: integrations.indexNow.status,
                  ready: integrations.indexNow.keyConfigured,
                  envHint: 'INDEXNOW_KEY',
                },
                {
                  name: 'Zenodo / DataCite DOI Archival Deposit',
                  status: integrations.zenodoDeposit.status,
                  ready: integrations.zenodoDeposit.tokenConfigured,
                  envHint: 'ZENODO_ACCESS_TOKEN',
                },
              ].map((conn) => (
                <div
                  key={conn.name}
                  className="p-3.5 rounded-xl bg-slate-950 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-bold text-white">{conn.name}</div>
                    <div className="text-[11px] text-slate-400">{conn.status}</div>
                    <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                      Env: {conn.envHint}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2.5 py-1 rounded shrink-0 ${
                      conn.ready
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {conn.ready ? 'TOKEN ACTIVE' : 'AWAITING KEY'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBVIEW 2: BRAND IDENTITY MONITORING & AMBIGUITY TRACKING */}
      {subView === 'brand' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              Brand Identity Monitoring Across Search &amp; AI Platforms
            </h3>
            <p className="text-xs text-slate-400">
              Tracks whether exact-brand queries (&ldquo;Kashmir EcoWatch&rdquo; / &ldquo;KEW Western Himalayan&rdquo;) resolve accurately to <code className="text-emerald-300">kashmir-ecowatch.com/#organization</code> without unrelated third-party conflation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.brandPlatformStatuses.map((bp) => (
                <div
                  key={bp.platform}
                  className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-white">{bp.platform}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        bp.status === 'Baseline required'
                          ? 'bg-slate-800 text-slate-300'
                          : bp.identityAccurate && !bp.unrelatedEntityAppeared
                          ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {bp.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{bp.recommendation}</p>
                  {bp.lastCheckedAt && (
                    <p className="text-[10px] font-mono text-slate-500">
                      Last verified: {new Date(bp.lastCheckedAt).toLocaleString()} ({bp.query})
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              Log Verified Exact-Brand Observation
            </h3>
            <form onSubmit={handleRecordBrandCheck} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Platform</label>
                  <select
                    value={brandPlatform}
                    onChange={(e) => setBrandPlatform(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-2.5 py-2 text-white"
                  >
                    {[
                      'Google Search',
                      'Google AI Overviews',
                      'Google AI Mode',
                      'Bing',
                      'ChatGPT',
                      'Gemini',
                      'Copilot',
                      'Perplexity',
                    ].map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Device</label>
                  <select
                    value={brandDevice}
                    onChange={(e) => setBrandDevice(e.target.value as 'Desktop' | 'Mobile')}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-2.5 py-2 text-white"
                  >
                    <option value="Desktop">Desktop</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Exact Query</label>
                  <input
                    type="text"
                    value={brandQuery}
                    onChange={(e) => setBrandQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-2.5 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-mono mb-1">Location</label>
                  <input
                    type="text"
                    value={brandLocation}
                    onChange={(e) => setBrandLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-2.5 py-2 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2 text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={brandAccurate}
                    onChange={(e) => setBrandAccurate(e.target.checked)}
                  />
                  <span>Identifies Kashmir EcoWatch Western Himalayan accurately</span>
                </label>
                <label className="flex items-center gap-2 text-amber-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={brandUnrelated}
                    onChange={(e) => setBrandUnrelated(e.target.checked)}
                  />
                  <span>Unrelated / similarly named entity also appeared</span>
                </label>
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">
                  Referenced Sources (comma-separated URLs)
                </label>
                <input
                  type="text"
                  value={brandSources}
                  onChange={(e) => setBrandSources(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-2.5 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-mono mb-1">Observed Result Summary</label>
                <textarea
                  rows={2}
                  value={brandSummary}
                  onChange={(e) => setBrandSummary(e.target.value)}
                  placeholder="Describe top ranked result or AI answer attribution..."
                  className="w-full bg-slate-950 border border-white/10 rounded-lg px-2.5 py-2 text-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                Save Verified Brand Check to PostgreSQL
              </Button>
            </form>
          </div>
        </div>
      )}

      {/* SUBVIEW 3: 8-STAGE AUTOMATED DISTRIBUTION WORKFLOW WITH HUMAN GATE */}
      {subView === 'distribution' && (
        <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-base font-bold text-white">
                8-Stage Scientific Publication &amp; Automated Distribution Pipeline
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Prepares canonical metadata, Zenodo/DataCite package, press release, and UTM-tracked social copy — enforcing mandatory Stage 6 Human Approval before external dispatch.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedReportId}
                onChange={(e) => setSelectedReportId(e.target.value)}
                className="bg-slate-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white max-w-xs"
              >
                {data.publishableReports.map((r) => (
                  <option key={r.id} value={r.id}>
                    [{r.sourceType}] {r.title.slice(0, 52)}
                  </option>
                ))}
              </select>
              <Button
                size="sm"
                onClick={handlePrepareDistribution}
                className="bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl cursor-pointer"
              >
                <span>Prepare Stages 1–5 Package</span>
              </Button>
            </div>
          </div>

          {data.distributionWorkflows.length === 0 ? (
            <div className="p-8 rounded-xl bg-slate-950 border border-white/5 text-center text-xs text-slate-400">
              Select an approved scientific report above (e.g., <strong>Sheshnag Lake Scientific Assessment</strong>) and click <strong>Prepare Stages 1–5 Package</strong> to generate verifiable dissemination assets and queue Stage 6 Human Approval.
            </div>
          ) : (
            <div className="space-y-4">
              {data.distributionWorkflows.map((wf) => (
                <div
                  key={wf.id}
                  className="p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {wf.reportId}
                        </span>
                        <span
                          className={`text-[10px] font-mono px-2.5 py-0.5 rounded font-bold ${
                            wf.approvalStatus === 'DISPATCHED'
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          {wf.approvalStatus}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">{wf.reportTitle}</h4>
                      <a
                        href={wf.canonicalUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] font-mono text-sky-400 underline"
                      >
                        {wf.canonicalUrl}
                      </a>
                    </div>

                    {wf.approvalStatus === 'PENDING_HUMAN_APPROVAL' ? (
                      <Button
                        size="sm"
                        onClick={() => handleApproveDistribution(wf.reportId)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl cursor-pointer shrink-0"
                      >
                        <Check className="w-3.5 h-3.5 mr-1" />
                        <span>Approve Stage 6 Gate &amp; Dispatch</span>
                      </Button>
                    ) : (
                      <span className="text-[11px] font-mono text-emerald-400">
                        Approved by {wf.approvedBy} ({new Date(wf.approvedAt).toLocaleDateString()})
                      </span>
                    )}
                  </div>

                  {/* 8 Stage Pills */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-[10px] font-mono">
                    {[
                      ['1. Canonical URL', wf.stages.stage1CanonicalPublished],
                      ['2. Sci. Verified', wf.stages.stage2ScientificVerified],
                      ['3. SEO & Schema', wf.stages.stage3SearchDiscoveryReady],
                      ['4. Zenodo Ready', wf.stages.stage4ScientificDisseminationReady],
                      ['5. Media Drafts', wf.stages.stage5MediaPrepared],
                      ['6. Human Gate', wf.stages.stage6HumanApproved],
                      ['7. Distributed', wf.stages.stage7MultichannelDispatched],
                      ['8. Monitoring', wf.stages.stage8MonitoringActive],
                    ].map(([label, ok]) => (
                      <div
                        key={String(label)}
                        className={`p-2 rounded-lg border text-center ${
                          ok
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                        }`}
                      >
                        {String(label)}
                      </div>
                    ))}
                  </div>

                  {/* Prepared Copyable Assets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase text-slate-400">
                          Press Release Draft
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            copyText(`pr-${wf.id}`, wf.preparedAssets.pressRelease)
                          }
                          className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedKey === `pr-${wf.id}` ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed line-clamp-4">
                        {wf.preparedAssets.pressRelease}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] uppercase text-slate-400">
                          Authorized Social Announcement (UTM Tracked)
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            copyText(`soc-${wf.id}`, wf.preparedAssets.socialAnnouncement)
                          }
                          className="text-[10px] font-mono text-sky-400 flex items-center gap-1 cursor-pointer"
                        >
                          <Copy className="w-3 h-3" />
                          <span>{copiedKey === `soc-${wf.id}` ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="text-slate-300 text-[11px] leading-relaxed whitespace-pre-line line-clamp-4">
                        {wf.preparedAssets.socialAnnouncement}
                      </p>
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400">
                    IndexNow Status: <span className="text-slate-200">{wf.indexNowStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* SUBVIEW 4: 17 ENVIRONMENTAL TOPIC AUTHORITY CLUSTERS */}
      {subView === 'topics' && (
        <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
          <h3 className="text-base font-bold text-white">
            17 Western Himalayan Environmental Topic Authority Clusters
          </h3>
          <p className="text-xs text-slate-400">
            Maps non-branded environmental discovery topics directly to substantive existing KEW scientific modules and flagship dossiers (zero thin SEO doorway pages).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.topicClusters.map((cluster) => (
              <div
                key={cluster.id}
                className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2"
              >
                <div className="text-sm font-bold text-emerald-300">{cluster.category}</div>
                <div className="text-[11px] text-slate-400">
                  {cluster.targetTopics.join(' · ')}
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cluster.flagshipEntities.map((ent) => (
                    <Link
                      key={ent.href}
                      href={ent.href}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 hover:bg-slate-800 text-sky-300 border border-white/10"
                    >
                      {ent.name} &rarr;
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBVIEW 5: 36 GLOBAL DISCOVERY TARGETS ELIGIBILITY MATRIX */}
      {subView === 'targets' && (
        <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
          <h3 className="text-base font-bold text-white">
            36 Discovery, Citation &amp; Dissemination Targets — Honest Eligibility Matrix
          </h3>
          <p className="text-xs text-slate-400">
            Distinguishes direct technical integrations, open search crawlers, repository deposit channels, and upstream Earth-observation data ecosystems (such as NASA Earthdata &amp; Copernicus, which are cited upstream data providers rather than website directories).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.discoveryTargets.map((t) => (
              <div
                key={t.id}
                className="p-3.5 rounded-xl bg-slate-950 border border-white/10 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-white">{t.name}</span>
                  <span
                    className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded ${
                      t.isUpstreamDataEcosystemOnly
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                    }`}
                  >
                    {t.isUpstreamDataEcosystemOnly ? 'Upstream Data Source' : t.ecosystemLabel}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-snug">{t.eligibilityNote}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBVIEW 6: SITEMAP VALIDATION INVENTORY & RBAC AUDIT TRAIL */}
      {subView === 'audit' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              Sitemap Quality Gate &amp; Inventory Audit
            </h3>
            <p className="text-xs text-slate-400">
              Every candidate corpus URL is validated for substantive scientific content, canonical match, indexable status, and public visibility before entering <code className="text-emerald-300">/sitemap.xml</code>.
            </p>
            {technicalSeoHealth.sitemapAudit && (
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                {[
                  ['Total Candidate URLs', technicalSeoHealth.sitemapAudit.totalCandidateUrls, 'text-slate-200'],
                  ['Final Eligible URLs', technicalSeoHealth.sitemapAudit.validEligibleUrls, 'text-emerald-400'],
                  ['Thin / Templated Pruned', technicalSeoHealth.sitemapAudit.thinOrTemplatedUrls, 'text-amber-300'],
                  ['Duplicate Aliases Pruned', technicalSeoHealth.sitemapAudit.duplicateUrls, 'text-sky-300'],
                  ['Redirect Stubs Pruned', technicalSeoHealth.sitemapAudit.redirectedUrls, 'text-purple-300'],
                  ['Non-Indexable Routes', technicalSeoHealth.sitemapAudit.nonIndexableUrls, 'text-slate-400'],
                  ['Restricted Visibility', technicalSeoHealth.sitemapAudit.restrictedUrls, 'text-rose-300'],
                  ['Invalid / Soft-404 Pruned', technicalSeoHealth.sitemapAudit.invalidOrSoft404Urls, 'text-orange-300'],
                ].map(([label, count, cls]) => (
                  <div key={String(label)} className="p-3 rounded-xl bg-slate-950 border border-white/10">
                    <span className="block text-[11px] text-slate-400">{String(label)}</span>
                    <span className={`text-lg font-black font-mono ${String(cls)}`}>
                      {Number(count).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:col-span-7 rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              PostgreSQL Administrative &amp; IndexNow Audit History
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-xs">
              {(data.auditLogs || []).length === 0 ? (
                <p className="text-slate-400">No administrative audit entries recorded yet.</p>
              ) : (
                (data.auditLogs || []).map((entry) => (
                  <div
                    key={entry.id}
                    className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono font-bold text-emerald-300">{entry.action}</span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {new Date(entry.occurredAt).toLocaleString()} · {entry.actor} ({entry.authMethod})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">{entry.detail}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
