'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ChevronDown, Globe, MapPin } from 'lucide-react';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { GEOGRAPHY, Scope } from '@/data/geography';

// ─── Scope pill colours ───────────────────────────────────────────────────────

const SCOPE_META: Record<string, { label: string; color: string; active: string }> = {
  'All': {
    label: 'All Scopes',
    color: 'text-slate-400 border-white/10 hover:border-white/20 hover:text-white',
    active: 'bg-white/10 text-white border-white/20',
  },
  'Kashmir Core': {
    label: 'Kashmir Core',
    color: 'text-emerald-400/70 border-emerald-500/20 hover:border-emerald-500/40 hover:text-emerald-300',
    active: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
  },
  'Trans-Divisional': {
    label: 'Trans-Divisional',
    color: 'text-blue-400/70 border-blue-500/20 hover:border-blue-500/40 hover:text-blue-300',
    active: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
  },
  'Transboundary / Extended': {
    label: 'Transboundary',
    color: 'text-amber-400/70 border-amber-500/20 hover:border-amber-500/40 hover:text-amber-300',
    active: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
  },
};

// ─── Reusable page-filter select (portal dropdown — matches District control) ──

export interface FilterSelectProps {
  value: string;
  onChange: (v: string) => void;
  /** Label shown when nothing is selected (value='all') */
  placeholder: string;
  options: { value: string; label: string }[];
}

/**
 * Portal-based custom dropdown matching the GlobalFilterBar "All Districts" control.
 * No native <select>. Dark glass panel, emerald active state, z-[9999].
 */
