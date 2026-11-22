const fs = require('fs');

const governanceCode = `'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trees, BookOpen, Globe2, Mountain, Shield, Quote,
  ArrowRight, ExternalLink, CheckCircle2, Layers, Activity,
  Droplets, Feather, Flame, Scale, Compass, Sparkles, Map,
  Award, Info, FileText, Check, ShieldCheck
} from 'lucide-react';

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'principles' | 'operations' | 'charter'>('comparison');

  // Identifiable historical and institutional reference points (replacing invented scores)
  const historicalFacts = [
    {
      value: '14th C.',
      label: 'Historical Origin',
      sub: "Kashmir's Rishi tradition (c. 1377/1378–1440 CE)",
      icon: BookOpen,
      color: 'text-emerald-400'
    },
    {
      value: '1992',
      label: 'Rio Earth Summit',
      sub: 'Modern international milestone (UNCED Agenda 21)',
      icon: Globe2,
      color: 'text-sky-400'
    },
    {
      value: '27',
      label: 'Rio Principles',
      sub: 'Multilateral global environmental framework',
      icon: Scale,
      color: 'text-amber-400'
    },
    {
      value: '5',
      label: 'KEW Coverage Regions',
      sub: 'Western Himalayan transboundary scope',
      icon: Mountain,
      color: 'text-purple-400'
    }
  ];

  // Comparative Framework: Moral Ecology vs. Modern Environmental Governance
  const comparisonMatrix = [
    {
      dimension: 'Foundation',
      alamdar: 'Ethical and spiritual responsibility rooted in Kashmiri Rishi contemplative practice',
      modern: 'Empirical science, international environmental law, statutory policy, and public participation'
    },
    {
      dimension: 'Central Concern',
      alamdar: 'Human dependence on living nature ("Ann poshi teli yeli wan poshi")',
      modern: 'Ecological protection, pollution abatement, biodiversity preservation, and sustainable development'
    },
    {
      dimension: 'Communication',
      alamdar: 'Oral vernacular poetry (Shruks), cultural memory, and lived community ethics',
      modern: 'Scientific peer-reviewed evidence, multilateral treaties, legal statutes, and policy instruments'
    },
    {
      dimension: 'Accountability',
      alamdar: 'Moral conscience, communal stewardship, and intergenerational reverence for the sacred landscape',
      modern: 'Public regulatory authorities, legal compliance, statutory reporting, and sensor-based monitoring'
    },
    {
      dimension: 'Environmental Knowledge',
      alamdar: 'Place-based indigenous wisdom, natural seasonal observation, and contemplative awareness',
      modern: 'Empirical measurement, Earth observation satellite telemetry, numerical modeling, and laboratory testing'
    },
    {
      dimension: 'KEW Application',
      alamdar: 'Ethical orientation: defines the moral purpose and civic responsibility of the platform',
      modern: 'Operational execution: defines analytical methods, sensor telemetry pipelines, and independent verification'
    }
  ];

  // KEW's Five Principles of Ecological Governance
  const governancePrinciples = [
    {
      id: 1,
      title: 'Ecological Interdependence',
      subtitle: 'Living Systems & Food Security',
      desc: 'Recognizing the inseparable relationships connecting mountain forests, headwater river basins, floodplain wetlands, biodiversity, agricultural soil health, and mountain community livelihoods. Disruption of one component inevitably destabilizes the whole.',
      icon: Trees,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      id: 2,
      title: 'Scientific Integrity',
      subtitle: 'Evidence, Traceability & Disclosed Uncertainty',
      desc: 'Maintaining strict evidence-based environmental assessments, transparent open methodologies, provenance-tracked data streams, and clear disclosure of scientific margins of uncertainty. Traditional wisdom inspires our inquiry; empirical verification dictates our findings.',
      icon: ShieldCheck,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20'
    },
    {
      id: 3,
      title: 'Public Environmental Knowledge',
      subtitle: 'Open Data & Democratic Access',
      desc: 'Ensuring that environmental datasets, satellite indicators, water quality measurements, and hazard intelligence remain accessible to local communities, students, researchers, and public institutions without commercial barriers, subject only to legitimate life-safety constraints.',
      icon: BookOpen,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      id: 4,
      title: 'Intergenerational Stewardship',
      subtitle: 'Responsibility Beyond the Present',
      desc: 'Grounding every conservation assessment and infrastructure review in long-term ecological consequences. The ecosystems of the Western Himalaya are not disposable inheritances for short-term consumption, but shared trusts held on behalf of generations yet unborn.',
      icon: Compass,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    },
    {
      id: 5,
      title: 'Independent Environmental Responsibility',
      subtitle: 'Objective Public-Interest Intelligence',
      desc: 'Upholding strict institutional independence from commercial, political, or jurisdictional interests. Environmental assessments, road corridor safety alerts, and hazard telemetry are delivered objectively based solely on verifiable ground and satellite truth.',
      icon: Scale,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20'
    }
  ];

  // From Moral Ecology to Measurable Scientific Systems
  const operationalModules = [
    {
      principle: 'Protect Forests & Vegetation',
      alamdarConcept: 'Wan Poshi (Living Forests)',
      kewModule: 'Forest Cover & Biodiversity Intelligence',
      desc: 'Satellite canopy density tracking, alpine habitat fragmentation modeling, endangered flora/fauna monitoring, and protected area GIS mapping.',
      link: '/biodiversity',
      color: 'text-emerald-400'
    },
    {
      principle: 'Protect Water & Springs',
      alamdarConcept: 'Nag & Chashma Reverence',
      kewModule: 'Water Systems & Limnology Hub',
      desc: 'Lake water quality indexation, Copernicus Sentinel-2 biomass proxy (NDCI), spring-shed mapping, river basin discharge, and groundwater reserves.',
      link: '/water-systems',
      color: 'text-sky-400'
    },
    {
      principle: 'Protect Food Systems & Soils',
      alamdarConcept: 'Ann Poshi (Enduring Nourishment)',
      kewModule: 'Sectoral EIA & Agricultural Resilience',
      desc: 'Pampore saffron landscape vulnerability, cement industrial dust dispersion modeling, agrarian catchment erosion, and soil health monitoring.',
      link: '/sectoral-eia',
      color: 'text-amber-400'
    },
    {
      principle: 'Protect Mountain Communities',
      alamdarConcept: 'Communal Care & Compassion',
      kewModule: 'Hazard Intelligence Command Center',
      desc: 'Decoupled road corridor landslide alerts, real-time seismic feeds (EMSC/USGS), avalanche bulletins, GLOF monitoring, and flash flood telemetry.',
      link: '/hazard-intelligence',
      color: 'text-rose-400'
    },
    {
      principle: 'Protect Future Generations',
      alamdarConcept: 'Intergenerational Trust',
      kewModule: 'Long-Term Climate & Cryosphere Records',
      desc: 'Multi-decadal glacial retreat observations, 25-year climate change baselines, permafrost thaw indices, and public ecological education.',
      link: '/environmental-calendar',
      color: 'text-purple-400'
    },
    {
      principle: 'Share Ecological Knowledge',
      alamdarConcept: 'Public Vernacular Wisdom',
      kewModule: 'Citizen Science & Open Data Commons',
      desc: 'Standardized field observations, public API feeds with zero VPS disk footprint, student field classrooms, and cross-border scientific exchanges.',
      link: '/join-citizen-science',
      color: 'text-teal-400'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      
      {/* ─── 1. INSTITUTIONAL HERO: ECOLOGICAL GOVERNANCE ──────────────────────── */}
      <section className="relative bg-slate-950 border-b border-white/10 overflow-hidden pt-28 sm:pt-32 md:pt-36 pb-12 sm:pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
          
          {/* Breadcrumbs */}
          <nav className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mb-4 sm:mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-medium">Governance &amp; Alamdar Ethos</span>
          </nav>

          {/* Super-title Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
            <Trees className="w-3.5 h-3.5" />
            <span>CIVILIZATIONAL WISDOM &amp; INSTITUTIONAL GOVERNANCE</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] mb-4 break-words">
            Ecological Governance Rooted in Kashmir&apos;s Civilizational Wisdom
          </h1>

          {/* Subtitle / Tagline */}
          <p className="text-sm sm:text-base md:text-lg font-semibold text-emerald-300/90 mb-4 tracking-wide">
            Sheikh Noor-ud-Din Wali · Scientific Stewardship · Environmental Responsibility
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-3xl leading-relaxed mb-8">
            Kashmir EcoWatch draws ethical inspiration from the ecological wisdom associated with Sheikh Noor-ud-Din Wali, revered as Sheikh-ul-Alam, Nund Rishi, and Alamdar-e-Kashmir. His enduring teaching on the interdependence of forests, water, and human nourishment provides the moral foundation for an institution dedicated to open environmental knowledge, disaster resilience, and scientific stewardship across the Western Himalaya.
          </p>

          {/* Contextual Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#maxim-section"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md transition-all duration-200"
            >
              <span>The Ecological Maxim</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#comparative-matrix"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-white/10 hover:border-emerald-500/30 font-semibold text-xs sm:text-sm transition-all duration-200"
            >
              <Scale className="w-4 h-4 text-sky-400" />
              <span>Comparative Governance</span>
            </a>
            <a
              href="#operational-systems"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-slate-900/60 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/5 hover:border-white/20 font-medium text-xs sm:text-sm transition-all duration-200"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Operational Systems</span>
            </a>
          </div>

        </div>
      </section>

      {/* ─── 2. IDENTIFIABLE HISTORICAL REFERENCE POINTS ────────────────────────── */}
      <section className="relative z-20 -mt-6 sm:-mt-8 container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {historicalFacts.map((fact, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-5 rounded-lg border border-white/10 bg-slate-900/90 backdrop-blur-md flex flex-col justify-between shadow-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-2xl sm:text-3xl font-black tracking-tight font-mono ${fact.color}`}>
                    {fact.value}
                  </span>
                  <fact.icon className="w-4 h-4 text-slate-400 opacity-70 shrink-0" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white leading-snug">{fact.label}</p>
                  <p className="text-[11px] text-slate-400 leading-tight mt-1">{fact.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24 max-w-5xl">

        {/* ─── 3. THE ENDURING ECOLOGICAL MAXIM IN CULTURAL CONTEXT ─────────────── */}
        <section id="maxim-section" className="scroll-mt-24">
          <div className="p-8 sm:p-12 rounded-lg border border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-900/90 to-slate-950 relative overflow-hidden text-center shadow-xl">
            <Quote className="absolute top-6 left-6 w-16 h-16 text-emerald-500/10 pointer-events-none" />
            <Quote className="absolute bottom-6 right-6 w-16 h-16 text-emerald-500/10 rotate-180 pointer-events-none" />

            {/* Sub-badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The Enduring Kashmiri Aphorism</span>
            </div>

            {/* Original Kashmiri Text */}
            <div className="mb-4">
              <p className="text-2xl sm:text-4xl font-arabic text-emerald-200 tracking-wide dir-rtl mb-2 select-text" dir="rtl">
                اَن پوشہِ تلہِ یلہِ وَن پوشہِ
              </p>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white italic tracking-tight font-serif">
                &ldquo;Ann Poshi Teli Yeli Wan Poshi&rdquo;
              </h2>
            </div>

            <p className="text-lg sm:text-2xl text-emerald-300 font-semibold mb-6">
              Food will endure as long as forests endure.
            </p>

            <div className="max-w-3xl mx-auto text-xs sm:text-sm text-slate-300 leading-relaxed text-left space-y-4 font-normal bg-slate-950/50 p-6 rounded-lg border border-white/5">
              <p>
                <strong className="text-white">Cultural &amp; Historical Context:</strong> Traditionally attributed to <strong className="text-white">Sheikh Noor-ud-Din Wali (c. 1377/1378–1440 CE)</strong>, this Kashmiri maxim expresses an acute empirical and spiritual recognition of the dependence of human survival upon living forests and healthy catchments.
              </p>
              <p>
                Its continuing significance lies not in anticipating modern environmental law word-for-word, but in articulating a civilizational responsibility that remains essential across centuries. Forests protect mountain watersheds, regulate hydrological discharge, influence local microclimates, stabilize steep slopes, and secure the nutrient cycles that underpin agrarian livelihoods.
              </p>
              <p className="text-emerald-300 font-medium pt-1">
                Ecological responsibility is not an imported concept in Kashmir. It is deeply rooted in the region&apos;s indigenous intellectual, spiritual, and literary heritage.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
              <span>Historical Attribution: c. 1377/1378 – 1440 CE</span>
              <span>·</span>
              <span>Literary Genre: Kashmiri Shruk</span>
              <span>·</span>
              <span>Significance: Ethical Interdependence</span>
            </div>
          </div>
        </section>

        {/* ─── 4. TWO TRADITIONS, A SHARED RESPONSIBILITY: COMPARATIVE MATRIX ───── */}
        <section id="comparative-matrix" className="scroll-mt-24 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                Comparative Governance
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Alamdar&apos;s Moral Ecology and the Rio Earth Summit
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-1 leading-relaxed">
              Six centuries separate Kashmir&apos;s Rishi tradition from the 1992 United Nations Conference on Environment and Development (UNCED). They emerged from different historical contexts and serve complementary purposes: one communicated ethical duty through collective cultural memory, while the other established multilateral treaties, legal frameworks, and regulatory mechanisms.
            </p>
          </div>

          {/* Interactive Matrix Tab Switcher */}
          <div className="flex flex-wrap gap-2 p-1 rounded-md bg-slate-900 border border-white/10 w-fit">
            {[
              { id: 'comparison', label: 'Comparative Framework', icon: Scale },
              { id: 'principles', label: 'Five Governance Principles', icon: ShieldCheck },
              { id: 'operations', label: 'Operational Modules', icon: Activity },
              { id: 'charter', label: 'Institutional Covenant', icon: BookOpen }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* TAB 1: COMPARATIVE MATRIX */}
          {activeTab === 'comparison' && (
            <div className="space-y-4">
              <div className="rounded-lg border border-white/10 bg-slate-900/50 overflow-hidden shadow-xl">
                <div className="p-4 sm:p-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      Comparative Analysis: Moral Ecology vs. Multilateral Governance
                    </h3>
                    <p className="text-xs text-slate-400">
                      Understanding how cultural wisdom and empirical governance address shared ecological imperatives.
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 px-2.5 py-1 rounded-sm bg-emerald-500/10 border border-emerald-500/20 uppercase tracking-wider font-bold w-fit">
                    14th C. ⇄ 1992 UNCED
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="border-b border-white/10 bg-slate-950/80 text-[11px] uppercase tracking-wider font-bold">
                        <th className="p-3.5 text-slate-300 w-1/4">Dimension</th>
                        <th className="p-3.5 text-emerald-400 w-3/8 bg-emerald-950/20">
                          Alamdar&apos;s Moral Ecology (14th Century)
                        </th>
                        <th className="p-3.5 text-sky-400 w-3/8 bg-sky-950/20">
                          Modern Environmental Governance (1992 Rio)
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-xs text-slate-300 divide-y divide-white/5">
                      {comparisonMatrix.map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-3.5 font-bold text-white bg-slate-950/40 border-r border-white/5 whitespace-nowrap">
                            {row.dimension}
                          </td>
                          <td className="p-3.5 leading-relaxed bg-emerald-950/10 border-r border-white/5 text-emerald-200">
                            {row.alamdar}
                          </td>
                          <td className="p-3.5 leading-relaxed bg-sky-950/10 text-slate-300">
                            {row.modern}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-4 bg-slate-950/80 border-t border-white/10 flex items-start gap-3 text-xs text-slate-300">
                  <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-white font-semibold">The Foundational Methodological Principle:</strong> Traditional ecological wisdom guides the questions Kashmir EcoWatch asks; rigorous scientific methods determine the empirical answers it publishes.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FIVE PRINCIPLES */}
          {activeTab === 'principles' && (
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-900/80 border border-white/10 mb-4 text-xs text-slate-300">
                <span className="font-semibold text-white">Institutional Translation:</span> The following five principles represent Kashmir EcoWatch&apos;s contemporary institutional interpretation of Alamdar&apos;s teaching, operationalized as governance commitments.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {governancePrinciples.map(p => (
                  <div
                    key={p.id}
                    className="p-5 sm:p-6 rounded-lg bg-slate-900/60 border border-white/10 flex flex-col justify-between hover:border-emerald-500/30 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-md ${p.bg}`}>
                            <p.icon className={`w-4 h-4 ${p.color}`} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                              Principle {p.id}
                            </span>
                            <h3 className="text-base font-bold text-white leading-tight">
                              {p.title}
                            </h3>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: OPERATIONAL APPLICATION */}
          {activeTab === 'operations' && (
            <div id="operational-systems" className="space-y-4">
              <div className="p-4 rounded-lg bg-slate-900/80 border border-white/10 mb-4 text-xs text-slate-300">
                <span className="font-semibold text-white">Translating Moral Ecology into Science:</span> How Kashmir EcoWatch connects civilizational ethics to measurable observation modules and open satellite telemetry.
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {operationalModules.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-lg bg-slate-900/50 border border-white/10 flex flex-col justify-between hover:border-emerald-500/30 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className={`text-xs font-bold ${m.color}`}>
                          {m.principle}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-white/5 border border-white/10 text-slate-400">
                          {m.alamdarConcept}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white mb-1.5">
                        {m.kewModule}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        {m.desc}
                      </p>
                    </div>
                    <Link
                      href={m.link}
                      className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1.5 pt-2 border-t border-white/5 transition-colors"
                    >
                      <span>Explore Scientific Module</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INSTITUTIONAL COVENANT */}
          {activeTab === 'charter' && (
            <div className="p-6 sm:p-8 rounded-lg bg-slate-900/60 border border-white/10 space-y-5 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                The KEW Institutional Covenant: Knowledge in Service of the Living Himalaya
              </h3>
              <p>
                Kashmir EcoWatch adopts Alamdar&apos;s ecological maxim as an enduring source of ethical inspiration, while grounding all environmental observations, impact models, and public telemetry in rigorous scientific evidence.
              </p>
              <p>
                The institution recognizes that no spiritual teaching, cultural heritage, governmental decree, or algorithmic model can substitute for traceable empirical verification. Its responsibility is to connect these distinct traditions without confusing their purposes.
              </p>
              <div className="p-4 rounded-md bg-slate-950 border border-white/10 my-4 text-center">
                <p className="text-sm sm:text-base font-bold text-emerald-300 font-serif">
                  Heritage inspires responsibility. Science establishes evidence. Governance safeguards integrity.
                </p>
              </div>
              <p className="text-center font-mono text-xs text-slate-400">
                Ann Poshi Teli Yeli Wan Poshi · May the forests endure, and with them the living foundations of the Western Himalaya.
              </p>
            </div>
          )}

        </section>

        {/* ─── 5. AN ETHOS BEYOND BORDERS: TRANSBOUNDARY HIMALAYAN ECOLOGY ───────── */}
        <section className="p-8 sm:p-10 rounded-lg bg-slate-900/40 border border-white/10 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Mountain className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">
                Transboundary Scope
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight">
              An Ethos Beyond Borders: Shared Ecology, Shared Responsibility
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The Western Himalaya encompasses interconnected mountain ecosystems, headwater catchments, continuous conifer forests, high-altitude cryospheric reserves, and human communities distributed across five distinct geographic regions: <strong className="text-white">Kashmir Valley, Jammu Division, Ladakh, Azad Kashmir, and Gilgit-Baltistan</strong>.
            </p>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Ecological processes—hydrological runoff, avalanche tracks, seismic fault slips, avian migrations, and atmospheric pollution—do not conform to administrative or geopolitical boundaries. Kashmir EcoWatch therefore approaches environmental intelligence as a shared regional public trust, respecting all jurisdictions while fostering open scientific collaboration, independent verification, and cross-border ecological stewardship.
            </p>
            <p className="text-xs sm:text-sm text-slate-400 font-mono pt-2">
              Coverage: Kashmir Core · Trans-Divisional (Jammu &amp; Ladakh) · Transboundary (Azad Kashmir &amp; Gilgit-Baltistan)
            </p>
          </div>
        </section>

        {/* ─── 6. REFERENCES & SOURCES ───────────────────────────────────────────── */}
        <section className="p-6 sm:p-8 rounded-lg bg-slate-950 border border-white/5 text-xs text-slate-400 space-y-4">
          <div className="flex items-center gap-2 text-slate-300 font-bold uppercase tracking-wider text-[11px]">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>Documentary Sources &amp; Scholarly Attribution</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] leading-relaxed">
            <div>
              <p className="font-semibold text-slate-300 mb-1">Traditional Kashmiri Maxim:</p>
              <p>
                The aphorism <em>&ldquo;Ann poshi teli yeli wan poshi&rdquo;</em> is universally recognized in Kashmiri oral literature and scholarly compilations of Sheikh Noor-ud-Din Wali&apos;s poetry (Rishi Nama traditions). Dates are historically documented as c. 1377/1378–1440 CE.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-300 mb-1">United Nations Rio Earth Summit (1992):</p>
              <p>
                United Nations Conference on Environment and Development (UNCED), Rio de Janeiro, 1992. Core outcomes include the Rio Declaration on Environment and Development (27 Principles), Agenda 21 (40 chapters), the UNFCCC, and the Convention on Biological Diversity (CBD).
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
`;

fs.writeFileSync('src/app/about/governance/page.tsx', governanceCode, 'utf8');
console.log('Governance page successfully updated with historical accuracy and institutional redesign!');
