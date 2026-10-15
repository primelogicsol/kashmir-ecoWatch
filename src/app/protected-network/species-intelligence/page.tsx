'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Activity, MapPin, Shield, TrendingUp, ArrowRight, Search, Filter, AlertTriangle, Grid3X3, List, Map as MapIcon , ChevronLeft, ChevronRight , Compass, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSpeciesProfiles, getProtectedAreas } from '@/data/protected-network';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, getScopeForUnit, Scope } from '@/data/geography';

export default function SpeciesIntelligencePage() {
  const speciesList = getSpeciesProfiles.all();

  const [activeTab, setActiveTab] = useState<'core' | 'trans' | 'extended'>('core');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedEcologicalScope, setSelectedEcologicalScope] = useState<Scope | 'All'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const availableDistricts = useMemo(() => getUnitsForScope(selectedEcologicalScope).sort(), [selectedEcologicalScope]);
  const availableScopes = [...GEOGRAPHY.scopes];

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
    return speciesList.filter(s => s.protectedAreas.some(slug => paLookup.get(slug)?.scope === 'Kashmir Core')).length;
  }, [speciesList, paLookup]);

  const transCount = useMemo(() => {
    return speciesList.filter(s => s.protectedAreas.some(slug => paLookup.get(slug)?.scope === 'Trans-Divisional')).length;
  }, [speciesList, paLookup]);

  const extendedCount = useMemo(() => {
    return speciesList.filter(s => s.protectedAreas.some(slug => paLookup.get(slug)?.scope === 'Transboundary / Extended')).length;
  }, [speciesList, paLookup]);

  const TABS = [
    { key: 'core', label: 'Kashmir Core', description: `Valley core protected areas, wetland networks, and high-density zones — ${coreCount} species` },
    { key: 'trans', label: 'Trans-Divisional', description: `Jammu, Pir Panjal, Kishtwar, and Ladakh sectors — ${transCount} species` },
    { key: 'extended', label: 'Transboundary / Extended', description: `Extended Himalayan and Karakoram zones, Neelum, AJK, and Gilgit — ${extendedCount} species` },
  ] as const;

  const filteredSpecies = useMemo(() => {
    return speciesList.filter(species => {
      

      // 2. Search Text
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        species.name.toLowerCase().includes(query) ||
        species.scientificName.toLowerCase().includes(query) ||
        species.description.toLowerCase().includes(query) ||
        species.protectedAreas.some(pa => pa.replace(/-/g, ' ').toLowerCase().includes(query));

      // 3. District Dropdown
      const districtsOfSpecies = [];
      species.protectedAreas.forEach(slug => {
        const pa = paLookup.get(slug);
        if (pa && pa.district) districtsOfSpecies.push(pa.district);
      });
      const matchesDistrict = selectedDistrict === 'All' || ((species as any).district === selectedDistrict || ((species as any).districts && (species as any).districts.includes(selectedDistrict)));

      const speciesScope = (species as any).scope || getScopeForUnit((species as any).district || ((species as any).districts && (species as any).districts[0]));
      const matchesScope = selectedEcologicalScope === 'All' || speciesScope === selectedEcologicalScope || speciesScope === 'All';

      return matchesSearch && matchesDistrict && matchesScope;
    });
  }, [speciesList, searchQuery, selectedDistrict, selectedEcologicalScope, paLookup]);

  const getStatusColor = (status: string) => {
    if (status.includes('CR')) return 'danger';
    if (status.includes('EN')) return 'danger';
    if (status.includes('VU')) return 'warning';
    if (status.includes('NT')) return 'info';
    return 'success';
  };

  const getSpeciesImage = (species: any) => {
    const name = species.name.toLowerCase();
    if (name.includes('hangul') || name.includes('stag') || name.includes('deer')) return '/images/bear.png';
    if (name.includes('markhor') || name.includes('ibex') || name.includes('tahr') || name.includes('sheep') || name.includes('goral') || name.includes('capra')) return '/images/markhor.png';
    if (name.includes('snow leopard') || name.includes('leopard') || name.includes('lynx') || name.includes('cat') || name.includes('panthera')) return '/images/tiger.png';
    if (name.includes('bear') || name.includes('wolf') || name.includes('otter')) return '/images/bear.png';
    return '/images/protected-network.png';
  };


    const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  const showcaseItems = [
    { id: '1', title: 'Kashmir Stag (Hangul)', subtitle: 'Cervus hanglu hanglu', location: 'Dachigam NP · 260 est.', tag: 'CR Priority', src: '/images/bear.png' },
    { id: '2', title: 'Flare-Horned Markhor', subtitle: 'Capra falconeri cashmiriensis', location: 'Kazinag & Hirpora · 350 est.', tag: 'EN Caprinae', src: '/images/markhor.png' },
    { id: '3', title: 'Snow Leopard', subtitle: 'Panthera uncia', location: 'Hemis & Kishtwar · High Altitude', tag: 'VU Apex', src: '/images/tiger.png' },
    { id: '4', title: 'Western Tragopan', subtitle: 'Tragopan melanocephalus', location: 'Limber & Lachipora · Conifer Matrix', tag: 'VU Phasianid', src: '/images/protected-network.png' },
  ];
  const currentHero = showcaseItems[activeHeroIdx] || showcaseItems[0];

  const heroShowcaseCard = (
    <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl shadow-emerald-950/60 bg-slate-900/80 backdrop-blur-md p-3">
      <div className="flex items-center justify-between px-1 py-1 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">
            Species Biological Sentinel
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">
          IUCN Red List 2026
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
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold flex-shrink-0">
              {currentHero.tag}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="italic text-emerald-300 font-medium">{currentHero.subtitle}</span>
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
                ? 'border-emerald-400 ring-2 ring-emerald-400/40 bg-emerald-500/10 shadow-md'
                : 'border-white/10 bg-slate-800/60 hover:border-emerald-500/30 hover:bg-slate-800'
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
                Species Intelligence Network
              </span>
            </div>
          </div>
        }
        subtitle="Species distribution, protected-area overlap, and habitat association analysis across Kashmir's conservation network. Covers mammals, birds, plants, and aquatic species with conservation status, range data, and ecological sensitivity indicators."
        icon={<Activity className="w-6 h-6 text-emerald-400" />}
        label="Species Intelligence"
        breadcrumbs={[{ label: 'Species Intelligence' }]}
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        rightContent={heroShowcaseCard}
        actions={
          <>
            <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-emerald-500 font-bold transition-all shadow-md shadow-emerald-500/20" icon={<Search className="w-4 h-4" />}>
              Search Species
            </Button>
            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold transition-all" icon={<MapIcon className="w-4 h-4" />}>
              Distribution Maps
            </Button>
          </div>
          </>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K CONNECTIVITY SENTINEL         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 relative z-20 mt-4 mb-4">
        <div className="bg-gradient-to-r from-slate-900/95 via-emerald-950/40 to-slate-900/95 border border-emerald-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-emerald-400">Biological Sentinel &amp; Protected-Area Overlap</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Species Overlap Matrix 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Multi-taxa database documenting distribution, IUCN Red List status, habitat overlap, and corridor connectivity across <strong className="text-white">National Parks, Sanctuaries &amp; Wetland Reserves</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Tracked Profiles</div>
              <div className="text-sm font-bold text-emerald-300">{speciesList.length} Verified Taxa</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
              {speciesList.filter(s => s.conservationStatus.includes('CR') || s.conservationStatus.includes('EN')).length} CR / EN Taxa
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6-CARD INTERACTIVE KPI STRIP                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-6 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1: Total Taxa */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Total Taxa</span>
              <Activity className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300">{speciesList.length}</div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">Biological Profiles</div>
          </div>

          {/* Card 2: Critically Endangered */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Crit. Endangered</span>
              <Shield className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-300">{speciesList.filter(s => s.conservationStatus.includes('CR')).length}</div>
            <div className="text-[11px] text-rose-400/90 font-mono mt-0.5">Highest Priority</div>
          </div>

          {/* Card 3: Endangered */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Endangered</span>
              <Shield className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">{speciesList.filter(s => s.conservationStatus.includes('EN')).length}</div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Conservation Focus</div>
          </div>

          {/* Card 4: Mammals */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Mammals</span>
              <Activity className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-300">{speciesList.filter(s => s.group === 'Mammal').length}</div>
            <div className="text-[11px] text-sky-400/90 font-mono mt-0.5">Faunal Flagships</div>
          </div>

          {/* Card 5: Birds & Flora */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Birds &amp; Flora</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">{speciesList.filter(s => s.group === 'Bird' || s.group === 'Plant').length}</div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">Avian &amp; Botanical Taxa</div>
          </div>

          {/* Card 6: Endemics */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Endemic Taxa</span>
              <CheckCircle2 className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-300">{speciesList.filter(s => s.isEndemic).length}</div>
            <div className="text-[11px] text-teal-400/90 font-mono mt-0.5">Kashmir Endemics</div>
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

          {/* Filters + count */}
          <div className="flex items-center gap-3 ml-auto">
            <Button variant="outline" className="border-white/20 text-white" icon={<Filter className="w-4 h-4" />} onClick={() => setShowFilters(f => !f)}>
              {showFilters ? 'Hide Filters' : 'Filters'}
            </Button>
            <span className="text-sm text-slate-400 whitespace-nowrap">
              <strong className="text-white">{filteredSpecies.length}</strong> of <strong className="text-white">{speciesList.length}</strong> species
            </span>
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
                  placeholder="Search species name, scientific name..."
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

        {/* Species Cards */}
        {filteredSpecies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpecies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((species, index) => (
              <motion.a
                key={species.id}
                href={`/protected-network/species-intelligence/${species.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="h-full block group"
              >
                <Card className="h-full flex flex-col justify-between card-intelligence border border-white/5 bg-slate-900/50 hover:border-emerald-500/20 transition-all duration-300" padding="lg">
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={getStatusColor(species.conservationStatus)} size="sm">
                            {species.conservationStatus.split(' ')[0]}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {species.name}
                        </h3>
                        <p className="text-sm text-slate-400 italic">{species.scientificName}</p>
                      </div>
                    </div>

                    {/* Protected Area Overlap */}
                    <div className="mb-4">
                      <div className="text-xs text-slate-500 uppercase mb-2">Protected Area Overlap</div>
                      <div className="flex flex-wrap gap-2">
                        {species.protectedAreas.slice(0, 3).map((pa, idx) => (
                          <Badge key={idx} variant="default" size="sm">
                            {pa.replace(/-/g, ' ')}
                          </Badge>
                        ))}
                        {species.protectedAreas.length > 3 && (
                          <Badge variant="default" size="sm">
                            +{species.protectedAreas.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Threats & Conservation */}
                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                      <div className="flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{species.threats.length} threats</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        <span>{species.conservationMeasures.length} measures</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white">
                      View Species Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Card>
              </motion.a>
            ))}

            {filteredSpecies.length > itemsPerPage && (
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
                    {Array.from({ length: Math.ceil(filteredSpecies.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(filteredSpecies.length / itemsPerPage);
                      
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
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredSpecies.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredSpecies.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredSpecies.length)} of {filteredSpecies.length} species
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24">
            <Shield className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No species profiles found</h3>
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

