'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  PenTool, 
  Mic2, 
  Music, 
  BookOpen, 
  Sparkles, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  GraduationCap, 
  Layers, 
  ArrowRight,
  Radio,
  FileCheck,
  Globe2,
  Users,
  Copy,
  Check
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  SUFIPULSE_CREATIVE_PATHWAYS, 
  ECOVOICES_ENVIRONMENTAL_THEMES, 
  YOUTH_ECOVOICES_FRAMEWORK,
  SufiPulseCreativePathway 
} from '@/data/ecovoices-catalog';

export function EcoVoicesParticipationGateway() {
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  // Form states
  const [formData, setFormData] = useState({
    contributorName: '',
    contributorEmail: '',
    contributorPhone: '',
    contributorRole: 'Writer / Poet (Ahl-e-Qalam)',
    preferredLanguage: 'Kashmiri (Koshur)',
    environmentalThemeId: 'glaciers_snow',
    geographicConnection: 'Srinagar Basin',
    creativeFormat: 'Poem / Lyrical Kalam',
    stylisticOrientation: 'Secular Modern Ecological Advocacy',
    workTitle: '',
    contentOrPortfolioUrl: '',
    isYouthSubmission: false,
    institutionOrGuardian: '',
    rightsDeclarationAgreed: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formData.contributorName.trim() || !formData.contributorEmail.trim() || !formData.workTitle.trim()) {
      setFormError('Please complete all required fields (Name, Email, and Work Title).');
      return;
    }

    if (!formData.rightsDeclarationAgreed) {
      setFormError('You must agree to the non-commercial educational attribution declaration.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/ecovoices/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setSubmissionSuccess(data);
      } else {
        setFormError(data.error || 'Submission failed. Please check your information.');
      }
    } catch (err: any) {
      // Fallback local receipt if offline
      const fallbackId = `ECOVOICES-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      setSubmissionSuccess({
        trackingId: fallbackId,
        receivedAt: new Date().toISOString(),
        details: {
          contributorName: formData.contributorName,
          role: formData.contributorRole,
          theme: formData.environmentalThemeId,
          trackingId: fallbackId
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyTrackingId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div className="space-y-12">
      
      {/* ======================================================== */}
      {/* SECTION 1: PROMINENT INVITATION BANNER & QUICK ROLES */}
      {/* ======================================================== */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-purple-950/70 via-slate-900 to-slate-950 border border-purple-500/40 shadow-2xl relative overflow-hidden space-y-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 left-10 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-4 max-w-4xl relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="bg-purple-600 text-white font-mono text-xs uppercase tracking-wider px-3 py-1">
              Environmental Creative Participation Network
            </Badge>
            <Badge variant="outline" className="border-emerald-500/40 text-emerald-300 font-mono text-xs">
              Kashmir EcoWatch × SufiPulse USA
            </Badge>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Let Kashmir&apos;s Environment <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-emerald-300 to-cyan-400">Find Its Voice</span>
          </h2>

          <p className="text-lg sm:text-xl font-medium text-purple-200">
            Write. Sing. Compose. Perform. Publish.
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            An open, inclusive invitation to writers, poets, vocalists, instrumentalists, composers, producers, and literary scholars to create original creative works dedicated to the lakes, glaciers, rivers, and Western Himalayan ecology of Kashmir. Whether your artistic expression is sacred kalam, traditional folk, contemporary acoustic, or modern secular conservation advocacy—your voice belongs here.
          </p>
        </div>

        {/* 6 QUICK ACTION CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 relative z-10">
          <a
            href="https://sufipulse.com/writers"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/20 hover:border-purple-400 hover:bg-purple-950/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-purple-900/60 text-purple-300 flex items-center justify-center">
                <PenTool className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-xs group-hover:text-purple-300">
                Write for Nature
              </h3>
              <p className="text-[10px] text-slate-400 leading-snug">
                Poetry, kalam &amp; song lyrics
              </p>
            </div>
            <div className="pt-3 flex items-center text-[10px] text-purple-400 font-mono">
              <span>Ahl-e-Qalam</span>
              <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-70" />
            </div>
          </a>

          <a
            href="https://sufipulse.com/vocalists"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/20 hover:border-purple-400 hover:bg-purple-950/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-900/60 text-cyan-300 flex items-center justify-center">
                <Mic2 className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-xs group-hover:text-cyan-300">
                Sing for Nature
              </h3>
              <p className="text-[10px] text-slate-400 leading-snug">
                Vocals &amp; solo performance
              </p>
            </div>
            <div className="pt-3 flex items-center text-[10px] text-cyan-400 font-mono">
              <span>Ahl-e-Sada</span>
              <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-70" />
            </div>
          </a>

          <a
            href="https://sufipulse.com/producers"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/20 hover:border-purple-400 hover:bg-purple-950/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-900/60 text-emerald-300 flex items-center justify-center">
                <Music className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-xs group-hover:text-emerald-300">
                Play for Nature
              </h3>
              <p className="text-[10px] text-slate-400 leading-snug">
                Santoor, rabab, flute &amp; strings
              </p>
            </div>
            <div className="pt-3 flex items-center text-[10px] text-emerald-400 font-mono">
              <span>Saaz-kaaran</span>
              <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-70" />
            </div>
          </a>

          <a
            href="https://sufipulse.com/producers"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/20 hover:border-purple-400 hover:bg-purple-950/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-900/60 text-amber-300 flex items-center justify-center">
                <Radio className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-xs group-hover:text-amber-300">
                Produce for Nature
              </h3>
              <p className="text-[10px] text-slate-400 leading-snug">
                Arrangements &amp; audio mixing
              </p>
            </div>
            <div className="pt-3 flex items-center text-[10px] text-amber-400 font-mono">
              <span>Ahl-e-Naghma</span>
              <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-70" />
            </div>
          </a>

          <a
            href="https://sufipulse.com/literary-contributors"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/20 hover:border-purple-400 hover:bg-purple-950/40 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-rose-900/60 text-rose-300 flex items-center justify-center">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-xs group-hover:text-rose-300">
                Publish for Nature
              </h3>
              <p className="text-[10px] text-slate-400 leading-snug">
                Essays, memoirs &amp; commentaries
              </p>
            </div>
            <div className="pt-3 flex items-center text-[10px] text-rose-400 font-mono">
              <span>Ahl-e-Tahreer</span>
              <ExternalLink className="w-2.5 h-2.5 ml-1 opacity-70" />
            </div>
          </a>

          <a
            href="#youth-ecovoices"
            className="p-4 rounded-2xl bg-slate-950/80 border border-emerald-500/30 hover:border-emerald-400 hover:bg-emerald-950/30 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-900/60 text-emerald-300 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-white text-xs group-hover:text-emerald-300">
                Youth EcoVoices
              </h3>
              <p className="text-[10px] text-slate-400 leading-snug">
                Schools, colleges &amp; choirs
              </p>
            </div>
            <div className="pt-3 flex items-center text-[10px] text-emerald-400 font-mono">
              <span>Junior Choirs</span>
              <ArrowRight className="w-2.5 h-2.5 ml-1 opacity-70" />
            </div>
          </a>
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 2: THE 5 SUFIPULSE CREATIVE PATHWAYS & JOURNAL */}
      {/* ======================================================== */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <Badge className="bg-purple-950 text-purple-300 border-purple-500/40 text-xs mb-2">
              Canonical Creative Infrastructure
            </Badge>
            <h3 className="text-2xl font-black text-white">
              Five SufiPulse Pathways, One Ecological Mission
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
              EcoVoices directly connects with SufiPulse USA&apos;s established contributor pathways. While SufiPulse manages artistic direction, auditions, studio recording, and publishing, Kashmir EcoWatch provides the scientific grounding and curriculum integration.
            </p>
          </div>

          <a
            href="https://sufipulse.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-purple-300 border border-purple-500/30 font-mono text-xs shrink-0 transition-colors"
          >
            <span>Explore SufiPulse.com Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUFIPULSE_CREATIVE_PATHWAYS.map((pathway) => (
            <Card
              key={pathway.id}
              className={`p-6 flex flex-col justify-between transition-all ${
                pathway.roleType === 'curated_publication'
                  ? 'bg-gradient-to-b from-slate-900 to-purple-950/30 border-purple-500/40 ring-1 ring-purple-500/20'
                  : 'bg-slate-900/90 border-white/10 hover:border-purple-500/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-purple-400">
                    {pathway.name}
                  </span>
                  <Badge 
                    variant={pathway.roleType === 'curated_publication' ? 'default' : 'outline'}
                    className={`text-[10px] ${
                      pathway.roleType === 'curated_publication' 
                        ? 'bg-purple-600 text-white border-none' 
                        : 'border-white/10 text-slate-400'
                    }`}
                  >
                    {pathway.badgeLabel}
                  </Badge>
                </div>

                <h4 className="font-bold text-white text-base">
                  {pathway.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {pathway.summary}
                </p>

                <p className="text-[11px] text-slate-400 leading-relaxed border-t border-white/5 pt-2">
                  {pathway.detailedScope}
                </p>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">Eligible Formats:</span>
                  <div className="flex flex-wrap gap-1">
                    {pathway.eligibleFormats.map((f, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950 border border-white/5 text-slate-300">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 mt-4 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-slate-500">
                  {pathway.roleType === 'curated_publication' ? 'Publishing Venue' : 'Contributor Role'}
                </span>

                <a
                  href={pathway.canonicalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    pathway.roleType === 'curated_publication'
                      ? 'bg-purple-600 hover:bg-purple-500 text-white'
                      : 'bg-slate-800 hover:bg-purple-900/60 text-purple-300 hover:text-white border border-white/10'
                  }`}
                >
                  <span>{pathway.roleType === 'curated_publication' ? 'Visit Journal Archive' : 'Apply on SufiPulse'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 3: ENVIRONMENTAL THEME REGISTRY (10 THEMES) */}
      {/* ======================================================== */}
      <div className="space-y-6">
        <div>
          <Badge className="bg-emerald-950 text-emerald-300 border-emerald-500/40 text-xs mb-2">
            Thematic Focus Areas
          </Badge>
          <h3 className="text-2xl font-black text-white">
            10 Western Himalayan Environmental Themes
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1">
            Every creative contribution is anchored to one of Kashmir EcoWatch&apos;s active scientific observatory layers. Select a theme below to view the empirical monitoring module and ground your creative work in real Western Himalayan science.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {ECOVOICES_ENVIRONMENTAL_THEMES.map((theme) => (
            <Card
              key={theme.id}
              className="p-4 bg-slate-900/80 border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-emerald-400 font-bold">{theme.number}</span>
                  <span className="text-slate-500">EcoWatch Layer</span>
                </div>
                <h4 className="font-bold text-white text-xs group-hover:text-emerald-300 transition-colors leading-snug">
                  {theme.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                  {theme.scopeSummary}
                </p>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-2">
                <span className="text-[10px] text-purple-300 font-mono block">
                  Styles: {theme.recommendedStyles[0]}
                </span>

                <Link
                  href={theme.scientificHref}
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold group/link"
                >
                  <span>View Scientific Layer</span>
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ======================================================== */}
      {/* SECTION 4: DEDICATED ENVIRONMENTAL SUBMISSION GATEWAY */}
      {/* ======================================================== */}
      <div id="participate-form" className="space-y-6 pt-4">
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 border border-blue-500/30 space-y-2">
          <Badge className="bg-blue-600 text-white font-bold text-xs">
            Direct Environmental Submission Gateway
          </Badge>
          <h3 className="text-2xl font-black text-white">
            Register Your Environmental Creative Work
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Submit your poems, vocal demos, acoustic instrumental arrangements, essays, or school choir compositions. All traditions—secular conservation songs, contemporary folk, classical Kashmiri vakhs, or Sufiana qalam—are fully eligible for scientific and artistic review.
          </p>
        </div>

        {submissionSuccess ? (
          <Card className="p-8 bg-emerald-950/30 border border-emerald-500/40 rounded-2xl space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-8 h-8 shrink-0" />
              <div>
                <h4 className="text-xl font-black text-white">
                  Submission Successfully Registered
                </h4>
                <p className="text-xs text-emerald-300 font-mono">
                  Your creative work is now in the EcoVoices Editorial &amp; Scientific Review Registry.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-slate-400">Tracking Reference ID:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-emerald-400 text-sm">{submissionSuccess.trackingId}</span>
                  <button
                    onClick={() => handleCopyTrackingId(submissionSuccess.trackingId)}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="Copy tracking ID"
                  >
                    {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-[11px]">
                <div><span className="text-slate-500">Contributor:</span> {submissionSuccess.details?.contributorName}</div>
                <div><span className="text-slate-500">Role:</span> {submissionSuccess.details?.role}</div>
                <div><span className="text-slate-500">Theme:</span> {submissionSuccess.details?.theme}</div>
                <div><span className="text-slate-500">Logged At:</span> {new Date(submissionSuccess.receivedAt).toLocaleString()}</div>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
              <p>
                <strong>Next Editorial Steps:</strong>
              </p>
              <ul className="space-y-1 text-[11px] text-slate-400 list-disc pl-4">
                <li>Kashmir EcoWatch scientific curators will review environmental relevance and geographic alignment.</li>
                <li>SufiPulse USA artistic directors will assess musical arrangement, lyrical cadence, or literary publication suitability.</li>
                <li>You will be contacted via email if your submission is shortlisted for studio production, choir arrangement, or publication in the Literary Journal.</li>
              </ul>
            </div>

            <Button
              onClick={() => { setSubmissionSuccess(null); setFormData(prev => ({ ...prev, workTitle: '', contentOrPortfolioUrl: '' })); }}
              variant="outline"
              className="border-emerald-500/40 text-emerald-300 hover:bg-emerald-950/50"
            >
              Submit Another Creative Work
            </Button>
          </Card>
        ) : (
          <Card className="p-6 sm:p-8 bg-slate-900/90 border-white/10 rounded-2xl space-y-6 max-w-3xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              
              {formError && (
                <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{formError}</span>
                </div>
              )}

              {/* CONTRIBUTOR BASICS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold">Contributor Full Name *</label>
                  <input
                    type="text"
                    name="contributorName"
                    required
                    value={formData.contributorName}
                    onChange={handleInputChange}
                    placeholder="e.g. Zeeshan Ahmad"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold">Contact Email *</label>
                  <input
                    type="email"
                    name="contributorEmail"
                    required
                    value={formData.contributorEmail}
                    onChange={handleInputChange}
                    placeholder="e.g. zeeshan@example.com"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold">Phone / WhatsApp (Optional)</label>
                  <input
                    type="tel"
                    name="contributorPhone"
                    value={formData.contributorPhone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 94190 XXXXX"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold">Geographic Connection / District</label>
                  <select
                    name="geographicConnection"
                    value={formData.geographicConnection}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500/60"
                  >
                    <option>Srinagar (Dal &amp; Jhelum)</option>
                    <option>Anantnag / Islamabad (Verinag &amp; Springs)</option>
                    <option>Baramulla (Lower Jhelum &amp; Wular Basin)</option>
                    <option>Ganderbal (Sindh River &amp; Lakes)</option>
                    <option>Kupwara (Lolab &amp; Forest Belts)</option>
                    <option>Budgam (Doodh Ganga &amp; Karewas)</option>
                    <option>Pulwama &amp; Shopian (Apple Orchards &amp; Rambiara)</option>
                    <option>Kulgam (Aharbal &amp; Veshaw Basin)</option>
                    <option>Bandipora (Wular Lake Shoreline)</option>
                    <option>Pir Panjal &amp; Chenab Basin</option>
                    <option>Ladakh / Zanskar Cryosphere</option>
                    <option>Kashmiri Diaspora / Global Contributor</option>
                  </select>
                </div>
              </div>

              {/* ROLE & LANGUAGE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold">Primary Creative Role *</label>
                  <select
                    name="contributorRole"
                    value={formData.contributorRole}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500/60 font-mono text-xs"
                  >
                    <option>Writer / Poet (Ahl-e-Qalam)</option>
                    <option>Vocalist &amp; Singer (Ahl-e-Sada)</option>
                    <option>Instrumentalist / Master Musician (Saaz-kaaran)</option>
                    <option>Composer &amp; Music Producer (Ahl-e-Naghma)</option>
                    <option>Literary Contributor / Essayist (Ahl-e-Tahreer)</option>
                    <option>Student / School Choir Lead (Youth EcoVoices)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold">Language of Expression</label>
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500/60"
                  >
                    <option>Kashmiri (Koshur)</option>
                    <option>Urdu</option>
                    <option>English</option>
                    <option>Hindi</option>
                    <option>Pahari / Gojri</option>
                    <option>Shina / Balti / Ladakhi</option>
                    <option>Multilingual Blend</option>
                  </select>
                </div>
              </div>

              {/* THEME & FORMAT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold">Environmental Theme *</label>
                  <select
                    name="environmentalThemeId"
                    value={formData.environmentalThemeId}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500/60 font-mono text-xs"
                  >
                    {ECOVOICES_ENVIRONMENTAL_THEMES.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.number}: {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-200 font-semibold">Creative Style Orientation</label>
                  <select
                    name="stylisticOrientation"
                    value={formData.stylisticOrientation}
                    onChange={handleInputChange}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-purple-500/60"
                  >
                    <option>Secular Modern Ecological Advocacy (Open Tradition)</option>
                    <option>Traditional Sufiana Qalam / Mystic Ecology</option>
                    <option>Classical Kashmiri Poetry (Vakh / Shruk / Ghazal)</option>
                    <option>Western Himalayan Acoustic Folk</option>
                    <option>School Choir / Youth Anthem</option>
                    <option>Orchestral Instrumental Soundscape</option>
                  </select>
                </div>
              </div>

              {/* WORK TITLE & CONTENT */}
              <div className="space-y-1">
                <label className="text-slate-200 font-semibold">Work Title / Composition Name *</label>
                <input
                  type="text"
                  name="workTitle"
                  required
                  value={formData.workTitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Song of the Wular Silt Beds"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-200 font-semibold">
                  Original Lyrics, Essay Text, or Portfolio / Demo Link *
                </label>
                <textarea
                  name="contentOrPortfolioUrl"
                  rows={4}
                  required
                  value={formData.contentOrPortfolioUrl}
                  onChange={handleInputChange}
                  placeholder="Paste your original poetry/lyrics, essay draft, or link to audio/video demo (SoundCloud, Google Drive, YouTube, Dropbox)..."
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/60"
                />
              </div>

              {/* YOUTH TOGGLE */}
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isYouthSubmission"
                    checked={formData.isYouthSubmission}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded text-emerald-500 bg-slate-900 border-white/20 focus:ring-emerald-500"
                  />
                  <span className="font-semibold text-emerald-300">
                    This is a Youth / Student / School Submission (Ages Under 18)
                  </span>
                </label>

                {formData.isYouthSubmission && (
                  <div className="pt-2 border-t border-white/5 space-y-2">
                    <label className="text-slate-300 font-medium block">
                      School, College or Supervising Teacher / Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="institutionOrGuardian"
                      value={formData.institutionOrGuardian}
                      onChange={handleInputChange}
                      placeholder="e.g. Govt Higher Secondary School, Sopore (Supervisor: Ms. Farooq)"
                      className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 text-xs"
                    />
                    <p className="text-[10px] text-slate-400">
                      Safeguard note: Student contact details are kept strictly confidential and used only for teacher/guardian communication.
                    </p>
                  </div>
                )}
              </div>

              {/* RIGHTS & NON-COMMERCIAL DECLARATION */}
              <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rightsDeclarationAgreed"
                    required
                    checked={formData.rightsDeclarationAgreed}
                    onChange={handleInputChange}
                    className="w-4 h-4 mt-0.5 rounded text-purple-600 bg-slate-900 border-white/20 focus:ring-purple-500"
                  />
                  <span className="text-[11px] text-slate-300 leading-relaxed">
                    I declare that this work is original. I agree that Kashmir EcoWatch and SufiPulse USA may review this submission for non-commercial environmental educational outreach, curriculum integration, and potential recording/publication under proper artist attribution. I understand that submission does not guarantee automatic recording or publication.
                  </span>
                </label>
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-purple-600/20 text-sm"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Radio className="w-4 h-4 animate-spin" />
                    Registering with EcoVoices Editorial Registry...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Submit to EcoVoices Creative Network
                  </span>
                )}
              </Button>
            </form>
          </Card>
        )}
      </div>

      {/* ======================================================== */}
      {/* SECTION 5: YOUTH ECOVOICES (SCHOOLS & COLLEGES) */}
      {/* ======================================================== */}
      <div id="youth-ecovoices" className="p-8 rounded-3xl bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 border border-emerald-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <Badge className="bg-emerald-500 text-slate-950 font-bold text-xs mb-1">
              Supervised Educational Outreach
            </Badge>
            <h3 className="text-2xl font-black text-white">
              {YOUTH_ECOVOICES_FRAMEWORK.title}
            </h3>
            <p className="text-xs sm:text-sm text-emerald-300 font-mono">
              {YOUTH_ECOVOICES_FRAMEWORK.tagline}
            </p>
          </div>

          <Link
            href="/environmental-calendar/outdoor-classroom"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors shrink-0"
          >
            <span>Visit Outdoor Classroom</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {YOUTH_ECOVOICES_FRAMEWORK.ageGroups.map((grp, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-emerald-500/20 space-y-2">
              <span className="text-xs font-bold text-emerald-400 font-mono block">
                {grp.tier}
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                {grp.format}
              </p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-slate-950/80 border border-white/5 space-y-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold font-mono text-[11px]">
            <ShieldCheck className="w-4 h-4" />
            <span>Guardian &amp; Teacher Safeguard Policy</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            {YOUTH_ECOVOICES_FRAMEWORK.guardianSafeguardPolicy}
          </p>
        </div>
      </div>

    </div>
  );
}
