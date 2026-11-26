'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Music,
  Feather,
  Film,
  Palette,
  Waves,
  Users,
  Play,
  ExternalLink,
  ShieldCheck,
  Award,
  ArrowRight,
  Search,
  Sparkles,
  GraduationCap,
  BookOpen,
  Compass,
  CheckCircle2,
  X,
  Info,
} from 'lucide-react';
import { BackgroundCarousel } from '@/components/ui/BackgroundCarousel';
import {
  ECOVOICES_MODULE_IDENTITY,
  ECOVOICES_COLLABORATING_INITIATIVES,
  ECOVOICES_DEPARTMENTS,
  ECOVOICES_RELEASES,
  ECOVOICES_THEME_CATEGORIES,
  ECOVOICES_COLLABORATION_FRAMEWORK,
  KEW_COMMUNICATION_PLATFORMS,
} from '@/data/ecovoices-catalog';
import { CREATIVE_ARTISTS_DOSSIERS } from '@/data/kew-creative-artists';
import { EcoVoicesSubNav } from '@/components/ecovoices/EcoVoicesSubNav';
import { EcoVoiceAudioPlayer } from '@/components/ecovoices/EcoVoiceAudioPlayer';
import { EcoVoicesBioacousticArchive } from '@/components/ecovoices/EcoVoicesBioacousticArchive';
import { EcoVoicesParticipationGateway } from '@/components/ecovoices/EcoVoicesParticipationGateway';

const DEPARTMENT_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  music: Music,
  poetry: Feather,
  cinema: Film,
  art: Palette,
  soundscapes: Waves,
  contributors: Users,
};

