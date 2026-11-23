// ─────────────────────────────────────────────────────────────────────────────
// POSTGRESQL FULL-TEXT SEARCH (tsvector + GIN) + pg_trgm + unaccent STORE
// Synchronizes canonical SearchDocument corpus + approved DB submissions into
// PostgreSQL, logs sync runs, and executes typo-tolerant FTS queries with
// resilient timeout isolation so upstream DB hiccups never break public search
// ─────────────────────────────────────────────────────────────────────────────

import pool from '@/lib/db';
import { SearchDocument } from './types';
import { resolveSubregion } from './multilingual-gazetteer';

export interface PostgresSearchStatus {
  connected: boolean;
  schemaInitialized: boolean;
  indexedRowCount: number;
  extensions: string[];
  lastSyncAt: string | null;
  lastSyncStatus: string | null;
  dbSubmissionsIngested: number;
  error?: string;
}

const globalForPgSearch = globalThis as unknown as {
  __kewPgSynced?: boolean;
  __kewPgSyncPromise?: Promise<PostgresSearchStatus> | null;
  __kewPgLastStatus?: PostgresSearchStatus;
};

async function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  let timer: NodeJS.Timeout | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`PostgreSQL timeout (${ms}ms)`)), ms);
  });
  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

export async function fetchApprovedDatabaseDocuments(): Promise<SearchDocument[]> {
  const dbDocs: SearchDocument[] = [];
  try {
    // Pull approved/published research submissions from PostgreSQL if present
    const res = await withTimeout(
      pool.query(
        `SELECT id, title, abstract, category, district, status, created_at
         FROM research_submissions
         WHERE status IN ('APPROVED', 'PUBLISHED', 'VERIFIED')
         LIMIT 200`
      ),
      2000
    );
    for (const row of res.rows || []) {
      dbDocs.push({
        id: `db-research:${row.id}`,
        documentType: 'scientific_report',
        resultClass: 'report_dataset',
        domain: 'scientific_research',
        title: row.title,
        subtitle: `Verified Contributor Research (${row.category || 'Submission'})`,
        description: row.abstract || 'Approved scientific submission in the KEW PostgreSQL repository.',
        canonicalUrl: '/library',
        parentModule: 'Research & Evidence Library',
        subregion: resolveSubregion(row.district),
        district: row.district || undefined,
        tags: ['Contributor Research', row.category].filter(Boolean),
        synonyms: [],
        source: 'KEW PostgreSQL Research Repository',
        trustBadge: 'Peer-Reviewed / Institutional',
        temporalNature: 'reference',
        lastUpdated: row.created_at ? new Date(row.created_at).toISOString() : undefined,
        verificationStatus: row.status,
        dataFreshness: 'recent_operational',
        accessClassification: 'public',
        ctaLabel: 'Open Research Archive',
        adapterId: 'postgres-db',
      });
    }
  } catch {
    // Table schema may vary or have 0 approved rows; fail gracefully
  }
  return dbDocs;
}

