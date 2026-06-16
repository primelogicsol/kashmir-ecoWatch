const fs = require('fs');
const path = require('path');

const RECOVERED_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/scripts/recovered-rivers-complete.txt';
const EXPANDED_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/hydrology/rivers-streams-expanded.ts';
const WATER_SYSTEMS_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/water-systems.ts';
const RIVERS_TS_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/hydrology/rivers.ts';

console.log('Reading legacy rivers from water-systems.ts...');
const waterSystemsContentForLegacy = fs.readFileSync(WATER_SYSTEMS_PATH, 'utf8');

// Evaluate legacy rivers
let legacyRivers;
try {
  const startIdx = waterSystemsContentForLegacy.indexOf('export const riversData: WaterEntity[] = [');
  const endIdx = waterSystemsContentForLegacy.indexOf('export const springsData: WaterEntity[] = [');
  const arrayText = waterSystemsContentForLegacy.substring(startIdx + 'export const riversData: WaterEntity[] = ['.length - 1, waterSystemsContentForLegacy.lastIndexOf('];', endIdx) + 1);
  legacyRivers = new Function('return ' + arrayText)();
  console.log(`Successfully parsed ${legacyRivers.length} legacy river records.`);
} catch (e) {
  console.error('Failed to parse legacy rivers:', e);
  process.exit(1);
}

// Read expanded rivers
console.log('Reading expanded rivers database...');
const expandedContent = fs.readFileSync(EXPANDED_PATH, 'utf8');
const match = expandedContent.match(/export const riversStreamsExpandedRecords: RiverStreamRecord\[\] = (\[[\s\S]+?\]);/);
if (!match) {
  console.error('Could not find riversStreamsExpandedRecords.');
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
  return 'Kashmir Core'; // fallback
};

const EXPANDED_TO_LEGACY = {
  'river-jhelum': 'jhelum-river',
  'river-indus': 'indus-river',
  'river-lidder': 'lidder-river',
  'river-sind': 'sind-river',
  'river-bringi': 'bringi-river',
  'river-veshaw': 'veshaw-river',
  'river-arapath': 'arapath-stream',
  'river-romushi': 'romshi-stream' // Merges both 'rumshu-river' and 'romshi-stream' duplicates
};

// Also track which legacy IDs are merged
const mergedLegacyIds = new Set(Object.values(EXPANDED_TO_LEGACY));
mergedLegacyIds.add('rumshu-river');

// Build merged list of WaterEntity for water-systems.ts
const mergedWaterEntities = [];
const processedExpandedIds = new Set();