export default function EcoVoicesPage() {
  const [activeSection, setActiveSection] = useState<string>('premiere');
  const [featuredIndex, setFeaturedIndex] = useState<number>(0);
  const [isScreeningHero, setIsScreeningHero] = useState<boolean>(false);

  // Music library filters
  const [selectedMusicCategory, setSelectedMusicCategory] = useState<string>('all');
  const [musicSearch, setMusicSearch] = useState<string>('');

  // Contributors directory filters
  const [selectedMediumFilter, setSelectedMediumFilter] = useState<string>('ALL');
  const [selectedRegionFilter, setSelectedRegionFilter] = useState<string>('ALL');

  const featuredRelease = ECOVOICES_RELEASES[featuredIndex] || ECOVOICES_RELEASES[0];

  const filteredReleases = useMemo(() => {
    return ECOVOICES_RELEASES.filter((release) => {
      const matchesCat =
        selectedMusicCategory === 'all' || release.themeCategory === selectedMusicCategory;
      const q = musicSearch.toLowerCase().trim();
      const matchesQ =
        !q ||
        release.title.toLowerCase().includes(q) ||
        release.primaryTheme.toLowerCase().includes(q) ||
        release.language.toLowerCase().includes(q) ||
        release.instrumentsUsed.some((inst) => inst.toLowerCase().includes(q));
      return matchesCat && matchesQ;
    });
  }, [selectedMusicCategory, musicSearch]);

  // Regional creative dossiers grouped cleanly by medium (zero fabricated profiles)
  const regionalMusicArtists = useMemo(
    () =>
      CREATIVE_ARTISTS_DOSSIERS.filter(
        (a) => a.medium === 'Songs & Music' && a.id !== 'art-019'
      ),
    []
  );

  const regionalPoetryArtists = useMemo(
    () =>
      CREATIVE_ARTISTS_DOSSIERS.filter(
        (a) => a.medium === 'Poetry & Literature' && a.id !== 'art-019'
      ),
    []
  );

  const regionalCinemaArtists = useMemo(
    () =>
      CREATIVE_ARTISTS_DOSSIERS.filter(
        (a) =>
          a.medium === 'Filmmaking & Cinema' || a.secondaryMedium === 'Filmmaking & Cinema'
      ),
    []
  );

  const regionalVisualArtists = useMemo(
    () =>
      CREATIVE_ARTISTS_DOSSIERS.filter(
        (a) =>
          a.medium === 'Visual Arts & Installations' ||
          a.medium === 'Animation & Illustration'
      ),
    []
  );

  const filteredContributors = useMemo(() => {
    return CREATIVE_ARTISTS_DOSSIERS.filter((artist) => {
      const matchesMedium =
        selectedMediumFilter === 'ALL' ||
        artist.medium === selectedMediumFilter ||
        artist.secondaryMedium === selectedMediumFilter;
      const matchesRegion =
        selectedRegionFilter === 'ALL' || artist.region === selectedRegionFilter;
      return matchesMedium && matchesRegion;
    });
  }, [selectedMediumFilter, selectedRegionFilter]);

  // Synchronize URL hash & scroll spy with sub-navigation
  useEffect(() => {
    const syncHash = () => {
      const rawHash = window.location.hash.replace('#', '');
      if (!rawHash) return;
      if (rawHash === 'participate') {
        setActiveSection('submit');
        const el = document.getElementById('submit');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      setActiveSection(rawHash);
    };

    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  useEffect(() => {
    const sectionIds = [
      'premiere',
      'music',
      'poetry',
      'cinema',
      'visual-arts',
      'soundscapes',
      'artists',
      'classroom',
      'submit',
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: '-18% 0px -60% 0px', threshold: [0.1, 0.3] }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const heroBackgroundImages = useMemo(
    () => [
      '/images/environmental-calendar/calendar-hero-ecovoices-studio.jpg',
      '/images/publications/sheshnag-alpine-glacial-lake.jpg',
      '/images/environmental-calendar/calendar-hero-students-water.jpg',
      '/images/environmental-calendar/calendar-hero-outdoor-classroom.jpg',
    ],
    []
  );

  const heroSlidesMeta = useMemo(
    () => [
      { id: 'ecovoices-studio', label: '01 · Acoustic Studio & Musical Stewardship' },
      { id: 'sheshnag-lake', label: '02 · High-Altitude Glacial Waters & Sacred Trust' },
      { id: 'watershed-fieldwork', label: '03 · Watershed Science & Community Consciousness' },
      { id: 'outdoor-classroom', label: '04 · Experiential Field Learning & Expression' },
    ],
    []
  );

  return (
    <main className="min-h-screen bg-[#04060d] text-slate-100 relative overflow-x-clip">
      {/* ===================================================================== */}
      {/* 1. COLLABORATIVE ECOVOICES HERO & PREMIERE STAGE                      */}
      {/* ===================================================================== */}
      <section
        id="premiere"
        data-kew-dark-surface="true"
        className="kew-module-hero-surface relative overflow-hidden"
      >
        {/* Preserved Multi-Slide Background Carousel + Approved Right-Side Vertical Carousel Controller */}
        <BackgroundCarousel
          images={heroBackgroundImages}
          interval={6000}
          slidesMeta={heroSlidesMeta}
          overlayClassName="bg-slate-950/65 bg-gradient-to-b from-slate-950/90 via-slate-950/78 to-[#04060d]"
        />

        {/* Subtle Starlit Nocturnal Amphitheatre Shimmer Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage: `
              radial-gradient(1.5px 1.5px at 14% 18%, rgba(255,255,255,0.65) 50%, transparent 100%),
              radial-gradient(1px 1px at 28% 34%, rgba(253,230,138,0.55) 50%, transparent 100%),
              radial-gradient(1.5px 1.5px at 46% 12%, rgba(255,255,255,0.55) 50%, transparent 100%),
              radial-gradient(1px 1px at 63% 26%, rgba(199,210,254,0.6) 50%, transparent 100%),
              radial-gradient(2px 2px at 79% 16%, rgba(253,230,138,0.65) 50%, transparent 100%),
              radial-gradient(1px 1px at 88% 38%, rgba(255,255,255,0.45) 50%, transparent 100%),
              radial-gradient(ellipse 75% 50% at 50% 0%, rgba(49,46,129,0.26), transparent 70%),
              radial-gradient(ellipse 60% 45% at 50% 36%, rgba(217,119,6,0.09), transparent 72%)
            `,
          }}
        />

        <div className="kew-module-hero-inner container mx-auto relative z-10 kew-has-hero-rail space-y-12">
          {/* Monumental Centered Collaborative Masthead */}
          <div className="text-center max-w-6xl mx-auto space-y-5">
            {/* Revised Introductory Label */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/75 border border-amber-300/35 backdrop-blur-md shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.9)] shrink-0" />
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.22em] sm:tracking-[0.28em] text-amber-200 font-semibold">
                {ECOVOICES_MODULE_IDENTITY.eyebrow}
              </span>
            </div>

            {/* Preserved Main Title */}
            <h1 className="font-[family-name:var(--font-ecovoices-display)] text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[0.26em] sm:tracking-[0.34em] text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-300/85 pl-[0.26em] sm:pl-[0.34em] drop-shadow-[0_2px_18px_rgba(0,0,0,0.65)]">
              ECOVOICES
            </h1>

            {/* Preserved Tagline */}
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.34em] sm:tracking-[0.38em] text-amber-300/95 font-semibold">
              {ECOVOICES_MODULE_IDENTITY.motto}
            </p>

            {/* Revised Subtitle & Description */}
            <div className="space-y-2.5 pt-1">
              <p className="font-[family-name:var(--font-ecovoices-serif)] italic text-xl sm:text-2xl md:text-3xl text-slate-100 leading-snug max-w-3xl mx-auto">
                {ECOVOICES_MODULE_IDENTITY.subtitle}
              </p>
              <p className="text-xs sm:text-sm text-slate-200/90 max-w-3xl mx-auto leading-relaxed">
                {ECOVOICES_MODULE_IDENTITY.description}
              </p>
            </div>

            {/* Preserved Six Creative Pillars Navigation Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-2">
              {ECOVOICES_DEPARTMENTS.map((dept) => {
                const Icon = DEPARTMENT_ICONS[dept.id] || Sparkles;
                return (
                  <a
                    key={dept.id}
                    href={`#${dept.hash}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-amber-300/15 border border-white/15 hover:border-amber-300/45 text-xs text-slate-100 hover:text-amber-100 backdrop-blur-sm transition-all"
                  >
                    <Icon className="w-3.5 h-3.5 text-amber-300/85" />
                    <span>{dept.navLabel}</span>
                  </a>
                );
              })}
            </div>

            {/* Compact Institutional Attribution Strip (1x4 Horizontal on Desktop, 2x2 on Mobile) */}
            <div
              aria-label="A Collaborative Initiative Of"
              className="pt-5 max-w-6xl mx-auto space-y-3.5"
            >
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-8 sm:w-14 bg-gradient-to-r from-transparent to-amber-300/45" aria-hidden="true" />
                <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.26em] text-amber-200 font-semibold drop-shadow-[0_1px_6px_rgba(0,0,0,0.85)]">
                  A COLLABORATIVE INITIATIVE OF
                </span>
                <span className="h-px w-8 sm:w-14 bg-gradient-to-l from-transparent to-amber-300/45" aria-hidden="true" />
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
                {ECOVOICES_COLLABORATING_INITIATIVES.map((inst) => (
                  <a
                    key={inst.id}
                    href={inst.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group h-full flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3 px-3 py-3 sm:px-3.5 sm:py-3 rounded-2xl bg-slate-950/85 hover:bg-slate-900/95 border border-white/15 hover:border-amber-300/50 backdrop-blur-md text-left transition-all shadow-xl"
                  >
                    <div className="flex items-center justify-between w-full sm:w-auto">
                      <span className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#04060d] border border-white/15 group-hover:border-amber-300/35 p-1.5 shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={inst.logoPath}
                          alt={inst.logoAlt}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                          loading="eager"
                        />
                      </span>
                      <ExternalLink
                        className="w-3 h-3 text-slate-400 group-hover:text-amber-300 shrink-0 sm:hidden opacity-80 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="min-w-0 flex-1 w-full">
                      <span className="flex items-start justify-between gap-1.5">
                        <span className="text-xs sm:text-[13px] font-semibold text-white group-hover:text-amber-200 leading-snug transition-colors">
                          {inst.name}
                        </span>
                        <ExternalLink
                          className="hidden sm:block w-3 h-3 text-slate-400 group-hover:text-amber-300 shrink-0 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="block text-[10px] sm:text-[11px] text-slate-300/90 leading-snug mt-0.5">
                        {inst.role}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              {/* Underlying Institutional Philosophy */}
              <p className="font-[family-name:var(--font-ecovoices-serif)] italic text-sm sm:text-base text-amber-100/95 pt-1 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
                {ECOVOICES_MODULE_IDENTITY.philosophy}
              </p>
            </div>
          </div>

          {/* ================================================================= */}
          {/* FEATURED ENVIRONMENTAL COMPOSITION PREMIERE STAGE                  */}
          {/* ================================================================= */}
          <div className="rounded-3xl overflow-hidden border border-amber-300/25 bg-gradient-to-br from-[#090d1c]/95 via-[#070a15]/95 to-[#0c0918]/95 shadow-[0_28px_80px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Left Narrative & Poetic Column */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-amber-300 font-semibold">
                      Featured Environmental Composition
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-400/30">
                      Published · {featuredRelease.catalogCode}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h2 className="font-[family-name:var(--font-ecovoices-display)] text-2xl sm:text-3xl lg:text-4xl font-semibold text-white tracking-wider leading-tight">
                      {featuredRelease.shortTitle || featuredRelease.title}
                    </h2>
                    <p className="font-[family-name:var(--font-ecovoices-serif)] italic text-lg sm:text-xl text-amber-200">
                      {featuredRelease.id === 'pani-gawah-hai'
                        ? 'Kashmir Water Bears Witness'
                        : featuredRelease.subtitle}
                    </p>
                  </div>

                  <div className="text-xs font-mono text-slate-300 tracking-wide">
                    {featuredRelease.artistCredit} · Runtime {featuredRelease.durationFormatted}
                  </div>

                  <div className="p-4 rounded-2xl bg-black/45 border border-amber-300/15 space-y-2">
                    <p
                      dir="rtl"
                      className="text-right font-[family-name:var(--font-urdu)] text-base sm:text-lg text-amber-200/95 leading-[2.1] whitespace-pre-line"
                    >
                      {featuredRelease.poeticExcerptOriginal}
                    </p>
                    <p className="font-[family-name:var(--font-ecovoices-serif)] italic text-sm text-slate-300 border-t border-white/10 pt-2">
                      &ldquo;{featuredRelease.poeticExcerptTranslation}&rdquo;
                    </p>
                  </div>

                  <p className="text-xs font-mono uppercase tracking-[0.26em] text-amber-300/80">
                    {ECOVOICES_MODULE_IDENTITY.tagline}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsScreeningHero(true)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-100 hover:from-amber-200 hover:to-white text-slate-950 font-bold text-xs shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Screen Composition</span>
                  </button>

                  <Link
                    href={`/ecovoices/song/${featuredRelease.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-amber-100 border border-amber-300/30 text-xs font-semibold transition-colors"
                  >
                    <span>Composition Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Widescreen Cinema Player + 6-Release Strip */}
              <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between gap-4 bg-black/40">
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-amber-300/20 bg-black shadow-2xl group">
                  {isScreeningHero ? (
                    <div className="relative w-full h-full">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${featuredRelease.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1`}
                        title={featuredRelease.title}
                        className="w-full h-full border-0 absolute inset-0 z-10"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                      <button
                        type="button"
                        onClick={() => setIsScreeningHero(false)}
                        aria-label="Close featured screening"
                        className="absolute top-3 right-3 z-20 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-black/85 text-amber-100 border border-amber-300/35 text-[11px] font-semibold cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Close</span>
                      </button>
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <img
                        src={featuredRelease.coverImage}
                        alt={featuredRelease.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/35 to-black/30" />

                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 z-10">
                        <button
                          type="button"
                          onClick={() => setIsScreeningHero(true)}
                          aria-label={`Play featured composition ${featuredRelease.title}`}
                          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-amber-300 via-amber-200 to-yellow-100 text-slate-950 flex items-center justify-center shadow-[0_0_45px_rgba(251,191,36,0.5)] hover:scale-110 transition-transform cursor-pointer ring-4 ring-amber-200/30"
                        >
                          <Play className="w-8 h-8 ml-1 fill-slate-950" />
                        </button>
                        <span className="text-xs font-semibold text-amber-100 bg-black/75 backdrop-blur-md px-3.5 py-1 rounded-full border border-amber-300/25">
                          Watch SufiPulse USA Master ({featuredRelease.durationFormatted})
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-200 z-10">
                        <span className="font-mono text-[11px] text-amber-200">
                          {featuredRelease.musicalStyle}
                        </span>
                        <a
                          href={featuredRelease.canonicalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-200 hover:text-white underline underline-offset-4"
                        >
                          <span>SufiPulse.com</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  )}
                </div>

                {/* 6 Published Compositions Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Select Published Master Composition (1–6):</span>
                    <a
                      href="https://www.youtube.com/playlist?list=PLhu9NyNCTr7jRfvo6ktcYSayRtURCDVnM"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-300 hover:text-amber-200 inline-flex items-center gap-1"
                    >
                      <span>Official YouTube Playlist</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                    {ECOVOICES_RELEASES.map((rel, idx) => {
                      const active = featuredIndex === idx;
                      return (
                        <button
                          key={rel.id}
                          type="button"
                          onClick={() => {
                            setFeaturedIndex(idx);
                            setIsScreeningHero(false);
                          }}
                          className={`p-1.5 rounded-xl border text-left transition-all cursor-pointer ${
                            active
                              ? 'bg-amber-300/15 border-amber-300/60 ring-1 ring-amber-300/40'
                              : 'bg-white/[0.03] border-white/10 hover:border-amber-300/30'
                          }`}
                        >
                          <div className="h-10 w-full rounded-lg overflow-hidden mb-1">
                            <img
                              src={rel.coverImage}
                              alt={rel.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-[10px] font-semibold text-amber-100 truncate">
                            #{rel.trackOrder} {rel.shortTitle || rel.title}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================== */}
      {/* 2. EXCLUSIVE STICKY CREATIVE NAVIGATION                               */}
      {/* ===================================================================== */}
      <EcoVoicesSubNav
        activeSection={activeSection}
        onSelectSection={(id) => setActiveSection(id)}
      />

      <div className="container mx-auto py-14 sm:py-20 space-y-24 relative z-10">
        {/* =================================================================== */}
        {/* 3. SIX CREATIVE DEPARTMENTS ARCHITECTURE OVERVIEW                    */}
        {/* =================================================================== */}
        <section aria-labelledby="departments-heading" className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-amber-300">
                Creative Information Architecture · Six Departments
              </span>
              <h2
                id="departments-heading"
                className="font-[family-name:var(--font-ecovoices-serif)] text-3xl sm:text-4xl lg:text-5xl font-semibold text-white"
              >
                Six Expressions of Ecological Consciousness
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md">
              Published SufiPulse USA × KEW releases are clearly distinguished from externally documented regional works and proposed department expansions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ECOVOICES_DEPARTMENTS.map((dept) => {
              const Icon = DEPARTMENT_ICONS[dept.id] || Sparkles;
              return (
                <a
                  key={dept.id}
                  href={`#${dept.hash}`}
                  className="group rounded-3xl overflow-hidden bg-[#080c18]/90 border border-white/10 hover:border-amber-300/45 transition-all flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="relative h-44 overflow-hidden">
                      <img
                        src={dept.artworkImage}
                        alt={`${dept.title} — ${dept.artworkCaption}`}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080c18] via-[#080c18]/45 to-black/25" />
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <div className="w-9 h-9 rounded-xl bg-black/70 border border-amber-300/30 flex items-center justify-center text-amber-300 backdrop-blur-md">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span
                          className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border backdrop-blur-md ${
                            dept.status === 'published'
                              ? 'bg-emerald-950/85 text-emerald-200 border-emerald-400/35'
                              : 'bg-amber-950/85 text-amber-200 border-amber-300/35'
                          }`}
                        >
                          {dept.status === 'published' ? 'Published Archive' : 'Expanding Department'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-2.5">
                      <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl font-semibold text-white group-hover:text-amber-200 transition-colors">
                        {dept.title}
                      </h3>
                      <p className="text-xs font-medium text-amber-200/85 leading-relaxed">
                        {dept.subtitle}
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                        {dept.description}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-3.5 border-t border-white/10 flex items-center justify-between text-xs font-mono text-amber-200/90">
                    <span className="truncate pr-2 text-[10px] text-slate-400">
                      {dept.statusLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 shrink-0 group-hover:translate-x-0.5 transition-transform">
                      Enter <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </section>

        {/* =================================================================== */}
        {/* DEPARTMENT I: ENVIRONMENTAL MUSIC                                    */}
        {/* =================================================================== */}
        <section id="music" className="scroll-mt-32 space-y-8 pt-6 border-t border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-amber-300">
                  Department I · Environmental Music
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-400/30">
                  Confirmed &amp; Published · {ECOVOICES_RELEASES.length} Master Releases
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-ecovoices-serif)] text-3xl sm:text-5xl font-semibold text-white">
                Original Environmental Songs &amp; Sufi Kalam
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Produced and published by SufiPulse USA in non-commercial stewardship partnership with Kashmir EcoWatch. Every composition pairs traditional Himalayan acoustic instrumentation with empirical watershed, wetland, and forest science.
              </p>
            </div>

            <a
              href="https://www.youtube.com/playlist?list=PLhu9NyNCTr7jRfvo6ktcYSayRtURCDVnM"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-300 hover:bg-amber-200 text-slate-950 font-bold text-xs shrink-0 transition-colors self-start lg:self-auto"
            >
              <span>Open Full SufiPulse YouTube Playlist</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-[#080c18]/90 border border-white/10">
            <div className="flex flex-wrap gap-2">
              {ECOVOICES_THEME_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedMusicCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedMusicCategory === cat.id
                      ? 'bg-amber-300 text-slate-950'
                      : 'bg-black/45 text-slate-300 hover:text-amber-200 border border-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="relative min-w-[250px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                aria-label="Search compositions, themes, or instruments"
                placeholder="Search song, theme, santoor, rabab..."
                value={musicSearch}
                onChange={(e) => setMusicSearch(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-300/50"
              />
            </div>
          </div>

          {/* 6 Published Compositions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {filteredReleases.map((release) => (
              <article
                key={release.id}
                className="p-6 sm:p-7 rounded-3xl bg-[#080c18]/95 border border-white/10 hover:border-amber-300/40 transition-all flex flex-col justify-between space-y-6 shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-300/15 text-amber-200 border border-amber-300/30 font-bold">
                      {release.catalogNumber}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-400/30">
                      Published Master
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
                      {release.language}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
                      {release.durationFormatted}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl sm:text-3xl font-semibold text-white leading-snug">
                      {release.title}
                    </h3>
                    <p className="font-[family-name:var(--font-ecovoices-serif)] italic text-base text-amber-200/85 mt-0.5">
                      {release.subtitle}
                    </p>
                  </div>

                  <EcoVoiceAudioPlayer release={release} variant="card" />

                  <div className="p-4 rounded-2xl bg-black/50 border border-amber-300/15 space-y-2">
                    <p
                      dir="rtl"
                      className="text-right font-[family-name:var(--font-urdu)] text-sm sm:text-base text-amber-200/90 leading-[2.1] whitespace-pre-line"
                    >
                      {release.poeticExcerptOriginal}
                    </p>
                    <p className="font-[family-name:var(--font-ecovoices-serif)] italic text-xs sm:text-sm text-slate-300 border-t border-white/10 pt-2">
                      &ldquo;{release.poeticExcerptTranslation}&rdquo;
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {release.ecologicalDossier}
                  </p>

                  {/* Connected Scientific Observatories */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {release.relatedScientificModules.slice(0, 2).map((mod, i) => (
                      <Link
                        key={i}
                        href={mod.href}
                        className="p-2.5 rounded-xl bg-black/45 border border-white/10 hover:border-amber-300/35 transition-colors group"
                      >
                        <div className="text-[11px] font-semibold text-slate-200 group-hover:text-amber-200 flex items-center justify-between">
                          <span className="truncate pr-2">{mod.title}</span>
                          <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-amber-300 shrink-0" />
                        </div>
                        <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                          {mod.category}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                  <Link
                    href={`/ecovoices/song/${release.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-300 hover:bg-amber-200 text-slate-950 font-bold text-xs transition-colors"
                  >
                    <span>Composition &amp; Field Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={release.canonicalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-200/85 hover:text-amber-100 font-mono underline underline-offset-4"
                  >
                    <span>SufiPulse Master</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          {/* Externally Documented Regional Musical Voices */}
          <div className="p-6 rounded-3xl bg-[#070b16]/90 border border-white/10 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300/85 block">
                  Regional Musical Reference Index · External Records
                </span>
                <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl font-semibold text-white">
                  Documented Ecological Songwriting Across the Western Himalayas
                </h3>
              </div>
              <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
                Independently Produced · Not Hosted by KEW
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regionalMusicArtists.map((artist) => (
                <div
                  key={artist.id}
                  className="p-4 rounded-2xl bg-black/45 border border-white/10 space-y-2"
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-amber-200/80">
                    <span>{artist.region}</span>
                    <span>{artist.activePeriod}</span>
                  </div>
                  <h4 className="font-semibold text-white text-sm">{artist.name}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                    {artist.keyImpact}. Documented work:{' '}
                    <em className="text-slate-200">
                      {artist.documentedWorks[0]?.title} ({artist.documentedWorks[0]?.year})
                    </em>
                    .
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* DEPARTMENT II: ENVIRONMENTAL POETRY                                  */}
        {/* =================================================================== */}
        <section id="poetry" className="scroll-mt-32 space-y-8 pt-6 border-t border-white/10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-amber-300">
                Department II · Environmental Poetry
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-400/30">
                Curated Kalam Archive · Anthology Expansion Open
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-ecovoices-serif)] text-3xl sm:text-5xl font-semibold text-white">
              Mystical Reflections, Shruks &amp; Ecological Verse
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Rooted in Kashmir&apos;s centuries-old eco-mystical canon—from Sheikh Noor-ud-Din Wali&apos;s foundational shruk{' '}
              <em className="text-amber-200">&ldquo;Ann Poshi Teli Yeli Van Poshi&rdquo;</em> (Food will thrive only as long as the forests thrive) to contemporary Kashmiri, Urdu, and Dogri environmental poetry.
            </p>
          </div>

          {/* Published Poetic Excerpts from EcoVoices Catalog */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ECOVOICES_RELEASES.map((release) => (
              <div
                key={`poem-${release.id}`}
                className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#090e1e] to-[#070a15] border border-amber-300/20 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/10">
                    <span className="text-[11px] font-mono text-amber-300 truncate">
                      {release.kalamPoetOrSource}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/75 text-emerald-300 border border-emerald-400/30 shrink-0">
                      Published Kalam
                    </span>
                  </div>

                  <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-xl sm:text-2xl font-semibold text-white">
                    {release.title}
                  </h3>

                  <div className="p-5 rounded-2xl bg-black/55 border border-amber-300/15 space-y-3">
                    <p
                      dir="rtl"
                      className="text-right font-[family-name:var(--font-urdu)] text-lg text-amber-200 leading-[2.2] whitespace-pre-line"
                    >
                      {release.poeticExcerptOriginal}
                    </p>
                    <p className="font-[family-name:var(--font-ecovoices-serif)] italic text-sm sm:text-base text-slate-200 leading-relaxed border-t border-white/10 pt-3">
                      &ldquo;{release.poeticExcerptTranslation}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400 font-mono text-[11px]">{release.language}</span>
                  <Link
                    href={`/ecovoices/song/${release.slug}`}
                    className="text-amber-200 hover:text-amber-100 inline-flex items-center gap-1 font-semibold"
                  >
                    <span>Listen to Musical Setting</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Documented Regional Poets + Forthcoming Literary Expansion */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 p-6 rounded-3xl bg-[#080c18]/90 border border-white/10 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl font-semibold text-white">
                  Externally Documented Regional Ecological Poets
                </h3>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
                  External Literary Records
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {regionalPoetryArtists.map((poet) => (
                  <div
                    key={poet.id}
                    className="p-4 rounded-2xl bg-black/50 border border-white/10 space-y-2"
                  >
                    <div className="text-[10px] font-mono text-amber-300">{poet.region}</div>
                    <h4 className="font-semibold text-white text-sm">{poet.name}</h4>
                    <p className="font-[family-name:var(--font-ecovoices-serif)] italic text-xs text-amber-100/90">
                      {poet.editorialTribute}
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {poet.documentedWorks[0]?.title} ({poet.documentedWorks[0]?.year}) —{' '}
                      {poet.documentedWorks[0]?.sourceOutlet}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-br from-[#0d1022] to-[#080b16] border border-amber-300/25 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300">
                  Forthcoming Literary Anthology · Proposed Expansion
                </span>
                <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl font-semibold text-white">
                  Ahl-e-Qalam &amp; SufiPulse Literary Journal Intake
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  EcoVoices is expanding its literary department to publish original multilingual ecological poems, annotated translations of classical Himalayan shruks, and reflective field essays.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 pt-2">
                <a
                  href="#submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-300 hover:bg-amber-200 text-slate-950 font-bold text-xs transition-colors"
                >
                  <span>Submit Original Poetry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://sufipulse.com/literary-journal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.05] hover:bg-white/[0.1] text-amber-200 border border-amber-300/30 text-xs font-semibold"
                >
                  <span>SufiPulse Literary Journal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* DEPARTMENT III: ENVIRONMENTAL CINEMA                                 */}
        {/* =================================================================== */}
        <section id="cinema" className="scroll-mt-32 space-y-8 pt-6 border-t border-white/10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-amber-300">
                Department III · Environmental Cinema
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-200 border border-amber-300/35">
                Proposed Expansion · External Documentary Reference Index
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-ecovoices-serif)] text-3xl sm:text-5xl font-semibold text-white">
              Short Films, Documentaries &amp; Visual Narratives
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Cinematic storytelling illuminating receding glaciers, plastic waste recovery on Wular Lake, nomadic Changthang pastures, and indigenous glacier-grafting traditions across the Western Himalayas.
            </p>
          </div>

          {/* Governance Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#090d1b]/90 border border-amber-300/25 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-200">Editorial &amp; Provenance Distinction:</strong>{' '}
              Native Kashmir EcoWatch documentary productions and curated screening rooms are a{' '}
              <span className="text-amber-200 font-semibold">forthcoming proposed expansion</span>{' '}
              currently inviting filmmaker submissions. The films indexed below are{' '}
              <strong className="text-white">independently produced regional documentaries</strong>{' '}
              verified through UNESCO, CMS VATAVARAN, and national festival records; KEW does not claim authorship or host unauthorized copies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regionalCinemaArtists.map((filmmaker) => {
              const primaryFilm = filmmaker.documentedWorks[0];
              return (
                <article
                  key={filmmaker.id}
                  className="p-6 rounded-3xl bg-[#080c18]/90 border border-white/10 hover:border-amber-300/35 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                      <span className="text-amber-300">{filmmaker.region}</span>
                      <span className="px-2 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10">
                        External Film Record · {primaryFilm?.year}
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl font-semibold text-white leading-snug">
                      {primaryFilm?.title || filmmaker.name}
                    </h3>

                    <div className="text-xs font-medium text-amber-200/90">
                      Directed / Created by {filmmaker.name}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {primaryFilm?.description || filmmaker.biography}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-1.5 text-[11px]">
                    <div className="text-emerald-300 font-mono text-[10px]">
                      {primaryFilm?.evidenceTier}
                    </div>
                    <p className="text-slate-400 leading-snug">{primaryFilm?.documentedOutcome}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =================================================================== */}
        {/* DEPARTMENT IV: ENVIRONMENTAL ART                                     */}
        {/* =================================================================== */}
        <section id="visual-arts" className="scroll-mt-32 space-y-8 pt-6 border-t border-white/10">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-amber-300">
                Department IV · Environmental Art
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-200 border border-amber-300/35">
                Proposed Gallery Expansion · Documented Regional Practice
              </span>
            </div>
            <h2 className="font-[family-name:var(--font-ecovoices-serif)] text-3xl sm:text-5xl font-semibold text-white">
              Paintings, Installations, Illustration &amp; Ecological Interpretation
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Exploring how fine art, riverbank sculpture, circular waste-to-art portraits, and botanical illustration awaken public stewardship for threatened lakes, rivers, and mountain ecosystems.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#090d1b]/90 border border-amber-300/25 flex items-start gap-3">
            <Info className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-amber-200">Gallery Provenance Notice:</strong> Curated digital exhibitions hosted directly on EcoVoices are a{' '}
              <span className="text-amber-200 font-semibold">forthcoming proposed expansion</span>. Below are independently documented Western Himalayan visual art projects verified in museum, university, and regional press archives.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionalVisualArtists.map((artist) => {
              const work = artist.documentedWorks[0];
              return (
                <article
                  key={artist.id}
                  className="p-6 sm:p-7 rounded-3xl bg-[#080c18]/90 border border-white/10 hover:border-amber-300/35 transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                      <span className="text-amber-300">
                        {artist.region} · {artist.geographicSubject}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-white/[0.05] text-slate-300 border border-white/10 shrink-0">
                        Documented Practice
                      </span>
                    </div>

                    <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl font-semibold text-white">
                      {work?.title || artist.name}
                    </h3>

                    <div className="text-xs text-amber-200/90 font-medium">
                      {artist.name} — {artist.designation}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{artist.biography}</p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                    <span className="font-mono text-[10px] text-emerald-300">
                      {work?.evidenceTier} ({work?.year})
                    </span>
                    {artist.linkedModules[0] && (
                      <Link
                        href={artist.linkedModules[0].url}
                        className="text-amber-200 hover:text-amber-100 inline-flex items-center gap-1"
                      >
                        <span>{artist.linkedModules[0].label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =================================================================== */}
        {/* DEPARTMENT V: SOUNDS OF NATURE                                       */}
        {/* =================================================================== */}
        <section id="soundscapes" className="scroll-mt-32 pt-6 border-t border-white/10">
          <EcoVoicesBioacousticArchive />
        </section>

        {/* =================================================================== */}
        {/* DEPARTMENT VI: CREATIVE CONTRIBUTORS & SUBMISSION GATEWAY            */}
        {/* =================================================================== */}
        <section id="artists" className="scroll-mt-32 space-y-10 pt-6 border-t border-white/10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-amber-300">
                  Department VI · Creative Contributors
                </span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-400/30">
                  19 Documented Creative Voices · 5 Regions
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-ecovoices-serif)] text-3xl sm:text-5xl font-semibold text-white">
                Musicians, Poets, Filmmakers &amp; Environmental Storytellers
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Every profile below is backed by primary documentary records across Kashmir Valley, Jammu, Ladakh, Azad Jammu &amp; Kashmir, and Gilgit-Baltistan, clearly distinguishing explicit conservation advocacy from artistic documentation.
              </p>
            </div>

            {/* Medium & Region Filters */}
            <div className="flex flex-wrap items-center gap-2.5">
              <select
                aria-label="Filter creative contributors by artistic medium"
                value={selectedMediumFilter}
                onChange={(e) => setSelectedMediumFilter(e.target.value)}
                className="bg-[#080c18] border border-white/15 rounded-full px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-300/50"
              >
                <option value="ALL">All Creative Mediums (19)</option>
                <option value="Songs & Music">Songs &amp; Music</option>
                <option value="Poetry & Literature">Poetry &amp; Literature</option>
                <option value="Filmmaking & Cinema">Filmmaking &amp; Cinema</option>
                <option value="Visual Arts & Installations">Visual Arts &amp; Installations</option>
                <option value="Animation & Illustration">Animation &amp; Illustration</option>
              </select>

              <select
                aria-label="Filter creative contributors by region"
                value={selectedRegionFilter}
                onChange={(e) => setSelectedRegionFilter(e.target.value)}
                className="bg-[#080c18] border border-white/15 rounded-full px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:border-amber-300/50"
              >
                <option value="ALL">All 5 Regions</option>
                <option value="Kashmir Valley">Kashmir Valley</option>
                <option value="Jammu">Jammu</option>
                <option value="Ladakh">Ladakh</option>
                <option value="Azad Jammu & Kashmir">Azad Jammu &amp; Kashmir</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredContributors.map((artist) => (
              <div
                key={artist.id}
                className={`p-5 rounded-3xl border flex flex-col justify-between space-y-4 transition-all ${
                  artist.id === 'art-019'
                    ? 'bg-gradient-to-b from-[#0f1328] to-[#080c18] border-amber-300/45 shadow-lg'
                    : 'bg-[#080c18]/85 border-white/10 hover:border-amber-300/30'
                }`}
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-[10px] font-mono">
                    <span className="text-amber-300 font-semibold">{artist.medium}</span>
                    <span className="text-slate-400">{artist.region}</span>
                  </div>

                  <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl font-semibold text-white">
                    {artist.name}
                  </h3>

                  <p className="text-[11px] text-amber-200/85 font-medium leading-snug">
                    {artist.designation}
                  </p>

                  <p className="font-[family-name:var(--font-ecovoices-serif)] italic text-xs text-slate-300 leading-relaxed">
                    {artist.editorialTribute}
                  </p>

                  <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-3">
                    {artist.keyImpact}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2 text-[10px] font-mono">
                  <span className="text-emerald-300 truncate">{artist.contributionTypeLabel}</span>
                  <Link
                    href="/resources/kew-green-heroes"
                    className="text-amber-200 hover:text-white shrink-0"
                  >
                    Full Archive →
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Open Creative Submission & SufiPulse Pathways */}
          <EcoVoicesParticipationGateway />
        </section>

        {/* =================================================================== */}
        {/* COMPANION PEDAGOGY: OUTDOOR CLASSROOM FIELD LESSONS                  */}
        {/* =================================================================== */}
        <section id="classroom" className="scroll-mt-32 space-y-6 pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-3xl">
              <span className="text-[11px] font-mono uppercase tracking-[0.24em] text-emerald-300">
                Pedagogical Bridge · Music to Fieldwork
              </span>
              <h2 className="font-[family-name:var(--font-ecovoices-serif)] text-3xl sm:text-4xl font-semibold text-white">
                Companion Outdoor Classroom Field Lessons
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                While EcoVoices stands as an independent creative arts platform, every published musical composition remains paired with a standardized field investigation in the Kashmir EcoWatch Outdoor Classroom.
              </p>
            </div>

            <Link
              href="/environmental-calendar/outdoor-classroom"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-400/15 hover:bg-emerald-400/25 text-emerald-200 border border-emerald-400/35 text-xs font-semibold shrink-0"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Visit Outdoor Classroom</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ECOVOICES_RELEASES.map((release) => (
              <div
                key={`lesson-${release.id}`}
                className="p-5 rounded-3xl bg-[#080c18]/90 border border-white/10 hover:border-emerald-400/35 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono text-emerald-300 uppercase">
                    {release.catalogNumber} · {release.outdoorClassroomActivity.duration}
                  </span>
                  <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-xl font-semibold text-white leading-snug">
                    {release.outdoorClassroomActivity.activityTitle}
                  </h3>
                  <p className="text-[11px] text-amber-200/85 italic">
                    Paired with: {release.shortTitle || release.title}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                    {release.outdoorClassroomActivity.fieldHypothesis}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <Link
                    href={release.outdoorClassroomActivity.curriculumLink}
                    className="text-emerald-300 hover:text-emerald-200 font-semibold inline-flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Worksheets</span>
                  </Link>
                  <Link
                    href={`/ecovoices/song/${release.slug}`}
                    className="text-amber-200 hover:text-white inline-flex items-center gap-1"
                  >
                    <span>Lesson Protocol</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* THREE PUBLIC COMMUNICATION PLATFORMS & INSTITUTIONAL CHARTER         */}
        {/* =================================================================== */}
        <section id="charter" className="space-y-10 pt-6 border-t border-white/10">
          {/* Three Complementary Dimensions Table */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#080c18]/90 border border-white/10 space-y-5">
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-300">
                Institutional Architecture · Public Environmental Consciousness
              </span>
              <h2 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl sm:text-3xl font-semibold text-white">
                Three Complementary Public Communication Platforms
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-white/15 text-[11px] font-mono uppercase tracking-wider text-amber-200/85">
                    <th className="py-3 pr-4">Platform</th>
                    <th className="py-3 px-4">Communication Medium</th>
                    <th className="py-3 px-4">Primary Contributors</th>
                    <th className="py-3 pl-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {KEW_COMMUNICATION_PLATFORMS.map((row) => (
                    <tr key={row.id} className="hover:bg-white/[0.02]">
                      <td className="py-3.5 pr-4 font-semibold text-white">
                        {row.href ? (
                          <Link href={row.href} className="hover:text-amber-200 transition-colors">
                            {row.platform}
                          </Link>
                        ) : (
                          row.platform
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">{row.medium}</td>
                      <td className="py-3.5 px-4 text-slate-300">{row.primaryContributors}</td>
                      <td className="py-3.5 pl-4 text-right font-mono text-[11px] text-amber-200/85">
                        {row.statusLabel}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SufiPulse USA × KEW Non-Commercial Collaboration Charter */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#080c18]/90 border border-amber-300/25 space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-300">
                Non-Commercial Institutional Charter
              </span>
              <h2 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl sm:text-3xl font-semibold text-white">
                {ECOVOICES_COLLABORATION_FRAMEWORK.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {ECOVOICES_COLLABORATION_FRAMEWORK.institutionalBoundary}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-black/50 border border-amber-300/20 space-y-3">
                <div className="flex items-center gap-2 text-amber-200 font-semibold text-sm">
                  <Award className="w-4 h-4 text-amber-300" />
                  <span>{ECOVOICES_COLLABORATION_FRAMEWORK.sufiPulseRole.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {ECOVOICES_COLLABORATION_FRAMEWORK.sufiPulseRole.description}
                </p>
                <ul className="space-y-1.5 text-[11px] text-slate-400 pt-2 border-t border-white/10">
                  {ECOVOICES_COLLABORATION_FRAMEWORK.sufiPulseRole.responsibilities.map(
                    (resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-black/50 border border-emerald-400/20 space-y-3">
                <div className="flex items-center gap-2 text-emerald-200 font-semibold text-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>{ECOVOICES_COLLABORATION_FRAMEWORK.ecoWatchRole.title}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {ECOVOICES_COLLABORATION_FRAMEWORK.ecoWatchRole.description}
                </p>
                <ul className="space-y-1.5 text-[11px] text-slate-400 pt-2 border-t border-white/10">
                  {ECOVOICES_COLLABORATION_FRAMEWORK.ecoWatchRole.responsibilities.map(
                    (resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Beyond EcoVoices Partner Initiatives */}
          <div className="space-y-6 pt-4">
            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-300/85">
                Affiliated Cultural &amp; Intellectual Initiatives
              </span>
              <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl sm:text-3xl font-semibold text-white">
                Beyond EcoVoices: Music, Knowledge &amp; Human Understanding
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  title: 'SufiPulse USA',
                  badge: 'Sacred Music & Kalam',
                  desc: 'Original Sufi music, mystical kalam, poetry and contemplative storytelling connecting spiritual heritage with contemporary creative expression.',
                  href: 'https://www.sufipulse.com/',
                  cta: 'Explore SufiPulse',
                  icon: Music,
                },
                {
                  title: 'SufiPulse on YouTube',
                  badge: 'Official Channel',
                  desc: 'Weekly kalam and sacred music releases. Explore original compositions, spiritual poetry and environmental music from SufiPulse USA.',
                  href: 'https://www.youtube.com/channel/UCraDr3i5A3k0j7typ6tOOsQ?sub_confirmation=1',
                  cta: 'Subscribe on YouTube',
                  icon: Play,
                },
                {
                  title: 'NextGEN Sufi Seeker',
                  badge: 'Ethics & Science',
                  desc: 'Connecting Sufi philosophy, ethical inquiry and consciousness studies with science, environmental stewardship and governance.',
                  href: 'https://sufisciencecenter.info/nextgen-sufi-seeker',
                  cta: 'Explore NextGEN',
                  icon: Compass,
                },
                {
                  title: 'Interfaith Peace Bridge',
                  badge: 'Interfaith Harmony',
                  desc: 'Promoting understanding across faith traditions through dialogue, compassion, shared human values and inclusive ethical stewardship.',
                  href: 'https://ifpb.sufisciencecenter.info/',
                  cta: 'Explore Peace Bridge',
                  icon: Users,
                },
              ].map((partner) => {
                const Icon = partner.icon;
                return (
                  <div
                    key={partner.title}
                    className="p-5 rounded-2xl bg-[#080c18]/85 border border-white/10 hover:border-amber-300/35 flex flex-col justify-between space-y-4 transition-all"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-9 h-9 rounded-xl bg-amber-300/10 border border-amber-300/25 flex items-center justify-center text-amber-200">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/[0.04] text-amber-200/85 border border-white/10">
                          {partner.badge}
                        </span>
                      </div>
                      <h4 className="font-[family-name:var(--font-ecovoices-serif)] text-xl font-semibold text-white">
                        {partner.title}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{partner.desc}</p>
                    </div>
                    <a
                      href={partner.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.06] hover:bg-amber-300 hover:text-slate-950 text-amber-100 font-semibold text-xs transition-colors"
                    >
                      <span>{partner.cta}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
