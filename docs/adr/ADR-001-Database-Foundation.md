# ADR-001: Database Foundation

## Status
Accepted

## Context
The Kashmir Eco Watch platform requires a robust, high-performance database foundation capable of handling complex spatial data and high-velocity time-series telemetry for multi-hazard monitoring.

## Decision
We will use **PostgreSQL** as the core relational database, augmented with **PostGIS** for advanced spatial geometry (polygons, intersections) and **TimescaleDB** (hypertables) for time-series observation data.

## Consequences
- Requires strict dependency on PostgreSQL 15+ with PostGIS and TimescaleDB extensions.
- Migration scripts must account for hypertable partitioning logic.
- Ensures the platform is AI-ready by separating static spatial metadata from high-velocity telemetry.
