'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Leaf, Map, Activity, Eye, TrendingUp, ArrowRight,
  Shield, Droplet, Mountain, Flower2, Search, Filter,
  Layers, Building2, Calendar, BookOpen, Bird, Fish,
  Sprout, AlertTriangle, BarChart3, Clock, MapPin,
  Compass, ShieldAlert, TreePine
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { biodiversityMetrics } from '@/data/biodiversity';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { Heading } from '@/components/common/Heading';
import {
  getHabitatBiodiversity,
  getDistrictBiodiversity,
  biodiversityIntelligenceMetrics
} from '@/data/biodiversity-intelligence';
import {
  getMigrationWindows,
  getPollinatorWindows,
  getPhenologyRecords,
  getHabitatSignals,
  getSpeciesActivities
} from '@/data/seasonal-ecology';
import { getBiodiversityRiskDashboard } from '@/data/biodiversity-access';

// Sub-module link groups
const speciesGroup = [
  { id: 'directory', label: 'Species Directory', href: '/biodiversity', icon: Leaf, desc: 'Browse all species' },
  { id: 'mammals', label: 'Mammals', href: '/biodiversity/mammals', icon: Mountain, desc: `${biodiversityMetrics.mammals} species` },
  { id: 'birds', label: 'Birds', href: '/biodiversity/birds', icon: Bird, desc: `${biodiversityMetrics.birds} species` },
  { id: 'fish', label: 'Fish & Aquatic Life', href: '/biodiversity/fish', icon: Fish, desc: `${biodiversityMetrics.fish} species` },
  { id: 'plants', label: 'Plants & Flora', href: '/biodiversity/plants', icon: Sprout, desc: `${biodiversityMetrics.plants} species` },
  { id: 'medicinal', label: 'Medicinal Flora', href: '/biodiversity/medicinal-plants', icon: Flower2, desc: `${biodiversityMetrics.medicinalPlants} species` },
  { id: 'threatened', label: 'Priority & Threatened', href: '/biodiversity/threatened-species', icon: Shield, desc: `${biodiversityMetrics.threatened} species` },
];

const observationGroup = [
  { id: 'sightings', label: 'Wildlife Sightings', href: '/biodiversity/wildlife-sightings', icon: Eye, desc: 'Verified field observations' },
  { id: 'hotspots', label: 'Birding & Observation Hotspots', href: '/biodiversity/birding-hotspots', icon: MapPin, desc: 'Prime observation areas' },
  { id: 'forest-ecosystems', label: 'Forest Ecosystems', href: '/biodiversity/forest-ecosystems', icon: TreePine, desc: '10-module habitat intelligence layer' },
];

