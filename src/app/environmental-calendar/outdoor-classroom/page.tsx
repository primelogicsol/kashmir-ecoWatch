'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Compass, 
  BookOpen, 
  Globe2, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Activity, 
  Waves, 
  Trees, 
  Droplets, 
  Mountain, 
  Building2, 
  Camera, 
  Layers, 
  CheckCircle2, 
  Users, 
  AlertCircle,
  FileText,
  School
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { OutdoorClassroomNav } from '@/components/outdoor-classroom/OutdoorClassroomNav';
import { 
  LEARNING_LIFECYCLE_STEPS, 
  FIELD_LEARNING_PROGRAMS, 
  CURRICULUM_LEVELS, 
  ADOPTED_ECOSYSTEM_REGISTRY, 
  PILOT_INSTITUTIONS,
  RECENT_STUDENT_OBSERVATIONS,
  OUTDOOR_CLASSROOM_ARCHIVAL_NOTE 
} from '@/data/outdoor-classroom';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves,
  Trees,
  Droplets,
  Mountain,
  Building2,
  Camera,
  Layers,
  Compass
};

export default function OutdoorClassroomOverviewPage() {
  const [activeStep, setActiveStep] = useState(1);
  const selectedStepData = LEARNING_LIFECYCLE_STEPS.find(s => s.step === activeStep) || LEARNING_LIFECYCLE_STEPS[0];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Module Hero */}
      <Heading
        label="Western Himalayan Field Science & Environmental Education Program"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Calendar', href: '/environmental-calendar' },
          { label: 'Outdoor Classroom' }
        ]}
        icon={<GraduationCap className="w-6 h-6 text-emerald-400" />}
        title={
          <>
            <span className="flex flex-wrap items-center gap-3 leading-[1.12] pb-1 text-slate-100 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight">
              <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-wider rounded-md px-2.5 py-0.5 text-xs">
                OD
              </span>
              <span className="break-words">Outdoor Classroom</span>
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent mt-1 break-words">
              Every School an Environmental Observatory. Every Student a Guardian of Nature.
            </span>
          </>
        }
        subtitle="A structured field-learning program connecting curriculum objectives, real Western Himalayan ecosystems, calibrated field science activities, and measurable student competencies across Kashmir's ten districts."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link href="/environmental-calendar/outdoor-classroom/institutional-registration">
              <Button className="bg-emerald-600 hover:bg-emerald-500 font-semibold text-white">
                <School className="w-4 h-4 mr-1.5" />
                Register School / College
              </Button>
            </Link>
            <Link href="/environmental-calendar/outdoor-classroom/curriculum">
              <Button variant="outline" className="border-white/20 text-white font-medium">
                <BookOpen className="w-4 h-4 mr-1.5" />
                Curriculum Library
              </Button>
            </Link>
            <Link href="/environmental-calendar/outdoor-classroom/adopt-an-ecosystem">
              <Button variant="outline" className="border-emerald-500/50 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 font-medium">
                <Globe2 className="w-4 h-4 mr-1.5" />
                Adopt-an-Ecosystem
              </Button>
            </Link>
          </div>
        }
      />

      {/* Persistent Module Navigation */}
      <OutdoorClassroomNav />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
        
        {/* Historical Attribution & Archival Notice Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-wider text-xs">
            <Sparkles className="w-4 h-4" />
            <span>Historical Program Heritage • ESRO & eIEN Kashmir (2002–2006)</span>
          </div>
          <p className="break-words">
            The Outdoor Classroom (OD) was originally pioneered in the Kashmir Valley between 2002 and 2006 by the <strong>Environment Services & Research Organization (ESRO)</strong> and the <strong>electronic Environmental Information Network (eIEN Kashmir)</strong>. Its foundational premise was to liberate environmental education from passive textbook memorization and transform Kashmir's lakes, wetlands, forests, and springs into living outdoor laboratories.
          </p>
          <div className="text-[11px] text-slate-400 italic pt-1 border-t border-white/5 break-words">
            Archival Verification Standard: Historical claims regarding pioneering activities and school rosters are preserved from original ESRO field bulletins (2002–2006) and eIEN Kashmir records, maintained for open historical study.
          </div>
        </div>

        {/* Strategic Decision & Open-Access Commitment Banner */}
        <div className="p-6 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Tuition-Free Educational Commitment</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white break-words">
              Democratizing Himalayan Field Science for Every Kashmiri Student
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed break-words">
              Kashmir EcoWatch provides all digital curriculum modules, teacher guides, student field sheets, GIS spatial layers, data verification, and digital certificates completely free of charge to all recognized schools, colleges, and university departments. Participating institutions arrange their own field transportation and physical sampling equipment.
            </p>
          </div>
          <Link href="/environmental-calendar/outdoor-classroom/institutional-registration" className="shrink-0">
            <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold">
              Enroll School Free
            </Button>
          </Link>
        </div>

        {/* Core KPI Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Curriculum Programs</span>
            <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">8 Programs</span>
            <span className="text-[11px] text-emerald-400 mt-0.5 block break-words">Wetlands to Cryosphere</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Curriculum Levels</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 block">5 Tiers</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block break-words">Class 6 to Research Mentor</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Phase 1 Pilot Hubs</span>
            <span className="text-2xl sm:text-3xl font-black text-cyan-400 mt-1 block">20 Institutions</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block break-words">1 School + 1 College / District</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-white/10">
            <span className="text-[11px] font-mono text-slate-400 uppercase block">Adopted Ecosystems</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 mt-1 block">20 Laboratories</span>
            <span className="text-[11px] text-slate-400 mt-0.5 block break-words">Hokersar, Dal, Lidder, Verinag</span>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────────
            SECTION: 8-STAGE LEARNING LIFECYCLE INTERACTIVE STEPPER
            ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="max-w-3xl space-y-1">
            <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs">
              Pedagogical Architecture
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-white break-words">
              The 8-Stage Outdoor Learning Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed break-words">
              A comprehensive enrollment → preparation → fieldwork → analysis → assessment → certification pipeline.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {LEARNING_LIFECYCLE_STEPS.map((step) => {
              const isSelected = activeStep === step.step;
              return (
                <button
                  key={step.step}
                  onClick={() => setActiveStep(step.step)}
                  className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-500/30 shadow-lg'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold ${isSelected ? 'text-emerald-300' : 'text-slate-500'}`}>
                    STEP 0{step.step}
                  </span>
                  <span className={`text-xs font-semibold mt-1 break-words leading-snug ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {step.title.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Step Deep-Dive Card */}
          <Card className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-white/10">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs">
                    Step {selectedStepData.step} of 8
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Primary Actor: <strong className="text-slate-200">{selectedStepData.actor}</strong>
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white break-words">
                  {selectedStepData.title}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed break-words">
                  {selectedStepData.summary}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider block">
                    Operational Requirements & Protocols:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedStepData.operationalDetails.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="break-words">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase font-bold">Key Output / Deliverable:</span>
                    <span className="text-emerald-300 font-medium break-words">{selectedStepData.deliverable}</span>
                  </div>

                  <Link href={selectedStepData.platformRoute}>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium">
                      <span>{selectedStepData.platformAction}</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            SECTION: 8 FIELD-LEARNING PROGRAMS
            ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs">
                Scientific Disciplines
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 break-words">
                Eight Scientific Field-Learning Programs
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 break-words">
                Every program equips students with teacher guides, student field sheets, calibration steps, and safety procedures.
              </p>
            </div>
            <Link href="/environmental-calendar/outdoor-classroom/field-learning-programs">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5">
                View All Program Dossiers →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FIELD_LEARNING_PROGRAMS.map((prog) => {
              const Icon = ICON_MAP[prog.iconName] || Compass;
              return (
                <Card 
                  key={prog.id}
                  className="p-5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${prog.gradient} flex items-center justify-center text-white shadow-md`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <Badge variant="outline" className="text-[10px] border-white/10 text-slate-400">
                        {prog.category}
                      </Badge>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors break-words">
                        {prog.title}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed break-words">
                        {prog.subtitle}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs">
                      <div className="text-[11px] text-slate-300">
                        <span className="font-semibold text-slate-400 block text-[10px] uppercase">Core Field Activity:</span>
                        <span className="break-words">{prog.fieldActivities[0]}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        <span className="font-semibold text-slate-400 block text-[10px] uppercase">Key Destination:</span>
                        <span className="break-words">{prog.typicalDestinations[0].split('(')[0]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                    <Link
                      href={`/environmental-calendar/outdoor-classroom/field-learning-programs#${prog.id}`}
                      className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
                    >
                      <span>Explore Program</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {prog.suggestedDuration.split('(')[0]}
                    </span>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            SECTION: ADOPT-AN-ECOSYSTEM PROGRAM
            ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs">
                Permanent Field Laboratories
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 break-words">
                Adopt-an-Ecosystem Program
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 break-words">
                Each institution adopts one nearby site as its permanent field science observatory under a non-exclusive educational monitoring covenant.
              </p>
            </div>
            <Link href="/environmental-calendar/outdoor-classroom/adopt-an-ecosystem">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5">
                Explore Full Adoption Registry →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ADOPTED_ECOSYSTEM_REGISTRY.slice(0, 6).map((eco) => (
              <Card 
                key={eco.id}
                className="p-5 rounded-xl bg-slate-900/60 border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">
                      {eco.code}
                    </span>
                    <Badge variant="outline" className="text-[10px] border-white/10 text-slate-400">
                      {eco.ecosystemType} • {eco.district}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white break-words">
                      {eco.name}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <span>Elevation: {eco.elevationM}m</span>
                      <span>•</span>
                      <span>Health Index: <strong className="text-emerald-400">{eco.currentHealthIndex}/100</strong></span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Adopting Schools:</span>
                    {eco.adoptingInstitutions.map((inst, i) => (
                      <div key={i} className="text-slate-300 flex items-start gap-1.5 text-[11px]">
                        <span className="text-amber-400 font-bold">•</span>
                        <span className="break-words">{inst.institutionName} ({inst.ecoClubName})</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <Link 
                    href="/environmental-calendar/outdoor-classroom/adopt-an-ecosystem"
                    className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>View Site Telemetry</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                  <span className="text-[10px] text-slate-500 font-mono">
                    Baseline: {eco.historicalBaselineYear}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            SECTION: FIVE CURRICULUM LEVELS
            ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div>
            <Badge className="bg-purple-500/10 text-purple-400 border border-purple-500/30 text-xs">
              Pedagogical Progression
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 break-words">
              Five Tiered Curriculum Levels
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 break-words">
              Age-appropriate scaffolding ensuring rigorous scientific development from Class 6 through university faculties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {CURRICULUM_LEVELS.map((lvl) => (
              <Card 
                key={lvl.id}
                className="p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-purple-400">
                      {lvl.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] text-slate-500">
                      {lvl.ageBracket}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white break-words">
                    {lvl.targetAudience}
                  </h3>

                  <p className="text-[11px] text-slate-300 leading-relaxed break-words">
                    {lvl.pedagogicalFocus}
                  </p>

                  <div className="pt-2 border-t border-white/5 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Core Competencies:</span>
                    <ul className="text-[10px] text-slate-400 space-y-1">
                      {lvl.coreCompetencies.slice(0, 2).map((comp, idx) => (
                        <li key={idx} className="flex items-start gap-1">
                          <span className="text-purple-400">•</span>
                          <span className="break-words">{comp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/5">
                  <Link
                    href={`/environmental-calendar/outdoor-classroom/curriculum#${lvl.id}`}
                    className="text-[11px] text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <span>View Worksheets</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            SECTION: LIVE STUDENT TELEMETRY FEED SAMPLE
            ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs">
                Empirical Telemetry
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 break-words">
                Recent Student Field Science Submissions
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 break-words">
                Every observation is reviewed by the designated school teacher and validated by EcoWatch data scientists before open publication.
              </p>
            </div>
            <Link href="/environmental-calendar/outdoor-classroom/student-observations">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/5">
                Open Field Telemetry Feed →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RECENT_STUDENT_OBSERVATIONS.map((obs) => (
              <Card 
                key={obs.id}
                className="p-5 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-400">
                      ID: {obs.studentIdAnonymized}
                    </span>
                    <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
                      <ShieldCheck className="w-3 h-3 mr-1 inline" />
                      {obs.verificationStatus}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white break-words">
                      {obs.siteName}
                    </h3>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>Date: {obs.observationDate}</span>
                      <span>•</span>
                      <span>School: {obs.schoolCode}</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 border border-white/5 space-y-1.5 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Measured Parameters:</span>
                    {Object.entries(obs.parametersMeasured).slice(0, 3).map(([param, val]) => (
                      <div key={param} className="flex justify-between items-center text-[11px]">
                        <span className="text-slate-400 break-words">{param}:</span>
                        <span className="font-mono font-bold text-emerald-400 shrink-0 ml-2">{val}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-[11px] text-slate-300 italic leading-relaxed break-words">
                    "{obs.fieldNotes}"
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/10 text-[10px] text-slate-500 flex justify-between items-center">
                  <span>Verified: {obs.verifiedByScientist}</span>
                  <Link href="/environmental-calendar/outdoor-classroom/student-observations" className="text-emerald-400 hover:underline">
                    View Data →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            SECTION: PARTICIPATION SAFENETS & ETHICAL COMPLIANCE
            ───────────────────────────────────────────────────────────────── */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider">
            <AlertCircle className="w-4 h-4" />
            <span>Student Safeguards & Field Safety Architecture</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="space-y-1">
              <strong className="text-white block font-semibold">1. Minor Privacy & Anonymization</strong>
              <p className="text-slate-400 leading-relaxed break-words">
                No minor student personal identifiers, phone numbers, or private records are ever published. All student contributions are indexed strictly via institutional anonymized tokens (e.g. STU-DPS-042).
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block font-semibold">2. Authorized Institutional Sign-Off</strong>
              <p className="text-slate-400 leading-relaxed break-words">
                Every field visit requires registered institutional clearance, written parental/guardian consent, a certified faculty field supervisor, and a pre-approved emergency response protocol.
              </p>
            </div>
            <div className="space-y-1">
              <strong className="text-white block font-semibold">3. Protected Area Compliance</strong>
              <p className="text-slate-400 leading-relaxed break-words">
                Adoption implies an educational monitoring commitment, not administrative management or unrestricted access. All entries into Wildlife Sanctuaries adhere to J&K Wildlife Protection Department permits.
              </p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
