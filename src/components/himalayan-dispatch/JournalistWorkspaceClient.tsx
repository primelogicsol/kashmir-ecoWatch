'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Camera,
  CheckCircle2,
  ExternalLink,
  FileText,
  FolderLock,
  Lock,
  LogOut,
  MessageSquare,
  Plus,
  Send,
  ShieldCheck,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { HD_ROUTES, resolveCanonicalStoryUrl } from '@/lib/himalayan-dispatch-routes';
import {
  EditorialCorrespondenceEntry,
  EditorialDepartment,
  EditorialDepartmentId,
  EditorialPitchSubmission,
  EditorialWorkflowStage,
  JournalistDraftRecord,
  JournalistEvidenceRecord,
  JournalistMediaRecord,
  MagazineEdition,
  MagazineStory,
  PublicationCalendarMilestone,
} from '@/types/himalayan-dispatch';

interface WorkflowStageItem {
  id: EditorialWorkflowStage;
  stepNumber: number;
  label: string;
  description: string;
}

interface WorkspaceAssignmentItem {
  id: string;
  editionSlug: string;
  workingTitle: string;
  synopsis: string;
  departmentId: EditorialDepartmentId;
  departmentLabel: string;
  workflowStage: EditorialWorkflowStage;
  publicStageLabel: string;
  anticipatedPublicationWindow: string;
  region: string;
  isConfidential: boolean;
}

interface WorkspaceBundle {
  authenticated: boolean;
  journalist: {
    slug: string;
    name: string;
    email: string;
    roleTitle: string;
    basedIn: string;
    beat: string;
    shortBio: string;
    languages: string[];
    publicPortfolioConsent: boolean;
    publicPortfolioLive: boolean;
    engagementNotice: string;
  };
  myAssignments: WorkspaceAssignmentItem[];
  myPitches: EditorialPitchSubmission[];
  myDrafts: JournalistDraftRecord[];
  myEvidence: JournalistEvidenceRecord[];
  myMedia: JournalistMediaRecord[];
  correspondence: EditorialCorrespondenceEntry[];
  publishedStories: MagazineStory[];
  editions: MagazineEdition[];
  departments: EditorialDepartment[];
  workflowStages: WorkflowStageItem[];
  publicationCalendar: PublicationCalendarMilestone[];
}

type WorkspaceSectionId =
  | 'assignments'
  | 'pitches'
  | 'drafts'
  | 'correspondence'
  | 'evidence'
  | 'media'
  | 'calendar'
  | 'review'
  | 'portfolio'
  | 'profile';

const WORKSPACE_SECTIONS: { id: WorkspaceSectionId; label: string; numeral: string }[] = [
  { id: 'assignments', label: 'My Assignments', numeral: '01' },
  { id: 'pitches', label: 'My Pitches', numeral: '02' },
  { id: 'drafts', label: 'My Drafts', numeral: '03' },
  { id: 'correspondence', label: 'Editorial Correspondence', numeral: '04' },
  { id: 'evidence', label: 'Research & Evidence', numeral: '05' },
  { id: 'media', label: 'Media Library', numeral: '06' },
  { id: 'calendar', label: 'Publication Calendar', numeral: '07' },
  { id: 'review', label: 'Review Status', numeral: '08' },
  { id: 'portfolio', label: 'Published Portfolio', numeral: '09' },
  { id: 'profile', label: 'Contributor Profile', numeral: '10' },
];

