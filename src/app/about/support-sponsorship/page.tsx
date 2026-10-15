'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import { 
  Microscope, Database, Shield, Globe2, 
  ArrowRight, Activity, Users, BookOpen,
  Heart, Sparkles, Award, CheckCircle2,
  Building2, Cpu, ExternalLink, Mail,
  Landmark, HelpCircle, Layers, FileCheck,
  ChevronRight, Compass, ShieldCheck
} from 'lucide-react';

export default function SupportSponsorshipPage() {
  const [activeTab, setActiveTab] = useState<'tiers' | 'foundations' | 'csr' | 'faq'>('tiers');

  // Executive Metric Cards (Matching About, Mission, Founder, Contributors, Governance)
  const macroStats = [
    { value: '100%', label: 'Non-Commercial Mission', sub: 'Zero paywalls, ads, or monetization', icon: Heart, color: 'text-rose-400' },
    { value: 'Philanthropic', label: 'Primary Supporter', sub: 'Dr. Kumar Foundation USA', icon: Landmark, color: 'text-purple-400' },
    { value: 'CSR Backed', label: 'Platform Engineering', sub: 'Prime Logic Solutions USA', icon: Cpu, color: 'text-sky-400' },
    { value: '4 Tiers', label: 'Collaboration Pathways', sub: 'Research, data, field & knowledge', icon: Users, color: 'text-emerald-400' },
    { value: '20', label: 'Districts Monitored', sub: 'Open environmental telemetry', icon: Activity, color: 'text-amber-400' },
    { value: 'FAIR', label: 'Open Science Standards', sub: 'Findable, accessible & reusable', icon: Database, color: 'text-teal-400' },
  ];

  // 4 Collaboration Tiers
  const tiers = [
    {
      name: 'Research Partners',
      icon: Microscope,
      badge: 'Academic & Scientific',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      shadow: 'hover:shadow-emerald-500/10',
      description: 'University departments, scientific research councils, and environmental institutes collaborating on Himalayan ecology and hazard models.',
      features: [
        'Joint academic publications & peer reviews',
        'Raw dataset ingestion under Darwin Core standards',
        'High-altitude watershed & GLOF vulnerability studies',
        'Longitudinal ecological research (LTER) data sharing'
      ],
      buttonText: 'Become a Research Partner',
      buttonLink: '/about/partners#academic'
    },
    {
      name: 'Data Partners',
      icon: Database,
      badge: 'Telemetry & Sensor Grids',
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
      shadow: 'hover:shadow-sky-500/10',
      description: 'Government departments, open data repositories, space agencies, and automated river/air monitoring telemetry providers.',
      features: [
        'API feeds for weather, streamflow, and AQI',
        'Satellite imagery layer integration (Sentinel, Landsat)',
        'Geospatial boundary and polygon calibration',
        'Real-time automated incident and hazard feeds'
      ],
      buttonText: 'Share Environmental Data',
      buttonLink: '/contribute-data'
    },
    {
      name: 'Field Partners',
      icon: Shield,
      badge: 'Grassroots Ground Truth',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      shadow: 'hover:shadow-amber-500/10',
      description: 'Local environmental NGOs, mountain guides, community forest monitors, and volunteer naturalists across remote districts.',
      features: [
        'Geotagged observation and photo reporting',
        'Human-wildlife conflict sighting hot-spots',
        'Spring-shed (naag) drying and water crisis alerts',
        'Community verification workshops across J&K'
      ],
      buttonText: 'Join Field Network',
      buttonLink: '/citizen-science'
    },
    {
      name: 'Knowledge Partners',
      icon: BookOpen,
      badge: 'Policy & Public Discourse',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
      shadow: 'hover:shadow-indigo-500/10',
      description: 'Environmental jurists, policy analysts, independent scientists, and investigative environmental journalists.',
      features: [
        'Environmental Impact Assessment (EIA) reviews',
        'Policy briefs for local urban and forest bodies',
        'Traditional ecological knowledge (TEK) archives',
        'Multilateral UN SDG and Sendai alignment briefs'
      ],
      buttonText: 'Collaborate with KEW',
      buttonLink: '/about/contact'
    }
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: 'Does Kashmir EcoWatch accept commercial advertising or corporate sponsorships that compromise independence?',
      a: 'No. Kashmir EcoWatch is strictly non-commercial. It does not accept sponsored commercial advertisements, paid editorial content, or funding that exerts editorial or scientific influence over its observations or indicators.'
    },
    {
      q: 'How is the platform funded and maintained?',
      a: 'The platform is spearheaded by Mr. Fayaz Ahmad Khan, philanthropically supported and sponsored by Dr. Kumar Foundation USA, and developed and maintained by Prime Logic Solutions under its Corporate Social Responsibility (CSR) pledge gratis as an enduring Knowledge Return System for Kashmir.'
    },
    {
      q: 'Can our university or research laboratory access raw data for peer-reviewed studies?',
      a: 'Yes. All verified ecological observations, river gauge trends, and hazard telemetry are available under open FAIR principles for accredited academic researchers, educators, and public institutions upon request or via public exports.'
    },
    {
      q: 'How are sensitive species locations protected from poaching?',
      a: 'All sightings of endangered or vulnerable taxa (such as the Hangul, Snow Leopard, Musk Deer, or rare medicinal flora) undergo automated 5-kilometer spatial fuzzification and strict sensitivity masking before publication.'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      {/* ─── Hero Surface ────────────────────────────────────────────────────────── */}
      <Heading 
        icon={<Heart className="w-5 h-5 text-rose-400" />}
        label="Philanthropic Sponsorship & Collaboration"
        title="Support Kashmir EcoWatch"
        subtitle="An independent, non-commercial environmental intelligence initiative powered by philanthropic sponsorship, enterprise CSR engineering, and a global scientific network."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Support & Sponsorship' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#partnerships"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
            >
              <span>Collaboration Tiers</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/about/founder"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 hover:text-white border border-purple-500/30 hover:border-purple-400 font-semibold text-sm transition-all duration-300"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Founder Leadership</span>
            </Link>
            <Link
              href="/about/partners"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-semibold text-sm transition-all"
            >
              <Landmark className="w-4 h-4 text-sky-400" />
              <span>Institutional Network</span>
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

        {/* ─── The Non-Commercial Knowledge Return Covenant ─────────────────────── */}
        <section>
          <div className="max-w-6xl mx-auto">
            <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-950/20 via-slate-900/80 to-slate-950 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
              
              <div className="max-w-3xl mb-8">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Permanent Non-Commercial Mandate</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight mb-4">
                  Free, Sovereign Environmental Intelligence for the People of Kashmir
                </h2>
                <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                  Kashmir EcoWatch was conceived and architected as a <strong className="text-white font-semibold">Knowledge Return System</strong>. For over a century, ecological data has been locked behind foreign paywalls, closed repositories, or scattered archives. We return this intellectual wealth back to the valley — completely free from commercial monetization, paywalls, and advertisements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                  <Heart className="w-6 h-6 text-rose-400" />
                  <h3 className="text-base font-bold text-white">Zero Paywalls Forever</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    No subscriptions, no premium data tiers, and no monetization barriers for researchers, youth, or government planners.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-base font-bold text-white">Scientific Neutrality</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Strictly evidence-based, politically neutral, and dedicated solely to the ecological carrying capacity of the Western Himalayas.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-2">
                  <Cpu className="w-6 h-6 text-sky-400" />
                  <h3 className="text-base font-bold text-white">CSR Engineering</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Enterprise cloud infrastructure, telemetry processing, and continuous maintenance funded as Corporate Social Responsibility by Prime Logic Solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Interactive Section Tabs ─────────────────────────────────────────── */}
        <section id="partnerships" className="scroll-mt-24">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Collaboration Explorer</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Partnership Tiers & Institutional Pillars
                </h2>
              </div>

              {/* Navigation Pills */}
              <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-white/10">
                {[
                  { id: 'tiers', label: '4 Collaboration Tiers', icon: Users },
                  { id: 'foundations', label: 'Philanthropic Backing', icon: Landmark },
                  { id: 'csr', label: 'CSR Cloud Architecture', icon: Cpu },
                  { id: 'faq', label: 'Sponsorship FAQ', icon: HelpCircle }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
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

            {/* ─── Tab 1: 4 Collaboration Tiers ───────────────────────────────────── */}
            {activeTab === 'tiers' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
                  {tiers.map((tier, idx) => (
                    <div
                      key={idx}
                      className={`glass-panel p-7 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/40 flex flex-col justify-between hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl ${tier.shadow} group`}
                    >
                      <div>
                        <div className="flex items-start justify-between mb-6">
                          <div className={`p-4 rounded-2xl ${tier.bg} group-hover:scale-110 transition-transform`}>
                            <tier.icon className={`w-7 h-7 ${tier.color}`} />
                          </div>
                          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                            {tier.badge}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                          {tier.name}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed mb-6">
                          {tier.description}
                        </p>

                        <div className="space-y-2.5 mb-8 border-t border-white/10 pt-4">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                            Core Engagement Scope:
                          </span>
                          {tier.features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                              <CheckCircle2 className={`w-3.5 h-3.5 ${tier.color} shrink-0 mt-0.5`} />
                              <span className="leading-snug">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Link
                        href={tier.buttonLink}
                        className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white border border-white/10 text-xs font-bold transition-all group-hover:border-emerald-500/30"
                      >
                        <span>{tier.buttonText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Tab 2: Philanthropic Backing ────────────────────────────────────── */}
            {activeTab === 'foundations' && (
              <div className="space-y-6">
                <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/20 bg-slate-900/40 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <Landmark className="w-7 h-7 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white">Dr. Kumar Foundation USA</h3>
                        <p className="text-xs sm:text-sm text-purple-300">Primary Supporting & Sponsoring Philanthropic Institution</p>
                      </div>
                    </div>
                    <a
                      href="https://dkf.sufisciencecenter.info/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold transition-colors w-fit"
                    >
                      <span>Visit Foundation Portal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <p>
                      The <strong className="text-white">Dr. Kumar Foundation USA</strong> is the principal philanthropic supporter of Kashmir EcoWatch. Rooted in humanitarian advocacy, interfaith concord, and ecological preservation, the foundation provides structural backing that insulates the observatory from commercial pressures.
                    </p>
                    <p>
                      Through this partnership, Kashmir EcoWatch maintains absolute autonomy over its scientific pipeline, telemetry feeds, and data verification processes, ensuring that the findings published on the portal serve the public interest of the Himalayan region without compromise.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">Humanitarian Uplift</span>
                      <p className="text-xs text-slate-400">Bridging diaspora resources with grassroots environmental protection in Kashmir.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">Civic Independence</span>
                      <p className="text-xs text-slate-400">Ensuring zero paywalls, commercial monetization, or advertisement clutter.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                      <span className="text-xs font-bold text-purple-400 uppercase tracking-wider block mb-1">Sufi Science Center</span>
                      <p className="text-xs text-slate-400">Harmonizing empirical earth systems observation with spiritual consciousness.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Tab 3: CSR Cloud Architecture ───────────────────────────────────── */}
            {activeTab === 'csr' && (
              <div className="space-y-6">
                <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-sky-500/20 bg-slate-900/40 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                        <Cpu className="w-7 h-7 text-sky-400" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-white">Prime Logic Solutions USA</h3>
                        <p className="text-xs sm:text-sm text-sky-300">Corporate Social Responsibility (CSR) Technology Partner</p>
                      </div>
                    </div>
                    <a
                      href="https://primelogicsol.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 text-xs font-bold transition-colors w-fit"
                    >
                      <span>Visit Prime Logic Solutions</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <p>
                      As part of its formal <strong className="text-white">Corporate Social Responsibility (CSR) pledge</strong>, <strong className="text-white">Prime Logic Solutions</strong> architects, hosts, maintains, and continuously optimizes the entire software, cloud infrastructure, and real-time data ingestion pipelines of Kashmir EcoWatch gratis.
                    </p>
                    <p>
                      This includes microservices architecture, serverless data ingestion from NASA FIRMS and Open-Meteo, automated 5km sensitivity fuzzification algorithms for endangered species protection, and high-availability global CDN caching.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                      <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">Zero-Trust Infrastructure</span>
                      <p className="text-xs text-slate-400">Enterprise cloud hosting with 99.9% uptime SLA across high-traffic disaster events.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                      <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">Geospatial Processing</span>
                      <p className="text-xs text-slate-400">Vector map tiling, GeoJSON polygon queries, and dynamic multi-layer GIS dashboards.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                      <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">Continuous Development</span>
                      <p className="text-xs text-slate-400">Weekly automated security audits, dependency updates, and feature rollouts.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Tab 4: Sponsorship FAQ ─────────────────────────────────────────── */}
            {activeTab === 'faq' && (
              <div className="max-w-4xl mx-auto space-y-4">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="glass-panel p-6 sm:p-7 rounded-2xl border border-white/5 bg-slate-900/40 space-y-2">
                    <h4 className="text-base font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{faq.q}</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-6">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            )}

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
                  href="/about/contributors"
                  className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-semibold text-xs transition-all flex items-center gap-2"
                >
                  <Users className="w-4 h-4 text-emerald-400" />
                  <span>Contributors Network</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
