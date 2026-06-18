'use client';
import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { Activity, ArrowRight, Thermometer, Droplets, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const monitoringData = [
  { id: 'em-1', type: 'Air Quality', location: 'Srinagar', value: 'AQI 142', status: 'moderate' as const, parameter: 'PM2.5' },
  { id: 'em-2', type: 'Water Quality', location: 'Dal Lake', value: 'WQI 68', status: 'fair' as const, parameter: 'Trophic State' },
  { id: 'em-3', type: 'Ecosystem Health', location: 'Dachigam NP', value: 'Index 0.78', status: 'good' as const, parameter: 'Biodiversity' },
];

export default function EnvironmentalMonitoringPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[{ label: 'Risk & Monitoring', href: '/risk-monitoring' }, { label: 'Pollution & Stress', href: '/risk-monitoring/pollution-stress' }, { label: 'Environmental Monitoring' }]}
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Environmental Monitoring</span>
          </>}
        subtitle="Air quality, water quality, and ecosystem health monitoring"
        icon={<Activity className="w-6 h-6 text-emerald-400" />}
        label="Environmental Health"
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500" onClick={() => router.push('/risk-monitoring/pollution-stress')}><ArrowRight className="w-5 h-5 mr-2" />Back to Pollution & Stress</Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Overview</Button>
          </div>
        }
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monitoringData.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><h3 className="text-lg font-bold text-white">{m.type}</h3><div className="text-xs text-slate-500">{m.location}</div></div>
                    <Badge variant={m.status === 'good' ? 'success' : m.status === 'moderate' || m.status === 'fair' ? 'warning' : 'danger'} size="sm">{m.status}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{m.value}</div>
                  <div className="text-sm text-slate-400">Parameter: {m.parameter}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}
