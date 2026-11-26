import { NextRequest, NextResponse } from 'next/server';
import {
  hasPermission,
  isExecutiveOrAdmin,
  resolveHdnRequestAccount,
} from '@/lib/hdn/rbac';
import {
  pushHdnNotification,
  readHdnStore,
  recordHdnAudit,
  writeHdnStore,
} from '@/lib/hdn/store';
import {
  adminUpdatePitchStage,
  readDispatchStore,
  submitEditorialPitch,
} from '@/lib/himalayan-dispatch-store';
import { EDITORIAL_DEPARTMENTS, REGIONAL_REPORTING_BUREAUS } from '@/data/himalayan-dispatch';
import { REPORTING_BEATS_FULL } from '@/data/himalayan-dispatch-autonomous';
import type { BureauSlugId, EditorialDepartmentId } from '@/types/himalayan-dispatch';
import type {
  HdnEditorialAssignment,
  HdnPriorityLevel,
  HdnPublicationStream,
} from '@/types/hdn-newsroom';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  const store = readHdnStore();
  const { authenticated, account } = await resolveHdnRequestAccount(
    request,
    () => store.accounts
  );

  if (!authenticated || !account) {
    return NextResponse.json(
      { success: false, error: 'Authenticated newsroom session required.' },
      { status: 401 }
    );
  }

  const sp = request.nextUrl.searchParams;
  const mineOnly = sp.get('mine') === '1';
  const assignmentId = sp.get('id');
  const bureauFilter = sp.get('bureau');

  let visible = store.assignments.filter((asg) => {
    if (isExecutiveOrAdmin(account) || account.roles.includes('managing_editor')) return true;
    if (asg.assignedJournalistSlug === account.slug || asg.responsibleEditorSlug === account.slug) {
      return true;
    }
    if (asg.isConfidential) return false;
    if (account.roles.includes('bureau_chief') && account.assignedBureaus.includes(asg.bureauId)) {
      return true;
    }
    if (
      (account.roles.includes('department_editor') ||
        account.roles.includes('commissioning_editor')) &&
      (account.assignedDepartments.length === 0 ||
        account.assignedDepartments.includes(asg.departmentId))
    ) {
      return true;
    }
    return false;
  });

  if (mineOnly) {
    visible = visible.filter((a) => a.assignedJournalistSlug === account.slug);
  }
  if (bureauFilter && bureauFilter !== 'all') {
    visible = visible.filter((a) => a.bureauId === bureauFilter);
  }
  if (assignmentId) {
    const found = visible.find((a) => a.id === assignmentId);
    if (!found) {
      return NextResponse.json(
        { success: false, error: 'Assignment not found or restricted.' },
        { status: 404 }
      );
    }
    return NextResponse.json({
      success: true,
      assignment: found,
      journalists: store.accounts
        .filter((a) => a.status === 'active' && !a.roles.includes('autonomous_ai_engine'))
        .map((a) => ({ slug: a.slug, fullName: a.fullName, roleTitle: a.primaryRoleTitle, bureaus: a.assignedBureaus })),
    });
  }

  const legacyStore = readDispatchStore();
  const visiblePitches = hasPermission(account, 'pitch:evaluate')
    ? legacyStore.pitches
    : legacyStore.pitches.filter(
        (p) =>
          p.journalistSlug === account.slug ||
          p.authorEmail.toLowerCase() === account.email.toLowerCase()
      );

  return NextResponse.json({
    success: true,
    assignments: visible,
    pitches: visiblePitches,
    journalists: store.accounts
      .filter((a) => a.status === 'active' && !a.roles.includes('autonomous_ai_engine'))
      .map((a) => ({
        slug: a.slug,
        fullName: a.fullName,
        roleTitle: a.primaryRoleTitle,
        bureaus: a.assignedBureaus,
      })),
    bureaus: REGIONAL_REPORTING_BUREAUS,
    departments: EDITORIAL_DEPARTMENTS,
    beats: REPORTING_BEATS_FULL,
    editions: store.editions,
  });
}

