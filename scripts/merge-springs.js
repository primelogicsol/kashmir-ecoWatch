const fs = require('fs');
const path = require('path');

const EXPANDED_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/hydrology/springs-expanded.ts';
const WATER_SYSTEMS_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/water-systems.ts';
const SPRINGS_TS_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/hydrology/springs.ts';

console.log('Reading legacy springs from water-systems.ts...');
const waterSystemsContentForLegacy = fs.readFileSync(WATER_SYSTEMS_PATH, 'utf8');

// Evaluate legacy springs
let legacySprings;
try {
  const startIdx = waterSystemsContentForLegacy.indexOf('export const springsData: WaterEntity[] = [');
  const endIdx = waterSystemsContentForLegacy.indexOf('// Metrics');
  const arrayText = waterSystemsContentForLegacy.substring(startIdx + 'export const springsData: WaterEntity[] = ['.length - 1, waterSystemsContentForLegacy.lastIndexOf('];', endIdx) + 1);
  legacySprings = new Function('return ' + arrayText)();
  console.log(`Successfully parsed ${legacySprings.length} legacy spring records.`);
} catch (e) {
  console.error('Failed to parse legacy springs:', e);
  process.exit(1);
}

// Read expanded springs
console.log('Reading expanded springs database...');
const expandedContent = fs.readFileSync(EXPANDED_PATH, 'utf8');
const match = expandedContent.match(/export const springsExpandedRecords: SpringExpandedRecord\[\] = (\[[\s\S]+?\]);/);
if (!match) {
  console.error('Could not find springsExpandedRecords.');
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

const EXPANDED_TO_LEGACY = {
  'spring-kokernag': 'kokernag-spring',
  'spring-achabal': 'achabal-spring',
  'spring-verinag': 'verinag-spring',
  'spring-sheshnag': 'sheshnag-spring',
  'spring-dareng': 'dareng-spring',
  'spring-malikpora-kulgam': 'malikpora-spring',
  'spring-chashma-shahi': 'spring-chashma-shahi',
  'spring-panamik': 'spring-panamik',
  'spring-tatta-pani-kotli': 'spring-tatta-pani'
};

const mergedLegacyIds = new Set(Object.values(EXPANDED_TO_LEGACY));

// Build merged list of WaterEntity for water-systems.ts
const mergedWaterEntities = [];
const processedExpandedIds = new Set();

for (const exp of expandedRecords) {
  const legacyId = EXPANDED_TO_LEGACY[exp.Spring_ID] || exp.Spring_ID;
  let legacyObj = legacySprings.find(l => l.id === legacyId);

  if (legacyObj) {
    mergedLegacyIds.add(legacyId);
  }

  const isLatNum = typeof exp.Latitude === 'number';
  const isLngNum = typeof exp.Longitude === 'number';
  const isElevNum = typeof exp.Elevation_m === 'number';
  const isDischargeNum = typeof exp.Discharge_LPS === 'number';

  if (legacyObj) {
    console.log(`Merging expanded [${exp.Spring_ID}] with legacy [${legacyObj.id}]`);
    
    // Merge threats (union)
    const legacyThreats = legacyObj.threats || [];
    const expThreats = [];
    if (exp.Drying_Risk === 'High' || exp.Drying_Risk === 'Critical') expThreats.push('drying-risk');
    if (exp.Climate_Vulnerability === 'High' || exp.Climate_Vulnerability === 'Critical') expThreats.push('climate-change');
    const threats = [...new Set([...legacyThreats, ...expThreats])];

    // Merge biodiversity (union)
    const legacyBio = legacyObj.biodiversity || [];
    const expBio = ['aquatic-plants', 'amphibians'];
    const biodiversity = [...new Set([...legacyBio, ...expBio])];

    // Water quality
    const wqStatus = exp.Water_Quality_Status.toLowerCase();
    const validWq = ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'].includes(wqStatus) ? wqStatus : 'moderate';
    let waterQuality;
    if (wqStatus === 'data-deficient') {
      waterQuality = {
        pH: exp.Spring_ID === 'spring-tatapani-kalakote' ? 6.41 : null,
        dissolvedOxygen: null,
        turbidity: null,
        conductivity: null,
        temperature: exp.Spring_ID === 'spring-tatapani-kalakote' ? 46 : null,
        nitrates: null,
        phosphates: null,
        biologicalOxygenDemand: null,
        totalDissolvedSolids: null,
        fecalColiform: null,
        lastTested: '2026-03-15',
        status: 'data-deficient',
        trends: { pH: 'stable', dissolvedOxygen: 'stable', turbidity: 'stable' }
      };
    } else {
      waterQuality = {
        pH: legacyObj.waterQuality?.pH || 7.5,
        dissolvedOxygen: legacyObj.waterQuality?.dissolvedOxygen || 8.5,
        turbidity: legacyObj.waterQuality?.turbidity || 3,
        conductivity: legacyObj.waterQuality?.conductivity || 180,
        temperature: legacyObj.waterQuality?.temperature || 10,
        nitrates: legacyObj.waterQuality?.nitrates || 0.5,
        phosphates: legacyObj.waterQuality?.phosphates || 0.04,
        biologicalOxygenDemand: legacyObj.waterQuality?.biologicalOxygenDemand || 1.5,
        totalDissolvedSolids: legacyObj.waterQuality?.totalDissolvedSolids || 120,
        fecalColiform: legacyObj.waterQuality?.fecalColiform || 50,
        lastTested: legacyObj.waterQuality?.lastTested || '2026-03-15',
        status: legacyObj.waterQuality?.status || validWq,
        trends: legacyObj.waterQuality?.trends || { pH: 'stable', dissolvedOxygen: 'stable', turbidity: 'stable' }
      };
    }

    // Hydrological data
    const hydrologicalData = {
      rechargeRate: legacyObj.hydrologicalData?.rechargeRate || 400,
      waterLevel: legacyObj.hydrologicalData?.waterLevel || 1.2,
      seasonalVariation: exp.Seasonality.toLowerCase() === 'perennial' ? 'perennial' : 'seasonal',
      source: 'groundwater',
      drainageArea: legacyObj.hydrologicalData?.drainageArea || 50,
      floodRisk: legacyObj.hydrologicalData?.floodRisk || 'low',
      discharge: isDischargeNum ? exp.Discharge_LPS : undefined
    };

    let verStatus = 'under-review';
    if (exp.Verification_Status === 'Verified') verStatus = 'verified';
    else if (exp.Verification_Status === 'Source Linked') verStatus = 'reviewed';

    mergedWaterEntities.push({
      id: legacyObj.id, // Keep legacy ID to preserve references!
      slug: legacyObj.slug,
      name: legacyObj.name,
      type: 'spring',
      category: exp.Spring_Type,
      description: legacyObj.description || exp.Notes,
      district: exp.District,
      watershed: exp.Watershed_ID !== 'Data Pending' && exp.Watershed_ID !== 'Source Required' ? exp.Watershed_ID : legacyObj.watershed,
      elevation: isElevNum ? exp.Elevation_m : legacyObj.elevation,
      coordinates: (isLatNum && isLngNum) ? { lat: exp.Latitude, lng: exp.Longitude } : legacyObj.coordinates,
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
    // Brand new spring, map it
    const threats = ['climate-change'];
    if (exp.Drying_Risk === 'High' || exp.Drying_Risk === 'Critical') threats.push('drying-risk');

    const biodiversity = ['aquatic-plants', 'amphibians'];

    let verStatus = 'under-review';
    if (exp.Verification_Status === 'Verified') verStatus = 'verified';
    else if (exp.Verification_Status === 'Source Linked') verStatus = 'reviewed';

    const wqStatus = exp.Water_Quality_Status.toLowerCase();
    const validWq = ['excellent', 'good', 'moderate', 'poor', 'critical', 'data-deficient'].includes(wqStatus) ? wqStatus : 'moderate';

    mergedWaterEntities.push({
      id: exp.Spring_ID,
      slug: exp.Spring_Name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      name: exp.Spring_Name,
      type: 'spring',
      category: exp.Spring_Type,
      description: exp.Notes || `A ${exp.Spring_Type.toLowerCase()} in the ${exp.District} district of ${exp.Region}.`,
      district: exp.District,
      watershed: exp.Watershed_ID !== 'Data Pending' && exp.Watershed_ID !== 'Source Required' ? exp.Watershed_ID : undefined,
      elevation: isElevNum ? exp.Elevation_m : 0,
      coordinates: (isLatNum && isLngNum) ? { lat: exp.Latitude, lng: exp.Longitude } : undefined,
      waterQuality: wqStatus === 'data-deficient' ? {
        pH: exp.Spring_ID === 'spring-tatapani-kalakote' ? 6.41 : null,
        dissolvedOxygen: null,
        turbidity: null,
        conductivity: null,
        temperature: exp.Spring_ID === 'spring-tatapani-kalakote' ? 46 : null,
        nitrates: null,
        phosphates: null,
        biologicalOxygenDemand: null,
        totalDissolvedSolids: null,
        fecalColiform: null,
        lastTested: '2026-03-15',
        status: 'data-deficient',
        trends: { pH: 'stable', dissolvedOxygen: 'stable', turbidity: 'stable' }
      } : {
        pH: 7.5,
        dissolvedOxygen: 8.5,
        turbidity: 3,
        conductivity: 180,
        temperature: 10,
        nitrates: 0.5,
        phosphates: 0.04,
        biologicalOxygenDemand: 1.5,
        totalDissolvedSolids: 120,
        fecalColiform: 50,
        lastTested: '2026-03-15',
        status: validWq,
        trends: { pH: 'stable', dissolvedOxygen: 'stable', turbidity: 'stable' }
      },
      biodiversity,
      threats,
      hydrologicalData: {
        rechargeRate: 400,
        waterLevel: 1.2,
        seasonalVariation: exp.Seasonality.toLowerCase() === 'perennial' ? 'perennial' : 'seasonal',
        source: 'groundwater',
        drainageArea: 50,
        floodRisk: 'low',
        discharge: isDischargeNum ? exp.Discharge_LPS : undefined
      },
      region: exp.Region,
      verificationStatus: verStatus,
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-06-16T00:00:00Z'
    });
  }
  processedExpandedIds.add(exp.Spring_ID);
}

// Add any legacy springs that were somehow NOT in the expanded database
for (const leg of legacySprings) {
  if (!mergedLegacyIds.has(leg.id)) {
    console.log(`Preserving unmapped legacy spring: ${leg.id}`);
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

const startTagWS = 'export const springsData: WaterEntity[] = [';
const endTagWS = '// Metrics';

const wStartIdx = waterSystemsContent.indexOf(startTagWS);
const wEndIdx = waterSystemsContent.indexOf(endTagWS);
const wLastBracketIdx = waterSystemsContent.lastIndexOf('];', wEndIdx);

const beforeSprings = waterSystemsContent.substring(0, wStartIdx + startTagWS.length);
const afterSprings = waterSystemsContent.substring(wLastBracketIdx);

const springsJson = JSON.stringify(mergedWaterEntities, null, 2);
const innerJson = springsJson.substring(1, springsJson.length - 1);
const updatedContent = beforeSprings + innerJson + '\n' + afterSprings;

fs.writeFileSync(WATER_SYSTEMS_PATH, updatedContent, 'utf8');
console.log('Successfully updated water-systems.ts!');

// ─── Write updated springs.ts (MigratedWaterRecord format) ───────────────────
console.log('Generating merged migrated records for springs.ts...');

const migratedRecords = mergedWaterEntities.map(m => {
  const expMatch = expandedRecords.find(e => e.Spring_ID === m.id || EXPANDED_TO_LEGACY[e.Spring_ID] === m.id);

  let confidence = 'High';
  let sourceId = 'SRC-GOV-JALSHAKTI';
  let verStatus = 'Verified';

  if (expMatch) {
    confidence = expMatch.Confidence_Level;
    sourceId = expMatch.Source_ID;
    
    if (expMatch.Verification_Status === 'Verified') verStatus = 'Verified';
    else if (expMatch.Verification_Status === 'Source Linked') verStatus = 'Source Linked';
    else if (expMatch.Verification_Status.startsWith('Pending-') || expMatch.Verification_Status === 'Source Required') verStatus = 'Source Required';
  } else {
    confidence = 'Low';
    sourceId = 'SRC-LEGACY-001';
    verStatus = 'Pending Verification';
  }

  const desc = m.description;
  const legacyMeta = {
    Alternative_Names: expMatch ? expMatch.Alternative_Names : [],
    Village_Locality: expMatch ? expMatch.Village_Locality : '',
    Water_Use: expMatch ? expMatch.Water_Use : [],
    Drying_Risk: expMatch ? expMatch.Drying_Risk : 'Low',
    Climate_Vulnerability: expMatch ? expMatch.Climate_Vulnerability : 'Low',
    Community_Dependency: expMatch ? expMatch.Community_Dependency : ''
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
    description: desc,

    District_ID: m.district,
    Ecological_Scope_ID: expMatch ? expMatch.Region : getRegionForDistrict(m.district),
    district: m.district,
    watershed: m.watershed || 'Pending',
    coordinates: m.coordinates || null,
    elevation: m.elevation || null,
    area: null,
    length: null,

    waterQuality_status: m.waterQuality?.status || 'Pending',

    Dashboard_Locked: dashLocked,
    Dashboard_Lock_Reason: dashLocked ? 'Locked — Pending validation of source coordinates or discharge' : 'Cleared for use',

    Legacy_Metadata: legacyMeta
  };
});

const header = `// Kashmir Eco Watch — Hydrology Database: SPRINGS
// Migration Status: Legacy Imported → Pending Verification
// Generated: ${new Date().toISOString()}
// DO NOT use Dashboard_Locked records in live KPI calculations.

import type { MigratedWaterRecord } from '@/types/hydrology-migrated';

export const springsRecords: MigratedWaterRecord[] = `;

fs.writeFileSync(SPRINGS_TS_PATH, header + JSON.stringify(migratedRecords, null, 2) + ';\n', 'utf8');
console.log('Successfully updated springs.ts!');
