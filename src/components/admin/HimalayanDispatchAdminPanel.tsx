'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  History,
  Lock,
  MessageSquare,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  UserCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { HD_ROUTES } from '@/lib/himalayan-dispatch-routes';
import {
  EditorialDepartment,
  EditorialDepartmentId,
  EditorialPitchSubmission,
  EditorialWorkflowStage,
  ForthcomingAssignment,
  JournalistDraftRecord,
  JournalistProfile,
  MagazineStory,
  MastheadAppointmentStatus,
  MastheadPositionRecord,
  MastheadRosterSummary,
  MastheadSectionId,
  MastheadSectionSpec,
  NewsroomApplicationStatus,
  NewsroomContributorApplication,
  PersonnelAppointmentState,
  PersonnelAuthorizationState,
  PersonnelPublicationState,
  PersonnelVerificationState,
  PublicProductionBadge,
} from '@/types/himalayan-dispatch';
import { EDITORIAL_WORKFLOW_STAGES } from '@/data/himalayan-dispatch';
import { HdAnieCommandCenter } from './HdAnieCommandCenter';

const ALL_MASTHEAD_STATUSES: MastheadAppointmentStatus[] = [
  'Confirmed',
  'Vacant',
  'Proposed',
  'Under Review',
  'Visiting',
  'External Reviewer',
  'Former Member',
];

const ALL_APPOINTMENT_STATES: Array<{ value: PersonnelAppointmentState; label: string }> = [
  { value: 'appointed', label: 'Appointed' },
  { value: 'vacant', label: 'Vacant' },
  { value: 'under_review', label: 'Under Review' },
  { value: 'visiting', label: 'Visiting' },
  { value: 'external_reviewer', label: 'External Reviewer' },
  { value: 'in_establishment', label: 'In Establishment' },
  { value: 'former_member', label: 'Former Member' },
];

const ALL_VERIFICATION_STATES: Array<{ value: PersonnelVerificationState; label: string }> = [
  { value: 'verified', label: 'Verified Identity & Credentials' },
  { value: 'pending_verification', label: 'Pending Identity Verification' },
  { value: 'illustrative_unverified', label: 'Illustrative Placeholder (Unverified)' },
];

const ALL_AUTHORIZATION_STATES: Array<{ value: PersonnelAuthorizationState; label: string }> = [
  { value: 'authorized', label: 'Authorized Editorial Access' },
  { value: 'desk_restricted', label: 'Desk-Restricted Access' },
  { value: 'not_authorized', label: 'Not Authorized' },
];

const ALL_PUBLICATION_STATES: Array<{ value: PersonnelPublicationState; label: string }> = [
  { value: 'published_verified', label: 'Published (Verified Identity Only)' },
  { value: 'public_vacant_pending', label: 'Public Vacant / Appointment Pending' },
  { value: 'internal_planning_only', label: 'Internal Planning Only (Hidden)' },
];

const PUBLIC_NAMED_STATUSES = new Set<MastheadAppointmentStatus>([
  'Confirmed',
  'Visiting',
  'External Reviewer',
]);

interface MastheadDraftEditState {
  roleTitle: string;
  holderName: string;
  domainsRubric: string;
  mandateDescription: string;
  status: MastheadAppointmentStatus;
  appointmentState: PersonnelAppointmentState;
  verificationState: PersonnelVerificationState;
  authorizationState: PersonnelAuthorizationState;
  publicationState: PersonnelPublicationState;
  publicVacantLabel: string;
  internalAdminNote: string;
  expanded: boolean;
}

const PUBLIC_BADGES: PublicProductionBadge[] = [
  'In development',
  'Commissioned',
  'In reporting',
  'Fact-checking',
  'Scientific review',
  'In editorial review',
  'Scheduled for publication',
];

const ALL_APPLICATION_STATUSES: NewsroomApplicationStatus[] = [
  'Submitted',
  'Under Credential Review',
  'Under Editorial Assessment',
  'Additional Information Required',
  'Approved',
  'Declined',
  'Withdrawn',
  'Suspended',
];

interface DraftDecisionState {
  status: NewsroomApplicationStatus;
  approvingAuthority: 'Founding Editor-in-Chief' | 'Editorial Administrator';
  publicPortfolioApproved: boolean;
  applicantFacingNote: string;
  internalEditorialNote: string;
  correspondenceDraft: string;
  auditOpen: boolean;
}

