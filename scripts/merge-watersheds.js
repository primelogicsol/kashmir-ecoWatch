const fs = require('fs');
const path = require('path');

const EXPANDED_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/hydrology/watersheds-expanded.ts';
const WATER_SYSTEMS_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/water-systems.ts';
const WATERSHEDS_TS_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/hydrology/watersheds.ts';

console.log('Reading legacy watersheds from water-systems.ts...');
const waterSystemsContentForLegacy = fs.readFileSync(WATER_SYSTEMS_PATH, 'utf8');

// Evaluate legacy watersheds
let legacyWatersheds;
try {
  const startTag = 'export const watershedsData: WaterEntity[] = [';
  const endTag = '];';
  const startIdx = waterSystemsContentForLegacy.indexOf(startTag);
  const endIdx = waterSystemsContentForLegacy.indexOf('export const glaciersData: WaterEntity[] = [');
  const arrayText = waterSystemsContentForLegacy.substring(startIdx + startTag.length - 1, waterSystemsContentForLegacy.lastIndexOf(endTag, endIdx) + 1);
  legacyWatersheds = new Function('return ' + arrayText)();
  console.log(`Successfully parsed ${legacyWatersheds.length} legacy watershed records.`);
} catch (e) {
  console.error('Failed to parse legacy watersheds:', e);
  process.exit(1);
}

// Read expanded watersheds
console.log('Reading expanded watersheds database...');
const expandedContent = fs.readFileSync(EXPANDED_PATH, 'utf8');
const match = expandedContent.match(/export const watershedsExpandedRecords: WatershedExpandedRecord\[\] = (\[[\s\S]+?\]);/);
if (!match) {
  console.error('Could not find watershedsExpandedRecords.');
  process.exit(1);
}
const expandedRecords = new Function(`return ${match[1]}`)();
console.log(`Successfully parsed ${expandedRecords.length} expanded records.`);

const getRegionForDistrict = (district) => {
  const units = {
    'Kashmir Core': ['Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Ganderbal', 'Kupwara', 'Kulgam', 'Pulwama', 'Shopian', 'Srinagar'],
    'Jammu': ['Jammu', 'Kathua', 'Samba', 'Udhampur', 'Reasi', 'Doda', 'Kishtwar', 'Ramban', 'Rajouri', 'Poonch'],
    'Ladakh': ['Leh', 'Kargil'],
    'AJK': ['Muzaffarabad', 'Neelum', 'Hattian Bala', 'Bagh', 'Haveli', 'Poonch (AJK)', 'Sudhnoti', 'Kotli', 'Mirpur', 'Bhimber'],
    'Gilgit-Baltistan': ['Gilgit', 'Hunza', 'Nagar', 'Ghizer', 'Diamer', 'Astore', 'Skardu', 'Shigar', 'Kharmang', 'Ghanche', 'Darel', 'Tangir', 'Gupis-Yasin', 'Roundu']
  };
  for (const [region, ds] of Object.entries(units)) {
    if (ds.includes(district)) return region;
  }
  return 'Kashmir Core';
};

const getEcologicalScopeForDistrict = (district) => {
  const core = ['Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Ganderbal', 'Kupwara', 'Kulgam', 'Pulwama', 'Shopian', 'Srinagar'];
  const transDiv = ['Jammu', 'Kathua', 'Samba', 'Udhampur', 'Reasi', 'Doda', 'Kishtwar', 'Ramban', 'Rajouri', 'Poonch', 'Leh', 'Kargil'];
  if (core.includes(district)) return 'Kashmir Core';
  if (transDiv.includes(district)) return 'Trans-Divisional';
  return 'Transboundary / Extended';
};

const EXPANDED_TO_LEGACY = {
  'jhelum-basin': 'jhelum-basin',
  'indus-basin': 'indus-basin',
  'kishanganga-basin': 'kishanganga-basin',
  'lidder-sub-basin': 'lidder-basin',
  'sind-sub-basin': 'sind-basin',
  'dal-nigeen-catchment': 'dal-nigeen-catchment',
  'wular-catchment': 'wular-catchment',
  'upper-jhelum-catchment': 'upper-jhelum-catchment'
};

const mergedLegacyIds = new Set(Object.values(EXPANDED_TO_LEGACY));

// Build merged list of WaterEntity for water-systems.ts
const mergedWaterEntities = [];
const processedExpandedIds = new Set();

