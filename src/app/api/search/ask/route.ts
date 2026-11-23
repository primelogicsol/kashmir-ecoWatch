import { NextRequest, NextResponse } from 'next/server';
import { executeScientificQuestionSynthesis } from '@/lib/search/scientific-qa';
import { KewSubregion } from '@/lib/search/types';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const sp = request.nextUrl.searchParams;
    const q = sp.get('q') || sp.get('question') || '';
    const subregion = (sp.get('subregion') as KewSubregion | 'all' | 'Gilgit-Baltistan') || 'all';
    const verifiedOnly = sp.get('verifiedOnly') === 'true';
    const maxCitations = sp.get('maxCitations') ? Number(sp.get('maxCitations')) : 14;

    const response = await executeScientificQuestionSynthesis({
      question: q,
      subregion,
      verifiedOnly,
      maxCitations,
    });

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=30, stale-while-revalidate=120',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Scientific evidence synthesis failed',
        message: error?.message || 'Unexpected error',
      },
      { status: 500 }
    );
  }
}
