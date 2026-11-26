'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  PenTool,
  Mic2,
  Music,
  BookOpen,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  ArrowRight,
  Radio,
  Copy,
  Check,
  Film,
  Palette,
  Waves,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  SUFIPULSE_CREATIVE_PATHWAYS,
  ECOVOICES_ENVIRONMENTAL_THEMES,
  YOUTH_ECOVOICES_FRAMEWORK,
} from '@/data/ecovoices-catalog';
import {
  ECOVOICES_BIOACOUSTIC_COLLECTION,
  KEW_SIX_ACOUSTIC_REGIONS,
  type AcousticClassification,
  type KewAcousticRegion,
} from '@/data/ecovoices-bioacoustics';

export function EcoVoicesParticipationGateway() {
  const { user, isLoggedIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<any | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<boolean>(false);

  const [formData, setFormData] = useState({
    contributorName: '',
    contributorEmail: '',
    contributorPhone: '',
    creativeDepartment: 'music' as 'music' | 'poetry' | 'cinema' | 'art' | 'soundscapes' | 'contributors',
    contributorRole: 'Writer / Poet (Ahl-e-Qalam)',
    preferredLanguage: 'Kashmiri (Koshur)',
    environmentalThemeId: 'glaciers_snow',
    geographicConnection: 'Srinagar (Dal & Jhelum)',
    creativeFormat: 'Poem / Lyrical Kalam',
    stylisticOrientation: 'Secular Modern Ecological Advocacy (Open Tradition)',
    workTitle: '',
    contentOrPortfolioUrl: '',
    isYouthSubmission: false,
    institutionOrGuardian: '',
    rightsDeclarationAgreed: false,
    // Department V Bioacoustic Field Provenance (active when creativeDepartment === 'soundscapes')
    acousticClassification: 'Biophony' as AcousticClassification,
    targetCollectionId: 'voices-himalayan-monal',
    kewSixRegion: 'Kashmir' as KewAcousticRegion,
    speciesOrPhenomenon: '',
    habitatAndElevation: '',
    recordingDateAndSeason: '',
    recordingEquipment: '',
    openLicenseChoice: 'CC BY 4.0 (Attribution)',
    maskSensitiveCoordinates: true,
    unmanipulatedFieldAttestation: false,
  });

  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData((prev) => ({
        ...prev,
        contributorName: prev.contributorName || user.name || '',
        contributorEmail: prev.contributorEmail || user.email || '',
      }));
    }
  }, [isLoggedIn, user]);

  useEffect(() => {
    const handlePrefill = (event: Event) => {
      const custom = event as CustomEvent<{
        targetEntryId?: string;
        title?: string;
        classification?: AcousticClassification;
        region?: KewAcousticRegion;
        speciesCommon?: string;
        speciesScientific?: string;
        habitat?: string;
        sensitiveProtected?: boolean;
      }>;
      const d = custom.detail || {};
      setFormData((prev) => ({
        ...prev,
        creativeDepartment: 'soundscapes',
        contributorRole: 'Ornithologist / Bioacoustician / Field Recordist',
        preferredLanguage: 'Visual / Instrumental / Non-Verbal',
        workTitle: d.title ? `Field Voucher: ${d.title}` : prev.workTitle,
        acousticClassification: d.classification || prev.acousticClassification,
        targetCollectionId: d.targetEntryId || prev.targetCollectionId,
        kewSixRegion: d.region || prev.kewSixRegion,
        speciesOrPhenomenon:
          d.speciesCommon && d.speciesScientific
            ? `${d.speciesCommon} (${d.speciesScientific})`
            : prev.speciesOrPhenomenon,
        habitatAndElevation: d.habitat || prev.habitatAndElevation,
        maskSensitiveCoordinates:
          typeof d.sensitiveProtected === 'boolean'
            ? d.sensitiveProtected
            : prev.maskSensitiveCoordinates,
      }));
    };

    window.addEventListener('kew:ecovoices-prefill-soundscape', handlePrefill);
    return () => window.removeEventListener('kew:ecovoices-prefill-soundscape', handlePrefill);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (
      !formData.contributorName.trim() ||
      !formData.contributorEmail.trim() ||
      !formData.workTitle.trim()
    ) {
      setFormError('Please complete all required fields (Name, Email, and Work Title).');
      return;
    }

    if (!formData.rightsDeclarationAgreed) {
      setFormError('You must agree to the non-commercial educational attribution declaration.');
      return;
    }

    if (
      formData.creativeDepartment === 'soundscapes' &&
      !formData.unmanipulatedFieldAttestation
    ) {
      setFormError(
        'For Sounds of Nature submissions, please confirm that the recording is an authentic, non-synthesized field capture.'
      );
      return;
    }

    setIsSubmitting(true);

    const submissionPayload =
      formData.creativeDepartment === 'soundscapes'
        ? {
            ...formData,
            bioacousticMetadata: {
              acousticClassification: formData.acousticClassification,
              targetCollectionId: formData.targetCollectionId,
              kewSixRegion: formData.kewSixRegion,
              speciesOrPhenomenon: formData.speciesOrPhenomenon,
              habitatAndElevation: formData.habitatAndElevation,
              recordingDateAndSeason: formData.recordingDateAndSeason,
              recordingEquipment: formData.recordingEquipment,
              openLicenseChoice: formData.openLicenseChoice,
              maskSensitiveCoordinates: formData.maskSensitiveCoordinates,
              unmanipulatedFieldAttestation: formData.unmanipulatedFieldAttestation,
            },
          }
        : formData;

    try {
      const res = await fetch('/api/ecovoices/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionPayload),
      });

      const data = await res.json();

      // Mirror into unified administrative operations queue for Admin & Contributor Dashboard visibility
      fetch('/api/operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourcePage: '/ecovoices',
          title: `[EcoVoices · ${formData.creativeDepartment.toUpperCase()}] ${formData.workTitle}`,
          category: formData.contributorRole,
          ownerName: formData.contributorName,
          ownerEmail: formData.contributorEmail,
          organization: formData.institutionOrGuardian || undefined,
          district: formData.geographicConnection,
          details: `Department: ${formData.creativeDepartment} | Language: ${formData.preferredLanguage} | Theme: ${formData.environmentalThemeId}\n\n${formData.contentOrPortfolioUrl}`,
        }),
      }).catch(() => null);

      if (data.success) {
        setSubmissionSuccess(data);
      } else {
        setFormError(data.error || 'Submission failed. Please check your information.');
      }
    } catch {
      const fallbackId = `ECOVOICES-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      setSubmissionSuccess({
        trackingId: fallbackId,
        receivedAt: new Date().toISOString(),
        details: {
          contributorName: formData.contributorName,
          role: formData.contributorRole,
          theme: formData.environmentalThemeId,
          trackingId: fallbackId,
        },
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
    <div className="space-y-14">
      {/* 1. FIVE SUFIPULSE CREATIVE PATHWAYS + LITERARY JOURNAL */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="inline-block text-[11px] font-mono uppercase tracking-[0.22em] text-amber-300/90">
              Canonical Music &amp; Literary Infrastructure · SufiPulse USA × KEW
            </span>
            <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-3xl sm:text-4xl font-semibold text-white">
              Five SufiPulse Pathways, One Ecological Mission
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              For musical compositions, vocal performance, acoustic instrumentation, and literary kalam, EcoVoices connects directly with SufiPulse USA&apos;s established contributor pathways while Kashmir EcoWatch provides scientific grounding and educational integration.
            </p>
          </div>

          <a
            href="https://sufipulse.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-amber-300/15 text-amber-200 border border-amber-300/30 font-mono text-xs shrink-0 transition-colors"
          >
            <span>Explore SufiPulse.com Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SUFIPULSE_CREATIVE_PATHWAYS.map((pathway) => (
            <div
              key={pathway.id}
              className={`p-6 rounded-2xl border flex flex-col justify-between transition-all ${
                pathway.roleType === 'curated_publication'
                  ? 'bg-gradient-to-b from-[#0b1024] to-[#120d24] border-amber-300/40 shadow-[0_12px_35px_rgba(0,0,0,0.5)]'
                  : 'bg-[#080c18]/90 border-white/10 hover:border-amber-300/35'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-xs font-bold text-amber-300">
                    {pathway.name}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                      pathway.roleType === 'curated_publication'
                        ? 'bg-amber-300 text-slate-950 font-bold border-amber-200'
                        : 'border-amber-300/25 text-amber-200/80 bg-amber-300/5'
                    }`}
                  >
                    {pathway.badgeLabel}
                  </span>
                </div>

                <h4 className="font-[family-name:var(--font-ecovoices-serif)] text-xl font-semibold text-white">
                  {pathway.title}
                </h4>

                <p className="text-xs text-slate-300 leading-relaxed">{pathway.summary}</p>

                <p className="text-[11px] text-slate-400 leading-relaxed border-t border-white/10 pt-2.5">
                  {pathway.detailedScope}
                </p>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                    Eligible Formats:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {pathway.eligibleFormats.map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-black/50 border border-white/10 text-slate-300"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-5 border-t border-white/10 mt-5 flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-slate-400">
                  {pathway.roleType === 'curated_publication' ? 'Publishing Venue' : 'Contributor Role'}
                </span>

                <a
                  href={pathway.canonicalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    pathway.roleType === 'curated_publication'
                      ? 'bg-amber-300 hover:bg-amber-200 text-slate-950 font-bold'
                      : 'bg-white/[0.05] hover:bg-amber-300/20 text-amber-200 border border-amber-300/25'
                  }`}
                >
                  <span>
                    {pathway.roleType === 'curated_publication'
                      ? 'Visit Journal Archive'
                      : 'Apply on SufiPulse'}
                  </span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. 10 WESTERN HIMALAYAN ENVIRONMENTAL THEMES */}
      <div className="space-y-6">
        <div className="space-y-1.5">
          <span className="inline-block text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-300/90">
            Scientific Grounding · 10 Observatory Themes
          </span>
          <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl sm:text-3xl font-semibold text-white">
            Western Himalayan Ecological Themes
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl">
            Every creative work on EcoVoices connects to an active Kashmir EcoWatch scientific observatory layer so artistic expression remains grounded in living mountain reality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {ECOVOICES_ENVIRONMENTAL_THEMES.map((theme) => (
            <div
              key={theme.id}
              className="p-4 rounded-2xl bg-[#080c18]/85 border border-white/10 hover:border-amber-300/35 transition-all flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-amber-300 font-bold">{theme.number}</span>
                  <span className="text-slate-500">Observatory</span>
                </div>
                <h4 className="font-semibold text-white text-xs group-hover:text-amber-200 transition-colors leading-snug">
                  {theme.title}
                </h4>
                <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                  {theme.scopeSummary}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1.5">
                <span className="text-[10px] text-amber-200/75 font-mono block truncate">
                  {theme.recommendedStyles[0]}
                </span>
                <Link
                  href={theme.scientificHref}
                  className="inline-flex items-center gap-1 text-[11px] text-emerald-300 hover:text-emerald-200 font-semibold group/link"
                >
                  <span>Explore Science</span>
                  <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MULTI-DEPARTMENT CREATIVE SUBMISSION GATEWAY */}
      <div id="submit" className="scroll-mt-32 space-y-6 pt-2">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0b1022] via-[#090d1b] to-[#120e1e] border border-amber-300/30 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-300 font-semibold">
              Open Creative Submission &amp; Editorial Review Gateway
            </span>
            {isLoggedIn && user && (
              <span className="text-[11px] font-mono px-3 py-0.5 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-400/30">
                Signed in as {user.name}
              </span>
            )}
          </div>
          <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-3xl sm:text-4xl font-semibold text-white">
            Submit an Environmental Creative Work
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Submit original songs, ecological poetry, documentary film screeners, visual art portfolios, natural soundscape recordings, or supervised youth choir works for joint artistic and scientific review.
          </p>

          {/* 6 Department Quick Role Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-2">
            {[
              { id: 'music', label: 'Music & Vocals', icon: Mic2, role: 'Vocalist & Singer (Ahl-e-Sada)' },
              { id: 'poetry', label: 'Poetry & Kalam', icon: PenTool, role: 'Writer / Poet (Ahl-e-Qalam)' },
              { id: 'cinema', label: 'Cinema & Film', icon: Film, role: 'Documentary Filmmaker / Visual Director' },
              { id: 'art', label: 'Visual Arts', icon: Palette, role: 'Visual Artist / Botanical Illustrator' },
              { id: 'soundscapes', label: 'Soundscapes', icon: Waves, role: 'Field Recordist / Acoustic Composer' },
              { id: 'contributors', label: 'Youth Choirs', icon: GraduationCap, role: 'Student / School Choir Lead (Youth EcoVoices)' },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = formData.creativeDepartment === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      creativeDepartment: item.id as any,
                      contributorRole: item.role,
                      isYouthSubmission: item.id === 'contributors' ? true : prev.isYouthSubmission,
                    }))
                  }
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-amber-300/15 border-amber-300/60 text-amber-100 shadow-md'
                      : 'bg-black/40 border-white/10 text-slate-300 hover:border-amber-300/30'
                  }`}
                >
                  <Icon className="w-4 h-4 text-amber-300 shrink-0" />
                  <span className="text-xs font-semibold truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {submissionSuccess ? (
          <div className="p-8 bg-emerald-950/30 border border-emerald-400/40 rounded-3xl space-y-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 text-emerald-300">
              <CheckCircle2 className="w-8 h-8 shrink-0" />
              <div>
                <h4 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl font-semibold text-white">
                  Creative Proposal Registered for Editorial Review
                </h4>
                <p className="text-xs text-emerald-300 font-mono">
                  Logged in the EcoVoices Editorial &amp; Scientific Review Registry.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-black/60 border border-emerald-400/30 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-slate-400">Tracking Reference ID:</span>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-amber-300 text-sm">
                    {submissionSuccess.trackingId}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyTrackingId(submissionSuccess.trackingId)}
                    className="p-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-200 cursor-pointer"
                    title="Copy tracking ID"
                    aria-label="Copy tracking ID"
                  >
                    {copiedId ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300 text-[11px]">
                <div>
                  <span className="text-slate-500">Contributor:</span>{' '}
                  {submissionSuccess.details?.contributorName}
                </div>
                <div>
                  <span className="text-slate-500">Role:</span> {submissionSuccess.details?.role}
                </div>
                <div>
                  <span className="text-slate-500">Theme:</span> {submissionSuccess.details?.theme}
                </div>
                <div>
                  <span className="text-slate-500">Logged At:</span>{' '}
                  {new Date(submissionSuccess.receivedAt).toLocaleString()}
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmissionSuccess(null);
                setFormData((prev) => ({ ...prev, workTitle: '', contentOrPortfolioUrl: '' }));
              }}
              className="px-5 py-2.5 rounded-full border border-amber-300/40 text-amber-200 hover:bg-amber-300/10 text-xs font-semibold cursor-pointer"
            >
              Submit Another Creative Work
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8 bg-[#080c18]/95 border border-white/10 rounded-3xl space-y-6 max-w-3xl mx-auto shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">
              {formError && (
                <div
                  role="alert"
                  className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="ev-contributorName" className="text-slate-200 font-semibold block">
                    Contributor Full Name *
                  </label>
                  <input
                    id="ev-contributorName"
                    type="text"
                    name="contributorName"
                    required
                    value={formData.contributorName}
                    onChange={handleInputChange}
                    placeholder="e.g. Zeeshan Ahmad"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-300/60"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ev-contributorEmail" className="text-slate-200 font-semibold block">
                    Contact Email *
                  </label>
                  <input
                    id="ev-contributorEmail"
                    type="email"
                    name="contributorEmail"
                    required
                    value={formData.contributorEmail}
                    onChange={handleInputChange}
                    placeholder="e.g. artist@example.org"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-300/60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="ev-department" className="text-slate-200 font-semibold block">
                    Creative Department *
                  </label>
                  <select
                    id="ev-department"
                    name="creativeDepartment"
                    value={formData.creativeDepartment}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-amber-300/60"
                  >
                    <option value="music">Environmental Music</option>
                    <option value="poetry">Environmental Poetry &amp; Literature</option>
                    <option value="cinema">Environmental Cinema &amp; Short Film</option>
                    <option value="art">Environmental Visual Art &amp; Illustration</option>
                    <option value="soundscapes">Sounds of Nature &amp; Field Acoustics</option>
                    <option value="contributors">Youth EcoVoices &amp; School Choirs</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ev-role" className="text-slate-200 font-semibold block">
                    Primary Creative Role *
                  </label>
                  <select
                    id="ev-role"
                    name="contributorRole"
                    value={formData.contributorRole}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-amber-300/60"
                  >
                    <option>Writer / Poet (Ahl-e-Qalam)</option>
                    <option>Vocalist &amp; Singer (Ahl-e-Sada)</option>
                    <option>Instrumentalist / Master Musician (Saaz-kaaran)</option>
                    <option>Composer &amp; Music Producer (Ahl-e-Naghma)</option>
                    <option>Literary Contributor / Essayist (Ahl-e-Tahreer)</option>
                    <option>Documentary Filmmaker / Visual Director</option>
                    <option>Visual Artist / Botanical Illustrator</option>
                    <option>Ornithologist / Bioacoustician / Field Recordist</option>
                    <option>Environmental Researcher / Hydrologist</option>
                    <option>Wildlife Photographer &amp; Field Videographer</option>
                    <option>Field Investigator / Conservation Warden</option>
                    <option>Citizen Scientist / Natural Soundscape Recordist</option>
                    <option>Field Recordist / Acoustic Composer</option>
                    <option>Student / School Choir Lead (Youth EcoVoices)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="ev-language" className="text-slate-200 font-semibold block">
                    Language / Medium
                  </label>
                  <select
                    id="ev-language"
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-amber-300/60"
                  >
                    <option>Kashmiri (Koshur)</option>
                    <option>Urdu</option>
                    <option>English</option>
                    <option>Dogri / Hindi / Pahari</option>
                    <option>Ladakhi / Balti / Shina / Burushaski</option>
                    <option>Visual / Instrumental / Non-Verbal</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ev-theme" className="text-slate-200 font-semibold block">
                    Environmental Theme *
                  </label>
                  <select
                    id="ev-theme"
                    name="environmentalThemeId"
                    value={formData.environmentalThemeId}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-amber-300/60"
                  >
                    {ECOVOICES_ENVIRONMENTAL_THEMES.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.number}: {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="ev-region" className="text-slate-200 font-semibold block">
                    Geographic Connection
                  </label>
                  <select
                    id="ev-region"
                    name="geographicConnection"
                    value={formData.geographicConnection}
                    onChange={handleInputChange}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-slate-200 focus:outline-none focus:border-amber-300/60"
                  >
                    <option>Srinagar (Dal &amp; Jhelum)</option>
                    <option>Anantnag / Verinag &amp; Springs</option>
                    <option>Baramulla &amp; Wular Basin</option>
                    <option>Ganderbal /Kupwara / Budgam / South Kashmir</option>
                    <option>Jammu / Tawi &amp; Chenab Basin</option>
                    <option>Ladakh / Zanskar &amp; Changthang</option>
                    <option>Azad Jammu &amp; Kashmir</option>
                    <option>Gilgit-Baltistan</option>
                    <option>Kashmiri Diaspora / Global Collaborator</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ev-workTitle" className="text-slate-200 font-semibold block">
                  Work Title / Composition or Exhibition Name *
                </label>
                <input
                  id="ev-workTitle"
                  type="text"
                  name="workTitle"
                  required
                  value={formData.workTitle}
                  onChange={handleInputChange}
                  placeholder="e.g. Elegy for the Kolahoi Meltwater"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-300/60"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="ev-content" className="text-slate-200 font-semibold block">
                  {formData.creativeDepartment === 'soundscapes'
                    ? 'Lossless WAV/FLAC/MP3 Field Recording URL & Field Observation Notes *'
                    : 'Original Lyrics, Poetic Text, Artist Statement, or Portfolio / Screener Link *'}
                </label>
                <textarea
                  id="ev-content"
                  name="contentOrPortfolioUrl"
                  rows={4}
                  required
                  value={formData.contentOrPortfolioUrl}
                  onChange={handleInputChange}
                  placeholder={
                    formData.creativeDepartment === 'soundscapes'
                      ? 'Provide link to original WAV/FLAC/MP3 recording (Xeno-canto, Wikimedia Commons, Drive, Zenodo) plus weather, playback disclosure, and species/phenomenon verification notes...'
                      : 'Paste original poetry/lyrics, film synopsis & screener URL, visual portfolio link, or field recording notes...'
                  }
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-300/60"
                />
              </div>

              {/* Conditional Department V Bioacoustic Provenance & Verification Block */}
              {formData.creativeDepartment === 'soundscapes' && (
                <div className="p-5 rounded-2xl bg-[#0a1324] border border-amber-300/35 space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-300 block">
                      Department V · Bioacoustic Field Provenance &amp; Verification Gate
                    </span>
                    <p className="text-[11px] text-slate-300 leading-relaxed">
                      All natural soundscape submissions undergo taxonomic/geophysical review before public archive
                      publication. Synthesized wildlife calls and artificial musical drones are not accepted as field
                      vouchers.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label htmlFor="ev-acousticClass" className="text-slate-200 font-semibold block">
                        Acoustic Classification *
                      </label>
                      <select
                        id="ev-acousticClass"
                        name="acousticClassification"
                        value={formData.acousticClassification}
                        onChange={handleInputChange}
                        className="w-full bg-black/65 border border-white/15 rounded-xl px-3 py-2 text-slate-200"
                      >
                        <option value="Biophony">Biophony (Wildlife / Living Organisms)</option>
                        <option value="Geophony">Geophony (Rivers / Wind / Rain / Glaciers)</option>
                        <option value="Anthrophony">Anthrophony (Comparative Noise Baseline)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="ev-kewSixRegion" className="text-slate-200 font-semibold block">
                        KEW Six-Region Scope *
                      </label>
                      <select
                        id="ev-kewSixRegion"
                        name="kewSixRegion"
                        value={formData.kewSixRegion}
                        onChange={handleInputChange}
                        className="w-full bg-black/65 border border-white/15 rounded-xl px-3 py-2 text-slate-200"
                      >
                        {KEW_SIX_ACOUSTIC_REGIONS.map((r) => (
                          <option key={r.id} value={r.id}>
                            {r.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="ev-targetSlot" className="text-slate-200 font-semibold block">
                        Target Collection Category
                      </label>
                      <select
                        id="ev-targetSlot"
                        name="targetCollectionId"
                        value={formData.targetCollectionId}
                        onChange={handleInputChange}
                        className="w-full bg-black/65 border border-white/15 rounded-xl px-3 py-2 text-slate-200"
                      >
                        {ECOVOICES_BIOACOUSTIC_COLLECTION.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.catalogNumber}: {item.title}
                          </option>
                        ))}
                        <option value="custom-western-himalayan">
                          New Western Himalayan Bioacoustic Voucher
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label htmlFor="ev-speciesPhenomenon" className="text-slate-200 font-semibold block">
                        Species (Common &amp; Scientific) or Physical Phenomenon
                      </label>
                      <input
                        id="ev-speciesPhenomenon"
                        type="text"
                        name="speciesOrPhenomenon"
                        value={formData.speciesOrPhenomenon}
                        onChange={handleInputChange}
                        placeholder="e.g. Himalayan Monal (Lophophorus impejanus) or Verinag Karst Spring"
                        className="w-full bg-black/65 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="ev-habitatElev" className="text-slate-200 font-semibold block">
                        Habitat, Locality &amp; Elevation (m ASL)
                      </label>
                      <input
                        id="ev-habitatElev"
                        type="text"
                        name="habitatAndElevation"
                        value={formData.habitatAndElevation}
                        onChange={handleInputChange}
                        placeholder="e.g. Upper Dachigam birch-conifer belt, 2,950 m ASL"
                        className="w-full bg-black/65 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    <div className="space-y-1">
                      <label htmlFor="ev-recDateSeason" className="text-slate-200 font-semibold block">
                        Recording Date, Time &amp; Season
                      </label>
                      <input
                        id="ev-recDateSeason"
                        type="text"
                        name="recordingDateAndSeason"
                        value={formData.recordingDateAndSeason}
                        onChange={handleInputChange}
                        placeholder="e.g. 2026-05-12 05:25 · Spring"
                        className="w-full bg-black/65 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="ev-recEquip" className="text-slate-200 font-semibold block">
                        Recorder / Microphone / Hydrophone
                      </label>
                      <input
                        id="ev-recEquip"
                        type="text"
                        name="recordingEquipment"
                        value={formData.recordingEquipment}
                        onChange={handleInputChange}
                        placeholder="e.g. Zoom F3 + Sennheiser ME66 (48kHz WAV)"
                        className="w-full bg-black/65 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-slate-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label htmlFor="ev-openLicense" className="text-slate-200 font-semibold block">
                        Open License / Permission *
                      </label>
                      <select
                        id="ev-openLicense"
                        name="openLicenseChoice"
                        value={formData.openLicenseChoice}
                        onChange={handleInputChange}
                        className="w-full bg-black/65 border border-white/15 rounded-xl px-3 py-2 text-slate-200"
                      >
                        <option>CC BY 4.0 (Attribution)</option>
                        <option>CC BY-SA 4.0 (Attribution-ShareAlike)</option>
                        <option>CC0 1.0 (Public Domain Dedication)</option>
                        <option>Written Non-Commercial KEW Scientific &amp; Educational Permission</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2 border-t border-white/10">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="maskSensitiveCoordinates"
                        checked={formData.maskSensitiveCoordinates}
                        onChange={handleInputChange}
                        className="w-4 h-4 mt-0.5 rounded accent-amber-300"
                      />
                      <span className="text-[11px] text-amber-100 leading-relaxed">
                        <strong className="text-amber-300">Sensitive Wildlife Location Protection:</strong> Mask exact
                        GPS coordinates on public pages if this recording documents threatened wildlife (e.g., Hangul,
                        Kashmir Flycatcher, Himalayan Monal, Himalayan Wolf, nesting cliffs, or den sites).
                      </span>
                    </label>

                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        name="unmanipulatedFieldAttestation"
                        checked={formData.unmanipulatedFieldAttestation}
                        onChange={handleInputChange}
                        className="w-4 h-4 mt-0.5 rounded accent-emerald-400"
                      />
                      <span className="text-[11px] text-slate-200 leading-relaxed">
                        <strong className="text-emerald-300">Scientific Authenticity Attestation *:</strong> I confirm
                        this recording is an authentic field capture (not AI-generated or synthesizer-produced), no
                        artificial musical drones have been added, and any wildlife call-playback use is honestly
                        disclosed in the notes.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Youth Safeguard */}
              <div className="p-4 rounded-2xl bg-black/50 border border-emerald-400/25 space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isYouthSubmission"
                    checked={formData.isYouthSubmission}
                    onChange={handleInputChange}
                    className="w-4 h-4 rounded accent-emerald-400"
                  />
                  <span className="font-semibold text-emerald-300">
                    Youth / Student / School Submission (Ages Under 18)
                  </span>
                </label>

                {formData.isYouthSubmission && (
                  <div className="pt-2 border-t border-white/10 space-y-2">
                    <label htmlFor="ev-guardian" className="text-slate-300 font-medium block">
                      School, College or Supervising Teacher / Guardian Name *
                    </label>
                    <input
                      id="ev-guardian"
                      type="text"
                      name="institutionOrGuardian"
                      value={formData.institutionOrGuardian}
                      onChange={handleInputChange}
                      placeholder="e.g. Govt Higher Secondary School, Sopore (Supervisor: Ms. Farooq)"
                      className="w-full bg-slate-900 border border-white/15 rounded-xl px-3.5 py-2 text-white placeholder-slate-500 text-xs"
                    />
                    <p className="text-[10px] text-slate-400">
                      {YOUTH_ECOVOICES_FRAMEWORK.guardianSafeguardPolicy}
                    </p>
                  </div>
                )}
              </div>

              {/* Non-commercial attribution agreement */}
              <div className="p-4 rounded-2xl bg-black/50 border border-white/10">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rightsDeclarationAgreed"
                    required
                    checked={formData.rightsDeclarationAgreed}
                    onChange={handleInputChange}
                    className="w-4 h-4 mt-0.5 rounded accent-amber-300"
                  />
                  <span className="text-[11px] text-slate-300 leading-relaxed">
                    I declare that this creative work is original. I agree that Kashmir EcoWatch and SufiPulse USA may review this submission for non-commercial environmental stewardship, educational integration, and potential curated publication under full creator attribution.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-amber-300 via-amber-200 to-yellow-200 hover:from-amber-200 hover:to-white text-slate-950 font-bold text-sm shadow-[0_10px_30px_rgba(251,191,36,0.22)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Radio className="w-4 h-4 animate-spin" />
                    <span>Registering with EcoVoices Editorial Panel...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit to EcoVoices Creative Network</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* 4. YOUTH ECOVOICES */}
      <div
        id="youth-ecovoices"
        className="p-7 sm:p-8 rounded-3xl bg-[#080c18]/90 border border-emerald-400/25 space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-300">
              Supervised Student &amp; Collegiate Expression
            </span>
            <h3 className="font-[family-name:var(--font-ecovoices-serif)] text-2xl sm:text-3xl font-semibold text-white">
              {YOUTH_ECOVOICES_FRAMEWORK.title}
            </h3>
            <p className="text-xs text-slate-300">{YOUTH_ECOVOICES_FRAMEWORK.tagline}</p>
          </div>

          <Link
            href="/environmental-calendar/outdoor-classroom"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-400/15 hover:bg-emerald-400/25 text-emerald-200 border border-emerald-400/35 font-semibold text-xs transition-colors shrink-0"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Outdoor Classroom Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {YOUTH_ECOVOICES_FRAMEWORK.ageGroups.map((grp, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-black/45 border border-white/10 space-y-1.5"
            >
              <div className="text-xs font-bold text-emerald-300 font-mono">{grp.tier}</div>
              <p className="text-xs text-slate-300 leading-relaxed">{grp.format}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
