'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, X, ArrowRight, MapPin, 
  Droplet, Mountain, Shield, Activity, 
  FileText, Footprints, AlertTriangle
} from 'lucide-react';
import { searchAll } from '@/data';

interface HeaderSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HeaderSearch({ isOpen, onClose }: HeaderSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const searchRes = searchAll(query.trim());
      setResults(searchRes);
    } else {
      setResults(null);
    }
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      // If there are results, route to top result
      if (results) {
        if (results.species?.length) {
          router.push(`/biodiversity/species/${results.species[0].slug}`);
          onClose();
        } else if (results.protectedAreas?.length) {
          router.push(`/protected-network/${results.protectedAreas[0].slug}`);
          onClose();
        } else if (results.waterBodies?.length) {
          router.push(`/water-systems/${results.waterBodies[0].slug}`);
          onClose();
        } else if (results.districts?.length) {
          router.push(`/districts/${results.districts[0].slug}`);
          onClose();
        } else {
          router.push(`/search?q=${encodeURIComponent(query)}`);
          onClose();
        }
      }
    }
  };

  const getResultCount = () => {
    if (!results) return 0;
    return (
      (results.species?.length || 0) +
      (results.protectedAreas?.length || 0) +
      (results.waterBodies?.length || 0) +
      (results.districts?.length || 0) +
      (results.alerts?.length || 0) +
      (results.reports?.length || 0)
    );
  };

  if (!isOpen) return null;

  return (
    <div 
      className="absolute right-0 top-full mt-2 w-[480px] max-w-[calc(100vw-1.5rem)] rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-xl z-50 overflow-hidden text-slate-200 animate-in fade-in zoom-in-95 duration-200"
      onClick={e => e.stopPropagation()}
    >
      {/* Search Input Bar */}
      <div className="p-3 border-b border-white/10 flex items-center gap-3 bg-slate-950/60">
        <Search className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search species, water bodies, protected areas, hazards..."
          className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-500"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors text-xs font-mono"
        >
          ESC
        </button>
      </div>

      {/* Results Dropdown */}
      <div className="max-h-[380px] overflow-y-auto divide-y divide-white/5 p-2">
        {query.trim().length < 2 ? (
          <div className="p-6 text-center text-slate-400 space-y-2">
            <Search className="w-6 h-6 mx-auto text-slate-500" />
            <p className="text-xs">Type at least 2 characters to search the live registry</p>
            <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
              {['Hangul', 'Dal Lake', 'Dachigam', 'Kolhai Glacier', 'Wular', 'Srinagar'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ) : getResultCount() === 0 ? (
          <div className="p-6 text-center text-slate-400 space-y-1">
            <p className="text-sm font-semibold text-white">No results found</p>
            <p className="text-xs">No records matched "{query}"</p>
          </div>
        ) : (
          <div className="space-y-3 py-1">
            {/* Species */}
            {results.species && results.species.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-3 py-1 block">
                  Species ({results.species.length})
                </span>
                <div className="space-y-0.5">
                  {results.species.slice(0, 3).map((item: any) => (
                    <Link
                      key={item.id}
                      href={`/biodiversity/species/${item.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-400 italic">
                          {item.scientificName} • {item.taxonomicGroup}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Protected Areas */}
            {results.protectedAreas && results.protectedAreas.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 px-3 py-1 block">
                  Protected Areas ({results.protectedAreas.length})
                </span>
                <div className="space-y-0.5">
                  {results.protectedAreas.slice(0, 3).map((item: any) => (
                    <Link
                      key={item.id}
                      href={`/protected-network/${item.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {item.district} • {item.area} km²
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Water Systems */}
            {results.waterBodies && results.waterBodies.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 px-3 py-1 block">
                  Water Systems ({results.waterBodies.length})
                </span>
                <div className="space-y-0.5">
                  {results.waterBodies.slice(0, 3).map((item: any) => (
                    <Link
                      key={item.id}
                      href={`/water-systems/${item.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {item.district} • {item.type}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Districts */}
            {results.districts && results.districts.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 px-3 py-1 block">
                  Districts ({results.districts.length})
                </span>
                <div className="space-y-0.5">
                  {results.districts.slice(0, 3).map((item: any) => (
                    <Link
                      key={item.id}
                      href={`/districts/${item.slug}`}
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors">
                          {item.name} District
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {item.division} Division
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Alerts */}
            {results.alerts && results.alerts.length > 0 && (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 px-3 py-1 block">
                  Live Hazards & Alerts ({results.alerts.length})
                </span>
                <div className="space-y-0.5">
                  {results.alerts.slice(0, 2).map((item: any) => (
                    <Link
                      key={item.id}
                      href="/risk-monitoring/live-alerts-advisories"
                      onClick={onClose}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                    >
                      <div>
                        <p className="text-xs font-bold text-white group-hover:text-rose-300 transition-colors">
                          {item.title}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Severity: {item.severity} • {item.district}
                        </p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-rose-400 transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Instructions */}
      <div className="p-2.5 bg-slate-950/80 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500">
        <span>Press <strong className="text-slate-400 font-mono">ENTER</strong> to open top result</span>
        <span><strong className="text-slate-400 font-mono">ESC</strong> to close</span>
      </div>
    </div>
  );
}