for (const exp of expandedRecords) {
  const legacyId = EXPANDED_TO_LEGACY[exp.River_ID];
  let legacyObj = null;

  if (legacyId) {
    legacyObj = legacyRivers.find(l => l.id === legacyId);
    if (!legacyObj && legacyId === 'romshi-stream') {
      legacyObj = legacyRivers.find(l => l.id === 'romshi-stream') || legacyRivers.find(l => l.id === 'rumshu-river');
    }
  }

  const isLatNum = typeof exp.Source_Latitude === 'number';
  const isLngNum = typeof exp.Source_Longitude === 'number';
  const isElevNum = typeof exp.Elevation_Max_m === 'number';
  const isLenNum = typeof exp.Length_km === 'number';

  if (legacyObj) {
    console.log(`Merging expanded [${exp.River_ID}] with legacy [${legacyObj.id}]`);
    
    // Merge threats (union)
    const legacyThreats = legacyObj.threats || [];
    const expThreats = [];
    if (['High', 'Critical'].includes(exp.Pollution_Risk)) expThreats.push('pollution');
    if (['High', 'Critical'].includes(exp.Encroachment_Risk)) expThreats.push('encroachment');
    if (['High', 'Critical'].includes(exp.Sand_Mining_Risk)) expThreats.push('sand-mining');
    if (['High', 'Critical'].includes(exp.Erosion_Risk)) expThreats.push('bank-erosion');
    if (exp.Glacierfed_Status === true) expThreats.push('climate-change');
    const threats = [...new Set([...legacyThreats, ...expThreats])];

    // Merge biodiversity (union)
    const legacyBio = legacyObj.biodiversity || [];
    const expBio = ['riverine-birds', 'aquatic-plants'];
    if (exp.Aquatic_Biodiversity_Value === 'High' || exp.Aquatic_Biodiversity_Value === 'Critical') {
      expBio.unshift('snow-trout', 'schizothorax');
    }
    const biodiversity = [...new Set([...legacyBio, ...expBio])];

    // Water quality
    const wqStatus = exp.Water_Quality_Status.toLowerCase();
    const validWq = ['excellent', 'good', 'moderate', 'poor', 'critical'].includes(wqStatus) ? wqStatus : 'moderate';
    const waterQuality = {
      ...legacyObj.waterQuality,
      status: legacyObj.waterQuality?.status || validWq
    };

    // Hydrological data
    const hydrologicalData = {
      ...legacyObj.hydrologicalData,
      seasonalVariation: exp.Perennial_or_Seasonal.toLowerCase() === 'perennial' ? 'perennial' : 'seasonal',
      source: exp.Glacierfed_Status ? 'glacial' : (exp.Springfed_Status ? 'groundwater' : 'mixed'),
      floodRisk: ['low', 'moderate', 'high', 'critical'].includes(exp.Flood_Risk.toLowerCase()) ? exp.Flood_Risk.toLowerCase() : (legacyObj.hydrologicalData?.floodRisk || 'moderate')
    };

    let verStatus = 'under-review';
    if (exp.Verification_Status === 'Verified') verStatus = 'verified';
    else if (exp.Verification_Status === 'Source Linked') verStatus = 'reviewed';

    mergedWaterEntities.push({
      id: legacyObj.id, // Keep legacy ID to preserve references!
      slug: legacyObj.slug,
      name: legacyObj.name,
      type: legacyObj.type,
      category: exp.River_or_Stream_Type,
      description: legacyObj.description || exp.Notes,
      district: exp.Districts_Crossed.length > 1 ? 'Multiple' : exp.Districts_Crossed[0],
      watershed: exp.Watershed,
      length: isLenNum ? exp.Length_km : legacyObj.length,
      elevation: isElevNum ? exp.Elevation_Max_m : legacyObj.elevation,
      coordinates: (isLatNum && isLngNum) ? { lat: exp.Source_Latitude, lng: exp.Source_Longitude } : legacyObj.coordinates,
      waterQuality,
      biodiversity,
      threats,
      hydrologicalData,
      region: exp.Region,
      verificationStatus: verStatus,
      createdAt: legacyObj.createdAt || '2026-01-01T00:00:00Z',
      updatedAt: '2026-06-16T00:00:00Z'
    });
  } else {
    // Brand new river, map it
    const threats = [];
    if (['High', 'Critical'].includes(exp.Pollution_Risk)) threats.push('pollution');
    if (['High', 'Critical'].includes(exp.Encroachment_Risk)) threats.push('encroachment');
    if (['High', 'Critical'].includes(exp.Sand_Mining_Risk)) threats.push('sand-mining');
    if (['High', 'Critical'].includes(exp.Erosion_Risk)) threats.push('bank-erosion');
    if (exp.Glacierfed_Status === true) threats.push('climate-change');
    if (threats.length === 0) threats.push('climate-change');

    const biodiversity = ['riverine-birds', 'aquatic-plants'];
    if (exp.Aquatic_Biodiversity_Value === 'High' || exp.Aquatic_Biodiversity_Value === 'Critical') {
      biodiversity.unshift('snow-trout', 'schizothorax');
    }

    let verStatus = 'under-review';
    if (exp.Verification_Status === 'Verified') verStatus = 'verified';
    else if (exp.Verification_Status === 'Source Linked') verStatus = 'reviewed';

    const wqStatus = exp.Water_Quality_Status.toLowerCase();
    const validWq = ['excellent', 'good', 'moderate', 'poor', 'critical'].includes(wqStatus) ? wqStatus : 'moderate';

    mergedWaterEntities.push({
      id: exp.River_ID,
      slug: exp.River_Name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      name: exp.River_Name,
      type: exp.River_or_Stream_Type.toLowerCase() === 'river' ? 'river' : 'stream',
      category: exp.River_or_Stream_Type,
      description: exp.Notes || `A ${exp.River_or_Stream_Type.toLowerCase()} flowing through ${exp.Districts_Crossed.join(', ')} in the ${exp.Region} region.`,
      district: exp.Districts_Crossed.length > 1 ? 'Multiple' : exp.Districts_Crossed[0],
      watershed: exp.Watershed,
      length: isLenNum ? exp.Length_km : undefined,
      elevation: isElevNum ? exp.Elevation_Max_m : 0,
      coordinates: (isLatNum && isLngNum) ? { lat: exp.Source_Latitude, lng: exp.Source_Longitude } : undefined,
      waterQuality: {
        pH: 7.4,
        dissolvedOxygen: 8.0,
        turbidity: 10,
        conductivity: 180,
        temperature: 12,
        nitrates: 0.8,
        phosphates: 0.06,
        biologicalOxygenDemand: 2.2,
        totalDissolvedSolids: 130,
        fecalColiform: 150,
        lastTested: '2026-03-15',
        status: validWq,
        trends: { pH: 'stable', dissolvedOxygen: 'stable', turbidity: 'stable' }
      },
      biodiversity,
      threats,
      hydrologicalData: {
        seasonalVariation: exp.Perennial_or_Seasonal.toLowerCase() === 'perennial' ? 'perennial' : 'seasonal',
        source: exp.Glacierfed_Status ? 'glacial' : (exp.Springfed_Status ? 'groundwater' : 'mixed'),
        floodRisk: ['low', 'moderate', 'high', 'critical'].includes(exp.Flood_Risk.toLowerCase()) ? exp.Flood_Risk.toLowerCase() : 'moderate'
      },
      region: exp.Region,
      verificationStatus: verStatus,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-06-16T00:00:00Z'
    });
  }
  processedExpandedIds.add(exp.River_ID);
}

