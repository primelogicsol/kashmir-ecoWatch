'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import { motion, AnimatePresence } from 'framer-motion';
import { RelatedHazardIntelligence } from '@/components/hazard/RelatedHazardIntelligence';
import {
  Flame,
  ChevronRight,
  AlertTriangle,
  Activity,
  Clock,
  MapPin,
  Shield,
  Zap,
  Eye,
  Mountain,
  Users,
  Calendar,
  RefreshCw,
  Thermometer,
  Droplets,
  Wind,
  Map,
  BarChart3,
  History,
  FileText,
  Layers,
  CheckCircle2,
  X,
  ArrowUpRight,
} from 'lucide-react';
import {
  forestFireRegistry,
  forestFireKpis,
  ForestFireRecord,
  HISTORICAL_FOREST_FIRE_ARCHIVE,
  BIMODAL_FIRE_REGIMES,
  HistoricalForestFireEvent,
} from '@/data/hazard-forest-fires';
import { useForestFireIntelligence, LiveFireData } from '@/hooks/useForestFireIntelligence';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

const RISK_VARIANT: Record<string, 'danger' | 'warning' | 'info' | 'success'> = {
  Critical: 'danger',
  High: 'warning',
  Moderate: 'info',
  Low: 'success',
};

const STATUS_CHIP: Record<string, string> = {
  'Active Fire': 'text-red-300 bg-red-500/15 border-red-500/35',
  'Post-fire Recovery': 'text-amber-300 bg-amber-500/15 border-amber-500/35',
  'Fire Season Watch': 'text-orange-300 bg-orange-500/15 border-orange-500/35',
  'No Current Risk': 'text-emerald-300 bg-emerald-500/15 border-emerald-500/35',
  'Prescribed Burn': 'text-sky-300 bg-sky-500/15 border-sky-500/35',
};

const VERIFICATION_CHIP: Record<string, string> = {
  'Field Verified': 'text-emerald-300 bg-emerald-500/15 border-emerald-500/35',
  'Satellite Verified': 'text-cyan-300 bg-cyan-500/15 border-cyan-500/35',
  'Community Reported': 'text-amber-300 bg-amber-500/15 border-amber-500/35',
  Unverified: 'text-slate-300 bg-slate-500/15 border-slate-500/35',
};

// ─── ForestFireCard (Universal .kew-card-shell Hierarchy) ────────────────────

