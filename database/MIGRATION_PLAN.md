# Database Migration Plan & Validation Checklist (Universal Platform V2)

This document dictates the procedures for migrating the legacy Kashmir Eco Watch dashboard into a robust, AI-ready, Universal Environmental Intelligence Platform using PostgreSQL, PostGIS, and TimescaleDB.

## 1. Schema Files Delivered
- `database/schema/001_initial_schema.sql` (Creates the unified spatial hierarchy, source registry, and universal TimescaleDB observation hypertables)
- `database/schema/001_initial_schema_rollback.sql` (Safely tears down the schema)
- `database/schema/seed_data.sql` (Seeds structural hierarchy and sources)

## 2. Requirements Addressed
1. **Hazard-first architecture:** `observations_ts` handles any `hazard_type` (Flood, Landslide, AQI).
2. **Universal observation model:** Observations are fully decoupled from static tables, utilizing `hazard_type`, `observation_type`, JSONB metadata, and `spatial_resolution`.
3. **Geographic hierarchy:** `spatial_entities` uses a self-referencing `parent_id` to establish arbitrary hierarchies (Western Himalaya → District → Watershed → Village).
4. **Environmental Intelligence readiness:** New tables effortlessly support Biodiversity, Forest Intelligence, or Water Quality simply by defining a new `observation_type`.
5. **AI readiness:** Dedicated `forecasts_ts` hypertable isolates AI predictions, bounds, return periods, and ensemble members from empirical observations.
6. **Spatial intelligence:** PostGIS `geometry(Geometry, 4326)` powers everything, from point-based sensors to massive multipolygon catchment intersections.
7. **Source registry:** Authoritative `sources` table validates every inbound observation.
8. **Auditability:** `created_by`, `updated_by`, `deleted_at`, and `version` columns enforce tracking across all relational tables.
9. **Performance:** Only telemetry uses TimescaleDB (`observations_ts`, `forecasts_ts`). Relational metadata remains in fast PostgreSQL B-trees.
10. **Scalability:** The hypertable architecture scales to millions of multi-country observations seamlessly.

## 3. Migration Procedure

### Step 1: Pre-Migration Prep
- Stand up PostgreSQL instance with PostGIS and TimescaleDB extensions installed.
- Validate connection string via `psql`.

### Step 2: Execution
- Run migration: `psql -f database/schema/001_initial_schema.sql`
- Run seed: `psql -f database/schema/seed_data.sql`

### Step 3: Application Dual-Write (Parallel Run)
*We do NOT remove the existing real-time-on-demand functionality.*
- We update the `/api/floods/live` proxy to continue returning the scraped JSON payload to the frontend.
- Concurrently, we add an asynchronous background `INSERT` statement in the same route (or a separate cron ingest) to dump the fetched JSON into `observations_ts` with `hazard_type = 'Flood'`.
- This ensures zero downtime for the UI while building historical memory.

### Step 4: UI Cutover
- Once data is verified in `observations_ts`, we shift the frontend `useEffect` to fetch from the new Unified V2 API (which queries Postgres).

## 4. Validation Checklist
- [ ] Verify extensions installed: `SELECT * FROM pg_extension WHERE extname IN ('postgis', 'timescaledb', 'uuid-ossp');`
- [ ] Verify hypertable creation: `SELECT * FROM timescaledb_information.hypertables WHERE hypertable_name IN ('observations_ts', 'forecasts_ts');`
- [ ] Insert a mock telemetry reading and verify relationships map properly up the `spatial_entities` tree.
- [ ] Run the rollback script on a staging environment and ensure 0 orphaned tables remain.
