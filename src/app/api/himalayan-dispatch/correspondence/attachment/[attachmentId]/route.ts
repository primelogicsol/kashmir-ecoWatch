import { NextRequest, NextResponse } from 'next/server';
import { getAttachmentForAuthorizedViewer } from '@/lib/himalayan-dispatch-correspondence';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ attachmentId: string }> }
) {
  const { attachmentId } = await params;
  const res = await getAttachmentForAuthorizedViewer({
    attachmentId: String(attachmentId || ''),
    request,
  });

  if (!res.ok) {
    return NextResponse.json(
      { success: false, error: res.error },
      {
        status: res.status,
        headers: {
          'Cache-Control': 'no-store, private',
          'X-Robots-Tag': 'noindex, nofollow, noarchive',
        },
      }
    );
  }

  return new NextResponse(new Uint8Array(res.buffer), {
    status: 200,
    headers: {
      'Content-Type': res.mimeType,
      'Content-Disposition': `attachment; filename="${res.filename.replace(/"/g, '')}"`,
      'Content-Length': String(res.buffer.length),
      'Cache-Control': 'no-store, private',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    },
  });
}
