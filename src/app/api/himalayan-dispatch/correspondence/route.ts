import { NextRequest, NextResponse } from 'next/server';
import { checkAuthRateLimit } from '@/lib/seo/admin-session';
import { getCookieDomainConfig } from '@/lib/hdn/rbac';
import {
  CORRESPONDENCE_CATEGORIES,
  CORRESPONDENCE_THREAD_COOKIE,
  createEditorialCorrespondence,
  signThreadAccessToken,
  validateAndScanAttachment,
  type CorrespondenceCategoryId,
  type CorrespondenceRegion,
  type ValidatedAttachmentInput,
} from '@/lib/himalayan-dispatch-correspondence';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};

export async function POST(request: NextRequest) {
  const rate = checkAuthRateLimit(request, 'hd-correspondence-submit', 12, 15 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Rate limit exceeded. Please wait ${rate.retryAfterSeconds} seconds before submitting again.`,
      },
      { status: 429, headers: NO_STORE_HEADERS }
    );
  }

  try {
    const contentType = request.headers.get('content-type') || '';
    let category = 'general_inquiry' as CorrespondenceCategoryId;
    let region = 'Multi-Regional / Transboundary' as CorrespondenceRegion;
    let senderName = '';
    let senderEmail = '';
    let affiliation = '';
    let relatedArticleUrl = '';
    let subject = '';
    let message = '';
    let privacyConsentAccepted = false;
    let containsTier3HighRiskMaterial = false;
    let honeypot = '';
    const attachments: ValidatedAttachmentInput[] = [];

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      honeypot = String(form.get('website_url_hp') || '');
      category = String(form.get('category') || 'general_inquiry') as CorrespondenceCategoryId;
      region = String(form.get('region') || 'Multi-Regional / Transboundary') as CorrespondenceRegion;
      senderName = String(form.get('senderName') || '');
      senderEmail = String(form.get('senderEmail') || '');
      affiliation = String(form.get('affiliation') || '');
      relatedArticleUrl = String(form.get('relatedArticleUrl') || '');
      subject = String(form.get('subject') || '');
      message = String(form.get('message') || '');
      privacyConsentAccepted = form.get('privacyConsentAccepted') === 'true';
      containsTier3HighRiskMaterial = form.get('containsTier3HighRiskMaterial') === 'true';

      const files = form.getAll('attachments');
      for (const f of files) {
        if (f && typeof f === 'object' && 'arrayBuffer' in f && (f as File).size > 0) {
          const fileObj = f as File;
          const buf = Buffer.from(await fileObj.arrayBuffer());
          const scan = validateAndScanAttachment({
            filename: fileObj.name,
            mimeType: fileObj.type,
            buffer: buf,
          });
          if (!scan.ok) {
            return NextResponse.json(
              { success: false, error: scan.error },
              { status: 400, headers: NO_STORE_HEADERS }
            );
          }
          attachments.push(scan.sanitized);
        }
      }
    } else {
      const body = await request.json();
      honeypot = String(body?.website_url_hp || '');
      category = String(body?.category || 'general_inquiry') as CorrespondenceCategoryId;
      region = String(body?.region || 'Multi-Regional / Transboundary') as CorrespondenceRegion;
      senderName = String(body?.senderName || '');
      senderEmail = String(body?.senderEmail || '');
      affiliation = String(body?.affiliation || '');
      relatedArticleUrl = String(body?.relatedArticleUrl || '');
      subject = String(body?.subject || '');
      message = String(body?.message || '');
      privacyConsentAccepted = Boolean(body?.privacyConsentAccepted);
      containsTier3HighRiskMaterial = Boolean(body?.containsTier3HighRiskMaterial);
    }

    // Silent anti-bot honeypot rejection
    if (honeypot.trim().length > 0) {
      return NextResponse.json(
        { success: false, error: 'Automated submission rejected.' },
        { status: 400, headers: NO_STORE_HEADERS }
      );
    }

    if (!CORRESPONDENCE_CATEGORIES.some((c) => c.id === category)) {
      category = 'general_inquiry';
    }

    const result = await createEditorialCorrespondence({
      category,
      region,
      senderName,
      senderEmail,
      affiliation,
      relatedArticleUrl,
      subject,
      message,
      privacyConsentAccepted,
      containsTier3HighRiskMaterial,
      attachments,
    });

    if (!result.ok) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: result.status, headers: NO_STORE_HEADERS }
      );
    }

    const token = signThreadAccessToken(result.referenceNumber);
    const response = NextResponse.json(
      {
        success: true,
        referenceNumber: result.referenceNumber,
        accessCredential: result.accessCredential,
        receivingDepartment: result.receivingDepartment,
        categoryLabel: result.categoryLabel,
        createdAt: result.createdAt,
      },
      { status: 201, headers: NO_STORE_HEADERS }
    );

    response.cookies.set({
      name: CORRESPONDENCE_THREAD_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 2 * 60 * 60,
      ...getCookieDomainConfig(),
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to process editorial correspondence submission.' },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}
