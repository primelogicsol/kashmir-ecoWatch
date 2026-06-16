/**
 * Kashmir EcoWatch — Expanded Watersheds & Hydrological Basins Database
 * Comprehensive database covering basins, sub-basins, catchments, and spring-sheds.
 * Updated: 2026-06-16
 */

export interface WatershedExpandedRecord {
  Watershed_ID: string;
  Watershed_Name: string;
  Alternative_Names: string[];
  Watershed_Level: 'Basin' | 'Sub-Basin' | 'Watershed' | 'Sub-Watershed' | 'Catchment' | 'Micro-Watershed';
  Basin: string;
  Sub_Basin: string;
  Parent_Watershed_ID: string;
  River_System: string;
  Main_River_or_Stream: string;
  Districts_Covered: string[];
  Region: 'Kashmir Core' | 'Jammu' | 'Ladakh' | 'AJK' | 'Gilgit-Baltistan';
  Ecological_Scope: 'Kashmir Core' | 'Trans-Divisional' | 'Transboundary / Extended';
  Country_Admin_Context: string;
  Boundary_Source: string;
  Boundary_File_Link: string;
  Centroid_Latitude: number | null | 'Source Required' | 'Data Pending';
  Centroid_Longitude: number | null | 'Source Required' | 'Data Pending';
  Area_km2: number | 'Source Required' | 'Data Pending';
  Perimeter_km: number | 'Source Required' | 'Data Pending';
  Elevation_Min_m: number | 'Source Required' | 'Data Pending';
  Elevation_Max_m: number | 'Source Required' | 'Data Pending';
  Elevation_Mean_m: number | 'Source Required' | 'Data Pending';
  Slope_Mean: number | 'Source Required' | 'Data Pending';
  Dominant_Landcover: string;
  Forest_Cover_Percent: number | 'Source Required' | 'Data Pending';
  Agriculture_Cover_Percent: number | 'Source Required' | 'Data Pending';
  Builtup_Cover_Percent: number | 'Source Required' | 'Data Pending';
  Wetland_Count: number | 'Source Required' | 'Data Pending';
  Lake_Count: number | 'Source Required' | 'Data Pending';
  Spring_Count: number | 'Source Required' | 'Data Pending';
  River_Length_km: number | 'Source Required' | 'Data Pending';
  Drainage_Density: number | 'Source Required' | 'Data Pending';
  Glacier_Contribution: 'High' | 'Medium' | 'Low' | 'None' | 'Data Pending';
  Snow_Cover_Contribution: 'High' | 'Medium' | 'Low' | 'None' | 'Data Pending';
  Rainfall_Contribution: 'High' | 'Medium' | 'Low' | 'None' | 'Data Pending';
  Groundwater_Recharge_Value: number | 'Source Required' | 'Data Pending';
  Soil_Erosion_Risk: 'Low' | 'Moderate' | 'High' | 'Critical' | 'Data Pending';
  Flood_Risk: 'Low' | 'Moderate' | 'High' | 'Critical' | 'Data Pending';
  Landslide_Risk: 'Low' | 'Moderate' | 'High' | 'Critical' | 'Data Pending';
  Drought_Risk: 'Low' | 'Moderate' | 'High' | 'Critical' | 'Data Pending';
  Pollution_Load_Risk: 'Low' | 'Moderate' | 'High' | 'Critical' | 'Data Pending';
  Sediment_Load_Risk: 'Low' | 'Moderate' | 'High' | 'Critical' | 'Data Pending';
  Encroachment_Risk: 'Low' | 'Moderate' | 'High' | 'Critical' | 'Data Pending';
  Climate_Vulnerability: 'Low' | 'Moderate' | 'High' | 'Critical' | 'Data Pending';
  Restoration_Priority: 'Low' | 'Moderate' | 'High' | 'Critical' | 'Data Pending';
  Protected_Area_Linkages: string[];
  Drinking_Water_Linkages: string[];
  Hydropower_Linkages: string[];
  Irrigation_Linkages: string[];
  Monitoring_Stations: string[];
  Source_ID: string;
  Source_URL: string;
  Source_Type: string;
  Confidence_Level: 'High' | 'Medium' | 'Low';
  Verification_Status: 'Verified' | 'Source Linked' | 'Pending Verification' | 'Conflict' | 'Source Required';
  Dashboard_Locked: boolean;
  Dashboard_Lock_Reason?: string;
  Last_Updated: string;
  Notes: string;
}

