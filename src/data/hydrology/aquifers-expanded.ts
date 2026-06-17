/**
 * Kashmir EcoWatch — Aquifer Systems Database
 * Defines the hydrogeological boundary structures, lithological composition, and storage capacity of major regional aquifers.
 * Updated: 2026-06-16
 */

export interface AquiferRecord {
  Aquifer_ID: string;
  Aquifer_Name: string;
  Alternative_Names: string[];
  Aquifer_Type: 'Valley-fill Alluvial' | 'Karewa Lacustrine' | 'Karst Limestone' | 'Fractured Rock' | 'Cold Desert Alluvial';
  Geological_Formation: string;
  Lithology: string;
  Region: 'Kashmir Core' | 'Jammu' | 'Ladakh' | 'AJK' | 'Gilgit-Baltistan';
  Ecological_Scope: 'Kashmir Core' | 'Trans-Divisional' | 'Transboundary / Extended';
  Area_km2: number | 'Source Required' | 'Data Pending';
  Thickness_m: number | 'Source Required' | 'Data Pending';
  Estimated_Storage_MCM: number | 'Source Required' | 'Data Pending';
  Water_Level_Trend: 'Stable' | 'Declining' | 'Critical Decline' | 'Rising' | 'Data Pending';
  Water_Quality_Status: 'Excellent' | 'Good' | 'Moderate' | 'Poor' | 'Critical';
  Managing_Agency: string;
  Source_ID: string;
  Source_URL: string;
  Dashboard_Locked: boolean;
  Notes: string;
}

