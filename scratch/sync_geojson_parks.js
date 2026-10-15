const fs = require('fs');

const geo = JSON.parse(fs.readFileSync('./src/data/geojson/protected-areas.json', 'utf8'));
const fileText = fs.readFileSync('./src/data/protected-network.ts', 'utf8');

const match = fileText.match(/export const nationalParksData: ProtectedArea\[\] = (\[[\s\S]*?\n\];)/);
if (!match) {
  console.error('Could not find nationalParksData in protected-network.ts');
  process.exit(1);
}

// Convert typescript array string to object using Function
const arrayCode = match[1].replace(/;\s*$/, '');
const nationalParksData = new Function('return ' + arrayCode)();

const existingIds = new Set(geo.features.map(f => f.properties?.id));

nationalParksData.forEach(np => {
  if (!existingIds.has(np.id)) {
    geo.features.push({
      type: "Feature",
      properties: {
        id: np.id,
        name: np.name,
        category: "national_park",
        area_km2: np.area,
        district: np.district,
        established: np.established,
        keySpecies: np.keySpecies,
        slug: np.slug,
        flagshipSpecies: np.flagshipSpecies,
        altitudeRange: np.altitudeRange,
        iucnCategory: np.iucn_category
      },
      geometry: {
        type: "Point",
        coordinates: [
          Number(np.longitude.toFixed(4)),
          Number(np.latitude.toFixed(4))
        ]
      }
    });
    existingIds.add(np.id);
  } else {
    const target = geo.features.find(f => f.properties?.id === np.id);
    if (target && np.longitude && np.latitude) {
      target.geometry.coordinates = [
        Number(np.longitude.toFixed(4)),
        Number(np.latitude.toFixed(4))
      ];
      target.properties.area_km2 = np.area;
      target.properties.flagshipSpecies = np.flagshipSpecies;
      target.properties.altitudeRange = np.altitudeRange;
    }
  }
});

fs.writeFileSync('./src/data/geojson/protected-areas.json', JSON.stringify(geo, null, 2), 'utf8');
console.log('Successfully updated protected-areas.json! Total features:', geo.features.length);
