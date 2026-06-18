'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Activity, ChevronRight, AlertTriangle, MapPin,
  Shield, CheckCircle, Eye,
  ChevronLeft, TrendingUp, BarChart3, Clock, Mountain,
  Snowflake, Users, Building2, Triangle, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { earthquakeData, EarthquakeRecord } from '@/data/hazard-earthquakes';
import { useEarthquakeIntelligence } from '@/hooks/useEarthquakeIntelligence';

// ─── Colour maps ──────────────────────────────────────────────────────────────

const RISK_COLOR: Record<string, string> = {
  Critical: 'text-red-400 bg-red-500/10 border-red-500/25',
  High:     'text-orange-400 bg-orange-500/10 border-orange-500/25',
  Moderate: 'text-amber-400 bg-amber-500/10 border-amber-500/25',
  Low:      'text-emerald-400 bg-emerald-500/10 border-emerald-500/25',
};

const ZONE_COLOR: Record<string, { color: string; bg: string; border: string }> = {
  'Zone V':   { color: 'text-red-300',    bg: 'bg-red-500/10',    border: 'border-red-500/25'    },
  'Zone IV':  { color: 'text-orange-300', bg: 'bg-orange-500/10', border: 'border-orange-500/25' },
  'Zone III': { color: 'text-amber-300',  bg: 'bg-amber-500/10',  border: 'border-amber-500/25'  },
};

const GAP_STATUS_CONFIG: Record<string, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  'Active Gap':   { color: 'text-red-300',     bg: 'bg-red-500/10',     border: 'border-red-500/25',     icon: AlertTriangle },
  'Monitored':    { color: 'text-amber-300',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25',   icon: Eye           },
  'Low Activity': { color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: CheckCircle   },
};