export const aquifersExpandedRecords: AquiferRecord[] = [
  {
    Aquifer_ID: "karewa-aquifer-system",
    Aquifer_Name: "Karewa Aquifer System",
    Alternative_Names: ["Karewa Lacustrine Aquifer", "Karewa Plateau Aquifer System"],
    Aquifer_Type: "Karewa Lacustrine",
    Geological_Formation: "Karewa Group (Plio-Pleistocene)",
    Lithology: "Silt, sand, clay, and gravel beds with lignite lenses",
    Region: "Kashmir Core",
    Ecological_Scope: "Kashmir Core",
    Area_km2: 3200,
    Thickness_m: 350,
    Estimated_Storage_MCM: 4500,
    Water_Level_Trend: "Declining",
    Water_Quality_Status: "Moderate",
    Managing_Agency: "Central Ground Water Board (CGWB) & Jal Shakti J&K",
    Source_ID: "SRC-GOV-CGWB",
    Source_URL: "http://cgwb.gov.in/AQM/AQM-Reports.html",
    Dashboard_Locked: false,
    Notes: "The primary aquifer for the semi-urban plateaus (Udhampur/Budgam/Anantnag Karewas). Heavily extracted via tube wells; recharge is highly vulnerable to clay capping and urbanization."
  },
  {
    Aquifer_ID: "jhelum-alluvial-aquifer",
    Aquifer_Name: "Jhelum Valley Alluvial Aquifer System",
    Alternative_Names: ["Jhelum Valley Fill Aquifer", "Kashmir Valley Plain Alluvial System"],
    Aquifer_Type: "Valley-fill Alluvial",
    Geological_Formation: "Alluvial Plain deposits (Quaternary)",
    Lithology: "Unconsolidated sand, gravel, clay, and river pebbles",
    Region: "Kashmir Core",
    Ecological_Scope: "Kashmir Core",
    Area_km2: 2500,
    Thickness_m: 120,
    Estimated_Storage_MCM: 3200,
    Water_Level_Trend: "Stable",
    Water_Quality_Status: "Moderate",
    Managing_Agency: "Central Ground Water Board (CGWB) & Public Health Engineering",
    Source_ID: "SRC-GOV-CGWB",
    Source_URL: "http://cgwb.gov.in/AQM/AQM-Reports.html",
    Dashboard_Locked: false,
    Notes: "Shallow aquifer system flanking the Jhelum river main stem. Highly productive, but sensitive to sewage infiltration and fertilizer runoff from paddy cultivation."
  },
  {
    Aquifer_ID: "pir-panjal-karst-aquifer",
    Aquifer_Name: "Pir Panjal Karst Aquifer System",
    Alternative_Names: ["Brengi-Lidder Karst System", "Triassic Karst Aquifer System"],
    Aquifer_Type: "Karst Limestone",
    Geological_Formation: "Triassic Limestone (Panjal Volcanics overlay)",
    Lithology: "Fissured, cavernous and massive Triassic limestone",
    Region: "Kashmir Core",
    Ecological_Scope: "Trans-Divisional",
    Area_km2: 1200,
    Thickness_m: 800,
    Estimated_Storage_MCM: 1800,
    Water_Level_Trend: "Stable",
    Water_Quality_Status: "Excellent",
    Managing_Agency: "Central Ground Water Board (CGWB) & J&K DEERS",
    Source_ID: "SRC-GOV-CGWB",
    Source_URL: "http://cgwb.gov.in/AQM/AQM-Reports.html",
    Dashboard_Locked: false,
    Notes: "Highly cavernous karst aquifer system. Sourced by high-discharge springs like Kokernag, Achabal, and Verinag. Crucial for regional surface stream sustenance."
  },
  {
    Aquifer_ID: "jammu-kandi-gravel-aquifer",
    Aquifer_Name: "Jammu Kandi Gravelly Aquifer System",
    Alternative_Names: ["Jammu Kandi Belt Aquifer"],
    Aquifer_Type: "Valley-fill Alluvial",
    Geological_Formation: "Upper Siwaliks (Boulder Bed & Gravels)",
    Lithology: "Boulders, cobbles, pebbles embedded in sandy-clay matrix",
    Region: "Jammu",
    Ecological_Scope: "Trans-Divisional",
    Area_km2: 1800,
    Thickness_m: 250,
    Estimated_Storage_MCM: 1500,
    Water_Level_Trend: "Declining",
    Water_Quality_Status: "Good",
    Managing_Agency: "Central Ground Water Board (CGWB)",
    Source_ID: "SRC-GOV-CGWB",
    Source_URL: "http://cgwb.gov.in/AQM/AQM-Reports.html",
    Dashboard_Locked: false,
    Notes: "High-permeability, deep water table zone flanking the outer plains. Highly productive but difficult to drill; acts as the primary transmission corridor for plains recharge."
  },
  {
    Aquifer_ID: "outer-plains-alluvial-aquifer",
    Aquifer_Name: "Jammu Outer Plains Alluvial Aquifer",
    Alternative_Names: ["Jammu-Samba Alluvial Aquifer System"],
    Aquifer_Type: "Valley-fill Alluvial",
    Geological_Formation: "Alluvial Indo-Gangetic margin deposits (Quaternary)",
    Lithology: "Interbedded sands, clays, and gravelly beds",
    Region: "Jammu",
    Ecological_Scope: "Trans-Divisional",
    Area_km2: 2200,
    Thickness_m: 300,
    Estimated_Storage_MCM: 5800,
    Water_Level_Trend: "Declining",
    Water_Quality_Status: "Moderate",
    Managing_Agency: "Central Ground Water Board (CGWB)",
    Source_ID: "SRC-GOV-CGWB",
    Source_URL: "http://cgwb.gov.in/AQM/AQM-Reports.html",
    Dashboard_Locked: false,
    Notes: "Highly exploited aquifer system for irrigation and domestic use in Kathua, Samba, and Jammu districts. Localized arsenic and heavy metal risks."
  },
  {
    Aquifer_ID: "indus-valley-alluvial-aquifer",
    Aquifer_Name: "Indus Valley Alluvial Cold-Desert Aquifer",
    Alternative_Names: ["Leh Alluvial Aquifer System"],
    Aquifer_Type: "Cold Desert Alluvial",
    Geological_Formation: "River Terrace and Morainic Deposits",
    Lithology: "Glacio-fluvial gravels, cobbles, and coarse sands",
    Region: "Ladakh",
    Ecological_Scope: "Trans-Divisional",
    Area_km2: 850,
    Thickness_m: 80,
    Estimated_Storage_MCM: 620,
    Water_Level_Trend: "Stable",
    Water_Quality_Status: "Excellent",
    Managing_Agency: "Public Health Engineering Department Ladakh",
    Source_ID: "SRC-GOV-CGWB",
    Source_URL: "http://cgwb.gov.in/AQM/AQM-Reports.html",
    Dashboard_Locked: false,
    Notes: "Critical shallow aquifer system supporting Leh town and agricultural villages. Recharge is entirely dependent on seasonal glacier and snowmelt streams."
  },
  {
    Aquifer_ID: "shyok-valley-fractured-aquifer",
    Aquifer_Name: "Shyok Valley Fractured Aquifer System",
    Alternative_Names: ["Karakoram Ophiolitic Aquifer"],
    Aquifer_Type: "Fractured Rock",
    Geological_Formation: "Karakoram Metamorphic Complex & Ophiolites",
    Lithology: "Fractured gneiss, schist, volcanic rocks, and marble",
    Region: "Ladakh",
    Ecological_Scope: "Trans-Divisional",
    Area_km2: 950,
    Thickness_m: 400,
    Estimated_Storage_MCM: 280,
    Water_Level_Trend: "Stable",
    Water_Quality_Status: "Good",
    Managing_Agency: "Public Health Engineering Department Ladakh",
    Source_ID: "SRC-GOV-CGWB",
    Source_URL: "http://cgwb.gov.in/AQM/AQM-Reports.html",
    Dashboard_Locked: false,
    Notes: "Groundwater resides in joints, fractures, and shear zones along the Shyok tectonic suture. Feeds local valley springs."
  },
  {
    Aquifer_ID: "muzaffarabad-carbonate-aquifer",
    Aquifer_Name: "Muzaffarabad Carbonate Aquifer",
    Alternative_Names: ["AJK Carbonate Karst System"],
    Aquifer_Type: "Karst Limestone",
    Geological_Formation: "Abbottabad Formation (Precambrian-Cambrian)",
    Lithology: "Dolomite, dolomitic limestone, and cherty limestone",
    Region: "AJK",
    Ecological_Scope: "Transboundary / Extended",
    Area_km2: 600,
    Thickness_m: 600,
    Estimated_Storage_MCM: 450,
    Water_Level_Trend: "Stable",
    Water_Quality_Status: "Good",
    Managing_Agency: "AJK Public Health Engineering Department",
    Source_ID: "SRC-PAK-PCRWR",
    Source_URL: "http://pcrwr.gov.pk/",
    Dashboard_Locked: false,
    Notes: "Cavernous and fractured carbonate system. Controls groundwater flow in the vicinity of the Muzaffarabad fault zone."
  },
  {
    Aquifer_ID: "neelum-valley-granite-aquifer",
    Aquifer_Name: "Neelum Valley Fractured Crystalline Aquifer",
    Alternative_Names: ["Neelum Metamorphic Fractured Aquifer System"],
    Aquifer_Type: "Fractured Rock",
    Geological_Formation: "Salkhala Formation & Granitic Intrusives",
    Lithology: "Fractured gneiss, schist, quartzite, and granitic rocks",
    Region: "AJK",
    Ecological_Scope: "Transboundary / Extended",
    Area_km2: 1400,
    Thickness_m: 500,
    Estimated_Storage_MCM: 380,
    Water_Level_Trend: "Stable",
    Water_Quality_Status: "Excellent",
    Managing_Agency: "AJK Public Health Engineering Department",
    Source_ID: "SRC-PAK-PCRWR",
    Source_URL: "http://pcrwr.gov.pk/",
    Dashboard_Locked: false,
    Notes: "Crystalline rock aquifer with flow confined to secondary fractures and joints. Sourced by high-gradient springs in Neelum Valley."
  },
  {
    Aquifer_ID: "gilgit-alluvial-fan-aquifer",
    Aquifer_Name: "Gilgit Alluvial Fan Aquifer System",
    Alternative_Names: ["Gilgit Valley Fill Aquifer System"],
    Aquifer_Type: "Valley-fill Alluvial",
    Geological_Formation: "Quaternary Alluvial Fan and Torrential Deposits",
    Lithology: "Unconsolidated gravel, sand, clay, and scree deposits",
    Region: "Gilgit-Baltistan",
    Ecological_Scope: "Transboundary / Extended",
    Area_km2: 400,
    Thickness_m: 100,
    Estimated_Storage_MCM: 210,
    Water_Level_Trend: "Stable",
    Water_Quality_Status: "Good",
    Managing_Agency: "GB Water and Power Department",
    Source_ID: "SRC-PAK-PCRWR",
    Source_URL: "http://pcrwr.gov.pk/",
    Dashboard_Locked: false,
    Notes: "Groundwater is stored in alluvial fan deposits adjacent to the Gilgit River. Important domestic source during freezing winter months."
  },
  {
    Aquifer_ID: "hunza-glacio-fluvial-aquifer",
    Aquifer_Name: "Hunza Glacio-Fluvial Aquifer System",
    Alternative_Names: ["Hunza Valley Alluvium"],
    Aquifer_Type: "Cold Desert Alluvial",
    Geological_Formation: "Glacio-fluvial terraces and moraines",
    Lithology: "Morainic clay-bound gravels, boulder beds, and silts",
    Region: "Gilgit-Baltistan",
    Ecological_Scope: "Transboundary / Extended",
    Area_km2: 300,
    Thickness_m: 75,
    Estimated_Storage_MCM: 145,
    Water_Level_Trend: "Stable",
    Water_Quality_Status: "Excellent",
    Managing_Agency: "GB Water and Power Department",
    Source_ID: "SRC-PAK-PCRWR",
    Source_URL: "http://pcrwr.gov.pk/",
    Dashboard_Locked: false,
    Notes: "Supports village settlements along Hunza valley river terraces. Aquifer recharge is primarily driven by glacier and snowmelt streams."
  }
];
