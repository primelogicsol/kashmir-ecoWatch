'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EntityDrawer } from '@/components/common/EntityDrawer';
import { BiodiversityCard } from '@/components/common/BiodiversityCard';
import {
  Leaf, Map, Activity, Eye, TrendingUp, ArrowRight,
  Shield, Droplet, Mountain, Flower2, Search, Filter,
  Layers, Building2, Calendar, BookOpen, TreePine,
  Compass, ShieldAlert, AlertTriangle, MapPin,
  Bird, Fish, Sprout, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { biodiversityMetrics, mammalsData, birdsData, getBiodiversityData } from '@/data/biodiversity';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { RED_DATA_METRICS, PRIORITY_KASHMIR_SPECIES } from '@/data/red-data-book-kashmir';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';

// New Components
import { HabitatIntelligenceCard } from '@/components/biodiversity/HabitatIntelligenceCard';
import { ConservationAnalyticsPanel } from '@/components/biodiversity/ConservationAnalyticsPanel';
import { EnhancedExploreModeCard } from '@/components/biodiversity/EnhancedExploreModeCard';
import { CrossModuleLinkStrip } from '@/components/sections/CrossModuleLinkStrip';

// New Data
import {
  getHabitatBiodiversity,
  getDistrictBiodiversity,
  getConservationAnalytics,
  biodiversityIntelligenceMetrics
} from '@/data/biodiversity-intelligence';
import { getEndemicSpecies, getMigratorySpecies, getBiodiversityRiskDashboard } from '@/data/biodiversity-access';

const categoryCards = [
  {
    id: 'forest-ecosystems',
    title: 'Forest Ecosystems',
    icon: TreePine,
    count: 16,
    description: 'The authoritative habitat intelligence layer mapping Kashmir\'s ecological infrastructure.',
    color: 'from-emerald-600 to-green-700',
    href: '/biodiversity/forest-ecosystems',
    habitats: ['All Forest Types'],
  },
  {
    id: 'mammals',
    title: 'Mammals',
    icon: Mountain,
    count: biodiversityMetrics.mammals,
    description: 'Terrestrial mammals including endangered ungulates, carnivores, and small mammals',
    color: 'from-emerald-500 to-teal-600',
    href: '/biodiversity/mammals',
    habitats: ['Forests', 'Alpine', 'Mountain'],
  },
  {
    id: 'birds',
    title: 'Birds',
    icon: Activity,
    count: biodiversityMetrics.birds,
    description: 'Resident and migratory birds across wetlands, forests, and alpine zones',
    color: 'from-sky-500 to-blue-600',
    href: '/biodiversity/birds',
    habitats: ['Wetlands', 'Forests', 'Alpine'],
  },
  {
    id: 'fish',
    title: 'Fish',
    icon: Droplet,
    count: biodiversityMetrics.fish,
    description: 'Freshwater fish and aquatic biodiversity in rivers, lakes, and streams',
    color: 'from-cyan-500 to-blue-600',
    href: '/biodiversity/fish',
    habitats: ['Rivers', 'Lakes', 'Streams'],
  },
  {
    id: 'plants',
    title: 'Plants',
    icon: Flower2,
    count: biodiversityMetrics.plants,
    description: 'Vascular plants, flora across forest, alpine, and wetland ecosystems',
    color: 'from-green-500 to-emerald-600',
    href: '/biodiversity/plants',
    habitats: ['Forests', 'Alpine', 'Wetlands'],
  },
  {
    id: 'medicinal',
    title: 'Medicinal Plants',
    icon: Leaf,
    count: biodiversityMetrics.medicinalPlants,
    description: 'Traditional medicinal flora with conservation-sensitive harvesting',
    color: 'from-amber-500 to-orange-600',
    href: '/biodiversity/medicinal-plants',
    habitats: ['Alpine', 'Forests'],
  },
  {
    id: 'threatened',
    title: 'Threatened Species',
    icon: Shield,
    count: biodiversityMetrics.threatened,
    description: 'Priority conservation species: Critically Endangered, Endangered, Vulnerable',
    color: 'from-red-500 to-rose-600',
    href: '/biodiversity/threatened-species',
    habitats: ['All'],
  },
];

const exploreModes = [
  { 
    id: 'habitat', 
    label: 'By Habitat', 
    icon: Leaf, 
    href: '/biodiversity?filter=habitat',
    description: 'Explore species by ecosystem type',
    count: 5,
    countLabel: 'habitats',
    color: 'from-emerald-500 to-teal-600'
  },
  { 
    id: 'protected-area', 
    label: 'By Protected Area', 
    icon: Map, 
    href: '/protected-areas',
    description: 'Biodiversity within PAs',
    count: 47,
    countLabel: 'areas',
    color: 'from-amber-500 to-orange-600'
  },
  { 
    id: 'district', 
    label: 'By District', 
    icon: Building2, 
    href: '/districts',
    description: 'District-level biodiversity',
    count: 16,
    countLabel: 'districts',
    color: 'from-violet-500 to-purple-600'
  },
  { 
    id: 'season', 
    label: 'By Season', 
    icon: Calendar, 
    href: '/seasonal-ecology',
    description: 'Seasonal occurrence patterns',
    count: 4,
    countLabel: 'seasons',
    color: 'from-pink-500 to-rose-600'
  },
  { 
    id: 'conservation', 
    label: 'By Conservation Status', 
    icon: Shield, 
    href: '/biodiversity/threatened-species',
    description: 'IUCN & WLPA filtering',
    count: 89,
    countLabel: 'threatened',
    color: 'from-red-500 to-rose-600'
  },
  { 
    id: 'sightings', 
    label: 'By Sightings', 
    icon: Eye, 
    href: '/trails-sightings',
    description: 'Field observations',
    count: 4521,
    countLabel: 'records',
    color: 'from-sky-500 to-blue-600'
  },
];

const seasonalModules = [
  { id: 'seasonal-landscapes', label: 'All Seasonal Landscapes', href: '/seasonal-ecology/seasonal-landscapes', icon: Mountain, desc: 'Landscape-scale seasonal patterns across Kashmir', badge: '18 layers' },
  { id: 'bloom-mapping', label: 'All Bloom Mapping', href: '/seasonal-ecology/bloom-mapping', icon: Flower2, desc: 'Bloom zones and flowering landscapes', badge: '15 zones' },
  { id: 'migration-windows', label: 'All Migration Windows', href: '/seasonal-ecology/migration-windows', icon: Bird, desc: 'Migration timing and wetland bird windows', badge: '12 windows' },
  { id: 'pollinator-windows', label: 'All Pollinator Windows', href: '/seasonal-ecology/pollinator-windows', icon: Activity, desc: 'Pollinator activity timing across Kashmir', badge: '9 windows' },
  { id: 'phenology-records', label: 'All Flowering & Phenology Records', href: '/seasonal-ecology/phenology-records', icon: Sprout, desc: 'Flowering & observation-based phenology records', badge: '12 groups' },
  { id: 'habitat-signals', label: 'All Seasonal Habitat Signals', href: '/seasonal-ecology/habitat-signals', icon: Layers, desc: 'Seasonal habitat changes and transitions', badge: '12 layers' },
  { id: 'water-transitions', label: 'All Seasonal Water & Wetland Transitions', href: '/seasonal-ecology/water-transitions', icon: Droplet, desc: 'Seasonal water and wetland transitions', badge: '12 layers' },
  { id: 'species-activity', label: 'All Seasonal Species Activity', href: '/seasonal-ecology/species-activity', icon: Clock, desc: 'Seasonal species activity patterns', badge: '12 windows' },
  { id: 'climate-windows', label: 'All Seasonal Climate & Visibility Windows', href: '/seasonal-ecology/climate-windows', icon: Compass, desc: 'Climate-linked visibility and access windows', badge: '12 windows' },
  { id: 'reports-references', label: 'All Seasonal Reports & References', href: '/seasonal-ecology/reports-references', icon: BookOpen, desc: 'Kashmir seasonal and phenology-related evidence', badge: '15 groups' },
];

export default function BiodiversityPage() {
  const router = useRouter();
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const featuredSpecies = [
    getBiodiversityData.mammals.bySlug('kashmir-stag-hangul'),
    getBiodiversityData.mammals.bySlug('kashmir-markhor'),
    getBiodiversityData.birds.bySlug('kashmir-flycatcher'),
    getBiodiversityData.birds.bySlug('himalayan-monal'),
    getBiodiversityData.fish.bySlug('kashmir-snow-trout'),
    getBiodiversityData.medicinalPlants.bySlug('atis'),
  ].filter(Boolean);

  const handleQuickView = (species: any) => {
    setSelectedEntity({
      type: 'species',
      name: species.commonName,
      description: species.description,
      slug: species.slug,
      status: species.conservationStatus,
      district: species.districts.join(', '),
      metrics: [
        { label: 'Elevation', value: `${species.elevationRange.min}-${species.elevationRange.max}m` },
        { label: 'Habitats', value: species.habitats.length },
      ],
    });
    setDrawerOpen(true);
  };

  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const heroWildlife = [
    {
      id: 'bear',
      src: '/images/bear.png',
      title: 'Himalayan Brown Bear',
      scientific: 'Ursus arctos isabellinus',
      status: 'Critically Endangered (J&K)',
      location: 'Dachigam & Zanskar Corridor',
      short: 'Brown Bear',
    },
    {
      id: 'markhor',
      src: '/images/markhor.png',
      title: 'Pir Panjal Markhor',
      scientific: 'Capra falconeri cashmiriensis',
      status: 'Endangered · Schedule I',
      location: 'Kazinag NP & Overa-Aru',
      short: 'Markhor',
    },
    {
      id: 'tiger',
      src: '/images/tiger.png',
      title: 'Snow Leopard & Predators',
      scientific: 'Panthera uncia & Felidae',
      status: 'Vulnerable · Schedule I',
      location: 'Kishtwar High-Altitude & Zanskar',
      short: 'Snow Leopard',
    },
    {
      id: 'protected',
      src: '/images/protected-network.png',
      title: 'Kashmir Protected Corridors',
      scientific: 'Protected Network & Wetlands',
      status: '16 Key Corridors Monitored',
      location: 'Valley Floor & Mountain Passes',
      short: 'PA Network',
    },
  ];
  const currentHero = heroWildlife[activeHeroIdx];

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
            Himalayan Sentinel Wildlife
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono">
          Taxa 2026
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
            <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-semibold flex-shrink-0">
              {currentHero.status}
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span className="italic text-emerald-300">{currentHero.scientific}</span>
            <span className="text-slate-400 text-[10px]">{currentHero.location}</span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Thumbnail Buttons */}
      <div className="grid grid-cols-4 gap-1.5 mt-2.5">
        {heroWildlife.map((item, idx) => (
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
                Species Directory &amp; Taxonomic Master Inventory
              </span>
            </div>
          </div>
        }
        subtitle="A comprehensive species directory mapping Kashmir's terrestrial and aquatic biodiversity, including mammals, birds, fish, and flora. Integrating detailed conservation status, habitat associations, elevational ranges, and critical intelligence for threatened ecosystems and protected zones."
        icon={<Leaf className="w-6 h-6 text-emerald-400" />}
        label="Biodiversity Intelligence · Master Directory"
        breadcrumbs={[
          { label: 'Biodiversity', href: '/biodiversity/overview' },
          { label: 'Species Directory' }
        ]}
        images={[
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png',
          '/images/protected-network.png'
        ]}
        rightContent={heroShowcaseCard}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <a href="/biodiversity">
              <Button size="sm" variant="outline" className="border-emerald-500/40 text-slate-950 bg-emerald-500 font-bold transition-all shadow-md shadow-emerald-500/30">
                <Leaf className="w-4 h-4 mr-1.5" />
                ALL {biodiversityMetrics.totalSpecies} Taxa
              </Button>
            </a>
            <a href="/biodiversity/threatened-species">
              <Button size="sm" className="bg-gradient-to-r from-rose-600 to-red-500 text-white font-bold transition-all">
                <AlertTriangle className="w-4 h-4 mr-1.5" />
                {biodiversityMetrics.threatened} Threatened
              </Button>
            </a>
            <a href="/biodiversity/medicinal-plants">
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-bold transition-all">
                <Flower2 className="w-4 h-4 mr-1.5" />
                127 Pharmacopeia
              </Button>
            </a>
          </div>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K BIODIVERSITY MONITORING STRIP */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 -mt-6 relative z-20 mb-6">
        <div className="bg-gradient-to-r from-slate-900/95 via-emerald-950/70 to-slate-900/95 border border-emerald-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-emerald-400">Integrated Taxonomic Repository &amp; Biodiversity Index</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Directory 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Taxonomic Scope: <strong className="text-white">Mammals</strong>, <strong className="text-white">Avian Fauna</strong>, <strong className="text-white">Ichthyology</strong>, and <strong className="text-white">Vascular / Medicinal Flora</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Taxonomic Inventory</div>
              <div className="text-sm font-bold text-emerald-300">{biodiversityMetrics.totalSpecies} Master Species</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>Full Biodiversity Coverage</span>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TELEMETRY METRIC KPI STRIP (6 CARDS)                          */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-4">
          {/* Card 1: Total Species */}
          <div
            className="p-3.5 rounded-xl border transition-all bg-emerald-500/20 border-emerald-500/60 shadow-lg shadow-emerald-950/50"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Total Taxa</span>
              <Leaf className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">{biodiversityMetrics.totalSpecies}</div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">ALL Cataloged Taxa</div>
          </div>

          {/* Card 2: Mammals */}
          <div
            onClick={() => router.push('/biodiversity/mammals')}
            className="p-3.5 rounded-xl border transition-all cursor-pointer bg-slate-900/80 border-slate-800 hover:border-amber-500/50 hover:bg-amber-950/20"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Mammals</span>
              <Mountain className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">{biodiversityMetrics.mammals}</div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Alpine &amp; Forest Fauna</div>
          </div>

          {/* Card 3: Birds */}
          <div
            onClick={() => router.push('/biodiversity/birds')}
            className="p-3.5 rounded-xl border transition-all cursor-pointer bg-slate-900/80 border-slate-800 hover:border-sky-500/50 hover:bg-sky-950/20"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Avian Fauna</span>
              <Activity className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-300">{biodiversityMetrics.birds}</div>
            <div className="text-[11px] text-sky-400/90 font-mono mt-0.5">Flyway &amp; Resident</div>
          </div>

          {/* Card 4: Fish & Aquatic */}
          <div
            onClick={() => router.push('/biodiversity/fish')}
            className="p-3.5 rounded-xl border transition-all cursor-pointer bg-slate-900/80 border-slate-800 hover:border-cyan-500/50 hover:bg-cyan-950/20"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Freshwater Fish</span>
              <Droplet className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-300">{biodiversityMetrics.fish}</div>
            <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">Jhelum &amp; Lacustrine</div>
          </div>

          {/* Card 5: Plants & Flora */}
          <div
            onClick={() => router.push('/biodiversity/plants')}
            className="p-3.5 rounded-xl border transition-all cursor-pointer bg-slate-900/80 border-slate-800 hover:border-green-500/50 hover:bg-green-950/20"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-green-400">Plants &amp; Flora</span>
              <Flower2 className="w-4 h-4 text-green-400" />
            </div>
            <div className="text-2xl font-black text-green-300">{biodiversityMetrics.plants}</div>
            <div className="text-[11px] text-green-400/90 font-mono mt-0.5">Vascular &amp; Endemics</div>
          </div>

          {/* Card 6: Threatened Species */}
          <div
            onClick={() => router.push('/biodiversity/threatened-species')}
            className="p-3.5 rounded-xl border transition-all cursor-pointer bg-slate-900/80 border-slate-800 hover:border-rose-500/50 hover:bg-rose-950/20"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Threatened</span>
              <Shield className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-300">{biodiversityMetrics.threatened}</div>
            <div className="text-[11px] text-rose-400/90 font-mono mt-0.5">CR · EN · VU Conservation</div>
          </div>
        </div>
      </div>

      {/* Category Modules */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-forest-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Explore by Taxonomic Group
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Biodiversity Categories
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl">
            Access specialized intelligence for each taxonomic group with habitat associations, 
            conservation status, and distribution data
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCards.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <a href={category.href} className="block group h-full">
                <Card
                  className="group h-full card-intelligence cursor-pointer border border-white/5 bg-slate-900/50"
                  padding="lg"
                >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center shadow-lg`}>
                    <category.icon className="w-5 h-5 md:w-7 md:h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-forest-300 transition-colors">
                      {category.title}
                    </h3>
                    <div className="text-2xl md:text-3xl font-bold text-white">
                      {category.count.toLocaleString()} <span className="text-sm text-slate-500 font-normal">/ {category.count.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-slate-500 uppercase">validated records</div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.habitats.map((habitat, idx) => (
                    <Badge key={idx} variant="default" size="sm">
                      {habitat}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-forest-400 group-hover:text-forest-300 transition-colors">
                  <span>Explore {category.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =========================================================
          HABITAT INTELLIGENCE BAND
          ========================================================= */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Habitat Intelligence</h2>
                <p className="text-xs sm:text-sm text-slate-400">Ecosystem-level biodiversity patterns</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity?filter=habitat')}
            >
              View All Habitats
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {getHabitatBiodiversity.all().map((habitat, index) => (
            <HabitatIntelligenceCard 
              key={habitat.id} 
              habitat={habitat}
              onClick={(h) => router.push(`/biodiversity/habitats/${h.slug}`)}
            />
          ))}
        </div>
      </div>

      {/* =========================================================
          EXPLORE BY INTELLIGENCE MODE (ENHANCED)
          ========================================================= */}
      <div className="container mx-auto px-6 py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Distribution Intelligence</h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-400">Multiple pathways to explore biodiversity</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exploreModes.map((mode, index) => (
            <EnhancedExploreModeCard
              key={mode.id}
              {...mode}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>

      {/* =========================================================
          SEASONAL ECOLOGY & PHENOLOGICAL INTELLIGENCE (DEDICATED MODULE SPACE)
          ========================================================= */}
      <div className="container mx-auto px-6 py-16 bg-slate-950 border-t border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center justify-between flex-wrap gap-4 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                Seasonal Ecology &amp; Phenological Intelligence
              </span>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-amber-500/30 text-amber-300 hover:bg-amber-500/10 text-xs"
              onClick={() => router.push('/seasonal-ecology')}
            >
              Explore Hub <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            10-Module Phenology, Migration &amp; Seasonal Transition Layer
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl">
            A dedicated ecological space tracking phenological rhythms, blooming sequences, flyway arrival corridors, pollinator availability, and seasonal habitat water transitions across Jammu &amp; Kashmir.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {seasonalModules.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
              onClick={() => router.push(item.href)}
              className="bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-amber-950/20 border border-white/10 hover:border-amber-500/40 rounded-xl p-4 hover:bg-amber-950/20 transition-all text-left group relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <item.icon className="w-5 h-5 text-amber-400 group-hover:scale-110 group-hover:text-amber-300 transition-all" />
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {item.badge}
                    </span>
                  )}
                </div>
                <div className="font-semibold text-white text-xs sm:text-sm mb-1 group-hover:text-amber-200 transition-colors">
                  {item.label}
                </div>
                <div className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                  {item.desc}
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-white/5 flex items-center text-[11px] text-amber-400/80 group-hover:text-amber-300">
                <span>Explore module</span>
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Featured Species Strip */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Featured Intelligence
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Featured Species
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl">
              Iconic and conservation-significant species representing Kashmir's biodiversity heritage
            </p>
          </div>
          <Button 
            variant="outline" 
            className="border-white/20 text-white"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View All Species
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSpecies.map((species, index) => (
            species && (
              <BiodiversityCard
                key={species.id}
                species={species}
                onQuickView={handleQuickView}
              />
            )
          ))}
        </div>
      </div>

      {/* =========================================================
          CONSERVATION INTELLIGENCE (RED DATA BOOK UPGRADE)
          ========================================================= */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">Conservation Intelligence</h2>
              <p className="text-xs sm:text-sm md:text-base text-slate-400">Threatened species, legal protection, and vulnerability patterns</p>
            </div>
          </div>
        </motion.div>

        <ConservationAnalyticsPanel
          analytics={getConservationAnalytics()}
          onViewAll={() => router.push('/biodiversity/threatened-species')}
        />
      </div>

      {/* =========================================================
          DISTRICT INTELLIGENCE BAND
          ========================================================= */}
      <div className="container mx-auto px-6 py-16 bg-gradient-to-b from-slate-950 to-blue-950/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">District Intelligence</h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-400">Biodiversity across all 16 districts of Kashmir</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity/district/srinagar')}
            >
              View All Districts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {getDistrictBiodiversity.all().slice(0, 8).map((district) => (
            <button
              key={district.district}
              onClick={() => router.push(`/biodiversity/district/${district.district.toLowerCase().replace(/\s+/g, '-')}`)}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all text-left"
            >
              <div className="text-2xl font-bold text-white">{district.totalSpecies}</div>
              <div className="text-xs text-slate-400 truncate">{district.district}</div>
              <div className="text-xs text-slate-500 mt-1">
                {district.threatenedSpecies} threatened
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* =========================================================
          ENDEMIC SPECIES BAND
          ========================================================= */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Endemic Species</h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-400">Unique to Kashmir and the Himalayas</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity/endemic-species')}
            >
              View Registry
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {getEndemicSpecies().slice(0, 4).map((species) => (
            <div
              key={species.id}
              className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 border border-emerald-500/20 rounded-lg p-4"
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-emerald-500/20 text-emerald-300 text-xs">
                  {species.endemismStatus?.replace(/-/g, ' ')}
                </Badge>
                <Badge className={`${
                  species.conservationStatus === 'CR' ? 'bg-red-500/20 text-red-300' :
                  species.conservationStatus === 'EN' ? 'bg-orange-500/20 text-orange-300' :
                  'bg-yellow-500/20 text-yellow-300'
                } text-xs`}>
                  {species.conservationStatus}
                </Badge>
              </div>
              <div className="font-semibold text-white">{species.commonName}</div>
              <div className="text-sm text-slate-400 italic">{species.scientificName}</div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================
          MIGRATION INTELLIGENCE BAND
          ========================================================= */}
      <div className="container mx-auto px-6 py-16 bg-gradient-to-b from-slate-950 to-sky-950/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Migration Intelligence</h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-400">Seasonal patterns and flyway data</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity/migration-calendar')}
            >
              View Calendar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => {
            const count = getMigratorySpecies().filter(s => 
              s.migrationWindow?.peakPresence?.includes(idx + 1)
            ).length;
            const intensity = count > 50 ? 'bg-sky-500' : count > 20 ? 'bg-sky-600' : count > 0 ? 'bg-sky-700' : 'bg-slate-800';
            
            return (
              <div
                key={month}
                className={`${intensity} rounded-lg p-3 text-center hover:scale-105 transition-transform`}
              >
                <div className="text-xs text-white/70 mb-1">{month}</div>
                <div className="text-sm sm:text-base lg:text-lg font-bold text-white">{count}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================
          RISK DASHBOARD BAND
          ========================================================= */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3 gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">Risk Dashboard</h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-400">Threat analysis and conservation priorities</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity/risk-dashboard')}
            >
              View Dashboard
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {(() => {
              const risk = getBiodiversityRiskDashboard();
              return (
                <>
                  <div className="text-center">
                    <div className={`text-3xl md:text-5xl font-bold ${risk.overallRiskScore >= 50 ? 'text-red-400' : 'text-yellow-400'}`}>
                      {risk.overallRiskScore}
                    </div>
                    <div className="text-sm text-slate-400 mt-1">Overall Risk Score</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-2">Threatened by Taxon</div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Mammals</span>
                        <span className="text-white">{risk.riskByTaxon.mammals}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Birds</span>
                        <span className="text-white">{risk.riskByTaxon.birds}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300">Plants</span>
                        <span className="text-white">{risk.riskByTaxon.plants}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400 mb-2">Top Threat</div>
                    <div className="text-white font-semibold">
                      {risk.topThreats[0]?.threatType || 'Habitat loss'}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      Affecting {risk.topThreats[0]?.affectedSpeciesCount || 0} species
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button
                      onClick={() => router.push('/biodiversity/risk-dashboard')}
                      className="bg-gradient-to-r from-emerald-600 to-emerald-500"
                    >
                      Full Analysis
                    </Button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* =========================================================
          CROSS-MODULE INTELLIGENCE (EXPANDED)
          ========================================================= */}
      <div className="container mx-auto px-6 py-16 bg-slate-900/50">
        <CrossModuleLinkStrip 
          context={{
            habitat: 'temperate-forest',
          }}
        />
      </div>

      {/* Entity Drawer */}
      {selectedEntity && (
        <EntityDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          entity={selectedEntity}
        />
      )}

      
    </main>
  );
}
