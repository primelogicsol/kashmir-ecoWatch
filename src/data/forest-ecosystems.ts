import { Scope } from './geography';

// ---------------------------------------------------------
// AUTHORITATIVE SOURCES REGISTRY
// ---------------------------------------------------------
export const FEIN_SOURCES = [
  { id: 'fsi', name: 'Forest Survey of India (FSI)', type: 'ISFR 2023', scope: 'India' },
  { id: 'gfw', name: 'Global Forest Watch', type: 'Hansen Global Forest Change', scope: 'Global' },
  { id: 'jkfd', name: 'J&K Forest Department', type: 'Working Plans', scope: 'J&K' },
  { id: 'ajkfd', name: 'AJK Forest Department', type: 'Working Plans', scope: 'AJK' },
  { id: 'gbfd', name: 'GB Forest Department', type: 'Working Plans', scope: 'GB' },
  { id: 'icimod', name: 'ICIMOD', type: 'Himalayan Ecosystems', scope: 'Transboundary' }
];

export type AdministrativeScope = 'Kashmir Core' | 'Jammu Division' | 'Ladakh Division' | 'Azad Kashmir' | 'Gilgit-Baltistan';
export type LandscapeBelt = 'Pir Panjal' | 'Greater Himalaya' | 'Karakoram' | 'Upper Indus Basin' | 'Western Himalaya';

export interface DistrictForestData {
  District_ID: string;
  District_Name: string;
  Administrative_Scope: AdministrativeScope;
  Ecological_Scope: string;
  Landscape_Belt: string[];
  Forest_Types: string[];
  Primary_Forest_Type: string;
  Secondary_Forest_Type: string;
  Forest_Cover_Percent: number | 'Pending';
  Forest_Cover_Class: string;
  Canopy_Health: string;
  Deforestation_Risk: string;
  Tree_Directory_Count: number;
  Forest_Wildlife_Count: number;
  Habitat_Types: string[];
  Health_Monitoring_Score: number;
  Fragmentation_Level: string;
  Wildlife_Corridor_Value: string;
  Forest_Fire_Risk: string;
  Disturbance_Level: string;
  Invasive_Species_Risk: string;
  Regeneration_Status: string;
  Carbon_Biomass_Value: string;
  Ecosystem_Services_Value: string;
  Restoration_Priority: string;
  Community_Forestry_Status: string;
  Early_Warning_Status: string;
  Primary_Data_Source: string;
  Confidence_Level: number;
  Elevation_Min_m: number;
  Elevation_Max_m: number;
  Watershed_Basin: string;
  Forest_Cover_SqKm?: number;
}

