const http = require('http');

const urls = [
  'http://localhost:3000/environmental-monitoring',
  'http://localhost:3000/environmental-monitoring/dashboards',
  'http://localhost:3000/environmental-monitoring/solid-waste',
  'http://localhost:3000/environmental-monitoring/bio-waste',
  'http://localhost:3000/environmental-monitoring/sewage-wastewater',
  'http://localhost:3000/environmental-monitoring/drinking-water',
  'http://localhost:3000/environmental-monitoring/critical-infrastructure',
  'http://localhost:3000/environmental-monitoring/air-pollution',
  'http://localhost:3000/environmental-monitoring/environmental-health',
  'http://localhost:3000/environmental-monitoring/environmental-resilience',
  'http://localhost:3000/environmental-monitoring/sdg-monitoring',
  'http://localhost:3000/environmental-monitoring/utility-incidents',
  'http://localhost:3000/hazard-intelligence',
  'http://localhost:3000/ngo-impact',
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const hasTypology = data.toLowerCase().includes('focus typologies') || data.toLowerCase().includes('typologies');
        const hasObserve = data.toLowerCase().includes('observe here');
        resolve({
          url,
          statusCode: res.statusCode,
          hasTypology,
          hasObserve,
          length: data.length
        });
      });
    }).on('error', (err) => {
      resolve({
        url,
        statusCode: 'ERR',
        error: err.message
      });
    });
  });
}

async function run() {
  console.log('Verifying all 14 Environmental Monitoring & connected pages...');
  for (const url of urls) {
    const res = await checkUrl(url);
    console.log(`[${res.statusCode}] ${url} -> Typologies: ${res.hasTypology}, Observe: ${res.hasObserve} (${res.length} bytes)`);
  }
}

run();