export function FilterSelect({ value, onChange, placeholder, options }: FilterSelectProps) {
  const isActive = value !== 'all' && value !== '';
  const [open, setOpen]           = useState(false);
  const [pos, setPos]             = useState<{ top: number; left: number } | null>(null);
  const [mounted, setMounted]     = useState(false);
  const triggerRef                = useRef<HTMLButtonElement>(null);
  const dropdownRef               = useRef<HTMLDivElement>(null);

  // Hydration guard
  useEffect(() => { setMounted(true); }, []);

  const openDropdown = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setPos({
        top:  rect.bottom + window.scrollY + 6,
        left: rect.left   + window.scrollX,
      });
    }
    setOpen(true);
  }, []);

  // Outside-click → close
  useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current  && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Scroll → close
  useEffect(() => {
    if (!open) return;
    const onScroll = () => setOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  // Active label (show selected option label or placeholder)
  const activeLabel = options.find(o => o.value === value)?.label ?? placeholder;

  return (
    <>
      {/* Trigger — identical style to the District button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => open ? setOpen(false) : openDropdown()}
        className={`
          flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs border
          transition-all duration-150 flex-shrink-0 whitespace-nowrap
          ${isActive
            ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
            : 'text-slate-400 border-white/10 hover:text-white hover:border-white/20'
          }
        `}
      >
        <span className="max-w-[140px] truncate">{isActive ? activeLabel : placeholder}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Portal dropdown — identical to District panel */}
      {mounted && open && pos && createPortal(
        <AnimatePresence>
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            style={{
              position:  'absolute',
              top:       pos.top,
              left:      pos.left,
              zIndex:    9999,
              width:     '240px',
              minWidth:  '220px',
              maxWidth:  '260px',
            }}
            className="bg-slate-900 border border-white/10 rounded-xl shadow-2xl shadow-black/60 max-h-[320px] overflow-y-auto"
          >
            <div className="p-1">
              {/* "All" / placeholder option */}
              <button
                type="button"
                onClick={() => { onChange('all'); setOpen(false); }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  value === 'all'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {placeholder}
              </button>

              {/* Option list */}
              {options.map(o => (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => { onChange(o.value); setOpen(false); }}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                    value === o.value
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Inline (non-sticky) global filter bar.
 * Drop it anywhere inside a page — typically right after the KPI metrics strip.
 * Reads and writes to GlobalFilterContext so state is shared across all modules.
 */
export interface GlobalFilterBarProps {
  /** Page-specific filter controls rendered inline in the bar */
  extraFilters?: React.ReactNode;
  /** Number of active page-specific filters (drives the combined Clear count) */
  extraActiveCount?: number;
  /** Called when the Clear button is clicked — use to reset page-local filter state */
  onExtraFiltersClear?: () => void;
}

export function GlobalFilterBar({
  extraFilters,
  extraActiveCount = 0,
  onExtraFiltersClear,
}: GlobalFilterBarProps = {}) {
  const {
    filter,
    setScope,
    setDistrict,
    setSearchQuery,
    resetFilter,
    availableDistricts,
    activeFilterCount,
  } = useGlobalFilter();

  const [districtOpen, setDistrictOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Only render portal after hydration
  useEffect(() => { setMounted(true); }, []);

  // Position the portal dropdown beneath the trigger button
  const openDropdown = useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 6,
        left: rect.left + window.scrollX,
      });
    }
    setDistrictOpen(true);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!districtOpen) return;
    function handler(e: MouseEvent) {
      const target = e.target as Node;
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setDistrictOpen(false);
      }
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [districtOpen]);

  // Close on scroll (reposition would be needed otherwise)
  useEffect(() => {
    if (!districtOpen) return;
    function onScroll() { setDistrictOpen(false); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [districtOpen]);

  const scopes = GEOGRAPHY.scopes;
  const selectedDistrictLabel = filter.district === 'All' ? 'All Districts' : filter.district;
  const totalActive = activeFilterCount + extraActiveCount;

  return (
    // ── Outer wrapper: high stacking context, overflow VISIBLE so portal trigger isn't clipped ──
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: 0.1 }}
      className="relative z-40 w-full border border-white/8 rounded-xl bg-slate-900/60 backdrop-blur-sm overflow-visible"
    >
      {/* ── Row 1: Globe · Scopes · District · Extra filters · Clear ── */}
      <div className="flex items-center gap-2 px-4 py-3 overflow-visible flex-wrap">

        {/* Globe icon + label */}
        <div className="flex items-center gap-1.5 flex-shrink-0 pr-2 border-r border-white/10">
          <Globe className="w-3.5 h-3.5 text-emerald-500" />
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap hidden sm:block">
            Global Filter
          </span>
        </div>

        {/* Scope pills */}
        <div className="flex items-center gap-1 flex-wrap">
          {scopes.map(scope => {
            const meta = SCOPE_META[scope];
            const isActive = filter.scope === scope;
            return (
              <button
                key={scope}
                onClick={() => setScope(scope as Scope | 'All')}
                className={`
                  px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-150 whitespace-nowrap
                  ${isActive ? meta.active : meta.color}
                `}
              >
                {meta.label}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-4 bg-white/10 mx-0.5 flex-shrink-0" />

        {/* District trigger */}
        <button
          ref={triggerRef}
          onClick={() => districtOpen ? setDistrictOpen(false) : openDropdown()}
          className={`
            flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs border transition-all duration-150 flex-shrink-0
            ${filter.district !== 'All'
              ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
              : 'text-slate-400 border-white/10 hover:text-white hover:border-white/20'
            }
          `}
        >
          <MapPin className="w-3 h-3" />
          <span className="max-w-[120px] truncate">{selectedDistrictLabel}</span>
          <ChevronDown className={`w-3 h-3 transition-transform duration-150 ${districtOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Page-specific extra filters injected by host page */}
        {extraFilters && (
          <>
            <div className="w-px h-4 bg-white/10 mx-0.5 flex-shrink-0" />
            {extraFilters}
          </>
        )}

        {/* Search — inline only when NO extra filters (simple pages) */}
        {!extraFilters && (
          <>
            <div className="hidden sm:block w-px h-4 bg-white/10 mx-0.5 flex-shrink-0" />
            <div className={`relative flex items-center transition-all duration-200 ${searchFocused ? 'flex-1 min-w-[180px]' : 'w-44'}`}>
              <Search className="absolute left-2.5 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
              <input
                type="text"
                value={filter.searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                placeholder="Search across modules…"
                className="w-full pl-8 pr-3 py-1 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
              />
              {filter.searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2 text-slate-500 hover:text-white transition-colors">
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </>
        )}

        {/* Clear — always far-right on Row 1 */}
        <AnimatePresence>
          {totalActive > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              onClick={() => { resetFilter(); onExtraFiltersClear?.(); }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-colors ml-auto flex-shrink-0"
            >
              <X className="w-3 h-3" />
              Clear {totalActive}
            </motion.button>
          )}
        </AnimatePresence>

      </div>

      {/* ── Row 2: Search — visible only on filter-heavy pages (extraFilters injected) ── */}
      {extraFilters && (
        <div className="px-4 pb-3 pt-0 border-t border-white/[0.06]">
          <div className="relative flex items-center mt-2.5">
            <Search className="absolute left-2.5 w-3.5 h-3.5 text-slate-500 pointer-events-none" />
            <input
              type="text"
              value={filter.searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search across modules…"
              className="w-full sm:max-w-sm pl-8 pr-8 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-all"
            />
            {filter.searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 text-slate-500 hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── District dropdown: rendered via Portal into <body> at z-[9999] ── */}
      {mounted && districtOpen && dropdownPos && createPortal(
        <AnimatePresence>
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            style={{
              position: 'absolute',
              top: dropdownPos.top,
              left: dropdownPos.left,
              zIndex: 9999,
              width: '240px',        /* explicit width — prevents body-child from going full-page */
              minWidth: '220px',
              maxWidth: '260px',
            }}
            className="bg-slate-900 border border-white/10 rounded-xl shadow-2xl shadow-black/60 max-h-[320px] overflow-y-auto"
          >
            <div className="p-1">
              <button
                onClick={() => { setDistrict('All'); setDistrictOpen(false); }}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  filter.district === 'All'
                    ? 'bg-emerald-500/20 text-emerald-300'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                All Districts
              </button>
              
              {(() => {
                if (filter.scope === 'All' || filter.scope === 'Kashmir Core') {
                  return availableDistricts.map(d => (
                    <button
                      key={d}
                      onClick={() => { setDistrict(d); setDistrictOpen(false); }}
                      className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                        filter.district === d ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  ));
                }

                const scopeRegions = (GEOGRAPHY.regions as any)[filter.scope] as string[] || [];
                const groups: Record<string, string[]> = {};
                scopeRegions.forEach(r => { groups[r] = []; });
                const other: string[] = [];

                availableDistricts.forEach(d => {
                  let placed = false;
                  for (const region of scopeRegions) {
                    const units = (GEOGRAPHY.units as any)[region] as string[];
                    if (units && units.includes(d)) {
                      groups[region].push(d);
                      placed = true;
                      break;
                    }
                  }
                  if (!placed) other.push(d);
                });

                const renderGroup = (label: string, items: string[]) => {
                  if (items.length === 0) return null;
                  return (
                    <div key={label} className="mt-2 mb-1">
                      <div className="px-3 py-1 text-[9px] font-bold tracking-widest text-slate-500 uppercase cursor-default pointer-events-none">
                        {label.endsWith('DIVISION') ? label : label === 'AJK' || label === 'Gilgit-Baltistan' ? label : label + ' DIVISION'}
                      </div>
                      {items.map(d => (
                        <button
                          key={d}
                          onClick={() => { setDistrict(d); setDistrictOpen(false); }}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-colors ${
                            filter.district === d ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-300 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  );
                };

                return (
                  <>
                    {scopeRegions.map(r => renderGroup(r, groups[r]))}
                    {renderGroup('Other', other)}
                  </>
                );
              })()}
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}
