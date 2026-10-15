# Universal Hazard Intelligence Database: Provisioning Readiness Checklist

Before executing the migration and transitioning to the Universal Hazard Intelligence database schema, the following provisioning and operational requirements must be validated.

## 1. Required Extensions
Ensure the target PostgreSQL instance explicitly supports:
*   `postgis` (for spatial geometry)
*   `timescaledb` (for hypertables)
*   `pgcrypto` / `uuid-ossp` (for UUID generation)

## 2. Required Environment Variables
The following variables must be added to your `.env.local` and production environments:
```env
# Connection pooling URL for API queries (PgBouncer)
DATABASE_URL="postgres://user:password@host:6543/db?pgbouncer=true"

# Direct connection URL for migrations and DDL
DIRECT_URL="postgres://user:password@host:5432/db"

# Security keys for internal cron ingestion
CRON_SECRET="your-secure-256-bit-key"
```

## 3. Local Docker Setup Option
For local development, use the official TimescaleDB High-Availability image (which bundles PostGIS):
```yaml
# docker-compose.yml
version: '3.8'
services:
  db:
    image: timescale/timescaledb-ha:pg15-latest
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: kew_hazard_db
    ports:
      - "5432:5432"
    volumes:
      - ./pgdata:/var/lib/postgresql/data
```

## 4. Cloud PostgreSQL Options
Because **TimescaleDB** is required, standard managed providers like Supabase or generic RDS may not suffice unless configured specifically. Recommended cloud providers:
*   **Timescale Cloud:** Native TimescaleDB + PostGIS support (Highly Recommended).
*   **Aiven for PostgreSQL:** Supports TimescaleDB extension.
*   **AWS RDS for PostgreSQL:** Supports TimescaleDB, but chunk compression features require specific versions.

## 5. Migration Execution Command
```bash
psql -h <host> -p <port> -U <user> -d <database> -f database/schema/001_initial_schema.sql
```

## 6. Rollback Command
```bash
psql -h <host> -p <port> -U <user> -d <database> -f database/schema/001_initial_schema_rollback.sql
```

## 7. Seed Data Command
```bash
psql -h <host> -p <port> -U <user> -d <database> -f database/schema/seed_data.sql
```

## 8. Validation SQL Queries
Once deployed, run these to verify architecture:
```sql
-- 1. Check PostGIS version
SELECT PostGIS_full_version();

-- 2. Verify TimescaleDB Hypertables
SELECT * FROM timescaledb_information.hypertables;

-- 3. Verify spatial indexes
SELECT tablename, indexname FROM pg_indexes WHERE indexdef LIKE '%gist%';
```

## 9. Backup Strategy Before Migration
Since this is a greenfield deployment for Phase 1, there is no legacy database to back up.
However, moving forward:
*   **WAL Archiving:** Use `pgBackRest` for Continuous Archiving and Point-in-Time Recovery (PITR).
*   **Logical Backups:** Run daily `pg_dump` specifically for static configuration tables (`spatial_entities`, `hazard_zones`), excluding the massive `observations_ts` table to save bandwidth.

## 10. Connection Pooling Strategy
Serverless applications (Next.js Edge/Serverless Functions) open hundreds of ephemeral connections.
*   **PgBouncer** MUST be placed in front of the database (Transaction mode).
*   Your `DATABASE_URL` must point to the PgBouncer port (e.g., `6543`), not the direct Postgres port (`5432`).

## 11. Access Roles (Principle of Least Privilege)
Create 3 dedicated roles:
```sql
-- 1. Admin (Runs migrations)
CREATE ROLE kew_admin WITH SUPERUSER LOGIN PASSWORD 'xxx';

-- 2. Ingestion Worker (Cron jobs)
CREATE ROLE ingestion_worker WITH LOGIN PASSWORD 'xxx';
GRANT INSERT ON observations_ts TO ingestion_worker;
GRANT SELECT ON hazard_zones TO ingestion_worker;

-- 3. Readonly API (Next.js frontend fetching)
CREATE ROLE readonly_api WITH LOGIN PASSWORD 'xxx';
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readonly_api;
```

## 12. Security Rules for Public API Access
*   The database is **NOT** exposed to the internet. 
*   The Next.js `/api/v2/hazards/live` route acts as a strict API Gateway.
*   Implement IP Rate Limiting (Vercel KV or Upstash) on the Next.js API route to prevent DDoSing the database via expensive spatial queries.

## 13. Monitoring / Logging Plan
*   Enable `pg_stat_statements` to track slow queries (specifically PostGIS spatial intersections).
*   Monitor TimescaleDB chunk sizes. If chunks exceed 25% of RAM, adjust the `chunk_time_interval`.

## 14. Estimated Storage Growth (1 Year)
Assuming 100 Hazard Zones, fetching 4 distinct parameters (Discharge, Rainfall, Soil Moisture, AQI) every 15 minutes:
*   100 zones * 4 params * 96 times/day = 38,400 rows/day.
*   **Yearly Volume:** ~14,016,000 observations.
*   **Raw Size:** ~3 GB / year.
*   **Compressed Size:** Utilizing TimescaleDB native compression, this will reduce to **~150 - 300 MB / year**.
*   **Verdict:** Storage costs will remain negligible for the first 5 years.

## 15. Final Go / No-Go Checklist
- [ ] Database host provisioned.
- [ ] `postgis` and `timescaledb` extensions verified.
- [ ] Roles created (`admin`, `ingestion_worker`, `readonly_api`).
- [ ] PgBouncer connection string configured in `.env.local`.
- [ ] Migration and Seed executed successfully on Staging/Local.
- [ ] Team alignment confirmed.

If all boxes are checked, we are GO for Database Provisioning.