function ForestFireCard({
  record,
  index,
  liveData,
  onSelect,
}: {
  record: ForestFireRecord;
  index: number;
  liveData?: LiveFireData;
  onSelect: (r: ForestFireRecord) => void;
}) {
  const statusChip = STATUS_CHIP[record.current_status] || STATUS_CHIP['No Current Risk'];
  const verChip = VERIFICATION_CHIP[record.verification_status] || VERIFICATION_CHIP.Unverified;
  const riskLevel = liveData?.live_risk_level || record.risk_level;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.4) }}
      className="flex flex-col h-full"
    >
      <Card
        className="kew-card-shell kew-card-shell--interactive p-5 h-full group"
        onClick={() => onSelect(record)}
      >
        {/* 1. ICON top-left + Risk & Operational Status top-right */}
        <div className="kew-card-top-row">
          <div className="kew-card-icon-box bg-orange-500/10 border-orange-500/25 text-orange-400">
            <Flame className="w-5 h-5" />
          </div>
          <div className="flex flex-wrap items-center justify-end gap-1.5">
            <Badge variant={RISK_VARIANT[riskLevel] || 'info'} size="sm">
              {riskLevel} Risk
            </Badge>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${statusChip}`}>
              {record.current_status}
            </span>
          </div>
        </div>

        {/* 2. TITLE — Full horizontal width */}
        <div className="mb-2">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
            {record.district} · {record.scope}
          </div>
          <h3 className="kew-card-title text-base sm:text-lg group-hover:text-orange-300 transition-colors">
            {record.name}
          </h3>
        </div>

        {/* 3. KPI / METRIC — Vulnerable Area, Recurrence & Last Recorded Fire */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2 my-1 border-y border-white/10 text-xs text-slate-300 tabular-nums">
          <span>
            Vulnerable: <strong className="text-white">{record.area_vulnerable_hectares.toLocaleString()} ha</strong>
          </span>
          <span>·</span>
          <span>
            Recurrence: <strong className="text-orange-300">{record.fire_frequency}</strong>
          </span>
          <span>·</span>
          <span className="font-mono text-[11px] text-amber-300">
            Last Fire: {record.last_fire_event}
          </span>
        </div>

        {/* 4. DESCRIPTION & Live Fire-Weather Telemetry */}
        <div className="grid grid-cols-3 gap-1.5 text-xs my-2.5">
          <div className="bg-slate-950/80 rounded p-2 border border-white/10">
            <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <Thermometer className="w-2.5 h-2.5 text-red-400" /> Temp
            </div>
            <div className="font-bold text-red-300 tabular-nums">
              {liveData
                ? `${liveData.live_temperature}°C`
                : record.live_temperature !== undefined
                ? `${record.live_temperature}°C`
                : '18°C'}
            </div>
          </div>
          <div className="bg-slate-950/80 rounded p-2 border border-white/10">
            <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <Droplets className="w-2.5 h-2.5 text-sky-400" /> Min RH
            </div>
            <div className="font-bold text-sky-300 tabular-nums">
              {liveData
                ? `${liveData.live_humidity}%`
                : record.live_humidity !== undefined
                ? `${record.live_humidity}%`
                : '55%'}
            </div>
          </div>
          <div className="bg-slate-950/80 rounded p-2 border border-white/10">
            <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <Wind className="w-2.5 h-2.5 text-teal-400" /> Wind
            </div>
            <div className="font-bold text-teal-300 tabular-nums">
              {liveData
                ? `${liveData.live_wind_speed} km/h`
                : record.live_wind_speed !== undefined
                ? `${record.live_wind_speed} km/h`
                : '8 km/h'}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3 text-[10px]">
          <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
            {record.forest_type} Forest
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
            Season: {record.fire_season}
          </span>
          <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/10">
            {record.cause_primary} Cause
          </span>
          <span className={`px-2 py-0.5 rounded border ${verChip}`}>
            {record.verification_status}
          </span>
        </div>

        {/* 5. CTA near bottom */}
        <div className="mt-auto pt-3 border-t border-white/10 flex items-center justify-between text-xs">
          <span className="text-[11px] text-slate-400 font-mono">
            Sensor: {record.detection_method}
          </span>
          <span className="kew-card-cta !mt-0 text-orange-300 group-hover:text-orange-200">
            <span>Inspect Zone &amp; Fire Log</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── ForestFireRow ───────────────────────────────────────────────────────────

function ForestFireRow({
  record,
  index,
  liveData,
  onSelect,
}: {
  record: ForestFireRecord;
  index: number;
  liveData?: LiveFireData;
  onSelect: (r: ForestFireRecord) => void;
}) {
  const riskLevel = liveData?.live_risk_level || record.risk_level;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card
        className="kew-card-shell kew-card-shell--interactive p-4 group"
        onClick={() => onSelect(record)}
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="min-w-[210px] flex-1">
            <span className="text-sm font-bold text-white group-hover:text-orange-300 transition-colors">
              {record.name}
            </span>
            <div className="text-[11px] text-slate-400 mt-0.5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3 h-3 text-orange-400" /> {record.district} · {record.scope}
              </span>
              <span>·</span>
              <span className="font-mono text-amber-300">Last Fire: {record.last_fire_event}</span>
              <span>({record.fire_frequency})</span>
            </div>
          </div>

          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Risk</div>
            <Badge variant={RISK_VARIANT[riskLevel] || 'info'} size="sm">
              {riskLevel}
            </Badge>
          </div>

          <div className="w-52 hidden md:flex items-center justify-between gap-3 text-xs tabular-nums">
            <div>
              <div className="text-[9px] text-slate-500 mb-0.5">Vulnerable</div>
              <div className="font-bold text-white">{record.area_vulnerable_hectares.toLocaleString()} ha</div>
            </div>
            <div>
              <div className="text-[9px] text-slate-500 mb-0.5">Temp / RH</div>
              <div className="font-bold text-red-300">
                {liveData ? `${liveData.live_temperature}°C / ${liveData.live_humidity}%` : `${record.live_temperature ?? 18}°C`}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 ml-auto">
            <Button
              variant="outline"
              size="sm"
              className="text-xs px-3 border-white/15"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(record);
              }}
              icon={<ChevronRight className="w-3 h-3" />}
            >
              Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Historical Event Card (Universal .kew-card-shell Hierarchy) ─────────────

function HistoricalFireArchiveCard({ event }: { event: HistoricalForestFireEvent }) {
  return (
    <Card className="kew-card-shell p-5 sm:p-6 h-full">
      {/* 1. ICON top-left + Year & Verification Badge top-right */}
      <div className="kew-card-top-row">
        <div className="kew-card-icon-box bg-amber-500/10 border-amber-500/25 text-amber-400">
          <History className="w-5 h-5" />
        </div>
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <span className="px-2 py-0.5 rounded bg-orange-500/15 border border-orange-500/35 text-orange-300 font-mono text-xs font-bold">
            {event.period}
          </span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-[10px] font-semibold">
            {event.verificationStatus}
          </span>
        </div>
      </div>

      {/* 2. TITLE — Full horizontal width */}
      <div className="mb-2">
        <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-0.5">
          {event.subregion} · {event.fireRegime}
        </div>
        <h3 className="kew-card-title text-base sm:text-lg">{event.title}</h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Divisions: {event.forestDivisions.join(' · ')}
        </p>
      </div>

      {/* 3. KPI / Burn-Scar Extent & Uncertainty */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5 my-1 border-y border-white/10 text-xs tabular-nums">
        <span className="text-slate-300">
          Estimated Burn Footprint:{' '}
          <strong className="text-orange-300 text-sm">
            {event.estimatedAffectedAreaHa.toLocaleString()} ha
          </strong>
        </span>
        <span className="text-slate-500 font-mono text-[11px]">{event.uncertaintyNote}</span>
      </div>

      {/* 4. DESCRIPTION — Synoptic Driver, Species & Impact */}
      <div className="space-y-2 text-xs text-slate-300 mt-2 mb-4 leading-relaxed">
        <p>
          <strong className="text-white">Fuel Complex:</strong> {event.dominantSpecies} ({event.forestType})
        </p>
        <p>
          <strong className="text-sky-300">Synoptic / Drought Driver:</strong> {event.meteorologicalDriver}
        </p>
        <p>
          <strong className="text-amber-300">Ecological Impact:</strong> {event.ecologicalImpact}
        </p>
        <p className="text-[11px] text-slate-400 font-mono pt-1">
          Sensors: {event.detectionSensors}
        </p>
      </div>

      {/* 5. Institutional Source Provenance Footer */}
      <div className="mt-auto pt-3 border-t border-white/10 flex items-start gap-1.5 text-[11px] text-slate-400">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
        <span>
          <strong className="text-slate-200">Source:</strong> {event.sourceCitation}
        </span>
      </div>
    </Card>
  );
}

// ─── Main Forest Fires Workbench ─────────────────────────────────────────────

function ForestFiresWorkbench() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { filter } = useGlobalFilter();

  const [activeTab, setActiveTab] = useState<'live-zones' | 'archive' | 'seasonal-regimes'>(() => {
    const t = searchParams.get('tab');
    if (t === 'archive' || t === 'seasonal-regimes') return t;
    return 'live-zones';
  });

  const [forestTypeFilter, setForestTypeFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [archiveYearFilter, setArchiveYearFilter] = useState('all');
  const [archiveSubregionFilter, setArchiveSubregionFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedZone, setSelectedZone] = useState<ForestFireRecord | null>(null);
  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const t = searchParams.get('tab');
    if (t === 'archive' || t === 'seasonal-regimes' || t === 'live-zones') {
      setActiveTab(t);
    } else if (typeof window !== 'undefined' && window.location.hash === '#archive') {
      setActiveTab('archive');
    }
  }, [searchParams]);

  const switchTab = (tab: 'live-zones' | 'archive' | 'seasonal-regimes') => {
    setActiveTab(tab);
    const sp = new URLSearchParams(window.location.search);
    if (tab === 'live-zones') sp.delete('tab');
    else sp.set('tab', tab);
    const qs = sp.toString();
    router.replace(
      qs ? `/hazard-intelligence/forest-fires?${qs}` : '/hazard-intelligence/forest-fires',
      { scroll: false }
    );
  };

  const { liveData, loading: apiLoading, error: apiError, isStale } =
    useForestFireIntelligence(forestFireRegistry);

  const filteredData = useMemo(
    () =>
      forestFireRegistry.filter((d) => {
        const matchSearch =
          filter.searchQuery === '' ||
          d.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
          d.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
          d.forest_type.toLowerCase().includes(filter.searchQuery.toLowerCase());

        const matchScope = filter.scope === 'All' || d.scope === filter.scope;
        const matchDistrict = filter.district === 'All' || d.district === filter.district;
        const matchForestType = forestTypeFilter === 'all' || d.forest_type === forestTypeFilter;

        const riskLevel = liveData?.[d.id]?.live_risk_level || d.risk_level;
        const matchRisk = riskFilter === 'all' || riskLevel === riskFilter;

        return matchSearch && matchScope && matchDistrict && matchForestType && matchRisk;
      }),
    [filter, forestTypeFilter, riskFilter, liveData]
  );

  // Filtered Historical Major Outbreak Events
  const filteredHistoricalEvents = useMemo(() => {
    return HISTORICAL_FOREST_FIRE_ARCHIVE.filter((ev) => {
      const matchSearch =
        filter.searchQuery === '' ||
        ev.title.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
        ev.districts.some((d) => d.toLowerCase().includes(filter.searchQuery.toLowerCase())) ||
        ev.forestDivisions.some((fd) => fd.toLowerCase().includes(filter.searchQuery.toLowerCase())) ||
        ev.dominantSpecies.toLowerCase().includes(filter.searchQuery.toLowerCase());
      const matchYear = archiveYearFilter === 'all' || String(ev.year) === archiveYearFilter;
      const matchSr = archiveSubregionFilter === 'all' || ev.subregion === archiveSubregionFilter;
      const matchFt = forestTypeFilter === 'all' || ev.forestType === forestTypeFilter;
      return matchSearch && matchYear && matchSr && matchFt;
    }).sort((a, b) => b.year - a.year);
  }, [filter.searchQuery, archiveYearFilter, archiveSubregionFilter, forestTypeFilter]);

  // Chronological Division Last-Fire Ledger (all 32 zones sorted newest -> oldest fire event)
  const chronologicalDivisionFireLog = useMemo(() => {
    return [...filteredData].sort((a, b) => b.last_fire_event.localeCompare(a.last_fire_event));
  }, [filteredData]);

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [forestTypeFilter, riskFilter, filter]);

  const extraActiveCount =
    (forestTypeFilter !== 'all' ? 1 : 0) +
    (riskFilter !== 'all' ? 1 : 0) +
    (archiveYearFilter !== 'all' ? 1 : 0) +
    (archiveSubregionFilter !== 'all' ? 1 : 0);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        label="Hazard Intelligence · Wildfire, Burn-Scar Archive & Thermal Sentinel"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Forest Fires' },
        ]}
        title={
          <>
            <KewBrandIdentity />
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-orange-400 to-red-300 bg-clip-text text-transparent">
              Forest Fire Intelligence
            </span>
          </>
        }
        subtitle="Operational wildfire weather telemetry across 32 forest vulnerability zones integrated with the Western Himalayan Historical Forest Fire & Satellite Burn-Scar Archive (FSI SNPP-VIIRS, NASA FIRMS & Sentinel-2 ΔNBR)."
        icon={<Flame className="w-6 h-6 text-orange-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              className="bg-gradient-to-r from-orange-600 to-red-600 font-bold text-white"
              icon={<History className="w-4 h-4" />}
              onClick={() => switchTab('archive')}
            >
              Forest Fire Archive
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold"
              icon={<BarChart3 className="w-4 h-4" />}
              onClick={() => router.push('/hazard-intelligence/dashboards')}
            >
              Hazard Dashboards
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/hazard-forest-fires-wildfire.jpg',
          '/images/hazard-intelligence/hazard-command-center.jpg',
          '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/85 via-[#0a1628]/65 to-[#060E1A]/85"
      />

      <ModuleKpiStrip kpis={forestFireKpis} iconColor="text-orange-500" />

      {isStale && (
        <div className="container mx-auto px-6 mt-4 relative z-40">
          <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center gap-3 text-amber-200/80 text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            Live data feed is currently unavailable. Displaying cached intelligence.
          </div>
        </div>
      )}
      {apiError && (
        <div className="container mx-auto px-6 mt-4 relative z-40">
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-200/80 text-sm">
            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0" />
            Live data feed failed. Displaying baseline registry data.
          </div>
        </div>
      )}

      {/* ── Live Fire Weather & Archive Navigation Banner ─────────────────── */}
      <section className="container mx-auto px-6 mt-4">
        <Card className="glass-intense border-orange-500/20 p-4 bg-slate-900">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    KEW Wildfire Atmospheric &amp; Historical Burn-Scar Sentinel
                  </span>
                  <Badge variant="success" size="sm" className="text-[9px]">
                    Live ECMWF + FSI/FIRMS Archive
                  </Badge>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Couples real-time Open-Meteo Fire Weather Index (FWI) components across 32 forest divisions with multi-year NASA FIRMS (MODIS/VIIRS) and FSI historical burn records.
                </p>
              </div>
            </div>

            {/* Primary Module Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => switchTab('live-zones')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  activeTab === 'live-zones'
                    ? 'bg-orange-600 text-white border-orange-500 shadow-sm'
                    : 'bg-slate-950 text-slate-300 border-white/10 hover:text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Live Risk Zones (32)</span>
              </button>

              <button
                type="button"
                onClick={() => switchTab('archive')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  activeTab === 'archive'
                    ? 'bg-orange-600 text-white border-orange-500 shadow-sm'
                    : 'bg-slate-950 text-slate-300 border-white/10 hover:text-white'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Historical Fire Archive ({HISTORICAL_FOREST_FIRE_ARCHIVE.length} Major + 32 Division Logs)</span>
              </button>

              <button
                type="button"
                onClick={() => switchTab('seasonal-regimes')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                  activeTab === 'seasonal-regimes'
                    ? 'bg-orange-600 text-white border-orange-500 shadow-sm'
                    : 'bg-slate-950 text-slate-300 border-white/10 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Bimodal Fire Regimes &amp; Sensors</span>
              </button>
            </div>
          </div>
        </Card>
      </section>

      {/* ── Filter Bar ─────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect
                value={forestTypeFilter}
                onChange={setForestTypeFilter}
                placeholder="All Forest Types"
                options={[
                  { value: 'Coniferous', label: 'Coniferous' },
                  { value: 'Broadleaf', label: 'Broadleaf' },
                  { value: 'Mixed', label: 'Mixed' },
                  { value: 'Scrub', label: 'Scrub' },
                ]}
              />
              {activeTab === 'live-zones' && (
                <FilterSelect
                  value={riskFilter}
                  onChange={setRiskFilter}
                  placeholder="All Risk Levels"
                  options={[
                    { value: 'Critical', label: 'Critical' },
                    { value: 'High', label: 'High' },
                    { value: 'Moderate', label: 'Moderate' },
                    { value: 'Low', label: 'Low' },
                  ]}
                />
              )}
              {activeTab === 'archive' && (
                <>
                  <FilterSelect
                    value={archiveYearFilter}
                    onChange={setArchiveYearFilter}
                    placeholder="All Fire Years"
                    options={[
                      { value: '2025', label: '2025 Season' },
                      { value: '2024', label: '2024 Autumn Drought' },
                      { value: '2022', label: '2022 Spring Heatwave' },
                      { value: '2020', label: '2020 Dry Winter' },
                      { value: '2018', label: '2018 Late-Autumn' },
                      { value: '2016', label: '2016 Pre-Monsoon Outbreak' },
                    ]}
                  />
                  <FilterSelect
                    value={archiveSubregionFilter}
                    onChange={setArchiveSubregionFilter}
                    placeholder="All Subregions"
                    options={[
                      { value: 'Kashmir', label: 'Kashmir' },
                      { value: 'Jammu', label: 'Jammu' },
                      { value: 'Azad Kashmir', label: 'Azad Kashmir (AJ&K)' },
                    ]}
                  />
                </>
              )}
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setForestTypeFilter('all');
            setRiskFilter('all');
            setArchiveYearFilter('all');
            setArchiveSubregionFilter('all');
          }}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          TAB 1: LIVE FIRE RISK ZONES (32 DIVISIONS)
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'live-zones' && (
        <>
          <ModuleScopeRow
            filteredCount={filteredData.length}
            totalCount={forestFireRegistry.length}
            entityLabel="fire risk zones"
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            scopePillMap={DEFAULT_SCOPE_PILL_MAP('Fire Risk Zones')}
            scopeCount={
              filter.scope === 'All'
                ? 0
                : forestFireRegistry.filter((d) => d.scope === filter.scope).length
            }
            onScopeChange={() => setCurrentPage(1)}
          />

          <section className="py-8 flex-1">
            <div className="container mx-auto px-6">
              <div className="mb-6 flex flex-wrap justify-between items-end gap-3">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2.5">
                    <Zap className="w-6 h-6 text-orange-400" />
                    <span>Forest Fire Risk &amp; Vulnerability Registry</span>
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    32 monitored Western Himalayan forest divisions — live meteorological FWI proxies, recurrence intervals, and last documented fire dates
                  </p>
                </div>
                {apiLoading && (
                  <div className="text-sm text-slate-400 flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Live feed syncing...
                  </div>
                )}
              </div>

              {filteredData.length === 0 ? (
                <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
                  <Flame className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                  <div className="text-white font-medium mb-1">No fire risk zones found</div>
                  <div className="text-sm text-slate-400">Try adjusting your filters</div>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedData.map((d, i) => (
                    <ForestFireCard
                      key={d.id}
                      record={d}
                      index={i}
                      liveData={liveData?.[d.id]}
                      onSelect={setSelectedZone}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {paginatedData.map((d, i) => (
                    <ForestFireRow
                      key={d.id}
                      record={d}
                      index={i}
                      liveData={liveData?.[d.id]}
                      onSelect={setSelectedZone}
                    />
                  ))}
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-white/10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
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
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          TAB 2: HISTORICAL FOREST FIRE & BURN-SCAR ARCHIVE (2016–2026)
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'archive' && (
        <section id="archive" className="py-8 flex-1">
          <div className="container mx-auto px-6 space-y-10">
            {/* Part A: Documented Regional Wildfire Outbreak Dossiers */}
            <div className="space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-orange-500/15 border border-orange-500/30 text-orange-300 text-[11px] font-mono uppercase mb-2">
                  FSI SNPP-VIIRS · NASA FIRMS · Sentinel-2 ΔNBR
                </div>
                <h2 className="text-2xl font-bold text-white">
                  Documented Western Himalayan Wildfire Outbreak Archive (2016–2025)
                </h2>
                <p className="text-sm text-slate-400 mt-1 max-w-4xl">
                  Peer-corroborated and FSI/Forest-Department audited regional wildfire episodes, documenting drought and heatwave meteorological triggers, affected forest divisions, and satellite burn-scar extents with explicit uncertainty bounds.
                </p>
              </div>

              {filteredHistoricalEvents.length === 0 ? (
                <div className="p-10 text-center rounded-xl bg-slate-900 border border-white/10 text-sm text-slate-400">
                  No major historical outbreak records match the selected year or subregion filter.
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredHistoricalEvents.map((ev) => (
                    <HistoricalFireArchiveCard key={ev.id} event={ev} />
                  ))}
                </div>
              )}
            </div>

            {/* Part B: Chronological Division-Level Last-Fire Event Ledger (32 Zones) */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Division-by-Division Chronological Fire Ledger ({chronologicalDivisionFireLog.length} Monitored Zones)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Complete chronological register of the most recent verified fire event, recurrence frequency, primary ignition pathway, and post-fire recovery status across all 32 monitored forest zones
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl bg-slate-900 border border-white/10">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Last Fire Date</th>
                      <th className="py-3 px-4">Forest Division / Zone</th>
                      <th className="py-3 px-4">District &amp; Scope</th>
                      <th className="py-3 px-4">Forest Type</th>
                      <th className="py-3 px-4">Recurrence &amp; Season</th>
                      <th className="py-3 px-4">Vulnerable Ha</th>
                      <th className="py-3 px-4">Detection &amp; Verification</th>
                      <th className="py-3 px-4">Post-Fire / Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {chronologicalDivisionFireLog.map((z) => {
                      const stChip = STATUS_CHIP[z.current_status] || STATUS_CHIP['No Current Risk'];
                      const vChip = VERIFICATION_CHIP[z.verification_status] || VERIFICATION_CHIP.Unverified;
                      return (
                        <tr
                          key={z.id}
                          onClick={() => setSelectedZone(z)}
                          className="hover:bg-white/5 cursor-pointer transition-colors"
                        >
                          <td className="py-3 px-4 font-mono font-bold text-orange-300 whitespace-nowrap">
                            {z.last_fire_event}
                          </td>
                          <td className="py-3 px-4 font-semibold text-white">{z.name}</td>
                          <td className="py-3 px-4 text-slate-300">
                            {z.district} <span className="text-slate-500">({z.scope})</span>
                          </td>
                          <td className="py-3 px-4 text-slate-300">{z.forest_type}</td>
                          <td className="py-3 px-4 text-slate-300 whitespace-nowrap">
                            {z.fire_frequency} · <span className="font-mono text-slate-400">{z.fire_season}</span>
                          </td>
                          <td className="py-3 px-4 font-mono text-white whitespace-nowrap">
                            {z.area_vulnerable_hectares.toLocaleString()} ha
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded border text-[10px] ${vChip}`}>
                              {z.detection_method} · {z.verification_status}
                            </span>
                          </td>
                          <td className="py-3 px-4 whitespace-nowrap">
                            <span className={`px-2 py-0.5 rounded border text-[10px] ${stChip}`}>
                              {z.current_status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          TAB 3: BIMODAL FIRE CLIMATOLOGY & SENSOR METHODOLOGY
         ═══════════════════════════════════════════════════════════════════════ */}
      {activeTab === 'seasonal-regimes' && (
        <section className="py-8 flex-1">
          <div className="container mx-auto px-6 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Western Himalayan Bimodal Wildfire Climatology &amp; Verification Protocol
              </h2>
              <p className="text-sm text-slate-400 mt-1 max-w-4xl">
                Unlike monsoonal peninsular forests with a single spring fire season, the Western Himalaya exhibits two distinct elevation-governed fire regimes driven by subtropical pre-monsoon heatwaves versus autumn/winter Western Disturbance deficits.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {BIMODAL_FIRE_REGIMES.map((reg) => (
                <Card key={reg.id} className="kew-card-shell p-5 h-full">
                  <div className="kew-card-top-row">
                    <div className="kew-card-icon-box bg-orange-500/10 border-orange-500/25 text-orange-400">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <span className="px-2 py-0.5 rounded bg-orange-500/15 border border-orange-500/35 text-orange-300 font-mono text-xs font-bold">
                      ~{reg.historicalSharePct}% Regional Share
                    </span>
                  </div>
                  <h3 className="kew-card-title text-base sm:text-lg mb-1">{reg.regimeName}</h3>
                  <div className="text-xs font-mono text-amber-300 mb-3">
                    Window: {reg.peakWindow} · {reg.altitudinalBelt}
                  </div>
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong className="text-white">Geography:</strong> {reg.primarySubregions}
                    </p>
                    <p>
                      <strong className="text-white">Fuel Complex:</strong> {reg.fuelComplex}
                    </p>
                    <p>
                      <strong className="text-sky-300">Synoptic Trigger:</strong> {reg.synopticTrigger}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Zone Detail & Historical Fire Dossier Modal ────────────────────── */}
      <AnimatePresence>
        {selectedZone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedZone(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl rounded-xl bg-slate-900 border border-white/15 p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-3">
                <div>
                  <div className="text-[11px] font-mono text-orange-400 uppercase">
                    {selectedZone.id} · {selectedZone.district} ({selectedZone.scope})
                  </div>
                  <h3 className="text-lg font-bold text-white mt-0.5">{selectedZone.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedZone(null)}
                  className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-white/10">
                  <div className="text-slate-400">Last Fire Event</div>
                  <div className="font-mono font-bold text-orange-300 text-sm mt-0.5">
                    {selectedZone.last_fire_event}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-white/10">
                  <div className="text-slate-400">Vulnerable Area</div>
                  <div className="font-bold text-white text-sm mt-0.5">
                    {selectedZone.area_vulnerable_hectares.toLocaleString()} ha
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-white/10">
                  <div className="text-slate-400">Recurrence &amp; Season</div>
                  <div className="font-bold text-amber-300 text-sm mt-0.5">
                    {selectedZone.fire_frequency} ({selectedZone.fire_season})
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-white/10">
                  <div className="text-slate-400">Forest Type</div>
                  <div className="font-semibold text-white mt-0.5">{selectedZone.forest_type}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-white/10">
                  <div className="text-slate-400">Primary Ignition</div>
                  <div className="font-semibold text-white mt-0.5">{selectedZone.cause_primary}</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-white/10">
                  <div className="text-slate-400">Verification</div>
                  <div className="font-semibold text-emerald-300 mt-0.5">
                    {selectedZone.detection_method} · {selectedZone.verification_status}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/80 border border-white/10 text-xs text-slate-300 flex items-center justify-between">
                <span>
                  Coordinates:{' '}
                  <strong className="font-mono text-white">
                    {selectedZone.latitude.toFixed(2)}°N, {selectedZone.longitude.toFixed(2)}°E
                  </strong>
                </span>
                <span className="text-slate-400">Status: {selectedZone.current_status}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── RELATED HAZARD INTELLIGENCE ────────────────────────────────────── */}
      <section className="py-12 bg-slate-900 border-t border-white/5">
        <div className="container mx-auto px-6">
          <RelatedHazardIntelligence currentModule="forest-fires" />
        </div>
      </section>
    </main>
  );
}

export default function ForestFiresPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center text-sm">
          Loading Forest Fire Intelligence &amp; Archive...
        </div>
      }
    >
      <ForestFiresWorkbench />
    </Suspense>
  );
}
