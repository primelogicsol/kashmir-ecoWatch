const fs = require('fs');
const path = require('path');

// 1. solid-waste
{
  const p = path.resolve('src/app/environmental-monitoring/solid-waste/page.tsx');
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace('Building2, Factory', 'Building2, Factory, AlertTriangle');
  fs.writeFileSync(p, c, 'utf8');
  console.log('Fixed solid-waste import');
}

// 2. sewage-wastewater
{
  const p = path.resolve('src/app/environmental-monitoring/sewage-wastewater/page.tsx');
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace('Factory, Droplets', 'Factory, Droplets, AlertTriangle');
  fs.writeFileSync(p, c, 'utf8');
  console.log('Fixed sewage-wastewater import');
}

// 3. critical-infrastructure
{
  const p = path.resolve('src/app/environmental-monitoring/critical-infrastructure/page.tsx');
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace('Building2, Activity', 'Building2, Activity, FlaskConical');
  fs.writeFileSync(p, c, 'utf8');
  console.log('Fixed critical-infrastructure import');
}