export async function syncSearchIndexToPostgres(
  documents: SearchDocument[],
  triggerSource = 'auto-warmup'
): Promise<PostgresSearchStatus> {
  if (globalForPgSearch.__kewPgSyncPromise) {
    return globalForPgSearch.__kewPgSyncPromise;
  }

  const run = async (): Promise<PostgresSearchStatus> => {
    const start = performance.now();
    const client = await withTimeout(pool.connect(), 3500);
    try {
      await client.query(`CREATE EXTENSION IF NOT EXISTS pg_trgm`);
      await client.query(`CREATE EXTENSION IF NOT EXISTS unaccent`);

      await client.query(`
        CREATE TABLE IF NOT EXISTS kew_search_documents (
          id TEXT PRIMARY KEY,
          document_type TEXT NOT NULL,
          result_class TEXT NOT NULL,
          domain TEXT NOT NULL,
          title TEXT NOT NULL,
          subtitle TEXT,
          description TEXT NOT NULL,
          canonical_url TEXT NOT NULL,
          parent_module TEXT NOT NULL,
          subregion TEXT,
          district TEXT,
          watershed TEXT,
          lat DOUBLE PRECISION,
          lng DOUBLE PRECISION,
          coord_precision TEXT,
          trust_badge TEXT NOT NULL,
          temporal_nature TEXT NOT NULL,
          verification_status TEXT,
          data_freshness TEXT,
          last_updated TEXT,
          search_text TEXT NOT NULL,
          search_vector TSVECTOR,
          synced_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS kew_search_sync_logs (
          id SERIAL PRIMARY KEY,
          trigger_source TEXT NOT NULL,
          total_documents INT NOT NULL,
          db_submissions_ingested INT NOT NULL DEFAULT 0,
          duration_ms INT NOT NULL,
          status TEXT NOT NULL,
          error_message TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW()
        );
      `);

      await client.query(
        `CREATE INDEX IF NOT EXISTS idx_kew_search_fts ON kew_search_documents USING GIN (search_vector)`
      );
      await client.query(
        `CREATE INDEX IF NOT EXISTS idx_kew_search_title_trgm ON kew_search_documents USING GIN (title gin_trgm_ops)`
      );
      await client.query(
        `CREATE INDEX IF NOT EXISTS idx_kew_search_facets ON kew_search_documents (result_class, domain, subregion)`
      );

      const dbDocs = await fetchApprovedDatabaseDocuments();
      const allDocs = [...documents, ...dbDocs];

      await client.query('BEGIN');
      await client.query('TRUNCATE TABLE kew_search_documents');

      const BATCH_SIZE = 250;
      for (let i = 0; i < allDocs.length; i += BATCH_SIZE) {
        const chunk = allDocs.slice(i, i + BATCH_SIZE);
        const values: any[] = [];
        const placeholders: string[] = [];

        chunk.forEach((d, idx) => {
          const base = idx * 21;
          const multiFlat = d.multilingualTerms
            ? [
                ...(d.multilingualTerms.ur || []),
                ...(d.multilingualTerms.ks || []),
                ...(d.multilingualTerms.hi || []),
                ...(d.multilingualTerms.translit || []),
              ].join(' ')
            : '';
          const synAndMulti = [...(d.synonyms || []), multiFlat].filter(Boolean).join(' ');
          const tagsStr = (d.tags || []).join(' ');
          const searchText = [
            d.title,
            d.subtitle || '',
            synAndMulti,
            tagsStr,
            d.district || '',
            d.watershed || '',
            d.subregion || '',
            d.description,
          ]
            .filter(Boolean)
            .join(' ');

          placeholders.push(
            `($${base + 1}, $${base + 2}, $${base + 3}, $${base + 4}, $${base + 5}, $${base + 6}, $${base + 7}, $${base + 8}, $${base + 9}, $${base + 10}, $${base + 11}, $${base + 12}, $${base + 13}, $${base + 14}, $${base + 15}, $${base + 16}, $${base + 17}, $${base + 18}, $${base + 19}, $${base + 20},
              setweight(to_tsvector('english', unaccent(coalesce($${base + 5}, ''))), 'A') ||
              setweight(to_tsvector('english', unaccent(coalesce($${base + 6}, '') || ' ' || coalesce($${base + 21}, ''))), 'B') ||
              setweight(to_tsvector('english', unaccent(coalesce($${base + 10}, '') || ' ' || coalesce($${base + 11}, ''))), 'C') ||
              setweight(to_tsvector('english', unaccent(coalesce($${base + 7}, ''))), 'D')
            )`
          );

          values.push(
            d.id,
            d.documentType,
            d.resultClass,
            d.domain,
            d.title,
            d.subtitle || null,
            d.description,
            d.canonicalUrl,
            d.parentModule,
            d.subregion || null,
            d.district || null,
            d.watershed || null,
            d.coordinates?.lat ?? null,
            d.coordinates?.lng ?? null,
            d.coordinates?.precision ?? null,
            d.trustBadge,
            d.temporalNature,
            d.verificationStatus || null,
            d.dataFreshness,
            d.lastUpdated || null,
            searchText,
          );
          // $21 is synAndMulti + tagsStr for weight B
          values[base + 20] = `${synAndMulti} ${tagsStr}`;
          // Wait: keep search_text at $20 and weight B helper at $21 -> 21 params total!
        });

        // Re-align exact 21 params cleanly
        const cleanValues: any[] = [];
        const cleanRows: string[] = [];
        chunk.forEach((d, idx) => {
          const b = idx * 21;
          const multiFlat = d.multilingualTerms
            ? [
                ...(d.multilingualTerms.ur || []),
                ...(d.multilingualTerms.ks || []),
                ...(d.multilingualTerms.hi || []),
                ...(d.multilingualTerms.translit || []),
              ].join(' ')
            : '';
          const synTags = [...(d.synonyms || []), ...(d.tags || []), multiFlat].filter(Boolean).join(' ');
          const searchText = [
            d.title,
            d.subtitle || '',
            synTags,
            d.district || '',
            d.watershed || '',
            d.subregion || '',
            d.description,
          ]
            .filter(Boolean)
            .join(' ');

          cleanRows.push(
            `($${b + 1}, $${b + 2}, $${b + 3}, $${b + 4}, $${b + 5}, $${b + 6}, $${b + 7}, $${b + 8}, $${b + 9}, $${b + 10}, $${b + 11}, $${b + 12}, $${b + 13}, $${b + 14}, $${b + 15}, $${b + 16}, $${b + 17}, $${b + 18}, $${b + 19}, $${b + 20},
              setweight(to_tsvector('english', unaccent(coalesce($${b + 5}, ''))), 'A') ||
              setweight(to_tsvector('english', unaccent(coalesce($${b + 6}, '') || ' ' || coalesce($${b + 21}, ''))), 'B') ||
              setweight(to_tsvector('english', unaccent(coalesce($${b + 10}, '') || ' ' || coalesce($${b + 11}, ''))), 'C') ||
              setweight(to_tsvector('english', unaccent(coalesce($${b + 7}, ''))), 'D')
            )`
          );
          cleanValues.push(
            d.id,
            d.documentType,
            d.resultClass,
            d.domain,
            d.title,
            d.subtitle || null,
            d.description,
            d.canonicalUrl,
            d.parentModule,
            d.subregion || null,
            d.district || null,
            d.watershed || null,
            d.coordinates?.lat ?? null,
            d.coordinates?.lng ?? null,
            d.coordinates?.precision ?? null,
            d.trustBadge,
            d.temporalNature,
            d.verificationStatus || null,
            d.dataFreshness,
            searchText,
            synTags
          );
        });

        await client.query(
          `INSERT INTO kew_search_documents (
            id, document_type, result_class, domain, title, subtitle, description,
            canonical_url, parent_module, subregion, district, watershed,
            lat, lng, coord_precision, trust_badge, temporal_nature,
            verification_status, data_freshness, search_text, search_vector
          ) VALUES ${cleanRows.join(', ')}`,
          cleanValues
        );
      }

      const durationMs = Math.round(performance.now() - start);
      await client.query(
        `INSERT INTO kew_search_sync_logs (trigger_source, total_documents, db_submissions_ingested, duration_ms, status)
         VALUES ($1, $2, $3, $4, 'SUCCESS')`,
        [triggerSource, allDocs.length, dbDocs.length, durationMs]
      );
      await client.query('COMMIT');

      const extRes = await client.query(
        `SELECT extname FROM pg_extension WHERE extname IN ('pg_trgm', 'unaccent', 'postgis') ORDER BY extname`
      );

      const status: PostgresSearchStatus = {
        connected: true,
        schemaInitialized: true,
        indexedRowCount: allDocs.length,
        extensions: extRes.rows.map((r: any) => r.extname),
        lastSyncAt: new Date().toISOString(),
        lastSyncStatus: 'SUCCESS',
        dbSubmissionsIngested: dbDocs.length,
      };
      globalForPgSearch.__kewPgSynced = true;
      globalForPgSearch.__kewPgLastStatus = status;
      return status;
    } catch (err: any) {
      try {
        await client.query('ROLLBACK');
      } catch {}
      const failStatus: PostgresSearchStatus = {
        connected: false,
        schemaInitialized: false,
        indexedRowCount: 0,
        extensions: [],
        lastSyncAt: globalForPgSearch.__kewPgLastStatus?.lastSyncAt || null,
        lastSyncStatus: 'FALLBACK_MEMORY',
        dbSubmissionsIngested: 0,
        error: err?.message || String(err),
      };
      globalForPgSearch.__kewPgLastStatus = failStatus;
      return failStatus;
    } finally {
      client.release();
    }
  };

  globalForPgSearch.__kewPgSyncPromise = run().finally(() => {
    globalForPgSearch.__kewPgSyncPromise = null;
  });
  return globalForPgSearch.__kewPgSyncPromise;
}

