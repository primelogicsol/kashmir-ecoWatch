import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Music,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  Feather,
  Compass,
  Sparkles,
} from 'lucide-react';
import { ECOVOICES_RELEASES } from '@/data/ecovoices-catalog';
import { EcoVoiceAudioPlayer } from '@/components/ecovoices/EcoVoiceAudioPlayer';
import { EcoVoicesSubNav } from '@/components/ecovoices/EcoVoicesSubNav';

export function generateStaticParams() {
  return ECOVOICES_RELEASES.map((release) => ({
    slug: release.slug,
  }));
}

export default async function EcoVoiceSongDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = ECOVOICES_RELEASES.findIndex((r) => r.slug === slug);

  if (index === -1) {
    notFound();
  }

  const release = ECOVOICES_RELEASES[index];
  const prevRelease = index > 0 ? ECOVOICES_RELEASES[index - 1] : null;
  const nextRelease =
    index < ECOVOICES_RELEASES.length - 1 ? ECOVOICES_RELEASES[index + 1] : null;

  return (
    <main className="min-h-screen bg-[#04060d] text-slate-100 pb-24 relative overflow-hidden">
      {/* Nocturnal Starlight & Twilight Stage Backdrop */}
      <div className="kew-module-hero-surface relative overflow-hidden border-b border-amber-300/15">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 scale-105"
          style={{ backgroundImage: `url(${release.coverImage})` }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#03050b]/95 via-[#060916]/90 to-[#04060d]"
          aria-hidden="true"
        />
        <div
          className="absolute -top-32 left-1/4 w-[36rem] h-[24rem] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute top-12 right-1/4 w-[28rem] h-[20rem] bg-amber-400/10 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="kew-module-hero-inner max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-amber-200 transition-colors">
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <Link href="/ecovoices" className="hover:text-amber-200 transition-colors">
              EcoVoices
            </Link>
            <span className="text-slate-600">/</span>
            <Link href="/ecovoices#music" className="hover:text-amber-200 transition-colors">
              Environmental Music
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-amber-200 truncate max-w-[260px] sm:max-w-none">
              {release.shortTitle || release.title}
            </span>
          </nav>

          {/* Composition Overline */}
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono">
            <span className="px-3 py-0.5 rounded-full bg-amber-300/15 text-amber-200 border border-amber-300/35 uppercase tracking-[0.18em]">
              Published Master · {release.catalogNumber}
            </span>
            <span className="px-3 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
              {release.language}
            </span>
            <span className="px-3 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
              Runtime {release.durationFormatted}
            </span>
          </div>

          {/* Monumental Composition Title */}
          <div className="space-y-3">
            <h1 className="font-[family-name:var(--font-ecovoices-serif)] text-3xl sm:text-5xl lg:text-6xl font-semibold text-white leading-[1.08] tracking-tight">
              {release.title}
            </h1>
            <p className="font-[family-name:var(--font-ecovoices-serif)] italic text-lg sm:text-2xl text-amber-200/90">
              {release.subtitle}
            </p>
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-slate-300">
              {release.artistCredit} · {release.musicalStyle}
            </p>
          </div>

          {/* Top Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/ecovoices#music"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-amber-100 border border-amber-300/30 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>All EcoVoices Compositions</span>
            </Link>

            <a
              href={release.canonicalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-300 hover:bg-amber-200 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-amber-400/15"
            >
              <span>Stream Master on SufiPulse.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Exclusive EcoVoices Sticky Bar */}
      <EcoVoicesSubNav />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 space-y-10">
        {/* 1. MASTER MEDIA & RESONANCE CONSOLE */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#080c18]/95 border border-amber-300/25 shadow-2xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-300/15 border border-amber-300/35 flex items-center justify-center text-amber-200 shrink-0">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-ecovoices-serif)] text-xl sm:text-2xl font-semibold text-white">
                  Master Screening &amp; Acoustic Arrangement
                </h2>
                <p className="text-xs text-slate-400 font-mono">
                  Instruments: {release.instrumentsUsed.join(' · ')}
                </p>
              </div>
            </div>

            {release.youtubeStats && (
              <a
                href={release.youtubeStats.playlistUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-amber-200 border border-amber-300/25 font-mono text-xs shrink-0 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Playlist Track #{release.youtubeStats.trackNumber}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <EcoVoiceAudioPlayer release={release} variant="full" initiallyOpen={true} />
        </section>

        {/* 2. SACRED KALAM & POETIC EXCERPT */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0a0f1f] to-[#080b16] border border-amber-300/25 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-amber-300 font-mono text-xs uppercase tracking-[0.18em]">
              <Feather className="w-4 h-4" />
              <span>Poetic Kalam &amp; Literary Text</span>
            </div>
            <span className="text-xs text-slate-300 font-[family-name:var(--font-ecovoices-serif)] italic">
              {release.kalamPoetOrSource}
            </span>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-black/50 border border-amber-300/20 space-y-5">
            <div
              dir="rtl"
              className="text-right font-[family-name:var(--font-urdu)] text-xl sm:text-2xl text-amber-200 leading-[2.3] whitespace-pre-line"
            >
              {release.poeticExcerptOriginal}
            </div>
            <blockquote className="border-t border-white/10 pt-5 font-[family-name:var(--font-ecovoices-serif)] italic text-lg sm:text-xl text-slate-200 leading-relaxed">
              &ldquo;{release.poeticExcerptTranslation}&rdquo;
            </blockquote>
          </div>
        </section>

        {/* 3. ECOLOGICAL DOSSIER & SCIENTIFIC OBSERVATORY LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#080c18]/90 border border-white/10 h-full space-y-4">
              <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs uppercase tracking-[0.18em]">
                <Compass className="w-4 h-4" />
                <span>Western Himalayan Ecological Context</span>
              </div>
              <h2 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl sm:text-3xl font-semibold text-white">
                The Living Landscape Behind the Composition
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {release.ecologicalDossier}
              </p>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Associated Environmental Observances:
                </span>
                <div className="flex flex-wrap gap-2">
                  {release.observances.map((obs, i) => (
                    <Link
                      key={i}
                      href="/environmental-calendar"
                      title={`View ${obs} in Student Action Hub — Environmental Calendar`}
                      aria-label={`View ${obs} in Student Action Hub`}
                      className="text-xs px-3 py-1 rounded-full bg-white/[0.04] hover:bg-amber-300/15 border border-white/10 hover:border-amber-300/35 text-slate-200 transition-colors"
                    >
                      {obs}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="p-6 rounded-3xl bg-[#080c18]/90 border border-white/10 h-full space-y-4">
              <span className="text-xs font-mono text-amber-300 uppercase tracking-[0.18em] block">
                Connected Scientific Observatories
              </span>
              <p className="text-xs text-slate-400 leading-relaxed">
                Explore Kashmir EcoWatch empirical datasets, hydro-meteorological baselines, and spatial layers paired with this work:
              </p>

              <div className="space-y-2.5">
                {release.relatedScientificModules.map((mod, i) => (
                  <Link
                    key={i}
                    href={mod.href}
                    className="block p-3.5 rounded-2xl bg-black/50 border border-white/10 hover:border-amber-300/40 transition-colors group"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-amber-200">
                      <span>{mod.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-300 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {mod.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. OUTDOOR CLASSROOM PEDAGOGICAL FIELD LESSON */}
        <section className="p-6 sm:p-8 rounded-3xl bg-[#080c18]/90 border border-emerald-400/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-emerald-300 font-mono text-xs uppercase tracking-[0.18em]">
                <GraduationCap className="w-4 h-4" />
                <span>Companion Field Pedagogy · Outdoor Classroom</span>
              </div>
              <h2 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl sm:text-3xl font-semibold text-white mt-1">
                {release.outdoorClassroomActivity.activityTitle}
              </h2>
            </div>

            <span className="px-3 py-1 rounded-full bg-emerald-400/15 text-emerald-200 border border-emerald-400/35 text-xs font-mono shrink-0 self-start sm:self-auto">
              {release.outdoorClassroomActivity.recommendedTier}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-black/45 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono text-amber-200/80 uppercase">
                Field Hypothesis:
              </span>
              <p className="text-slate-200 text-xs leading-relaxed">
                {release.outdoorClassroomActivity.fieldHypothesis}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/45 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono text-amber-200/80 uppercase">
                Duration &amp; Field Kit:
              </span>
              <p className="text-emerald-300 font-semibold text-xs">
                {release.outdoorClassroomActivity.duration}
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1 pt-1">
                {release.outdoorClassroomActivity.materialsNeeded.map((mat, i) => (
                  <li key={i}>• {mat}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-black/45 border border-white/10 space-y-1.5">
              <span className="text-[10px] font-mono text-amber-200/80 uppercase">
                Measurable Learning Outcome:
              </span>
              <p className="text-slate-200 text-xs leading-relaxed">
                {release.outdoorClassroomActivity.measurableLearningOutcome}
              </p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-black/50 border border-emerald-400/20 space-y-2.5">
            <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider block">
              Step-by-Step Field Investigation Protocol:
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {release.outdoorClassroomActivity.fieldworkMethod}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <Link
              href={release.outdoorClassroomActivity.curriculumLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Open Outdoor Classroom Curriculum Library</span>
            </Link>

            <Link
              href="/environmental-calendar/outdoor-classroom/student-observations"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-amber-200 font-medium"
            >
              <span>Submit Student Field Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 5. PREV / NEXT COMPOSITION SEQUENCE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {prevRelease ? (
            <Link
              href={`/ecovoices/song/${prevRelease.slug}`}
              className="p-4 rounded-2xl bg-[#080c18]/80 border border-white/10 hover:border-amber-300/40 transition-all group"
            >
              <span className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Previous Composition
              </span>
              <div className="font-[family-name:var(--font-ecovoices-serif)] text-lg font-semibold text-white group-hover:text-amber-200 mt-1 line-clamp-1">
                {prevRelease.title}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextRelease && (
            <Link
              href={`/ecovoices/song/${nextRelease.slug}`}
              className="p-4 rounded-2xl bg-[#080c18]/80 border border-white/10 hover:border-amber-300/40 transition-all text-right group"
            >
              <span className="text-[10px] font-mono text-slate-400 uppercase inline-flex items-center gap-1">
                Next Composition <ArrowRight className="w-3 h-3" />
              </span>
              <div className="font-[family-name:var(--font-ecovoices-serif)] text-lg font-semibold text-white group-hover:text-amber-200 mt-1 line-clamp-1">
                {nextRelease.title}
              </div>
            </Link>
          )}
        </div>

        {/* 6. CANONICAL RIGHTS ATTRIBUTION */}
        <div className="p-5 rounded-2xl bg-black/50 border border-white/10 text-xs text-slate-400 space-y-1.5 font-mono">
          <div className="flex items-center gap-2 text-amber-200 font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-300" />
            <span>Canonical Rights &amp; Non-Commercial Stewardship Attribution</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            All music, lyrics, performance masters, and artwork for &ldquo;{release.title}&rdquo; are © {release.year} {release.publisher}. Curated on Kashmir EcoWatch EcoVoices under non-commercial environmental education and creative stewardship partnership.
          </p>
        </div>
      </div>
    </main>
  );
}
