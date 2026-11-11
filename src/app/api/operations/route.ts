import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { 
  OperationRecord, 
  INITIAL_OPERATIONS_RECORDS, 
  generateTrackingId, 
  SOURCE_PAGE_MAP, 
  PublicSourcePage,
  SubmissionPriority
} from '@/lib/operations';

// Global in-memory storage for operations cache (persists across hot requests)
let operationsMemoryStore: OperationRecord[] = [...INITIAL_OPERATIONS_RECORDS];

// GET /api/operations
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const trackingId = searchParams.get('trackingId');
    const email = searchParams.get('email');
    const center = searchParams.get('center');
    const priority = searchParams.get('priority');
    const status = searchParams.get('status');

    let results = [...operationsMemoryStore];

    if (trackingId) {
      const match = results.find(
        (r) => r.trackingId.trim().toUpperCase() === trackingId.trim().toUpperCase()
      );
      if (match) {
        return NextResponse.json({ success: true, data: match });
      }
      return NextResponse.json(
        { success: false, error: `No record found for Tracking ID: ${trackingId}` },
        { status: 404 }
      );
    }

    if (email) {
      results = results.filter(
        (r) => r.ownerEmail.toLowerCase() === email.toLowerCase()
      );
    }

    if (center && center !== 'ALL') {
      results = results.filter((r) => r.managementCenter === center);
    }

    if (priority && priority !== 'ALL') {
      results = results.filter((r) => r.priority === priority);
    }

    if (status && status !== 'ALL') {
      results = results.filter((r) => r.status === status);
    }

    // Sort newest first
    results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json({ 
      success: true, 
      count: results.length,
      data: results 
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST /api/operations: Unified intake across 11 public pages
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const sourcePage = (body.sourcePage || '/submit-observation') as PublicSourcePage;
    const meta = SOURCE_PAGE_MAP[sourcePage] || {
      prefix: 'KEW-GEN',
      managementCenter: 'SCIENTIFIC_INTAKE',
      managementCenterLabel: 'Scientific Intake',
      label: 'General Intake',
      userDashboardSection: 'My Submissions',
    };

    if (!body.title || !body.ownerEmail) {
      return NextResponse.json(
        { success: false, error: 'Title and contact email are required.' },
        { status: 400 }
      );
    }

    const trackingId = generateTrackingId(sourcePage);
    const now = new Date().toISOString();

    // Auto-classify priority if not specified
    let priority: SubmissionPriority = body.priority || 'MEDIUM';
    if (sourcePage === '/report-issue') {
      const detailsLower = (body.details || '').toLowerCase();
      if (
        detailsLower.includes('chemical') || 
        detailsLower.includes('effluent') || 
        detailsLower.includes('fire') || 
        detailsLower.includes('kill') ||
        detailsLower.includes('emergency') ||
        detailsLower.includes('toxic')
      ) {
        priority = 'CRITICAL';
      } else {
        priority = 'HIGH';
      }
    }

    const newRecord: OperationRecord = {
      id: `op_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      trackingId,
      sourcePage,
      sourcePageLabel: meta.label,
      managementCenter: meta.managementCenter,
      managementCenterLabel: meta.managementCenterLabel,
      userDashboardSection: meta.userDashboardSection,
      title: body.title.trim(),
      category: body.category || 'General Ingestion',
      priority,
      status: 'PENDING',
      ownerName: body.ownerName || 'Verified Contributor',
      ownerEmail: body.ownerEmail.trim().toLowerCase(),
      organization: body.organization || undefined,
      district: body.district || 'Srinagar',
      details: body.details || body.title,
      assignedTo: priority === 'CRITICAL' ? 'Immediate Triage Officer' : undefined,
      isEscalated: priority === 'CRITICAL',
      slaDeadline: priority === 'CRITICAL' ? 'Immediate (< 4 Hours)' : '< 24 Hours SLA',
      timeline: [
        {
          timestamp: new Date().toUTCString(),
          actor: body.ownerName || 'Public Contributor',
          action: `Submitted via ${meta.label}`,
          note: `Auto-assigned tracking ID ${trackingId} to ${meta.managementCenterLabel}.`,
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    // Prepend to in-memory store
    operationsMemoryStore.unshift(newRecord);

    // Also attempt PostgreSQL write if connected
    try {
      await pool.query(
        `INSERT INTO research_submissions (
          id, "referenceId", title, abstract, institution, 
          "contributorName", contributor_email, "contributorType", 
          district, category, details, status, "createdAt", "updatedAt"
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'PENDING', NOW(), NOW())
        ON CONFLICT DO NOTHING`,
        [
          newRecord.id,
          newRecord.trackingId,
          newRecord.title,
          newRecord.details,
          newRecord.organization || 'Kashmir EcoWatch Contributor Network',
          newRecord.ownerName,
          newRecord.ownerEmail,
          'contributor',
          newRecord.district,
          newRecord.category,
          newRecord.details,
        ]
      );
    } catch (dbErr) {
      // In-memory record is safely preserved
    }

    return NextResponse.json({
      success: true,
      trackingId,
      record: newRecord,
      message: `Your submission has been recorded under tracking ID ${trackingId}.`,
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PATCH /api/operations: Admin updates status, assignment, or priority
export async function PATCH(req: NextRequest) {
  try {
    const adminKey = req.headers.get('x-admin-key');
    if (adminKey !== 'KEW-Admin-2026!') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Admin authentication key required.' },
        { status: 401 }
      );
    }

    const { trackingId, status, assignedTo, priority, note, actor } = await req.json();

    if (!trackingId) {
      return NextResponse.json({ success: false, error: 'trackingId required' }, { status: 400 });
    }

    const record = operationsMemoryStore.find((r) => r.trackingId === trackingId);
    if (!record) {
      return NextResponse.json({ success: false, error: 'Record not found' }, { status: 404 });
    }

    if (status) record.status = status;
    if (assignedTo) record.assignedTo = assignedTo;
    if (priority) record.priority = priority;
    record.updatedAt = new Date().toISOString();

    record.timeline.push({
      timestamp: new Date().toUTCString(),
      actor: actor || 'Platform Administrator',
      action: status ? `Status updated to ${status}` : 'Record updated',
      note: note || (assignedTo ? `Assigned to ${assignedTo}` : undefined),
    });

    return NextResponse.json({ success: true, record });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
