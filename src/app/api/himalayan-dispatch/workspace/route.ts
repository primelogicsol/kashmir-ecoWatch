import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/seo/admin-session';
import {
  appendJournalistCorrespondence,
  appendJournalistEvidence,
  appendJournalistMedia,
  authenticateJournalistForWorkspace,
  getJournalistWorkspaceBundle,
  JOURNALIST_SESSION_COOKIE,
  JournalistSessionClaims,
  signJournalistSessionToken,
  submitEditorialPitch,
  updateJournalistWorkspaceProfile,
  upsertJournalistDraft,
  verifyJournalistSessionToken,
} from '@/lib/himalayan-dispatch-store';
import {
  EditorialDepartmentId,
  JournalistEvidenceRecord,
  JournalistMediaRecord,
} from '@/types/himalayan-dispatch';

export const runtime = 'nodejs';

async function resolveVerifiedJournalist(
  request: NextRequest
): Promise<JournalistSessionClaims | null> {
  // 1. Check signed HttpOnly journalist session cookie (with live revocation check)
  const jCookie = request.cookies.get(JOURNALIST_SESSION_COOKIE)?.value;
  const claims = verifyJournalistSessionToken(jCookie);
  if (claims) return claims;

  // 2. If signed in as verified KEW Administrator, grant Founding Editor-in-Chief workspace access
  const adminRes = await verifyAdminRequest(request);
  if (adminRes.authorized) {
    const now = Math.floor(Date.now() / 1000);
    return {
      journalistSlug: 'dr-fayaz-ahmad-khan',
      email: 'fayaz@kashmir-ecowatch.com',
      name: 'Dr. Fayaz Ahmad Khan',
      roleTitle: 'Founding Editor-in-Chief',
      iat: now,
      exp: now + 3600,
    };
  }

  return null;
}

