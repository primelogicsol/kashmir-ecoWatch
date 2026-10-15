'use client';

import React, { useState, useMemo } from 'react';
import {
  Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Waves, ChevronRight, MapPin, Building2, Shield, Activity, CheckCircle, Search, ChevronLeft, Factory, Droplets, AlertTriangle, Database
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { EnvironmentalObserveSpotlight } from '@/components/common/EnvironmentalObserveSpotlight';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { sewageData, SewageWardRecord, Scope } from '@/data/sewage-wastewater';
import { stpData, STPRecord } from '@/data/stp-infrastructure';

// ─── Colour maps ──────────────────────────────────────────────────────────────

const RISK_COLOR: Record<string, string> = {
  Critical: 'text-red-400 bg-red-500/10 border-red-500/25',
  High:     'text-orange-400 bg-orange-500/10 border-orange-500/25',
  Moderate: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  Low:      'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
  Unknown:  'text-slate-500 bg-slate-500/10 border-slate-500/25',
};

const EVIDENCE_CONFIG: Record<string, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  'Government Assembly / Parliament Record': { color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: CheckCircle },
  'Municipal / Authority Record':            { color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: CheckCircle },
  'Verified Reported':                       { color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: CheckCircle },
  'Verified Capacity':                       { color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: CheckCircle },
  'Research Verified':                       { color: 'text-blue-300',    bg: 'bg-blue-500/10',    border: 'border-blue-500/25',    icon: Shield      },
  'Project-Reported Capacity':               { color: 'text-blue-300',    bg: 'bg-blue-500/10',    border: 'border-blue-500/25',    icon: Activity    },
  'Verified':                                { color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: CheckCircle },
  'Derived Estimate':                        { color: 'text-amber-300',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25',   icon: Activity    },
  'Planning Record':                         { color: 'text-amber-300',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25',   icon: Activity    },
  'Data Gap: Needs Survey':                  { color: 'text-slate-400',   bg: 'bg-slate-500/10',   border: 'border-slate-500/25',   icon: Search      },
  'Public Data Gap':                         { color: 'text-slate-400',   bg: 'bg-slate-500/10',   border: 'border-slate-500/25',   icon: Search      },
};

// ─── Sewage-Wastewater Card ──────────────────────────────────────────────────

function SewageCard({ record, index }: { record: SewageWardRecord; index: number }) {
  const ev = EVIDENCE_CONFIG[record.evidence_type] || EVIDENCE_CONFIG['Derived Estimate'];
  const EvIcon = ev.icon;
  const maxRisk = record.risk_level;
  const isModeled = record.evidence_type === 'Derived Estimate';

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
      className="h-full"
    >
      <Card className={`glass-intense border-white/10 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden group ${isModeled ? 'hover:border-amber-500/30' : 'hover:border-white/20'}`}>
        
        <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b opacity-5 pointer-events-none ${
          maxRisk === 'Critical' ? 'from-red-500 to-transparent' : maxRisk === 'High' ? 'from-orange-500 to-transparent' : 'from-transparent to-transparent'
        }`} />

        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-emerald-300 transition-colors">{record.ward_sector_name}</h3>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <Building2 className="w-3 h-3" />
              {record.city_region}
            </p>
          </div>
          <Badge variant={maxRisk === 'Critical' ? 'critical' : maxRisk === 'High' ? 'danger' : maxRisk === 'Moderate' ? 'warning' : 'success'} size="sm" className="flex-shrink-0 text-[10px] shadow-sm">
            {maxRisk} Risk
          </Badge>
        </div>



        <div className="flex flex-col gap-1.5 text-xs mt-1 bg-white/[0.02] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Daily Sewage Load</span>
            <span className={`font-bold truncate ml-2 text-right ${isModeled ? 'text-amber-400' : 'text-emerald-400'}`}>
              {record.sewage_generation_mld} MLD
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Ward Type</span>
            <span className="text-slate-300 font-medium truncate">{record.ward_category}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1.5 text-[10px] mt-1">
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Treatment Gap</span>
            <span className="text-white font-medium truncate ml-2">{record.treatment_gap_mld}</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Infrastructure Priority</span>
            <span className="text-slate-300 truncate ml-2">{record.infrastructure_priority}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="bg-white/5 rounded p-2 text-center border border-white/5 flex flex-col justify-center">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Coverage</div>
            <div className={`text-[10px] font-medium leading-tight ${record.sewer_network_coverage.includes('Mapped') ? 'text-emerald-400' : record.sewer_network_coverage.includes('Partial') ? 'text-amber-400' : 'text-red-400'}`}>
              {record.sewer_network_coverage}
            </div>
          </div>
          <div className="bg-white/5 rounded p-2 text-center border border-white/5 flex flex-col justify-center">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">STP Status</div>
            <div className="text-[10px] font-medium text-slate-300 leading-tight">
              {record.stp_status}
            </div>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-1 text-[10px] text-slate-400">
          <div className="flex items-start gap-1.5">
            <Droplets className="w-3 h-3 flex-shrink-0 mt-0.5 text-blue-400" />
            <span className="line-clamp-2 leading-snug">
              <strong className="text-slate-300 font-medium">Contamination Pathway:</strong> {record.receiving_waterbody}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── List Row ─────────────────────────────────────────────────────────────────

function SewageRow({ record, index }: { record: SewageWardRecord; index: number }) {
  const ev = EVIDENCE_CONFIG[record.evidence_type] || EVIDENCE_CONFIG['Derived Estimate'];
  const EvIcon = ev.icon;
  const maxRisk = record.risk_level;
  const isModeled = record.evidence_type === 'Derived Estimate';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all">
        <div className="flex flex-wrap items-center gap-4">
          
          <div className="min-w-[200px] flex-1">
            <span className="text-sm font-bold text-white">{record.ward_sector_name}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1"><Building2 className="w-3 h-3" /> {record.city_region}</div>
          </div>

          <div className="w-24 hidden md:block">
            <div className="text-[10px] text-slate-500">Daily Load</div>
            <div className={`text-xs font-bold truncate ${isModeled ? 'text-amber-400' : 'text-emerald-400'}`}>{record.sewage_generation_mld} MLD</div>
          </div>

          <div className="w-32 hidden xl:block">
            <div className="text-[10px] text-slate-500">Treatment Gap</div>
            <div className="text-xs text-slate-300 truncate" title={record.treatment_gap_mld}>{record.treatment_gap_mld}</div>
          </div>

          <div className="w-32 hidden lg:block">
            <div className="text-[10px] text-slate-500">Coverage</div>
            <div className="text-xs text-slate-300 truncate">{record.sewer_network_coverage}</div>
          </div>

          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Risk Level</div>
            <Badge variant={maxRisk === 'Critical' ? 'critical' : maxRisk === 'High' ? 'danger' : maxRisk === 'Moderate' ? 'warning' : 'success'} size="sm" className="text-[10px] shadow-sm">
              {maxRisk}
            </Badge>
          </div>



          <div className="flex-shrink-0 ml-auto">
            <Button variant="outline" size="sm" className="text-xs px-3 border-white/10" icon={<ChevronRight className="w-3 h-3" />}>
              Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── STP Infrastructure Card ──────────────────────────────────────────────────

function STPCard({ record, index }: { record: STPRecord; index: number }) {
  const ev = EVIDENCE_CONFIG[record.evidence_confidence] || EVIDENCE_CONFIG['Public Data Gap'];
  const EvIcon = ev.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
      className="h-full"
    >
      <Card className="glass-intense border-emerald-500/30 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden group hover:border-emerald-400/50">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />

        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-emerald-300 transition-colors">{record.stp_name}</h3>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <Factory className="w-3 h-3" />
              {record.city_or_authority}
            </p>
          </div>
          <Badge variant="outline" size="sm" className="flex-shrink-0 text-[10px] shadow-sm border-emerald-500/50 text-emerald-300">
            {record.technology}
          </Badge>
        </div>



        <div className="flex flex-col gap-1.5 text-xs mt-1 bg-white/[0.02] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Treatment Capacity</span>
            <span className="font-bold text-emerald-400 truncate ml-2 text-right">{record.capacity_mld} MLD</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Operational Flow</span>
            <span className="text-slate-300 font-medium truncate">{record.operational_flow_mld} MLD</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-1.5 text-[10px] mt-1">
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Catchment Served</span>
            <span className="text-white font-medium truncate ml-2">{record.catchment_served}</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Reuse Potential</span>
            <span className="text-slate-300 truncate ml-2">{record.reuse_mld} MLD</span>
          </div>
          <div className="flex justify-between items-center bg-white/5 rounded px-2 py-1.5 border border-white/5">
            <span className="text-slate-500">Infrastructure Priority</span>
            <span className="text-amber-400 truncate ml-2">{record.infrastructure_priority}</span>
          </div>
        </div>

        <div className="mt-auto pt-3 border-t border-white/5 flex flex-col gap-1 text-[10px] text-slate-400">
          <div className="flex items-start gap-1.5">
            <Shield className="w-3 h-3 flex-shrink-0 mt-0.5 text-emerald-400" />
            <span className="line-clamp-2 leading-snug">
              <strong className="text-slate-300 font-medium">Receiving Waterbody Protection:</strong> {record.receiving_waterbody_protected}
            </span>
          </div>
          {record.description && (
            <div className="text-[9px] text-slate-500 mt-1 italic leading-tight line-clamp-2">"{record.description}"</div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function SewageWastewaterPage() {
  const router = useRouter();
  const { filter, setScope, setDistrict } = useGlobalFilter();

  const [activeLayer, setActiveLayer] = useState<'wards' | 'stps'>('wards');
  
  const [infrastructureFilter, setInfrastructureFilter] = useState('all');
  const [treatmentFilter, setTreatmentFilter] = useState('all');
  const [activeTypology, setActiveTypology] = useState('all');
  const [wastewaterFilter, setWastewaterFilter] = useState('all');
  const [waterbodyFilter, setWaterbodyFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Derive filter options
  const infrastructureOptions = useMemo(() => Array.from(new Set(sewageData.map(d => d.infrastructure_status))).filter(Boolean).sort(), []);
  const treatmentOptions = useMemo(() => Array.from(new Set(sewageData.map(d => d.treatment_status))).filter(Boolean).sort(), []);
  const wastewaterOptions = useMemo(() => Array.from(new Set(sewageData.map(d => d.wastewater_type))).filter(Boolean).sort(), []);
  const waterbodyOptions = useMemo(() => Array.from(new Set(sewageData.map(d => d.waterbody_type))).filter(Boolean).sort(), []);
  const riskOptions = ['Critical', 'High', 'Moderate', 'Low'];

  const filteredWards = useMemo(() => {
    return sewageData.filter(d => {
      const matchSearch = filter.searchQuery === '' || 
        d.ward_sector_name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.city_region.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.receiving_waterbody.toLowerCase().includes(filter.searchQuery.toLowerCase());
      
      const matchScope = filter.scope === 'All' || d.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || d.district === filter.district;
      
      const matchInfrastructure = infrastructureFilter === 'all' || d.infrastructure_status === infrastructureFilter;
      const matchTreatment = treatmentFilter === 'all' || d.treatment_status === treatmentFilter;
      const matchWastewater = wastewaterFilter === 'all' || d.wastewater_type === wastewaterFilter;
      const matchWaterbody = waterbodyFilter === 'all' || d.waterbody_type === waterbodyFilter;
      const matchRisk = riskFilter === 'all' || d.risk_level === riskFilter;

      const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'critical' && ['Critical', 'High'].includes(d.risk_level)) ||
        (activeTypology === 'dal' && (d.ward_sector_name.toLowerCase().includes('dal') || d.city_region?.toLowerCase().includes('dal') || d.discharge_destination?.toLowerCase().includes('dal'))) ||
        (activeTypology === 'jhelum' && (d.discharge_destination?.toLowerCase().includes('jhelum') || d.ward_sector_name.toLowerCase().includes('jhelum'))) ||
        (activeTypology === 'stp' && (d.treatment_status?.toLowerCase().includes('treated') || d.treatment_status?.toLowerCase().includes('stp'))) ||
        (activeTypology === 'raw' && (!d.treatment_status || d.treatment_status.toLowerCase().includes('untreated') || d.treatment_status.toLowerCase().includes('raw')));

      return matchSearch && matchScope && matchDistrict && matchInfrastructure && matchTreatment && matchWastewater && matchWaterbody && matchRisk && matchTypology;
    });
  }, [filter, infrastructureFilter, treatmentFilter, wastewaterFilter, waterbodyFilter, riskFilter, activeTypology]);

  const filteredSTPs = useMemo(() => {
    return stpData.filter(d => {
      const matchSearch = filter.searchQuery === '' || d.stp_name.toLowerCase().includes(filter.searchQuery.toLowerCase());
      const matchScope = filter.scope === 'All' || d.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || d.district === filter.district;
      return matchSearch && matchScope && matchDistrict;
    });
  }, [filter]);

  const activeData = activeLayer === 'wards' ? filteredWards : filteredSTPs;
  const totalCount = activeLayer === 'wards' ? sewageData.length : stpData.length;
  
  const totalPages = Math.ceil(activeData.length / ITEMS_PER_PAGE);
  const paginatedData = activeData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const extraActiveCount = [infrastructureFilter, treatmentFilter, wastewaterFilter, waterbodyFilter, riskFilter].filter(f => f !== 'all').length;

  const scopeCount = useMemo(() => {
    if (filter.scope === 'All') return 0;
    return activeLayer === 'wards' 
      ? sewageData.filter(d => d.scope === filter.scope).length
      : stpData.filter(d => d.scope === filter.scope).length;
  }, [filter.scope, activeLayer]);

  // Aggregate stats
  const verifiedAnchors = sewageData.filter(d => !d.evidence_type.includes('Derived')).length;
  const derivedValues = sewageData.filter(d => d.evidence_type.includes('Derived')).length;
  const highRiskCount = sewageData.filter(d => ['High', 'Critical'].includes(d.risk_level)).length;
  const stpCovered = sewageData.filter(d => d.stp_status && d.stp_status.includes('STP Covered')).length;
  const activeSTPs = stpData.filter(d => d.operational_status === 'Operational').length;
  const totalGeneration = Math.round(sewageData.reduce((acc, curr) => acc + (parseFloat(String(curr.sewage_generation_mld).replace(/[^\d.]/g, '')) || 0), 0));

  const metrics = [
    { label: 'Wards & Catchments', value: sewageData.length, icon: 'MapPin' },
    { label: 'Verified STP Assets', value: stpData.length, icon: 'Factory' },
    { label: 'Modeled Baselines', value: derivedValues, icon: 'Activity' },
    { label: 'High Risk Pathways', value: highRiskCount, icon: 'TrendingUp' },
    { label: 'STP Covered Zones', value: stpCovered, icon: 'Shield' },
    { label: 'Active STP Units', value: activeSTPs, icon: 'CheckCircle' },
    { label: 'Est. Total MLD', value: `${totalGeneration.toLocaleString()} MLD`, icon: 'Database' },
    { label: 'Latest Update', value: 'Today', icon: 'Clock' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Heading
        label="Environmental Monitoring · Sewage & STP Intelligence"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Monitoring', href: '/environmental-monitoring' },
          { label: 'Sewage & Wastewater' }
        ]}
        title={<>
            <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
              <span className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1" style={{ fontSize: '0.58em' }}>KEW</span>
              <span>Western Himalayan</span>
            </span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Sewage and Wastewater</span>
          </>}
        subtitle="Monitoring sewage generation, wastewater discharge, STP capacity, drainage pathways, septic dependence, and contamination routes across Kashmir's ecological systems."
        icon={<Waves className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-emerald-600 to-emerald-500 font-bold"
              icon={<Search className="w-5 h-5" />}
              onClick={() => { const el = document.querySelector('section.py-8'); el?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              Explore Outfalls & STPs
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<Database className="w-5 h-5" />}
              onClick={() => router.push('/environmental-monitoring/dashboards')}
            >
              Analytics Dashboard
            </Button>
          </div>
        }
        images={[
          '/images/env-monitoring/Thumb_Waste.jpg',
          '/images/env-monitoring/env.webp',
          '/images/env-monitoring/sewage-treatment-plant-stp.jpg',
          '/images/env-monitoring/Biomedical_Waste_PTI.jpg',
          '/images/protected-network.png',
          '/images/bear.png',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      {/* ── KPI STRIP ────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={metrics} iconColor="text-emerald-500" />

      {/* ── LAYER TOGGLE ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-6 relative z-40">
        <div className="flex items-center p-1 bg-white/5 border border-white/10 rounded-xl w-max shadow-lg">
          <button
            onClick={() => { setActiveLayer('wards'); setCurrentPage(1); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeLayer === 'wards' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Ward-Level Baselines
          </button>
          <button
            onClick={() => { setActiveLayer('stps'); setCurrentPage(1); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeLayer === 'stps' ? 'bg-emerald-500/20 text-emerald-400 shadow-sm border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Factory className="w-4 h-4" />
            STP Infrastructure Layer
          </button>
        </div>
      </div>

      {/* ── FILTER BAR ───────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-30 overflow-visible">
        <GlobalFilterBar
          extraFilters={activeLayer === 'wards' ? (
            <>
              <FilterSelect value={infrastructureFilter} onChange={setInfrastructureFilter} placeholder="Infrastructure Status" options={infrastructureOptions.map(c => ({ value: c, label: c as string }))} />
              <FilterSelect value={treatmentFilter} onChange={setTreatmentFilter} placeholder="Treatment Status" options={treatmentOptions.map(s => ({ value: s, label: s as string }))} />
              <FilterSelect value={wastewaterFilter} onChange={setWastewaterFilter} placeholder="Wastewater Type" options={wastewaterOptions.map(s => ({ value: s, label: s as string }))} />
              <FilterSelect value={waterbodyFilter} onChange={setWaterbodyFilter} placeholder="Receiving Waterbody" options={waterbodyOptions.map(s => ({ value: s, label: s as string }))} />
              <FilterSelect value={riskFilter} onChange={setRiskFilter} placeholder="Risk Level" options={riskOptions.map(r => ({ value: r, label: r }))} />
            </>
          ) : undefined}
          extraActiveCount={activeLayer === 'wards' ? extraActiveCount : 0}
          onExtraFiltersClear={() => {
            setInfrastructureFilter('all');
            setTreatmentFilter('all');
            setWastewaterFilter('all');
            setWaterbodyFilter('all');
            setRiskFilter('all');
          }}
        />
      </div>

      
      {/* ── Sewage & Wastewater Typologies & Citizen Field Protocols ───────── */}
      <div className="container mx-auto px-6 mt-6">
        <EnvironmentalObserveSpotlight
          typologyTitle="Sewage & Wastewater Typologies & Discharge Regimes"
          typologySubtitle="Filter by sewage outfall severity, receiving waterbody, treatment linkage, or unsewered vulnerability."
          typologyIcon={Waves}
          typologies={[
            { id: 'all', label: 'All Wards & Outfalls', count: sewageData.length, icon: Waves, color: 'emerald' },
            { id: 'critical', label: 'Critical Outfalls', count: sewageData.filter(d => ['Critical', 'High'].includes(d.risk_level)).length, icon: AlertTriangle, color: 'rose' },
            { id: 'dal', label: 'Dal Lake Basin Catchment', count: sewageData.filter(d => d.ward_sector_name.toLowerCase().includes('dal') || d.city_region?.toLowerCase().includes('dal') || d.discharge_destination?.toLowerCase().includes('dal')).length, icon: Droplets, color: 'cyan' },
            { id: 'jhelum', label: 'River Jhelum Direct Ingress', count: sewageData.filter(d => d.discharge_destination?.toLowerCase().includes('jhelum') || d.ward_sector_name.toLowerCase().includes('jhelum')).length, icon: Factory, color: 'sky' },
            { id: 'stp', label: 'Connected to STP', count: sewageData.filter(d => d.treatment_status?.toLowerCase().includes('treated') || d.treatment_status?.toLowerCase().includes('stp')).length, icon: CheckCircle, color: 'teal' },
            { id: 'raw', label: 'Untreated Raw Discharge', count: sewageData.filter(d => !d.treatment_status || d.treatment_status.toLowerCase().includes('untreated') || d.treatment_status.toLowerCase().includes('raw')).length, icon: Activity, color: 'amber' },
          ]}
          activeTypology={activeTypology}
          onSelectTypology={(id) => { setActiveTypology(id); setCurrentPage(1); }}
          showingCount={filteredWards.length}
          totalCount={sewageData.length}
          entityLabel="monitored wards"
          spotlightTitle="Urban Wastewater Infrastructure & Receiving Basin Limnology"
          spotlightSubtitle="Monitoring sewage treatment plants (STPs), pumping substations, fecal coliform counts, and point-source effluent discharge."
          tabs={[
            {
              id: 'stp-network',
              label: 'Dal & Anchar STP Ring Infrastructure',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-cyan-500/20">
                    <span className="text-xs font-bold text-cyan-400 block mb-1">Major Peripheral Treatment</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Hazratbal &amp; Habak STPs</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Combined treatment capacity of 16.7 MLD utilizing Sequential Batch Reactor (SBR) and Fluidized Aerobic Bed (FAB) technology to intercept municipal runoff from the northern university and residential belts.
                    </p>
                    <div className="text-[11px] text-cyan-300 font-mono">BOD Inflow: ~220 mg/L &rarr; Effluent: &lt; 10 mg/L</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-teal-500/20">
                    <span className="text-xs font-bold text-teal-400 block mb-1">Eastern Shore Interception</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Laam &amp; Nishat Treatment Cells</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Servicing hotel chains and residential clusters along Boulevard and Foreshore Road. Designed with tertiary chlorination to neutralize fecal coliforms before lake effluent discharge.
                    </p>
                    <div className="text-[11px] text-teal-300 font-mono">Fecal Coliform: &lt; 100 MPN/100 mL target</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-rose-500/20">
                    <span className="text-xs font-bold text-rose-400 block mb-1">Historical Lagoon Rehabilitation</span>
                    <h5 className="text-sm font-semibold text-white mb-2">Brari Numbal Lagoon System</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      A pivotal hydrological conduit between Dal Lake and River Jhelum. Remediated with aerators and specialized macrophyte wetlands to counteract severe past anoxic blackwater stagnation.
                    </p>
                    <div className="text-[11px] text-rose-300 font-mono">Restoration Index: Dissolved Oxygen restored to 4.8 mg/L</div>
                  </div>
                </div>
              ),
            },
            {
              id: 'jhelum-outfalls',
              label: 'Jhelum River Trunk Outfalls & Doodh Ganga Basin',
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-amber-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Doodh Ganga Fluvial Contamination</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Municipal sewer overflows in Chanapora, Natipora, and Bagh-e-Mehtab empty untreated wastewater into Doodh Ganga, a primary potable water source downstream. Heavily scrutinized under National Green Tribunal (NGT) directives.
                    </p>
                    <div className="text-[11px] text-amber-300 font-mono">NGT Compliance Mandate: 100% interceptor sewer commissioning</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/70 border border-indigo-500/20">
                    <h5 className="text-sm font-semibold text-white mb-2">Old City (Shah-e-Khas) Heritage Drainage</h5>
                    <p className="text-xs text-slate-400 leading-relaxed mb-3">
                      Dense medieval urban fabric relies on legacy masonry combined sewers discharging directly into River Jhelum through historical ghat outfalls. Phased diversion to centralized trunk sewers is underway.
                    </p>
                    <div className="text-[11px] text-indigo-300 font-mono">Active Outfall Count: 38 legacy gravity pipes</div>
                  </div>
                </div>
              ),
            },
          ]}
          observeCategory="water"
          observeTitle="Citizen Sewage Surveillance &amp; Waterbody Ingress Reporting"
          observeSubtitle="Report untreated blackwater outfalls, photograph bursting manholes, or document septic sucker truck illegal dumping."
          observeBadge="Water Act Sec 24 Enforcement"
          protocols={[
            {
              number: '1',
              title: 'Untreated Sewage Outfall Geotagging',
              desc: 'Photograph raw sewage gushing from pipes into public watercourses; note water color, turbidity, and foaming.',
              benchmark: 'Water (Prevention and Control of Pollution) Act 1974',
              icon: Waves,
              color: 'cyan',
            },
            {
              number: '2',
              title: 'Dissolved Oxygen & Blackwater Testing',
              desc: 'Test DO levels downstream of municipal outfalls using optical DO probes or chemical titration kits (target &gt; 5.0 mg/L).',
              benchmark: 'CPCB Inland Surface Water Standard Class C',
              icon: Droplets,
              color: 'emerald',
            },
            {
              number: '3',
              title: 'Illegal Fecal Sludge Dumping Alert',
              desc: 'Report commercial cesspool tankers emptying un-manifested septic waste into rivers, canals, or roadside ditches.',
              benchmark: 'NGT National Policy on Fecal Sludge Management',
              icon: AlertTriangle,
              color: 'rose',
            },
            {
              number: '4',
              title: 'Sewer Overflow & Urban Waterlogging',
              desc: 'Submit alerts for backflowing sewer manholes during rainfall inundating streets with contaminated blackwater.',
              benchmark: 'Urban Drainage Service Benchmark (MoHUA)',
              icon: Shield,
              color: 'violet',
            },
          ]}
        />
      </div>


      {/* ── SCOPE TABS & CONTROLS ────────────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={activeData.length}
        totalCount={totalCount}
        entityLabel={activeLayer === 'wards' ? "zones & wards" : "treatment plants"}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP(activeLayer === 'wards' ? 'Wastewater Catchments' : 'Infrastructure')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── DATA GRID / LIST ─────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {activeData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Search className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No data found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {paginatedData.map((record: any, i: number) => (
                  activeLayer === 'wards' 
                    ? <SewageCard key={record.id} record={record as SewageWardRecord} index={i} />
                    : <STPCard key={record.id} record={record as STPRecord} index={i} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {paginatedData.map((record: any, i: number) => (
                  activeLayer === 'wards'
                    ? <SewageRow key={record.id} record={record as SewageWardRecord} index={i} />
                    : <STPCard key={record.id} record={record as STPRecord} index={i} /> // List view fallback to card for STPs for now
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* ── PAGINATION ───────────────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-white/10"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex items-center gap-1 overflow-x-auto max-w-[60vw] hide-scrollbar px-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`flex-shrink-0 w-8 h-8 rounded-lg text-sm transition-colors ${
                      currentPage === p 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-sm' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/10"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </section>

    </main>
  );
}
