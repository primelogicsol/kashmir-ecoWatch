import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ candidate: string }> }
) {
  const { candidate } = await context.params;
  const key = (process.env.INDEXNOW_KEY || '').trim();

  if (!key || !candidate || candidate.trim() !== key) {
    return new NextResponse('Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return new NextResponse(key, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
