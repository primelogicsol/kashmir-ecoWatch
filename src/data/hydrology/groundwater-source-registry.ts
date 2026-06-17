/**
 * Kashmir EcoWatch — Groundwater & Aquifer Source Registry
 * Lists authoritative databases, research institutes, and reports used to validate groundwater records.
 * Updated: 2026-06-16
 */

export interface GroundwaterSource {
  Source_ID: string;
  Source_Name: string;
  Publisher: string;
  Publication_Year: number;
  Source_URL: string;
  Source_Type: 'Government-Database' | 'Research-Institution' | 'Peer-Reviewed-Publication' | 'Multilateral-Report';
  Confidence_Tier: 'High' | 'Medium' | 'Low';
  Notes: string;
}

export const groundwaterSourceRegistry: GroundwaterSource[] = [
  {
    Source_ID: "SRC-GOV-CGWB",
    Source_Name: "CGWB National Aquifer Mapping and Management Programme (NAQUIM) J&K Reports",
    Publisher: "Central Ground Water Board, Ministry of Jal Shakti, Government of India",
    Publication_Year: 2022,
    Source_URL: "http://cgwb.gov.in/AQM/AQM-Reports.html",
    Source_Type: "Government-Database",
    Confidence_Tier: "High",
    Notes: "Authoritative hydrogeological surveys, aquifer boundaries, lithology records, and tube well yields for J&K."
  },
  {
    Source_ID: "SRC-PAK-PCRWR",
    Source_Name: "PCRWR Water Quality and Groundwater Monitoring Reports in AJK and GB",
    Publisher: "Pakistan Council of Research in Water Resources, Ministry of Water Resources",
    Publication_Year: 2023,
    Source_URL: "http://pcrwr.gov.pk/",
    Source_Type: "Research-Institution",
    Confidence_Tier: "High",
    Notes: "Primary database for drinking-water wells, fluoride, arsenic, and microbiological contamination in AJK and GB."
  },
  {
    Source_ID: "SRC-GOV-JALSHAKTI",
    Source_Name: "Jal Shakti Department J&K Tube Well and Drinking Water Source Inventory",
    Publisher: "Jal Shakti Department, Government of Jammu & Kashmir",
    Publication_Year: 2024,
    Source_URL: "https://jkjalshakti.nic.in/",
    Source_Type: "Government-Database",
    Confidence_Tier: "High",
    Notes: "Provides pumping hours, yields, supply zones, and population dependencies for drinking-water tube wells."
  },
  {
    Source_ID: "SRC-GOV-JKPCC",
    Source_Name: "J&K Pollution Control Committee Water Quality Monitoring Database",
    Publisher: "Jammu & Kashmir Pollution Control Committee, Government of J&K",
    Publication_Year: 2024,
    Source_URL: "https://jkspcb.nic.in/",
    Source_Type: "Government-Database",
    Confidence_Tier: "High",
    Notes: "Provides chemical data including nitrate concentration, heavy metal screening, and fecal coliform indexes."
  },
  {
    Source_ID: "SRC-IND-ISRO",
    Source_Name: "ISRO Bhuvan Ground Water Prospects Mapping & Recharge Zone Studies",
    Publisher: "National Remote Sensing Centre (NRSC), ISRO",
    Publication_Year: 2021,
    Source_URL: "https://bhuvan.nrsc.gov.in/",
    Source_Type: "Government-Database",
    Confidence_Tier: "High",
    Notes: "GIS delineations of groundwater potential zones, run-off patterns, and artificial recharge sites."
  },
  {
    Source_ID: "SRC-UNI-KASHMIR",
    Source_Name: "Karewa Aquifer System Hydrogeological Characterization Study",
    Publisher: "Department of Earth Sciences, University of Kashmir",
    Publication_Year: 2020,
    Source_URL: "https://www.kashmiruniversity.net/",
    Source_Type: "Peer-Reviewed-Publication",
    Confidence_Tier: "Medium",
    Notes: "Academic research paper mapping Karewa aquifer lithology, hydraulic conductivity, and recharge vulnerability."
  },
  {
    Source_ID: "SRC-PAK-WAPDA",
    Source_Name: "WAPDA Hydrogeological Studies in Indus Basin and Tributaries",
    Publisher: "Water and Power Development Authority, Pakistan",
    Publication_Year: 2021,
    Source_URL: "http://wapda.gov.pk/",
    Source_Type: "Government-Database",
    Confidence_Tier: "High",
    Notes: "Provides basin-wide water balance spreadsheets, sediment loads, and alluvial aquifer characteristics for GB."
  }
];
