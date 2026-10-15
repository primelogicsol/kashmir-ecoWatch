const fs = require('fs');
const path = require('path');

// 1. solid-waste: add AlertTriangle to imports
{
  const p = path.resolve('src/app/environmental-monitoring/solid-waste/page.tsx');
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('AlertTriangle,') && !c.includes('AlertTriangle }')) {
    c = c.replace('Trash2, ChevronRight,', 'Trash2, ChevronRight, AlertTriangle,');
    fs.writeFileSync(p, c, 'utf8');
    console.log('Fixed imports in solid-waste/page.tsx');
  }
}

// 2. sewage-wastewater: add AlertTriangle to imports
{
  const p = path.resolve('src/app/environmental-monitoring/sewage-wastewater/page.tsx');
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('AlertTriangle,') && !c.includes('AlertTriangle }')) {
    c = c.replace('Waves, ChevronRight,', 'Waves, ChevronRight, AlertTriangle,');
    fs.writeFileSync(p, c, 'utf8');
    console.log('Fixed imports in sewage-wastewater/page.tsx');
  }
}

// 3. critical-infrastructure: add FlaskConical to imports
{
  const p = path.resolve('src/app/environmental-monitoring/critical-infrastructure/page.tsx');
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('FlaskConical,') && !c.includes('FlaskConical }')) {
    c = c.replace('Building2, Activity,', 'Building2, Activity, FlaskConical,');
    fs.writeFileSync(p, c, 'utf8');
    console.log('Fixed imports in critical-infrastructure/page.tsx');
  }
}

// 4. sdg-monitoring: add activeTypology state and matchTypology
{
  const p = path.resolve('src/app/environmental-monitoring/sdg-monitoring/page.tsx');
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('const [activeTypology, setActiveTypology]')) {
    c = c.replace(
      "const [statusFilter, setStatusFilter] = useState('all');",
      "const [statusFilter, setStatusFilter] = useState('all');\n  const [activeTypology, setActiveTypology] = useState('all');"
    );
    c = c.replace(
      "return matchSearch && matchScope && matchDistrict && matchGoal && matchTheme && matchStatus;",
      `const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'sdg6' && r.goalNumber === 6) ||
        (activeTypology === 'sdg11' && r.goalNumber === 11) ||
        (activeTypology === 'sdg12' && r.goalNumber === 12) ||
        (activeTypology === 'sdg13' && r.goalNumber === 13) ||
        (activeTypology === 'sdg15' && r.goalNumber === 15) ||
        (activeTypology === 'critical' && (r.status === 'Critical' || r.status === 'Off Track'));
      return matchSearch && matchScope && matchDistrict && matchGoal && matchTheme && matchStatus && matchTypology;`
    );
    c = c.replace(
      "[filter, goalFilter, themeFilter, statusFilter]",
      "[filter, goalFilter, themeFilter, statusFilter, activeTypology]"
    );
    fs.writeFileSync(p, c, 'utf8');
    console.log('Fixed activeTypology in sdg-monitoring/page.tsx');
  }
}

// 5. utility-incidents: define utilityIncidentsData = resilienceRegistry and add activeTypology
{
  const p = path.resolve('src/app/environmental-monitoring/utility-incidents/page.tsx');
  let c = fs.readFileSync(p, 'utf8');
  if (!c.includes('const utilityIncidentsData = resilienceRegistry;')) {
    c = c.replace(
      "const totalAssets = resilienceRegistry.length;",
      "const utilityIncidentsData = resilienceRegistry;\n  const totalAssets = resilienceRegistry.length;"
    );
  }
  if (!c.includes('const [activeTypology, setActiveTypology]')) {
    c = c.replace(
      "const [priorityFilter, setPriorityFilter] = useState('all');",
      "const [priorityFilter, setPriorityFilter] = useState('all');\n  const [activeTypology, setActiveTypology] = useState('all');"
    );
    c = c.replace(
      "return matchSearch && matchScope && matchDistrict && matchDomain && matchStatus && matchPriority && matchRisk;",
      `const matchTypology = 
        activeTypology === 'all' ||
        (activeTypology === 'critical' && (r.priorityLevel === 'Critical' || r.riskExposure === 'Extreme' || r.riskExposure === 'High')) ||
        (activeTypology === 'active' && r.operationalStatus !== 'Stable') ||
        (activeTypology === 'water' && (r.resilienceDomain === 'Water System')) ||
        (activeTypology === 'sewage' && (r.resilienceDomain === 'Wastewater & Sanitation')) ||
        (activeTypology === 'power' && (r.resilienceDomain === 'Critical Infrastructure'));
      return matchSearch && matchScope && matchDistrict && matchDomain && matchStatus && matchPriority && matchRisk && matchTypology;`
    );
    c = c.replace(
      "[filter, domainFilter, statusFilter, priorityFilter, riskFilter]",
      "[filter, domainFilter, statusFilter, priorityFilter, riskFilter, activeTypology]"
    );
  }
  fs.writeFileSync(p, c, 'utf8');
  console.log('Fixed utility-incidents/page.tsx');
}