export function JournalistWorkspaceClient() {
  const { user, isLoggedIn } = useAuth();
  const searchParams = useSearchParams();

  const [checkingSession, setCheckingSession] = useState(true);
  const [bundle, setBundle] = useState<WorkspaceBundle | null>(null);
  const [activeSection, setActiveSection] = useState<WorkspaceSectionId>('assignments');
  const [flashMessage, setFlashMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // Sign-In Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginCode, setLoginCode] = useState('');
  const [signingIn, setSigningIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginStatusCode, setLoginStatusCode] = useState<number | null>(null);

  // Draft Composer State
  const [editingDraftId, setEditingDraftId] = useState<string | undefined>(undefined);
  const [draftTitle, setDraftTitle] = useState('');
  const [draftSubtitle, setDraftSubtitle] = useState('');
  const [draftEdition, setDraftEdition] = useState('issue-02-a-world-in-transition');
  const [draftDept, setDraftDept] = useState<EditorialDepartmentId>('longform-features');
  const [draftDateline, setDraftDateline] = useState('SRINAGAR · WESTERN HIMALAYAS');
  const [draftBody, setDraftBody] = useState('');
  const [savingDraft, setSavingDraft] = useState(false);

  // Pitch Composer State
  const [pitchHeadline, setPitchHeadline] = useState('');
  const [pitchDept, setPitchDept] = useState<EditorialDepartmentId>('field-reports');
  const [pitchRegion, setPitchRegion] = useState('');
  const [pitchSummary, setPitchSummary] = useState('');
  const [pitchSources, setPitchSources] = useState('');
  const [pitchWords, setPitchWords] = useState('3,200 words');
  const [pitchConfidential, setPitchConfidential] = useState(false);
  const [submittingPitch, setSubmittingPitch] = useState(false);

  // Correspondence State
  const [replyText, setReplyText] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  // Evidence Composer State
  const [evTitle, setEvTitle] = useState('');
  const [evType, setEvType] = useState<JournalistEvidenceRecord['sourceType']>('Scientific Study');
  const [evCitation, setEvCitation] = useState('');
  const [evStoryRef, setEvStoryRef] = useState('');
  const [evProtected, setEvProtected] = useState(false);
  const [savingEvidence, setSavingEvidence] = useState(false);

  // Media Composer State
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaType, setMediaType] =
    useState<JournalistMediaRecord['mediaType']>('Documentary Photograph');
  const [mediaLocation, setMediaLocation] = useState('');
  const [mediaCaption, setMediaCaption] = useState(
    'Natural light field exposure; zero digital fabrication or composite staging affirmed.'
  );
  const [mediaUrl, setMediaUrl] = useState('');
  const [savingMedia, setSavingMedia] = useState(false);

  // Profile Editor State
  const [profBio, setProfBio] = useState('');
  const [profBasedIn, setProfBasedIn] = useState('');
  const [profBeat, setProfBeat] = useState('');
  const [profLanguages, setProfLanguages] = useState('');
  const [profConsent, setProfConsent] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);

  const syncProfileForm = useCallback((b: WorkspaceBundle) => {
    setProfBio(b.journalist.shortBio || '');
    setProfBasedIn(b.journalist.basedIn || '');
    setProfBeat(b.journalist.beat || '');
    setProfLanguages((b.journalist.languages || ['English']).join(', '));
    setProfConsent(b.journalist.publicPortfolioConsent);
  }, []);

  const fetchWorkspace = useCallback(async () => {
    setCheckingSession(true);
    try {
      const res = await fetch('/api/himalayan-dispatch/workspace?probe=1', {
        credentials: 'include',
      });
      if (res.ok) {
        const data = (await res.json()) as WorkspaceBundle;
        if (data.authenticated) {
          setBundle(data);
          syncProfileForm(data);
        } else {
          setBundle(null);
        }
      } else {
        setBundle(null);
      }
    } catch {
      setBundle(null);
    } finally {
      setCheckingSession(false);
    }
  }, [syncProfileForm]);

  useEffect(() => {
    fetchWorkspace();
  }, [fetchWorkspace]);

  // Prefill sign-in fields from query params or active KEW AuthContext
  useEffect(() => {
    const qEmail = searchParams.get('email');
    const qCode = searchParams.get('code');
    const qTab = searchParams.get('section') as WorkspaceSectionId | null;
    if (qEmail) setLoginEmail(qEmail);
    else if (isLoggedIn && user?.email && !loginEmail) setLoginEmail(user.email);
    if (qCode) setLoginCode(qCode);
    if (qTab && WORKSPACE_SECTIONS.some((s) => s.id === qTab)) {
      setActiveSection(qTab);
    }
  }, [searchParams, isLoggedIn, user, loginEmail]);

  const notify = (msg: string) => {
    setActionError(null);
    setFlashMessage(msg);
    setTimeout(() => setFlashMessage(null), 5000);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    setLoginError(null);
    setLoginStatusCode(null);

    try {
      const res = await fetch('/api/himalayan-dispatch/workspace', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginEmail.trim(),
          accessCode: loginCode.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.authenticated) {
        setLoginStatusCode(res.status);
        setLoginError(
          data.error ||
            'Unable to verify journalist newsroom credentials. Ensure your application has received final editorial approval.'
        );
      } else {
        setBundle(data as WorkspaceBundle);
        syncProfileForm(data as WorkspaceBundle);
        notify(`Welcome to the Himalayan Dispatch Newsroom, ${data.journalist.name}.`);
      }
    } catch {
      setLoginError('Network error connecting to the Himalayan Dispatch Newsroom.');
    } finally {
      setSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    await fetch('/api/himalayan-dispatch/workspace', {
      method: 'DELETE',
      credentials: 'include',
    });
    setBundle(null);
    setLoginCode('');
  };

  const handleSaveDraft = async (submitForReview: boolean) => {
    setSavingDraft(true);
    setActionError(null);
    try {
      const res = await fetch('/api/himalayan-dispatch/workspace', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_draft',
          id: editingDraftId,
          workingTitle: draftTitle,
          subtitle: draftSubtitle,
          targetEditionSlug: draftEdition,
          departmentId: draftDept,
          dateline: draftDateline,
          bodyMarkdown: draftBody,
          submitForReview,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setActionError(data.error || 'Unable to save manuscript draft.');
      } else {
        await fetchWorkspace();
        setEditingDraftId(data.draft.id);
        notify(
          submitForReview
            ? `Manuscript "${data.draft.workingTitle}" submitted to Stage 04 Fact-Checking & KEW Scientific Review.`
            : `Private draft "${data.draft.workingTitle}" saved (${data.draft.wordCount} words). Quarantined from all public surfaces.`
        );
      }
    } finally {
      setSavingDraft(false);
    }
  };

  const handleLoadDraftIntoEditor = (d: JournalistDraftRecord) => {
    setEditingDraftId(d.id);
    setDraftTitle(d.workingTitle);
    setDraftSubtitle(d.subtitle || '');
    setDraftEdition(d.targetEditionSlug);
    setDraftDept(d.departmentId);
    setDraftDateline(d.dateline);
    setDraftBody(d.bodyMarkdown);
  };

  const handleResetDraftEditor = () => {
    setEditingDraftId(undefined);
    setDraftTitle('');
    setDraftSubtitle('');
    setDraftDateline('SRINAGAR · WESTERN HIMALAYAS');
    setDraftBody('');
  };

  const handleSubmitPitch = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingPitch(true);
    setActionError(null);
    try {
      const res = await fetch('/api/himalayan-dispatch/workspace', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'submit_pitch',
          proposedHeadline: pitchHeadline,
          departmentId: pitchDept,
          region: pitchRegion || bundle?.journalist.basedIn || 'Western Himalayas',
          storySummary: pitchSummary,
          reportingAccessAndSources: pitchSources,
          estimatedWordCount: pitchWords,
          requiresSourceProtection: pitchConfidential,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setActionError(data.error || 'Unable to file story pitch.');
      } else {
        setPitchHeadline('');
        setPitchRegion('');
        setPitchSummary('');
        setPitchSources('');
        setPitchConfidential(false);
        await fetchWorkspace();
        notify(`Commissioning pitch logged under ${data.pitch.trackingCode}.`);
      }
    } finally {
      setSubmittingPitch(false);
    }
  };

  const handleSendCorrespondence = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setSendingReply(true);
    setActionError(null);
    try {
      const res = await fetch('/api/himalayan-dispatch/workspace', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'send_correspondence',
          message: replyText,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setActionError(data.error || 'Unable to send editorial note.');
      } else {
        setReplyText('');
        await fetchWorkspace();
        notify('Editorial note transmitted to the Himalayan Dispatch Commissioning Desk.');
      }
    } finally {
      setSendingReply(false);
    }
  };

  const handleLogEvidence = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingEvidence(true);
    setActionError(null);
    try {
      const res = await fetch('/api/himalayan-dispatch/workspace', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'log_evidence',
          title: evTitle,
          sourceType: evType,
          referenceCitation: evCitation,
          relatedStoryOrDraftTitle: evStoryRef || 'Current Reporting Docket',
          isSensitiveProtected: evProtected,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setActionError(data.error || 'Unable to log research evidence.');
      } else {
        setEvTitle('');
        setEvCitation('');
        setEvStoryRef('');
        setEvProtected(false);
        await fetchWorkspace();
        notify('Primary evidence record logged for Stage 04/05 verification.');
      }
    } finally {
      setSavingEvidence(false);
    }
  };

  const handleLogMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingMedia(true);
    setActionError(null);
    try {
      const res = await fetch('/api/himalayan-dispatch/workspace', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'log_media',
          title: mediaTitle,
          mediaType,
          locationAndElevation: mediaLocation || 'Western Himalayas',
          captionAndEthicsNote: mediaCaption,
          mediaUrl: mediaUrl || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setActionError(data.error || 'Unable to register documentary plate.');
      } else {
        setMediaTitle('');
        setMediaLocation('');
        setMediaUrl('');
        await fetchWorkspace();
        notify('Documentary visual asset registered with Visual Editions Desk.');
      }
    } finally {
      setSavingMedia(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingProfile(true);
    setActionError(null);
    try {
      const langs = profLanguages
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const res = await fetch('/api/himalayan-dispatch/workspace', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'update_profile',
          shortBio: profBio,
          basedIn: profBasedIn,
          beat: profBeat,
          languages: langs.length > 0 ? langs : ['English'],
          publicPortfolioConsent: profConsent,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setActionError(data.error || 'Unable to update contributor profile.');
      } else {
        await fetchWorkspace();
        notify('Contributor profile and public portfolio preferences updated.');
      }
    } finally {
      setSavingProfile(false);
    }
  };

  const liveWordCount = draftBody
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  // ─── LOADING STATE ──────────────────────────────────────────────────────────
  if (checkingSession) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-14 py-24 text-center">
        <p className="hd-kicker">HIMALAYAN DISPATCH · NEWSROOM DESK</p>
        <p className="hd-font-display text-2xl sm:text-3xl mt-3" style={{ color: 'var(--hd-fg)' }}>
          Verifying editorial session…
        </p>
      </div>
    );
  }

  // ─── UNAUTHENTICATED VIEW: JOURNALIST SIGN IN GATEWAY ──────────────────────
  if (!bundle || !bundle.authenticated) {
    return (
      <div className="w-full px-4 sm:px-8 lg:px-14 py-12 sm:py-20">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Governance & Access Protocol */}
          <div className="lg:col-span-6 space-y-6">
            <p className="hd-kicker">HIMALAYAN DISPATCH &nbsp;·&nbsp; APPROVED JOURNALIST DESK</p>
            <h1
              className="hd-font-display text-4xl sm:text-6xl font-semibold leading-[1.02]"
              style={{ color: 'var(--hd-fg)' }}
            >
              Journalist Newsroom Sign In
            </h1>
            <p
              className="hd-font-body text-lg leading-relaxed"
              style={{ color: 'var(--hd-fg-secondary)' }}
            >
              The Himalayan Dispatch Newsroom Workspace is reserved for verified, editorially
              approved reporters, district correspondents, and specialist contributors who have
              accepted the Editorial &amp; Source Protection Charter.
            </p>

            <div
              className="p-6 border space-y-4"
              style={{
                borderColor: 'var(--hd-rule-strong)',
                backgroundColor: 'var(--hd-bg-elevated)',
              }}
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
                <span className="hd-kicker">ROLE-BASED EDITORIAL GOVERNANCE</span>
              </div>
              <ul
                className="hd-font-body text-sm sm:text-base space-y-2.5 leading-relaxed"
                style={{ color: 'var(--hd-fg-secondary)' }}
              >
                <li>
                  • Pending, unreviewed, declined, withdrawn, or suspended applications cannot
                  activate newsroom tools.
                </li>
                <li>
                  • Final contributor appointment rests with Founding Editor-in-Chief{' '}
                  <strong>Dr. Fayaz Ahmad Khan</strong> or authorized editorial administrators.
                </li>
                <li>
                  • Once approved, retrieve your personal <strong>Newsroom Access Code</strong>{' '}
                  (<code>HD-KEY-…</code>) from the Application Status portal using your reference
                  number and registered email.
                </li>
              </ul>
            </div>

            <div
              className="pt-4 border-t grid grid-cols-1 sm:grid-cols-2 gap-4"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <Link
                href={`${HD_ROUTES.joinNewsroom}?view=status#application-status`}
                className="p-4 border transition-opacity hover:opacity-85 space-y-1"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <span className="hd-kicker block">APPLICANT PORTAL</span>
                <span
                  className="hd-font-display text-xl font-semibold block"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  Check Application Status →
                </span>
                <span
                  className="hd-font-body text-xs block"
                  style={{ color: 'var(--hd-fg-muted)' }}
                >
                  Verify review stage or retrieve your approved Newsroom Access Code.
                </span>
              </Link>

              <Link
                href={`${HD_ROUTES.joinNewsroom}#apply`}
                className="p-4 border transition-opacity hover:opacity-85 space-y-1"
                style={{
                  borderColor: 'var(--hd-rule)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <span className="hd-kicker block">NEW CONTRIBUTORS</span>
                <span
                  className="hd-font-display text-xl font-semibold block"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  Apply to Join the Newsroom →
                </span>
                <span
                  className="hd-font-body text-xs block"
                  style={{ color: 'var(--hd-fg-muted)' }}
                >
                  Explore 12 reporter, correspondent, visual, and science contributor roles.
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: Sign-In Form */}
          <div
            className="lg:col-span-6 p-7 sm:p-10 border space-y-6"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="space-y-1.5 border-b pb-5" style={{ borderColor: 'var(--hd-rule)' }}>
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4" style={{ color: 'var(--hd-copper)' }} />
                <span className="hd-kicker">VERIFIED CREDENTIAL ACCESS</span>
              </div>
              <h2
                className="hd-font-display text-2xl sm:text-3xl font-semibold"
                style={{ color: 'var(--hd-fg)' }}
              >
                Enter Newsroom Workspace
              </h2>
            </div>

            {loginError && (
              <div
                role="alert"
                className="p-4 border space-y-1"
                style={{
                  borderColor: 'var(--hd-copper)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <p className="hd-kicker">
                  {loginStatusCode === 403
                    ? 'EDITORIAL APPROVAL REQUIRED (HTTP 403)'
                    : 'AUTHENTICATION NOTICE'}
                </p>
                <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg)' }}>
                  {loginError}
                </p>
              </div>
            )}

            <form onSubmit={handleSignIn} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="hd-ws-email"
                  className="hd-font-sans block text-[11px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  Registered Journalist Email *
                </label>
                <input
                  id="hd-ws-email"
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@publication.org"
                  className="hd-font-body w-full px-4 py-3 border text-base focus:outline-none"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg)',
                    color: 'var(--hd-fg)',
                  }}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="hd-ws-code"
                  className="hd-font-sans block text-[11px] font-semibold tracking-[0.18em] uppercase"
                  style={{ color: 'var(--hd-fg)' }}
                >
                  Newsroom Access Code *
                </label>
                <input
                  id="hd-ws-code"
                  type="password"
                  required
                  value={loginCode}
                  onChange={(e) => setLoginCode(e.target.value)}
                  placeholder="HD-KEY-XXXXXXXX"
                  className="hd-font-sans w-full px-4 py-3 border text-sm tracking-[0.12em] focus:outline-none"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg)',
                    color: 'var(--hd-fg)',
                  }}
                />
                <p className="hd-font-body text-xs" style={{ color: 'var(--hd-fg-muted)' }}>
                  Issued upon editorial approval. Founding Masthead editors may sign in with their
                  institutional masthead credentials.
                </p>
              </div>

              <button
                type="submit"
                disabled={signingIn}
                className="hd-font-sans w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 text-xs font-semibold tracking-[0.22em] uppercase text-[#F2EFE7] cursor-pointer transition-opacity hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: 'var(--hd-copper-solid)' }}
              >
                <span>{signingIn ? 'Verifying Credentials…' : 'Open Journalist Workspace'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div
              className="pt-4 border-t flex flex-wrap items-center justify-between gap-3"
              style={{ borderColor: 'var(--hd-rule)' }}
            >
              <span className="hd-folio-meta">Proposing a single story without joining?</span>
              <Link href={HD_ROUTES.pitch} className="hd-kicker hover:underline">
                Submit an Independent Pitch →
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED VIEW: PERSONALIZED APPROVED JOURNALIST WORKSPACE ────────
  const {
    journalist,
    myAssignments,
    myPitches,
    myDrafts,
    myEvidence,
    myMedia,
    correspondence,
    publishedStories,
    editions,
    departments,
    workflowStages,
    publicationCalendar,
  } = bundle;

  return (
    <div className="w-full px-4 sm:px-8 lg:px-14 py-10 sm:py-14">
      <div className="max-w-[1440px] mx-auto space-y-10">
        {/* Personalized Newsroom Folio Header */}
        <header
          className="pb-8 border-b space-y-6"
          style={{ borderColor: 'var(--hd-rule-strong)' }}
        >
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="hd-kicker">HIMALAYAN DISPATCH · JOURNALIST WORKSPACE</span>
                <span aria-hidden="true" style={{ color: 'var(--hd-fg-muted)' }}>
                  ·
                </span>
                <span className="hd-folio-meta">
                  {journalist.roleTitle} · {journalist.basedIn}
                </span>
              </div>
              <h1
                className="hd-font-display text-3xl sm:text-5xl font-semibold leading-none"
                style={{ color: 'var(--hd-fg)' }}
              >
                {journalist.name}
              </h1>
              <p className="hd-font-body text-base" style={{ color: 'var(--hd-fg-secondary)' }}>
                Beat: {journalist.beat} &nbsp;·&nbsp; Languages: {journalist.languages.join(', ')}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {journalist.publicPortfolioLive ? (
                <Link
                  href={HD_ROUTES.journalistPortfolio(journalist.slug)}
                  className="hd-font-sans inline-flex items-center gap-2 px-4 py-2.5 border text-[11px] font-semibold tracking-[0.16em] uppercase transition-opacity hover:opacity-85"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                    color: 'var(--hd-fg)',
                  }}
                >
                  <UserCheck className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                  <span>Public Portfolio Live</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              ) : (
                <span
                  className="hd-font-sans inline-flex items-center gap-2 px-4 py-2.5 border text-[11px] tracking-[0.16em] uppercase"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    color: 'var(--hd-fg-muted)',
                  }}
                >
                  <span>Portfolio Private / Pending Consent</span>
                </span>
              )}

              <button
                type="button"
                onClick={handleSignOut}
                className="hd-font-sans inline-flex items-center gap-2 px-4 py-2.5 border text-[11px] font-semibold tracking-[0.16em] uppercase cursor-pointer transition-opacity hover:opacity-80"
                style={{
                  borderColor: 'var(--hd-rule-strong)',
                  color: 'var(--hd-fg)',
                  backgroundColor: 'var(--hd-bg)',
                }}
              >
                <LogOut className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Governance & Non-Employment Imprint Bar */}
          <div
            className="p-4 border flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            style={{
              borderColor: 'var(--hd-rule)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <FolderLock className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
              <p className="hd-font-body text-xs sm:text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                {journalist.engagementNotice} Unpublished manuscripts, confidential commissions, and
                protected evidence logged here are strictly excluded from public routes and search.
              </p>
            </div>
            <span className="hd-folio-meta shrink-0">STAGE 05 SCIENTIFIC REVIEW MANDATORY</span>
          </div>
        </header>

        {/* Feedback Banners */}
        {flashMessage && (
          <div
            role="status"
            className="p-4 border flex items-center gap-3"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: 'var(--hd-copper)' }} />
            <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg)' }}>
              {flashMessage}
            </p>
          </div>
        )}

        {actionError && (
          <div
            role="alert"
            className="p-4 border"
            style={{
              borderColor: 'var(--hd-copper)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            <p className="hd-font-body text-sm" style={{ color: 'var(--hd-copper)' }}>
              {actionError}
            </p>
          </div>
        )}

        {/* Workspace Two-Column Editorial Desk Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Rail: 10 Newsroom Capabilities */}
          <nav
            aria-label="Journalist Workspace Sections"
            className="lg:col-span-3 border divide-y"
            style={{
              borderColor: 'var(--hd-rule-strong)',
              backgroundColor: 'var(--hd-bg-elevated)',
            }}
          >
            {WORKSPACE_SECTIONS.map((sec) => {
              const active = activeSection === sec.id;
              const countBadge =
                sec.id === 'assignments'
                  ? myAssignments.length
                  : sec.id === 'pitches'
                  ? myPitches.length
                  : sec.id === 'drafts'
                  ? myDrafts.length
                  : sec.id === 'correspondence'
                  ? correspondence.length
                  : sec.id === 'evidence'
                  ? myEvidence.length
                  : sec.id === 'media'
                  ? myMedia.length
                  : sec.id === 'portfolio'
                  ? publishedStories.length
                  : null;

              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSection(sec.id)}
                  className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-2 cursor-pointer transition-colors"
                  style={{
                    borderColor: 'var(--hd-rule)',
                    backgroundColor: active ? 'var(--hd-bg)' : 'transparent',
                    color: active ? 'var(--hd-copper)' : 'var(--hd-fg)',
                  }}
                >
                  <span className="flex items-center gap-3">
                    <span className="hd-folio-meta">{sec.numeral}</span>
                    <span className="hd-font-sans text-[11px] font-semibold tracking-[0.15em] uppercase">
                      {sec.label}
                    </span>
                  </span>
                  {countBadge !== null && (
                    <span className="hd-folio-meta">{countBadge}</span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Main Desk Surface */}
          <div className="lg:col-span-9 space-y-8">
            {/* 01 · MY ASSIGNMENTS */}
            {activeSection === 'assignments' && (
              <section className="space-y-6">
                <div className="border-b pb-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <p className="hd-kicker">01 · COMMISSIONED REPORTING SLATE</p>
                  <h2
                    className="hd-font-display text-3xl font-semibold mt-1"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    My Assignments ({myAssignments.length})
                  </h2>
                  <p className="hd-font-body text-sm mt-1" style={{ color: 'var(--hd-fg-secondary)' }}>
                    Assigned stories for current and forthcoming editions of Himalayan Dispatch.
                  </p>
                </div>

                {myAssignments.length === 0 ? (
                  <div
                    className="p-8 border space-y-3"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <p className="hd-font-display text-2xl" style={{ color: 'var(--hd-fg)' }}>
                      No active commissions assigned yet.
                    </p>
                    <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                      Propose your first dispatch via <strong>My Pitches</strong> or begin preparing
                      a private manuscript in <strong>My Drafts</strong>.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveSection('pitches')}
                      className="hd-kicker inline-flex items-center gap-2 pt-1 cursor-pointer hover:underline"
                    >
                      <span>File a New Story Pitch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myAssignments.map((a) => (
                      <article
                        key={a.id}
                        className="p-6 border space-y-3"
                        style={{
                          borderColor: a.isConfidential
                            ? 'var(--hd-copper)'
                            : 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg-elevated)',
                        }}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="hd-kicker">
                            {a.departmentLabel} &nbsp;·&nbsp; {a.region}
                          </span>
                          <span className="hd-folio-meta">
                            {a.isConfidential
                              ? 'STRICT SOURCE PROTECTION · OFF PUBLIC LEDGER'
                              : `STAGE: ${a.publicStageLabel.toUpperCase()}`}
                          </span>
                        </div>
                        <h3
                          className="hd-font-display text-2xl font-semibold"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {a.workingTitle}
                        </h3>
                        <p
                          className="hd-font-body text-sm leading-relaxed"
                          style={{ color: 'var(--hd-fg-secondary)' }}
                        >
                          {a.synopsis}
                        </p>
                        <div
                          className="pt-3 border-t flex flex-wrap items-center justify-between gap-3"
                          style={{ borderColor: 'var(--hd-rule)' }}
                        >
                          <span className="hd-folio-meta">
                            Target Window: {a.anticipatedPublicationWindow}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setDraftTitle(a.workingTitle);
                              setDraftDept(a.departmentId);
                              setDraftEdition(a.editionSlug);
                              setActiveSection('drafts');
                            }}
                            className="hd-kicker cursor-pointer hover:underline"
                          >
                            Open Manuscript Draft →
                          </button>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* 02 · MY PITCHES */}
            {activeSection === 'pitches' && (
              <section className="space-y-8">
                <div className="border-b pb-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <p className="hd-kicker">02 · COMMISSIONING PROPOSALS</p>
                  <h2
                    className="hd-font-display text-3xl font-semibold mt-1"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    My Pitches ({myPitches.length})
                  </h2>
                </div>

                {/* Pitch Composer */}
                <form
                  onSubmit={handleSubmitPitch}
                  className="p-6 sm:p-8 border space-y-5"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <p className="hd-kicker">PROPOSE A NEW DISPATCH OR INVESTIGATION</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="hd-folio-meta block">Proposed Working Headline *</label>
                      <input
                        type="text"
                        required
                        value={pitchHeadline}
                        onChange={(e) => setPitchHeadline(e.target.value)}
                        placeholder="e.g., Sub-Surface Melt Channels Beneath Machoi Glacier"
                        className="hd-font-body w-full px-4 py-2.5 border text-base"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">Target Department</label>
                      <select
                        value={pitchDept}
                        onChange={(e) => setPitchDept(e.target.value as EditorialDepartmentId)}
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
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

                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">District / Watershed / Region</label>
                      <input
                        type="text"
                        value={pitchRegion}
                        onChange={(e) => setPitchRegion(e.target.value)}
                        placeholder="e.g., Ganderbal · Sindh Basin"
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>

                    <div className="md:col-span-2 space-y-1.5">
                      <label className="hd-folio-meta block">Central Thesis &amp; Public-Interest Stakes *</label>
                      <textarea
                        rows={3}
                        required
                        value={pitchSummary}
                        onChange={(e) => setPitchSummary(e.target.value)}
                        placeholder="Summarize the environmental evidence, field reporting plan, and why this story matters now..."
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">Primary Sources &amp; Field Access</label>
                      <input
                        type="text"
                        value={pitchSources}
                        onChange={(e) => setPitchSources(e.target.value)}
                        placeholder="Datasets, field interviews, archival records..."
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">Estimated Length</label>
                      <input
                        type="text"
                        value={pitchWords}
                        onChange={(e) => setPitchWords(e.target.value)}
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pitchConfidential}
                      onChange={(e) => setPitchConfidential(e.target.checked)}
                    />
                    <span className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                      Request confidential source-protection protocol for sensitive investigative material
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={submittingPitch}
                    className="hd-font-sans inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.2em] uppercase text-[#F2EFE7] cursor-pointer"
                    style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{submittingPitch ? 'Submitting Pitch…' : 'Transmit Pitch to Editors'}</span>
                  </button>
                </form>

                {/* Existing Pitches */}
                <div className="space-y-3">
                  {myPitches.map((p) => (
                    <div
                      key={p.id}
                      className="p-5 border space-y-2"
                      style={{
                        borderColor: 'var(--hd-rule)',
                        backgroundColor: 'var(--hd-bg)',
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="hd-kicker">
                          {p.trackingCode} · {p.region}
                        </span>
                        <span className="hd-folio-meta">
                          WORKFLOW STAGE: {p.workflowStage.replace(/_/g, ' ').toUpperCase()}
                        </span>
                      </div>
                      <h3
                        className="hd-font-display text-xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {p.proposedHeadline}
                      </h3>
                      <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {p.storySummary}
                      </p>
                      {p.reviewNotes && (
                        <p className="hd-font-body text-xs pt-1" style={{ color: 'var(--hd-copper)' }}>
                          Commissioning Desk Note: {p.reviewNotes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 03 · MY DRAFTS (PRIVATE MANUSCRIPT WORKSPACE) */}
            {activeSection === 'drafts' && (
              <section className="space-y-8">
                <div
                  className="border-b pb-4 flex flex-wrap items-end justify-between gap-4"
                  style={{ borderColor: 'var(--hd-rule-strong)' }}
                >
                  <div>
                    <p className="hd-kicker">03 · PRIVATE MANUSCRIPT DESK (QUARANTINED)</p>
                    <h2
                      className="hd-font-display text-3xl font-semibold mt-1"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      My Drafts ({myDrafts.length})
                    </h2>
                  </div>
                  {editingDraftId && (
                    <button
                      type="button"
                      onClick={handleResetDraftEditor}
                      className="hd-kicker cursor-pointer hover:underline"
                    >
                      + Start Fresh Manuscript
                    </button>
                  )}
                </div>

                {/* Manuscript Composer */}
                <div
                  className="p-6 sm:p-8 border space-y-5"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="hd-kicker">
                      {editingDraftId ? 'EDITING PRIVATE MANUSCRIPT' : 'NEW PRIVATE MANUSCRIPT'}
                    </span>
                    <span className="hd-folio-meta">{liveWordCount} WORDS</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="hd-folio-meta block">Working Headline *</label>
                      <input
                        type="text"
                        value={draftTitle}
                        onChange={(e) => setDraftTitle(e.target.value)}
                        placeholder="Enter manuscript headline..."
                        className="hd-font-display w-full px-4 py-3 border text-2xl"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>

                    <div className="md:col-span-2 space-y-1.5">
                      <label className="hd-folio-meta block">Deck / Standfirst</label>
                      <input
                        type="text"
                        value={draftSubtitle}
                        onChange={(e) => setDraftSubtitle(e.target.value)}
                        placeholder="Secondary narrative deck..."
                        className="hd-font-body w-full px-4 py-2.5 border text-base"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">Target Edition</label>
                      <select
                        value={draftEdition}
                        onChange={(e) => setDraftEdition(e.target.value)}
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      >
                        {editions.map((ed) => (
                          <option key={ed.slug} value={ed.slug}>
                            {ed.issueNumberLabel} — {ed.title}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">Department Rubric</label>
                      <select
                        value={draftDept}
                        onChange={(e) => setDraftDept(e.target.value as EditorialDepartmentId)}
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
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

                    <div className="md:col-span-2 space-y-1.5">
                      <label className="hd-folio-meta block">Field Dateline</label>
                      <input
                        type="text"
                        value={draftDateline}
                        onChange={(e) => setDraftDateline(e.target.value)}
                        className="hd-font-sans w-full px-4 py-2 border text-xs tracking-[0.16em] uppercase"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>

                    <div className="md:col-span-2 space-y-1.5">
                      <label className="hd-folio-meta block">Manuscript Body (Markdown / Longform Prose) *</label>
                      <textarea
                        rows={10}
                        value={draftBody}
                        onChange={(e) => setDraftBody(e.target.value)}
                        placeholder="Write your field dispatch or longform investigation here. Drafts remain strictly private to you and the Editorial Desk until final publication..."
                        className="hd-font-body w-full px-4 py-3 border text-base leading-relaxed"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      disabled={savingDraft}
                      onClick={() => handleSaveDraft(false)}
                      className="hd-font-sans inline-flex items-center gap-2 px-5 py-3 border text-xs font-semibold tracking-[0.18em] uppercase cursor-pointer"
                      style={{
                        borderColor: 'var(--hd-rule-strong)',
                        backgroundColor: 'var(--hd-bg)',
                        color: 'var(--hd-fg)',
                      }}
                    >
                      <FileText className="w-3.5 h-3.5" style={{ color: 'var(--hd-copper)' }} />
                      <span>Save Private Draft</span>
                    </button>

                    <button
                      type="button"
                      disabled={savingDraft}
                      onClick={() => handleSaveDraft(true)}
                      className="hd-font-sans inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7] cursor-pointer"
                      style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit for Fact-Checking &amp; Scientific Review</span>
                    </button>
                  </div>
                </div>

                {/* Saved Drafts List */}
                {myDrafts.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="hd-kicker">SAVED PRIVATE MANUSCRIPTS</h3>
                    {myDrafts.map((d) => (
                      <div
                        key={d.id}
                        className="p-5 border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        style={{
                          borderColor: 'var(--hd-rule)',
                          backgroundColor: 'var(--hd-bg)',
                        }}
                      >
                        <div className="space-y-1">
                          <span className="hd-folio-meta">
                            {d.dateline} · {d.wordCount} words · Stage:{' '}
                            {d.workflowStage.replace(/_/g, ' ').toUpperCase()}
                          </span>
                          <h4
                            className="hd-font-display text-xl font-semibold"
                            style={{ color: 'var(--hd-fg)' }}
                          >
                            {d.workingTitle}
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleLoadDraftIntoEditor(d)}
                          className="hd-kicker shrink-0 cursor-pointer hover:underline"
                        >
                          Continue Editing →
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* 04 · EDITORIAL CORRESPONDENCE */}
            {activeSection === 'correspondence' && (
              <section className="space-y-6">
                <div className="border-b pb-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <p className="hd-kicker">04 · COMMISSIONING &amp; STANDARDS EXCHANGE</p>
                  <h2
                    className="hd-font-display text-3xl font-semibold mt-1"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    Editorial Correspondence ({correspondence.length})
                  </h2>
                </div>

                <div className="space-y-4">
                  {correspondence.length === 0 ? (
                    <div
                      className="p-6 border"
                      style={{
                        borderColor: 'var(--hd-rule)',
                        backgroundColor: 'var(--hd-bg-elevated)',
                      }}
                    >
                      <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                        No editorial revision notes or desk messages on file yet. Use the form below
                        to message the Commissioning &amp; Fact-Checking Desk directly.
                      </p>
                    </div>
                  ) : (
                    correspondence.map((msg) => (
                      <div
                        key={msg.id}
                        className="p-5 border space-y-2"
                        style={{
                          borderColor:
                            msg.senderRole === 'editor'
                              ? 'var(--hd-copper)'
                              : 'var(--hd-rule)',
                          backgroundColor:
                            msg.senderRole === 'editor'
                              ? 'var(--hd-bg-elevated)'
                              : 'var(--hd-bg)',
                        }}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="hd-kicker">
                            {msg.senderName} · {msg.senderTitle}
                          </span>
                          <span className="hd-folio-meta">
                            {new Date(msg.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p
                          className="hd-font-body text-sm leading-relaxed"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {msg.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                <form
                  onSubmit={handleSendCorrespondence}
                  className="p-6 border space-y-4"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <label className="hd-kicker block">TRANSMIT NOTE TO EDITORIAL DESK</label>
                  <textarea
                    rows={4}
                    required
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Share reporting updates, revision responses, or source-verification queries with the editors..."
                    className="hd-font-body w-full px-4 py-3 border text-sm"
                    style={{
                      borderColor: 'var(--hd-rule-strong)',
                      backgroundColor: 'var(--hd-bg)',
                      color: 'var(--hd-fg)',
                    }}
                  />
                  <button
                    type="submit"
                    disabled={sendingReply}
                    className="hd-font-sans inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7] cursor-pointer"
                    style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{sendingReply ? 'Sending…' : 'Send Editorial Note'}</span>
                  </button>
                </form>
              </section>
            )}

            {/* 05 · RESEARCH & EVIDENCE */}
            {activeSection === 'evidence' && (
              <section className="space-y-8">
                <div className="border-b pb-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <p className="hd-kicker">05 · EMPIRICAL VERIFICATION &amp; SOURCE LEDGER</p>
                  <h2
                    className="hd-font-display text-3xl font-semibold mt-1"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    Research &amp; Evidence ({myEvidence.length})
                  </h2>
                  <p className="hd-font-body text-sm mt-1" style={{ color: 'var(--hd-fg-secondary)' }}>
                    Attach peer-reviewed studies, statutory audits, field telemetry, and protected
                    source references supporting your manuscripts for Stage 04/05 review.
                  </p>
                </div>

                <form
                  onSubmit={handleLogEvidence}
                  className="p-6 border space-y-4"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <p className="hd-kicker">LOG SUPPORTING EVIDENCE RECORD</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">Document / Dataset Title *</label>
                      <input
                        type="text"
                        required
                        value={evTitle}
                        onChange={(e) => setEvTitle(e.target.value)}
                        placeholder="e.g., Kolahoi Differential GNSS Mass-Balance Transect"
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">Evidence Classification</label>
                      <select
                        value={evType}
                        onChange={(e) =>
                          setEvType(e.target.value as JournalistEvidenceRecord['sourceType'])
                        }
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      >
                        <option value="Scientific Study">Scientific Study</option>
                        <option value="Statutory Filing / Audit">Statutory Filing / Audit</option>
                        <option value="Field Measurement">Field Measurement</option>
                        <option value="Archival Map">Archival Map</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="hd-folio-meta block">DOI / Statutory Citation / Telemetry Note *</label>
                      <input
                        type="text"
                        required
                        value={evCitation}
                        onChange={(e) => setEvCitation(e.target.value)}
                        placeholder="Full citation, instrument ID, or archival docket number..."
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="hd-folio-meta block">Associated Manuscript or Assignment</label>
                      <input
                        type="text"
                        value={evStoryRef}
                        onChange={(e) => setEvStoryRef(e.target.value)}
                        placeholder="Working headline of linked story..."
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={evProtected}
                      onChange={(e) => setEvProtected(e.target.checked)}
                    />
                    <span className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                      Mark as confidential source-protected evidence (restricted to Fact-Checking Desk)
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={savingEvidence}
                    className="hd-font-sans inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7] cursor-pointer"
                    style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{savingEvidence ? 'Logging…' : 'Add Evidence to Docket'}</span>
                  </button>
                </form>

                <div className="space-y-3">
                  {myEvidence.map((ev) => (
                    <div
                      key={ev.id}
                      className="p-5 border space-y-1.5"
                      style={{
                        borderColor: ev.isSensitiveProtected
                          ? 'var(--hd-copper)'
                          : 'var(--hd-rule)',
                        backgroundColor: 'var(--hd-bg)',
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="hd-kicker">{ev.sourceType}</span>
                        <span className="hd-folio-meta">
                          {ev.isSensitiveProtected
                            ? 'CONFIDENTIAL SOURCE QUARANTINE'
                            : 'ON-RECORD EMPIRICAL CITATION'}
                        </span>
                      </div>
                      <h3
                        className="hd-font-display text-xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {ev.title}
                      </h3>
                      <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {ev.referenceCitation}
                      </p>
                      <p className="hd-folio-meta">Linked Docket: {ev.relatedStoryOrDraftTitle}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 06 · MEDIA LIBRARY */}
            {activeSection === 'media' && (
              <section className="space-y-8">
                <div className="border-b pb-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <p className="hd-kicker">06 · VISUAL EDITIONS &amp; PLATES REGISTER</p>
                  <h2
                    className="hd-font-display text-3xl font-semibold mt-1"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    Media Library ({myMedia.length})
                  </h2>
                  <p className="hd-font-body text-sm mt-1" style={{ color: 'var(--hd-fg-secondary)' }}>
                    Register documentary photographs, field audio, documentary film reels, and
                    cartographic plates under Danish Wani’s Visual Editions ethics protocol.
                  </p>
                </div>

                <form
                  onSubmit={handleLogMedia}
                  className="p-6 border space-y-4"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <p className="hd-kicker">REGISTER DOCUMENTARY PLATE OR FIELD ASSET</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">Plate / Asset Title *</label>
                      <input
                        type="text"
                        required
                        value={mediaTitle}
                        onChange={(e) => setMediaTitle(e.target.value)}
                        placeholder="e.g., Plate IV — Dawn Ablation Stake Inspection"
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">Format</label>
                      <select
                        value={mediaType}
                        onChange={(e) =>
                          setMediaType(e.target.value as JournalistMediaRecord['mediaType'])
                        }
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      >
                        <option value="Documentary Photograph">Documentary Photograph</option>
                        <option value="Monochrome Plate">Monochrome Plate</option>
                        <option value="Video / Audio Field Reel">Video / Audio Field Reel</option>
                        <option value="Cartographic Sketch">Cartographic Sketch</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">Location &amp; Elevation</label>
                      <input
                        type="text"
                        value={mediaLocation}
                        onChange={(e) => setMediaLocation(e.target.value)}
                        placeholder="e.g., Lidder Headwaters · 3,920 m"
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">Secure Proof / Reel Link (Optional)</label>
                      <input
                        type="url"
                        value={mediaUrl}
                        onChange={(e) => setMediaUrl(e.target.value)}
                        placeholder="https://..."
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="hd-folio-meta block">Caption &amp; Non-Manipulation Ethics Attestation</label>
                      <textarea
                        rows={2}
                        value={mediaCaption}
                        onChange={(e) => setMediaCaption(e.target.value)}
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={savingMedia}
                    className="hd-font-sans inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7] cursor-pointer"
                    style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>{savingMedia ? 'Registering…' : 'Register Visual Asset'}</span>
                  </button>
                </form>

                <div className="space-y-3">
                  {myMedia.map((m) => (
                    <div
                      key={m.id}
                      className="p-5 border space-y-1.5"
                      style={{
                        borderColor: 'var(--hd-rule)',
                        backgroundColor: 'var(--hd-bg)',
                      }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="hd-kicker">{m.mediaType}</span>
                        <span className="hd-folio-meta">{m.locationAndElevation}</span>
                      </div>
                      <h3
                        className="hd-font-display text-xl font-semibold"
                        style={{ color: 'var(--hd-fg)' }}
                      >
                        {m.title}
                      </h3>
                      <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                        {m.captionAndEthicsNote}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 07 · PUBLICATION CALENDAR */}
            {activeSection === 'calendar' && (
              <section className="space-y-6">
                <div className="border-b pb-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <p className="hd-kicker">07 · EDITION CLOSING SCHEDULE</p>
                  <h2
                    className="hd-font-display text-3xl font-semibold mt-1"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    Publication Calendar
                  </h2>
                </div>

                <div
                  className="divide-y border"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  {publicationCalendar.map((item) => (
                    <div
                      key={item.id}
                      className="p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline"
                      style={{ borderColor: 'var(--hd-rule)' }}
                    >
                      <div className="md:col-span-3 space-y-1">
                        <span className="hd-kicker block">{item.editionLabel}</span>
                        <span className="hd-folio-meta flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {item.windowLabel}
                        </span>
                      </div>
                      <div className="md:col-span-6 space-y-1">
                        <h3
                          className="hd-font-display text-xl font-semibold"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          {item.milestone}
                        </h3>
                        <p className="hd-folio-meta">{item.editionTitle}</p>
                      </div>
                      <div className="md:col-span-3 md:text-right">
                        <span className="hd-folio-meta">
                          {item.gatekeeper} · {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 08 · REVIEW STATUS (10-STAGE EDITORIAL & SCIENTIFIC PIPELINE) */}
            {activeSection === 'review' && (
              <section className="space-y-8">
                <div className="border-b pb-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <p className="hd-kicker">08 · TEN-STAGE EDITORIAL &amp; SCIENTIFIC GATE</p>
                  <h2
                    className="hd-font-display text-3xl font-semibold mt-1"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    Editorial &amp; Scientific Review Status
                  </h2>
                  <p className="hd-font-body text-sm mt-1" style={{ color: 'var(--hd-fg-secondary)' }}>
                    Every Himalayan Dispatch feature passes sequentially through fact-checking
                    (Stage 04) and independent KEW scientific review (Stage 05) prior to Founding
                    Editor-in-Chief publication sign-off.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {workflowStages.map((stg) => {
                    const matchingDrafts = myDrafts.filter((d) => d.workflowStage === stg.id);
                    const matchingPitches = myPitches.filter((p) => p.workflowStage === stg.id);
                    const matchingAssigns = myAssignments.filter((a) => a.workflowStage === stg.id);
                    const totalItems =
                      matchingDrafts.length + matchingPitches.length + matchingAssigns.length;

                    return (
                      <div
                        key={stg.id}
                        className="p-5 border space-y-2"
                        style={{
                          borderColor:
                            totalItems > 0 ? 'var(--hd-copper)' : 'var(--hd-rule)',
                          backgroundColor:
                            totalItems > 0 ? 'var(--hd-bg-elevated)' : 'var(--hd-bg)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="hd-kicker">
                            STAGE {String(stg.stepNumber).padStart(2, '0')} · {stg.label}
                          </span>
                          {totalItems > 0 && (
                            <span className="hd-folio-meta">{totalItems} ACTIVE</span>
                          )}
                        </div>
                        <p
                          className="hd-font-body text-xs leading-relaxed"
                          style={{ color: 'var(--hd-fg-secondary)' }}
                        >
                          {stg.description}
                        </p>
                        {totalItems > 0 && (
                          <ul className="pt-2 border-t space-y-1" style={{ borderColor: 'var(--hd-rule)' }}>
                            {matchingAssigns.map((a) => (
                              <li key={a.id} className="hd-font-body text-xs font-semibold">
                                • Assignment: {a.workingTitle}
                              </li>
                            ))}
                            {matchingDrafts.map((d) => (
                              <li key={d.id} className="hd-font-body text-xs font-semibold">
                                • Manuscript: {d.workingTitle}
                              </li>
                            ))}
                            {matchingPitches.map((p) => (
                              <li key={p.id} className="hd-font-body text-xs font-semibold">
                                • Pitch ({p.trackingCode}): {p.proposedHeadline}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* 09 · PUBLISHED PORTFOLIO */}
            {activeSection === 'portfolio' && (
              <section className="space-y-6">
                <div
                  className="border-b pb-4 flex flex-wrap items-end justify-between gap-4"
                  style={{ borderColor: 'var(--hd-rule-strong)' }}
                >
                  <div>
                    <p className="hd-kicker">09 · PERMANENT BYLINE ARCHIVE</p>
                    <h2
                      className="hd-font-display text-3xl font-semibold mt-1"
                      style={{ color: 'var(--hd-fg)' }}
                    >
                      Published Portfolio ({publishedStories.length})
                    </h2>
                  </div>
                  {journalist.publicPortfolioLive && (
                    <Link
                      href={HD_ROUTES.journalistPortfolio(journalist.slug)}
                      className="hd-kicker inline-flex items-center gap-1.5 hover:underline"
                    >
                      <span>View Public Masthead Portfolio</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>

                {publishedStories.length === 0 ? (
                  <div
                    className="p-8 border space-y-2"
                    style={{
                      borderColor: 'var(--hd-rule)',
                      backgroundColor: 'var(--hd-bg-elevated)',
                    }}
                  >
                    <p className="hd-font-display text-2xl" style={{ color: 'var(--hd-fg)' }}>
                      No published edition dispatches credited yet.
                    </p>
                    <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                      Once a commissioned piece completes fact-checking, KEW scientific review, and
                      publication sign-off, it appears permanently here and on your public
                      journalist portfolio.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {publishedStories.map((st) => (
                      <article
                        key={st.id}
                        className="p-6 border space-y-2"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg-elevated)',
                        }}
                      >
                        <span className="hd-kicker">
                          {st.departmentRubric} · {st.publishedAt}
                        </span>
                        <h3
                          className="hd-font-display text-2xl font-semibold"
                          style={{ color: 'var(--hd-fg)' }}
                        >
                          <Link
                            href={resolveCanonicalStoryUrl(st)}
                            className="hover:underline"
                          >
                            {st.title}
                          </Link>
                        </h3>
                        <p className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                          {st.subtitle}
                        </p>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* 10 · CONTRIBUTOR PROFILE */}
            {activeSection === 'profile' && (
              <section className="space-y-6">
                <div className="border-b pb-4" style={{ borderColor: 'var(--hd-rule-strong)' }}>
                  <p className="hd-kicker">10 · MASTHEAD BIOGRAPHY &amp; CONSENT CONTROLS</p>
                  <h2
                    className="hd-font-display text-3xl font-semibold mt-1"
                    style={{ color: 'var(--hd-fg)' }}
                  >
                    Contributor Profile
                  </h2>
                </div>

                <form
                  onSubmit={handleUpdateProfile}
                  className="p-6 sm:p-8 border space-y-5"
                  style={{
                    borderColor: 'var(--hd-rule-strong)',
                    backgroundColor: 'var(--hd-bg-elevated)',
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">Base Location / District</label>
                      <input
                        type="text"
                        value={profBasedIn}
                        onChange={(e) => setProfBasedIn(e.target.value)}
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="hd-folio-meta block">Editorial Specialization / Beat</label>
                      <input
                        type="text"
                        value={profBeat}
                        onChange={(e) => setProfBeat(e.target.value)}
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="hd-folio-meta block">Reporting Languages (Comma-Separated)</label>
                      <input
                        type="text"
                        value={profLanguages}
                        onChange={(e) => setProfLanguages(e.target.value)}
                        className="hd-font-body w-full px-4 py-2.5 border text-sm"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                      <label className="hd-folio-meta block">Public Editorial Biography</label>
                      <textarea
                        rows={4}
                        value={profBio}
                        onChange={(e) => setProfBio(e.target.value)}
                        className="hd-font-body w-full px-4 py-3 border text-sm leading-relaxed"
                        style={{
                          borderColor: 'var(--hd-rule-strong)',
                          backgroundColor: 'var(--hd-bg)',
                          color: 'var(--hd-fg)',
                        }}
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={profConsent}
                      onChange={(e) => setProfConsent(e.target.checked)}
                      className="mt-1"
                    />
                    <span className="hd-font-body text-sm" style={{ color: 'var(--hd-fg-secondary)' }}>
                      <strong>Consent to Public Contributor Portfolio:</strong> Display my verified
                      editorial biography, specialization, and published stories in the{' '}
                      <Link href={HD_ROUTES.journalists} className="underline">
                        Himalayan Dispatch Journalists Directory
                      </Link>{' '}
                      (requires active Founding Editor-in-Chief approval; never exposes private
                      contact files, uploaded credentials, or unpublished drafts).
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={savingProfile}
                    className="hd-font-sans inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.18em] uppercase text-[#F2EFE7] cursor-pointer"
                    style={{ backgroundColor: 'var(--hd-copper-solid)' }}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{savingProfile ? 'Saving Profile…' : 'Save Contributor Profile'}</span>
                  </button>
                </form>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
