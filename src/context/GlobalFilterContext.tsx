'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { GEOGRAPHY, getUnitsForScope, Scope } from '@/data/geography';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GlobalFilterState {
  scope: Scope | 'All';
  district: string; // 'All' or a specific district name
  searchQuery: string;
}

export interface GlobalFilterContextValue {
  filter: GlobalFilterState;
  setScope: (scope: Scope | 'All') => void;
  setDistrict: (district: string) => void;
  setSearchQuery: (q: string) => void;
  resetFilter: () => void;
  availableDistricts: string[];
  availableScopes: readonly (Scope | 'All')[];
  activeFilterCount: number;
}

// ─── Defaults ─────────────────────────────────────────────────────────────────

const DEFAULT_FILTER: GlobalFilterState = {
  scope: 'All',
  district: 'All',
  searchQuery: '',
};

// ─── Context ──────────────────────────────────────────────────────────────────

const GlobalFilterContext = createContext<GlobalFilterContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function GlobalFilterProvider({ children }: { children: React.ReactNode }) {
  const [filter, setFilter] = useState<GlobalFilterState>(DEFAULT_FILTER);

  const setScope = useCallback((scope: Scope | 'All') => {
    setFilter(prev => ({ ...prev, scope, district: 'All' }));
  }, []);

  const setDistrict = useCallback((district: string) => {
    setFilter(prev => ({ ...prev, district }));
  }, []);

  const setSearchQuery = useCallback((searchQuery: string) => {
    setFilter(prev => ({ ...prev, searchQuery }));
  }, []);

  const resetFilter = useCallback(() => {
    setFilter(DEFAULT_FILTER);
  }, []);

  const availableDistricts = useMemo<string[]>(() => {
    return getUnitsForScope(filter.scope === 'All' ? 'All' : filter.scope as Scope).sort();
  }, [filter.scope]);

  const availableScopes = GEOGRAPHY.scopes; // ['All', 'Kashmir Core', 'Trans-Divisional', 'Transboundary / Extended']

  const activeFilterCount = useMemo(() => {
    return [
      filter.scope !== 'All',
      filter.district !== 'All',
      filter.searchQuery.trim() !== '',
    ].filter(Boolean).length;
  }, [filter]);

  return (
    <GlobalFilterContext.Provider value={{
      filter,
      setScope,
      setDistrict,
      setSearchQuery,
      resetFilter,
      availableDistricts,
      availableScopes,
      activeFilterCount,
    }}>
      {children}
    </GlobalFilterContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGlobalFilter(): GlobalFilterContextValue {
  const ctx = useContext(GlobalFilterContext);
  if (!ctx) {
    throw new Error('useGlobalFilter must be used within a GlobalFilterProvider');
  }
  return ctx;
}