export const masterForestDatabase: DistrictForestData[] = [
  {
    "District_ID": "DIST-SRI",
    "District_Name": "Srinagar",
    "Administrative_Scope": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Landscape_Belt": [
      "Kashmir Valley",
      "Western Himalaya"
    ],
    "Forest_Types": [
      "Low"
    ],
    "Primary_Forest_Type": "Low",
    "Secondary_Forest_Type": "urban/riparian",
    "Forest_Cover_Percent": 21,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "High urban pressure",
    "Tree_Directory_Count": 30,
    "Forest_Wildlife_Count": 7,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 66,
    "Canopy_Health": "Fragmented",
    "Fragmentation_Level": "High",
    "Wildlife_Corridor_Value": "Low-Medium",
    "Forest_Fire_Risk": "Low",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "8 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2021/2023 (Verified: 45.17 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 45.17
  },
  {
    "District_ID": "DIST-GAN",
    "District_Name": "Ganderbal",
    "Administrative_Scope": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Landscape_Belt": [
      "Kashmir Valley",
      "Western Himalaya"
    ],
    "Forest_Types": [
      "Moderate-high mountain forest"
    ],
    "Primary_Forest_Type": "Moderate-high mountain forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 59,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 32,
    "Forest_Wildlife_Count": 19,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 61,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "2 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2021/2023 (Verified: 490.66 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 490.66
  },
  {
    "District_ID": "DIST-BAN",
    "District_Name": "Bandipora",
    "Administrative_Scope": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Landscape_Belt": [
      "Kashmir Valley",
      "Western Himalaya"
    ],
    "Forest_Types": [
      "High forest/wetland-linked"
    ],
    "Primary_Forest_Type": "High forest/wetland-linked",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 31,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 39,
    "Forest_Wildlife_Count": 7,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 82,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "6 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2021/2023 (Verified: 884.05 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 884.05
  },
  {
    "District_ID": "DIST-BAR",
    "District_Name": "Baramulla",
    "Administrative_Scope": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Landscape_Belt": [
      "Kashmir Valley",
      "Western Himalaya"
    ],
    "Forest_Types": [
      "High conifer forest"
    ],
    "Primary_Forest_Type": "High conifer forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 28,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 45,
    "Forest_Wildlife_Count": 14,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 84,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "6 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2021/2023 (Verified: 892.02 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 892.02
  },
  {
    "District_ID": "DIST-KUP",
    "District_Name": "Kupwara",
    "Administrative_Scope": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Landscape_Belt": [
      "Kashmir Valley",
      "Western Himalaya"
    ],
    "Forest_Types": [
      "Very high forest"
    ],
    "Primary_Forest_Type": "Very high forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 16,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 16,
    "Forest_Wildlife_Count": 23,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 69,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Low-Medium",
    "Wildlife_Corridor_Value": "Very High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "6 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2021/2023 (Verified: 1,534.52 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 1534.52
  },
  {
    "District_ID": "DIST-BUD",
    "District_Name": "Budgam",
    "Administrative_Scope": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Landscape_Belt": [
      "Kashmir Valley",
      "Western Himalaya"
    ],
    "Forest_Types": [
      "Moderate forest"
    ],
    "Primary_Forest_Type": "Moderate forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 45,
    "Forest_Cover_Class": "Moderately Dense",
    "Deforestation_Risk": "Medium-High",
    "Tree_Directory_Count": 20,
    "Forest_Wildlife_Count": 6,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 62,
    "Canopy_Health": "Fragmented",
    "Fragmentation_Level": "High",
    "Wildlife_Corridor_Value": "Medium",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "5 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2021/2023 (Verified: 343.30 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 343.3
  },
  {
    "District_ID": "DIST-PUL",
    "District_Name": "Pulwama",
    "Administrative_Scope": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Landscape_Belt": [
      "Kashmir Valley",
      "Western Himalaya"
    ],
    "Forest_Types": [
      "Low-moderate fragmented"
    ],
    "Primary_Forest_Type": "Low-moderate fragmented",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 39,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "High",
    "Tree_Directory_Count": 27,
    "Forest_Wildlife_Count": 31,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 80,
    "Canopy_Health": "Fragmented",
    "Fragmentation_Level": "High",
    "Wildlife_Corridor_Value": "Medium",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "10 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2021/2023 (Verified: 376.02 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 376.02
  },
  {
    "District_ID": "DIST-SHO",
    "District_Name": "Shopian",
    "Administrative_Scope": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Landscape_Belt": [
      "Kashmir Valley",
      "Western Himalaya"
    ],
    "Forest_Types": [
      "High Pir Panjal forest"
    ],
    "Primary_Forest_Type": "High Pir Panjal forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 12,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 36,
    "Forest_Wildlife_Count": 11,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 60,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "Very High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "3 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "FSI / Global Forest Watch",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-KUL",
    "District_Name": "Kulgam",
    "Administrative_Scope": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Landscape_Belt": [
      "Kashmir Valley",
      "Western Himalaya"
    ],
    "Forest_Types": [
      "Moderate-high forest"
    ],
    "Primary_Forest_Type": "Moderate-high forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 59,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 34,
    "Forest_Wildlife_Count": 26,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 71,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "8 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "J&K Forest Baseline (Verified: 390.24 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 390.24
  },
  {
    "District_ID": "DIST-ANA",
    "District_Name": "Anantnag",
    "Administrative_Scope": "Kashmir Core",
    "Ecological_Scope": "Kashmir Core",
    "Landscape_Belt": [
      "Kashmir Valley",
      "Western Himalaya"
    ],
    "Forest_Types": [
      "High forest/catchment"
    ],
    "Primary_Forest_Type": "High forest/catchment",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 51,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 21,
    "Forest_Wildlife_Count": 26,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 87,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "Very High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "7 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2021/2023 (Verified: 1,075.06 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 1075.06
  },
  {
    "District_ID": "DIST-JAM",
    "District_Name": "Jammu",
    "Administrative_Scope": "Jammu Division",
    "Ecological_Scope": "Trans-Divisional",
    "Landscape_Belt": [
      "Pir Panjal",
      "Chenab Basin"
    ],
    "Forest_Types": [
      "Scrub/subtropical"
    ],
    "Primary_Forest_Type": "Scrub/subtropical",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 34,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "High",
    "Tree_Directory_Count": 43,
    "Forest_Wildlife_Count": 6,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 78,
    "Canopy_Health": "Fragmented",
    "Fragmentation_Level": "High",
    "Wildlife_Corridor_Value": "Medium",
    "Forest_Fire_Risk": "High",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "6 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "FSI / Global Forest Watch",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-SAM",
    "District_Name": "Samba",
    "Administrative_Scope": "Jammu Division",
    "Ecological_Scope": "Trans-Divisional",
    "Landscape_Belt": [
      "Pir Panjal",
      "Chenab Basin"
    ],
    "Forest_Types": [
      "Dry scrub/low forest"
    ],
    "Primary_Forest_Type": "Dry scrub/low forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 38,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "High",
    "Tree_Directory_Count": 27,
    "Forest_Wildlife_Count": 30,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 65,
    "Canopy_Health": "Fragmented",
    "Fragmentation_Level": "High",
    "Wildlife_Corridor_Value": "Low-Medium",
    "Forest_Fire_Risk": "High",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "8 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "FSI / Global Forest Watch",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-KAT",
    "District_Name": "Kathua",
    "Administrative_Scope": "Jammu Division",
    "Ecological_Scope": "Trans-Divisional",
    "Landscape_Belt": [
      "Pir Panjal",
      "Chenab Basin"
    ],
    "Forest_Types": [
      "Hill forest + scrub"
    ],
    "Primary_Forest_Type": "Hill forest + scrub",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 10,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 20,
    "Forest_Wildlife_Count": 27,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 72,
    "Canopy_Health": "Fragmented",
    "Fragmentation_Level": "Medium-High",
    "Wildlife_Corridor_Value": "Medium",
    "Forest_Fire_Risk": "High",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "9 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2019/2021 (Verified: 1,331.00 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 1331
  },
  {
    "District_ID": "DIST-UDH",
    "District_Name": "Udhampur",
    "Administrative_Scope": "Jammu Division",
    "Ecological_Scope": "Trans-Divisional",
    "Landscape_Belt": [
      "Pir Panjal",
      "Chenab Basin"
    ],
    "Forest_Types": [
      "Chir pine/mixed forest"
    ],
    "Primary_Forest_Type": "Chir pine/mixed forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 35,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 10,
    "Forest_Wildlife_Count": 12,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 71,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "High",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "5 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2021/2023 (Verified: 2,343.00 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 2343
  },
  {
    "District_ID": "DIST-REA",
    "District_Name": "Reasi",
    "Administrative_Scope": "Jammu Division",
    "Ecological_Scope": "Trans-Divisional",
    "Landscape_Belt": [
      "Pir Panjal",
      "Chenab Basin"
    ],
    "Forest_Types": [
      "Rugged hill forest"
    ],
    "Primary_Forest_Type": "Rugged hill forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 59,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 26,
    "Forest_Wildlife_Count": 20,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 70,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Medium-High",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "4 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "FSI / Global Forest Watch",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-RAM",
    "District_Name": "Ramban",
    "Administrative_Scope": "Jammu Division",
    "Ecological_Scope": "Trans-Divisional",
    "Landscape_Belt": [
      "Pir Panjal",
      "Chenab Basin"
    ],
    "Forest_Types": [
      "High slope conifer"
    ],
    "Primary_Forest_Type": "High slope conifer",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 45,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium-High",
    "Tree_Directory_Count": 23,
    "Forest_Wildlife_Count": 27,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 63,
    "Canopy_Health": "Fragmented",
    "Fragmentation_Level": "High",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "3 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "FSI / Global Forest Watch",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-DOD",
    "District_Name": "Doda",
    "Administrative_Scope": "Jammu Division",
    "Ecological_Scope": "Trans-Divisional",
    "Landscape_Belt": [
      "Pir Panjal",
      "Chenab Basin"
    ],
    "Forest_Types": [
      "High temperate forest"
    ],
    "Primary_Forest_Type": "High temperate forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 21,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 29,
    "Forest_Wildlife_Count": 25,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 82,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "Very High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "9 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2021/2023 (Verified: 5,555.00 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 5555
  },
  {
    "District_ID": "DIST-KIS",
    "District_Name": "Kishtwar",
    "Administrative_Scope": "Jammu Division",
    "Ecological_Scope": "Trans-Divisional",
    "Landscape_Belt": [
      "Pir Panjal",
      "Chenab Basin"
    ],
    "Forest_Types": [
      "High ecological forest value"
    ],
    "Primary_Forest_Type": "High ecological forest value",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 38,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 34,
    "Forest_Wildlife_Count": 7,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 61,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Low-Medium",
    "Wildlife_Corridor_Value": "Very High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "4 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2019/2021 (Verified: 1,785.00 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 1785
  },
  {
    "District_ID": "DIST-RAJ",
    "District_Name": "Rajouri",
    "Administrative_Scope": "Jammu Division",
    "Ecological_Scope": "Trans-Divisional",
    "Landscape_Belt": [
      "Pir Panjal",
      "Chenab Basin"
    ],
    "Forest_Types": [
      "Pir Panjal forest"
    ],
    "Primary_Forest_Type": "Pir Panjal forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 46,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 22,
    "Forest_Wildlife_Count": 31,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 70,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Medium-High",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "8 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2023 (Verified: 1267 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-POO",
    "District_Name": "Poonch",
    "Administrative_Scope": "Jammu Division",
    "Ecological_Scope": "Trans-Divisional",
    "Landscape_Belt": [
      "Pir Panjal",
      "Chenab Basin"
    ],
    "Forest_Types": [
      "Pir Panjal forest"
    ],
    "Primary_Forest_Type": "Pir Panjal forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 54,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 32,
    "Forest_Wildlife_Count": 9,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 84,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "Very High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "4 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2019/2021 (Verified: 2,107.00 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum",
    "Forest_Cover_SqKm": 2107
  },
  {
    "District_ID": "DIST-LEH",
    "District_Name": "Leh",
    "Administrative_Scope": "Ladakh Division",
    "Ecological_Scope": "Trans-Divisional",
    "Landscape_Belt": [
      "Cold Desert Ladakh",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Juniper"
    ],
    "Primary_Forest_Type": "Juniper",
    "Secondary_Forest_Type": "riparian willow-poplar",
    "Forest_Cover_Percent": 1.57,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 29,
    "Forest_Wildlife_Count": 17,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 61,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Low-Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "2 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2021 (Verified: 1,694.27 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus",
    "Forest_Cover_SqKm": 1694.27
  },
  {
    "District_ID": "DIST-KAR",
    "District_Name": "Kargil",
    "Administrative_Scope": "Ladakh Division",
    "Ecological_Scope": "Trans-Divisional",
    "Landscape_Belt": [
      "Cold Desert Ladakh",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Riparian tree belts"
    ],
    "Primary_Forest_Type": "Riparian tree belts",
    "Secondary_Forest_Type": "juniper patches",
    "Forest_Cover_Percent": 0.42,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 47,
    "Forest_Wildlife_Count": 23,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 65,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Low-Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "6 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "ISFR 2021 (Verified: 57.52 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus",
    "Forest_Cover_SqKm": 57.52
  },
  {
    "District_ID": "DIST-NEE",
    "District_Name": "Neelum",
    "Administrative_Scope": "Azad Kashmir",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Western Himalaya",
      "Upper Jhelum Basin"
    ],
    "Forest_Types": [
      "Very high mountain forest"
    ],
    "Primary_Forest_Type": "Very high mountain forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 25,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 10,
    "Forest_Wildlife_Count": 16,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 73,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Low-Medium",
    "Wildlife_Corridor_Value": "Very High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "9 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "AJK FMS / P&DD AJK (Region Total: 42.6%)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-MUZ",
    "District_Name": "Muzaffarabad",
    "Administrative_Scope": "Azad Kashmir",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Western Himalaya",
      "Upper Jhelum Basin"
    ],
    "Forest_Types": [
      "Moderate-high forest"
    ],
    "Primary_Forest_Type": "Moderate-high forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 35,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium-High",
    "Tree_Directory_Count": 30,
    "Forest_Wildlife_Count": 7,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 68,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "3 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "AJK FMS / P&DD AJK (Region Total: 42.6%)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-HAT",
    "District_Name": "Hattian Bala",
    "Administrative_Scope": "Azad Kashmir",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Western Himalaya",
      "Upper Jhelum Basin"
    ],
    "Forest_Types": [
      "High moist temperate forest"
    ],
    "Primary_Forest_Type": "High moist temperate forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 59,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 48,
    "Forest_Wildlife_Count": 9,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 67,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "9 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "AJK FMS / P&DD AJK (Region Total: 42.6%)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-BAG",
    "District_Name": "Bagh",
    "Administrative_Scope": "Azad Kashmir",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Western Himalaya",
      "Upper Jhelum Basin"
    ],
    "Forest_Types": [
      "Moderate-high forest"
    ],
    "Primary_Forest_Type": "Moderate-high forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 21,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 48,
    "Forest_Wildlife_Count": 24,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 61,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "2 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "AJK FMS / P&DD AJK (Region Total: 42.6%)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-HAV",
    "District_Name": "Haveli",
    "Administrative_Scope": "Azad Kashmir",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Western Himalaya",
      "Upper Jhelum Basin"
    ],
    "Forest_Types": [
      "High Pir Panjal forest"
    ],
    "Primary_Forest_Type": "High Pir Panjal forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 43,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 14,
    "Forest_Wildlife_Count": 32,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 82,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "Very High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "4 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "AJK FMS / P&DD AJK (Region Total: 42.6%)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-POO",
    "District_Name": "Poonch (AJK)",
    "Administrative_Scope": "Azad Kashmir",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Western Himalaya",
      "Upper Jhelum Basin"
    ],
    "Forest_Types": [
      "Moderate-high forest"
    ],
    "Primary_Forest_Type": "Moderate-high forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 51,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 39,
    "Forest_Wildlife_Count": 25,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 85,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "9 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "AJK FMS / P&DD AJK (Region Total: 42.6%)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-SUD",
    "District_Name": "Sudhnoti",
    "Administrative_Scope": "Azad Kashmir",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Western Himalaya",
      "Upper Jhelum Basin"
    ],
    "Forest_Types": [
      "Moderate-high forest"
    ],
    "Primary_Forest_Type": "Moderate-high forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 51,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium-High",
    "Tree_Directory_Count": 35,
    "Forest_Wildlife_Count": 7,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 82,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "Medium",
    "Forest_Fire_Risk": "Medium-High",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "3 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "AJK FMS / P&DD AJK (Region Total: 42.6%)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-KOT",
    "District_Name": "Kotli",
    "Administrative_Scope": "Azad Kashmir",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Western Himalaya",
      "Upper Jhelum Basin"
    ],
    "Forest_Types": [
      "Low-moderate subtropical forest"
    ],
    "Primary_Forest_Type": "Low-moderate subtropical forest",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 29,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "High",
    "Tree_Directory_Count": 38,
    "Forest_Wildlife_Count": 16,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 62,
    "Canopy_Health": "Fragmented",
    "Fragmentation_Level": "High",
    "Wildlife_Corridor_Value": "Medium",
    "Forest_Fire_Risk": "High",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "8 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "AJK FMS / P&DD AJK (Region Total: 42.6%)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-MIR",
    "District_Name": "Mirpur",
    "Administrative_Scope": "Azad Kashmir",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Western Himalaya",
      "Upper Jhelum Basin"
    ],
    "Forest_Types": [
      "Low scrub/riparian"
    ],
    "Primary_Forest_Type": "Low scrub/riparian",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 13,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "High",
    "Tree_Directory_Count": 45,
    "Forest_Wildlife_Count": 10,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 75,
    "Canopy_Health": "Fragmented",
    "Fragmentation_Level": "High",
    "Wildlife_Corridor_Value": "Low-Medium",
    "Forest_Fire_Risk": "High",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "6 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "AJK FMS / P&DD AJK (Region Total: 42.6%)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-BHI",
    "District_Name": "Bhimber",
    "Administrative_Scope": "Azad Kashmir",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Western Himalaya",
      "Upper Jhelum Basin"
    ],
    "Forest_Types": [
      "Dry scrub/riverine woodland"
    ],
    "Primary_Forest_Type": "Dry scrub/riverine woodland",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 28,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "High",
    "Tree_Directory_Count": 11,
    "Forest_Wildlife_Count": 9,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 71,
    "Canopy_Health": "Fragmented",
    "Fragmentation_Level": "High",
    "Wildlife_Corridor_Value": "Low-Medium",
    "Forest_Fire_Risk": "High",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "5 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "AJK FMS / P&DD AJK (Region Total: 42.6%)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Jhelum"
  },
  {
    "District_ID": "DIST-DIA",
    "District_Name": "Diamer",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Highest GB forest resource"
    ],
    "Primary_Forest_Type": "Highest GB forest resource",
    "Secondary_Forest_Type": "dry temperate conifer",
    "Forest_Cover_Percent": 21.5,
    "Forest_Cover_Class": "Dense",
    "Deforestation_Risk": "Medium-High",
    "Tree_Directory_Count": 36,
    "Forest_Wildlife_Count": 18,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 73,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "Very High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "6 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "GB at a Glance 2023 (Verified: 1,560.00 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus",
    "Forest_Cover_SqKm": 1560
  },
  {
    "District_ID": "DIST-AST",
    "District_Name": "Astore",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Significant forest district"
    ],
    "Primary_Forest_Type": "Significant forest district",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 5,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 39,
    "Forest_Wildlife_Count": 13,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 78,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "Very High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Stable",
    "Carbon_Biomass_Value": "3 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "Medium",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "GB at a Glance 2023 (Verified: 270.60 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus",
    "Forest_Cover_SqKm": 270.6
  },
  {
    "District_ID": "DIST-GIL",
    "District_Name": "Gilgit",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Sparse riparian/juniper"
    ],
    "Primary_Forest_Type": "Sparse riparian/juniper",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 50,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 49,
    "Forest_Wildlife_Count": 22,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 66,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Low-Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "3 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "GB at a Glance 2023 (Verified: 250.00 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus",
    "Forest_Cover_SqKm": 250
  },
  {
    "District_ID": "DIST-HUN",
    "District_Name": "Hunza",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Juniper/riparian/cold desert"
    ],
    "Primary_Forest_Type": "Juniper/riparian/cold desert",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 46,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 33,
    "Forest_Wildlife_Count": 7,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 74,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Low",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "10 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "GB Planning & Dev Dept (Verified: 5 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus"
  },
  {
    "District_ID": "DIST-NAG",
    "District_Name": "Nagar",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Juniper/riparian"
    ],
    "Primary_Forest_Type": "Juniper/riparian",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 35,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 41,
    "Forest_Wildlife_Count": 29,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 61,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Low",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "11 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "GB at a Glance 2023 (Verified: 30.70 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus",
    "Forest_Cover_SqKm": 30.7
  },
  {
    "District_ID": "DIST-GHI",
    "District_Name": "Ghizer",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Patchy dry temperate/riparian"
    ],
    "Primary_Forest_Type": "Patchy dry temperate/riparian",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 23,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 45,
    "Forest_Wildlife_Count": 16,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 84,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Low-Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "5 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "GB at a Glance 2023 (Verified: 50.00 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus",
    "Forest_Cover_SqKm": 50
  },
  {
    "District_ID": "DIST-SKA",
    "District_Name": "Skardu",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Sparse riparian/juniper"
    ],
    "Primary_Forest_Type": "Sparse riparian/juniper",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 31,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 32,
    "Forest_Wildlife_Count": 11,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 83,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "Medium",
    "Forest_Fire_Risk": "Low",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "6 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "GB at a Glance 2023 (Verified: 30.00 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus",
    "Forest_Cover_SqKm": 30
  },
  {
    "District_ID": "DIST-SHI",
    "District_Name": "Shigar",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Sparse riparian/juniper"
    ],
    "Primary_Forest_Type": "Sparse riparian/juniper",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 38,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 22,
    "Forest_Wildlife_Count": 18,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 70,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "Medium",
    "Forest_Fire_Risk": "Low",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "11 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "GB Planning & Dev Dept (Verified: 2.9 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus"
  },
  {
    "District_ID": "DIST-KHA",
    "District_Name": "Kharmang",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Indus riparian vegetation"
    ],
    "Primary_Forest_Type": "Indus riparian vegetation",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 53,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 46,
    "Forest_Wildlife_Count": 25,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 68,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "Medium",
    "Forest_Fire_Risk": "Low",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "7 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "GB Planning & Dev Dept (Verified: 5 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus"
  },
  {
    "District_ID": "DIST-GHA",
    "District_Name": "Ghanche",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Very sparse cold desert vegetation"
    ],
    "Primary_Forest_Type": "Very sparse cold desert vegetation",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 0,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 31,
    "Forest_Wildlife_Count": 23,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 87,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "Medium",
    "Forest_Fire_Risk": "Low",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "3 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "GB Planning & Dev Dept (Verified: 0 sq km)",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus"
  },
  {
    "District_ID": "DIST-ROU",
    "District_Name": "Roundu",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Indus valley riparian"
    ],
    "Primary_Forest_Type": "Indus valley riparian",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 16,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 45,
    "Forest_Wildlife_Count": 22,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 86,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "Medium",
    "Forest_Fire_Risk": "Low",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "5 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "FSI / Global Forest Watch",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus"
  },
  {
    "District_ID": "DIST-DAR",
    "District_Name": "Darel",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Forest-rich valley"
    ],
    "Primary_Forest_Type": "Forest-rich valley",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 14,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium-High",
    "Tree_Directory_Count": 13,
    "Forest_Wildlife_Count": 33,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 79,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "7 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "FSI / Global Forest Watch",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus"
  },
  {
    "District_ID": "DIST-TAN",
    "District_Name": "Tangir",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Forest-rich valley"
    ],
    "Primary_Forest_Type": "Forest-rich valley",
    "Secondary_Forest_Type": "Mixed",
    "Forest_Cover_Percent": 43,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium-High",
    "Tree_Directory_Count": 26,
    "Forest_Wildlife_Count": 7,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 84,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Medium",
    "Disturbance_Level": "Severe",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "11 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "FSI / Global Forest Watch",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus"
  },
  {
    "District_ID": "DIST-GUP",
    "District_Name": "Gupis-Yasin",
    "Administrative_Scope": "Gilgit-Baltistan",
    "Ecological_Scope": "Transboundary / Extended",
    "Landscape_Belt": [
      "Karakoram",
      "Upper Indus Basin"
    ],
    "Forest_Types": [
      "Riparian"
    ],
    "Primary_Forest_Type": "Riparian",
    "Secondary_Forest_Type": "juniper",
    "Forest_Cover_Percent": 42,
    "Forest_Cover_Class": "Open",
    "Deforestation_Risk": "Medium",
    "Tree_Directory_Count": 24,
    "Forest_Wildlife_Count": 33,
    "Habitat_Types": [
      "Core Forest",
      "Riparian",
      "Scrub"
    ],
    "Health_Monitoring_Score": 65,
    "Canopy_Health": "Continuous",
    "Fragmentation_Level": "Medium",
    "Wildlife_Corridor_Value": "High",
    "Forest_Fire_Risk": "Low-Medium",
    "Disturbance_Level": "Moderate",
    "Invasive_Species_Risk": "Low",
    "Regeneration_Status": "Poor",
    "Carbon_Biomass_Value": "4 Tg",
    "Ecosystem_Services_Value": "High",
    "Restoration_Priority": "High",
    "Community_Forestry_Status": "Active",
    "Early_Warning_Status": "Nominal",
    "Primary_Data_Source": "FSI / Global Forest Watch",
    "Confidence_Level": 0.9,
    "Elevation_Min_m": 1000,
    "Elevation_Max_m": 4000,
    "Watershed_Basin": "Indus"
  }
];

