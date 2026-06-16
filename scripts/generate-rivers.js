const fs = require('fs');
const path = require('path');

const EXPANDED_PATH = path.join(__dirname, '../src/data/hydrology/rivers-streams-expanded.ts');
const OUTPUT_PATH = path.join(__dirname, '../src/data/hydrology/rivers.ts');

console.log('Reading expanded rivers database...');
const content = fs.readFileSync(EXPANDED_PATH, 'utf8');

// Use regex to extract the array content
const match = content.match(/export const riversStreamsExpandedRecords: RiverStreamRecord\[\] = (\[[\s\S]+?\]);/);
if (!match) {
  console.error('Could not find riversStreamsExpandedRecords in the expanded file.');
  process.exit(1);
}

// Convert TypeScript text to evaluatable JS by removing type casts and cleaning up formatting
let arrayText = match[1];

// Evaluate the array text safely by defining a helper block
let records;
try {
  records = eval(arrayText);
} catch (e) {
  console.error('Error evaluating array text directly. Trying to clean it up...', e.message);
  // Clean up any trailing commas or TS annotations if needed
  try {
    // If eval fails, we can parse it by stripping comments and evaluating in a local context
    records = new Function(`return ${arrayText}`)();
  } catch (e2) {
    console.error('Failed to parse array:', e2);
    process.exit(1);
  }
}

console.log(`Successfully parsed ${records.length} records from expanded database.`);

const migratedRecords = records.map(r => {
  const isLatNum = typeof r.Source_Latitude === 'number';
  const isLngNum = typeof r.Source_Longitude === 'number';
  const isElevNum = typeof r.Elevation_Max_m === 'number';
  const isLenNum = typeof r.Length_km === 'number';

  // Map verification status to standard types
  let verStatus = 'Pending Verification';
  if (r.Verification_Status === 'Verified') verStatus = 'Verified';
  else if (r.Verification_Status === 'Source Linked') verStatus = 'Source Linked';
  else if (r.Verification_Status.startsWith('Pending-')) verStatus = 'Source Required';

  const desc = `A ${r.River_or_Stream_Type.toLowerCase()} flowing through ${r.Districts_Crossed.join(', ')} in the ${r.Region} region. Source: ${r.Source_Location}. Mouth/Confluence: ${r.Mouth_or_Confluence}. Notes: ${r.Notes}`;

  return {
    id: r.River_ID,
    Legacy_ID: r.River_ID,
    slug: r.River_Name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    Migration_Status: 'Legacy Imported',
    Verification_Status: verStatus,
    Source_ID: r.Source_ID,
    Confidence_Level: r.Confidence_Level,
    Last_Updated: r.Last_Updated,

    name: r.River_Name,
    type: r.River_or_Stream_Type.toLowerCase() === 'river' ? 'river' : 'stream',
    category: r.River_or_Stream_Type,
    description: desc,

    District_ID: r.Districts_Crossed.length > 1 ? 'Multiple' : r.Districts_Crossed[0],
    Ecological_Scope_ID: r.Region,
    district: r.Districts_Crossed.length > 1 ? 'Multiple' : r.Districts_Crossed[0],
    watershed: r.Watershed,
    coordinates: (isLatNum && isLngNum) ? { lat: r.Source_Latitude, lng: r.Source_Longitude } : null,
    elevation: isElevNum ? r.Elevation_Max_m : null,
    area: null,
    length: isLenNum ? r.Length_km : null,

    waterQuality_status: r.Water_Quality_Status.toLowerCase(),

    Dashboard_Locked: r.Dashboard_Locked,
    Dashboard_Lock_Reason: r.Dashboard_Locked ? `Locked — Verification status is ${r.Verification_Status}` : 'Cleared for use',

    Legacy_Metadata: {
      Alternative_Names: r.Alternative_Names,
      River_Order: r.River_Order,
      Districts_Crossed: r.Districts_Crossed,
      Region: r.Region,
      Ecological_Scope: r.Ecological_Scope,
      Country_Admin_Context: r.Country_Admin_Context,
      Source_Location: r.Source_Location,
      Source_Latitude: r.Source_Latitude,
      Source_Longitude: r.Source_Longitude,
      Mouth_or_Confluence: r.Mouth_or_Confluence,
      Mouth_Latitude: r.Mouth_Latitude,
      Mouth_Longitude: r.Mouth_Longitude,
      Basin: r.Basin,
      Sub_Basin: r.Sub_Basin,
      Elevation_Min_m: r.Elevation_Min_m,
      Elevation_Max_m: r.Elevation_Max_m,
      Flow_Type: r.Flow_Type,
      Perennial_or_Seasonal: r.Perennial_or_Seasonal,
      Glacierfed_Status: r.Glacierfed_Status,
      Snowfed_Status: r.Snowfed_Status,
      Rainfed_Status: r.Rainfed_Status,
      Springfed_Status: r.Springfed_Status,
      Major_Tributaries: r.Major_Tributaries,
      Connected_Wetlands: r.Connected_Wetlands,
      Connected_Lakes: r.Connected_Lakes,
      Riparian_Condition: r.Riparian_Condition,
      Aquatic_Biodiversity_Value: r.Aquatic_Biodiversity_Value,
      Ecological_Status: r.Ecological_Status,
      Pollution_Risk: r.Pollution_Risk,
      Flood_Risk: r.Flood_Risk,
      Erosion_Risk: r.Erosion_Risk,
      Sediment_Load_Risk: r.Sediment_Load_Risk,
      Encroachment_Risk: r.Encroachment_Risk,
      Sand_Mining_Risk: r.Sand_Mining_Risk,
      Urban_Drainage_Pressure: r.Urban_Drainage_Pressure,
      Hydropower_Link: r.Hydropower_Link,
      Irrigation_Link: r.Irrigation_Link,
      Drinking_Water_Link: r.Drinking_Water_Link,
      Monitoring_Stations: r.Monitoring_Stations,
      Source_URL: r.Source_URL,
      Source_Type: r.Source_Type,
      Notes: r.Notes
    }
  };
});

console.log('Writing migrated records to rivers.ts...');
const header = `// Kashmir Eco Watch — Hydrology Database: RIVERS
// Migration Status: Legacy Imported → Pending Verification
// Generated: ${new Date().toISOString()}
// DO NOT use Dashboard_Locked records in live KPI calculations.

import type { MigratedWaterRecord } from '@/types/hydrology-migrated';

export const riversRecords: MigratedWaterRecord[] = `;

fs.writeFileSync(OUTPUT_PATH, header + JSON.stringify(migratedRecords, null, 2) + ';\n', 'utf8');
console.log('Done!');
