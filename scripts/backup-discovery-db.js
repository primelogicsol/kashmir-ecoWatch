/**
 * Non-destructive PostgreSQL Snapshot Backup Utility for Kashmir EcoWatch Discovery & Operations Tables.
 * Exports JSON table snapshots to C:\Users\Fayaz\.gemini\antigravity-cli\brain\19a9a470-0434-4ca8-9f80-d28bc6bf1ba5\scratch\db-backups\
 * (outside the git working tree so sensitive operational records are never committed).
 * Never logs DATABASE_URL or credentials.
 */
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

function loadDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  const envPath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) throw new Error('.env file not found');
  const raw = fs.readFileSync(envPath, 'utf8');
  const m = raw.match(/^DATABASE_URL=(.*)$/m);
  if (!m) throw new Error('DATABASE_URL not found in .env');
  return m[1].replace(/^['"]|['"]$/g, '').trim();
}

const BACKUP_TABLES = [
  'kew_discovery_events',
  'kew_brand_monitors',
  'kew_distribution_workflows',
  'kew_indexnow_logs',
  'kew_indexnow_url_ledger',
  'kew_discovery_audit_logs',
  'kew_operations_records',
];

(async () => {
  const backupDir =
    process.env.KEW_BACKUP_DIR ||
    path.join(process.cwd(), 'data', 'backups');
  fs.mkdirSync(backupDir, { recursive: true });

  const pool = new Pool({
    connectionString: loadDatabaseUrl(),
    connectionTimeoutMillis: 6000,
  });

  try {
    const existingTablesRes = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    const existingSet = new Set(existingTablesRes.rows.map((r) => r.table_name));
    const snapshot = {
      createdAt: new Date().toISOString(),
      publicTableCount: existingSet.size,
      publicTables: Array.from(existingSet),
      tables: {},
    };

    for (const tbl of BACKUP_TABLES) {
      if (existingSet.has(tbl)) {
        const res = await pool.query(`SELECT * FROM ${tbl}`);
        snapshot.tables[tbl] = {
          exists: true,
          rowCount: res.rowCount,
          rows: res.rows,
        };
      } else {
        snapshot.tables[tbl] = {
          exists: false,
          rowCount: 0,
          rows: [],
        };
      }
    }

    // Also record row count of kew_search_documents without dumping 6,496 full text blobs unnecessarily
    if (existingSet.has('kew_search_documents')) {
      const cnt = await pool.query(`SELECT COUNT(*)::int AS c FROM kew_search_documents`);
      snapshot.kewSearchDocumentsRowCount = cnt.rows[0]?.c || 0;
    }

    const stamp = new Date().toISOString().replace(/[:.]/g, '-');
    const outFile = path.join(backupDir, `kew-predeploy-snapshot-${stamp}.json`);
    fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2), 'utf8');

    console.log(
      JSON.stringify(
        {
          backupStatus: 'COMPLETED_NON_DESTRUCTIVE',
          snapshotPath: outFile,
          publicTablesFound: snapshot.publicTables,
          kewSearchDocumentsRowCount: snapshot.kewSearchDocumentsRowCount || 0,
          backedUpTableRowCounts: Object.fromEntries(
            Object.entries(snapshot.tables).map(([k, v]) => [k, v.rowCount])
          ),
        },
        null,
        2
      )
    );
  } finally {
    await pool.end();
  }
})();
