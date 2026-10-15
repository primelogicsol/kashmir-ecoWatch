# ADR-003: Universal Observation Model

## Status
Accepted

## Context
Environmental monitoring requires tracking diverse telemetry (River Discharge, Soil Moisture, PM2.5, Temperature) without rebuilding the database schema for each new metric.

## Decision
We utilize a single `observations_ts` hypertable in TimescaleDB that decouples the telemetry value from the physical schema using `hazard_type` and `observation_type` classifiers, alongside a highly extensible JSONB `metadata` payload.

## Consequences
- New sensors or environmental parameters can be onboarded instantly without SQL migrations.
- Indexing must carefully target `zone_id`, `observation_type`, and `observed_at` to maintain read performance over billions of rows.
