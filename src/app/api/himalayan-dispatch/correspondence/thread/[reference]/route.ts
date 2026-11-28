import { NextRequest, NextResponse } from 'next/server';
import { checkAuthRateLimit } from '@/lib/seo/admin-session';
import {
  appendCorrespondentReply,
  authenticateCorrespondenceThread,
  CORRESPONDENCE_THREAD_COOKIE,
  getPrivateThreadForCorrespondent,
  validateAndScanAttachment,
  verifyThreadAccessToken,
  type ValidatedAttachmentInput,
} from '@/lib/himalayan-dispatch-correspondence';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};

async function isAuthorizedForThread(
  request: NextRequest,
  reference: string
): Promise<boolean> {
  const refClean = reference.trim().toUpperCase();
  const cookieToken = request.cookies.get(CORRESPONDENCE_THREAD_COOKIE)?.value;
  if (verifyThreadAccessToken(cookieToken, refClean)) {
    return true;
  }
  // Optional header-based verification for API clients supplying private credential directly
  const headerCred = request.headers.get('x-hd-access-credential');
  if (headerCred) {
    const res = await authenticateCorrespondenceThread(refClean, headerCred);
    return res.ok;
  }
  return false;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  const { reference } = await params;
  const refClean = String(reference || '').trim().toUpperCase();

  // NEVER authorize access using a reference number alone
  const authorized = await isAuthorizedForThread(request, refClean);
  if (!authorized) {
    return NextResponse.json(
      {
        success: false,
        requiresAuthentication: true,
        error:
          'Correspondence is private. Authenticate with both your reference number and secure access credential to view this thread.',
      },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  const thread = await getPrivateThreadForCorrespondent(refClean);
  if (!thread) {
    return NextResponse.json(
      { success: false, error: 'Correspondence record not found.' },
      { status: 404, headers: NO_STORE_HEADERS }
    );
  }

  return NextResponse.json({ success: true, thread }, { headers: NO_STORE_HEADERS });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ reference: string }> }
) {
  const rate = checkAuthRateLimit(request, 'hd-correspondence-reply', 15, 15 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Rate limit exceeded. Please wait ${rate.retryAfterSeconds} seconds.`,
      },
      { status: 429, headers: NO_STORE_HEADERS }
    );
  }

  const { reference } = await params;
  const refClean = String(reference || '').trim().toUpperCase();

  const authorized = await isAuthorizedForThread(request, refClean);
  if (!authorized) {
    return NextResponse.json(
      {
        success: false,
        requiresAuthentication: true,
        error: 'Unauthorized: Valid correspondence session credential required to reply.',
      },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  try {
    const contentType = request.headers.get('content-type') || '';
    let messageBody = '';
    const attachments: ValidatedAttachmentInput[] = [];

    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData();
      messageBody = String(form.get('message') || '');
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
      const json = await request.json();
      messageBody = String(json?.message || '');
    }

    const saved = await appendCorrespondentReply({
      referenceNumber: refClean,
      body: messageBody,
      attachments,
    });

    if (!saved.ok) {
      return NextResponse.json(
        { success: false, error: saved.error },
        { status: saved.status, headers: NO_STORE_HEADERS }
      );
    }

    const updatedThread = await getPrivateThreadForCorrespondent(refClean);
    return NextResponse.json(
      { success: true, thread: updatedThread },
      { headers: NO_STORE_HEADERS }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to record thread reply.' },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}
