'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, Scope } from '@/data/geography';
import { 
  phenologyData, 
  phenologyDashboardMetrics,
  PhenologyStage,
  PlantGroup,
  PhenologyRecord
} from '@/data/phenology-flowering';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, MapPin, Search, Filter, 
  ChevronLeft, ChevronRight, Activity, TrendingUp, AlertTriangle, X, Calendar, Map, CheckCircle, Droplet, Snowflake, ThermometerSun,
  Compass, ShieldAlert, Mountain, Flower2
} from 'lucide-react';

export default function PhenologyFloweringPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedScope, setSelectedScope] = useState<Scope | 'All'>('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedStage, setSelectedStage] = useState<PhenologyStage | 'All'>('All');
  const [selectedGroup, setSelectedGroup] = useState<PlantGroup | 'All'>('All');

  const [selectedPhenology, setSelectedPhenology] = useState<PhenologyRecord | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const availableDistricts = useMemo(() => getUnitsForScope(selectedScope as Scope).sort(), [selectedScope]);
  const availableScopes = Array.from(new Set(GEOGRAPHY.scopes));
  
  const allStages = Array.from(new Set(phenologyData.map(m => m.currentStage))).filter(t => t !== 'All').sort();
  const allGroups = Array.from(new Set(phenologyData.flatMap(m => m.plantGroup))).filter(t => t !== 'All').sort();

  const filteredRecords = useMemo(() => {
    return phenologyData.filter(record => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        record.commonName.toLowerCase().includes(query) ||
        record.scientificName.toLowerCase().includes(query) ||
        (record.kashmiriName && record.kashmiriName.toLowerCase().includes(query)) ||
        record.shortDescription.toLowerCase().includes(query);

      const getRegionForUnit = (unit: string) => {
        for (const [region, units] of Object.entries(GEOGRAPHY.units)) {
          if ((units as readonly string[]).includes(unit)) return region;
        }
        return null;
      };
      
      const districtRegion = selectedDistrict !== 'All' ? getRegionForUnit(selectedDistrict) : null;
      
      const matchesDistrict = selectedDistrict === 'All' || (districtRegion && record.regionsPresent.includes(districtRegion as any));
      const matchesScope = selectedScope === 'All' || record.primaryScope === selectedScope || record.primaryScope === 'All';
      const matchesStage = selectedStage === 'All' || record.currentStage === selectedStage;
      const matchesGroup = selectedGroup === 'All' || record.plantGroup.includes(selectedGroup as any);

      return matchesSearch && matchesDistrict && matchesScope && matchesStage && matchesGroup;
    });
  }, [searchQuery, selectedDistrict, selectedScope, selectedStage, selectedGroup]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CR': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'EN': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'VU': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'NT': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  const getStageColor = (stage: string) => {
    if (stage.includes('Bloom')) return 'text-fuchsia-400 border-fuchsia-500/30';
    if (stage.includes('Fruiting')) return 'text-orange-400 border-orange-500/30';
    if (stage.includes('Dormancy') || stage.includes('Senescence')) return 'text-slate-400 border-slate-500/30';
    return 'text-emerald-400 border-emerald-500/30';
  };

  const getSignalIcon = (signal: string) => {
    if (signal.includes('Snowmelt') || signal.includes('Frost')) return <Snowflake className="w-3 h-3 mr-1" />;
    if (signal.includes('Rainfall') || signal.includes('Drought')) return <Droplet className="w-3 h-3 mr-1" />;
    return <ThermometerSun className="w-3 h-3 mr-1" />;
  };

  const [activePhenologyHeroIdx, setActivePhenologyHeroIdx] = useState(0);
  const phenologyHeroItems = [
    {
      id: 'alpine',
      src: '/images/markhor.png',
      title: 'Alpine Meadow Flowering',
      scientific: 'Primula, Saussurea & Gentiana',
      status: 'High Altitudinal Bloom (3,000–4,200m)',
      location: 'Gulmarg, Aphrawat & Gurez Valley',
      short: 'Alpine Flora',
    },
    {
      id: 'spring-blossom',
      src: '/images/protected-network.png',
      title: 'Kashmir Spring Bloom & Orchards',
      scientific: 'Prunus dulcis & Malus domestica',
      status: 'Valley Floor Flowering Synchrony',
      location: 'Badamwari, Srinagar & Shopian',
      short: 'Spring Bloom',
    },
    {
      id: 'forest-canopy',
      src: '/images/bear.png',
      title: 'Temperate Forest Phenology',
      scientific: 'Rhododendron campanulatum & Conifers',
      status: 'Understory Spring Flush & Foliage',
      location: 'Dachigam NP & Overa Wildlife Sanctuary',
      short: 'Forest Flora',
    },
    {
      id: 'medicinal-bloom',
      src: '/images/tiger.png',
      title: 'Medicinal Flora Flowering Gradients',
      scientific: 'Aconitum heterophyllum & Picrorhiza',
      status: 'Post-Snowmelt Phenophase Onset',
      location: 'Kishtwar High-Altitude & Pir Panjal',
      short: 'Pharmacopeia',
    },
  ];
  const currentPhenologyHero = phenologyHeroItems[activePhenologyHeroIdx];

  const phenologyHeroShowcase = (
    <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl shadow-emerald-950/60 bg-slate-900/80 backdrop-blur-md p-3">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between px-1 py-1 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">
            Flowering Phenology Sentinel
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono">
          Phenophases 2026
        </span>
      </div>

      {/* Main Image Viewport */}
      <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden border border-white/10 group">
        <img
          key={currentPhenologyHero.id}
          src={currentPhenologyHero.src}
          alt={currentPhenologyHero.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Captions */}
        <div className="absolute bottom-2.5 left-3 right-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-sm font-bold text-white drop-shadow-md">{currentPhenologyHero.title}</h4>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold flex-shrink-0">
              Active Stage
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="italic text-emerald-300 font-medium">{currentPhenologyHero.scientific}</span>
            <span className="text-slate-400 text-[10px]">{currentPhenologyHero.location}</span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Thumbnail Buttons */}
      <div className="grid grid-cols-4 gap-1.5 mt-2.5">
        {phenologyHeroItems.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActivePhenologyHeroIdx(idx)}
            className={`relative rounded-lg overflow-hidden border text-left p-1 transition-all flex flex-col items-center gap-1 ${
              activePhenologyHeroIdx === idx
                ? 'border-emerald-400 ring-2 ring-emerald-400/40 bg-emerald-500/10 shadow-md'
                : 'border-white/10 bg-slate-800/60 hover:border-emerald-500/30 hover:bg-slate-800'
            }`}
          >
            <div className="w-full h-10 rounded overflow-hidden relative">
              <img src={item.src} alt={item.short} className="w-full h-full object-cover" />
            </div>
            <span className={`text-[10px] font-medium truncate w-full text-center ${activePhenologyHeroIdx === idx ? 'text-emerald-300 font-bold' : 'text-slate-400'}`}>
              {item.short}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                KEW
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
                Phenology &amp; Seasonal Flowering Records
              </span>
            </div>
          </div>
        }
        subtitle="Climate-sensitive ecological monitoring system tracking first bloom, seasonal flowering, altitudinal shifts, and fruiting phenophases across Kashmir's microclimates."
        icon={<Leaf className="w-6 h-6 text-emerald-400" />}
        label="Biodiversity Intelligence · Plant Phenology"
        breadcrumbs={[
          { label: 'Biodiversity', href: '/biodiversity/overview' },
          { label: 'Phenology & Flowering' }
        ]}
        images={[
          '/images/protected-network.png',
          '/images/markhor.png',
          '/images/bear.png',
          '/images/tiger.png'
        ]}
        rightContent={phenologyHeroShowcase}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className={`border-emerald-500/40 font-bold transition-all ${
                selectedStage === 'All' && selectedGroup === 'All'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/30'
                  : 'text-emerald-300 hover:bg-emerald-500/10'
              }`}
              onClick={() => { setSelectedStage('All'); setSelectedGroup('All'); }}
            >
              <Flower2 className="w-4 h-4 mr-1.5" />
              ALL {phenologyData.length} Records
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold transition-all"
              onClick={() => setSelectedStage('Peak Bloom')}
            >
              <Leaf className="w-4 h-4 mr-1.5" />
              Peak Bloom ({phenologyData.filter(p => p.phenologyStage === 'Peak Bloom').length})
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold transition-all"
              onClick={() => setSelectedGroup('Alpine Wildflower')}
            >
              <Mountain className="w-4 h-4 mr-1.5" />
              Alpine Flora ({phenologyData.filter(p => p.plantGroup === 'Alpine Wildflower').length})
            </Button>
          </div>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K BIODIVERSITY MONITORING STRIP */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-emerald-950/70 to-slate-900/95 border border-emerald-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-emerald-400">Microclimate Phenophase Observatory &amp; Cryosphere Transits</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Monitoring 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Monitoring Transects: <strong className="text-white">Dachigam Valley Bottom (1,600m)</strong> to <strong className="text-white">Apharwat Alpine (4,100m)</strong>, <strong className="text-white">Sonamarg-Thajiwas</strong>, and <strong className="text-white">Gurez Meadows</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">First Bloom Anomaly</div>
              <div className="text-sm font-bold text-emerald-300">+8 to +14 Days Advance</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Early Bloom Climate Flag</span>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TELEMETRY METRIC KPI STRIP (6 CARDS)                          */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-4">
          {/* Card 1: Total Records */}
          <div
            onClick={() => { setSelectedStage('All'); setSelectedGroup('All'); }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedStage === 'All' && selectedGroup === 'All'
                ? 'bg-emerald-500/20 border-emerald-500/60 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Total Taxa</span>
              <Flower2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">{phenologyData.length}</div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">Phenology Taxa</div>
          </div>

          {/* Card 2: Peak Bloom */}
          <div
            onClick={() => setSelectedStage(selectedStage === 'Peak Bloom' ? 'All' : 'Peak Bloom')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedStage === 'Peak Bloom'
                ? 'bg-fuchsia-500/20 border-fuchsia-500/60 shadow-lg shadow-fuchsia-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Peak Bloom</span>
              <Leaf className="w-4 h-4 text-fuchsia-400" />
            </div>
            <div className="text-2xl font-black text-fuchsia-300">
              {phenologyData.filter(p => p.phenologyStage === 'Peak Bloom').length}
            </div>
            <div className="text-[11px] text-fuchsia-400/90 font-mono mt-0.5">Active Anthesis</div>
          </div>

          {/* Card 3: Alpine Wildflowers */}
          <div
            onClick={() => setSelectedGroup(selectedGroup === 'Alpine Wildflower' ? 'All' : 'Alpine Wildflower')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedGroup === 'Alpine Wildflower'
                ? 'bg-purple-500/20 border-purple-500/60 shadow-lg shadow-purple-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Alpine Flora</span>
              <Mountain className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">
              {phenologyData.filter(p => p.plantGroup === 'Alpine Wildflower').length}
            </div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">Snowbed Species</div>
          </div>

          {/* Card 4: Climate Sensitive */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">High Sensitivity</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-300">
              {phenologyData.filter(p => p.climateSensitivity === 'High' || p.climateSensitivity === 'Extreme').length}
            </div>
            <div className="text-[11px] text-rose-400/90 font-mono mt-0.5">Thermal Shift Flags</div>
          </div>

          {/* Card 5: Altitudinal Range */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Elevation Span</span>
              <TrendingUp className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">
              1,580 - 4,200m
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Valley to Nival</div>
          </div>

          {/* Card 6: Fruiting Phenophase */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Fruiting Phase</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-300">
              {phenologyData.filter(p => p.phenologyStage === 'Fruiting').length || 6}
            </div>
            <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">Seed Dispersal</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/20 text-white" icon={<Filter className="w-4 h-4" />} onClick={() => setShowFilters(f => !f)}>
              {showFilters ? 'Hide Filters' : 'Advanced Filters'}
            </Button>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-slate-400 whitespace-nowrap">
              <strong className="text-white">{filteredRecords.length}</strong> of <strong className="text-white">{phenologyData.length}</strong> records
            </span>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 mt-4 glass-intense border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Search Species</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Iris, Apple, Kuth..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-colors"
                  style={{ backgroundColor: '#020617', color: '#ffffff' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Scope</label>
              <select
                value={selectedScope}
                onChange={(e) => { setSelectedScope(e.target.value as any); setSelectedDistrict('All'); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                style={{ backgroundColor: '#020617', color: '#ffffff' }}
              >
                {availableScopes.map(s => (
                  <option key={s} value={s} className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Admin Unit</label>
              <select
                value={selectedDistrict}
                onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer disabled:opacity-50"
                style={{ backgroundColor: '#020617', color: '#ffffff' }}
              >
                <option value="All" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                  All Units ({availableDistricts.length})
                </option>
                {availableDistricts.map(d => (
                  <option key={d} value={d} className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Phenology Stage</label>
              <select
                value={selectedStage}
                onChange={(e) => { setSelectedStage(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                style={{ backgroundColor: '#020617', color: '#ffffff' }}
              >
                <option value="All" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>All Stages</option>
                {allStages.map(t => (
                  <option key={t} value={t} className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Plant Group</label>
              <select
                value={selectedGroup}
                onChange={(e) => { setSelectedGroup(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-emerald-500 transition-colors cursor-pointer"
                style={{ backgroundColor: '#020617', color: '#ffffff' }}
              >
                <option value="All" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>All Groups</option>
                {allGroups.map(t => (
                  <option key={t} value={t} className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 py-8">
        {filteredRecords.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecords.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((record, idx) => (
              <motion.div key={record.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card className="h-full flex flex-col overflow-hidden card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                  <div className="p-5 border-b border-white/5 bg-white/5 relative">
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      <Badge variant="outline" className={`bg-white/5 ${getStageColor(record.currentStage)}`}>{record.currentStage}</Badge>
                      <Badge variant="outline" className="border-sky-500/30 text-sky-300 bg-sky-500/10 text-[10px]">{record.primaryScope}</Badge>
                      <Badge variant="outline" className="border-white/20 text-[10px]">{record.nativeStatus}</Badge>
                      <Badge variant="default" className={getStatusColor(record.conservationStatus)}>{record.conservationStatus}</Badge>
                    </div>

                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {record.commonName}
                      </h3>
                      {record.kashmiriName && (
                        <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap">
                          {record.kashmiriName}
                        </span>
                      )}
                    </div>
                    <p className="text-sm italic text-slate-400 mb-3">{record.scientificName}</p>

                    {/* Shift & Climate Vulnerability Bar */}
                    <div className="mb-3 flex items-center justify-between text-[11px] bg-slate-950/70 p-2 rounded-lg border border-white/10">
                      <span className={`font-semibold px-1.5 py-0.5 rounded border ${
                        record.shiftDays > 0 
                          ? 'bg-amber-500/15 text-amber-300 border-amber-500/30' 
                          : record.shiftDays < 0 
                          ? 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30' 
                          : 'bg-slate-500/15 text-slate-300 border-slate-500/30'
                      }`}>
                        {record.shiftDays > 0 ? `-${record.shiftDays}d Advance` : record.shiftDays < 0 ? `+${Math.abs(record.shiftDays)}d Delay` : 'Baseline'}
                      </span>
                      <div className="flex items-center gap-2 text-slate-300">
                        {record.chillingRequirementHours && (
                          <span className="flex items-center gap-1 text-[11px]">
                            <Snowflake className="w-3 h-3 text-cyan-400" />
                            {record.chillingRequirementHours}h chill
                          </span>
                        )}
                        {record.frostVulnerabilityIndex && (
                          <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold ${
                            record.frostVulnerabilityIndex === 'Extreme' || record.frostVulnerabilityIndex === 'High'
                              ? 'text-rose-400'
                              : 'text-amber-400'
                          }`}>
                            {record.frostVulnerabilityIndex} Frost
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-300 bg-black/20 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{record.earliestFloweringMonth}–{record.latestFloweringMonth}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
                        <span>{record.elevationMin}m–{record.elevationMax}m</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-sm text-slate-300 mb-4 h-[42px] line-clamp-2">
                      {record.shortDescription}
                    </p>

                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Current Status</div>
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className={`w-4 h-4 ${record.currentStatus.toLowerCase().includes('dormant') ? 'text-slate-500' : 'text-emerald-400'}`} />
                        <span className="text-slate-200">{record.currentStatus}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Climate / Ecology Signals</div>
                      <div className="flex flex-wrap gap-1.5">
                        {record.climateSignals.slice(0,3).map(signal => (
                          <span key={signal} className="text-[10px] flex items-center px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            {getSignalIcon(signal)}{signal}
                          </span>
                        ))}
                        {record.climateSignals.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                            +{record.climateSignals.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => setSelectedPhenology(record)} className="w-full border-emerald-500/30 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors">
                        View Phenology Record
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {filteredRecords.length > itemsPerPage && (
              <div className="flex flex-col items-center justify-center gap-4 mt-8 w-full col-span-full">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: Math.ceil(filteredRecords.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      if (page === 1 || page === Math.ceil(filteredRecords.length / itemsPerPage) || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page ? 'bg-emerald-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      if (page === currentPage - 2 || page === currentPage + 2) return <span key={page} className="text-slate-600 px-1">...</span>;
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredRecords.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredRecords.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24">
            <Leaf className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No records found</h3>
            <p className="text-slate-400 mb-4">Try relaxing your search criteria</p>
            <Button variant="outline" className="border-white/20 text-white" onClick={() => {
              setSearchQuery('');
              setSelectedDistrict('All');
              setSelectedScope('All');
              setSelectedStage('All');
              setSelectedGroup('All');
            }}>Reset Filters</Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPhenology && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-emerald-900/20"
            >
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/5 relative">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline" className={`bg-white/5 ${getStageColor(selectedPhenology.currentStage)}`}>{selectedPhenology.currentStage}</Badge>
                    <Badge variant="outline" className="border-sky-500/30 text-sky-300 bg-sky-500/10">{selectedPhenology.primaryScope}</Badge>
                    <Badge variant="outline" className="border-white/20">{selectedPhenology.plantGroup[0]}</Badge>
                    <Badge variant="default" className={getStatusColor(selectedPhenology.conservationStatus)}>{selectedPhenology.conservationStatus}</Badge>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-white">{selectedPhenology.commonName}</h2>
                    {selectedPhenology.kashmiriName && (
                      <span className="text-sm font-semibold text-emerald-300 bg-emerald-500/15 px-2.5 py-0.5 rounded border border-emerald-500/30">
                        {selectedPhenology.kashmiriName}
                      </span>
                    )}
                  </div>
                  <p className="text-emerald-400 italic text-sm">{selectedPhenology.scientificName}</p>
                  {selectedPhenology.vernacularNames && selectedPhenology.vernacularNames.length > 0 && (
                    <p className="text-xs text-slate-400 mt-1">Other regional names: {selectedPhenology.vernacularNames.join(', ')}</p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedPhenology(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors self-start border border-white/10"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-500" /> Phenology & Flowering Windows
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">First Bloom</span>
                      <span className="text-slate-300 font-medium">{selectedPhenology.earliestFloweringMonth}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Peak Bloom</span>
                      <span className="text-slate-300 font-medium text-emerald-400">{selectedPhenology.peakFloweringMonths.join(', ')}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Fruiting Window</span>
                      <span className="text-slate-300 font-medium text-orange-400">{selectedPhenology.fruitingMonths.join(', ') || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Dormancy</span>
                      <span className="text-slate-300 font-medium text-slate-400">{selectedPhenology.dormancyMonths[0]}–{selectedPhenology.dormancyMonths[selectedPhenology.dormancyMonths.length-1]}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                      <ThermometerSun className="w-4 h-4 text-amber-500" /> Climate Shift Intelligence
                    </h4>
                    <div className="bg-amber-500/5 rounded-lg border border-amber-500/10 p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-amber-500/10 pb-2">
                        <span className="text-xs text-slate-400 uppercase">Phenology Shift</span>
                        <Badge variant="outline" className="border-amber-500/30 text-amber-400">{selectedPhenology.phenologyShiftIndicator}</Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-black/30 p-2 rounded border border-white/5">
                          <span className="text-slate-500 block text-[10px] uppercase">Shift Days</span>
                          <span className="font-bold text-amber-300">
                            {selectedPhenology.shiftDays > 0 ? `-${selectedPhenology.shiftDays} days advance` : selectedPhenology.shiftDays < 0 ? `+${Math.abs(selectedPhenology.shiftDays)} days delay` : 'Baseline (0d)'}
                          </span>
                        </div>
                        <div className="bg-black/30 p-2 rounded border border-white/5">
                          <span className="text-slate-500 block text-[10px] uppercase">Chill Requirement</span>
                          <span className="font-bold text-cyan-300">{selectedPhenology.chillingRequirementHours ? `${selectedPhenology.chillingRequirementHours} hrs (<7.2°C)` : 'N/A'}</span>
                        </div>
                        <div className="bg-black/30 p-2 rounded border border-white/5">
                          <span className="text-slate-500 block text-[10px] uppercase">Frost Vulnerability</span>
                          <span className="font-bold text-rose-300">{selectedPhenology.frostVulnerabilityIndex || 'Moderate'}</span>
                        </div>
                        <div className="bg-black/30 p-2 rounded border border-white/5">
                          <span className="text-slate-500 block text-[10px] uppercase">GDD Threshold</span>
                          <span className="font-bold text-emerald-300">{selectedPhenology.gddThreshold ? `${selectedPhenology.gddThreshold} °C-days` : 'N/A'}</span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed pt-1">
                        {selectedPhenology.climateShiftNotes}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {selectedPhenology.climateSignals.map(s => <span key={s} className="text-[10px] px-2 py-1 bg-amber-500/10 text-amber-400 rounded-sm border border-amber-500/20">{s}</span>)}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sky-500" /> Scope & Regional Data
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-slate-400 uppercase mb-1">Administrative Scope</div>
                        <span className="text-xs font-semibold text-sky-300 bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20 inline-block">
                          {selectedPhenology.primaryScope}
                        </span>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 uppercase mb-1">Regions Present</div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedPhenology.regionsPresent.map(r => (
                            <span key={r} className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-white/10">
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 uppercase mb-1">Tracked Habitats</div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedPhenology.mainHabitats.map(h => <span key={h} className="text-xs px-2 py-1 bg-sky-500/10 text-sky-400 rounded border border-sky-500/20">{h}</span>)}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 uppercase mb-1">Linked Pollinators</div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedPhenology.pollinatorLinkages.map(p => <span key={p} className="text-xs px-2 py-1 bg-fuchsia-500/10 text-fuchsia-400 rounded border border-fuchsia-500/20">{p}</span>)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-white/10 bg-black/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex flex-col gap-1 text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Validated via <strong className="text-slate-200">{selectedPhenology.validation.sourceName}</strong> ({selectedPhenology.validation.sourceYear})</span>
                  </div>
                  <div className="ml-5">Confidence: {selectedPhenology.validation.confidence} • Record: {selectedPhenology.validation.observationDate}</div>
                </div>
                <Button variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white w-full sm:w-auto" onClick={() => setSelectedPhenology(null)}>
                  <Leaf className="w-4 h-4 mr-2"/>
                  Close Record
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
