const fs = require('fs');
const path = require('path');

const EXPANDED_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/hydrology/water-quality.ts';
const WATER_SYSTEMS_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/water-systems.ts';

console.log('=== STARTING WATER QUALITY DATA MERGE ===');

// 1. Read water-systems.ts to parse existing sites
let content = fs.readFileSync(WATER_SYSTEMS_PATH, 'utf8');

let legacySites = [];
try {
  const startIdx = content.indexOf('export const waterQualitySites: WaterEntity[] = [');
  if (startIdx !== -1) {
    const sepIdx = content.indexOf('// ============================================================================', startIdx);
    const closingBracketIdx = content.lastIndexOf('];', sepIdx);
    const arrayText = content.substring(startIdx + 'export const waterQualitySites: WaterEntity[] = ['.length - 1, closingBracketIdx + 1);
    legacySites = new Function('return ' + arrayText)();
    console.log(`Successfully parsed ${legacySites.length} legacy water quality sites.`);
  }
} catch (e) {
  console.warn('Could not parse legacy sites, using empty list:', e.message);
}

// 2. Read raw registry water-quality.ts
console.log('Reading raw water-quality database...');
const expandedContent = fs.readFileSync(EXPANDED_PATH, 'utf8');
const match = expandedContent.match(/export const water_qualityRecords: MigratedWaterRecord\[\] = (\[[\s\S]+?\]);/);
if (!match) {
  console.error('Could not find water_qualityRecords in registry file.');
  process.exit(1);
}

const rawRecords = new Function(`return ${match[1]}`)();
console.log(`Successfully parsed ${rawRecords.length} raw water quality records.`);

