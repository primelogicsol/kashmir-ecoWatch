'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/common/Heading';
import { GEOGRAPHY, getUnitsForScope, Scope } from '@/data/geography';
import { 
  migrationData, 
  MigrationStatus,
  SeasonalStatus,
  Month,
  MigrationWindow
} from '@/data/migration-windows';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wind, MapPin, Search, Filter, 
  ChevronLeft, ChevronRight, Activity, TrendingUp, AlertTriangle, X, 
  Calendar, Map, CheckCircle, Compass, Waves, Sun, Mountain, Info, ExternalLink
} from 'lucide-react';

const MONTHS: Month[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function MigrationWindowsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedScope, setSelectedScope] = useState<Scope | 'All'>('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState<MigrationStatus | 'All'>('All');
  const [selectedGroup, setSelectedGroup] = useState<string>('All');
  const [selectedSeasonStatus, setSelectedSeasonStatus] = useState<SeasonalStatus | 'All'>('All');
  const [activePreset, setActivePreset] = useState<string>('all');

  const [selectedMigration, setSelectedMigration] = useState<MigrationWindow | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const availableDistricts = useMemo(() => getUnitsForScope(selectedScope as Scope).sort(), [selectedScope]);
  // Use Set to eliminate any duplicate 'All'
  const availableScopes = useMemo(() => Array.from(new Set(GEOGRAPHY.scopes)), []);
  
  const allMigrationStatuses = useMemo(() => Array.from(new Set(migrationData.map(m => m.primaryMigrationStatus))).sort(), []);
  const allSeasonalStatuses = useMemo(() => Array.from(new Set(migrationData.map(m => m.currentSeasonalStatus))).sort(), []);
  const allTaxonomicGroups = useMemo(() => Array.from(new Set(migrationData.map(m => m.taxonomicGroup))).sort(), []);

  // Preset Filters
  const handlePreset = (preset: string) => {
    setActivePreset(preset);
    setCurrentPage(1);
    setSelectedDistrict('All');
    setSelectedScope('All');
    setSearchQuery('');

    if (preset === 'all') {
      setSelectedStatus('All');
      setSelectedGroup('All');
      setSelectedSeasonStatus('All');
    } else if (preset === 'winter') {
      setSelectedStatus('Winter Visitor');
      setSelectedGroup('All');
      setSelectedSeasonStatus('All');
    } else if (preset === 'summer') {
      setSelectedStatus('Summer Visitor');
      setSelectedGroup('All');
      setSelectedSeasonStatus('All');
    } else if (preset === 'threatened') {
      setSelectedStatus('All');
      setSelectedGroup('All');
      setSelectedSeasonStatus('All');
    } else if (preset === 'waterfowl') {
      setSelectedGroup('Waterfowl');
      setSelectedStatus('All');
      setSelectedSeasonStatus('All');
    } else if (preset === 'altitudinal') {
      setSelectedStatus('All');
      setSelectedGroup('All');
      setSelectedSeasonStatus('All');
    }
  };

  const filteredMigrations = useMemo(() => {
    return migrationData.filter(migration => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        migration.commonName.toLowerCase().includes(query) ||
        migration.scientificName.toLowerCase().includes(query) ||
        (migration.localName && migration.localName.toLowerCase().includes(query)) ||
        migration.shortDescription.toLowerCase().includes(query) ||
        (migration.flywayOrigin && migration.flywayOrigin.toLowerCase().includes(query)) ||
        migration.mainHabitats.some(h => h.toLowerCase().includes(query));

      const getRegionForUnit = (unit: string) => {
        for (const [region, units] of Object.entries(GEOGRAPHY.units)) {
          if ((units as readonly string[]).includes(unit)) return region;
        }
        return null;
      };
      
      const districtRegion = selectedDistrict !== 'All' ? getRegionForUnit(selectedDistrict) : null;
      
      const matchesDistrict = selectedDistrict === 'All' || (districtRegion && migration.regionsPresent.includes(districtRegion as any));
      const matchesScope = selectedScope === 'All' || migration.primaryScope === selectedScope || migration.primaryScope === 'All';
      const matchesStatus = selectedStatus === 'All' || migration.primaryMigrationStatus === selectedStatus;
      const matchesGroup = selectedGroup === 'All' || migration.taxonomicGroup === selectedGroup;
      const matchesSeason = selectedSeasonStatus === 'All' || migration.currentSeasonalStatus === selectedSeasonStatus;
      
      let matchesPreset = true;
      if (activePreset === 'threatened') {
        matchesPreset = migration.isThreatened;
      } else if (activePreset === 'altitudinal') {
        matchesPreset = !!migration.secondaryMigrationStatus?.includes('Altitudinal Migrant');
      }

      return matchesSearch && matchesDistrict && matchesScope && matchesStatus && matchesGroup && matchesSeason && matchesPreset;
    });
  }, [searchQuery, selectedDistrict, selectedScope, selectedStatus, selectedGroup, selectedSeasonStatus, activePreset]);

  // Dynamic Telemetry Metrics
  const metrics = useMemo(() => [
    { label: 'Tracked Species', value: migrationData.length, icon: 'Bird', sub: 'Palearctic & Endemic', preset: 'all' },
    { label: 'Winter Visitors', value: migrationData.filter(d => d.primaryMigrationStatus === 'Winter Visitor').length, icon: 'Wind', sub: 'Central Asian Flyway', preset: 'winter' },
    { label: 'Summer Breeders', value: migrationData.filter(d => d.primaryMigrationStatus === 'Summer Visitor').length, icon: 'Sun', sub: 'Forest & Montane', preset: 'summer' },
    { label: 'Threatened Migrants', value: migrationData.filter(d => d.isThreatened).length, icon: 'AlertTriangle', sub: 'ALL 34 Red-Listed', preset: 'threatened' },
    { label: 'AWC Winter Census', value: '1.34M+', icon: 'Snowflake', sub: '2025/2026 Count', preset: 'waterfowl' },
    { label: 'Altitudinal Shifters', value: migrationData.filter(d => d.secondaryMigrationStatus?.includes('Altitudinal Migrant')).length, icon: 'TrendingUp', sub: 'Snowline Vertical', preset: 'altitudinal' }
  ], []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CR': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'EN': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'VU': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'NT': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
    }
  };

  const getMigrationBadge = (mig: MigrationStatus) => {
    switch (mig) {
      case 'Winter Visitor':
        return <Badge variant="info" className="bg-sky-500/10 text-sky-300 border-sky-500/20">Winter Visitor</Badge>;
      case 'Summer Visitor':
      case 'Breeding Migrant':
        return <Badge variant="warning" className="bg-amber-500/10 text-amber-300 border-amber-500/20">{mig}</Badge>;
      case 'Altitudinal Migrant':
        return <Badge variant="success" className="bg-emerald-500/10 text-emerald-300 border-emerald-500/20">Altitudinal Shifter</Badge>;
      case 'Passage Migrant':
        return <Badge variant="outline" className="bg-purple-500/10 text-purple-300 border-purple-500/20">Passage Migrant</Badge>;
      default:
        return <Badge variant="outline" className="border-white/20 text-slate-300">{mig}</Badge>;
    }
  };

  // Helper to determine presence for a given month
  const getMonthActivity = (migration: MigrationWindow, month: Month) => {
    const isPeak = migration.peakObservationMonths?.includes(month);
    const isLow = migration.lowObservationMonths?.includes(month);

    // Winter visitor months: typically Oct/Nov to March/Apr
    if (migration.primaryMigrationStatus === 'Winter Visitor') {
      const winterMonths = ['November', 'December', 'January', 'February'];
      const transitMonths = ['October', 'March', 'April'];
      if (winterMonths.includes(month)) return 'winter';
      if (transitMonths.includes(month)) return 'transit';
      return isLow ? 'absent' : 'low';
    }

    // Summer visitor / breeding
    if (migration.primaryMigrationStatus === 'Summer Visitor' || migration.primaryMigrationStatus === 'Breeding Migrant') {
      const breedMonths = ['May', 'June', 'July'];
      const transitMonths = ['April', 'August', 'September'];
      if (breedMonths.includes(month)) return 'breeding';
      if (transitMonths.includes(month)) return 'transit';
      return isLow ? 'absent' : 'low';
    }

    // Altitudinal migrant
    if (migration.primaryMigrationStatus === 'Altitudinal Migrant') {
      const summerUpslope = ['May', 'June', 'July', 'August'];
      const winterDownslope = ['December', 'January', 'February'];
      if (summerUpslope.includes(month)) return 'upslope';
      if (winterDownslope.includes(month)) return 'downslope';
      return 'transit';
    }

    if (isPeak) return 'peak';
    if (isLow) return 'absent';
    return 'present';
  };

  const getMonthCellBg = (activity: string) => {
    switch (activity) {
      case 'winter': return 'bg-sky-500 text-white font-bold';
      case 'breeding': return 'bg-emerald-500 text-white font-bold';
      case 'upslope': return 'bg-teal-500 text-white font-bold';
      case 'downslope': return 'bg-indigo-500 text-white font-bold';
      case 'peak': return 'bg-emerald-500 text-white font-bold';
      case 'transit': return 'bg-amber-500/80 text-white';
      case 'present': return 'bg-slate-700 text-slate-300';
      default: return 'bg-slate-900/60 text-slate-600';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 pb-20">
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
                Migration Windows &amp; Flyway Intelligence
              </span>
            </div>
          </div>
        }
        subtitle="Authoritative Central Asian Flyway (CAF) & Altitudinal Migration Telemetry across Jammu, Kashmir & Ladakh. Backed by Asian Waterbird Census (AWC) 2025/2026 and eBird records."
        icon={<Wind className="w-6 h-6 text-sky-400" />}
        label="Biodiversity Intelligence · Avian Flyways"
        breadcrumbs={[
          { label: 'Biodiversity', href: '/biodiversity/overview' },
          { label: 'Migration Windows' }
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="border-sky-500/30 text-sky-300 hover:bg-sky-500/10" onClick={() => handlePreset('all')}>
              <Compass className="w-4 h-4 mr-1.5" />
              62 Monitored Species
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-sky-600 to-teal-500 text-white hover:from-sky-500 hover:to-teal-400" onClick={() => handlePreset('waterfowl')}>
              <Waves className="w-4 h-4 mr-1.5" />
              AWC Waterbirds
            </Button>
          </div>
        }
      />

      {/* Central Asian Flyway Banner */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-sky-950/70 to-slate-900/95 border border-sky-500/20 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20 text-sky-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-sky-400">Flyway Corridor Telemetry</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-400 uppercase font-semibold">Active CAF Route 04</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Staging hubs: <strong className="text-white">Hokersar (Ramsar)</strong>, <strong className="text-white">Wular (Ramsar)</strong>, <strong className="text-white">Shallabugh</strong>, <strong className="text-white">Haigam</strong>, <strong className="text-white">Gharana (Jammu)</strong>, and <strong className="text-white">Tso Moriri / Tso Kar (Ladakh)</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Asian Waterbird Census</div>
              <div className="text-sm font-bold text-sky-300">1,343,506 Avian Guests</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-xs font-semibold text-sky-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>AWC 2025/2026 Validated</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="container mx-auto px-4 lg:px-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {metrics.map((metric, idx) => {
              const IconComponent = metric.icon === 'Snowflake' ? Waves 
                                  : metric.icon === 'Sun' ? Sun 
                                  : metric.icon === 'TrendingUp' ? Mountain 
                                  : metric.icon === 'AlertTriangle' ? AlertTriangle 
                                  : Wind;
              const isActive = activePreset === metric.preset;
              return (
                <div 
                  key={idx} 
                  onClick={() => handlePreset(metric.preset)}
                  className={`cursor-pointer transition-all duration-200 transform hover:-translate-y-0.5 rounded-xl border p-3.5 backdrop-blur-md ${
                    isActive 
                      ? 'bg-sky-950/80 border-sky-400 shadow-lg shadow-sky-500/20' 
                      : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg shrink-0 ${isActive ? 'bg-sky-500 text-white' : 'bg-sky-500/10 text-sky-400'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="overflow-hidden">
                      <div className="text-xl font-black text-white leading-tight">
                        {metric.value}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-300 truncate">
                        {metric.label}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {metric.sub}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Preset Quick Filters */}
      <div className="container mx-auto px-4 lg:px-6 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Direct Flyway Presets:
          </span>
          {[
            { id: 'all', label: `All Species (${migrationData.length})` },
            { id: 'winter', label: `214 Winter Visitors` },
            { id: 'summer', label: `186 Summer Breeders` },
            { id: 'threatened', label: `34 Threatened Migrants (ALL)` },
            { id: 'waterfowl', label: `AWC Waterbirds (36)` },
            { id: 'altitudinal', label: `Altitudinal Shifters (10)` },
          ].map(preset => (
            <button
              key={preset.id}
              onClick={() => handlePreset(preset.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activePreset === preset.id
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 border border-sky-400'
                  : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/5'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filter Toolbar */}
      <div className="container mx-auto px-4 lg:px-6 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/40 border border-white/5 p-3 rounded-xl">
          <div className="flex items-center gap-2 flex-1 min-w-[240px] max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search species, local name (Ail, Rov, Thuj), habitat, origin..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-slate-950/80 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/10 text-slate-300 hover:text-white hover:bg-white/5" 
              icon={<Filter className="w-3.5 h-3.5" />} 
              onClick={() => setShowFilters(f => !f)}
            >
              {showFilters ? 'Hide Granular Filters' : 'Granular Filters'}
            </Button>
            <span className="text-xs text-slate-400 whitespace-nowrap">
              Showing <strong className="text-white">{filteredMigrations.length}</strong> of <strong className="text-white">{migrationData.length}</strong>
            </span>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 mt-3 glass-intense border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3"
          >
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Taxonomic Group</label>
              <select
                value={selectedGroup}
                onChange={(e) => { setSelectedGroup(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950/90 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              >
                <option value="All">All Groups</option>
                {allTaxonomicGroups.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Migration Pattern</label>
              <select
                value={selectedStatus}
                onChange={(e) => { setSelectedStatus(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950/90 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              >
                <option value="All">All Patterns</option>
                {allMigrationStatuses.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Administrative Scope</label>
              <select
                value={selectedScope}
                onChange={(e) => { setSelectedScope(e.target.value as any); setSelectedDistrict('All'); setCurrentPage(1); }}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950/90 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              >
                {availableScopes.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Admin District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => { setSelectedDistrict(e.target.value); setCurrentPage(1); }}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950/90 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              >
                <option value="All">All Districts</option>
                {availableDistricts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Current Activity</label>
              <select
                value={selectedSeasonStatus}
                onChange={(e) => { setSelectedSeasonStatus(e.target.value as any); setCurrentPage(1); }}
                className="w-full px-3 py-1.5 text-xs rounded-lg bg-slate-950/90 border border-white/10 text-white focus:outline-none focus:border-sky-500"
              >
                <option value="All">All Activities</option>
                {allSeasonalStatuses.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Migration Grid */}
      <div className="container mx-auto px-4 lg:px-6">
        {filteredMigrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMigrations.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((migration, idx) => (
              <motion.div key={migration.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.04 }}>
                <Card className="h-full flex flex-col overflow-hidden border border-white/10 bg-slate-900/60 hover:border-sky-500/40 transition-all duration-300 group" padding="none">
                  
                  {/* Card Header */}
                  <div className="p-4 border-b border-white/5 bg-white/[0.02] relative">
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      {getMigrationBadge(migration.primaryMigrationStatus)}
                      <Badge variant="outline" className="border-white/10 text-slate-400 text-[10px]">{migration.taxonomicGroup}</Badge>
                      <Badge variant="default" className={`text-[10px] px-1.5 py-0.2 ${getStatusColor(migration.conservationStatus)}`}>
                        {migration.conservationStatus}
                      </Badge>
                      {migration.localName && (
                        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium">
                          {migration.localName}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-sky-300 transition-colors">
                      {migration.commonName}
                    </h3>
                    <p className="text-xs italic text-slate-400 mb-3">{migration.scientificName}</p>

                    {/* Flight & Telemetry Row */}
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 bg-black/30 p-2 rounded-lg border border-white/5 mb-2">
                      <div className="flex items-center gap-1.5 truncate">
                        <Compass className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="truncate" title={migration.flywayOrigin || 'Local Altitudinal'}>
                          {migration.flywayOrigin || 'Himalayan Ridge'}
                        </span>
                      </div>
                      <div className="flex items-center justify-end gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span className="truncate font-medium text-amber-300">
                          {migration.springArrivalWindow || migration.winteringWindow || migration.breedingWindow || 'Seasonal'}
                        </span>
                      </div>
                    </div>

                    {/* 12-Month Phenology Calendar Bar */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-[9px] text-slate-500 uppercase tracking-wider mb-1">
                        <span>12-Month Presence</span>
                        <span className="text-[10px] text-slate-400 lowercase">{migration.currentSeasonalStatus}</span>
                      </div>
                      <div className="grid grid-cols-12 gap-0.5 bg-black/40 p-1 rounded-md border border-white/5">
                        {MONTHS.map((m, mIdx) => {
                          const activity = getMonthActivity(migration, m);
                          return (
                            <div
                              key={m}
                              title={`${MONTH_SHORT[mIdx]}: ${activity}`}
                              className={`h-4 rounded-xs text-[8px] flex items-center justify-center transition-colors ${getMonthCellBg(activity)}`}
                            >
                              {MONTH_SHORT[mIdx].charAt(0)}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Body */}
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-xs text-slate-300 mb-3 line-clamp-2 leading-relaxed">
                      {migration.shortDescription}
                    </p>

                    {/* Census / Elevation telemetry */}
                    <div className="space-y-1.5 mb-3 text-[11px]">
                      {migration.censusCountEst && (
                        <div className="flex items-center justify-between text-slate-400 bg-white/[0.02] px-2 py-1 rounded border border-white/5">
                          <span className="flex items-center gap-1 text-slate-400">
                            <Waves className="w-3 h-3 text-sky-400" /> Count Est:
                          </span>
                          <span className="font-semibold text-slate-200">{migration.censusCountEst}</span>
                        </div>
                      )}
                      {migration.elevationShift && (
                        <div className="flex items-center justify-between text-slate-400 bg-white/[0.02] px-2 py-1 rounded border border-white/5">
                          <span className="flex items-center gap-1 text-slate-400">
                            <Mountain className="w-3 h-3 text-teal-400" /> Elevation:
                          </span>
                          <span className="font-semibold text-slate-200 truncate max-w-[170px]" title={migration.elevationShift}>
                            {migration.elevationShift}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Key Threats */}
                    <div className="mb-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Documented Threats</div>
                      <div className="flex flex-wrap gap-1">
                        {migration.threats.slice(0, 2).map((threat, tIdx) => (
                          <span key={tIdx} className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-300 border border-red-500/20">
                            {threat.threatType}
                          </span>
                        ))}
                        {migration.threats.length > 2 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                            +{migration.threats.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <div className="mt-auto pt-2 flex items-center justify-between gap-2 border-t border-white/5">
                      <span className="text-[10px] text-slate-500">
                        {migration.districtsCount} Districts
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setSelectedMigration(migration)} 
                        className="border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-white transition-colors text-xs py-1"
                      >
                        Detailed Telemetry
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {/* Pagination */}
            {filteredMigrations.length > itemsPerPage && (
              <div className="flex flex-col items-center justify-center gap-3 mt-8 w-full col-span-full">
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
                    {Array.from({ length: Math.ceil(filteredMigrations.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      if (page === 1 || page === Math.ceil(filteredMigrations.length / itemsPerPage) || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                              currentPage === page ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      if (page === currentPage - 2 || page === currentPage + 2) return <span key={page} className="text-slate-600 px-1 text-xs">...</span>;
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredMigrations.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredMigrations.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, filteredMigrations.length)} of {filteredMigrations.length} profiles
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/30 rounded-2xl border border-white/5">
            <Wind className="w-14 h-14 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No migration profiles match criteria</h3>
            <p className="text-xs text-slate-400 mb-4">Try clearing your search query or selecting a different preset.</p>
            <Button variant="outline" size="sm" className="border-white/20 text-white" onClick={() => handlePreset('all')}>
              Reset All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Detailed Telemetry Modal */}
      <AnimatePresence>
        {selectedMigration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl shadow-sky-950/50"
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 border-b border-white/10 bg-white/[0.02] flex items-start justify-between relative">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {getMigrationBadge(selectedMigration.primaryMigrationStatus)}
                    <Badge variant="outline" className="border-white/20">{selectedMigration.taxonomicGroup}</Badge>
                    <Badge variant="default" className={getStatusColor(selectedMigration.conservationStatus)}>
                      IUCN: {selectedMigration.conservationStatus}
                    </Badge>
                    {selectedMigration.localName && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-semibold">
                        Kashmiri: {selectedMigration.localName}
                      </span>
                    )}
                  </div>
                  <h2 className="text-2xl font-black text-white">{selectedMigration.commonName}</h2>
                  <p className="text-sky-400 italic text-sm">{selectedMigration.scientificName}</p>
                </div>
                <button
                  onClick={() => setSelectedMigration(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
                
                {/* 12-Month Detailed Phenology Matrix */}
                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sky-400" /> Annual 12-Month Phenology Matrix
                  </h4>
                  <div className="grid grid-cols-12 gap-1 mb-3">
                    {MONTHS.map((m, idx) => {
                      const act = getMonthActivity(selectedMigration, m);
                      return (
                        <div key={m} className="flex flex-col items-center">
                          <div className={`w-full py-1.5 rounded text-[10px] text-center font-bold mb-1 ${getMonthCellBg(act)}`}>
                            {MONTH_SHORT[idx]}
                          </div>
                          <span className="text-[9px] text-slate-400 capitalize truncate max-w-full text-center">
                            {act}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-xs text-slate-300 bg-white/[0.02] p-2.5 rounded-lg border border-white/5 flex gap-2 items-start">
                    <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <span>{selectedMigration.districtTimingNotes}</span>
                  </div>
                </div>

                {/* Timing Windows Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  {selectedMigration.springArrivalWindow && (
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <span className="block text-[10px] font-semibold text-slate-500 uppercase mb-1">Spring Arrival</span>
                      <span className="font-bold text-white">{selectedMigration.springArrivalWindow}</span>
                    </div>
                  )}
                  {selectedMigration.breedingWindow && (
                    <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                      <span className="block text-[10px] font-semibold text-emerald-400 uppercase mb-1">Breeding Window</span>
                      <span className="font-bold text-emerald-300">{selectedMigration.breedingWindow}</span>
                    </div>
                  )}
                  {selectedMigration.winteringWindow && (
                    <div className="p-3 rounded-lg bg-sky-500/10 border border-sky-500/20">
                      <span className="block text-[10px] font-semibold text-sky-400 uppercase mb-1">Wintering Window</span>
                      <span className="font-bold text-sky-300">{selectedMigration.winteringWindow}</span>
                    </div>
                  )}
                  {selectedMigration.departureWindow && (
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <span className="block text-[10px] font-semibold text-amber-400 uppercase mb-1">Departure Window</span>
                      <span className="font-bold text-amber-300">{selectedMigration.departureWindow}</span>
                    </div>
                  )}
                </div>

                {/* Flyway Telemetry & Habitat */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Compass className="w-4 h-4 text-sky-400" /> Flyway & Route Dynamics
                    </h4>
                    <div className="space-y-2 text-xs">
                      {selectedMigration.flywayOrigin && (
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Breeding / Origin Grounds:</span>
                          <span className="font-semibold text-white">{selectedMigration.flywayOrigin}</span>
                        </div>
                      )}
                      {selectedMigration.flightDistanceKm && (
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">One-way Flyway Distance:</span>
                          <span className="font-semibold text-sky-300">~{selectedMigration.flightDistanceKm.toLocaleString()} km</span>
                        </div>
                      )}
                      {selectedMigration.censusCountEst && (
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Census Abundance:</span>
                          <span className="font-semibold text-emerald-300">{selectedMigration.censusCountEst}</span>
                        </div>
                      )}
                      {selectedMigration.elevationShift && (
                        <div className="flex justify-between py-1 border-b border-white/5">
                          <span className="text-slate-400">Elevation Movement:</span>
                          <span className="font-semibold text-amber-300">{selectedMigration.elevationShift}</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-4">
                      <div className="text-[10px] font-semibold text-slate-500 uppercase mb-1.5">Main Habitats</div>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedMigration.mainHabitats.map(h => (
                          <span key={h} className="text-[10px] uppercase px-2 py-0.5 bg-sky-500/10 text-sky-300 rounded border border-sky-500/20">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Threat Intelligence */}
                  <div className="bg-slate-950/50 p-4 rounded-xl border border-white/5">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" /> Threat Intelligence & Conservation
                    </h4>
                    <div className="space-y-2.5">
                      {selectedMigration.threats.map((threat, idx) => (
                        <div key={idx} className="bg-red-500/5 border border-red-500/15 p-2.5 rounded-lg text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-red-400">{threat.threatType}</span>
                            <span className="text-[10px] uppercase font-semibold px-1.5 py-0.2 rounded bg-red-500/20 text-red-300">
                              {threat.severity} Severity
                            </span>
                          </div>
                          <p className="text-slate-300 text-[11px] leading-relaxed">{threat.narrative}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Regional Presence */}
                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" /> Regional Presence across Western Himalaya
                  </h4>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedMigration.regionsPresent.map(r => (
                      <Badge key={r} variant="outline" className="bg-white/5 border-white/10 text-xs">
                        {r}
                      </Badge>
                    ))}
                  </div>
                  {selectedMigration.hotspotsLinked.length > 0 && (
                    <div className="text-[11px] text-slate-400 mt-2">
                      Linked Staging Hotspots: <span className="text-slate-200">{selectedMigration.hotspotsLinked.map(h => h.replace('hotspot-', '')).join(', ')}</span>
                    </div>
                  )}
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-white/10 bg-black/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Verified via <strong className="text-white">{selectedMigration.validation.sourceName}</strong> ({selectedMigration.validation.sourceYear}) · Confidence: <strong className="text-emerald-400">{selectedMigration.validation.confidence}</strong>
                  </span>
                </div>
                <Button 
                  size="sm" 
                  className="bg-sky-600 hover:bg-sky-500 text-white w-full sm:w-auto"
                  onClick={() => setSelectedMigration(null)}
                >
                  Close Profile
                </Button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
