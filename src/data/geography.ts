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

// Helper to determine scope from a given unit
export function getScopeForUnit(unit: string): Scope {
  for (const [region, units] of Object.entries(GEOGRAPHY.units)) {
    if ((units as readonly string[]).includes(unit)) {
      for (const [scope, regions] of Object.entries(GEOGRAPHY.regions)) {
        if ((regions as readonly string[]).includes(region)) {
          return scope as Scope;
        }
      }
    }
  }
  // Default to Transboundary / Extended if it's external, or All
  return 'All';
}
