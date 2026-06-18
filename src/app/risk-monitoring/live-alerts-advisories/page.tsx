'use client';
import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bell, ArrowRight, AlertTriangle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import { useRouter } from 'next/navigation';

const alerts = [
  { id: 'la-1', type: 'Flood Advisory', location: 'Jhelum Basin', severity: 'moderate' as const, issued: '2024-03-28 10:00', status: 'active' as const },
  { id: 'la-2', type: 'Landslide Warning', location: 'Z-Morh Corridor', severity: 'high' as const, issued: '2024-03-28 08:30', status: 'active' as const },
  { id: 'la-3', type: 'Heatwave Alert', location: 'Srinagar', severity: 'moderate' as const, issued: '2024-03-27 14:00', status: 'monitoring' as const },
];

export default function LiveAlertsAdvisoriesPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Live Alerts & Advisories</span>
          </>}
        subtitle="Real-time hazard alerts, weather advisories, and emergency notifications"
        icon={<Bell className="w-6 h-6 text-emerald-400" />}
        label="Real-time Alerts"
        actions={
          <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-emerald-500" onClick={() => router.push('/risk-monitoring')}><ArrowRight className="w-5 h-5 mr-2" />Back to Risk Monitoring</Button>
        }
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-4">
            {alerts.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${a.severity === 'high' ? 'bg-red-500/20' : 'bg-amber-500/20'}`}>
                        <AlertTriangle className={`w-6 h-6 ${a.severity === 'high' ? 'text-red-400' : 'text-amber-400'}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{a.type}</h3>
                        <div className="text-sm text-slate-400 mb-2">{a.location}</div>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{a.issued}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={a.status === 'active' ? 'danger' : 'warning'} size="sm">{a.status}</Badge>
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
