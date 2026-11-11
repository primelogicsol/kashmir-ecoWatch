'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Music, 
  Video, 
  Users2, 
  Briefcase, 
  ArrowRight, 
  Calendar, 
  CheckCircle2, 
  HeartHandshake, 
  Sparkles,
  ChevronRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';

export function EducationStewardshipActionSection() {
  const [activeTab, setActiveTab] = useState<'all' | 'outdoor' | 'ecovoices' | 'webinars' | 'ngo' | 'csr'>('all');

  const actionPillars = [
    {
      id: 'outdoor',
      tag: 'Outdoor Classroom & Field Science',
      badge: 'School Observatories',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
      title: 'Adopt-an-Ecosystem Network',
      subtitle: 'Long-term ecological monitoring for J&K schools and colleges',
      icon: GraduationCap,
      iconColor: 'text-emerald-400',
      desc: 'Connecting educational institutions directly to their local wetlands, subalpine forests, and stream corridors. Students record water quality, bird arrivals, and phenological shifts as permanent citizen science data.',
      stats: [
        { label: 'Adopted Sites', value: '12 Locations' },
        { label: 'Student Records', value: '1,400+ Gauges' },
        { label: 'Partner Schools', value: '38 Observatories' }
      ],
      primaryLink: { label: 'Explore Adopt-an-Ecosystem', href: '/environmental-calendar/outdoor-classroom/adopt-an-ecosystem' },
      secondaryLink: { label: 'Field Learning Programs', href: '/environmental-calendar/outdoor-classroom/field-learning-programs' },
      gradient: 'from-emerald-500/10 via-transparent to-transparent'
    },
    {
      id: 'ecovoices',
      tag: 'EcoVoices × SufiPulse USA',
      badge: 'Cultural Stewardship',
      badgeColor: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
      title: 'Environmental Music & Literary Stewardship',
      subtitle: 'Where Himalayan telemetry meets poetry, kalam, and musical voice',
      icon: Music,
      iconColor: 'text-purple-400',
      desc: 'An official joint initiative with SufiPulse USA recruiting writers, poets, vocalists, instrumentalists, and composers to give voice to Kashmir’s waterbodies, forests, and glaciers. Includes working streaming tracks and direct contributor applications.',
      stats: [
        { label: 'Official Releases', value: '3 Curated Tracks' },
        { label: 'Creative Tracks', value: '5 Contributor Roles' },
        { label: 'Publisher', value: 'SufiPulse USA' }
      ],
      primaryLink: { label: 'Enter EcoVoices Music Hub', href: '/environmental-calendar/ecovoices' },
      secondaryLink: { label: 'Become a Contributor', href: '/environmental-calendar/ecovoices#participate' },
      gradient: 'from-purple-500/10 via-transparent to-transparent'
    },
    {
      id: 'webinars',
      tag: 'Webinars & Conferences',
      badge: 'Himalayan Science Exchange',
      badgeColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20',
      title: 'Environmental Calendar & Expert Dialogues',
      subtitle: 'UN Observances, statutory dates & glaciology symposiums',
      icon: Video,
      iconColor: 'text-sky-400',
      desc: 'Synchronized with United Nations environmental days, Animal Welfare Fortnight, and Wildlife Week 2026. Hosts interactive virtual sessions connecting local researchers with glaciologists, limnologists, and environmental policy experts.',
      stats: [
        { label: 'Verified Dates', value: '17 Observances' },
        { label: 'Format', value: 'Hybrid & Virtual' },
        { label: 'Academic Scope', value: 'Peer Reviewed' }
      ],
      primaryLink: { label: 'View Environmental Calendar', href: '/environmental-calendar' },
      secondaryLink: { label: 'Upcoming Observances', href: '/environmental-calendar#calendar' },
      gradient: 'from-sky-500/10 via-transparent to-transparent'
    },
    {
      id: 'ngo',
      tag: 'NGO Impact & Field Partnerships',
      badge: 'Grassroots Action',
      badgeColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
      title: 'Conservation Directory & Project Registry',
      subtitle: 'Empowering regional NGOs with scientific telemetry & mapping',
      icon: Users2,
      iconColor: 'text-amber-400',
      desc: 'Collaborative directory of non-governmental organizations actively working on Dal lake cleanup, solid waste remediation, wetland revival, and wildlife rescue across all 10 Kashmir valley districts.',
      stats: [
        { label: 'NGO Registry', value: 'Active Directory' },
        { label: 'Audit Standard', value: 'Verified Evidence' },
        { label: 'Field Coverage', value: '10 Districts' }
      ],
      primaryLink: { label: 'Explore NGO Directory', href: '/ngo-impact/directory' },
      secondaryLink: { label: 'NGO Project Map', href: '/ngo-impact/map' },
      gradient: 'from-amber-500/10 via-transparent to-transparent'
    },
    {
      id: 'csr',
      tag: 'CSR & Institutional Sponsorship',
      badge: 'Philanthropic Stewardship',
      badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/20',
      title: 'Statutory CSR Collaborations & Grants',
      subtitle: 'Targeted funding for sensor networks, cleanups & youth programs',
      icon: Briefcase,
      iconColor: 'text-teal-400',
      desc: 'Compliant institutional frameworks for Corporate Social Responsibility (CSR) funding under Section 135 of the Companies Act. Direct capital allocation toward water quality sensors, school outdoor labs, and wetland restoration.',
      stats: [
        { label: 'Statutory Alignment', value: 'Schedule VII Compliant' },
        { label: 'Reporting', value: 'Audited Telemetry' },
        { label: 'Focus', value: 'Clean Water & Cryosphere' }
      ],
      primaryLink: { label: 'CSR Collaboration Portal', href: '/about/csr-collaborations' },
      secondaryLink: { label: 'Institutional Sponsorship', href: '/about/support-sponsorship' },
      gradient: 'from-teal-500/10 via-transparent to-transparent'
    }
  ];

  const filteredPillars = activeTab === 'all' 
    ? actionPillars 
    : actionPillars.filter(p => p.id === activeTab);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-slate-950 border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-purple-500/10 border border-purple-500/30 text-purple-300">
                <Sparkles className="w-3 h-3 text-purple-400" />
                Community &amp; Institutional Stewardship
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-mono hidden sm:inline">
                • 5 Action Pathways
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Education, Creative Stewardship &amp; Institutional Action
            </h2>
            <p className="text-slate-400 max-w-3xl text-xs sm:text-sm md:text-base mt-2 leading-relaxed">
              Bridging scientific telemetry with school classrooms, environmental music, academic symposiums, grassroots conservation NGOs, and statutory CSR funding.
            </p>
          </div>

          {/* Quick Filter Pill Selector */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'all' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All 5
            </button>
            <button
              onClick={() => setActiveTab('outdoor')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'outdoor' 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Outdoor Class
            </button>
            <button
              onClick={() => setActiveTab('ecovoices')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'ecovoices' 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              EcoVoices
            </button>
            <button
              onClick={() => setActiveTab('webinars')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'webinars' 
                  ? 'bg-sky-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Webinars
            </button>
            <button
              onClick={() => setActiveTab('ngo')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'ngo' 
                  ? 'bg-amber-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              NGOs
            </button>
            <button
              onClick={() => setActiveTab('csr')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'csr' 
                  ? 'bg-teal-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CSR
            </button>
          </div>
        </motion.div>

        {/* Pillars Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.07 }}
                className={`p-6 rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${p.gradient}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${p.badgeColor}`}>
                      {p.badge}
                    </span>
                    <div className={`p-2 rounded-xl bg-white/5 ${p.iconColor}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wide">
                    {p.tag}
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1 leading-snug">
                    {p.title}
                  </h3>
                  <div className="text-xs text-slate-300 font-medium mt-1">
                    {p.subtitle}
                  </div>

                  <p className="text-xs text-slate-400 mt-3 leading-relaxed">
                    {p.desc}
                  </p>

                  {/* Micro stats */}
                  <div className="grid grid-cols-3 gap-2 my-4 pt-3 border-t border-white/5 text-center">
                    {p.stats.map((s, sIdx) => (
                      <div key={sIdx} className="p-2 rounded-lg bg-black/20 border border-white/5">
                        <div className="text-[11px] font-bold text-white font-mono truncate">
                          {s.value}
                        </div>
                        <div className="text-[9px] text-slate-400 uppercase mt-0.5 truncate">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Link
                    href={p.primaryLink.href}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all border border-white/10"
                  >
                    <span>{p.primaryLink.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href={p.secondaryLink.href}
                    className="inline-flex items-center justify-center text-xs text-slate-400 hover:text-white transition-colors py-1 sm:py-0 px-2 font-medium"
                  >
                    <span>{p.secondaryLink.label}</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
