import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/seo/admin-session';
import { isExecutiveOrAdmin, resolveHdnRequestAccount } from '@/lib/hdn/rbac';
import { readHdnStore } from '@/lib/hdn/store';
import {
  adminAppendStoryCorrection,
  adminCreateEditorialAssignment,
  adminCreateMastheadPosition,
  adminGenerateAutonomousDraftFromSignal,
  adminMutateAutonomousQueueItem,
  adminRunAutonomousSourceScan,
  adminSendApplicationCorrespondence,
  adminUpdateApplicationStatus,
  adminUpdateAssignment,
  adminUpdateMastheadPosition,
  adminUpdatePitchStage,
  adminUpdateStoryWorkflow,
  getAdminAutonomousEngineBundle,
  getAdminDispatchBundle,
} from '@/lib/himalayan-dispatch-store';
import {
  EditorialDepartmentId,
  EditorialWorkflowStage,
  MastheadAppointmentStatus,
  MastheadSectionId,
  NewsroomApplicationStatus,
  PersonnelAppointmentState,
  PersonnelAuthorizationState,
  PersonnelPublicationState,
  PersonnelVerificationState,
  PublicProductionBadge,
  StoryCorrectionEntry,
} from '@/types/himalayan-dispatch';

const VALID_APPLICATION_STATUSES = new Set<NewsroomApplicationStatus>([
  'Submitted',
  'Under Credential Review',
  'Under Editorial Assessment',
  'Additional Information Required',
  'Approved',
  'Declined',
  'Withdrawn',
  'Suspended',
]);

const VALID_MASTHEAD_STATUSES = new Set<MastheadAppointmentStatus>([
  'Confirmed',
  'Vacant',
  'Proposed',
  'Under Review',
  'Visiting',
  'External Reviewer',
  'Former Member',
]);

const VALID_MASTHEAD_SECTIONS = new Set<MastheadSectionId>([
  'I_leadership',
  'II_commissioning',
  'III_visual',
  'IV_bureaus',
  'V_scientific_council',
  'VI_standards',
  'VII_legal_safety',
  'VIII_public_editor',
  'IX_digital_publishing',
]);

async function verifyDispatchOrKewAdmin(
  request: NextRequest
): Promise<{ authorized: boolean; actor: string }> {
  const kewAuth = await verifyAdminRequest(request);
  if (kewAuth.authorized) {
    return { authorized: true, actor: kewAuth.actor };
  }
  const hdnStore = readHdnStore();
  const hdnAuth = await resolveHdnRequestAccount(request, () => hdnStore.accounts);
  if (hdnAuth.authenticated && hdnAuth.account && isExecutiveOrAdmin(hdnAuth.account)) {
    return { authorized: true, actor: hdnAuth.account.fullName };
  }
  return { authorized: false, actor: 'anonymous' };
}

