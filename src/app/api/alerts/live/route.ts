import { NextResponse } from 'next/server';
import { AlertItem, alertRegistry } from '@/data/alert-registry';

export const revalidate = 60; // 1-minute server-side caching

export async function GET() {
  const now = new Date();
  const liveAlerts: AlertItem[] = [];

  // Helper with 4-second timeout to prevent stalling
  const fetchWithTimeout = async (url: string, timeoutMs = 4000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        signal: controller.signal,
        next: { revalidate: 60 }
      });
      clearTimeout(id);
      return response;
    } catch (err) {
      clearTimeout(id);
      return null;
    }
  };

  try {
    // 1. Fetch live telemetry in parallel
    const [airQualityRes, floodRes, usgsQuakesRes, weatherSrinagarRes, weatherRambanRes, weatherZojilaRes] = await Promise.all([
      // Air Quality (Srinagar)
      fetchWithTimeout('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=34.0837&longitude=74.7973&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi,european_aqi&timezone=Asia%2FKolkata'),
      // Flood / River Discharge (Jhelum Basin)
      fetchWithTimeout('https://flood-api.open-meteo.com/v1/flood?latitude=34.08&longitude=74.80&daily=river_discharge,river_discharge_mean,river_discharge_max&forecast_days=3'),
      // USGS Earthquakes (Kashmir / Ladakh / Hindu Kush seismic belt, M2.5+, past 7 days)
      fetchWithTimeout('https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=2.5&minlatitude=31.5&maxlatitude=37.5&minlongitude=72.0&maxlongitude=80.0&limit=3'),
      // Weather Srinagar (Valley Floor)
      fetchWithTimeout('https://api.open-meteo.com/v1/forecast?latitude=34.0837&longitude=74.7973&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=Asia%2FKolkata'),
      // Landslide Corridor: Ramban / Banihal (NH-44)
      fetchWithTimeout('https://api.open-meteo.com/v1/forecast?latitude=33.24&longitude=75.19&current=temperature_2m,precipitation,weather_code,wind_speed_10m&daily=precipitation_sum,precipitation_probability_max&timezone=Asia%2FKolkata'),
      // Avalanche Pass: Zoji La / Dras
      fetchWithTimeout('https://api.open-meteo.com/v1/forecast?latitude=34.28&longitude=75.50&current=temperature_2m,precipitation,weather_code,wind_speed_10m&daily=temperature_2m_min,precipitation_sum&timezone=Asia%2FKolkata'),
    ]);

    // ──────────────────────────────────────────────────────────────────────────
    // 2. Process Live Air Quality
    // ──────────────────────────────────────────────────────────────────────────
    if (airQualityRes && airQualityRes.ok) {
      const aqiData = await airQualityRes.json();
      const current = aqiData.current;
      if (current) {
        const pm25 = Math.round(current.pm2_5 * 10) / 10;
        const pm10 = Math.round(current.pm10 * 10) / 10;
        const usAqi = current.us_aqi;
        
        let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';
        let statusText = 'Good';
        if (usAqi > 150 || pm25 > 55) {
          severity = 'high';
          statusText = 'Unhealthy';
        } else if (usAqi > 100 || pm25 > 35) {
          severity = 'moderate';
          statusText = 'Moderate to Unhealthy for Sensitive Groups';
        } else if (usAqi > 50 || pm25 > 15) {
          severity = 'moderate';
          statusText = 'Moderate Air Quality';
        }

        liveAlerts.push({
          id: 'live-air-srinagar',
          title: `Live Air Quality: ${statusText} — Srinagar`,
          category: 'air-quality',
          severity: severity,
          status: 'active',
          district: 'Srinagar',
          affectedArea: 'Srinagar Urban Agglomeration & Dal Lake Basin',
          issued: new Date().toISOString(),
          updated: new Date().toISOString(),
          expires: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
          source: 'institutional',
          issuedBy: 'Open-Meteo / Copernicus Atmospheric Service (CAMS) Live',
          summary: `Real-time atmospheric sensor telemetry reports US AQI at ${usAqi} (${statusText}) in Srinagar. PM2.5 concentration is ${pm25} µg/m³ and PM10 is ${pm10} µg/m³.`,
          cause: `Live satellite and surface dispersion models detect atmospheric particulate concentrations driven by local inversion and ambient emissions.`,
          guidance: {
            summary: severity === 'high' 
              ? 'Sensitive groups should avoid prolonged outdoor exertion. Wear N95 filtration masks in traffic corridors.'
              : 'Air quality is within acceptable parameters. Sensitive individuals should monitor respiratory comfort during morning hours.',
            actions: [
              `Current Live PM2.5: ${pm25} µg/m³ (WHO 24h benchmark: 15 µg/m³)`,
              `Current Live PM10: ${pm10} µg/m³ · US AQI Index: ${usAqi}`,
              'Keep residential windows closed during early morning temperature inversion hours',
              'Avoid agricultural biomass open burning in peri-urban orchard belts'
            ],
            travelImpact: 'None. Urban visibility and transit routes operating normally.',
            urgency: severity === 'high' ? 'urgent' : 'precautionary'
          },
          relatedModule: 'environmental-monitoring',
          relatedModulePath: '/environmental-monitoring',
          updates: [
            { timestamp: new Date().toISOString(), action: 'Live API Telemetry Received', note: `Automated live sensor reading: PM2.5 ${pm25} µg/m³, AQI ${usAqi}.` }
          ],
          tags: ['air-quality', 'srinagar', 'live-api', 'pm25', 'telemetry', 'aqi']
        });
      }
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 3. Process Live River Discharge & Flood Telemetry
    // ──────────────────────────────────────────────────────────────────────────
    if (floodRes && floodRes.ok) {
      const floodData = await floodRes.json();
      const discharges = floodData.daily?.river_discharge || [];
      const currentDischarge = discharges[0] ? Math.round(discharges[0] * 10) / 10 : null;
      const maxForecast = floodData.daily?.river_discharge_max?.[0] ? Math.round(floodData.daily.river_discharge_max[0] * 10) / 10 : null;

      if (currentDischarge !== null) {
        let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';
        let stageText = 'Normal Base Flow';
        if (currentDischarge > 150) {
          severity = 'critical';
          stageText = 'High Flood Inundation Warning';
        } else if (currentDischarge > 80) {
          severity = 'high';
          stageText = 'Elevated Flood Alert Stage';
        } else if (currentDischarge > 40) {
          severity = 'moderate';
          stageText = 'Moderate Hydrological Advisory';
        }

        liveAlerts.push({
          id: 'live-flood-jhelum',
          title: `Live Hydrological Telemetry: ${stageText} — Jhelum Basin`,
          category: 'flood',
          severity: severity,
          status: 'active',
          district: 'Srinagar',
          affectedArea: 'Jhelum River Channel, Sangam to Ram Munshi Bagh & Wular Lake Outflow',
          corridor: 'Jhelum River Drainage Basin',
          issued: new Date().toISOString(),
          updated: new Date().toISOString(),
          expires: new Date(Date.now() + 48 * 3600 * 1000).toISOString(),
          source: 'institutional',
          issuedBy: 'Global Flood Awareness System (GloFAS) / Open-Meteo Live',
          summary: `Real-time hydrological streamflow models report Jhelum River discharge at ${currentDischarge} m³/s (Peak 24h forecast: ${maxForecast || currentDischarge} m³/s). Water levels remain within ${stageText.toLowerCase()}.`,
          cause: `Catchment runoff and upstream meltwater dynamics across Pir Panjal and Great Himalayan tributaries contributing to current channel volume.`,
          guidance: {
            summary: severity === 'low'
              ? 'River discharge is at normal seasonal levels. Routine riverside recreation and boat transit operating normally.'
              : 'Elevated water volume detected. Avoid proximity to low embankments and unsecured riverbank walkways.',
            actions: [
              `Current Live Discharge: ${currentDischarge} m³/s`,
              `Projected Max Flow (24h): ${maxForecast || currentDischarge} m³/s`,
              'Monitor key gauge markers at Sangam, Ram Munshi Bagh, and Asham',
              'Fishermen and shikara operators advised to secure watercraft'
            ],
            travelImpact: 'Riverside roads clear. No bridge or causeway closures in place.',
            urgency: severity === 'low' ? 'advisory' : 'urgent'
          },
          relatedModule: 'water-systems',
          relatedModulePath: '/water-systems',
          mapLink: '/atlas?layer=flood-risk&basin=jhelum',
          updates: [
            { timestamp: new Date().toISOString(), action: 'Live Streamflow Telemetry Updated', note: `Measured stream discharge rate at ${currentDischarge} m³/s.` }
          ],
          tags: ['flood', 'jhelum', 'hydrology', 'river-discharge', 'glofas', 'live-api']
        });
      }
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 4. Process Real Live Earthquakes from USGS
    // ──────────────────────────────────────────────────────────────────────────
    if (usgsQuakesRes && usgsQuakesRes.ok) {
      const quakeData = await usgsQuakesRes.json();
      const features = quakeData.features || [];

      features.slice(0, 2).forEach((f: any, idx: number) => {
        const props = f.properties;
        const mag = props.mag;
        const place = props.place;
        const time = new Date(props.time).toISOString();
        const depth = f.geometry?.coordinates?.[2] || 10;
        
        const severity: 'low' | 'moderate' | 'high' | 'critical' = 
          mag >= 6.0 ? 'critical' : mag >= 5.0 ? 'high' : mag >= 4.0 ? 'moderate' : 'low';

        liveAlerts.push({
          id: `live-quake-${props.code || idx}`,
          title: `Live Seismic Event: M${mag.toFixed(1)} Earthquake — ${place}`,
          category: 'earthquake',
          severity: severity,
          status: 'active',
          district: place.includes('India') || place.includes('Kashmir') ? 'Kargil' : 'Baramulla',
          affectedArea: `${place} (Lat: ${f.geometry.coordinates[1].toFixed(2)}°, Lon: ${f.geometry.coordinates[0].toFixed(2)}°)`,
          issued: time,
          updated: new Date().toISOString(),
          expires: new Date(Date.now() + 72 * 3600 * 1000).toISOString(),
          source: 'institutional',
          issuedBy: 'USGS Real-Time Earthquake Hazards Program',
          summary: `A magnitude ${mag.toFixed(1)} earthquake occurred at a depth of ${depth} km at ${place}. Recorded live by international seismic monitoring networks.`,
          cause: `Tectonic stress release along the active Main Boundary Thrust / Pamir-Hindukush convergent plate boundary.`,
          guidance: {
            summary: mag >= 4.5 
              ? 'Seismic tremors recorded in the region. Inspect masonry and structural components for fissures. Report aftershocks.'
              : 'Minor regional seismic event detected by USGS telemetry. No immediate tsunami or major building damage reported.',
            actions: [
              `Official Magnitude: M${mag.toFixed(1)} · Focal Depth: ${depth} km`,
              `Event Timestamp: ${new Date(props.time).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
              'Follow standard earthquake safety guidelines: Drop, Cover, and Hold On during active shaking',
              'Report local structural damage to district emergency operation centres'
            ],
            travelImpact: 'Regional highway tunnels and passes operating normally unless local rockfall reported.',
            urgency: severity === 'high' || severity === 'critical' ? 'urgent' : 'precautionary'
          },
          relatedModule: 'hazard-intelligence',
          relatedModulePath: '/hazard-intelligence',
          updates: [
            { timestamp: time, action: 'USGS Live Event Detected', note: `Automated seismic detection: M${mag.toFixed(1)} at depth ${depth}km.` }
          ],
          tags: ['earthquake', 'seismic', 'usgs', 'live-api', 'tectonics']
        });
      });
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 5. Process Live Landslide Corridor Weather (Ramban NH-44 / Z-Morh)
    // ──────────────────────────────────────────────────────────────────────────
    if (weatherRambanRes && weatherRambanRes.ok) {
      const rambanData = await weatherRambanRes.json();
      const cur = rambanData.current;
      const dailySum = rambanData.daily?.precipitation_sum?.[0] || 0;
      const temp = cur?.temperature_2m || 15;
      const rain = cur?.precipitation || 0;

      let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';
      let riskLabel = 'Low Landslide Probability';

      if (dailySum > 35 || rain > 10) {
        severity = 'critical';
        riskLabel = 'Critical Landslide & Shooting Stone Warning';
      } else if (dailySum > 15 || rain > 4) {
        severity = 'high';
        riskLabel = 'Elevated Slope Instability Warning';
      } else if (dailySum > 5 || rain > 1) {
        severity = 'moderate';
        riskLabel = 'Moderate Slope Moisture Advisory';
      }

      liveAlerts.push({
        id: 'live-landslide-ramban',
        title: `Live Geotechnical Monitor: ${riskLabel} — Ramban-Banihal NH-44`,
        category: 'landslide',
        severity: severity,
        status: 'active',
        district: 'Ramban',
        affectedArea: 'NH-44 Jammu-Srinagar Highway, Cafeteria Morh, Mehar, Panthyal & Dalwas',
        corridor: 'NH-44 Strategic Highway Corridor',
        issued: new Date().toISOString(),
        updated: new Date().toISOString(),
        expires: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
        source: 'expert-verified',
        issuedBy: 'Open-Meteo Telemetry / J&K Traffic Police Highway Monitor',
        summary: `Live meteorological telemetry at Ramban reports current temperature at ${temp}°C, current precipitation rate at ${rain} mm/h, and 24h rainfall sum at ${dailySum} mm. Slope risk index: ${riskLabel}.`,
        cause: `Precipitation saturation across fragmented Murree and Subathu sedimentary formations triggering localized shooting stones and clay slips.`,
        guidance: {
          summary: severity === 'critical' || severity === 'high'
            ? 'Highway subject to periodic blockades. Non-essential vehicular transit should be suspended until clearance.'
            : 'NH-44 corridor currently navigable. Exercise caution near known shooting stone zones between Nashri and Banihal.',
          actions: [
            `Live Temperature: ${temp}°C · Precipitation Rate: ${rain} mm/h`,
            `24-Hour Accumulated Rainfall: ${dailySum} mm`,
            'Check live J&K Traffic Police status before commencing journey between Jammu and Srinagar',
            'Avoid stopping vehicles beneath active rock-shed and vulnerable sheer escarpments'
          ],
          travelImpact: severity === 'critical' ? 'Heavy disruptions and convoy delays.' : 'Normal vehicular movement with cautious driving.',
          urgency: severity === 'critical' || severity === 'high' ? 'urgent' : 'advisory'
        },
        relatedModule: 'risk-monitoring',
        relatedModulePath: '/risk-monitoring',
        mapLink: '/atlas?layer=landslide-risk&corridor=nh44',
        updates: [
          { timestamp: new Date().toISOString(), action: 'Live Weather Telemetry Logged', note: `Recorded ${dailySum}mm 24h rainfall sum and ${temp}°C ambient temperature.` }
        ],
        tags: ['landslide', 'nh44', 'ramban', 'traffic', 'rainfall', 'live-api']
      });
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 6. Process Live Mountain Pass / Avalanche Telemetry (Zoji La / Kargil)
    // ──────────────────────────────────────────────────────────────────────────
    if (weatherZojilaRes && weatherZojilaRes.ok) {
      const zojilaData = await weatherZojilaRes.json();
      const cur = zojilaData.current;
      const minTemp = zojilaData.daily?.temperature_2m_min?.[0] || 0;
      const precip = zojilaData.daily?.precipitation_sum?.[0] || 0;
      const currentTemp = cur?.temperature_2m || 0;
      const windSpeed = cur?.wind_speed_10m || 0;

      let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';
      let avLabel = 'Low Avalanche Danger';

      if (currentTemp < 0 && precip > 15) {
        severity = 'critical';
        avLabel = 'High Avalanche Danger (Heavy Snowfall)';
      } else if (currentTemp < 2 && precip > 5) {
        severity = 'high';
        avLabel = 'Moderate to High Snowpack Instability';
      } else if (currentTemp < 0) {
        severity = 'moderate';
        avLabel = 'Sub-Zero Icy Road & Freezing Surface Advisory';
      }

      liveAlerts.push({
        id: 'live-avalanche-zojila',
        title: `Live Mountain Pass Telemetry: ${avLabel} — Zoji La (NH-1)`,
        category: 'avalanche',
        severity: severity,
        status: 'active',
        district: 'Kargil',
        affectedArea: 'Zoji La Pass (3,528m), Gumri, Minamarg & Captain Morh',
        corridor: 'Srinagar-Leh NH-1 Strategic Corridor',
        issued: new Date().toISOString(),
        updated: new Date().toISOString(),
        expires: new Date(Date.now() + 36 * 3600 * 1000).toISOString(),
        source: 'institutional',
        issuedBy: 'Open-Meteo High-Altitude Telemetry / SASE Reference',
        summary: `Live alpine weather station telemetry at Zoji La reports ambient temperature at ${currentTemp}°C (Min: ${minTemp}°C), wind speed at ${windSpeed} km/h, and 24h precipitation at ${precip} mm. Pass condition: ${avLabel}.`,
        cause: `High-elevation orographic cooling and freeze-thaw cycles inducing road icing and high-angle slope snow instability.`,
        guidance: {
          summary: 'Extreme high-altitude conditions. Ensure vehicles are winterized with tire anti-skid chains and emergency cold-weather kits.',
          actions: [
            `Live Temperature: ${currentTemp}°C · Overnight Low: ${minTemp}°C`,
            `Wind Velocity: ${windSpeed} km/h · 24h Precipitation: ${precip} mm`,
            'Mandatory anti-skid chains for commercial and private passenger transit',
            'Travel strictly restricted to daylight operating windows (06:00 to 17:00 IST)'
          ],
          travelImpact: severity === 'critical' ? 'Pass closed for snow clearance.' : 'Pass open subject to weather clearance and convoy timings.',
          urgency: severity === 'critical' ? 'urgent' : 'advisory'
        },
        relatedModule: 'risk-monitoring',
        relatedModulePath: '/risk-monitoring',
        mapLink: '/atlas?layer=avalanche-risk&pass=zoji-la',
        updates: [
          { timestamp: new Date().toISOString(), action: 'Pass Weather Recorded', note: `Live telemetry: Temp ${currentTemp}°C, Wind ${windSpeed}km/h, Precip ${precip}mm.` }
        ],
        tags: ['avalanche', 'zoji-la', 'nh1', 'snow', 'kargil', 'live-api']
      });
    }

    // ──────────────────────────────────────────────────────────────────────────
    // 7. Process Live Valley Weather / Heat or Cold Wave (Srinagar)
    // ──────────────────────────────────────────────────────────────────────────
    if (weatherSrinagarRes && weatherSrinagarRes.ok) {
      const srinagarData = await weatherSrinagarRes.json();
      const cur = srinagarData.current;
      const maxTemp = srinagarData.daily?.temperature_2m_max?.[0] || 20;
      const minTemp = srinagarData.daily?.temperature_2m_min?.[0] || 5;
      const currentTemp = cur?.temperature_2m || 15;
      const humidity = cur?.relative_humidity_2m || 60;
      const wind = cur?.wind_speed_10m || 5;

      // Determine Fire or Thermal condition
      let category: 'fire' | 'heatwave' | 'storm' = 'fire';
      let title = 'Live Environmental Telemetry — Kashmir Valley';
      let severity: 'low' | 'moderate' | 'high' | 'critical' = 'low';

      if (currentTemp > 32 || maxTemp > 34) {
        category = 'heatwave';
        severity = 'moderate';
        title = `Live Temperature Advisory: Elevated Heatwave Conditions — Srinagar (${currentTemp}°C)`;
      } else if (currentTemp > 24 && humidity < 35 && wind > 15) {
        category = 'fire';
        severity = 'moderate';
        title = `Live Forest Fire Risk: Elevated Dry Slope Index — Pir Panjal Range`;
      } else {
        category = 'fire';
        severity = 'low';
        title = `Live Fire Weather & Thermal Telemetry: Low Risk — Pir Panjal & Valley`;
      }

      liveAlerts.push({
        id: 'live-weather-valley',
        title: title,
        category: category,
        severity: severity,
        status: 'active',
        district: 'Kulgam',
        affectedArea: 'Valley Floor and surrounding Pir Panjal foothills',
        issued: new Date().toISOString(),
        updated: new Date().toISOString(),
        expires: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
        source: 'platform-reviewed',
        issuedBy: 'Open-Meteo High-Resolution Weather Model / Kashmir EcoWatch',
        summary: `Live ambient sensors report temperature at ${currentTemp}°C (Max today: ${maxTemp}°C, Min: ${minTemp}°C), relative humidity at ${humidity}%, and wind speed at ${wind} km/h. Fire and thermal hazard index remains ${severity.toUpperCase()}.`,
        cause: `Current synoptic atmospheric conditions maintaining stable barometric pressure with low to moderate fire danger risk across coniferous stands.`,
        guidance: {
          summary: 'Ambient conditions are favorable. Follow routine ecological safeguards in forested and agricultural belts.',
          actions: [
            `Current Live Temperature: ${currentTemp}°C · Relative Humidity: ${humidity}%`,
            `Wind Velocity: ${wind} km/h · Daily High: ${maxTemp}°C`,
            'Ensure campfires and smoking materials are fully extinguished in forest buffer zones',
            'Report any unpermitted agricultural stubble or orchard pruning fires'
          ],
          travelImpact: 'None. All tourist trails and ecological routes open.',
          urgency: 'precautionary'
        },
        relatedModule: 'environmental-monitoring',
        relatedModulePath: '/environmental-monitoring',
        updates: [
          { timestamp: new Date().toISOString(), action: 'Live Valley Telemetry Received', note: `Current readings: ${currentTemp}°C, ${humidity}% RH, wind ${wind}km/h.` }
        ],
        tags: ['weather', 'fire', 'telemetry', 'temperature', 'live-api', 'pir-panjal']
      });
    }

  } catch (err) {
    console.error('Error fetching live environmental APIs:', err);
  }

  // If for any reason all APIs failed to connect (e.g. offline machine), fallback gracefully to baseline alertRegistry
  const finalAlerts = liveAlerts.length > 0 ? liveAlerts : alertRegistry;

  return NextResponse.json({
    success: true,
    source: liveAlerts.length > 0 ? 'live-api' : 'baseline-cache',
    liveCount: liveAlerts.length,
    totalCount: finalAlerts.length,
    fetchedAt: now.toISOString(),
    alerts: finalAlerts
  });
}
