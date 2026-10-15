const fs = require('fs');

const geo = JSON.parse(fs.readFileSync('./src/data/geojson/protected-areas.json', 'utf8'));
const fileText = fs.readFileSync('./src/data/protected-network.ts', 'utf8');

function extractArray(marker) {
  const match = fileText.match(new RegExp(marker + ': ProtectedArea\\[\\] = (\\[[\\s\\S]*?\\n\\];)'));
  if (!match) return [];
  const arrayCode = match[1].replace(/;\s*$/, '');
  return new Function('return ' + arrayCode)();
}

const nps = extractArray('export const nationalParksData');
const wss = extractArray('export const wildlifeSanctuariesData');
const wetlands = extractArray('export const wetlandReservesData');
const crs = extractArray('export const conservationReservesData');
const ibas = extractArray('export const birdHabitatAreasData');

const allItems = [...nps, ...wss, ...wetlands, ...crs, ...ibas];
console.log('Total protected areas across all categories:', allItems.length);

const existingMap = new Map();
geo.features.forEach(f => {
  if (f.properties?.id) existingMap.set(f.properties.id, f);
});

let added = 0;
let updated = 0;

allItems.forEach(item => {
  if (!item.latitude || !item.longitude) return;

  if (existingMap.has(item.id)) {
    const feat = existingMap.get(item.id);
    feat.geometry.coordinates = [
      Number(item.longitude.toFixed(4)),
      Number(item.latitude.toFixed(4))
    ];
    feat.properties.name = item.name;
    feat.properties.category = item.category;
    feat.properties.area_km2 = item.area;
    feat.properties.district = item.district;
    feat.properties.flagshipSpecies = item.flagshipSpecies;
    feat.properties.altitudeRange = item.altitudeRange;
    feat.properties.established = item.established;
    updated++;
  } else {
    geo.features.push({
      type: "Feature",
      properties: {
        id: item.id,
        name: item.name,
        category: item.category,
        area_km2: item.area,
        district: item.district,
        established: item.established,
        keySpecies: item.keySpecies || [],
        slug: item.slug,
        flagshipSpecies: item.flagshipSpecies,
        altitudeRange: item.altitudeRange,
        iucnCategory: item.iucn_category
      },
      geometry: {
        type: "Point",
        coordinates: [
          Number(item.longitude.toFixed(4)),
          Number(item.latitude.toFixed(4))
        ]
      }
    });
    existingMap.set(item.id, true);
    added++;
  }
});

fs.writeFileSync('./src/data/geojson/protected-areas.json', JSON.stringify(geo, null, 2), 'utf8');
console.log(`Successfully synced GeoJSON! Added: ${added}, Updated: ${updated}, Total: ${geo.features.length}`);
