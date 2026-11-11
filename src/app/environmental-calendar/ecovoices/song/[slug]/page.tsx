import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  Music, 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Droplet, 
  Trees, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  GraduationCap, 
  Radio, 
  Play, 
  FileText, 
  Activity, 
  Compass, 
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { OutdoorClassroomNav } from '@/components/outdoor-classroom/OutdoorClassroomNav';
import { ECOVOICES_RELEASES, EcoVoiceRelease } from '@/data/ecovoices-catalog';
import { EcoVoiceAudioPlayer } from '@/components/ecovoices/EcoVoiceAudioPlayer';

export function generateStaticParams() {
  return ECOVOICES_RELEASES.map((release) => ({
    slug: release.slug,
  }));
}

export default async function EcoVoiceSongDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const release = ECOVOICES_RELEASES.find((r) => r.slug === slug);

  if (!release) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20 relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-emerald-600/30 rounded-full blur-3xl" />
      </div>

      {/* Canonical Institutional Hero Section */}
      <Heading
        label={`${release.publisher} Official Release • ${release.catalogNumber} • ${release.duration}`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Calendar', href: '/environmental-calendar' },
          { label: 'EcoVoices', href: '/environmental-calendar/ecovoices' },
          { label: release.title }
        ]}
        icon={<Music className="w-6 h-6 text-purple-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-purple-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                {release.language}
              </span>
              <span className="text-white">EcoVoices Official Release</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
                {release.title}
              </span>
            </div>
          </div>
        }
        subtitle={release.subtitle}
        images={[
          release.coverImage,
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png'
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/environmental-calendar/ecovoices">
              <Button size="sm" variant="outline" className="border-purple-500/40 text-purple-300 hover:bg-purple-950/50 font-bold">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                All EcoVoices Tracks
              </Button>
            </Link>
            <a
              href="https://sufipulse.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/50 hover:bg-purple-900/60 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-colors"
            >
              <span>SufiPulse USA Catalog</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        }
      />

      {/* Persistent Module Navigation */}
      <OutdoorClassroomNav />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-8 max-w-5xl">
        {/* MEDIA & AUDIO PLAYER CONSOLE */}
        <Card className="p-6 bg-slate-900/90 border-purple-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-500/40 flex items-center justify-center text-purple-300 shrink-0">
                <Music className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm">
                  Audio &amp; Musical Arrangements
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Style: {release.musicalStyle} • Duration: {release.durationFormatted}
                </p>
              </div>
            </div>

            <a
              href={release.canonicalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 transition-colors shadow-lg shadow-purple-600/20"
            >
              <span>Stream Master on SufiPulse.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* REAL WORKING AUDIO PLAYER */}
          <EcoVoiceAudioPlayer release={release} variant="full" initiallyOpen={true} />
        </Card>

        {/* POETIC EXCERPT & KALAM */}
        <Card className="p-6 bg-slate-900/90 border-amber-500/30 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider font-mono">
              <FileText className="w-4 h-4" />
              <span>Sacred Kalam &amp; Poetic Excerpt</span>
            </div>
            <span className="text-xs text-slate-400 font-serif italic">
              {release.kalamPoetOrSource}
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/90 border border-amber-500/20 space-y-4">
            <div className="text-right dir-rtl font-arabic text-xl sm:text-2xl text-amber-300 font-serif leading-loose whitespace-pre-line">
              {release.poeticExcerptOriginal}
            </div>
            <div className="border-t border-white/10 pt-4 text-sm sm:text-base text-slate-200 leading-relaxed font-serif italic">
              &ldquo;{release.poeticExcerptTranslation}&rdquo;
            </div>
          </div>
        </Card>

        {/* ECOLOGICAL CONTEXT & SCIENTIFIC DATA CONNECTORS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 space-y-4">
            <Card className="p-6 bg-slate-900/90 border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                <Compass className="w-4 h-4" />
                <span>Western Himalayan Ecological Context</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                The Science Behind the Song
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {release.ecologicalDossier}
              </p>

              {/* Linked Observances */}
              <div className="pt-3 border-t border-white/5 space-y-2">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Official Environmental Calendar Observances:
                </span>
                <div className="flex flex-wrap gap-2">
                  {release.observances.map((obs, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-medium"
                    >
                      {obs}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Related Scientific Modules */}
          <div className="md:col-span-5 space-y-3">
            <div className="p-4 rounded-2xl bg-slate-900 border border-cyan-500/30 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase tracking-wider font-mono">
                <Activity className="w-4 h-4" />
                <span>Related Scientific Observatories</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Explore real-time data, GIS spatial models, and lab tests related to this song:
              </p>

              <div className="space-y-2">
                {release.relatedScientificModules.map((mod, i) => (
                  <Link
                    key={i}
                    href={mod.href}
                    className="block p-3 rounded-xl bg-slate-950 border border-white/5 hover:border-cyan-500/40 transition-colors group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-white group-hover:text-cyan-300">
                      <span>{mod.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-transform group-hover:translate-x-0.5" />
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                      {mod.description}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* OUTDOOR CLASSROOM PEDAGOGICAL FIELD ACTIVITY */}
        <Card className="p-6 sm:p-8 bg-slate-900/90 border-emerald-500/40 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
                <GraduationCap className="w-4 h-4" />
                <span>Outdoor Classroom Field Lesson</span>
              </div>
              <h3 className="text-xl font-black text-white mt-1">
                {release.outdoorClassroomActivity.activityTitle}
              </h3>
            </div>

            <Badge className="bg-emerald-500 text-slate-950 font-bold text-xs shrink-0 self-start sm:self-auto">
              {release.outdoorClassroomActivity.recommendedTier}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Scientific Hypothesis:</span>
              <p className="text-slate-200 text-xs leading-relaxed">
                {release.outdoorClassroomActivity.fieldHypothesis}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Duration &amp; Equipment:</span>
              <p className="text-emerald-300 font-semibold text-xs">
                {release.outdoorClassroomActivity.duration}
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1 pt-1">
                {release.outdoorClassroomActivity.materialsNeeded.map((mat, i) => (
                  <li key={i}>• {mat}</li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 space-y-1.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase">Measurable Learning Outcome:</span>
              <p className="text-cyan-300 text-xs leading-relaxed">
                {release.outdoorClassroomActivity.measurableLearningOutcome}
              </p>
            </div>
          </div>

          {/* METHODOLOGY STEPS */}
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/20 space-y-3">
            <span className="text-xs font-mono text-emerald-400 uppercase font-bold tracking-wider block">
              Step-by-Step Field Investigation Protocol:
            </span>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
              {release.outdoorClassroomActivity.fieldworkMethod}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <Link
              href={release.outdoorClassroomActivity.curriculumLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-600/20"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Access Curriculum Library &amp; Download Worksheets</span>
            </Link>

            <Link
              href="/environmental-calendar/outdoor-classroom/student-observations"
              className="inline-flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-medium"
            >
              <span>Submit Student Field Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </Card>

        {/* CANONICAL RIGHTS & LEGAL ATTRIBUTION FOOTER */}
        <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-400 space-y-1 font-mono">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            <span>Canonical Rights Attribution</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            All music, lyrics, performance masters, and artwork for &ldquo;{release.title}&rdquo; are © {release.year} {release.publisher}. Presented under non-commercial educational stewardship partnership on Kashmir EcoWatch.
          </p>
        </div>

      </div>
    </main>
  );
}
