export const GEOGRAPHY = {
  scopes: ['All', 'Kashmir Core', 'Trans-Divisional', 'Transboundary / Extended'] as const,
  regions: {
    'Kashmir Core': ['Kashmir Core'],
    'Trans-Divisional': ['Jammu', 'Ladakh'],
    'Transboundary / Extended': ['AJK', 'Gilgit-Baltistan']
  },
  units: {
    'Kashmir Core': [
      'Anantnag', 'Bandipora', 'Baramulla', 'Budgam', 'Ganderbal', 
      'Kupwara', 'Kulgam', 'Pulwama', 'Shopian', 'Srinagar'
    ],
    'Jammu': [
      'Jammu', 'Kathua', 'Samba', 'Udhampur', 'Reasi', 
      'Doda', 'Kishtwar', 'Ramban', 'Rajouri', 'Poonch'
    ],
    'Ladakh': [
      'Leh', 'Kargil'
    ],
    'AJK': [
      'Muzaffarabad', 'Neelum', 'Hattian Bala', 'Bagh', 'Haveli', 
      'Poonch (AJK)', 'Sudhnoti', 'Kotli', 'Mirpur', 'Bhimber'
    ],
    'Gilgit-Baltistan': [
      'Gilgit', 'Hunza', 'Nagar', 'Ghizer', 'Diamer', 
      'Astore', 'Skardu', 'Shigar', 'Kharmang', 'Ghanche', 
      'Darel', 'Tangir', 'Gupis-Yasin', 'Roundu'
    ]
  }
} as const;

export type Scope = typeof GEOGRAPHY.scopes[number];
export type Region = keyof typeof GEOGRAPHY.units;
export type AdminUnit = typeof GEOGRAPHY.units[Region][number];

// Get all units for a given scope
export function getUnitsForScope(scope: Scope): string[] {
  if (scope === 'All') {
    return Object.values(GEOGRAPHY.units).flat();
  }
  
  // Find regions belonging to this scope
  const regions = (GEOGRAPHY.regions as any)[scope] as string[];
  if (!regions) return [];
  
  // Collect units for those regions
  let units: string[] = [];
  for (const region of regions) {
    if (region in GEOGRAPHY.units) {
      units = [...units, ...(GEOGRAPHY.units as any)[region]];
    }
  }
  return units;
}

// Helper to determine scope from a given unit, supporting slashed districts and normalized names
export function getScopeForUnit(unit: string): Scope {
  if (!unit) return 'All';

  const normalize = (u: string) => {
    const trimmed = u.trim();
    if (trimmed === 'Jhelum Valley') return 'Hattian Bala';
    return trimmed;
  };

  const parts = unit.split('/');
  for (const part of parts) {
    const normalizedPart = normalize(part);
    for (const [region, units] of Object.entries(GEOGRAPHY.units)) {
      if ((units as readonly string[]).includes(normalizedPart)) {
        for (const [scope, regions] of Object.entries(GEOGRAPHY.regions)) {
          if ((regions as readonly string[]).includes(region)) {
            return scope as Scope;
          }
        }
      }
    }
  }

  return 'All';
}

// Helper to get available districts in entities for a given scope, splitting combined names
export function getAvailableDistrictsForScope(entities: { district: string }[], scope: Scope): string[] {
  const districtNames = new Set<string>();

  if (scope === 'All') {
    entities.forEach(e => {
      if (!e.district) return;
      e.district.split('/').forEach(d => districtNames.add(d.trim()));
    });
  } else {
    // Collect all units for this scope
    const units = getUnitsForScope(scope);
    units.forEach(u => districtNames.add(u));

    // Also scan entities to include any split segments matching this scope
    entities.forEach(e => {
      if (!e.district) return;
      e.district.split('/').map(d => d.trim()).forEach(part => {
        if (getScopeForUnit(part) === scope) {
          districtNames.add(part);
        }
      });
    });
  }

  return Array.from(districtNames).sort();
}
