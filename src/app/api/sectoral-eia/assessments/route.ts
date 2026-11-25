import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const SUBMISSIONS_FILE = path.join(
  process.cwd(),
  'data',
  'sectoral-eia-assessment-submissions.json'
);

function readSubmissions(): any[] {
  try {
    if (!fs.existsSync(SUBMISSIONS_FILE)) return [];
    return JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf8'));
  } catch {
    return [];
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    submissions: readSubmissions(),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const list = readSubmissions();
    const seq = String(list.length + 101).padStart(4, '0');
    const trackingCode = `KEW-SEIA-2026-REG-${seq}`;

    const record = {
      id: `seia-sub-${Date.now()}`,
      trackingCode,
      submissionType: body.submissionType || 'stakeholder_submitted',
      sector: body.sector || 'tourism',
      title: body.title || 'Untitled Sectoral Assessment',
      district: body.district || 'Srinagar',
      watershed: body.watershed || 'Upper Jhelum Basin',
      baselineYear: body.baselineYear || '2000',
      submittingEntity: body.submittingEntity || 'Contributor',
      contactEmail: body.contactEmail || '',
      keyActivity: body.keyActivity || '',
      mitigationAction: body.mitigationAction || '',
      status: 'PENDING_SCIENTIFIC_TRIAGE',
      createdAt: new Date().toISOString(),
    };

    list.unshift(record);
    const dir = path.dirname(SUBMISSIONS_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), 'utf8');

    return NextResponse.json({
      success: true,
      record,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Submission persistence failed' },
      { status: 500 }
    );
  }
}
