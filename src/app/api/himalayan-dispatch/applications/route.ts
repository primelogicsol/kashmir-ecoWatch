import { NextRequest, NextResponse } from 'next/server';
import {
  applicantUpdateOwnApplication,
  lookupApplicationStatusByRefAndEmail,
  savePrivateCredentialDocument,
  submitNewsroomApplication,
} from '@/lib/himalayan-dispatch-store';
import { CONTRIBUTOR_ROLE_CATEGORIES, EDITORIAL_DEPARTMENTS } from '@/data/himalayan-dispatch';
import {
  ContributorEngagementBasis,
  ContributorRoleCategoryId,
  EditorialDepartmentId,
  PrivateCredentialAttachment,
} from '@/types/himalayan-dispatch';

export const runtime = 'nodejs';

const ALLOWED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'];
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * GET /api/himalayan-dispatch/applications?ref=HD-APP-2026-0101&email=...
 * Requires BOTH matching Application Reference Number and Email Address to protect applicant privacy.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ref = (searchParams.get('ref') || '').trim();
  const email = (searchParams.get('email') || '').trim();

  if (!ref || !email || !email.includes('@')) {
    return NextResponse.json(
      {
        success: false,
        error:
          'Both your Application Reference Number and registered email address are required to check status.',
      },
      { status: 400 }
    );
  }

  const summary = lookupApplicationStatusByRefAndEmail(ref, email);
  if (!summary) {
    return NextResponse.json(
      {
        success: false,
        error: 'No application matched that reference number and email combination.',
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    application: summary,
  });
}

/**
 * POST /api/himalayan-dispatch/applications
 * Accepts multipart/form-data (with optional CV/credential file) or application/json.
 * Stores supporting credentials in a non-public server vault; never publicly accessible.
 */