export function HimalayanDispatchAdminPanel({ adminName }: { adminName: string }) {
  const [stories, setStories] = useState<MagazineStory[]>([]);
  const [assignments, setAssignments] = useState<ForthcomingAssignment[]>([]);
  const [pitches, setPitches] = useState<EditorialPitchSubmission[]>([]);
  const [applications, setApplications] = useState<NewsroomContributorApplication[]>([]);
  const [journalistDrafts, setJournalistDrafts] = useState<JournalistDraftRecord[]>([]);
  const [departments, setDepartments] = useState<EditorialDepartment[]>([]);
  const [journalists, setJournalists] = useState<JournalistProfile[]>([]);
  const [mastheadSections, setMastheadSections] = useState<MastheadSectionSpec[]>([]);
  const [mastheadPositions, setMastheadPositions] = useState<MastheadPositionRecord[]>([]);
  const [mastheadRosterSummary, setMastheadRosterSummary] = useState<MastheadRosterSummary | null>(null);
  const [mastheadEdits, setMastheadEdits] = useState<Record<string, MastheadDraftEditState>>({});
  const [mastheadSectionFilter, setMastheadSectionFilter] = useState<'all' | MastheadSectionId>('all');
  const [mastheadStatusFilter, setMastheadStatusFilter] = useState<'all' | MastheadAppointmentStatus>('all');
  const [mastheadQuery, setMastheadQuery] = useState('');
  const [showNewSeatForm, setShowNewSeatForm] = useState(false);
  const [newSeatSection, setNewSeatSection] = useState<MastheadSectionId>('I_leadership');
  const [newSeatRole, setNewSeatRole] = useState('');
  const [newSeatHolder, setNewSeatHolder] = useState('');
  const [newSeatRubric, setNewSeatRubric] = useState('');
  const [newSeatMandate, setNewSeatMandate] = useState('');
  const [newSeatStatus, setNewSeatStatus] = useState<MastheadAppointmentStatus>('Confirmed');
  const [appFilter, setAppFilter] = useState<'all' | 'pending' | 'approved' | 'inactive'>('all');
  const [decisions, setDecisions] = useState<Record<string, DraftDecisionState>>({});

  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Correction Composer State
  const [corrSlug, setCorrSlug] = useState<string>('');
  const [corrKind, setCorrKind] = useState<'Clarification' | 'Correction' | 'Editorial Update'>('Clarification');
  const [corrNote, setCorrNote] = useState('');

  // New Story Assignment Commission Form State
  const [assignTitle, setAssignTitle] = useState('');
  const [assignSynopsis, setAssignSynopsis] = useState('');
  const [assignDept, setAssignDept] = useState<EditorialDepartmentId>('field-reports');
  const [assignJournalistSlug, setAssignJournalistSlug] = useState('');
  const [assignRegion, setAssignRegion] = useState('Western Himalayas');
  const [assignConfidential, setAssignConfidential] = useState(false);

  const initDecisions = (apps: NewsroomContributorApplication[]) => {
    setDecisions((prev) => {
      const next: Record<string, DraftDecisionState> = { ...prev };
      for (const a of apps) {
        next[a.id] = {
          status: a.status,
          approvingAuthority:
            prev[a.id]?.approvingAuthority || 'Founding Editor-in-Chief',
          publicPortfolioApproved:
            a.status === 'Approved' ? a.publicPortfolioApproved : a.publicPortfolioConsent,
          applicantFacingNote: a.applicantFacingNote || '',
          internalEditorialNote: a.internalEditorialNote || '',
          correspondenceDraft: prev[a.id]?.correspondenceDraft || '',
          auditOpen: prev[a.id]?.auditOpen ?? false,
        };
      }
      return next;
    });
  };

  const initMastheadEdits = (positions: MastheadPositionRecord[]) => {
    setMastheadEdits((prev) => {
      const next: Record<string, MastheadDraftEditState> = { ...prev };
      for (const p of positions) {
        next[p.id] = {
          roleTitle: p.roleTitle,
          holderName: p.holderName || '',
          domainsRubric: p.domainsRubric,
          mandateDescription: p.mandateDescription,
          status: p.status,
          appointmentState: p.appointmentState || (p.status === 'Confirmed' ? 'appointed' : 'vacant'),
          verificationState: p.verificationState || (p.status === 'Confirmed' ? 'verified' : 'illustrative_unverified'),
          authorizationState: p.authorizationState || (p.status === 'Confirmed' ? 'authorized' : 'not_authorized'),
          publicationState: p.publicationState || (p.status === 'Confirmed' ? 'published_verified' : 'public_vacant_pending'),
          publicVacantLabel: p.publicVacantLabel || '',
          internalAdminNote: p.internalAdminNote || '',
          expanded: prev[p.id]?.expanded ?? false,
        };
      }
      return next;
    });
  };

  const loadDesk = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/himalayan-dispatch/admin', { credentials: 'include' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Unable to load Himalayan Dispatch Newsroom Desk.');
      } else {
        setStories(data.stories || []);
        setAssignments(data.assignments || []);
        setPitches(data.pitches || []);
        setApplications(data.applications || []);
        setJournalistDrafts(data.journalistDrafts || []);
        setDepartments(data.departments || []);
        setJournalists(data.journalists || []);
        setMastheadSections(data.mastheadSections || []);
        setMastheadPositions(data.mastheadPositions || []);
        setMastheadRosterSummary(data.mastheadRosterSummary || null);
        initDecisions(data.applications || []);
        initMastheadEdits(data.mastheadPositions || []);
        if (!corrSlug && data.stories?.[0]?.slug) {
          setCorrSlug(data.stories[0].slug);
        }
        if (!assignJournalistSlug && data.journalists?.[0]?.slug) {
          setAssignJournalistSlug(data.journalists[0].slug);
        }
      }
    } catch {
      setError('Network error loading Himalayan Dispatch Newsroom Desk.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDesk();
  }, []);

  const flash = (msg: string) => {
    setNotice(msg);
    setTimeout(() => setNotice(null), 5000);
  };

  const updateDecisionField = (
    appId: string,
    patch: Partial<DraftDecisionState>
  ) => {
    setDecisions((prev) => ({
      ...prev,
      [appId]: {
        ...prev[appId],
        ...patch,
      },
    }));
  };

  const handleSaveApplicationDecision = async (app: NewsroomContributorApplication) => {
    const dec = decisions[app.id];
    if (!dec) return;

    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_application_status',
        applicationId: app.id,
        status: dec.status,
        approvingAuthority: dec.approvingAuthority,
        publicPortfolioApproved: dec.publicPortfolioApproved,
        applicantFacingNote: dec.applicantFacingNote,
        internalEditorialNote: dec.internalEditorialNote,
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      await loadDesk();
      flash(
        `Application ${app.referenceNumber} (${app.fullName}) updated to "${dec.status}" under ${
          dec.approvingAuthority === 'Founding Editor-in-Chief'
            ? 'Dr. Fayaz Ahmad Khan · Founding Editor-in-Chief'
            : 'Authorized Editorial Administrator'
        }.`
      );
    } else {
      setError(data.error || 'Failed to update contributor application status.');
    }
  };

  const handleSendEditorCorrespondence = async (app: NewsroomContributorApplication) => {
    const dec = decisions[app.id];
    if (!dec || !dec.correspondenceDraft.trim()) return;

    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'send_editor_correspondence',
        applicationId: app.id,
        message: dec.correspondenceDraft,
        senderTitle:
          dec.approvingAuthority === 'Founding Editor-in-Chief'
            ? 'Dr. Fayaz Ahmad Khan · Founding Editor-in-Chief'
            : 'Himalayan Dispatch Commissioning Desk',
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      updateDecisionField(app.id, { correspondenceDraft: '' });
      await loadDesk();
      flash(`Sent editorial correspondence to ${app.fullName} (${app.referenceNumber}).`);
    }
  };

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!assignTitle.trim() || !assignJournalistSlug) return;

    const selectedJ = journalists.find((j) => j.slug === assignJournalistSlug);
    const approvedApp = applications.find(
      (a) => a.assignedJournalistSlug === assignJournalistSlug && a.status === 'Approved'
    );
    const bylineDisplay =
      selectedJ?.name || approvedApp?.fullName || 'Assigned Correspondent';

    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create_assignment',
        workingTitle: assignTitle,
        synopsis: assignSynopsis,
        departmentId: assignDept,
        editionSlug: 'issue-02-a-world-in-transition',
        journalistSlug: assignJournalistSlug,
        bylineDisplay,
        region: assignRegion,
        isConfidential: assignConfidential,
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setAssignTitle('');
      setAssignSynopsis('');
      setAssignConfidential(false);
      await loadDesk();
      flash(`Commissioned "${data.assignment.workingTitle}" to ${bylineDisplay}.`);
    }
  };

  const handleStoryStageChange = async (slug: string, workflowStage: EditorialWorkflowStage) => {
    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_story_stage', slug, workflowStage }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setStories((prev) => prev.map((s) => (s.slug === slug ? data.story : s)));
      flash(`Updated "${data.story.title}" to workflow stage: ${workflowStage}.`);
    }
  };

  const handleTogglePreviewApproval = async (a: ForthcomingAssignment) => {
    if (a.isConfidential || a.sourceProtectionLevel === 'strict_confidential') {
      return;
    }
    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_assignment',
        id: a.id,
        publicPreviewApproved: !a.publicPreviewApproved,
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setAssignments((prev) => prev.map((item) => (item.id === a.id ? data.assignment : item)));
      flash(
        `Assignment "${a.workingTitle}" ${
          data.assignment.publicPreviewApproved
            ? 'approved for public Issue 02 preview'
            : 'removed from public preview'
        }.`
      );
    }
  };

  const handleAssignmentBadgeChange = async (id: string, publicStageLabel: PublicProductionBadge) => {
    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_assignment', id, publicStageLabel }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setAssignments((prev) => prev.map((item) => (item.id === id ? data.assignment : item)));
      flash(`Updated production stage label to "${publicStageLabel}".`);
    }
  };

  const handleAppendCorrection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!corrSlug || corrNote.trim().length < 10) return;
    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'append_correction',
        slug: corrSlug,
        kind: corrKind,
        note: corrNote,
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setCorrNote('');
      loadDesk();
      flash(`Appended transparent ${corrKind} to ${corrSlug} (signed by ${adminName}).`);
    }
  };

  const handlePitchStage = async (pitchId: string, workflowStage: EditorialWorkflowStage) => {
    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'update_pitch', pitchId, workflowStage }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setPitches((prev) => prev.map((p) => (p.id === pitchId ? data.pitch : p)));
      flash(`Pitch ${data.pitch.trackingCode} moved to ${workflowStage}.`);
    }
  };

  const updateMastheadDraft = (
    posId: string,
    patch: Partial<MastheadDraftEditState>
  ) => {
    setMastheadEdits((prev) => ({
      ...prev,
      [posId]: {
        ...prev[posId],
        ...patch,
      },
    }));
  };

  const handleSaveMastheadPosition = async (pos: MastheadPositionRecord) => {
    const draft = mastheadEdits[pos.id];
    if (!draft) return;
    setError(null);

    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'update_masthead_position',
        positionId: pos.id,
        roleTitle: draft.roleTitle,
        holderName: draft.holderName,
        domainsRubric: draft.domainsRubric,
        mandateDescription: draft.mandateDescription,
        status: draft.status,
        appointmentState: draft.appointmentState,
        verificationState: draft.verificationState,
        authorizationState: draft.authorizationState,
        publicationState: draft.publicationState,
        publicVacantLabel: draft.publicVacantLabel,
        internalAdminNote: draft.internalAdminNote,
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      await loadDesk();
      flash(
        `Masthead seat "${draft.roleTitle}" synchronized across registry (Appointment: ${draft.appointmentState} · Verification: ${draft.verificationState} · Publication: ${draft.publicationState})${
          draft.holderName ? ` — ${draft.holderName}` : ''
        }.`
      );
    } else {
      setError(data.error || 'Failed to update masthead appointment.');
    }
  };

  const handleCreateMastheadSeat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSeatRole.trim()) return;

    const res = await fetch('/api/himalayan-dispatch/admin', {
      method: 'PATCH',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'create_masthead_position',
        sectionId: newSeatSection,
        roleTitle: newSeatRole,
        holderName: newSeatHolder,
        domainsRubric: newSeatRubric || 'Editorial & Scientific Governance',
        mandateDescription:
          newSeatMandate || 'Supports the Himalayan Dispatch editorial governance framework.',
        status: newSeatStatus,
      }),
    });
    const data = await res.json();
    if (res.ok && data.success) {
      setNewSeatRole('');
      setNewSeatHolder('');
      setNewSeatRubric('');
      setNewSeatMandate('');
      setShowNewSeatForm(false);
      await loadDesk();
      flash(`Added new masthead seat "${data.position.roleTitle}" (${data.position.status}).`);
    } else {
      setError(data.error || 'Failed to create masthead seat.');
    }
  };

  const filteredMastheadPositions = mastheadPositions.filter((pos) => {
    if (mastheadSectionFilter !== 'all' && pos.sectionId !== mastheadSectionFilter) {
      return false;
    }
    if (mastheadStatusFilter !== 'all' && pos.status !== mastheadStatusFilter) {
      return false;
    }
    if (mastheadQuery.trim()) {
      const q = mastheadQuery.trim().toLowerCase();
      const hay = `${pos.roleTitle} ${pos.holderName} ${pos.illustrativePlanningName || ''} ${pos.domainsRubric} ${pos.mandateDescription}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });

  const publiclyNamedMastheadCount = mastheadPositions.filter(
    (p) => PUBLIC_NAMED_STATUSES.has(p.status) && p.holderName.trim().length > 0
  ).length;
  const unconfirmedOrVacantMastheadCount = mastheadPositions.filter(
    (p) => !PUBLIC_NAMED_STATUSES.has(p.status) || p.holderName.trim().length === 0
  ).length;

  // Combine founding masthead journalists + approved applicants for assignment dropdown
  const assignableRoster = [
    ...journalists.map((j) => ({ slug: j.slug, label: `${j.name} (${j.roleTitle})` })),
    ...applications
      .filter(
        (a) =>
          a.status === 'Approved' &&
          a.assignedJournalistSlug &&
          !journalists.some((j) => j.slug === a.assignedJournalistSlug)
      )
      .map((a) => ({
        slug: a.assignedJournalistSlug!,
        label: `${a.fullName} (${a.roleCategoryTitle} · Approved)`,
      })),
  ];

  const filteredApplications = applications.filter((a) => {
    if (appFilter === 'pending') {
      return (
        a.status === 'Submitted' ||
        a.status === 'Under Credential Review' ||
        a.status === 'Under Editorial Assessment' ||
        a.status === 'Additional Information Required'
      );
    }
    if (appFilter === 'approved') return a.status === 'Approved';
    if (appFilter === 'inactive') {
      return a.status === 'Declined' || a.status === 'Withdrawn' || a.status === 'Suspended';
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* HD-ANIE Autonomous Newsroom Intelligence Engine & Dual-Stream Editorial Workspace */}
      <HdAnieCommandCenter
        adminName={adminName}
        journalists={journalists}
        departments={departments}
        onDeskRefresh={loadDesk}
      />

      {/* Newsroom Command Banner */}
      <div className="rounded-2xl bg-slate-900 border border-amber-500/25 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Himalayan Dispatch — Editorial Onboarding, Workflow &amp; Source Protection Desk</span>
          </div>
          <h2 className="text-xl font-black text-white">
            Contributor Appointments, 10-Stage Magazine Production &amp; Confidential Slate
          </h2>
          <p className="text-xs text-slate-400">
            Final contributor approval rests with Founding Editor-in-Chief Dr. Fayaz Ahmad Khan or authorized editorial administrators. Private credentials, drafts, and confidential sources remain strictly off public routes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a href={HD_ROUTES.editorialBoard} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="border-amber-500/30 text-amber-200 text-xs">
              <span>Masthead &amp; Governance</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </a>
          <a href={HD_ROUTES.joinNewsroom} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="border-amber-500/30 text-amber-200 text-xs">
              <span>Join the Newsroom</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </a>
          <a href={HD_ROUTES.root} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm" className="border-white/15 text-slate-200 text-xs">
              <span>Open Magazine</span>
              <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </a>
          <Button variant="outline" size="sm" onClick={loadDesk} className="border-white/10 text-slate-300 text-xs">
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {notice && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          MASTHEAD & GOVERNANCE APPOINTMENTS MANAGER (SECTIONS I – IX)
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="rounded-2xl bg-slate-900/80 border border-amber-500/25 p-6 space-y-5">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold">
              EST. 2026 · KEW WESTERN HIMALAYAS · LANDSCAPE · PEOPLE · SCIENCE · TRUTH
            </p>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>
                Centralized Editorial Personnel &amp; Masthead Registry ({mastheadPositions.length} Seats ·{' '}
                {publiclyNamedMastheadCount} Verified Publicly · {unconfirmedOrVacantMastheadCount} Pending Verification / Vacant)
              </span>
            </h3>
            <p className="text-xs italic text-amber-200/90">
              Internal appointment planning roster. Names other than verified existing personnel remain subject to identity and appointment confirmation.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <Link href={HD_ROUTES.adminCorrespondence}>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-white/15 text-slate-200 text-xs"
              >
                <span>Correspondence Center</span>
                <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowNewSeatForm((v) => !v)}
              className="border-amber-500/35 text-amber-200 text-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>{showNewSeatForm ? 'Close New Seat Form' : 'Add Masthead Seat'}</span>
            </Button>
          </div>
        </div>

        {/* Organizational Roster Summary (Internal Planning Metrics + Strict Anti-Misrepresentation Gate) */}
        {mastheadRosterSummary && (
          <div className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/25 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                ORGANIZATIONAL ROSTER SUMMARY (INTERNAL APPOINTMENT PLANNING LEDGER)
              </span>
              <span className="text-[10px] font-mono text-emerald-300">
                Synchronized: Masthead · 6 Bureaus · Scientific Council · Public Editor · Portfolios · Correspondence
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              <div className="p-3 rounded-lg bg-slate-900 border border-white/10">
                <div className="text-xl font-black text-white tabular-nums">
                  {mastheadRosterSummary.totalDesignatedPositions}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                  Total designated positions
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-white/10">
                <div className="text-xl font-black text-white tabular-nums">
                  {mastheadRosterSummary.organizationalDivisions}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                  Organizational divisions
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-white/10">
                <div className="text-xl font-black text-amber-300 tabular-nums">
                  {mastheadRosterSummary.illustrativeMaleNames}{' '}
                  <span className="text-xs font-mono text-slate-400">
                    ({mastheadRosterSummary.illustrativeMalePct})
                  </span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                  Male names (Planning)
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-white/10">
                <div className="text-xl font-black text-amber-300 tabular-nums">
                  {mastheadRosterSummary.illustrativeFemaleNames}{' '}
                  <span className="text-xs font-mono text-slate-400">
                    ({mastheadRosterSummary.illustrativeFemalePct})
                  </span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                  Female names (Planning)
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-white/10">
                <div className="text-xl font-black text-white tabular-nums">
                  {mastheadRosterSummary.regionalBureaus}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                  Regional bureaus
                </div>
              </div>
              <div className="p-3 rounded-lg bg-slate-900 border border-white/10">
                <div className="text-xl font-black text-white tabular-nums">
                  {mastheadRosterSummary.scientificReviewPositions}
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
                  Scientific review positions
                </div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200 leading-relaxed flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Important:</strong> {mastheadRosterSummary.illustrativeDisclaimer} Server-side governance blocks public display unless <code>verificationState = verified</code> and a confirmed appointee name is entered.
              </span>
            </div>
          </div>
        )}

        {/* Optional Add New Masthead Seat Form */}
        {showNewSeatForm && (
          <form
            onSubmit={handleCreateMastheadSeat}
            className="p-4 rounded-xl bg-slate-950/90 border border-amber-500/30 grid grid-cols-1 md:grid-cols-12 gap-3 items-end"
          >
            <div className="md:col-span-3">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Directorate Section
              </label>
              <select
                value={newSeatSection}
                onChange={(e) => setNewSeatSection(e.target.value as MastheadSectionId)}
                className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-2 rounded"
              >
                {mastheadSections.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.romanNumeral} · {sec.directorateTitle}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-3">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Role Title *
              </label>
              <input
                type="text"
                required
                value={newSeatRole}
                onChange={(e) => setNewSeatRole(e.target.value)}
                placeholder="e.g., Senior Hydrology Editor"
                className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-2 rounded"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Appointee / Candidate Name
              </label>
              <input
                type="text"
                value={newSeatHolder}
                onChange={(e) => setNewSeatHolder(e.target.value)}
                placeholder="Leave blank if Vacant"
                className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-2 rounded"
              />
            </div>
            <div className="md:col-span-3">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Appointment Status
              </label>
              <select
                value={newSeatStatus}
                onChange={(e) => setNewSeatStatus(e.target.value as MastheadAppointmentStatus)}
                className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-2 rounded"
              >
                {ALL_MASTHEAD_STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-5">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Domains / Specialization Rubric
              </label>
              <input
                type="text"
                value={newSeatRubric}
                onChange={(e) => setNewSeatRubric(e.target.value)}
                placeholder="e.g., Cryosphere · Watershed Governance · Field Verification"
                className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-2 rounded"
              />
            </div>
            <div className="md:col-span-5">
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Mandate Description
              </label>
              <input
                type="text"
                value={newSeatMandate}
                onChange={(e) => setNewSeatMandate(e.target.value)}
                placeholder="Institutional responsibilities and editorial scope..."
                className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-2 rounded"
              />
            </div>
            <div className="md:col-span-2">
              <Button
                type="submit"
                size="sm"
                className="bg-amber-700 hover:bg-amber-600 text-white text-xs w-full"
              >
                Create Seat
              </Button>
            </div>
          </form>
        )}

        {/* Section, Status & Search Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className="md:col-span-4">
            <select
              value={mastheadSectionFilter}
              onChange={(e) =>
                setMastheadSectionFilter(e.target.value as 'all' | MastheadSectionId)
              }
              aria-label="Filter masthead positions by directorate section"
              className="w-full bg-slate-950 border border-white/15 text-xs text-white px-3 py-2 rounded"
            >
              <option value="all">All Directorate Sections (I–IX · {mastheadPositions.length})</option>
              {mastheadSections.map((sec) => (
                <option key={sec.id} value={sec.id}>
                  {sec.romanNumeral} · {sec.directorateTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={mastheadStatusFilter}
              onChange={(e) =>
                setMastheadStatusFilter(e.target.value as 'all' | MastheadAppointmentStatus)
              }
              aria-label="Filter masthead positions by appointment status"
              className="w-full bg-slate-950 border border-white/15 text-xs text-white px-3 py-2 rounded"
            >
              <option value="all">All Appointment Statuses</option>
              {ALL_MASTHEAD_STATUSES.map((st) => (
                <option key={st} value={st}>
                  {st} ({mastheadPositions.filter((p) => p.status === st).length})
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-5 relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={mastheadQuery}
              onChange={(e) => setMastheadQuery(e.target.value)}
              placeholder="Search masthead role, appointee name, or specialization..."
              className="w-full bg-slate-950 border border-white/15 text-xs text-white pl-8 pr-3 py-2 rounded"
            />
          </div>
        </div>

        {/* Position | Name Column Heading Bar */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-2.5 px-4 py-2 rounded-lg bg-slate-950 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
          <div className="lg:col-span-4">Position</div>
          <div className="lg:col-span-4">Name</div>
          <div className="lg:col-span-4">4-Axis Governance Status &amp; Sync</div>
        </div>

        {/* Scrollable Masthead Seats Ledger */}
        <div className="space-y-2.5 max-h-[620px] overflow-y-auto pr-1">
          {filteredMastheadPositions.map((pos) => {
            const secSpec = mastheadSections.find((s) => s.id === pos.sectionId);
            const draft = mastheadEdits[pos.id] || {
              roleTitle: pos.roleTitle,
              holderName: pos.holderName || '',
              domainsRubric: pos.domainsRubric,
              mandateDescription: pos.mandateDescription,
              status: pos.status,
              appointmentState: pos.appointmentState || 'vacant',
              verificationState: pos.verificationState || 'illustrative_unverified',
              authorizationState: pos.authorizationState || 'not_authorized',
              publicationState: pos.publicationState || 'public_vacant_pending',
              publicVacantLabel: pos.publicVacantLabel || '',
              internalAdminNote: pos.internalAdminNote || '',
              expanded: false,
            };
            const isPublicNamed =
              PUBLIC_NAMED_STATUSES.has(draft.status) &&
              draft.publicationState === 'published_verified' &&
              draft.holderName.trim().length > 0;

            return (
              <div
                key={pos.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-white/10 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-mono text-[10px] font-bold">
                      {secSpec ? `${secSpec.romanNumeral} · ${secSpec.directorateTitle}` : pos.sectionId}
                    </span>
                    {pos.bureauId && (
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px] font-bold uppercase">
                        Bureau: {pos.bureauId.toUpperCase()}{' '}
                        {pos.bureauOperationalStatus === 'in_establishment'
                          ? '· IN ESTABLISHMENT'
                          : '· ESTABLISHED DESK'}
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        isPublicNamed
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-amber-300'
                      }`}
                    >
                      {isPublicNamed
                        ? `Verified & Publicly Named (${draft.status})`
                        : `Publicly Vacant / Pending (${draft.verificationState.replace(/_/g, ' ')})`}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px]">
                    {pos.updatedAt && (
                      <span className="text-slate-500 font-mono">
                        Updated {new Date(pos.updatedAt).toLocaleDateString()} by {pos.updatedBy}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() =>
                        updateMastheadDraft(pos.id, { expanded: !draft.expanded })
                      }
                      className="text-amber-300 hover:underline cursor-pointer"
                    >
                      {draft.expanded ? 'Less Details' : 'Mandate & Notes'}
                    </button>
                  </div>
                </div>

                {/* Primary Row: Position | Name | Masthead Status + Save */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 items-start">
                  <div className="lg:col-span-4 space-y-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-400">
                      Position
                    </label>
                    <input
                      type="text"
                      value={draft.roleTitle}
                      onChange={(e) =>
                        updateMastheadDraft(pos.id, { roleTitle: e.target.value })
                      }
                      className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-1.5 rounded"
                    />
                    <div className="text-[10px] text-slate-500 truncate" title={draft.domainsRubric}>
                      {draft.domainsRubric}
                    </div>
                  </div>

                  <div className="lg:col-span-4 space-y-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-400">
                      Name (Confirmed / Verified Appointee Only)
                    </label>
                    <input
                      type="text"
                      value={draft.holderName}
                      onChange={(e) =>
                        updateMastheadDraft(pos.id, { holderName: e.target.value })
                      }
                      placeholder="Leave blank until identity & appointment confirmed"
                      className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-1.5 rounded"
                    />
                    {pos.illustrativePlanningName && draft.verificationState !== 'verified' && (
                      <div className="px-2 py-1 rounded bg-amber-950/40 border border-amber-500/25 text-[10px] text-amber-200/90 flex items-center justify-between gap-2">
                        <span>
                          Planning Roster: <strong>{pos.illustrativePlanningName}</strong>
                        </span>
                        <span className="font-mono uppercase text-[9px] text-amber-400 shrink-0">
                          Illustrative · Hidden Publicly
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-3 space-y-1">
                    <label className="block text-[10px] uppercase font-bold text-slate-400">
                      Masthead Designation
                    </label>
                    <select
                      value={draft.status}
                      onChange={(e) => {
                        const nextSt = e.target.value as MastheadAppointmentStatus;
                        const autoPatch: Partial<MastheadDraftEditState> = { status: nextSt };
                        if (nextSt === 'Vacant') {
                          autoPatch.appointmentState = 'vacant';
                          autoPatch.publicationState = 'public_vacant_pending';
                        } else if (nextSt === 'Under Review' || nextSt === 'Proposed') {
                          autoPatch.appointmentState = 'under_review';
                          autoPatch.publicationState = 'public_vacant_pending';
                        } else if (nextSt === 'Confirmed') {
                          autoPatch.appointmentState = 'appointed';
                        } else if (nextSt === 'Visiting') {
                          autoPatch.appointmentState = 'visiting';
                        } else if (nextSt === 'External Reviewer') {
                          autoPatch.appointmentState = 'external_reviewer';
                        } else if (nextSt === 'Former Member') {
                          autoPatch.appointmentState = 'former_member';
                          autoPatch.publicationState = 'public_vacant_pending';
                        }
                        updateMastheadDraft(pos.id, autoPatch);
                      }}
                      className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2 py-1.5 rounded"
                    >
                      {ALL_MASTHEAD_STATUSES.map((st) => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="lg:col-span-1 pt-4">
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => handleSaveMastheadPosition(pos)}
                      className="bg-amber-700 hover:bg-amber-600 text-white text-xs w-full"
                    >
                      Save
                    </Button>
                  </div>
                </div>

                {/* Four Separate Institutional Governance Status Axes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-white/5">
                  <div>
                    <label className="block text-[9px] font-mono uppercase text-slate-400 mb-1">
                      1. Appointment Status
                    </label>
                    <select
                      value={draft.appointmentState}
                      onChange={(e) =>
                        updateMastheadDraft(pos.id, {
                          appointmentState: e.target.value as PersonnelAppointmentState,
                        })
                      }
                      className="w-full bg-slate-900 border border-white/10 text-[11px] text-slate-200 px-2 py-1.5 rounded"
                    >
                      {ALL_APPOINTMENT_STATES.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase text-slate-400 mb-1">
                      2. Verification Status
                    </label>
                    <select
                      value={draft.verificationState}
                      onChange={(e) =>
                        updateMastheadDraft(pos.id, {
                          verificationState: e.target.value as PersonnelVerificationState,
                        })
                      }
                      className="w-full bg-slate-900 border border-white/10 text-[11px] text-slate-200 px-2 py-1.5 rounded"
                    >
                      {ALL_VERIFICATION_STATES.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase text-slate-400 mb-1">
                      3. Authorization Status
                    </label>
                    <select
                      value={draft.authorizationState}
                      onChange={(e) =>
                        updateMastheadDraft(pos.id, {
                          authorizationState: e.target.value as PersonnelAuthorizationState,
                        })
                      }
                      className="w-full bg-slate-900 border border-white/10 text-[11px] text-slate-200 px-2 py-1.5 rounded"
                    >
                      {ALL_AUTHORIZATION_STATES.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase text-slate-400 mb-1">
                      4. Publication Status
                    </label>
                    <select
                      value={draft.publicationState}
                      onChange={(e) =>
                        updateMastheadDraft(pos.id, {
                          publicationState: e.target.value as PersonnelPublicationState,
                        })
                      }
                      className="w-full bg-slate-900 border border-white/10 text-[11px] text-slate-200 px-2 py-1.5 rounded"
                    >
                      {ALL_PUBLICATION_STATES.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {draft.expanded && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 pt-2 border-t border-white/10">
                    <div className="lg:col-span-4">
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Specialization / Domains Rubric
                      </label>
                      <input
                        type="text"
                        value={draft.domainsRubric}
                        onChange={(e) =>
                          updateMastheadDraft(pos.id, { domainsRubric: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-1.5 rounded"
                      />
                    </div>
                    <div className="lg:col-span-4">
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Public Mandate Description
                      </label>
                      <textarea
                        rows={2}
                        value={draft.mandateDescription}
                        onChange={(e) =>
                          updateMastheadDraft(pos.id, { mandateDescription: e.target.value })
                        }
                        className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-1.5 rounded"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Vacant Fallback Label
                      </label>
                      <input
                        type="text"
                        value={draft.publicVacantLabel}
                        onChange={(e) =>
                          updateMastheadDraft(pos.id, { publicVacantLabel: e.target.value })
                        }
                        placeholder="Appointment Pending"
                        className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-1.5 rounded"
                      />
                    </div>
                    <div className="lg:col-span-2">
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Internal Governance Note
                      </label>
                      <input
                        type="text"
                        value={draft.internalAdminNote}
                        onChange={(e) =>
                          updateMastheadDraft(pos.id, { internalAdminNote: e.target.value })
                        }
                        placeholder="Private admin note..."
                        className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-1.5 rounded"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════
          CONTRIBUTOR RECRUITMENT & EDITORIAL ONBOARDING APPROVAL LEDGER
          ═══════════════════════════════════════════════════════════════════════ */}
      <div className="rounded-2xl bg-slate-900/80 border border-amber-500/20 p-6 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-amber-400" />
              <span>Contributor Recruitment &amp; Editorial Onboarding Applications ({applications.length})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Review credentials, request supplemental samples, record Founding Editor-in-Chief approval, or suspend access with full administrative audit logging.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `All (${applications.length})` },
              {
                id: 'pending',
                label: `In Review (${
                  applications.filter((a) =>
                    [
                      'Submitted',
                      'Under Credential Review',
                      'Under Editorial Assessment',
                      'Additional Information Required',
                    ].includes(a.status)
                  ).length
                })`,
              },
              {
                id: 'approved',
                label: `Approved (${applications.filter((a) => a.status === 'Approved').length})`,
              },
              {
                id: 'inactive',
                label: `Declined / Withdrawn / Suspended (${
                  applications.filter((a) =>
                    ['Declined', 'Withdrawn', 'Suspended'].includes(a.status)
                  ).length
                })`,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setAppFilter(tab.id as typeof appFilter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border ${
                  appFilter === tab.id
                    ? 'bg-amber-500/20 border-amber-400/40 text-amber-200'
                    : 'bg-slate-950 border-white/10 text-slate-400'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {filteredApplications.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-slate-400">
            No contributor applications match this filter. Applications submitted via{' '}
            <code>/himalayan-dispatch/join-newsroom</code> appear here immediately for credential and editorial review.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApplications.map((app) => {
              const dec = decisions[app.id] || {
                status: app.status,
                approvingAuthority: 'Founding Editor-in-Chief' as const,
                publicPortfolioApproved: app.publicPortfolioApproved,
                applicantFacingNote: app.applicantFacingNote || '',
                internalEditorialNote: app.internalEditorialNote || '',
                correspondenceDraft: '',
                auditOpen: false,
              };

              return (
                <div
                  key={app.id}
                  className="p-5 rounded-xl bg-slate-950/80 border border-white/10 space-y-4"
                >
                  {/* Top Metadata Row */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 font-mono text-[11px] font-bold">
                          {app.referenceNumber}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 text-[10px] font-bold uppercase">
                          {app.roleCategoryTitle}
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {app.track === 'regular_journalist'
                            ? 'Regular Newsroom Track'
                            : 'Specialist Contributor Track'}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            app.status === 'Approved'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : app.status === 'Suspended' || app.status === 'Declined'
                              ? 'bg-red-500/20 text-red-300'
                              : 'bg-sky-500/20 text-sky-300'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>

                      <div className="text-base font-bold text-white">
                        {app.fullName}{' '}
                        <span className="text-xs font-normal text-slate-400">
                          ({app.email} · {app.locationOrDistrict}
                          {app.kashmirDistrict ? ` · District: ${app.kashmirDistrict}` : ''})
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                        <a
                          href={app.portfolioUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-amber-300 hover:underline inline-flex items-center gap-1"
                        >
                          <span>Portfolio / Published Work</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <span>·</span>
                        <span>Charter Accepted: {app.charterAccepted ? 'Yes' : 'No'}</span>
                        <span>·</span>
                        <span>
                          Public Portfolio Consent: {app.publicPortfolioConsent ? 'Granted' : 'Withheld'}
                        </span>
                        {app.credentialAttachment && (
                          <>
                            <span>·</span>
                            <span className="text-emerald-300 inline-flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              Private Vault File: {app.credentialAttachment.fileName} (
                              {Math.round(app.credentialAttachment.sizeBytes / 1024)} KB · Non-Public)
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {app.status === 'Approved' && (
                      <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-[11px] space-y-1 shrink-0">
                        <div className="text-emerald-300 font-bold flex items-center gap-1.5">
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>Approved Newsroom Credentials Active</span>
                        </div>
                        <div className="text-slate-300 font-mono">
                          Access Code: {app.workspaceAccessCode}
                        </div>
                        {app.assignedJournalistSlug && app.publicPortfolioApproved && (
                          <a
                            href={HD_ROUTES.journalistPortfolio(app.assignedJournalistSlug)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-amber-300 hover:underline inline-flex items-center gap-1"
                          >
                            <span>{HD_ROUTES.journalistPortfolio(app.assignedJournalistSlug)}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Background & Motivation */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs text-slate-300 bg-slate-900/60 p-3.5 rounded-lg border border-white/5">
                    <div>
                      <span className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                        Professional Background &amp; Credentials
                      </span>
                      <p className="leading-relaxed">{app.professionalBackground}</p>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold uppercase text-slate-400 mb-1">
                        Editorial Motivation &amp; Proposed Reporting Focus
                      </span>
                      <p className="leading-relaxed">{app.motivationStatement}</p>
                    </div>
                  </div>

                  {/* Governance Decision Controls */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end pt-1">
                    <div className="lg:col-span-3">
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Application Status (8 Stages)
                      </label>
                      <select
                        value={dec.status}
                        onChange={(e) =>
                          updateDecisionField(app.id, {
                            status: e.target.value as NewsroomApplicationStatus,
                          })
                        }
                        className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-2 rounded"
                      >
                        {ALL_APPLICATION_STATUSES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="lg:col-span-3">
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Approving Authority
                      </label>
                      <select
                        value={dec.approvingAuthority}
                        onChange={(e) =>
                          updateDecisionField(app.id, {
                            approvingAuthority: e.target.value as
                              | 'Founding Editor-in-Chief'
                              | 'Editorial Administrator',
                          })
                        }
                        className="w-full bg-slate-900 border border-white/15 text-xs text-white px-2.5 py-2 rounded"
                      >
                        <option value="Founding Editor-in-Chief">
                          Dr. Fayaz Ahmad Khan · Founding Editor-in-Chief
                        </option>
                        <option value="Editorial Administrator">
                          Authorized Editorial Administrator
                        </option>
                      </select>
                    </div>

                    <div className="lg:col-span-4">
                      <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                        Applicant-Facing Decision / Status Note
                      </label>
                      <input
                        type="text"
                        value={dec.applicantFacingNote}
                        onChange={(e) =>
                          updateDecisionField(app.id, { applicantFacingNote: e.target.value })
                        }
                        placeholder="Note shown in secure Application Status lookup..."
                        className="w-full bg-slate-900 border border-white/15 text-xs text-white px-3 py-2 rounded"
                      />
                    </div>

                    <div className="lg:col-span-2 flex flex-col gap-2">
                      <label className="inline-flex items-center gap-1.5 text-[11px] text-slate-300 cursor-pointer">
                        <input
                          type="checkbox"
                          disabled={!app.publicPortfolioConsent || dec.status !== 'Approved'}
                          checked={dec.publicPortfolioApproved && app.publicPortfolioConsent}
                          onChange={(e) =>
                            updateDecisionField(app.id, {
                              publicPortfolioApproved: e.target.checked,
                            })
                          }
                        />
                        <span>Approve Public Portfolio</span>
                      </label>

                      <Button
                        type="button"
                        size="sm"
                        onClick={() => handleSaveApplicationDecision(app)}
                        className="bg-amber-700 hover:bg-amber-600 text-white text-xs w-full"
                      >
                        Record Decision
                      </Button>
                    </div>
                  </div>

                  {/* Correspondence & Audit Trail Footer */}
                  <div className="pt-3 border-t border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                    <div className="flex-1 flex items-center gap-2">
                      <input
                        type="text"
                        value={dec.correspondenceDraft}
                        onChange={(e) =>
                          updateDecisionField(app.id, { correspondenceDraft: e.target.value })
                        }
                        placeholder="Send direct Commissioning Desk message to applicant / journalist workspace..."
                        className="flex-1 bg-slate-900 border border-white/10 text-xs text-white px-3 py-1.5 rounded"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendEditorCorrespondence(app)}
                        className="border-white/15 text-slate-200 text-xs shrink-0"
                      >
                        <MessageSquare className="w-3.5 h-3.5 mr-1" />
                        <span>Send Note ({app.correspondence.length})</span>
                      </Button>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        updateDecisionField(app.id, { auditOpen: !dec.auditOpen })
                      }
                      className="text-[11px] text-amber-300 hover:underline inline-flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <History className="w-3.5 h-3.5" />
                      <span>
                        {dec.auditOpen ? 'Hide' : 'Inspect'} Administrative Audit Trail ({app.auditTrail.length})
                      </span>
                    </button>
                  </div>

                  {dec.auditOpen && (
                    <div className="p-3.5 rounded-lg bg-slate-900 border border-white/10 space-y-2">
                      <div className="text-[10px] font-bold uppercase text-amber-300">
                        Immutable Administrative Audit Log
                      </div>
                      {app.auditTrail.map((entry) => (
                        <div
                          key={entry.id}
                          className="text-[11px] text-slate-300 border-b border-white/5 pb-1.5 last:border-none"
                        >
                          <span className="font-mono text-slate-400">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>{' '}
                          · <strong>{entry.authorityTitle}</strong> ({entry.actor}) ·{' '}
                          <span className="text-amber-300">
                            {entry.fromStatus} → {entry.toStatus}
                          </span>{' '}
                          — {entry.note}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Commission Story Assignment to Approved Journalist + Private Drafts Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6 rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Stage 02 · Commission Story Assignment to Approved Journalist
          </h3>
          <form onSubmit={handleCreateAssignment} className="space-y-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Assign to Approved Journalist</label>
              <select
                value={assignJournalistSlug}
                onChange={(e) => setAssignJournalistSlug(e.target.value)}
                className="w-full bg-slate-950 border border-white/15 text-xs text-white px-3 py-2 rounded"
              >
                {assignableRoster.map((r) => (
                  <option key={r.slug} value={r.slug}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Department</label>
                <select
                  value={assignDept}
                  onChange={(e) => setAssignDept(e.target.value as EditorialDepartmentId)}
                  className="w-full bg-slate-950 border border-white/15 text-xs text-white px-3 py-2 rounded"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">District / Region</label>
                <input
                  type="text"
                  value={assignRegion}
                  onChange={(e) => setAssignRegion(e.target.value)}
                  className="w-full bg-slate-950 border border-white/15 text-xs text-white px-3 py-2 rounded"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Working Headline *</label>
              <input
                type="text"
                required
                value={assignTitle}
                onChange={(e) => setAssignTitle(e.target.value)}
                placeholder="Commissioned story working title..."
                className="w-full bg-slate-950 border border-white/15 text-xs text-white px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Editorial Brief / Synopsis</label>
              <textarea
                rows={2}
                value={assignSynopsis}
                onChange={(e) => setAssignSynopsis(e.target.value)}
                placeholder="Reporting scope, sources, and expected filing window..."
                className="w-full bg-slate-950 border border-white/15 text-xs text-white px-3 py-2 rounded"
              />
            </div>

            <label className="inline-flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={assignConfidential}
                onChange={(e) => setAssignConfidential(e.target.checked)}
              />
              <span>Confidential / Source-Protected Investigation (Lock off public preview)</span>
            </label>

            <div>
              <Button type="submit" size="sm" className="bg-amber-700 hover:bg-amber-600 text-white text-xs">
                <Plus className="w-3.5 h-3.5 mr-1" />
                <span>Assign Commission</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Private Manuscripts Filed from Journalist Workspace */}
        <div className="lg:col-span-6 rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Stage 03–05 · Private Journalist Manuscripts ({journalistDrafts.length})
          </h3>
          <p className="text-xs text-slate-400">
            Manuscripts drafted inside <code>/himalayan-dispatch/journalist-sign-in</code> are quarantined here for fact-checking and KEW scientific review—never exposed publicly.
          </p>
          {journalistDrafts.length === 0 ? (
            <div className="p-4 rounded-xl bg-slate-950/60 border border-white/10 text-xs text-slate-400">
              No private journalist manuscripts filed yet.
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1">
              {journalistDrafts.map((d) => (
                <div
                  key={d.id}
                  className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-300">
                    <span>Author Slug: {d.journalistSlug}</span>
                    <span>
                      {d.wordCount} words · {d.workflowStage}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-white">{d.workingTitle}</div>
                  {d.subtitle && <div className="text-[11px] text-slate-400">{d.subtitle}</div>}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Forthcoming Issue 02 & Confidential Investigations Ledger */}
      <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Issue 02 Forthcoming Slate &amp; Confidential Investigations ({assignments.length})
          </h3>
          <span className="text-[11px] font-mono text-amber-300">
            Publicly Approved: {assignments.filter((a) => a.publicPreviewApproved && !a.isConfidential).length} · Restricted: {assignments.filter((a) => a.isConfidential).length}
          </span>
        </div>

        <div className="space-y-3">
          {assignments.map((a) => {
            const lockedConfidential = a.isConfidential || a.sourceProtectionLevel === 'strict_confidential';
            return (
              <div
                key={a.id}
                className={`p-4 rounded-xl border flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  lockedConfidential
                    ? 'bg-red-950/20 border-red-500/30'
                    : 'bg-slate-950/70 border-white/10'
                }`}
              >
                <div className="space-y-1 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    {lockedConfidential ? (
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px] font-bold uppercase inline-flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Strict Source Protection · Off Public Ledger
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 text-[10px] font-bold uppercase">
                        Standard On-Record Commission
                      </span>
                    )}
                    <span className="text-[11px] text-slate-400 font-mono">{a.departmentLabel}</span>
                  </div>
                  <div className="text-sm font-bold text-white">{a.workingTitle}</div>
                  <p className="text-xs text-slate-400">{a.synopsis}</p>
                  {a.internalDeskNotes && (
                    <p className="text-[11px] text-amber-300/90 font-mono pt-1">
                      Desk Note: {a.internalDeskNotes}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <select
                    value={a.publicStageLabel}
                    onChange={(e) =>
                      handleAssignmentBadgeChange(a.id, e.target.value as PublicProductionBadge)
                    }
                    className="bg-slate-900 border border-white/15 text-xs text-slate-200 px-2.5 py-1.5 rounded"
                  >
                    {PUBLIC_BADGES.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>

                  {lockedConfidential ? (
                    <span className="px-3 py-1.5 rounded bg-slate-900 border border-red-500/30 text-[11px] text-red-300 inline-flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>Public Preview Locked</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleTogglePreviewApproval(a)}
                      className={`px-3 py-1.5 rounded text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer border ${
                        a.publicPreviewApproved
                          ? 'bg-emerald-600/20 border-emerald-500/40 text-emerald-300'
                          : 'bg-slate-800 border-white/10 text-slate-400'
                      }`}
                    >
                      {a.publicPreviewApproved ? (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>Shown in Coming Next</span>
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>Hidden</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Story Workflow & Post-Publication Corrections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Edition Stories — 10-Stage Workflow Control ({stories.length})</span>
          </h3>

          <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
            {stories.map((st) => (
              <div
                key={st.id}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-bold text-white">{st.title}</div>
                  <div className="text-[11px] text-slate-400">
                    {st.bylineDisplay} · {st.departmentRubric} ·{' '}
                    <span className={st.isPublished ? 'text-emerald-400' : 'text-amber-400'}>
                      {st.isPublished ? 'Public' : 'Withheld / In Pipeline'}
                    </span>
                  </div>
                </div>

                <select
                  value={st.workflowStage}
                  onChange={(e) =>
                    handleStoryStageChange(st.slug, e.target.value as EditorialWorkflowStage)
                  }
                  className="bg-slate-900 border border-white/15 text-xs text-slate-200 px-2.5 py-1.5 rounded shrink-0"
                >
                  {EDITORIAL_WORKFLOW_STAGES.map((stg) => (
                    <option key={stg.id} value={stg.id}>
                      {stg.stepNumber}. {stg.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Corrections Ledger Form */}
        <div className="lg:col-span-5 rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Stage 09 · Append Public Clarification / Correction
          </h3>
          <form onSubmit={handleAppendCorrection} className="space-y-3">
            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Published Story</label>
              <select
                value={corrSlug}
                onChange={(e) => setCorrSlug(e.target.value)}
                className="w-full bg-slate-950 border border-white/15 text-xs text-white px-3 py-2 rounded"
              >
                {stories.map((s) => (
                  <option key={s.slug} value={s.slug}>
                    {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Notice Classification</label>
              <select
                value={corrKind}
                onChange={(e) => setCorrKind(e.target.value as 'Clarification' | 'Correction' | 'Editorial Update')}
                className="w-full bg-slate-950 border border-white/15 text-xs text-white px-3 py-2 rounded"
              >
                <option value="Clarification">Clarification</option>
                <option value="Correction">Correction</option>
                <option value="Editorial Update">Editorial Update</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] text-slate-400 mb-1">Transparent Standards Note</label>
              <textarea
                rows={4}
                value={corrNote}
                onChange={(e) => setCorrNote(e.target.value)}
                placeholder="State the exact empirical clarification or correction appended to the foot of the article..."
                className="w-full bg-slate-950 border border-white/15 text-xs text-white px-3 py-2 rounded"
              />
            </div>

            <Button type="submit" size="sm" className="bg-amber-700 hover:bg-amber-600 text-white text-xs">
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Publish Standards Notice</span>
            </Button>
          </form>
        </div>
      </div>

      {/* Incoming Reader & Journalist Pitches */}
      <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Stage 01 · Incoming Commissioning Pitches ({pitches.length})
        </h3>
        {pitches.length === 0 ? (
          <p className="text-xs text-slate-400">
            No reader or freelancer pitches pending triage yet. Submissions from /himalayan-dispatch/pitch appear here automatically.
          </p>
        ) : (
          <div className="space-y-3">
            {pitches.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-xl bg-slate-950/70 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-amber-300">
                    <span>{p.trackingCode}</span>
                    <span>·</span>
                    <span>{p.region}</span>
                    {p.requiresSourceProtection && (
                      <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-300">
                        Encrypted Handoff Requested
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-bold text-white">{p.proposedHeadline}</div>
                  <p className="text-xs text-slate-400">{p.storySummary}</p>
                  <p className="text-[11px] text-slate-500">
                    Contributor: {p.authorName} ({p.authorEmail})
                  </p>
                </div>

                <select
                  value={p.workflowStage}
                  onChange={(e) =>
                    handlePitchStage(p.id, e.target.value as EditorialWorkflowStage)
                  }
                  className="bg-slate-900 border border-white/15 text-xs text-slate-200 px-2.5 py-1.5 rounded shrink-0"
                >
                  {EDITORIAL_WORKFLOW_STAGES.map((stg) => (
                    <option key={stg.id} value={stg.id}>
                      {stg.stepNumber}. {stg.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
