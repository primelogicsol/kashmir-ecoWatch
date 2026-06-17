/**
 * Kashmir EcoWatch — Groundwater Quality Validation Queue
 * Registers groundwater sources that have missing chemical or microbiological parameters in our database.
 * Updated: 2026-06-16
 */

export interface GroundwaterQualityEntry {
  Groundwater_ID: string;
  Record_Name: string;
  Region: 'Kashmir Core' | 'Jammu' | 'Ladakh' | 'AJK' | 'Gilgit-Baltistan';
  District: string;
  Parameters_Missing: ('pH' | 'TDS' | 'Electrical_Conductivity' | 'Nitrate' | 'Fluoride' | 'Arsenic' | 'Iron' | 'Manganese' | 'Hardness' | 'Fecal_Coliform' | 'Heavy_Metals')[];
  Priority: 'High' | 'Medium' | 'Low';
  Notes: string;
  Preferred_Source: string;
  Status: 'Pending' | 'In-Progress' | 'Resolved';
  CreatedAt: string;
}

export const groundwaterQualityQueue: GroundwaterQualityEntry[] = [
  {
    Groundwater_ID: "gw-chushul-colddesert-gps",
    Record_Name: "Chushul Valley Cold Desert Observation Station",
    Region: "Ladakh",
    District: "Leh",
    Parameters_Missing: ["Fluoride", "Arsenic", "Heavy_Metals"],
    Priority: "High",
    Notes: "Geothermal activity in nearby Puga valley suggests high potential for natural fluoride and arsenic concentrations. Complete heavy metals scan required.",
    Preferred_Source: "CGWB Ladakh Division / Leh Hill Council",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },
  {
    Groundwater_ID: "gw-bandipora-wular-well",
    Record_Name: "Bandipora Wular Shore Tube Well",
    Region: "Kashmir Core",
    District: "Bandipora",
    Parameters_Missing: ["Fecal_Coliform", "Nitrate"],
    Priority: "High",
    Notes: "Shallow water table adjacent to Wular Lake. High risk of fecal coliform seepage from rural septic layouts. Missing quantitative bacteriological data.",
    Preferred_Source: "J&K Pollution Control Committee (JKPCC)",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },
  {
    Groundwater_ID: "gw-doda-bhaderwah-pump",
    Record_Name: "Bhaderwah Town Public Hand Pump",
    Region: "Jammu",
    District: "Doda",
    Parameters_Missing: ["Heavy_Metals", "Hardness"],
    Priority: "Medium",
    Notes: "Taps local fractured metamorphic rock. Heavy metal presence (especially iron and manganese) needs formal quantification.",
    Preferred_Source: "Jal Shakti Department J&K",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },
  {
    Groundwater_ID: "gw-mirpur-alluvial-level",
    Record_Name: "Mirpur Reservoir Fringe Supply Well",
    Region: "AJK",
    District: "Mirpur",
    Parameters_Missing: ["TDS", "Nitrate", "Fluoride"],
    Priority: "Medium",
    Notes: "Located close to agricultural areas on Mangla reservoir fringe. High fertilizer run-off risk requires pesticide and nitrate parameter validation.",
    Preferred_Source: "PCRWR AJK Division",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  }
];
