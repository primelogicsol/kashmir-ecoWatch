'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DistrictForestData } from '@/data/forest-ecosystems';
import { 
  Trees, AlertTriangle, Crosshair, Activity, TrendingUp,
  Search, Filter, Shield, ArrowUpDown, ChevronDown, Check,
  Layers, MapPin, Sparkles, AlertCircle, Eye, Table as TableIcon, LayoutGrid
} from 'lucide-react';

interface DistrictFiveIndicatorsMatrixProps {
  districts: DistrictForestData[];
}

type PillarFocus = 'all' | 'dense' | 'risks' | 'fragmentation' | 'disturbances' | 'regeneration';
type ScopeFilter = 'all' | 'Kashmir Core' | 'Jammu Division' | 'Ladakh Division' | 'Azad Kashmir' | 'Gilgit-Baltistan';
type UrgencyFilter = 'all' | 'dense-only' | 'critical-risks' | 'severe-disturbances' | 'high-fragmentation' | 'depleted-regen' | 'robust-regen';
type SortField = 'name' | 'coverSqKm' | 'canopyClosure' | 'riskScore' | 'contiguity' | 'disturbanceScore' | 'seedlingDensity';

export function DistrictFiveIndicatorsMatrix({ districts }: DistrictFiveIndicatorsMatrixProps) {
  const [pillarFocus, setPillarFocus] = useState<PillarFocus>('all');
  const [scopeFilter, setScopeFilter] = useState<ScopeFilter>('all');
  const [urgencyFilter, setUrgencyFilter] = useState<UrgencyFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [sortField, setSortField] = useState<SortField>('riskScore');
  const [sortAsc, setSortAsc] = useState(false);

  // Overall aggregate metrics across input dataset
  const aggregateMetrics = useMemo(() => {
    const total = districts.length;
    const denseDistricts = districts.filter(d => (d.Forest_Cover_Class || '').includes('Dense'));
    const totalDenseArea = districts.reduce((acc, d) => acc + (d.Dense_Forest_SqKm || 0), 0);
    const criticalRisks = districts.filter(d => d.Deforestation_Risk === 'Critical');
    const severeDisturbances = districts.filter(d => d.Disturbance_Level === 'Severe');
    const highFragmentation = districts.filter(d => d.Fragmentation_Level === 'High' || d.Fragmentation_Level === 'Critical');
    const robustRegen = districts.filter(d => d.Regeneration_Status === 'Robust' || d.Regeneration_Status === 'Good');
    const depletedRegen = districts.filter(d => d.Regeneration_Status === 'Poor' || d.Regeneration_Status === 'Critical');

    return {
      total,
      denseCount: denseDistricts.length,
      totalDenseArea: Math.round(totalDenseArea),
      criticalRiskCount: criticalRisks.length,
      severeDisturbanceCount: severeDisturbances.length,
      highFragCount: highFragmentation.length,
      robustRegenCount: robustRegen.length,
      depletedRegenCount: depletedRegen.length
    };
  }, [districts]);

  // Filtered & Sorted Districts
  const filteredDistricts = useMemo(() => {
    let result = districts.filter(d => {
      // Scope filter
      if (scopeFilter !== 'all' && d.Administrative_Scope !== scopeFilter) return false;

      // Urgency filter
      if (urgencyFilter === 'dense-only' && !(d.Forest_Cover_Class || '').includes('Dense')) return false;
      if (urgencyFilter === 'critical-risks' && d.Deforestation_Risk !== 'Critical') return false;
      if (urgencyFilter === 'severe-disturbances' && d.Disturbance_Level !== 'Severe') return false;
      if (urgencyFilter === 'high-fragmentation' && !['High', 'Critical'].includes(d.Fragmentation_Level)) return false;
      if (urgencyFilter === 'depleted-regen' && !['Poor', 'Critical'].includes(d.Regeneration_Status)) return false;
      if (urgencyFilter === 'robust-regen' && !['Robust', 'Good'].includes(d.Regeneration_Status)) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = d.District_Name.toLowerCase().includes(query);
        const matchesBasin = (d.Watershed_Basin || '').toLowerCase().includes(query);
        const matchesScope = d.Administrative_Scope.toLowerCase().includes(query);
        const matchesDrivers = (d.Critical_Risk_Drivers || []).some(dr => dr.toLowerCase().includes(query));
        const matchesVectors = (d.Disturbance_Vectors || []).some(v => v.toLowerCase().includes(query));
        if (!matchesName && !matchesBasin && !matchesScope && !matchesDrivers && !matchesVectors) return false;
      }

      return true;
    });

    // Sorting
    result.sort((a, b) => {
      let valA: any = 0;
      let valB: any = 0;

      switch (sortField) {
        case 'name':
          valA = a.District_Name;
          valB = b.District_Name;
          return sortAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        case 'coverSqKm':
          valA = a.Dense_Forest_SqKm || a.Forest_Cover_SqKm || 0;
          valB = b.Dense_Forest_SqKm || b.Forest_Cover_SqKm || 0;
          break;
        case 'canopyClosure':
          valA = a.Canopy_Closure_Percent || 0;
          valB = b.Canopy_Closure_Percent || 0;
          break;
        case 'riskScore': {
          const riskWeight = (r: string) => r === 'Critical' ? 4 : r === 'High' ? 3 : r.includes('Medium') ? 2 : 1;
          valA = riskWeight(a.Deforestation_Risk);
          valB = riskWeight(b.Deforestation_Risk);
          break;
        }
        case 'contiguity':
          valA = a.Core_Contiguity_Percent || 0;
          valB = b.Core_Contiguity_Percent || 0;
          break;
        case 'disturbanceScore':
          valA = a.Disturbance_Score || 0;
          valB = b.Disturbance_Score || 0;
          break;
        case 'seedlingDensity':
          valA = a.Seedling_Density_Per_Ha || 0;
          valB = b.Seedling_Density_Per_Ha || 0;
          break;
      }

      return sortAsc ? valA - valB : valB - valA;
    });

    return result;
  }, [districts, scopeFilter, urgencyFilter, searchQuery, sortField, sortAsc]);

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="space-y-8 mt-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/60 border border-emerald-500/20 p-6 lg:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Pan-Himalayan Landscape Intelligence Layer
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Dense Forests, Critical Risks, Fragmentation, Disturbances & Regeneration
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Standardized, high-resolution ecological telemetry spanning all <span className="text-emerald-400 font-bold">46 districts</span> across Kashmir Core, Jammu, Ladakh, Azad Kashmir, and Gilgit-Baltistan. Real-time convergence of satellite canopy density, threat vectors, spatial contiguity, and understory reproductive health.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <Button
              size="sm"
              variant={viewMode === 'cards' ? 'primary' : 'outline'}
              onClick={() => setViewMode('cards')}
              className={viewMode === 'cards' ? 'bg-emerald-600 hover:bg-emerald-500' : 'border-white/20 text-white'}
              icon={<LayoutGrid className="w-4 h-4" />}
            >
              Card Matrix
            </Button>
            <Button
              size="sm"
              variant={viewMode === 'table' ? 'primary' : 'outline'}
              onClick={() => setViewMode('table')}
              className={viewMode === 'table' ? 'bg-emerald-600 hover:bg-emerald-500' : 'border-white/20 text-white'}
              icon={<TableIcon className="w-4 h-4" />}
            >
              Comparative Table
            </Button>
          </div>
        </div>

        {/* 5 Indicator Aggregate Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-white/10">
          <div className="bg-black/30 border border-emerald-500/20 rounded-xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase tracking-wider text-[10px] font-bold text-emerald-400 flex items-center gap-1.5">
                <Trees className="w-3.5 h-3.5" /> Dense Forests
              </span>
              <Badge variant="success" size="sm">{aggregateMetrics.denseCount}/46</Badge>
            </div>
            <div className="mt-2">
              <div className="text-xl lg:text-2xl font-black text-white tabular-nums">
                {aggregateMetrics.totalDenseArea.toLocaleString()} <span className="text-xs font-normal text-slate-400">km²</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Very Dense + Mod. Dense Canopy</div>
            </div>
          </div>

          <div className="bg-black/30 border border-rose-500/20 rounded-xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase tracking-wider text-[10px] font-bold text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Critical Risks
              </span>
              <Badge variant="danger" size="sm">{aggregateMetrics.criticalRiskCount} Alerts</Badge>
            </div>
            <div className="mt-2">
              <div className="text-xl lg:text-2xl font-black text-rose-400 tabular-nums">
                {aggregateMetrics.criticalRiskCount} <span className="text-xs font-normal text-slate-400">Districts</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Sprawl, Logging, Dam Inundation</div>
            </div>
          </div>

          <div className="bg-black/30 border border-amber-500/20 rounded-xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase tracking-wider text-[10px] font-bold text-amber-400 flex items-center gap-1.5">
                <Crosshair className="w-3.5 h-3.5" /> Fragmentation
              </span>
              <Badge variant="warning" size="sm">{aggregateMetrics.highFragCount} Fragile</Badge>
            </div>
            <div className="mt-2">
              <div className="text-xl lg:text-2xl font-black text-amber-400 tabular-nums">
                {aggregateMetrics.highFragCount} <span className="text-xs font-normal text-slate-400">Districts</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Severe Edge & Patch Isolation</div>
            </div>
          </div>

          <div className="bg-black/30 border border-orange-500/20 rounded-xl p-3.5 flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase tracking-wider text-[10px] font-bold text-orange-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" /> Disturbances
              </span>
              <Badge variant="danger" size="sm">{aggregateMetrics.severeDisturbanceCount} Severe</Badge>
            </div>
            <div className="mt-2">
              <div className="text-xl lg:text-2xl font-black text-orange-400 tabular-nums">
                {aggregateMetrics.severeDisturbanceCount} <span className="text-xs font-normal text-slate-400">Districts</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Blasting, Hydro, Overgrazing</div>
            </div>
          </div>

          <div className="bg-black/30 border border-teal-500/20 rounded-xl p-3.5 flex flex-col justify-between col-span-2 sm:col-span-1">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="uppercase tracking-wider text-[10px] font-bold text-teal-400 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" /> Regeneration
              </span>
              <Badge variant="outline" size="sm" className="border-teal-500/30 text-teal-300">{aggregateMetrics.robustRegenCount} Robust</Badge>
            </div>
            <div className="mt-2">
              <div className="text-xl lg:text-2xl font-black text-teal-300 tabular-nums">
                {aggregateMetrics.depletedRegenCount} <span className="text-xs font-normal text-rose-400">Depleted</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">Seedling Deficit Requiring SMC/ANR</div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Focus Pillars, Scopes, Urgency Filters, Search, Sorting */}
      <div className="space-y-4 bg-slate-900/60 border border-white/10 rounded-2xl p-4 lg:p-5 glass-intense">
        {/* Row 1: Focus Pillar Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" /> Focus Indicator:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All 5 Indicators', icon: Sparkles },
              { id: 'dense', label: '🌲 Dense Forests', icon: Trees },
              { id: 'risks', label: '⚠️ Critical Risks', icon: AlertTriangle },
              { id: 'fragmentation', label: '🧩 Fragmentation', icon: Crosshair },
              { id: 'disturbances', label: '⚡ Disturbances', icon: Activity },
              { id: 'regeneration', label: '🌱 Regeneration', icon: TrendingUp },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setPillarFocus(tab.id as PillarFocus)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  pillarFocus === tab.id
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: Administrative Scope Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-cyan-400" /> Administrative Scope:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: 'All 46 Districts (46)' },
              { id: 'Kashmir Core', label: 'Kashmir Core (10)' },
              { id: 'Jammu Division', label: 'Jammu Division (10)' },
              { id: 'Ladakh Division', label: 'Ladakh Division (2)' },
              { id: 'Azad Kashmir', label: 'Azad Kashmir (10)' },
              { id: 'Gilgit-Baltistan', label: 'Gilgit-Baltistan (14)' },
            ].map(scope => (
              <button
                key={scope.id}
                onClick={() => setScopeFilter(scope.id as ScopeFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  scopeFilter === scope.id
                    ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {scope.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Quick Urgency Filters, Search & Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-1">
          {/* Urgency Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Urgency Filter:
            </span>
            {[
              { id: 'all', label: 'All Districts' },
              { id: 'dense-only', label: 'Dense Only (26)', variant: 'border-emerald-500/30 text-emerald-300' },
              { id: 'critical-risks', label: 'Critical Risks (12)', variant: 'border-rose-500/30 text-rose-300' },
              { id: 'severe-disturbances', label: 'Severe Disturbance (18)', variant: 'border-orange-500/30 text-orange-300' },
              { id: 'high-fragmentation', label: 'High Frag (18)', variant: 'border-amber-500/30 text-amber-300' },
              { id: 'depleted-regen', label: 'Depleted Regen (21)', variant: 'border-rose-400/30 text-rose-300' },
              { id: 'robust-regen', label: 'Robust Regen (16)', variant: 'border-teal-400/30 text-teal-300' }
            ].map(urg => (
              <button
                key={urg.id}
                onClick={() => setUrgencyFilter(urg.id as UrgencyFilter)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium border transition-colors ${
                  urgencyFilter === urg.id
                    ? 'bg-emerald-500/20 border-emerald-500 text-white font-bold'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {urg.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search district, threats, vectors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-black/40 border border-white/10 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value as SortField)}
                className="text-xs bg-slate-950 border border-white/20 rounded-lg px-2.5 py-1.5 text-white font-medium focus:outline-none focus:border-emerald-500 cursor-pointer"
                style={{ backgroundColor: '#020617', color: '#ffffff' }}
              >
                <option value="riskScore" className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Deforestation Risk</option>
                <option value="disturbanceScore" className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Disturbance Score</option>
                <option value="canopyClosure" className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Canopy Closure %</option>
                <option value="coverSqKm" className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Dense Area (km²)</option>
                <option value="contiguity" className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Core Contiguity %</option>
                <option value="seedlingDensity" className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>Seedling Density</option>
                <option value="name" className="bg-slate-900 text-white font-medium" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>District Name</option>
              </select>

              <button
                onClick={() => setSortAsc(!sortAsc)}
                className="p-1.5 rounded-lg bg-black/40 border border-white/10 text-slate-400 hover:text-white"
                title={sortAsc ? 'Ascending' : 'Descending'}
              >
                <ArrowUpDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Result Counter */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div>
          Showing <span className="text-white font-bold">{filteredDistricts.length}</span> of {districts.length} monitored districts
          {scopeFilter !== 'all' && <span> in <span className="text-cyan-400 font-semibold">{scopeFilter}</span></span>}
          {urgencyFilter !== 'all' && <span> (<span className="text-amber-400">{urgencyFilter}</span>)</span>}
        </div>
        {(searchQuery || scopeFilter !== 'all' || urgencyFilter !== 'all') && (
          <button
            onClick={() => {
              setSearchQuery('');
              setScopeFilter('all');
              setUrgencyFilter('all');
            }}
            className="text-emerald-400 hover:underline"
          >
            Reset All Filters
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* VIEW MODE 1: COMPREHENSIVE CARDS MATRIX */}
      {/* ========================================================================= */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDistricts.map((d) => {
            const isCriticalRisk = d.Deforestation_Risk === 'Critical';
            const isSevereDisturbance = d.Disturbance_Level === 'Severe';
            const isDenseForest = (d.Forest_Cover_Class || '').includes('Dense');
            const isHighFrag = ['High', 'Critical'].includes(d.Fragmentation_Level);
            const isDepletedRegen = ['Poor', 'Critical'].includes(d.Regeneration_Status);
            const isRobustRegen = ['Robust', 'Good'].includes(d.Regeneration_Status);

            const cardBorderColor = isCriticalRisk 
              ? 'border-rose-500/40 hover:border-rose-500/70' 
              : isSevereDisturbance 
              ? 'border-orange-500/30 hover:border-orange-500/60' 
              : 'border-white/10 hover:border-emerald-500/50';

            const cardBgGradient = isCriticalRisk
              ? 'bg-gradient-to-br from-[#1a0f0f] via-slate-900 to-[#0f0a0a]'
              : isSevereDisturbance
              ? 'bg-gradient-to-br from-[#1f120a] via-slate-900 to-[#0f0a0a]'
              : 'bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/20';

            return (
              <Card key={d.District_ID} className={`glass-intense p-5 ${cardBorderColor} ${cardBgGradient} transition-all duration-200 flex flex-col justify-between`}>
                <div>
                  {/* Card Header: District Name, Scope, Canopy Gauge, Risk Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4 pb-3 border-b border-white/10">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-white">{d.District_Name}</h3>
                        <Badge variant="outline" size="sm" className="text-[10px] border-white/20 text-slate-300">
                          {d.Administrative_Scope}
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                        <span>Basin: <strong className="text-sky-300">{d.Watershed_Basin}</strong></span>
                        <span>•</span>
                        <span>Elev: {d.Elevation_Min_m} - {d.Elevation_Max_m}m</span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <Badge 
                        variant={isCriticalRisk ? 'danger' : d.Deforestation_Risk === 'High' ? 'warning' : 'success'} 
                        size="sm"
                        className={isCriticalRisk ? 'animate-pulse' : ''}
                      >
                        {d.Deforestation_Risk} Risk
                      </Badge>
                      <div className="text-[9px] uppercase tracking-wider text-slate-500 mt-1">
                        {d.Early_Warning_Status}
                      </div>
                    </div>
                  </div>

                  {/* 5-Indicator Visual Stacks */}
                  <div className="space-y-4">
                    {/* INDICATOR 1: DENSE FORESTS */}
                    <div className={`p-3 rounded-xl border transition-all ${
                      pillarFocus === 'dense' ? 'ring-2 ring-emerald-500 bg-emerald-950/40 border-emerald-500/50' : 'bg-black/25 border-white/5'
                    }`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-1.5">
                          <Trees className="w-3.5 h-3.5" /> Dense Forests (VDF + MDF)
                        </span>
                        <span className="text-xs font-black text-white tabular-nums">
                          {d.Dense_Forest_SqKm ? `${d.Dense_Forest_SqKm.toLocaleString()} km²` : `${d.Forest_Cover_SqKm} km²`}
                        </span>
                      </div>

                      {/* Canopy Closure Meter */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span className="text-[10px]">Canopy Closure: <strong className="text-emerald-300">{d.Canopy_Closure_Percent ?? d.Forest_Cover_Percent}%</strong></span>
                          <span className="text-[10px]">Class: <strong className="text-white">{d.Forest_Cover_Class}</strong></span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-white/5">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              (d.Canopy_Closure_Percent || 0) >= 65 ? 'bg-gradient-to-r from-emerald-500 to-teal-400' :
                              (d.Canopy_Closure_Percent || 0) >= 40 ? 'bg-gradient-to-r from-teal-500 to-cyan-500' :
                              'bg-gradient-to-r from-amber-500 to-orange-500'
                            }`}
                            style={{ width: `${Math.min(d.Canopy_Closure_Percent || 20, 100)}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-[10px] text-slate-400 mt-2 pt-1.5 border-t border-white/5">
                        <span>VDF: <strong className="text-white">{d.Very_Dense_Forest_SqKm || 0} km²</strong></span>
                        <span>MDF: <strong className="text-white">{d.Moderately_Dense_Forest_SqKm || 0} km²</strong></span>
                        <span>Open: <strong className="text-white">{d.Open_Forest_SqKm || 0} km²</strong></span>
                      </div>
                    </div>

                    {/* INDICATOR 2: CRITICAL RISKS */}
                    <div className={`p-3 rounded-xl border transition-all ${
                      pillarFocus === 'risks' ? 'ring-2 ring-rose-500 bg-rose-950/40 border-rose-500/50' : 'bg-black/25 border-white/5'
                    }`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-rose-400 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> Critical Risks & Drivers
                        </span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          isCriticalRisk ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
                        }`}>
                          {d.Deforestation_Risk}
                        </span>
                      </div>

                      {d.Critical_Risk_Drivers && d.Critical_Risk_Drivers.length > 0 ? (
                        <div className="space-y-1">
                          {d.Critical_Risk_Drivers.slice(0, 2).map((driver, idx) => (
                            <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                              <span className="text-rose-400 mt-0.5 text-xs">•</span>
                              <span className="text-[11px] leading-tight text-slate-300">{driver}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-[11px] text-slate-500 italic">No acute risk alerts triggered.</div>
                      )}
                    </div>

                    {/* INDICATOR 3: FRAGMENTATION (CORE / EDGE / PATCH) */}
                    <div className={`p-3 rounded-xl border transition-all ${
                      pillarFocus === 'fragmentation' ? 'ring-2 ring-amber-500 bg-amber-950/40 border-amber-500/50' : 'bg-black/25 border-white/5'
                    }`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 flex items-center gap-1.5">
                          <Crosshair className="w-3.5 h-3.5" /> Spatial Fragmentation
                        </span>
                        <span className="text-xs font-bold text-slate-300">
                          {d.Core_Contiguity_Percent ?? 60}% Core
                        </span>
                      </div>

                      {/* Segmented Core/Edge/Patch Bar */}
                      <div className="h-2.5 w-full bg-slate-950 rounded-full flex overflow-hidden border border-white/5 my-1.5">
                        <div 
                          className="bg-emerald-500 h-full transition-all" 
                          style={{ width: `${d.Core_Contiguity_Percent ?? 60}%` }} 
                          title={`Core Forest: ${d.Core_Contiguity_Percent ?? 60}%`} 
                        />
                        <div 
                          className="bg-amber-500 h-full transition-all" 
                          style={{ width: `${d.Edge_Vulnerability_Percent ?? 25}%` }} 
                          title={`Edge Forest: ${d.Edge_Vulnerability_Percent ?? 25}%`} 
                        />
                        <div 
                          className="bg-rose-500 h-full transition-all" 
                          style={{ width: `${d.Patch_Isolation_Percent ?? 15}%` }} 
                          title={`Patch/Isolated: ${d.Patch_Isolation_Percent ?? 15}%`} 
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-1 text-[10px] text-center text-slate-400 pt-0.5">
                        <div>Core: <strong className="text-emerald-400">{d.Core_Contiguity_Percent ?? 60}%</strong></div>
                        <div>Edge: <strong className="text-amber-400">{d.Edge_Vulnerability_Percent ?? 25}%</strong></div>
                        <div>Patch: <strong className="text-rose-400">{d.Patch_Isolation_Percent ?? 15}%</strong></div>
                      </div>
                    </div>

                    {/* INDICATOR 4: DISTURBANCES & IMPACT SCORE */}
                    <div className={`p-3 rounded-xl border transition-all ${
                      pillarFocus === 'disturbances' ? 'ring-2 ring-orange-500 bg-orange-950/40 border-orange-500/50' : 'bg-black/25 border-white/5'
                    }`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-orange-400 flex items-center gap-1.5">
                          <Activity className="w-3.5 h-3.5" /> Anthropogenic Disturbances
                        </span>
                        <span className={`text-xs font-black tabular-nums ${
                          (d.Disturbance_Score || 0) >= 80 ? 'text-rose-400' :
                          (d.Disturbance_Score || 0) >= 60 ? 'text-orange-400' :
                          'text-emerald-400'
                        }`}>
                          {d.Disturbance_Score || 45}<span className="text-[10px] text-slate-500 font-normal">/100</span>
                        </span>
                      </div>

                      {/* Disturbance Score Progress Bar */}
                      <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-white/5 mb-2">
                        <div
                          className={`h-full rounded-full ${
                            (d.Disturbance_Score || 0) >= 80 ? 'bg-rose-500' :
                            (d.Disturbance_Score || 0) >= 60 ? 'bg-orange-500' :
                            'bg-emerald-500'
                          }`}
                          style={{ width: `${d.Disturbance_Score || 45}%` }}
                        />
                      </div>

                      {/* Disturbance Vectors */}
                      {d.Disturbance_Vectors && d.Disturbance_Vectors.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {d.Disturbance_Vectors.map((vec, i) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                              {vec}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* INDICATOR 5: NATURAL REGENERATION */}
                    <div className={`p-3 rounded-xl border transition-all ${
                      pillarFocus === 'regeneration' ? 'ring-2 ring-teal-500 bg-teal-950/40 border-teal-500/50' : 'bg-black/25 border-white/5'
                    }`}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] uppercase tracking-wider font-bold text-teal-400 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" /> Reproductive Regeneration
                        </span>
                        <Badge 
                          variant={isRobustRegen ? 'success' : isDepletedRegen ? 'danger' : 'warning'} 
                          size="sm"
                        >
                          {d.Regeneration_Status}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-2 my-2 text-xs">
                        <div className="bg-black/30 p-2 rounded border border-white/5">
                          <div className="text-[9px] uppercase tracking-wider text-slate-500">Seedling Density</div>
                          <div className="text-sm font-black text-white tabular-nums">
                            {d.Seedling_Density_Per_Ha ? d.Seedling_Density_Per_Ha.toLocaleString() : '1,500'} <span className="text-[10px] font-normal text-slate-400">/ha</span>
                          </div>
                        </div>
                        <div className="bg-black/30 p-2 rounded border border-white/5">
                          <div className="text-[9px] uppercase tracking-wider text-slate-500">Sapling Recruitment</div>
                          <div className="text-sm font-black text-white tabular-nums">
                            {d.Sapling_Recruitment_Rate ?? 35}% <span className="text-[10px] font-normal text-slate-400">rate</span>
                          </div>
                        </div>
                      </div>

                      {d.Regeneration_Diagnosis && (
                        <p className="text-[10px] text-slate-400 leading-relaxed italic border-l-2 border-teal-500/30 pl-2 mt-1">
                          {d.Regeneration_Diagnosis}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Telemetry verification */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Source: {d.Primary_Data_Source}</span>
                  <span className="text-emerald-400 font-mono">{(d.Confidence_Level * 100).toFixed(0)}% Conf.</span>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW MODE 2: COMPREHENSIVE SORTABLE TABLE */}
      {/* ========================================================================= */}
      {viewMode === 'table' && (
        <div className="glass-intense border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/90 text-[10px] uppercase tracking-wider text-slate-400 font-bold border-b border-white/10">
                <tr>
                  <th onClick={() => toggleSort('name')} className="p-3.5 cursor-pointer hover:text-white">
                    <div className="flex items-center gap-1">District / Scope <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th onClick={() => toggleSort('coverSqKm')} className="p-3.5 cursor-pointer hover:text-white text-right">
                    <div className="flex items-center justify-end gap-1">Dense Area (km²) <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th onClick={() => toggleSort('canopyClosure')} className="p-3.5 cursor-pointer hover:text-white text-center">
                    <div className="flex items-center justify-center gap-1">Canopy Closure <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th onClick={() => toggleSort('riskScore')} className="p-3.5 cursor-pointer hover:text-white">
                    <div className="flex items-center gap-1">Critical Deforestation Risk <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th onClick={() => toggleSort('contiguity')} className="p-3.5 cursor-pointer hover:text-white text-center">
                    <div className="flex items-center justify-center gap-1">Core Contiguity <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th onClick={() => toggleSort('disturbanceScore')} className="p-3.5 cursor-pointer hover:text-white text-center">
                    <div className="flex items-center justify-center gap-1">Disturbance Score <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th onClick={() => toggleSort('seedlingDensity')} className="p-3.5 cursor-pointer hover:text-white text-right">
                    <div className="flex items-center justify-end gap-1">Seedlings /ha <ArrowUpDown className="w-3 h-3" /></div>
                  </th>
                  <th className="p-3.5">Regeneration Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredDistricts.map((d, idx) => {
                  const isCriticalRisk = d.Deforestation_Risk === 'Critical';
                  const isSevereDist = d.Disturbance_Level === 'Severe';
                  const isRobustRegen = ['Robust', 'Good'].includes(d.Regeneration_Status);
                  const isDepletedRegen = ['Poor', 'Critical'].includes(d.Regeneration_Status);

                  return (
                    <tr key={d.District_ID} className="hover:bg-white/[0.03] transition-colors">
                      <td className="p-3.5 font-medium text-white">
                        <div className="font-bold text-sm text-white">{d.District_Name}</div>
                        <div className="text-[10px] text-slate-400">{d.Administrative_Scope} • {d.Watershed_Basin}</div>
                      </td>

                      <td className="p-3.5 text-right font-mono font-bold text-emerald-400">
                        {d.Dense_Forest_SqKm ? d.Dense_Forest_SqKm.toLocaleString() : d.Forest_Cover_SqKm}
                        <div className="text-[10px] text-slate-500 font-normal">{d.Forest_Cover_Class}</div>
                      </td>

                      <td className="p-3.5 text-center font-mono">
                        <div className="font-bold text-white">{d.Canopy_Closure_Percent ?? d.Forest_Cover_Percent}%</div>
                        <div className="w-16 bg-slate-800 rounded-full h-1 mx-auto mt-1 overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${d.Canopy_Closure_Percent ?? 30}%` }} />
                        </div>
                      </td>

                      <td className="p-3.5">
                        <div className="flex items-center gap-2">
                          <Badge variant={isCriticalRisk ? 'danger' : d.Deforestation_Risk === 'High' ? 'warning' : 'success'} size="sm">
                            {d.Deforestation_Risk}
                          </Badge>
                          <span className="text-[10px] text-slate-500">{d.Early_Warning_Status}</span>
                        </div>
                        {d.Critical_Risk_Drivers && d.Critical_Risk_Drivers.length > 0 && (
                          <div className="text-[10px] text-slate-400 mt-1 truncate max-w-xs">
                            {d.Critical_Risk_Drivers[0]}
                          </div>
                        )}
                      </td>

                      <td className="p-3.5 text-center font-mono">
                        <div className="font-bold text-emerald-400">{d.Core_Contiguity_Percent ?? 60}%</div>
                        <div className="text-[10px] text-slate-500">{d.Fragmentation_Level}</div>
                      </td>

                      <td className="p-3.5 text-center font-mono">
                        <div className={`font-black ${
                          (d.Disturbance_Score || 0) >= 80 ? 'text-rose-400' :
                          (d.Disturbance_Score || 0) >= 60 ? 'text-orange-400' :
                          'text-emerald-400'
                        }`}>
                          {d.Disturbance_Score || 45}/100
                        </div>
                        <div className="text-[10px] text-slate-500">{d.Disturbance_Level}</div>
                      </td>

                      <td className="p-3.5 text-right font-mono font-bold text-white">
                        {d.Seedling_Density_Per_Ha ? d.Seedling_Density_Per_Ha.toLocaleString() : '1,500'}
                        <div className="text-[10px] text-slate-500 font-normal">{d.Sapling_Recruitment_Rate ?? 35}% recruit</div>
                      </td>

                      <td className="p-3.5">
                        <Badge variant={isRobustRegen ? 'success' : isDepletedRegen ? 'danger' : 'warning'} size="sm">
                          {d.Regeneration_Status}
                        </Badge>
                        <div className="text-[10px] text-slate-400 mt-0.5">{d.Understory_Health || 'Moderate'} understory</div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
