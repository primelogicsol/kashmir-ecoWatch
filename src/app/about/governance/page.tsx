'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import {
  Droplets, Quote, LeafyGreen, Scaling,
  Globe2, Shield, Heart, Sparkles, BookOpen,
  ArrowRight, CheckCircle2, Trees, Landmark,
  Compass, Mountain, Award, Feather, ExternalLink,
  Layers, Users, Share2, Activity
} from 'lucide-react';

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState<'comparison' | 'philosophy' | 'sufi' | 'legacy'>('comparison');

  // Executive Metric Cards (Matching About, Mission, Founder, Contributors)
  const macroStats = [
    { value: '600+', label: 'Years of Moral Ecology', sub: 'Sheikh ul-Alam (1377 – 1440 CE)', icon: BookOpen, color: 'text-emerald-400' },
    { value: '1', label: 'Civilizational Maxim', sub: '"Ann poshi teli yeli wan poshi"', icon: Quote, color: 'text-amber-400' },
    { value: '27', label: 'Rio 1992 Principles', sub: 'Modern international baseline', icon: Globe2, color: 'text-sky-400' },
    { value: '20', label: 'Districts Bound by Ethos', sub: 'Water, forest, and soil stewardship', icon: Mountain, color: 'text-purple-400' },
    { value: '100%', label: 'Symbiotic Sustainability', sub: 'Harmony over human dominion', icon: Scaling, color: 'text-teal-400' },
    { value: 'Non-Comm', label: 'Knowledge Return Covenant', sub: 'Enduring public Himalayan heritage', icon: Heart, color: 'text-rose-400' },
  ];

  const tableData = [
    {
      dimension: 'Format & Scope',
      rio: '362 pages of negotiated legal and policy texts across 3 principal agreements',
      alamdar: 'Single enduring Kashmiri rhyming aphorism: "Ann poshi teli yeli wan poshi"',
      highlight: 'Format'
    },
    {
      dimension: 'Intended Audience',
      rio: '172 nation states, 108 heads of government, 2,400 NGOs, and 17,000 global delegates',
      alamdar: 'The everyday agrarian and pastoral people of Kashmir — shared oral wisdom and lived practice',
      highlight: 'Audience'
    },
    {
      dimension: 'Core Thesis',
      rio: '27 principles, 40-chapter Agenda 21, UNFCCC, and Convention on Biological Diversity (CBD)',
      alamdar: 'Absolute ecology-food survival dependency: human nourishment dies the moment forests die',
      highlight: 'Thesis'
    },
    {
      dimension: 'Operational Mechanism',
      rio: 'International legal treaties, national carbon accounting, periodic COP summits, and legal compliance',
      alamdar: 'Moral ecology rooted in contemplative Sufi practice, sacred geography, and reverence for living soil',
      highlight: 'Mechanism'
    },
    {
      dimension: 'Language & Lexicon',
      rio: 'Technocratic vocabulary: emissions ceilings, carbon sink quotas, and ecological indicators',
      alamdar: 'Civilizational truth: organic human nourishment and spiritual purity require living trees and clean springs',
      highlight: 'Language'
    },
    {
      dimension: 'Historical Timeline',
      rio: '1992 (Rio Earth Summit) ➔ 2012 (Rio+20) ➔ ongoing multilateral negotiations',
      alamdar: 'Late 14th century (c. 1377–1440 CE) — lived, sung, and sustained for over six centuries',
      highlight: 'Timeline'
    },
    {
      dimension: 'Enduring Outcome',
      rio: 'Regulatory frameworks requiring monitoring, state enforcement, and treaty ratifications',
      alamdar: 'A profound cultural covenant: the unbreakable bond between people, forests, springs, and food systems',
      highlight: 'Outcome'
    }
  ];

  const philosophies = [
    {
      icon: LeafyGreen,
      title: 'Biodiversity as Divine Trust',
      subtitle: 'Wan Poshi (Living Forests)',
      desc: 'Preserving the coniferous canopy, alpine flora, and medicinal treasures of the Himalayas not as exploitable timber, but as an irreplaceable divine continuum.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
      quote: '"Every leaf in the mountain forest is a tongue chanting the unity of creation."'
    },
    {
      icon: Droplets,
      title: 'Sacred Water Wisdom',
      subtitle: 'Nag & Chashma Reverence',
      desc: 'Treating the Jhelum (Vyeth), high-altitude glacial tarns, and subterranean village springs as sacred lifelines that demand collective civic protection.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20',
      quote: '"The spring that gives you clean water is a holy trust; poison it and you starve your own progeny."'
    },
    {
      icon: Scaling,
      title: 'Symbiotic Restraint',
      subtitle: 'Harmony Over Extraction',
      desc: 'Living in rhythm with natural seasonal cycles rather than imposing industrial greed upon mountain slopes. Sustainability is not a sacrifice; it is symbiosis.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
      quote: '"Take only what the mountain yields in grace; excess turns the sweetest soil to dust."'
    }
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 selection:bg-emerald-500/30 selection:text-emerald-200 pb-20">
      {/* ─── Hero Surface ────────────────────────────────────────────────────────── */}
      <Heading 
        icon={<Trees className="w-5 h-5 text-emerald-400" />}
        label="Ecological Governance & Civilizational Philosophy"
        title="Western Himalayan Governance — Alamdar-e-Kashmir"
        subtitle="Sheikh Noor-ud-Din Wali (Alamdar-e-Kashmir): The 14th-century Sufi visionary whose moral ecology anticipated global environmental governance six centuries before Rio."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Governance & Alamdar Ethos' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#quote-banner"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-300"
            >
              <span>Explore The Aphorism</span>
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
              href="/about/mission"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-semibold text-sm transition-all"
            >
              <Compass className="w-4 h-4 text-sky-400" />
              <span>Mission & 2030 Roadmap</span>
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

        {/* ─── Landmark Quote Showcase Banner ───────────────────────────────────── */}
        <section id="quote-banner" className="scroll-mt-24">
          <div className="max-w-5xl mx-auto">
            <div className="glass-panel p-8 sm:p-14 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-900/90 to-slate-950 shadow-2xl relative overflow-hidden text-center">
              <Quote className="absolute top-6 left-6 w-20 h-20 text-emerald-500/10 pointer-events-none" />
              <Quote className="absolute bottom-6 right-6 w-20 h-20 text-emerald-500/10 rotate-180 pointer-events-none" />
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Unbroken Moral Covenant of Kashmir</span>
              </div>

              <h2 className="text-3xl sm:text-6xl font-black text-emerald-300 mb-6 italic tracking-tight font-serif">
                "Ann poshi teli yeli wan poshi"
              </h2>

              <p className="text-xl sm:text-3xl text-white font-medium mb-6">
                Food will thrive only till the woods survive.
              </p>

              <div className="max-w-2xl mx-auto">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light">
                  Spoken in the late 14th century by <strong className="text-white">Sheikh Noor-ud-Din Wali (Alamdar-e-Kashmir / Nund Rishi)</strong>, this single line encapsulates the entire foundation of ecological carrying capacity, watershed protection, and sustainable development six centuries before modern environmental conventions.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Not borrowed vocabulary</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Not a marketing slogan</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Civilizational mountain wisdom</span>
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
                  <Trees className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Ethical Frameworks</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Comparative Analysis & Core Principles
                </h2>
              </div>

              {/* Navigation Pills */}
              <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-slate-900/60 border border-white/10">
                {[
                  { id: 'comparison', label: 'Rio 1992 vs. Alamdar', icon: Globe2 },
                  { id: 'philosophy', label: '3 Pillars of Moral Ecology', icon: Scaling },
                  { id: 'sufi', label: 'Sufism & Science Confluence', icon: Feather },
                  { id: 'legacy', label: 'Living Mountain Covenant', icon: Landmark }
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

            {/* ─── Tab 1: Rio Earth Summit vs. Alamdar Comparison Table ────────────── */}
            {activeTab === 'comparison' && (
              <div className="space-y-6">
                <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 bg-slate-900/40 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Technical Comparison: Two Approaches to Sustainability
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Contrasting the modern multilateral diplomatic architecture with Kashmir's 600-year-old moral ecology.
                      </p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 w-fit">
                      14th Century vs. 1992
                    </span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[760px]">
                      <thead>
                        <tr>
                          <th className="p-4 border-b border-white/10 text-xs font-bold text-slate-300 uppercase tracking-wider bg-slate-950/60 rounded-l-xl">
                            Dimension
                          </th>
                          <th className="p-4 border-b border-white/10 text-xs font-bold text-sky-400 uppercase tracking-wider bg-slate-950/60">
                            Rio Earth Summit (1992 & Rio+20)
                          </th>
                          <th className="p-4 border-b border-white/10 text-xs font-bold text-emerald-400 uppercase tracking-wider bg-slate-950/60 rounded-r-xl">
                            Alamdar-e-Kashmir (c. 1377 – 1440 CE)
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-xs sm:text-sm text-slate-300 divide-y divide-white/5">
                        {tableData.map((row, i) => (
                          <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                            <td className="p-4 font-bold text-white bg-slate-900/40 border-r border-white/5 whitespace-nowrap">
                              {row.dimension}
                            </td>
                            <td className="p-4 text-slate-300 leading-relaxed border-r border-white/5">
                              {row.rio}
                            </td>
                            <td className="p-4 text-emerald-200 font-medium leading-relaxed bg-emerald-950/10">
                              {row.alamdar}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-950/70 border border-white/5 flex items-start gap-4">
                    <Quote className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                      <strong className="text-white font-semibold">The Undefeated Verdict:</strong> Let the scientists deliberate, let the institutions negotiate, and let world summits draft thousand-page declarations. Kashmir had already heard the essence of it from Alamdar: <em className="text-emerald-300">Human nourishment depends entirely on ecological balance.</em>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Tab 2: Core Philosophy Pillars ──────────────────────────────────── */}
            {activeTab === 'philosophy' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {philosophies.map((phil, i) => (
                    <div
                      key={i}
                      className={`glass-panel p-7 sm:p-8 rounded-3xl border ${phil.bg} flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300 shadow-xl group`}
                    >
                      <div>
                        <div className="w-14 h-14 rounded-2xl bg-slate-950/70 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <phil.icon className={`w-7 h-7 ${phil.color}`} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                          {phil.title}
                        </h3>
                        <h4 className={`text-xs font-bold uppercase tracking-wider ${phil.color} mb-3`}>
                          {phil.subtitle}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                          {phil.desc}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 text-xs italic text-emerald-200/90 font-serif leading-relaxed">
                        {phil.quote}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─── Tab 3: Sufism, Science & Society Confluence ──────────────────────── */}
            {activeTab === 'sufi' && (
              <div className="space-y-6">
                <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/40 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
                      <Feather className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-white">Exploring Science, Society, and Sufism</h3>
                      <p className="text-xs sm:text-sm text-purple-300">The philosophical continuity between Alamdar-e-Kashmir and contemporary mountain stewardship.</p>
                    </div>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <p>
                      Kashmiri Sufism (Rishi order) founded by Sheikh Noor-ud-Din Wali was unique in world spiritual history: it was fundamentally <strong className="text-white">ecological, non-violent, vegetarian, and forest-dwelling</strong>. The Rishis planted shade trees, guarded drinking springs (naags), tended mountain orchards, and declared that harm to a single blade of grass was harm to the divine presence.
                    </p>
                    <p>
                      Today, as Kashmir EcoWatch monitors the retreat of glaciers, the silting of Dal Lake, and the vulnerability of mountain forests, it does not do so merely as a cold computational exercise. The technical telemetry produced by satellites, river gauges, and AI predictive models is the modern empirical confirmation of Alamdar's moral vision.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                      <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span>SufiPulse & The Literary Tradition</span>
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Explored continuously in contemporary writing and spiritual philosophy by Mr. Khan under the pen name <strong className="text-purple-300 font-semibold">&ldquo;Dr. Zarf-e-Noori&rdquo;</strong> across the global SufiPulse ecosystem.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-white/5">
                      <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-emerald-400" />
                        <span>Kashmir EcoWatch Telemetry</span>
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Translating sacred mountain respect into real-time hazard warnings, flood inundation models, and open water quality intelligence for 20 districts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── Tab 4: The Living Flag Bearer Legacy ─────────────────────────────── */}
            {activeTab === 'legacy' && (
              <div className="space-y-6">
                <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 bg-slate-900/40 space-y-6">
                  <div className="max-w-3xl space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      The Flag Bearer of Kashmir (Alamdar)
                    </h3>
                    <p>
                      Alamdar-e-Kashmir, a visionary and trailblazer, left an indelible mark on the landscape of environmental sustainability across the Kashmir Himalayas. His unwavering commitment to preserving the planet resonates through time, inspiring generations to tread lightly upon the Earth.
                    </p>
                    <p>
                      From the snow-capped peaks of the Pir Panjal to the saffron fields of Pampore, he wove a tapestry of ecological balance — a delicate dance between humans and their surroundings. Alamdar-e-Kashmir understood that sustainability wasn’t a temporary political agenda; it was a permanent covenant of life.
                    </p>
                    <p className="text-emerald-300 font-medium text-sm sm:text-base pt-2">
                      His legacy, like the whispering winds through ancient deodar forests, urges us to tread gently upon the Earth, nurturing its fragile balance for generations yet unborn.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* ─── Institutional Backing & Reciprocal Links (Mirrors Contributors & Founder) ─ */}
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
