'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { 
  Shield, Map, TrendingUp, Activity, Leaf, Mountain, 
  Droplet, ArrowRight, Eye, FileText, AlertTriangle, Compass
} from 'lucide-react';
import { motion } from 'framer-motion';
import { protectedNetworkMetrics, getProtectedAreas } from '@/data/protected-network';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heading } from '@/components/common/Heading';
import { KewBrandIdentity } from '@/components/common/KewBrandIdentity';

const categoryCards = [
  {
    id: 'national-parks',
    title: 'National Parks',
    icon: Mountain,
    count: protectedNetworkMetrics.nationalParks,
    description: 'Core mountain and forest conservation landscapes with highest protection status',
    color: 'from-emerald-600 to-emerald-500',
    href: '/protected-network/national-parks',
  },
  {
    id: 'protected-areas',
    title: 'Protected Areas',
    icon: Shield,
    count: protectedNetworkMetrics.totalProtectedAreas,
    description: 'Complete listing of all protected areas across Kashmir with detailed ecological intelligence',
    color: 'from-emerald-600 to-emerald-500',
    href: '/protected-areas',
  },
  {
    id: 'wildlife-sanctuaries',
    title: 'Wildlife Sanctuaries',
    icon: Shield,
    count: protectedNetworkMetrics.wildlifeSanctuaries,
    description: 'Protected habitats for mammals, birds, and mountain biodiversity',
    color: 'from-emerald-600 to-emerald-500',
    href: '/protected-network/wildlife-sanctuaries',
  },
  {
    id: 'wetland-reserves',
    title: 'Wetland Reserves',
    icon: Droplet,
    count: protectedNetworkMetrics.wetlandReserves,
    description: 'Marsh, reedbed, and bird-use conservation systems including Ramsar sites',
    color: 'from-emerald-600 to-emerald-500',
    href: '/protected-network/wetland-reserves',
  },
  {
    id: 'conservation-reserves',
    title: 'Conservation Reserves',
    icon: Leaf,
    count: protectedNetworkMetrics.conservationReserves,
    description: 'Community-involved conservation landscapes and buffer zones',
    color: 'from-emerald-600 to-emerald-500',
    href: '/protected-network/conservation-reserves',
  },
  {
    id: 'bird-and-habitat-areas',
    title: 'Bird & Habitat Areas',
    icon: Activity,
    count: protectedNetworkMetrics.importantBirdAreas,
    description: 'Important Bird and Biodiversity Areas (IBAs) with critical habitats',
    color: 'from-emerald-600 to-emerald-500',
    href: '/protected-network/bird-and-habitat-areas',
  },
  {
    id: 'atlas',
    title: 'Protected Area Atlas',
    icon: Map,
    count: protectedNetworkMetrics.totalProtectedAreas,
    description: 'Interactive GIS mapping of all protected landscapes across Kashmir',
    color: 'from-emerald-600 to-emerald-500',
    href: '/protected-network/atlas',
  },
  {
    id: 'registry',
    title: 'Protected Areas Registry',
    icon: Shield,
    count: protectedNetworkMetrics.totalProtectedAreas,
    description: 'Complete inventory of all protected areas with detailed metadata and source information',
    color: 'from-emerald-600 to-emerald-500',
    href: '/protected-network/registry',
  },
];

const intelligenceCards = [
  {
    title: 'Species Intelligence',
    description: 'Protected-area overlap for key species and habitats',
    icon: Activity,
    href: '/protected-network/species-intelligence',
    metrics: { value: '2,847', label: 'Species with PA overlap' },
  },
  {
    title: 'Corridors & Connectivity',
    description: 'Landscape continuity and habitat linkage analysis',
    icon: Map,
    href: '/protected-network/corridors-and-connectivity',
    metrics: { value: '23', label: 'Identified corridors' },
  },
  {
    title: 'Monitoring & Threats',
    description: 'Pressure signals and conservation alerts',
    icon: AlertTriangle,
    href: '/protected-network/monitoring-and-threats',
    metrics: { value: '17', label: 'Active alerts' },
  },
  {
    title: 'Human–Wildlife Conflict',
    description: 'Community safety, conflict patterns & coexistence',
    icon: Shield,
    href: '/protected-network/human-wildlife-conflict',
    metrics: { value: '842', label: 'Documented interactions' },
  },
  {
    title: 'Reports & Plans',
    description: 'Management documents and research',
    icon: FileText,
    href: '/protected-network/reports-and-plans',
    metrics: { value: '156', label: 'Documents' },
  },
];

