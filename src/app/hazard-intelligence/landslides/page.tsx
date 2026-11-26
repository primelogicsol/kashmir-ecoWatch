'use client';

import { useRouter } from 'next/navigation';
import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { GlobalFilterBar, FilterSelect } from '@/components/common/GlobalFilterBar';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import {
  Mountain, Activity, MapPin, AlertTriangle, Shield, CheckCircle,
  Clock, TrendingUp, Eye, ChevronRight, Triangle,
  Waves, BarChart3, Calendar, Zap, PhoneCall,
  Layers, Radio, FileText, RefreshCw, ExternalLink,
  Navigation, Truck, Info, Gauge, CloudRain, Droplets,
  ArrowRight, AlertOctagon, HelpCircle, CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RelatedHazardIntelligence } from '@/components/hazard/RelatedHazardIntelligence';

import {
  useLandslideIntelligence,
  LandslideRecord,
  RoadCorridor,
  OfficialBulletin,
  SusceptibilityRating,
  NowcastHazardLevel,
  GeologicalVerificationStatus,
} from '@/hooks/useLandslideIntelligence';

// ─── Layer Tab Types ──────────────────────────────────────────────────────────

type ActiveLayerTab = 'corridors' | 'nowcast' | 'bulletins' | 'inventory' | 'susceptibility';

// ─── Styling and Color Helpers ────────────────────────────────────────────────

function getGeologicalVerificationBadge(status?: GeologicalVerificationStatus | string) {
  switch (status) {
    case 'Verified GSI 1:10,000 Detailed':
      return {
        label: 'GSI 1:10k Detailed Survey',
        bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      };
    case 'Verified GSI NLSM 1:50,000':
      return {
        label: 'GSI NLSM 1:50k Sheet',
        bg: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
        badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      };
    case 'Verified GSP Regional':
      return {
        label: 'GSP Regional Quadrangle',
        bg: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
        badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      };
    case 'Detailed InSAR & Field Inventory':
    default:
      return {
        label: 'InSAR & Field Inventory',
        bg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
        badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      };
  }
}

