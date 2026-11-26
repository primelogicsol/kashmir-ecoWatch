import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/seo/admin-session';
import {
  loadHallStore,
  RECORDINGS_DIR,
  ROLE_PERMISSIONS,
  verifyHallAccessToken,
} from '@/lib/virtual-hall-store';

export const dynamic = 'force-dynamic';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const store = loadHallStore();
  const rec = store.recordings.find((r) => r.id === id && r.status !== 'deleted');
  if (!rec || !rec.fileName) {
    return NextResponse.json({ ok: false, error: 'Recording file not found.' }, { status: 404 });
  }

  if (rec.status !== 'approved_public') {
    const adminCheck = await verifyAdminRequest(request);
    const token = request.nextUrl.searchParams.get('token') || '';
    const claims = token ? verifyHallAccessToken(token) : null;
    if (!adminCheck.authorized && (!claims || !ROLE_PERMISSIONS[claims.role].canRecord)) {
      return NextResponse.json(
        { ok: false, error: 'Private recording requires Host or Platform Admin authorization.' },
        { status: 403 }
      );
    }
  }

  const filePath = path.join(RECORDINGS_DIR, rec.fileName);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ ok: false, error: 'Recording binary missing on disk.' }, { status: 404 });
  }

  const bytes = fs.readFileSync(filePath);
  return new NextResponse(bytes, {
    status: 200,
    headers: {
      'Content-Type': rec.mimeType || 'video/webm',
      'Content-Length': String(bytes.byteLength),
      'Content-Disposition': `inline; filename="${rec.fileName}"`,
      'Cache-Control': 'private, no-store',
    },
  });
}