export const masterTreeDirectory = [
  {
    id: 'tree-001',
    commonName: 'Deodar Cedar',
    scientificName: 'Cedrus deodara',
    family: 'Pinaceae',
    iucnStatus: 'LC',
    elevation: { min: 1500, max: 3200 },
    associatedForestTypes: ['Deodar Forest', 'Moist Temperate Conifer'],
    ecologicalImportance: 'Apex conifer providing critical canopy cover, habitat for leopards and black bears, and high timber value. Core to Kashmir and Pir Panjal ecology.',
    geographicScope: ['Kashmir Core', 'Jammu Division', 'Azad Kashmir', 'Gilgit-Baltistan']
  },
  {
    id: 'tree-002',
    commonName: 'Blue Pine / Kail',
    scientificName: 'Pinus wallichiana',
    family: 'Pinaceae',
    iucnStatus: 'LC',
    elevation: { min: 1800, max: 3000 },
    associatedForestTypes: ['Blue Pine Forest', 'Mixed Conifer'],
    ecologicalImportance: 'Pioneer species in disturbed areas, highly resilient, major carbon sink across the western Himalayas.',
    geographicScope: ['Kashmir Core', 'Jammu Division', 'Azad Kashmir', 'Gilgit-Baltistan']
  },
  {
    id: 'tree-003',
    commonName: 'Himalayan Birch',
    scientificName: 'Betula utilis',
    family: 'Betulaceae',
    iucnStatus: 'LC',
    elevation: { min: 3000, max: 4000 },
    associatedForestTypes: ['Birch Forest', 'Subalpine Scrub'],
    ecologicalImportance: 'Defines the upper treeline in the Himalayas. Crucial habitat for Musk Deer and Snow Leopard buffer zones.',
    geographicScope: ['Kashmir Core', 'Ladakh Division', 'Azad Kashmir', 'Gilgit-Baltistan']
  },
  {
    id: 'tree-004',
    commonName: 'Chinar',
    scientificName: 'Platanus orientalis',
    family: 'Platanaceae',
    iucnStatus: 'LC',
    elevation: { min: 1500, max: 2000 },
    associatedForestTypes: ['Urban Forest', 'Riparian Woodland'],
    ecologicalImportance: 'Cultural keystone species in Kashmir Valley. Provides massive canopy shading in urban environments and supports urban avifauna.',
    geographicScope: ['Kashmir Core']
  },
  {
    id: 'tree-005',
    commonName: 'Himalayan Juniper',
    scientificName: 'Juniperus macropoda',
    family: 'Cupressaceae',
    iucnStatus: 'LC',
    elevation: { min: 3000, max: 4200 },
    associatedForestTypes: ['Juniper Woodland', 'Cold Desert Scrub'],
    ecologicalImportance: 'Extremely slow-growing tree critical to high-altitude cold deserts. Vital for preventing soil erosion in Ladakh and GB.',
    geographicScope: ['Ladakh Division', 'Gilgit-Baltistan']
  },
  {
    id: 'tree-006',
    commonName: 'Chilgoza Pine',
    scientificName: 'Pinus gerardiana',
    family: 'Pinaceae',
    iucnStatus: 'NT',
    elevation: { min: 1800, max: 3350 },
    associatedForestTypes: ['Dry Temperate Conifer', 'Chilgoza Pine Forest'],
    ecologicalImportance: 'Provides edible pine nuts critical for local economies and wildlife like bears and birds in dry inner Himalayan valleys.',
    geographicScope: ['Jammu Division', 'Gilgit-Baltistan']
  },
  {
    id: 'tree-007',
    commonName: 'Seabuckthorn',
    scientificName: 'Hippophae rhamnoides',
    family: 'Elaeagnaceae',
    iucnStatus: 'LC',
    elevation: { min: 2500, max: 4000 },
    associatedForestTypes: ['Seabuckthorn Scrub', 'Cold Desert Riparian'],
    ecologicalImportance: 'Nitrogen-fixing shrub/tree that binds soil in cold deserts. Extremely valuable for berries and riverbank stabilization.',
    geographicScope: ['Ladakh Division', 'Gilgit-Baltistan']
  },
  {
    id: 'tree-008',
    commonName: 'White Willow',
    scientificName: 'Salix alba',
    family: 'Salicaceae',
    iucnStatus: 'LC',
    elevation: { min: 1200, max: 3500 },
    associatedForestTypes: ['Riparian Forest', 'Wetland-edge Woodland'],
    ecologicalImportance: 'Core component of riverine and wetland ecology. Essential for waterbed stabilization, especially in the Jhelum and Indus basins.',
    geographicScope: ['Kashmir Core', 'Ladakh Division', 'Azad Kashmir', 'Gilgit-Baltistan']
  }
];

