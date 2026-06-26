'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ReportCard } from '@/components/field-reports/ReportCard';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  FileText, Calendar, MapPin, Layers, BookOpen, TrendingUp,
  Database, ArrowLeft, BarChart3, Clock, ExternalLink, Users,
  CloudRain, Droplets, Wind, Shield, PawPrint, Activity, AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fieldReportsRegistry } from '@/data/field-reports-registry';
import { Heading } from '@/components/common/Heading';

export default function WaterSystemsReportsPage() {
  const router = useRouter();
  
  // Filter reports where the modules array contains a match
  // We'll just do a broad substring match for the module since the data labels might vary slightly
  const allReports = fieldReportsRegistry.filter(r => 
    r.modules.some(m => m.toLowerCase().includes('water systems') || m.toLowerCase().includes('water systems')) ||
    r.title.toLowerCase().includes('water systems')
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible pb-2">Western Himalayan</span>
            <span className="block whitespace-nowrap leading-[1.12] overflow-visible bg-gradient-to-r from-blue-500 to-cyan-600 bg-clip-text text-transparent">Water Systems Field Reports</span>
          </>}
        subtitle="Water quality testing, lake trophic status monitoring, river discharge data, and groundwater recharge field studies."
        icon={<Droplets className="w-6 h-6 text-blue-400" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Field Reports', href: '/field-reports' },
          { label: 'Water Systems' },
        ]}
      />

      <section className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6 max-w-7xl">
          <Button variant="ghost" className="mb-6 text-slate-400 hover:text-white" onClick={() => router.push('/field-reports')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Field Reports
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allReports.length > 0 ? (
              allReports.map((report, idx) => (
                <ReportCard key={report.id} report={report} index={idx} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <FileText className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-300">No Reports Found</h3>
                <p className="text-slate-500 mt-2">Check back later for new Water Systems reports.</p>
              </div>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
