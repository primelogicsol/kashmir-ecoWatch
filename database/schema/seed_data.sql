-- ==========================================
-- seed_data.sql
-- Description: Core spatial entities, sources, and hazard zones for the Universal Platform
-- ==========================================

-- 1. Insert Sources
INSERT INTO sources (id, name, source_type, url, reliability_weight) VALUES 
('s1e1b3e4-c2df-4279-b1d5-8f4b16c8f941', 'Open-Meteo Global Flood API', 'API Provider', 'https://open-meteo.com', 0.8),
('s2e1b3e4-c2df-4279-b1d5-8f4b16c8f942', 'JKSDMA Ground Gauges', 'Government Agency', 'https://kashmirfloodwatch.com', 0.95),
('s3e1b3e4-c2df-4279-b1d5-8f4b16c8f943', 'Copernicus Sentinel-2', 'Satellite Product', 'https://copernicus.eu', 0.9)
ON CONFLICT DO NOTHING;

-- 2. Insert Spatial Entities (Hierarchical)
-- Parent: Western Himalaya Region
INSERT INTO spatial_entities (id, name, entity_type) VALUES 
('r1f11c75-01bd-4d56-a979-373307223e71', 'Western Himalaya', 'Region')
ON CONFLICT DO NOTHING;

-- Children: Districts
INSERT INTO spatial_entities (id, name, entity_type, parent_id) VALUES 
('d1f11c75-01bd-4d56-a979-373307223e71', 'Srinagar', 'District', 'r1f11c75-01bd-4d56-a979-373307223e71'),
('f6b8b0e7-3f33-47a3-8321-72f5d939e6a3', 'Anantnag', 'District', 'r1f11c75-01bd-4d56-a979-373307223e71')
ON CONFLICT DO NOTHING;

-- Children: River Basins
INSERT INTO spatial_entities (id, name, entity_type, parent_id) VALUES 
('b1e1b3e4-c2df-4279-b1d5-8f4b16c8f94d', 'Jhelum River Basin', 'River Basin', 'd1f11c75-01bd-4d56-a979-373307223e71')
ON CONFLICT DO NOTHING;

-- 3. Insert Hazard Zones
INSERT INTO hazard_zones (id, name, primary_hazard_type, spatial_entity_id, baseline_thresholds) VALUES 
('z7f11c75-01bd-4d56-a979-373307223e72', 'Jhelum Floodplain - Rajbagh', 'Flood', 'b1e1b3e4-c2df-4279-b1d5-8f4b16c8f94d', '{"critical_discharge_m3s": 75.0, "warning_discharge_m3s": 50.0}'),
('z8b8b0e7-3f33-47a3-8321-72f5d939e6a4', 'NH-44 Ramban Slide Zone', 'Landslide', 'f6b8b0e7-3f33-47a3-8321-72f5d939e6a3', '{"critical_soil_moisture": 0.4, "extreme_rainfall_72h": 100.0}')
ON CONFLICT DO NOTHING;
