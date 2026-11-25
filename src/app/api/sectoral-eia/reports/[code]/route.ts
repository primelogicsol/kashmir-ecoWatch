import { NextRequest, NextResponse } from 'next/server';
import {
  getMergedMasterRecord,
  getOrGenerateDossierPdf,
  recordReportAnalyticsEvent,
} from '@/lib/sectoral-research-store';

export const runtime = 'nodejs';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const { searchParams } = new URL(request.url);
  const trackView = searchParams.get('trackView') === '1';

  const master = getMergedMasterRecord(code, true);
  if (!master) {
    return NextResponse.json(
      { success: false, error: `Research dossier "${code}" not found.` },
      { status: 404 }
    );
  }

  if (trackView) {
    recordReportAnalyticsEvent(master.dossier.code, 'report_view');
  }

  const isPublished =
    master.dossier.status === 'Published' || master.dossier.status === 'Updated';
  const pdfMeta = isPublished ? getOrGenerateDossierPdf(master.dossier.code) : undefined;

  return NextResponse.json({
    success: true,
    master,
    pdfMetadata: pdfMeta
      ? {
          filename: pdfMeta.filename,
          pageCount: pdfMeta.pageCount,
          byteLength: pdfMeta.byteLength,
          sha256: pdfMeta.sha256,
          downloadUrl: `/api/sectoral-eia/reports/${master.dossier.code.toLowerCase()}/pdf`,
          inlineViewerUrl: `/api/sectoral-eia/reports/${master.dossier.code.toLowerCase()}/pdf?disposition=inline`,
        }
      : null,
  });
}
