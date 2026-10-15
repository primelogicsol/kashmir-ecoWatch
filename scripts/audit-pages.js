const http = require('http');

const urls = [
  '/',
  '/about',
  '/about/founder',
  '/about/contact',
  '/about/contributors',
  '/about/data-sources',
  '/about/governance',
  '/about/methodology',
  '/about/mission',
  '/about/partners',
  '/about/privacy',
  '/about/support-sponsorship',
  '/about/verification',
  '/biodiversity',
  '/water-systems',
  '/hazard-intelligence',
  '/risk-monitoring',
  '/environmental-monitoring',
  '/protected-areas',
  '/protected-network',
  '/trails-sightings',
  '/seasonal-ecology',
  '/citizen-science',
  '/districts',
  '/open-data'
];

async function checkUrl(path) {
  return new Promise((resolve) => {
    http.get('http://localhost:3000' + path, (res) => {
      resolve({ path, status: res.statusCode });
    }).on('error', (err) => {
      resolve({ path, status: 'ERROR: ' + err.message });
    });
  });
}

async function run() {
  console.log('Auditing key pages:');
  for (const path of urls) {
    const res = await checkUrl(path);
    console.log(`${res.status === 200 ? '✅' : '❌'} [${res.status}] ${res.path}`);
  }
}

run();
