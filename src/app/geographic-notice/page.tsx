'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import {
  Globe, Shield, MapPin, Compass, CheckCircle2,
  AlertTriangle, Mountain, Droplets, LeafyGreen,
  Activity, ArrowRight, ExternalLink, Mail, Award,
  Landmark, Cpu, BookOpen, Layers, Heart, Sparkles, Scale
} from 'lucide-react';

export default function GeographicNoticePage() {
  const [activeTab, setActiveTab] = useState<'notice' | 'framework' | 'neutrality' | 'covenant'>('notice');

  // Executive Metric Cards (Matching About, Mission, Founder, Contributors, Governance, Support, Contact)
  const macroStats = [
    { value: '100%', label: 'Non-Political Mandate', sub: 'Strictly scientific & operational', icon: Scale, color: 'text-emerald-400' },
    { value: 'Zero', label: 'Territorial Claims', sub: 'No sovereignty implications', icon: Shield, color: 'text-amber-400' },
    { value: '3 Tiers', label: 'Ecological Framework', sub: 'Core, Trans-Divisional, Transboundary', icon: Layers, color: 'text-sky-400' },
    { value: '20', label: 'Districts Monitored', sub: 'Hydrological & biospheric focus', icon: Mountain, color: 'text-purple-400' },
    { value: 'FAIR', label: 'Open Data Principles', sub: 'Findable, accessible & citable', icon: BookOpen, color: 'text-teal-400' },
    { value: 'Non-Comm', label: 'Knowledge Return Covenant', sub: 'Free public mountain observatory', icon: Heart, color: 'text-rose-400' },
  ];

  const frameworks = [
    {
      title: 'Kashmir Core Valley',
      badge: 'Primary Biosphere',
      desc: 'Central valley ecosystems, Dal & Wular basins, Jhelum floodplain, and immediately connected foothill catchments.',
      focus: 'High-density limnological health, urban air quality grids, municipal wastewater points, and Ramsar wetland dynamics.',
      icon: Droplets,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Trans-Divisional Corridor',
      badge: 'Inter-Regional Catchments',
      desc: 'Environmentally connected landscapes extending into adjoining mountain passes, high-altitude ranges, and regional forest tracts.',
      focus: 'Shared watersheds, alpine avalanche corridors, forest canopy health, and transhumant pastoral migratory pathways.',
      icon: Mountain,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20'
    },
    {
      title: 'Transboundary & Extended Basins',
      badge: 'Macro-Ecological Systems',
      desc: 'Broader Himalayan hydrological and cryospheric systems naturally connected to the upper Indus basin.',
      focus: 'Glacier mass balance (Kolhai, Machoi, Siachen), Central Asian Flyway avian corridors, and regional seismic fault dynamics.',
      icon: Globe,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/20'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      {/* ─── Hero Surface ────────────────────────────────────────────────────────── */}
      <Heading 
        icon={<Globe className="w-5 h-5 text-emerald-400" />}
        label="Official Legal & Geographic Notice"
        title="Geographic Notice & Environmental Boundaries"
        subtitle="Kashmir EcoWatch is an independent, non-political environmental intelligence initiative organized strictly around natural ecosystems, watersheds, and scientific baselines."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Legal' },
          { label: 'Geographic Notice' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#statement"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
            >
              <span>Read Official Notice</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/geographic-scope"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 hover:text-white border border-sky-500/30 hover:border-sky-400 font-semibold text-sm transition-all duration-300"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Geographic Scope Details</span>
            </Link>
            <Link
              href="/legal-notice"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-semibold text-sm transition-all"
            >
              <Shield className="w-4 h-4 text-amber-400" />
              <span>Full Legal Notice</span>
            </Link>
          </div>
        }
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 pt-8">
        
        {/* ─── Macro Stats Banner (Robust Responsive Cards with Zero Text Leak) ── */}
        <section className="relative z-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {macroStats.map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/10 bg-slate-900/70 backdrop-blur-md flex flex-col justify-between hover:border-emerald-500/40 transition-all shadow-xl min-h-[140px] overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`font-black tracking-tight leading-none ${stat.value.length > 7 ? 'text-lg sm:text-xl' : 'text-2xl sm:text-3xl'} ${stat.color}`}>
                      {stat.value}
                    </span>
                    <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0 opacity-70" />
                  </div>
                  <div className="mt-auto">
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight line-clamp-2">{stat.label}</p>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 leading-tight mt-1 line-clamp-2">{stat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── The Primary Definitive Geographic Notice Banner ───────────────────── */}
        <section id="statement" className="scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900/90 to-slate-950 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <Shield className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400 block">
                    Authoritative Operational Mandate
                  </span>
                  <h2 className="text-xl sm:text-3xl font-black text-white">
                    Official Geographic & Non-Political Notice
                  </h2>
                </div>
              </div>

              {/* Exact Verbatim Core Notice Text */}
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-950/80 border border-emerald-500/20 text-slate-200 text-base sm:text-lg leading-relaxed font-light mb-8">
                <p>
                  <strong className="text-emerald-400 font-bold">Geographic Notice: </strong>
                  Kashmir EcoWatch is an independent environmental intelligence initiative. Geographic names, maps, and administrative references used within this platform are applied exclusively for scientific, environmental, and operational purposes and do not imply any position regarding sovereignty, international boundaries, or territorial claims.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10 text-xs sm:text-sm text-slate-300">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Scientific Utility Only</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Labels and boundaries exist solely to index river basins, elevation gradients, and biodiversity habitats.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Strict Neutrality</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Zero political commentary, territorial advocacy, or endorsement of administrative status disputes.
                  </p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-white font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Biogeographic Truth</span>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    Rivers, weather fronts, and migratory wildlife respect physical topography, not geopolitical lines.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ─── Interactive Section Tabs ─────────────────────────────────────────── */}
        <section>
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Compass className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Policy Deep Dive</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Landscape Architecture & Guiding Principles
                </h2>
              </div>

              {/* Navigation Pills */}
              <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-white/10">
                {[
                  { id: 'notice', label: 'Ecosystem Reality', icon: LeafyGreen },
                  { id: 'framework', label: '3-Tier Framework', icon: Layers },
                  { id: 'neutrality', label: 'Scientific Neutrality', icon: Scale },
                  { id: 'covenant', label: 'Knowledge Return', icon: Heart }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* ─── Tab 1: Ecosystem Reality ───────────────────────────────────────── */}
            {activeTab === 'notice' && (
              <div className="space-y-6">
                <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/40 space-y-6">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Nature Does Not Recognize Administrative Boundaries
                  </h3>
                  <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    <p>
                      Rivers flow across jurisdictions. Migratory birds traverse mountain ranges and wetlands regardless of borders. Air quality, biodiversity corridors, glaciers, watersheds, floods, droughts, forest fires, invasive species, and climate-related hazards operate across interconnected landscapes.
                    </p>
                    <p>
                      Environmental intelligence therefore requires analysis at the scale of ecosystems rather than administrative units alone. Kashmir EcoWatch adopts a regional ecological framework that enables integrated watershed monitoring, glacier ablation telemetry, and long-term ecological trend analysis across the Western Himalayas.
                    </p>
                    <p>
                      This approach reflects international environmental monitoring practices used by scientific institutions, conservation organizations, and environmental observatories worldwide, including UNEP, ICIMOD, and the Global Biodiversity Information Facility (GBIF).
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Tab 2: 3-Tier Operational Framework ────────────────────────────── */}
            {activeTab === 'framework' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {frameworks.map((fw, idx) => (
                    <div
                      key={idx}
                      className={`glass-panel p-7 rounded-3xl border ${fw.bg} flex flex-col justify-between hover:-translate-y-1.5 transition-all shadow-xl`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <fw.icon className={`w-8 h-8 ${fw.color}`} />
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                            {fw.badge}
                          </span>
                        </div>
                        <h4 className="text-xl font-bold text-white mb-2">{fw.title}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed mb-4">{fw.desc}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-slate-950/70 border border-white/5 text-[11px] text-slate-400 leading-relaxed">
                        <strong className="text-slate-200 block mb-0.5">Monitoring Focus:</strong>
                        {fw.focus}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Tab 3: Scientific Neutrality ───────────────────────────────────── */}
            {activeTab === 'neutrality' && (
              <div className="space-y-6">
                <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/40 space-y-6">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Guaranteed Scientific Neutrality & Data Integrity
                  </h3>
                  <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    <p>
                      Kashmir EcoWatch is an open, evidence-based scientific platform. All geographic references, maps, environmental classifications, datasets, monitoring systems, and analytical frameworks are presented solely for environmental, scientific, educational, conservation, and public-interest purposes.
                    </p>
                    <p>
                      Nothing contained within the platform should be interpreted as expressing, supporting, rejecting, or implying any position regarding sovereignty, territorial claims, political status, boundary disputes, administrative legitimacy, or geopolitical matters.
                    </p>
                    <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/20 text-emerald-300 italic text-sm">
                      "Nature is interconnected. Environmental intelligence should be too."
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Tab 4: Knowledge Return Covenant ───────────────────────────────── */}
            {activeTab === 'covenant' && (
              <div className="space-y-6">
                <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/40 space-y-6">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    A Sovereign Knowledge Return System for Kashmir
                  </h3>
                  <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    <p>
                      For more than a century, field researchers, international expeditions, and academic institutions have gathered extensive ecological, botanical, and hydrological data about Kashmir. However, much of that knowledge has remained locked in foreign paywalled journals, closed university repositories, or disparate government archives.
                    </p>
                    <p>
                      KEW synthesizes, harmonizes, and returns that intellectual wealth back to Kashmir — making it freely accessible to local researchers, youth, planners, and communities without commercial monetization.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* ─── Quick Legal Cross-Links Hub ──────────────────────────────────────── */}
        <section>
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { title: 'Privacy Policy', desc: 'Data privacy & telemetry collection', href: '/privacy', icon: Shield },
                { title: 'Terms of Use', desc: 'Acceptable use & FAIR guidelines', href: '/terms', icon: BookOpen },
                { title: 'Accessibility', desc: 'WCAG 2.1 AA screen reader standards', href: '/accessibility', icon: EyeIcon },
                { title: 'Legal Notice', desc: 'Statutory compliance & disclaimers', href: '/legal-notice', icon: Scale }
              ].map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="glass-panel p-5 rounded-2xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/80 transition-all flex flex-col justify-between group"
                >
                  <link.icon className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors mb-3" />
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors mb-1">{link.title}</h4>
                    <p className="text-[11px] text-slate-400 leading-snug">{link.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Institutional Backing & Reciprocal Links ─────────────────────────── */}
        <section>
          <div className="max-w-6xl mx-auto">
            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/30 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="space-y-2 text-center md:text-left">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 uppercase tracking-wider font-semibold">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Philanthropic Sponsorship & Engineering Delivery</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Spearheaded by Mr. Fayaz Ahmad Khan & Supported by Dr. Kumar Foundation USA
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                  Maintained with zero commercial monetization as a permanent Knowledge Return System for Kashmir, with enterprise cloud engineering provided gratis by Prime Logic Solutions under Corporate Social Responsibility (CSR).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <Link
                  href="/about/founder"
                  className="px-5 py-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>Founder Leadership</span>
                </Link>
                <Link
                  href="/about/contact"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <span>Contact Desk</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}
