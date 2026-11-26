'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Lock,
  Search,
  ShieldCheck,
  Upload,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  ContributorEngagementBasis,
  ContributorRoleCategoryId,
  ContributorRoleCategorySpec,
  EditorialDepartment,
  EditorialDepartmentId,
  OnboardingLifecycleStepSpec,
  PublicApplicationStatusSummary,
} from '@/types/himalayan-dispatch';
import { KASHMIR_TEN_DISTRICTS } from '@/data/himalayan-dispatch';
import {
  HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY,
  HIMALAYAN_DISPATCH_FOUNDING_STORY,
} from '@/data/himalayan-dispatch-founding-story';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';

export function JoinNewsroomGatewayClient({
  categories,
  departments,
  lifecycleSteps,
}: {
  categories: ContributorRoleCategorySpec[];
  departments: EditorialDepartment[];
  lifecycleSteps: OnboardingLifecycleStepSpec[];
}) {
  const { user, isLoggedIn } = useAuth();
  const searchParams = useSearchParams();
  const applySectionRef = useRef<HTMLElement>(null);
  const statusSectionRef = useRef<HTMLDivElement>(null);

  const [trackFilter, setTrackFilter] = useState<
    'all' | 'regular_journalist' | 'specialist_contributor'
  >('all');
  const [deskTab, setDeskTab] = useState<'apply' | 'status'>('apply');

  // Application Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [locationOrDistrict, setLocationOrDistrict] = useState('');
  const [kashmirDistrict, setKashmirDistrict] = useState('');
  const [roleCategoryId, setRoleCategoryId] =
    useState<ContributorRoleCategoryId>('environmental-reporter');
  const [preferredDepartmentId, setPreferredDepartmentId] =
    useState<EditorialDepartmentId>('field-reports');
  const [engagementBasis, setEngagementBasis] =
    useState<ContributorEngagementBasis>('voluntary_editorial_fellow');
  const [professionalBackground, setProfessionalBackground] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [publishedWorkNotes, setPublishedWorkNotes] = useState('');
  const [motivationStatement, setMotivationStatement] = useState('');
  const [languages, setLanguages] = useState('English, Kashmiri, Urdu');
  const [credentialFile, setCredentialFile] = useState<File | null>(null);
  const [charterAccepted, setCharterAccepted] = useState(false);
  const [publicPortfolioConsent, setPublicPortfolioConsent] = useState(true);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<{
    referenceNumber: string;
    roleCategoryTitle: string;
    submittedAt: string;
    message: string;
  } | null>(null);

  // Status Lookup State
  const [lookupRef, setLookupRef] = useState('');
  const [lookupEmail, setLookupEmail] = useState('');
  const [lookingUp, setLookingUp] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [statusSummary, setStatusSummary] = useState<PublicApplicationStatusSummary | null>(
    null
  );
  const [supplementalNote, setSupplementalNote] = useState('');
  const [updatingApp, setUpdatingApp] = useState(false);

  // Sync URL query params (?track=reporter|correspondent|contributor, ?view=status)
  useEffect(() => {
    const trackParam = searchParams.get('track');
    const viewParam = searchParams.get('view');
    const bureauParam = searchParams.get('bureau');

    if (trackParam === 'reporter') {
      setTrackFilter('regular_journalist');
      setRoleCategoryId('environmental-reporter');
      setDeskTab('apply');
    } else if (trackParam === 'correspondent') {
      setTrackFilter('regular_journalist');
      setRoleCategoryId('district-correspondent');
      setDeskTab('apply');
    } else if (trackParam === 'contributor') {
      setTrackFilter('specialist_contributor');
      setRoleCategoryId('science-journalist');
      setDeskTab('apply');
    }

    if (bureauParam) {
      const bureauLabels: Record<string, string> = {
        kashmir: 'Kashmir Bureau — Kashmir Valley',
        jammu: 'Jammu Bureau — Chenab & Pir Panjal Region',
        ladakh: 'Ladakh Bureau — Leh, Kargil & Zanskar',
        ajk: 'AJ&K Bureau — Neelum & Jhelum Catchments',
        gilgit: 'Gilgit Bureau — Hunza, Ghizer & Upper Indus',
        baltistan: 'Baltistan Bureau — Skardu, Shigar & Shyok',
      };
      if (bureauLabels[bureauParam]) {
        setLocationOrDistrict(bureauLabels[bureauParam]);
      }
    }

    if (viewParam === 'status') {
      setDeskTab('status');
    }
  }, [searchParams]);

  // Pre-populate from existing KEW AuthContext session when logged in
  useEffect(() => {
    if (isLoggedIn && user) {
      if (!fullName) setFullName(user.name);
      if (!email) setEmail(user.email);
      if (!locationOrDistrict && user.district) setLocationOrDistrict(user.district);
      if (!lookupEmail) setLookupEmail(user.email);
    }
  }, [isLoggedIn, user, fullName, email, locationOrDistrict, lookupEmail]);

  const handleSelectRoleFromTable = (cat: ContributorRoleCategorySpec) => {
    setRoleCategoryId(cat.id);
    setPreferredDepartmentId(cat.primaryDepartmentId);
    if (cat.id === 'student-journalist') {
      setEngagementBasis('supervised_student_mentorship');
    } else if (cat.id === 'freelance-contributor') {
      setEngagementBasis('freelance_per_commission');
    }
    setDeskTab('apply');
    setReceipt(null);
    applySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const visibleCategories =
    trackFilter === 'all'
      ? categories
      : categories.filter((c) => c.track === trackFilter);

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('locationOrDistrict', locationOrDistrict);
      if (kashmirDistrict) formData.append('kashmirDistrict', kashmirDistrict);
      formData.append('roleCategoryId', roleCategoryId);
      formData.append('preferredDepartmentId', preferredDepartmentId);
      formData.append('engagementBasis', engagementBasis);
      formData.append('professionalBackground', professionalBackground);
      formData.append('portfolioUrl', portfolioUrl);
      formData.append('publishedWorkNotes', publishedWorkNotes);
      formData.append('motivationStatement', motivationStatement);
      formData.append('languages', languages);
      formData.append('charterAccepted', String(charterAccepted));
      formData.append('nonEmploymentAcknowledged', 'true');
      formData.append('publicPortfolioConsent', String(publicPortfolioConsent));
      if (credentialFile) {
        formData.append('credentialFile', credentialFile);
      }

      const res = await fetch('/api/himalayan-dispatch/applications', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setSubmitError(data.error || 'Unable to submit contributor application.');
      } else {
        setReceipt({
          referenceNumber: data.referenceNumber,
          roleCategoryTitle: data.roleCategoryTitle,
          submittedAt: data.submittedAt,
          message: data.message,
        });
        setLookupRef(data.referenceNumber);
        setLookupEmail(email);
      }
    } catch {
      setSubmitError('Network error while submitting application to Himalayan Dispatch.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLookingUp(true);
    setLookupError(null);
    setStatusSummary(null);

    try {
      const params = new URLSearchParams({
        ref: lookupRef.trim(),
        email: lookupEmail.trim(),
      });
      const res = await fetch(`/api/himalayan-dispatch/applications?${params.toString()}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        setLookupError(data.error || 'Unable to locate application.');
      } else {
        setStatusSummary(data.application);
      }
    } catch {
      setLookupError('Network error checking application status.');
    } finally {
      setLookingUp(false);
    }
  };

  const handleApplicantAction = async (action: 'withdraw' | 'provide_additional_info') => {
    if (!statusSummary) return;
    setUpdatingApp(true);
    try {
      const res = await fetch('/api/himalayan-dispatch/applications', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          referenceNumber: statusSummary.referenceNumber,
          email: lookupEmail,
          action,
          supplementalNote,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatusSummary(data.application);
        setSupplementalNote('');
      }
    } finally {
      setUpdatingApp(false);
    }
  };

  return (
    <div>
      {/* ═══════════════════════════════════════════════════════════════════════
          OPENING SPREAD — HIMALAYAN DISPATCH · THE NEWSROOM
          Full-bleed documentary plate · Editorial Ivory & Charcoal Ink
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="w-full px-4 sm:px-8 lg:px-14 pt-6 sm:pt-10 pb-14 sm:pb-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="hd-plate-group relative w-full min-h-[540px] sm:min-h-[600px] lg:min-h-[640px] flex flex-col justify-between overflow-hidden bg-[#171717]">
            <div className="hd-plate-frame" style={{ position: 'absolute', inset: 0 }}>
              <img
                src="/images/publications/glaciology-kolahoi-gnss-survey.jpg"
                alt="Field correspondents and glaciological survey team in the Western Himalayas"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(23, 23, 23, 0.64) 0%, rgba(23, 23, 23, 0.72) 48%, rgba(23, 23, 23, 0.95) 100%)',
              }}
            />

            <div className="relative z-10 p-6 sm:p-10 lg:p-14 flex flex-wrap items-center justify-between gap-4 text-[#F2EFE7]/90">
              <span className="hd-font-sans text-[10px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-[#D8C3A5]">
                HIMALAYAN DISPATCH &nbsp;·&nbsp; THE NEWSROOM
              </span>
              <Link
                href={HD_ROUTES.journalistSignIn}
                className="hd-font-sans inline-flex items-center gap-2 px-4 py-2 border border-[#F2EFE7]/35 text-[10px] font-semibold tracking-[0.22em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10 transition-colors"
              >
                <Lock className="w-3 h-3 text-[#D8C3A5]" />
                <span>Approved Journalist Sign In</span>
              </Link>
            </div>

            <div className="relative z-10 p-6 sm:p-10 lg:p-16 max-w-4xl space-y-5 sm:space-y-6 text-[#F2EFE7]">
              <h1 className="hd-font-display text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-semibold leading-[0.98] tracking-[-0.01em] text-[#F2EFE7]">
                <span className="block">Every Landscape Has a Story.</span>
                <span className="block italic font-normal text-[#D8C3A5] mt-1">
                  Help Us Tell It.
                </span>
              </h1>

              <p className="hd-font-body text-lg sm:text-xl md:text-2xl text-[#F2EFE7]/88 max-w-3xl leading-relaxed">
                Join a multidisciplinary community of journalists, photographers, researchers
                and independent storytellers dedicated to environmental truth across the
                Western Himalayas.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-5">
                <button
                  type="button"
                  onClick={() => {
                    setDeskTab('apply');
                    applySectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="hd-font-sans inline-flex items-center gap-3 px-6 py-3.5 text-xs font-semibold tracking-[0.22em] uppercase text-[#F2EFE7] transition-opacity hover:opacity-90 cursor-pointer"
                  style={{ backgroundColor: '#8C3125' }}
                >
                  <span>Apply to Join the Newsroom</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <Link
                  href={HD_ROUTES.pitch}
                  className="hd-font-sans inline-flex items-center gap-2 px-5 py-3.5 border border-[#F2EFE7]/45 text-xs font-medium tracking-[0.2em] uppercase text-[#F2EFE7] hover:bg-[#F2EFE7]/10 transition-colors"
                >
                  <span>Submit an Independent Story Pitch</span>
                </Link>
              </div>

              <p className="hd-font-sans text-[10px] sm:text-[11px] tracking-[0.28em] uppercase text-[#A39B8B] pt-2">
                EDITORIAL INTEGRITY &nbsp;·&nbsp; SCIENTIFIC ACCURACY &nbsp;·&nbsp; PUBLIC INTEREST
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          WHY THIS NEWSROOM EXISTS — INTRODUCTION TO THE PUBLICATION'S PURPOSE
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full px-4 sm:px-8 lg:px-14 py-12 sm:py-16 border-t"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 space-y-3">
            <p className="hd-kicker">WHY HIMALAYAN DISPATCH EXISTS</p>
            <h2
              className="hd-font-display text-3xl sm:text-4xl font-semibold italic leading-tight"
              style={{ color: 'var(--hd-fg)' }}
            >
              “{HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.lineOne}{' '}
              <span style={{ color: 'var(--hd-copper)' }}>
                {HIMALAYAN_DISPATCH_FOUNDING_PHILOSOPHY.lineTwo}
              </span>
              ”
            </h2>
            <p className="hd-folio-meta">{HIMALAYAN_DISPATCH_FOUNDING_STORY.title}</p>
          </div>

          <div
            className="lg:col-span-7 lg:border-l lg:pl-12 space-y-4"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            <p
              className="hd-font-body text-base sm:text-lg leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              The experience that led to the creation of Himalayan Dispatch must not become an
              experience imposed upon others. We seek to provide an independent transboundary
              platform for environmental scientists, researchers, journalists, conservationists,
              educators, local communities, independent scholars and individuals raising legitimate
              environmental concerns across Kashmir, Jammu, Ladakh, AJ&amp;K, Gilgit and Baltistan.
            </p>
            <p
              className="hd-font-body text-sm sm:text-base leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Contributions are evaluated on their evidence, relevance, scientific integrity and
              public importance—rather than the prominence, influence or institutional position of
              their authors.
            </p>
            <div className="pt-1">
              <Link
                href={HD_ROUTES.ourStory}
                className="hd-font-sans inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase hover:underline"
                style={{ color: 'var(--hd-copper)' }}
              >
                <span>Read Our Complete Founding Story</span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          THREE DISTINCT EDITORIAL PATHWAYS
          Clearly separates Newsroom Reporters, Specialist Contributors & Pitches
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        className="w-full px-4 sm:px-8 lg:px-14 py-14 sm:py-20 border-t"
        style={{ borderColor: 'var(--hd-rule-strong)' }}
      >
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="hd-kicker">THREE DISTINCT EDITORIAL PATHWAYS</p>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold leading-[1.04]"
              style={{ color: 'var(--hd-fg)' }}
            >
              Choose How You Contribute to Himalayan Dispatch
            </h2>
            <p
              className="hd-font-body text-base sm:text-lg leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Applying to join the masthead roster and proposing a single story are separate
              editorial processes. Select the pathway aligned with your practice.
            </p>
          </div>

          <div
            className="grid grid-cols-1 lg:grid-cols-3 border-t border-b divide-y lg:divide-y-0 lg:divide-x"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            {/* Pathway I */}
            <div className="py-8 lg:py-10 lg:pr-10 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="hd-kicker">PATHWAY I · ONGOING NEWSROOM ROSTER</span>
                <h3
                  className="hd-font-display text-2xl sm:text-3xl font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  Regular Journalist or Correspondent
                </h3>
                <p
                  className="hd-font-body text-sm sm:text-base leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  For environmental reporters, district correspondents, investigative
                  journalists, feature writers, supervised student fellows, and international
                  correspondents seeking recurring assignments and newsroom workspace access.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setTrackFilter('regular_journalist');
                    setRoleCategoryId('environmental-reporter');
                    setDeskTab('apply');
                    applySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hd-kicker inline-flex items-center gap-2 cursor-pointer hover:underline"
                >
                  <span>Apply as Reporter / Correspondent</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pathway II */}
            <div
              className="py-8 lg:py-10 lg:px-10 space-y-4 flex flex-col justify-between"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <div className="space-y-3">
                <span className="hd-kicker">PATHWAY II · SPECIALIST FELLOWS &amp; DESKS</span>
                <h3
                  className="hd-font-display text-2xl sm:text-3xl font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  Specialist Creative or Scientific Contributor
                </h3>
                <p
                  className="hd-font-body text-sm sm:text-base leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  For science journalists, documentary photojournalists, cartographic &amp; data
                  journalists, documentary filmmakers, guest columnists, and independent
                  freelance contributors working across numbered editions.
                </p>
              </div>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setTrackFilter('specialist_contributor');
                    setRoleCategoryId('science-journalist');
                    setDeskTab('apply');
                    applySectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hd-kicker inline-flex items-center gap-2 cursor-pointer hover:underline"
                >
                  <span>Apply as Specialist Contributor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pathway III */}
            <div
              className="py-8 lg:py-10 lg:pl-10 space-y-4 flex flex-col justify-between"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <div className="space-y-3">
                <span className="hd-kicker">PATHWAY III · SINGLE STORY PROPOSAL</span>
                <h3
                  className="hd-font-display text-2xl sm:text-3xl font-semibold"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  Independent Story Pitch Without Joining
                </h3>
                <p
                  className="hd-font-body text-sm sm:text-base leading-relaxed"
                  style={{ color: 'var(--hd-fg-secondary)' }}
                >
                  Have a specific field dispatch, investigation, or photo essay to propose
                  without applying for an ongoing newsroom appointment? Submit directly to the
                  Commissioning &amp; Pitch Desk.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href={HD_ROUTES.pitch}
                  className="hd-kicker inline-flex items-center gap-2 hover:underline"
                >
                  <span>Open Commissioning &amp; Pitch Desk</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          TWELVE CONTRIBUTOR CATEGORIES — EDITORIAL BROADSHEET LEDGER
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="contributor-guidelines"
        className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="max-w-[1440px] mx-auto space-y-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <p className="hd-kicker">CONTRIBUTOR ROLES &amp; SPECIALIZATIONS</p>
              <h2
                className="hd-font-display text-3xl sm:text-5xl font-semibold leading-[1.03]"
                style={{ color: 'var(--hd-fg)' }}
              >
                Twelve Newsroom &amp; Contributor Categories
              </h2>
            </div>

            <div
              className="flex flex-wrap items-center gap-4 border-b pb-2"
              style={{ borderColor: 'var(--hd-rule)' }}
              role="tablist"
              aria-label="Filter contributor categories"
            >
              {[
                { key: 'all', label: `All Positions (${categories.length})` },
                { key: 'regular_journalist', label: 'Regular Reporters & Correspondents' },
                { key: 'specialist_contributor', label: 'Specialist & Creative Contributors' },
              ].map((tab) => {
                const active = trackFilter === tab.key;
                return (
                  <button
                    key={tab.key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setTrackFilter(tab.key as typeof trackFilter)}
                    className="hd-font-sans text-[11px] font-semibold tracking-[0.18em] uppercase py-1 cursor-pointer"
                    style={{
                      color: active ? 'var(--hd-copper)' : 'var(--hd-fg-muted)',
                      borderBottom: active ? '2px solid var(--hd-copper)' : 'none',
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            className="divide-y border-t border-b"
            style={{ borderColor: 'var(--hd-rule-strong)' }}
          >
            {visibleCategories.map((cat, idx) => (
              <div
                key={cat.id}
                className="py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                <div className="md:col-span-1 hd-folio-meta">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="md:col-span-4 space-y-1">
                  <h3
                    className="hd-font-display text-2xl sm:text-[1.65rem] font-semibold"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {cat.title}
                  </h3>
                  <span className="hd-folio-meta block">
                    {cat.track === 'regular_journalist'
                      ? 'REGULAR NEWSROOM TRACK'
                      : 'SPECIALIST CONTRIBUTOR TRACK'}
                  </span>
                </div>
                <div className="md:col-span-5 space-y-1">
                  <p
                    className="hd-font-body text-base font-medium"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    {cat.scopeOfWork}
                  </p>
                  <p
                    className="hd-font-body text-sm leading-relaxed"
                    style={{ color: 'var(--hd-fg-muted)' }}
                  >
                    {cat.engagementNote}
                  </p>
                </div>
                <div className="md:col-span-2 md:text-right">
                  <button
                    type="button"
                    onClick={() => handleSelectRoleFromTable(cat)}
                    className="hd-kicker inline-flex items-center gap-1.5 cursor-pointer hover:underline"
                  >
                    <span>Select Role</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PROFESSIONAL ONBOARDING LIFECYCLE (8 STAGES)
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="editorial-appointments"
        className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t scroll-mt-20"
        style={{ borderColor: 'var(--hd-rule-strong)' }}
      >
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="max-w-3xl space-y-3">
            <p className="hd-kicker">EDITORIAL GOVERNANCE &amp; APPOINTMENT</p>
            <h2
              className="hd-font-display text-3xl sm:text-5xl font-semibold leading-[1.03]"
              style={{ color: 'var(--hd-fg)' }}
            >
              Eight-Stage Professional Onboarding Lifecycle
            </h2>
            <p
              className="hd-font-body text-base sm:text-lg leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              No applicant is listed publicly or granted workspace access automatically. Every
              appointment passes through credential verification, departmental assessment, and
              final authorization by Founding Editor-in-Chief Dr. Fayaz Ahmad Khan.
            </p>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l"
            style={{ borderColor: 'var(--hd-rule)' }}
          >
            {lifecycleSteps.map((step) => (
              <div
                key={step.stepNumber}
                className="p-6 sm:p-7 border-r border-b space-y-2.5"
                style={{ borderColor: 'var(--hd-rule)' }}
              >
                <span
                  className="hd-font-display text-3xl font-semibold block"
                  style={{ color: 'var(--hd-copper)' }}
                >
                  {step.stepNumber}
                </span>
                <h3
                  className="hd-font-display text-xl sm:text-2xl font-semibold leading-snug"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  {step.title}
                </h3>
                <p
                  className="hd-font-body text-sm leading-relaxed"
                  style={{ color: 'var(--hd-fg-muted)' }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          CONTRIBUTOR APPLICATION & APPLICATION STATUS PORTAL
          ═══════════════════════════════════════════════════════════════════════ */}
      <section
        id="apply"
        ref={applySectionRef}
        className="w-full px-4 sm:px-8 lg:px-14 py-16 sm:py-24 border-t scroll-mt-16"
        style={{
          borderColor: 'var(--hd-rule-strong)',
          backgroundColor: 'var(--hd-bg-elevated)',
        }}
      >
        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left 4 Cols: Editorial Standards & Governance Safeguards */}
          <div className="lg:col-span-4 space-y-6">
            <p className="hd-kicker">CONTRIBUTOR APPLICATION</p>
            <h2
              className="hd-font-display text-4xl sm:text-5xl font-semibold leading-[1.02]"
              style={{ color: 'var(--hd-fg)' }}
            >
              Join the Newsroom
            </h2>
            <p
              className="hd-font-body text-base leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              Submit your professional background and published work, or inspect the status of
              an existing application using your reference number.
            </p>

            {/* Mode Switcher: Apply vs. Check Application Status */}
            <div
              id="application-status"
              ref={statusSectionRef}
              className="flex border scroll-mt-24"
              style={{ borderColor: 'var(--hd-rule-strong)' }}
            >
              <button
                type="button"
                onClick={() => setDeskTab('apply')}
                className="flex-1 py-3 px-4 hd-font-sans text-[11px] font-semibold tracking-[0.18em] uppercase cursor-pointer transition-colors"
                style={{
                  backgroundColor:
                    deskTab === 'apply' ? 'var(--hd-copper-solid)' : 'var(--hd-bg)',
                  color: deskTab === 'apply' ? '#F2EFE7' : 'var(--hd-fg)',
                }}
              >
                New Application
              </button>
              <button
                type="button"
                onClick={() => setDeskTab('status')}
                className="flex-1 py-3 px-4 hd-font-sans text-[11px] font-semibold tracking-[0.18em] uppercase cursor-pointer transition-colors"
                style={{
                  backgroundColor:
                    deskTab === 'status' ? 'var(--hd-copper-solid)' : 'var(--hd-bg)',
                  color: deskTab === 'status' ? '#F2EFE7' : 'var(--hd-fg)',
                }}
              >
                Application Status
              </button>
            </div>

            {/* Governance & Credential Safeguards */}
            <div
              className="p-6 border-l-2 space-y-3"
              style={{
                borderColor: 'var(--hd-copper)',
                backgroundColor: 'var(--hd-bg)',
              }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
                <span className="hd-kicker">PRIVACY &amp; ACCREDITATION NOTICE</span>
              </div>
              <ul
                className="space-y-2 hd-font-body text-xs sm:text-sm leading-relaxed"
                style={{ color: 'var(--hd-fg-muted)' }}
              >
                <li>
                  • Supporting CVs and credentials are stored in a private verification vault
                  and are never displayed publicly. Do not upload government ID cards.
                </li>
                <li>
                  • Contributor onboarding establishes an independent editorial or voluntary
                  fellowship relationship and does not constitute salaried employment unless
                  separately contracted in writing.
                </li>
                <li>
                  • Approval grants Himalayan Dispatch digital newsroom access; it does not
                  automatically issue press cards or imply statutory government accreditation.
                </li>
              </ul>
            </div>
          </div>

          {/* Right 8 Cols: Active Form or Status Lookup */}
          <div className="lg:col-span-8">
            {deskTab === 'apply' ? (
              receipt ? (
                <div
                  className="p-8 sm:p-12 border space-y-6"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg)',
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--hd-copper)' }} />
                    <span className="hd-kicker">STAGE 01 · APPLICATION LOGGED</span>
                  </div>
                  <h3
                    className="hd-font-display text-3xl sm:text-4xl font-semibold"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    Reference Number: {receipt.referenceNumber}
                  </h3>
                  <p
                    className="hd-folio-meta"
                  >
                    APPLIED ROLE: {receipt.roleCategoryTitle} &nbsp;·&nbsp; STATUS: SUBMITTED
                  </p>
                  <p
                    className="hd-font-body text-base leading-relaxed"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    {receipt.message}
                  </p>
                  <div className="pt-4 flex flex-wrap items-center gap-5">
                    <button
                      type="button"
                      onClick={() => setDeskTab('status')}
                      className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] cursor-pointer"
                      style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>Track Application Status</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setReceipt(null)}
                      className="hd-kicker cursor-pointer hover:underline"
                    >
                      Submit Another Application
                    </button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleApplicationSubmit}
                  className="p-6 sm:p-10 border space-y-6"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg)',
                  }}
                >
                  {submitError && (
                    <div
                      className="p-4 border text-sm hd-font-body"
                      style={{
                        borderColor: 'var(--hd-copper)',
                        color: 'var(--hd-copper)',
                      }}
                    >
                      {submitError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="hd-app-name" className="hd-kicker block">
                        Full name *
                      </label>
                      <input
                        id="hd-app-name"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border bg-transparent hd-font-body text-sm"
                        style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="hd-app-email" className="hd-kicker block">
                        Email address *
                      </label>
                      <input
                        id="hd-app-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Professional email address"
                        className="w-full px-4 py-3 border bg-transparent hd-font-body text-sm"
                        style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="hd-app-location" className="hd-kicker block">
                        Location / District *
                      </label>
                      <input
                        id="hd-app-location"
                        type="text"
                        required
                        value={locationOrDistrict}
                        onChange={(e) => setLocationOrDistrict(e.target.value)}
                        placeholder="Country, region and district"
                        className="w-full px-4 py-3 border bg-transparent hd-font-body text-sm"
                        style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="hd-app-role" className="hd-kicker block">
                        Preferred contributor role *
                      </label>
                      <select
                        id="hd-app-role"
                        value={roleCategoryId}
                        onChange={(e) => {
                          const nextId = e.target.value as ContributorRoleCategoryId;
                          setRoleCategoryId(nextId);
                          const spec = categories.find((c) => c.id === nextId);
                          if (spec) setPreferredDepartmentId(spec.primaryDepartmentId);
                        }}
                        className="w-full px-4 py-3 border hd-font-body text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      >
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.title} — {c.scopeOfWork}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {roleCategoryId === 'district-correspondent' && (
                    <div className="space-y-2">
                      <label htmlFor="hd-app-kashmir-district" className="hd-kicker block">
                        Primary Kashmir Valley District Beat (Optional)
                      </label>
                      <select
                        id="hd-app-kashmir-district"
                        value={kashmirDistrict}
                        onChange={(e) => setKashmirDistrict(e.target.value)}
                        className="w-full px-4 py-3 border hd-font-body text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      >
                        <option value="">Other Western Himalayan District / Specify Above</option>
                        {KASHMIR_TEN_DISTRICTS.map((d) => (
                          <option key={d} value={d}>
                            {d} District
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="hd-app-dept" className="hd-kicker block">
                        Primary Editorial Department
                      </label>
                      <select
                        id="hd-app-dept"
                        value={preferredDepartmentId}
                        onChange={(e) =>
                          setPreferredDepartmentId(e.target.value as EditorialDepartmentId)
                        }
                        className="w-full px-4 py-3 border hd-font-body text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      >
                        {departments.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="hd-app-basis" className="hd-kicker block">
                        Contributor Arrangement
                      </label>
                      <select
                        id="hd-app-basis"
                        value={engagementBasis}
                        onChange={(e) =>
                          setEngagementBasis(e.target.value as ContributorEngagementBasis)
                        }
                        className="w-full px-4 py-3 border hd-font-body text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      >
                        <option value="voluntary_editorial_fellow">
                          Voluntary / Public-Interest Editorial Contributor
                        </option>
                        <option value="freelance_per_commission">
                          Independent Freelance Contributor (Per Approved Commission)
                        </option>
                        <option value="supervised_student_mentorship">
                          Supervised Student Journalism Mentorship
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="hd-app-bg" className="hd-kicker block">
                      Professional background *
                    </label>
                    <textarea
                      id="hd-app-bg"
                      rows={4}
                      required
                      value={professionalBackground}
                      onChange={(e) => setProfessionalBackground(e.target.value)}
                      placeholder="Describe your experience, reporting beats, academic or visual background, and regional familiarity"
                      className="w-full px-4 py-3 border bg-transparent hd-font-body text-base"
                      style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="hd-app-portfolio" className="hd-kicker block">
                        Portfolio or previously published work
                      </label>
                      <input
                        id="hd-app-portfolio"
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://portfolio-or-published-work.org"
                        className="w-full px-4 py-3 border bg-transparent hd-font-body text-sm"
                        style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="hd-app-langs" className="hd-kicker block">
                        Reporting Languages
                      </label>
                      <input
                        id="hd-app-langs"
                        type="text"
                        value={languages}
                        onChange={(e) => setLanguages(e.target.value)}
                        placeholder="English, Kashmiri, Urdu, Gojri, Ladakhi..."
                        className="w-full px-4 py-3 border bg-transparent hd-font-body text-sm"
                        style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="hd-app-cv" className="hd-kicker block">
                      Professional credentials / CV (optional)
                    </label>
                    <label
                      htmlFor="hd-app-cv"
                      className="flex items-center justify-between gap-4 px-4 py-3.5 border cursor-pointer"
                      style={{
                        borderColor: 'var(--hd-rule-strong)',
                        backgroundColor: 'var(--hd-bg-elevated)',
                      }}
                    >
                      <span
                        className="hd-font-body text-sm truncate"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        {credentialFile
                          ? `${credentialFile.name} (${Math.round(credentialFile.size / 1024)} KB)`
                          : 'Upload supporting CV or publication list (PDF, DOC, DOCX, TXT · max 5 MB)'}
                      </span>
                      <span className="hd-kicker inline-flex items-center gap-1.5 shrink-0">
                        <Upload className="w-3.5 h-3.5" />
                        <span>Choose File</span>
                      </span>
                      <input
                        id="hd-app-cv"
                        type="file"
                        accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                        onChange={(e) => setCredentialFile(e.target.files?.[0] || null)}
                        className="sr-only"
                      />
                    </label>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="hd-app-motivation" className="hd-kicker block">
                      Why do you wish to join Himalayan Dispatch? *
                    </label>
                    <textarea
                      id="hd-app-motivation"
                      rows={4}
                      required
                      value={motivationStatement}
                      onChange={(e) => setMotivationStatement(e.target.value)}
                      placeholder="Your editorial interests, mountain subregions or beats you wish to cover, and motivation"
                      className="w-full px-4 py-3 border bg-transparent hd-font-body text-base"
                      style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                    />
                  </div>

                  <div
                    className="space-y-3 pt-2 border-t"
                    style={{ borderColor: 'var(--hd-rule)' }}
                  >
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={charterAccepted}
                        onChange={(e) => setCharterAccepted(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[#8C3125]"
                      />
                      <span
                        className="hd-font-body text-sm leading-relaxed"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        I agree to the editorial ethics, scientific integrity and source
                        protection charter, and acknowledge that contributor affiliation is
                        non-salaried / per-commission and does not confer government press
                        accreditation. *
                      </span>
                    </label>

                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={publicPortfolioConsent}
                        onChange={(e) => setPublicPortfolioConsent(e.target.checked)}
                        className="mt-1 w-4 h-4 accent-[#8C3125]"
                      />
                      <span
                        className="hd-font-body text-sm leading-relaxed"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        Upon final approval, I consent to displaying my verified editorial
                        biography, specialization, and published work in the public Himalayan
                        Dispatch Journalists Index.
                      </span>
                    </label>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="hd-font-sans inline-flex items-center gap-3 px-7 py-4 text-xs font-semibold tracking-[0.22em] uppercase text-[#F2EFE7] cursor-pointer disabled:opacity-60"
                      style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                    >
                      <FileText className="w-4 h-4" />
                      <span>{submitting ? 'Submitting Application…' : 'Submit Application'}</span>
                    </button>
                  </div>
                </form>
              )
            ) : (
              /* ── SECURE APPLICATION STATUS PORTAL ─────────────────────────── */
              <div
                className="p-6 sm:p-10 border space-y-8"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <div className="space-y-2">
                  <span className="hd-kicker">SECURE STATUS VERIFICATION</span>
                  <h3
                    className="hd-font-display text-3xl sm:text-4xl font-semibold"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    Check Your Application Status
                  </h3>
                  <p
                    className="hd-font-body text-sm sm:text-base"
                    style={{ color: 'var(--hd-fg-secondary)' }}
                  >
                    Enter your Application Reference Number and registered email address to
                    inspect onboarding stage progress or retrieve your activated Newsroom
                    Access Code.
                  </p>
                </div>

                <form
                  onSubmit={handleStatusLookup}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end"
                >
                  <div className="sm:col-span-5 space-y-1.5">
                    <label htmlFor="hd-status-ref" className="hd-kicker block">
                      Reference Number *
                    </label>
                    <input
                      id="hd-status-ref"
                      type="text"
                      required
                      value={lookupRef}
                      onChange={(e) => setLookupRef(e.target.value)}
                      placeholder="HD-APP-2026-0101"
                      className="w-full px-4 py-3 border bg-transparent hd-font-sans text-sm uppercase"
                      style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                    />
                  </div>
                  <div className="sm:col-span-5 space-y-1.5">
                    <label htmlFor="hd-status-email" className="hd-kicker block">
                      Registered Email *
                    </label>
                    <input
                      id="hd-status-email"
                      type="email"
                      required
                      value={lookupEmail}
                      onChange={(e) => setLookupEmail(e.target.value)}
                      placeholder="name@domain.org"
                      className="w-full px-4 py-3 border bg-transparent hd-font-body text-sm"
                      style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={lookingUp}
                      className="w-full py-3.5 px-4 hd-font-sans text-[11px] font-semibold tracking-[0.18em] uppercase text-[#F2EFE7] cursor-pointer"
                      style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                    >
                      {lookingUp ? 'Checking…' : 'Verify'}
                    </button>
                  </div>
                </form>

                {lookupError && (
                  <div
                    className="p-4 border text-sm hd-font-body"
                    style={{ borderColor: 'var(--hd-copper)', color: 'var(--hd-copper)' }}
                  >
                    {lookupError}
                  </div>
                )}

                {statusSummary && (
                  <div
                    className="p-6 sm:p-8 border space-y-5"
                    style={{
                      borderColor: 'var(--hd-rule-strong)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--hd-rule)' }}>
                      <div>
                        <p className="hd-folio-meta">{statusSummary.referenceNumber}</p>
                        <h4
                          className="hd-font-display text-2xl sm:text-3xl font-semibold"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {statusSummary.fullName} — {statusSummary.roleCategoryTitle}
                        </h4>
                      </div>
                      <span
                        className="hd-font-sans px-3 py-1.5 border text-[11px] font-semibold tracking-[0.18em] uppercase"
                        style={{
                          borderColor: 'var(--hd-copper)',
                          color: 'var(--hd-copper)',
                        }}
                      >
                        {statusSummary.status}
                      </span>
                    </div>

                    {statusSummary.applicantFacingNote && (
                      <p
                        className="hd-font-body text-sm sm:text-base leading-relaxed"
                        style={{ color: 'var(--hd-fg-secondary)' }}
                      >
                        <strong>Editorial Desk Note:</strong> {statusSummary.applicantFacingNote}
                      </p>
                    )}

                    {statusSummary.workspaceAccessActive && statusSummary.workspaceAccessCode && (
                      <div
                        className="p-5 border-l-2 space-y-3"
                        style={{
                          borderColor: 'var(--hd-copper)',
                          backgroundColor: 'var(--hd-bg)',
                        }}
                      >
                        <p className="hd-kicker">
                          STAGE 06 ACTIVATED · APPROVED BY{' '}
                          {statusSummary.approvedByTitle || 'FOUNDING EDITOR-IN-CHIEF'}
                        </p>
                        <p
                          className="hd-font-body text-sm"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          Your personal Newsroom Access Code is{' '}
                          <code className="font-mono font-bold px-2 py-0.5 border" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                            {statusSummary.workspaceAccessCode}
                          </code>
                          . Use it with your email to sign in to the Journalist Workspace.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-1">
                          <Link
                            href={HD_ROUTES.journalistSignIn}
                            className="hd-font-sans inline-flex items-center gap-2 px-5 py-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#F2EFE7]"
                            style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                          >
                            <span>Enter Journalist Workspace</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          {statusSummary.publicPortfolioApproved &&
                            statusSummary.assignedJournalistSlug && (
                              <Link
                                href={HD_ROUTES.journalistPortfolio(statusSummary.assignedJournalistSlug)}
                                className="hd-kicker inline-flex items-center gap-1.5 py-2 hover:underline"
                              >
                                <span>View Public Journalist Portfolio →</span>
                              </Link>
                            )}
                        </div>
                      </div>
                    )}

                    {statusSummary.status === 'Additional Information Required' && (
                      <div className="space-y-3 pt-2">
                        <label className="hd-kicker block">
                          Provide Requested Clarification or Portfolio Links
                        </label>
                        <textarea
                          rows={3}
                          value={supplementalNote}
                          onChange={(e) => setSupplementalNote(e.target.value)}
                          placeholder="Enter additional portfolio details, beat clarifications, or references..."
                          className="w-full px-4 py-3 border bg-transparent hd-font-body text-sm"
                          style={{ borderColor: 'var(--hd-rule-strong)', color: 'var(--hd-fg)' }}
                        />
                        <button
                          type="button"
                          disabled={updatingApp || supplementalNote.trim().length < 5}
                          onClick={() => handleApplicantAction('provide_additional_info')}
                          className="hd-font-sans px-5 py-2.5 text-[11px] font-semibold tracking-[0.18em] uppercase text-[#F2EFE7] cursor-pointer disabled:opacity-50"
                          style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                        >
                          Submit Supplemental Information
                        </button>
                      </div>
                    )}

                    {statusSummary.status !== 'Withdrawn' &&
                      statusSummary.status !== 'Declined' && (
                        <div
                          className="pt-3 border-t flex items-center justify-between text-xs"
                          style={{ borderColor: 'var(--hd-rule)' }}
                        >
                          <span className="hd-folio-meta">
                            SUBMITTED {statusSummary.submittedAt.slice(0, 10)}
                            {statusSummary.hasCredentialOnFile
                              ? ` · CREDENTIAL ON FILE (${statusSummary.credentialFileName})`
                              : ''}
                          </span>
                          <button
                            type="button"
                            disabled={updatingApp}
                            onClick={() => handleApplicantAction('withdraw')}
                            className="hd-font-sans text-[10px] tracking-[0.16em] uppercase underline cursor-pointer"
                            style={{ color: 'var(--hd-fg-muted)' }}
                          >
                            Withdraw Application
                          </button>
                        </div>
                      )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
