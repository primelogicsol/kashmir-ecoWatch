# Kashmir EcoWatch — Authoritative External Data Source Connector Registry

**Audit Date:** November 27, 2026  
**Code Registry:** `src/data/authoritative-source-connectors.ts`  
**Total Cataloged External Connectors:** **`10` Provider Families**

---

## 1. Master Connector Classification Matrix

| Connector ID | Provider & Product | Operational Status | Auth Requirement | Spatial Resolution | Cadence | Provenance Class | License Terms |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `CONN-OPENMETEO-NWP` | Open-Meteo (ECMWF IFS / NOAA GFS & 31-Member GEFS) | **Operational Live** | Public Open API | `9–25 km` NWP grid | 1–3 hourly | `gridded_reanalysis_nwp` | CC BY 4.0 (Non-Commercial Tier) |
| `CONN-OPENMETEO-CAMS` | Copernicus ECMWF CAMS (via Open-Meteo Air Quality API) | **Operational Live** | Public Open API | `~11 km` grid | Hourly | `gridded_reanalysis_nwp` | Copernicus Open / CC BY 4.0 |
| `CONN-BREATHEOSS-AIRGRADIENT` | AirGradient / BreatheOSS Community Optical Monitors | **Operational Live** | Public Open API | Point (Srinagar, Jammu, Leh) | 15–60 min | `community_sensor` | CC BY-SA 4.0 |
| `CONN-GLOFAS-FLOOD` | Copernicus Emergency Management Service GloFAS v4 | **Operational Live** | Public Open API | `0.05° (~5 km)` LISFLOOD | Daily | `gridded_reanalysis_nwp` | Copernicus EMS Open License |
| `CONN-USGS-EMSC-NCS` | USGS ComCat, EMSC & NCS India FDSN Seismic Catalogs | **Operational Live** | Public Open API | Instrumental hypocenters (`M >= 2.5`) | 5–15 min polling | `third_party_ground_station` | USGS Public Domain / Agency Attribution |
| `CONN-NDMA-SACHET` | NDMA India SACHET CAP Public Alert RSS | **Operational Live** | Public Open API | J&K & Ladakh Districts | 15–30 min | `government_statutory_record` | Govt. of India Open Public Warning |
| `CONN-OPENALEX-CROSSREF-GDELT` | OpenAlex, Crossref DOI & GDELT 2.0 Discovery APIs | **Operational (Editorial Research)** | Public Open API | Document metadata | Scheduled polling | `peer_reviewed_literature` | CC0 Metadata |
| `CONN-SENTINEL2-ARCHIVE` | ESA / Copernicus Sentinel-2 L2A Multispectral Scenes | **Archival Scene Metadata** | Copernicus Data Space | `10–20 m` optical | Static archived scenes | `satellite_remote_sensing` | Copernicus Open Access |
| `CONN-NASA-FIRMS` | NASA LANCE / FIRMS VIIRS 375m & MODIS Active Fires | **Available — Not Yet Wired** | Free `MAP_KEY` Required | `375 m` (VIIRS) | ~3 h post-overpass | `satellite_remote_sensing` | NASA EOSDIS Open Data |
| `CONN-CWC-JKIFC-CPCB-STATUTORY` | CWC, J&K I&FC, CPCB, ISRO NWIA, FSI ISFR & CAG India | **Manual Statutory Archive (No Open Live API)** | Published PDF / Atlas | Gauge / District / Wetland | Periodic statutory | `government_statutory_record` | Govt. of India Statutory Terms |

---

## 2. Scientific & Operational Boundaries per Connector

1. **Open-Meteo NWP & CAMS (`CONN-OPENMETEO-NWP`, `CONN-OPENMETEO-CAMS`):** Provides physically consistent synoptic pressure-level winds, vorticity, geopotential heights, ensemble precipitation quantiles, and regional background aerosols across all 5 subregions, but **cannot** substitute for valley-floor reference regulatory CAAQMS monitors during shallow winter inversions or sub-2 km convective cloudburst rain gauges.
2. **AirGradient Community Sensors (`CONN-BREATHEOSS-AIRGRADIENT`):** Provides valuable real-time urban particulate visibility in Srinagar, Jammu, and Leh, but uses low-cost laser scattering nephelometers rather than gravimetric/beta-attenuation reference instruments (`is_regulatory_grade: false`).
3. **Copernicus GloFAS v4 (`CONN-GLOFAS-FLOOD`):** Models basin-routed discharge (`m³/s`) on a `~5 km` grid; does not measure physical river water-surface elevation (`ft`/`m`) at Ram Munshi Bagh or Sangam bridges and cannot capture sudden dam/barrage gate operations.
4. **NASA FIRMS (`CONN-NASA-FIRMS`) & GBIF/eBird (`CONN-GBIF-IUCN-EBIRD`):** Documented as post-launch Phase II live/batch connectors once `NASA_FIRMS_MAP_KEY` is provisioned in `.env` and offline GBIF taxonomic reconciliation scripts are executed.
