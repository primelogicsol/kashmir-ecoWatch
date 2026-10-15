'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, Activity, Bell, ArrowRight, TrendingUp, Search, Filter, Grid3X3, List, Shield, ChevronLeft, ChevronRight, Compass, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getThreats, getProtectedAreas } from '@/data/protected-network';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, getScopeForUnit, Scope } from '@/data/geography';

export default function MonitoringPage() {
  const threats = getThreats.all();

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

  const allPAs = useMemo(() => {
    return [
      ...getProtectedAreas.nationalParks(),
      ...getProtectedAreas.wildlifeSanctuaries(),
      ...getProtectedAreas.wetlandReserves(),
      ...getProtectedAreas.conservationReserves(),
      ...getProtectedAreas.birdHabitatAreas()
    ];
  }, []);

  const paLookup = useMemo(() => new Map(allPAs.map(pa => [pa.slug, pa])), [allPAs]);

  const districtsList = useMemo(() => {
    const districts = new Set<string>();
    allPAs.forEach(pa => {
      if (pa.district) districts.add(pa.district);
    });
    return Array.from(districts).sort();
  }, [allPAs]);

  const scopesList = ['Kashmir Core', 'Trans-Divisional', 'Transboundary / Extended'];

  const coreCount = useMemo(() => {
    return threats.filter(t => t.affectedAreas.some(slug => paLookup.get(slug)?.scope === 'Kashmir Core') || t.affectedAreas.length === 0).length;
  }, [threats, paLookup]);

  const transCount = useMemo(() => {
    return threats.filter(t => t.affectedAreas.some(slug => paLookup.get(slug)?.scope === 'Trans-Divisional')).length;
  }, [threats, paLookup]);

  const extendedCount = useMemo(() => {
    return threats.filter(t => t.affectedAreas.some(slug => paLookup.get(slug)?.scope === 'Transboundary / Extended')).length;
  }, [threats, paLookup]);

  const TABS = [
    { key: 'core', label: 'Kashmir Core', description: `Valley core protected areas, wetland networks, and high-density zones — ${coreCount} alerts` },
    { key: 'trans', label: 'Trans-Divisional', description: `Jammu, Pir Panjal, Kishtwar, and Ladakh high-altitude sectors — ${transCount} alerts` },
    { key: 'extended', label: 'Transboundary / Extended', description: `Extended Himalayan and Karakoram zones, Neelum, AJK, and Gilgit — ${extendedCount} alerts` },
  ] as const;

  const filteredThreats = useMemo(() => {
    return threats.filter(threat => {
      

      // 2. Search Text
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        threat.name.toLowerCase().includes(query) ||
        threat.type.toLowerCase().includes(query) ||
        threat.description.toLowerCase().includes(query) ||
        threat.affectedAreas.some(slug => slug.replace(/-/g, ' ').toLowerCase().includes(query));

      // 3. District Dropdown
      const districtsOfThreat = [];
      threat.affectedAreas.forEach(slug => {
        const pa = paLookup.get(slug);
        if (pa && pa.district) districtsOfThreat.push(pa.district);
      });
      const matchesDistrict = selectedDistrict === 'All' || ((threat as any).district === selectedDistrict || ((threat as any).districts && (threat as any).districts.includes(selectedDistrict)));

      const threatScope = (threat as any).scope || getScopeForUnit((threat as any).district || ((threat as any).districts && (threat as any).districts[0]));
      const matchesScope = selectedEcologicalScope === 'All' || threatScope === selectedEcologicalScope || threatScope === 'All';

      return matchesSearch && matchesDistrict && matchesScope;
    });
  }, [threats, searchQuery, selectedDistrict, selectedEcologicalScope, paLookup]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'alert-critical';
      case 'high': return 'alert-critical';
      case 'medium': return 'alert-warning';
      default: return 'alert-info';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'danger';
      case 'high': return 'danger';
      case 'medium': return 'warning';
      default: return 'info';
    }
  };

    const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  const showcaseItems = [
    { id: '1', title: 'Grazing & Human Incursion', subtitle: 'Overa-Aru Upper Meadows', location: 'Anantnag · High Altitude', tag: 'Active Alert', src: '/images/bear.png' },
    { id: '2', title: 'Poaching Risk Surveillance', subtitle: 'Hirpora Markhor Corridor', location: 'Shopian · Buffer Edge', tag: 'WPA Protected', src: '/images/markhor.png' },
    { id: '3', title: 'Wetland Encroachment Watch', subtitle: 'Hokersar Ramsar Basin Siltation', location: 'Budgam / Srinagar · Silt & Weed', tag: 'Ecological Stress', src: '/images/protected-network.png' },
    { id: '4', title: 'Snow Leopard Habitat Pressure', subtitle: 'Hemis High Range Trans-Himalaya', location: 'Ladakh · Snow Line', tag: 'High Risk Alert', src: '/images/tiger.png' },
  ];
  const currentHero = showcaseItems[activeHeroIdx] || showcaseItems[0];

  const heroShowcaseCard = (
    <div className="relative rounded-2xl overflow-hidden border border-rose-500/40 shadow-2xl shadow-rose-950/60 bg-slate-900/80 backdrop-blur-md p-3">
      <div className="flex items-center justify-between px-1 py-1 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
          </span>
          <span className="font-bold text-rose-300 uppercase tracking-wider text-[11px]">
            Threat Early Warning Sentinel
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 text-[10px] font-mono font-semibold">
          Active Monitoring 2026
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
            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-semibold flex-shrink-0">
              {currentHero.tag}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="italic text-rose-300 font-medium">{currentHero.subtitle}</span>
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
                ? 'border-rose-400 ring-2 ring-rose-400/40 bg-rose-500/10 shadow-md'
                : 'border-white/10 bg-slate-800/60 hover:border-rose-500/30 hover:bg-slate-800'
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
                Threat Intelligence &amp; Monitoring Sentinel
              </span>
            </div>
          </div>
        }
        subtitle="Pressure signals, encroachment records, habitat condition assessments, and active conservation alerts across Kashmir's protected areas. Data feeds into threat mapping and management planning."
        icon={<Bell className="w-6 h-6 text-emerald-400" />}
        label="Conservation Intelligence"
        breadcrumbs={[{ label: 'Monitoring & Threats' }]}
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        rightContent={heroShowcaseCard}
        actions={
          <>
            <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" className="bg-gradient-to-r from-rose-600 to-red-500 font-bold transition-all shadow-md shadow-rose-500/20" icon={<Bell className="w-4 h-4" />}>
              Subscribe to Alerts
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold transition-all" icon={<TrendingUp className="w-4 h-4" />}>
              View Trends
            </Button>
          </div>
          </>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K CONNECTIVITY SENTINEL         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 relative z-20 mt-4 mb-4">
        <div className="bg-gradient-to-r from-slate-900/95 via-rose-950/40 to-slate-900/95 border border-rose-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-rose-400 shrink-0">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-rose-400">Habitat Threat Sentinel &amp; Real-time Pressure Monitoring</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Early Warning System 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Monitoring active anthropogenic pressures, grazing incursions, poaching vectors, and land-use shifts across <strong className="text-white">25 Verified Vulnerability Hotspots</strong> in J&amp;K and Ladakh.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Active Sentinel Vectors</div>
              <div className="text-sm font-bold text-rose-300">{threats.length} Documented Alerts</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono font-bold">
              {threats.filter(t => t.severity === 'critical').length} Critical Alerts
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6-CARD INTERACTIVE KPI STRIP                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-6 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1: Total Alerts */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Total Alerts</span>
              <Bell className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300">
              {threats.length}
            </div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">Active Threat Feeds</div>
          </div>

          {/* Card 2: Critical Severity */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Critical Threats</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-300">
              {threats.filter(t => t.severity === 'critical').length}
            </div>
            <div className="text-[11px] text-rose-400/90 font-mono mt-0.5">High Red Alert</div>
          </div>

          {/* Card 3: High Severity */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">High Severity</span>
              <ShieldAlert className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">
              {threats.filter(t => t.severity === 'high').length}
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Priority Monitoring</div>
          </div>

          {/* Card 4: Core Area Alerts */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Kashmir Core</span>
              <Activity className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-300">
              {coreCount}
            </div>
            <div className="text-[11px] text-sky-400/90 font-mono mt-0.5">Valley Focal Zones</div>
          </div>

          {/* Card 5: Trans-Divisional Alerts */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Trans-Divisional</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">
              {transCount}
            </div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">High Altitude &amp; Pir Panjal</div>
          </div>

          {/* Card 6: Mitigated / In Action */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Active Measures</span>
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-300">
              {threats.filter(t => t.mitigationStrategies.length > 0).length}
            </div>
            <div className="text-[11px] text-teal-400/90 font-mono mt-0.5">Mitigation In Play</div>
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
              <strong className="text-white">{filteredThreats.length}</strong> of <strong className="text-white">{threats.length}</strong> threat alerts
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
                  placeholder="Search threat name, affected areas..."
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

        {filteredThreats.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredThreats.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((threat, index) => (
              <motion.a
                key={threat.id}
                href={`/protected-network/monitoring-and-threats/${threat.slug}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${viewMode === 'grid' ? 'h-full' : ''} block group`}
              >
                <Card className={`${viewMode === 'grid' ? 'h-full flex flex-col justify-between' : ''} card-intelligence border border-white/5 bg-slate-900/50 hover:border-emerald-500/20 transition-all duration-300 p-6 ${getSeverityColor(threat.severity)} group-hover:scale-[1.01] transition-transform`}>
                  {viewMode === 'grid' ? (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-start gap-4 mb-3">
                          <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${
                            threat.severity === 'critical' ? 'signal-pulse bg-red-500' :
                            threat.severity === 'high' ? 'signal-pulse bg-red-500' :
                            threat.severity === 'medium' ? 'signal-pulse bg-amber-500' :
                            'signal-pulse bg-blue-500'
                          }`} />
                          <div>
                            <h3 className="font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors">{threat.name}</h3>
                            <span className="inline-block mt-1">
                              <Badge variant={getSeverityBadge(threat.severity)} size="sm">
                                {threat.severity.toUpperCase()}
                              </Badge>
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300 mb-3 line-clamp-3">{threat.description}</p>
                        <div className="text-xs text-slate-400">
                          <span>{threat.affectedAreas.length} affected areas</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white">
                          View Intel
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                          threat.severity === 'critical' ? 'signal-pulse bg-red-500' :
                          threat.severity === 'high' ? 'signal-pulse bg-red-500' :
                          threat.severity === 'medium' ? 'signal-pulse bg-amber-500' :
                          'signal-pulse bg-blue-500'
                        }`} />
                        <div>
                          <h3 className="font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors">{threat.name}</h3>
                          <p className="text-sm text-slate-300 mb-2">{threat.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span>{threat.affectedAreas.length} affected areas</span>
                            <span>•</span>
                            <Badge variant={getSeverityBadge(threat.severity)} size="sm">
                              {threat.severity.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-slate-400 group-hover:text-white transition-colors" icon={<ArrowRight className="w-4 h-4" />} />
                    </div>
                  )}
                </Card>
              </motion.a>
            ))}

            {filteredThreats.length > itemsPerPage && (
              <div className="flex flex-col items-center justify-center gap-4 mt-12 w-full col-span-full">
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
                    {Array.from({ length: Math.ceil(filteredThreats.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(filteredThreats.length / itemsPerPage);
                      
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredThreats.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredThreats.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredThreats.length)} of {filteredThreats.length} records
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24">
            <Shield className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No threat alerts found</h3>
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

