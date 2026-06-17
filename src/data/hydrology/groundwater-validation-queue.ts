/**
 * Kashmir EcoWatch — Groundwater Validation Queue
 * Registers groundwater records requiring geographic validation, water-level trend confirmation, or water balance audits.
 * Updated: 2026-06-16
 */

export interface GroundwaterValidationEntry {
  Groundwater_ID: string;
  Record_Name: string;
  Region: 'Kashmir Core' | 'Jammu' | 'Ladakh' | 'AJK' | 'Gilgit-Baltistan';
  District: string;
  Validation_Type: 'GPS' | 'Water Level' | 'Water Balance' | 'Dependency';
  Priority: 'Critical' | 'High' | 'Medium' | 'Low';
  Current_Status: string;
  Notes: string;
  Preferred_Source: string;
  Source_URL: string;
  Status: 'Pending' | 'In-Progress' | 'Resolved';
  CreatedAt: string;
}

export const groundwaterValidationQueue: GroundwaterValidationEntry[] = [
  // ─── GPS VALIDATION QUEUE ──────────────────────────────────────────────────
  {
    Groundwater_ID: "gw-kupwara-handpump-gps",
    Record_Name: "Kupwara Town Municipal Hand Pump",
    Region: "Kashmir Core",
    District: "Kupwara",
    Validation_Type: "GPS",
    Priority: "High",
    Current_Status: "Coordinates status: Missing",
    Notes: "High iron concern. Placed approximately at Kupwara town center. Field GPS measurement required to locate the specific public supply pump.",
    Preferred_Source: "Jal Shakti Department J&K",
    Source_URL: "https://jkjalshakti.nic.in/",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },
  {
    Groundwater_ID: "gw-chushul-colddesert-gps",
    Record_Name: "Chushul Valley Cold Desert Observation Station",
    Region: "Ladakh",
    District: "Leh",
    Validation_Type: "GPS",
    Priority: "High",
    Current_Status: "Coordinates status: Approximate village proxy",
    Notes: "Critical cold desert alluvial aquifer. Placed near village center. Needs ground coordinates of the CGWB observation tube well near Chushul wash.",
    Preferred_Source: "Central Ground Water Board (CGWB)",
    Source_URL: "http://cgwb.gov.in/",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },
  {
    Groundwater_ID: "gw-pattan-monitoring-gps",
    Record_Name: "Pattan Alluvial Monitoring Well",
    Region: "Kashmir Core",
    District: "Baramulla",
    Validation_Type: "GPS",
    Priority: "Medium",
    Current_Status: "Coordinates status: Data Pending",
    Notes: "CGWB shallow observation well. Needs verification of exact lat/long coordinates relative to NH1A road boundary.",
    Preferred_Source: "Central Ground Water Board (CGWB)",
    Source_URL: "http://cgwb.gov.in/",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },

  // ─── GROUNDWATER LEVEL VALIDATION QUEUE ────────────────────────────────────
  {
    Groundwater_ID: "gw-rs-pura-tubewell-level",
    Record_Name: "R.S. Pura Agricultural Tube Well",
    Region: "Jammu",
    District: "Jammu",
    Validation_Type: "Water Level",
    Priority: "Critical",
    Current_Status: "Water_Table_Depth_m: Source Required",
    Notes: "Heavy basmati rice irrigation zone. Water table trend reported as declining but precise pre-monsoon and post-monsoon water level depths are required.",
    Preferred_Source: "CGWB Jammu NAQUIM Report",
    Source_URL: "http://cgwb.gov.in/AQM/AQM-Reports.html",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },
  {
    Groundwater_ID: "gw-mirpur-alluvial-level",
    Record_Name: "Mirpur Reservoir Fringe Supply Well",
    Region: "AJK",
    District: "Mirpur",
    Validation_Type: "Water Level",
    Priority: "Medium",
    Current_Status: "Water_Table_Depth_m: Data Pending",
    Notes: "Located near Mangla Dam fringe aquifer. Requires seasonal water table monitoring data to establish hydrological connection with reservoir levels.",
    Preferred_Source: "PCRWR AJK Division",
    Source_URL: "http://pcrwr.gov.pk/",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },

  // ─── GROUNDWATER BALANCE VALIDATION QUEUE ──────────────────────────────────
  {
    Groundwater_ID: "gw-skardu-alluvial-balance",
    Record_Name: "Skardu Town Alluvial Fan Well",
    Region: "Gilgit-Baltistan",
    District: "Skardu",
    Validation_Type: "Water Balance",
    Priority: "High",
    Current_Status: "Recharge_Rate: Source Required | Extraction_Rate: Source Required",
    Notes: "Urban expansion in Skardu is increasing reliance on groundwater. Exact recharge rates from Indus moraine infiltration and extraction rates are not compiled.",
    Preferred_Source: "WAPDA Hydrogeology Division / PCRWR",
    Source_URL: "http://wapda.gov.pk/",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },
  {
    Groundwater_ID: "gw-kargil-suru-balance",
    Record_Name: "Suru Valley Moraine Aquifer Station",
    Region: "Ladakh",
    District: "Kargil",
    Validation_Type: "Water Balance",
    Priority: "Medium",
    Current_Status: "Recharge_Rate: Data Pending",
    Notes: "Needs recharge calculation under climate change scenarios (faster glacial retreat and changing meltwater runoff patterns).",
    Preferred_Source: "GB Pant National Institute of Himalayan Environment",
    Source_URL: "https://gbpihed.gov.in/",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },

  // ─── GROUNDWATER DEPENDENCY VALIDATION QUEUE ───────────────────────────────
  {
    Groundwater_ID: "gw-sopore-monitoring-dependency",
    Record_Name: "Sopore Rural Drinking Water Tube Well",
    Region: "Kashmir Core",
    District: "Baramulla",
    Validation_Type: "Dependency",
    Priority: "High",
    Current_Status: "Population_Dependent: Source Required",
    Notes: "Supplies drinking water to several adjoining villages. Requires verification of the exact population and household count served by this scheme.",
    Preferred_Source: "Jal Shakti Department J&K PHE Inventory",
    Source_URL: "https://jkjalshakti.nic.in/",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  }
];
