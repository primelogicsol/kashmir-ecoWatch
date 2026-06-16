const fs = require('fs');
const path = require('path');

const EXPANDED_PATH = 'C:/Users/Fayaz/Sufipulseupdate2026/KEW 2026/kashmir-ecoWatch/src/data/hydrology/rivers-streams-expanded.ts';
const content = fs.readFileSync(EXPANDED_PATH, 'utf8');

const match = content.match(/export const riversStreamsExpandedRecords: RiverStreamRecord\[\] = (\[[\s\S]+?\]);/);
if (!match) {
  console.error('Could not find riversStreamsExpandedRecords.');
  process.exit(1);
}

// Evaluate by stripping type definitions or using a function block
let arrayText = match[1];
const records = new Function(`return ${arrayText}`)();
console.log('Total Records:', records.length);

const byRegion = {};
const byDistrict = {};
const byType = {};
const byBasin = {};
const perennialVsSeasonal = { Perennial: 0, Seasonal: 0 };
const feedSources = { Glacier: 0, Snow: 0, Rain: 0, Spring: 0 };
const byConfidence = { High: 0, Medium: 0, Low: 0 };
const validationNeeded = { GPS: 0, Length: 0, Watershed: 0 };
let lockedCount = 0;
let unlockedCount = 0;

for (const r of records) {
  byRegion[r.Region] = (byRegion[r.Region] || 0) + 1;
  for (const d of r.Districts_Crossed) {
    byDistrict[d] = (byDistrict[d] || 0) + 1;
  }
  byType[r.River_or_Stream_Type] = (byType[r.River_or_Stream_Type] || 0) + 1;
  byBasin[r.Basin] = (byBasin[r.Basin] || 0) + 1;
  
  perennialVsSeasonal[r.Perennial_or_Seasonal] = (perennialVsSeasonal[r.Perennial_or_Seasonal] || 0) + 1;
  if (r.Glacierfed_Status === true) feedSources.Glacier++;
  if (r.Snowfed_Status === true) feedSources.Snow++;
  if (r.Rainfed_Status === true) feedSources.Rain++;
  if (r.Springfed_Status === true) feedSources.Spring++;
  
  byConfidence[r.Confidence_Level] = (byConfidence[r.Confidence_Level] || 0) + 1;
  
  if (r.Dashboard_Locked) lockedCount++;
  else unlockedCount++;

  if (r.Verification_Status === 'Pending-GPS') validationNeeded.GPS++;
  if (r.Verification_Status === 'Pending-Length') validationNeeded.Length++;
  if (r.Verification_Status === 'Pending-Watershed') validationNeeded.Watershed++;
}

console.log('\n--- BY REGION ---');
console.log(JSON.stringify(byRegion, null, 2));

console.log('\n--- BY TYPE ---');
console.log(JSON.stringify(byType, null, 2));

console.log('\n--- BY BASIN ---');
console.log(JSON.stringify(byBasin, null, 2));

console.log('\n--- SEASONALITY ---');
console.log(JSON.stringify(perennialVsSeasonal, null, 2));

console.log('\n--- FEED SOURCES ---');
console.log(JSON.stringify(feedSources, null, 2));

console.log('\n--- CONFIDENCE ---');
console.log(JSON.stringify(byConfidence, null, 2));

console.log('\n--- VALIDATION ---');
console.log(JSON.stringify(validationNeeded, null, 2));

console.log('\n--- LOCK STATUS ---');
console.log(`Unlocked: ${unlockedCount}, Locked: ${lockedCount}`);

console.log('\n--- BY DISTRICT ---');
console.log(JSON.stringify(byDistrict, null, 2));
