'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, X, ArrowUpRight, Sparkles, FileText } from 'lucide-react';
import { isScientificQuestionLike } from '@/lib/search/scientific-qa-types';

interface HeaderSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_CHIPS = [
  'Himalayan Dispatch',
  'EcoVoices',
  'Webinars & Conferences',
  'Hangul',
  'Wular Lake',
  'Western Disturbances',
  'Environmental PIL',
];

export function HeaderSearch({ isOpen, onClose }: HeaderSearchProps) {
  const [query, setQuery] = useState('');
  const [groups, setGroups] = useState<any[]>([]);
  const [totalHits, setTotalHits] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
      setGroups([]);
      setTotalHits(0);
      setActiveIndex(-1);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || query.trim().length < 2) {
      setGroups([]);
      setTotalHits(0);
      setActiveIndex(-1);
      return;
    }

    const ctrl = new AbortController();
    setLoading(true);
    const timer = setTimeout(() => {
      fetch(`/api/search/suggest?q=${encodeURIComponent(query.trim())}&limit=3`, {
        signal: ctrl.signal,
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((data) => {
          if (data) {
            setGroups(data.groups || []);
            setTotalHits(data.totalHits || 0);
            setActiveIndex(-1);
          }
        })
        .catch(() => {})
        .finally(() => setLoading(false));
    }, 100);

    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query, isOpen]);

  const flatItems = useMemo(() => {
    const out: any[] = [];
    for (const g of groups) {
      for (const it of g.items || []) out.push(it);
    }
    return out;
  }, [groups]);

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
        router.push(flatItems[activeIndex].canonicalUrl);
        onClose();
      } else if (query.trim()) {
        const modeParam = isScientificQuestionLike(query.trim()) ? '&mode=ask' : '';
        router.push(`/search?q=${encodeURIComponent(query.trim())}${modeParam}`);
        onClose();
      } else {
        router.push('/search');
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  let runningIdx = -1;

  return (
    <div
      className="absolute right-0 top-full mt-2 w-[calc(100vw-1.5rem)] sm:w-[520px] max-w-[520px] rounded-xl bg-slate-900/98 border border-white/15 shadow-2xl backdrop-blur-xl z-50 overflow-hidden text-slate-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Input Header */}
      <div className="p-3 border-b border-white/10 flex items-center gap-2.5 bg-slate-950/80">
        <Search className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search all KEW modules, species, water, hazards, PIL, EIA..."
          className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-500 min-w-0"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          type="button"
          onClick={onClose}
          className="px-2 py-1 rounded bg-white/5 text-slate-400 hover:text-white text-[10px] font-mono border border-white/10"
        >
          ESC
        </button>
      </div>

      {/* Results Body */}
      <div className="max-h-[400px] overflow-y-auto divide-y divide-white/5 p-2">
        {query.trim().length < 2 ? (
          <div className="p-5 text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Western Himalayan Knowledge &amp; Intelligence Index</span>
            </div>
            <p className="text-xs text-slate-400">
              Search modules, scientific records, 6 subregions, 44 districts, PIL dockets, EIAs &amp; live hazards
            </p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
              {QUICK_CHIPS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-emerald-500/15 text-xs text-slate-300 hover:text-emerald-300 border border-white/10 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ) : loading && groups.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-400">Searching canonical index...</div>
        ) : groups.length === 0 ? (
          <div className="p-6 text-center space-y-2">
            <p className="text-sm font-semibold text-white">No instant matches for &ldquo;{query}&rdquo;</p>
            <Link
              href={`/search?q=${encodeURIComponent(query.trim())}`}
              onClick={onClose}
              className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:underline font-medium"
            >
              <span>Open Full Search Workbench</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-3 py-1">
            {groups.map((grp) => (
              <div key={grp.groupKey}>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2.5 py-1 block">
                  {grp.groupLabel}
                </span>
                <div className="space-y-0.5">
                  {grp.items.map((item: any) => {
                    runningIdx++;
                    const isFocused = runningIdx === activeIndex;
                    return (
                      <Link
                        key={item.id}
                        href={item.canonicalUrl}
                        onClick={onClose}
                        className={`flex items-center justify-between gap-2 p-2.5 rounded-lg transition-colors group ${
                          isFocused ? 'bg-emerald-500/20 text-white' : 'hover:bg-white/5'
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-white group-hover:text-emerald-300 truncate">
                            {item.title}
                          </p>
                          {item.subtitle && (
                            <p className="text-[11px] text-slate-400 truncate">{item.subtitle}</p>
                          )}
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0" />
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
      <div className="px-3 py-2.5 bg-slate-950/90 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
        <Link
          href={
            query.trim()
              ? `/search?mode=ask&q=${encodeURIComponent(query.trim())}`
              : '/search?mode=ask'
          }
          onClick={onClose}
          className="text-sky-300 hover:text-sky-200 font-semibold inline-flex items-center gap-1"
        >
          <FileText className="w-3 h-3" />
          <span>{isScientificQuestionLike(query) ? 'Synthesize Cited Brief' : 'Scientific Q&A'}</span>
        </Link>
        <Link
          href={query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search'}
          onClick={onClose}
          className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1"
        >
          <span>Full Search{totalHits > 0 ? ` (${totalHits.toLocaleString()})` : ''}</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}
