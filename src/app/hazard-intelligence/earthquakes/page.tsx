'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Activity, ChevronRight, AlertTriangle, MapPin,
  Shield, CheckCircle, Eye,
  ChevronLeft, BarChart3, Clock, Mountain,
  Zap, RefreshCw, X, ExternalLink, Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { RelatedHazardIntelligence } from '@/components/hazard/RelatedHazardIntelligence';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { EarthquakeRecord, haversineKm } from '@/data/hazard-earthquakes';
import { useEarthquakeIntelligence, USGSEvent } from '@/hooks/useEarthquakeIntelligence';
import { SeismicEpicenterMap } from '@/components/maps/SeismicEpicenterMap';

// ─── Colour maps ──────────────────────────────────────────────────────────────

const ZONE_COLOR: Record<string, { color: string; bg: string; border: string }> = {
  'Zone V':   { color: 'text-red-300',    bg: 'bg-red-500/10',    border: 'border-red-500/25'    },
  'Zone IV':  { color: 'text-orange-300', bg: 'bg-orange-500/10', border: 'border-orange-500/25' },
  'Zone III': { color: 'text-amber-300',  bg: 'bg-amber-500/10',  border: 'border-amber-500/25'  },
};

const GAP_STATUS_CONFIG: Record<string, { color: string; bg: string; border: string }> = {
  'Active Gap':   { color: 'text-red-300',     bg: 'bg-red-500/10',     border: 'border-red-500/25'     },
  'Monitored':    { color: 'text-amber-300',   bg: 'bg-amber-500/10',   border: 'border-amber-500/25'   },
  'Low Activity': { color: 'text-emerald-300', bg: 'bg-emerald-500/10', border: 'border-emerald-500/25' },
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

function getMagBadgeClasses(mag: number): string {
  if (mag >= 4.5) return 'bg-red-500/20 text-red-300 border-red-500/40';
  if (mag >= 3.5) return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
  if (mag >= 2.5) return 'bg-amber-500/20 text-amber-200 border-amber-500/35';
  return 'bg-cyan-500/20 text-cyan-200 border-cyan-500/35';
}

// ─── Earthquake Card ─────────────────────────────────────────────────────────

function EarthquakeCard({
  record,
  index,
  onOpenDetails,
}: {
  record: EarthquakeRecord;
  index: number;
  onOpenDetails: (record: EarthquakeRecord) => void;
}) {
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
      <Card
        onClick={() => onOpenDetails(record)}
        className={`glass-intense border-white/10 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden cursor-pointer group ${
          liveRisk === 'Critical' ? 'hover:border-red-500/30' : liveRisk === 'High' ? 'hover:border-orange-500/30' : 'hover:border-white/20'
        }`}
      >
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

        {/* Zone Classification + 100km Radius Quakes */}
        <div className="flex gap-2">
          <div className={`flex-1 flex flex-col gap-0.5 px-2.5 py-1.5 rounded-lg border text-[10px] ${zone.bg} ${zone.border}`}>
            <div className={`flex items-center gap-1.5 font-bold ${zone.color}`}>
              <Zap className="w-3 h-3 flex-shrink-0" />
              <span>{record.zone_classification}</span>
            </div>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide leading-tight">Seismic Zone</span>
          </div>
          <div className="flex-1 flex flex-col gap-0.5 px-2.5 py-1.5 rounded-lg border text-[10px] bg-white/5 border-white/10">
            <div className={`flex items-center gap-1.5 font-bold ${record.live_recent_quakes_30d ? 'text-red-400' : 'text-emerald-400'}`}>
              <Activity className="w-3 h-3 flex-shrink-0" />
              <span>{record.live_recent_quakes_30d || 0} Quakes</span>
            </div>
            <span className="text-[9px] text-slate-400 uppercase tracking-wide leading-tight">100km Radius (30d)</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="flex flex-col gap-1.5 text-xs mt-1 bg-white/[0.02] rounded-lg p-2 border border-white/5">
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Latest Nearby Mag</span>
            {record.live_latest_magnitude ? (
              <span className="font-bold text-red-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                M {record.live_latest_magnitude.toFixed(1)}
                {record.live_latest_source && (
                  <span className="text-[9px] text-slate-400 font-normal">({record.live_latest_source})</span>
                )}
              </span>
            ) : (
              <span className="text-[10px] font-medium text-emerald-400/90 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                Quiet (&lt;M2.5)
              </span>
            )}
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

function EarthquakeRow({
  record,
  index,
  onOpenDetails,
}: {
  record: EarthquakeRecord;
  index: number;
  onOpenDetails: (record: EarthquakeRecord) => void;
}) {
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
          <div className="min-w-[200px] flex-1">
            <span className="text-sm font-bold text-white">{record.name}</span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> {record.district}</div>
          </div>

          <div className="w-24 hidden md:block">
            <div className="text-[10px] text-slate-500">Latest Mag.</div>
            {record.live_latest_magnitude ? (
              <div className="text-xs font-bold text-red-400">M {record.live_latest_magnitude.toFixed(1)}</div>
            ) : (
              <div className="text-[10px] font-medium text-emerald-400/90">Quiet (&lt;M2.5)</div>
            )}
          </div>

          <div className="w-20 hidden xl:block">
            <div className={`text-[10px] px-1.5 py-0.5 rounded border w-max font-bold ${zone.color} ${zone.bg} ${zone.border}`}>{record.zone_classification}</div>
          </div>

          <div className="w-36 hidden lg:block">
            <div className="text-[10px] text-slate-500">Fault</div>
            <div className="text-xs text-orange-300 truncate" title={record.fault_system}>{record.fault_system}</div>
          </div>

          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Risk Level</div>
            <Badge variant={liveRisk === 'Critical' ? 'critical' : liveRisk === 'High' ? 'danger' : liveRisk === 'Moderate' ? 'warning' : 'success'} size="sm" className="text-[10px] shadow-sm">
              {liveRisk}
            </Badge>
          </div>

          <div className="w-36 hidden sm:block">
            <div className="flex flex-col gap-0.5 px-2 py-1 rounded-lg border w-max bg-white/5 border-white/10">
              <div className={`flex items-center gap-1.5 text-[10px] font-bold ${record.live_recent_quakes_30d ? 'text-orange-400' : 'text-slate-300'}`}>
                <Activity className="w-3 h-3 flex-shrink-0" />
                <span>{record.live_recent_quakes_30d || 0} Quakes (100km)</span>
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 ml-auto">
            <Button
              variant="outline"
              size="sm"
              className="text-xs px-3 border-white/10"
              icon={<ChevronRight className="w-3 h-3" />}
              onClick={() => onOpenDetails(record)}
            >
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
  const { filter } = useGlobalFilter();

  const {
    data: liveData,
    recentEvents,
    totalRegionalQuakes,
    loading,
    isStale,
    activeProviders,
    isLiveStreaming,
    liveAlert,
    dismissAlert,
    refresh,
  } = useEarthquakeIntelligence();

  const [zoneFilter, setZoneFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [gapFilter, setGapFilter] = useState('all');
  const [vulnFilter, setVulnFilter] = useState('all');

  // Live 30-day earthquake feed controls
  const [magThreshold, setMagThreshold] = useState<'all' | '2.5' | '3.5' | '4.5'>('all');
  const [agencyFilter, setAgencyFilter] = useState<'all' | 'NCS' | 'EMSC' | 'USGS'>('all');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<EarthquakeRecord | null>(null);

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  const zoneClassifications = ['Zone V', 'Zone IV', 'Zone III'];
  const riskLevels = ['Critical', 'High', 'Moderate', 'Low'];
  const gapStatuses = ['Active Gap', 'Monitored', 'Low Activity'];
  const vulnerabilities = ['High', 'Moderate', 'Low'];

  const filteredEvents = useMemo(() => {
    return recentEvents.filter((ev) => {
      if (magThreshold !== 'all' && ev.mag < Number(magThreshold)) return false;
      if (agencyFilter !== 'all' && !(ev.source || '').includes(agencyFilter)) return false;
      return true;
    });
  }, [recentEvents, magThreshold, agencyFilter]);

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

  // Nearby tremors for selected Fault Zone Details modal
  const selectedZoneEvents = useMemo(() => {
    if (!selectedZone) return [];
    return recentEvents
      .map((ev) => ({
        event: ev,
        distKm: Math.round(haversineKm(selectedZone.latitude, selectedZone.longitude, ev.coordinates[1], ev.coordinates[0])),
      }))
      .filter((item) => item.distKm <= 100)
      .sort((a, b) => b.event.time - a.event.time);
  }, [selectedZone, recentEvents]);

  // Aggregate KPIs
  const zoneVCount = liveData.filter(d => d.zone_classification === 'Zone V').length;
  const activeGaps = liveData.filter(d => d.seismic_gap_status === 'Active Gap').length;
  const criticalZones = liveData.filter(d => (d.live_risk_level || d.risk_level) === 'Critical').length;
  const faultSystems = new Set(liveData.map(d => d.fault_system)).size;
  const maxMag = Math.max(...liveData.map(d => d.magnitude_max_recorded));
  const highVulnCount = liveData.filter(d => d.building_vulnerability === 'High').length;

  const metrics = [
    { label: 'Seismic Zones', value: liveData.length, icon: 'MapPin' },
    { label: 'Zone V Districts', value: zoneVCount, icon: 'AlertTriangle' },
    { label: 'Active Seismic Gaps', value: activeGaps, icon: 'Activity' },
    { label: 'Live Tremors (30d)', value: totalRegionalQuakes || 0, icon: 'Zap', color: (totalRegionalQuakes || 0) > 0 ? 'text-red-400' : 'text-emerald-400' },
    { label: 'Critical Risk', value: criticalZones, icon: 'Shield' },
    { label: 'Fault Systems', value: faultSystems, icon: 'TrendingUp' },
    { label: 'Max Historical', value: `M ${maxMag}`, icon: 'BarChart3' },
    { label: 'High Vulnerability', value: highVulnCount, icon: 'Building2' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── HERO ───────────────────────────────────────────────────────────── */}
      <Heading
        label="Hazard Intelligence · Seismic Belts & Fault Line Dynamics"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Earthquakes' },
        ]}
        title={<>
            <span className="flex items-center gap-6 whitespace-nowrap leading-[1.12] overflow-visible pb-2">
              <span className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1" style={{ fontSize: '0.58em' }}>KEW</span>
              <span>Western Himalayan</span>
            </span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">Seismic Risk Intelligence</span>
          </>}
        subtitle="Real-time triple-agency earthquake surveillance (NCS India + EMSC + USGS) fused with district-level fault geometry, Zone V exposure, and structural vulnerability across the Western Himalayas."
        icon={<Activity className="w-6 h-6 text-red-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              className="bg-gradient-to-r from-red-600 to-rose-600 font-bold text-white"
              icon={<Mountain className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/landslides')}
            >
              Slope & Landslide Registry
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<BarChart3 className="w-5 h-5" />}
              onClick={() => router.push('/hazard-intelligence/dashboards')}
            >
              Hazard Dashboards
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/hazard-earthquakes-seismic.jpg',
          '/images/hazard-intelligence/hazard-command-center.jpg',
          '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      {isStale && (
        <div className="container mx-auto px-6 mt-4">
          <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-3 rounded-lg flex items-center gap-2 text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>Live earthquake data is currently unavailable. Showing last known state.</span>
          </div>
        </div>
      )}

      {/* ── Urgent Real-Time Flash Alert (Sub-Second EMSC WebSocket) ── */}
      {liveAlert && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 mt-4"
        >
          <div className="bg-red-500/20 border-2 border-red-500 text-white p-4 rounded-xl flex items-center justify-between shadow-lg shadow-red-950/50 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center animate-bounce flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-red-300">Live Seismic Flash Alert</span>
                  <Badge variant="critical" size="sm">Sub-Second Telemetry</Badge>
                  <span className="text-[10px] text-red-200/80">via {liveAlert.source}</span>
                </div>
                <p className="text-sm font-bold text-white mt-0.5">
                  M {liveAlert.mag.toFixed(1)} event detected near {liveAlert.place} · Depth: {liveAlert.depth_km} km
                </p>
              </div>
            </div>
            <button
              onClick={dismissAlert}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Dismiss alert"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* ── KPI STRIP ────────────────────────────────────────────────────── */}
      <ModuleKpiStrip kpis={metrics} iconColor="text-red-500" />

      {/* ── Triple-Agency Telemetry (NCS India + EMSC + USGS) Banner ─────── */}
      <section className="container mx-auto px-6 mt-4">
        <Card className="glass-intense border-red-500/20 p-4 bg-slate-900">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/25 flex items-center justify-center flex-shrink-0">
                <Activity className="w-6 h-6 text-red-400 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Triple-Agency Seismic Telemetry</span>
                  <Badge variant="success" size="sm" className="text-[9px] bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                    {activeProviders}
                  </Badge>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[4px] text-[10px] font-medium bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    <span className={`w-1.5 h-1.5 rounded-full ${isLiveStreaming ? 'bg-cyan-400 animate-ping' : 'bg-slate-500'}`} />
                    <span>{isLiveStreaming ? 'EMSC WebSocket Live' : 'Polling Sync'}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Monitoring Western Himalayas, Kashmir, Ladakh &amp; Hindu Kush (31.8°N–37.6°N, 71.0°E–80.5°E) · Official NCS district solutions + M2.0+ micro-tremors.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap text-xs self-stretch sm:self-auto justify-between sm:justify-end">
              <div className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                Regional Tremors (30d): <strong className="text-white font-bold">{totalRegionalQuakes || 0}</strong>
              </div>
              {recentEvents && recentEvents.length > 0 && (
                <div className="px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/25 text-red-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  <span>Latest: <strong>M {recentEvents[0].mag.toFixed(1)}</strong> · {recentEvents[0].place}</span>
                  {recentEvents[0].source && (
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-red-500/20 text-red-200 border border-red-500/30 font-semibold">
                      {recentEvents[0].source}
                    </span>
                  )}
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => refresh()}
                disabled={loading}
                className="border-white/20 text-xs text-white hover:bg-white/10 flex items-center gap-1.5"
                title="Refresh live feeds"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-red-400' : 'text-slate-300'}`} />
                <span>{loading ? 'Syncing...' : 'Refresh'}</span>
              </Button>
            </div>
          </div>
        </Card>
      </section>

      {/* ── LIVE EPICENTER GIS MAP + 30-DAY SEISMIC CATALOG ──────────────── */}
      <section className="container mx-auto px-6 mt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Epicenter GIS Map */}
          <div className="lg:col-span-7">
            <SeismicEpicenterMap
              events={filteredEvents}
              zones={liveData}
              selectedEventId={selectedEventId}
              onSelectEvent={(ev) => setSelectedEventId(ev.id)}
              onSelectZone={(z) => setSelectedZone(z)}
            />
          </div>

          {/* Live 30-Day Earthquake Event Feed */}
          <Card className="lg:col-span-5 glass-intense border-white/10 p-4 flex flex-col h-[480px]">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div>
                <h2 className="text-sm font-bold text-white flex items-center gap-2">
                  <Compass className="w-4 h-4 text-red-400" />
                  Live 30-Day Earthquake Bulletin ({filteredEvents.length})
                </h2>
                <p className="text-[11px] text-slate-400">
                  Click any tremor to highlight its epicenter on the map
                </p>
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                <div className="inline-flex rounded-lg bg-white/5 border border-white/10 p-0.5 text-[10px]">
                  {(['all', '2.5', '3.5', '4.5'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMagThreshold(m)}
                      className={`px-2 py-0.5 rounded font-semibold transition-colors ${
                        magThreshold === m ? 'bg-red-500/25 text-red-200' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {m === 'all' ? 'All' : `M${m}+`}
                    </button>
                  ))}
                </div>
                <div className="inline-flex rounded-lg bg-white/5 border border-white/10 p-0.5 text-[10px]">
                  {(['all', 'NCS', 'EMSC', 'USGS'] as const).map((ag) => (
                    <button
                      key={ag}
                      type="button"
                      onClick={() => setAgencyFilter(ag)}
                      className={`px-1.5 py-0.5 rounded font-semibold transition-colors ${
                        agencyFilter === ag ? 'bg-emerald-500/25 text-emerald-200' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {ag === 'all' ? 'All Src' : ag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto pr-1 mt-2 space-y-2">
              {loading && filteredEvents.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-red-400" />
                  <span>Syncing NCS India, EMSC &amp; USGS catalogs...</span>
                </div>
              ) : filteredEvents.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 text-xs">
                  No earthquakes matching the selected filter in the last 30 days.
                </div>
              ) : (
                filteredEvents.map((ev) => {
                  const [lon, lat] = ev.coordinates;
                  const isSelected = selectedEventId === ev.id;
                  return (
                    <div
                      key={ev.id}
                      onClick={() => setSelectedEventId(isSelected ? null : ev.id)}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-red-500/15 border-red-500/40'
                          : 'bg-white/[0.03] border-white/5 hover:border-white/20 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <div className={`px-2 py-1 rounded-lg border text-xs font-black flex-shrink-0 text-center min-w-[52px] ${getMagBadgeClasses(ev.mag)}`}>
                          M {ev.mag.toFixed(1)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-white truncate">{ev.place}</span>
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded bg-white/10 text-slate-200 flex-shrink-0">
                              {ev.source || 'EMSC'}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[10px] text-slate-400 mt-1">
                            <span>{ev.time_ist || new Date(ev.time).toLocaleString('en-IN')}</span>
                            <span>Depth: <strong className="text-slate-300">{ev.depth_km} km</strong></span>
                            <span className="font-mono">{lat.toFixed(2)}°N, {lon.toFixed(2)}°E</span>
                          </div>
                          {ev.nearestFault && (
                            <div className="flex items-center justify-between mt-1 text-[10px]">
                              <span className="text-orange-300/90 truncate">Fault: {ev.nearestFault}</span>
                              {ev.externalUrl && (
                                <a
                                  href={ev.externalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={(e) => e.stopPropagation()}
                                  className="inline-flex items-center gap-0.5 text-cyan-400 hover:underline flex-shrink-0 ml-2"
                                >
                                  Bulletin <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>
      </section>

      {/* ── FILTER BAR ───────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-6 relative z-40 overflow-visible">
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
                  <EarthquakeCard
                    key={record.id}
                    record={record}
                    index={i}
                    onOpenDetails={(r) => setSelectedZone(r)}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <AnimatePresence mode="popLayout">
                {paginatedData.map((record, i) => (
                  <EarthquakeRow
                    key={record.id}
                    record={record}
                    index={i}
                    onOpenDetails={(r) => setSelectedZone(r)}
                  />
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

      {/* ── FAULT ZONE SEISMIC DOSSIER MODAL ─────────────────────────────── */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedZone(null)}
            className="fixed inset-0 z-[2000] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl bg-slate-900 border border-white/15 p-6 shadow-2xl space-y-5"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge
                      variant={
                        (selectedZone.live_risk_level || selectedZone.risk_level) === 'Critical'
                          ? 'critical'
                          : (selectedZone.live_risk_level || selectedZone.risk_level) === 'High'
                            ? 'danger'
                            : 'warning'
                      }
                      size="sm"
                    >
                      {selectedZone.live_risk_level || selectedZone.risk_level} Risk
                    </Badge>
                    <span className="text-xs font-bold text-red-300">{selectedZone.zone_classification}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${GAP_STATUS_CONFIG[selectedZone.seismic_gap_status]?.bg || ''} ${GAP_STATUS_CONFIG[selectedZone.seismic_gap_status]?.border || ''} ${GAP_STATUS_CONFIG[selectedZone.seismic_gap_status]?.color || ''}`}>
                      {selectedZone.seismic_gap_status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white">{selectedZone.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedZone.district} · {selectedZone.scope} · {selectedZone.latitude.toFixed(3)}°N, {selectedZone.longitude.toFixed(3)}°E
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedZone(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase">Primary Fault</div>
                  <div className="font-bold text-orange-300 mt-1">{selectedZone.fault_system}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase">Max Historical</div>
                  <div className="font-bold text-white mt-1">M {selectedZone.magnitude_max_recorded} ({selectedZone.last_significant_event})</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase">Exposed Pop.</div>
                  <div className="font-bold text-amber-300 mt-1">{selectedZone.population_exposed}</div>
                </div>
                <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                  <div className="text-[10px] text-slate-400 uppercase">Building Vuln.</div>
                  <div className={`font-bold mt-1 ${VULN_COLOR[selectedZone.building_vulnerability]}`}>
                    {selectedZone.building_vulnerability}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  30-Day Recorded Tremors Within 100 km ({selectedZoneEvents.length})
                </h4>
                {selectedZoneEvents.length === 0 ? (
                  <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-300">
                    No M2.0+ seismic events detected within 100 km during the past 30 days.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {selectedZoneEvents.map(({ event, distKm }) => (
                      <div
                        key={event.id}
                        className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`px-2 py-1 rounded-md border font-black flex-shrink-0 ${getMagBadgeClasses(event.mag)}`}>
                            M {event.mag.toFixed(1)}
                          </span>
                          <div className="min-w-0">
                            <div className="font-semibold text-white truncate">{event.place}</div>
                            <div className="text-[10px] text-slate-400">
                              {event.time_ist || new Date(event.time).toLocaleString('en-IN')} · Depth {event.depth_km} km · {distKm} km from zone
                            </div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300 flex-shrink-0">
                          {event.source}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RELATED HAZARD INTELLIGENCE (6 CONTEXTUAL MODULES) ─────────── */}
      <div className="container mx-auto px-6 pb-12">
        <RelatedHazardIntelligence currentModule="earthquakes" />
      </div>
    </main>
  );
}
