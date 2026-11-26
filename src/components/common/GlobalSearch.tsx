'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, ArrowUpRight, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { isScientificQuestionLike } from '@/lib/search/scientific-qa-types';

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [groups, setGroups] = useState<any[]>([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isOpen || query.trim().length < 2) {
      setGroups([]);
      setTotalHits(0);
      return;
    }
    const ctrl = new AbortController();
    setIsLoading(true);
    const t = setTimeout(() => {
      fetch(`/api/search/suggest?q=${encodeURIComponent(query.trim())}&limit=4`, {
        signal: ctrl.signal,
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => {
          if (d) {
            setGroups(d.groups || []);
            setTotalHits(d.totalHits || 0);
          }
        })
        .catch(() => {})
        .finally(() => setIsLoading(false));
    }, 100);

    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [query, isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative group flex items-center gap-2 px-4 py-2 rounded-lg glass-light border border-white/10 text-sm text-slate-400 hover:text-white hover:border-emerald-500/50 transition-all"
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="hidden md:inline-flex px-2 py-0.5 text-xs bg-white/5 rounded border border-white/10">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 1, scale: 0.98, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: -8 }}
              className="kew-global-search-panel kew-menu-surface fixed top-20 left-1/2 -translate-x-1/2 w-[calc(100vw-2rem)] max-w-2xl border rounded-xl z-50 overflow-hidden"
            >
              <div className="kew-search-input-bar flex items-center gap-3 p-4 border-b">
                <Search className="kew-search-lead-icon w-5 h-5 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && query.trim()) {
                      e.preventDefault();
                      setIsOpen(false);
                      const modeParam = isScientificQuestionLike(query.trim()) ? '&mode=ask' : '';
                      router.push(`/search?q=${encodeURIComponent(query.trim())}${modeParam}`);
                    }
                  }}
                  placeholder="Search all Western Himalayan modules, records, entities & hazards..."
                  className="kew-search-input flex-1 bg-transparent border-none outline-none text-base"
                  autoFocus
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    className="kew-search-clear-btn p-1.5 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="kew-search-content-body kew-menu-scroll max-h-[min(60vh,calc(100dvh-10rem))] overflow-y-auto overscroll-contain p-3 space-y-4">
                {isLoading && groups.length === 0 ? (
                  <div className="kew-search-supporting-text py-8 text-center text-sm">Searching canonical index...</div>
                ) : groups.length > 0 ? (
                  groups.map((g) => (
                    <div key={g.groupKey}>
                      <div className="kew-search-inst-heading text-[10px] font-bold uppercase tracking-wider px-2 mb-1">
                        {g.groupLabel}
                      </div>
                      <div className="space-y-1">
                        {g.items.map((it: any) => (
                          <Link
                            key={it.id}
                            href={it.canonicalUrl}
                            onClick={() => setIsOpen(false)}
                            className="kew-search-result-item flex items-center justify-between gap-3 p-2.5 rounded-lg transition-colors group"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="kew-search-result-title text-sm font-semibold truncate">
                                {it.title}
                              </div>
                              {it.subtitle && (
                                <div className="kew-search-result-subtitle text-xs truncate">{it.subtitle}</div>
                              )}
                            </div>
                            <ArrowUpRight className="kew-search-result-arrow w-4 h-4 shrink-0" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="kew-search-supporting-text py-6 text-center text-xs">
                    Type at least 2 characters to search modules, scientific records, PILs, EIAs, and geographic entities.
                  </div>
                )}
              </div>

              <div className="kew-search-footer-bar px-4 py-3 border-t flex flex-wrap items-center justify-between gap-2 text-xs">
                <Link
                  href={
                    query.trim()
                      ? `/search?mode=ask&q=${encodeURIComponent(query.trim())}`
                      : '/search?mode=ask'
                  }
                  onClick={() => setIsOpen(false)}
                  className="kew-search-qa-link hover:underline font-semibold inline-flex items-center gap-1"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Ask Scientific Question (Cited Brief) →</span>
                </Link>
                <Link
                  href={query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search'}
                  onClick={() => setIsOpen(false)}
                  className="kew-search-full-link hover:underline font-semibold"
                >
                  Open Full Search{totalHits > 0 ? ` (${totalHits.toLocaleString()})` : ''} →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
