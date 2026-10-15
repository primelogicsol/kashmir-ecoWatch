'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Filter, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GEOGRAPHY, getUnitsForScope, Scope } from '@/data/geography';

interface BiodiversityFiltersProps {
  filters: {
    searchQuery?: string;
    conservationStatus?: string;
    habitat?: string;
    scope?: Scope | 'All';
    administrativeUnit?: string;
    elevation?: string;
  };
  onFilterChange: (filters: any) => void;
  onReset: () => void;
  resultCount: number;

  searchPlaceholder?: string;
  
  category1Label?: string;
  category1Key?: string;
  category1Options?: { id: string; label: string }[];
  
  category2Label?: string;
  category2Key?: string;
  category2Options?: string[];
  
  moduleOptions?: { id: string; label: string }[];
  activeModule?: string;
  onModuleChange?: (moduleId: string) => void;
  hideHabitatFilter?: boolean;
  hideAdministrativeUnitFilter?: boolean;
  hideElevationFilter?: boolean;
  defaultOpen?: boolean;
}

const conservationStatuses = [
  { id: 'CR', label: 'Critically Endangered' },
  { id: 'EN', label: 'Endangered' },
  { id: 'VU', label: 'Vulnerable' },
  { id: 'NT', label: 'Near Threatened' },
  { id: 'LC', label: 'Least Concern' },
];

const habitats = [
  'Temperate forests',
  'Alpine meadows',
  'Wetlands',
  'Riverine forests',
  'Rocky terrain',
  'Mountain slopes',
  'Forest edges',
];

const scopes = GEOGRAPHY.scopes;

const elevations = [
  { id: 'low', label: 'Low (0-1500m)' },
  { id: 'mid', label: 'Mid (1500-3000m)' },
  { id: 'high', label: 'High (3000m+)' },
];

export function BiodiversityFilters({ 
  filters, 
  onFilterChange, 
  onReset, 
  resultCount,
  searchPlaceholder = 'Species name...',
  category1Label = 'Conservation Status',
  category1Key = 'conservationStatus',
  category1Options = conservationStatuses,
  category2Label = 'Habitat',
  category2Key = 'habitat',
  category2Options = habitats,
  moduleOptions,
  activeModule,
  onModuleChange,
  hideHabitatFilter = false,
  hideAdministrativeUnitFilter = false,
  hideElevationFilter = false,
  defaultOpen = false,
}: BiodiversityFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  const activeFilterCount = 
    (filters.searchQuery ? 1 : 0) +
    (filters[category1Key] && filters[category1Key] !== 'all' ? 1 : 0) +
    (!hideHabitatFilter && filters[category2Key] && filters[category2Key] !== 'all' ? 1 : 0) +
    (filters.scope && filters.scope !== 'All' ? 1 : 0) +
    (!hideAdministrativeUnitFilter && filters.administrativeUnit && filters.administrativeUnit !== 'All' ? 1 : 0) +
    (!hideElevationFilter && filters.elevation ? 1 : 0);

  const availableUnits = React.useMemo(() => {
    return getUnitsForScope((filters.scope as Scope) || 'All').sort();
  }, [filters.scope]);

  const handleChange = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value === 'all' ? undefined : value });
  };

  return (
    <div className="space-y-4 w-full">
      {/* Filter bar header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className={`border-white/20 text-white ${isOpen ? 'bg-forest-500/20 border-forest-500/50' : ''}`}
            icon={<Filter className="w-4 h-4" />}
          >
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="default" size="sm" className="ml-2 bg-forest-500">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
          <span className="text-sm text-slate-400">
            <strong className="text-white">{resultCount}</strong> results
          </span>
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-slate-400 hover:text-white"
            icon={<X className="w-4 h-4" />}
          >
            Reset
          </Button>
        )}
      </div>

      {/* Expanded filters */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-5 glass-intense border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 ${moduleOptions ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-4`}
          >
            {moduleOptions && onModuleChange && (
              <div>
                <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Module</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">Active View</span>
                </label>
                <select
                  value={activeModule || 'overview'}
                  onChange={(e) => onModuleChange(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-emerald-500/40 text-emerald-300 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 transition-colors shadow-sm cursor-pointer"
                  style={{ backgroundColor: '#020617', color: '#6ee7b7' }}
                >
                  {moduleOptions.map(m => (
                    <option 
                      key={m.id} 
                      value={m.id}
                      className="bg-slate-900 text-slate-100 font-medium py-1.5"
                      style={{ backgroundColor: '#0f172a', color: '#f8fafc' }}
                    >
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={filters.searchQuery || ''}
                  onChange={(e) => handleChange('searchQuery', e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/60 transition-colors" style={{ backgroundColor: "#020617", color: "#ffffff" }}
                />
              </div>
            </div>

            {category1Key !== 'none' && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">{category1Label}</label>
                <select
                  value={filters[category1Key] || 'all'}
                  onChange={(e) => handleChange(category1Key, e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-emerald-500/60 transition-colors cursor-pointer"
                  style={{ backgroundColor: '#020617', color: '#ffffff' }}
                >
                  <option value="all" className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>All</option>
                  {category1Options.map(s => (
                    <option key={s.id} value={s.id} className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>{s.label}</option>
                  ))}
                </select>
              </div>
            )}

            {!hideHabitatFilter && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">{category2Label}</label>
                <select
                  value={filters[category2Key] || 'all'}
                  onChange={(e) => handleChange(category2Key, e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-emerald-500/60 transition-colors cursor-pointer"
                  style={{ backgroundColor: '#020617', color: '#ffffff' }}
                >
                  <option value="all" className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>All</option>
                  {category2Options.map(h => (
                    <option key={h} value={h} className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>{h}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Ecological Scope</label>
              <select
                value={filters.scope || 'All'}
                onChange={(e) => {
                  onFilterChange({ 
                    ...filters, 
                    scope: e.target.value === 'All' ? undefined : e.target.value,
                    administrativeUnit: undefined 
                  });
                }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-emerald-500/60 transition-colors cursor-pointer"
                style={{ backgroundColor: '#020617', color: '#ffffff' }}
              >
                {scopes.map(r => (
                  <option key={r} value={r} className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>{r}</option>
                ))}
              </select>
            </div>

            {!hideAdministrativeUnitFilter && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Administrative Unit</label>
                <select
                  value={filters.administrativeUnit || 'All'}
                  onChange={(e) => handleChange('administrativeUnit', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-emerald-500/60 transition-colors disabled:opacity-50 cursor-pointer"
                  style={{ backgroundColor: '#020617', color: '#ffffff' }}
                >
                  <option value="All" className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>All Units in {filters.scope || 'All'}</option>
                  {availableUnits.map(u => (
                    <option key={u} value={u} className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>{u}</option>
                  ))}
                </select>
              </div>
            )}

            {!hideElevationFilter && (
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Elevation Range</label>
                <select
                  value={filters.elevation || 'all'}
                  onChange={(e) => handleChange('elevation', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-emerald-500/60 transition-colors cursor-pointer"
                  style={{ backgroundColor: '#020617', color: '#ffffff' }}
                >
                  <option value="all" className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>All Elevations</option>
                  {elevations.map(e => (
                    <option key={e.id} value={e.id} className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>{e.label}</option>
                  ))}
                </select>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
