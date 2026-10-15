# ADR-005: AI-Ready Environmental Intelligence Platform

## Status
Accepted

## Context
Future iterations of Kashmir Eco Watch will rely on predictive AI, Digital Twins, and ensemble forecasting to warn communities before disasters strike. We cannot mix speculative model outputs with empirical ground-truth observations.

## Decision
We establish a structural isolation policy:
1. `observations_ts` exclusively holds empirical telemetry (sensors, gauges, validated satellite readings).
2. `forecasts_ts` exclusively holds speculative AI models, digital twin predictions, confidence bounds, and return periods.
3. `hazard_incidents` exclusively holds verified historical disaster impact metrics to serve as training baselines.

## Consequences
- AI pipelines can train cleanly on historical `observations_ts` without self-polluting their own generated feedback loop.
- UI components can overlay `forecasts_ts` predictions transparently against current `observations_ts` ground-truth to visually calculate model accuracy.