export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get('content-type') || '';

    let fullName = '';
    let email = '';
    let locationOrDistrict = '';
    let kashmirDistrict = '';
    let roleCategoryId = 'environmental-reporter' as ContributorRoleCategoryId;
    let preferredDepartmentId: EditorialDepartmentId | undefined;
    let engagementBasis: ContributorEngagementBasis = 'voluntary_editorial_fellow';
    let professionalBackground = '';
    let portfolioUrl = '';
    let publishedWorkNotes = '';
    let motivationStatement = '';
    let languagesRaw = 'English';
    let charterAccepted = false;
    let nonEmploymentAcknowledged = false;
    let publicPortfolioConsent = false;
    let credentialAttachment: PrivateCredentialAttachment | undefined;

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      fullName = String(form.get('fullName') || '').trim();
      email = String(form.get('email') || '').trim();
      locationOrDistrict = String(form.get('locationOrDistrict') || '').trim();
      kashmirDistrict = String(form.get('kashmirDistrict') || '').trim();
      roleCategoryId = String(
        form.get('roleCategoryId') || 'environmental-reporter'
      ) as ContributorRoleCategoryId;
      const deptVal = String(form.get('preferredDepartmentId') || '').trim();
      if (EDITORIAL_DEPARTMENTS.some((d) => d.id === deptVal)) {
        preferredDepartmentId = deptVal as EditorialDepartmentId;
      }
      const basisVal = String(form.get('engagementBasis') || '').trim();
      if (
        basisVal === 'voluntary_editorial_fellow' ||
        basisVal === 'freelance_per_commission' ||
        basisVal === 'supervised_student_mentorship'
      ) {
        engagementBasis = basisVal;
      }
      professionalBackground = String(form.get('professionalBackground') || '').trim();
      portfolioUrl = String(form.get('portfolioUrl') || '').trim();
      publishedWorkNotes = String(form.get('publishedWorkNotes') || '').trim();
      motivationStatement = String(form.get('motivationStatement') || '').trim();
      languagesRaw = String(form.get('languages') || 'English').trim();
      charterAccepted = String(form.get('charterAccepted')) === 'true';
      nonEmploymentAcknowledged = String(form.get('nonEmploymentAcknowledged')) !== 'false';
      publicPortfolioConsent = String(form.get('publicPortfolioConsent')) === 'true';

      const fileEntry = form.get('credentialFile');
      if (fileEntry && typeof fileEntry === 'object' && 'arrayBuffer' in fileEntry) {
        const f = fileEntry as File;
        if (f.size > 0) {
          if (f.size > MAX_UPLOAD_BYTES) {
            return NextResponse.json(
              {
                success: false,
                error: 'Supporting CV / credential document must be 5 MB or smaller.',
              },
              { status: 400 }
            );
          }
          const lowerName = (f.name || '').toLowerCase();
          const hasValidExt = ALLOWED_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
          if (!hasValidExt) {
            return NextResponse.json(
              {
                success: false,
                error:
                  'Unsupported document format. Permitted formats: PDF, DOC, DOCX, TXT, JPG, PNG.',
              },
              { status: 400 }
            );
          }
          const buf = Buffer.from(await f.arrayBuffer());
          credentialAttachment = savePrivateCredentialDocument(f.name, f.type, buf);
        }
      }
    } else {
      const body = await request.json();
      fullName = String(body?.fullName || '').trim();
      email = String(body?.email || '').trim();
      locationOrDistrict = String(body?.locationOrDistrict || '').trim();
      kashmirDistrict = String(body?.kashmirDistrict || '').trim();
      roleCategoryId = String(
        body?.roleCategoryId || 'environmental-reporter'
      ) as ContributorRoleCategoryId;
      if (EDITORIAL_DEPARTMENTS.some((d) => d.id === body?.preferredDepartmentId)) {
        preferredDepartmentId = body.preferredDepartmentId as EditorialDepartmentId;
      }
      if (
        body?.engagementBasis === 'voluntary_editorial_fellow' ||
        body?.engagementBasis === 'freelance_per_commission' ||
        body?.engagementBasis === 'supervised_student_mentorship'
      ) {
        engagementBasis = body.engagementBasis;
      }
      professionalBackground = String(body?.professionalBackground || '').trim();
      portfolioUrl = String(body?.portfolioUrl || '').trim();
      publishedWorkNotes = String(body?.publishedWorkNotes || '').trim();
      motivationStatement = String(body?.motivationStatement || '').trim();
      languagesRaw = Array.isArray(body?.languages)
        ? body.languages.join(',')
        : String(body?.languages || 'English');
      charterAccepted = Boolean(body?.charterAccepted);
      nonEmploymentAcknowledged = body?.nonEmploymentAcknowledged !== false;
      publicPortfolioConsent = Boolean(body?.publicPortfolioConsent);
    }

    if (!fullName || fullName.length < 3) {
      return NextResponse.json(
        { success: false, error: 'Please enter your full name.' },
        { status: 400 }
      );
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid professional email address.' },
        { status: 400 }
      );
    }
    if (!locationOrDistrict || locationOrDistrict.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please specify your country, region, or district.' },
        { status: 400 }
      );
    }
    if (!CONTRIBUTOR_ROLE_CATEGORIES.some((c) => c.id === roleCategoryId)) {
      return NextResponse.json(
        { success: false, error: 'Please select a valid contributor role category.' },
        { status: 400 }
      );
    }
    if (!professionalBackground || professionalBackground.length < 25) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please describe your professional background (at least 25 characters).',
        },
        { status: 400 }
      );
    }
    if (!motivationStatement || motivationStatement.length < 25) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Please share why you wish to join Himalayan Dispatch (at least 25 characters).',
        },
        { status: 400 }
      );
    }
    if (!charterAccepted) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Acceptance of the Himalayan Dispatch editorial ethics, scientific integrity, and source protection charter is required.',
        },
        { status: 400 }
      );
    }

    const languages = languagesRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const created = submitNewsroomApplication({
      fullName,
      email,
      locationOrDistrict,
      kashmirDistrict: kashmirDistrict || undefined,
      roleCategoryId,
      preferredDepartmentId,
      engagementBasis,
      professionalBackground,
      portfolioUrl,
      publishedWorkNotes: publishedWorkNotes || undefined,
      motivationStatement,
      languages,
      charterAccepted,
      nonEmploymentAcknowledged,
      publicPortfolioConsent,
      credentialAttachment,
    });

    return NextResponse.json({
      success: true,
      referenceNumber: created.referenceNumber,
      status: created.status,
      roleCategoryTitle: created.roleCategoryTitle,
      submittedAt: created.submittedAt,
      message:
        'Your contributor application has been recorded with Himalayan Dispatch. Retain your Application Reference Number to track credential verification and editorial review.',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to submit contributor application at this time.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/himalayan-dispatch/applications
 * Allows an applicant (verified by referenceNumber + email) to submit requested supplemental info or withdraw.
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const referenceNumber = String(body?.referenceNumber || '').trim();
    const email = String(body?.email || '').trim();
    const action = body?.action === 'withdraw' ? 'withdraw' : 'provide_additional_info';

    if (!referenceNumber || !email) {
      return NextResponse.json(
        { success: false, error: 'Reference number and email are required.' },
        { status: 400 }
      );
    }

    const updated = applicantUpdateOwnApplication({
      referenceNumber,
      email,
      action,
      supplementalNote: body?.supplementalNote ? String(body.supplementalNote) : undefined,
      portfolioUrl: body?.portfolioUrl ? String(body.portfolioUrl) : undefined,
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Application not found for that reference number and email.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, application: updated });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to update application.' },
      { status: 500 }
    );
  }
}
