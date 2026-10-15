-- ==========================================
-- 001_initial_schema_rollback.sql
-- Description: Destroys all tables created in 001_initial_schema
-- WARNING: DESTRUCTIVE ACTION
-- ==========================================

-- 1. Drop the Hypertables first (drops data across all chunks)
DROP TABLE IF EXISTS forecasts_ts CASCADE;
DROP TABLE IF EXISTS observations_ts CASCADE;

-- 2. Drop operational and historical tables
DROP TABLE IF EXISTS hazard_incidents CASCADE;
DROP TABLE IF EXISTS hazard_zones CASCADE;

-- 3. Drop spatial and source registries
DROP TABLE IF EXISTS spatial_entities CASCADE;
DROP TABLE IF EXISTS sources CASCADE;

-- Note: We generally do not drop extensions (uuid-ossp, postgis, timescaledb) 
-- during a rollback unless completely decommissioning the database.
