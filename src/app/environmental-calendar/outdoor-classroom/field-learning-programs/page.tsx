'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Layers, 
  MapPin, 
  Clock, 
  Compass, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  BookOpen, 
  Activity, 
  ExternalLink,
  Download,
  Calendar,
  Waves,
  Trees,
  Droplets,
  Snowflake,
  Sprout,
  Building2,
  Mountain,
  HeartHandshake,
  ChevronRight
} from 'lucide-react';
import { OutdoorClassroomNav } from '@/components/outdoor-classroom/OutdoorClassroomNav';
import { Heading } from '@/components/common/Heading';
import { Button } from '@/components/ui/Button';
import { FIELD_LEARNING_PROGRAMS, FieldLearningProgram } from '@/data/outdoor-classroom';

export default function FieldLearningProgramsPage() {
  const [activeProgramId, setActiveProgramId] = useState<string>('wetland-ecology');
  const [activeTab, setActiveTab] = useState<'overview' | 'curriculum' | 'field-lab' | 'safety' | 'intergenerational'>('overview');

  const activeProgram = FIELD_LEARNING_PROGRAMS.find(p => p.id === activeProgramId) || FIELD_LEARNING_PROGRAMS[0];

  const getProgramIcon = (id: string) => {
    switch (id) {
      case 'wetland-ecology': return Waves;
      case 'forest-biodiversity': return Trees;
      case 'river-spring-science': return Droplets;
      case 'glacier-climate-education': return Snowflake;
      case 'agricultural-ecology': return Sprout;
      case 'urban-environmental-science': return Building2;
      case 'geological-heritage': return Mountain;
      case 'conservation-citizen-science': return HeartHandshake;
      default: return Layers;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Western Himalayan Scientific Field Curriculum • 8 Ecosystem Modules"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Calendar', href: '/environmental-calendar' },
          { label: 'Outdoor Classroom', href: '/environmental-calendar/outdoor-classroom' },
          { label: '8 Field Programs' }
        ]}
        icon={<Layers className="w-6 h-6 text-cyan-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-cyan-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                OD-FIELD
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent pr-6 tracking-normal">
                8 Field-Learning Programs
              </span>
            </div>
          </div>
        }
        subtitle="Every outdoor classroom module links a textbook science requirement to an empirical field investigation, a diagnostic laboratory protocol, a statutory safety clearance, and a structured intergenerational oral history exchange."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/environmental-calendar/outdoor-classroom/curriculum">
              <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 font-bold text-white shadow-md shadow-cyan-500/20">
                <BookOpen className="w-4 h-4 mr-1.5" />
                5 Curriculum Tiers
              </Button>
            </Link>
            <Link href="/environmental-calendar/outdoor-classroom/adopt-an-ecosystem">
              <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10 font-bold">
                Adopt-an-Ecosystem
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Module Navigation */}
      <OutdoorClassroomNav />

      {/* Main Container */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-10">

        {/* 8 Program Selector Tabs (Horizontal Scrollable Grid) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {FIELD_LEARNING_PROGRAMS.map((prog) => {
            const Icon = getProgramIcon(prog.id);
            const isSelected = prog.id === activeProgramId;

            return (
              <button
                key={prog.id}
                onClick={() => {
                  setActiveProgramId(prog.id);
                  setActiveTab('overview');
                }}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2.5 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400/80 shadow-lg shadow-cyan-950/40'
                    : 'bg-slate-900/50 border-white/5 hover:border-white/20 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-xl ${isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">{prog.category}</span>
                </div>
                <div>
                  <div className={`text-xs font-bold leading-snug break-words ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {prog.title.split('&')[0]}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Program Main Dossier */}
        <div className="rounded-3xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 space-y-8 relative overflow-hidden">
          
          {/* Header Strip of Active Program */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium">
                  {activeProgram.category} Module
                </span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="text-slate-400 text-xs flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {activeProgram.suggestedDuration}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white break-words">
                {activeProgram.title}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-3xl break-words">
                {activeProgram.subtitle}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                href={activeProgram.linkedEcoWatchRoute}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-white/10"
              >
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>Live Observatory Layer</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </Link>
              <Link
                href={`/environmental-calendar/outdoor-classroom/student-observations?program=${activeProgram.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all shadow-md"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Record Field Telemetry</span>
              </Link>
            </div>
          </div>

          {/* Subpage Tabs */}
          <div className="flex items-center gap-2 border-b border-white/5 pb-2 overflow-x-auto scrollbar-thin">
            {[
              { id: 'overview', label: 'Overview & Field Sites', icon: Compass },
              { id: 'curriculum', label: 'Curriculum Objectives', icon: BookOpen },
              { id: 'field-lab', label: 'Fieldwork & Lab Diagnostics', icon: Activity },
              { id: 'safety', label: 'Safety, Permits & Gear', icon: ShieldCheck },
              { id: 'intergenerational', label: 'Intergenerational Dialogue', icon: Users },
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lead Ecosystem & Geography */}
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-4">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>Lead Western Himalayan Ecosystem</span>
                  </div>
                  <div className="text-white text-base font-bold">
                    {activeProgram.leadEcosystem}
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Recommended Fieldwork Destinations
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeProgram.typicalDestinations.map((dest, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="break-words">{dest}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Calendar Observance & Measurable Outcomes */}
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-4">
                  <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <span>Synchronized Environmental Observance</span>
                  </div>
                  <div className="text-white text-sm font-semibold p-2.5 rounded-xl bg-slate-900 border border-emerald-500/20">
                    {activeProgram.linkedCalendarObservance}
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Target Measurable Outcomes
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {activeProgram.measurableOutcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="break-words">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CURRICULUM OBJECTIVES */}
          {activeTab === 'curriculum' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-400">
                Grade-level progressive competencies mapped to J&K State Board of School Education (JKBOSE), CBSE, and NEP 2020 science goals.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(activeProgram.curriculumObjectives).map(([tier, items]) => (
                  <div key={tier} className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <span className="font-bold text-sm text-cyan-300 uppercase tracking-wider">
                        {tier.replace('-', ' ')}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-mono">
                        Target Tier
                      </span>
                    </div>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                          <span className="leading-relaxed break-words">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FIELD & LAB DIAGNOSTICS */}
          {activeTab === 'field-lab' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Field Activities */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm">
                  <Compass className="w-4 h-4 text-cyan-400" />
                  <span>On-Site Empirical Field Investigations</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {activeProgram.fieldActivities.map((act, i) => (
                    <li key={i} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px] shrink-0">
                        ACT-{i+1}
                      </span>
                      <span className="leading-relaxed break-words">{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lab Diagnostics */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-4">
                <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>School Laboratory Diagnostic Tests</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  {activeProgram.laboratoryDiagnostics.map((diag, i) => (
                    <li key={i} className="p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-start gap-2.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] shrink-0">
                        LAB-{i+1}
                      </span>
                      <span className="leading-relaxed break-words">{diag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TAB 4: SAFETY, PERMITS & GEAR */}
          {activeTab === 'safety' && (
            <div className="space-y-6">
              {/* Equipment Checklist */}
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  <span>Standard Student & Faculty Field Equipment</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {activeProgram.equipmentChecklist.map((item, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-300 flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="break-words">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety, Statutory Permits & Leave No Trace */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                  <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Statutory Clearances</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {activeProgram.safetyAndPermits.statutoryPermits.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span className="break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                  <div className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    <span>Safety Precautions</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {activeProgram.safetyAndPermits.safetyProtocols.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-rose-400">•</span>
                        <span className="break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 space-y-2">
                  <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Leave No Trace Rules</span>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {activeProgram.safetyAndPermits.leaveNoTraceRules.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">•</span>
                        <span className="break-words">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INTERGENERATIONAL DIALOGUE */}
          {activeTab === 'intergenerational' && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold text-sm">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>Elder Dialogue Prompt</span>
                </div>
                <p className="text-slate-200 text-sm italic bg-slate-900/80 p-4 rounded-xl border border-white/5 break-words">
                  "{activeProgram.intergenerationalStewardship.communityDialoguePrompt}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Structured Oral History Questions for Students
                  </div>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {activeProgram.intergenerationalStewardship.oralHistoryQuestions.map((q, i) => (
                      <li key={i} className="p-2.5 rounded-xl bg-slate-900 border border-white/5 flex items-start gap-2">
                        <span className="text-cyan-400 font-mono font-bold shrink-0">Q{i+1}.</span>
                        <span className="break-words leading-relaxed">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/60 border border-white/5 space-y-3">
                  <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Traditional Ecological Knowledge Comparison
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-xl border border-white/5 break-words">
                    {activeProgram.intergenerationalStewardship.traditionalKnowledgeComparison}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
