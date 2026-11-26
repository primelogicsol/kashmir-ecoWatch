import { NextRequest, NextResponse } from 'next/server';
import {
  getPublicDispatchBundle,
  submitEditorialPitch,
} from '@/lib/himalayan-dispatch-store';
import { EDITORIAL_DEPARTMENTS } from '@/data/himalayan-dispatch';
import { EditorialDepartmentId } from '@/types/himalayan-dispatch';

export async function GET() {
  const bundle = getPublicDispatchBundle();
  return NextResponse.json({
    success: true,
    publication: 'Himalayan Dispatch',
    ...bundle,
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const proposedHeadline = String(body?.proposedHeadline || '').trim();
    const storySummary = String(body?.storySummary || '').trim();
    const authorName = String(body?.authorName || '').trim();
    const authorEmail = String(body?.authorEmail || '').trim();
    const departmentRaw = String(body?.departmentId || 'longform-features') as EditorialDepartmentId;

    if (!proposedHeadline || proposedHeadline.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Please provide a working headline (at least 6 characters).' },
        { status: 400 }
      );
    }
    if (!storySummary || storySummary.length < 30) {
      return NextResponse.json(
        { success: false, error: 'Please include a substantive pitch summary (at least 30 characters).' },
        { status: 400 }
      );
    }
    if (!authorName || !authorEmail || !authorEmail.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid contributor name and correspondence email are required.' },
        { status: 400 }
      );
    }

    const validDept = EDITORIAL_DEPARTMENTS.some((d) => d.id === departmentRaw)
      ? departmentRaw
      : 'longform-features';

    const created = submitEditorialPitch({
      proposedHeadline,
      departmentId: validDept,
      region: String(body?.region || 'Western Himalayas'),
      storySummary,
      reportingAccessAndSources: String(body?.reportingAccessAndSources || 'General field pitch'),
      estimatedWordCount: body?.estimatedWordCount ? String(body.estimatedWordCount) : undefined,
      authorName,
      authorEmail,
      authorPortfolioUrl: body?.authorPortfolioUrl ? String(body.authorPortfolioUrl) : undefined,
      requiresSourceProtection: Boolean(body?.requiresSourceProtection),
    });

    return NextResponse.json({
      success: true,
      trackingCode: created.trackingCode,
      workflowStage: created.workflowStage,
      submittedAt: created.submittedAt,
      message:
        'Your pitch has been logged with the Himalayan Dispatch Commissioning Desk (Stage 01: Pitching). Do not transmit confidential source documents over standard web forms.',
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Unable to process editorial pitch submission.' },
      { status: 500 }
    );
  }
}
