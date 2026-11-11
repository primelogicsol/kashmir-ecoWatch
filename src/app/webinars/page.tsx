'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Globe2,
  Layers,
  Lock,
  PlusCircle,
  Radio,
  ShieldCheck,
  Sparkles,
  Users,
  Video,
  Building2
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { ModuleKpiStrip } from '@/components/common/ModuleKpiStrip';
import { Button } from '@/components/ui/Button';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { WebinarCard } from '@/components/webinars/WebinarCard';
import { RegistrationModal } from '@/components/webinars/RegistrationModal';
import { SCIENTIFIC_WEBINARS, WEBINAR_KPIS, WebinarSession } from '@/data/webinars';
import { CONFERENCES_DETAILED, VERIFIED_INSTITUTIONS } from '@/data/conference-system';

export default function ScientificWebinarsHubPage() {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string>('All');
  const [selectedSessionForReg, setSelectedSessionForReg] = useState<WebinarSession | null>(null);
  const [isRegModalOpen, setIsRegModalOpen] = useState(false);

  const liveSession = SCIENTIFIC_WEBINARS.find(s => s.status === 'live') || SCIENTIFIC_WEBINARS[0];

  const filteredWebinars = selectedDiscipline === 'All'
    ? SCIENTIFIC_WEBINARS
    : SCIENTIFIC_WEBINARS.filter(s => s.discipline.toLowerCase().includes(selectedDiscipline.toLowerCase()));

  const handleOpenRegistration = (session: WebinarSession) => {
    setSelectedSessionForReg(session);
    setIsRegModalOpen(true);
  };

  const disciplines = [
    'All',
    'Cryosphere & Glaciology',
    'Limnology & Wetlands',
    'Forest Ecology',
    'Fluvial Geomorphology'
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="KASHMIR ECOWATCH · SCIENTIFIC CONFERENCE NETWORK"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinars & Conferences' }
        ]}
        icon={<Video className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                2027 PROGRAM
              </span>
              <span className="text-white">Scientific Conferences &amp;</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Webinars 2027
              </span>
            </div>
          </div>
        }
        subtitle="Western Himalayan Environmental Research, Dialogue & Scientific Collaboration. Comprehensive 2027–2028 inaugural program encompassing 8 flagship conferences, 48 specialist webinars, 24 applied workshops, and 24 environmental observances across 30 ecological domains."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={
          <div className="relative p-6 rounded-2xl bg-slate-900/90 border border-teal-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black uppercase bg-teal-500/20 text-teal-300 border border-teal-500/40">
                <span className="w-2 h-2 rounded-full bg-teal-400" />
                2027–2028 Master Program
              </span>
              <span className="text-xs font-mono text-amber-300 font-bold">104 Activities</span>
            </div>

            <div>
              <div className="text-[10px] font-bold text-teal-400 uppercase tracking-widest mb-1">
                Flagship Proposed Summit
              </div>
              <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                Western Himalayan Cryosphere Summit 2027
              </h4>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="font-mono text-slate-200">May 27–29, 2027 (Proposed)</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>8 Flagship Summits &bull; 48 Webinars &bull; 24 Workshops</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <Link href="/webinars/calendar" className="flex-1">
                <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-lg shadow-teal-600/30">
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  View 104-Event Calendar
                </Button>
              </Link>
              <Link href="/webinars/conferences">
                <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                  Conferences
                </Button>
              </Link>
            </div>
          </div>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/webinars/calendar">
              <Button size="sm" className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-600/20">
                <Calendar className="w-4 h-4 mr-1.5" />
                Master Calendar (104 Activities)
              </Button>
            </Link>
            <Link href="/webinars/host-a-conference">
              <Button size="sm" variant="outline" className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 font-bold">
                <PlusCircle className="w-4 h-4 mr-1.5" />
                Host a Conference
              </Button>
            </Link>
          </div>
        }
      />

      {/* Prominent Two-Year Target Strip */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-6">
        <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-teal-500/30 backdrop-blur-xl shadow-2xl space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 text-center space-y-0.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono">8</div>
              <div className="text-xs font-bold text-white">Flagship Summits</div>
              <div className="text-[10px] text-slate-400 font-mono">4 in 2027 · 4 in 2028</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 text-center space-y-0.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">48</div>
              <div className="text-xs font-bold text-white">Specialist Webinars</div>
              <div className="text-[10px] text-slate-400 font-mono">2 / Month (24 Mos)</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 text-center space-y-0.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">24</div>
              <div className="text-xs font-bold text-white">Applied Workshops</div>
              <div className="text-[10px] text-slate-400 font-mono">1 / Month (24 Mos)</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 text-center space-y-0.5">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">24</div>
              <div className="text-xs font-bold text-white">Observances</div>
              <div className="text-[10px] text-slate-400 font-mono">Outdoor Classroom</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-teal-500/40 text-center space-y-0.5 col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">104</div>
              <div className="text-xs font-bold text-teal-300">Total Activities</div>
              <div className="text-[10px] text-amber-300 font-mono font-bold uppercase">Proposed 2027–28</div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-3">
              <span>Confirmed Delegates: <strong className="text-white">0</strong></span>
              <span>&bull;</span>
              <span>Confirmed Co-Hosts: <strong className="text-white">0</strong></span>
              <span>&bull;</span>
              <span>Published Proceedings: <strong className="text-white">0 DOIs</strong></span>
            </div>
            <div className="text-amber-300/90 font-bold">
              All 104 activities are proposed targets · No past concluded events claimed
            </div>
          </div>
        </div>
      </div>

      {/* Submodule Navigation */}
      <WebinarNav />

      {/* Main Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        {/* Section: Three Proposed 2027 Scientific Conferences */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-mono border border-teal-500/20 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Proposed Academic Program</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Proposed 2027 Scientific Conferences
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl">
                Kashmir EcoWatch is actively preparing its inaugural academic program for 2027. All dates and tracks are subject to final steering committee and institutional partner ratification.
              </p>
            </div>
            <Link
              href="/webinars/conferences"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-teal-300 transition-colors shrink-0"
            >
              <span>Explore All Tracks</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Western Himalayan Cryosphere Summit */}
            <div className="bg-slate-900/80 border border-teal-500/30 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-teal-500/60 transition-all shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                    May 27–29, 2027 · Proposed
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    3 Days
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    <Link href="/webinars/conferences/kew-conf-2027-cryo" className="hover:text-teal-300 transition-colors">
                      Western Himalayan Cryosphere Summit
                    </Link>
                  </h3>
                  <div className="text-xs font-medium text-teal-300/90 mt-1">
                    Glacier change, remote sensing, mountain hydrology
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Synthesizing TanDEM-X and Sentinel-2 differential mass balance observations across the Kolahoi, Thajiwas, and Machoi glacier complexes with downstream water security models.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Virtual Halls</span>
                    <span className="text-white font-bold">3 Halls Planned</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Delegates</span>
                    <span className="text-teal-300 font-bold">0 Confirmed</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                <Link href="/webinars/conferences/kew-conf-2027-cryo" className="flex-1">
                  <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-500 font-bold text-white text-xs">
                    Conference Program
                  </Button>
                </Link>
                <Link href="/webinars/room/kew-conf-2027-cryo">
                  <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 text-xs">
                    Pre-Flight Test
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 2: Himalayan Wetlands & Ramsar Symposium */}
            <div className="bg-slate-900/80 border border-teal-500/30 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-teal-500/60 transition-all shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                    July 15–16, 2027 · Proposed
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    2 Days
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    <Link href="/webinars/conferences/conf-2027-wetlands" className="hover:text-teal-300 transition-colors">
                      Himalayan Wetlands &amp; Ramsar Symposium
                    </Link>
                  </h3>
                  <div className="text-xs font-medium text-teal-300/90 mt-1">
                    Wetland ecology, conservation, hydrological restoration
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Limnological dynamics, avian migratory flyways, and statutory wetland conservation under Ramsar guidelines across Wular, Dal, Hokersar, and Shallabugh basins.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Virtual Halls</span>
                    <span className="text-white font-bold">2 Halls Planned</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Delegates</span>
                    <span className="text-teal-300 font-bold">0 Confirmed</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                <Link href="/webinars/conferences/conf-2027-wetlands" className="flex-1">
                  <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-500 font-bold text-white text-xs">
                    Conference Program
                  </Button>
                </Link>
                <Link href="/webinars/room/conf-2027-wetlands">
                  <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 text-xs">
                    Pre-Flight Test
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 3: Western Himalayan Biodiversity Congress */}
            <div className="bg-slate-900/80 border border-teal-500/30 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-teal-500/60 transition-all shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                    September 23–24, 2027 · Proposed
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    2 Days
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    <Link href="/webinars/conferences/conf-2027-biodiversity" className="hover:text-teal-300 transition-colors">
                      Western Himalayan Biodiversity &amp; Protected Landscapes
                    </Link>
                  </h3>
                  <div className="text-xs font-medium text-teal-300/90 mt-1">
                    Wildlife, forests, pollinators, species protection, corridors
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Radio-telemetry monitoring of endangered mammals (Hangul, Markhor, Snow Leopard), subalpine treeline corridor dynamics, and community nature conservation.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Virtual Halls</span>
                    <span className="text-white font-bold">2 Halls Planned</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Delegates</span>
                    <span className="text-teal-300 font-bold">0 Confirmed</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                <Link href="/webinars/conferences/conf-2027-biodiversity" className="flex-1">
                  <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-500 font-bold text-white text-xs">
                    Conference Program
                  </Button>
                </Link>
                <Link href="/webinars/room/conf-2027-biodiversity">
                  <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 text-xs">
                    Pre-Flight Test
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card 4: Himalayan Rivers & Land Use Conference */}
            <div className="bg-slate-900/80 border border-teal-500/30 rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-teal-500/60 transition-all shadow-xl">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                    November 18–19, 2027 · Proposed
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">
                    2 Days
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    <Link href="/webinars/conferences/conf-2027-rivers" className="hover:text-teal-300 transition-colors">
                      Himalayan Rivers, Land Use &amp; Environmental Impact
                    </Link>
                  </h3>
                  <div className="text-xs font-medium text-teal-300/90 mt-1">
                    Riverbed mining, urban expansion, infrastructure, sectoral EIA
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Fluvial geomorphology, mechanized riverbed sand mining impacts, flood attenuation capacity, and riparian buffer restoration in the Jhelum and Chenab catchments.
                </p>

                <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] font-mono">
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Virtual Halls</span>
                    <span className="text-white font-bold">2 Halls Planned</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5">
                    <span className="text-slate-400 block text-[10px]">Delegates</span>
                    <span className="text-teal-300 font-bold">0 Confirmed</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                <Link href="/webinars/conferences/conf-2027-rivers" className="flex-1">
                  <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-500 font-bold text-white text-xs">
                    Conference Program
                  </Button>
                </Link>
                <Link href="/webinars/room/conf-2027-rivers">
                  <Button size="sm" variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 text-xs">
                    Pre-Flight Test
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Master 104-Event Program Callout Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-teal-950/60 border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 max-w-2xl">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                24-Month Scientific Master Plan
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Comprehensive Scientific Calendar 2027–2028 (104 Activities)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Covering 8 flagship summits, 48 monthly specialist webinars, 24 applied workshops, and 24 environmental observances across all 30 scientific domains of Kashmir EcoWatch.
              </p>
            </div>
            <Link href="/webinars/calendar" className="shrink-0">
              <Button className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-6 py-3 text-xs shadow-lg shadow-teal-500/25">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Explore 104-Activity Master Schedule</span>
              </Button>
            </Link>
          </div>
        </section>

        {/* Spotlight Banner: Multi-Day Scientific Summit */}
        <section className="relative rounded-3xl bg-gradient-to-r from-teal-950/60 via-slate-900 to-slate-950 border border-teal-500/30 p-6 sm:p-10 overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                  Flagship Proposed Summit
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  3 Parallel Virtual Halls
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Planning Phase (May 2027)
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Western Himalayan Cryosphere Summit 2027: Glaciology, Terminus Recession &amp; Water Security
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
                A proposed high-level 3-day symposium bringing together remote sensing geophysicists, glaciologists, and water authorities. Proposed to synthesize TanDEM-X and Sentinel-2 differential mass balance observations across the Kolahoi, Thajiwas, and Machoi glacier complexes.
              </p>

              {/* Parallel Tracks Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/30">
                  <div className="text-[10px] font-mono text-purple-400 font-bold uppercase mb-1">Hall A &bull; CRYO-ROOM-A</div>
                  <div className="text-xs font-bold text-white mb-1">Glacial Mass Balance &amp; InSAR</div>
                  <div className="text-[11px] text-slate-400">Proposed Academic Session</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/30">
                  <div className="text-[10px] font-mono text-purple-400 font-bold uppercase mb-1">Hall B &bull; CRYO-ROOM-B</div>
                  <div className="text-xs font-bold text-white mb-1">Downstream Hydrology &amp; Crops</div>
                  <div className="text-[11px] text-slate-400">Proposed Hydrology Track</div>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-purple-500/30">
                  <div className="text-[10px] font-mono text-purple-400 font-bold uppercase mb-1">Hall C &bull; CRYO-ROOM-C</div>
                  <div className="text-xs font-bold text-white mb-1">GLOF Warning &amp; NGT Policy</div>
                  <div className="text-[11px] text-slate-400">Proposed Governance Clinic</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-3">
                <Link href="/webinars/room/kew-conf-2027-cryo">
                  <Button className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-lg shadow-teal-600/30 px-6">
                    <Video className="w-4 h-4 mr-2" />
                    Enter Pre-Flight Virtual Hall
                  </Button>
                </Link>
                <Link href="/webinars/conferences/kew-conf-2027-cryo/registration">
                  <Button
                    variant="outline"
                    className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 font-bold"
                  >
                    <Award className="w-4 h-4 mr-2" />
                    Accreditation Policy
                  </Button>
                </Link>
                <Link href="/webinars/conferences/kew-conf-2027-cryo">
                  <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5">
                    View Full Agenda &amp; Pre-prints
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Stats Panel */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-white/10 space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-white/5 pb-2">
                Summit Planning Status &bull; 2027
              </h4>
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Proposed Schedule</span>
                  <span className="font-bold text-white font-mono">May 27–29, 2027</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Confirmed Delegates</span>
                  <span className="font-bold text-slate-400 font-mono">0 (Opens Feb 2027)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Institutional Co-Hosts</span>
                  <span className="font-bold text-teal-400 font-mono">Under Formal Review</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Proceedings DOI</span>
                  <span className="font-bold text-cyan-400 font-mono">Post-Summit Issuance</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Verified CE Units</span>
                  <span className="font-bold text-emerald-400 font-mono">Proposed (18.0 Hrs)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Virtual Hall Tech</span>
                  <span className="font-bold text-slate-200 font-mono">LiveKit / WebRTC Ready</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Three Institutional Hosting Models */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">Collaborative Scientific Architecture</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">Three Conference Hosting Models</h3>
              <p className="text-xs text-slate-300 mt-1">
                Kashmir EcoWatch provides its browser-based conference infrastructure free of charge to verified environmental and academic institutions.
              </p>
            </div>
            <Link
              href="/webinars/host-a-conference"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 transition-colors shrink-0"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Host a Conference</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 border border-white/10 hover:border-teal-500/40 rounded-2xl p-6 space-y-3 transition-all">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="text-base font-bold text-white">KEW-Organized Conferences</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Flagship summits created and directly administered by Kashmir EcoWatch, setting baseline regional standards, statutory briefings, and NGT compliance hearings.
              </p>
              <div className="text-[11px] text-teal-400 font-mono">Full KEW Scientific Governance</div>
            </div>

            <div className="bg-slate-900/80 border border-white/10 hover:border-teal-500/40 rounded-2xl p-6 space-y-3 transition-all">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="text-base font-bold text-white">Joint Institutional Conferences</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Co-organized events between universities (e.g. University of Kashmir, SKUAST-K) and KEW with shared scientific committees and bilateral editorial oversight.
              </p>
              <div className="text-[11px] text-purple-400 font-mono">Joint Steering &amp; Co-Branding</div>
            </div>

            <div className="bg-slate-900/80 border border-white/10 hover:border-teal-500/40 rounded-2xl p-6 space-y-3 transition-all">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="text-base font-bold text-white">Institution-Hosted Conferences</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Verified environmental NGOs, societies, and faculties independently operate events using KEW&apos;s virtual halls, abstract review, and certificate tools within platform guidelines.
              </p>
              <div className="text-[11px] text-emerald-400 font-mono">100% Free for Verified Entities</div>
            </div>
          </div>
        </section>

        {/* Section: Multi-Track Scientific Conferences */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-teal-400" />
                <span>Multi-Day Scientific Conferences</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">Explore parallel tracks, daily programs, and published proceedings</p>
            </div>
            <Link href="/webinars/conferences" className="text-xs font-semibold text-teal-400 hover:underline">
              All Conferences ({CONFERENCES_DETAILED.length}) &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CONFERENCES_DETAILED.map(conf => (
              <div key={conf.id} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-teal-300 font-bold">{conf.dates.display}</span>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    conf.status === 'proposed'
                      ? 'bg-amber-500/10 text-amber-300 border border-amber-500/30'
                      : conf.status === 'live'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {conf.status === 'proposed' ? 'Proposed (2027)' : conf.status}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  <Link href={`/webinars/conferences/${conf.id}`} className="hover:text-teal-300">
                    {conf.title}
                  </Link>
                </h4>
                <p className="text-xs text-slate-300 line-clamp-2">{conf.description}</p>
                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Host: {conf.hostInstitution.shortName}</span>
                  <Link
                    href={`/webinars/conferences/${conf.id}/program`}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-teal-500 text-slate-950 hover:bg-teal-400"
                  >
                    View Program Agenda
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section: Technical Webinars & Lectures */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white">Technical Webinars &amp; Specialist Lectures</h3>
              <p className="text-xs text-slate-400 mt-1">Single-session technical presentations, legal clinics, and limnological briefings</p>
            </div>

            {/* Discipline Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {disciplines.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDiscipline(d)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                    selectedDiscipline === d
                      ? 'bg-teal-500 text-slate-950 font-bold'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWebinars.map(session => (
              <WebinarCard
                key={session.id}
                session={session}
                onRegister={handleOpenRegistration}
              />
            ))}
          </div>
        </section>

        {/* Scientific Integrity Standards Notice */}
        <section className="rounded-3xl bg-slate-900/60 border border-white/10 p-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 text-teal-300 text-xs font-mono border border-teal-500/20">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>Kashmir EcoWatch Scientific Governance Charter</span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Rigorous Double-Blind Review &amp; Ethical Research Standards
          </h3>
          <p className="text-xs text-slate-300 max-w-2xl mx-auto leading-relaxed">
            All conference proceedings are archived under permanent Zenodo DOIs and Creative Commons attribution. Proceedings are strictly marked as &quot;peer-reviewed&quot; only when authenticated double-blind evaluation by accredited university referees has occurred.
          </p>
          <div className="pt-2 flex items-center justify-center gap-4 text-xs font-mono">
            <Link href="/webinars/certificates" className="text-teal-400 hover:underline">
              Verify Certificates &rarr;
            </Link>
            <span className="text-slate-600">&bull;</span>
            <Link href="/webinars/proceedings" className="text-teal-400 hover:underline">
              Browse DOI Archives &rarr;
            </Link>
            <span className="text-slate-600">&bull;</span>
            <Link href="/webinars/admin/conference-scheduler" className="text-teal-400 hover:underline">
              Scheduler Conflict Engine &rarr;
            </Link>
          </div>
        </section>
      </div>

      {/* Registration Modal */}
      {selectedSessionForReg && (
        <RegistrationModal
          session={selectedSessionForReg}
          isOpen={isRegModalOpen}
          onClose={() => setIsRegModalOpen(false)}
        />
      )}
    </div>
  );
}
