'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import {
  Shield, Database, Users, Globe, BookOpen, Map,
  CheckCircle2, ArrowRight, Activity, Droplets, Mountain,
  Sparkles, Compass, Layers, Eye, Cpu, Award, GraduationCap,
  ExternalLink, Heart, AlertTriangle, FileText, ChevronRight,
  Flame, Wind, HelpCircle, Binary, Landmark, Building2
} from 'lucide-react';

export default function AboutPage() {
  const [activeModuleTab, setActiveModuleTab] = useState<'biodiversity' | 'water' | 'hazards' | 'monitoring' | 'phenology' | 'stewardship'>('biodiversity');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Core Vital Statistics
  const macroStats = [
    { value: '20', label: 'Districts Monitored', sub: 'Comprehensive regional baseline', icon: Map, color: 'text-emerald-400' },
    { value: '4,200+', label: 'Taxa Documented', sub: 'Flora, fauna, avifauna & fungi', icon: Mountain, color: 'text-sky-400' },
    { value: '7', label: 'Real-Time Hazard Streams', sub: 'Open-Meteo, USGS, FIRMS & sensors', icon: Activity, color: 'text-rose-400' },
    { value: '150+', label: 'Protected Habitats', sub: 'Sanctuaries, parks & Ramsar wetlands', icon: Shield, color: 'text-amber-400' },
    { value: '8-Stage', label: 'Scientific Pipeline', sub: 'Rigorous multi-layer validation', icon: Cpu, color: 'text-purple-400' },
    { value: '100%', label: 'Public & Non-Commercial', sub: 'Open data & research integrity', icon: Globe, color: 'text-teal-400' },
  ];

  // The 4 Fundamental Pillars
  const pillars = [
    {
      icon: Shield,
      title: 'Ecological Integrity',
      description: 'Preserving the fragile Western Himalayan biosphere through peer-validated empirical observation, ground-truthed sensor telemetry, and community stewardship.',
      color: 'from-emerald-500/20 to-teal-500/20',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      tag: 'Core Ethos'
    },
    {
      icon: Database,
      title: 'Open Science & Provenance',
      description: 'Every dataset, geospatial layer, indicator calculation, and algorithmic transformation is open, fully auditable, and academically citable under FAIR principles.',
      color: 'from-blue-500/20 to-indigo-500/20',
      borderColor: 'border-blue-500/30',
      textColor: 'text-blue-400',
      tag: 'FAIR Data'
    },
    {
      icon: Users,
      title: 'Community-Led Evidence',
      description: 'Local knowledge, indigenous phenological memory, and citizen sightings are treated as first-class empirical data, rigorously corroborated alongside satellite passes.',
      color: 'from-amber-500/20 to-orange-500/20',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
      tag: 'Citizen Science'
    },
    {
      icon: Globe,
      title: 'Global Framework Interlock',
      description: 'Threading micro-watershed and district-level metrics directly into UN Sustainable Development Goals (SDG 6, 11, 13, 15), Sendai DRR, and Kunming-Montreal targets.',
      color: 'from-purple-500/20 to-pink-500/20',
      borderColor: 'border-purple-500/30',
      textColor: 'text-purple-400',
      tag: 'UN Standards'
    }
  ];

  // Core Modules Data
  const modulesData = {
    biodiversity: {
      title: 'Biodiversity & Species Intelligence',
      badge: '4,200+ Taxa Tracked',
      desc: 'An authoritative taxonomic directory of the Western Himalayan biodiversity hotspot, tracking native, endemic, invasive, and Red Data Book threatened taxa across elevation gradients.',
      features: [
        'Avian migration flyways & wetland counts (Dal, Wular, Hokersar, Haigam)',
        'Mammalian tracking including Snow Leopard, Hangul (Cervus hanglu hanglu), and Himalayan Brown Bear',
        'Endemic medicinal flora catalogued with IUCN Red List conservation statuses',
        'Cold-water fisheries monitoring across Jhelum, Lidder, and Sind drainages'
      ],
      link: '/biodiversity',
      linkText: 'Explore Biodiversity Module'
    },
    water: {
      title: 'Hydrology & Cryosphere Systems',
      badge: '1,000+ Hydrological Bodies',
      desc: 'High-resolution hydro-ecological monitoring of trans-Himalayan aquifers, glacial lakes, Jhelum tributaries, sub-watersheds, and Ramsar wetland ecosystems.',
      features: [
        'National Wetland Inventory (NWIA) hydro-morphological classifications',
        'Glacial lake outburst flood (GLOF) susceptibility and Siachen melt dynamics',
        'Spring-shed discharge tracking and rural potable aquifer vulnerability',
        'Limnological health metrics: Dissolved Oxygen, BOD, COD, and chlorophyll-a trends'
      ],
      link: '/water-systems',
      linkText: 'Explore Water Systems'
    },
    hazards: {
      title: 'Hazard & Early Warning Intelligence',
      badge: 'Real-Time Telemetry',
      desc: 'Multi-hazard situational awareness combining satellite Earth observation, seismic stations, and meteorological APIs for rapid hazard response across high-risk terrain.',
      features: [
        'NASA FIRMS satellite-detected thermal anomalies and active forest fire alerts',
        'USGS automated earthquake feed focused on the active Himalayan seismic belt',
        'Winter avalanche path mapping with snowpack depth and aspect analysis',
        'Flash flood early warning indices driven by Open-Meteo precipitation models'
      ],
      link: '/hazard-intelligence',
      linkText: 'Open Hazard Intelligence'
    },
    monitoring: {
      title: 'Environmental & Pollution Monitoring',
      badge: '20 Districts Baseline',
      desc: 'Systematic observation of human-induced stressors on the pristine Kashmir environment, providing public accountability and actionable compliance indicators.',
      features: [
        'Urban Air Quality Index (AQI) tracking particulate matter (PM2.5, PM10)',
        'Municipal solid waste dumping site mapping and landfill leachate tracking',
        'Sewage Treatment Plant (STP) operational capacity vs. untreated discharge',
        'Biomedical waste flow accounting and hazardous effluent hot-spotting'
      ],
      link: '/environmental-monitoring',
      linkText: 'Access Monitoring Dashboards'
    },
    phenology: {
      title: 'Seasonal Ecology & Earth Systems',
      badge: 'Phenological Calendars',
      desc: 'Mapping seasonal biological rhythms against climatic shifts to monitor how warming winters, erratic snowfalls, and shifted springs affect Himalayan ecosystems.',
      features: [
        'Wildflower and alpine meadow bloom window chronologies (Gulmarg, Sonamarg, Sinthan)',
        'Pollinator active windows and commercial apple orchard bloom synchrony',
        'Transhumant nomadic shepherd migratory trail calendars (Gaddi, Bakarwal)',
        'Wintering waterfowl arrival and departure shifts across Kashmir wetlands'
      ],
      link: '/seasonal-ecology',
      linkText: 'View Seasonal Calendars'
    },
    stewardship: {
      title: 'Citizen Science & Public Stewardship',
      badge: 'Public Impact Engine',
      desc: 'Empowering local foresters, youth, students, and mountaineers to record real-world ground truth, bridging high-orbit satellite data with on-the-ground reality.',
      features: [
        'Crowdsourced geolocated wildlife sightings with sensitivity masking for poaching prevention',
        'Direct reporting portal for illegal encroachments, timber cutting, and riverbed mining',
        'Registry of 50+ grassroots environmental NGOs working across Jammu & Kashmir',
        'Open dataset repositories for university researchers, journalists, and policy makers'
      ],
      link: '/citizen-science',
      linkText: 'Join Citizen Science Network'
    }
  };

  // 8-Stage Pipeline
  const pipelineSteps = [
    { step: '01', title: 'Data Ingestion', desc: 'Continuous automated ingestion from satellites (Sentinel, Landsat), USGS, NASA FIRMS, and verified sensor APIs.', color: 'from-blue-500 to-cyan-500' },
    { step: '02', title: 'Relevance Classification', desc: 'Algorithmic routing to specific thematic buckets: biodiversity, hydrology, hazard, or environmental monitoring.', color: 'from-cyan-500 to-teal-500' },
    { step: '03', title: 'Plausibility Check', desc: 'Geospatial bounding, elevation plausibility, timestamp consistency, and duplicate telemetry screening.', color: 'from-teal-500 to-emerald-500' },
    { step: '04', title: 'Standardization', desc: 'Harmonization against international schemas (Darwin Core for taxonomy, ISO 19115 for geospatial data).', color: 'from-emerald-500 to-green-500' },
    { step: '05', title: 'Geospatial Mapping', desc: 'Integration into interactive GIS vector layers, watershed polygon hierarchies, and district boundary maps.', color: 'from-green-500 to-amber-500' },
    { step: '06', title: 'Expert Peer Review', desc: 'Evaluation by the KEW Global Diaspora Environmental Expert Committee for sensitive species or high-impact hazards.', color: 'from-amber-500 to-orange-500' },
    { step: '07', title: 'Status Tagging', desc: 'Publication with transparent confidence badges: Verified, Institutionally Sourced, or Under Review.', color: 'from-orange-500 to-rose-500' },
    { step: '08', title: 'Living Feedback', desc: 'Continuous dynamic updating, community post-verification, and annual longitudinal retrospective audits.', color: 'from-rose-500 to-purple-500' }
  ];

  // Subpages Directory Hub
  const subpages = [
    {
      title: 'Our Mission & Roadmap',
      desc: 'The strategic vision, milestone roadmap (2026–2030), and operational values governing Kashmir EcoWatch.',
      href: '/about/mission',
      icon: Compass,
      tag: 'Strategy'
    },
    {
      title: 'Founder & Leadership',
      desc: 'Biography and 25+ year credentials of Dr. Fayaz Ahmad Khan (PhD, FEMA APS, EPA, UN Certified).',
      href: '/about/founder',
      icon: Award,
      tag: 'Leadership'
    },
    {
      title: 'Ecological Governance',
      desc: 'Bridging Sheikh Noor-ud-Din’s 14th-century forest ethics with 21st-century planetary boundaries and Rio frameworks.',
      href: '/about/governance',
      icon: Landmark,
      tag: 'Philosophy'
    },
    {
      title: 'Scientific Methodology',
      desc: 'Comprehensive 19-section documentation of data pipelines, taxonomic criteria, and validation standards.',
      href: '/about/methodology',
      icon: BookOpen,
      tag: 'Documentation'
    },
    {
      title: 'Research Partners',
      desc: 'Academic institutions, university departments, and environmental researchers collaborating with KEW.',
      href: '/about/partners',
      icon: GraduationCap,
      tag: 'Institutions'
    },
    {
      title: 'Verification Protocols',
      desc: 'Quality assurance workflows, sensitivity masking for endangered taxa, and incident corroboration steps.',
      href: '/about/verification',
      icon: CheckCircle2,
      tag: 'Quality'
    },
    {
      title: 'Authoritative Data Sources',
      desc: 'Detailed index of satellite programs, government gazettes, NGO reports, and meteorological data providers.',
      href: '/about/data-sources',
      icon: Database,
      tag: 'Data Index'
    },
    {
      title: 'Sponsorship & Support',
      desc: 'Philanthropic backing by Dr. Kumar Foundation USA and corporate CSR stewardship by Prime Logic Solutions.',
      href: '/about/support-sponsorship',
      icon: Heart,
      tag: 'Philanthropy'
    },
    {
      title: 'Contributor Community',
      desc: 'The dedicated network of scientists, forest rangers, local photographers, and student researchers.',
      href: '/about/contributors',
      icon: Users,
      tag: 'Network'
    },
    {
      title: 'Contact & Inquiries',
      desc: 'Get in touch for institutional collaboration, media verification, data sharing, or academic access.',
      href: '/about/contact',
      icon: ExternalLink,
      tag: 'Inquiries'
    }
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: 'What is Kashmir EcoWatch and who maintains it?',
      a: 'Kashmir EcoWatch (KEW) — formerly ESRO (Environment and Service Research Organization), established in 2004 — is an independent, non-commercial environmental intelligence platform and living observatory for the Kashmir Himalayas. It is spearheaded by Kashmiri-American environmental scientist Dr. Fayaz Ahmad Khan, supported and sponsored philanthropically by Dr. Kumar Foundation USA, and developed/maintained by Prime Logic Solutions under its Corporate Social Responsibility (CSR) initiative.'
    },
    {
      q: 'Why is it termed a "Knowledge Return System"?',
      a: 'For more than a century, field researchers, international expeditions, and academic institutions have gathered extensive ecological, botanical, and hydrological data about Kashmir. However, much of that knowledge has remained locked in foreign paywalled journals, closed university repositories, or disparate government archives. KEW synthesizes, harmonizes, and returns that intellectual wealth back to Kashmir—making it freely accessible to local researchers, youth, planners, and communities.'
    },
    {
      q: 'How does the platform ensure scientific accuracy and neutrality?',
      a: 'KEW operates strictly under evidence-based principles. All indicators are attributed to authoritative source datasets (such as Copernicus, USGS, NASA FIRMS, Open-Meteo, and peer-reviewed literature). Incoming community observations pass through an 8-stage verification pipeline, and the platform maintains scientific neutrality without taking political or territorial stances.'
    },
    {
      q: 'How can researchers and institutions use and cite KEW data?',
      a: 'All public datasets on KEW are provided under open science guidelines. Researchers, students, and journalists are encouraged to analyze, download, and cite the data. Standard academic citations should credit "Kashmir Environmental Watch (KEW) Observatory" alongside the primary provider attributed on the specific data page.'
    },
    {
      q: 'How do you safeguard sensitive and endangered wildlife from poaching?',
      a: 'In accordance with our Sensitivity Masking Protocol, precise geographic coordinates for critically endangered taxa (such as the Hangul deer, Snow Leopard, or threatened alpine herbs) are obfuscated or buffered to 10-25 km grid squares on public maps to prevent wildlife crime and unauthorized commercial foraging.'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* ─── Hero Surface ────────────────────────────────────────────────────────── */}
      <Heading 
        icon={<Shield className="w-5 h-5 text-emerald-400" />}
        label="Independent Environmental Intelligence Observatory · Est. 2004"
        title="Western Himalayan About the Platform"
        subtitle="Kashmir EcoWatch — formerly ESRO (Environment and Service Research Organization), established in 2004 — is a unified scientific observatory synthesising biodiversity, water systems, climate resilience, and hazard intelligence across the Kashmir Himalayas."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About Kashmir EcoWatch' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/about/mission"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
            >
              <span>Our Strategic Mission</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/about/founder"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 hover:border-emerald-500/40 font-semibold text-sm transition-all duration-300 backdrop-blur-md"
            >
              <span>Founder Leadership</span>
              <Award className="w-4 h-4 text-emerald-400" />
            </Link>
            <Link
              href="/open-data"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 hover:border-white/20 font-medium text-sm transition-all duration-300"
            >
              <Database className="w-4 h-4 text-sky-400" />
              <span>Open Data Portal</span>
            </Link>
          </div>
        }
      />

      {/* ─── Macro Vitals Strip ─────────────────────────────────────────────────── */}
      <section className="relative z-20 -mt-6 sm:-mt-10 mb-16 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {macroStats.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-2xl sm:text-3xl font-black tracking-tight ${item.color}`}>
                  {item.value}
                </span>
                <item.icon className="w-5 h-5 text-slate-400 shrink-0 opacity-70" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug">{item.label}</p>
                <p className="text-[11px] text-slate-400 leading-tight mt-1 truncate">{item.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Main Content Container ────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ─── Section 1: The Knowledge Return System & Manifesto ──────────────── */}
        <section className="relative">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Our Core Thesis</span>
              </div>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[11px] font-mono font-medium text-emerald-300">
                <Landmark className="w-3.5 h-3.5 text-emerald-400" />
                <span>Formerly ESRO (Environment and Service Research Organization) · Established 2004</span>
              </div>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-8">
              A Knowledge Return System for Kashmir
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/50 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-light">
                    Kashmir EcoWatch was conceived around a fundamental premise: <strong className="text-white font-semibold">knowledge about Kashmir belongs first and foremost to Kashmir.</strong>
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Originally established in <strong className="text-white font-semibold">2004</strong> as <strong className="text-emerald-400 font-semibold">ESRO (Environment and Service Research Organization)</strong>, our work began with grassroots field investigations, river and wetland monitoring, biodiversity surveys, and youth environmental education across the Kashmir Valley. Over more than two decades of dedicated scientific documentation, ESRO laid the foundation for Kashmir EcoWatch — evolving from grassroots field reports and community service into a comprehensive, high-resolution digital intelligence observatory.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    For centuries, explorers, glaciologists, and naturalists have traversed the Pir Panjal, Zanskar, and Greater Himalayan ranges. Yet, the empirical results of that work often stayed trapped in overseas repositories, subscription journals, or departmental silos.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    When rapid climate change triggers glacial retreat, altered snowfall regimes, seasonal water stress, and intensified flash floods, frontline communities and local researchers cannot wait for distant papers. They need <span className="text-emerald-400 font-medium">real-time, verifiable, open-access ecological intelligence</span> to protect life, water, and soil.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Rooted In</p>
                      <p className="text-sm font-bold text-white">Open Scientific Access & FAIR Principles</p>
                    </div>
                  </div>
                  <Link
                    href="/about/methodology"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Read Methodology</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Civilizational Heritage Box */}
              <div className="lg:col-span-5 glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 via-slate-900/60 to-slate-950 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
                    <Compass className="w-4 h-4" />
                    <span>Civilizational Heritage</span>
                  </div>
                  <blockquote className="border-l-4 border-emerald-500 pl-4 py-2 mb-6">
                    <p className="text-xl sm:text-2xl font-serif italic text-emerald-200 leading-snug">
                      &ldquo;Ann poshi teli yeli wan poshi&rdquo;
                    </p>
                    <footer className="text-xs text-slate-400 mt-2 font-mono">
                      — Sheikh Noor-ud-Din Noorani (Alamdar-e-Kashmir, 14th Century)
                    </footer>
                  </blockquote>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    Six centuries before modern Earth System Science formalised planetary boundaries, Kashmiri civilizational wisdom identified that food security and human survival depend directly on forest and water balance.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Living Bridge Principle</span>
                  </div>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Connecting global remote sensing telemetry with local indigenous ecological memory and district stewardship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Four Foundational Pillars ──────────────────────────────── */}
        <section>
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Guiding Tenets</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2 mb-4">
                The Four Pillars of Kashmir EcoWatch
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                Operating at the convergence of open data science, community stewardship, and high-altitude mountain environmental ethics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className={`glass-panel p-7 sm:p-8 rounded-3xl border ${pillar.borderColor} bg-slate-900/40 relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl`}
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${pillar.color} border border-white/10 flex items-center justify-center shrink-0`}>
                      <pillar.icon className={`w-7 h-7 ${pillar.textColor}`} />
                    </div>
                    <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                      {pillar.tag}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3: The Interactive Intelligence Ecosystem ─────────────────── */}
        <section className="relative">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-sky-400">System Architecture</span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
                  Core Intelligence Domains
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Explore how our 6 specialized intelligence engines monitor Kashmir’s biosphere.
                </p>
              </div>

              {/* Module Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-xl overflow-x-auto max-w-full">
                {[
                  { id: 'biodiversity', label: 'Taxa' },
                  { id: 'water', label: 'Hydrology' },
                  { id: 'hazards', label: 'Hazards' },
                  { id: 'monitoring', label: 'Monitoring' },
                  { id: 'phenology', label: 'Ecology' },
                  { id: 'stewardship', label: 'Citizen' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveModuleTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      activeModuleTab === tab.id
                        ? 'bg-emerald-500 text-slate-950 shadow-md font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Module Surface Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModuleTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="glass-panel p-8 sm:p-10 rounded-3xl border border-sky-500/20 bg-slate-900/60 shadow-2xl"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-semibold mb-3">
                      <Binary className="w-3.5 h-3.5" />
                      <span>{modulesData[activeModuleTab].badge}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white">
                      {modulesData[activeModuleTab].title}
                    </h3>
                  </div>

                  <Link
                    href={modulesData[activeModuleTab].link}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm border border-white/10 hover:border-sky-500/30 transition-all shrink-0 w-fit"
                  >
                    <span>{modulesData[activeModuleTab].linkText}</span>
                    <ArrowRight className="w-4 h-4 text-sky-400" />
                  </Link>
                </div>

                <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-3xl">
                  {modulesData[activeModuleTab].desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/10">
                  {modulesData[activeModuleTab].features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/40 border border-white/5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-300 leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Section 4: The 8-Stage Scientific Pipeline ────────────────────────── */}
        <section>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">Scientific Rigor</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Our 8-Stage Data Validation Pipeline
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-3xl mb-12">
              Every telemetry record, satellite detection, and citizen observation passes through an auditable eight-stage pipeline before being integrated into public intelligence dashboards.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {pipelineSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 bg-slate-900/40 flex flex-col justify-between hover:border-purple-500/30 transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-sm font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                        STEP {step.step}
                      </span>
                      <div className="w-2 h-2 rounded-full bg-slate-700 group-hover:bg-purple-400 transition-colors" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-2 leading-snug">{step.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <Link
                href="/about/methodology"
                className="inline-flex items-center gap-2 text-xs font-bold text-purple-400 hover:text-purple-300"
              >
                <span>Read the full 19-section methodology document</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Section 5: Institutional Governance & Founder ──────────────────────── */}
        <section className="relative">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Governance & Leadership</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2 mb-4">
                Founded in Science, Backed by Philanthropy
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                Operating with institutional transparency, multi-agency certified leadership, and philanthropic independence.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
              {/* Founder Profile Snapshot */}
              <div className="lg:col-span-8 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/50 flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-xl relative bg-slate-800">
                  <Image
                    src="/images/founder-profile.jpg"
                    alt="Dr. Fayaz Ahmad Khan"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>Honorary Director & Founder</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">Dr. Fayaz Ahmad Khan</h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Kashmiri-American environmental scientist and SaaS platform architect with <strong className="text-white">25+ years of experience</strong> leading 600+ multi-disciplinary disaster and critical infrastructure teams. Founder of <strong className="text-emerald-400">ESRO (Environment and Service Research Organization)</strong> in 2004, establishing the two-decade research lineage culminating in Kashmir EcoWatch. PhD in Environmental Geospatial Information Science with FEMA APS, EPA, and UN water security credentials.
                  </p>
                  <div className="pt-2 flex items-center gap-4 flex-wrap">
                    <Link
                      href="/about/founder"
                      className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                    >
                      <span>Full Bio & Certifications</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Sponsoring Foundation & CSR */}
              <div className="lg:col-span-4 space-y-4">
                <div className="glass-panel p-6 rounded-2xl border border-amber-500/20 bg-amber-950/10">
                  <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Heart className="w-4 h-4" />
                    <span>Philanthropic Sponsorship</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">Dr. Kumar Foundation USA</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Sole philanthropic patron funding Kashmir EcoWatch to guarantee 100% independent, non-commercial public access for generations to come.
                  </p>
                  <Link
                    href="/about/support-sponsorship"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold mt-3"
                  >
                    <span>Sponsorship Details</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="glass-panel p-6 rounded-2xl border border-sky-500/20 bg-sky-950/10">
                  <div className="flex items-center gap-2 text-sky-400 text-xs font-bold uppercase tracking-wider mb-2">
                    <Building2 className="w-4 h-4" />
                    <span>CSR Infrastructure Stewardship</span>
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">Prime Logic Solutions</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Engineering, cloud hosting, and continuous portal maintenance executed as part of its Corporate Social Responsibility (CSR) commitment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 6: Complete Subpages Directory Gateway ────────────────────── */}
        <section>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Platform Directory</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Explore the About Ecosystem
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mb-10">
              Deep dive into specific institutional documents, verification frameworks, methodology whitepapers, and partner networks.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {subpages.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="glass-panel p-6 rounded-2xl border border-white/10 bg-slate-900/40 hover:border-emerald-500/40 hover:bg-slate-900/70 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/40 transition-colors">
                        <item.icon className="w-5 h-5 text-emerald-400" />
                      </div>
                      <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/5">
                        {item.tag}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-6">
                      {item.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Open Module</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 7: Geographic Scope & Biomes ──────────────────────────────── */}
        <section>
          <div className="max-w-5xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-900/40">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Geographic Coverage</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  From Valley Marshes to High Himalayan Ridges
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Kashmir EcoWatch monitors the entire Western Himalayan ecotone, extending from the subtropical Jammu foothills through the temperate Kashmir Valley basin to the sub-alpine conifers of the Pir Panjal and cold desert trans-Himalayan biomes.
                </p>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                    <p className="text-lg font-bold text-emerald-400">20 Districts</p>
                    <p className="text-[11px] text-slate-400">10 Kashmir + 10 Jammu</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                    <p className="text-lg font-bold text-sky-400">300m - 7,000m+</p>
                    <p className="text-[11px] text-slate-400">Elevation continuum</p>
                  </div>
                </div>
                <Link
                  href="/geographic-scope"
                  className="inline-flex items-center gap-2 text-xs font-bold text-teal-400 hover:text-teal-300 pt-2"
                >
                  <span>View Full Geographic Notice & Boundaries</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="lg:col-span-6 space-y-3">
                {[
                  { name: 'Valley Floor & Wetlands', alt: '1,500m – 1,800m', desc: 'Alluvial floodplains, Jhelum meanders, Dal, Wular, and freshwater reedbeds.', color: 'border-emerald-500/30' },
                  { name: 'Karewa Terraces & Sub-Montane', alt: '1,800m – 2,400m', desc: 'Pleistocene plateau soils, saffron beds, apple belt, and transition woodlands.', color: 'border-amber-500/30' },
                  { name: 'Montane & Sub-Alpine Conifers', alt: '2,400m – 3,500m', desc: 'Dense deodar, blue pine, fir forests, and critical Hangul deer sanctuaries.', color: 'border-sky-500/30' },
                  { name: 'Alpine Meadows & Cryosphere', alt: '3,500m – 6,000m+', desc: 'Margs (Gulmarg, Sonamarg), high alpine cirque lakes, moraines, and glaciers.', color: 'border-purple-500/30' }
                ].map((biome, i) => (
                  <div key={i} className={`p-4 rounded-xl bg-slate-950/40 border ${biome.color}`}>
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-white">{biome.name}</h4>
                      <span className="text-[10px] font-mono text-slate-400">{biome.alt}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-snug">{biome.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 8: Global Framework Alignments ───────────────────────────── */}
        <section>
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Global Standards</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                Aligned with International Conventions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'UN SDG 6 & 15', desc: 'Clean water systems, aquatic preservation, and terrestrial ecosystem conservation.', icon: Droplets, color: 'text-sky-400' },
                { title: 'Sendai DRR', desc: 'Priority 1 disaster risk reduction through multi-hazard early warning telemetry.', icon: Activity, color: 'text-rose-400' },
                { title: 'Kunming-Montreal GBF', desc: 'Target 3 spatial tracking of 30x30 protected network conservation corridors.', icon: Mountain, color: 'text-emerald-400' },
                { title: 'Ramsar Convention', desc: 'Ecological character monitoring for Kashmir’s internationally recognized wetlands.', icon: Shield, color: 'text-teal-400' }
              ].map((item, idx) => (
                <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-900/40 text-center flex flex-col items-center">
                  <item.icon className={`w-8 h-8 ${item.color} mb-3`} />
                  <h4 className="text-sm font-bold text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 9: Frequently Asked Questions ─────────────────────────────── */}
        <section>
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Questions & Answers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;
                return (
                  <div
                    key={idx}
                    className="glass-panel rounded-2xl border border-white/10 bg-slate-900/40 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-white hover:text-emerald-300 transition-colors"
                    >
                      <span className="text-sm sm:text-base">{faq.q}</span>
                      <ChevronRight className={`w-4 h-4 text-emerald-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Section 10: Grand Call to Action Matrix ───────────────────────────── */}
        <section className="pb-16">
          <div className="max-w-5xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 relative overflow-hidden text-center shadow-2xl">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Participate & Explore</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Empower Kashmir’s Environmental Future
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Whether you are a university researcher, student, local community member, or mountaineer, your observations and inquiries help protect this living Himalayan sanctuary.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/atlas"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  <Map className="w-4 h-4" />
                  <span>Launch Ecological Atlas</span>
                </Link>
                <Link
                  href="/submit-observation"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-white/10 hover:border-emerald-500/30 font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4 text-emerald-400" />
                  <span>Submit Field Observation</span>
                </Link>
                <Link
                  href="/about/contact"
                  className="px-6 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 hover:border-white/20 font-medium text-sm transition-all flex items-center gap-2"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
