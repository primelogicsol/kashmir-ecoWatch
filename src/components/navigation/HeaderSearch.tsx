'use client';

import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowUpRight, Sparkles, FileText, Newspaper, Layers } from 'lucide-react';
import { isScientificQuestionLike } from '@/lib/search/scientific-qa-types';
import { getKewToDispatchUrl } from '@/lib/himalayan-dispatch-routes';
import type { SearchScopeMode } from '@/lib/search/federated-knowledge-types';

interface HeaderSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_CHIPS = [
  'Air Pollution',
  'Sheshnag',
  'Glacial Lakes',
  'Gilgit-Baltistan',
  'Water Security',
  'Climate Change',
  'Hangul',
  'Wular Lake',
];

interface PanelGeometry {
  widthPx: number;
  rightOffsetPx: number;
  maxHeightPx: number;
}

export function HeaderSearch({ isOpen, onClose }: HeaderSearchProps) {
  const [query, setQuery] = useState('');
  const [scope, setScope] = useState<SearchScopeMode>('kashmir_ecowatch');
  const [groups, setGroups] = useState<any[]>([]);
  const [federatedSuggestions, setFederatedSuggestions] = useState<any[]>([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [geometry, setGeometry] = useState<PanelGeometry | null>(null);

  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const activeItemRef = useRef<HTMLAnchorElement | null>(null);
  const router = useRouter();

  const updatePanelGeometry = useCallback(() => {
    if (typeof window === 'undefined' || !panelRef.current) return;
    const anchorEl = panelRef.current.parentElement;
    if (!anchorEl) return;

    const vw = document.documentElement.clientWidth || window.innerWidth;
    const vh = window.visualViewport?.height ?? window.innerHeight;
    if (vw <= 0 || vh <= 0) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const isCompactViewport = vw < 640;
    const horizontalMargin = isCompactViewport ? 12 : 16;
    const maxDesktopWidth = vw >= 2560 ? 560 : 520;
    const widthPx = isCompactViewport
      ? Math.max(260, vw - horizontalMargin * 2)
      : Math.min(maxDesktopWidth, Math.max(280, vw - horizontalMargin * 2));

    let desiredRightEdge = isCompactViewport ? vw - horizontalMargin : anchorRect.right;
    if (desiredRightEdge > vw - horizontalMargin) {
      desiredRightEdge = vw - horizontalMargin;
    }
    if (desiredRightEdge - widthPx < horizontalMargin) {
      desiredRightEdge = Math.min(vw - horizontalMargin, widthPx + horizontalMargin);
    }

    const rightOffsetPx = Math.round((anchorRect.right - desiredRightEdge) * 10) / 10;
    const panelTop = Math.max(0, anchorRect.bottom + 8);
    const availableBelow = Math.max(180, Math.floor(vh - panelTop - 12));
    const maxHeightPx = Math.min(500, availableBelow);

    setGeometry((prev) =>
      prev &&
      prev.widthPx === widthPx &&
      prev.rightOffsetPx === rightOffsetPx &&
      prev.maxHeightPx === maxHeightPx
        ? prev
        : { widthPx, rightOffsetPx, maxHeightPx }
    );
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) {
      setGeometry(null);
      return;
    }
    updatePanelGeometry();
  }, [isOpen, updatePanelGeometry]);

  useEffect(() => {
    if (!isOpen) return;
    updatePanelGeometry();

    let rafId: number | null = null;
    const scheduleUpdate = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        rafId = null;
        updatePanelGeometry();
      });
    };

    const ro =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(scheduleUpdate) : null;
    if (ro) {
      ro.observe(document.documentElement);
      if (panelRef.current?.parentElement) {
        ro.observe(panelRef.current.parentElement);
      }
    }

    window.addEventListener('resize', scheduleUpdate, { passive: true });
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('orientationchange', scheduleUpdate, { passive: true });
    window.visualViewport?.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      ro?.disconnect();
      window.removeEventListener('resize', scheduleUpdate);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('orientationchange', scheduleUpdate);
      window.visualViewport?.removeEventListener('resize', scheduleUpdate);
    };
  }, [isOpen, updatePanelGeometry]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
      setScope('kashmir_ecowatch');
      setGroups([]);
      setFederatedSuggestions([]);
      setTotalHits(0);
      setActiveIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (activeIndex >= 0 && activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex]);

  useEffect(() => {
    if (!isOpen || query.trim().length < 2) {
      setGroups([]);
      setFederatedSuggestions([]);
      setTotalHits(0);
      setActiveIndex(-1);
      return;
    }

    const ctrl = new AbortController();
    setLoading(true);
    const timer = setTimeout(() => {
      if (scope === 'kashmir_ecowatch') {
        fetch(`/api/search/suggest?q=${encodeURIComponent(query.trim())}&limit=3`, {
          signal: ctrl.signal,
        })
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => {
            if (data) {
              const filteredGroups = (data.groups || [])
                .map((g: any) => ({
                  ...g,
                  items: (g.items || []).filter(
                    (it: any) => !String(it.canonicalUrl || '').startsWith('/himalayan-dispatch')
                  ),
                }))
                .filter((g: any) => g.items.length > 0);
              setGroups(filteredGroups);
              setFederatedSuggestions([]);
              setTotalHits(data.totalHits || 0);
              setActiveIndex(-1);
            }
          })
          .catch(() => {})
          .finally(() => setLoading(false));
      } else {
        fetch(
          `/api/search/federated/suggest?q=${encodeURIComponent(query.trim())}&scope=${scope}&limit=7`,
          { signal: ctrl.signal }
        )
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => {
            if (data) {
              setFederatedSuggestions(data.suggestions || []);
              setGroups([]);
              setTotalHits(data.totalHits || 0);
              setActiveIndex(-1);
            }
          })
          .catch(() => {})
          .finally(() => setLoading(false));
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query, scope, isOpen]);

  const flatItems = useMemo(() => {
    if (scope !== 'kashmir_ecowatch') {
      return federatedSuggestions.map((s) => ({
        ...s,
        resolvedHref:
          s.platform === 'himalayan_dispatch'
            ? getKewToDispatchUrl(s.canonicalUrl)
            : s.canonicalUrl,
      }));
    }
    const out: any[] = [];
    for (const g of groups) {
      for (const it of g.items || []) out.push({ ...it, resolvedHref: it.canonicalUrl });
    }
    return out;
  }, [groups, federatedSuggestions, scope]);

  const buildFullSearchHref = useCallback(
    (qStr: string) => {
      const trimmed = qStr.trim();
      if (scope === 'himalayan_dispatch') {
        return getKewToDispatchUrl(trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search');
      }
      if (scope === 'both') {
        return trimmed
          ? `/search?scope=both&q=${encodeURIComponent(trimmed)}`
          : '/search?scope=both';
      }
      if (!trimmed) return '/search';
      const modeParam = isScientificQuestionLike(trimmed) ? '&mode=ask' : '';
      return `/search?q=${encodeURIComponent(trimmed)}${modeParam}`;
    },
    [scope]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (flatItems.length > 0) {
        setActiveIndex((prev) => (prev + 1) % flatItems.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (flatItems.length > 0) {
        setActiveIndex((prev) => (prev <= 0 ? flatItems.length - 1 : prev - 1));
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && flatItems[activeIndex]) {
        router.push(flatItems[activeIndex].resolvedHref);
        onClose();
      } else {
        router.push(buildFullSearchHref(query));
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  let runningIdx = -1;

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="false"
      aria-label="Global environmental intelligence search"
      data-kew-dark-surface="true"
      data-kew-search-panel="true"
      style={
        geometry
          ? {
              width: `${geometry.widthPx}px`,
              maxWidth: 'calc(100vw - 1.5rem)',
              right: `${geometry.rightOffsetPx}px`,
              maxHeight: `${geometry.maxHeightPx}px`,
            }
          : undefined
      }
      className="kew-global-search-panel kew-menu-surface kew-functional-overlay absolute right-0 top-full mt-2 w-[calc(100vw-1.5rem)] sm:w-[520px] max-w-[calc(100vw-1.5rem)] max-h-[min(500px,calc(100dvh-5.5rem))] rounded-xl border z-[80] overflow-hidden flex flex-col"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Input Header */}
      <div className="kew-search-input-bar shrink-0 p-3 border-b flex items-center gap-2.5">
        <Search className="kew-search-lead-icon w-4 h-4 text-emerald-400 shrink-0 ml-1" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search all KEW modules, species, water, hazards, PIL, EIA..."
          className="kew-search-input flex-1 bg-transparent border-none outline-none text-white text-sm min-w-0"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="kew-search-clear-btn p-1 rounded-md transition-colors cursor-pointer shrink-0"
            title="Clear search"
            aria-label="Clear search query"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="kew-search-esc-btn px-2 py-1 rounded text-[10px] font-mono font-semibold border transition-colors cursor-pointer shrink-0"
        >
          ESC
        </button>
      </div>

      {/* Three Selectable Search Scopes (Defaults to Kashmir EcoWatch when accessed from KEW) */}
      <div className="shrink-0 px-3 py-2 border-b border-white/10 bg-slate-950/60 flex flex-wrap items-center gap-1.5">
        {[
          { id: 'kashmir_ecowatch' as const, label: 'Kashmir EcoWatch' },
          { id: 'himalayan_dispatch' as const, label: 'Himalayan Dispatch' },
          { id: 'both' as const, label: 'Search Across Both Platforms' },
        ].map((sc) => {
          const active = scope === sc.id;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => setScope(sc.id)}
              className={`px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider border transition-colors cursor-pointer ${
                active
                  ? sc.id === 'himalayan_dispatch'
                    ? 'bg-[#8C3125] text-[#F2EFE7] border-[#8C3125]'
                    : 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-900/80 text-slate-300 border-white/10 hover:text-white'
              }`}
            >
              {sc.label}
            </button>
          );
        })}
      </div>

      {/* Results & Suggestions Body */}
      <div className="kew-search-content-body kew-menu-scroll flex-1 min-h-0 overflow-y-auto overscroll-contain divide-y divide-[var(--kew-menu-border)] p-2">
        {query.trim().length < 2 ? (
          <div className="p-4 sm:p-5 text-center space-y-3">
            <div className="kew-search-inst-heading inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Western Himalayan Knowledge Search</span>
            </div>
            <p className="kew-search-supporting-text text-xs leading-relaxed">
              {scope === 'himalayan_dispatch'
                ? 'Explore Himalayan Dispatch journalism, investigations, editorials, monographs & regional bureaus'
                : scope === 'both'
                ? 'Federated search across Himalayan Dispatch journalism and Kashmir EcoWatch science, live datasets & GIS'
                : 'Search KEW scientific assessments, live datasets, sensor stations, 6 subregions, PIL dockets & GIS'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {QUICK_CHIPS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setQuery(tag);
                    inputRef.current?.focus();
                  }}
                  className="kew-search-chip px-2.5 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ) : loading && flatItems.length === 0 ? (
          <div className="kew-search-supporting-text p-6 text-center text-xs">
            Searching canonical index...
          </div>
        ) : flatItems.length === 0 ? (
          <div className="p-6 text-center space-y-2">
            <p className="text-sm font-semibold text-white">
              No instant matches for &ldquo;{query}&rdquo; in selected scope
            </p>
            {scope !== 'both' ? (
              <button
                type="button"
                onClick={() => setScope('both')}
                className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline font-medium cursor-pointer"
              >
                <span>Search Across Both Platforms</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                href={buildFullSearchHref(query)}
                onClick={onClose}
                className="kew-search-full-link inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline font-medium"
              >
                <span>Open Full Search Workbench</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        ) : scope !== 'kashmir_ecowatch' ? (
          <div className="space-y-1 py-1">
            {federatedSuggestions.map((item: any) => {
              runningIdx++;
              const isFocused = runningIdx === activeIndex;
              const isHd = item.platform === 'himalayan_dispatch';
              const href = isHd
                ? getKewToDispatchUrl(item.canonicalUrl)
                : item.canonicalUrl;
              return (
                <Link
                  key={item.id}
                  ref={isFocused ? activeItemRef : undefined}
                  href={href}
                  onClick={onClose}
                  data-focused={isFocused ? 'true' : undefined}
                  className={`kew-search-result-item flex items-center justify-between gap-2 p-2.5 rounded-lg transition-colors group ${
                    isFocused ? 'kew-search-result-item--focused' : ''
                  }`}
                >
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider">
                      {isHd ? (
                        <Newspaper className="w-3 h-3 text-amber-400 shrink-0" />
                      ) : (
                        <Layers className="w-3 h-3 text-emerald-400 shrink-0" />
                      )}
                      <span className={isHd ? 'text-amber-300' : 'text-emerald-400'}>
                        {item.institutionalRubric}
                      </span>
                    </div>
                    <p className="kew-search-result-title text-xs font-bold text-white group-hover:text-emerald-300 truncate">
                      {item.title}
                    </p>
                  </div>
                  <ArrowUpRight className="kew-search-result-arrow w-3.5 h-3.5 shrink-0" />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="space-y-3 py-1">
            {groups.map((grp) => (
              <div key={grp.groupKey}>
                <span className="kew-search-inst-heading text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2.5 py-1 block">
                  {grp.groupLabel}
                </span>
                <div className="space-y-0.5">
                  {grp.items.map((item: any) => {
                    runningIdx++;
                    const isFocused = runningIdx === activeIndex;
                    return (
                      <Link
                        key={item.id}
                        ref={isFocused ? activeItemRef : undefined}
                        href={item.canonicalUrl}
                        onClick={onClose}
                        data-focused={isFocused ? 'true' : undefined}
                        className={`kew-search-result-item flex items-center justify-between gap-2 p-2.5 rounded-lg transition-colors group ${
                          isFocused ? 'kew-search-result-item--focused' : ''
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="kew-search-result-title text-xs font-bold text-white group-hover:text-emerald-300 truncate">
                            {item.title}
                          </p>
                          {item.subtitle && (
                            <p className="kew-search-result-subtitle text-[11px] truncate">
                              {item.subtitle}
                            </p>
                          )}
                        </div>
                        <ArrowUpRight className="kew-search-result-arrow w-3.5 h-3.5 shrink-0" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="kew-search-footer-bar shrink-0 px-3 py-2.5 border-t flex flex-wrap items-center justify-between gap-2 text-[11px]">
        <Link
          href={
            query.trim()
              ? `/search?mode=ask&q=${encodeURIComponent(query.trim())}`
              : '/search?mode=ask'
          }
          onClick={onClose}
          className="kew-search-qa-link text-sky-300 hover:text-sky-200 font-semibold inline-flex items-center gap-1 transition-colors"
        >
          <FileText className="w-3 h-3 shrink-0" />
          <span>
            {isScientificQuestionLike(query) ? 'Synthesize Cited Brief' : 'Scientific Q&A'}
          </span>
        </Link>
        <Link
          href={buildFullSearchHref(query)}
          onClick={onClose}
          className="kew-search-full-link text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 transition-colors"
        >
          <span>Full Search{totalHits > 0 ? ` (${totalHits.toLocaleString()})` : ''}</span>
          <ArrowUpRight className="w-3 h-3 shrink-0" />
        </Link>
      </div>
    </div>
  );
}
