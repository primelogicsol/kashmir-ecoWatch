'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
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

  const sectionRef = useRef<HTMLElement>(null);
  const spotlightLayerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const pointerClientRef = useRef<{ x: number; y: number } | null>(null);
  const isPointerInsideRef = useRef(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const scheduleSpotlightUpdate = useCallback(() => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = window.requestAnimationFrame(() => {
      rafIdRef.current = null;
      const sectionEl = sectionRef.current;
      const spotEl = spotlightLayerRef.current;
      const pt = pointerClientRef.current;
      if (!sectionEl || !spotEl || !pt) return;
      const rect = sectionEl.getBoundingClientRect();
      const relX = pt.x - rect.left;
      const relY = pt.y - rect.top;
      spotEl.style.setProperty('--kew-spot-x', `${relX.toFixed(1)}px`);
      spotEl.style.setProperty('--kew-spot-y', `${relY.toFixed(1)}px`);
    });
  }, []);

  useEffect(() => {
    const syncOnScrollOrResize = () => {
      if (isPointerInsideRef.current && pointerClientRef.current) {
        scheduleSpotlightUpdate();
      }
    };

    window.addEventListener('scroll', syncOnScrollOrResize, { passive: true });
    window.addEventListener('resize', syncOnScrollOrResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', syncOnScrollOrResize);
      window.removeEventListener('resize', syncOnScrollOrResize);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [scheduleSpotlightUpdate]);

  const handleSectionPointerEnter = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType === 'touch') return;
      isPointerInsideRef.current = true;
      pointerClientRef.current = { x: e.clientX, y: e.clientY };
      scheduleSpotlightUpdate();
      if (spotlightLayerRef.current) {
        spotlightLayerRef.current.style.opacity = '1';
      }
    },
    [scheduleSpotlightUpdate]
  );

  const handleSectionPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType === 'touch') return;
      isPointerInsideRef.current = true;
      pointerClientRef.current = { x: e.clientX, y: e.clientY };
      scheduleSpotlightUpdate();
      if (spotlightLayerRef.current && spotlightLayerRef.current.style.opacity !== '1') {
        spotlightLayerRef.current.style.opacity = '1';
      }
    },
    [scheduleSpotlightUpdate]
  );

  const handleSectionPointerLeave = useCallback((e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType === 'touch') return;
    isPointerInsideRef.current = false;
    if (spotlightLayerRef.current) {
      spotlightLayerRef.current.style.opacity = '0';
    }
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
    <section
      ref={sectionRef}
      data-kew-dark-surface="true"
      onPointerEnter={handleSectionPointerEnter}
      onPointerMove={handleSectionPointerMove}
      onPointerLeave={handleSectionPointerLeave}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 text-slate-100"
    >
      {/* Continuous Section 01 Geospatial Background Surface (immediately below Cinematic Hero through EXPLORE indicator) */}
      <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none select-none">
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

        {/* Layer 5: Bottom boundary fade below EXPLORE indicator */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent" />

        {/* Layer 6: Default resting veil — preserves exact resting background appearance outside spotlight & when pointer leaves */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: 'rgba(2, 6, 23, 0.85)',
          }}
        />

        {/* Layer 6b: Cursor-reactive 250px localized illumination (+10% relative hover terrain visibility, ~300ms transition) */}
        <div
          ref={spotlightLayerRef}
          data-kew-spotlight-layer="true"
          className="absolute inset-0 will-change-[opacity]"
          style={{
            opacity: 0,
            transition: 'opacity 300ms ease',
            ['--kew-spot-x' as string]: '50%',
            ['--kew-spot-y' as string]: '50%',
            WebkitMaskImage:
              'radial-gradient(circle 250px at var(--kew-spot-x) var(--kew-spot-y), rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
            maskImage:
              'radial-gradient(circle 250px at var(--kew-spot-x) var(--kew-spot-y), rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)',
          }}
        >
          <div
            className="absolute inset-0 hero-satellite-relief"
            style={{
              backgroundImage: `url('/background.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
          <div className="absolute inset-0 hero-kashmir-eco-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-transparent to-slate-950/35" />
          {/* Calibrated +10% relative terrain visibility inside 250px spotlight (40% -> 44% on right; continuous subtle relief across Section 01) */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/76 via-slate-950/66 to-[#020617]/[0.56]" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/75 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto py-16 sm:py-20 md:py-24 lg:py-28 3xl:py-32">
        <div className="w-full">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-[4px] glass-light border border-white/10 mb-5 sm:mb-7"
          >
            <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500"></span>
            </span>
            <span className="text-[11px] sm:text-xs 3xl:text-sm font-semibold text-slate-200 tracking-wider uppercase">
              WESTERN HIMALAYAN ENVIRONMENTAL COMMAND CENTER
            </span>
            <Radar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
          </motion.div>

          {/* Universal Brand Identity & Institutional Attribution Width-Locked Stack */}
          <div className="flex flex-col items-stretch w-fit max-w-full mb-1.5 sm:mb-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-fit max-w-full mb-2.5 sm:mb-3"
            >
              <KewBrandIdentity variant="eyebrow" />
            </motion.div>

            {/* Institutional Attribution Supertitle — Spans exact left-to-right width of KEW + Western Himalayan */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              data-kew-attribution-supertitle="true"
              className="w-full m-0 font-extrabold uppercase text-emerald-400 leading-none"
              style={{
                fontSize: 'calc(var(--kew-brand-font-size) * 1.12)',
              }}
            >
              <span className="sr-only">DR. KUMAR&apos;S</span>
              <span
                aria-hidden="true"
                className="flex w-full items-baseline justify-between select-none whitespace-nowrap"
                style={{
                  paddingRight: 'var(--kew-brand-letter-spacing)',
                }}
              >
                {Array.from("DR. KUMAR'S").map((ch, idx) => (
                  <span
                    key={idx}
                    className={ch === ' ' ? 'inline-block w-[0.18em]' : 'inline-block'}
                    style={{ letterSpacing: 0 }}
                  >
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                ))}
              </span>
            </motion.p>
          </div>

          {/* Main title - Unified Branding */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl 4xl:text-[5.5rem] font-black text-white mb-2 sm:mb-3 leading-[1.08] tracking-tight"
          >
            Kashmir{' '}
            <span className="gradient-text text-glow">EcoWatch</span>
          </motion.h1>

          {/* Institutional Designation */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl 3xl:text-[1.65rem] font-semibold tracking-wide text-slate-100 mb-1.5 sm:mb-2 max-w-[72ch]"
          >
            Global Institute for Advanced Environmental Studies
          </motion.p>

          {/* Observatory Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl 3xl:text-2xl font-bold tracking-wide text-emerald-400 mb-3.5 sm:mb-4 max-w-[72ch]"
          >
            Integrated Environmental Intelligence &amp; Earth Systems Observatory
          </motion.p>

          {/* Positioning statement - Full institutional line */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xs sm:text-sm md:text-base lg:text-lg 3xl:text-[1.15rem] text-slate-300 mb-3 sm:mb-4 max-w-[74ch] leading-relaxed text-pretty"
          >
            <span className="text-emerald-400 font-semibold">Dr. Kumar&apos;s Kashmir EcoWatch</span>, formerly the Environment and Service Research Organization (ESRO, established 2004), is a multidisciplinary environmental institute dedicated to scientific research, environmental intelligence, advanced education, ecological conservation and public engagement, operated and supported by Dr. Kumar Foundation USA and Kumar Trust USA.
          </motion.p>

          {/* Product descriptor */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xs sm:text-sm md:text-base lg:text-lg 3xl:text-[1.15rem] text-slate-400 mb-7 sm:mb-9 md:mb-10 max-w-[74ch] leading-relaxed text-pretty"
          >
            Integrating Earth observation, remote sensing, geospatial analytics, Earth systems science, ecosystem science, climate intelligence, hydrological modelling, biodiversity informatics and environmental risk assessment to advance scientific understanding, evidence-based governance, ecological resilience and sustainable stewardship across the Western Himalayas.
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
            className="mt-8 sm:mt-10 md:mt-12 max-w-full sm:max-w-3xl lg:max-w-5xl 3xl:max-w-6xl"
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
            className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 3xl:gap-6 w-full"
          >
            {[
              { value: '2,847+', label: 'Species Indexed', icon: Leaf, trend: '+156' },
              { value: '182', label: 'Protected & Bird Areas', icon: Map, trend: '47 Core J&K' },
              { value: '1,435+', label: 'Water Systems', icon: Activity, trend: 'Active' },
              { value: '240+', label: 'Monitoring Stations', icon: Satellite, trend: 'Online' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                className="glass-light rounded-xl p-3.5 sm:p-4 md:p-5 3xl:p-6 border border-white/10 hover:border-forest-500/30 transition-all duration-300 card-intelligence"
              >
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400/80" />
                  <span className="text-[10px] sm:text-xs text-emerald-400 font-mono">{stat.trend}</span>
                </div>
                <div className="text-2xl sm:text-3xl 3xl:text-4xl font-bold text-white mb-1 metric-live tabular-nums">
                  {stat.value}
                </div>
                <div className="text-[11px] sm:text-xs 3xl:text-sm text-slate-400 uppercase tracking-wider font-medium">
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
            className="mt-6 sm:mt-8 w-full"
          >
            <div className="inline-flex items-center gap-3 px-3 sm:px-4 py-2.5 rounded-[4px] glass-light border border-white/10 max-w-full">
              <Database className="w-4 h-4 text-blue-400 shrink-0" />
              <span className="text-[11px] sm:text-xs 3xl:text-sm text-slate-300 leading-relaxed">
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
        className="absolute z-10 bottom-1 md:bottom-7 left-1/2 -translate-x-1/2"
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
    </section>
  );
}
