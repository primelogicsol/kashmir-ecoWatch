# ADR-004: Hazard Intelligence Architecture

## Status
Accepted

## Context
Kashmir Eco Watch must evolve from isolated dashboards (e.g., just Floods) to a comprehensive multi-hazard platform covering Earthquakes, Landslides, GLOFs, Avalanches, and Wildfires.

## Decision
The core architecture abstracts the concept of a "Hazard". Zones are defined generically in `hazard_zones`, tracking a `primary_hazard_type`. This ensures UI components and API endpoints can query `GET /api/v2/hazards/live?type=landslide` uniformly without building bespoke pipelines for every disaster type.

## Consequences
- Requires unified UI widget design capable of adapting dynamically to different hazard parameters.
- Promotes code reuse and drastically reduces Technical Debt.
