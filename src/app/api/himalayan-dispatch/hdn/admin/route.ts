import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import {
  HDN_ROLE_DEFINITIONS,
  hasPermission,
  resolveHdnRequestAccount,
} from '@/lib/hdn/rbac';
import {
  getAllUnifiedManuscripts,
  pushHdnNotification,
  readHdnStore,
  recordHdnAudit,
  writeHdnStore,
} from '@/lib/hdn/store';
import {
  getPublicDailyDispatches,
  getPublicPublishedStories,
  readDispatchStore,
} from '@/lib/himalayan-dispatch-store';
import { readAnieStore } from '@/lib/hd-anie/store';
import { EDITORIAL_DEPARTMENTS, REGIONAL_REPORTING_BUREAUS } from '@/data/himalayan-dispatch';
import { PUBLICATION_GATE_STAGE_SPECS } from '@/lib/himalayan-dispatch-metrics';
import type { BureauSlugId, EditorialDepartmentId } from '@/types/himalayan-dispatch';
import type { HdnAccountRecord, HdnMediaAsset, HdnRoleId } from '@/types/hdn-newsroom';

export const runtime = 'nodejs';

function hashAccessCode(code: string): string {
  return crypto.createHash('sha256').update(code.trim().toUpperCase()).digest('hex');
}

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

  const section = request.nextUrl.searchParams.get('section') || 'all';

  // Media library is accessible to journalists & visual editors too
  if (section === 'media') {
    return NextResponse.json({
      success: true,
      mediaAssets: store.mediaAssets,
      canApproveMedia: hasPermission(account, 'media:approve'),
    });
  }

  if (!hasPermission(account, 'workspace:admin') && !hasPermission(account, 'workspace:editorial')) {
    return NextResponse.json(
      { success: false, error: 'Administrator or Editorial authority required.' },
      { status: 403 }
    );
  }

  const anieStore = readAnieStore();
  const legacyStore = readDispatchStore();
  const allMs = getAllUnifiedManuscripts(true);

  // Compute strictly measured analytics (Section 20: zero fabricated readership metrics!)
  const byBureau: Record<string, { total: number; published: number }> = {};
  for (const b of REGIONAL_REPORTING_BUREAUS) {
    const inB = allMs.filter((m) => m.bureauId === b.id && m.workflowStatus !== 'trashed');
    byBureau[b.id] = {
      total: inB.length,
      published: inB.filter((m) => m.workflowStatus === 'published').length,
    };
  }

  const byDepartment: Record<string, { total: number; published: number }> = {};
  for (const d of EDITORIAL_DEPARTMENTS) {
    const inD = allMs.filter((m) => m.departmentId === d.id && m.workflowStatus !== 'trashed');
    byDepartment[d.id] = {
      total: inD.length,
      published: inD.filter((m) => m.workflowStatus === 'published').length,
    };
  }

  const totalWordsPublished = allMs
    .filter((m) => m.workflowStatus === 'published')
    .reduce((acc, m) => acc + (m.wordCount || 0), 0);

  return NextResponse.json({
    success: true,
    accounts: store.accounts.map((a) => ({
      ...a,
      accessCodeHash: undefined,
      plainAccessCodeHint: undefined,
    })),
    roleDefinitions: HDN_ROLE_DEFINITIONS,
    publicationGateSpecs: PUBLICATION_GATE_STAGE_SPECS,
    bureaus: REGIONAL_REPORTING_BUREAUS,
    departments: EDITORIAL_DEPARTMENTS,
    mediaAssets: store.mediaAssets,
    visualGovernancePolicy: {
      publicRoutineAiLabelsSuppressed: true,
      fabricatedExifProhibited: true,
      totalGovernedAssets: store.mediaAssets.length,
      c2paSynthIdCataloguedCount: store.mediaAssets.filter((m) => m.c2paSynthIdDetected).length,
    },
    auditLogs: hasPermission(account, 'audit:view_logs') ? store.auditLogs : [],
    anieAuditLogs: hasPermission(account, 'audit:view_logs') ? anieStore.auditLog.slice(0, 60) : [],
    trashedManuscripts: allMs.filter((m) => m.workflowStatus === 'trashed'),
    syndicationStatus: {
      rssFeedRoute: '/himalayan-dispatch/feed.xml',
      sitemapRoute: '/sitemap.xml',
      publishedStoriesInFeed: getPublicPublishedStories().length,
      publishedDailyDispatchesInFeed: getPublicDailyDispatches().length,
      unpublishedQuarantinedCount: allMs.filter((m) => m.workflowStatus !== 'published').length,
      confidentialSourcesProtectedCount: store.confidentialSources.length,
    },
    measuredAnalytics: {
      totalManuscriptsInSystem: allMs.filter((m) => m.workflowStatus !== 'trashed').length,
      publishedArticlesCount: allMs.filter((m) => m.workflowStatus === 'published').length,
      totalWordsPublished,
      factChecksLoggedCount: store.factChecks.length,
      scientificReviewsCompletedCount: store.scientificReviews.filter((r) => r.status === 'completed').length,
      applicationsTotalCount: legacyStore.applications.length,
      pitchesTotalCount: legacyStore.pitches.length,
      byBureau,
      byDepartment,
      aiBudgetTelemetry: anieStore.modelAndBudget,
    },
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
    const action = String(body?.action || '');

    // Upload / Register Media Asset (Journalists, Photojournalists, Visual Editors, Admins)
    if (action === 'register_media') {
      if (!hasPermission(account, 'media:upload')) {
        return NextResponse.json(
          { success: false, error: 'Media upload permission required.' },
          { status: 403 }
        );
      }
      const title = String(body.title || '').trim();
      const url = String(body.url || '').trim();
      if (!title || !url) {
        return NextResponse.json(
          { success: false, error: 'Media title and image/asset URL are required.' },
          { status: 400 }
        );
      }
      const created: HdnMediaAsset = {
        id: `hdn-media-${Date.now().toString(36)}`,
        title,
        mediaType: body.mediaType || 'documentary_photograph',
        url,
        caption: String(body.caption || ''),
        photographerOrCreator: String(body.photographerOrCreator || account.fullName),
        contributorSlug: account.slug,
        bureauId: (body.bureauId || account.assignedBureaus[0] || 'kashmir') as BureauSlugId,
        locationAndElevation: String(body.locationAndElevation || 'Western Himalayas'),
        licensingInfo: String(body.licensingInfo || 'Himalayan Dispatch Contributor License'),
        consentRecorded: Boolean(body.consentRecorded ?? true),
        provenanceClassification:
          body.provenanceClassification || 'authentic_documentary_unmodified',
        editorialApprovalStatus: hasPermission(account, 'media:approve')
          ? 'approved'
          : 'pending_review',
        approvedBy: hasPermission(account, 'media:approve') ? account.fullName : undefined,
        createdAt: new Date().toISOString(),
      };
      store.mediaAssets.unshift(created);
      recordHdnAudit(store, account, {
        category: 'manuscript_cms',
        action: 'register_media_asset',
        targetId: created.id,
        targetLabel: created.title,
        details: `Registered ${created.mediaType} (${created.provenanceClassification}).`,
      });
      writeHdnStore(store);
      return NextResponse.json({ success: true, mediaAsset: created });
    }

    // Create / Provision Verified Personnel Account (Admin only)
    if (action === 'create_account') {
      if (!hasPermission(account, 'users:manage_roles')) {
        return NextResponse.json(
          { success: false, error: 'System Administrator or Founding EIC authority required to provision accounts.' },
          { status: 403 }
        );
      }
      const fullName = String(body.fullName || '').trim();
      const email = String(body.email || '').trim().toLowerCase();
      if (!fullName || !email.includes('@')) {
        return NextResponse.json(
          { success: false, error: 'Valid full name and email are required.' },
          { status: 400 }
        );
      }
      if (store.accounts.some((a) => a.email.toLowerCase() === email)) {
        return NextResponse.json(
          { success: false, error: 'An account with that email already exists.' },
          { status: 400 }
        );
      }

      const slug =
        fullName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-+|-+$/g, '') || `user-${Date.now().toString(36)}`;
      const issuedCode = `HDN-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
      const roles: HdnRoleId[] =
        Array.isArray(body.roles) && body.roles.length > 0 ? body.roles : ['journalist'];
      const primaryRoleTitle =
        String(body.primaryRoleTitle || '').trim() ||
        HDN_ROLE_DEFINITIONS[roles[0]]?.title ||
        'Journalist';

      const nowIso = new Date().toISOString();
      const newAcc: HdnAccountRecord = {
        id: `hdn-acc-${Date.now().toString(36)}`,
        slug,
        fullName,
        email,
        primaryRoleTitle,
        roles,
        assignedBureaus: Array.isArray(body.assignedBureaus)
          ? body.assignedBureaus
          : ['kashmir'],
        assignedDepartments: Array.isArray(body.assignedDepartments)
          ? body.assignedDepartments
          : ['field-reports'],
        reportingBeats: Array.isArray(body.reportingBeats) ? body.reportingBeats : [],
        basedIn: String(body.basedIn || 'Western Himalayas'),
        shortBio: String(body.shortBio || ''),
        languages: ['English'],
        verifiedCredentials: [],
        approvedProfessionalLinks: [],
        accessCodeHash: hashAccessCode(issuedCode),
        status: 'active',
        charterAccepted: true,
        charterAcceptedAt: nowIso,
        contributorAgreementAccepted: true,
        contributorAgreementType: body.contributorAgreementType || 'voluntary_editorial_fellow',
        publicPortfolioConsent: Boolean(body.publicPortfolioConsent ?? false),
        publicPortfolioApproved: Boolean(body.publicPortfolioApproved ?? false),
        createdAt: nowIso,
        updatedAt: nowIso,
      };

      store.accounts.unshift(newAcc);
      recordHdnAudit(store, account, {
        category: 'rbac_security',
        action: 'provision_newsroom_account',
        targetId: newAcc.id,
        targetLabel: newAcc.fullName,
        details: `Provisioned account (${newAcc.email}) with roles: ${roles.join(', ')}.`,
      });
      writeHdnStore(store);

      return NextResponse.json({
        success: true,
        issuedAccessCode: issuedCode,
        account: { ...newAcc, accessCodeHash: undefined },
      });
    }

    // Broadcast Editorial Announcement
    if (action === 'broadcast_announcement') {
      if (!hasPermission(account, 'workspace:editorial')) {
        return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
      }
      pushHdnNotification(store, {
        recipientSlug: body.recipientSlug || 'all_newsroom',
        category: 'announcement',
        title: String(body.title || 'Editorial Desk Notice'),
        body: String(body.body || ''),
        href: String(body.href || '/newsroom/messages'),
      });
      writeHdnStore(store);
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: `Unsupported admin action: ${action}` },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process administrative action.' },
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

  const body = await request.json();
  const action = String(body?.action || '');

  // Self-service profile & portfolio update for authenticated journalist
  if (action === 'update_own_profile') {
    const me = store.accounts.find((a) => a.slug === account.slug);
    if (!me) return NextResponse.json({ success: false, error: 'Not found.' }, { status: 404 });
    if (body.shortBio !== undefined) me.shortBio = String(body.shortBio).trim();
    if (body.basedIn !== undefined) me.basedIn = String(body.basedIn).trim();
    if (Array.isArray(body.languages)) me.languages = body.languages.map(String);
    if (Array.isArray(body.reportingBeats)) me.reportingBeats = body.reportingBeats.map(String);
    if (typeof body.publicPortfolioConsent === 'boolean') {
      me.publicPortfolioConsent = body.publicPortfolioConsent;
    }
    if (typeof body.charterAccepted === 'boolean' && body.charterAccepted) {
      me.charterAccepted = true;
      me.charterAcceptedAt = me.charterAcceptedAt || new Date().toISOString();
    }
    if (typeof body.contributorAgreementAccepted === 'boolean' && body.contributorAgreementAccepted) {
      me.contributorAgreementAccepted = true;
    }
    me.updatedAt = new Date().toISOString();
    writeHdnStore(store);
    return NextResponse.json({ success: true, account: { ...me, accessCodeHash: undefined } });
  }

  // Visual Editor / Admin media approval
  if (action === 'approve_media') {
    if (!hasPermission(account, 'media:approve')) {
      return NextResponse.json({ success: false, error: 'Visual Editor authority required.' }, { status: 403 });
    }
    const media = store.mediaAssets.find((m) => m.id === String(body.mediaId || ''));
    if (!media) return NextResponse.json({ success: false, error: 'Media not found.' }, { status: 404 });
    media.editorialApprovalStatus = body.status || 'approved';
    media.approvedBy = account.fullName;
    writeHdnStore(store);
    return NextResponse.json({ success: true, mediaAsset: media });
  }

  // Mark notification read
  if (action === 'mark_notifications_read') {
    for (const n of store.notifications) {
      if (!n.readBySlugs.includes(account.slug)) {
        n.readBySlugs.push(account.slug);
      }
    }
    writeHdnStore(store);
    return NextResponse.json({ success: true });
  }

  // Admin: Update Roles, Bureaus, Departments, Status, or Rotate Access Code
  if (action === 'update_account_roles') {
    if (!hasPermission(account, 'users:manage_roles')) {
      return NextResponse.json(
        { success: false, error: 'System Administrator or Founding EIC authority required.' },
        { status: 403 }
      );
    }
    const target = store.accounts.find((a) => a.slug === String(body.slug || ''));
    if (!target) return NextResponse.json({ success: false, error: 'Account not found.' }, { status: 404 });

    if (Array.isArray(body.roles) && body.roles.length > 0) {
      target.roles = body.roles as HdnRoleId[];
    }
    if (body.primaryRoleTitle !== undefined) target.primaryRoleTitle = String(body.primaryRoleTitle).trim();
    if (Array.isArray(body.assignedBureaus)) {
      target.assignedBureaus = body.assignedBureaus as BureauSlugId[];
    }
    if (Array.isArray(body.assignedDepartments)) {
      target.assignedDepartments = body.assignedDepartments as EditorialDepartmentId[];
    }
    if (body.status) target.status = body.status;
    if (typeof body.publicPortfolioApproved === 'boolean') {
      target.publicPortfolioApproved = body.publicPortfolioApproved;
    }

    let rotatedCode: string | undefined;
    if (body.rotateAccessCode) {
      rotatedCode = `HDN-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
      target.accessCodeHash = hashAccessCode(rotatedCode);
      delete target.plainAccessCodeHint;
    }

    target.updatedAt = new Date().toISOString();
    recordHdnAudit(store, account, {
      category: 'rbac_security',
      action: 'update_account_rbac',
      targetId: target.id,
      targetLabel: target.fullName,
      details: `Updated roles=[${target.roles.join(', ')}], status=${target.status}, bureaus=[${target.assignedBureaus.join(', ')}].`,
    });
    writeHdnStore(store);

    return NextResponse.json({
      success: true,
      rotatedCode,
      account: { ...target, accessCodeHash: undefined },
    });
  }

  return NextResponse.json({ success: false, error: 'Unsupported action.' }, { status: 400 });
}
