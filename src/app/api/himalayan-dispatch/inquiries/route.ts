import { NextRequest, NextResponse } from 'next/server';
import { submitEditorialPublicInquiry } from '@/lib/himalayan-dispatch-store';
import {
  createEditorialCorrespondence,
  type CorrespondenceCategoryId,
  type CorrespondenceRegion,
} from '@/lib/himalayan-dispatch-correspondence';
import type { BureauSlugId, EditorialInquiryCategory } from '@/types/himalayan-dispatch';

const VALID_CATEGORIES = new Set<EditorialInquiryCategory>([
  'reader_complaint',
  'public_editor_petition',
  'correction_request',
  'rights_permissions',
  'editorial_appointment_interest',
  'bureau_correspondence',
  'general_editorial_contact',
]);

function mapInquiryCategoryToCorrespondence(
  cat: EditorialInquiryCategory
): CorrespondenceCategoryId {
  switch (cat) {
    case 'reader_complaint':
    case 'public_editor_petition':
      return 'reader_complaint';
    case 'correction_request':
      return 'correction_request';
    case 'rights_permissions':
      return 'copyright_permissions';
    case 'bureau_correspondence':
      return 'regional_correspondence';
    case 'editorial_appointment_interest':
      return 'institutional_correspondence';
    default:
      return 'general_inquiry';
  }
}

function mapBureauToRegion(bureauId?: BureauSlugId): CorrespondenceRegion {
  switch (bureauId) {
    case 'kashmir':
      return 'Kashmir';
    case 'jammu':
      return 'Jammu';
    case 'ladakh':
      return 'Ladakh';
    case 'ajk':
      return 'Azad Jammu & Kashmir';
    case 'gilgit':
      return 'Gilgit';
    case 'baltistan':
      return 'Baltistan';
    default:
      return 'Multi-Regional / Transboundary';
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawCat = String(body?.category || 'general_editorial_contact') as EditorialInquiryCategory;
    const category: EditorialInquiryCategory = VALID_CATEGORIES.has(rawCat)
      ? rawCat
      : 'general_editorial_contact';

    const subject = String(body?.subject || '').trim();
    const senderName = String(body?.senderName || '').trim();
    const senderEmail = String(body?.senderEmail || '').trim();
    const message = String(body?.message || '').trim();

    if (!senderName || !senderEmail || !senderEmail.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Please provide your full name and a valid correspondence email.' },
        { status: 400 }
      );
    }
    if (subject.length < 4 || message.length < 20) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please include a clear subject line and a substantive message (at least 20 characters).',
        },
        { status: 400 }
      );
    }

    const bureauId = body?.bureauId ? (String(body.bureauId) as BureauSlugId) : undefined;
    const affiliation = body?.organizationOrLocation
      ? String(body.organizationOrLocation)
      : undefined;
    const relatedArticleUrl = body?.relatedArticleUrl
      ? String(body.relatedArticleUrl)
      : undefined;

    const created = submitEditorialPublicInquiry({
      category,
      subject,
      senderName,
      senderEmail,
      organizationOrLocation: affiliation,
      relatedArticleUrl,
      bureauId,
      positionTitle: body?.positionTitle ? String(body.positionTitle) : undefined,
      message,
    });

    const corrRes = await createEditorialCorrespondence({
      category: mapInquiryCategoryToCorrespondence(category),
      region: mapBureauToRegion(bureauId),
      senderName,
      senderEmail,
      affiliation,
      relatedArticleUrl,
      subject,
      message,
      privacyConsentAccepted: true,
    });

    const referenceCode = corrRes.ok ? corrRes.referenceNumber : created.trackingCode;

    return NextResponse.json({
      success: true,
      trackingCode: referenceCode,
      referenceNumber: corrRes.ok ? corrRes.referenceNumber : undefined,
      accessCredential: corrRes.ok ? corrRes.accessCredential : undefined,
      submittedAt: corrRes.ok ? corrRes.createdAt : created.submittedAt,
      message: corrRes.ok
        ? `Your submission has been formally logged under reference ${corrRes.referenceNumber}. Save your private access credential (${corrRes.accessCredential}) to track responses securely.`
        : `Your submission has been formally logged with the Himalayan Dispatch Desk under reference ${created.trackingCode}.`,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to record correspondence at this time.' },
      { status: 500 }
    );
  }
}
