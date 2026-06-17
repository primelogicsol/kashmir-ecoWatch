'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Grid3X3, List } from 'lucide-react';
import { GEOGRAPHY, Scope } from '@/data/geography';
import { useGlobalFilter } from '@/context/GlobalFilterContext';

// ─── Scope KPI pill config ────────────────────────────────────────────────────

export interface ScopePillConfig {
  /** Short label shown after the count, e.g. 'Kashmir Core Protected Areas' */
  label: string;
  color: string;
  iconColor: string;
  bg: string;
  border: string;
}

export type ScopePillMap = Record<string, ScopePillConfig>;

/** Default pill config — matches national-parks colour scheme exactly */
export const DEFAULT_SCOPE_PILL_MAP = (entityLabel: string): ScopePillMap => ({
  'Kashmir Core': {
    label: `Kashmir Core ${entityLabel}`,
    color: 'text-emerald-300', iconColor: 'text-emerald-400',
    bg: 'bg-emerald-500/10', border: 'border-emerald-500/25',
  },
  'Trans-Divisional': {
    label: `Trans-Divisional ${entityLabel}`,
    color: 'text-blue-300', iconColor: 'text-blue-400',
    bg: 'bg-blue-500/10', border: 'border-blue-500/25',
  },
  'Transboundary / Extended': {
    label: `Transboundary ${entityLabel}`,
    color: 'text-amber-300', iconColor: 'text-amber-400',
    bg: 'bg-amber-500/10', border: 'border-amber-500/25',
  },
});

// ─── Props ───────────────────────────────────────────────────────────────────

interface ModuleScopeRowProps {
  /** Number of items after current filters applied */
  filteredCount: number;
  /** Total unfiltered count */
  totalCount: number;
  /** Plural entity label, e.g. "protected areas", "species", "lakes" */
  entityLabel: string;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  /** Scope → pill config map. Use DEFAULT_SCOPE_PILL_MAP() as a starting point. */
  scopePillMap: ScopePillMap;
  /** Count of items that belong strictly to the active scope (no other filters) */
  scopeCount: number;
  /**
   * Optional side-effect called after a scope tab is clicked.
   * Use this to reset pagination: () => setCurrentPage(1)
   */
  onScopeChange?: () => void;
}

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Scope tabs + results action row.
 * Matches /protected-network/national-parks exactly.
 *
 * Layout:
 *   [All][Kashmir Core][Trans-Divisional][Transboundary]  ···  [🛡 N Scope Label] [N of M entities] [⊞][☰]
 */
export function ModuleScopeRow({
  filteredCount,
  totalCount,
  entityLabel,
  viewMode,
  onViewModeChange,
  scopePillMap,
  scopeCount,
  onScopeChange,
}: ModuleScopeRowProps) {
  const { filter, setScope } = useGlobalFilter();
  const scopes = [...GEOGRAPHY.scopes];

  const handleScope = (scope: string) => {
    setScope(scope as Scope | 'All');
    onScopeChange?.();
  };

  const activePill = filter.scope !== 'All' ? scopePillMap[filter.scope] : null;

  return (
    <div className="container mx-auto px-6 mt-6">
      <div className="flex flex-wrap items-center justify-between gap-3">

        {/* ── Scope tabs ── */}
        <div className="flex items-center gap-2 p-1 glass-intense border border-white/10 rounded-xl overflow-x-auto hide-scrollbar">
          {scopes.map(scope => (
            <button
              key={scope}
              onClick={() => handleScope(scope)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                filter.scope === scope
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {scope === 'Transboundary / Extended' ? 'Transboundary' : scope}
            </button>
          ))}
        </div>

        {/* ── Results action row ── */}
        <div className="flex items-center gap-3 ml-auto">

          {/* Scope KPI pill — visible only when a specific scope is active */}
          <AnimatePresence mode="wait">
            {activePill && (
              <motion.div
                key={filter.scope}
                initial={{ opacity: 0, scale: 0.88, x: 8 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.88, x: 8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className={`hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl border backdrop-blur-sm ${activePill.bg} ${activePill.border}`}
              >
                <Shield className={`w-3.5 h-3.5 flex-shrink-0 ${activePill.iconColor}`} />
                <div className="leading-[1.2]">
                  <span className={`text-sm font-bold tabular-nums ${activePill.color}`}>
                    {scopeCount}
                  </span>
                  <span className="ml-1.5 text-[10px] uppercase tracking-wide text-slate-400 whitespace-nowrap">
                    {activePill.label}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Result count */}
          <span className="text-sm text-slate-400 whitespace-nowrap hidden sm:inline">
            <strong className="text-white">{filteredCount}</strong> of{' '}
            <strong className="text-white">{totalCount}</strong>{' '}
            {entityLabel}
          </span>

          {/* Grid / List toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
