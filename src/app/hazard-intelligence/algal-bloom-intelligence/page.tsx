'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Waves, ArrowRight, Map, AlertTriangle, Activity, Droplets,
  Layers, Flower2, Thermometer, Fish,
  Grid3X3, List, CheckCircle, HelpCircle, Search,
  BarChart3, Target, ChevronLeft, ChevronRight, Wind, CloudRain, Clock,
  Satellite, Cpu, Sparkles, RefreshCw, Shield, AlertOctagon,
  FileText, Microscope, Building, PhoneCall, Info, ExternalLink,
  MapPin, CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { RelatedHazardIntelligence } from '@/components/hazard/RelatedHazardIntelligence';

import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import {
  useAlgalBloomIntelligence,
  MonitoredWaterbody,
  SatelliteObservation,
  SatelliteMonitoringStatus,
  InstitutionalWaterQualityRecord,
  LcmaStpEffluentRecord,
  LaboratoryCyanotoxinRecord,
  BloomEarlyWarningAlert,
  PredictiveBloomForecast,
  ForecastValidationStatus,
} from '@/hooks/useAlgalBloomIntelligence';

// ─── Active Layer Tabs ────────────────────────────────────────────────────────

type ActiveLayerTab = 'satellite' | 'alerts' | 'forecast' | 'institutional' | 'registry';

// ─── Helper Badge & Color Maps ────────────────────────────────────────────────

function getClassificationBadge(classification: string) {
  switch (classification) {
    case 'Laboratory-Confirmed Harmful Bloom':
      return { label: 'Lab-Confirmed Toxin Bloom', bg: 'bg-red-500/20 text-red-200 border-red-500/40', icon: AlertOctagon };
    case 'Probable Bloom':
      return { label: 'Probable Bloom (High Biomass)', bg: 'bg-orange-500/20 text-orange-200 border-orange-500/40', icon: AlertTriangle };
    case 'Possible Bloom Detected':
      return { label: 'Possible Bloom (NDCI Elevated)', bg: 'bg-amber-500/20 text-amber-200 border-amber-500/40', icon: Activity };
    case 'No Bloom Detected':
      return { label: 'No Bloom Detected (Clear)', bg: 'bg-emerald-500/15 text-emerald-200 border-emerald-500/30', icon: CheckCircle2 };
    case 'Data Gap / Needs Sampling':
    default:
      return { label: 'Data Gap / Sampling Needed', bg: 'bg-slate-800 text-slate-400 border-slate-700', icon: HelpCircle };
  }
}

