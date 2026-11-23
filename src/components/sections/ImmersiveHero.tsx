'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Map, Leaf, BarChart3, ArrowRight, ArrowUpRight, Radar, Satellite, Activity, Search, X, Shield, Droplet, Footprints, AlertTriangle, Book, Database, Sparkles, Wind, Scale, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';
import { isScientificQuestionLike } from '@/lib/search/scientific-qa-types';

interface SuggestGroup {
  groupKey: string;
  groupLabel: string;
  items: Array<{
    id: string;
    title: string;
    subtitle?: string;
    canonicalUrl: string;
    trustBadge: string;
  }>;
}

export function ImmersiveHero() {
  const [query, setQuery] = useState('');
  const [suggestGroups, setSuggestGroups] = useState<SuggestGroup[]>([]);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Click outside listener to dismiss search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.trim().length >= 2) {
      const ctrl = new AbortController();
      setIsLoading(true);
      const timer = setTimeout(() => {
        fetch(`/api/search/suggest?q=${encodeURIComponent(query.trim())}&limit=4`, {
          signal: ctrl.signal,
        })
          .then((r) => (r.ok ? r.json() : null))
          .then((data) => {
            if (data) {
              setSuggestGroups(data.groups || []);
              setTotalHits(data.totalHits || 0);
            }
          })
          .catch(() => {})
          .finally(() => setIsLoading(false));
      }, 110);
      return () => {
        clearTimeout(timer);
        ctrl.abort();
      };
    } else {
      setSuggestGroups([]);
      setTotalHits(0);
      setIsLoading(false);
    }
  }, [query]);

  const handleSelectUrl = (url: string) => {
    setIsSearchOpen(false);
    setQuery('');
    router.push(url);
  };

  const executeSearch = (targetQuery?: string) => {
    const q = (targetQuery !== undefined ? targetQuery : query).trim();
    setIsSearchOpen(false);
    if (q) {
      const modeParam = isScientificQuestionLike(q) ? '&mode=ask' : '';
      router.push(`/search?q=${encodeURIComponent(q)}${modeParam}`);
    } else {
      router.push('/search');
    }
  };

  const hasResults = suggestGroups.length > 0;

  const suggestionChips = [
    { label: 'Hazard Intelligence', icon: AlertTriangle, route: '/hazard-intelligence' },
    { label: 'Biodiversity', icon: Activity, route: '/biodiversity' },
    { label: 'Water & Cryosphere', icon: Droplet, route: '/water-systems' },
    { label: 'Earth Systems', icon: Satellite, route: '/earth-human-impact' },
    { label: 'Sectoral EIA', icon: Book, route: '/sectoral-eia' },
    { label: 'Environmental PIL', icon: Scale, route: '/resources/environmental-pil' },
    { label: 'Green Heroes', icon: Users, route: '/resources/kew-green-heroes' },
  ];

  const exampleSearches = [
    {
      label: 'Wular Lake',
      type: 'Water & Cryosphere',
      route: '/water-systems/lakes/wular-lake',
      badge: 'Ramsar Site',
      detail: 'Floodplain hydrology, NWIA & encroachment',
    },
    {
      label: 'Western Disturbances',
      type: 'Atmospheric System',
      route: '/hazard-intelligence/atmospheric-systems/western-disturbances',
      badge: 'Synoptic NWP',
      detail: '500 hPa trough tracking & rain/snow phase',
    },
    {
      label: 'Hangul',
      type: 'Flagship Species',
      route: '/biodiversity/species/hangul-kashmir-stag',
      badge: 'IUCN CR',
      detail: 'Kashmir Stag (Cervus hanglu hanglu)',
    },
    {
      label: 'Environmental PIL',
      type: 'Judicial Tracker',
      route: '/resources/environmental-pil',
      badge: 'Accountability',
      detail: '40-year High Court & NGT compliance audit',
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Layer 1: Base Kashmir satellite-relief terrain - dark aerial environmental intelligence surface */}
      <div 
        className="absolute inset-0 hero-satellite-relief" 
        style={{
          backgroundImage: `url('/background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Layer 2: Eco intelligence overlay - topo + hydrology combined */}
      <div className="absolute inset-0 hero-kashmir-eco-overlay" />

      {/* Layer 3: Top atmospheric fade - subtle depth from top */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/40" />

      {/* Layer 4: Content protection gradient - left to right dark fade for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />

      {/* Layer 5: Bottom fade for smooth content transition */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />

      {/* Layer 6: Cursor spotlight effect - reveals background on hover */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 250px at ${cursorPos.x}px ${cursorPos.y}px, transparent 0%, rgba(2, 6, 23, 0.85) 100%)`,
        }}
      />

      {/* Layer 7: Minimal live monitoring nodes - 5 strategic locations */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: '24%', left: '62%' },  // Northern region
          { top: '36%', left: '71%' },  // Eastern region
          { top: '48%', left: '66%' },  // Central region
          { top: '58%', left: '78%' },  // Southern region
          { top: '67%', left: '59%' },  // Western region
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_18px_rgba(52,211,153,0.35)]"
            style={{
              top: pos.top,
              left: pos.left,
            }}
            initial={{ opacity: 0.45, scale: 1 }}
            animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.35, 1] }}
            transition={{
              duration: 3.2 + i * 0.35,
              repeat: Infinity,
              delay: i * 0.4,
              ease: [0.4, 0, 0.2, 1]
            }}
          />
        ))}
      </div> */}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 sm:py-24 md:py-28 lg:py-32">
        <div className="max-w-[96rem] mx-auto">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[4px] glass-light border border-white/10 mb-6 sm:mb-8"
          >
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500"></span>
            </span>
            <span className="text-[0.40rem] xs:text-[0.45rem] sm:text-xs md:text-[0.65rem] lg:text-xs font-medium text-slate-300 tracking-wide uppercase">
              Western Himalayan Environmental Command Center
            </span>
            <Radar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
          </motion.div>

          {/* Universal Brand Identity Lockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-3 sm:mb-4"
          >
            <KewBrandIdentity variant="eyebrow" />
          </motion.div>

          {/* Main title - Unified Branding */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight"
          >
            Kashmir{' '}
            <span className="gradient-text text-glow">EcoWatch</span>
          </motion.h1>

          {/* Positioning statement - Full institutional line */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-300 mb-3 sm:mb-4 max-w-2xl sm:max-w-3xl leading-relaxed text-balance"
          >
            <span className="text-emerald-400 font-semibold">Formerly ESRO (Est. 2004)</span> · Operated & Supported by Dr. Kumar Foundation USA & Kumar Trust USA — Western Himalayan Ecological Intelligence Platform
          </motion.p>

          {/* Product descriptor */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 mb-8 sm:mb-10 md:mb-12 max-w-2xl sm:max-w-3xl leading-relaxed text-balance"
          >
            A scientific, spatial, and real-time ecological intelligence system for biodiversity,
            water systems, hazard intelligence, environmental monitoring, seasonal phenology, and civil society impact across Kashmir & Ladakh.
          </motion.p>

          {/* Mobile 2-Tap Direct Field Telemetry (Priority 1 Mobile Accessibility) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="grid grid-cols-2 gap-2 my-5 md:hidden"
          >
            <button
              onClick={() => router.push('/environmental-monitoring/air-pollution')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-left active:scale-95 transition-all shadow-md"
              aria-label="Direct access to live AQI air pollution monitoring"
            >
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 flex-shrink-0">
                <Wind className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-slate-400 uppercase font-semibold block leading-tight">Air Quality</span>
                <span className="text-xs font-bold text-white truncate block">Live AQI Telemetry</span>
              </div>
            </button>

            <button
              onClick={() => router.push('/hazard-intelligence/earthquakes')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-red-500/30 text-left active:scale-95 transition-all shadow-md"
              aria-label="Direct access to seismic and earthquake intelligence"
            >
              <div className="p-1.5 rounded-lg bg-red-500/20 text-red-400 flex-shrink-0">
                <Activity className="w-4 h-4 animate-pulse" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-slate-400 uppercase font-semibold block leading-tight">Seismic Belt</span>
                <span className="text-xs font-bold text-white truncate block">EMSC Telemetry</span>
              </div>
            </button>

            <button
              onClick={() => router.push('/risk-monitoring/live-alerts-advisories')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-amber-500/30 text-left active:scale-95 transition-all shadow-md"
              aria-label="Direct access to multi-hazard alerts and advisories"
            >
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 flex-shrink-0">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-slate-400 uppercase font-semibold block leading-tight">Hazard Alerts</span>
                <span className="text-xs font-bold text-white truncate block">Active Advisories</span>
              </div>
            </button>

            <button
              onClick={() => router.push('/submit-observation')}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-left active:scale-95 transition-all shadow-md"
              aria-label="Direct access to submit citizen science field observation"
            >
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 flex-shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[9px] text-slate-400 uppercase font-semibold block leading-tight">Field Action</span>
                <span className="text-xs font-bold text-white truncate block">Deposit Observation</span>
              </div>
            </button>
          </motion.div>

          {/* Primary actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
          >
            <Button
              size="lg"
              icon={<Map className="w-4 h-4 sm:w-5 sm:h-5" />}
              className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-500 hover:to-forest-400 text-white shadow-2xl glow-forest px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
              onClick={() => router.push('/protected-network/atlas')}
            >
              <span className="relative z-10">Open Atlas</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-400 to-forest-300 opacity-0 group-hover:opacity-20 transition-opacity" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              icon={<Leaf className="w-4 h-4 sm:w-5 sm:h-5" />}
              className="w-full sm:w-auto border-white/20 text-white hover:border-forest-400 hover:text-forest-300 glass-light backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
              onClick={() => router.push('/module-directory')}
            >
              Explore Intelligence
            </Button>

            <Button
              size="lg"
              variant="outline"
              icon={<BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />}
              className="w-full sm:w-auto border-white/20 text-white hover:border-glacier-400 hover:text-glacier-300 glass-light backdrop-blur-xl px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
              onClick={() => router.push('/hazard-intelligence/dashboards')}
            >
              Live Dashboards
            </Button>
          </motion.div>

          {/* Intelligence Search Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 sm:mt-10 md:mt-12 lg:mt-14 max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl"
          >
            {/* Search input */}
            <div ref={searchContainerRef} className="relative">
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 p-2.5 sm:p-3.5 md:p-4 rounded-xl sm:rounded-2xl glass-intense border border-white/10 shadow-2xl backdrop-blur-xl focus-within:border-emerald-500/50 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-emerald-400 flex-shrink-0 ml-1" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIsSearchOpen(true);
                  }}
                  onFocus={() => setIsSearchOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      executeSearch();
                    } else if (e.key === 'Escape') {
                      setIsSearchOpen(false);
                    }
                  }}
                  placeholder="Search modules, species, water, glaciers, hazards, PILs, EIAs, Green Heroes..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-sm sm:text-base md:text-lg placeholder-slate-500 min-w-0"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      setIsSearchOpen(true);
                    }}
                    className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex-shrink-0"
                    title="Clear input"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => executeSearch()}
                  className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg sm:rounded-xl shadow-lg shadow-emerald-900/30 transition-all flex-shrink-0 cursor-pointer active:scale-95"
                  title="Search environmental intelligence"
                >
                  <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden xs:inline">Search</span>
                  <span className="hidden md:inline text-[10px] text-emerald-200/80 font-mono border-l border-emerald-400/40 pl-1.5 ml-0.5">↵</span>
                </button>
              </div>

              {/* Search results dropdown */}
              <AnimatePresence>
                {isSearchOpen && (query.length >= 2 || !query) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-2 sm:mt-3 rounded-xl sm:rounded-2xl glass-intense border border-white/10 shadow-2xl overflow-hidden z-50"
                  >
                    <div className="max-h-[400px] sm:max-h-[500px] overflow-y-auto">
                      {isLoading && (
                        <div className="p-12 text-center">
                          <div className="w-8 h-8 border-2 border-forest-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                          <p className="text-slate-400">Searching intelligence...</p>
                        </div>
                      )}

                      {!isLoading && !hasResults && query.length >= 2 && (
                        <div className="p-12 text-center">
                          <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                          <p className="text-slate-400">No results found for "{query}"</p>
                          <p className="text-sm text-slate-500 mt-2">Try different keywords or check spelling</p>
                        </div>
                      )}

                      {!isLoading && hasResults && (
                        <div className="p-4 space-y-4">
                          {suggestGroups.map((grp) => (
                            <div key={grp.groupKey}>
                              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 px-2 mb-1.5">
                                {grp.groupLabel}
                              </div>
                              <div className="space-y-1">
                                {grp.items.map((item) => (
                                  <button
                                    key={item.id}
                                    type="button"
                                    onClick={() => handleSelectUrl(item.canonicalUrl)}
                                    className="w-full flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-colors text-left group cursor-pointer"
                                  >
                                    <div className="min-w-0 flex-1">
                                      <div className="font-semibold text-white text-sm sm:text-base group-hover:text-emerald-300 transition-colors truncate">
                                        {item.title}
                                      </div>
                                      {item.subtitle && (
                                        <div className="text-xs text-slate-400 truncate">{item.subtitle}</div>
                                      )}
                                    </div>
                                    <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300 shrink-0">
                                      {item.trustBadge}
                                    </span>
                                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Empty state with suggestions */}
                      {!isLoading && !query && (
                        <div className="p-4 sm:p-6">
                          {/* Quick chips */}
                          <div className="mb-2">
                            <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2 sm:mb-2.5">
                              Intelligence Categories
                            </p>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5 sm:mb-6">
                              {suggestionChips.map((chip) => (
                                <button
                                  key={chip.label}
                                  onClick={() => {
                                    setIsSearchOpen(false);
                                    setQuery('');
                                    router.push(chip.route);
                                  }}
                                  className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[4px] glass-light border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-xs sm:text-sm text-slate-300 hover:text-white transition-all cursor-pointer group"
                                  title={`Explore ${chip.label}`}
                                >
                                  <chip.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
                                  <span>{chip.label}</span>
                                  <ArrowRight className="w-3 h-3 text-emerald-400/50 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all" />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Example searches */}
                          <div>
                            <div className="flex items-center justify-between mb-2 sm:mb-3">
                              <p className="text-[10px] sm:text-xs text-slate-400 uppercase tracking-wider font-semibold">
                                Verified Ecological Entities
                              </p>
                              <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                                <Sparkles className="w-3 h-3" />
                                Direct Exploration
                              </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                              {exampleSearches.map((example) => (
                                <button
                                  key={example.label}
                                  onClick={() => {
                                    setIsSearchOpen(false);
                                    setQuery('');
                                    router.push(example.route);
                                  }}
                                  className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-emerald-500/50 transition-all text-left group cursor-pointer"
                                  title={`View ${example.label} Profile`}
                                >
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2 mb-0.5">
                                      <span className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                                        {example.label}
                                      </span>
                                      <span className="text-[9px] sm:text-[10px] font-medium px-2 py-0.5 rounded-[4px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                        {example.type}
                                      </span>
                                    </div>
                                    <div className="text-[11px] text-slate-400 truncate">
                                      {example.detail}
                                    </div>
                                  </div>
                                  <div className="p-1.5 rounded-lg bg-white/5 group-hover:bg-emerald-500/20 text-slate-400 group-hover:text-emerald-300 transition-all flex-shrink-0 ml-2">
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Footer hint */}
                          <div className="mt-4 sm:mt-5 pt-3 sm:pt-3.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                            <button
                              type="button"
                              onClick={() => {
                                setIsSearchOpen(false);
                                router.push('/search?mode=ask');
                              }}
                              className="text-sky-400 hover:text-sky-300 font-semibold hover:underline cursor-pointer"
                            >
                              Ask Scientific Question (Cited Brief) &rarr;
                            </button>
                            <button
                              onClick={() => executeSearch()}
                              className="text-emerald-400 hover:text-emerald-300 font-medium hover:underline cursor-pointer"
                            >
                              Open Advanced Search &rarr;
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Results count & View All CTA */}
                    {!isLoading && hasResults && (
                      <div className="p-3 sm:p-4 border-t border-white/10 bg-white/[0.03] flex items-center justify-between gap-3">
                        <p className="text-xs text-slate-400">
                          <strong className="text-white">{totalHits.toLocaleString()}</strong> record{totalHits !== 1 ? 's' : ''} matched across KEW
                        </p>
                        <button
                          type="button"
                          onClick={() => executeSearch()}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                        >
                          <span>Explore all in Search</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Quick stats with live indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-12 sm:mt-16 md:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl"
          >
            {[
              { value: '2,847+', label: 'Species Indexed', icon: Leaf, trend: '+156' },
              { value: '47', label: 'Protected Areas', icon: Map, trend: '4,380 km²' },
              { value: '1,435+', label: 'Water Systems', icon: Activity, trend: 'Active' },
              { value: '240+', label: 'Monitoring Stations', icon: Satellite, trend: 'Online' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                className="glass-light rounded-xl p-3 sm:p-4 md:p-5 border border-white/10 hover:border-forest-500/30 transition-all duration-300 card-intelligence"
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" />
                  <span className="text-[10px] sm:text-xs text-emerald-400 font-mono">{stat.trend}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1 metric-live">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Source/Status credibility line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-8 max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-2 md:px-4 py-2 rounded-[4px] glass-light border border-white/10">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-[8px] md:text-xs text-slate-400">
                Source-integrated metrics updated across 24 specialized intelligence modules — synthesizing reference inventories, Copernicus/ECMWF satellite feeds, municipal audits, and field sensors
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-1 md:bottom-7 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-slate-500">Explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-gradient-to-b from-forest-400 to-glacier-400 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
