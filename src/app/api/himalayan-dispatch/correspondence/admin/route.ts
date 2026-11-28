import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import {
  canActorViewRecord,
  encryptAtRest,
  ensureCorrespondenceSchema,
  getAdminCorrespondenceBundle,
  recordCorrespondenceAudit,
  resolveEditorialCorrespondenceActor,
} from '@/lib/himalayan-dispatch-correspondence';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const NO_STORE_HEADERS = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, private',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};

export async function GET(request: NextRequest) {
  const actor = await resolveEditorialCorrespondenceActor(request);
  if (!actor.authenticated || !actor.canAccessCorrespondenceCenter) {
    return NextResponse.json(
      {
        success: false,
        authenticated: false,
        error:
          'Unauthorized: Active Himalayan Dispatch editorial credentials are required to access the Editorial Correspondence Center.',
      },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  const bundle = await getAdminCorrespondenceBundle(actor);
  return NextResponse.json({ success: true, ...bundle }, { headers: NO_STORE_HEADERS });
}

export async function POST(request: NextRequest) {
  const actor = await resolveEditorialCorrespondenceActor(request);
  if (!actor.authenticated || !actor.canAccessCorrespondenceCenter) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized: Editorial credentials required.' },
      { status: 401, headers: NO_STORE_HEADERS }
    );
  }

  await ensureCorrespondenceSchema();

  try {
    const body = await request.json();
    const action = String(body?.action || '');

    // 1. Mark read / unread, update status, priority, assignment, or internal notes
    if (action === 'update_metadata') {
      const referenceNumber = String(body?.referenceNumber || '').trim().toUpperCase();
      const cRes = await pool.query(
        `SELECT * FROM hd_editorial_correspondence WHERE reference_number = $1 LIMIT 1`,
        [referenceNumber]
      );
      const row = cRes.rows[0];
      if (!row) {
        return NextResponse.json(
          { success: false, error: 'Record not found.' },
          { status: 404, headers: NO_STORE_HEADERS }
        );
      }
      if (!canActorViewRecord(actor, row)) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Forbidden: Confidential Himalayan Dispatch correspondence requires authorized Source Protection / Editorial Directorate permissions.',
          },
          { status: 403, headers: NO_STORE_HEADERS }
        );
      }

      const nextIsRead =
        typeof body?.isRead === 'boolean' ? body.isRead : Boolean(row.is_read);
      const nextStatus = String(body?.status || row.status);
      const nextPriority = String(body?.priority || row.priority);
      const nextDept = String(body?.assignedDepartment || row.assigned_department);
      const nextDeskCode = String(body?.deskCode || row.desk_code);
      const nextBureau =
        body?.assignedBureau !== undefined ? body.assignedBureau || null : row.assigned_bureau;
      const nextEditorSlug =
        body?.assignedEditorSlug !== undefined
          ? body.assignedEditorSlug || null
          : row.assigned_editor_slug;
      const nextNotesEnc =
        typeof body?.internalNotes === 'string'
          ? encryptAtRest(body.internalNotes)
          : row.internal_notes_enc;

      await pool.query(
        `UPDATE hd_editorial_correspondence
         SET is_read = $2,
             status = $3,
             priority = $4,
             assigned_department = $5,
             desk_code = $6,
             assigned_bureau = $7,
             assigned_editor_slug = $8,
             internal_notes_enc = $9,
             resolved_at = CASE WHEN $3 = 'resolved' THEN COALESCE(resolved_at, NOW()) ELSE resolved_at END,
             archived_at = CASE WHEN $3 = 'archived' THEN COALESCE(archived_at, NOW()) ELSE archived_at END,
             updated_at = NOW()
         WHERE id = $1`,
        [
          row.id,
          nextIsRead,
          nextStatus,
          nextPriority,
          nextDept,
          nextDeskCode,
          nextBureau,
          nextEditorSlug,
          nextNotesEnc,
        ]
      );

      await recordCorrespondenceAudit({
        actorSlug: actor.slug,
        actorName: actor.name,
        actorRoleSummary: actor.roleSummary,
        action: 'correspondence:metadata_updated',
        targetReference: referenceNumber,
        details: `Updated status=${nextStatus}, priority=${nextPriority}, desk="${nextDept}", read=${nextIsRead}.`,
      });

      const bundle = await getAdminCorrespondenceBundle(actor);
      return NextResponse.json({ success: true, ...bundle }, { headers: NO_STORE_HEADERS });
    }

    // 2. Send two-way editorial response or request for additional evidence
    if (action === 'send_editorial_reply') {
      const referenceNumber = String(body?.referenceNumber || '').trim().toUpperCase();
      const replyBody = String(body?.replyBody || '').trim();
      const messageKind =
        body?.messageKind === 'evidence_request' ? 'evidence_request' : 'editorial_response';

      if (replyBody.length < 5) {
        return NextResponse.json(
          { success: false, error: 'Please enter a clear editorial response.' },
          { status: 400, headers: NO_STORE_HEADERS }
        );
      }

      const cRes = await pool.query(
        `SELECT * FROM hd_editorial_correspondence WHERE reference_number = $1 LIMIT 1`,
        [referenceNumber]
      );
      const row = cRes.rows[0];
      if (!row) {
        return NextResponse.json(
          { success: false, error: 'Correspondence record not found.' },
          { status: 404, headers: NO_STORE_HEADERS }
        );
      }
      if (!canActorViewRecord(actor, row)) {
        return NextResponse.json(
          { success: false, error: 'Forbidden: Segregated editorial permissions block this action.' },
          { status: 403, headers: NO_STORE_HEADERS }
        );
      }

      const msgId = `hdcm_${Date.now()}_${crypto.randomBytes(5).toString('hex')}`;
      const senderLabel = `${row.assigned_department} · Himalayan Dispatch`;
      const nextStatus =
        messageKind === 'evidence_request' ? 'awaiting_response' : 'responded';

      await pool.query(
        `INSERT INTO hd_correspondence_messages (
          id, correspondence_id, sender_type, sender_label, message_kind, body_enc, attachments_json
        ) VALUES ($1, $2, 'editorial_desk', $3, $4, $5, '[]'::jsonb)`,
        [msgId, row.id, senderLabel, messageKind, encryptAtRest(replyBody)]
      );

      await pool.query(
        `UPDATE hd_editorial_correspondence
         SET is_read = TRUE,
             status = $2,
             responded_at = NOW(),
             last_message_at = NOW(),
             updated_at = NOW()
         WHERE id = $1`,
        [row.id, nextStatus]
      );

      await recordCorrespondenceAudit({
        actorSlug: actor.slug,
        actorName: actor.name,
        actorRoleSummary: actor.roleSummary,
        action:
          messageKind === 'evidence_request'
            ? 'correspondence:evidence_requested'
            : 'correspondence:editorial_responded',
        targetReference: referenceNumber,
        details: `Sent ${messageKind} from ${senderLabel}; thread status set to ${nextStatus}.`,
      });

      const bundle = await getAdminCorrespondenceBundle(actor);
      return NextResponse.json({ success: true, ...bundle }, { headers: NO_STORE_HEADERS });
    }

    // 3. Phase 09: Request Authorized KEW Evidence Exchange (references KEW record without duplicating DB)
    if (action === 'request_kew_evidence') {
      const kewTrackingId = String(body?.kewTrackingId || '').trim().toUpperCase();
      const requestPurpose = String(body?.requestPurpose || '').trim();
      if (!kewTrackingId || requestPurpose.length < 10) {
        return NextResponse.json(
          {
            success: false,
            error: 'Provide a KEW tracking ID and a substantive scientific/investigative purpose.',
          },
          { status: 400, headers: NO_STORE_HEADERS }
        );
      }

      const kRes = await pool.query(
        `SELECT * FROM kew_operations_consent_ledger WHERE tracking_id = $1 LIMIT 1`,
        [kewTrackingId]
      );
      const kRow = kRes.rows[0];
      if (!kRow || !kRow.editorial_consideration_consent) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Consent Gate Blocked: This KEW submission has not granted editorial consideration authorization.',
          },
          { status: 403, headers: NO_STORE_HEADERS }
        );
      }

      const exId = `hdke_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
      await pool.query(
        `INSERT INTO hd_kew_evidence_exchange (
          id, kew_tracking_id, kew_source_page, submission_title, district,
          contributor_consent_verified, requested_by_slug, requested_by_name, request_purpose
        ) VALUES ($1, $2, $3, $4, $5, TRUE, $6, $7, $8)`,
        [
          exId,
          kRow.tracking_id,
          kRow.source_page,
          kRow.title,
          kRow.district,
          actor.slug,
          actor.name,
          requestPurpose,
        ]
      );

      await recordCorrespondenceAudit({
        actorSlug: actor.slug,
        actorName: actor.name,
        actorRoleSummary: actor.roleSummary,
        action: 'kew_evidence_exchange:requested',
        targetReference: kewTrackingId,
        details: `Requested controlled access to consented KEW submission ${kewTrackingId} (${kRow.source_page}).`,
      });

      const bundle = await getAdminCorrespondenceBundle(actor);
      return NextResponse.json({ success: true, ...bundle }, { headers: NO_STORE_HEADERS });
    }

    // 4. Phase 09: Approve / Deny / Revoke KEW Evidence Exchange
    if (action === 'decide_kew_evidence') {
      if (!actor.canApproveKewEvidenceExchange) {
        return NextResponse.json(
          {
            success: false,
            error: 'Forbidden: Approving or revoking cross-platform evidence exchange requires senior editorial or institutional authority.',
          },
          { status: 403, headers: NO_STORE_HEADERS }
        );
      }

      const exchangeId = String(body?.exchangeId || '');
      const decision = String(body?.decision || '');
      const editorialNotes = String(body?.editorialNotes || '').trim();
      if (!['approved', 'denied', 'revoked'].includes(decision)) {
        return NextResponse.json(
          { success: false, error: 'Invalid exchange decision.' },
          { status: 400, headers: NO_STORE_HEADERS }
        );
      }

      const uRes = await pool.query(
        `UPDATE hd_kew_evidence_exchange
         SET approval_status = $2,
             approved_by_slug = $3,
             approved_by_name = $4,
             editorial_notes = $5,
             updated_at = NOW()
         WHERE id = $1
         RETURNING kew_tracking_id`,
        [exchangeId, decision, actor.slug, actor.name, editorialNotes || null]
      );

      if (!uRes.rows[0]) {
        return NextResponse.json(
          { success: false, error: 'Evidence exchange record not found.' },
          { status: 404, headers: NO_STORE_HEADERS }
        );
      }

      await recordCorrespondenceAudit({
        actorSlug: actor.slug,
        actorName: actor.name,
        actorRoleSummary: actor.roleSummary,
        action: `kew_evidence_exchange:${decision}`,
        targetReference: uRes.rows[0].kew_tracking_id,
        details: `KEW evidence exchange ${exchangeId} marked "${decision}" by ${actor.name}.`,
      });

      const bundle = await getAdminCorrespondenceBundle(actor);
      return NextResponse.json({ success: true, ...bundle }, { headers: NO_STORE_HEADERS });
    }

    return NextResponse.json(
      { success: false, error: 'Unsupported administrative action.' },
      { status: 400, headers: NO_STORE_HEADERS }
    );
  } catch (err) {
    console.error('[HD Correspondence Admin] Error:', err);
    return NextResponse.json(
      { success: false, error: 'Unable to execute administrative correspondence action.' },
      { status: 500, headers: NO_STORE_HEADERS }
    );
  }
}
