'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, Scope, getScopeForUnit } from '@/data/geography';
import { birdingHotspotsData, birdingHotspotsMetrics } from '@/data/birding-hotspots';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Activity, Shield, Map, Search, Eye, Filter, 
  Grid3X3, List, ChevronLeft, ChevronRight, TrendingUp,
  Wind, X, AlertTriangle, Users, Compass, ShieldAlert, Bird, Mountain
} from 'lucide-react';
import { BirdingHotspot } from '@/data/birding-hotspots';

export default function BirdingHotspotsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedScope, setSelectedScope] = useState<Scope | 'All'>('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedHotspotType, setSelectedHotspotType] = useState('All');
  const [selectedDesignation, setSelectedDesignation] = useState('All');

  const [selectedHotspot, setSelectedHotspot] = useState<BirdingHotspot | null>(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const availableDistricts = useMemo(() => getUnitsForScope(selectedScope as Scope).sort(), [selectedScope]);
  const availableScopes = [...GEOGRAPHY.scopes];
  
  const hotspotTypes = useMemo(() => {
    return Array.from(new Set(birdingHotspotsData.map(h => h.hotspotType))).sort();
  }, []);

  const filteredHotspots = useMemo(() => {
    return birdingHotspotsData.filter(hotspot => {
      // 1. Search Query
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        hotspot.name.toLowerCase().includes(query) ||
        (hotspot.kashmiriName && hotspot.kashmiriName.toLowerCase().includes(query)) ||
        (hotspot.alternateName && hotspot.alternateName.toLowerCase().includes(query)) ||
        hotspot.administrativeUnit.toLowerCase().includes(query) ||
        hotspot.keySpecies.some(s => s.toLowerCase().includes(query)) ||
        hotspot.threatenedSpecies.some(s => s.toLowerCase().includes(query)) ||
        hotspot.shortDescription.toLowerCase().includes(query);

      // 2. Geographic Filters
      const matchesDistrict = selectedDistrict === 'All' || hotspot.administrativeUnit === selectedDistrict;
      const matchesScope = selectedScope === 'All' || hotspot.scope === selectedScope || hotspot.scope === 'All';

      // 3. Hotspot Type
      const matchesType = selectedHotspotType === 'All' || hotspot.hotspotType === selectedHotspotType;

      // 4. Conservation Designation
      const matchesDesignation = selectedDesignation === 'All' || hotspot.conservationStatus.includes(selectedDesignation as any);

      return matchesSearch && matchesDistrict && matchesScope && matchesType && matchesDesignation;
    });
  }, [searchQuery, selectedDistrict, selectedScope, selectedHotspotType, selectedDesignation]);

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
                Birding Hotspots &amp; Observation Havens
              </span>
            </div>
          </div>
        }
        subtitle="A scientifically validated directory of the region's most important habitats for birding, conservation monitoring, and citizen science across the Kashmir Eco Watch geography."
        icon={<Wind className="w-6 h-6 text-sky-400" />}
        label="Biodiversity Intelligence · Avian Hotspots"
        breadcrumbs={[
          { label: 'Biodiversity', href: '/biodiversity/overview' },
          { label: 'Birding Hotspots' }
        ]}
        images={['/images/protected-network.png', '/images/bear.png']}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className={`border-sky-500/40 font-bold transition-all ${
                selectedHotspotType === 'All' && selectedDesignation === 'All'
                  ? 'bg-sky-500 text-slate-950 border-sky-400 shadow-md shadow-sky-500/30'
                  : 'text-sky-300 hover:bg-sky-500/10'
              }`}
              onClick={() => { setSelectedHotspotType('All'); setSelectedDesignation('All'); }}
            >
              <Bird className="w-4 h-4 mr-1.5" />
              ALL {birdingHotspotsData.length} Hotspots
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold transition-all"
              onClick={() => setSelectedDesignation('Ramsar Site')}
            >
              <Shield className="w-4 h-4 mr-1.5" />
              Ramsar Wetlands ({birdingHotspotsData.filter(h => h.conservationStatus.includes('Ramsar Site')).length})
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold transition-all"
              onClick={() => setSelectedDesignation('Important Bird Area (IBA)')}
            >
              <MapPin className="w-4 h-4 mr-1.5" />
              IBA Sites ({birdingHotspotsData.filter(h => h.conservationStatus.includes('Important Bird Area (IBA)')).length})
            </Button>
          </div>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K BIODIVERSITY MONITORING STRIP */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-sky-950/70 to-slate-900/95 border border-sky-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20 text-sky-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-sky-400">Central Asian Flyway Observation &amp; Avian Sentinel Network</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Monitoring 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Premier Staging Havens: <strong className="text-white">Hokersar Ramsar</strong>, <strong className="text-white">Wular Lake</strong>, <strong className="text-white">Shallabugh Wetland</strong>, <strong className="text-white">Haigam Reserve</strong>, and <strong className="text-white">Tso Moriri (Ladakh)</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Total Key Sites</div>
              <div className="text-sm font-bold text-sky-300">{birdingHotspotsData.length} Monitored Havens</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-xs font-semibold text-sky-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>5 Ramsar Sanctuaries</span>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TELEMETRY METRIC KPI STRIP (6 CARDS)                          */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-4">
          {/* Card 1: Total Hotspots */}
          <div
            onClick={() => { setSelectedHotspotType('All'); setSelectedDesignation('All'); }}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedHotspotType === 'All' && selectedDesignation === 'All'
                ? 'bg-sky-500/20 border-sky-500/60 shadow-lg shadow-sky-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Hotspots</span>
              <Bird className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-white">{birdingHotspotsData.length}</div>
            <div className="text-[11px] text-sky-400/90 font-mono mt-0.5">Premier Avian Sites</div>
          </div>

          {/* Card 2: Ramsar Wetlands */}
          <div
            onClick={() => setSelectedDesignation(selectedDesignation === 'Ramsar Site' ? 'All' : 'Ramsar Site')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedDesignation === 'Ramsar Site'
                ? 'bg-emerald-500/20 border-emerald-500/60 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Ramsar Sites</span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300">
              {birdingHotspotsData.filter(h => h.conservationStatus.includes('Ramsar Site')).length}
            </div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">International Wetlands</div>
          </div>

          {/* Card 3: IBA Sites */}
          <div
            onClick={() => setSelectedDesignation(selectedDesignation === 'Important Bird Area (IBA)' ? 'All' : 'Important Bird Area (IBA)')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              selectedDesignation === 'Important Bird Area (IBA)'
                ? 'bg-purple-500/20 border-purple-500/60 shadow-lg shadow-purple-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">IBA Zones</span>
              <MapPin className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">
              {birdingHotspotsData.filter(h => h.conservationStatus.includes('Important Bird Area (IBA)')).length}
            </div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">Important Bird Areas</div>
          </div>

          {/* Card 4: Avian Richness */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Species Richness</span>
              <Activity className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">340+</div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Logged Avian Taxa</div>
          </div>

          {/* Card 5: Alpine Waters */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Wetland / Lakes</span>
              <Mountain className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-300">
              {birdingHotspotsData.filter(h => h.hotspotType.includes('Wetland') || h.hotspotType.includes('Lake')).length}
            </div>
            <div className="text-[11px] text-blue-400/90 font-mono mt-0.5">Aquatic Ecosystems</div>
          </div>

          {/* Card 6: Elevation Span */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Alt Range</span>
              <TrendingUp className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-300">
              {Math.max(...birdingHotspotsData.map(h => h.elevationRange.max))}m
            </div>
            <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">Peak Observation Point</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/20 text-white" icon={<Filter className="w-4 h-4" />} onClick={() => setShowFilters(f => !f)}>
              {showFilters ? 'Hide Filters' : 'Filters'}
            </Button>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-slate-400 whitespace-nowrap">
              <strong className="text-white">{filteredHotspots.length}</strong> of <strong className="text-white">{birdingHotspotsData.length}</strong> hotspots
            </span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-400'} icon={<Grid3X3 className="w-4 h-4" />} />
              <Button variant="ghost" size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-sky-500/20 text-sky-400' : 'text-slate-400'} icon={<List className="w-4 h-4" />} />
            </div>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 mt-4 glass-intense border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Search Text</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Hokersar, Ibisbill, Bandipora..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors"
                  style={{ backgroundColor: '#020617', color: '#ffffff' }}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Ecological Scope</label>
              <select
                value={selectedScope}
                onChange={(e) => { setSelectedScope(e.target.value as any); setSelectedDistrict('All'); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
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
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Administrative Unit</label>
              <select
                value={selectedDistrict}
                onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-sky-500 transition-colors cursor-pointer disabled:opacity-50"
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
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Hotspot Type</label>
              <select
                value={selectedHotspotType}
                onChange={(e) => { setSelectedHotspotType(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
                style={{ backgroundColor: '#020617', color: '#ffffff' }}
              >
                <option value="All" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>All Types</option>
                {hotspotTypes.map(t => (
                  <option key={t} value={t} className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Designation</label>
              <select
                value={selectedDesignation}
                onChange={(e) => { setSelectedDesignation(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-2 text-sm rounded-lg bg-slate-950 border border-white/20 text-white font-medium focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
                style={{ backgroundColor: '#020617', color: '#ffffff' }}
              >
                <option value="All" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>All Designations</option>
                <option value="Ramsar" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Ramsar Wetland</option>
                <option value="IBA" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Important Bird Area (IBA)</option>
                <option value="Protected Area" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Protected Area / Sanctuary</option>
                <option value="Community Site" className="bg-slate-900 text-white font-medium py-1.5" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Community Site</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Grid */}
      <div className="container mx-auto px-6 py-8">
        {filteredHotspots.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredHotspots.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((hotspot, idx) => (
              <motion.div key={hotspot.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card className="h-full flex flex-col overflow-hidden card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                  <div className="p-5 border-b border-white/5 bg-white/5 relative">
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      <Badge variant="default" className="bg-sky-500/20 text-sky-300 border-sky-500/30 text-[10px]">{hotspot.scope}</Badge>
                      <Badge variant="outline" className="border-white/20 text-[10px]">{hotspot.hotspotType}</Badge>
                      {hotspot.conservationStatus.slice(0, 2).map(status => (
                        <Badge key={status} variant="info" className="text-[10px]">{status}</Badge>
                      ))}
                    </div>

                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                        {hotspot.name}
                      </h3>
                      {hotspot.kashmiriName && (
                        <span className="text-xs font-semibold text-sky-300 bg-sky-500/15 px-2 py-0.5 rounded border border-sky-500/30 whitespace-nowrap">
                          {hotspot.kashmiriName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-sky-400" />
                      <span>{hotspot.administrativeUnit} • {hotspot.region} • {hotspot.basin} Basin</span>
                    </div>

                    {/* Geolocation & Checklist Density Bar */}
                    <div className="mb-3 flex items-center justify-between text-[11px] bg-slate-950/70 p-2 rounded-lg border border-white/10">
                      <span className="text-slate-400 font-mono text-[10px]">
                        {hotspot.coordinates.lat.toFixed(2)}°N, {hotspot.coordinates.lng.toFixed(2)}°E
                      </span>
                      <span className="text-sky-300 font-medium">
                        {hotspot.observationCount ? `${hotspot.observationCount.toLocaleString()} records` : `${hotspot.difficultyLevel} Access`}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-1 border-b border-white/5">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{hotspot.speciesCount}+</div>
                        <div className="text-[10px] text-slate-500 uppercase">Species</div>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">{hotspot.habitatCount}</div>
                        <div className="text-[10px] text-slate-500 uppercase">Habitats</div>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div className="text-center">
                        <div className="text-sm font-bold text-white mt-1">{hotspot.elevationRange.max}m</div>
                        <div className="text-[10px] text-slate-500 uppercase">Elevation</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-sm text-slate-300 mb-4 h-[42px] line-clamp-2">
                      {hotspot.shortDescription}
                    </p>

                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-2">Key Species Focus</div>
                      <div className="flex flex-wrap gap-1.5">
                        {hotspot.keySpecies.slice(0, 3).map(sp => (
                          <span key={sp} className="text-xs px-2 py-1 rounded bg-white/5 text-slate-300 border border-white/10">
                            {sp}
                          </span>
                        ))}
                        {hotspot.threatenedSpecies && hotspot.threatenedSpecies.length > 0 && (
                          <span className="text-xs px-2 py-1 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-semibold">
                            {hotspot.threatenedSpecies[0]}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => setSelectedHotspot(hotspot)} className="w-full border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors">
                        View Hotspot Intelligence
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {filteredHotspots.length > itemsPerPage && (
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
                    {Array.from({ length: Math.ceil(filteredHotspots.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(filteredHotspots.length / itemsPerPage);
                      
                      if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-sky-500 text-white'
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredHotspots.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredHotspots.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredHotspots.length)} of {filteredHotspots.length} hotspots
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24">
            <Wind className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No hotspots found</h3>
            <p className="text-slate-400 mb-4">Try relaxing your geographic or type filters</p>
            <Button
              variant="outline"
              className="border-white/20 text-white"
              onClick={() => {
                setSearchQuery('');
                setSelectedDistrict('All');
                setSelectedScope('All');
                setSelectedHotspotType('All');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedHotspot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900/50 border border-white/10 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl shadow-sky-900/20"
            >
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/5 relative">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-sky-500/30 text-sky-300 bg-sky-500/10">{selectedHotspot.scope}</Badge>
                    <Badge variant="outline" className="border-white/20">{selectedHotspot.hotspotType}</Badge>
                    {selectedHotspot.conservationStatus.map(status => (
                      <Badge key={status} variant={status === 'Ramsar' ? 'default' : 'secondary'} className={status === 'Ramsar' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' : ''}>
                        {status}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-baseline gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-white">{selectedHotspot.name}</h2>
                    {selectedHotspot.kashmiriName && (
                      <span className="text-sm font-semibold text-sky-300 bg-sky-500/15 px-2.5 py-0.5 rounded border border-sky-500/30">
                        {selectedHotspot.kashmiriName}
                      </span>
                    )}
                  </div>
                  <p className="text-sky-400 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4"/>
                    {selectedHotspot.administrativeUnit}, {selectedHotspot.region} • {selectedHotspot.basin} Basin • {selectedHotspot.coordinates.lat.toFixed(3)}°N, {selectedHotspot.coordinates.lng.toFixed(3)}°E
                  </p>
                </div>
                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors self-start border border-white/10"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
              
              <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                <div>
                  <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                    <Map className="w-4 h-4 text-sky-500" /> Hotspot Ecological Profile
                  </h4>
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed bg-black/20 p-3.5 rounded-lg border border-white/5">
                    {selectedHotspot.profile}
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm bg-black/20 p-3.5 rounded-lg border border-white/5">
                    <div>
                      <span className="block text-slate-500 text-[10px] uppercase mb-0.5">Total Species</span>
                      <span className="text-slate-200 font-bold text-base">{selectedHotspot.speciesCount}+ Species</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[10px] uppercase mb-0.5">Elevation Span</span>
                      <span className="text-slate-200 font-medium text-sm">{selectedHotspot.elevationRange.min}m – {selectedHotspot.elevationRange.max}m</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[10px] uppercase mb-0.5">Best Observation Window</span>
                      <span className="text-sky-300 font-medium text-sm">{selectedHotspot.bestSeason}</span>
                    </div>
                    <div>
                      <span className="block text-slate-500 text-[10px] uppercase mb-0.5">Access Difficulty</span>
                      <span className="text-slate-200 font-medium text-sm">{selectedHotspot.difficultyLevel}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                      <Activity className="w-4 h-4 text-sky-500" /> Target Avifauna & Habitats
                    </h4>
                    <div className="space-y-3">
                      <div>
                        <span className="block text-slate-500 text-xs uppercase mb-1">Key Habitats</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedHotspot.habitats.map(h => <span key={h} className="text-xs px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20">{h}</span>)}
                        </div>
                      </div>
                      <div>
                        <span className="block text-slate-500 text-xs uppercase mb-1">Target Species</span>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedHotspot.keySpecies.map(sp => <Badge key={sp} variant="outline" className="text-xs bg-white/5">{sp}</Badge>)}
                        </div>
                      </div>
                      {selectedHotspot.threatenedSpecies.length > 0 && (
                        <div>
                          <span className="block text-rose-400/90 text-xs uppercase mb-1 flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5"/> Threatened & Vulnerable</span>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedHotspot.threatenedSpecies.map(sp => <Badge key={sp} variant="danger" className="text-[10px]">{sp}</Badge>)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-sky-500" /> Seasonality & Observation Metadata
                    </h4>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 grid grid-cols-2 gap-3 text-xs mb-3">
                      <div className="flex justify-between items-center"><span className="text-slate-400">Winter:</span> <span className="text-slate-200 font-medium">{selectedHotspot.seasons.winter}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400">Spring:</span> <span className="text-slate-200 font-medium">{selectedHotspot.seasons.spring}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400">Summer:</span> <span className="text-slate-200 font-medium">{selectedHotspot.seasons.summer}</span></div>
                      <div className="flex justify-between items-center"><span className="text-slate-400">Autumn:</span> <span className="text-slate-200 font-medium">{selectedHotspot.seasons.autumn}</span></div>
                    </div>
                    <div className="space-y-1.5 text-xs text-slate-400 bg-black/20 p-2.5 rounded border border-white/5">
                      <div className="flex items-center justify-between">
                        <span>Checklists Submitted:</span>
                        <strong className="text-slate-200">{selectedHotspot.checklistCount || '100+'}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Last Verified Sighting:</span>
                        <strong className="text-slate-200">{selectedHotspot.lastVerifiedObservation || 'Recent'}</strong>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Validation Primary Source:</span>
                        <strong className="text-slate-200">{selectedHotspot.dataSource}</strong>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="p-4 border-t border-white/10 bg-black/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="text-xs text-slate-400">
                  Access: <strong className="text-slate-200">{selectedHotspot.accessType}</strong>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  {selectedHotspot.eBirdHotspotUrl && (
                    <a href={selectedHotspot.eBirdHotspotUrl} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5">
                        <Wind className="w-4 h-4 mr-2"/>
                        Open in eBird
                      </Button>
                    </a>
                  )}
                  <Button variant="primary" size="sm" className="bg-sky-600 hover:bg-sky-500 text-white" onClick={() => setSelectedHotspot(null)}>
                    Close Hotspot
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
