const fs = require('fs');
let c = fs.readFileSync('src/data/protected-network.ts', 'utf8');
c = c.replace(
  "id: 'mangla-reservoir',\r\n    slug: 'mangla-reservoir-wetland',\r\n    name: 'Mangla Reservoir Wetland Complex',\r\n    category: 'wetland_reserve',",
  "id: 'mangla-reservoir',\r\n    slug: 'mangla-reservoir-wetland',\r\n    name: 'Mangla Reservoir Wetland Complex',\r\n    category: 'wetland_reserve',\r\n    latitude: 33.1419,\r\n    longitude: 73.6450,"
);
// Also support \n if CRLF was normalized
c = c.replace(
  "id: 'mangla-reservoir',\n    slug: 'mangla-reservoir-wetland',\n    name: 'Mangla Reservoir Wetland Complex',\n    category: 'wetland_reserve',",
  "id: 'mangla-reservoir',\n    slug: 'mangla-reservoir-wetland',\n    name: 'Mangla Reservoir Wetland Complex',\n    category: 'wetland_reserve',\n    latitude: 33.1419,\n    longitude: 73.6450,"
);
fs.writeFileSync('src/data/protected-network.ts', c, 'utf8');
console.log('Successfully updated mangla coordinates!');
