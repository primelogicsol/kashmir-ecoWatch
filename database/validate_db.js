const { Client } = require('pg');

async function validateDatabase() {
  const client = new Client({
    connectionString: process.env.DIRECT_URL || "postgres://admin:password@localhost:5432/kew_hazard_db",
  });

  try {
    await client.connect();
    console.log('✅ Connected to database as Admin');

    // 1. Check PostGIS
    const postgisRes = await client.query('SELECT PostGIS_full_version() as version;');
    console.log('✅ PostGIS installed:', postgisRes.rows[0].version.substring(0, 50) + '...');

    // 2. Check TimescaleDB Hypertables
    const tsRes = await client.query(`
      SELECT hypertable_name 
      FROM timescaledb_information.hypertables 
      WHERE hypertable_name IN ('observations_ts', 'forecasts_ts');
    `);
    if (tsRes.rows.length === 2) {
      console.log('✅ TimescaleDB Hypertables exist (observations_ts, forecasts_ts)');
    } else {
      console.error('❌ Missing Hypertables. Found:', tsRes.rows);
    }

    // 3. Verify Seed Data
    const zonesRes = await client.query('SELECT count(*) as count FROM hazard_zones;');
    console.log(`✅ Hazard Zones seeded: ${zonesRes.rows[0].count}`);

    const sourcesRes = await client.query('SELECT count(*) as count FROM sources;');
    console.log(`✅ Sources seeded: ${sourcesRes.rows[0].count}`);

  } catch (err) {
    console.error('❌ Validation failed:', err.message);
  } finally {
    await client.end();
  }
}

validateDatabase();