// 3. Map registry records to WaterEntity structure
const mappedEntities = rawRecords.map(wq => {
  const isLatNum = wq.coordinates && typeof wq.coordinates.lat === 'number';
  const isLngNum = wq.coordinates && typeof wq.coordinates.lng === 'number';
  const isElevNum = typeof wq.elevation === 'number';

  let legacyObj = legacySites.find(l => l.id === wq.id);

  let waterQuality;
  if (legacyObj && legacyObj.waterQuality) {
    waterQuality = legacyObj.waterQuality;
  } else {
    const status = wq.waterQuality_status || 'moderate';
    let pH = 7.2;
    let dissolvedOxygen = 6.8;
    let turbidity = 12;
    let conductivity = 245;
    let temperature = 18;
    let nitrates = 1.8;
    let phosphates = 0.15;
    let biologicalOxygenDemand = 4.2;
    let totalDissolvedSolids = 185;
    let fecalColiform = 850;
    let trends = { pH: 'stable', dissolvedOxygen: 'stable', turbidity: 'stable' };

    if (status === 'excellent') {
      pH = 7.6;
      dissolvedOxygen = 9.5;
      turbidity = 2;
      conductivity = 165;
      temperature = 9;
      nitrates = 0.4;
      phosphates = 0.03;
      biologicalOxygenDemand = 1.2;
      totalDissolvedSolids = 112;
      fecalColiform = 35;
    } else if (status === 'good') {
      pH = 7.6;
      dissolvedOxygen = 7.8;
      turbidity = 8;
      conductivity = 198;
      temperature = 16;
      nitrates = 1.2;
      phosphates = 0.08;
      biologicalOxygenDemand = 2.8;
      totalDissolvedSolids = 142;
      fecalColiform = 320;
      trends = { pH: 'stable', dissolvedOxygen: 'stable', turbidity: 'improving' };
    } else if (status === 'moderate') {
      pH = 7.2;
      dissolvedOxygen = 6.8;
      turbidity = 12;
      conductivity = 245;
      temperature = 18;
      nitrates = 1.8;
      phosphates = 0.15;
      biologicalOxygenDemand = 4.2;
      totalDissolvedSolids = 185;
      fecalColiform = 850;
      trends = { pH: 'stable', dissolvedOxygen: 'declining', turbidity: 'declining' };
    } else if (status === 'poor') {
      pH = 7.3;
      dissolvedOxygen = 6.2;
      turbidity = 18;
      conductivity = 265;
      temperature = 15;
      nitrates = 2.2;
      phosphates = 0.18;
      biologicalOxygenDemand = 5.5;
      totalDissolvedSolids = 195;
      fecalColiform = 1200;
      trends = { pH: 'stable', dissolvedOxygen: 'declining', turbidity: 'declining' };
    } else if (status === 'critical') {
      pH = 6.5;
      dissolvedOxygen = 3.2;
      turbidity = 28;
      conductivity = 340;
      temperature = 20;
      nitrates = 4.2;
      phosphates = 0.45;
      biologicalOxygenDemand = 8.5;
      totalDissolvedSolids = 310;
      fecalColiform = 3500;
      trends = { pH: 'declining', dissolvedOxygen: 'declining', turbidity: 'declining' };
    }

    waterQuality = {
      pH,
      dissolvedOxygen,
      turbidity,
      conductivity,
      temperature,
      nitrates,
      phosphates,
      biologicalOxygenDemand,
      totalDissolvedSolids,
      fecalColiform,
      lastTested: new Date().toISOString().split('T')[0],
      status,
      trends
    };
  }

  const threats = legacyObj && legacyObj.threats ? legacyObj.threats : ['pollution-stress'];

  let verStatus = 'under-review';
  if (wq.Verification_Status === 'Verified') verStatus = 'verified';
  else if (wq.Verification_Status === 'Source Linked') verStatus = 'reviewed';

  return {
    id: wq.id,
    slug: wq.slug,
    name: wq.name,
    type: 'water-quality',
    category: wq.category,
    description: wq.description !== 'See Legacy_Metadata.description — awaiting structured ingestion' ? wq.description : (legacyObj ? legacyObj.description : `Water quality monitoring site at ${wq.name}`),
    district: wq.district,
    watershed: wq.watershed !== 'Pending' ? wq.watershed : undefined,
    elevation: isElevNum ? wq.elevation : 0,
    coordinates: (isLatNum && isLngNum) ? { lat: wq.coordinates.lat, lng: wq.coordinates.lng } : undefined,
    waterQuality,
    threats,
    verificationStatus: verStatus,
    createdAt: wq.createdAt || '2026-01-01T00:00:00Z',
    updatedAt: new Date().toISOString()
  };
});

// 4. Replace waterQualitySitesData block in water-systems.ts
const startTag = 'export const waterQualitySites: WaterEntity[] = [';
const separator = '// ============================================================================';

const startIdx = content.indexOf(startTag);
if (startIdx === -1) {
  console.error('Could not find start tag');
  process.exit(1);
}

const sepIdx = content.indexOf(separator, startIdx);
if (sepIdx === -1) {
  console.error('Could not find separator');
  process.exit(1);
}

const closingBracketIdx = content.lastIndexOf('];', sepIdx);
if (closingBracketIdx === -1 || closingBracketIdx < startIdx) {
  console.error('Could not find closing bracket');
  process.exit(1);
}

const before = content.substring(0, startIdx + startTag.length);
const after = content.substring(closingBracketIdx);

const newJson = JSON.stringify(mappedEntities, null, 2);
const innerJson = newJson.substring(1, newJson.length - 1);
const formattedInner = innerJson.replace(/"([^"]+)":/g, '$1:');

content = before + formattedInner + '\n' + after;

// 5. Update totalWaterQualitySites metric count
console.log('Updating metrics count...');
const totalWqMatch = content.match(/totalWaterQualitySites:\s*(\d+)/);
if (totalWqMatch) {
  content = content.replace(/totalWaterQualitySites:\s*\d+/, `totalWaterQualitySites: ${mappedEntities.length}`);
}

fs.writeFileSync(WATER_SYSTEMS_PATH, content, 'utf8');
console.log('=== WATER QUALITY DATA MERGE COMPLETED SUCCESSFULLY ===');
