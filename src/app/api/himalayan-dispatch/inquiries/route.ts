import { NextRequest, NextResponse } from 'next/server';
import { submitEditorialPublicInquiry } from '@/lib/himalayan-dispatch-store';
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

    const created = submitEditorialPublicInquiry({
      category,
      subject,
      senderName,
      senderEmail,
      organizationOrLocation: body?.organizationOrLocation
        ? String(body.organizationOrLocation)
        : undefined,
      relatedArticleUrl: body?.relatedArticleUrl ? String(body.relatedArticleUrl) : undefined,
      bureauId: body?.bureauId ? (String(body.bureauId) as BureauSlugId) : undefined,
      positionTitle: body?.positionTitle ? String(body.positionTitle) : undefined,
      message,
    });

    return NextResponse.json({
      success: true,
      trackingCode: created.trackingCode,
      submittedAt: created.submittedAt,
      message: `Your submission has been formally logged with the Himalayan Dispatch Desk under reference ${created.trackingCode}.`,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to record correspondence at this time.' },
      { status: 500 }
    );
  }
}
