'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Map, TrendingUp, ArrowRight, Search, Activity, Filter, Grid3X3, List, Shield , ChevronLeft, ChevronRight, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCorridors } from '@/data/protected-network';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, getScopeForUnit, Scope } from '@/data/geography';

export default function CorridorsPage() {
  const corridors = getCorridors.all();

  const [activeTab, setActiveTab] = useState<'core' | 'trans' | 'extended'>('core');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedEcologicalScope, setSelectedEcologicalScope] = useState<Scope | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const availableDistricts = useMemo(() => getUnitsForScope(selectedEcologicalScope).sort(), [selectedEcologicalScope]);
  const availableScopes = [...GEOGRAPHY.scopes];
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const districtsList = useMemo(() => {
    const districts = new Set<string>();
    corridors.forEach(c => {
      if (c.districts) {
        c.districts.forEach(d => districts.add(d));
      }
    });
    return Array.from(districts).sort();
  }, [corridors]);

  const scopesList = ['Kashmir Core', 'Trans-Divisional', 'Transboundary / Extended'];
  const coreCount = useMemo(() => corridors.filter(c => c.scope === 'Kashmir Core').length, [corridors]);
  const transCount = useMemo(() => corridors.filter(c => c.scope === 'Trans-Divisional').length, [corridors]);
  const extendedCount = useMemo(() => corridors.filter(c => c.scope === 'Transboundary / Extended').length, [corridors]);

  const TABS = [
    { key: 'core', label: 'Kashmir Core', description: `Valley core protected areas, wetland networks, and high-density zones — ${coreCount} corridors` },
    { key: 'trans', label: 'Trans-Divisional', description: `Jammu, Pir Panjal, Kishtwar, and Ladakh sectors — ${transCount} corridors` },
    { key: 'extended', label: 'Transboundary / Extended', description: `Extended Himalayan and Karakoram zones, Neelum, AJK, and Gilgit — ${extendedCount} corridors` },
  ] as const;

  const filteredCorridors = useMemo(() => {
    return corridors.filter(corridor => {
      

      // 2. Search Text
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        corridor.name.toLowerCase().includes(query) ||
        corridor.type.toLowerCase().includes(query) ||
        corridor.description.toLowerCase().includes(query);

      // 3. District Dropdown
      const matchesDistrict = selectedDistrict === 'All' || ((corridor as any).district === selectedDistrict || ((corridor as any).districts && (corridor as any).districts.includes(selectedDistrict)));

      const corridorScope = (corridor as any).scope || getScopeForUnit((corridor as any).district || ((corridor as any).districts && (corridor as any).districts[0]));
      const matchesScope = selectedEcologicalScope === 'All' || corridorScope === selectedEcologicalScope || corridorScope === 'All';

      return matchesSearch && matchesDistrict && matchesScope;
    });
  }, [corridors, searchQuery, selectedDistrict, selectedEcologicalScope]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      default: return 'default';
    }
  };

  const getCorridorImage = (c: any) => {
    const name = c.name.toLowerCase();
    if (name.includes('markhor') || name.includes('cliff') || name.includes('pir panjal')) return '/images/markhor.png';
    if (name.includes('snow leopard') || name.includes('tahr') || name.includes('chenab')) return '/images/tiger.png';
    if (name.includes('bear') || name.includes('hangul') || name.includes('gurez')) return '/images/bear.png';
    return '/images/protected-network.png';
  };


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Degraded': return 'warning';
      case 'Threatened': return 'danger';
      default: return 'default';
    }
  };

    const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  const showcaseItems = [
    { id: '1', title: 'Dachigam–Tral Axis', subtitle: 'Prime Hangul Movement Corridor', location: 'Pulwama / Srinagar · 42 km', tag: 'Critical Corridor', src: '/images/bear.png' },
    { id: '2', title: 'Kazinag–Limber Passage', subtitle: 'Pir Panjal Markhor Linkage', location: 'Baramulla · 28 km', tag: 'Caprinae Link', src: '/images/markhor.png' },
    { id: '3', title: 'Hemis–Zanskar Corridor', subtitle: 'High-Altitude Snow Leopard Highway', location: 'Ladakh · 185 km', tag: 'Apex Cat Link', src: '/images/tiger.png' },
    { id: '4', title: 'Kishtwar–Overa Alpine Path', subtitle: 'Subalpine & Forest Contiguity', location: 'Kishtwar / Anantnag · 65 km', tag: 'Landscape Matrix', src: '/images/protected-network.png' },
  ];
  const currentHero = showcaseItems[activeHeroIdx] || showcaseItems[0];

  const heroShowcaseCard = (
    <div className="relative rounded-2xl overflow-hidden border border-teal-500/40 shadow-2xl shadow-teal-950/60 bg-slate-900/80 backdrop-blur-md p-3">
      <div className="flex items-center justify-between px-1 py-1 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
          </span>
          <span className="font-bold text-teal-300 uppercase tracking-wider text-[11px]">
            Landscape Connectivity Sentinel
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30 text-[10px] font-mono font-semibold">
          Corridor Active 2026
        </span>
      </div>

      <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden border border-white/10 group">
        <img
          key={currentHero.id}
          src={currentHero.src}
          alt={currentHero.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
        <div className="absolute bottom-2.5 left-3 right-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-sm font-bold text-white drop-shadow-md">{currentHero.title}</h4>
            <span className="px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-semibold flex-shrink-0">
              {currentHero.tag}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="italic text-teal-300 font-medium">{currentHero.subtitle}</span>
            <span className="text-slate-400 text-[10px]">{currentHero.location}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 mt-2.5">
        {showcaseItems.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveHeroIdx(idx)}
            className={`relative rounded-lg overflow-hidden border text-left p-1 transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeHeroIdx === idx
                ? 'border-teal-400 ring-2 ring-teal-400/40 bg-teal-500/10 shadow-md'
                : 'border-white/10 bg-slate-800/60 hover:border-teal-500/30 hover:bg-slate-800'
            }`}
          >
            <div className="h-10 w-full rounded overflow-hidden relative">
              <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <span className="text-[9px] font-bold text-slate-300 truncate w-full text-center">
              {item.title.split(' ')[0]}
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
                Corridors &amp; Ecological Connectivity
              </span>
            </div>
          </div>
        }
        subtitle="Landscape connectivity and habitat linkage analysis across Kashmir's protected area network. Identifies wildlife corridors, fragmentation zones, ecological bottlenecks, and movement pathways for conservation planning and spatial management."
        icon={<Map className="w-6 h-6 text-emerald-400" />}
        label="Ecological Intelligence"
        breadcrumbs={[{ label: 'Corridors & Connectivity' }]}
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        rightContent={heroShowcaseCard}
        actions={
          <>
            <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" className="bg-gradient-to-r from-teal-600 to-emerald-500 font-bold transition-all shadow-md shadow-teal-500/20" icon={<Search className="w-4 h-4" />}>
              Search Corridors
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold transition-all" icon={<Map className="w-4 h-4" />}>
              Connectivity Map
            </Button>
          </div>
          </>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K CONNECTIVITY SENTINEL         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 relative z-20 mt-4 mb-4">
        <div className="bg-gradient-to-r from-slate-900/95 via-teal-950/70 to-slate-900/95 border border-teal-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-teal-500/10 rounded-xl border border-teal-500/20 text-teal-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-teal-400">Trans-Himalayan Wildlife Linkages &amp; Corridors</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Monitoring 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Monitoring critical movement pathways including <strong className="text-white">Dachigam–Tral Hangul Axis</strong>, <strong className="text-white">Pir Panjal Markhor Passages</strong>, and <strong className="text-white">Great Himalayan Snow Leopard Corridors</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Total Corridor Length</div>
              <div className="text-sm font-bold text-teal-300">~1,420 km Mapped</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-bold">
              {corridors.length} Verified Linkages
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6-CARD INTERACTIVE KPI STRIP                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-6 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1: Total Corridors */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Total Corridors</span>
              <Map className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300">
              {corridors.length}
            </div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">Identified Linkages</div>
          </div>

          {/* Card 2: Critical Priority */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400">Critical Priority</span>
              <TrendingUp className="w-4 h-4 text-red-400" />
            </div>
            <div className="text-2xl font-black text-red-300">
              {corridors.filter(c => c.priority === 'Critical').length}
            </div>
            <div className="text-[11px] text-red-400/90 font-mono mt-0.5">Immediate Action Req.</div>
          </div>

          {/* Card 3: Active Status */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Active Corridors</span>
              <Activity className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-300">
              {corridors.filter(c => c.status === 'Active').length}
            </div>
            <div className="text-[11px] text-teal-400/90 font-mono mt-0.5">Functional Movement</div>
          </div>

          {/* Card 4: Threatened Corridors */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Threatened</span>
              <Shield className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">
              {corridors.filter(c => c.status === 'Threatened' || c.status === 'Degraded').length}
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">High Encroachment</div>
          </div>

          {/* Card 5: Core Scope */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Kashmir Core</span>
              <Map className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-300">
              {coreCount}
            </div>
            <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">Valley Ecosystems</div>
          </div>

          {/* Card 6: Trans & Extended */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Transboundary</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">
              {transCount + extendedCount}
            </div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">Regional Linkages</div>
          </div>
        </div>
      </div>

      {/* Tab + Filters — single row */}
      <div className="container mx-auto px-6 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 glass-intense border border-white/10 rounded-xl">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active tab description */}
          <span className="text-xs text-slate-500 hidden lg:block flex-1 px-4 truncate">
            {TABS.find(t => t.key === activeTab)!.description}
          </span>

          {/* Filters + count + view mode toggle */}
          <div className="flex items-center gap-3 ml-auto">
            <Button variant="outline" className="border-white/20 text-white" icon={<Filter className="w-4 h-4" />} onClick={() => setShowFilters(f => !f)}>
              {showFilters ? 'Hide Filters' : 'Filters'}
            </Button>
            <span className="text-sm text-slate-400 whitespace-nowrap">
              <strong className="text-white">{filteredCorridors.length}</strong> of <strong className="text-white">{corridors.length}</strong> corridors
            </span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'} icon={<Grid3X3 className="w-4 h-4" />} />
              <Button variant="ghost" size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'} icon={<List className="w-4 h-4" />} />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 space-y-6">
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 glass-intense border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Search Text</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search corridor name, type..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors disabled:opacity-50"
              >
                <option value="All">All Units in {selectedEcologicalScope}</option>
                {availableDistricts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ecological Scope</label>
              <select
                value={selectedEcologicalScope}
                onChange={(e) => { setSelectedEcologicalScope(e.target.value as Scope | 'All'); setSelectedDistrict('All'); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 transition-colors"
              >
                {availableScopes.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}

        {/* Corridors Grid/List */}
        {filteredCorridors.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredCorridors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((corridor, index) => (
              <motion.a
                key={corridor.id}
                href={`/protected-network/corridors-and-connectivity/${corridor.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${viewMode === 'grid' ? 'h-full' : ''} block group`}
              >
                <Card 
                  className={`${viewMode === 'grid' ? 'h-full flex flex-col justify-between' : ''} card-intelligence border border-white/5 bg-slate-900/50 hover:border-emerald-500/20 transition-all duration-300`} 
                  padding="lg"
                >
                  {viewMode === 'grid' ? (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant={getPriorityColor(corridor.priority)} size="sm">
                            {corridor.priority} Priority
                          </Badge>
                          <Badge variant={getStatusColor(corridor.status)} size="sm">
                            {corridor.status}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{corridor.name}</h3>
                        <p className="text-xs text-slate-400 mt-2 mb-3 line-clamp-2 leading-relaxed">{corridor.description}</p>
                        <div className="flex items-center gap-6 text-xs text-slate-500">
                          <span>Type: <strong className="text-slate-400">{corridor.type}</strong></span>
                          <span>Length: <strong className="text-slate-400">{corridor.length}</strong></span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white">
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant={getPriorityColor(corridor.priority)} size="sm">
                            {corridor.priority} Priority
                          </Badge>
                          <Badge variant={getStatusColor(corridor.status)} size="sm">
                            {corridor.status}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{corridor.name}</h3>
                        <p className="text-xs text-slate-400 mt-2 mb-3 line-clamp-2 leading-relaxed">{corridor.description}</p>
                        <div className="flex items-center gap-6 text-xs text-slate-500">
                          <span>Type: <strong className="text-slate-400">{corridor.type}</strong></span>
                          <span>Length: <strong className="text-slate-400">{corridor.length}</strong></span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-emerald-500 group-hover:text-emerald-400 transition-colors ml-4 flex-shrink-0" icon={<ArrowRight className="w-4 h-4" />} />
                    </div>
                  )}
                </Card>
              </motion.a>
            ))}

            {filteredCorridors.length > itemsPerPage && (
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
                    {Array.from({ length: Math.ceil(filteredCorridors.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(filteredCorridors.length / itemsPerPage);
                      
                      if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-emerald-500 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="text-slate-600 px-1">...</span>;
                      }
                      
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredCorridors.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredCorridors.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCorridors.length)} of {filteredCorridors.length} records
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24">
            <Shield className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No corridors found</h3>
            <p className="text-slate-400 mb-4">Try adjusting your filters</p>
            <Button
              variant="outline"
              className="border-white/20 text-white"
              onClick={() => {
                setSearchQuery('');
                setSelectedDistrict('All');
                setSelectedEcologicalScope('All');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

    </main>
  );
}