export async function GET(request: NextRequest) {
  const isClientProbe = request.nextUrl.searchParams.get('probe') === '1';
  const claims = await resolveVerifiedJournalist(request);
  if (!claims) {
    return NextResponse.json(
      {
        authenticated: false,
        error:
          'Authorized Himalayan Dispatch journalist session required. Applicants must receive editorial approval before workspace activation.',
      },
      { status: isClientProbe ? 200 : 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    ...getJournalistWorkspaceBundle(claims),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = String(body?.email || '').trim();
    const accessCode = String(body?.accessCode || '').trim();

    const result = authenticateJournalistForWorkspace({
      email,
      accessCodeOrRef: accessCode,
    });

    if (result.ok === false) {
      return NextResponse.json(
        { authenticated: false, error: result.error },
        { status: result.httpStatus }
      );
    }

    const token = signJournalistSessionToken(result.claims);
    const now = Math.floor(Date.now() / 1000);
    const fullClaims: JournalistSessionClaims = {
      ...result.claims,
      iat: now,
      exp: now + 12 * 60 * 60,
    };

    const response = NextResponse.json({
      authenticated: true,
      ...getJournalistWorkspaceBundle(fullClaims),
    });

    response.cookies.set({
      name: JOURNALIST_SESSION_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 12 * 60 * 60,
    });

    return response;
  } catch {
    return NextResponse.json(
      { authenticated: false, error: 'Unable to process newsroom sign-in.' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const claims = await resolveVerifiedJournalist(request);
  if (!claims) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Approved journalist session required.' },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();
    const action = String(body?.action || '');

    if (action === 'save_draft') {
      const workingTitle = String(body?.workingTitle || '').trim();
      const bodyMarkdown = String(body?.bodyMarkdown || '').trim();
      if (!workingTitle || workingTitle.length < 4) {
        return NextResponse.json(
          { success: false, error: 'Working title must be at least 4 characters.' },
          { status: 400 }
        );
      }
      const draft = upsertJournalistDraft(claims, {
        id: body?.id ? String(body.id) : undefined,
        workingTitle,
        subtitle: body?.subtitle ? String(body.subtitle) : '',
        targetEditionSlug: String(body?.targetEditionSlug || 'issue-02-a-world-in-transition'),
        departmentId: (body?.departmentId || 'longform-features') as EditorialDepartmentId,
        dateline: body?.dateline ? String(body.dateline) : 'WESTERN HIMALAYAS',
        bodyMarkdown,
        submitForReview: Boolean(body?.submitForReview),
      });
      return NextResponse.json({ success: true, draft });
    }

    if (action === 'submit_pitch') {
      const proposedHeadline = String(body?.proposedHeadline || '').trim();
      const storySummary = String(body?.storySummary || '').trim();
      if (proposedHeadline.length < 6 || storySummary.length < 20) {
        return NextResponse.json(
          {
            success: false,
            error: 'Please provide a clear working headline and summary for the Commissioning Desk.',
          },
          { status: 400 }
        );
      }
      const pitch = submitEditorialPitch({
        proposedHeadline,
        departmentId: (body?.departmentId || 'longform-features') as EditorialDepartmentId,
        region: String(body?.region || 'Western Himalayas'),
        storySummary,
        reportingAccessAndSources: String(
          body?.reportingAccessAndSources || 'Filed from approved Journalist Workspace'
        ),
        estimatedWordCount: body?.estimatedWordCount
          ? String(body.estimatedWordCount)
          : '3,000 words',
        authorName: claims.name,
        authorEmail: claims.email,
        requiresSourceProtection: Boolean(body?.requiresSourceProtection),
        journalistSlug: claims.journalistSlug,
      });
      return NextResponse.json({ success: true, pitch });
    }

    if (action === 'log_evidence') {
      const title = String(body?.title || '').trim();
      const referenceCitation = String(body?.referenceCitation || '').trim();
      if (!title || !referenceCitation) {
        return NextResponse.json(
          { success: false, error: 'Evidence title and reference citation are required.' },
          { status: 400 }
        );
      }
      const evidence = appendJournalistEvidence(claims, {
        title,
        sourceType:
          (body?.sourceType as JournalistEvidenceRecord['sourceType']) || 'Scientific Study',
        referenceCitation,
        relatedStoryOrDraftTitle: String(body?.relatedStoryOrDraftTitle || 'General Research'),
        isSensitiveProtected: Boolean(body?.isSensitiveProtected),
      });
      return NextResponse.json({ success: true, evidence });
    }

    if (action === 'log_media') {
      const title = String(body?.title || '').trim();
      if (!title) {
        return NextResponse.json(
          { success: false, error: 'Media plate or reel title is required.' },
          { status: 400 }
        );
      }
      const media = appendJournalistMedia(claims, {
        title,
        mediaType:
          (body?.mediaType as JournalistMediaRecord['mediaType']) || 'Documentary Photograph',
        locationAndElevation: String(body?.locationAndElevation || 'Western Himalayas'),
        captionAndEthicsNote: String(
          body?.captionAndEthicsNote || 'Zero generative or composite alteration affirmed.'
        ),
        mediaUrl: body?.mediaUrl ? String(body.mediaUrl) : undefined,
      });
      return NextResponse.json({ success: true, media });
    }

    if (action === 'send_correspondence') {
      const message = String(body?.message || '').trim();
      if (message.length < 4) {
        return NextResponse.json(
          { success: false, error: 'Message cannot be empty.' },
          { status: 400 }
        );
      }
      appendJournalistCorrespondence(claims, message);
      return NextResponse.json({ success: true });
    }

    if (action === 'update_profile') {
      const journalist = updateJournalistWorkspaceProfile(claims, {
        shortBio: body?.shortBio !== undefined ? String(body.shortBio) : undefined,
        basedIn: body?.basedIn !== undefined ? String(body.basedIn) : undefined,
        beat: body?.beat !== undefined ? String(body.beat) : undefined,
        languages: Array.isArray(body?.languages)
          ? body.languages.map((x: unknown) => String(x))
          : undefined,
        publicPortfolioConsent:
          typeof body?.publicPortfolioConsent === 'boolean'
            ? body.publicPortfolioConsent
            : undefined,
      });
      return NextResponse.json({ success: true, journalist });
    }

    return NextResponse.json(
      { success: false, error: 'Unsupported workspace action.' },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to update journalist workspace.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({ authenticated: false });
  response.cookies.set({
    name: JOURNALIST_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });
  return response;
}
