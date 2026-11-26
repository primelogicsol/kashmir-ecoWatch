import { NextRequest, NextResponse } from 'next/server';
import { hasPermission, resolveHdnRequestAccount } from '@/lib/hdn/rbac';
import {
  createOrUpdateConfidentialSource,
  getAccessibleConfidentialSources,
  getAllUnifiedManuscripts,
  readHdnStore,
  recordHdnAudit,
  writeHdnStore,
} from '@/lib/hdn/store';
import type { BureauSlugId } from '@/types/himalayan-dispatch';
import type { HdnFactCheckRecord } from '@/types/hdn-newsroom';

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

  const revealRestricted = request.nextUrl.searchParams.get('revealRestricted') === '1';

  // Strictly block `scientific_reviewer` (without editor/journalist role) from confidential source vault!
  if (
    revealRestricted &&
    account.roles.includes('scientific_reviewer') &&
    !hasPermission(account, 'sources:view_confidential_vault') &&
    !hasPermission(account, 'sources:manage_own')
  ) {
    return NextResponse.json(
      {
        success: false,
        error:
          'Security Boundary: Scientific Reviewers are strictly isolated from confidential journalistic source records.',
      },
      { status: 403 }
    );
  }

  const sources = getAccessibleConfidentialSources(account, revealRestricted);
  const manuscripts = getAllUnifiedManuscripts(false).map((m) => ({
    id: m.id,
    headline: m.headline,
    workflowStatus: m.workflowStatus,
    factCheckCompleted: m.factCheckCompleted,
  }));

  return NextResponse.json({
    success: true,
    factChecks: store.factChecks,
    sources,
    manuscripts,
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
    const kind = String(body?.recordType || 'fact_check');

    if (kind === 'source') {
      const res = createOrUpdateConfidentialSource(account, {
        id: body.id ? String(body.id) : undefined,
        codeName: String(body.codeName || `SRC-${Date.now().toString().slice(-4)}`),
        bureauId: (body.bureauId || account.assignedBureaus[0] || 'kashmir') as BureauSlugId,
        linkedAssignmentId: body.linkedAssignmentId ? String(body.linkedAssignmentId) : undefined,
        linkedManuscriptId: body.linkedManuscriptId ? String(body.linkedManuscriptId) : undefined,
        confidentialityLevel: body.confidentialityLevel || 'standard_on_record',
        publicDescription: String(body.publicDescription || ''),
        restrictedNotes: String(body.restrictedNotes || ''),
        consentRecorded: Boolean(body.consentRecorded ?? true),
        consentScopeNote: String(body.consentScopeNote || 'Informed consent recorded.'),
        retentionPolicy: body.retentionPolicy || 'retain_encrypted_archive',
        newInterview: body.newInterview,
      });
      if (res.ok === false) {
        return NextResponse.json({ success: false, error: res.error }, { status: 403 });
      }
      return NextResponse.json({ success: true, source: res.source });
    }

    // Record structured Fact-Checking claim verification
    if (!hasPermission(account, 'workflow:fact_check')) {
      return NextResponse.json(
        { success: false, error: 'Fact-Checker or Editorial authority required.' },
        { status: 403 }
      );
    }

    const manuscriptId = String(body.manuscriptId || '').trim();
    const claimAssertion = String(body.claimAssertion || '').trim();
    const sourceUrl = String(body.sourceUrl || '').trim();
    if (!manuscriptId || !claimAssertion || !sourceUrl) {
      return NextResponse.json(
        {
          success: false,
          error: 'Manuscript ID, factual claim assertion, and verifiable source URL/route are required (fabricated citations prohibited).',
        },
        { status: 400 }
      );
    }

    const ms = getAllUnifiedManuscripts(false).find((m) => m.id === manuscriptId);
    const seq = String(store.factChecks.length + 1).padStart(4, '0');
    const created: HdnFactCheckRecord = {
      id: `hdn-fc-${Date.now().toString(36)}`,
      claimIdentifier: `FC-2026-${seq}`,
      manuscriptId,
      manuscriptTitle: ms?.headline || manuscriptId,
      claimAssertion,
      sourceClassification: body.sourceClassification || 'primary_documentary',
      supportingSourceLabel: String(body.supportingSourceLabel || 'Primary Record'),
      sourceUrl,
      sourcePublicationDate: String(body.sourcePublicationDate || new Date().toISOString().slice(0, 10)),
      documentaryEvidenceNote: String(body.documentaryEvidenceNote || ''),
      verificationStatus: body.verificationStatus || 'verified',
      conflictingEvidenceNote: body.conflictingEvidenceNote
        ? String(body.conflictingEvidenceNote)
        : undefined,
      reviewerSlug: account.slug,
      reviewerName: account.fullName,
      reviewedAt: new Date().toISOString(),
      requiredCorrections: body.requiredCorrections ? String(body.requiredCorrections) : undefined,
      resolutionStatus: body.verificationStatus === 'verified' ? 'resolved' : 'open',
    };

    store.factChecks.unshift(created);
    recordHdnAudit(store, account, {
      category: 'workflow_gate',
      action: 'log_fact_check_claim',
      targetId: manuscriptId,
      targetLabel: created.claimIdentifier,
      details: `Logged ${created.verificationStatus} claim (${created.sourceClassification}).`,
    });
    writeHdnStore(store);

    return NextResponse.json({ success: true, factCheck: created });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to save verification record.' },
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
  if (!authenticated || !account || !hasPermission(account, 'workflow:fact_check')) {
    return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 403 });
  }

  const body = await request.json();
  const fc = store.factChecks.find((f) => f.id === String(body?.id || ''));
  if (!fc) {
    return NextResponse.json({ success: false, error: 'Fact-check record not found.' }, { status: 404 });
  }

  if (body.verificationStatus) fc.verificationStatus = body.verificationStatus;
  if (body.resolutionStatus) fc.resolutionStatus = body.resolutionStatus;
  if (body.requiredCorrections !== undefined) fc.requiredCorrections = String(body.requiredCorrections);
  fc.reviewedAt = new Date().toISOString();

  writeHdnStore(store);
  return NextResponse.json({ success: true, factCheck: fc });
}
