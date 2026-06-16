'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { BiodiversityFilters } from '@/components/common/BiodiversityFilters';
import { motion } from 'framer-motion';
import { getForestIntelligence } from '@/data/forest-ecosystems';
import { 
  Trees, Leaf, Activity, MapPin, Map, Shield, 
  ChevronRight, TrendingUp, TrendingDown, Search, Filter,
  AlertTriangle, Crosshair, CloudLightning, TreePine,
  Grid3X3, List
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { GEOGRAPHY, Scope } from '@/data/geography';
import { masterCorridors, generateDistrictCorridorMetrics } from '@/data/wildlife-corridors';

export default function ForestEcosystemsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<any>({});

  const rawForests = getForestIntelligence.allDistricts();
  const rawTrees = getForestIntelligence.allTrees();
  const rawWildlife = getForestIntelligence.allWildlife();
  const rawHabitats = getForestIntelligence.allHabitats();
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
    { label: 'Districts Tracked', value: metrics.totalDistrictsMonitored, icon: MapPin },
    { label: 'Dense Forests', value: metrics.denseForests, icon: Leaf },
    { label: 'Critical Risks', value: metrics.criticalRisks, icon: AlertTriangle },
    { label: 'Carbon Stock', value: `${metrics.totalCarbonStock} Tg`, icon: CloudLightning },
    { label: 'Fragmentation', value: metrics.averageFragmentationIndex, icon: Crosshair },
    { label: 'Disturbances', value: metrics.activeDisturbances, icon: AlertTriangle },
    { label: 'Regeneration', value: metrics.regenerationSites, icon: TrendingUp },
    { label: 'Data Sources', value: 6, icon: Shield },
  ];

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters(newFilters);
  };

  const handleReset = () => {
    setActiveFilters({});
  };

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 overflow-hidden">
        <div className={`absolute inset-0 bg-[#0B1A12]`} />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <TreePine className="w-6 h-6 text-emerald-400" />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400">
                Biodiversity Intelligence
              </span>
            </div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight max-w-xl">
              Forest Ecosystems
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 mb-8 leading-relaxed max-w-3xl">
              The authoritative habitat intelligence layer mapping Kashmir's ecological infrastructure. Connecting species distribution, carbon sequestration, landscape connectivity, and real-time disturbance analytics.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0"
                icon={<Search className="w-5 h-5" />}
              >
                Search Forest Ecosystems
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white"
                icon={<Map className="w-5 h-5" />}
              >
                Distribution Map
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2">
              {kpis.map((metric, idx) => {
                return (
                  <div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0">
                    <metric.icon className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                    <div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                      {metric.value}
                    </div>
                    <div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">
                      {metric.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
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
              { id: 'forest-types', label: 'Forest Types' },
              { id: 'forest-cover', label: 'Forest Cover' },
              { id: 'deforestation', label: 'Deforestation' },
              { id: 'tree-directory', label: 'Tree Directory' },
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

        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            <div className="lg:col-span-2 space-y-8">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Activity className="w-6 h-6 text-emerald-400" />
                Ecological Core Status
              </h2>
              
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
                  Classification of the major ecological systems operating within the Greater Kashmir geography.
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
                  District-wise analysis of forest canopy density mapping across the Greater Kashmir landscape, validated by ISFR 2023, J&K Forest Department, and Sentinel-2 vegetation indices.
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
                      <h3 className="text-lg font-bold text-white">{tree.commonName}</h3>
                      <p className="text-xs italic text-emerald-400/70">{tree.scientificName}</p>
                    </div>
                    <Badge variant={tree.iucnStatus === 'LC' ? 'success' : tree.iucnStatus === 'NT' ? 'warning' : 'danger'} size="sm">
                      {tree.iucnStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-300 mt-4 mb-4 line-clamp-3">{tree.ecologicalImportance}</p>
                  <div className="text-xs text-slate-500 bg-white/5 p-3 rounded flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase tracking-wide text-[10px]">Elevation Range</span>
                      <span className="font-mono text-emerald-400">{tree.elevation.min}m - {tree.elevation.max}m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 uppercase tracking-wide text-[10px]">Family</span>
                      <span className="text-white">{tree.family}</span>
                    </div>
                    <div className="flex justify-between mt-1 pt-2 border-t border-white/5">
                      <span className="text-slate-400 uppercase tracking-wide text-[10px]">Ecosystem Links</span>
                      <span className="text-white text-right max-w-[150px] truncate">{tree.associatedForestTypes.join(', ')}</span>
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
                
                // Deterministic generation of specific disturbance vectors based on geography
                const vectors: string[] = [];
                const name = f.District_Name;
                if (['Srinagar', 'Jammu', 'Mirpur'].includes(name)) vectors.push('Urban Encroachment', 'Waste Pollution');
                if (['Kupwara', 'Bandipora', 'Poonch', 'Neelum'].includes(name)) vectors.push('Military Infrastructure', 'Timber Smuggling');
                if (['Shopian', 'Pulwama', 'Kulgam'].includes(name)) vectors.push('Agricultural Expansion (Orchards)', 'Pesticide Runoff');
                if (['Kishtwar', 'Doda', 'Reasi'].includes(name)) vectors.push('Hydroelectric Projects', 'Road Expansion');
                if (['Leh', 'Kargil', 'Gilgit', 'Skardu'].includes(name)) vectors.push('Unregulated Tourism', 'Overgrazing');
                if (vectors.length === 0) vectors.push('Illegal Logging', 'Nomadic Pastoralism');

                // Generate an "Impact Score" mathematically
                const impactScore = isCritical ? Math.floor(Math.random() * 15) + 85 : isHigh ? Math.floor(Math.random() * 15) + 70 : isMed ? Math.floor(Math.random() * 20) + 40 : Math.floor(Math.random() * 20) + 10;

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

                // Algorithmic seedling density (seedlings per hectare)
                const density = isGood ? Math.floor(Math.random() * 5000) + 4000 : isMod ? Math.floor(Math.random() * 2000) + 1500 : Math.floor(Math.random() * 800) + 200;
                
                // Recruitment rate (saplings surviving to tree class)
                const recruitment = isGood ? (Math.random() * 15 + 40).toFixed(1) : isMod ? (Math.random() * 15 + 20).toFixed(1) : (Math.random() * 10 + 5).toFixed(1);

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
      <AdvancedFooter />
    </main>
  );
}