export default function ProtectedNetworkPage() {
  const router = useRouter();
  const [activeHeroIdx, setActiveHeroIdx] = React.useState(0);

  const showcaseItems = [
    { id: '1', title: 'Dachigam National Park', subtitle: 'Prime Hangul Sanctuary', location: 'Srinagar · 141 km²', tag: 'National Park', src: '/images/protected-network/protected-national-parks-dachigam.jpg' },
    { id: '2', title: 'Kazinag National Park', subtitle: 'Markhor Corridor & Alpine Crags', location: 'Baramulla · 160 km²', tag: 'Western Caprinae', src: '/images/markhor.png' },
    { id: '3', title: 'Hokersar Wetland Reserve', subtitle: 'Central Asian Flyway Haven', location: 'Budgam / Srinagar · 13.75 km²', tag: 'Ramsar Wetland', src: '/images/protected-network/protected-wetland-reserves-hokersar.jpg' },
    { id: '4', title: 'Overa-Aru Sanctuary', subtitle: 'High-Altitude Hanging Valleys', location: 'Anantnag · 511 km²', tag: 'Biosphere Matrix', src: '/images/protected-network/protected-wildlife-sanctuaries-overa.jpg' },
    { id: '5', title: 'Protected Network GIS', subtitle: '3D Elevation & Boundaries', location: 'Western Himalayas', tag: 'GIS Telemetry', src: '/images/protected-network/protected-area-atlas-gis.jpg' },
    { id: '6', title: 'Wildlife Rapid Response', subtitle: 'HWC Coexistence Unit', location: 'Valley Foothills', tag: 'Rescue Patrol', src: '/images/protected-network/protected-hwc-rapid-response-rescue.jpg' },
  ];
  const currentHero = showcaseItems[activeHeroIdx] || showcaseItems[0];

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
            Protected Network Sentinel
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-[4px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">
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
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
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
            className={`relative rounded-lg overflow-hidden border text-left p-1 transition-all flex flex-col items-center gap-1 cursor-pointer ${
              activeHeroIdx === idx
                ? 'border-emerald-400 ring-2 ring-emerald-400/40 bg-emerald-500/10 shadow-md'
                : 'border-white/10 bg-slate-800/60 hover:border-emerald-500/30 hover:bg-slate-800'
            }`}
          >
            <div className="h-10 w-full rounded overflow-hidden relative">
              <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <span className="text-[9px] font-bold text-slate-300 break-words w-full text-center">
              {item.title.split(' ')[0]}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const featuredPAs = [
    getProtectedAreas.bySlug('dachigam-national-park'),
    getProtectedAreas.bySlug('hemis-national-park'),
    getProtectedAreas.bySlug('hokersar-wetland'),
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={
          <div className="overflow-visible pb-2">
            <KewBrandIdentity />
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
                Protected Area Network &amp; Reserves
              </span>
            </div>
          </div>
        }
        subtitle="A geospatial conservation intelligence layer mapping Kashmir's protected areas, wetlands, wildlife corridors, and sensitive ecosystems. Integrating biodiversity data, habitat assessments, and real-time threat signals for monitoring and spatial analysis."
        icon={<Shield className="w-6 h-6 text-emerald-400" />}
        label="Conservation Intelligence"
        images={[
          '/images/protected-network/protected-area-atlas-gis.jpg',
          '/images/protected-network/protected-national-parks-dachigam.jpg',
          '/images/protected-network/protected-wildlife-sanctuaries-overa.jpg',
          '/images/protected-network/protected-wetland-reserves-hokersar.jpg',
          '/images/protected-network/protected-conservation-reserves-shikargah.jpg',
          '/images/protected-network/protected-bird-habitat-areas-iba.jpg',
          '/images/protected-network/protected-species-intelligence-telemetry.jpg',
          '/images/protected-network/protected-corridors-connectivity-passes.jpg',
          '/images/protected-network/protected-monitoring-threats-surveillance.jpg',
          '/images/protected-network/protected-hwc-rapid-response-rescue.jpg',
          '/images/protected-network/protected-research-trails-sightings.jpg',
          '/images/bear.png',
          '/images/tiger.png',
          '/images/markhor.png',
          '/images/protected-network.png',
        ]}
        rightContent={heroShowcaseCard}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/protected-network/atlas">
              <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-emerald-500 font-bold transition-all shadow-md shadow-emerald-500/20" icon={<Map className="w-4 h-4" />}>
                Open PA Atlas
              </Button>
            </Link>
            <Link href="/protected-network/registry">
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold transition-all" icon={<TrendingUp className="w-4 h-4" />}>
                Network Statistics
              </Button>
            </Link>
            <Link href="/protected-network/corridors-and-connectivity">
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold transition-all" icon={<Compass className="w-4 h-4" />}>
                Corridor Matrix
              </Button>
            </Link>
          </div>
        }
      />

      {/* ───────────────────────────────────────────────────────────── */}
      {/* CORRIDOR TELEMETRY BANNER & J&K PROTECTED NETWORK SENTINEL    */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 relative z-20 mt-4 mb-4">
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20 text-emerald-400 shrink-0">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest font-black text-emerald-400">Integrated Protected Area Geospatial Command</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Monitoring 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Spanning <strong className="text-white">{protectedNetworkMetrics.totalArea.toLocaleString()} km²</strong> across National Parks, Wildlife Sanctuaries, Ramsar Wetlands, and Conservation Reserves.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Total Classified Reserves</div>
              <div className="text-sm font-bold text-emerald-300">{protectedNetworkMetrics.totalProtectedAreas} Verified Sites</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
              {protectedNetworkMetrics.coveragePercentage}% Landscape Coverage
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6-CARD INTERACTIVE KPI STRIP                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 lg:px-6 mb-8 relative z-20">
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-stretch">
          {/* Card 1: Total PAs */}
          <div className="kew-card-shell p-3.5 gap-1.5">
            <div className="kew-card-icon-box w-9 h-9 min-w-[2.25rem] min-h-[2.25rem] p-2 bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
              <Shield className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Total PAs</h3>
            <div className="text-2xl font-black text-emerald-300 tabular-nums">
              {protectedNetworkMetrics.totalProtectedAreas}
            </div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-auto">Conservation Units</div>
          </div>

          {/* Card 2: Total Area */}
          <div className="kew-card-shell p-3.5 gap-1.5">
            <div className="kew-card-icon-box w-9 h-9 min-w-[2.25rem] min-h-[2.25rem] p-2 bg-teal-500/15 border-teal-500/30 text-teal-400">
              <Map className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">Total Area</h3>
            <div className="text-2xl font-black text-teal-300 tabular-nums">
              {protectedNetworkMetrics.totalArea.toLocaleString()} <span className="text-sm font-normal text-teal-400">km²</span>
            </div>
            <div className="text-[11px] text-teal-400/90 font-mono mt-auto">{protectedNetworkMetrics.coveragePercentage}% of Geography</div>
          </div>

          {/* Card 3: National Parks */}
          <div className="kew-card-shell p-3.5 gap-1.5">
            <div className="kew-card-icon-box w-9 h-9 min-w-[2.25rem] min-h-[2.25rem] p-2 bg-amber-500/15 border-amber-500/30 text-amber-400">
              <Mountain className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">National Parks</h3>
            <div className="text-2xl font-black text-amber-300 tabular-nums">
              {protectedNetworkMetrics.nationalParks}
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-auto">Highest Legal Protection</div>
          </div>

          {/* Card 4: Wildlife Sanctuaries */}
          <div className="kew-card-shell p-3.5 gap-1.5">
            <div className="kew-card-icon-box w-9 h-9 min-w-[2.25rem] min-h-[2.25rem] p-2 bg-purple-500/15 border-purple-500/30 text-purple-400">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-purple-400">Sanctuaries</h3>
            <div className="text-2xl font-black text-purple-300 tabular-nums">
              {protectedNetworkMetrics.wildlifeSanctuaries}
            </div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-auto">Faunal Reserves</div>
          </div>

          {/* Card 5: Wetland Reserves */}
          <div className="kew-card-shell p-3.5 gap-1.5">
            <div className="kew-card-icon-box w-9 h-9 min-w-[2.25rem] min-h-[2.25rem] p-2 bg-blue-500/15 border-blue-500/30 text-blue-400">
              <Droplet className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">Wetlands</h3>
            <div className="text-2xl font-black text-blue-300 tabular-nums">
              {protectedNetworkMetrics.wetlandReserves}
            </div>
            <div className="text-[11px] text-blue-400/90 font-mono mt-auto">Ramsar &amp; Bird Basins</div>
          </div>

          {/* Card 6: Conservation Reserves & IBAs */}
          <div className="kew-card-shell p-3.5 gap-1.5">
            <div className="kew-card-icon-box w-9 h-9 min-w-[2.25rem] min-h-[2.25rem] p-2 bg-cyan-500/15 border-cyan-500/30 text-cyan-400">
              <Leaf className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Reserves &amp; IBAs</h3>
            <div className="text-2xl font-black text-cyan-300 tabular-nums">
              {protectedNetworkMetrics.conservationReserves + protectedNetworkMetrics.importantBirdAreas}
            </div>
            <div className="text-[11px] text-cyan-400/90 font-mono mt-auto">Community &amp; Avian Havens</div>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Protected Area Categories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {categoryCards.map((category, index) => (
            <motion.a
              key={category.id}
              href={category.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="block group h-full min-w-0 no-underline"
            >
              <div className="kew-card-shell kew-card-shell--interactive h-full">
                {/* 1. ICON (top-left) */}
                <div className="kew-card-top-row">
                  <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                    <category.icon className="w-5 h-5" />
                  </div>
                </div>

                {/* 2. TITLE — full horizontal width (natural word-boundary wrapping) */}
                <h3 className="kew-card-title">{category.title}</h3>

                {/* 3. KPI — below title */}
                <div className="kew-card-kpi">
                  <span className="kew-card-kpi-value">{category.count.toLocaleString()}</span>
                  <span className="kew-card-kpi-unit">areas</span>
                </div>

                {/* 4. DESCRIPTION */}
                <p className="kew-card-desc">{category.description}</p>

                {/* 5. CTA — anchored near bottom */}
                <div className="kew-card-cta">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Ecological Intelligence (Reference Cards) */}
      <div className="container mx-auto px-4 sm:px-6 py-16 bg-[#110820]/30 rounded-lg border border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Advanced Intelligence
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ecological Intelligence Layers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 items-stretch">
          {intelligenceCards.map((card, index) => (
            <motion.a
              key={card.title}
              href={card.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="block group h-full min-w-0 no-underline"
            >
              <div className="kew-card-shell kew-card-shell--interactive h-full">
                {/* 1. ICON (top-left) */}
                <div className="kew-card-top-row">
                  <div className="kew-card-icon-box bg-purple-500/15 border-purple-500/30 text-purple-400">
                    <card.icon className="w-5 h-5" />
                  </div>
                </div>

                {/* 2. TITLE — full horizontal width */}
                <h3 className="kew-card-title">{card.title}</h3>

                {/* 3. KPI */}
                <div className="kew-card-kpi">
                  <span className="kew-card-kpi-value">{card.metrics.value}</span>
                  <span className="kew-card-kpi-unit">{card.metrics.label}</span>
                </div>

                {/* 4. DESCRIPTION */}
                <p className="kew-card-desc">{card.description}</p>

                {/* 5. CTA */}
                <div className="kew-card-cta">
                  <span>Explore Layer</span>
                  <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Featured Protected Areas */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Featured Landscapes
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Protected Areas
            </h2>
          </div>
          <a href="/protected-areas">
            <Button
              variant="outline"
              className="border-white/20 text-white"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              View All Protected Areas
            </Button>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {featuredPAs.map((pa: any, index) => (
            pa && (
              <motion.a
                key={pa.id}
                href={`/protected-network/${pa.category === 'wetland_reserve' ? 'wetland-reserves' : pa.category === 'national_park' ? 'national-parks' : 'wildlife-sanctuaries'}/${pa.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="block group h-full min-w-0 no-underline"
              >
                <div className="kew-card-shell kew-card-shell--interactive h-full">
                  <div className="kew-card-top-row">
                    <div className="kew-card-icon-box bg-emerald-500/15 border-emerald-500/30 text-emerald-400">
                      <Shield className="w-5 h-5" />
                    </div>
                    <Badge variant="info" size="sm" className="capitalize text-xs px-2 py-0.5">
                      {pa.category.replace('_', ' ')}
                    </Badge>
                  </div>

                  <h3 className="kew-card-title">{pa.name}</h3>

                  <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-white/10 text-center">
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400 uppercase">Area</div>
                      <div className="text-sm font-bold text-white tabular-nums">{pa.area} km²</div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400 uppercase">District</div>
                      <div className="text-sm font-bold text-white break-words">{pa.district}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] text-slate-400 uppercase">Established</div>
                      <div className="text-sm font-bold text-white tabular-nums">{pa.established}</div>
                    </div>
                  </div>

                  <p className="kew-card-desc">{pa.description}</p>

                  <div className="kew-card-cta">
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.a>
            )
          ))}
        </div>
      </div>

      
    </main>
  );
}
