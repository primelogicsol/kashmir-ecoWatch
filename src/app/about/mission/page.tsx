'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import {
  Target, Map, Shield, Eye, ShieldCheck, FileCheck, MapPin,
  LockOpen, Compass, ArrowRight, CheckCircle2, Sparkles, Activity,
  Globe, Database, Users, Calendar, Flag, Award, Milestone,
  Layers, ExternalLink, BookOpen, Heart, Cpu, Zap, Mountain,
  Droplets, AlertTriangle, ChevronRight, Trees, Scale
} from 'lucide-react';

export default function MissionPage() {
  const [selectedPhase, setSelectedPhase] = useState<number>(0);

  // Strategic Targets Banner
  const strategicTargets = [
    { year: '2026', title: 'Data Unification', desc: 'Harmonize 6 core domains into a single open-access schema', icon: Database, color: 'text-emerald-400' },
    { year: '2027', title: 'Citizen Grid', desc: 'Deploy verified community observers across all 20 districts', icon: Users, color: 'text-sky-400' },
    { year: '2028', title: 'Global Interlock', desc: 'Publish full UN SDG, Sendai DRR & CBD indicator matrices', icon: Globe, color: 'text-amber-400' },
    { year: '2029', title: 'Cryosphere Resilience', desc: 'Launch high-altitude mass balance & 5,000+ spring-shed models', icon: Mountain, color: 'text-purple-400' },
    { year: '2030', title: 'Himalayan Benchmark', desc: 'The definitive open reference for mountain ecological intelligence', icon: Award, color: 'text-rose-400' },
    { year: '100%', title: 'Non-Commercial', desc: 'Guaranteed free public access and philanthropic independence', icon: Heart, color: 'text-teal-400' },
  ];

  // Detailed 5-Year Roadmap Phases
  const roadmapPhases = [
    {
      year: '2026',
      phase: 'Phase 1: Convergence & Foundation',
      badge: 'Active Execution',
      badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      summary: 'Unify disparate environmental streams across biodiversity, water systems, climate resilience, and hazards into a single high-performance public observatory.',
      deliverables: [
        'Ingest over 4,200 species records into Darwin Core compliant formats',
        'Standardize 1,000+ hydrological bodies including lakes, rivers, and NWIA classified wetlands',
        'Integrate real-time satellite telemetry from NASA FIRMS, USGS Earthquakes, and Open-Meteo',
        'Deploy the Kashmir NGO Impact Registry cataloguing 50+ grassroots environmental groups',
        'Establish baseline environmental monitoring for air quality, solid waste, and municipal STPs across 20 districts'
      ]
    },
    {
      year: '2027',
      phase: 'Phase 2: Decentralized Citizen Science & District Deepening',
      badge: 'Scaling Ground Truth',
      badgeColor: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
      summary: 'Empower local youth, mountain guides, foresters, and university scholars to contribute high-fidelity observational data from remote alpine valleys.',
      deliverables: [
        'Deploy mobile-first observational intake with offline caching for non-networked high-altitude zones (Gurez, Karnah, Warwan, Padder)',
        'Implement automated sensitivity masking algorithms to safeguard endangered wildlife (Hangul, Snow Leopard, Musk Deer) from poaching risk',
        'Conduct community data verification workshops with colleges across both Kashmir and Jammu divisions',
        'Expand high-resolution flood zone vulnerability overlays along Jhelum and Chenab tributary floodplains'
      ]
    },
    {
      year: '2028',
      phase: 'Phase 3: Global Multilateral Interlock & Indicator Dashboards',
      badge: 'Policy & Standards',
      badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
      summary: 'Bridge micro-watershed and district observations directly into United Nations, Sendai Framework, and CBD reporting mechanisms.',
      deliverables: [
        'Publish dedicated UN Sustainable Development Goal dashboards tracking SDG 6 (Clean Water), 11 (Resilient Cities), 13 (Climate Action), and 15 (Life on Land)',
        'Deploy Sendai Framework Priority 1 multi-hazard risk assessment models for flash floods, landslides, and avalanches',
        'Launch public GraphQL and REST Open APIs for accredited universities, research institutes, and environmental journalists',
        'Release the first biennial State of the Kashmir Environment Open Data Compendium'
      ]
    },
    {
      year: '2029',
      phase: 'Phase 4: Cryosphere & Spring-Shed Resilience Modeling',
      badge: 'Advanced Telemetry',
      badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      summary: 'Address the frontline impact of climate heating on Western Himalayan glaciers, permanent snowfields, and subterranean drinking water aquifers.',
      deliverables: [
        'Long-term glacial mass balance monitoring and retreat tracking for Kolhai, Machoi, and Thajwas glaciers',
        'Comprehensive geospatial vulnerability atlas of 5,000+ rural drinking water springs (naags/chashmas) sustaining mountain villages',
        'High-resolution forest fire spread predictive modeling incorporating fuel load index, slope aspect, and real-time wind vectors',
        'Cross-basin hydrological connectivity models linking upper alpine catchments to downstream agricultural irrigation'
      ]
    },
    {
      year: '2030',
      phase: 'Phase 5: Pan-Himalayan Open Science Standard',
      badge: 'Long-Term Legacy',
      badgeColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
      summary: 'Solidify Kashmir EcoWatch as the preeminent, enduring open-access standard for mountain environmental intelligence across the Western Himalayas.',
      deliverables: [
        'Establish permanent Long-Term Ecological Research (LTER) data archives covering two decades of climatic and biodiversity shifts',
        'Full transition to community-governed data stewardship with academic advisory oversight',
        'Open-source repository release of the entire KEW geospatial and telemetry software architecture for other mountain bioregions',
        'Sustained philanthropic endowment ensuring zero paywalls, commercial advertisements, or subscription barriers forever'
      ]
    }
  ];

  // Theory of Change
  const theorySteps = [
    {
      step: '01',
      title: 'Multimodal Telemetry',
      desc: 'Orbital remote sensing (Sentinel, Landsat) + USGS seismic stations + NASA FIRMS + Open-Meteo + frontline citizen sightings.',
      icon: Cpu,
      color: 'from-blue-500 to-cyan-500',
      border: 'border-blue-500/30'
    },
    {
      step: '02',
      title: 'Scientific Validation',
      desc: 'Rigorous 8-stage verification pipeline, Darwin Core standardization, geospatial polygon linkage, and expert committee review.',
      icon: ShieldCheck,
      color: 'from-cyan-500 to-emerald-500',
      border: 'border-emerald-500/30'
    },
    {
      step: '03',
      title: 'Open Legibility',
      desc: 'Free, interactive public observatory, live alert streams, district health scorecards, and downloadable open datasets under FAIR rules.',
      icon: Globe,
      color: 'from-emerald-500 to-amber-500',
      border: 'border-amber-500/30'
    },
    {
      step: '04',
      title: 'Decisive Stewardship',
      desc: 'Local researchers, youth, planners, and conservationists take proactive action before irreversible ecological damage strikes the land.',
      icon: Zap,
      color: 'from-amber-500 to-purple-500',
      border: 'border-purple-500/30'
    }
  ];

  // The 6 Foundational Operating Principles
  const operatingPrinciples = [
    {
      icon: ShieldCheck,
      title: 'Evidence Over Narrative',
      desc: 'Empirical telemetry, satellite observations, and verified ground-truth data supersede administrative convenience, hype, or preconceived narratives.',
      tag: 'Integrity',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      icon: FileCheck,
      title: 'Attribution & Provenance',
      desc: 'Every single polygon, measurement, chart, and indicator is traceable to its source agency, methodology, timestamp, and confidence rating.',
      tag: 'Transparency',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      icon: MapPin,
      title: 'Indigenous & Local Ground Truth',
      desc: 'Generational ecological memory—from Gujjar-Bakarwal pastoralists to local wetland fisherfolk—is valued as primary empirical evidence.',
      tag: 'Community',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      icon: LockOpen,
      title: 'Radical Openness with Ethical Guardrails',
      desc: 'Data is open and freely downloadable by default. It is masked only when full public disclosure would endanger threatened wildlife or human lives.',
      tag: 'FAIR Science',
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20'
    },
    {
      icon: Scale,
      title: 'Scientific & Political Neutrality',
      desc: 'KEW exists strictly as an environmental intelligence platform. It maintains complete independence from political factions, borders, and partisan disputes.',
      tag: 'Objectivity',
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      icon: Heart,
      title: 'Permanent Non-Commercial Mandate',
      desc: 'KEW will never sell user data, monetize datasets, or charge subscription fees. Supported philanthropically by Dr. Kumar Foundation USA.',
      tag: 'Philanthropy',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20'
    }
  ];

  // Stakeholder Impact Matrix
  const stakeholders = [
    {
      role: 'Scholars & Universities',
      benefit: 'Access to standardized, citation-ready GIS layers, taxonomic registers, and historical telemetry across 20 districts.',
      icon: BookOpen,
      color: 'text-sky-400'
    },
    {
      role: 'Local Communities & Youth',
      benefit: 'Real-time hazard alerts for avalanches, flash floods, and fires, paired with intuitive tools to log local observations.',
      icon: Users,
      color: 'text-emerald-400'
    },
    {
      role: 'Grassroots NGOs & Stewards',
      benefit: 'Visibility via the KEW Impact Registry, verified field report tools, and empirical evidence to support local advocacy.',
      icon: Trees,
      color: 'text-amber-400'
    },
    {
      role: 'Policy Planners & Foresters',
      benefit: 'Multi-hazard situational awareness, wetland health metrics, and watershed vulnerability data to inform spatial planning.',
      icon: Target,
      color: 'text-purple-400'
    }
  ];

  // Subpages Navigation Links
  const relatedModules = [
    { title: 'Platform Overview', href: '/about', desc: 'The overarching architectural vision and vital statistics of KEW.', icon: Globe },
    { title: 'Founder Leadership', href: '/about/founder', desc: '25+ year career of Mr. Fayaz Ahmad Khan (PhD, FEMA APS, UN Certified).', icon: Award },
    { title: 'Ecological Governance', href: '/about/governance', desc: 'Sheikh Noor-ud-Din’s civilizational forest ethics & planetary boundaries.', icon: Scale },
    { title: 'Scientific Methodology', href: '/about/methodology', desc: '19-section documentation of data pipelines, taxonomic criteria & QA.', icon: BookOpen },
    { title: 'Institutional Partners', href: '/about/partners', desc: 'Academic institutions, universities, and research consortiums.', icon: Milestone },
    { title: 'Verification Protocols', href: '/about/verification', desc: 'Quality assurance workflows and sensitivity masking protocols.', icon: ShieldCheck },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      {/* ─── Hero Surface ────────────────────────────────────────────────────────── */}
      <Heading 
        icon={<Target className="w-5 h-5 text-emerald-400" />}
        label="Strategic Charter & Long-Term Roadmap"
        title="Western Himalayan Our Mission & Roadmap"
        subtitle="Make Kashmir’s fragile ecosystems legible, resilient, accountable, and protected through open Earth intelligence and community stewardship."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Our Mission' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#roadmap"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
            >
              <span>Explore 2026–2030 Roadmap</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#principles"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-white border border-white/10 hover:border-emerald-500/40 font-semibold text-sm transition-all duration-300 backdrop-blur-md"
            >
              <span>Operating Principles</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </a>
            <Link
              href="/about/founder"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 hover:border-white/20 font-medium text-sm transition-all duration-300"
            >
              <span>Founder Leadership</span>
              <Award className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        }
      />

      {/* ─── Strategic Targets Ribbon ───────────────────────────────────────────── */}
      <section className="relative z-20 -mt-6 sm:-mt-10 mb-16 container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {strategicTargets.map((target, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/40 transition-colors shadow-xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`text-2xl sm:text-3xl font-black tracking-tight ${target.color}`}>
                  {target.year}
                </span>
                <target.icon className="w-5 h-5 text-slate-400 shrink-0 opacity-70" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white leading-snug">{target.title}</p>
                <p className="text-[11px] text-slate-400 leading-tight mt-1 line-clamp-2">{target.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── Main Content Container ────────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

        {/* ─── Section 1: The Core Mandate & Urgency of Now ─────────────────────── */}
        <section className="relative">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">The Urgency of Now</span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-8">
              Why Kashmir EcoWatch Exists
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/50 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <p className="text-lg sm:text-xl text-slate-200 leading-relaxed font-light">
                    The Kashmir Himalayas form one of the world’s most ecologically exquisite, yet climate-vulnerable bioregions. It is a critical freshwater tower sustaining millions, yet it faces compounding ecological crisis.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Glaciers are retreating at unprecedented rates; winter precipitation is shifting erratically from deep snowpacks to violent cloudbursts; ancient freshwater wetlands (Dal, Wular, Hokersar) are choked with silt and sewage; and critical wildlife corridors for the critically endangered Hangul deer and Snow Leopard are shrinking.
                  </p>
                  <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                    Historically, response has been hampered by fragmented data: reports filed months after catastrophes, proprietary academic papers locked in Western journals, and a total disconnect between satellite data and on-the-ground reality.
                  </p>
                  <p className="text-emerald-400 font-semibold text-base sm:text-lg">
                    Our mission is simple yet transformative: so evidence reaches decisions before damage reaches the land.
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                      <Target className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Central Mandate</p>
                      <p className="text-sm font-bold text-white">Actionable High-Altitude Intelligence</p>
                    </div>
                  </div>
                  <Link
                    href="/atlas"
                    className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
                  >
                    <span>Launch Live Atlas</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* The Knowledge Return Manifesto */}
              <div className="lg:col-span-5 glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/30 via-slate-900/60 to-slate-950 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">
                    <Compass className="w-4 h-4" />
                    <span>The Knowledge Return Principle</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight">
                    Returning Intellectual Sovereignty to the Himalayas
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    For over a century, Himalayan ecological studies were produced by external expeditions and kept in distant libraries. Kashmir EcoWatch reverses this dynamic.
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    We aggregate, standardize, and repatriate global scientific findings back to the youth, students, researchers, and village elders who live along these riverbanks and mountain ridges.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-white/5 space-y-2">
                  <div className="text-xs font-semibold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Independent & Non-Commercial</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Zero corporate sponsorships, zero data monetization, zero political affiliation. Purely in service of ecological preservation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Section 2: Theory of Change ────────────────────────────────────────── */}
        <section>
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Systemic Impact</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2 mb-4">
                Our Theory of Change
              </h2>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
                How real-time environmental telemetry is converted into on-the-ground preservation and policy accountability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {theorySteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`glass-panel p-6 rounded-2xl border ${step.border} bg-slate-900/40 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`text-xs font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent uppercase tracking-wider`}>
                        STAGE {step.step}
                      </span>
                      <step.icon className="w-5 h-5 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug">{step.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 3: Detailed 5-Year Roadmap (2026–2030) ─────────────────────── */}
        <section id="roadmap" className="relative scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Strategic Horizon</span>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-1">
                  The 2026–2030 Strategic Roadmap
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Click through our five phased milestones to view core commitments and deliverables.
                </p>
              </div>

              {/* Year Navigation Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-white/10 rounded-xl overflow-x-auto max-w-full">
                {roadmapPhases.map((phase, idx) => (
                  <button
                    key={phase.year}
                    onClick={() => setSelectedPhase(idx)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedPhase === idx
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {phase.year}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Phase Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedPhase}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.2 }}
                className="glass-panel p-8 sm:p-10 rounded-3xl border border-emerald-500/20 bg-slate-900/60 shadow-2xl relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                        {roadmapPhases[selectedPhase].year}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${roadmapPhases[selectedPhase].badgeColor}`}>
                        {roadmapPhases[selectedPhase].badge}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white">
                      {roadmapPhases[selectedPhase].phase}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <Milestone className="w-4 h-4 text-emerald-400" />
                    <span>Milestone Phase 0{selectedPhase + 1} of 05</span>
                  </div>
                </div>

                <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed mb-8 max-w-3xl">
                  {roadmapPhases[selectedPhase].summary}
                </p>

                <div className="pt-6 border-t border-white/10 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    Core Technical Deliverables & Commitments
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {roadmapPhases[selectedPhase].deliverables.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/40 border border-white/5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-300 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ─── Section 4: Six Foundational Operating Principles ─────────────────────── */}
        <section id="principles" className="scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Ethical Foundation</span>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2 mb-4">
                Six Operating Principles
              </h2>
              <p className="text-sm sm:text-base text-slate-400">
                The non-negotiable scientific and ethical values governing every database entry, satellite ingestion, and published report on Kashmir EcoWatch.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {operatingPrinciples.map((val, idx) => (
                <div
                  key={idx}
                  className={`glass-panel p-7 rounded-3xl border ${val.bg} flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 hover:shadow-2xl`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-2xl bg-slate-900/80 border border-white/10">
                        <val.icon className={`w-6 h-6 ${val.color}`} />
                      </div>
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-400 uppercase">
                        {val.tag}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 leading-snug">{val.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 5: Stakeholder Beneficiaries & Impact Matrix ──────────────── */}
        <section>
          <div className="max-w-5xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 bg-slate-900/40">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-teal-400">Empowerment Matrix</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                Who Kashmir EcoWatch Serves
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Empowering diverse constituents across the Himalayan landscape with tailored ecological intelligence.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {stakeholders.map((s, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-slate-950/50 border border-white/5 flex gap-4 items-start">
                  <div className="p-3 rounded-xl bg-slate-900 border border-white/10 shrink-0 mt-0.5">
                    <s.icon className={`w-6 h-6 ${s.color}`} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white mb-1.5">{s.role}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{s.benefit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 6: Global Multilateral Standards Alignment ─────────────────── */}
        <section>
          <div className="max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Multilateral Accord</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-1">
                Connecting Kashmir to Global Conventions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'UN SDG 6 & 15', desc: 'Sustainable freshwater aquifers, wetland rejuvenation, and terrestrial montane preservation.', icon: Droplets, color: 'text-sky-400' },
                { title: 'Sendai DRR', desc: 'Priority 1 disaster risk understanding via real-time satellite alert feeds.', icon: Activity, color: 'text-rose-400' },
                { title: 'Kunming-Montreal GBF', desc: 'Target 3 tracking of 30x30 ecological corridors and endemic species protections.', icon: Mountain, color: 'text-emerald-400' },
                { title: 'Ramsar Convention', desc: 'Continuous monitoring of ecological character for Wular, Hokersar, Dal & Hygam.', icon: Shield, color: 'text-teal-400' }
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

        {/* ─── Section 7: Explore Sister About Modules ───────────────────────────── */}
        <section>
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Institutional Documentation</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight mb-4">
              Explore Related About Modules
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl mb-8">
              Deepen your understanding of our scientific methodology, founding leadership, civilizational governance, and institutional partnerships.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedModules.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="glass-panel p-5 rounded-2xl border border-white/10 bg-slate-900/40 hover:border-emerald-500/40 hover:bg-slate-900/70 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-9 h-9 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center mb-3 group-hover:border-emerald-500/40 transition-colors">
                      <item.icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">
                      {item.desc}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                    <span>Read Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Section 8: Call to Action Surface ─────────────────────────────────── */}
        <section className="pb-16">
          <div className="max-w-5xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 relative overflow-hidden text-center shadow-2xl">
            <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Join the Mission</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Help Us Protect Kashmir’s Living Landscape
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Whether you submit a local spring observation, contribute ecological research, or build on our open data, you play a vital role in our 2026–2030 mission.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/submit-observation"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-xl shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>Submit Field Observation</span>
                </Link>
                <Link
                  href="/atlas"
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-white/10 hover:border-emerald-500/30 font-semibold text-sm transition-all flex items-center gap-2"
                >
                  <Map className="w-4 h-4 text-emerald-400" />
                  <span>Explore Ecological Atlas</span>
                </Link>
                <Link
                  href="/about/contact"
                  className="px-6 py-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 hover:border-white/20 font-medium text-sm transition-all flex items-center gap-2"
                >
                  <span>Connect with Us</span>
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
