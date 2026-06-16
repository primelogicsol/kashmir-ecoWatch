export type ConfidenceLevel = 'High' | 'Medium' | 'Low' | 'Pending';
export type WaterQualityStatus = 'Excellent' | 'Good' | 'Moderate' | 'Poor' | 'Critical';
export type RiskLevel = 'Low' | 'Watch' | 'Moderate' | 'High' | 'Critical';
export type VulnerabilityLevel = 'Low' | 'Moderate' | 'High' | 'Critical';
export type RestorationStatus = 'Planned' | 'Active' | 'Completed' | 'Failed';

// 1. District / Administrative Unit Table
export interface DistrictRecord {
  District_ID: string;
  District_Name: string;
  Ecological_Scope: string;
  Ecological_Region: string;
  Landscape_Belt: string;
  Country_Admin_Context: string;
  Latitude_Center: number;
  Longitude_Center: number;
  Area_km2: number;
  Primary_Watersheds: string[];
  Source_ID: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 2. Lakes Table
export interface LakeRecord {
  Lake_ID: string;
  Lake_Name: string;
  Lake_Type: string;
  District_ID: string;
  Ecological_Scope: string;
  Ecological_Region: string;
  Watershed_ID: string;
  Basin: string;
  Latitude: number;
  Longitude: number;
  Elevation_m: number;
  Area_km2: number;
  Perimeter_km: number;
  Max_Depth_m: number | null;
  Mean_Depth_m: number | null;
  Water_Source: string;
  Outflow: string;
  Lake_Category: 'Urban' | 'Rural' | 'Alpine' | 'Wetland-linked';
  Protected_Status: string;
  Ramsar_Link: string | null;
  Biodiversity_Value: string;
  Tourism_Pressure: RiskLevel;
  Pollution_Risk: RiskLevel;
  Algal_Bloom_Risk: RiskLevel;
  Water_Quality_Status: WaterQualityStatus | 'Pending';
  Primary_Data_Source: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 3. Wetlands Table
export interface WetlandRecord {
  Wetland_ID: string;
  Wetland_Name: string;
  District_ID: string;
  Ecological_Scope: string;
  Wetland_Type: string;
  Ramsar_Status: boolean;
  Protected_Status: string;
  Area_km2: number;
  Hydrological_Source: string;
  Seasonality: string;
  Dominant_Vegetation: string;
  Bird_Habitat_Value: RiskLevel; // Or 'High' | 'Moderate' etc.
  Flood_Buffer_Value: string;
  Pollution_Risk: RiskLevel;
  Encroachment_Risk: RiskLevel;
  Water_Level_Trend: string;
  Restoration_Status: string;
  Primary_Data_Source: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 4. Rivers & Streams Table
export interface RiverRecord {
  River_ID: string;
  River_Name: string;
  River_Order: number | null;
  Districts_Crossed: string[];
  Source_Location: string;
  Mouth_Confluence: string;
  Basin: string;
  Watershed_ID: string;
  Length_km: number;
  Major_Tributaries: string[];
  Flow_Type: string;
  Source_Type: 'Snowfed' | 'Rainfed' | 'Glacierfed' | 'Mixed';
  Ecological_Status: string;
  Water_Quality_Status: WaterQualityStatus | 'Pending';
  Flood_Risk: RiskLevel;
  Pollution_Risk: RiskLevel;
  Riparian_Condition: string;
  Aquatic_Biodiversity_Value: string;
  Primary_Data_Source: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 5. Springs Table
export interface SpringRecord {
  Spring_ID: string;
  Spring_Name: string;
  District_ID: string;
  Village_Locality: string;
  Latitude: number;
  Longitude: number;
  Elevation_m: number;
  Spring_Type: string;
  Seasonality: 'Perennial' | 'Seasonal';
  Discharge_LPS: number | null; // Liters per second
  Water_Use: ('Drinking' | 'Irrigation' | 'Religious' | 'Livestock')[];
  Water_Quality_Status: WaterQualityStatus | 'Pending';
  Drying_Risk: RiskLevel;
  Climate_Vulnerability: VulnerabilityLevel;
  Community_Dependency: string;
  Source_ID: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 6. Watersheds Table
export interface WatershedRecord {
  Watershed_ID: string;
  Watershed_Name: string;
  Basin: string;
  Sub_Basin: string;
  Districts: string[];
  Area_km2: number;
  Elevation_Min_m: number;
  Elevation_Max_m: number;
  Dominant_Landcover: string;
  Forest_Cover_Percent: number;
  Wetland_Count: number | null;
  Lake_Count: number | null;
  River_Length_km: number | null;
  Glacier_Contribution: string;
  Flood_Risk: RiskLevel;
  Erosion_Risk: RiskLevel;
  Pollution_Load_Risk: RiskLevel;
  Restoration_Priority: RiskLevel;
  Primary_Data_Source: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 7. Glaciers & Cryosphere Table
export interface GlacierRecord {
  Glacier_ID: string;
  Glacier_Name: string;
  District_ID: string;
  Mountain_Range: string;
  Basin: string;
  Watershed_ID: string;
  Latitude: number;
  Longitude: number;
  Area_km2: number;
  Elevation_Min_m: number;
  Elevation_Max_m: number;
  Snow_Cover_Seasonality: string;
  Retreat_Status: string;
  Glacial_Lake_Risk: RiskLevel;
  GLOF_Risk: RiskLevel;
  Downstream_Dependencies: string[];
  Primary_Data_Source: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 8. Drinking Water Sources Table
export interface DrinkingWaterRecord {
  Source_ID: string;
  Source_Name: string;
  Source_Type: 'Spring' | 'Stream' | 'Lake' | 'Groundwater' | 'Treatment Plant';
  District_ID: string;
  Village_or_Service_Area: string;
  Population_Dependent: number | null;
  Supply_Status: string;
  Seasonality: string;
  Quality_Status: WaterQualityStatus | 'Pending';
  Contamination_Risk: RiskLevel;
  Drying_Risk: RiskLevel;
  Protection_Status: string;
  Primary_Data_Source: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 9. Water Quality Table
export interface WaterQualityRecord {
  Water_Quality_Record_ID: string;
  Waterbody_ID: string;
  Site_Name: string;
  District_ID: string;
  Date: string;
  Season: string;
  pH: number | null;
  Dissolved_Oxygen: number | null;
  BOD: number | null;
  COD: number | null;
  Turbidity: number | null;
  Conductivity: number | null;
  TDS: number | null;
  Nitrate: number | null;
  Phosphate: number | null;
  Total_Nitrogen: number | null;
  Total_Phosphorus: number | null;
  Chlorophyll_a: number | null;
  Fecal_Coliform: number | null;
  Heavy_Metals: string | null;
  Water_Quality_Index: number | null;
  Trophic_Status: string | null;
  Pollution_Category: string | null;
  Source_Agency: string;
  Lab_Report_Link: string | null;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 10. Flood Risk Table
export interface FloodRiskRecord {
  Flood_Risk_ID: string;
  District_ID: string;
  River_or_Watershed_ID: string;
  Floodplain_Area_km2: number | null;
  Historical_Flood_Events: string[];
  Peak_Flow_Risk: RiskLevel;
  Urban_Flood_Risk: RiskLevel;
  Wetland_Buffer_Status: string;
  Encroachment_Level: string;
  Climate_Rainfall_Intensity: string;
  Risk_Level: RiskLevel;
  Early_Warning_Status: string;
  Source_ID: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 11. Fisheries / Aquatic Biodiversity Table
export interface FisheriesRecord {
  Aquatic_Record_ID: string;
  Waterbody_ID: string;
  District_ID: string;
  Species_Name: string;
  Scientific_Name: string;
  Group: string;
  Native_Status: 'Native' | 'Endemic' | 'Introduced' | 'Invasive';
  Conservation_Status: string;
  Habitat_Type: string;
  Breeding_Season: string;
  Threats: string[];
  Source_ID: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 12. Restoration Table
export interface RestorationRecord {
  Restoration_ID: string;
  Site_Name: string;
  Waterbody_or_Watershed_ID: string;
  District_ID: string;
  Restoration_Type: 'Wetland restoration' | 'Lake cleaning' | 'Riparian restoration' | 'Spring revival' | 'Catchment treatment';
  Status: RestorationStatus;
  Area_Restored_km2: number | null;
  Implementing_Agency: string;
  Funding_Source: string;
  Outcome_Indicators: string[];
  Source_ID: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 13. Pollution & Stress Table
export interface PollutionRecord {
  Pollution_Record_ID: string;
  Waterbody_ID: string;
  District_ID: string;
  Stress_Type: 'Sewage' | 'Solid Waste' | 'Agriculture Runoff' | 'Tourism' | 'Encroachment' | 'Sand Mining' | 'Industrial' | 'Siltation';
  Severity: RiskLevel;
  Spatial_Extent: string;
  Trend: 'Increasing' | 'Stable' | 'Decreasing';
  Management_Action: string;
  Source_ID: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 14. Algal Bloom Monitoring Table
export interface AlgalBloomRecord {
  Bloom_Record_ID: string;
  Waterbody_ID: string;
  District_ID: string;
  Observation_Date: string;
  Risk_Level: RiskLevel;
  Bloom_Status: 'Active' | 'Subsiding' | 'Clear';
  Dominant_Taxa: string;
  Cyanobacteria_Flag: boolean;
  Microcystis_Flag: boolean;
  Anabaena_Flag: boolean;
  Coverage_Percent: number | null;
  Chlorophyll_a: number | null;
  NDCI: number | null; // Normalized Difference Chlorophyll Index
  FAI: number | null;  // Floating Algae Index
  Water_Temperature: number | null;
  Dissolved_Oxygen: number | null;
  Nutrient_Load: string;
  Evidence_Type: 'Satellite' | 'Field' | 'Lab' | 'Research' | 'Modelled';
  Source_ID: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 15. Source Registry Table
export interface SourceRegistryRecord {
  Source_ID: string;
  Source_Name: string;
  Agency_Institution: string;
  Source_Type: 'Government' | 'Research' | 'Satellite' | 'Field Survey' | 'Report' | 'API';
  URL: string | null;
  Publication_Year: number | null;
  Access_Date: string;
  Reliability_Level: 'High' | 'Medium' | 'Low';
  Citation: string;
  Notes: string;
}

// ---------------------------------------------------------
// NEW ADDITIONS FROM ARCHITECTURE UPGRADE
// ---------------------------------------------------------

// 16. Groundwater Intelligence Table
export interface GroundwaterRecord {
  Aquifer_ID: string;
  Aquifer_Name: string;
  District_ID: string;
  Aquifer_Type: string;
  Recharge_Rate: string;
  Extraction_Rate: string;
  Water_Level_Trend: 'Declining' | 'Stable' | 'Rising';
  Water_Quality_Status: WaterQualityStatus | 'Pending';
  Nitrate_Risk: RiskLevel;
  Fluoride_Risk: RiskLevel;
  Contamination_Risk: RiskLevel;
  Vulnerability_Level: VulnerabilityLevel;
  Source_ID: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 17. Climate Impact Table
export interface ClimateImpactRecord {
  Climate_Record_ID: string;
  District_ID: string;
  Waterbody_ID: string | null;
  Climate_Driver: 'Snow Cover Change' | 'Glacier Retreat' | 'Rainfall Change' | 'Extreme Rainfall' | 'Drought' | 'Temperature Rise';
  Exposure_Level: RiskLevel;
  Sensitivity_Level: RiskLevel;
  Adaptive_Capacity: RiskLevel;
  Vulnerability_Score: number; // Computed
  Source_ID: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 18. Dependency Registry Table
export interface DependencyRecord {
  Dependency_ID: string;
  Resource_ID: string; // Waterbody, Aquifer, Spring, etc.
  Dependency_Type: 'Human' | 'Ecological' | 'Economic';
  Sub_Type: 'Drinking' | 'Agriculture' | 'Fisheries' | 'Tourism' | 'Hydropower' | 'Biodiversity';
  Beneficiary_Count: number | null;
  Dependency_Level: RiskLevel;
  Notes: string;
  Source_ID: string;
  Confidence_Level: ConfidenceLevel;
  Last_Updated: string;
}

// 19. Water Watch / Alerts Table
export interface AlertRecord {
  Alert_ID: string;
  Waterbody_ID: string | null;
  District_ID: string | null;
  Alert_Type: 'Flood' | 'Water Quality' | 'Algal Bloom' | 'Spring Drying' | 'Glacier Lake' | 'Drinking Water' | 'Pollution';
  Severity: 'Advisory' | 'Watch' | 'Warning' | 'Critical';
  Status: 'Active' | 'Resolved';
  Message: string;
  Generated_At: string;
  Expires_At: string | null;
  Source_ID: string;
}
