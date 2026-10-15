'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { SeasonalFilters, SeasonalFilterState } from '@/components/common/SeasonalFilters';
import { SeasonalCard } from '@/components/common/SeasonalCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import * as Icons from 'lucide-react';

interface SeasonalListingPageProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Icons;
  color: string;
  entities: any[];
  entityVariant: 'landscape' | 'bloom' | 'migration' | 'pollinator' | 'phenology' | 'habitat' | 'water' | 'species' | 'climate' | 'report';
  metrics: { label: string; value: number | string; icon: string }[];
  filters?: {
    districts?: string[];
    elevationZones?: string[];
    seasons?: string[];
    additionalFilters?: { label: string; options: string[] }[];
  };
  detailPageBaseRoute: string;
  mapPreviewEnabled?: boolean;
  mapCoordinates?: { lat: number; lng: number; zoom?: number };
}

const SHOWCASE_PRESETS: Record<string, Array<{ id: string; src: string; title: string; subtitle: string; tag: string; location: string; short: string }>> = {
  landscape: [
    { id: '1', src: '/images/protected-network.png', title: 'Temperate Conifer Spine', subtitle: 'Pinus wallichiana & Abies pindrow', tag: 'Montane Forest', location: 'Dachigam & Overa-Aru', short: 'Conifer Belt' },
    { id: '2', src: '/images/markhor.png', title: 'High Alpine Margs', subtitle: 'Cryospheric Highland Belt', tag: 'Subalpine Marg', location: 'Gulmarg & Tosamaidan', short: 'Alpine Marg' },
    { id: '3', src: '/images/bear.png', title: 'Highland River Basins', subtitle: 'Jhelum & Indus Headwaters', tag: 'Riverine Axis', location: 'Sindh & Lidder Valleys', short: 'River Basin' },
    { id: '4', src: '/images/tiger.png', title: 'Trans-Himalayan Steppe', subtitle: 'Cold Arid High Plateau', tag: 'Transboundary', location: 'Changthang & Zanskar', short: 'Cold Steppe' },
  ],
  bloom: [
    { id: '1', src: '/images/protected-network.png', title: 'Spring Almond & Tulip Bloom', subtitle: 'Early Spring Phenological Flush', tag: 'Valley Floor', location: 'Badamwari & Srinagar', short: 'Spring Bloom' },
    { id: '2', src: '/images/markhor.png', title: 'Alpine Meadow Wildflowers', subtitle: 'Primula, Saussurea & Gentians', tag: 'Alpine Marg', location: 'Aphrawat & Thajiwas', short: 'Wildflowers' },
    { id: '3', src: '/images/bear.png', title: 'Montane Understory Flush', subtitle: 'Trillium & Podophyllum', tag: 'Conifer Forest', location: 'Kazinag & Overa', short: 'Understory' },
    { id: '4', src: '/images/tiger.png', title: 'Autumn Saffron & Lotus', subtitle: 'Crocus sativus & Nelumbo', tag: 'Karewa & Lake', location: 'Pampore & Dal Lake', short: 'Saffron/Lotus' },
  ],
  migration: [
    { id: '1', src: '/images/protected-network.png', title: 'Central Asian Flyway Inflow', subtitle: 'Wintering Waterfowl & Geese', tag: 'Ramsar Wetland', location: 'Hokersar & Wular Lake', short: 'Flyway Inflow' },
    { id: '2', src: '/images/markhor.png', title: 'Altitudinal Ungulate Shifts', subtitle: 'Hangul & Monal Winter Descent', tag: 'Valley Corridor', location: 'Dachigam Lower Sanctuary', short: 'Altitudinal' },
    { id: '3', src: '/images/bear.png', title: 'Bar-headed Goose Passage', subtitle: 'High-Altitude Trans-Himalayan Crossings', tag: 'High Plateau', location: 'Tso Moriri & Pangong', short: 'Goose Passage' },
    { id: '4', src: '/images/tiger.png', title: 'Spring Northward Egress', subtitle: 'Pre-Breeding Siberian Departures', tag: 'Wetland Complex', location: 'Shallabugh & Hygam', short: 'Spring Egress' },
  ],
  pollinator: [
    { id: '1', src: '/images/protected-network.png', title: 'High-Altitude Bumblebee Synchrony', subtitle: 'Bombus tunicatus & Alpine Pollination', tag: 'Subalpine Marg', location: 'Gulmarg & Sonamarg', short: 'Bumblebees' },
    { id: '2', src: '/images/markhor.png', title: 'Orchard Belt Honeybee Flush', subtitle: 'Apis cerana & Apple Blossom Peak', tag: 'Horticulture', location: 'Shopian & Sopore', short: 'Orchard Bees' },
    { id: '3', src: '/images/bear.png', title: 'Montane Butterfly Flights', subtitle: 'Parnassius & Lycaenid Peaks', tag: 'Alpine Scree', location: 'Kazinag & Pir Panjal', short: 'Butterflies' },
    { id: '4', src: '/images/tiger.png', title: 'Late Summer Syrphid Hoverflies', subtitle: 'High-Altitude Flower Visits', tag: 'Alpine Glades', location: 'Gurez & Zanskar', short: 'Hoverflies' },
  ],
  phenology: [
    { id: '1', src: '/images/protected-network.png', title: 'Spring Bud Break & Leaf Flush', subtitle: 'Ascending Sap & Early Flowering', tag: 'Forest & Orchard', location: 'Valley-wide', short: 'Bud Break' },
    { id: '2', src: '/images/markhor.png', title: 'Summer Fruit Maturation', subtitle: 'Alpine Seed Set & Forest Mast', tag: 'All Elevations', location: 'Pir Panjal & Sindh', short: 'Fruit Mast' },
    { id: '3', src: '/images/bear.png', title: 'Autumn Deciduous Senescence', subtitle: 'Chinar, Maple & Oak Golden Shifts', tag: 'Deciduous Belt', location: 'Valley Floor & Glades', short: 'Senescence' },
    { id: '4', src: '/images/tiger.png', title: 'Winter Cryospheric Dormancy', subtitle: 'Sub-Zero Metabolic Repose', tag: 'Highland Refugium', location: 'Upper Kashmir Ranges', short: 'Dormancy' },
  ],
  habitat: [
    { id: '1', src: '/images/protected-network.png', title: 'Temperate Conifer Biome', subtitle: 'Western Himalayan Ecological Spine', tag: 'Forest Ecosystem', location: 'Dachigam & Kishtwar', short: 'Conifer Spine' },
    { id: '2', src: '/images/markhor.png', title: 'Alpine Meadow Ecosystems', subtitle: 'High-Altitude Pastoral Glades', tag: 'Cryospheric Marg', location: 'Gulmarg & Sonamarg', short: 'Alpine Marg' },
    { id: '3', src: '/images/bear.png', title: 'Palustrine Wetland Networks', subtitle: 'Jhelum Basin Flood Sink', tag: 'Ramsar Wetlands', location: 'Hokersar & Wular', short: 'Wetlands' },
    { id: '4', src: '/images/tiger.png', title: 'Cold Arid Highland Steppe', subtitle: 'Trans-Himalayan Tibetan Plateaus', tag: 'Cold Desert', location: 'Changthang & Nubra', short: 'Cold Steppe' },
  ],
  water: [
    { id: '1', src: '/images/protected-network.png', title: 'Spring Snowmelt Discharge Peak', subtitle: 'Glacial Headwater Ascendance', tag: 'Hydrological', location: 'Sindh & Lidder Basins', short: 'Snowmelt Run' },
    { id: '2', src: '/images/markhor.png', title: 'Summer Macrophyte Canopy', subtitle: 'Nelumbo & Trapa Peak Biomass', tag: 'Lacustrine', location: 'Dal & Wular Lakes', short: 'Lotus Canopy' },
    { id: '3', src: '/images/bear.png', title: 'Autumn Hydroperiod Drawdown', subtitle: 'Seasonal Silt Settling & Clear Streams', tag: 'Riverine', location: 'Jhelum Mainstem', short: 'Hydro Draw' },
    { id: '4', src: '/images/tiger.png', title: 'Winter Lake Rim Freezing', subtitle: 'Partial Ice Cover & Invertebrate Torpor', tag: 'Cryosphere', location: 'Dal, Nigeen & High Lakes', short: 'Freeze Phase' },
  ],
  species: [
    { id: '1', src: '/images/bear.png', title: 'Himalayan Brown Bear Hyperphagia', subtitle: 'Autumn Feeding Ahead of Winter Denning', tag: 'Apex Predator', location: 'Dachigam & Zanskar', short: 'Brown Bear' },
    { id: '2', src: '/images/markhor.png', title: 'Pir Panjal Markhor Rutting', subtitle: 'Precipitous Cliff Courtship Displays', tag: 'Endangered Caprid', location: 'Kazinag & Limber', short: 'Markhor' },
    { id: '3', src: '/images/protected-network.png', title: 'Kashmir Stag (Hangul) Autumn Rut', subtitle: 'Echoing Mating Roars across Dachigam', tag: 'Critically End.', location: 'Lower Dachigam', short: 'Hangul Rut' },
    { id: '4', src: '/images/tiger.png', title: 'Snow Leopard Winter Tracking', subtitle: 'Prey Following along Valley Ridges', tag: 'Highland Felid', location: 'Hemis & Kishtwar', short: 'Snow Leopard' },
  ],
  climate: [
    { id: '1', src: '/images/protected-network.png', title: 'Spring Thermal Front Ascendance', subtitle: 'Valley Thaw & Solar Elevation Shift', tag: 'Microclimate', location: 'Valley Floor', short: 'Spring Thaw' },
    { id: '2', src: '/images/markhor.png', title: 'Summer Cloud Interception Window', subtitle: 'Pir Panjal Monsoon Barrier Effects', tag: 'Atmospheric', location: 'Southern Foothills', short: 'Monsoon Front' },
    { id: '3', src: '/images/bear.png', title: 'Autumn Crystal Visibility Windows', subtitle: 'Peak Atmospheric Transparency', tag: 'Highland Optics', location: 'Ridge Crests', short: 'High Clarity' },
    { id: '4', src: '/images/tiger.png', title: 'Chillai Kalan Cold Inundation', subtitle: '40-Day Deep Cryospheric Minimum', tag: 'Sub-Zero Peak', location: 'Regional Scale', short: 'Chillai Kalan' },
  ],
  report: [
    { id: '1', src: '/images/protected-network.png', title: 'Seasonal Ecology Master Dossier', subtitle: 'Comprehensive Phenological Registers', tag: 'Research Archive', location: 'J&K Division', short: 'Master Dossier' },
    { id: '2', src: '/images/markhor.png', title: 'Central Asian Flyway Censuses', subtitle: 'Annual Wetland Waterfowl Surveys', tag: 'Census Data', location: 'Ramsar Sites', short: 'Flyway Census' },
    { id: '3', src: '/images/bear.png', title: 'High-Altitude Bloom Atlases', subtitle: 'Alpine Floral Progression Mapping', tag: 'Botanical Record', location: 'Kashmir Herbarium', short: 'Bloom Atlas' },
    { id: '4', src: '/images/tiger.png', title: 'Phenology & Climate Vulnerability', subtitle: 'Long-term Timing Shifts Assessment', tag: 'Climate Evidence', location: 'Peer-Reviewed', short: 'Shift Studies' },
  ],
};