export const masterForestWildlife = [
  {
    id: 'fw-001',
    species: 'Hangul (Kashmir Stag)',
    scientificName: 'Cervus hanglu hanglu',
    status: 'CR',
    dependence: 'Obligate',
    habitat: ['Moist Temperate Conifer', 'Birch Forest', 'Riverine Forest'],
    districts: ['Srinagar', 'Ganderbal', 'Anantnag'],
    notes: 'Strictly dependent on the Dachigam-Overa-Aru forest corridor. Fragmentation is critical threat.'
  },
  {
    id: 'fw-002',
    species: 'Himalayan Brown Bear',
    scientificName: 'Ursus arctos isabellinus',
    status: 'CR',
    dependence: 'High',
    habitat: ['Subalpine Birch/Fir', 'Alpine Scrub', 'Deodar Forest'],
    districts: ['Kupwara', 'Bandipora', 'Ganderbal', 'Kargil', 'Astore'],
    notes: 'Relies on upper forest edges and alpine meadows. Threatened by habitat fragmentation and climate change.'
  },
  {
    id: 'fw-003',
    species: 'Snow Leopard',
    scientificName: 'Panthera uncia',
    status: 'VU',
    dependence: 'Moderate',
    habitat: ['Alpine Scrub', 'Cold Desert Scrub', 'Juniper Woodland'],
    districts: ['Leh', 'Kargil', 'Kishtwar', 'Diamer', 'Gilgit'],
    notes: 'Uses high-altitude sparse forest and scrub for cover while hunting ungulates.'
  },
  {
    id: 'fw-004',
    species: 'Kashmir Musk Deer',
    scientificName: 'Moschus cupreus',
    status: 'EN',
    dependence: 'Obligate',
    habitat: ['Fir-Spruce Forest', 'Birch Forest'],
    districts: ['Kupwara', 'Bandipora', 'Neelum', 'Kishtwar'],
    notes: 'Requires dense understory in high-altitude conifer/birch forests for survival.'
  },
  {
    id: 'fw-005',
    species: 'Markhor',
    scientificName: 'Capra falconeri',
    status: 'NT',
    dependence: 'Moderate',
    habitat: ['Dry Temperate Conifer', 'Chilgoza Pine Forest', 'Oak-Broadleaf'],
    districts: ['Shopian', 'Kupwara', 'Diamer', 'Astore', 'Poonch'],
    notes: 'Inhabits steep, forested cliffs and rugged scrublands. Pir Panjal and Kazinag hold critical populations.'
  },
  {
    id: 'fw-006',
    species: 'Western Tragopan',
    scientificName: 'Tragopan melanocephalus',
    status: 'VU',
    dependence: 'Obligate',
    habitat: ['Moist Temperate Conifer', 'Oak-Broadleaf', 'Ringal Bamboo understory'],
    districts: ['Poonch', 'Muzaffarabad', 'Neelum'],
    notes: 'Highly elusive pheasant requiring undisturbed dense moist temperate forests with thick undergrowth.'
  }
];

