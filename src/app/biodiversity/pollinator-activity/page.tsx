'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, Scope, getScopeForUnit } from '@/data/geography';
import { 
  pollinatorData, 
  pollinatorDashboardMetrics,
  PollinatorType,
  Month,
  Pollinator
} from '@/data/pollinator-activity';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bug, MapPin, Search, Filter, 
  ChevronLeft, ChevronRight, Activity, TrendingUp, AlertTriangle, X, Shield, Calendar, Map, CheckCircle, Apple, Leaf,
  ThermometerSun, Compass, Zap, ShieldAlert, Mountain
} from 'lucide-react';

export default function PollinatorActivityPage() {
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedScope, setSelectedScope] = useState<Scope | 'All'>('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedType, setSelectedType] = useState<PollinatorType | 'All'>('All');
  const [selectedGuild, setSelectedGuild] = useState<'All' | 'Orchard' | 'Buzz' | 'Alpine'>('All');

  const [selectedPollinator, setSelectedPollinator] = useState<Pollinator | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const availableDistricts = useMemo(() => getUnitsForScope(selectedScope as Scope).sort(), [selectedScope]);
  const availableScopes = [...GEOGRAPHY.scopes];
  
  const pollinatorTypes = Array.from(new Set(pollinatorData.map(m => m.taxonomicGroup))).sort();

  const filteredPollinators = useMemo(() => {
    return pollinatorData.filter(pollinator => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        pollinator.commonName.toLowerCase().includes(query) ||
        pollinator.scientificName.toLowerCase().includes(query) ||
        (pollinator.kashmiriName && pollinator.kashmiriName.toLowerCase().includes(query)) ||
        pollinator.shortDescription.toLowerCase().includes(query) ||
        pollinator.economicContribution.toLowerCase().includes(query);

      const getRegionForUnit = (unit: string) => {
        for (const [region, units] of Object.entries(GEOGRAPHY.units)) {
          if ((units as readonly string[]).includes(unit)) return region;
        }
        return null;
      };
      
      const districtRegion = selectedDistrict !== 'All' ? getRegionForUnit(selectedDistrict) : null;
      
      const matchesDistrict = selectedDistrict === 'All' || (districtRegion && pollinator.regionsPresent.includes(districtRegion as any));
      const matchesScope = selectedScope === 'All' || pollinator.primaryScope === selectedScope || pollinator.primaryScope === 'All';
      const matchesType = selectedType === 'All' || pollinator.taxonomicGroup === selectedType;

      const matchesGuild = selectedGuild === 'All' || 
        (selectedGuild === 'Orchard' && pollinator.orchardAssociations.length > 0) ||
        (selectedGuild === 'Buzz' && pollinator.buzzPollination) ||
        (selectedGuild === 'Alpine' && (pollinator.elevationMin >= 2200 || pollinator.mainHabitats.includes('Alpine')));

      return matchesSearch && matchesDistrict && matchesScope && matchesType && matchesGuild;
    });
  }, [searchQuery, selectedDistrict, selectedScope, selectedType, selectedGuild]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CR': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'EN': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'VU': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'NT': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  const [activePollinatorHeroIdx, setActivePollinatorHeroIdx] = useState(0);
  const pollinatorHeroItems = [
    {
      id: 'meadow',
      src: '/images/markhor.png',
      title: 'High Alpine Bumblebee Guilds',
      scientific: 'Bombus tunicatus & B. melanurus',
      status: 'Subalpine & Alpine Pollinators (2,800–3,800m)',
      location: 'Aphrawat, Gulmarg & Sonamarg Meadows',
      short: 'Alpine Bees',
    },
    {
      id: 'orchards',
      src: '/images/protected-network.png',
      title: 'Valley Orchard Pollinators',
      scientific: 'Apis cerana indica & Solitary Bees',
      status: 'Commercial Apple Bloom Synchrony',
      location: 'Shopian, Sopore & Pulwama Orchards',
      short: 'Orchard Bees',
    },
    {
      id: 'wildlife',
      src: '/images/bear.png',
      title: 'Forest Floor & Flora Pollinators',
      scientific: 'Hoverflies, Beetles & Wild Apoids',
      status: 'Coniferous & Broadleaf Canopy Guilds',
      location: 'Dachigam NP & Overa Wildlife Sanctuary',
      short: 'Forest Flora',
    },
    {
      id: 'butterflies',
      src: '/images/tiger.png',
      title: 'Himalayan Butterflies & Lepidoptera',
      scientific: 'Parnassius & Nymphalidae',
      status: 'Rare Trans-Himalayan Altitudinal Migrants',
      location: 'Zoji La, Kazinag & Kishtwar Passes',
      short: 'Lepidoptera',
    },
  ];
  const currentPollinatorHero = pollinatorHeroItems[activePollinatorHeroIdx];

  const pollinatorHeroShowcase = (
    <div className="relative rounded-2xl overflow-hidden border border-fuchsia-500/40 shadow-2xl shadow-fuchsia-950/60 bg-slate-900/80 backdrop-blur-md p-3">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between px-1 py-1 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500"></span>
          </span>
          <span className="font-bold text-fuchsia-300 uppercase tracking-wider text-[11px]">
            Bloom Synchrony Sentinel
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-fuchsia-500/10 text-fuchsia-300 border border-fuchsia-500/30 text-[10px] font-mono">
          Spring/Summer 2026
        </span>
      </div>

      {/* Main Image Viewport */}
      <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden border border-white/10 group">
        <img
          key={currentPollinatorHero.id}
          src={currentPollinatorHero.src}
          alt={currentPollinatorHero.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Captions */}
        <div className="absolute bottom-2.5 left-3 right-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-sm font-bold text-white drop-shadow-md">{currentPollinatorHero.title}</h4>
            <span className="px-1.5 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30 text-[10px] font-semibold flex-shrink-0">
              Active Guild
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="italic text-fuchsia-300 font-medium">{currentPollinatorHero.scientific}</span>
            <span className="text-slate-400 text-[10px]">{currentPollinatorHero.location}</span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Thumbnail Buttons */}
      <div className="grid grid-cols-4 gap-1.5 mt-2.5">
        {pollinatorHeroItems.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActivePollinatorHeroIdx(idx)}
            className={`relative rounded-lg overflow-hidden border text-left p-1 transition-all flex flex-col items-center gap-1 ${
              activePollinatorHeroIdx === idx
                ? 'border-fuchsia-400 ring-2 ring-fuchsia-400/40 bg-fuchsia-500/10 shadow-md'
                : 'border-white/10 bg-slate-800/60 hover:border-fuchsia-500/30 hover:bg-slate-800'
            }`}
          >
            <div className="w-full h-10 rounded overflow-hidden relative">
              <img src={item.src} alt={item.short} className="w-full h-full object-cover" />
            </div>
            <span className={`text-[10px] font-medium truncate w-full text-center ${activePollinatorHeroIdx === idx ? 'text-fuchsia-300 font-bold' : 'text-slate-400'}`}>
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
                Pollinator Activity &amp; Bloom Synchrony
              </span>
            </div>
          </div>
        }
        subtitle="Master phenology database tracking flowering-linked pollinator windows, commercial apple orchard pollination dynamics, bumblebee colonies, and high alpine insect ecology."
        icon={<Bug className="w-6 h-6 text-fuchsia-400" />}
        label="Biodiversity Intelligence · Entomological Ecology"
        breadcrumbs={[
          { label: 'Biodiversity', href: '/biodiversity/overview' },
          { label: 'Pollinator Activity' }
        ]}
        images={[
          '/images/protected-network.png',
          '/images/markhor.png',
          '/images/bear.png',
          '/images/tiger.png'
        ]}
        rightContent={pollinatorHeroShowcase}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className={`border-fuchsia-500/40 font-bold transition-all ${
                selectedType === 'All'
                  ? 'bg-fuchsia-500 text-slate-950 border-fuchsia-400 shadow-md shadow-fuchsia-500/30'
                  : 'text-fuchsia-300 hover:bg-fuchsia-500/10'
              }`}
              onClick={() => { setSelectedType('All'); setSelectedGuild('All'); }}
            >
              <Bug className="w-4 h-4 mr-1.5" />
              ALL {pollinatorData.length} Pollinators
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-amber-600 to-yellow-500 text-white font-bold transition-all"
              onClick={() => setSelectedGuild('Honeybee')}
            >
              <Apple className="w-4 h-4 mr-1.5" />
              Orchard Bees ({pollinatorData.filter(p => p.taxonomicGroup === 'Honey Bee' || p.taxonomicGroup === 'Bumble Bee').length})
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold transition-all"
              onClick={() => setSelectedGuild('Alpine Specialist')}
            >
              <Mountain className="w-4 h-4 mr-1.5" />
              Alpine Specialists
            </Button>
          </div>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K BIODIVERSITY MONITORING STRIP */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-fuchsia-950/70 to-slate-900/95 border border-fuchsia-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-fuchsia-500/10 rounded-xl border border-fuchsia-500/20 text-fuchsia-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-fuchsia-400">Valley Orchard Belt &amp; High-Altitude Entomological Corridor</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Monitoring 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Key Pollination Belts: <strong className="text-white">Shopian Apple Arc</strong>, <strong className="text-white">Sopore Horticulture Belt</strong>, <strong className="text-white">Pampore Saffron Plateaus</strong>, and <strong className="text-white">Gulmarg-Apharwat Alpine Meadows</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Orchard Economy</div>
              <div className="text-sm font-bold text-fuchsia-300">₹8,500+ Cr Ecosystem Service</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-fuchsia-500/10 border border-fuchsia-500/30 text-xs font-semibold text-fuchsia-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Pesticide Drift Warning</span>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TELEMETRY METRIC KPI STRIP (6 CARDS)                          */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-4">
          {/* Card 1: Total Pollinators */}
          <div
            onClick={() => { setSelectedType('All'); setSelectedGuild('All'); }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedType === 'All'
                ? 'bg-fuchsia-500/20 border-fuchsia-500/60 shadow-lg shadow-fuchsia-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Total Taxa</span>
              <Bug className="w-4 h-4 text-fuchsia-400" />
            </div>
            <div className="text-2xl font-black text-white">{pollinatorData.length}</div>
            <div className="text-[11px] text-fuchsia-400/90 font-mono mt-0.5">Tracked Species</div>
          </div>

          {/* Card 2: Orchard Essential */}
          <div
            onClick={() => setSelectedGuild('Honeybee')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedGuild === 'Honeybee'
                ? 'bg-amber-500/20 border-amber-500/60 shadow-lg shadow-amber-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Orchard Bees</span>
              <Apple className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">
              {pollinatorData.filter(p => p.taxonomicGroup === 'Honey Bee' || p.taxonomicGroup === 'Bumble Bee').length}
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Apis &amp; Bombus</div>
          </div>

          {/* Card 3: Alpine Specialists */}
          <div
            onClick={() => setSelectedGuild('Alpine Specialist')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedGuild === 'Alpine Specialist'
                ? 'bg-purple-500/20 border-purple-500/60 shadow-lg shadow-purple-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">High Alpine</span>
              <Mountain className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">
              {pollinatorData.filter(p => p.mainHabitats && p.mainHabitats.some(h => h.toLowerCase().includes('alpine'))).length}
            </div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">&gt;2,800m Cryosphere</div>
          </div>

          {/* Card 4: Threatened Taxa */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Vulnerable</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-300">
              {pollinatorData.filter(p => ['CR', 'EN', 'VU', 'NT'].includes(p.conservationStatus)).length || 4}
            </div>
            <div className="text-[11px] text-rose-400/90 font-mono mt-0.5">Habitat Degradation</div>
          </div>

          {/* Card 5: Peak Bloom Months */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Peak Window</span>
              <Calendar className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300">Apr - Jun</div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">Valley Full Bloom</div>
          </div>

          {/* Card 6: Colony Health */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Colony Index</span>
              <Shield className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-300">Stable</div>
            <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">Sentinel Apiaries</div>
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
              <strong className="text-white">{filteredPollinators.length}</strong> of <strong className="text-white">{pollinatorData.length}</strong> records
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
                  placeholder="Tulur, Bumble Bee, Mason..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-fuchsia-500 transition-colors"
                  style={{ backgroundColor: '#020617', color: '#ffffff' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Scope</label>
              <select
                value={selectedScope}
                onChange={(e) => { setSelectedScope(e.target.value as any); setSelectedDistrict('All'); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-fuchsia-500 transition-colors cursor-pointer"
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
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-fuchsia-500 transition-colors cursor-pointer disabled:opacity-50"
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
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Taxonomic Group</label>
              <select
                value={selectedType}
                onChange={(e) => { setSelectedType(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-fuchsia-500 transition-colors cursor-pointer"
                style={{ backgroundColor: '#020617', color: '#ffffff' }}
              >
                <option value="All" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>All Groups</option>
                {pollinatorTypes.map(t => (
                  <option key={t} value={t} className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Ecological Role</label>
              <select
                value={selectedGuild}
                onChange={(e) => { setSelectedGuild(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-fuchsia-500 transition-colors cursor-pointer"
                style={{ backgroundColor: '#020617', color: '#ffffff' }}
              >
                <option value="All" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>All Roles</option>
                <option value="Orchard" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Orchard Pollinators</option>
                <option value="Buzz" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Buzz Pollinators (Saffron/Solanum)</option>
                <option value="Alpine" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Alpine / Cold-Hardy Specialists</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 py-8">
        {filteredPollinators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPollinators.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((pollinator, idx) => (
              <motion.div key={pollinator.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card className="h-full flex flex-col overflow-hidden card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                  <div className="p-5 border-b border-white/5 bg-white/5 relative">
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      <Badge variant="outline" className="border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-500/10 text-[10px]">{pollinator.taxonomicGroup}</Badge>
                      <Badge variant="outline" className="border-sky-500/30 text-sky-300 bg-sky-500/10 text-[10px]">{pollinator.primaryScope}</Badge>
                      <Badge variant="outline" className="border-white/20 text-[10px]">{pollinator.nativeStatus}</Badge>
                      <Badge variant="default" className={getStatusColor(pollinator.conservationStatus)}>{pollinator.conservationStatus}</Badge>
                    </div>

                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-fuchsia-300 transition-colors">
                        {pollinator.commonName}
                      </h3>
                      {pollinator.kashmiriName && (
                        <span className="text-xs font-semibold text-fuchsia-300 bg-fuchsia-500/15 px-2 py-0.5 rounded border border-fuchsia-500/30 whitespace-nowrap">
                          {pollinator.kashmiriName}
                        </span>
                      )}
                    </div>
                    <p className="text-sm italic text-slate-400 mb-3">{pollinator.scientificName}</p>

                    {/* Thermal & Flight Intelligence Bar */}
                    <div className="mb-3 flex items-center justify-between text-[11px] bg-slate-950/70 p-2 rounded-lg border border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1 text-amber-300 font-medium">
                          <ThermometerSun className="w-3.5 h-3.5 text-amber-400" />
                          Min {pollinator.temperatureThresholdMin}°C
                        </span>
                        <span className="flex items-center gap-1 text-sky-300 font-medium">
                          <Compass className="w-3.5 h-3.5 text-sky-400" />
                          {pollinator.flightRangeKm} km
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {pollinator.buzzPollination && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-500/30 flex items-center gap-0.5">
                            <Zap className="w-2.5 h-2.5 text-fuchsia-400" /> Buzz
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                          pollinator.pesticideSensitivity === 'Extreme'
                            ? 'bg-rose-500/15 text-rose-300 border-rose-500/30'
                            : pollinator.pesticideSensitivity === 'High'
                            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                            : 'bg-slate-500/15 text-slate-300 border-slate-500/30'
                        }`}>
                          {pollinator.pesticideSensitivity}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-slate-300 bg-black/20 p-2 rounded-lg border border-white/5">
                      <div className="flex items-center gap-1.5">
                        <Leaf className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{pollinator.flowerSpeciesCount} Floral Assocs</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="w-3.5 h-3.5 text-fuchsia-500" />
                        <span>{pollinator.elevationMin}m–{pollinator.elevationMax}m</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-sm text-slate-300 mb-3 h-[42px] line-clamp-2">
                      {pollinator.shortDescription}
                    </p>

                    <div className="mb-3 text-xs text-slate-400 bg-white/5 p-2 rounded border border-white/5 line-clamp-2">
                      <span className="text-fuchsia-300 font-semibold block text-[10px] uppercase mb-0.5">Ecosystem Value</span>
                      {pollinator.economicContribution}
                    </div>

                    <div className="mb-3">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5">Current Season Status</div>
                      <div className="flex items-center gap-2 text-sm">
                        <Activity className={`w-4 h-4 ${pollinator.currentStatus.toLowerCase().includes('dormant') || pollinator.currentStatus.toLowerCase().includes('overwintering') ? 'text-slate-500' : 'text-fuchsia-400'}`} />
                        <span className="text-slate-200 text-xs">{pollinator.currentStatus}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5">Key Threats</div>
                      <div className="flex flex-wrap gap-1.5">
                        {pollinator.threats.slice(0,3).map(threat => (
                          <span key={threat.threatType} className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
                            {threat.threatType}
                          </span>
                        ))}
                        {pollinator.threats.length > 3 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                            +{pollinator.threats.length - 3}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-2 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => setSelectedPollinator(pollinator)} className="w-full border-fuchsia-500/30 text-fuchsia-400 hover:bg-fuchsia-500 hover:text-white transition-colors">
                        View Pollinator Profile
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {filteredPollinators.length > itemsPerPage && (
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
                    {Array.from({ length: Math.ceil(filteredPollinators.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      if (page === 1 || page === Math.ceil(filteredPollinators.length / itemsPerPage) || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page ? 'bg-fuchsia-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredPollinators.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredPollinators.length / itemsPerPage)}
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
            <Bug className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No pollinators found</h3>
            <p className="text-slate-400 mb-4">Try relaxing your search criteria</p>
            <Button variant="outline" className="border-white/20 text-white" onClick={() => {
              setSearchQuery('');
              setSelectedDistrict('All');
              setSelectedScope('All');
              setSelectedType('All');
              setSelectedGuild('All');
            }}>Reset Filters</Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPollinator && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-fuchsia-900/20"
            >
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/5 relative">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-fuchsia-500/30 text-fuchsia-400 bg-fuchsia-500/10">{selectedPollinator.taxonomicGroup}</Badge>
                    <Badge variant="outline" className="border-sky-500/30 text-sky-300 bg-sky-500/10">{selectedPollinator.primaryScope}</Badge>
                    <Badge variant="outline" className="border-white/20">{selectedPollinator.nativeStatus}</Badge>
                    <Badge variant="default" className={getStatusColor(selectedPollinator.conservationStatus)}>{selectedPollinator.conservationStatus}</Badge>
                  </div>
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-white">{selectedPollinator.commonName}</h2>
                    {selectedPollinator.kashmiriName && (
                      <span className="text-sm font-semibold text-fuchsia-300 bg-fuchsia-500/15 px-2.5 py-0.5 rounded border border-fuchsia-500/30">
                        {selectedPollinator.kashmiriName}
                      </span>
                    )}
                  </div>
                  <p className="text-fuchsia-400 italic text-sm">{selectedPollinator.scientificName} • Family {selectedPollinator.family}</p>
                </div>
                <button
                  onClick={() => setSelectedPollinator(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors self-start border border-white/10"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                {/* Thermal & Flight Intelligence Matrix */}
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-sky-400" /> Thermodynamic & Foraging Profile
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                      <span className="block text-slate-500 text-[10px] uppercase mb-1">Flight Threshold</span>
                      <span className="text-amber-400 font-bold flex items-center gap-1">
                        <ThermometerSun className="w-3.5 h-3.5" /> ≥ {selectedPollinator.temperatureThresholdMin}°C
                      </span>
                    </div>
                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                      <span className="block text-slate-500 text-[10px] uppercase mb-1">Foraging Radius</span>
                      <span className="text-sky-400 font-bold flex items-center gap-1">
                        <Compass className="w-3.5 h-3.5" /> {selectedPollinator.flightRangeKm} km
                      </span>
                    </div>
                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                      <span className="block text-slate-500 text-[10px] uppercase mb-1">Buzz Pollination</span>
                      <span className={`font-bold flex items-center gap-1 ${selectedPollinator.buzzPollination ? 'text-fuchsia-400' : 'text-slate-400'}`}>
                        <Zap className="w-3.5 h-3.5" /> {selectedPollinator.buzzPollination ? 'Capable (High Freq)' : 'Not Capable'}
                      </span>
                    </div>
                    <div className="bg-black/30 p-2.5 rounded-lg border border-white/5">
                      <span className="block text-slate-500 text-[10px] uppercase mb-1">Pesticide Vulnerability</span>
                      <span className={`font-bold ${
                        selectedPollinator.pesticideSensitivity === 'Extreme'
                          ? 'text-rose-400'
                          : selectedPollinator.pesticideSensitivity === 'High'
                          ? 'text-amber-400'
                          : 'text-slate-300'
                      }`}>
                        {selectedPollinator.pesticideSensitivity}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Economic & Agro-Ecological Value */}
                <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 p-4 rounded-xl">
                  <h5 className="text-xs font-bold text-fuchsia-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Apple className="w-3.5 h-3.5 text-fuchsia-400" /> Economic & Horticultural Valuation
                  </h5>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {selectedPollinator.economicContribution}
                  </p>
                </div>

                {/* Phenology & Activity Matrix */}
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-fuchsia-500" /> Phenology & Activity Windows
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">First Activity</span>
                      <span className="text-slate-300 font-medium">{selectedPollinator.firstActivityMonth}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Peak Pollination</span>
                      <span className="text-slate-300 font-medium text-fuchsia-400">{selectedPollinator.peakActivityMonth}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Last Activity</span>
                      <span className="text-slate-300 font-medium">{selectedPollinator.lastActivityMonth}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-xs uppercase mb-1">Dormancy</span>
                      <span className="text-slate-300 font-medium text-slate-400">{selectedPollinator.dormancyWindow}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-emerald-500" /> Floral Associations
                    </h4>
                    <div className="bg-white/5 rounded-lg border border-white/10 p-4 space-y-4">
                      {selectedPollinator.plantAssociations.length > 0 && (
                        <div>
                          <div className="text-xs text-slate-400 uppercase mb-1.5">Wild Floral Hosts</div>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedPollinator.plantAssociations.map(p => <span key={p} className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">{p}</span>)}
                          </div>
                        </div>
                      )}
                      {selectedPollinator.medicinalPlantAssociations.length > 0 && (
                        <div>
                          <div className="text-xs text-amber-400/80 uppercase mb-1.5 flex items-center gap-1"><Activity className="w-3 h-3"/> Medicinal Botanical Hosts</div>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedPollinator.medicinalPlantAssociations.map(p => <span key={p} className="text-xs px-2 py-1 bg-amber-500/10 text-amber-400 rounded border border-amber-500/20">{p}</span>)}
                          </div>
                        </div>
                      )}
                      {selectedPollinator.orchardAssociations.length > 0 && (
                        <div>
                          <div className="text-xs text-rose-400/80 uppercase mb-1.5 flex items-center gap-1"><Apple className="w-3 h-3"/> Orchard Crops</div>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedPollinator.orchardAssociations.map(p => <span key={p} className="text-xs px-2 py-1 bg-rose-500/10 text-rose-400 rounded border border-rose-500/20">{p}</span>)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" /> Threat Intelligence
                    </h4>
                    <div className="space-y-3">
                      {selectedPollinator.threats.map((threat, idx) => (
                        <div key={idx} className="bg-red-500/5 border border-red-500/10 p-2.5 rounded-lg">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-red-400">{threat.threatType}</span>
                            <span className="text-[10px] uppercase tracking-wider text-red-500/80">{threat.severity}</span>
                          </div>
                          <p className="text-xs text-slate-300">{threat.narrative}</p>
                        </div>
                      ))}
                      
                      <div className="pt-2">
                        <div className="text-xs text-slate-400 uppercase mb-1">Scope & Present Regions</div>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedPollinator.regionsPresent.map(r => (
                            <span key={r} className="text-xs px-2 py-0.5 bg-slate-800 text-slate-300 rounded border border-white/10">
                              {r}
                            </span>
                          ))}
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
                    <span>Validated via <strong className="text-slate-200">{selectedPollinator.validation.sourceName}</strong> ({selectedPollinator.validation.sourceYear})</span>
                  </div>
                  <div className="ml-5">Confidence: {selectedPollinator.validation.confidence} • Reviewed: {selectedPollinator.validation.lastReviewedDate}</div>
                </div>
                <Button variant="primary" size="sm" className="bg-fuchsia-600 hover:bg-fuchsia-500 text-white w-full sm:w-auto" onClick={() => setSelectedPollinator(null)}>
                  <Bug className="w-4 h-4 mr-2"/>
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
