-- ==========================================
-- 001_initial_schema.sql
-- Description: Universal Hazard & Environmental Intelligence Platform Schema
-- Requires: PostgreSQL, PostGIS, TimescaleDB
-- ==========================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "timescaledb";

-- 1. SOURCE REGISTRY
-- Authoritative tracking of all data providers (Agencies, Satellites, APIs, Citizens)
CREATE TABLE sources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    source_type VARCHAR(100) NOT NULL, -- e.g., 'Government Agency', 'API Provider', 'Satellite Product', 'Citizen'
    url VARCHAR(500),
    reliability_weight FLOAT DEFAULT 1.0,
    
    -- Auditability
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    deleted_at TIMESTAMPTZ,
    version INT DEFAULT 1
);

-- 2. GEOGRAPHIC HIERARCHY (Universal Spatial Entities)
-- Supports arbitrary nesting: Western Himalaya -> Region -> District -> Watershed -> Village
CREATE TABLE spatial_entities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    entity_type VARCHAR(100) NOT NULL, -- 'Region', 'District', 'Watershed', 'River Basin', 'Lake', 'Critical Infrastructure', etc.
    parent_id UUID REFERENCES spatial_entities(id),
    
    geom geometry(Geometry, 4326), -- PostGIS generic geometry to support Points, Polygons, Lines
    attributes JSONB, -- Highly extensible (Population, Elevation, Area)
    
    -- Auditability
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    deleted_at TIMESTAMPTZ,
    version INT DEFAULT 1
);
CREATE INDEX idx_spatial_geom ON spatial_entities USING GIST (geom);
CREATE INDEX idx_spatial_type ON spatial_entities (entity_type);
CREATE INDEX idx_spatial_parent ON spatial_entities (parent_id);

-- 3. HAZARD ZONES (Targeted Monitoring Entities)
CREATE TABLE hazard_zones (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    primary_hazard_type VARCHAR(100) NOT NULL, -- 'Flood', 'Landslide', 'Avalanche', 'GLOF'
    spatial_entity_id UUID REFERENCES spatial_entities(id),
    
    geom geometry(Geometry, 4326),
    baseline_thresholds JSONB, -- Dynamic rules: {"critical_discharge_m3s": 75.0, "aqi_hazardous": 300}
    
    -- Auditability
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    deleted_at TIMESTAMPTZ,
    version INT DEFAULT 1
);

-- 4. UNIVERSAL OBSERVATION MODEL (TimescaleDB)
-- High-volume time-series storage for absolutely everything.
CREATE TABLE observations_ts (
    observed_at TIMESTAMPTZ NOT NULL,
    zone_id UUID REFERENCES hazard_zones(id) NOT NULL,
    source_id UUID REFERENCES sources(id) NOT NULL,
    
    hazard_type VARCHAR(100) NOT NULL, -- 'Flood', 'Wildfire', 'Air Quality'
    observation_type VARCHAR(100) NOT NULL, -- 'River Discharge', 'PM2.5', 'Soil Moisture'
    
    value FLOAT NOT NULL,
    unit VARCHAR(50),
    
    -- Telemetry & Quality
    confidence_score FLOAT DEFAULT 1.0,
    quality_flag VARCHAR(50) DEFAULT 'Valid', -- 'Valid', 'Suspect', 'Calibrated'
    verification_status VARCHAR(50) DEFAULT 'Unverified', -- 'Verified', 'Satellite-Derived'
    
    -- Resolution
    spatial_resolution VARCHAR(100), -- e.g., '10m', 'Point', 'Basin-wide'
    temporal_resolution VARCHAR(100), -- e.g., '15-min', 'Hourly'
    geom geometry(Geometry, 4326), -- Optional localized coordinate if differs from zone
    
    -- Processing Timestamps
    fetched_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ,
    
    metadata JSONB, -- Raw payload, anomalies, context
    
    PRIMARY KEY (observed_at, zone_id, observation_type, source_id)
);

SELECT create_hypertable('observations_ts', 'observed_at', chunk_time_interval => INTERVAL '1 day');
CREATE INDEX idx_obs_zone_type ON observations_ts(zone_id, observation_type, observed_at DESC);

-- 5. AI READINESS & FORECASTS (TimescaleDB)
-- Separating actual observations from model outputs, ensemble forecasts, and Digital Twin predictions.
CREATE TABLE forecasts_ts (
    forecast_for TIMESTAMPTZ NOT NULL, -- The time being predicted
    generated_at TIMESTAMPTZ NOT NULL, -- When the AI/Model ran
    zone_id UUID REFERENCES hazard_zones(id) NOT NULL,
    model_source_id UUID REFERENCES sources(id) NOT NULL,
    
    hazard_type VARCHAR(100) NOT NULL,
    observation_type VARCHAR(100) NOT NULL,
    
    predicted_value FLOAT NOT NULL,
    lower_bound FLOAT,
    upper_bound FLOAT,
    prediction_confidence FLOAT,
    
    forecast_version VARCHAR(50),
    ensemble_member INT,
    return_period_years FLOAT,
    
    metadata JSONB,
    
    PRIMARY KEY (forecast_for, generated_at, zone_id, model_source_id, hazard_type, observation_type)
);
SELECT create_hypertable('forecasts_ts', 'forecast_for', chunk_time_interval => INTERVAL '7 days');

-- 6. ENVIRONMENTAL INCIDENT ARCHIVE
-- Historical records of actual disasters for ML training baselines
CREATE TABLE hazard_incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    zone_id UUID REFERENCES hazard_zones(id),
    hazard_type VARCHAR(100) NOT NULL,
    
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    severity VARCHAR(50),
    
    impact_metrics JSONB, -- {"houses_destroyed": 10, "max_discharge": 200, "hectares_burned": 50}
    damage_assessment_url TEXT,
    
    -- Auditability
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID,
    deleted_at TIMESTAMPTZ,
    version INT DEFAULT 1
);
