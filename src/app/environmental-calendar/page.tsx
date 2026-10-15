'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  BookOpen,
  Search,
  Filter,
  GraduationCap,
  Download,
  Printer,
  Sparkles,
  MapPin,
  Clock,
  Compass,
  CheckCircle2,
  Users,
  ArrowRight,
  Shield,
  Layers,
  Leaf,
  Droplets,
  Trees,
  Sun,
  Waves,
  Mountain,
  AlertTriangle,
  FlaskConical,
  Building2,
  PawPrint,
  Camera,
  Globe,
  Award,
  ChevronDown,
  ChevronUp,
  FileText
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import {
  environmentalCalendarEvents,
  studentProgramHighlights,
  type EnvironmentalEvent
} from '@/data/environmental-calendar';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  PawPrint,
  Waves,
  FlaskConical,
  Trees,
  Droplets,
  Globe,
  Shield,
  Leaf,
  Mountain,
  Users,
  Sun,
  Camera,
  AlertTriangle,
  Building2
};

const CATEGORIES = [
  'All',
  'Biodiversity & Wildlife',
  'Water & Wetlands',
  'Climate & Atmosphere',
  'Forests & Heritage',
  'Civic & Disaster Preparedness'
] as const;

const MONTHS = [
  'All',
  'January',
  'February',
  'March',
  'April',
  'June',
  'July',
  'September',
  'October',
  'December'
] as const;

const STUDENT_LEVELS = [
  'All',
  'Primary (Classes 1-5)',
  'Middle/High School (Classes 6-10)',
  'Higher Secondary & College'
] as const;