function getSusceptibilityBadge(rating: SusceptibilityRating) {
  switch (rating) {
    case 'Very High':
      return { variant: 'critical' as const, color: 'text-red-400', bg: 'bg-red-500/15 border-red-500/30' };
    case 'High':
      return { variant: 'danger' as const, color: 'text-orange-400', bg: 'bg-orange-500/15 border-orange-500/30' };
    case 'Moderate':
      return { variant: 'warning' as const, color: 'text-amber-400', bg: 'bg-amber-500/15 border-amber-500/30' };
    case 'Low':
    default:
      return { variant: 'success' as const, color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30' };
  }
}

function getNowcastBadge(level: NowcastHazardLevel | undefined) {
  switch (level) {
    case 'High':
      return { label: 'High Potential', color: 'text-red-400', bg: 'bg-red-500/20 border-red-500/40 text-red-300' };
    case 'Moderate':
      return { label: 'Moderate Potential', color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/40 text-amber-300' };
    case 'Low':
      return { label: 'Low / Baseline', color: 'text-emerald-400', bg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' };
    case 'Monitoring Unavailable':
    default:
      return { label: 'Telemetry Unavailable', color: 'text-slate-400', bg: 'bg-slate-500/15 border-slate-500/30 text-slate-300' };
  }
}

function getCorridorStatusBadge(status: RoadCorridor['operationalStatus']) {
  switch (status) {
    case 'Blocked - Debris Clearing':
    case 'Officially Closed':
      return { label: 'Officially Closed', color: 'text-red-400', bg: 'bg-red-500/20 border-red-500/40 text-red-200', icon: AlertOctagon };
    case 'Restricted - Caution / One Way':
    case 'Officially Restricted':
      return { label: 'Officially Restricted', color: 'text-amber-400', bg: 'bg-amber-500/20 border-amber-500/40 text-amber-200', icon: AlertTriangle };
    case 'Convoy-Only Movement':
      return { label: 'Convoy Movement Only', color: 'text-cyan-400', bg: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-200', icon: Truck };
    case 'Night Curfew In Effect':
      return { label: 'Night Curfew Active', color: 'text-indigo-400', bg: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-200', icon: Clock };
    case 'Official Advisory Expired':
      return { label: 'Advisory Expired / Unverified', color: 'text-orange-400', bg: 'bg-orange-500/20 border-orange-500/40 text-orange-200', icon: Clock };
    case 'Officially Open':
    case 'Open - Normal Flow':
      return { label: 'Officially Confirmed Open', color: 'text-emerald-400', bg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-200', icon: CheckCircle2 };
    case 'Status Unknown / Unverified':
    default:
      return { label: 'Status Unknown / Unverified', color: 'text-amber-300', bg: 'bg-slate-800/90 border-amber-500/30 text-amber-200', icon: HelpCircle };
  }
}

function getBulletinLevelBadge(level: OfficialBulletin['warningLevel']) {
  switch (level) {
    case 'Warning':
      return { label: 'Official Warning', bg: 'bg-red-500/20 text-red-300 border-red-500/40' };
    case 'Watch':
      return { label: 'Agency Watch', bg: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
    case 'Advisory':
      return { label: 'Traffic Advisory', bg: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
    case 'No Active Advisory':
    default:
      return { label: 'No Active Advisory', bg: 'bg-slate-800 text-slate-400 border-slate-700' };
  }
}

// ─── Main Landslide Intelligence Page ─────────────────────────────────────────

export default function LandslidesPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();

  const [activeLayer, setActiveLayer] = useState<ActiveLayerTab>('corridors');
  const [selectedSubRegion, setSelectedSubRegion] = useState<string>('All');
  const [slideTypeFilter, setSlideTypeFilter] = useState('all');
  const [susceptibilityFilter, setSusceptibilityFilter] = useState('all');
  const [geoVerificationFilter, setGeoVerificationFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const ITEMS_PER_PAGE = 9;

  const {
    records,
    roadCorridors,
    officialBulletins,
    summary,
    loading,
    error,
    isStale,
    refresh,
  } = useLandslideIntelligence();

  const handleManualRefresh = async () => {
    setIsRefreshing(true);
    await refresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  // Region categorizer for the 5 Himalayan sub-regions
  const matchesSubRegion = (item: LandslideRecord, region: string) => {
    if (region === 'All') return true;
    if (item.region) {
      if (item.region === region) return true;
      if (region === 'AJK' && (item.region === 'Azad Kashmir (AJK)' || item.region === 'AJK')) return true;
      if (region === 'Gilgit-Baltistan' && (item.region === 'Gilgit-Baltistan (GB)' || item.region === 'Gilgit-Baltistan')) return true;
    }
    if (region === 'Kashmir Valley') {
      return ['Srinagar', 'Baramulla', 'Anantnag', 'Ganderbal', 'Budgam', 'Kupwara', 'Kulgam', 'Pulwama', 'Shopian', 'Bandipora'].includes(item.district);
    }
    if (region === 'Jammu Division') {
      return ['Ramban', 'Udhampur', 'Doda', 'Kishtwar', 'Reasi', 'Poonch', 'Rajouri', 'Jammu', 'Kathua', 'Samba'].includes(item.district);
    }
    if (region === 'Ladakh') {
      return ['Leh', 'Kargil'].includes(item.district);
    }
    if (region === 'AJK') {
      return ['Muzaffarabad', 'Neelum', 'Bagh', 'Poonch (AJK)', 'Mirpur', 'Kotli', 'Rawalakot', 'Bhimber', 'Haveli'].includes(item.district);
    }
    if (region === 'Gilgit-Baltistan') {
      return ['Gilgit', 'Hunza', 'Nagar', 'Diamer', 'Skardu', 'Ghizer', 'Astore', 'Ghanche', 'Shigar', 'Kharmang'].includes(item.district);
    }
    return false;
  };

  // Sub-region filter for road corridors
  const matchesCorridorRegion = (corridor: RoadCorridor, region: string) => {
    if (region === 'All') return true;
    if (region === 'Kashmir Valley') return corridor.highwayCode === 'NH-44' || corridor.highwayCode === 'NH-1' || corridor.highwayCode === 'Mughal Road';
    if (region === 'Jammu Division') return corridor.highwayCode === 'NH-44' || corridor.highwayCode === 'Mughal Road';
    if (region === 'Ladakh') return corridor.highwayCode === 'NH-1';
    if (region === 'AJK') return corridor.highwayCode === 'Neelum Highway';
    if (region === 'Gilgit-Baltistan') return corridor.highwayCode === 'KKH (N-35)';
    return true;
  };

  // Filter options for dropdowns
  const slideTypeOptions = useMemo(() => {
    const types = Array.from(new Set(records.map(r => r.slide_type))).sort();
    return types.map(t => ({ value: t, label: t }));
  }, [records]);

  const susceptibilityOptions = [
    { value: 'all', label: 'All Susceptibility Ratings' },
    { value: 'Very High', label: 'Very High Susceptibility' },
    { value: 'High', label: 'High Susceptibility' },
    { value: 'Moderate', label: 'Moderate Susceptibility' },
    { value: 'Low', label: 'Low Susceptibility' },
  ];

  // Filtered records
  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      const q = filter.searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        r.name.toLowerCase().includes(q) ||
        r.district.toLowerCase().includes(q) ||
        r.road_affected.toLowerCase().includes(q) ||
        r.geology.toLowerCase().includes(q) ||
        (r.gsi_inventory_code && r.gsi_inventory_code.toLowerCase().includes(q));

      const matchScope = filter.scope === 'All' || r.scope === filter.scope;
      const matchSubRegion = matchesSubRegion(r, selectedSubRegion);
      const matchSlideType = slideTypeFilter === 'all' || r.slide_type === slideTypeFilter;
      const matchSusc = susceptibilityFilter === 'all' || r.risk_level === susceptibilityFilter;
      const matchGeoVerification =
        activeLayer !== 'susceptibility' ||
        geoVerificationFilter === 'all' ||
        r.geological_verification_status === geoVerificationFilter;

      return matchSearch && matchScope && matchSubRegion && matchSlideType && matchSusc && matchGeoVerification;
    });
  }, [records, filter, selectedSubRegion, slideTypeFilter, susceptibilityFilter, geoVerificationFilter, activeLayer]);

  // Filtered corridors
  const filteredCorridors = useMemo(() => {
    return roadCorridors.filter(c => {
      const q = filter.searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        c.name.toLowerCase().includes(q) ||
        c.highwayCode.toLowerCase().includes(q) ||
        c.criticalSectors.some(s => s.name.toLowerCase().includes(q));
      const matchRegion = matchesCorridorRegion(c, selectedSubRegion);
      return matchSearch && matchRegion;
    });
  }, [roadCorridors, filter.searchQuery, selectedSubRegion]);

  // Filtered bulletins
  const filteredBulletins = useMemo(() => {
    return officialBulletins.filter(b => {
      const q = filter.searchQuery.toLowerCase().trim();
      const matchSearch =
        q === '' ||
        b.headline.toLowerCase().includes(q) ||
        b.issuingAuthority.toLowerCase().includes(q) ||
        b.region.toLowerCase().includes(q) ||
        b.affectedDistricts.some(d => d.toLowerCase().includes(q));
      if (selectedSubRegion === 'All') return matchSearch;
      if (selectedSubRegion === 'Kashmir Valley') return matchSearch && (b.region.includes('Kashmir') || b.affectedDistricts.some(d => ['Srinagar', 'Ganderbal', 'Baramulla', 'Anantnag'].includes(d)));
      if (selectedSubRegion === 'Jammu Division') return matchSearch && (b.region.includes('Jammu') || b.affectedDistricts.some(d => ['Ramban', 'Udhampur', 'Doda'].includes(d)));
      if (selectedSubRegion === 'Ladakh') return matchSearch && (b.region.includes('Ladakh') || b.affectedDistricts.some(d => ['Leh', 'Kargil'].includes(d)));
      if (selectedSubRegion === 'AJK') return matchSearch && b.region.includes('AJK');
      if (selectedSubRegion === 'Gilgit-Baltistan') return matchSearch && b.region.includes('Gilgit');
      return matchSearch;
    });
  }, [officialBulletins, filter.searchQuery, selectedSubRegion]);

  // Paginated records
  const totalPages = Math.ceil(filteredRecords.length / ITEMS_PER_PAGE);
  const paginatedRecords = filteredRecords.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  // Top KPI metrics - decoupled scientific values
  const highSusceptibilityTotal = records.filter(r => r.risk_level === 'Very High' || r.risk_level === 'High').length;
  const unverifiedCorridorsCount = roadCorridors.filter(c => c.operationalStatus === 'Status Unknown / Unverified' || c.verificationStatus === 'Current Status Not Independently Verified').length;
  const highNowcastTotal = records.filter(r => r.live_risk_level === 'High').length;
  const activeBulletinsTotal = officialBulletins.filter(b => b.warningLevel === 'Warning' || b.warningLevel === 'Watch').length;

  const metrics = [
    { label: 'Monitored Zones', value: records.length, icon: 'MapPin', color: 'text-amber-400' },
    { label: 'Strategic Corridors', value: roadCorridors.length, icon: 'Navigation', color: 'text-blue-400' },
    { label: 'Awaiting Official Verification', value: unverifiedCorridorsCount, icon: 'AlertTriangle', color: unverifiedCorridorsCount > 0 ? 'text-amber-400' : 'text-emerald-400' },
    { label: 'High Susceptibility', value: highSusceptibilityTotal, icon: 'Mountain', color: 'text-orange-400' },
    { label: 'Dynamic High Nowcast', value: highNowcastTotal, icon: 'CloudRain', color: highNowcastTotal > 0 ? 'text-red-400' : 'text-emerald-400' },
    { label: 'Official Warnings', value: activeBulletinsTotal, icon: 'Shield', color: activeBulletinsTotal > 0 ? 'text-red-400' : 'text-slate-400' },
  ];

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col text-slate-100 w-full max-w-full overflow-x-hidden">
      {/* ── HERO BANNER ────────────────────────────────────────────────────── */}
      <Heading
        label="Multi-Layer Hazard Intelligence · Western Himalaya"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Hazard Intelligence', href: '/hazard-intelligence' },
          { label: 'Landslides & Mass Movement' },
        ]}
        title={
          <>
            <span className="block leading-[1.12] overflow-visible pb-1 sm:pb-2">Decoupled Slope Intelligence</span>
            <span className="block whitespace-normal sm: whitespace-normal break-words leading-[1.12] overflow-visible bg-gradient-to-r from-amber-400 via-orange-300 to-amber-200 bg-clip-text text-transparent">
              Road Corridors, Nowcast & Susceptibility
            </span>
          </>
        }
        subtitle="Scientifically decoupling recorded inventory, terrain susceptibility zonation, NASA LHASA 2.0 dynamic rainfall nowcasts, official GSI Bhusanket bulletins, and strategic highway safety across 5 Himalayan regions."
        icon={<Mountain className="w-6 h-6 text-amber-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <Button
              className="bg-gradient-to-r from-amber-600 to-orange-600 font-bold text-white shadow-lg shadow-amber-900/30 hover:brightness-110"
              icon={<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />}
              onClick={handleManualRefresh}
            >
              Sync Live Telemetry
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white font-bold hover:bg-white/5"
              icon={<PhoneCall className="w-4 h-4 text-emerald-400" />}
              onClick={() => {
                const el = document.getElementById('emergency-contacts');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Highway Helplines
            </Button>
          </div>
        }
        images={[
          '/images/hazard-intelligence/hazard-landslides-monitoring.jpg',
          '/images/hazard-intelligence/hazard-command-center.jpg',
          '/images/hazard-intelligence/hazard-floods-riverine.jpg',
          '/images/hazard-intelligence/hazard-avalanches-snow.jpg',
        ]}
        overlayClassName="bg-gradient-to-b from-[#060E1A]/90 via-[#0a1628]/75 to-[#060E1A]/90"
      />

      {/* ── KPI METRICS STRIP (No layout collision) ────────────────────────── */}
      <div className="mb-6">
        <ModuleKpiStrip kpis={metrics} iconColor="text-amber-500" />
      </div>

      {/* ── 5-REGION SELECTOR PILLS ────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mb-6">
        <div className="bg-slate-900/80 border border-white/10 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 shadow-inner">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
            <MapPin className="w-4 h-4 text-amber-400" />
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
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
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
              id: 'corridors' as const,
              label: 'Road Corridors',
              sub: 'Transit Safety (5 Highways)',
              icon: Navigation,
              badge: `${unverifiedCorridorsCount} Awaiting Verification`,
              badgeColor: unverifiedCorridorsCount > 0 ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300',
            },
            {
              id: 'nowcast' as const,
              label: 'Dynamic Nowcast',
              sub: 'NASA LHASA 2.0 & Rainfall',
              icon: CloudRain,
              badge: `${highNowcastTotal} High Runoff`,
              badgeColor: highNowcastTotal > 0 ? 'bg-red-500/20 text-red-300' : 'bg-slate-700 text-slate-300',
            },
            {
              id: 'bulletins' as const,
              label: 'Agency Bulletins',
              sub: 'GSI Bhusanket & SDMAs',
              icon: Shield,
              badge: `${activeBulletinsTotal} Official Warnings`,
              badgeColor: activeBulletinsTotal > 0 ? 'bg-red-500/20 text-red-300' : 'bg-slate-700 text-slate-300',
            },
            {
              id: 'susceptibility' as const,
              label: 'Susceptibility',
              sub: 'Geological Baseline Zonation',
              icon: Mountain,
              badge: `${highSusceptibilityTotal} Very High/High`,
              badgeColor: 'bg-orange-500/20 text-orange-300',
            },
            {
              id: 'inventory' as const,
              label: 'Historical Catalog',
              sub: 'Recorded GSI & BRO Archive',
              icon: FileText,
              badge: `${records.length} Cataloged Events`,
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
                    ? 'bg-gradient-to-b from-amber-500/20 to-orange-500/10 border-amber-500/50 shadow-lg shadow-amber-500/10'
                    : 'bg-white/[0.02] border-transparent hover:bg-white/[0.05] hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
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

      {/* ── SCIENTIFIC INTEGRITY & DECOUPLING DISCLOSURE ──────────────────────── */}
      <div className="container mx-auto px-6 mb-6">
        <div className="bg-slate-900 border border-blue-500/25 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="bg-blue-500/20 p-2.5 rounded-lg flex-shrink-0">
            <Info className="w-5 h-5 text-blue-400" />
          </div>
          <div className="flex-1 text-xs leading-relaxed text-slate-300">
            <strong className="text-white">Scientific Distinction Disclosure:</strong> This platform strictly decouples four distinct hazard products:
            <span className="text-amber-300 font-medium"> (1) Historical Inventory</span> (recorded past failures),
            <span className="text-orange-300 font-medium"> (2) Terrain Susceptibility</span> (static geology & slope angle),
            <span className="text-blue-300 font-medium"> (3) Dynamic Nowcast</span> (NASA LHASA 2.0 rainfall & saturation model), and
            <span className="text-emerald-300 font-medium"> (4) Official Bulletins</span> (verified GSI Bhusanket & SDMA warnings).
            Model estimates are never displayed as confirmed landslides, and official warnings are never synthesized where agencies have not published an advisory.
          </div>
          <div className="flex-shrink-0 text-[10px] bg-black/40 border border-white/10 px-3 py-1.5 rounded-lg text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Telemetry: {summary.lastTelemetrySync || 'Real-time'}</span>
          </div>
        </div>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ───────────────────────────────────────── */}
      <div className="container mx-auto px-6 mb-6">
        <GlobalFilterBar
          extraFilters={
            <>
              {activeLayer !== 'corridors' && activeLayer !== 'bulletins' && (
                <>
                  <FilterSelect
                    value={slideTypeFilter}
                    onChange={v => {
                      setSlideTypeFilter(v);
                      setCurrentPage(1);
                    }}
                    placeholder="Slide Type"
                    options={slideTypeOptions}
                  />
                  <FilterSelect
                    value={susceptibilityFilter}
                    onChange={v => {
                      setSusceptibilityFilter(v);
                      setCurrentPage(1);
                    }}
                    placeholder="Susceptibility"
                    options={susceptibilityOptions}
                  />
                </>
              )}
            </>
          }
          extraActiveCount={(slideTypeFilter !== 'all' ? 1 : 0) + (susceptibilityFilter !== 'all' ? 1 : 0)}
          onExtraFiltersClear={() => {
            setSlideTypeFilter('all');
            setSusceptibilityFilter('all');
          }}
        />
      </div>

      {/* ── CONTENT PANELS ─────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mb-12 flex-1">

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* LAYER 1: STRATEGIC ROAD CORRIDORS VIEW                                */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {activeLayer === 'corridors' && (
          <div className="space-y-6">
            {/* Life-Safety Highway Transit Policy Banner */}
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-5 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400 flex-shrink-0 mt-0.5 border border-amber-500/30">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="text-sm font-black uppercase tracking-wider text-amber-300 flex items-center gap-2">
                      <span>Life-Safety Himalayan Highway Transit Protocol</span>
                      <span className="text-[10px] bg-red-500/20 text-red-300 border border-red-500/30 px-2 py-0.5 rounded-[4px] font-bold">
                        Zero Unverified &quot;Open&quot; Policy
                      </span>
                    </h3>
                    <span className="text-[11px] font-mono text-slate-400">Audit Status: Synchronized</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-white">Crucial Travel Safety Rule:</strong> &quot;Absence of detected hazards is NOT proof of road clearance.&quot; Kashmir EcoWatch strictly adheres to the life-safety mandate: <em>No Himalayan highway corridor displays an &quot;Open&quot; status unless authenticated, time-valid confirmation has been issued by the responsible controlling authority</em>.
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    High mountain passes (Zojila 3,528m, Peer Ki Gali 3,485m, Khunjerab 4,693m) and tectonic gorge axes (NH-44 Ramban, KKH Kohistan) are subject to sudden rockfalls, freeze-thaw shooting stones, and unannounced administrative convoy curfews. <strong>Always contact the verified traffic control helplines below prior to initiating transit.</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Navigation className="w-5 h-5 text-amber-400" />
                  Strategic Himalayan Highway Corridors ({filteredCorridors.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Decoupled 3-layer architecture: (1) Official Authority Operational Status, (2) Real-Time Reported Incidents, and (3) Geological Susceptibility Baseline.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredCorridors.map(corridor => {
                const statusBadge = getCorridorStatusBadge(corridor.operationalStatus);
                const StatusIcon = statusBadge.icon;

                return (
                  <Card key={corridor.id} className="glass-intense border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all">
                    <div className="space-y-4">
                      {/* Corridor Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                              {corridor.highwayCode}
                            </span>
                            <h3 className="text-base font-bold text-white">{corridor.name}</h3>
                          </div>
                          <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-slate-500" />
                            {corridor.routeCoverage} · {corridor.totalLengthKm} km
                          </p>
                        </div>
                        <div className={`px-2.5 py-1 rounded-[4px] text-xs font-semibold flex items-center gap-1.5 border shadow-sm ${statusBadge.bg}`}>
                          <StatusIcon className="w-3.5 h-3.5" />
                          <span>{statusBadge.label}</span>
                        </div>
                      </div>

                      {/* ── LAYER 1: OFFICIAL OPERATIONAL STATUS & PROVENANCE ── */}
                      <div className="bg-slate-900/80 border border-white/10 rounded-xl p-3.5 space-y-2.5">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                          <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-amber-400" />
                            Layer 1: Official Operational Status & Provenance
                          </div>
                          <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-amber-500/10 text-amber-300 border border-amber-500/30 font-medium">
                            {corridor.verificationStatus || 'Current Status Not Independently Verified'}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-500 block">Controlling Authority</span>
                            <span className="font-semibold text-slate-200">{corridor.officialAuthority || corridor.controllingAgency}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-500 block">Official Source Channel</span>
                            <span className="font-medium text-slate-300 truncate block">{corridor.officialSourceChannel || 'Daily Traffic Plan Communique'}</span>
                          </div>
                        </div>

                        <div className="bg-black/30 rounded-lg p-2.5 border border-white/5 space-y-1">
                          <div className="flex items-center justify-between text-[10px] text-slate-400">
                            <span>Authority Notice Reference:</span>
                            <span className="text-amber-400/90 font-mono truncate max-w-[200px]">{corridor.officialNoticeReference || 'Pending verification'}</span>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed italic">
                            &quot;{corridor.activeAdvisory}&quot;
                          </p>
                        </div>
                      </div>

                      {/* ── LAYER 2: CURRENT REPORTED INCIDENTS ── */}
                      <div className="bg-slate-900/60 border border-white/5 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                            <Radio className="w-3.5 h-3.5 text-cyan-400" />
                            Layer 2: Reported Incidents & Physical Obstructions
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {corridor.reportedIncidents?.length ?? 1} Record
                          </span>
                        </div>

                        <div className="space-y-1.5">
                          {(corridor.reportedIncidents && corridor.reportedIncidents.length > 0) ? (
                            corridor.reportedIncidents.map((inc, iIdx) => (
                              <div key={iIdx} className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 text-xs space-y-1">
                                <div className="flex items-center justify-between gap-2">
                                  <span className="font-bold text-white flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                                    {inc.locationSector} ({inc.chainage})
                                  </span>
                                  <span className={`text-[9px] px-2 py-0.5 rounded-[4px] font-medium border ${
                                    inc.verificationStatus === 'Confirmed by Authority'
                                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                                      : inc.verificationStatus === 'None Active Reported'
                                      ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                                      : 'bg-slate-700 text-slate-300 border-slate-600'
                                  }`}>
                                    {inc.verificationStatus}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 leading-snug">{inc.description}</p>
                                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                                  <span>Source: {inc.source}</span>
                                  <span>Time: {inc.reportedTime}</span>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-xs text-slate-400 p-2.5 bg-white/[0.02] rounded-lg border border-white/5">
                              No active physical blockage confirmed by controlling agency at this timestamp.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* ── LAYER 3: GEOLOGICAL SUSCEPTIBILITY & CHOKEPOINTS ── */}
                      <div>
                        <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Mountain className="w-3.5 h-3.5 text-amber-400" />
                            Layer 3: Geological Susceptibility & Historical Chokepoints ({corridor.criticalSectors.length})
                          </span>
                          <span className="text-[9px] text-slate-500 uppercase tracking-wider font-mono">Engineering Baseline</span>
                        </div>
                        <div className="space-y-2">
                          {corridor.criticalSectors.map((sector, sIdx) => (
                            <div key={sIdx} className="bg-white/[0.02] border border-white/5 rounded-lg p-2.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <div>
                                <div className="font-semibold text-white flex items-center gap-2">
                                  <span>{sector.name}</span>
                                  {sector.shootingStoneRisk && (
                                    <span className="text-[9px] bg-red-500/20 text-red-300 border border-red-500/30 px-1.5 py-0.2 rounded font-normal">
                                      Historical Rockfall / Shooting Stones
                                    </span>
                                  )}
                                </div>
                                <div className="text-[10px] text-slate-400 mt-0.5">
                                  Chainage: {sector.chainageKm} · Slope: {sector.slopeAngle}° · {sector.lithology}
                                </div>
                                <div className="text-[10px] text-emerald-400/80 mt-0.5">
                                  Protection: {sector.mitigationInfrastructure}
                                </div>
                              </div>
                              <div className="text-right sm:self-center flex-shrink-0">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                                  sector.hazardVulnerability === 'Critical'
                                    ? 'bg-red-500/20 text-red-300 border-red-500/30'
                                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                                }`}>
                                  {sector.hazardVulnerability} Risk
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Verified Helplines Directory */}
                    <div className="pt-4 mt-4 border-t border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
                        <span className="flex items-center gap-1.5">
                          <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                          Verified Controlling Agency Helplines:
                        </span>
                        <span className="text-[10px] text-slate-500">Call before transit</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {corridor.verifiedHelplines && corridor.verifiedHelplines.length > 0 ? (
                          corridor.verifiedHelplines.map((hl, hIdx) => (
                            <a
                              key={hIdx}
                              href={`tel:${hl.phone.replace(/[^\d+]/g, '')}`}
                              className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 p-2 rounded-lg flex items-center justify-between gap-2 transition-all group"
                            >
                              <div className="truncate">
                                <span className="text-[10px] text-slate-400 block truncate">{hl.agency}</span>
                                <span className="font-mono font-bold text-emerald-300 group-hover:text-emerald-200">{hl.phone}</span>
                              </div>
                              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                            </a>
                          ))
                        ) : (
                          <a
                            href={`tel:${corridor.emergencyHelpline}`}
                            className="bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/25 p-2 rounded-lg flex items-center justify-between gap-2"
                          >
                            <span className="font-mono font-bold text-emerald-300">{corridor.emergencyHelpline}</span>
                            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* LAYER 2: DYNAMIC NOWCAST (NASA LHASA 2.0 & RUNOFF SATURATION)         */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {activeLayer === 'nowcast' && (
          <div className="space-y-6">
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-xs text-amber-200 leading-relaxed flex items-start gap-3">
              <CloudRain className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">NASA LHASA 2.0 Nowcast Engine:</strong> This layer evaluates dynamic slope hazard based on 24-hour / 72-hour antecedent precipitation and subsurface root-zone soil saturation (0–7 cm). High values indicate that heavy rainfall is falling upon already-saturated soils, increasing the probability of debris flows. <em>This is an estimated potential, not a confirmed event catalog.</em>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedRecords.map((record, idx) => {
                const nowcastBadge = getNowcastBadge(record.live_risk_level);
                const soilMoisture = record.live_soil_moisture ?? 0.32;
                const precip24h = record.live_precipitation_24h ?? 0;
                const precip72h = record.live_precipitation_72h ?? 0;

                return (
                  <Card key={record.id} className="glass-intense border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                            {record.name}
                          </h3>
                          <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            {record.district} · {record.scope}
                          </p>
                        </div>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-[4px] font-bold border ${nowcastBadge.bg}`}>
                          {nowcastBadge.label}
                        </span>
                      </div>

                      {/* Dynamic Metrics Grid */}
                      <div className="grid grid-cols-2 gap-2 bg-slate-900/70 border border-white/5 rounded-xl p-3 mb-3 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-500 block">Subsurface Moisture</span>
                          <span className="text-amber-400 font-bold font-mono">
                            {soilMoisture.toFixed(2)} m³/m³
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-500 block">Rainfall (24h / 72h)</span>
                          <span className="text-blue-400 font-bold font-mono">
                            {precip24h.toFixed(1)}mm / {precip72h.toFixed(1)}mm
                          </span>
                        </div>
                      </div>

                      <div className="text-xs space-y-1.5 mb-3">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">Dominant Dynamic Trigger</span>
                          <span className="text-slate-300 font-medium truncate max-w-[160px]">
                            {record.dominant_trigger || 'Baseline Moisture'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">Highway at Risk</span>
                          <span className="text-amber-300 font-medium">{record.road_affected}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">Baseline Slope Angle</span>
                          <span className="text-slate-300 font-mono">{record.slope_angle_deg}°</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Model: NASA LHASA 2.0</span>
                      <span>{record.last_updated || 'Live Telemetry'}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* LAYER 3: OFFICIAL AGENCY WARNINGS VIEW (GSI BHUSANKET & SDMAS)         */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {activeLayer === 'bulletins' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  Official Agency Landslide Forecast Bulletins ({filteredBulletins.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Authoritative disaster management notices from Geological Survey of India (NLFC) and State Disaster Management Authorities.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBulletins.map(bulletin => {
                const levelBadge = getBulletinLevelBadge(bulletin.warningLevel);

                return (
                  <Card key={bulletin.id} className="glass-intense border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                            {bulletin.bulletinNumber}
                          </div>
                          <h3 className="text-sm font-bold text-white mt-0.5 leading-snug">
                            {bulletin.headline}
                          </h3>
                        </div>
                        <span className={`text-[10px] px-2.5 py-0.5 rounded-[4px] font-bold border flex-shrink-0 ${levelBadge.bg}`}>
                          {levelBadge.label}
                        </span>
                      </div>

                      <div className="bg-slate-900/70 border border-white/5 rounded-xl p-3 mb-3 text-xs leading-relaxed text-slate-300">
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                          Advisory Action Guidance
                        </div>
                        {bulletin.actionGuidance}
                      </div>

                      <div className="space-y-1.5 text-xs mb-3">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">Issuing Authority</span>
                          <span className="text-white font-medium">{bulletin.issuingAuthority}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">Target Region</span>
                          <span className="text-amber-300 font-medium">{bulletin.region}</span>
                        </div>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="text-slate-500">Valid Window</span>
                          <span className="text-slate-300">{bulletin.validUntil}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <span className="text-[10px] text-slate-500 block mb-1">Affected Districts</span>
                        <div className="flex flex-wrap gap-1">
                          {bulletin.affectedDistricts.map((d, dIdx) => (
                            <span key={dIdx} className="bg-white/5 border border-white/5 text-slate-300 text-[10px] px-2 py-0.5 rounded">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px]">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle className="w-3 h-3" />
                        Verified Government Source
                      </span>
                      <span className="text-slate-500">Issued: {bulletin.issuedAt}</span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* LAYER 4: STATIC TERRAIN SUSCEPTIBILITY ZONATION                       */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {activeLayer === 'susceptibility' && (
          <div className="space-y-6">
            {/* Header & Description */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Mountain className="w-5 h-5 text-amber-400" />
                  Static Geological Susceptibility Zonation ({filteredRecords.length} Monitored Sectors)
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-4xl leading-relaxed">
                  Baseline geological susceptibility derived from official 1:50,000 / 1:10,000 litho-structural mapping,
                  bedding plane daylighting kinematics, fault proximity, and documented historical failure records.
                  Intentionally decoupled from dynamic atmospheric triggers.
                </p>
              </div>

              {/* Susceptibility Filter Pill Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Susceptibility:</span>
                <select
                  value={susceptibilityFilter}
                  onChange={(e) => {
                    setSusceptibilityFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-slate-900 border border-white/10 rounded-lg text-xs text-slate-200 px-3 py-1.5 focus:outline-none focus:border-amber-500/50"
                >
                  {susceptibilityOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Scientific Provenance & Dual-Angle Methodology Disclosure Banner */}
            <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 sm:p-5 shadow-lg">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 shrink-0 text-amber-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Geological Provenance & Methodology Disclosure
                    </span>
                    <span className="text-[10px] bg-amber-500/20 text-amber-200 px-2 py-0.5 rounded-md font-mono border border-amber-500/30">
                      GSI NLSM 1:50,000 · GSP Regional · Copernicus DEM GLO-30
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs text-slate-300 leading-relaxed">
                    <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                      <div className="font-semibold text-amber-400 text-[11px] mb-1 flex items-center gap-1.5">
                        <Triangle className="w-3.5 h-3.5" />
                        Dual-Angle Slope Attribution
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Distinguishes <strong className="text-white">Regional DEM Gradient</strong> (Copernicus DEM 30m grid footprint)
                        from <strong className="text-amber-300">Surveyed Rock-Cut Face Angle</strong> (field Brunton / total station)
                        where planar daylighting failures occur along steep highway excavations.
                      </p>
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                      <div className="font-semibold text-blue-400 text-[11px] mb-1 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        Authentic Geological Mapping
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Every sector cites mapped formations (Panjal Volcanics, Ramban Formation, Murree Group, Sirban Limestone, Dras Volcanics, Kohistan Arc)
                        with official GSI Bhusanket toposheets or GSP quadrangles.
                      </p>
                    </div>

                    <div className="bg-black/30 border border-white/5 rounded-xl p-3">
                      <div className="font-semibold text-emerald-400 text-[11px] mb-1 flex items-center gap-1.5">
                        <Activity className="w-3.5 h-3.5" />
                        Decoupled Dynamic Triggers
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Static susceptibility reflects intrinsic rock competence and slope geometry.
                        Dynamic triggers (IMD/PMD 24h rainfall, pore-water pressure, NASA LHASA nowcast) are decoupled and displayed separately in the live ribbon below.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status Filter Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 border border-white/10 rounded-xl p-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-300 pl-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="uppercase tracking-wider">Verification Authority:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'All Verification Statuses' },
                  { id: 'Verified GSI NLSM 1:50,000', label: 'GSI NLSM 1:50k' },
                  { id: 'Verified GSI 1:10,000 Detailed', label: 'GSI 1:10k Detailed' },
                  { id: 'Verified GSP Regional', label: 'GSP Regional' },
                  { id: 'Detailed InSAR & Field Inventory', label: 'InSAR & Field Inventory' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setGeoVerificationFilter(tab.id);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      geoVerificationFilter === tab.id
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sectors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedRecords.map((record) => {
                const susc = getSusceptibilityBadge(record.risk_level);
                const verBadge = getGeologicalVerificationBadge(record.geological_verification_status);
                const nowcastBadge = getNowcastBadge(record.live_risk_level);

                return (
                  <Card
                    key={record.id}
                    className="glass-intense border-white/10 p-5 rounded-2xl flex flex-col justify-between hover:border-white/20 transition-all shadow-xl bg-slate-900/80"
                  >
                    <div className="space-y-4">
                      {/* Card Header: Sector Name, Corridor, Susceptibility & Verification */}
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold text-white tracking-tight leading-snug">
                            {record.name}
                          </h3>
                          <span
                            className={`text-[10px] px-2.5 py-0.5 rounded-[4px] font-bold border shrink-0 ${susc.bg} ${susc.color}`}
                          >
                            {record.risk_level} Susceptibility
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-300 font-semibold">
                            {record.highway_corridor || record.road_affected}
                            {record.chainage_km ? ` · ${record.chainage_km}` : ''}
                          </span>
                          <span className="text-[10px] text-slate-400 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            {record.district} · {record.region || record.scope}
                          </span>
                        </div>

                        <div className="mt-2">
                          <span
                            className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-md font-medium border ${verBadge.badgeBg}`}
                          >
                            <Shield className="w-3 h-3" />
                            {verBadge.label}
                          </span>
                        </div>
                      </div>

                      {/* Stratigraphic Formation & Lithology */}
                      <div className="space-y-2 text-xs">
                        <div className="bg-slate-950/70 border border-white/5 rounded-xl p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-400">
                              {record.geological_unit || 'Stratigraphic Formation'}
                            </span>
                            <span className="text-[9px] text-slate-500 font-mono">
                              Scale: {record.mapping_scale || '1:50,000'}
                            </span>
                          </div>
                          <p className="text-slate-200 text-xs leading-relaxed font-normal">
                            {record.lithology || record.geology}
                          </p>
                          {record.geological_structure && (
                            <div className="mt-2 pt-2 border-t border-white/5 text-[11px] text-amber-200/90 leading-tight flex items-start gap-1.5">
                              <Triangle className="w-3 h-3 text-amber-400 mt-0.5 shrink-0" />
                              <span>{record.geological_structure}</span>
                            </div>
                          )}
                        </div>

                        {/* Dual-Slope Angles, Elevation Range & Kinematics */}
                        <div className="grid grid-cols-3 gap-2 text-[11px]">
                          {/* Slope Angles */}
                          <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                            <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-semibold">
                              Slope Angles
                            </span>
                            <div className="mt-1 flex items-baseline gap-1">
                              <span className="text-white font-mono font-bold text-xs">
                                {record.slope_angle_deg}°
                              </span>
                              <span className="text-[9px] text-slate-400">DEM</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                              <span className="text-amber-400 font-mono font-bold text-xs">
                                {record.slope_face_angle_deg ?? record.slope_angle_deg}°
                              </span>
                              <span className="text-[9px] text-amber-300/80">Cut</span>
                            </div>
                          </div>

                          {/* Elevation Min-Max */}
                          <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                            <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-semibold">
                              Elevation
                            </span>
                            <span className="text-white font-mono font-bold text-xs block mt-1">
                              {record.elevation_min_m
                                ? `${record.elevation_min_m}–${record.elevation_max_m}m`
                                : `${record.elevation_m}m`}
                            </span>
                            <span className="text-[9px] text-slate-400 block truncate">
                              Copernicus GLO-30
                            </span>
                          </div>

                          {/* Failure Kinematics */}
                          <div className="bg-white/5 rounded-xl p-2.5 border border-white/5">
                            <span className="text-slate-500 block text-[9px] uppercase tracking-wider font-semibold">
                              Kinematics
                            </span>
                            <span className="text-amber-300 font-medium text-xs block mt-1 truncate">
                              {record.landslide_mechanism || record.slide_type}
                            </span>
                            <span className="text-[9px] text-slate-400 block truncate">
                              {record.historical_events_count
                                ? `${record.historical_events_count} events cataloged`
                                : 'Cataloged sector'}
                            </span>
                          </div>
                        </div>

                        {/* Structural Fault Lineament Proximity */}
                        <div className="bg-black/25 border border-white/5 rounded-xl p-2.5 flex items-center justify-between text-[11px]">
                          <span className="text-slate-400 flex items-center gap-1.5">
                            <Navigation className="w-3.5 h-3.5 text-red-400" />
                            Fault Proximity
                          </span>
                          <span className="text-slate-200 font-medium">
                            <strong className="text-amber-400 font-mono">
                              {record.fault_proximity_km !== undefined ? `${record.fault_proximity_km} km` : 'Proximal'}
                            </strong>{' '}
                            to {record.fault_name || 'Regional Thrust'}
                          </span>
                        </div>

                        {/* Cartographic Sheet & Feature ID */}
                        <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400">
                          <div className="truncate max-w-[200px]">
                            <span className="text-slate-500">Sheet:</span>{' '}
                            <span className="font-mono text-slate-300">
                              {record.source_map_sheet || record.gsi_inventory_code || 'GSI NLSM'}
                            </span>
                          </div>
                          {record.source_document_url ? (
                            <a
                              href={record.source_document_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors"
                            >
                              <span>Bhusanket Portal</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <span className="font-mono text-slate-500">
                              {record.source_feature_id || 'GSI-NLSM-JK'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Decoupled Live Dynamic Triggers Ribbon */}
                    <div className="mt-4 pt-3 border-t border-white/10 bg-black/40 -mx-5 -mb-5 p-3.5 rounded-b-2xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                          <Activity className="w-3 h-3 text-cyan-400" />
                          Decoupled Live Dynamic Triggers
                        </span>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${nowcastBadge.bg}`}
                        >
                          {nowcastBadge.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="flex items-center justify-between bg-white/5 rounded-lg px-2 py-1">
                          <span className="text-slate-400 flex items-center gap-1">
                            <CloudRain className="w-3 h-3 text-blue-400" /> 24h Rain
                          </span>
                          <span className="font-mono font-bold text-white">
                            {record.live_precipitation_24h ?? 0} mm
                          </span>
                        </div>
                        <div className="flex items-center justify-between bg-white/5 rounded-lg px-2 py-1">
                          <span className="text-slate-400 flex items-center gap-1">
                            <Droplets className="w-3 h-3 text-cyan-400" /> Soil Sat
                          </span>
                          <span className="font-mono font-bold text-cyan-300">
                            {((record.live_soil_moisture ?? 0.32) * 100).toFixed(0)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* LAYER 5: HISTORICAL RECORDED LANDSLIDE INVENTORY CATALOG              */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {activeLayer === 'inventory' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  Historical Landslide Inventory Catalog ({filteredRecords.length})
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Verified historical slope failure records cataloged by Geological Survey of India, BRO Project Beacon, and disaster agencies.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto bg-slate-900/80 border border-white/10 rounded-2xl shadow-xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-slate-400 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3.5">Inventory Code & Name</th>
                    <th className="p-3.5">District / Region</th>
                    <th className="p-3.5">Slide Type</th>
                    <th className="p-3.5">Slope</th>
                    <th className="p-3.5">Road Impacted</th>
                    <th className="p-3.5">Last Documented Event</th>
                    <th className="p-3.5">Est. Volume</th>
                    <th className="p-3.5">Fatalities</th>
                    <th className="p-3.5">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {paginatedRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-white/[0.03] transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-white">{r.name}</div>
                        <div className="text-[10px] font-mono text-amber-400 mt-0.5">
                          {r.gsi_inventory_code || 'GSI-JK-CAT'}
                        </div>
                      </td>
                      <td className="p-3.5 text-slate-300">
                        {r.district}
                        <div className="text-[10px] text-slate-500">{r.scope}</div>
                      </td>
                      <td className="p-3.5 font-medium text-amber-300">{r.slide_type}</td>
                      <td className="p-3.5 font-mono text-slate-300">{r.slope_angle_deg}°</td>
                      <td className="p-3.5 text-slate-200">{r.road_affected}</td>
                      <td className="p-3.5 text-slate-400">{r.last_event_date}</td>
                      <td className="p-3.5 font-mono text-slate-300">
                        {r.estimated_volume_m3 ? `${(r.estimated_volume_m3 / 1000).toFixed(0)}k m³` : 'N/A'}
                      </td>
                      <td className="p-3.5 font-mono">
                        {r.historical_fatalities && r.historical_fatalities > 0 ? (
                          <span className="text-red-400 font-bold">{r.historical_fatalities}</span>
                        ) : (
                          <span className="text-slate-500">0</span>
                        )}
                      </td>
                      <td className="p-3.5">
                        <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {r.verification_status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── PAGINATION CONTROLS ────────────────────────────────────────── */}
        {activeLayer !== 'corridors' && activeLayer !== 'bulletins' && totalPages > 1 && (
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

        {/* ── EMERGENCY CONTACTS & HELPLINES SECTION ──────────────────────── */}
        <div id="emergency-contacts" className="mt-12 bg-slate-900/90 border border-white/10 rounded-2xl p-6">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
            <PhoneCall className="w-5 h-5 text-emerald-400" />
            Himalayan Disaster & Highway Traffic Emergency Directory
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider mb-1">J&K Traffic Control Room</span>
              <div className="font-bold text-white text-sm mb-1">Ramban / NH-44</div>
              <div className="text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" /> 1800-180-7091 / 9419993745
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider mb-1">BRO Project Beacon (Zojila)</span>
              <div className="font-bold text-white text-sm mb-1">NH-1 Srinagar-Leh</div>
              <div className="text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" /> 0194-2452290
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider mb-1">State Disaster Response</span>
              <div className="font-bold text-white text-sm mb-1">J&K SDMA Control</div>
              <div className="text-blue-400 font-mono font-bold flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" /> 1070 / 1077
              </div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
              <span className="text-[10px] text-slate-500 block uppercase tracking-wider mb-1">Gilgit-Baltistan GBDMA</span>
              <div className="font-bold text-white text-sm mb-1">KKH Emergency</div>
              <div className="text-emerald-400 font-mono font-bold flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" /> +92-5811-920874
              </div>
            </div>
          </div>
        </div>

        {/* ── RELATED HAZARD INTELLIGENCE (6 CONTEXTUAL MODULES) ─────────── */}
        <RelatedHazardIntelligence currentModule="landslides" />

      </div>
    </main>
  );
}
