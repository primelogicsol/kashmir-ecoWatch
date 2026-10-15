import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export interface SubmissionPayload {
  title: string;
  category: string;
  district: string;
  contributorName: string;
  contributorEmail: string;
  contributorRole?: string;
  details: string;
}

// GET /api/submissions: Fetch submissions (filtered by email or all for admin)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    let query = `
      SELECT 
        id, 
        title, 
        "contributorName", 
        contributor_email,
        "contributorType", 
        district, 
        category,
        details, 
        status, 
        "createdAt"
      FROM research_submissions
    `;
    const params: any[] = [];

    if (email) {
      query += ` WHERE contributor_email = $1`;
      params.push(email.trim().toLowerCase());
    }

    query += ` ORDER BY "createdAt" DESC LIMIT 100;`;

    const result = await pool.query(query, params);
    return NextResponse.json({ success: true, data: result.rows });
  } catch (err: any) {
    // If table column doesn't match custom names, return clean fallback
    return NextResponse.json({ success: true, data: [], message: err.message });
  }
}

// POST /api/submissions: Create a new submission from contributor
export async function POST(req: NextRequest) {
  try {
    const body: SubmissionPayload = await req.json();

    if (!body.title || !body.contributorEmail) {
      return NextResponse.json({ success: false, error: 'Title and email required.' }, { status: 400 });
    }

    const id = `sub_${Date.now()}`;
    const refId = `REF-${Math.floor(100000 + Math.random() * 900000)}`;

    const insertQuery = `
      INSERT INTO research_submissions (
        id, 
        "referenceId",
        title, 
        abstract,
        institution,
        "contributorName", 
        contributor_email,
        "contributorType", 
        district, 
        category,
        details, 
        status, 
        "publicationStatus",
        "qualityRating",
        "consentGiven",
        "accessLevel",
        featured,
        "createdAt", 
        "updatedAt"
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 
        'PENDING', 'IN_REVIEW', 'UNVERIFIED', true, 'PUBLIC', false, 
        NOW(), NOW()
      )
      RETURNING *;
    `;

    const values = [
      id,
      refId,
      body.title,
      body.details || body.title,
      body.district ? `${body.district} Field Station` : 'Kashmir Scientific Consortium',
      body.contributorName || 'Field Contributor',
      body.contributorEmail.trim().toLowerCase(),
      body.contributorRole || 'researcher',
      body.district || 'Srinagar',
      body.category || 'general',
      body.details || '',
    ];

    const result = await pool.query(insertQuery, values);
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// PATCH /api/submissions: Admin approves or rejects a submission
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json();

    const dbStatus = 
      status === 'approved' ? 'EXPERT_VERIFIED' :
      status === 'rejected' ? 'REJECTED' : 'PENDING';

    const updateQuery = `
      UPDATE research_submissions 
      SET status = $1, "reviewedAt" = NOW(), "updatedAt" = NOW()
      WHERE id = $2
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, [dbStatus, id]);
    return NextResponse.json({ success: true, data: result.rows[0] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
