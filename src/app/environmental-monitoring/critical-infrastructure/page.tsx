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
import { Building2, Activity, FlaskConical, MapPin, AlertTriangle, Shield, CheckCircle, Info, Settings, Trash2, Droplet, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

import { infrastructureData, InfrastructureRecord } from '@/data/critical-infrastructure';

// ─── Infrastructure Card ──────────────────────────────────────────────────

function InfrastructureCard({ record, index }: { record: InfrastructureRecord; index: number }) {
  const isCritical = record.priority_level === 'Critical' || record.risk_exposure.includes('Critical');
  const isHigh = record.priority_level === 'High' || record.risk_exposure.includes('High') || record.priority_level === 'Strategic';
  
  let riskColor = 'text-emerald-400';
  let badgeVariant: 'default' | 'success' | 'warning' | 'danger' | 'critical' = 'success';
  
  if (record.risk_exposure.includes('Low')) {
    riskColor = 'text-emerald-400';
    badgeVariant = 'success';
  } else if (record.risk_exposure.includes('Moderate')) {
    riskColor = 'text-amber-400';
    badgeVariant = 'warning';
  } else if (record.risk_exposure.includes('High')) {
    riskColor = 'text-orange-400';
    badgeVariant = 'danger';
  } else if (record.risk_exposure.includes('Critical')) {
    riskColor = 'text-red-400';
    badgeVariant = 'critical';
  }

  // Get dynamic icon based on asset type
  let AssetIcon = Building2;
  if (record.asset_type.includes('Water')) AssetIcon = Droplet;
  if (record.asset_type.includes('Dam') || record.asset_type.includes('Hydropower')) AssetIcon = Zap;
  if (record.asset_type.includes('Waste') || record.asset_type.includes('Landfill')) AssetIcon = Trash2;

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
            <h3 className="text-sm font-bold text-white truncate group-hover:text-blue-300 transition-colors">{record.asset_name}</h3>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <AssetIcon className="w-3 h-3" />
              {record.asset_type}
            </p>
          </div>
          <Badge variant={isCritical ? 'critical' : isHigh ? 'warning' : 'success'} size="sm" className="flex-shrink-0 text-[10px] shadow-sm">
            {record.priority_level} Priority
          </Badge>
        </div>

        <div className="flex flex-col gap-1.5 text-xs mt-2 bg-white/[0.02] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Design Capacity</span>
            <span className="text-blue-400 font-bold truncate ml-2 text-right">{record.design_capacity}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Current Load</span>
            <span className="text-amber-400 font-medium truncate">{record.current_load}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1.5 text-[10px] mt-1">
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Operational Status</span>
            <span className="text-white font-medium truncate ml-2">{record.operational_status}</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Efficiency</span>
            <span className="text-slate-300 truncate ml-2 text-right max-w-[120px]">{record.treatment_efficiency}</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Service Area</span>
            <span className="text-slate-300 truncate ml-2 max-w-[120px]">{record.ward_or_service_area}</span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-1 text-[10px] text-slate-400">
          <div className="flex items-start gap-1.5">
            <AlertTriangle className={`w-3 h-3 flex-shrink-0 mt-0.5 ${riskColor}`} />
            <span className="line-clamp-2 leading-snug">
              <strong className="text-slate-300 font-medium">Risk Exposure:</strong> <span className={riskColor}>{record.risk_exposure}</span>
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Infrastructure Row ──────────────────────────────────────────────────────

function InfrastructureRow({ record, index }: { record: InfrastructureRecord; index: number }) {
  const isCritical = record.priority_level === 'Critical' || record.risk_exposure.includes('Critical');

  let riskColor = 'text-emerald-400';
  let badgeVariant: 'default' | 'success' | 'warning' | 'danger' | 'critical' = 'success';
  
  if (record.risk_exposure.includes('Moderate')) {
    riskColor = 'text-amber-400';
    badgeVariant = 'warning';
  } else if (record.risk_exposure.includes('High')) {
    riskColor = 'text-orange-400';
    badgeVariant = 'danger';
  } else if (record.risk_exposure.includes('Critical')) {
    riskColor = 'text-red-400';
    badgeVariant = 'critical';
  }

  let AssetIcon = Building2;
  if (record.asset_type.includes('Water')) AssetIcon = Droplet;
  if (record.asset_type.includes('Dam') || record.asset_type.includes('Hydropower')) AssetIcon = Zap;
  if (record.asset_type.includes('Waste') || record.asset_type.includes('Landfill')) AssetIcon = Trash2;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all">
        <div className="flex flex-wrap items-center gap-4">
          
          <div className="min-w-[200px] flex-1">
            <span className="text-sm font-bold text-white">{record.asset_name}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1"><AssetIcon className="w-3 h-3" /> {record.asset_type}</div>
          </div>

          <div className="w-32 hidden md:block">
            <div className="text-[10px] text-slate-500">Design Capacity</div>
            <div className="text-xs font-bold text-blue-400 truncate" title={record.design_capacity}>{record.design_capacity}</div>
          </div>

          <div className="w-24 hidden xl:block">
            <div className="text-[10px] text-slate-500">Current Load</div>
            <div className="text-xs text-amber-400 font-medium truncate" title={record.current_load}>{record.current_load}</div>
          </div>

          <div className="w-32 hidden lg:block">
            <div className="text-[10px] text-slate-500">Risk Exposure</div>
            <div className={`text-xs font-medium truncate ${riskColor}`}>{record.risk_exposure}</div>
          </div>

          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Status</div>
            <Badge variant={record.operational_status.includes('Operational') ? 'success' : 'warning'} size="sm" className="text-[10px] shadow-sm">
              {record.operational_status}
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

export default function CriticalInfrastructurePage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();

  const [assetFilter, setAssetFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTypology, setActiveTypology] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Derive filter options
  const assetOptions = useMemo(() => Array.from(new Set(infrastructureData.map(d => d.asset_type))).filter(Boolean).sort(), []);
  const statusOptions = useMemo(() => Array.from(new Set(infrastructureData.map(d => d.operational_status))).filter(Boolean).sort(), []);
  const priorityOptions = useMemo(() => Array.from(new Set(infrastructureData.map(d => d.priority_level))).filter(Boolean).sort(), []);

  const filteredData = useMemo(() => {
    return infrastructureData.filter(d => {
      const matchSearch = filter.searchQuery === '' || 
        d.asset_name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.asset_type.toLowerCase().includes(filter.searchQuery.toLowerCase());
      
      const matchScope = filter.scope === 'All' || d.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || d.district === filter.district;
      
      const matchAsset = assetFilter === 'all' || d.asset_type === assetFilter;
      const matchStatus = statusFilter === 'all' || d.operational_status === statusFilter;
      const matchPriority = priorityFilter === 'all' || d.priority_level === priorityFilter;

      return matchSearch && matchScope && matchDistrict && matchAsset && matchStatus && matchPriority;
    });
  }, [filter, assetFilter, statusFilter, priorityFilter]);

  const totalCount = infrastructureData.length;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const extraActiveCount = [assetFilter, statusFilter, priorityFilter].filter(f => f !== 'all').length;

  const scopeCount = useMemo(() => {
    if (filter.scope === 'All') return 0;
    return infrastructureData.filter(d => d.scope === filter.scope).length;
  }, [filter.scope]);

  // Aggregate stats
  const totalAssets = infrastructureData.length;
  const criticalPriority = infrastructureData.filter(d => d.priority_level && d.priority_level.includes('Critical')).length;
  const operationalAssets = infrastructureData.filter(d => d.operational_status && d.operational_status.includes('Operational')).length;
  const highRisk = infrastructureData.filter(d => d.risk_exposure && (d.risk_exposure.includes('Critical') || d.risk_exposure.includes('High'))).length;

  const hydroDams = infrastructureData.filter(d => d.asset_type && d.asset_type.includes('Hydropower')).length;
  const treatmentPlants = infrastructureData.filter(d => d.asset_type && (d.asset_type.includes('Treatment') || d.asset_type.includes('STP') || d.asset_type.includes('WTP'))).length;
  const solidWaste = infrastructureData.filter(d => d.asset_type && d.asset_type.includes('Solid Waste')).length;

  const metrics = [
    { label: 'Total Assets', value: totalAssets, icon: 'Building2' },
    { label: 'Hydropower Dams', value: hydroDams, icon: 'Waves' },
    { label: 'Treatment Plants', value: treatmentPlants, icon: 'Factory' },
    { label: 'Solid Waste Sites', value: solidWaste, icon: 'Trash2' },
    { label: 'Critical Priority', value: criticalPriority, icon: 'ShieldAlert' },
    { label: 'High Risk Exposure', value: highRisk, icon: 'AlertTriangle' },
    { label: 'Fully Operational', value: operationalAssets, icon: 'CheckCircle' },
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
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">Critical Infrastructure</span>
          </>}
        subtitle="Monitoring the capacity, operational load, and environmental risk of major dams, STPs, WTPs, landfills, and outfalls forming the ecological backbone."
        icon={<Building2 className="w-6 h-6 text-blue-400" />}
        breadcrumbs={[
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Critical Infrastructure' },
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
              <FilterSelect value={assetFilter} onChange={setAssetFilter} placeholder="Asset Type" options={assetOptions.map(c => ({ value: c, label: c as string }))} />
              <FilterSelect value={statusFilter} onChange={setStatusFilter} placeholder="Operational Status" options={statusOptions.map(s => ({ value: s, label: s as string }))} />
              <FilterSelect value={priorityFilter} onChange={setPriorityFilter} placeholder="Priority Level" options={priorityOptions.map(s => ({ value: s, label: s as string }))} />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setAssetFilter('all');
            setStatusFilter('all');
            setPriorityFilter('all');
          }}
        />
      </div>

      
      {/* ── Critical Infrastructure Typologies & Citizen Field Protocols ──── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Critical Infrastructure Typologies & Asset Resilience"
          typologySubtitle="Select an infrastructure category, flood protection barrier, or vulnerability tier across Kashmir's lifeline systems."
          typologyIcon={Building2}
          typologies={[
            { id: 'all', label: 'All Lifeline Assets', count: infrastructureData.length, icon: Building2, color: 'emerald' },
            { id: 'critical', label: 'Critical / High Exposure', count: infrastructureData.filter(d => d.priority_level === 'Critical' || d.risk_exposure.includes('Critical') || d.risk_exposure.includes('High')).length, icon: AlertTriangle, color: 'rose' },
            { id: 'water', label: 'Potable WTPs & Reservoirs', count: infrastructureData.filter(d => d.asset_type.toLowerCase().includes('water') || d.asset_type.toLowerCase().includes('reservoir') || d.asset_type.toLowerCase().includes('wtp')).length, icon: Droplet, color: 'cyan' },
            { id: 'flood', label: 'Flood Spillways & Embankments', count: infrastructureData.filter(d => d.asset_type.toLowerCase().includes('flood') || d.asset_type.toLowerCase().includes('drain') || d.asset_type.toLowerCase().includes('spill') || d.asset_type.toLowerCase().includes('bund')).length, icon: Shield, color: 'sky' },
            { id: 'waste', label: 'Waste Transfer & Landfills', count: infrastructureData.filter(d => d.asset_type.toLowerCase().includes('waste') || d.asset_type.toLowerCase().includes('landfill') || d.asset_type.toLowerCase().includes('transfer')).length, icon: Trash2, color: 'amber' },
            { id: 'hydro', label: 'Dams & Hydropower Basins', count: infrastructureData.filter(d => d.asset_type.toLowerCase().includes('dam') || d.asset_type.toLowerCase().includes('power') || d.asset_type.toLowerCase().includes('hydro')).length, icon: Zap, color: 'violet' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredData.length}
          totalCount={infrastructureData.length}
          entityLabel="monitored assets"
          spotlightTitle="Lifeline Asset Hardening & Urban Flood Defense Infrastructure"
          spotlightSubtitle="Geo-inventory of critical water treatment plants, flood spill gates, wastewater pump stations, and mountain highway lifelines."
          tabs={[
            {
              id: 'flood-spill',
              label: 'Flood Spill Channel & Bund Defense Infrastructure',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-sky-500/20">
                    <span className="text-xs font-bold text-sky-400 block mb-1">Primary Bypass Lifeline</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Padshahi Bagh Spill Channel Head</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Engineered to divert up to 17,000 cusecs excess flood discharge from River Jhelum around Srinagar city limits into Wular Lake via Hokersar wetland.
                    </p>
                    <div className="text-[11px] text-sky-300 font-mono">Current Safe Discharge: 12,500 cusecs</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">Urban Drainage Hubs</span>
                    <h5 className="text-sm font-semibold text-white mb-2">High-Capacity Stormwater Pump Stations</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Over 84 dewatering stations in Srinagar (Bemina, Kursu, Dalgate, Shalteng) provide mechanical discharge into River Jhelum during high river stage conditions.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">Pumping Reliability: 99.4% dual diesel backup</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <span className="text-xs font-bold text-amber-400 block mb-1">Mountain Corridors</span>
                    <h5 className="text-sm font-semibold text-white mb-2">NH-44 &amp; Z-Morh Lifeline Tunnels</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      All-weather road connectivity through avalanche and landslide corridors. Protected with specialized rockfall barriers, avalanche sheds, and subsurface drainage conduits.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">Corridor Clearance: 24/7 winter snowcutter deployment</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'wtp-stp',
              label: 'Treatment Plants & Energy Backups',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Potable Water Treatment Redundancy</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Critical WTPs (Rangil, Kralpora, Alasteng, Nishat) maintain automated backwash cycles and reserve chemical stores to withstand high-turbidity glacial snowmelt events.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">Standard: Central Public Health &amp; Environmental Engineering Org</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Substation &amp; Generator Resilience</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Dedicated 33kV express electrical feeders connect essential hospital facilities, municipal pumping stations, and cryogenic oxygen plants to prevent freeze-thaw blackout disruptions.
                    </p>
                    <div className="text-[11px] text-emerald-300 font-mono">Uptime SLA: 99.9% emergency dual-grid feed</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="infrastructure"
          observeTitle="Citizen Lifeline Infrastructure Watch &amp; Hazard Reporting"
          observeSubtitle="Inspect river embankments for cracks, report stormwater pumping failures, or flag infrastructure encroachments."
          observeBadge="Lifeline Protection Active"
          protocols={[
            {
              number: '1',
              title: 'Embankment & Bund Crack Inspection',
              desc: 'Photograph slumping, tension cracks, or animal burrowing along River Jhelum flood protection earthen bunds.',
              benchmark: 'Central Water Commission Dam & Bund Safety Code',
              icon: Shield,
              color: 'sky',
            },
            {
              number: '2',
              title: 'Stormwater Dewatering Station Status',
              desc: 'Verify if local neighborhood dewatering pumps are operational during seasonal inundation and cloudbursts.',
              benchmark: 'Urban Flood Disaster Management Guidelines (NDMA)',
              icon: Droplet,
              color: 'cyan',
            },
            {
              number: '3',
              title: 'WTP Chemical Coagulant & Chlorination Dosing',
              desc: 'Inspect municipal treatment plants for adequate alum and chlorine supply reserves during winter access isolation.',
              benchmark: 'PHE Infrastructure Operating Manual',
              icon: FlaskConical,
              color: 'teal',
            },
            {
              number: '4',
              title: 'Buffer Zone & Floodplain Encroachment',
              desc: 'Log unauthorized concrete construction within 100 meters of riverbanks, canals, and flood retention wetlands.',
              benchmark: 'J&K Water Resources Regulation & Management Act 2010',
              icon: AlertTriangle,
              color: 'rose',
            },
          ]}
        />
      </div>


      {/* ── SCOPE TABS & CONTROLS ────────────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filteredData.length}
        totalCount={totalCount}
        entityLabel="infrastructure assets"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Major Assets')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── DATA GRID / LIST ─────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Settings className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No data found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((record, idx) => (
                <InfrastructureCard key={record.id} record={record} index={idx} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedData.map((record, idx) => (
                <InfrastructureRow key={record.id} record={record} index={idx} />
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
        </div>
      </section>
    </main>
  );
}
