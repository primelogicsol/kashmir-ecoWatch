'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Database,
  Globe,
  Layers,
  MapPin,
  Newspaper,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import {
  FederatedSearchHit,
  FederatedSearchResponse,
  KNOWLEDGE_SEARCH_COVERAGE_MATRIX,
  SearchScopeMode,
  SUGGESTED_KNOWLEDGE_SEARCHES,
  type UnifiedKnowledgeCategory,
} from '@/lib/search/federated-knowledge-types';
import {
  hdRoute,
  toKewPlatformUrl,
} from '@/lib/himalayan-dispatch-routes';

interface WesternHimalayanKnowledgeSearchClientProps {
  defaultScope?: SearchScopeMode;
  baseSearchPath?: string;
}

const REGION_FILTER_OPTIONS = [
  { value: 'all', label: 'All Five Regions' },
  { value: 'Kashmir', label: 'Kashmir' },
  { value: 'Jammu', label: 'Jammu' },
  { value: 'Ladakh', label: 'Ladakh' },
  { value: 'Azad Kashmir', label: 'Azad Jammu & Kashmir' },
  { value: 'Gilgit-Baltistan', label: 'Gilgit-Baltistan' },
];

const DATE_WINDOW_OPTIONS = [
  { value: 'all', label: 'All Publication & Observation Dates' },
  { value: 'last_30_days', label: 'Last 30 Days' },
  { value: '2026', label: '2026 Editions & Assessments' },
  { value: '2020_2025', label: '2020 – 2025' },
  { value: 'historical', label: 'Historical Archive (Pre-2020)' },
];

function resolveHitHref(hit: FederatedSearchHit): string {
  if (hit.platform === 'himalayan_dispatch') {
    return hdRoute(hit.canonicalUrl);
  }
  return toKewPlatformUrl(hit.canonicalUrl);
}

