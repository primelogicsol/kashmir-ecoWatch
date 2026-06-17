/**
 * Kashmir EcoWatch — Groundwater Ecosystem Linkage Queue
 * Registers groundwater records with pending or unverified connections to surface springs, wetlands, or groundwater-dependent ecosystems (GDEs).
 * Updated: 2026-06-16
 */

export interface GroundwaterEcosystemLinkageEntry {
  Groundwater_ID: string;
  Record_Name: string;
  Region: 'Kashmir Core' | 'Jammu' | 'Ladakh' | 'AJK' | 'Gilgit-Baltistan';
  District: string;
  Missing_Linkage_Type: ('Spring Linkage' | 'Wetland Linkage' | 'GDE Linkage')[];
  Priority: 'High' | 'Medium' | 'Low';
  Notes: string;
  Preferred_Source: string;
  Status: 'Pending' | 'In-Progress' | 'Resolved';
  CreatedAt: string;
}

export const groundwaterEcosystemLinkageQueue: GroundwaterEcosystemLinkageEntry[] = [
  {
    Groundwater_ID: "gw-leh-alluvial-well-1",
    Record_Name: "Leh Town PHE Deep Tube Well 1",
    Region: "Ladakh",
    District: "Leh",
    Missing_Linkage_Type: ["Wetland Linkage", "GDE Linkage"],
    Priority: "High",
    Notes: "Requires verification of hydrological connection to Shey marshes and downstream willow/poplar groves that act as groundwater-dependent ecosystems (GDEs).",
    Preferred_Source: "Ladakh University / GB Pant Institute",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },
  {
    Groundwater_ID: "gw-jammu-kandi-monitoring-1",
    Record_Name: "Jammu Kandi PHE Deep Tube Well 3",
    Region: "Jammu",
    District: "Jammu",
    Missing_Linkage_Type: ["Spring Linkage"],
    Priority: "High",
    Notes: "Kandi zone extraction has caused decline in surrounding low-discharge gravity bowlis (springs). Delineating the exact zone of influence is critical.",
    Preferred_Source: "CGWB & Forest Department J&K Springshed Studies",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },
  {
    Groundwater_ID: "gw-muzaffarabad-well-1",
    Record_Name: "Muzaffarabad PHE Municipal Tube Well",
    Region: "AJK",
    District: "Muzaffarabad",
    Missing_Linkage_Type: ["Spring Linkage"],
    Priority: "Medium",
    Notes: "AJK limestone well. Karst conduit flows suggest direct linkage with municipal drinking water springs. Needs isotopic tracer study to confirm.",
    Preferred_Source: "PCRWR / Peshawar University Geology Department",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },
  {
    Groundwater_ID: "gw-pulwama-industrial-monitoring",
    Record_Name: "Lassipora Industrial Area Deep Observation Well",
    Region: "Kashmir Core",
    District: "Pulwama",
    Missing_Linkage_Type: ["GDE Linkage", "Spring Linkage"],
    Priority: "High",
    Notes: "Industrial effluent infiltration threatens shallow Karewa springs downslope. Requires mapping of the hydraulic gradient to affected community spring networks.",
    Preferred_Source: "J&K Pollution Control Committee & JKEERS",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  }
];
