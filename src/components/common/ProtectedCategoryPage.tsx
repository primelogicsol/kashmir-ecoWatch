'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import * as Icons from 'lucide-react';
import {
  MapPin, Activity, ArrowRight, Search,
  Grid3X3, List, Map, TrendingUp, ChevronLeft, ChevronRight, Compass, Shield
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { GlobalFilterBar } from '@/components/common/GlobalFilterBar';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { ModuleScopeRow, DEFAULT_SCOPE_PILL_MAP } from '@/components/common/ModuleScopeRow';
import { GEOGRAPHY, getScopeForUnit, Scope } from '@/data/geography';
import { useGlobalFilter } from '@/context/GlobalFilterContext';
import Link from 'next/link';

const PROTECTED_SHOWCASE_PRESETS: Record<string, { id: string; title: string; subtitle: string; location: string; tag: string; src: string }[]> = {
    national_park: [
    { id: '1', title: 'Dachigam National Park', subtitle: 'Prime Hangul Sanctuary & Upper Forest', location: 'Srinagar · 141 km²', tag: 'National Park', src: '/images/protected-network.png' },
    { id: '2', title: 'Kazinag National Park', subtitle: 'Markhor & Musk Deer Range', location: 'Baramulla · 160 km²', tag: 'Western Caprinae', src: '/images/markhor.png' },
    { id: '3', title: 'Hemis High Altitude NP', subtitle: 'Global Snow Leopard Density Capital', location: 'Leh, Ladakh · 4,400 km²', tag: 'Trans-Himalayan', src: '/images/protected-network.png' },
    { id: '4', title: 'Deosai National Park', subtitle: 'Himalayan Brown Bear Sanctuary', location: 'Skardu / Astore · 3,584 km²', tag: 'Alpine Tundra', src: '/images/bear.png' },
  ],
  wildlife_sanctuary: [
    { id: '1', title: 'Overa-Aru Sanctuary', subtitle: 'Pahalgam Alpine & Hanging Valley', location: 'Anantnag · 511 km²', tag: 'Sanctuary', src: '/images/protected-network.png' },
    { id: '2', title: 'Gulmarg Wildlife Sanctuary', subtitle: 'Apharwat Altitudinal Transect', location: 'Baramulla · 180 km²', tag: 'Alpine Biome', src: '/images/bear.png' },
    { id: '3', title: 'Hirpora Wildlife Sanctuary', subtitle: 'Pir Panjal Markhor Highway', location: 'Shopian · 341 km²', tag: 'Corridor Node', src: '/images/markhor.png' },
    { id: '4', title: 'Limber Wildlife Sanctuary', subtitle: 'Langate-Kazinag Buffer Matrix', location: 'Baramulla · 26 km²', tag: 'Conifer Forest', src: '/images/tiger.png' },
  ],
  wetland_reserve: [
    { id: '1', title: 'Hokersar Ramsar Wetland', subtitle: 'Central Asian Flyway Haven', location: 'Budgam / Srinagar · 13.75 km²', tag: 'Ramsar Wetland', src: '/images/protected-network.png' },
    { id: '2', title: 'Shallabugh Wetland Reserve', subtitle: 'Deltaic Marshes & Waterfowl Refuge', location: 'Ganderbal · 16 km²', tag: 'Ramsar Site', src: '/images/bear.png' },
    { id: '3', title: 'Hygam Wetland Reserve', subtitle: 'Flood Basin & Reed Beds', location: 'Baramulla · 7.25 km²', tag: 'Ramsar Basin', src: '/images/markhor.png' },
    { id: '4', title: 'Mirgund Wetland Reserve', subtitle: 'Seasonal Shallower Waterfowl Stop', location: 'Baramulla · 4.0 km²', tag: 'Flyway Rest', src: '/images/tiger.png' },
  ],
  conservation_reserve: [
    { id: '1', title: 'Shikargah Tral Reserve', subtitle: 'Hangul Dispersal Corridor', location: 'Pulwama · 15.5 km²', tag: 'Conservation Reserve', src: '/images/protected-network.png' },
    { id: '2', title: 'Khiram Conservation Reserve', subtitle: 'Overa Foothill Forest Matrix', location: 'Anantnag · 15.7 km²', tag: 'Oak & Pine', src: '/images/bear.png' },
    { id: '3', title: 'Wangath Conservation Reserve', subtitle: 'Sindh Valley Riparian Buffer', location: 'Ganderbal · 12 km²', tag: 'Valley Corridor', src: '/images/markhor.png' },
    { id: '4', title: 'Pani-Wah / Bren Reserve', subtitle: 'Dachigam Buffer Zone', location: 'Srinagar · 8.2 km²', tag: 'Community Edge', src: '/images/tiger.png' },
  ],
  bird_and_habitat_area: [
    { id: '1', title: 'Wular Lake IBA', subtitle: 'Largest Freshwater Basin IBA', location: 'Bandipora · 189 km²', tag: 'Key Bird Area', src: '/images/protected-network.png' },
    { id: '2', title: 'Dachigam-Harwan IBA', subtitle: 'Endemic Flycatcher & Monal Zone', location: 'Srinagar · 141 km²', tag: 'Himalayan IBA', src: '/images/bear.png' },
    { id: '3', title: 'Overa-Aru IBA', subtitle: 'Subalpine & Alpine Birding Corridor', location: 'Anantnag · 511 km²', tag: 'High-Altitude IBA', src: '/images/markhor.png' },
    { id: '4', title: 'Hokersar Avian Sanctuary', subtitle: 'Half-Million Wintering Migrants', location: 'Srinagar · 13.75 km²', tag: 'Ramsar IBA', src: '/images/tiger.png' },
  ],
};

interface ProtectedArea {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  area: number;
  district: string;
  established: number;
  ecosystems: string[];
  keySpecies: string[];
}

interface ProtectedCategoryPageProps {
  title: string | React.ReactNode;
  subtitle: string;
  icon: keyof typeof import('lucide-react');
  color: string;
  areas: ProtectedArea[];
  metrics: Array<{ label: string; value: number | string; icon: keyof typeof import('lucide-react') }>;
  sourceData?: {
    title: string;
    count: number;
    totalArea: number;
  };
}

export function ProtectedCategoryPage({
  title,
  subtitle,
  icon: iconName,
  color,
  areas,
  metrics,
  sourceData,
}: ProtectedCategoryPageProps) {
  const Icon = (Icons as any)[iconName] || Icons.MapPin;
  const router = useRouter();

  // ── Global filter (shared across all modules) ──
  const {
    filter: globalFilter,
    setScope: setGlobalScope,
    setDistrict: setGlobalDistrict,
    setSearchQuery: setGlobalSearchQuery,
    resetFilter: resetGlobalFilter,
  } = useGlobalFilter();

  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 12;

  // Derive available districts from the actual data for the current scope (data-driven, Bug #4 fix)
  const availableDistricts = React.useMemo(() => {
    const scopeAreas = globalFilter.scope === 'All'
      ? areas
      : areas.filter(a => {
          const derived = getScopeForUnit(a.district);
          const resolved = (derived === 'All' && (a as any).scope) ? (a as any).scope : derived;
          return resolved === globalFilter.scope;
        });
    const parts = new Set<string>();
    scopeAreas.forEach(a =>
      a.district.split('/').forEach(d => parts.add(d.trim()))
    );
    return Array.from(parts).sort();
  }, [areas, globalFilter.scope]);

  const availableScopes = [...GEOGRAPHY.scopes];

  const filteredAreas = React.useMemo(() => {
    const query = globalFilter.searchQuery.toLowerCase().trim();
    const selectedEcologicalScope = globalFilter.scope;
    const selectedDistrict = globalFilter.district;

    return areas.filter(area => {
      const matchesSearch = !query ||
        area.name.toLowerCase().includes(query) ||
        area.district.toLowerCase().includes(query) ||
        area.description.toLowerCase().includes(query) ||
        (area as any).flagshipSpecies?.toLowerCase().includes(query);

      // Bug #2 & #6 fix: prefer area.scope when getScopeForUnit returns 'All' (unrecognised district)
      const derived = getScopeForUnit(area.district);
      const areaScope = (derived === 'All' && (area as any).scope) ? (area as any).scope : derived;
      const matchesScope = selectedEcologicalScope === 'All' || areaScope === selectedEcologicalScope;

      // Bug #5 fix: split slash-delimited district strings before comparing
      const matchesDistrict = selectedDistrict === 'All' ||
        area.district.split('/').map(d => d.trim()).includes(selectedDistrict);

      return matchesSearch && matchesDistrict && matchesScope;
    });
  }, [areas, globalFilter]);

  // Count of areas belonging to the active scope only (ignores district & search)
  // — used for the Scope KPI pill which describes the scope, not the filter result
  const scopeCount = React.useMemo(() => {
    if (globalFilter.scope === 'All') return 0;
    return areas.filter(area => {
      const derived = getScopeForUnit(area.district);
      const areaScope = (derived === 'All' && (area as any).scope) ? (area as any).scope : derived;
      return areaScope === globalFilter.scope;
    }).length;
  }, [areas, globalFilter.scope]);

  // Label config per scope
  const SCOPE_KPI: Record<string, { label: string; color: string; iconColor: string; bg: string; border: string }> = {
    'Kashmir Core': {
      label: 'Kashmir Core Protected Areas',
      color: 'text-emerald-300',
      iconColor: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/25',
    },
    'Trans-Divisional': {
      label: 'Trans-Divisional Protected Areas',
      color: 'text-blue-300',
      iconColor: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/25',
    },
    'Transboundary / Extended': {
      label: 'Transboundary Protected Areas',
      color: 'text-amber-300',
      iconColor: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/25',
    },
  };

  const [activeHeroIdx, setActiveHeroIdx] = React.useState(0);

  const categoryKey = areas[0]?.category || 'national_park';
  const showcaseList = PROTECTED_SHOWCASE_PRESETS[categoryKey] || PROTECTED_SHOWCASE_PRESETS.national_park;
  const currentHero = showcaseList[activeHeroIdx] || showcaseList[0];

  const heroShowcaseCard = (
    <div className="relative rounded-2xl overflow-hidden border border-emerald-500/40 shadow-2xl shadow-emerald-950/60 bg-slate-900/80 backdrop-blur-md p-3">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between px-1 py-1 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">
            Protected Area Sentinel
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">
          Active 2026
        </span>
      </div>

      {/* Main Image Viewport */}
      <div className="relative h-56 sm:h-64 w-full rounded-xl overflow-hidden border border-white/10 group">
        <img
          key={currentHero.id}
          src={currentHero.src}
          alt={currentHero.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        {/* Captions */}
        <div className="absolute bottom-2.5 left-3 right-3">
          <div className="flex items-center justify-between gap-2 mb-1">
            <h4 className="text-sm font-bold text-white drop-shadow-md">{currentHero.title}</h4>
            <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold flex-shrink-0">
              {currentHero.tag}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="italic text-emerald-300 font-medium">{currentHero.subtitle}</span>
            <span className="text-slate-400 text-[10px]">{currentHero.location}</span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Thumbnail Buttons */}
      <div className="grid grid-cols-4 gap-1.5 mt-2.5">
        {showcaseList.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveHeroIdx(idx)}
            className={`relative rounded-lg overflow-hidden border text-left p-1 transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeHeroIdx === idx
                ? 'border-emerald-400 ring-2 ring-emerald-400/40 bg-emerald-500/10 shadow-md'
                : 'border-white/10 bg-slate-800/60 hover:border-emerald-500/30 hover:bg-slate-800'
            }`}
          >
            <div className="h-10 w-full rounded overflow-hidden relative">
              <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <span className="text-[9px] font-bold text-slate-300 truncate w-full text-center">
              {item.title.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={
          typeof title === 'string' ? (
            <div className="overflow-visible pb-2">
              <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
                <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                  KEW
                </span>
                <span className="text-white">Western Himalayan</span>
              </div>
              <div className="leading-[1.15] overflow-visible pr-8">
                <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
                  {title}
                </span>
              </div>
            </div>
          ) : (
            title
          )
        }
        subtitle={subtitle}
        icon={<Icon className={`w-6 h-6 ${color.includes('emerald') ? 'text-emerald-400' : 'text-slate-400'}`} />}
        label="KEW Protected Network · Conservation Domain"
        gridOverlay
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        rightContent={heroShowcaseCard}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/protected-network/atlas">
              <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold transition-all shadow-md shadow-emerald-500/20">
                <Icons.Compass className="w-4 h-4 mr-1.5" />
                GIS Interactive Atlas
              </Button>
            </Link>
            <Link href="/protected-network">
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold transition-all">
                <Icons.Shield className="w-4 h-4 mr-1.5" />
                Network Overview
              </Button>
            </Link>
            <Link href="/protected-network/corridors-and-connectivity">
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold transition-all">
                <Icons.Map className="w-4 h-4 mr-1.5" />
                Corridors &amp; Linkages
              </Button>
            </Link>
          </div>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K PROTECTED NETWORK SENTINEL    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 relative z-20 mt-4 mb-4">
        <div className="bg-gradient-to-r from-slate-900/95 via-emerald-950/70 to-slate-900/95 border border-emerald-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-emerald-400">Trans-Himalayan Wildlife Corridor &amp; Reserve Sentinel</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Monitoring 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Core Conservation Landscapes: <strong className="text-white">Dachigam Hangul Sanctuary</strong>, <strong className="text-white">Kazinag Markhor Corridor</strong>, <strong className="text-white">Hokersar Ramsar Basin</strong>, <strong className="text-white">Overa-Aru Reserve</strong>, and <strong className="text-white">Hemis High-Altitude Network</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Total Classified Reserves</div>
              <div className="text-sm font-bold text-emerald-300">{areas.length} Verified Sites</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
              {filteredAreas.length} Filtered
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 8-CARD INTERACTIVE KPI STRIP (ZERO OVERLAP)                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-6 relative z-20">
        <div className="glass-intense border-white/10 p-3 sm:p-4 lg:p-5 rounded-2xl shadow-xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {metrics.map((kpi, idx) => {
              const KpiIcon = (Icons as any)[kpi.icon] || Icons.Shield;
              return (
                <div key={idx} className="py-2.5 px-2 rounded-xl text-center min-w-0 bg-white/5 border border-white/5 shadow-inner">
                  <KpiIcon className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                  <div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                    {typeof kpi.value === 'number' ? kpi.value.toLocaleString() : kpi.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-wide mt-0.5 leading-tight break-words">
                    {kpi.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Global Filter Bar ─────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar />
      </div>

      {/* ── Scope tabs + results action row ────────────────────────────────── */}
      <ModuleScopeRow
        filteredCount={filteredAreas.length}
        totalCount={areas.length}
        entityLabel="protected areas"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP('Protected Areas')}
        scopeCount={scopeCount}
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* Content — pinned to z-0 so it never overlaps filter bar dropdown */}
      <div className="container mx-auto px-6 py-8 space-y-6 relative z-0">

        {/* Protected Areas Grid/List */}
        {filteredAreas.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredAreas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((area, index) => (
              <motion.a
                key={area.id}
                href={`/protected-network/${area.category === 'national_park' ? 'national-parks' : area.category === 'wildlife_sanctuary' ? 'wildlife-sanctuaries' : area.category === 'wetland_reserve' ? 'wetland-reserves' : area.category === 'conservation_reserve' ? 'conservation-reserves' : 'bird-and-habitat-areas'}/${area.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${viewMode === 'grid' ? 'h-full' : ''} block group`}
              >
                <Card className="h-full flex flex-col overflow-hidden card-intelligence border border-white/5 bg-slate-900/60 hover:border-emerald-500/30 transition-all shadow-lg" padding="none">
                  {/* Card Header with Real Photography & Gradient Scrim */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                    <img
                      src={(area as any).imageUrl || (area.category === 'national_park' ? '/images/protected-network.png' : area.category === 'wildlife_sanctuary' ? '/images/bear.png' : area.category === 'wetland_reserve' ? '/images/tiger.png' : '/images/markhor.png')}
                      alt={area.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                    
                    {/* Top overlay badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-1">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="info" size="sm" className="capitalize bg-slate-900/80 backdrop-blur-md border border-white/10 text-[10px]">
                          {area.category.replace('_', ' ')}
                        </Badge>
                        {(area as any).scope && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-md border ${
                            (area as any).scope === 'Kashmir Core' 
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                              : (area as any).scope === 'Trans-Divisional'
                              ? 'bg-sky-500/20 text-sky-300 border-sky-500/30'
                              : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          }`}>
                            {(area as any).scope}
                          </span>
                        )}
                      </div>
                      {((area as any).latitude && (area as any).longitude) && (
                        <span className="text-[10px] font-mono text-slate-300 bg-slate-950/80 px-2 py-0.5 rounded border border-white/10 shrink-0">
                          {(area as any).latitude.toFixed(2)}°N, {(area as any).longitude.toFixed(2)}°E
                        </span>
                      )}
                    </div>

                    {/* Bottom overlay with title and status tags */}
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        {(area as any).established && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/70 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                            Est. {(area as any).established}
                          </span>
                        )}
                        {(area as any).iucn_category && (
                          <span className="text-[10px] font-semibold text-slate-300 bg-white/10 px-1.5 py-0.5 rounded border border-white/10">
                            {(area as any).iucn_category}
                          </span>
                        )}
                        {(area as any).legalStatus && (area as any).legalStatus !== 'Verified' && (
                          <Badge variant="warning" size="sm" className="text-[10px]">{(area as any).legalStatus}</Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors drop-shadow-md">
                        {area.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <p className="text-xs sm:text-sm text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                      {area.description}
                    </p>

                    {/* 3-metric quick stats box */}
                    <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-white/5 border border-white/5 mb-3 text-xs">
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Area</div>
                        <div className="text-white font-bold">{area.area > 0 ? `${area.area} km²` : 'TBC'}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">District</div>
                        <div className="text-white font-bold truncate">{area.district}</div>
                      </div>
                      <div>
                        <div className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Elevation</div>
                        <div className="text-emerald-400 font-bold truncate">{(area as any).altitudeRange || `${(area as any).elevation_min_m || 1500}m+`}</div>
                      </div>
                    </div>

                    {/* Flagship Species Highlight */}
                    {(area as any).flagshipSpecies && (
                      <div className="mb-2.5 flex items-center gap-2 text-xs">
                        <span className="text-[10px] text-slate-400 uppercase font-semibold shrink-0">Flagship:</span>
                        <span className="text-emerald-300 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md truncate">
                          {(area as any).flagshipSpecies}
                        </span>
                      </div>
                    )}

                    {/* Key Taxa Recorded Pills */}
                    {area.keySpecies && area.keySpecies.length > 0 && (
                      <div className="mb-2.5">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1 font-semibold">Key Species</div>
                        <div className="flex flex-wrap gap-1">
                          {area.keySpecies.slice(0, 3).map((sp, idx) => (
                            <span key={idx} className="text-[10px] text-slate-300 bg-slate-800/80 border border-slate-700/60 px-1.5 py-0.5 rounded">
                              {sp}
                            </span>
                          ))}
                          {area.keySpecies.length > 3 && (
                            <span className="text-[10px] text-slate-400 self-center px-1 font-medium">
                              +{area.keySpecies.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Hydrological system / river catchment */}
                    {(area as any).hydrological_system && (
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mb-2 truncate">
                        <Icons.Droplet className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="truncate">{(area as any).hydrological_system}</span>
                      </div>
                    )}

                    <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Icons.MapPin className="w-3.5 h-3.5 text-emerald-400" />
                        {area.district}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 group-hover:bg-emerald-500 transition-colors text-xs font-semibold text-white">
                        Explore Park
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.a>
            ))}

            {filteredAreas.length > itemsPerPage && (
              <div className="flex flex-col items-center justify-center gap-4 mt-12 w-full col-span-full">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  
                  <div className="flex items-center gap-1 mx-2">
                    {Array.from({ length: Math.ceil(filteredAreas.length / itemsPerPage) }).map((_, i) => {
                      const page = i + 1;
                      const totalPages = Math.ceil(filteredAreas.length / itemsPerPage);
                      
                      if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-emerald-500 text-white'
                                : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                      
                      if (page === currentPage - 2 || page === currentPage + 2) {
                        return <span key={page} className="text-slate-600 px-1">...</span>;
                      }
                      
                      return null;
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredAreas.length / itemsPerPage)))}
                    disabled={currentPage === Math.ceil(filteredAreas.length / itemsPerPage)}
                    className="border-white/10 text-slate-400 hover:text-white hover:bg-white/5"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-xs text-slate-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredAreas.length)} of {filteredAreas.length} records
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-24">
            <Shield className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No protected areas found</h3>
            <p className="text-slate-400 mb-4">Try adjusting your filters</p>
            <Button
              variant="outline"
              className="border-white/20 text-white"
              onClick={() => {
                resetGlobalFilter();
                setCurrentPage(1);
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Source Information */}
      {sourceData && (
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass-light border-white/10 p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-emerald-500 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Source Data</h3>
                  <p className="text-slate-400 text-sm mb-3">{sourceData.title}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Total Records:</span>{' '}
                      <span className="text-white font-medium">{sourceData.count}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Total Area:</span>{' '}
                      <span className="text-white font-medium">{sourceData.totalArea.toFixed(2)} kmÂ²</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      
    </main>
  );
}
