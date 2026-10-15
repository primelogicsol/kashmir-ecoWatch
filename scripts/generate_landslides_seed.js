const fs = require('fs');
const tsCode = fs.readFileSync('src/data/hazard-landslides.ts', 'utf8');
const match = tsCode.match(/export const landslideData: LandslideRecord\[\] = (\[[\s\S]*?\]);/);
if (match) {
  const arr = eval(match[1]);
  let sql = '-- Seed Data for Landslides\n\n';
  sql += 'DO $$ \nDECLARE\n  parent_id UUID;\nBEGIN\n';
  sql += '  INSERT INTO spatial_entities (name, entity_type) VALUES (\'Western Himalaya\', \'Region\') RETURNING id INTO parent_id;\n\n';
  
  arr.forEach(record => {
    sql += `  -- ${record.name}\n`;
    sql += `  WITH new_entity AS (
    INSERT INTO spatial_entities (name, entity_type, parent_id, geom, attributes)
    VALUES ('${record.name.replace(/'/g, "''")}', 'Landslide Zone', parent_id, ST_SetSRID(ST_MakePoint(${record.longitude}, ${record.latitude}), 4326), 
    '{"district": "${record.district}", "scope": "${record.scope}"}'::jsonb)
    RETURNING id
  )
  INSERT INTO hazard_zones (name, primary_hazard_type, spatial_entity_id, geom, baseline_thresholds)
  SELECT '${record.name.replace(/'/g, "''")}', 'Landslide', id, ST_SetSRID(ST_MakePoint(${record.longitude}, ${record.latitude}), 4326),
  '{"slide_type": "${record.slide_type}", "risk_level": "${record.risk_level}", "slope_angle_deg": ${record.slope_angle_deg}, "geology": "${record.geology.replace(/'/g, "''")}", "road_affected": "${record.road_affected.replace(/'/g, "''")}", "trigger": "${record.trigger}"}'::jsonb
  FROM new_entity;\n\n`;
  });
  
  sql += 'END $$;\n';
  fs.writeFileSync('database/schema/002_seed_landslides.sql', sql);
  console.log('Seed file generated: database/schema/002_seed_landslides.sql');
} else {
  console.log('Failed to match');
}
