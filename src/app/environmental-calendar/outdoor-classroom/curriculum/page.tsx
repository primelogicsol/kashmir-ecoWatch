'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Download, 
  CheckCircle2, 
  Layers, 
  Users, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Scale, 
  Printer, 
  X, 
  Clock, 
  AlertTriangle, 
  Check, 
  MapPin, 
  Activity, 
  Trees, 
  ExternalLink 
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { OutdoorClassroomNav } from '@/components/outdoor-classroom/OutdoorClassroomNav';
import { CURRICULUM_LEVELS, FIELD_LEARNING_PROGRAMS } from '@/data/outdoor-classroom';
import { 
  TIER_TEACHER_GUIDES, 
  TIER_STUDENT_FIELD_SHEETS, 
  TierTeacherGuide, 
  TierStudentFieldSheet 
} from '@/data/curriculum-documents';

export default function CurriculumLibraryPage() {
  const [selectedLevelId, setSelectedLevelId] = useState('foundation');
  const [modalTierId, setModalTierId] = useState('foundation');
  const [showTeacherGuideModal, setShowTeacherGuideModal] = useState(false);
  const [showStudentSheetModal, setShowStudentSheetModal] = useState(false);

  const activeLevel = CURRICULUM_LEVELS.find(l => l.id === selectedLevelId) || CURRICULUM_LEVELS[0];
  const activeTeacherGuide = TIER_TEACHER_GUIDES[modalTierId] || TIER_TEACHER_GUIDES.foundation;
  const activeStudentSheet = TIER_STUDENT_FIELD_SHEETS[modalTierId] || TIER_STUDENT_FIELD_SHEETS.foundation;

  const openTeacherGuide = (tierId: string) => {
    setModalTierId(tierId);
    setShowTeacherGuideModal(true);
  };

  const openStudentSheet = (tierId: string) => {
    setModalTierId(tierId);
    setShowStudentSheetModal(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200">
      
      {/* ─────────────────────────────────────────────────────────────────────────────
          PRINT-ONLY STYLESHEET FOR TEACHER GUIDES & STUDENT WORKSHEETS
      ───────────────────────────────────────────────────────────────────────────── */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 12mm;
          }
          html, body {
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          nav, header, footer, .no-print, section:not(.print-active-doc) {
            display: none !important;
          }
          .print-active-doc {
            display: block !important;
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            background: #ffffff !important;
            color: #0f172a !important;
          }
          .printable-content {
            border: 2px solid #064e3b !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #0f172a !important;
            padding: 20px !important;
          }
        }
      `}</style>

      {/* Page Header */}
      <div className="no-print">
        <Heading
          label="Outdoor Classroom Pedagogical Library"
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Environmental Calendar', href: '/environmental-calendar' },
            { label: 'Outdoor Classroom', href: '/environmental-calendar/outdoor-classroom' },
            { label: 'Curriculum Library' }
          ]}
          icon={<BookOpen className="w-6 h-6 text-emerald-400" />}
          title={
            <>
              <span className="flex flex-wrap items-center gap-3 leading-[1.12] pb-1 text-slate-100 text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight">
                <span className="inline-flex items-center self-center bg-emerald-600 text-white font-black uppercase tracking-wider rounded-md px-2.5 py-0.5 text-xs">
                  CURRICULUM
                </span>
                <span className="break-words">Five-Tier Curriculum Library</span>
              </span>
              <span className="block text-xl sm:text-2xl md:text-3xl font-semibold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent mt-1 break-words">
                Standardized Field Science Syllabi, Teacher Preparation Guides & Student Worksheets
              </span>
            </>
          }
          subtitle="Grade-specific modules connecting classroom textbook concepts with hands-on Western Himalayan field sampling, laboratory protocols, and intergenerational oral history documentation."
          actions={
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/environmental-calendar/outdoor-classroom/adopt-an-ecosystem">
                <Button className="bg-emerald-600 hover:bg-emerald-500 font-semibold text-white">
                  <Compass className="w-4 h-4 mr-1.5" />
                  Select Field Ecosystem
                </Button>
              </Link>
              <Link href="/environmental-calendar/outdoor-classroom/institutional-registration">
                <Button variant="outline" className="border-white/20 text-white font-medium">
                  Register School
                </Button>
              </Link>
            </div>
          }
        />
      </div>

      <div className="no-print">
        <OutdoorClassroomNav />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 no-print">
        
        {/* Tier Selector Pills */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white break-words">
              Select Grade & Academic Level:
            </h2>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              5 Tiered Educational Stages
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {CURRICULUM_LEVELS.map((lvl) => {
              const isSelected = selectedLevelId === lvl.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => setSelectedLevelId(lvl.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? 'bg-emerald-950/80 border-emerald-400 ring-2 ring-emerald-500/30 shadow-lg'
                      : 'bg-slate-900/60 border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold uppercase ${isSelected ? 'text-emerald-300' : 'text-slate-500'}`}>
                    {lvl.id}
                  </span>
                  <span className={`text-xs font-bold mt-1 break-words ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                    {lvl.name}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5">
                    {lvl.ageBracket}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Selected Tier Comprehensive Dossier */}
        <Card className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-white/10 space-y-6">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs">
                  {activeLevel.name}
                </Badge>
                <span className="text-xs font-mono text-slate-400">{activeLevel.ageBracket}</span>
              </div>
              <h3 className="text-2xl font-black text-white break-words">
                {activeLevel.targetAudience}
              </h3>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed break-words">
                {activeLevel.pedagogicalFocus}
              </p>
            </div>

            {/* ACTION BUTTONS WITH FULL MODAL DIALOGS */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => openTeacherGuide(activeLevel.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Teacher Guide (PDF)</span>
              </button>

              <button
                onClick={() => openStudentSheet(activeLevel.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-white/15 transition-all cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>Student Field Sheets (Printable)</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Core Competencies */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Learning Objectives & Competencies:
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeLevel.coreCompetencies.map((comp, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
                    <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                    <span className="break-words leading-relaxed">{comp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Field Methods */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                Standardized Field Methods:
              </span>
              <ul className="space-y-2 text-xs text-slate-300">
                {activeLevel.fieldMethods.map((meth, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
                    <span className="text-cyan-400 font-bold shrink-0 mt-0.5">✓</span>
                    <span className="break-words leading-relaxed">{meth}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Assessment Rubric */}
          <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1">
              <Scale className="w-3.5 h-3.5" />
              Evaluation Rubric & Certification Threshold:
            </span>
            <p className="text-slate-300 leading-relaxed break-words">
              {activeLevel.assessmentRubric}
            </p>
          </div>
        </Card>

        {/* ─────────────────────────────────────────────────────────────────
            EXPLICIT DIRECT DOWNLOAD MATRIX FOR ALL 5 ACADEMIC TIERS
            ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-mono font-medium">
                <FileText className="w-3.5 h-3.5" />
                <span>Field Documentation Library</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 break-words">
                Downloadable Guides & Student Worksheets across All 5 Tiers
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Direct access to print-ready curriculum PDFs, teacher lesson plans, and empirical lab datasheets
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CURRICULUM_LEVELS.map((lvl) => {
              const guide = TIER_TEACHER_GUIDES[lvl.id];
              const sheet = TIER_STUDENT_FIELD_SHEETS[lvl.id];

              return (
                <div 
                  key={lvl.id}
                  className="rounded-2xl bg-slate-900/70 border border-white/10 hover:border-emerald-500/40 p-5 space-y-4 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-emerald-400 font-mono text-[10px] font-bold">
                        {guide?.courseCode || lvl.id.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {lvl.ageBracket}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white break-words">
                        {lvl.name}
                      </h3>
                      <div className="text-xs text-slate-300 font-medium mt-0.5">
                        {lvl.targetAudience}
                      </div>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed break-words">
                      {lvl.pedagogicalFocus}
                    </p>

                    <div className="p-2.5 rounded-xl bg-slate-950/60 border border-white/5 text-[11px] text-slate-400 space-y-1">
                      <div className="font-semibold text-slate-300">Included Kit & Rubrics:</div>
                      <div>• {guide?.itineraryTimeline.length || 5} Field Activity Modules</div>
                      <div>• {sheet?.diagnosticsSection.parameters.length || 4} Numerical Diagnostics</div>
                      <div>• Intergenerational Oral History Protocol</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <button
                      onClick={() => openTeacherGuide(lvl.id)}
                      className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Teacher Guide (PDF)</span>
                    </button>

                    <button
                      onClick={() => openStudentSheet(lvl.id)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                    >
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Student Field Sheet (Printable)</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            PROGRAM-SPECIFIC CURRICULUM SHEETS
            ───────────────────────────────────────────────────────────────── */}
        <section className="space-y-6">
          <div>
            <Badge className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-xs">
              Program Syllabi
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 break-words">
              Field Science Program Syllabi & Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 break-words">
              Explore specialized fieldwork protocols and laboratory methods for all eight scientific biomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FIELD_LEARNING_PROGRAMS.map((prog) => (
              <Card key={prog.id} className="p-5 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-[10px] border-white/10 text-slate-400">
                      {prog.category}
                    </Badge>
                    <span className="text-[10px] font-mono text-emerald-400">
                      {prog.suggestedDuration.split('(')[0]}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white break-words">
                    {prog.title}
                  </h3>

                  <p className="text-[11px] text-slate-300 leading-relaxed break-words">
                    {prog.subtitle}
                  </p>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-white/5 space-y-1 text-xs">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Equipment Kit:</span>
                    <span className="text-[11px] text-slate-300 block break-words">
                      {prog.equipmentChecklist.slice(0, 2).join(', ')}...
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 space-y-2">
                  <Link
                    href={`/environmental-calendar/outdoor-classroom/field-learning-programs#${prog.id}`}
                    className="w-full text-center block text-xs font-semibold text-emerald-400 hover:text-emerald-300 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                  >
                    View Fieldwork Guide →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────────
            INTERGENERATIONAL STEWARDSHIP SECTION
            ───────────────────────────────────────────────────────────────── */}
        <section className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-950 border border-amber-500/20 space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Intergenerational Stewardship Protocol</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white break-words">
            Bridging Scientific Telemetry with Elder Ecological Memory
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl break-words">
            Every Outdoor Classroom excursion includes a structured <strong>Oral History Interview</strong> with a village elder, shepherd (*Chopan*), water-master (*Mirab*), or artisan living near the adopted site. Students compare physical sensor measurements (pH, flow, snowline) with 40-year community memories of historical floods, snow depths, and wildlife encounters.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
              <span className="font-bold text-amber-300 block">1. Respectful Ethics</span>
              <p className="text-slate-400 break-words">
                Informed verbal consent required; respectful listening without interrupting; preservation of vernacular Kashmiri terminology.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
              <span className="font-bold text-amber-300 block">2. Standard Interview Form</span>
              <p className="text-slate-400 break-words">
                Standardized 3-question prompt on past water level, lost bird species, and shifts in traditional harvesting seasons.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-950/60 border border-white/5 space-y-1">
              <span className="font-bold text-amber-300 block">3. Open Archive</span>
              <p className="text-slate-400 break-words">
                Approved summaries are deposited in the Kashmir EcoWatch Himalayan Oral History Archive for longitudinal study.
              </p>
            </div>
          </div>
        </section>

      </div>

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL 1: TEACHER IMPLEMENTATION GUIDE (PRINTABLE / PDF READY)
      ───────────────────────────────────────────────────────────────────────────── */}
      {showTeacherGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-emerald-500/40 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Top Modal Controls (Hidden in Print) */}
            <div className="p-4 sm:p-5 bg-slate-950 border-b border-white/10 flex items-center justify-between gap-3 no-print">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-white">
                  Teacher Implementation Guide • {activeTeacherGuide.courseCode}
                </span>
              </div>

              {/* Tier Switcher inside modal */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs sm:max-w-md">
                {CURRICULUM_LEVELS.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setModalTierId(l.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-colors ${
                      modalTierId === l.id
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {l.id}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
                <button
                  onClick={() => setShowTeacherGuideModal(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Body (Print Active) */}
            <div className="print-active-doc flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#fffdfa] text-slate-900 printable-content">
              
              {/* Document Header */}
              <div className="border-b-2 border-[#064e3b] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-[10px] font-sans font-bold uppercase tracking-[0.2em] text-[#064e3b]">
                    Jammu & Kashmir Environmental Education Initiative • Kashmir EcoWatch
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-black font-serif text-[#064e3b]">
                    Teacher Implementation Guide & Syllabus
                  </h1>
                  <div className="text-xs font-semibold text-[#b45309]">
                    Outdoor Classroom (OD) Framework • {activeTeacherGuide.tierName} ({activeTeacherGuide.targetAudience})
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-slate-600">
                  <div className="font-bold text-[#064e3b]">{activeTeacherGuide.courseCode}</div>
                  <div>Age Group: {activeTeacherGuide.ageBracket}</div>
                  <div>Standard: NEP 2020 & JKBOSE</div>
                </div>
              </div>

              {/* Academic Alignment Strip */}
              <div className="p-3.5 rounded-lg bg-[#f4f2ea] border border-[#e2dec9] text-xs space-y-1">
                <div className="font-bold text-[#064e3b] uppercase tracking-wider text-[10px]">
                  Academic Alignment & Curricular Mandate:
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                  {activeTeacherGuide.academicAlignment.map((align, idx) => (
                    <li key={idx}>{align}</li>
                  ))}
                </ul>
              </div>

              {/* Pedagogical Objectives */}
              <div className="space-y-2 text-xs">
                <h3 className="font-bold uppercase tracking-wider text-[#064e3b] text-sm border-b border-slate-300 pb-1">
                  1. Pedagogical Objectives & Competency Targets
                </h3>
                <ul className="space-y-1.5 text-slate-800">
                  {activeTeacherGuide.pedagogicalObjectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="font-bold text-[#064e3b]">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Required Equipment Kit */}
              <div className="space-y-2 text-xs">
                <h3 className="font-bold uppercase tracking-wider text-[#064e3b] text-sm border-b border-slate-300 pb-1">
                  2. Required Field Equipment & Diagnostic Kit
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeTeacherGuide.equipmentKit.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded border border-slate-300 bg-white">
                      <div className="font-bold text-[#064e3b]">{item.item}</div>
                      <div className="text-[10px] text-[#b45309] font-medium">Standard Ratio: {item.ratio}</div>
                      <p className="text-[11px] text-slate-600 mt-1">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Itinerary Timeline */}
              <div className="space-y-2 text-xs">
                <h3 className="font-bold uppercase tracking-wider text-[#064e3b] text-sm border-b border-slate-300 pb-1">
                  3. Structured Study Tour Itinerary & Faculty Leadership
                </h3>
                <div className="border border-slate-300 rounded overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#064e3b] text-white">
                      <tr>
                        <th className="p-2">Time</th>
                        <th className="p-2">Phase</th>
                        <th className="p-2">Student Field Activity</th>
                        <th className="p-2">Faculty Mentor Responsibility</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 text-slate-800">
                      {activeTeacherGuide.itineraryTimeline.map((step, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="p-2 font-mono text-[11px] text-[#064e3b] font-bold whitespace-nowrap">{step.time}</td>
                          <td className="p-2 font-semibold text-slate-900">{step.phase}</td>
                          <td className="p-2 text-slate-700">{step.activity}</td>
                          <td className="p-2 text-slate-600 italic text-[11px]">{step.facultyRole}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Safety & Statutory Clearances */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded bg-red-50/50 border border-red-200 space-y-1.5">
                  <div className="font-bold text-red-900 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Safety Protocols & Directives:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-800 text-[11px]">
                    {activeTeacherGuide.safetyDirectives.map((dir, idx) => (
                      <li key={idx}>{dir}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded bg-emerald-50/50 border border-emerald-200 space-y-1.5">
                  <div className="font-bold text-[#064e3b] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Statutory Clearances Required:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-slate-800 text-[11px]">
                    {activeTeacherGuide.statutoryPermits.map((perm, idx) => (
                      <li key={idx}>{perm}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Assessment Grading Matrix */}
              <div className="space-y-2 text-xs">
                <h3 className="font-bold uppercase tracking-wider text-[#064e3b] text-sm border-b border-slate-300 pb-1">
                  4. Evaluation Rubric & Certification Weightage
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {activeTeacherGuide.assessmentGradingRubric.map((rub, idx) => (
                    <div key={idx} className="p-2.5 rounded border border-slate-200 bg-white">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#064e3b]">{rub.criterion}</span>
                        <span className="font-mono text-[10px] font-bold text-[#b45309]">{rub.weight}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1">{rub.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Sign-off */}
              <div className="pt-6 border-t border-slate-300 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <div>Document ID: KEW-TG-{activeTeacherGuide.tierId.toUpperCase()}-2026</div>
                <div>Published by Kashmir EcoWatch Scientific Council</div>
                <div>kashmir-ecowatch.com/curriculum</div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────────────────
          MODAL 2: STUDENT FIELD INVESTIGATION SHEET (PRINTABLE WORKSHEET)
      ───────────────────────────────────────────────────────────────────────────── */}
      {showStudentSheetModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-slate-900 border border-cyan-500/40 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Top Modal Controls (Hidden in Print) */}
            <div className="p-4 sm:p-5 bg-slate-950 border-b border-white/10 flex items-center justify-between gap-3 no-print">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-white">
                  Student Field Investigation Worksheet • {activeStudentSheet.sheetCode}
                </span>
              </div>

              {/* Tier Switcher inside modal */}
              <div className="flex items-center gap-1.5 overflow-x-auto max-w-xs sm:max-w-md">
                {CURRICULUM_LEVELS.map(l => (
                  <button
                    key={l.id}
                    onClick={() => setModalTierId(l.id)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-mono whitespace-nowrap transition-colors ${
                      modalTierId === l.id
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {l.id}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Student Worksheet</span>
                </button>
                <button
                  onClick={() => setShowStudentSheetModal(false)}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Document Body (Print Active) */}
            <div className="print-active-doc flex-1 overflow-y-auto p-6 sm:p-10 space-y-6 bg-[#ffffff] text-slate-900 printable-content">
              
              {/* Document Header */}
              <div className="border-b-2 border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-slate-500">
                    Kashmir EcoWatch Outdoor Classroom (OD) • Field Observation Record
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black font-serif text-slate-900">
                    {activeStudentSheet.title}
                  </h1>
                  <div className="text-xs text-slate-600 font-medium">
                    {activeStudentSheet.subtitle} • {activeStudentSheet.tierName} ({activeStudentSheet.targetGrades})
                  </div>
                </div>

                <div className="text-right font-mono text-xs text-slate-600 border border-slate-300 p-2 rounded">
                  <div className="font-bold text-slate-900">{activeStudentSheet.sheetCode}</div>
                  <div className="text-[10px]">Academic Year 2026–2027</div>
                </div>
              </div>

              {/* Student Header Fields */}
              <div className="p-3.5 bg-slate-50 border border-slate-300 rounded space-y-2 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeStudentSheet.headerFields.map((field, idx) => (
                    <div key={idx} className="border-b border-dotted border-slate-400 pb-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block">{field.label}:</span>
                      <span className="text-slate-400 font-mono text-xs">{field.placeholder}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 1: Physical Diagnostics Table */}
              <div className="space-y-2 text-xs">
                <h3 className="font-bold uppercase tracking-wider text-slate-900 text-xs border-b border-slate-300 pb-1">
                  Section 1: {activeStudentSheet.diagnosticsSection.title}
                </h3>
                <div className="border border-slate-300 rounded overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-800">
                      <tr className="border-b border-slate-300">
                        <th className="p-2 border-r border-slate-200">Environmental Parameter</th>
                        <th className="p-2 border-r border-slate-200">Unit</th>
                        <th className="p-2 border-r border-slate-200">Normal Baseline</th>
                        <th className="p-2 border-r border-slate-200 bg-emerald-50 text-[#064e3b]">Measured Value</th>
                        <th className="p-2">Field Notes / Instructions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {activeStudentSheet.diagnosticsSection.parameters.map((param, idx) => (
                        <tr key={idx}>
                          <td className="p-2 font-medium border-r border-slate-200">{param.name}</td>
                          <td className="p-2 font-mono text-[11px] text-slate-600 border-r border-slate-200">{param.unit}</td>
                          <td className="p-2 text-slate-500 text-[11px] border-r border-slate-200">{param.normalRange}</td>
                          <td className="p-2 font-mono text-slate-900 border-r border-slate-200 bg-emerald-50/50">
                            ____________________
                          </td>
                          <td className="p-2 text-slate-500 text-[11px]">{param.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 2: Biodiversity / Transect Census Table */}
              <div className="space-y-2 text-xs">
                <h3 className="font-bold uppercase tracking-wider text-slate-900 text-xs border-b border-slate-300 pb-1">
                  Section 2: {activeStudentSheet.censusSection.title}
                </h3>
                <div className="border border-slate-300 rounded overflow-hidden">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-100 text-slate-800">
                      <tr className="border-b border-slate-300">
                        {activeStudentSheet.censusSection.columns.map((col, idx) => (
                          <th key={idx} className="p-2 border-r border-slate-200 last:border-r-0">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {activeStudentSheet.censusSection.sampleRows.map((row, idx) => (
                        <tr key={idx}>
                          <td className="p-2 font-semibold text-slate-900 border-r border-slate-200">{row.commonName}</td>
                          <td className="p-2 italic text-[#064e3b] font-medium border-r border-slate-200">{row.kashmiriName}</td>
                          <td className="p-2 font-serif text-[11px] border-r border-slate-200">{row.scientificName}</td>
                          <td className="p-2 font-mono text-center border-r border-slate-200">_____</td>
                          <td className="p-2 text-slate-600 text-[11px]">{row.typicalHabitat}</td>
                        </tr>
                      ))}
                      {/* Blank rows for students to fill */}
                      {[1, 2, 3].map(n => (
                        <tr key={n}>
                          <td className="p-2.5 border-r border-slate-200">___________________</td>
                          <td className="p-2.5 border-r border-slate-200">___________________</td>
                          <td className="p-2.5 border-r border-slate-200">___________________</td>
                          <td className="p-2.5 border-r border-slate-200 text-center">_____</td>
                          <td className="p-2.5">_______________________________</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 3: Intergenerational Oral History Interview */}
              <div className="space-y-2 text-xs">
                <h3 className="font-bold uppercase tracking-wider text-slate-900 text-xs border-b border-slate-300 pb-1">
                  Section 3: {activeStudentSheet.oralHistorySection.title}
                </h3>
                <div className="p-3 bg-amber-50/50 border border-amber-200 rounded space-y-2 text-xs">
                  {activeStudentSheet.oralHistorySection.elderPrompts.map((prompt, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="font-medium text-slate-800">{prompt}</div>
                      <div className="border-b border-dotted border-slate-400 h-5" />
                    </div>
                  ))}
                  <p className="text-[10px] text-slate-500 italic pt-1">
                    Guideline: {activeStudentSheet.oralHistorySection.documentationGuidelines}
                  </p>
                </div>
              </div>

              {/* Section 4: Field Sketch / Diagram Box */}
              <div className="space-y-2 text-xs">
                <h3 className="font-bold uppercase tracking-wider text-slate-900 text-xs border-b border-slate-300 pb-1">
                  Section 4: {activeStudentSheet.sketchSection.title}
                </h3>
                <div className="border-2 border-dashed border-slate-300 rounded h-32 flex flex-col items-center justify-center text-slate-400 text-xs p-4 text-center">
                  <span>[ Field Sketch Box — Pencil drawing of specimen, riparian profile, or zonation transect ]</span>
                  <span className="text-[10px] mt-1">{activeStudentSheet.sketchSection.guidelines}</span>
                </div>
              </div>

              {/* Section 5: Verification Sign-off */}
              <div className="border-t-2 border-slate-800 pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="font-medium text-slate-700">{activeStudentSheet.certificationSection.teacherSignoffText}</div>
                  <div className="text-[10px] text-slate-500">Log will be submitted to Kashmir EcoWatch Open Telemetry Feed.</div>
                </div>

                <div className="border border-slate-400 p-3 rounded w-64 text-center">
                  <div className="border-b border-slate-300 h-6 mb-1" />
                  <div className="text-[10px] font-bold text-slate-600">
                    {activeStudentSheet.certificationSection.stampFieldText}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}