const VERIFICATION_CONFIG: Record<string, { color: string; bg: string; border: string; icon: React.ElementType }> = {
  'Verified':       { color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25', icon: CheckCircle },
  'Field-Assessed': { color: 'text-blue-300',    bg: 'bg-blue-500/10',    border: 'border-blue-500/25',    icon: Activity    },
  'Remote-Sensed':  { color: 'text-cyan-300',    bg: 'bg-cyan-500/10',    border: 'border-cyan-500/25',    icon: Eye         },
  'Modelled':       { color: 'text-amber-300',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25',   icon: Shield      },
};

const VULN_COLOR: Record<string, string> = {
  High:     'text-red-400',
  Moderate: 'text-amber-400',
  Low:      'text-emerald-400',
};

// ─── Earthquake Card ─────────────────────────────────────────────────────────

function EarthquakeCard({ record, index }: { record: EarthquakeRecord; index: number }) {
  const gap = GAP_STATUS_CONFIG[record.seismic_gap_status] || GAP_STATUS_CONFIG['Low Activity'];
  const GapIcon = gap.icon;
  const zone = ZONE_COLOR[record.zone_classification] || ZONE_COLOR['Zone III'];
  const ev = VERIFICATION_CONFIG[record.verification_status] || VERIFICATION_CONFIG['Modelled'];
  const EvIcon = ev.icon;

  const liveRisk = record.live_risk_level || record.risk_level;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
      className="h-full"
    >
      <Card className={`glass-intense border-white/10 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden group ${
        liveRisk === 'Critical' ? 'hover:border-red-500/30' : liveRisk === 'High' ? 'hover:border-orange-500/30' : 'hover:border-white/20'
      }`}>

        {/* Subtle accent gradient */}
        <div className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b opacity-5 pointer-events-none ${
          liveRisk === 'Critical' ? 'from-red-500 to-transparent' : liveRisk === 'High' ? 'from-orange-500 to-transparent' : 'from-transparent to-transparent'
        }`} />

        {/* Header */}
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-red-300 transition-colors">{record.name}</h3>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {record.district} · {record.scope}
            </p>
          </div>
          <Badge variant={liveRisk === 'Critical' ? 'critical' : liveRisk === 'High' ? 'danger' : liveRisk === 'Moderate' ? 'warning' : 'success'} size="sm" className="flex-shrink-0 text-[10px] shadow-sm">
            {liveRisk} Risk
          </Badge>
        </div>

        {/* Zone Classification + Seismic Gap */}
        <div className="flex gap-2">
          <div className={`flex-1 flex flex-col gap-0.5 px-2.5 py-1.5 rounded-lg border text-[10px] ${zone.bg} ${zone.border}`}>
            <div className={`flex items-center gap-1.5 font-bold ${zone.color}`}>
              <Zap className="w-3 h-3 flex-shrink-0" />
              <span>{record.zone_classification}</span>
            </div>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide leading-tight">Seismic Zone</span>
          </div>
          <div className={`flex-1 flex flex-col gap-0.5 px-2.5 py-1.5 rounded-lg border text-[10px] bg-white/5 border-white/10`}>
            <div className={`flex items-center gap-1.5 font-bold ${record.live_recent_quakes_30d ? 'text-orange-400' : 'text-slate-300'}`}>
              <Activity className="w-3 h-3 flex-shrink-0" />
              <span>{record.live_recent_quakes_30d || 0} Quakes</span>
            </div>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide leading-tight">Past 30 Days</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="flex flex-col gap-1.5 text-xs mt-1 bg-white/[0.02] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Live Latest Mag</span>
            <span className="font-bold text-red-400">{record.live_latest_magnitude ? `M ${record.live_latest_magnitude.toFixed(1)}` : 'None'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Historical Max</span>
            <span className="text-slate-300 font-medium">M {record.magnitude_max_recorded}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Fault System</span>
            <span className="text-orange-300 font-medium truncate ml-2 text-right text-[11px]">{record.fault_system}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mt-1">
          <div className="bg-white/5 rounded p-2 text-center border border-white/5 flex flex-col justify-center">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Population</div>
            <div className="text-[10px] font-medium text-amber-400 leading-tight">{record.population_exposed}</div>
          </div>
          <div className="bg-white/5 rounded p-2 text-center border border-white/5 flex flex-col justify-center">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">Building Vuln.</div>
            <div className={`text-[10px] font-medium leading-tight ${VULN_COLOR[record.building_vulnerability] || 'text-slate-300'}`}>{record.building_vulnerability}</div>
          </div>
        </div>

        {/* Last Event + Verification */}
        <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>Latest: <strong className="text-slate-300">{record.live_latest_date || record.last_significant_event}</strong></span>
          </div>
          <div className={`flex items-center gap-1 px-1.5 py-0.5 rounded border ${ev.bg} ${ev.border}`}>
            <EvIcon className={`w-2.5 h-2.5 ${ev.color}`} />
            <span className={`text-[9px] font-medium ${ev.color}`}>{record.verification_status}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Earthquake List Row ─────────────────────────────────────────────────────

function EarthquakeRow({ record, index }: { record: EarthquakeRecord; index: number }) {
  const zone = ZONE_COLOR[record.zone_classification] || ZONE_COLOR['Zone III'];
  const liveRisk = record.live_risk_level || record.risk_level;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all">
        <div className="flex flex-wrap items-center gap-4">
          {/* Name + District */}
          <div className="min-w-[200px] flex-1">
            <span className="text-sm font-bold text-white">{record.name}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> {record.district}</div>
          </div>

          {/* Magnitude */}
          <div className="w-20 hidden md:block">
            <div className="text-[10px] text-slate-500">Latest Mag.</div>
            <div className="text-xs font-bold text-red-400">{record.live_latest_magnitude ? `M ${record.live_latest_magnitude.toFixed(1)}` : 'None'}</div>
          </div>

          {/* Zone */}
          <div className="w-20 hidden xl:block">
            <div className={`text-[10px] px-1.5 py-0.5 rounded border w-max font-bold ${zone.color} ${zone.bg} ${zone.border}`}>{record.zone_classification}</div>
          </div>

          {/* Fault System */}
          <div className="w-36 hidden lg:block">
            <div className="text-[10px] text-slate-500">Fault</div>
            <div className="text-xs text-orange-300 truncate" title={record.fault_system}>{record.fault_system}</div>
          </div>

          {/* Risk Level */}
          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Risk Level</div>
            <Badge variant={liveRisk === 'Critical' ? 'critical' : liveRisk === 'High' ? 'danger' : liveRisk === 'Moderate' ? 'warning' : 'success'} size="sm" className="text-[10px] shadow-sm">
              {liveRisk}
            </Badge>
          </div>

          {/* Recent Quakes */}
          <div className="w-36 hidden sm:block">
            <div className={`flex flex-col gap-0.5 px-2 py-1 rounded-lg border w-max bg-white/5 border-white/10`}>
              <div className={`flex items-center gap-1.5 text-[10px] font-bold ${record.live_recent_quakes_30d ? 'text-orange-400' : 'text-slate-300'}`}>
                <Activity className="w-3 h-3 flex-shrink-0" />
                <span>{record.live_recent_quakes_30d || 0} Quakes</span>
              </div>
            </div>
          </div>

          {/* Action */}
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

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function EarthquakesPage() {
  const router = useRouter();
  const { filter, setScope, setDistrict } = useGlobalFilter();

  const { data: liveData, loading, isStale, error } = useEarthquakeIntelligence();

  const [zoneFilter, setZoneFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [gapFilter, setGapFilter] = useState('all');
  const [vulnFilter, setVulnFilter] = useState('all');

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const zoneClassifications = ['Zone V', 'Zone IV', 'Zone III'];
  const riskLevels = ['Critical', 'High', 'Moderate', 'Low'];
  const gapStatuses = ['Active Gap', 'Monitored', 'Low Activity'];
  const vulnerabilities = ['High', 'Moderate', 'Low'];

  const filteredData = useMemo(() => {
    return liveData.filter(d => {
      const matchSearch = filter.searchQuery === '' ||
        d.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        d.fault_system.toLowerCase().includes(filter.searchQuery.toLowerCase());

      const matchScope = filter.scope === 'All' || d.scope === filter.scope;
      const matchDistrict = filter.district === 'All' || d.district === filter.district;

      const matchZone = zoneFilter === 'all' || d.zone_classification === zoneFilter;
      const matchRisk = riskFilter === 'all' || (d.live_risk_level || d.risk_level) === riskFilter;
      const matchGap = gapFilter === 'all' || d.seismic_gap_status === gapFilter;
      const matchVuln = vulnFilter === 'all' || d.building_vulnerability === vulnFilter;

      return matchSearch && matchScope && matchDistrict && matchZone && matchRisk && matchGap && matchVuln;
    });
  }, [liveData, filter, zoneFilter, riskFilter, gapFilter, vulnFilter]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const extraActiveCount = [zoneFilter, riskFilter, gapFilter, vulnFilter].filter(f => f !== 'all').length;

  const scopeCount = useMemo(() => {
    if (filter.scope === 'All') return 0;
    return liveData.filter(d => d.scope === filter.scope).length;
  }, [filter.scope, liveData]);

  // Aggregate KPIs
  const zoneVCount = liveData.filter(d => d.zone_classification === 'Zone V').length;
  const activeGaps = liveData.filter(d => d.seismic_gap_status === 'Active Gap').length;
  const criticalZones = liveData.filter(d => (d.live_risk_level || d.risk_level) === 'Critical').length;
  const faultSystems = new Set(liveData.map(d => d.fault_system)).size;
  const maxMag = Math.max(...liveData.map(d => d.magnitude_max_recorded));
  const highVulnCount = liveData.filter(d => d.building_vulnerability === 'High').length;
  const verifiedCount = liveData.filter(d => d.verification_status === 'Verified').length;

  const metrics = [
    { label: 'Seismic Zones', value: liveData.length, icon: 'MapPin' },
    { label: 'Zone V Districts', value: zoneVCount, icon: 'AlertTriangle' },
    { label: 'Active Seismic Gaps', value: activeGaps, icon: 'Activity' },
    { label: 'Critical Risk', value: criticalZones, icon: 'Shield' },
    { label: 'Fault Systems', value: faultSystems, icon: 'TrendingUp' },
    { label: 'Max Magnitude', value: `M ${maxMag}`, icon: 'BarChart3' },
    { label: 'High Vulnerability', value: highVulnCount, icon: 'Building2' },
    { label: 'Verified Zones', value: verifiedCount, icon: 'CheckCircle' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Heading
        label="Hazard Intelligence"
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">Seismic Risk Intelligence</span>
          </>}
        subtitle="Mapping seismic fault systems, zone classifications, and building vulnerability across the Western Himalayan ecological domain using verified geological surveys and continuous monitoring data."
        icon={<Activity className="w-6 h-6 text-red-400" />}
        breadcrumbs={[
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Earthquakes' },
        ]}
      />

      {isStale && (
        <div className="container mx-auto px-6 mt-4">
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-3 rounded-lg flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Live earthquake data is currently unavailable. Showing last known state.</span>
          </div>
        </div>
      )}

      {/* ── KPI STRIP ────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={metrics} iconColor="text-red-500" />

      {/* ── FILTER BAR ───────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect value={zoneFilter} onChange={setZoneFilter} placeholder="Zone Classification" options={zoneClassifications.map(z => ({ value: z, label: z }))} />
              <FilterSelect value={riskFilter} onChange={setRiskFilter} placeholder="Risk Level" options={riskLevels.map(r => ({ value: r, label: r }))} />
              <FilterSelect value={gapFilter} onChange={setGapFilter} placeholder="Seismic Gap Status" options={gapStatuses.map(g => ({ value: g, label: g }))} />
              <FilterSelect value={vulnFilter} onChange={setVulnFilter} placeholder="Building Vulnerability" options={vulnerabilities.map(v => ({ value: v, label: v }))} />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setZoneFilter('all');
            setRiskFilter('all');
            setGapFilter('all');
            setVulnFilter('all');
          }}
        />
      </div>

      {/* ── SCOPE TABS & CONTROLS ────────────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filteredData.length}
        totalCount={liveData.length}
        entityLabel="seismic zones"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Seismic Zones')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── DATA GRID / LIST ─────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">
          {filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Activity className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">No seismic zones found</div>
              <div className="text-sm text-slate-400">Try adjusting your filters</div>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {paginatedData.map((record, i) => (
                  <EarthquakeCard key={record.id} record={record} index={i} />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {paginatedData.map((record, i) => (
                  <EarthquakeRow key={record.id} record={record} index={i} />
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
                        ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-sm'
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

      {/* ── CROSS-LINKS ──────────────────────────────────────────────────── */}
      <section className="py-8 border-t border-white/5">
        <div className="container mx-auto px-6">
          <h2 className="text-lg font-bold text-white mb-4">Explore Related Hazard Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Avalanche Zones', href: '/hazard-intelligence/avalanches', icon: Snowflake, color: 'text-cyan-400', border: 'border-cyan-500/20 hover:border-cyan-500/40' },
              { label: 'Flood Zones', href: '/hazard-intelligence/floods', icon: TrendingUp, color: 'text-blue-400', border: 'border-blue-500/20 hover:border-blue-500/40' },
              { label: 'Landslide Zones', href: '/hazard-intelligence/landslides', icon: Mountain, color: 'text-amber-400', border: 'border-amber-500/20 hover:border-amber-500/40' },
              { label: 'Hazard Overview', href: '/hazard-intelligence', icon: Shield, color: 'text-emerald-400', border: 'border-emerald-500/20 hover:border-emerald-500/40' },
            ].map(link => (
              <button
                key={link.href}
                onClick={() => router.push(link.href)}
                className={`flex items-center gap-3 p-4 rounded-xl border bg-white/[0.02] transition-all text-left group ${link.border}`}
              >
                <link.icon className={`w-5 h-5 ${link.color}`} />
                <span className="text-sm text-slate-300 group-hover:text-white font-medium">{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-600 ml-auto group-hover:text-slate-400" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