for (const exp of expandedRecords) {
  const legacyId = EXPANDED_TO_LEGACY[exp.Watershed_ID] || exp.Watershed_ID;
  let legacyObj = legacyWatersheds.find(l => l.id === legacyId);

  if (legacyObj) {
    mergedLegacyIds.add(legacyId);
  }

  const isLatNum = typeof exp.Centroid_Latitude === 'number';
  const isLngNum = typeof exp.Centroid_Longitude === 'number';
  const isElevNum = typeof exp.Elevation_Mean_m === 'number';
  const isAreaNum = typeof exp.Area_km2 === 'number';

  // Threats
  const legacyThreats = legacyObj ? legacyObj.threats || [] : [];
  const expThreats = ['climate-change'];
  if (exp.Soil_Erosion_Risk === 'High' || exp.Soil_Erosion_Risk === 'Critical') expThreats.push('soil-erosion');
  if (exp.Pollution_Load_Risk === 'High' || exp.Pollution_Load_Risk === 'Critical') expThreats.push('pollution');
  if (exp.Encroachment_Risk === 'High' || exp.Encroachment_Risk === 'Critical') expThreats.push('encroachment');
  if (exp.Flood_Risk === 'High' || exp.Flood_Risk === 'Critical') expThreats.push('flooding');
  const threats = [...new Set([...legacyThreats, ...expThreats])];

  // Hydrological data
  const hydrologicalData = {
    discharge: legacyObj && legacyObj.hydrologicalData?.discharge ? legacyObj.hydrologicalData.discharge : undefined,
    drainageArea: isAreaNum ? exp.Area_km2 : (legacyObj ? legacyObj.hydrologicalData?.drainageArea : undefined),
    rechargeRate: typeof exp.Groundwater_Recharge_Value === 'number' ? exp.Groundwater_Recharge_Value : undefined,
    seasonalVariation: 'perennial',
    source: exp.Glacier_Contribution === 'High' || exp.Glacier_Contribution === 'Medium' ? 'glacial' : 'mixed',
    floodRisk: exp.Flood_Risk.toLowerCase() === 'critical' ? 'critical' : (exp.Flood_Risk.toLowerCase() === 'high' ? 'high' : 'moderate')
  };

  let verStatus = 'under-review';
  if (exp.Verification_Status === 'Verified') verStatus = 'verified';
  else if (exp.Verification_Status === 'Source Linked') verStatus = 'reviewed';

  const district = exp.Districts_Covered.length > 3 ? 'Multiple' : exp.Districts_Covered.join('/');

  mergedWaterEntities.push({
    id: legacyObj ? legacyObj.id : exp.Watershed_ID,
    slug: legacyObj ? legacyObj.slug : exp.Watershed_Name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    name: legacyObj ? legacyObj.name : exp.Watershed_Name,
    type: 'watershed',
    category: exp.Watershed_Level === 'Basin' ? 'Major Basin' : (exp.Watershed_Level === 'Sub-Basin' ? 'Major Sub-Basin' : exp.Watershed_Level),
    description: legacyObj ? legacyObj.description : (exp.Notes || `A ${exp.Watershed_Level.toLowerCase()} in the ${exp.Region} region.`),
    district: district,
    area: isAreaNum ? exp.Area_km2 : (legacyObj ? legacyObj.area : undefined),
    elevation: isElevNum ? exp.Elevation_Mean_m : (legacyObj ? legacyObj.elevation : undefined),
    coordinates: (isLatNum && isLngNum) ? { lat: exp.Centroid_Latitude, lng: exp.Centroid_Longitude } : (legacyObj ? legacyObj.coordinates : undefined),
    hydrologicalData,
    threats,
    region: exp.Region,
    verificationStatus: verStatus,
    createdAt: legacyObj ? legacyObj.createdAt : '2026-01-01T00:00:00Z',
    updatedAt: '2026-06-16T00:00:00Z'
  });

  processedExpandedIds.add(exp.Watershed_ID);
}

// Add any legacy watersheds that were NOT in the expanded database
for (const leg of legacyWatersheds) {
  if (!mergedLegacyIds.has(leg.id)) {
    console.log(`Preserving unmapped legacy watershed: ${leg.id}`);
    const region = getRegionForDistrict(leg.district);
    mergedWaterEntities.push({
      ...leg,
      region
    });
  }
}

