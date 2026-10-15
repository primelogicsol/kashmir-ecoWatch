const { Client } = require('pg');
const { execSync } = require('child_process');
const fs = require('fs');

async function executeValidation() {
  const startTime = performance.now();
  const report = {
    timestamp: new Date().toISOString(),
    environment: {},
    infrastructure: { score: 0, details: {} },
    database: { score: 0, details: {} },
    spatial: { score: 0, details: {} },
    timeSeries: { score: 0, details: {} },
    api: { score: 0, details: {} },
    security: { score: 0, details: {} },
    overallReadiness: 0,
    errors: [],
    warnings: [],
    verdict: 'Pending',
    executionTimeMs: 0
  };

  console.log("==========================================");
  console.log("   PLATFORM VALIDATION SUITE (CI/CD)      ");
  console.log("==========================================\n");

  // --- 0. ENV VARS ---
  const requiredEnv = ['DIRECT_URL', 'DATABASE_URL', 'INGESTION_DB_URL', 'CRON_SECRET'];
  const missingEnv = requiredEnv.filter(e => !process.env[e]);
  if (missingEnv.length > 0) {
    report.warnings.push(`Missing environment variables: ${missingEnv.join(', ')}`);
  }
  report.environment.envCheck = missingEnv.length === 0 ? 'Passed' : 'Warnings';

  // --- 1. INFRASTRUCTURE ---
  console.log(">> Validating Infrastructure...");
  try {
    const dbStatus = execSync('docker inspect -f "{{.State.Health.Status}}" $(docker compose ps -q db 2>/dev/null) 2>/dev/null').toString().trim();
    if (dbStatus === 'healthy' || dbStatus === 'running') {
       report.infrastructure.score = 100;
       report.infrastructure.details.docker = 'Healthy';
    } else {
       report.warnings.push(`Docker container state is: ${dbStatus}`);
       report.infrastructure.score = 50;
       report.infrastructure.details.docker = dbStatus || 'Unknown';
    }
  } catch (e) {
    report.errors.push("Docker daemon unreachable or container missing.");
    report.infrastructure.score = 0;
    report.infrastructure.details.docker = 'Offline';
  }

  const client = new Client({
    connectionString: process.env.DIRECT_URL || "postgres://admin:password@localhost:5432/kew_hazard_db",
  });

  try {
    await client.connect();
    
    // --- 2. DATABASE ---
    console.log(">> Validating Database Core...");
    const pgVer = await client.query('SELECT version();');
    report.database.details.postgresVersion = pgVer.rows[0].version.split(' ')[1];
    
    const tablesToCheck = ['spatial_entities', 'sources', 'hazard_zones', 'hazard_incidents', 'observations_ts', 'forecasts_ts'];
    let tablesExistCount = 0;
    for (const table of tablesToCheck) {
      const res = await client.query(`SELECT EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename  = '${table}');`);
      if (res.rows[0].exists) tablesExistCount++;
    }
    
    const fkRes = await client.query("SELECT COUNT(*) FROM pg_constraint WHERE contype = 'f';");
    const fkCount = parseInt(fkRes.rows[0].count);
    
    report.database.details.tablesFound = tablesExistCount;
    report.database.details.foreignKeysActive = fkCount;
    
    report.database.score = (tablesExistCount === tablesToCheck.length) ? 100 : Math.round((tablesExistCount / tablesToCheck.length) * 100);
    if (tablesExistCount < tablesToCheck.length) report.errors.push("Missing core tables.");
    if (fkCount === 0) report.errors.push("Foreign key constraints missing.");

    // --- 3. TIME-SERIES (TimescaleDB) ---
    console.log(">> Validating Time-Series Engine...");
    const tsVer = await client.query("SELECT extversion FROM pg_extension WHERE extname = 'timescaledb';");
    report.timeSeries.details.timescaleVersion = tsVer.rows[0]?.extversion || 'Missing';
    
    const hyRes = await client.query("SELECT hypertable_name FROM timescaledb_information.hypertables WHERE hypertable_name IN ('observations_ts', 'forecasts_ts');");
    const hypertables = hyRes.rows.map(r => r.hypertable_name);
    
    const compRes = await client.query("SELECT * FROM timescaledb_information.jobs WHERE proc_name = 'policy_compression';");
    const compressionEnabled = compRes.rows.length > 0;
    
    let tsScore = 0;
    if (tsVer.rows[0]) tsScore += 30;
    if (hypertables.length === 2) tsScore += 50;
    if (compressionEnabled) {
      tsScore += 20;
    } else {
      report.warnings.push("TimescaleDB Compression Policy is not configured. Storage may grow unoptimized.");
    }
    
    report.timeSeries.score = tsScore;
    report.timeSeries.details.hypertablesFound = hypertables;
    report.timeSeries.details.compressionEnabled = compressionEnabled;

    // --- 4. SPATIAL (PostGIS) ---
    console.log(">> Validating Spatial Engine...");
    const postgisVer = await client.query("SELECT extversion FROM pg_extension WHERE extname = 'postgis';");
    report.spatial.details.postgisVersion = postgisVer.rows[0]?.extversion || 'Missing';
    
    const spatialIdx = await client.query("SELECT indexname FROM pg_indexes WHERE indexdef LIKE '%gist%' AND tablename = 'spatial_entities';");
    const hasSpatialIndex = spatialIdx.rows.length > 0;
    
    const validGeom = await client.query("SELECT COUNT(*) as invalid FROM spatial_entities WHERE ST_IsValid(geom) = false;");
    const noInvalidGeoms = parseInt(validGeom.rows[0].invalid) === 0;
    
    const seCount = await client.query("SELECT COUNT(*) FROM spatial_entities;");
    
    let spatialScore = 0;
    if (postgisVer.rows[0]) spatialScore += 40;
    if (hasSpatialIndex) spatialScore += 30;
    if (noInvalidGeoms) spatialScore += 30;
    
    report.spatial.score = spatialScore;
    report.spatial.details.indexesCreated = hasSpatialIndex;
    report.spatial.details.invalidGeometries = parseInt(validGeom.rows[0].invalid);
    report.spatial.details.entitiesSeeded = parseInt(seCount.rows[0].count);

    if (report.spatial.details.entitiesSeeded === 0) report.warnings.push("Seed data not found in spatial_entities.");

    // --- 5. SECURITY (RBAC) ---
    console.log(">> Validating Security & RBAC...");
    const rolesRes = await client.query("SELECT rolname FROM pg_roles;");
    const roles = rolesRes.rows.map(r => r.rolname);
    
    const requiredRoles = ['admin', 'ingestion_worker', 'readonly_api'];
    const rolesFound = requiredRoles.filter(r => roles.includes(r));
    
    report.security.score = Math.round((rolesFound.length / requiredRoles.length) * 100);
    report.security.details.rolesFound = rolesFound;
    
    if (rolesFound.length < requiredRoles.length) {
       report.warnings.push(`Missing RBAC roles: ${requiredRoles.filter(r => !roles.includes(r)).join(', ')}`);
    }

    // --- 6. API HEALTH ---
    console.log(">> Validating API Health...");
    try {
      const apiRes = await fetch('http://localhost:3005/api/health/db');
      const apiData = await apiRes.json();
      
      report.api.details.connectivity = apiRes.ok ? 'OK' : 'FAILED';
      report.api.details.apiDbStatus = apiData.apiDb;
      report.api.details.ingestionDbStatus = apiData.ingestionDb;
      report.api.details.latencyMs = apiData.latencyMs;
      
      let apiScore = 0;
      if (apiRes.ok) apiScore += 40;
      if (apiData.apiDb === 'connected') apiScore += 30;
      if (apiData.ingestionDb === 'connected') apiScore += 30;
      
      report.api.score = apiScore;
    } catch (e) {
      report.api.score = 0;
      report.api.details.connectivity = 'OFFLINE';
      report.warnings.push("Next.js dev server is not running on :3005, skipping API check.");
    }

  } catch (err) {
    report.errors.push(`Fatal Database Connection Error: ${err.message}`);
  } finally {
    await client.end();
  }

  // --- 7. CALCULATE OVERALL & VERDICT ---
  const scores = [
    report.infrastructure.score,
    report.database.score,
    report.timeSeries.score,
    report.spatial.score,
    report.security.score,
    report.api.score
  ];
  
  report.overallReadiness = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
  report.executionTimeMs = Math.round(performance.now() - startTime);

  let exitCode = 0;
  if (report.errors.length > 0) {
    report.verdict = 'Phase 1 Failed';
    exitCode = 2;
  } else if (report.warnings.length > 0 || report.overallReadiness < 100) {
    report.verdict = 'Phase 1 Passed with Warnings';
    exitCode = 1;
  } else {
    report.verdict = 'Phase 1 Passed';
    exitCode = 0;
  }

  // --- 8. WRITE JSON REPORT ---
  fs.writeFileSync('validation-report.json', JSON.stringify(report, null, 2));

  // --- 9. WRITE MARKDOWN REPORT ---
  const mdContent = `# Platform Validation Report (CI/CD)
**Date:** ${report.timestamp}
**Verdict:** ${report.verdict}
**Overall Readiness Score:** ${report.overallReadiness} / 100
**Execution Time:** ${report.executionTimeMs} ms

## Component Scores
- **Infrastructure:** ${report.infrastructure.score} / 100
- **Database Core:** ${report.database.score} / 100
- **Time-Series (TimescaleDB):** ${report.timeSeries.score} / 100
- **Spatial (PostGIS):** ${report.spatial.score} / 100
- **Security & RBAC:** ${report.security.score} / 100
- **API Health:** ${report.api.score} / 100

## Identified Issues
### Errors
${report.errors.length === 0 ? '- None' : report.errors.map(e => '- ❌ ' + e).join('\n')}

### Warnings
${report.warnings.length === 0 ? '- None' : report.warnings.map(w => '- ⚠️ ' + w).join('\n')}

## Detailed Breakdown
### Database
- Postgres Version: ${report.database.details.postgresVersion || 'N/A'}
- Tables Found: ${report.database.details.tablesFound || 0}
- Active Foreign Keys: ${report.database.details.foreignKeysActive || 0}

### Time-Series
- TimescaleDB Version: ${report.timeSeries.details.timescaleVersion || 'N/A'}
- Hypertables: ${report.timeSeries.details.hypertablesFound?.join(', ') || 'None'}
- Compression Enabled: ${report.timeSeries.details.compressionEnabled ? 'Yes' : 'No'}

### Spatial
- PostGIS Version: ${report.spatial.details.postgisVersion || 'N/A'}
- Spatial Indexes: ${report.spatial.details.indexesCreated ? 'Created' : 'Missing'}
- Invalid Geometries: ${report.spatial.details.invalidGeometries || 0}
- Seed Entities Loaded: ${report.spatial.details.entitiesSeeded || 0}

### API Health
- Connection Status: ${report.api.details.connectivity}
- API Pool: ${report.api.details.apiDbStatus || 'N/A'}
- Ingestion Pool: ${report.api.details.ingestionDbStatus || 'N/A'}
- Latency: ${report.api.details.latencyMs || 0} ms
`;

  fs.writeFileSync('validation-report.md', mdContent);

  // --- 10. CONSOLE OUTPUT & EXIT ---
  console.log(mdContent);
  console.log(`\nReports generated: validation-report.json, validation-report.md`);
  console.log(`Exiting with code ${exitCode}`);
  process.exit(exitCode);
}

executeValidation();