export const SeasonalListingPage: React.FC<SeasonalListingPageProps> = ({
  title,
  subtitle,
  icon: iconName,
  color,
  entities,
  entityVariant,
  metrics,
  filters,
  detailPageBaseRoute,
  mapPreviewEnabled = true,
  mapCoordinates = { lat: 34.0837, lng: 74.7973, zoom: 9 },
}) => {
  const Icon = (Icons as any)[iconName] || Icons.Mountain;
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const [selectedEcologicalScope, setSelectedEcologicalScope] = useState<string>('All');
  const availableScopes = ['All', 'Kashmir Core', 'Trans-Divisional', 'Transboundary / Extended'];

  const [filterState, setFilterState] = useState<SeasonalFilterState>({
    selectedDistricts: [],
    selectedElevationZones: [],
    selectedSeasons: [],
    selectedHabitats: [],
    additionalFilters: {},
    searchQuery: '',
  });

  const filteredEntities = useMemo(() => {
    return entities.filter((entity) => {
      if (!entity) return false;
      
      // Ecological Scope filter
      const entityScope = entity.ecologicalScope || entity.primaryScope || 'Kashmir Core';
      if (selectedEcologicalScope !== 'All' && entityScope !== selectedEcologicalScope) {
        return false;
      }

      // Search filter
      if (filterState.searchQuery) {
        const searchLower = filterState.searchQuery.toLowerCase();
        const name = entity.name || entity.title || entity.speciesCommonName || entity.commonName || '';
        const description = entity.description || entity.shortDescription || '';
        if (!name.toLowerCase().includes(searchLower) && !description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // District filter
      if (filterState.selectedDistricts.length > 0) {
        const entityDistricts = entity.districts || (entity.district ? [entity.district] : []) || entity.regionsPresent || [];
        if (!entityDistricts.some((d: string) => filterState.selectedDistricts.includes(d))) {
          return false;
        }
      }

      // Elevation zone filter
      if (filterState.selectedElevationZones.length > 0) {
        if (!entity.elevationZone || !filterState.selectedElevationZones.includes(entity.elevationZone)) {
          return false;
        }
      }

      // Season filter
      if (filterState.selectedSeasons.length > 0) {
        const entitySeasons = entity.primarySeasons || entity.seasonalFocus || (entity.arrivalWindow ? ['autumn', 'winter'] : []) || [];
        if (!entitySeasons.some((s: string) => filterState.selectedSeasons.includes(s))) {
          return false;
        }
      }

      return true;
    });
  }, [entities, filterState, selectedEcologicalScope]);

  const handleFilterChange = (newState: SeasonalFilterState) => {
    setFilterState(newState);
  };

  const getThemeColors = () => {
    const colors: { [key: string]: { text: string, bgOrb: string, bgActive: string } } = {
      landscape: { text: 'text-emerald-400', bgOrb: 'bg-emerald-500/10', bgActive: 'bg-emerald-500/20' },
      bloom: { text: 'text-rose-400', bgOrb: 'bg-rose-500/10', bgActive: 'bg-rose-500/20' },
      migration: { text: 'text-sky-400', bgOrb: 'bg-sky-500/10', bgActive: 'bg-sky-500/20' },
      pollinator: { text: 'text-amber-400', bgOrb: 'bg-amber-500/10', bgActive: 'bg-amber-500/20' },
      phenology: { text: 'text-violet-400', bgOrb: 'bg-violet-500/10', bgActive: 'bg-violet-500/20' },
      habitat: { text: 'text-emerald-400', bgOrb: 'bg-emerald-500/10', bgActive: 'bg-emerald-500/20' },
      water: { text: 'text-cyan-400', bgOrb: 'bg-cyan-500/10', bgActive: 'bg-cyan-500/20' },
      species: { text: 'text-rose-400', bgOrb: 'bg-rose-500/10', bgActive: 'bg-rose-500/20' },
      climate: { text: 'text-amber-400', bgOrb: 'bg-amber-500/10', bgActive: 'bg-amber-500/20' },
      report: { text: 'text-slate-400', bgOrb: 'bg-slate-500/10', bgActive: 'bg-slate-500/20' },
    };
    return colors[entityVariant] || colors.landscape;
  };
  const theme = getThemeColors();

  const showcaseItems = SHOWCASE_PRESETS[entityVariant] || SHOWCASE_PRESETS.landscape;
  const currentHero = showcaseItems[activeHeroIdx] || showcaseItems[0];

  // ── HERO SHOWCASE CARD (Identical architecture to http://localhost:3000/biodiversity) ──
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
            Himalayan Seasonal Sentinel
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">
          Cycle 2026
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
        {showcaseItems.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveHeroIdx(idx)}
            className={`relative rounded-lg overflow-hidden border text-left p-1 transition-all flex flex-col items-center gap-1 ${
              activeHeroIdx === idx
                ? 'border-emerald-400 ring-2 ring-emerald-400/40 bg-emerald-500/10 shadow-md'
                : 'border-white/10 bg-slate-800/60 hover:border-emerald-500/30 hover:bg-slate-800'
            }`}
          >
            <div className="w-full h-10 rounded overflow-hidden relative">
              <img src={item.src} alt={item.short} className="w-full h-full object-cover" />
            </div>
            <span className={`text-[10px] font-medium truncate w-full text-center ${activeHeroIdx === idx ? 'text-emerald-300 font-bold' : 'text-slate-400'}`}>
              {item.short}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <main className="mx-auto min-h-screen bg-slate-950">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* HERO SECTION WITH GOLD-STANDARD KEW STYLING                   */}
      {/* ───────────────────────────────────────────────────────────── */}
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
                {title}
              </span>
            </div>
          </div>
        }
        subtitle={subtitle}
        icon={<Icon className={`w-6 h-6 ${theme.text}`} />}
        label="Seasonal Intelligence &bull; Ecological Dynamics"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Seasonal Ecology', href: '/seasonal-ecology' },
          { label: title },
        ]}
        images={['/images/protected-network.png', '/images/bear.png', '/images/markhor.png', '/images/tiger.png']}
        rightContent={heroShowcaseCard}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/seasonal-ecology">
              <Button size="sm" variant="outline" className="border-emerald-500/40 text-slate-950 bg-emerald-500 font-bold transition-all shadow-md shadow-emerald-500/30">
                <Icons.Sun className="w-4 h-4 mr-1.5" />
                Seasonal Hub
              </Button>
            </Link>
            <Link href="/seasonal-ecology/migration-windows">
              <Button size="sm" className="bg-gradient-to-r from-sky-600 to-blue-500 text-white font-bold transition-all">
                <Icons.Bird className="w-4 h-4 mr-1.5" />
                Migration Windows
              </Button>
            </Link>
            <Link href="/seasonal-ecology/bloom-mapping">
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold transition-all">
                <Icons.Flower2 className="w-4 h-4 mr-1.5" />
                Bloom Mapping
              </Button>
            </Link>
          </div>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K SEASONAL SENTINEL STRIP       */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-emerald-950/70 to-slate-900/95 border border-emerald-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
              <Icons.Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-emerald-400">Trans-Himalayan Phenological Sentinel &amp; Seasonal Timing</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Monitoring 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Monitoring seasonal landscape transitions, <strong className="text-white">Central Asian Flyway bird arrivals</strong>, spring bloom fronts, and climate visibility windows across Jammu, Kashmir, and Ladakh.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Documented Layers</div>
              <div className="text-sm font-bold text-emerald-300">{entities.length} Verified Records</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
              {filteredEntities.length} In Current Filter
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6-CARD INTERACTIVE KPI STRIP                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-8 relative z-20">
        <div className="glass-intense border-white/10 p-4 lg:p-5 rounded-2xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {metrics.map((metric, idx) => {
              const MetricIcon = (Icons as any)[metric.icon] || Icons.Mountain;
              return (
                <div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0 bg-white/5 border border-white/5 shadow-inner">
                  <MetricIcon className={`w-4 h-4 ${theme.text} mx-auto mb-1`} />
                  <div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                    {metric.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-400 uppercase tracking-wide mt-0.5 leading-tight break-words">
                    {metric.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* ECOLOGICAL SCOPE TABS                                         */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="relative max-w-[93rem] mx-auto px-4 mb-6">
        <div className="flex items-center gap-2 p-1.5 glass-intense border border-white/10 rounded-2xl overflow-x-auto scrollbar-hide w-fit">
          {availableScopes.map(scope => (
            <button
              key={scope}
              onClick={() => setSelectedEcologicalScope(scope)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                selectedEcologicalScope === scope
                  ? `bg-gradient-to-r ${color} text-white shadow-md`
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {scope}
            </button>
          ))}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* MAIN CONTENT GRID & FILTERS                                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="relative max-w-[93rem] mx-auto pb-16 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <SeasonalFilters
                districts={filters?.districts as any}
                elevationZones={filters?.elevationZones as any}
                seasons={filters?.seasons as any}
                additionalFilters={filters?.additionalFilters}
                onFilterChange={handleFilterChange}
              />

              {/* Map Preview */}
              {mapPreviewEnabled && (
                <Card className="mt-6 border border-white/5 bg-slate-900/50 overflow-hidden">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                      <Icons.Map className="w-3.5 h-3.5 text-emerald-400" />
                      Spatial Footprint
                    </span>
                    <Badge variant="outline" size="sm" className="text-[10px]">
                      Interactive
                    </Badge>
                  </div>
                  <div className="h-48 bg-slate-950/60 relative flex items-center justify-center p-4 text-center">
                    <div className="absolute inset-0 bg-grid opacity-15" />
                    <div className="relative z-10 space-y-2">
                      <Icons.Compass className="w-8 h-8 text-emerald-400/60 mx-auto animate-pulse" />
                      <p className="text-xs text-slate-400">
                        Georeferenced layer active across {filteredEntities.length} observation points
                      </p>
                      <Link href="/protected-network/atlas">
                        <Button size="sm" variant="ghost" className="text-xs text-emerald-400 hover:text-emerald-300">
                          Open in Full GIS Atlas &rarr;
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Entity Grid */}
          <div className="lg:col-span-3">
            {filteredEntities.length === 0 ? (
              <div className="text-center py-20 border border-white/5 rounded-2xl bg-slate-900/30">
                <Icons.Layers className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No seasonal layers match your filters</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
                  Try adjusting the ecological scope, elevation zones, or search terms to reveal more records.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedEcologicalScope('All');
                    setFilterState({
                      selectedDistricts: [],
                      selectedElevationZones: [],
                      selectedSeasons: [],
                      selectedHabitats: [],
                      additionalFilters: {},
                      searchQuery: '',
                    });
                  }}
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEntities.map((entity, idx) => (
                  <SeasonalCard
                    key={entity.id || entity.slug || idx}
                    entity={entity}
                    variant={entityVariant}
                    detailHref={`${detailPageBaseRoute}/${entity.slug || entity.id}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
