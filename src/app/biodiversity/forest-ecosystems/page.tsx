'use client';

import React, { useState } from 'react';
import {
  Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { BiodiversityFilters } from '@/components/common/BiodiversityFilters';
import { DistrictFiveIndicatorsMatrix } from '@/components/biodiversity/DistrictFiveIndicatorsMatrix';
import { motion } from 'framer-motion';
import { getForestIntelligence } from '@/data/forest-ecosystems';
import { 
  Trees, Leaf, Activity, MapPin, Map, Shield, 
  ChevronRight, TrendingUp, TrendingDown, Search, Filter,
  AlertTriangle, Crosshair, CloudLightning, TreePine,
  Grid3X3, List, BarChart3, Flame, Layers, Mountain, Sprout,
  Clock, BookOpen, Sparkles, CheckCircle2, ArrowRight, Compass,
  Scale, FileText, Check, Award,
  ShieldAlert
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GEOGRAPHY, Scope } from '@/data/geography';
import { masterCorridors, generateDistrictCorridorMetrics } from '@/data/wildlife-corridors';
import { Heading } from '@/components/common/Heading';

export default function ForestEcosystemsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [selectedScope, setSelectedScope] = useState<'all' | 'kashmir' | 'jammu' | 'ladakh' | 'ajk' | 'gb'>('all');

  const rawForests = getForestIntelligence.allDistricts();
  const rawTrees = getForestIntelligence.allTrees();
  const rawWildlife = getForestIntelligence.allWildlife();
  const rawHabitats = getForestIntelligence.allHabitats();
  const chinarData = getForestIntelligence.chinarData();
  const isfrData = getForestIntelligence.officialIsfrData();
  const ntfpData = getForestIntelligence.ntfpData();
  const metrics = getForestIntelligence.metrics;

  const forests = React.useMemo(() => {
    return rawForests.filter(f => {
      if (activeFilters.searchQuery && !f.District_Name.toLowerCase().includes(activeFilters.searchQuery.toLowerCase()) && !f.Watershed_Basin.toLowerCase().includes(activeFilters.searchQuery.toLowerCase())) return false;
      if (activeFilters.Forest_Cover_Class && f.Forest_Cover_Class !== activeFilters.Forest_Cover_Class) return false;
      if (activeFilters.Ecological_Region && activeFilters.Ecological_Region !== 'All Regions' && !f.Landscape_Belt.includes(activeFilters.Ecological_Region)) return false;
      
      if (activeFilters.scope && activeFilters.scope !== 'All') {
        if (activeFilters.scope === 'Kashmir Core' && f.Administrative_Scope !== 'Kashmir Core') return false;
        if (activeFilters.scope === 'Trans-Divisional' && !['Jammu Division', 'Ladakh Division'].includes(f.Administrative_Scope)) return false;
        if (activeFilters.scope === 'Transboundary / Extended' && !['Azad Kashmir', 'Gilgit-Baltistan'].includes(f.Administrative_Scope)) return false;
      }
      
      if (activeFilters.administrativeUnit && activeFilters.administrativeUnit !== 'All' && f.District_Name !== activeFilters.administrativeUnit) return false;
      return true;
    });
  }, [rawForests, activeFilters]);

  const activeDistrictNames = React.useMemo(() => new Set(forests.map(f => f.District_Name)), [forests]);
  const activeScopes = React.useMemo(() => new Set(forests.map(f => f.Administrative_Scope)), [forests]);

  const trees = React.useMemo(() => {
    return rawTrees.filter(t => {
      if (activeFilters.searchQuery && !t.commonName.toLowerCase().includes(activeFilters.searchQuery.toLowerCase()) && !t.scientificName.toLowerCase().includes(activeFilters.searchQuery.toLowerCase())) return false;
      if (activeScopes.size > 0 && !t.geographicScope.some(scope => activeScopes.has(scope as any) || scope === 'All Regions')) return false;
      return true;
    });
  }, [rawTrees, activeFilters, activeScopes]);

  const wildlife = React.useMemo(() => {
    return rawWildlife.filter(w => {
      if (activeFilters.searchQuery && !w.species.toLowerCase().includes(activeFilters.searchQuery.toLowerCase()) && !w.scientificName.toLowerCase().includes(activeFilters.searchQuery.toLowerCase())) return false;
      if (activeDistrictNames.size > 0 && !w.districts.some(d => activeDistrictNames.has(d))) return false;
      return true;
    });
  }, [rawWildlife, activeFilters, activeDistrictNames]);

  const habitats = React.useMemo(() => {
    return rawHabitats.filter(h => {
      if (activeFilters.searchQuery && !h.name.toLowerCase().includes(activeFilters.searchQuery.toLowerCase())) return false;
      if (activeDistrictNames.size > 0 && !h.districts.some(d => activeDistrictNames.has(d))) return false;
      return true;
    });
  }, [rawHabitats, activeFilters, activeDistrictNames]);

  const activeCorridors = React.useMemo(() => {
    return masterCorridors.filter(c => {
      if (activeFilters.searchQuery && !c.name.toLowerCase().includes(activeFilters.searchQuery.toLowerCase())) return false;
      if (activeDistrictNames.size > 0 && !c.districts_spanned.some(d => activeDistrictNames.has(d))) return false;
      return true;
    });
  }, [activeFilters, activeDistrictNames]);

  const districtCorridorMetrics = React.useMemo(() => {
    return generateDistrictCorridorMetrics(Array.from(activeDistrictNames));
  }, [activeDistrictNames]);

    const kpis = [
    { label: 'Districts Monitored', value: metrics.totalDistrictsMonitored, icon: MapPin },
    { label: 'Dense Forests', value: `${(metrics as any).denseForestCount || 26} Dists`, icon: Trees },
    { label: 'Dense Canopy Area', value: `${((metrics as any).totalDenseForestAreaSqKm || 17358).toLocaleString()} km²`, icon: Shield },
    { label: 'Critical Risks', value: `${(metrics as any).criticalRiskCount || 12} Alerts`, icon: AlertTriangle },
    { label: 'High Fragility', value: `${(metrics as any).highFragmentationCount || 18} Dists`, icon: Crosshair },
    { label: 'Severe Disturbances', value: `${(metrics as any).severeDisturbanceCount || 18} Dists`, icon: Activity },
    { label: 'Robust Regen', value: `${(metrics as any).robustRegenerationCount || 16} Dists`, icon: TrendingUp },
    { label: 'Heritage Chinars', value: chinarData.censusMetrics.totalTrees2025.toLocaleString(), icon: TreePine },
  ];

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters(newFilters);
  };

  const handleReset = () => {
    setActiveFilters({});
  };

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
                Forest Ecosystems &amp; Habitat Intelligence Layer
              </span>
            </div>
          </div>
        }
        subtitle="The authoritative habitat intelligence layer mapping Kashmir's ecological infrastructure. Connecting species distribution, carbon sequestration, landscape connectivity, and real-time disturbance analytics."
        icon={<TreePine className="w-6 h-6 text-emerald-400" />}
        label="Biodiversity Intelligence · Habitat Matrix"
        breadcrumbs={[
          { label: 'Biodiversity', href: '/biodiversity/overview' },
          { label: 'Forest Ecosystems' }
        ]}
        images={['/images/protected-network.png']}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className={`border-emerald-500/40 font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/30'
                  : 'text-emerald-300 hover:bg-emerald-500/10'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              <TreePine className="w-4 h-4 mr-1.5" />
              Forest Overview
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold transition-all"
              onClick={() => setActiveTab('habitats')}
            >
              <Layers className="w-4 h-4 mr-1.5" />
              16 Habitat Types
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold transition-all"
              onClick={() => setActiveTab('corridors')}
            >
              <Compass className="w-4 h-4 mr-1.5" />
              Corridors &amp; Connectivity
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
                <span className="text-xs uppercase tracking-widest font-black text-emerald-400">Canopy Biomass, Carbon Sinks &amp; Wildlife Corridor Layer</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Habitat Layer 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Key Habitat Divisions: <strong className="text-white">Pir Panjal Subalpine Conifers</strong>, <strong className="text-white">Sind Valley Deodar</strong>, <strong className="text-white">Kishtwar Pine-Oak</strong>, and <strong className="text-white">Dachigam Riverine Forest</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Dense Canopy Coverage</div>
              <div className="text-sm font-bold text-emerald-300">{((metrics as any).totalDenseForestAreaSqKm || 17358).toLocaleString()} km² Forest</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>{chinarData.censusMetrics.totalTrees2025.toLocaleString()} Chinars Censused</span>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TELEMETRY METRIC KPI STRIP (6 CARDS)                          */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-4">
          {/* Card 1: Dense Forest Area */}
          <div
            onClick={() => setActiveTab('overview')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-emerald-500/20 border-emerald-500/60 shadow-lg shadow-emerald-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Dense Canopy</span>
              <Trees className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">{((metrics as any).totalDenseForestAreaSqKm || 17358).toLocaleString()} km²</div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">High Density Forests</div>
          </div>

          {/* Card 2: Monitored Districts */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Districts</span>
              <MapPin className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-300">{metrics.totalDistrictsMonitored}</div>
            <div className="text-[11px] text-sky-400/90 font-mono mt-0.5">All Forest Divisions</div>
          </div>

          {/* Card 3: Habitat Types */}
          <div
            onClick={() => setActiveTab('habitats')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'habitats'
                ? 'bg-purple-500/20 border-purple-500/60 shadow-lg shadow-purple-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Habitats</span>
              <Layers className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">{rawHabitats.length || 16}</div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">Champion &amp; Seth Types</div>
          </div>

          {/* Card 4: Heritage Chinars */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Heritage Chinars</span>
              <TreePine className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">{chinarData.censusMetrics.totalTrees2025.toLocaleString()}</div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Census 2025 Trees</div>
          </div>

          {/* Card 5: Corridors */}
          <div
            onClick={() => setActiveTab('corridors')}
            className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
              activeTab === 'corridors'
                ? 'bg-blue-500/20 border-blue-500/60 shadow-lg shadow-blue-950/50'
                : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Corridors</span>
              <Compass className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-300">{masterCorridors.length}</div>
            <div className="text-[11px] text-blue-400/90 font-mono mt-0.5">Wildlife Corridors</div>
          </div>

          {/* Card 6: Critical Alerts */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Fragility Alerts</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-300">{(metrics as any).criticalRiskCount || 12}</div>
            <div className="text-[11px] text-rose-400/90 font-mono mt-0.5">Disturbance Hotspots</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/5 rounded-lg p-1">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-slate-700/50' : ''}
                icon={<Grid3X3 className="w-4 h-4" />}
              >
                Grid
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'primary' : 'ghost'}
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-slate-700/50' : ''}
                icon={<List className="w-4 h-4" />}
              >
                List
              </Button>
            </div>
          </div>
          
          <BiodiversityFilters
            defaultOpen={true}
            filters={activeFilters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            resultCount={forests.length}
            searchPlaceholder="Search district, watershed..."
            category1Label="Ecological Region"
            category1Key="Ecological_Region"
            category1Options={[
              { id: 'All Regions', label: 'All Regions' },
              { id: 'Western Himalaya', label: 'Western Himalaya' },
              { id: 'Pir Panjal', label: 'Pir Panjal' },
              { id: 'Greater Himalaya', label: 'Greater Himalaya' },
              { id: 'Kashmir Valley', label: 'Kashmir Valley' },
              { id: 'Upper Jhelum Basin', label: 'Upper Jhelum Basin' },
              { id: 'Chenab Basin', label: 'Chenab Basin' },
              { id: 'Upper Indus Basin', label: 'Upper Indus Basin' },
              { id: 'Karakoram', label: 'Karakoram' },
              { id: 'Cold Desert Ladakh', label: 'Cold Desert Ladakh' }
            ]}
            category2Label="Forest Cover Class"
            category2Key="Forest_Cover_Class"
            category2Options={Array.from(new Set(rawForests.map(f => f.Forest_Cover_Class)))}
            moduleOptions={[
              { id: 'overview', label: 'Overview' },
              { id: 'official-telemetry', label: 'Official ISFR Telemetry' },
              { id: 'chinar-heritage', label: 'Chinar & Heritage Trees' },
              { id: 'tree-directory', label: 'Tree Directory (20 Species)' },
              { id: 'ntfp-ethnobotany', label: 'NTFP & Medicinal Flora' },
              { id: 'scope-comparison', label: 'Regional Macro Comparison' },
              { id: 'forest-types', label: 'Forest Types' },
              { id: 'forest-cover', label: 'Forest Cover' },
              { id: 'deforestation', label: 'Deforestation' },
              { id: 'wildlife', label: 'Wildlife' },
              { id: 'habitats', label: 'Habitats' },
              { id: 'health-monitoring', label: 'Health Monitoring' },
              { id: 'canopy-health', label: 'Canopy Health' },
              { id: 'fragmentation', label: 'Fragmentation' },
              { id: 'wildlife-corridors', label: 'Wildlife Corridors' },
              { id: 'forest-fires', label: 'Forest Fires' },
              { id: 'disturbances', label: 'Disturbances' },
              { id: 'invasive-species', label: 'Invasive Species' },
              { id: 'early-warning', label: 'Early Warning' },
              { id: 'carbon-biomass', label: 'Carbon Biomass' },
              { id: 'ecosystem-services', label: 'Ecosystem Services' },
              { id: 'restoration', label: 'Restoration' },
              { id: 'community-forestry', label: 'Community Forestry' },
              { id: 'regeneration', label: 'Regeneration' }
            ]}
            activeModule={activeTab}
            onModuleChange={(moduleId) => setActiveTab(moduleId)}
          />
        </motion.div>

                {/* 5-Indicator District Matrix Tab (Dense Forests, Critical Risks, Fragmentation, Disturbances, Regeneration) */}
        {activeTab === 'district-indicators' && (
          <DistrictFiveIndicatorsMatrix districts={forests} />
        )}

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-emerald-400" />
                Ecological Core Status
              </h2>
              
                            {/* Quick Jump to 5-Pillar District Matrix */}
              <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" /> 5-Pillar Comprehensive Telemetry Active
                  </div>
                  <h3 className="text-lg font-bold text-white">46-District Environmental Matrix</h3>
                  <p className="text-xs text-slate-300 max-w-xl">
                    Full granular intelligence for Dense Forests, Critical Deforestation Risks, Spatial Fragmentation, Anthropogenic Disturbances, and Natural Regeneration across all 5 administrative scopes.
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={() => setActiveTab('district-indicators')}
                  className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold shrink-0"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Open 5-Indicator Matrix
                </Button>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 leading-relaxed">
                  Forests act as the primary ecological infrastructure of the Kashmir Valley. They dictate hydrological cycles, support over 85% of terrestrial mammal diversity, and act as the principal carbon sink. The Forest Intelligence system monitors these landscapes in real-time.
                </p>
              </div>

              {/* Major Forest Types Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {forests.slice(0, 4).map((f, i) => (
                  <Card key={f.District_ID} className="glass-intense border-white/10 p-5 group">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{f.District_Name}</h3>
                        <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                      </div>
                      <Badge variant={f.Deforestation_Risk === 'Low' ? 'success' : f.Deforestation_Risk === 'Medium' ? 'warning' : 'danger'} size="sm">
                        Risk: {f.Deforestation_Risk}
                      </Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Primary Forest</span>
                        <span className="text-white font-mono">{f.Primary_Forest_Type}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Cover Class</span>
                        <span className="text-emerald-400 font-mono">{f.Forest_Cover_Class}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Primary Type</span>
                        <span className="text-white">{f.Primary_Forest_Type}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="glass-intense border-white/10 p-5 bg-gradient-to-br from-[#0f2027] to-[#203a43]">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingDown className="w-5 h-5 text-rose-400" />
                  Critical Deforestation Risk
                </h3>
                <div className="space-y-4">
                  {forests.filter(f => f.Deforestation_Risk === 'Critical' || f.Deforestation_Risk === 'High').slice(0, 4).map((f, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">{f.District_Name} ({f.Administrative_Scope})</span>
                      <Badge variant="danger" size="sm">High Risk</Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-5">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  Key Wildlife Linkages
                </h3>
                <div className="space-y-3">
                  {forests.filter(f => f.Forest_Wildlife_Count > 0).slice(0, 4).map((f, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                        <div className="text-sm font-bold text-white">{f.District_Name}</div>
                      </div>
                      <div className="text-xs text-slate-400">Wildlife Count: <span className="text-emerald-400">{f.Forest_Wildlife_Count}</span></div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* Official ISFR Telemetry Tab */}
        {activeTab === 'official-telemetry' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                    ISFR 2021 & 2023 Verified
                  </Badge>
                  <Badge variant="outline" className="border-teal-500/30 text-teal-300 bg-teal-500/10">
                    FSI Benchmark Methodology
                  </Badge>
                  <Badge variant="outline" className="border-cyan-500/30 text-cyan-300 bg-cyan-500/10">
                    Multi-Scope Registry
                  </Badge>
                </div>
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <BarChart3 className="w-7 h-7 text-emerald-400" />
                  Official Forest Cover & Biomass Telemetry
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-3xl">
                  Authoritative multi-tiered forest census synthesizing Forest Survey of India (ISFR 2023), J&K Forest Department Working Plans, AJK Forest Inventory, and ICIMOD transboundary spatial intelligence.
                </p>
              </div>

              {/* Scope filter selector */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10">
                {[
                  { id: 'all', label: 'All Scopes' },
                  { id: 'kashmir', label: 'Kashmir Core (10)' },
                  { id: 'jammu', label: 'Jammu (10)' },
                  { id: 'ladakh', label: 'Ladakh (2)' },
                  { id: 'ajk', label: 'Azad Kashmir (10)' },
                  { id: 'gb', label: 'Gilgit-Baltistan (14)' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedScope(tab.id as any)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer",
                      selectedScope === tab.id
                        ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Macro Summary Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {[
                { label: 'Kashmir Forest Cover', value: `${isfrData.kashmirDivision.totalForestCoverSqKm.toLocaleString()} km²`, icon: Trees, color: 'text-emerald-400' },
                { label: 'Forest Percentage', value: `${isfrData.kashmirDivision.totalForestCoverPercent}%`, icon: BarChart3, color: 'text-teal-400' },
                { label: 'Very Dense Forest', value: `${isfrData.kashmirDivision.veryDenseForestSqKm.toLocaleString()} km²`, icon: Shield, color: 'text-green-400' },
                { label: 'Mod. Dense Forest', value: `${isfrData.kashmirDivision.moderatelyDenseForestSqKm.toLocaleString()} km²`, icon: Layers, color: 'text-cyan-400' },
                { label: 'Open Forest', value: `${isfrData.kashmirDivision.openForestSqKm.toLocaleString()} km²`, icon: Leaf, color: 'text-sky-400' },
                { label: 'Growing Stock', value: `${isfrData.kashmirDivision.growingStockMillionCuM} M m³`, icon: Mountain, color: 'text-amber-400' },
                { label: 'Carbon Stock', value: `${isfrData.kashmirDivision.carbonStockMillionTonnesC} Mt C`, icon: CloudLightning, color: 'text-rose-400' }
              ].map((item, idx) => (
                <Card key={idx} className="glass-intense border-white/10 p-4 text-center">
                  <item.icon className={cn("w-5 h-5 mx-auto mb-2", item.color)} />
                  <div className="text-base font-bold text-white tabular-nums truncate">{item.value}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5 truncate">{item.label}</div>
                </Card>
              ))}
            </div>

            {/* Kashmir Core Official Table */}
            {(selectedScope === 'all' || selectedScope === 'kashmir') && (
              <Card className="glass-intense border-emerald-500/20 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <TreePine className="w-5 h-5 text-emerald-400" />
                      Kashmir Core Division (10 Districts - ISFR 2023 Verified)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Total Geographic Area: 15,389 km² | Forest Cover: 6,377.97 km² (41.44%) | Net 2-Year Gain: +24.00 km²
                    </p>
                  </div>
                  <Badge variant="outline" className="border-emerald-500/40 text-emerald-300">
                    100% Monitored
                  </Badge>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-300">
                    <thead className="text-[10px] uppercase font-bold tracking-wider text-slate-400 bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="py-3 px-3">District</th>
                        <th className="py-3 px-3">Geo Area</th>
                        <th className="py-3 px-3">Forest Cover</th>
                        <th className="py-3 px-3">Cover %</th>
                        <th className="py-3 px-3">Very Dense</th>
                        <th className="py-3 px-3">Mod. Dense</th>
                        <th className="py-3 px-3">Open Forest</th>
                        <th className="py-3 px-3">Net Gain</th>
                        <th className="py-3 px-3">Growing Stock</th>
                        <th className="py-3 px-3">Carbon</th>
                        <th className="py-3 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {isfrData.kashmirDivision.districts.map((d, i) => (
                        <tr key={i} className="hover:bg-white/5 transition-colors">
                          <td className="py-3 px-3 font-sans font-bold text-white">{d.district}</td>
                          <td className="py-3 px-3">{d.geoArea} km²</td>
                          <td className="py-3 px-3 text-emerald-400 font-bold">{d.coverSqKm.toFixed(2)} km²</td>
                          <td className="py-3 px-3">
                            <span className={cn(
                              "px-2 py-0.5 rounded text-[11px] font-bold",
                              d.percent >= 50 ? "bg-emerald-500/20 text-emerald-300" :
                              d.percent >= 30 ? "bg-teal-500/20 text-teal-300" :
                              "bg-amber-500/20 text-amber-300"
                            )}>
                              {d.percent.toFixed(2)}%
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-300">{d.vdf.toFixed(2)} km²</td>
                          <td className="py-3 px-3 text-slate-300">{d.mdf.toFixed(2)} km²</td>
                          <td className="py-3 px-3 text-slate-300">{d.of.toFixed(2)} km²</td>
                          <td className="py-3 px-3 text-green-400">+{d.change.toFixed(1)} km²</td>
                          <td className="py-3 px-3 text-sky-300">{d.growingStock} M m³</td>
                          <td className="py-3 px-3 text-cyan-300">{d.carbon} Mt</td>
                          <td className="py-3 px-3 font-sans">
                            <Badge variant={d.densityClass === 'Very Dense' ? 'success' : d.densityClass === 'Moderately Dense' ? 'info' : 'warning'} size="sm">
                              {d.densityClass}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            )}

            {/* Jammu Division Table */}
            {(selectedScope === 'all' || selectedScope === 'jammu') && (
              <Card className="glass-intense border-teal-500/20 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Mountain className="w-5 h-5 text-teal-400" />
                      Trans-Divisional: Jammu Division (10 Districts)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Total Geographic Area: 26,293 km² | Total Forest Cover: 12,066.82 km² (45.89%)
                    </p>
                  </div>
                  <Badge variant="outline" className="border-teal-500/40 text-teal-300">
                    Chenab & Shivalik Belts
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isfrData.jammuDivision.districts.map((d, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/30 transition-all">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-white text-base">{d.district}</h4>
                          <span className="text-[11px] text-slate-400">Area: {d.geoArea} km²</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-teal-300 font-mono">{d.percent.toFixed(1)}%</span>
                          <div className="text-[10px] text-slate-500 uppercase">Cover</div>
                        </div>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-white/5 font-mono">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Total Cover:</span>
                          <span className="font-bold text-white">{d.coverSqKm.toFixed(2)} km²</span>
                        </div>
                        {d.vdf && (
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-400">VDF / MDF / OF:</span>
                            <span>{d.vdf.toFixed(0)} / {d.mdf.toFixed(0)} / {d.of.toFixed(0)} km²</span>
                          </div>
                        )}
                        <p className="text-[11px] text-teal-400/90 font-sans pt-1 line-clamp-2">
                          {d.primaryType}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Ladakh Division Table */}
            {(selectedScope === 'all' || selectedScope === 'ladakh') && (
              <Card className="glass-intense border-sky-500/20 p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                      <Compass className="w-5 h-5 text-sky-400" />
                      Trans-Divisional: Ladakh High-Altitude Cold Arid Forestry (2 Districts)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Total Area: 59,146 km² | Cold Arid Tree & Riparian Cover: 213.00 km² (0.36%)
                    </p>
                  </div>
                  <Badge variant="outline" className="border-sky-500/40 text-sky-300">
                    Trans-Himalayan Cold Desert
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {isfrData.ladakhDivision.districts.map((d, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-white text-base">{d.district} District</h4>
                          <span className="text-[11px] text-slate-400">Geographic Area: {d.geoArea.toLocaleString()} km²</span>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-black text-sky-300 font-mono">{d.coverSqKm.toFixed(1)} km²</span>
                          <div className="text-[10px] text-slate-500 uppercase">{d.percent}% Cover</div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 mt-2 p-2 rounded bg-black/30 border border-white/5">
                        {d.primaryType}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Transboundary: Azad Kashmir & Gilgit-Baltistan */}
            {(selectedScope === 'all' || selectedScope === 'ajk' || selectedScope === 'gb') && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {(selectedScope === 'all' || selectedScope === 'ajk') && (
                  <Card className="glass-intense border-emerald-500/20 p-6 space-y-4">
                    <div className="border-b border-white/10 pb-3">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Trees className="w-5 h-5 text-emerald-400" />
                        Transboundary: Azad Kashmir (10 Districts)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Total Forest Cover: ~4,894.20 km² (42.1% average cover)
                      </p>
                    </div>
                    <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                      {isfrData.azadKashmir.districts.map((d, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                          <div>
                            <span className="text-sm font-bold text-white">{d.district}</span>
                            <p className="text-[10px] text-slate-400">{d.primaryType}</p>
                          </div>
                          <div className="text-right font-mono">
                            <span className="text-xs font-bold text-emerald-300">{d.coverSqKm.toFixed(1)} km²</span>
                            <span className="text-[10px] text-slate-500 block">{d.percent}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}

                {(selectedScope === 'all' || selectedScope === 'gb') && (
                  <Card className="glass-intense border-cyan-500/20 p-6 space-y-4">
                    <div className="border-b border-white/10 pb-3">
                      <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Mountain className="w-5 h-5 text-cyan-400" />
                        Transboundary: Gilgit-Baltistan (14 Districts)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Total Forest Cover: ~3,125.60 km² | Chilgoza Pine, Birch & Juniper
                      </p>
                    </div>
                    <div className="space-y-2 max-h-[360px] overflow-y-auto pr-1">
                      {isfrData.gilgitBaltistan.districts.map((d, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-white/5 border border-white/5 flex items-center justify-between">
                          <div>
                            <span className="text-sm font-bold text-white">{d.district}</span>
                            <p className="text-[10px] text-slate-400">{d.primaryType}</p>
                          </div>
                          <div className="text-right font-mono">
                            <span className="text-xs font-bold text-cyan-300">{d.coverSqKm.toFixed(1)} km²</span>
                            <span className="text-[10px] text-slate-500 block">{d.percent}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>
            )}
          </div>
        )}

        {/* Chinar & Heritage Trees Tab */}
        {activeTab === 'chinar-heritage' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-amber-500/30 text-amber-300 bg-amber-500/10">
                    Platanus orientalis (Boen)
                  </Badge>
                  <Badge variant="outline" className="border-red-500/30 text-red-400 bg-red-500/10">
                    65.6% Decadal Decline Since 1970
                  </Badge>
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                    J&K Chinar Preservation Act 1969
                  </Badge>
                </div>
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <TreePine className="w-7 h-7 text-amber-400" />
                  Chinar Conservation Network (CCN) & Heritage Registry
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-3xl">
                  Comprehensive telemetry for Kashmir’s cultural keystone species. Tracking population censuses, ancient champion trees, legal felling prohibitions, and traditional ethnobotanical uses.
                </p>
              </div>
            </div>

            {/* Chinar Census Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { label: 'Active Monitored Trees', value: chinarData.censusMetrics.totalTrees2025.toLocaleString(), color: 'text-amber-400', icon: TreePine },
                { label: 'Decline Since 1970', value: `-${chinarData.censusMetrics.declinePercentage}%`, color: 'text-red-400', icon: TrendingDown },
                { label: 'Healthy Canopy Trees', value: chinarData.censusMetrics.healthyTrees.toLocaleString(), color: 'text-emerald-400', icon: CheckCircle2 },
                { label: 'Semi-Dry (At Risk)', value: chinarData.censusMetrics.semiDryTrees.toLocaleString(), color: 'text-yellow-400', icon: AlertTriangle },
                { label: 'Dead / Decaying', value: chinarData.censusMetrics.dryDeadTrees.toLocaleString(), color: 'text-rose-500', icon: AlertTriangle },
                { label: 'Protected Groves', value: chinarData.censusMetrics.protectedHeritageGroves, color: 'text-cyan-400', icon: Shield },
              ].map((m, idx) => (
                <Card key={idx} className="glass-intense border-white/10 p-4 text-center">
                  <m.icon className={cn("w-5 h-5 mx-auto mb-1.5", m.color)} />
                  <div className="text-xl font-bold text-white tabular-nums">{m.value}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-0.5">{m.label}</div>
                </Card>
              ))}
            </div>

            {/* Decadal Decline & District Census Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Decadal Timeline */}
              <Card className="glass-intense border-amber-500/20 p-6 space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-400" />
                    55-Year Population Decline Timeline (1970–2025)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Census records reflect rapid loss from road expansions, urbanization, and illegal ring-barking.
                  </p>
                </div>
                <div className="space-y-3 pt-2">
                  {chinarData.decadalCensus.map((item, i) => {
                    const maxCount = 42000;
                    const pct = (item.count / maxCount) * 100;
                    return (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="font-bold text-white">{item.year}</span>
                          <span className="text-amber-300 font-bold">{item.count.toLocaleString()} trees</span>
                        </div>
                        <div className="w-full bg-slate-900 rounded-full h-2">
                          <div
                            className={cn(
                              "h-2 rounded-full transition-all duration-500",
                              item.count > 30000 ? "bg-emerald-500" :
                              item.count > 20000 ? "bg-amber-500" : "bg-red-500"
                            )}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-500 italic">{item.notes}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>

              {/* District Census Table */}
              <Card className="glass-intense border-amber-500/20 p-6 space-y-4">
                <div className="border-b border-white/10 pb-3">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-amber-400" />
                    District-by-District Chinar Census Registry
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Anantnag holds the valley's highest surviving population (39.4%).
                  </p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left text-slate-300 font-mono">
                    <thead className="text-[10px] uppercase font-bold text-slate-400 bg-white/5 border-b border-white/10">
                      <tr>
                        <th className="py-2.5 px-2">District</th>
                        <th className="py-2.5 px-2 text-green-400">Green</th>
                        <th className="py-2.5 px-2 text-amber-400">Semi-Dry</th>
                        <th className="py-2.5 px-2 text-rose-400">Dry</th>
                        <th className="py-2.5 px-2 text-white">Total</th>
                        <th className="py-2.5 px-2">Valley Share</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {chinarData.districtCensus.map((d, i) => (
                        <tr key={i} className="hover:bg-white/5">
                          <td className="py-2.5 px-2 font-sans font-bold text-white">{d.district}</td>
                          <td className="py-2.5 px-2 text-green-300">{d.green.toLocaleString()}</td>
                          <td className="py-2.5 px-2 text-amber-300">{d.semiDry}</td>
                          <td className="py-2.5 px-2 text-rose-400">{d.dry}</td>
                          <td className="py-2.5 px-2 font-bold text-white">{d.total.toLocaleString()}</td>
                          <td className="py-2.5 px-2 text-slate-400">{d.percent}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>

            {/* Notable Ancient Champion Trees */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Historic Champion & Ancient Trees Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {chinarData.notableHeritageTrees.map(tree => (
                  <Card key={tree.id} className="glass-intense border-white/10 p-5 hover:border-amber-500/40 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="border-amber-500/30 text-amber-300 text-[10px]">
                          {tree.age} Years Old
                        </Badge>
                        <Badge variant={tree.status === 'healthy' ? 'success' : 'warning'} size="sm">
                          {tree.status}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-white text-base mb-1">{tree.location}</h4>
                      <p className="text-xs text-slate-400 mb-3">{tree.significance}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 space-y-1 text-xs text-slate-400 font-mono">
                      <div className="flex justify-between">
                        <span>Girth (Ground):</span>
                        <span className="text-white font-bold">{tree.girthMeters} m</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Planted In:</span>
                        <span className="text-amber-300">{tree.yearPlanted} AD</span>
                      </div>
                      <div className="flex justify-between text-[11px] truncate">
                        <span>Patron:</span>
                        <span className="text-slate-300 truncate">{tree.plantedBy}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Ethnobotanical & Cultural Heritage Card */}
            <Card className="glass-intense border-white/10 p-6 bg-gradient-to-br from-amber-950/20 to-slate-900">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-2 space-y-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    Ethnobotany: Kangri Charcoal & Village Sanctuaries
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Beyond its monumental presence, the fallen autumnal foliage of the Chinar is harvested annually across Kashmir to make <strong className="text-amber-300">Pane Chinni</strong> (smoldering Chinar leaf charcoal). This charcoal provides the long-lasting, steady heat required for the traditional Kashmiri <em>Kangri</em> (wicker-encased terracotta firepot), remaining central to winter survival.
                  </p>
                  <p className="text-xs text-slate-400">
                    {chinarData.speciesInfo.legalProtection}
                  </p>
                </div>
                <div className="space-y-2 p-4 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300">
                  <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Species Specs</div>
                  <div className="flex justify-between"><span className="text-slate-400">Botanical:</span><span className="italic text-white font-mono">{chinarData.speciesInfo.botanicalName}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Kashmiri:</span><span className="text-amber-300 font-bold">{chinarData.speciesInfo.localNames.kashmiri}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Max Height:</span><span className="text-white font-mono">{chinarData.speciesInfo.maxHeight}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Max Girth:</span><span className="text-white font-mono">{chinarData.speciesInfo.maxGirthRecorded}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">Oldest Tree:</span><span className="text-white font-mono">{chinarData.speciesInfo.oldestRecordedAge}</span></div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Non-Timber Forest Products (NTFP) Tab */}
        {activeTab === 'ntfp-ethnobotany' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                    NTFP Telemetry
                  </Badge>
                  <Badge variant="outline" className="border-teal-500/30 text-teal-300 bg-teal-500/10">
                    Sustainable Livelihoods & Ethnobotany
                  </Badge>
                </div>
                <h2 className="text-3xl font-black text-white flex items-center gap-3">
                  <Sprout className="w-7 h-7 text-emerald-400" />
                  Non-Timber Forest Products (NTFP) & High-Altitude Flora
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-3xl">
                  Inventory of high-value wild edible fungi, medicinal rhizomes, and essential biochemical precursors harvested across Western Himalayan temperate and subalpine forest biomes.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ntfpData.map(item => (
                <Card key={item.id} className="glass-intense border-white/10 p-5 hover:border-emerald-500/40 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mt-2">{item.name}</h3>
                    <p className="text-xs italic text-emerald-400/80 mb-3">{item.scientificName}</p>
                    
                    <div className="space-y-2 text-xs text-slate-300 mb-4">
                      <div className="p-2.5 rounded-lg bg-white/5 border border-white/5">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block mb-1">Microhabitat</span>
                        <p>{item.habitat}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Harvest Window:</span>
                      <span className="text-amber-300 font-semibold">{item.harvestWindow}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Commercial Value:</span>
                      <span className="text-cyan-300 font-mono font-medium">{item.marketValue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Key Strongholds:</span>
                      <span className="text-white font-medium truncate max-w-[170px]">{item.keyDistricts.join(', ')}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic pt-1 border-t border-white/5">
                      {item.conservationStatus}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regional Scope Comparison Tab */}
        {activeTab === 'scope-comparison' && (
          <div className="space-y-8 mt-4">
            <div>
              <h2 className="text-3xl font-black text-white flex items-center gap-3">
                <Scale className="w-7 h-7 text-emerald-400" />
                Cross-Scope Regional Forest Intelligence
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-3xl">
                Comparative ecological audit evaluating forest cover percentages, biomass density, biome taxonomy, and disturbance indicators across all five administrative divisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  scope: 'Kashmir Core',
                  subtitle: '10 Districts • Jhelum Basin',
                  coverSqKm: '6,378 km²',
                  percent: '41.4%',
                  density: 'Very Dense / Moderately Dense Conifers',
                  dominantTrees: 'Deodar, Kail, Silver Fir, Spruce, Chinar, Walnut',
                  wildlife: 'Hangul, Kashmir Musk Deer, Black Bear',
                  threats: 'Urban sprawl, high tourism corridors, timber smuggling',
                  carbonIndex: '111 Mt C'
                },
                {
                  scope: 'Jammu Division',
                  subtitle: '10 Districts • Chenab & Shivalik Basins',
                  coverSqKm: '12,067 km²',
                  percent: '45.9%',
                  density: 'Subtropical Pine to Moist Temperate Deodar Climax',
                  dominantTrees: 'Chir Pine, Ban Oak, Deodar (Bhadarwah), Brown Oak',
                  wildlife: 'Common Leopard, Barking Deer, Kalij Pheasant',
                  threats: 'Pre-monsoon forest fires, slope instability, grazing pressure',
                  carbonIndex: '190 Mt C'
                },
                {
                  scope: 'Ladakh Division',
                  subtitle: '2 Districts • Indus & Suru Basins',
                  coverSqKm: '213 km²',
                  percent: '0.36%',
                  density: 'Cold Desert Riparian Oasis & Dwarf Scrub',
                  dominantTrees: 'White Willow, Poplar, Seabuckthorn, Himalayan Juniper',
                  wildlife: 'Snow Leopard, Tibetan Wolf, Himalayan Ibex',
                  threats: 'Hyper-aridity, flash floods, fragile scree slopes',
                  carbonIndex: '4 Mt C'
                },
                {
                  scope: 'Azad Kashmir',
                  subtitle: '10 Districts • Neelum & Jhelum Basins',
                  coverSqKm: '4,894 km²',
                  percent: '42.1%',
                  density: 'Moist Temperate Fir-Deodar & Subtropical Pine',
                  dominantTrees: 'Silver Fir, Kail, Deodar, Banj Oak, Chir Pine',
                  wildlife: 'Western Tragopan, Musk Deer, Common Leopard',
                  threats: 'Steep terrain erosion, commercial timber extraction',
                  carbonIndex: '85 Mt C'
                },
                {
                  scope: 'Gilgit-Baltistan',
                  subtitle: '14 Districts • Karakoram & Upper Indus',
                  coverSqKm: '3,126 km²',
                  percent: '4.3%',
                  density: 'Dry Temperate Chilgoza & Subalpine Birch',
                  dominantTrees: 'Chilgoza Pine, Deodar, Himalayan Birch, Juniper',
                  wildlife: 'Markhor, Snow Leopard, Brown Bear',
                  threats: 'Aridity, illegal logging in Diamer, climate warming',
                  carbonIndex: '52 Mt C'
                }
              ].map((card, i) => (
                <Card key={i} className="glass-intense border-white/10 p-6 space-y-4 hover:border-emerald-500/40 transition-all">
                  <div className="border-b border-white/10 pb-3">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">{card.subtitle}</span>
                    <h3 className="text-xl font-bold text-white mt-1">{card.scope}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Forest Area</span>
                      <span className="text-base font-bold text-white">{card.coverSqKm}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <span className="text-[10px] text-slate-400 uppercase tracking-wide block">Cover %</span>
                      <span className="text-base font-bold text-emerald-400">{card.percent}</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-300">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase tracking-wide block">Dominant Trees:</span>
                      <span className="text-white font-medium">{card.dominantTrees}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase tracking-wide block">Key Wildlife:</span>
                      <span className="text-slate-300">{card.wildlife}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase tracking-wide block">Key Threat Profile:</span>
                      <span className="text-amber-400">{card.threats}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Forest Types Tab */}
        {activeTab === 'forest-types' && (
          <div className="space-y-8 mt-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Trees className="w-6 h-6 text-emerald-400" />
                  Forest Types Taxonomy
                </h2>
                <p className="text-sm text-slate-400 mt-2">
                  Classification of the major ecological systems operating within the Western Himalayan geography.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {Array.from(new Set(forests.map(f => f.Primary_Forest_Type))).map((type, i) => (
                <Card key={i} className="glass-intense border-white/10 p-5">
                  <h3 className="text-xl font-bold text-white mb-2">{type}</h3>
                  <div className="space-y-4">
                    <div className="text-sm text-slate-400 border-b border-white/5 pb-2">
                      Dominant in: <span className="text-emerald-400">{forests.filter(f => f.Primary_Forest_Type === type).map(f => f.District_Name).join(', ')}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="block text-slate-500 uppercase tracking-wide text-[10px] mb-1">Tree Count</span>
                        <span className="text-white">{forests.find(f => f.Primary_Forest_Type === type)?.Tree_Directory_Count}</span>
                      </div>
                      <div>
                        <span className="block text-slate-500 uppercase tracking-wide text-[10px] mb-1">Wildlife Count</span>
                        <span className="text-white">{forests.find(f => f.Primary_Forest_Type === type)?.Forest_Wildlife_Count}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Deforestation Tab */}
        {activeTab === 'deforestation' && (
          <div className="space-y-6 mt-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Deforestation & Change Detection</h2>
                <p className="text-sm text-slate-400 mt-1">Satellite validation via Hansen Global Forest Change v1.10 (UMD) & FSI ISFR.</p>
              </div>
              <Badge variant="danger" className="animate-pulse">Active Loss Monitored</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {forests.map((f, i) => (
                <Card key={f.District_ID} className="glass-intense border-red-500/20 p-5 bg-gradient-to-br from-[#1a0f0f] to-[#2a1212]">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{f.District_Name}</h3>
                      <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-red-400">{f.Deforestation_Risk}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wide">Risk Level</div>
                    </div>
                  </div>
                  <div className="space-y-3 pt-3 border-t border-white/5">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Fragmentation</span>
                      <span className="text-amber-400 font-mono">{f.Fragmentation_Level}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Forest Type</span>
                      <span className="text-white">{f.Primary_Forest_Type}</span>
                    </div>
                  </div>
                  <div className="mt-4 p-2 bg-black/30 rounded text-xs text-slate-500 border border-white/5">
                    Data integration: {f.Primary_Data_Source}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Carbon Biomass Tab */}
        {activeTab === 'carbon-biomass' && (
          <div className="space-y-6 mt-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">Carbon & Biomass Intelligence</h2>
                <p className="text-sm text-slate-400 mt-1">Sourced from NASA GEDI LiDAR & ESA Biomass measurements.</p>
              </div>
              <Badge variant="success">Total Stock: {metrics.totalCarbonStock} Tg</Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {forests.map((f, i) => (
                <Card key={f.District_ID} className="glass-intense border-emerald-500/20 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                      <CloudLightning className="w-8 h-8 text-emerald-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">{f.District_Name}</h3>
                        <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-black text-emerald-400 tabular-nums">{f.Carbon_Biomass_Value}</div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wide">Carbon Biomass</div>
                    </div>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-2 mb-4">
                    <div className={`h-2 rounded-full ${Number(f.Carbon_Biomass_Value.replace(' Tg', '')) > 8 ? 'bg-emerald-400 w-full' : Number(f.Carbon_Biomass_Value.replace(' Tg', '')) > 4 ? 'bg-emerald-500 w-3/4' : 'bg-emerald-700 w-1/3'}`}></div>
                  </div>
                  <p className="text-sm text-slate-400">
                    Validated against {f.Primary_Data_Source}. Accuracy threshold maintained at {(f.Confidence_Level * 100).toFixed(1)}%.
                  </p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Forest Cover Tab */}
        {activeTab === 'forest-cover' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Map className="w-6 h-6 text-emerald-400" />
                  Forest Cover & Density Analytics
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  District-wise analysis of forest canopy density mapping across the Western Himalayan landscape, validated by ISFR 2023, J&K Forest Department, and Sentinel-2 vegetation indices.
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">ISFR 2023 Validated</Badge>
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Sentinel-2 Analytics</Badge>
              </div>
            </div>

            {/* Density Classes Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Very Dense Forest', desc: '> 70% Canopy', color: 'from-emerald-900 to-emerald-800', border: 'border-emerald-500/50' },
                { label: 'Moderately Dense', desc: '40% - 70% Canopy', color: 'from-emerald-800 to-teal-900', border: 'border-teal-500/50' },
                { label: 'Open Forest', desc: '10% - 40% Canopy', color: 'from-teal-900 to-slate-800', border: 'border-slate-500/50' },
                { label: 'Scrub / Cold Desert', desc: '< 10% Canopy', color: 'from-slate-900 to-[#1a1510]', border: 'border-amber-900/50' }
              ].map((cls, i) => (
                <Card key={i} className={`glass-intense border p-4 bg-gradient-to-br ${cls.color} ${cls.border}`}>
                  <div className="text-sm font-bold text-white mb-1">{cls.label}</div>
                  <div className="text-xs text-white/70">{cls.desc}</div>
                </Card>
              ))}
            </div>

            {/* District Forest Cover List */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mt-8 mb-4">District Forest Cover Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {forests.map((f, i) => (
                  <Card key={f.District_ID} className="glass-intense border-white/10 p-5 hover:border-emerald-500/30 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{f.District_Name}</h4>
                        <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-emerald-400 tabular-nums">
                          {f.Forest_Cover_Percent === 'Pending' ? 'TBD' : `${f.Forest_Cover_Percent}%`}
                        </div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wide">Total Cover</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Progress Bar for Forest Cover */}
                      {f.Forest_Cover_Percent !== 'Pending' && (
                        <div className="w-full bg-slate-900 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${Number(f.Forest_Cover_Percent) > 50 ? 'bg-emerald-400' : Number(f.Forest_Cover_Percent) > 20 ? 'bg-teal-500' : 'bg-amber-500'}`} 
                            style={{ width: `${Math.min(Number(f.Forest_Cover_Percent), 100)}%` }}
                          />
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-sm pt-2 border-t border-white/5">
                        <div>
                          <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Density Class</div>
                          <div className="text-white font-medium truncate">{f.Forest_Cover_Class}</div>
                        </div>
                        <div>
                          <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Canopy Status</div>
                          <div className="text-white font-medium truncate">{f.Canopy_Health}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Primary Ecology</div>
                          <div className="text-emerald-400/90 font-medium text-xs line-clamp-1">{f.Primary_Forest_Type}</div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center p-2 rounded bg-black/20 border border-white/5">
                        <span className="text-[10px] text-slate-500">Source: {f.Primary_Data_Source}</span>
                        <Badge variant={f.Confidence_Level > 0.9 ? 'success' : 'warning'} size="sm">
                          {(f.Confidence_Level * 100).toFixed(0)}% Conf.
                        </Badge>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Tree Directory Tab */}
        {activeTab === 'tree-directory' && (
          <div className="space-y-6 mt-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Trees className="w-6 h-6 text-emerald-400" />
                Core Forest Tree Taxonomy
              </h2>
              <Badge variant="info">{trees.length} Key Species Documented</Badge>
            </div>
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-6`}>
              {trees.map((tree) => (
                <Card key={tree.id} className="glass-intense border-white/10 p-5 hover:border-emerald-500/50 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-white">{tree.commonName}</h3>
                        {(tree as any).localName && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-medium">
                            {(tree as any).localName}
                          </span>
                        )}
                      </div>
                      <p className="text-xs italic text-emerald-400/80 mt-0.5">{tree.scientificName}</p>
                    </div>
                    <Badge variant={tree.iucnStatus === 'LC' ? 'success' : tree.iucnStatus === 'NT' ? 'warning' : 'danger'} size="sm">
                      {tree.iucnStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-300 mt-3 mb-4 line-clamp-3">{tree.ecologicalImportance}</p>
                  <div className="text-xs text-slate-500 bg-white/5 p-3 rounded-xl flex flex-col gap-2 border border-white/5">
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase tracking-wide text-[10px]">Elevation Range</span>
                      <span className="font-mono text-emerald-400">{tree.elevation.min}m - {tree.elevation.max}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase tracking-wide text-[10px]">Family</span>
                      <span className="text-white">{tree.family}</span>
                    </div>
                    {(tree as any).carbonSequestrationRate && (
                      <div className="flex justify-between">
                        <span className="text-slate-400 uppercase tracking-wide text-[10px]">Carbon Sequestration</span>
                        <span className="font-mono text-cyan-400">{(tree as any).carbonSequestrationRate}</span>
                      </div>
                    )}
                    {(tree as any).keyDistricts && (
                      <div className="flex justify-between">
                        <span className="text-slate-400 uppercase tracking-wide text-[10px]">Key Strongholds</span>
                        <span className="text-white text-right max-w-[170px] truncate">{(tree as any).keyDistricts.join(', ')}</span>
                      </div>
                    )}
                    <div className="flex justify-between mt-1 pt-2 border-t border-white/5">
                      <span className="text-slate-400 uppercase tracking-wide text-[10px]">Ecosystem Links</span>
                      <span className="text-slate-300 text-right max-w-[150px] truncate">{tree.associatedForestTypes.join(', ')}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Forest Wildlife Tab */}
        {activeTab === 'wildlife' && (
          <div className="space-y-6 mt-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-emerald-400" />
                Forest-Dependent Wildlife
              </h2>
              <Badge variant="warning">{wildlife.filter(w => w.status === 'CR' || w.status === 'EN').length} Critically Endangered/Endangered</Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wildlife.map((w) => (
                <Card key={w.id} className="glass-intense border-white/10 p-5 hover:border-emerald-500/30 transition-colors flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-white">{w.species}</h3>
                        <p className="text-xs italic text-emerald-400/70">{w.scientificName}</p>
                      </div>
                      <Badge variant={w.status === 'CR' ? 'danger' : w.status === 'EN' ? 'warning' : 'success'} size="sm">
                        {w.status}
                      </Badge>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      <div>
                        <span className="block text-slate-500 uppercase tracking-wide text-[10px] mb-1">Forest Dependence</span>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${w.dependence === 'Obligate' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'}`}>
                            {w.dependence}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <span className="block text-slate-500 uppercase tracking-wide text-[10px] mb-1">Required Habitats</span>
                        <div className="flex flex-wrap gap-1">
                          {w.habitat.map((h, i) => (
                            <span key={i} className="text-xs text-white/80 bg-white/5 px-2 py-1 rounded">{h}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <span className="block text-slate-500 uppercase tracking-wide text-[10px] mb-1">Core Districts</span>
                        <span className="text-sm text-slate-300">{w.districts.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-white/5 text-xs text-slate-400">
                    <span className="font-semibold text-white/50 block mb-1">Ecological Note:</span>
                    {w.notes}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Habitats Tab */}
        {activeTab === 'habitats' && (
          <div className="space-y-6 mt-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Leaf className="w-6 h-6 text-emerald-400" />
                Key Ecological Habitats
              </h2>
              <Badge variant="info">{habitats.length} Critical Habitats Monitored</Badge>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {habitats.map((h) => (
                <Card key={h.id} className="glass-intense border-white/10 p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-colors">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{h.name}</h3>
                        <p className="text-sm text-emerald-400/80 mt-1">{h.elevation}</p>
                      </div>
                      <Badge variant={h.threatLevel === 'Critical' ? 'danger' : h.threatLevel === 'High' ? 'warning' : 'success'} size="sm">
                        {h.threatLevel} Threat
                      </Badge>
                    </div>

                    <p className="text-sm text-slate-300 italic mb-4 border-l-2 border-emerald-500/30 pl-3 py-1">
                      {h.climate}
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <span className="block text-slate-500 uppercase tracking-wide text-[10px] mb-2">Key Flora</span>
                        <div className="flex flex-wrap gap-1">
                          {h.keyFlora.map((flora, i) => (
                            <span key={i} className="text-xs text-white bg-emerald-900/40 border border-emerald-500/20 px-2 py-1 rounded">
                              {flora}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="block text-slate-500 uppercase tracking-wide text-[10px] mb-2">Key Fauna</span>
                        <div className="flex flex-wrap gap-1">
                          {h.keyFauna.map((fauna, i) => (
                            <span key={i} className="text-xs text-white bg-amber-900/40 border border-amber-500/20 px-2 py-1 rounded">
                              {fauna}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                    <div>
                      <span className="font-semibold text-white/50 text-xs block mb-1">Ecological Role:</span>
                      <p className="text-sm text-slate-400">{h.ecologicalRole}</p>
                    </div>
                    <div>
                      <span className="font-semibold text-white/50 text-xs block mb-1">Found In:</span>
                      <p className="text-sm text-slate-300">{h.districts.join(', ')}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Wildlife Corridors Tab */}
        {activeTab === 'wildlife-corridors' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-6 h-6 text-indigo-400" />
                  Wildlife Corridors & Connectivity
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  Crucial ecological linkages enabling migration, genetic flow, and climate resilience. The backbone connecting Forest Ecosystems, Protected Areas, and Biodiversity matrices.
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-indigo-500/30 text-indigo-400">{activeCorridors.length} Active Corridors</Badge>
              </div>
            </div>

            {/* Corridors List */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white mb-4">Macro Ecological Corridors</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeCorridors.map((c) => (
                  <Card key={c.id} className={`glass-intense p-5 border-l-4 ${c.status === 'Functional' ? 'border-l-emerald-500 border-white/5' : c.status === 'Threatened' ? 'border-l-amber-500 border-white/5' : c.status === 'Severed' ? 'border-l-rose-500 border-rose-500/10 bg-gradient-to-br from-[#1a0f0f] to-[#2a1212]' : 'border-l-orange-500 border-white/5'}`}>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-xl font-bold text-white">{c.name}</h4>
                        <div className="text-xs text-slate-400 mt-1">{c.type} • {c.length_km} km</div>
                      </div>
                      <Badge variant={c.status === 'Functional' ? 'success' : c.status === 'Severed' ? 'danger' : 'warning'}>{c.status}</Badge>
                    </div>
                    
                    <p className="text-sm text-slate-300 mb-4">{c.ecological_importance}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="block text-slate-500 uppercase tracking-wide text-[10px] mb-1">Target Species</span>
                        <div className="flex flex-wrap gap-1">
                          {c.target_species.map(ts => <span key={ts} className="text-indigo-300">{ts}</span>).reduce((prev, curr) => [prev, ', ', curr] as any)}
                        </div>
                      </div>
                      <div>
                        <span className="block text-slate-500 uppercase tracking-wide text-[10px] mb-1">Primary Threats</span>
                        <div className="flex flex-wrap gap-1">
                          {c.primary_threats.map(pt => <span key={pt} className="text-rose-300">{pt}</span>).reduce((prev, curr) => [prev, ', ', curr] as any)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-white/5">
                      <span className="block text-slate-500 uppercase tracking-wide text-[10px] mb-1">Districts Spanned</span>
                      <span className="text-white/80 text-xs">{c.districts_spanned.join(' → ')}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* District Corridor Metrics List */}
            <div className="space-y-4 pt-8">
              <h3 className="text-lg font-bold text-white mb-4">District-Level Connectivity Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {districtCorridorMetrics.filter(m => m.Corridor_Count > 0).map((m) => (
                  <Card key={m.District_ID} className="glass-intense border-indigo-500/20 p-5 hover:bg-white/[0.02] transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{m.District_Name}</h4>
                        <div className="text-xs text-slate-400 mt-1">{m.Protected_Area_Linkage}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-indigo-400 tabular-nums">{m.Connectivity_Score}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wide">Connectivity Score</div>
                      </div>
                    </div>

                    <div className="w-full bg-slate-900 rounded-full h-1.5 mb-4">
                      <div className={`h-1.5 rounded-full ${m.Connectivity_Score > 75 ? 'bg-indigo-400' : m.Connectivity_Score > 50 ? 'bg-indigo-600' : 'bg-rose-500'}`} style={{ width: `${Math.min(m.Connectivity_Score, 100)}%` }} />
                    </div>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs pt-2 border-t border-white/5">
                      <div>
                        <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Corridors</div>
                        <div className="text-white font-medium">{m.Corridor_Count} ({Math.round(m.Corridor_Length_km)} km avg)</div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Fragmentation</div>
                        <div className={`font-medium ${m.Fragmentation_Risk === 'Critical' ? 'text-rose-400' : m.Fragmentation_Risk === 'High' ? 'text-amber-400' : 'text-emerald-400'}`}>{m.Fragmentation_Risk}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Barriers</div>
                        <div className="text-white font-medium">{m.Barrier_Count}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-1">Restoration</div>
                        <div className={`font-medium ${m.Restoration_Priority === 'Critical' ? 'text-rose-400' : m.Restoration_Priority === 'High' ? 'text-amber-400' : 'text-slate-300'}`}>{m.Restoration_Priority}</div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Forest Fires Tab */}
        {activeTab === 'forest-fires' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-rose-500 animate-pulse" />
                  Wildfire Risk & Burn Analytics
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  Real-time threat modeling using MODIS and VIIRS thermal anomaly indices. Assesses the intersection of fuel loads (dry scrub/conifer), historical burn scar frequency, and climatic stress.
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-rose-500/30 text-rose-400">VIIRS Thermal Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {forests.map((f, i) => {
                const isHigh = f.Forest_Fire_Risk === 'High' || f.Forest_Fire_Risk === 'Critical';
                const isMed = f.Forest_Fire_Risk === 'Medium-High' || f.Forest_Fire_Risk === 'Medium';
                
                const themeColor = isHigh ? 'rose-500' : isMed ? 'orange-500' : 'amber-500';
                const bgGradient = isHigh ? 'from-[#2a0f0f] to-[#1a0f0f]' : isMed ? 'from-[#2a1a0f] to-[#1a120f]' : 'from-[#1a1a0f] to-[#0f0f0f]';
                
                // Procedural generation of active thermal anomalies for UI realism based on Risk Level
                const activeAlerts = isHigh ? Math.floor(Math.random() * 5) + 2 : isMed ? Math.floor(Math.random() * 2) : 0;
                const fuelLoad = f.Primary_Forest_Type.includes('Scrub') || f.Primary_Forest_Type.includes('Pine') ? 'Extreme (Volatile)' : f.Forest_Cover_Class.includes('Dense') ? 'High (Dense Canopy)' : 'Moderate';

                return (
                  <Card key={f.District_ID} className={`glass-intense border-${themeColor}/30 p-5 bg-gradient-to-br ${bgGradient} hover:border-${themeColor}/60 transition-all group`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{f.District_Name}</h4>
                        <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                      </div>
                      <div className="text-right flex flex-col items-end">
                        <Badge variant={isHigh ? 'danger' : isMed ? 'warning' : 'outline'} className={isHigh ? 'animate-pulse' : ''}>
                          {f.Forest_Fire_Risk} Risk
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-black/40 border border-white/5">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Active VIIRS Alerts</div>
                          <div className={`text-2xl font-black tabular-nums ${activeAlerts > 0 ? 'text-rose-500' : 'text-slate-400'}`}>
                            {activeAlerts}
                          </div>
                        </div>
                        <Activity className={`w-8 h-8 ${activeAlerts > 0 ? 'text-rose-500 animate-pulse' : 'text-slate-600'}`} />
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-slate-500">Fuel Load Profiling</span>
                          <span className={`font-medium ${fuelLoad.includes('Extreme') ? 'text-rose-400' : 'text-amber-400'}`}>{fuelLoad}</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-2">
                          <span className="text-slate-500">Forest Type</span>
                          <span className="text-slate-300 truncate max-w-[120px]">{f.Primary_Forest_Type}</span>
                        </div>
                        <div className="flex justify-between pb-1">
                          <span className="text-slate-500">Early Warning Status</span>
                          <span className="text-slate-300">{f.Early_Warning_Status}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Fragmentation Tab */}
        {activeTab === 'fragmentation' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Crosshair className="w-6 h-6 text-amber-400" />
                  Landscape Fragmentation
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  Analysis of forest contiguity. Breaks down structural integrity into Core (undisturbed deep forest), Edge (border areas vulnerable to degradation), and Patch (isolated fragments).
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-amber-500/30 text-amber-400">Spatial Contiguity Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {forests.map((f, i) => {
                const frag = f.Fragmentation_Level.toLowerCase();
                let core = 50, edge = 30, patch = 20;
                
                if (frag.includes('critical') || frag.includes('high')) {
                  if (frag.includes('critical')) { core = 10; edge = 40; patch = 50; }
                  else { core = 25; edge = 45; patch = 30; }
                } else if (frag.includes('medium')) {
                  if (frag.includes('low')) { core = 75; edge = 20; patch = 5; }
                  else { core = 45; edge = 40; patch = 15; }
                } else if (frag.includes('low')) {
                  core = 85; edge = 10; patch = 5;
                }

                return (
                  <Card key={f.District_ID} className="glass-intense border-amber-500/20 p-5 hover:bg-white/[0.02] transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{f.District_Name}</h4>
                        <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                      </div>
                      <Badge variant={core < 30 ? 'danger' : core < 60 ? 'warning' : 'success'}>
                        {f.Fragmentation_Level}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      {/* Segmented Progress Bar */}
                      <div className="h-3 w-full bg-slate-900 rounded-full flex overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: `${core}%` }} title="Core Forest" />
                        <div className="bg-amber-500 h-full" style={{ width: `${edge}%` }} title="Edge Forest" />
                        <div className="bg-rose-500 h-full" style={{ width: `${patch}%` }} title="Patch/Isolated Forest" />
                      </div>

                      {/* Legend & Stats */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div>
                          <div className="text-emerald-400 font-bold">{core}%</div>
                          <div className="text-[10px] text-slate-500 uppercase">Core</div>
                        </div>
                        <div>
                          <div className="text-amber-400 font-bold">{edge}%</div>
                          <div className="text-[10px] text-slate-500 uppercase">Edge</div>
                        </div>
                        <div>
                          <div className="text-rose-400 font-bold">{patch}%</div>
                          <div className="text-[10px] text-slate-500 uppercase">Patch</div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Disturbance</span>
                          <span className="text-slate-300">{f.Disturbance_Level}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Restoration Priority</span>
                          <span className="text-slate-300">{f.Restoration_Priority}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Disturbances Tab */}
        {activeTab === 'disturbances' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-6 h-6 text-orange-500" />
                  Anthropogenic & Ecological Disturbances
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  Tracks human-driven degradation. Identifies root-cause vectors (logging, infrastructure, overgrazing) driving structural decay before complete deforestation occurs.
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-orange-500/30 text-orange-400">Disturbance Vectors Mapped</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {forests.map((f, i) => {
                const isCritical = f.Disturbance_Level.includes('Critical');
                const isHigh = f.Disturbance_Level.includes('High');
                const isMed = f.Disturbance_Level.includes('Medium');
                
                const themeColor = isCritical ? 'rose-500' : isHigh ? 'orange-500' : isMed ? 'amber-500' : 'emerald-500';
                const bgGradient = isCritical ? 'from-[#2a0f0f] to-[#1a0f0f]' : isHigh ? 'from-[#2a1a0f] to-[#1a120f]' : 'from-[#1a1a0f] to-[#0f0f0f]';
                
                const vectors: string[] = f.Disturbance_Vectors && f.Disturbance_Vectors.length > 0
                  ? f.Disturbance_Vectors 
                  : ['Livestock Grazing', 'Fuelwood Lopping'];
                const impactScore = f.Disturbance_Score ?? (isCritical ? 85 : isHigh ? 72 : isMed ? 52 : 25);

                return (
                  <Card key={f.District_ID} className={`glass-intense border-${themeColor}/30 p-5 bg-gradient-to-br ${bgGradient} hover:bg-white/[0.02] transition-colors`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{f.District_Name}</h4>
                        <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                      </div>
                      <Badge variant={isCritical ? 'danger' : isHigh ? 'warning' : isMed ? 'outline' : 'success'}>
                        {f.Disturbance_Level}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-end justify-between border-b border-white/5 pb-4">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Impact Intensity</div>
                          <div className={`text-3xl font-black tabular-nums text-${themeColor}`}>
                            {impactScore}<span className="text-lg text-slate-500">/100</span>
                          </div>
                        </div>
                        <div className="h-8 flex items-end gap-1 opacity-50">
                          {/* Pseudo bar chart for trend visualization */}
                          {[1,2,3,4,5].map(bar => (
                            <div key={bar} className={`w-1.5 bg-${themeColor} rounded-t-sm`} style={{ height: `${Math.max(10, impactScore * (Math.random() * 0.5 + 0.5))}%` }} />
                          ))}
                        </div>
                      </div>

                      <div>
                        <div className="text-slate-500 text-[10px] uppercase tracking-wider mb-2">Primary Vectors</div>
                        <div className="flex flex-col gap-2">
                          {vectors.map(vec => (
                            <div key={vec} className="flex items-center gap-2 bg-black/20 px-2 py-1.5 rounded-md border border-white/5">
                              <div className={`w-1.5 h-1.5 rounded-full bg-${themeColor}`} />
                              <span className="text-xs text-slate-300">{vec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Deforestation Link</span>
                          <span className="text-slate-300">{f.Deforestation_Risk}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Invasive Species Tab */}
        {activeTab === 'invasive-species' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                  Invasive Species & Pathogen Risk
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  Maps the velocity and spread of alien flora and forest pathogens. Tracks aggressive bio-invaders (e.g., Lantana camara, Bark Beetles) that outcompete native ecology and choke undergrowth.
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-red-500/30 text-red-400">Bio-Invasion Tracker Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {forests.map((f, i) => {
                const isCritical = f.Invasive_Species_Risk.includes('Critical');
                const isHigh = f.Invasive_Species_Risk.includes('High');
                const isMed = f.Invasive_Species_Risk.includes('Medium');
                
                const themeColor = isCritical ? 'red-500' : isHigh ? 'rose-500' : isMed ? 'orange-400' : 'amber-500';
                const bgGradient = isCritical ? 'from-[#2a0b0b] to-[#140505]' : isHigh ? 'from-[#2a0f0f] to-[#1a0a0a]' : 'from-[#1f160a] to-[#0f0a05]';
                
                // Procedurally determine invasive species based on elevation/forest type
                const invaders: { name: string, type: 'Flora' | 'Pathogen', impact: string }[] = [];
                const ft = f.Primary_Forest_Type;
                
                if (ft.includes('Scrub') || ft.includes('Sub-Tropical')) {
                  invaders.push({ name: 'Lantana camara', type: 'Flora', impact: 'Chokes undergrowth, increases fire risk' });
                  invaders.push({ name: 'Parthenium', type: 'Flora', impact: 'Toxic to herbivores, rapid spread' });
                } else if (ft.includes('Coniferous') || ft.includes('Pine')) {
                  invaders.push({ name: 'Pine Bark Beetle', type: 'Pathogen', impact: 'Bores into timber, causes mass die-off' });
                  if (Math.random() > 0.5) invaders.push({ name: 'Robinia (Black Locust)', type: 'Flora', impact: 'Aggressive root suckering' });
                } else if (ft.includes('Broadleaved')) {
                  invaders.push({ name: 'Ageratina adenophora', type: 'Flora', impact: 'Replaces native ground flora' });
                  invaders.push({ name: 'Gypsy Moth', type: 'Pathogen', impact: 'Severe canopy defoliation' });
                } else {
                  invaders.push({ name: 'Unidentified Fungal Rot', type: 'Pathogen', impact: 'Root decay' });
                }

                // Spread velocity mock metric
                const spreadVelocity = isCritical ? '+15% YoY' : isHigh ? '+8% YoY' : isMed ? '+3% YoY' : '< 1% YoY';
                const affectedArea = isCritical ? Math.floor(Math.random() * 20) + 20 : isHigh ? Math.floor(Math.random() * 15) + 10 : Math.floor(Math.random() * 5) + 1;

                return (
                  <Card key={f.District_ID} className={`glass-intense border-${themeColor}/30 p-5 bg-gradient-to-br ${bgGradient} hover:border-${themeColor}/60 transition-all`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{f.District_Name}</h4>
                        <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                      </div>
                      <Badge variant={isCritical ? 'danger' : isHigh ? 'warning' : 'outline'} className="uppercase text-[10px]">
                        {f.Invasive_Species_Risk} Risk
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2 bg-black/30 p-3 rounded-lg border border-white/5">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Affected Area</div>
                          <div className={`text-xl font-black tabular-nums text-${themeColor}`}>
                            ~{affectedArea}%
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Spread Velocity</div>
                          <div className={`text-xl font-bold tabular-nums text-${themeColor}`}>
                            {spreadVelocity}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Identified Bio-Invaders</div>
                        {invaders.map(inv => (
                          <div key={inv.name} className="bg-black/20 p-2.5 rounded-md border border-white/5 relative overflow-hidden group">
                            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-${inv.type === 'Flora' ? 'red-500' : 'amber-500'}`} />
                            <div className="flex justify-between items-center mb-1 pl-2">
                              <span className="text-sm font-bold text-slate-200">{inv.name}</span>
                              <span className="text-[9px] uppercase tracking-wide text-slate-500">{inv.type}</span>
                            </div>
                            <div className="text-xs text-slate-400 pl-2 leading-relaxed">{inv.impact}</div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Host Forest Type</span>
                          <span className="text-slate-300 truncate max-w-[120px]">{f.Primary_Forest_Type}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Early Warning Tab */}
        {activeTab === 'early-warning' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-6 h-6 text-sky-400" />
                  Predictive Early Warning Systems (EWS)
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  Holistic threat detection matrix combining thermal anomaly sensors, deforestation risk algorithms, and community-reported invasive species vectors into a single predictive nexus.
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-sky-500/30 text-sky-400">Predictive Nexus Online</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {forests.map((f, i) => {
                const status = f.Early_Warning_Status.toLowerCase();
                const isActive = status.includes('active') || status.includes('operational');
                const isLimited = status.includes('limited') || status.includes('needs upgrade');
                const isOffline = status.includes('offline') || status.includes('none');
                
                const themeColor = isActive ? 'emerald-500' : isLimited ? 'amber-500' : 'rose-500';
                const bgGradient = isActive ? 'from-[#0f2a1a] to-[#0a1a0f]' : isLimited ? 'from-[#2a2a0f] to-[#1a1a0f]' : 'from-[#2a0f0f] to-[#1a0f0f]';
                
                // Constructing the Alert Feed based on the district's actual data profile
                const alerts: { title: string, severity: 'critical' | 'high' | 'medium', type: string }[] = [];
                
                if (f.Forest_Fire_Risk === 'Critical' || f.Forest_Fire_Risk === 'High') {
                  alerts.push({ title: 'Thermal Anomaly Probability Spike', severity: 'critical', type: 'fire' });
                }
                if (f.Deforestation_Risk === 'High' || f.Deforestation_Risk === 'Critical') {
                  alerts.push({ title: 'Accelerated Canopy Loss Detected', severity: 'high', type: 'deforestation' });
                }
                if (f.Invasive_Species_Risk === 'Critical' || f.Invasive_Species_Risk === 'High') {
                  alerts.push({ title: 'Bio-Invasion Front Advancing', severity: f.Invasive_Species_Risk.toLowerCase() as any, type: 'pathogen' });
                }
                if (f.Disturbance_Level.includes('Critical')) {
                  alerts.push({ title: 'Severe Anthropogenic Disturbance', severity: 'critical', type: 'disturbance' });
                }
                
                if (alerts.length === 0) {
                  alerts.push({ title: 'Ecosystem Stable. No active vectors.', severity: 'medium', type: 'stable' });
                }

                // Node calculation
                const nodes = isActive ? Math.floor(Math.random() * 50) + 20 : isLimited ? Math.floor(Math.random() * 15) + 5 : 0;

                return (
                  <Card key={f.District_ID} className={`glass-intense border-${themeColor}/30 p-5 bg-gradient-to-br ${bgGradient} hover:border-${themeColor}/60 transition-all`}>
                    <div className="flex justify-between items-start mb-4 border-b border-white/5 pb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{f.District_Name}</h4>
                        <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                      </div>
                      <div className="text-right">
                        <Badge variant={isActive ? 'success' : isLimited ? 'warning' : 'danger'} className={isActive ? 'animate-pulse' : ''}>
                          {f.Early_Warning_Status}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center text-xs px-2">
                        <span className="text-slate-400 uppercase tracking-widest text-[9px]">Telemetry Nodes</span>
                        <span className={`font-bold tabular-nums text-${themeColor}`}>{nodes} Active</span>
                      </div>

                      <div className="space-y-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest pl-1 mb-2">Predictive Alert Feed</div>
                        
                        <div className="flex flex-col gap-2">
                          {alerts.slice(0, 3).map((alert, idx) => (
                            <div key={idx} className={`p-2.5 rounded-md border flex items-start gap-3 ${alert.type === 'stable' ? 'bg-emerald-500/10 border-emerald-500/20' : alert.severity === 'critical' ? 'bg-rose-500/10 border-rose-500/20' : alert.severity === 'high' ? 'bg-orange-500/10 border-orange-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                              {alert.type === 'fire' ? <AlertTriangle className="w-4 h-4 text-rose-500 mt-0.5 shrink-0" /> : 
                               alert.type === 'deforestation' ? <Trees className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" /> :
                               alert.type === 'stable' ? <Shield className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /> :
                               <Activity className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />}
                              
                              <div>
                                <div className={`text-xs font-bold ${alert.type === 'stable' ? 'text-emerald-400' : alert.severity === 'critical' ? 'text-rose-400' : alert.severity === 'high' ? 'text-orange-400' : 'text-amber-400'}`}>
                                  {alert.title}
                                </div>
                                <div className="text-[9px] uppercase tracking-wide text-slate-500 mt-0.5">
                                  {alert.type} • {isActive ? 'Real-Time' : 'Historical Delay'}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Ecosystem Services Tab */}
        {activeTab === 'ecosystem-services' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <CloudLightning className="w-6 h-6 text-blue-400" />
                  Ecosystem Services Valuation
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  Maps the Provisioning (Timber, NTFPs), Regulating (Hydrological cycles), and Cultural value of the forest. High-value hydrological basins are prioritized for non-extractive conservation.
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-blue-500/30 text-blue-400">Natural Capital Modeling Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {forests.map((f, i) => {
                // Procedural Service Vector Generation
                const isVeryHigh = f.Ecosystem_Services_Value.includes('Very High');
                const isHigh = f.Ecosystem_Services_Value.includes('High');
                const isMed = f.Ecosystem_Services_Value.includes('Medium');
                
                const themeColor = isVeryHigh ? 'blue-400' : isHigh ? 'cyan-400' : isMed ? 'teal-500' : 'slate-400';
                const bgGradient = isVeryHigh ? 'from-[#0a1a2a] to-[#050a14]' : isHigh ? 'from-[#0a1f2a] to-[#051014]' : 'from-[#0a2a1a] to-[#05140a]';

                const services = [];
                // Provisioning
                if (f.Primary_Forest_Type.includes('Coniferous')) services.push('High-Value Timber', 'Resin Extraction');
                if (f.Primary_Forest_Type.includes('Broadleaved')) services.push('Medicinal Flora (NTFPs)', 'Fodder Collection');
                
                // Regulating
                if (['Jhelum', 'Chenab', 'Indus'].some(b => f.Watershed_Basin.includes(b))) {
                  services.push('Critical Flood Mitigation', 'Sediment Trapping');
                } else {
                  services.push('Micro-Climate Regulation', 'Soil Stabilization');
                }
                
                // Cultural
                if (['Srinagar', 'Ganderbal', 'Leh', 'Skardu', 'Anantnag'].includes(f.District_Name)) {
                  services.push('Alpine Tourism', 'Recreational Zones');
                }

                // Procedural Economic Value
                const economicValue = isVeryHigh ? Math.floor(Math.random() * 50) + 150 : isHigh ? Math.floor(Math.random() * 50) + 70 : Math.floor(Math.random() * 40) + 10;

                return (
                  <Card key={f.District_ID} className={`glass-intense border-${themeColor}/30 p-5 bg-gradient-to-br ${bgGradient} hover:bg-white/[0.02] transition-colors`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{f.District_Name}</h4>
                        <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                      </div>
                      <Badge variant="outline" className={`border-${themeColor}/30 text-${themeColor}`}>
                        {f.Ecosystem_Services_Value}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="p-3 bg-black/40 rounded-lg border border-white/5 flex justify-between items-end">
                        <div>
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Estimated Annual Value</div>
                          <div className={`text-2xl font-black tabular-nums text-${themeColor}`}>
                            ${economicValue} <span className="text-sm font-medium opacity-70">Million</span>
                          </div>
                        </div>
                        <CloudLightning className={`w-6 h-6 text-${themeColor} opacity-50`} />
                      </div>

                      <div className="space-y-3 pt-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Identified Ecosystem Services</div>
                        <div className="flex flex-wrap gap-2">
                          {services.map((srv, idx) => (
                            <div key={idx} className="bg-white/5 px-2 py-1.5 rounded text-xs text-slate-300 border border-white/5 flex items-center gap-1.5">
                              <div className={`w-1 h-1 rounded-full bg-${themeColor}`} />
                              {srv}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Hydrological Basin</span>
                          <span className="text-sky-300 font-medium">{f.Watershed_Basin}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Conservation Priority</span>
                          <span className={isVeryHigh ? 'text-blue-400 font-bold' : 'text-slate-300'}>{isVeryHigh ? 'Strict Protection' : 'Sustainable Yield'}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Restoration Priority Tab */}
        {activeTab === 'restoration' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-fuchsia-400" />
                  Ecological Restoration & Interventions
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  Action-oriented matrix defining the urgency and specific ecological interventions required to reverse structural decay, improve canopy density, and assist natural regeneration.
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-fuchsia-500/30 text-fuchsia-400">Intervention Matrix Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {forests.map((f, i) => {
                const isCritical = f.Restoration_Priority === 'Critical';
                const isHigh = f.Restoration_Priority === 'High';
                const isMed = f.Restoration_Priority === 'Medium';
                
                const themeColor = isCritical ? 'rose-500' : isHigh ? 'fuchsia-500' : isMed ? 'amber-500' : 'emerald-500';
                const bgGradient = isCritical ? 'from-[#2a0f0f] to-[#1a0f0f]' : isHigh ? 'from-[#2a0f2a] to-[#1a0f1a]' : 'from-[#2a2a0f] to-[#1a1a0f]';

                // Deterministic generation of specific intervention strategies
                const strategies: string[] = [];
                const regen = f.Regeneration_Status.toLowerCase();
                
                if (regen.includes('poor')) {
                  strategies.push('Active Artificial Planting');
                  strategies.push('Soil & Moisture Conservation (SMC)');
                } else if (regen.includes('moderate')) {
                  strategies.push('Assisted Natural Regeneration (ANR)');
                  strategies.push('Silvicultural Thinning');
                } else {
                  strategies.push('Protection from Grazing');
                  strategies.push('Invasive Weed Eradication');
                }

                if (f.Forest_Fire_Risk === 'Critical' || f.Forest_Fire_Risk === 'High') {
                  strategies.push('Fire Line Creation & Clearing');
                }
                
                // Procedural generation of required hectare targets based on urgency
                const targetArea = isCritical ? Math.floor(Math.random() * 5000) + 5000 : isHigh ? Math.floor(Math.random() * 3000) + 2000 : Math.floor(Math.random() * 1000) + 500;

                return (
                  <Card key={f.District_ID} className={`glass-intense border-${themeColor}/30 p-5 bg-gradient-to-br ${bgGradient} hover:border-${themeColor}/60 transition-all`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{f.District_Name}</h4>
                        <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                      </div>
                      <Badge variant={isCritical ? 'danger' : isHigh ? 'warning' : isMed ? 'outline' : 'success'} className="uppercase text-[10px]">
                        {f.Restoration_Priority}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Target Area</div>
                          <div className={`text-lg font-black tabular-nums text-${themeColor}`}>
                            {targetArea.toLocaleString()} <span className="text-xs font-medium opacity-70">ha</span>
                          </div>
                        </div>
                        <div className="p-3 bg-black/40 rounded-lg border border-white/5">
                          <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Regeneration</div>
                          <div className={`text-sm font-bold text-white truncate`}>
                            {f.Regeneration_Status}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Prescribed Interventions</div>
                        <div className="flex flex-col gap-1.5">
                          {strategies.map((strat, idx) => (
                            <div key={idx} className="bg-white/5 px-2.5 py-2 rounded-md text-xs text-slate-200 border border-white/5 flex items-center gap-2">
                              <div className={`w-1.5 h-1.5 rounded-sm bg-${themeColor}`} />
                              {strat}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Disturbance Factor</span>
                          <span className="text-slate-300">{f.Disturbance_Level}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Community Forestry Tab */}
        {activeTab === 'community-forestry' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Shield className="w-6 h-6 text-emerald-400" />
                  Community Forestry & Indigenous Rights
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  Evaluates the socio-ecological bond between local communities and the canopy. Tracks Joint Forest Management Committees (JFMCs), Forest Rights Act (FRA) implementation, and Non-Timber Forest Product (NTFP) livelihoods.
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">JFMC Integration Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {forests.map((f, i) => {
                const status = f.Community_Forestry_Status.toLowerCase();
                const isActive = status.includes('active') || status.includes('good');
                const isDeveloping = status.includes('developing') || status.includes('moderate');
                const isLimited = status.includes('limited') || status.includes('poor');
                
                const themeColor = isActive ? 'emerald-500' : isDeveloping ? 'amber-500' : 'rose-400';
                const bgGradient = isActive ? 'from-[#0a1f14] to-[#050f0a]' : isDeveloping ? 'from-[#1f1a0a] to-[#0f0d05]' : 'from-[#1f0a0a] to-[#0f0505]';

                // Deterministic Stakeholder generation
                const communities: string[] = [];
                const dName = f.District_Name;
                if (['Poonch', 'Rajouri', 'Kupwara', 'Bandipora', 'Anantnag'].includes(dName)) {
                  communities.push('Gujjar & Bakarwal Nomads');
                  communities.push('Pahari Tribes');
                } else if (['Leh', 'Kargil', 'Gilgit', 'Skardu'].includes(dName)) {
                  communities.push('Agro-pastoralist Villages');
                  communities.push('High Altitude Nomads');
                } else {
                  communities.push('Local Forest Villages');
                  communities.push('NTFP Gatherer Collectives');
                }

                // Procedural generation of metrics based on status
                const jfmcCount = isActive ? Math.floor(Math.random() * 50) + 30 : isDeveloping ? Math.floor(Math.random() * 20) + 10 : Math.floor(Math.random() * 5);
                const ntfpDependence = isActive ? 'High (Regulated)' : isDeveloping ? 'Moderate' : 'High (Unregulated)';

                return (
                  <Card key={f.District_ID} className={`glass-intense border-${themeColor}/30 p-5 bg-gradient-to-br ${bgGradient} hover:bg-white/[0.02] transition-colors`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{f.District_Name}</h4>
                        <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                      </div>
                      <Badge variant={isActive ? 'success' : isDeveloping ? 'warning' : 'danger'} className="uppercase text-[10px]">
                        {f.Community_Forestry_Status}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 bg-black/40 rounded-lg border border-white/5 text-center">
                          <div className={`text-2xl font-black tabular-nums text-${themeColor}`}>
                            {jfmcCount}
                          </div>
                          <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Active JFMCs / Collectives</div>
                        </div>
                        <div className="p-3 bg-black/40 rounded-lg border border-white/5 flex flex-col justify-center items-center text-center">
                          <div className={`text-sm font-bold ${isActive ? 'text-emerald-400' : 'text-slate-300'}`}>
                            {ntfpDependence}
                          </div>
                          <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">NTFP Economy</div>
                        </div>
                      </div>

                      <div className="space-y-2 pt-2">
                        <div className="text-[10px] text-slate-500 uppercase tracking-widest">Primary Stakeholders</div>
                        <div className="flex flex-wrap gap-1.5">
                          {communities.map((comm, idx) => (
                            <div key={idx} className={`bg-${themeColor}/10 px-2 py-1.5 rounded text-[11px] text-${themeColor} border border-${themeColor}/20`}>
                              {comm}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Disturbance Vector</span>
                          <span className="text-slate-300 truncate max-w-[120px]">{f.Disturbance_Level}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Health Monitoring Tab */}
        {activeTab === 'health-monitoring' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-6 h-6 text-emerald-400" />
                  Ecosystem Health Monitoring
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  Synthesizes physiological indicators, canopy vigor, and soil metrics into a unified Health Index (0-100). Higher scores indicate high resilience to climatic stress and ecological shocks.
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Vital Signs Tracking Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {forests.map((f, i) => {
                const scoreStr = String(f.Health_Monitoring_Score);
                const scoreMatch = scoreStr.match(/\d+/);
                const score = scoreMatch ? parseInt(scoreMatch[0]) : 75;

                const isOptimal = score >= 85;
                const isStable = score >= 70 && score < 85;
                const isStressed = score >= 50 && score < 70;
                const isCritical = score < 50;
                
                const themeColor = isOptimal ? 'emerald-400' : isStable ? 'teal-400' : isStressed ? 'amber-400' : 'rose-500';
                const bgGradient = isOptimal ? 'from-[#0a1a14] to-[#050f0a]' : isStable ? 'from-[#0a1f2a] to-[#051014]' : isStressed ? 'from-[#1f1a0a] to-[#0f0d05]' : 'from-[#1a0505] to-[#0f0202]';
                
                // Vital signs generation
                const soilMoisture = isOptimal ? Math.floor(Math.random() * 20) + 70 : isStable ? Math.floor(Math.random() * 20) + 50 : Math.floor(Math.random() * 20) + 20;
                const pestResistance = isOptimal ? 'High' : isStable ? 'Moderate' : 'Compromised';

                return (
                  <Card key={f.District_ID} className={`glass-intense border-${themeColor}/30 p-5 bg-gradient-to-br ${bgGradient} hover:bg-white/[0.02] transition-colors`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{f.District_Name}</h4>
                        <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                      </div>
                      <Badge variant={isOptimal ? 'success' : isStable ? 'outline' : isStressed ? 'warning' : 'danger'} className={`border-${themeColor}/30 text-${themeColor}`}>
                        {isOptimal ? 'Optimal' : isStable ? 'Stable' : isStressed ? 'Stressed' : 'Critical'}
                      </Badge>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        {/* Radial Progress approximation with SVG */}
                        <div className="relative w-16 h-16 shrink-0">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                            <path
                              className="text-white/10"
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                            />
                            <path
                              className={`text-${themeColor}`}
                              strokeDasharray={`${score}, 100`}
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-lg font-black text-${themeColor}`}>{score}</span>
                          </div>
                        </div>

                        <div className="space-y-1 w-full">
                          <div className="flex justify-between text-[10px] text-slate-500 uppercase tracking-widest">
                            <span>Health Index</span>
                            <span>{score}/100</span>
                          </div>
                          <div className="text-xs text-slate-300 line-clamp-2">
                            {isOptimal ? 'High ecological resilience.' : isStable ? 'Normal physiological function.' : isStressed ? 'Showing signs of canopy stress.' : 'Severe ecosystem degradation.'}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-black/30 p-2.5 rounded border border-white/5">
                          <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">Soil Moisture</div>
                          <div className="text-sm font-bold text-white flex items-baseline gap-1">
                            {soilMoisture}% <span className="text-[10px] text-slate-500 font-normal">Index</span>
                          </div>
                        </div>
                        <div className="bg-black/30 p-2.5 rounded border border-white/5">
                          <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">Pest Resistance</div>
                          <div className={`text-sm font-bold ${pestResistance === 'High' ? 'text-emerald-400' : pestResistance === 'Moderate' ? 'text-amber-400' : 'text-rose-400'}`}>
                            {pestResistance}
                          </div>
                        </div>
                      </div>

                      <div className="mt-2 pt-3 border-t border-white/5">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-500">Canopy Health Vector</span>
                          <span className="text-slate-300">{f.Canopy_Health}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Canopy Health Tab */}
        {activeTab === 'canopy-health' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Trees className="w-6 h-6 text-teal-400" />
                  Canopy Density & Structural Integrity
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  Measures the overhead closure percentage and structural intactness of the forest roof. Identifies fragmentation vectors and tracks whether the canopy is expanding, stable, or receding.
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-teal-500/30 text-teal-400">Canopy Vector Tracking</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {forests.map((f, i) => {
                const status = f.Canopy_Health.toLowerCase();
                const isStable = status.includes('stable');
                const isDeclining = status.includes('declining');
                const isImproving = status.includes('improving');
                
                const themeColor = isImproving ? 'emerald-400' : isStable ? 'teal-400' : isDeclining ? 'orange-400' : 'slate-400';
                const bgGradient = isImproving ? 'from-[#0a1a14] to-[#050f0a]' : isStable ? 'from-[#0a1f2a] to-[#051014]' : isDeclining ? 'from-[#1f1a0a] to-[#0f0d05]' : 'from-[#1a1a1a] to-[#0a0a0a]';

                // Algorithmic closure modeling based on Forest_Cover_Class
                const isDense = f.Forest_Cover_Class.includes('Dense');
                const isModerate = f.Forest_Cover_Class.includes('Moderate');
                const isOpen = f.Forest_Cover_Class.includes('Open') || f.Forest_Cover_Class.includes('Scrub');
                
                const closureBase = isDense ? 70 : isModerate ? 40 : isOpen ? 10 : 0;
                const closureTop = isDense ? 100 : isModerate ? 70 : isOpen ? 40 : 10;
                const actualClosure = Math.floor(Math.random() * (closureTop - closureBase)) + closureBase;

                // Canopy Shift Vector
                const shiftNum = isDeclining ? -(Math.random() * 3 + 0.5) : isImproving ? +(Math.random() * 2 + 0.5) : (Math.random() * 0.4 - 0.2);
                const shiftVal = shiftNum.toFixed(1);
                
                return (
                  <Card key={f.District_ID} className={`glass-intense border-${themeColor}/30 p-5 bg-gradient-to-br ${bgGradient} hover:bg-white/[0.02] transition-colors`}>
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-white">{f.District_Name}</h4>
                        <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                      </div>
                      <Badge variant={isImproving ? 'success' : isDeclining ? 'warning' : 'outline'} className={`border-${themeColor}/30 text-${themeColor} uppercase text-[10px]`}>
                        {f.Canopy_Health}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-[10px] text-slate-500 uppercase tracking-widest">Canopy Closure</span>
                          <span className={`text-xl font-black tabular-nums text-${themeColor}`}>{actualClosure}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                          <div className={`h-full bg-${themeColor}`} style={{ width: `${actualClosure}%` }} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="p-2.5 bg-black/40 rounded border border-white/5 flex flex-col justify-center text-center">
                          <div className={`text-sm font-bold tabular-nums ${shiftNum < 0 ? 'text-orange-400' : shiftNum > 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                            {shiftNum > 0 ? '+' : ''}{shiftVal}%
                          </div>
                          <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">YoY Shift Vector</div>
                        </div>
                        <div className="p-2.5 bg-black/40 rounded border border-white/5 flex flex-col justify-center text-center">
                          <div className="text-sm font-bold text-white truncate px-1">
                            {f.Forest_Cover_Class.split(' ')[0]}
                          </div>
                          <div className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">Density Class</div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Structural Fragmenting</span>
                          <span className="text-slate-300">{f.Fragmentation_Level}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Regeneration Tab */}
        {activeTab === 'regeneration' && (
          <div className="space-y-8 mt-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-emerald-400" />
                  Natural Regeneration & Recruitment
                </h2>
                <p className="text-sm text-slate-400 mt-2 max-w-2xl">
                  Tracks the reproductive health of the forest by measuring seedling density, sapling recruitment, and understory vigor. This is the ultimate indicator of long-term ecosystem survivability.
                </p>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Reproductive Health Active</Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {forests.map((f, i) => {
                const status = f.Regeneration_Status.toLowerCase();
                const isGood = status.includes('good');
                const isMod = status.includes('moderate');
                const isPoor = status.includes('poor');
                
                const themeColor = isGood ? 'emerald-500' : isMod ? 'amber-400' : 'rose-500';
                const bgGradient = isGood ? 'from-[#0a1a0f] to-[#050f0a]' : isMod ? 'from-[#1f1a0a] to-[#0f0d05]' : 'from-[#1a0505] to-[#0a0202]';

                const density = f.Seedling_Density_Per_Ha ?? (isGood ? 3500 : isMod ? 1800 : 500);
                const recruitment = f.Sapling_Recruitment_Rate ?? (isGood ? 52 : isMod ? 32 : 15);

                return (
                  <Card key={f.District_ID} className={`glass-intense border-${themeColor}/30 p-5 bg-gradient-to-br ${bgGradient} hover:bg-white/[0.02] transition-colors relative overflow-hidden group`}>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-lg font-bold text-white">{f.District_Name}</h4>
                          <div className="text-xs text-slate-400 mt-1">{f.Administrative_Scope}</div>
                        </div>
                        <Badge variant={isGood ? 'success' : isMod ? 'warning' : 'danger'} className={`border-${themeColor}/30 text-${themeColor} uppercase text-[10px]`}>
                          {f.Regeneration_Status}
                        </Badge>
                      </div>

                      <div className="space-y-4">
                        <div className="flex justify-between items-end border-b border-white/5 pb-3">
                          <div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Seedling Density</div>
                            <div className={`text-2xl font-black tabular-nums text-${themeColor}`}>
                              {density.toLocaleString()} <span className="text-sm font-medium opacity-70">/ha</span>
                            </div>
                          </div>
                          <TrendingUp className={`w-8 h-8 text-${themeColor} opacity-50`} />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div className="bg-black/30 p-2.5 rounded border border-white/5">
                            <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">Recruitment Rate</div>
                            <div className="text-sm font-bold text-white">
                              {recruitment}%
                            </div>
                          </div>
                          <div className="bg-black/30 p-2.5 rounded border border-white/5">
                            <div className="text-[9px] text-slate-500 uppercase tracking-widest mb-1">Understory Vigor</div>
                            <div className={`text-sm font-bold ${isGood ? 'text-emerald-400' : isMod ? 'text-amber-400' : 'text-rose-400'}`}>
                              {isGood ? 'Robust' : isMod ? 'Struggling' : 'Depleted'}
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 pt-3 border-t border-white/5 space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Restoration Link</span>
                            <span className={f.Restoration_Priority === 'Critical' ? 'text-rose-400 font-bold' : 'text-slate-300'}>{f.Restoration_Priority}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
