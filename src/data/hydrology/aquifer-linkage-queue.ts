/**
 * Kashmir EcoWatch — Aquifer Linkage Queue
 * Registers groundwater records (wells, pumps, stations) that lack definitive aquifer geological mappings.
 * Updated: 2026-06-16
 */

export interface AquiferLinkageEntry {
  Groundwater_ID: string;
  Record_Name: string;
  Region: 'Kashmir Core' | 'Jammu' | 'Ladakh' | 'AJK' | 'Gilgit-Baltistan';
  District: string;
  Current_Aquifer_ID: string;
  Suggested_Aquifer_ID: string;
  Priority: 'High' | 'Medium' | 'Low';
  Notes: string;
  Status: 'Pending' | 'In-Progress' | 'Resolved';
  CreatedAt: string;
}

export const aquiferLinkageQueue: AquiferLinkageEntry[] = [
  {
    Groundwater_ID: "gw-kupwara-handpump-gps",
    Record_Name: "Kupwara Town Municipal Hand Pump",
    Region: "Kashmir Core",
    District: "Kupwara",
    Current_Aquifer_ID: "aquifer-unmapped",
    Suggested_Aquifer_ID: "jhelum-alluvial-aquifer",
    Priority: "High",
    Notes: "Shallow hand pump tapping local clayey alluvium. Needs validation to check if it draws from the deeper Jhelum Valley plain alluvial system or a localized perched aquifer.",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },
  {
    Groundwater_ID: "gw-doda-bhaderwah-pump",
    Record_Name: "Bhaderwah Town Public Hand Pump",
    Region: "Jammu",
    District: "Doda",
    Current_Aquifer_ID: "aquifer-unmapped",
    Suggested_Aquifer_ID: "fractured-rock-siwalik-aquifer",
    Priority: "Medium",
    Notes: "Taps a shallow fractured metamorphic rock system. Aquifer boundary and lithological connection are not yet verified by GSI or CGWB.",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },
  {
    Groundwater_ID: "gw-leh-nubra-well-1",
    Record_Name: "Nubra Valley Alluvial Tube Well",
    Region: "Ladakh",
    District: "Leh",
    Current_Aquifer_ID: "aquifer-unmapped",
    Suggested_Aquifer_ID: "shyok-valley-alluvial-aquifer",
    Priority: "High",
    Notes: "Drilled into Shyok riverbed terrace. Needs to be formally mapped under the Shyok Valley alluvial aquifer package.",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  },
  {
    Groundwater_ID: "gw-kotli-supply-well",
    Record_Name: "Kotli Town PHE Tube Well",
    Region: "AJK",
    District: "Kotli",
    Current_Aquifer_ID: "aquifer-unmapped",
    Suggested_Aquifer_ID: "fractured-rock-metamorphic-aquifer",
    Priority: "Medium",
    Notes: "Taps fractured limestone and sandstone formations of the Murree Group. Awaiting PCRWR lithological column validation.",
    Status: "Pending",
    CreatedAt: "2026-06-16T00:00:00Z"
  }
];
