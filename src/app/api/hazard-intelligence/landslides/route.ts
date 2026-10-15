import { NextResponse } from 'next/server';
import { getApiDb } from '@/lib/db';
import { landslideData } from '@/data/hazard-landslides';

export async function GET() {
  let records: any[] = [];
  
  try {
    const db = getApiDb();
    // We join hazard_zones with spatial_entities to reconstruct the LandslideRecord
    const query = `
      SELECT 
        hz.id AS id,
        hz.name AS name,
        se.attributes->>'scope' AS scope,
        se.attributes->>'district' AS district,
        hz.baseline_thresholds->>'slide_type' AS slide_type,
        hz.baseline_thresholds->>'risk_level' AS risk_level,
        CAST(hz.baseline_thresholds->>'slope_angle_deg' AS NUMERIC) AS slope_angle_deg,
        hz.baseline_thresholds->>'geology' AS geology,
        hz.baseline_thresholds->>'road_affected' AS road_affected,
        hz.baseline_thresholds->>'trigger' AS trigger,
        'Historical' AS current_status,
        'Verified' AS verification_status,
        ST_Y(hz.geom::geometry) AS latitude,
        ST_X(hz.geom::geometry) AS longitude
      FROM hazard_zones hz
      JOIN spatial_entities se ON hz.spatial_entity_id = se.id
      WHERE hz.primary_hazard_type = 'Landslide'
    `;
    
    const result = await Promise.race([
      db.query(query),
      new Promise((_, reject) => setTimeout(() => reject(new Error('DB Timeout')), 1000))
    ]) as any;
    if (result && result.rows && result.rows.length > 0) {
      records = result.rows;
    }
  } catch (dbErr: any) {
    console.warn('[Landslides API] DB query unavailable, using baseline registry:', dbErr?.message);
  }

  // Fallback to verified catalog if DB returns empty or is not connected
  if (records.length === 0) {
    records = landslideData;
  }

  try {
    const lats = records.map(r => r.latitude).join(',');
    const lons = records.map(r => r.longitude).join(',');
    
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&current=soil_moisture_0_to_7cm,precipitation&daily=precipitation_sum&timezone=auto&past_days=3&forecast_days=1`;
    
    const weatherRes = await fetch(weatherUrl, { cache: 'no-store' });
    if (!weatherRes.ok) {
      // Fallback to base records if weather API fails
      return NextResponse.json({ data: records, error: 'Failed to fetch live weather data', stale: true });
    }
    
    let weatherData: any;
    try {
      weatherData = await weatherRes.json();
    } catch (parseErr) {
      console.warn('Failed to parse weather API response, returning base records:', parseErr);
      return NextResponse.json({ data: records, stale: true });
    }
    const results = Array.isArray(weatherData) ? weatherData : [weatherData];
    
    const enhancedData = records.map((record, index) => {
      const locationData = results[index];
      if (!locationData || !locationData.current || !locationData.daily) return record;
      
      const soilMoisture = locationData.current.soil_moisture_0_to_7cm || 0;
      const dailyPrecip = locationData.daily.precipitation_sum || [];
      const precip24h = dailyPrecip.length > 0 ? dailyPrecip[dailyPrecip.length - 1] : 0;
      const precip72h = dailyPrecip.slice(-3).reduce((acc, val) => acc + (val || 0), 0);
      
      let risk = record.risk_level;
      let triggerDesc = record.trigger;
      
      const isExtremeRain = precip24h > 50 || precip72h > 50;
      const isHeavyRain = precip24h > 30 || precip72h > 30;
      const isModerateRain = precip24h > 10 || precip72h > 10;
      const isVeryHighMoisture = soilMoisture > 0.4;
      const isHighMoisture = soilMoisture > 0.3;
      
      if (isVeryHighMoisture && isExtremeRain) {
        risk = 'Critical';
        triggerDesc = 'Saturated Soil + Extreme Rain';
      } else if (isHighMoisture && isHeavyRain) {
        risk = 'High';
        triggerDesc = 'Saturated Soil + Heavy Rain';
      } else if (isHighMoisture || isModerateRain) {
        risk = 'Moderate';
        triggerDesc = isHighMoisture ? 'High Soil Moisture' : 'Moderate Rainfall';
      } else {
        risk = 'Low';
        triggerDesc = 'Low Moisture/Rainfall';
      }
      
      let currentStatus = 'Seasonal Risk';
      if (risk === 'Critical') currentStatus = 'Active Alert';
      if (risk === 'High') currentStatus = 'Watch';
      
      return {
        ...record,
        live_soil_moisture: soilMoisture,
        live_precipitation_24h: precip24h,
        live_precipitation_72h: precip72h,
        live_risk_level: risk,
        dominant_trigger: triggerDesc,
        current_status: currentStatus,
        last_updated: new Date().toISOString()
      };
    });
    
    return NextResponse.json({ data: enhancedData });
    
  } catch (error) {
    console.error('Error in landslide API route:', error);
    return NextResponse.json({ data: records, stale: true });
  }
}