export async function GET(request: NextRequest) {
  const authResult = await verifyDispatchOrKewAdmin(request);
  if (!authResult.authorized) {
    return NextResponse.json(
      {
        success: false,
        error:
          'Unauthorized: Himalayan Dispatch Newsroom Desk requires verified Editorial Directorate or KEW Administrator credentials.',
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    actor: authResult.actor,
    ...getAdminDispatchBundle(),
    autonomousEngine: getAdminAutonomousEngineBundle(),
  });
}

export async function PATCH(request: NextRequest) {
  const authResult = await verifyDispatchOrKewAdmin(request);
  if (!authResult.authorized) {
    return NextResponse.json(
      {
        success: false,
        error:
          'Unauthorized: Administrator session required to modify editorial workflow, approvals, or source flags.',
      },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const action = String(body?.action || '');

    if (action === 'update_story_stage') {
      const updated = adminUpdateStoryWorkflow(
        String(body.slug || ''),
        body.workflowStage as EditorialWorkflowStage
      );
      if (!updated) {
        return NextResponse.json({ success: false, error: 'Story not found.' }, { status: 404 });
      }
      return NextResponse.json({ success: true, story: updated });
    }

    if (action === 'append_correction') {
      const note = String(body.note || '').trim();
      if (note.length < 10) {
        return NextResponse.json(
          { success: false, error: 'Correction text must be at least 10 characters.' },
          { status: 400 }
        );
      }
      const corr = adminAppendStoryCorrection(
        String(body.slug || ''),
        (body.kind as StoryCorrectionEntry['kind']) || 'Clarification',
        note,
        authResult.actor
      );
      if (!corr) {
        return NextResponse.json({ success: false, error: 'Story not found.' }, { status: 404 });
      }
      return NextResponse.json({ success: true, correction: corr });
    }

    if (action === 'update_assignment') {
      const updated = adminUpdateAssignment(String(body.id || ''), {
        workflowStage: body.workflowStage as EditorialWorkflowStage | undefined,
        publicStageLabel: body.publicStageLabel as PublicProductionBadge | undefined,
        bylineDisplay: body.bylineDisplay !== undefined ? String(body.bylineDisplay) : undefined,
        publicPreviewApproved:
          typeof body.publicPreviewApproved === 'boolean' ? body.publicPreviewApproved : undefined,
        isConfidential:
          typeof body.isConfidential === 'boolean' ? body.isConfidential : undefined,
      });
      if (!updated) {
        return NextResponse.json(
          { success: false, error: 'Assignment not found.' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, assignment: updated });
    }

    if (action === 'create_assignment') {
      const workingTitle = String(body.workingTitle || '').trim();
      const journalistSlug = String(body.journalistSlug || '').trim();
      if (!workingTitle || !journalistSlug) {
        return NextResponse.json(
          { success: false, error: 'Working title and assigned journalist are required.' },
          { status: 400 }
        );
      }
      const created = adminCreateEditorialAssignment({
        workingTitle,
        synopsis: String(body.synopsis || 'Commissioned via Himalayan Dispatch Newsroom Desk.'),
        departmentId: (body.departmentId || 'field-reports') as EditorialDepartmentId,
        editionSlug: String(body.editionSlug || 'issue-02-a-world-in-transition'),
        journalistSlug,
        bylineDisplay: String(body.bylineDisplay || 'Assigned Correspondent'),
        region: String(body.region || 'Western Himalayas'),
        isConfidential: Boolean(body.isConfidential),
      });
      return NextResponse.json({ success: true, assignment: created });
    }

    if (action === 'update_pitch') {
      const updated = adminUpdatePitchStage(
        String(body.pitchId || ''),
        body.workflowStage as EditorialWorkflowStage,
        body.reviewNotes !== undefined ? String(body.reviewNotes) : undefined
      );
      if (!updated) {
        return NextResponse.json({ success: false, error: 'Pitch not found.' }, { status: 404 });
      }
      return NextResponse.json({ success: true, pitch: updated });
    }

    if (action === 'update_application_status') {
      const applicationId = String(body.applicationId || '');
      const status = body.status as NewsroomApplicationStatus;
      if (!applicationId || !VALID_APPLICATION_STATUSES.has(status)) {
        return NextResponse.json(
          { success: false, error: 'Valid applicationId and target status are required.' },
          { status: 400 }
        );
      }

      const updated = adminUpdateApplicationStatus(
        applicationId,
        {
          status,
          applicantFacingNote:
            body.applicantFacingNote !== undefined ? String(body.applicantFacingNote) : undefined,
          internalEditorialNote:
            body.internalEditorialNote !== undefined
              ? String(body.internalEditorialNote)
              : undefined,
          publicPortfolioApproved:
            typeof body.publicPortfolioApproved === 'boolean'
              ? body.publicPortfolioApproved
              : undefined,
          approvingAuthority:
            body.approvingAuthority === 'Editorial Administrator'
              ? 'Editorial Administrator'
              : 'Founding Editor-in-Chief',
        },
        authResult.actor
      );
      if (!updated) {
        return NextResponse.json(
          { success: false, error: 'Contributor application not found.' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        application: {
          ...updated,
          credentialAttachment: updated.credentialAttachment
            ? {
                ...updated.credentialAttachment,
                privateStorageKey: '[PROTECTED_SERVER_VAULT]',
              }
            : undefined,
        },
      });
    }

    if (action === 'send_editor_correspondence') {
      const applicationId = String(body.applicationId || '');
      const message = String(body.message || '').trim();
      if (!applicationId || message.length < 4) {
        return NextResponse.json(
          { success: false, error: 'Application ID and message are required.' },
          { status: 400 }
        );
      }
      const updated = adminSendApplicationCorrespondence(
        applicationId,
        message,
        authResult.actor,
        body.senderTitle
          ? String(body.senderTitle)
          : 'Dr. Fayaz Ahmad Khan · Founding Editor-in-Chief'
      );
      if (!updated) {
        return NextResponse.json(
          { success: false, error: 'Contributor application not found.' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true });
    }

    if (action === 'update_masthead_position') {
      const positionId = String(body.positionId || '').trim();
      if (!positionId) {
        return NextResponse.json(
          { success: false, error: 'Valid masthead positionId is required.' },
          { status: 400 }
        );
      }
      const nextStatus =
        body.status !== undefined ? (String(body.status) as MastheadAppointmentStatus) : undefined;
      if (nextStatus !== undefined && !VALID_MASTHEAD_STATUSES.has(nextStatus)) {
        return NextResponse.json(
          { success: false, error: 'Unsupported masthead appointment status.' },
          { status: 400 }
        );
      }

      let updated;
      try {
        updated = adminUpdateMastheadPosition(
          positionId,
          {
            roleTitle: body.roleTitle !== undefined ? String(body.roleTitle) : undefined,
            holderName: body.holderName !== undefined ? String(body.holderName) : undefined,
            domainsRubric:
              body.domainsRubric !== undefined ? String(body.domainsRubric) : undefined,
            mandateDescription:
              body.mandateDescription !== undefined ? String(body.mandateDescription) : undefined,
            status: nextStatus,
            appointmentState:
              body.appointmentState !== undefined
                ? (String(body.appointmentState) as PersonnelAppointmentState)
                : undefined,
            verificationState:
              body.verificationState !== undefined
                ? (String(body.verificationState) as PersonnelVerificationState)
                : undefined,
            authorizationState:
              body.authorizationState !== undefined
                ? (String(body.authorizationState) as PersonnelAuthorizationState)
                : undefined,
            publicationState:
              body.publicationState !== undefined
                ? (String(body.publicationState) as PersonnelPublicationState)
                : undefined,
            journalistSlug:
              body.journalistSlug !== undefined ? String(body.journalistSlug) : undefined,
            publicVacantLabel:
              body.publicVacantLabel !== undefined ? String(body.publicVacantLabel) : undefined,
            internalAdminNote:
              body.internalAdminNote !== undefined ? String(body.internalAdminNote) : undefined,
          },
          authResult.actor
        );
      } catch (govErr: any) {
        return NextResponse.json(
          {
            success: false,
            error: govErr?.message || 'Masthead governance verification gate blocked update.',
          },
          { status: 400 }
        );
      }

      if (!updated) {
        return NextResponse.json(
          { success: false, error: 'Masthead position not found.' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, position: updated });
    }

    if (action === 'create_masthead_position') {
      const sectionId = String(body.sectionId || '') as MastheadSectionId;
      const roleTitle = String(body.roleTitle || '').trim();
      const status = (body.status || 'Vacant') as MastheadAppointmentStatus;
      if (!VALID_MASTHEAD_SECTIONS.has(sectionId) || !roleTitle) {
        return NextResponse.json(
          { success: false, error: 'Valid sectionId and roleTitle are required.' },
          { status: 400 }
        );
      }
      if (!VALID_MASTHEAD_STATUSES.has(status)) {
        return NextResponse.json(
          { success: false, error: 'Unsupported masthead appointment status.' },
          { status: 400 }
        );
      }
      const created = adminCreateMastheadPosition(
        {
          sectionId,
          roleTitle,
          holderName: body.holderName !== undefined ? String(body.holderName) : '',
          domainsRubric: String(body.domainsRubric || 'Editorial & Scientific Governance'),
          mandateDescription: String(
            body.mandateDescription || 'Supports the Himalayan Dispatch editorial mandate.'
          ),
          status,
          publicVacantLabel:
            body.publicVacantLabel !== undefined ? String(body.publicVacantLabel) : undefined,
          isCouncilSpecialistRow: Boolean(body.isCouncilSpecialistRow),
          internalAdminNote:
            body.internalAdminNote !== undefined ? String(body.internalAdminNote) : undefined,
        },
        authResult.actor
      );
      return NextResponse.json({ success: true, position: created });
    }

    if (action === 'run_autonomous_scan') {
      const scan = adminRunAutonomousSourceScan(authResult.actor);
      return NextResponse.json({ success: true, scan });
    }

    if (action === 'generate_autonomous_draft') {
      const signalId = String(body.signalId || '').trim();
      const targetChannel =
        body.targetChannel === 'monthly_edition' ? 'monthly_edition' : 'daily_dispatch';
      const created = adminGenerateAutonomousDraftFromSignal(
        signalId,
        targetChannel,
        authResult.actor
      );
      if (!created) {
        return NextResponse.json(
          { success: false, error: 'Source signal not found.' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, item: created });
    }

    if (action === 'mutate_autonomous_item') {
      const itemId = String(body.itemId || '').trim();
      const subAction = String(body.subAction || 'edit') as
        | 'edit'
        | 'schedule'
        | 'publish'
        | 'reject'
        | 'trash'
        | 'restore'
        | 'assign';
      const updated = adminMutateAutonomousQueueItem(
        itemId,
        {
          action: subAction,
          workingHeadline:
            body.workingHeadline !== undefined ? String(body.workingHeadline) : undefined,
          standfirst: body.standfirst !== undefined ? String(body.standfirst) : undefined,
          draftBodyJoined:
            body.draftBodyJoined !== undefined ? String(body.draftBodyJoined) : undefined,
          scheduledFor: body.scheduledFor !== undefined ? String(body.scheduledFor) : undefined,
          assignedJournalistSlug:
            body.assignedJournalistSlug !== undefined
              ? String(body.assignedJournalistSlug)
              : undefined,
          editorialDecisionNote:
            body.editorialDecisionNote !== undefined
              ? String(body.editorialDecisionNote)
              : undefined,
        },
        authResult.actor
      );
      if (!updated) {
        return NextResponse.json(
          { success: false, error: 'Autonomous queue item not found.' },
          { status: 404 }
        );
      }
      return NextResponse.json({
        success: true,
        item: updated,
        autonomousEngine: getAdminAutonomousEngineBundle(),
      });
    }

    return NextResponse.json(
      { success: false, error: 'Unsupported editorial action.' },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update Himalayan Dispatch newsroom store.' },
      { status: 500 }
    );
  }
}
