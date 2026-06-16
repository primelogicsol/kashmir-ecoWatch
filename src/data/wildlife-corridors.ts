export interface WildlifeCorridor {
  id: string;
  name: string;
  type: 'Kashmir Core' | 'Jammu Division' | 'Transboundary' | 'Ladakh Division' | 'Gilgit-Baltistan';
  districts_spanned: string[];
  status: 'Functional' | 'Threatened' | 'Severed' | 'Restoration Required';
  target_species: string[];
  length_km: number;
  ecological_importance: string;
  primary_threats: string[];
}

export const masterCorridors: WildlifeCorridor[] = [
  // Kashmir Core
  {
    id: 'cor-kc-1',
    name: 'Dachigam → Overa-Aru',
    type: 'Kashmir Core',
    districts_spanned: ['Srinagar', 'Ganderbal', 'Anantnag'],
    status: 'Threatened',
    target_species: ['Hangul', 'Himalayan Black Bear', 'Leopard'],
    length_km: 45,
    ecological_importance: 'Primary movement route for the critically endangered Hangul deer between its summer and winter grounds.',
    primary_threats: ['Road Expansion', 'Tourism Infrastructure', 'Grazing']
  },
  {
    id: 'cor-kc-2',
    name: 'Overa-Aru → Sind Valley',
    type: 'Kashmir Core',
    districts_spanned: ['Anantnag', 'Ganderbal'],
    status: 'Functional',
    target_species: ['Brown Bear', 'Musk Deer', 'Himalayan Monal'],
    length_km: 30,
    ecological_importance: 'High altitude connectivity linking the southern and northern ranges of the Greater Himalaya in Kashmir.',
    primary_threats: ['Overgrazing', 'Nomadic Settlements']
  },
  {
    id: 'cor-kc-3',
    name: 'Sind Valley → Gurez',
    type: 'Kashmir Core',
    districts_spanned: ['Ganderbal', 'Bandipora'],
    status: 'Functional',
    target_species: ['Snow Leopard', 'Brown Bear', 'Himalayan Ibex'],
    length_km: 65,
    ecological_importance: 'Critical alpine linkage connecting the Kashmir Valley edge to the Trans-Himalayan edge.',
    primary_threats: ['Military Infrastructure', 'Climate Change (Glacial Retreat)']
  },
  {
    id: 'cor-kc-4',
    name: 'Hirpora → Pir Panjal',
    type: 'Kashmir Core',
    districts_spanned: ['Shopian', 'Poonch', 'Rajouri'],
    status: 'Threatened',
    target_species: ['Markhor', 'Himalayan Black Bear', 'Western Tragopan'],
    length_km: 80,
    ecological_importance: 'Connects the Kashmir Valley to the Jammu region across the Pir Panjal pass, vital for Markhor populations.',
    primary_threats: ['Mughal Road Traffic', 'Poaching', 'Deforestation']
  },
  {
    id: 'cor-kc-5',
    name: 'Limber → Lachipora',
    type: 'Kashmir Core',
    districts_spanned: ['Baramulla'],
    status: 'Threatened',
    target_species: ['Markhor', 'Musk Deer', 'Leopard'],
    length_km: 25,
    ecological_importance: 'Essential sanctuary connectivity within the Jhelum Valley rim forests.',
    primary_threats: ['Border Fencing', 'Logging']
  },
  {
    id: 'cor-kc-6',
    name: 'Rajparian → Pir Panjal',
    type: 'Kashmir Core',
    districts_spanned: ['Anantnag', 'Kulgam'],
    status: 'Restoration Required',
    target_species: ['Himalayan Black Bear', 'Musk Deer', 'Himalayan Serow'],
    length_km: 40,
    ecological_importance: 'Southern valley broadleaf to conifer transition zone corridor.',
    primary_threats: ['Deforestation', 'Encroachment', 'Agriculture']
  },

  // Jammu Division
  {
    id: 'cor-jd-1',
    name: 'Kishtwar → Doda',
    type: 'Jammu Division',
    districts_spanned: ['Kishtwar', 'Doda'],
    status: 'Functional',
    target_species: ['Snow Leopard', 'Brown Bear', 'Himalayan Monal'],
    length_km: 55,
    ecological_importance: 'Deep gorge and high altitude connectivity in the Chenab basin.',
    primary_threats: ['Hydroelectric Projects', 'Road Construction']
  },
  {
    id: 'cor-jd-2',
    name: 'Kishtwar → Paddar',
    type: 'Jammu Division',
    districts_spanned: ['Kishtwar'],
    status: 'Functional',
    target_species: ['Snow Leopard', 'Himalayan Ibex'],
    length_km: 70,
    ecological_importance: 'Remote trans-Himalayan transition corridor bordering Zanskar.',
    primary_threats: ['Mining', 'Unregulated Tourism']
  },
  {
    id: 'cor-jd-3',
    name: 'Rajouri → Poonch',
    type: 'Jammu Division',
    districts_spanned: ['Rajouri', 'Poonch'],
    status: 'Threatened',
    target_species: ['Leopard', 'Western Tragopan', 'Himalayan Black Bear'],
    length_km: 45,
    ecological_importance: 'Lower to mid-elevation Pir Panjal connectivity.',
    primary_threats: ['Military Infrastructure', 'Forest Fires', 'Timber Extraction']
  },
  {
    id: 'cor-jd-4',
    name: 'Pir Panjal Chain',
    type: 'Jammu Division',
    districts_spanned: ['Poonch', 'Rajouri', 'Reasi', 'Ramban'],
    status: 'Severed',
    target_species: ['Leopard', 'Himalayan Serow', 'Koklass'],
    length_km: 120,
    ecological_importance: 'Massive longitudinal corridor running parallel to the Kashmir Valley.',
    primary_threats: ['Highway Expansions', 'Railway Projects', 'Urbanization']
  },

  // Transboundary
  {
    id: 'cor-tb-1',
    name: 'Gurez → Neelum Valley',
    type: 'Transboundary',
    districts_spanned: ['Bandipora', 'Neelum'],
    status: 'Severed',
    target_species: ['Musk Deer', 'Brown Bear', 'Markhor'],
    length_km: 60,
    ecological_importance: 'The Kishanganga/Neelum river valley corridor, a pristine but heavily militarized zone.',
    primary_threats: ['Line of Control Fencing', 'Military Operations']
  },
  {
    id: 'cor-tb-2',
    name: 'Kupwara → Neelum',
    type: 'Transboundary',
    districts_spanned: ['Kupwara', 'Neelum'],
    status: 'Severed',
    target_species: ['Markhor', 'Leopard', 'Himalayan Black Bear'],
    length_km: 50,
    ecological_importance: 'Dense conifer forest linkage across the LoC.',
    primary_threats: ['Fencing', 'Deforestation', 'Security Infrastructure']
  },
  {
    id: 'cor-tb-3',
    name: 'Pir Panjal → Haveli → Bagh',
    type: 'Transboundary',
    districts_spanned: ['Poonch', 'Haveli', 'Bagh'],
    status: 'Threatened',
    target_species: ['Leopard', 'Western Tragopan', 'Himalayan Serow'],
    length_km: 85,
    ecological_importance: 'Cross-border lower Pir Panjal ecological continuity.',
    primary_threats: ['LoC Fencing', 'Forest Fires', 'Overgrazing']
  },
  {
    id: 'cor-tb-4',
    name: 'Kargil → Astore',
    type: 'Transboundary',
    districts_spanned: ['Kargil', 'Astore'],
    status: 'Functional',
    target_species: ['Snow Leopard', 'Brown Bear', 'Markhor'],
    length_km: 110,
    ecological_importance: 'High-altitude Deosai plateau to Astore valley linkage.',
    primary_threats: ['Climate Change', 'Poaching']
  },
  {
    id: 'cor-tb-5',
    name: 'Ladakh → Baltistan',
    type: 'Transboundary',
    districts_spanned: ['Leh', 'Kargil', 'Skardu', 'Kharmang'],
    status: 'Functional',
    target_species: ['Snow Leopard', 'Himalayan Ibex', 'Golden Eagle'],
    length_km: 150,
    ecological_importance: 'Vast cold-desert ungulate migration routes along the Indus and Shyok valleys.',
    primary_threats: ['Military Infrastructure', 'Unregulated Tourism']
  },
  {
    id: 'cor-tb-6',
    name: 'Karakoram Ungulate Corridors',
    type: 'Transboundary',
    districts_spanned: ['Leh', 'Ghanche', 'Shigar', 'Hunza', 'Nagar'],
    status: 'Functional',
    target_species: ['Snow Leopard', 'Blue Sheep', 'Himalayan Ibex'],
    length_km: 250,
    ecological_importance: 'The highest altitude wildlife corridors on Earth, crucial for big cat genetics.',
    primary_threats: ['Climate Change', 'Glacial Retreat', 'Trophy Hunting (if unregulated)']
  }
];

