'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
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
    { id: '1', title: 'Dachigam National Park', subtitle: 'Prime Hangul Sanctuary', location: 'Srinagar · 141 km²', tag: 'National Park', src: '/images/protected-network.png' },
    { id: '2', title: 'Kazinag National Park', subtitle: 'Markhor Corridor & Alpine Crags', location: 'Baramulla · 160 km²', tag: 'Western Caprinae', src: '/images/markhor.png' },
    { id: '3', title: 'Hokersar Wetland Reserve', subtitle: 'Central Asian Flyway Haven', location: 'Budgam / Srinagar · 13.75 km²', tag: 'Ramsar Wetland', src: '/images/bear.png' },
    { id: '4', title: 'Overa-Aru Sanctuary', subtitle: 'High-Altitude Hanging Valleys', location: 'Anantnag · 511 km²', tag: 'Biosphere Matrix', src: '/images/tiger.png' },
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
            <span className="text-[9px] font-bold text-slate-300 truncate w-full text-center">
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
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                KEW
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
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
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
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
        <div className="bg-gradient-to-r from-slate-900/95 via-emerald-950/70 to-slate-900/95 border border-emerald-500/30 rounded-2xl p-4 lg:p-5 backdrop-blur-md shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* Card 1: Total PAs */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Total PAs</span>
              <Shield className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-emerald-300">
              {protectedNetworkMetrics.totalProtectedAreas}
            </div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">Conservation Units</div>
          </div>

          {/* Card 2: Total Area */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Total Area</span>
              <Map className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-300">
              {protectedNetworkMetrics.totalArea.toLocaleString()} <span className="text-sm font-normal text-teal-400">km²</span>
            </div>
            <div className="text-[11px] text-teal-400/90 font-mono mt-0.5">{protectedNetworkMetrics.coveragePercentage}% of Geography</div>
          </div>

          {/* Card 3: National Parks */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">National Parks</span>
              <Mountain className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">
              {protectedNetworkMetrics.nationalParks}
            </div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Highest Legal Protection</div>
          </div>

          {/* Card 4: Wildlife Sanctuaries */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Sanctuaries</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">
              {protectedNetworkMetrics.wildlifeSanctuaries}
            </div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">Faunal Reserves</div>
          </div>

          {/* Card 5: Wetland Reserves */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Wetlands</span>
              <Droplet className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl font-black text-blue-300">
              {protectedNetworkMetrics.wetlandReserves}
            </div>
            <div className="text-[11px] text-blue-400/90 font-mono mt-0.5">Ramsar &amp; Bird Basins</div>
          </div>

          {/* Card 6: Conservation Reserves & IBAs */}
          <div className="p-3.5 rounded-xl border transition-all bg-slate-900/80 border-slate-800 hover:border-slate-700">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Reserves &amp; IBAs</span>
              <Leaf className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl font-black text-cyan-300">
              {protectedNetworkMetrics.conservationReserves + protectedNetworkMetrics.importantBirdAreas}
            </div>
            <div className="text-[11px] text-cyan-400/90 font-mono mt-0.5">Community &amp; Avian Havens</div>
          </div>
        </div>
      </div>

      {/* Category Cards */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
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

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {categoryCards.map((category, index) => (
            <motion.a
              key={category.id}
              href={category.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="block group"
            >
              <Card className="p-4 sm:p-5 flex flex-col gap-2 h-full card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center shadow-lg`}>
                    <category.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                      {category.title}
                    </h3>
                    <div className="text-2xl sm:text-3xl font-bold text-white">
                      {category.count.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500 uppercase">areas</div>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mb-4 leading-relaxed line-clamp-3">
                  {category.description}
                </p>
                <div className="mt-auto w-full py-2 text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Ecological Intelligence */}
      <div className="container mx-auto px-6 py-16 bg-[#110820]/30 rounded-3xl border border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {intelligenceCards.map((card, index) => (
            <motion.a
              key={card.title}
              href={card.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="block group"
            >
              <Card className="h-full card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                    <card.icon className="w-6 h-6 text-slate-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  {card.description}
                </p>
                <div className="p-3 rounded-lg glass-light border border-white/5">
                  <div className="text-2xl font-bold text-white">{card.metrics.value}</div>
                  <div className="text-xs text-slate-500 uppercase">{card.metrics.label}</div>
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Featured Protected Areas */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {featuredPAs.map((pa: any, index) => (
            pa && (
              <motion.a
                key={pa.id}
                href={`/protected-network/${pa.category === 'wetland_reserve' ? 'wetland-reserves' : pa.category === 'national_park' ? 'national-parks' : 'wildlife-sanctuaries'}/${pa.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="block group"
              >
                <Card className="p-5 sm:p-6 flex flex-col gap-3 h-full overflow-hidden card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                  <div className="relative h-48 bg-gradient-to-br from-emerald-500/20 to-slate-800/50">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/protected-network.png)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#160C27]/80 via-[#160C27]/60 to-[#160C27]/80" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="info" size="sm" className="mb-2 capitalize text-xs px-2 py-0.5 whitespace-nowrap">
                        {pa.category.replace('_', ' ')}
                      </Badge>
                      <h3 className="text-base sm:text-lg font-semibold text-white">{pa.name}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {pa.description}
                    </p>
                    <div className="grid grid-cols-3 gap-3 text-center mt-2">
                      <div>
                        <div className="text-xs text-slate-500 uppercase">Area</div>
                        <div className="text-sm font-bold text-white">{pa.area} km²</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">District</div>
                        <div className="text-sm font-bold text-white">{pa.district}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">Established</div>
                        <div className="text-sm font-bold text-white">{pa.established}</div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.a>
            )
          ))}
        </div>
      </div>

      
    </main>
  );
}