// ─── Write updated water-systems.ts ──────────────────────────────────────────
console.log('Writing merged entities back to water-systems.ts...');
const waterSystemsContent = fs.readFileSync(WATER_SYSTEMS_PATH, 'utf8');

const startTagWS = 'export const watershedsData: WaterEntity[] = [';
const endTagWS = 'export const glaciersData: WaterEntity[] = [';

const wStartIdx = waterSystemsContent.indexOf(startTagWS);
const wEndIdx = waterSystemsContent.indexOf(endTagWS);
const wLastBracketIdx = waterSystemsContent.lastIndexOf('];', wEndIdx);

const beforeWatersheds = waterSystemsContent.substring(0, wStartIdx + startTagWS.length);
const afterWatersheds = waterSystemsContent.substring(wLastBracketIdx);

const watershedsJson = JSON.stringify(mergedWaterEntities, null, 2);
const innerJson = watershedsJson.substring(1, watershedsJson.length - 1);
const updatedContent = beforeWatersheds + innerJson + '\n' + afterWatersheds;

fs.writeFileSync(WATER_SYSTEMS_PATH, updatedContent, 'utf8');
console.log('Successfully updated water-systems.ts!');

// ─── Write updated watersheds.ts (MigratedWaterRecord format) ───────────────────
console.log('Generating merged migrated records for watersheds.ts...');

const migratedRecords = mergedWaterEntities.map(m => {
  const expMatch = expandedRecords.find(e => e.Watershed_ID === m.id || EXPANDED_TO_LEGACY[e.Watershed_ID] === m.id);

  let confidence = 'High';
  let sourceId = 'SRC-GOV-JALSHAKTI';
  let verStatus = 'Verified';

  if (expMatch) {
    confidence = expMatch.Confidence_Level;
    sourceId = expMatch.Source_ID;
    
    if (expMatch.Verification_Status === 'Verified') verStatus = 'Verified';
    else if (expMatch.Verification_Status === 'Source Linked') verStatus = 'Source Linked';
    else if (expMatch.Verification_Status === 'Source Required') verStatus = 'Source Required';
  } else {
    confidence = 'Low';
    sourceId = 'SRC-LEGACY-001';
    verStatus = 'Pending Verification';
  }

  const legacyMeta = {
    Alternative_Names: expMatch ? expMatch.Alternative_Names : [],
    Watershed_Level: expMatch ? expMatch.Watershed_Level : 'Basin',
    Basin: expMatch ? expMatch.Basin : '',
    Sub_Basin: expMatch ? expMatch.Sub_Basin : '',
    River_System: expMatch ? expMatch.River_System : '',
    Main_River_or_Stream: expMatch ? expMatch.Main_River_or_Stream : ''
  };

  const dashLocked = expMatch ? expMatch.Dashboard_Locked : true;

  return {
    id: m.id,
    Legacy_ID: m.id,
    slug: m.slug,
    Migration_Status: 'Legacy Imported',
    Verification_Status: verStatus,
    Source_ID: sourceId,
    Confidence_Level: confidence,
    Last_Updated: new Date().toISOString(),

    name: m.name,
    type: m.type,
    category: m.category,
    description: m.description,

    District_ID: m.district,
    Ecological_Scope_ID: expMatch ? expMatch.Ecological_Scope : getEcologicalScopeForDistrict(m.district),
    district: m.district,
    watershed: 'Pending',
    coordinates: m.coordinates || null,
    elevation: m.elevation || null,
    area: m.area || null,
    length: null,

    waterQuality_status: 'Pending',

    Dashboard_Locked: dashLocked,
    Dashboard_Lock_Reason: dashLocked ? 'Locked — Pending validation of GIS boundaries or hydrometric datasets' : 'Cleared for use',

    Legacy_Metadata: legacyMeta
  };
});

const header = `// Kashmir Eco Watch — Hydrology Database: WATERSHEDS
// Migration Status: Legacy Imported → Pending Verification
// Generated: ${new Date().toISOString()}
// DO NOT use Dashboard_Locked records in live KPI calculations.

import type { MigratedWaterRecord } from '@/types/hydrology-migrated';

export const watershedsRecords: MigratedWaterRecord[] = `;

fs.writeFileSync(WATERSHEDS_TS_PATH, header + JSON.stringify(migratedRecords, null, 2) + ';\n', 'utf8');
console.log('Successfully updated watersheds.ts!');
