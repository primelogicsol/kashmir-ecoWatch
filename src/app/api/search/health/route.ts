import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminRequest } from '@/lib/seo/admin-session';
import {
  getCompiledSearchCorpus,
  invalidateSearchCorpusCache,
} from '@/lib/search/index-builder';
import {
  getPostgresSearchHealth,
  syncSearchIndexToPostgres,
} from '@/lib/search/pg-store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const corpus = getCompiledSearchCorpus();
  const pgHealth = await getPostgresSearchHealth();

  const exclusionBreakdown: Record<string, number> = {};
  for (const ex of corpus.excluded) {
    exclusionBreakdown[ex.reason] = (exclusionBreakdown[ex.reason] || 0) + 1;
  }

  return NextResponse.json({
    status: corpus.adapters.every((a) => a.sourceHealthy) && corpus.brokenLinks.length === 0 ? 'HEALTHY' : 'DEGRADED',
    builtAt: corpus.builtAt,
    buildDurationMs: corpus.buildDurationMs,
    totalIndexedDocuments: corpus.documents.length,
    deduplicatedCount: corpus.deduplicatedCount,
    brokenLinksCount: corpus.brokenLinks.length,
    brokenLinks: corpus.brokenLinks,
    routeInventoryStats: corpus.routeInventoryStats,
    coverageByDomain: corpus.coverageByDomain,
    coverageByResultClass: corpus.coverageByResultClass,
    coverageByDocumentType: corpus.coverageByDocumentType,
    coverageBySubregion: corpus.coverageBySubregion,
    coverageByTrustBadge: corpus.coverageByTrustBadge,
    coverageByTemporalNature: corpus.coverageByTemporalNature,
    adapters: corpus.adapters,
    exclusionSummary: {
      totalExcluded: corpus.excluded.length,
      byReason: exclusionBreakdown,
      sampleExcluded: corpus.excluded.slice(0, 35),
    },
    postgresSearchIndex: pgHealth,
  });
}

export async function POST(req: NextRequest) {
  const authCheck = await verifyAdminRequest(req);
  if (!authCheck.authorized) {
    return NextResponse.json(
      { error: 'Unauthorized: Administrator session required to trigger search index rebuild.' },
      { status: 401 }
    );
  }
  const trigger = req.nextUrl.searchParams.get('trigger') || 'manual-api-sync';
  invalidateSearchCorpusCache();
  const corpus = getCompiledSearchCorpus(true);
  const pgStatus = await syncSearchIndexToPostgres(corpus.documents, trigger);

  return NextResponse.json({
    synced: pgStatus.connected,
    totalIndexedDocuments: corpus.documents.length,
    brokenLinksCount: corpus.brokenLinks.length,
    postgresSearchIndex: pgStatus,
  });
}