export interface DistrictCorridorMetrics {
  District_ID: string;
  District_Name: string;
  Corridor_Count: number;
  Corridor_Length_km: number;
  Protected_Area_Linkage: string;
  Connectivity_Score: number;
  Fragmentation_Risk: string;
  Barrier_Count: number;
  Road_Impact: 'Low' | 'Medium' | 'High' | 'Severe';
  Settlement_Impact: 'Low' | 'Medium' | 'High' | 'Severe';
  Restoration_Priority: 'Low' | 'Medium' | 'High' | 'Critical';
  Target_Species: string[];
}

export const generateDistrictCorridorMetrics = (districts: string[]): DistrictCorridorMetrics[] => {
  return districts.map(district => {
    // Find all corridors involving this district
    const linkedCorridors = masterCorridors.filter(c => c.districts_spanned.includes(district));
    
    // Aggregate species
    const speciesSet = new Set<string>();
    linkedCorridors.forEach(c => c.target_species.forEach(s => speciesSet.add(s)));
    
    // Simple math for mock data if zero corridors, just to have baseline metrics
    const count = linkedCorridors.length;
    const isUrban = ['Srinagar', 'Jammu', 'Mirpur'].includes(district);
    const isBorder = ['Kupwara', 'Bandipora', 'Poonch', 'Kargil', 'Neelum'].includes(district);
    
    return {
      District_ID: `DIST-${district.substring(0, 3).toUpperCase()}`,
      District_Name: district,
      Corridor_Count: count,
      Corridor_Length_km: linkedCorridors.reduce((acc, curr) => acc + curr.length_km, 0) / (count || 1), // Average or approx length within district
      Protected_Area_Linkage: count > 0 ? `Linked to ${count} PA networks` : 'Isolated',
      Connectivity_Score: count === 0 ? Math.floor(Math.random() * 20) + 10 : Math.floor(Math.random() * 30) + 60 + (count * 5),
      Fragmentation_Risk: isUrban ? 'Critical' : isBorder ? 'High' : 'Medium',
      Barrier_Count: count * 2 + (isBorder ? 5 : 0) + (isUrban ? 10 : 0),
      Road_Impact: isUrban ? 'Severe' : count > 1 ? 'High' : 'Medium',
      Settlement_Impact: isUrban ? 'Severe' : 'Medium',
      Restoration_Priority: isUrban ? 'Critical' : count > 0 && isBorder ? 'High' : 'Medium',
      Target_Species: Array.from(speciesSet)
    };
  });
};