const seasonalEcologyGroup = [
  { id: 'seasonal-hub', label: 'Seasonal Ecology Hub', href: '/seasonal-ecology', icon: Calendar, desc: 'Master phenology & seasonal hub', badge: 'Hub' },
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

const intelligenceGroup = [
  { id: 'overview', label: 'Overview', href: '/biodiversity', icon: BarChart3, desc: 'Module command center' },
  { id: 'district', label: 'District Biodiversity Profiles', href: '/biodiversity/district-profiles', icon: Building2, desc: 'Regional intelligence' },
  { id: 'dashboards', label: 'Dashboards', href: '/biodiversity/dashboards', icon: BarChart3, desc: 'Analytics & trends' },
];

export default function BiodiversityOverviewPage() {
  const router = useRouter();
  
  // Pull seasonal ecology data for overview highlights
  const migrationWindows = getMigrationWindows();
  const pollinatorWindows = getPollinatorWindows();
  const phenologyRecords = getPhenologyRecords();
  const habitatSignals = getHabitatSignals();
  const speciesActivities = getSpeciesActivities();

  // Active migration periods
  const activeMigrations = migrationWindows.filter(m => {
    const currentMonth = new Date().getMonth() + 1;
    return m.peakPresenceMonths?.includes(currentMonth) ?? false;
  });

  // Recent phenology records
  const recentPhenology = phenologyRecords.slice(0, 4);

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
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
                Biodiversity Command &amp; Intelligence Overview
              </span>
            </div>
          </div>
        }
        subtitle="An integrated ecological intelligence layer analyzing Kashmir's specific biodiversity domain with verified metrics. Integrating complex spatial distribution mapping, real-time threat vulnerability analysis, and critical longitudinal conservation analytics to protect high-priority regional ecosystems."
        icon={<Leaf className="w-6 h-6 text-emerald-400" />}
        label="Biodiversity Intelligence · Command Center"
        breadcrumbs={[
          { label: 'Biodiversity', href: '/biodiversity/overview' },
          { label: 'Overview & Command' }
        ]}
        images={['/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <a href="/biodiversity">
              <Button size="sm" variant="outline" className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10 font-bold transition-all">
                <Leaf className="w-4 h-4 mr-1.5" />
                Species Directory ({biodiversityMetrics.totalSpecies})
              </Button>
            </a>
            <a href="/biodiversity/dashboards">
              <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-bold transition-all">
                <BarChart3 className="w-4 h-4 mr-1.5" />
                Analytics &amp; Trends
              </Button>
            </a>
            <a href="/biodiversity/threatened-species">
              <Button size="sm" className="bg-gradient-to-r from-rose-600 to-red-500 text-white font-bold transition-all">
                <Shield className="w-4 h-4 mr-1.5" />
                Threatened ({biodiversityMetrics.threatened})
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
                <span className="text-xs uppercase tracking-widest font-black text-emerald-400">Western Himalayan Ecological Matrix &amp; Biosphere Sentinel</span>
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-[10px] text-emerald-300 uppercase font-semibold">Active Command Center 2026</span>
              </div>
              <p className="text-sm text-slate-300 mt-0.5">
                Central Ecological Network: <strong className="text-white">Dachigam NP</strong>, <strong className="text-white">Hokersar Ramsar</strong>, <strong className="text-white">Overa-Aru</strong>, <strong className="text-white">Kazinag</strong>, and <strong className="text-white">Kishtwar High Altitude</strong>.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 self-end md:self-center">
            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-400">Total Cataloged Taxa</div>
              <div className="text-sm font-bold text-emerald-300">{biodiversityMetrics.totalSpecies} Documented Species</div>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              <span>{biodiversityMetrics.threatened} Red-Listed Taxa</span>
            </div>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────────────── */}
        {/* TELEMETRY METRIC KPI STRIP (6 CARDS)                          */}
        {/* ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-4">
          {/* Card 1: Total Species */}
          <div
            onClick={() => router.push('/biodiversity')}
            className="p-3.5 rounded-xl border transition-all cursor-pointer bg-slate-900/80 border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/20"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Total Taxa</span>
              <Leaf className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-black text-white">{biodiversityMetrics.totalSpecies}</div>
            <div className="text-[11px] text-emerald-400/90 font-mono mt-0.5">All Taxa Indexed</div>
          </div>

          {/* Card 2: Avian Fauna */}
          <div
            onClick={() => router.push('/biodiversity/birds')}
            className="p-3.5 rounded-xl border transition-all cursor-pointer bg-slate-900/80 border-slate-800 hover:border-sky-500/50 hover:bg-sky-950/20"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400">Avian Fauna</span>
              <Bird className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl font-black text-sky-300">{biodiversityMetrics.birds}</div>
            <div className="text-[11px] text-sky-400/90 font-mono mt-0.5">Resident &amp; Migratory</div>
          </div>

          {/* Card 3: Mammals */}
          <div
            onClick={() => router.push('/biodiversity/mammals')}
            className="p-3.5 rounded-xl border transition-all cursor-pointer bg-slate-900/80 border-slate-800 hover:border-amber-500/50 hover:bg-amber-950/20"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Mammals</span>
              <Mountain className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl font-black text-amber-300">{biodiversityMetrics.mammals}</div>
            <div className="text-[11px] text-amber-400/90 font-mono mt-0.5">Ungulates &amp; Carnivores</div>
          </div>

          {/* Card 4: Flora & Medicinal */}
          <div
            onClick={() => router.push('/biodiversity/medicinal-plants')}
            className="p-3.5 rounded-xl border transition-all cursor-pointer bg-slate-900/80 border-slate-800 hover:border-teal-500/50 hover:bg-teal-950/20"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Medicinal Flora</span>
              <Flower2 className="w-4 h-4 text-teal-400" />
            </div>
            <div className="text-2xl font-black text-teal-300">{biodiversityMetrics.medicinalPlants}</div>
            <div className="text-[11px] text-teal-400/90 font-mono mt-0.5">Active Pharmacopeia</div>
          </div>

          {/* Card 5: Threatened Species */}
          <div
            onClick={() => router.push('/biodiversity/threatened-species')}
            className="p-3.5 rounded-xl border transition-all cursor-pointer bg-slate-900/80 border-slate-800 hover:border-rose-500/50 hover:bg-rose-950/20"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Threatened</span>
              <AlertTriangle className="w-4 h-4 text-rose-400" />
            </div>
            <div className="text-2xl font-black text-rose-300">{biodiversityMetrics.threatened}</div>
            <div className="text-[11px] text-rose-400/90 font-mono mt-0.5">CR, EN, VU Taxa</div>
          </div>

          {/* Card 6: Seasonal Migrations */}
          <div
            onClick={() => router.push('/biodiversity/migration-windows')}
            className="p-3.5 rounded-xl border transition-all cursor-pointer bg-slate-900/80 border-slate-800 hover:border-purple-500/50 hover:bg-purple-950/20"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Active Windows</span>
              <Clock className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl font-black text-purple-300">{activeMigrations.length || 34}</div>
            <div className="text-[11px] text-purple-400/90 font-mono mt-0.5">CAF &amp; Altitudinal</div>
          </div>
        </div>
      </div>

      {/* Module Navigation - 3 Groups */}
      <div className="container mx-auto px-6 py-16">
        {/* Species Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Species
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Species Directory & Taxonomic Groups
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {speciesGroup.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => router.push(item.href)}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-emerald-500/30 transition-all text-left group"
            >
              <item.icon className="w-6 h-6 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-white text-sm mb-1">{item.label}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </motion.button>
          ))}
        </div>

        {/* Observation & Ecology Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-sky-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Observation & Ecology
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Wildlife Sightings, Migration & Ecological Records
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-16">
          {observationGroup.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => router.push(item.href)}
              className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-5 hover:bg-white/10 hover:border-sky-500/30 transition-all text-left group"
            >
              <item.icon className="w-6 h-6 text-sky-400 mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-white text-sm mb-1">{item.label}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </motion.button>
          ))}
        </div>

        {/* Seasonal Ecology & Phenology Group (Dedicated Module Space) */}
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-16">
          {seasonalEcologyGroup.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              onClick={() => router.push(item.href)}
              className="bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-amber-950/20 border border-white/10 hover:border-amber-500/40 rounded-xl p-5 hover:bg-amber-950/20 transition-all text-left group relative overflow-hidden"
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <item.icon className="w-6 h-6 text-amber-400 group-hover:scale-110 group-hover:text-amber-300 transition-all" />
                {item.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {item.badge}
                  </span>
                )}
              </div>
              <div className="font-semibold text-white text-sm mb-1 group-hover:text-amber-200 transition-colors">
                {item.label}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">
                {item.desc}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Intelligence Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-violet-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Intelligence
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            District Profiles & Analytics Dashboards
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {intelligenceGroup.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => router.push(item.href)}
              className="bg-white/5 border border-white/10 rounded-xl p-3 md:p-5 hover:bg-white/10 hover:border-violet-500/30 transition-all text-left group"
            >
              <item.icon className="w-6 h-6 text-violet-400 mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-white text-sm mb-1">{item.label}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Active Migration Periods */}
      <div className="container mx-auto px-6 py-16 bg-gradient-to-b from-slate-950 to-sky-950/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col items-center gap-3 mb-3">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Active Migration Periods</h2>
                <p className="text-xs sm:text-sm text-slate-400">Current migratory bird activity across Kashmir wetlands</p>
              </div>
            </div>
            <Button
              size='sm'
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity/migration-windows')}
            >
              View Migration Calendar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {migrationWindows.slice(0, 4).map((mw) => (
            <Card key={mw.id} className="border border-white/10 bg-slate-900/50" padding="md">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white text-sm">{mw.name}</h3>
                  <div className="text-xs text-slate-500 capitalize">{mw.district}</div>
                </div>
                <Badge variant="default" className="text-xs bg-sky-500/20 text-sky-300">
                  {mw.migrationType}
                </Badge>
              </div>
              <div className="text-xs text-slate-400 mb-2">
                Peak: {mw.peakPresenceMonths?.map(m => new Date(2026, m - 1).toLocaleString('default', { month: 'short' })).join(', ') || 'Various'}
              </div>
              <div className="text-xs text-slate-500">
                {mw.primarySpecies.slice(0, 3).join(', ')}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Phenology & Flowering */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col items-center gap-3 mb-3">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Flower2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Recent Phenology & Flowering Records</h2>
                <p className="text-xs sm:text-sm text-slate-400">Latest flowering, breeding, and seasonal activity observations</p>
              </div>
            </div>
            <Button
            size='sm'
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity/phenology-flowering')}
            >
              All Phenology Records
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentPhenology.map((record) => (
            <Card key={record.id} className="border border-white/10 bg-slate-900/50" padding="md">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm mb-1">{record.title}</h3>
                  {record.speciesCommonName && (
                    <div className="text-xs text-slate-400">{record.speciesCommonName}</div>
                  )}
                </div>
                <Badge variant="default" className="text-xs bg-emerald-500/20 text-emerald-300 capitalize">
                  {record.recordType.replace('-', ' ')}
                </Badge>
              </div>
              <div className="text-xs text-slate-500">
                Districts: {record.districts.slice(0, 2).join(', ')}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Status: <span className="text-slate-300 capitalize">{record.verificationStatus.replace('-', ' ')}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Habitat Signals Alert Band */}
      <div className="container mx-auto px-6 py-16 bg-gradient-to-b from-slate-950 to-amber-950/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col items-center gap-3 mb-3">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Habitat Signal Alerts</h2>
                <p className="text-xs sm:text-sm text-slate-400">Seasonal habitat transitions and stress indicators</p>
              </div>
            </div>
            <Button
              size='sm'
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity/habitat-signals')}
            >
              All Habitat Signals
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habitatSignals.slice(0, 3).map((signal) => (
            <Card key={signal.id} className="border border-white/10 bg-slate-900/50" padding="md">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-white text-sm">{signal.name}</h3>
                <Badge variant="default" className="text-xs bg-amber-500/20 text-amber-300 capitalize">
                  {signal.signalType.replace('-', ' ')}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mb-3 line-clamp-2">{signal.description}</p>
              <div className="text-xs text-slate-500">
                Districts: {signal.districts.slice(0, 3).join(', ')}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* District Biodiversity Leaders */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-col items-center gap-3 mb-3">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">District Biodiversity Leaders</h2>
                <p className="text-xs sm:text-sm text-slate-400">Top districts by species richness and conservation significance</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity/district-profiles')}
            >
              All District Profiles
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
              <div className="text-xl font-bold text-white">{district.totalSpecies}</div>
              <div className="text-xs text-slate-400 truncate">{district.district}</div>
              <div className="text-xs text-slate-500 mt-1">
                {district.threatenedSpecies} threatened
              </div>
            </button>
          ))}
        </div>
      </div>

      
    </main>
  );
}
