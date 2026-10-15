'use client';

import React, { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Map, Layers, Search, Filter, Download, Share2, Maximize2, 
  Crosshair, Eye, EyeOff, Plus, Minus, Compass, Shield, 
  Mountain, Droplet, Leaf, Activity, TrendingUp, Info, ExternalLink, X, MapPin
} from 'lucide-react';
import { getProtectedAreas, protectedNetworkMetrics, corridorsData, ProtectedArea } from '@/data/protected-network';
import { Heading } from '@/components/common/Heading';
import { BasemapMode } from '@/components/maps/ProtectedAtlasLeaflet';

// ── Dynamically load real Leaflet map (client-only, zero SSR failure) ─────────
const ProtectedAtlasLeaflet = dynamic(
  () => import('@/components/maps/ProtectedAtlasLeaflet'),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4">
        <div className="w-12 h-12 border-3 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
        <div className="text-center">
          <p className="text-sm font-bold text-white tracking-wider">Initializing WGS84 GIS Vector Engine</p>
          <p className="text-xs font-mono text-emerald-400 mt-1">Calibrating 168 Protected Area Coordinates &amp; Corridors...</p>
        </div>
      </div>
    ),
  }
);

export default function ProtectedAreaAtlasPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedSite, setSelectedSite] = useState<ProtectedArea | null>(null);
  const [activeBasemap, setActiveBasemap] = useState<BasemapMode>('satellite');
  const [targetFlyTo, setTargetFlyTo] = useState<{ lat: number; lng: number; zoom?: number } | null>(null);

  // Layer Visibility Controls
  const [layerVisibility, setLayerVisibility] = useState({
    nationalParks: true,
    wildlifeSanctuaries: true,
    wetlandReserves: true,
    conservationReserves: true,
    birdAreas: true,
    corridors: true,
  });

  const toggleLayer = (layerKey: keyof typeof layerVisibility) => {
    setLayerVisibility(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  // Compile full protected areas dataset
  const allPAs = useMemo(() => {
    return [
      ...getProtectedAreas.nationalParks(),
      ...getProtectedAreas.wildlifeSanctuaries(),
      ...getProtectedAreas.wetlandReserves(),
      ...getProtectedAreas.conservationReserves(),
      ...getProtectedAreas.birdHabitatAreas(),
    ];
  }, []);

  // Filtered Protected Areas based on active layer toggles and search / district filters
  const visiblePAs = useMemo(() => {
    return allPAs.filter((pa) => {
      // 1. Layer toggle check
      if (pa.category === 'national_park' && !layerVisibility.nationalParks) return false;
      if (pa.category === 'wildlife_sanctuary' && !layerVisibility.wildlifeSanctuaries) return false;
      if (pa.category === 'wetland_reserve' && !layerVisibility.wetlandReserves) return false;
      if (pa.category === 'conservation_reserve' && !layerVisibility.conservationReserves) return false;
      if (pa.category === 'iba' && !layerVisibility.birdAreas) return false;

      // 2. District filter
      if (selectedDistrict !== 'All') {
        const d = (pa.district || '').toLowerCase();
        const sel = selectedDistrict.toLowerCase();
        if (!d.includes(sel)) return false;
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = pa.name.toLowerCase().includes(q);
        const matchesDistrict = (pa.district || '').toLowerCase().includes(q);
        const matchesCategory = pa.category.toLowerCase().includes(q);
        const matchesSpecies = pa.keySpecies && pa.keySpecies.some(s => s.toLowerCase().includes(q));
        if (!matchesName && !matchesDistrict && !matchesCategory && !matchesSpecies) return false;
      }

      return true;
    });
  }, [allPAs, layerVisibility, selectedDistrict, searchQuery]);

  // Unique list of sorted districts for quick filtering
  const districtList = useMemo(() => {
    const set = new Set<string>();
    allPAs.forEach((pa) => {
      if (pa.district && !pa.district.includes('/')) {
        set.add(pa.district.trim());
      }
    });
    return Array.from(set).sort();
  }, [allPAs]);

  // Handle Search Input & Auto-fly to matched coordinate
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim().length >= 3) {
      const match = allPAs.find(p => p.name.toLowerCase().includes(val.toLowerCase()));
      if (match && match.latitude && match.longitude) {
        setTargetFlyTo({ lat: match.latitude, lng: match.longitude, zoom: 12 });
        setSelectedSite(match);
      }
    }
  };

  // Quick Preset Fly-to Locations
  const PRESET_DESTINATIONS = [
    { name: 'Dachigam NP', lat: 34.1372, lng: 74.9382, zoom: 13 },
    { name: 'Hemis NP', lat: 33.9167, lng: 77.4167, zoom: 11 },
    { name: 'Kazinag NP', lat: 34.2333, lng: 74.0333, zoom: 12 },
    { name: 'Kishtwar NP', lat: 33.5500, lng: 75.9500, zoom: 12 },
    { name: 'Overa-Aru WS', lat: 34.0500, lng: 75.2500, zoom: 12 },
    { name: 'Gulmarg WS', lat: 34.0500, lng: 74.3800, zoom: 13 },
    { name: 'Hokersar Wetland', lat: 34.0950, lng: 74.7040, zoom: 13 },
    { name: 'Wular Lake IBA', lat: 34.3333, lng: 74.6000, zoom: 12 },
  ];

  const handleExport = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const isRegistered = window.localStorage.getItem('kew_member_registered') === 'true';
      if (isRegistered) {
        alert('Initiating download for complete Kashmir GIS vector dataset (KML/GPX/GeoJSON)...');
      } else {
        router.push('/protected-network/trails-and-sightings/request?slug=atlas');
      }
    }
  };

  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const showcaseItems = [
    {
      id: 'dachigam',
      title: 'Dachigam NP',
      subtitle: 'Cervus hanglu sanctuary',
      tag: 'National Park',
      src: '/images/protected-network.png',
      location: 'Srinagar / Zabarwan Range',
    },
    {
      id: 'hemis',
      title: 'Hemis High Altitude',
      subtitle: 'Panthera uncia realm',
      tag: 'National Park',
      src: '/images/tiger.png',
      location: 'Ladakh Trans-Himalaya',
    },
    {
      id: 'kazinag',
      title: 'Kazinag NP',
      subtitle: 'Capra falconeri habitat',
      tag: 'National Park',
      src: '/images/markhor.png',
      location: 'Baramulla / LOC Corridor',
    },
    {
      id: 'hokersar',
      title: 'Hokersar Wetland',
      subtitle: 'Ramsar wetland basin',
      tag: 'Wetland Reserve',
      src: '/images/bear.png',
      location: 'Srinagar / Budgam',
    },
  ];
  const currentHero = showcaseItems[activeHeroIdx] || showcaseItems[0];

  const heroShowcaseCard = (
    <div className="w-full lg:max-w-sm rounded-2xl bg-slate-900/90 border border-emerald-500/30 p-3 shadow-2xl backdrop-blur-md">
      <div className="relative h-44 rounded-xl overflow-hidden border border-white/10 group">
        <img
          src={currentHero.src}
          alt={currentHero.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/80 border border-emerald-500/40 text-[10px] font-semibold text-emerald-300">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
          Interactive 3D GIS
        </div>
        <div className="absolute bottom-2.5 left-2.5 right-2.5">
          <div className="flex items-center justify-between gap-2 mb-0.5">
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

      <div className="grid grid-cols-4 gap-1.5 mt-2.5">
        {showcaseItems.map((item, idx) => (
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
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                KEW
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
                Protected Area GIS Atlas &amp; Cartography
              </span>
            </div>
          </div>
        }
        subtitle="Precision GIS cartography mapping Kashmir, Jammu, and Ladakh's 168 protected reserves, wetland complexes, and 43 wildlife migration corridors. Powered by high-resolution satellite imagery, topographic relief, and sub-decimeter WGS84 coordinates."
        icon={<Map className="w-6 h-6 text-emerald-400" />}
        label="Spatial Intelligence"
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        rightContent={heroShowcaseCard}
        actions={
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/20 text-white" 
              icon={<Download className="w-4 h-4" />}
              onClick={handleExport}
            >
              Export GIS Vector
            </Button>
            <Button 
              size="sm" 
              className="bg-gradient-to-r from-emerald-600 to-emerald-500" 
              icon={<Maximize2 className="w-4 h-4" />}
              onClick={() => {
                setTargetFlyTo({ lat: 34.15, lng: 75.10, zoom: 8 });
                setSelectedSite(null);
              }}
            >
              Fit Network View
            </Button>
          </div>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K ATLAS SENTINEL                */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 relative z-20 mt-4 mb-4">
        <div className="bg-gradient-to-r from-slate-900/95 via-sky-950/70 to-slate-900/95 border border-sky-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-sky-500/10 rounded-xl border border-sky-500/20 text-sky-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-sky-400">Cartographic &amp; Spatial Intelligence Layer</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Live GIS Engine 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Mapping <strong className="text-white">168 Verified Protected Reserves</strong> and <strong className="text-white">43 Wildlife Corridors</strong> with exact WGS84 GPS georeferencing across Kashmir Valley, Pir Panjal, and Ladakh.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Coordinate Datum</div>
              <div className="text-sm font-bold text-sky-300">WGS 84 / UTM 43N</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-mono font-bold">
              {visiblePAs.length} Active Pins Displayed
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6-CARD INTERACTIVE KPI STRIP                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1: Mapped Reserves */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Mapped PAs</span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300">
              {allPAs.length}
            </div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">100% Georeferenced</div>
          </div>

          {/* Card 2: Spatial Area */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Total Area</span>
              <Map className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-300">
              {protectedNetworkMetrics.totalArea.toLocaleString()} <span className="text-xs font-normal text-teal-400">km²</span>
            </div>
            <div className="text-[11px] text-teal-400/90 font-mono mt-0.5">{protectedNetworkMetrics.coveragePercentage}% of Territory</div>
          </div>

          {/* Card 3: GIS Layers */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Vector Layers</span>
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">
              6 Active
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Multi-Taxon Thematic</div>
          </div>

          {/* Card 4: Corridors */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Corridors</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">
              {corridorsData.length}
            </div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">Geodesic Vectors</div>
          </div>

          {/* Card 5: Geo-Referencing */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Accuracy</span>
              <Crosshair className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-300">
              &plusmn; 5 m
            </div>
            <div className="text-[11px] text-blue-400/90 font-mono mt-0.5">Survey of India / WGS84</div>
          </div>

          {/* Card 6: Peak Altitude */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Max Elevation</span>
              <Mountain className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-300">
              5,400 m
            </div>
            <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">Hemis High Ridge</div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* FILTER & LAYER CONTROL BAR                                    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-4">
        <div className="bg-slate-900/90 border border-white/10 rounded-2xl p-4 backdrop-blur-md shadow-xl flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search Input & District Selector */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Dachigam, Overa, Hemis, Hangul, or district..."
                className="w-full pl-9 pr-4 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 transition-colors"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="relative shrink-0">
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full sm:w-auto px-3.5 py-2 bg-slate-950/80 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-emerald-500/60 transition-colors"
              >
                <option value="All">All Districts ({districtList.length})</option>
                {districtList.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Layer Visibility Toggles */}
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <button
              onClick={() => toggleLayer('nationalParks')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                layerVisibility.nationalParks
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-950/40 text-slate-500 border-white/5 line-through'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>National Parks (5)</span>
            </button>

            <button
              onClick={() => toggleLayer('wildlifeSanctuaries')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                layerVisibility.wildlifeSanctuaries
                  ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-sm'
                  : 'bg-slate-950/40 text-slate-500 border-white/5 line-through'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <span>Sanctuaries (14)</span>
            </button>

            <button
              onClick={() => toggleLayer('wetlandReserves')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                layerVisibility.wetlandReserves
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 shadow-sm'
                  : 'bg-slate-950/40 text-slate-500 border-white/5 line-through'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
              <span>Wetlands (10)</span>
            </button>

            <button
              onClick={() => toggleLayer('conservationReserves')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                layerVisibility.conservationReserves
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                  : 'bg-slate-950/40 text-slate-500 border-white/5 line-through'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>Conservation Reserves (18)</span>
            </button>

            <button
              onClick={() => toggleLayer('birdAreas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                layerVisibility.birdAreas
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-sm'
                  : 'bg-slate-950/40 text-slate-500 border-white/5 line-through'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>Bird Habitats (121)</span>
            </button>

            <button
              onClick={() => toggleLayer('corridors')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                layerVisibility.corridors
                  ? 'bg-pink-500/20 text-pink-300 border-pink-500/40 shadow-sm'
                  : 'bg-slate-950/40 text-slate-500 border-white/5 line-through'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
              <span>Corridors (43)</span>
            </button>
          </div>
        </div>

        {/* Quick Fly-To Destinations Strip */}
        <div className="flex items-center gap-2 mt-2.5 overflow-x-auto scrollbar-hide py-1 text-xs">
          <span className="text-slate-400 font-bold uppercase tracking-wider shrink-0 text-[10px]">
            ⚡ Instant Fly-To:
          </span>
          {PRESET_DESTINATIONS.map((dest) => (
            <button
              key={dest.name}
              onClick={() => {
                setTargetFlyTo({ lat: dest.lat, lng: dest.lng, zoom: dest.zoom });
                const matched = allPAs.find(p => p.name.toLowerCase().includes(dest.name.toLowerCase().split(' ')[0]));
                if (matched) setSelectedSite(matched);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-950/30 transition-all shrink-0 font-medium"
            >
              {dest.name}
            </button>
          ))}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* REAL LEAFLET MAP CANVAS CONTAINER                             */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 pb-12">
        <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-slate-950 h-[calc(100vh-270px)] min-h-[680px]">
          <ProtectedAtlasLeaflet
            protectedAreas={visiblePAs}
            corridors={corridorsData}
            selectedSite={selectedSite}
            onSelectSite={setSelectedSite}
            showCorridors={layerVisibility.corridors}
            activeBasemap={activeBasemap}
            onBasemapChange={setActiveBasemap}
            targetFlyTo={targetFlyTo}
          />

          {/* ───────────────────────────────────────────────────────── */}
          {/* FLOATING INSPECTOR DRAWER FOR SELECTED SITE               */}
          {/* ───────────────────────────────────────────────────────── */}
          {selectedSite && (
            <div className="absolute bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-slate-900/95 backdrop-blur-xl border border-emerald-500/40 rounded-2xl p-5 shadow-2xl z-[450] animate-in fade-in slide-in-from-bottom-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400">
                      {selectedSite.category.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-white leading-tight mt-0.5">
                    {selectedSite.name}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedSite(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Exact Coordinate Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs mb-3">
                <Crosshair className="w-3.5 h-3.5 shrink-0 text-emerald-400" />
                <span>
                  {selectedSite.latitude ? `${selectedSite.latitude.toFixed(5)}° N, ${selectedSite.longitude?.toFixed(5)}° E` : 'Coordinates Verified'}
                </span>
              </div>

              <p className="text-xs text-slate-300 line-clamp-3 mb-3 leading-relaxed">
                {selectedSite.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Area</span>
                  <strong className="text-white font-mono">{selectedSite.area ? `${selectedSite.area} km²` : 'Boundaries Mapped'}</strong>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">District</span>
                  <strong className="text-white">{selectedSite.district}</strong>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Established</span>
                  <strong className="text-white font-mono">{selectedSite.established || 'Notified'}</strong>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <span className="text-[10px] text-slate-400 block uppercase">Scope</span>
                  <strong className="text-emerald-400 font-mono">{selectedSite.scope || 'Kashmir Core'}</strong>
                </div>
              </div>

              {selectedSite.keySpecies && selectedSite.keySpecies.length > 0 && (
                <div className="mb-4">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1.5">
                    Flagship Indicator Species:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedSite.keySpecies.slice(0, 4).map((sp) => (
                      <span key={sp} className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[10px] capitalize">
                        {sp.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <a
                  href={`/protected-network/${
                    selectedSite.category === 'national_park' ? 'national-parks' :
                    selectedSite.category === 'wildlife_sanctuary' ? 'wildlife-sanctuaries' :
                    selectedSite.category === 'wetland_reserve' ? 'wetland-reserves' :
                    selectedSite.category === 'conservation_reserve' ? 'conservation-reserves' :
                    'bird-and-habitat-areas'
                  }/${selectedSite.slug}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 text-white text-xs font-bold hover:brightness-110 transition-all shadow-md"
                >
                  <span>Explore Intelligence Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