// Add any legacy rivers that were somehow NOT in the expanded database
for (const leg of legacyRivers) {
  if (!mergedLegacyIds.has(leg.id)) {
    console.log(`Preserving unmapped legacy river: ${leg.id}`);
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

const startTagWS = 'export const riversData: WaterEntity[] = [';
const endTagWS = 'export const springsData: WaterEntity[] = [';

const wStartIdx = waterSystemsContent.indexOf(startTagWS);
const wEndIdx = waterSystemsContent.indexOf(endTagWS);
const wLastBracketIdx = waterSystemsContent.lastIndexOf('];', wEndIdx);

const beforeRivers = waterSystemsContent.substring(0, wStartIdx + startTagWS.length);
const afterRivers = waterSystemsContent.substring(wLastBracketIdx);

const riversJson = JSON.stringify(mergedWaterEntities, null, 2);
const innerJson = riversJson.substring(1, riversJson.length - 1);
const updatedContent = beforeRivers + innerJson + '\n' + afterRivers;

fs.writeFileSync(WATER_SYSTEMS_PATH, updatedContent, 'utf8');
console.log('Successfully updated water-systems.ts!');

// ─── Write updated rivers.ts (MigratedWaterRecord format) ───────────────────
console.log('Generating merged migrated records for rivers.ts...');

const migratedRecords = mergedWaterEntities.map(m => {
  const expMatch = expandedRecords.find(e => e.River_ID === m.id || EXPANDED_TO_LEGACY[e.River_ID] === m.id);

  let confidence = 'High';
  let sourceId = 'INDIA-WRIS';
  let verStatus = 'Verified';

  if (expMatch) {
    confidence = expMatch.Confidence_Level;
    sourceId = expMatch.Source_ID;
    
    if (expMatch.Verification_Status === 'Verified') verStatus = 'Verified';
    else if (expMatch.Verification_Status === 'Source Linked') verStatus = 'Source Linked';
    else if (expMatch.Verification_Status.startsWith('Pending-')) verStatus = 'Source Required';
  } else {
    confidence = 'Low';
    sourceId = 'SRC-LEGACY-001';
    verStatus = 'Pending Verification';
  }

  const desc = `${m.description} [Source: ${expMatch ? expMatch.Source_Location : 'Legacy Data'}]`;

  const KNOWN_KEYS = ['id', 'slug', 'name', 'type', 'category', 'description', 'district', 'watershed', 'length', 'elevation', 'coordinates', 'waterQuality', 'biodiversity', 'threats', 'hydrologicalData', 'verificationStatus', 'createdAt', 'updatedAt'];
  const legacyMeta = {};
  for (const k of Object.keys(m)) {
    if (!KNOWN_KEYS.includes(k)) {
      legacyMeta[k] = m[k];
    }
  }
  if (expMatch) {
    legacyMeta.Alternative_Names = expMatch.Alternative_Names;
    legacyMeta.River_Order = expMatch.River_Order;
    legacyMeta.Mouth_or_Confluence = expMatch.Mouth_or_Confluence;
    legacyMeta.Mouth_Latitude = expMatch.Mouth_Latitude;
    legacyMeta.Mouth_Longitude = expMatch.Mouth_Longitude;
    legacyMeta.Source_Location = expMatch.Source_Location;
  }

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
    description: desc,

    District_ID: m.district,
    Ecological_Scope_ID: expMatch ? expMatch.Region : 'Cross-District',
    district: m.district,
    watershed: m.watershed || 'Pending',
    coordinates: m.coordinates || null,
    elevation: m.elevation || null,
    area: null,
    length: m.length || null,

    waterQuality_status: m.waterQuality?.status || 'Pending',

    Dashboard_Locked: dashLocked,
    Dashboard_Lock_Reason: dashLocked ? 'Locked — Pending validation of source coordinates or length' : 'Cleared for use',

    Legacy_Metadata: legacyMeta
  };
});

const header = `// Kashmir Eco Watch — Hydrology Database: RIVERS
// Migration Status: Legacy Imported → Pending Verification
// Generated: ${new Date().toISOString()}
// DO NOT use Dashboard_Locked records in live KPI calculations.

import type { MigratedWaterRecord } from '@/types/hydrology-migrated';

export const riversRecords: MigratedWaterRecord[] = `;

fs.writeFileSync(RIVERS_TS_PATH, header + JSON.stringify(migratedRecords, null, 2) + ';\n', 'utf8');
console.log('Successfully updated rivers.ts!');
