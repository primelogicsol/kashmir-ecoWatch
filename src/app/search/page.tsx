'use client';

import React, { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import {
  Search, X, ArrowRight, ArrowUpRight, MapPin,
  Droplet, Shield, Activity, AlertTriangle, BookOpen,
  Database, CheckCircle2, ChevronRight, Home, Sparkles,
  Layers, Compass, Scale, Calendar, Users, Satellite,
  BarChart3, SlidersHorizontal, Map as MapIcon, List,
  Columns, Clock, ShieldCheck, Globe, Info, RefreshCw, FileText,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { ScientificQuestionWorkbench } from '@/components/search/ScientificQuestionWorkbench';
import {
  ScientificSynthesisResponse,
  isScientificQuestionLike,
} from '@/lib/search/scientific-qa-types';
import {
  RESULT_CLASS_META,
  SEARCH_DOMAIN_META,
  SearchDomain,
  SearchQueryResponse,
  SearchResultClass,
  TemporalClassification,
} from '@/lib/search/types';

const SearchMapExplorer = dynamic(
  () => import('@/components/search/SearchMapExplorer').then((m) => ({ default: m.SearchMapExplorer })),
  {
    ssr: false,
    loading: () => (
      <div className="h-[420px] rounded-lg bg-slate-900/70 border border-white/10 flex items-center justify-center text-sm text-slate-400">
        Loading geospatial intelligence layer...
      </div>
    ),
  }
);

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

const SUBREGION_OPTIONS = [
  { value: 'all', label: 'All 6 Subregions' },
  { value: 'Kashmir', label: 'Kashmir' },
  { value: 'Jammu', label: 'Jammu' },
  { value: 'Ladakh', label: 'Ladakh' },
  { value: 'Azad Kashmir', label: 'Azad Kashmir (AJ&K)' },
  { value: 'Gilgit', label: 'Gilgit' },
  { value: 'Baltistan', label: 'Baltistan' },
  { value: 'Gilgit-Baltistan', label: 'Gilgit-Baltistan (Combined)' },
];

const TEMPORAL_OPTIONS: Array<{ value: TemporalClassification | 'all'; label: string }> = [
  { value: 'all', label: 'All Temporal Layers' },
  { value: 'operational_feed', label: 'Operational & Current Feeds' },
  { value: 'forecast', label: 'Model Forecasts & Ensembles' },
  { value: 'periodic_monitoring', label: 'Periodic Scientific Monitoring' },
  { value: 'historical_archive', label: 'Historical Archives' },
  { value: 'reference', label: 'Reference & Statutory Baselines' },
];

const REPRESENTATIVE_QUERIES = [
  'Hangul',
  'Wular Lake',
  'Sheshnag Lake',
  'Western Disturbances',
  'Extreme Rainfall',
  'Forest Fire Archive',
  'Glacier Recession',
  'Environmental PIL',
  'EIA Reports',
  'Green Heroes',
  'Spring Discharge',
  'Air Quality',
  'Wetland Encroachment',
  'Pollinator Windows',
  'Citizen Science',
  'Gilgit-Baltistan',
  'ولر جھیل',
  'हंगुल',
];

function getTrustBadgeStyle(trustBadge: string): string {
  switch (trustBadge) {
    case 'Official Warning':
      return 'bg-rose-500/15 text-rose-300 border-rose-500/35';
    case 'Statutory / Judicial Record':
      return 'bg-amber-500/15 text-amber-300 border-amber-500/35';
    case 'Peer-Reviewed / Institutional':
      return 'bg-emerald-500/15 text-emerald-300 border-emerald-500/35';
    case 'Field Verified':
      return 'bg-teal-500/15 text-teal-300 border-teal-500/35';
    case 'Satellite-Derived':
      return 'bg-sky-500/15 text-sky-300 border-sky-500/35';
    case 'Modelled / Reanalysis':
      return 'bg-indigo-500/15 text-indigo-300 border-indigo-500/35';
    case 'Community Reported':
      return 'bg-purple-500/15 text-purple-300 border-purple-500/35';
    default:
      return 'bg-slate-800 text-slate-300 border-white/15';
  }
}

function getTemporalLabel(t: TemporalClassification): string {
  switch (t) {
    case 'operational_feed':
      return 'Operational';
    case 'forecast':
      return 'Forecast';
    case 'historical_archive':
      return 'Historical Archive';
    case 'periodic_monitoring':
      return 'Monitoring';
    default:
      return 'Reference';
  }
}

function SearchWorkbench() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestBoxRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState(() => searchParams.get('q') || '');
  const [searchMode, setSearchMode] = useState<'search' | 'ask'>(() =>
    searchParams.get('mode') === 'ask' ? 'ask' : 'search'
  );
  const [resultClass, setResultClass] = useState<SearchResultClass | 'all'>(
    () => (searchParams.get('resultClass') as SearchResultClass) || 'all'
  );
  const [domain, setDomain] = useState<SearchDomain | 'all'>(
    () => (searchParams.get('domain') as SearchDomain) || 'all'
  );
  const [subregion, setSubregion] = useState<string>(() => searchParams.get('subregion') || 'all');
  const [district, setDistrict] = useState<string>(() => searchParams.get('district') || '');
  const [watershed, setWatershed] = useState<string>(() => searchParams.get('watershed') || '');
  const [temporalNature, setTemporalNature] = useState<TemporalClassification | 'all'>(
    () => (searchParams.get('temporalNature') as TemporalClassification) || 'all'
  );
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(
    () => searchParams.get('verifiedOnly') === 'true'
  );
  const [dateFrom, setDateFrom] = useState<string>(() => searchParams.get('dateFrom') || '');
  const [dateTo, setDateTo] = useState<string>(() => searchParams.get('dateTo') || '');
  const [sort, setSort] = useState<'relevance' | 'updated' | 'title_asc'>(
    () => (searchParams.get('sort') as any) || 'relevance'
  );
  const [page, setPage] = useState<number>(() => Number(searchParams.get('page') || '1') || 1);
  const [viewMode, setViewMode] = useState<'list' | 'split' | 'map'>('list');
  const [nearFilter, setNearFilter] = useState<{ lat: number; lng: number; radiusKm: number } | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [data, setData] = useState<SearchQueryResponse | null>(null);
  const [baselineStats, setBaselineStats] = useState<SearchQueryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Stage 2: Scientific Question & Cited Synthesis state
  const [qaData, setQaData] = useState<ScientificSynthesisResponse | null>(null);
  const [qaLoading, setQaLoading] = useState<boolean>(false);
  const [qaError, setQaError] = useState<string | null>(null);

  // Instant suggestions state
  const [suggestionsOpen, setSuggestionsOpen] = useState<boolean>(false);
  const [suggestGroups, setSuggestGroups] = useState<any[]>([]);

  // Index health diagnostics modal
  const [healthOpen, setHealthOpen] = useState<boolean>(false);
  const [healthReport, setHealthReport] = useState<any | null>(null);

  // Sync URL -> local state when navigating from external header/hero links
  useEffect(() => {
    const urlQ = searchParams.get('q') || '';
    const urlMode = searchParams.get('mode') === 'ask' ? 'ask' : 'search';
    const urlDomain = (searchParams.get('domain') as SearchDomain) || 'all';
    const urlClass = (searchParams.get('resultClass') as SearchResultClass) || 'all';
    const urlSub = searchParams.get('subregion') || 'all';
    setQuery(urlQ);
    setSearchMode(urlMode);
    setDomain(urlDomain);
    setResultClass(urlClass);
    setSubregion(urlSub);
  }, [searchParams]);

  // Keyboard "/" shortcut to focus search bar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setSuggestionsOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Dismiss autocomplete when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (suggestBoxRef.current && !suggestBoxRef.current.contains(e.target as Node)) {
        setSuggestionsOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, []);

  // Load baseline corpus facet totals once for the empty-query Discovery Dashboard
  useEffect(() => {
    fetch('/api/search?limit=1')
      .then((r) => (r.ok ? r.json() : null))
      .then((res) => {
        if (res) setBaselineStats(res);
      })
      .catch(() => {});
  }, []);

  const hasActiveCriteria =
    query.trim().length >= 2 ||
    resultClass !== 'all' ||
    domain !== 'all' ||
    subregion !== 'all' ||
    Boolean(district) ||
    Boolean(watershed) ||
    temporalNature !== 'all' ||
    verifiedOnly ||
    Boolean(dateFrom) ||
    Boolean(dateTo) ||
    Boolean(nearFilter);

  const syncUrlParams = useCallback(
    (overrides: Record<string, string | null>) => {
      const p = new URLSearchParams(window.location.search);
      for (const [k, v] of Object.entries(overrides)) {
        if (!v || v === 'all' || v === 'false' || v === '1') p.delete(k);
        else p.set(k, v);
      }
      const qs = p.toString();
      router.replace(qs ? `/search?${qs}` : '/search', { scroll: false });
    },
    [router]
  );

  // Execute main search query whenever criteria change
  useEffect(() => {
    if (!hasActiveCriteria) {
      setData(null);
      setError(null);
      return;
    }

    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const sp = new URLSearchParams();
        if (query.trim()) sp.set('q', query.trim());
        if (resultClass !== 'all') sp.set('resultClass', resultClass);
        if (domain !== 'all') sp.set('domain', domain);
        if (subregion !== 'all') sp.set('subregion', subregion);
        if (district) sp.set('district', district);
        if (watershed) sp.set('watershed', watershed);
        if (temporalNature !== 'all') sp.set('temporalNature', temporalNature);
        if (verifiedOnly) sp.set('verifiedOnly', 'true');
        if (dateFrom) sp.set('dateFrom', dateFrom);
        if (dateTo) sp.set('dateTo', dateTo);
        if (nearFilter) {
          sp.set('nearLat', String(nearFilter.lat));
          sp.set('nearLng', String(nearFilter.lng));
          sp.set('radiusKm', String(nearFilter.radiusKm));
        }
        sp.set('sort', sort);
        sp.set('page', String(page));
        sp.set('limit', '24');

        const res = await fetch(`/api/search?${sp.toString()}`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: SearchQueryResponse = await res.json();
        setData(json);
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          setError('Unable to reach search service. Please retry.');
        }
      } finally {
        setLoading(false);
      }
    }, 140);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [
    hasActiveCriteria,
    query,
    resultClass,
    domain,
    subregion,
    district,
    watershed,
    temporalNature,
    verifiedOnly,
    dateFrom,
    dateTo,
    nearFilter,
    sort,
    page,
  ]);

  // Instant typeahead suggestions (active in standard index search mode)
  useEffect(() => {
    if (searchMode === 'ask' || !suggestionsOpen || query.trim().length < 2) {
      setSuggestGroups([]);
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/search/suggest?q=${encodeURIComponent(query.trim())}&limit=3`, {
        signal: ctrl.signal,
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (d?.groups) setSuggestGroups(d.groups);
        })
        .catch(() => {});
    }, 90);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query, suggestionsOpen, searchMode]);

  // Execute Scientific Question & Cited Synthesis when in 'ask' mode
  useEffect(() => {
    if (searchMode !== 'ask') return;
    if (query.trim().length < 3) {
      setQaData(null);
      setQaError(null);
      return;
    }

    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setQaLoading(true);
      setQaError(null);
      try {
        const sp = new URLSearchParams();
        sp.set('q', query.trim());
        if (subregion !== 'all') sp.set('subregion', subregion);
        if (verifiedOnly) sp.set('verifiedOnly', 'true');

        const res = await fetch(`/api/search/ask?${sp.toString()}`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json: ScientificSynthesisResponse = await res.json();
        setQaData(json);
      } catch (err: any) {
        if (err?.name !== 'AbortError') {
          setQaError('Unable to compile scientific evidence synthesis. Please retry.');
        }
      } finally {
        setQaLoading(false);
      }
    }, 200);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [searchMode, query, subregion, verifiedOnly]);

  const switchMode = (nextMode: 'search' | 'ask') => {
    setSearchMode(nextMode);
    setSuggestionsOpen(false);
    syncUrlParams({ mode: nextMode === 'ask' ? 'ask' : null });
  };

  const applyQuery = (val: string) => {
    setQuery(val);
    setPage(1);
    setSuggestionsOpen(false);
    syncUrlParams({ q: val.trim() || null, page: null });
  };

  const resetAllFilters = () => {
    setQuery('');
    setResultClass('all');
    setDomain('all');
    setSubregion('all');
    setDistrict('');
    setWatershed('');
    setTemporalNature('all');
    setVerifiedOnly(false);
    setDateFrom('');
    setDateTo('');
    setNearFilter(null);
    setSort('relevance');
    setPage(1);
    router.replace('/search', { scroll: false });
  };

  const openHealthAudit = async () => {
    setHealthOpen(true);
    if (!healthReport) {
      try {
        const res = await fetch('/api/search/health');
        if (res.ok) setHealthReport(await res.json());
      } catch {}
    }
  };

  const activeFacets = data?.facets || baselineStats?.facets;
  const totalIndexed =
    data?.indexStats?.totalIndexedDocuments ||
    baselineStats?.indexStats?.totalIndexedDocuments ||
    0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <main className="flex-1 relative z-10 pt-24 sm:pt-28 md:pt-32 pb-20 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb + Index Diagnostics Trigger */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <nav className="flex items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-emerald-400 transition-colors flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-white font-medium">
              Western Himalayan Environmental Knowledge &amp; Intelligence Search
            </span>
          </nav>

          <button
            type="button"
            onClick={openHealthAudit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-slate-900 border border-white/10 hover:border-emerald-500/40 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              Index Health &amp; Coverage{totalIndexed ? ` (${totalIndexed.toLocaleString()} Records)` : ''}
            </span>
          </button>
        </div>

        {/* Phase 4 Required Identity Header */}
        <header className="mb-8 max-w-4xl">
          <div className="mb-3">
            <KewBrandIdentity variant="eyebrow" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[4px] bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>WESTERN HIMALAYAN ENVIRONMENTAL KNOWLEDGE &amp; INTELLIGENCE SEARCH</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            Explore Kashmir EcoWatch Intelligence
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Discover environmental research, ecological records, geospatial datasets, hazard intelligence, conservation resources, scientific assessments and public environmental initiatives across the Western Himalayan region.
          </p>
        </header>

        {/* Mode Switcher: Standard Index Search vs Evidence-Grounded Scientific Q&A */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <button
            type="button"
            onClick={() => switchMode('search')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
              searchMode === 'search'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white hover:border-white/25'
            }`}
          >
            <Search className="w-4 h-4 shrink-0" />
            <span>Search Index &amp; GIS Explorer</span>
            {totalIndexed > 0 && (
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  searchMode === 'search' ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'
                }`}
              >
                {totalIndexed.toLocaleString()}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => switchMode('ask')}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
              searchMode === 'ask'
                ? 'bg-emerald-600 text-white border-emerald-500 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900 text-slate-300 border-white/10 hover:text-white hover:border-emerald-500/40'
            }`}
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>Scientific Q&amp;A Synthesis</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                searchMode === 'ask' ? 'bg-white/20 text-white' : 'bg-emerald-500/15 text-emerald-300'
              }`}
            >
              Cited Brief
            </span>
          </button>
        </div>

        {/* Universal Search / Scientific Inquiry Bar */}
        <div ref={suggestBoxRef} className="relative mb-5">
          <div className="flex items-center gap-2 sm:gap-3 bg-slate-900 border border-white/15 focus-within:border-emerald-500/60 focus-within:ring-2 focus-within:ring-emerald-500/20 rounded-xl p-2 sm:p-3 shadow-2xl transition-all">
            {searchMode === 'ask' ? (
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 ml-1.5 shrink-0" />
            ) : (
              <Search className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400 ml-1.5 shrink-0" />
            )}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                const v = e.target.value;
                setQuery(v);
                setPage(1);
                if (searchMode === 'search') setSuggestionsOpen(true);
                syncUrlParams({ q: v.trim() || null, page: null });
              }}
              onFocus={() => {
                if (searchMode === 'search') setSuggestionsOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setSuggestionsOpen(false);
                } else if (e.key === 'Escape') {
                  setSuggestionsOpen(false);
                }
              }}
              placeholder={
                searchMode === 'ask'
                  ? 'Ask a scientific question (e.g., What environmental changes have been documented around Wular Lake since 2000?)...'
                  : 'Search modules, species (Hangul, ہنگول, हंगुल), lakes, glaciers, PIL cases, EIA reports, hazards, districts...'
              }
              aria-label={
                searchMode === 'ask'
                  ? 'Ask an evidence-grounded scientific question'
                  : 'Explore Kashmir EcoWatch Intelligence'
              }
              className="flex-1 bg-transparent border-none outline-none text-white text-sm sm:text-base md:text-lg px-1 sm:px-2 placeholder:text-slate-500 min-w-0"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  applyQuery('');
                  inputRef.current?.focus();
                }}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
                title="Clear query"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
            {searchMode === 'search' ? (
              <button
                type="button"
                onClick={() => setShowFilters((v) => !v)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors shrink-0 cursor-pointer ${
                  showFilters || domain !== 'all' || subregion !== 'all' || district || watershed || temporalNature !== 'all' || verifiedOnly
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Filters</span>
              </button>
            ) : (
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-xs font-semibold shrink-0">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Citation-Locked</span>
              </span>
            )}
          </div>

          {/* Smart Question-Detection Callout Banner in Standard Search Mode */}
          {searchMode === 'search' && isScientificQuestionLike(query) && (
            <div className="mt-3 px-4 py-3 rounded-xl bg-emerald-950/50 border border-emerald-500/35 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-emerald-200">
                <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Scientific question detected — assemble a <strong>Citation-Locked Evidence Synthesis</strong> strictly from traceable KEW records?
                </span>
              </div>
              <button
                type="button"
                onClick={() => switchMode('ask')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                <span>Synthesize Cited Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Scope & Epistemic Controls in Scientific Q&A Mode */}
          {searchMode === 'ask' && (
            <div className="mt-3 px-4 py-3 rounded-xl bg-slate-900/80 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Subregion Scope:
                  </span>
                  <select
                    value={subregion}
                    onChange={(e) => {
                      const v = e.target.value;
                      setSubregion(v);
                      syncUrlParams({ subregion: v });
                    }}
                    className="bg-slate-950 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    {SUBREGION_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                <label className="inline-flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="rounded border-white/20 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                  />
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Tier I &amp; II Only (Exclude Preliminary Candidate Alerts &amp; Reanalysis Grids)</span>
                </label>
              </div>

              {query.trim() && (
                <button
                  type="button"
                  onClick={() => {
                    applyQuery('');
                    setQaData(null);
                  }}
                  className="text-slate-400 hover:text-white underline font-semibold cursor-pointer"
                >
                  Reset Inquiry
                </button>
              )}
            </div>
          )}

          {/* Instant Typeahead Suggestions Popover */}
          {searchMode === 'search' && suggestionsOpen && query.trim().length >= 2 && suggestGroups.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-slate-900 border border-white/15 shadow-2xl z-40 overflow-hidden divide-y divide-white/10 max-h-[420px] overflow-y-auto">
              {suggestGroups.map((grp) => (
                <div key={grp.groupKey} className="p-3">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 mb-1.5">
                    {grp.groupLabel}
                  </div>
                  <div className="space-y-1">
                    {grp.items.map((it: any) => (
                      <Link
                        key={it.id}
                        href={it.canonicalUrl}
                        onClick={() => setSuggestionsOpen(false)}
                        className="flex items-center justify-between gap-3 px-2.5 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="text-xs sm:text-sm font-semibold text-white group-hover:text-emerald-300 truncate">
                            {it.title}
                          </div>
                          {it.subtitle && (
                            <div className="text-[11px] text-slate-400 truncate">{it.subtitle}</div>
                          )}
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded border shrink-0 hidden sm:inline-block ${getTrustBadgeStyle(it.trustBadge)}`}>
                          {it.trustBadge}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="px-4 py-2.5 bg-slate-950/90 flex items-center justify-between text-xs text-slate-400">
                <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-[10px]">Enter</kbd> to view all ranked matches below</span>
                <button
                  type="button"
                  onClick={() => setSuggestionsOpen(false)}
                  className="text-emerald-400 hover:underline font-medium"
                >
                  Close Preview
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stage 2: Scientific Q&A Synthesis Mode vs Stage 1: Faceted Index & GIS Search Mode */}
        {searchMode === 'ask' ? (
          <ScientificQuestionWorkbench
            data={qaData}
            loading={qaLoading}
            error={qaError}
            onSelectQuestion={(qStr) => {
              setQuery(qStr);
              syncUrlParams({ mode: 'ask', q: qStr });
            }}
            onSwitchToIndexSearch={() => switchMode('search')}
          />
        ) : (
          <>
        {/* Multi-Dimensional Filter Panel (Domain, 6 Subregions, District, Watershed, Temporal, Verified, Dates, Sort) */}
        {(showFilters || hasActiveCriteria) && (
          <div className="mb-6 p-4 rounded-xl bg-slate-900/80 border border-white/10 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Search Domain
                </label>
                <select
                  value={domain}
                  onChange={(e) => {
                    const v = e.target.value as SearchDomain | 'all';
                    setDomain(v);
                    setPage(1);
                    syncUrlParams({ domain: v });
                  }}
                  className="w-full bg-slate-950 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="all">All 11 KEW Domains</option>
                  {(Object.keys(SEARCH_DOMAIN_META) as SearchDomain[]).map((dKey) => (
                    <option key={dKey} value={dKey}>
                      {SEARCH_DOMAIN_META[dKey].label}
                      {activeFacets?.domains?.[dKey] !== undefined ? ` (${activeFacets.domains[dKey]})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Western Himalayan Subregion
                </label>
                <select
                  value={subregion}
                  onChange={(e) => {
                    const v = e.target.value;
                    setSubregion(v);
                    setPage(1);
                    syncUrlParams({ subregion: v });
                  }}
                  className="w-full bg-slate-950 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {SUBREGION_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  District Filter
                </label>
                <select
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    setPage(1);
                  }}
                  className="w-full bg-slate-950 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="">All Districts</option>
                  {(activeFacets?.districts || []).map((d) => (
                    <option key={d.name} value={d.name}>
                      {d.name} ({d.count})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                  Temporal &amp; Freshness Layer
                </label>
                <select
                  value={temporalNature}
                  onChange={(e) => {
                    setTemporalNature(e.target.value as TemporalClassification | 'all');
                    setPage(1);
                  }}
                  className="w-full bg-slate-950 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                >
                  {TEMPORAL_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-white/10">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Watershed / River Basin
                  </label>
                  <select
                    value={watershed}
                    onChange={(e) => {
                      setWatershed(e.target.value);
                      setPage(1);
                    }}
                    className="w-full bg-slate-950 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="">All Watersheds &amp; Basins</option>
                    {(activeFacets?.watersheds || []).map((w) => (
                      <option key={w.name} value={w.name}>
                        {w.name} ({w.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Observation From Date
                  </label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => {
                      setDateFrom(e.target.value);
                      setPage(1);
                    }}
                    className="w-full bg-slate-950 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Observation To Date
                  </label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => {
                      setDateTo(e.target.value);
                      setPage(1);
                    }}
                    className="w-full bg-slate-950 border border-white/15 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Sort Order
                  </label>
                  <select
                    value={sort}
                    onChange={(e) => {
                      setSort(e.target.value as any);
                      setPage(1);
                    }}
                    className="w-full bg-slate-950 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="relevance">Relevance (Exact &amp; Scientific Priority)</option>
                    <option value="updated">Most Recent Observation / Update</option>
                    <option value="title_asc">Alphabetical (A → Z)</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10 text-xs">
              <label className="inline-flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => {
                    setVerifiedOnly(e.target.checked);
                    setPage(1);
                  }}
                  className="rounded border-white/20 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                />
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Institutional, Judicial &amp; Field Sources Only (exclude unverified community &amp; pure model grids)</span>
              </label>

              {hasActiveCriteria && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-xs font-semibold text-slate-400 hover:text-white underline cursor-pointer"
                >
                  Reset All Search &amp; Filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Phase 4 Result Class Tabs + Map View Mode Toggle */}
        {hasActiveCriteria && (
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-6 pb-3 border-b border-white/10">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { key: 'all', label: 'All Intelligence' },
                ...(Object.keys(RESULT_CLASS_META) as SearchResultClass[]).map((rc) => ({
                  key: rc,
                  label: RESULT_CLASS_META[rc].shortLabel,
                })),
              ].map((tab) => {
                const count = data?.facets?.resultClasses?.[tab.key] ?? 0;
                const active = resultClass === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setResultClass(tab.key as SearchResultClass | 'all');
                      setPage(1);
                      syncUrlParams({ resultClass: tab.key });
                    }}
                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      active
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-slate-900 text-slate-300 hover:text-white border border-white/10'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                        active ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* View Switcher: List / Split / Map */}
            <div className="flex items-center gap-1.5 self-start lg:self-auto">
              {[
                { id: 'list', label: 'Cards', icon: List },
                { id: 'split', label: 'Split + Map', icon: Columns },
                { id: 'map', label: `GIS Map (${data?.facets?.withCoordinates ?? 0})`, icon: MapIcon },
              ].map((vm) => {
                const Icon = vm.icon;
                const active = viewMode === vm.id;
                return (
                  <button
                    key={vm.id}
                    type="button"
                    onClick={() => setViewMode(vm.id as any)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      active
                        ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                        : 'bg-slate-900 border-white/10 text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{vm.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Did-You-Mean Spelling Suggestion */}
        {data?.didYouMean && (
          <div className="mb-5 px-4 py-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs sm:text-sm text-amber-200 flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Did you mean{' '}
              <button
                type="button"
                onClick={() => applyQuery(data.didYouMean!)}
                className="font-bold text-emerald-300 underline hover:text-emerald-200 cursor-pointer"
              >
                {data.didYouMean}
              </button>
              ?
            </span>
          </div>
        )}

        {/* Active Search Execution Summary */}
        {hasActiveCriteria && data && (
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 mb-5 px-1">
            <div>
              Found <strong className="text-white">{data.totalHits.toLocaleString()}</strong> verified platform record{data.totalHits === 1 ? '' : 's'}
              {data.query ? (
                <>
                  {' '}for &ldquo;<span className="text-emerald-400 font-semibold">{data.query}</span>&rdquo;
                </>
              ) : null}
              {subregion !== 'all' ? <> in <strong className="text-sky-300">{subregion}</strong></> : null}
            </div>
            <div className="flex items-center gap-3 font-mono text-[11px] text-slate-500">
              <span>{data.engine === 'postgresql_fts_hybrid' ? 'PostgreSQL FTS + pg_trgm' : 'Resilient Hybrid Index'}</span>
              <span>•</span>
              <span>{data.latencyMs} ms</span>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-rose-950/50 border border-rose-500/30 text-sm text-rose-200">
            {error}
          </div>
        )}

        {/* Loading Skeleton */}
        {loading && !data && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="kew-card-shell h-48 animate-pulse bg-slate-900/60" />
            ))}
          </div>
        )}

        {/* Results Area */}
        {hasActiveCriteria && data ? (
          data.totalHits > 0 ? (
            <div className="space-y-6">
              {viewMode === 'map' && (
                <SearchMapExplorer
                  pins={data.mapPins}
                  nearFilter={nearFilter}
                  onSetNearFilter={(nf) => {
                    setNearFilter(nf);
                    setPage(1);
                  }}
                />
              )}

              {viewMode !== 'map' && (
                <div className={viewMode === 'split' ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 items-start' : ''}>
                  <div
                    className={
                      viewMode === 'split'
                        ? 'lg:col-span-7 grid grid-cols-1 gap-4'
                        : 'grid grid-cols-1 md:grid-cols-2 gap-5'
                    }
                  >
                    {data.hits.map(({ document: doc, distanceKm }) => {
                      const DomainIcon = DOMAIN_ICONS[doc.domain] || Layers;
                      const multiPreview = [
                        ...(doc.multilingualTerms?.ur || []).slice(0, 1),
                        ...(doc.multilingualTerms?.ks || []).slice(0, 1),
                        ...(doc.multilingualTerms?.hi || []).slice(0, 1),
                      ];

                      return (
                        <Card key={doc.id} className="kew-card-shell h-full p-5 group">
                          {/* 1. ICON top-left + Trust & Temporal badges top-right */}
                          <div className="kew-card-top-row">
                            <div className="kew-card-icon-box bg-emerald-500/10 border-emerald-500/25 text-emerald-400">
                              <DomainIcon className="w-5 h-5" />
                            </div>
                            <div className="flex flex-wrap items-center justify-end gap-1.5">
                              <span
                                className={`text-[10px] font-semibold px-2 py-0.5 rounded-[4px] border ${getTrustBadgeStyle(
                                  doc.trustBadge
                                )}`}
                              >
                                {doc.trustBadge}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-slate-800/90 text-slate-300 border border-white/10">
                                {getTemporalLabel(doc.temporalNature)}
                              </span>
                            </div>
                          </div>

                          {/* 2. TITLE — Full horizontal width */}
                          <div className="mb-2">
                            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
                              {SEARCH_DOMAIN_META[doc.domain]?.shortLabel} · {RESULT_CLASS_META[doc.resultClass]?.shortLabel}
                            </div>
                            <h2 className="kew-card-title text-base sm:text-lg group-hover:text-emerald-300 transition-colors">
                              <Link href={doc.canonicalUrl} className="hover:underline">
                                {doc.title}
                              </Link>
                            </h2>
                            {doc.subtitle && (
                              <p className="text-xs text-slate-400 mt-0.5 break-words">{doc.subtitle}</p>
                            )}
                            {multiPreview.length > 0 && (
                              <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                                {multiPreview.map((term, tIdx) => (
                                  <span
                                    key={tIdx}
                                    className="text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300"
                                  >
                                    {term}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 3. KPI / METRIC + Geographic Scope Row */}
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 py-2 my-1 border-y border-white/10 text-xs text-slate-300 tabular-nums">
                            {doc.subregion && (
                              <span className="inline-flex items-center gap-1 text-sky-300 font-medium">
                                <Globe className="w-3.5 h-3.5" />
                                {doc.subregion}
                              </span>
                            )}
                            {doc.district && (
                              <span className="inline-flex items-center gap-1 text-slate-300">
                                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                                {doc.district}
                              </span>
                            )}
                            {typeof distanceKm === 'number' && (
                              <span className="font-mono text-emerald-400">{distanceKm} km away</span>
                            )}
                            {(doc.metrics || []).slice(0, 2).map((m) => (
                              <span key={m.label} className="text-slate-400">
                                {m.label}: <strong className="text-white">{m.value}</strong>
                              </span>
                            ))}
                          </div>

                          {/* 4. DESCRIPTION + Source Provenance */}
                          <p className="kew-card-desc text-xs sm:text-sm mt-2 mb-3">{doc.description}</p>

                          <div className="text-[11px] text-slate-400 space-y-1 mb-4">
                            <div className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                              <span>
                                <strong className="text-slate-300">Source:</strong> {doc.source}
                              </span>
                            </div>
                            {(doc.observationTimestamp || doc.lastUpdated) && (
                              <div className="flex items-center gap-1.5 text-slate-500 font-mono">
                                <Clock className="w-3 h-3 shrink-0" />
                                <span>
                                  {doc.observationTimestamp
                                    ? `Observed / Filed: ${doc.observationTimestamp.slice(0, 10)}`
                                    : `Updated: ${doc.lastUpdated?.slice(0, 10)}`}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* 5. CTA near bottom */}
                          <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                            <span className="text-[11px] text-slate-500 font-mono truncate max-w-[60%]">
                              {doc.canonicalUrl}
                            </span>
                            <Link
                              href={doc.canonicalUrl}
                              className="kew-card-cta !mt-0 shrink-0"
                            >
                              <span>{doc.ctaLabel || 'Open Record'}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </Card>
                      );
                    })}
                  </div>

                  {viewMode === 'split' && (
                    <div className="lg:col-span-5 lg:sticky lg:top-24">
                      <SearchMapExplorer
                        pins={data.mapPins}
                        nearFilter={nearFilter}
                        onSetNearFilter={(nf) => {
                          setNearFilter(nf);
                          setPage(1);
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Pagination Controls */}
              {data.totalPages > 1 && viewMode !== 'map' && (
                <div className="pt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
                  <span className="text-xs text-slate-400">
                    Page <strong className="text-white">{data.page}</strong> of{' '}
                    <strong className="text-white">{data.totalPages}</strong> ({data.totalHits.toLocaleString()} total matches)
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="border-white/15 text-white"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={page >= data.totalPages}
                      onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                      className="border-white/15 text-white"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Zero Results State */
            <Card className="kew-card-shell p-8 text-center items-center">
              <div className="kew-card-icon-box bg-slate-800 border-white/10 mb-3">
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <h2 className="kew-card-title text-xl mb-2 text-center">
                No matching environmental records found
              </h2>
              <p className="kew-card-desc text-sm max-w-lg mb-5 text-center">
                No indexed public modules, scientific records, or operational feeds matched your current query and filter combination. Try clearing active filters or selecting one of the verified queries below.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {REPRESENTATIVE_QUERIES.slice(0, 8).map((rq) => (
                  <button
                    key={rq}
                    type="button"
                    onClick={() => {
                      resetAllFilters();
                      applyQuery(rq);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition-colors cursor-pointer"
                  >
                    {rq}
                  </button>
                ))}
              </div>
            </Card>
          )
        ) : (
          /* Initial Discovery Workbench (Live Indexed Inventory Across All 11 Domains & 6 Subregions) */
          <div className="space-y-10 pt-2">
            {/* Representative Scientific & Multilingual Queries */}
            <section>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                Verified Cross-Domain &amp; Multilingual Queries
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {REPRESENTATIVE_QUERIES.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => applyQuery(tag)}
                    className="px-3 py-1.5 rounded-[6px] bg-slate-900 hover:bg-emerald-500/15 text-slate-200 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/40 text-xs font-medium transition-all cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </section>

            {/* Six Western Himalayan Subregions Scope Explorer */}
            <section>
              <div className="flex flex-wrap items-end justify-between gap-2 mb-4">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    Explore by Western Himalayan Subregion
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Filter canonical entities, hazards, water bodies, and legal records across all six KEW subregions
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
                {(['Kashmir', 'Jammu', 'Ladakh', 'Azad Kashmir', 'Gilgit', 'Baltistan'] as const).map((sr) => {
                  const cnt = baselineStats?.facets?.subregions?.[sr] ?? 0;
                  return (
                    <button
                      key={sr}
                      type="button"
                      onClick={() => {
                        setSubregion(sr);
                        setPage(1);
                        syncUrlParams({ subregion: sr });
                      }}
                      className="kew-card-shell kew-card-shell--interactive p-4 text-left group"
                    >
                      <div className="kew-card-top-row !mb-2">
                        <div className="kew-card-icon-box !w-9 !h-9 bg-sky-500/10 border-sky-500/25 text-sky-400">
                          <Compass className="w-4 h-4" />
                        </div>
                      </div>
                      <h3 className="kew-card-title text-sm group-hover:text-sky-300">{sr}</h3>
                      <div className="kew-card-kpi mt-1">
                        <span className="text-base font-bold text-white tabular-nums">{cnt}</span>
                        <span className="kew-card-kpi-unit">records</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* All 11 Search Domains (Live Indexed Counts — Universal Card Hierarchy) */}
            <section>
              <div className="mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Search Across All 11 Environmental Knowledge Domains
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Dynamically maintained unified index spanning module pages, dashboard tabs, scientific records, GIS features, statutory PIL dockets, and operational feeds
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {(Object.keys(SEARCH_DOMAIN_META) as SearchDomain[]).map((dKey) => {
                  const meta = SEARCH_DOMAIN_META[dKey];
                  const Icon = DOMAIN_ICONS[dKey] || Layers;
                  const count = baselineStats?.facets?.domains?.[dKey] ?? 0;

                  return (
                    <Card
                      key={dKey}
                      className="kew-card-shell kew-card-shell--interactive h-full p-5 group"
                      onClick={() => {
                        setDomain(dKey);
                        setPage(1);
                        syncUrlParams({ domain: dKey });
                      }}
                    >
                      <div className="kew-card-top-row">
                        <div className="kew-card-icon-box bg-emerald-500/10 border-emerald-500/25 text-emerald-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <Badge variant="outline" size="sm" className="border-white/15 text-slate-300 font-mono">
                          Live Indexed
                        </Badge>
                      </div>

                      <h3 className="kew-card-title text-base group-hover:text-emerald-300 transition-colors mb-1.5">
                        {meta.label}
                      </h3>

                      <div className="kew-card-kpi mb-2">
                        <span className="kew-card-kpi-value text-xl">{count.toLocaleString()}</span>
                        <span className="kew-card-kpi-unit">searchable records</span>
                      </div>

                      <p className="kew-card-desc text-xs mb-4">{meta.description}</p>

                      <div className="kew-card-cta">
                        <span>Browse Domain Index</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          </div>
        )}
          </>
        )}

        {/* Phase 8 Administrative & Public Index Health Modal */}
        {healthOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setHealthOpen(false)}
          >
            <div
              className="w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-xl bg-slate-900 border border-white/15 p-6 shadow-2xl space-y-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-white">
                    KEW Search Index Health, Coverage &amp; Link Audit
                  </h2>
                  <p className="text-xs text-slate-400">
                    Real-time diagnostic telemetry across all 8 indexing adapters, route tree validation, and PostgreSQL FTS store
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setHealthOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {healthReport ? (
                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3 rounded-lg bg-slate-950 border border-white/10">
                      <div className="text-slate-400">Index Status</div>
                      <div className="text-base font-bold text-emerald-400 mt-0.5">{healthReport.status}</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-white/10">
                      <div className="text-slate-400">Indexed Records</div>
                      <div className="text-base font-bold text-white mt-0.5">
                        {healthReport.totalIndexedDocuments?.toLocaleString()}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-white/10">
                      <div className="text-slate-400">Broken Destination Links</div>
                      <div className="text-base font-bold text-emerald-400 mt-0.5">
                        {healthReport.brokenLinksCount}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-950 border border-white/10">
                      <div className="text-slate-400">Public Route Coverage</div>
                      <div className="text-base font-bold text-sky-400 mt-0.5">
                        {healthReport.routeInventoryStats?.publicEligiblePageCoveragePct}%
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-950 border border-white/10 space-y-1.5">
                    <div className="font-bold text-white flex items-center justify-between">
                      <span>PostgreSQL Full-Text + pg_trgm Store</span>
                      <button
                        type="button"
                        onClick={async () => {
                          const r = await fetch('/api/search/health?trigger=ui-manual-sync', { method: 'POST' });
                          if (r.ok) {
                            const h = await fetch('/api/search/health');
                            if (h.ok) setHealthReport(await h.json());
                          }
                        }}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-semibold cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Re-Sync Index</span>
                      </button>
                    </div>
                    <div className="text-slate-400">
                      Connected: <strong className="text-white">{String(healthReport.postgresSearchIndex?.connected)}</strong> ·
                      Synced Rows: <strong className="text-white">{healthReport.postgresSearchIndex?.indexedRowCount?.toLocaleString()}</strong> ·
                      Extensions: <strong className="text-emerald-400">{(healthReport.postgresSearchIndex?.extensions || []).join(', ') || 'Initializing'}</strong>
                    </div>
                  </div>

                  <div>
                    <div className="font-bold text-white mb-2">Adapter Health &amp; Record Counts</div>
                    <div className="space-y-1.5">
                      {(healthReport.adapters || []).map((ad: any) => (
                        <div
                          key={ad.adapterId}
                          className="flex items-center justify-between px-3 py-2 rounded bg-slate-950 border border-white/5"
                        >
                          <span className="text-slate-200 font-medium">{ad.adapterName}</span>
                          <span className="font-mono text-emerald-400">
                            {ad.indexedCount.toLocaleString()} indexed · {ad.sourceHealthy ? 'HEALTHY' : 'ERROR'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-10 text-center text-sm text-slate-400">Loading index diagnostics...</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-slate-400">Loading Western Himalayan Intelligence Search...</p>
          </div>
        </div>
      }
    >
      <SearchWorkbench />
    </Suspense>
  );
}