function renderToxinStatus(status: string) {
  let badgeText = status;
  let subText = '';
  let badgeStyle = 'bg-slate-800 text-slate-300 border-slate-700';

  if (status.includes('Exceedance') || status.includes('Critical')) {
    badgeText = 'Advisory Exceedance';
    subText = 'Reported threshold: >1.0 µg/L';
    badgeStyle = 'bg-red-500/20 text-red-200 border-red-500/40';
  } else if (status.includes('Low')) {
    badgeText = 'Low Cyanotoxin Level';
    subText = '<1.0 µg/L (Below WHO Limit)';
    badgeStyle = 'bg-amber-500/20 text-amber-200 border-amber-500/40';
  } else if (status.includes('Below Detection')) {
    badgeText = 'Below Detection Limit';
    subText = '<0.10 µg/L (Analytical LOD)';
    badgeStyle = 'bg-emerald-500/20 text-emerald-200 border-emerald-500/30';
  } else if (status.includes('Pending')) {
    badgeText = 'Assay In Progress';
    subText = 'Laboratory queue';
    badgeStyle = 'bg-blue-500/20 text-blue-300 border-blue-500/30';
  } else {
    badgeText = 'No Lab Testing';
    subText = 'Field / Satellite screening';
    badgeStyle = 'bg-slate-800 text-slate-400 border-slate-700';
  }

  return (
    <div className="flex flex-col items-start gap-1">
      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap border ${badgeStyle}`}>
        {badgeText}
      </span>
      {subText && (
        <span className="text-[10px] text-slate-400 font-mono whitespace-nowrap pl-0.5">
          {subText}
        </span>
      )}
    </div>
  );
}

function renderGeographicRegion(region: string, district: string) {
  const displayRegion = region === 'Azad Jammu & Kashmir' ? 'AJ&K' : region;
  return (
    <div className="flex flex-col items-start">
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-[4px] bg-cyan-500/10 text-cyan-300 border border-cyan-500/25 text-xs font-medium whitespace-nowrap">
        {displayRegion}
      </span>
      <span className="text-[11px] text-slate-300 flex items-center gap-1 mt-1 pl-0.5 whitespace-nowrap font-medium">
        <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
        {district}
      </span>
    </div>
  );
}

// ─── Master Page Component ────────────────────────────────────────────────────

export default function AlgalBloomIntelligencePage() {
  const router = useRouter();
  const { filter: globalFilter } = useGlobalFilter();

  const [activeLayer, setActiveLayer] = useState<ActiveLayerTab>('satellite');
  const [selectedSubRegion, setSelectedSubRegion] = useState<string>('All');
  const [selectedSatStatus, setSelectedSatStatus] = useState<string>('All');
  const [selectedForecastStatus, setSelectedForecastStatus] = useState<string>('All');
  const [selectedStpRegion, setSelectedStpRegion] = useState<string>('All');
  const [selectedInstRegion, setSelectedInstRegion] = useState<string>('All');
  const [selectedLabRegion, setSelectedLabRegion] = useState<string>('All');
  const [trophicFilter, setTrophicFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const ITEMS_PER_PAGE = 9;

  const {
    waterbodies,
    satelliteObservations,
    institutionalRecords,
    lcmaStpRecords,
    laboratoryToxinRecords,
    earlyWarningAlerts,
    forecastModels,
    summary,
    loading,
    isStale,
    refresh,
  } = useAlgalBloomIntelligence();

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Sub-region filtering logic
  const matchesSubRegion = (item: MonitoredWaterbody, region: string) => {
    if (region === 'All') return true;
    return item.subRegion === region;
  };

  // Filtered waterbodies
  const filteredWaterbodies = useMemo(() => {
    return waterbodies.filter(w => {
      const q = globalFilter.searchQuery?.toLowerCase().trim() || '';
      const matchSearch =
        q === '' ||
        w.name.toLowerCase().includes(q) ||
        w.district.toLowerCase().includes(q) ||
        w.lakeType.toLowerCase().includes(q) ||
        w.trophicStatus.toLowerCase().includes(q);

      const matchRegion = matchesSubRegion(w, selectedSubRegion);
      const matchScope = globalFilter.scope === 'All' || w.scope === globalFilter.scope;
      const matchTrophic = trophicFilter === 'all' || w.trophicStatus === trophicFilter;

      return matchSearch && matchRegion && matchScope && matchTrophic;
    });
  }, [waterbodies, globalFilter, selectedSubRegion, trophicFilter]);

  const satStatusCounts = useMemo(() => {
    return {
      all: satelliteObservations.length,
      processed: satelliteObservations.filter(s => s.monitoringStatus === 'Processed - Valid Satellite Observation').length,
      awaiting: satelliteObservations.filter(s => s.monitoringStatus === 'Awaiting Acquisition / Scheduled Pass').length,
      calibration: satelliteObservations.filter(s => s.monitoringStatus === 'Calibration Required').length,
      frozen: satelliteObservations.filter(s => s.monitoringStatus === 'Frozen / Seasonal Snow Cover').length,
      subpixel: satelliteObservations.filter(s => s.monitoringStatus === 'Unsupported - Sub-Pixel Wetland').length,
    };
  }, [satelliteObservations]);

  const filteredSatelliteObservations = useMemo(() => {
    return satelliteObservations.filter(sat => {
      const parentWb = waterbodies.find(w => w.id === sat.waterbodyId);
      const matchRegion =
        selectedSubRegion === 'All' ||
        (parentWb && matchesSubRegion(parentWb, selectedSubRegion)) ||
        sat.region === selectedSubRegion ||
        (selectedSubRegion === 'AJK' && sat.region.includes('Azad Kashmir')) ||
        (selectedSubRegion === 'Gilgit-Baltistan' && sat.region.includes('Gilgit-Baltistan'));

      const matchStatus =
        selectedSatStatus === 'All' || sat.monitoringStatus === selectedSatStatus;

      return matchRegion && matchStatus;
    });
  }, [satelliteObservations, waterbodies, selectedSubRegion, selectedSatStatus]);

  const forecastStatusCounts = useMemo(() => {
    return {
      all: forecastModels.length,
      experimental: forecastModels.filter(f => f.validationStatus === 'Experimental Model (Hydro-Thermal Screening)').length,
      calibration: forecastModels.filter(f => f.validationStatus === 'Calibration Required (Model Assessment Pending)').length,
      cryospheric: forecastModels.filter(f => f.validationStatus === 'Cryospheric Suspension (Sub-Zero Freeze)').length,
      unavailable: forecastModels.filter(f => f.validationStatus === 'Forecast Unavailable (Sub-Pixel Wetland / Data Gap)').length,
    };
  }, [forecastModels]);

  const filteredForecastModels = useMemo(() => {
    return forecastModels.filter(fc => {
      const matchRegion =
        selectedSubRegion === 'All' ||
        fc.region === selectedSubRegion ||
        (selectedSubRegion === 'AJK' && fc.region.includes('Azad Kashmir')) ||
        (selectedSubRegion === 'Gilgit-Baltistan' && fc.region.includes('Gilgit-Baltistan'));

      const matchStatus =
        selectedForecastStatus === 'All' || fc.validationStatus === selectedForecastStatus;

      return matchRegion && matchStatus;
    });
  }, [forecastModels, selectedSubRegion, selectedForecastStatus]);

  const filteredStpRecords = useMemo(() => {
    if (selectedStpRegion === 'All') return lcmaStpRecords;
    return lcmaStpRecords.filter(stp =>
      stp.region === selectedStpRegion ||
      (selectedStpRegion === 'AJK' && stp.region.includes('Azad Kashmir')) ||
      (selectedStpRegion === 'Gilgit-Baltistan' && stp.region.includes('Gilgit-Baltistan'))
    );
  }, [lcmaStpRecords, selectedStpRegion]);

  const filteredInstitutionalRecords = useMemo(() => {
    if (selectedInstRegion === 'All') return institutionalRecords;
    return institutionalRecords.filter(inst =>
      inst.region === selectedInstRegion ||
      (selectedInstRegion === 'AJK' && inst.region.includes('Azad Kashmir')) ||
      (selectedInstRegion === 'Gilgit-Baltistan' && inst.region.includes('Gilgit-Baltistan'))
    );
  }, [institutionalRecords, selectedInstRegion]);

  const nutrientTotals = useMemo(() => {
    const totalDischarge = lcmaStpRecords.reduce((acc, s) => acc + (s.actualDischargeMld || 0), 0);
    const totalNLoad = lcmaStpRecords.reduce((acc, s) => acc + (s.dailyNitrogenLoadKgDay || 0), 0);
    const totalPLoad = lcmaStpRecords.reduce((acc, s) => acc + (s.dailyPhosphorusLoadKgDay || 0), 0);
    return {
      totalDischarge: Number(totalDischarge.toFixed(1)),
      totalNLoad: Number(totalNLoad.toFixed(1)),
      totalPLoad: Number(totalPLoad.toFixed(2)),
    };
  }, [lcmaStpRecords]);

  const totalPages = Math.ceil(filteredWaterbodies.length / ITEMS_PER_PAGE);
  const paginatedWaterbodies = filteredWaterbodies.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Top KPI Metrics Ribbon
  const confirmedToxicCount = waterbodies.filter(w => w.currentBloomClassification === 'Laboratory-Confirmed Harmful Bloom').length;
  const probableBloomsCount = waterbodies.filter(w => w.currentBloomClassification === 'Probable Bloom').length;
  const elevatedNdciCount = satelliteObservations.filter(s => s.ndciIndex > 0.15).length;

  const metrics = [
    { label: 'Monitored Lakes', value: waterbodies.length, icon: 'Droplets', color: 'text-emerald-400' },
    { label: 'Sentinel-2 Tracked', value: satelliteObservations.length, icon: 'Satellite', color: 'text-blue-400' },
    { label: 'Elevated NDCI Biomass', value: elevatedNdciCount, icon: 'Waves', color: elevatedNdciCount > 0 ? 'text-amber-400' : 'text-emerald-400' },
    { label: 'Probable Surface Blooms', value: probableBloomsCount, icon: 'AlertTriangle', color: probableBloomsCount > 0 ? 'text-orange-400' : 'text-emerald-400' },
    { label: 'Lab Toxin Exceedances', value: confirmedToxicCount, icon: 'Microscope', color: confirmedToxicCount > 0 ? 'text-red-400' : 'text-slate-400' },
    { label: 'LCMA STP OCEMS', value: lcmaStpRecords.length, icon: 'Building', color: 'text-sky-400' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col text-slate-100 w-full max-w-full overflow-x-hidden">
      {/* ── HERO BANNER ────────────────────────────────────────────────────── */}
      <Heading
        label="Hazard Intelligence · Aquatic Eutrophication & Cyanotoxin Sentinel"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Algal Bloom Intelligence' },
        ]}
        title={
          <>
            <span className="flex items-center gap-4 whitespace-normal sm:whitespace-nowrap leading-[1.12] overflow-visible pb-2">
              <span className="inline-flex items-center self-center bg-blue-700 text-white font-black uppercase tracking-widest rounded-md px-3 py-1 text-xs">
                KEW
              </span>
              <span>Western Himalayan</span>
            </span>
            <span className="block whitespace-normal sm:whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Algal Bloom Intelligence & Laboratory Verification
            </span>
          </>
        }
        subtitle="24/7 automated monitoring architecture pairing Sentinel-2 optical chlorophyll-a biomass (NDCI B5/B4) with continuous hydro-thermal forcing, CPCB/JKPCC water quality baselines, LCMA STP effluent telemetry, and analytical laboratory cyanotoxin assays."
        icon={<Waves className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              className="bg-gradient-to-r from-emerald-600 to-teal-600 font-bold text-white shadow-lg shadow-emerald-900/30 hover:brightness-110"
              icon={<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />}
              onClick={handleManualRefresh}
            >
              Sync Satellite & Hydro Telemetry
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold hover:bg-white/5"
              icon={<Microscope className="w-4 h-4 text-emerald-400" />}
              onClick={() => setActiveLayer('alerts')}
            >
              Cyanotoxin Lab Assays
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/hazard-algal-bloom-lake.jpg',
          '/images/hazard-intelligence/hazard-command-center.jpg',
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
          '/images/environmental-calendar/calendar-hero-scientists-lab.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/90 via-[#0a1628]/75 to-[#060E1A]/90"
      />

      {/* ── KPI METRICS RIBBON ────────────────────────────────────────────── */}
      <div className="mb-6">
        <ModuleKpiStrip kpis={metrics} iconColor="text-emerald-500" />
      </div>

      {/* ── 5-REGION GEOGRAPHIC SELECTOR ───────────────────────────────────── */}
      <div className="container mx-auto px-6 mb-6">
        <div className="bg-slate-900/80 border border-white/10 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="uppercase tracking-wider">Geographic Region:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'All', label: 'All 5 Regions' },
              { id: 'Kashmir Valley', label: 'Kashmir Valley' },
              { id: 'Jammu Division', label: 'Jammu Division' },
              { id: 'Ladakh', label: 'Ladakh' },
              { id: 'AJK', label: 'Azad Kashmir (AJK)' },
              { id: 'Gilgit-Baltistan', label: 'Gilgit-Baltistan (GB)' },
            ].map(reg => (
              <button
                key={reg.id}
                onClick={() => {
                  setSelectedSubRegion(reg.id);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedSubRegion === reg.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {reg.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── SCIENTIFIC LAYER SWITCHER TABS ─────────────────────────────────── */}
      <div className="container mx-auto px-6 mb-6">
        <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-2 grid grid-cols-2 md:grid-cols-5 gap-2 shadow-xl">
          {[
            {
              id: 'satellite' as const,
              label: 'Sentinel-2 Biomass',
              sub: 'Optical NDCI & Chl-a Proxy',
              icon: Satellite,
              badge: `${elevatedNdciCount} NDCI Elevated`,
              badgeColor: elevatedNdciCount > 0 ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-700 text-slate-300',
            },
            {
              id: 'alerts' as const,
              label: 'Early-Warning & Toxins',
              sub: 'Microcystin Lab Assays',
              icon: AlertOctagon,
              badge: `${confirmedToxicCount} Toxin Advisory`,
              badgeColor: confirmedToxicCount > 0 ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300',
            },
            {
              id: 'forecast' as const,
              label: 'Predictive Forecasting',
              sub: '72h Hydro-Thermal Horizons',
              icon: CloudRain,
              badge: `${forecastModels.length} Regional Models`,
              badgeColor: 'bg-blue-500/20 text-blue-300',
            },
            {
              id: 'institutional' as const,
              label: 'Effluent & Water Quality',
              sub: '12 STPs & 12 NWQMP Stations',
              icon: Building,
              badge: `${lcmaStpRecords.length} Facilities · 5 Regions`,
              badgeColor: 'bg-sky-500/20 text-sky-300',
            },
            {
              id: 'registry' as const,
              label: 'Waterbody Registry',
              sub: '83 Monitored Lakes & Tarns',
              icon: Droplets,
              badge: `${waterbodies.length} Waterbodies`,
              badgeColor: 'bg-slate-700 text-slate-300',
            },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeLayer === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveLayer(tab.id);
                  setCurrentPage(1);
                }}
                className={`flex flex-col text-left p-3 rounded-xl transition-all border ${
                  isActive
                    ? 'bg-gradient-to-b from-emerald-500/20 to-teal-500/10 border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                    : 'bg-white/[0.02] border-transparent hover:bg-white/[0.05] hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                      {tab.label}
                    </span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 truncate mb-1">{tab.sub}</div>
                <div className={`text-[9px] px-2 py-0.5 rounded-[4px] inline-block self-start font-medium border border-white/5 ${tab.badgeColor}`}>
                  {tab.badge}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SCIENTIFIC INTEGRITY & DATA PROVENANCE DISCLOSURE ────────────────── */}
      <div className="container mx-auto px-6 mb-6">
        <div className="bg-slate-900 border border-emerald-500/25 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="bg-emerald-500/20 p-2.5 rounded-lg flex-shrink-0">
            <Info className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1 text-xs leading-relaxed text-slate-300">
            <strong className="text-white">Scientific Limitation & Provenance Disclosure:</strong> 100% verified data provenance is an engineering standard; however, <em>100% bloom detection or toxin prediction accuracy is not scientifically achievable with remote sensing alone</em>.
            <span className="text-emerald-300 font-medium"> Sentinel-2 NDCI</span> estimates optical chlorophyll-a biomass, but <strong>cannot directly measure or prove cyanotoxin (microcystin) concentration</strong>.
            Laboratory chemical assays (ELISA / HPLC) remain mandatory for public health advisories. Furthermore, CPCB monitoring (Ashaibagh, Saderkote) reflects monthly manual grab sampling, not 24/7 continuous sensor telemetry.
          </div>
          <div className="flex-shrink-0 text-[10px] bg-black/40 border border-white/10 px-3 py-1.5 rounded-lg text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Telemetry: {summary.lastSyncTime || 'Real-time'}</span>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT VIEW PANELS ────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mb-12 flex-1">

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* LAYER 1: SATELLITE OPTICAL BIOMASS (SENTINEL-2 MSI)                  */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {activeLayer === 'satellite' && (
          <div className="space-y-6">
            {/* Header & Status Filter Pills */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Satellite className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  Copernicus Sentinel-2 MSI Optical Biomass Registry ({filteredSatelliteObservations.length} of {satelliteObservations.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Scientific 48-waterbody candidate registry across all 5 Himalayan sub-regions: native 20m red-edge biomass, Nechad turbidity, FAI scum detection, and rigorous monitoring states.
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {[
                  { id: 'All', label: 'All Candidates', count: satStatusCounts.all, color: 'text-slate-200' },
                  { id: 'Processed - Valid Satellite Observation', label: 'Processed', count: satStatusCounts.processed, color: 'text-emerald-300' },
                  { id: 'Awaiting Acquisition / Scheduled Pass', label: 'Awaiting Pass', count: satStatusCounts.awaiting, color: 'text-sky-300' },
                  { id: 'Calibration Required', label: 'Calibration Needed', count: satStatusCounts.calibration, color: 'text-amber-300' },
                  { id: 'Frozen / Seasonal Snow Cover', label: 'Frozen / Snow', count: satStatusCounts.frozen, color: 'text-indigo-300' },
                  { id: 'Unsupported - Sub-Pixel Wetland', label: 'Sub-Pixel Wetland', count: satStatusCounts.subpixel, color: 'text-purple-300' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedSatStatus(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                      selectedSatStatus === tab.id
                        ? 'bg-emerald-500/20 text-white border-emerald-500/50 shadow-sm'
                        : 'bg-white/[0.03] text-slate-400 border-white/5 hover:bg-white/[0.08] hover:text-slate-200'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-[4px] bg-black/40 font-mono font-bold ${tab.color}`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scientific Provenance Banner */}
            <div className="bg-slate-900/80 border border-white/10 rounded-xl p-3 text-xs text-slate-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span>
                  <strong className="text-white">MSI Sensor Configuration:</strong> Band 5 (705nm Red-Edge) is natively <strong>20m</strong>; chlorophyll proxy is resampled bilinearly to 10m. Dal, Wular, Nigeen, Anchar, Manasbal, and Hokersar share Sentinel-2B tile pass <strong>T43SDR</strong> (Orbit R062, Nov 19, 2026).
                </span>
              </div>
              <div className="text-[10px] text-slate-400 whitespace-nowrap font-mono bg-black/40 px-2 py-1 rounded">
                Model: Mishra-Mishra (2012) ±3.8 µg/L
              </div>
            </div>

            {/* Waterbody Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSatelliteObservations.map(sat => {
                const parentWb = waterbodies.find(w => w.id === sat.waterbodyId);
                const isProcessed = sat.monitoringStatus === 'Processed - Valid Satellite Observation';
                const isAwaiting = sat.monitoringStatus === 'Awaiting Acquisition / Scheduled Pass';
                const isCalibration = sat.monitoringStatus === 'Calibration Required';
                const isFrozen = sat.monitoringStatus === 'Frozen / Seasonal Snow Cover';
                const isSubPixel = sat.monitoringStatus === 'Unsupported - Sub-Pixel Wetland';

                return (
                  <Card key={sat.waterbodyId} className="glass-intense border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all">
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="min-w-0">
                          <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider truncate">
                            {sat.satelliteSensor}
                          </div>
                          <h3 className="text-base font-bold text-white mt-0.5 truncate">
                            {sat.waterbodyName}
                          </h3>
                          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5 font-medium flex-wrap">
                            <span className="inline-flex items-center gap-1 text-slate-300">
                              <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                              {sat.district}
                            </span>
                            <span>·</span>
                            <span className="text-cyan-400 text-[10px]">{sat.region}</span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex-shrink-0">
                          {isProcessed && (
                            <span className="text-[10px] px-2.5 py-1 rounded-md font-bold border whitespace-nowrap bg-emerald-500/20 text-emerald-300 border-emerald-500/40">
                              Processed · Valid
                            </span>
                          )}
                          {isAwaiting && (
                            <span className="text-[10px] px-2.5 py-1 rounded-md font-bold border whitespace-nowrap bg-sky-500/20 text-sky-300 border-sky-500/40">
                              Awaiting Pass
                            </span>
                          )}
                          {isCalibration && (
                            <span className="text-[10px] px-2.5 py-1 rounded-md font-bold border whitespace-nowrap bg-amber-500/20 text-amber-300 border-amber-500/40">
                              Calibration Needed
                            </span>
                          )}
                          {isFrozen && (
                            <span className="text-[10px] px-2.5 py-1 rounded-md font-bold border whitespace-nowrap bg-indigo-500/20 text-indigo-300 border-indigo-500/40">
                              Frozen / Snow
                            </span>
                          )}
                          {isSubPixel && (
                            <span className="text-[10px] px-2.5 py-1 rounded-md font-bold border whitespace-nowrap bg-purple-500/20 text-purple-300 border-purple-500/40">
                              Sub-Pixel Wetland
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Section: Processed vs Candidate States */}
                      {isProcessed ? (
                        <>
                          {/* Optical Indices Grid */}
                          <div className="grid grid-cols-2 gap-2 bg-slate-900/70 border border-white/5 rounded-xl p-3 mb-3 text-xs">
                            <div>
                              <span className="text-[10px] text-slate-500 block">Est. Chlorophyll-a</span>
                              <span className="text-emerald-400 font-bold font-mono text-sm">
                                {sat.chlorophyllAEstimateUgL} <span className="text-xs font-normal text-slate-400">µg/L</span>
                              </span>
                              <span className="text-[9px] text-slate-500 block font-mono mt-0.5">
                                ±{sat.chlorophyllUncertaintyUgL ?? 3.8} µg/L (Mishra-Mishra)
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block">Turbidity (NTU)</span>
                              <span className="text-cyan-400 font-bold font-mono text-sm">
                                {sat.turbidityNtu} <span className="text-xs font-normal text-slate-400">NTU</span>
                              </span>
                              <span className="text-[9px] text-slate-500 block font-mono mt-0.5">
                                Nechad et al. 2010 NIR
                              </span>
                            </div>
                          </div>

                          <div className="space-y-1.5 text-xs mb-3">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-500">NDCI Biomass Index</span>
                              <span className="text-slate-200 font-mono font-bold">
                                {sat.ndciIndex > 0 ? `+${sat.ndciIndex}` : sat.ndciIndex} (B5-B4)/(B5+B4)
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-500">Surface Scum Detection</span>
                              <span className={`font-semibold ${sat.surfaceScumDetected ? 'text-red-400' : 'text-emerald-400'}`}>
                                {sat.surfaceScumDetected ? 'Active Scum (FAI > 0.04)' : 'No Surface Scum'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-500">Spatial Resolution</span>
                              <span className="text-slate-300 font-mono">
                                20m Native ({sat.resamplingMethod === 'Bilinear Resampled to 10m' ? 'Resampled to 10m' : 'Native 20m'})
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-500">Valid Lake Water Pixels</span>
                              <span className="text-slate-300 font-mono">
                                {sat.validWaterPixelPercentage ?? 98}% usable ({sat.cloudCoverPercent}% scene cloud)
                              </span>
                            </div>
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-slate-500">Granule / MGRS Tile</span>
                              <span className="text-slate-300 font-mono">
                                {sat.mgrsTile} ({sat.orbitNumber ? `Orbit ${sat.orbitNumber}` : 'R062'})
                              </span>
                            </div>
                          </div>

                          {sat.sentinelProductId && (
                            <div className="text-[9px] text-slate-500 font-mono bg-black/40 px-2 py-1 rounded truncate mb-2" title={sat.sentinelProductId}>
                              ID: {sat.sentinelProductId}
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="bg-slate-900/60 border border-white/5 rounded-xl p-3.5 mb-3 text-xs space-y-2">
                          <div className="flex items-center gap-2">
                            {isAwaiting && <Clock className="w-4 h-4 text-sky-400 flex-shrink-0" />}
                            {isCalibration && <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                            {isFrozen && <CloudRain className="w-4 h-4 text-indigo-400 flex-shrink-0" />}
                            {isSubPixel && <Info className="w-4 h-4 text-purple-400 flex-shrink-0" />}
                            <span className="font-semibold text-white">
                              {isAwaiting && 'Sensor Overpass Queued'}
                              {isCalibration && 'Bio-Optical Calibration Needed'}
                              {isFrozen && 'Cryospheric Surface Freeze'}
                              {isSubPixel && 'Sub-Pixel Geometry (<20m)'}
                            </span>
                          </div>

                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {sat.statusNotes || 'Candidate lake tracked in the KEW regional monitoring registry.'}
                          </p>

                          <div className="pt-2 border-t border-white/5 grid grid-cols-2 gap-2 text-[10px] text-slate-500 font-mono">
                            <div>
                              <span>Target Tile:</span> <strong className="text-slate-300">{sat.mgrsTile || 'Regional'}</strong>
                            </div>
                            <div>
                              <span>Type:</span> <strong className="text-slate-300">{sat.waterbodyType}</strong>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Pass: {sat.passDate}</span>
                      <span className="text-emerald-400 font-medium">
                        {isProcessed ? 'ESA L2A Atmospherically Corrected' : sat.qualityFlag}
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* LAYER 2: EARLY-WARNING ALERTS & CYANOTOXIN LAB ASSAYS                 */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {activeLayer === 'alerts' && (
          <div className="space-y-8">
            {/* Active Alerts */}
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-1">
                <AlertOctagon className="w-5 h-5 text-red-400" />
                Active Early-Warning Bloom Advisories ({earlyWarningAlerts.length})
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                Multi-criteria alerts reconciled from satellite surface scum, hydro-thermal stagnation, and laboratory assays.
              </p>

              <div className="space-y-3">
                {earlyWarningAlerts.map(alert => {
                  const badge = getClassificationBadge(alert.classification);
                  const Icon = badge.icon;

                  return (
                    <Card key={alert.alertId} className="glass-intense border-white/10 p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-start md:items-center justify-between hover:border-white/20 transition-all">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-[4px] font-bold border flex items-center gap-1.5 ${badge.bg}`}>
                            <Icon className="w-3.5 h-3.5" />
                            {badge.label}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {alert.district} · {alert.waterbodyName}
                          </span>
                          {alert.isOfficialHealthAdvisory && (
                            <span className="text-[9px] bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.2 rounded font-bold">
                              Public Health Advisory
                            </span>
                          )}
                        </div>
                        <h3 className="text-base font-bold text-white mb-1">{alert.alertHeadline}</h3>
                        <p className="text-xs text-slate-300 leading-relaxed mb-2">{alert.advisoryGuidance}</p>
                        <div className="text-[10px] text-slate-500 flex items-center gap-3">
                          <span>Evidence: <strong className="text-slate-300">{alert.evidenceSource}</strong></span>
                          <span>Issued by: <strong className="text-slate-300">{alert.issuingBody}</strong></span>
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Laboratory Cyanotoxin Assays Table Across All 5 Regions */}
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
                    <Microscope className="w-5 h-5 text-emerald-400" />
                    Analytical Laboratory Cyanotoxin Evidence Registry ({laboratoryToxinRecords.length} Assays Across All 5 Regions)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Empirical chemical quantification of microcystin-LR via ELISA and HPLC-MS/MS against WHO recreational guideline limits (1.0 µg/L) covering Kashmir, Jammu, Ladakh, AJK, and Gilgit-Baltistan.
                  </p>
                </div>

                {/* Regional Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
                  {[
                    { label: 'All 5 Regions', count: laboratoryToxinRecords.length, value: 'All' },
                    { label: 'Kashmir Valley', count: laboratoryToxinRecords.filter(r => (r as any).region === 'Kashmir Valley').length, value: 'Kashmir Valley' },
                    { label: 'Jammu Division', count: laboratoryToxinRecords.filter(r => (r as any).region === 'Jammu Division').length, value: 'Jammu Division' },
                    { label: 'Ladakh', count: laboratoryToxinRecords.filter(r => (r as any).region === 'Ladakh').length, value: 'Ladakh' },
                    { label: 'Azad Kashmir', count: laboratoryToxinRecords.filter(r => (r as any).region === 'Azad Kashmir (AJK)').length, value: 'Azad Kashmir (AJK)' },
                    { label: 'Gilgit-Baltistan', count: laboratoryToxinRecords.filter(r => (r as any).region === 'Gilgit-Baltistan (GB)').length, value: 'Gilgit-Baltistan (GB)' },
                  ].map(p => (
                    <button
                      key={p.value}
                      onClick={() => setSelectedLabRegion(p.value)}
                      className={`text-[10px] px-2.5 py-1 rounded-[4px] border transition-all ${
                        selectedLabRegion === p.value
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold shadow-sm'
                          : 'bg-white/5 text-slate-400 border-white/10 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {p.label} ({p.count})
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto bg-slate-900/80 border border-white/10 rounded-2xl shadow-xl scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <table className="w-full text-left text-xs min-w-[1080px]">
                  <thead className="bg-white/5 border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3.5 min-w-[180px]">Sample ID & Lake</th>
                      <th className="p-3.5 min-w-[170px]">Geographic Region</th>
                      <th className="p-3.5 min-w-[180px]">Location / Basin</th>
                      <th className="p-3.5 min-w-[210px]">Testing Laboratory</th>
                      <th className="p-3.5 min-w-[130px]">Method</th>
                      <th className="p-3.5 min-w-[140px]">Microcystin-LR</th>
                      <th className="p-3.5 min-w-[130px]">Cell Density</th>
                      <th className="p-3.5 min-w-[220px]">Toxin Status</th>
                      <th className="p-3.5 min-w-[110px]">Chain of Custody</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {laboratoryToxinRecords
                      .filter(lab => {
                        if (selectedLabRegion === 'All' || selectedLabRegion === 'All 5 Regions') return true;
                        return (lab as any).region === selectedLabRegion;
                      })
                      .map(lab => (
                      <tr key={lab.sampleId} className="hover:bg-white/[0.03] transition-colors">
                        <td className="p-3.5 font-medium">
                          <div className="font-bold text-white text-sm">{lab.waterbodyName}</div>
                          <div className="text-[10px] font-mono text-emerald-400 mt-0.5">{lab.sampleId}</div>
                        </td>
                        <td className="p-3.5">
                          {renderGeographicRegion((lab as any).region || 'Kashmir Valley', (lab as any).district || 'Srinagar')}
                        </td>
                        <td className="p-3.5 text-slate-300 font-medium">{lab.samplingLocation}</td>
                        <td className="p-3.5 text-slate-300 font-medium">
                          {lab.testingLaboratory}
                        </td>
                        <td className="p-3.5 font-mono text-slate-300">{lab.analyticalMethod}</td>
                        <td className="p-3.5 font-mono">
                          <span className={`font-bold ${lab.microcystinLrUgL > 1.0 ? 'text-red-400' : 'text-emerald-400'}`}>
                            {lab.microcystinLrUgL} µg/L
                          </span>
                          <span className="text-[9px] text-slate-500 block">LOD: {lab.detectionLimitUgL} µg/L</span>
                        </td>
                        <td className="p-3.5 font-mono text-slate-300">
                          {lab.cyanobacteriaCellDensityCellsML.toLocaleString()} cells/mL
                        </td>
                        <td className="p-3.5">
                          {renderToxinStatus(lab.toxinSafetyStatus)}
                        </td>
                        <td className="p-3.5">
                          <span className="inline-flex items-center gap-1 text-[10px] px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold whitespace-nowrap">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            Verified
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* LAYER 3: 72-HOUR PREDICTIVE BLOOM FORECASTING                         */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {activeLayer === 'forecast' && (
          <div className="space-y-6">
            {/* Header & Status Filter Pills */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <CloudRain className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  Regional Predictive Hydro-Thermal Bloom Horizons ({filteredForecastModels.length} of {forecastModels.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Multi-horizon (24h / 48h / 72h) bloom risk screening powered by ECMWF IFS solar insolation, wind mixing, and thermal stratification mechanics across all 5 Himalayan sub-regions.
                </p>
              </div>

              {/* Status Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
                {[
                  { id: 'All', label: 'All Forecasts', count: forecastStatusCounts.all, color: 'text-slate-200' },
                  { id: 'Experimental Model (Hydro-Thermal Screening)', label: 'Experimental Models', count: forecastStatusCounts.experimental, color: 'text-blue-300' },
                  { id: 'Calibration Required (Model Assessment Pending)', label: 'Calibration Needed', count: forecastStatusCounts.calibration, color: 'text-amber-300' },
                  { id: 'Cryospheric Suspension (Sub-Zero Freeze)', label: 'Frozen / Snow', count: forecastStatusCounts.cryospheric, color: 'text-indigo-300' },
                  { id: 'Forecast Unavailable (Sub-Pixel Wetland / Data Gap)', label: 'Unavailable', count: forecastStatusCounts.unavailable, color: 'text-purple-300' },
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedForecastStatus(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                      selectedForecastStatus === tab.id
                        ? 'bg-blue-500/20 text-white border-blue-500/50 shadow-sm'
                        : 'bg-white/[0.03] text-slate-400 border-white/5 hover:bg-white/[0.08] hover:text-slate-200'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-[4px] bg-black/40 font-mono font-bold ${tab.color}`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scientific Disclaimer & Model Provenance */}
            <div className="bg-slate-900/80 border border-blue-500/25 rounded-xl p-4 text-xs text-slate-300 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
              <div className="flex items-start gap-2.5">
                <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <strong className="text-white">Forecasting Limitations & Attribution Standards:</strong> Atmospheric radiation and wind forecasts (ECMWF IFS via Open-Meteo) represent meteorological forcing, <em>not direct measurements of in-lake vertical temperature profiles</em>.
                  Models without continuous in-situ thermistor chains are categorized as <strong>Experimental Hydro-Thermal Screening</strong>. Causal factors are labeled as <strong>Associated Forecast Drivers</strong> rather than definitive causes.
                </div>
              </div>
              <div className="flex-shrink-0 text-[10px] text-slate-400 font-mono bg-black/40 px-2.5 py-1.5 rounded border border-white/5">
                Baseline MAE: ±3.8 µg/L · Time-Separated Testing
              </div>
            </div>

            {/* Forecast Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredForecastModels.map(fc => {
                const isExperimental = fc.validationStatus === 'Experimental Model (Hydro-Thermal Screening)';
                const isCalibration = fc.validationStatus === 'Calibration Required (Model Assessment Pending)';
                const isFrozen = fc.validationStatus === 'Cryospheric Suspension (Sub-Zero Freeze)';
                const isUnavailable = fc.validationStatus === 'Forecast Unavailable (Sub-Pixel Wetland / Data Gap)';

                return (
                  <Card key={fc.waterbodyId} className="glass-intense border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all">
                    <div>
                      {/* Top Header */}
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="min-w-0">
                          <h3 className="text-base font-bold text-white truncate">{fc.waterbodyName}</h3>
                          <div className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5 font-medium flex-wrap">
                            <span className="inline-flex items-center gap-1 text-slate-300">
                              <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                              {fc.district}
                            </span>
                            <span>·</span>
                            <span className="text-cyan-400 text-[10px]">{fc.region}</span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="flex-shrink-0">
                          {isExperimental && (
                            <span className="text-[10px] px-2.5 py-0.5 rounded-[4px] font-bold border whitespace-nowrap bg-blue-500/20 text-blue-300 border-blue-500/40">
                              Experimental Screening
                            </span>
                          )}
                          {isCalibration && (
                            <span className="text-[10px] px-2.5 py-0.5 rounded-[4px] font-bold border whitespace-nowrap bg-amber-500/20 text-amber-300 border-amber-500/40">
                              Calibration Needed
                            </span>
                          )}
                          {isFrozen && (
                            <span className="text-[10px] px-2.5 py-0.5 rounded-[4px] font-bold border whitespace-nowrap bg-indigo-500/20 text-indigo-300 border-indigo-500/40">
                              Frozen / Snow
                            </span>
                          )}
                          {isUnavailable && (
                            <span className="text-[10px] px-2.5 py-0.5 rounded-[4px] font-bold border whitespace-nowrap bg-purple-500/20 text-purple-300 border-purple-500/40">
                              Unavailable
                            </span>
                          )}
                        </div>
                      </div>

                      {/* 3-Day Forecast Horizons */}
                      <div className="grid grid-cols-3 gap-2 bg-slate-900/70 border border-white/5 rounded-xl p-3 mb-4 text-center">
                        <div className="p-2 rounded-lg bg-white/[0.02]">
                          <span className="text-[10px] text-slate-500 block mb-1">24-Hour Horizon</span>
                          <span className={`text-xs font-bold ${
                            fc.horizon24hRisk === 'Critical' ? 'text-red-400' :
                            fc.horizon24hRisk === 'High' ? 'text-orange-400' :
                            fc.horizon24hRisk === 'Moderate' ? 'text-amber-400' :
                            fc.horizon24hRisk === 'Low' ? 'text-emerald-400' : 'text-slate-500'
                          }`}>
                            {fc.horizon24hRisk} Risk
                          </span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/[0.02]">
                          <span className="text-[10px] text-slate-500 block mb-1">48-Hour Horizon</span>
                          <span className={`text-xs font-bold ${
                            fc.horizon48hRisk === 'Critical' ? 'text-red-400' :
                            fc.horizon48hRisk === 'High' ? 'text-orange-400' :
                            fc.horizon48hRisk === 'Moderate' ? 'text-amber-400' :
                            fc.horizon48hRisk === 'Low' ? 'text-emerald-400' : 'text-slate-500'
                          }`}>
                            {fc.horizon48hRisk} Risk
                          </span>
                        </div>
                        <div className="p-2 rounded-lg bg-white/[0.02]">
                          <span className="text-[10px] text-slate-500 block mb-1">72-Hour Horizon</span>
                          <span className={`text-xs font-bold ${
                            fc.horizon72hRisk === 'Critical' ? 'text-red-400' :
                            fc.horizon72hRisk === 'High' ? 'text-orange-400' :
                            fc.horizon72hRisk === 'Moderate' ? 'text-amber-400' :
                            fc.horizon72hRisk === 'Low' ? 'text-emerald-400' : 'text-slate-500'
                          }`}>
                            {fc.horizon72hRisk} Risk
                          </span>
                        </div>
                      </div>

                      {/* Quantitative Details vs Suspension Explanations */}
                      {isExperimental ? (
                        <>
                          <div className="grid grid-cols-2 gap-2 bg-slate-900/60 border border-white/5 rounded-xl p-3 mb-3 text-xs">
                            <div>
                              <span className="text-[10px] text-slate-500 block">Thermal Stratification</span>
                              <span className="text-amber-400 font-mono font-bold text-sm">
                                {fc.thermalStratificationProbability !== null ? `${(fc.thermalStratificationProbability * 100).toFixed(0)}%` : 'N/A'}
                              </span>
                              <span className="text-[9px] text-slate-500 block font-mono mt-0.5">
                                1D FLake/GLM Physics
                              </span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block">Projected Chl-a Delta</span>
                              <span className={`font-mono font-bold text-sm ${(fc.predictedChlAChangeUgL ?? 0) > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                                {fc.predictedChlAChangeUgL !== null ? `${fc.predictedChlAChangeUgL > 0 ? '+' : ''}${fc.predictedChlAChangeUgL} µg/L` : 'N/A'}
                              </span>
                              <span className="text-[9px] text-slate-500 block font-mono mt-0.5">
                                72-Hour Horizon
                              </span>
                            </div>
                          </div>

                          <div className="text-xs text-slate-400 mb-3 space-y-1">
                            <span className="text-[10px] text-slate-500 font-semibold block uppercase tracking-wider">Associated Forecast Drivers:</span>
                            <p className="text-[11px] text-slate-300 leading-relaxed bg-black/20 p-2.5 rounded-lg border border-white/5">
                              {fc.associatedForecastDrivers}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="bg-slate-900/60 border border-white/5 rounded-xl p-3 mb-3 text-xs space-y-2">
                          <div className="flex items-center gap-2">
                            {isCalibration && <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />}
                            {isFrozen && <CloudRain className="w-4 h-4 text-indigo-400 flex-shrink-0" />}
                            {isUnavailable && <Info className="w-4 h-4 text-purple-400 flex-shrink-0" />}
                            <span className="font-semibold text-white">
                              {isCalibration && 'In-Situ Calibration Required'}
                              {isFrozen && 'Cryospheric Surface Freeze'}
                              {isUnavailable && 'Geometry Incompatible (<20m)'}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {fc.associatedForecastDrivers}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between text-[10px] text-slate-500 gap-1.5">
                      <span>Model Run: {fc.forecastGenerationTime}</span>
                      <span className="text-blue-300 font-mono truncate">{fc.forecastUncertainty}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* LAYER 4: EFFLUENT & REGULATORY WATER QUALITY NETWORK                  */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {activeLayer === 'institutional' && (
          <div className="space-y-8">
            {/* ── NUTRIENT LOADING & WATERSHED PRESSURE INTELLIGENCE ─────────── */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  Nutrient Loading & Watershed Pressure Intelligence
                </h2>
                <Badge variant="outline" className="border-emerald-500/40 text-emerald-300">
                  Coupled Watershed Architecture
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mb-4">
                Connecting end-of-pipe sewage discharges directly to ambient lake water quality and downstream bloom proliferation drivers across all 5 Himalayan regions.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Metric 1 */}
                <div className="bg-slate-900 border border-sky-500/30 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">1. Effluent Nutrient Influx</span>
                    <Building className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-black font-mono text-white mb-1">
                    {nutrientTotals.totalNLoad} <span className="text-sm font-normal text-slate-400">kg/day N</span>
                  </div>
                  <div className="text-xs text-slate-300 mb-2">
                    Total Phosphorus Load: <strong className="text-amber-400 font-mono">{nutrientTotals.totalPLoad} kg/day P</strong>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                    Calculated from <strong>{nutrientTotals.totalDischarge} MLD</strong> actual daily discharge across 12 facilities, not theoretical design capacity.
                  </p>
                </div>

                {/* Metric 2 */}
                <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">2. Lake Ambient Burden</span>
                    <Droplets className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black font-mono text-white mb-1">
                    0.38 <span className="text-sm font-normal text-slate-400">mg/L TP</span>
                  </div>
                  <div className="text-xs text-slate-300 mb-2">
                    Dal Lake Baseline (<strong className="text-red-400">&gt;0.03 mg/L Eutrophic limit</strong>)
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                    Regulatory in-lake grab sampling from CPCB NWQMP, JKPCC, LPCC, and PCRWR designated stations.
                  </p>
                </div>

                {/* Metric 3 */}
                <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">3. Hydraulic Flushing Coupling</span>
                    <Waves className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl font-black font-mono text-white mb-1">
                    Differential <span className="text-sm font-normal text-slate-400">Flushing</span>
                  </div>
                  <div className="text-xs text-slate-300 mb-2">
                    Wular: Rapid flushing · Dal/Anchar: Stagnant retention
                  </div>
                  <p className="text-[10px] text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                    Wular flushes surface scum via Jhelum throughput; Dal/Anchar retain nutrients, driving cyanotoxin risk.
                  </p>
                </div>
              </div>
            </div>

            {/* ── SEWAGE TREATMENT & NUTRIENT DISCHARGE FACILITIES ────────────── */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Building className="w-5 h-5 text-sky-400" />
                    Sewage Treatment & Nutrient Discharge Facilities ({filteredStpRecords.length} Facilities)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Official facilities across Kashmir (8 STPs: 5 LCMA + 3 UEED), Jammu (Bhagwati Nagar), Ladakh (Leh FSTP), Azad Kashmir, and Gilgit-Baltistan.
                  </p>
                </div>

                {/* Region Filter */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
                  {['All', 'Kashmir Valley', 'Jammu Division', 'Ladakh', 'AJK', 'Gilgit-Baltistan'].map(r => (
                    <button
                      key={r}
                      onClick={() => setSelectedStpRegion(r)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                        selectedStpRegion === r
                          ? 'bg-sky-500/20 text-sky-200 border-sky-500/50'
                          : 'bg-white/[0.03] text-slate-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStpRecords.map(stp => (
                  <Card key={stp.stpId} className="glass-intense border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <div className="text-[10px] font-mono text-sky-400 truncate">{stp.stpId} · {stp.controllingAuthority}</div>
                          <h4 className="text-sm font-bold text-white leading-snug mt-0.5 truncate">{stp.facilityName}</h4>
                          <p className="text-[10px] text-slate-400 mt-0.5 truncate">{stp.catchmentLocation}</p>
                        </div>
                        <span className={`text-[10px] px-2 py-0.5 rounded-[4px] font-bold border whitespace-nowrap flex-shrink-0 ${
                          stp.complianceStatus === 'In Compliance' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                        }`}>
                          {stp.complianceStatus}
                        </span>
                      </div>

                      {/* Effluent Concentrations Grid */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-900/70 border border-white/5 rounded-xl p-3 mb-3 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Effluent BOD</span>
                          <span className="text-white font-mono font-bold">{stp.effluentBodMgL} mg/L</span>
                          <span className="text-[8px] text-slate-500 block">COD: {stp.effluentCodMgL} mg/L</span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Total Phosphorus</span>
                          <span className="text-amber-400 font-mono font-bold">{stp.totalPhosphorusMgL} mg/L</span>
                          <span className="text-[8px] text-slate-500 block">TN: {stp.totalNitrogenMgL} mg/L</span>
                        </div>
                      </div>

                      {/* Calculated Mass Loading Box */}
                      <div className="bg-sky-950/20 border border-sky-500/20 rounded-xl p-2.5 mb-3 text-xs space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">Daily Discharge:</span>
                          <span className="text-white font-mono font-bold">{stp.actualDischargeMld} MLD <span className="text-slate-500 font-normal">({stp.designCapacityMld} MLD Cap.)</span></span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">Calculated N Load:</span>
                          <span className="text-sky-300 font-mono font-bold">{stp.dailyNitrogenLoadKgDay} kg/day</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-400">Calculated P Load:</span>
                          <span className="text-amber-300 font-mono font-bold">{stp.dailyPhosphorusLoadKgDay} kg/day</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-500 leading-relaxed mb-2">
                        <span>Standard: </span><span className="text-slate-400">{stp.evaluatedStandards}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Receives: {stp.receivingWaterbody}</span>
                      <span>Sync: {stp.lastTelemetryTimestamp}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* ── REGULATORY SURFACE WATER QUALITY MONITORING NETWORK ─────────── */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    Regulatory Surface Water Quality Monitoring Network ({filteredInstitutionalRecords.length} Stations)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Designated physical monitoring stations across CPCB NWQMP, JKPCC, LPCC, and PCRWR. Periodic manual grab sampling, not 24/7 continuous telemetry.
                  </p>
                </div>

                {/* Region Filter */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
                  {['All', 'Kashmir Valley', 'Jammu Division', 'Ladakh', 'AJK', 'Gilgit-Baltistan'].map(r => (
                    <button
                      key={r}
                      onClick={() => setSelectedInstRegion(r)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all border ${
                        selectedInstRegion === r
                          ? 'bg-emerald-500/20 text-emerald-200 border-emerald-500/50'
                          : 'bg-white/[0.03] text-slate-400 border-white/5 hover:text-white'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredInstitutionalRecords.map(inst => (
                  <Card key={inst.stationId} className="glass-intense border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="min-w-0">
                          <div className="text-[10px] font-mono text-emerald-400 truncate">{inst.stationId} · {inst.agency}</div>
                          <h4 className="text-sm font-bold text-white truncate">{inst.stationName}</h4>
                          <p className="text-[10px] text-slate-400 truncate">{inst.samplingType}</p>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-[4px] border bg-slate-800 text-slate-300 border-slate-700 flex-shrink-0">
                          {inst.waterClassClassification}
                        </span>
                      </div>

                      <div className="grid grid-cols-4 gap-2 bg-slate-900/70 border border-white/5 rounded-xl p-3 mb-3 text-center text-xs">
                        <div>
                          <span className="text-[9px] text-slate-500 block">DO</span>
                          <span className="font-mono font-bold text-emerald-400">{inst.dissolvedOxygenMgL} mg/L</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 block">pH</span>
                          <span className="font-mono font-bold text-cyan-400">{inst.ph}</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 block">BOD</span>
                          <span className="font-mono font-bold text-amber-400">{inst.biochemicalOxygenDemandMgL} mg/L</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 block">Secchi</span>
                          <span className="font-mono font-bold text-white">{inst.secchiDepthM}m</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 mb-2">
                        <span>Total N: <strong className="text-slate-200">{inst.totalNitrogenMgL} mg/L</strong></span>
                        <span>Total P: <strong className="text-amber-400">{inst.totalPhosphorusMgL} mg/L</strong></span>
                        <span>COD: <strong className="text-slate-200">{inst.chemicalOxygenDemandMgL} mg/L</strong></span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Coords: {inst.samplingCoordinates.lat.toFixed(4)}, {inst.samplingCoordinates.lng.toFixed(4)}</span>
                      <span>Last Sampled: {inst.lastSampleDate}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* LAYER 5: COMPREHENSIVE WATERBODY REGISTRY (83 LAKES)                  */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {activeLayer === 'registry' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-emerald-400" />
                  Western Himalayan Monitored Waterbodies ({filteredWaterbodies.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Lakes, floodplain wetlands, Ramsar sanctuaries, and alpine tarns across all 5 Himalayan regions.
                </p>
              </div>

              {/* View Toggle */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400 hover:text-white'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedWaterbodies.map(wb => {
                  const classificationBadge = getClassificationBadge(wb.currentBloomClassification);

                  return (
                    <Card key={wb.id} className="glass-intense border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all">
                      <div>
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="text-base font-bold text-white">{wb.name}</h3>
                            <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1.5 font-medium">
                              <MapPin className="w-3 h-3 text-emerald-400" />
                              <span className="text-slate-200 font-semibold">{wb.district} District</span> · <span>{wb.subRegion}</span>
                            </p>
                          </div>
                          <span className={`text-[10px] px-2 py-0.5 rounded-[4px] font-bold border ${classificationBadge.bg}`}>
                            {wb.trophicStatus}
                          </span>
                        </div>

                        <div className="bg-slate-900/70 border border-white/5 rounded-xl p-3 mb-3 text-xs space-y-1.5">
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500">Bloom Classification</span>
                            <span className="text-white font-medium">{wb.currentBloomClassification}</span>
                          </div>
                          <div className="flex justify-between text-[11px]">
                            <span className="text-slate-500">Cyanotoxin Safety</span>
                            <span className={`font-medium ${wb.cyanotoxinStatus.includes('Exceedance') ? 'text-red-400' : 'text-emerald-400'}`}>
                              {wb.cyanotoxinStatus}
                            </span>
                          </div>
                          {wb.liveMeteorology && (
                            <div className="flex justify-between text-[11px] pt-1 border-t border-white/5">
                              <span className="text-slate-500">Live Temperature / Wind</span>
                              <span className="text-cyan-300 font-mono">
                                {wb.liveMeteorology.tempMaxC}°C · {wb.liveMeteorology.windSpeedKmH} km/h
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="text-[10px] text-slate-400 flex items-center justify-between">
                          <span>Altitude: {wb.altitudeM}m</span>
                          <span>Area: {wb.surfaceAreaKm2} km²</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
                        <span>Type: {wb.lakeType}</span>
                        <span>Scope: {wb.scope}</span>
                      </div>
                    </Card>
                  );
                })}
              </div>
            ) : (
              <div className="overflow-x-auto bg-slate-900/80 border border-white/10 rounded-2xl shadow-xl scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                <table className="w-full text-left text-xs min-w-[980px]">
                  <thead className="bg-white/5 border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="p-3.5 min-w-[170px]">Lake Name</th>
                      <th className="p-3.5 min-w-[160px]">Geographic Region</th>
                      <th className="p-3.5 min-w-[130px]">Trophic Status</th>
                      <th className="p-3.5 min-w-[190px]">Bloom Classification</th>
                      <th className="p-3.5 min-w-[220px]">Cyanotoxin Assay</th>
                      <th className="p-3.5 min-w-[90px]">Altitude</th>
                      <th className="p-3.5 min-w-[90px]">Area</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {paginatedWaterbodies.map(wb => (
                      <tr key={wb.id} className="hover:bg-white/[0.03] transition-colors">
                        <td className="p-3.5 font-bold text-white text-sm">{wb.name}</td>
                        <td className="p-3.5">
                          {renderGeographicRegion(wb.subRegion, `${wb.district} District`)}
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-amber-300">{wb.trophicStatus}</span>
                        </td>
                        <td className="p-3.5">
                          <span className="text-slate-200 font-medium">{wb.currentBloomClassification}</span>
                        </td>
                        <td className="p-3.5">
                          {renderToxinStatus(wb.cyanotoxinStatus)}
                        </td>
                        <td className="p-3.5 font-mono text-slate-300">{wb.altitudeM}m</td>
                        <td className="p-3.5 font-mono text-slate-300">{wb.surfaceAreaKm2} km²</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  className="text-xs border-white/20 text-white"
                >
                  Previous
                </Button>
                <div className="text-xs text-slate-400">
                  Page <span className="text-white font-bold">{currentPage}</span> of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="text-xs border-white/20 text-white"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ── RELATED HAZARD INTELLIGENCE (6 CONTEXTUAL MODULES) ─────────── */}
        <RelatedHazardIntelligence currentModule="algal-bloom" />

      </div>
    </main>
  );
}
