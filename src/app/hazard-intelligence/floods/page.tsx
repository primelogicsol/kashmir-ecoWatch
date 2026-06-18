"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Heading } from "@/components/common/Heading";
import { ModuleKpiStrip } from "@/components/common/ModuleKpiStrip";
import {
  GlobalFilterBar,
  FilterSelect,
} from "@/components/common/GlobalFilterBar";
import {
  ModuleScopeRow,
  DEFAULT_SCOPE_PILL_MAP,
} from "@/components/common/ModuleScopeRow";
import { useGlobalFilter } from "@/context/GlobalFilterContext";
import {
  Waves,
  ChevronRight,
  AlertTriangle,
  MapPin,
  Shield,
  Activity,
  Clock,
  Users,
  Calendar,
  ExternalLink,
  Eye,
  CloudRain,
  Droplets,
  Mountain,
  BarChart3,
  CheckCircle,
  Zap,
  RefreshCw,
} from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  floodZoneRegistry,
  FloodZoneRecord,
  getRiskVariant,
  getStatusColor,
  getVerificationChip,
  getFloodTypeColor,
} from "@/data/hazard-floods";

// ─── Data Types & Hooks ────────────────────────────────────────────────────────

export type FloodZoneLiveRecord = FloodZoneRecord & {
  latest_discharge: number;
  discharge_mean: number;
  discharge_p75: number;
  forecast_peak: number;
  latest_rainfall: number;
  forecast_rainfall_24h: number;
  forecast_rainfall_72h: number;
  live_risk_level: string;
  trend: "Rising" | "Falling" | "Stable";
  dominant_trigger: string;
  last_updated: string;
};

const CACHE_KEY = "flood_data_cache_v2";
const CACHE_DURATION = 30 * 60 * 1000;

