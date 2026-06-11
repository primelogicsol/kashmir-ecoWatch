'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, Activity, Bell, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { getThreats } from '@/data/protected-network';
import { Heading } from '@/components/common/Heading';

export default function MonitoringPage() {
  const threats = getThreats.all();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'alert-critical';
      case 'high': return 'alert-critical';
      case 'medium': return 'alert-warning';
      default: return 'alert-info';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'danger';
      case 'high': return 'danger';
      case 'medium': return 'warning';
      default: return 'info';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<><span className="block whitespace-nowrap">Kashmir Monitoring</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">and Threats</span></>}
        subtitle="Pressure signals, encroachment records, habitat assessments, and conservation alerts across Kashmir's protected areas. Supports threat mapping, risk prioritization, field monitoring, and management planning."
        icon={<Bell className="w-6 h-6 text-emerald-400" />}
        label="Conservation Intelligence"
        breadcrumbs={[{ label: 'Monitoring & Threats' }]}
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        actions={
          <>
            <Button className="bg-gradient-to-r from-amber-600 to-amber-500" icon={<Bell className="w-5 h-5" />}>Subscribe to Alerts</Button>
            <Button variant="outline" className="border-white/20 text-white" icon={<TrendingUp className="w-5 h-5" />}>View Trends</Button>
          </>
        }
      />

      <div className="container mx-auto px-6 -mt-8 relative z-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2">
              {[
                { label: 'Active Alerts', value: threats.length, icon: Bell },
                { label: 'Critical Threats', value: threats.filter(t => t.severity === 'critical').length, icon: AlertTriangle },
                { label: 'Monitoring Stations', value: '234', icon: Activity },
                { label: 'Resolved (30d)', value: '34', icon: TrendingUp },
              ].map((metric, idx) => (
                <div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0">
                  <metric.icon className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                  <div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                    {metric.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-8">
          {threats.map((threat, index) => (
            <motion.a
              key={threat.id}
              href={`/protected-network/monitoring-and-threats/${threat.slug}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="block group"
            >
              <Card className={`card-intelligence p-6 ${getSeverityColor(threat.severity)} group-hover:scale-[1.01] transition-transform`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      threat.severity === 'critical' ? 'bg-red-500 signal-pulse' :
                      threat.severity === 'high' ? 'bg-red-500 signal-pulse' :
                      threat.severity === 'medium' ? 'bg-amber-500 signal-pulse' :
                      'bg-blue-500 signal-pulse'
                    }`} />
                    <div>
                      <h3 className="font-semibold text-white mb-1 group-hover:text-white/90 transition-colors">{threat.name}</h3>
                      <p className="text-sm text-slate-300 mb-2">{threat.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>{threat.affectedAreas.length} affected areas</span>
                        <span>•</span>
                        <Badge variant={getSeverityBadge(threat.severity)} size="sm">
                          {threat.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-400 group-hover:text-white transition-colors" icon={<ArrowRight className="w-4 h-4" />} />
                </div>
              </Card>
            </motion.a>
          ))}
      </div>

      
    </main>
  );
}
