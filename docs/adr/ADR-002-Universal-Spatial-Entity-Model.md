# ADR-002: Universal Spatial Entity Model

## Status
Accepted

## Context
The platform must support complex geographic hierarchies (Region -> District -> Watershed -> Village) without creating dozens of isolated, rigid tables for every geopolitical or geographic boundary type.

## Decision
We implement a single, unified `spatial_entities` table utilizing an adjacency list (`parent_id`) and generic PostGIS `geometry` columns. Every entity type is classified dynamically via the `entity_type` column.

## Consequences
- Infinite hierarchical nesting is supported.
- Spatial queries (intersections, overlaps) can be executed universally across all boundary types.
- Strict data hygiene must be maintained to prevent circular `parent_id` dependencies.
