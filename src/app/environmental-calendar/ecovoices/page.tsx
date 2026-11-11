'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Music, 
  Compass, 
  BookOpen, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Calendar, 
  Droplet, 
  Trees, 
  Mountain, 
  ArrowRight, 
  Search, 
  Filter, 
  Radio, 
  FileText, 
  Users, 
  Send, 
  CheckCircle2, 
  Info,
  Layers,
  GraduationCap,
  PenTool,
  Mic2
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Heading } from '@/components/common/Heading';
import { OutdoorClassroomNav } from '@/components/outdoor-classroom/OutdoorClassroomNav';
import { 
  ECOVOICES_RELEASES, 
  ECOVOICES_THEME_CATEGORIES, 
  ECOVOICES_COLLABORATION_FRAMEWORK,
  EcoVoiceRelease 
} from '@/data/ecovoices-catalog';
import { EcoVoiceAudioPlayer } from '@/components/ecovoices/EcoVoiceAudioPlayer';
import { EcoVoicesParticipationGateway } from '@/components/ecovoices/EcoVoicesParticipationGateway';

export default function EcoVoicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'participate' | 'library' | 'classroom' | 'poetry' | 'collaboration'>('participate');

  // Filtered releases
  const filteredReleases = useMemo(() => {
    return ECOVOICES_RELEASES.filter((release) => {
      const matchesCategory = selectedCategory === 'all' || release.themeCategory === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        release.title.toLowerCase().includes(q) || 
        release.primaryTheme.toLowerCase().includes(q) ||
        release.language.toLowerCase().includes(q) ||
        release.instrumentsUsed.some(i => i.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const heroReleases = ECOVOICES_RELEASES.slice(0, 3);
  const currentHero = heroReleases[activeHeroIdx] || heroReleases[0];

  const heroShowcaseCard = currentHero ? (
    <div className="relative rounded-2xl overflow-hidden border border-purple-500/40 shadow-2xl shadow-purple-950/60 bg-slate-900/80 backdrop-blur-md p-3">
      {/* Top Banner Tag */}
      <div className="flex items-center justify-between px-1 py-1 mb-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="font-bold text-purple-300 uppercase tracking-wider text-[11px]">
            SufiPulse Official Audio
          </span>
        </div>
        <span className="text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
          {currentHero.catalogCode} • {currentHero.duration}
        </span>
      </div>

      {/* Main Image Frame */}
      <div className="relative h-44 sm:h-48 w-full rounded-xl overflow-hidden border border-white/10 group mb-3">
        <img
          key={currentHero.id}
          src={currentHero.coverImage}
          alt={currentHero.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
        
        <div className="absolute bottom-2.5 left-3 right-3">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
              {currentHero.language}
            </span>
            <span className="text-[10px] text-slate-300">
              {currentHero.environmentalTheme}
            </span>
          </div>
          <h4 className="text-sm font-bold text-white drop-shadow-md leading-tight">
            {currentHero.title}
          </h4>
          <p className="text-[10px] text-purple-200 line-clamp-1 mt-0.5">
            {currentHero.subtitle}
          </p>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="grid grid-cols-3 gap-1.5 pt-1 border-t border-white/10">
        {heroReleases.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveHeroIdx(idx)}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-lg border transition-all text-left cursor-pointer ${
              activeHeroIdx === idx
                ? 'bg-purple-500/20 border-purple-500/60 shadow-sm'
                : 'bg-white/5 border-white/5 hover:bg-white/10'
            }`}
          >
            <div className="h-9 w-full rounded overflow-hidden relative">
              <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
            </div>
            <span
              className={`text-[9px] font-bold break-words w-full text-center ${
                activeHeroIdx === idx ? 'text-purple-300' : 'text-slate-400'
              }`}
            >
              {item.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 pb-20 relative">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-emerald-600/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl" />
      </div>

      {/* Canonical Institutional Hero Section */}
      <Heading
        label="Kashmir EcoWatch × SufiPulse USA · Environmental Music & Cultural Stewardship"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Environmental Calendar', href: '/environmental-calendar' },
          { label: 'EcoVoices Music' }
        ]}
        icon={<Music className="w-6 h-6 text-purple-400" />}
        title={
          <div className="overflow-visible pb-2">
            <div className="flex items-center gap-3 sm:gap-4 leading-[1.15] pb-2">
              <span className="inline-flex items-center self-center bg-purple-600 text-white font-black uppercase tracking-widest rounded-md px-2.5 py-1 text-xs sm:text-sm shadow-sm">
                ECOVOICES
              </span>
              <span className="text-white">Western Himalayan</span>
            </div>
            <div className="leading-[1.15] overflow-visible pr-8">
              <span className="inline-block bg-gradient-to-r from-purple-400 via-pink-300 to-amber-300 bg-clip-text text-transparent pr-6 tracking-normal">
                Environmental Music &amp; Cultural Stewardship
              </span>
            </div>
          </div>
        }
        subtitle="Where empirical telemetry meets poetry, spiritual kalam, and environmental consciousness. An open collaborative platform inviting writers, singers, instrumentalists, and composers to give voice to Kashmir's ecosystems in partnership with SufiPulse USA."
        images={[
          '/images/protected-network.png',
          '/images/bear.png',
          '/images/markhor.png',
          '/images/tiger.png'
        ]}
        rightContent={heroShowcaseCard}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={() => setActiveTab('participate')}
              size="sm"
              className={`${activeTab === 'participate' ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-600/30' : 'bg-purple-600 hover:bg-purple-500 text-white'} font-bold`}
            >
              <PenTool className="w-4 h-4 mr-1.5" />
              Become a Contributor
            </Button>
            <Button
              onClick={() => setActiveTab('library')}
              size="sm"
              variant="outline"
              className={`${activeTab === 'library' ? 'bg-purple-950/80 border-purple-500 text-purple-300' : 'border-white/20 text-slate-300 hover:bg-white/5'} font-bold`}
            >
              <Music className="w-4 h-4 mr-1.5" />
              Explore Music ({ECOVOICES_RELEASES.length})
            </Button>
            <a
              href="https://sufipulse.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-950/50 hover:bg-purple-900/60 text-purple-300 border border-purple-500/30 text-xs font-semibold transition-colors"
            >
              <span>SufiPulse USA</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        }
      />

      {/* Persistent Module Navigation */}
      <OutdoorClassroomNav />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 space-y-10 max-w-7xl">
        
        {/* INSTITUTIONAL ROLES & FRAMEWORK STRIP */}
        <section className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-500/30 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4" />
              <span>Distinct Institutional Roles: Kashmir EcoWatch × SufiPulse USA</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-purple-500/20 space-y-1">
                <div className="flex items-center justify-between text-purple-300 font-semibold">
                  <span>SufiPulse USA</span>
                  <Badge variant="outline" className="text-[10px] border-purple-500/40 text-purple-300">Publisher</Badge>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Canonical music publisher, composer, and rights holder. Manages recordings, sacred kalam, sound engineering, and artistic copyrights.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-emerald-500/20 space-y-1">
                <div className="flex items-center justify-between text-emerald-300 font-semibold">
                  <span>Kashmir EcoWatch</span>
                  <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-300">Scientific &amp; Educational Platform</Badge>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Scientific context provider, educational curation host, Outdoor Classroom connector, and ecological theme guidance platform.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WORKSPACE NAVIGATION TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 text-xs font-medium scrollbar-thin">
          <button
            onClick={() => setActiveTab('participate')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'participate'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold shadow-lg shadow-purple-600/30 ring-1 ring-white/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <PenTool className="w-4 h-4 text-purple-300" />
            <span>Creative Participation Network</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-900 text-purple-200 border border-purple-400/30">Open</span>
          </button>

          <button
            onClick={() => setActiveTab('library')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'library'
                ? 'bg-purple-600 text-white font-bold shadow-lg shadow-purple-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Music className="w-4 h-4" />
            <span>Environmental Song Library ({ECOVOICES_RELEASES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('classroom')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'classroom'
                ? 'bg-emerald-600 text-white font-bold shadow-lg shadow-emerald-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Outdoor Classroom Integration</span>
          </button>

          <button
            onClick={() => setActiveTab('poetry')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'poetry'
                ? 'bg-cyan-600 text-white font-bold shadow-lg shadow-cyan-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Ecological Kalam &amp; Poetry</span>
          </button>

          <button
            onClick={() => setActiveTab('collaboration')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'collaboration'
                ? 'bg-amber-600 text-white font-bold shadow-lg shadow-amber-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Collaboration Framework</span>
          </button>
        </div>

        {/* ======================================================== */}
        {/* TAB 1: CREATIVE PARTICIPATION NETWORK */}
        {/* ======================================================== */}
        {activeTab === 'participate' && (
          <EcoVoicesParticipationGateway />
        )}

        {/* ======================================================== */}
        {/* TAB 2: ENVIRONMENTAL SONG LIBRARY */}
        {/* ======================================================== */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            {/* SEARCH & CATEGORY FILTER BAR */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-white/10">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2">
                {ECOVOICES_THEME_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-white/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[240px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search song, theme, instruments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl pl-9 pr-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
                />
              </div>
            </div>

            {/* SONG CARDS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredReleases.map((release) => {
                return (
                  <Card
                    key={release.id}
                    className="p-6 bg-slate-900/90 border-white/10 hover:border-purple-500/40 transition-all space-y-5 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Top Header & Badges */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                              {release.catalogNumber}
                            </span>
                            <Badge className="bg-emerald-950/80 text-emerald-400 border-emerald-500/30 text-[10px]">
                              {release.language}
                            </Badge>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {release.durationFormatted}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white pt-1">
                            {release.title}
                          </h3>
                          <p className="text-xs text-purple-300 font-medium">
                            {release.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* REAL WORKING AUDIO PLAYER (NATIVE WEB AUDIO SYNTHESIS + SUFIPULSE MASTER LINK) */}
                      <EcoVoiceAudioPlayer release={release} variant="card" />

                      {/* POETIC EXCERPT */}
                      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-white/5 space-y-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                          Poetic Excerpt &amp; Kalam:
                        </span>
                        <p className="text-xs font-serif text-amber-200/90 whitespace-pre-line leading-relaxed italic">
                          {release.poeticExcerptOriginal}
                        </p>
                        <p className="text-[11px] text-slate-300 leading-snug border-t border-white/5 pt-1.5">
                          &ldquo;{release.poeticExcerptTranslation}&rdquo;
                        </p>
                      </div>

                      {/* ECOLOGICAL CONTEXT */}
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {release.ecologicalDossier}
                      </p>

                      {/* ASSOCIATED OBSERVANCES */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                          Linked Environmental Observances:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {release.observances.map((obs, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
                            >
                              {obs}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* LINKED SCIENTIFIC MODULES */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                          Related Kashmir EcoWatch Scientific Data:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {release.relatedScientificModules.slice(0, 2).map((mod, i) => (
                            <Link
                              key={i}
                              href={mod.href}
                              className="p-2 rounded-lg bg-slate-950 border border-white/5 hover:border-cyan-500/30 transition-colors text-left group"
                            >
                              <div className="text-[11px] font-bold text-slate-200 group-hover:text-cyan-300 flex items-center justify-between">
                                <span>{mod.title}</span>
                                <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-cyan-400" />
                              </div>
                              <div className="text-[9px] text-slate-500 font-mono mt-0.5">{mod.category}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* CARD FOOTER & LINKS */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                      <Link
                        href={`/environmental-calendar/ecovoices/song/${release.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors"
                      >
                        <span>Full Educational Dossier</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <a
                        href={release.canonicalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200 font-mono underline underline-offset-2"
                      >
                        <span>Canonical SufiPulse Release</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 2: OUTDOOR CLASSROOM INTEGRATION */}
        {/* ======================================================== */}
        {activeTab === 'classroom' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 space-y-3">
              <Badge className="bg-emerald-500 text-slate-950 font-bold text-xs">
                Pedagogical Field Science Framework
              </Badge>
              <h2 className="text-2xl font-black text-white">
                Connecting Music to Real Fieldwork Diagnostics
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                In Kashmir EcoWatch&apos;s Outdoor Classroom, music is not an isolated diversion; it is the affective gateway to scientific hypothesis testing. Every song in the EcoVoices library corresponds to a concrete Western Himalayan outdoor experiment, water sampling transect, or forest biometric survey.
              </p>
            </div>

            <div className="space-y-4">
              {ECOVOICES_RELEASES.map((release) => (
                <Card
                  key={release.id}
                  className="p-6 bg-slate-900/90 border-white/10 hover:border-emerald-500/30 transition-all space-y-4"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-white/10">
                    <div>
                      <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
                        Song Connection • {release.catalogNumber}
                      </span>
                      <h3 className="text-lg font-bold text-white">
                        {release.outdoorClassroomActivity.activityTitle}
                      </h3>
                      <span className="text-xs text-purple-300 font-serif italic">
                        Paired with: {release.title}
                      </span>
                    </div>

                    <Badge className="bg-emerald-950 text-emerald-300 border-emerald-500/30 text-xs shrink-0 self-start md:self-auto">
                      {release.outdoorClassroomActivity.recommendedTier}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase font-mono block">Field Hypothesis:</span>
                      <p className="text-slate-200 text-[11px] leading-relaxed">
                        {release.outdoorClassroomActivity.fieldHypothesis}
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase font-mono block">Duration &amp; Materials:</span>
                      <p className="text-emerald-300 font-semibold text-[11px]">
                        {release.outdoorClassroomActivity.duration}
                      </p>
                      <ul className="text-[10px] text-slate-400 space-y-0.5 pt-1">
                        {release.outdoorClassroomActivity.materialsNeeded.slice(0, 3).map((m, idx) => (
                          <li key={idx}>• {m}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-950 border border-white/5 space-y-1">
                      <span className="text-[10px] text-slate-500 uppercase font-mono block">Measurable Learning Outcome:</span>
                      <p className="text-cyan-300 text-[11px] leading-relaxed">
                        {release.outdoorClassroomActivity.measurableLearningOutcome}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950/70 border border-emerald-500/20 space-y-2">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Standardized Field Protocol:
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                      {release.outdoorClassroomActivity.fieldworkMethod}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <Link
                      href={release.outdoorClassroomActivity.curriculumLink}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Download Student Field Sheets in Curriculum Library</span>
                    </Link>

                    <Link
                      href={`/environmental-calendar/ecovoices/song/${release.slug}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition-colors"
                    >
                      <span>View Full Lesson Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 3: ECOLOGICAL KALAM & POETRY */}
        {/* ======================================================== */}
        {activeTab === 'poetry' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30 space-y-3">
              <Badge className="bg-cyan-500 text-slate-950 font-bold text-xs">
                Sacred Ecology &amp; Literary Heritage
              </Badge>
              <h2 className="text-2xl font-black text-white">
                The Poetic Voice of the Western Himalaya
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
                Kashmir possesses one of the world&apos;s richest traditions of eco-mystical poetry, spanning the 14th-century vakhs of Lalleshwari (Lal Ded), the shruks of Nund Rishi (Sheikh Noor-ud-Din Wali—who declared &apos;Ann Poshi Teli Yeli Van Poshi&apos; [Food will last as long as forests thrive]), and modern environmental laments.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ECOVOICES_RELEASES.map((release) => (
                <Card
                  key={release.id}
                  className="p-6 bg-slate-900/90 border-white/10 hover:border-cyan-500/30 transition-all space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-mono text-xs text-cyan-400 font-bold">
                      {release.kalamPoetOrSource}
                    </span>
                    <Badge variant="outline" className="text-[10px] text-slate-400 border-white/10">
                      {release.musicalStyle}
                    </Badge>
                  </div>

                  <h3 className="font-bold text-white text-base">
                    {release.title}
                  </h3>

                  <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/20 space-y-2">
                    <p className="text-sm font-serif text-amber-200 whitespace-pre-line leading-relaxed text-right dir-rtl font-arabic">
                      {release.poeticExcerptOriginal}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed border-t border-white/5 pt-2 italic">
                      &ldquo;{release.poeticExcerptTranslation}&rdquo;
                    </p>
                  </div>

                  <div className="text-xs text-slate-400 space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block">Traditional Instruments:</span>
                    <p className="text-slate-300">
                      {release.instrumentsUsed.join(' • ')}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TAB 4: COLLABORATION FRAMEWORK */}
        {/* ======================================================== */}
        {activeTab === 'collaboration' && (
          <div className="space-y-6">
            <Card className="p-8 bg-slate-900/90 border-purple-500/30 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block mb-1">
                  Institutional Charter &amp; Non-Commercial Collaboration
                </span>
                <h2 className="text-2xl font-black text-white">
                  {ECOVOICES_COLLABORATION_FRAMEWORK.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-3xl">
                  {ECOVOICES_COLLABORATION_FRAMEWORK.institutionalBoundary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* SufiPulse Role */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-purple-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
                    <Award className="w-4 h-4" />
                    <span>{ECOVOICES_COLLABORATION_FRAMEWORK.sufiPulseRole.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ECOVOICES_COLLABORATION_FRAMEWORK.sufiPulseRole.description}
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-slate-400 pt-2 border-t border-white/5">
                    {ECOVOICES_COLLABORATION_FRAMEWORK.sufiPulseRole.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3">
                    <a
                      href="https://sufipulse.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors"
                    >
                      <span>Visit sufipulse.com Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* EcoWatch Role */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{ECOVOICES_COLLABORATION_FRAMEWORK.ecoWatchRole.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ECOVOICES_COLLABORATION_FRAMEWORK.ecoWatchRole.description}
                  </p>
                  <ul className="space-y-1.5 text-[11px] text-slate-400 pt-2 border-t border-white/5">
                    {ECOVOICES_COLLABORATION_FRAMEWORK.ecoWatchRole.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3">
                    <Link
                      href="/environmental-calendar/outdoor-classroom"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors"
                    >
                      <span>Explore Outdoor Classroom Hub</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

      </div>
    </main>
  );
}
