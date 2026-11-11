'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  Layers,
  Video,
  Award,
  FileText,
  Sparkles,
  Filter,
  Search,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Building2,
  ChevronRight,
  Info,
  Globe2,
  X,
  Radio,
  BookOpen,
  Copy,
  Check,
  Sliders
} from 'lucide-react';
import { Heading } from '@/components/common/Heading';
import { WebinarNav } from '@/components/webinars/WebinarNav';
import { Button } from '@/components/ui/Button';
import { TimeZoneSelector } from '@/components/webinars/TimezoneSelector';
import { TimeZoneConverterModal } from '@/components/webinars/TimeZoneConverterModal';
import {
  SCIENTIFIC_PROGRAM_ACTIVITIES,
  SCIENTIFIC_PROGRAM_TARGETS,
  MODULE_COVERAGE_MATRIX,
  ScientificProgramActivity,
  ActivityType
} from '@/data/scientific-program-2027-2028';
import {
  convertEventInstant,
  getWorldwideComparison,
  srinagarTimeToUtcIso,
  calculateInternationalFairness,
  MAJOR_INTERNATIONAL_HUBS
} from '@/lib/conference-timezone';

export default function ScientificProgramCalendarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<'all' | '2027' | '2028'>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [activeView, setActiveView] = useState<'timeline' | 'flagships' | 'matrix' | 'sandbox'>('timeline');
  const [selectedActivity, setSelectedActivity] = useState<ScientificProgramActivity | null>(null);

  // Time zone engine state
  const [participantZone, setParticipantZone] = useState('Asia/Kolkata');
  const [isConverterOpen, setIsConverterOpen] = useState(false);
  const [modalEventData, setModalEventData] = useState({
    date: '2027-06-10',
    time: '18:00',
    title: 'Western Himalayan Scientific Session'
  });

  // Sandbox interactive preview state
  const [sandboxDate, setSandboxDate] = useState('2027-06-10');
  const [sandboxTime24, setSandboxTime24] = useState('18:00');
  const [sandboxCopied, setSandboxCopied] = useState(false);

  // Compute sandbox conversion
  const sandboxUtcIso = useMemo(() => {
    return srinagarTimeToUtcIso(sandboxDate, sandboxTime24);
  }, [sandboxDate, sandboxTime24]);

  const sandboxWorldwideTimes = useMemo(() => {
    return getWorldwideComparison(sandboxUtcIso);
  }, [sandboxUtcIso]);

  const sandboxFairness = useMemo(() => {
    const internationalHubs = ['America/New_York', 'Europe/London', 'Europe/Zurich', 'Asia/Tokyo', 'Australia/Sydney'];
    return calculateInternationalFairness(sandboxUtcIso, internationalHubs);
  }, [sandboxUtcIso]);

  const handleCopySandboxSchedule = () => {
    const lines = [
      `Kashmir EcoWatch · Worldwide Scientific Event Schedule`,
      `Organizer: Srinagar / India (Asia/Kolkata · IST)`,
      `Scheduled Start: ${sandboxDate} at ${sandboxTime24} IST`,
      `----------------------------------------------------`,
      ...sandboxWorldwideTimes.map(t => `${t.city} (${t.country}): ${t.formattedDate}, ${t.formattedTime} [${t.timeZoneAbbr}] ${t.dayDifference !== 'same_day' ? `(${t.dayDifferenceLabel})` : ''}`),
      `----------------------------------------------------`,
      `Auto-converted via IANA UTC synchronization with DST support.`
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setSandboxCopied(true);
    setTimeout(() => setSandboxCopied(false), 2500);
  };

  // Available modules list for filter
  const modules = useMemo(() => {
    const set = new Set<string>();
    SCIENTIFIC_PROGRAM_ACTIVITIES.forEach(a => set.add(a.primaryModule));
    return ['all', ...Array.from(set).sort()];
  }, []);

  // Filtered activities
  const filteredActivities = useMemo(() => {
    return SCIENTIFIC_PROGRAM_ACTIVITIES.filter(activity => {
      if (selectedYear !== 'all' && activity.year.toString() !== selectedYear) return false;
      if (selectedType !== 'all' && activity.type !== selectedType) return false;
      if (selectedModule !== 'all' && activity.primaryModule !== selectedModule && !activity.relatedSubmodules.includes(selectedModule)) return false;
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        const match = 
          activity.title.toLowerCase().includes(query) ||
          activity.theme.toLowerCase().includes(query) ||
          activity.discipline.toLowerCase().includes(query) ||
          activity.intendedOutput.toLowerCase().includes(query) ||
          activity.geographicCoverage.toLowerCase().includes(query) ||
          activity.dateDisplay.toLowerCase().includes(query);
        if (!match) return false;
      }
      return true;
    });
  }, [searchTerm, selectedYear, selectedType, selectedModule]);

  // Group activities by Year and Month
  const groupedActivities = useMemo(() => {
    const groups: { [key: string]: ScientificProgramActivity[] } = {};
    filteredActivities.forEach(act => {
      const key = `${act.year} - ${act.monthName}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(act);
    });
    return groups;
  }, [filteredActivities]);

  const flagshipsOnly = useMemo(() => {
    return SCIENTIFIC_PROGRAM_ACTIVITIES.filter(a => a.type === 'flagship_conference');
  }, []);

  // Download ICS handler
  const handleDownloadIcs = (act: ScientificProgramActivity) => {
    const defaultTime = act.timeIST.includes('14:30') ? '14:30' : '10:30';
    const actDate = act.exactDate || `${act.year}-${String(act.month).padStart(2, '0')}-15`;
    const utcStart = srinagarTimeToUtcIso(actDate, defaultTime);

    const startDate = new Date(utcStart);
    const endDate = new Date(startDate.getTime() + 90 * 60 * 1000);

    const formatUtc = (d: Date) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Kashmir EcoWatch//Global Scientific Program//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:kew-${act.id}-${startDate.getTime()}@kashmir-ecowatch.com`,
      `DTSTAMP:${formatUtc(new Date())}`,
      `DTSTART:${formatUtc(startDate)}`,
      `DTEND:${formatUtc(endDate)}`,
      `SUMMARY:${act.title}`,
      `DESCRIPTION:${act.theme}\\n\\nPrimary Module: ${act.primaryModule}\\nIntended Output: ${act.intendedOutput}`,
      'LOCATION:Kashmir EcoWatch Virtual Conference Hall (LiveKit WebRTC)',
      'STATUS:TENTATIVE',
      'BEGIN:VALARM',
      'TRIGGER:-PT24H',
      'ACTION:DISPLAY',
      'DESCRIPTION:Reminder: Kashmir EcoWatch Session in 24 Hours',
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${act.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openConverterForActivity = (act: ScientificProgramActivity) => {
    const actDate = act.exactDate || `${act.year}-${String(act.month).padStart(2, '0')}-15`;
    const actTime = act.timeIST.includes('14:30') ? '14:30' : act.timeIST.includes('18:00') ? '18:00' : '10:30';
    setModalEventData({
      date: actDate,
      time: actTime,
      title: act.title
    });
    setIsConverterOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Canonical Institutional Header */}
      <Heading
        label="KASHMIR ECOWATCH · 24-MONTH COMPREHENSIVE MASTER CALENDAR"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Webinars & Conferences', href: '/webinars' },
          { label: '2027–2028 Master Calendar' }
        ]}
        icon={<Calendar className="w-6 h-6 text-teal-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-teal-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                2027–2028
              </span>
              <span className="text-white">Scientific Conferences,</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent pr-6 tracking-normal">
                Webinars &amp; Observances
              </span>
            </div>
          </div>
        }
        subtitle="Proposed inaugural two-year institutional program · 104 activities across 8 flagship summits, 48 specialist webinars, 24 applied workshops, and 24 environmental observances with automatic global time zone conversion and DST synchronization."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              onClick={() => {
                setModalEventData({ date: '2027-06-10', time: '18:00', title: 'Global Time Zone Intelligence Preview' });
                setIsConverterOpen(true);
              }}
              className="bg-teal-600 hover:bg-teal-500 font-bold text-white shadow-md shadow-teal-600/20"
            >
              <Globe2 className="w-4 h-4 mr-1.5" />
              World Clock Tool
            </Button>
            <Link href="/webinars/host-a-conference">
              <Button size="sm" variant="outline" className="border-teal-500/40 text-teal-300 hover:bg-teal-950/40 font-bold">
                Apply to Co-Host
              </Button>
            </Link>
          </div>
        }
      />

      {/* Prominent 5-Metric Target Strip */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 p-4 sm:p-5 rounded-3xl bg-slate-900/90 border border-teal-500/30 backdrop-blur-xl shadow-2xl">
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-mono">
              {SCIENTIFIC_PROGRAM_TARGETS.flagshipConferences}
            </div>
            <div className="text-xs font-bold text-white leading-tight">Flagship Summits</div>
            <div className="text-[10px] text-slate-400 font-mono">4 in 2027 · 4 in 2028</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">
              {SCIENTIFIC_PROGRAM_TARGETS.specialistWebinars}
            </div>
            <div className="text-xs font-bold text-white leading-tight">Specialist Webinars</div>
            <div className="text-[10px] text-slate-400 font-mono">2 / Month (24 Mos)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-300 font-mono">
              {SCIENTIFIC_PROGRAM_TARGETS.appliedWorkshops}
            </div>
            <div className="text-xs font-bold text-white leading-tight">Applied Workshops</div>
            <div className="text-[10px] text-slate-400 font-mono">1 / Month (24 Mos)</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-white/5 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
              {SCIENTIFIC_PROGRAM_TARGETS.environmentalObservances}
            </div>
            <div className="text-xs font-bold text-white leading-tight">Observance Events</div>
            <div className="text-[10px] text-slate-400 font-mono">Outdoor Classroom</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-teal-500/40 text-center space-y-1 col-span-2 sm:col-span-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {SCIENTIFIC_PROGRAM_TARGETS.totalActivities}
            </div>
            <div className="text-xs font-bold text-teal-300 leading-tight">Total Activities</div>
            <div className="text-[10px] text-amber-300 font-mono font-bold uppercase">All Proposed 2027–28</div>
          </div>
        </div>
      </div>

      <WebinarNav />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Controls Bar: Search, View Switcher & Filters */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-white/10 space-y-5 shadow-xl">
          {/* Top Row: Search & View Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search 104 activities by topic, wetland, glaciology, EIA, or output..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950/80 border border-white/10 shrink-0 overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveView('timeline')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeView === 'timeline'
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Chronological Schedule ({filteredActivities.length})
              </button>
              <button
                onClick={() => setActiveView('flagships')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeView === 'flagships'
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                8 Flagship Summits
              </button>
              <button
                onClick={() => setActiveView('sandbox')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  activeView === 'sandbox'
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>Time Zone Sandbox</span>
              </button>
              <button
                onClick={() => setActiveView('matrix')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                  activeView === 'matrix'
                    ? 'bg-teal-500 text-slate-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Matrix (30)
              </button>
            </div>
          </div>

          {/* Bottom Filter Row: Year, Format, Domain & Time Zone Selector */}
          <div className="pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
            {/* Year Filters */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium">Program Year:</span>
              {(['all', '2027', '2028'] as const).map(yr => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-colors ${
                    selectedYear === yr
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                      : 'bg-slate-800 text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  {yr === 'all' ? 'All (2027–2028)' : `${yr} Program`}
                </button>
              ))}
            </div>

            {/* Type Filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-slate-400 font-medium shrink-0">Format:</span>
              {[
                { id: 'all', label: 'All Formats' },
                { id: 'flagship_conference', label: 'Flagship Summits (8)' },
                { id: 'specialist_webinar', label: 'Webinars (48)' },
                { id: 'applied_workshop', label: 'Workshops (24)' },
                { id: 'environmental_observance', label: 'Observances (24)' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedType(t.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs whitespace-nowrap transition-colors ${
                    selectedType === t.id
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white border border-transparent'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Module Dropdown */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-slate-400 font-medium">Domain:</span>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="bg-slate-800 text-teal-200 border border-white/10 rounded-lg px-2.5 py-1 text-xs focus:outline-none max-w-[160px] truncate"
              >
                <option value="all">All 30 Domains</option>
                {modules.filter(m => m !== 'all').map(mod => (
                  <option key={mod} value={mod}>{mod}</option>
                ))}
              </select>
            </div>

            {/* Interactive Time Zone Selector */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-slate-400 font-medium">Your Local Time:</span>
              <TimeZoneSelector
                selectedZone={participantZone}
                onSelectZone={setParticipantZone}
              />
            </div>
          </div>

          {/* Time Zone Indicator Notice */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-white/5 font-mono">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>
                Viewing times in: <strong className="text-teal-300">{participantZone}</strong>
                {participantZone !== 'Asia/Kolkata' && (
                  <span className="text-slate-500 ml-1.5">
                    (Organizer reference: Asia/Kolkata · IST UTC+5:30)
                  </span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-bold">Status: PROPOSED</span>
              <button
                onClick={() => {
                  setModalEventData({ date: '2027-06-10', time: '18:00', title: 'Interactive Worldwide Scheduling Preview' });
                  setIsConverterOpen(true);
                }}
                className="text-teal-400 hover:text-teal-300 underline font-semibold flex items-center gap-1"
              >
                <Globe2 className="w-3 h-3" />
                <span>Open World Clock Tool</span>
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: CHRONOLOGICAL MASTER SCHEDULE                    */}
        {/* ======================================================== */}
        {activeView === 'timeline' && (
          <div className="space-y-8">
            {Object.keys(groupedActivities).length === 0 ? (
              <div className="p-12 text-center rounded-3xl bg-slate-900/40 border border-white/5 space-y-3">
                <Info className="w-8 h-8 text-slate-500 mx-auto" />
                <h4 className="text-base font-bold text-white">No activities match your filters</h4>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Try adjusting the year, format, or search term to browse the 104 proposed activities.
                </p>
                <Button
                  size="sm"
                  onClick={() => { setSearchTerm(''); setSelectedYear('all'); setSelectedType('all'); setSelectedModule('all'); }}
                  className="bg-teal-600 hover:bg-teal-500 text-white font-bold"
                >
                  Reset All Filters
                </Button>
              </div>
            ) : (
              Object.entries(groupedActivities).map(([monthGroup, acts]) => (
                <div key={monthGroup} className="space-y-4">
                  {/* Month Header Banner */}
                  <div className="sticky top-28 md:top-32 z-20 flex items-center justify-between bg-slate-950/95 backdrop-blur-md py-2.5 px-4 rounded-2xl border border-white/10 shadow-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-teal-400" />
                      <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
                        {monthGroup}
                      </h3>
                      <span className="text-xs font-mono text-slate-400">
                        ({acts.length} Proposed Activities)
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-teal-400">
                      {monthGroup.startsWith('2027') ? 'Phase 1: Baselines & Dialogue' : 'Phase 2: Applied Interventions'}
                    </span>
                  </div>

                  {/* Activity Cards List */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {acts.map((act) => {
                      const isFlagship = act.type === 'flagship_conference';
                      const isWorkshop = act.type === 'applied_workshop';
                      const isObservance = act.type === 'environmental_observance';

                      // Localized Time Zone Conversion
                      const defaultTime = act.timeIST.includes('14:30') ? '14:30' : '10:30';
                      const actDate = act.exactDate || `${act.year}-${String(act.month).padStart(2, '0')}-15`;
                      const utcIso = srinagarTimeToUtcIso(actDate, defaultTime);
                      const locTime = convertEventInstant(utcIso, participantZone);

                      return (
                        <div
                          key={act.id}
                          className={`rounded-2xl p-5 flex flex-col justify-between space-y-4 transition-all hover:border-teal-500/60 shadow-lg ${
                            isFlagship
                              ? 'bg-gradient-to-b from-purple-950/40 via-slate-900 to-slate-950 border border-purple-500/40'
                              : isWorkshop
                              ? 'bg-slate-900/80 border border-emerald-500/30'
                              : isObservance
                              ? 'bg-slate-900/80 border border-amber-500/30'
                              : 'bg-slate-900/80 border border-white/10'
                          }`}
                        >
                          <div className="space-y-3">
                            {/* Type & Date Badges */}
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                isFlagship
                                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                                  : isWorkshop
                                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                  : isObservance
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                              }`}>
                                {act.typeLabel}
                              </span>

                              <span className="text-xs font-mono text-teal-300 font-bold">
                                {act.dateDisplay}
                              </span>
                            </div>

                            {/* Title */}
                            <div>
                              <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                                {act.title}
                              </h4>
                              <div className="text-[11px] font-mono text-slate-400 mt-1 flex items-center gap-1.5">
                                <span className="text-teal-400">{act.primaryModule}</span>
                                <span>&bull;</span>
                                <span className="truncate">{act.discipline}</span>
                              </div>
                            </div>

                            {/* Theme / Description */}
                            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                              {act.theme}
                            </p>

                            {/* Intended Output Badge */}
                            <div className="p-2 rounded-xl bg-slate-950/70 border border-white/5 space-y-0.5">
                              <span className="text-[9px] font-mono uppercase text-slate-400 block font-bold">
                                Intended Scientific Output:
                              </span>
                              <span className="text-[11px] text-emerald-300 font-medium leading-tight block line-clamp-1">
                                {act.intendedOutput}
                              </span>
                            </div>

                            {/* Local Time Zone Conversion Display */}
                            {participantZone !== 'Asia/Kolkata' ? (
                              <div className="p-2 rounded-xl bg-teal-950/30 border border-teal-500/30 text-[11px] font-mono space-y-1">
                                <div className="flex items-center justify-between text-teal-300 font-bold">
                                  <span className="flex items-center gap-1">
                                    <Clock className="w-3 h-3 text-teal-400" />
                                    <span>Local: {locTime.formattedDate}, {locTime.formattedTime}</span>
                                  </span>
                                  <span className="text-[10px] text-slate-400">{locTime.timeZoneAbbr}</span>
                                </div>
                                <div className="flex items-center justify-between text-[10px] text-slate-400">
                                  <span>Organizer: {act.timeIST}</span>
                                  <span className={locTime.isConvenient ? 'text-emerald-400' : 'text-amber-400'}>
                                    {locTime.dayDifference !== 'same_day' ? locTime.dayDifferenceLabel : (locTime.isConvenient ? 'Daytime' : 'Late/Early')}
                                  </span>
                                </div>
                              </div>
                            ) : null}
                          </div>

                          {/* Action Footer */}
                          <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                            <span className="text-[10px] font-mono text-slate-400 truncate">
                              {act.timeIST}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                onClick={() => openConverterForActivity(act)}
                                title="Worldwide Time Comparison"
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-teal-300 hover:text-white border border-white/10"
                              >
                                <Globe2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDownloadIcs(act)}
                                title="Download .ics Calendar Invite"
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-white/10"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setSelectedActivity(act)}
                                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-teal-500/20 hover:bg-teal-500 text-teal-300 hover:text-slate-950 border border-teal-500/40 transition-colors"
                              >
                                Dossier
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: 8 FLAGSHIP SUMMITS SHOWCASE                      */}
        {/* ======================================================== */}
        {activeView === 'flagships' && (
          <div className="space-y-8">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-purple-500/30 space-y-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Flagship Academic Pillars
              </span>
              <h3 className="text-2xl font-bold text-white">
                Eight Major Western Himalayan Conferences (2027–2028)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                These eight flagship summits anchor the two-year program, each providing multi-day parallel halls, international faculties, double-blind abstract review workflows, and permanent Zenodo DOI indexed proceedings upon event conclusion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {flagshipsOnly.map((conf, index) => (
                <div
                  key={conf.id}
                  className="rounded-3xl bg-slate-900/80 border border-purple-500/30 hover:border-purple-500/60 p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xl"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/40">
                        Flagship Summit #{index + 1} &bull; {conf.year}
                      </span>
                      <span className="text-xs font-mono text-teal-300 font-bold">
                        {conf.dateDisplay}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-white leading-snug">
                        {conf.title}
                      </h4>
                      <div className="text-xs font-medium text-teal-300 mt-1">
                        {conf.discipline} &bull; {conf.geographicCoverage}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {conf.theme}
                    </p>

                    <div className="p-3 rounded-2xl bg-slate-950/80 border border-white/5 space-y-1 font-mono text-xs">
                      <div className="text-[10px] text-slate-400 uppercase">Target Research Output:</div>
                      <div className="text-emerald-300 font-semibold">{conf.intendedOutput}</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-slate-400">Related Modules:</span>
                      {conf.relatedSubmodules.map(mod => (
                        <span key={mod} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5">
                          {mod}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center gap-2">
                    <Link href={`/webinars/conferences/${conf.conferenceId || conf.id}`} className="flex-1">
                      <Button size="sm" className="w-full bg-teal-600 hover:bg-teal-500 font-bold text-white text-xs">
                        Conference Dossier &amp; Tracks
                      </Button>
                    </Link>
                    <button
                      onClick={() => openConverterForActivity(conf)}
                      title="Worldwide Time Zone Preview"
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 border border-white/10 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Globe2 className="w-3.5 h-3.5" />
                      <span>Times</span>
                    </button>
                    <button
                      onClick={() => handleDownloadIcs(conf)}
                      className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>.ics</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 3: INTERACTIVE TIME ZONE SANDBOX (USER DIRECTIVE)    */}
        {/* ======================================================== */}
        {activeView === 'sandbox' && (
          <div className="space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-teal-500/40 space-y-6 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="space-y-1 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-mono font-bold uppercase border border-teal-500/40">
                    <Globe2 className="w-3.5 h-3.5 text-teal-400" />
                    <span>INTERACTIVE TIME ZONE PREVIEW</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    Scientific Webinar Scheduling
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Illustrative event scheduled for June 10, 2027, at 6:00 PM in Srinagar (18:00 IST). Modify the date and time below to test automatic worldwide conversion, daylight-saving transitions, and international date crossings.
                  </p>
                </div>

                <Button
                  onClick={handleCopySandboxSchedule}
                  className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-5 py-2.5 text-xs shrink-0 shadow-lg shadow-teal-500/25"
                >
                  {sandboxCopied ? (
                    <>
                      <Check className="w-4 h-4 mr-1.5" />
                      <span>Worldwide Schedule Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1.5" />
                      <span>Copy Worldwide Schedule</span>
                    </>
                  )}
                </Button>
              </div>

              {/* Interactive Controls */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 font-bold">
                    Organizer&apos;s Official Time Zone
                  </label>
                  <div className="px-3.5 py-2.5 rounded-xl bg-slate-900 border border-teal-500/40 text-xs text-teal-300 font-bold flex items-center gap-2">
                    <span className="text-base">🇮🇳</span>
                    <span>Srinagar / India (Asia/Kolkata)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 font-bold">
                    Event Date
                  </label>
                  <input
                    type="date"
                    value={sandboxDate}
                    onChange={(e) => setSandboxDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5 font-bold">
                    Event Start Time (24-Hour)
                  </label>
                  <input
                    type="time"
                    value={sandboxTime24}
                    onChange={(e) => setSandboxTime24(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white focus:outline-none focus:border-teal-500 font-mono"
                  />
                </div>
              </div>

              {/* Converted Worldwide Schedule Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 uppercase font-bold text-[11px]">
                    Event Time Around The World
                  </span>
                  <span className="text-teal-400">
                    UTC Timestamp: {sandboxUtcIso}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  {sandboxWorldwideTimes.map((loc) => {
                    const isSrinagar = loc.iana === 'Asia/Kolkata';

                    return (
                      <div
                        key={loc.iana}
                        className={`p-4 rounded-2xl border transition-all ${
                          isSrinagar
                            ? 'bg-teal-950/40 border-teal-500/60 shadow-lg shadow-teal-500/10'
                            : 'bg-slate-950/60 border-white/10'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <span>{loc.flag}</span>
                            <span>{loc.city}</span>
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">
                            {loc.timeZoneAbbr}
                          </span>
                        </div>

                        <div className="text-[10px] text-slate-400 font-mono truncate mb-2">
                          {loc.country} &bull; {loc.iana}
                        </div>

                        <div className="text-base font-extrabold text-white font-mono pt-1 border-t border-white/5">
                          {loc.formattedDate}, {loc.formattedTime}
                        </div>

                        <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/5 text-[10px] font-mono">
                          <span className={`px-1.5 py-0.5 rounded ${
                            loc.dayDifference === 'same_day'
                              ? 'bg-slate-800 text-slate-300'
                              : loc.dayDifference === 'previous_day'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          }`}>
                            {loc.dayDifferenceLabel}
                          </span>

                          <span className={`px-1.5 py-0.5 rounded font-bold ${
                            loc.convenienceRating === 'optimal'
                              ? 'text-emerald-400 bg-emerald-500/10'
                              : loc.convenienceRating === 'acceptable'
                              ? 'text-teal-300 bg-teal-500/10'
                              : 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                          }`}>
                            {loc.convenienceRating === 'optimal'
                              ? 'Working Hours'
                              : loc.convenienceRating === 'acceptable'
                              ? 'Extended'
                              : 'Early/Late'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* International Scheduling Optimizer */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 space-y-2 text-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="font-mono text-teal-400 font-bold uppercase text-xs flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>International Scheduling Fairness Optimizer</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 w-fit">
                    Fairness Score: {sandboxFairness.score}% ({sandboxFairness.rating})
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed text-xs">
                  {sandboxFairness.recommendation}
                </p>
                <div className="text-[11px] text-slate-500 font-mono pt-1">
                  Evaluated across partner time zones in North America, Western Europe, Central Europe, East Asia, and Australia.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 4: MODULE COVERAGE MATRIX (30 DOMAINS)              */}
        {/* ======================================================== */}
        {activeView === 'matrix' && (
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 space-y-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-500/20 text-teal-300 border border-teal-500/40">
                Institutional Scope Audit
              </span>
              <h3 className="text-2xl font-bold text-white">
                Scientific Module Coverage Matrix (30 Domains)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                The 2027–2028 program establishes 100% comprehensive coverage across Kashmir EcoWatch&apos;s physical, biological, geospatial, and civil society modules.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 overflow-hidden shadow-2xl bg-slate-900/60">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-950/90 text-teal-300 font-mono uppercase text-[10px] border-b border-white/10">
                    <tr>
                      <th className="py-3 px-4">Kashmir EcoWatch Domain</th>
                      <th className="py-3 px-4">Covered Subjects &amp; Focus</th>
                      <th className="py-3 px-4">Main Program Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {MODULE_COVERAGE_MATRIX.map((row, idx) => (
                      <tr key={row.domain} className={idx % 2 === 0 ? 'bg-slate-900/40' : 'bg-slate-950/40'}>
                        <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                          {row.domain}
                        </td>
                        <td className="py-3 px-4 text-slate-300 leading-relaxed">
                          {row.coveredSubjects}
                        </td>
                        <td className="py-3 px-4 font-mono text-teal-400 whitespace-nowrap">
                          {row.period}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Activity Detail Modal / Drawer */}
      {selectedActivity && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-teal-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/40">
                  {selectedActivity.typeLabel} &bull; {selectedActivity.dateDisplay}
                </span>
                <h3 className="text-xl font-bold text-white leading-snug mt-1">
                  {selectedActivity.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedActivity(null)}
                className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold mb-1">Theme &amp; Abstract:</span>
                <p className="text-slate-200 leading-relaxed bg-slate-950/60 p-3.5 rounded-xl border border-white/5">
                  {selectedActivity.theme}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Primary Module</span>
                  <span className="text-teal-300 font-bold">{selectedActivity.primaryModule}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Discipline</span>
                  <span className="text-white font-bold">{selectedActivity.discipline}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Geographic Scope</span>
                  <span className="text-cyan-300 font-bold">{selectedActivity.geographicCoverage}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5">
                  <span className="text-[10px] text-slate-400 block">Time (Asia/Kolkata)</span>
                  <span className="text-amber-300 font-bold">{selectedActivity.timeIST}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Intended Research / Educational Output:
                </span>
                <span className="text-emerald-300 font-bold block">
                  {selectedActivity.intendedOutput}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold mb-1">Target Participant Categories:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedActivity.targetParticipants.map(tp => (
                    <span key={tp} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-white/5 font-mono text-[11px]">
                      {tp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-relaxed">
                <strong>Planning Status: PROPOSED.</strong> Kashmir EcoWatch is preparing this inaugural 2027–2028 program. Organizing institutions, keynote speakers, and dates are subject to formal steering committee confirmation.
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => openConverterForActivity(selectedActivity)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 flex items-center gap-1.5"
              >
                <Globe2 className="w-3.5 h-3.5" />
                <span>World Clock Comparison</span>
              </button>

              <button
                onClick={() => handleDownloadIcs(selectedActivity)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-teal-500 hover:bg-teal-400 text-slate-950 flex items-center gap-1.5 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Calendar Invite (.ics)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Time Zone Converter Modal */}
      <TimeZoneConverterModal
        isOpen={isConverterOpen}
        onClose={() => setIsConverterOpen(false)}
        defaultDate={modalEventData.date}
        defaultTime24={modalEventData.time}
        eventTitle={modalEventData.title}
      />
    </div>
  );
}