function useFloodData() {
  const [data, setData] = useState<FloodZoneLiveRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, payload } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            setData(payload);
            setLoading(false);
            return;
          } else {
            setData(payload);
            setIsStale(true);
          }
        }

        const lats = floodZoneRegistry.map((z) => z.latitude).join(",");
        const lons = floodZoneRegistry.map((z) => z.longitude).join(",");

        const floodRes = await fetch(
          `https://flood-api.open-meteo.com/v1/flood?latitude=${lats}&longitude=${lons}&daily=river_discharge,river_discharge_mean,river_discharge_median,river_discharge_max,river_discharge_min,river_discharge_p25,river_discharge_p75&past_days=7&forecast_days=30&timezone=auto`,
        );
        const forecastRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lons}&daily=precipitation_sum,rain_sum,showers_sum,snowfall_sum&past_days=1&forecast_days=3&timezone=auto`,
        );

        if (!floodRes.ok || !forecastRes.ok)
          throw new Error("API fetch failed");

        const floodData = await floodRes.json();
        const forecastData = await forecastRes.json();

        const combinedData: FloodZoneLiveRecord[] = floodZoneRegistry.map(
          (zone, idx) => {
            const cd = Array.isArray(floodData) ? floodData[idx] : floodData;
            const wcd = Array.isArray(forecastData)
              ? forecastData[idx]
              : forecastData;

            const dailyFlood = cd?.daily || {};
            const dailyWeather = wcd?.daily || {};

            const todayIdxFlood = 7;
            const todayIdxWeather = 1;

            const latest_discharge =
              dailyFlood.river_discharge?.[todayIdxFlood] || 0;
            const prev_discharge =
              dailyFlood.river_discharge?.[todayIdxFlood - 1] || 0;
            const discharge_mean =
              dailyFlood.river_discharge_mean?.[todayIdxFlood] || 0;
            const discharge_p75 =
              dailyFlood.river_discharge_p75?.[todayIdxFlood] || 0;
            const discharge_max =
              dailyFlood.river_discharge_max?.[todayIdxFlood] || 0;

            const futureDischarge =
              dailyFlood.river_discharge?.slice(todayIdxFlood + 1) || [];
            const forecast_peak = futureDischarge.length
              ? Math.max(...futureDischarge)
              : 0;

            const latest_rainfall =
              dailyWeather.precipitation_sum?.[todayIdxWeather] || 0;
            const forecast_rainfall_24h =
              dailyWeather.precipitation_sum?.[todayIdxWeather + 1] || 0;
            const forecast_rainfall_72h =
              (dailyWeather.precipitation_sum?.[todayIdxWeather + 1] || 0) +
              (dailyWeather.precipitation_sum?.[todayIdxWeather + 2] || 0) +
              (dailyWeather.precipitation_sum?.[todayIdxWeather + 3] || 0);

            let trend: "Rising" | "Falling" | "Stable" = "Stable";
            if (latest_discharge >= prev_discharge * 1.1) trend = "Rising";
            else if (latest_discharge <= prev_discharge * 0.9)
              trend = "Falling";

            let dominant_trigger = "Normal Flow";
            if (forecast_rainfall_72h > 50)
              dominant_trigger = "Heavy Rainfall Forecast";
            else if (latest_rainfall > 20)
              dominant_trigger = "Recent Heavy Rain";
            else if (trend === "Rising")
              dominant_trigger = "Upstream Discharge";

            let live_risk_level = "Low";
            if (
              zone.verification_status === "Verified" &&
              zone.current_status === "Active Alert"
            ) {
              live_risk_level = "Critical";
              dominant_trigger = "Official Warning / Verified";
            } else if (
              latest_discharge > forecast_peak * 0.9 ||
              (trend === "Rising" && latest_discharge > discharge_p75)
            ) {
              live_risk_level = "Very High";
            } else if (
              latest_discharge > discharge_p75 ||
              forecast_rainfall_72h > 100
            ) {
              live_risk_level = "High";
            } else if (latest_discharge > discharge_mean) {
              live_risk_level = "Moderate";
            }

            return {
              ...zone,
              latest_discharge,
              discharge_mean,
              discharge_p75,
              forecast_peak,
              latest_rainfall,
              forecast_rainfall_24h,
              forecast_rainfall_72h,
              live_risk_level,
              trend,
              dominant_trigger,
              last_updated: new Date().toISOString(),
            };
          },
        );

        setData(combinedData);
        setLoading(false);
        setIsStale(false);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), payload: combinedData }),
        );
      } catch (err: any) {
        console.error(err);
        setError(err.message);
        setLoading(false);
        setIsStale(true);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error, isStale };
}

// ─── FloodZoneCard ───────────────────────────────────────────────────────────

function FloodZoneCard({
  record,
  index,
}: {
  record: FloodZoneLiveRecord;
  index: number;
}) {
  // Use live_risk_level, fallback to static risk_level
  const riskStr = record.live_risk_level || record.risk_level;
  let riskVar = "success";
  if (riskStr === "Critical") riskVar = "critical";
  if (riskStr === "Very High" || riskStr === "High") riskVar = "danger";
  if (riskStr === "Moderate") riskVar = "warning";

  const statusChip = getStatusColor(record.current_status);
  const verChip = getVerificationChip(record.verification_status);
  const floodChip = getFloodTypeColor(record.flood_type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.04, 0.5) }}
      className="h-full"
    >
      <Card className="glass-intense border-white/10 p-5 h-full flex flex-col gap-3 transition-all relative overflow-hidden group hover:border-white/20">
        {/* Accent gradient for critical/high risk */}
        <div
          className={`absolute top-0 left-0 right-0 h-24 bg-gradient-to-b opacity-5 pointer-events-none ${
            riskStr === "Critical"
              ? "from-red-500 to-transparent"
              : riskStr === "High" || riskStr === "Very High"
                ? "from-orange-500 to-transparent"
                : "from-transparent to-transparent"
          }`}
        />

        {/* Header: Name + Risk Badge */}
        <div className="flex items-start justify-between gap-2 relative z-10">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-white truncate group-hover:text-blue-300 transition-colors">
              {record.name}
            </h3>
            <p className="text-[10px] text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              {record.district} · {record.scope}
            </p>
          </div>
          <Badge
            variant={riskVar as any}
            size="sm"
            className="flex-shrink-0 text-[10px] shadow-sm"
          >
            {riskStr} Risk
          </Badge>
        </div>

        {/* Verification Chip */}
        <div
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-[10px] w-full ${verChip}`}
        >
          <Shield className="w-3 h-3 flex-shrink-0" />
          <span className="font-medium">{record.verification_status}</span>
        </div>

        {/* Live Data Grid */}
        <div className="grid grid-cols-2 gap-1.5 text-xs">
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">
              Latest Discharge
            </div>
            <div className="font-bold text-slate-200">
              {record.latest_discharge.toFixed(1)} m³/s
            </div>
            <div className="text-[9px] text-slate-500 mt-0.5">
              Mean: {record.discharge_mean.toFixed(1)}
            </div>
          </div>
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">
              Forecast Peak
            </div>
            <div className="font-bold text-slate-200">
              {record.forecast_peak.toFixed(1)} m³/s
            </div>
            <div className="text-[9px] text-slate-500 mt-0.5">
              Trend:{" "}
              <span
                className={
                  record.trend === "Rising"
                    ? "text-red-400"
                    : record.trend === "Falling"
                      ? "text-emerald-400"
                      : ""
                }
              >
                {record.trend}
              </span>
            </div>
          </div>
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">
              24h / 72h Rain
            </div>
            <div className="font-bold text-slate-200">
              {record.forecast_rainfall_24h.toFixed(1)} /{" "}
              {record.forecast_rainfall_72h.toFixed(1)} mm
            </div>
          </div>
          <div className="bg-white/5 rounded p-2 border border-white/5">
            <div className="text-[9px] text-slate-500 uppercase tracking-wider mb-0.5">
              Trigger
            </div>
            <div className="font-bold text-slate-200 truncate">
              {record.dominant_trigger}
            </div>
          </div>
        </div>

        {/* Footer: Infrastructure at Risk */}
        <div className="mt-auto pt-3 border-t border-white/5 text-[10px]">
          <div className="text-slate-500 mb-1 flex justify-between">
            <span>River System: {record.river_system}</span>
            <span>
              {record.last_updated
                ? new Date(record.last_updated).toLocaleTimeString()
                : ""}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── FloodZoneRow ────────────────────────────────────────────────────────────