export const masterHabitats = [
  {
    id: 'hab-001',
    name: 'Moist Temperate Conifer',
    elevation: '1,500m - 3,200m',
    climate: 'High precipitation, winter snow',
    keyFlora: ['Deodar', 'Blue Pine', 'Fir', 'Spruce'],
    keyFauna: ['Hangul', 'Black Bear', 'Western Tragopan'],
    ecologicalRole: 'Primary carbon sink, hydrological regulation for Jhelum and Chenab basins.',
    threatLevel: 'High',
    districts: ['Anantnag', 'Baramulla', 'Kupwara', 'Poonch', 'Neelum']
  },
  {
    id: 'hab-002',
    name: 'Subalpine Birch/Fir Transition',
    elevation: '3,000m - 4,000m',
    climate: 'Harsh winters, short growing season',
    keyFlora: ['Himalayan Birch', 'Fir', 'Alpine Shrubs'],
    keyFauna: ['Brown Bear', 'Musk Deer', 'Snow Leopard'],
    ecologicalRole: 'Critical buffer protecting high-altitude glaciers from direct solar radiation.',
    threatLevel: 'Critical',
    districts: ['Bandipora', 'Ganderbal', 'Astore', 'Kishtwar']
  },
  {
    id: 'hab-003',
    name: 'Dry Temperate Conifer',
    elevation: '1,800m - 3,500m',
    climate: 'Low monsoon influence, dry cold',
    keyFlora: ['Chilgoza Pine', 'Deodar', 'Juniper'],
    keyFauna: ['Markhor', 'Snow Leopard'],
    ecologicalRole: 'Soil stabilization in arid mountainous terrain. Key economic resource (pine nuts).',
    threatLevel: 'High',
    districts: ['Diamer', 'Gilgit', 'Kishtwar']
  },
  {
    id: 'hab-004',
    name: 'Cold Desert & Juniper Scrub',
    elevation: '3,500m - 5,000m',
    climate: 'Extreme cold, arid desert',
    keyFlora: ['Juniper', 'Seabuckthorn', 'Artemisia'],
    keyFauna: ['Snow Leopard', 'Tibetan Wolf', 'Ibex'],
    ecologicalRole: 'Prevents massive soil erosion in Trans-Himalayan rain shadow zones.',
    threatLevel: 'Moderate',
    districts: ['Leh', 'Kargil', 'Skardu', 'Ghanche']
  },
  {
    id: 'hab-005',
    name: 'Riparian Woodlands',
    elevation: '1,200m - 3,000m',
    climate: 'Riverine micro-climate, high moisture',
    keyFlora: ['White Willow', 'Poplar', 'Chinar'],
    keyFauna: ['Otters', 'Migratory Waterfowl', 'Amphibians'],
    ecologicalRole: 'Flood mitigation, bank stabilization, and corridor connectivity for avifauna.',
    threatLevel: 'Critical',
    districts: ['Srinagar', 'Pulwama', 'Gilgit', 'Muzaffarabad']
  }
];

export const getForestIntelligence = {
  allDistricts: () => masterForestDatabase,
  allTrees: () => masterTreeDirectory,
  allWildlife: () => masterForestWildlife,
  allHabitats: () => masterHabitats,
  metrics: {
    totalDistrictsMonitored: masterForestDatabase.length,
    denseForests: masterForestDatabase.filter(d => d.Forest_Cover_Class.includes('Dense')).length,
    criticalRisks: masterForestDatabase.filter(d => d.Deforestation_Risk === 'Critical' || d.Fragmentation_Level === 'Critical').length,
    totalCarbonStock: 420, // Pre-calculated mock baseline
    averageFragmentationIndex: 52.4,
    activeDisturbances: 18,
    regenerationSites: 112,
  }
};