export async function POST(request: NextRequest) {
  const store = readHdnStore();
  const { authenticated, account } = await resolveHdnRequestAccount(
    request,
    () => store.accounts
  );

  if (!authenticated || !account) {
    return NextResponse.json(
      { success: false, error: 'Authenticated newsroom session required.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    // Journalist or Contributor submitting a Story Pitch
    if (body?.action === 'submit_pitch') {
      if (!hasPermission(account, 'pitch:create')) {
        return NextResponse.json(
          { success: false, error: 'Not authorized to submit pitches.' },
          { status: 403 }
        );
      }
      const proposedHeadline = String(body.proposedHeadline || '').trim();
      const storySummary = String(body.storySummary || '').trim();
      if (proposedHeadline.length < 6 || storySummary.length < 20) {
        return NextResponse.json(
          { success: false, error: 'Headline and substantive story summary are required.' },
          { status: 400 }
        );
      }
      const pitch = submitEditorialPitch({
        proposedHeadline,
        departmentId: (body.departmentId || 'field-reports') as EditorialDepartmentId,
        region: String(body.region || account.basedIn || 'Western Himalayas'),
        storySummary,
        reportingAccessAndSources: String(
          body.reportingAccessAndSources || 'Filed via authenticated HDN Workspace.'
        ),
        estimatedWordCount: String(body.estimatedWordCount || '2,500 words'),
        authorName: account.fullName,
        authorEmail: account.email,
        requiresSourceProtection: Boolean(body.requiresSourceProtection),
        journalistSlug: account.slug,
      });
      return NextResponse.json({ success: true, pitch });
    }

    // Editor creating an Editorial Commission / Assignment (17-field brief)
    if (!hasPermission(account, 'assignment:create')) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Commissioning authority required to assign work.' },
        { status: 403 }
      );
    }

    const title = String(body?.title || '').trim();
    const assignedSlug = String(body?.assignedJournalistSlug || '').trim();
    if (!title || !assignedSlug) {
      return NextResponse.json(
        { success: false, error: 'Assignment title and assigned journalist are required.' },
        { status: 400 }
      );
    }

    const bureauId = (body?.bureauId || account.assignedBureaus[0] || 'kashmir') as BureauSlugId;
    if (
      account.roles.includes('bureau_chief') &&
      !isExecutiveOrAdmin(account) &&
      !account.roles.includes('managing_editor') &&
      !account.assignedBureaus.includes(bureauId)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: `Bureau Scope Guard: You may only issue assignments for your authorized bureau(s): ${account.assignedBureaus.join(', ')}.`,
        },
        { status: 403 }
      );
    }

    const assignee = store.accounts.find((a) => a.slug === assignedSlug);
    const nowIso = new Date().toISOString();

    const created: HdnEditorialAssignment = {
      id: `hdn-asg-${Date.now().toString(36)}`,
      title,
      editorialBrief: String(body?.editorialBrief || 'Commissioned via Himalayan Dispatch Newsroom.'),
      assignedJournalistSlug: assignedSlug,
      assignedJournalistName: assignee?.fullName || assignedSlug,
      responsibleEditorSlug: account.slug,
      responsibleEditorName: account.fullName,
      bureauId,
      departmentId: (body?.departmentId || 'field-reports') as EditorialDepartmentId,
      reportingBeatSlug: String(body?.reportingBeatSlug || 'lakes-wetlands-springs-waterways'),
      expectedDeliverables: Array.isArray(body?.expectedDeliverables)
        ? body.expectedDeliverables.map(String)
        : ['Block-based manuscript', 'Primary source citations', 'Verified dateline'],
      targetWordCount: Number(body?.targetWordCount || 2500),
      researchRequirements: String(
        body?.researchRequirements || 'Cross-check primary observations with KEW baselines.'
      ),
      scientificReviewRequired: Boolean(body?.scientificReviewRequired),
      mediaRequirements: String(body?.mediaRequirements || 'Documentary plate or KEW map.'),
      deadlineIso: body?.deadlineIso
        ? new Date(body.deadlineIso).toISOString()
        : new Date(Date.now() + 14 * 86400000).toISOString(),
      priority: (body?.priority || 'standard') as HdnPriorityLevel,
      publicationStream: (body?.publicationStream || 'monthly_edition') as HdnPublicationStream,
      proposedEditionSlug: String(body?.proposedEditionSlug || 'issue-02-a-world-in-transition'),
      status: 'commissioned',
      isConfidential: Boolean(body?.isConfidential),
      sourceProtectionLevel: body?.isConfidential ? 'strict_confidential' : 'standard_on_record',
      publicPreviewApproved: false,
      correspondence: [],
      history: [
        {
          id: `hist-${Date.now()}`,
          timestamp: nowIso,
          actorName: account.fullName,
          action: 'commissioned',
          note: `Commissioned to ${assignee?.fullName || assignedSlug} (${bureauId.toUpperCase()}).`,
        },
      ],
      createdAt: nowIso,
      updatedAt: nowIso,
    };

    if (body?.fromPitchId) {
      adminUpdatePitchStage(
        String(body.fromPitchId),
        'assignment',
        `Commissioned as assignment ${created.id} by ${account.fullName}.`
      );
    }

    store.assignments.unshift(created);
    pushHdnNotification(store, {
      recipientSlug: assignedSlug,
      category: 'assignment',
      title: `New Editorial Commission: ${created.title}`,
      body: `Assigned by ${account.fullName} · Target ${created.targetWordCount} words · Due ${created.deadlineIso.slice(0, 10)}.`,
      href: `/newsroom/assignments/${created.id}`,
    });
    recordHdnAudit(store, account, {
      category: 'assignment',
      action: 'create_commission',
      targetId: created.id,
      targetLabel: created.title,
      details: `Assigned to ${created.assignedJournalistName} (${created.bureauId}, ${created.departmentId}).`,
    });
    writeHdnStore(store);

    return NextResponse.json({ success: true, assignment: created });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to create assignment.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const store = readHdnStore();
  const { authenticated, account } = await resolveHdnRequestAccount(
    request,
    () => store.accounts
  );

  if (!authenticated || !account) {
    return NextResponse.json(
      { success: false, error: 'Authenticated newsroom session required.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    if (body?.action === 'evaluate_pitch') {
      if (!hasPermission(account, 'pitch:evaluate')) {
        return NextResponse.json(
          { success: false, error: 'Commissioning Desk authority required.' },
          { status: 403 }
        );
      }
      const pitch = adminUpdatePitchStage(
        String(body.pitchId || ''),
        body.workflowStage || 'assignment',
        body.reviewNotes ? String(body.reviewNotes) : undefined
      );
      if (!pitch) {
        return NextResponse.json({ success: false, error: 'Pitch not found.' }, { status: 404 });
      }
      return NextResponse.json({ success: true, pitch });
    }

    const asg = store.assignments.find((a) => a.id === String(body?.assignmentId || ''));
    if (!asg) {
      return NextResponse.json({ success: false, error: 'Assignment not found.' }, { status: 404 });
    }

    const isAssignee = asg.assignedJournalistSlug === account.slug;
    const isEditor =
      hasPermission(account, 'assignment:manage_all') ||
      (hasPermission(account, 'assignment:manage_bureau') &&
        account.assignedBureaus.includes(asg.bureauId)) ||
      (hasPermission(account, 'assignment:manage_department') &&
        account.assignedDepartments.includes(asg.departmentId));

    if (!isAssignee && !isEditor) {
      return NextResponse.json(
        { success: false, error: 'Not authorized to modify this assignment.' },
        { status: 403 }
      );
    }

    const nowIso = new Date().toISOString();

    if (body?.message && String(body.message).trim()) {
      asg.correspondence.push({
        id: `msg-${Date.now()}`,
        timestamp: nowIso,
        senderSlug: account.slug,
        senderName: account.fullName,
        senderRoleTitle: account.primaryRoleTitle,
        message: String(body.message).trim(),
      });
    }

    if (body?.status) {
      // Reporters can update to accepted / researching / drafting / submitted; editors can also cancel/complete/reassign
      if (!isEditor && ['cancelled', 'reassigned', 'completed'].includes(body.status)) {
        return NextResponse.json(
          { success: false, error: 'Only an editor can complete, reassign, or cancel a commission.' },
          { status: 403 }
        );
      }
      asg.status = body.status;
      asg.history.unshift({
        id: `hist-${Date.now()}`,
        timestamp: nowIso,
        actorName: account.fullName,
        action: `status_${body.status}`,
        note: body.note ? String(body.note) : `Moved assignment to ${body.status}.`,
      });
    }

    if (isEditor) {
      if (body?.reassignToSlug) {
        const nextJ = store.accounts.find((a) => a.slug === String(body.reassignToSlug));
        if (nextJ) {
          asg.assignedJournalistSlug = nextJ.slug;
          asg.assignedJournalistName = nextJ.fullName;
          asg.status = 'reassigned';
          asg.history.unshift({
            id: `hist-re-${Date.now()}`,
            timestamp: nowIso,
            actorName: account.fullName,
            action: 'reassigned',
            note: `Reassigned commission to ${nextJ.fullName}.`,
          });
        }
      }
      if (body?.deadlineIso) {
        asg.deadlineIso = new Date(body.deadlineIso).toISOString();
        asg.history.unshift({
          id: `hist-dl-${Date.now()}`,
          timestamp: nowIso,
          actorName: account.fullName,
          action: 'deadline_updated',
          note: `Updated deadline to ${asg.deadlineIso.slice(0, 10)}.`,
        });
      }
      if (body?.priority) asg.priority = body.priority;
    }

    asg.updatedAt = nowIso;
    writeHdnStore(store);
    return NextResponse.json({ success: true, assignment: asg });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update assignment.' },
      { status: 500 }
    );
  }
}
