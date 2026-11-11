import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export interface EcoVoicesSubmissionPayload {
  trackingId?: string;
  contributorName: string;
  contributorEmail: string;
  contributorPhone?: string;
  contributorRole: string;
  preferredLanguage: string;
  environmentalThemeId: string;
  geographicConnection: string;
  creativeFormat: string;
  stylisticOrientation?: string;
  workTitle: string;
  contentOrPortfolioUrl: string;
  isYouthSubmission?: boolean;
  institutionOrGuardian?: string;
  rightsDeclarationAgreed: boolean;
  receivedAt?: string;
}

// File-based persistence store in local runtime directory
const SUBMISSIONS_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(SUBMISSIONS_DIR, 'ecovoices-submissions.json');

function ensureStoreExists() {
  try {
    if (!fs.existsSync(SUBMISSIONS_DIR)) {
      fs.mkdirSync(SUBMISSIONS_DIR, { recursive: true });
    }
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf8');
    }
  } catch (err) {
    console.warn('Could not initialize ecovoices store directory:', err);
  }
}

function saveSubmission(submission: EcoVoicesSubmissionPayload) {
  try {
    ensureStoreExists();
    let current: EcoVoicesSubmissionPayload[] = [];
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
      current = JSON.parse(raw);
    }
    current.unshift(submission);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(current.slice(0, 500), null, 2), 'utf8');
  } catch (err) {
    console.warn('Error saving ecovoices submission to disk:', err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body: EcoVoicesSubmissionPayload = await req.json();

    if (!body.contributorName?.trim() || !body.contributorEmail?.trim() || !body.workTitle?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Contributor name, email, and work title are mandatory fields.' },
        { status: 400 }
      );
    }

    if (!body.rightsDeclarationAgreed) {
      return NextResponse.json(
        { success: false, error: 'You must agree to the non-commercial educational attribution declaration.' },
        { status: 400 }
      );
    }

    // Generate verified environment tracking ID
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    const trackingId = `ECOVOICES-2026-${randomHex}`;
    const receivedAt = new Date().toISOString();

    const record: EcoVoicesSubmissionPayload = {
      ...body,
      trackingId,
      receivedAt
    };

    saveSubmission(record);

    return NextResponse.json({
      success: true,
      trackingId,
      receivedAt,
      message: 'Your environmental creative proposal has been successfully registered with the EcoVoices Editorial Panel.',
      details: {
        contributorName: record.contributorName,
        role: record.contributorRole,
        theme: record.environmentalThemeId,
        trackingId
      }
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}

export async function GET() {
  try {
    ensureStoreExists();
    let submissions: EcoVoicesSubmissionPayload[] = [];
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
      submissions = JSON.parse(raw);
    }
    return NextResponse.json({
      success: true,
      totalCount: submissions.length,
      recentSubmissions: submissions.slice(0, 20).map((s) => ({
        trackingId: s.trackingId,
        contributorName: s.contributorName,
        role: s.contributorRole,
        theme: s.environmentalThemeId,
        receivedAt: s.receivedAt
      }))
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
