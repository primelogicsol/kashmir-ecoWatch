import { NextRequest, NextResponse } from 'next/server';
import { hasPermission, resolveHdnRequestAccount } from '@/lib/hdn/rbac';
import {
  getAllUnifiedManuscripts,
  readHdnStore,
  recordHdnAudit,
  writeHdnStore,
} from '@/lib/hdn/store';
import type { HdnMonthlyEditionRecord } from '@/types/hdn-newsroom';

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

  const monthlyCandidates = getAllUnifiedManuscripts(false)
    .filter((m) => m.publicationStream === 'monthly_edition')
    .map((m) => ({
      id: m.id,
      slug: m.slug,
      headline: m.headline,
      bylineDisplay: m.bylineDisplay,
      departmentId: m.departmentId,
      bureauId: m.bureauId,
      targetEditionSlug: m.targetEditionSlug,
      workflowStatus: m.workflowStatus,
      wordCount: m.wordCount,
      isFeatured: m.isFeatured,
    }));

  return NextResponse.json({
    success: true,
    editions: store.editions,
    monthlyCandidates,
  });
}

export async function POST(request: NextRequest) {
  const store = readHdnStore();
  const { authenticated, account } = await resolveHdnRequestAccount(
    request,
    () => store.accounts
  );

  if (!authenticated || !account || !hasPermission(account, 'edition:manage')) {
    return NextResponse.json(
      { success: false, error: 'Edition management authority required.' },
      { status: 403 }
    );
  }

  const body = await request.json();
  const vol = Number(body?.volumeNumber || 1);
  const iss = Number(body?.issueNumber || store.editions.length + 1);
  const themeTitle = String(body?.themeTitle || 'New Monthly Edition').trim();
  const slug =
    String(body?.slug || '').trim() ||
    `volume-${String(vol).padStart(2, '0')}-issue-${String(iss).padStart(2, '0')}`;

  const created: HdnMonthlyEditionRecord = {
    id: `hdn-ed-${Date.now().toString(36)}`,
    slug,
    volumeNumber: vol,
    issueNumber: iss,
    volumeLabel: `VOL. ${String(vol).padStart(2, '0')} / NO. ${String(iss).padStart(2, '0')}`,
    issueNumberLabel: `ISSUE ${String(iss).padStart(2, '0')}`,
    themeTitle,
    themeKicker: String(body?.themeKicker || 'MONTHLY EDITION IN PLANNING'),
    editionIntroduction: String(body?.editionIntroduction || ''),
    coverImage: String(body?.coverImage || '/images/publications/kolahoi-glacier-cryosphere.jpg'),
    coverLocation: String(body?.coverLocation || 'Western Himalayas'),
    coverCaption: String(body?.coverCaption || 'Monthly cover study.'),
    coverCredit: String(body?.coverCredit || 'Himalayan Dispatch Visual Desk'),
    editorsLetter: {
      title: String(body?.editorsLetterTitle || 'From the Editor’s Desk'),
      paragraphs: [String(body?.editorsLetterBody || 'Working Editor’s Letter draft.')],
      authorName: 'Dr. Fayaz Ahmad Khan',
      authorRole: 'Founding Editor-in-Chief',
      approvedByFoundingEic: false,
    },
    orderedManuscriptIds: [],
    orderedStorySlugs: [],
    visualEssaySlugs: [],
    contributorCredits: [],
    status: 'planning',
    readinessPercent: 15,
    updatedAt: new Date().toISOString(),
  };

  store.editions.unshift(created);
  recordHdnAudit(store, account, {
    category: 'edition_builder',
    action: 'create_edition',
    targetId: created.id,
    targetLabel: created.themeTitle,
    details: `Created Monthly Edition plan ${created.volumeLabel}.`,
  });
  writeHdnStore(store);

  return NextResponse.json({ success: true, edition: created });
}

export async function PATCH(request: NextRequest) {
  const store = readHdnStore();
  const { authenticated, account } = await resolveHdnRequestAccount(
    request,
    () => store.accounts
  );

  if (!authenticated || !account || !hasPermission(account, 'edition:manage')) {
    return NextResponse.json(
      { success: false, error: 'Edition management authority required.' },
      { status: 403 }
    );
  }

  const body = await request.json();
  const ed = store.editions.find((e) => e.id === String(body?.id || '') || e.slug === String(body?.slug || ''));
  if (!ed) {
    return NextResponse.json({ success: false, error: 'Edition not found.' }, { status: 404 });
  }

  if (body.themeTitle !== undefined) ed.themeTitle = String(body.themeTitle).trim();
  if (body.themeKicker !== undefined) ed.themeKicker = String(body.themeKicker).trim();
  if (body.editionIntroduction !== undefined) ed.editionIntroduction = String(body.editionIntroduction).trim();
  if (body.coverStorySlug !== undefined) ed.coverStorySlug = String(body.coverStorySlug);
  if (body.coverImage !== undefined) ed.coverImage = String(body.coverImage).trim();
  if (body.coverLocation !== undefined) ed.coverLocation = String(body.coverLocation).trim();
  if (body.coverCaption !== undefined) ed.coverCaption = String(body.coverCaption).trim();
  if (body.coverCredit !== undefined) ed.coverCredit = String(body.coverCredit).trim();
  if (body.scheduledReleaseDate !== undefined) ed.scheduledReleaseDate = String(body.scheduledReleaseDate);

  if (Array.isArray(body.orderedStorySlugs)) {
    ed.orderedStorySlugs = body.orderedStorySlugs.map(String);
    ed.readinessPercent = Math.min(100, Math.max(20, ed.orderedStorySlugs.length * 15));
  }

  if (body.editorsLetterTitle !== undefined || body.editorsLetterParagraphs !== undefined) {
    if (body.editorsLetterTitle !== undefined) {
      ed.editorsLetter.title = String(body.editorsLetterTitle).trim();
    }
    if (Array.isArray(body.editorsLetterParagraphs)) {
      ed.editorsLetter.paragraphs = body.editorsLetterParagraphs.map(String);
    }
    // Governance Lock: Only Founding EIC can personally sign off the Editor's Letter!
    if (body.approveEditorsLetter && account.roles.includes('founding_eic')) {
      ed.editorsLetter.approvedByFoundingEic = true;
      ed.editorsLetter.approvedAt = new Date().toISOString();
    }
  }

  if (body.status) {
    if (
      (body.status === 'current' || body.status === 'ready_for_approval') &&
      !hasPermission(account, 'edition:approve_release')
    ) {
      return NextResponse.json(
        { success: false, error: 'Releasing an edition requires Executive Editor or Founding EIC authority.' },
        { status: 403 }
      );
    }
    if (body.status === 'current') {
      // Archive previously current edition cleanly without fabricating dates
      for (const other of store.editions) {
        if (other.id !== ed.id && other.status === 'current') {
          other.status = 'archived';
        }
      }
      ed.publishedIsoDate = ed.publishedIsoDate || new Date().toISOString().slice(0, 10);
      ed.approvedBy = account.fullName;
      ed.readinessPercent = 100;
    }
    ed.status = body.status;
  }

  ed.updatedAt = new Date().toISOString();
  recordHdnAudit(store, account, {
    category: 'edition_builder',
    action: 'update_edition',
    targetId: ed.id,
    targetLabel: ed.themeTitle,
    details: `Updated Monthly Edition (${ed.status}, ${ed.orderedStorySlugs.length} stories sequenced).`,
  });
  writeHdnStore(store);

  return NextResponse.json({ success: true, edition: ed });
}