export function isPostgresSearchSynced(): boolean {
  return Boolean(globalForPgSearch.__kewPgSynced);
}

export async function queryPostgresScores(query: string, limit = 250): Promise<Map<string, number> | null> {
  if (!globalForPgSearch.__kewPgSynced || !query.trim()) return null;
  try {
    const res = await withTimeout(
      pool.query(
        `SELECT
           id,
           (
             ts_rank_cd(search_vector, websearch_to_tsquery('english', unaccent($1))) * 45.0 +
             word_similarity(unaccent($1), unaccent(title)) * 55.0 +
             CASE WHEN lower(title) = lower($1) THEN 80.0
                  WHEN lower(title) LIKE lower($1) || '%' THEN 40.0
                  ELSE 0.0 END
           ) AS pg_score
         FROM kew_search_documents
         WHERE search_vector @@ websearch_to_tsquery('english', unaccent($1))
            OR word_similarity(unaccent($1), unaccent(title)) > 0.38
            OR search_text ILIKE '%' || $1 || '%'
         ORDER BY pg_score DESC
         LIMIT $2`,
        [query.trim(), limit]
      ),
      1200
    );
    const map = new Map<string, number>();
    for (const row of res.rows || []) {
      map.set(row.id, Number(row.pg_score) || 0);
    }
    return map;
  } catch {
    return null;
  }
}

