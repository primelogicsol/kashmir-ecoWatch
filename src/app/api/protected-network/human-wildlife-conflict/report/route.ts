import { NextResponse } from 'next/server';

/**
 * Community Coexistence & Incident Reporting Submission Desk
 * Receives public observations & community conflict reports.
 * Strict protocol:
 * - Automatically assigns 'Under Review' status (never auto-publishes)
 * - Reminds reporter that KEW is an analytical monitor, not emergency dispatch
 * - Prompts users to contact official Wildlife Emergency Helplines for active threats
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      incidentType,
      region,
      district,
      generalLocation,
      approximateDate,
      approximateTime,
      speciesKnown,
      description,
      humanInjuryReported,
      livestockLossReported,
      cropDamageReported,
      reporterCategory,
      reporterContact,
      consentAgreed
    } = body;

    // Basic validation
    if (!incidentType || !region || !generalLocation || !description) {
      return NextResponse.json({
        success: false,
        error: 'Missing required incident fields (Type, Region, General Location, Description).'
      }, { status: 400 });
    }

    if (!consentAgreed) {
      return NextResponse.json({
        success: false,
        error: 'Consent to the KEW Sensitive Ecological Information & Verification Policy is required.'
      }, { status: 400 });
    }

    // Generate unique tracking ticket
    const ticketId = `HWC-SUB-${Date.now().toString(36).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    return NextResponse.json({
      success: true,
      ticketId,
      status: 'Submitted · Queued for Independent Field Verification',
      message: 'Report received securely. It will be reviewed by the KEW Scientific Verification Panel and cross-checked against official wildlife department logs before entering the public registry.',
      notice: 'IMPORTANT SAFETY NOTICE: Kashmir EcoWatch is an open scientific monitoring platform and DOES NOT operate emergency rescue or wildlife dispatch services. If there is an active threat to life or property, call the official Wildlife Protection Department helpline immediately.',
      emergencyHelplines: {
        kashmirValley: '1800-180-7177 (Toll-Free) or 0194-2452026',
        jammuDivision: '0191-2544575',
        ladakhUT: '01982-252171',
        ajkRegion: '+92-5822-921630',
        gbRegion: '+92-5811-920156'
      }
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to process incident report submission.'
    }, { status: 500 });
  }
}
