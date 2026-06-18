import { useState, useEffect } from 'react';
import { algalBloomLakes, AlgalBloomLake } from '@/data/algal-bloom-lakes';

const CACHE_KEY = 'algalBloomMeteoCache';
const CACHE_DURATION = 45 * 60 * 1000; // 45 minutes

export function useAlgalBloomIntelligence() {
  const [lakesWithLiveData, setLakesWithLiveData] = useState<AlgalBloomLake[]>(algalBloomLakes);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    async function fetchMeteoData() {
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Date.now() - parsed.timestamp < CACHE_DURATION) {
            setLakesWithLiveData(parsed.data);
            setLoading(false);
            return;
          } else {
            setIsStale(true);
          }
        }

        const lats = algalBloomLakes.map(l => l.latitude || 34.0837).join(',');
        const lngs = algalBloomLakes.map(l => l.longitude || 74.7973).join(',');

        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lats}&longitude=${lngs}&daily=temperature_2m_max,precipitation_sum,wind_speed_10m_max&past_days=7&forecast_days=1&timezone=auto`);
        
        if (!res.ok) {
          throw new Error('Failed to fetch from Open-Meteo');
        }

        const data = await res.json();
        
        // Handle array of responses (since multiple coords were passed)
        const meteoResults = Array.isArray(data) ? data : [data];

        const updatedLakes = algalBloomLakes.map((lake, idx) => {
          const lakeMeteo = meteoResults[idx];
          if (!lakeMeteo || !lakeMeteo.daily) {
            return lake;
          }

          const daily = lakeMeteo.daily;
          const tempMax = daily.temperature_2m_max?.[daily.temperature_2m_max.length - 1] || 15;
          const windSpeed = daily.wind_speed_10m_max?.[daily.wind_speed_10m_max.length - 1] || 5;
          const precip7d = daily.precipitation_sum?.reduce((a: number, b: number) => a + (b || 0), 0) || 0;

          let risk: 'Low' | 'Moderate' | 'High' | 'Critical' = 'Low';
          let trigger = 'Stable conditions';

          const isHypereutrophic = lake.trophicStatus === 'Hypereutrophic';

          if (tempMax > 30 && windSpeed < 10 && isHypereutrophic) {
            risk = 'Critical';
            trigger = 'Extreme Heat & Stagnant Hypereutrophic Waters';
          } else if (tempMax > 25 && precip7d > 25 && windSpeed < 10) {
            risk = 'High';
            trigger = 'Heat, Heavy Runoff & Stagnation';
          } else if (tempMax > 20 || precip7d > 10) {
            risk = 'Moderate';
            trigger = tempMax > 20 ? (precip7d > 10 ? 'Warm Temps & Nutrient Runoff' : 'Warm Temperatures') : 'Nutrient Runoff';
          } else if (tempMax < 15 && precip7d < 10) {
            risk = 'Low';
            trigger = 'Cool & Low Runoff';
          }

          return {
            ...lake,
            live_temperature_max: tempMax,
            live_precipitation_7d: parseFloat(precip7d.toFixed(1)),
            live_wind_speed: windSpeed,
            live_bloom_risk: risk,
            live_dominant_trigger: trigger,
            last_updated: new Date().toISOString()
          };
        });

        localStorage.setItem(CACHE_KEY, JSON.stringify({
          timestamp: Date.now(),
          data: updatedLakes
        }));

        setLakesWithLiveData(updatedLakes);
        setIsStale(false);
      } catch (err) {
        console.error('Algal bloom intelligence fetch error:', err);
        setError('Failed to load real-time intelligence.');
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const parsed = JSON.parse(cached);
          setLakesWithLiveData(parsed.data);
          setIsStale(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMeteoData();
  }, []);

  return { lakesWithLiveData, loading, error, isStale };
}
