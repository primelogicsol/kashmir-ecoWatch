import { NextRequest, NextResponse } from 'next/server';
import {
  getOrGenerateDossierPdf,
  getMergedMasterRecord,
  recordReportAnalyticsEvent,
} from '@/lib/sectoral-research-store';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const { searchParams } = new URL(request.url);
  const dispositionParam = searchParams.get('disposition') === 'inline' ? 'inline' : 'attachment';

  const master = getMergedMasterRecord(code, false);
  if (!master) {
    return NextResponse.json(
      { success: false, error: `Scientific dossier "${code}" not found.` },
      { status: 404 }
    );
  }

  const isPublished =
    master.dossier.status === 'Published' || master.dossier.status === 'Updated';

  // Governance Gate: Only approved Published/Updated reports allow public PDF download unless scoping=1 is explicitly requested by admin preview
  const allowScopingPreview = searchParams.get('preview') === 'scoping';
  if (!isPublished && !allowScopingPreview) {
    return NextResponse.json(
      {
        success: false,
        code: master.dossier.code,
        status: master.dossier.status,
        governanceNotice: `${master.dossier.code} is currently in "${master.dossier.status}" status (${master.dossier.targetPages}-page target). Public PDF publication is enabled only once scientific investigation, ground validation, and peer approval are completed.`,
      },
      { status: 409 }
    );
  }

  const artifact = getOrGenerateDossierPdf(master.dossier.code);
  if (!artifact) {
    return NextResponse.json(
      { success: false, error: 'PDF generation failed.' },
      { status: 500 }
    );
  }

  recordReportAnalyticsEvent(
    master.dossier.code,
    dispositionParam === 'inline' ? 'pdf_viewer_open' : 'pdf_download'
  );

  return new NextResponse(new Uint8Array(artifact.buffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Length': String(artifact.byteLength),
      'Content-Disposition': `${dispositionParam}; filename="${artifact.filename}"`,
      'Accept-Ranges': 'bytes',
      'X-KEW-Report-Code': master.dossier.code,
      'X-KEW-PDF-Pages': String(artifact.pageCount),
      'X-KEW-PDF-SHA256': artifact.sha256,
      'Cache-Control': 'public, max-age=300',
    },
  });
}