export default function EnvironmentalCalendarPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return environmentalCalendarEvents.filter((event) => {
      // Category Filter
      if (selectedCategory !== 'All' && event.category !== selectedCategory) {
        return false;
      }
      // Month Filter
      if (selectedMonth !== 'All' && event.month !== selectedMonth) {
        return false;
      }
      // Level Filter
      if (selectedLevel !== 'All') {
        const hasLevel = event.studentActionGuide.recommendedStudentLevels.some((lvl) =>
          lvl.toLowerCase().includes(selectedLevel.toLowerCase().split(' ')[0])
        );
        if (!hasLevel) return false;
      }
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const inTitle = event.title.toLowerCase().includes(query);
        const inTagline = event.tagline.toLowerCase().includes(query);
        const inSignificance = event.significance.toLowerCase().includes(query);
        const inActivities = event.studentActionGuide.classroomActivities.some((a) =>
          a.toLowerCase().includes(query)
        );
        const inProjects = event.studentActionGuide.studentProjectTopics.some((p) =>
          p.toLowerCase().includes(query)
        );
        if (!inTitle && !inTagline && !inSignificance && !inActivities && !inProjects) {
          return false;
        }
      }
      return true;
    });
  }, [selectedCategory, selectedMonth, selectedLevel, searchQuery]);

  // Compute Upcoming Event
  const upcomingEvent = useMemo(() => {
    const today = new Date();
    const currentMonthNumber = today.getMonth() + 1; // 1-12
    const currentDay = today.getDate();

    // Look for next upcoming event this year
    let next = environmentalCalendarEvents.find(
      (e) =>
        e.monthNumber > currentMonthNumber ||
        (e.monthNumber === currentMonthNumber && e.endDay >= currentDay)
    );

    // If none left this year, cycle back to the first one next year
    if (!next) {
      next = environmentalCalendarEvents[0];
    }
    return next;
  }, []);

  const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  const heroObservances = [
    {
      id: 'wetlands',
      src: '/images/protected-network.png',
      title: 'World Wetlands Day',
      date: 'February 2',
      status: 'Ramsar Observance',
      location: 'Hokersar & Wular Basins',
      short: 'Wetlands',
      description: 'Migratory waterfowl census & wetland hydrological audits',
    },
    {
      id: 'water-springs',
      src: '/images/bear.png',
      title: 'World Water Day & Springs',
      date: 'March 22',
      status: 'UN Water Pillar',
      location: 'Verinag, Upper Jhelum & Karewa Springs',
      short: 'Water & Springs',
      description: 'Freshwater testing, spring discharge mapping & watershed health',
    },
    {
      id: 'vanmahotsava',
      src: '/images/markhor.png',
      title: 'Vanmahotsava Tree Planting',
      date: 'July 1 – 7',
      status: 'National Green Belt',
      location: 'Valley Eco-Clubs & Forest Fringes',
      short: 'Vanmahotsava',
      description: 'Chinar, Deodar & Willow afforestation with survival monitoring',
    },
    {
      id: 'wildlife-hangul',
      src: '/images/tiger.png',
      title: 'Wildlife Week & Hangul Rut',
      date: 'October 1 – 7',
      status: 'Wildlife Week J&K',
      location: 'Dachigam National Park & Overa-Aru',
      short: 'Wildlife Week',
      description: 'Hangul roar listening, trail transects & human-wildlife co-existence',
    },
  ];
  const currentHero = heroObservances[activeHeroIdx];

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
            Student Field Observance
          </span>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-semibold">
          {currentHero.date}
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
              {currentHero.status}
            </span>
          </div>
          <p className="text-[11px] text-slate-300 line-clamp-1 mb-1">
            {currentHero.description}
          </p>
          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span className="text-emerald-300 flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {currentHero.location}
            </span>
            <span className="font-mono text-slate-400">Outdoor Lab</span>
          </div>
        </div>
      </div>

      {/* 4 Interactive Thumbnail Buttons */}
      <div className="grid grid-cols-4 gap-1.5 mt-2.5">
        {heroObservances.map((item, idx) => (
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
              <img src={item.src} alt={item.short} className="w-full h-full object-cover" />
            </div>
            <span
              className={`text-[9px] font-bold truncate w-full text-center ${
                activeHeroIdx === idx ? 'text-emerald-300' : 'text-slate-400'
              }`}
            >
              {item.short}
            </span>
          </button>
        ))}
      </div>
    </div>
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500/30 selection:text-emerald-200">
      <div>
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
                  Environmental Calendar &amp; Student Action Hub
                </span>
              </div>
            </div>
          }
          subtitle="The official ecological observance framework and experiential learning calendar for schools, colleges, and youth eco-clubs across Jammu, Kashmir & Ladakh. Coupled with the historic Outdoor Classroom curriculum, practical fieldwork guides, and empirical project topics."
          icon={<Calendar className="w-6 h-6 text-emerald-400" />}
          label="Environmental Education · School & Youth Observances"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Education & Youth', href: '/ngo-impact' },
            { label: 'Environmental Calendar' },
          ]}
          images={[
            '/images/protected-network.png',
            '/images/bear.png',
            '/images/markhor.png',
            '/images/tiger.png',
          ]}
          rightContent={heroShowcaseCard}
          actions={
            <div className="flex flex-wrap items-center gap-2">
              <a href="#outdoor-classroom">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 font-bold transition-all shadow-md shadow-emerald-500/20"
                  icon={<GraduationCap className="w-4 h-4" />}
                >
                  Outdoor Classroom
                </Button>
              </a>
              <Button
                onClick={handlePrint}
                size="sm"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 font-bold transition-all"
                icon={<Printer className="w-4 h-4" />}
              >
                Print Calendar
              </Button>
              <a href="#calendar-directory">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 font-bold transition-all"
                  icon={<Calendar className="w-4 h-4" />}
                >
                  All 16 Observances
                </Button>
              </a>
            </div>
          }
        />

        {/* Telemetry / Upcoming Observance & KPI Strip */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mt-4 mb-6">
          {upcomingEvent && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/95 via-emerald-950/70 to-slate-900/95 border border-emerald-500/30 backdrop-blur-xl relative overflow-hidden shadow-xl mb-6"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-0.5 shrink-0 shadow-lg shadow-emerald-950/50 flex flex-col items-center justify-center text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">
                      {upcomingEvent.month.slice(0, 3)}
                    </span>
                    <span className="text-lg font-black leading-tight">
                      {upcomingEvent.day}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Next Upcoming Observance
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {upcomingEvent.category}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                      {upcomingEvent.title}
                      <Sparkles className="w-4 h-4 text-amber-400" />
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-1 mt-0.5">
                      {upcomingEvent.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                  <Link
                    href={upcomingEvent.linkedPlatformRoute}
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-emerald-300 hover:text-white border border-white/10 transition-colors w-full md:w-auto justify-center"
                  >
                    <span>Explore {upcomingEvent.linkedModuleLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl glass-light border border-white/10 bg-slate-900/60 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono mb-1">
                <Calendar className="w-4 h-4" />
                <span>ANNUAL OBSERVANCES</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">16</div>
              <p className="text-[11px] text-slate-400 mt-1">Official UN, national & regional dates</p>
            </div>

            <div className="p-4 rounded-xl glass-light border border-white/10 bg-slate-900/60 backdrop-blur-md">
              <div className="flex items-center gap-2 text-teal-400 text-xs font-mono mb-1">
                <GraduationCap className="w-4 h-4" />
                <span>STUDENT PROJECT TOPICS</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">60+</div>
              <p className="text-[11px] text-slate-400 mt-1">Empirical field & classroom exercises</p>
            </div>

            <div className="p-4 rounded-xl glass-light border border-white/10 bg-slate-900/60 backdrop-blur-md">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
                <Users className="w-4 h-4" />
                <span>STUDENT ENGAGEMENT</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">Valley-Wide</div>
              <p className="text-[11px] text-slate-400 mt-1">School & college youth participating</p>
            </div>

            <div className="p-4 rounded-xl glass-light border border-white/10 bg-slate-900/60 backdrop-blur-md">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-1">
                <Compass className="w-4 h-4" />
                <span>OUTDOOR CLASSROOM</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">4 Pillars</div>
              <p className="text-[11px] text-slate-400 mt-1">Tours, labs, surveys & local wisdom</p>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <section className="sticky top-16 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-white/10 py-4 shadow-xl">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            {/* Search Input and Selects */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search observances, project topics, activities, or species..."
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-900/80 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>

              {/* Month Selector */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-thin">
                <span className="text-[11px] font-mono text-slate-400 uppercase shrink-0">Month:</span>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50 shrink-0"
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Student Level Selector */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[11px] font-mono text-slate-400 uppercase shrink-0">Level:</span>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/50 shrink-0"
                >
                  {STUDENT_LEVELS.map((lvl) => (
                    <option key={lvl} value={lvl}>
                      {lvl}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/30'
                        : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 hover:border-white/15'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Calendar Events Grid */}
        <section id="calendar-directory" className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  Observance Timeline & Guides
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Showing {filteredEvents.length} of {environmentalCalendarEvents.length} environmental dates
                </p>
              </div>

              {(selectedCategory !== 'All' || selectedMonth !== 'All' || selectedLevel !== 'All' || searchQuery) && (
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedMonth('All');
                    setSelectedLevel('All');
                    setSearchQuery('');
                  }}
                  className="text-xs font-mono text-emerald-400 hover:underline"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {filteredEvents.length === 0 ? (
              <div className="p-12 text-center rounded-2xl glass-light border-white/10">
                <Calendar className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-white mb-1">No matching observances found</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Try broadening your search or clearing the category and month filters.
                </p>
                <Button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedMonth('All');
                    setSelectedLevel('All');
                    setSearchQuery('');
                  }}
                  variant="outline"
                  size="sm"
                  className="border-white/20 text-white"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map((event, idx) => {
                  const Icon = ICON_MAP[event.iconName] || Calendar;
                  const isExpanded = expandedEventId === event.id;

                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Card className="p-5 sm:p-6 rounded-2xl glass-intense border-white/10 hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between h-full group">
                        <div>
                          {/* Card Header with Date Badge */}
                          <div className="flex items-start justify-between gap-4 mb-4">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${event.accentGradient} p-0.5 shrink-0 shadow-lg flex flex-col items-center justify-center text-white`}
                              >
                                <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">
                                  {event.month.slice(0, 3)}
                                </span>
                                <span className="text-base font-black leading-tight">
                                  {event.day}
                                </span>
                              </div>
                              <div>
                                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                                  {event.category}
                                </span>
                                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mt-1">
                                  {event.title}
                                </h3>
                              </div>
                            </div>

                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 text-slate-400 group-hover:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                          </div>

                          {/* Tagline */}
                          <p className="text-xs font-medium text-emerald-300/90 mb-2">
                            {event.tagline}
                          </p>

                          {/* Significance Description */}
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                            {event.significance}
                          </p>

                          {/* Historical ESRO Context Box */}
                          <div className="p-3 rounded-xl bg-slate-900/60 border border-white/5 text-[11px] text-slate-400 mb-4 flex items-start gap-2.5">
                            <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="text-slate-300 font-semibold block mb-0.5">
                                Historical Background (ESRO / eIEN Kashmir):
                              </span>
                              {event.historicalContext}
                            </div>
                          </div>

                          {/* Collapsible Action Guide */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden space-y-4 pt-2 border-t border-white/10"
                              >
                                {/* Overview */}
                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-1 flex items-center gap-1.5">
                                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                                    Student Action Summary
                                  </h4>
                                  <p className="text-xs text-slate-400">
                                    {event.studentActionGuide.overview}
                                  </p>
                                </div>

                                {/* Classroom Activities */}
                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
                                    Classroom & Campus Activities
                                  </h4>
                                  <ul className="space-y-1.5">
                                    {event.studentActionGuide.classroomActivities.map((act, i) => (
                                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                                        <span>{act}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Field Trip Ideas */}
                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                                    <Compass className="w-3.5 h-3.5 text-cyan-400" />
                                    Field Study & Excursion Destinations
                                  </h4>
                                  <ul className="space-y-1.5">
                                    {event.studentActionGuide.fieldTripIdeas.map((trip, i) => (
                                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                                        <span>{trip}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Student Project Topics */}
                                <div>
                                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
                                    <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                                    Recommended Student Project Topics
                                  </h4>
                                  <div className="space-y-1.5">
                                    {event.studentActionGuide.studentProjectTopics.map((proj, i) => (
                                      <div
                                        key={i}
                                        className="p-2 rounded-lg bg-white/5 border border-white/5 text-xs text-slate-200"
                                      >
                                        💡 {proj}
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Recommended Levels */}
                                <div className="pt-2">
                                  <span className="text-[11px] font-mono text-slate-400 uppercase block mb-1.5">
                                    Recommended Education Tiers:
                                  </span>
                                  <div className="flex flex-wrap gap-1.5">
                                    {event.studentActionGuide.recommendedStudentLevels.map((lvl) => (
                                      <span
                                        key={lvl}
                                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/10"
                                      >
                                        {lvl}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Card Bottom CTA Row */}
                        <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between gap-3">
                          <button
                            onClick={() => setExpandedEventId(isExpanded ? null : event.id)}
                            className="text-xs font-medium text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                          >
                            <span>{isExpanded ? 'Hide Action Guide' : 'View Student Action Guide'}</span>
                            {isExpanded ? (
                              <ChevronUp className="w-3.5 h-3.5" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <Link
                            href={event.linkedPlatformRoute}
                            className="text-xs font-medium text-slate-400 hover:text-white flex items-center gap-1 group/link transition-colors"
                          >
                            <span>{event.linkedModuleLabel}</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Outdoor Classroom Deep Dive Section */}
        <section
          id="outdoor-classroom"
          className="py-16 bg-gradient-to-b from-slate-900/60 to-slate-950 border-t border-white/10 relative overflow-hidden"
        >
          <div className="absolute top-1/2 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono mb-4">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>PEDAGOGICAL FRAMEWORK</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
                Outdoor Classroom (OD)
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  Learning Beyond the Classroom
                </span>
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Pioneered by the Environment Services & Research Organization (ESRO) and eIEN Kashmir, the Outdoor Classroom curriculum engages students and educators across high schools and colleges in the Kashmir Valley. We provide practical logistical frameworks, fieldwork protocols, and experiential study tours linking academic textbooks with real Himalayan ecosystems.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studentProgramHighlights.corePillars.map((pillar, i) => {
                const PillarIcon = ICON_MAP[pillar.icon] || BookOpen;
                return (
                  <Card
                    key={i}
                    className="p-6 rounded-2xl glass-light border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                        <PillarIcon className="w-6 h-6" />
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{pillar.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* School Partnership Banner */}
            <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">
                  Are You a School Principal, Teacher, or Student Eco-Club Leader?
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
                  Connect your classroom with Kashmir EcoWatch live spatial layers, request student field kit checklists, or schedule an educational study tour to Kashmir's protected wetlands and parks.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Link
                  href="/get-involved/volunteer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-lg shadow-emerald-950/50 transition-all"
                >
                  Join Student Network
                </Link>
                <Link
                  href="/protected-network/atlas"
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs transition-colors"
                >
                  Explore GIS Atlas
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <AdvancedFooter />
    </main>
  );
}