function FloodZoneRow({
  record,
  index,
}: {
  record: FloodZoneLiveRecord;
  index: number;
}) {
  const riskStr = record.live_risk_level || record.risk_level;
  let riskVar = "success";
  if (riskStr === "Critical") riskVar = "critical";
  if (riskStr === "Very High" || riskStr === "High") riskVar = "danger";
  if (riskStr === "Moderate") riskVar = "warning";

  const statusChip = getStatusColor(record.current_status);
  const verChip = getVerificationChip(record.verification_status);
  const floodChip = getFloodTypeColor(record.flood_type);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.02, 0.4) }}
    >
      <Card className="glass-intense border-white/10 p-4 hover:border-white/20 transition-all group">
        <div className="flex flex-wrap items-center gap-4">
          {/* Name + District */}
          <div className="min-w-[200px] flex-1">
            <span className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
              {record.name}
            </span>
            <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {record.district} · {record.scope}
            </div>
          </div>

          {/* Risk Level */}
          <div className="w-24">
            <div className="text-[10px] text-slate-500 mb-1">Risk</div>
            <Badge variant={riskVar as any} size="sm" className="shadow-sm">
              <span className="text-xs font-bold">{riskStr}</span>
            </Badge>
          </div>

          {/* Live Discharges */}
          <div className="w-24 hidden md:block">
            <div className="text-[10px] text-slate-500 mb-1">Discharge</div>
            <div className="text-xs font-bold text-slate-300">
              {record.latest_discharge.toFixed(1)}{" "}
              <span className="text-[9px] text-slate-500 font-normal">
                m³/s
              </span>
            </div>
          </div>

          {/* Forecast Peak */}
          <div className="w-24 hidden lg:block">
            <div className="text-[10px] text-slate-500 mb-1">Forecast Peak</div>
            <div className="text-xs font-bold text-slate-300">
              {record.forecast_peak.toFixed(1)}{" "}
              <span className="text-[9px] text-slate-500 font-normal">
                m³/s
              </span>
            </div>
          </div>

          {/* Rainfall 72h */}
          <div className="w-24 hidden lg:block">
            <div className="text-[10px] text-slate-500 mb-1">72h Rain</div>
            <div className="text-xs font-bold text-slate-300">
              {record.forecast_rainfall_72h.toFixed(1)}{" "}
              <span className="text-[9px] text-slate-500 font-normal">mm</span>
            </div>
          </div>

          {/* Verification */}
          <div className="w-32 hidden xl:block">
            <div
              className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] w-max ${verChip}`}
            >
              <Shield className="w-3 h-3 flex-shrink-0" />
              <span className="font-medium">{record.verification_status}</span>
            </div>
          </div>

          {/* Action */}
          <div className="flex-shrink-0 ml-auto">
            <Button
              variant="outline"
              size="sm"
              className="text-xs px-3 border-white/10"
              icon={<ChevronRight className="w-3 h-3" />}
            >
              Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function FloodsPage() {
  const router = useRouter();
  const { filter } = useGlobalFilter();
  const { data: rawData, loading, error, isStale } = useFloodData();
  const [floodTypeFilter, setFloodTypeFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 9;

  // Use rawData if available, else fallback to empty array
  const activeData = rawData;

  // ─── Computed KPIs ─────────────────────────────────────────────────────────

  const totalZones = activeData.length || floodZoneRegistry.length;
  const activeAlerts = activeData.filter(
    (z) => z.current_status === "Active Alert",
  ).length;
  const criticalZones = activeData.filter(
    (z) => z.live_risk_level === "Critical" || z.risk_level === "Critical",
  ).length;
  const highRisk = activeData.filter(
    (z) => z.live_risk_level === "High" || z.live_risk_level === "Very High",
  ).length;
  const riverSystems = new Set(
    (activeData.length ? activeData : floodZoneRegistry).map(
      (z) => z.river_system,
    ),
  ).size;
  const totalPopulation = (
    activeData.length ? activeData : floodZoneRegistry
  ).reduce((acc, z) => acc + z.exposure_population, 0);
  const verifiedZones = (
    activeData.length ? activeData : floodZoneRegistry
  ).filter((z) => z.verification_status === "Verified").length;

  // ─── Filtering ─────────────────────────────────────────────────────────────

  const filteredData = useMemo(
    () =>
      activeData.filter((z) => {
        const matchSearch =
          filter.searchQuery === "" ||
          z.name.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
          z.district.toLowerCase().includes(filter.searchQuery.toLowerCase()) ||
          z.river_system
            .toLowerCase()
            .includes(filter.searchQuery.toLowerCase());

        const matchScope = filter.scope === "All" || z.scope === filter.scope;
        const matchDistrict =
          filter.district === "All" || z.district === filter.district;
        const matchFloodType =
          floodTypeFilter === "all" || z.flood_type === floodTypeFilter;

        // Live risk matching
        const actualRisk = z.live_risk_level || z.risk_level;
        let matchRisk = riskFilter === "all" || actualRisk === riskFilter;
        if (riskFilter === "High" && actualRisk === "Very High")
          matchRisk = true; // merge very high into high filter

        return (
          matchSearch &&
          matchScope &&
          matchDistrict &&
          matchFloodType &&
          matchRisk
        );
      }),
    [activeData, filter, floodTypeFilter, riskFilter],
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / ITEMS_PER_PAGE),
  );
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [floodTypeFilter, riskFilter, filter]);

  const extraActiveCount =
    (floodTypeFilter !== "all" ? 1 : 0) + (riskFilter !== "all" ? 1 : 0);

  return (
    <main className="min-h-screen bg-slate-950 flex flex-col">
      <Heading
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Hazard Intelligence", href: "/hazard-intelligence" },
          { label: "Floods" },
        ]}
        title={
          <>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible">
              Live Flood Intelligence Across
            </span>
            <span className="block whitespace-nowrap leading-[1.12] pb-2 overflow-visible bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Western Himalayan
            </span>
          </>
        }
        subtitle="Real-time river discharge and heavy rainfall tracking powered by Open-Meteo Flood API. Enriched with Google Flood Hub and Copernicus verifications."
        icon={<Waves className="w-6 h-6 text-blue-400" />}
      />

      {isStale && (
        <div className="container mx-auto px-6 mt-4">
          <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs px-4 py-2 rounded flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Live data fetch failed or is stale. Showing last cached flood
            intelligence.
          </div>
        </div>
      )}

      {error && !isStale && activeData.length === 0 && (
        <div className="container mx-auto px-6 mt-4">
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-4 py-2 rounded flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Failed to load flood intelligence API. Please check your connection.
          </div>
        </div>
      )}

      <ModuleKpiStrip
        kpis={[
          {
            label: "Total Flood Zones",
            value: totalZones,
            icon: "Waves",
            color: "text-blue-400",
          },
          {
            label: "Active Alerts",
            value: activeAlerts,
            icon: "AlertTriangle",
            color: "text-red-400",
          },
          {
            label: "Critical Zones",
            value: criticalZones,
            icon: "Zap",
            color: "text-red-400",
          },
          {
            label: "High Risk",
            value: highRisk,
            icon: "AlertTriangle",
            color: "text-orange-400",
          },
          {
            label: "River Systems",
            value: riverSystems,
            icon: "Activity",
            color: "text-cyan-400",
          },
          {
            label: "Population Exposed",
            value: `${(totalPopulation / 1000).toFixed(0)}K`,
            icon: "Users",
            color: "text-amber-400",
          },
          {
            label: "Verified Zones",
            value: verifiedZones,
            icon: "CheckCircle",
            color: "text-emerald-400",
          },
          {
            label: "Live Data Status",
            value: loading
              ? "Fetching..."
              : isStale
                ? "Stale Cache"
                : "Live Connected",
            icon: loading ? "RefreshCw" : "Activity",
            color: loading
              ? "text-blue-400"
              : isStale
                ? "text-amber-400"
                : "text-emerald-400",
          },
        ]}
        iconColor="text-blue-500"
      />

      <div className="container mx-auto px-6 mt-4 relative z-40 overflow-visible">
        <GlobalFilterBar
          extraFilters={
            <>
              <FilterSelect
                value={floodTypeFilter}
                onChange={setFloodTypeFilter}
                placeholder="All Flood Types"
                options={[
                  { value: "Riverine", label: "Riverine" },
                  { value: "Urban", label: "Urban" },
                  { value: "Floodplain", label: "Floodplain" },
                  { value: "Flash", label: "Flash" },
                ]}
              />
              <FilterSelect
                value={riskFilter}
                onChange={setRiskFilter}
                placeholder="All Risk Levels"
                options={[
                  { value: "Critical", label: "Critical" },
                  { value: "High", label: "High (includes Very High)" },
                  { value: "Moderate", label: "Moderate" },
                  { value: "Low", label: "Low" },
                ]}
              />
            </>
          }
          extraActiveCount={extraActiveCount}
          onExtraFiltersClear={() => {
            setFloodTypeFilter("all");
            setRiskFilter("all");
          }}
        />
      </div>

      <ModuleScopeRow
        filteredCount={filteredData.length}
        totalCount={totalZones}
        entityLabel="flood zones"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        scopePillMap={DEFAULT_SCOPE_PILL_MAP("Flood Zones")}
        scopeCount={
          filter.scope === "All"
            ? 0
            : (activeData.length ? activeData : floodZoneRegistry).filter(
                (z) => z.scope === filter.scope,
              ).length
        }
        onScopeChange={() => setCurrentPage(1)}
      />

      {/* ── Flood Zone Registry ──────────────────────────────────────────────── */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Zap className="w-6 h-6 text-blue-400" />
              Live Flood Zone Registry
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Real-time discharge and heavy rainfall modeling for {totalZones}{" "}
              zones.
            </p>
          </motion.div>

          {loading && activeData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <RefreshCw className="w-8 h-8 text-blue-500 mx-auto mb-3 animate-spin" />
              <div className="text-white font-medium mb-1">
                Fetching live flood intelligence...
              </div>
              <div className="text-sm text-slate-400">
                Connecting to Open-Meteo Flood &amp; Forecast APIs
              </div>
            </div>
          ) : filteredData.length === 0 ? (
            <div className="text-center py-20 bg-white/5 border border-white/10 rounded-xl">
              <Waves className="w-8 h-8 text-slate-500 mx-auto mb-3" />
              <div className="text-white font-medium mb-1">
                No flood zones found
              </div>
              <div className="text-sm text-slate-400">
                Try adjusting your filters
              </div>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((z, i) => (
                <FloodZoneCard key={z.id} record={z} index={i} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {paginatedData.map((z, i) => (
                <FloodZoneRow key={z.id} record={z} index={i} />
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8 pt-6 border-t border-white/10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="text-sm text-slate-400">
                Page{" "}
                <span className="text-white font-medium">{currentPage}</span> of{" "}
                {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ── Cross-links ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              Related Hazard Domains
            </h2>
            <p className="text-slate-400">
              Explore connected hazard intelligence modules
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Flash Floods",
                href: "/hazard-intelligence/flash-floods",
                desc: "Rapid-onset flash flood early warning",
                icon: CloudRain,
                color: "from-indigo-500 to-blue-600",
              },
              {
                label: "Landslides",
                href: "/hazard-intelligence/landslides",
                desc: "Slope instability and debris flow sites",
                icon: Mountain,
                color: "from-amber-500 to-orange-600",
              },
              {
                label: "GLOFs",
                href: "/hazard-intelligence/glofs",
                desc: "Glacial lake outburst flood risk",
                icon: Droplets,
                color: "from-teal-500 to-emerald-600",
              },
              {
                label: "Dashboards",
                href: "/hazard-intelligence/dashboards",
                desc: "Multi-hazard analytics & comparison",
                icon: BarChart3,
                color: "from-violet-500 to-purple-600",
              },
            ].map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group"
                  onClick={() => router.push(link.href)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}
                    >
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-slate-300 transition-colors">
                        {link.label}
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {link.desc}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