export const watershedsExpandedRecords: WatershedExpandedRecord[] = [
  {
    "Watershed_ID": "jhelum-basin",
    "Watershed_Name": "Jhelum Basin",
    "Alternative_Names": [
      "Jhelum River Basin",
      "Jhelum Catchment"
    ],
    "Watershed_Level": "Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Jhelum Sub-Basin",
    "Parent_Watershed_ID": "indus-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Jhelum River",
    "Districts_Covered": [
      "Anantnag",
      "Kulgam",
      "Shopian",
      "Pulwama",
      "Srinagar",
      "Budgam",
      "Baramulla",
      "Bandipora",
      "Ganderbal",
      "Kupwara"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "India-WRIS / Central Water Commission",
    "Boundary_File_Link": "/data/gis/boundaries/jhelum-basin.geojson",
    "Centroid_Latitude": 34.0833,
    "Centroid_Longitude": 74.8,
    "Area_km2": 15856,
    "Perimeter_km": 740,
    "Elevation_Min_m": 1575,
    "Elevation_Max_m": 5425,
    "Elevation_Mean_m": 2850,
    "Slope_Mean": 18.5,
    "Dominant_Landcover": "Agriculture & Forest",
    "Forest_Cover_Percent": 32.4,
    "Agriculture_Cover_Percent": 41.2,
    "Builtup_Cover_Percent": 6.8,
    "Wetland_Count": 18,
    "Lake_Count": 24,
    "Spring_Count": 142,
    "River_Length_km": 165,
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 450,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "High",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Dachigam National Park",
      "Gulmarg Wildlife Sanctuary",
      "Overa-Aru Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Srinagar Water Supply",
      "Anantnag Water Supply"
    ],
    "Hydropower_Linkages": [
      "Lower Jhelum HEP",
      "Uri-I HEP",
      "Uri-II HEP"
    ],
    "Irrigation_Linkages": [
      "Zaingeer Canal",
      "Martand Canal",
      "Dadi Canal"
    ],
    "Monitoring_Stations": [
      "Sangam Hydrological Station",
      "Ram Munshi Bagh Station",
      "Baramulla Station"
    ],
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Main drainage basin for the Kashmir Valley. Bounded by the Pir Panjal Range in the south and west, and the Greater Himalayas in the north and east."
  },
  {
    "Watershed_ID": "chenab-basin",
    "Watershed_Name": "Chenab Basin",
    "Alternative_Names": [
      "Chenab River Basin",
      "Chandra-Bhaga Basin"
    ],
    "Watershed_Level": "Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Sub-Basin",
    "Parent_Watershed_ID": "indus-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Chenab River",
    "Districts_Covered": [
      "Kishtwar",
      "Doda",
      "Ramban",
      "Reasi",
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "India-WRIS / Central Water Commission",
    "Boundary_File_Link": "/data/gis/boundaries/chenab-basin.geojson",
    "Centroid_Latitude": 33.25,
    "Centroid_Longitude": 75.5,
    "Area_km2": 26155,
    "Perimeter_km": 960,
    "Elevation_Min_m": 320,
    "Elevation_Max_m": 6478,
    "Elevation_Mean_m": 3250,
    "Slope_Mean": 24.5,
    "Dominant_Landcover": "Forest & Rugged Mountain",
    "Forest_Cover_Percent": 41.8,
    "Agriculture_Cover_Percent": 16.4,
    "Builtup_Cover_Percent": 3.1,
    "Wetland_Count": 4,
    "Lake_Count": 15,
    "Spring_Count": 160,
    "River_Length_km": 220,
    "Drainage_Density": 1.12,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 380,
    "Soil_Erosion_Risk": "Critical",
    "Flood_Risk": "High",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "Critical",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Kishtwar National Park"
    ],
    "Drinking_Water_Linkages": [
      "Doda Town Supply",
      "Ramban Supply"
    ],
    "Hydropower_Linkages": [
      "Salal HEP",
      "Baglihar HEP",
      "Dul Hasti HEP",
      "Pakal Dul HEP",
      "Kiru HEP"
    ],
    "Irrigation_Linkages": [
      "Ranbir Canal",
      "Pratap Canal"
    ],
    "Monitoring_Stations": [
      "Akhnoor Gauge Station",
      "Ramban Bridge Station",
      "Kishtwar Gauge Post"
    ],
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A rugged Himalayan basin with massive run-of-the-river hydropower potential. Chenab is formed by the confluence of Chandra and Bhaga rivers."
  },
  {
    "Watershed_ID": "ravi-basin",
    "Watershed_Name": "Ravi Basin",
    "Alternative_Names": [
      "Ravi Catchment J&K Side",
      "Thein Catchment"
    ],
    "Watershed_Level": "Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ravi Sub-Basin",
    "Parent_Watershed_ID": "indus-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Ravi River",
    "Districts_Covered": [
      "Kathua"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "India-WRIS / CWC",
    "Boundary_File_Link": "/data/gis/boundaries/ravi-basin.geojson",
    "Centroid_Latitude": 32.55,
    "Centroid_Longitude": 75.75,
    "Area_km2": 5200,
    "Perimeter_km": 340,
    "Elevation_Min_m": 310,
    "Elevation_Max_m": 4800,
    "Elevation_Mean_m": 1850,
    "Slope_Mean": 18.2,
    "Dominant_Landcover": "Forest & Agriculture",
    "Forest_Cover_Percent": 39.5,
    "Agriculture_Cover_Percent": 38.2,
    "Builtup_Cover_Percent": 4.2,
    "Wetland_Count": 1,
    "Lake_Count": 3,
    "Spring_Count": 42,
    "River_Length_km": 72,
    "Drainage_Density": 0.94,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 310,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "Moderate",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "Ranjit Sagar Conservation Reserve"
    ],
    "Drinking_Water_Linkages": [
      "Kathua Town Supply"
    ],
    "Hydropower_Linkages": [
      "Ranjit Sagar Dam HEP (600 MW)"
    ],
    "Irrigation_Linkages": [
      "Ravi Canal J&K Scheme"
    ],
    "Monitoring_Stations": [
      "Thein Dam Outflow Station",
      "Basohli Gauge Post"
    ],
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Ravi River forms the boundary between J&K (Kathua) and Punjab. Features the massive Ranjit Sagar reservoir."
  },
  {
    "Watershed_ID": "indus-basin",
    "Watershed_Name": "Indus Basin (Ladakh)",
    "Alternative_Names": [
      "Sengge Zangbo Basin",
      "Upper Indus Basin"
    ],
    "Watershed_Level": "Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus Sub-Basin",
    "Parent_Watershed_ID": "None",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Indus River",
    "Districts_Covered": [
      "Leh",
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (Ladakh)",
    "Boundary_Source": "India-WRIS / CWC",
    "Boundary_File_Link": "/data/gis/boundaries/indus-basin.geojson",
    "Centroid_Latitude": 34.5,
    "Centroid_Longitude": 77.5,
    "Area_km2": 321289,
    "Perimeter_km": 2150,
    "Elevation_Min_m": 2500,
    "Elevation_Max_m": 8611,
    "Elevation_Mean_m": 4500,
    "Slope_Mean": 22.1,
    "Dominant_Landcover": "Barren Cold Desert & Glacier",
    "Forest_Cover_Percent": 1.1,
    "Agriculture_Cover_Percent": 2.4,
    "Builtup_Cover_Percent": 0.8,
    "Wetland_Count": 12,
    "Lake_Count": 35,
    "Spring_Count": 74,
    "River_Length_km": 320,
    "Drainage_Density": 0.88,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 120,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Moderate",
    "Landslide_Risk": "High",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Critical",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "Hemis National Park",
      "Changthang Cold Desert Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Leh Town Drinking Scheme",
      "Kargil Drinking Supply"
    ],
    "Hydropower_Linkages": [
      "Chutak HEP",
      "Nimo Bazgo HEP"
    ],
    "Irrigation_Linkages": [
      "Ladakh Desert Oasis canals"
    ],
    "Monitoring_Stations": [
      "Leh Hydrological Station",
      "Khaltse Gauge Point",
      "Nimo Station"
    ],
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Massive high-altitude cold desert basin. Drained primarily by glacial meltwater. Highly prone to glacial lake expansion and GLOF incidents."
  },
  {
    "Watershed_ID": "upper-indus-gb-basin",
    "Watershed_Name": "Upper Indus GB Basin",
    "Alternative_Names": [
      "Indus River Basin Gilgit-Baltistan",
      "Indus GB Catchment"
    ],
    "Watershed_Level": "Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus Sub-Basin",
    "Parent_Watershed_ID": "indus-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Indus River",
    "Districts_Covered": [
      "Skardu",
      "Gilgit",
      "Diamer",
      "Astore",
      "Shigar",
      "Kharmang",
      "Ghanche"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Gilgit-Baltistan)",
    "Boundary_Source": "WAPDA Pakistan / ICIMOD HKH",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.3,
    "Centroid_Longitude": 75.5,
    "Area_km2": 72400,
    "Perimeter_km": 1850,
    "Elevation_Min_m": 950,
    "Elevation_Max_m": 8611,
    "Elevation_Mean_m": 4100,
    "Slope_Mean": 28.5,
    "Dominant_Landcover": "Glacier & Rock Desert",
    "Forest_Cover_Percent": 2.4,
    "Agriculture_Cover_Percent": 3.1,
    "Builtup_Cover_Percent": 0.9,
    "Wetland_Count": 6,
    "Lake_Count": 42,
    "Spring_Count": 92,
    "River_Length_km": 280,
    "Drainage_Density": 0.82,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 110,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Critical",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "Central Karakoram National Park",
      "Deosai National Park"
    ],
    "Drinking_Water_Linkages": [
      "Skardu Water supply",
      "Gilgit Water scheme"
    ],
    "Hydropower_Linkages": [
      "Diamer-Bhasha Dam (Under Construction - 4500 MW)",
      "Bunji HEP (Proposed 7100 MW)"
    ],
    "Irrigation_Linkages": [
      "Mountain oasis terrace systems"
    ],
    "Monitoring_Stations": [
      "Partab Bridge Hydrological Station",
      "Bunji Gauge Point"
    ],
    "Source_ID": "SRC-PAK-WAPDA",
    "Source_URL": "http://wapda.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A critically glaciated basin, containing some of the largest glaciers outside the polar regions (Baltoro, Biafo). Heavy GLOF and mudslide vulnerabilities."
  },
  {
    "Watershed_ID": "lidder-sub-basin",
    "Watershed_Name": "Lidder Sub-Basin",
    "Alternative_Names": [
      "Lidder Catchment",
      "Lidder Valley Watershed"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Jhelum Sub-Basin",
    "Parent_Watershed_ID": "jhelum-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Lidder River",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "University of Kashmir GIS Delineation",
    "Boundary_File_Link": "/data/gis/boundaries/lidder-sub-basin.geojson",
    "Centroid_Latitude": 33.95,
    "Centroid_Longitude": 75.15,
    "Area_km2": 1159,
    "Perimeter_km": 186,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 5425,
    "Elevation_Mean_m": 3400,
    "Slope_Mean": 24.2,
    "Dominant_Landcover": "Forest & Glacier",
    "Forest_Cover_Percent": 38.6,
    "Agriculture_Cover_Percent": 12.4,
    "Builtup_Cover_Percent": 2.1,
    "Wetland_Count": 1,
    "Lake_Count": 6,
    "Spring_Count": 22,
    "River_Length_km": 73,
    "Drainage_Density": 1.15,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Medium",
    "Groundwater_Recharge_Value": 320,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Moderate",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Overa-Aru Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Pahalgam Water Supply"
    ],
    "Hydropower_Linkages": [
      "Lidder Mini-HEP (Proposed)"
    ],
    "Irrigation_Linkages": [
      "Martand Canal",
      "Dadi Canal"
    ],
    "Monitoring_Stations": [
      "Batkoot Hydrometric Station",
      "Ganeshbal Gauge Station"
    ],
    "Source_ID": "SRC-KU-GEOG",
    "Source_URL": "https://kashmiruniversity.net/",
    "Source_Type": "Academic-Publication",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Glacier-fed sub-basin containing the Kolahoi and Sheshnag glaciers. Highly sensitive to climate change impacts on alpine ice cover."
  },
  {
    "Watershed_ID": "sind-sub-basin",
    "Watershed_Name": "Sind Sub-Basin",
    "Alternative_Names": [
      "Sind Valley Catchment",
      "Sindh Nallah Watershed"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Jhelum Sub-Basin",
    "Parent_Watershed_ID": "jhelum-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Sind River",
    "Districts_Covered": [
      "Ganderbal",
      "Srinagar"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "Department of Ecology, Environment and Remote Sensing",
    "Boundary_File_Link": "/data/gis/boundaries/sind-sub-basin.geojson",
    "Centroid_Latitude": 34.25,
    "Centroid_Longitude": 74.8,
    "Area_km2": 1683,
    "Perimeter_km": 210,
    "Elevation_Min_m": 1580,
    "Elevation_Max_m": 4800,
    "Elevation_Mean_m": 3100,
    "Slope_Mean": 22.8,
    "Dominant_Landcover": "Forest & Grassland",
    "Forest_Cover_Percent": 42.1,
    "Agriculture_Cover_Percent": 14.5,
    "Builtup_Cover_Percent": 3.4,
    "Wetland_Count": 2,
    "Lake_Count": 8,
    "Spring_Count": 35,
    "River_Length_km": 108,
    "Drainage_Density": 1.08,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Medium",
    "Groundwater_Recharge_Value": 380,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Thajwas Wildlife Sanctuary",
      "Baltal-Zojila Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Rangil Water Treatment Plant",
      "Alusteng Water Supply"
    ],
    "Hydropower_Linkages": [
      "Upper Sindh HEP Stage-II",
      "Ganderbal HEP"
    ],
    "Irrigation_Linkages": [
      "Sindh Canal"
    ],
    "Monitoring_Stations": [
      "Prang Gauge Station",
      "Sonamarg Hydrological Post"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Critical source of drinking water for Srinagar City via Rangil WTP. Contains major high-altitude tourist locations like Sonamarg."
  },
  {
    "Watershed_ID": "kishanganga-basin",
    "Watershed_Name": "Kishanganga Basin",
    "Alternative_Names": [
      "Neelum Valley Basin",
      "Kishanganga Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Jhelum Sub-Basin",
    "Parent_Watershed_ID": "jhelum-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Kishanganga River",
    "Districts_Covered": [
      "Bandipora",
      "Kupwara"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "CWC / J&K Forest Department",
    "Boundary_File_Link": "/data/gis/boundaries/kishanganga-basin.geojson",
    "Centroid_Latitude": 34.65,
    "Centroid_Longitude": 74.75,
    "Area_km2": 8500,
    "Perimeter_km": 410,
    "Elevation_Min_m": 1650,
    "Elevation_Max_m": 5100,
    "Elevation_Mean_m": 3200,
    "Slope_Mean": 28.6,
    "Dominant_Landcover": "Forest & Alpine Meadow",
    "Forest_Cover_Percent": 46.2,
    "Agriculture_Cover_Percent": 6.5,
    "Builtup_Cover_Percent": 1.8,
    "Wetland_Count": 2,
    "Lake_Count": 14,
    "Spring_Count": 88,
    "River_Length_km": 152,
    "Drainage_Density": 1.21,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Medium",
    "Groundwater_Recharge_Value": 340,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "Gurez Valley Biosphere Zone"
    ],
    "Drinking_Water_Linkages": [
      "Gurez Town Supply"
    ],
    "Hydropower_Linkages": [
      "Kishanganga Hydroelectric Project (330 MW)"
    ],
    "Irrigation_Linkages": [
      "Terrace Cultivation channels"
    ],
    "Monitoring_Stations": [
      "Gurez Gauge Post",
      "Malangam Intake Station"
    ],
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A major transboundary basin. In India, it is referred to as Kishanganga, and in Pakistan/AJK, it is known as the Neelum River."
  },
  {
    "Watershed_ID": "tawi-sub-basin",
    "Watershed_Name": "Tawi Sub-Basin",
    "Alternative_Names": [
      "Tawi Catchment",
      "Tawi River Watershed"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Sub-Basin",
    "Parent_Watershed_ID": "chenab-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Tawi River",
    "Districts_Covered": [
      "Udhampur",
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "Central Ground Water Board (CGWB) Report",
    "Boundary_File_Link": "/data/gis/boundaries/tawi-sub-basin.geojson",
    "Centroid_Latitude": 32.85,
    "Centroid_Longitude": 74.92,
    "Area_km2": 2168,
    "Perimeter_km": 242,
    "Elevation_Min_m": 300,
    "Elevation_Max_m": 4000,
    "Elevation_Mean_m": 1450,
    "Slope_Mean": 16.5,
    "Dominant_Landcover": "Forest & Agriculture",
    "Forest_Cover_Percent": 32.1,
    "Agriculture_Cover_Percent": 42.4,
    "Builtup_Cover_Percent": 12.8,
    "Wetland_Count": 2,
    "Lake_Count": 2,
    "Spring_Count": 41,
    "River_Length_km": 141,
    "Drainage_Density": 0.92,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 290,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Moderate",
    "Pollution_Load_Risk": "High",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Kailash Kund Area"
    ],
    "Drinking_Water_Linkages": [
      "Jammu City Drinking Water Scheme"
    ],
    "Hydropower_Linkages": [
      "Chenani HEP"
    ],
    "Irrigation_Linkages": [
      "Tawi Lift Canal"
    ],
    "Monitoring_Stations": [
      "Jammu Tawi Bridge Station",
      "Udhampur Gauge Post"
    ],
    "Source_ID": "SRC-GOV-CGWB",
    "Source_URL": "http://cgwb.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Known locally as the Surya Putri. Feeds the Jammu city drinking network. Suffers severe discharge reduction during summer and dry spells."
  },
  {
    "Watershed_ID": "marusudar-sub-basin",
    "Watershed_Name": "Marusudar Sub-Basin",
    "Alternative_Names": [
      "Marusudar River Watershed",
      "Marua Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Sub-Basin",
    "Parent_Watershed_ID": "chenab-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Marusudar River",
    "Districts_Covered": [
      "Kishtwar"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "National Hydroelectric Power Corporation (NHPC) GIS",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.65,
    "Centroid_Longitude": 75.8,
    "Area_km2": 4320,
    "Perimeter_km": 380,
    "Elevation_Min_m": 1100,
    "Elevation_Max_m": 6000,
    "Elevation_Mean_m": 3800,
    "Slope_Mean": 29.4,
    "Dominant_Landcover": "Glacier & Alpine Rock",
    "Forest_Cover_Percent": 22.8,
    "Agriculture_Cover_Percent": 4.1,
    "Builtup_Cover_Percent": 0.8,
    "Wetland_Count": 0,
    "Lake_Count": 8,
    "Spring_Count": 19,
    "River_Length_km": 133,
    "Drainage_Density": 1.18,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 180,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Critical",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "Kishtwar High Altitude National Park"
    ],
    "Drinking_Water_Linkages": [
      "Marwah/Dacchan Local Scheme"
    ],
    "Hydropower_Linkages": [
      "Pakal Dul HEP (1000 MW)",
      "Kiru HEP (624 MW)"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "Pakal Dul Dam Site Station"
    ],
    "Source_ID": "SRC-LEGACY-001",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "GIS boundary vector file requires validation against the actual NHPC project site blueprints.",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Largest tributary of the Chenab. Highly glacier-fed with steep canyons. Central to the construction of major run-of-the-river dams."
  },
  {
    "Watershed_ID": "ujh-sub-basin",
    "Watershed_Name": "Ujh Sub-Basin",
    "Alternative_Names": [
      "Ujh Catchment",
      "Ujh River Watershed"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ravi Sub-Bas-Tributary",
    "Parent_Watershed_ID": "ravi-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Ujh River",
    "Districts_Covered": [
      "Kathua",
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "CGWB / J&K Flood Control Department",
    "Boundary_File_Link": "/data/gis/boundaries/ujh-sub-basin.geojson",
    "Centroid_Latitude": 32.65,
    "Centroid_Longitude": 75.38,
    "Area_km2": 1215,
    "Perimeter_km": 172,
    "Elevation_Min_m": 320,
    "Elevation_Max_m": 4100,
    "Elevation_Mean_m": 1650,
    "Slope_Mean": 17.8,
    "Dominant_Landcover": "Forest & Scrub",
    "Forest_Cover_Percent": 36.4,
    "Agriculture_Cover_Percent": 35.8,
    "Builtup_Cover_Percent": 6.5,
    "Wetland_Count": 0,
    "Lake_Count": 1,
    "Spring_Count": 22,
    "River_Length_km": 65,
    "Drainage_Density": 0.98,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 240,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Moderate",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "Moderate",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Jasrota Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Samba District rural scheme"
    ],
    "Hydropower_Linkages": [
      "Ujh Multipurpose Project (Proposed 186 MW)"
    ],
    "Irrigation_Linkages": [
      "Ujh Canals"
    ],
    "Monitoring_Stations": [
      "Ujh Barrage Station"
    ],
    "Source_ID": "SRC-GOV-CGWB",
    "Source_URL": "http://cgwb.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Ujh River is a major tributary of the Ravi. Heavily rainfed. Subject to high-priority water diversion projects under the Indus Waters Treaty framework."
  },
  {
    "Watershed_ID": "zanskar-sub-basin",
    "Watershed_Name": "Zanskar Sub-Basin",
    "Alternative_Names": [
      "Zanskar River Basin",
      "Tsarp-Doda Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus Sub-Basin",
    "Parent_Watershed_ID": "indus-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Zanskar River",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (Ladakh)",
    "Boundary_Source": "ICIMOD / India-WRIS Delineation",
    "Boundary_File_Link": "/data/gis/boundaries/zanskar-sub-basin.geojson",
    "Centroid_Latitude": 33.6,
    "Centroid_Longitude": 76.9,
    "Area_km2": 12200,
    "Perimeter_km": 680,
    "Elevation_Min_m": 3150,
    "Elevation_Max_m": 6400,
    "Elevation_Mean_m": 4650,
    "Slope_Mean": 26.8,
    "Dominant_Landcover": "Glacier & Rock",
    "Forest_Cover_Percent": 0.1,
    "Agriculture_Cover_Percent": 1.2,
    "Builtup_Cover_Percent": 0.4,
    "Wetland_Count": 2,
    "Lake_Count": 8,
    "Spring_Count": 16,
    "River_Length_km": 140,
    "Drainage_Density": 0.94,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 90,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Moderate",
    "Landslide_Risk": "High",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "Pensi La Biosphere Zone"
    ],
    "Drinking_Water_Linkages": [
      "Padum Town Supply"
    ],
    "Hydropower_Linkages": [
      "Zanskar Mini-HEP"
    ],
    "Irrigation_Linkages": [
      "Padum Valley canals"
    ],
    "Monitoring_Stations": [
      "Padum Hydrometric Post",
      "Nimo Confluence Station"
    ],
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A glacier-fed sub-basin noted for extreme cold, glaciation, and winter ice formation. Famed for the Chadar Trek on the frozen river."
  },
  {
    "Watershed_ID": "shyok-sub-basin",
    "Watershed_Name": "Shyok Sub-Basin",
    "Alternative_Names": [
      "Shyok Catchment",
      "River of Death Watershed"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus Sub-Basin",
    "Parent_Watershed_ID": "indus-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Shyok River",
    "Districts_Covered": [
      "Leh"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (Ladakh)",
    "Boundary_Source": "CWC / ISRO Bhuvan mapping",
    "Boundary_File_Link": "/data/gis/boundaries/shyok-sub-basin.geojson",
    "Centroid_Latitude": 34.68,
    "Centroid_Longitude": 78.12,
    "Area_km2": 23600,
    "Perimeter_km": 980,
    "Elevation_Min_m": 2600,
    "Elevation_Max_m": 7816,
    "Elevation_Mean_m": 4900,
    "Slope_Mean": 24.8,
    "Dominant_Landcover": "Glacier & Scree",
    "Forest_Cover_Percent": 0.2,
    "Agriculture_Cover_Percent": 0.9,
    "Builtup_Cover_Percent": 0.3,
    "Wetland_Count": 4,
    "Lake_Count": 12,
    "Spring_Count": 18,
    "River_Length_km": 180,
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 80,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Critical",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "Karakoram Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Diskit Drinking Scheme"
    ],
    "Hydropower_Linkages": [
      "Shyok Mini-HEP"
    ],
    "Irrigation_Linkages": [
      "Diskit/Hunder Oasis farming"
    ],
    "Monitoring_Stations": [
      "Diskit Gauge Station",
      "Turtuk Hydrological Post"
    ],
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Originates at the Rimo Glacier. Known for glacial surge events (e.g. Chong Kumdan glacier dams) which create massive seasonal GLOF risks."
  },
  {
    "Watershed_ID": "suru-sub-basin",
    "Watershed_Name": "Suru Sub-Basin",
    "Alternative_Names": [
      "Suru Valley Catchment",
      "Suru Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus Sub-Basin",
    "Parent_Watershed_ID": "indus-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Suru River",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (Ladakh)",
    "Boundary_Source": "CWC / J&K Remote Sensing Centre",
    "Boundary_File_Link": "/data/gis/boundaries/suru-sub-basin.geojson",
    "Centroid_Latitude": 34.35,
    "Centroid_Longitude": 76.15,
    "Area_km2": 4350,
    "Perimeter_km": 320,
    "Elevation_Min_m": 2700,
    "Elevation_Max_m": 7135,
    "Elevation_Mean_m": 3950,
    "Slope_Mean": 25.1,
    "Dominant_Landcover": "Glacier & Rocky Slope",
    "Forest_Cover_Percent": 0.8,
    "Agriculture_Cover_Percent": 3.4,
    "Builtup_Cover_Percent": 1.5,
    "Wetland_Count": 1,
    "Lake_Count": 4,
    "Spring_Count": 24,
    "River_Length_km": 98,
    "Drainage_Density": 1.02,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Moderate",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Nun-Kun Glacial Reserve"
    ],
    "Drinking_Water_Linkages": [
      "Kargil Town Water Treatment Plant"
    ],
    "Hydropower_Linkages": [
      "Chutak HEP (44 MW)"
    ],
    "Irrigation_Linkages": [
      "Suru Valley irrigation kuls"
    ],
    "Monitoring_Stations": [
      "Kargil Gauge Station",
      "Trespone Hydrometer Post"
    ],
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Nun-Kun massif glaciers feed this catchment. Crucial drinking water source for the entire Kargil district capital."
  },
  {
    "Watershed_ID": "dras-sub-basin",
    "Watershed_Name": "Dras Sub-Basin",
    "Alternative_Names": [
      "Dras River Catchment",
      "Dras-Shingo Watershed"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus Sub-Bas-Tributary",
    "Parent_Watershed_ID": "indus-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Dras River",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (Ladakh)",
    "Boundary_Source": "India-WRIS / J&K Remote Sensing",
    "Boundary_File_Link": "/data/gis/boundaries/dras-sub-basin.geojson",
    "Centroid_Latitude": 34.42,
    "Centroid_Longitude": 75.85,
    "Area_km2": 3150,
    "Perimeter_km": 260,
    "Elevation_Min_m": 2680,
    "Elevation_Max_m": 5200,
    "Elevation_Mean_m": 3800,
    "Slope_Mean": 23.4,
    "Dominant_Landcover": "Scree & Cold Scrub",
    "Forest_Cover_Percent": 0.5,
    "Agriculture_Cover_Percent": 1.8,
    "Builtup_Cover_Percent": 1.2,
    "Wetland_Count": 1,
    "Lake_Count": 3,
    "Spring_Count": 14,
    "River_Length_km": 86,
    "Drainage_Density": 0.96,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 95,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Moderate",
    "Landslide_Risk": "High",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Zojila Mountain Pass Reserve"
    ],
    "Drinking_Water_Linkages": [
      "Dras Town Drinking Water supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Dras Valley local terraces"
    ],
    "Monitoring_Stations": [
      "Dras Town Hydrometeor Station"
    ],
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Encompasses Dras, the second-coldest inhabited place on Earth. Heavily fed by Machoi and other regional glaciers."
  },
  {
    "Watershed_ID": "nubra-sub-basin",
    "Watershed_Name": "Nubra Sub-Basin",
    "Alternative_Names": [
      "Nubra Valley Catchment",
      "Nubra Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus Sub-Basin",
    "Parent_Watershed_ID": "shyok-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Nubra River",
    "Districts_Covered": [
      "Leh"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (Ladakh)",
    "Boundary_Source": "India-WRIS / Siachen Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.15,
    "Centroid_Longitude": 77.25,
    "Area_km2": 5400,
    "Perimeter_km": 360,
    "Elevation_Min_m": 3000,
    "Elevation_Max_m": 7400,
    "Elevation_Mean_m": 5100,
    "Slope_Mean": 27.2,
    "Dominant_Landcover": "Siachen Glacier & Rock",
    "Forest_Cover_Percent": 0.1,
    "Agriculture_Cover_Percent": 0.8,
    "Builtup_Cover_Percent": 0.2,
    "Wetland_Count": 3,
    "Lake_Count": 6,
    "Spring_Count": 11,
    "River_Length_km": 80,
    "Drainage_Density": 0.88,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "None",
    "Groundwater_Recharge_Value": 110,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Critical",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "Siachen Glacial Zone Reserve"
    ],
    "Drinking_Water_Linkages": [
      "Nubra local villages supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Panamik and Tiger village canals"
    ],
    "Monitoring_Stations": [
      "Siachen Snout Gauge Post",
      "Panamik Gauge Station"
    ],
    "Source_ID": "SRC-LEGACY-001",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Watershed boundary is locked due to geopolitical sensitivity of the Siachen glacier zone; needs official survey maps clearance.",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Nubra River originates directly from the snout of the Siachen Glacier. A critical cryosphere intelligence unit."
  },
  {
    "Watershed_ID": "neelum-ajk-basin",
    "Watershed_Name": "Neelum AJK Basin",
    "Alternative_Names": [
      "Neelum Valley Catchment AJK",
      "Kishanganga Pakistan/AJK side"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Jhelum Sub-Basin",
    "Parent_Watershed_ID": "jhelum-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Neelum River (Kishanganga)",
    "Districts_Covered": [
      "Neelum",
      "Muzaffarabad"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (AJK)",
    "Boundary_Source": "PCRWR / WAPDA basin surveys",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.58,
    "Centroid_Longitude": 73.9,
    "Area_km2": 7400,
    "Perimeter_km": 360,
    "Elevation_Min_m": 720,
    "Elevation_Max_m": 4800,
    "Elevation_Mean_m": 2900,
    "Slope_Mean": 27.4,
    "Dominant_Landcover": "Temperate Forest & Alpine meadow",
    "Forest_Cover_Percent": 52.4,
    "Agriculture_Cover_Percent": 8.2,
    "Builtup_Cover_Percent": 2.1,
    "Wetland_Count": 1,
    "Lake_Count": 10,
    "Spring_Count": 76,
    "River_Length_km": 120,
    "Drainage_Density": 1.15,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 310,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "Salkhala Game Reserve"
    ],
    "Drinking_Water_Linkages": [
      "Athmuqam Water supply"
    ],
    "Hydropower_Linkages": [
      "Neelum-Jhelum Hydropower Project (969 MW)"
    ],
    "Irrigation_Linkages": [
      "Terraced farming canals"
    ],
    "Monitoring_Stations": [
      "Nauseri Dam site gauge",
      "Muzaffarabad confluence gauge"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Stretches along the Line of Control. Deeply forested valley. Neelum-Jhelum HEP diverts water via a tunnel to the Jhelum river."
  },
  {
    "Watershed_ID": "hunza-sub-basin",
    "Watershed_Name": "Hunza Sub-Basin",
    "Alternative_Names": [
      "Hunza River Watershed",
      "Hunza Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus Sub-Basin",
    "Parent_Watershed_ID": "upper-indus-gb-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Hunza River",
    "Districts_Covered": [
      "Hunza",
      "Nagar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Gilgit-Baltistan)",
    "Boundary_Source": "WAPDA Pakistan / ICIMOD",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36.3,
    "Centroid_Longitude": 74.6,
    "Area_km2": 13700,
    "Perimeter_km": 720,
    "Elevation_Min_m": 1400,
    "Elevation_Max_m": 7788,
    "Elevation_Mean_m": 4350,
    "Slope_Mean": 29.8,
    "Dominant_Landcover": "Glacier & Rock",
    "Forest_Cover_Percent": 1.5,
    "Agriculture_Cover_Percent": 2.1,
    "Builtup_Cover_Percent": 1.4,
    "Wetland_Count": 1,
    "Lake_Count": 6,
    "Spring_Count": 22,
    "River_Length_km": 110,
    "Drainage_Density": 0.92,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 75,
    "Soil_Erosion_Risk": "Critical",
    "Flood_Risk": "High",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Critical",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Khunjerab National Park"
    ],
    "Drinking_Water_Linkages": [
      "Aliabad Water scheme",
      "Karimabad drinking supply"
    ],
    "Hydropower_Linkages": [
      "Naltar HEP"
    ],
    "Irrigation_Linkages": [
      "Centuries-old Hunza channel system"
    ],
    "Monitoring_Stations": [
      "Dainyor Gauge Station",
      "Attabad Lake level monitor"
    ],
    "Source_ID": "SRC-PAK-WAPDA",
    "Source_URL": "http://wapda.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Drains the Karakoram range. Associated with massive landslide hazards, notably the 2010 landslide that created Attabad Lake."
  },
  {
    "Watershed_ID": "gilgit-sub-basin",
    "Watershed_Name": "Gilgit Sub-Basin",
    "Alternative_Names": [
      "Gilgit River Catchment",
      "Ghizer-Gilgit Watershed"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus Sub-Bas-Tributary",
    "Parent_Watershed_ID": "upper-indus-gb-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Gilgit River",
    "Districts_Covered": [
      "Gilgit",
      "Ghizer",
      "Gupis-Yasin"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Gilgit-Baltistan)",
    "Boundary_Source": "WAPDA Pakistan / GB EPA",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36.1,
    "Centroid_Longitude": 73.6,
    "Area_km2": 12100,
    "Perimeter_km": 640,
    "Elevation_Min_m": 1450,
    "Elevation_Max_m": 5800,
    "Elevation_Mean_m": 3950,
    "Slope_Mean": 26.4,
    "Dominant_Landcover": "Steep Rock & Glacier",
    "Forest_Cover_Percent": 3.2,
    "Agriculture_Cover_Percent": 4.8,
    "Builtup_Cover_Percent": 2.8,
    "Wetland_Count": 1,
    "Lake_Count": 12,
    "Spring_Count": 35,
    "River_Length_km": 150,
    "Drainage_Density": 1.01,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "High",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Shandur-Handrup National Park"
    ],
    "Drinking_Water_Linkages": [
      "Gilgit City Water scheme"
    ],
    "Hydropower_Linkages": [
      "Gilgit Hydel projects"
    ],
    "Irrigation_Linkages": [
      "Ghizer district agricultural channels"
    ],
    "Monitoring_Stations": [
      "Gilgit Bridge Gauge Post"
    ],
    "Source_ID": "SRC-PAK-WAPDA",
    "Source_URL": "http://wapda.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Flows from the Shandur Pass (the world's highest polo ground). Extremely glaciated tributaries like the Yasin and Ishkoman rivers feed it."
  },
  {
    "Watershed_ID": "shigar-sub-basin",
    "Watershed_Name": "Shigar Sub-Basin",
    "Alternative_Names": [
      "Shigar Valley Catchment",
      "Shigar Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus Sub-Basin",
    "Parent_Watershed_ID": "upper-indus-gb-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Shigar River",
    "Districts_Covered": [
      "Shigar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Gilgit-Baltistan)",
    "Boundary_Source": "WAPDA Pakistan / ICIMOD HKH",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.7,
    "Centroid_Longitude": 75.75,
    "Area_km2": 7380,
    "Perimeter_km": 410,
    "Elevation_Min_m": 2150,
    "Elevation_Max_m": 8611,
    "Elevation_Mean_m": 5200,
    "Slope_Mean": 29.5,
    "Dominant_Landcover": "Karakoram Glaciers & Rock",
    "Forest_Cover_Percent": 0.1,
    "Agriculture_Cover_Percent": 1.4,
    "Builtup_Cover_Percent": 0.6,
    "Wetland_Count": 0,
    "Lake_Count": 4,
    "Spring_Count": 15,
    "River_Length_km": 62,
    "Drainage_Density": 0.84,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "None",
    "Groundwater_Recharge_Value": 90,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Critical",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "Central Karakoram National Park"
    ],
    "Drinking_Water_Linkages": [
      "Shigar Oasis Town Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Shigar valley agricultural canals"
    ],
    "Monitoring_Stations": [
      "Shigar Bridge Gauge Station"
    ],
    "Source_ID": "SRC-PAK-WAPDA",
    "Source_URL": "http://wapda.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Drains the southern slopes of the Karakoram range, including K2 (8,611m). Fed by Baltoro and Biafo glaciers. Critical unit for global glacier melt studies."
  },
  {
    "Watershed_ID": "astore-sub-basin",
    "Watershed_Name": "Astore Sub-Basin",
    "Alternative_Names": [
      "Astore Catchment",
      "Astore River Watershed"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus Sub-Bas-Tributary",
    "Parent_Watershed_ID": "upper-indus-gb-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Astore River",
    "Districts_Covered": [
      "Astore"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Gilgit-Baltistan)",
    "Boundary_Source": "WAPDA Pakistan / GB Forestry Department",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.15,
    "Centroid_Longitude": 74.85,
    "Area_km2": 4180,
    "Perimeter_km": 310,
    "Elevation_Min_m": 1300,
    "Elevation_Max_m": 8126,
    "Elevation_Mean_m": 4200,
    "Slope_Mean": 27.8,
    "Dominant_Landcover": "Glacier & Forest/Meadow",
    "Forest_Cover_Percent": 12.8,
    "Agriculture_Cover_Percent": 3.2,
    "Builtup_Cover_Percent": 1.1,
    "Wetland_Count": 1,
    "Lake_Count": 9,
    "Spring_Count": 28,
    "River_Length_km": 84,
    "Drainage_Density": 0.96,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 130,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Nanga Parbat National Park Zone",
      "Deosai National Park"
    ],
    "Drinking_Water_Linkages": [
      "Astore Town Drinking Scheme"
    ],
    "Hydropower_Linkages": [
      "Astore Hydel Project"
    ],
    "Irrigation_Linkages": [
      "Terraced fields of Astore valley"
    ],
    "Monitoring_Stations": [
      "Astore Town Gauge Station"
    ],
    "Source_ID": "SRC-PAK-WAPDA",
    "Source_URL": "http://wapda.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Astore River drains the eastern slopes of Nanga Parbat (8,126m). Strongly glacier and snowfed. Features severe winter freezing."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-0",
    "Watershed_Name": "Arapath Watershed",
    "Alternative_Names": [
      "Arapath Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "lidder-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Arapath Stream",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.1,
    "Centroid_Longitude": 74.7,
    "Area_km2": 40,
    "Perimeter_km": 16,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 2400,
    "Elevation_Mean_m": 2000,
    "Slope_Mean": 12,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 10,
    "Builtup_Cover_Percent": 1,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 10,
    "Drainage_Density": 0.4,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 100,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-1",
    "Watershed_Name": "Bringi Watershed",
    "Alternative_Names": [
      "Bringi Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sind Sub-Basin",
    "Parent_Watershed_ID": "sind-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Bringi Stream",
    "Districts_Covered": [
      "Kulgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.12,
    "Centroid_Longitude": 74.72,
    "Area_km2": 45,
    "Perimeter_km": 18,
    "Elevation_Min_m": 1630,
    "Elevation_Max_m": 2440,
    "Elevation_Mean_m": 2035,
    "Slope_Mean": 12.4,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 13,
    "Builtup_Cover_Percent": 1.3,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 12,
    "Drainage_Density": 0.44,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 104,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-2",
    "Watershed_Name": "Sandran Watershed",
    "Alternative_Names": [
      "Sandran Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kishanganga Basin",
    "Parent_Watershed_ID": "kishanganga-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Sandran Stream",
    "Districts_Covered": [
      "Shopian"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.14,
    "Centroid_Longitude": 74.74,
    "Area_km2": 50,
    "Perimeter_km": 20,
    "Elevation_Min_m": 1660,
    "Elevation_Max_m": 2480,
    "Elevation_Mean_m": 2070,
    "Slope_Mean": 12.8,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 16,
    "Builtup_Cover_Percent": 1.6,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 14,
    "Drainage_Density": 0.48,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 108,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-3",
    "Watershed_Name": "Lidder East Watershed",
    "Alternative_Names": [
      "Lidder East Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "lidder-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Lidder East Stream",
    "Districts_Covered": [
      "Pulwama"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.16,
    "Centroid_Longitude": 74.76,
    "Area_km2": 55,
    "Perimeter_km": 22,
    "Elevation_Min_m": 1690,
    "Elevation_Max_m": 2520,
    "Elevation_Mean_m": 2105,
    "Slope_Mean": 13.2,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 19,
    "Builtup_Cover_Percent": 1.9,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 16,
    "Drainage_Density": 0.52,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 112,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-4",
    "Watershed_Name": "Lidder West Watershed",
    "Alternative_Names": [
      "Lidder West Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sind Sub-Basin",
    "Parent_Watershed_ID": "sind-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Lidder West Stream",
    "Districts_Covered": [
      "Srinagar"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.18,
    "Centroid_Longitude": 74.78,
    "Area_km2": 60,
    "Perimeter_km": 24,
    "Elevation_Min_m": 1720,
    "Elevation_Max_m": 2560,
    "Elevation_Mean_m": 2140,
    "Slope_Mean": 13.6,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 22,
    "Builtup_Cover_Percent": 2.2,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 18,
    "Drainage_Density": 0.56,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 116,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-5",
    "Watershed_Name": "Kolahoi Watershed",
    "Alternative_Names": [
      "Kolahoi Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kishanganga Basin",
    "Parent_Watershed_ID": "kishanganga-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Kolahoi Stream",
    "Districts_Covered": [
      "Budgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.2,
    "Centroid_Longitude": 74.8,
    "Area_km2": 65,
    "Perimeter_km": 26,
    "Elevation_Min_m": 1750,
    "Elevation_Max_m": 2600,
    "Elevation_Mean_m": 2175,
    "Slope_Mean": 14,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 25,
    "Builtup_Cover_Percent": 2.5,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 20,
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 120,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-6",
    "Watershed_Name": "Sheshnag Watershed",
    "Alternative_Names": [
      "Sheshnag Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "lidder-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Sheshnag Stream",
    "Districts_Covered": [
      "Baramulla"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.22,
    "Centroid_Longitude": 74.82,
    "Area_km2": 70,
    "Perimeter_km": 28,
    "Elevation_Min_m": 1780,
    "Elevation_Max_m": 2640,
    "Elevation_Mean_m": 2210,
    "Slope_Mean": 14.4,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 37,
    "Agriculture_Cover_Percent": 28,
    "Builtup_Cover_Percent": 2.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 22,
    "Drainage_Density": 0.64,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 124,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-7",
    "Watershed_Name": "Aru Valley Watershed",
    "Alternative_Names": [
      "Aru Valley Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sind Sub-Basin",
    "Parent_Watershed_ID": "sind-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Aru Valley Stream",
    "Districts_Covered": [
      "Bandipora"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.24,
    "Centroid_Longitude": 74.84,
    "Area_km2": 75,
    "Perimeter_km": 30,
    "Elevation_Min_m": 1810,
    "Elevation_Max_m": 2680,
    "Elevation_Mean_m": 2245,
    "Slope_Mean": 14.8,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 39,
    "Agriculture_Cover_Percent": 31,
    "Builtup_Cover_Percent": 3.1,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 24,
    "Drainage_Density": 0.68,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 128,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-8",
    "Watershed_Name": "Pahalgam Watershed",
    "Alternative_Names": [
      "Pahalgam Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kishanganga Basin",
    "Parent_Watershed_ID": "kishanganga-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Pahalgam Stream",
    "Districts_Covered": [
      "Ganderbal"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.26,
    "Centroid_Longitude": 74.86,
    "Area_km2": 80,
    "Perimeter_km": 32,
    "Elevation_Min_m": 1840,
    "Elevation_Max_m": 2720,
    "Elevation_Mean_m": 2280,
    "Slope_Mean": 15.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 41,
    "Agriculture_Cover_Percent": 34,
    "Builtup_Cover_Percent": 3.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 26,
    "Drainage_Density": 0.72,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 132,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-9",
    "Watershed_Name": "Verinag Watershed",
    "Alternative_Names": [
      "Verinag Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "lidder-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Verinag Stream",
    "Districts_Covered": [
      "Kupwara"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.28,
    "Centroid_Longitude": 74.88,
    "Area_km2": 85,
    "Perimeter_km": 34,
    "Elevation_Min_m": 1870,
    "Elevation_Max_m": 2760,
    "Elevation_Mean_m": 2315,
    "Slope_Mean": 15.6,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 43,
    "Agriculture_Cover_Percent": 37,
    "Builtup_Cover_Percent": 3.6999999999999997,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 28,
    "Drainage_Density": 0.76,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 136,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-10",
    "Watershed_Name": "Kokernag Watershed",
    "Alternative_Names": [
      "Kokernag Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sind Sub-Basin",
    "Parent_Watershed_ID": "sind-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.3,
    "Centroid_Longitude": 74.9,
    "Area_km2": 90,
    "Perimeter_km": 36,
    "Elevation_Min_m": 1900,
    "Elevation_Max_m": 2800,
    "Elevation_Mean_m": 2350,
    "Slope_Mean": 16,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 45,
    "Agriculture_Cover_Percent": 40,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-11",
    "Watershed_Name": "Achabal Watershed",
    "Alternative_Names": [
      "Achabal Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kishanganga Basin",
    "Parent_Watershed_ID": "kishanganga-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kulgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.32,
    "Centroid_Longitude": 74.92,
    "Area_km2": 95,
    "Perimeter_km": 38,
    "Elevation_Min_m": 1930,
    "Elevation_Max_m": 2840,
    "Elevation_Mean_m": 2385,
    "Slope_Mean": 16.4,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 47,
    "Agriculture_Cover_Percent": 43,
    "Builtup_Cover_Percent": 4.3,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.84,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 144,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-12",
    "Watershed_Name": "Chashma Shahi Watershed",
    "Alternative_Names": [
      "Chashma Shahi Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "lidder-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Shopian"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.34,
    "Centroid_Longitude": 74.94,
    "Area_km2": 100,
    "Perimeter_km": 40,
    "Elevation_Min_m": 1960,
    "Elevation_Max_m": 2880,
    "Elevation_Mean_m": 2420,
    "Slope_Mean": 16.8,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 49,
    "Agriculture_Cover_Percent": 46,
    "Builtup_Cover_Percent": 4.6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.88,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 148,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-13",
    "Watershed_Name": "Martand Watershed",
    "Alternative_Names": [
      "Martand Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sind Sub-Basin",
    "Parent_Watershed_ID": "sind-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Pulwama"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.36,
    "Centroid_Longitude": 74.96,
    "Area_km2": 105,
    "Perimeter_km": 42,
    "Elevation_Min_m": 1990,
    "Elevation_Max_m": 2920,
    "Elevation_Mean_m": 2455,
    "Slope_Mean": 17.2,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 51,
    "Agriculture_Cover_Percent": 49,
    "Builtup_Cover_Percent": 4.9,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.92,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 152,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-14",
    "Watershed_Name": "Vishow Upper Watershed",
    "Alternative_Names": [
      "Vishow Upper Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kishanganga Basin",
    "Parent_Watershed_ID": "kishanganga-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Srinagar"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.38,
    "Centroid_Longitude": 74.98,
    "Area_km2": 110,
    "Perimeter_km": 44,
    "Elevation_Min_m": 2020,
    "Elevation_Max_m": 2960,
    "Elevation_Mean_m": 2490,
    "Slope_Mean": 17.6,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 53,
    "Agriculture_Cover_Percent": 12,
    "Builtup_Cover_Percent": 5.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.96,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 156,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-15",
    "Watershed_Name": "Vishow Lower Watershed",
    "Alternative_Names": [
      "Vishow Lower Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "lidder-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Budgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.4,
    "Centroid_Longitude": 75,
    "Area_km2": 115,
    "Perimeter_km": 46,
    "Elevation_Min_m": 2050,
    "Elevation_Max_m": 3000,
    "Elevation_Mean_m": 2525,
    "Slope_Mean": 18,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 55,
    "Agriculture_Cover_Percent": 15,
    "Builtup_Cover_Percent": 5.5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.4,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 160,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-16",
    "Watershed_Name": "Aharbal Watershed",
    "Alternative_Names": [
      "Aharbal Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sind Sub-Basin",
    "Parent_Watershed_ID": "sind-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Baramulla"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.42,
    "Centroid_Longitude": 75.02,
    "Area_km2": 120,
    "Perimeter_km": 48,
    "Elevation_Min_m": 2080,
    "Elevation_Max_m": 3040,
    "Elevation_Mean_m": 2560,
    "Slope_Mean": 18.4,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 57,
    "Agriculture_Cover_Percent": 18,
    "Builtup_Cover_Percent": 5.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.44,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 164,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-17",
    "Watershed_Name": "Kausarnag Watershed",
    "Alternative_Names": [
      "Kausarnag Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kishanganga Basin",
    "Parent_Watershed_ID": "kishanganga-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Bandipora"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.44,
    "Centroid_Longitude": 75.04,
    "Area_km2": 125,
    "Perimeter_km": 50,
    "Elevation_Min_m": 2110,
    "Elevation_Max_m": 3080,
    "Elevation_Mean_m": 2595,
    "Slope_Mean": 18.8,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 59,
    "Agriculture_Cover_Percent": 21,
    "Builtup_Cover_Percent": 1.0999999999999996,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.48,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 168,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-18",
    "Watershed_Name": "Rambiara Upper Watershed",
    "Alternative_Names": [
      "Rambiara Upper Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "lidder-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ganderbal"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.46,
    "Centroid_Longitude": 75.06,
    "Area_km2": 130,
    "Perimeter_km": 52,
    "Elevation_Min_m": 2140,
    "Elevation_Max_m": 3120,
    "Elevation_Mean_m": 2630,
    "Slope_Mean": 19.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 26,
    "Agriculture_Cover_Percent": 24,
    "Builtup_Cover_Percent": 1.3999999999999995,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.52,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 172,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-19",
    "Watershed_Name": "Rambiara Lower Watershed",
    "Alternative_Names": [
      "Rambiara Lower Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sind Sub-Basin",
    "Parent_Watershed_ID": "sind-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kupwara"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.48,
    "Centroid_Longitude": 75.08,
    "Area_km2": 135,
    "Perimeter_km": 54,
    "Elevation_Min_m": 2170,
    "Elevation_Max_m": 3160,
    "Elevation_Mean_m": 2665,
    "Slope_Mean": 19.6,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 28,
    "Agriculture_Cover_Percent": 27,
    "Builtup_Cover_Percent": 1.7000000000000002,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.56,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 176,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "vishav-catchment",
    "Watershed_Name": "Vishav Catchment",
    "Alternative_Names": [
      "Veshaw Watershed",
      "Vishav Sub-Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Arapath Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-0",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Vishav River",
    "Districts_Covered": [
      "Kulgam",
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "KU Geography Department Delineation",
    "Boundary_File_Link": "/data/gis/boundaries/vishav-catchment.geojson",
    "Centroid_Latitude": 33.6,
    "Centroid_Longitude": 74.85,
    "Area_km2": 624,
    "Perimeter_km": 112,
    "Elevation_Min_m": 1590,
    "Elevation_Max_m": 4400,
    "Elevation_Mean_m": 2950,
    "Slope_Mean": 26.5,
    "Dominant_Landcover": "Forest & Grassland",
    "Forest_Cover_Percent": 35.2,
    "Agriculture_Cover_Percent": 28.1,
    "Builtup_Cover_Percent": 4.5,
    "Wetland_Count": 0,
    "Lake_Count": 1,
    "Spring_Count": 18,
    "River_Length_km": 54,
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 280,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Critical",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Aharbal Forest Area"
    ],
    "Drinking_Water_Linkages": [
      "Kulgam Town Water Supply"
    ],
    "Hydropower_Linkages": [
      "Aharbal HEP (Proposed)"
    ],
    "Irrigation_Linkages": [
      "Nandi Canal"
    ],
    "Monitoring_Stations": [
      "Kudwani Gauge Station",
      "Aharbal Station"
    ],
    "Source_ID": "SRC-KU-GEOG",
    "Source_URL": "https://kashmiruniversity.net/",
    "Source_Type": "Academic-Publication",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Vishav originates at Kausarnag Lake and plunges down as Aharbal Waterfall. Noted for extreme flash flood vulnerability in summer months."
  },
  {
    "Watershed_ID": "rambiara-catchment",
    "Watershed_Name": "Rambiara Catchment",
    "Alternative_Names": [
      "Rambiara Watershed",
      "Rambiara Basin"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Bringi Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-1",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Rambiara River",
    "Districts_Covered": [
      "Shopian",
      "Pulwama"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "KU Geography Department Delineation",
    "Boundary_File_Link": "/data/gis/boundaries/rambiara-catchment.geojson",
    "Centroid_Latitude": 33.68,
    "Centroid_Longitude": 74.72,
    "Area_km2": 665,
    "Perimeter_km": 124,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 4300,
    "Elevation_Mean_m": 2850,
    "Slope_Mean": 21.4,
    "Dominant_Landcover": "Forest & Orchard",
    "Forest_Cover_Percent": 31.8,
    "Agriculture_Cover_Percent": 32.5,
    "Builtup_Cover_Percent": 5.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 12,
    "River_Length_km": 58,
    "Drainage_Density": 0.98,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 240,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Critical",
    "Landslide_Risk": "High",
    "Drought_Risk": "Moderate",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Hirpora Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Shopian Water Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Shopian Apple Orchards Lift Irrigation"
    ],
    "Monitoring_Stations": [
      "Shopian Hydrological Post"
    ],
    "Source_ID": "SRC-KU-GEOG",
    "Source_URL": "https://kashmiruniversity.net/",
    "Source_Type": "Academic-Publication",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Flows through the Hirpora Wildlife Sanctuary (home of the Markhor). Significant land conversion to apple orchards has accelerated runoff."
  },
  {
    "Watershed_ID": "romushi-catchment",
    "Watershed_Name": "Romushi Catchment",
    "Alternative_Names": [
      "Romshi Watershed",
      "Romshi Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sandran Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-2",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Romushi River",
    "Districts_Covered": [
      "Pulwama",
      "Budgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "KU Geography Department Delineation",
    "Boundary_File_Link": "/data/gis/boundaries/romushi-catchment.geojson",
    "Centroid_Latitude": 33.78,
    "Centroid_Longitude": 74.78,
    "Area_km2": 542,
    "Perimeter_km": 106,
    "Elevation_Min_m": 1585,
    "Elevation_Max_m": 4100,
    "Elevation_Mean_m": 2700,
    "Slope_Mean": 19.8,
    "Dominant_Landcover": "Orchard & Karewas",
    "Forest_Cover_Percent": 26.5,
    "Agriculture_Cover_Percent": 44.8,
    "Builtup_Cover_Percent": 6.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 9,
    "River_Length_km": 51,
    "Drainage_Density": 0.94,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 220,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Moderate",
    "Pollution_Load_Risk": "High",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Karewa Conservations"
    ],
    "Drinking_Water_Linkages": [
      "Pulwama Lift Water Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Romshi Canal"
    ],
    "Monitoring_Stations": [
      "Pulwama Gauge Post"
    ],
    "Source_ID": "SRC-KU-GEOG",
    "Source_URL": "https://kashmiruniversity.net/",
    "Source_Type": "Academic-Publication",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Flows through soft Karewa clay mounds, making it highly prone to bank erosion and soil mining."
  },
  {
    "Watershed_ID": "doodhganga-catchment",
    "Watershed_Name": "Doodhganga Catchment",
    "Alternative_Names": [
      "Doodh Ganga Watershed",
      "Doodhganga Basin"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder East Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-3",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Doodhganga River",
    "Districts_Covered": [
      "Budgam",
      "Srinagar"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "Department of Ecology, Environment and Remote Sensing",
    "Boundary_File_Link": "/data/gis/boundaries/doodhganga-catchment.geojson",
    "Centroid_Latitude": 33.88,
    "Centroid_Longitude": 74.82,
    "Area_km2": 660,
    "Perimeter_km": 132,
    "Elevation_Min_m": 1580,
    "Elevation_Max_m": 4100,
    "Elevation_Mean_m": 2600,
    "Slope_Mean": 17.5,
    "Dominant_Landcover": "Agriculture & Forest",
    "Forest_Cover_Percent": 29.8,
    "Agriculture_Cover_Percent": 42.1,
    "Builtup_Cover_Percent": 12.5,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 11,
    "River_Length_km": 46,
    "Drainage_Density": 0.96,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 250,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Critical",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Critical",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "Critical",
    "Protected_Area_Linkages": [
      "Yusmarg Meadows"
    ],
    "Drinking_Water_Linkages": [
      "Kralpora Water Treatment Plant"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Kralpora Canals"
    ],
    "Monitoring_Stations": [
      "Kralpora Hydrometric Station",
      "Srinagar Outflow Station"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Critically degraded in downstream sections due to municipal sewage dump from Srinagar and Budgam towns. Subject to NGT corrective directives."
  },
  {
    "Watershed_ID": "pohru-catchment",
    "Watershed_Name": "Pohru Catchment",
    "Alternative_Names": [
      "Pohru River Watershed",
      "Pohru Basin"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder West Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-4",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Pohru River",
    "Districts_Covered": [
      "Kupwara",
      "Baramulla"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "Department of Ecology, Environment and Remote Sensing",
    "Boundary_File_Link": "/data/gis/boundaries/pohru-catchment.geojson",
    "Centroid_Latitude": 34.38,
    "Centroid_Longitude": 74.32,
    "Area_km2": 1877,
    "Perimeter_km": 260,
    "Elevation_Min_m": 1575,
    "Elevation_Max_m": 4200,
    "Elevation_Mean_m": 2450,
    "Slope_Mean": 16.4,
    "Dominant_Landcover": "Forest & Agriculture",
    "Forest_Cover_Percent": 41.5,
    "Agriculture_Cover_Percent": 38.6,
    "Builtup_Cover_Percent": 5.4,
    "Wetland_Count": 1,
    "Lake_Count": 2,
    "Spring_Count": 48,
    "River_Length_km": 84,
    "Drainage_Density": 1.12,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 410,
    "Soil_Erosion_Risk": "Critical",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "Critical",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Lachipora Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Handwara Water Supply",
      "Kupwara Water Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Lolab Valley Irrigation Channels"
    ],
    "Monitoring_Stations": [
      "Seer Gauge Station",
      "Handwara Station"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Largest sub-watershed in Kashmir Valley. Pohru carries the highest sediment load in the entire Jhelum basin, contributing heavily to Wular Lake siltation."
  },
  {
    "Watershed_ID": "dal-nigeen-catchment",
    "Watershed_Name": "Dal-Nigeen Catchment",
    "Alternative_Names": [
      "Dal Lake Basin",
      "Dal Lake Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kolahoi Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-5",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Telbal Nallah",
    "Districts_Covered": [
      "Srinagar",
      "Ganderbal"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "JK Lake Conservation and Management Authority (LCMA)",
    "Boundary_File_Link": "/data/gis/boundaries/dal-nigeen-catchment.geojson",
    "Centroid_Latitude": 34.115,
    "Centroid_Longitude": 74.829,
    "Area_km2": 312,
    "Perimeter_km": 98,
    "Elevation_Min_m": 1583,
    "Elevation_Max_m": 3900,
    "Elevation_Mean_m": 2100,
    "Slope_Mean": 14.8,
    "Dominant_Landcover": "Forest & Builtup",
    "Forest_Cover_Percent": 34.2,
    "Agriculture_Cover_Percent": 22.8,
    "Builtup_Cover_Percent": 24.1,
    "Wetland_Count": 4,
    "Lake_Count": 3,
    "Spring_Count": 16,
    "River_Length_km": 24,
    "Drainage_Density": 0.82,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 120,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Critical",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Critical",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "Critical",
    "Protected_Area_Linkages": [
      "Dachigam National Park"
    ],
    "Drinking_Water_Linkages": [
      "Pokhribal WTP",
      "Nishat WTP"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Floating Gardens of Dal Lake"
    ],
    "Monitoring_Stations": [
      "Telbal Gauging Station",
      "Nishat Gauge Point"
    ],
    "Source_ID": "SRC-GOV-LCMA",
    "Source_URL": "https://lcma.jk.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A highly urbanized lake catchment. Telbal Nallah feeds 80% of Dal Lake inflows, carrying agricultural runoff and forest sediment."
  },
  {
    "Watershed_ID": "wular-catchment",
    "Watershed_Name": "Wular Lake Catchment",
    "Alternative_Names": [
      "Wular Catchment",
      "Wular Wetland Basin"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sheshnag Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-6",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Jhelum River",
    "Districts_Covered": [
      "Bandipora",
      "Baramulla"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "Wular Conservation and Management Authority (WUCMA)",
    "Boundary_File_Link": "/data/gis/boundaries/wular-catchment.geojson",
    "Centroid_Latitude": 34.4167,
    "Centroid_Longitude": 74.6333,
    "Area_km2": 2890,
    "Perimeter_km": 290,
    "Elevation_Min_m": 1575,
    "Elevation_Max_m": 4600,
    "Elevation_Mean_m": 2300,
    "Slope_Mean": 15.6,
    "Dominant_Landcover": "Wetland & Forest",
    "Forest_Cover_Percent": 36.8,
    "Agriculture_Cover_Percent": 32.4,
    "Builtup_Cover_Percent": 5.8,
    "Wetland_Count": 6,
    "Lake_Count": 4,
    "Spring_Count": 52,
    "River_Length_km": 68,
    "Drainage_Density": 1.02,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 390,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Critical",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Critical",
    "Sediment_Load_Risk": "Critical",
    "Encroachment_Risk": "Critical",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "Critical",
    "Protected_Area_Linkages": [
      "Wular Lake Ramsar Site"
    ],
    "Drinking_Water_Linkages": [
      "Bandipora Town Water Supply"
    ],
    "Hydropower_Linkages": [
      "Kishanganga HEP (outfall drains to Wular via Madhumati/Erin)"
    ],
    "Irrigation_Linkages": [
      "Zaingeer Canal"
    ],
    "Monitoring_Stations": [
      "Wular Gauge Post",
      "Ningle Outflow Post"
    ],
    "Source_ID": "SRC-GOV-WUCMA",
    "Source_URL": "https://wucma.jk.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A Ramsar site. Silting up rapidly due to heavy sediment dumps from the Pohru and Madhumati sub-catchments. Extensive willow plantations are currently being removed to restore capacity."
  },
  {
    "Watershed_ID": "hokersar-catchment",
    "Watershed_Name": "Hokersar Catchment",
    "Alternative_Names": [
      "Hokersar Wetland Catchment",
      "Hokersar Drainage Basin"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Aru Valley Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-7",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Doodhganga / Flood Spill Channel",
    "Districts_Covered": [
      "Srinagar",
      "Budgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "J&K Wildlife Conservation Department Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.09,
    "Centroid_Longitude": 74.72,
    "Area_km2": 125,
    "Perimeter_km": 68,
    "Elevation_Min_m": 1580,
    "Elevation_Max_m": 2400,
    "Elevation_Mean_m": 1750,
    "Slope_Mean": 6.5,
    "Dominant_Landcover": "Wetland & Agriculture",
    "Forest_Cover_Percent": 5.4,
    "Agriculture_Cover_Percent": 58.6,
    "Builtup_Cover_Percent": 18.2,
    "Wetland_Count": 2,
    "Lake_Count": 1,
    "Spring_Count": 4,
    "River_Length_km": 18,
    "Drainage_Density": 0.76,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 90,
    "Soil_Erosion_Risk": "Moderate",
    "Flood_Risk": "Critical",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Critical",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Critical",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "Critical",
    "Protected_Area_Linkages": [
      "Hokersar Wetland Conservation Reserve"
    ],
    "Drinking_Water_Linkages": [
      "Rural Budgam Water Supply Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Hokersar Agriculture Inflow channels"
    ],
    "Monitoring_Stations": [
      "Hokersar Inlet Station"
    ],
    "Source_ID": "SRC-GOV-JKWL",
    "Source_URL": "https://jkwildlife.com/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Missing high-resolution GIS boundary file link. Delineated on regional topographic sheets only.",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A major migratory waterfowl habitat and Ramsar wetland. Drained by the Flood Spill Channel. Siltation from Doodhganga has dramatically reduced its water depth."
  },
  {
    "Watershed_ID": "shallabugh-catchment",
    "Watershed_Name": "Shallabugh Catchment",
    "Alternative_Names": [
      "Shallabugh Wetland Catchment",
      "Shallabugh Drainage Basin"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Pahalgam Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-8",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Anchar Outflow / Jhelum Spill Channels",
    "Districts_Covered": [
      "Ganderbal",
      "Srinagar"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "J&K Wildlife Department Map Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.16,
    "Centroid_Longitude": 74.73,
    "Area_km2": 180,
    "Perimeter_km": 84,
    "Elevation_Min_m": 1578,
    "Elevation_Max_m": 2100,
    "Elevation_Mean_m": 1680,
    "Slope_Mean": 4.8,
    "Dominant_Landcover": "Wetland & Silt Plain",
    "Forest_Cover_Percent": 4.1,
    "Agriculture_Cover_Percent": 62.4,
    "Builtup_Cover_Percent": 12.8,
    "Wetland_Count": 3,
    "Lake_Count": 1,
    "Spring_Count": 6,
    "River_Length_km": 22,
    "Drainage_Density": 0.81,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 95,
    "Soil_Erosion_Risk": "Moderate",
    "Flood_Risk": "Critical",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "High",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Shallabugh Wetland Conservation Reserve"
    ],
    "Drinking_Water_Linkages": [
      "Rural Ganderbal Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Shallabugh Rice Fields"
    ],
    "Monitoring_Stations": [
      "Shallabugh Inflow Gauge"
    ],
    "Source_ID": "SRC-GOV-JKWL",
    "Source_URL": "https://jkwildlife.com/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Boundary file link missing. Exact GIS mapping under wildlife census is pending verified digitization.",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A Ramsar designated wetland. Dries up significantly during winters. Crucial staging ground for mallards, pintails, and greylag geese."
  },
  {
    "Watershed_ID": "upper-jhelum-catchment",
    "Watershed_Name": "Upper Jhelum Catchment",
    "Alternative_Names": [
      "Upper Jhelum Watershed",
      "Verinag-Khanabal Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Verinag Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-9",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Jhelum River",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "J&K Forest Department Watershed Atlas",
    "Boundary_File_Link": "/data/gis/boundaries/upper-jhelum-catchment.geojson",
    "Centroid_Latitude": 33.85,
    "Centroid_Longitude": 75.2,
    "Area_km2": 1850,
    "Perimeter_km": 198,
    "Elevation_Min_m": 1580,
    "Elevation_Max_m": 4200,
    "Elevation_Mean_m": 2650,
    "Slope_Mean": 16.8,
    "Dominant_Landcover": "Forest & Agriculture",
    "Forest_Cover_Percent": 38.4,
    "Agriculture_Cover_Percent": 36.1,
    "Builtup_Cover_Percent": 4.8,
    "Wetland_Count": 1,
    "Lake_Count": 2,
    "Spring_Count": 65,
    "River_Length_km": 42,
    "Drainage_Density": 0.98,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 480,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "High",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Verinag Reserve Forest"
    ],
    "Drinking_Water_Linkages": [
      "Anantnag City Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Martand Lift Irrigation Scheme"
    ],
    "Monitoring_Stations": [
      "Sangam Gauge Station",
      "Khanabal Gauge Post"
    ],
    "Source_ID": "SRC-GOV-JALSHAKTI",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Initial catchment unit of the Jhelum River, originating from the Verinag spring-shed complex. Feeds the agricultural plains of South Kashmir."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-0-c-0",
    "Watershed_Name": "Hirpora Catchment",
    "Alternative_Names": [
      "Hirpora Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Arapath Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-0",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.1,
    "Centroid_Longitude": 74.7,
    "Area_km2": 15,
    "Perimeter_km": 7.2,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 2200,
    "Elevation_Mean_m": 1900,
    "Slope_Mean": 14,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 20,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.5,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 80,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-1-c-1",
    "Watershed_Name": "Romushi Upper Catchment",
    "Alternative_Names": [
      "Romushi Upper Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Bringi Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-1",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kulgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.11,
    "Centroid_Longitude": 74.71,
    "Area_km2": 18,
    "Perimeter_km": 8.6,
    "Elevation_Min_m": 1625,
    "Elevation_Max_m": 2230,
    "Elevation_Mean_m": 1928,
    "Slope_Mean": 14.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 23,
    "Builtup_Cover_Percent": 2.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.55,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 83,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-2-c-2",
    "Watershed_Name": "Romushi Lower Catchment",
    "Alternative_Names": [
      "Romushi Lower Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sandran Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-2",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Shopian"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.12,
    "Centroid_Longitude": 74.72,
    "Area_km2": 21,
    "Perimeter_km": 10.1,
    "Elevation_Min_m": 1650,
    "Elevation_Max_m": 2260,
    "Elevation_Mean_m": 1956,
    "Slope_Mean": 15,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 19,
    "Agriculture_Cover_Percent": 26,
    "Builtup_Cover_Percent": 2.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 86,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-3-c-3",
    "Watershed_Name": "Yousmarg Catchment",
    "Alternative_Names": [
      "Yousmarg Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder East Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-3",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Pulwama"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.13,
    "Centroid_Longitude": 74.73,
    "Area_km2": 24,
    "Perimeter_km": 11.5,
    "Elevation_Min_m": 1675,
    "Elevation_Max_m": 2290,
    "Elevation_Mean_m": 1984,
    "Slope_Mean": 15.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 21,
    "Agriculture_Cover_Percent": 29,
    "Builtup_Cover_Percent": 3.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 89,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-4-c-4",
    "Watershed_Name": "Doodhganga Upper Catchment",
    "Alternative_Names": [
      "Doodhganga Upper Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder West Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-4",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Srinagar"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.14,
    "Centroid_Longitude": 74.74,
    "Area_km2": 27,
    "Perimeter_km": 13,
    "Elevation_Min_m": 1700,
    "Elevation_Max_m": 2320,
    "Elevation_Mean_m": 2012,
    "Slope_Mean": 16,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 23,
    "Agriculture_Cover_Percent": 32,
    "Builtup_Cover_Percent": 3.6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.7,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 92,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-5-c-5",
    "Watershed_Name": "Doodhganga Lower Catchment",
    "Alternative_Names": [
      "Doodhganga Lower Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kolahoi Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-5",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Budgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.15,
    "Centroid_Longitude": 74.75,
    "Area_km2": 30,
    "Perimeter_km": 14.4,
    "Elevation_Min_m": 1725,
    "Elevation_Max_m": 2350,
    "Elevation_Mean_m": 2040,
    "Slope_Mean": 16.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 35,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.75,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 95,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-6-c-6",
    "Watershed_Name": "Chadoora Catchment",
    "Alternative_Names": [
      "Chadoora Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sheshnag Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-6",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Baramulla"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.16,
    "Centroid_Longitude": 74.76,
    "Area_km2": 33,
    "Perimeter_km": 15.8,
    "Elevation_Min_m": 1750,
    "Elevation_Max_m": 2380,
    "Elevation_Mean_m": 2068,
    "Slope_Mean": 17,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 38,
    "Builtup_Cover_Percent": 4.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 98,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-7-c-7",
    "Watershed_Name": "Sukhnag Upper Catchment",
    "Alternative_Names": [
      "Sukhnag Upper Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Aru Valley Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-7",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Bandipora"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.17,
    "Centroid_Longitude": 74.77,
    "Area_km2": 36,
    "Perimeter_km": 17.3,
    "Elevation_Min_m": 1775,
    "Elevation_Max_m": 2410,
    "Elevation_Mean_m": 2096,
    "Slope_Mean": 17.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 41,
    "Builtup_Cover_Percent": 4.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 101,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-8-c-8",
    "Watershed_Name": "Sukhnag Lower Catchment",
    "Alternative_Names": [
      "Sukhnag Lower Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Pahalgam Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-8",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ganderbal"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.18,
    "Centroid_Longitude": 74.78,
    "Area_km2": 39,
    "Perimeter_km": 18.7,
    "Elevation_Min_m": 1800,
    "Elevation_Max_m": 2440,
    "Elevation_Mean_m": 2124,
    "Slope_Mean": 18,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 44,
    "Builtup_Cover_Percent": 5.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 104,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-9-c-9",
    "Watershed_Name": "Ferozpora Catchment",
    "Alternative_Names": [
      "Ferozpora Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Verinag Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-9",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kupwara"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.19,
    "Centroid_Longitude": 74.79,
    "Area_km2": 42,
    "Perimeter_km": 20.2,
    "Elevation_Min_m": 1825,
    "Elevation_Max_m": 2470,
    "Elevation_Mean_m": 2152,
    "Slope_Mean": 18.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 47,
    "Builtup_Cover_Percent": 5.6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 107,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-10-c-10",
    "Watershed_Name": "Ningal Catchment",
    "Alternative_Names": [
      "Ningal Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kokernag Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-10",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.2,
    "Centroid_Longitude": 74.8,
    "Area_km2": 45,
    "Perimeter_km": 21.6,
    "Elevation_Min_m": 1850,
    "Elevation_Max_m": 2500,
    "Elevation_Mean_m": 2180,
    "Slope_Mean": 19,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 50,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 110,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-11-c-11",
    "Watershed_Name": "Pohru Upper Catchment",
    "Alternative_Names": [
      "Pohru Upper Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Achabal Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-11",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kulgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.21,
    "Centroid_Longitude": 74.81,
    "Area_km2": 48,
    "Perimeter_km": 23,
    "Elevation_Min_m": 1875,
    "Elevation_Max_m": 2530,
    "Elevation_Mean_m": 2208,
    "Slope_Mean": 19.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 37,
    "Agriculture_Cover_Percent": 53,
    "Builtup_Cover_Percent": 6.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 113,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-12-c-12",
    "Watershed_Name": "Pohru Lower Catchment",
    "Alternative_Names": [
      "Pohru Lower Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chashma Shahi Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-12",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Shopian"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.22,
    "Centroid_Longitude": 74.82,
    "Area_km2": 51,
    "Perimeter_km": 24.5,
    "Elevation_Min_m": 1900,
    "Elevation_Max_m": 2560,
    "Elevation_Mean_m": 2236,
    "Slope_Mean": 20,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 39,
    "Agriculture_Cover_Percent": 56,
    "Builtup_Cover_Percent": 6.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.1,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 116,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-13-c-13",
    "Watershed_Name": "Lolab Catchment",
    "Alternative_Names": [
      "Lolab Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Martand Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-13",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Pulwama"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.23,
    "Centroid_Longitude": 74.83,
    "Area_km2": 54,
    "Perimeter_km": 25.9,
    "Elevation_Min_m": 1925,
    "Elevation_Max_m": 2590,
    "Elevation_Mean_m": 2264,
    "Slope_Mean": 20.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 41,
    "Agriculture_Cover_Percent": 59,
    "Builtup_Cover_Percent": 7.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.15,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 119,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-14-c-14",
    "Watershed_Name": "Mawar Catchment",
    "Alternative_Names": [
      "Mawar Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Vishow Upper Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-14",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Srinagar"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.24,
    "Centroid_Longitude": 74.84,
    "Area_km2": 57,
    "Perimeter_km": 27.4,
    "Elevation_Min_m": 1950,
    "Elevation_Max_m": 2620,
    "Elevation_Mean_m": 2292,
    "Slope_Mean": 21,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 43,
    "Agriculture_Cover_Percent": 22,
    "Builtup_Cover_Percent": 7.6000000000000005,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.5,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 122,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-15-c-15",
    "Watershed_Name": "Hamal Catchment",
    "Alternative_Names": [
      "Hamal Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Vishow Lower Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-15",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Budgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.25,
    "Centroid_Longitude": 74.85,
    "Area_km2": 60,
    "Perimeter_km": 28.8,
    "Elevation_Min_m": 1975,
    "Elevation_Max_m": 2650,
    "Elevation_Mean_m": 2320,
    "Slope_Mean": 21.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 25,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.55,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 125,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-16-c-16",
    "Watershed_Name": "Erin Catchment",
    "Alternative_Names": [
      "Erin Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Aharbal Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-16",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Baramulla"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.26,
    "Centroid_Longitude": 74.86,
    "Area_km2": 63,
    "Perimeter_km": 30.2,
    "Elevation_Min_m": 2000,
    "Elevation_Max_m": 2680,
    "Elevation_Mean_m": 2348,
    "Slope_Mean": 22,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 28,
    "Builtup_Cover_Percent": 2.4000000000000004,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 128,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-17-c-17",
    "Watershed_Name": "Madhumati Catchment",
    "Alternative_Names": [
      "Madhumati Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kausarnag Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-17",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Bandipora"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.27,
    "Centroid_Longitude": 74.87,
    "Area_km2": 66,
    "Perimeter_km": 31.7,
    "Elevation_Min_m": 2025,
    "Elevation_Max_m": 2710,
    "Elevation_Mean_m": 2376,
    "Slope_Mean": 22.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 19,
    "Agriculture_Cover_Percent": 31,
    "Builtup_Cover_Percent": 2.8000000000000007,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 131,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-18-c-18",
    "Watershed_Name": "Gurez Catchment",
    "Alternative_Names": [
      "Gurez Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Rambiara Upper Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-18",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ganderbal"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.28,
    "Centroid_Longitude": 74.88,
    "Area_km2": 69,
    "Perimeter_km": 33.1,
    "Elevation_Min_m": 2050,
    "Elevation_Max_m": 2740,
    "Elevation_Mean_m": 2404,
    "Slope_Mean": 23,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 21,
    "Agriculture_Cover_Percent": 34,
    "Builtup_Cover_Percent": 3.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.7,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 134,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-19-c-19",
    "Watershed_Name": "Sindh Upper Catchment",
    "Alternative_Names": [
      "Sindh Upper Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Rambiara Lower Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-19",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kupwara"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.29,
    "Centroid_Longitude": 74.89,
    "Area_km2": 72,
    "Perimeter_km": 34.6,
    "Elevation_Min_m": 2075,
    "Elevation_Max_m": 2770,
    "Elevation_Mean_m": 2432,
    "Slope_Mean": 23.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 23,
    "Agriculture_Cover_Percent": 37,
    "Builtup_Cover_Percent": 3.6000000000000005,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.75,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 137,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-0-c-20",
    "Watershed_Name": "Sindh Lower Catchment",
    "Alternative_Names": [
      "Sindh Lower Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Arapath Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-0",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.3,
    "Centroid_Longitude": 74.9,
    "Area_km2": 75,
    "Perimeter_km": 36,
    "Elevation_Min_m": 2100,
    "Elevation_Max_m": 2800,
    "Elevation_Mean_m": 2460,
    "Slope_Mean": 24,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 40,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-1-c-21",
    "Watershed_Name": "Wangath Catchment",
    "Alternative_Names": [
      "Wangath Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Bringi Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-1",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kulgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.31,
    "Centroid_Longitude": 74.91,
    "Area_km2": 78,
    "Perimeter_km": 37.4,
    "Elevation_Min_m": 2125,
    "Elevation_Max_m": 2830,
    "Elevation_Mean_m": 2488,
    "Slope_Mean": 24.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 43,
    "Builtup_Cover_Percent": 4.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 143,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-2-c-22",
    "Watershed_Name": "Kangan Catchment",
    "Alternative_Names": [
      "Kangan Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sandran Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-2",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Shopian"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.32,
    "Centroid_Longitude": 74.92,
    "Area_km2": 81,
    "Perimeter_km": 38.9,
    "Elevation_Min_m": 2150,
    "Elevation_Max_m": 2860,
    "Elevation_Mean_m": 2516,
    "Slope_Mean": 25,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 46,
    "Builtup_Cover_Percent": 4.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 146,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-3-c-23",
    "Watershed_Name": "Sonamarg Catchment",
    "Alternative_Names": [
      "Sonamarg Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder East Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-3",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Pulwama"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.33,
    "Centroid_Longitude": 74.93,
    "Area_km2": 84,
    "Perimeter_km": 40.3,
    "Elevation_Min_m": 2175,
    "Elevation_Max_m": 2890,
    "Elevation_Mean_m": 2544,
    "Slope_Mean": 25.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 49,
    "Builtup_Cover_Percent": 5.200000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 149,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-4-c-24",
    "Watershed_Name": "Baltal Catchment",
    "Alternative_Names": [
      "Baltal Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder West Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-4",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Srinagar"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.34,
    "Centroid_Longitude": 74.94,
    "Area_km2": 87,
    "Perimeter_km": 41.8,
    "Elevation_Min_m": 2200,
    "Elevation_Max_m": 2920,
    "Elevation_Mean_m": 2572,
    "Slope_Mean": 14,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 52,
    "Builtup_Cover_Percent": 5.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 152,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-5-c-25",
    "Watershed_Name": "Zojila Catchment",
    "Alternative_Names": [
      "Zojila Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kolahoi Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-5",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Budgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.35,
    "Centroid_Longitude": 74.95,
    "Area_km2": 90,
    "Perimeter_km": 43.2,
    "Elevation_Min_m": 2225,
    "Elevation_Max_m": 2950,
    "Elevation_Mean_m": 2600,
    "Slope_Mean": 14.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 55,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 155,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-6-c-26",
    "Watershed_Name": "Shalimar Catchment",
    "Alternative_Names": [
      "Shalimar Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sheshnag Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-6",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Baramulla"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.36,
    "Centroid_Longitude": 74.96,
    "Area_km2": 93,
    "Perimeter_km": 44.6,
    "Elevation_Min_m": 2250,
    "Elevation_Max_m": 2980,
    "Elevation_Mean_m": 2628,
    "Slope_Mean": 15,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 37,
    "Agriculture_Cover_Percent": 58,
    "Builtup_Cover_Percent": 6.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.1,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 158,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-7-c-27",
    "Watershed_Name": "Nishat Catchment",
    "Alternative_Names": [
      "Nishat Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Aru Valley Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-7",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Bandipora"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.37,
    "Centroid_Longitude": 74.97,
    "Area_km2": 16,
    "Perimeter_km": 7.7,
    "Elevation_Min_m": 2275,
    "Elevation_Max_m": 3010,
    "Elevation_Mean_m": 2656,
    "Slope_Mean": 15.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 39,
    "Agriculture_Cover_Percent": 21,
    "Builtup_Cover_Percent": 6.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.15,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 161,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-8-c-28",
    "Watershed_Name": "Harwan Catchment",
    "Alternative_Names": [
      "Harwan Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Pahalgam Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-8",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ganderbal"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.38,
    "Centroid_Longitude": 74.98,
    "Area_km2": 19,
    "Perimeter_km": 9.1,
    "Elevation_Min_m": 2300,
    "Elevation_Max_m": 3040,
    "Elevation_Mean_m": 2684,
    "Slope_Mean": 16,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 41,
    "Agriculture_Cover_Percent": 24,
    "Builtup_Cover_Percent": 7.200000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.5,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 164,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-9-c-29",
    "Watershed_Name": "Telbal Catchment",
    "Alternative_Names": [
      "Telbal Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Verinag Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-9",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kupwara"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.39,
    "Centroid_Longitude": 74.99,
    "Area_km2": 22,
    "Perimeter_km": 10.6,
    "Elevation_Min_m": 2325,
    "Elevation_Max_m": 3070,
    "Elevation_Mean_m": 2712,
    "Slope_Mean": 16.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 43,
    "Agriculture_Cover_Percent": 27,
    "Builtup_Cover_Percent": 7.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.55,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 167,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-10-c-30",
    "Watershed_Name": "Nigeen Catchment",
    "Alternative_Names": [
      "Nigeen Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kokernag Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-10",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.4,
    "Centroid_Longitude": 75,
    "Area_km2": 25,
    "Perimeter_km": 12,
    "Elevation_Min_m": 2350,
    "Elevation_Max_m": 3100,
    "Elevation_Mean_m": 2740,
    "Slope_Mean": 17,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 30,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 170,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-11-c-31",
    "Watershed_Name": "Brari Nambal Catchment",
    "Alternative_Names": [
      "Brari Nambal Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Achabal Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-11",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kulgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.41,
    "Centroid_Longitude": 75.01,
    "Area_km2": 28,
    "Perimeter_km": 13.4,
    "Elevation_Min_m": 2375,
    "Elevation_Max_m": 3130,
    "Elevation_Mean_m": 2768,
    "Slope_Mean": 17.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 33,
    "Builtup_Cover_Percent": 2.4000000000000004,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 173,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-12-c-32",
    "Watershed_Name": "Anchar Catchment",
    "Alternative_Names": [
      "Anchar Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chashma Shahi Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-12",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Shopian"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.42,
    "Centroid_Longitude": 75.02,
    "Area_km2": 31,
    "Perimeter_km": 14.9,
    "Elevation_Min_m": 2400,
    "Elevation_Max_m": 3160,
    "Elevation_Mean_m": 2796,
    "Slope_Mean": 18,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 19,
    "Agriculture_Cover_Percent": 36,
    "Builtup_Cover_Percent": 2.8000000000000007,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.7,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 176,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-13-c-33",
    "Watershed_Name": "Gilsar Catchment",
    "Alternative_Names": [
      "Gilsar Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Martand Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-13",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Pulwama"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.43,
    "Centroid_Longitude": 75.03,
    "Area_km2": 34,
    "Perimeter_km": 16.3,
    "Elevation_Min_m": 2425,
    "Elevation_Max_m": 3190,
    "Elevation_Mean_m": 2824,
    "Slope_Mean": 18.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 21,
    "Agriculture_Cover_Percent": 39,
    "Builtup_Cover_Percent": 3.200000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.75,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 179,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-14-c-34",
    "Watershed_Name": "Hokersar Buffer Catchment",
    "Alternative_Names": [
      "Hokersar Buffer Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Vishow Upper Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-14",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Srinagar"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.44,
    "Centroid_Longitude": 75.04,
    "Area_km2": 37,
    "Perimeter_km": 17.8,
    "Elevation_Min_m": 2450,
    "Elevation_Max_m": 3220,
    "Elevation_Mean_m": 2852,
    "Slope_Mean": 19,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 23,
    "Agriculture_Cover_Percent": 42,
    "Builtup_Cover_Percent": 3.6000000000000014,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 182,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-15-c-35",
    "Watershed_Name": "Shallabugh Buffer Catchment",
    "Alternative_Names": [
      "Shallabugh Buffer Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Vishow Lower Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-15",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Budgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.45,
    "Centroid_Longitude": 75.05,
    "Area_km2": 40,
    "Perimeter_km": 19.2,
    "Elevation_Min_m": 2475,
    "Elevation_Max_m": 3250,
    "Elevation_Mean_m": 2880,
    "Slope_Mean": 19.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 45,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 185,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-16-c-36",
    "Watershed_Name": "Hygam Catchment",
    "Alternative_Names": [
      "Hygam Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Aharbal Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-16",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Baramulla"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.46,
    "Centroid_Longitude": 75.06,
    "Area_km2": 43,
    "Perimeter_km": 20.6,
    "Elevation_Min_m": 2500,
    "Elevation_Max_m": 3280,
    "Elevation_Mean_m": 2908,
    "Slope_Mean": 20,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 48,
    "Builtup_Cover_Percent": 4.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 188,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "kishanganga-basin-w-17-c-37",
    "Watershed_Name": "Mirgund Catchment",
    "Alternative_Names": [
      "Mirgund Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kausarnag Watershed",
    "Parent_Watershed_ID": "kishanganga-basin-w-17",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Bandipora"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.47,
    "Centroid_Longitude": 75.07,
    "Area_km2": 46,
    "Perimeter_km": 22.1,
    "Elevation_Min_m": 2525,
    "Elevation_Max_m": 3310,
    "Elevation_Mean_m": 2936,
    "Slope_Mean": 20.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 51,
    "Builtup_Cover_Percent": 4.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 191,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "lidder-sub-basin-w-18-c-38",
    "Watershed_Name": "Chatlum Catchment",
    "Alternative_Names": [
      "Chatlum Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Rambiara Upper Watershed",
    "Parent_Watershed_ID": "lidder-sub-basin-w-18",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ganderbal"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.48,
    "Centroid_Longitude": 75.08,
    "Area_km2": 49,
    "Perimeter_km": 23.5,
    "Elevation_Min_m": 2550,
    "Elevation_Max_m": 3340,
    "Elevation_Mean_m": 2964,
    "Slope_Mean": 21,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 54,
    "Builtup_Cover_Percent": 5.200000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 194,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "sind-sub-basin-w-19-c-39",
    "Watershed_Name": "Fashkoori Catchment",
    "Alternative_Names": [
      "Fashkoori Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Rambiara Lower Watershed",
    "Parent_Watershed_ID": "sind-sub-basin-w-19",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kupwara"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.49,
    "Centroid_Longitude": 75.09,
    "Area_km2": 52,
    "Perimeter_km": 25,
    "Elevation_Min_m": 2575,
    "Elevation_Max_m": 3370,
    "Elevation_Mean_m": 2992,
    "Slope_Mean": 21.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 57,
    "Builtup_Cover_Percent": 5.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 197,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "vishav-catchment-m-0",
    "Watershed_Name": "Pampore Micro-Watershed",
    "Alternative_Names": [
      "Pampore Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Vishav Catchment",
    "Parent_Watershed_ID": "vishav-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.1,
    "Centroid_Longitude": 74.7,
    "Area_km2": 5,
    "Perimeter_km": 3,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 2000,
    "Elevation_Mean_m": 1800,
    "Slope_Mean": 16,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 5,
    "Agriculture_Cover_Percent": 30,
    "Builtup_Cover_Percent": 5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 50,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "rambiara-catchment-m-1",
    "Watershed_Name": "Khrew Micro-Watershed",
    "Alternative_Names": [
      "Khrew Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Rambiara Catchment",
    "Parent_Watershed_ID": "rambiara-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kulgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.11,
    "Centroid_Longitude": 74.71,
    "Area_km2": 6,
    "Perimeter_km": 3.6,
    "Elevation_Min_m": 1620,
    "Elevation_Max_m": 2025,
    "Elevation_Mean_m": 1822,
    "Slope_Mean": 16.6,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 6,
    "Agriculture_Cover_Percent": 32,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.66,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 52,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "romushi-catchment-m-2",
    "Watershed_Name": "Srinagar Urban Micro-Watershed",
    "Alternative_Names": [
      "Srinagar Urban Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Romushi Catchment",
    "Parent_Watershed_ID": "romushi-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Shopian"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.12,
    "Centroid_Longitude": 74.72,
    "Area_km2": 7,
    "Perimeter_km": 4.2,
    "Elevation_Min_m": 1640,
    "Elevation_Max_m": 2050,
    "Elevation_Mean_m": 1844,
    "Slope_Mean": 17.2,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 7,
    "Agriculture_Cover_Percent": 34,
    "Builtup_Cover_Percent": 7,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.72,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 54,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "doodhganga-catchment-m-3",
    "Watershed_Name": "Baramulla Micro-Watershed",
    "Alternative_Names": [
      "Baramulla Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Doodhganga Catchment",
    "Parent_Watershed_ID": "doodhganga-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Pulwama"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.13,
    "Centroid_Longitude": 74.73,
    "Area_km2": 8,
    "Perimeter_km": 4.8,
    "Elevation_Min_m": 1660,
    "Elevation_Max_m": 2075,
    "Elevation_Mean_m": 1866,
    "Slope_Mean": 17.8,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 8,
    "Agriculture_Cover_Percent": 36,
    "Builtup_Cover_Percent": 8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.78,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 56,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "pohru-catchment-m-4",
    "Watershed_Name": "Sopore Micro-Watershed",
    "Alternative_Names": [
      "Sopore Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Pohru Catchment",
    "Parent_Watershed_ID": "pohru-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Srinagar"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.14,
    "Centroid_Longitude": 74.74,
    "Area_km2": 9,
    "Perimeter_km": 5.4,
    "Elevation_Min_m": 1680,
    "Elevation_Max_m": 2100,
    "Elevation_Mean_m": 1888,
    "Slope_Mean": 18.4,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 9,
    "Agriculture_Cover_Percent": 38,
    "Builtup_Cover_Percent": 9,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.84,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 58,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "dal-nigeen-catchment-m-5",
    "Watershed_Name": "Bandipora Micro-Watershed",
    "Alternative_Names": [
      "Bandipora Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Dal-Nigeen Catchment",
    "Parent_Watershed_ID": "dal-nigeen-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Budgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.15,
    "Centroid_Longitude": 74.75,
    "Area_km2": 10,
    "Perimeter_km": 6,
    "Elevation_Min_m": 1700,
    "Elevation_Max_m": 2125,
    "Elevation_Mean_m": 1910,
    "Slope_Mean": 19,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 10,
    "Agriculture_Cover_Percent": 40,
    "Builtup_Cover_Percent": 10,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 60,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "wular-catchment-m-6",
    "Watershed_Name": "Kupwara Micro-Watershed",
    "Alternative_Names": [
      "Kupwara Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Wular Lake Catchment",
    "Parent_Watershed_ID": "wular-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Baramulla"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.16,
    "Centroid_Longitude": 74.76,
    "Area_km2": 11,
    "Perimeter_km": 6.6,
    "Elevation_Min_m": 1720,
    "Elevation_Max_m": 2150,
    "Elevation_Mean_m": 1932,
    "Slope_Mean": 19.6,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 11,
    "Agriculture_Cover_Percent": 42,
    "Builtup_Cover_Percent": 11,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.96,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 62,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "hokersar-catchment-m-7",
    "Watershed_Name": "Anantnag Karst Micro-Watershed",
    "Alternative_Names": [
      "Anantnag Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hokersar Catchment",
    "Parent_Watershed_ID": "hokersar-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Bandipora"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.17,
    "Centroid_Longitude": 74.77,
    "Area_km2": 12,
    "Perimeter_km": 7.2,
    "Elevation_Min_m": 1740,
    "Elevation_Max_m": 2175,
    "Elevation_Mean_m": 1954,
    "Slope_Mean": 20.2,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 12,
    "Agriculture_Cover_Percent": 44,
    "Builtup_Cover_Percent": 12,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.02,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 64,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "shallabugh-catchment-m-8",
    "Watershed_Name": "Verinag Aquifer Micro-Watershed",
    "Alternative_Names": [
      "Verinag Aquifer Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shallabugh Catchment",
    "Parent_Watershed_ID": "shallabugh-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ganderbal"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.18,
    "Centroid_Longitude": 74.78,
    "Area_km2": 13,
    "Perimeter_km": 7.8,
    "Elevation_Min_m": 1760,
    "Elevation_Max_m": 2200,
    "Elevation_Mean_m": 1976,
    "Slope_Mean": 20.8,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 13,
    "Agriculture_Cover_Percent": 46,
    "Builtup_Cover_Percent": 13,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.08,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 66,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "upper-jhelum-catchment-m-9",
    "Watershed_Name": "Kulgam Rice Micro-Watershed",
    "Alternative_Names": [
      "Kulgam Rice Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Jhelum Catchment",
    "Parent_Watershed_ID": "upper-jhelum-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kupwara"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.19,
    "Centroid_Longitude": 74.79,
    "Area_km2": 14,
    "Perimeter_km": 8.4,
    "Elevation_Min_m": 1780,
    "Elevation_Max_m": 2225,
    "Elevation_Mean_m": 1998,
    "Slope_Mean": 21.4,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 14,
    "Agriculture_Cover_Percent": 48,
    "Builtup_Cover_Percent": 14,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.14,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 68,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-0",
    "Watershed_Name": "Chenab Upper Watershed",
    "Alternative_Names": [
      "Chenab Upper Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Tawi Sub-Basin",
    "Parent_Watershed_ID": "tawi-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Chenab Upper Stream",
    "Districts_Covered": [
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33,
    "Centroid_Longitude": 74.8,
    "Area_km2": 40,
    "Perimeter_km": 16,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 2400,
    "Elevation_Mean_m": 2000,
    "Slope_Mean": 12,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 10,
    "Builtup_Cover_Percent": 1,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 10,
    "Drainage_Density": 0.4,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 100,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-1",
    "Watershed_Name": "Chenab Lower Watershed",
    "Alternative_Names": [
      "Chenab Lower Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Marusudar Sub-Basin",
    "Parent_Watershed_ID": "marusudar-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Chenab Lower Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.22,
    "Centroid_Longitude": 77.52,
    "Area_km2": 45,
    "Perimeter_km": 18,
    "Elevation_Min_m": 1630,
    "Elevation_Max_m": 2440,
    "Elevation_Mean_m": 2035,
    "Slope_Mean": 12.4,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 13,
    "Builtup_Cover_Percent": 1.3,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 12,
    "Drainage_Density": 0.44,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 104,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-2",
    "Watershed_Name": "Marusudar Upper Watershed",
    "Alternative_Names": [
      "Marusudar Upper Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ujh Sub-Basin",
    "Parent_Watershed_ID": "ujh-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Marusudar Upper Stream",
    "Districts_Covered": [
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.04,
    "Centroid_Longitude": 74.84,
    "Area_km2": 50,
    "Perimeter_km": 20,
    "Elevation_Min_m": 1660,
    "Elevation_Max_m": 2480,
    "Elevation_Mean_m": 2070,
    "Slope_Mean": 12.8,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 16,
    "Builtup_Cover_Percent": 1.6,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 14,
    "Drainage_Density": 0.48,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 108,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "zanskar-sub-basin-w-3",
    "Watershed_Name": "Marusudar Lower Watershed",
    "Alternative_Names": [
      "Marusudar Lower Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Zanskar Sub-Basin",
    "Parent_Watershed_ID": "zanskar-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Marusudar Lower Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.26,
    "Centroid_Longitude": 77.56,
    "Area_km2": 55,
    "Perimeter_km": 22,
    "Elevation_Min_m": 1690,
    "Elevation_Max_m": 2520,
    "Elevation_Mean_m": 2105,
    "Slope_Mean": 13.2,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 19,
    "Builtup_Cover_Percent": 1.9,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 16,
    "Drainage_Density": 0.52,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 112,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "shyok-sub-basin-w-4",
    "Watershed_Name": "Pakal Dul Watershed",
    "Alternative_Names": [
      "Pakal Dul Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shyok Sub-Basin",
    "Parent_Watershed_ID": "shyok-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Pakal Dul Stream",
    "Districts_Covered": [
      "Reasi"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.08,
    "Centroid_Longitude": 74.88,
    "Area_km2": 60,
    "Perimeter_km": 24,
    "Elevation_Min_m": 1720,
    "Elevation_Max_m": 2560,
    "Elevation_Mean_m": 2140,
    "Slope_Mean": 13.6,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 22,
    "Builtup_Cover_Percent": 2.2,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 18,
    "Drainage_Density": 0.56,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 116,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "suru-sub-basin-w-5",
    "Watershed_Name": "Kiru Watershed",
    "Alternative_Names": [
      "Kiru Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Suru Sub-Basin",
    "Parent_Watershed_ID": "suru-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Kiru Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.3,
    "Centroid_Longitude": 77.6,
    "Area_km2": 65,
    "Perimeter_km": 26,
    "Elevation_Min_m": 1750,
    "Elevation_Max_m": 2600,
    "Elevation_Mean_m": 2175,
    "Slope_Mean": 14,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 25,
    "Builtup_Cover_Percent": 2.5,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 20,
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 120,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "dras-sub-basin-w-6",
    "Watershed_Name": "Kwar Watershed",
    "Alternative_Names": [
      "Kwar Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Dras Sub-Basin",
    "Parent_Watershed_ID": "dras-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Kwar Stream",
    "Districts_Covered": [
      "Kishtwar"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.12,
    "Centroid_Longitude": 74.92,
    "Area_km2": 70,
    "Perimeter_km": 28,
    "Elevation_Min_m": 1780,
    "Elevation_Max_m": 2640,
    "Elevation_Mean_m": 2210,
    "Slope_Mean": 14.4,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 37,
    "Agriculture_Cover_Percent": 28,
    "Builtup_Cover_Percent": 2.8,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 22,
    "Drainage_Density": 0.64,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 124,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "nubra-sub-basin-w-7",
    "Watershed_Name": "Kishtwar Watershed",
    "Alternative_Names": [
      "Kishtwar Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Nubra Sub-Basin",
    "Parent_Watershed_ID": "nubra-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Kishtwar Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.34,
    "Centroid_Longitude": 77.64,
    "Area_km2": 75,
    "Perimeter_km": 30,
    "Elevation_Min_m": 1810,
    "Elevation_Max_m": 2680,
    "Elevation_Mean_m": 2245,
    "Slope_Mean": 14.8,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 39,
    "Agriculture_Cover_Percent": 31,
    "Builtup_Cover_Percent": 3.1,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 24,
    "Drainage_Density": 0.68,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 128,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-8",
    "Watershed_Name": "Paddar Watershed",
    "Alternative_Names": [
      "Paddar Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Tawi Sub-Basin",
    "Parent_Watershed_ID": "tawi-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Paddar Stream",
    "Districts_Covered": [
      "Rajouri"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.16,
    "Centroid_Longitude": 74.96,
    "Area_km2": 80,
    "Perimeter_km": 32,
    "Elevation_Min_m": 1840,
    "Elevation_Max_m": 2720,
    "Elevation_Mean_m": 2280,
    "Slope_Mean": 15.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 41,
    "Agriculture_Cover_Percent": 34,
    "Builtup_Cover_Percent": 3.4,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 26,
    "Drainage_Density": 0.72,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 132,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-9",
    "Watershed_Name": "Bhadarwah Watershed",
    "Alternative_Names": [
      "Bhadarwah Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Marusudar Sub-Basin",
    "Parent_Watershed_ID": "marusudar-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Bhadarwah Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.38,
    "Centroid_Longitude": 77.68,
    "Area_km2": 85,
    "Perimeter_km": 34,
    "Elevation_Min_m": 1870,
    "Elevation_Max_m": 2760,
    "Elevation_Mean_m": 2315,
    "Slope_Mean": 15.6,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 43,
    "Agriculture_Cover_Percent": 37,
    "Builtup_Cover_Percent": 3.6999999999999997,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 28,
    "Drainage_Density": 0.76,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 136,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-10",
    "Watershed_Name": "Doda Watershed",
    "Alternative_Names": [
      "Doda Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ujh Sub-Basin",
    "Parent_Watershed_ID": "ujh-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Doda Stream",
    "Districts_Covered": [
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.2,
    "Centroid_Longitude": 75,
    "Area_km2": 90,
    "Perimeter_km": 36,
    "Elevation_Min_m": 1900,
    "Elevation_Max_m": 2800,
    "Elevation_Mean_m": 2350,
    "Slope_Mean": 16,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 45,
    "Agriculture_Cover_Percent": 40,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 10,
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "zanskar-sub-basin-w-11",
    "Watershed_Name": "Ramban Watershed",
    "Alternative_Names": [
      "Ramban Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Zanskar Sub-Basin",
    "Parent_Watershed_ID": "zanskar-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Ramban Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.42,
    "Centroid_Longitude": 77.72,
    "Area_km2": 95,
    "Perimeter_km": 38,
    "Elevation_Min_m": 1930,
    "Elevation_Max_m": 2840,
    "Elevation_Mean_m": 2385,
    "Slope_Mean": 16.4,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 47,
    "Agriculture_Cover_Percent": 43,
    "Builtup_Cover_Percent": 4.3,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 12,
    "Drainage_Density": 0.84,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 144,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "shyok-sub-basin-w-12",
    "Watershed_Name": "Baglihar Watershed",
    "Alternative_Names": [
      "Baglihar Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shyok Sub-Basin",
    "Parent_Watershed_ID": "shyok-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Baglihar Stream",
    "Districts_Covered": [
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.24,
    "Centroid_Longitude": 75.04,
    "Area_km2": 100,
    "Perimeter_km": 40,
    "Elevation_Min_m": 1960,
    "Elevation_Max_m": 2880,
    "Elevation_Mean_m": 2420,
    "Slope_Mean": 16.8,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 49,
    "Agriculture_Cover_Percent": 46,
    "Builtup_Cover_Percent": 4.6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 14,
    "Drainage_Density": 0.88,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 148,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "suru-sub-basin-w-13",
    "Watershed_Name": "Reasi Watershed",
    "Alternative_Names": [
      "Reasi Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Suru Sub-Basin",
    "Parent_Watershed_ID": "suru-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Reasi Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.46,
    "Centroid_Longitude": 77.76,
    "Area_km2": 105,
    "Perimeter_km": 42,
    "Elevation_Min_m": 1990,
    "Elevation_Max_m": 2920,
    "Elevation_Mean_m": 2455,
    "Slope_Mean": 17.2,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 51,
    "Agriculture_Cover_Percent": 49,
    "Builtup_Cover_Percent": 4.9,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 16,
    "Drainage_Density": 0.92,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 152,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "dras-sub-basin-w-14",
    "Watershed_Name": "Salal Watershed",
    "Alternative_Names": [
      "Salal Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Dras Sub-Basin",
    "Parent_Watershed_ID": "dras-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Salal Stream",
    "Districts_Covered": [
      "Reasi"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.28,
    "Centroid_Longitude": 75.08,
    "Area_km2": 110,
    "Perimeter_km": 44,
    "Elevation_Min_m": 2020,
    "Elevation_Max_m": 2960,
    "Elevation_Mean_m": 2490,
    "Slope_Mean": 17.6,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 53,
    "Agriculture_Cover_Percent": 12,
    "Builtup_Cover_Percent": 5.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 18,
    "Drainage_Density": 0.96,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 156,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "nubra-sub-basin-w-15",
    "Watershed_Name": "Tawi Upper Watershed",
    "Alternative_Names": [
      "Tawi Upper Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Nubra Sub-Basin",
    "Parent_Watershed_ID": "nubra-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Tawi Upper Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.5,
    "Centroid_Longitude": 77.8,
    "Area_km2": 115,
    "Perimeter_km": 46,
    "Elevation_Min_m": 2050,
    "Elevation_Max_m": 3000,
    "Elevation_Mean_m": 2525,
    "Slope_Mean": 18,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 55,
    "Agriculture_Cover_Percent": 15,
    "Builtup_Cover_Percent": 5.5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 20,
    "Drainage_Density": 0.4,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 160,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-16",
    "Watershed_Name": "Tawi Lower Watershed",
    "Alternative_Names": [
      "Tawi Lower Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Tawi Sub-Basin",
    "Parent_Watershed_ID": "tawi-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Tawi Lower Stream",
    "Districts_Covered": [
      "Kishtwar"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.32,
    "Centroid_Longitude": 75.12,
    "Area_km2": 120,
    "Perimeter_km": 48,
    "Elevation_Min_m": 2080,
    "Elevation_Max_m": 3040,
    "Elevation_Mean_m": 2560,
    "Slope_Mean": 18.4,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 57,
    "Agriculture_Cover_Percent": 18,
    "Builtup_Cover_Percent": 5.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 22,
    "Drainage_Density": 0.44,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 164,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-17",
    "Watershed_Name": "Udhampur Watershed",
    "Alternative_Names": [
      "Udhampur Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Marusudar Sub-Basin",
    "Parent_Watershed_ID": "marusudar-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Udhampur Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.54,
    "Centroid_Longitude": 77.84,
    "Area_km2": 125,
    "Perimeter_km": 50,
    "Elevation_Min_m": 2110,
    "Elevation_Max_m": 3080,
    "Elevation_Mean_m": 2595,
    "Slope_Mean": 18.8,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 59,
    "Agriculture_Cover_Percent": 21,
    "Builtup_Cover_Percent": 1.0999999999999996,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 24,
    "Drainage_Density": 0.48,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 168,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-18",
    "Watershed_Name": "Jammu Plain Watershed",
    "Alternative_Names": [
      "Jammu Plain Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ujh Sub-Basin",
    "Parent_Watershed_ID": "ujh-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Jammu Plain Stream",
    "Districts_Covered": [
      "Rajouri"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.36,
    "Centroid_Longitude": 75.16,
    "Area_km2": 130,
    "Perimeter_km": 52,
    "Elevation_Min_m": 2140,
    "Elevation_Max_m": 3120,
    "Elevation_Mean_m": 2630,
    "Slope_Mean": 19.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 26,
    "Agriculture_Cover_Percent": 24,
    "Builtup_Cover_Percent": 1.3999999999999995,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 26,
    "Drainage_Density": 0.52,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 172,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "zanskar-sub-basin-w-19",
    "Watershed_Name": "Samba Plains Watershed",
    "Alternative_Names": [
      "Samba Plains Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Zanskar Sub-Basin",
    "Parent_Watershed_ID": "zanskar-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Samba Plains Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.58,
    "Centroid_Longitude": 77.88,
    "Area_km2": 135,
    "Perimeter_km": 54,
    "Elevation_Min_m": 2170,
    "Elevation_Max_m": 3160,
    "Elevation_Mean_m": 2665,
    "Slope_Mean": 19.6,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 28,
    "Agriculture_Cover_Percent": 27,
    "Builtup_Cover_Percent": 1.7000000000000002,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 28,
    "Drainage_Density": 0.56,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 176,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "shyok-sub-basin-w-20",
    "Watershed_Name": "Kathua Coastal Watershed",
    "Alternative_Names": [
      "Kathua Coastal Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shyok Sub-Basin",
    "Parent_Watershed_ID": "shyok-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Kathua Coastal Stream",
    "Districts_Covered": [
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.4,
    "Centroid_Longitude": 75.2,
    "Area_km2": 140,
    "Perimeter_km": 56,
    "Elevation_Min_m": 2200,
    "Elevation_Max_m": 3200,
    "Elevation_Mean_m": 2700,
    "Slope_Mean": 20,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 30,
    "Agriculture_Cover_Percent": 30,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 10,
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 180,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "suru-sub-basin-w-21",
    "Watershed_Name": "Ranjit Sagar Watershed",
    "Alternative_Names": [
      "Ranjit Sagar Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Suru Sub-Basin",
    "Parent_Watershed_ID": "suru-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Ranjit Sagar Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.62,
    "Centroid_Longitude": 77.92,
    "Area_km2": 145,
    "Perimeter_km": 58,
    "Elevation_Min_m": 2230,
    "Elevation_Max_m": 3240,
    "Elevation_Mean_m": 2735,
    "Slope_Mean": 20.4,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 32,
    "Agriculture_Cover_Percent": 33,
    "Builtup_Cover_Percent": 2.3,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 12,
    "Drainage_Density": 0.64,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 184,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "dras-sub-basin-w-22",
    "Watershed_Name": "Ujh River Upper Watershed",
    "Alternative_Names": [
      "Ujh River Upper Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Dras Sub-Basin",
    "Parent_Watershed_ID": "dras-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Ujh River Upper Stream",
    "Districts_Covered": [
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.44,
    "Centroid_Longitude": 75.24,
    "Area_km2": 150,
    "Perimeter_km": 60,
    "Elevation_Min_m": 2260,
    "Elevation_Max_m": 3280,
    "Elevation_Mean_m": 2770,
    "Slope_Mean": 20.8,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 34,
    "Agriculture_Cover_Percent": 36,
    "Builtup_Cover_Percent": 2.5999999999999996,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 14,
    "Drainage_Density": 0.68,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 188,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "nubra-sub-basin-w-23",
    "Watershed_Name": "Ujh River Lower Watershed",
    "Alternative_Names": [
      "Ujh River Lower Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Nubra Sub-Basin",
    "Parent_Watershed_ID": "nubra-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Ujh River Lower Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.66,
    "Centroid_Longitude": 77.96,
    "Area_km2": 155,
    "Perimeter_km": 62,
    "Elevation_Min_m": 2290,
    "Elevation_Max_m": 3320,
    "Elevation_Mean_m": 2805,
    "Slope_Mean": 21.2,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 36,
    "Agriculture_Cover_Percent": 39,
    "Builtup_Cover_Percent": 2.8999999999999995,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 16,
    "Drainage_Density": 0.72,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 192,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-24",
    "Watershed_Name": "Basantar Watershed",
    "Alternative_Names": [
      "Basantar Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Tawi Sub-Basin",
    "Parent_Watershed_ID": "tawi-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Basantar Stream",
    "Districts_Covered": [
      "Reasi"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.48,
    "Centroid_Longitude": 75.28,
    "Area_km2": 160,
    "Perimeter_km": 64,
    "Elevation_Min_m": 2320,
    "Elevation_Max_m": 3360,
    "Elevation_Mean_m": 2840,
    "Slope_Mean": 21.6,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 38,
    "Agriculture_Cover_Percent": 42,
    "Builtup_Cover_Percent": 3.1999999999999993,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 18,
    "Drainage_Density": 0.76,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 196,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-25",
    "Watershed_Name": "Devak Watershed",
    "Alternative_Names": [
      "Devak Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Marusudar Sub-Basin",
    "Parent_Watershed_ID": "marusudar-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Devak Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.7,
    "Centroid_Longitude": 78,
    "Area_km2": 165,
    "Perimeter_km": 66,
    "Elevation_Min_m": 2350,
    "Elevation_Max_m": 3400,
    "Elevation_Mean_m": 2875,
    "Slope_Mean": 22,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 40,
    "Agriculture_Cover_Percent": 45,
    "Builtup_Cover_Percent": 3.5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 20,
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 200,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-26",
    "Watershed_Name": "Kalakote Watershed",
    "Alternative_Names": [
      "Kalakote Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ujh Sub-Basin",
    "Parent_Watershed_ID": "ujh-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Kalakote Stream",
    "Districts_Covered": [
      "Kishtwar"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.52,
    "Centroid_Longitude": 75.32,
    "Area_km2": 170,
    "Perimeter_km": 68,
    "Elevation_Min_m": 2380,
    "Elevation_Max_m": 3440,
    "Elevation_Mean_m": 2910,
    "Slope_Mean": 22.4,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 42,
    "Agriculture_Cover_Percent": 48,
    "Builtup_Cover_Percent": 3.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 22,
    "Drainage_Density": 0.84,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 204,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "basantar-catchment",
    "Watershed_Name": "Basantar Catchment",
    "Alternative_Names": [
      "Basantar River Watershed",
      "Samba Plains Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Upper Watershed",
    "Parent_Watershed_ID": "tawi-sub-basin-w-0",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Basantar River",
    "Districts_Covered": [
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "CGWB / Samba District GIS Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 32.58,
    "Centroid_Longitude": 75.12,
    "Area_km2": 580,
    "Perimeter_km": 94,
    "Elevation_Min_m": 310,
    "Elevation_Max_m": 1200,
    "Elevation_Mean_m": 620,
    "Slope_Mean": 11.2,
    "Dominant_Landcover": "Agriculture & Scrubland",
    "Forest_Cover_Percent": 18.6,
    "Agriculture_Cover_Percent": 54.1,
    "Builtup_Cover_Percent": 11.2,
    "Wetland_Count": 1,
    "Lake_Count": 0,
    "Spring_Count": 8,
    "River_Length_km": 45,
    "Drainage_Density": 0.82,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "None",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "High",
    "Sediment_Load_Risk": "Moderate",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Plains reserve forest"
    ],
    "Drinking_Water_Linkages": [
      "Samba Industrial Area supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Basantar canal lift scheme"
    ],
    "Monitoring_Stations": [
      "Basantar Bridge Gauge Post"
    ],
    "Source_ID": "SRC-GOV-CGWB",
    "Source_URL": "http://cgwb.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Missing precise GIS boundary file. Delineated on regional agriculture development planning maps only.",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A dry, sub-tropical river catchment. Dries up to small trickles in summer but causes severe flash floods during monsoon."
  },
  {
    "Watershed_ID": "neeru-catchment",
    "Watershed_Name": "Neeru Catchment",
    "Alternative_Names": [
      "Neeru Nallah Watershed",
      "Bhaderwah Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Lower Watershed",
    "Parent_Watershed_ID": "marusudar-sub-basin-w-1",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Neeru Stream",
    "Districts_Covered": [
      "Doda"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "Jammu University Hydrological Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 32.98,
    "Centroid_Longitude": 75.72,
    "Area_km2": 382,
    "Perimeter_km": 84,
    "Elevation_Min_m": 900,
    "Elevation_Max_m": 3800,
    "Elevation_Mean_m": 2150,
    "Slope_Mean": 22.4,
    "Dominant_Landcover": "Coniferous Forest & Alpine Meadow",
    "Forest_Cover_Percent": 48.5,
    "Agriculture_Cover_Percent": 18.2,
    "Builtup_Cover_Percent": 4.6,
    "Wetland_Count": 0,
    "Lake_Count": 1,
    "Spring_Count": 14,
    "River_Length_km": 38,
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 190,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Moderate",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Bhaderwah Pine Forests"
    ],
    "Drinking_Water_Linkages": [
      "Bhaderwah Town Supply"
    ],
    "Hydropower_Linkages": [
      "Neeru Mini-HEP"
    ],
    "Irrigation_Linkages": [
      "Local hill irrigation kuls"
    ],
    "Monitoring_Stations": [
      "Bhaderwah Gauge Station"
    ],
    "Source_ID": "SRC-LEGACY-001",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Requires verification of boundary vectors against the J&K Irrigation Department catchment maps.",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A major cold-water stream catchment in the Bhaderwah valley. Excellent trout habitat, but threatened by urban extension."
  },
  {
    "Watershed_ID": "puga-geothermal-catchment",
    "Watershed_Name": "Puga Valley Geothermal Catchment",
    "Alternative_Names": [
      "Puga Catchment",
      "Puga Valley Watershed"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Marusudar Upper Watershed",
    "Parent_Watershed_ID": "ujh-sub-basin-w-2",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Puga Stream",
    "Districts_Covered": [
      "Leh"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (Ladakh)",
    "Boundary_Source": "ONGC Geothermal Delineation Project / CGWB",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.22,
    "Centroid_Longitude": 78.48,
    "Area_km2": 140,
    "Perimeter_km": 56,
    "Elevation_Min_m": 4400,
    "Elevation_Max_m": 5800,
    "Elevation_Mean_m": 4850,
    "Slope_Mean": 18.4,
    "Dominant_Landcover": "Cold Desert & Geothermal Formations",
    "Forest_Cover_Percent": 0,
    "Agriculture_Cover_Percent": 0,
    "Builtup_Cover_Percent": 1.4,
    "Wetland_Count": 2,
    "Lake_Count": 0,
    "Spring_Count": 45,
    "River_Length_km": 26,
    "Drainage_Density": 0.72,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 35,
    "Soil_Erosion_Risk": "Moderate",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "Moderate",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Puga Ramsar complex adjacency"
    ],
    "Drinking_Water_Linkages": [
      "None"
    ],
    "Hydropower_Linkages": [
      "Puga Geothermal Power Plant (Proposed)"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "Puga Borehole Gauge Post"
    ],
    "Source_ID": "SRC-LEGACY-001",
    "Source_URL": "http://cgwb.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A unique geothermal valley featuring hot springs, mud pools, and sulfur deposits. Ground temperatures at shallow depths exceed 130°C."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-0-c-0",
    "Watershed_Name": "Nowshera Catchment",
    "Alternative_Names": [
      "Nowshera Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Upper Watershed",
    "Parent_Watershed_ID": "tawi-sub-basin-w-0",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Nowshera Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.2,
    "Centroid_Longitude": 77.5,
    "Area_km2": 15,
    "Perimeter_km": 7.2,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 2200,
    "Elevation_Mean_m": 1900,
    "Slope_Mean": 14,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 20,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 5,
    "Drainage_Density": 0.5,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 80,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-1-c-1",
    "Watershed_Name": "Rajouri Upper Catchment",
    "Alternative_Names": [
      "Rajouri Upper Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Lower Watershed",
    "Parent_Watershed_ID": "marusudar-sub-basin-w-1",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Rajouri Upper Stream",
    "Districts_Covered": [
      "Rajouri"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.01,
    "Centroid_Longitude": 74.81,
    "Area_km2": 18,
    "Perimeter_km": 8.6,
    "Elevation_Min_m": 1625,
    "Elevation_Max_m": 2230,
    "Elevation_Mean_m": 1928,
    "Slope_Mean": 14.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 23,
    "Builtup_Cover_Percent": 2.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 6.5,
    "Drainage_Density": 0.55,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 83,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-2-c-2",
    "Watershed_Name": "Rajouri Lower Catchment",
    "Alternative_Names": [
      "Rajouri Lower Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Marusudar Upper Watershed",
    "Parent_Watershed_ID": "ujh-sub-basin-w-2",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Rajouri Lower Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.22,
    "Centroid_Longitude": 77.52,
    "Area_km2": 21,
    "Perimeter_km": 10.1,
    "Elevation_Min_m": 1650,
    "Elevation_Max_m": 2260,
    "Elevation_Mean_m": 1956,
    "Slope_Mean": 15,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 19,
    "Agriculture_Cover_Percent": 26,
    "Builtup_Cover_Percent": 2.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 8,
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 86,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "zanskar-sub-basin-w-3-c-3",
    "Watershed_Name": "Poonch Upper Catchment",
    "Alternative_Names": [
      "Poonch Upper Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Marusudar Lower Watershed",
    "Parent_Watershed_ID": "zanskar-sub-basin-w-3",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.03,
    "Centroid_Longitude": 74.83,
    "Area_km2": 24,
    "Perimeter_km": 11.5,
    "Elevation_Min_m": 1675,
    "Elevation_Max_m": 2290,
    "Elevation_Mean_m": 1984,
    "Slope_Mean": 15.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 21,
    "Agriculture_Cover_Percent": 29,
    "Builtup_Cover_Percent": 3.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 89,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shyok-sub-basin-w-4-c-4",
    "Watershed_Name": "Poonch Lower Catchment",
    "Alternative_Names": [
      "Poonch Lower Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Pakal Dul Watershed",
    "Parent_Watershed_ID": "shyok-sub-basin-w-4",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.24,
    "Centroid_Longitude": 77.54,
    "Area_km2": 27,
    "Perimeter_km": 13,
    "Elevation_Min_m": 1700,
    "Elevation_Max_m": 2320,
    "Elevation_Mean_m": 2012,
    "Slope_Mean": 16,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 23,
    "Agriculture_Cover_Percent": 32,
    "Builtup_Cover_Percent": 3.6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.7,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 92,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "suru-sub-basin-w-5-c-5",
    "Watershed_Name": "Suru Upper Catchment",
    "Alternative_Names": [
      "Suru Upper Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kiru Watershed",
    "Parent_Watershed_ID": "suru-sub-basin-w-5",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.05,
    "Centroid_Longitude": 74.85,
    "Area_km2": 30,
    "Perimeter_km": 14.4,
    "Elevation_Min_m": 1725,
    "Elevation_Max_m": 2350,
    "Elevation_Mean_m": 2040,
    "Slope_Mean": 16.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 35,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.75,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 95,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "dras-sub-basin-w-6-c-6",
    "Watershed_Name": "Suru Lower Catchment",
    "Alternative_Names": [
      "Suru Lower Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kwar Watershed",
    "Parent_Watershed_ID": "dras-sub-basin-w-6",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.26,
    "Centroid_Longitude": 77.56,
    "Area_km2": 33,
    "Perimeter_km": 15.8,
    "Elevation_Min_m": 1750,
    "Elevation_Max_m": 2380,
    "Elevation_Mean_m": 2068,
    "Slope_Mean": 17,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 38,
    "Builtup_Cover_Percent": 4.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 98,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "nubra-sub-basin-w-7-c-7",
    "Watershed_Name": "Sanku Catchment",
    "Alternative_Names": [
      "Sanku Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kishtwar Watershed",
    "Parent_Watershed_ID": "nubra-sub-basin-w-7",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Reasi"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.07,
    "Centroid_Longitude": 74.87,
    "Area_km2": 36,
    "Perimeter_km": 17.3,
    "Elevation_Min_m": 1775,
    "Elevation_Max_m": 2410,
    "Elevation_Mean_m": 2096,
    "Slope_Mean": 17.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 41,
    "Builtup_Cover_Percent": 4.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 101,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-8-c-8",
    "Watershed_Name": "Zanskar Upper Catchment",
    "Alternative_Names": [
      "Zanskar Upper Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Paddar Watershed",
    "Parent_Watershed_ID": "tawi-sub-basin-w-8",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.28,
    "Centroid_Longitude": 77.58,
    "Area_km2": 39,
    "Perimeter_km": 18.7,
    "Elevation_Min_m": 1800,
    "Elevation_Max_m": 2440,
    "Elevation_Mean_m": 2124,
    "Slope_Mean": 18,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 44,
    "Builtup_Cover_Percent": 5.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 104,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-9-c-9",
    "Watershed_Name": "Zanskar Lower Catchment",
    "Alternative_Names": [
      "Zanskar Lower Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Bhadarwah Watershed",
    "Parent_Watershed_ID": "marusudar-sub-basin-w-9",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kishtwar"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.09,
    "Centroid_Longitude": 74.89,
    "Area_km2": 42,
    "Perimeter_km": 20.2,
    "Elevation_Min_m": 1825,
    "Elevation_Max_m": 2470,
    "Elevation_Mean_m": 2152,
    "Slope_Mean": 18.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 47,
    "Builtup_Cover_Percent": 5.6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 107,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-10-c-10",
    "Watershed_Name": "Padum Catchment",
    "Alternative_Names": [
      "Padum Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Doda Watershed",
    "Parent_Watershed_ID": "ujh-sub-basin-w-10",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.3,
    "Centroid_Longitude": 77.6,
    "Area_km2": 45,
    "Perimeter_km": 21.6,
    "Elevation_Min_m": 1850,
    "Elevation_Max_m": 2500,
    "Elevation_Mean_m": 2180,
    "Slope_Mean": 19,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 50,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 110,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "zanskar-sub-basin-w-11-c-11",
    "Watershed_Name": "Stod Catchment",
    "Alternative_Names": [
      "Stod Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ramban Watershed",
    "Parent_Watershed_ID": "zanskar-sub-basin-w-11",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Rajouri"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.11,
    "Centroid_Longitude": 74.91,
    "Area_km2": 48,
    "Perimeter_km": 23,
    "Elevation_Min_m": 1875,
    "Elevation_Max_m": 2530,
    "Elevation_Mean_m": 2208,
    "Slope_Mean": 19.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 37,
    "Agriculture_Cover_Percent": 53,
    "Builtup_Cover_Percent": 6.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 113,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shyok-sub-basin-w-12-c-12",
    "Watershed_Name": "Tsarap Catchment",
    "Alternative_Names": [
      "Tsarap Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Baglihar Watershed",
    "Parent_Watershed_ID": "shyok-sub-basin-w-12",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.32,
    "Centroid_Longitude": 77.62,
    "Area_km2": 51,
    "Perimeter_km": 24.5,
    "Elevation_Min_m": 1900,
    "Elevation_Max_m": 2560,
    "Elevation_Mean_m": 2236,
    "Slope_Mean": 20,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 39,
    "Agriculture_Cover_Percent": 56,
    "Builtup_Cover_Percent": 6.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 116,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "suru-sub-basin-w-13-c-13",
    "Watershed_Name": "Shyok Upper Catchment",
    "Alternative_Names": [
      "Shyok Upper Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Reasi Watershed",
    "Parent_Watershed_ID": "suru-sub-basin-w-13",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.13,
    "Centroid_Longitude": 74.93,
    "Area_km2": 54,
    "Perimeter_km": 25.9,
    "Elevation_Min_m": 1925,
    "Elevation_Max_m": 2590,
    "Elevation_Mean_m": 2264,
    "Slope_Mean": 20.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 41,
    "Agriculture_Cover_Percent": 59,
    "Builtup_Cover_Percent": 7.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.15,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 119,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "dras-sub-basin-w-14-c-14",
    "Watershed_Name": "Shyok Lower Catchment",
    "Alternative_Names": [
      "Shyok Lower Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Salal Watershed",
    "Parent_Watershed_ID": "dras-sub-basin-w-14",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.34,
    "Centroid_Longitude": 77.64,
    "Area_km2": 57,
    "Perimeter_km": 27.4,
    "Elevation_Min_m": 1950,
    "Elevation_Max_m": 2620,
    "Elevation_Mean_m": 2292,
    "Slope_Mean": 21,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 43,
    "Agriculture_Cover_Percent": 22,
    "Builtup_Cover_Percent": 7.6000000000000005,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.5,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 122,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "nubra-sub-basin-w-15-c-15",
    "Watershed_Name": "Nubra Upper Catchment",
    "Alternative_Names": [
      "Nubra Upper Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Tawi Upper Watershed",
    "Parent_Watershed_ID": "nubra-sub-basin-w-15",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.15,
    "Centroid_Longitude": 74.95,
    "Area_km2": 60,
    "Perimeter_km": 28.8,
    "Elevation_Min_m": 1975,
    "Elevation_Max_m": 2650,
    "Elevation_Mean_m": 2320,
    "Slope_Mean": 21.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 25,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.55,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 125,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-16-c-16",
    "Watershed_Name": "Nubra Lower Catchment",
    "Alternative_Names": [
      "Nubra Lower Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Tawi Lower Watershed",
    "Parent_Watershed_ID": "tawi-sub-basin-w-16",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.36,
    "Centroid_Longitude": 77.66,
    "Area_km2": 63,
    "Perimeter_km": 30.2,
    "Elevation_Min_m": 2000,
    "Elevation_Max_m": 2680,
    "Elevation_Mean_m": 2348,
    "Slope_Mean": 22,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 28,
    "Builtup_Cover_Percent": 2.4000000000000004,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 128,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-17-c-17",
    "Watershed_Name": "Siachen snout Catchment",
    "Alternative_Names": [
      "Siachen snout Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Udhampur Watershed",
    "Parent_Watershed_ID": "marusudar-sub-basin-w-17",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Reasi"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.17,
    "Centroid_Longitude": 74.97,
    "Area_km2": 66,
    "Perimeter_km": 31.7,
    "Elevation_Min_m": 2025,
    "Elevation_Max_m": 2710,
    "Elevation_Mean_m": 2376,
    "Slope_Mean": 22.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 19,
    "Agriculture_Cover_Percent": 31,
    "Builtup_Cover_Percent": 2.8000000000000007,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 131,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-18-c-18",
    "Watershed_Name": "Puga geothermal Catchment",
    "Alternative_Names": [
      "Puga geothermal Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Jammu Plain Watershed",
    "Parent_Watershed_ID": "ujh-sub-basin-w-18",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.38,
    "Centroid_Longitude": 77.68,
    "Area_km2": 69,
    "Perimeter_km": 33.1,
    "Elevation_Min_m": 2050,
    "Elevation_Max_m": 2740,
    "Elevation_Mean_m": 2404,
    "Slope_Mean": 23,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 21,
    "Agriculture_Cover_Percent": 34,
    "Builtup_Cover_Percent": 3.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.7,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 134,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "zanskar-sub-basin-w-19-c-19",
    "Watershed_Name": "Hanle Catchment",
    "Alternative_Names": [
      "Hanle Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Samba Plains Watershed",
    "Parent_Watershed_ID": "zanskar-sub-basin-w-19",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kishtwar"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.19,
    "Centroid_Longitude": 74.99,
    "Area_km2": 72,
    "Perimeter_km": 34.6,
    "Elevation_Min_m": 2075,
    "Elevation_Max_m": 2770,
    "Elevation_Mean_m": 2432,
    "Slope_Mean": 23.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 23,
    "Agriculture_Cover_Percent": 37,
    "Builtup_Cover_Percent": 3.6000000000000005,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.75,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 137,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shyok-sub-basin-w-20-c-20",
    "Watershed_Name": "Chushul Catchment",
    "Alternative_Names": [
      "Chushul Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kathua Coastal Watershed",
    "Parent_Watershed_ID": "shyok-sub-basin-w-20",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.4,
    "Centroid_Longitude": 77.7,
    "Area_km2": 75,
    "Perimeter_km": 36,
    "Elevation_Min_m": 2100,
    "Elevation_Max_m": 2800,
    "Elevation_Mean_m": 2460,
    "Slope_Mean": 24,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 40,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "suru-sub-basin-w-21-c-21",
    "Watershed_Name": "Nyoma Catchment",
    "Alternative_Names": [
      "Nyoma Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ranjit Sagar Watershed",
    "Parent_Watershed_ID": "suru-sub-basin-w-21",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Rajouri"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.21,
    "Centroid_Longitude": 75.01,
    "Area_km2": 78,
    "Perimeter_km": 37.4,
    "Elevation_Min_m": 2125,
    "Elevation_Max_m": 2830,
    "Elevation_Mean_m": 2488,
    "Slope_Mean": 24.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 43,
    "Builtup_Cover_Percent": 4.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 143,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "dras-sub-basin-w-22-c-22",
    "Watershed_Name": "Demchok Catchment",
    "Alternative_Names": [
      "Demchok Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ujh River Upper Watershed",
    "Parent_Watershed_ID": "dras-sub-basin-w-22",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.42,
    "Centroid_Longitude": 77.72,
    "Area_km2": 81,
    "Perimeter_km": 38.9,
    "Elevation_Min_m": 2150,
    "Elevation_Max_m": 2860,
    "Elevation_Mean_m": 2516,
    "Slope_Mean": 25,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 46,
    "Builtup_Cover_Percent": 4.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 146,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "nubra-sub-basin-w-23-c-23",
    "Watershed_Name": "Changthang Catchment",
    "Alternative_Names": [
      "Changthang Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ujh River Lower Watershed",
    "Parent_Watershed_ID": "nubra-sub-basin-w-23",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.23,
    "Centroid_Longitude": 75.03,
    "Area_km2": 84,
    "Perimeter_km": 40.3,
    "Elevation_Min_m": 2175,
    "Elevation_Max_m": 2890,
    "Elevation_Mean_m": 2544,
    "Slope_Mean": 25.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 49,
    "Builtup_Cover_Percent": 5.200000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 149,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-24-c-24",
    "Watershed_Name": "Tso Kar Catchment",
    "Alternative_Names": [
      "Tso Kar Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Basantar Watershed",
    "Parent_Watershed_ID": "tawi-sub-basin-w-24",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.44,
    "Centroid_Longitude": 77.74,
    "Area_km2": 87,
    "Perimeter_km": 41.8,
    "Elevation_Min_m": 2200,
    "Elevation_Max_m": 2920,
    "Elevation_Mean_m": 2572,
    "Slope_Mean": 14,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 52,
    "Builtup_Cover_Percent": 5.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 152,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-25-c-25",
    "Watershed_Name": "Tso Moriri Catchment",
    "Alternative_Names": [
      "Tso Moriri Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Devak Watershed",
    "Parent_Watershed_ID": "marusudar-sub-basin-w-25",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.25,
    "Centroid_Longitude": 75.05,
    "Area_km2": 90,
    "Perimeter_km": 43.2,
    "Elevation_Min_m": 2225,
    "Elevation_Max_m": 2950,
    "Elevation_Mean_m": 2600,
    "Slope_Mean": 14.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 55,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 155,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-26-c-26",
    "Watershed_Name": "Pangong South Catchment",
    "Alternative_Names": [
      "Pangong South Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kalakote Watershed",
    "Parent_Watershed_ID": "ujh-sub-basin-w-26",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.46,
    "Centroid_Longitude": 77.76,
    "Area_km2": 93,
    "Perimeter_km": 44.6,
    "Elevation_Min_m": 2250,
    "Elevation_Max_m": 2980,
    "Elevation_Mean_m": 2628,
    "Slope_Mean": 15,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 37,
    "Agriculture_Cover_Percent": 58,
    "Builtup_Cover_Percent": 6.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 158,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-0-c-27",
    "Watershed_Name": "Pangong North Catchment",
    "Alternative_Names": [
      "Pangong North Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Upper Watershed",
    "Parent_Watershed_ID": "tawi-sub-basin-w-0",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Reasi"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.27,
    "Centroid_Longitude": 75.07,
    "Area_km2": 16,
    "Perimeter_km": 7.7,
    "Elevation_Min_m": 2275,
    "Elevation_Max_m": 3010,
    "Elevation_Mean_m": 2656,
    "Slope_Mean": 15.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 39,
    "Agriculture_Cover_Percent": 21,
    "Builtup_Cover_Percent": 6.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.15,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 161,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-1-c-28",
    "Watershed_Name": "Kiagar Catchment",
    "Alternative_Names": [
      "Kiagar Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Lower Watershed",
    "Parent_Watershed_ID": "marusudar-sub-basin-w-1",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.48,
    "Centroid_Longitude": 77.78,
    "Area_km2": 19,
    "Perimeter_km": 9.1,
    "Elevation_Min_m": 2300,
    "Elevation_Max_m": 3040,
    "Elevation_Mean_m": 2684,
    "Slope_Mean": 16,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 41,
    "Agriculture_Cover_Percent": 24,
    "Builtup_Cover_Percent": 7.200000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.5,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 164,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-2-c-29",
    "Watershed_Name": "Yaye Tso Catchment",
    "Alternative_Names": [
      "Yaye Tso Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Marusudar Upper Watershed",
    "Parent_Watershed_ID": "ujh-sub-basin-w-2",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kishtwar"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.29,
    "Centroid_Longitude": 75.09,
    "Area_km2": 22,
    "Perimeter_km": 10.6,
    "Elevation_Min_m": 2325,
    "Elevation_Max_m": 3070,
    "Elevation_Mean_m": 2712,
    "Slope_Mean": 16.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 43,
    "Agriculture_Cover_Percent": 27,
    "Builtup_Cover_Percent": 7.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.55,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 167,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "zanskar-sub-basin-w-3-c-30",
    "Watershed_Name": "Startsapuk Catchment",
    "Alternative_Names": [
      "Startsapuk Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Marusudar Lower Watershed",
    "Parent_Watershed_ID": "zanskar-sub-basin-w-3",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.5,
    "Centroid_Longitude": 77.8,
    "Area_km2": 25,
    "Perimeter_km": 12,
    "Elevation_Min_m": 2350,
    "Elevation_Max_m": 3100,
    "Elevation_Mean_m": 2740,
    "Slope_Mean": 17,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 30,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 170,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shyok-sub-basin-w-4-c-31",
    "Watershed_Name": "Shey Ponds Catchment",
    "Alternative_Names": [
      "Shey Ponds Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Pakal Dul Watershed",
    "Parent_Watershed_ID": "shyok-sub-basin-w-4",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Rajouri"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.31,
    "Centroid_Longitude": 75.11,
    "Area_km2": 28,
    "Perimeter_km": 13.4,
    "Elevation_Min_m": 2375,
    "Elevation_Max_m": 3130,
    "Elevation_Mean_m": 2768,
    "Slope_Mean": 17.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 33,
    "Builtup_Cover_Percent": 2.4000000000000004,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 173,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "suru-sub-basin-w-5-c-32",
    "Watershed_Name": "Stakna Catchment",
    "Alternative_Names": [
      "Stakna Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kiru Watershed",
    "Parent_Watershed_ID": "suru-sub-basin-w-5",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.52,
    "Centroid_Longitude": 77.82,
    "Area_km2": 31,
    "Perimeter_km": 14.9,
    "Elevation_Min_m": 2400,
    "Elevation_Max_m": 3160,
    "Elevation_Mean_m": 2796,
    "Slope_Mean": 18,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 19,
    "Agriculture_Cover_Percent": 36,
    "Builtup_Cover_Percent": 2.8000000000000007,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.7,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 176,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "dras-sub-basin-w-6-c-33",
    "Watershed_Name": "Basgo Catchment",
    "Alternative_Names": [
      "Basgo Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kwar Watershed",
    "Parent_Watershed_ID": "dras-sub-basin-w-6",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.33,
    "Centroid_Longitude": 75.13,
    "Area_km2": 34,
    "Perimeter_km": 16.3,
    "Elevation_Min_m": 2425,
    "Elevation_Max_m": 3190,
    "Elevation_Mean_m": 2824,
    "Slope_Mean": 18.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 21,
    "Agriculture_Cover_Percent": 39,
    "Builtup_Cover_Percent": 3.200000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.75,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 179,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "nubra-sub-basin-w-7-c-34",
    "Watershed_Name": "Likir Catchment",
    "Alternative_Names": [
      "Likir Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kishtwar Watershed",
    "Parent_Watershed_ID": "nubra-sub-basin-w-7",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.54,
    "Centroid_Longitude": 77.84,
    "Area_km2": 37,
    "Perimeter_km": 17.8,
    "Elevation_Min_m": 2450,
    "Elevation_Max_m": 3220,
    "Elevation_Mean_m": 2852,
    "Slope_Mean": 19,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 23,
    "Agriculture_Cover_Percent": 42,
    "Builtup_Cover_Percent": 3.6000000000000014,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 182,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-8-c-35",
    "Watershed_Name": "Phyang Catchment",
    "Alternative_Names": [
      "Phyang Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Paddar Watershed",
    "Parent_Watershed_ID": "tawi-sub-basin-w-8",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.35,
    "Centroid_Longitude": 75.15,
    "Area_km2": 40,
    "Perimeter_km": 19.2,
    "Elevation_Min_m": 2475,
    "Elevation_Max_m": 3250,
    "Elevation_Mean_m": 2880,
    "Slope_Mean": 19.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 45,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 185,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-9-c-36",
    "Watershed_Name": "Chemrey Catchment",
    "Alternative_Names": [
      "Chemrey Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Bhadarwah Watershed",
    "Parent_Watershed_ID": "marusudar-sub-basin-w-9",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.56,
    "Centroid_Longitude": 77.86,
    "Area_km2": 43,
    "Perimeter_km": 20.6,
    "Elevation_Min_m": 2500,
    "Elevation_Max_m": 3280,
    "Elevation_Mean_m": 2908,
    "Slope_Mean": 20,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 48,
    "Builtup_Cover_Percent": 4.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 188,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-10-c-37",
    "Watershed_Name": "Kargil Dras Catchment",
    "Alternative_Names": [
      "Kargil Dras Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Doda Watershed",
    "Parent_Watershed_ID": "ujh-sub-basin-w-10",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Reasi"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.37,
    "Centroid_Longitude": 75.17,
    "Area_km2": 46,
    "Perimeter_km": 22.1,
    "Elevation_Min_m": 2525,
    "Elevation_Max_m": 3310,
    "Elevation_Mean_m": 2936,
    "Slope_Mean": 20.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 51,
    "Builtup_Cover_Percent": 4.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 191,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "zanskar-sub-basin-w-11-c-38",
    "Watershed_Name": "Pensi La Catchment",
    "Alternative_Names": [
      "Pensi La Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ramban Watershed",
    "Parent_Watershed_ID": "zanskar-sub-basin-w-11",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.58,
    "Centroid_Longitude": 77.88,
    "Area_km2": 49,
    "Perimeter_km": 23.5,
    "Elevation_Min_m": 2550,
    "Elevation_Max_m": 3340,
    "Elevation_Mean_m": 2964,
    "Slope_Mean": 21,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 54,
    "Builtup_Cover_Percent": 5.200000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 194,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shyok-sub-basin-w-12-c-39",
    "Watershed_Name": "Drang Drung Catchment",
    "Alternative_Names": [
      "Drang Drung Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Baglihar Watershed",
    "Parent_Watershed_ID": "shyok-sub-basin-w-12",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kishtwar"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.39,
    "Centroid_Longitude": 75.19,
    "Area_km2": 52,
    "Perimeter_km": 25,
    "Elevation_Min_m": 2575,
    "Elevation_Max_m": 3370,
    "Elevation_Mean_m": 2992,
    "Slope_Mean": 21.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 57,
    "Builtup_Cover_Percent": 5.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 197,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "suru-sub-basin-w-13-c-40",
    "Watershed_Name": "Rangdum Catchment",
    "Alternative_Names": [
      "Rangdum Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Reasi Watershed",
    "Parent_Watershed_ID": "suru-sub-basin-w-13",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.6,
    "Centroid_Longitude": 77.9,
    "Area_km2": 55,
    "Perimeter_km": 26.4,
    "Elevation_Min_m": 2600,
    "Elevation_Max_m": 3400,
    "Elevation_Mean_m": 3020,
    "Slope_Mean": 22,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 20,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 200,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "dras-sub-basin-w-14-c-41",
    "Watershed_Name": "Sani Lake Catchment",
    "Alternative_Names": [
      "Sani Lake Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Salal Watershed",
    "Parent_Watershed_ID": "dras-sub-basin-w-14",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Rajouri"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.41,
    "Centroid_Longitude": 75.21,
    "Area_km2": 58,
    "Perimeter_km": 27.8,
    "Elevation_Min_m": 2625,
    "Elevation_Max_m": 3430,
    "Elevation_Mean_m": 3048,
    "Slope_Mean": 22.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 37,
    "Agriculture_Cover_Percent": 23,
    "Builtup_Cover_Percent": 6.400000000000002,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.15,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 203,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "nubra-sub-basin-w-15-c-42",
    "Watershed_Name": "Drass Upper Catchment",
    "Alternative_Names": [
      "Drass Upper Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Tawi Upper Watershed",
    "Parent_Watershed_ID": "nubra-sub-basin-w-15",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.62,
    "Centroid_Longitude": 77.92,
    "Area_km2": 61,
    "Perimeter_km": 29.3,
    "Elevation_Min_m": 2650,
    "Elevation_Max_m": 3460,
    "Elevation_Mean_m": 3076,
    "Slope_Mean": 23,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 39,
    "Agriculture_Cover_Percent": 26,
    "Builtup_Cover_Percent": 6.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.5,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 206,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-16-c-43",
    "Watershed_Name": "Drass Lower Catchment",
    "Alternative_Names": [
      "Drass Lower Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Tawi Lower Watershed",
    "Parent_Watershed_ID": "tawi-sub-basin-w-16",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.43,
    "Centroid_Longitude": 75.23,
    "Area_km2": 64,
    "Perimeter_km": 30.7,
    "Elevation_Min_m": 2675,
    "Elevation_Max_m": 3490,
    "Elevation_Mean_m": 3104,
    "Slope_Mean": 23.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 41,
    "Agriculture_Cover_Percent": 29,
    "Builtup_Cover_Percent": 7.199999999999999,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.55,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 209,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-17-c-44",
    "Watershed_Name": "Tiger Hill Catchment",
    "Alternative_Names": [
      "Tiger Hill Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Udhampur Watershed",
    "Parent_Watershed_ID": "marusudar-sub-basin-w-17",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.64,
    "Centroid_Longitude": 77.94,
    "Area_km2": 67,
    "Perimeter_km": 32.2,
    "Elevation_Min_m": 2700,
    "Elevation_Max_m": 3520,
    "Elevation_Mean_m": 3132,
    "Slope_Mean": 24,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 43,
    "Agriculture_Cover_Percent": 32,
    "Builtup_Cover_Percent": 7.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 212,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-18-c-45",
    "Watershed_Name": "Mushkoh Catchment",
    "Alternative_Names": [
      "Mushkoh Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Jammu Plain Watershed",
    "Parent_Watershed_ID": "ujh-sub-basin-w-18",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.45,
    "Centroid_Longitude": 75.25,
    "Area_km2": 70,
    "Perimeter_km": 33.6,
    "Elevation_Min_m": 2725,
    "Elevation_Max_m": 3550,
    "Elevation_Mean_m": 3160,
    "Slope_Mean": 24.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 35,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 215,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "zanskar-sub-basin-w-19-c-46",
    "Watershed_Name": "Batalik Catchment",
    "Alternative_Names": [
      "Batalik Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Samba Plains Watershed",
    "Parent_Watershed_ID": "zanskar-sub-basin-w-19",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.66,
    "Centroid_Longitude": 77.96,
    "Area_km2": 73,
    "Perimeter_km": 35,
    "Elevation_Min_m": 2750,
    "Elevation_Max_m": 3580,
    "Elevation_Mean_m": 3188,
    "Slope_Mean": 25,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 38,
    "Builtup_Cover_Percent": 2.400000000000002,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.7,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 218,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shyok-sub-basin-w-20-c-47",
    "Watershed_Name": "Shingo Catchment",
    "Alternative_Names": [
      "Shingo Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kathua Coastal Watershed",
    "Parent_Watershed_ID": "shyok-sub-basin-w-20",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Reasi"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.47,
    "Centroid_Longitude": 75.27,
    "Area_km2": 76,
    "Perimeter_km": 36.5,
    "Elevation_Min_m": 2775,
    "Elevation_Max_m": 3610,
    "Elevation_Mean_m": 3216,
    "Slope_Mean": 25.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 19,
    "Agriculture_Cover_Percent": 41,
    "Builtup_Cover_Percent": 2.8000000000000007,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.75,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 221,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "suru-sub-basin-w-21-c-48",
    "Watershed_Name": "Kishtwar Karst Catchment",
    "Alternative_Names": [
      "Kishtwar Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ranjit Sagar Watershed",
    "Parent_Watershed_ID": "suru-sub-basin-w-21",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.68,
    "Centroid_Longitude": 77.98,
    "Area_km2": 79,
    "Perimeter_km": 37.9,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 3640,
    "Elevation_Mean_m": 3244,
    "Slope_Mean": 14,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 21,
    "Agriculture_Cover_Percent": 44,
    "Builtup_Cover_Percent": 3.200000000000003,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 224,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "dras-sub-basin-w-22-c-49",
    "Watershed_Name": "Chenab Karst Catchment",
    "Alternative_Names": [
      "Chenab Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ujh River Upper Watershed",
    "Parent_Watershed_ID": "dras-sub-basin-w-22",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kishtwar"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.49,
    "Centroid_Longitude": 75.29,
    "Area_km2": 82,
    "Perimeter_km": 39.4,
    "Elevation_Min_m": 1625,
    "Elevation_Max_m": 3670,
    "Elevation_Mean_m": 3272,
    "Slope_Mean": 14.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 23,
    "Agriculture_Cover_Percent": 47,
    "Builtup_Cover_Percent": 3.6000000000000014,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 227,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "nubra-sub-basin-w-23-c-50",
    "Watershed_Name": "Tawi Karst Catchment",
    "Alternative_Names": [
      "Tawi Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ujh River Lower Watershed",
    "Parent_Watershed_ID": "nubra-sub-basin-w-23",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.7,
    "Centroid_Longitude": 78,
    "Area_km2": 85,
    "Perimeter_km": 40.8,
    "Elevation_Min_m": 1650,
    "Elevation_Max_m": 3700,
    "Elevation_Mean_m": 3300,
    "Slope_Mean": 15,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 50,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 80,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-24-c-51",
    "Watershed_Name": "Udhampur Karst Catchment",
    "Alternative_Names": [
      "Udhampur Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Basantar Watershed",
    "Parent_Watershed_ID": "tawi-sub-basin-w-24",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Rajouri"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.51,
    "Centroid_Longitude": 75.31,
    "Area_km2": 88,
    "Perimeter_km": 42.2,
    "Elevation_Min_m": 1675,
    "Elevation_Max_m": 3730,
    "Elevation_Mean_m": 3328,
    "Slope_Mean": 15.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 53,
    "Builtup_Cover_Percent": 4.400000000000002,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 83,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-25-c-52",
    "Watershed_Name": "Reasi Karst Catchment",
    "Alternative_Names": [
      "Reasi Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Devak Watershed",
    "Parent_Watershed_ID": "marusudar-sub-basin-w-25",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.72,
    "Centroid_Longitude": 78.02,
    "Area_km2": 91,
    "Perimeter_km": 43.7,
    "Elevation_Min_m": 1700,
    "Elevation_Max_m": 3760,
    "Elevation_Mean_m": 3356,
    "Slope_Mean": 16,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 56,
    "Builtup_Cover_Percent": 4.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 86,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-26-c-53",
    "Watershed_Name": "Doda Karst Catchment",
    "Alternative_Names": [
      "Doda Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kalakote Watershed",
    "Parent_Watershed_ID": "ujh-sub-basin-w-26",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.53,
    "Centroid_Longitude": 75.33,
    "Area_km2": 94,
    "Perimeter_km": 45.1,
    "Elevation_Min_m": 1725,
    "Elevation_Max_m": 3790,
    "Elevation_Mean_m": 3384,
    "Slope_Mean": 16.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 59,
    "Builtup_Cover_Percent": 5.200000000000003,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 89,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-0-c-54",
    "Watershed_Name": "Ramban Karst Catchment",
    "Alternative_Names": [
      "Ramban Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Upper Watershed",
    "Parent_Watershed_ID": "tawi-sub-basin-w-0",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.74,
    "Centroid_Longitude": 78.04,
    "Area_km2": 17,
    "Perimeter_km": 8.2,
    "Elevation_Min_m": 1750,
    "Elevation_Max_m": 3820,
    "Elevation_Mean_m": 3412,
    "Slope_Mean": 17,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 22,
    "Builtup_Cover_Percent": 5.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 92,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-1-c-55",
    "Watershed_Name": "Kathua Karst Catchment",
    "Alternative_Names": [
      "Kathua Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Lower Watershed",
    "Parent_Watershed_ID": "marusudar-sub-basin-w-1",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.55,
    "Centroid_Longitude": 75.35,
    "Area_km2": 20,
    "Perimeter_km": 9.6,
    "Elevation_Min_m": 1775,
    "Elevation_Max_m": 3850,
    "Elevation_Mean_m": 3440,
    "Slope_Mean": 17.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 25,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.15,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 95,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-2-c-56",
    "Watershed_Name": "Samba Karst Catchment",
    "Alternative_Names": [
      "Samba Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Marusudar Upper Watershed",
    "Parent_Watershed_ID": "ujh-sub-basin-w-2",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.76,
    "Centroid_Longitude": 78.06,
    "Area_km2": 23,
    "Perimeter_km": 11,
    "Elevation_Min_m": 1800,
    "Elevation_Max_m": 3880,
    "Elevation_Mean_m": 3468,
    "Slope_Mean": 18,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 37,
    "Agriculture_Cover_Percent": 28,
    "Builtup_Cover_Percent": 6.400000000000002,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.5,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 98,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "zanskar-sub-basin-w-3-c-57",
    "Watershed_Name": "Rajouri Karst Catchment",
    "Alternative_Names": [
      "Rajouri Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Marusudar Lower Watershed",
    "Parent_Watershed_ID": "zanskar-sub-basin-w-3",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Reasi"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.57,
    "Centroid_Longitude": 75.37,
    "Area_km2": 26,
    "Perimeter_km": 12.5,
    "Elevation_Min_m": 1825,
    "Elevation_Max_m": 3910,
    "Elevation_Mean_m": 3496,
    "Slope_Mean": 18.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 39,
    "Agriculture_Cover_Percent": 31,
    "Builtup_Cover_Percent": 6.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.55,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 101,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shyok-sub-basin-w-4-c-58",
    "Watershed_Name": "Leh Karst Catchment",
    "Alternative_Names": [
      "Leh Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Pakal Dul Watershed",
    "Parent_Watershed_ID": "shyok-sub-basin-w-4",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.78,
    "Centroid_Longitude": 78.08,
    "Area_km2": 29,
    "Perimeter_km": 13.9,
    "Elevation_Min_m": 1850,
    "Elevation_Max_m": 3940,
    "Elevation_Mean_m": 1924,
    "Slope_Mean": 19,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 41,
    "Agriculture_Cover_Percent": 34,
    "Builtup_Cover_Percent": 7.200000000000003,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 104,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "suru-sub-basin-w-5-c-59",
    "Watershed_Name": "Kargil Karst Catchment",
    "Alternative_Names": [
      "Kargil Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kiru Watershed",
    "Parent_Watershed_ID": "suru-sub-basin-w-5",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kishtwar"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.59,
    "Centroid_Longitude": 75.39,
    "Area_km2": 32,
    "Perimeter_km": 15.4,
    "Elevation_Min_m": 1875,
    "Elevation_Max_m": 3970,
    "Elevation_Mean_m": 1952,
    "Slope_Mean": 19.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 43,
    "Agriculture_Cover_Percent": 37,
    "Builtup_Cover_Percent": 7.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 107,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "dras-sub-basin-w-6-c-60",
    "Watershed_Name": "Zanskar Karst Catchment",
    "Alternative_Names": [
      "Zanskar Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kwar Watershed",
    "Parent_Watershed_ID": "dras-sub-basin-w-6",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.8,
    "Centroid_Longitude": 78.1,
    "Area_km2": 35,
    "Perimeter_km": 16.8,
    "Elevation_Min_m": 1900,
    "Elevation_Max_m": 4000,
    "Elevation_Mean_m": 1980,
    "Slope_Mean": 20,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 40,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.7,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 110,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "nubra-sub-basin-w-7-c-61",
    "Watershed_Name": "Nubra Karst Catchment",
    "Alternative_Names": [
      "Nubra Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kishtwar Watershed",
    "Parent_Watershed_ID": "nubra-sub-basin-w-7",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Rajouri"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.61,
    "Centroid_Longitude": 75.41,
    "Area_km2": 38,
    "Perimeter_km": 18.2,
    "Elevation_Min_m": 1925,
    "Elevation_Max_m": 4030,
    "Elevation_Mean_m": 2008,
    "Slope_Mean": 20.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 43,
    "Builtup_Cover_Percent": 2.400000000000002,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.75,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 113,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-8-c-62",
    "Watershed_Name": "Puga Karst Catchment",
    "Alternative_Names": [
      "Puga Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Paddar Watershed",
    "Parent_Watershed_ID": "tawi-sub-basin-w-8",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.82,
    "Centroid_Longitude": 78.12,
    "Area_km2": 41,
    "Perimeter_km": 19.7,
    "Elevation_Min_m": 1950,
    "Elevation_Max_m": 4060,
    "Elevation_Mean_m": 2036,
    "Slope_Mean": 21,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 19,
    "Agriculture_Cover_Percent": 46,
    "Builtup_Cover_Percent": 2.8000000000000007,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 116,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-9-c-63",
    "Watershed_Name": "Hanle Karst Catchment",
    "Alternative_Names": [
      "Hanle Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Bhadarwah Watershed",
    "Parent_Watershed_ID": "marusudar-sub-basin-w-9",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.63,
    "Centroid_Longitude": 75.43,
    "Area_km2": 44,
    "Perimeter_km": 21.1,
    "Elevation_Min_m": 1975,
    "Elevation_Max_m": 4090,
    "Elevation_Mean_m": 2064,
    "Slope_Mean": 21.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 21,
    "Agriculture_Cover_Percent": 49,
    "Builtup_Cover_Percent": 3.200000000000003,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 119,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-10-c-64",
    "Watershed_Name": "Chushul Karst Catchment",
    "Alternative_Names": [
      "Chushul Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Doda Watershed",
    "Parent_Watershed_ID": "ujh-sub-basin-w-10",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.84,
    "Centroid_Longitude": 78.14,
    "Area_km2": 47,
    "Perimeter_km": 22.6,
    "Elevation_Min_m": 2000,
    "Elevation_Max_m": 4120,
    "Elevation_Mean_m": 2092,
    "Slope_Mean": 22,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 23,
    "Agriculture_Cover_Percent": 52,
    "Builtup_Cover_Percent": 3.6000000000000014,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 122,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "zanskar-sub-basin-w-11-c-65",
    "Watershed_Name": "Nyoma Karst Catchment",
    "Alternative_Names": [
      "Nyoma Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ramban Watershed",
    "Parent_Watershed_ID": "zanskar-sub-basin-w-11",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.65,
    "Centroid_Longitude": 75.45,
    "Area_km2": 50,
    "Perimeter_km": 24,
    "Elevation_Min_m": 2025,
    "Elevation_Max_m": 4150,
    "Elevation_Mean_m": 2120,
    "Slope_Mean": 22.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 55,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 125,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shyok-sub-basin-w-12-c-66",
    "Watershed_Name": "Demchok Karst Catchment",
    "Alternative_Names": [
      "Demchok Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Baglihar Watershed",
    "Parent_Watershed_ID": "shyok-sub-basin-w-12",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.86,
    "Centroid_Longitude": 78.16,
    "Area_km2": 53,
    "Perimeter_km": 25.4,
    "Elevation_Min_m": 2050,
    "Elevation_Max_m": 4180,
    "Elevation_Mean_m": 2148,
    "Slope_Mean": 23,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 58,
    "Builtup_Cover_Percent": 4.400000000000002,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 128,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "suru-sub-basin-w-13-c-67",
    "Watershed_Name": "Changthang Karst Catchment",
    "Alternative_Names": [
      "Changthang Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Reasi Watershed",
    "Parent_Watershed_ID": "suru-sub-basin-w-13",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Reasi"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.67,
    "Centroid_Longitude": 75.47,
    "Area_km2": 56,
    "Perimeter_km": 26.9,
    "Elevation_Min_m": 2075,
    "Elevation_Max_m": 2210,
    "Elevation_Mean_m": 2176,
    "Slope_Mean": 23.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 21,
    "Builtup_Cover_Percent": 4.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 131,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "dras-sub-basin-w-14-c-68",
    "Watershed_Name": "Tso Kar Karst Catchment",
    "Alternative_Names": [
      "Tso Kar Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Salal Watershed",
    "Parent_Watershed_ID": "dras-sub-basin-w-14",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.88,
    "Centroid_Longitude": 78.18,
    "Area_km2": 59,
    "Perimeter_km": 28.3,
    "Elevation_Min_m": 2100,
    "Elevation_Max_m": 2240,
    "Elevation_Mean_m": 2204,
    "Slope_Mean": 24,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 24,
    "Builtup_Cover_Percent": 5.200000000000003,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 134,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "nubra-sub-basin-w-15-c-69",
    "Watershed_Name": "Tso Moriri Karst Catchment",
    "Alternative_Names": [
      "Tso Moriri Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Tawi Upper Watershed",
    "Parent_Watershed_ID": "nubra-sub-basin-w-15",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kishtwar"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.69,
    "Centroid_Longitude": 75.49,
    "Area_km2": 62,
    "Perimeter_km": 29.8,
    "Elevation_Min_m": 2125,
    "Elevation_Max_m": 2270,
    "Elevation_Mean_m": 2232,
    "Slope_Mean": 24.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 27,
    "Builtup_Cover_Percent": 5.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.15,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 137,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-16-c-70",
    "Watershed_Name": "Pangong Karst Catchment",
    "Alternative_Names": [
      "Pangong Karst Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Tawi Lower Watershed",
    "Parent_Watershed_ID": "tawi-sub-basin-w-16",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.9,
    "Centroid_Longitude": 78.2,
    "Area_km2": 65,
    "Perimeter_km": 31.2,
    "Elevation_Min_m": 2150,
    "Elevation_Max_m": 2300,
    "Elevation_Mean_m": 2260,
    "Slope_Mean": 25,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 30,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.5,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "tatapani-kalakote-spring-shed",
    "Watershed_Name": "Tatapani Kalakote Spring-Shed",
    "Alternative_Names": [
      "Tatta Pani Kalakote Catchment",
      "Tatta Pani Hot Spring Recharge Zone"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Basantar Catchment",
    "Parent_Watershed_ID": "basantar-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Kalakote Nallah / Tributary of Chenab",
    "Districts_Covered": [
      "Rajouri"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "Geochemical and Geothermal Delineation study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.2378,
    "Centroid_Longitude": 74.4119,
    "Area_km2": 45,
    "Perimeter_km": 32,
    "Elevation_Min_m": 650,
    "Elevation_Max_m": 1450,
    "Elevation_Mean_m": 950,
    "Slope_Mean": 14.5,
    "Dominant_Landcover": "Scrubs & Fractured Limestones",
    "Forest_Cover_Percent": 12.5,
    "Agriculture_Cover_Percent": 24.6,
    "Builtup_Cover_Percent": 8.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 12,
    "Drainage_Density": 0.72,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "None",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 48,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "Moderate",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "Critical",
    "Protected_Area_Linkages": [
      "Main Boundary Thrust Zone conservation area"
    ],
    "Drinking_Water_Linkages": [
      "Local Kalakote hot water distribution"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local terrace fields"
    ],
    "Monitoring_Stations": [
      "Tatta Pani Spring Temperature Monitor"
    ],
    "Source_ID": "SRC-LEGACY-001",
    "Source_URL": "https://phyddep.jk.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A geothermal aquifer system. The hot springs have high sulfur and radon content, emerging near the Main Boundary Thrust."
  },
  {
    "Watershed_ID": "panamik-spring-shed",
    "Watershed_Name": "Panamik Hot Spring Spring-Shed",
    "Alternative_Names": [
      "Panamik Geothermal Catchment",
      "Panamik Spring-Shed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neeru Catchment",
    "Parent_Watershed_ID": "neeru-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Nubra River",
    "Districts_Covered": [
      "Leh"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (Ladakh)",
    "Boundary_Source": "Geothermal Hydrology academic papers",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.7877,
    "Centroid_Longitude": 77.5332,
    "Area_km2": 28,
    "Perimeter_km": 24,
    "Elevation_Min_m": 3100,
    "Elevation_Max_m": 4500,
    "Elevation_Mean_m": 3600,
    "Slope_Mean": 21.5,
    "Dominant_Landcover": "Rocky Slopes & Scree",
    "Forest_Cover_Percent": 0.1,
    "Agriculture_Cover_Percent": 3.2,
    "Builtup_Cover_Percent": 2.4,
    "Wetland_Count": 1,
    "Lake_Count": 0,
    "Spring_Count": 3,
    "River_Length_km": 8,
    "Drainage_Density": 0.64,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "None",
    "Groundwater_Recharge_Value": 12,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Moderate",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Karakoram Pass transition zone"
    ],
    "Drinking_Water_Linkages": [
      "Panamik Local Baths Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Nubra Oasis Gardens"
    ],
    "Monitoring_Stations": [
      "Panamik Geothermal Temperature Monitor"
    ],
    "Source_ID": "SRC-LEGACY-001",
    "Source_URL": "https://indiawris.gov.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Hot spring recharge zone boundary demands hydrogeological structural validation along Karakoram fault line.",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Sulfur-rich thermal spring-shed along the Nubra River valley. Associated with structural fault lines of the Karakoram range."
  },
  {
    "Watershed_ID": "basantar-catchment-m-0",
    "Watershed_Name": "Kiagar Karst Micro-Watershed",
    "Alternative_Names": [
      "Kiagar Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Basantar Catchment",
    "Parent_Watershed_ID": "basantar-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Rajouri"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33,
    "Centroid_Longitude": 74.8,
    "Area_km2": 5,
    "Perimeter_km": 3,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 2000,
    "Elevation_Mean_m": 1800,
    "Slope_Mean": 16,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 5,
    "Agriculture_Cover_Percent": 30,
    "Builtup_Cover_Percent": 5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 50,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "neeru-catchment-m-1",
    "Watershed_Name": "Yaye Karst Micro-Watershed",
    "Alternative_Names": [
      "Yaye Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neeru Catchment",
    "Parent_Watershed_ID": "neeru-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.21,
    "Centroid_Longitude": 77.51,
    "Area_km2": 6,
    "Perimeter_km": 3.6,
    "Elevation_Min_m": 1620,
    "Elevation_Max_m": 2025,
    "Elevation_Mean_m": 1822,
    "Slope_Mean": 16.6,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 6,
    "Agriculture_Cover_Percent": 32,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.66,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 52,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "puga-geothermal-catchment-m-2",
    "Watershed_Name": "Startsapuk Karst Micro-Watershed",
    "Alternative_Names": [
      "Startsapuk Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Puga Valley Geothermal Catchment",
    "Parent_Watershed_ID": "puga-geothermal-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.02,
    "Centroid_Longitude": 74.82,
    "Area_km2": 7,
    "Perimeter_km": 4.2,
    "Elevation_Min_m": 1640,
    "Elevation_Max_m": 2050,
    "Elevation_Mean_m": 1844,
    "Slope_Mean": 17.2,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 7,
    "Agriculture_Cover_Percent": 34,
    "Builtup_Cover_Percent": 7,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.72,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 54,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-0-c-0-m-3",
    "Watershed_Name": "Shey Karst Micro-Watershed",
    "Alternative_Names": [
      "Shey Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Nowshera Catchment",
    "Parent_Watershed_ID": "tawi-sub-basin-w-0-c-0",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.23,
    "Centroid_Longitude": 77.53,
    "Area_km2": 8,
    "Perimeter_km": 4.8,
    "Elevation_Min_m": 1660,
    "Elevation_Max_m": 2075,
    "Elevation_Mean_m": 1866,
    "Slope_Mean": 17.8,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 8,
    "Agriculture_Cover_Percent": 36,
    "Builtup_Cover_Percent": 8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.78,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 56,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-1-c-1-m-4",
    "Watershed_Name": "Stakna Karst Micro-Watershed",
    "Alternative_Names": [
      "Stakna Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Rajouri Upper Catchment",
    "Parent_Watershed_ID": "marusudar-sub-basin-w-1-c-1",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.04,
    "Centroid_Longitude": 74.84,
    "Area_km2": 9,
    "Perimeter_km": 5.4,
    "Elevation_Min_m": 1680,
    "Elevation_Max_m": 2100,
    "Elevation_Mean_m": 1888,
    "Slope_Mean": 18.4,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 9,
    "Agriculture_Cover_Percent": 38,
    "Builtup_Cover_Percent": 9,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.84,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 58,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-2-c-2-m-5",
    "Watershed_Name": "Basgo Karst Micro-Watershed",
    "Alternative_Names": [
      "Basgo Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Rajouri Lower Catchment",
    "Parent_Watershed_ID": "ujh-sub-basin-w-2-c-2",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.25,
    "Centroid_Longitude": 77.55,
    "Area_km2": 10,
    "Perimeter_km": 6,
    "Elevation_Min_m": 1700,
    "Elevation_Max_m": 2125,
    "Elevation_Mean_m": 1910,
    "Slope_Mean": 19,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 10,
    "Agriculture_Cover_Percent": 40,
    "Builtup_Cover_Percent": 10,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 60,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "zanskar-sub-basin-w-3-c-3-m-6",
    "Watershed_Name": "Likir Karst Micro-Watershed",
    "Alternative_Names": [
      "Likir Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Poonch Upper Catchment",
    "Parent_Watershed_ID": "zanskar-sub-basin-w-3-c-3",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Reasi"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.06,
    "Centroid_Longitude": 74.86,
    "Area_km2": 11,
    "Perimeter_km": 6.6,
    "Elevation_Min_m": 1720,
    "Elevation_Max_m": 2150,
    "Elevation_Mean_m": 1932,
    "Slope_Mean": 19.6,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 11,
    "Agriculture_Cover_Percent": 42,
    "Builtup_Cover_Percent": 11,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.96,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 62,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "shyok-sub-basin-w-4-c-4-m-7",
    "Watershed_Name": "Phyang Karst Micro-Watershed",
    "Alternative_Names": [
      "Phyang Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Poonch Lower Catchment",
    "Parent_Watershed_ID": "shyok-sub-basin-w-4-c-4",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.27,
    "Centroid_Longitude": 77.57,
    "Area_km2": 12,
    "Perimeter_km": 7.2,
    "Elevation_Min_m": 1740,
    "Elevation_Max_m": 2175,
    "Elevation_Mean_m": 1954,
    "Slope_Mean": 20.2,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 12,
    "Agriculture_Cover_Percent": 44,
    "Builtup_Cover_Percent": 12,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.02,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 64,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "suru-sub-basin-w-5-c-5-m-8",
    "Watershed_Name": "Chemrey Karst Micro-Watershed",
    "Alternative_Names": [
      "Chemrey Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Suru Upper Catchment",
    "Parent_Watershed_ID": "suru-sub-basin-w-5-c-5",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kishtwar"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.08,
    "Centroid_Longitude": 74.88,
    "Area_km2": 13,
    "Perimeter_km": 7.8,
    "Elevation_Min_m": 1760,
    "Elevation_Max_m": 2200,
    "Elevation_Mean_m": 1976,
    "Slope_Mean": 20.8,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 13,
    "Agriculture_Cover_Percent": 46,
    "Builtup_Cover_Percent": 13,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.08,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 66,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "dras-sub-basin-w-6-c-6-m-9",
    "Watershed_Name": "Kargil Karst Micro-Watershed",
    "Alternative_Names": [
      "Kargil Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Suru Lower Catchment",
    "Parent_Watershed_ID": "dras-sub-basin-w-6-c-6",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.29,
    "Centroid_Longitude": 77.59,
    "Area_km2": 14,
    "Perimeter_km": 8.4,
    "Elevation_Min_m": 1780,
    "Elevation_Max_m": 2225,
    "Elevation_Mean_m": 1998,
    "Slope_Mean": 21.4,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 14,
    "Agriculture_Cover_Percent": 48,
    "Builtup_Cover_Percent": 14,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.14,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 68,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "nubra-sub-basin-w-7-c-7-m-10",
    "Watershed_Name": "Pensi Karst Micro-Watershed",
    "Alternative_Names": [
      "Pensi Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sanku Catchment",
    "Parent_Watershed_ID": "nubra-sub-basin-w-7-c-7",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Rajouri"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.1,
    "Centroid_Longitude": 74.9,
    "Area_km2": 15,
    "Perimeter_km": 9,
    "Elevation_Min_m": 1800,
    "Elevation_Max_m": 2250,
    "Elevation_Mean_m": 2020,
    "Slope_Mean": 22,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 50,
    "Builtup_Cover_Percent": 15,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.2,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 70,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "tawi-sub-basin-w-8-c-8-m-11",
    "Watershed_Name": "Drang Karst Micro-Watershed",
    "Alternative_Names": [
      "Drang Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Zanskar Upper Catchment",
    "Parent_Watershed_ID": "tawi-sub-basin-w-8-c-8",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.31,
    "Centroid_Longitude": 77.61,
    "Area_km2": 16,
    "Perimeter_km": 9.6,
    "Elevation_Min_m": 1820,
    "Elevation_Max_m": 2275,
    "Elevation_Mean_m": 2042,
    "Slope_Mean": 22.6,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 16,
    "Agriculture_Cover_Percent": 52,
    "Builtup_Cover_Percent": 16,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.26,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 72,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "marusudar-sub-basin-w-9-c-9-m-12",
    "Watershed_Name": "Rangdum Karst Micro-Watershed",
    "Alternative_Names": [
      "Rangdum Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Zanskar Lower Catchment",
    "Parent_Watershed_ID": "marusudar-sub-basin-w-9-c-9",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Jammu"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.12,
    "Centroid_Longitude": 74.92,
    "Area_km2": 17,
    "Perimeter_km": 10.2,
    "Elevation_Min_m": 1840,
    "Elevation_Max_m": 2300,
    "Elevation_Mean_m": 2064,
    "Slope_Mean": 23.2,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 54,
    "Builtup_Cover_Percent": 17,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.32,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 74,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "ujh-sub-basin-w-10-c-10-m-13",
    "Watershed_Name": "Sani Karst Micro-Watershed",
    "Alternative_Names": [
      "Sani Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Padum Catchment",
    "Parent_Watershed_ID": "ujh-sub-basin-w-10-c-10",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.33,
    "Centroid_Longitude": 77.63,
    "Area_km2": 18,
    "Perimeter_km": 10.8,
    "Elevation_Min_m": 1860,
    "Elevation_Max_m": 2325,
    "Elevation_Mean_m": 2086,
    "Slope_Mean": 23.8,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 18,
    "Agriculture_Cover_Percent": 56,
    "Builtup_Cover_Percent": 18,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.38,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 76,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "zanskar-sub-basin-w-11-c-11-m-14",
    "Watershed_Name": "Drass Karst Micro-Watershed",
    "Alternative_Names": [
      "Drass Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Stod Catchment",
    "Parent_Watershed_ID": "zanskar-sub-basin-w-11-c-11",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Samba"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.14,
    "Centroid_Longitude": 74.94,
    "Area_km2": 19,
    "Perimeter_km": 11.4,
    "Elevation_Min_m": 1880,
    "Elevation_Max_m": 2350,
    "Elevation_Mean_m": 2108,
    "Slope_Mean": 24.4,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 19,
    "Agriculture_Cover_Percent": 58,
    "Builtup_Cover_Percent": 19,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.64,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 78,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "shyok-sub-basin-w-12-c-12-m-15",
    "Watershed_Name": "Tiger Karst Micro-Watershed",
    "Alternative_Names": [
      "Tiger Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Tsarap Catchment",
    "Parent_Watershed_ID": "shyok-sub-basin-w-12-c-12",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.35,
    "Centroid_Longitude": 77.65,
    "Area_km2": 20,
    "Perimeter_km": 12,
    "Elevation_Min_m": 1900,
    "Elevation_Max_m": 2375,
    "Elevation_Mean_m": 2130,
    "Slope_Mean": 25,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 20,
    "Agriculture_Cover_Percent": 60,
    "Builtup_Cover_Percent": 5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.7,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 80,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "suru-sub-basin-w-13-c-13-m-16",
    "Watershed_Name": "Mushkoh Karst Micro-Watershed",
    "Alternative_Names": [
      "Mushkoh Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shyok Upper Catchment",
    "Parent_Watershed_ID": "suru-sub-basin-w-13-c-13",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Reasi"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.16,
    "Centroid_Longitude": 74.96,
    "Area_km2": 21,
    "Perimeter_km": 12.6,
    "Elevation_Min_m": 1920,
    "Elevation_Max_m": 2400,
    "Elevation_Mean_m": 2152,
    "Slope_Mean": 25.6,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 21,
    "Agriculture_Cover_Percent": 62,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.76,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 82,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "dras-sub-basin-w-14-c-14-m-17",
    "Watershed_Name": "Batalik Karst Micro-Watershed",
    "Alternative_Names": [
      "Batalik Karst Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shyok Lower Catchment",
    "Parent_Watershed_ID": "dras-sub-basin-w-14-c-14",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.37,
    "Centroid_Longitude": 77.67,
    "Area_km2": 22,
    "Perimeter_km": 13.2,
    "Elevation_Min_m": 1940,
    "Elevation_Max_m": 2425,
    "Elevation_Mean_m": 2174,
    "Slope_Mean": 16.2,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 22,
    "Agriculture_Cover_Percent": 64,
    "Builtup_Cover_Percent": 7,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.82,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 84,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-0",
    "Watershed_Name": "Neelum Upper Watershed",
    "Alternative_Names": [
      "Neelum Upper Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum AJK Basin",
    "Parent_Watershed_ID": "neelum-ajk-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Neelum Upper Stream",
    "Districts_Covered": [
      "Muzaffarabad"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.3,
    "Centroid_Longitude": 73.8,
    "Area_km2": 40,
    "Perimeter_km": 16,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 2400,
    "Elevation_Mean_m": 2000,
    "Slope_Mean": 12,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 10,
    "Builtup_Cover_Percent": 1,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 10,
    "Drainage_Density": 0.4,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 100,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-1",
    "Watershed_Name": "Neelum Lower Watershed",
    "Alternative_Names": [
      "Neelum Lower Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hunza Sub-Basin",
    "Parent_Watershed_ID": "hunza-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Neelum Lower Stream",
    "Districts_Covered": [
      "Hunza"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.52,
    "Centroid_Longitude": 74.52,
    "Area_km2": 45,
    "Perimeter_km": 18,
    "Elevation_Min_m": 1630,
    "Elevation_Max_m": 2440,
    "Elevation_Mean_m": 2035,
    "Slope_Mean": 12.4,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 13,
    "Builtup_Cover_Percent": 1.3,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 12,
    "Drainage_Density": 0.44,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 104,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-2",
    "Watershed_Name": "Muzaffarabad Jhelum Watershed",
    "Alternative_Names": [
      "Muzaffarabad Jhelum Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Gilgit Sub-Basin",
    "Parent_Watershed_ID": "gilgit-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Muzaffarabad Jhelum Stream",
    "Districts_Covered": [
      "Hattian Bala"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.34,
    "Centroid_Longitude": 73.84,
    "Area_km2": 50,
    "Perimeter_km": 20,
    "Elevation_Min_m": 1660,
    "Elevation_Max_m": 2480,
    "Elevation_Mean_m": 2070,
    "Slope_Mean": 12.8,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 16,
    "Builtup_Cover_Percent": 1.6,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 14,
    "Drainage_Density": 0.48,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 108,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-3",
    "Watershed_Name": "Kotli Poonch Watershed",
    "Alternative_Names": [
      "Kotli Poonch Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shigar Sub-Basin",
    "Parent_Watershed_ID": "shigar-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Kotli Poonch Stream",
    "Districts_Covered": [
      "Ghizer"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.56,
    "Centroid_Longitude": 74.56,
    "Area_km2": 55,
    "Perimeter_km": 22,
    "Elevation_Min_m": 1690,
    "Elevation_Max_m": 2520,
    "Elevation_Mean_m": 2105,
    "Slope_Mean": 13.2,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 19,
    "Builtup_Cover_Percent": 1.9,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 16,
    "Drainage_Density": 0.52,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 112,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "astore-sub-basin-w-4",
    "Watershed_Name": "Mirpur Mangla Watershed",
    "Alternative_Names": [
      "Mirpur Mangla Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Astore Sub-Basin",
    "Parent_Watershed_ID": "astore-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Mirpur Mangla Stream",
    "Districts_Covered": [
      "Haveli"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.38,
    "Centroid_Longitude": 73.88,
    "Area_km2": 60,
    "Perimeter_km": 24,
    "Elevation_Min_m": 1720,
    "Elevation_Max_m": 2560,
    "Elevation_Mean_m": 2140,
    "Slope_Mean": 13.6,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 22,
    "Builtup_Cover_Percent": 2.2,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 18,
    "Drainage_Density": 0.56,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 116,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-5",
    "Watershed_Name": "Bhimber plains Watershed",
    "Alternative_Names": [
      "Bhimber plains Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum AJK Basin",
    "Parent_Watershed_ID": "neelum-ajk-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Bhimber plains Stream",
    "Districts_Covered": [
      "Astore"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.6,
    "Centroid_Longitude": 74.6,
    "Area_km2": 65,
    "Perimeter_km": 26,
    "Elevation_Min_m": 1750,
    "Elevation_Max_m": 2600,
    "Elevation_Mean_m": 2175,
    "Slope_Mean": 14,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 25,
    "Builtup_Cover_Percent": 2.5,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 20,
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 120,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-6",
    "Watershed_Name": "Hattian Bala Watershed",
    "Alternative_Names": [
      "Hattian Bala Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hunza Sub-Basin",
    "Parent_Watershed_ID": "hunza-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Hattian Bala Stream",
    "Districts_Covered": [
      "Sudhnoti"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.42,
    "Centroid_Longitude": 73.92,
    "Area_km2": 70,
    "Perimeter_km": 28,
    "Elevation_Min_m": 1780,
    "Elevation_Max_m": 2640,
    "Elevation_Mean_m": 2210,
    "Slope_Mean": 14.4,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 37,
    "Agriculture_Cover_Percent": 28,
    "Builtup_Cover_Percent": 2.8,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 22,
    "Drainage_Density": 0.64,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 124,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-7",
    "Watershed_Name": "Kunhar Joint Watershed",
    "Alternative_Names": [
      "Kunhar Joint Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Gilgit Sub-Basin",
    "Parent_Watershed_ID": "gilgit-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Kunhar Joint Stream",
    "Districts_Covered": [
      "Shigar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.64,
    "Centroid_Longitude": 74.64,
    "Area_km2": 75,
    "Perimeter_km": 30,
    "Elevation_Min_m": 1810,
    "Elevation_Max_m": 2680,
    "Elevation_Mean_m": 2245,
    "Slope_Mean": 14.8,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 39,
    "Agriculture_Cover_Percent": 31,
    "Builtup_Cover_Percent": 3.1,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 24,
    "Drainage_Density": 0.68,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 128,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-8",
    "Watershed_Name": "Hunza Upper Watershed",
    "Alternative_Names": [
      "Hunza Upper Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shigar Sub-Basin",
    "Parent_Watershed_ID": "shigar-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Hunza Upper Stream",
    "Districts_Covered": [
      "Mirpur"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.46,
    "Centroid_Longitude": 73.96,
    "Area_km2": 80,
    "Perimeter_km": 32,
    "Elevation_Min_m": 1840,
    "Elevation_Max_m": 2720,
    "Elevation_Mean_m": 2280,
    "Slope_Mean": 15.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 41,
    "Agriculture_Cover_Percent": 34,
    "Builtup_Cover_Percent": 3.4,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 26,
    "Drainage_Density": 0.72,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 132,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "astore-sub-basin-w-9",
    "Watershed_Name": "Hunza Lower Watershed",
    "Alternative_Names": [
      "Hunza Lower Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Astore Sub-Basin",
    "Parent_Watershed_ID": "astore-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Hunza Lower Stream",
    "Districts_Covered": [
      "Ghanche"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.68,
    "Centroid_Longitude": 74.68,
    "Area_km2": 85,
    "Perimeter_km": 34,
    "Elevation_Min_m": 1870,
    "Elevation_Max_m": 2760,
    "Elevation_Mean_m": 2315,
    "Slope_Mean": 15.6,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 43,
    "Agriculture_Cover_Percent": 37,
    "Builtup_Cover_Percent": 3.6999999999999997,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 28,
    "Drainage_Density": 0.76,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 136,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-10",
    "Watershed_Name": "Gilgit Upper Watershed",
    "Alternative_Names": [
      "Gilgit Upper Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum AJK Basin",
    "Parent_Watershed_ID": "neelum-ajk-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Gilgit Upper Stream",
    "Districts_Covered": [
      "Muzaffarabad"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.5,
    "Centroid_Longitude": 74,
    "Area_km2": 90,
    "Perimeter_km": 36,
    "Elevation_Min_m": 1900,
    "Elevation_Max_m": 2800,
    "Elevation_Mean_m": 2350,
    "Slope_Mean": 16,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 45,
    "Agriculture_Cover_Percent": 40,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 10,
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-11",
    "Watershed_Name": "Gilgit Lower Watershed",
    "Alternative_Names": [
      "Gilgit Lower Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hunza Sub-Basin",
    "Parent_Watershed_ID": "hunza-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Gilgit Lower Stream",
    "Districts_Covered": [
      "Hunza"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.72,
    "Centroid_Longitude": 74.72,
    "Area_km2": 95,
    "Perimeter_km": 38,
    "Elevation_Min_m": 1930,
    "Elevation_Max_m": 2840,
    "Elevation_Mean_m": 2385,
    "Slope_Mean": 16.4,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 47,
    "Agriculture_Cover_Percent": 43,
    "Builtup_Cover_Percent": 4.3,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 12,
    "Drainage_Density": 0.84,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 144,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-12",
    "Watershed_Name": "Astore Upper Watershed",
    "Alternative_Names": [
      "Astore Upper Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Gilgit Sub-Basin",
    "Parent_Watershed_ID": "gilgit-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Astore Upper Stream",
    "Districts_Covered": [
      "Hattian Bala"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.54,
    "Centroid_Longitude": 74.04,
    "Area_km2": 100,
    "Perimeter_km": 40,
    "Elevation_Min_m": 1960,
    "Elevation_Max_m": 2880,
    "Elevation_Mean_m": 2420,
    "Slope_Mean": 16.8,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 49,
    "Agriculture_Cover_Percent": 46,
    "Builtup_Cover_Percent": 4.6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 14,
    "Drainage_Density": 0.88,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 148,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-13",
    "Watershed_Name": "Astore Lower Watershed",
    "Alternative_Names": [
      "Astore Lower Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shigar Sub-Basin",
    "Parent_Watershed_ID": "shigar-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Astore Lower Stream",
    "Districts_Covered": [
      "Ghizer"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.76,
    "Centroid_Longitude": 74.76,
    "Area_km2": 105,
    "Perimeter_km": 42,
    "Elevation_Min_m": 1990,
    "Elevation_Max_m": 2920,
    "Elevation_Mean_m": 2455,
    "Slope_Mean": 17.2,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 51,
    "Agriculture_Cover_Percent": 49,
    "Builtup_Cover_Percent": 4.9,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 16,
    "Drainage_Density": 0.92,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 152,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "astore-sub-basin-w-14",
    "Watershed_Name": "Shigar Glacial Watershed",
    "Alternative_Names": [
      "Shigar Glacial Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Astore Sub-Basin",
    "Parent_Watershed_ID": "astore-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Shigar Glacial Stream",
    "Districts_Covered": [
      "Haveli"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.58,
    "Centroid_Longitude": 74.08,
    "Area_km2": 110,
    "Perimeter_km": 44,
    "Elevation_Min_m": 2020,
    "Elevation_Max_m": 2960,
    "Elevation_Mean_m": 2490,
    "Slope_Mean": 17.6,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 53,
    "Agriculture_Cover_Percent": 12,
    "Builtup_Cover_Percent": 5.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 18,
    "Drainage_Density": 0.96,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 156,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-15",
    "Watershed_Name": "Kharmang Indus Watershed",
    "Alternative_Names": [
      "Kharmang Indus Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum AJK Basin",
    "Parent_Watershed_ID": "neelum-ajk-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Kharmang Indus Stream",
    "Districts_Covered": [
      "Astore"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.8,
    "Centroid_Longitude": 74.8,
    "Area_km2": 115,
    "Perimeter_km": 46,
    "Elevation_Min_m": 2050,
    "Elevation_Max_m": 3000,
    "Elevation_Mean_m": 2525,
    "Slope_Mean": 18,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 55,
    "Agriculture_Cover_Percent": 15,
    "Builtup_Cover_Percent": 5.5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 20,
    "Drainage_Density": 0.4,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 160,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-16",
    "Watershed_Name": "Ghanche Shyok Watershed",
    "Alternative_Names": [
      "Ghanche Shyok Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hunza Sub-Basin",
    "Parent_Watershed_ID": "hunza-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Ghanche Shyok Stream",
    "Districts_Covered": [
      "Sudhnoti"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.62,
    "Centroid_Longitude": 74.12,
    "Area_km2": 120,
    "Perimeter_km": 48,
    "Elevation_Min_m": 2080,
    "Elevation_Max_m": 3040,
    "Elevation_Mean_m": 2560,
    "Slope_Mean": 18.4,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 57,
    "Agriculture_Cover_Percent": 18,
    "Builtup_Cover_Percent": 5.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 22,
    "Drainage_Density": 0.44,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 164,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-17",
    "Watershed_Name": "Hispar snout Watershed",
    "Alternative_Names": [
      "Hispar snout Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Gilgit Sub-Basin",
    "Parent_Watershed_ID": "gilgit-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Hispar snout Stream",
    "Districts_Covered": [
      "Shigar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.84,
    "Centroid_Longitude": 74.84,
    "Area_km2": 125,
    "Perimeter_km": 50,
    "Elevation_Min_m": 2110,
    "Elevation_Max_m": 3080,
    "Elevation_Mean_m": 2595,
    "Slope_Mean": 18.8,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 59,
    "Agriculture_Cover_Percent": 21,
    "Builtup_Cover_Percent": 1.0999999999999996,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 24,
    "Drainage_Density": 0.48,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 168,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-18",
    "Watershed_Name": "Batura snout Watershed",
    "Alternative_Names": [
      "Batura snout Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shigar Sub-Basin",
    "Parent_Watershed_ID": "shigar-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Batura snout Stream",
    "Districts_Covered": [
      "Mirpur"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.66,
    "Centroid_Longitude": 74.16,
    "Area_km2": 130,
    "Perimeter_km": 52,
    "Elevation_Min_m": 2140,
    "Elevation_Max_m": 3120,
    "Elevation_Mean_m": 2630,
    "Slope_Mean": 19.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 26,
    "Agriculture_Cover_Percent": 24,
    "Builtup_Cover_Percent": 1.3999999999999995,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 26,
    "Drainage_Density": 0.52,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 172,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "astore-sub-basin-w-19",
    "Watershed_Name": "Naltar Watershed",
    "Alternative_Names": [
      "Naltar Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Astore Sub-Basin",
    "Parent_Watershed_ID": "astore-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Naltar Stream",
    "Districts_Covered": [
      "Ghanche"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.88,
    "Centroid_Longitude": 74.88,
    "Area_km2": 135,
    "Perimeter_km": 54,
    "Elevation_Min_m": 2170,
    "Elevation_Max_m": 3160,
    "Elevation_Mean_m": 2665,
    "Slope_Mean": 19.6,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 28,
    "Agriculture_Cover_Percent": 27,
    "Builtup_Cover_Percent": 1.7000000000000002,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 28,
    "Drainage_Density": 0.56,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 176,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-20",
    "Watershed_Name": "Ghizer Upper Watershed",
    "Alternative_Names": [
      "Ghizer Upper Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum AJK Basin",
    "Parent_Watershed_ID": "neelum-ajk-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Ghizer Upper Stream",
    "Districts_Covered": [
      "Muzaffarabad"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.7,
    "Centroid_Longitude": 74.2,
    "Area_km2": 140,
    "Perimeter_km": 56,
    "Elevation_Min_m": 2200,
    "Elevation_Max_m": 3200,
    "Elevation_Mean_m": 2700,
    "Slope_Mean": 20,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 30,
    "Agriculture_Cover_Percent": 30,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 10,
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 180,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-21",
    "Watershed_Name": "Yasin Watershed",
    "Alternative_Names": [
      "Yasin Local Watershed"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hunza Sub-Basin",
    "Parent_Watershed_ID": "hunza-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Yasin Stream",
    "Districts_Covered": [
      "Hunza"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Drainage Line Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.92,
    "Centroid_Longitude": 74.92,
    "Area_km2": 145,
    "Perimeter_km": 58,
    "Elevation_Min_m": 2230,
    "Elevation_Max_m": 3240,
    "Elevation_Mean_m": 2735,
    "Slope_Mean": 20.4,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 32,
    "Agriculture_Cover_Percent": 33,
    "Builtup_Cover_Percent": 2.3,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 12,
    "Drainage_Density": 0.64,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 184,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Basin Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 3: Watershed."
  },
  {
    "Watershed_ID": "poonch-ajk-catchment",
    "Watershed_Name": "Poonch AJK Catchment",
    "Alternative_Names": [
      "Poonch River Watershed AJK",
      "Poonch Basin"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum Upper Watershed",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-0",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Poonch River",
    "Districts_Covered": [
      "Poonch (AJK)",
      "Kotli",
      "Mirpur"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (AJK)",
    "Boundary_Source": "PCRWR / AJK EPA",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.52,
    "Centroid_Longitude": 73.88,
    "Area_km2": 3200,
    "Perimeter_km": 220,
    "Elevation_Min_m": 350,
    "Elevation_Max_m": 4100,
    "Elevation_Mean_m": 1650,
    "Slope_Mean": 19.4,
    "Dominant_Landcover": "Subtropical Forest & Scrub",
    "Forest_Cover_Percent": 38.6,
    "Agriculture_Cover_Percent": 36.4,
    "Builtup_Cover_Percent": 6.8,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 38,
    "River_Length_km": 84,
    "Drainage_Density": 0.98,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 240,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Moderate",
    "Pollution_Load_Risk": "High",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Poonch River National Park (Mahseer Habitat)"
    ],
    "Drinking_Water_Linkages": [
      "Kotli Town Water Scheme"
    ],
    "Hydropower_Linkages": [
      "Gulpur HEP (102 MW)"
    ],
    "Irrigation_Linkages": [
      "Kotli district lift irrigation"
    ],
    "Monitoring_Stations": [
      "Kotli Gauge Post",
      "Gulpur Outflow monitor"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A major transboundary tributary of Jhelum. Known for containing the Poonch River National Park, a critical habitat for Endangered Golden Mahseer."
  },
  {
    "Watershed_ID": "kunhar-catchment",
    "Watershed_Name": "Kunhar Catchment",
    "Alternative_Names": [
      "Kunhar River Basin",
      "Kaghan Valley Watershed"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum Lower Watershed",
    "Parent_Watershed_ID": "hunza-sub-basin-w-1",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Kunhar River",
    "Districts_Covered": [
      "Muzaffarabad"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (KPK/AJK border)",
    "Boundary_Source": "WAPDA hydrology data / PCRWR",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.45,
    "Centroid_Longitude": 73.48,
    "Area_km2": 2530,
    "Perimeter_km": 194,
    "Elevation_Min_m": 650,
    "Elevation_Max_m": 5000,
    "Elevation_Mean_m": 2800,
    "Slope_Mean": 24.2,
    "Dominant_Landcover": "Forest & Glacier",
    "Forest_Cover_Percent": 44.5,
    "Agriculture_Cover_Percent": 12.1,
    "Builtup_Cover_Percent": 3.1,
    "Wetland_Count": 0,
    "Lake_Count": 5,
    "Spring_Count": 31,
    "River_Length_km": 55,
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 280,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Saif-ul-Muluk National Park (Adjacency)"
    ],
    "Drinking_Water_Linkages": [
      "Muzaffarabad Northern Supply"
    ],
    "Hydropower_Linkages": [
      "Patrind HEP (147 MW)",
      "Balakot HEP"
    ],
    "Irrigation_Linkages": [
      "Kaghan terrace agricultural channels"
    ],
    "Monitoring_Stations": [
      "Garhi Habibullah Station"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Spans Pakistan KP province and AJK; boundary maps require validation of administrative intersection vectors.",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Originating from Lulusar Lake, Kunhar flows through the Kaghan Valley and joins the Jhelum River near Muzaffarabad."
  },
  {
    "Watershed_ID": "mangla-reservoir-catchment",
    "Watershed_Name": "Mangla Reservoir Catchment",
    "Alternative_Names": [
      "Mangla Catchment AJK",
      "Mirpur Watershed"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Muzaffarabad Jhelum Watershed",
    "Parent_Watershed_ID": "gilgit-sub-basin-w-2",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Jhelum River",
    "Districts_Covered": [
      "Mirpur",
      "Bhimber"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (AJK)",
    "Boundary_Source": "WAPDA Mangla Dam Reservoir division",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.15,
    "Centroid_Longitude": 73.7,
    "Area_km2": 1250,
    "Perimeter_km": 198,
    "Elevation_Min_m": 280,
    "Elevation_Max_m": 1100,
    "Elevation_Mean_m": 540,
    "Slope_Mean": 8.6,
    "Dominant_Landcover": "Reservoir & Agriculture",
    "Forest_Cover_Percent": 12.4,
    "Agriculture_Cover_Percent": 56.4,
    "Builtup_Cover_Percent": 14.8,
    "Wetland_Count": 2,
    "Lake_Count": 1,
    "Spring_Count": 15,
    "River_Length_km": 42,
    "Drainage_Density": 0.74,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 180,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "High",
    "Sediment_Load_Risk": "Critical",
    "Encroachment_Risk": "Critical",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Mangla Wetland Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Mirpur City Drinking supply"
    ],
    "Hydropower_Linkages": [
      "Mangla Dam Power Station (1150 MW)"
    ],
    "Irrigation_Linkages": [
      "Upper Jhelum Canal",
      "Bong Canal"
    ],
    "Monitoring_Stations": [
      "Mangla Dam Inflow hydrometric station"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Mangla reservoir is the second-largest in Pakistan. Highly affected by siltation from upstream Jhelum, Poonch, and Neelum drainage."
  },
  {
    "Watershed_ID": "jhelum-muzaffarabad-catchment",
    "Watershed_Name": "Jhelum Muzaffarabad Catchment",
    "Alternative_Names": [
      "Jhelum AJK Middle Catchment",
      "Muzaffarabad Watershed"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kotli Poonch Watershed",
    "Parent_Watershed_ID": "shigar-sub-basin-w-3",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Jhelum River",
    "Districts_Covered": [
      "Muzaffarabad",
      "Hattian Bala"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (AJK)",
    "Boundary_Source": "PCRWR GIS division",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.3,
    "Centroid_Longitude": 73.55,
    "Area_km2": 1980,
    "Perimeter_km": 210,
    "Elevation_Min_m": 600,
    "Elevation_Max_m": 4100,
    "Elevation_Mean_m": 2100,
    "Slope_Mean": 22.8,
    "Dominant_Landcover": "Forest & Steep Slopes",
    "Forest_Cover_Percent": 44.8,
    "Agriculture_Cover_Percent": 18.5,
    "Builtup_Cover_Percent": 6.8,
    "Wetland_Count": 1,
    "Lake_Count": 2,
    "Spring_Count": 34,
    "River_Length_km": 68,
    "Drainage_Density": 1.02,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 260,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "High",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Chinar conservation zone"
    ],
    "Drinking_Water_Linkages": [
      "Muzaffarabad Municipal supply"
    ],
    "Hydropower_Linkages": [
      "Neelum-Jhelum HEP outfall"
    ],
    "Irrigation_Linkages": [
      "Confluence terrace fields"
    ],
    "Monitoring_Stations": [
      "Muzaffarabad Bridge Gauge Station"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Characterized by highly unstable mountain slopes. In 2005, the Muzaffarabad earthquake caused massive landslides that altered drainage patterns."
  },
  {
    "Watershed_ID": "hispar-glacial-catchment",
    "Watershed_Name": "Hispar Glacial Catchment",
    "Alternative_Names": [
      "Hispar River Watershed",
      "Hispar Basin"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Mirpur Mangla Watershed",
    "Parent_Watershed_ID": "astore-sub-basin-w-4",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Hispar River",
    "Districts_Covered": [
      "Nagar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Gilgit-Baltistan)",
    "Boundary_Source": "WAPDA Pakistan / ICIMOD HKH",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36.18,
    "Centroid_Longitude": 75.15,
    "Area_km2": 1840,
    "Perimeter_km": 185,
    "Elevation_Min_m": 2300,
    "Elevation_Max_m": 7888,
    "Elevation_Mean_m": 5100,
    "Slope_Mean": 31.4,
    "Dominant_Landcover": "Hispar Glacier & Scree",
    "Forest_Cover_Percent": 0.2,
    "Agriculture_Cover_Percent": 0.6,
    "Builtup_Cover_Percent": 0.3,
    "Wetland_Count": 0,
    "Lake_Count": 2,
    "Spring_Count": 8,
    "River_Length_km": 50,
    "Drainage_Density": 0.81,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "None",
    "Groundwater_Recharge_Value": 60,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Critical",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "Central Karakoram National Park"
    ],
    "Drinking_Water_Linkages": [
      "Nagar Local Oasis Schemes"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Nagar valley terrace channels"
    ],
    "Monitoring_Stations": [
      "Hispar Snout Gauge Post"
    ],
    "Source_ID": "SRC-PAK-WAPDA",
    "Source_URL": "http://wapda.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Karakoram glacial boundary vectors require validation against high-res temporal satellite DEMs.",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Drains the massive Hispar Glacier (49 km long). Hispar and Biafo glaciers meet at the Hispar La pass, forming the longest glacial traverse outside polar zones."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-0-c-0",
    "Watershed_Name": "Rupal Glacial Catchment",
    "Alternative_Names": [
      "Rupal Glacial Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum Upper Watershed",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-0",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Rupal Glacial Stream",
    "Districts_Covered": [
      "Hattian Bala"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.3,
    "Centroid_Longitude": 73.8,
    "Area_km2": 15,
    "Perimeter_km": 7.2,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 2200,
    "Elevation_Mean_m": 1900,
    "Slope_Mean": 14,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 20,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 5,
    "Drainage_Density": 0.5,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 80,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-1-c-1",
    "Watershed_Name": "Salkhala Catchment",
    "Alternative_Names": [
      "Salkhala Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum Lower Watershed",
    "Parent_Watershed_ID": "hunza-sub-basin-w-1",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Salkhala Stream",
    "Districts_Covered": [
      "Ghizer"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.51,
    "Centroid_Longitude": 74.51,
    "Area_km2": 18,
    "Perimeter_km": 8.6,
    "Elevation_Min_m": 1625,
    "Elevation_Max_m": 2230,
    "Elevation_Mean_m": 1928,
    "Slope_Mean": 14.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 23,
    "Builtup_Cover_Percent": 2.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": 6.5,
    "Drainage_Density": 0.55,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 83,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-2-c-2",
    "Watershed_Name": "Banjosa Catchment",
    "Alternative_Names": [
      "Banjosa Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Muzaffarabad Jhelum Watershed",
    "Parent_Watershed_ID": "gilgit-sub-basin-w-2",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Haveli"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.32,
    "Centroid_Longitude": 73.82,
    "Area_km2": 21,
    "Perimeter_km": 10.1,
    "Elevation_Min_m": 1650,
    "Elevation_Max_m": 2260,
    "Elevation_Mean_m": 1956,
    "Slope_Mean": 15,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 19,
    "Agriculture_Cover_Percent": 26,
    "Builtup_Cover_Percent": 2.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 86,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-3-c-3",
    "Watershed_Name": "Baghsar Catchment",
    "Alternative_Names": [
      "Baghsar Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kotli Poonch Watershed",
    "Parent_Watershed_ID": "shigar-sub-basin-w-3",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Astore"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.53,
    "Centroid_Longitude": 74.53,
    "Area_km2": 24,
    "Perimeter_km": 11.5,
    "Elevation_Min_m": 1675,
    "Elevation_Max_m": 2290,
    "Elevation_Mean_m": 1984,
    "Slope_Mean": 15.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 21,
    "Agriculture_Cover_Percent": 29,
    "Builtup_Cover_Percent": 3.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 89,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "astore-sub-basin-w-4-c-4",
    "Watershed_Name": "Mangla Siltation Catchment",
    "Alternative_Names": [
      "Mangla Siltation Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Mirpur Mangla Watershed",
    "Parent_Watershed_ID": "astore-sub-basin-w-4",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Sudhnoti"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.34,
    "Centroid_Longitude": 73.84,
    "Area_km2": 27,
    "Perimeter_km": 13,
    "Elevation_Min_m": 1700,
    "Elevation_Max_m": 2320,
    "Elevation_Mean_m": 2012,
    "Slope_Mean": 16,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 23,
    "Agriculture_Cover_Percent": 32,
    "Builtup_Cover_Percent": 3.6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.7,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 92,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-5-c-5",
    "Watershed_Name": "Zalzal Catchment",
    "Alternative_Names": [
      "Zalzal Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Bhimber plains Watershed",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-5",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Shigar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.55,
    "Centroid_Longitude": 74.55,
    "Area_km2": 30,
    "Perimeter_km": 14.4,
    "Elevation_Min_m": 1725,
    "Elevation_Max_m": 2350,
    "Elevation_Mean_m": 2040,
    "Slope_Mean": 16.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 35,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.75,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 95,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-6-c-6",
    "Watershed_Name": "Kel Neelum Catchment",
    "Alternative_Names": [
      "Kel Neelum Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hattian Bala Watershed",
    "Parent_Watershed_ID": "hunza-sub-basin-w-6",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Mirpur"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.36,
    "Centroid_Longitude": 73.86,
    "Area_km2": 33,
    "Perimeter_km": 15.8,
    "Elevation_Min_m": 1750,
    "Elevation_Max_m": 2380,
    "Elevation_Mean_m": 2068,
    "Slope_Mean": 17,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 38,
    "Builtup_Cover_Percent": 4.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 98,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-7-c-7",
    "Watershed_Name": "Sharda Neelum Catchment",
    "Alternative_Names": [
      "Sharda Neelum Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kunhar Joint Watershed",
    "Parent_Watershed_ID": "gilgit-sub-basin-w-7",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ghanche"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.57,
    "Centroid_Longitude": 74.57,
    "Area_km2": 36,
    "Perimeter_km": 17.3,
    "Elevation_Min_m": 1775,
    "Elevation_Max_m": 2410,
    "Elevation_Mean_m": 2096,
    "Slope_Mean": 17.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 41,
    "Builtup_Cover_Percent": 4.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 101,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-8-c-8",
    "Watershed_Name": "Athmuqam Catchment",
    "Alternative_Names": [
      "Athmuqam Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hunza Upper Watershed",
    "Parent_Watershed_ID": "shigar-sub-basin-w-8",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Muzaffarabad"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.38,
    "Centroid_Longitude": 73.88,
    "Area_km2": 39,
    "Perimeter_km": 18.7,
    "Elevation_Min_m": 1800,
    "Elevation_Max_m": 2440,
    "Elevation_Mean_m": 2124,
    "Slope_Mean": 18,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 44,
    "Builtup_Cover_Percent": 5.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 104,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "astore-sub-basin-w-9-c-9",
    "Watershed_Name": "Dudhnial Catchment",
    "Alternative_Names": [
      "Dudhnial Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hunza Lower Watershed",
    "Parent_Watershed_ID": "astore-sub-basin-w-9",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Hunza"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.59,
    "Centroid_Longitude": 74.59,
    "Area_km2": 42,
    "Perimeter_km": 20.2,
    "Elevation_Min_m": 1825,
    "Elevation_Max_m": 2470,
    "Elevation_Mean_m": 2152,
    "Slope_Mean": 18.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 47,
    "Builtup_Cover_Percent": 5.6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 107,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-10-c-10",
    "Watershed_Name": "Keran Catchment",
    "Alternative_Names": [
      "Keran Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Gilgit Upper Watershed",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-10",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Hattian Bala"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.4,
    "Centroid_Longitude": 73.9,
    "Area_km2": 45,
    "Perimeter_km": 21.6,
    "Elevation_Min_m": 1850,
    "Elevation_Max_m": 2500,
    "Elevation_Mean_m": 2180,
    "Slope_Mean": 19,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 50,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 110,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-11-c-11",
    "Watershed_Name": "Kutla Catchment",
    "Alternative_Names": [
      "Kutla Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Gilgit Lower Watershed",
    "Parent_Watershed_ID": "hunza-sub-basin-w-11",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ghizer"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.61,
    "Centroid_Longitude": 74.61,
    "Area_km2": 48,
    "Perimeter_km": 23,
    "Elevation_Min_m": 1875,
    "Elevation_Max_m": 2530,
    "Elevation_Mean_m": 2208,
    "Slope_Mean": 19.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 37,
    "Agriculture_Cover_Percent": 53,
    "Builtup_Cover_Percent": 6.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 113,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-12-c-12",
    "Watershed_Name": "Ratti Gali Catchment",
    "Alternative_Names": [
      "Ratti Gali Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Astore Upper Watershed",
    "Parent_Watershed_ID": "gilgit-sub-basin-w-12",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Haveli"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.42,
    "Centroid_Longitude": 73.92,
    "Area_km2": 51,
    "Perimeter_km": 24.5,
    "Elevation_Min_m": 1900,
    "Elevation_Max_m": 2560,
    "Elevation_Mean_m": 2236,
    "Slope_Mean": 20,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 39,
    "Agriculture_Cover_Percent": 56,
    "Builtup_Cover_Percent": 6.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 116,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-13-c-13",
    "Watershed_Name": "Chitta Katha Catchment",
    "Alternative_Names": [
      "Chitta Katha Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Astore Lower Watershed",
    "Parent_Watershed_ID": "shigar-sub-basin-w-13",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Astore"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.63,
    "Centroid_Longitude": 74.63,
    "Area_km2": 54,
    "Perimeter_km": 25.9,
    "Elevation_Min_m": 1925,
    "Elevation_Max_m": 2590,
    "Elevation_Mean_m": 2264,
    "Slope_Mean": 20.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 41,
    "Agriculture_Cover_Percent": 59,
    "Builtup_Cover_Percent": 7.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.15,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 119,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "astore-sub-basin-w-14-c-14",
    "Watershed_Name": "Dudipatsar Catchment",
    "Alternative_Names": [
      "Dudipatsar Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shigar Glacial Watershed",
    "Parent_Watershed_ID": "astore-sub-basin-w-14",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Sudhnoti"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.44,
    "Centroid_Longitude": 73.94,
    "Area_km2": 57,
    "Perimeter_km": 27.4,
    "Elevation_Min_m": 1950,
    "Elevation_Max_m": 2620,
    "Elevation_Mean_m": 2292,
    "Slope_Mean": 21,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 43,
    "Agriculture_Cover_Percent": 22,
    "Builtup_Cover_Percent": 7.6000000000000005,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.5,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 122,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-15-c-15",
    "Watershed_Name": "Saral Catchment",
    "Alternative_Names": [
      "Saral Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kharmang Indus Watershed",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-15",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Shigar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.65,
    "Centroid_Longitude": 74.65,
    "Area_km2": 60,
    "Perimeter_km": 28.8,
    "Elevation_Min_m": 1975,
    "Elevation_Max_m": 2650,
    "Elevation_Mean_m": 2320,
    "Slope_Mean": 21.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 25,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.55,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 125,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-16-c-16",
    "Watershed_Name": "Noori Top Catchment",
    "Alternative_Names": [
      "Noori Top Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ghanche Shyok Watershed",
    "Parent_Watershed_ID": "hunza-sub-basin-w-16",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Mirpur"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.46,
    "Centroid_Longitude": 73.96,
    "Area_km2": 63,
    "Perimeter_km": 30.2,
    "Elevation_Min_m": 2000,
    "Elevation_Max_m": 2680,
    "Elevation_Mean_m": 2348,
    "Slope_Mean": 22,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 28,
    "Builtup_Cover_Percent": 2.4000000000000004,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 128,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-17-c-17",
    "Watershed_Name": "Subri Catchment",
    "Alternative_Names": [
      "Subri Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hispar snout Watershed",
    "Parent_Watershed_ID": "gilgit-sub-basin-w-17",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ghanche"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.67,
    "Centroid_Longitude": 74.67,
    "Area_km2": 66,
    "Perimeter_km": 31.7,
    "Elevation_Min_m": 2025,
    "Elevation_Max_m": 2710,
    "Elevation_Mean_m": 2376,
    "Slope_Mean": 22.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 19,
    "Agriculture_Cover_Percent": 31,
    "Builtup_Cover_Percent": 2.8000000000000007,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 131,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-18-c-18",
    "Watershed_Name": "Kahil Catchment",
    "Alternative_Names": [
      "Kahil Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Batura snout Watershed",
    "Parent_Watershed_ID": "shigar-sub-basin-w-18",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Muzaffarabad"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.48,
    "Centroid_Longitude": 73.98,
    "Area_km2": 69,
    "Perimeter_km": 33.1,
    "Elevation_Min_m": 2050,
    "Elevation_Max_m": 2740,
    "Elevation_Mean_m": 2404,
    "Slope_Mean": 23,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 21,
    "Agriculture_Cover_Percent": 34,
    "Builtup_Cover_Percent": 3.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.7,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 134,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "astore-sub-basin-w-19-c-19",
    "Watershed_Name": "Rawalakot Catchment",
    "Alternative_Names": [
      "Rawalakot Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Naltar Watershed",
    "Parent_Watershed_ID": "astore-sub-basin-w-19",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Hunza"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.69,
    "Centroid_Longitude": 74.69,
    "Area_km2": 72,
    "Perimeter_km": 34.6,
    "Elevation_Min_m": 2075,
    "Elevation_Max_m": 2770,
    "Elevation_Mean_m": 2432,
    "Slope_Mean": 23.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 23,
    "Agriculture_Cover_Percent": 37,
    "Builtup_Cover_Percent": 3.6000000000000005,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.75,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 137,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-20-c-20",
    "Watershed_Name": "Hajira Catchment",
    "Alternative_Names": [
      "Hajira Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ghizer Upper Watershed",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-20",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Hattian Bala"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.5,
    "Centroid_Longitude": 74,
    "Area_km2": 75,
    "Perimeter_km": 36,
    "Elevation_Min_m": 2100,
    "Elevation_Max_m": 2800,
    "Elevation_Mean_m": 2460,
    "Slope_Mean": 24,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 40,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-21-c-21",
    "Watershed_Name": "Sudhnoti Catchment",
    "Alternative_Names": [
      "Sudhnoti Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Yasin Watershed",
    "Parent_Watershed_ID": "hunza-sub-basin-w-21",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ghizer"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.71,
    "Centroid_Longitude": 74.71,
    "Area_km2": 78,
    "Perimeter_km": 37.4,
    "Elevation_Min_m": 2125,
    "Elevation_Max_m": 2830,
    "Elevation_Mean_m": 2488,
    "Slope_Mean": 24.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 43,
    "Builtup_Cover_Percent": 4.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 143,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-0-c-22",
    "Watershed_Name": "Kotli thermal Catchment",
    "Alternative_Names": [
      "Kotli thermal Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum Upper Watershed",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-0",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Haveli"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.52,
    "Centroid_Longitude": 74.02,
    "Area_km2": 81,
    "Perimeter_km": 38.9,
    "Elevation_Min_m": 2150,
    "Elevation_Max_m": 2860,
    "Elevation_Mean_m": 2516,
    "Slope_Mean": 25,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 46,
    "Builtup_Cover_Percent": 4.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 146,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-1-c-23",
    "Watershed_Name": "Mirpur plains Catchment",
    "Alternative_Names": [
      "Mirpur plains Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum Lower Watershed",
    "Parent_Watershed_ID": "hunza-sub-basin-w-1",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Astore"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.73,
    "Centroid_Longitude": 74.73,
    "Area_km2": 84,
    "Perimeter_km": 40.3,
    "Elevation_Min_m": 2175,
    "Elevation_Max_m": 2890,
    "Elevation_Mean_m": 2544,
    "Slope_Mean": 25.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 49,
    "Builtup_Cover_Percent": 5.200000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 149,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-2-c-24",
    "Watershed_Name": "Bhimber hills Catchment",
    "Alternative_Names": [
      "Bhimber hills Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Muzaffarabad Jhelum Watershed",
    "Parent_Watershed_ID": "gilgit-sub-basin-w-2",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Sudhnoti"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.54,
    "Centroid_Longitude": 74.04,
    "Area_km2": 87,
    "Perimeter_km": 41.8,
    "Elevation_Min_m": 2200,
    "Elevation_Max_m": 2920,
    "Elevation_Mean_m": 2572,
    "Slope_Mean": 14,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 52,
    "Builtup_Cover_Percent": 5.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 152,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-3-c-25",
    "Watershed_Name": "Karot Catchment",
    "Alternative_Names": [
      "Karot Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kotli Poonch Watershed",
    "Parent_Watershed_ID": "shigar-sub-basin-w-3",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Shigar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.75,
    "Centroid_Longitude": 74.75,
    "Area_km2": 90,
    "Perimeter_km": 43.2,
    "Elevation_Min_m": 2225,
    "Elevation_Max_m": 2950,
    "Elevation_Mean_m": 2600,
    "Slope_Mean": 14.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 55,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 155,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "astore-sub-basin-w-4-c-26",
    "Watershed_Name": "Neelum-Jhelum Catchment",
    "Alternative_Names": [
      "Neelum-Jhelum Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Mirpur Mangla Watershed",
    "Parent_Watershed_ID": "astore-sub-basin-w-4",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Mirpur"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.56,
    "Centroid_Longitude": 74.06,
    "Area_km2": 93,
    "Perimeter_km": 44.6,
    "Elevation_Min_m": 2250,
    "Elevation_Max_m": 2980,
    "Elevation_Mean_m": 2628,
    "Slope_Mean": 15,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 37,
    "Agriculture_Cover_Percent": 58,
    "Builtup_Cover_Percent": 6.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 158,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-5-c-27",
    "Watershed_Name": "Gulpur Catchment",
    "Alternative_Names": [
      "Gulpur Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Bhimber plains Watershed",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-5",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ghanche"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.77,
    "Centroid_Longitude": 74.77,
    "Area_km2": 16,
    "Perimeter_km": 7.7,
    "Elevation_Min_m": 2275,
    "Elevation_Max_m": 3010,
    "Elevation_Mean_m": 2656,
    "Slope_Mean": 15.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 39,
    "Agriculture_Cover_Percent": 21,
    "Builtup_Cover_Percent": 6.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.15,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 161,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-6-c-28",
    "Watershed_Name": "Patrind Catchment",
    "Alternative_Names": [
      "Patrind Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hattian Bala Watershed",
    "Parent_Watershed_ID": "hunza-sub-basin-w-6",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Muzaffarabad"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.58,
    "Centroid_Longitude": 74.08,
    "Area_km2": 19,
    "Perimeter_km": 9.1,
    "Elevation_Min_m": 2300,
    "Elevation_Max_m": 3040,
    "Elevation_Mean_m": 2684,
    "Slope_Mean": 16,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 41,
    "Agriculture_Cover_Percent": 24,
    "Builtup_Cover_Percent": 7.200000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.5,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 164,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-7-c-29",
    "Watershed_Name": "Khunjerab Catchment",
    "Alternative_Names": [
      "Khunjerab Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kunhar Joint Watershed",
    "Parent_Watershed_ID": "gilgit-sub-basin-w-7",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Hunza"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.79,
    "Centroid_Longitude": 74.79,
    "Area_km2": 22,
    "Perimeter_km": 10.6,
    "Elevation_Min_m": 2325,
    "Elevation_Max_m": 3070,
    "Elevation_Mean_m": 2712,
    "Slope_Mean": 16.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 43,
    "Agriculture_Cover_Percent": 27,
    "Builtup_Cover_Percent": 7.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.55,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 167,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-8-c-30",
    "Watershed_Name": "Saser Catchment",
    "Alternative_Names": [
      "Saser Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hunza Upper Watershed",
    "Parent_Watershed_ID": "shigar-sub-basin-w-8",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Hattian Bala"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.6,
    "Centroid_Longitude": 74.1,
    "Area_km2": 25,
    "Perimeter_km": 12,
    "Elevation_Min_m": 2350,
    "Elevation_Max_m": 3100,
    "Elevation_Mean_m": 2740,
    "Slope_Mean": 17,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 30,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 170,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "astore-sub-basin-w-9-c-31",
    "Watershed_Name": "Shimshal Catchment",
    "Alternative_Names": [
      "Shimshal Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hunza Lower Watershed",
    "Parent_Watershed_ID": "astore-sub-basin-w-9",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ghizer"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.81,
    "Centroid_Longitude": 74.81,
    "Area_km2": 28,
    "Perimeter_km": 13.4,
    "Elevation_Min_m": 2375,
    "Elevation_Max_m": 3130,
    "Elevation_Mean_m": 2768,
    "Slope_Mean": 17.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 33,
    "Builtup_Cover_Percent": 2.4000000000000004,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 173,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-10-c-32",
    "Watershed_Name": "Misgar Catchment",
    "Alternative_Names": [
      "Misgar Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Gilgit Upper Watershed",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-10",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Haveli"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.62,
    "Centroid_Longitude": 74.12,
    "Area_km2": 31,
    "Perimeter_km": 14.9,
    "Elevation_Min_m": 2400,
    "Elevation_Max_m": 3160,
    "Elevation_Mean_m": 2796,
    "Slope_Mean": 18,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 19,
    "Agriculture_Cover_Percent": 36,
    "Builtup_Cover_Percent": 2.8000000000000007,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.7,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 176,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-11-c-33",
    "Watershed_Name": "Nagar Catchment",
    "Alternative_Names": [
      "Nagar Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Gilgit Lower Watershed",
    "Parent_Watershed_ID": "hunza-sub-basin-w-11",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Astore"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.83,
    "Centroid_Longitude": 74.83,
    "Area_km2": 34,
    "Perimeter_km": 16.3,
    "Elevation_Min_m": 2425,
    "Elevation_Max_m": 3190,
    "Elevation_Mean_m": 2824,
    "Slope_Mean": 18.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 21,
    "Agriculture_Cover_Percent": 39,
    "Builtup_Cover_Percent": 3.200000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.75,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 179,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-12-c-34",
    "Watershed_Name": "Bagrot Catchment",
    "Alternative_Names": [
      "Bagrot Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Astore Upper Watershed",
    "Parent_Watershed_ID": "gilgit-sub-basin-w-12",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Sudhnoti"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.64,
    "Centroid_Longitude": 74.14,
    "Area_km2": 37,
    "Perimeter_km": 17.8,
    "Elevation_Min_m": 2450,
    "Elevation_Max_m": 3220,
    "Elevation_Mean_m": 2852,
    "Slope_Mean": 19,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 23,
    "Agriculture_Cover_Percent": 42,
    "Builtup_Cover_Percent": 3.6000000000000014,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.8,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 182,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-13-c-35",
    "Watershed_Name": "Gupis-Yasin Catchment",
    "Alternative_Names": [
      "Gupis-Yasin Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Astore Lower Watershed",
    "Parent_Watershed_ID": "shigar-sub-basin-w-13",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Shigar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.85,
    "Centroid_Longitude": 74.85,
    "Area_km2": 40,
    "Perimeter_km": 19.2,
    "Elevation_Min_m": 2475,
    "Elevation_Max_m": 3250,
    "Elevation_Mean_m": 2880,
    "Slope_Mean": 19.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 25,
    "Agriculture_Cover_Percent": 45,
    "Builtup_Cover_Percent": 4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 185,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "astore-sub-basin-w-14-c-36",
    "Watershed_Name": "Ishkoman Catchment",
    "Alternative_Names": [
      "Ishkoman Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shigar Glacial Watershed",
    "Parent_Watershed_ID": "astore-sub-basin-w-14",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Mirpur"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.66,
    "Centroid_Longitude": 74.16,
    "Area_km2": 43,
    "Perimeter_km": 20.6,
    "Elevation_Min_m": 2500,
    "Elevation_Max_m": 3280,
    "Elevation_Mean_m": 2908,
    "Slope_Mean": 20,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 27,
    "Agriculture_Cover_Percent": 48,
    "Builtup_Cover_Percent": 4.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 188,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-15-c-37",
    "Watershed_Name": "Phander Catchment",
    "Alternative_Names": [
      "Phander Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kharmang Indus Watershed",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-15",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ghanche"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.87,
    "Centroid_Longitude": 74.87,
    "Area_km2": 46,
    "Perimeter_km": 22.1,
    "Elevation_Min_m": 2525,
    "Elevation_Max_m": 3310,
    "Elevation_Mean_m": 2936,
    "Slope_Mean": 20.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 29,
    "Agriculture_Cover_Percent": 51,
    "Builtup_Cover_Percent": 4.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 191,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-16-c-38",
    "Watershed_Name": "Handrap Catchment",
    "Alternative_Names": [
      "Handrap Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ghanche Shyok Watershed",
    "Parent_Watershed_ID": "hunza-sub-basin-w-16",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Muzaffarabad"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.68,
    "Centroid_Longitude": 74.18,
    "Area_km2": 49,
    "Perimeter_km": 23.5,
    "Elevation_Min_m": 2550,
    "Elevation_Max_m": 3340,
    "Elevation_Mean_m": 2964,
    "Slope_Mean": 21,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 31,
    "Agriculture_Cover_Percent": 54,
    "Builtup_Cover_Percent": 5.200000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 194,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-17-c-39",
    "Watershed_Name": "Skardu Catchment",
    "Alternative_Names": [
      "Skardu Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hispar snout Watershed",
    "Parent_Watershed_ID": "gilgit-sub-basin-w-17",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Hunza"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.89,
    "Centroid_Longitude": 74.89,
    "Area_km2": 52,
    "Perimeter_km": 25,
    "Elevation_Min_m": 2575,
    "Elevation_Max_m": 3370,
    "Elevation_Mean_m": 2992,
    "Slope_Mean": 21.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 33,
    "Agriculture_Cover_Percent": 57,
    "Builtup_Cover_Percent": 5.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 197,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-18-c-40",
    "Watershed_Name": "Satpara Catchment",
    "Alternative_Names": [
      "Satpara Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Batura snout Watershed",
    "Parent_Watershed_ID": "shigar-sub-basin-w-18",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Hattian Bala"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.7,
    "Centroid_Longitude": 74.2,
    "Area_km2": 55,
    "Perimeter_km": 26.4,
    "Elevation_Min_m": 2600,
    "Elevation_Max_m": 3400,
    "Elevation_Mean_m": 3020,
    "Slope_Mean": 22,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 20,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.1,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 200,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "astore-sub-basin-w-19-c-41",
    "Watershed_Name": "Kachura Catchment",
    "Alternative_Names": [
      "Kachura Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Naltar Watershed",
    "Parent_Watershed_ID": "astore-sub-basin-w-19",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ghizer"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.91,
    "Centroid_Longitude": 74.91,
    "Area_km2": 58,
    "Perimeter_km": 27.8,
    "Elevation_Min_m": 2625,
    "Elevation_Max_m": 3430,
    "Elevation_Mean_m": 3048,
    "Slope_Mean": 22.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 37,
    "Agriculture_Cover_Percent": 23,
    "Builtup_Cover_Percent": 6.400000000000002,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.15,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 203,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-20-c-42",
    "Watershed_Name": "Shangrila Catchment",
    "Alternative_Names": [
      "Shangrila Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Ghizer Upper Watershed",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-20",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Haveli"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.72,
    "Centroid_Longitude": 74.22,
    "Area_km2": 61,
    "Perimeter_km": 29.3,
    "Elevation_Min_m": 2650,
    "Elevation_Max_m": 3460,
    "Elevation_Mean_m": 3076,
    "Slope_Mean": 23,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 39,
    "Agriculture_Cover_Percent": 26,
    "Builtup_Cover_Percent": 6.800000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.5,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 206,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-21-c-43",
    "Watershed_Name": "Shigar Upper Catchment",
    "Alternative_Names": [
      "Shigar Upper Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Yasin Watershed",
    "Parent_Watershed_ID": "hunza-sub-basin-w-21",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Astore"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.93,
    "Centroid_Longitude": 74.93,
    "Area_km2": 64,
    "Perimeter_km": 30.7,
    "Elevation_Min_m": 2675,
    "Elevation_Max_m": 3490,
    "Elevation_Mean_m": 3104,
    "Slope_Mean": 23.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 41,
    "Agriculture_Cover_Percent": 29,
    "Builtup_Cover_Percent": 7.199999999999999,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.55,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 209,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-0-c-44",
    "Watershed_Name": "Shigar Lower Catchment",
    "Alternative_Names": [
      "Shigar Lower Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum Upper Watershed",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-0",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Sudhnoti"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.74,
    "Centroid_Longitude": 74.24,
    "Area_km2": 67,
    "Perimeter_km": 32.2,
    "Elevation_Min_m": 2700,
    "Elevation_Max_m": 3520,
    "Elevation_Mean_m": 3132,
    "Slope_Mean": 24,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 43,
    "Agriculture_Cover_Percent": 32,
    "Builtup_Cover_Percent": 7.600000000000001,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 212,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-1-c-45",
    "Watershed_Name": "Basha Catchment",
    "Alternative_Names": [
      "Basha Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum Lower Watershed",
    "Parent_Watershed_ID": "hunza-sub-basin-w-1",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Shigar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.95,
    "Centroid_Longitude": 74.95,
    "Area_km2": 70,
    "Perimeter_km": 33.6,
    "Elevation_Min_m": 2725,
    "Elevation_Max_m": 3550,
    "Elevation_Mean_m": 3160,
    "Slope_Mean": 24.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 35,
    "Builtup_Cover_Percent": 2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 215,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-2-c-46",
    "Watershed_Name": "Braldu Catchment",
    "Alternative_Names": [
      "Braldu Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Muzaffarabad Jhelum Watershed",
    "Parent_Watershed_ID": "gilgit-sub-basin-w-2",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Mirpur"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.76,
    "Centroid_Longitude": 74.26,
    "Area_km2": 73,
    "Perimeter_km": 35,
    "Elevation_Min_m": 2750,
    "Elevation_Max_m": 3580,
    "Elevation_Mean_m": 3188,
    "Slope_Mean": 25,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 38,
    "Builtup_Cover_Percent": 2.400000000000002,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.7,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 218,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-3-c-47",
    "Watershed_Name": "K2 meltwater Catchment",
    "Alternative_Names": [
      "K2 meltwater Local Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kotli Poonch Watershed",
    "Parent_Watershed_ID": "shigar-sub-basin-w-3",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ghanche"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Stream Basin Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.97,
    "Centroid_Longitude": 74.97,
    "Area_km2": 76,
    "Perimeter_km": 36.5,
    "Elevation_Min_m": 2775,
    "Elevation_Max_m": 3610,
    "Elevation_Mean_m": 3216,
    "Slope_Mean": 25.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 19,
    "Agriculture_Cover_Percent": 41,
    "Builtup_Cover_Percent": 2.8000000000000007,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.75,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 221,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Aquifer Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 4: Catchment."
  },
  {
    "Watershed_ID": "spring-tatta-pani-kotli-spring-shed",
    "Watershed_Name": "Spring Tatta Pani Kotli Spring-Shed",
    "Alternative_Names": [
      "Tatapani Kotli Hot Spring Zone",
      "Kotli Geothermal Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Poonch AJK Catchment",
    "Parent_Watershed_ID": "poonch-ajk-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Poonch River Tributary",
    "Districts_Covered": [
      "Kotli"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (AJK)",
    "Boundary_Source": "AJK Geological Survey Reports",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.5139,
    "Centroid_Longitude": 73.9744,
    "Area_km2": 32,
    "Perimeter_km": 26,
    "Elevation_Min_m": 540,
    "Elevation_Max_m": 1100,
    "Elevation_Mean_m": 780,
    "Slope_Mean": 13.8,
    "Dominant_Landcover": "Scrubs & Fractured Limestones",
    "Forest_Cover_Percent": 8.6,
    "Agriculture_Cover_Percent": 34.2,
    "Builtup_Cover_Percent": 12.4,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 1,
    "River_Length_km": 7,
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "None",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 34,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "High",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "Moderate",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Poonch River Park boundary"
    ],
    "Drinking_Water_Linkages": [
      "Tatta Pani Local Thermal Pools"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local farming gardens"
    ],
    "Monitoring_Stations": [
      "Kotli Geothermal Post"
    ],
    "Source_ID": "SRC-LEGACY-001",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Low",
    "Verification_Status": "Source Required",
    "Dashboard_Locked": false,
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A well-known hot sulfur spring on the banks of the Poonch River. The springs emerge under significant pressure from the underground fault lines."
  },
  {
    "Watershed_ID": "poonch-ajk-catchment-m-0",
    "Watershed_Name": "Kondus Micro-Watershed",
    "Alternative_Names": [
      "Kondus Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Poonch AJK Catchment",
    "Parent_Watershed_ID": "poonch-ajk-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Muzaffarabad"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.3,
    "Centroid_Longitude": 73.8,
    "Area_km2": 5,
    "Perimeter_km": 3,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 2000,
    "Elevation_Mean_m": 1800,
    "Slope_Mean": 16,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 5,
    "Agriculture_Cover_Percent": 30,
    "Builtup_Cover_Percent": 5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.6,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 50,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "kunhar-catchment-m-1",
    "Watershed_Name": "Saltoro Micro-Watershed",
    "Alternative_Names": [
      "Saltoro Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kunhar Catchment",
    "Parent_Watershed_ID": "kunhar-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Hunza"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.51,
    "Centroid_Longitude": 74.51,
    "Area_km2": 6,
    "Perimeter_km": 3.6,
    "Elevation_Min_m": 1620,
    "Elevation_Max_m": 2025,
    "Elevation_Mean_m": 1822,
    "Slope_Mean": 16.6,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 6,
    "Agriculture_Cover_Percent": 32,
    "Builtup_Cover_Percent": 6,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.66,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 52,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "mangla-reservoir-catchment-m-2",
    "Watershed_Name": "Kharmang Valley Micro-Watershed",
    "Alternative_Names": [
      "Kharmang Valley Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Mangla Reservoir Catchment",
    "Parent_Watershed_ID": "mangla-reservoir-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Hattian Bala"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.32,
    "Centroid_Longitude": 73.82,
    "Area_km2": 7,
    "Perimeter_km": 4.2,
    "Elevation_Min_m": 1640,
    "Elevation_Max_m": 2050,
    "Elevation_Mean_m": 1844,
    "Slope_Mean": 17.2,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 7,
    "Agriculture_Cover_Percent": 34,
    "Builtup_Cover_Percent": 7,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.72,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 54,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "jhelum-muzaffarabad-catchment-m-3",
    "Watershed_Name": "Roundu Micro-Watershed",
    "Alternative_Names": [
      "Roundu Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Jhelum Muzaffarabad Catchment",
    "Parent_Watershed_ID": "jhelum-muzaffarabad-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ghizer"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.53,
    "Centroid_Longitude": 74.53,
    "Area_km2": 8,
    "Perimeter_km": 4.8,
    "Elevation_Min_m": 1660,
    "Elevation_Max_m": 2075,
    "Elevation_Mean_m": 1866,
    "Slope_Mean": 17.8,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 8,
    "Agriculture_Cover_Percent": 36,
    "Builtup_Cover_Percent": 8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.78,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 56,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "hispar-glacial-catchment-m-4",
    "Watershed_Name": "Darel Micro-Watershed",
    "Alternative_Names": [
      "Darel Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hispar Glacial Catchment",
    "Parent_Watershed_ID": "hispar-glacial-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Haveli"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.34,
    "Centroid_Longitude": 73.84,
    "Area_km2": 9,
    "Perimeter_km": 5.4,
    "Elevation_Min_m": 1680,
    "Elevation_Max_m": 2100,
    "Elevation_Mean_m": 1888,
    "Slope_Mean": 18.4,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 9,
    "Agriculture_Cover_Percent": 38,
    "Builtup_Cover_Percent": 9,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.84,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 58,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-0-c-0-m-5",
    "Watershed_Name": "Tangir Micro-Watershed",
    "Alternative_Names": [
      "Tangir Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Rupal Glacial Catchment",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-0-c-0",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Astore"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.55,
    "Centroid_Longitude": 74.55,
    "Area_km2": 10,
    "Perimeter_km": 6,
    "Elevation_Min_m": 1700,
    "Elevation_Max_m": 2125,
    "Elevation_Mean_m": 1910,
    "Slope_Mean": 19,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 10,
    "Agriculture_Cover_Percent": 40,
    "Builtup_Cover_Percent": 10,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.9,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 60,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-1-c-1-m-6",
    "Watershed_Name": "Astor Upper Micro-Watershed",
    "Alternative_Names": [
      "Astor Upper Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Salkhala Catchment",
    "Parent_Watershed_ID": "hunza-sub-basin-w-1-c-1",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Sudhnoti"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.36,
    "Centroid_Longitude": 73.86,
    "Area_km2": 11,
    "Perimeter_km": 6.6,
    "Elevation_Min_m": 1720,
    "Elevation_Max_m": 2150,
    "Elevation_Mean_m": 1932,
    "Slope_Mean": 19.6,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 11,
    "Agriculture_Cover_Percent": 42,
    "Builtup_Cover_Percent": 11,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 0.96,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 62,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-2-c-2-m-7",
    "Watershed_Name": "Astor Lower Micro-Watershed",
    "Alternative_Names": [
      "Astor Lower Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Banjosa Catchment",
    "Parent_Watershed_ID": "gilgit-sub-basin-w-2-c-2",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Shigar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.57,
    "Centroid_Longitude": 74.57,
    "Area_km2": 12,
    "Perimeter_km": 7.2,
    "Elevation_Min_m": 1740,
    "Elevation_Max_m": 2175,
    "Elevation_Mean_m": 1954,
    "Slope_Mean": 20.2,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 12,
    "Agriculture_Cover_Percent": 44,
    "Builtup_Cover_Percent": 12,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.02,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 64,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-3-c-3-m-8",
    "Watershed_Name": "Minimarg Micro-Watershed",
    "Alternative_Names": [
      "Minimarg Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Baghsar Catchment",
    "Parent_Watershed_ID": "shigar-sub-basin-w-3-c-3",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Mirpur"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.38,
    "Centroid_Longitude": 73.88,
    "Area_km2": 13,
    "Perimeter_km": 7.8,
    "Elevation_Min_m": 1760,
    "Elevation_Max_m": 2200,
    "Elevation_Mean_m": 1976,
    "Slope_Mean": 20.8,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 13,
    "Agriculture_Cover_Percent": 46,
    "Builtup_Cover_Percent": 13,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.08,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 66,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "astore-sub-basin-w-4-c-4-m-9",
    "Watershed_Name": "Kamri Micro-Watershed",
    "Alternative_Names": [
      "Kamri Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Mangla Siltation Catchment",
    "Parent_Watershed_ID": "astore-sub-basin-w-4-c-4",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ghanche"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.59,
    "Centroid_Longitude": 74.59,
    "Area_km2": 14,
    "Perimeter_km": 8.4,
    "Elevation_Min_m": 1780,
    "Elevation_Max_m": 2225,
    "Elevation_Mean_m": 1998,
    "Slope_Mean": 21.4,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 14,
    "Agriculture_Cover_Percent": 48,
    "Builtup_Cover_Percent": 14,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.14,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 68,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "neelum-ajk-basin-w-5-c-5-m-10",
    "Watershed_Name": "Rupal Valley Micro-Watershed",
    "Alternative_Names": [
      "Rupal Valley Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Zalzal Catchment",
    "Parent_Watershed_ID": "neelum-ajk-basin-w-5-c-5",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Muzaffarabad"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.4,
    "Centroid_Longitude": 73.9,
    "Area_km2": 15,
    "Perimeter_km": 9,
    "Elevation_Min_m": 1800,
    "Elevation_Max_m": 2250,
    "Elevation_Mean_m": 2020,
    "Slope_Mean": 22,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 50,
    "Builtup_Cover_Percent": 15,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.2,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 70,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "hunza-sub-basin-w-6-c-6-m-11",
    "Watershed_Name": "Bunji Micro-Watershed",
    "Alternative_Names": [
      "Bunji Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kel Neelum Catchment",
    "Parent_Watershed_ID": "hunza-sub-basin-w-6-c-6",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Hunza"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.61,
    "Centroid_Longitude": 74.61,
    "Area_km2": 16,
    "Perimeter_km": 9.6,
    "Elevation_Min_m": 1820,
    "Elevation_Max_m": 2275,
    "Elevation_Mean_m": 2042,
    "Slope_Mean": 22.6,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 16,
    "Agriculture_Cover_Percent": 52,
    "Builtup_Cover_Percent": 16,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.26,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 72,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "gilgit-sub-basin-w-7-c-7-m-12",
    "Watershed_Name": "Chilas Micro-Watershed",
    "Alternative_Names": [
      "Chilas Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sharda Neelum Catchment",
    "Parent_Watershed_ID": "gilgit-sub-basin-w-7-c-7",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Hattian Bala"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.42,
    "Centroid_Longitude": 73.92,
    "Area_km2": 17,
    "Perimeter_km": 10.2,
    "Elevation_Min_m": 1840,
    "Elevation_Max_m": 2300,
    "Elevation_Mean_m": 2064,
    "Slope_Mean": 23.2,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 17,
    "Agriculture_Cover_Percent": 54,
    "Builtup_Cover_Percent": 17,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.32,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 74,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "shigar-sub-basin-w-8-c-8-m-13",
    "Watershed_Name": "Neelum Upper Micro-Watershed",
    "Alternative_Names": [
      "Neelum Upper Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Athmuqam Catchment",
    "Parent_Watershed_ID": "shigar-sub-basin-w-8-c-8",
    "River_System": "Indus System",
    "Main_River_or_Stream": "None",
    "Districts_Covered": [
      "Ghizer"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Flow Delineation Analysis",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.63,
    "Centroid_Longitude": 74.63,
    "Area_km2": 18,
    "Perimeter_km": 10.8,
    "Elevation_Min_m": 1860,
    "Elevation_Max_m": 2325,
    "Elevation_Mean_m": 2086,
    "Slope_Mean": 23.8,
    "Dominant_Landcover": "Builtup",
    "Forest_Cover_Percent": 18,
    "Agriculture_Cover_Percent": 56,
    "Builtup_Cover_Percent": 18,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 0,
    "River_Length_km": "Source Required",
    "Drainage_Density": 1.38,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 76,
    "Soil_Erosion_Risk": "Low",
    "Flood_Risk": "Low",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Low",
    "Restoration_Priority": "Low",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Spring Box Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "sasara-watershed",
    "Watershed_Name": "Sasara Watershed",
    "Alternative_Names": [
      "Sasara Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Jhelum Sub-Basin",
    "Parent_Watershed_ID": "jhelum-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Sasara Stream",
    "Districts_Covered": [
      "Pulwama",
      "Shopian"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.8,
    "Centroid_Longitude": 74.9,
    "Area_km2": 185.5,
    "Perimeter_km": 74.2,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 2900,
    "Elevation_Mean_m": 2200,
    "Slope_Mean": 14.5,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 18,
    "Agriculture_Cover_Percent": 65,
    "Builtup_Cover_Percent": 6.5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 4,
    "River_Length_km": 24.5,
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 120,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Pulwama Water Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Canals"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Sasara drainage line."
  },
  {
    "Watershed_ID": "shaliganga-watershed",
    "Watershed_Name": "Shaliganga Watershed",
    "Alternative_Names": [
      "Shaliganga Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Jhelum Sub-Basin",
    "Parent_Watershed_ID": "jhelum-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Shaliganga River",
    "Districts_Covered": [
      "Budgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.9,
    "Centroid_Longitude": 74.6,
    "Area_km2": 215.2,
    "Perimeter_km": 86.1,
    "Elevation_Min_m": 1650,
    "Elevation_Max_m": 3500,
    "Elevation_Mean_m": 2450,
    "Slope_Mean": 16.8,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 45,
    "Builtup_Cover_Percent": 4.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 6,
    "River_Length_km": 38.5,
    "Drainage_Density": 0.98,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 145,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Budgam Water Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Shaliganga Canal"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Shaliganga drainage line."
  },
  {
    "Watershed_ID": "lolab-watershed",
    "Watershed_Name": "Lolab Watershed",
    "Alternative_Names": [
      "Lolab Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Pohru Catchment Unit",
    "Parent_Watershed_ID": "pohru-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Lolab Stream",
    "Districts_Covered": [
      "Kupwara"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.45,
    "Centroid_Longitude": 74.3,
    "Area_km2": 320.5,
    "Perimeter_km": 110.2,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 3800,
    "Elevation_Mean_m": 2300,
    "Slope_Mean": 18.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 55,
    "Agriculture_Cover_Percent": 32,
    "Builtup_Cover_Percent": 3.5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 12,
    "River_Length_km": 42.5,
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 190,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Lolab-Bangus Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Kupwara Water Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Lolab Valley Canals"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Lolab drainage line."
  },
  {
    "Watershed_ID": "kahmil-watershed",
    "Watershed_Name": "Kahmil Watershed",
    "Alternative_Names": [
      "Kahmil Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Pohru Catchment Unit",
    "Parent_Watershed_ID": "pohru-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Kahmil Stream",
    "Districts_Covered": [
      "Kupwara"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.4,
    "Centroid_Longitude": 74.2,
    "Area_km2": 245.8,
    "Perimeter_km": 98.2,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 3200,
    "Elevation_Mean_m": 2100,
    "Slope_Mean": 15.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 48,
    "Agriculture_Cover_Percent": 38,
    "Builtup_Cover_Percent": 4.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 8,
    "River_Length_km": 32.5,
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 165,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Kupwara Local Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Kahmil Canals"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Kahmil drainage line."
  },
  {
    "Watershed_ID": "mawar-watershed",
    "Watershed_Name": "Mawar Watershed",
    "Alternative_Names": [
      "Mawar Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Pohru Catchment Unit",
    "Parent_Watershed_ID": "pohru-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Mawar Nallah",
    "Districts_Covered": [
      "Kupwara"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.35,
    "Centroid_Longitude": 74.15,
    "Area_km2": 195.6,
    "Perimeter_km": 78.2,
    "Elevation_Min_m": 1620,
    "Elevation_Max_m": 3000,
    "Elevation_Mean_m": 2050,
    "Slope_Mean": 16.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 52,
    "Agriculture_Cover_Percent": 34,
    "Builtup_Cover_Percent": 3.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 6,
    "River_Length_km": 28.5,
    "Drainage_Density": 0.92,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Handwara Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Mawar Canals"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Mawar drainage line."
  },
  {
    "Watershed_ID": "hamal-watershed",
    "Watershed_Name": "Hamal Watershed",
    "Alternative_Names": [
      "Hamal Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Pohru Catchment Unit",
    "Parent_Watershed_ID": "pohru-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Hamal Nallah",
    "Districts_Covered": [
      "Baramulla",
      "Kupwara"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.3,
    "Centroid_Longitude": 74.25,
    "Area_km2": 175.4,
    "Perimeter_km": 70.2,
    "Elevation_Min_m": 1590,
    "Elevation_Max_m": 2800,
    "Elevation_Mean_m": 1950,
    "Slope_Mean": 13.8,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 22,
    "Agriculture_Cover_Percent": 62,
    "Builtup_Cover_Percent": 5.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 5,
    "River_Length_km": 22.5,
    "Drainage_Density": 0.88,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 115,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Sopore Local Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Hamal Canals"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Hamal drainage line."
  },
  {
    "Watershed_ID": "bulkul-watershed",
    "Watershed_Name": "Bulkul Watershed",
    "Alternative_Names": [
      "Bulkul Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Pohru Catchment Unit",
    "Parent_Watershed_ID": "pohru-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Bulkul Nallah",
    "Districts_Covered": [
      "Baramulla"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.25,
    "Centroid_Longitude": 74.3,
    "Area_km2": 135.2,
    "Perimeter_km": 54.1,
    "Elevation_Min_m": 1585,
    "Elevation_Max_m": 2500,
    "Elevation_Mean_m": 1850,
    "Slope_Mean": 12.5,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 15,
    "Agriculture_Cover_Percent": 68,
    "Builtup_Cover_Percent": 6.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 4,
    "River_Length_km": 18.5,
    "Drainage_Density": 0.82,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Medium",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 95,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Baramulla Rural Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, verifying the Bulkul drainage line."
  },
  {
    "Watershed_ID": "sasara-watershed-m-0",
    "Watershed_Name": "Sasara Micro-Watershed",
    "Alternative_Names": [
      "Sasara Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sasara Watershed Unit",
    "Parent_Watershed_ID": "sasara-watershed",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Sasara Local",
    "Districts_Covered": [
      "Pulwama"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.81,
    "Centroid_Longitude": 74.91,
    "Area_km2": 15.5,
    "Perimeter_km": 9.3,
    "Elevation_Min_m": 1610,
    "Elevation_Max_m": 2100,
    "Elevation_Mean_m": 1800,
    "Slope_Mean": 10.5,
    "Dominant_Landcover": "Agriculture",
    "Forest_Cover_Percent": 5,
    "Agriculture_Cover_Percent": 75,
    "Builtup_Cover_Percent": 8.5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 4.5,
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 50,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "shaliganga-watershed-m-0",
    "Watershed_Name": "Shaliganga Micro-Watershed",
    "Alternative_Names": [
      "Shaliganga Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shaliganga Watershed Unit",
    "Parent_Watershed_ID": "shaliganga-watershed",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Shaliganga Local",
    "Districts_Covered": [
      "Budgam"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.91,
    "Centroid_Longitude": 74.61,
    "Area_km2": 18.2,
    "Perimeter_km": 10.9,
    "Elevation_Min_m": 1660,
    "Elevation_Max_m": 2300,
    "Elevation_Mean_m": 1950,
    "Slope_Mean": 11.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 40,
    "Agriculture_Cover_Percent": 45,
    "Builtup_Cover_Percent": 4.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 3,
    "River_Length_km": 6.5,
    "Drainage_Density": 0.75,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 60,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Kashmir Core scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "neeru-watershed",
    "Watershed_Name": "Neeru Watershed",
    "Alternative_Names": [
      "Neeru Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Sub-Basin",
    "Parent_Watershed_ID": "chenab-basin",
    "River_System": "Chenab System",
    "Main_River_or_Stream": "Neeru Nallah",
    "Districts_Covered": [
      "Doda"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.15,
    "Centroid_Longitude": 75.6,
    "Area_km2": 245.5,
    "Perimeter_km": 98.2,
    "Elevation_Min_m": 1200,
    "Elevation_Max_m": 3800,
    "Elevation_Mean_m": 2500,
    "Slope_Mean": 22.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 42,
    "Agriculture_Cover_Percent": 18,
    "Builtup_Cover_Percent": 3.5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 8,
    "River_Length_km": 38.5,
    "Drainage_Density": 1.15,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 180,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Bhadarwah Town Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Neeru Canals"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Neeru drainage line."
  },
  {
    "Watershed_ID": "kalnai-watershed",
    "Watershed_Name": "Kalnai Watershed",
    "Alternative_Names": [
      "Kalnai Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Sub-Basin",
    "Parent_Watershed_ID": "chenab-basin",
    "River_System": "Chenab System",
    "Main_River_or_Stream": "Kalnai River",
    "Districts_Covered": [
      "Doda"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.22,
    "Centroid_Longitude": 75.7,
    "Area_km2": 215.8,
    "Perimeter_km": 86.3,
    "Elevation_Min_m": 1300,
    "Elevation_Max_m": 3900,
    "Elevation_Mean_m": 2600,
    "Slope_Mean": 24.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 45,
    "Agriculture_Cover_Percent": 12,
    "Builtup_Cover_Percent": 2.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 6,
    "River_Length_km": 32.5,
    "Drainage_Density": 1.08,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 160,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Doda Local Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Kalnai drainage line."
  },
  {
    "Watershed_ID": "bishleri-watershed",
    "Watershed_Name": "Bishleri Watershed",
    "Alternative_Names": [
      "Bishleri Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Sub-Basin",
    "Parent_Watershed_ID": "chenab-basin",
    "River_System": "Chenab System",
    "Main_River_or_Stream": "Bishleri Stream",
    "Districts_Covered": [
      "Ramban"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.3,
    "Centroid_Longitude": 75.2,
    "Area_km2": 195.4,
    "Perimeter_km": 78.1,
    "Elevation_Min_m": 1100,
    "Elevation_Max_m": 3200,
    "Elevation_Mean_m": 2150,
    "Slope_Mean": 20.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 38,
    "Agriculture_Cover_Percent": 24,
    "Builtup_Cover_Percent": 4.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 5,
    "River_Length_km": 26.5,
    "Drainage_Density": 0.98,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 135,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Banihal Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Bishleri drainage line."
  },
  {
    "Watershed_ID": "ans-watershed",
    "Watershed_Name": "Ans Watershed",
    "Alternative_Names": [
      "Ans Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Sub-Basin",
    "Parent_Watershed_ID": "chenab-basin",
    "River_System": "Chenab System",
    "Main_River_or_Stream": "Ans River",
    "Districts_Covered": [
      "Reasi",
      "Ramban"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.2,
    "Centroid_Longitude": 74.8,
    "Area_km2": 265.8,
    "Perimeter_km": 106.3,
    "Elevation_Min_m": 1250,
    "Elevation_Max_m": 3400,
    "Elevation_Mean_m": 2320,
    "Slope_Mean": 19.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 32,
    "Agriculture_Cover_Percent": 38,
    "Builtup_Cover_Percent": 5.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 7,
    "River_Length_km": 44.5,
    "Drainage_Density": 1.02,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 170,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Reasi Local Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Ans Canals"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Ans drainage line."
  },
  {
    "Watershed_ID": "wakha-watershed",
    "Watershed_Name": "Wakha Watershed",
    "Alternative_Names": [
      "Wakha Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Indus Sub-Basin",
    "Parent_Watershed_ID": "indus-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Wakha Stream",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.4,
    "Centroid_Longitude": 76.25,
    "Area_km2": 380.2,
    "Perimeter_km": 133.1,
    "Elevation_Min_m": 2700,
    "Elevation_Max_m": 5200,
    "Elevation_Mean_m": 3950,
    "Slope_Mean": 24.5,
    "Dominant_Landcover": "Barren",
    "Forest_Cover_Percent": 2,
    "Agriculture_Cover_Percent": 8,
    "Builtup_Cover_Percent": 1.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 4,
    "River_Length_km": 48.5,
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 110,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Kargil Town Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Wakha Canals"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Wakha drainage line."
  },
  {
    "Watershed_ID": "kanji-watershed",
    "Watershed_Name": "Kanji Watershed",
    "Alternative_Names": [
      "Kanji Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Indus Sub-Basin",
    "Parent_Watershed_ID": "indus-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Kanji Nallah",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.22,
    "Centroid_Longitude": 76.45,
    "Area_km2": 295.4,
    "Perimeter_km": 103.3,
    "Elevation_Min_m": 3100,
    "Elevation_Max_m": 5400,
    "Elevation_Mean_m": 4250,
    "Slope_Mean": 26.2,
    "Dominant_Landcover": "Barren",
    "Forest_Cover_Percent": 1,
    "Agriculture_Cover_Percent": 5,
    "Builtup_Cover_Percent": 0.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 3,
    "River_Length_km": 35.5,
    "Drainage_Density": 0.88,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 95,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Kanji Local Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Kanji drainage line."
  },
  {
    "Watershed_ID": "hanle-watershed",
    "Watershed_Name": "Hanle Watershed",
    "Alternative_Names": [
      "Hanle Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Indus Sub-Basin",
    "Parent_Watershed_ID": "indus-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Hanle River",
    "Districts_Covered": [
      "Leh"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 32.8,
    "Centroid_Longitude": 79,
    "Area_km2": 540.2,
    "Perimeter_km": 189.1,
    "Elevation_Min_m": 4200,
    "Elevation_Max_m": 5800,
    "Elevation_Mean_m": 4800,
    "Slope_Mean": 18.5,
    "Dominant_Landcover": "Grassland",
    "Forest_Cover_Percent": 0,
    "Agriculture_Cover_Percent": 2,
    "Builtup_Cover_Percent": 0.5,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 14,
    "River_Length_km": 72.5,
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Hanle Dark Sky Reserve"
    ],
    "Drinking_Water_Linkages": [
      "Local Community Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Hanle drainage line."
  },
  {
    "Watershed_ID": "chushul-watershed",
    "Watershed_Name": "Chushul Watershed",
    "Alternative_Names": [
      "Chushul Catchment"
    ],
    "Watershed_Level": "Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Indus Sub-Basin",
    "Parent_Watershed_ID": "indus-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Chushul Stream",
    "Districts_Covered": [
      "Leh"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.6,
    "Centroid_Longitude": 78.6,
    "Area_km2": 410.5,
    "Perimeter_km": 143.6,
    "Elevation_Min_m": 4300,
    "Elevation_Max_m": 5900,
    "Elevation_Mean_m": 4950,
    "Slope_Mean": 20.2,
    "Dominant_Landcover": "Barren",
    "Forest_Cover_Percent": 0,
    "Agriculture_Cover_Percent": 1,
    "Builtup_Cover_Percent": 0.6,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 8,
    "River_Length_km": 42.5,
    "Drainage_Density": 0.78,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 95,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Community Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, verifying the Chushul drainage line."
  },
  {
    "Watershed_ID": "neeru-watershed-m-0",
    "Watershed_Name": "Neeru Micro-Watershed",
    "Alternative_Names": [
      "Neeru Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neeru Watershed Unit",
    "Parent_Watershed_ID": "neeru-watershed",
    "River_System": "Chenab System",
    "Main_River_or_Stream": "Neeru Local",
    "Districts_Covered": [
      "Doda"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.16,
    "Centroid_Longitude": 75.61,
    "Area_km2": 15.2,
    "Perimeter_km": 9.1,
    "Elevation_Min_m": 1250,
    "Elevation_Max_m": 1800,
    "Elevation_Mean_m": 1550,
    "Slope_Mean": 18.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 40,
    "Agriculture_Cover_Percent": 35,
    "Builtup_Cover_Percent": 5.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 3,
    "River_Length_km": 6.5,
    "Drainage_Density": 0.78,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 70,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "kalnai-watershed-m-0",
    "Watershed_Name": "Kalnai Micro-Watershed",
    "Alternative_Names": [
      "Kalnai Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kalnai Watershed Unit",
    "Parent_Watershed_ID": "kalnai-watershed",
    "River_System": "Chenab System",
    "Main_River_or_Stream": "Kalnai Local",
    "Districts_Covered": [
      "Doda"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.23,
    "Centroid_Longitude": 75.71,
    "Area_km2": 12.8,
    "Perimeter_km": 7.6,
    "Elevation_Min_m": 1350,
    "Elevation_Max_m": 1900,
    "Elevation_Mean_m": 1600,
    "Slope_Mean": 16.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 45,
    "Agriculture_Cover_Percent": 32,
    "Builtup_Cover_Percent": 4.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 5.5,
    "Drainage_Density": 0.72,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 65,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "wakha-watershed-m-0",
    "Watershed_Name": "Wakha Micro-Watershed",
    "Alternative_Names": [
      "Wakha Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Wakha Watershed Unit",
    "Parent_Watershed_ID": "wakha-watershed",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Wakha Local",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.41,
    "Centroid_Longitude": 76.26,
    "Area_km2": 18.5,
    "Perimeter_km": 11.1,
    "Elevation_Min_m": 2750,
    "Elevation_Max_m": 3500,
    "Elevation_Mean_m": 3100,
    "Slope_Mean": 22.1,
    "Dominant_Landcover": "Barren",
    "Forest_Cover_Percent": 0,
    "Agriculture_Cover_Percent": 15,
    "Builtup_Cover_Percent": 2.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 8.5,
    "Drainage_Density": 0.82,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 55,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Trans-Divisional scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "ghizer-sub-basin",
    "Watershed_Name": "Ghizer Sub-Basin",
    "Alternative_Names": [
      "Ghizer Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus GB Basin",
    "Parent_Watershed_ID": "upper-indus-gb-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Ghizer River",
    "Districts_Covered": [
      "Ghizer"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36.2,
    "Centroid_Longitude": 73.8,
    "Area_km2": 645.5,
    "Perimeter_km": 225.2,
    "Elevation_Min_m": 2200,
    "Elevation_Max_m": 5600,
    "Elevation_Mean_m": 3800,
    "Slope_Mean": 24.8,
    "Dominant_Landcover": "Grassland",
    "Forest_Cover_Percent": 3,
    "Agriculture_Cover_Percent": 12,
    "Builtup_Cover_Percent": 1.8,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 16,
    "River_Length_km": 84.5,
    "Drainage_Density": 1.12,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 180,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Ghizer Canals"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Ghizer drainage line."
  },
  {
    "Watershed_ID": "yasin-sub-basin",
    "Watershed_Name": "Yasin Sub-Basin",
    "Alternative_Names": [
      "Yasin Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus GB Basin",
    "Parent_Watershed_ID": "upper-indus-gb-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Yasin River",
    "Districts_Covered": [
      "Gupis-Yasin"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36.4,
    "Centroid_Longitude": 73.4,
    "Area_km2": 512.8,
    "Perimeter_km": 178.5,
    "Elevation_Min_m": 2300,
    "Elevation_Max_m": 5700,
    "Elevation_Mean_m": 3950,
    "Slope_Mean": 25.5,
    "Dominant_Landcover": "Grassland",
    "Forest_Cover_Percent": 2,
    "Agriculture_Cover_Percent": 10,
    "Builtup_Cover_Percent": 1.5,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 10,
    "River_Length_km": 68.5,
    "Drainage_Density": 0.98,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 155,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Yasin Local Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Yasin drainage line."
  },
  {
    "Watershed_ID": "ishkoman-sub-basin",
    "Watershed_Name": "Ishkoman Sub-Basin",
    "Alternative_Names": [
      "Ishkoman Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus GB Basin",
    "Parent_Watershed_ID": "upper-indus-gb-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Ishkoman River",
    "Districts_Covered": [
      "Ghizer"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36.5,
    "Centroid_Longitude": 73.9,
    "Area_km2": 485.4,
    "Perimeter_km": 169.8,
    "Elevation_Min_m": 2100,
    "Elevation_Max_m": 5500,
    "Elevation_Mean_m": 3750,
    "Slope_Mean": 24.2,
    "Dominant_Landcover": "Grassland",
    "Forest_Cover_Percent": 1,
    "Agriculture_Cover_Percent": 8,
    "Builtup_Cover_Percent": 1.2,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 8,
    "River_Length_km": 62.5,
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Ishkoman Local Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Ishkoman drainage line."
  },
  {
    "Watershed_ID": "naltar-sub-basin",
    "Watershed_Name": "Naltar Sub-Basin",
    "Alternative_Names": [
      "Naltar Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus GB Basin",
    "Parent_Watershed_ID": "upper-indus-gb-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Naltar River",
    "Districts_Covered": [
      "Gilgit"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36.1,
    "Centroid_Longitude": 74.2,
    "Area_km2": 245.2,
    "Perimeter_km": 85.8,
    "Elevation_Min_m": 1800,
    "Elevation_Max_m": 4800,
    "Elevation_Mean_m": 3200,
    "Slope_Mean": 22.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 35,
    "Agriculture_Cover_Percent": 12,
    "Builtup_Cover_Percent": 2.2,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 6,
    "River_Length_km": 35.5,
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 110,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Naltar Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Gilgit Town Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Naltar Canals"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Naltar drainage line."
  },
  {
    "Watershed_ID": "shimshal-sub-basin",
    "Watershed_Name": "Shimshal Sub-Basin",
    "Alternative_Names": [
      "Shimshal Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus GB Basin",
    "Parent_Watershed_ID": "upper-indus-gb-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Shimshal River",
    "Districts_Covered": [
      "Hunza"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36.4,
    "Centroid_Longitude": 75.3,
    "Area_km2": 954.2,
    "Perimeter_km": 333.9,
    "Elevation_Min_m": 3000,
    "Elevation_Max_m": 7800,
    "Elevation_Mean_m": 4800,
    "Slope_Mean": 28.5,
    "Dominant_Landcover": "Barren",
    "Forest_Cover_Percent": 0,
    "Agriculture_Cover_Percent": 2,
    "Builtup_Cover_Percent": 0.5,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 12,
    "River_Length_km": 82.5,
    "Drainage_Density": 0.82,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 145,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Khunjerab National Park"
    ],
    "Drinking_Water_Linkages": [
      "Shimshal Local Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Shimshal drainage line."
  },
  {
    "Watershed_ID": "bagrot-sub-basin",
    "Watershed_Name": "Bagrot Sub-Basin",
    "Alternative_Names": [
      "Bagrot Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus GB Basin",
    "Parent_Watershed_ID": "upper-indus-gb-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Bagrot River",
    "Districts_Covered": [
      "Gilgit"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36,
    "Centroid_Longitude": 74.5,
    "Area_km2": 385.4,
    "Perimeter_km": 134.8,
    "Elevation_Min_m": 1600,
    "Elevation_Max_m": 6000,
    "Elevation_Mean_m": 3500,
    "Slope_Mean": 25.2,
    "Dominant_Landcover": "Grassland",
    "Forest_Cover_Percent": 5,
    "Agriculture_Cover_Percent": 15,
    "Builtup_Cover_Percent": 2.5,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 10,
    "River_Length_km": 44.5,
    "Drainage_Density": 0.92,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 120,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Gilgit Town Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Bagrot Canals"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Bagrot drainage line."
  },
  {
    "Watershed_ID": "bunji-sub-basin",
    "Watershed_Name": "Bunji Sub-Basin",
    "Alternative_Names": [
      "Bunji Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus GB Basin",
    "Parent_Watershed_ID": "upper-indus-gb-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Indus Main",
    "Districts_Covered": [
      "Astore",
      "Gilgit"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.6,
    "Centroid_Longitude": 74.6,
    "Area_km2": 295.8,
    "Perimeter_km": 103.5,
    "Elevation_Min_m": 1300,
    "Elevation_Max_m": 4500,
    "Elevation_Mean_m": 2200,
    "Slope_Mean": 22.1,
    "Dominant_Landcover": "Barren",
    "Forest_Cover_Percent": 1,
    "Agriculture_Cover_Percent": 8,
    "Builtup_Cover_Percent": 2.2,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 4,
    "River_Length_km": 38.5,
    "Drainage_Density": 0.82,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 95,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Bunji Supply"
    ],
    "Hydropower_Linkages": [
      "Bunji HEP (Proposed)"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Bunji drainage line."
  },
  {
    "Watershed_ID": "chilas-sub-basin",
    "Watershed_Name": "Chilas Sub-Basin",
    "Alternative_Names": [
      "Chilas Catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Upper Indus GB Basin",
    "Parent_Watershed_ID": "upper-indus-gb-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Indus Main",
    "Districts_Covered": [
      "Diamer"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.4,
    "Centroid_Longitude": 74.1,
    "Area_km2": 412.5,
    "Perimeter_km": 144.3,
    "Elevation_Min_m": 1100,
    "Elevation_Max_m": 4800,
    "Elevation_Mean_m": 2500,
    "Slope_Mean": 24.1,
    "Dominant_Landcover": "Barren",
    "Forest_Cover_Percent": 1,
    "Agriculture_Cover_Percent": 5,
    "Builtup_Cover_Percent": 2.8,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 5,
    "River_Length_km": 42.5,
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 115,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Chilas Local Supply"
    ],
    "Hydropower_Linkages": [
      "Diamer-Bhasha Dam"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Chilas drainage line."
  },
  {
    "Watershed_ID": "kunhar-catchment",
    "Watershed_Name": "Kunhar Catchment",
    "Alternative_Names": [
      "Kunhar Jhelum Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum AJK Basin Unit",
    "Parent_Watershed_ID": "neelum-ajk-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Kunhar River",
    "Districts_Covered": [
      "Muzaffarabad"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.35,
    "Centroid_Longitude": 73.5,
    "Area_km2": 185.2,
    "Perimeter_km": 74.1,
    "Elevation_Min_m": 1100,
    "Elevation_Max_m": 3500,
    "Elevation_Mean_m": 2300,
    "Slope_Mean": 20.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 40,
    "Agriculture_Cover_Percent": 32,
    "Builtup_Cover_Percent": 4.5,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 5,
    "River_Length_km": 28.5,
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 125,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Muzaffarabad Supply"
    ],
    "Hydropower_Linkages": [
      "Patrind HEP"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Kunhar drainage line."
  },
  {
    "Watershed_ID": "kel-catchment",
    "Watershed_Name": "Kel Catchment",
    "Alternative_Names": [
      "Kel Neelum Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum AJK Basin Unit",
    "Parent_Watershed_ID": "neelum-ajk-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Neelum River",
    "Districts_Covered": [
      "Neelum"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.8,
    "Centroid_Longitude": 74.35,
    "Area_km2": 245.5,
    "Perimeter_km": 98.2,
    "Elevation_Min_m": 2000,
    "Elevation_Max_m": 4800,
    "Elevation_Mean_m": 3400,
    "Slope_Mean": 24.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 48,
    "Agriculture_Cover_Percent": 12,
    "Builtup_Cover_Percent": 2.2,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 8,
    "River_Length_km": 32.5,
    "Drainage_Density": 1.05,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 165,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Kel Local Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Kel drainage line."
  },
  {
    "Watershed_ID": "sharda-catchment",
    "Watershed_Name": "Sharda Catchment",
    "Alternative_Names": [
      "Sharda Neelum Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum AJK Basin Unit",
    "Parent_Watershed_ID": "neelum-ajk-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Neelum River",
    "Districts_Covered": [
      "Neelum"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.65,
    "Centroid_Longitude": 74.15,
    "Area_km2": 195.6,
    "Perimeter_km": 78.2,
    "Elevation_Min_m": 1900,
    "Elevation_Max_m": 4500,
    "Elevation_Mean_m": 3200,
    "Slope_Mean": 22.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 52,
    "Agriculture_Cover_Percent": 14,
    "Builtup_Cover_Percent": 2.8,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 6,
    "River_Length_km": 28.5,
    "Drainage_Density": 0.92,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Sharda Local Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Sharda drainage line."
  },
  {
    "Watershed_ID": "athmuqam-catchment",
    "Watershed_Name": "Athmuqam Catchment",
    "Alternative_Names": [
      "Athmuqam Neelum Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum AJK Basin Unit",
    "Parent_Watershed_ID": "neelum-ajk-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Neelum River",
    "Districts_Covered": [
      "Neelum"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.5,
    "Centroid_Longitude": 73.9,
    "Area_km2": 175.4,
    "Perimeter_km": 70.2,
    "Elevation_Min_m": 1300,
    "Elevation_Max_m": 4200,
    "Elevation_Mean_m": 2800,
    "Slope_Mean": 21.8,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 48,
    "Agriculture_Cover_Percent": 18,
    "Builtup_Cover_Percent": 4.8,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 5,
    "River_Length_km": 22.5,
    "Drainage_Density": 0.88,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 115,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Athmuqam Local Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Athmuqam drainage line."
  },
  {
    "Watershed_ID": "karen-catchment",
    "Watershed_Name": "Karen Catchment",
    "Alternative_Names": [
      "Karen Neelum Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Neelum AJK Basin Unit",
    "Parent_Watershed_ID": "neelum-ajk-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Neelum River",
    "Districts_Covered": [
      "Neelum"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.58,
    "Centroid_Longitude": 73.95,
    "Area_km2": 135.2,
    "Perimeter_km": 54.1,
    "Elevation_Min_m": 1400,
    "Elevation_Max_m": 4100,
    "Elevation_Mean_m": 2750,
    "Slope_Mean": 20.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 50,
    "Agriculture_Cover_Percent": 15,
    "Builtup_Cover_Percent": 3.8,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 4,
    "River_Length_km": 18.5,
    "Drainage_Density": 0.82,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 95,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Karen Local Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Karen drainage line."
  },
  {
    "Watershed_ID": "batura-glacial-catchment",
    "Watershed_Name": "Batura Glacial Catchment",
    "Alternative_Names": [
      "Batura Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hunza Sub-Basin Unit",
    "Parent_Watershed_ID": "hunza-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Hunza River",
    "Districts_Covered": [
      "Hunza"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36.55,
    "Centroid_Longitude": 74.45,
    "Area_km2": 380.2,
    "Perimeter_km": 133.1,
    "Elevation_Min_m": 2500,
    "Elevation_Max_m": 7500,
    "Elevation_Mean_m": 5000,
    "Slope_Mean": 26.5,
    "Dominant_Landcover": "Glacier",
    "Forest_Cover_Percent": 0,
    "Agriculture_Cover_Percent": 1,
    "Builtup_Cover_Percent": 0.2,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 3,
    "River_Length_km": 48.5,
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 110,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Community Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Batura drainage line."
  },
  {
    "Watershed_ID": "hispar-glacial-catchment-new",
    "Watershed_Name": "Hispar Glacial Catchment New",
    "Alternative_Names": [
      "Hispar Catchment Unit"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hunza Sub-Basin Unit",
    "Parent_Watershed_ID": "hunza-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Hunza River",
    "Districts_Covered": [
      "Nagar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36.15,
    "Centroid_Longitude": 74.85,
    "Area_km2": 295.4,
    "Perimeter_km": 103.3,
    "Elevation_Min_m": 2600,
    "Elevation_Max_m": 7600,
    "Elevation_Mean_m": 5100,
    "Slope_Mean": 27.2,
    "Dominant_Landcover": "Glacier",
    "Forest_Cover_Percent": 0,
    "Agriculture_Cover_Percent": 2,
    "Builtup_Cover_Percent": 0.5,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 4,
    "River_Length_km": 35.5,
    "Drainage_Density": 0.88,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 95,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Community Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Hispar drainage line."
  },
  {
    "Watershed_ID": "biafo-glacial-catchment",
    "Watershed_Name": "Biafo Glacial Catchment",
    "Alternative_Names": [
      "Biafo Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shigar Sub-Basin Unit",
    "Parent_Watershed_ID": "shigar-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Shigar River",
    "Districts_Covered": [
      "Shigar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.8,
    "Centroid_Longitude": 75.7,
    "Area_km2": 540.2,
    "Perimeter_km": 189.1,
    "Elevation_Min_m": 3000,
    "Elevation_Max_m": 7300,
    "Elevation_Mean_m": 5150,
    "Slope_Mean": 24.5,
    "Dominant_Landcover": "Glacier",
    "Forest_Cover_Percent": 0,
    "Agriculture_Cover_Percent": 1,
    "Builtup_Cover_Percent": 0.1,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 4,
    "River_Length_km": 62.5,
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Central Karakoram National Park"
    ],
    "Drinking_Water_Linkages": [
      "None"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-WAPDA",
    "Source_URL": "http://wapda.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Biafo drainage line."
  },
  {
    "Watershed_ID": "baltoro-glacial-catchment",
    "Watershed_Name": "Baltoro Glacial Catchment",
    "Alternative_Names": [
      "Baltoro Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shigar Sub-Basin Unit",
    "Parent_Watershed_ID": "shigar-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Shigar River",
    "Districts_Covered": [
      "Shigar"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.75,
    "Centroid_Longitude": 76.1,
    "Area_km2": 745.8,
    "Perimeter_km": 261.3,
    "Elevation_Min_m": 3400,
    "Elevation_Max_m": 8600,
    "Elevation_Mean_m": 5500,
    "Slope_Mean": 29.5,
    "Dominant_Landcover": "Glacier",
    "Forest_Cover_Percent": 0,
    "Agriculture_Cover_Percent": 0,
    "Builtup_Cover_Percent": 0,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 3,
    "River_Length_km": 68.5,
    "Drainage_Density": 0.82,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 165,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Central Karakoram National Park"
    ],
    "Drinking_Water_Linkages": [
      "None"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-WAPDA",
    "Source_URL": "http://wapda.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Baltoro drainage line."
  },
  {
    "Watershed_ID": "rupal-valley-catchment",
    "Watershed_Name": "Rupal Valley Catchment",
    "Alternative_Names": [
      "Rupal Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Astore Sub-Basin Unit",
    "Parent_Watershed_ID": "astore-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Astore River",
    "Districts_Covered": [
      "Astore"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 35.2,
    "Centroid_Longitude": 74.7,
    "Area_km2": 245.5,
    "Perimeter_km": 98.2,
    "Elevation_Min_m": 2100,
    "Elevation_Max_m": 8126,
    "Elevation_Mean_m": 3950,
    "Slope_Mean": 28.5,
    "Dominant_Landcover": "Glacier",
    "Forest_Cover_Percent": 5,
    "Agriculture_Cover_Percent": 12,
    "Builtup_Cover_Percent": 1.8,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 6,
    "River_Length_km": 35.5,
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 125,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Community Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-WAPDA",
    "Source_URL": "http://wapda.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, verifying the Rupal Valley drainage line."
  },
  {
    "Watershed_ID": "salkhala-micro-watershed",
    "Watershed_Name": "Salkhala Micro-Watershed",
    "Alternative_Names": [
      "Salkhala Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Kel Catchment Unit",
    "Parent_Watershed_ID": "kel-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Neelum Local",
    "Districts_Covered": [
      "Neelum"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.81,
    "Centroid_Longitude": 74.36,
    "Area_km2": 12.5,
    "Perimeter_km": 7.5,
    "Elevation_Min_m": 2010,
    "Elevation_Max_m": 2800,
    "Elevation_Mean_m": 2400,
    "Slope_Mean": 18.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 65,
    "Agriculture_Cover_Percent": 12,
    "Builtup_Cover_Percent": 2.2,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 3,
    "River_Length_km": 5.5,
    "Drainage_Density": 0.72,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 55,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Salkhala Game Reserve"
    ],
    "Drinking_Water_Linkages": [
      "Local Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "banjosa-micro-watershed",
    "Watershed_Name": "Banjosa Micro-Watershed",
    "Alternative_Names": [
      "Banjosa Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Poonch AJK Catchment Unit",
    "Parent_Watershed_ID": "poonch-ajk-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Poonch Local",
    "Districts_Covered": [
      "Poonch (AJK)"
    ],
    "Region": "AJK",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.81,
    "Centroid_Longitude": 73.86,
    "Area_km2": 14.2,
    "Perimeter_km": 8.5,
    "Elevation_Min_m": 1910,
    "Elevation_Max_m": 2300,
    "Elevation_Mean_m": 2100,
    "Slope_Mean": 14.2,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 55,
    "Agriculture_Cover_Percent": 25,
    "Builtup_Cover_Percent": 5.2,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 4,
    "River_Length_km": 4.5,
    "Drainage_Density": 0.65,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 65,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Low",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Low",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Banjosa Nature Reserve"
    ],
    "Drinking_Water_Linkages": [
      "Local Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-PCRWR",
    "Source_URL": "http://pcrwr.gov.pk/",
    "Source_Type": "Research-Institution",
    "Confidence_Level": "Medium",
    "Verification_Status": "Source Linked",
    "Dashboard_Locked": true,
    "Dashboard_Lock_Reason": "Locked — Pending validation of GIS boundaries or hydrometric datasets",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Modeled GIS catchment unit under the Transboundary / Extended scope, forming Level 5: Micro-Watershed."
  },
  {
    "Watershed_ID": "shyok-basin",
    "Watershed_Name": "Shyok Basin",
    "Alternative_Names": [
      "Shyok River Basin",
      "River of Death Basin"
    ],
    "Watershed_Level": "Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Shyok Sub-Basin",
    "Parent_Watershed_ID": "indus-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Shyok River",
    "Districts_Covered": [
      "Leh",
      "Ghanche"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "India and Pakistan",
    "Boundary_Source": "ISRO Bhuvan / GIS Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.6,
    "Centroid_Longitude": 77.8,
    "Area_km2": 10250,
    "Perimeter_km": 1250,
    "Elevation_Min_m": 2500,
    "Elevation_Max_m": 7500,
    "Elevation_Mean_m": 4800,
    "Slope_Mean": 28.5,
    "Dominant_Landcover": "Barren / Snow",
    "Forest_Cover_Percent": 1.5,
    "Agriculture_Cover_Percent": 2,
    "Builtup_Cover_Percent": 0.5,
    "Wetland_Count": 4,
    "Lake_Count": 12,
    "Spring_Count": 15,
    "River_Length_km": 550,
    "Drainage_Density": 0.58,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 180,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Karakoram Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Leh Water Schemes"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Khuls"
    ],
    "Monitoring_Stations": [
      "Diskit Hydrological Station"
    ],
    "Source_ID": "SRC-IND-ISRO",
    "Source_URL": "https://bhuvan.nrsc.gov.in",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A major transboundary river basin originating from the Rimo Glacier. Known for glacial outburst floods (GLOFs) and high tectonic activity."
  },
  {
    "Watershed_ID": "gilgit-basin",
    "Watershed_Name": "Gilgit Basin",
    "Alternative_Names": [
      "Gilgit River Basin"
    ],
    "Watershed_Level": "Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Gilgit Sub-Basin",
    "Parent_Watershed_ID": "upper-indus-gb-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Gilgit River",
    "Districts_Covered": [
      "Gilgit",
      "Ghizer",
      "Gupis-Yasin"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "WAPDA GIS Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36.15,
    "Centroid_Longitude": 73.8,
    "Area_km2": 12100,
    "Perimeter_km": 1450,
    "Elevation_Min_m": 1450,
    "Elevation_Max_m": 7200,
    "Elevation_Mean_m": 3850,
    "Slope_Mean": 26.8,
    "Dominant_Landcover": "Barren / Snow",
    "Forest_Cover_Percent": 3.5,
    "Agriculture_Cover_Percent": 4.8,
    "Builtup_Cover_Percent": 1.2,
    "Wetland_Count": 3,
    "Lake_Count": 15,
    "Spring_Count": 22,
    "River_Length_km": 240,
    "Drainage_Density": 0.62,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 210,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Gilgit City Supply"
    ],
    "Hydropower_Linkages": [
      "Gilgit Hydropower Project"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "Gilgit Hydrometric Station"
    ],
    "Source_ID": "SRC-PAK-WAPDA",
    "Source_URL": "http://wapda.gov.pk/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A major sub-basin of the Upper Indus Basin, draining the Hindu Kush range. Characterized by high glaciated terrain and frequent landslide damming."
  },
  {
    "Watershed_ID": "east-lidder-sub-basin",
    "Watershed_Name": "East Lidder Sub-Basin",
    "Alternative_Names": [
      "Sheshnag stream catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "lidder-sub-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "East Lidder River",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.08,
    "Centroid_Longitude": 75.32,
    "Area_km2": 450.5,
    "Perimeter_km": 120.2,
    "Elevation_Min_m": 2100,
    "Elevation_Max_m": 4900,
    "Elevation_Mean_m": 3500,
    "Slope_Mean": 22.4,
    "Dominant_Landcover": "Snow / Alpine Meadow",
    "Forest_Cover_Percent": 28.5,
    "Agriculture_Cover_Percent": 12,
    "Builtup_Cover_Percent": 2.2,
    "Wetland_Count": 2,
    "Lake_Count": 6,
    "Spring_Count": 14,
    "River_Length_km": 42,
    "Drainage_Density": 0.95,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Medium",
    "Groundwater_Recharge_Value": 185,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Overa-Aru Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Pahalgam Water Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Lidder Canals"
    ],
    "Monitoring_Stations": [
      "Pahalgam Hydrologic Station"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Originating from the Kolahoi and Sheshnag glaciers, it merges with the West Lidder at Pahalgam. Crucial for the Amarnath Yatra pilgrimage route."
  },
  {
    "Watershed_ID": "west-lidder-sub-basin",
    "Watershed_Name": "West Lidder Sub-Basin",
    "Alternative_Names": [
      "Aru stream catchment"
    ],
    "Watershed_Level": "Sub-Basin",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "lidder-sub-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "West Lidder River",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.12,
    "Centroid_Longitude": 75.25,
    "Area_km2": 380.2,
    "Perimeter_km": 98.4,
    "Elevation_Min_m": 2100,
    "Elevation_Max_m": 5300,
    "Elevation_Mean_m": 3700,
    "Slope_Mean": 24.8,
    "Dominant_Landcover": "Snow / Forest",
    "Forest_Cover_Percent": 35.8,
    "Agriculture_Cover_Percent": 8,
    "Builtup_Cover_Percent": 1.5,
    "Wetland_Count": 1,
    "Lake_Count": 8,
    "Spring_Count": 11,
    "River_Length_km": 36.5,
    "Drainage_Density": 0.92,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Medium",
    "Groundwater_Recharge_Value": 175,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Overa-Aru Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Aru Local Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Lidder Canals"
    ],
    "Monitoring_Stations": [
      "Aru Hydrometric Station"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Originating from the Kolahoi Glacier near Aru Valley. Highly sensitive to glacier retreat and climate warming."
  },
  {
    "Watershed_ID": "chandanwari-catchment",
    "Watershed_Name": "Chandanwari Catchment",
    "Alternative_Names": [
      "Chandanwari Catchment Unit"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "east-lidder-sub-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "East Lidder River",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.09,
    "Centroid_Longitude": 75.35,
    "Area_km2": 125.4,
    "Perimeter_km": 52.8,
    "Elevation_Min_m": 2300,
    "Elevation_Max_m": 4600,
    "Elevation_Mean_m": 3450,
    "Slope_Mean": 24.2,
    "Dominant_Landcover": "Alpine Meadow",
    "Forest_Cover_Percent": 22,
    "Agriculture_Cover_Percent": 5,
    "Builtup_Cover_Percent": 1.8,
    "Wetland_Count": 1,
    "Lake_Count": 3,
    "Spring_Count": 8,
    "River_Length_km": 18.5,
    "Drainage_Density": 0.88,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Medium",
    "Groundwater_Recharge_Value": 95,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Chandanwari Local Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A critical high-altitude catchment along the Amarnath Yatra track. Subject to intense tourist pressure and high soil erosion risk."
  },
  {
    "Watershed_ID": "aru-catchment",
    "Watershed_Name": "Aru Catchment",
    "Alternative_Names": [
      "Aru Catchment Unit"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "west-lidder-sub-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "West Lidder River",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.14,
    "Centroid_Longitude": 75.24,
    "Area_km2": 145.2,
    "Perimeter_km": 58.6,
    "Elevation_Min_m": 2400,
    "Elevation_Max_m": 5100,
    "Elevation_Mean_m": 3600,
    "Slope_Mean": 25.5,
    "Dominant_Landcover": "Forest / Meadow",
    "Forest_Cover_Percent": 32.5,
    "Agriculture_Cover_Percent": 4,
    "Builtup_Cover_Percent": 1.2,
    "Wetland_Count": 1,
    "Lake_Count": 4,
    "Spring_Count": 7,
    "River_Length_km": 22,
    "Drainage_Density": 0.85,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 110,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Overa-Aru Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Aru Town Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A scenic high-altitude catchment centered around the Aru meadow. Extremely important for ecotourism and conservation of Himalayan biodiversity."
  },
  {
    "Watershed_ID": "drass-catchment",
    "Watershed_Name": "Drass Catchment",
    "Alternative_Names": [
      "Drass River Catchment"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Suru Sub-Basin",
    "Parent_Watershed_ID": "dras-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Drass River",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.42,
    "Centroid_Longitude": 75.78,
    "Area_km2": 1650,
    "Perimeter_km": 210,
    "Elevation_Min_m": 2900,
    "Elevation_Max_m": 6100,
    "Elevation_Mean_m": 4200,
    "Slope_Mean": 24.5,
    "Dominant_Landcover": "Barren",
    "Forest_Cover_Percent": 0.5,
    "Agriculture_Cover_Percent": 2.2,
    "Builtup_Cover_Percent": 0.8,
    "Wetland_Count": 2,
    "Lake_Count": 6,
    "Spring_Count": 12,
    "River_Length_km": 86,
    "Drainage_Density": 0.54,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 75,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Drass Town Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local irrigation channels"
    ],
    "Monitoring_Stations": [
      "Drass Station"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A major cold-arid catchment originating near the Zojila Pass. Renowned for experiencing some of the lowest temperatures in the inhabited world."
  },
  {
    "Watershed_ID": "amarnath-micro-watershed",
    "Watershed_Name": "Amarnath Micro-Watershed",
    "Alternative_Names": [
      "Amarnath Valley Micro-Catchment"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "chandanwari-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Amarnath Stream",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.21,
    "Centroid_Longitude": 75.5,
    "Area_km2": 22.5,
    "Perimeter_km": 18.2,
    "Elevation_Min_m": 3500,
    "Elevation_Max_m": 5200,
    "Elevation_Mean_m": 4100,
    "Slope_Mean": 26.5,
    "Dominant_Landcover": "Snow / Rock",
    "Forest_Cover_Percent": 0,
    "Agriculture_Cover_Percent": 0,
    "Builtup_Cover_Percent": 0.5,
    "Wetland_Count": 0,
    "Lake_Count": 1,
    "Spring_Count": 2,
    "River_Length_km": 6.5,
    "Drainage_Density": 0.72,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 30,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "High",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Pilgrimage Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "High-altitude glaciated micro-watershed surrounding the holy Amarnath Cave. High tourism impact during the summer pilgrimage."
  },
  {
    "Watershed_ID": "betaab-valley-micro-watershed",
    "Watershed_Name": "Betaab Valley Micro-Watershed",
    "Alternative_Names": [
      "Hajan Valley Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "pahalgam-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "East Lidder Local",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.03,
    "Centroid_Longitude": 75.33,
    "Area_km2": 18.5,
    "Perimeter_km": 12.2,
    "Elevation_Min_m": 2200,
    "Elevation_Max_m": 3500,
    "Elevation_Mean_m": 2600,
    "Slope_Mean": 18.2,
    "Dominant_Landcover": "Forest / Meadow",
    "Forest_Cover_Percent": 48,
    "Agriculture_Cover_Percent": 12,
    "Builtup_Cover_Percent": 3.5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 4,
    "River_Length_km": 5.2,
    "Drainage_Density": 0.82,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 65,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Pahalgam Water Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A highly frequented tourist site in Pahalgam. Heavy pressure on river banks and ecological restoration is active."
  },
  {
    "Watershed_ID": "aru-meadow-micro-watershed",
    "Watershed_Name": "Aru Meadow Micro-Watershed",
    "Alternative_Names": [
      "Aru Village Micro-Catchment"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Lidder Sub-Basin",
    "Parent_Watershed_ID": "aru-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "West Lidder Local",
    "Districts_Covered": [
      "Anantnag"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.15,
    "Centroid_Longitude": 75.26,
    "Area_km2": 15.8,
    "Perimeter_km": 10.4,
    "Elevation_Min_m": 2410,
    "Elevation_Max_m": 3200,
    "Elevation_Mean_m": 2750,
    "Slope_Mean": 16.5,
    "Dominant_Landcover": "Meadow / Pine Forest",
    "Forest_Cover_Percent": 52,
    "Agriculture_Cover_Percent": 8,
    "Builtup_Cover_Percent": 2.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 3,
    "River_Length_km": 4.8,
    "Drainage_Density": 0.78,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Medium",
    "Groundwater_Recharge_Value": 58,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "Overa-Aru Wildlife Sanctuary"
    ],
    "Drinking_Water_Linkages": [
      "Aru Local Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Small micro-watershed enclosing the Aru village and alpine tourist resort. Noted for pasture degradation."
  },
  {
    "Watershed_ID": "chinta-valley-micro-watershed",
    "Watershed_Name": "Chinta Valley Micro-Watershed",
    "Alternative_Names": [
      "Chinta Nallah Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Sub-Basin",
    "Parent_Watershed_ID": "bhadarwah-catchment",
    "River_System": "Chenab System",
    "Main_River_or_Stream": "Chinta Nallah",
    "Districts_Covered": [
      "Doda"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 33.02,
    "Centroid_Longitude": 75.63,
    "Area_km2": 24.8,
    "Perimeter_km": 20.4,
    "Elevation_Min_m": 1800,
    "Elevation_Max_m": 3200,
    "Elevation_Mean_m": 2350,
    "Slope_Mean": 21.2,
    "Dominant_Landcover": "Coniferous Forest",
    "Forest_Cover_Percent": 62,
    "Agriculture_Cover_Percent": 22,
    "Builtup_Cover_Percent": 3.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 5,
    "River_Length_km": 8.2,
    "Drainage_Density": 0.98,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 88,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Chinta Local Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A scenic high-altitude coniferous valley draining into the Neeru river. Prone to winter avalanches and landslides."
  },
  {
    "Watershed_ID": "drass-valley-micro-watershed",
    "Watershed_Name": "Drass Valley Micro-Watershed",
    "Alternative_Names": [
      "Drass Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Suru Sub-Basin",
    "Parent_Watershed_ID": "drass-catchment",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Drass River Local",
    "Districts_Covered": [
      "Kargil"
    ],
    "Region": "Ladakh",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.43,
    "Centroid_Longitude": 75.76,
    "Area_km2": 32.5,
    "Perimeter_km": 24.2,
    "Elevation_Min_m": 3000,
    "Elevation_Max_m": 4800,
    "Elevation_Mean_m": 3800,
    "Slope_Mean": 18.5,
    "Dominant_Landcover": "Barren / Meadow",
    "Forest_Cover_Percent": 0.2,
    "Agriculture_Cover_Percent": 4.5,
    "Builtup_Cover_Percent": 1.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 4,
    "River_Length_km": 9.5,
    "Drainage_Density": 0.58,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 45,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Drass Town Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Covers the habitable valley floor of Drass. Undergoes extreme freezing and glacial melt dynamics."
  },
  {
    "Watershed_ID": "attabad-lake-micro-watershed",
    "Watershed_Name": "Attabad Lake Micro-Watershed",
    "Alternative_Names": [
      "Attabad Landslide Lake Catchment"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hunza Sub-Basin",
    "Parent_Watershed_ID": "hunza-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Hunza River",
    "Districts_Covered": [
      "Hunza"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "WAPDA GIS Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36.31,
    "Centroid_Longitude": 74.86,
    "Area_km2": 45.2,
    "Perimeter_km": 32.4,
    "Elevation_Min_m": 2400,
    "Elevation_Max_m": 6000,
    "Elevation_Mean_m": 4100,
    "Slope_Mean": 34.2,
    "Dominant_Landcover": "Barren / Water",
    "Forest_Cover_Percent": 0.5,
    "Agriculture_Cover_Percent": 1.2,
    "Builtup_Cover_Percent": 0.8,
    "Wetland_Count": 1,
    "Lake_Count": 1,
    "Spring_Count": 3,
    "River_Length_km": 12,
    "Drainage_Density": 0.45,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 35,
    "Soil_Erosion_Risk": "Critical",
    "Flood_Risk": "Critical",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Critical",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Village Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Khuls"
    ],
    "Monitoring_Stations": [
      "Attabad Lake Monitoring Station"
    ],
    "Source_ID": "SRC-PAK-WAPDA",
    "Source_URL": "http://wapda.gov.pk/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Formed in 2010 by a massive landslide blocking the Hunza River. Highly vulnerable to landslide outburst floods and massive sediment inflow."
  },
  {
    "Watershed_ID": "passu-glacier-micro-watershed",
    "Watershed_Name": "Passu Glacier Micro-Watershed",
    "Alternative_Names": [
      "Passu Glacier Catchment Unit"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Hunza Sub-Basin",
    "Parent_Watershed_ID": "hunza-sub-basin",
    "River_System": "Indus System",
    "Main_River_or_Stream": "Passu Stream",
    "Districts_Covered": [
      "Hunza"
    ],
    "Region": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Country_Admin_Context": "Pakistan (Administered)",
    "Boundary_Source": "WAPDA GIS Delineation",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 36.47,
    "Centroid_Longitude": 74.88,
    "Area_km2": 38.4,
    "Perimeter_km": 26.5,
    "Elevation_Min_m": 2500,
    "Elevation_Max_m": 7200,
    "Elevation_Mean_m": 4800,
    "Slope_Mean": 35.8,
    "Dominant_Landcover": "Glacier / Barren",
    "Forest_Cover_Percent": 0.1,
    "Agriculture_Cover_Percent": 0.8,
    "Builtup_Cover_Percent": 0.3,
    "Wetland_Count": 0,
    "Lake_Count": 2,
    "Spring_Count": 1,
    "River_Length_km": 8.5,
    "Drainage_Density": 0.38,
    "Glacier_Contribution": "High",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "Low",
    "Groundwater_Recharge_Value": 25,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Critical",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "Critical",
    "Restoration_Priority": "Moderate",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Passu Village Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-PAK-WAPDA",
    "Source_URL": "http://wapda.gov.pk/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A steep, glaciated micro-watershed draining the Passu Glacier. Highly sensitive to glacier acceleration and surge dynamics."
  },
  {
    "Watershed_ID": "gund-catchment",
    "Watershed_Name": "Gund Catchment",
    "Alternative_Names": [
      "Gund Catchment Unit"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sind Sub-Basin",
    "Parent_Watershed_ID": "sind-sub-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Sind River",
    "Districts_Covered": [
      "Ganderbal"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.25,
    "Centroid_Longitude": 74.98,
    "Area_km2": 195.4,
    "Perimeter_km": 74.2,
    "Elevation_Min_m": 1900,
    "Elevation_Max_m": 4500,
    "Elevation_Mean_m": 3200,
    "Slope_Mean": 21.8,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 44.5,
    "Agriculture_Cover_Percent": 18,
    "Builtup_Cover_Percent": 2.8,
    "Wetland_Count": 0,
    "Lake_Count": 1,
    "Spring_Count": 6,
    "River_Length_km": 24.5,
    "Drainage_Density": 0.92,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 145,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Gund Water Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A crucial mid-elevation catchment of the Sind river basin, heavily forested but subject to highway expansion pressures."
  },
  {
    "Watershed_ID": "kangan-catchment",
    "Watershed_Name": "Kangan Catchment",
    "Alternative_Names": [
      "Kangan Catchment Unit"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sind Sub-Basin",
    "Parent_Watershed_ID": "sind-sub-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Sind River",
    "Districts_Covered": [
      "Ganderbal"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.27,
    "Centroid_Longitude": 74.9,
    "Area_km2": 175.2,
    "Perimeter_km": 68.4,
    "Elevation_Min_m": 1700,
    "Elevation_Max_m": 3900,
    "Elevation_Mean_m": 2800,
    "Slope_Mean": 19.5,
    "Dominant_Landcover": "Forest / Agriculture",
    "Forest_Cover_Percent": 38,
    "Agriculture_Cover_Percent": 32,
    "Builtup_Cover_Percent": 5.5,
    "Wetland_Count": 1,
    "Lake_Count": 0,
    "Spring_Count": 8,
    "River_Length_km": 21.5,
    "Drainage_Density": 0.88,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 130,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Kangan Town Scheme",
      "Srinagar Water Supply"
    ],
    "Hydropower_Linkages": [
      "Upper Sindh Hydropower Project"
    ],
    "Irrigation_Linkages": [
      "Sind Canals"
    ],
    "Monitoring_Stations": [
      "Kangan Hydrologic Station"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A highly significant catchment hosting major water diversion structures for hydroelectricity and drinking water for Srinagar city."
  },
  {
    "Watershed_ID": "gund-village-micro-watershed",
    "Watershed_Name": "Gund Village Micro-Watershed",
    "Alternative_Names": [
      "Gund Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sind Sub-Basin",
    "Parent_Watershed_ID": "gund-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Sind Local",
    "Districts_Covered": [
      "Ganderbal"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.26,
    "Centroid_Longitude": 74.99,
    "Area_km2": 19.8,
    "Perimeter_km": 14.5,
    "Elevation_Min_m": 1910,
    "Elevation_Max_m": 2800,
    "Elevation_Mean_m": 2350,
    "Slope_Mean": 17.2,
    "Dominant_Landcover": "Forest / Agriculture",
    "Forest_Cover_Percent": 55,
    "Agriculture_Cover_Percent": 25,
    "Builtup_Cover_Percent": 4.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 2,
    "River_Length_km": 5.8,
    "Drainage_Density": 0.76,
    "Glacier_Contribution": "Medium",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 62,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "Moderate",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Gund Local Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Small micro-watershed surrounding the Gund settlement area, highly prone to spring runoff sedimentation."
  },
  {
    "Watershed_ID": "kangan-town-micro-watershed",
    "Watershed_Name": "Kangan Town Micro-Watershed",
    "Alternative_Names": [
      "Kangan Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sind Sub-Basin",
    "Parent_Watershed_ID": "kangan-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Sind Local",
    "Districts_Covered": [
      "Ganderbal"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.28,
    "Centroid_Longitude": 74.91,
    "Area_km2": 22.4,
    "Perimeter_km": 16.8,
    "Elevation_Min_m": 1710,
    "Elevation_Max_m": 2600,
    "Elevation_Mean_m": 2150,
    "Slope_Mean": 15.5,
    "Dominant_Landcover": "Agriculture / Built-Up",
    "Forest_Cover_Percent": 32,
    "Agriculture_Cover_Percent": 44,
    "Builtup_Cover_Percent": 12.5,
    "Wetland_Count": 1,
    "Lake_Count": 0,
    "Spring_Count": 3,
    "River_Length_km": 6.2,
    "Drainage_Density": 0.81,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 55,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Kangan Urban Scheme"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A micro-watershed with high built-up and agricultural density, creating moderate pollution risk for the main Sind River."
  },
  {
    "Watershed_ID": "erin-catchment",
    "Watershed_Name": "Erin Catchment",
    "Alternative_Names": [
      "Erin Catchment Unit"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Jhelum Sub-Basin",
    "Parent_Watershed_ID": "wular-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Erin Nallah",
    "Districts_Covered": [
      "Bandipora"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.45,
    "Centroid_Longitude": 74.68,
    "Area_km2": 135.8,
    "Perimeter_km": 56.4,
    "Elevation_Min_m": 1585,
    "Elevation_Max_m": 4200,
    "Elevation_Mean_m": 2900,
    "Slope_Mean": 22.8,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 58,
    "Agriculture_Cover_Percent": 25,
    "Builtup_Cover_Percent": 3.2,
    "Wetland_Count": 0,
    "Lake_Count": 2,
    "Spring_Count": 7,
    "River_Length_km": 26.5,
    "Drainage_Density": 0.94,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 120,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Bandipora Town Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A major right-bank catchment of Wular Lake, famous for alpine lakes like Sarbal Lake in its upper reaches."
  },
  {
    "Watershed_ID": "madhumati-catchment",
    "Watershed_Name": "Madhumati Catchment",
    "Alternative_Names": [
      "Madhumati Catchment Unit"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Jhelum Sub-Basin",
    "Parent_Watershed_ID": "wular-catchment",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Madhumati River",
    "Districts_Covered": [
      "Bandipora"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.48,
    "Centroid_Longitude": 74.62,
    "Area_km2": 155.4,
    "Perimeter_km": 62.8,
    "Elevation_Min_m": 1585,
    "Elevation_Max_m": 4500,
    "Elevation_Mean_m": 3040,
    "Slope_Mean": 24.5,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 52,
    "Agriculture_Cover_Percent": 28,
    "Builtup_Cover_Percent": 4.2,
    "Wetland_Count": 0,
    "Lake_Count": 1,
    "Spring_Count": 9,
    "River_Length_km": 32,
    "Drainage_Density": 0.96,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 135,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Bandipora Water Schemes"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Channels"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A highly critical catchment feeding Wular Lake. Subject to significant siltation and erosion, causing wetland shallowing."
  },
  {
    "Watershed_ID": "bhadarwah-catchment",
    "Watershed_Name": "Bhadarwah Catchment",
    "Alternative_Names": [
      "Neeru Bhadarwah Catchment Unit"
    ],
    "Watershed_Level": "Catchment",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Sub-Basin",
    "Parent_Watershed_ID": "neeru-watershed",
    "River_System": "Chenab System",
    "Main_River_or_Stream": "Neeru Nallah",
    "Districts_Covered": [
      "Doda"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 32.98,
    "Centroid_Longitude": 75.7,
    "Area_km2": 185.2,
    "Perimeter_km": 72.8,
    "Elevation_Min_m": 1200,
    "Elevation_Max_m": 3900,
    "Elevation_Mean_m": 2550,
    "Slope_Mean": 22.4,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 48,
    "Agriculture_Cover_Percent": 18,
    "Builtup_Cover_Percent": 4.8,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 12,
    "River_Length_km": 28.5,
    "Drainage_Density": 1.12,
    "Glacier_Contribution": "Low",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 140,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Moderate",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Moderate",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Bhadarwah Town Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "Local Canals"
    ],
    "Monitoring_Stations": [
      "Bhadarwah Station"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "Encompasses the Bhadarwah valley and mountainous fringes, draining into the Chenab River. Noted for high spring-shed density."
  },
  {
    "Watershed_ID": "bhadarwah-town-micro-watershed",
    "Watershed_Name": "Bhadarwah Town Micro-Watershed",
    "Alternative_Names": [
      "Bhadarwah Local Micro-Watershed"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Chenab Sub-Basin",
    "Parent_Watershed_ID": "bhadarwah-catchment",
    "River_System": "Chenab System",
    "Main_River_or_Stream": "Neeru Local",
    "Districts_Covered": [
      "Doda"
    ],
    "Region": "Jammu",
    "Ecological_Scope": "Trans-Divisional",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 32.99,
    "Centroid_Longitude": 75.71,
    "Area_km2": 18.2,
    "Perimeter_km": 12.8,
    "Elevation_Min_m": 1210,
    "Elevation_Max_m": 2200,
    "Elevation_Mean_m": 1700,
    "Slope_Mean": 14.5,
    "Dominant_Landcover": "Built-Up / Agriculture",
    "Forest_Cover_Percent": 12,
    "Agriculture_Cover_Percent": 55,
    "Builtup_Cover_Percent": 22.5,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 4,
    "River_Length_km": 4.8,
    "Drainage_Density": 0.78,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "Low",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 45,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "Moderate",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "High",
    "Sediment_Load_Risk": "Moderate",
    "Encroachment_Risk": "High",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Bhadarwah Town Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A micro-watershed with significant municipal and household sewage load. Crucial for town-level sanitation and water quality management."
  },
  {
    "Watershed_ID": "purinbal-nallah-micro-watershed",
    "Watershed_Name": "Purinbal Nallah Micro-Watershed",
    "Alternative_Names": [
      "Purinbal Nallah Micro-Catchment"
    ],
    "Watershed_Level": "Micro-Watershed",
    "Basin": "Indus Basin",
    "Sub_Basin": "Sind Sub-Basin",
    "Parent_Watershed_ID": "sind-sub-basin",
    "River_System": "Jhelum System",
    "Main_River_or_Stream": "Purinbal Nallah",
    "Districts_Covered": [
      "Ganderbal"
    ],
    "Region": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Country_Admin_Context": "India (J&K)",
    "Boundary_Source": "GIS Delineation Study",
    "Boundary_File_Link": "Source Required",
    "Centroid_Latitude": 34.31,
    "Centroid_Longitude": 74.96,
    "Area_km2": 12.8,
    "Perimeter_km": 9.4,
    "Elevation_Min_m": 2100,
    "Elevation_Max_m": 3800,
    "Elevation_Mean_m": 2950,
    "Slope_Mean": 24.8,
    "Dominant_Landcover": "Forest",
    "Forest_Cover_Percent": 68,
    "Agriculture_Cover_Percent": 8,
    "Builtup_Cover_Percent": 1.2,
    "Wetland_Count": 0,
    "Lake_Count": 0,
    "Spring_Count": 4,
    "River_Length_km": 4.2,
    "Drainage_Density": 0.88,
    "Glacier_Contribution": "None",
    "Snow_Cover_Contribution": "High",
    "Rainfall_Contribution": "High",
    "Groundwater_Recharge_Value": 75,
    "Soil_Erosion_Risk": "High",
    "Flood_Risk": "High",
    "Landslide_Risk": "High",
    "Drought_Risk": "Low",
    "Pollution_Load_Risk": "Low",
    "Sediment_Load_Risk": "High",
    "Encroachment_Risk": "Low",
    "Climate_Vulnerability": "High",
    "Restoration_Priority": "High",
    "Protected_Area_Linkages": [
      "None"
    ],
    "Drinking_Water_Linkages": [
      "Local Village Supply"
    ],
    "Hydropower_Linkages": [
      "None"
    ],
    "Irrigation_Linkages": [
      "None"
    ],
    "Monitoring_Stations": [
      "None"
    ],
    "Source_ID": "SRC-GOV-JKEERS",
    "Source_URL": "https://jkecology.nic.in/",
    "Source_Type": "Government-Database",
    "Confidence_Level": "High",
    "Verification_Status": "Verified",
    "Dashboard_Locked": false,
    "Dashboard_Lock_Reason": "Cleared for use",
    "Last_Updated": "2026-06-16T00:00:00Z",
    "Notes": "A heavily forested micro-watershed in the Sind catchment, researched for soil erosion vulnerability and slope stability."
  }
];
