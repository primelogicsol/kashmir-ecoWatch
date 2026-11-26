'use client';

import React from 'react';
import { Search, MapPin, Shield, Droplet, Footprints, TreePine, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchResult } from '@/lib/atlas-search';

interface SearchResultsDropdownProps {
  results: Record<string, SearchResult[]>;
  isOpen: boolean;
  onSelect: (result: SearchResult) => void;
  onClose: () => void;
}

const getTypeIcon = (type: string) => {
  const icons: Record<string, React.ReactNode> = {
    species: <TreePine className="h-4 w-4" />,
    protected_area: <Shield className="h-4 w-4" />,
    lake: <Droplet className="h-4 w-4" />,
    wetland: <Droplet className="h-4 w-4" />,
    river: <Droplet className="h-4 w-4" />,
    glacier: <Shield className="h-4 w-4" />,
    watershed: <Shield className="h-4 w-4" />,
    trail: <Footprints className="h-4 w-4" />,
    district: <Building className="h-4 w-4" />,
    hazard: <MapPin className="h-4 w-4" />,
  };
  return icons[type] || <MapPin className="h-4 w-4" />;
};

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    species: 'text-purple-400 bg-purple-500/10',
    protected_area: 'text-emerald-400 bg-emerald-500/10',
    lake: 'text-blue-400 bg-blue-500/10',
    wetland: 'text-cyan-400 bg-cyan-500/10',
    river: 'text-sky-400 bg-sky-500/10',
    glacier: 'text-cyan-300 bg-cyan-400/10',
    watershed: 'text-indigo-400 bg-indigo-500/10',
    trail: 'text-amber-400 bg-amber-500/10',
    district: 'text-slate-400 bg-slate-500/10',
    hazard: 'text-red-400 bg-red-500/10',
  };
  return colors[type] || 'text-slate-400 bg-slate-500/10';
};

export function SearchResultsDropdown({
  results,
  isOpen,
  onSelect,
  onClose,
}: SearchResultsDropdownProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  // Flatten results for keyboard navigation
  const allResults = React.useMemo(() => {
    const flattened: SearchResult[] = [];
    Object.entries(results).forEach(([_, items]) => {
      flattened.push(...items);
    });
    return flattened;
  }, [results]);

  // Handle keyboard navigation
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, allResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        onSelect(allResults[selectedIndex]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, allResults, selectedIndex, onSelect, onClose]);

  if (!isOpen || Object.values(results).every(r => r.length === 0)) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -6 }}
        animate={{ y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        className="kew-menu-surface absolute top-full left-0 right-0 mt-2 border rounded-lg overflow-hidden z-[500]"
      >
        <div className="kew-menu-scroll max-h-[min(24rem,calc(100dvh-9rem))] overflow-y-auto overscroll-contain">
          {Object.entries(results).map(([type, items]) => {
            if (items.length === 0) return null;

            return (
              <div key={type} className="border-b border-[var(--kew-menu-border)] last:border-0">
                <div className="kew-menu-section-header">
                  <span>
                    {type.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
                {items.map((result) => {
                  const globalIndex = allResults.findIndex(r => r.id === result.id);
                  const isSelected = globalIndex === selectedIndex;

                  return (
                    <button
                      key={result.id}
                      type="button"
                      onClick={() => onSelect(result)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={`kew-menu-item w-full px-4 py-3 flex items-start gap-3 ${
                        isSelected ? 'kew-menu-item--active' : ''
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${getTypeColor(result.type)}`}>
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <div className="kew-menu-item-title font-medium text-sm">{result.name}</div>
                        <div className="kew-menu-item-desc text-xs mt-0.5 line-clamp-1">
                          {result.description}
                        </div>
                        {result.district && (
                          <div className="kew-menu-desc text-xs mt-1">
                            {result.district}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
