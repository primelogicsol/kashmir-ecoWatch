-- Seed Data for Landslides

DO $$ 
DECLARE
  parent_id UUID;
BEGIN
  INSERT INTO spatial_entities (name, entity_type) VALUES ('Western Himalaya', 'Region') RETURNING id INTO parent_id;

  -- Khanabal–Qazigund NH44 Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Khanabal–Qazigund NH44 Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(75.14, 33.65), 4326), 
    '{"district": "Anantnag", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Khanabal–Qazigund NH44 Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(75.14, 33.65), 4326),
  '{"slide_type": "Debris Flow", "risk_level": "Critical", "slope_angle_deg": 38, "geology": "Panjal Trap basalt with loose overburden", "road_affected": "Srinagar-Jammu Highway (NH44)", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Sinthan Pass–Anantnag Slide Belt
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Sinthan Pass–Anantnag Slide Belt', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(75.48, 33.56), 4326), 
    '{"district": "Anantnag", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Sinthan Pass–Anantnag Slide Belt', 'Landslide', id, ST_SetSRID(ST_MakePoint(75.48, 33.56), 4326),
  '{"slide_type": "Translational", "risk_level": "High", "slope_angle_deg": 42, "geology": "Pir Panjal Formation shale and sandstone", "road_affected": "Sinthan Pass Road", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Mughal Road–Shopian Entry Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Mughal Road–Shopian Entry Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.82, 33.71), 4326), 
    '{"district": "Shopian", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Mughal Road–Shopian Entry Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.82, 33.71), 4326),
  '{"slide_type": "Debris Flow", "risk_level": "Critical", "slope_angle_deg": 45, "geology": "Weathered Panjal Trap, glacial deposits", "road_affected": "Mughal Road", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Peer Ki Gali–Hirpora Slide Belt
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Peer Ki Gali–Hirpora Slide Belt', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.52, 33.63), 4326), 
    '{"district": "Shopian", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Peer Ki Gali–Hirpora Slide Belt', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.52, 33.63), 4326),
  '{"slide_type": "Rotational", "risk_level": "High", "slope_angle_deg": 40, "geology": "Murree Formation clay-rich sediments", "road_affected": "Mughal Road (Peer Ki Gali Section)", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Zojila Pass–Baltal Slide Complex
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Zojila Pass–Baltal Slide Complex', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(75.46, 34.27), 4326), 
    '{"district": "Ganderbal", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Zojila Pass–Baltal Slide Complex', 'Landslide', id, ST_SetSRID(ST_MakePoint(75.46, 34.27), 4326),
  '{"slide_type": "Rock Slide", "risk_level": "Critical", "slope_angle_deg": 55, "geology": "Zanskar Range gneiss and limestone", "road_affected": "Zojila Pass Road (NH1)", "trigger": "Seismic"}'::jsonb
  FROM new_entity;

  -- Kangan–Wayil Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Kangan–Wayil Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.83, 34.28), 4326), 
    '{"district": "Ganderbal", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Kangan–Wayil Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.83, 34.28), 4326),
  '{"slide_type": "Mudslide", "risk_level": "High", "slope_angle_deg": 35, "geology": "Alluvial fan deposits over limestone", "road_affected": "Srinagar-Leh Highway", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Tangmarg–Gulmarg Slide Corridor
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Tangmarg–Gulmarg Slide Corridor', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.38, 34.05), 4326), 
    '{"district": "Baramulla", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Tangmarg–Gulmarg Slide Corridor', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.38, 34.05), 4326),
  '{"slide_type": "Debris Flow", "risk_level": "High", "slope_angle_deg": 36, "geology": "Pir Panjal volcanics with alluvial cover", "road_affected": "Tangmarg-Gulmarg Road", "trigger": "Deforestation"}'::jsonb
  FROM new_entity;

  -- Uri–LOC Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Uri–LOC Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.03, 34.09), 4326), 
    '{"district": "Baramulla", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Uri–LOC Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.03, 34.09), 4326),
  '{"slide_type": "Translational", "risk_level": "High", "slope_angle_deg": 44, "geology": "Murree Formation sandstone and claystone", "road_affected": "Srinagar-Muzaffarabad Road (NH-701)", "trigger": "Seismic"}'::jsonb
  FROM new_entity;

  -- Kupwara–Karnah Slide Belt
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Kupwara–Karnah Slide Belt', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(73.86, 34.39), 4326), 
    '{"district": "Kupwara", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Kupwara–Karnah Slide Belt', 'Landslide', id, ST_SetSRID(ST_MakePoint(73.86, 34.39), 4326),
  '{"slide_type": "Mudslide", "risk_level": "Moderate", "slope_angle_deg": 30, "geology": "Karewa Formation lacustrine clays", "road_affected": "Kupwara-Karnah Road", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Handwara–Rajwar Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Handwara–Rajwar Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.28, 34.4), 4326), 
    '{"district": "Kupwara", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Handwara–Rajwar Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.28, 34.4), 4326),
  '{"slide_type": "Rotational", "risk_level": "Moderate", "slope_angle_deg": 28, "geology": "Alluvial deposits over Murree Formation", "road_affected": "Handwara-Rajwar Road", "trigger": "Deforestation"}'::jsonb
  FROM new_entity;

  -- Bandipora–Gurez Slide Corridor
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Bandipora–Gurez Slide Corridor', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.83, 34.63), 4326), 
    '{"district": "Bandipora", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Bandipora–Gurez Slide Corridor', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.83, 34.63), 4326),
  '{"slide_type": "Rock Slide", "risk_level": "High", "slope_angle_deg": 50, "geology": "Tethyan sedimentary sequence, fractured", "road_affected": "Bandipora-Gurez Road", "trigger": "Seismic"}'::jsonb
  FROM new_entity;

  -- Razdan Pass Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Razdan Pass Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.8, 34.58), 4326), 
    '{"district": "Bandipora", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Razdan Pass Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.8, 34.58), 4326),
  '{"slide_type": "Debris Flow", "risk_level": "High", "slope_angle_deg": 46, "geology": "Highly weathered metamorphic rocks", "road_affected": "Razdan Pass Road (Gurez)", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Kokernag–Breng Valley Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Kokernag–Breng Valley Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(75.31, 33.58), 4326), 
    '{"district": "Anantnag", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Kokernag–Breng Valley Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(75.31, 33.58), 4326),
  '{"slide_type": "Mudslide", "risk_level": "Moderate", "slope_angle_deg": 25, "geology": "Karewa Formation with spring seepage", "road_affected": "Kokernag-Verinag Road", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Aharbal Falls Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Aharbal Falls Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.78, 33.64), 4326), 
    '{"district": "Kulgam", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Aharbal Falls Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.78, 33.64), 4326),
  '{"slide_type": "Translational", "risk_level": "Moderate", "slope_angle_deg": 32, "geology": "Panjal Trap with weathered overburden", "road_affected": "Aharbal Access Road", "trigger": "Deforestation"}'::jsonb
  FROM new_entity;

  -- Budgam–Chadoora Karewa Slip Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Budgam–Chadoora Karewa Slip Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.63, 33.95), 4326), 
    '{"district": "Budgam", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Budgam–Chadoora Karewa Slip Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.63, 33.95), 4326),
  '{"slide_type": "Rotational", "risk_level": "Moderate", "slope_angle_deg": 22, "geology": "Karewa Formation lacustrine clays", "road_affected": "Budgam-Chadoora Road", "trigger": "Construction"}'::jsonb
  FROM new_entity;

  -- Pampore–Tral Karewa Slide Belt
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Pampore–Tral Karewa Slide Belt', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.93, 34.01), 4326), 
    '{"district": "Pulwama", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Pampore–Tral Karewa Slide Belt', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.93, 34.01), 4326),
  '{"slide_type": "Rotational", "risk_level": "Moderate", "slope_angle_deg": 24, "geology": "Karewa Formation lacustrine sediments", "road_affected": "Pampore-Tral Road", "trigger": "Construction"}'::jsonb
  FROM new_entity;

  -- Srinagar–Harwan Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Srinagar–Harwan Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.89, 34.16), 4326), 
    '{"district": "Srinagar", "scope": "Kashmir Core"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Srinagar–Harwan Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.89, 34.16), 4326),
  '{"slide_type": "Mudslide", "risk_level": "Moderate", "slope_angle_deg": 26, "geology": "Limestone and alluvial fan deposits", "road_affected": "Srinagar-Harwan Road", "trigger": "Construction"}'::jsonb
  FROM new_entity;

  -- Ramban–Banihal NH44 Mega-Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Ramban–Banihal NH44 Mega-Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(75.24, 33.24), 4326), 
    '{"district": "Ramban", "scope": "Trans-Divisional"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Ramban–Banihal NH44 Mega-Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(75.24, 33.24), 4326),
  '{"slide_type": "Debris Flow", "risk_level": "Critical", "slope_angle_deg": 52, "geology": "Murree Formation shale, highly fractured", "road_affected": "Srinagar-Jammu Highway (NH44)", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Kishtwar–Sinthan Road Slide Belt
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Kishtwar–Sinthan Road Slide Belt', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(75.76, 33.31), 4326), 
    '{"district": "Kishtwar", "scope": "Trans-Divisional"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Kishtwar–Sinthan Road Slide Belt', 'Landslide', id, ST_SetSRID(ST_MakePoint(75.76, 33.31), 4326),
  '{"slide_type": "Rock Slide", "risk_level": "Critical", "slope_angle_deg": 58, "geology": "Higher Himalaya crystalline gneiss", "road_affected": "Kishtwar-Sinthan Road", "trigger": "Seismic"}'::jsonb
  FROM new_entity;

  -- Doda–Bhaderwah Slide Complex
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Doda–Bhaderwah Slide Complex', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(75.54, 33.14), 4326), 
    '{"district": "Doda", "scope": "Trans-Divisional"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Doda–Bhaderwah Slide Complex', 'Landslide', id, ST_SetSRID(ST_MakePoint(75.54, 33.14), 4326),
  '{"slide_type": "Translational", "risk_level": "High", "slope_angle_deg": 40, "geology": "Murree Formation with limestone intercalations", "road_affected": "Doda-Bhaderwah Road", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Rajouri–Thanamandi Slide Belt
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Rajouri–Thanamandi Slide Belt', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.3, 33.38), 4326), 
    '{"district": "Rajouri", "scope": "Trans-Divisional"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Rajouri–Thanamandi Slide Belt', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.3, 33.38), 4326),
  '{"slide_type": "Mudslide", "risk_level": "High", "slope_angle_deg": 34, "geology": "Siwalik Formation sandstone and clay", "road_affected": "Rajouri-Thanamandi Road", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Poonch–Surankote Slide Corridor
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Poonch–Surankote Slide Corridor', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.09, 33.76), 4326), 
    '{"district": "Poonch", "scope": "Trans-Divisional"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Poonch–Surankote Slide Corridor', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.09, 33.76), 4326),
  '{"slide_type": "Rotational", "risk_level": "Moderate", "slope_angle_deg": 30, "geology": "Murree Formation clay-rich beds", "road_affected": "Poonch-Surankote Road", "trigger": "Deforestation"}'::jsonb
  FROM new_entity;

  -- Udhampur–Patnitop Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Udhampur–Patnitop Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(75.13, 32.92), 4326), 
    '{"district": "Udhampur", "scope": "Trans-Divisional"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Udhampur–Patnitop Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(75.13, 32.92), 4326),
  '{"slide_type": "Debris Flow", "risk_level": "High", "slope_angle_deg": 38, "geology": "Murree sandstone with loose overburden", "road_affected": "Srinagar-Jammu Highway (NH44)", "trigger": "Construction"}'::jsonb
  FROM new_entity;

  -- Reasi–Katra Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Reasi–Katra Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.83, 33.08), 4326), 
    '{"district": "Reasi", "scope": "Trans-Divisional"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Reasi–Katra Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.83, 33.08), 4326),
  '{"slide_type": "Translational", "risk_level": "Moderate", "slope_angle_deg": 28, "geology": "Siwalik and Sub-Himalayan sediments", "road_affected": "Katra-Reasi Road", "trigger": "Construction"}'::jsonb
  FROM new_entity;

  -- Khardung La–Leh Slide Belt
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Khardung La–Leh Slide Belt', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(77.6, 34.27), 4326), 
    '{"district": "Leh", "scope": "Trans-Divisional"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Khardung La–Leh Slide Belt', 'Landslide', id, ST_SetSRID(ST_MakePoint(77.6, 34.27), 4326),
  '{"slide_type": "Rock Slide", "risk_level": "High", "slope_angle_deg": 48, "geology": "Ladakh granodiorite, frost-shattered", "road_affected": "Leh-Nubra Road (Khardung La)", "trigger": "Seismic"}'::jsonb
  FROM new_entity;

  -- Kargil–Drass Slide Complex
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Kargil–Drass Slide Complex', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(76.13, 34.55), 4326), 
    '{"district": "Kargil", "scope": "Trans-Divisional"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Kargil–Drass Slide Complex', 'Landslide', id, ST_SetSRID(ST_MakePoint(76.13, 34.55), 4326),
  '{"slide_type": "Rock Slide", "risk_level": "High", "slope_angle_deg": 50, "geology": "Dras volcanics and ophiolite mélange", "road_affected": "Srinagar-Leh Highway (NH1)", "trigger": "Seismic"}'::jsonb
  FROM new_entity;

  -- Kathua–Basohli Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Kathua–Basohli Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(75.51, 32.37), 4326), 
    '{"district": "Kathua", "scope": "Trans-Divisional"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Kathua–Basohli Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(75.51, 32.37), 4326),
  '{"slide_type": "Mudslide", "risk_level": "Low", "slope_angle_deg": 20, "geology": "Siwalik Formation, gentle slopes", "road_affected": "Kathua-Basohli Road", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Muzaffarabad–Garhi Dupatta Slide Belt
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Muzaffarabad–Garhi Dupatta Slide Belt', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(73.47, 34.36), 4326), 
    '{"district": "Muzaffarabad", "scope": "Transboundary / Extended"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Muzaffarabad–Garhi Dupatta Slide Belt', 'Landslide', id, ST_SetSRID(ST_MakePoint(73.47, 34.36), 4326),
  '{"slide_type": "Rotational", "risk_level": "Critical", "slope_angle_deg": 48, "geology": "Hazara Formation phyllite and slate", "road_affected": "Muzaffarabad-Neelum Road", "trigger": "Seismic"}'::jsonb
  FROM new_entity;

  -- Neelum Valley–Sharda Slide Complex
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Neelum Valley–Sharda Slide Complex', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(73.89, 34.58), 4326), 
    '{"district": "Neelum", "scope": "Transboundary / Extended"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Neelum Valley–Sharda Slide Complex', 'Landslide', id, ST_SetSRID(ST_MakePoint(73.89, 34.58), 4326),
  '{"slide_type": "Debris Flow", "risk_level": "Critical", "slope_angle_deg": 52, "geology": "Kashmir nappe, highly weathered schist", "road_affected": "Neelum Valley Road", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Bagh–Dhirkot LOC Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Bagh–Dhirkot LOC Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(73.78, 33.97), 4326), 
    '{"district": "Bagh", "scope": "Transboundary / Extended"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Bagh–Dhirkot LOC Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(73.78, 33.97), 4326),
  '{"slide_type": "Translational", "risk_level": "High", "slope_angle_deg": 38, "geology": "Murree Formation, earthquake-loosened", "road_affected": "Bagh-Dhirkot Road", "trigger": "Seismic"}'::jsonb
  FROM new_entity;

  -- Karakoram Highway–Attabad Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Karakoram Highway–Attabad Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.64, 36.31), 4326), 
    '{"district": "Hunza", "scope": "Transboundary / Extended"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Karakoram Highway–Attabad Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.64, 36.31), 4326),
  '{"slide_type": "Rock Slide", "risk_level": "Critical", "slope_angle_deg": 60, "geology": "Karakoram batholith, massive rock faces", "road_affected": "Karakoram Highway (KKH)", "trigger": "Seismic"}'::jsonb
  FROM new_entity;

  -- Gilgit–Shandur Slide Belt
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Gilgit–Shandur Slide Belt', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.3, 35.92), 4326), 
    '{"district": "Gilgit", "scope": "Transboundary / Extended"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Gilgit–Shandur Slide Belt', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.3, 35.92), 4326),
  '{"slide_type": "Debris Flow", "risk_level": "High", "slope_angle_deg": 42, "geology": "Chalt volcanics with unconsolidated scree", "road_affected": "Gilgit-Shandur Road", "trigger": "Rainfall"}'::jsonb
  FROM new_entity;

  -- Skardu–Deosai Access Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Skardu–Deosai Access Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(75.63, 35.29), 4326), 
    '{"district": "Skardu", "scope": "Transboundary / Extended"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Skardu–Deosai Access Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(75.63, 35.29), 4326),
  '{"slide_type": "Rock Slide", "risk_level": "High", "slope_angle_deg": 46, "geology": "Granodiorite and metamorphic complex", "road_affected": "Skardu-Deosai Road", "trigger": "Seismic"}'::jsonb
  FROM new_entity;

  -- Haveli–Tatta Pani LOC Slide Zone
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('Haveli–Tatta Pani LOC Slide Zone', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.01, 33.88), 4326), 
    '{"district": "Haveli", "scope": "Transboundary / Extended"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'Haveli–Tatta Pani LOC Slide Zone', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.01, 33.88), 4326),
  '{"slide_type": "Mudslide", "risk_level": "Moderate", "slope_angle_deg": 30, "geology": "Murree Formation clay-rich sediments", "road_affected": "Haveli-Tatta Pani Road", "trigger": "Deforestation"}'::jsonb
  FROM new_entity;

  -- KKH–Chilas Diamer Slide Complex
  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('KKH–Chilas Diamer Slide Complex', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(74.09, 35.41), 4326), 
    '{"district": "Gilgit", "scope": "Transboundary / Extended"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT 'KKH–Chilas Diamer Slide Complex', 'Landslide', id, ST_SetSRID(ST_MakePoint(74.09, 35.41), 4326),
  '{"slide_type": "Rock Slide", "risk_level": "Critical", "slope_angle_deg": 65, "geology": "Nanga Parbat gneiss, seismically active", "road_affected": "Karakoram Highway (KKH)", "trigger": "Seismic"}'::jsonb
  FROM new_entity;

END $$;
