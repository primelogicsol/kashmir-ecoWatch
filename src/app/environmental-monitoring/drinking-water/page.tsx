'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { Droplets, Activity, MapPin, FlaskConical, AlertTriangle, Shield, CheckCircle, Info, Waves, Map } from 'lucide-react';
import { motion } from 'framer-motion';

import { drinkingWaterData, DrinkingWaterRecord, drinkingWaterQualitySourceRegistry } from '@/data/drinking-water';

// ─── Drinking Water Card ──────────────────────────────────────────────────

function DrinkingWaterCard({ record, index }: { record: DrinkingWaterRecord; index: number }) {
  const isCritical = record.risk_level === 'Critical';
  const isHigh = record.risk_level === 'High' || record.priority_level === 'Strategic';
  
  let riskColor = 'text-slate-400';
  let badgeVariant: 'default' | 'success' | 'warning' | 'danger' | 'critical' = 'default';
  
  if (record.risk_level === 'Low') {
    riskColor = 'text-emerald-400';
    badgeVariant = 'success';
  } else if (record.risk_level === 'Moderate') {
    riskColor = 'text-amber-400';
    badgeVariant = 'warning';
  } else if (record.risk_level === 'High') {
    riskColor = 'text-orange-400';
    badgeVariant = 'danger';
  } else if (record.risk_level === 'Critical') {
    riskColor = 'text-red-400';
    badgeVariant = 'critical';
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
      className="h-full"
    >
      <Card className="glass-intense border-white/10 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden group hover:border-white/20">
        
        <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b opacity-10 pointer-events-none ${
          isCritical ? 'from-red-500 to-transparent' : isHigh ? 'from-amber-500 to-transparent' : 'from-blue-500 to-transparent'
        }`} />

        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-blue-300 transition-colors">Tap Water Quality</h3>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {record.area}
            </p>
          </div>
          <Badge variant={badgeVariant} size="sm" className="flex-shrink-0 text-[10px] shadow-sm">
            {record.risk_level} Risk
          </Badge>
        </div>

        <div className="flex flex-col gap-1.5 text-xs mt-2 bg-white/[0.02] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Supply Type</span>
            <span className="text-blue-400 font-medium truncate ml-2 text-right">{record.supply_type}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Urban / Rural</span>
            <span className="text-slate-300 font-medium truncate">{record.urban_rural}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1.5 text-[10px] mt-1">
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Testing Coverage</span>
            <span className="text-white font-medium truncate ml-2">{record.testing_coverage}</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Treatment Status</span>
            <span className="text-slate-300 truncate ml-2">{record.treatment_status}</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Chlorination Status</span>
            <span className="text-slate-300 truncate ml-2">{record.chlorination_status}</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Priority Level</span>
            <span className="text-slate-300 font-bold truncate ml-2">{record.priority_level}</span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-1 text-[10px] text-slate-400">
          <div className="flex items-start gap-1.5">
            <Activity className={`w-3 h-3 flex-shrink-0 mt-0.5 ${riskColor}`} />
            <span className="line-clamp-2 leading-snug">
              <strong className="text-slate-300 font-medium">Main Risk:</strong> <span className={riskColor}>{record.quality_issue}</span>
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Drinking Water Row ──────────────────────────────────────────────────────

function DrinkingWaterRow({ record, index }: { record: DrinkingWaterRecord; index: number }) {
  let riskColor = 'text-slate-400';
  let badgeVariant: 'default' | 'success' | 'warning' | 'danger' | 'critical' = 'default';
  
  if (record.risk_level === 'Low') {
    riskColor = 'text-emerald-400';
    badgeVariant = 'success';
  } else if (record.risk_level === 'Moderate') {
    riskColor = 'text-amber-400';
    badgeVariant = 'warning';
  } else if (record.risk_level === 'High') {
    riskColor = 'text-orange-400';
    badgeVariant = 'danger';
  } else if (record.risk_level === 'Critical') {
    riskColor = 'text-red-400';
    badgeVariant = 'critical';
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all">
        <div className="flex flex-wrap items-center gap-4">
          
          <div className="min-w-[200px] flex-1">
            <span className="text-sm font-bold text-white">{record.area}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1"><Map className="w-3 h-3" /> {record.district}</div>
          </div>

          <div className="w-32 hidden md:block">
            <div className="text-[10px] text-slate-500">Supply Type</div>
            <div className="text-xs font-bold text-blue-400 truncate" title={record.supply_type}>{record.supply_type}</div>
          </div>

          <div className="w-24 hidden xl:block">
            <div className="text-[10px] text-slate-500">Coverage</div>
            <div className="text-xs text-slate-300 truncate" title={record.testing_coverage}>{record.testing_coverage}</div>
          </div>

          <div className="w-32 hidden lg:block">
            <div className="text-[10px] text-slate-500">Main Risk</div>
            <div className={`text-xs font-medium truncate ${riskColor}`}>{record.quality_issue}</div>
          </div>

          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Risk Level</div>
            <Badge variant={badgeVariant} size="sm" className="text-[10px] shadow-sm">
              {record.risk_level}
            </Badge>
          </div>

          <div className="flex-shrink-0 ml-auto">
            <Button variant="outline" size="sm" className="text-xs px-3 border-white/10" icon={<Info className="w-3 h-3" />}>
              Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function DrinkingWaterPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();

  const [supplyFilter, setSupplyFilter] = useState('all');
  const [qualityFilter, setQualityFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [activeTypology, setActiveTypology] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Derive filter options
  const supplyOptions = useMemo(() => Array.from(new Set(drinkingWaterData.map(d => d.supply_type))).filter(Boolean).sort(), []);
  const qualityOptions = useMemo(() => Array.from(new Set(drinkingWaterData.map(d => d.quality_issue))).filter(Boolean).sort(), []);
  const riskOptions = useMemo(() => Array.from(new Set(drinkingWaterData.map(d => d.risk_level))).filter(Boolean).sort(), []);

  const filteredData = useMemo(() => {
    return drinkingWaterData.filter(d => {
      const matchSearch = filter.searchQuery === '' || 
        d.area.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.supply_type.toLowerCase().includes(filter.searchQuery.toLowerCase());
      
      const matchScope = filter.scope === 'All' || d.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || d.district === filter.district;
      
      const matchSupply = supplyFilter === 'all' || d.supply_type === supplyFilter;
      const matchQuality = qualityFilter === 'all' || d.quality_issue === qualityFilter;
      const matchRisk = riskFilter === 'all' || d.risk_level === riskFilter;

      const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'critical' && ['Critical', 'High'].includes(d.risk_level)) ||
        (activeTypology === 'surface' && (d.supply_type?.toLowerCase().includes('surface') || d.supply_type?.toLowerCase().includes('river') || d.supply_type?.toLowerCase().includes('canal'))) ||
        (activeTypology === 'ground' && (d.supply_type?.toLowerCase().includes('ground') || d.supply_type?.toLowerCase().includes('tubewell') || d.supply_type?.toLowerCase().includes('borewell'))) ||
        (activeTypology === 'spring' && (d.supply_type?.toLowerCase().includes('spring') || d.supply_type?.toLowerCase().includes('gravity'))) ||
        (activeTypology === 'safe' && d.risk_level === 'Low');

      return matchSearch && matchScope && matchDistrict && matchSupply && matchQuality && matchRisk && matchTypology;
    });
  }, [filter, supplyFilter, qualityFilter, riskFilter, activeTypology]);

  const totalCount = drinkingWaterData.length;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const extraActiveCount = [supplyFilter, qualityFilter, riskFilter].filter(f => f !== 'all').length;

  const scopeCount = useMemo(() => {
    if (filter.scope === 'All') return 0;
    return drinkingWaterData.filter(d => d.scope === filter.scope).length;
  }, [filter.scope]);

  // Aggregate stats
  const criticalCount = drinkingWaterData.filter(d => d.risk_level === 'Critical').length;
  const highCount = drinkingWaterData.filter(d => d.risk_level === 'High').length;
  const lowCount = drinkingWaterData.filter(d => d.risk_level === 'Low').length;
  const pendingCount = drinkingWaterData.filter(d => d.risk_level === 'Pending Verification').length;
  
  const treatedCount = drinkingWaterData.filter(d => d.treatment_status && d.treatment_status.includes('Treated')).length;
  const groundWaterCount = drinkingWaterData.filter(d => d.supply_type && d.supply_type.includes('Groundwater')).length;
  const monitoredChlorine = drinkingWaterData.filter(d => d.chlorination_status && d.chlorination_status.includes('Monitored')).length;

  const metrics = [
    { label: 'Monitored Sources', value: drinkingWaterData.length, icon: 'MapPin' },
    { label: 'Safe Baselines', value: lowCount, icon: 'CheckCircle' },
    { label: 'High/Critical Risks', value: highCount + criticalCount, icon: 'AlertTriangle' },
    { label: 'Pending Verification', value: pendingCount, icon: 'ShieldAlert' },
    { label: 'Treated Supplies', value: treatedCount, icon: 'Activity' },
    { label: 'Groundwater Sources', value: groundWaterCount, icon: 'Database' },
    { label: 'Chlorine Monitored', value: monitoredChlorine, icon: 'FlaskConical' },
    { label: 'Latest Update', value: 'Today', icon: 'Clock' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Heading
        label="Environmental Monitoring"
        title={<>
            <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
              <span className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1" style={{ fontSize: '0.58em' }}>KEW</span>
              <span>Western Himalayan</span>
            </span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Drinking Water Safety</span>
          </>}
        subtitle="Monitoring verified PCRWR & JJM/WQMIS supply system records, urban/rural coverage, and specific quality contamination risks."
        icon={<Droplets className="w-6 h-6 text-blue-400" />}
        breadcrumbs={[
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Drinking Water Safety' },
        ]}
        images={[
          '/images/env-monitoring/Thumb_Waste.jpg',
          '/images/env-monitoring/env.webp',
          '/images/env-monitoring/sewage-treatment-plant-stp.jpg',
          '/images/env-monitoring/Biomedical_Waste_PTI.jpg',
        ]}
      />

      {/* ── KPI STRIP ────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={metrics} iconColor="text-blue-500" />

      {/* ── FILTER BAR ───────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-30 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect value={supplyFilter} onChange={setSupplyFilter} placeholder="Supply Type" options={supplyOptions.map(c => ({ value: c, label: c as string }))} />
              <FilterSelect value={qualityFilter} onChange={setQualityFilter} placeholder="Quality Issue" options={qualityOptions.map(s => ({ value: s, label: s as string }))} />
              <FilterSelect value={riskFilter} onChange={setRiskFilter} placeholder="Risk Level" options={riskOptions.map(s => ({ value: s, label: s as string }))} />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setSupplyFilter('all');
            setQualityFilter('all');
            setRiskFilter('all');
          }}
        />
      </div>

      
      {/* ── Drinking Water Typologies & Citizen Field Protocols ────────────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Drinking Water Supply Typologies & Potability Vulnerabilities"
          typologySubtitle="Select a water source typology, treatment scheme, or risk tier to audit potable supply health across Kashmir."
          typologyIcon={Droplets}
          typologies={[
            { id: 'all', label: 'All Water Sources', count: drinkingWaterData.length, icon: Droplets, color: 'emerald' },
            { id: 'critical', label: 'High / Critical Risk', count: drinkingWaterData.filter(d => ['Critical', 'High'].includes(d.risk_level)).length, icon: AlertTriangle, color: 'rose' },
            { id: 'surface', label: 'Surface River & Canal Schemes', count: drinkingWaterData.filter(d => d.supply_type?.toLowerCase().includes('surface') || d.supply_type?.toLowerCase().includes('river') || d.supply_type?.toLowerCase().includes('canal')).length, icon: Waves, color: 'cyan' },
            { id: 'ground', label: 'Deep Aquifer & Tubewells', count: drinkingWaterData.filter(d => d.supply_type?.toLowerCase().includes('ground') || d.supply_type?.toLowerCase().includes('tubewell') || d.supply_type?.toLowerCase().includes('borewell')).length, icon: MapPin, color: 'indigo' },
            { id: 'spring', label: 'Spring-Fed Gravity Networks', count: drinkingWaterData.filter(d => d.supply_type?.toLowerCase().includes('spring') || d.supply_type?.toLowerCase().includes('gravity')).length, icon: FlaskConical, color: 'sky' },
            { id: 'safe', label: 'Safe Baseline Schemes', count: drinkingWaterData.filter(d => d.risk_level === 'Low').length, icon: CheckCircle, color: 'teal' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={drinkingWaterData.length}
          entityLabel="monitored supplies"
          spotlightTitle="Potable Supply Infrastructure & Water Quality Benchmarks"
          spotlightSubtitle="Surveillance of Public Health Engineering (PHE / Jal Shakti) filtration plants, chlorination dosages, and pipeline contamination."
          tabs={[
            {
              id: 'filtration',
              label: 'Rangil & Doodhpathri WTP Command Basins',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Northern Potable Backbone</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Rangil Water Treatment Plant</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Supplies ~36 MGD treated water drawn from the glacial Sind River via the Sind Extension Canal. Operates rapid gravity sand filters and automated alum dosing for low post-melt turbidity.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Service Population: ~650,000 residents</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">Southern Urban Supply</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Doodh Ganga / Kralpora WTP</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Supplies uptown Srinagar (Chanapora, Hyderpora, Rawalpora). High vulnerability during autumn/monsoon rainstorms due to upstream soil erosion and agricultural runoff in Budgam.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">Capacity: 10 MGD with dual flocculation basins</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Springshed Gravity Schemes</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Rural Pir Panjal &amp; Anantnag Springs</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Community drinking water relies directly on natural karst springs (Achabal, Kokernag, Verinag). Vulnerable to surface microbial ingress where intake chambers lack fenced catchment sanitary buffers.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Risk Profile: Fecal coliform spikes post-rainfall</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'disinfection',
              label: 'Chlorination Integrity & Microbial Safety',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Free Residual Chlorine (FRC) Monitoring</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Terminal consumer tap water must maintain minimum 0.2 mg/L free chlorine to safeguard against cross-contamination from negative pressure leaks in aging distribution networks.
                    </p>
                    <div className="text-[11px] text-emerald-300 font-mono">Standard: BIS 10500:2012 Drinking Water Specification</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-violet-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Bacteriological Surveillance &amp; Turbidity</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Periodic testing for E. coli / total coliform in peripheral overhead storage reservoirs (ESRs) ensures zero pathogenic transmission across schools and hospitals.
                    </p>
                    <div className="text-[11px] text-violet-300 font-mono">Target: 0 MPN/100 mL coliform count</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="water"
          observeTitle="Citizen Potable Water Quality Surveillance &amp; Tap Testing Network"
          observeSubtitle="Test tap water for residual chlorine, check turbidity, or report suspected waterborne illness outbreaks in your neighborhood."
          observeBadge="BIS 10500 Potability Standard"
          protocols={[
            {
              number: '1',
              title: 'Free Residual Chlorine DPD Colorimetry',
              desc: 'Use DPD-1 test tablets or strips to measure active chlorine in tap water (acceptable range: 0.2 to 0.5 mg/L).',
              benchmark: 'BIS 10500:2012 Drinking Water Standard',
              icon: FlaskConical,
              color: 'cyan',
            },
            {
              number: '2',
              title: 'Turbidity & Sedimentation Observation',
              desc: 'Inspect water clarity against white background or measure using portable nephelometer (acceptable: &lt; 1 NTU, max: 5 NTU).',
              benchmark: 'Central Public Health Engineering Organization',
              icon: Droplets,
              color: 'teal',
            },
            {
              number: '3',
              title: 'H2S Strip Paper Coliform Screening',
              desc: 'Incubate a sample with hydrogen sulfide test paper for 24 hours at 35°C; black coloration indicates pathogenic coliform presence.',
              benchmark: 'WHO Field Bacteriological Water Protocol',
              icon: AlertTriangle,
              color: 'rose',
            },
            {
              number: '4',
              title: 'Pipeline Leakage & Contamination Ingress',
              desc: 'Photograph broken or submerged potable water distribution pipes passing through dirty drainage ditches.',
              benchmark: 'Jal Shakti Mission Distribution Safety Standard',
              icon: Shield,
              color: 'amber',
            },
          ]}
        />
      </div>


      {/* ── SCOPE TABS & CONTROLS ────────────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filteredData.length}
        totalCount={totalCount}
        entityLabel="supply systems"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Drinking Water Sources')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── DATA GRID / LIST ─────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <FlaskConical className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No data found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((record, idx) => (
                <DrinkingWaterCard key={record.id} record={record} index={idx} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedData.map((record, idx) => (
                <DrinkingWaterRow key={record.id} record={record} index={idx} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="text-sm text-slate-400">
                Page <span className="text-white font-medium">{currentPage}</span> of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}

          {/* ── DATA SOURCES REGISTRY ───────────────────────────────────────── */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Verified Data Intelligence & Source Registry
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {drinkingWaterQualitySourceRegistry.map((source, idx) => (
                <Card key={idx} className="glass-intense border-white/5 p-4 flex flex-col gap-2 hover:border-white/20 transition-all">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-bold text-white leading-snug">{source.sourceName}</h3>
                    <Badge variant={source.reliability === 'High' ? 'success' : 'warning'} size="sm" className="flex-shrink-0 text-[10px]">
                      {source.reliability}
                    </Badge>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono bg-black/40 px-2 py-1 rounded inline-block w-max mt-1">
                    {source.sourceId}
                  </div>
                  <div className="text-xs text-blue-400 font-medium mt-1">{source.sourceType}</div>
                  <p className="text-[11px] text-slate-300 leading-relaxed mt-2 border-t border-white/5 pt-3">
                    {source.notes}
                  </p>
                </Card>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