export async function getPostgresSearchHealth(): Promise<PostgresSearchStatus> {
  try {
    const res = await withTimeout(
      pool.query(`
        SELECT
          (SELECT COUNT(*)::int FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'kew_search_documents') AS has_table,
          ARRAY(SELECT extname FROM pg_extension WHERE extname IN ('pg_trgm', 'unaccent', 'postgis') ORDER BY extname) AS exts
      `),
      2000
    );
    const hasTable = (res.rows[0]?.has_table || 0) > 0;
    let count = 0;
    let lastSyncAt: string | null = null;
    let lastSyncStatus: string | null = null;
    let dbSub = 0;
    if (hasTable) {
      const cRes = await withTimeout(pool.query(`SELECT COUNT(*)::int AS c FROM kew_search_documents`), 1500);
      count = cRes.rows[0]?.c || 0;
      const lRes = await withTimeout(
        pool.query(
          `SELECT status, db_submissions_ingested, created_at FROM kew_search_sync_logs ORDER BY id DESC LIMIT 1`
        ),
        1500
      );
      if (lRes.rows[0]) {
        lastSyncStatus = lRes.rows[0].status;
        dbSub = lRes.rows[0].db_submissions_ingested || 0;
        lastSyncAt = new Date(lRes.rows[0].created_at).toISOString();
      }
      if (count > 0) globalForPgSearch.__kewPgSynced = true;
    }
    return {
      connected: true,
      schemaInitialized: hasTable,
      indexedRowCount: count,
      extensions: res.rows[0]?.exts || [],
      lastSyncAt,
      lastSyncStatus,
      dbSubmissionsIngested: dbSub,
    };
  } catch (err: any) {
    return {
      connected: false,
      schemaInitialized: false,
      indexedRowCount: 0,
      extensions: [],
      lastSyncAt: globalForPgSearch.__kewPgLastStatus?.lastSyncAt || null,
      lastSyncStatus: 'DISCONNECTED_RESILIENT_FALLBACK',
      dbSubmissionsIngested: 0,
      error: err?.message || String(err),
    };
  }
}