export function WesternHimalayanKnowledgeSearchClient({
  defaultScope = 'himalayan_dispatch',
  baseSearchPath = '/himalayan-dispatch/search',
}: WesternHimalayanKnowledgeSearchClientProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestContainerRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState<string>(() => searchParams.get('q') || '');
  const [scope, setScope] = useState<SearchScopeMode>(() => {
    const raw = searchParams.get('scope');
    if (raw === 'himalayan_dispatch' || raw === 'kashmir_ecowatch' || raw === 'both') {
      return raw;
    }
    return defaultScope;
  });
  const [category, setCategory] = useState<UnifiedKnowledgeCategory | 'all'>(
    () => (searchParams.get('category') as UnifiedKnowledgeCategory) || 'all'
  );
  const [region, setRegion] = useState<string>(() => searchParams.get('region') || 'all');
  const [author, setAuthor] = useState<string>(() => searchParams.get('author') || 'all');
  const [dateWindow, setDateWindow] = useState<string>(
    () => searchParams.get('dateWindow') || 'all'
  );
  const [datasetsOnly, setDatasetsOnly] = useState<boolean>(
    () => searchParams.get('datasetsOnly') === 'true'
  );
  const [sort, setSort] = useState<'relevance' | 'newest' | 'title_asc'>(
    () => (searchParams.get('sort') as any) || 'relevance'
  );
  const [page, setPage] = useState<number>(() => Number(searchParams.get('page') || '1') || 1);
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const [response, setResponse] = useState<FederatedSearchResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestOpen, setSuggestOpen] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [activeSuggestIdx, setActiveSuggestIdx] = useState<number>(-1);

  const syncUrl = useCallback(
    (overrides: Record<string, string | null>) => {
      const params = new URLSearchParams(window.location.search);
      for (const [k, v] of Object.entries(overrides)) {
        if (!v || v === 'all' || v === 'false' || v === '1' || (k === 'scope' && v === defaultScope)) {
          params.delete(k);
        } else {
          params.set(k, v);
        }
      }
      const qs = params.toString();
      const resolvedBase = baseSearchPath.startsWith('/himalayan-dispatch')
        ? hdRoute('/search')
        : baseSearchPath;
      router.replace(qs ? `${resolvedBase}?${qs}` : resolvedBase, { scroll: false });
    },
    [baseSearchPath, defaultScope, router]
  );

  // Sync external URL changes (e.g. from Masthead search popover)
  useEffect(() => {
    const uq = searchParams.get('q') || '';
    const us = searchParams.get('scope');
    setQuery(uq);
    if (us === 'himalayan_dispatch' || us === 'kashmir_ecowatch' || us === 'both') {
      setScope(us);
    }
  }, [searchParams]);

  // Close suggestions on click outside
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        suggestContainerRef.current &&
        !suggestContainerRef.current.contains(e.target as Node)
      ) {
        setSuggestOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const hasCriteria =
    query.trim().length >= 1 ||
    category !== 'all' ||
    region !== 'all' ||
    author !== 'all' ||
    dateWindow !== 'all' ||
    datasetsOnly;

  // Execute federated search
  useEffect(() => {
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const sp = new URLSearchParams();
        if (query.trim()) sp.set('q', query.trim());
        sp.set('scope', scope);
        if (category !== 'all') sp.set('category', category);
        if (region !== 'all') sp.set('region', region);
        if (author !== 'all') sp.set('author', author);
        if (dateWindow !== 'all') sp.set('dateWindow', dateWindow);
        if (datasetsOnly) sp.set('datasetsOnly', 'true');
        sp.set('sort', sort);
        sp.set('page', String(page));
        sp.set('limit', '20');

        const res = await fetch(`/api/search/federated?${sp.toString()}`, {
          signal: ctrl.signal,
        });
        if (res.ok) {
          const json: FederatedSearchResponse = await res.json();
          setResponse(json);
        }
      } catch {
        // Ignore abort
      } finally {
        setLoading(false);
      }
    }, 110);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query, scope, category, region, author, dateWindow, datasetsOnly, sort, page]);

  // Execute instant autocomplete
  useEffect(() => {
    if (!suggestOpen || query.trim().length < 2) {
      setSuggestions([]);
      setActiveSuggestIdx(-1);
      return;
    }
    const ctrl = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search/federated/suggest?q=${encodeURIComponent(query.trim())}&scope=${scope}&limit=7`,
          { signal: ctrl.signal }
        );
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.suggestions || []);
          setActiveSuggestIdx(-1);
        }
      } catch {
        // Ignore abort
      }
    }, 85);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query, scope, suggestOpen]);

  const applySuggestedQuery = (qVal: string, nextScope?: SearchScopeMode) => {
    const targetScope = nextScope || scope;
    setQuery(qVal);
    if (nextScope) setScope(nextScope);
    setPage(1);
    setSuggestOpen(false);
    syncUrl({ q: qVal || null, scope: targetScope, page: null });
  };

  const changeScope = (nextScope: SearchScopeMode) => {
    setScope(nextScope);
    setPage(1);
    syncUrl({ scope: nextScope, page: null });
  };

  const resetAll = () => {
    setQuery('');
    setScope(defaultScope);
    setCategory('all');
    setRegion('all');
    setAuthor('all');
    setDateWindow('all');
    setDatasetsOnly(false);
    setSort('relevance');
    setPage(1);
    syncUrl({
      q: null,
      scope: defaultScope,
      category: null,
      region: null,
      author: null,
      dateWindow: null,
      datasetsOnly: null,
      sort: null,
      page: null,
    });
  };

  const scopeCards: Array<{
    id: SearchScopeMode;
    label: string;
    roleNote: string;
  }> = [
    {
      id: 'himalayan_dispatch',
      label: 'Himalayan Dispatch',
      roleNote: 'Journalism, investigation, public discourse & accountability',
    },
    {
      id: 'kashmir_ecowatch',
      label: 'Kashmir EcoWatch',
      roleNote: 'Science, environmental intelligence, live datasets, sensors & GIS',
    },
    {
      id: 'both',
      label: 'Search Across Both Platforms',
      roleNote: 'Federated Western Himalayan Knowledge Search',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Header & Unified Search Box */}
      <header
        className="p-6 sm:p-10 lg:p-12 border space-y-7"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="max-w-3xl space-y-2.5">
          <p className="hd-kicker">WESTERN HIMALAYAN KNOWLEDGE SEARCH</p>
          <h1
            className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
            style={{ color: 'var(--hd-fg)' }}
          >
            Search &amp; Discover
          </h1>
          <p
            className="hd-font-body text-base sm:text-xl leading-relaxed"
            style={{ color: 'var(--hd-fg-secondary)' }}
          >
            Explore journalism, environmental intelligence, scientific research and regional
            knowledge.
          </p>
        </div>

        {/* Search Input + Autocomplete */}
        <div ref={suggestContainerRef} className="relative">
          <div
            className="flex items-center gap-3 px-4 py-3.5 border transition-colors"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg)',
            }}
          >
            <Search className="w-5 h-5 shrink-0" style={{ color: 'var(--hd-copper)' }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                const v = e.target.value;
                setQuery(v);
                setPage(1);
                setSuggestOpen(true);
                syncUrl({ q: v.trim() || null, page: null });
              }}
              onFocus={() => setSuggestOpen(true)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setSuggestOpen(false);
                } else if (e.key === 'ArrowDown' && suggestions.length > 0) {
                  e.preventDefault();
                  setActiveSuggestIdx((prev) => (prev + 1) % suggestions.length);
                } else if (e.key === 'ArrowUp' && suggestions.length > 0) {
                  e.preventDefault();
                  setActiveSuggestIdx((prev) =>
                    prev <= 0 ? suggestions.length - 1 : prev - 1
                  );
                } else if (e.key === 'Enter') {
                  if (activeSuggestIdx >= 0 && suggestions[activeSuggestIdx]) {
                    e.preventDefault();
                    const item = suggestions[activeSuggestIdx];
                    const href =
                      item.platform === 'himalayan_dispatch'
                        ? hdRoute(item.canonicalUrl)
                        : toKewPlatformUrl(item.canonicalUrl);
                    setSuggestOpen(false);
                    window.location.href = href;
                  } else {
                    setSuggestOpen(false);
                  }
                }
              }}
              placeholder={
                scope === 'himalayan_dispatch'
                  ? 'Search Himalayan Dispatch investigations, editorials, monographs, bureaus, interviews...'
                  : scope === 'kashmir_ecowatch'
                  ? 'Search Kashmir EcoWatch assessments, live datasets, sensor stations, glaciers, species, GIS...'
                  : 'Search across journalism, scientific assessments, live sensor telemetry, datasets & GIS...'
              }
              aria-label="Search Western Himalayan Knowledge Search"
              className="flex-1 bg-transparent border-none outline-none hd-font-body text-base sm:text-lg min-w-0"
              style={{ color: 'var(--hd-fg)' }}
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  applySuggestedQuery('');
                  inputRef.current?.focus();
                }}
                className="p-1.5 hover:opacity-75"
                aria-label="Clear search query"
                style={{ color: 'var(--hd-fg-muted)' }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowFilters((prev) => !prev)}
              className="hd-font-sans inline-flex items-center gap-1.5 px-3 py-2 border text-[11px] font-semibold tracking-[0.16em] uppercase shrink-0 cursor-pointer"
              style={{
                borderColor:
                  showFilters ||
                  category !== 'all' ||
                  region !== 'all' ||
                  author !== 'all' ||
                  dateWindow !== 'all' ||
                  datasetsOnly
                    ? 'var(--hd-copper)'
                    : 'var(--hd-rule)',
                color:
                  showFilters ||
                  category !== 'all' ||
                  region !== 'all' ||
                  author !== 'all' ||
                  dateWindow !== 'all' ||
                  datasetsOnly
                    ? 'var(--hd-copper)'
                    : 'var(--hd-fg-secondary)',
              }}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Instant Autocomplete Suggestions */}
          {suggestOpen && suggestions.length > 0 && (
            <div
              className="absolute left-0 right-0 top-full mt-1 border z-40 shadow-xl divide-y max-h-[420px] overflow-y-auto"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg)',
              }}
            >
              {suggestions.map((s, idx) => {
                const isHd = s.platform === 'himalayan_dispatch';
                const href = isHd ? hdRoute(s.canonicalUrl) : toKewPlatformUrl(s.canonicalUrl);
                const active = idx === activeSuggestIdx;
                return (
                  <a
                    key={s.id}
                    href={href}
                    className="block px-4 py-3 transition-colors"
                    style={{
                      backgroundColor: active ? 'var(--hd-bg-elevated)' : 'transparent',
                      borderColor: 'var(--hd-rule)',
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <span
                        className="hd-font-sans text-[10px] font-bold tracking-[0.18em] uppercase"
                        style={{ color: isHd ? '#8C3125' : '#2E6F56' }}
                      >
                        {s.institutionalRubric}
                      </span>
                      <span className="hd-folio-meta">
                        {s.isLiveDatasetOrRegistry ? s.recordKindLabel : s.readingDurationLabel || s.subregion}
                      </span>
                    </div>
                    <p
                      className="hd-font-display text-lg font-semibold leading-snug"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      {s.title}
                    </p>
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {/* Three Selectable Search Scopes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {scopeCards.map((sc) => {
            const selected = scope === sc.id;
            const countLabel =
              response && sc.id === 'himalayan_dispatch' && scope !== 'kashmir_ecowatch'
                ? response.dispatchCount
                : response && sc.id === 'kashmir_ecowatch' && scope !== 'himalayan_dispatch'
                ? response.kewCount
                : response && sc.id === 'both' && scope === 'both'
                ? response.totalHits
                : null;

            return (
              <button
                key={sc.id}
                type="button"
                onClick={() => changeScope(sc.id)}
                aria-pressed={selected}
                className="text-left p-4 border transition-colors cursor-pointer flex flex-col justify-between gap-2"
                style={{
                  borderColor: selected ? '#8C3125' : 'var(--hd-rule)',
                  backgroundColor: selected ? '#8C3125' : 'var(--hd-bg)',
                  color: selected ? '#F2EFE7' : 'var(--hd-fg)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="hd-font-sans text-xs font-semibold tracking-[0.16em] uppercase">
                    {sc.label}
                  </span>
                  {countLabel !== null && (
                    <span
                      className="hd-font-sans text-[10px] px-2 py-0.5 border"
                      style={{
                        borderColor: selected ? 'rgba(242,239,231,0.35)' : 'var(--hd-rule)',
                        color: selected ? '#F2EFE7' : 'var(--hd-fg-muted)',
                      }}
                    >
                      {countLabel}
                    </span>
                  )}
                </div>
                <p
                  className="hd-font-body text-xs leading-relaxed"
                  style={{
                    color: selected ? 'rgba(242,239,231,0.84)' : 'var(--hd-fg-secondary)',
                  }}
                >
                  {sc.roleNote}
                </p>
              </button>
            );
          })}
        </div>

        {/* Suggested Searches + Direct Live Datasets/Sensors Pill */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t" style={{ borderColor: 'var(--hd-rule)' }}>
          <div className="flex flex-wrap items-center gap-2">
            <span className="hd-folio-meta mr-1">Suggested searches:</span>
            {SUGGESTED_KNOWLEDGE_SEARCHES.map((chip) => {
              const active = query.trim().toLowerCase() === chip.toLowerCase();
              return (
                <button
                  key={chip}
                  type="button"
                  onClick={() => applySuggestedQuery(chip)}
                  className="hd-font-sans px-3 py-1.5 border text-[11px] tracking-[0.12em] uppercase transition-colors cursor-pointer"
                  style={{
                    borderColor: active ? '#8C3125' : 'var(--hd-rule)',
                    backgroundColor: active ? '#8C3125' : 'var(--hd-bg)',
                    color: active ? '#F2EFE7' : 'var(--hd-fg-secondary)',
                  }}
                >
                  {chip}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              const next = !datasetsOnly;
              setDatasetsOnly(next);
              if (next && scope === 'himalayan_dispatch') {
                setScope('both');
                syncUrl({ datasetsOnly: 'true', scope: 'both', page: null });
              } else {
                syncUrl({ datasetsOnly: next ? 'true' : null, page: null });
              }
              setPage(1);
            }}
            className="hd-font-sans inline-flex items-center gap-1.5 px-3 py-1.5 border text-[10px] font-semibold tracking-[0.15em] uppercase cursor-pointer"
            style={{
              borderColor: datasetsOnly ? '#2E6F56' : 'var(--hd-rule)',
              backgroundColor: datasetsOnly ? '#2E6F56' : 'transparent',
              color: datasetsOnly ? '#F2EFE7' : 'var(--hd-fg-secondary)',
            }}
          >
            <Database className="w-3.5 h-3.5" />
            <span>
              Live Datasets, Sensors &amp; Scientific Registries
              {response ? ` (${response.liveDatasetsAndRegistriesCount})` : ''}
            </span>
          </button>
        </div>

        {/* Expandable Filter Panel (Category, Region, Author, Date, Sort) */}
        {showFilters && (
          <div
            className="pt-5 border-t grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <div className="space-y-1">
              <label className="hd-folio-meta block">Content Category</label>
              <select
                value={category}
                onChange={(e) => {
                  const val = e.target.value as UnifiedKnowledgeCategory | 'all';
                  setCategory(val);
                  setPage(1);
                  syncUrl({ category: val, page: null });
                }}
                className="w-full px-3 py-2 border hd-font-body text-sm"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                  color: 'var(--hd-fg)',
                }}
              >
                <option value="all">All 12 Knowledge Categories</option>
                {KNOWLEDGE_SEARCH_COVERAGE_MATRIX.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="hd-folio-meta block">Western Himalayan Region</label>
              <select
                value={region}
                onChange={(e) => {
                  const val = e.target.value;
                  setRegion(val);
                  setPage(1);
                  syncUrl({ region: val, page: null });
                }}
                className="w-full px-3 py-2 border hd-font-body text-sm"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                  color: 'var(--hd-fg)',
                }}
              >
                {REGION_FILTER_OPTIONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="hd-folio-meta block">Author / Scientific Desk</label>
              <select
                value={author}
                onChange={(e) => {
                  const val = e.target.value;
                  setAuthor(val);
                  setPage(1);
                  syncUrl({ author: val, page: null });
                }}
                className="w-full px-3 py-2 border hd-font-body text-sm"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                  color: 'var(--hd-fg)',
                }}
              >
                <option value="all">All Authors &amp; Authorities</option>
                {(response?.availableAuthors || []).map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.name} ({a.count})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="hd-folio-meta block">Publication / Record Date</label>
              <select
                value={dateWindow}
                onChange={(e) => {
                  const val = e.target.value;
                  setDateWindow(val);
                  setPage(1);
                  syncUrl({ dateWindow: val, page: null });
                }}
                className="w-full px-3 py-2 border hd-font-body text-sm"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                  color: 'var(--hd-fg)',
                }}
              >
                {DATE_WINDOW_OPTIONS.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="hd-folio-meta block">Sort Order</label>
              <div className="flex gap-2">
                <select
                  value={sort}
                  onChange={(e) => {
                    const val = e.target.value as 'relevance' | 'newest' | 'title_asc';
                    setSort(val);
                    setPage(1);
                    syncUrl({ sort: val, page: null });
                  }}
                  className="flex-1 px-3 py-2 border hd-font-body text-sm"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg)',
                    color: 'var(--hd-fg)',
                  }}
                >
                  <option value="relevance">Relevance Ranking</option>
                  <option value="newest">Newest First</option>
                  <option value="title_asc">Title (A–Z)</option>
                </select>
                <button
                  type="button"
                  onClick={resetAll}
                  className="px-3 py-2 border hd-font-sans text-[10px] tracking-[0.14em] uppercase"
                  style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-copper)' }}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Active Search Results with Distinct Institutional Attribution */}
      {response && (hasCriteria || response.hits.length > 0) && (
        <section className="space-y-6">
          <div
            className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            <div className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
              {hasCriteria ? (
                <>
                  Showing <strong>{response.totalHits.toLocaleString()}</strong> published record
                  {response.totalHits === 1 ? '' : 's'}
                  {response.query ? (
                    <>
                      {' '}
                      for &ldquo;<strong>{response.query}</strong>&rdquo;
                    </>
                  ) : null}{' '}
                  ({response.dispatchCount} Himalayan Dispatch · {response.kewCount} Kashmir EcoWatch)
                </>
              ) : (
                <>
                  Featured published records in{' '}
                  <strong>
                    {scope === 'himalayan_dispatch'
                      ? 'Himalayan Dispatch'
                      : scope === 'kashmir_ecowatch'
                      ? 'Kashmir EcoWatch'
                      : 'Western Himalayan Knowledge Search'}
                  </strong>
                </>
              )}
            </div>
            <span className="hd-folio-meta">
              CANONICAL DEDUPLICATED INDEX · {response.latencyMs} MS
            </span>
          </div>

          {loading && response.hits.length === 0 ? (
            <div className="py-12 text-center hd-font-body text-sm" style={{ color: 'var(--hd-fg-muted)' }}>
              Searching published journalism, scientific assessments, and regional registries...
            </div>
          ) : response.hits.length === 0 ? (
            <div
              className="p-8 border text-center space-y-3"
              style={{
                borderColor: 'var(--hd-rule)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p className="hd-font-display text-2xl font-semibold">
                No matching records in the selected scope
              </p>
              <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                {scope !== 'both'
                  ? 'Try expanding your query to "Search Across Both Platforms" to include both Himalayan Dispatch journalism and Kashmir EcoWatch scientific & geospatial records.'
                  : 'Try broadening your filters or selecting one of the suggested regional queries above.'}
              </p>
              {scope !== 'both' && (
                <button
                  type="button"
                  onClick={() => changeScope('both')}
                  className="hd-font-sans inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#F2EFE7] cursor-pointer"
                  style={{ backgroundColor: '#8C3125' }}
                >
                  <span>Search Across Both Platforms</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y border-b" style={{ borderColor: 'var(--hd-rule)' }}>
              {response.hits.map((hit) => {
                const isHd = hit.platform === 'himalayan_dispatch';
                const href = resolveHitHref(hit);
                return (
                  <article
                    key={hit.id}
                    className="py-6 flex flex-col lg:flex-row lg:items-start justify-between gap-5"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    <div className="space-y-2 max-w-4xl">
                      {/* Prominent Originating Platform & Institutional Rubric */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span
                          className="hd-font-sans inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold tracking-[0.18em] uppercase border"
                          style={{
                            borderColor: isHd ? '#8C3125' : '#2E6F56',
                            color: isHd ? '#8C3125' : '#2E6F56',
                          }}
                        >
                          {isHd ? (
                            <Newspaper className="w-3 h-3" />
                          ) : (
                            <Layers className="w-3 h-3" />
                          )}
                          <span>{hit.institutionalRubric}</span>
                        </span>

                        {hit.isLiveDatasetOrRegistry && (
                          <span
                            className="hd-font-sans px-2 py-0.5 text-[10px] tracking-[0.14em] uppercase border"
                            style={{
                              borderColor: 'var(--hd-rule-strong)',
                              color: 'var(--hd-fg-muted)',
                            }}
                          >
                            {hit.recordKindLabel}
                          </span>
                        )}

                        {hit.subregion && (
                          <span className="hd-folio-meta inline-flex items-center gap-1">
                            <Globe className="w-3 h-3" />
                            {hit.subregion}
                          </span>
                        )}

                        {hit.coordinates && (
                          <span className="hd-folio-meta inline-flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {hit.coordinates.lat.toFixed(2)}°N, {hit.coordinates.lng.toFixed(2)}°E
                          </span>
                        )}
                      </div>

                      <h2 className="hd-font-display text-2xl sm:text-3xl font-semibold leading-snug">
                        <a
                          href={href}
                          className="hover:underline underline-offset-4"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {hit.title}
                        </a>
                      </h2>

                      {hit.subtitle && (
                        <p
                          className="hd-font-display text-base sm:text-lg italic"
                          style={{ color: 'var(--hd-fg-secondary)' }}
                        >
                          {hit.subtitle}
                        </p>
                      )}

                      <p
                        className="hd-font-body text-sm sm:text-base leading-relaxed"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        {hit.description}
                      </p>

                      {/* Live Telemetry / Dataset Metrics Preview when available */}
                      {hit.metrics && hit.metrics.length > 0 && (
                        <div className="flex flex-wrap gap-3 pt-1">
                          {hit.metrics.map((m) => (
                            <span
                              key={m.label}
                              className="hd-font-sans text-[11px] px-2.5 py-1 border"
                              style={{
                                borderColor: 'var(--hd-rule)',
                                backgroundColor: 'var(--hd-bg-elevated)',
                                color: 'var(--hd-fg)',
                              }}
                            >
                              <strong>{m.label}:</strong> {m.value}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="pt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                        {hit.authorOrSource && (
                          <span className="hd-folio-meta">
                            {isHd ? `BY ${hit.authorOrSource}` : `SOURCE: ${hit.authorOrSource}`}
                          </span>
                        )}
                        {hit.publishedOrUpdatedDate && (
                          <span className="hd-folio-meta">{hit.publishedOrUpdatedDate}</span>
                        )}
                        {hit.readingDurationLabel && (
                          <span className="hd-folio-meta">{hit.readingDurationLabel}</span>
                        )}
                      </div>
                    </div>

                    <div className="shrink-0 pt-1">
                      <a
                        href={href}
                        className="hd-font-sans inline-flex items-center gap-1.5 px-4 py-2.5 border text-[11px] font-semibold tracking-[0.16em] uppercase hover:opacity-80"
                        style={{
                          borderColor: isHd ? '#8C3125' : '#2E6F56',
                          color: isHd ? '#8C3125' : '#2E6F56',
                        }}
                      >
                        <span>{isHd ? 'Read in Dispatch' : 'Open in KEW'}</span>
                        {isHd ? (
                          <ArrowRight className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        )}
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {response.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => {
                  const p = Math.max(1, page - 1);
                  setPage(p);
                  syncUrl({ page: String(p) });
                }}
                className="hd-font-sans px-4 py-2 border text-xs tracking-[0.16em] uppercase disabled:opacity-40 cursor-pointer"
                style={{ borderColor: 'var(--hd-rule-strong)' }}
              >
                ← Previous
              </button>
              <span className="hd-folio-meta">
                PAGE {response.page} OF {response.totalPages}
              </span>
              <button
                type="button"
                disabled={page >= response.totalPages}
                onClick={() => {
                  const p = Math.min(response.totalPages, page + 1);
                  setPage(p);
                  syncUrl({ page: String(p) });
                }}
                className="hd-font-sans px-4 py-2 border text-xs tracking-[0.16em] uppercase disabled:opacity-40 cursor-pointer"
                style={{ borderColor: 'var(--hd-rule-strong)' }}
              >
                Next →
              </button>
            </div>
          )}
        </section>
      )}

      {/* Institutional Roles & 12-Category Search Scope Matrix */}
      <section
        className="pt-8 border-t grid grid-cols-1 lg:grid-cols-12 gap-10"
        style={{ borderColor: 'var(--hd-rule-strong)' }}
      >
        <div className="lg:col-span-5 space-y-5">
          <p className="hd-kicker">TWO DISTINCT INSTITUTIONAL FUNCTIONS</p>
          <h2 className="hd-font-display text-3xl sm:text-4xl font-semibold leading-tight">
            Connecting Journalism With Scientific Evidence Without Confusing Their Roles
          </h2>
          <div className="space-y-4">
            <div
              className="p-5 border-l-2 space-y-1.5"
              style={{
                borderColor: '#8C3125',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p className="hd-font-sans text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#8C3125' }}>
                HIMALAYAN DISPATCH
              </p>
              <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                Journalism, investigation, public discourse and accountability—examining historical
                decisions, governance, public expenditure, and human consequences.
              </p>
            </div>

            <div
              className="p-5 border-l-2 space-y-1.5"
              style={{
                borderColor: '#2E6F56',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <p className="hd-font-sans text-xs font-bold tracking-[0.18em] uppercase" style={{ color: '#2E6F56' }}>
                KASHMIR ECOWATCH
              </p>
              <p className="hd-font-body text-sm leading-relaxed" style={{ color: 'var(--hd-fg-secondary)' }}>
                Science, environmental intelligence, monitoring, live datasets, sensor stations,
                scientific registries, geospatial analysis and empirical evidence.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <p className="hd-kicker">SEARCH SCOPE &amp; COVERAGE ARCHITECTURE</p>
          <div className="border overflow-x-auto" style={{ borderColor: 'var(--hd-rule-strong)' }}>
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr
                  className="border-b"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <th className="py-3 px-4 hd-folio-meta">Search category</th>
                  <th className="py-3 px-4 hd-folio-meta text-center">Himalayan Dispatch</th>
                  <th className="py-3 px-4 hd-folio-meta text-center">Kashmir EcoWatch</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: 'var(--hd-rule)' }}>
                {KNOWLEDGE_SEARCH_COVERAGE_MATRIX.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => {
                      const nextScope: SearchScopeMode =
                        row.inHimalayanDispatch && row.inKashmirEcoWatch
                          ? 'both'
                          : row.inHimalayanDispatch
                          ? 'himalayan_dispatch'
                          : 'kashmir_ecowatch';
                      setCategory(row.id);
                      setScope(nextScope);
                      setPage(1);
                      syncUrl({ category: row.id, scope: nextScope, page: null });
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="cursor-pointer transition-colors hover:opacity-80"
                  >
                    <td className="py-2.5 px-4 hd-font-body font-medium">{row.label}</td>
                    <td className="py-2.5 px-4 text-center">
                      {row.inHimalayanDispatch ? (
                        <Check className="w-4 h-4 inline-block" style={{ color: '#8C3125' }} />
                      ) : null}
                    </td>
                    <td className="py-2.5 px-4 text-center">
                      {row.inKashmirEcoWatch ? (
                        <Check className="w-4 h-4 inline-block" style={{ color: '#2E6F56' }} />
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
